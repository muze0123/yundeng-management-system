/* 真实浏览器「计算样式」守卫（jsdom 不做 CSS 级联，必须用真引擎）
 *
 * 为什么需要它：jsdom 的 getComputedStyle 不会做级联/优先级解析，也拿不到布局尺寸。
 * 于是「规则写在 CSS 文本里」≠「规则真正生效」。典型翻车现场：
 *   - 选择器写错类名（要素 class="control"，规则却写 textarea.on-control）→ 整条规则零匹配；
 *   - 特异性被基类压过（.on-module .control{height:32px} 压过 textarea.on-control{height:60px}）。
 * 本脚本把模块的**真实 CSS + 真实 HTML** 渲染进 headless Chrome，读取 getComputedStyle 与
 * offsetHeight/rect，按 spec 断言。
 *
 * 用法：node .workbuddy/verify-computed-style.js .workbuddy/specs/<name>.json
 * spec 结构：
 *   {
 *     "module": "overseas-nav",
 *     "unhide": ["ov-site-overlay"],              // 需要临时去掉 hidden 的容器 id（弹窗/抽屉）
 *     "extraClass": { "#ov-f-type": "is-placeholder" }, // 需要补上的运行时类名
 *     "checks": [
 *       { "selector": "#ov-f-intro", "props": { "height": "60px", "lineHeight": "20px" }, "offsetHeight": 60 },
 *       { "selector": "#ov-f-type",  "props": { "color": "rgb(157, 162, 172)" } }
 *     ]
 *   }
 * 退出码：0 = 全部通过；1 = 有断言失败或环境异常。
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');
const { JSDOM } = require('jsdom');

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].find((p) => fs.existsSync(p));

const specPath = process.argv[2];
if (!specPath) { console.error('用法: node .workbuddy/verify-computed-style.js <spec.json>'); process.exit(1); }
if (!CHROME) { console.error('未找到 Chrome/Chromium，无法做真实浏览器验证。'); process.exit(1); }

const ROOT = path.resolve(__dirname, '..');
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const modId = spec.module;

/* 1) 在 jsdom 中加载模块，取出真实 CSS 与真实 HTML */
const modFile = path.join(ROOT, 'Prototype/modules', modId === 'invoice-management' ? 'billing-invoice.js' : modId + '.js');

const dom = new JSDOM('<!doctype html><html><body><div id="appContent"></div></body></html>', { url: 'http://localhost/' });
global.window = dom.window; global.document = dom.window.document; global.localStorage = dom.window.localStorage;
dom.window.lucide = { createIcons() {} };
vm.runInThisContext(fs.readFileSync(modFile, 'utf8'), { filename: modFile });
const mod = dom.window.YundengModules[modId];
if (!mod) { console.error('模块未注册: ' + modId); process.exit(1); }

const css = (mod.styles || []).join('\n');
const html = mod.html;

/* 2) 拼装测量页：内联真实 CSS + 真实 HTML，去掉指定容器的 hidden，补运行时类名，输出 RESULT|{json} */
const unhide = JSON.stringify(spec.unhide || []);
const extraClass = JSON.stringify(spec.extraClass || {});
const checks = JSON.stringify(spec.checks || []);
const page = `<!doctype html><html><head><meta charset="utf-8"><style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0}
${css}
</style></head><body>
<div id="appContent">${html}</div>
<pre id="out">PENDING</pre>
<script>
(function(){
  ${unhide}.forEach(function(id){ var el=document.getElementById(id); if(el) el.hidden=false; });
  var ex=${extraClass}; Object.keys(ex).forEach(function(sel){ var el=document.querySelector(sel); if(el) el.classList.add(ex[sel]); });
  var checks=${checks};
  var results=checks.map(function(c){
    var el=document.querySelector(c.selector);
    if(!el) return {selector:c.selector, error:'元素未找到'};
    var added=[];
    var cls=c.extraClass?(Array.isArray(c.extraClass)?c.extraClass:[c.extraClass]):[];
    cls.forEach(function(cl){ if(!el.classList.contains(cl)){ el.classList.add(cl); added.push(cl); } });
    var cs=getComputedStyle(el);
    var props={};
    Object.keys(c.props||{}).forEach(function(k){ props[k]=cs[k]; });
    var res={selector:c.selector, props:props, offsetHeight:el.offsetHeight, offsetWidth:el.offsetWidth,
            rect:{height:Math.round(el.getBoundingClientRect().height), width:Math.round(el.getBoundingClientRect().width)}};
    added.forEach(function(cl){ el.classList.remove(cl); });
    return res;
  });
  document.getElementById('out').textContent='RESULT|'+JSON.stringify(results);
})();
<\/script></body></html>`;

const tmp = path.join(os.tmpdir(), 'verify-cs-' + modId + '.html');
fs.writeFileSync(tmp, page, 'utf8');

/* 3) 真引擎执行 */
let dump;
try {
  dump = execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
    '--virtual-time-budget=4000', '--dump-dom', 'file://' + tmp,
  ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });
} catch (e) {
  console.error('Chrome 执行失败: ' + e.message); process.exit(1);
}
const m = /RESULT\|(.*?)<\/pre>/s.exec(dump);
if (!m) { console.error('未能从页面取回测量结果（RESULT 标记缺失）'); process.exit(1); }
const results = JSON.parse(m[1]);

/* 4) 断言 */
const fails = [];
console.log('真实浏览器计算样式校验 · 模块=' + modId + ' · spec=' + path.basename(specPath));
console.log('引擎: ' + CHROME);
results.forEach((r, i) => {
  const expected = spec.checks[i];
  if (r.error) { fails.push(r.selector + ' → ' + r.error); console.log('  [FAIL] ' + r.selector + ' → ' + r.error); return; }
  const bad = [];
  Object.keys(expected.props || {}).forEach((k) => { if (r.props[k] !== expected.props[k]) bad.push(k + ' 期望「' + expected.props[k] + '」实际「' + r.props[k] + '」'); });
  if (expected.offsetHeight != null && r.offsetHeight !== expected.offsetHeight) bad.push('offsetHeight 期望 ' + expected.offsetHeight + ' 实际 ' + r.offsetHeight);
  if (expected.offsetWidth != null && r.offsetWidth !== expected.offsetWidth) bad.push('offsetWidth 期望 ' + expected.offsetWidth + ' 实际 ' + r.offsetWidth);
  const detail = 'offsetHeight=' + r.offsetHeight + ' ' + JSON.stringify(r.props);
  if (bad.length) { fails.push(r.selector + ' → ' + bad.join('; ')); console.log('  [FAIL] ' + r.selector + '  ' + detail); bad.forEach((b) => console.log('         · ' + b)); }
  else console.log('  [OK] ' + r.selector + '  ' + detail);
});

console.log('--------------------------------------------------------------');
if (fails.length) { console.log('失败 ' + fails.length + ' 项'); process.exitCode = 1; }
else console.log('全部通过。');
