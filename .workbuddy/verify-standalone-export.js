/* 单文件导出的真机验证（CDP）
 *
 * 为什么需要：`export-standalone.py` 的自检只覆盖「文本层面的外链残留」，
 * 而导出最容易翻车的三件事都只有真引擎能抓：
 *   1) file:// 下模块或框架脚本抛错 → 白屏（自检看不见运行时异常）；
 *   2) file:// 适配没生效（仍去动态加载 Prototype/modules/*.js）→ 模块挂不上；
 *   3) 交互失效（Tab 切换、弹窗、星标）——静态检查永远抓不到「点了没反应」。
 *
 * 用法：node .workbuddy/verify-standalone-export.js [导出文件] [模块 id]
 *   默认：exports/出海吧-独立版.html  overseas-nav
 * 退出码：0 = 全部通过；1 = 有断言失败或环境异常。
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const target = process.argv[2] || 'exports/出海吧-独立版.html';
const PAGE = path.isAbsolute(target) ? target : path.join(ROOT, target);
const MODULE_ID = process.argv[3] || 'overseas-nav';

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].find((p) => fs.existsSync(p));
if (!CHROME) { console.error('未找到 Chrome/Chromium'); process.exit(1); }
if (!fs.existsSync(PAGE)) { console.error('导出文件不存在: ' + PAGE); process.exit(1); }

const PORT = 9351;
const PROFILE = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-export-'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fails = [];
const ck = (label, ok, detail) => {
  console.log((ok ? '  [OK]   ' : '  [FAIL] ') + label + (detail ? '  ' + detail : ''));
  if (!ok) fails.push(label);
};

function httpGetJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => { let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } }); }).on('error', reject);
  });
}

class CDP {
  constructor(url) {
    this.ws = new WebSocket(url); this.id = 0; this.pending = new Map(); this.events = [];
    this.ready = new Promise((res, rej) => {
      this.ws.addEventListener('open', () => res());
      this.ws.addEventListener('error', (e) => rej(new Error('WS ' + (e.message || e.type))));
    });
    this.ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
        return;
      }
      if (msg.method) this.events.push(msg);
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
    if (r.exceptionDetails) throw new Error('页面求值异常: ' + JSON.stringify(r.exceptionDetails.exception || r.exceptionDetails));
    return r.result.value;
  }
  close() { try { this.ws.close(); } catch (_) {} }
}

/* 真实鼠标点击（elementFromPoint 命中该元素中心 → 派发 mousePressed/Released） */
async function realClick(cdp, selector) {
  const pt = await cdp.eval(`(function(){
    var el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return null;
    el.scrollIntoView({block:'center'});
    var r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return null;
    return { x: Math.round(r.left + r.width/2), y: Math.round(r.top + r.height/2) };
  })()`);
  if (!pt) return false;
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: pt.x, y: pt.y, button: 'none', clickCount: 0 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pt.x, y: pt.y, button: 'left', clickCount: 1 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pt.x, y: pt.y, button: 'left', clickCount: 1 });
  return true;
}

