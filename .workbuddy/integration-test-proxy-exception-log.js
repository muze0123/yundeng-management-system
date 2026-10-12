// 端到端集成验证：以真实 HTTP 服务加载 index.html?page=proxy-exception-log，
// 校验「导航渲染 → 路由解析 → 模块加载 → 内容区产出」整链路，并捕获控制台错误。
// 外网 CDN（Tailwind / Lucide / Fonts）被显式短路为空响应，仅加载本地资源，保证离线可复现。
const { JSDOM, VirtualConsole, requestInterceptor } = require('jsdom');

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8788';
const PAGE = 'proxy-exception-log';
const DOC_URL = `${BASE}/index.html?page=${PAGE}`;

const blocked = [];
const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', e => errors.push('jsdomError: ' + e.message));
virtualConsole.on('error', (...args) => errors.push('console.error: ' + args.map(String).join(' ')));

const failures = [];
const check = (label, fn) => {
  try { fn(); console.log('  [OK] ' + label); }
  catch (e) { failures.push(label + ' -> ' + e.message); console.log('  [FAIL] ' + label + ' -> ' + e.message); }
};

(async function main() {
  const html = await (await fetch(DOC_URL)).text();
  const dom = new JSDOM(html, {
    url: DOC_URL,
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole,
    // jsdom 默认视口 1024px < 框架 1100px 的侧栏自动收起阈值，会被判定为紧凑态；
    // 在脚本执行前把视口固定为 1440×900，验证常规宽屏下的展开态导航。
    beforeParse(window) {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1440 });
      Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 });
      // jsdom 未实现平滑滚动 API（浏览器为标准能力），补齐以免框架侧 ensureSubmenuVisible 误报。
      ['scrollBy', 'scrollTo', 'scrollIntoView'].forEach(name => {
        if (typeof window.Element.prototype[name] !== 'function') window.Element.prototype[name] = function () {};
      });
      if (typeof window.scrollBy !== 'function') window.scrollBy = function () {};
    },
    resources: {
      interceptors: [requestInterceptor(async request => {
        if (!String(request.url).startsWith(BASE)) {
          blocked.push(String(request.url));
          return new Response('', { headers: { 'Content-Type': 'text/plain' } });
        }
        return undefined;
      })]
    }
  });
  const { window } = dom;

  // 等待业务模块挂载（loadScript 为异步注入）
  const deadline = Date.now() + 8000;
  let root = null;
  while (Date.now() < deadline) {
    root = window.document.querySelector('[data-module-root="proxy-exception-log"]');
    if (root) break;
    await new Promise(r => setTimeout(r, 50));
  }

  console.log('=== 导航 ===');
  check('侧栏渲染出「日志管理」一级菜单', () => {
    const labels = [...window.document.querySelectorAll('#appPrimaryNav .app-menu-label')].map(el => el.textContent.trim());
    if (!labels.includes('日志管理')) throw new Error('未找到「日志管理」，实际菜单: ' + labels.join(' / '));
  });
  check('「代理异常日志」二级菜单存在且为当前激活项', () => {
    const active = window.document.querySelector('#appPrimaryNav .app-menu-link.is-active .app-menu-label');
    if (!active || active.textContent.trim() !== '代理异常日志') throw new Error('激活项为: ' + (active ? active.textContent.trim() : '无'));
  });
  check('「日志管理」分组处于展开态', () => {
    const submenu = window.document.getElementById('app-submenu-section-log');
    if (!submenu) throw new Error('未找到 section-log 子菜单容器');
    if (submenu.classList.contains('is-collapsed')) throw new Error('子菜单被折叠');
  });
  check('页面标题已按路由更新', () => {
    if (!window.document.title.includes('代理异常日志')) throw new Error('title = ' + window.document.title);
  });
  check('侧栏菜单项总数 = 9 个一级菜单', () => {
    const groups = window.document.querySelectorAll('#appPrimaryNav .app-menu-group, #appPrimaryNav > .app-menu-link');
    if (groups.length !== 9) throw new Error('一级菜单数 = ' + groups.length);
  });

  console.log('\n=== 模块渲染 ===');
  check('业务模块根节点已挂载', () => { if (!root) throw new Error('8s 内未挂载 data-module-root="proxy-exception-log"'); });
  if (!root) { report(); return; }
  check('筛选区渲染 6 个筛选项', () => {
    const n = root.querySelectorAll('.filter-item').length;
    if (n !== 6) throw new Error('筛选项数 = ' + n);
  });
  check('筛选标签与需求一致（企业ID/用户ID/代理ID/代理名称/客户端版本/产生时间）', () => {
    const expect = ['企业ID', '用户ID', '代理ID', '代理名称', '客户端版本', '产生时间'];
    const actual = [...root.querySelectorAll('.filter-label')].map(el => el.textContent.replace(/[：:]$/, '').trim());
    if (actual.join('|') !== expect.join('|')) throw new Error('实际: ' + actual.join('|'));
  });
  check('筛选区按钮为「查询 / 重置」且位于 filter-actions', () => {
    const actions = root.querySelector('.filter-actions');
    if (!actions) throw new Error('缺少 .filter-actions');
    const texts = [...actions.querySelectorAll('button')].map(b => b.textContent.trim());
    if (texts.join(',') !== '查询,重置') throw new Error('按钮为: ' + texts.join(','));
  });
  check('表头 13 列且顺序与需求一致（用户账号位于用户ID右侧）', () => {
    const expect = ['企业ID', '用户ID', '用户账号', '代理ID', '代理名称', '代理信息', '客户端版本', '系统名称', '系统版本', '终端识别码', 'MAC地址', '本机网络', '产生时间'];
    const actual = [...root.querySelectorAll('thead th')].map(th => th.textContent.trim());
    if (actual.join('|') !== expect.join('|')) throw new Error('实际: ' + actual.join('|'));
  });
  check('每行 13 个单元格', () => {
    root.querySelectorAll('tbody tr').forEach((tr, i) => { if (tr.querySelectorAll('td').length !== 13) throw new Error('第 ' + (i + 1) + ' 行 = ' + tr.querySelectorAll('td').length); });
  });
  check('用户账号取值为手机号或邮箱两种形态', () => {
    const cells = [...root.querySelectorAll('tbody tr')].map(tr => tr.querySelectorAll('td')[2].textContent.trim());
    cells.forEach(v => { if (!/^\d{11}$/.test(v) && !/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(v)) throw new Error('非法账号形态: ' + v); });
    if (!cells.some(v => /^\d{11}$/.test(v)) || !cells.some(v => v.includes('@'))) throw new Error('首屏未同时覆盖手机号与邮箱');
    if (cells.some(v => /undefined/.test(v))) throw new Error('账号列出现 undefined');
  });
  check('首屏渲染 20 行（默认 20 条/页）', () => {
    const n = root.querySelectorAll('tbody tr').length;
    if (n !== 20) throw new Error('行数 = ' + n);
  });
  check('代理信息单元格含 IP + 标签 + 地区', () => {
    const cell = root.querySelector('.pel-proxy');
    if (!cell) throw new Error('缺少 .pel-proxy');
    if (!cell.querySelector('.font-mono')) throw new Error('缺少代理IP');
    if (!cell.querySelector('.pel-tag')) throw new Error('缺少代理标签');
    if (!cell.querySelector('.pel-sub')) throw new Error('缺少所属地区');
  });
  check('代理标签文案仅「平」「静」', () => {
    root.querySelectorAll('.pel-tag').forEach(t => { if (!['平', '静'].includes(t.textContent)) throw new Error('非法标签: ' + t.textContent); });
  });
  check('「平」「静」标签为可并存的两个独立维度', () => {
    const pair = [...root.querySelectorAll('tbody tr')].find(tr => tr.querySelectorAll('.pel-tag').length === 2);
    if (!pair) throw new Error('未找到同时含两个标签的行');
    const texts = [...pair.querySelectorAll('.pel-tag')].map(t => t.textContent).join('');
    if (texts !== '平静') throw new Error('双标签行文案为: ' + texts);
  });
  check('分页器渲染于数据卡片内部（非独立卡片）', () => {
    const pag = root.querySelector('.pagination');
    if (!pag) throw new Error('缺少 .pagination');
    if (!pag.closest('section.bg-card')) throw new Error('分页器不在数据卡片内');
  });
  check('标题栏与数据表之间无多余节点（直连时不需要分割线）', () => {
    const head = root.querySelector('.pel-list-head');
    const table = root.querySelector('table');
    if (!head || !table) throw new Error('缺少标题栏或表格');
    if (head.nextElementSibling !== table.parentElement) throw new Error('中间存在额外节点: ' + head.nextElementSibling.tagName + '.' + head.nextElementSibling.className);
  });
  check('数据写在 .app-business-module 容器内（无独立系统壳/iframe）', () => {
    if (!root.classList.contains('app-business-module')) throw new Error('容器类缺失: ' + root.className);
    if (root.querySelector('iframe')) throw new Error('存在 iframe');
  });

  console.log('\n=== 控制台 ===');
  check('无未捕获异常 / console.error', () => { if (errors.length) throw new Error(errors.join(' | ')); });
  console.log('      已短路的外网请求数: ' + blocked.length + (blocked.length ? '（Tailwind/Lucide/Fonts，符合预期）' : ''));

  report();

  function report() {
    console.log('\n=== 结果 ===');
    if (failures.length) {
      console.log('存在 ' + failures.length + ' 项失败：');
      failures.forEach(f => console.log('  - ' + f));
      process.exit(1);
    } else {
      console.log('集成链路全部通过。');
    }
  }
})().catch(e => { console.error('集成测试异常: ' + e.message); process.exit(1); });
