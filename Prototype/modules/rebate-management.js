/* 返佣管理 · 业务模块（运营中心）
 * 六个一级 Tab：返佣汇总 / 返佣明细 / 冻结明细 / 邀请明细 / 提现明细 / 返佣设置。
 * 仅构建内容区，复用 index.html + app-shell.js 的公共框架；样式作用域限定在 .rm-module。
 */
window.YundengModules = window.YundengModules || {};
window.YundengModules['rebate-management'] = {
  id: 'rebate-management',
  file: 'index.html?page=rebate-management',
  title: '返佣管理',
  styleLinks: [],
  scripts: [],
  styles: [`
    /* ---------- 基础与按钮（design.md §5.1） ---------- */
    .rm-module{color:#3A3F4A;font-size:13px;min-width:0}
    .rm-module .btn{display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 14px;gap:6px;border:1px solid #DFE1E5;border-radius:4px;font-size:13px;font-weight:500;background:#fff;color:#3A3F4A;white-space:nowrap;cursor:pointer;transition:background .15s,border-color .15s,color .15s}
    .rm-module .btn-primary{background:#0066FF;border-color:#0066FF;color:#fff}
    .rm-module .btn-primary:hover{background:#0052CC;border-color:#0052CC}
    .rm-module .btn-primary:active{background:#0047B3;border-color:#0047B3}
    .rm-module .btn-default:hover{background:#E6F0FF;border-color:#0066FF;color:#0066FF}
    .rm-module .btn:disabled{background:#F7F8FA;border-color:#DFE1E5;color:#9DA2AC;cursor:not-allowed}
    /* 键盘焦点描边：仅作用于「没有自带 focus 环」的控件；
       .control / .pg-jump-input 自带 box-shadow 焦点环，必须排除，否则叠加成双描边（同 proxy-replacement 处理） */
    .rm-module :is(button,input,select):not(.control):not(.pg-jump-input):focus-visible{outline:2px solid #0066FF;outline-offset:2px}
    .rm-module button{cursor:pointer}
    .rm-module svg{width:16px;height:16px;flex:none}

    /* ---------- 一级 Tab（design.md §5.0） ---------- */
    .rm-primary-tabs{display:flex;min-width:0;gap:4px;margin:0 0 20px;padding:0;border-bottom:1px solid #E8EAED;overflow-x:auto;scrollbar-width:none}
    .rm-primary-tabs::-webkit-scrollbar{display:none}
    .rm-primary-tab{position:relative;display:inline-flex;align-items:center;min-height:42px;padding:0 16px;border:0;border-bottom:2px solid transparent;background:transparent;color:#6E7685;font:inherit;font-size:14px;white-space:nowrap;transition:color .15s,background .15s}
    .rm-primary-tab:hover{color:#1A1D24;background:#F3F4F6}
    .rm-primary-tab.is-active{color:#0066FF;border-bottom-color:#0066FF;font-weight:600}

    /* ---------- 筛选区（design.md §5.4） ---------- */
    .rm-module .filter-flow{display:grid;grid-template-columns:repeat(auto-fill,minmax(388px,1fr));align-items:center;column-gap:16px;row-gap:12px}
    .rm-module .filter-item{display:flex;align-items:center;min-width:0}
    .rm-module .filter-label{width:88px;flex:none;text-align:right;white-space:nowrap;font-size:13px;color:#3A3F4A}
    .rm-module .filter-control{position:relative;width:300px;max-width:calc(100% - 88px);flex:none}
    .rm-module .control{width:100%;height:32px;border:1px solid #DFE1E5;border-radius:4px;padding:0 8px;background:#fff;color:#3A3F4A;font:inherit;font-size:14px;outline:none}
    .rm-module .control::placeholder{color:#9DA2AC}
    .rm-module .control:focus{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
    /* 兜底：即使其它引用链带来 outline，也保证控件只有一个焦点环 */
    .rm-module .control:focus-visible,.rm-module .pg-jump-input:focus-visible{outline:none;outline-offset:0}
    /* 日期区间触发器在日历展开时保持焦点环（与 proxy-replacement 的 aria-expanded 口径一致） */
    .rm-module .control[aria-expanded="true"]{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
    .rm-module .search-control input{padding-right:32px}
    .rm-module .input-clear{position:absolute;right:8px;top:8px;border:0;padding:0;background:transparent;color:#9DA2AC;line-height:1}
    .rm-module .input-clear:hover{color:#6E7685}
    .rm-module .filter-actions{display:flex;align-items:center;gap:12px}
    .rm-module .rm-date{display:flex;align-items:center;justify-content:space-between;gap:4px;text-align:left;font-size:12px}
    .rm-module .rm-date.empty{color:#9DA2AC}
    .rm-module select.control{appearance:none;padding-right:24px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239DA2AC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center}

    /* ---------- 数据区（design.md §5.2 / §5.3） ---------- */
    .rm-list-head{display:flex;align-items:center;gap:8px;margin-bottom:12px}
    .rm-list-head h2{font-size:16px;font-weight:600;color:#1A1D24}
    .rm-list-head span{font-size:12px;color:#9DA2AC}
    .rm-scroll{overflow-x:auto;max-width:100%}
    .rm-module .data-table{width:100%;border-collapse:collapse;font-size:13px}
    .rm-module .data-table th{background:#F0F1F3;color:#6E7685;font-weight:600;font-size:12px;padding:9px 12px;border-bottom:1px solid #DFE1E5;text-align:left;white-space:nowrap}
    .rm-module .data-table td{padding:9px 12px;border-bottom:1px solid #F0F1F3;font-size:13px;color:#3A3F4A;text-align:left;white-space:nowrap}
    .rm-module .data-table tbody tr:hover{background:#F3F4F6}
    .rm-module .font-mono{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}
    .rm-contact{line-height:20px}
    .rm-contact .rm-sub{color:#6E7685;font-size:12px}
    .rm-amount{white-space:nowrap}
    .rm-detail-link{border:0;background:none;padding:0;margin-left:8px;color:#0066FF;font:500 12px inherit;vertical-align:baseline}
    .rm-detail-link:hover{text-decoration:underline}
    .rm-link{border:0;background:none;padding:0;color:#0066FF;font:inherit}
    .rm-link:hover{text-decoration:underline}
    .rm-badge{display:inline-flex;align-items:center;padding:2px 8px;border:1px solid currentColor;border-radius:4px;font-size:12px;line-height:18px}
    .rm-badge.is-success{color:#0FC060;background:#E7F9F0}
    .rm-badge.is-warning{color:#E7772D;background:#FDF2E9}
    .rm-badge.is-info{color:#0091D5;background:#E4F4FB}
    .rm-badge.is-muted{color:#9DA2AC;background:#F7F8FA}
    .rm-pos{color:#0FC060}
    .rm-neg{color:#D9001B}

    /* ---------- 排序表头（design.md §5.2） ---------- */
    .rm-sort{display:inline-flex;align-items:center;gap:4px;height:auto;padding:0;border:0;background:none;color:#6E7685;font:600 12px inherit}
    .rm-sort.is-active{color:#0066FF}
    .rm-caret{display:inline-flex;flex-direction:column;justify-content:center;gap:2px;width:10px;height:14px}
    .rm-caret i{display:block;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent}
    .rm-caret i.up{border-bottom:6px solid #9DA2AC}
    .rm-caret i.down{border-top:6px solid #9DA2AC}
    .rm-caret.asc i.up{border-bottom-color:#0066FF}
    .rm-caret.desc i.down{border-top-color:#0066FF}

    /* ---------- 分页（design.md §5.5） ---------- */
    .rm-module .pagination{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:16px;font-size:12px;padding-top:20px}
    .rm-module .pg-nav{display:flex;gap:4px}
    .rm-module .pg-btn{min-width:30px;height:30px;padding:0 8px;border:1px solid #DFE1E5;border-radius:4px;background:#fff;color:#3A3F4A;display:inline-flex;align-items:center;justify-content:center;font:500 12px inherit}
    .rm-module .pg-btn:hover:not(:disabled){color:#0066FF;border-color:#0066FF}
    .rm-module .pg-current{background:#0066FF;border-color:#0066FF;color:#fff}
    .rm-module .pg-btn:disabled{background:#F7F8FA;color:#C7CAD1;border-color:#DFE1E5;cursor:not-allowed}
    .rm-module .pg-ellipsis{min-width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;color:#9DA2AC}
    .rm-module .pg-select-wrap{position:relative;display:inline-flex;align-items:center}
    .rm-module .pg-select{appearance:none;height:30px;padding:0 28px 0 8px;border:1px solid #DFE1E5;border-radius:4px;background:#fff;color:#3A3F4A;font:12px inherit;cursor:pointer}
    .rm-module .pg-select-wrap::after{content:'▼';position:absolute;right:8px;font-size:8px;color:#9DA2AC;pointer-events:none}
    .rm-module .pg-jump{display:flex;align-items:center;gap:8px}
    .rm-module .pg-jump-input{width:44px;height:30px;border:1px solid #DFE1E5;border-radius:4px;text-align:center;font:12px inherit;color:#3A3F4A;outline:none}
    .rm-module .pg-jump-input:focus{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
    .rm-module .pg-stats{color:#9DA2AC;white-space:nowrap}

    /* ---------- 空态 ---------- */
    .rm-empty{text-align:center!important;padding:32px!important;color:#9DA2AC}
    .rm-empty svg{display:block;width:32px;height:32px;margin:0 auto 12px}

    /* ---------- 返佣设置 ---------- */
    .rm-settings{display:flex;flex-direction:column;gap:24px}
    .rm-setting-title{font-size:16px;font-weight:600;color:#1A1D24;margin-bottom:12px}
    .rm-setting-block .data-table td:last-child,.rm-setting-block .data-table th:last-child{width:160px}

    /* ---------- 弹窗（design.md §5.6） ---------- */
    .rm-mask{position:fixed;inset:0;background:rgba(0,0,0,.3);z-index:1200;display:flex;align-items:center;justify-content:center}
    .rm-modal{width:760px;max-width:92vw;max-height:90vh;background:#fff;border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.12);display:flex;flex-direction:column;overflow:hidden}
    .rm-modal-head{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid #E8EAED;flex:none}
    .rm-modal-head h2{font-size:16px;font-weight:600;color:#1A1D24}
    .rm-close{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border:0;background:none;color:#9DA2AC}
    .rm-modal-body{padding:32px 24px;overflow:auto}
    .rm-field{display:flex;align-items:center;justify-content:center;gap:0}
    .rm-field>label{width:90px;flex:none;text-align:right;font-size:13px;color:#3A3F4A}
    .rm-input-wrap{position:relative;width:400px;max-width:100%}
    .rm-input-wrap .control{height:30px}
    .rm-input-wrap .rm-suffix{position:absolute;right:8px;top:6px;font-size:13px;color:#6E7685}
    /* 金额输入前缀 ￥（不影响输入内容与校验，仅为视觉前缀） */
    .rm-input-wrap .rm-prefix{position:absolute;left:8px;top:6px;font-size:13px;color:#6E7685;pointer-events:none}
    .rm-input-wrap.has-prefix .control{padding-left:22px}
    .rm-modal-foot{display:flex;justify-content:flex-end;gap:12px;padding:0 24px 20px;border-top:1px solid #E8EAED;padding-top:16px}
    .rm-error{color:#D9001B;font-size:12px;margin-top:12px;text-align:center;min-height:16px}
    .rm-hint{color:#6E7685;font-size:12px;margin-top:12px;text-align:center}

    /* ---------- 日期范围下拉（design.md §5.4） ---------- */
    .rm-calendar{position:fixed;z-index:1300;width:640px;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);overflow:auto;background:#fff;border:1px solid #DFE1E5;border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.12);padding:16px}
    .rm-calendar[hidden]{display:none}
    .rm-months{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    .rm-month-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;font-size:13px;color:#1A1D24}
    .rm-month-head button{background:none;border:0;color:#6E7685;display:inline-flex;align-items:center}
    .rm-days{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
    .rm-days>*{height:32px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#6E7685}
    .rm-day{border:0;border-radius:4px;background:#fff;color:#3A3F4A;font-size:12px;font-family:'JetBrains Mono',monospace}
    .rm-day.other{color:#9DA2AC}
    .rm-day.range{background:#E6F0FF;color:#0066FF}
    .rm-day.selected{background:#0066FF;color:#fff}
    .rm-day:hover{outline:1px solid #0066FF}
    .rm-calendar-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:16px;padding-top:12px;border-top:1px solid #E8EAED;font-size:12px;color:#6E7685}
    .rm-calendar-foot>div{display:flex;gap:12px}

    /* ---------- 响应式（design.md §九 / §5.4） ---------- */
    @media(max-width:800px){
      .rm-module .filter-flow{grid-template-columns:1fr}
      .rm-months{grid-template-columns:1fr}
      .rm-modal-body{padding:20px 16px}
      .rm-field>label{width:80px}
      .rm-list-head{flex-wrap:wrap}
    }
    @media(max-width:520px){
      .rm-module .pagination{justify-content:flex-start}
    }
  `],
  html: `<section class="app-business-module rm-module p-4" data-module-root="rebate-management" aria-label="返佣管理">
    <section class="bg-card rounded-lg p-5 md:p-6 mb-4">
      <div class="rm-primary-tabs" id="rm-tabs" role="tablist" aria-label="返佣管理分类"></div>
      <form class="filter-flow" id="rm-form" aria-label="返佣筛选条件"></form>
    </section>
    <section class="bg-card rounded-lg p-5 md:p-6">
      <div id="rm-panel"></div>
    </section>
    <div id="rm-layer"></div>
    <div class="rm-calendar" id="rm-calendar" role="dialog" aria-label="选择日期范围" hidden></div>
  </section>`,
  init(root) {
    const $ = id => root.querySelector('#rm-' + id);
    // Lucide 标准路径内联，CDN 暂不可用时仍保留关闭、翻页、日期与搜索图标。
    const icon = name => {
      const paths = {
        'x': '<path d="m18 6-12 12M6 6l12 12"/>',
        'chevron-left': '<path d="m15 18-6-6 6-6"/>',
        'chevron-right': '<path d="m9 18 6-6-6-6"/>',
        'calendar-days': '<path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
        'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'
      };
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;
    };
    const icons = () => window.lucide?.createIcons();
    const escape = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    /* 金额统一口径：前置 ￥ + 千分位 + 两位小数（列表金额列、返佣设置金额、弹窗提示共用） */
    const money = value => '￥' + Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const pad = n => String(n).padStart(2, '0');
    const r2 = v => Math.round(v * 100) / 100;

    /* ======================= 静态口径 ======================= */
    const TABS = [
      { key: 'summary', label: '返佣汇总' },
      { key: 'rebate', label: '返佣明细' },
      { key: 'freeze', label: '冻结明细' },
      { key: 'invite', label: '邀请明细' },
      { key: 'withdraw', label: '提现明细' },
      { key: 'settings', label: '返佣设置' }
    ];
    const ORDER_TYPES = ['设备订单', '续费订单', '充值订单', '购买套餐', '续费套餐', '兑换订单'];
    const FREEZE_STATUS = ['冻结中', '已解冻'];
    const INVITE_STATUS = ['消费', '注册'];
    const WITHDRAW_TYPES = ['提现', '返佣入账', '解冻入账', '提现退回'];
    const MECHANISMS = [{ key: 'seagull', name: '海鸥', ratio: 20 }, { key: 'backend', name: '后台', ratio: 15 }];
    const TAB_META = {
      summary: { title: '用户返佣账户', cols: 8, minWidth: 1400 },
      rebate: { title: '返佣订单明细', cols: 11, minWidth: 1820 },
      freeze: { title: '冻结佣金明细', cols: 11, minWidth: 1900 },
      invite: { title: '邀请关系记录', cols: 9, minWidth: 1600 },
      withdraw: { title: '提现流水明细', cols: 6, minWidth: 1120 }
    };

    /* ======================= Mock 数据（推断补全，贴合云登返佣业务） ======================= */
    const BASE = new Date(2026, 9, 8, 10, 30, 0); // 2026-10-08 作为数据基准日
    function dateAt(offsetDays, hour, minute) {
      const d = new Date(BASE.getTime());
      d.setDate(d.getDate() - offsetDays);
      d.setHours(hour, minute, (hour * 7 + minute * 3) % 60, 0);
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
    function addDays(str, n) {
      const d = new Date(str.replace(' ', 'T'));
      d.setDate(d.getDate() + n);
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
    const dayOf = str => str.slice(0, 10);

    // 用户返佣账户：累计佣金 = 可提现金额 + 冻结佣金 + 累计提现（保证四个金额口径自洽）
    const users = Array.from({ length: 14 }, (_, i) => {
      const mechanism = MECHANISMS[i % MECHANISMS.length];
      const totalCommission = r2(180 + i * 163.75 + (i % 3) * 92.4);
      const frozenCommission = r2(totalCommission * (i % 4 === 0 ? 0.22 : 0.08));
      const totalWithdrawn = i % 5 === 0 ? 0 : r2(totalCommission * 0.45);
      const withdrawable = r2(totalCommission - frozenCommission - totalWithdrawn);
      return {
        id: String(100001 + i),
        phone: '13' + (8 + (i % 2)) + '0000' + String(1001 + i),
        email: `rebate${String(i + 1).padStart(3, '0')}@163.com`,
        account: `agent_${String(i + 1).padStart(4, '0')}`,
        balance: r2(withdrawable + 66.5 + i * 17.35),
        totalCommission,
        frozenCommission,
        withdrawable,
        totalWithdrawn,
        inviteCount: 2 + ((i * 3) % 16),
        ratio: mechanism.ratio,
        mechanism: mechanism.name,
        paidTotal: r2(totalCommission * 4.6 + 120),
        consumeTotal: r2(totalCommission * 3.8 + 96)
      };
    });

    // 返佣明细：订单支付金额 × 返佣比例 = 返佣金额
    const rebateRows = Array.from({ length: 26 }, (_, i) => {
      const inviter = users[i % users.length];
      const invitee = users[(i + 4) % users.length];
      const pay = [99, 199, 299, 499, 599, 1299, 1999][i % 7];
      const status = i % 3 === 2 ? '冻结中' : '已结算';
      return {
        orderNo: `SO2026${String(90000 + i * 3)}`,
        orderType: ORDER_TYPES[i % ORDER_TYPES.length],
        createdAt: dateAt(40 - i, 9 + (i % 9), (i * 7) % 60),
        invitee,
        inviter,
        pay,
        ratio: inviter.ratio,
        amount: r2(pay * inviter.ratio / 100),
        status,
        rebateAt: status === '已结算' ? dateAt(38 - i, 10 + (i % 8), (i * 5) % 60) : ''
      };
    });

    // 冻结明细：冻结佣金 = 该笔返佣金额
    const freezeRows = Array.from({ length: 16 }, (_, i) => {
      const inviter = users[(i + 2) % users.length];
      const invitee = users[(i + 7) % users.length];
      const pay = [199, 299, 499, 599, 1299, 1999][i % 6];
      const done = dateAt(30 - i * 2, 11 + (i % 7), (i * 9) % 60);
      return {
        orderNo: `SO2026${String(91000 + i * 5)}`,
        orderType: ORDER_TYPES[(i + 1) % ORDER_TYPES.length],
        createdAt: dateAt(31 - i * 2, 9 + (i % 8), (i * 3) % 60),
        invitee,
        inviter,
        pay,
        ratio: inviter.ratio,
        amount: r2(pay * inviter.ratio / 100),
        status: i % 4 === 3 ? '已解冻' : '冻结中',
        done,
        unfreeze: addDays(done, 7)
      };
    });

    // 邀请明细：展示邀请者侧的累计付费 / 消费 / 返佣口径
    const inviteRows = Array.from({ length: 22 }, (_, i) => {
      const inviter = users[i % users.length];
      const invitee = users[(i + 5) % users.length];
      return {
        seq: i + 1,
        inviter,
        invitee,
        invitedAt: dateAt(60 - i * 2, 8 + (i % 10), (i * 6) % 60),
        status: i % 3 === 0 ? '注册' : '消费',
        paidTotal: inviter.paidTotal,
        consumeTotal: inviter.consumeTotal,
        ratio: inviter.ratio,
        commission: inviter.totalCommission
      };
    });

    // 提现明细：邀请用户账户的交易流水
    const withdrawRows = Array.from({ length: 22 }, (_, i) => {
      const u = users[i % users.length];
      const type = WITHDRAW_TYPES[i % WITHDRAW_TYPES.length];
      const amount = type === '提现' ? -r2(100 + i * 37.5) : r2(120 + i * 46.8);
      return { user: u, type, amount, createdAt: dateAt(50 - i * 2, 10 + (i % 9), (i * 4) % 60) };
    });

    // 返佣设置：返佣比例机制 + 提现门槛
    const settings = {
      ratio: MECHANISMS.map(m => ({ key: m.key, name: m.name, value: m.ratio })),
      withdraw: [
        { key: 'min', name: '最低提现金额', value: 100 },
        { key: 'max', name: '最高提现金额', value: 5000 }
      ]
    };

    /* ======================= 状态 ======================= */
    let activeTab = 'summary';
    /* 返佣汇总可排序字段白名单（用户ID / 手机号邮箱账户 已按需求取消排序，不在此列） */
    const SORTABLE_FIELDS = ['totalCommission', 'frozenCommission', 'withdrawable', 'totalWithdrawn', 'inviteCount', 'ratio'];
    let sort = { field: 'totalCommission', dir: 'desc' };
    let cursor = { summary: 1, rebate: 1, freeze: 1, invite: 1, withdraw: 1 };
    let pageSize = { summary: 20, rebate: 20, freeze: 20, invite: 20, withdraw: 20 };
    let draft = {};     // 各 Tab 未提交的筛选草稿
    let applied = {};   // 各 Tab 已提交的筛选条件
    let calendar = null, trigger = null, scrollHost = null, oldOverflow = '';
    let editing = null;
    const STORE_KEY = 'yundeng-rebate-management-v1';

    /* ======================= 筛选字段定义 ======================= */
    const FILTERS = {
      summary: [{ type: 'text', name: 'user', label: '用户搜索', placeholder: '请输入用户手机号/邮箱/用户ID' }],
      rebate: [
        { type: 'text', name: 'orderNo', label: '订单号', placeholder: '请输入订单号' },
        { type: 'select', name: 'orderType', label: '订单类型', options: ORDER_TYPES },
        { type: 'date', name: 'created', label: '创建时间' },
        { type: 'text', name: 'invitee', label: '被邀请者', placeholder: '请输入被邀请者手机号/邮箱/用户名' },
        { type: 'text', name: 'inviter', label: '邀请者', placeholder: '请输入邀请者手机号/邮箱/用户名' }
      ],
      freeze: [
        { type: 'text', name: 'orderNo', label: '订单号', placeholder: '请输入订单号' },
        { type: 'select', name: 'orderType', label: '订单类型', options: ORDER_TYPES },
        { type: 'date', name: 'created', label: '创建时间' },
        { type: 'text', name: 'invitee', label: '被邀请者', placeholder: '请输入被邀请者手机号/邮箱/用户名' },
        { type: 'text', name: 'inviter', label: '邀请者', placeholder: '请输入邀请者手机号/邮箱/用户名' }
      ],
      invite: [
        { type: 'text', name: 'inviter', label: '邀请者', placeholder: '请输入邀请者手机号/邮箱/用户名' },
        { type: 'text', name: 'invitee', label: '被邀请者', placeholder: '请输入被邀请者手机号/邮箱/用户名' },
        { type: 'date', name: 'invitedAt', label: '邀请时间' },
        { type: 'select', name: 'inviteStatus', label: '邀请状态', options: INVITE_STATUS }
      ],
      withdraw: [
        { type: 'text', name: 'phone', label: '手机', placeholder: '请输入手机号' },
        { type: 'text', name: 'email', label: '邮箱', placeholder: '请输入邮箱' },
        { type: 'text', name: 'username', label: '用户名', placeholder: '请输入用户名' },
        { type: 'text', name: 'inviterId', label: '邀请用户ID', placeholder: '请输入邀请用户ID' },
        { type: 'date', name: 'created', label: '创建时间' }
      ],
      settings: []
    };

    /* ======================= 渲染：一级 Tab ======================= */
    function renderTabs() {
      $('tabs').innerHTML = TABS.map(t => `<button type="button" role="tab" class="rm-primary-tab${t.key === activeTab ? ' is-active' : ''}" data-tab="${t.key}" aria-selected="${t.key === activeTab}" tabindex="${t.key === activeTab ? 0 : -1}">${t.label}</button>`).join('');
    }

    /* ======================= 渲染：筛选区 ======================= */
    function fieldHtml(cfg) {
      return `<div class="filter-item"><label class="filter-label" for="rm-${cfg.name}">${cfg.label}：</label><div class="filter-control search-control"><input id="rm-${cfg.name}" class="control" name="${cfg.name}" placeholder="${escape(cfg.placeholder || ('请输入' + cfg.label))}" autocomplete="off"><button type="button" class="input-clear" data-clear="${cfg.name}" aria-label="清空${cfg.label}" hidden>${icon('x')}</button></div></div>`;
    }
    function selectHtml(cfg) {
      return `<div class="filter-item"><label class="filter-label" for="rm-${cfg.name}">${cfg.label}：</label><div class="filter-control"><select id="rm-${cfg.name}" name="${cfg.name}" class="control"><option value="">全部</option>${cfg.options.map(o => `<option>${escape(o)}</option>`).join('')}</select></div></div>`;
    }
    function dateHtml(cfg) {
      return `<div class="filter-item"><span class="filter-label" id="rm-${cfg.name}-label">${cfg.label}：</span><div class="filter-control"><button type="button" id="rm-${cfg.name}" class="control rm-date empty" data-date="${cfg.name}" aria-labelledby="rm-${cfg.name}-label rm-${cfg.name}" aria-haspopup="dialog" aria-expanded="false"><span>开始时间 ～ 结束时间</span>${icon('calendar-days')}</button><input type="hidden" name="${cfg.name}From"><input type="hidden" name="${cfg.name}To"></div></div>`;
    }
    function renderFilter() {
      const form = $('form');
      const fields = FILTERS[activeTab] || [];
      if (activeTab === 'settings' || !fields.length) {
        form.hidden = true;
        form.innerHTML = '';
        return;
      }
      form.hidden = false;
      form.innerHTML = fields.map(cfg => cfg.type === 'select' ? selectHtml(cfg) : cfg.type === 'date' ? dateHtml(cfg) : fieldHtml(cfg)).join('')
        + '<div class="filter-actions"><button class="btn btn-primary" type="submit">查询</button><button class="btn btn-default" type="button" data-reset>重置</button></div>';
      // 回填草稿（未提交）或已提交条件，保证切 Tab / 刷新后筛选值不丢失
      const values = { ...(applied[activeTab] || {}), ...(draft[activeTab] || {}) };
      Object.entries(values).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
      syncDateButtons();
      syncClearButtons();
    }
    const readForm = form => Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, String(v).trim()]));
    function syncDateButtons() {
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
    const matchesUser = (u, query) => {
      if (!query) return true;
      const q = query.toLowerCase();
      return u.id.includes(query) || u.phone.includes(query) || u.email.toLowerCase().includes(q) || u.account.toLowerCase().includes(q);
    };
    const inRange = (value, from, to) => {
      const day = dayOf(value);
      if (from && day < from) return false;
      if (to && day > to) return false;
      return true;
    };
    function filteredRows() {
      const f = applied[activeTab] || {};
      if (activeTab === 'summary') {
        return users.filter(u => matchesUser(u, f.user));
      }
      if (activeTab === 'rebate') {
        return rebateRows.filter(r => (!f.orderNo || r.orderNo.includes(f.orderNo)) && (!f.orderType || r.orderType === f.orderType)
          && inRange(r.createdAt, f.createdFrom, f.createdTo) && matchesUser(r.invitee, f.invitee) && matchesUser(r.inviter, f.inviter));
      }
      if (activeTab === 'freeze') {
        return freezeRows.filter(r => (!f.orderNo || r.orderNo.includes(f.orderNo)) && (!f.orderType || r.orderType === f.orderType)
          && inRange(r.createdAt, f.createdFrom, f.createdTo) && matchesUser(r.invitee, f.invitee) && matchesUser(r.inviter, f.inviter));
      }
      if (activeTab === 'invite') {
        return inviteRows.filter(r => matchesUser(r.inviter, f.inviter) && matchesUser(r.invitee, f.invitee)
          && inRange(r.invitedAt, f.invitedAtFrom, f.invitedAtTo) && (!f.inviteStatus || r.status === f.inviteStatus));
      }
      if (activeTab === 'withdraw') {
        return withdrawRows.filter(r => (!f.phone || r.user.phone.includes(f.phone)) && (!f.email || r.user.email.toLowerCase().includes(f.email.toLowerCase()))
          && (!f.username || r.user.account.toLowerCase().includes(f.username.toLowerCase())) && (!f.inviterId || r.user.id.includes(f.inviterId))
          && inRange(r.createdAt, f.createdFrom, f.createdTo));
      }
      return [];
    }

    /* ======================= 通用渲染片段 ======================= */
    const td = (value, mono) => `<td${mono ? ' class="font-mono"' : ''}>${escape(value)}</td>`;
    const contact = u => `<div class="rm-contact"><div class="font-mono">${u.phone}</div><div class="rm-sub">${escape(u.email)}</div><div class="rm-sub font-mono">${escape(u.account)}</div></div>`;
    const emptyRow = cols => `<tr><td colspan="${cols}" class="rm-empty">${icon('search')}暂无符合条件的数据，请调整筛选条件或重置</td></tr>`;
    const statusBadge = text => {
      const map = { '已结算': 'is-success', '冻结中': 'is-warning', '已解冻': 'is-info', '消费': 'is-success', '注册': 'is-info' };
      return `<span class="rm-badge ${map[text] || 'is-muted'}">${escape(text)}</span>`;
    };
    const detailLink = (tab, u) => `<button type="button" class="rm-detail-link" data-goto="${tab}" data-user="${u.id}" aria-label="查看用户 ${u.id} 的明细">明细</button>`;
    const amountCell = value => `<td class="rm-amount"><span class="font-mono">${money(value)}</span></td>`;
    const amountWithLink = (value, tab, u) => `<td class="rm-amount"><span class="font-mono">${money(value)}</span>${detailLink(tab, u)}</td>`;
    const countWithLink = (value, tab, u) => `<td class="rm-amount"><span class="font-mono">${value}</span>${detailLink(tab, u)}</td>`;

    function sortableTh(field, label) {
      const active = sort.field === field;
      const dir = active ? sort.dir : '';
      const aria = active ? (dir === 'asc' ? 'ascending' : 'descending') : 'none';
      return `<th scope="col" aria-sort="${aria}"><button type="button" class="rm-sort${active ? ' is-active' : ''}" data-sort="${field}" aria-label="按${label}排序"><span>${label}</span><span class="rm-caret ${dir}"><i class="up"></i><i class="down"></i></span></button></th>`;
    }
    /* 不可排序列：无升降序图标、无排序按钮（用户ID / 手机号邮箱账户） */
    function plainTh(label) {
      return `<th scope="col">${label}</th>`;
    }

    /* ======================= 渲染：列表 ======================= */
    function sortUsers(list) {
      const dir = sort.dir === 'asc' ? 1 : -1;
      return [...list].sort((a, b) => {
        const va = a[sort.field], vb = b[sort.field];
        if (typeof va === 'string') return va.localeCompare(vb) * dir;
        return (va - vb) * dir;
      });
    }
    function buildHead() {
      if (activeTab === 'summary') {
        return `<tr>${plainTh('用户ID')}${plainTh('手机号/邮箱/账户')}${sortableTh('totalCommission', '累计佣金')}${sortableTh('frozenCommission', '冻结佣金')}${sortableTh('withdrawable', '可提现金额')}${sortableTh('totalWithdrawn', '累计提现')}${sortableTh('inviteCount', '邀请用户数')}${sortableTh('ratio', '返佣比例')}</tr>`;
      }
      const heads = {
        rebate: ['订单号', '订单类型', '创建时间', '被邀请者', '订单支付金额', '返佣比例', '返佣金额', '奖励状态', '返佣时间', '邀请者', '邀请者当前可提现余额'],
        freeze: ['订单号', '订单类型', '创建时间', '被邀请者', '订单支付金额', '返佣比例', '返佣金额', '冻结佣金', '佣金状态', '交易完成时间', '预计解冻时间'],
        invite: ['序号', '邀请者', '被邀请者', '邀请时间', '邀请状态', '邀请者累计付费金额', '邀请者累计消费金额', '返佣比例', '累计返佣金额'],
        withdraw: ['邀请用户ID', '手机号/邮箱/账户', '账户余额', '类型', '交易金额', '创建时间']
      }[activeTab];
      return `<tr>${heads.map(h => `<th scope="col">${h}</th>`).join('')}</tr>`;
    }
    function buildBody(list) {
      if (activeTab === 'summary') {
        return list.map(u => `<tr>${td(u.id, true)}<td>${contact(u)}</td>${amountWithLink(u.totalCommission, 'rebate', u)}${amountWithLink(u.frozenCommission, 'freeze', u)}${amountWithLink(u.withdrawable, 'withdraw', u)}${amountWithLink(u.totalWithdrawn, 'withdraw', u)}${countWithLink(u.inviteCount, 'invite', u)}${td(u.ratio + '%', true)}</tr>`).join('');
      }
      if (activeTab === 'rebate') {
        return list.map(r => `<tr>${td(r.orderNo, true)}${td(r.orderType)}${td(r.createdAt, true)}<td>${contact(r.invitee)}</td>${amountCell(r.pay)}${td(r.ratio + '%', true)}${amountCell(r.amount)}<td>${statusBadge(r.status)}</td>${td(r.rebateAt || '- -', true)}<td>${contact(r.inviter)}</td>${amountCell(r.inviter.withdrawable)}</tr>`).join('');
      }
      if (activeTab === 'freeze') {
        return list.map(r => `<tr>${td(r.orderNo, true)}${td(r.orderType)}${td(r.createdAt, true)}<td>${contact(r.invitee)}</td>${amountCell(r.pay)}${td(r.ratio + '%', true)}${amountCell(r.amount)}${amountCell(r.amount)}<td>${statusBadge(r.status)}</td>${td(r.done, true)}${td(r.unfreeze, true)}</tr>`).join('');
      }
      if (activeTab === 'invite') {
        return list.map((r, i) => `<tr>${td(i + 1, true)}<td>${contact(r.inviter)}</td><td>${contact(r.invitee)}</td>${td(r.invitedAt, true)}<td>${statusBadge(r.status)}</td>${amountCell(r.paidTotal)}${amountCell(r.consumeTotal)}${td(r.ratio + '%', true)}${amountCell(r.commission)}</tr>`).join('');
      }
      if (activeTab === 'withdraw') {
        return list.map(r => `<tr>${td(r.user.id, true)}<td>${contact(r.user)}</td>${amountCell(r.user.balance)}${td(r.type)}<td class="rm-amount font-mono ${r.amount < 0 ? 'rm-neg' : 'rm-pos'}">${r.amount < 0 ? '-' : '+'}${money(Math.abs(r.amount))}</td>${td(r.createdAt, true)}</tr>`).join('');
      }
      return '';
    }
    // 当前 Tab 的完整结果集（返佣汇总按表头排序，其余保持业务顺序）
    function currentList() {
      const list = filteredRows();
      return activeTab === 'summary' ? sortUsers(list) : list;
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
      const meta = TAB_META[activeTab];
      const list = currentList();
      const size = pageSize[activeTab];
      const pages = Math.max(1, Math.ceil(list.length / size));
      cursor[activeTab] = Math.min(Math.max(1, cursor[activeTab]), pages);
      const start = (cursor[activeTab] - 1) * size;
      const pageRows = list.slice(start, start + size);
      $('panel').innerHTML = `<div class="rm-list-head"><h2>${meta.title}</h2><span id="rm-count" class="font-mono">共 ${list.length} 条</span></div><div class="rm-scroll"><table class="data-table" style="min-width:${meta.minWidth}px"><thead>${buildHead()}</thead><tbody>${pageRows.length ? buildBody(pageRows) : emptyRow(meta.cols)}</tbody></table></div><div class="pagination" id="rm-pagination">${pagination(list.length, cursor[activeTab], size)}</div>`;
      icons();
    }

    /* ======================= 渲染：返佣设置 ======================= */
    function renderSettings() {
      const row = (item, kind, unit) => `<tr><td>${escape(item.name)}</td><td class="font-mono">${kind === 'ratio' ? item.value + '%' : money(item.value)}</td><td><button type="button" class="rm-link" data-edit-kind="${kind}" data-edit-id="${item.key}">编辑</button></td></tr>`;
      $('panel').innerHTML = `<div class="rm-settings">
        <section class="rm-setting-block"><h2 class="rm-setting-title">返佣比例设置</h2><div class="rm-scroll"><table class="data-table" style="min-width:880px"><thead><tr><th scope="col">返佣机制</th><th scope="col">返佣比例</th><th scope="col">操作</th></tr></thead><tbody>${settings.ratio.map(i => row(i, 'ratio')).join('')}</tbody></table></div></section>
        <section class="rm-setting-block"><h2 class="rm-setting-title">提现设置</h2><div class="rm-scroll"><table class="data-table" style="min-width:880px"><thead><tr><th scope="col">提现机制</th><th scope="col">金额</th><th scope="col">操作</th></tr></thead><tbody>${settings.withdraw.map(i => row(i, 'withdraw')).join('')}</tbody></table></div></section>
      </div>`;
      icons();
    }
    function renderPanel() {
      if (activeTab === 'settings') renderSettings();
      else renderList();
      saveState();
    }

    /* ======================= 弹窗与浮层 ======================= */
    function toast(message) {
      const box = document.getElementById('appToastContainer');
      if (!box) return;
      const el = document.createElement('div');
      el.className = 'app-toast';
      el.textContent = message;
      box.append(el);
      setTimeout(() => el.remove(), 2600);
    }
    function showLayer(content) {
      closeCalendar();
      scrollHost = root.closest('main') || document.body;
      oldOverflow = scrollHost.style.overflow;
      scrollHost.style.overflow = 'hidden';
      $('layer').innerHTML = `<div class="rm-mask">${content}</div>`;
      icons();
      $('layer').querySelector('[data-close]')?.focus();
    }
    function closeLayer() {
      closeCalendar();
      $('layer').innerHTML = '';
      editing = null;
      if (scrollHost) scrollHost.style.overflow = oldOverflow;
      trigger?.focus();
    }
    function openEdit(kind, id) {
      const source = kind === 'ratio' ? settings.ratio : settings.withdraw;
      const item = source.find(x => x.key === id);
      if (!item) return;
      editing = { kind, id };
      const label = kind === 'ratio' ? '返佣比例' : '金额';
      const isRatio = kind === 'ratio';
      showLayer(`<section class="rm-modal" role="dialog" aria-modal="true" aria-labelledby="rm-modal-title"><header class="rm-modal-head"><h2 id="rm-modal-title">编辑${isRatio ? '返佣比例' : '提现设置'}</h2><button type="button" class="rm-close" data-close aria-label="关闭编辑弹窗">${icon('x')}</button></header><div class="rm-modal-body"><div class="rm-field"><label for="rm-edit-value">${item.name}：</label><div class="rm-input-wrap${isRatio ? '' : ' has-prefix'}"><span class="${isRatio ? 'rm-suffix' : 'rm-prefix'}" aria-hidden="true">${isRatio ? '%' : '￥'}</span><input id="rm-edit-value" class="control" type="number" min="0" ${isRatio ? 'max="100"' : ''} step="1" value="${item.value}" aria-describedby="rm-edit-error"></div></div><p class="rm-error" id="rm-edit-error" role="alert"></p><p class="rm-hint">${isRatio ? '返佣比例取值 0 ～ 100，保存后对后续新订单生效。' : '提现门槛以 ￥ 为单位；调整后立即对新提交的提现申请生效。'}</p></div><footer class="rm-modal-foot"><button type="button" class="btn btn-default" data-close>取消</button><button type="button" class="btn btn-primary" data-save>确定</button></footer></section>`);
      $('edit-value')?.focus();
    }
    function saveEdit() {
      if (!editing) return;
      const input = $('edit-value');
      const error = $('edit-error');
      const raw = String(input.value).trim();
      const value = Number(raw);
      const kind = editing.kind;
      const id = editing.id;
      error.textContent = '';
      if (!raw || Number.isNaN(value)) { error.textContent = '请输入有效的数值'; input.focus(); return; }
      if (kind === 'ratio' && (value < 0 || value > 100)) { error.textContent = '返佣比例需在 0 ～ 100 之间'; input.focus(); return; }
      if (kind === 'withdraw' && value <= 0) { error.textContent = '金额必须大于 0'; input.focus(); return; }
      const source = kind === 'ratio' ? settings.ratio : settings.withdraw;
      const item = source.find(x => x.key === id);
      if (!item) return;
      // 提现设置需保持「最低提现金额 < 最高提现金额」
      if (kind === 'withdraw') {
        const min = settings.withdraw.find(x => x.key === 'min');
        const max = settings.withdraw.find(x => x.key === 'max');
        const nextMin = id === 'min' ? value : min.value;
        const nextMax = id === 'max' ? value : max.value;
        if (nextMin >= nextMax) { error.textContent = '最低提现金额必须小于最高提现金额'; input.focus(); return; }
      }
      const name = item.name;
      item.value = value;
      closeLayer();
      renderPanel();
      toast(`${name}已更新为 ${kind === 'ratio' ? value + '%' : money(value)}`);
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
      $('calendar').innerHTML = `<div class="rm-months">${[0, 1].map(offset => {
        const month = new Date(c.month.getFullYear(), c.month.getMonth() + offset, 1);
        const start = new Date(month);
        start.setDate(1 - ((month.getDay() + 6) % 7));
        return `<section><div class="rm-month-head"><button type="button" data-month="-1" aria-label="上个月">${icon('chevron-left')}</button><span class="font-mono">${month.getFullYear()}年 ${month.getMonth() + 1}月</span><button type="button" data-month="1" aria-label="下个月">${icon('chevron-right')}</button></div><div class="rm-days">${['一', '二', '三', '四', '五', '六', '日'].map(x => `<span>${x}</span>`).join('')}${Array.from({ length: 42 }, (_, i) => {
          const d = new Date(start);
          d.setDate(d.getDate() + i);
          const v = isoOf(d);
          return `<button type="button" class="rm-day ${d.getMonth() !== month.getMonth() ? 'other' : ''} ${c.from && c.to && v >= c.from && v <= c.to ? 'range' : ''} ${v === c.from || v === c.to ? 'selected' : ''}" data-day="${v}" aria-label="${v}">${d.getDate()}</button>`;
        }).join('')}</div></section>`;
      }).join('')}</div><div class="rm-calendar-foot"><span>${c.to ? `${c.from} ～ ${c.to}` : c.from ? '请选择结束时间' : '请选择开始时间'}</span><div><button type="button" class="btn btn-default" data-calendar-clear>清空</button><button type="button" class="btn btn-primary" data-calendar-confirm ${c.from && !c.to ? 'disabled' : ''}>确定</button></div></div>`;
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
      try {
        sessionStorage.setItem(STORE_KEY, JSON.stringify({ activeTab, sort, cursor, pageSize, draft, applied }));
      } catch (_) {}
    }
    function restoreState() {
      try {
        const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) || 'null');
        if (!saved) return;
        if (TABS.some(t => t.key === saved.activeTab)) activeTab = saved.activeTab;
        if (saved.sort) sort = SORTABLE_FIELDS.includes(saved.sort.field) ? saved.sort : { field: 'totalCommission', dir: 'desc' };
        if (saved.cursor) cursor = { ...cursor, ...saved.cursor };
        if (saved.pageSize) pageSize = { ...pageSize, ...saved.pageSize };
        if (saved.draft) draft = saved.draft;
        if (saved.applied) applied = saved.applied;
      } catch (_) {}
    }

    /* ======================= 交互：切换 Tab ======================= */
    function switchTab(key) {
      if (!TABS.some(t => t.key === key) || key === activeTab) return;
      // 保存当前 Tab 的筛选草稿，保证切回时条件仍在
      if (!$('form').hidden) draft[activeTab] = readForm($('form'));
      activeTab = key;
      renderTabs();
      renderFilter();
      renderPanel();
    }
    function gotoDetail(tab, userId) {
      const u = users.find(x => x.id === userId);
      if (!u) return;
      if (!$('form').hidden) draft[activeTab] = readForm($('form'));
      activeTab = tab;
      // 以该用户为条件预置筛选：提现明细按邀请用户ID，其余按邀请者
      applied[tab] = tab === 'withdraw' ? { inviterId: u.id } : { inviter: u.phone };
      draft[tab] = {};
      cursor[tab] = 1;
      renderTabs();
      renderFilter();
      renderPanel();
      toast(`已跳转至「${TABS.find(t => t.key === tab).label}」，并按用户 ${u.id} 过滤`);
    }

    /* ======================= 事件绑定 ======================= */
    root.addEventListener('click', e => {
      if (e.target.classList.contains('rm-mask')) { closeLayer(); return; }
      const button = e.target.closest('button');
      if (!button) return;

      if (button.dataset.tab !== undefined) { switchTab(button.dataset.tab); return; }
      if (button.dataset.goto) { gotoDetail(button.dataset.goto, button.dataset.user); return; }
      if (button.dataset.clear) { const f = $('form'); f.elements[button.dataset.clear].value = ''; syncClearButtons(); draft[activeTab] = readForm(f); f.elements[button.dataset.clear].focus(); return; }
      if (button.hasAttribute('data-reset')) { const f = $('form'); f.reset(); applied[activeTab] = {}; draft[activeTab] = {}; cursor[activeTab] = 1; syncDateButtons(); syncClearButtons(); renderPanel(); return; }
      if (button.dataset.sort) { const f = button.dataset.sort; if (sort.field === f) sort.dir = sort.dir === 'asc' ? 'desc' : 'asc'; else { sort.field = f; sort.dir = 'desc'; } cursor.summary = 1; renderPanel(); return; }
      if (button.dataset.page) { const n = Number(button.dataset.page); const pages = Math.max(1, Math.ceil(currentList().length / pageSize[activeTab])); if (n >= 1 && n <= pages) { cursor[activeTab] = n; renderPanel(); } return; }
      if (button.dataset.editKind) { trigger = button; openEdit(button.dataset.editKind, button.dataset.editId); return; }
      if (button.hasAttribute('data-save')) { saveEdit(); return; }
      if (button.hasAttribute('data-close')) { closeLayer(); return; }
      if (button.dataset.date) {
        if (calendar?.button === button) { closeCalendar(true); return; }
        closeCalendar();
        const f = $('form'), name = button.dataset.date;
        calendar = { button, name, from: f.elements[name + 'From'].value, to: f.elements[name + 'To'].value, month: new Date((f.elements[name + 'From'].value || '2026-09-01').slice(0, 7) + '-01T12:00:00') };
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
        syncDateButtons();
        draft[activeTab] = readForm(f);
        saveState();
        closeCalendar(true);
      }
    });

    root.addEventListener('submit', e => {
      e.preventDefault();
      closeCalendar();
      if (e.target !== $('form')) return;
      applied[activeTab] = readForm($('form'));
      draft[activeTab] = {};
      cursor[activeTab] = 1;
      renderPanel();
    });

    root.addEventListener('input', e => {
      if (!$('form') || !$('form').contains(e.target)) return;
      syncClearButtons();
      draft[activeTab] = readForm($('form'));
    });

    root.addEventListener('change', e => {
      if (e.target.matches('select[data-size]')) {
        pageSize[activeTab] = Number(e.target.value);
        cursor[activeTab] = 1;
        renderPanel();
      }
    });

    root.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (calendar) { e.preventDefault(); closeCalendar(true); return; }
        if ($('layer').innerHTML) { e.preventDefault(); closeLayer(); }
        return;
      }
      if (e.key === 'Enter' && e.target.hasAttribute('data-jump')) {
        e.preventDefault();
        const pages = Math.max(1, Math.ceil(currentList().length / pageSize[activeTab]));
        const value = Number(e.target.value);
        if (!Number.isInteger(value) || value < 1 || value > pages) {
          toast(`请输入 1 至 ${pages} 之间的有效页码`);
          e.target.value = '1';
          return;
        }
        cursor[activeTab] = value;
        renderPanel();
        root.querySelector('[data-jump]')?.focus();
        return;
      }
      // Tab 导航：左右方向键在六个一级 Tab 间移动焦点
      const tabButton = e.target.closest?.('.rm-primary-tab');
      if (tabButton && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        e.preventDefault();
        const index = TABS.findIndex(t => t.key === tabButton.dataset.tab);
        const next = (index + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length;
        switchTab(TABS[next].key);
        root.querySelector(`.rm-primary-tab[data-tab="${TABS[next].key}"]`)?.focus();
        return;
      }
      // 弹窗与日期浮层内的焦点循环
      if (e.key === 'Tab') {
        const panel = calendar ? $('calendar') : $('layer').querySelector('[role=dialog]');
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
      if (!root.isConnected) { controller.abort(); observer.disconnect(); if (scrollHost) scrollHost.style.overflow = oldOverflow; }
    });
    observer.observe(root.parentNode, { childList: true });

    /* ======================= 启动 ======================= */
    restoreState();
    renderTabs();
    renderFilter();
    renderPanel();
  }
};
