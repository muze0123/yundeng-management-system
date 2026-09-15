(function () {
  'use strict';

  const MODULE_VERSION = '20260822-inline-html';
  const APP_ENTRY = 'index.html';
  const RESOURCE_ROOT = 'Prototype/';
  const MODULE_FILES = {"home": "Prototype/modules/home.js", "user-list": "Prototype/modules/user-list.js", "ops-user-list": "Prototype/modules/ops-user-list.js", "user-statistics": "Prototype/modules/user-statistics.js", "team-list": "Prototype/modules/team-list.js", "enterprise-list": "Prototype/modules/enterprise-list.js", "member-list": "Prototype/modules/member-list.js", "order-list": "Prototype/modules/order-list.js", "package-order": "Prototype/modules/package-order.js", "invoice-management": "Prototype/modules/billing-invoice.js", "environment-management": "Prototype/modules/environment-management.js", "proxy-list": "Prototype/modules/proxy-static.js", "tracking-overview": "Prototype/modules/tracking-overview.js", "tracking-events": "Prototype/modules/tracking-events.js", "tracking-metrics": "Prototype/modules/tracking-metrics.js", "tracking-debug": "Prototype/modules/tracking-debug.js", "tracking-quality": "Prototype/modules/tracking-quality.js", "tracking-detail": "Prototype/modules/tracking-detail.js", "tracking-analysis": "Prototype/modules/tracking-analysis.js", "tracking-dashboards": "Prototype/modules/tracking-dashboards.js", "tracking-insights": "Prototype/modules/tracking-insights.js"};
  const PAGE_NAMES = {"home": "home", "user-list": "user-list", "ops-user-list": "ops-user-list", "user-statistics": "user-statistics", "team-list": "team-list", "enterprise-list": "enterprise-list", "member-list": "member-list", "order-list": "order-list", "package-order": "package-order", "invoice-management": "billing-invoice", "environment-management": "environment-management", "proxy-list": "proxy-static", "tracking-overview": "tracking-overview", "tracking-events": "tracking-events", "tracking-metrics": "tracking-metrics", "tracking-debug": "tracking-debug", "tracking-quality": "tracking-quality", "tracking-detail": "tracking-detail", "tracking-analysis": "tracking-analysis", "tracking-dashboards": "tracking-dashboards", "tracking-insights": "tracking-insights"};
  const PAGE_IDS = Object.fromEntries(Object.entries(PAGE_NAMES).map(([id,name]) => [name,id]));
  const SIDEBAR_STATE_KEY = 'yundeng-app-shell-sidebar-compact';
  const MENU_STATE_KEY = 'yundeng-app-shell-menu-state';
  const MODULE_STATE_PREFIX = 'yundeng-app-shell-module-state:';

  const navigation = [
    {
      id: 'home',
      label: '工作台',
      icon: 'layout-grid',
      module: 'home',
      description: '系统功能入口与运行概览'
    },
    {
      id: 'section-user',
      label: '用户管理',
      icon: 'users',
      children: [
        { id: 'user-list', label: '用户列表', icon: 'users', module: 'user-list', description: '查看和管理平台用户' },
        { id: 'user-statistics', label: '用户统计', icon: 'chart-no-axes-column', module: 'user-statistics', description: '查看用户规模、活跃与结构统计' },
        { id: 'team-list', label: '团队列表', icon: 'users-round', module: 'team-list', description: '查看和管理团队主体' },
        { id: 'enterprise-list', label: '企业列表', icon: 'building-2', module: 'enterprise-list', description: '查看和管理企业认证主体' },
        { id: 'member-list', label: '成员列表', icon: 'contact-round', module: 'member-list', description: '查看团队和企业成员' }
      ]
    },
    {
      id: 'section-order',
      label: '订单管理',
      icon: 'receipt-text',
      children: [
        { id: 'order-list', label: '代理订单', icon: 'receipt-text', module: 'order-list', description: '查看全部业务订单与支付状态' },
        { id: 'package-order', label: '套餐订单', icon: 'package-check', module: 'package-order', description: '查看套餐购买、续费与支付明细' }
      ]
    },
    {
      id: 'section-finance',
      label: '财务管理',
      icon: 'file-check-2',
      children: [
        { id: 'invoice-management', label: '发票管理', icon: 'file-check-2', module: 'invoice-management', description: '审核开票申请并处理票据、红冲与交付' }
      ]
    },
    {
      id: 'section-resource',
      label: '资源管理',
      icon: 'monitor-cog',
      children: [
        { id: 'environment-management', label: '环境管理', icon: 'monitor-cog', module: 'environment-management', description: '管理浏览器环境和运行状态' }
      ]
    },
    {
      id: 'section-operations',
      label: '运营中心',
      icon: 'gauge',
      children: [
        { id: 'ops-user-list', label: '运营用户列表', icon: 'users-round', module: 'ops-user-list', description: '面向运营的全字段用户运营视图与字段解释' }
      ]
    },
    {
      id: 'section-proxy-package',
      label: '代理及套餐管理',
      icon: 'package-check',
      children: [
        { id: 'proxy-list', label: '静态代理', icon: 'network', module: 'proxy-list', description: '查看静态云平台和静态家庭宽带资源' }
      ]
    },
    {
      id: 'section-tracking',
      label: '数据埋点',
      icon: 'chart-no-axes-combined',
      children: [
        { id: 'tracking-overview', label: '数据概览', icon: 'layout-dashboard', module: 'tracking-overview', description: '查看数据链路核心指标与异常' },
        { id: 'tracking-events', label: '事件管理', icon: 'braces', module: 'tracking-events', description: '管理事件、属性、版本和生命周期' },
        { id: 'tracking-metrics', label: '指标管理', icon: 'sigma', module: 'tracking-metrics', description: '管理指标口径、计算规则和版本' },
        { id: 'tracking-debug', label: '联调验证', icon: 'radio-tower', module: 'tracking-debug', description: '实时监听并校验测试事件' },
        { id: 'tracking-quality', label: '质量监控', icon: 'shield-alert', module: 'tracking-quality', description: '监控数据完整性、准确性和稳定性' },
        { id: 'tracking-detail', label: '明细排查', icon: 'list-filter', module: 'tracking-detail', description: '检索脱敏明细并定位数据问题' },
        { id: 'tracking-analysis', label: '数据分析', icon: 'chart-column-increasing', module: 'tracking-analysis', description: '开展漏斗、留存、路径和分群分析' },
        { id: 'tracking-dashboards', label: '资产沉淀', icon: 'panels-top-left', module: 'tracking-dashboards', description: '沉淀可复用看板和分析资产' },
        { id: 'tracking-insights', label: '决策复盘', icon: 'lightbulb', module: 'tracking-insights', description: '记录洞察、行动和迭代效果' }
      ]
    }
  ];

  const legacyRoutes = {
    'index.html': 'home',
    '用户列表.html': 'user-list',
    '运营用户列表.html': 'ops-user-list',
    '静态代理.html': 'proxy-list',
    '代理列表.html': 'proxy-list',
    '系统框架.html': 'home',
    '用户统计.html': 'user-statistics',
    '团队列表.html': 'team-list',
    '企业列表.html': 'enterprise-list',
    '成员列表.html': 'member-list',
    '订单列表.html': 'order-list',
    '套餐订单.html': 'package-order',
    '发票管理.html': 'invoice-management',
    '环境管理.html': 'environment-management',
    '数据概览.html': 'tracking-overview',
    '事件管理.html': 'tracking-events',
    '指标管理.html': 'tracking-metrics',
    '联调验证.html': 'tracking-debug',
    '质量监控.html': 'tracking-quality',
    '明细排查.html': 'tracking-detail',
    '数据分析.html': 'tracking-analysis',
    '资产沉淀.html': 'tracking-dashboards',
    '决策复盘.html': 'tracking-insights'
  };

  const notices = [
    { title: '质量监控待处理', desc: 'browser_start_success 事件成功率低于阈值。', time: '5 分钟前', unread: true },
    { title: '指标口径待确认', desc: '代理购买转化率 V2 草案等待审核。', time: '今天 09:30', unread: true },
    { title: '历史数据补偿完成', desc: '2026-08-10 PC 端缺失事件已完成回补。', time: '昨天 18:20', unread: false }
  ];

  const routes = new Map();
  const routeParents = new Map();
  navigation.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        routes.set(child.id, { ...child, section: item.label });
        routeParents.set(child.id, item.id);
      });
    } else {
      routes.set(item.id, { ...item });
    }
  });

  const $ = (id) => document.getElementById(id);
  const outlet = $('appRouteOutlet');
  const content = $('appContent');
  const sidebar = $('appSidebar');
  const requestedPage = new URLSearchParams(location.search).get('page');
  let currentRoute = resolveRoute(PAGE_IDS[requestedPage] || requestedPage || decodeURIComponent(location.hash.slice(1)) || 'home');
  let menuState = readJson(MENU_STATE_KEY, {});
  let compactSectionId = '';
  let moduleReady = false;
  let restoringModuleState = false;
  let reloadScheduled = false;

  function readJson(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? { ...fallback, ...JSON.parse(value) } : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }

  function resolveRoute(routeId) {
    const route = routes.get(routeId);
    if (!route) return routes.get('home');
    return route;
  }

  function routeHref(routeId, search = '') {
    const params = new URLSearchParams(search);
    params.set('page', PAGE_NAMES[routeId] || 'home');
    if (routeId === 'invoice-management' && !params.has('invoiceTab')) params.set('invoiceTab', 'orders');
    return 'index.html?' + params.toString();
  }

  function icon(name, className = 'app-menu-icon') {
    return `<i data-lucide="${name}" class="${className}"></i>`;
  }

  function renderNavigation() {
    const activeParent = routeParents.get(currentRoute.id);
    $('appPrimaryNav').innerHTML = navigation.map((item) => {
      if (!item.children) {
        const active = item.id === currentRoute.id;
        return '<a class="app-menu-link' + (active ? ' is-active' : '') + '" href="' + routeHref(item.id) + '" data-app-route="' + item.id + '"' + (active ? ' aria-current="page"' : '') + '>' + icon(item.icon) + '<span class="app-menu-label">' + item.label + '</span></a>';
      }
      const active = activeParent === item.id;
      const expanded = !sidebar.classList.contains('is-compact') && menuState.openSectionId === item.id;
      return '<div class="app-menu-group"><button class="app-menu-link app-group-toggle' + (active ? ' is-group-active' : '') + '" type="button" data-app-section="' + item.id + '" aria-expanded="' + expanded + '" aria-controls="app-submenu-' + item.id + '">' + icon(item.icon) + '<span class="app-menu-label">' + item.label + '</span>' + icon('chevron-down', 'app-group-chevron') + '</button><div id="app-submenu-' + item.id + '" class="app-submenu' + (expanded ? '' : ' is-collapsed') + '">' + item.children.map((child) => {
        const childActive = child.id === currentRoute.id;
        return '<a class="app-menu-link' + (childActive ? ' is-active' : '') + '" href="' + routeHref(child.id) + '" data-app-route="' + child.id + '"' + (childActive ? ' aria-current="page"' : '') + '><span class="app-menu-label">' + child.label + '</span></a>';
      }).join('') + '</div></div>';
    }).join('');
    syncSubmenuHeights();
    window.lucide?.createIcons();
    if (!sidebar.classList.contains('is-compact') && menuState.openSectionId) {
      const sectionId = menuState.openSectionId;
      requestAnimationFrame(() => {
        ensureSubmenuVisible(sectionId);
        window.setTimeout(() => ensureSubmenuVisible(sectionId), 220);
      });
    }
  }

  function syncSubmenuHeights() {
    $('appPrimaryNav')?.querySelectorAll('.app-submenu').forEach((submenu) => {
      submenu.style.maxHeight = submenu.classList.contains('is-collapsed') ? '0px' : `${submenu.scrollHeight}px`;
    });
  }

  function ensureSubmenuVisible(sectionId) {
    const nav = $('appPrimaryNav');
    const submenu = $(`app-submenu-${sectionId}`);
    if (!nav || !submenu || submenu.classList.contains('is-collapsed')) return;
    const navRect = nav.getBoundingClientRect();
    const submenuRect = submenu.getBoundingClientRect();
    const padding = 8;
    const delta = submenuRect.bottom > navRect.bottom - padding
      ? submenuRect.bottom - (navRect.bottom - padding)
      : submenuRect.top < navRect.top + padding
        ? submenuRect.top - (navRect.top + padding)
        : 0;
    if (delta) nav.scrollBy({ top: delta, behavior: 'smooth' });
  }

  function renderRouteTitle() {
    document.title = `云登后台 · ${currentRoute.label}`;
  }

  function setSidebarCompact(compact) {
    sidebar.classList.toggle('is-compact', compact);
    $('appCollapseButton').setAttribute('aria-label', compact ? '展开侧栏' : '收起侧栏');
    $('appCollapseButton').setAttribute('title', compact ? '展开侧栏' : '收起侧栏');
    $('appCollapseButton').setAttribute('aria-expanded', String(!compact));
    try { localStorage.setItem(SIDEBAR_STATE_KEY, String(compact)); } catch (_) {}
    window.lucide?.createIcons();
  }

  function readSidebarCompact() {
    if (innerWidth < 768) return false;
    try {
      const saved = localStorage.getItem(SIDEBAR_STATE_KEY);
      return saved === null ? innerWidth < 1100 : saved === 'true';
    } catch (_) {
      return innerWidth < 1100;
    }
  }

  function openMobileSidebar() {
    sidebar.classList.add('is-mobile-open');
    $('appMobileOverlay').hidden = false;
    $('appMobileMenu').setAttribute('aria-expanded', 'true');
  }

  function closeMobileSidebar() {
    sidebar.classList.remove('is-mobile-open');
    $('appMobileOverlay').hidden = true;
    $('appMobileMenu').setAttribute('aria-expanded', 'false');
  }

  function renderCompactFlyout(sectionId, trigger) {
    const section = navigation.find((item) => item.id === sectionId);
    const flyout = $('appCompactFlyout');
    if (!section || !section.children) return;
    const rect = trigger.getBoundingClientRect();
    flyout.innerHTML = section.children.map((child) => '<a class="app-menu-link' + (child.id === currentRoute.id ? ' is-active' : '') + '" href="' + routeHref(child.id) + '" data-app-route="' + child.id + '"><span class="app-menu-label">' + child.label + '</span></a>').join('');
    flyout.style.top = '12px';
    flyout.hidden = false;
    const margin = 12;
    const maxTop = Math.max(margin, innerHeight - flyout.offsetHeight - margin);
    flyout.style.top = `${Math.min(Math.max(margin, rect.top), maxTop)}px`;
  }

  function closeCompactFlyout() {
    compactSectionId = '';
    $('appCompactFlyout').hidden = true;
    if (sidebar.classList.contains('is-compact')) {
      document.querySelectorAll('[data-app-section]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
    }
  }

  function renderNotices() {
    $('appNoticeList').innerHTML = notices.map((item) => `<button type="button" class="app-notice-item"><span class="app-notice-item-dot${item.unread ? '' : ' is-read'}"></span><span class="min-w-0"><span class="app-notice-title">${item.title}</span><span class="app-notice-desc block">${item.desc}</span><span class="app-notice-time mono block">${item.time}</span></span></button>`).join('');
  }

  function togglePopover(id) {
    ['appNoticePopover', 'appAccountPopover'].forEach((popoverId) => {
      if (popoverId !== id) $(popoverId).hidden = true;
    });
    $(id).hidden = !$(id).hidden;
  }

  function closePopovers() {
    $('appNoticePopover').hidden = true;
    $('appAccountPopover').hidden = true;
  }

  function toast(message) {
    const element = document.createElement('div');
    element.className = 'app-toast';
    element.textContent = message;
    $('appToastContainer').append(element);
    setTimeout(() => element.remove(), 2600);
  }

  function moduleStateKey(routeId) { return `${MODULE_STATE_PREFIX}${routeId}`; }

  function controlKey(element, index) {
    if (element.id) return `id:${element.id}`;
    if (element.name) return `name:${element.name}:${index}`;
    return `index:${index}`;
  }

  function activeKey(element, index) {
    if (element.id) return `id:${element.id}`;
    for (const key of ['tab', 'view', 'page', 'status', 'mode', 'type']) {
      if (element.dataset[key] !== undefined) return `data-${key}:${element.dataset[key]}`;
    }
    return `text:${(element.textContent || '').trim()}:${index}`;
  }

  function captureModuleState() {
    if (!moduleReady || !currentRoute?.id) return;
    const controls = [...outlet.querySelectorAll('input, select, textarea')]
      .filter((element) => !element.closest('.app-module-compat') && element.type !== 'password' && element.type !== 'file')
      .map((element, index) => ({
        key: controlKey(element, index),
        value: element.type === 'checkbox' || element.type === 'radio' ? element.checked : element.value,
        checked: element.type === 'checkbox' || element.type === 'radio'
      }));
    const active = [...outlet.querySelectorAll('.tab.active, .pg-btn.active, [role="tab"][aria-selected="true"], [data-view].active, [data-page].active')]
      .filter((element) => !element.closest('.app-module-compat'))
      .map((element, index) => activeKey(element, index));
    const scrollables = [...outlet.querySelectorAll('main, [data-module-scroll]')]
      .filter((element) => !element.closest('.app-module-compat'))
      .map((element, index) => ({ key: element.id || `index:${index}`, top: element.scrollTop, left: element.scrollLeft }));
    const state = { controls, active, contentScroll: { top: content.scrollTop, left: content.scrollLeft }, scrollables, savedAt: Date.now() };
    try { sessionStorage.setItem(moduleStateKey(currentRoute.id), JSON.stringify(state)); } catch (_) {}
  }

  function restoreModuleState() {
    let state;
    try { state = JSON.parse(sessionStorage.getItem(moduleStateKey(currentRoute.id)) || 'null'); } catch (_) {}
    if (!state) return;

    const controls = [...outlet.querySelectorAll('input, select, textarea')]
      .filter((element) => !element.closest('.app-module-compat') && element.type !== 'password' && element.type !== 'file');
    const controlMap = new Map(controls.map((element, index) => [controlKey(element, index), element]));
    state.controls?.forEach((entry) => {
      const element = controlMap.get(entry.key);
      if (!element) return;
      if (entry.checked) element.checked = Boolean(entry.value);
      else element.value = entry.value;
    });

    const activeElements = [...outlet.querySelectorAll('.tab, .pg-btn, [role="tab"], [data-view], [data-page]')]
      .filter((element) => !element.closest('.app-module-compat'));
    const activeMap = new Map(activeElements.map((element, index) => [activeKey(element, index), element]));
    state.active?.forEach((key) => {
      const element = activeMap.get(key);
      if (element && !element.classList.contains('active')) element.click();
    });

    requestAnimationFrame(() => {
      content.scrollTo(state.contentScroll || { top: 0, left: 0 });
      const scrollables = [...outlet.querySelectorAll('main, [data-module-scroll]')]
        .filter((element) => !element.closest('.app-module-compat'));
      state.scrollables?.forEach((entry) => {
        const element = entry.key.startsWith('index:') ? scrollables[Number(entry.key.slice(6))] : document.getElementById(entry.key);
        element?.scrollTo({ top: entry.top, left: entry.left });
      });
    });
  }

  function loadScript(src, marker = 'resource') {
    const absolute = new URL(src, document.baseURI).href;
    const existing = [...document.scripts].find((script) => script.src === absolute);
    if (existing) {
      if (existing.dataset.loaded === 'true' || !existing.dataset.appDynamic) return Promise.resolve();
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      });
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.dataset.appDynamic = marker;
      script.addEventListener('load', () => { script.dataset.loaded = 'true'; resolve(); }, { once: true });
      script.addEventListener('error', () => reject(new Error(`无法加载脚本：${src}`)), { once: true });
      document.head.append(script);
    });
  }

  function moduleResource(src) {
    return /^(?:[a-z]+:|\/|data:)/i.test(src) ? src : `${RESOURCE_ROOT}${src}`;
  }

  function loadStyle(href) {
    const resourceHref = /^(?:[a-z]+:|\/|data:)/i.test(href) ? href : `${RESOURCE_ROOT}${href}`;
    const absolute = new URL(resourceHref, document.baseURI).href;
    if ([...document.styleSheets].some((sheet) => sheet.href === absolute)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = resourceHref;
    link.dataset.appModuleStyle = currentRoute.id;
    document.head.append(link);
  }

  function runInlineScript(source, index) {
    const script = document.createElement('script');
    script.dataset.appModuleScript = `${currentRoute.id}:${index}`;
    script.textContent = `${source}\n//# sourceURL=yundeng-module-${currentRoute.id}-${index}.js`;
    document.body.append(script);
  }

  function disableInvoiceAnnotations(route) {
    if (route.id !== 'invoice-management') return;
    const moduleRoot = outlet.querySelector('[data-module-root="invoice-management"]');
    if (!moduleRoot) return;
    const toggle = moduleRoot.querySelector('#invoiceAnnoToggle');
    const popup = moduleRoot.querySelector('#invoiceAnnoPopup');
    const layer = moduleRoot.querySelector('#invoiceAnnoLayer');
    if (toggle) {
      toggle.remove();
    }
    if (popup) {
      popup.remove();
    }
    if (layer) {
      layer.replaceChildren();
      layer.hidden = true;
      layer.setAttribute('aria-hidden', 'true');
    }
    const stripAnchors = () => moduleRoot.querySelectorAll('[data-anno]').forEach((element) => element.removeAttribute('data-anno'));
    stripAnchors();
    const anchorObserver = new MutationObserver(stripAnchors);
    anchorObserver.observe(moduleRoot, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-anno'] });
  }

  function rewriteLegacyLink(anchor) {
    const raw = anchor.getAttribute('href');
    if (!raw || raw.startsWith('#') || /^(javascript:|mailto:|tel:)/i.test(raw)) return;
    let url;
    try { url = new URL(raw, document.baseURI); } catch (_) { return; }
    if (url.origin !== location.origin && location.protocol !== 'file:') return;
    const file = decodeURIComponent(url.pathname.split('/').pop() || '');
    let routeId = legacyRoutes[file];
    if ((file === '系统框架.html' || file === 'index.html') && url.hash) routeId = decodeURIComponent(url.hash.slice(1));
    if (file === 'index.html' && url.searchParams.has('page')) routeId = PAGE_IDS[url.searchParams.get('page')] || url.searchParams.get('page');
    if (!routeId) return;
    anchor.href = routeHref(routeId, url.search);
    anchor.dataset.appRoute = routeId;
  }

  function rewriteLegacyLinks(root = outlet) {
    root.querySelectorAll?.('a[href]').forEach(rewriteLegacyLink);
  }

  async function loadModule(route) {
    outlet.innerHTML = '<div class="app-route-loading" role="status"><div><span class="app-spinner"></span><span>正在加载业务模块</span></div></div>';
    if (!route.module) {
      renderPlanning(route);
      return;
    }

    await loadScript(MODULE_FILES[route.id], 'module');
    const bundle = window.YundengModules[route.id];
    if (!bundle) throw new Error(`无法加载业务模块：${route.id}`);
    window.__YundengInlineBundle = bundle;
    (bundle.before || []).forEach(runInlineScript);
    for (const src of [...new Set(bundle.externalScripts || [])]) await loadScript(moduleResource(src));

    bundle.styleLinks.forEach(loadStyle);
    bundle.styles.forEach((css, index) => {
      const style = document.createElement('style');
      style.dataset.appModuleStyle = `${route.id}:${index}`;
      style.textContent = css;
      document.head.append(style);
    });

    // Page-local dependencies are embedded in this HTML file.

    outlet.innerHTML = bundle.html;
    rewriteLegacyLinks();
    const observer = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches?.('a[href]')) rewriteLegacyLink(node);
          rewriteLegacyLinks(node);
        }
      }));
    });
    observer.observe(outlet, { childList: true, subtree: true });

    window.lucide?.createIcons();
    bundle.scripts.forEach(runInlineScript);
    (bundle.after || []).forEach(runInlineScript);
    window.lucide?.createIcons();
    disableInvoiceAnnotations(route);
    moduleReady = true;
    restoringModuleState = true;
    restoreModuleState();
    restoringModuleState = false;
    applyInvoiceTab();
  }

  const invoiceTabs = { orders: 'applications', documents: 'documents', red: 'red', config: 'config' };
  function applyInvoiceTab() {
    if (currentRoute.id !== 'invoice-management') return;
    const params = new URLSearchParams(location.search);
    if (['application_id','document_id','red_task_id','correction_request_id'].some(key => params.has(key))) return;
    const value = invoiceTabs[params.get('invoiceTab')] || 'applications';
    outlet.querySelector('.invoice-primary-tab[data-tab="' + value + '"]')?.click();
  }
  document.addEventListener('click', (event) => {
    const tab = event.target.closest('.invoice-primary-tab[data-tab]');
    if (!tab || currentRoute.id !== 'invoice-management' || restoringModuleState) return;
    const key = Object.keys(invoiceTabs).find(key => invoiceTabs[key] === tab.dataset.tab);
    if (!key) return;
    const url = new URL(location.href);
    if (url.searchParams.get('invoiceTab') === key) return;
    url.searchParams.set('invoiceTab', key);
    ['application_id','document_id','red_task_id','correction_request_id'].forEach(key => url.searchParams.delete(key));
    history.pushState(null, '', url);
  });

  function renderPlanning(route) {
    outlet.innerHTML = `<section class="app-planning"><div class="app-planning-inner"><div class="app-planning-copy"><span class="app-planning-icon">${icon('calendar-clock', 'w-6 h-6')}</span><h1>${route.label}</h1><p>${route.description}。该模块已纳入统一系统框架，目前保留稳定路由入口，业务内容将在后续里程碑中开发。</p></div></div></section>`;
    window.lucide?.createIcons();
    moduleReady = true;
  }

  function renderLoadError(error) {
    console.error(error);
    outlet.innerHTML = `<section class="app-planning"><div class="app-planning-inner"><div class="app-planning-copy"><span class="app-planning-icon">${icon('triangle-alert', 'w-6 h-6')}</span><h1>模块加载失败</h1><p>${String(error.message || error)}</p><button type="button" class="app-account-action mt-4 justify-center" id="appRetryModule">重新加载</button></div></div></section>`;
    $('appRetryModule')?.addEventListener('click', () => location.reload());
    window.lucide?.createIcons();
  }

  function navigate(routeId, search = '') {
    const target = resolveRoute(routeId);
    captureModuleState();
    closeMobileSidebar();
    closeCompactFlyout();
    if (target.id === currentRoute.id && new URL(routeHref(target.id, search), location.href).search === location.search) {
      content.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    location.assign(routeHref(target.id, search));
  }

  function scheduleReload() {
    if (reloadScheduled) return;
    reloadScheduled = true;
    captureModuleState();
    location.reload();
  }

  function bindEvents() {
    $('appCollapseButton').addEventListener('click', () => {
      closeCompactFlyout();
      setSidebarCompact(!sidebar.classList.contains('is-compact'));
      renderNavigation();
    });
    $('appMobileMenu').addEventListener('click', openMobileSidebar);
    $('appMobileOverlay').addEventListener('click', closeMobileSidebar);
    $('appNoticeButton').addEventListener('click', (event) => { event.stopPropagation(); togglePopover('appNoticePopover'); });
    $('appAccountButton').addEventListener('click', (event) => { event.stopPropagation(); togglePopover('appAccountPopover'); });
    $('appReadAll').addEventListener('click', () => { notices.forEach((item) => { item.unread = false; }); renderNotices(); $('appNoticeDot').hidden = true; toast('通知已全部标记为已读'); });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('#appSidebar, #appCompactFlyout')) closeCompactFlyout();
      const routeLink = event.target.closest('a[data-app-route]');
      if (routeLink) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        navigate(routeLink.dataset.appRoute, new URL(routeLink.href).search);
        return;
      }
      const sectionButton = event.target.closest('[data-app-section]');
      if (sectionButton) {
        const sectionId = sectionButton.dataset.appSection;
        if (sidebar.classList.contains('is-compact') && innerWidth >= 768) {
          compactSectionId = compactSectionId === sectionId ? '' : sectionId;
          menuState = { openSectionId: compactSectionId };
          writeJson(MENU_STATE_KEY, menuState);
          document.querySelectorAll('[data-app-section]').forEach((button) => {
            button.setAttribute('aria-expanded', String(button.dataset.appSection === compactSectionId));
          });
          if (compactSectionId) renderCompactFlyout(compactSectionId, sectionButton);
          else closeCompactFlyout();
        } else {
          const nextSectionId = menuState.openSectionId === sectionId ? '' : sectionId;
          menuState = { openSectionId: nextSectionId };
          writeJson(MENU_STATE_KEY, menuState);
          renderNavigation();
        }
        return;
      }
      const globalAction = event.target.closest('[data-app-global-action]');
      if (globalAction) toast(`${globalAction.textContent.trim()}将在对应功能模块开放`);
    });

    window.addEventListener('hashchange', scheduleReload);
    window.addEventListener('popstate', scheduleReload);
    window.addEventListener('pagehide', captureModuleState);
    window.addEventListener('beforeunload', captureModuleState);
    window.addEventListener('resize', () => {
      if (innerWidth >= 768) closeMobileSidebar();
      closeCompactFlyout();
      syncSubmenuHeights();
      if (!sidebar.classList.contains('is-compact') && menuState.openSectionId) ensureSubmenuVisible(menuState.openSectionId);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      closePopovers();
      closeCompactFlyout();
      closeMobileSidebar();
    });
  }

  async function init() {
    history.replaceState(null, '', routeHref(currentRoute.id, location.search));
    menuState = routeParents.get(currentRoute.id) ? { openSectionId: routeParents.get(currentRoute.id) } : {};
    try { writeJson(MENU_STATE_KEY, menuState); } catch (_) {}
    setSidebarCompact(readSidebarCompact());
    document.body.dataset.appCurrentRoute = currentRoute.id;
    renderNavigation();
    renderRouteTitle();
    renderNotices();
    bindEvents();
    window.lucide?.createIcons();
    try { await loadModule(currentRoute); } catch (error) { renderLoadError(error); }
  }

  window.YundengAppShell = {
    navigation,
    legacyRoutes,
    navigate,
    captureModuleState,
    routeHref
  };

  init();
})();
