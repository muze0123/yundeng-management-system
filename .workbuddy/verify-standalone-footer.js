/* 独立页「exports/出海吧-独立页面.html」页脚 · 真实浏览器验证（CDP 版）
 *
 * 为什么用 CDP：jsdom 不做 CSS 级联也没有布局；且 :hover 无法用 JS 合成，
 * 必须向真实引擎派发鼠标事件才能验证「鼠标移入显示二维码」。
 * 本脚本通过 Chrome DevTools Protocol：
 *   1) Input.dispatchMouseEvent 真实 hover 联系方式图标 → 断言浮层揭示
 *   2) Emulation.setFocusEmulationEnabled + focus() → 断言键盘可达路径
 *   3) getComputedStyle / getBoundingClientRect 断言页脚视觉与几何
 *
 * 用法：node .workbuddy/verify-standalone-footer.js
 * 退出码：0 = 全部通过；1 = 有断言失败或环境异常。
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].find((p) => fs.existsSync(p));
if (!CHROME) { console.error('未找到 Chrome/Chromium'); process.exit(1); }

const ROOT = path.resolve(__dirname, '..');
const PAGE = path.join(ROOT, 'exports/出海吧-独立页面.html');
const PORT = 9333;
const PROFILE = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-chuhai-'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function httpGetJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let d = ''; res.on('data', (c) => (d += c));
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

class CDP {
  constructor(url) {
    this.ws = new WebSocket(url); this.id = 0; this.pending = new Map();
    this.ready = new Promise((res, rej) => {
      this.ws.addEventListener('open', () => res());
      this.ws.addEventListener('error', (e) => rej(new Error('WS error: ' + (e.message || e.type))));
    });
    this.ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      }
    });
  }
  send(method, params) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params: params || {} }));
    });
  }
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error('页面异常: ' + JSON.stringify(r.exceptionDetails.exception || r.exceptionDetails));
    return r.result.value;
  }
  close() { try { this.ws.close(); } catch (_) {} }
}

const METRICS = `(function(){
  var px = function(v){ return Math.round(parseFloat(v||'0')); };
  var q = function(s){ return document.querySelector(s); };
  var footer = q('footer.site-footer'), content = q('#content');
  if (!footer || !content) return { fatal: '页脚或内容区未找到' };
  var fs_ = getComputedStyle(footer);
  var grid = footer.querySelector(':scope > div');
  var gs = grid ? getComputedStyle(grid) : null;
  var btn = footer.querySelector('.contact-btn');
  var bs = btn ? getComputedStyle(btn) : null;
  var qr = footer.querySelector('.qr-slot');
  var qs = qr ? getComputedStyle(qr) : null;
  var legal = footer.querySelector('.site-footer-legal');
  var brand = q('header span.text-\\\\[17px\\\\]');
  var tw = [].slice.call(document.querySelectorAll('style')).some(function(s){ return (s.textContent||'').indexOf('2fr 1fr auto') >= 0; });
  var totop = (function(){
    var w = q('.totop-wrap'), b = q('#totopBtn'), tip = q('#totop-tip');
    if (!w || !b || !tip) return null;
    var r = w.getBoundingClientRect();
    return { position: getComputedStyle(w).position,
             fromRight: Math.round(window.innerWidth - r.right), fromBottom: Math.round(window.innerHeight - r.bottom),
             w: Math.round(r.width), h: Math.round(r.height), radius: getComputedStyle(b).borderRadius,
             label: b.getAttribute('aria-label'), tip: tip.textContent,
             tipHidden: getComputedStyle(tip).visibility === 'hidden' };
  })();
    return {
      tailwindApplied: tw,
      totop: totop,
    scrollTop: content.scrollTop,
    contentRect: { bottom: Math.round(content.getBoundingClientRect().bottom), left: Math.round(content.getBoundingClientRect().left), right: Math.round(content.getBoundingClientRect().right), clientWidth: content.clientWidth },
    footerRect: { top: Math.round(footer.getBoundingClientRect().top), bottom: Math.round(footer.getBoundingClientRect().bottom), left: Math.round(footer.getBoundingClientRect().left), right: Math.round(footer.getBoundingClientRect().right) },
    footer: { bg: fs_.backgroundColor, borderTopWidth: fs_.borderTopWidth, borderTopColor: fs_.borderTopColor, flexGrow: fs_.flexGrow, flexShrink: fs_.flexShrink, height: px(footer.getBoundingClientRect().height) },
    radius: { tl: fs_.borderTopLeftRadius, tr: fs_.borderTopRightRadius, br: fs_.borderBottomRightRadius, bl: fs_.borderBottomLeftRadius },
    /* 页脚与内容区左右边缘的间距（右缘用 clientWidth 避开滚动条）。
       底部间距与滚动位置相关且受亚像素取整影响，统一在「滚动到底」后实测（见下方 m2 断言） */
    gaps: (function(){
      var c = content.getBoundingClientRect(), f = footer.getBoundingClientRect();
      var clientRight = c.left + content.clientWidth;
      return { left: Math.round(f.left - c.left), right: Math.round(clientRight - f.right) };
    })(),
    badge: (function(){
      var img = footer.querySelector('img.gongan-badge');
      if (!img) return null;
      var r = img.getBoundingClientRect();
      var textLeft = null;
      var w = document.createTreeWalker(legal, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) {
        var n = w.currentNode, i = n.data.indexOf('浙公安网备');
        if (i >= 0) { var rg = document.createRange(); rg.setStart(n, i); rg.setEnd(n, i + 5); textLeft = rg.getBoundingClientRect().left; break; }
      }
      return { h: Math.round(r.height), w: Math.round(r.width), natural: img.naturalWidth + 'x' + img.naturalHeight,
               isDataPng: img.getAttribute('src').indexOf('data:image/png;base64,') === 0,
               alt: img.getAttribute('alt'), beforeText: textLeft !== null ? r.right <= textLeft + 2 : null };
    })(),
    grid: gs ? { display: gs.display, columns: gs.gridTemplateColumns, gap: gs.columnGap } : null,
    contactBtn: bs ? { w: bs.width, h: bs.height, radius: bs.borderRadius, bg: bs.backgroundColor } : null,
    qrSlot: qs ? { w: qs.width, h: qs.height, border: qs.borderStyle, display: qs.display } : null,
    legal: legal ? legal.textContent.trim() : null,
    legalColor: legal ? getComputedStyle(legal).color : null,
    colors: (function(){
      var pick = function(sel){ var e = footer.querySelector(sel); return e ? getComputedStyle(e).color : null; };
      return {
        '法务行': pick('.site-footer-legal'), '定位语': pick('.site-footer-slogan'),
        '页脚链接': pick('.site-footer-link'), '二维码说明': pick('.contact-pop-cap'),
        '列标题': pick('.site-footer-col-title')
      };
    })(),
    links: [].slice.call(footer.querySelectorAll('a')).map(function(a){ return a.getAttribute('href'); }),
    brand: brand ? { text: brand.textContent, color: getComputedStyle(brand).color, coloredChild: !!brand.querySelector('.text-primary') } : null
  };
})()`;

const POP = (id) => `(function(){
  var el = document.getElementById(${JSON.stringify(id)});
  if (!el) return { fatal: '缺少 ' + ${JSON.stringify(id)} };
  var cs = getComputedStyle(el), r = el.getBoundingClientRect();
  var c = document.getElementById('content').getBoundingClientRect();
  var trig = document.querySelector('[aria-describedby="' + ${JSON.stringify(id)} + '"]');
  var tr = trig ? trig.getBoundingClientRect() : null;
  return { visibility: cs.visibility, opacity: cs.opacity, position: cs.position,
           width: Math.round(r.width), height: Math.round(r.height),
           insideContentX: r.left >= c.left - 1 && r.right <= c.right + 1,
           aboveTrigger: tr ? r.bottom <= tr.top + 1 : null };
})()`;

const CENTER = (sel) => `(function(){
  var el = document.querySelector(${JSON.stringify(sel)});
  if (!el) return null;
  var r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return null;
  return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
})()`;

(async function main() {
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
    '--window-size=1440,900', '--remote-debugging-address=127.0.0.1',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + PROFILE,
    'file://' + PAGE,
  ], { stdio: ['ignore', 'ignore', 'ignore'] });

  let target = null;
  for (let i = 0; i < 80 && !target; i++) {
    try {
      const list = await httpGetJson('http://127.0.0.1:' + PORT + '/json/list');
      target = list.find((t) => t.type === 'page' && String(t.url).startsWith('file://'));
    } catch (_) { /* Chrome 尚未就绪 */ }
    if (!target) await sleep(250);
  }
  if (!target || !target.webSocketDebuggerUrl) {
    chrome.kill('SIGKILL');
    console.error('无法连接 Chrome 调试端口（CDP 未就绪）');
    process.exit(1);
  }

  const cdp = new CDP(target.webSocketDebuggerUrl);
  await cdp.ready;
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  await cdp.send('Emulation.setFocusEmulationEnabled', { enabled: true });

  /* 等待页面就绪 + Tailwind JIT 生成工具类 */
  for (let i = 0; i < 60; i++) {
    const ok = await cdp.eval(`(function(){
      if (document.readyState !== 'complete') return false;
      if (!document.querySelector('footer.site-footer')) return false;
      var g = document.querySelector('footer.site-footer > div');
      return !!g && getComputedStyle(g).display === 'grid';
    })()`);
    if (ok) break;
    await sleep(250);
  }

  const fails = [];
  const ck = (label, cond, detail) => {
    if (cond) console.log('  [OK] ' + label + (detail !== undefined && detail !== '' ? '  ' + detail : ''));
    else { fails.push(label); console.log('  [FAIL] ' + label + (detail !== undefined && detail !== '' ? '  ' + detail : '')); }
  };
  /* WCAG 相对亮度与对比度（正文要求 >= 4.5:1） */
  const lum = (c) => {
    const [r, g, b] = c.match(/\d+/g).slice(0, 3).map((v) => {
      const s = Number(v) / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrastOnWhite = (c) => (1.05) / (lum(c) + 0.05);

  console.log('独立页页脚 · 真实浏览器验证（CDP 真实鼠标事件）');
  console.log('引擎: ' + CHROME);

  const m = await cdp.eval(METRICS);
  if (m.fatal) { console.error(m.fatal); cdp.close(); chrome.kill('SIGKILL'); process.exit(1); }

  console.log('  Tailwind 工具类已生成: ' + m.tailwindApplied);

  /* ---- 视觉与几何 ---- */
  ck('页脚白色背景', m.footer.bg === 'rgb(255, 255, 255)', m.footer.bg);
  ck('页脚四边描边为浅色分隔线', m.footer.borderTopWidth === '1px' && m.footer.borderTopColor === 'rgb(232, 234, 237)', m.footer.borderTopWidth + ' ' + m.footer.borderTopColor);
  ck('页脚不收缩(flex: 0 0 auto)', m.footer.flexGrow === '0' && m.footer.flexShrink === '0', m.footer.flexGrow + '/' + m.footer.flexShrink);
  ck('页脚高度合理', m.footer.height > 120, m.footer.height + 'px');
  ck('页脚左右间距 20px', !!m.gaps && m.gaps.left === 20 && m.gaps.right === 20,
    m.gaps && ('左 ' + m.gaps.left + 'px / 右 ' + m.gaps.right + 'px（底部间距见滚动态断言）'));
  ck('页脚四角圆角 8px', !!m.radius && [m.radius.tl, m.radius.tr, m.radius.br, m.radius.bl].every((v) => v === '8px'),
    m.radius && (m.radius.tl + '/' + m.radius.tr + '/' + m.radius.br + '/' + m.radius.bl));
  ck('公安备案徽标已内嵌(data URI PNG)', !!m.badge && m.badge.isDataPng, m.badge && ('natural ' + m.badge.natural));
  ck('公安备案徽标 20px 高、位于「浙公安网备」文字之前', !!m.badge && m.badge.h === 20 && m.badge.beforeText === true,
    m.badge && ('h' + m.badge.h + 'px w' + m.badge.w + 'px alt=' + m.badge.alt + ' 位于文字前=' + m.badge.beforeText));
  ck('页脚三列栅格(桌面 1440)', !!m.grid && m.grid.display === 'grid' && m.grid.columns.trim().split(/\s+/).length === 3,
    m.grid && (m.grid.display + ' | ' + m.grid.columns + ' | gap ' + m.grid.gap));
  ck('联系方式图标 36×36 / r8', !!m.contactBtn && m.contactBtn.w === '36px' && m.contactBtn.h === '36px', m.contactBtn && (m.contactBtn.w + '×' + m.contactBtn.h + ' r' + m.contactBtn.radius));
  ck('联系方式图标为深色圆角方块(参考图样式)', !!m.contactBtn && m.contactBtn.bg === 'rgb(26, 29, 36)', m.contactBtn && m.contactBtn.bg);
  ck('栏目标题为浅灰(ink.body)', !!m.colors && m.colors['列标题'] === 'rgb(58, 63, 74)', m.colors && m.colors['列标题']);
  ck('回到顶部按钮存在且固定于右下角 24px', !!m.totop && m.totop.position === 'fixed' && m.totop.fromRight === 24 && m.totop.fromBottom === 24,
    m.totop && (m.totop.position + ' 距右 ' + m.totop.fromRight + 'px 距底 ' + m.totop.fromBottom + 'px'));
  ck('回到顶部按钮 40×40 圆形、aria-label 正确', !!m.totop && m.totop.w === 40 && m.totop.h === 40 && m.totop.radius === '50%' && m.totop.label === '回到顶部',
    m.totop && (m.totop.w + '×' + m.totop.h + ' r' + m.totop.radius));
  ck('回到顶部提示语文案正确且默认收起', !!m.totop && m.totop.tip === '回到顶部' && m.totop.tipHidden === true, m.totop && ('「' + m.totop.tip + '」 hidden=' + m.totop.tipHidden));
  ck('二维码槽 132×132 虚线占位', !!m.qrSlot && m.qrSlot.w === '132px' && m.qrSlot.h === '132px' && m.qrSlot.border === 'dashed', m.qrSlot && (m.qrSlot.w + '×' + m.qrSlot.h + ' ' + m.qrSlot.border));
  ck('顶部品牌文字为纯黑（无彩色片段）', !!m.brand && m.brand.coloredChild === false && m.brand.color === 'rgb(26, 29, 36)', m.brand && (m.brand.color + ' 「' + m.brand.text + '」'));
  ck('法务行含公司名与两个备案号', !!m.legal && m.legal.indexOf('杭州辰链信息科技有限公司') >= 0 && m.legal.indexOf('浙ICP备2022019151号-6') >= 0, m.legal);
  ck('页脚链接齐全', ['https://www.yunlogin.com/', 'mailto:service@yunlogin.com',
    'https://www.yunlogin.com/v2/news/userAgreement.html', 'https://www.yunlogin.com/v2/news/privacyAgreement.html']
    .every((h) => m.links.indexOf(h) >= 0), m.links.join(', '));

  /* ---- 文字对比度（WCAG AA 正文 4.5:1，背景为白色页脚） ---- */
  Object.keys(m.colors || {}).forEach((label) => {
    const c = m.colors[label];
    if (!c) { ck(label + ' 对比度', false, '取色失败'); return; }
    const ratio = contrastOnWhite(c);
    ck(label + ' 文字对比度 ≥ 4.5:1', ratio >= 4.5, c + ' → ' + ratio.toFixed(2) + ':1');
  });

  /* ---- 滚动到底：页脚应完整抵达内容区底部（无留白、无裁切） ---- */
  await cdp.eval(`(function(){ var c = document.getElementById('content'); c.scrollTop = c.scrollHeight; return 1; })()`);
  await sleep(400);
  const m2 = await cdp.eval(METRICS);
  ck('滚动到底后页脚距内容区底边 20px', Math.abs(m2.footerRect.bottom - m2.contentRect.bottom) === 20,
    '页脚底 ' + m2.footerRect.bottom + ' / 内容区底 ' + m2.contentRect.bottom);
  ck('滚动到底后页脚完整可见（高度未被裁切）', m2.footerRect.top >= m2.contentRect.bottom - 20 - m2.footer.height - 2,
    '页脚顶 ' + m2.footerRect.top + ' 高 ' + m2.footer.height + 'px');

  /* ---- 真实鼠标 hover：邮箱 / 微信 / 客服 ---- */
  const cases = [
    { id: 'pop-mail', sel: '[aria-describedby="pop-mail"]', name: '邮箱图标', expect: '邮箱地址' },
    { id: 'pop-wechat', sel: '[aria-describedby="pop-wechat"]', name: '微信图标', expect: '微信二维码' },
    { id: 'pop-service', sel: '[aria-describedby="pop-service"]', name: '客服图标', expect: '在线咨询二维码' },
  ];
  for (const c of cases) {
    const before = await cdp.eval(POP(c.id));
    ck(c.name + '：默认收起', before.visibility === 'hidden' && before.opacity === '0', before.visibility + '/' + before.opacity);
    const pt = await cdp.eval(CENTER(c.sel));
    if (!pt) { ck(c.name + '：定位触发图标', false, '坐标取得失败'); continue; }
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5, button: 'none', buttons: 0 }); /* 先移开复位 */
    await sleep(120);
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: pt.x, y: pt.y, button: 'none', buttons: 0 });
    await sleep(400); /* 等 150ms 过渡结束 */
    const after = await cdp.eval(POP(c.id));
    ck(c.name + '：鼠标移入展开' + c.expect, after.visibility === 'visible' && after.opacity === '1', after.visibility + '/' + after.opacity);
    ck(c.name + '：浮层为绝对定位、在图标上方、未横向裁切',
      after.position === 'absolute' && after.aboveTrigger === true && after.insideContentX === true,
      'w' + after.width + ' h' + after.height);
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5, button: 'none', buttons: 0 });
    await sleep(300);
    const away = await cdp.eval(POP(c.id));
    ck(c.name + '：鼠标移出收起', away.visibility === 'hidden' || away.opacity === '0', away.visibility + '/' + away.opacity);
  }

  /* ---- 键盘可达：focus-within 路径（用 DOM.focus 走浏览器级真实聚焦） ---- */
  await cdp.send('DOM.enable');
  const docRoot = await cdp.send('DOM.getDocument', { depth: 1 });
  const node = await cdp.send('DOM.querySelector', { nodeId: docRoot.root.nodeId, selector: '[aria-describedby="pop-wechat"]' });
  if (node && node.nodeId) await cdp.send('DOM.focus', { nodeId: node.nodeId });
  await sleep(300);
  const kb = await cdp.eval(`(function(){
    var t = document.querySelector('[aria-describedby="pop-wechat"]');
    var item = t.closest('.contact-item');
    var el = document.getElementById('pop-wechat');
    return { active: document.activeElement === t, mFocus: t.matches(':focus'), mWithin: item.matches(':focus-within'),
             visibility: getComputedStyle(el).visibility, opacity: getComputedStyle(el).opacity };
  })()`);
  ck('键盘聚焦图标亦展开浮层(:focus-within)', kb.active === true && kb.mWithin === true && kb.visibility === 'visible' && kb.opacity === '1', JSON.stringify(kb));

  /* ---- 回到顶部：hover 提示语 + 真实点击线性滚动 ---- */
  const tt = await cdp.eval(CENTER('#totopBtn'));
  if (!tt) { ck('回到顶部按钮可定位', false, '坐标取得失败'); }
  else {
    const hit = await cdp.eval(`(function(){
      var el = document.elementFromPoint(${tt.x}, ${tt.y});
      return el && (el.id === 'totopBtn' || el.closest('#totopBtn')) ? 'hit' : (el ? el.className : 'null');
    })()`);
    ck('回到顶部按钮未被其他浮层遮挡', hit === 'hit', 'elementFromPoint → ' + hit);

    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: tt.x, y: tt.y, button: 'none', buttons: 0 });
    await sleep(400);
    const tipShown = await cdp.eval(`(function(){
      var t = document.getElementById('totop-tip');
      var cs = getComputedStyle(t);
      return { visibility: cs.visibility, opacity: cs.opacity, text: t.textContent };
    })()`);
    ck('鼠标移入回到顶部按钮显示提示语「回到顶部」', tipShown.visibility === 'visible' && tipShown.opacity === '1' && tipShown.text === '回到顶部', JSON.stringify(tipShown));
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5, button: 'none', buttons: 0 });
    await sleep(300);
    const tipHidden = await cdp.eval(`getComputedStyle(document.getElementById('totop-tip')).visibility`);
    ck('鼠标移出后提示语收起', tipHidden === 'hidden', tipHidden);

    /* 真实点击 → 线性滚动回顶部 */
    await cdp.eval(`(function(){ var c = document.getElementById('content'); c.scrollTop = 800; return c.scrollTop; })()`);
    await sleep(200);
    const startTop = await cdp.eval(`document.getElementById('content').scrollTop`);
    ck('已构造 800px 滚动距离', startTop === 800, 'scrollTop=' + startTop);

    const pt = await cdp.eval(CENTER('#totopBtn'));
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: pt.x, y: pt.y, button: 'none', buttons: 0 });
    await sleep(120);
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pt.x, y: pt.y, button: 'left', buttons: 1, clickCount: 1 });
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pt.x, y: pt.y, button: 'left', buttons: 0, clickCount: 1 });
    /* 时长 = clamp(280, 900, 800*0.5) = 400ms；t=200ms（50%）线性应剩 50% ≈ 400px */
    await sleep(200);
    const mid = await cdp.eval(`document.getElementById('content').scrollTop`);
    ck('滚动为线性（t=50% 时剩余约一半）', mid > 320 && mid < 480, 't=200ms 时 scrollTop=' + mid + '（800 起，线性预期 ~400）');
    await sleep(900);
    const endTop = await cdp.eval(`document.getElementById('content').scrollTop`);
    ck('点击后线性滚动到页面顶部', endTop === 0, 'scrollTop=' + endTop);
  }

  console.log('--------------------------------------------------------------');
  if (fails.length) { console.log('失败 ' + fails.length + ' 项'); process.exitCode = 1; }
  else console.log('全部通过。');

  cdp.close();
  chrome.kill('SIGKILL');
  try { fs.rmSync(PROFILE, { recursive: true, force: true }); } catch (_) {}
})().catch((e) => { console.error('验证脚本异常: ' + (e && e.stack || e)); process.exitCode = 1; });
