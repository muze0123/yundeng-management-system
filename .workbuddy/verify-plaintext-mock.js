// Mock 数据「明文化」回归验证：确认 user-list / ops-user-list / billing-invoice
// 三个模块的 mock 手机号、邮箱已改为明文，且产品级受控字段（发票税号、受控电话）仍保留脱敏。
//
// 背景：claude.md §六 于 2026-10-10 修订——mock 手机号/邮箱/账号一律明文，
// 仅代理凭证必须脱敏；产品级字段脱敏（如发票税号、受控电话）由各模块 PRD 规定，不受影响。
//
// 跑法：
//   NODE_PATH=/Users/zhangbin/.workbuddy/binaries/node/workspace/node_modules \
//   /Users/zhangbin/.workbuddy/binaries/node/versions/22.22.2-6/bin/node .workbuddy/verify-plaintext-mock.js
const fs = require('fs');
const vm = require('vm');
const { JSDOM, VirtualConsole } = require('jsdom');

const failures = [];
const ok = (label, extra) => console.log('  [OK] ' + label + (extra ? '  ' + extra : ''));
const check = (label, fn) => {
  try { const extra = fn(); ok(label, extra); }
  catch (e) { failures.push(label + ' -> ' + e.message); console.log('  [FAIL] ' + label + ' -> ' + e.message); }
};
const must = (cond, msg) => { if (!cond) throw new Error(msg); };

// 渲染一个模块：注入 html + 执行 scripts，返回 { body, errs, src }
function render(file, id) {
  const src = fs.readFileSync('Prototype/modules/' + file, 'utf8');
  const errs = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => errs.push('jsdomError: ' + e.message));
  vc.on('error', (...a) => errs.push('console.error: ' + a.map(String).join(' ')));

  const dom = new JSDOM(
    '<!doctype html><html><body><main id="appContent" data-module-root="' + id + '"></main>' +
    '<div id="appToastContainer"></div><div id="appModalRoot"></div></body></html>',
    { url: 'http://localhost/', pretendToBeVisual: true, virtualConsole: vc }
  );
  const w = dom.window;
  for (const k of ['window', 'document', 'sessionStorage', 'localStorage', 'FormData', 'MutationObserver', 'navigator', 'HTMLElement', 'Element', 'Node', 'Event', 'CustomEvent', 'getComputedStyle', 'DOMParser', 'AbortController', 'matchMedia', 'innerWidth', 'innerHeight']) {
    try { global[k] = typeof w[k] === 'function' && k !== 'getComputedStyle' ? w[k].bind(w) : w[k]; } catch (_) {}
  }
  global.window = w; global.document = w.document;
  global.innerWidth = 1440; global.innerHeight = 900;
  global.requestAnimationFrame = () => {}; global.cancelAnimationFrame = () => {};
  w.requestAnimationFrame = () => {}; w.cancelAnimationFrame = () => {};
  w.lucide = { createIcons() {} };
  w.matchMedia = w.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {} }));

  vm.runInThisContext(src, { filename: file });
  const mod = w.YundengModules[id];
  const root = w.document.getElementById('appContent');
  root.innerHTML = mod.html;

  (mod.scripts || []).forEach((code, i) => {
    try { w.eval(code); } catch (e) { errs.push('script[' + i + ']: ' + e.message); }
  });
  return { body: w.document.body.textContent, src, mod, errs, doc: w.document };
}

const noMasks = (body, allow) => {
  const found = (body.match(/[0-9A-Za-z._%+-]*\*{2,}[0-9A-Za-z._%+-]*/g) || [])
    .filter(t => t.replace(/\*/g, '').length > 0)
    .filter(t => !(allow || []).some(a => t.includes(a)));
  return found;
};

// ---------------------------------------------------------------- user-list
console.log('=== 1. 用户列表（user-list.js）===');
{
  const r = render('user-list.js', 'user-list');
  check('渲染无运行时错误', () => must(r.errs.length === 0, r.errs.join(' | ')));
  check('3 个原脱敏手机号已改为明文', () => {
    ['13956230918', '17632103355', '18674327721'].forEach(v =>
      must(r.body.includes(v), '缺少明文手机号 ' + v));
    return '13956230918 / 17632103355 / 18674327721';
  });
  check('渲染结果中不再出现掩码', () => {
    const left = noMasks(r.body);
    must(left.length === 0, '仍存在掩码 ' + left.join(', '));
  });
  check('源码中不再有 11 位手机号掩码', () => {
    const left = r.src.match(/1[3-9]\d\*{2,}\d{4}/g) || [];
    must(left.length === 0, '源码残留 ' + left.join(', '));
  });
}

