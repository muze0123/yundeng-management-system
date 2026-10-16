// 交互冒烟测试：真实执行 init，并触发模块内每一个事件处理器，捕获运行时错误。
// 目的：抓出「语法/静态检查全绿但点击无反应」这类运行时缺陷（如未声明变量）。
// 2026-10-16 扩展：覆盖「更换地区（层级+搜索单选）→ 更换代理商（按地区联动）」新分配口径。
const fs = require('fs');
const vm = require('vm');
const { JSDOM } = require('jsdom');

const MOD = 'Prototype/modules/proxy-replacement.js';
const src = fs.readFileSync(MOD, 'utf8');
const DB_KEY = 'yundeng-proxy-replacement-mock-v2';

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
// jsdom 的 new Event('keydown',{key}) 不携带 key，键盘用例必须用 KeyboardEvent，否则断言假通过。
function fireKey(el, type, key) {
  if (!el) { failures.push('元素缺失，无法触发 ' + type); console.log('  [FAIL] 元素缺失: ' + type); return; }
  el.dispatchEvent(new window.KeyboardEvent(type, { key, bubbles: true, cancelable: true }));
}
// 断言：条件不成立即记为失败（不只是「不抛错」）。
function check(label, cond, detail) {
  if (cond) { console.log('  [OK] ' + label + (detail ? ' — ' + detail : '')); }
  else { failures.push(label + ' -> 断言失败' + (detail ? '（' + detail + '）' : '')); console.log('  [FAIL] ' + label + (detail ? ' — ' + detail : '')); }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
const db = () => JSON.parse(window.sessionStorage.getItem(DB_KEY));
const areaPath = a => (Array.isArray(a) ? a.filter((p, i) => p && p !== a[i - 1]) : []).join('/');
const agentOptions = () => [...$('channel').options].filter(o => o.value);
const regionOptions = () => [...$('region-list').querySelectorAll('[data-region]')];
async function openFreshModal() { safe('打开弹窗', () => $('create').click()); await sleep(30); }

(async function main() {
  console.log('=== A. init 与首屏 ===');
  safe('init(root)', () => mod.init(root));
  const countBefore = Number(String($('count').textContent).replace(/\D/g, '')) || 0;
  console.log('      首屏记录数: ' + countBefore);

  console.log('\n=== A2. 静态文案与列头（本轮需求）===');
  const head = root.querySelector('.data-table thead').textContent;
  check('列表列头为「代理商」', head.includes('代理商'), '表头=' + head.replace(/\s+/g, ' ').slice(0, 60));
  check('列头不再出现「渠道商」', !head.includes('渠道商'));

  console.log('\n=== B. 打开更换代理弹窗 ===');
  await openFreshModal();
  console.log('      overlay hidden: ' + $('overlay').hidden);
  const modalHtml = $('overlay').innerHTML;
  check('弹窗含「更换地区」', modalHtml.includes('更换地区'));
  check('弹窗含「更换代理商」', modalHtml.includes('更换代理商'));
  check('弹窗已移除「说明」区块', !modalHtml.includes('pr-note'));
  check('「更换地区」在「更换代理商」之上', modalHtml.indexOf('pr-region-trigger') < modalHtml.indexOf('pr-channel'));
  check('未选地区时代理商无可选项', agentOptions().length === 0, '实际 ' + agentOptions().length);
  check('未选地区时地区值为空', $('region').value === '');

  console.log('\n=== C. 弹窗：账号 → 原代理IP 双向联动 ===');
  safe('输入账号 100001', () => { $('account').value = '100001'; fire($('account'), 'input'); });
  await sleep(380);
  safe('输入原代理IP 198.51.100.21', () => { $('source-ip').value = '198.51.100.21'; fire($('source-ip'), 'input'); });
  await sleep(420);
  console.log('      信息卡片显示: ' + ($('asset-card').hidden === false));
  console.log('      关联用户下拉显示: ' + ($('ip-owners').hidden === false));
  const owners = $('ip-owners') ? $('ip-owners').querySelectorAll('[data-owner]') : [];
  console.log('      关联用户选项数: ' + owners.length);

  console.log('\n=== C1. 更换地区：默认带入原代理所属地区 + 代理商按地区联动 ===');
  check('地区默认带入原代理所属地区', $('region').value === '中国/浙江/杭州', '实际「' + $('region').value + '」');
  check('地区触发器展示地区名', $('region-text').textContent === '中国-浙江-杭州', '实际「' + $('region-text').textContent + '」');
  const agentsR0 = agentOptions().map(o => o.value);
  check('该地区代理商 = 星际云网络/海豚IP服务/云梯科技', JSON.stringify(agentsR0) === JSON.stringify(['星际云网络', '海豚IP服务', '云梯科技']), agentsR0.join('、'));
  check('代理商选项文案为「名称　价格」', /^.+　￥[\d.]+~[\d.]+\/月$/.test(agentOptions()[0].textContent), agentOptions()[0].textContent);
  check('地区帮助文案提示可选代理商数', /支持 3 家代理商/.test($('region-help').textContent), $('region-help').textContent);

  console.log('\n=== C2. 更换地区选择器：展开 / 搜索 / 单选 / Esc 关闭 ===');
  safe('点击地区触发器', () => $('region-trigger').click());
  check('地区面板展开', $('region-panel').hidden === false);
  check('aria-expanded=true', $('region-trigger').getAttribute('aria-expanded') === 'true');
  const allRegions = regionOptions().map(b => b.dataset.region);
  check('地区选项数 = 5', allRegions.length === 5, allRegions.join(' | '));
  check('地区选项层级展示（国家 + 路径）', (() => {
    const o = regionOptions().find(b => b.dataset.region === '美国/马萨诸塞州/波士顿');
    return !!o && o.querySelector('.pr-region-top').textContent === '美国' && o.querySelector('.pr-region-rest').textContent === '马萨诸塞州 / 波士顿';
  })(), '美国项');
  safe('搜索关键词「中国」', () => { $('region-search').value = '中国'; fire($('region-search'), 'input'); });
  const filtered = regionOptions().map(b => b.dataset.region);
  check('搜索过滤生效（仅中国地区）', filtered.length === 2 && filtered.every(k => k.startsWith('中国')), filtered.join(' | '));
  safe('搜索无结果', () => { $('region-search').value = 'zzz'; fire($('region-search'), 'input'); });
  check('无结果提示', !!$('region-list').querySelector('.pr-choice-empty'));
  safe('清空搜索', () => { $('region-search').value = ''; fire($('region-search'), 'input'); });
  check('清空后恢复 5 项', regionOptions().length === 5);
  // 键盘 Esc 应先关闭地区面板，而不是直接关掉弹窗。
  safe('Esc 关面板（KeyboardEvent）', () => fireKey(window.document, 'keydown', 'Escape'));
  check('Esc 关闭地区面板', $('region-panel').hidden === true);
  check('Esc 未关闭弹窗', $('overlay').hidden === false);

  console.log('\n=== C3. 每个地区都至少有可选代理商（数据完整性）===');
  safe('重开地区面板', () => $('region-trigger').click());
  for (const key of ['中国/浙江/杭州', '美国/马萨诸塞州/波士顿', '中国/上海', '日本/东京都/东京', '德国/黑森州/法兰克福']) {
    safe('选择地区 ' + key, () => {
      const opt = regionOptions().find(b => b.dataset.region === key);
      if (!opt) throw new Error('地区选项缺失: ' + key);
      opt.click();
    });
    safe('重开面板（继续下一地区）', () => $('region-trigger').click());
    const n = agentOptions().length;
    check('地区「' + key + '」有可选代理商', n >= 1, n + ' 家：' + agentOptions().map(o => o.value).join('、'));
    if (key === '德国/黑森州/法兰克福') check('德国仅云梯科技支持', n === 1 && agentOptions()[0].value === '云梯科技', agentOptions().map(o => o.value).join('、'));
  }
  safe('关闭地区面板', () => { if (!$('region-panel').hidden) $('region-trigger').click(); });

  console.log('\n=== D. 提交成功路径（地区 + 代理商 + 类型 命中库存）===');
  safe('选择地区 中国/浙江/杭州', () => { $('region-trigger').click(); regionOptions().find(b => b.dataset.region === '中国/浙江/杭州').click(); });
  check('切换地区后代理商已重置', $('channel').value === '');
  const pick = agentOptions().find(o => o.value === '云梯科技');
  check('云梯科技在该地区可选', !!pick);
  safe('选择代理商 云梯科技', () => { $('channel').value = pick.value; fire($('channel'), 'change'); });
  safe('更换原因 change', () => { $('change-reason').value = $('change-reason').options[1].value; fire($('change-reason'), 'change'); });
  safe('备注输入', () => { $('remark').value = '测试备注内容'; fire($('remark'), 'input'); });
  check('提交按钮可用', $('submit').disabled === false);
  safe('提交更换表单', () => fire($('replace-form'), 'submit'));
  // submitReplacement 内部用 setTimeout 模拟请求、queueSync 再以 700ms 模拟同步；
  // 必须等它们全部落地，否则延迟回调会在后续步骤里 closeModal，造成假故障。
  await sleep(1800);
  check('提交后弹窗已关闭', $('overlay').hidden === true);
  const after = db();
  const newest = after.records[0];
  check('新增一条更换记录', Number(String($('count').textContent).replace(/\D/g, '')) > countBefore);
  check('记录结果 = 成功', newest.result === 'success', newest.result);
  check('记录新代理商 = 云梯科技', newest.channel === '云梯科技', newest.channel);
  check('记录原代理商 = 星际云网络', newest.oldChannel === '星际云网络', newest.oldChannel);
  check('新代理地区 = 所选地区', areaPath(newest.newArea) === '中国/浙江/杭州', areaPath(newest.newArea));
  check('新代理类型 = 原代理类型', (() => {
    const a = after.assets.find(x => x.id === newest.newAssetId);
    return !!a && a.type === '静态住宅-优质' && a.channel === '云梯科技' && areaPath(a.area) === '中国/浙江/杭州';
  })(), '新资产已归属所选地区/代理商');

  console.log('\n=== E. 提交失败路径（所选地区无可用资源，不降级）===');
  await openFreshModal();
  safe('输入账号 100001', () => { $('account').value = '100001'; fire($('account'), 'input'); });
  await sleep(380);
  safe('输入德国原代理IP 198.51.100.23', () => { $('source-ip').value = '198.51.100.23'; fire($('source-ip'), 'input'); });
  await sleep(420);
  check('地区默认带入德国', $('region').value === '德国/黑森州/法兰克福', '实际「' + $('region').value + '」');
  check('德国可选代理商 = 云梯科技', agentOptions().map(o => o.value).join('、') === '云梯科技', agentOptions().map(o => o.value).join('、'));
  safe('选择代理商', () => { $('channel').value = agentOptions()[0].value; fire($('channel'), 'change'); });
  safe('更换原因 change', () => { $('change-reason').value = $('change-reason').options[1].value; fire($('change-reason'), 'change'); });
  safe('提交更换表单', () => fire($('replace-form'), 'submit'));
  await sleep(1800);
  const failed = db().records[0];
  check('记录结果 = 失败', failed.result === 'failed', failed.result);
  check('失败记录不分配新 IP', failed.newIp === '');
  check('失败原因含所选地区与代理商', failed.reason.includes('德国-黑森州-法兰克福') && failed.reason.includes('云梯科技'), failed.reason);
  check('失败未降级到其他地区', failed.newArea === null);
  safe('关闭弹窗', () => { const b = $('overlay').querySelector('[data-close]'); if (b) b.click(); });

  console.log('\n=== F. 校验拦截：未选地区 / 未选代理商 ===');
  // 注意：D 段已把 198.51.100.21（source-0）释放，此处必须换用仍归 100001 所有的 source-1。
  await openFreshModal();
  safe('输入账号 100001', () => { $('account').value = '100001'; fire($('account'), 'input'); });
  await sleep(380);
  safe('输入原代理IP 198.51.100.22', () => { $('source-ip').value = '198.51.100.22'; fire($('source-ip'), 'input'); });
  await sleep(420);
  check('前置条件：原代理已解析出信息卡片', $('asset-card').hidden === false);
  check('前置条件：地区已默认带入', $('region').value === '中国/浙江/杭州', '实际「' + $('region').value + '」');
  safe('清空地区后提交', () => { $('region').value = ''; $('region-text').textContent = '请选择更换地区'; fire($('replace-form'), 'submit'); });
  check('未选地区被拦截', /请选择更换地区/.test($('region-error').textContent), '实际「' + $('region-error').textContent + '」');
  safe('选地区不选代理商后提交', () => { $('region-trigger').click(); regionOptions().find(b => b.dataset.region === '中国/浙江/杭州').click(); fire($('replace-form'), 'submit'); });
  check('未选代理商被拦截', /请选择更换代理商/.test($('channel-error').textContent), '实际「' + $('channel-error').textContent + '」');
  safe('关闭弹窗', () => { const b = $('overlay').querySelector('[data-close]'); if (b) b.click(); });

  console.log('\n=== G. 筛选区：更换原因多选下拉 ===');
  safe('点击 reason-filter-trigger', () => $('reason-filter-trigger').click());
  console.log('      浮层显示: ' + ($('reason-filter-pop').hidden === false));
  const opts = $('reason-filter-list') ? $('reason-filter-list').querySelectorAll('[data-reason]') : [];
  console.log('      选项数（应为 13）: ' + opts.length);
  check('更换原因选项数 13', opts.length === 13);
  safe('勾选第 1 项', () => { if (opts[0]) opts[0].click(); });
  safe('勾选第 2 项', () => { if (opts[1]) opts[1].click(); });
  console.log('      触发器文案: 「' + $('reason-filter-text').textContent + '」');
  console.log('      隐藏域值: ' + $('reason-filter').value);
  safe('取消勾选第 1 项', () => { if (opts[0]) opts[0].click(); });
  console.log('      取消后触发器文案: 「' + $('reason-filter-text').textContent + '」');

  console.log('\n=== H. 查询 / 排序 / 分页 / 操作人 / 日期 ===');
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
  safe('日期触发器 Enter 键', () => fireKey($('date-trigger'), 'keydown', 'Enter'));
  safe('日历内点击日期', () => { const d = $('calendar').querySelector('button:not([disabled])'); if (d) d.click(); });
  safe('重置筛选', () => $('reset').click());

  console.log('\n=== I. 行内交互：备注悬浮 / 重试同步 / 空态重置 ===');
  safe('pointerover 备注文本', () => { const t = root.querySelector('.pr-help-text'); if (t) fire(t, 'pointerover'); });
  console.log('      原因浮层显示: ' + ($('reason-pop').hidden === false) + '，内容: 「' + String($('reason-pop').textContent).slice(0, 20) + '」');
  safe('pointerout 备注文本', () => { const t = root.querySelector('.pr-help-text'); if (t) fire(t, 'pointerout'); });
  safe('focusin 备注文本', () => { const t = root.querySelector('.pr-help-text'); if (t) fire(t, 'focusin'); });
  safe('focusout 备注文本', () => { const t = root.querySelector('.pr-help-text'); if (t) fire(t, 'focusout'); });
  safe('原因浮层 pointerenter/leave', () => { fire($('reason-pop'), 'pointerenter'); fire($('reason-pop'), 'pointerleave'); });
  safe('点击重试同步', () => { const b = root.querySelector('[data-retry]'); if (b) b.click(); });
  safe('点击空态重置', () => { const b = root.querySelector('[data-reset]'); if (b) b.click(); });
  safe('表格横向滚动', () => fire($('table-scroll'), 'scroll'));
  safe('root keydown（Esc）', () => fireKey(root, 'keydown', 'Escape'));
  safe('root change 分页', () => { const s = $('pagination').querySelector('[data-size]'); if (s) fire(s, 'change'); });

  console.log('\n=== J. 弹窗关闭路径 ===');
  safe('点击弹窗取消按钮', () => { const b = $('overlay').querySelector('[data-close]'); if (b) b.click(); });
  safe('点击遮罩关闭', () => $('overlay').click());
  safe('document pointerdown 外部', () => window.document.dispatchEvent(new window.Event('pointerdown', { bubbles: true })));
  safe('document keydown', () => window.document.dispatchEvent(new window.Event('keydown', { bubbles: true })));
  safe('window resize', () => window.dispatchEvent(new window.Event('resize')));
  safe('window pagehide', () => window.dispatchEvent(new window.Event('pagehide')));

  console.log('\n================ 汇总 ================');
  if (failures.length === 0) {
    console.log('全部通过，未捕获任何运行时错误，断言全部成立。');
  } else {
    console.log('捕获 ' + failures.length + ' 个问题：');
    failures.forEach((f, i) => console.log('  ' + (i + 1) + '. ' + f));
    process.exitCode = 1;
  }
})();
