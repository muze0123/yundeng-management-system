/* 代理异常日志 · 业务模块（日志管理）
 * 一级菜单「日志管理」→ 二级菜单「代理异常日志」。
 * 仅构建内容区，复用 index.html + app-shell.js 的公共系统框架；样式作用域限定在 .pel-module。
 * 筛选：企业ID / 用户ID / 代理ID / 代理名称 / 客户端版本 / 产生时间。
 * 列表：企业ID / 用户ID / 用户账号 / 代理ID / 代理名称 / 代理信息 / 客户端版本 / 系统名称 /
 *       系统版本 / 终端识别码 / MAC地址 / 本机网络 / 产生时间。
 * 「用户账号」= 手机号或邮箱，位于用户ID右侧，仅展示、不参与筛选。
 * 「代理信息」= 代理IP + 代理标签 + 所属地区；标签「平」= 平台代理、「静」= 静态代理，
 *   两个维度相互独立、可同时出现（口径 2026-10-10 经用户确认）。
 */
window.YundengModules = window.YundengModules || {};
window.YundengModules['proxy-exception-log'] = {
  id: 'proxy-exception-log',
  file: 'index.html?page=proxy-exception-log',
  title: '代理异常日志',
  styleLinks: [],
  scripts: [],
  styles: [`
    /* ---------- 基础与按钮（design.md §5.1） ---------- */
    .pel-module{color:#3A3F4A;font-size:13px;min-width:0}
    .pel-module .btn{display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 14px;gap:6px;border:1px solid #DFE1E5;border-radius:4px;font-size:13px;font-weight:500;background:#fff;color:#3A3F4A;white-space:nowrap;cursor:pointer;transition:background .15s,border-color .15s,color .15s}
    .pel-module .btn-primary{background:#0066FF;border-color:#0066FF;color:#fff}
    .pel-module .btn-primary:hover{background:#0052CC;border-color:#0052CC}
    .pel-module .btn-primary:active{background:#0047B3;border-color:#0047B3}
    .pel-module .btn-default:hover{background:#E6F0FF;border-color:#0066FF;color:#0066FF}
    .pel-module .btn:disabled{background:#F7F8FA;border-color:#DFE1E5;color:#9DA2AC;cursor:not-allowed}
    /* 焦点态互斥（design.md §5.13）：.control 输入类控件与 .pg-jump-input 已用「蓝边 + 柔光环」表达焦点，
       必须显式关闭其 :focus-visible 实心描边，否则同一元素会同时出现两圈蓝色描边（双描边缺陷）。 */
    .pel-module .control:focus-visible,.pel-module .pg-jump-input:focus-visible{outline:none;outline-offset:0}
    .pel-module :is(button,input,select):not(.control):not(.pg-jump-input):focus-visible{outline:2px solid #0066FF;outline-offset:2px}
    .pel-module button{cursor:pointer}
    .pel-module svg{width:16px;height:16px;flex:none}

    /* ---------- 筛选区（design.md §5.4） ---------- */
    .pel-module .filter-flow{display:grid;grid-template-columns:repeat(auto-fill,minmax(388px,1fr));align-items:center;column-gap:16px;row-gap:12px}
    .pel-module .filter-item{display:flex;align-items:center;min-width:0}
    .pel-module .filter-label{width:88px;flex:none;text-align:right;white-space:nowrap;font-size:13px;color:#3A3F4A}
    .pel-module .filter-control{position:relative;width:300px;max-width:calc(100% - 88px);flex:none}
    .pel-module .control{width:100%;height:32px;border:1px solid #DFE1E5;border-radius:4px;padding:0 8px;background:#fff;color:#3A3F4A;font:inherit;font-size:14px;outline:none}
    .pel-module .control::placeholder{color:#9DA2AC}
    .pel-module .control:focus{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
    .pel-module .search-control input{padding-right:32px}
    .pel-module .input-clear{position:absolute;right:8px;top:8px;border:0;padding:0;background:transparent;color:#9DA2AC;line-height:1}
    .pel-module .input-clear:hover{color:#6E7685}
    .pel-module .filter-actions{display:flex;align-items:center;gap:12px}
    .pel-module .pel-date{display:flex;align-items:center;justify-content:space-between;gap:4px;text-align:left;font-size:12px}
    .pel-module .pel-date.empty{color:#9DA2AC}
    .pel-module select.control{appearance:none;padding-right:24px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239DA2AC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center}

    /* ---------- 数据区（design.md §5.2 / §5.3） ---------- */
    .pel-list-head{display:flex;align-items:center;gap:8px;margin-bottom:12px}
    .pel-list-head h2{font-size:16px;font-weight:600;color:#1A1D24}
    .pel-list-head span{font-size:12px;color:#9DA2AC}
    .pel-scroll{overflow-x:auto;max-width:100%}
    .pel-module .data-table{width:100%;border-collapse:collapse;font-size:13px}
    .pel-module .data-table th{background:#F0F1F3;color:#6E7685;font-weight:600;font-size:12px;padding:9px 12px;border-bottom:1px solid #DFE1E5;text-align:left;white-space:nowrap}
    .pel-module .data-table td{padding:9px 12px;border-bottom:1px solid #F0F1F3;font-size:13px;color:#3A3F4A;text-align:left;white-space:nowrap;vertical-align:middle}
    .pel-module .data-table tbody tr:hover{background:#F3F4F6}
    .pel-module .font-mono{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}

    /* ---------- 代理信息单元格（IP + 标签 + 地区） ---------- */
    .pel-proxy{display:flex;flex-direction:column;gap:4px;line-height:18px}
    .pel-proxy-ip{display:flex;align-items:center;gap:6px}
    .pel-copy{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border:0;border-radius:3px;background:#F0F1F3;color:#9DA2AC;opacity:0;transition:opacity .15s,background .15s,color .15s}
    .pel-copy svg{width:12px;height:12px}
    .pel-proxy:hover .pel-copy,.pel-copy:focus-visible{opacity:1}
    .pel-copy:hover{background:#E6F0FF;color:#0066FF}
    .pel-proxy-meta{display:flex;align-items:center;gap:6px}
    .pel-tag{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;flex:none;border:1px solid currentColor;border-radius:3px;background:#fff;font-size:11px;font-weight:500;line-height:1}
    .pel-tag.is-platform{color:#E7772D}
    .pel-tag.is-static{color:#0FC060}
    .pel-sub{color:#6E7685;font-size:12px}

    /* ---------- 分页（design.md §5.5） ---------- */
    .pel-module .pagination{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:16px;font-size:12px;padding-top:20px}
    .pel-module .pg-nav{display:flex;gap:4px}
    .pel-module .pg-btn{min-width:30px;height:30px;padding:0 8px;border:1px solid #DFE1E5;border-radius:4px;background:#fff;color:#3A3F4A;display:inline-flex;align-items:center;justify-content:center;font:500 12px inherit}
    .pel-module .pg-btn:hover:not(:disabled){color:#0066FF;border-color:#0066FF}
    .pel-module .pg-current{background:#0066FF;border-color:#0066FF;color:#fff}
    .pel-module .pg-btn:disabled{background:#F7F8FA;color:#C7CAD1;border-color:#DFE1E5;cursor:not-allowed}
    .pel-module .pg-ellipsis{min-width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;color:#9DA2AC}
    .pel-module .pg-select-wrap{position:relative;display:inline-flex;align-items:center}
    .pel-module .pg-select{appearance:none;height:30px;padding:0 28px 0 8px;border:1px solid #DFE1E5;border-radius:4px;background:#fff;color:#3A3F4A;font:12px inherit;cursor:pointer}
    .pel-module .pg-select-wrap::after{content:'▼';position:absolute;right:8px;font-size:8px;color:#9DA2AC;pointer-events:none}
    .pel-module .pg-jump{display:flex;align-items:center;gap:8px}
    .pel-module .pg-jump-input{width:44px;height:30px;border:1px solid #DFE1E5;border-radius:4px;text-align:center;font:12px inherit;color:#3A3F4A;outline:none}
    .pel-module .pg-jump-input:focus{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
    .pel-module .pg-stats{color:#9DA2AC;white-space:nowrap}

    /* ---------- 空态 ---------- */
    .pel-empty{text-align:center!important;padding:32px!important;color:#9DA2AC}
    .pel-empty svg{display:block;width:32px;height:32px;margin:0 auto 12px}

    /* ---------- 日期范围下拉（design.md §5.4） ---------- */
    .pel-calendar{position:fixed;z-index:1300;width:640px;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);overflow:auto;background:#fff;border:1px solid #DFE1E5;border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.12);padding:16px}
    .pel-calendar[hidden]{display:none}
    .pel-months{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    .pel-month-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;font-size:13px;color:#1A1D24}
    .pel-month-head button{background:none;border:0;color:#6E7685;display:inline-flex;align-items:center}
    .pel-days{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
    .pel-days>*{height:32px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#6E7685}
    .pel-day{border:0;border-radius:4px;background:#fff;color:#3A3F4A;font-size:12px;font-family:'JetBrains Mono',monospace}
    .pel-day.other{color:#9DA2AC}
    .pel-day.range{background:#E6F0FF;color:#0066FF}
    .pel-day.selected{background:#0066FF;color:#fff}
    .pel-day:hover{outline:1px solid #0066FF}
    .pel-calendar-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:16px;padding-top:12px;border-top:1px solid #E8EAED;font-size:12px;color:#6E7685}
    .pel-calendar-foot>div{display:flex;gap:12px}

    /* ---------- 响应式（design.md §九 / §5.4） ---------- */
    @media(max-width:800px){
      .pel-module .filter-flow{grid-template-columns:1fr}
      .pel-months{grid-template-columns:1fr}
      .pel-list-head{flex-wrap:wrap}
    }
    @media(max-width:520px){
      .pel-module .pagination{justify-content:flex-start}
    }
  `],
  html: `<section class="app-business-module pel-module p-4" data-module-root="proxy-exception-log" aria-label="代理异常日志">
    <section class="bg-card rounded-lg p-5 md:p-6 mb-4">
      <form class="filter-flow" id="pel-form" aria-label="代理异常日志筛选条件"></form>
    </section>
    <section class="bg-card rounded-lg p-5 md:p-6">
      <div id="pel-panel"></div>
    </section>
    <div class="pel-calendar" id="pel-calendar" role="dialog" aria-label="选择产生时间范围" hidden></div>
  </section>`,
  init(root) {
    const $ = id => root.querySelector('#pel-' + id);
    // Lucide 标准路径内联，CDN 暂不可用时仍保留清空、翻页、日期、搜索与复制图标。
    const icon = name => {
      const paths = {
        'x': '<path d="m18 6-12 12M6 6l12 12"/>',
        'chevron-left': '<path d="m15 18-6-6 6-6"/>',
        'chevron-right': '<path d="m9 18 6-6-6-6"/>',
        'calendar-days': '<path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
        'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
        'copy': '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'
      };
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;
    };
    const icons = () => window.lucide?.createIcons();
    const escape = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const pad = n => String(n).padStart(2, '0');

    /* ======================= 静态口径 ======================= */
    const COLUMNS = ['企业ID', '用户ID', '用户账号', '代理ID', '代理名称', '代理信息', '客户端版本', '系统名称', '系统版本', '终端识别码', 'MAC地址', '本机网络', '产生时间'];
    const CLIENTS = ['4.0.2.4', '4.0.2.3', '4.0.1.9', '3.9.8.2'];
    const SYSTEMS = [
      { name: 'Windows', version: '10.0.22631' },
      { name: 'Windows', version: '10.0.19045' },
      { name: 'macOS', version: '14.4.1' },
      { name: 'Ubuntu', version: '22.04.4 LTS' },
      { name: 'Windows Server', version: '10.0.20348' }
    ];
    const LOCALS = [
      { type: '有线', ip: '192.168.1.24' },
      { type: '无线', ip: '192.168.31.105' },
      { type: '有线', ip: '10.0.8.37' },
      { type: '无线', ip: '172.20.10.6' },
      { type: '有线', ip: '192.168.0.18' }
    ];
    // 代理资产池：tags[0] = 代理来源（platform 平台代理 / self 自有代理），tags[1] = 网络类型（static 静态 / dynamic 动态）。
    const PROXIES = [
      { id: '520418', name: '洛杉矶静态-01', ip: '204.141.248.68', tags: ['platform', 'static'], region: '美国-洛杉矶' },
      { id: '520419', name: '东京静态-02', ip: '103.152.220.114', tags: ['platform', 'static'], region: '日本-东京' },
      { id: '520423', name: '香港住宅-03', ip: '45.202.211.76', tags: ['platform', 'static'], region: '中国-香港' },
      { id: '520501', name: '纽约动态-04', ip: '194.36.108.22', tags: ['platform', 'dynamic'], region: '美国-纽约' },
      { id: '520502', name: '法兰克福静态-05', ip: '91.211.89.140', tags: ['platform', 'static'], region: '德国-法兰克福' },
      { id: '520612', name: '首尔静态-06', ip: '211.234.118.9', tags: ['platform', 'static'], region: '韩国-首尔' },
      { id: '520613', name: '伦敦静态-07', ip: '178.238.11.204', tags: ['platform', 'static'], region: '英国-伦敦' },
      { id: '520615', name: '圣何塞静态-08', ip: '162.219.176.35', tags: ['platform', 'static'], region: '美国-圣何塞' },
      { id: '520616', name: '曼谷动态-09', ip: '184.22.10.77', tags: ['platform', 'dynamic'], region: '泰国-曼谷' },
      { id: '520701', name: '深圳电信-01', ip: '116.25.146.230', tags: ['self', 'static'], region: '中国-深圳' },
      { id: '520702', name: '新加坡-02', ip: '165.21.34.188', tags: ['self', 'dynamic'], region: '新加坡-新加坡' },
      { id: '520703', name: '上海联通-03', ip: '101.227.9.66', tags: ['self', 'dynamic'], region: '中国-上海' }
    ];
    // [企业ID, 用户ID, 用户账号]；用户账号为手机号或邮箱两种形态。
    const ACCOUNTS = [
      ['600128', '100247', '13800138001'], ['600128', '100251', 'lin.chen@example.com'], ['600129', '100263', '13800138002'],
      ['600130', '100318', 'yue.wang@example.com'], ['600130', '100402', '13900139003'], ['600131', '100519', 'kai.li@example.com'],
      ['600132', '100583', '15900159004']
    ];
    const TAG_LABEL = { platform: '平', static: '静' };
    const TAG_TITLE = { platform: '平台代理', static: '静态代理' };
    const TAG_CLASS = { platform: 'is-platform', static: 'is-static' };

    /* ======================= Mock 数据 ======================= */
    const BASE = new Date(2026, 9, 10, 15, 42, 8); // 2026-10-10 15:42:08 作为数据基准（最新一条）
    const hexOf = (seed, len) => Array.from({ length: len }, (_, k) => '0123456789ABCDEF'[(seed * 7 + k * 13 + seed * k * 3) % 16]).join('');
    function stamp(offsetMinutes) {
      const d = new Date(BASE.getTime() - offsetMinutes * 60000);
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
    const ROWS = Array.from({ length: 34 }, (_, i) => {
      const [entId, userId, account] = ACCOUNTS[(i * 3 + 1) % ACCOUNTS.length];
      const proxy = PROXIES[i % PROXIES.length];
      const system = SYSTEMS[(i * 2 + 1) % SYSTEMS.length];
      const local = LOCALS[(i * 3 + 2) % LOCALS.length];
      return {
        entId,
        userId,
        account,
        proxy,
        client: CLIENTS[(i * 2 + (i > 9 ? 3 : 0)) % CLIENTS.length],
        systemName: system.name,
        systemVersion: system.version,
        deviceId: hexOf(i * 31 + 7, 32),
        mac: `8C:85:90:${hexOf(i * 17 + 3, 2)}:${hexOf(i * 29 + 11, 2)}:${hexOf(i * 41 + 19, 2)}`,
        local,
        time: stamp(i * 137 + (i % 5) * 23)
      };
    });

    /* ======================= 状态 ======================= */
    let cursor = 1;
    let pageSize = 20;
    let draft = {};    // 未提交的筛选草稿
    let applied = {};  // 已提交的筛选条件
    let calendar = null;
    const STORE_KEY = 'yundeng-proxy-exception-log-v1';

    /* ======================= 渲染：筛选区 ======================= */
    function textField(name, label, placeholder) {
      return `<div class="filter-item"><label class="filter-label" for="pel-${name}">${label}：</label><div class="filter-control search-control"><input id="pel-${name}" class="control" name="${name}" placeholder="${placeholder}" autocomplete="off"><button type="button" class="input-clear" data-clear="${name}" aria-label="清空${label}" hidden>${icon('x')}</button></div></div>`;
    }
    function renderFilter() {
      const form = $('form');
      form.innerHTML = textField('entId', '企业ID', '请输入企业ID')
        + textField('userId', '用户ID', '请输入用户ID')
        + textField('proxyId', '代理ID', '请输入代理ID')
        + textField('proxyName', '代理名称', '请输入代理名称')
        + `<div class="filter-item"><label class="filter-label" for="pel-client">客户端版本：</label><div class="filter-control"><select id="pel-client" name="client" class="control"><option value="">全部</option>${CLIENTS.map(v => `<option>${v}</option>`).join('')}</select></div></div>`
        + `<div class="filter-item"><span class="filter-label" id="pel-time-label">产生时间：</span><div class="filter-control"><button type="button" id="pel-time" class="control pel-date empty" data-date="time" aria-labelledby="pel-time-label pel-time" aria-haspopup="dialog" aria-expanded="false"><span>开始时间 ～ 结束时间</span>${icon('calendar-days')}</button><input type="hidden" name="timeFrom"><input type="hidden" name="timeTo"></div></div>`
        + '<div class="filter-actions"><button class="btn btn-primary" type="submit">查询</button><button class="btn btn-default" type="button" data-reset>重置</button></div>';
      // 回填草稿（未提交）或已提交条件，保证刷新与状态恢复后筛选值不丢失
      const values = { ...applied, ...draft };
      Object.entries(values).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
      syncDateButton();
      syncClearButtons();
    }
    const readForm = form => Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, String(v).trim()]));
    // 显式逐控件清空：form.reset() 不会复位 <input type="hidden">（隐藏域承载日期区间），依赖它会导致「重置」后日期条件残留。
    function clearForm() {
      const form = $('form');
      [...form.elements].forEach(el => {
        if (el.tagName === 'SELECT') el.selectedIndex = 0;
        else if (el.type === 'checkbox' || el.type === 'radio') el.checked = el.defaultChecked;
        else el.value = '';
      });
    }
    function syncDateButton() {
      const form = $('form');
      root.querySelectorAll('[data-date]').forEach(button => {
        const from = form.elements[button.dataset.date + 'From'].value;
        const to = form.elements[button.dataset.date + 'To'].value;
        button.querySelector('span').textContent = from ? `${from} ～ ${to}` : '开始时间 ～ 结束时间';
        button.classList.toggle('empty', !from);
      });
    }
    function syncClearButtons() {
      const form = $('form');
      root.querySelectorAll('[data-clear]').forEach(button => { button.hidden = !form.elements[button.dataset.clear].value; });
    }

    /* ======================= 过滤逻辑 ======================= */
    const dayOf = value => String(value).slice(0, 10);
    const inRange = (value, from, to) => {
      const day = dayOf(value);
      if (from && day < from) return false;
      if (to && day > to) return false;
      return true;
    };
    function filteredRows() {
      const f = applied;
      return ROWS.filter(r => (!f.entId || r.entId.includes(f.entId))
        && (!f.userId || r.userId.includes(f.userId))
        && (!f.proxyId || r.proxy.id.includes(f.proxyId))
        && (!f.proxyName || r.proxy.name.toLowerCase().includes(f.proxyName.toLowerCase()))
        && (!f.client || r.client === f.client)
        && inRange(r.time, f.timeFrom, f.timeTo));
    }

    /* ======================= 渲染：列表 ======================= */
    // 仅渲染有文案的标签：自有代理（self）不输出任何徽标，避免出现 undefined 标签。
    const proxyTags = tags => tags.filter(t => TAG_LABEL[t]).map(t => `<span class="pel-tag ${TAG_CLASS[t]}" title="${TAG_TITLE[t]}">${TAG_LABEL[t]}</span>`).join('');
    const proxyCell = p => `<td><div class="pel-proxy"><div class="pel-proxy-ip"><span class="font-mono">${escape(p.ip)}</span><button type="button" class="pel-copy" data-copy="${escape(p.ip)}" aria-label="复制代理IP ${escape(p.ip)}">${icon('copy')}</button></div><div class="pel-proxy-meta">${proxyTags(p.tags)}<span class="pel-sub">${escape(p.region)}</span></div></div></td>`;
    // 用户账号：手机号为纯数字用等宽字体，邮箱为字母数字混排用正文字体。
    const accountCell = value => `<td${/^\d+$/.test(value) ? ' class="font-mono"' : ''}>${escape(value)}</td>`;
    const emptyRow = cols => `<tr><td colspan="${cols}" class="pel-empty">${icon('search')}暂无符合条件的代理异常日志，请调整筛选条件或重置</td></tr>`;

    function buildHead() {
      return `<tr>${COLUMNS.map(h => `<th scope="col">${h}</th>`).join('')}</tr>`;
    }
    function buildRow(r) {
      return `<tr><td class="font-mono">${escape(r.entId)}</td><td class="font-mono">${escape(r.userId)}</td>${accountCell(r.account)}<td class="font-mono">${escape(r.proxy.id)}</td><td>${escape(r.proxy.name)}</td>${proxyCell(r.proxy)}<td class="font-mono">${escape(r.client)}</td><td>${escape(r.systemName)}</td><td class="font-mono">${escape(r.systemVersion)}</td><td class="font-mono">${escape(r.deviceId)}</td><td class="font-mono">${escape(r.mac)}</td><td><span class="pel-sub">${escape(r.local.type)} · </span><span class="font-mono">${escape(r.local.ip)}</span></td><td class="font-mono">${escape(r.time)}</td></tr>`;
    }
    function pagination(total, p, s) {
      const pages = Math.max(1, Math.ceil(total / s));
      const nums = [];
      for (let n = 1; n <= pages; n += 1) {
        if (pages <= 7 || n === 1 || n === pages || Math.abs(n - p) <= 1) nums.push(n);
        else if (nums[nums.length - 1] !== '…') nums.push('…');
      }
      return `<nav class="pg-nav" aria-label="列表分页"><button class="pg-btn" data-page="${p - 1}" aria-label="上一页" ${p === 1 ? 'disabled' : ''}>${icon('chevron-left')}</button>${nums.map(n => n === '…' ? '<span class="pg-ellipsis">…</span>' : `<button class="pg-btn font-mono ${n === p ? 'pg-current' : ''}" data-page="${n}" ${n === p ? 'aria-current="page"' : ''}>${n}</button>`).join('')}<button class="pg-btn" data-page="${p + 1}" aria-label="下一页" ${p === pages ? 'disabled' : ''}>${icon('chevron-right')}</button></nav><label class="pg-select-wrap"><select class="pg-select" data-size aria-label="每页条数">${[10, 20, 50].map(n => `<option value="${n}" ${s === n ? 'selected' : ''}>${n} 条/页</option>`).join('')}</select></label><div class="pg-jump">跳至 <input class="pg-jump-input font-mono" value="1" inputmode="numeric" data-jump aria-label="跳转页码"> 页 <span class="pg-stats font-mono">共 ${total} 条记录　第 ${p}/${pages} 页</span></div>`;
    }
    function renderList() {
      const list = filteredRows();
      const pages = Math.max(1, Math.ceil(list.length / pageSize));
      cursor = Math.min(Math.max(1, cursor), pages);
      const start = (cursor - 1) * pageSize;
      const pageRows = list.slice(start, start + pageSize);
      $('panel').innerHTML = `<div class="pel-list-head"><h2>代理异常日志</h2><span class="font-mono">共 ${list.length} 条</span></div><div class="pel-scroll"><table class="data-table" style="min-width:2000px" aria-label="代理异常日志列表"><thead>${buildHead()}</thead><tbody>${pageRows.length ? pageRows.map(buildRow).join('') : emptyRow(COLUMNS.length)}</tbody></table></div><div class="pagination">${pagination(list.length, cursor, pageSize)}</div>`;
      icons();
      saveState();
    }

    /* ======================= 日期范围选择器 ======================= */
    const isoOf = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    function positionCalendar() {
      if (!calendar) return;
      const box = $('calendar');
      const rect = calendar.button.getBoundingClientRect();
      box.style.left = `${Math.max(16, Math.min(rect.left, innerWidth - box.offsetWidth - 16))}px`;
      box.style.top = `${Math.max(16, Math.min(rect.bottom + 8, innerHeight - box.offsetHeight - 16))}px`;
    }
    function drawCalendar() {
      const c = calendar;
      $('calendar').innerHTML = `<div class="pel-months">${[0, 1].map(offset => {
        const month = new Date(c.month.getFullYear(), c.month.getMonth() + offset, 1);
        const start = new Date(month);
        start.setDate(1 - ((month.getDay() + 6) % 7));
        return `<section><div class="pel-month-head"><button type="button" data-month="-1" aria-label="上个月">${icon('chevron-left')}</button><span class="font-mono">${month.getFullYear()}年 ${month.getMonth() + 1}月</span><button type="button" data-month="1" aria-label="下个月">${icon('chevron-right')}</button></div><div class="pel-days">${['一', '二', '三', '四', '五', '六', '日'].map(x => `<span>${x}</span>`).join('')}${Array.from({ length: 42 }, (_, i) => {
          const d = new Date(start);
          d.setDate(d.getDate() + i);
          const v = isoOf(d);
          return `<button type="button" class="pel-day ${d.getMonth() !== month.getMonth() ? 'other' : ''} ${c.from && c.to && v >= c.from && v <= c.to ? 'range' : ''} ${v === c.from || v === c.to ? 'selected' : ''}" data-day="${v}" aria-label="${v}">${d.getDate()}</button>`;
        }).join('')}</div></section>`;
      }).join('')}</div><div class="pel-calendar-foot"><span>${c.to ? `${c.from} ～ ${c.to}` : c.from ? '请选择结束时间' : '请选择开始时间'}</span><div><button type="button" class="btn btn-default" data-calendar-clear>清空</button><button type="button" class="btn btn-primary" data-calendar-confirm ${c.from && !c.to ? 'disabled' : ''}>确定</button></div></div>`;
      icons();
      positionCalendar();
    }
    function closeCalendar(focus) {
      if (!calendar) return;
      const button = calendar.button;
      calendar = null;
      $('calendar').hidden = true;
      button.setAttribute('aria-expanded', 'false');
      if (focus) button.focus();
    }

    /* ======================= 状态持久化 ======================= */
    function saveState() {
      try { sessionStorage.setItem(STORE_KEY, JSON.stringify({ cursor, pageSize, draft, applied })); } catch (_) {}
    }
    function restoreState() {
      try {
        const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) || 'null');
        if (!saved) return;
        if (saved.cursor) cursor = saved.cursor;
        if (saved.pageSize) pageSize = saved.pageSize;
        if (saved.draft) draft = saved.draft;
        if (saved.applied) applied = saved.applied;
      } catch (_) {}
    }

    /* ======================= 交互：复制代理 IP ======================= */
    function toast(message) {
      const box = document.getElementById('appToastContainer');
      if (!box) return;
      const el = document.createElement('div');
      el.className = 'app-toast';
      el.textContent = message;
      box.append(el);
      setTimeout(() => el.remove(), 2600);
    }
    function copyText(text) {
      try {
        if (navigator.clipboard?.writeText) { navigator.clipboard.writeText(text); return true; }
      } catch (_) {}
      try {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.append(area);
        area.select();
        document.execCommand('copy');
        area.remove();
        return true;
      } catch (_) { return false; }
    }

    /* ======================= 事件绑定 ======================= */
    root.addEventListener('click', e => {
      const button = e.target.closest('button');
      if (!button) return;
      if (button.dataset.clear) { const f = $('form'); f.elements[button.dataset.clear].value = ''; syncClearButtons(); draft = readForm(f); f.elements[button.dataset.clear].focus(); return; }
      if (button.hasAttribute('data-reset')) { clearForm(); applied = {}; draft = {}; cursor = 1; syncDateButton(); syncClearButtons(); renderList(); return; }
      if (button.dataset.copy) { toast(copyText(button.dataset.copy) ? '代理IP已复制' : '复制失败，请手动选择复制'); return; }
      if (button.dataset.page) { const n = Number(button.dataset.page); const pages = Math.max(1, Math.ceil(filteredRows().length / pageSize)); if (n >= 1 && n <= pages) { cursor = n; renderList(); } return; }
      if (button.dataset.date) {
        if (calendar?.button === button) { closeCalendar(true); return; }
        closeCalendar();
        const f = $('form'), name = button.dataset.date;
        calendar = { button, name, from: f.elements[name + 'From'].value, to: f.elements[name + 'To'].value, month: new Date((f.elements[name + 'From'].value || '2026-10-01').slice(0, 7) + '-01T12:00:00') };
        $('calendar').hidden = false;
        button.setAttribute('aria-expanded', 'true');
        drawCalendar();
        $('calendar').querySelector('button')?.focus();
        return;
      }
      if (button.dataset.month && calendar) { calendar.month.setMonth(calendar.month.getMonth() + Number(button.dataset.month)); drawCalendar(); $('calendar').querySelector(`[data-month="${button.dataset.month}"]`)?.focus(); return; }
      if (button.dataset.day && calendar) {
        if (!calendar.from || calendar.to) { calendar.from = button.dataset.day; calendar.to = ''; }
        else { calendar.to = button.dataset.day; if (calendar.to < calendar.from) [calendar.from, calendar.to] = [calendar.to, calendar.from]; }
        drawCalendar();
        $('calendar').querySelector(`[data-day="${button.dataset.day}"]`)?.focus();
        return;
      }
      if (button.hasAttribute('data-calendar-clear') && calendar) { calendar.from = ''; calendar.to = ''; drawCalendar(); $('calendar').querySelector('[data-calendar-clear]')?.focus(); return; }
      if (button.hasAttribute('data-calendar-confirm') && calendar) {
        const f = $('form');
        f.elements[calendar.name + 'From'].value = calendar.from;
        f.elements[calendar.name + 'To'].value = calendar.to;
        syncDateButton();
        draft = readForm(f);
        saveState();
        closeCalendar(true);
      }
    });

    root.addEventListener('submit', e => {
      e.preventDefault();
      closeCalendar();
      if (e.target !== $('form')) return;
      applied = readForm($('form'));
      draft = {};
      cursor = 1;
      renderList();
    });

    root.addEventListener('input', e => {
      const form = $('form');
      if (!form || !form.contains(e.target)) return;
      syncClearButtons();
      draft = readForm(form);
    });

    root.addEventListener('change', e => {
      if (e.target.matches('[data-size]')) { pageSize = Number(e.target.value); cursor = 1; renderList(); return; }
      const form = $('form');
      if (form && form.contains(e.target)) { syncClearButtons(); draft = readForm(form); }
    });

    root.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (calendar) { e.preventDefault(); closeCalendar(true); }
        return;
      }
      if (e.key === 'Enter' && e.target.hasAttribute('data-jump')) {
        e.preventDefault();
        const pages = Math.max(1, Math.ceil(filteredRows().length / pageSize));
        const value = Number(e.target.value);
        if (!Number.isInteger(value) || value < 1 || value > pages) {
          toast(`请输入 1 至 ${pages} 之间的有效页码`);
          e.target.value = '1';
          return;
        }
        cursor = value;
        renderList();
        root.querySelector('[data-jump]')?.focus();
        return;
      }
      if (e.key === 'Tab') {
        const panel = calendar ? $('calendar') : null;
        if (!panel) return;
        const items = [...panel.querySelectorAll('button:not(:disabled),input:not([type=hidden]),select')].filter(x => !x.hidden);
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    const controller = new AbortController();
    document.addEventListener('pointerdown', e => {
      if (calendar && !$('calendar').contains(e.target) && !calendar.button.contains(e.target)) closeCalendar();
    }, { signal: controller.signal });
    window.addEventListener('resize', () => { positionCalendar(); closeCalendar(); }, { signal: controller.signal });
    document.addEventListener('scroll', positionCalendar, { capture: true, signal: controller.signal });
    const observer = new MutationObserver(() => {
      if (!root.isConnected) { controller.abort(); observer.disconnect(); }
    });
    observer.observe(root.parentNode, { childList: true });

    /* ======================= 启动 ======================= */
    restoreState();
    renderFilter();
    renderList();
  }
};