// ----------------------------------------------------------- ops-user-list
console.log('\n=== 2. 运营用户列表（ops-user-list.js）===');
{
  const r = render('ops-user-list.js', 'ops-user-list');
  check('渲染无运行时错误', () => must(r.errs.length === 0, r.errs.join(' | ')));
  check('运行时脱敏函数已移除（无 slice(0,3)+\'****\' 拼接）', () =>
    must(!/slice\(0,3\)\s*\+\s*'\*{4}'/.test(r.src), '仍存在运行时脱敏拼接'));
  check('硬编码掩码 133****7745 已改为明文', () =>
    must(r.src.includes('13377457745'), '未找到明文 13377457745'));
  check('账号列渲染为明文 11 位手机号（逐行校验）', () => {
    const rows = [...r.doc.querySelectorAll('#appContent tbody tr')];
    must(rows.length >= 10, '渲染行数不足：' + rows.length);
    rows.forEach((tr, i) => {
      const cell = (tr.querySelectorAll('td')[1] || {}).textContent || '';
      const v = cell.trim();
      must(/^1[3-9]\d{9}$/.test(v), '第 ' + (i + 1) + ' 行账号非明文手机号：' + JSON.stringify(v));
    });
    return rows.length + ' 行账号列全部为明文手机号';
  });
  check('「曾用手机号」硬编码掩码已明文（第 4 行）', () => {
    const rows = [...r.doc.querySelectorAll('#appContent tbody tr')];
    const used = (rows[3].querySelectorAll('td')[2] || {}).textContent || '';
    must(used.includes('13377457745'), '第 4 行曾用手机号未明文：' + JSON.stringify(used.trim()));
    return used.trim();
  });
  check('渲染结果中不再出现掩码', () => {
    const left = noMasks(r.body);
    must(left.length === 0, '仍存在掩码 ' + left.join(', '));
  });
}

// --------------------------------------------------------- billing-invoice
console.log('\n=== 3. 发票管理（billing-invoice.js）===');
{
  const r = render('billing-invoice.js', 'invoice-management');
  check('渲染无运行时错误', () => must(r.errs.length === 0, r.errs.join(' | ')));
  check('受票方联系邮箱已改为明文（其 PRD 要求「授权列表完整展示」）', () => {
    ['finance@qiming.cn', 'service@mail.com', 'finance@yunstack.cn',
     'admin@yunji.cn', 'finance@chengming.cn', 'contact@xinghe.cn'].forEach(v =>
      must(r.src.includes(v), '源码缺少明文邮箱 ' + v));
    const left = r.src.match(/[0-9A-Za-z._%+-]+\*{2,}@[A-Za-z0-9.-]+/g) || [];
    must(left.length === 0, '源码仍残留邮箱掩码 ' + left.join(', '));
    return '6 个邮箱全部明文';
  });
  check('产品级受控字段仍保留脱敏（税号 ×2、受控电话 ×1）', () => {
    ['9131**********48', '9144**********19', '138****8888'].forEach(v =>
      must(r.src.includes(v), '受控字段掩码被误删：' + v));
    return '税号 2 个 + 受控电话 1 个均保留';
  });
  // 税号与受控电话分别位于「开票配置 / 主体管理」与详情弹窗，默认「申请管理」视图不渲染它们；
  // 故此处做源码级校验（上面的用例已覆盖），DOM 侧改为切到「票据管理」Tab 校验受票方联系邮箱。
  check('票据管理列表渲染出明文受票方联系邮箱', () => {
    const tab = [...r.doc.querySelectorAll('.invoice-primary-tab')].find(t => t.textContent.includes('票据管理'));
    must(tab, '未找到「票据管理」Tab');
    tab.click();
    const body = r.doc.getElementById('appContent').textContent;
    const mails = body.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || [];
    must(mails.length > 0, '票据列表中未渲染出任何邮箱');
    const masks = (body.match(/[0-9A-Za-z._%+-]*\*{2,}@[A-Za-z0-9.-]+/g) || []);
    must(masks.length === 0, '仍渲染出邮箱掩码 ' + masks.join(', '));
    return mails.length + ' 处邮箱，均为明文';
  });
}

console.log('\n=== 结果 ===');
if (failures.length) {
  console.log('存在 ' + failures.length + ' 项失败：');
  failures.forEach(f => console.log('  - ' + f));
  process.exit(1);
}
console.log('全部通过：mock 手机号/邮箱已明文，产品级受控字段脱敏保留。');
