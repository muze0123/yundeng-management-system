/* 出海吧 · 业务模块（一级菜单「出海吧」，侧栏末尾）
 * 双 Tab：网站管理（搜索 / 增删改 / 拖拽排序 / 精选开关）+ 类型管理（ico / 名称 / 拖拽排序）。
 * 数据契约与独立页面 exports/出海吧-独立页面.html 共享：localStorage `yundeng_overseas_nav_v1`，
 * 结构见 PRD/出海吧PRD.md 第二章（共享契约权威）；独立页页面侧细则见 PRD/出海吧独立页PRD.md；
 * 后台写、独立页面读（storage 事件跨标签联动）。
 * 图标策略：上传 dataURL 优先；否则按网址域名自动匹配 favicon（favicon.im），失败降级首字母色块。
 */
window.YundengModules = window.YundengModules || {};
window.YundengModules['overseas-nav'] = {
  id: 'overseas-nav',
  file: 'index.html?page=overseas-nav',
  title: '出海吧',
  styleLinks: [],
  scripts: [],
  styles: [`
    /* ---------- 基础与按钮（design.md §5.1，跨模块按钮标准） ---------- */
    .on-module{color:#3A3F4A;font-size:13px;min-width:0}
    .on-module .btn{display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 14px;gap:6px;border:1px solid #DFE1E5;border-radius:4px;font-size:13px;font-weight:500;background:#fff;color:#3A3F4A;white-space:nowrap;cursor:pointer;transition:background .15s,border-color .15s,color .15s}
    .on-module .btn-primary{background:#0066FF;border-color:#0066FF;color:#fff}
    .on-module .btn-primary:hover{background:#0052CC;border-color:#0052CC}
    .on-module .btn-primary:active{background:#0047B3;border-color:#0047B3}
    .on-module .btn-default:hover{background:#E6F0FF;border-color:#0066FF;color:#0066FF}
    .on-module .btn:disabled{background:#F7F8FA;border-color:#DFE1E5;color:#9DA2AC;cursor:not-allowed}
    /* 焦点态单一指示铁律（design.md §5.13） */
    .on-module .control:focus-visible{outline:none;outline-offset:0}
    .on-module :is(button,input,select):not(.control):not(.pg-jump-input):focus-visible{outline:2px solid #0066FF;outline-offset:2px}
    .on-module button{cursor:pointer}
    .on-module svg{width:16px;height:16px;flex:none}

    /* ---------- 一级 Tab（design.md §5.0：下划线式主 Tab，非分段控件） ---------- */
    .on-module .on-primary-tabs{display:flex;min-width:0;gap:4px;margin:0 0 20px;padding:0;border-bottom:1px solid #E8EAED;overflow-x:auto;scrollbar-width:none}
    .on-module .on-primary-tabs::-webkit-scrollbar{display:none}
    .on-module .on-primary-tab{position:relative;display:inline-flex;align-items:center;min-height:42px;padding:0 16px;border:0;border-bottom:2px solid transparent;background:transparent;color:#6E7685;font:inherit;font-size:14px;white-space:nowrap;transition:color .15s,background .15s}
    .on-module .on-primary-tab:hover{color:#1A1D24;background:#F3F4F6}
    .on-module .on-primary-tab.is-active{color:#0066FF;border-bottom-color:#0066FF;font-weight:600}

    /* ---------- 筛选区（design.md §5.4：388px 栅格 + 右对齐标签 + 查询/重置末尾操作组） ---------- */
    .on-module .filter-flow{display:grid;grid-template-columns:repeat(auto-fill,minmax(388px,1fr));align-items:center;column-gap:16px;row-gap:12px;width:100%}
    .on-module .filter-item{display:flex;align-items:center;min-width:0}
    .on-module .filter-label{width:88px;flex:none;text-align:right;white-space:nowrap;font-size:13px;color:#3A3F4A}
    .on-module .filter-label::after{content:'：'}
    .on-module .filter-control{position:relative;width:300px;max-width:calc(100% - 88px);flex:none}
    .on-module .control{width:100%;height:32px;border:1px solid #DFE1E5;border-radius:4px;padding:0 8px;background:#fff;color:#3A3F4A;font:inherit;font-size:14px;outline:none}
    .on-module .control::placeholder{color:#9DA2AC}
    .on-module .control:focus{border-color:#0066FF;box-shadow:0 0 0 2px rgba(0,102,255,.12)}
    .on-module .search-control input{padding-right:32px}
    .on-module .input-clear{position:absolute;right:8px;top:8px;border:0;padding:0;background:transparent;color:#9DA2AC;line-height:1}
    .on-module .input-clear:hover{color:#6E7685}
    .on-module .filter-actions{display:flex;align-items:center;gap:12px}
    /* filter-flow 使用 grid，需显式声明 hidden 生效（切到「类型管理」时隐藏筛选条件） */
    .on-module .filter-flow[hidden]{display:none}
    .on-module select.control{appearance:none;padding-right:24px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239DA2AC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center}
    /* 下拉未选择时（占位项「请选择类型」/ 无可选类型）显示为占位灰，选中真实值后恢复正文色 */
    .on-module select.control.is-placeholder{color:#9DA2AC}

    /* ---------- 数据区（design.md §5.2 / §5.3） ---------- */
    .on-list-head{display:flex;align-items:center;gap:8px;margin-bottom:12px}
    .on-list-head h2{font-size:16px;font-weight:600;color:#1A1D24;margin:0}
    .on-list-head .on-count{font-size:12px;color:#9DA2AC}
    .on-list-head .on-head-actions{margin-left:auto;display:flex;gap:8px}
    .on-scroll{overflow-x:auto;max-width:100%}
    .on-module .data-table{width:100%;border-collapse:collapse;font-size:13px}
    .on-module .data-table th{background:#F0F1F3;color:#6E7685;font-weight:600;font-size:12px;padding:9px 12px;border-bottom:1px solid #DFE1E5;text-align:left;white-space:nowrap}
    .on-module .data-table td{padding:9px 12px;border-bottom:1px solid #F0F1F3;font-size:13px;color:#3A3F4A;text-align:left;vertical-align:middle}
    .on-module .data-table tbody tr:hover{background:#F3F4F6}
    .on-module .data-table tbody tr.is-dragover{box-shadow:inset 0 2px 0 #0066FF}
    .on-module .font-mono{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}
    .on-site-name{display:flex;align-items:center;gap:8px;min-width:0}
    .on-site-icon{width:28px;height:28px;border-radius:6px;flex:none;object-fit:contain;background:#F7F8FA;border:1px solid #F0F1F3}
    .on-url{color:#6E7685;max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}
    .on-intro{color:#6E7685;max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;cursor:default}
    /* 简介气泡：行级浮层（design.md §5.9 口径——宽度上限 280px、超长换行）；
       使用 fixed 定位，避免被表格横向滚动容器裁切 */
    .on-pop{position:fixed;z-index:1300;width:280px;max-width:calc(100vw - 32px);background:#fff;border:1px solid #E8EAED;border-radius:6px;box-shadow:0 6px 24px rgba(0,0,0,.12);padding:10px 12px;font-size:12px;color:#3A3F4A;line-height:18px;word-break:break-word}
    .on-pop[hidden]{display:none}
    /* 精选星标：点击设为推荐 / 再次点击取消推荐 */
    .on-star{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:0;border-radius:4px;background:transparent;color:#9DA2AC;transition:background .15s,color .15s}
    .on-star svg{width:18px;height:18px}
    .on-star:hover{background:#FDF2E9;color:#E7772D}
    .on-star.is-on{color:#E7772D}
    .on-star.is-on svg{fill:currentColor}
    .on-link{border:0;background:none;padding:0;color:#0066FF;font-size:13px}
    .on-link:hover{text-decoration:underline}
    .on-link-danger{color:#D9001B}
    .on-link + .on-link{margin-left:12px}
    .on-drag-handle{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:4px;color:#9DA2AC;cursor:grab;touch-action:none}
    .on-drag-handle:hover{background:#E6F0FF;color:#0066FF}
    .on-drag-handle:active{cursor:grabbing}
    .on-drag-handle.is-disabled{cursor:not-allowed;opacity:.4;pointer-events:none}

    /* ---------- 弹窗（design.md §5.6） ---------- */
    .on-overlay{position:fixed;inset:0;background:rgba(0,0,0,.3);z-index:1200;display:flex;align-items:center;justify-content:center}
    .on-overlay[hidden]{display:none}
    .on-modal{width:760px;max-width:92vw;max-height:88vh;overflow-y:auto;background:#fff;border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,.12);animation:on-modal-in .15s ease}
    .on-modal-sm{width:600px;height:250px;max-height:none;overflow:visible;display:flex;flex-direction:column;position:relative}
    @keyframes on-modal-in{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}
    /* Dialog 专用（design.md §5.8）：底部操作区无分隔线、按钮 padding 6px 20px */
    .on-modal-sm .on-modal-footer{border-top:0;padding:0 24px 20px}
    .on-modal-sm .btn{height:30px;padding:0 20px;font-size:13px}
    .on-modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px 0}
    .on-modal-header h3{margin:0;font-size:16px;font-weight:600;color:#1A1D24}
    .on-modal-close{border:0;background:none;font-size:20px;color:#9DA2AC;line-height:1;padding:4px}
    .on-modal-close:hover{color:#6E7685}
    .on-modal-body{padding:32px 24px}
    /* 表单字段区块在弹窗内容区居中（design.md §5.6：标签 90px 右对齐 + 控件 400px） */
    .on-module .on-modal-body>.on-field{max-width:490px;margin-left:auto;margin-right:auto}
    .on-modal-footer{display:flex;justify-content:flex-end;gap:12px;padding:16px 24px 20px;border-top:1px solid #E8EAED}
    .on-field{display:flex;align-items:flex-start;margin-bottom:16px}
    .on-field:last-child{margin-bottom:0}
    .on-field-label{width:90px;flex:none;text-align:right;font-size:13px;color:#3A3F4A;line-height:30px}
    .on-field-label::after{content:'：'}
    .on-field-label .req{color:#D9001B;margin-right:2px}
    .on-field-control{width:400px;max-width:100%;position:relative}
    /* 弹窗内单行输入 / 下拉高度 30px（design.md §5.6），textarea 不受影响 */
    .on-module .on-modal input.control,.on-module .on-modal select.control{height:30px}
    .on-field-help{font-size:12px;color:#9DA2AC;margin-top:4px}
    .on-field-error{font-size:12px;color:#D9001B;margin-top:4px;display:none}
    .on-field.is-error .on-field-error{display:block}
    .on-field.is-error .control{border-color:#D9001B}
    .on-counter{position:absolute;right:8px;top:8px;font-size:12px;color:#9DA2AC;pointer-events:none}
    /* 多行文本域：高度 60px。
       ⚠️ 必须带作用域前缀且用 textarea.control（元素实际 class 为 control），
       否则会输给基类 .on-module .control{height:32px;padding:0 8px} 的优先级 → 高度一直是 32px。
       计数器置于输入框内右下角（按用户要求；design.md §5.9 原口径为控件外下方，差异已记入 PRD），
       padding-bottom 预留 22px，避免输入文字与计数器重叠 */
    .on-counter-below{position:absolute;right:8px;bottom:6px;margin:0;text-align:right;font-size:12px;color:#9DA2AC;pointer-events:none}
    .on-module .on-modal textarea.control{height:60px;min-height:60px;padding:6px 8px 22px;resize:vertical;font-family:inherit;line-height:20px}
    .on-module .on-textarea-wrap textarea.control{padding-right:8px}

    /* 图标上传区 */
    .on-icon-row{display:flex;align-items:center;gap:12px}
    .on-icon-preview{width:48px;height:48px;border-radius:8px;border:1px solid #DFE1E5;background:#F7F8FA;display:flex;align-items:center;justify-content:center;overflow:hidden;flex:none}
    .on-icon-preview img{width:100%;height:100%;object-fit:contain}
    .on-icon-actions{display:flex;flex-direction:column;gap:6px}
    .on-icon-actions .btn{height:28px;padding:0 12px;font-size:12px}

    /* Toggle（design.md §5.9） */
    .on-toggle{position:relative;width:40px;height:22px;border-radius:11px;background:#C7CAD1;border:0;transition:background .2s;flex:none}
    .on-toggle::after{content:'';position:absolute;left:2px;top:2px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .2s}
    .on-toggle.on{background:#0066FF}
    .on-toggle.on::after{transform:translateX(18px)}

    /* 空态 */
    .on-empty{text-align:center;padding:40px 0;color:#9DA2AC}
    .on-empty svg{display:block;width:32px;height:32px;margin:0 auto 12px}

    /* toast */
    .on-toast-wrap{position:fixed;top:68px;left:50%;transform:translateX(-50%);z-index:2000;display:flex;flex-direction:column;gap:8px;align-items:center}
    .on-toast{background:#1A1D24;color:#fff;font-size:13px;padding:8px 16px;border-radius:4px;box-shadow:0 6px 24px rgba(0,0,0,.12);animation:on-modal-in .15s ease}

    @media(max-width:800px){
      .on-field{flex-direction:column;gap:6px}
      .on-field-label{width:auto;text-align:left;line-height:20px}
      .on-field-control{width:100%}
      .on-list-head{flex-wrap:wrap}
    }
  `],
  html: `<section class="app-business-module on-module p-4" data-module-root="overseas-nav" aria-label="出海吧">
  <!-- 区块 1：一级 Tab + 筛选区（「类型管理」无筛选条件，其数据列表并入本区块，见 design.md §5.0） -->
  <section class="w-full max-w-none bg-white rounded-lg border-0 p-5 md:p-6 mb-4">
    <div class="on-primary-tabs" role="tablist" aria-label="出海吧管理">
      <button type="button" class="on-primary-tab is-active" data-tab="sites" role="tab" aria-selected="true" aria-controls="ov-panel-sites">网站管理</button>
      <button type="button" class="on-primary-tab" data-tab="types" role="tab" aria-selected="false" aria-controls="ov-panel-types">类型管理</button>
    </div>
    <form class="filter-flow" id="ov-filters" role="search" aria-label="网站筛选">
      <div class="filter-item">
        <label class="filter-label" for="ov-search">搜索</label>
        <div class="filter-control search-control">
          <input type="text" class="control" id="ov-search" placeholder="网站名称 / 网址 / 简介" autocomplete="off"/>
          <button type="button" class="input-clear" id="ov-search-clear" aria-label="清空搜索" hidden>✕</button>
        </div>
      </div>
      <div class="filter-item">
        <label class="filter-label" for="ov-type-filter">网站类型</label>
        <div class="filter-control">
          <select class="control" id="ov-type-filter" aria-label="网站类型"></select>
        </div>
      </div>
      <div class="filter-item">
        <label class="filter-label" for="ov-featured-filter">是否精选</label>
        <div class="filter-control">
          <select class="control" id="ov-featured-filter" aria-label="是否精选">
            <option value="">全部</option>
            <option value="yes">是（精选推荐）</option>
            <option value="no">否</option>
          </select>
        </div>
      </div>
      <div class="filter-actions">
        <button type="submit" class="btn btn-primary" id="ov-query">查询</button>
        <button type="button" class="btn btn-default" id="ov-reset">重置</button>
      </div>
    </form>

    <!-- 「类型管理」页签的数据区（design.md §5.0「无筛选条件页签的区块合并」）
         该页签不含任何筛选条件，页签区块除页签外无其他内容，故列表直接并入本区块：
         切到「类型管理」时整页只呈现一个区块，不再出现「只剩一条页签的空区块 + 独立列表卡片」两段式结构。
         区块内上间距由 .on-primary-tabs 的 margin-bottom:20px 提供，列表行高沿用数据区标准。
         注意：不承载任何卡片样式（bg-white / rounded-lg / p-5），否则会变成卡片套卡片。 -->
    <section id="ov-panel-types" role="tabpanel" hidden>
      <div class="on-list-head">
        <h2>网站类型</h2><span class="on-count" id="ov-type-count"></span>
        <div class="on-head-actions">
          <button type="button" class="btn btn-primary" id="ov-add-type"><i data-lucide="plus"></i>添加类型</button>
        </div>
      </div>
      <div class="on-scroll">
        <table class="data-table" aria-label="网站类型">
          <thead><tr>
            <th style="width:48px">排序</th><th style="width:120px">类型图标</th><th>类型名称</th>
            <th style="width:120px">网站数量</th><th style="width:100px">操作</th>
          </tr></thead>
          <tbody id="ov-type-tbody"></tbody>
        </table>
        <div class="on-empty" id="ov-type-empty" hidden><i data-lucide="shapes"></i><p>暂无类型，点击「添加类型」创建第一条数据</p></div>
      </div>
      <p class="on-field-help" style="margin-top:12px">说明：删除类型前需先移除或转移该类型下的全部网站；类型顺序决定独立页面分组展示顺序。</p>
    </section>
  </section>

  <!-- 区块 2：「网站管理」页签数据区（该页签含筛选条件，故列表独立成区块） -->
  <section class="w-full max-w-none bg-white rounded-lg border-0 p-5 md:p-6" id="ov-panel-sites" role="tabpanel">
    <div class="on-list-head">
      <h2>网站列表</h2><span class="on-count" id="ov-site-count"></span>
      <div class="on-head-actions">
        <button type="button" class="btn btn-primary" id="ov-add-site"><i data-lucide="plus"></i>添加网站</button>
      </div>
    </div>
    <div class="on-scroll">
      <table class="data-table" aria-label="网站列表">
        <thead><tr>
          <th style="width:48px">排序</th><th>网站</th><th>网址</th><th style="width:120px">类型</th>
          <th>简介</th><th style="width:80px">精选</th><th style="width:100px">操作</th>
        </tr></thead>
        <tbody id="ov-site-tbody"></tbody>
      </table>
      <div class="on-empty" id="ov-site-empty" hidden><i data-lucide="package-open"></i><p id="ov-site-empty-text">暂无网站，点击「添加网站」创建第一条数据</p></div>
    </div>
  </section>

  <!-- 添加/编辑网站 弹窗 -->
  <div class="on-overlay" id="ov-site-overlay" hidden>
    <div class="on-modal" role="dialog" aria-modal="true" aria-labelledby="ov-site-modal-title">
      <div class="on-modal-header">
        <h3 id="ov-site-modal-title">添加网站</h3>
        <button type="button" class="on-modal-close" data-close="site" aria-label="关闭">✕</button>
      </div>
      <form id="ov-site-form" novalidate>
        <div class="on-modal-body">
          <div class="on-field">
            <label class="on-field-label">网站图标</label>
            <div class="on-field-control">
              <div class="on-icon-row">
                <span class="on-icon-preview" id="ov-f-icon-preview"></span>
                <div class="on-icon-actions">
                  <button type="button" class="btn btn-default" id="ov-f-icon-upload-btn">上传图标</button>
                  <button type="button" class="btn btn-default" id="ov-f-icon-clear" hidden>清除上传图</button>
                </div>
                <input type="file" id="ov-f-icon-file" accept="image/*" hidden/>
              </div>
              <p class="on-field-help">未上传时按网址自动匹配站点图标；上传图优先展示（≤200KB）。</p>
            </div>
          </div>
          <div class="on-field" id="ov-f-name-field">
            <label class="on-field-label" for="ov-f-name"><span class="req">*</span>网站名称</label>
            <div class="on-field-control">
              <input type="text" class="control" id="ov-f-name" maxlength="30" placeholder="请输入网站名称" style="padding-right:48px"/>
              <span class="on-counter" id="ov-f-name-count">0/30</span>
              <p class="on-field-error" id="ov-f-name-error">请输入网站名称</p>
            </div>
          </div>
          <div class="on-field" id="ov-f-url-field">
            <label class="on-field-label" for="ov-f-url"><span class="req">*</span>网站网址</label>
            <div class="on-field-control">
              <input type="text" class="control font-mono" id="ov-f-url" placeholder="https://example.com/"/>
              <p class="on-field-error" id="ov-f-url-error">请输入合法的网址（http/https 开头）</p>
            </div>
          </div>
          <div class="on-field" id="ov-f-intro-field">
            <label class="on-field-label" for="ov-f-intro"><span class="req">*</span>网站简介</label>
            <div class="on-field-control on-textarea-wrap">
              <textarea class="control" id="ov-f-intro" maxlength="100" placeholder="请输入网站简介，将展示在导航卡片中"></textarea>
              <div class="on-counter-below"><span id="ov-f-intro-count">0/100</span></div>
              <p class="on-field-error" id="ov-f-intro-error">请输入网站简介</p>
            </div>
          </div>
          <div class="on-field" id="ov-f-type-field">
            <label class="on-field-label" for="ov-f-type"><span class="req">*</span>网站类型</label>
            <div class="on-field-control">
              <select class="control" id="ov-f-type"></select>
              <p class="on-field-error" id="ov-f-type-error">请选择网站类型</p>
              <p class="on-field-help" id="ov-f-type-help" hidden>暂无类型，请先到「类型管理」添加</p>
            </div>
          </div>
          <div class="on-field">
            <label class="on-field-label" for="ov-f-featured">精选推荐</label>
            <div class="on-field-control" style="display:flex;align-items:center;height:32px;gap:10px">
              <button type="button" class="on-toggle" id="ov-f-featured" role="switch" aria-checked="false" aria-label="设为精选推荐"></button>
              <span class="on-field-help" style="margin:0">开启后在独立页面「精选推荐」分组聚合展示</span>
            </div>
          </div>
        </div>
        <div class="on-modal-footer">
          <button type="button" class="btn btn-default" data-close="site">取消</button>
          <button type="submit" class="btn btn-primary" id="ov-site-submit">保存</button>
        </div>
      </form>
    </div>
  </div>

  <!-- 添加/编辑类型 弹窗 -->
  <div class="on-overlay" id="ov-type-overlay" hidden>
    <div class="on-modal" role="dialog" aria-modal="true" aria-labelledby="ov-type-modal-title">
      <div class="on-modal-header">
        <h3 id="ov-type-modal-title">添加类型</h3>
        <button type="button" class="on-modal-close" data-close="type" aria-label="关闭">✕</button>
      </div>
      <form id="ov-type-form" novalidate>
        <div class="on-modal-body">
          <div class="on-field">
            <label class="on-field-label">类型图标</label>
            <div class="on-field-control">
              <div class="on-icon-row">
                <span class="on-icon-preview" id="ov-t-icon-preview"></span>
                <div class="on-icon-actions">
                  <button type="button" class="btn btn-default" id="ov-t-icon-upload-btn">上传图标</button>
                  <button type="button" class="btn btn-default" id="ov-t-icon-clear" hidden>清除上传图</button>
                </div>
                <input type="file" id="ov-t-icon-file" accept="image/*" hidden/>
              </div>
              <p class="on-field-help">未上传时以类型名称首字作为图标展示（≤200KB）。</p>
            </div>
          </div>
          <div class="on-field" id="ov-t-name-field">
            <label class="on-field-label" for="ov-t-name"><span class="req">*</span>类型名称</label>
            <div class="on-field-control">
              <input type="text" class="control" id="ov-t-name" maxlength="12" placeholder="请输入类型名称" style="padding-right:48px"/>
              <span class="on-counter" id="ov-t-name-count">0/12</span>
              <p class="on-field-error" id="ov-t-name-error">请输入类型名称</p>
            </div>
          </div>
        </div>
        <div class="on-modal-footer">
          <button type="button" class="btn btn-default" data-close="type">取消</button>
          <button type="submit" class="btn btn-primary" id="ov-type-submit">保存</button>
        </div>
      </form>
    </div>
  </div>

  <!-- 删除确认 Dialog（design.md §5.8 confirm 类型） -->
  <div class="on-overlay" id="ov-confirm-overlay" hidden>
    <div class="on-modal on-modal-sm" role="alertdialog" aria-modal="true" aria-labelledby="ov-confirm-title">
      <button type="button" class="on-modal-close" data-close="confirm" aria-label="关闭" style="position:absolute;top:14px;right:18px">✕</button>
      <div class="on-modal-body" style="display:flex;align-items:center;flex:1;padding:0 24px">
        <span style="width:20px;height:20px;border-radius:50%;flex:none;display:inline-flex;align-items:center;justify-content:center;background:#FDF2E9;color:#E7772D;font-weight:600;font-size:13px;margin-right:12px">?</span>
        <div>
          <div id="ov-confirm-title" style="font-size:16px;font-weight:600;color:#1A1D24">确认删除</div>
          <p id="ov-confirm-text" style="font-size:14px;color:#6E7685;margin:6px 0 0"></p>
        </div>
      </div>
      <div class="on-modal-footer">
        <button type="button" class="btn btn-default" data-close="confirm">取消</button>
        <button type="button" class="btn btn-primary" id="ov-confirm-ok" style="background:#D9001B;border-color:#D9001B">删除</button>
      </div>
    </div>
  </div>

  <!-- 简介气泡（行级浮层，鼠标移入/键盘聚焦简介时展示完整文本） -->
  <div class="on-pop" id="ov-intro-pop" role="tooltip" hidden></div>

  <div class="on-toast-wrap" id="ov-toast-wrap"></div>
</section>`,
  init(root) {
    'use strict';
    /* ======================= 数据层 ======================= */
    const STORE_KEY = 'yundeng_overseas_nav_v1';
    /* 种子数据与独立页面 exports/出海吧-独立页面.html 保持一致；localStorage 为空时写入作为初始数据 */
    const SEED_TYPES = [
      { id: 't01', name: 'AI 工具', icon: '' }, { id: 't02', name: '独立站工具', icon: '' },
      { id: 't03', name: '效率工具', icon: '' }, { id: 't04', name: '广告工具', icon: '' },
      { id: 't05', name: '社媒资源', icon: '' }, { id: 't06', name: '社媒管理', icon: '' },
      { id: 't07', name: 'SEO 工具', icon: '' }, { id: 't08', name: '建站工具', icon: '' },
      { id: 't09', name: '电商工具', icon: '' }, { id: 't10', name: 'ERP 工具', icon: '' },
      { id: 't11', name: '物流工具', icon: '' }, { id: 't12', name: '出海咨询', icon: '' }
    ];
    const SEED_SITES = [
      { id: 's01', name: 'IPFoxy 代理优惠', url: 'https://www.ipfoxy.com/', intro: 'IPFoxy代理，专注海外静态住宅代理、动态住宅代理与数据中心代理，助力跨境电商与社媒多账号运营。', typeId: 't05', featured: true, icon: '' },
      { id: 's02', name: 'Social Rochela 社媒管理', url: 'https://www.socialrochela.com/', intro: '社媒矩阵账号一站式管理工具，支持多平台账号聚合、内容排期与数据看板。', typeId: 't06', featured: true, icon: '' },
      { id: 's03', name: 'HelpLook', url: 'https://www.helplook.net/', intro: '零代码搭建帮助中心与产品文档，支持多语言站点与 AI 搜索，快速交付专业的自助服务页面。', typeId: 't08', featured: true, icon: '' },
      { id: 's04', name: 'PopAi', url: 'https://www.popai.pro/', intro: '一体化 AI 工作助手：AI 对话、文档阅读、PPT 生成与图片创作，覆盖个人与团队的日常生产力场景。', typeId: 't01', featured: true, icon: '' },
      { id: 's05', name: 'Proxy302', url: 'https://www.proxy302.com/', intro: '按需付费的IP代理平台，支持住宅、数据中心与手机代理，提供浏览器插件与 API 接入。', typeId: 't05', featured: true, icon: '' },
      { id: 's06', name: '302.AI', url: 'https://302.ai/', intro: '按需付费的 AI 应用平台，聚合全球主流大模型与热门 AI 工具，企业级稳定接入。', typeId: 't01', featured: true, icon: '' },
      { id: 's07', name: 'FrameDNS', url: 'https://www.framedns.com/', intro: '智能域名解析与分组管理平台，支持多线路智能解析、批量管理与 API 同步。', typeId: 't02', featured: true, icon: '' },
      { id: 's08', name: 'DuoPlus 云手机', url: 'https://www.duoplus.cn/', intro: '海外云手机，arm 真机环境，支持 TikTok 等社媒矩阵养号与多开管理。', typeId: 't03', featured: true, icon: '' },
      { id: 's09', name: 'AdsPower', url: 'https://www.adspower.net/', intro: '多账号防关联浏览器，指纹隔离、团队协作与 RPA 自动化，跨境运营必备。', typeId: 't03', featured: true, icon: '' },
      { id: 's10', name: 'Kookeey', url: 'https://www.kookeey.com/', intro: '全球代理IP服务商，静态住宅与数据中心代理资源覆盖 200+ 国家与地区。', typeId: 't05', featured: true, icon: '' },
      { id: 's11', name: 'SaleSmartly', url: 'https://www.salesmartly.com/', intro: '全渠道聊天聚合客服系统，聚合 WhatsApp、Telegram、Messenger 等渠道，提升海外转化。', typeId: 't06', featured: true, icon: '' },
      { id: 's12', name: 'EchoTik', url: 'https://www.echotik.live/', intro: 'TikTok 电商数据分析与选品工具，直播、达人、商品多维度洞察。', typeId: 't09', featured: true, icon: '' },
      { id: 's13', name: '芒果店长', url: 'https://www.mangoerp.com/', intro: '跨境电商 ERP，支持多平台店铺订单、采购、库存与物流一体化管理。', typeId: 't10', featured: true, icon: '' },
      { id: 's14', name: 'Adsos', url: 'https://www.adsos.cn/', intro: '广告素材批量生成与投放管理工具，支持多渠道广告账户聚合与自动化规则。', typeId: 't04', featured: false, icon: '' },
      { id: 's15', name: 'QuarkIP', url: 'https://www.quarkip.com/', intro: '海外动态住宅代理，海量真实住宅 IP 池，支持城市级定位与长时效会话。', typeId: 't05', featured: false, icon: '' },
      { id: 's16', name: 'Datary', url: 'https://www.datary.io/', intro: '跨境数据采集与自动化平台，无代码配置采集流程，稳定交付结构化数据。', typeId: 't01', featured: false, icon: '' },
      { id: 's17', name: 'Thoradata', url: 'https://www.thoradata.io/', intro: '面向增长团队的用户行为分析引擎，支持 SQL 自助查询与实时看板。', typeId: 't07', featured: false, icon: '' },
      { id: 's18', name: 'DataL—网数据', url: 'https://www.datal.dev/', intro: '全球网站流量与市场数据分析平台，洞察竞品流量结构、关键词与广告投放策略。', typeId: 't07', featured: false, icon: '' },
      { id: 's19', name: 'Claudeg', url: 'https://www.claudeg.com/', intro: '面向内容团队的 AI 写作工作台，多语言营销文案与站内内容批量生成。', typeId: 't01', featured: false, icon: '' },
      { id: 's20', name: 'IPWO 全球住宅代理', url: 'https://www.ipwo.net/', intro: '海外住宅IP代理服务商，动态与静态住宅资源，支持 API 提取与账密认证。', typeId: 't05', featured: false, icon: '' },
      { id: 's21', name: 'ChatCut', url: 'https://www.chatcut.ai/', intro: 'AI 视频剪辑与字幕工具，支持多语言口播视频快速出片与批量翻译。', typeId: 't01', featured: false, icon: '' },
      { id: 's22', name: '领客优选', url: 'https://www.linkor.cn/', intro: '出海供应链选品平台，覆盖 3C、家居等品类的工厂直连货源。', typeId: 't09', featured: false, icon: '' },
      { id: 's23', name: 'TakeFlow', url: 'https://www.takeflow.com/', intro: '团队流程自动化工具，连接常用 SaaS 与内部系统，搭建无需代码的自动化工作流。', typeId: 't03', featured: false, icon: '' },
      { id: 's24', name: 'ipkag', url: 'https://www.ipkag.com/', intro: 'IP 代理聚合市场，一站比价多家代理商资源，支持按需试用。', typeId: 't05', featured: false, icon: '' },
      { id: 's25', name: '独立产品出海工具箱', url: 'https://toolbox.example.com/', intro: '面向独立开发者的出海工具合集：支付、订阅、税号、落地页与增长工具一览。', typeId: 't02', featured: false, icon: '' },
      { id: 's26', name: '极客出海咨询', url: 'https://geekabroad.example.com/', intro: '提供海外公司注册、税务合规、商标与收款方案的一站式出海咨询服务。', typeId: 't12', featured: false, icon: '' },
      { id: 's27', name: '飞舰国际物流', url: 'https://www.feijian56.com/', intro: '跨境物流聚合平台，国际小包、专线与海外仓一站式比价下单。', typeId: 't11', featured: false, icon: '' },
      { id: 's28', name: '建站魔方', url: 'https://www.sitemofang.com/', intro: '外贸独立站建站系统，模板化搭建、多语言 SEO 与支付网关开箱即用。', typeId: 't08', featured: false, icon: '' }
    ];

    let types = [];
    let sites = [];
    let appliedKeyword = '';   /* 已生效的搜索关键词（点「查询」后才更新） */
    let appliedTypeId = '';    /* 已生效的网站类型筛选（空串 = 全部类型） */
    let appliedFeatured = '';  /* 已生效的精选筛选：'' 全部 / 'yes' 精选 / 'no' 非精选 */
    let editingSiteId = null;   /* null=新增 */
    let editingTypeId = null;
    let draftSiteIcon = '';     /* 表单内临时上传图 dataURL */
    let draftTypeIcon = '';
    let confirmAction = null;   /* 删除确认回调 */
    let uidSeed = Date.now();

    const $ = (id) => root.querySelector('#' + id);
    const esc = (text) => String(text).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

    function loadStore() {
      try {
        const raw = localStorage.getItem(STORE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.types) && Array.isArray(parsed.sites)) return parsed;
        }
      } catch (_) { /* 忽略：回退种子 */ }
      return { version: 1, types: SEED_TYPES.map((t) => ({ ...t })), sites: SEED_SITES.map((s) => ({ ...s })) };
    }
    function persist() {
      try { localStorage.setItem(STORE_KEY, JSON.stringify({ version: 1, types, sites })); }
      catch (_) { toast('本地存储写入失败，数据仅本次会话内生效'); }
    }
    function newId(prefix) { uidSeed += 1; return prefix + uidSeed.toString(36); }

    function toast(message) {
      const el = document.createElement('div');
      el.className = 'on-toast';
      el.textContent = message;
      $('ov-toast-wrap').append(el);
      setTimeout(() => el.remove(), 2400);
    }

    /* ======================= 图标渲染 ======================= */
    function hostOf(url) { try { return new URL(url).hostname; } catch (_) { return ''; } }
    function faviconUrl(url) { const host = hostOf(url); return host ? 'https://favicon.im/' + host + '?larger=true' : ''; }
    const AVATAR_COLORS = ['#0066FF', '#0FC060', '#E7772D', '#0091D5', '#7C5CFF', '#D9001B'];
    function avatarColor(name) {
      let hash = 0;
      for (const ch of String(name)) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
      return AVATAR_COLORS[hash % AVATAR_COLORS.length];
    }
    function iconImg(item, cls) {
      if (item.icon) return '<img class="' + cls + '" src="' + esc(item.icon) + '" alt=""/>';
      const fav = faviconUrl(item.url || '');
      if (fav) return '<img class="' + cls + '" src="' + fav + '" alt="" data-name="' + esc(item.name) + '" onerror="this.outerHTML=window.__ovAvatar(this.dataset.name)"/>';
      return window.__ovAvatar(item.name, cls);
    }
    window.__ovAvatar = (name, cls) => '<span class="' + cls + '" style="display:inline-flex;align-items:center;justify-content:center;background:' + avatarColor(name) + ';color:#fff;font-weight:600;font-size:12px">' + esc(String(name).trim().charAt(0) || '网') + '</span>';

    /* ======================= 渲染：网站列表 ======================= */
    function typeNameOf(id) { const t = types.find((t) => t.id === id); return t ? t.name : '未分类'; }
    function filtersActive() { return appliedKeyword.trim() !== '' || appliedTypeId !== '' || appliedFeatured !== ''; }
    function filteredSites() {
      const kw = appliedKeyword.trim().toLowerCase();
      return sites.filter((s) => {
        const hitType = !appliedTypeId || s.typeId === appliedTypeId;
        const hitFeatured = !appliedFeatured || (appliedFeatured === 'yes' ? s.featured : !s.featured);
        const hitKw = !kw || (s.name + ' ' + s.url + ' ' + s.intro).toLowerCase().includes(kw);
        return hitType && hitFeatured && hitKw;
      });
    }
    function renderSites() {
      const rows = filteredSites();
      const searching = filtersActive();
      $('ov-site-count').textContent = '共 ' + rows.length + ' 条' + (searching ? '（筛选自 ' + sites.length + ' 条）' : '');
      $('ov-site-tbody').innerHTML = rows.map((s, i) => `
        <tr data-idx="${i}" data-id="${s.id}">
          <td><span class="on-drag-handle ${searching ? 'is-disabled' : ''}" draggable="${searching ? 'false' : 'true'}" data-drag="${i}" title="${searching ? '筛选状态下不可拖拽排序' : '拖拽调整顺序'}"><i data-lucide="grip-vertical"></i></span></td>
          <td><span class="on-site-name">${iconImg(s, 'on-site-icon')}<span style="min-width:0"><span style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px;font-weight:500;color:#1A1D24">${esc(s.name)}</span></span></span></td>
          <td><a class="on-url font-mono" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" title="${esc(s.url)}">${esc(s.url)}</a></td>
          <td>${esc(typeNameOf(s.typeId))}</td>
          <td><span class="on-intro" data-intro-pop="${esc(s.intro)}" tabindex="0" aria-describedby="ov-intro-pop">${esc(s.intro)}</span></td>
          <td><button type="button" class="on-star ${s.featured ? 'is-on' : ''}" data-star="${s.id}" aria-pressed="${s.featured}" title="${s.featured ? '点击取消推荐' : '点击设为推荐'}" aria-label="${s.featured ? '取消推荐' : '设为推荐'}"><i data-lucide="star"></i></button></td>
          <td><button type="button" class="on-link" data-edit="${s.id}">编辑</button><button type="button" class="on-link on-link-danger" data-del="${s.id}">删除</button></td>
        </tr>`).join('');
      const emptyText = sites.length === 0 ? '暂无网站，点击「添加网站」创建第一条数据' : '未找到匹配的网站，请调整筛选条件后重新查询';
      $('ov-site-empty').hidden = rows.length > 0;
      $('ov-site-empty-text').textContent = emptyText;
      window.lucide?.createIcons();
    }

    /* 筛选区「网站类型」下拉：选项始终与类型管理保持一致 */
    function fillTypeFilterOptions() {
      const select = $('ov-type-filter');
      const current = select.value;
      select.innerHTML = '<option value="">全部类型</option>' + types.map((t) => '<option value="' + t.id + '">' + esc(t.name) + '</option>').join('');
      select.value = types.some((t) => t.id === current) ? current : '';
      if (!select.value) appliedTypeId = '';
    }

    /* ======================= 渲染：类型列表 ======================= */
    function renderTypes() {
      $('ov-type-count').textContent = '共 ' + types.length + ' 条';
      $('ov-type-tbody').innerHTML = types.map((t, i) => `
        <tr data-idx="${i}" data-id="${t.id}">
          <td><span class="on-drag-handle" draggable="true" data-drag="${i}" title="拖拽调整顺序"><i data-lucide="grip-vertical"></i></span></td>
          <td>${iconImg({ icon: t.icon, url: '', name: t.name }, 'on-site-icon')}</td>
          <td style="font-weight:500;color:#1A1D24">${esc(t.name)}</td>
          <td class="font-mono">${sites.filter((s) => s.typeId === t.id).length}</td>
          <td><button type="button" class="on-link" data-edit-type="${t.id}">编辑</button><button type="button" class="on-link on-link-danger" data-del-type="${t.id}">删除</button></td>
        </tr>`).join('');
      $('ov-type-empty').hidden = types.length > 0;
      fillTypeFilterOptions();
      window.lucide?.createIcons();
    }

    /* ======================= Tab 切换（design.md §5.0 一级 Tab） ======================= */
    /* 区块归属：类型列表位于区块 1 内部（该页签无筛选条件 → 合并为单区块）；
       网站列表为独立的区块 2（该页签有筛选条件）。此处只切换 hidden，不改结构。 */
    function switchTab(tab) {
      root.querySelectorAll('.on-primary-tab').forEach((b) => {
        const active = b.dataset.tab === tab;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      $('ov-panel-sites').hidden = tab !== 'sites';
      $('ov-panel-types').hidden = tab !== 'types';
      $('ov-filters').hidden = tab !== 'sites';   /* 筛选条件仅属于「网站管理」页签 */
    }

    /* ======================= 网站 表单弹窗 ======================= */
    function fillTypeOptions(selectedId) {
      const select = $('ov-f-type');
      if (!types.length) {
        select.innerHTML = '<option value="">暂无可选类型</option>';
        select.disabled = true;
        $('ov-f-type-help').hidden = false;
        syncTypePlaceholder();
        return;
      }
      select.disabled = false;
      $('ov-f-type-help').hidden = true;
      select.innerHTML = '<option value="">请选择类型</option>' + types.map((t) => '<option value="' + t.id + '">' + esc(t.name) + '</option>').join('');
      select.value = selectedId && types.some((t) => t.id === selectedId) ? selectedId : '';
      syncTypePlaceholder();
    }
    /* 「请选择类型」占位项显示为灰色，选中真实类型后恢复正文色 */
    function syncTypePlaceholder() {
      const select = $('ov-f-type');
      select.classList.toggle('is-placeholder', select.value === '');
    }
    function renderIconPreview() {
      const url = $('ov-f-url').value.trim();
      const item = { icon: draftSiteIcon, url, name: $('ov-f-name').value.trim() || '网' };
      $('ov-f-icon-preview').innerHTML = iconImg(item, 'on-site-icon');
      $('ov-f-icon-clear').hidden = !draftSiteIcon;
    }
    function openSiteModal(site) {
      editingSiteId = site ? site.id : null;
      draftSiteIcon = site ? site.icon : '';
      $('ov-site-modal-title').textContent = site ? '编辑网站' : '添加网站';
      $('ov-f-name').value = site ? site.name : '';
      $('ov-f-url').value = site ? site.url : '';
      $('ov-f-intro').value = site ? site.intro : '';
      fillTypeOptions(site ? site.typeId : '');
      setToggle($('ov-f-featured'), site ? site.featured : false);
      ['name', 'url', 'intro', 'type'].forEach((k) => $('ov-f-' + k + '-field').classList.remove('is-error'));
      syncCounters();
      renderIconPreview();
      $('ov-site-overlay').hidden = false;
      $('ov-f-name').focus();
    }
    function setToggle(btn, on) {
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-checked', String(on));
    }
    function syncCounters() {
      $('ov-f-name-count').textContent = $('ov-f-name').value.length + '/30';
      $('ov-f-intro-count').textContent = $('ov-f-intro').value.length + '/100';
      $('ov-t-name-count').textContent = $('ov-t-name').value.length + '/12';
    }
    function closeOverlay(which) {
      if (which === 'site') $('ov-site-overlay').hidden = true;
      else if (which === 'type') $('ov-type-overlay').hidden = true;
      else if (which === 'confirm') { $('ov-confirm-overlay').hidden = true; confirmAction = null; }
    }
    function validUrl(value) {
      try { const u = new URL(value); return u.protocol === 'http:' || u.protocol === 'https:'; }
      catch (_) { return false; }
    }
    function submitSiteForm(event) {
      event.preventDefault();
      const name = $('ov-f-name').value.trim();
      const url = $('ov-f-url').value.trim();
      const intro = $('ov-f-intro').value.trim();
      const typeId = $('ov-f-type').value;
      let valid = true;
      const mark = (key, bad) => { $('ov-f-' + key + '-field').classList.toggle('is-error', bad); if (bad) valid = false; };
      mark('name', !name);
      mark('url', !validUrl(url));
      mark('intro', !intro);
      mark('type', !typeId);
      if (!valid) return;
      /* 名称去重（同类型下不允许重名，避免独立页面出现重复卡片语义） */
      const dup = sites.find((s) => s.name === name && s.id !== editingSiteId);
      if (dup) { toast('网站名称「' + name + '」已存在'); return; }
      if (editingSiteId) {
        const site = sites.find((s) => s.id === editingSiteId);
        Object.assign(site, { name, url, intro, typeId, featured: $('ov-f-featured').classList.contains('on'), icon: draftSiteIcon });
        toast('网站已更新');
      } else {
        sites.push({ id: newId('s'), name, url, intro, typeId, featured: $('ov-f-featured').classList.contains('on'), icon: draftSiteIcon });
        /* 新增后清空筛选，确保新数据可见 */
        appliedKeyword = ''; appliedTypeId = ''; appliedFeatured = '';
        $('ov-search').value = ''; $('ov-type-filter').value = ''; $('ov-featured-filter').value = ''; $('ov-search-clear').hidden = true;
        toast('网站已添加');
      }
      persist();
      closeOverlay('site');
      renderSites();
      renderTypes();
    }

    /* ======================= 类型 表单弹窗 ======================= */
    function renderTypePreview() {
      const name = $('ov-t-name').value.trim() || '类';
      const item = { icon: draftTypeIcon, url: '', name };
      $('ov-t-icon-preview').innerHTML = iconImg(item, 'on-site-icon');
      $('ov-t-icon-clear').hidden = !draftTypeIcon;
    }
    function openTypeModal(type) {
      editingTypeId = type ? type.id : null;
      draftTypeIcon = type ? type.icon : '';
      $('ov-type-modal-title').textContent = type ? '编辑类型' : '添加类型';
      $('ov-t-name').value = type ? type.name : '';
      $('ov-t-name-field').classList.remove('is-error');
      syncCounters();
      renderTypePreview();
      $('ov-type-overlay').hidden = false;
      $('ov-t-name').focus();
    }
    function submitTypeForm(event) {
      event.preventDefault();
      const name = $('ov-t-name').value.trim();
      $('ov-t-name-field').classList.toggle('is-error', !name);
      if (!name) return;
      const dup = types.find((t) => t.name === name && t.id !== editingTypeId);
      if (dup) { toast('类型名称「' + name + '」已存在'); return; }
      if (editingTypeId) {
        Object.assign(types.find((t) => t.id === editingTypeId), { name, icon: draftTypeIcon });
        toast('类型已更新');
      } else {
        types.push({ id: newId('t'), name, icon: draftTypeIcon });
        toast('类型已添加');
      }
      persist();
      closeOverlay('type');
      renderTypes();
      renderSites();
    }

    /* ======================= 删除 ======================= */
    function requestDeleteSite(id) {
      const site = sites.find((s) => s.id === id);
      if (!site) return;
      $('ov-confirm-text').textContent = '确定删除网站「' + site.name + '」吗？删除后独立页面将不再展示该网站。';
      confirmAction = () => {
        /* 就地删除，保持数组引用稳定（与拖拽排序共用同一引用） */
        const index = sites.findIndex((s) => s.id === id);
        if (index >= 0) sites.splice(index, 1);
        persist(); renderSites(); renderTypes(); toast('网站已删除');
      };
      $('ov-confirm-overlay').hidden = false;
    }
    function requestDeleteType(id) {
      const type = types.find((t) => t.id === id);
      if (!type) return;
      const count = sites.filter((s) => s.typeId === id).length;
      if (count > 0) { toast('该类型下仍有 ' + count + ' 个网站，请先移除或转移后再删除'); return; }
      $('ov-confirm-text').textContent = '确定删除类型「' + type.name + '」吗？';
      confirmAction = () => {
        /* 就地删除，保持数组引用稳定（与拖拽排序共用同一引用） */
        const index = types.findIndex((t) => t.id === id);
        if (index >= 0) types.splice(index, 1);
        persist(); renderTypes(); renderSites(); toast('类型已删除');
      };
      $('ov-confirm-overlay').hidden = false;
    }

    /* ======================= 拖拽排序 ======================= */
    let dragFrom = -1;
    /* ⚠️ 必须用取值函数 getList 而非数组引用：初始化加载与删除都会重新赋值 sites / types，
       若绑定时固定引用，拖拽会改到旧数组上，导致「调整顺序不生效」。 */
    function bindDragEvents(tbody, getList, rerender) {
      tbody.addEventListener('dragstart', (e) => {
        const handle = e.target.closest('[data-drag]');
        if (!handle || handle.classList.contains('is-disabled')) { e.preventDefault(); return; }
        dragFrom = Number(handle.dataset.drag);
        handle.closest('tr').style.opacity = '0.5';
      });
      tbody.addEventListener('dragover', (e) => {
        if (dragFrom < 0) return;
        e.preventDefault();
        const row = e.target.closest('tr[data-idx]');
        tbody.querySelectorAll('tr').forEach((tr) => tr.classList.remove('is-dragover'));
        if (row && Number(row.dataset.idx) !== dragFrom) row.classList.add('is-dragover');
      });
      tbody.addEventListener('dragleave', (e) => {
        const row = e.target.closest('tr[data-idx]');
        if (row) row.classList.remove('is-dragover');
      });
      tbody.addEventListener('drop', (e) => {
        if (dragFrom < 0) return;
        e.preventDefault();
        const row = e.target.closest('tr[data-idx]');
        if (row) {
          const to = Number(row.dataset.idx);
          const list = getList();          /* 每次落位时取当前数组（避免陈旧引用） */
          if (to !== dragFrom && dragFrom < list.length) {
            const moved = list.splice(dragFrom, 1)[0];
            list.splice(to, 0, moved);
            persist();
            toast('排序已更新');
          }
        }
        dragFrom = -1;
        rerender();
      });
      tbody.addEventListener('dragend', () => {
        dragFrom = -1;
        tbody.querySelectorAll('tr').forEach((tr) => { tr.classList.remove('is-dragover'); tr.style.opacity = ''; });
      });
    }

    /* ======================= 精选星标：点击切换推荐状态 ======================= */
    function toggleFeatured(id) {
      const site = sites.find((s) => s.id === id);
      if (!site) return;
      site.featured = !site.featured;
      persist();
      renderSites();
      toast(site.featured ? '已将「' + site.name + '」设为推荐' : '已取消「' + site.name + '」的推荐');
    }

    /* ======================= 简介气泡（hover / focus 全显简介） ======================= */
    const introPop = $('ov-intro-pop');
    function positionIntroPop(trigger) {
      const rect = trigger.getBoundingClientRect();
      const popRect = introPop.getBoundingClientRect();
      const margin = 12;
      const left = Math.min(Math.max(margin, rect.left), Math.max(margin, innerWidth - popRect.width - margin));
      let top = rect.bottom + 8;
      if (top + popRect.height > innerHeight - margin) top = Math.max(margin, rect.top - popRect.height - 8);
      introPop.style.left = left + 'px';
      introPop.style.top = top + 'px';
    }
    function showIntroPop(trigger) {
      const text = trigger.getAttribute('data-intro-pop') || '';
      if (!text) return;
      introPop.textContent = text;
      introPop.hidden = false;
      positionIntroPop(trigger);
    }
    function hideIntroPop() { introPop.hidden = true; }
    root.addEventListener('pointerover', (e) => {
      const trigger = e.target.closest('[data-intro-pop]');
      if (!trigger || trigger.contains(e.relatedTarget)) return;
      showIntroPop(trigger);
    });
    root.addEventListener('pointerout', (e) => {
      const trigger = e.target.closest('[data-intro-pop]');
      if (!trigger || trigger.contains(e.relatedTarget)) return;
      hideIntroPop();
    });
    root.addEventListener('focusin', (e) => {
      const trigger = e.target.closest('[data-intro-pop]');
      if (trigger) showIntroPop(trigger);
    });
    root.addEventListener('focusout', (e) => {
      if (e.target.closest('[data-intro-pop]')) hideIntroPop();
    });
    /* 定位基于 fixed 坐标，滚动或窗口尺寸变化时收起，避免浮层错位 */
    document.addEventListener('scroll', hideIntroPop, { capture: true });
    window.addEventListener('resize', hideIntroPop);

    /* ======================= 事件绑定 ======================= */
    root.addEventListener('click', (e) => {
      const tab = e.target.closest('.on-primary-tab');
      if (tab) { switchTab(tab.dataset.tab); return; }
      if (e.target.closest('#ov-add-site')) {
        if (!types.length) { toast('请先到「类型管理」添加网站类型'); switchTab('types'); return; }
        openSiteModal(null); return;
      }
      if (e.target.closest('#ov-add-type')) { openTypeModal(null); return; }
      const star = e.target.closest('[data-star]');
      if (star) { toggleFeatured(star.dataset.star); return; }
      const edit = e.target.closest('[data-edit]');
      if (edit) { openSiteModal(sites.find((s) => s.id === edit.dataset.edit)); return; }
      const del = e.target.closest('[data-del]');
      if (del) { requestDeleteSite(del.dataset.del); return; }
      const editType = e.target.closest('[data-edit-type]');
      if (editType) { openTypeModal(types.find((t) => t.id === editType.dataset.editType)); return; }
      const delType = e.target.closest('[data-del-type]');
      if (delType) { requestDeleteType(delType.dataset.delType); return; }
      const close = e.target.closest('[data-close]');
      if (close) { closeOverlay(close.dataset.close); return; }
      if (e.target.id === 'ov-site-overlay') { closeOverlay('site'); return; }
      if (e.target.id === 'ov-type-overlay') { closeOverlay('type'); return; }
      if (e.target.id === 'ov-confirm-overlay') { closeOverlay('confirm'); return; }
      if (e.target.closest('#ov-confirm-ok')) { const fn = confirmAction; closeOverlay('confirm'); if (fn) fn(); return; }
      if (e.target.closest('#ov-f-icon-upload-btn')) { $('ov-f-icon-file').click(); return; }
      if (e.target.closest('#ov-t-icon-upload-btn')) { $('ov-t-icon-file').click(); return; }
      if (e.target.closest('#ov-f-icon-clear')) { draftSiteIcon = ''; renderIconPreview(); toast('已清除上传图，恢复自动匹配'); return; }
      if (e.target.closest('#ov-t-icon-clear')) { draftTypeIcon = ''; renderTypePreview(); return; }
    });

    /* 筛选条件为草稿态：点「查询」统一提交，点「重置」恢复默认（design.md §5.4） */
    $('ov-filters').addEventListener('submit', (e) => {
      e.preventDefault();
      appliedKeyword = $('ov-search').value;
      appliedTypeId = $('ov-type-filter').value;
      appliedFeatured = $('ov-featured-filter').value;
      renderSites();
    });
    $('ov-reset').addEventListener('click', () => {
      $('ov-search').value = '';
      $('ov-type-filter').value = '';
      $('ov-featured-filter').value = '';
      $('ov-search-clear').hidden = true;
      appliedKeyword = '';
      appliedTypeId = '';
      appliedFeatured = '';
      renderSites();
    });
    /* 搜索框清空按钮：仅清空输入并保持焦点，查询由「查询」按钮统一提交 */
    $('ov-search').addEventListener('input', (e) => {
      $('ov-search-clear').hidden = !e.target.value;
    });
    $('ov-search-clear').addEventListener('click', () => {
      $('ov-search').value = '';
      $('ov-search-clear').hidden = true;
      $('ov-search').focus();
    });

    $('ov-f-featured').addEventListener('click', () => setToggle($('ov-f-featured'), !$('ov-f-featured').classList.contains('on')));
    $('ov-f-name').addEventListener('input', () => { syncCounters(); $('ov-f-name-field').classList.remove('is-error'); renderIconPreview(); });
    $('ov-f-intro').addEventListener('input', () => { syncCounters(); $('ov-f-intro-field').classList.remove('is-error'); });
    $('ov-f-type').addEventListener('change', () => { $('ov-f-type-field').classList.remove('is-error'); syncTypePlaceholder(); });
    /* 输入网址 → 自动匹配图标预览（favicon.im，失败降级首字母头像） */
    $('ov-f-url').addEventListener('input', () => { $('ov-f-url-field').classList.remove('is-error'); renderIconPreview(); });
    $('ov-t-name').addEventListener('input', () => { syncCounters(); $('ov-t-name-field').classList.remove('is-error'); renderTypePreview(); });

    /* 图标上传：本地图片转 dataURL，≤200KB */
    function bindIconUpload(fileInput, setter) {
      fileInput.addEventListener('change', () => {
        const file = fileInput.files && fileInput.files[0];
        if (!file) return;
        if (file.size > 200 * 1024) { toast('图标文件不能超过 200KB'); fileInput.value = ''; return; }
        const reader = new FileReader();
        reader.onload = () => { setter(String(reader.result)); fileInput.value = ''; };
        reader.onerror = () => { toast('图标读取失败，请更换文件'); fileInput.value = ''; };
        reader.readAsDataURL(file);
      });
    }
    bindIconUpload($('ov-f-icon-file'), (dataUrl) => { draftSiteIcon = dataUrl; renderIconPreview(); });
    bindIconUpload($('ov-t-icon-file'), (dataUrl) => { draftTypeIcon = dataUrl; renderTypePreview(); });

    $('ov-site-form').addEventListener('submit', submitSiteForm);
    $('ov-type-form').addEventListener('submit', submitTypeForm);

    bindDragEvents($('ov-site-tbody'), () => sites, renderSites);
    bindDragEvents($('ov-type-tbody'), () => types, renderTypes);

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      hideIntroPop();
      if (!$('ov-confirm-overlay').hidden) closeOverlay('confirm');
      else if (!$('ov-site-overlay').hidden) closeOverlay('site');
      else if (!$('ov-type-overlay').hidden) closeOverlay('type');
    });

    /* ======================= 启动 ======================= */
    const store = loadStore();
    types = store.types;
    sites = store.sites;
    persist();  /* 空库时写入种子，独立页面即可读到 */
    renderSites();
    renderTypes();
  }
};
