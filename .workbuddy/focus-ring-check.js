/* 焦点环验证（真实 Chromium，CDP 驱动）
 * 目的：断言筛选条件控件只出现「一个」焦点环（box-shadow），不再叠加 outline 描边。
 * 跑法：node .workbuddy/focus-ring-check.js
 */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const SHELL = path.join(
  process.env.HOME,
  'Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell'
);
const PORT = 9333;
const HTTP_PORT = 8788;

const sleep = ms => new Promise(r => setTimeout(r, ms));
const results = [];
function check(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`  [${ok ? 'OK' : 'FAIL'}] ${name}${detail ? '\n        ' + detail : ''}`);
}

async function cdp(ws, method, params, sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++cdp.seq;
    const onMsg = ev => {
      const msg = JSON.parse(ev.data);
      if (msg.id === id) {
        ws.removeEventListener('message', onMsg);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      }
    };
    ws.addEventListener('message', onMsg);
    ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
  });
}
cdp.seq = 0;

(async () => {
  // 1) 本地 HTTP 服务
  const server = spawn('/Users/zhangbin/.workbuddy/binaries/python/versions/3.13.12/bin/python3',
    ['-m', 'http.server', String(HTTP_PORT), '--bind', '127.0.0.1'], { cwd: ROOT, stdio: 'ignore' });
  await sleep(1200);

  // 2) 启动 headless chromium（远程调试）
  const browser = spawn(SHELL, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    'about:blank'
  ], { stdio: 'ignore' });

  let target = null;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
      if (res.ok) { target = await res.json(); break; }
    } catch (e) { /* retry */ }
    await sleep(300);
  }
  if (!target) throw new Error('无法连接 Chromium 调试端口');

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  await cdp(ws, 'Page.enable');
  await cdp(ws, 'Runtime.enable');

  // 离线可复现：拦截请求，放行本地资源，CDN 外链用空响应阻断（等价 jsdom 测试的 interceptor）
  await cdp(ws, 'Fetch.enable', { patterns: [{ urlPattern: '*' }] });
  ws.addEventListener('message', async ev => {
    const msg = JSON.parse(ev.data);
    if (msg.method !== 'Fetch.requestPaused') return;
    const { requestId, request } = msg.params;
    const isLocal = request.url.startsWith(`http://127.0.0.1:${HTTP_PORT}`);
    try {
      if (isLocal) await cdp(ws, 'Fetch.continueRequest', { requestId });
      else await cdp(ws, 'Fetch.fulfillRequest', { requestId, responseCode: 200, responseHeaders: [{ name: 'Content-Type', value: 'text/javascript' }], body: Buffer.from('').toString('base64') });
    } catch (e) { /* ignore */ }
  });

  const url = `http://127.0.0.1:${HTTP_PORT}/index.html?page=rebate-management`;
  await cdp(ws, 'Page.navigate', { url });
  await sleep(3000);

  // 3) 断言：模拟真实交互（鼠标点击 / 键盘 Tab）后的焦点环
  const script = `(() => {
    const root = document.querySelector('[data-module-root="rebate-management"]');
    if (!root) return { error: 'module root not found' };
    const out = { tabs: [...root.querySelectorAll('.rm-primary-tab')].map(b => b.textContent.trim()), perTab: {} };

    // 返佣汇总表头：用户ID / 手机号邮箱账户 两列应无排序按钮与升降序图标
    const sumHeads = [...root.querySelectorAll('#rm-panel thead th')];
    out.summaryHeads = sumHeads.map(th => ({
      label: th.textContent.trim(),
      sortBtn: !!th.querySelector('.rm-sort'),
      caret: !!th.querySelector('.rm-caret'),
      ariaSort: th.getAttribute('aria-sort')
    }));

    const probe = el => {
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        cls: el.className,
        outlineStyle: cs.outlineStyle,
        outlineWidth: cs.outlineWidth,
        boxShadow: cs.boxShadow,
        hasOutline: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0,
        hasShadow: cs.boxShadow && cs.boxShadow !== 'none'
      };
    };

    // 遍历全部一级 Tab，逐个聚焦其筛选区控件
    const tabKeys = ['summary','rebate','freeze','invite','withdraw','settings'];
    tabKeys.forEach(key => {
      const btn = root.querySelector('.rm-primary-tab[data-tab="'+key+'"]');
      if (btn) btn.click();
      const controls = [...root.querySelectorAll('.filter-control .control')];
      out.perTab[key] = controls.map(el => {
        el.focus();
        const r = probe(el);
        r.matchesFV = el.matches(':focus-visible');
        document.body.focus();
        return r;
      });
      // 金额口径扫描：任何「千分位两位小数」数值都必须紧跟 ￥ 前缀，且全表不出现「元」
      const cells = [...root.querySelectorAll('#rm-panel td')].map(td => td.textContent.trim());
      out.moneyScan = out.moneyScan || {};
      out.moneyScan[key] = {
        bare: cells.filter(t => /(?<!￥)\d{1,3}(,\d{3})*\.\d{2}/.test(t)),   // 缺 ￥ 的金额
        yuan: cells.filter(t => t.includes('元')),                             // 残留「元」
        sample: cells.filter(t => t.includes('￥')).slice(0, 3)
      };
    });

    // 回到有表单的 Tab 再采样按钮 / 分页控件（避免停在无表单的「返佣设置」造成空断言）
    root.querySelector('.rm-primary-tab[data-tab="summary"]').click();
    const btns = [...root.querySelectorAll('.filter-actions .btn')];
    out.btns = btns.map(el => { el.focus(); const r = probe(el); document.body.focus(); return r; });
    const misc = [...root.querySelectorAll('.pg-jump-input, .pg-select')];
    out.misc = misc.map(el => { el.focus(); const r = probe(el); document.body.focus(); return r; });
    return out;
  })()`;

  const res = await cdp(ws, 'Runtime.evaluate', { expression: script, returnByValue: true });
  const v = res.result.value;
  if (v.error) { check('模块加载', false, v.error); }
  else {
    check('模块加载（6 个 Tab）', v.tabs.length === 6, 'Tabs: ' + v.tabs.join(' / '));

    // —— 返佣汇总表头：两列排序图标已移除 ——
    const h = v.summaryHeads || [];
    const noSort = l => (h.find(x => x.label === l) || {});
    const idCol = noSort('用户ID'), phoneCol = noSort('手机号/邮箱/账户');
    check('汇总表头 8 列（已移除账户余额）', h.length === 8, h.map(x => x.label).join(' / '));
    check('「账户余额」列已移除', !h.some(x => x.label === '账户余额'), h.map(x => x.label).join(' / '));
    check('「用户ID」列无排序按钮与升降序图标', !!idCol.label && !idCol.sortBtn && !idCol.caret,
      `label=${idCol.label} 排序按钮=${idCol.sortBtn} 图标=${idCol.caret} aria-sort=${idCol.ariaSort}`);
    check('「手机号/邮箱/账户」列无排序按钮与升降序图标', !!phoneCol.label && !phoneCol.sortBtn && !phoneCol.caret,
      `label=${phoneCol.label} 排序按钮=${phoneCol.sortBtn} 图标=${phoneCol.caret} aria-sort=${phoneCol.ariaSort}`);
    const sortCols = h.filter(x => x.sortBtn);
    check('可排序列 6 列（累计佣金~返佣比例）', sortCols.length === 6, sortCols.map(x => x.label + (x.caret ? '(有图标)' : '(缺图标)')).join(' / '));

    // —— 全 Tab 金额口径扫描 ——
    const scan = v.moneyScan || {};
    const bareAll = Object.entries(scan).flatMap(([k, s]) => s.bare.map(t => `${k}: ${t}`));
    const yuanAll = Object.entries(scan).flatMap(([k, s]) => s.yuan.map(t => `${k}: ${t}`));
    check('所有 Tab 的金额单元格均带 ￥ 前缀（无裸数值）', bareAll.length === 0,
      bareAll.length ? '缺失 ￥: ' + bareAll.join(' | ') :
        Object.entries(scan).map(([k, s]) => `${k}: ${s.sample.join(' / ') || '(无金额列)'}`).join('；'));
    check('所有 Tab 无残留「元」字样', yuanAll.length === 0, yuanAll.join(' | ') || '无');

    const all = Object.entries(v.perTab);
    const totalControls = all.reduce((n, [, list]) => n + list.length, 0);
    check('全部 Tab 筛选控件已覆盖', totalControls >= 10, '累计控件数: ' + totalControls + '；各 Tab: ' +
      all.map(([k, l]) => `${k}=${l.length}`).join(', '));

    const double = [];
    const blind = [];
    all.forEach(([tab, list]) => list.forEach(c => {
      if (c.hasOutline && c.hasShadow) double.push({ tab, ...c });
      if (!c.hasOutline && !c.hasShadow) blind.push({ tab, ...c });
    }));
    check('筛选控件无「双描边」（outline + box-shadow 叠加）', double.length === 0,
      double.length ? '仍叠加: ' + JSON.stringify(double) : '全部为单环');
    check('筛选控件聚焦时仍有可见焦点提示', blind.length === 0,
      blind.length ? '无提示: ' + JSON.stringify(blind) : '单环齐全');
    check('日期区间触发器为单环（含 control 类）',
      all.flatMap(([, l]) => l).filter(c => /rm-date/.test(c.cls)).every(c => !(c.hasOutline && c.hasShadow)),
      all.flatMap(([, l]) => l).filter(c => /rm-date/.test(c.cls)).map(c => `outline=${c.outlineStyle} shadow=${c.hasShadow}`).join(' | ') || '（当前 Tab 未渲染日期控件）');

    check('按钮类（查询/重置）保留单一 outline 环',
      v.btns.every(b => !(b.hasOutline && b.hasShadow)),
      v.btns.map(b => `${b.cls} outline=${b.outlineStyle}/${b.outlineWidth} shadow=${b.hasShadow}`).join(' | '));

    if (v.misc.length) {
      check('分页跳页输入/每页下拉 无双描边',
        v.misc.every(m => !(m.hasOutline && m.hasShadow)),
        v.misc.map(m => `${m.cls} outline=${m.outlineStyle} shadow=${m.hasShadow}`).join(' | '));
    }
  }

  const failed = results.filter(r => !r.ok).length;
  console.log(`\n=== 结果 ===\n${failed === 0 ? '全部通过' : failed + ' 项失败'}（共 ${results.length} 项）`);

  ws.close();
  browser.kill();
  server.kill();
  process.exit(failed === 0 ? 0 : 1);
})().catch(e => { console.error('ERROR:', e.message); process.exit(2); });