(async function main() {
  console.log('单文件导出真机验证');
  console.log('  文件  : ' + path.relative(ROOT, PAGE));
  console.log('  模块  : ' + MODULE_ID);
  const mtimeOut = fs.statSync(PAGE).mtimeMs;
  console.log('  大小  : ' + (fs.statSync(PAGE).size / 1024).toFixed(0) + ' KB\n');

  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
    '--window-size=1440,1000', '--hide-scrollbars',
    '--remote-debugging-address=127.0.0.1', '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + PROFILE, 'file://' + encodeURI(PAGE),
  ], { stdio: ['ignore', 'ignore', 'ignore'] });

  let t = null;
  for (let i = 0; i < 80 && !t; i++) {
    try { t = (await httpGetJson('http://127.0.0.1:' + PORT + '/json/list')).find((x) => x.type === 'page' && x.url.startsWith('file://')); } catch (_) {}
    if (!t) await sleep(250);
  }
  if (!t) { chrome.kill('SIGKILL'); console.error('CDP 未就绪'); process.exit(1); }

  const cdp = new CDP(t.webSocketDebuggerUrl);
  await cdp.ready;
  await cdp.send('Runtime.enable');
  await cdp.send('Log.enable');
  await cdp.send('Page.enable');

  /* ---------- 1. 启动与默认路由 ---------- */
  console.log('=== 1. 启动 / 默认路由 / 模块挂载 ===');
  let up = false;
  for (let i = 0; i < 80; i++) {
    up = await cdp.eval(`(function(){
      var m = document.querySelector('.app-business-module');
      if (!m) return false;
      if (document.querySelector('.app-route-loading')) return false;   /* 仍在加载态 */
      return m.textContent.trim().length > 0;
    })()`);
    if (up) break;
    await sleep(250);
  }
  ck('模块已挂载且脱离加载态（.app-business-module 有内容）', up);
  const title = await cdp.eval('document.title');
  ck('文档标题已按路由渲染（「云登后台 · <模块名>」）', /^云登后台 · .+/.test(title || ''), title);
  const rawTitle = (fs.readFileSync(PAGE, 'utf8').match(/<title>([^<]*)<\/title>/) || [, ''])[1];
  ck('静态 <title> 标明「单文件导出」', /单文件导出/.test(rawTitle), rawTitle);
  const shell = await cdp.eval(`(function(){
    return { hasSidebar: !!document.querySelector('aside, .app-sidebar'),
             hasTopbar: !!document.querySelector('header, .app-topbar'),
             inlineBlocks: {
               tailwind: document.documentElement.innerHTML.indexOf('Tailwind Play CDN（内联，离线可用）') >= 0,
               lucide: document.documentElement.innerHTML.indexOf('lucide UMD（内联，离线可用）') >= 0,
               shell: document.documentElement.innerHTML.indexOf('框架层：Prototype/app-shell.js（内联') >= 0,
               module: document.documentElement.innerHTML.indexOf('业务模块：Prototype/modules/') >= 0
                       && document.documentElement.innerHTML.indexOf('（内联）') >= 0,
               guard: document.documentElement.innerHTML.indexOf('单文件导出守卫') >= 0 } };
  })()`);
  ck('框架侧栏与顶栏已渲染', shell.hasSidebar && shell.hasTopbar, JSON.stringify({ sidebar: shell.hasSidebar, topbar: shell.hasTopbar }));
  ck('关键内联块齐全（Tailwind / lucide / 框架 / 模块 / 守卫）',
    Object.values(shell.inlineBlocks).every(Boolean), JSON.stringify(shell.inlineBlocks));

  /* ---------- 2. 零外部依赖 ---------- */
  console.log('\n=== 2. 外部资源（应仅 Google Fonts 字体）===');
  const ext = await cdp.eval(`(function(){
    var out = { scripts: [], links: [], entries: [] };
    document.querySelectorAll('script[src]').forEach(function(s){ out.scripts.push(s.getAttribute('src')); });
    document.querySelectorAll('link[href]').forEach(function(l){ out.links.push(l.getAttribute('href')); });
    (performance.getEntriesByType('resource') || []).forEach(function(e){
      if (!/^file:/.test(e.name)) out.entries.push(e.name);
    });
    return out;
  })()`);
  ck('无外部 <script src>', ext.scripts.length === 0, JSON.stringify(ext.scripts));
  const nonFont = ext.links.filter((h) => !/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(h));
  ck('无 Google Fonts 之外的 <link>', nonFont.length === 0, JSON.stringify(nonFont));
  const nonFontReq = ext.entries.filter((u) => !/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(u));
  ck('实际发起的网络请求中无其它外部资源', nonFontReq.length === 0, JSON.stringify(nonFontReq.slice(0, 3)));

  const isOverseas = MODULE_ID === 'overseas-nav';
  if (!isOverseas) console.log('\n[跳过] 模块专属用例（数据渲染 / Tab / 星标 / 弹窗 / 筛选）仅对 overseas-nav 执行');
  else {
  /* ---------- 3. 数据与列表 ---------- */
  console.log('\n=== 3. 数据渲染（localStorage 契约与模块一致）===');
  const store = await cdp.eval(`(function(){
    var raw = localStorage.getItem('yundeng_overseas_nav_v1');
    if (!raw) return { key: false };
    var d = JSON.parse(raw);
    return { key: true, types: d.types.length, sites: d.sites.length };
  })()`);
  ck('写入 localStorage `yundeng_overseas_nav_v1`', store.key === true, JSON.stringify(store));
  ck('种子数据完整（12 类型 / 28 网站）', store.types === 12 && store.sites === 28, JSON.stringify(store));
  const rows = await cdp.eval(`document.querySelectorAll('#ov-site-tbody tr').length`);
  ck('网站列表渲染 28 行', rows === 28, String(rows));
  const typeRows = await cdp.eval(`document.querySelectorAll('#ov-type-tbody tr').length`);
  ck('类型列表渲染 12 行', typeRows === 12, String(typeRows));

  /* ---------- 4. 交互：Tab 切换（含单区块新规） ---------- */
  console.log('\n=== 4. 交互：Tab 切换 / 单区块 ===');
  const visibleBlocks = `(function(){
    var m = document.querySelector('.on-module');
    return Array.prototype.filter.call(m.children, function(el){ return el.tagName === 'SECTION' && !el.hidden; }).length;
  })()`;
  const blocksSites = await cdp.eval(visibleBlocks);
  ck('「网站管理」为两个区块', blocksSites === 2, String(blocksSites));
  ck('点击「类型管理」页签', await realClick(cdp, '.on-primary-tab[data-tab="types"]'));
  await sleep(250);
  const typesState = await cdp.eval(`(function(){
    var m = document.querySelector('.on-module');
    var blocks = Array.prototype.filter.call(m.children, function(el){ return el.tagName === 'SECTION' && !el.hidden; });
    var panel = document.getElementById('ov-panel-types');
    var card = document.querySelector('.on-primary-tabs').closest('section');
    return { blocks: blocks.length, inTabCard: panel.parentElement === card,
             activeTab: (m.querySelector('.on-primary-tab.is-active')||{}).textContent,
             filtersHidden: document.getElementById('ov-filters').hidden };
  })()`);
  ck('切到「类型管理」后仅一个区块', typesState.blocks === 1, JSON.stringify(typesState));
  ck('类型列表面板位于页签区块内', typesState.inTabCard === true);
  ck('筛选区随页签隐藏', typesState.filtersHidden === true);
  ck('点击切回「网站管理」', await realClick(cdp, '.on-primary-tab[data-tab="sites"]'));
  await sleep(250);
  ck('切回后恢复两个区块', (await cdp.eval(visibleBlocks)) === 2);

  /* ---------- 5. 交互：星标 / 弹窗 / 查询重置 ---------- */
  console.log('\n=== 5. 交互：星标 / 弹窗 / 筛选 ===');
  const starBefore = await cdp.eval(`(function(){
    var b = document.querySelector('#ov-site-tbody .on-star');
    return { pressed: b.getAttribute('aria-pressed'), cls: b.className };
  })()`);
  ck('点击星标按钮', await realClick(cdp, '#ov-site-tbody .on-star'));
  await sleep(200);
  const starAfter = await cdp.eval(`(function(){
    var b = document.querySelector('#ov-site-tbody .on-star');
    return { pressed: b.getAttribute('aria-pressed'), cls: b.className };
  })()`);
  ck('星标状态取反（aria-pressed 与样式同步）',
    starBefore.pressed !== starAfter.pressed && /is-on/.test(starBefore.cls) !== /is-on/.test(starAfter.cls),
    JSON.stringify({ before: starBefore, after: starAfter }));

  ck('点击「添加网站」', await realClick(cdp, '#ov-add-site'));
  await sleep(250);
  const modal = await cdp.eval(`(function(){
    var o = document.getElementById('ov-site-overlay');
    return { open: !o.hidden, title: (document.getElementById('ov-site-modal-title')||{}).textContent,
             ta: (function(){ var t = document.getElementById('ov-f-intro'); return t ? getComputedStyle(t).height : null; })() };
  })()`);
  ck('添加网站弹窗已打开', modal.open === true && modal.title === '添加网站', JSON.stringify(modal));
  ck('简介文本域 60px 生效（导出件样式未丢）', modal.ta === '60px', String(modal.ta));
  await cdp.eval(`document.querySelector('#ov-site-overlay [data-close="site"]').click()`);
  await sleep(150);
  ck('关闭弹窗', (await cdp.eval(`document.getElementById('ov-site-overlay').hidden`)) === true);

  const filterFlow = await cdp.eval(`(function(){
    document.getElementById('ov-search').value = 'ipfoxy';
    document.getElementById('ov-search').dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('ov-query').click();
    return document.querySelectorAll('#ov-site-tbody tr').length;
  })()`);
  ck('筛选「查询」生效（ipfoxy → 1 行）', filterFlow === 1, String(filterFlow));
  const afterReset = await cdp.eval(`(function(){
    document.getElementById('ov-reset').click();
    return document.querySelectorAll('#ov-site-tbody tr').length;
  })()`);
  ck('「重置」恢复全量 28 行', afterReset === 28, String(afterReset));

  }
  /* ---------- 6. 导出守卫：其它导航不跳转 ---------- */
  console.log('\n=== 6. 单文件导出守卫（其它菜单不跳转）===');
  const hrefBefore = await cdp.eval('location.href');
  const clickedOther = await realClick(cdp, 'a[data-app-route]:not([data-app-route="' + MODULE_ID + '"])');
  await sleep(250);
  const afterOther = await cdp.eval(`(function(){
    var host = document.getElementById('appToastContainer');
    var toast = host ? host.querySelector('.app-toast') : null;
    return { href: location.href, toast: toast ? toast.textContent : null,
             moduleStill: !!document.querySelector('.app-business-module') };
  })()`);
  ck('已定位到其它菜单项', clickedOther === true);
  ck('地址未跳转（停留在本单文件）', afterOther.href === hrefBefore, afterOther.href.slice(-40));
  ck('模块仍挂载（未被清空）', afterOther.moduleStill === true);
  ck('弹出「仅包含本模块」提示', /仅包含/.test(afterOther.toast || ''), String(afterOther.toast));

  /* ---------- 7. 无运行时异常 ---------- */
  console.log('\n=== 7. 运行时异常 ===');
  const errors = [];
  for (const ev of cdp.events) {
    if (ev.method === 'Runtime.exceptionThrown') {
      const d = ev.params.exceptionDetails;
      errors.push((d.exception && (d.exception.description || d.exception.value)) || d.text);
    }
    if (ev.method === 'Runtime.consoleAPICalled' && ev.params.type === 'error') {
      errors.push((ev.params.args || []).map((a) => a.value || a.description || '').join(' '));
    }
    if (ev.method === 'Log.entryAdded' && ev.params.entry.level === 'error') {
      errors.push(ev.params.entry.text + ' @ ' + (ev.params.entry.url || ''));
    }
  }
  /* Google Fonts 在无网/离线环境会报 net::ERR_*，属预期噪声，单独列出不计失败 */
  const fontNoise = errors.filter((e) => /fonts\.(googleapis|gstatic)\.com/.test(e));
  const realErrors = errors.filter((e) => !/fonts\.(googleapis|gstatic)\.com/.test(e));
  ck('无脚本运行时异常', realErrors.length === 0, realErrors.slice(0, 3).join(' | '));
  if (fontNoise.length) console.log('  [注]   忽略 Google Fonts 离线请求噪声 ' + fontNoise.length + ' 条');

  /* ---------- 8. 产物新鲜度 ---------- */
  console.log('\n=== 8. 产物新鲜度 ===');
  const mod = path.join(ROOT, 'Prototype/modules/overseas-nav.js');
  const shellJs = path.join(ROOT, 'Prototype/app-shell.js');
  ck('导出件 mtime 晚于模块源文件', mtimeOut > fs.statSync(mod).mtimeMs);
  ck('导出件 mtime 晚于框架文件', mtimeOut > fs.statSync(shellJs).mtimeMs);

  cdp.close(); chrome.kill('SIGKILL');
  await sleep(300);
  try { fs.rmSync(PROFILE, { recursive: true, force: true }); } catch (_) {}

  console.log('\n' + '-'.repeat(62));
  if (fails.length) { console.log('失败 ' + fails.length + ' 项：'); fails.forEach((f) => console.log('  · ' + f)); process.exit(1); }
  console.log('全部通过。');
})();
