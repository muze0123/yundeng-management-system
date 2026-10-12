// 返佣管理模块交互冒烟测试：真实执行 init，并触发模块内每一个事件处理器，捕获运行时错误。
// 目的：抓出「语法/静态检查全绿但点击无反应」这类运行时缺陷。
const fs = require('fs');
const vm = require('vm');
const { JSDOM } = require('jsdom');

const MOD = 'Prototype/modules/rebate-management.js';
const src = fs.readFileSync(MOD, 'utf8');

const dom = new JSDOM(
  '<!doctype html><html><body><main id="appContent"></main><div id="appToastContainer"></div></body></html>',
  { url: 'http://localhost/', pretendToBeVisual: true }
);
const { window } = dom;
global.window = window;
global.document = window.document;
global.sessionStorage = window.sessionStorage;
global.FormData = window.FormData;
global.requestAnimationFrame = () => {};
global.innerWidth = 1440;
global.innerHeight = 900;
global.MutationObserver = window.MutationObserver;
global.AbortController = window.AbortController;
window.lucide = { createIcons() {} };

vm.runInThisContext(src, { filename: MOD });
const mod = window.YundengModules['rebate-management'];
const root = window.document.getElementById('appContent');
root.innerHTML = mod.html;

const $ = id => root.querySelector('#rm-' + id);
const failures = [];
function safe(label, fn) {
  try { const r = fn(); console.log('  [OK] ' + label); return r; }
  catch (e) { failures.push(label + ' -> ' + e.constructor.name + ': ' + e.message); console.log('  [FAIL] ' + label + ' -> ' + e.message); return null; }
}
function assert(label, cond, detail) {
  if (cond) { console.log('  [OK] ' + label + (detail ? '\n        ' + detail : '')); return true; }
  failures.push(label + (detail ? ' -> ' + detail : ''));
  console.log('  [FAIL] ' + label + (detail ? '\n        ' + detail : ''));
  return false;
}
function fire(el, type, opts) {
  if (!el) { failures.push('元素缺失，无法触发 ' + type); console.log('  [FAIL] 元素缺失: ' + type); return; }
  // 键盘事件必须使用 KeyboardEvent，否则 e.key 为 undefined，会导致处理器分支静默跳过。
  const isKey = /^key(down|up|press)$/.test(type);
  const Ctor = isKey ? window.KeyboardEvent : window.Event;
  el.dispatchEvent(new Ctor(type, Object.assign({ bubbles: true, cancelable: true }, opts || {})));
}
const rows = () => root.querySelectorAll('#rm-panel tbody tr');
const tab = key => root.querySelector(`.rm-primary-tab[data-tab="${key}"]`);
const activeSort = () => $('panel').querySelector('.rm-sort.is-active');
const activeCaret = () => activeSort()?.querySelector('.rm-caret').className.trim();

