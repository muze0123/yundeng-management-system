/* 运营中心 / 更换代理。只提供内容区；Mock 数据和客户端同步均为本地演示。 */
(function () {
  'use strict';
  const icon = (name, cls = 'w-4 h-4') => `<i data-lucide="${name}" class="${cls}" aria-hidden="true"></i>`;
  const textFilter = (key, label, hint) => `<div class="filter-item"><label class="filter-label" for="pr-${key}">${label}</label><div class="filter-control search-control"><input class="control" id="pr-${key}" name="${key}" placeholder="${hint}" autocomplete="off"><button type="button" class="input-clear" data-clear="${key}" aria-label="清空${label}" hidden>${icon('x')}</button></div></div>`;
  // 沿用套餐订单的基础控件、双月日历与完整分页器；布局和表格按当前 design.md 覆盖。
  const css = `
.pr-module{width:100%;min-width:0;color:#3A3F4A}
.pr-module [hidden]{display:none!important}
.pr-module *{box-sizing:border-box}
.pr-module .filter-flow{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(480px,100%),1fr));gap:16px;align-items:center;width:100%;max-width:none}
.pr-module .filter-item{display:flex;align-items:center;min-width:0;gap:0;width:100%}
.pr-module .filter-label{flex:0 0 112px;width:112px;min-width:112px;text-align:right;font-size:13px;line-height:18px;white-space:nowrap;color:#3A3F4A}
.pr-module .filter-label::after{content:'：'}
.pr-module .filter-control{position:relative;flex:1 1 0;width:auto;max-width:none;min-width:0}
.pr-module .control{width:100%;height:32px;padding:0 8px;border:1px solid #DFE1E5;border-radius:4px;background:#FFFFFF;font-size:14px;color:#3A3F4A;outline:none;font-family:inherit}
.pr-module select.control{padding-right:24px;cursor:pointer}
.pr-module select:has(option[value=""]:checked){color:#9DA2AC}
.pr-module option{color:#3A3F4A}
.pr-module input::placeholder{color:#9DA2AC}
.pr-module input{caret-color:#0066FF}
.pr-module ::selection{background:#E6F0FF;color:#1A1D24}
.pr-module button:focus-visible{outline:2px solid #0066FF;outline-offset:2px}
.pr-module .control:focus{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
.pr-module .search-control .control{padding-right:32px}
.pr-module .input-clear{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:18px;height:18px;display:inline-flex;align-items:center;justify-content:center;padding:0;border:0;background:transparent;color:#9DA2AC;cursor:pointer}
.pr-module .input-clear:hover{color:#3A3F4A}
.pr-module .date-trigger{display:flex;justify-content:space-between;align-items:center;gap:8px;text-align:left;cursor:pointer;color:#9DA2AC}
.pr-module .date-trigger span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pr-module .date-trigger.has-value{color:#3A3F4A}
.pr-module .date-trigger svg{flex:none}
.pr-module .filter-actions{display:flex;gap:12px;align-items:center;white-space:nowrap;min-height:32px}
.pr-module .btn{height:32px;padding:0 14px;display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid transparent;border-radius:4px;cursor:pointer;font-size:13px;font-weight:500;white-space:nowrap;transition:background .15s,border-color .15s,color .15s}
.pr-module .btn-primary{background:#0066FF;border-color:#0066FF;color:#FFFFFF}
.pr-module .btn-primary:hover{background:#0052CC;border-color:#0052CC}
.pr-module .btn-primary:active{background:#0047B3;border-color:#0047B3}
.pr-module .btn-default{background:#FFFFFF;border-color:#DFE1E5;color:#3A3F4A}
.pr-module .btn-default:hover{background:#E6F0FF;border-color:#0066FF;color:#0066FF}
.pr-module .btn:disabled{background:#F7F8FA;border-color:#DFE1E5;color:#9DA2AC;cursor:not-allowed;opacity:1}
.pr-module .data-header{display:flex;align-items:center;gap:8px;margin-bottom:16px}
.pr-module .pr-table-scroll{max-width:100%;overflow-x:auto;scrollbar-color:#DFE1E5 #F7F8FA}
.pr-module .data-table{width:100%;min-width:3300px;border-collapse:collapse;font-size:13px}
.pr-module .data-table th{background:#F7F8FA;color:#6E7685;font-weight:500;font-size:12px;text-align:left;white-space:nowrap;padding:12px 16px;border-bottom:1px solid #E8EAED}
.pr-module .data-table td{padding:12px 16px;vertical-align:top;text-align:left;border-bottom:1px solid #F0F1F3;line-height:20px;white-space:nowrap}
.pr-module tbody tr:hover{background:#F3F4F6}
.pr-module .font-mono{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}
.pr-module .pr-success{color:#0FC060}
.pr-module .pr-warning{color:#E7772D}
.pr-module .pr-info{color:#0091D5}
.pr-module .pr-danger{color:#D9001B}
.pr-module .pr-muted{color:#6E7685;background:#F3F4F6}
.pr-module .pr-empty{min-height:240px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#6E7685}
.pr-module .pagination{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:16px;padding-top:20px;font-size:12px}
.pr-module .pg-nav{display:flex;gap:4px}
.pr-module .pg-btn{min-width:30px;height:30px;padding:0 8px;border:1px solid #DFE1E5;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;background:#FFFFFF;color:#3A3F4A;font-size:12px;cursor:pointer}
.pr-module .pg-btn:hover:not(:disabled){border-color:#0066FF;color:#0066FF}
.pr-module .pg-btn.pg-current{color:#FFFFFF;background:#0066FF;border-color:#0066FF}
.pr-module .pg-btn:disabled{color:#9DA2AC;background:#F7F8FA;cursor:not-allowed}
.pr-module .pg-select-wrap{position:relative;display:inline-flex}
.pr-module .pg-select{height:30px;padding:0 28px 0 8px;border:1px solid #DFE1E5;border-radius:4px;background:#FFFFFF;appearance:none}
.pr-module .pg-select-wrap:after{content:'▼';position:absolute;right:8px;top:8px;color:#9DA2AC;font-size:8px;pointer-events:none}
.pr-module .pg-jump-input{width:44px;height:30px;text-align:center;border:1px solid #DFE1E5;border-radius:4px}
.pr-module .pg-jump{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.pr-module .pg-stats{white-space:nowrap;color:#9DA2AC}
.pr-module .pr-popover{position:fixed;z-index:100;max-height:calc(100vh - 32px);overflow:auto;background:#FFFFFF;border:1px solid #DFE1E5;border-radius:8px;padding:16px;box-shadow:0 6px 24px rgba(0,0,0,.12);scrollbar-color:#DFE1E5 #F7F8FA}
.pr-module .pr-method-menu{width:300px;padding:8px;max-height:360px}
.pr-module .pr-calendar{width:640px}
.pr-module .pr-months{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.pr-module .pr-month-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;font-size:14px;font-weight:500}
.pr-module .pr-calendar-nav{width:32px;height:32px;border:0;background:transparent;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;color:#6E7685;border-radius:4px}
.pr-module .pr-calendar-nav:hover{background:#F3F4F6}
.pr-module .pr-days{display:grid;grid-template-columns:repeat(7,1fr);gap:0}
.pr-module .pr-weekday{font-size:12px;color:#6E7685;text-align:center;padding:8px 0}
.pr-module .pr-day{height:32px;border:0;border-radius:4px;background:transparent;color:#3A3F4A;cursor:pointer;font-size:12px}
.pr-module .pr-day:hover{background:#F3F4F6}
.pr-module .pr-day.other{color:#9DA2AC}
.pr-module .pr-day.range{background:#E6F0FF;color:#0066FF;border-radius:0}
.pr-module .pr-day.selected{background:#0066FF;color:#FFFFFF;border-radius:4px}
.pr-module .pr-calendar-footer{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:16px;padding-top:12px;border-top:1px solid #E8EAED}
.pr-module .pr-calendar-hint{font-size:12px;color:#6E7685}
.pr-module .pr-calendar-actions{display:flex;gap:12px}
.pr-module .pr-calendar-actions button:disabled{color:#9DA2AC;background:#F7F8FA;border-color:#DFE1E5;cursor:not-allowed}
@media(max-width:700px){.pr-module .pr-months{grid-template-columns:1fr}
.pr-module .pr-calendar-footer{flex-wrap:wrap}
.pr-module .pr-calendar{width:calc(100vw - 32px)}}
@media(max-width:520px){.pr-module .pagination{align-items:flex-start;flex-direction:column}}

/* Filter controls share the design-system border + soft focus ring; no second outline. */
.pr-module .control{font-family:inherit}
.pr-module .control:focus-visible{outline:none;outline-offset:0}
.pr-module .control:focus,.pr-module .control[aria-expanded="true"]{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12);outline:none}
.pr-module select.control{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239DA2AC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center;padding-right:32px}


.pr-module{padding:16px;font-size:13px}
.pr-module .filter-flow{grid-template-columns:repeat(auto-fill,minmax(min(388px,100%),1fr));column-gap:16px;row-gap:12px}
.pr-module .filter-label{width:88px;min-width:88px;flex-basis:88px;white-space:normal}
.pr-module .filter-control{width:300px;max-width:300px;flex:0 1 300px}
.pr-module .pr-section{background:#FFFFFF;border:0;border-radius:8px;padding:20px;margin-bottom:16px}
.pr-module h2{font-size:16px;font-weight:600;color:#1A1D24;margin:0}
.pr-module .pr-create{margin-left:auto}
.pr-module .pr-table-scroll{overflow:auto;max-width:100%}
.pr-module .data-table{min-width:2280px}
.pr-module .data-table th{background:#F0F1F3;font-weight:600;padding:9px 12px;border-bottom:1px solid #DFE1E5}
.pr-module .data-table td{padding:9px 12px;vertical-align:middle}
/* 首列按用户要求保留 20px 左侧留白，表头与数据对齐。 */
.pr-module .data-table th:first-child,.pr-module .data-table td:first-child{padding-left:20px}
.pr-module .pr-sub{font-size:12px;color:#6E7685}
.pr-module .pr-badge{display:inline-block;font-size:12px;white-space:nowrap}
.pr-module .pr-help-dot{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;margin-left:4px;padding:0;border:0;background:transparent;color:#9DA2AC;cursor:help;vertical-align:middle}
.pr-module .pr-help-dot-icon{display:block;width:18px;height:18px}
.pr-module .pr-help-dot:hover,.pr-module .pr-help-dot[aria-expanded=true]{color:#0066FF}
.pr-module .pr-help-dot:focus-visible{outline:2px solid #0066FF;outline-offset:2px;border-radius:50%}
.pr-module .pr-reason-pop{min-width:180px;max-width:280px;padding:10px 12px}
.pr-module .pr-reason-title{margin:0;font-size:12px;line-height:18px;color:#6E7685}
.pr-module .pr-reason-text{margin:2px 0 0;font-size:12px;line-height:20px;color:#3A3F4A;overflow-wrap:anywhere}
.pr-module .pr-link{border:0;background:transparent;padding:0;color:#0066FF;cursor:pointer}
.pr-module .pr-link:hover{text-decoration:underline}
.pr-module button:disabled{cursor:not-allowed;opacity:.55}
.pr-module .pr-sort{display:flex;align-items:center;gap:4px;border:0;background:none;color:#0066FF;padding:0;cursor:pointer;font-weight:600}
.pr-module .pr-triangles{display:flex;flex-direction:column;gap:2px;width:10px;height:14px}
.pr-module .pr-triangles i{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent}
.pr-module .pr-up{border-bottom:6px solid #9DA2AC}
.pr-module .pr-down{border-top:6px solid #9DA2AC}
.pr-module [aria-sort=ascending] .pr-up{border-bottom-color:#0066FF}
.pr-module [aria-sort=descending] .pr-down{border-top-color:#0066FF}
.pr-module .pr-overlay{position:fixed;inset:0;z-index:1100;background:rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center}
.pr-module .pr-modal{width:760px;max-width:92vw;max-height:92vh;background:#FFFFFF;border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.12);display:flex;flex-direction:column;overflow:hidden}
.pr-module .pr-modal-header{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid #E8EAED}
.pr-module .pr-modal-body{padding:32px 24px;overflow:auto}
.pr-module .pr-modal-footer{padding:16px 24px;display:flex;justify-content:flex-end;gap:12px;border-top:1px solid #E8EAED}
.pr-module .pr-close{width:32px;height:32px;border:0;background:none;color:#9DA2AC;display:grid;place-items:center;cursor:pointer}
.pr-module .pr-field{display:flex;align-items:flex-start;justify-content:center;gap:0;margin-bottom:20px}
.pr-module .pr-field>label{width:90px;flex:none;text-align:right;line-height:30px}
.pr-module .pr-required{color:#D9001B;margin-right:4px}
.pr-module .pr-field-content{width:400px;max-width:calc(100% - 90px)}
.pr-module .pr-counted{position:relative}
.pr-module .pr-counted input{height:30px;padding-right:56px;font-size:13px}
.pr-module .pr-counter{position:absolute;right:8px;top:6px;color:#9DA2AC;font-size:12px}
.pr-module .pr-error{color:#D9001B;font-size:12px;line-height:20px;margin-top:6px}
.pr-module [aria-invalid=true]{border-color:#D9001B}
.pr-module .pr-help{margin-top:6px;font-size:12px;line-height:20px;color:#6E7685}
.pr-module .pr-info-card{margin-top:12px;padding:16px;border:1px solid #DFE1E5;border-radius:8px;background:#F7F8FA;font-size:12px;line-height:24px;overflow-wrap:anywhere}
.pr-module .pr-info-card dl{display:grid;grid-template-columns:auto 1fr;gap:4px 8px;margin:0}
.pr-module .pr-info-card dt{color:#6E7685}
.pr-module .pr-info-card dd{margin:0}
.pr-module .pr-note{background:#E4F4FB;color:#3A3F4A;padding:16px;border-radius:8px;font-size:12px;line-height:24px;margin-top:12px}
.pr-module .pr-note strong{color:#0091D5}
.pr-module .pr-note ol{padding-left:20px;margin:4px 0 0;list-style:decimal}
.pr-module .pr-popover{z-index:1150}
.pr-module .pr-operator-option{width:100%;text-align:left;border:0;padding:8px;background:#FFFFFF;cursor:pointer;border-radius:4px}
.pr-module .pr-operator-option:hover,.pr-module .pr-operator-option[aria-selected=true]{background:#E6F0FF;color:#0066FF}
.pr-module .pr-operator-list{max-height:240px;overflow:auto;margin-top:8px}
.pr-module .pr-multi-list{max-height:240px;overflow:auto;margin-top:8px}
.pr-module .pr-multi-option{display:flex;align-items:center;gap:8px;width:100%;text-align:left;border:0;padding:8px;background:#FFFFFF;cursor:pointer;border-radius:4px;font-size:12px;color:#3A3F4A;font-family:inherit}
.pr-module .pr-multi-option:hover{background:#E6F0FF}
.pr-module .pr-multi-option[aria-selected=true]{color:#0066FF}
.pr-module .pr-multi-box{flex:none;width:14px;height:14px;border:1px solid #DFE1E5;border-radius:2px;background:#FFFFFF;color:transparent;display:grid;place-items:center;font-size:11px;line-height:1}
.pr-module .pr-multi-option[aria-selected=true] .pr-multi-box{background:#0066FF;border-color:#0066FF;color:#FFFFFF}
.pr-module .pr-date-times{display:flex;gap:16px;flex-wrap:wrap;margin-top:16px}
.pr-module .pr-date-times label{display:flex;align-items:center;gap:8px}
.pr-module .pr-date-times input{width:120px;height:30px;border:1px solid #DFE1E5;border-radius:4px;padding:0 8px}
.pr-module .pr-toast{position:fixed;z-index:1300;top:76px;left:50%;transform:translateX(-50%);max-width:90vw;background:#FFFFFF;border:1px solid #DFE1E5;border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.12);padding:12px 20px;color:#3A3F4A}
.pr-module .pr-date-range{display:flex;align-items:center;width:300px;max-width:100%;height:32px;border:1px solid #DFE1E5;border-radius:4px;padding:0 8px;cursor:pointer}
.pr-module .pr-date-range input{width:0;flex:1;min-width:0;border:0;background:transparent;cursor:pointer;font-size:12px;outline:none}
.pr-module .pr-date-sep{color:#9DA2AC;margin:0 2px}
.pr-module .pr-date-range svg{width:16px;height:16px;color:#9DA2AC;flex:none;margin-left:4px}
.pr-module .pr-date-range:focus-within{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
.pr-module .pr-filter-error{margin-left:88px}
.pr-module .pg-ellipsis{min-width:30px;height:30px;display:flex;align-items:center;justify-content:center;color:#9DA2AC}
.pr-module .pr-field select.control,.pr-module .pr-field textarea.control{font-size:13px}
.pr-module .pr-field select.control{height:30px}
.pr-module .pr-field textarea.control{height:auto;min-height:76px;padding:6px 8px;line-height:20px;resize:vertical;font-family:inherit}
.pr-module .pr-counter-block{position:static;display:block;text-align:right;margin-top:4px}
.pr-module .pr-owner-list{margin-top:8px;border:1px solid #DFE1E5;border-radius:4px;background:#FFFFFF;overflow:auto;max-height:168px}
.pr-module .pr-owner-list .pr-help{margin:0;padding:8px 8px 0}
.pr-module .pr-owner-option{display:block;width:100%;text-align:left;border:0;background:#FFFFFF;padding:8px;font-size:12px;color:#3A3F4A;cursor:pointer;border-bottom:1px solid #E8EAED;font-family:inherit}
.pr-module .pr-owner-option:last-child{border-bottom:0}
.pr-module .pr-choice-detail{display:block;margin-top:4px;color:#6E7685;overflow-wrap:anywhere}
.pr-module .pr-choice-empty{padding:12px;font-size:12px;color:#6E7685}
.pr-module .pr-owner-option:hover,.pr-module .pr-owner-option.is-active,.pr-module .pr-owner-option[aria-selected=true]{background:#E6F0FF;color:#0066FF}
.pr-module .pr-clamp{display:inline-block;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:bottom;cursor:help}
.pr-module .pr-clamp:focus-visible{outline:2px solid #0066FF;outline-offset:2px;border-radius:2px}
.pr-module .pr-section:last-child{margin-bottom:0}
@media(max-width:768px){.pr-module .pr-section{padding:16px}
.pr-module .pr-modal-body{padding:20px 16px}
.pr-module .pr-date-times{gap:8px}
.pr-module .pr-modal-header,.pr-module .pr-modal-footer{padding:16px}
.pr-module .pr-counter{font-size:11px}}`;

  const html = `<section class="app-business-module pr-module" data-module-root="proxy-replacement" aria-label="更换代理">
    <!-- 筛选区 -->
    <section class="pr-section" aria-label="更换记录筛选"><form id="pr-filters"><div class="filter-flow">
      ${textFilter('user', '用户', '请输入用户ID/手机号/邮箱')}
      ${textFilter('oldIp', '原代理IP', '请输入原代理IP')}
      ${textFilter('newIp', '新代理IP', '请输入更换后的代理IP')}
      <div class="filter-item"><label class="filter-label" id="pr-reason-filter-label">更换原因</label><div class="filter-control"><button id="pr-reason-filter-trigger" class="control date-trigger" type="button" aria-labelledby="pr-reason-filter-label pr-reason-filter-text" aria-expanded="false" aria-controls="pr-reason-filter-pop" aria-haspopup="listbox"><span id="pr-reason-filter-text">全部更换原因</span>${icon('chevron-down')}</button><input id="pr-reason-filter" name="reason-filter" type="hidden"></div></div><div class="filter-item"><label class="filter-label" for="pr-result">更换结果</label><div class="filter-control"><select id="pr-result" class="control" name="result"><option value="">全部结果</option><option value="success">更换成功</option><option value="failed">更换失败</option></select></div></div>
      <div class="filter-item"><label class="filter-label" for="pr-sync-status">同步状态</label><div class="filter-control"><select id="pr-sync-status" class="control" name="syncStatus"><option value="">全部同步状态</option><option value="syncing">同步中</option><option value="success">同步成功</option><option value="failed">同步失败</option></select></div></div>
      <div class="filter-item"><label class="filter-label" id="pr-operator-label">操作人</label><div class="filter-control"><button id="pr-operator-trigger" class="control date-trigger" type="button" aria-labelledby="pr-operator-label pr-operator-text" aria-expanded="false" aria-controls="pr-operator-pop"><span id="pr-operator-text">全部操作人</span>${icon('chevron-down')}</button><input id="pr-operator" name="operator" type="hidden"></div></div>
      <div class="filter-item"><label class="filter-label" for="pr-from">操作时间</label><div class="filter-control"><div id="pr-date-trigger" class="pr-date-range" aria-expanded="false" aria-controls="pr-calendar"><input id="pr-from" name="from" readonly placeholder="开始时间" aria-label="操作开始时间"><span class="pr-date-sep">—</span><input id="pr-to" name="to" readonly placeholder="结束时间" aria-label="操作结束时间">${icon('calendar-days')}</div></div></div>
      <div class="filter-actions"><button class="btn btn-primary" type="submit">查询</button><button class="btn btn-default" id="pr-reset" type="button">重置</button></div>
    </div><div id="pr-filter-error" class="pr-error pr-filter-error" role="alert"></div></form></section>
    <!-- 更换历史：新资产动态字段与历史快照分离 -->
    <section class="pr-section" aria-label="代理更换记录"><div class="data-header"><h2>更换记录</h2><span id="pr-count" class="pr-sub font-mono" aria-live="polite"></span><button class="btn btn-primary pr-create" id="pr-create" type="button">${icon('replace')}更换代理</button></div>
      <div class="pr-table-scroll" id="pr-table-scroll" data-module-scroll tabindex="0" aria-label="更换记录，可横向滚动"><table class="data-table"><thead><tr><th>用户ID</th><th>用户手机号/邮箱</th><th>原代理IP</th><th>新代理IP</th><th>渠道商</th><th>代理类型</th><th>最近登录时间</th><th>代理到期时间</th><th>更换原因</th><th>更换结果</th><th>同步状态</th><th>备注</th><th>操作人</th><th id="pr-sort-th" aria-sort="descending"><button id="pr-sort" class="pr-sort" type="button">操作时间<span class="pr-triangles" aria-hidden="true"><i class="pr-up"></i><i class="pr-down"></i></span></button></th><th>操作</th></tr></thead><tbody id="pr-rows"></tbody></table></div><div id="pr-pagination" class="pagination"></div>
    </section>
    <div id="pr-reason-filter-pop" class="pr-popover pr-method-menu" hidden><div id="pr-reason-filter-list" class="pr-multi-list" role="listbox" aria-multiselectable="true" aria-label="更换原因"></div></div>
    <div id="pr-operator-pop" class="pr-popover pr-method-menu" hidden><input class="control" id="pr-operator-search" placeholder="搜索操作人" aria-label="搜索操作人"><div id="pr-operator-list" class="pr-operator-list" role="listbox" aria-label="操作人"></div></div>
    <div id="pr-calendar" class="pr-popover pr-calendar" role="dialog" aria-label="选择操作时间范围" hidden></div>
    <div id="pr-reason-pop" class="pr-popover pr-reason-pop" role="tooltip" aria-label="失败原因" hidden></div>
    <div id="pr-overlay" class="pr-overlay" hidden></div><div id="pr-toast" class="pr-toast" role="status" hidden></div>
  </section>`;

  function init(root) {
    const $ = (id) => root.querySelector('#pr-' + id);
    const escape = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const refreshIcons = () => window.lucide?.createIcons();
    const dbKey = 'yundeng-proxy-replacement-mock-v1';
    const viewKey = 'yundeng-proxy-replacement-view-v1';
    const day = 86400000;
    const clock = () => Date.now();
    const format = (time) => new Intl.DateTimeFormat('sv-SE', {timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(time);
    const parseTime = (str) => str ? Date.parse(str.replace(' ', 'T') + '+08:00') : NaN;
    const read = (key) => { try { return JSON.parse(sessionStorage.getItem(key)); } catch (_) { return null; } };
    const write = (key, data) => { try { sessionStorage.setItem(key, JSON.stringify(data)); } catch (_) { /* 内存状态仍可操作。 */ } };
    const operatorName = value => String(value || '').split(' · ')[0].trim();
    const areaName = area => Array.isArray(area) && area.length ? area.filter((part, i) => part && part !== area[i - 1]).join('-') : '- -';
    const operators = ['数据管理员', '陈晓 · 运营', '王敏 · 销售经理', '李凯 · 运营', '周宁 · 销售经理'];
    const currentOperator = document.querySelector('.app-account-name')?.textContent.trim() || '数据管理员';
    if (!operators.includes(currentOperator)) operators.unshift(currentOperator);
    const types = ['静态住宅-优质', '静态住宅-标准', '云平台'];
    const areas = [['中国','浙江','杭州'],['美国','马萨诸塞州','波士顿'],['中国','上海','上海'],['日本','东京都','东京']];
    // 渠道商仅记录本次更换的来源，不参与新 IP 分配（用户 2026-09-24 确认）。
    const channels = [
      {name:'星际云网络',min:42,max:68},
      {name:'海豚IP服务',min:55,max:88},
      {name:'极光数据中心',min:38,max:52},
      {name:'云梯科技',min:66,max:120},
      {name:'北海网络',min:30,max:45}
    ];
    const changeReasons = ['下架','断网','卡顿','跳地区','黑白名单','浏览器问题','业务不支持','IP质量与实际不符','复卖','客户自身问题','其他','买错地区','外网（无法认证）'];
    const priceText = value => value===null||value===undefined||value==='' ? '- -' : '￥'+Number(value).toFixed(2)+'/月';
    const channelLabel = channel => channel.name+'　￥'+channel.min.toFixed(2)+'~'+channel.max.toFixed(2)+'/月';
    // 推断补全：运行中/异常外补齐资格校验及历史已释放状态，正式接入映射资产字典。
    const statusText = {running:'运行中',abnormal:'异常',expired:'已过期',stopped:'已停用',refunded:'已退款',released:'已释放'};
    const resultText = {success:'更换成功',failed:'更换失败'};
    const syncText = {syncing:'同步中',success:'同步成功',failed:'同步失败'};
    function environments(seed, count = 3) {
      return Array.from({length:count}, (_, i) => ({id:String(27000+seed*30+i),name:['跨境店铺','品牌运营','广告投放','商品采集'][i%4]+'-'+(seed+1)+'-'+(i+1),kind:i%3===2?'cloud':'local',group:i%2?'默认分组':'跨境业务',star:i%3===0,region:i%2?'中国-香港':'中国-上海',expiresAt:clock()+(i%5===0?-8:18+i)*day,note:i%4===0?'日常运营':'- -',proxyIp:'',fingerprintIp:''}));
    }
    function seedDatabase() {
      const now = clock();
      const users = Array.from({length:6},(_,i)=>({id:String(100001+i),phone:'1380013800'+(i+1),email:['lin.chen','yue.wang','kai.li','ning.zhou','min.zhao','lei.sun'][i]+'@example.com'}));
      const assets = [], records = [];
      for(let i=0;i<12;i++) {
        const result = i===5 || i===10 ? 'failed' : 'success';
        const syncStatus = i===5 || i===10 ? 'na' : i===2 || i===8 ? 'failed' : 'success';
        const assetId = 'history-asset-'+i;
        const ip = '203.0.113.'+(40+i);
        if(result!=='failed') assets.push({id:assetId,owner:users[i%6].id,ip,area:areas[i%4],type:types[i%3],status:i===4?'expired':i===7?'abnormal':i===9?'stopped':'running',expiresAt:now+(i===4?-3:30+i)*day,purchased:true,lastLogin:now-i*day,envs:i%4===3?[]:environments(i,i===0?25:3),version:1,channel:channels[i%channels.length].name,price:Number((38+i*3.5).toFixed(2))});
        records.push({id:'record-'+i,userId:users[i%6].id,oldIp:'198.51.100.'+(80+i),oldArea:[...areas[i%4]],newArea:result==='failed'?null:[...areas[i%4]],newIp:result==='failed'?'':ip,newAssetId:result==='failed'?null:assetId,lastLogin:i===6?null:now-(i+1)*day,result,syncStatus,reason:result==='failed'?'暂无同地区、同类型可用代理，原代理保持不变':syncStatus==='failed'?'环境或指纹同步失败，新代理已生效':'',operator:operators[(i%4)+1],operatedAt:now-i*3*3600000,retries:[],oldChannel:channels[(i+2)%channels.length].name,channel:channels[i%channels.length].name,changeReason:changeReasons[i%changeReasons.length],remark:i%3===0?'客户反馈该 IP 近期频繁被目标站点识别，需要更换':i%3===1?'':'客户主动申请，已确认按原地区同类型替换',oldPrice:Number((42+i*2.75).toFixed(2)),newPrice:result==='failed'?null:Number((38+i*3.5).toFixed(2))});
      }
      const fixtureStates=['running','abnormal','running','expired','refunded','stopped','running'];
      fixtureStates.forEach((status,i)=>assets.push({id:'source-'+i,owner:i===6?'100002':'100001',ip:'198.51.100.'+(21+i),area:i===2?['德国','黑森州','法兰克福']:areas[0],type:types[i%3],status,expiresAt:now+(i===3?-2:30)*day,purchased:true,lastLogin:now-3600000,envs:i===2?[]:environments(20+i,3),version:1,failNextSync:i===1,channel:channels[i%channels.length].name,price:Number((45+i*4.25).toFixed(2))}));
      // 同一原代理 IP 存在多个持有者：用于演示「先输入原代理 IP，再输入用户账号时单选关联用户」。
      assets.push({id:'source-0-shared',owner:'100003',ip:'198.51.100.21',area:[...areas[0]],type:types[0],status:'running',expiresAt:now+30*day,purchased:true,lastLogin:now-7200000,envs:environments(31,3),version:1,channel:channels[1].name,price:52.5});
      // 可用池严格按完整地区及类型匹配；无库存场景不放入德国资源。
      for(let i=0;i<18;i++) assets.push({id:'inventory-'+i,owner:null,ip:'192.0.2.'+(31+i),area:areas[Math.floor(i/6)%3],type:types[i%3],status:'running',expiresAt:null,purchased:false,envs:[],version:1,lastLogin:null,channel:channels[i%channels.length].name,price:Number((40+(i%6)*4.5).toFixed(2))});
      assets.forEach(a=>a.envs.forEach(e=>{e.proxyIp=a.ip;e.fingerprintIp=a.ip;}));
      records.filter(r=>r.syncStatus==='failed').forEach(r=>{const a=assets.find(a=>a.id===r.newAssetId);a.envs.forEach(e=>e.fingerprintIp=r.oldIp);});
      return {users,assets,records,version:1};
    }
    let db = read(dbKey) || seedDatabase();
    // 增量补齐旧会话记录的地区快照，保留已有操作记录和筛选状态。
    db.records.forEach(record => {
      const oldAsset = db.assets.find(asset => asset.ip === record.oldIp);
      const newAsset = db.assets.find(asset => asset.id === record.newAssetId);
      const seedMatch = /^record-(\d+)$/.exec(record.id);
      if (!record.oldArea) record.oldArea = [...(oldAsset?.area || newAsset?.area || (seedMatch ? areas[Number(seedMatch[1]) % areas.length] : []))];
      if (record.newIp && !record.newArea) record.newArea = [...(newAsset?.area || [])];
      // V1.7 新增字段（渠道商、更换原因、备注、原/新代理单价）：旧会话记录按种子确定性补齐。
      if (record.oldPrice === undefined) record.oldPrice = oldAsset?.price ?? (seedMatch ? Number((42 + Number(seedMatch[1]) * 2.75).toFixed(2)) : null);
      if (record.newPrice === undefined) record.newPrice = newAsset?.price ?? null;
      if (record.channel === undefined) record.channel = seedMatch ? channels[Number(seedMatch[1]) % channels.length].name : '';
      // V1.9：渠道商列改为「原渠道商 / 新渠道商」两行；原渠道商优先取原代理资产归属，历史记录按种子确定性合成（+2 使原、新必然不同，便于演示对比）。
      if (record.oldChannel === undefined) record.oldChannel = oldAsset?.channel ?? (seedMatch ? channels[(Number(seedMatch[1]) + 2) % channels.length].name : '');
      if (record.changeReason === undefined) record.changeReason = seedMatch ? changeReasons[Number(seedMatch[1]) % changeReasons.length] : '';
      if (record.remark === undefined) record.remark = seedMatch && Number(seedMatch[1]) % 3 === 0 ? '客户反馈该 IP 近期频繁被目标站点识别，需要更换' : '';
      // 双字段拆分：旧单值 result 幂等迁移为 result + syncStatus，仅执行一次。
      if (record.syncStatus === undefined) {
        const legacy = record.result;
        if (legacy === 'syncing') { record.result='success'; record.syncStatus='syncing'; }
        else if (legacy === 'sync-failed') { record.result='success'; record.syncStatus='failed'; }
        else if (legacy === 'failed') { record.result='failed'; record.syncStatus='na'; }
        else { record.result='success'; record.syncStatus='success'; }
      }
      (record.retries||[]).forEach(entry => {
        if (entry.syncStatus === undefined && entry.result !== undefined) {
          entry.syncStatus = entry.result==='success' ? 'success' : entry.result==='syncing' ? 'syncing' : 'failed';
          delete entry.result;
        }
      });
    });
    const persist = () => write(dbKey,db);
    const saved = read(viewKey) || {};
    // 兼容旧会话：已移除的筛选值不能继续隐藏列表记录。
    for (const filters of [saved.applied, saved.draft]) if (filters?.syncStatus === 'na') filters.syncStatus = '';
    if (saved.draft?.['sync-status'] === 'na') saved.draft['sync-status'] = '';
    let applied = saved.applied || {}, page = saved.page || 1, size = saved.size || 20, direction = saved.direction || 'desc';
    const getDraft = () => Object.fromEntries(new FormData($('filters')));
    const saveView = () => write(viewKey,{applied,page,size,direction,draft:getDraft()});
    const assetFor = r => db.assets.find(a=>a.id===r.newAssetId);
    const statusFor = a => a.status==='released'||a.status==='stopped'||a.status==='refunded' ? a.status : a.expiresAt && a.expiresAt<=clock()?'expired':a.status;
    let toastTimer;
    // 失败原因浮层计时器与当前触发点（design.md「字段帮助入口」）。
    let reasonTimer=null, reasonTrigger=null;
    function toast(message) { $('toast').textContent=message;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,5000); }
    function badge(text,kind) { return `<span class="pr-badge pr-${kind}">${escape(text)}</span>`; }
    // 失败原因问号入口：hover 或键盘 focus 时以浮层展示原因，不占用表格行高（design.md「字段帮助入口」）。
    function reasonDot(label,reason) { return `<button type="button" class="pr-help-dot" aria-expanded="false" aria-describedby="pr-reason-pop" aria-label="${escape(label)}" data-reason-label="${escape(label)}" data-reason="${escape(reason)}">${icon('circle-help','pr-help-dot-icon')}</button>`; }
    function pager(container,total,current,limit,scope) {
      const pages=Math.max(1,Math.ceil(total/limit));
      const indices=[];
      for(let n=1;n<=pages;n++) if(pages<=7||n===1||n===pages||Math.abs(n-current)<=1) indices.push(n);
      let prev=0;
      container.innerHTML=`<nav class="pg-nav" aria-label="${scope==='main'?'更换记录':'环境'}分页"><button class="pg-btn" data-pager="${scope}" data-page="${current-1}" ${current===1?'disabled':''} aria-label="上一页">‹</button>${indices.map(n=>{const dots=n-prev>1?'<span class="pg-ellipsis">…</span>':'';prev=n;return dots+`<button class="pg-btn ${n===current?'pg-current':''}" data-pager="${scope}" data-page="${n}" ${n===current?'aria-current="page"':''}>${n}</button>`;}).join('')}<button class="pg-btn" data-pager="${scope}" data-page="${current+1}" ${current===pages?'disabled':''} aria-label="下一页">›</button></nav><label class="pg-select-wrap"><select class="pg-select" data-size="${scope}" aria-label="${scope==='main'?'更换记录':'环境'}每页条数">${[10,20,50].map(n=>`<option value="${n}" ${n===limit?'selected':''}>${n} 条/页</option>`).join('')}</select></label><div class="pg-jump">跳至 <input class="pg-jump-input font-mono" type="number" min="1" max="${pages}" value="1" data-jump="${scope}" aria-label="跳转${scope==='main'?'记录':'环境'}页码"> 页 <span class="pg-stats font-mono">共 ${total} 条记录　第 ${current}/${pages} 页</span></div>`;
    }
    function filteredRecords() {
      return db.records.filter(r=>{
        const u=db.users.find(u=>u.id===r.userId), keyword=(applied.user||'').trim().toLowerCase();
        const reasonSel=(applied['reason-filter']||'').split(',').filter(Boolean);
        return (!keyword||u.id===keyword||u.phone.includes(keyword)||u.email.toLowerCase().includes(keyword)) && (!applied.oldIp||r.oldIp.includes(applied.oldIp.trim())) && (!applied.newIp||r.newIp.includes(applied.newIp.trim())) && (!applied.operator||r.operator===applied.operator) && (!applied.result||r.result===applied.result) && (!applied.syncStatus||r.syncStatus===applied.syncStatus) && (!applied.from||r.operatedAt>=parseTime(applied.from)) && (!applied.to||r.operatedAt<=parseTime(applied.to)+999) && (reasonSel.length===0||reasonSel.includes(r.changeReason));
      }).sort((a,b)=>direction==='desc'?b.operatedAt-a.operatedAt:a.operatedAt-b.operatedAt);
    }
    function renderRecords() {
      closeReason();
      const rows=filteredRecords();page=Math.min(page,Math.max(1,Math.ceil(rows.length/size)));
      $('count').textContent='共 '+rows.length+' 条';$('sort-th').setAttribute('aria-sort',direction==='desc'?'descending':'ascending');
      $('rows').innerHTML=rows.slice((page-1)*size,page*size).map(r=>{
        const u=db.users.find(u=>u.id===r.userId),a=assetFor(r),s=a?statusFor(a):null;
        const canRetry=r.syncStatus==='failed'&&a?.owner===r.userId&&s!=='released';
        const expiredRetry=r.syncStatus==='failed'&&!canRetry;
        return `<tr data-record="${escape(r.id)}"><td class="font-mono">${u.id}</td><td class="font-mono">${escape(u.phone)}<br><span class="pr-sub">${escape(u.email)}</span></td><td><div class="font-mono">${escape(r.oldIp)}</div><div class="pr-sub">${escape(areaName(r.oldArea))}</div><div class="pr-sub font-mono">${priceText(r.oldPrice)}</div></td><td>${r.newIp?`<div class="font-mono">${escape(r.newIp)}</div><div class="pr-sub">${escape(areaName(r.newArea))}</div><div class="pr-sub font-mono">${priceText(r.newPrice)}</div>`:'- -'}</td><td><div><span class="pr-sub">原：</span>${escape(r.oldChannel||'- -')}</div><div><span class="pr-sub">新：</span>${r.newIp?escape(r.channel||'- -'):'- -'}</div></td><td>${a?escape(a.type):'- -'}</td><td class="font-mono">${r.lastLogin?format(r.lastLogin):'- -'}</td><td class="font-mono">${a?.expiresAt?format(a.expiresAt):'- -'}</td><td>${escape(r.changeReason||'- -')}</td><td>${badge(resultText[r.result],r.result==='success'?'success':'danger')}${r.result==='failed'&&r.reason?reasonDot('更换失败原因',r.reason):''}</td><td>${r.result==='failed'?'- -':badge(syncText[r.syncStatus],r.syncStatus==='success'?'success':r.syncStatus==='syncing'?'info':'warning')+(r.syncStatus==='failed'&&r.reason?reasonDot('同步失败原因',expiredRetry?'原同步未完成；该代理已被后续更换替代':r.reason):'')}</td><td>${r.remark?`<span class="pr-clamp pr-help-text" tabindex="0" aria-describedby="pr-reason-pop" data-reason-label="备注" data-reason="${escape(r.remark)}">${escape(r.remark)}</span>`:'- -'}</td><td>${escape(operatorName(r.operator))}</td><td class="font-mono">${format(r.operatedAt)}</td><td>${canRetry?`<button class="pr-link" data-retry="${escape(r.id)}">重试同步</button>`:r.syncStatus==='syncing'?'<span class="pr-sub">正在同步…</span>':expiredRetry?'<span class="pr-sub">已被后续更换替代</span>':'- -'}</td></tr>`;
      }).join('')||`<tr><td colspan="15"><div class="pr-empty">${icon('search-x','w-8 h-8')}<span>暂无符合条件的更换记录</span><button type="button" class="pr-link" data-reset>清空筛选条件</button></div></td></tr>`;
      pager($('pagination'),rows.length,page,size,'main');refreshIcons();saveView();
    }
    function clearFilters() { $('filters').reset();$('operator').value='';$('from').value='';$('to').value='';$('reason-filter').value='';$('operator-text').textContent='全部操作人';$('operator-trigger').classList.remove('has-value');syncReasonText();applied={};page=1;direction='desc';$('filter-error').textContent='';syncClear();closePopovers();renderRecords(); }
    function syncClear() { root.querySelectorAll('[data-clear]').forEach(b=>b.hidden=!$(b.dataset.clear).value); }
    $('filters').addEventListener('input',()=>{syncClear();saveView();});
    $('filters').addEventListener('submit',e=>{e.preventDefault();const data=getDraft();if((data.from&&!Number.isFinite(parseTime(data.from)))||(data.to&&!Number.isFinite(parseTime(data.to)))||(data.from&&data.to&&data.from>data.to)) {$('filter-error').textContent='开始时间不能晚于结束时间，请重新选择';return;} $('filter-error').textContent='';applied=data;page=1;closePopovers();renderRecords();});
    $('reset').onclick=clearFilters;
    $('sort').onclick=()=>{direction=direction==='desc'?'asc':'desc';page=1;renderRecords();};

    // 下拉浮层固定定位，限制在视口内；不挤压筛选区或被横向表格裁切。
    function place(pop,trigger,maxWidth) { const box=trigger.getBoundingClientRect();pop.style.maxWidth=Math.min(maxWidth||Infinity,innerWidth-32)+'px';const w=pop.offsetWidth,h=pop.offsetHeight;pop.style.left=Math.max(16,Math.min(box.left,innerWidth-w-16))+'px';pop.style.top=Math.max(16,Math.min(box.bottom+8,innerHeight-h-16))+'px'; }
    // 失败原因浮层：hover 或键盘 focus 打开，移入浮层后不立即关闭。
    function closeReason() { clearTimeout(reasonTimer);reasonTimer=null;$('reason-pop').hidden=true;if(reasonTrigger){reasonTrigger.setAttribute('aria-expanded','false');reasonTrigger=null;} }
    function openReason(trigger) {
      const reason=trigger.dataset.reason;if(!reason)return;
      clearTimeout(reasonTimer);reasonTimer=null;
      if(reasonTrigger===trigger&&!$('reason-pop').hidden)return;
      if(reasonTrigger&&reasonTrigger!==trigger)reasonTrigger.setAttribute('aria-expanded','false');
      reasonTrigger=trigger;trigger.setAttribute('aria-expanded','true');
      $('reason-pop').innerHTML=`<p class="pr-reason-title">${escape(trigger.dataset.reasonLabel||'失败原因')}</p><p class="pr-reason-text">${escape(reason)}</p>`;
      $('reason-pop').hidden=false;place($('reason-pop'),trigger,280);
    }
    function delayCloseReason() { clearTimeout(reasonTimer);reasonTimer=setTimeout(closeReason,120); }
    function closePopovers() { closeReason();$('operator-pop').hidden=true;$('calendar').hidden=true;$('reason-filter-pop').hidden=true;$('operator-trigger').setAttribute('aria-expanded','false');$('date-trigger').setAttribute('aria-expanded','false');$('reason-filter-trigger').setAttribute('aria-expanded','false'); }
    function renderOperators() { const q=$('operator-search').value.trim();const found=operators.filter(n=>operatorName(n).includes(q));$('operator-list').innerHTML=`<button class="pr-operator-option" data-operator="" role="option" aria-selected="${!$('operator').value}">全部操作人</button>`+found.map(n=>`<button class="pr-operator-option" data-operator="${escape(n)}" role="option" aria-selected="${$('operator').value===n}">${escape(operatorName(n))}</button>`).join('')+(found.length?'':'<p class="pr-help">未找到操作人</p>'); }
    $('operator-trigger').onclick=()=>{const opening=$('operator-pop').hidden;closePopovers();if(opening){$('operator-pop').hidden=false;$('operator-trigger').setAttribute('aria-expanded','true');$('operator-search').value='';renderOperators();place($('operator-pop'),$('operator-trigger'));$('operator-search').focus();}};
    $('operator-search').oninput=renderOperators;

    // 更换原因筛选：多选下拉，选项取自 changeReasons（与列表「更换原因」列口径一致）；
    // 多个原因之间按 OR 匹配，与其他筛选条件之间按 AND；选择只改草稿，点「查询」才应用。
    const reasonSelection = () => (($('reason-filter').value||'').split(',').filter(Boolean));
    function syncReasonText() {
      const picked=reasonSelection();
      $('reason-filter-text').textContent=picked.length===0?'全部更换原因':picked.length===1?picked[0]:'已选 '+picked.length+' 项';
      $('reason-filter-trigger').classList.toggle('has-value',picked.length>0);
    }
    function renderReasonOptions() {
      const picked=reasonSelection();
      $('reason-filter-list').innerHTML=changeReasons.map(reason=>`<button type="button" class="pr-multi-option" data-reason="${escape(reason)}" role="option" aria-selected="${picked.includes(reason)}"><span class="pr-multi-box">✓</span>${escape(reason)}</button>`).join('');
    }
    $('reason-filter-trigger').onclick=()=>{const opening=$('reason-filter-pop').hidden;closePopovers();if(opening){$('reason-filter-pop').hidden=false;$('reason-filter-trigger').setAttribute('aria-expanded','true');renderReasonOptions();place($('reason-filter-pop'),$('reason-filter-trigger'),280);}};
    $('reason-filter-list').addEventListener('click',e=>{
      const btn=e.target.closest('[data-reason]');if(!btn)return;
      const reason=btn.dataset.reason,picked=reasonSelection(),at=picked.indexOf(reason);
      if(at>=0)picked.splice(at,1);else picked.push(reason);
      $('reason-filter').value=picked.join(',');
      btn.setAttribute('aria-selected',String(at<0));
      syncReasonText();saveView();
    });

    // 两个月日期范围，时分秒以北京时间解释。
    let calendarMonth,rangeStart='',rangeEnd='',startTime='00:00:00',endTime='23:59:59';
    const ymd=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    function renderCalendar() {
      const monthHtml=offset=>{
        const date=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()+offset,1),first=new Date(date.getFullYear(),date.getMonth(),1-date.getDay());
        return `<div><div class="pr-month-heading"><button type="button" class="pr-calendar-nav" data-month="-1" aria-label="上个月" ${offset?'style="visibility:hidden"':''}>${icon('chevron-left')}</button><span class="font-mono">${date.getFullYear()}年 ${date.getMonth()+1}月</span><button type="button" class="pr-calendar-nav" data-month="1" aria-label="下个月" ${!offset?'style="visibility:hidden"':''}>${icon('chevron-right')}</button></div><div class="pr-days">${['日','一','二','三','四','五','六'].map(w=>`<span class="pr-weekday">${w}</span>`).join('')}${Array.from({length:42},(_,i)=>{const d=new Date(first.getFullYear(),first.getMonth(),first.getDate()+i),key=ymd(d);return `<button type="button" class="pr-day font-mono ${d.getMonth()!==date.getMonth()?'other':''} ${key===rangeStart||key===rangeEnd?'selected':rangeStart&&rangeEnd&&key>rangeStart&&key<rangeEnd?'range':''}" data-date="${key}" aria-label="${key}" aria-pressed="${key===rangeStart||key===rangeEnd}">${d.getDate()}</button>`;}).join('')}</div></div>`;
      };
      $('calendar').innerHTML=`<div class="pr-months">${monthHtml(0)}${monthHtml(1)}</div><div class="pr-date-times"><label>开始时间 <input id="pr-start-time" aria-label="开始时分秒" type="time" step="1" value="${startTime}"></label><label>结束时间 <input id="pr-end-time" aria-label="结束时分秒" type="time" step="1" value="${endTime}"></label></div><div class="pr-error" id="pr-date-error" role="alert"></div><div class="pr-calendar-footer"><span class="pr-calendar-hint">${rangeStart?rangeEnd?rangeStart+' — '+rangeEnd:'请选择结束日期':'请选择开始日期'}</span><div class="pr-calendar-actions"><button class="btn btn-default" type="button" data-date-clear>清空</button><button class="btn btn-primary" type="button" data-date-apply ${!rangeEnd?'disabled':''}>确定</button></div></div>`;
      refreshIcons();place($('calendar'),$('date-trigger'));
    }
    function openCalendar() {closePopovers();rangeStart=$('from').value.slice(0,10);rangeEnd=$('to').value.slice(0,10);startTime=$('from').value.slice(11)||'00:00:00';endTime=$('to').value.slice(11)||'23:59:59';const date=rangeStart||format(clock()).slice(0,10);calendarMonth=new Date(date+'T12:00:00');$('calendar').hidden=false;$('date-trigger').setAttribute('aria-expanded','true');renderCalendar();}
    $('date-trigger').onclick=()=>{$('calendar').hidden?openCalendar():closePopovers();};
    $('date-trigger').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openCalendar();$('calendar').querySelector('button:not([style])')?.focus();}};
    $('calendar').addEventListener('input',e=>{if(e.target.id==='pr-start-time')startTime=e.target.value;if(e.target.id==='pr-end-time')endTime=e.target.value;});

    // Modal 的焦点、背景滚动与关闭行为统一处理。
    let modalKind='',returnFocus=null,busy=false,lookupTimer,lookupVersion=0,selectedUser=null,selectedAsset=null,ipOwners=[],userAssets=[],linkMismatchKey='';
    function openModal(title,body,footer) {closePopovers();returnFocus=document.activeElement;modalKind='replace';$('overlay').innerHTML=`<section class="pr-modal" role="dialog" aria-modal="true" aria-labelledby="pr-modal-title"><header class="pr-modal-header"><h2 id="pr-modal-title">${title}</h2><button class="pr-close" data-close aria-label="关闭弹窗">${icon('x','w-5 h-5')}</button></header><div class="pr-modal-body">${body}</div><footer class="pr-modal-footer">${footer}</footer></section>`;$('overlay').hidden=false;document.getElementById('appContent').style.overflow='hidden';refreshIcons();$('overlay').querySelector('input,button')?.focus();}
    function closeModal() {if(busy)return;lookupVersion++;clearTimeout(lookupTimer);$('overlay').hidden=true;$('overlay').innerHTML='';modalKind='';document.getElementById('appContent').style.overflow='';returnFocus?.focus();}
    function openReplacement() {
      selectedUser=null;selectedAsset=null;ipOwners=[];userAssets=[];linkMismatchKey='';busy=false;
      const field=(id,label,hint)=>`<div class="pr-field"><label for="pr-${id}"><span class="pr-required">*</span>${label}：</label><div class="pr-field-content"><div class="pr-counted"><input class="control" id="pr-${id}" maxlength="50" required placeholder="${hint}" autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="pr-${id==='account'?'ip-owners':'user-assets'}" aria-describedby="pr-${id}-error pr-${id}-help"><span class="pr-counter font-mono" id="pr-${id}-count">0/50</span></div><div id="pr-${id}-error" class="pr-error" role="alert"></div><div id="pr-${id}-help" class="pr-help" aria-live="polite"></div>${id==='account'?'<div id="pr-ip-owners" class="pr-owner-list" role="listbox" aria-label="代理关联用户" hidden></div>':'<div id="pr-user-assets" class="pr-owner-list" role="listbox" aria-label="用户可更换代理" hidden></div><div id="pr-asset-card" hidden></div>'}</div></div>`;
      const selectField=(id,label,hint,options)=>`<div class="pr-field"><label for="pr-${id}"><span class="pr-required">*</span>${label}：</label><div class="pr-field-content"><select class="control" id="pr-${id}" required aria-describedby="pr-${id}-error"><option value="">${hint}</option>${options}</select><div id="pr-${id}-error" class="pr-error" role="alert"></div></div></div>`;
      openModal('更换代理',`<form id="pr-replace-form" novalidate>${field('account','用户账号','请输入用户ID/用户手机号/邮箱')}${field('source-ip','原代理IP','请输入用户原代理IP')}${selectField('channel','渠道商','请选择渠道商',channels.map(c=>`<option value="${escape(c.name)}">${escape(channelLabel(c))}</option>`).join(''))}${selectField('change-reason','更换原因','请选择更换原因',changeReasons.map(reason=>`<option value="${escape(reason)}">${escape(reason)}</option>`).join(''))}<div class="pr-field"><label for="pr-remark">备注：</label><div class="pr-field-content"><textarea class="control" id="pr-remark" maxlength="500" rows="4" placeholder="选填，最多 500 字" aria-describedby="pr-remark-count"></textarea><div class="pr-counter pr-counter-block font-mono" id="pr-remark-count">0/500</div></div></div><div class="pr-note"><strong>说明</strong><ol><li>按原代理所属地区和代理类型，自动分配其他可用 IP；无匹配资源时保留原代理。</li><li>新代理继承原到期时间，更换后原代理立即解绑并释放。</li><li>同步更新绑定环境的代理与指纹信息。同步失败时保留新 IP，可在更换记录中重试同步。</li></ol></div><div id="pr-submit-error" class="pr-error" role="alert"></div></form>`,`<button class="btn btn-default" data-close>取消</button><button class="btn btn-primary" type="submit" form="pr-replace-form" id="pr-submit" disabled>提交更换</button>`);
      $('account').focus();
      for (const id of ['account','source-ip']) {
        const input=$(id),box=$(id==='account'?'ip-owners':'user-assets');
        input.oninput=()=>{
          input.value=input.value.slice(0,50);
          invalidateLink();
          $(id+'-count').textContent=input.value.length+'/50';
          const token=lookupVersion;
          $(id+'-help').textContent=input.value.trim()?(id==='account'?'正在识别用户…':'正在查询代理…'):'';
          lookupTimer=setTimeout(()=>{if(token===lookupVersion)evaluateLink();},id==='account'?280:320);
        };
        input.onfocus=()=>renderLinkChoices();
        input.onclick=()=>renderLinkChoices();
        input.onkeydown=e=>{
          if(e.key==='Escape'&&!box.hidden){e.preventDefault();e.stopPropagation();hideLinkChoices();return;}
          if(e.key==='ArrowDown'||e.key==='ArrowUp') {
            e.preventDefault();if(box.hidden)renderLinkChoices();
            const options=[...box.querySelectorAll('[role="option"]')];if(!options.length)return;
            const current=options.findIndex(o=>o.id===input.getAttribute('aria-activedescendant'));
            const next=current<0?(e.key==='ArrowDown'?0:options.length-1):(current+(e.key==='ArrowDown'?1:-1)+options.length)%options.length;
            options.forEach((o,i)=>o.classList.toggle('is-active',i===next));
            input.setAttribute('aria-activedescendant',options[next].id);options[next].scrollIntoView({block:'nearest'});
          } else if(e.key==='Enter'&&!box.hidden) {
            e.preventDefault();const active=box.querySelector('.is-active');if(active)chooseLinkOption(active);
          }
        };
        input.closest('.pr-field-content').addEventListener('focusout',e=>{
          if(!e.currentTarget.contains(e.relatedTarget))hideLinkChoices();
        });
        box.onclick=e=>{const option=e.target.closest('[role="option"]');if(option)chooseLinkOption(option);};
      }
      $('remark').oninput=()=>{$('remark').value=$('remark').value.slice(0,500);$('remark-count').textContent=$('remark').value.length+'/500';};
      $('channel').onchange=()=>{$('channel-error').textContent='';};
      $('change-reason').onchange=()=>{$('change-reason-error').textContent='';};
      $('replace-form').onsubmit=e=>{e.preventDefault();submitReplacement();};
    }
    function eligibility(asset) {if(!asset.purchased)return '仅支持更换用户已购买的代理';const status=statusFor(asset);if(!['running','abnormal'].includes(status))return `该代理${statusText[status]||'当前不可用'}，暂不支持更换`;return '';}
    function matchUser(account) {const key=String(account||'').trim(),lower=key.toLowerCase();if(!key)return null;return db.users.find(u=>u.id===key||u.phone===key||u.email.toLowerCase()===lower)||null;}
    // 原代理 IP 的全部持有者：同一 IP 可被多个用户持有，用于「先输 IP 再输账号」时的单选。
    function ownersFor(ip) {const list=[];db.assets.forEach(a=>{if(a.ip!==ip||!a.owner||!a.purchased)return;if(!list.includes(a.owner))list.push(a.owner);});return list;}
    function renderCard(asset) {
      const card=$('asset-card');
      if(!asset){card.hidden=true;card.innerHTML='';return;}
      card.hidden=false;card.className='pr-info-card';
      card.innerHTML=`<dl><dt>代理IP：</dt><dd class="font-mono">${escape(asset.ip)}</dd><dt>所属地区：</dt><dd>${escape(areaName(asset.area))}</dd><dt>代理类型：</dt><dd>${escape(asset.type)}</dd><dt>渠道商：</dt><dd>${escape(asset.channel||'- -')}</dd><dt>单价：</dt><dd class="font-mono">${priceText(asset.price)}</dd><dt>最近登录时间：</dt><dd class="font-mono">${asset.lastLogin?format(asset.lastLogin):'- -'}</dd><dt>到期时间：</dt><dd class="font-mono">${asset.expiresAt?format(asset.expiresAt):'- -'}</dd></dl>`;
    }
    // 输入文本保留；两侧匹配结果同步失效，旧响应不能恢复提交资格。
    function hideLinkChoices() {
      for(const [id,list] of [['account','ip-owners'],['source-ip','user-assets']]) {
        if(!$(id))continue;$(list).hidden=true;$(id).setAttribute('aria-expanded','false');$(id).removeAttribute('aria-activedescendant');
      }
    }
    function invalidateLink() {
      lookupVersion++;clearTimeout(lookupTimer);selectedUser=null;selectedAsset=null;ipOwners=[];userAssets=[];linkMismatchKey='';
      hideLinkChoices();renderCard(null);
      for(const id of ['account','source-ip']) {$(id+'-error').textContent='';$(id+'-help').textContent='';$(id).removeAttribute('aria-invalid');}
      $('ip-owners').innerHTML='';$('user-assets').innerHTML='';$('submit').disabled=true;$('submit-error').textContent='';
    }
    function renderLinkChoices() {
      hideLinkChoices();
      const id=document.activeElement?.id;
      if(id==='pr-account'&&ipOwners.length) {
        const box=$('ip-owners');
        box.innerHTML=ipOwners.map((userId,i)=>{const u=db.users.find(user=>user.id===userId);return `<button type="button" tabindex="-1" id="pr-owner-choice-${i}" class="pr-owner-option" data-owner="${escape(userId)}" role="option" aria-selected="${selectedUser?.id===userId}"><span class="font-mono">${escape(userId)} · ${escape(u?.phone||'')}</span><span class="pr-choice-detail font-mono">${escape(u?.email||'')}</span></button>`;}).join('');
        box.hidden=false;$('account').setAttribute('aria-expanded','true');
      } else if(id==='pr-source-ip'&&selectedUser) {
        const box=$('user-assets');
        box.innerHTML=userAssets.length?userAssets.map((a,i)=>`<button type="button" tabindex="-1" id="pr-asset-choice-${i}" class="pr-owner-option" data-asset="${escape(a.id)}" role="option" aria-selected="${selectedAsset?.id===a.id}"><span class="font-mono">${escape(a.ip)}</span><span class="pr-choice-detail">${escape(areaName(a.area))} · ${escape(a.type)}</span></button>`).join(''):'<div class="pr-choice-empty" role="status">该用户暂无可更换的代理</div>';
        box.hidden=false;$('source-ip').setAttribute('aria-expanded','true');
      }
    }
    function chooseLinkOption(option) {
      const asset=option.dataset.asset?db.assets.find(a=>a.id===option.dataset.asset):null;
      const id=asset?'source-ip':'account',value=asset?asset.ip:option.dataset.owner;
      if(!value)return;
      invalidateLink();$(id).value=value;$(id+'-count').textContent=value.length+'/50';
      evaluateLink();$(id).focus();hideLinkChoices();
    }
    // 两种输入顺序共用一次当前文本校验，只有归属和更换资格均通过才启用提交。
    function evaluateLink() {
      const account=$('account').value.trim(),ip=$('source-ip').value.trim();
      selectedUser=matchUser(account);selectedAsset=null;ipOwners=ip?ownersFor(ip):[];
      userAssets=selectedUser?db.assets.filter(a=>a.owner===selectedUser.id&&!eligibility(a)):[];
      renderCard(null);$('submit').disabled=true;
      for(const id of ['account','source-ip']) {$(id+'-error').textContent='';$(id+'-help').textContent='';$(id).removeAttribute('aria-invalid');}
      if(selectedUser) $('account-help').textContent=`已识别用户 ${selectedUser.id} · ${selectedUser.phone}`;
      else if(account) {$('account-error').textContent='未找到该用户，请输入完整用户ID、手机号或邮箱';$('account').setAttribute('aria-invalid','true');}
      if(ip) {
        const matches=db.assets.filter(a=>a.ip===ip);
        if(!matches.length) {$('source-ip-error').textContent='未找到该代理，请检查 IP 后重试';$('source-ip').setAttribute('aria-invalid','true');}
        else if(selectedUser) {
          const asset=matches.find(a=>a.owner===selectedUser.id);
          if(!asset) {
            $('source-ip-error').textContent='该代理不属于当前用户，请核对后重试';$('source-ip').setAttribute('aria-invalid','true');
            $('account-error').textContent='用户账号与原代理IP不匹配';$('account').setAttribute('aria-invalid','true');
            const key=selectedUser.id+'|'+ip;if(key!==linkMismatchKey){linkMismatchKey=key;toast('用户账号与原代理IP不匹配，无法提交更换');}
          } else {
            selectedAsset=asset;linkMismatchKey='';renderCard(asset);
            const error=eligibility(asset);$('source-ip-error').textContent=error;if(error)$('source-ip').setAttribute('aria-invalid','true');
            $('submit').disabled=!!error;
          }
        } else $('source-ip-help').textContent=ipOwners.length?'已识别代理，请输入或选择购买该代理的用户':'该代理暂无购买用户';
      } else if(selectedUser) $('source-ip-help').textContent='可从下拉列表选择，也可直接输入代理 IP';
      renderLinkChoices();
    }
    function setBusy(value) {busy=value;$('overlay').querySelectorAll('input,button').forEach(el=>el.disabled=value);if(!value)$('submit').disabled=!selectedAsset||!!eligibility(selectedAsset);$('submit').textContent=value?'正在更换…':'提交更换';}
    function submitReplacement() {
      if(busy)return;
      const account=$('account').value.trim(),ip=$('source-ip').value.trim();
      if(!account){$('account-error').textContent='请输入用户账号';$('account').setAttribute('aria-invalid','true');$('account').focus();return;}
      if(!ip){$('source-ip-error').textContent='请输入用户原代理IP';$('source-ip').setAttribute('aria-invalid','true');$('source-ip').focus();return;}
      if(!selectedUser||!selectedAsset||matchUser(account)?.id!==selectedUser.id||selectedAsset.owner!==selectedUser.id||ip!==selectedAsset.ip||eligibility(selectedAsset)){
        $('submit-error').textContent=!matchUser(account)?'未找到该用户，请输入完整用户ID、手机号或邮箱':!selectedUser?'用户账号与原代理IP不匹配，无法提交更换':!selectedAsset?'该原代理 IP 信息无效，请重新输入后查询':ip!==selectedAsset.ip?'原代理IP已变化，请重新查询后重试':eligibility(selectedAsset);
        return;
      }
      if(!$('channel').value){$('channel-error').textContent='请选择渠道商';$('channel').focus();return;}
      if(!$('change-reason').value){$('change-reason-error').textContent='请选择更换原因';$('change-reason').focus();return;}
      setBusy(true);
      // 同一文档内原子提交；正式接口须携带幂等键与资产版本。
      const sourceId=selectedAsset.id,owner=selectedUser.id,version=selectedAsset.version,channel=$('channel').value,changeReason=$('change-reason').value,remark=$('remark').value.trim();
      setTimeout(()=>{
        const old=db.assets.find(a=>a.id===sourceId);
        if(!old||old.owner!==owner||old.version!==version||eligibility(old)){$('submit-error').textContent='代理信息已变化，请重新查询后重试';selectedAsset=null;setBusy(false);return;}
        const replacement=db.assets.find(a=>!a.owner&&a.status==='running'&&a.ip!==old.ip&&a.type===old.type&&a.area.every((part,i)=>part===old.area[i]));
        const record={id:'record-'+crypto.randomUUID(),userId:owner,oldIp:old.ip,oldArea:[...old.area],oldPrice:old.price??null,oldChannel:old.channel??null,newArea:replacement?[...replacement.area]:null,newIp:replacement?.ip||'',newAssetId:replacement?.id||null,newPrice:replacement?(replacement.price??null):null,lastLogin:old.lastLogin,result:replacement?'success':'failed',syncStatus:replacement?'syncing':'na',reason:replacement?'正在同步环境和指纹':'暂无同地区、同类型可用代理，原代理保持不变',channel,changeReason,remark,operator:currentOperator,operatedAt:clock(),retries:[]};
        db.records.unshift(record);
        if(!replacement){persist();renderRecords();$('submit-error').textContent=record.reason;setBusy(false);return;}
        replacement.owner=owner;replacement.purchased=true;replacement.expiresAt=old.expiresAt;replacement.envs=old.envs;replacement.version++;replacement.failNextSync=!!old.failNextSync;
        old.owner=null;old.envs=[];old.status='released';old.purchased=false;old.version++;old.failNextSync=false;
        record.assetVersion=replacement.version;persist();busy=false;closeModal();clearFilters();toast('提交更换代理成功');queueSync(record);
      },550);
    }
    const syncing=new Set();
    function queueSync(record) {
      if(syncing.has(record.id))return;syncing.add(record.id);
      setTimeout(()=>{
        syncing.delete(record.id);const a=assetFor(record);
        if(!a||a.owner!==record.userId||statusFor(a)==='released'||(record.assetVersion&&record.assetVersion!==a.version)){record.syncStatus='failed';record.reason='该代理已被后续更换替代，无需重试旧任务';}
        else if(a.failNextSync&&a.envs.length){a.failNextSync=false;record.syncStatus='failed';record.reason='环境或指纹同步失败，新代理已生效';a.envs.forEach(e=>e.proxyIp=a.ip);}
        else {a.envs.forEach(e=>{e.proxyIp=a.ip;e.fingerprintIp=a.ip;});record.syncStatus='success';record.reason='';}
        if(record.retries.length)record.retries[record.retries.length-1].syncStatus=record.syncStatus;
        persist();renderRecords();toast(record.syncStatus==='success'?'代理更换及环境、指纹同步已完成':'新代理已保留，环境或指纹同步失败，可重试');
      },700);
    }
    function retrySync(id) {const r=db.records.find(r=>r.id===id),a=r&&assetFor(r);if(!r||r.syncStatus!=='failed')return;if(!a||a.owner!==r.userId||statusFor(a)==='released'){toast('该代理已被后续更换替代，无需重试旧任务');renderRecords();return;}r.syncStatus='syncing';r.reason='正在重试同步环境和指纹';r.assetVersion=a.version;r.retries.push({operator:currentOperator,time:clock(),syncStatus:'syncing'});persist();renderRecords();queueSync(r);}


    // 事件委托覆盖动态表格、分页器与弹窗，全部输入文本在渲染时转义。
    root.addEventListener('click',e=>{
      const b=e.target.closest('button');if(!b)return;
      if(b.dataset.clear){$(b.dataset.clear).value='';syncClear();$(b.dataset.clear).focus();saveView();}
      if(b.hasAttribute('data-reset'))clearFilters();
      if(b.hasAttribute('data-operator')){$('operator').value=b.dataset.operator;$('operator-text').textContent=operatorName(b.dataset.operator)||'全部操作人';$('operator-trigger').classList.toggle('has-value',!!b.dataset.operator);closePopovers();$('operator-trigger').focus();saveView();}
      if(b.dataset.month){calendarMonth.setMonth(calendarMonth.getMonth()+Number(b.dataset.month));renderCalendar();}
      if(b.dataset.date){if(!rangeStart||rangeEnd){rangeStart=b.dataset.date;rangeEnd='';}else{rangeEnd=b.dataset.date;if(rangeEnd<rangeStart)[rangeStart,rangeEnd]=[rangeEnd,rangeStart];}renderCalendar();}
      if(b.hasAttribute('data-date-clear')){$('from').value='';$('to').value='';closePopovers();$('from').focus();saveView();}
      if(b.hasAttribute('data-date-apply')){const normalize=t=>t.length===5?t+':00':t;const from=rangeStart+' '+normalize(startTime),to=rangeEnd+' '+normalize(endTime);if(!startTime||!endTime||from>to){$('date-error').textContent='请选择有效时间，且开始时间不能晚于结束时间';return;}$('from').value=from;$('to').value=to;$('from').title=from;$('to').title=to;closePopovers();$('from').focus();saveView();}
      if(b.hasAttribute('data-close'))closeModal();
      if(b.dataset.retry)retrySync(b.dataset.retry);
      if(b.dataset.pager==='main'){page=Number(b.dataset.page);renderRecords();}
    });
    root.addEventListener('change',e=>{if(e.target.dataset.size==='main'){size=Number(e.target.value);page=1;renderRecords();}});
    root.addEventListener('keydown',e=>{
      if(e.target.dataset.jump&&e.key==='Enter'){e.preventDefault();const max=Number(e.target.max),n=Math.min(max,Math.max(1,Math.trunc(Number(e.target.value)||1)));if(e.target.dataset.jump==='main'){page=n;renderRecords();}}
    });
    $('create').onclick=openReplacement;
    $('overlay').onclick=e=>{if(e.target===$('overlay'))closeModal();};
    document.addEventListener('pointerdown',e=>{if(!e.target.closest?.('#pr-operator-pop,#pr-operator-trigger,#pr-calendar,#pr-date-trigger,#pr-reason-pop,#pr-reason-filter-pop,#pr-reason-filter-trigger,.pr-help-dot,.pr-help-text'))closePopovers();});
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'){if(!$('overlay').hidden){e.preventDefault();closeModal();}else{const dateOpen=!$('calendar').hidden,opOpen=!$('operator-pop').hidden;closePopovers();if(dateOpen)$('from').focus();if(opOpen)$('operator-trigger').focus();}}
      if(e.key==='Tab'&&!$('overlay').hidden){const focusable=[...$('overlay').querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),[tabindex="0"]')].filter(el=>el.offsetParent!==null);const first=focusable[0],last=focusable[focusable.length-1];if(!first){e.preventDefault();return;}if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
    });
    root.addEventListener('pointerover',e=>{const t=e.target.closest('.pr-help-dot,.pr-help-text');if(t)openReason(t);});
    root.addEventListener('pointerout',e=>{const t=e.target.closest('.pr-help-dot,.pr-help-text');if(t&&!t.contains(e.relatedTarget)&&!$('reason-pop').contains(e.relatedTarget))delayCloseReason();});
    root.addEventListener('focusin',e=>{const t=e.target.closest('.pr-help-dot,.pr-help-text');if(t)openReason(t);});
    root.addEventListener('focusout',e=>{const t=e.target.closest('.pr-help-dot,.pr-help-text');if(t&&!t.contains(e.relatedTarget))delayCloseReason();});
    $('reason-pop').addEventListener('pointerenter',()=>{clearTimeout(reasonTimer);reasonTimer=null;});
    $('reason-pop').addEventListener('pointerleave',delayCloseReason);
    $('table-scroll').addEventListener('scroll',closeReason);
    window.addEventListener('resize',closePopovers);
    document.getElementById('appContent').addEventListener('scroll',closePopovers);
    window.addEventListener('pagehide',saveView);
    // App Shell 恢复通用控件后，以本模块保存的查询状态恢复实际数据与草稿。
    function restoreView() {for(const [key,value] of Object.entries(saved.draft||applied))if($(key==='syncStatus'?'sync-status':key))$(key==='syncStatus'?'sync-status':key).value=value;$('operator-text').textContent=operatorName($('operator').value)||'全部操作人';$('operator-trigger').classList.toggle('has-value',!!$('operator').value);syncReasonText();syncClear();renderRecords();}
    persist();restoreView();requestAnimationFrame(restoreView);
    db.records.filter(r=>r.syncStatus==='syncing').forEach(queueSync);
  }

  window.YundengModules = window.YundengModules || {};
  window.YundengModules['proxy-replacement'] = {id:'proxy-replacement',file:'index.html?page=proxy-replacement',title:'更换代理',html,styles:[css],styleLinks:[],externalScripts:[],scripts:[],init};
})();
