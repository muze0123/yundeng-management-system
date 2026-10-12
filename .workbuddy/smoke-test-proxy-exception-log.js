// 代理异常日志模块交互冒烟测试：真实执行 init，并触发模块内每一个事件处理器，捕获运行时错误。
// 目的：抓出「语法/静态检查全绿但点击无反应」这类运行时缺陷。
const fs = require('fs');
const vm = require('vm');
const { JSDOM } = require('jsdom');

const MOD = 'Prototype/modules/proxy-exception-log.js';
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
global.navigator = window.navigator;
window.lucide = { createIcons() {} };

vm.runInThisContext(src, { filename: MOD });
const mod = window.YundengModules['proxy-exception-log'];
const root = window.document.getElementById('appContent');
root.innerHTML = mod.html;

const $ = id => root.querySelector('#pel-' + id);
const failures = [];
function safe(label, fn) {
  try { const r = fn(); console.log('  [OK] ' + label); return r; }
  catch (e) { failures.push(label + ' -> ' + e.constructor.name + ': ' + e.message); console.log('  [FAIL] ' + label + ' -> ' + e.message); return null; }
}
function fire(el, type, opts) {
  if (!el) { failures.push('元素缺失，无法触发 ' + type); console.log('  [FAIL] 元素缺失: ' + type); return; }
  const isKey = /^key(down|up|press)$/.test(type);
  const Ctor = isKey ? window.KeyboardEvent : window.Event;
  el.dispatchEvent(new Ctor(type, Object.assign({ bubbles: true, cancelable: true }, opts || {})));
}
// 焦点态审查：判断是否存在「同一元素同时命中光环(box-shadow)与描边(outline)两套焦点指示」。
// 这是「筛选条件组件出现两个蓝色描边」的判据（design.md §5.13）。
// jsdom 不解析样式级联，故直接对模块 CSS 文本做规则解析 + 选择器匹配。
function focusAudit(stylesText) {
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  const outlineRules = [], ringRules = [];
  let m;
  while ((m = ruleRe.exec(stylesText))) {
    const sel = m[1].trim();
    const body = m[2];
    if (!sel.includes(':focus')) continue;
    // 描边规则：:focus-visible 且声明了可见 outline
    if (/:focus-visible/.test(sel) && /outline\s*:\s*(?:1|1\.5|2)px/.test(body)) outlineRules.push(sel);
    // 光环规则：:focus 且声明了 2px box-shadow 环（排除纯 :focus-visible 规则）
    if (/:focus(?![-a-z])/.test(sel.replace(/:focus-visible/g, '')) && /box-shadow\s*:\s*0 0 0 2px/.test(body)) ringRules.push(sel);
  }
  const strip = sel => sel.replace(/:focus-visible/g, '').replace(/:focus-within/g, '').replace(/:hover/g, '').replace(/:focus(?![-a-z])/g, '');
  const focusables = [...root.querySelectorAll('input,select,textarea,button,a,[tabindex]')];
  const offenders = [];
  focusables.forEach(el => {
    const hitOutline = outlineRules.some(sel => { try { return el.matches(strip(sel)); } catch (_) { return false; } });
    const hitRing = ringRules.some(sel => { try { return el.matches(strip(sel)); } catch (_) { return false; } });
    if (hitOutline && hitRing) offenders.push((el.id || el.className || el.tagName) + ' → ' + el.outerHTML.slice(0, 64));
  });
  return { outlineRules, ringRules, offenders, focusables: focusables.length };
}
const rows = () => $('panel').querySelectorAll('tbody tr');
const pag = () => $('panel').querySelector('.pagination');
const stats = () => pag().querySelector('.pg-stats')?.textContent.trim();
const headCells = () => $('panel').querySelectorAll('thead th');