(async function main() {
  console.log('=== A. init 与首屏（返佣汇总）===');
  safe('init(root)', () => mod.init(root));
  console.log('      一级 Tab 数: ' + root.querySelectorAll('.rm-primary-tab').length);
  console.log('      当前激活 Tab: ' + root.querySelector('.rm-primary-tab.is-active')?.dataset.tab);
  console.log('      汇总行数: ' + rows().length + '，计数文案: ' + $('count').textContent);

  console.log('\n=== B. 返佣汇总：排序表头 ===');
  // 回归断言：用户ID / 手机号邮箱账户 两列已按需求取消升序降序图标（应无排序按钮、无 caret）
  const sumHeads = [...$('panel').querySelectorAll('thead th')];
  const sortableLabels = sumHeads.filter(th => th.querySelector('.rm-sort')).map(th => th.textContent.trim());
  assert('表头共 8 列（已移除账户余额）', sumHeads.length === 8, '实际: ' + sumHeads.length + ' → ' + sumHeads.map(th => th.textContent.trim()).join(' / '));
  assert('「账户余额」列已移除', !sumHeads.some(th => th.textContent.trim() === '账户余额') && !$('panel').querySelector('.rm-sort[data-sort="balance"]'),
    '表头: ' + sumHeads.map(th => th.textContent.trim()).join(' / '));
  assert('「用户ID」列无排序按钮', !$('panel').querySelector('.rm-sort[data-sort="id"]'),
    '该列表头内容: ' + (sumHeads[0] ? sumHeads[0].querySelectorAll('button,.rm-caret').length + ' 个排序元素' : '(缺失)'));
  assert('「手机号/邮箱/账户」列无排序按钮', !$('panel').querySelector('.rm-sort[data-sort="phone"]'),
    '该列表头内容: ' + (sumHeads[1] ? sumHeads[1].querySelectorAll('button,.rm-caret').length + ' 个排序元素' : '(缺失)'));
  assert('可排序列恰好 6 列（累计佣金~返佣比例）', sortableLabels.length === 6, '可排序: ' + sortableLabels.join(' / '));

  // 金额口径：列表金额列必须带 ￥ 前缀；数量列与比例列不带
  const MONEY = /^￥[\d,]+\.\d{2}$/;
  const firstRow = rows()[0];
  // 单元格可能内含「明细」链接，取内层金额 span 文本（无 span 时退回整格文本）
  const cell = i => {
    const el = firstRow ? firstRow.children[i] : null;
    if (!el) return '';
    const span = el.querySelector('.font-mono');
    return (span || el).textContent.trim();
  };
  const amountIdx = [2, 3, 4, 5]; // 累计佣金/冻结佣金/可提现金额/累计提现（账户余额已移除）
  const badMoney = amountIdx.filter(i => !MONEY.test(cell(i)));
  assert('汇总金额列均以 ￥ 开头', badMoney.length === 0,
    '各列值: ' + amountIdx.map(i => i + '=' + cell(i)).join(' | '));
  assert('「邀请用户数」为纯数量不加 ￥', /^\d+$/.test(cell(6)), '值: ' + cell(6));
  assert('「返佣比例」不加 ￥', /^\d+%$/.test(cell(7)), '值: ' + cell(7));
  assert('整行不含「元」字样', !firstRow?.textContent.includes('元'), firstRow?.textContent.trim().slice(0, 120));

  // 空态：colspan 必须与列数一致（8），否则表格骨架错位
  safe('汇总输入不存在的用户关键词', () => { $('form').elements['user'].value = '__no_such_user__'; fire($('form'), 'submit'); });
  const emptyTd = $('panel').querySelector('tbody td.rm-empty');
  assert('空态 colspan=8 且仅一行空态', !!emptyTd && emptyTd.getAttribute('colspan') === '8' && rows().length === 1,
    'colspan=' + (emptyTd ? emptyTd.getAttribute('colspan') : '(无空态单元格)') + ' 行数=' + rows().length);
  safe('点击重置恢复列表', () => $('form').querySelector('[data-reset]').click());
  assert('重置后行数恢复为 14', rows().length === 14, '行数=' + rows().length);
  safe('点击「累计佣金」排序', () => root.querySelector('.rm-sort[data-sort="totalCommission"]').click());
  console.log('      排序态: ' + (activeSort()?.dataset.sort) + ' / ' + activeCaret() + ' / aria-sort=' + activeSort()?.closest('th').getAttribute('aria-sort'));
  safe('再次点击切换方向', () => root.querySelector('.rm-sort[data-sort="totalCommission"]').click());
  console.log('      切换后: ' + activeCaret() + ' / aria-sort=' + activeSort()?.closest('th').getAttribute('aria-sort'));
  safe('点击「邀请用户数」排序（新字段默认降序）', () => root.querySelector('.rm-sort[data-sort="inviteCount"]').click());
  console.log('      排序态: ' + (activeSort()?.dataset.sort) + ' / ' + activeCaret() + ' / 表头高亮数=' + $('panel').querySelectorAll('.rm-sort.is-active').length);

  console.log('\n=== C. 返佣汇总：明细跳转 ===');
  safe('点击「累计佣金」明细', () => root.querySelector('[data-goto="rebate"]').click());
  console.log('      激活 Tab: ' + root.querySelector('.rm-primary-tab.is-active')?.dataset.tab);
  console.log('      邀请者筛选值: ' + ($('form').elements['inviter'] ? $('form').elements['inviter'].value : '(无)'));
  console.log('      明细行数: ' + rows().length);
  safe('点击「可提现金额」明细 → 提现明细', () => { tab('summary').click(); root.querySelector('[data-goto="withdraw"]').click(); });
  console.log('      激活 Tab: ' + root.querySelector('.rm-primary-tab.is-active')?.dataset.tab);
  console.log('      邀请用户ID筛选值: ' + ($('form').elements['inviterId'] ? $('form').elements['inviterId'].value : '(无)'));
  safe('点击「冻结佣金」明细 → 冻结明细', () => { tab('summary').click(); root.querySelector('[data-goto="freeze"]').click(); });
  safe('点击「邀请用户数」明细 → 邀请明细', () => { tab('summary').click(); root.querySelector('[data-goto="invite"]').click(); });

  console.log('\n=== D. 全 Tab 遍历 ===');
  ['summary', 'rebate', 'freeze', 'invite', 'withdraw', 'settings'].forEach(key => {
    safe('切换到 ' + key, () => tab(key).click());
    console.log('      ' + key + ' → 激活=' + (root.querySelector('.rm-primary-tab.is-active')?.dataset.tab) + '，行数=' + rows().length + '，表单显示=' + !$('form').hidden);
  });

  console.log('\n=== E. 筛选查询 / 重置（返佣明细）===');
  safe('切到返佣明细', () => tab('rebate').click());
  safe('输入订单类型=续费套餐并查询', () => {
    $('form').elements['orderType'].value = '续费套餐';
    fire($('form'), 'submit');
  });
  console.log('      过滤后行数: ' + rows().length + '，计数: ' + $('count').textContent);
  safe('输入订单号片段并查询', () => {
    $('form').elements['orderNo'].value = 'SO20269';
    fire($('form'), 'submit');
  });
  console.log('      过滤后行数: ' + rows().length);
  safe('重置', () => root.querySelector('[data-reset]').click());
  console.log('      重置后行数: ' + rows().length);

  console.log('\n=== F. 分页（返佣明细 26 条）===');
  safe('点击下一页', () => $('pagination').querySelector('[data-page="2"]').click());
  console.log('      第 2 页行数: ' + rows().length + '，分页统计: ' + ($('pagination').querySelector('.pg-stats')?.textContent.trim()));
  safe('切换每页 10 条', () => { const s = $('pagination').querySelector('select[data-size]'); s.value = '10'; fire(s, 'change'); });
  console.log('      每页10行数: ' + rows().length);
  safe('跳页输入 99 出错提示', () => { const j = $('pagination').querySelector('[data-jump]'); j.value = '99'; fire(j, 'keydown', { key: 'Enter' }); });
  console.log('      跳页输入框复位为: ' + $('pagination').querySelector('[data-jump]').value);
  safe('跳页输入 2 正常跳转', () => { const j = $('pagination').querySelector('[data-jump]'); j.value = '2'; fire(j, 'keydown', { key: 'Enter' }); });
  console.log('      跳转后分页统计: ' + ($('pagination').querySelector('.pg-stats')?.textContent.trim()));

  console.log('\n=== G. 日期范围选择器（提现明细）===');
  safe('切到提现明细', () => tab('withdraw').click());
  safe('展开日期下拉', () => $('form').querySelector('[data-date="created"]').click());
  console.log('      日历可见: ' + !$('calendar').hidden + '，日期格数: ' + $('calendar').querySelectorAll('[data-day]').length);
  safe('选择开始日期', () => $('calendar').querySelectorAll('[data-day]')[20].click());
  safe('选择结束日期', () => $('calendar').querySelectorAll('[data-day]')[34].click());
  safe('确定', () => $('calendar').querySelector('[data-calendar-confirm]').click());
  console.log('      日期按钮文案: ' + $('form').querySelector('[data-date="created"] span').textContent);
  safe('查询（带日期范围）', () => fire($('form'), 'submit'));
  console.log('      日期过滤后行数: ' + rows().length);
  // 提现明细：交易金额为「+￥xx.xx / -￥xx.xx」，账户余额亦带 ￥
  const wRow = rows()[0];
  const wAmount = wRow ? wRow.children[4].textContent.trim() : '';
  const wBalanceEl = wRow ? wRow.children[2] : null;
  const wBalance = wBalanceEl ? (wBalanceEl.querySelector('.font-mono') || wBalanceEl).textContent.trim() : '';
  assert('提现明细交易金额为 ±￥ 形式', /^[+-]￥[\d,]+\.\d{2}$/.test(wAmount), '值: ' + wAmount);
  assert('提现明细账户余额带 ￥', /^￥[\d,]+\.\d{2}$/.test(wBalance), '值: ' + wBalance);

  console.log('\n=== H. 返佣设置：编辑弹窗 ===');
  safe('切到返佣设置', () => tab('settings').click());
  console.log('      设置表数: ' + $('panel').querySelectorAll('table').length + '，表单隐藏: ' + $('form').hidden);
  // 金额口径：提现设置表的金额列必须带 ￥；返佣比例列不带
  const settingTables = [...$('panel').querySelectorAll('table')];
  const ratioCell = settingTables[0]?.querySelector('tbody tr td:nth-child(2)')?.textContent.trim();
  const amountCells = [...(settingTables[1]?.querySelectorAll('tbody tr td:nth-child(2)') || [])].map(td => td.textContent.trim());
  assert('返佣设置比例列不带 ￥', /^\d+%$/.test(ratioCell), '值: ' + ratioCell);
  assert('返佣设置金额列均以 ￥ 开头', amountCells.length > 0 && amountCells.every(t => /^￥[\d,]+\.\d{2}$/.test(t)), '值: ' + amountCells.join(' | '));
  safe('点击「海鸥」编辑', () => $('panel').querySelector('[data-edit-kind="ratio"]').click());
  assert('比例弹窗单位为 % 后缀、无 ￥ 前缀', !!$('layer').querySelector('.rm-suffix') && !$('layer').querySelector('.rm-prefix'),
    'suffix=' + !!$('layer').querySelector('.rm-suffix') + ' prefix=' + !!$('layer').querySelector('.rm-prefix'));
  console.log('      弹窗标题: ' + $('modal-title')?.textContent + '，输入值: ' + $('edit-value')?.value);
  safe('比例改为 120 → 应报错', () => { $('edit-value').value = '120'; $('layer').querySelector('[data-save]').click(); });
  console.log('      错误提示: ' + $('edit-error').textContent);
  safe('比例改为 25 → 保存', () => { $('edit-value').value = '25'; $('layer').querySelector('[data-save]').click(); });
  console.log('      弹窗已关闭: ' + ($('layer').innerHTML === '') + '，表内值: ' + $('panel').querySelector('tbody tr td:nth-child(2)').textContent);
  safe('点击「最低提现金额」编辑', () => $('panel').querySelectorAll('[data-edit-kind="withdraw"]')[0].click());
  assert('金额弹窗为 ￥ 前缀、label 不再重复「元」',
    !!$('layer').querySelector('.rm-prefix') && $('layer').querySelector('.rm-prefix').textContent.trim() === '￥' && !$('layer').textContent.includes('（元）'),
    'label: ' + $('layer').querySelector('label')?.textContent + '；前缀: ' + $('layer').querySelector('.rm-prefix')?.textContent);
  safe('最低改为 9000 → 应报错（>= 最高 5000）', () => { $('edit-value').value = '9000'; $('layer').querySelector('[data-save]').click(); });
  console.log('      错误提示: ' + $('edit-error').textContent);
  safe('改为 200 → 保存', () => { $('edit-value').value = '200'; $('layer').querySelector('[data-save]').click(); });
  safe('Escape 关闭弹窗', () => { $('panel').querySelector('[data-edit-kind="ratio"]').click(); fire($('layer').querySelector('input'), 'keydown', { key: 'Escape' }); });
  console.log('      弹窗已关闭: ' + ($('layer').innerHTML === ''));
  safe('日期浮层 Escape 关闭', () => { tab('rebate').click(); $('form').querySelector('[data-date="created"]').click(); const opened = !$('calendar').hidden; fire($('calendar').querySelector('[data-day]'), 'keydown', { key: 'Escape' }); console.log('      打开=' + opened + ' → Escape 后日历隐藏=' + $('calendar').hidden); });
  safe('Tab 方向键切换一级 Tab', () => { tab('summary').click(); fire(tab('summary'), 'keydown', { key: 'ArrowRight' }); });
  console.log('      方向键后激活 Tab: ' + root.querySelector('.rm-primary-tab.is-active')?.dataset.tab);

  console.log('\n=== I. 刷新态恢复（重新 init）===');
  safe('重新 init 并读取激活 Tab', () => { root.innerHTML = mod.html; mod.init(root); });
  console.log('      恢复后激活 Tab: ' + root.querySelector('.rm-primary-tab.is-active')?.dataset.tab);

  console.log('\n=== 结果 ===');
  if (failures.length) {
    console.log('存在 ' + failures.length + ' 项失败：');
    failures.forEach(f => console.log('  - ' + f));
    process.exit(1);
  } else {
    console.log('全部通过，无运行时错误。');
  }
})();
