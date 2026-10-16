/* 视觉验证：真实 Chrome 截图（复用 verify-computed-style.js 的「内联真实模块」手法）。
 * 为什么不直接开 index.html：单文件内联后无需起服务器，且能精确控制「点开哪些交互态」。
 * 用法：node .workbuddy/shoot-proxy-modal.js
 * 产物：.workbuddy/shots/*.png
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].find((p) => fs.existsSync(p));
if (!CHROME) { console.error('未找到 Chrome/Chromium'); process.exit(1); }

const modId = 'proxy-replacement';
const modFile = path.join(ROOT, 'Prototype/modules', modId + '.js');
const dom = new JSDOM('<!doctype html><html><body><div id="appContent"></div></body></html>', { url: 'http://localhost/' });
global.window = dom.window; global.document = dom.window.document; global.sessionStorage = dom.window.sessionStorage;
dom.window.lucide = { createIcons() {} };
vm.runInThisContext(fs.readFileSync(modFile, 'utf8'), { filename: modFile });
const mod = dom.window.YundengModules[modId];
const css = (mod.styles || []).join('\n');
const html = mod.html;
const moduleSrc = fs.readFileSync(modFile, 'utf8').replace(/<\/script/gi, '<\\/script');

const outDir = path.join(__dirname, 'shots');
fs.mkdirSync(outDir, { recursive: true });

// 用「最小框架壳」包住模块：只有内容区，避免引入 app-shell 的复杂依赖。
const page = (script) => `<!doctype html><html><head><meta charset="utf-8"><style>
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;background:#F7F8FA;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
#appContent{padding:16px}
${css}
</style></head><body>
<div id="appContent">${html}</div>
<script>${moduleSrc}<\/script>
<script>
(function(){
  window.YundengModules['${modId}'].init(document.getElementById('appContent'));
  ${script}
})();
<\/script></body></html>`;

const shots = [
  {
    name: '01-list-default',
    w: 1680, h: 1050,
    script: ``,
    note: '列表默认视图（列名应为「代理商」）',
  },
  {
    name: '02-modal-region-open',
    w: 1440, h: 1080,
    script: `document.querySelector('#pr-create').click();
      document.querySelector('#pr-region-trigger').click();`,
    note: '弹窗：更换地区下拉展开（层级展示 + 搜索框；无「说明」区块）',
  },
  {
    name: '03-modal-region-search',
    w: 1440, h: 1080,
    script: `document.querySelector('#pr-create').click();
      document.querySelector('#pr-region-trigger').click();
      var s=document.querySelector('#pr-region-search'); s.value='中国';
      s.dispatchEvent(new Event('input',{bubbles:true}));`,
    note: '弹窗：地区关键词搜索过滤（仅命中中国地区）',
  },
  {
    name: '04-modal-agent-linked',
    w: 1440, h: 1080,
    script: `document.querySelector('#pr-create').click();
      var a=document.querySelector('#pr-account'); a.value='100001';
      a.dispatchEvent(new Event('input',{bubbles:true}));
      var ip=document.querySelector('#pr-source-ip');
      setTimeout(function(){
        ip.value='198.51.100.21';
        ip.dispatchEvent(new Event('input',{bubbles:true}));
      }, 320);`,
    note: '弹窗：识别原代理后，地区默认带入中国-浙江-杭州，代理商按地区联动',
  },
];

for (const s of shots) {
  const tmp = path.join(os.tmpdir(), 'shoot-' + s.name + '.html');
  fs.writeFileSync(tmp, page(s.script), 'utf8');
  const png = path.join(outDir, s.name + '.png');
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
    '--hide-scrollbars', '--force-device-scale-factor=1',
    '--virtual-time-budget=3000',
    '--window-size=' + s.w + ',' + s.h,
    '--screenshot=' + png,
    'file://' + tmp,
  ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  const size = fs.statSync(png).size;
  console.log('  [OK] ' + s.name + '.png  ' + s.w + 'x' + s.h + '  ' + size + ' 字节  — ' + s.note);
}
console.log('产物目录: ' + outDir);
