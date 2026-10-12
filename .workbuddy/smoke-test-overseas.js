// 「出海吧」模块交互冒烟：真实执行 init，触发每个事件处理器，捕获运行时错误。
const fs = require('fs');
const vm = require('vm');
const { JSDOM } = require('jsdom');

const MOD = 'Prototype/modules/overseas-nav.js';
const src = fs.readFileSync(MOD, 'utf8');

const dom = new JSDOM(
  '<!doctype html><html><body><div id="appContent"></div></body></html>',
  { url: 'http://localhost/', pretendToBeVisual: true }
);
const { window } = dom;
global.window = window;
global.document = window.document;
global.localStorage = window.localStorage;
global.sessionStorage = window.sessionStorage;
global.requestAnimationFrame = () => {};
global.innerWidth = 1440; global.innerHeight = 900;
window.lucide = { createIcons() {} };

vm.runInThisContext(src, { filename: MOD });
const mod = window.YundengModules['overseas-nav'];
const root = window.document.getElementById('appContent');
root.innerHTML = mod.html;

const $ = id => root.querySelector('#' + id);
const failures = [];
function safe(label, fn) {
  try { const r = fn(); console.log('  [OK] ' + label); return r; }
  catch (e) { failures.push(label + ' -> ' + e.constructor.name + ': ' + e.message); console.log('  [FAIL] ' + label + ' -> ' + e.message); return null; }
}
function fire(el, type, opts) {
  if (!el) { failures.push('元素缺失: ' + type); console.log('  [FAIL] 元素缺失: ' + type); return; }
  el.dispatchEvent(new window.Event(type, Object.assign({ bubbles: true, cancelable: true }, opts || {})));
}
const rows = () => $('ov-site-tbody').querySelectorAll('tr').length;
const store = () => JSON.parse(window.localStorage.getItem('yundeng_overseas_nav_v1'));

