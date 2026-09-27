// 交互冒烟测试：真实执行 init，并触发模块内每一个事件处理器，捕获运行时错误。
// 目的：抓出「语法/静态检查全绿但点击无反应」这类运行时缺陷（如未声明变量）。
const fs = require('fs');
const vm = require('vm');
const { JSDOM } = require('jsdom');

const MOD = 'Prototype/modules/proxy-replacement.js';
const src = fs.readFileSync(MOD, 'utf8');

const dom = new JSDOM(
  '<!doctype html><html><body><div class="app-account-name">数据管理员</div><div id="appContent"></div></body></html>',
  { url: 'http://localhost/', pretendToBeVisual: true }
);
const { window } = dom;
global.window = window;
global.document = window.document;
global.sessionStorage = window.sessionStorage;
global.FormData = window.FormData;
global.requestAnimationFrame = () => {};
// jsdom 下裸 innerWidth/innerHeight 不是全局变量，而 place() 用的是浏览器全局别名；补上以免假阳性。
global.innerWidth = 1440;
global.innerHeight = 900;
window.lucide = { createIcons() {} };

vm.runInThisContext(src, { filename: MOD });
const mod = window.YundengModules['proxy-replacement'];
const root = window.document.getElementById('appContent');
root.innerHTML = mod.html;

