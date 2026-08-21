/**
 * @deprecated 后台公共导航已由系统框架.html + 系统框架.js 统一维护。
 * 本文件仅保留给历史快照参考，业务 HTML 不应再引用。
 */
(function () {
  const sidebarStyle = document.createElement('style');
  sidebarStyle.textContent = `
    .sidebar{width:220px;transition:width .22s ease;background:#fff!important;border:0!important;box-shadow:none!important}
    .sidebar.compact{width:68px}
    .sidebar .menu-link,.sidebar .bottom-link{min-height:38px;border-radius:4px;color:#3A3F4A;transition:background .15s,color .15s;font-size:13px;letter-spacing:0}
    .sidebar .menu-label,.sidebar .bottom-label{font-size:13px;letter-spacing:0}
    .sidebar .menu-link:hover,.sidebar .bottom-link:hover{background:#F3F4F6}
    .sidebar .menu-link.active-leaf{color:#0066FF;background:#E6F0FF;font-weight:600}
    .sidebar .menu-link.active-group{color:#0066FF;background:#F3F4F6;font-weight:600}
    .sidebar .menu-link.is-placeholder{cursor:pointer}
    .sidebar .section-label{color:#9DA2AC;font-size:11px;line-height:28px;padding:8px 8px 0;letter-spacing:.02em}
    .sidebar .submenu .menu-link{min-height:34px;font-size:13px;padding-left:36px}
    .sidebar .phase-badge{margin-left:auto;padding:1px 5px;border-radius:4px;color:#6E7685;background:#F0F1F3;font:500 10px/16px 'JetBrains Mono',monospace}
    .sidebar .menu-icon{width:18px;height:18px;flex:0 0 18px}
    .sidebar .submenu{overflow:hidden;max-height:360px;opacity:1;transition:max-height .22s ease,opacity .16s ease,margin-top .22s ease}
    .sidebar .submenu.is-collapsed{max-height:0!important;opacity:0;margin-top:0!important;pointer-events:none}
    .sidebar [data-group-toggle][aria-expanded="false"] .group-chevron{transform:rotate(-90deg)}
    .sidebar .group-chevron{transition:transform .22s ease}
    .sidebar[data-shared-sidebar="true"]:not(.compact) .brand-link{display:flex!important}
    .sidebar[data-shared-sidebar="true"]:not(.compact) .brand-copy,
    .sidebar[data-shared-sidebar="true"]:not(.compact) .menu-label,
    .sidebar[data-shared-sidebar="true"]:not(.compact) .group-chevron,
    .sidebar[data-shared-sidebar="true"]:not(.compact) .section-label,
    .sidebar[data-shared-sidebar="true"]:not(.compact) .bottom-label{display:block!important}
    .sidebar[data-shared-sidebar="true"]:not(.compact) .submenu{display:block!important}
    .sidebar.compact .brand-link{display:none!important}
    .sidebar.compact .brand-name,
    .sidebar.compact .brand-copy,
    .sidebar.compact .menu-text,
    .sidebar.compact .menu-label,
    .sidebar.compact .chev,
    .sidebar.compact .group-chevron,
    .sidebar.compact .create-label,
    .sidebar.compact .section-label,
    .sidebar.compact .phase-badge,
    .sidebar.compact .bottom-label{display:none!important}
    .sidebar.compact .submenu{display:none!important}
    .sidebar.compact .menu-link,.sidebar.compact .bottom-link{justify-content:center;padding-left:0!important;padding-right:0!important}
    .sidebar.compact .nav-item,
    .sidebar.compact .menu-link,
    .sidebar.compact .bottom-link,
    .sidebar.compact .create-button,
    .sidebar.compact .brand-row,
    .sidebar.compact .brand{justify-content:center;padding-left:0!important;padding-right:0!important}
    .sidebar.compact #collapse,
    .sidebar.compact #collapseBtn{margin-left:0!important}
    .app-topbar{height:56px!important;min-height:56px!important;flex-shrink:0!important;background:#fff!important;border:0!important;box-shadow:0 4px 12px rgba(26,29,36,.10)!important;clip-path:none!important;z-index:10!important;display:flex!important;align-items:center!important;justify-content:space-between!important;padding-left:16px!important;padding-right:16px!important;font-size:13px!important;letter-spacing:0!important}
    @media(min-width:768px){.app-topbar{padding-left:24px!important;padding-right:24px!important}}
    @media(max-width:767px){.sidebar{position:fixed!important;z-index:50!important;height:100vh!important}.sidebar.compact{width:0!important;overflow:hidden!important}}
    @media(prefers-reduced-motion:reduce){
      .sidebar,.sidebar .submenu,.sidebar .group-chevron{transition:none!important}
    }
  `;
  document.head.appendChild(sidebarStyle);

  const navSections = [
    {
      id: 'section-user',
      label: '用户管理',
      items: [
        { id: 'user-list', label: '用户列表', icon: 'users', description: '查看和管理平台用户', state: 'planning' },
        { id: 'user-statistics', label: '用户统计', icon: 'chart-no-axes-column', href: '用户统计.html', description: '查看用户规模、活跃与结构统计', state: 'ready' },
        { id: 'team-list', label: '团队列表', icon: 'users-round', href: '团队列表.html', description: '查看和管理团队主体', state: 'ready' },
        { id: 'enterprise-list', label: '企业列表', icon: 'building-2', href: '企业列表.html', description: '查看和管理企业认证主体', state: 'ready' },
        { id: 'member-list', label: '成员列表', icon: 'contact-round', href: '成员列表.html', description: '查看团队和企业成员', state: 'ready' }
      ]
    },
    {
      id: 'section-order',
      label: '订单管理',
      items: [
        { id: 'order-list', label: '订单列表', icon: 'receipt-text', href: '订单列表.html', description: '查看全部业务订单与支付状态', state: 'ready' },
        { id: 'package-order', label: '套餐订单', icon: 'package-check', href: '套餐订单.html', description: '查看套餐购买、续费与退款订单', state: 'ready' }
      ]
    },
    {
      id: 'section-resource',
      label: '资源管理',
      items: [
        { id: 'environment-management', label: '环境管理', icon: 'monitor-cog', href: '环境管理.html', description: '管理浏览器环境和运行状态', state: 'ready' },
        { id: 'proxy-list', label: '代理列表', icon: 'network', description: '查看代理资源、分配和可用状态', state: 'planning' }
      ]
    },
    {
      id: 'section-tracking',
      label: '数据埋点',
      items: [
        { id: 'tracking-overview', label: '数据概览', icon: 'layout-dashboard', href: '数据概览.html', description: '统一查看核心指标、异常、待办和业务链路健康度', state: 'ready' },
        {
          id: 'tracking-governance',
          label: '口径治理',
          icon: 'book-check',
          group: true,
          description: '统一治理事件与指标口径',
          children: [
            { id: 'tracking-events', label: '事件管理', href: '事件管理.html', description: '管理事件、属性、版本和生命周期', state: 'ready' },
            { id: 'tracking-metrics', label: '指标管理', href: '指标管理.html', description: '管理指标口径、计算规则、维度和版本', state: 'ready' }
          ]
        },
        { id: 'tracking-debug', label: '联调验证', icon: 'radio-tower', href: '联调验证.html', description: '实时监听测试事件并校验参数和口径', state: 'ready' },
        { id: 'tracking-quality', label: '质量监控', icon: 'shield-alert', href: '质量监控.html', description: '监控上报完整性、准确性、及时性和稳定性', state: 'ready' },
        { id: 'tracking-detail', label: '明细排查', icon: 'list-filter', href: '明细排查.html', description: '按用户、设备、事件和时间检索脱敏明细', state: 'ready' },
        { id: 'tracking-analysis', label: '数据分析', icon: 'chart-column-increasing', href: '数据分析.html', description: '分析漏斗、留存、路径、分群与核心场景', state: 'ready' },
        { id: 'tracking-dashboards', label: '资产沉淀', icon: 'panels-top-left', href: '资产沉淀.html', description: '沉淀可复用的指标、分析模型和决策看板', state: 'ready' },
        { id: 'tracking-insights', label: '决策复盘', icon: 'lightbulb', href: '决策复盘.html', description: '记录洞察、行动、负责人和迭代效果', state: 'ready' }
      ]
    }
  ];

  function findRoute(routeId) {
    for (const section of navSections) {
      for (const item of section.items) {
        if (item.id === routeId) return item;
        const child = item.children?.find(entry => entry.id === routeId);
        if (child) return child;
      }
    }
    return null;
  }

  function frameworkItems() {
    return navSections.flatMap(section => [
      { type: 'section', id: section.id, label: section.label },
      ...section.items.map(item => ({
        ...item,
        expanded: item.group ? true : undefined,
        targetFile: item.href,
        children: item.children?.map(child => ({ ...child, pageTitle: child.label, targetFile: child.href }))
      }))
    ]);
  }

  window.YundengAdminShell = { navSections, findRoute, frameworkItems };

  const trackingExpandedKey = 'yundeng-sidebar-data-tracking-expanded';
  const implementedPages = { 'index.html': 'home' };
  navSections.forEach(section => section.items.forEach(item => {
    if (item.href) implementedPages[item.href] = item.id;
    item.children?.forEach(child => { if (child.href) implementedPages[child.href] = child.id; });
  }));
  const currentFile = decodeURIComponent(location.pathname.split('/').pop() || '');
  const currentRoute = implementedPages[currentFile] || '';
  const sidebar = document.getElementById('sidebar') || document.querySelector('aside.sidebar');

  if (!sidebar) return;

  const shellContent = Array.from(sidebar.parentElement?.children || []).find(element =>
    element !== sidebar && Array.from(element.children || []).some(child => child.tagName === 'HEADER')
  );
  const topbar = shellContent && Array.from(shellContent.children).find(element => element.tagName === 'HEADER');
  if (topbar) topbar.classList.add('app-topbar');

  if (topbar && !document.getElementById('mobileMenu') && !document.getElementById('mobileMenuBtn')) {
    const mobileToggle = document.createElement('button');
    mobileToggle.id = 'mobileMenu';
    mobileToggle.type = 'button';
    mobileToggle.className = 'md:hidden w-8 h-8 rounded flex items-center justify-center text-ink-sub hover:bg-hover hover:bg-bg-hover shrink-0';
    mobileToggle.setAttribute('aria-label', '展开导航');
    mobileToggle.innerHTML = '<i data-lucide="menu" class="w-5 h-5"></i>';
    const firstChild = topbar.firstElementChild;
    if (firstChild?.tagName === 'DIV') {
      firstChild.prepend(mobileToggle);
      firstChild.classList.add('flex', 'items-center', 'gap-3', 'min-w-0');
    } else {
      const leftGroup = document.createElement('div');
      leftGroup.className = 'flex items-center gap-3 min-w-0';
      topbar.prepend(leftGroup);
      leftGroup.append(mobileToggle);
      if (firstChild) leftGroup.append(firstChild);
    }
  }

  if (document.body.dataset.sidebarOwner === 'framework') return;

  let trackingExpanded = true;
  try {
    const saved = localStorage.getItem(trackingExpandedKey);
    trackingExpanded = saved === null ? true : saved === 'true';
  } catch (_) {}
  if (currentRoute === 'tracking-events' || currentRoute === 'tracking-metrics') {
    trackingExpanded = true;
  }

  function phaseBadge(item) {
    return item.phase ? `<span class="phase-badge">${item.phase}</span>` : '';
  }

  function isTrackingChildActive(item) {
    return item.id === currentRoute;
  }

  function renderMenuLink(item, child) {
    const active = item.id === currentRoute;
    const href = item.href || `系统框架.html#${item.id}`;
    const extraClass = `${active ? 'active-leaf' : ''} ${item.placeholder ? 'is-placeholder' : ''}`.trim();
    const icon = child ? '' : `<i data-lucide="${item.icon}" class="menu-icon"></i>`;
    const currentAttr = active ? 'aria-current="page"' : '';
    return `
      <a
        href="${href}"
        class="menu-link ${extraClass} w-full px-2 flex items-center gap-3 text-left mb-1"
        data-route="${item.id}"
        ${item.placeholder ? 'data-placeholder="true"' : ''}
        ${currentAttr}
        title="${item.label}"
      >
        ${icon}
        <span class="menu-label flex-1">${item.label}</span>
        ${phaseBadge(item)}
      </a>
    `;
  }

  function renderGroup(item) {
    const active = item.children.some(isTrackingChildActive);
    return `
      <div class="mb-1" data-sidebar-group="${item.id}">
        <button
          type="button"
          data-group-toggle="${item.id}"
          class="menu-link ${active ? 'active-group' : ''} w-full px-2 flex items-center gap-3 text-left"
          aria-expanded="${trackingExpanded}"
          aria-controls="submenu-${item.id}"
          title="${item.label}"
        >
          <i data-lucide="${item.icon}" class="menu-icon"></i>
          <span class="menu-label flex-1">${item.label}</span>
          <i data-lucide="chevron-down" class="group-chevron w-4 h-4"></i>
        </button>
        <div id="submenu-${item.id}" class="submenu ${trackingExpanded ? '' : 'is-collapsed'}">
          ${item.children.map(child => renderMenuLink(child, true)).join('')}
        </div>
      </div>
    `;
  }

  function renderNav() {
    return sidebar.querySelector('#sidebarNav') || sidebar.querySelector('nav');
  }

  sidebar.id = 'sidebar';
  sidebar.dataset.sharedSidebar = 'true';
  sidebar.classList.add('sticky', 'top-0', 'h-screen', 'shrink-0', 'overflow-hidden');
  if (!sidebar.classList.contains('flex')) {
    sidebar.classList.add('flex', 'flex-col');
  }
  if (!sidebar.classList.contains('bg-white') && !sidebar.classList.contains('bg-card') && !sidebar.classList.contains('bg-bg-card')) {
    sidebar.classList.add('bg-white');
  }

  sidebar.innerHTML = `
    <div class="brand brand-row h-14 px-5 flex items-center gap-2 shrink-0">
      <a href="index.html" class="brand-link flex items-center gap-2 min-w-0" aria-label="云登后台首页" ${currentRoute === 'home' ? 'aria-current="page"' : ''}>
        <span class="w-7 h-7 rounded-md bg-primary text-white flex items-center justify-center font-bold text-[15px]">云</span>
        <span class="brand-copy text-[16px] font-semibold text-ink-title tracking-tight">云登后台</span>
      </a>
      <button
        id="collapse"
        class="ml-auto w-8 h-8 shrink-0 rounded flex items-center justify-center text-ink-sub hover:bg-bg-hover hover:bg-hover"
        title="收起侧栏"
        aria-label="收起侧栏"
      >
        <i data-lucide="panel-left-close" class="w-[18px] h-[18px]"></i>
      </button>
    </div>
    <nav id="sidebarNav" class="px-3 flex-1 overflow-y-auto pb-3" aria-label="主导航">
      ${navSections.map(section => `
        <div class="section-label" aria-hidden="true">${section.label}</div>
        ${section.items.map(item => item.group ? renderGroup(item) : renderMenuLink(item, false)).join('')}
      `).join('')}
    </nav>
    <div class="p-3 space-y-1">
      <div class="border-t border-line border-line-light mb-3" aria-hidden="true"></div>
      <a href="系统框架.html" class="bottom-link w-full h-8 px-2 flex items-center gap-3 rounded text-ink-sub">
        <i data-lucide="settings-2" class="menu-icon"></i>
        <span class="bottom-label">系统设置</span>
      </a>
    </div>
  `;

  const collapseBtn = document.getElementById('collapse') || document.getElementById('collapseBtn');
  const nav = renderNav();
  const groupButton = nav?.querySelector('[data-group-toggle="tracking-governance"]');
  const submenu = nav?.querySelector('#submenu-tracking-governance');

  function syncGroup(expanded, persist) {
    trackingExpanded = expanded;
    if (groupButton) {
      groupButton.setAttribute('aria-expanded', String(expanded));
      groupButton.setAttribute('aria-label', `${expanded ? '收起' : '展开'}口径治理子菜单`);
    }
    if (submenu) {
      submenu.classList.toggle('is-collapsed', !expanded);
      submenu.setAttribute('aria-hidden', String(!expanded));
    }
    if (persist) {
      try { localStorage.setItem(trackingExpandedKey, String(expanded)); } catch (_) {}
    }
    try { if (typeof window.renderAnno === 'function') window.renderAnno(); } catch (_) {}
  }

  if (groupButton && submenu) {
    groupButton.addEventListener('click', () => {
      syncGroup(groupButton.getAttribute('aria-expanded') !== 'true', true);
    });
    syncGroup(trackingExpanded, false);
  }

  if (collapseBtn && sidebar) {
    collapseBtn.onclick = null;
    let mobileOverlay = document.getElementById('mobileOverlay');
    const setCollapseUI = (compact, persist) => {
      sidebar.classList.toggle('compact', compact);
      const label = compact ? '展开侧栏' : '收起侧栏';
      collapseBtn.title = label;
      collapseBtn.setAttribute('aria-label', label);
      const icon = collapseBtn.querySelector('[data-lucide]') || collapseBtn.querySelector('svg');
      if (icon && icon.setAttribute) {
        icon.setAttribute('data-lucide', compact ? 'panel-left-open' : 'panel-left-close');
      } else {
        collapseBtn.innerHTML = `<i data-lucide="${compact ? 'panel-left-open' : 'panel-left-close'}" class="w-[18px] h-[18px]"></i>`;
      }
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
      if (mobileOverlay && innerWidth < 768) mobileOverlay.classList.toggle('hidden', compact);
      if (persist) {
        try { localStorage.setItem('yundeng-sidebar-compact', String(compact)); } catch (_) {}
      }
      try { if (typeof window.renderAnno === 'function') window.renderAnno(); } catch (_) {}
    };
    collapseBtn.addEventListener('click', () => {
      const next = !sidebar.classList.contains('compact');
      setCollapseUI(next, true);
    });
    let initialCompact = innerWidth < 1024;
    try {
      const savedCompact = localStorage.getItem('yundeng-sidebar-compact');
      if (savedCompact !== null) initialCompact = savedCompact === 'true';
    } catch (_) {}
    setCollapseUI(initialCompact, false);

    const mobileToggle = document.getElementById('mobileMenu') || document.getElementById('mobileMenuBtn');
    if (mobileToggle) {
      const cleanToggle = mobileToggle.cloneNode(true);
      mobileToggle.replaceWith(cleanToggle);
      cleanToggle.addEventListener('click', () => setCollapseUI(!sidebar.classList.contains('compact'), false));
    }
    if (mobileOverlay) {
      const cleanOverlay = mobileOverlay.cloneNode(true);
      mobileOverlay.replaceWith(cleanOverlay);
      mobileOverlay = cleanOverlay;
      cleanOverlay.addEventListener('click', () => setCollapseUI(true, false));
    }
  }

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
})();