(async function main() {
  console.log('=== A. init 与首屏 ===');
  safe('init(root)', () => mod.init(root));
  console.log('      筛选控件数: ' + $('form').querySelectorAll('.filter-item').length);
  console.log('      表头列数: ' + headCells().length + '，首行单元格数: ' + rows()[0].querySelectorAll('td').length);
  console.log('      首屏行数: ' + rows().length + '，统计: ' + stats());
  console.log('      表头: ' + [...headCells()].map(th => th.textContent).join(' | '));
  console.log('      首行代理信息: ' + rows()[0].querySelector('.pel-proxy').textContent.replace(/\s+/g, ' ').trim());
  console.log('      首行标签数: ' + rows()[0].querySelectorAll('.pel-tag').length + '，标签: ' + [...rows()[0].querySelectorAll('.pel-tag')].map(t => t.textContent).join(''));
  console.log('      首行本机网络: ' + rows()[0].querySelectorAll('td')[11].textContent.trim());
  console.log('      首行用户账号: ' + rows()[0].querySelectorAll('td')[2].textContent.trim());

  console.log('\n=== B. 表头/行结构断言 ===');
  safe('表头列数 = 13', () => { if (headCells().length !== 13) throw new Error('表头列数为 ' + headCells().length); });
  safe('每行单元格数 = 13', () => { rows().forEach((tr, i) => { if (tr.querySelectorAll('td').length !== 13) throw new Error('第 ' + (i + 1) + ' 行单元格数为 ' + tr.querySelectorAll('td').length); }); });
  safe('「用户账号」列位于「用户ID」右侧（第 3 列，索引 2）', () => {
    if (headCells()[1].textContent.trim() !== '用户ID') throw new Error('索引 1 为 ' + headCells()[1].textContent.trim());
    if (headCells()[2].textContent.trim() !== '用户账号') throw new Error('索引 2 为 ' + headCells()[2].textContent.trim());
  });
  safe('用户账号取值仅两种形态：手机号或邮箱，且与用户ID一一对应', () => {
    const seen = new Map();
    rows().forEach(tr => {
      const tds = tr.querySelectorAll('td');
      const userId = tds[1].textContent.trim();
      const account = tds[2].textContent.trim();
      if (!/^\d{11}$/.test(account) && !/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(account)) throw new Error('非法账号形态: ' + account);
      if (seen.has(userId) && seen.get(userId) !== account) throw new Error('用户ID ' + userId + ' 对应了多个账号');
      seen.set(userId, account);
    });
    if (![...seen.values()].some(v => /^\d{11}$/.test(v))) throw new Error('未覆盖手机号形态');
  });
  safe('全表账号不出现 undefined', () => { rows().forEach(tr => { const a = tr.querySelectorAll('td')[2].textContent; if (/undefined/.test(a)) throw new Error('账号列出现 undefined'); }); });
  safe('每页 20 条可同时覆盖手机号与邮箱两种形态', () => {
    const cells = [...rows()].map(tr => tr.querySelectorAll('td')[2].textContent.trim());
    if (!cells.some(v => /^\d{11}$/.test(v))) throw new Error('当前页无手机号账号');
    if (!cells.some(v => v.includes('@'))) throw new Error('当前页无邮箱账号');
  });
  safe('每行均含「平」或「静」之外的地区文本', () => { rows().forEach(tr => { if (!tr.querySelector('.pel-proxy .pel-sub')) throw new Error('缺少地区文本'); }); });

  console.log('\n=== C. 筛选：企业ID ===');
  safe('输入企业ID=600131 并查询', () => { $('form').elements['entId'].value = '600131'; fire($('form'), 'submit'); });
  console.log('      过滤后行数: ' + rows().length + '，统计: ' + stats());
  safe('每行企业ID均匹配', () => { rows().forEach(tr => { if (tr.querySelectorAll('td')[0].textContent !== '600131') throw new Error('企业ID不匹配: ' + tr.querySelectorAll('td')[0].textContent); }); });
  safe('点击企业ID清空按钮', () => { $('form').querySelector('[data-clear="entId"]').click(); });
  console.log('      清空后输入值: "' + $('form').elements['entId'].value + '"，清空按钮隐藏: ' + $('form').querySelector('[data-clear="entId"]').hidden);

  console.log('\n=== D. 筛选：客户端版本 + 代理名称 ===');
  safe('客户端版本=4.0.2.3 并查询', () => { $('form').elements['client'].value = '4.0.2.3'; fire($('form'), 'submit'); });
  console.log('      过滤后行数: ' + rows().length);
  safe('每行版本均匹配', () => { rows().forEach(tr => { if (tr.querySelectorAll('td')[6].textContent !== '4.0.2.3') throw new Error('版本不匹配'); }); });
  safe('代理名称=纽约 并查询', () => { $('form').elements['proxyName'].value = '纽约'; fire($('form'), 'submit'); });
  console.log('      叠加代理名称后行数: ' + rows().length + '（应 ≤ 上一步）');
  safe('重置', () => root.querySelector('[data-reset]').click());
  console.log('      重置后行数: ' + rows().length + '，企业ID值: "' + $('form').elements['entId'].value + '"');

  console.log('\n=== E. 筛选：代理ID / 用户ID ===');
  safe('代理ID=520701 并查询', () => { $('form').elements['proxyId'].value = '520701'; fire($('form'), 'submit'); });
  console.log('      过滤后行数: ' + rows().length + '，标签: ' + [...(rows()[0]?.querySelectorAll('.pel-tag') || [])].map(t => t.textContent).join('') + '（自有代理应无「平」）');
  safe('自有代理行不含「平」标签', () => { rows().forEach(tr => { if ([...tr.querySelectorAll('.pel-tag')].some(t => t.textContent === '平')) throw new Error('自有代理出现「平」标签'); }); });
  safe('自有代理行仅保留「静」标签（无 undefined 标签）', () => {
    const texts = [...rows()[0].querySelectorAll('.pel-tag')].map(t => t.textContent);
    if (texts.length !== 1 || texts[0] !== '静') throw new Error('标签异常: [' + texts.join(',') + ']');
  });
  safe('全表标签文案仅允许「平」「静」', () => {
    root.querySelectorAll('.pel-tag').forEach(t => { if (!['平', '静'].includes(t.textContent)) throw new Error('出现非法标签: "' + t.textContent + '"'); });
    if (root.innerHTML.includes('is-undefined') || root.innerHTML.includes('>undefined<')) throw new Error('表格内出现 undefined 残留');
  });
  safe('用户ID=100318 叠加查询 → 应为空态', () => { $('form').elements['userId'].value = '100318'; fire($('form'), 'submit'); });
  console.log('      空态行文案: ' + (rows()[0]?.querySelector('.pel-empty')?.textContent.trim() || '(非空态，行数=' + rows().length + ')') + '，colspan=' + (rows()[0]?.querySelector('td')?.getAttribute('colspan') || '-'));
  safe('重置', () => root.querySelector('[data-reset]').click());

  console.log('\n=== F. 分页 ===');
  console.log('      总条数: ' + stats());
  safe('点击下一页', () => pag().querySelector('[data-page="2"]').click());
  console.log('      第 2 页行数: ' + rows().length + '，统计: ' + stats());
  safe('切换每页 10 条', () => { const s = pag().querySelector('select[data-size]'); s.value = '10'; fire(s, 'change'); });
  console.log('      每页10行数: ' + rows().length + '，统计: ' + stats());
  safe('跳页输入 99 → 应提示并复位', () => { const j = pag().querySelector('[data-jump]'); j.value = '99'; fire(j, 'keydown', { key: 'Enter' }); });
  console.log('      跳页输入框复位为: ' + pag().querySelector('[data-jump]').value);
  safe('跳页输入 2 → 正常跳转', () => { const j = pag().querySelector('[data-jump]'); j.value = '2'; fire(j, 'keydown', { key: 'Enter' }); });
  console.log('      跳转后统计: ' + stats());

  console.log('\n=== G. 产生时间日期范围 ===');
  safe('展开日期下拉', () => $('form').querySelector('[data-date="time"]').click());
  console.log('      日历可见: ' + !$('calendar').hidden + '，日期格数: ' + $('calendar').querySelectorAll('[data-day]').length);
  safe('选择开始日期', () => $('calendar').querySelectorAll('[data-day]')[20].click());
  safe('选择结束日期', () => $('calendar').querySelectorAll('[data-day]')[24].click());
  console.log('      区间文案: ' + $('calendar').querySelector('.pel-calendar-foot span').textContent);
  safe('确定', () => $('calendar').querySelector('[data-calendar-confirm]').click());
  console.log('      日期按钮文案: ' + $('form').querySelector('[data-date="time"] span').textContent);
  safe('查询（带日期范围）', () => fire($('form'), 'submit'));
  console.log('      日期过滤后行数: ' + rows().length + '，统计: ' + stats());
  safe('日期浮层 Escape 关闭', () => { $('form').querySelector('[data-date="time"]').click(); const opened = !$('calendar').hidden; fire($('calendar').querySelector('[data-day]'), 'keydown', { key: 'Escape' }); console.log('      打开=' + opened + ' → Escape 后隐藏=' + $('calendar').hidden); });
  safe('重置清除日期', () => root.querySelector('[data-reset]').click());
  console.log('      重置后日期按钮文案: ' + $('form').querySelector('[data-date="time"] span').textContent + '，行数: ' + rows().length);
  safe('重置后 6 项筛选控件全部为空', () => {
    const f = $('form');
    ['entId', 'userId', 'proxyId', 'proxyName', 'client', 'timeFrom', 'timeTo'].forEach(name => {
      if (f.elements[name].value !== '') throw new Error(name + ' 未清空，值="' + f.elements[name].value + '"');
    });
  });
  safe('重置后日期按钮恢复占位文案', () => {
    const text = $('form').querySelector('[data-date="time"] span').textContent;
    if (text !== '开始时间 ～ 结束时间') throw new Error('日期按钮文案残留: ' + text);
    if (!$('form').querySelector('[data-date="time"]').classList.contains('empty')) throw new Error('日期按钮未恢复 empty 态');
  });
  safe('重置后统计回到全量 34 条', () => { if (!stats().includes('共 34 条')) throw new Error('统计异常: ' + stats()); });

  console.log('\n=== H. 复制代理IP ===');
  safe('点击复制按钮', () => rows()[0].querySelector('.pel-copy').click());
  console.log('      复制目标: ' + rows()[0].querySelector('.pel-copy').dataset.copy);

  console.log('\n=== I. 刷新态恢复（重新 init）===');
  safe('重新 init 并读取已提交条件', () => { root.innerHTML = mod.html; mod.init(root); });
  console.log('      恢复后行数: ' + rows().length + '，统计: ' + stats());
  safe('恢复后筛选区域可正常渲染', () => { if ($('form').querySelectorAll('.filter-item').length !== 6) throw new Error('筛选控件数异常: ' + $('form').querySelectorAll('.filter-item').length); });
  console.log('      sessionStorage 键存在: ' + !!window.sessionStorage.getItem('yundeng-proxy-exception-log-v1'));

  console.log('\n=== J. 焦点态唯一性（「两个蓝色描边」回归守卫）===');
  safe('展开日期浮层以纳入日历按钮', () => $('form').querySelector('[data-date="time"]').click());
  const audit = focusAudit(mod.styles.join('\n'));
  console.log('      光环规则 ' + audit.ringRules.length + ' 条，描边规则 ' + audit.outlineRules.length + ' 条，可聚焦元素 ' + audit.focusables + ' 个');
  console.log('      光环规则: ' + audit.ringRules.join(' ; '));
  console.log('      描边规则: ' + audit.outlineRules.join(' ; '));
  safe('无元素同时命中「蓝色光环」与「蓝色描边」', () => {
    if (audit.offenders.length) throw new Error('命中双描边的元素 ' + audit.offenders.length + ' 个：' + audit.offenders.join(' | '));
  });
  safe('筛选区输入控件确为单一焦点指示（.control 有光环、无描边）', () => {
    const inputs = [...root.querySelectorAll('.control')];
    if (!inputs.length) throw new Error('未找到 .control 控件');
    const stripped = audit.outlineRules.map(s => s.replace(/:focus-visible/g, ''));
    inputs.forEach(el => stripped.forEach(sel => { if (el.matches(sel)) throw new Error('控件同时获得描边: ' + sel); }));
  });
  safe('.control 与 .pg-jump-input 已显式关闭 :focus-visible 描边', () => {
    const css = mod.styles.join('\n');
    if (!/\.control:focus-visible[^{]*\{[^{}]*outline\s*:\s*none/.test(css)) throw new Error('缺少 .control:focus-visible{outline:none}');
    if (!/\.pg-jump-input:focus-visible[^{]*\{[^{}]*outline\s*:\s*none/.test(css)) throw new Error('缺少 .pg-jump-input:focus-visible{outline:none}');
  });
  // 前提断言：只靠「描边规则里 :not(.control) 排除」并不足以保证单一焦点指示——
  // 浏览器 UA 样式表会对 :focus-visible 施加默认焦点环（Chrome: outline:auto）。
  // 真正让排除生效的是 .control 基类里的 outline:none（作者样式优先于 UA 样式）。
  // 一旦有人删掉基类重置，.control 输入框就会「柔光环 + UA 默认环」双描边，而 §5.13 的
  // 描边规则本身看不出问题，故必须在此把前提钉死。
  safe('.control 基类已 outline:none（UA 默认焦点环被压制，排除写法方才充分）', () => {
    const css = mod.styles.join('\n');
    if (!/\.pel-module\s+\.control\{[^{}]*outline\s*:\s*none/.test(css)) {
      throw new Error('.control 基类缺少 outline:none —— UA 默认焦点环会与柔光环叠加成双描边');
    }
  });
  safe('不存在会把 input/select 纳入的裸描边规则', () => {
    const css = mod.styles.join('\n');
    if (/\.pel-module\s+:is\(button,input,select\):focus-visible/.test(css)) throw new Error('仍存在未排除 .control 的 :is(button,input,select):focus-visible 规则');
  });
  safe('非输入类可聚焦元素仍保留键盘焦点描边（可访问性不退化）', () => {
    const btn = root.querySelector('.pel-copy');
    if (!btn) throw new Error('未找到 .pel-copy');
    if (!audit.outlineRules.some(s => btn.matches(s.replace(/:focus-visible/g, '')))) throw new Error('.pel-copy 失去键盘焦点指示');
  });

  console.log('\n=== 结果 ===');
  if (failures.length) {
    console.log('存在 ' + failures.length + ' 项失败：');
    failures.forEach(f => console.log('  - ' + f));
    process.exit(1);
  } else {
    console.log('全部通过，无运行时错误。');
  }
})();
