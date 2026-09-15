window.YundengModules = window.YundengModules || {};
window.YundengModules['ops-user-list'] = {
  id: 'ops-user-list',
  file: 'index.html?page=ops-user-list',
  title: '运营用户列表',
  html: `<section aria-label="运营用户列表" class="app-business-module ops-user-module" data-module-root="ops-user-list">
<main class="w-full max-w-none p-4" id="opsMain" tabindex="-1" data-module-scroll>
  <section aria-label="运营用户筛选" class="w-full max-w-none bg-white rounded-lg border-0 p-5 md:p-6 mb-4">
    <div aria-label="字段分组" class="primary-tabs" id="opsDataTabs" role="tablist"></div>
    <form class="filter-flow" id="opsFilterForm">
      <div class="filter-item">
        <label class="filter-label" for="opsAccountFilter">关联账号</label>
        <div class="search-control">
          <input class="control" id="opsAccountFilter" placeholder="手机号 / 邮箱 / IPID / 团队ID / 团队名" />
          <button aria-label="清空关联账号" class="input-clear" data-ops-clear="opsAccountFilter" type="button">&times;</button>
        </div>
      </div>
      <div class="filter-item">
        <label class="filter-label" for="opsRegType">注册类型</label>
        <select class="control" id="opsRegType">
          <option value="">全部类型</option><option>手机号</option><option>邮箱</option><option>微信</option>
        </select>
      </div>
      <div class="filter-item">
        <label class="filter-label">注册时间</label>
        <div class="date-range">
          <input placeholder="开始日期" readonly value="2026-09-14" />
          <span class="date-sep">至</span>
          <input placeholder="结束日期" readonly value="2026-09-14" />
          <i class="date-icon" data-lucide="calendar-days"></i>
        </div>
      </div>
      <div class="filter-item">
        <label class="filter-label" for="opsLifecycle">生命周期阶段</label>
        <select class="control" id="opsLifecycle">
          <option value="">全部阶段</option><option>新注册</option><option>激活成长</option><option>成熟付费</option><option>清洗流失</option>
        </select>
      </div>
      <div class="filter-item f-extra">
        <label class="filter-label" for="opsChannelCat">渠道分类</label>
        <select class="control" id="opsChannelCat">
          <option value="">全部渠道</option><option>自然流量</option><option>SEM</option><option>渠道代理</option><option>直接访问</option><option>新媒体</option>
        </select>
      </div>
      <div class="filter-item f-extra">
        <label class="filter-label" for="opsUserType">用户类型</label>
        <select class="control" id="opsUserType">
          <option>真实用户</option><option>测试用户</option><option>全部</option>
        </select>
      </div>
      <div class="filter-item f-extra">
        <label class="filter-label" for="opsTeamRelation">团队关系</label>
        <select class="control" id="opsTeamRelation">
          <option value="">全部</option><option>单团队</option><option>多团队</option><option>被邀请</option>
        </select>
      </div>
      <div class="filter-item f-extra">
        <label class="filter-label" for="opsAccountStatus">账号状态</label>
        <select class="control" id="opsAccountStatus">
          <option value="">全部</option><option>正常</option><option>锁定</option><option>已注销</option>
        </select>
      </div>
      <div class="filter-item f-extra">
        <label class="filter-label" for="opsPaidStatus">付费状态</label>
        <select class="control" id="opsPaidStatus">
          <option value="">全部</option><option>已付费</option><option>未付费</option>
        </select>
      </div>
      <div class="filter-actions">
        <button class="btn btn-primary" type="submit">查询</button>
        <button class="btn btn-default" id="opsReset" type="button">重置</button>
        <button class="filter-toggle" id="opsCollapse" type="button" aria-expanded="true" aria-controls="opsFilterForm">收起<i data-lucide="chevron-up"></i></button>
      </div>
    </form>
  </section>

  <section aria-label="运营用户数据" class="w-full max-w-none bg-white rounded-lg border-0 p-5 md:p-6">
    <div class="list-head">
      <h2>用户列表</h2>
      <span class="data-count mono" id="opsFootCount">共 0 条</span>
    </div>
    <div class="list-toolbar">
      <div aria-label="快捷筛选" class="seg-tabs" id="opsQuickTabs" role="tablist"></div>
      <div class="toolbar-actions">
        <button class="btn btn-default" id="opsExport" type="button"><i data-lucide="upload"></i>导出</button>
        <button class="btn btn-default" id="opsFieldHelpBtn" type="button"><i data-lucide="circle-help"></i>字段解释</button>
      </div>
    </div>
    <div class="kpi-grid" id="opsStatCards"></div>
    <div id="opsDataDate" class="data-date" hidden>T+1（数据日期：<span class="mono">2026-09-14</span>）</div>
    <div class="table-scroll" id="opsTableWrap">
      <table class="data-table">
        <thead id="opsHead"></thead>
        <tbody id="opsBody"></tbody>
      </table>
    </div>
    <div class="pagination" id="opsPager"></div>
  </section>
</main>
<div aria-hidden="true" class="col-help-popover hidden" id="opsColHelpPop" role="tooltip"></div>
<div aria-hidden="true" class="col-detail-popover hidden" id="opsColDetailPop" role="tooltip"></div>
<div aria-label="字段解释" aria-modal="true" class="modal-layer hidden" id="opsFieldModal" role="dialog">
  <div class="modal">
    <div class="modal-head">
      <strong>字段解释</strong>
      <button aria-label="关闭字段解释" class="modal-close" id="opsFieldModalClose" type="button">&times;</button>
    </div>
    <div class="modal-body" id="opsFieldModalBody"></div>
    <div class="modal-foot">
      <button class="btn btn-primary" id="opsFieldModalOk" type="button">知道了</button>
    </div>
  </div>
</div>
</section>`,
  styles: [`
.ops-user-module{width:100%;max-width:none}
/* 一级 Tab（design.md §5.0） */
.primary-tabs{display:flex;gap:4px;flex-wrap:wrap;border-bottom:1px solid #E8EAED;margin-bottom:20px}
.primary-tab{position:relative;height:36px;padding:0 14px;border:0;background:transparent;color:#3A3F4A;font-size:14px;cursor:pointer;font-family:inherit}
.primary-tab:hover{color:#0066FF}
.primary-tab.active{color:#0066FF;font-weight:600}
.primary-tab.active::after{content:'';position:absolute;left:10px;right:10px;bottom:-1px;height:2px;background:#0066FF;border-radius:2px 2px 0 0}
/* 筛选区（design.md §5.4） */
.filter-flow{display:grid;grid-template-columns:repeat(auto-fill,minmax(388px,1fr));align-items:center;column-gap:16px;row-gap:12px;width:100%;max-width:none}
.filter-item{min-width:0;width:100%;display:flex;flex-direction:row;align-items:center;gap:0}
.filter-label{width:88px;flex:none;text-align:right;font-size:13px;line-height:18px;color:#3A3F4A;white-space:nowrap}
.filter-label::after{content:'：'}
.control{width:300px;max-width:100%;height:32px;font-size:14px;padding:0 8px;border-radius:4px;border:1px solid #DFE1E5;color:#3A3F4A;outline:none;font-family:inherit;background:#fff;caret-color:#0066FF}
.control::placeholder{color:#9DA2AC;font-size:14px}
.control:focus{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
select.control{padding-right:24px;appearance:none;-webkit-appearance:none;cursor:pointer;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239DA2AC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 8px center}
select.control:has(option[value=""]:checked){color:#9DA2AC}
.search-control{position:relative;width:300px;max-width:100%}
.search-control .control{width:100%;padding-right:28px}
.input-clear{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:16px;height:16px;border:0;background:transparent;color:#9DA2AC;font-size:12px;line-height:16px;cursor:pointer;display:none;padding:0}
.input-clear.is-show{display:block}
.input-clear:hover{color:#6E7685}
.date-range{display:flex;align-items:center;gap:0;width:300px;max-width:100%;height:32px;border:1px solid #DFE1E5;border-radius:4px;background:#fff;padding:0 8px}
.date-range:focus-within{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
.date-range input{flex:1;min-width:0;border:0!important;box-shadow:none!important;background:transparent;height:30px;padding:0;font-size:14px;color:#3A3F4A;font-family:inherit;outline:none}
.date-range input::placeholder{color:#9DA2AC}
.date-sep{font-size:14px;color:#9DA2AC;flex-shrink:0;margin:0 2px}
.date-icon{width:14px;height:14px;color:#9DA2AC;flex-shrink:0;margin-left:4px}
.filter-actions{display:inline-flex;align-items:center;gap:12px;min-width:0}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;padding:0 16px;border-radius:4px;border:1px solid #DFE1E5;background:#fff;color:#3A3F4A;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;white-space:nowrap}
.btn svg{width:14px;height:14px}
.btn:hover{color:#0066FF;border-color:#0066FF}
.btn-primary{background:#0066FF;border-color:#0066FF;color:#fff}
.btn-primary:hover{background:#0052CC;border-color:#0052CC;color:#fff}
.btn:disabled{color:#9DA2AC;background:#F7F8FA;border-color:#DFE1E5;cursor:not-allowed}
.filter-toggle{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0;border:0;background:transparent;box-shadow:none;color:#6E7685;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;white-space:nowrap}
.filter-toggle svg{width:16px;height:16px}
.filter-toggle:hover,.filter-toggle:focus-visible{color:#0066FF}
.filter-toggle:focus-visible{outline:2px solid #0066FF;outline-offset:2px}
.filter-flow.is-collapsed .f-extra{display:none}
/* 数据区标题与工具栏（design.md §5.0） */
.list-head{display:flex;align-items:baseline;gap:8px;margin-bottom:12px}
.list-head h2{margin:0;font-size:16px;font-weight:600;color:#1A1D24}
.list-head .data-count{font-size:12px;color:#9DA2AC}
.list-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;border-top:1px solid #E8EAED;padding-top:12px;margin-bottom:16px}
.toolbar-actions{display:flex;gap:8px}
/* 状态 Tab 分段控件（design.md §5.1） */
.seg-tabs{display:flex;flex-wrap:wrap}
.filter-tab{height:28px;padding:0 12px;font-size:13px;color:#6E7685;background:#fff;border:1px solid #DFE1E5;margin-left:-1px;cursor:pointer;font-family:inherit;white-space:nowrap}
.filter-tab:first-child{margin-left:0;border-top-left-radius:4px;border-bottom-left-radius:4px}
.filter-tab:last-child{border-top-right-radius:4px;border-bottom-right-radius:4px}
.filter-tab:hover{color:#0066FF;position:relative;z-index:1}
.filter-tab.active{color:#0066FF;background:#E6F0FF;border-color:#0066FF;font-weight:600;position:relative;z-index:2}
/* KPI 指标卡（design.md §5.0，列表汇总型 is-borderless） */
.kpi-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:16px}
@media(min-width:1024px){.kpi-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
.kpi-card{padding:12px;border-radius:6px;background:#F7F8FA}
.kpi-label{font-size:12px;color:#6E7685}
.kpi-value{margin-top:4px;font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:600;color:#1A1D24}
/* 表格（design.md §5.2） */
.table-scroll{overflow-x:auto}
.data-table{width:100%;border-collapse:collapse;font-size:13px;color:#3A3F4A}
.data-table th{background:#F0F1F3;color:#6E7685;font-weight:600;font-size:12px;padding:9px 12px;border-bottom:1px solid #DFE1E5;white-space:nowrap;text-align:left;position:sticky;top:0;z-index:2}
.data-table td{padding:9px 12px;border-bottom:1px solid #F0F1F3;white-space:nowrap;text-align:left;color:#3A3F4A}
.data-table tbody tr:hover td{background:#F3F4F6}
.data-table th:first-child,.data-table td:first-child{position:sticky;left:0;z-index:1;background:#fff}
.data-table th:first-child{z-index:3;background:#F0F1F3}
.data-table tbody tr:hover td:first-child{background:#F3F4F6}
.mono{font-family:'JetBrains Mono',monospace;font-size:12px}
/* 状态 Badge（design.md §5.3） */
.badge{display:inline-block;padding:1px 8px;border-radius:4px;font-size:12px;line-height:20px;font-weight:500}
.badge.is-success{background:#E7F9F0;color:#0FC060}
.badge.is-danger{background:#FFE8EB;color:#D9001B}
.badge.is-warning{background:#FDF2E9;color:#E7772D}
.badge.is-info{background:#E6F0FF;color:#0066FF}
.badge.is-muted{background:#F0F1F3;color:#6E7685}
/* 表头【?】/ 单元格【!】及 hover 气泡（与用户列表页 col-help/col-detail 样式一致） */
.col-help,.col-detail{display:inline-grid;place-items:center;width:18px;height:18px;padding:0;margin-left:4px;border:0;border-radius:4px;background:transparent;color:#9DA2AC;cursor:pointer;vertical-align:middle;font-family:inherit}
.col-help svg,.col-detail svg{width:14px;height:14px}
th .col-help{color:#6E7685}
.col-help:hover,.col-detail:hover{background:#F3F4F6;color:#0066FF}
.col-help:focus-visible,.col-detail:focus-visible{outline:2px solid #0066FF;outline-offset:2px}
.col-help-popover{position:fixed;z-index:1150;max-width:480px;padding:12px 14px;border:1px solid #DFE1E5;border-radius:6px;background:#fff;box-shadow:0 6px 24px rgba(0,0,0,.12);color:#3A3F4A;font-size:12px;line-height:20px}
.col-detail-popover{position:fixed;z-index:1150;max-width:820px;padding:12px 14px;border:1px solid #DFE1E5;border-radius:6px;background:#fff;box-shadow:0 6px 24px rgba(0,0,0,.12);color:#3A3F4A;font-size:12px;line-height:20px}
.col-help-popover.hidden,.col-detail-popover.hidden{display:none!important}
.col-help-popover p{margin:0;white-space:nowrap}
.col-detail-popover strong{display:block;margin-bottom:6px;color:#1A1D24;font-size:13px;font-weight:600}
.col-detail-popover[hidden]{display:none!important}
.data-date{text-align:right;color:#9DA2AC;font-size:11px;margin-bottom:12px}
.col-detail-popover p{margin:0;white-space:nowrap}
.data-date{text-align:right;color:#9DA2AC;font-size:11px;margin-bottom:12px}
/* 分页器（design.md §5.5） */
.pagination{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:16px;font-size:12px;padding-top:20px}
.pg-nav{display:flex;gap:4px}
.pg-btn{min-width:30px;height:30px;padding:0 8px;font:500 12px inherit;color:#3A3F4A;background:#fff;border:1px solid #DFE1E5;border-radius:4px;cursor:pointer;transition:all .15s;display:inline-flex;align-items:center;justify-content:center;font-family:inherit}
.pg-btn:hover:not(:disabled):not(.pg-current){color:#0066FF;border-color:#0066FF}
.pg-current{background:#0066FF;border-color:#0066FF;color:#fff;cursor:default}
.pg-current:hover{color:#fff}
.pg-btn:disabled{color:#C7CAD1;background:#F7F8FA;cursor:not-allowed;border-color:#DFE1E5}
.pg-ellipsis{min-width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;color:#9DA2AC;font-size:13px}
.pg-select-wrap{position:relative;display:inline-flex;align-items:center}
.pg-select{font:12px inherit;height:30px;padding:0 28px 0 8px;border-radius:4px;border:1px solid #DFE1E5;color:#3A3F4A;background:#fff;cursor:pointer;appearance:none;-webkit-appearance:none;font-family:inherit;outline:none}
.pg-select:focus{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
.pg-select-wrap::after{content:'\\25BC';position:absolute;right:8px;font-size:8px;color:#9DA2AC;pointer-events:none}
.pg-jump{display:inline-flex;align-items:center;gap:6px;color:#3A3F4A}
.pg-jump-input{font:12px inherit;width:44px;height:30px;text-align:center;border-radius:4px;border:1px solid #DFE1E5;color:#3A3F4A;outline:none;font-family:inherit}
.pg-jump-input:focus{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
.pg-stats{color:#9DA2AC;white-space:nowrap}
/* 字段解释弹窗（design.md §5.6 Modal） */
.modal-layer{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.3)}
.modal-layer.hidden{display:none}
.modal{width:760px;max-width:92vw;max-height:80vh;display:flex;flex-direction:column;background:#fff;border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.12)}
.modal-head{display:flex;align-items:center;justify-content:space-between;padding:20px 24px 12px;font-size:16px;font-weight:600;color:#1A1D24}
.modal-close{width:28px;height:28px;border:0;border-radius:4px;background:transparent;color:#9DA2AC;font-size:20px;line-height:28px;cursor:pointer;padding:0}
.modal-close:hover{background:#F3F4F6;color:#1A1D24}
.modal-body{flex:1;overflow:auto;padding:4px 24px 16px}
.modal-foot{display:flex;justify-content:flex-end;gap:12px;padding:12px 24px 20px;border-top:1px solid #E8EAED}
.ops-field-group-title{margin:16px 0 8px;font-size:13px;font-weight:600;color:#0066FF}
.ops-field-group-title:first-child{margin-top:0}
.ops-field-row{display:flex;gap:12px;padding:8px 12px;border-radius:4px;font-size:13px;line-height:20px}
.ops-field-row:nth-child(odd){background:#F7F8FA}
.ops-field-name{flex:0 0 150px;color:#1A1D24;font-weight:500}
.ops-field-def{flex:1;min-width:0;white-space:pre-line;overflow-wrap:anywhere;color:#3A3F4A}
@media(max-width:960px){.filter-flow{grid-template-columns:minmax(0,1fr)}.filter-item{width:100%}}
`],
  styleLinks: [],
  externalScripts: [],
  scripts: [`
(function(){
'use strict';
var root=document.querySelector('[data-module-root="ops-user-list"]');
if(!root)return;
var $=function(id){return root.querySelector('#'+id)};

/* ---------- 字段定义：key / 表头 / 分组 / 字段解释 ---------- */
var GROUPS=[['all','全部字段'],['identify','用户识别'],['source','来源归因'],['lifecycle','生命周期行为'],['team','团队主体关系'],['pay','付费消费'],['package','套餐资源']];
var FIELDS=[
 {k:'id',l:'用户ID',g:'identify',d:'用户在系统内的唯一标识ID。'},
 {k:'account',l:'手机号/邮箱',g:'identify',d:'用户注册时绑定的手机号或邮箱账号。'},
 {k:'usedAccount',l:'曾用手机号/邮箱',g:'identify',d:'用户历史绑定、当前已更换或解绑的手机号/邮箱。'},
 {k:'registered',l:'注册时间',g:'identify',d:'用户完成注册的时间。'},
 {k:'regType',l:'注册类型',g:'identify',d:'注册方式：手机号 / 邮箱 / 微信等。'},
 {k:'paid',l:'付费状态',g:'identify',d:'用户当前付费状态：已付费 / 未付费。'},
 {k:'accountStatus',l:'账号状态',g:'identify',d:'账号当前状态：正常 / 锁定 / 已注销。'},
 {k:'isTest',l:'测试用户',g:'identify',d:'是否被标记为内部测试用户。'},
 {k:'disabled',l:'是否禁用',g:'identify',d:'账号是否已被禁用登录。'},
 {k:'payDisabled',l:'禁用支付',g:'identify',d:'是否禁止该账号发起支付。'},
 {k:'channelCat',l:'渠道分类',g:'source',d:'来源渠道的归类：自然流量 / SEM / 渠道代理 / 直接访问 / 新媒体。'},
 {k:'sourceChannel',l:'来源渠道',g:'source',d:'用户注册时的具体来源渠道明细。'},
 {k:'keyword',l:'关键词',g:'source',d:'带来该用户注册的投放/搜索关键词。'},
 {k:'sourcePage',l:'来源页面',g:'source',d:'用户注册前所在的推广页面或客户端来源。'},
 {k:'searchWord',l:'搜索词',g:'source',d:'用户在搜索引擎/站内使用的搜索词。'},
 {k:'landing',l:'落地页',g:'source',d:'用户首次进入并留存的落地页面。'},
 {k:'inviter',l:'邀请人/归因人',g:'source',d:'邀请该用户注册或完成归因归属的账号。'},
 {k:'sales',l:'归属销售',g:'source',d:'该用户归属跟进的销售人员。'},
 {k:'lifecycle',l:'生命周期阶段',g:'lifecycle',d:'用户当前所处的生命周期阶段：新注册 / 激活成长 / 成熟付费 / 清洗流失。'},
 {k:'churnRisk',l:'流失风险',g:'lifecycle',d:'基于行为模型评估的流失风险等级：高 / 中 / 低。'},
 {k:'blocker',l:'当前卡点',g:'lifecycle',d:'用户当前转化/激活流程中的卡点环节。'},
 {k:'firstDownload',l:'首次下载时间',g:'lifecycle',d:'用户首次下载客户端的时间。'},
 {k:'downloadClient',l:'下载客户端',g:'lifecycle',d:'首次下载的客户端平台及版本。'},
 {k:'currentLogin',l:'首次客户端登录',g:'lifecycle',d:'用户首次登录客户端的时间。'},
 {k:'firstJoinTeam',l:'首次加入团队',g:'lifecycle',d:'用户首次加入团队的时间。'},
 {k:'firstCreateEnv',l:'首次创建环境',g:'lifecycle',d:'用户首次创建浏览器环境的时间。'},
 {k:'firstProxy',l:'首次配置代理',g:'lifecycle',d:'用户首次配置代理的时间。'},
 {k:'firstStart',l:'首次成功启动',g:'lifecycle',d:'首次成功启动浏览器环境的时间。'},
 {k:'secondStart',l:'第二次成功启动',g:'lifecycle',d:'第二次成功启动浏览器环境的时间。'},
 {k:'startFailCount',l:'首启失败次数',g:'lifecycle',d:'首次启动环境失败的次数。'},
 {k:'startFailReason',l:'首启失败原因',g:'lifecycle',d:'首次启动失败的原因分类。'},
 {k:'firstOrderTime',l:'首单时间',g:'pay',d:'用户首笔付费订单的下单时间。'},
 {k:'firstOrderAmount',l:'首单金额',g:'pay',d:'首笔付费订单的支付金额。'},
 {k:'firstOrderProduct',l:'首单产品',g:'pay',d:'首单购买的套餐/产品名称。'},
 {k:'repurchase',l:'复购次数',g:'pay',d:'首单之后再次付费的次数。'},
 {k:'lastConsume',l:'最近消费时间',g:'pay',d:'用户最近一次消费的时间。'},
 {k:'initTeamId',l:'初始团队ID',g:'team',d:'用户注册时默认创建的团队ID。'},
 {k:'initTeamName',l:'初始团队名',g:'team',d:'用户注册时默认创建的团队名称。'},
 {k:'curTeamId',l:'当前团队ID',g:'team',d:'用户当前所属团队的ID。'},
 {k:'curTeamName',l:'当前团队名',g:'team',d:'用户当前所属团队的名称。'},
 {k:'teamCount',l:'团队数',g:'team',d:'用户名下及加入的团队总数。'},
 {k:'multiTeam',l:'是否多团队',g:'team',d:'用户是否加入多个团队。'},
 {k:'invited',l:'是否被邀请',g:'team',d:'用户是否通过邀请链接/邀请码加入团队。'},
 {k:'linkedAccounts',l:'关联账号',g:'team',d:'用户绑定的第三方账号类型，如微信。'},
 {k:'firstStartTeamId',l:'首启团队ID',g:'team',d:'首次成功启动环境时所在团队的ID。'},
 {k:'firstOrderTeamId',l:'首单团队ID',g:'team',d:'首笔付费订单所在团队的ID。'},
 {k:'linkedTeams',l:'关联团队',g:'team',d:'用户关联的全部团队（名称/数量）。'},
 {k:'linkedTeamConsume',l:'关联团队总消费金额',g:'team',d:'用户关联的全部团队累计消费金额。'},
 {k:'firstPayTime',l:'首次付费时间',g:'pay',d:'用户首次完成付费的时间。'},
 {k:'firstPayMonth',l:'首次消费月份',g:'pay',d:'用户首次消费所在的月份。'},
 {k:'totalPaid',l:'总付费金额',g:'pay',d:'用户累计付费总金额。'},
 {k:'consumed',l:'已消费金额',g:'pay',d:'用户累计消费（核销）金额。'},
 {k:'balance',l:'账户余额',g:'pay',d:'用户当前账户可用余额。'},
 {k:'giftBalance',l:'赠送金额',g:'pay',d:'账户内由平台赠送、可能有使用限制的金额。'},
 {k:'pulledPay',l:'是否拉起支付',g:'pay',d:'用户是否成功拉起收银台发起支付。'},
 {k:'lastPendingPay',l:'最后待支付时间',g:'pay',d:'用户最近一次产生待支付订单的时间。'},
 {k:'pkgBuyCount',l:'套餐购买次数',g:'package',d:'用户累计购买套餐的次数。'},
 {k:'env',l:'环境数',g:'package',d:'当前用户环境总数（计费 + 免费 + 赠送）。',help:'env'},
 {k:'members',l:'成员数',g:'package',d:'当前用户下所有企业累计成员总数。',help:'members'},
 {k:'pkgPeriod',l:'套餐周期',g:'package',d:'当前套餐生效开始时间 至 到期时间。'},
 {k:'giftEnv',l:'赠送环境数',g:'package',d:'当前用户总赠送环境数。'},
 {k:'giftMember',l:'赠送成员数',g:'package',d:'当前用户总赠送成员数。'},
 {k:'giftPeriod',l:'赠送周期',g:'package',d:'赠送环境和赠送成员生效开始时间-赠送到期结束时间。'},
 {help:'proxyPlatform',k:'proxyPlatform',l:'平台代理数',g:'package',d:'平台代理总数/运行数/7 天到期数。'},
 {help:'proxyOwn',k:'proxyOwn',l:'自有代理数',g:'package',d:'自有代理总数/绑定数。'},
 {help:'proxyThird',k:'proxyThird',l:'三方代理数',g:'package',d:'三方代理总数/绑定数。'},
 {help:'proxyApi',k:'proxyApi',l:'API代理数',g:'package',d:'API 代理总数/绑定数。'},
 {k:'nearestExpiry',l:'最近到期时间',g:'package',d:'用户名下资源中最近的到期时间。'},
 {k:'exp7',l:'7天内到期',g:'package',d:'是否存在 7 天内到期的资源。'},
 {k:'exp30',l:'30天内到期',g:'package',d:'是否存在 30 天内到期的资源。'}
];
var allFields=FIELDS.map(function(f){return f.k});

/* ---------- Mock 数据 ---------- */
var times=['23:06:41','22:44:05','22:30:26','22:10:35','21:41:43','21:30:02','21:19:15','20:15:58','20:15:36','20:52:30'];
var accounts=['13461271604','13198948258','17891796670','15726029663','13431463434','18287480711','13121948184','15070122337','18791635315','13677310928'];
var catList=['新媒体','渠道代理','SEM','SEM','直接访问','直接访问','渠道代理','渠道代理','新媒体','SEM'];
var srcList=['Bing-广告','Bing-广告','Bing-广告','Bing-广告','自然流量','直接访问','Bing-广告','Bing-广告','微信-视频号','Google-广告'];
var kwList=['办公浏览器','多开防关联浏览器','办公浏览器','指纹浏览器','自然流量','-','指纹浏览器','指纹浏览器','指纹浏览器','指纹浏览器'];
var pageList=['Windows64','官网','Windows64','Windows64','wap','Android资讯','Windows64','Windows64','小程序','Windows64'];
var landList=['浏览器主页','官网','浏览器主页','浏览器主页','自然流量','Android资讯','浏览器主页','浏览器主页','浏览器主页','浏览器主页'];
var envBill=[10,8,6,4,2,0,6,12,3,5];
var envFree=[10,6,4,4,2,2,3,5,1,3];
var envGift=[0,0,0,0,0,0,0,0,0,0];
var memBill=[3,2,1,0,0,0,2,4,1,2];
var memFree=[0,0,0,0,0,0,0,0,0,0];
var memGift=[2,2,0,0,0,0,1,3,0,1];
var hasPkg=[1,1,1,0,0,0,1,1,1,1];
var pkgBuy=[3,2,1,0,0,0,2,4,1,1];
var users=[];
function hexId(seed,len){var s='';for(var i=0;i<(len||9);i+=1){seed=(seed*9301+49297)%233280;s+='0123456789abcdef'[seed%16]}return s}
for(var i=0;i<10;i+=1){
  var paid=hasPkg[i]?'已付费':'未付费';
  var teamId=String(276913-i);
  var u={
    id:hexId(i*37+7),account:accounts[i].slice(0,3)+'****'+accounts[i].slice(-4),usedAccount:i===3?'133****7745':'-',
    registered:'2026-09-14 '+times[i],regType:'手机号',paid:paid,
    accountStatus:'正常',isTest:'否',disabled:'否',payDisabled:'否',
    channelCat:catList[i],sourceChannel:srcList[i],keyword:kwList[i],sourcePage:pageList[i],
    searchWord:kwList[i]==='-'?'-':kwList[i],landing:landList[i],inviter:'-',sales:'-',
    lifecycle:hasPkg[i]?'成熟付费':(i%3===0?'新注册':'激活成长'),
    churnRisk:['低','低','中','高','高','中','低','低','中','低'][i],
    blocker:hasPkg[i]?'-':(i%3===0?'未下载客户端':(i%3===1?'未创建环境':'未付费')),
    firstDownload:hasPkg[i]||i%2===0?'2026-09-14 '+times[i]:'-',
    downloadClient:pageList[i],
    currentLogin:hasPkg[i]?'2026-09-14 '+times[i]:'-',
    firstJoinTeam:'2026-09-14 '+times[i],
    firstCreateEnv:hasPkg[i]?'2026-09-14 '+times[i]:'-',
    firstProxy:hasPkg[i]?'2026-09-14 '+times[i]:'-',
    firstStart:hasPkg[i]?'2026-09-14 '+times[i]:'-',
    secondStart:hasPkg[i]&&i%2===0?'2026-09-14 '+times[i]:'-',
    startFailCount:i===4?2:0,
    startFailReason:i===4?'代理连接超时':'-',
    firstOrderTime:hasPkg[i]?'2026-09-14 '+times[i]:'-',
    firstOrderAmount:hasPkg[i]?['299.00','499.00','99.00','199.00','1299.00'][i%5]:'-',
    firstOrderProduct:hasPkg[i]?['套餐A·月付','套餐B·月付','套餐A·季付','套餐C·月付','套餐B·年付'][i%5]:'-',
    repurchase:[2,1,0,0,0,0,1,3,0,0][i],
    lastConsume:hasPkg[i]?'2026-09-14 '+times[i]:'-',
    initTeamId:teamId,initTeamName:accounts[i].slice(0,3)+'****'+accounts[i].slice(-4)+'的团队',
    curTeamId:teamId,curTeamName:accounts[i].slice(0,3)+'****'+accounts[i].slice(-4)+'的团队',
    teamCount:[1,1,1,1,1,1,2,3,1,1][i],
    multiTeam:i===6||i===7?'是':'否',
    invited:i%4===3?'是':'否',
    linkedAccounts:i===0||i===1?'微信':'-',
    firstStartTeamId:teamId,firstOrderTeamId:hasPkg[i]?teamId:'-',
    linkedTeams:accounts[i].slice(0,3)+'****'+accounts[i].slice(-4)+'的团队'+(i===7?'、合作团队'+i:''),
    linkedTeamConsume:hasPkg[i]?['1897.00','998.00','299.00','0.00','0.00','0.00','996.00','3591.00','299.00','499.00'][i]:'0.00',
    firstPayTime:hasPkg[i]?'2026-09-14 '+times[i]:'-',
    firstPayMonth:hasPkg[i]?'2026-09':'-',
    totalPaid:hasPkg[i]?['897.00','998.00','299.00','0.00','0.00','0.00','996.00','2196.00','299.00','499.00'][i]:'0.00',
    consumed:hasPkg[i]?['598.00','499.00','299.00','0.00','0.00','0.00','498.00','1197.00','299.00','499.00'][i]:'0.00',
    balance:['299.00','499.00','0.00','0.00','0.00','0.00','498.00','999.00','0.00','0.00'][i],
    giftBalance:['0.00','50.00','0.00','0.00','0.00','0.00','20.00','100.00','0.00','0.00'][i],
    pulledPay:paid==='已付费'||i===4?'是':'否',
    lastPendingPay:i===4?'2026-09-14 21:41:43':'-',
    balanceConsumed:hasPkg[i]&&i%2===0?100:0,proxyPurchased:hasPkg[i]&&i!==2,
    pkgBuyCount:pkgBuy[i],
    envTotal:envBill[i]+envFree[i]+envGift[i],
    envBill:envBill[i],envFree:envFree[i],envGift:envGift[i],
    memTotal:memBill[i]+memFree[i]+memGift[i],
    memBill:memBill[i],memFree:memFree[i],memGift:memGift[i],
    pkgPeriod:hasPkg[i]?'2026-09-15 15:07:19 至 2026-10-15 15:07:21':'-',
    giftEnv:[10,8,6,0,0,0,5,10,2,4][i],
    giftMember:[2,2,0,0,0,0,1,3,0,1][i],
    giftPeriod:hasPkg[i]?'2026-09-15 13:22:07 至 2026-10-15 13:22:11':'-',
    proxyPlatform:hasPkg[i]?[20,10,6,0,0,0,8,30,4,10][i]:0,
    proxyOwn:hasPkg[i]?[2,0,0,0,0,0,0,5,0,1][i]:0,
    proxyThird:hasPkg[i]?[0,2,0,0,0,0,1,0,0,0][i]:0,
    proxyApi:hasPkg[i]?[0,0,2,0,0,0,0,3,0,0][i]:0,
    nearestExpiry:hasPkg[i]?'2026-10-15 15:07:21':'-',
    exp7:hasPkg[i]?[1,0,0,0,0,0,0,2,0,0][i]:0,
    exp30:hasPkg[i]?[3,2,1,0,0,0,1,4,1,1][i]:0
  };
  users.push(u);
}

/* ---------- 快捷筛选 Tab ---------- */
var QUICK=[
 ['今日注册',function(u){return u.registered.indexOf('2026-09-14')===0}],
 ['已登录未付费',function(u){return u.paid==='未付费'&&u.currentLogin!=='-'}],
 ['已注册未付费',function(u){return u.paid==='未付费'}],
 ['7天内购买',function(u){return u.firstPayTime!=='-'}],
 ['清洗流失用户',function(u){return u.lifecycle==='清洗流失'}],
 ['到期未续费',function(u){return u.nearestExpiry!=='-'&&u.repurchase===0}],
 ['启动未支付',function(u){return u.pulledPay==='是'&&u.paid==='未付费'}],
 ['流失未付费',function(u){return u.paid==='未付费'&&u.churnRisk==='高'}],
 ['直投未激活',function(u){return u.channelCat==='SEM'&&u.firstStart==='-'}],
 ['多团队用户',function(u){return u.multiTeam==='是'}],
 ['首启失败',function(u){return u.startFailCount>0}]
];

/* ---------- 状态 ---------- */
var state={tab:'all',quick:'',keyword:'',filters:{},page:1,pageSize:20};

/* ---------- 渲染 ---------- */
function esc(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
// 分组视图独立指定顺序，共享字段定义，全部字段不重复列。
var TAB_FIELDS={
 source:['id','account','registered','channelCat','sourceChannel','keyword','sourcePage','searchWord','landing','inviter','sales'],
 lifecycle:['id','account','lifecycle','churnRisk','blocker','registered','firstDownload','downloadClient','currentLogin','firstJoinTeam','firstCreateEnv','firstProxy','firstStart','secondStart','startFailCount','startFailReason','firstOrderTime','firstOrderAmount','firstOrderProduct','repurchase','lastConsume'],
 pay:['id','account','paid','firstPayTime','firstPayMonth','firstOrderAmount','firstOrderProduct','totalPaid','consumed','balance','giftBalance','lastConsume','repurchase','pulledPay','lastPendingPay']
};
function fieldsForTab(tab){
  if(tab==='all')return allFields;
  if(TAB_FIELDS[tab])return TAB_FIELDS[tab];
  var keys=FIELDS.filter(function(f){return f.g===tab}).map(function(f){return f.k});
  return tab==='identify'?keys:['id','account'].concat(keys);
}
function fieldOf(k){var r=null;FIELDS.forEach(function(f){if(f.k===k)r=f});return r}
function cellValue(u,k){
  if(k==='env')return String(u.envTotal);
  if(k==='members')return String(u.memTotal);
  if(k==='proxyPlatform')return u[k]+' / '+u[k]+' / 0';
  if(['proxyOwn','proxyThird','proxyApi'].indexOf(k)>=0)return u[k]+' / '+u[k];
  return u[k];
}
function badge(k,v){
  if(k==='lifecycle'||k==='blocker'||k==='channelCat'||k==='sourceChannel')return '<span class="badge is-info">'+esc(v)+'</span>';
  if(k==='paid')return v==='已付费'?'<span class="badge is-success">已付费</span>':'<span class="badge is-warning">未付费</span>';
  if(k==='exp7'||k==='exp30')return '<span class="badge '+(v>0?'is-warning':'is-success')+'">'+(v>0?'是':'否')+'</span>';
  if(k==='accountStatus')return '<span class="badge is-success">'+esc(v)+'</span>';
  if(k==='isTest'||k==='disabled'||k==='payDisabled'||k==='multiTeam'||k==='invited'){
    return v==='是'?'<span class="badge is-danger">是</span>':'<span class="badge is-muted">否</span>';
  }
  if(k==='pulledPay')return v==='是'?'<span class="badge is-info">是</span>':'<span class="badge is-muted">否</span>';
  if(k==='churnRisk')return v==='高'?'<span class="badge is-danger">高</span>':(v==='中'?'<span class="badge is-warning">中</span>':'<span class="badge is-success">低</span>');
  return null;
}
function isMonoKey(k){
  return ['currentLogin','proxyPlatform','proxyOwn','proxyThird','proxyApi','linkedTeamConsume','firstPayMonth','id','account','usedAccount','registered','firstDownload','firstJoinTeam','firstCreateEnv','firstProxy','firstStart','secondStart','firstOrderTime','lastConsume','initTeamId','curTeamId','firstStartTeamId','firstOrderTeamId','firstOrderAmount','totalPaid','consumed','balance','giftBalance','lastPendingPay','pkgPeriod','giftPeriod','nearestExpiry','firstPayTime'].indexOf(k)>=0;
}
function filtered(){
  var list=users.slice();
  if(state.quick){var pred=null;QUICK.forEach(function(q){if(q[0]===state.quick)pred=q[1]});if(pred)list=list.filter(pred)}
  if(state.keyword){var kw=state.keyword.toLowerCase();list=list.filter(function(u){return (u.account+' '+u.id+' '+u.curTeamId+' '+u.curTeamName).toLowerCase().indexOf(kw)>=0})}
  Object.keys(state.filters).forEach(function(key){var value=state.filters[key];if(value)list=list.filter(function(u){return u[key]===value})});
  return list;
}
function pageCount(total){return Math.max(1,Math.ceil(total/state.pageSize))}
function pageItems(cur,pages){
  if(pages<=7){var arr=[];for(var i=1;i<=pages;i+=1)arr.push({t:'n',v:i});return arr}
  var items=[{t:'n',v:1}];
  var start=Math.max(2,cur-1),end=Math.min(pages-1,cur+1);
  if(start>2)items.push({t:'e'});
  for(var j=start;j<=end;j+=1)items.push({t:'n',v:j});
  if(end<pages-1)items.push({t:'e'});
  items.push({t:'n',v:pages});
  return items;
}
function renderTabs(){
  $('opsDataTabs').innerHTML=GROUPS.map(function(g){
    return '<button type="button" role="tab" aria-selected="'+(state.tab===g[0])+'" class="primary-tab'+(state.tab===g[0]?' active':'')+'" data-ops-tab="'+g[0]+'">'+g[1]+'</button>';
  }).join('');
}
function renderQuick(){
  $('opsQuickTabs').innerHTML=QUICK.map(function(q){
    return '<button type="button" role="tab" aria-selected="'+(state.quick===q[0])+'" class="filter-tab'+(state.quick===q[0]?' active':'')+'" data-ops-quick="'+q[0]+'">'+q[0]+'</button>';
  }).join('');
}
function renderKpis(list){
  var total=list.length;
  function count(fn){return list.filter(fn).length}
  function rate(n,d){return (d?n/d*100:0).toFixed(2)+'%'}
  var downloaded=count(function(u){return u.firstDownload!=='-'});
  var started=count(function(u){return u.firstStart!=='-'});
  var attempted=count(function(u){return u.firstStart!=='-'||u.startFailCount>0});
  function top(key){var counts={};list.forEach(function(u){if(u[key]&&u[key]!=='-')counts[u[key]]=(counts[u[key]]||0)+1});return Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]})[0]||'-'}
  var metrics={
    identify:[['真实用户',count(function(u){return u.isTest==='否'})],['测试用户',count(function(u){return u.isTest==='是'})],['禁用用户',count(function(u){return u.disabled==='是'})],['信息缺失用户',count(function(u){return !u.account||u.account==='-'})]],
    source:[['已归因用户',count(function(u){return u.sourceChannel!=='-'})],['未归因用户',count(function(u){return u.sourceChannel==='-'})],['TOP来源渠道',top('sourceChannel')],['销售链接用户',count(function(u){return u.sales!=='-'})]],
    lifecycle:[['首下载率',rate(downloaded,total)],['启动率',rate(started,total)],['成功启动率',rate(started,attempted)],['首单率',rate(count(function(u){return u.firstOrderTime!=='-'}),total)],['TOP卡点',top('blocker')]],
    team:[['多团队用户',count(function(u){return u.teamCount>1})],['团队不一致',count(function(u){return u.initTeamId!==u.curTeamId})],['首启团队缺失',count(function(u){return u.firstStart!=='-'&&u.firstStartTeamId==='-'})],['首单团队缺失',count(function(u){return u.firstOrderTime!=='-'&&u.firstOrderTeamId==='-'})]],
    pay:[['真实消费用户',count(function(u){return u.isTest==='否'&&Number(u.consumed)>0})],['净消费金额','¥'+list.reduce(function(sum,u){return sum+Number(u.consumed)},0).toFixed(2)],['首单用户',count(function(u){return u.firstOrderTime!=='-'})],['复购用户',count(function(u){return u.repurchase>0})],['余额消费用户',count(function(u){return u.balanceConsumed>0})]],
    package:[['有效套餐用户',count(function(u){return u.pkgPeriod!=='-'})],['7天内到期',count(function(u){return u.exp7>0})],['30天内到期',count(function(u){return u.exp30>0})],['购买过代理用户',count(function(u){return u.proxyPurchased})],['购买过套餐用户',count(function(u){return u.pkgBuyCount>0})]]
  };
  var cards=[['当前结果',total]].concat(metrics[state.tab]||metrics.identify);
  $('opsStatCards').innerHTML=cards.map(function(m){return '<div class="kpi-card is-borderless"><div class="kpi-label">'+m[0]+'</div><div class="kpi-value">'+esc(m[1])+'</div></div>'}).join('');
  $('opsFootCount').textContent='共 '+total+' 条';
  $('opsDataDate').hidden=['lifecycle','pay'].indexOf(state.tab)<0;
}
function renderHead(keys){
  $('opsHead').innerHTML='<tr>'+keys.map(function(k){
    var f=fieldOf(k);
    var help=f.help?'<button type="button" class="col-help" data-help="'+f.help+'" aria-label="字段说明"><i data-lucide="circle-help" aria-hidden="true"></i></button>':'';
    return '<th><span class="th-label">'+esc(f.l)+'</span>'+help+'</th>';
  }).join('')+'</tr>';
}
function renderBody(list,keys){
  if(!list.length){
    $('opsBody').innerHTML='<tr><td colspan="'+keys.length+'" style="text-align:center;color:#9DA2AC;padding:48px 0">暂无数据</td></tr>';
    return;
  }
  $('opsBody').innerHTML=list.map(function(u){
    return '<tr>'+keys.map(function(k){
      var v=cellValue(u,k);
      var b=badge(k,v);
      var content=b!=null?b:esc(v);
      if(['firstOrderAmount','linkedTeamConsume','totalPaid','consumed','balance','giftBalance'].indexOf(k)>=0)v='¥'+Number(v==='-'?0:v).toFixed(2);
      if((isMonoKey(k)||typeof v==='number')&&b==null)content='<span class="mono">'+esc(v)+'</span>';
      if((k==='pkgPeriod'||k==='giftPeriod')&&String(v).indexOf(' 至 ')>0)content='<span class="mono">'+esc(v).replace(' 至 ',' 至<br>')+'</span>';
      if((k==='env'||k==='members')&&b==null){
        content='<span class="mono">'+esc(v)+'</span><button type="button" class="col-detail" data-detail="'+(k==='env'?'env':'members')+'" data-id="'+u.id+'" aria-label="查看明细"><i data-lucide="circle-alert" aria-hidden="true"></i></button>';
      }
      if(k==='linkedTeams')content='<button type="button" class="filter-toggle" data-ops-team="'+u.id+'">查看</button>';
      return '<td>'+content+'</td>';
    }).join('')+'</tr>';
  }).join('');
}
function renderPager(total){
  var pages=pageCount(total);
  if(state.page>pages)state.page=pages;
  var p=state.page;
  $('opsPager').innerHTML=
    '<div class="pg-nav" id="pgNav">'+
    '<button type="button" class="pg-btn" data-ops-page="'+(p-1)+'" '+(p<=1?'disabled':'')+' aria-label="上一页">&lsaquo;</button>'+
    pageItems(p,pages).map(function(it){
      return it.t==='e'?'<span class="pg-ellipsis">&hellip;</span>':'<button type="button" class="pg-btn'+(it.v===p?' pg-current':'')+'" data-ops-page="'+it.v+'">'+it.v+'</button>';
    }).join('')+
    '<button type="button" class="pg-btn" data-ops-page="'+(p+1)+'" '+(p>=pages?'disabled':'')+' aria-label="下一页">&rsaquo;</button>'+
    '</div>'+
    '<span class="pg-select-wrap"><select class="pg-select" id="opsPageSize" aria-label="每页条数">'+[10,20,50].map(function(n){return '<option value="'+n+'"'+(n===state.pageSize?' selected':'')+'>'+n+' 条/页</option>'}).join('')+'</select></span>'+
    '<span class="pg-jump">跳至 <input class="pg-jump-input" id="opsJump" value="1" aria-label="跳转页码" inputmode="numeric" /> 页</span>'+
    '<span class="pg-stats">共 '+total.toLocaleString()+' 条记录　第 '+p+'/'+pages+' 页</span>';
  var sizeSel=$('opsPageSize');
  if(sizeSel)sizeSel.addEventListener('change',function(){state.pageSize=Number(sizeSel.value);state.page=1;render()});
  var jump=$('opsJump');
  if(jump)jump.addEventListener('keydown',function(e){
    if(e.key!=='Enter')return;
    var v=Math.floor(Number(jump.value));
    if(!Number.isInteger(v)||v<1||v>pages)return;
    state.page=v;render();
    var nj=$('opsJump');if(nj){nj.value='1';nj.focus()}
  });
}
function render(){
  renderTabs();renderQuick();
  hideAllPops();
  var keys=fieldsForTab(state.tab);
  var list=filtered();
  renderKpis(list);
  renderHead(keys);
  var start=(state.page-1)*state.pageSize;
  renderBody(list.slice(start,start+state.pageSize),keys);
  renderPager(list.length);
  window.lucide&&window.lucide.createIcons();
}

/* ---------- 气泡（col-help 表头【?】/ col-detail 单元格【!】，交互与用户列表页一致） ---------- */
var helpPop=$('opsColHelpPop'),detailPop=$('opsColDetailPop');
var popActive={pop:null,trigger:null,timer:null};
function hidePop(pop){pop.classList.add('hidden');pop.setAttribute('hidden','');pop.setAttribute('aria-hidden','true')}
function hideAllPops(){
  [helpPop,detailPop].forEach(function(p){if(p)hidePop(p)});
  if(popActive.trigger)popActive.trigger.removeAttribute('aria-describedby');
  popActive.pop=null;popActive.trigger=null;
}
function positionPop(pop,trigger){
  var rect=trigger.getBoundingClientRect();
  pop.style.left='0px';pop.style.top='0px';
  var w=pop.offsetWidth,h=pop.offsetHeight;
  var left=Math.min(Math.max(16,rect.left),Math.max(16,window.innerWidth-w-16));
  var below=rect.bottom+8,above=rect.top-h-8;
  var top=below+h<=window.innerHeight-16?below:(above>=16?above:Math.max(16,Math.min(below,window.innerHeight-h-16)));
  pop.style.left=left+'px';pop.style.top=top+'px';
}
function showPop(pop,trigger,html){
  if(!html)return;
  clearTimeout(popActive.timer);
  if(popActive.pop&&popActive.pop!==pop)hidePop(popActive.pop);
  popActive.pop=pop;popActive.trigger=trigger;
  pop.innerHTML=html;
  pop.classList.remove('hidden');
  pop.removeAttribute('hidden');
  pop.setAttribute('aria-hidden','false');
  trigger.setAttribute('aria-describedby',pop.id);
  requestAnimationFrame(function(){positionPop(pop,trigger)});
}
function delayHidePops(){
  clearTimeout(popActive.timer);
  popActive.timer=setTimeout(function(){
    if(popActive.pop&&popActive.pop.matches(':hover'))return;
    if(popActive.trigger&&(popActive.trigger.matches(':hover')||popActive.trigger.matches(':focus')))return;
    hideAllPops();
  },140);
}
function helpHtml(key){
  var def='';FIELDS.forEach(function(f){if(f.help===key)def=f.d});
  return def?'<p>'+esc(def)+'</p>':'';
}
function detailHtml(key,rowId){
  var u=null;users.forEach(function(x){if(x.id===rowId)u=x});
  if(!u)return '';
  if(key==='env'){
    return '<strong>环境数 x '+esc(u.envTotal)+'</strong><p>- 计费环境数 x '+esc(u.envBill)+'</p><p>- 免费环境数 x '+esc(u.envFree)+'</p><p>- 赠送环境数 x '+esc(u.envGift)+'</p>';
  }
  return '<strong>成员数 x '+esc(u.memTotal)+'</strong><p>- 计费成员数 x '+esc(u.memBill)+'</p><p>- 免费成员数 x '+esc(u.memFree)+'</p><p>- 赠送成员数 x '+esc(u.memGift)+'</p>';
}
function popTarget(e){
  var help=e.target.closest('[data-help]');
  if(help)return {pop:helpPop,trigger:help,html:helpHtml(help.getAttribute('data-help'))};
  var detail=e.target.closest('[data-detail]');
  if(detail)return {pop:detailPop,trigger:detail,html:detailHtml(detail.getAttribute('data-detail'),detail.getAttribute('data-id'))};
  return null;
}
root.addEventListener('mouseover',function(e){var t=popTarget(e);if(t)showPop(t.pop,t.trigger,t.html)});
root.addEventListener('mouseout',function(e){
  var t=e.target.closest('[data-help],[data-detail]');
  if(!t||t.contains(e.relatedTarget))return;
  delayHidePops();
});
root.addEventListener('focusin',function(e){var t=popTarget(e);if(t)showPop(t.pop,t.trigger,t.html)});
root.addEventListener('focusout',function(e){
  var t=e.target.closest('[data-help],[data-detail]');
  if(t&&!t.contains(e.relatedTarget))delayHidePops();
});
[helpPop,detailPop].forEach(function(p){
  if(!p)return;
  p.addEventListener('mouseenter',function(){clearTimeout(popActive.timer)});
  p.addEventListener('mouseleave',delayHidePops);
});
window.addEventListener('resize',function(){if(popActive.trigger&&popActive.pop)positionPop(popActive.pop,popActive.trigger)});
document.addEventListener('scroll',hideAllPops,true);

/* ---------- 字段解释弹窗 ---------- */
// 弹窗按业务上下文保留用户提供的定义，避免同名字段跨 Tab 覆盖。
var FIELD_HELP_SECTIONS=[
  {
    "title": "快捷任务定义",
    "items": [
      {
        "name": "今日注册",
        "definition": "用户注册时间是当天。"
      },
      {
        "name": "已登录未首启",
        "definition": "用户已经完成登录，但还没有任何一次成功启动环境。"
      },
      {
        "name": "已首启未付费",
        "definition": "用户已经成功启动过环境，但还没有产生真实付费，包括充值、购买代理/套餐。"
      },
      {
        "name": "7天内到期",
        "definition": "用户存在有效的套餐/代理，且最近到期时间距离当前日期小于等于 7 天。"
      },
      {
        "name": "消费流失用户",
        "definition": "用户历史上产生过真实消费，但当前已经达到流失状态。历史真实消费金额 > 0，且当前无有效套餐或代理，并且套餐或代理到期后超过 30 天未发生续费、新购或余额购买。直接购买代理、直接购买套餐、用余额购买代理或套餐均算；充值本身不算消费，赠送不算真实消费。"
      },
      {
        "name": "到期未续费",
        "definition": "用户最近的套餐/代理已经到期，但到期后尚未续费。"
      },
      {
        "name": "拉起未支付",
        "definition": "用户已经进入购买套餐/代理/充值的支付流程，但没有完成支付。"
      },
      {
        "name": "高潜未付费",
        "definition": "用户尚未真实付费，但行为上已经表现出较高转化潜力。未产生真实付费，且满足以下条件中的任意两个及以上：已创建环境、已配置代理、已成功启动、业务画像明确(只要其中一个环境绑定平台账号就算业务画像明确)。"
      },
      {
        "name": "首启失败",
        "definition": "用户尝试启动环境但没有成功完成首次启动。失败原因必须记录：代理不可用、环境配置异常、客户端异常、网络异常、账号权限异常、未知。"
      },
      {
        "name": "多团队用户",
        "definition": "用户账号下团队数量等于或大于2个。"
      },
      {
        "name": "流失风险",
        "definition": "用户尚未完全流失，但已经出现明显流失信号。满足以下任意一项即可归为流失风险：7 天内到期（套餐/代理）且无续费动作、近 7 天无成功启动环境、近 30 天无消费、7天内到期（套餐/代理）且无登录。"
      }
    ]
  },
  {
    "title": "快捷任务交互",
    "items": [
      {
        "name": "交互规则",
        "definition": "每个快捷任务显示名称 + 人数"
      },
      {
        "name": "交互规则",
        "definition": "点击后高亮当前任务"
      },
      {
        "name": "交互规则",
        "definition": "再次点击取消"
      },
      {
        "name": "交互规则",
        "definition": "可与筛选面板条件叠加"
      },
      {
        "name": "交互规则",
        "definition": "切换 Tab 后快捷任务仍然生效"
      }
    ]
  },
  {
    "title": "用户识别 Tab 汇总",
    "items": [
      {
        "name": "当前结果",
        "definition": "列表下的总用户数。"
      },
      {
        "name": "真实用户",
        "definition": "列表下的总用户数减去测试用户数。"
      },
      {
        "name": "测试用户",
        "definition": "有标记为测试用户或者账号是以@cl.test结尾的用户数。"
      },
      {
        "name": "禁用用户",
        "definition": "标记为禁用的用户数。"
      },
      {
        "name": "信息缺失用户",
        "definition": "关键识别字段缺失，导致客服、运营、销售无法准确识别或跟进的用户。手机号 / 邮箱为空、用户ID为空、当前团队ID为空、账号状态为空、注册时间为空，满足任意一项即计入。"
      }
    ]
  },
  {
    "title": "来源归因 Tab 汇总",
    "items": [
      {
        "name": "当前结果",
        "definition": "列表下的总用户数。"
      },
      {
        "name": "已归因用户",
        "definition": "能够明确判断来源渠道的用户，来源渠道不为空。"
      },
      {
        "name": "未归因用户",
        "definition": "无法明确判断来源渠道的用户，来源渠道为空或为其他。"
      },
      {
        "name": "TOP来源渠道",
        "definition": "列表数据中，排名第一的来源渠道。"
      },
      {
        "name": "销售链接用户",
        "definition": "列表中来源渠道是销售专属链接的。"
      }
    ]
  },
  {
    "title": "生命周期行为 Tab 汇总",
    "items": [
      {
        "name": "当前结果",
        "definition": "列表下的总用户数。"
      },
      {
        "name": "首下载率",
        "definition": "有首次下载时间的用户数除以总用户数。"
      },
      {
        "name": "启动率",
        "definition": "启动环境的用户数除以总用户数。"
      },
      {
        "name": "成功启动率",
        "definition": "成功启动环境的用户数量除以启动环境的用户数量"
      },
      {
        "name": "首单率",
        "definition": "有首单时间的用户数除以总用户数。"
      },
      {
        "name": "TOP卡点",
        "definition": "列表数据中，排名第一的当前卡点。"
      }
    ]
  },
  {
    "title": "团队主体关系 Tab 汇总",
    "items": [
      {
        "name": "当前结果",
        "definition": "列表下的总用户数。"
      },
      {
        "name": "多团队用户",
        "definition": "列表用户账号下团队数量等于或大于2个。"
      },
      {
        "name": "团队不一致",
        "definition": "用户在关键行为中涉及多个不同团队主体，初始团队ID、当前团队ID、首启团队ID、首单团队ID （用户的消费订单是归属与哪个团队）中存在两个及以上非空且不一致的团队ID。"
      },
      {
        "name": "首启团队缺失",
        "definition": "首次成功启动时间不为空，且首启团队ID为空。"
      },
      {
        "name": "首单团队缺失",
        "definition": "首单时间不为空，且首单团队ID为空。"
      }
    ]
  },
  {
    "title": "付费消费 Tab 汇总",
    "items": [
      {
        "name": "当前结果",
        "definition": "列表下的总用户数。"
      },
      {
        "name": "真实消费用户",
        "definition": "产生过真实消费的用户。支付宝微信购买代理/套餐、用余额购买代理/套餐。购买后退款也计入"
      },
      {
        "name": "净消费金额",
        "definition": "用户在当前筛选范围内实际消费在云登服务上的金额。计算公式：净消费金额 = 代理消费金额 + 套餐消费金额 + 其他有效服务消费金额 - 退款金额。计入口径：直接支付购买代理 / 套餐、用余额购买代理 / 套餐均计入。不计入口径：充值金额本身不计入，赠送金额不计入，测试订单不计入。"
      },
      {
        "name": "首单用户",
        "definition": "首次购买代理或首次购买套餐或首次充值的用户数量，购买后退款也计入。"
      },
      {
        "name": "复购用户",
        "definition": "对代理或套餐或进行再次或续费，购买后退款也计入。"
      },
      {
        "name": "余额消费用户",
        "definition": "用余额进行套餐或代理购买，购买后退款也计入。"
      }
    ]
  },
  {
    "title": "套餐资源 Tab 汇总",
    "items": [
      {
        "name": "当前结果",
        "definition": "列表下的总用户数。"
      },
      {
        "name": "有效套餐用户",
        "definition": "当前套餐还在有效期内。"
      },
      {
        "name": "7天内到期",
        "definition": "当前套餐/代理最近到期时间距离当前日期小于等于 7 天。"
      },
      {
        "name": "30天内到期",
        "definition": "当前套餐/代理最近到期时间距离当前日期小于等于 30 天。"
      },
      {
        "name": "购买过代理用户",
        "definition": "用户曾经购买过代理，退款也计入。"
      },
      {
        "name": "购买过套餐用户",
        "definition": "用户曾经购买过套餐，退款也计入。"
      }
    ]
  },
  {
    "title": "全部字段 Tab 汇总",
    "items": [
      {
        "name": "当前结果",
        "definition": "列表下的总用户数。"
      },
      {
        "name": "真实用户",
        "definition": "列表下的总用户数减去测试用户数。"
      },
      {
        "name": "测试用户",
        "definition": "有标记为测试用户或者账号是以@cl.test结尾的用户数。"
      },
      {
        "name": "禁用用户",
        "definition": "标记为禁用的用户数。"
      }
    ]
  },
  {
    "title": "列表字段 · 用户识别",
    "items": [
      {
        "name": "用户ID",
        "definition": "用户全局唯一标识。"
      },
      {
        "name": "手机号 / 邮箱",
        "definition": "用户当前手机号/邮箱。"
      },
      {
        "name": "曾用手机号 / 邮箱",
        "definition": "用户历史绑定过的手机号/邮箱。"
      },
      {
        "name": "注册时间",
        "definition": "用户注册时间"
      },
      {
        "name": "注册类型",
        "definition": "手机号/邮箱"
      },
      {
        "name": "付费状态",
        "definition": "付费/未付费。这个用户，是否进行过付费。可以是在其他团队产生的支付。"
      },
      {
        "name": "账号状态",
        "definition": "正常/异常。用户是否为同 IP 注册异常用户。"
      },
      {
        "name": "测试用户",
        "definition": "是/否。用户是否被标记为测试或账号是否以@cl.test结尾"
      },
      {
        "name": "是否禁用",
        "definition": "是/否。用户是否被标记禁用。"
      },
      {
        "name": "禁用支付",
        "definition": "用户是否被加入支付黑名单，禁用支付操作。"
      }
    ]
  },
  {
    "title": "列表字段 · 来源归因",
    "items": [
      {
        "name": "用户ID",
        "definition": "用户全局唯一标识。"
      },
      {
        "name": "手机号 / 邮箱",
        "definition": "用户当前手机号/邮箱。"
      },
      {
        "name": "注册时间",
        "definition": "用户注册时间"
      },
      {
        "name": "渠道分类",
        "definition": "后台配置"
      },
      {
        "name": "来源渠道",
        "definition": "后台配置"
      },
      {
        "name": "关键词",
        "definition": "推广关键词名称，详情见文件。"
      },
      {
        "name": "来源页面",
        "definition": "用户进入或注册来源页面，取后台的值。"
      },
      {
        "name": "搜索词",
        "definition": "搜索推广场景下的搜索词。"
      },
      {
        "name": "落地页",
        "definition": "用户注册前最后一次进入的承接页面。"
      },
      {
        "name": "邀请人 / 归因人",
        "definition": "带来该用户注册具体人或账号。\\n内容示例：销售人员名称、用户ID"
      },
      {
        "name": "归属销售",
        "definition": "CRM 归属销售人员。"
      }
    ]
  },
  {
    "title": "列表字段 · 生命周期行为",
    "items": [
      {
        "name": "用户ID",
        "definition": "用户全局唯一标识。"
      },
      {
        "name": "手机号 / 邮箱",
        "definition": "用户当前手机号/邮箱。"
      },
      {
        "name": "生命周期阶段",
        "definition": "用户当前在核心经营路径中所处的最远阶段。\\n阶段枚举：\\n新注册：已注册，但未下载客户端。\\n已下载未登录：已有首次下载时间，但没有首次客户端登录时间。\\n已登录未建环境：已有首次客户端登录时间，但没有首次创建环境时间。\\n已建环境未配置代理：已有首次创建环境时间，但没有首次配置代理时间。\\n已配置代理未首启：已有首次配置代理时间，但没有首次成功启动时间。\\n首启失败：存在首启失败记录，且没有首次成功启动时间。\\n已首启未付费：已有首次成功启动时间，但没有真实付费消费。\\n拉起支付未完成：存在支付拉起或待支付订单，但没有完成支付。\\n已首单未复购：已有首单时间，但复购次数为 0。\\n已复购：复购次数大于 0。\\n套餐即将到期：存在有效套餐，且最近到期时间在未来 7 天内。\\n到期未续费：最近到期时间已过，且到期后没有续费、新购或余额购买代理/环境。\\n阶段优先级：按用户实际走到的最远有效阶段展示"
      },
      {
        "name": "流失风险",
        "definition": "用户尚未完全流失，但已经出现明显流失信号。满足以下任意一项即可归为流失风险：7 天内到期（套餐/代理）且无续费动作、近 7 天无成功启动环境、近 30 天无消费、7天内到期（套餐/代理）且无登录。"
      },
      {
        "name": "当前卡点",
        "definition": "阻碍用户进入下一步核心转化路径的主要问题。\\n卡点枚举：\\n未下载客户端\\n已下载未登录\\n未创建环境\\n未配置代理\\n代理不可用\\n首启失败\\n已首启未付费：包含套餐/代理/充值\\n拉起支付未完成：包含套餐/代理/充值\\n已首单未复购：包含套餐/代理\\n到期未续费：包含套餐/代理\\n长期未活跃：7天内无登录\\n无\\n优先级：按用户实际走到的最远卡点展示"
      },
      {
        "name": "注册时间",
        "definition": "用户注册时间"
      },
      {
        "name": "首次下载时间",
        "definition": "用户第一次下载客户端时间。如果是先下载后注册，则那下载时间既为注册时间。如果是先注册后下载，则可取到下载时间。"
      },
      {
        "name": "下载客户端",
        "definition": "终端及版本号"
      },
      {
        "name": "首次客户端登录",
        "definition": "首次在客户端登录的时间。"
      },
      {
        "name": "首次加入团队",
        "definition": "用户第一次加入团队的时间。"
      },
      {
        "name": "首次创建环境",
        "definition": "用户第一次创建浏览器环境的时间。"
      },
      {
        "name": "首次配置代理",
        "definition": "用户第一次为环境配置代理的时间。环境绑定平台代理、自有代理、API代理中的任意一种，并保存成功。"
      },
      {
        "name": "首次成功启动",
        "definition": "用户第一次成功启动浏览器环境的时间。"
      },
      {
        "name": "第二次成功启动",
        "definition": "用户第二次成功启动浏览器环境的时间。"
      },
      {
        "name": "首启失败次数",
        "definition": "用户从注册后到首次成功启动前，尝试启动但失败的次数。"
      },
      {
        "name": "首启失败原因",
        "definition": "用户首启失败的主要原因。与首启失败次数相对应。5次就有5个原因，展示1原因，2原因，3原因\\n原因枚举：\\n未知原因\\n用户权限不足\\n客户端未正常运行或通信异常\\n10 秒内重复启动同一环境\\n环境缺少代理配置\\n官方平台代理不可用\\n本地未安装该环境所需内核\\n本地内核文件不可用\\n当前客户端不支持所需能力\\n当前系统不满足内核要求\\n官方平台代理要求实名认证\\n可启动环境数量已用完\\n当前产品或客户端没有该内核"
      },
      {
        "name": "首单时间",
        "definition": "用户首次下单的时间，包括套餐/代理/充值，退款也计入。"
      },
      {
        "name": "首单金额",
        "definition": "用户首次下单的金额，包括套餐/代理/充值，退款也计入。。"
      },
      {
        "name": "首单产品",
        "definition": "套餐/代理/充值。"
      },
      {
        "name": "复购次数",
        "definition": "用户首单之后再次发生真实消费的次数，退款也计入。"
      },
      {
        "name": "最近消费时间",
        "definition": "最近一次购买/续费，代理/套餐的时间，退款也计入。"
      }
    ]
  },
  {
    "title": "列表字段 · 团队主体关系",
    "items": [
      {
        "name": "用户ID",
        "definition": "用户全局唯一标识。"
      },
      {
        "name": "手机号 / 邮箱",
        "definition": "用户当前手机号/邮箱。"
      },
      {
        "name": "初始团队ID",
        "definition": "用户创建账号后，默认的团队ID。"
      },
      {
        "name": "初始团队名",
        "definition": "用户创建账号后，默认的团队名。"
      },
      {
        "name": "当前团队ID",
        "definition": "用户当前团队ID。"
      },
      {
        "name": "当前团队名",
        "definition": "用户当前团队名。"
      },
      {
        "name": "团队数",
        "definition": "当前账号中团队的数量。"
      },
      {
        "name": "是否多团队",
        "definition": "是/否"
      },
      {
        "name": "是否被邀请",
        "definition": "用户是否由邀请产生，以及邀请人/邀请来源信息。"
      },
      {
        "name": "关联账号",
        "definition": "用户是否关联/使用微信/钉钉登录。"
      },
      {
        "name": "首启团队ID",
        "definition": "用户第一次成功启动环境时，该环境所属的团队ID。"
      },
      {
        "name": "首单团队ID",
        "definition": "用户第一次真实消费订单归属的团队ID。"
      },
      {
        "name": "关联团队",
        "definition": "这个用户所在的其他团队。需要展示团队ID和付费金额。"
      },
      {
        "name": "关联团队总消费金额",
        "definition": "这个用户所有团队的总计付费金额。"
      }
    ]
  },
  {
    "title": "列表字段 · 付费消费",
    "items": [
      {
        "name": "用户ID",
        "definition": "用户全局唯一标识。"
      },
      {
        "name": "手机号 / 邮箱",
        "definition": "用户当前手机号/邮箱。"
      },
      {
        "name": "付费状态",
        "definition": "付费/未付费"
      },
      {
        "name": "首次付费时间",
        "definition": "第一次产生付费的时间，包含代理/套餐/充值，退款也计入。"
      },
      {
        "name": "首次消费月份",
        "definition": "第一次产生消费的时间，退款也计入。"
      },
      {
        "name": "首单金额",
        "definition": "第一次产生消费的时间，退款的是否计入。"
      },
      {
        "name": "首单产品",
        "definition": "第一次产生消费的产品，代理/套餐，退款的是否计入。"
      },
      {
        "name": "总付费金额",
        "definition": "用户累计付费金额。"
      },
      {
        "name": "已消费金额",
        "definition": "用户累计消费金额。"
      },
      {
        "name": "账户余额",
        "definition": "用户当前账户余额。"
      },
      {
        "name": "赠送金额",
        "definition": "用户账户内赠送金额。"
      },
      {
        "name": "最近消费时间",
        "definition": "最近一次购买/续费，代理/套餐的时间，退款不计入。"
      },
      {
        "name": "复购次数",
        "definition": "用户首单之后再次发生真实消费的次数，退款不计入。"
      },
      {
        "name": "是否拉起支付",
        "definition": "用户是触发待支付/拉起支付流程的时间。用户有过这个行为，就记录是。"
      },
      {
        "name": "最后待支付时间",
        "definition": "最近一次拉起支付但未完成支付的时间。"
      }
    ]
  },
  {
    "title": "列表字段 · 套餐资源",
    "items": [
      {
        "name": "用户ID",
        "definition": "用户全局唯一标识。"
      },
      {
        "name": "手机号 / 邮箱",
        "definition": "用户当前手机号/邮箱。"
      },
      {
        "name": "套餐购买次数",
        "definition": "套餐购买过多少次，退款的也计入。"
      },
      {
        "name": "环境数",
        "definition": "总环境数"
      },
      {
        "name": "平台代理数",
        "definition": "用户购买的平台代理总数/当前正常运行的平台代理数/未来 7 日内到期的平台代理数"
      },
      {
        "name": "自有代理数",
        "definition": "用户自有代理总数量/已绑定环境的自有代理数量"
      },
      {
        "name": "三方代理数",
        "definition": "用户三方代理总数量/已绑定环境的三方代理数量"
      },
      {
        "name": "API代理数",
        "definition": "用户 API 代理总数量、已绑定环境的 API 代理数量"
      },
      {
        "name": "套餐周期",
        "definition": "套餐生效开始时间-套餐到期结束时间"
      },
      {
        "name": "最近到期时间",
        "definition": "代理/套餐最近到期的时间"
      },
      {
        "name": "7天内到期",
        "definition": "代理/套餐当前是否在7天内到期。是/否"
      },
      {
        "name": "30天内到期",
        "definition": "代理/套餐当前是否在30天内到期。是/否"
      },
      {
        "name": "成员数",
        "definition": "当前用户下所有企业累计成员总数。"
      },
      {
        "name": "赠送环境数",
        "definition": "当前用户总赠送环境数。"
      },
      {
        "name": "赠送成员数",
        "definition": "当前用户总赠送成员数。"
      },
      {
        "name": "赠送周期",
        "definition": "赠送环境和赠送成员生效开始时间-赠送到期结束时间。"
      }
    ]
  }
];
function renderFieldModal(){
  $('opsFieldModalBody').innerHTML=FIELD_HELP_SECTIONS.map(function(section){
    return '<section><h3 class="ops-field-group-title">'+esc(section.title)+'</h3>'+section.items.map(function(item){
      return '<div class="ops-field-row"><span class="ops-field-name">'+esc(item.name)+'</span><span class="ops-field-def">'+esc(item.definition)+'</span></div>';
    }).join('')+'</section>';
  }).join('');
}
root.addEventListener('click',function(e){var t=e.target.closest('[data-ops-team]');if(!t)return;var u=users.find(function(x){return x.id===t.getAttribute('data-ops-team')});$('opsFieldModal').querySelector('strong').textContent='关联团队';$('opsFieldModalBody').innerHTML='<div class="ops-field-row">'+esc(u.linkedTeams)+'</div>';$('opsFieldModal').classList.remove('hidden')});
function openModal(){$('opsFieldModal').querySelector('strong').textContent='字段解释';renderFieldModal();$('opsFieldModal').classList.remove('hidden')}
function closeModal(){$('opsFieldModal').classList.add('hidden')}
$('opsFieldHelpBtn').addEventListener('click',openModal);
$('opsFieldModalClose').addEventListener('click',closeModal);
$('opsFieldModalOk').addEventListener('click',closeModal);
$('opsFieldModal').addEventListener('click',function(e){if(e.target===this)closeModal()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeModal();hideAllPops()}});

/* ---------- 事件 ---------- */
$('opsDataTabs').addEventListener('click',function(e){
  var t=e.target.closest('[data-ops-tab]');
  if(!t)return;
  state.tab=t.getAttribute('data-ops-tab');state.page=1;render();
});
$('opsQuickTabs').addEventListener('click',function(e){
  var t=e.target.closest('[data-ops-quick]');
  if(!t)return;
  state.quick=state.quick===t.getAttribute('data-ops-quick')?'':t.getAttribute('data-ops-quick');
  state.page=1;render();
});
$('opsPager').addEventListener('click',function(e){
  var t=e.target.closest('[data-ops-page]');
  if(!t||t.disabled)return;
  var pages=pageCount(filtered().length);
  var p=Number(t.getAttribute('data-ops-page'));
  if(p<1||p>pages)return;
  state.page=p;render();
  $('opsTableWrap').scrollTop=0;
});
$('opsFilterForm').addEventListener('submit',function(e){
  e.preventDefault();
  state.keyword=$('opsAccountFilter').value.trim();
  state.filters={regType:$('opsRegType').value,lifecycle:$('opsLifecycle').value,channelCat:$('opsChannelCat').value,accountStatus:$('opsAccountStatus').value,paid:$('opsPaidStatus').value};
  var type=$('opsUserType').value;if(type!=='全部')state.filters.isTest=type==='测试用户'?'是':'否';
  var relation=$('opsTeamRelation').value;if(relation==='被邀请')state.filters.invited='是';else if(relation)state.filters.multiTeam=relation==='多团队'?'是':'否';
  state.page=1;render();
});
$('opsReset').addEventListener('click',function(){
  $('opsAccountFilter').value='';
  ['opsRegType','opsLifecycle','opsChannelCat','opsTeamRelation','opsAccountStatus','opsPaidStatus'].forEach(function(id){$(id).value=''});
  $('opsUserType').value='真实用户';
  state.keyword='';state.quick='';state.filters={};state.page=1;
  var form=$('opsFilterForm');
  collapsed=false;form.classList.remove('is-collapsed');
  var tg=$('opsCollapse');tg.setAttribute('aria-expanded','true');tg.innerHTML='收起<i data-lucide="chevron-up"></i>';
  render();
});
root.addEventListener('input',function(e){
  var t=e.target.closest('#opsAccountFilter');
  if(!t)return;
  var btn=root.querySelector('[data-ops-clear="opsAccountFilter"]');
  if(btn)btn.classList.toggle('is-show',!!t.value);
});
root.addEventListener('click',function(e){
  var c=e.target.closest('[data-ops-clear]');
  if(!c)return;
  var input=$(c.getAttribute('data-ops-clear'));
  if(input){input.value='';c.classList.remove('is-show');state.keyword='';state.page=1;render();input.focus()}
});
$('opsExport').addEventListener('click',function(){
  var toast=document.createElement('div');
  toast.className='app-toast';
  toast.textContent='已发起导出任务，完成后可在下载中心查看';
  document.getElementById('appToastContainer').append(toast);
  setTimeout(function(){toast.remove()},2600);
});
var collapsed=false;
$('opsCollapse').addEventListener('click',function(){
  collapsed=!collapsed;
  $('opsFilterForm').classList.toggle('is-collapsed',collapsed);
  this.setAttribute('aria-expanded',String(!collapsed));
  this.innerHTML=collapsed?'展开<i data-lucide="chevron-down"></i>':'收起<i data-lucide="chevron-up"></i>';
  window.lucide&&window.lucide.createIcons();
});

render();
})();`
  ],
  usesAnnotations: false,
  before: [],
  after: []
};
