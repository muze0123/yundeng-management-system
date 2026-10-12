/* 返佣管理 · 真实渲染截图（CDN 正常加载，非离线模式）
 * 产出：.workbuddy/shots/rm-{summary,settings,modal}.png
 * 跑法：node .workbuddy/shoot-rebate.js
 */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'shots');
const SHELL = path.join(
  process.env.HOME,
  'Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell'
);
const PORT = 9345, HTTP_PORT = 8791;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function cdp(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++cdp.seq;
    const onMsg = ev => {
      const m = JSON.parse(ev.data);
      if (m.id === id) { ws.removeEventListener('message', onMsg); m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result); }
    };
    ws.addEventListener('message', onMsg);
    ws.send(JSON.stringify({ id, method, params }));
  });
}
cdp.seq = 0;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = spawn('/Users/zhangbin/.workbuddy/binaries/python/versions/3.13.12/bin/python3',
    ['-m', 'http.server', String(HTTP_PORT), '--bind', '127.0.0.1'], { cwd: ROOT, stdio: 'ignore' });
  await sleep(1200);

  const browser = spawn(SHELL, [`--remote-debugging-port=${PORT}`, '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
  let target = null;
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' }); if (r.ok) { target = await r.json(); break; } } catch (e) {}
    await sleep(300);
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  await cdp(ws, 'Page.enable');
  await cdp(ws, 'Runtime.enable');
  await cdp(ws, 'Emulation.setDeviceMetricsOverride', { width: 1440, height: 960, deviceScaleFactor: 2, mobile: false });

  // 不拦截请求 → CDN（Tailwind / lucide / 字体）正常加载，截图与真实浏览器一致
  await cdp(ws, 'Page.navigate', { url: `http://127.0.0.1:${HTTP_PORT}/index.html?page=rebate-management` });
  await sleep(6000);

  const shoot = async (name, expr) => {
    if (expr) { await cdp(ws, 'Runtime.evaluate', { expression: expr }); await sleep(700); }
    const { data } = await cdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const file = path.join(OUT, `rm-${name}.png`);
    fs.writeFileSync(file, Buffer.from(data, 'base64'));
    console.log('  saved', file, Math.round(fs.statSync(file).size / 1024) + 'KB');
  };

  await shoot('summary');                                              // 返佣汇总：金额列 ￥
  await shoot('settings', `document.querySelector('.rm-primary-tab[data-tab="settings"]').click()`);  // 返佣设置：金额列 ￥
  await shoot('modal', `document.querySelectorAll('[data-edit-kind="withdraw"]')[0].click()`);         // 编辑弹窗：￥ 前缀

  ws.close(); browser.kill(); server.kill();
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(2); });