(async function main() {
  window.localStorage.clear();
  console.log('=== A. init 与首屏 ===');
  safe('init(root)', () => mod.init(root));
  console.log('      网站行数: ' + rows() + '（应为 28）');
  if (rows() !== 28) failures.push('首屏行数 ' + rows());
  console.log('      类型数量: ' + store().types.length + '（应为 12）');
  console.log('      种子已写入 localStorage: ' + (window.localStorage.getItem('yundeng_overseas_nav_v1') !== null));

  console.log('\n=== B. Tab 切换 ===');
  console.log('      一级 Tab 为下划线式(.on-primary-tab): ' + !!root.querySelector('.on-primary-tab'));
  safe('切到类型管理', () => root.querySelector('.on-primary-tab[data-tab="types"]').click());
  console.log('      类型面板可见: ' + !$('ov-panel-types').hidden + '，网站面板隐藏: ' + $('ov-panel-sites').hidden);
  console.log('      筛选条件随页签隐藏: ' + $('ov-filters').hidden);
  if (!$('ov-filters').hidden) failures.push('切到类型管理后筛选区未隐藏');
  if (!root.querySelector('.on-primary-tab[data-tab="types"]').classList.contains('is-active')) failures.push('Tab 激活态类名错误');

  /* B2. 「类型管理」无筛选条件 → 数据列表并入页签区块，整页只呈现一个区块（design.md §5.0）
     断言结构归属而非文案，避免「看着像一个区块」的假通过。 */
  const modRoot = root.querySelector('.on-module');
  const visibleBlocks = () => Array.from(modRoot.children).filter((el) => el.tagName === 'SECTION' && !el.hidden).length;
  const tabCard = root.querySelector('.on-primary-tabs').closest('section');
  console.log('      「类型管理」数据列表位于页签区块内: ' + ($('ov-panel-types').parentElement === tabCard));
  if ($('ov-panel-types').parentElement !== tabCard) failures.push('类型列表面板未并入页签区块');
  console.log('      「类型管理」可见区块数: ' + visibleBlocks() + '（应为 1，仅页签区块）');
  if (visibleBlocks() !== 1) failures.push('「类型管理」应只显示一个区块，实际 ' + visibleBlocks());
  const panelCls = $('ov-panel-types').className;
  const hasCardStyle = /bg-white|rounded-lg|(^|\s)p-5/.test(panelCls);
  console.log('      类型列表面板不带卡片样式（避免卡片套卡片）: ' + !hasCardStyle + ' [class="' + panelCls + '"]');
  if (hasCardStyle) failures.push('类型列表面板仍带卡片样式: ' + panelCls);
  const typeHead = $('ov-panel-types').querySelector('.on-list-head');
  console.log('      类型列表标题行与网站列表统一 12px 下间距（无内联覆盖）: ' + !typeHead.hasAttribute('style'));
  if (typeHead.hasAttribute('style')) failures.push('类型列表标题行仍有内联间距覆盖');

  safe('切回网站管理', () => root.querySelector('.on-primary-tab[data-tab="sites"]').click());
  console.log('      切回后筛选区可见: ' + !$('ov-filters').hidden);
  console.log('      「网站管理」可见区块数: ' + visibleBlocks() + '（应为 2：页签+筛选 / 网站列表）');
  if (visibleBlocks() !== 2) failures.push('「网站管理」应为两个区块，实际 ' + visibleBlocks());

  // 列表「网站」列不再显示精选标签（精选由独立字段列承担）
  const firstSiteCell = $('ov-site-tbody').querySelector('tr td:nth-child(2)');
  console.log('      网站列内精选角标: ' + !!firstSiteCell.querySelector('.on-badge-feat') + '（应为 false）');
  if (firstSiteCell.querySelector('.on-badge-feat')) failures.push('网站列仍存在精选标签');
  console.log('      精选字段列为星标按钮: ' + !!$('ov-site-tbody').querySelector('tr td:nth-child(6) .on-star'));
  console.log('      简介列无原生 title（避免与自定义气泡重叠）: ' + !$('ov-site-tbody').querySelector('.on-intro').hasAttribute('title'));
  if ($('ov-site-tbody').querySelector('.on-intro').hasAttribute('title')) failures.push('简介列仍带 title 属性');

  console.log('\n=== C. 筛选区：搜索 + 网站类型 + 查询/重置 ===');
  console.log('      类型下拉选项数: ' + $('ov-type-filter').options.length + '（应为 13 = 全部类型 + 12）');
  safe('输入关键词（草稿态不即时过滤）', () => { $('ov-search').value = 'ipfoxy'; fire($('ov-search'), 'input'); });
  console.log('      未点查询前行数: ' + rows() + '（应为 28）');
  if (rows() !== 28) failures.push('草稿态不应即时过滤，实际 ' + rows());
  safe('清空按钮只清输入', () => $('ov-search-clear').click());
  console.log('      清空按钮后输入值: 「' + $('ov-search').value + '」');
  safe('重新输入并点查询', () => { $('ov-search').value = 'ipfoxy'; fire($('ov-search'), 'input'); $('ov-query').click(); });
  console.log('      查询后行数: ' + rows() + '（应为 1）');
  if (rows() !== 1) failures.push('搜索行数 ' + rows());
  safe('点重置', () => $('ov-reset').click());
  console.log('      重置后行数: ' + rows() + '（应为 28）');
  if (rows() !== 28) failures.push('重置后行数 ' + rows());
  safe('类型筛选：社媒资源(t05)', () => { $('ov-type-filter').value = 't05'; $('ov-query').click(); });
  console.log('      类型筛选后行数: ' + rows() + '（应为 6）');
  if (rows() !== 6) failures.push('类型筛选行数 ' + rows());
  safe('叠加关键词 ipfoxy', () => { $('ov-search').value = 'ipfoxy'; $('ov-query').click(); });
  console.log('      关键词+类型交集行数: ' + rows() + '（应为 1）');
  if (rows() !== 1) failures.push('组合筛选行数 ' + rows());

  console.log('\n=== C2. 是否精选筛选（含三条件叠加） ===');
  const featuredCount = store().sites.filter(s => s.featured).length;
  const total = store().sites.length;
  console.log('      用例数据：共 ' + total + ' 条，其中精选 ' + featuredCount + ' 条');
  safe('重置后再选 精选=是', () => { $('ov-reset').click(); $('ov-featured-filter').value = 'yes'; $('ov-query').click(); });
  console.log('      精选=是 行数: ' + rows() + '（应为 ' + featuredCount + '）');
  if (rows() !== featuredCount) failures.push('精选=是 行数 ' + rows());
  safe('精选=否', () => { $('ov-featured-filter').value = 'no'; $('ov-query').click(); });
  console.log('      精选=否 行数: ' + rows() + '（应为 ' + (total - featuredCount) + '）');
  if (rows() !== total - featuredCount) failures.push('精选=否 行数 ' + rows());
  safe('三条件叠加：类型 t05 + 精选=是 + 关键词(kookeey)', () => {
    $('ov-type-filter').value = 't05'; $('ov-featured-filter').value = 'yes'; $('ov-search').value = 'kookeey'; $('ov-query').click();
  });
  console.log('      三条件交集行数: ' + rows() + '（应为 1）');
  if (rows() !== 1) failures.push('三条件叠加行数 ' + rows());
  safe('精选筛选生效时拖拽禁用', () => {
    const h = $('ov-site-tbody').querySelector('[data-drag]');
    if (!h.classList.contains('is-disabled')) failures.push('精选筛选生效时拖拽未禁用');
  });
  safe('重置恢复：三项条件全部清空', () => $('ov-reset').click());
  console.log('      重置后 精选下拉=「' + $('ov-featured-filter').value + '」，类型下拉=「' + $('ov-type-filter').value + '」，搜索=「' + $('ov-search').value + '」，行数: ' + rows());
  if (rows() !== total) failures.push('重置后行数 ' + rows());

  console.log('\n=== D. 添加网站弹窗 ===');
  safe('点击添加网站', () => $('ov-add-site').click());
  console.log('      弹窗打开: ' + !$('ov-site-overlay').hidden);
  safe('名称输入+计数器', () => { $('ov-f-name').value = '测试导航站'; fire($('ov-f-name'), 'input'); });
  console.log('      名称计数: ' + $('ov-f-name-count').textContent);
  safe('非法网址校验', () => { $('ov-f-url').value = 'abc'; fire($('ov-f-url'), 'input'); });
  safe('简介输入', () => { $('ov-f-intro').value = '这是冒烟测试添加的网站'; fire($('ov-f-intro'), 'input'); });
  console.log('      简介计数: ' + $('ov-f-intro-count').textContent + '，maxlength: ' + $('ov-f-intro').getAttribute('maxlength'));
  if ($('ov-f-intro-count').textContent !== '11/100') failures.push('简介计数异常: ' + $('ov-f-intro-count').textContent);
  safe('简介满 100 字计数', () => { $('ov-f-intro').value = '出'.repeat(100); fire($('ov-f-intro'), 'input'); });
  console.log('      满字数计数: ' + $('ov-f-intro-count').textContent);
  if ($('ov-f-intro-count').textContent !== '100/100') failures.push('满字计数异常: ' + $('ov-f-intro-count').textContent);
  console.log('      计数器位于输入框容器内(父级 .on-textarea-wrap): ' + ($('ov-f-intro-count').closest('.on-textarea-wrap') !== null));
  if (!$('ov-f-intro-count').closest('.on-textarea-wrap')) failures.push('计数器不在输入框容器内');
  safe('简介恢复为有效长度', () => { $('ov-f-intro').value = '这是冒烟测试添加的网站'; fire($('ov-f-intro'), 'input'); });
  safe('类型选择', () => { $('ov-f-type').value = 't01'; fire($('ov-f-type'), 'change'); });
  safe('网址更正为合法值', () => { $('ov-f-url').value = 'https://test.example.com/'; fire($('ov-f-url'), 'input'); });
  console.log('      图标预览含 img: ' + !!$('ov-f-icon-preview').querySelector('img'));
  safe('开启精选 Toggle', () => $('ov-f-featured').click());
  console.log('      Toggle 状态: ' + $('ov-f-featured').classList.contains('on'));
  safe('提交网站表单', () => fire($('ov-site-form'), 'submit'));
  console.log('      提交后弹窗关闭: ' + $('ov-site-overlay').hidden + '，行数: ' + rows());
  if (rows() !== 29) failures.push('新增后行数 ' + rows());
  console.log('      localStorage 站点数: ' + store().sites.length);
  const last = store().sites[store().sites.length - 1];
  console.log('      新站点持久化: ' + (last.name === '测试导航站' && last.featured === true && last.typeId === 't01'));

  console.log('\n=== E. 重名校验与必填校验 ===');
  safe('再次打开添加网站', () => $('ov-add-site').click());
  safe('输入重名', () => { $('ov-f-name').value = '测试导航站'; fire($('ov-f-name'), 'input'); });
  safe('输入合法网址', () => { $('ov-f-url').value = 'https://x.example.com/'; fire($('ov-f-url'), 'input'); });
  safe('输入简介+选类型', () => { $('ov-f-intro').value = '重复名称测试'; fire($('ov-f-intro'), 'input'); $('ov-f-type').value = 't02'; fire($('ov-f-type'), 'change'); });
  safe('提交重名表单', () => fire($('ov-site-form'), 'submit'));
  console.log('      重名被拦截（弹窗仍开）: ' + !$('ov-site-overlay').hidden);
  if ($('ov-site-overlay').hidden) failures.push('重名未被拦截');
  safe('清空名称提交必填校验', () => { $('ov-f-name').value = ''; fire($('ov-f-name'), 'input'); fire($('ov-site-form'), 'submit'); });
  console.log('      名称错误态显示: ' + $('ov-f-name-field').classList.contains('is-error'));
  safe('Esc 关闭弹窗', () => window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
  console.log('      Esc 后弹窗关闭: ' + $('ov-site-overlay').hidden);
  if (!$('ov-site-overlay').hidden) failures.push('Esc 未关闭网站弹窗');

  console.log('\n=== F. 编辑网站 ===');
  const editBtn = $('ov-site-tbody').querySelector('[data-edit]');
  const editId = editBtn.dataset.edit;
  safe('点击编辑', () => editBtn.click());
  console.log('      编辑弹窗标题: ' + $('ov-site-modal-title').textContent);
  safe('修改名称并提交', () => { $('ov-f-name').value = 'IPFoxy 代理优惠（已改名）'; fire($('ov-f-name'), 'input'); fire($('ov-site-form'), 'submit'); });
  const edited = store().sites.find(s => s.id === editId);
  console.log('      修改已持久化: ' + (edited.name === 'IPFoxy 代理优惠（已改名）'));

  console.log('\n=== G. 删除网站（confirm Dialog） ===');
  safe('点击删除', () => $('ov-site-tbody').querySelector('[data-del]').click());
  console.log('      确认弹窗打开: ' + !$('ov-confirm-overlay').hidden);
  safe('点击取消', () => $('ov-confirm-overlay').querySelector('[data-close="confirm"]').click());
  const beforeDel = store().sites.length;
  safe('再次点击删除并确认', () => { $('ov-site-tbody').querySelector('[data-del]').click(); $('ov-confirm-ok').click(); });
  console.log('      删除持久化: ' + store().sites.length + '（删除前 ' + beforeDel + '）');
  if (store().sites.length !== beforeDel - 1) failures.push('删除未生效');

  console.log('\n=== H. 类型管理 ===');
  safe('切到类型管理', () => root.querySelector('[data-tab="types"]').click());
  safe('点击添加类型', () => $('ov-add-type').click());
  safe('类型名输入+计数', () => { $('ov-t-name').value = '冒烟类型'; fire($('ov-t-name'), 'input'); });
  console.log('      类型名计数: ' + $('ov-t-name-count').textContent);
  safe('提交类型表单', () => fire($('ov-type-form'), 'submit'));
  console.log('      类型数量: ' + store().types.length + '（应为 13）');
  if (store().types.length !== 13) failures.push('类型新增未生效');
  safe('编辑类型', () => {
    const btn = $('ov-type-tbody').querySelector('[data-edit-type]');
    btn.dataset; btn.click();
    $('ov-t-name').value = '冒烟类型（改）'; fire($('ov-t-name'), 'input');
    fire($('ov-type-form'), 'submit');
  });
  safe('删除含网站的类型（应被拦截）', () => {
    const btn = $('ov-type-tbody').querySelector('[data-del-type]');
    btn.click();
  });
  console.log('      确认弹窗未打开（拦截成功）: ' + $('ov-confirm-overlay').hidden);
  if (!$('ov-confirm-overlay').hidden) failures.push('含网站类型未被拦截');
  safe('删除空类型并确认', () => {
    const rowsT = [...$('ov-type-tbody').querySelectorAll('[data-del-type]')];
    const target = rowsT[rowsT.length - 1];
    target.click(); $('ov-confirm-ok').click();
  });
  console.log('      删除后类型数量: ' + store().types.length + '（应为 12）');
  if (store().types.length !== 12) failures.push('空类型删除未生效');
  safe('重名校验（编辑为已有名）', () => {
    const btn = $('ov-type-tbody').querySelector('[data-edit-type]');
    btn.click();
    $('ov-t-name').value = 'AI 工具'; fire($('ov-t-name'), 'input');
    fire($('ov-type-form'), 'submit');
  });
  console.log('      重名弹窗仍开: ' + !$('ov-type-overlay').hidden);
  safe('Esc 关闭类型弹窗', () => window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
  console.log('      Esc 后类型弹窗关闭: ' + $('ov-type-overlay').hidden);
  if (!$('ov-type-overlay').hidden) failures.push('Esc 未关闭类型弹窗');

  console.log('\n=== I. 拖拽排序（显式排列校验，含删除/重排后再次拖拽） ===');
  const namesBefore = store().sites.map(x => x.name);
  safe('把第 1 行拖到第 3 行位置', () => {
    const handles = $('ov-site-tbody').querySelectorAll('[data-drag]');
    fire(handles[0], 'dragstart');
    fire($('ov-site-tbody').querySelectorAll('tr')[2], 'drop');
  });
  const namesAfter = store().sites.map(x => x.name);
  const expected = (() => {
    const arr = namesBefore.slice();
    const moved = arr.splice(0, 1)[0];
    arr.splice(2, 0, moved);
    return arr;
  })();
  console.log('      拖拽前首两位: ' + namesBefore.slice(0, 3).join(' / '));
  console.log('      拖拽后首三位: ' + namesAfter.slice(0, 3).join(' / '));
  console.log('      符合预期排列(元素 0 → 位置 2): ' + (JSON.stringify(namesAfter) === JSON.stringify(expected)));
  if (JSON.stringify(namesAfter) !== JSON.stringify(expected)) failures.push('拖拽排序未生效（持久化顺序不符）');
  const domFirst = $('ov-site-tbody').querySelector('tr td:nth-child(2)').textContent.trim();
  console.log('      列表首行已同步: ' + domFirst);
  if (domFirst !== namesAfter[0]) failures.push('拖拽后列表未重新渲染');

  safe('连续第二次拖拽（第 3 行 → 第 1 行）', () => {
    const handles = $('ov-site-tbody').querySelectorAll('[data-drag]');
    fire(handles[2], 'dragstart');
    fire($('ov-site-tbody').querySelectorAll('tr')[0], 'drop');
  });
  const namesAfter2 = store().sites.map(x => x.name);
  const expected2 = (() => {
    const arr = namesAfter.slice();
    const moved = arr.splice(2, 1)[0];
    arr.splice(0, 0, moved);
    return arr;
  })();
  console.log('      二次拖拽符合预期: ' + (JSON.stringify(namesAfter2) === JSON.stringify(expected2)));
  if (JSON.stringify(namesAfter2) !== JSON.stringify(expected2)) failures.push('二次拖拽未生效');

  safe('类型行拖拽（第 1 行 → 第 3 行）', () => {
    const before = store().types.map(t => t.name);
    global.__typesBefore = before;
    const handles = $('ov-type-tbody').querySelectorAll('[data-drag]');
    fire(handles[0], 'dragstart');
    fire($('ov-type-tbody').querySelectorAll('tr')[2], 'drop');
  });
  const typesAfter = store().types.map(t => t.name);
  const typesExpected = (() => {
    const arr = global.__typesBefore.slice();
    arr.splice(2, 0, arr.splice(0, 1)[0]);
    return arr;
  })();
  console.log('      类型顺序符合预期: ' + (JSON.stringify(typesAfter) === JSON.stringify(typesExpected)) + '（' + typesAfter.slice(0, 3).join(' / ') + '）');
  if (JSON.stringify(typesAfter) !== JSON.stringify(typesExpected)) failures.push('类型拖拽未生效');

  console.log('\n=== J. 搜索态拖拽禁用 + 弹窗遮罩关闭 + 杂项 ===');
  safe('筛选生效后 handle 禁用', () => { $('ov-search').value = 'ip'; $('ov-query').click(); });
  const disHandle = $('ov-site-tbody').querySelector('[data-drag]');
  if (!disHandle.classList.contains('is-disabled')) failures.push('搜索态 handle 未禁用');
  safe('搜索态 dragstart 被阻止', () => fire(disHandle, 'dragstart'));
  safe('重置筛选', () => $('ov-reset').click());
  safe('打开弹窗后点击遮罩关闭', () => { $('ov-add-site').click(); $('ov-site-overlay').click(); });
  console.log('      遮罩关闭: ' + $('ov-site-overlay').hidden);
  safe('confirm 遮罩点击关闭', () => { $('ov-site-tbody').querySelector('[data-del]').click(); $('ov-confirm-overlay').click(); });
  safe('file input change（空文件）', () => fire($('ov-f-icon-file'), 'change'));
  safe('window resize / pagehide', () => { window.dispatchEvent(new window.Event('resize')); window.dispatchEvent(new window.Event('pagehide')); });

  console.log('\n=== K. 简介气泡全显 + 精选星标切换 ===');
  console.log('      气泡默认隐藏: ' + $('ov-intro-pop').hidden);
  if (!$('ov-intro-pop').hidden) failures.push('气泡初始未隐藏');
  const introTrigger = $('ov-site-tbody').querySelector('.on-intro');
  const fullIntro = introTrigger.getAttribute('data-intro-pop');
  console.log('      气泡数据源为完整简介: ' + (!!fullIntro && fullIntro.length >= introTrigger.textContent.length));
  safe('pointerover 简介', () => fire(introTrigger, 'pointerover'));
  console.log('      气泡显示: ' + !$('ov-intro-pop').hidden + '，文本为完整简介: ' + ($('ov-intro-pop').textContent === fullIntro));
  if ($('ov-intro-pop').hidden || $('ov-intro-pop').textContent !== fullIntro) failures.push('简介气泡未正确展示完整文本');
  console.log('      气泡定位样式: left=' + ($('ov-intro-pop').style.left || '(空)') + ', top=' + ($('ov-intro-pop').style.top || '(空)'));
  safe('pointerout 简介', () => fire(introTrigger, 'pointerout'));
  console.log('      气泡收起: ' + $('ov-intro-pop').hidden);
  if (!$('ov-intro-pop').hidden) failures.push('pointerout 后气泡未收起');
  safe('focusin 简介（键盘可达）', () => fire(introTrigger, 'focusin'));
  console.log('      键盘聚焦气泡显示: ' + !$('ov-intro-pop').hidden);
  safe('Esc 收起气泡', () => { window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); });
  console.log('      Esc 后气泡隐藏: ' + $('ov-intro-pop').hidden);
  if (!$('ov-intro-pop').hidden) failures.push('Esc 未收起简介气泡');
  safe('focusin 后再 scroll 收起', () => { fire(introTrigger, 'focusin'); window.document.dispatchEvent(new window.Event('scroll', { bubbles: true })); });
  console.log('      scroll 后气泡隐藏: ' + $('ov-intro-pop').hidden);

  const starSelector = 'tr[data-idx="0"] .on-star';
  const starBefore = store().sites[0].featured;
  console.log('      首行星标初始: 推荐=' + starBefore + '，is-on=' + !!$('ov-site-tbody').querySelector(starSelector + '.is-on'));
  safe('点击星标（切换）', () => $('ov-site-tbody').querySelector(starSelector).click());
  const starAfter = store().sites[0].featured;
  console.log('      点击后: 推荐=' + starAfter + '（应取反 ' + (!starBefore) + '），is-on=' + !!$('ov-site-tbody').querySelector(starSelector + '.is-on'));
  if (starAfter === starBefore) failures.push('点击星标未切换推荐状态');
  if (starAfter !== !starBefore) failures.push('星标点击结果不符');
  const starBtn = $('ov-site-tbody').querySelector(starSelector);
  console.log('      aria-pressed=' + starBtn.getAttribute('aria-pressed') + '，提示文案=「' + starBtn.getAttribute('title') + '」');
  if (starBtn.getAttribute('aria-pressed') !== String(starAfter)) failures.push('aria-pressed 未同步');
  safe('再次点击星标（取消推荐）', () => $('ov-site-tbody').querySelector(starSelector).click());
  console.log('      二次点击后: 推荐=' + store().sites[0].featured + '（应回到 ' + starBefore + '）');
  if (store().sites[0].featured !== starBefore) failures.push('星标二次点击未还原');
  console.log('      持久化未串数据（站点总数）: ' + store().sites.length);
  safe('点击其他行星标', () => { const all = $('ov-site-tbody').querySelectorAll('.on-star'); all[all.length - 1].click(); });
  console.log('      末行星标点击后仍可渲染: ' + ($('ov-site-tbody').querySelectorAll('.on-star').length > 0));

  console.log('\n=== L. 网站简介高度 60px + 网站类型占位灰字 ===');
  const cssText = (mod.styles || []).join('\n');
  /* 静态 CSS 断言 + **选择器有效性断言**。
     注意：jsdom 不做 CSS 级联，光断言「CSS 文本里有 height:60px」是**假通过**——
     历史缺陷正是选择器写成了 textarea.on-control，而元素 class 是 control，整条规则零匹配。
     因此必须额外校验：① 规则选择器能 matches() 到真实元素；② 带 .on-module 作用域前缀（否则被基类压过）。 */
  const taRule = /([^{}]*textarea[^{}]*)\{([^}]*height:60px[^}]*)\}/.exec(cssText);
  console.log('      文本域高度规则选择器: ' + (taRule ? taRule[1].trim() : '(未找到)'));
  if (!taRule) failures.push('未找到声明 height:60px 的 textarea 规则');
  else {
    const taSel = taRule[1].trim();
    const taDecl = taRule[2];
    if (!/(^|;)height:60px/.test(taDecl)) failures.push('textarea 高度未声明 60px');
    if (!/(^|;)min-height:60px/.test(taDecl)) failures.push('textarea min-height 未声明 60px');
    if (/(^|;)height:80px/.test(taDecl)) failures.push('textarea 仍残留 80px');
    if (!/\.on-module/.test(taSel)) failures.push('文本域高度规则缺 .on-module 前缀，会被基类 .on-module .control 压过');
    const taMatched = $('ov-f-intro').matches(taSel);
    console.log('      规则真正匹配 #ov-f-intro（class="control"）: ' + taMatched);
    if (!taMatched) failures.push('文本域高度规则选择器不匹配元素: ' + taSel);
  }
  console.log('      计数器容器仍在文本域内右下角: ' + /\.on-counter-below\{[^}]*right:8px;bottom:6px/.test(cssText));
  if (!/\.on-counter-below\{[^}]*right:8px;bottom:6px/.test(cssText)) failures.push('计数器未固定在文本域内右下角');
  /* 占位灰字规则：既查声明，也查选择器可匹配 */
  const phRule = /([^{}]*select\.control\.is-placeholder[^{}]*)\{([^}]*color:#9DA2AC[^}]*)\}/.exec(cssText);
  console.log('      占位灰字规则: ' + (phRule ? phRule[1].trim() + ' { ' + phRule[2] + ' }' : '(未找到)'));
  if (!phRule) failures.push('缺少下拉占位灰字规则 (.on-module select.control.is-placeholder{color:#9DA2AC})');

  /* 行为断言：打开「添加网站」→ 类型下拉未选择时应为占位态 */
  safe('打开添加网站弹窗', () => { $('ov-reset').click(); $('ov-add-site').click(); });
  console.log('      未选择时 value=「' + $('ov-f-type').value + '」，is-placeholder=' + $('ov-f-type').classList.contains('is-placeholder') + '（应为 true）');
  if (!$('ov-f-type').classList.contains('is-placeholder')) failures.push('类型下拉未选择时未加 is-placeholder');
  if (phRule) {
    const phSel = phRule[1].trim();
    const phMatched = $('ov-f-type').matches(phSel);
    console.log('      占位态下规则真正匹配 #ov-f-type: ' + phMatched);
    if (!phMatched) failures.push('占位灰字规则选择器不匹配元素: ' + phSel);
  }
  safe('选择真实类型 t03', () => { $('ov-f-type').value = 't03'; fire($('ov-f-type'), 'change'); });
  console.log('      选择后 value=「' + $('ov-f-type').value + '」，is-placeholder=' + $('ov-f-type').classList.contains('is-placeholder') + '（应为 false）');
  if ($('ov-f-type').classList.contains('is-placeholder')) failures.push('选择真实类型后占位态未移除');
  /* 行为断言：编辑弹窗回填已有类型 → 非占位态（is-placeholder 与 value 空判一致） */
  safe('Esc 关闭后打开编辑弹窗', () => {
    window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    $('ov-site-tbody').querySelector('[data-edit]').click();
  });
  const editTypeVal = $('ov-f-type').value;
  const editPlaceholder = $('ov-f-type').classList.contains('is-placeholder');
  console.log('      编辑回填 value=「' + editTypeVal + '」，is-placeholder=' + editPlaceholder + '（应与 value 为空否一致）');
  if ((editTypeVal === '') !== editPlaceholder) failures.push('编辑回填时占位态与取值不一致');
  safe('Esc 关闭编辑弹窗', () => window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));

  console.log('\n================ 汇总 ================');
  if (failures.length === 0) console.log('全部通过，未捕获任何运行时错误。');
  else { console.log('捕获 ' + failures.length + ' 个问题：'); failures.forEach((f, i) => console.log('  ' + (i + 1) + '. ' + f)); process.exitCode = 1; }
})();