const $ = id => root.querySelector('#pr-' + id);
const failures = [];
function safe(label, fn) {
  try { const r = fn(); console.log('  [OK] ' + label); return r; }
  catch (e) { failures.push(label + ' -> ' + e.constructor.name + ': ' + e.message); console.log('  [FAIL] ' + label + ' -> ' + e.message); return null; }
}
function fire(el, type, opts) {
  if (!el) { failures.push('元素缺失，无法触发 ' + type); console.log('  [FAIL] 元素缺失: ' + type); return; }
  el.dispatchEvent(new window.Event(type, Object.assign({ bubbles: true, cancelable: true }, opts || {})));
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async function main() {
  console.log('=== A. init 与首屏 ===');
  safe('init(root)', () => mod.init(root));
  const countBefore = Number(String($('count').textContent).replace(/\D/g, '')) || 0;
  console.log('      首屏记录数: ' + countBefore);

  console.log('\n=== B. 打开更换代理弹窗 ===');
  safe('点击 create', () => $('create').click());
  console.log('      overlay hidden: ' + $('overlay').hidden);

  console.log('\n=== C. 弹窗：账号 → 原代理IP 双向联动 ===');
  safe('输入账号 100001', () => { $('account').value = '100001'; fire($('account'), 'input'); });
  await sleep(380);
  safe('输入原代理IP 198.51.100.21', () => { $('source-ip').value = '198.51.100.21'; fire($('source-ip'), 'input'); });
  await sleep(420);
  console.log('      信息卡片显示: ' + ($('asset-card').hidden === false));
  console.log('      关联用户下拉显示: ' + ($('ip-owners').hidden === false));
  const owners = $('ip-owners') ? $('ip-owners').querySelectorAll('[data-owner]') : [];
  console.log('      关联用户选项数: ' + owners.length);
  safe('点击关联用户选项', () => { if (owners[0]) owners[0].click(); });
  await sleep(380);
  safe('备注输入', () => { $('remark').value = '测试备注内容'; fire($('remark'), 'input'); });
  safe('渠道商 change', () => { $('channel').value = $('channel').options[1].value; fire($('channel'), 'change'); });
  safe('更换原因 change', () => { $('change-reason').value = $('change-reason').options[1].value; fire($('change-reason'), 'change'); });
  console.log('      提交按钮可用: ' + ($('submit').disabled === false));
  safe('提交更换表单', () => fire($('replace-form'), 'submit'));
  // submitReplacement 内部用 setTimeout 模拟请求、queueSync 再以 700ms 模拟同步；
  // 必须等它们全部落地，否则延迟回调会在后续步骤里 closeModal，造成假故障。
  await sleep(1800);
  console.log('      提交后弹窗已关闭: ' + $('overlay').hidden);
  const countAfter = Number(String($('count').textContent).replace(/\D/g, '')) || 0;
  console.log('      提交后记录数: ' + countAfter + '（提交前 ' + countBefore + '）');

  console.log('\n=== C2. 只输原代理IP（账号留空）→ 应出现关联用户单选下拉 ===');
  safe('重新打开弹窗', () => $('create').click());
  safe('账号置空', () => { $('account').value = ''; fire($('account'), 'input'); });
  safe('输入 IP 198.51.100.21（双持有者）', () => { $('source-ip').value = '198.51.100.21'; fire($('source-ip'), 'input'); });
  await sleep(420);
  console.log('      关联用户下拉显示: ' + ($('ip-owners').hidden === false));
  console.log('      选项数（应为 2）: ' + $('ip-owners').querySelectorAll('[data-owner]').length);
  const diag = tag => {
    const has = id => !!root.querySelector('#pr-' + id);
    console.log('      [' + tag + '] overlay.hidden=' + $('overlay').hidden +
      '，modal=' + !!$('overlay').querySelector('.pr-modal-header') +
      '，account 存在=' + has('account') +
      (has('ip-owners') ? '，ip-owners.hidden=' + $('ip-owners').hidden : '') +
      (has('asset-card') ? '，asset-card.hidden=' + $('asset-card').hidden : ''));
  };
  diag('点击 owner 前');
  safe('点击一个关联用户', () => { const b = $('ip-owners').querySelector('[data-owner]'); if (b) b.click(); });
  diag('点击 owner 后立即');
  await sleep(380);
  diag('点击 owner 后 380ms');
  console.log('      账号回填: 「' + (root.querySelector('#pr-account') ? root.querySelector('#pr-account').value : '(元素已消失)') + '」');
  console.log('      信息卡片显示: ' + ($('asset-card').hidden === false));
  safe('输入无关联账号 100002（应 toast 且不可提交）', () => { $('account').value = '100002'; fire($('account'), 'input'); });
  await sleep(380);
  console.log('      提交按钮可用（应为 false）: ' + ($('submit').disabled === false));
  console.log('      toast 内容: 「' + String($('toast').textContent).slice(0, 30) + '」，显示: ' + ($('toast').hidden === false));
  safe('关闭弹窗', () => { const b = $('overlay').querySelector('[data-close]'); if (b) b.click(); });

  console.log('\n=== D. 筛选区：更换原因多选下拉 ===');
  safe('点击 reason-filter-trigger', () => $('reason-filter-trigger').click());
  console.log('      浮层显示: ' + ($('reason-filter-pop').hidden === false));
  const opts = $('reason-filter-list') ? $('reason-filter-list').querySelectorAll('[data-reason]') : [];
  console.log('      选项数（应为 13）: ' + opts.length);
  safe('勾选第 1 项', () => { if (opts[0]) opts[0].click(); });
  safe('勾选第 2 项', () => { if (opts[1]) opts[1].click(); });
  console.log('      触发器文案: 「' + $('reason-filter-text').textContent + '」');
  console.log('      隐藏域值: ' + $('reason-filter').value);
  safe('取消勾选第 1 项', () => { if (opts[0]) opts[0].click(); });
  console.log('      取消后触发器文案: 「' + $('reason-filter-text').textContent + '」');

  console.log('\n=== E. 查询 / 排序 / 分页 / 操作人 / 日期 ===');
  safe('提交筛选表单（查询）', () => fire($('filters'), 'submit'));
  safe('筛选区 input 事件', () => fire($('reason-filter'), 'input'));
  safe('点击排序', () => $('sort').click());
  safe('点击分页下一页', () => { const b = $('pagination').querySelector('[data-page]'); if (b) b.click(); });
  safe('点击每页条数 change', () => { const s = $('pagination').querySelector('[data-size]'); if (s) fire(s, 'change'); });
  safe('点击操作人触发器', () => $('operator-trigger').click());
  safe('操作人搜索输入', () => { $('operator-search').value = '陈'; fire($('operator-search'), 'input'); });
  const opOpts = $('operator-list') ? $('operator-list').querySelectorAll('[data-operator]') : [];
  safe('选择操作人', () => { if (opOpts[1]) opOpts[1].click(); });
  safe('点击日期触发器', () => $('date-trigger').click());
  safe('日期触发器 Enter 键', () => fire($('date-trigger'), 'keydown', { key: 'Enter' }));
  safe('日历内点击日期', () => { const d = $('calendar').querySelector('button:not([disabled])'); if (d) d.click(); });
  safe('重置筛选', () => $('reset').click());

  console.log('\n=== F. 行内交互：备注悬浮 / 重试同步 / 空态重置 ===');
  safe('pointerover 备注文本', () => { const t = root.querySelector('.pr-help-text'); if (t) fire(t, 'pointerover'); });
  console.log('      原因浮层显示: ' + ($('reason-pop').hidden === false) + '，内容: 「' + String($('reason-pop').textContent).slice(0, 20) + '」');
  safe('pointerout 备注文本', () => { const t = root.querySelector('.pr-help-text'); if (t) fire(t, 'pointerout'); });
  safe('focusin 备注文本', () => { const t = root.querySelector('.pr-help-text'); if (t) fire(t, 'focusin'); });
  safe('focusout 备注文本', () => { const t = root.querySelector('.pr-help-text'); if (t) fire(t, 'focusout'); });
  safe('原因浮层 pointerenter/leave', () => { fire($('reason-pop'), 'pointerenter'); fire($('reason-pop'), 'pointerleave'); });
  safe('点击重试同步', () => { const b = root.querySelector('[data-retry]'); if (b) b.click(); });
  safe('点击空态重置', () => { const b = root.querySelector('[data-reset]'); if (b) b.click(); });
  safe('表格横向滚动', () => fire($('table-scroll'), 'scroll'));
  safe('root keydown（Esc）', () => fire(root, 'keydown', { key: 'Escape' }));
  safe('root change 分页', () => { const s = $('pagination').querySelector('[data-size]'); if (s) fire(s, 'change'); });

  console.log('\n=== G. 弹窗关闭路径 ===');
  safe('点击弹窗取消按钮', () => { const b = $('overlay').querySelector('[data-close]'); if (b) b.click(); });
  safe('点击遮罩关闭', () => $('overlay').click());
  safe('document pointerdown 外部', () => window.document.dispatchEvent(new window.Event('pointerdown', { bubbles: true })));
  safe('document keydown', () => window.document.dispatchEvent(new window.Event('keydown', { bubbles: true })));
  safe('window resize', () => window.dispatchEvent(new window.Event('resize')));
  safe('window pagehide', () => window.dispatchEvent(new window.Event('pagehide')));

  console.log('\n================ 汇总 ================');
  if (failures.length === 0) {
    console.log('全部通过，未捕获任何运行时错误。');
  } else {
    console.log('捕获 ' + failures.length + ' 个运行时错误：');
    failures.forEach((f, i) => console.log('  ' + (i + 1) + '. ' + f));
    process.exitCode = 1;
  }
})();
