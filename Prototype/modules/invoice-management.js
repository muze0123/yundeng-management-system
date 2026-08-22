(function () {
  window.YundengModuleBundles = window.YundengModuleBundles || {};

  var html = String.raw`
    <section class="app-business-module invoice-module" data-module-root="invoice-management" aria-label="发票管理">
      <main class="invoice-main" id="invoiceMain" tabindex="-1">
        <div id="invoiceView" class="invoice-view" data-anno="5"></div>
      </main>

      <div id="invoiceDrawer" class="invoice-overlay" hidden>
        <aside class="invoice-drawer" role="dialog" aria-modal="true" aria-labelledby="invoiceDrawerTitle">
          <header class="invoice-drawer-header">
            <div><div class="invoice-drawer-kicker">申请详情</div><h2 id="invoiceDrawerTitle">开票申请</h2><p id="invoiceDrawerMeta"></p></div>
            <button type="button" class="icon-btn" data-action="close-drawer" aria-label="关闭申请详情" title="关闭详情"><i data-lucide="x" class="w-5 h-5"></i></button>
          </header>
          <div id="invoiceDrawerBody" class="invoice-drawer-body"></div>
          <footer id="invoiceDrawerFooter" class="invoice-drawer-footer"></footer>
        </aside>
      </div>

      <div id="invoiceDialog" class="invoice-dialog-overlay" hidden>
        <section class="invoice-dialog" role="dialog" aria-modal="true" aria-labelledby="invoiceDialogTitle">
          <header class="invoice-dialog-header"><h2 id="invoiceDialogTitle">确认操作</h2><button type="button" class="icon-btn" data-action="close-dialog" aria-label="关闭弹窗"><i data-lucide="x" class="w-5 h-5"></i></button></header>
          <div id="invoiceDialogBody" class="invoice-dialog-body"></div>
          <footer id="invoiceDialogFooter" class="invoice-dialog-footer"></footer>
        </section>
      </div>

      <div id="invoicePreview" class="invoice-dialog-overlay" hidden>
        <section class="invoice-preview" role="dialog" aria-modal="true" aria-labelledby="invoicePreviewTitle">
          <header class="invoice-dialog-header"><div><div class="invoice-dialog-kicker">票据预览</div><h2 id="invoicePreviewTitle">电子发票</h2></div><button type="button" class="icon-btn" data-action="close-preview" aria-label="关闭票据预览"><i data-lucide="x" class="w-5 h-5"></i></button></header>
          <div id="invoicePreviewBody" class="invoice-preview-body"></div>
        </section>
      </div>

      <div id="invoiceToast" class="invoice-toast-stack" aria-live="polite"></div>
      <div id="invoiceAnnoLayer" class="invoice-anno-layer"></div>
      <button id="invoiceAnnoToggle" type="button" class="invoice-anno-toggle" aria-pressed="false" title="显示交互标注"><i data-lucide="tags" class="w-4 h-4"></i><span>交互标注</span></button>
      <div id="invoiceAnnoPopup" class="invoice-anno-popup" hidden><div class="invoice-anno-panel"><header><h2 id="invoiceAnnoTitle">交互标注</h2><button type="button" class="icon-btn" data-action="close-anno" aria-label="关闭标注说明"><i data-lucide="x" class="w-5 h-5"></i></button></header><div id="invoiceAnnoBody"></div></div></div>
    </section>`;

  var styles = String.raw`
    body.invoice-lock-scroll{overflow:hidden}
    .invoice-module{--invoice-blue:#0066FF;--invoice-blue-hover:#0052CC;--invoice-ink:#1A1D24;--invoice-body:#3A3F4A;--invoice-sub:#6E7685;--invoice-muted:#9DA2AC;--invoice-line:#DFE1E5;--invoice-line-light:#E8EAED;--invoice-page:#F7F8FA;--invoice-card:#FFFFFF;--invoice-hover:#F3F4F6;--invoice-success:#0FC060;--invoice-success-bg:#E7F9F0;--invoice-warning:#E7772D;--invoice-warning-bg:#FDF2E9;--invoice-danger:#D9001B;--invoice-danger-bg:#FFE8EB;--invoice-info:#0091D5;--invoice-info-bg:#E4F4FB;color:var(--invoice-body);font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
    .invoice-module *,.invoice-module *::before,.invoice-module *::after{box-sizing:border-box}
    .invoice-module ::selection{background:#D6E7FF;color:var(--invoice-ink)}
    .invoice-main{min-height:calc(100vh - 56px);padding:16px 16px 32px;background:var(--invoice-page)}
    .invoice-primary-tabs{display:flex;min-width:0;gap:4px;margin:0 0 20px;padding:0;border:0;border-bottom:1px solid var(--invoice-line-light);overflow-x:auto;scrollbar-width:none}
    .invoice-primary-tabs::-webkit-scrollbar{display:none}
    .invoice-primary-tab{position:relative;display:inline-flex;align-items:center;gap:7px;min-height:42px;padding:0 16px;border:0;border-bottom:2px solid transparent;background:transparent;color:var(--invoice-sub);font:inherit;font-size:14px;cursor:pointer;white-space:nowrap}
    .invoice-primary-tab:hover{color:var(--invoice-ink);background:var(--invoice-hover)}
    .invoice-primary-tab.is-active{color:var(--invoice-blue);border-bottom-color:var(--invoice-blue);font-weight:600}
    .invoice-tab-count{display:inline;color:inherit;background:transparent;font:500 12px/20px 'JetBrains Mono',monospace}
    .invoice-tab-count.is-danger{color:inherit;background:transparent}
    .invoice-view{width:100%;margin:0}
    .invoice-block{width:100%;padding:20px;background:var(--invoice-card);border:0;border-radius:8px}
    .invoice-block+.invoice-block{margin-top:16px}
    .invoice-status-tabs{display:flex;align-items:center;flex-wrap:nowrap;gap:0;max-width:100%;overflow-x:auto;border:0;scrollbar-width:none}
    .invoice-status-tabs::-webkit-scrollbar{display:none}
    .invoice-status-tab{position:relative;height:30px;padding:0 12px;border:1px solid var(--invoice-line);border-radius:0;background:#fff;color:var(--invoice-sub);font:inherit;font-size:13px;cursor:pointer;white-space:nowrap}
    .invoice-status-tab:first-child{border-radius:4px 0 0 4px}
    .invoice-status-tab:last-child{border-radius:0 4px 4px 0}
    .invoice-status-tab+.invoice-status-tab{margin-left:-1px}
    .invoice-status-tab:hover{background:var(--invoice-hover);color:var(--invoice-body)}
    .invoice-status-tab.is-active{z-index:1;border-color:var(--invoice-blue);background:#E6F0FF;color:var(--invoice-blue);font-weight:600;box-shadow:none}
    .invoice-data-scope-tabs{width:300px;overflow:visible}
    .invoice-data-scope-tabs .invoice-status-tab{flex:1;height:32px;padding:0 16px}
    .invoice-filter-flow{display:flex;flex-wrap:wrap;align-items:center;column-gap:16px;row-gap:12px;width:100%;max-width:1776px}
    .invoice-filter-item{display:flex;flex:0 0 388px;width:388px;min-width:0;align-items:center;gap:0}
    .invoice-filter-item label,.invoice-filter-name{width:88px;flex:none;text-align:right;color:var(--invoice-body);font-size:13px;line-height:18px}
    .invoice-filter-item label:after,.invoice-filter-name:after{content:'：'}
    .invoice-filter-label{display:block;margin-top:14px;color:var(--invoice-body);font-size:13px;line-height:20px}
    .invoice-control{width:400px;max-width:100%;height:32px;padding:0 8px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-body);font:inherit;font-size:14px;outline:none}
    .invoice-filter-item .invoice-control{width:300px}
    .invoice-control::placeholder{color:var(--invoice-muted);font-size:14px}
    .invoice-control:focus{border-color:var(--invoice-blue);box-shadow:0 0 0 2px rgba(0,102,255,.12)}
    .invoice-filter-actions{display:flex;flex:none;align-items:center;gap:12px}
    .invoice-context-actions{display:flex;flex:none;align-items:center;margin-left:auto;padding-left:16px;border-left:1px solid var(--invoice-line-light)}
    .invoice-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;padding:0 12px;border:1px solid transparent;border-radius:4px;font:inherit;font-size:13px;line-height:30px;cursor:pointer;white-space:nowrap;transition:background .15s,border-color .15s,color .15s,box-shadow .15s}
    .invoice-btn:focus-visible,.invoice-btn-link:focus-visible,.invoice-icon-btn:focus-visible,.icon-btn:focus-visible,.invoice-primary-tab:focus-visible,.invoice-status-tab:focus-visible,.invoice-config-tab:focus-visible,.invoice-detail-tab:focus-visible,.invoice-page-btn:focus-visible,.invoice-anno-toggle:focus-visible{outline:2px solid var(--invoice-blue);outline-offset:2px}
    .invoice-btn-primary{background:var(--invoice-blue);color:#fff}
    .invoice-btn-primary:hover{background:#0052CC}
    .invoice-btn-default{background:#fff;border-color:var(--invoice-line);color:var(--invoice-body)}
    .invoice-btn-default:hover{background:var(--invoice-hover);border-color:#C7CBD2}
    .invoice-btn-danger{background:#fff;border-color:#F0B7BE;color:var(--invoice-danger)}
    .invoice-btn-danger:hover{background:var(--invoice-danger-bg)}
    .invoice-btn-link{height:auto;padding:0;border:0;background:transparent;color:var(--invoice-blue);font-size:13px;cursor:pointer}
    .invoice-btn-link:hover{text-decoration:underline}
    .invoice-btn[disabled]{opacity:.48;cursor:not-allowed}
    .invoice-kpi-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin:16px 0}
    .invoice-kpi{min-height:78px;padding:12px;border:1px solid var(--invoice-line-light);border-radius:6px;background:var(--invoice-page)}
    .invoice-kpi-grid.is-borderless .invoice-kpi{border:0}
    .invoice-kpi-label{color:var(--invoice-sub);font-size:12px;line-height:18px}
    .invoice-kpi-value{margin-top:5px;color:var(--invoice-ink);font:600 20px/26px 'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}
    .invoice-kpi-note{margin-top:1px;color:var(--invoice-muted);font-size:11px;line-height:16px}
    .invoice-head-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .invoice-selection{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:0 0 10px;padding:9px 12px;border:1px solid #B8D2FF;border-radius:4px;background:#F4F8FF;color:var(--invoice-blue);font-size:12px}
    .invoice-selection-actions{display:flex;align-items:center;gap:8px}
    .invoice-table-wrap{width:100%;overflow-x:auto;border:0;border-radius:0;scrollbar-color:#C7CBD2 transparent;scrollbar-width:thin}
    .invoice-table-wrap::-webkit-scrollbar{height:8px}
    .invoice-table-wrap::-webkit-scrollbar-thumb{background:#C7CBD2;border:2px solid transparent;border-radius:4px;background-clip:padding-box}
    .invoice-table{width:100%;min-width:1120px;border-collapse:collapse;font-size:13px}
    .invoice-table th{height:auto;padding:9px 12px;border-bottom:1px solid var(--invoice-line);background:#F0F1F3;color:var(--invoice-sub);font-size:12px;font-weight:600;text-align:left;white-space:nowrap}
    .invoice-sort-button{display:inline-flex;align-items:center;gap:4px;padding:0;border:0;background:transparent;color:var(--invoice-sub);font:inherit;font-weight:600;white-space:nowrap;cursor:pointer}
    .invoice-sort-button:hover,.invoice-sort-button:focus-visible,.invoice-sort-button[data-sort-direction="asc"],.invoice-sort-button[data-sort-direction="desc"]{color:var(--invoice-blue)}
    .invoice-sort-button:focus-visible{outline:2px solid var(--invoice-blue);outline-offset:2px;border-radius:2px}
    .invoice-sort-icon{display:inline-flex;width:10px;height:14px;flex:none;flex-direction:column;align-items:center;justify-content:center;gap:2px}
    .invoice-sort-caret{display:block;width:10px;height:6px;flex:none;background:currentColor;color:var(--invoice-muted);transition:color .15s ease}
    .invoice-sort-caret.is-up{clip-path:polygon(50% 0,100% 100%,0 100%)}
    .invoice-sort-caret.is-down{clip-path:polygon(0 0,100% 0,50% 100%)}
    .invoice-sort-button[data-sort-direction="asc"] .invoice-sort-caret.is-up,.invoice-sort-button[data-sort-direction="desc"] .invoice-sort-caret.is-down{color:var(--invoice-blue)}
    .invoice-table td{height:48px;padding:9px 12px;border-bottom:1px solid var(--invoice-line-light);color:var(--invoice-body);font-size:13px;line-height:18px;text-align:left;vertical-align:middle;white-space:nowrap}
    .invoice-table tbody tr:last-child td{border-bottom:1px solid var(--invoice-line-light)}
    .invoice-table tbody tr:hover{background:var(--invoice-hover)}
    .invoice-table .primary-cell{color:var(--invoice-ink);font-weight:550}
    .invoice-table .amount{color:var(--invoice-ink);font:500 13px/18px 'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}
    .invoice-table .muted{color:var(--invoice-muted);font-size:12px}
    .invoice-table .actions{display:flex;align-items:center;gap:12px}
    .invoice-check{width:15px;height:15px;accent-color:var(--invoice-blue);vertical-align:middle}
    .invoice-application-select-cell{width:27px;padding-right:0!important}
    .invoice-application-id-cell{padding-left:20px!important}
    .invoice-badge{display:inline-flex;align-items:center;gap:4px;min-height:22px;padding:0 7px;border:1px solid transparent;border-radius:4px;font-size:11px;line-height:20px;white-space:nowrap}
    .invoice-badge-primary{color:var(--invoice-blue);background:#E6F0FF;border-color:#B8D2FF}
    .invoice-badge-info{color:#006B9E;background:var(--invoice-info-bg);border-color:#B8DFEF}
    .invoice-badge-success{color:#087E40;background:var(--invoice-success-bg);border-color:#B8E7CE}
    .invoice-badge-warning{color:#A84D16;background:var(--invoice-warning-bg);border-color:#F0C9A8}
    .invoice-badge-danger{color:#AF0017;background:var(--invoice-danger-bg);border-color:#F0B7BE}
    .invoice-badge-neutral{color:var(--invoice-sub);background:#F0F1F3;border-color:var(--invoice-line)}
    .invoice-status-parameter{display:inline;color:var(--invoice-sub);font-size:12px;font-weight:500;line-height:20px;white-space:nowrap}
    .invoice-status-parameter.is-primary{color:var(--invoice-blue)}
    .invoice-status-parameter.is-info{color:#006B9E}
    .invoice-status-parameter.is-success{color:#087E40}
    .invoice-status-parameter.is-warning{color:#A84D16}
    .invoice-status-parameter.is-danger{color:#AF0017}
    .invoice-pagination{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:16px;padding-top:20px;color:var(--invoice-sub);font-size:12px}
    .invoice-page-btn{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;padding:0 8px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-body);font:500 12px inherit;cursor:pointer;transition:background .15s,border-color .15s,color .15s}
    .invoice-page-btn:not(:disabled):not(.is-active):hover{color:var(--invoice-blue);border-color:var(--invoice-blue);background:#fff}
    .invoice-page-btn.is-active{color:#fff;background:var(--invoice-blue);border-color:var(--invoice-blue);font-weight:600}
    .invoice-page-btn:disabled{color:#C7CAD1;cursor:not-allowed;background:var(--invoice-page);border-color:var(--invoice-line)}
    .invoice-empty{display:grid;place-items:center;padding:48px 20px;color:var(--invoice-sub);text-align:center}
    .invoice-empty-icon{display:grid;width:44px;height:44px;place-items:center;border-radius:8px;background:var(--invoice-page);color:var(--invoice-muted)}
    .invoice-empty strong{margin-top:14px;color:var(--invoice-ink);font-size:15px}
    .invoice-empty p{margin:5px 0 0;font-size:12px}
    .invoice-subtabs{display:flex;align-items:center;gap:3px;margin:-2px 0 16px;padding-bottom:10px;border-bottom:1px solid var(--invoice-line-light)}
    .invoice-config-tab{height:30px;padding:0 11px;border:0;border-radius:4px;background:transparent;color:var(--invoice-sub);font:inherit;font-size:13px;cursor:pointer}
    .invoice-config-tab:hover{background:var(--invoice-hover)}
    .invoice-config-tab.is-active{background:#E6F0FF;color:var(--invoice-blue);font-weight:600}
    .invoice-config-callout{display:flex;align-items:flex-start;gap:10px;margin:0 0 14px;padding:11px 13px;border:1px solid #C8E7F3;border-radius:4px;background:#F4FBFE;color:var(--invoice-info);font-size:12px;line-height:18px}
    .invoice-config-callout strong{color:#006B9E;font-weight:600}
    .invoice-config-state{font-size:11px;color:var(--invoice-sub)}
    .invoice-overlay,.invoice-dialog-overlay{position:fixed;inset:0;z-index:80;background:rgba(26,29,36,.28)}
    .invoice-overlay{display:flex;justify-content:flex-end}
    .invoice-drawer{width:960px;max-width:100%;height:100%;background:#fff;box-shadow:-8px 0 28px rgba(26,29,36,.12);display:flex;flex-direction:column}
    .invoice-drawer-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:18px 24px 15px;border-bottom:1px solid var(--invoice-line);flex:none}
    .invoice-drawer-kicker,.invoice-dialog-kicker{color:var(--invoice-muted);font-size:11px;line-height:16px;letter-spacing:.04em}
    .invoice-drawer-header h2{margin:2px 0 0;color:var(--invoice-ink);font-size:18px;line-height:25px;font-weight:650}
    .invoice-drawer-header p{margin:3px 0 0;color:var(--invoice-sub);font:12px/18px 'JetBrains Mono',monospace}
    .invoice-icon-btn,.icon-btn{display:inline-grid;width:32px;height:32px;place-items:center;border:0;border-radius:4px;background:transparent;color:var(--invoice-sub);cursor:pointer;flex:none}
    .invoice-icon-btn:hover,.icon-btn:hover{background:var(--invoice-hover);color:var(--invoice-body)}
    .invoice-drawer-body{flex:1;overflow:auto;padding:20px 24px 24px}
    .invoice-drawer-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 24px;border-top:1px solid var(--invoice-line);flex:none}
    .invoice-drawer-footer-note{color:var(--invoice-sub);font-size:12px;line-height:18px}
    .invoice-detail-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px;margin-bottom:18px}
    .invoice-detail-title{color:var(--invoice-ink);font-size:15px;font-weight:600}
    .invoice-detail-sub{margin-top:3px;color:var(--invoice-sub);font-size:12px}
    .invoice-detail-states{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:18px}
    .invoice-detail-state{padding:10px;border:1px solid var(--invoice-line-light);border-radius:5px;background:var(--invoice-page)}
    .invoice-detail-state-label{color:var(--invoice-sub);font-size:11px}
    .invoice-detail-state-value{margin-top:5px}
    .invoice-detail-tabs{display:flex;gap:2px;overflow-x:auto;margin-bottom:16px;border-bottom:1px solid var(--invoice-line-light)}
    .invoice-detail-tab{height:32px;padding:0 11px;border:0;border-bottom:2px solid transparent;background:transparent;color:var(--invoice-sub);font:inherit;font-size:12px;cursor:pointer;white-space:nowrap}
    .invoice-detail-tab.is-active{border-bottom-color:var(--invoice-blue);color:var(--invoice-blue);font-weight:600}
    .invoice-detail-section{margin-bottom:18px}
    .invoice-detail-section h3{margin:0 0 9px;color:var(--invoice-ink);font-size:13px;line-height:20px;font-weight:600}
    .invoice-detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid var(--invoice-line-light);border-left:1px solid var(--invoice-line-light)}
    .invoice-detail-field{display:grid;grid-template-columns:110px minmax(0,1fr);min-height:38px;border-right:1px solid var(--invoice-line-light);border-bottom:1px solid var(--invoice-line-light);font-size:12px}
    .invoice-detail-field dt{padding:10px;background:#FAFBFC;color:var(--invoice-sub)}
    .invoice-detail-field dd{margin:0;padding:10px;color:var(--invoice-body);overflow-wrap:anywhere}
    .invoice-detail-field dd.mono{font-family:'JetBrains Mono',monospace;font-size:11px}
    .invoice-timeline{display:flex;flex-direction:column;gap:0}
    .invoice-timeline-item{display:grid;grid-template-columns:20px 110px minmax(0,1fr);gap:9px;min-height:48px;font-size:12px}
    .invoice-timeline-dot{position:relative;display:flex;justify-content:center}
    .invoice-timeline-dot:before{content:'';width:8px;height:8px;margin-top:5px;border-radius:50%;background:var(--invoice-blue);z-index:1}
    .invoice-timeline-dot:after{content:'';position:absolute;top:13px;bottom:-1px;width:1px;background:var(--invoice-line)}
    .invoice-timeline-item:last-child .invoice-timeline-dot:after{display:none}
    .invoice-timeline-time{color:var(--invoice-muted);font:11px/18px 'JetBrains Mono',monospace}
    .invoice-timeline-copy{color:var(--invoice-body);line-height:18px}
    .invoice-dialog-overlay{display:grid;place-items:center;padding:16px}
    .invoice-dialog{width:600px;max-width:100%;max-height:calc(100vh - 32px);overflow:auto;border-radius:8px;background:#fff;box-shadow:0 8px 28px rgba(26,29,36,.16)}
    .invoice-dialog-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;border-bottom:1px solid var(--invoice-line)}
    .invoice-dialog-header h2{margin:0;color:var(--invoice-ink);font-size:16px;line-height:22px;font-weight:650}
    .invoice-dialog-body{padding:20px}
    .invoice-dialog-footer{display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:13px 20px;border-top:1px solid var(--invoice-line)}
    .invoice-dialog-copy{color:var(--invoice-body);font-size:13px;line-height:21px}
    .invoice-dialog-copy strong{color:var(--invoice-ink)}
    .invoice-textarea{width:100%;min-height:104px;margin-top:7px;padding:9px;border:1px solid var(--invoice-line);border-radius:4px;resize:vertical;color:var(--invoice-body);font:13px/20px inherit;outline:none}
    .invoice-textarea:focus{border-color:var(--invoice-blue);box-shadow:0 0 0 2px rgba(0,102,255,.12)}
    .invoice-form-error{margin-top:6px;color:var(--invoice-danger);font-size:12px;line-height:18px}
    .invoice-preview{width:760px;max-width:100%;max-height:calc(100vh - 32px);overflow:auto;border-radius:8px;background:#fff;box-shadow:0 8px 28px rgba(26,29,36,.16)}
    .invoice-preview-body{padding:24px;background:#F1F3F5}
    .invoice-paper{max-width:620px;margin:0 auto;padding:34px 38px;background:#fff;border:1px solid #D7DADE;box-shadow:0 2px 8px rgba(26,29,36,.08)}
    .invoice-paper h3{margin:0;text-align:center;color:var(--invoice-ink);font-size:19px;line-height:26px;font-weight:650}
    .invoice-paper-meta{display:flex;justify-content:space-between;margin-top:25px;color:var(--invoice-sub);font:11px/16px 'JetBrains Mono',monospace}
    .invoice-paper-lines{margin-top:20px;border:1px solid #BFC4CB;border-bottom:0}
    .invoice-paper-line{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,.7fr) minmax(0,.8fr) minmax(0,1fr);border-bottom:1px solid #BFC4CB}
    .invoice-paper-line span{min-width:0;min-height:32px;padding:8px;border-right:1px solid #BFC4CB;color:var(--invoice-body);font-size:11px;overflow-wrap:anywhere}
    .invoice-paper-line span:last-child{border-right:0}
    .invoice-paper-total{display:flex;justify-content:flex-end;gap:28px;padding-top:18px;color:var(--invoice-ink);font:600 13px/20px 'JetBrains Mono',monospace}
    .invoice-toast-stack{position:fixed;top:18px;left:50%;z-index:120;display:flex;flex-direction:column;gap:8px;transform:translateX(-50%);pointer-events:none}
    .invoice-toast{display:flex;align-items:center;gap:8px;min-width:240px;max-width:min(460px,calc(100vw - 32px));padding:10px 14px;border:1px solid var(--invoice-line);border-radius:5px;background:#fff;box-shadow:0 4px 16px rgba(26,29,36,.12);color:var(--invoice-body);font-size:13px;animation:invoice-toast-enter .18s cubic-bezier(.16,1,.3,1)}
    .invoice-toast.is-success{border-color:#A9E2C3}
    .invoice-toast.is-success svg{color:#087E40}
    .invoice-toast.is-warning{border-color:#F0C9A8}
    .invoice-toast.is-warning svg{color:#A84D16}
    .invoice-toast.is-danger{border-color:#F0B7BE}
    .invoice-toast.is-danger svg{color:#AF0017}
    @keyframes invoice-toast-enter{from{opacity:0;transform:translateY(-6px);filter:blur(2px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}
    .invoice-anno-layer{position:fixed;inset:0;z-index:110;pointer-events:none}
    .invoice-anno-badge{position:fixed;display:grid;width:20px;height:20px;place-items:center;border:0;border-radius:50%;background:var(--invoice-blue);color:#fff;font:700 11px/20px 'JetBrains Mono',monospace;box-shadow:0 2px 6px rgba(0,0,0,.16);pointer-events:auto;cursor:pointer}
    .invoice-anno-badge:hover{transform:scale(1.12)}
    .invoice-anno-toggle{position:fixed;right:8px;top:120px;z-index:109;display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 11px;border:0;border-radius:16px;background:var(--invoice-blue);color:#fff;font:500 12px/32px inherit;box-shadow:0 2px 8px rgba(26,29,36,.16);cursor:pointer}
    .invoice-anno-toggle[aria-pressed="true"]{background:#1A1D24}
    .invoice-anno-popup{position:fixed;inset:0;z-index:130;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.3)}
    .invoice-anno-panel{width:520px;max-width:100%;border-radius:8px;background:#fff;box-shadow:0 8px 28px rgba(26,29,36,.16)}
    .invoice-anno-panel header{display:flex;align-items:center;justify-content:space-between;padding:15px 20px;border-bottom:1px solid var(--invoice-line)}
    .invoice-anno-panel h2{margin:0;color:var(--invoice-ink);font-size:16px}
    .invoice-anno-panel>div{padding:18px 20px;color:var(--invoice-body);font-size:13px;line-height:21px}
    .invoice-anno-panel p{margin:0 0 8px}
    .invoice-anno-panel p:last-child{margin-bottom:0}
    .invoice-table .row-attention td:first-child{box-shadow:inset 3px 0 0 var(--invoice-warning)}
    .invoice-module [hidden]{display:none!important}
    .invoice-module .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
    .invoice-module .text-danger{color:var(--invoice-danger)}
    .invoice-module .text-success{color:#087E40}
    .invoice-module .text-info{color:#006B9E}
    .invoice-overlay:not([hidden])~.invoice-anno-toggle,.invoice-dialog-overlay:not([hidden])~.invoice-anno-toggle{display:none}
    .invoice-view{container:invoice-view / inline-size}
    .invoice-section-actions{display:flex;justify-content:flex-end;align-items:center;margin:0 0 12px}
    .invoice-section-actions.is-leading{justify-content:flex-start}
    .invoice-list-header{display:flex;align-items:center;justify-content:flex-start;gap:8px;margin:0 0 12px}
    .invoice-list-header.has-actions{justify-content:space-between;gap:12px}
    .invoice-list-heading{display:flex;align-items:center;gap:8px;min-width:0}
    .invoice-list-title{margin:0;color:var(--invoice-ink);font-size:16px;line-height:24px;font-weight:600}
    .invoice-list-total{color:var(--invoice-muted);font-size:12px;line-height:20px;white-space:nowrap}
    .invoice-list-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 16px;padding-top:12px;border-top:1px solid var(--invoice-line-light)}
    .invoice-list-actions{display:flex;align-items:center;gap:8px;flex:none}
    .invoice-document-summary{padding-top:12px;border-top:1px solid var(--invoice-line-light)}
    .invoice-document-summary .invoice-kpi-grid{margin:0 0 16px}
    .invoice-document-summary.is-after-divider{padding-top:0;border-top:0}
    .invoice-list-divider{margin:0 0 16px;padding-top:12px;border-top:1px solid var(--invoice-line-light)}
    .invoice-list-toolbar.is-actions-only{justify-content:flex-end}
    .invoice-config-filter{display:flex;flex-direction:column;gap:0}
    .invoice-config-top{margin-bottom:16px}
    .invoice-main.is-config-view{padding-bottom:16px}
    .invoice-config-page{display:flex;min-height:calc(100vh - 56px - 32px);flex-direction:column}
    .invoice-config-workspace{display:grid;grid-template-columns:300px minmax(0,1fr);gap:0;align-items:stretch;flex:1;min-height:0}
    .invoice-config-workspace>.invoice-block+.invoice-block{margin-top:0}
    .invoice-config-nav,.invoice-config-list{min-width:0;height:100%}
    .invoice-config-nav{min-height:100%;padding:16px;border-radius:8px 0 0 8px;border-right:1px solid var(--invoice-line-light)}
    .invoice-config-list{border-radius:0 8px 8px 0}
    .invoice-config-tabs{display:flex;flex-direction:column;gap:4px;margin:0}
    .invoice-config-tabs .invoice-config-tab{width:100%;height:38px;padding:0 12px;text-align:left}
    .invoice-config-tabs .invoice-config-tab.is-active{box-shadow:inset 3px 0 0 var(--invoice-blue)}
    .invoice-config-list .invoice-list-header{margin-bottom:0}
    .invoice-config-list .invoice-list-divider{margin-top:12px}
    .invoice-detail-state-panel{margin:0 0 18px;padding:12px 0;border:0;border-radius:6px;background:var(--invoice-page)}
    .invoice-detail-state-panel .invoice-detail-states{gap:0;margin:0}
    .invoice-detail-state-panel .invoice-detail-state{min-width:0;padding:2px 16px;border:0;border-right:1px solid var(--invoice-line);border-radius:0;background:transparent}
    .invoice-detail-state-panel .invoice-detail-state:last-child{border-right:0}
    .invoice-table .amount,.invoice-table .mono,.invoice-table[aria-label="开票申请列表"] td:nth-child(2),.invoice-table[aria-label="票据列表"] td:first-child,.invoice-table[aria-label="红冲任务列表"] td:first-child,.invoice-table[aria-label="红冲任务列表"] td:nth-child(3),.invoice-table[aria-label="更正申请列表"] td:first-child{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}
    .invoice-page-nav{display:flex;align-items:center;gap:4px}
    .invoice-page-ellipsis{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;color:var(--invoice-muted);font-size:13px}
    .invoice-page-size-control{display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
    .invoice-page-select-wrap{position:relative;display:inline-flex;align-items:center}
    .invoice-page-size-select{width:auto;min-width:84px;height:30px;padding:0 8px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-body);font:inherit;outline:none;cursor:pointer}
    .invoice-page-size-select:focus{border-color:var(--invoice-blue);box-shadow:0 0 0 2px rgba(0,102,255,.12)}
    .invoice-page-size-select:disabled{cursor:not-allowed;background:var(--invoice-page);color:var(--invoice-muted)}
    .invoice-page-meta{display:flex;align-items:center;gap:12px;white-space:nowrap}
    .invoice-page-jump{display:inline-flex;align-items:center;gap:6px;color:var(--invoice-body)}
    .invoice-page-jump-input{width:44px;height:30px;padding:0;text-align:center;border:1px solid var(--invoice-line);border-radius:4px;color:var(--invoice-body);font:12px inherit;outline:none}
    .invoice-page-jump-input:focus{border-color:var(--invoice-blue);box-shadow:0 0 0 2px rgba(0,102,255,.12)}
    .invoice-page-jump-input:disabled{background:var(--invoice-page);color:var(--invoice-muted)}
    .invoice-page-stats{color:var(--invoice-muted);white-space:nowrap}
    .invoice-date-range{position:relative;z-index:2;display:flex;align-items:center;gap:0;width:300px;max-width:100%;height:32px;padding:0 10px 0 12px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-body);outline:none;cursor:pointer;transition:border-color .15s,box-shadow .15s}
    .invoice-date-range:hover{background:var(--invoice-hover)}
    .invoice-date-range:focus-within,.invoice-date-range.is-open{z-index:70;border-color:var(--invoice-blue);box-shadow:0 0 0 2px rgba(0,102,255,.12)}
    .invoice-date-range>svg{width:16px;height:16px;flex:none;margin-left:8px;color:var(--invoice-muted)}
    .invoice-date-input{min-width:0;width:0;flex:1;height:30px;padding:0;border:0;background:transparent;color:var(--invoice-body);font:inherit;font-size:13px;text-align:left;outline:none;cursor:pointer;caret-color:transparent}
    .invoice-date-input:not(:placeholder-shown){font-family:'JetBrains Mono',monospace;font-size:12px}
    .invoice-date-input::placeholder{color:var(--invoice-muted);font-size:13px}
    .invoice-date-sep{flex:none;margin:0 6px;color:var(--invoice-muted);font-size:14px;line-height:30px}
    .invoice-date-picker{position:absolute;top:calc(100% + 8px);left:0;z-index:80;display:none;width:620px;max-width:calc(100vw - 32px);padding:16px;border:1px solid var(--invoice-line);border-radius:8px;background:#fff;box-shadow:0 6px 24px rgba(0,0,0,.12);cursor:default}
    .invoice-date-range.is-open .invoice-date-picker{display:block}
    .invoice-date-picker-months{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}
    .invoice-calendar-month{min-width:0;padding:0 14px 2px}
    .invoice-calendar-month+.invoice-calendar-month{border-left:1px solid var(--invoice-line-light)}
    .invoice-calendar-heading{display:grid;grid-template-columns:60px minmax(0,1fr) 60px;align-items:center;min-height:32px;margin-bottom:8px}
    .invoice-calendar-title{text-align:center;color:var(--invoice-ink);font-size:14px;font-weight:600;letter-spacing:0}
    .invoice-calendar-nav-group{display:flex;align-items:center;gap:2px}
    .invoice-calendar-nav-group.is-end{justify-content:flex-end}
    .invoice-calendar-nav{display:inline-grid;width:28px;height:28px;place-items:center;padding:0;border:0;border-radius:4px;background:transparent;color:var(--invoice-sub);cursor:pointer}
    .invoice-calendar-nav:hover{background:var(--invoice-hover);color:var(--invoice-blue)}
    .invoice-calendar-nav:focus-visible,.invoice-calendar-day:focus-visible{outline:2px solid var(--invoice-blue);outline-offset:1px}
    .invoice-calendar-nav svg{width:15px;height:15px}
    .invoice-calendar-nav-spacer{width:60px;height:28px}
    .invoice-calendar-week,.invoice-calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr))}
    .invoice-calendar-week{margin-bottom:3px;color:var(--invoice-muted);font-size:12px;text-align:center}
    .invoice-calendar-week span{height:26px;line-height:26px}
    .invoice-calendar-grid{gap:0;justify-items:center}
    .invoice-calendar-day{position:relative;width:30px;height:30px;padding:0;border:1px solid transparent;border-radius:4px;background:transparent;color:var(--invoice-body);font:12px/30px 'JetBrains Mono',monospace;cursor:pointer}
    .invoice-calendar-day:hover{border-color:var(--invoice-blue);background:#E6F0FF;color:var(--invoice-blue)}
    .invoice-calendar-day.is-muted{color:#C7CAD1}
    .invoice-calendar-day.is-today{border-color:var(--invoice-blue);color:var(--invoice-blue);font-weight:600}
    .invoice-calendar-day.is-in-range{border-radius:0;background:#E6F0FF;color:var(--invoice-blue)}
    .invoice-calendar-day.is-start,.invoice-calendar-day.is-end{z-index:1;border-color:var(--invoice-blue);border-radius:4px;background:var(--invoice-blue);color:#fff;font-weight:600}
    .invoice-date-picker-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:45px;margin-top:16px;padding:12px 0 0;border-top:1px solid var(--invoice-line-light)}
    .invoice-date-picker-hint{color:var(--invoice-muted);font-size:12px;line-height:18px}
    .invoice-date-picker-actions{display:flex;align-items:center;gap:8px}
    .invoice-date-picker-action{height:28px;padding:0 10px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-body);font:inherit;font-size:12px;cursor:pointer}
    .invoice-date-picker-action:hover{border-color:#B8D2FF;color:var(--invoice-blue)}
    .invoice-date-picker-action.is-primary{border-color:var(--invoice-blue);background:var(--invoice-blue);color:#fff}
    .invoice-date-picker-action.is-primary:hover{background:var(--invoice-blue-hover)}
    .invoice-th-with-help{display:inline-flex;align-items:center;gap:5px}
    .invoice-status-help{position:relative;display:inline-flex;align-items:center}
    .invoice-status-help>button{display:inline-grid;width:14px;height:14px;place-items:center;padding:0;border:1px solid var(--invoice-muted);border-radius:50%;background:transparent;color:var(--invoice-muted);font:600 9px/12px Arial,sans-serif;cursor:help}
    .invoice-status-help>button:hover,.invoice-status-help>button:focus-visible{border-color:var(--invoice-blue);color:var(--invoice-blue);outline:none}
    .invoice-status-help-popover{position:fixed;top:auto;left:auto;z-index:160;display:flex;visibility:hidden;flex-direction:column;gap:5px;width:292px;max-width:calc(100vw - 16px);padding:10px 12px;border:1px solid var(--invoice-line);border-radius:5px;background:#fff;box-shadow:0 5px 16px rgba(26,29,36,.14);color:var(--invoice-body);font-size:12px;font-weight:400;line-height:18px;opacity:0;pointer-events:none;transition:opacity .12s,visibility .12s}
    .invoice-status-help-popover strong{color:var(--invoice-ink);font-size:12px;font-weight:600}
    .invoice-status-help-popover span{display:block;white-space:normal}
    .invoice-status-help:hover .invoice-status-help-popover,.invoice-status-help:focus-within .invoice-status-help-popover,.invoice-status-help[data-open="true"] .invoice-status-help-popover{visibility:visible;opacity:1;pointer-events:auto}
    .invoice-status-help[data-open="false"] .invoice-status-help-popover{visibility:hidden!important;opacity:0!important;pointer-events:none!important}
    .invoice-status-help[data-dismissed="true"] .invoice-status-help-popover{visibility:hidden!important;opacity:0!important;pointer-events:none!important}
    @container invoice-view (max-width:1100px){
    .invoice-kpi-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
    }
    @container invoice-view (max-width:760px){
    .invoice-context-actions{margin-left:0;padding-left:0;border-left:0}
    .invoice-kpi-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
    .invoice-kpi:last-child:nth-child(odd){grid-column:1 / -1;width:calc((100% - 8px)/2);justify-self:center}
    }
    @container invoice-view (max-width:420px){
    .invoice-filter-item{width:100%;flex-basis:100%}
    .invoice-filter-item .invoice-control{width:auto;min-width:0;flex:1}
    .invoice-filter-item .invoice-date-range{width:auto;min-width:0;flex:1}
    }
    @container invoice-view (max-width:760px){
    .invoice-config-workspace{grid-template-columns:1fr;flex:none}
    .invoice-config-nav{padding:12px}
    .invoice-config-nav,.invoice-config-list{height:auto}
    .invoice-config-nav{border-right:0;border-radius:8px 8px 0 0;border-bottom:1px solid var(--invoice-line-light)}
    .invoice-config-list{border-radius:0 0 8px 8px}
    .invoice-config-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px}
    }
    @media(max-width:720px){
    .invoice-primary-tab{padding:0 11px;font-size:13px}
    .invoice-block{padding:16px 12px}
    .invoice-kpi{min-height:70px;padding:10px}
    .invoice-kpi-value{font-size:17px}
    .invoice-detail-state-panel .invoice-detail-states{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:12px}
    .invoice-detail-state-panel .invoice-detail-state:nth-child(2){border-right:0}
    .invoice-detail-grid{grid-template-columns:1fr}
    .invoice-drawer-header,.invoice-drawer-body,.invoice-drawer-footer{padding-left:16px;padding-right:16px}
    .invoice-paper{padding:24px 18px}
    .invoice-paper-meta{display:block}
    .invoice-paper-meta span{display:block;margin-top:4px}
    .invoice-pagination{justify-content:flex-start}
    .invoice-page-meta{flex-wrap:wrap;white-space:normal}
    .invoice-anno-toggle{right:6px;top:104px;width:32px;padding:0;justify-content:center;border-radius:50%}
    .invoice-anno-toggle span{display:none}
    }
    @media(max-width:520px){
    .invoice-filter-actions,.invoice-context-actions{width:100%}
    .invoice-list-toolbar{align-items:flex-start;flex-direction:column}
    .invoice-list-actions{width:100%;justify-content:flex-end}
    .invoice-list-header.has-actions{align-items:flex-start;flex-direction:column;gap:10px}
    .invoice-list-header.has-actions .invoice-list-heading{width:100%;flex:none}
    .invoice-list-header.has-actions .invoice-list-actions{width:100%;justify-content:flex-end}
    .invoice-drawer-footer{align-items:stretch;flex-direction:column}
    .invoice-drawer-footer .invoice-head-actions{justify-content:flex-end}
    .invoice-paper-line{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
    .invoice-paper-line span:nth-child(2n){border-right:0}
    .invoice-pagination{align-items:flex-start;flex-direction:column}
    .invoice-page-meta{gap:8px}
    }
    @media(max-width:480px){
    .invoice-date-picker{right:0;left:auto;width:calc(100vw - 32px)}
    .invoice-date-picker-months{grid-template-columns:1fr}
    .invoice-calendar-month+.invoice-calendar-month{margin-top:16px;padding-top:16px;border-top:1px solid var(--invoice-line-light);border-left:0}
    }
    @media(prefers-reduced-motion:reduce){.invoice-toast{animation:none}}
  `;

  var scripts = String.raw`
    (function () {
      var root = document.querySelector('[data-module-root="invoice-management"]');
      if (!root) return;
      var view = root.querySelector('#invoiceView');
      var drawer = root.querySelector('#invoiceDrawer');
      var dialog = root.querySelector('#invoiceDialog');
      var preview = root.querySelector('#invoicePreview');
      var toastHost = root.querySelector('#invoiceToast');
      var currentTab = 'applications';
      var applicationStatus = 'ALL';
      var applicationPage = 1;
      var documentPage = 1;
      var redPage = 1;
      var applicationPageSize = 20;
      var documentPageSize = 20;
      var redPageSize = 20;
      var configPage = 1;
      var redSubtab = 'tasks';
      var configSubtab = 'entities';
      var detailTab = 'overview';
      var selectedApplications = [];
      var currentApplicationId = null;
      var dialogContext = null;
      var annoVisible = false;
      var applicationFilters = { keyword: '', subject: '', type: '', startDate: '', endDate: '' };
      var applicationSort = { key: 'created', direction: 'desc' };
      var applicationCalendarOpen = false;
      var applicationCalendarStart = '';
      var applicationCalendarEnd = '';
      var applicationCalendarCommittedStart = '';
      var applicationCalendarCommittedEnd = '';
      var applicationCalendarSnapshotStart = '';
      var applicationCalendarSnapshotEnd = '';
      var applicationCalendarNow = new Date();
      var applicationCalendarMonth = new Date(applicationCalendarNow.getFullYear(), applicationCalendarNow.getMonth(), 1);
      var documentFilters = { keyword: '', status: '', delivery: '', startDate: '', endDate: '' };
      var documentSort = { key: 'issued', direction: 'desc' };
      var documentCalendarOpen = false;
      var documentCalendarStart = '';
      var documentCalendarEnd = '';
      var documentCalendarCommittedStart = '';
      var documentCalendarCommittedEnd = '';
      var documentCalendarSnapshotStart = '';
      var documentCalendarSnapshotEnd = '';
      var documentCalendarMonth = new Date(applicationCalendarNow.getFullYear(), applicationCalendarNow.getMonth(), 1);
      var redFilters = { keyword: '', status: '', source: '' };
      var annotations = {
        2: { title: '工作台主导航', desc: ['触发：点击主 Tab。', '响应：切换申请、票据、红冲或配置视图，当前筛选条件按视图保存。'] },
        4: { title: '申请列表操作', desc: ['刷新保留当前查询与状态筛选，同时清空已选记录。', '导出按当前申请列表的查询快照创建异步任务。'] },
        5: { title: '业务视图区', desc: ['筛选、表格、分页和批量操作均在当前工作区内完成。'] },
        10: { title: '申请状态筛选', desc: ['可按申请状态快速定位待审核、开具中、已开票和失败记录。', '服务端仍需按团队、申请人和开票主体重新鉴权。'] },
        11: { title: '申请关键词', desc: ['支持申请编号、订单号或购买主体模糊搜索。', '敏感字段以脱敏值呈现。'] },
        12: { title: '查询动作', desc: ['触发：点击查询。', '响应：基于当前条件重算申请列表和总数，页码回到第一页。'] },
        14: { title: '申请数据表', desc: ['金额按元展示，后端按分存储。', '同一申请可拆成多个 ProviderTask 或票据，但申请总额不变。'] },
        15: { title: '审核入口', desc: ['待审核申请可领取 30 分钟审核锁。', '审核通过后事务内写 Outbox，再由服务身份幂等创建第三方任务。'] },
        30: { title: '票据筛选', desc: ['按票据状态、开票主体和交付状态定位文件缺失、交付失败或待补拉票据。'] },
        31: { title: '票据表格', desc: ['票据、文件和交付状态正交呈现；文件缺失保持 NOT_SENT，不伪造发送失败。'] },
        32: { title: '票据预览', desc: ['预览使用短时授权文件地址，原型只展示脱敏纸面，不落盘真实文件。'] },
        50: { title: '红冲任务筛选', desc: ['退款、用户更正、财务纠错共用原蓝票红冲分配账本。', '来源按 REFUND > FINANCE_CORRECTION > USER_CORRECTION 排队。'] },
        51: { title: '红冲任务操作', desc: ['UNKNOWN 任务只能先按原请求查询；确认未受理并关闭旧任务后才可重试或补正。'] },
        52: { title: '更正申请', desc: ['全部目标蓝票金额整组原子占额，红冲全部成功后才生成唯一重开草稿。'] },
        70: { title: '配置工作台', desc: ['配置分为开票主体、发票内容、SKU 映射、第三方服务商和通知 SLA。', '配置发布需填写变更原因并保留版本审计。'] },
        71: { title: '配置发布', desc: ['发布动作只更新当前配置版本；历史申请使用支付时固化的销售主体快照。'] },
        90: { title: '详情四维状态', desc: ['四项为同一申请的独立状态事实，不是先后执行的步骤。', '交付失败只影响交付维度，不回退开具成功或有效票据。'] },
        91: { title: '审核决策', desc: ['通过前重新校验金额、主体、票种、资格和版本。', '驳回必须记录结构化原因，用户修改后会生成新的申请 ID。'] }
      };

      var statusMeta = {
        DRAFT: ['草稿', 'neutral'], PENDING_REVIEW: ['待审核', 'primary'], REVIEWING: ['审核中', 'info'], APPROVED: ['审核通过', 'success'], REJECTED: ['已驳回', 'danger'], WITHDRAWN: ['已撤回', 'neutral'], CANCELLED: ['已取消', 'neutral'],
        NOT_SUBMITTED: ['未提交', 'neutral'], SUBMITTING: ['提交中', 'info'], ISSUING: ['开具中', 'info'], PARTIAL: ['部分成功', 'warning'], SUCCEEDED: ['开具成功', 'success'], FAILED: ['开具失败', 'danger'], UNKNOWN: ['结果未知', 'warning'],
        NONE: ['未生成', 'neutral'], ACTIVE: ['有效', 'success'], RED_PENDING: ['红冲处理中', 'warning'], PARTIALLY_RED: ['部分红冲', 'warning'], FULLY_RED: ['已全额红冲', 'neutral'], RED_FAILED: ['红冲失败', 'danger'],
        NOT_SENT: ['未发送', 'neutral'], SENDING: ['发送中', 'info'], PARTIALLY_DELIVERED: ['部分送达', 'warning'], DELIVERED: ['已送达', 'success'], DELIVERY_FAILED: ['交付失败', 'danger'],
        REFUND: ['退款红冲', 'danger'], FINANCE_CORRECTION: ['财务纠错', 'warning'], USER_CORRECTION: ['用户更正', 'info'], PENDING: ['待处理', 'neutral'], PROCESSING: ['红冲中', 'warning'], RED_PROCESSING: ['红冲处理中', 'warning'], COMPLETED: ['已完成', 'success']
      };
      var applicationStatuses = [['ALL', '全部'], ['PENDING_REVIEW', '待审核'], ['REVIEWING', '审核中'], ['ISSUING', '开具中'], ['SUCCEEDED', '已开票'], ['REJECTED', '已驳回'], ['FAILED', '开票失败'], ['RED_PENDING', '红冲处理中'], ['FULLY_RED', '已红冲']];

      function application(id, subject, subjectType, amount, status, issuance, document, delivery, created, applicant, order, content, taxRate, source, assignee, note) {
        return { id: id, subject: subject, subjectType: subjectType, amount: amount, status: status, issuance: issuance, document: document, delivery: delivery, created: created, applicant: applicant, order: order, content: content, taxRate: taxRate, source: source, assignee: assignee || '—', note: note || '—', version: 3, lockUntil: status === 'REVIEWING' ? '2026-08-19 10:25' : '' };
      }
      var applications = [
        application('IA-20260819-0012', '上海云栈信息科技有限公司', '企业', 268000, 'PENDING_REVIEW', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-19 09:42', '林财务', 'ORD-20260819-0841', '信息技术服务*技术服务费', '6%', '支付宝', '—', '同主体订单可合并，待核验销售主体快照'),
        application('IA-20260819-0011', '深圳航迹网络有限公司', '企业', 129900, 'REVIEWING', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-19 09:28', '周敏', 'ORD-20260818-0719', '信息技术服务*平台服务费', '6%', '微信支付', '周敏', '审核锁剩余 18 分钟'),
        application('IA-20260819-0010', '杭州星河数字工作室', '组织', 88000, 'APPROVED', 'ISSUING', 'NONE', 'NOT_SENT', '2026-08-19 09:16', '陈昊', 'ORD-20260818-0645', '信息技术服务*软件服务费', '6%', '银联', '陈昊', '已写入 Outbox，等待第三方回执'),
        application('IA-20260819-0009', '北京启明智能科技有限公司', '企业', 59900, 'APPROVED', 'SUCCEEDED', 'ACTIVE', 'DELIVERED', '2026-08-19 08:50', '林财务', 'ORD-20260817-0588', '信息技术服务*技术服务费', '6%', '支付宝', '林财务', '站内文件与联系邮箱均已送达'),
        application('IA-20260819-0008', '广州微澜贸易有限公司', '企业', 35000, 'REJECTED', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-19 08:32', '王莉', 'ORD-20260817-0492', '信息技术服务*平台服务费', '6%', '微信支付', '—', '销售主体税号快照缺失，请补充后重新提交'),
        application('IA-20260818-0026', '成都拾光个人用户', '个人', 12000, 'APPROVED', 'SUCCEEDED', 'ACTIVE', 'PARTIALLY_DELIVERED', '2026-08-18 18:44', '赵宁', 'ORD-20260818-0411', '信息技术服务*服务费', '免税', '支付宝', '赵宁', '站内文件可访问，联系邮箱发送失败可重发'),
        application('IA-20260818-0025', '上海云栈信息科技有限公司', '企业', 418000, 'APPROVED', 'PARTIAL', 'PARTIALLY_RED', 'PARTIALLY_DELIVERED', '2026-08-18 17:26', '林财务', 'ORD-20260816-0337', '信息技术服务*技术服务费', '6%', '支付宝', '林财务', '3 张票据中 1 张红冲处理中'),
        application('IA-20260818-0024', '武汉云图数据有限公司', '企业', 19900, 'APPROVED', 'FAILED', 'NONE', 'NOT_SENT', '2026-08-18 16:57', '陈昊', 'ORD-20260816-0298', '信息技术服务*软件服务费', '6%', '银联', '陈昊', '第三方返回税目校验失败，可按原请求重试'),
        application('IA-20260818-0023', '厦门海岸实验室', '组织', 76000, 'REVIEWING', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-18 16:08', '周敏', 'ORD-20260815-0198', '信息技术服务*平台服务费', '6%', '微信支付', '周敏', '申请人与主体范围匹配，待复核金额占用'),
        application('IA-20260818-0022', '南京极昼网络有限公司', '企业', 12800, 'WITHDRAWN', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-18 15:42', '—', 'ORD-20260815-0144', '信息技术服务*服务费', '6%', '支付宝', '—', '用户在待审核阶段主动撤回'),
        application('IA-20260818-0021', '北京启明智能科技有限公司', '企业', 66000, 'APPROVED', 'UNKNOWN', 'NONE', 'NOT_SENT', '2026-08-18 14:25', '林财务', 'ORD-20260814-0111', '信息技术服务*技术服务费', '6%', '支付宝', '林财务', '第三方超时，需按受理号查询，不可直接重试'),
        application('IA-20260818-0020', '苏州青禾个人用户', '个人', 9900, 'APPROVED', 'SUCCEEDED', 'FULLY_RED', 'DELIVERED', '2026-08-18 13:18', '赵宁', 'ORD-20260813-0087', '信息技术服务*服务费', '免税', '微信支付', '赵宁', '原蓝票已按退款净额全额红冲'),
        application('IA-20260818-0019', '合肥远见科技有限公司', '企业', 218000, 'DRAFT', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-18 11:52', '—', 'ORD-20260812-0038', '信息技术服务*技术服务费', '6%', '支付宝', '—', '草稿不占用可开票余额'),
        application('IA-20260818-0018', '重庆山海组织', '组织', 52000, 'CANCELLED', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-18 10:04', '—', 'ORD-20260811-0998', '信息技术服务*平台服务费', '6%', '银联', '—', '订单确认退款，申请已取消并释放占用')
      ];
      var documents = [
        { id: 'DOC-20260819-0081', applicationId: 'IA-20260819-0009', invoiceNo: '数电票-04438291', subject: '北京启明智能科技有限公司', amount: 59900, type: '数电专票', document: 'ACTIVE', delivery: 'DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 'f***@qiming.cn', issued: '2026-08-19 09:01', provider: '百望云', action: 'download' },
        { id: 'DOC-20260819-0080', applicationId: 'IA-20260819-0010', invoiceNo: '数电票-04438276', subject: '杭州星河数字工作室', amount: 88000, type: '数电普票', document: 'NONE', delivery: 'NOT_SENT', file: 'NOT_SENT', channel: '站内、邮件', recipient: 'c***@xinghe.cn', issued: '待回执', provider: '航信云', action: 'query' },
        { id: 'DOC-20260819-0079', applicationId: 'IA-20260818-0026', invoiceNo: '数电票-04438191', subject: '成都拾光个人用户', amount: 12000, type: '数电普票', document: 'ACTIVE', delivery: 'PARTIALLY_DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 's***@mail.com', issued: '2026-08-18 18:51', provider: '百望云', action: 'resend' },
        { id: 'DOC-20260819-0078', applicationId: 'IA-20260818-0025', invoiceNo: '数电票-04438144', subject: '上海云栈信息科技有限公司', amount: 138000, type: '数电专票', document: 'PARTIALLY_RED', delivery: 'PARTIALLY_DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 'f***@yunstack.cn', issued: '2026-08-18 17:38', provider: '百望云', action: 'red' },
        { id: 'DOC-20260819-0077', applicationId: 'IA-20260818-0025', invoiceNo: '数电票-04438145', subject: '上海云栈信息科技有限公司', amount: 140000, type: '数电专票', document: 'ACTIVE', delivery: 'DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 'f***@yunstack.cn', issued: '2026-08-18 17:38', provider: '百望云', action: 'download' },
        { id: 'DOC-20260819-0076', applicationId: 'IA-20260818-0025', invoiceNo: '数电票-04438146', subject: '上海云栈信息科技有限公司', amount: 140000, type: '数电专票', document: 'RED_PENDING', delivery: 'NOT_SENT', file: 'ACTIVE', channel: '站内、邮件', recipient: 'f***@yunstack.cn', issued: '2026-08-18 17:38', provider: '百望云', action: 'query' },
        { id: 'DOC-20260819-0075', applicationId: 'IA-20260818-0021', invoiceNo: '受理中-2026081803', subject: '北京启明智能科技有限公司', amount: 66000, type: '数电专票', document: 'NONE', delivery: 'NOT_SENT', file: 'NOT_SENT', channel: '站内、邮件', recipient: 'f***@qiming.cn', issued: '结果未知', provider: '航信云', action: 'query' },
        { id: 'DOC-20260819-0074', applicationId: 'IA-20260818-0020', invoiceNo: '数电票-04437981', subject: '苏州青禾个人用户', amount: 9900, type: '数电普票', document: 'FULLY_RED', delivery: 'DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 's***@mail.com', issued: '2026-08-18 13:28', provider: '百望云', action: 'download' },
        { id: 'DOC-20260818-0069', applicationId: 'IA-20260817-0138', invoiceNo: '数电票-04437201', subject: '广州云迹科技有限公司', amount: 328000, type: '数电专票', document: 'ACTIVE', delivery: 'SENDING', file: 'ACTIVE', channel: '站内、邮件', recipient: 'a***@yunji.cn', issued: '2026-08-17 18:13', provider: '航信云', action: 'resend' }
      ];
      var redTasks = [
        { id: 'RT-20260819-004', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04438146', applicationId: 'IA-20260818-0025', subject: '上海云栈信息科技有限公司', amount: 42000, status: 'PROCESSING', progress: '1/1', created: '2026-08-19 09:06', owner: '林财务', reason: '退款净额红冲' },
        { id: 'RT-20260819-003', source: 'FINANCE_CORRECTION', sourceName: '财务纠错', invoiceNo: '数电票-04438145', applicationId: 'IA-20260818-0025', subject: '上海云栈信息科技有限公司', amount: 140000, status: 'UNKNOWN', progress: '0/1', created: '2026-08-19 08:48', owner: '周敏', reason: '税率录入错误，等待第三方查询' },
        { id: 'RT-20260819-002', source: 'USER_CORRECTION', sourceName: '用户更正', invoiceNo: '数电票-04438191', applicationId: 'IA-20260818-0026', subject: '成都拾光个人用户', amount: 12000, status: 'FAILED', progress: '0/1', created: '2026-08-18 19:21', owner: '赵宁', reason: '受票人信息不匹配' },
        { id: 'RT-20260818-018', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04437981', applicationId: 'IA-20260818-0020', subject: '苏州青禾个人用户', amount: 9900, status: 'SUCCEEDED', progress: '1/1', created: '2026-08-18 13:36', owner: '赵宁', reason: '订单全额退款' },
        { id: 'RT-20260818-017', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04437106', applicationId: 'IA-20260817-0112', subject: '宁波远舟科技有限公司', amount: 80000, status: 'PARTIAL', progress: '1/2', created: '2026-08-18 11:17', owner: '林财务', reason: '部分退款' },
        { id: 'RT-20260818-016', source: 'FINANCE_CORRECTION', sourceName: '财务纠错', invoiceNo: '数电票-04437084', applicationId: 'IA-20260817-0097', subject: '无锡拾穗科技有限公司', amount: 56000, status: 'PENDING', progress: '0/1', created: '2026-08-18 10:42', owner: '—', reason: '税目映射错误' },
        { id: 'RT-20260817-015', source: 'USER_CORRECTION', sourceName: '用户更正', invoiceNo: '数电票-04436517', applicationId: 'IA-20260816-0052', subject: '青岛潮汐个人用户', amount: 15000, status: 'CANCELLED', progress: '0/1', created: '2026-08-17 16:12', owner: '—', reason: '用户撤回更正' },
        { id: 'RT-20260817-014', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04436228', applicationId: 'IA-20260816-0029', subject: '郑州微光组织', amount: 23400, status: 'SUCCEEDED', progress: '1/1', created: '2026-08-17 14:54', owner: '周敏', reason: '退款净额红冲' }
      ];
      var corrections = [
        { id: 'CR-20260819-006', subject: '上海云栈信息科技有限公司', targets: '04438145、04438146', amount: 280000, status: 'PENDING_REVIEW', created: '2026-08-19 08:42', applicant: '运营管理员', reason: '发票内容需改为技术服务费', draft: '待红冲' },
        { id: 'CR-20260818-005', subject: '成都拾光个人用户', targets: '04438191', amount: 12000, status: 'RED_PROCESSING', created: '2026-08-18 19:10', applicant: '用户自助', reason: '收件邮箱更正', draft: '红冲处理中' },
        { id: 'CR-20260818-004', subject: '南京极昼网络有限公司', targets: '04437106', amount: 80000, status: 'COMPLETED', created: '2026-08-18 12:25', applicant: '财务管理员', reason: '主体名称更正', draft: 'IA-20260818-0022-R1' },
        { id: 'CR-20260817-003', subject: '厦门海岸实验室', targets: '04436517', amount: 15000, status: 'REJECTED', created: '2026-08-17 17:45', applicant: '用户自助', reason: '受票人信息更正', draft: '—' }
      ];
      var configs = {
        entities: [
          { id: 'ENT-001', name: '云登网络科技（上海）有限公司', type: '企业', taxId: '9131**********48', scope: '代理服务、API/RPA 服务', status: '已发布', version: 'v12', updated: '2026-08-18 17:20', operator: '林财务' },
          { id: 'ENT-002', name: '云登信息技术（深圳）有限公司', type: '企业', taxId: '9144**********19', scope: '平台服务、增值服务', status: '草稿', version: 'v4', updated: '2026-08-19 09:12', operator: '周敏' },
          { id: 'ENT-003', name: '云登个人业务主体', type: '个人', taxId: '—', scope: '个人数电普票', status: '已发布', version: 'v3', updated: '2026-08-12 14:06', operator: '林财务' }
        ],
        contents: [
          { id: 'CONT-001', label: '信息技术服务*技术服务费', taxRate: '6%', types: '普票、专票', sku: '已映射 38', status: '已发布', updated: '2026-08-18 17:20' },
          { id: 'CONT-002', label: '信息技术服务*平台服务费', taxRate: '6%', types: '普票、专票', sku: '已映射 24', status: '已发布', updated: '2026-08-18 17:20' },
          { id: 'CONT-003', label: '信息技术服务*服务费', taxRate: '免税', types: '普票', sku: '已映射 12', status: '已发布', updated: '2026-08-12 14:06' },
          { id: 'CONT-004', label: '信息技术服务*软件服务费', taxRate: '6%', types: '普票、专票', sku: '待补 3', status: '草稿', updated: '2026-08-19 09:12' }
        ],
        sku: [
          { id: 'SKU-0718', name: '代理 IP 标准包', content: '信息技术服务*技术服务费', taxRate: '6%', status: '已发布', updated: '2026-08-18 17:20' },
          { id: 'SKU-0719', name: 'RPA 环境月卡', content: '信息技术服务*平台服务费', taxRate: '6%', status: '已发布', updated: '2026-08-18 17:20' },
          { id: 'SKU-0720', name: 'API 调用包', content: '—', taxRate: '—', status: '待映射', updated: '2026-08-19 09:12' }
        ],
        providers: [
          { id: 'PRO-001', name: '百望云', env: '生产', tenant: 'yundeng-prod', timeout: '30 秒', status: '主用', updated: '2026-08-18 17:20' },
          { id: 'PRO-002', name: '航信云', env: '生产', tenant: 'yundeng-backup', timeout: '30 秒', status: '备用', updated: '2026-08-12 14:06' }
        ],
        notifications: [
          { id: 'SLA-001', name: '审核超时提醒', target: '财务审核组', threshold: '24 小时', channel: '站内通知、邮件', status: '已启用', updated: '2026-08-18 17:20' },
          { id: 'SLA-002', name: '交付失败告警', target: '开票管理员', threshold: '失败即告警', channel: '站内通知', status: '已启用', updated: '2026-08-18 17:20' },
          { id: 'SLA-003', name: '第三方 UNKNOWN 告警', target: '开票管理员', threshold: '15 分钟', channel: '站内通知、短信', status: '草稿', updated: '2026-08-19 09:12' }
        ]
      };

      function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]; }); }
      function money(cents) { return '¥' + (Number(cents || 0) / 100).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
      function label(code) { return statusMeta[code] ? statusMeta[code][0] : (code || '—'); }
      function badge(code) { var meta = statusMeta[code] || [code || '—', 'neutral']; return '<span class="invoice-badge invoice-badge-' + meta[1] + '">' + esc(meta[0]) + '</span>'; }
      function statusParameter(code) { var meta = statusMeta[code] || [code || '—', 'neutral']; return '<span class="invoice-status-parameter is-' + meta[1] + '">' + esc(meta[0]) + '</span>'; }
      function statusDot(code) { var meta = statusMeta[code] || ['', 'neutral']; return '<span class="invoice-badge invoice-badge-' + meta[1] + '"><span aria-hidden="true">●</span>' + esc(meta[0]) + '</span>'; }
      function statusHelp(kind) {
        var title = kind === 'issuance' ? '开具状态说明' : '交付状态说明';
        var helpId = 'invoice-' + kind + '-status-help';
        var scopeNote = kind === 'delivery' ? '<span><b>口径：</b>系统固定按站内、邮件两个交付单元聚合，用户无需选择交付类型</span>' : '';
        var items = kind === 'issuance' ? [
          ['未提交', '尚未向第三方服务商发起开具请求'],
          ['提交中', '请求已提交，等待服务商受理'],
          ['开具中', '服务商正在处理开具'],
          ['部分成功', '拆票任务部分成功，失败子任务待处置'],
          ['开具成功', '服务商已返回有效票据'],
          ['开具失败', '服务商明确返回失败，可确认未受理后重试'],
          ['结果未知', '请求超时，需按原受理号查询，不能直接重试']
        ] : [
          ['未发送', '票据文件尚未发送'],
          ['发送中', '正在按渠道投递'],
          ['部分送达', '部分收件人已收到票据'],
          ['已送达', '全部收件人已收到票据'],
          ['交付失败', '当前必达交付单元均失败，需按失败渠道处置']
        ];
        return '<span class="invoice-status-help" data-status-help><button type="button" aria-expanded="false" aria-controls="' + helpId + '" aria-describedby="' + helpId + '" aria-label="' + title + '" title="查看' + title + '">?</button><span id="' + helpId + '" class="invoice-status-help-popover" role="tooltip"><strong>' + title + '</strong>' + scopeNote + items.map(function (item) { return '<span><b>' + item[0] + '：</b>' + item[1] + '</span>'; }).join('') + '</span></span>';
      }
      function btn(action, text, icon, cls, attrs) { return '<button type="button" class="invoice-btn ' + (cls || 'invoice-btn-default') + '" data-action="' + action + '"' + (attrs || '') + '><i data-lucide="' + icon + '" class="w-4 h-4"></i><span>' + text + '</span></button>'; }
      function link(action, text, attrs) { return '<button type="button" class="invoice-btn-link" data-action="' + action + '"' + (attrs || '') + '>' + text + '</button>'; }
      function empty(title, desc, icon) { return '<div class="invoice-empty"><span class="invoice-empty-icon"><i data-lucide="' + (icon || 'search-x') + '" class="w-6 h-6"></i></span><strong>' + esc(title) + '</strong><p>' + esc(desc) + '</p></div>'; }
      function sortHeader(label, action, key, state) {
        var active = state.key === key;
        var direction = active ? state.direction : 'none';
        var ariaSort = direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none';
        var nextDirection = active && direction === 'desc' ? '升序' : '降序';
        var current = active ? '当前' + (direction === 'asc' ? '升序' : '降序') + '，' : '';
        return '<th aria-sort="' + ariaSort + '"><button type="button" class="invoice-sort-button" data-action="' + action + '" data-sort-key="' + key + '" data-sort-direction="' + direction + '" aria-label="' + label + '，' + current + '点击切换为' + nextDirection + '"><span>' + label + '</span><span class="invoice-sort-icon" aria-hidden="true"><span class="invoice-sort-caret is-up"></span><span class="invoice-sort-caret is-down"></span></span></button></th>';
      }
      function toggleSort(state, key) {
        if (state.key === key) state.direction = state.direction === 'desc' ? 'asc' : 'desc';
        else { state.key = key; state.direction = 'desc'; }
      }
      function sortRows(rows, state) {
        return rows.slice().sort(function (left, right) {
          var leftValue = left[state.key];
          var rightValue = right[state.key];
          var leftMissing = leftValue === null || leftValue === undefined || leftValue === '' || leftValue === '—' || leftValue === '待回执' || leftValue === '结果未知';
          var rightMissing = rightValue === null || rightValue === undefined || rightValue === '' || rightValue === '—' || rightValue === '待回执' || rightValue === '结果未知';
          if (leftMissing || rightMissing) {
            if (leftMissing && rightMissing) return 0;
            return leftMissing ? 1 : -1;
          }
          var compared = state.key === 'amount' ? Number(leftValue) - Number(rightValue) : String(leftValue).localeCompare(String(rightValue));
          return state.direction === 'asc' ? compared : -compared;
        });
      }
      function renderPrimaryTabs() {
        var tabs = [
          ['applications', '申请管理', 14, ''],
          ['documents', '票据管理', 9, ''],
          ['red', '红冲任务', 4, ' is-danger'],
          ['config', '开票配置', '', '']
        ];
        return '<nav class="invoice-primary-tabs" data-anno="2" role="tablist" aria-label="发票管理工作台">' + tabs.map(function (tab) {
          var active = currentTab === tab[0];
          return '<button type="button" class="invoice-primary-tab' + (active ? ' is-active' : '') + '" data-tab="' + tab[0] + '" role="tab" aria-selected="' + active + '">' + tab[1] + (tab[2] === '' ? '' : '<span class="invoice-tab-count' + tab[3] + '">' + tab[2] + '</span>') + '</button>';
        }).join('') + '</nav>';
      }
      function paginate(total, page, size, action) {
        var pages = Math.max(1, Math.ceil(total / size));
        var scope = action ? action.replace('-page', '') : '';
        var isStatic = !action;
        var pageItems = [];
        for (var i = 1; i <= pages; i += 1) {
          var visible = pages <= 7 || i === 1 || i === pages || Math.abs(i - page) <= 1;
          if (visible) pageItems.push(i);
        }
        var nav = '<div class="invoice-page-nav"><button type="button" class="invoice-page-btn"' + (isStatic ? '' : ' data-action="' + action + '" data-page="' + Math.max(1, page - 1) + '"') + ' aria-label="上一页"' + (page <= 1 || isStatic ? ' disabled' : '') + '><i data-lucide="chevron-left" class="w-4 h-4"></i></button>';
        pageItems.forEach(function (item, index) {
          if (index && item - pageItems[index - 1] > 1) nav += '<span class="invoice-page-ellipsis" aria-hidden="true">…</span>';
          nav += '<button type="button" class="invoice-page-btn' + (item === page ? ' is-active' : '') + '"' + (isStatic ? '' : ' data-action="' + action + '" data-page="' + item + '"') + ' aria-current="' + (item === page ? 'page' : 'false') + '">' + item + '</button>';
        });
        nav += '<button type="button" class="invoice-page-btn"' + (isStatic ? '' : ' data-action="' + action + '" data-page="' + Math.min(pages, page + 1) + '"') + ' aria-label="下一页"' + (page >= pages || isStatic ? ' disabled' : '') + '><i data-lucide="chevron-right" class="w-4 h-4"></i></button></div>';
        var sizeSelect = '<label class="invoice-page-size-control"><span class="sr-only">每页条数</span><span class="invoice-page-select-wrap"><select class="invoice-page-size-select"' + (scope ? ' data-scope="' + scope + '"' : ' disabled') + ' aria-label="每页条数"><option value="10"' + (size === 10 ? ' selected' : '') + '>10 条/页</option><option value="20"' + (size === 20 ? ' selected' : '') + '>20 条/页</option><option value="50"' + (size === 50 ? ' selected' : '') + '>50 条/页</option></select></span></label>';
        var jump = '<div class="invoice-page-meta"><label class="invoice-page-jump">跳至 <input class="invoice-page-jump-input" type="number" min="1" max="' + pages + '" value="1"' + (isStatic ? ' disabled' : ' data-page-action="' + action + '"') + ' aria-label="跳转页码"> 页</label><span class="invoice-page-stats">共 ' + total + ' 条记录　第 ' + page + '/' + pages + ' 页</span></div>';
        return '<div class="invoice-pagination">' + nav + sizeSelect + jump + '</div>';
      }
      function valueOf(id) { var el = root.querySelector('#' + id); return el ? el.value.trim() : ''; }
      function liveFilterValue(id, filters, key) { var el = root.querySelector('#' + id); return el ? el.value.trim() : filters[key]; }
      function deriveApplicationStatus(item) { if (item.document === 'FULLY_RED') return 'FULLY_RED'; if (['RED_PENDING', 'PARTIALLY_RED', 'RED_FAILED'].indexOf(item.document) >= 0) return 'RED_PENDING'; if (['PARTIAL', 'FAILED', 'UNKNOWN'].indexOf(item.issuance) >= 0) return 'FAILED'; if (item.issuance === 'SUCCEEDED') return 'SUCCEEDED'; if (['SUBMITTING', 'ISSUING'].indexOf(item.issuance) >= 0) return 'ISSUING'; if (item.status === 'REJECTED') return 'REJECTED'; if (item.status === 'REVIEWING') return 'REVIEWING'; if (item.status === 'PENDING_REVIEW') return 'PENDING_REVIEW'; return item.status; }
      function applicationMatchesStatus(item, status) { return status === 'ALL' || deriveApplicationStatus(item) === status; }
      function filterApplicationsBase() { var keyword = applicationFilters.keyword.toLowerCase(); var subject = applicationFilters.subject; var type = applicationFilters.type; var startDate = applicationFilters.startDate || ''; var endDate = applicationFilters.endDate || ''; return applications.filter(function (item) { var text = (item.id + ' ' + item.order + ' ' + item.subject).toLowerCase(); var createdDate = item.created.slice(0, 10); return (!keyword || text.indexOf(keyword) >= 0) && (!subject || item.subject.indexOf(subject) >= 0) && (!type || item.subjectType === type) && (!startDate || createdDate >= startDate) && (!endDate || createdDate <= endDate); }); }
      function filterApplications() { return sortRows(filterApplicationsBase().filter(function (item) { return applicationMatchesStatus(item, applicationStatus); }), applicationSort); }
      function renderStatusTabs() { var baseRows = filterApplicationsBase(); return '<div class="invoice-status-tabs" data-anno="10" role="tablist" aria-label="申请状态">' + applicationStatuses.map(function (item) { var count = baseRows.filter(function (row) { return applicationMatchesStatus(row, item[0]); }).length; return '<button type="button" class="invoice-status-tab' + (applicationStatus === item[0] ? ' is-active' : '') + '" data-action="application-status" data-status="' + item[0] + '" role="tab" aria-selected="' + (applicationStatus === item[0]) + '">' + item[1] + ' <span class="mono">' + count + '</span></button>'; }).join('') + '</div>'; }
      function calendarPad(value) { return String(value).padStart(2, '0'); }
      function formatCalendarDate(date) { return date.getFullYear() + '-' + calendarPad(date.getMonth() + 1) + '-' + calendarPad(date.getDate()); }
      function addCalendarMonths(date, count) { return new Date(date.getFullYear(), date.getMonth() + count, 1); }
      function renderCalendarMonth(month, side, scope) {
        scope = scope || 'application';
        var rangeStart = scope === 'document' ? documentCalendarStart : applicationCalendarStart;
        var rangeEnd = scope === 'document' ? documentCalendarEnd : applicationCalendarEnd;
        var year = month.getFullYear();
        var monthIndex = month.getMonth();
        var firstWeekday = new Date(year, monthIndex, 1).getDay();
        var gridStart = new Date(year, monthIndex, 1 - firstWeekday);
        var today = formatCalendarDate(applicationCalendarNow);
        var days = [];
        for (var index = 0; index < 42; index += 1) {
          var date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
          var value = formatCalendarDate(date);
          var classes = ['invoice-calendar-day'];
          if (date.getMonth() !== monthIndex) classes.push('is-muted');
          if (value === today) classes.push('is-today');
          if (rangeStart && rangeEnd && value > rangeStart && value < rangeEnd) classes.push('is-in-range');
          if (value === rangeStart) classes.push('is-start');
          if (value === rangeEnd) classes.push('is-end');
          days.push('<button type="button" class="' + classes.join(' ') + '" data-calendar-action="select-date" data-date="' + value + '" aria-label="' + year + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日" aria-pressed="' + (value === rangeStart || value === rangeEnd) + '"' + (value === today ? ' aria-current="date"' : '') + '>' + date.getDate() + '</button>');
        }
        var previous = side === 'left' ? '<span class="invoice-calendar-nav-group"><button type="button" class="invoice-calendar-nav" data-calendar-action="previous-year" aria-label="上一年"><i data-lucide="chevrons-left" aria-hidden="true"></i></button><button type="button" class="invoice-calendar-nav" data-calendar-action="previous-month" aria-label="上一个月"><i data-lucide="chevron-left" aria-hidden="true"></i></button></span>' : '<span class="invoice-calendar-nav-spacer" aria-hidden="true"></span>';
        var next = side === 'right' ? '<span class="invoice-calendar-nav-group is-end"><button type="button" class="invoice-calendar-nav" data-calendar-action="next-month" aria-label="下一个月"><i data-lucide="chevron-right" aria-hidden="true"></i></button><button type="button" class="invoice-calendar-nav" data-calendar-action="next-year" aria-label="下一年"><i data-lucide="chevrons-right" aria-hidden="true"></i></button></span>' : '<span class="invoice-calendar-nav-spacer" aria-hidden="true"></span>';
        return '<section class="invoice-calendar-month" aria-label="' + year + '年' + (monthIndex + 1) + '月"><div class="invoice-calendar-heading">' + previous + '<div class="invoice-calendar-title">' + year + ' 年 ' + (monthIndex + 1) + ' 月</div>' + next + '</div><div class="invoice-calendar-week" aria-hidden="true"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div><div class="invoice-calendar-grid">' + days.join('') + '</div></section>';
      }
      function renderApplicationCalendarPanel() {
        var hint = applicationCalendarStart && applicationCalendarEnd ? applicationCalendarStart + ' 至 ' + applicationCalendarEnd : applicationCalendarStart ? '已选开始日期' : applicationCalendarEnd ? '已选结束日期' : '未选择';
        return '<div class="invoice-date-picker-months">' + renderCalendarMonth(applicationCalendarMonth, 'left', 'application') + renderCalendarMonth(addCalendarMonths(applicationCalendarMonth, 1), 'right', 'application') + '</div><div class="invoice-date-picker-footer"><span class="invoice-date-picker-hint" aria-live="polite">' + hint + '</span><div class="invoice-date-picker-actions"><button type="button" class="invoice-date-picker-action" data-calendar-action="clear">清空</button><button type="button" class="invoice-date-picker-action" data-calendar-action="cancel">取消</button><button type="button" class="invoice-date-picker-action is-primary" data-calendar-action="confirm">确定</button></div></div>';
      }
      function updateApplicationCalendar() {
        var range = root.querySelector('.invoice-date-range[data-calendar-scope="application"]');
        if (!range) return;
        range.classList.toggle('is-open', applicationCalendarOpen);
        range.setAttribute('aria-expanded', String(applicationCalendarOpen));
        range.querySelectorAll('.invoice-date-input').forEach(function (input) { input.setAttribute('aria-expanded', String(applicationCalendarOpen)); });
        var startInput = range.querySelector('#applicationStartDate');
        var endInput = range.querySelector('#applicationEndDate');
        if (startInput) startInput.value = applicationCalendarStart;
        if (endInput) endInput.value = applicationCalendarEnd;
        var panel = range.querySelector('#applicationDatePicker');
        if (panel) {
          panel.setAttribute('aria-hidden', String(!applicationCalendarOpen));
          if (applicationCalendarOpen) {
            panel.innerHTML = renderApplicationCalendarPanel();
            var panelWidth = Math.min(620, Math.max(280, window.innerWidth - 32));
            var rangeRect = range.getBoundingClientRect();
            panel.style.width = panelWidth + 'px';
            if (rangeRect.left + panelWidth > window.innerWidth - 16 && rangeRect.right - panelWidth >= 16) {
              panel.style.left = 'auto';
              panel.style.right = '0';
            } else if (rangeRect.left + panelWidth > window.innerWidth - 16) {
              panel.style.left = (16 - rangeRect.left) + 'px';
              panel.style.right = 'auto';
            } else {
              panel.style.left = '0';
              panel.style.right = 'auto';
            }
          } else {
            panel.style.width = '';
            panel.style.left = '';
            panel.style.right = '';
          }
        }
        window.lucide && window.lucide.createIcons();
      }
      function openApplicationCalendar() {
        applicationCalendarSnapshotStart = valueOf('applicationStartDate') || applicationCalendarCommittedStart || applicationFilters.startDate || '';
        applicationCalendarSnapshotEnd = valueOf('applicationEndDate') || applicationCalendarCommittedEnd || applicationFilters.endDate || '';
        applicationCalendarStart = applicationCalendarSnapshotStart;
        applicationCalendarEnd = applicationCalendarSnapshotEnd;
        if (/^\d{4}-\d{2}-\d{2}$/.test(applicationCalendarStart)) {
          var parts = applicationCalendarStart.split('-').map(Number);
          applicationCalendarMonth = new Date(parts[0], parts[1] - 1, 1);
        }
        applicationCalendarOpen = true;
        updateApplicationCalendar();
      }
      function closeApplicationCalendar() { applicationCalendarOpen = false; updateApplicationCalendar(); }
      function cancelApplicationCalendar() {
        applicationCalendarStart = applicationCalendarSnapshotStart;
        applicationCalendarEnd = applicationCalendarSnapshotEnd;
        applicationCalendarCommittedStart = applicationCalendarSnapshotStart;
        applicationCalendarCommittedEnd = applicationCalendarSnapshotEnd;
        closeApplicationCalendar();
      }
      function selectApplicationCalendarDate(value) {
        if (!applicationCalendarStart || applicationCalendarEnd) {
          applicationCalendarStart = value;
          applicationCalendarEnd = '';
        } else if (value < applicationCalendarStart) {
          applicationCalendarEnd = applicationCalendarStart;
          applicationCalendarStart = value;
        } else {
          applicationCalendarEnd = value;
        }
        updateApplicationCalendar();
      }
      function renderApplicationDateRange() {
        var startDate = applicationCalendarOpen ? applicationCalendarStart : applicationCalendarCommittedStart;
        var endDate = applicationCalendarOpen ? applicationCalendarEnd : applicationCalendarCommittedEnd;
        return '<div class="invoice-date-range' + (applicationCalendarOpen ? ' is-open' : '') + '" data-calendar-trigger data-calendar-scope="application" role="group" aria-label="申请时间范围" aria-haspopup="dialog" aria-expanded="' + applicationCalendarOpen + '"><input id="applicationStartDate" class="invoice-date-input" type="text" placeholder="开始时间" value="' + esc(startDate) + '" aria-label="开始时间" aria-haspopup="dialog" aria-controls="applicationDatePicker" aria-expanded="' + applicationCalendarOpen + '" readonly><span class="invoice-date-sep" aria-hidden="true">~</span><input id="applicationEndDate" class="invoice-date-input" type="text" placeholder="结束时间" value="' + esc(endDate) + '" aria-label="结束时间" aria-haspopup="dialog" aria-controls="applicationDatePicker" aria-expanded="' + applicationCalendarOpen + '" readonly><i data-lucide="calendar-days" aria-hidden="true"></i><div id="applicationDatePicker" class="invoice-date-picker" role="dialog" aria-label="选择申请时间范围" aria-hidden="' + (!applicationCalendarOpen) + '">' + (applicationCalendarOpen ? renderApplicationCalendarPanel() : '') + '</div></div>';
      }

      function renderDocumentCalendarPanel() {
        var hint = documentCalendarStart && documentCalendarEnd ? documentCalendarStart + ' 至 ' + documentCalendarEnd : documentCalendarStart ? '已选开始日期' : documentCalendarEnd ? '已选结束日期' : '未选择';
        return '<div class="invoice-date-picker-months">' + renderCalendarMonth(documentCalendarMonth, 'left', 'document') + renderCalendarMonth(addCalendarMonths(documentCalendarMonth, 1), 'right', 'document') + '</div><div class="invoice-date-picker-footer"><span class="invoice-date-picker-hint" aria-live="polite">' + hint + '</span><div class="invoice-date-picker-actions"><button type="button" class="invoice-date-picker-action" data-calendar-action="clear">清空</button><button type="button" class="invoice-date-picker-action" data-calendar-action="cancel">取消</button><button type="button" class="invoice-date-picker-action is-primary" data-calendar-action="confirm">确定</button></div></div>';
      }
      function updateDocumentCalendar() {
        var range = root.querySelector('.invoice-date-range[data-calendar-scope="document"]');
        if (!range) return;
        range.classList.toggle('is-open', documentCalendarOpen);
        range.setAttribute('aria-expanded', String(documentCalendarOpen));
        range.querySelectorAll('.invoice-date-input').forEach(function (input) { input.setAttribute('aria-expanded', String(documentCalendarOpen)); });
        var startInput = range.querySelector('#documentStartDate');
        var endInput = range.querySelector('#documentEndDate');
        if (startInput) startInput.value = documentCalendarStart;
        if (endInput) endInput.value = documentCalendarEnd;
        var panel = range.querySelector('#documentDatePicker');
        if (panel) {
          panel.setAttribute('aria-hidden', String(!documentCalendarOpen));
          if (documentCalendarOpen) {
            panel.innerHTML = renderDocumentCalendarPanel();
            var panelWidth = Math.min(620, Math.max(280, window.innerWidth - 32));
            var rangeRect = range.getBoundingClientRect();
            panel.style.width = panelWidth + 'px';
            if (rangeRect.left + panelWidth > window.innerWidth - 16 && rangeRect.right - panelWidth >= 16) {
              panel.style.left = 'auto';
              panel.style.right = '0';
            } else if (rangeRect.left + panelWidth > window.innerWidth - 16) {
              panel.style.left = (16 - rangeRect.left) + 'px';
              panel.style.right = 'auto';
            } else {
              panel.style.left = '0';
              panel.style.right = 'auto';
            }
          } else {
            panel.style.width = '';
            panel.style.left = '';
            panel.style.right = '';
          }
        }
        window.lucide && window.lucide.createIcons();
      }
      function openDocumentCalendar() {
        documentCalendarSnapshotStart = valueOf('documentStartDate') || documentCalendarCommittedStart || documentFilters.startDate || '';
        documentCalendarSnapshotEnd = valueOf('documentEndDate') || documentCalendarCommittedEnd || documentFilters.endDate || '';
        documentCalendarStart = documentCalendarSnapshotStart;
        documentCalendarEnd = documentCalendarSnapshotEnd;
        if (/^\d{4}-\d{2}-\d{2}$/.test(documentCalendarStart)) {
          var parts = documentCalendarStart.split('-').map(Number);
          documentCalendarMonth = new Date(parts[0], parts[1] - 1, 1);
        }
        documentCalendarOpen = true;
        updateDocumentCalendar();
      }
      function closeDocumentCalendar() { documentCalendarOpen = false; updateDocumentCalendar(); }
      function cancelDocumentCalendar() {
        documentCalendarStart = documentCalendarSnapshotStart;
        documentCalendarEnd = documentCalendarSnapshotEnd;
        documentCalendarCommittedStart = documentCalendarSnapshotStart;
        documentCalendarCommittedEnd = documentCalendarSnapshotEnd;
        closeDocumentCalendar();
      }
      function selectDocumentCalendarDate(value) {
        if (!documentCalendarStart || documentCalendarEnd) {
          documentCalendarStart = value;
          documentCalendarEnd = '';
        } else if (value < documentCalendarStart) {
          documentCalendarEnd = documentCalendarStart;
          documentCalendarStart = value;
        } else {
          documentCalendarEnd = value;
        }
        updateDocumentCalendar();
      }
      function renderDocumentDateRange() {
        var startDate = documentCalendarOpen ? documentCalendarStart : documentCalendarCommittedStart;
        var endDate = documentCalendarOpen ? documentCalendarEnd : documentCalendarCommittedEnd;
        return '<div class="invoice-date-range' + (documentCalendarOpen ? ' is-open' : '') + '" data-calendar-trigger data-calendar-scope="document" role="group" aria-label="开具时间范围" aria-haspopup="dialog" aria-expanded="' + documentCalendarOpen + '"><input id="documentStartDate" class="invoice-date-input" type="text" placeholder="开始时间" value="' + esc(startDate) + '" aria-label="开具开始时间" aria-haspopup="dialog" aria-controls="documentDatePicker" aria-expanded="' + documentCalendarOpen + '" readonly><span class="invoice-date-sep" aria-hidden="true">~</span><input id="documentEndDate" class="invoice-date-input" type="text" placeholder="结束时间" value="' + esc(endDate) + '" aria-label="开具结束时间" aria-haspopup="dialog" aria-controls="documentDatePicker" aria-expanded="' + documentCalendarOpen + '" readonly><i data-lucide="calendar-days" aria-hidden="true"></i><div id="documentDatePicker" class="invoice-date-picker" role="dialog" aria-label="选择开具时间范围" aria-hidden="' + (!documentCalendarOpen) + '">' + (documentCalendarOpen ? renderDocumentCalendarPanel() : '') + '</div></div>';
      }

      function renderApplicationWorkspace() {
        var rows = filterApplications();
        var pageSize = applicationPageSize;
        var pages = Math.max(1, Math.ceil(rows.length / pageSize));
        applicationPage = Math.min(applicationPage, pages);
        var pageRows = rows.slice((applicationPage - 1) * pageSize, applicationPage * pageSize);
        var selectedOnPage = pageRows.filter(function (item) { return selectedApplications.indexOf(item.id) >= 0; }).length;
        var rowHtml = pageRows.map(function (item) {
          var attention = item.issuance === 'UNKNOWN' || item.issuance === 'FAILED' || item.delivery === 'DELIVERY_FAILED';
          return '<tr class="' + (attention ? 'row-attention' : '') + '"><td class="invoice-application-select-cell"><input class="invoice-check application-check" type="checkbox" data-id="' + item.id + '" aria-label="选择 ' + esc(item.id) + '"' + (selectedApplications.indexOf(item.id) >= 0 ? ' checked' : '') + '></td><td class="invoice-application-id-cell"><button type="button" class="invoice-btn-link primary-cell" data-action="open-application" data-id="' + item.id + '">' + esc(item.id) + '</button></td><td class="mono">' + esc(item.created) + '</td><td><span class="primary-cell">' + esc(item.subject) + '</span><div class="muted">' + esc(item.subjectType) + ' · ' + esc(item.source) + '</div></td><td class="mono">' + esc(item.order) + '</td><td>' + esc(item.content) + '</td><td class="amount">' + money(item.amount) + '<div class="muted">税率 ' + esc(item.taxRate) + '</div></td><td>' + badge(deriveApplicationStatus(item)) + '<div class="muted">' + esc(item.assignee) + '</div></td><td>' + badge(item.issuance) + '</td><td>' + badge(item.delivery) + '</td><td><div class="actions">' + (item.status === 'PENDING_REVIEW' ? link('claim-application', '领取', ' data-id="' + item.id + '"') : '') + ' ' + ((item.status === 'PENDING_REVIEW' || item.status === 'REVIEWING') ? link('open-application', '审核', ' data-id="' + item.id + '"') : '') + ' ' + ((item.issuance === 'UNKNOWN' || item.issuance === 'FAILED') ? link('query-task', '查询', ' data-id="' + item.id + '"') : '') + ' ' + link('open-application', '详情', ' data-id="' + item.id + '"') + '</div></td></tr>';
        }).join('');
        var filterBlock = '<section class="invoice-block"><div class="invoice-filter-flow"><div class="invoice-filter-item"><label for="applicationKeyword">关键词</label><input id="applicationKeyword" class="invoice-control" data-anno="11" maxlength="60" placeholder="申请编号 / 订单号 / 购买主体"></div><div class="invoice-filter-item"><label for="applicationSubject">开票主体</label><input id="applicationSubject" class="invoice-control" maxlength="40" placeholder="输入主体名称"></div><div class="invoice-filter-item"><label for="applicationType">主体类型</label><select id="applicationType" class="invoice-control"><option value="">全部类型</option><option value="企业">企业</option><option value="组织">组织</option><option value="个人">个人</option></select></div><div class="invoice-filter-item"><label for="applicationStartDate">申请时间</label>' + renderApplicationDateRange() + '</div><div class="invoice-filter-actions">' + btn('query-applications', '查询', 'search', 'invoice-btn-primary', ' data-anno="12"') + btn('reset-applications', '重置', 'rotate-ccw', 'invoice-btn-default') + '</div></div></section>';
        var selection = selectedApplications.length ? '<div class="invoice-selection"><span>已选 <strong class="mono">' + selectedApplications.length + '</strong> 条申请</span><div class="invoice-selection-actions">' + btn('bulk-export-selected', '导出已选（' + selectedApplications.length + '）', 'download', 'invoice-btn-default') + btn('clear-selection', '清除选择', 'x', 'invoice-btn-default') + '</div></div>' : '';
        var listBlock = '<section class="invoice-block"><div class="invoice-list-header"><h2 class="invoice-list-title">申请列表</h2><span class="invoice-list-total">共 <span class="mono">' + rows.length + '</span> 条</span></div><div class="invoice-list-toolbar">' + renderStatusTabs() + '<div class="invoice-list-actions" data-anno="4">' + btn('refresh', '刷新', 'refresh-cw', 'invoice-btn-default') + btn('bulk-export', '导出', 'download', 'invoice-btn-default') + '</div></div>' + selection + '<div class="invoice-table-wrap" data-anno="14"><table class="invoice-table data-table" aria-label="开票申请列表"><thead><tr><th class="invoice-application-select-cell"><input id="applicationSelectAll" class="invoice-check" type="checkbox" aria-label="选择当前页申请"' + (pageRows.length && selectedOnPage === pageRows.length ? ' checked' : '') + '></th><th class="invoice-application-id-cell">申请编号</th>' + sortHeader('申请时间', 'sort-applications', 'created', applicationSort) + '<th>购买主体</th><th>订单号</th><th>发票内容</th>' + sortHeader('申请金额', 'sort-applications', 'amount', applicationSort) + '<th>派生状态</th><th><span class="invoice-th-with-help">开具状态' + statusHelp('issuance') + '</span></th><th><span class="invoice-th-with-help">交付状态' + statusHelp('delivery') + '</span></th><th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan="11">' + empty('未找到开票申请', '请调整筛选条件后重试。', 'file-search') + '</td></tr>') + '</tbody></table></div>' + paginate(rows.length, applicationPage, pageSize, 'application-page') + '</section>';
        return filterBlock + listBlock;
      }

      function filterDocuments() { var keyword = documentFilters.keyword.toLowerCase(); var status = documentFilters.status; var delivery = documentFilters.delivery; var startDate = documentFilters.startDate || ''; var endDate = documentFilters.endDate || ''; return sortRows(documents.filter(function (item) { var issuedDate = /^\d{4}-\d{2}-\d{2}/.test(item.issued) ? item.issued.slice(0, 10) : ''; return (!keyword || (item.invoiceNo + ' ' + item.applicationId + ' ' + item.subject).toLowerCase().indexOf(keyword) >= 0) && (!status || item.document === status) && (!delivery || item.delivery === delivery) && (!startDate || (issuedDate && issuedDate >= startDate)) && (!endDate || (issuedDate && issuedDate <= endDate)); }), documentSort); }
      function renderDocuments() {
        var rows = filterDocuments();
        var size = documentPageSize;
        var pages = Math.max(1, Math.ceil(rows.length / size));
        documentPage = Math.min(documentPage, pages);
        var pageRows = rows.slice((documentPage - 1) * size, documentPage * size);
        var rowHtml = pageRows.map(function (item) {
          return '<tr><td><button type="button" class="invoice-btn-link primary-cell" data-action="preview-document" data-id="' + item.id + '">' + esc(item.invoiceNo) + '</button><div class="muted">' + esc(item.id) + '</div></td><td><span class="primary-cell">' + esc(item.subject) + '</span><div class="muted">申请 ' + esc(item.applicationId) + '</div></td><td class="amount">' + money(item.amount) + '<div class="muted">' + esc(item.type) + '</div></td><td>' + statusParameter(item.document) + '</td><td>' + badge(item.file) + '</td><td>' + badge(item.delivery) + '</td><td><span class="invoice-status-parameter">' + esc(item.channel) + '</span></td><td>' + esc(item.recipient) + '</td><td class="mono">' + esc(item.issued) + '</td><td><div class="actions">' + (item.action === 'download' ? link('download-document', '下载', ' data-id="' + item.id + '"') : '') + (item.action === 'resend' ? link('resend-document', '重发', ' data-id="' + item.id + '"') : '') + (item.action === 'query' ? link('query-document', '补拉文件', ' data-id="' + item.id + '"') : '') + link('preview-document', '预览', ' data-id="' + item.id + '"') + '</div></td></tr>';
        }).join('');
        var filterBlock = '<section class="invoice-block"><div class="invoice-filter-flow"><div class="invoice-filter-item"><label for="documentKeyword">关键词</label><input id="documentKeyword" class="invoice-control" data-anno="30" placeholder="票据号码 / 申请编号 / 主体"></div><div class="invoice-filter-item"><label for="documentStatus">票据状态</label><select id="documentStatus" class="invoice-control"><option value="">全部票据状态</option><option value="ACTIVE">有效</option><option value="RED_PENDING">红冲处理中</option><option value="PARTIALLY_RED">部分红冲</option><option value="FULLY_RED">已全额红冲</option></select></div><div class="invoice-filter-item"><label for="documentDelivery">交付状态</label><select id="documentDelivery" class="invoice-control"><option value="">全部交付状态</option><option value="NOT_SENT">未发送</option><option value="SENDING">发送中</option><option value="DELIVERED">已送达</option><option value="DELIVERY_FAILED">交付失败</option><option value="PARTIALLY_DELIVERED">部分送达</option></select></div><div class="invoice-filter-item"><label for="documentStartDate">开具时间</label>' + renderDocumentDateRange() + '</div><div class="invoice-filter-actions">' + btn('query-documents', '查询', 'search', 'invoice-btn-primary') + btn('reset-documents', '重置', 'rotate-ccw', 'invoice-btn-default') + '</div></div></section>';
        var kpis = '<div class="invoice-kpi-grid is-borderless"><div class="invoice-kpi"><div class="invoice-kpi-label">有效票据</div><div class="invoice-kpi-value">' + documents.filter(function (item) { return item.document === 'ACTIVE'; }).length + '</div><div class="invoice-kpi-note">可访问票据不重复计金额</div></div><div class="invoice-kpi"><div class="invoice-kpi-label">待补拉文件</div><div class="invoice-kpi-value">' + documents.filter(function (item) { return item.file === 'NOT_SENT'; }).length + '</div><div class="invoice-kpi-note">文件缺失不等于发送失败</div></div><div class="invoice-kpi"><div class="invoice-kpi-label">邮件待重发</div><div class="invoice-kpi-value">' + documents.filter(function (item) { return item.action === 'resend'; }).length + '</div><div class="invoice-kpi-note">站内文件不受邮件失败影响</div></div><div class="invoice-kpi"><div class="invoice-kpi-label">红冲处理中</div><div class="invoice-kpi-value">' + documents.filter(function (item) { return ['RED_PENDING', 'PARTIALLY_RED'].indexOf(item.document) >= 0; }).length + '</div><div class="invoice-kpi-note">按原蓝票占额锁定</div></div><div class="invoice-kpi"><div class="invoice-kpi-label">今日开具金额</div><div class="invoice-kpi-value">' + money(documents.slice(0, 5).reduce(function (sum, item) { return sum + item.amount; }, 0)) + '</div><div class="invoice-kpi-note">以服务端票据金额为准</div></div></div>';
        var listBlock = '<section class="invoice-block"><div class="invoice-list-header has-actions"><div class="invoice-list-heading"><h2 class="invoice-list-title">票据列表</h2><span class="invoice-list-total">共 <span class="mono">' + rows.length + '</span> 条</span></div>' + btn('bulk-export-documents', '导出', 'download', 'invoice-btn-default') + '</div><div class="invoice-document-summary">' + kpis + '</div><div class="invoice-table-wrap" data-anno="31"><table class="invoice-table data-table" aria-label="票据列表"><thead><tr><th>票据号码 / 票据 ID</th><th>开票主体</th><th>票面金额</th><th>票据状态</th><th>文件</th><th>交付状态</th><th>交付渠道</th><th>联系邮箱</th>' + sortHeader('开具时间', 'sort-documents', 'issued', documentSort) + '<th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan="10">' + empty('未找到票据', '请调整筛选条件后重试。', 'files') + '</td></tr>') + '</tbody></table></div>' + paginate(rows.length, documentPage, size, 'document-page') + '</section>';
        return filterBlock + listBlock;
      }

      function filterRedTasks() { var keyword = String(redFilters.keyword || '').toLowerCase(); var status = redFilters.status; var source = redFilters.source; return redTasks.filter(function (item) { return (!keyword || (item.id + ' ' + item.invoiceNo + ' ' + item.subject + ' ' + item.reason).toLowerCase().indexOf(keyword) >= 0) && (!status || item.status === status) && (!source || item.sourceName === source); }); }
      function renderRed() { if (redSubtab === 'corrections') return renderCorrections(); var rows = filterRedTasks(); var size = redPageSize; var pages = Math.max(1, Math.ceil(rows.length / size)); redPage = Math.min(redPage, pages); var pageRows = rows.slice((redPage - 1) * size, redPage * size); var rowHtml = pageRows.map(function (item) { var canQuery = item.status === 'UNKNOWN'; var canRetry = item.status === 'FAILED'; return '<tr class="' + (canQuery || canRetry ? 'row-attention' : '') + '"><td><button type="button" class="invoice-btn-link primary-cell" data-action="red-detail" data-id="' + item.id + '">' + esc(item.id) + '</button><div class="muted">' + esc(item.created) + '</div></td><td>' + badge(item.source) + '<div class="muted">' + esc(item.reason) + '</div></td><td><span class="primary-cell">' + esc(item.invoiceNo) + '</span><div class="muted">' + esc(item.subject) + '</div></td><td class="amount">' + money(item.amount) + '<div class="muted">票据 ' + esc(item.progress) + '</div></td><td>' + badge(item.status) + '<div class="muted">负责人 ' + esc(item.owner) + '</div></td><td><div class="actions">' + (canQuery ? link('query-red', '查询结果', ' data-id="' + item.id + '"') : '') + (canRetry ? link('retry-red', '确认关闭后重试', ' data-id="' + item.id + '"') : '') + link('red-detail', '详情', ' data-id="' + item.id + '"') + '</div></td></tr>'; }).join(''); return '<section class="invoice-block"><div class="invoice-section-actions"><div class="invoice-head-actions">' + btn('create-correction', '发起财务纠错', 'file-pen-line', 'invoice-btn-default', ' data-anno="52"') + '</div></div><div class="invoice-subtabs"><button type="button" class="invoice-config-tab is-active" data-action="red-subtab" data-value="tasks">红冲任务 <span class="mono">' + redTasks.length + '</span></button><button type="button" class="invoice-config-tab" data-action="red-subtab" data-value="corrections">更正申请 <span class="mono">' + corrections.length + '</span></button></div><div class="invoice-filter-flow"><div class="invoice-filter-item"><label for="redKeyword">关键词</label><input id="redKeyword" class="invoice-control" data-anno="50" placeholder="任务号 / 票据号 / 主体"></div><div class="invoice-filter-item"><label for="redStatus">任务状态</label><select id="redStatus" class="invoice-control"><option value="">全部任务状态</option><option value="PENDING">待处理</option><option value="PROCESSING">红冲中</option><option value="UNKNOWN">结果未知</option><option value="PARTIAL">部分成功</option><option value="SUCCEEDED">已完成</option><option value="FAILED">红冲失败</option></select></div><div class="invoice-filter-item"><label for="redSource">红冲来源</label><select id="redSource" class="invoice-control"><option value="">全部来源</option><option>退款红冲</option><option>用户更正</option><option>财务纠错</option></select></div><div class="invoice-filter-actions">' + btn('query-red', '查询', 'search', 'invoice-btn-primary') + btn('reset-red', '重置', 'rotate-ccw', 'invoice-btn-default') + '</div></div><div class="invoice-kpi-grid"><div class="invoice-kpi"><div class="invoice-kpi-label">待处置任务</div><div class="invoice-kpi-value">' + redTasks.filter(function (item) { return ['SUCCEEDED', 'CANCELLED'].indexOf(item.status) < 0; }).length + '</div><div class="invoice-kpi-note">包含未知与失败</div></div><div class="invoice-kpi"><div class="invoice-kpi-label">结果未知</div><div class="invoice-kpi-value">' + redTasks.filter(function (item) { return item.status === 'UNKNOWN'; }).length + '</div><div class="invoice-kpi-note">只能查询原任务</div></div><div class="invoice-kpi"><div class="invoice-kpi-label">金额冻结</div><div class="invoice-kpi-value">' + money(redTasks.filter(function (item) { return ['SUCCEEDED', 'CANCELLED'].indexOf(item.status) < 0; }).reduce(function (sum, item) { return sum + item.amount; }, 0)) + '</div><div class="invoice-kpi-note">失败确认前不释放</div></div><div class="invoice-kpi"><div class="invoice-kpi-label">退款优先级</div><div class="invoice-kpi-value">REFUND</div><div class="invoice-kpi-note">高于纠错与用户更正</div></div><div class="invoice-kpi"><div class="invoice-kpi-label">更正申请</div><div class="invoice-kpi-value">' + corrections.length + '</div><div class="invoice-kpi-note">整组红冲后重开草稿</div></div></div><div class="invoice-table-wrap" data-anno="51"><table class="invoice-table data-table" aria-label="红冲任务列表"><thead><tr><th>任务号 / 创建时间</th><th>来源 / 原因</th><th>原蓝票</th><th>红冲金额</th><th>状态 / 负责人</th><th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan="6">' + empty('未找到红冲任务', '请调整筛选条件后重试。', 'rotate-ccw') + '</td></tr>') + '</tbody></table></div>' + paginate(rows.length, redPage, size, 'red-page') + '</section>'; }
      function renderCorrections() { var rows = corrections; var rowHtml = rows.map(function (item) { return '<tr><td><button type="button" class="invoice-btn-link primary-cell" data-action="correction-detail" data-id="' + item.id + '">' + esc(item.id) + '</button><div class="muted">' + esc(item.created) + '</div></td><td><span class="primary-cell">' + esc(item.subject) + '</span><div class="muted">' + esc(item.applicant) + '</div></td><td>' + esc(item.targets) + '<div class="muted">' + esc(item.reason) + '</div></td><td class="amount">' + money(item.amount) + '</td><td>' + badge(item.status) + '</td><td>' + (item.draft === '—' ? '<span class="muted">—</span>' : '<span class="invoice-badge invoice-badge-info">' + esc(item.draft) + '</span>') + '</td><td><div class="actions">' + link('correction-detail', '详情', ' data-id="' + item.id + '"') + (item.status === 'PENDING_REVIEW' ? link('review-correction', '审核', ' data-id="' + item.id + '"') : '') + '</div></td></tr>'; }).join(''); return '<section class="invoice-block"><div class="invoice-section-actions is-leading"><div class="invoice-head-actions">' + btn('back-red-tasks', '返回红冲任务', 'arrow-left', 'invoice-btn-default') + '</div></div><div class="invoice-subtabs"><button type="button" class="invoice-config-tab" data-action="red-subtab" data-value="tasks">红冲任务 <span class="mono">' + redTasks.length + '</span></button><button type="button" class="invoice-config-tab is-active" data-action="red-subtab" data-value="corrections">更正申请 <span class="mono">' + corrections.length + '</span></button></div><div class="invoice-table-wrap" data-anno="52"><table class="invoice-table data-table" aria-label="更正申请列表"><thead><tr><th>更正申请 / 时间</th><th>受票主体 / 申请人</th><th>目标蓝票 / 原因</th><th>整组金额</th><th>更正状态</th><th>重开草稿</th><th>操作</th></tr></thead><tbody>' + rowHtml + '</tbody></table></div>'+ paginate(rows.length, 1, 20, '') +'</section>'; }

      function configRows() { return configs[configSubtab] || []; }
      function renderConfig() { var rows = configRows(); var labels = { entities: '开票主体', contents: '发票内容', sku: 'SKU 映射', providers: '第三方服务商', notifications: '通知与 SLA' }; var rowHtml = rows.map(function (item) { var fields = configSubtab === 'entities' ? '<td><span class="primary-cell">' + esc(item.name) + '</span><div class="muted">' + esc(item.type) + ' · 税号 ' + esc(item.taxId) + '</div></td><td>' + esc(item.scope) + '</td><td>' + esc(item.version) + '</td><td>' + statusBadgeText(item.status) + '</td><td>' + esc(item.updated) + '<div class="muted">' + esc(item.operator) + '</div></td>' : configSubtab === 'contents' ? '<td><span class="primary-cell">' + esc(item.label) + '</span><div class="muted">' + esc(item.id) + '</div></td><td>' + esc(item.taxRate) + '</td><td>' + esc(item.types) + '</td><td>' + esc(item.sku) + '</td><td>' + statusBadgeText(item.status) + '<div class="muted">' + esc(item.updated) + '</div></td>' : configSubtab === 'sku' ? '<td><span class="primary-cell">' + esc(item.name) + '</span><div class="muted">' + esc(item.id) + '</div></td><td>' + esc(item.content) + '</td><td>' + esc(item.taxRate) + '</td><td>' + statusBadgeText(item.status) + '</td><td>' + esc(item.updated) + '</td>' : configSubtab === 'providers' ? '<td><span class="primary-cell">' + esc(item.name) + '</span><div class="muted">' + esc(item.id) + '</div></td><td>' + esc(item.env) + '</td><td>' + esc(item.tenant) + '</td><td>' + esc(item.timeout) + '</td><td>' + statusBadgeText(item.status) + '<div class="muted">' + esc(item.updated) + '</div></td>' : '<td><span class="primary-cell">' + esc(item.name) + '</span><div class="muted">' + esc(item.id) + '</div></td><td>' + esc(item.target) + '</td><td>' + esc(item.threshold) + '</td><td>' + esc(item.channel) + '</td><td>' + statusBadgeText(item.status) + '</td>'; return '<tr><td><input class="invoice-check config-check" type="checkbox" data-id="' + esc(item.id) + '" aria-label="选择 ' + esc(item.id) + '"></td>' + fields + '<td><div class="actions">' + link('edit-config', '编辑', ' data-id="' + esc(item.id) + '"') + '</div></td></tr>'; }).join(''); var headers = configSubtab === 'entities' ? '<th>主体名称</th><th>适用范围</th><th>版本</th><th>状态</th><th>更新时间 / 操作人</th>' : configSubtab === 'contents' ? '<th>发票内容</th><th>税率</th><th>票种</th><th>SKU 映射</th><th>状态 / 更新时间</th>' : configSubtab === 'sku' ? '<th>SKU</th><th>发票内容</th><th>税率</th><th>状态</th><th>更新时间</th>' : configSubtab === 'providers' ? '<th>服务商</th><th>环境</th><th>租户</th><th>超时</th><th>状态 / 更新时间</th>' : '<th>规则名称</th><th>通知对象</th><th>阈值</th><th>渠道</th><th>状态</th>'; return '<section class="invoice-block"><div class="invoice-section-actions"><div class="invoice-head-actions">' + btn('new-config', '新增配置', 'plus', 'invoice-btn-default', ' data-anno="71"') + btn('publish-config', '发布变更', 'send', 'invoice-btn-primary') + '</div></div><div class="invoice-config-callout"><i data-lucide="shield-check" class="w-4 h-4"></i><div><strong>配置发布受控</strong>　个人仅可选数电普票；企业 / 组织可选普票或专票。SKU 无映射时，申请不可提交。<div class="invoice-config-state">当前生产版本 v12 · 最近发布 2026-08-18 17:20 · 配置管理员：林财务</div></div></div><div class="invoice-subtabs">' + Object.keys(labels).map(function (key) { return '<button type="button" class="invoice-config-tab' + (configSubtab === key ? ' is-active' : '') + '" data-action="config-subtab" data-value="' + key + '">' + labels[key] + '</button>'; }).join('') + '</div><div class="invoice-table-wrap"><table class="invoice-table data-table" aria-label="' + labels[configSubtab] + '配置列表"><thead><tr><th><span class="sr-only">选择</span></th>' + headers + '<th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan="7">' + empty('暂无配置', '请先新增配置。', 'sliders-horizontal') + '</td></tr>') + '</tbody></table></div>'+ paginate(rows.length, 1, 20, '') +'</section>'; }

      // Synced workspaces keep navigation/filters separate from the result list.
      function renderRedDataScope() {
        return '<div class="invoice-filter-item"><span id="redDataScopeLabel" class="invoice-filter-name">数据范围</span><div class="invoice-status-tabs invoice-data-scope-tabs" role="tablist" aria-labelledby="redDataScopeLabel"><button type="button" class="invoice-status-tab' + (redSubtab === 'tasks' ? ' is-active' : '') + '" data-action="red-subtab" data-value="tasks" role="tab" aria-selected="' + (redSubtab === 'tasks') + '">红冲任务</button><button type="button" class="invoice-status-tab' + (redSubtab === 'corrections' ? ' is-active' : '') + '" data-action="red-subtab" data-value="corrections" role="tab" aria-selected="' + (redSubtab === 'corrections') + '">更正申请</button></div></div>';
      }
      function renderRedSynced() {
        var dataScope = renderRedDataScope();
        if (redSubtab === 'corrections') {
          var correctionRows = corrections;
          var correctionHtml = correctionRows.map(function (item) { return '<tr><td><button type="button" class="invoice-btn-link primary-cell" data-action="correction-detail" data-id="' + item.id + '">' + esc(item.id) + '</button><div class="muted">' + esc(item.created) + '</div></td><td><span class="primary-cell">' + esc(item.subject) + '</span><div class="muted">' + esc(item.applicant) + '</div></td><td>' + esc(item.targets) + '<div class="muted">' + esc(item.reason) + '</div></td><td class="amount">' + money(item.amount) + '</td><td>' + badge(item.status) + '</td><td>' + (item.draft === '—' ? '<span class="muted">—</span>' : '<span class="invoice-badge invoice-badge-info">' + esc(item.draft) + '</span>') + '</td><td><div class="actions">' + link('correction-detail', '详情', ' data-id="' + item.id + '"') + (item.status === 'PENDING_REVIEW' ? link('review-correction', '审核', ' data-id="' + item.id + '"') : '') + '</div></td></tr>'; }).join('');
          return '<section class="invoice-block"><div class="invoice-filter-flow">' + dataScope + '</div></section><section class="invoice-block"><div class="invoice-list-header has-actions"><div class="invoice-list-heading"><h2 class="invoice-list-title">更正申请列表</h2><span class="invoice-list-total">共 <span class="mono">' + correctionRows.length + '</span> 条</span></div><div class="invoice-list-actions">' + btn('refresh', '刷新', 'refresh-cw', 'invoice-btn-default') + btn('export', '导出', 'download', 'invoice-btn-default') + '</div></div><div class="invoice-list-divider"></div><div class="invoice-table-wrap" data-anno="52"><table class="invoice-table data-table" aria-label="更正申请列表"><thead><tr><th>更正申请 / 时间</th><th>受票主体 / 申请人</th><th>目标蓝票 / 原因</th><th>整组金额</th><th>更正状态</th><th>重开草稿</th><th>操作</th></tr></thead><tbody>' + (correctionHtml || '<tr><td colspan="7">' + empty('暂无更正申请', '创建财务纠错后，申请会显示在这里。', 'file-pen-line') + '</td></tr>') + '</tbody></table></div>' + paginate(correctionRows.length, 1, 20, '') + '</section>';
        }
        var rows = filterRedTasks();
        var size = redPageSize;
        var pages = Math.max(1, Math.ceil(rows.length / size));
        redPage = Math.min(redPage, pages);
        var pageRows = rows.slice((redPage - 1) * size, redPage * size);
        var rowHtml = pageRows.map(function (item) { var canQuery = item.status === 'UNKNOWN'; var canRetry = item.status === 'FAILED'; return '<tr class="' + (canQuery || canRetry ? 'row-attention' : '') + '"><td><button type="button" class="invoice-btn-link primary-cell" data-action="red-detail" data-id="' + item.id + '">' + esc(item.id) + '</button><div class="muted">' + esc(item.created) + '</div></td><td>' + badge(item.source) + '<div class="muted">' + esc(item.reason) + '</div></td><td><span class="primary-cell">' + esc(item.invoiceNo) + '</span><div class="muted">' + esc(item.subject) + '</div></td><td class="amount">' + money(item.amount) + '<div class="muted">票据 ' + esc(item.progress) + '</div></td><td>' + badge(item.status) + '</td><td>' + esc(item.owner) + '</td><td><div class="actions">' + (canQuery ? link('query-red', '查询结果', ' data-id="' + item.id + '"') : '') + (canRetry ? link('retry-red', '确认关闭后重试', ' data-id="' + item.id + '"') : '') + link('red-detail', '详情', ' data-id="' + item.id + '"') + '</div></td></tr>'; }).join('');
        var kpis = '<div class="invoice-kpi-grid is-borderless"><div class="invoice-kpi"><div class="invoice-kpi-label">待处置任务</div><div class="invoice-kpi-value">' + rows.filter(function (item) { return ['SUCCEEDED', 'CANCELLED'].indexOf(item.status) < 0; }).length + '</div><div class="invoice-kpi-note">包含未知与失败</div></div><div class="invoice-kpi"><div class="invoice-kpi-label">结果未知</div><div class="invoice-kpi-value">' + rows.filter(function (item) { return item.status === 'UNKNOWN'; }).length + '</div><div class="invoice-kpi-note">只能查询原任务</div></div><div class="invoice-kpi"><div class="invoice-kpi-label">金额冻结</div><div class="invoice-kpi-value">' + money(rows.filter(function (item) { return ['SUCCEEDED', 'CANCELLED'].indexOf(item.status) < 0; }).reduce(function (sum, item) { return sum + item.amount; }, 0)) + '</div><div class="invoice-kpi-note">失败确认前不释放</div></div></div>';
        var filterBlock = '<section class="invoice-block"><div class="invoice-filter-flow">' + dataScope + '<div class="invoice-filter-item"><label for="redKeyword">关键词</label><input id="redKeyword" class="invoice-control" data-anno="50" placeholder="任务号 / 票据号 / 主体"></div><div class="invoice-filter-item"><label for="redStatus">任务状态</label><select id="redStatus" class="invoice-control"><option value="">全部任务状态</option><option value="PENDING">待处理</option><option value="PROCESSING">红冲中</option><option value="UNKNOWN">结果未知</option><option value="PARTIAL">部分成功</option><option value="SUCCEEDED">已完成</option><option value="FAILED">红冲失败</option></select></div><div class="invoice-filter-item"><label for="redSource">红冲来源</label><select id="redSource" class="invoice-control"><option value="">全部来源</option><option>退款红冲</option><option>用户更正</option><option>财务纠错</option></select></div><div class="invoice-filter-actions">' + btn('query-red', '查询', 'search', 'invoice-btn-primary') + btn('reset-red', '重置', 'rotate-ccw', 'invoice-btn-default') + '</div></div></section>';
        var listBlock = '<section class="invoice-block"><div class="invoice-list-header has-actions"><div class="invoice-list-heading"><h2 class="invoice-list-title">红冲任务列表</h2><span class="invoice-list-total">共 <span class="mono">' + rows.length + '</span> 条</span></div><div class="invoice-list-actions">' + btn('refresh', '刷新', 'refresh-cw', 'invoice-btn-default') + btn('export', '导出', 'download', 'invoice-btn-default') + btn('create-correction', '发起财务纠错', 'file-pen-line', 'invoice-btn-primary', ' data-anno="52"') + '</div></div><div class="invoice-list-divider"></div><div class="invoice-document-summary is-after-divider">' + kpis + '</div><div class="invoice-table-wrap" data-anno="51"><table class="invoice-table data-table" aria-label="红冲任务列表"><thead><tr><th>任务号 / 创建时间</th><th>来源 / 原因</th><th>原蓝票</th><th>红冲金额</th><th>状态</th><th>负责人</th><th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan="7">' + empty('未找到红冲任务', '请调整筛选条件后重试。', 'rotate-ccw') + '</td></tr>') + '</tbody></table></div>' + paginate(rows.length, redPage, size, 'red-page') + '</section>';
        return filterBlock + listBlock;
      }

      function renderConfigSynced() {
        var rows = configRows();
        var labels = { entities: '开票主体', contents: '发票内容', sku: 'SKU 映射', providers: '第三方服务商', notifications: '通知与 SLA' };
        var rowHtml = rows.map(function (item) { var fields = configSubtab === 'entities' ? '<td><span class="primary-cell">' + esc(item.name) + '</span><div class="muted">' + esc(item.type) + ' · 税号 ' + esc(item.taxId) + '</div></td><td>' + esc(item.scope) + '</td><td>' + esc(item.version) + '</td><td>' + statusBadgeText(item.status) + '</td><td>' + esc(item.updated) + '<div class="muted">' + esc(item.operator) + '</div></td>' : configSubtab === 'contents' ? '<td><span class="primary-cell">' + esc(item.label) + '</span><div class="muted">' + esc(item.id) + '</div></td><td>' + esc(item.taxRate) + '</td><td>' + esc(item.types) + '</td><td>' + esc(item.sku) + '</td><td>' + statusBadgeText(item.status) + '<div class="muted">' + esc(item.updated) + '</div></td>' : configSubtab === 'sku' ? '<td><span class="primary-cell">' + esc(item.name) + '</span><div class="muted">' + esc(item.id) + '</div></td><td>' + esc(item.content) + '</td><td>' + esc(item.taxRate) + '</td><td>' + statusBadgeText(item.status) + '</td><td>' + esc(item.updated) + '</td>' : configSubtab === 'providers' ? '<td><span class="primary-cell">' + esc(item.name) + '</span><div class="muted">' + esc(item.id) + '</div></td><td>' + esc(item.env) + '</td><td>' + esc(item.tenant) + '</td><td>' + esc(item.timeout) + '</td><td>' + statusBadgeText(item.status) + '<div class="muted">' + esc(item.updated) + '</div></td>' : '<td><span class="primary-cell">' + esc(item.name) + '</span><div class="muted">' + esc(item.id) + '</div></td><td>' + esc(item.target) + '</td><td>' + esc(item.threshold) + '</td><td>' + esc(item.channel) + '</td><td>' + statusBadgeText(item.status) + '</td>'; return '<tr><td><input class="invoice-check config-check" type="checkbox" data-id="' + esc(item.id) + '" aria-label="选择 ' + esc(item.id) + '"></td>' + fields + '<td><div class="actions">' + link('edit-config', '编辑', ' data-id="' + esc(item.id) + '"') + '</div></td></tr>'; }).join('');
        var headers = configSubtab === 'entities' ? '<th>主体名称</th><th>适用范围</th><th>版本</th><th>状态</th><th>更新时间 / 操作人</th>' : configSubtab === 'contents' ? '<th>发票内容</th><th>税率</th><th>票种</th><th>SKU 映射</th><th>状态 / 更新时间</th>' : configSubtab === 'sku' ? '<th>SKU</th><th>发票内容</th><th>税率</th><th>状态</th><th>更新时间</th>' : configSubtab === 'providers' ? '<th>服务商</th><th>环境</th><th>租户</th><th>超时</th><th>状态 / 更新时间</th>' : '<th>规则名称</th><th>通知对象</th><th>阈值</th><th>渠道</th><th>状态</th>';
        var tabs = '<nav class="invoice-config-tabs" role="tablist" aria-label="开票配置分类">' + Object.keys(labels).map(function (key) { return '<button type="button" class="invoice-config-tab' + (configSubtab === key ? ' is-active' : '') + '" data-action="config-subtab" data-value="' + key + '" role="tab" aria-selected="' + (configSubtab === key) + '">' + labels[key] + '</button>'; }).join('') + '</nav>';
        var contextBlock = '<section class="invoice-block invoice-config-top"><div class="invoice-config-filter"><div class="invoice-config-callout"><i data-lucide="shield-check" class="w-4 h-4"></i><div><strong>配置发布受控</strong>　个人仅可选数电普票；企业 / 组织可选普票或专票。SKU 无映射时，申请不可提交。<div class="invoice-config-state">当前生产版本 v12 · 最近发布 2026-08-18 17:20 · 配置管理员：林财务</div></div></div></div></section>';
        var navBlock = '<aside class="invoice-block invoice-config-nav" aria-label="开票配置分类导航">' + tabs + '</aside>';
        var listBlock = '<section class="invoice-block invoice-config-list"><div class="invoice-list-header has-actions"><div class="invoice-list-heading"><h2 class="invoice-list-title">' + labels[configSubtab] + '列表</h2><span class="invoice-list-total">共 <span class="mono">' + rows.length + '</span> 条</span></div><div class="invoice-list-actions">' + btn('new-config', '新增配置', 'plus', 'invoice-btn-default', ' data-anno="71"') + btn('publish-config', '发布变更', 'send', 'invoice-btn-primary') + '</div></div><div class="invoice-list-divider"></div><div class="invoice-table-wrap"><table class="invoice-table data-table" aria-label="' + labels[configSubtab] + '配置列表"><thead><tr><th><span class="sr-only">选择</span></th>' + headers + '<th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan="7">' + empty('暂无配置', '请先新增配置。', 'sliders-horizontal') + '</td></tr>') + '</tbody></table></div>' + paginate(rows.length, 1, 20, '') + '</section>';
        return '<div class="invoice-config-page">' + contextBlock + '<div class="invoice-config-workspace">' + navBlock + listBlock + '</div></div>';
      }
      function statusBadgeText(text) { var map = { '已发布': 'success', '草稿': 'warning', '待映射': 'warning', '主用': 'success', '备用': 'info', '已启用': 'success' }; return '<span class="invoice-badge invoice-badge-' + (map[text] || 'neutral') + '">' + esc(text) + '</span>'; }
      function renderView() {
        var content = currentTab === 'applications' ? renderApplicationWorkspace() : currentTab === 'documents' ? renderDocuments() : currentTab === 'red' ? renderRedSynced() : renderConfigSynced();
        view.innerHTML = content.replace(/<section class="invoice-block([^"]*)">/, function (match, classes) { return '<section class="invoice-block' + classes + '">' + renderPrimaryTabs(); });
        root.querySelector('.invoice-main').classList.toggle('is-config-view', currentTab === 'config');
        window.lucide && window.lucide.createIcons();
        bindStatusHelp();
        renderAnno();
      }

      function restoreFilterControls() {
        var values = currentTab === 'applications' ? { applicationKeyword: applicationFilters.keyword, applicationSubject: applicationFilters.subject, applicationType: applicationFilters.type, applicationStartDate: applicationCalendarOpen ? applicationCalendarStart : applicationFilters.startDate, applicationEndDate: applicationCalendarOpen ? applicationCalendarEnd : applicationFilters.endDate } : currentTab === 'documents' ? { documentKeyword: documentFilters.keyword, documentStatus: documentFilters.status, documentDelivery: documentFilters.delivery, documentStartDate: documentCalendarOpen ? documentCalendarStart : documentFilters.startDate, documentEndDate: documentCalendarOpen ? documentCalendarEnd : documentFilters.endDate } : currentTab === 'red' && redSubtab === 'tasks' ? { redKeyword: redFilters.keyword, redStatus: redFilters.status, redSource: redFilters.source } : {};
        Object.keys(values).forEach(function (id) { var control = root.querySelector('#' + id); if (control) control.value = values[id]; });
      }
      var renderViewBase = renderView;
      renderView = function () { renderViewBase(); restoreFilterControls(); };

      function openApplication(id) { var item = applications.find(function (row) { return row.id === id; }); if (!item) return; currentApplicationId = id; detailTab = 'overview'; root.querySelector('#invoiceDrawerTitle').textContent = item.id; root.querySelector('#invoiceDrawerMeta').textContent = item.subject + ' · ' + money(item.amount); renderDrawer(item); drawer.hidden = false; document.body.classList.add('invoice-lock-scroll'); window.lucide && window.lucide.createIcons(); renderAnno(); }
      function renderDrawer(item) { var detail = detailTab === 'overview' ? '<section class="invoice-detail-section"><h3>申请与受票</h3><dl class="invoice-detail-grid"><div class="invoice-detail-field"><dt>申请编号</dt><dd class="mono">' + esc(item.id) + '</dd></div><div class="invoice-detail-field"><dt>申请时间</dt><dd class="mono">' + esc(item.created) + '</dd></div><div class="invoice-detail-field"><dt>购买主体</dt><dd>' + esc(item.subject) + '（' + esc(item.subjectType) + '）</dd></div><div class="invoice-detail-field"><dt>申请人</dt><dd>' + esc(item.applicant) + '</dd></div><div class="invoice-detail-field"><dt>销售主体快照</dt><dd>云登网络科技（上海）有限公司 · 税号 9131**********48</dd></div><div class="invoice-detail-field"><dt>发票类型</dt><dd>' + (item.subjectType === '个人' ? '数电普票' : '数电专票') + '</dd></div><div class="invoice-detail-field"><dt>发票内容</dt><dd>' + esc(item.content) + ' · ' + esc(item.taxRate) + '</dd></div><div class="invoice-detail-field"><dt>收件邮箱</dt><dd>f***@yunstack.cn</dd></div></dl></section><section class="invoice-detail-section"><h3>金额与资格</h3><dl class="invoice-detail-grid"><div class="invoice-detail-field"><dt>本次申请金额</dt><dd class="mono">' + money(item.amount) + '</dd></div><div class="invoice-detail-field"><dt>法币实付净额</dt><dd class="mono">' + money(item.amount + 1200) + '</dd></div><div class="invoice-detail-field"><dt>已确认退款</dt><dd class="mono">¥12.00</dd></div><div class="invoice-detail-field"><dt>有效申请占用</dt><dd class="mono">' + money(item.amount) + '</dd></div></dl></section>' : detailTab === 'orders' ? '<section class="invoice-detail-section"><h3>订单分摊</h3><div class="invoice-table-wrap"><table class="invoice-table data-table"><thead><tr><th>订单号</th><th>商品</th><th>支付方式</th><th>法币实付</th><th>可开票净额</th><th>主体快照</th></tr></thead><tbody><tr><td class="mono">' + esc(item.order) + '</td><td>' + esc(item.content) + '</td><td>' + esc(item.source) + '</td><td class="amount">' + money(item.amount + 1200) + '</td><td class="amount">' + money(item.amount) + '</td><td>上海主体（固化）</td></tr><tr><td class="mono">ORD-20260817-0132</td><td>服务续费</td><td>支付宝</td><td class="amount">¥0.00</td><td class="amount">¥0.00</td><td>不满足法币支付</td></tr></tbody></table></div></section>' : detailTab === 'tasks' ? '<section class="invoice-detail-section"><h3>第三方任务</h3><dl class="invoice-detail-grid"><div class="invoice-detail-field"><dt>ProviderTask</dt><dd class="mono">PT-' + esc(item.id.slice(-4)) + '-01</dd></div><div class="invoice-detail-field"><dt>服务商</dt><dd>百望云 / 生产</dd></div><div class="invoice-detail-field"><dt>受理号</dt><dd class="mono">ACCEPT-20260819-' + esc(item.id.slice(-4)) + '</dd></div><div class="invoice-detail-field"><dt>幂等键</dt><dd class="mono">' + esc(item.id) + ':01</dd></div><div class="invoice-detail-field"><dt>最近响应</dt><dd>' + (item.issuance === 'UNKNOWN' ? '请求超时，结果未知' : '已验签，等待票据文件') + '</dd></div><div class="invoice-detail-field"><dt>允许动作</dt><dd>' + (item.issuance === 'UNKNOWN' ? '按原请求查询' : item.issuance === 'FAILED' ? '确认未受理后重试' : '等待回调') + '</dd></div></dl></section>' : detailTab === 'documents' ? '<section class="invoice-detail-section"><h3>票据与交付</h3><div class="invoice-table-wrap"><table class="invoice-table data-table"><thead><tr><th>票据号</th><th>票据状态</th><th>文件</th><th>交付</th><th>操作</th></tr></thead><tbody>' + documents.filter(function (doc) { return doc.applicationId === item.id; }).map(function (doc) { return '<tr><td class="mono">' + esc(doc.invoiceNo) + '</td><td>' + badge(doc.document) + '</td><td>' + badge(doc.file) + '</td><td>' + badge(doc.delivery) + '</td><td>' + link('preview-document', '预览', ' data-id="' + doc.id + '"') + '</td></tr>'; }).join('') + '</tbody></table></div></section>' : '<section class="invoice-detail-section"><h3>时间线与审计</h3><div class="invoice-timeline"><div class="invoice-timeline-item"><span class="invoice-timeline-dot"></span><time class="invoice-timeline-time">' + esc(item.created) + '</time><span class="invoice-timeline-copy">用户提交申请，服务端冻结可开票金额 <strong>' + money(item.amount) + '</strong>。</span></div><div class="invoice-timeline-item"><span class="invoice-timeline-dot"></span><time class="invoice-timeline-time">2026-08-19 09:46</time><span class="invoice-timeline-copy">系统校验通过：法币支付、履约和 SKU 映射均满足资格。</span></div><div class="invoice-timeline-item"><span class="invoice-timeline-dot"></span><time class="invoice-timeline-time">2026-08-19 09:48</time><span class="invoice-timeline-copy">' + (item.status === 'REJECTED' ? '财务驳回并记录结构化原因。' : item.status === 'REVIEWING' ? '审核员领取 30 分钟锁，锁 ID 已写入审计。' : '审核与开具事件已写入 Outbox。') + '</span></div></div></section>'; var tabs = [['overview', '申请与受票'], ['orders', '订单分摊'], ['tasks', '第三方任务'], ['documents', '票据交付'], ['timeline', '时间线审计']]; var stateHtml = '<div class="invoice-detail-state-panel" data-anno="90" role="group" aria-label="申请四维状态"><div class="invoice-detail-states"><div class="invoice-detail-state"><div class="invoice-detail-state-label">申请状态</div><div class="invoice-detail-state-value">' + badge(item.status) + '</div></div><div class="invoice-detail-state"><div class="invoice-detail-state-label">开具状态</div><div class="invoice-detail-state-value">' + badge(item.issuance) + '</div></div><div class="invoice-detail-state"><div class="invoice-detail-state-label">票据状态</div><div class="invoice-detail-state-value">' + badge(item.document) + '</div></div><div class="invoice-detail-state"><div class="invoice-detail-state-label">交付状态</div><div class="invoice-detail-state-value">' + badge(item.delivery) + '</div></div></div></div>'; root.querySelector('#invoiceDrawerBody').innerHTML = '<div class="invoice-detail-head"><div><div class="invoice-detail-title">' + esc(item.subject) + '</div><div class="invoice-detail-sub">订单 ' + esc(item.order) + ' · ' + esc(item.source) + '</div></div><div>' + badge(item.status) + '</div></div>' + stateHtml + '<div class="invoice-detail-tabs" role="tablist">' + tabs.map(function (tab) { return '<button type="button" class="invoice-detail-tab' + (detailTab === tab[0] ? ' is-active' : '') + '" data-action="detail-tab" data-value="' + tab[0] + '" role="tab" aria-selected="' + (detailTab === tab[0]) + '">' + tab[1] + '</button>'; }).join('') + '</div>' + detail; var footer = ''; if (item.status === 'PENDING_REVIEW' || item.status === 'REVIEWING') footer += '<div class="invoice-drawer-footer-note">' + (item.status === 'REVIEWING' ? '审核锁剩余 18 分钟 · lock_id LK-20260819-04' : '待领取审核锁 · 领取后 30 分钟内完成决策') + '</div><div class="invoice-head-actions" data-anno="91">' + btn('reject-application', '驳回', 'x-circle', 'invoice-btn-danger', ' data-id="' + item.id + '"') + btn('approve-application', '审核通过', 'check-circle-2', 'invoice-btn-primary', ' data-id="' + item.id + '"') + '</div>'; else if (item.issuance === 'UNKNOWN') footer = '<div class="invoice-drawer-footer-note">结果未知，金额继续占用</div><div class="invoice-head-actions">' + btn('query-task', '按原请求查询', 'search-check', 'invoice-btn-primary', ' data-id="' + item.id + '"') + '</div>'; else if (item.issuance === 'FAILED') footer = '<div class="invoice-drawer-footer-note">确认第三方未受理后才可重试</div><div class="invoice-head-actions">' + btn('retry-task', '确认未受理并重试', 'rotate-cw', 'invoice-btn-primary', ' data-id="' + item.id + '"') + '</div>'; else footer = '<div class="invoice-drawer-footer-note">request_id 已写入审计 · version ' + item.version + '</div><div class="invoice-head-actions">' + btn('close-drawer', '关闭', 'x', 'invoice-btn-default') + '</div>'; root.querySelector('#invoiceDrawerFooter').innerHTML = footer; window.lucide && window.lucide.createIcons(); renderAnno(); }

      var renderDrawerBase = renderDrawer;
      renderDrawer = function (item) {
        renderDrawerBase(item);
        if (item.status === 'PENDING_REVIEW') {
          root.querySelector('#invoiceDrawerFooter').innerHTML = '<div class="invoice-drawer-footer-note">待领取审核锁 · 领取后 30 分钟内完成决策</div><div class="invoice-head-actions">' + btn('claim-application', '领取审核', 'lock-keyhole', 'invoice-btn-primary', ' data-id="' + item.id + '"') + '</div>';
          window.lucide && window.lucide.createIcons();
        }
      };

      function openDialog(type, payload) { dialogContext = { type: type, payload: payload }; var title = root.querySelector('#invoiceDialogTitle'); var body = root.querySelector('#invoiceDialogBody'); var footer = root.querySelector('#invoiceDialogFooter'); if (type === 'approve') { var item = payload; title.textContent = '审核通过并提交开具'; body.innerHTML = '<p class="invoice-dialog-copy">确认通过申请 <strong>' + esc(item.id) + '</strong>？服务端会再次校验金额、主体快照、票种和 SKU 映射，并在事务内写入 Outbox。</p><div class="invoice-config-callout" style="margin-top:14px"><i data-lucide="lock-keyhole" class="w-4 h-4"></i><div>本次申请金额 <strong>' + money(item.amount) + '</strong> 将继续占用，直到票据成功、失败释放或红冲完成。</div></div>'; footer.innerHTML = btn('confirm-dialog', '确认通过', 'check-circle-2', 'invoice-btn-primary') + btn('close-dialog', '取消', 'x', 'invoice-btn-default'); } else if (type === 'reject') { title.textContent = '驳回开票申请'; body.innerHTML = '<p class="invoice-dialog-copy">驳回后申请不可继续审核，用户修改后将创建新的申请编号并关联 previous_application_id。</p><label for="rejectReason" class="invoice-filter-label">结构化驳回原因</label><textarea id="rejectReason" class="invoice-textarea" maxlength="200" placeholder="请输入具体原因，例如：销售主体税号快照缺失"></textarea><div id="dialogError" class="invoice-form-error" hidden>请填写驳回原因。</div>'; footer.innerHTML = btn('confirm-dialog', '确认驳回', 'x-circle', 'invoice-btn-danger') + btn('close-dialog', '取消', 'x', 'invoice-btn-default'); } else if (type === 'publish') { title.textContent = '发布开票配置'; body.innerHTML = '<p class="invoice-dialog-copy">将发布当前草稿配置到生产。历史申请仍使用支付时固化的销售主体快照。</p><label for="publishReason" class="invoice-filter-label">发布原因</label><textarea id="publishReason" class="invoice-textarea" maxlength="200" placeholder="请输入本次配置发布的业务原因"></textarea><div id="dialogError" class="invoice-form-error" hidden>请填写发布原因。</div>'; footer.innerHTML = btn('confirm-dialog', '确认发布', 'send', 'invoice-btn-primary') + btn('close-dialog', '取消', 'x', 'invoice-btn-default'); } else if (type === 'redRetry') { title.textContent = '确认关闭旧任务并重试'; body.innerHTML = '<p class="invoice-dialog-copy">仅当第三方确认未受理时才允许关闭旧任务。关闭和重试互斥，金额在新任务受理前仍保持冻结。</p><label for="retryReason" class="invoice-filter-label">处置说明</label><textarea id="retryReason" class="invoice-textarea" maxlength="200" placeholder="请输入查询凭证或第三方确认信息"></textarea><div id="dialogError" class="invoice-form-error" hidden>请填写处置说明。</div>'; footer.innerHTML = btn('confirm-dialog', '关闭并重试', 'rotate-cw', 'invoice-btn-primary') + btn('close-dialog', '取消', 'x', 'invoice-btn-default'); } else if (type === 'correction') { title.textContent = '发起财务纠错'; body.innerHTML = '<p class="invoice-dialog-copy">选择已开具的蓝票后，系统会整组占额并串行红冲，全部成功后生成唯一重开草稿。</p><label for="correctionInvoice" class="invoice-filter-label">目标蓝票</label><select id="correctionInvoice" class="invoice-control"><option>数电票-04438145 · 上海云栈信息科技有限公司 · ¥1,400.00</option><option>数电票-04438146 · 上海云栈信息科技有限公司 · ¥1,400.00</option></select><label for="correctionReason" class="invoice-filter-label" style="display:block;margin-top:13px">纠错原因</label><textarea id="correctionReason" class="invoice-textarea" maxlength="200" placeholder="请输入可审计的纠错原因"></textarea><div id="dialogError" class="invoice-form-error" hidden>请填写纠错原因。</div>'; footer.innerHTML = btn('confirm-dialog', '提交纠错申请', 'file-pen-line', 'invoice-btn-primary') + btn('close-dialog', '取消', 'x', 'invoice-btn-default'); } else { title.textContent = '导出任务已创建'; body.innerHTML = '<p class="invoice-dialog-copy">系统已创建异步导出快照。导出内容将按当前数据范围脱敏，完成后可在通知中心下载。</p>'; footer.innerHTML = btn('close-dialog', '知道了', 'check', 'invoice-btn-primary'); } dialog.hidden = false; window.lucide && window.lucide.createIcons(); }
      function closeDialog() { dialog.hidden = true; dialogContext = null; }
      function toast(message, type) { var item = document.createElement('div'); item.className = 'invoice-toast' + (type ? ' is-' + type : ''); item.innerHTML = '<i data-lucide="' + (type === 'danger' ? 'circle-alert' : type === 'warning' ? 'triangle-alert' : 'circle-check') + '" class="w-4 h-4"></i><span>' + esc(message) + '</span>'; toastHost.appendChild(item); window.lucide && window.lucide.createIcons(); setTimeout(function () { item.remove(); }, 3200); }
      function refreshCurrent() { selectedApplications = []; renderView(); toast('当前列表已刷新', 'success'); }
      function mutateApplication(id, nextStatus) { var item = applications.find(function (row) { return row.id === id; }); if (!item) return; item.status = nextStatus; item.version += 1; if (nextStatus === 'APPROVED') { item.issuance = 'ISSUING'; item.note = '审核通过，已写入 Outbox'; } if (nextStatus === 'REJECTED') { item.note = '财务审核驳回，用户可修改后重新提交'; } }
      function confirmDialog() { if (!dialogContext) return; var type = dialogContext.type; var payload = dialogContext.payload; var reasonId = type === 'reject' ? 'rejectReason' : type === 'publish' ? 'publishReason' : type === 'redRetry' ? 'retryReason' : type === 'correction' ? 'correctionReason' : ''; if (reasonId && !valueOf(reasonId)) { var error = root.querySelector('#dialogError'); if (error) error.hidden = false; return; } if (type === 'approve') { mutateApplication(payload.id, 'APPROVED'); closeDialog(); renderView(); if (drawer.hidden === false) { var updated = applications.find(function (row) { return row.id === payload.id; }); renderDrawer(updated); } toast('审核通过，已创建唯一开具任务', 'success'); } else if (type === 'reject') { mutateApplication(payload.id, 'REJECTED'); var item = applications.find(function (row) { return row.id === payload.id; }); item.note = valueOf(reasonId); closeDialog(); renderView(); if (!drawer.hidden) { renderDrawer(item); } toast('已驳回申请并记录结构化原因', 'warning'); } else if (type === 'publish') { closeDialog(); toast('配置已发布，版本号已递增并写入审计', 'success'); } else if (type === 'redRetry') { var task = redTasks.find(function (row) { return row.id === payload.id; }); if (task) { task.status = 'PROCESSING'; task.owner = '林财务'; task.reason = valueOf(reasonId); } closeDialog(); renderView(); toast('旧任务已关闭，已创建新的红冲任务', 'success'); } else if (type === 'correction') { corrections.unshift({ id: 'CR-20260819-007', subject: '上海云栈信息科技有限公司', targets: '04438145', amount: 140000, status: 'PENDING_REVIEW', created: '2026-08-19 10:02', applicant: '财务管理员', reason: valueOf(reasonId), draft: '待红冲' }); closeDialog(); redSubtab = 'corrections'; renderView(); toast('更正申请已提交，等待审核', 'success'); } else { closeDialog(); } }

      var toastBase = toast;
      toast = function (message, type) { if (message !== '审核通过，已创建唯一开具任务') toastBase(message, type); };
      var openDialogBase = openDialog;
      openDialog = function (type, payload) {
        if ((type === 'approve' || type === 'reject') && (!payload || payload.status !== 'REVIEWING')) {
          toast('请先领取有效审核锁，再提交审核决定', 'warning');
          return;
        }
        if (type === 'redRetry' && payload && String(payload.id || '').indexOf('IA-') === 0) payload.scope = 'issuance';
        openDialogBase(type, payload);
        if (type === 'redRetry' && payload && payload.scope === 'issuance') {
          root.querySelector('#invoiceDialogTitle').textContent = '确认关闭旧开具任务并重试';
          var copy = root.querySelector('#invoiceDialogBody .invoice-dialog-copy');
          if (copy) copy.textContent = '仅当第三方确认原请求未受理时才允许关闭旧任务。新尝试沿用原业务幂等键，金额继续占用。';
        }
      };
      var confirmDialogBase = confirmDialog;
      confirmDialog = function () {
        if (dialogContext && dialogContext.type === 'redRetry' && dialogContext.payload.scope === 'issuance') {
          if (!valueOf('retryReason')) { var error = root.querySelector('#dialogError'); if (error) error.hidden = false; return; }
          var item = applications.find(function (row) { return row.id === dialogContext.payload.id; });
          if (item) { item.issuance = 'SUBMITTING'; item.note = '原任务确认未受理，已创建新开具尝试'; item.version += 1; }
          closeDialog();
          renderView();
          if (item && !drawer.hidden) renderDrawer(item);
          toast('旧开具任务已关闭，新的幂等尝试已排队', 'success');
          return;
        }
        var approving = dialogContext && dialogContext.type === 'approve';
        confirmDialogBase();
        if (approving && dialog.hidden) toast('审核通过，开具命令已写入队列', 'success');
      };

      function openPreview(id) { var doc = documents.find(function (row) { return row.id === id; }); if (!doc) return; root.querySelector('#invoicePreviewTitle').textContent = doc.invoiceNo; root.querySelector('#invoicePreviewBody').innerHTML = '<div class="invoice-paper"><h3>电子发票（数电票）</h3><div class="invoice-paper-meta"><span>发票号码：' + esc(doc.invoiceNo) + '</span><span>开票日期：' + esc(doc.issued) + '</span></div><div class="invoice-paper-lines"><div class="invoice-paper-line"><span>购买方</span><span>统一社会信用代码</span><span>金额</span><span>税率</span></div><div class="invoice-paper-line"><span>' + esc(doc.subject) + '</span><span>9131**********48</span><span>' + money(doc.amount) + '</span><span>6%</span></div><div class="invoice-paper-line"><span>销售方</span><span>统一社会信用代码</span><span>开票内容</span><span>票种</span></div><div class="invoice-paper-line"><span>云登网络科技（上海）有限公司</span><span>9131**********48</span><span>信息技术服务*技术服务费</span><span>' + esc(doc.type) + '</span></div></div><div class="invoice-paper-total"><span>价税合计</span><span>' + money(doc.amount) + '</span></div></div>'; preview.hidden = false; window.lucide && window.lucide.createIcons(); }
      function closePreview() { preview.hidden = true; }
      function updateSelection(id, checked) { if (checked && selectedApplications.indexOf(id) < 0) selectedApplications.push(id); if (!checked) selectedApplications = selectedApplications.filter(function (value) { return value !== id; }); renderView(); }
      function renderAnno() { var layer = root.querySelector('#invoiceAnnoLayer'); layer.innerHTML = ''; if (!annoVisible) return; root.querySelectorAll('[data-anno]').forEach(function (target) { var rect = target.getBoundingClientRect(); if (!rect.width || !rect.height || rect.bottom < 0 || rect.top > window.innerHeight) return; var badgeEl = document.createElement('button'); badgeEl.type = 'button'; badgeEl.className = 'invoice-anno-badge'; badgeEl.textContent = target.dataset.anno; badgeEl.style.left = Math.max(2, Math.min(window.innerWidth - 22, rect.right - 9)) + 'px'; badgeEl.style.top = Math.max(2, Math.min(window.innerHeight - 22, rect.top - 8)) + 'px'; badgeEl.addEventListener('click', function (event) { event.stopPropagation(); showAnno(target.dataset.anno); }); layer.appendChild(badgeEl); }); }
      function showAnno(id) { var item = annotations[id]; if (!item) return; root.querySelector('#invoiceAnnoTitle').textContent = item.title; root.querySelector('#invoiceAnnoBody').innerHTML = item.desc.map(function (line) { return '<p>' + esc(line) + '</p>'; }).join(''); root.querySelector('#invoiceAnnoPopup').hidden = false; }
      function positionStatusHelp(help) { var button = help.querySelector('button'); var popover = help.querySelector('.invoice-status-help-popover'); if (!button || !popover) return; var rect = button.getBoundingClientRect(); var width = popover.offsetWidth || 292; var left = Math.max(8, Math.min(window.innerWidth - width - 8, rect.left)); popover.style.left = left + 'px'; popover.style.top = '8px'; var height = popover.offsetHeight || 160; var top = rect.bottom + 8; if (top + height > window.innerHeight - 8) top = Math.max(8, rect.top - height - 8); popover.style.top = top + 'px'; }
      function bindStatusHelp() { root.querySelectorAll('[data-status-help]').forEach(function (help) { var button = help.querySelector('button'); var popover = help.querySelector('.invoice-status-help-popover'); if (!button || !popover) return; help.dataset.open = 'false'; help.dataset.dismissed = 'false'; var overButton = false; var overPopover = false; var focused = false; var closeTimer = null; function open() { if (closeTimer) clearTimeout(closeTimer); help.dataset.dismissed = 'false'; help.dataset.open = 'true'; button.setAttribute('aria-expanded', 'true'); positionStatusHelp(help); } function close() { help.dataset.open = 'false'; button.setAttribute('aria-expanded', 'false'); } function scheduleClose() { if (closeTimer) clearTimeout(closeTimer); closeTimer = setTimeout(function () { if (!overButton && !overPopover && !focused) close(); }, 140); } button.addEventListener('mouseenter', function () { overButton = true; open(); }); button.addEventListener('mouseleave', function () { overButton = false; scheduleClose(); }); button.addEventListener('focus', function () { focused = true; open(); }); button.addEventListener('blur', function () { focused = false; scheduleClose(); }); button.addEventListener('keydown', function (event) { if (event.key === 'Escape') { help.dataset.dismissed = 'true'; close(); button.blur(); } }); button.addEventListener('click', function () { open(); }); popover.addEventListener('mouseenter', function () { overPopover = true; open(); }); popover.addEventListener('mouseleave', function () { overPopover = false; scheduleClose(); }); }); }
      function closeStatusHelps(except) { root.querySelectorAll('[data-status-help][data-open="true"]').forEach(function (help) { if (except && except.contains(help)) return; help.dataset.open = 'false'; var button = help.querySelector('button'); if (button) button.setAttribute('aria-expanded', 'false'); }); }

      root.addEventListener('click', function (event) {
        var calendarAction = event.target.closest('[data-calendar-action]');
        if (calendarAction && root.contains(calendarAction)) {
          event.preventDefault();
          event.stopImmediatePropagation();
          var action = calendarAction.dataset.calendarAction;
          var calendarScopeNode = calendarAction.closest('[data-calendar-scope]');
          var calendarScope = calendarScopeNode ? calendarScopeNode.dataset.calendarScope : 'application';
          var isDocumentCalendar = calendarScope === 'document';
          if (action === 'previous-year') {
            if (isDocumentCalendar) { documentCalendarMonth = addCalendarMonths(documentCalendarMonth, -12); updateDocumentCalendar(); }
            else { applicationCalendarMonth = addCalendarMonths(applicationCalendarMonth, -12); updateApplicationCalendar(); }
          } else if (action === 'previous-month') {
            if (isDocumentCalendar) { documentCalendarMonth = addCalendarMonths(documentCalendarMonth, -1); updateDocumentCalendar(); }
            else { applicationCalendarMonth = addCalendarMonths(applicationCalendarMonth, -1); updateApplicationCalendar(); }
          } else if (action === 'next-month') {
            if (isDocumentCalendar) { documentCalendarMonth = addCalendarMonths(documentCalendarMonth, 1); updateDocumentCalendar(); }
            else { applicationCalendarMonth = addCalendarMonths(applicationCalendarMonth, 1); updateApplicationCalendar(); }
          } else if (action === 'next-year') {
            if (isDocumentCalendar) { documentCalendarMonth = addCalendarMonths(documentCalendarMonth, 12); updateDocumentCalendar(); }
            else { applicationCalendarMonth = addCalendarMonths(applicationCalendarMonth, 12); updateApplicationCalendar(); }
          } else if (action === 'select-date') {
            if (isDocumentCalendar) selectDocumentCalendarDate(calendarAction.dataset.date);
            else selectApplicationCalendarDate(calendarAction.dataset.date);
          } else if (action === 'clear') {
            if (isDocumentCalendar) { documentCalendarStart = ''; documentCalendarEnd = ''; updateDocumentCalendar(); }
            else { applicationCalendarStart = ''; applicationCalendarEnd = ''; updateApplicationCalendar(); }
          } else if (action === 'cancel') {
            if (isDocumentCalendar) cancelDocumentCalendar();
            else cancelApplicationCalendar();
          } else if (action === 'confirm') {
            if (isDocumentCalendar) {
              documentCalendarCommittedStart = documentCalendarStart;
              documentCalendarCommittedEnd = documentCalendarEnd;
              closeDocumentCalendar();
            } else {
              applicationCalendarCommittedStart = applicationCalendarStart;
              applicationCalendarCommittedEnd = applicationCalendarEnd;
              closeApplicationCalendar();
            }
          }
          return;
        }
        var trigger = event.target.closest('[data-calendar-trigger]');
        if (trigger && root.contains(trigger) && !event.target.closest('.invoice-date-picker')) {
          event.preventDefault();
          event.stopImmediatePropagation();
          if (trigger.dataset.calendarScope === 'document') {
            if (applicationCalendarOpen) cancelApplicationCalendar();
            if (!documentCalendarOpen) openDocumentCalendar();
          } else {
            if (documentCalendarOpen) cancelDocumentCalendar();
            if (!applicationCalendarOpen) openApplicationCalendar();
          }
          return;
        }
        if (event.target.closest('.invoice-date-picker')) return;
        if (applicationCalendarOpen) cancelApplicationCalendar();
        if (documentCalendarOpen) cancelDocumentCalendar();
      }, true);

      root.addEventListener('click', function (event) {
        var target = event.target.closest('[data-action]');
        if (!target || !root.contains(target)) return;
        var action = target.dataset.action;
        var handled = ['application-status', 'query-applications', 'reset-applications', 'query-documents', 'reset-documents', 'reset-red'].indexOf(action) >= 0 || (action === 'query-red' && !target.dataset.id);
        if (!handled) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        if (action === 'application-status') {
          applicationStatus = target.dataset.status;
          selectedApplications = [];
          applicationPage = 1;
          renderView();
        } else if (action === 'query-applications') {
          var applicationStartDate = valueOf('applicationStartDate');
          var applicationEndDate = valueOf('applicationEndDate');
          var datePattern = /^\d{4}-\d{2}-\d{2}$/;
          if ((applicationStartDate && !datePattern.test(applicationStartDate)) || (applicationEndDate && !datePattern.test(applicationEndDate))) { toast('申请时间格式无效，请选择有效日期', 'warning'); return; }
          if (applicationStartDate && applicationEndDate && applicationStartDate > applicationEndDate) { toast('申请时间范围无效，请检查开始和结束日期', 'warning'); return; }
          applicationFilters = { keyword: valueOf('applicationKeyword'), subject: valueOf('applicationSubject'), type: valueOf('applicationType'), startDate: applicationStartDate, endDate: applicationEndDate };
          applicationCalendarCommittedStart = applicationStartDate;
          applicationCalendarCommittedEnd = applicationEndDate;
          selectedApplications = [];
          applicationPage = 1;
          renderView();
          toast('已按当前条件查询申请', 'success');
        } else if (action === 'reset-applications') {
          applicationFilters = { keyword: '', subject: '', type: '', startDate: '', endDate: '' };
          applicationCalendarOpen = false;
          applicationCalendarStart = '';
          applicationCalendarEnd = '';
          applicationCalendarCommittedStart = '';
          applicationCalendarCommittedEnd = '';
          applicationCalendarSnapshotStart = '';
          applicationCalendarSnapshotEnd = '';
          applicationStatus = 'ALL';
          selectedApplications = [];
          applicationPage = 1;
          renderView();
          toast('申请筛选已重置');
        } else if (action === 'query-documents') {
          var documentStartDate = valueOf('documentStartDate');
          var documentEndDate = valueOf('documentEndDate');
          var documentDatePattern = /^\d{4}-\d{2}-\d{2}$/;
          if ((documentStartDate && !documentDatePattern.test(documentStartDate)) || (documentEndDate && !documentDatePattern.test(documentEndDate))) { toast('开具时间格式无效，请选择有效日期', 'warning'); return; }
          if (documentStartDate && documentEndDate && documentStartDate > documentEndDate) { toast('开具时间范围无效，请检查开始和结束日期', 'warning'); return; }
          documentFilters = { keyword: valueOf('documentKeyword'), status: valueOf('documentStatus'), delivery: valueOf('documentDelivery'), startDate: documentStartDate, endDate: documentEndDate };
          documentCalendarCommittedStart = documentStartDate;
          documentCalendarCommittedEnd = documentEndDate;
          documentPage = 1;
          renderView();
          toast('已按当前条件查询票据', 'success');
        } else if (action === 'reset-documents') {
          documentFilters = { keyword: '', status: '', delivery: '', startDate: '', endDate: '' };
          documentCalendarOpen = false;
          documentCalendarStart = '';
          documentCalendarEnd = '';
          documentCalendarCommittedStart = '';
          documentCalendarCommittedEnd = '';
          documentCalendarSnapshotStart = '';
          documentCalendarSnapshotEnd = '';
          documentPage = 1;
          renderView();
          toast('票据筛选已重置');
        } else if (action === 'query-red') {
          redFilters = { keyword: valueOf('redKeyword'), status: valueOf('redStatus'), source: valueOf('redSource') };
          redPage = 1;
          renderView();
          toast('已按当前条件查询红冲任务', 'success');
        } else {
          redFilters = { keyword: '', status: '', source: '' };
          redPage = 1;
          renderView();
          toast('红冲筛选已重置');
        }
      }, true);
      root.addEventListener('click', function (event) { if (!event.target.closest('[data-status-help]')) closeStatusHelps(); }, true);

      root.addEventListener('click', function (event) { var target = event.target.closest('[data-action], [data-tab]'); if (!target || !root.contains(target)) return; var action = target.dataset.action; if (target.dataset.tab) { currentTab = target.dataset.tab; selectedApplications = []; renderView(); return; } if (action === 'application-status') { applicationStatus = target.dataset.status; selectedApplications = []; applicationPage = 1; renderView(); } else if (action === 'sort-applications') { toggleSort(applicationSort, target.dataset.sortKey); applicationPage = 1; selectedApplications = []; renderView(); } else if (action === 'sort-documents') { toggleSort(documentSort, target.dataset.sortKey); documentPage = 1; renderView(); } else if (action === 'query-applications') { applicationPage = 1; renderView(); toast('已按当前条件查询申请', 'success'); } else if (action === 'reset-applications') { ['applicationKeyword', 'applicationSubject', 'applicationStartDate', 'applicationEndDate'].forEach(function (id) { var el = root.querySelector('#' + id); if (el) el.value = ''; }); var type = root.querySelector('#applicationType'); if (type) type.value = ''; applicationStatus = 'ALL'; applicationPage = 1; renderView(); toast('申请筛选已重置'); } else if (action === 'application-page') { applicationPage = Number(target.dataset.page); renderView(); } else if (action === 'document-page') { documentPage = Number(target.dataset.page); renderView(); } else if (action === 'red-page') { redPage = Number(target.dataset.page); renderView(); } else if (action === 'open-application') { openApplication(target.dataset.id); } else if (action === 'claim-application') { var claimed = applications.find(function (item) { return item.id === target.dataset.id; }); if (claimed) { claimed.status = 'REVIEWING'; claimed.assignee = '当前管理员'; claimed.lockUntil = '2026-08-19 10:30'; claimed.version += 1; renderView(); toast('已领取审核锁，剩余 30 分钟', 'success'); } } else if (action === 'approve-application') { var approveItem = applications.find(function (item) { return item.id === target.dataset.id; }); if (approveItem) openDialog('approve', approveItem); } else if (action === 'reject-application') { var rejectItem = applications.find(function (item) { return item.id === target.dataset.id; }); if (rejectItem) openDialog('reject', rejectItem); } else if (action === 'close-drawer') { drawer.hidden = true; document.body.classList.remove('invoice-lock-scroll'); renderAnno(); } else if (action === 'detail-tab') { detailTab = target.dataset.value; var detailItem = applications.find(function (item) { return item.id === currentApplicationId; }); if (detailItem) renderDrawer(detailItem); } else if (action === 'query-task' || action === 'query-document' || action === 'query-red') { toast('已提交原任务查询，等待第三方回执', 'success'); } else if (action === 'retry-task') { var retryItem = applications.find(function (item) { return item.id === target.dataset.id; }); if (retryItem) openDialog('redRetry', { id: target.dataset.id }); } else if (action === 'preview-document') { openPreview(target.dataset.id); } else if (action === 'download-document') { toast('下载链接已生成，短时授权 10 分钟有效', 'success'); } else if (action === 'resend-document') { toast('已创建新的交付 Attempt，原票据状态不变', 'success'); } else if (action === 'red-subtab') { redSubtab = target.dataset.value; renderView(); } else if (action === 'back-red-tasks') { redSubtab = 'tasks'; renderView(); } else if (action === 'red-detail') { var task = redTasks.find(function (item) { return item.id === target.dataset.id; }); if (task) openDialog('export', task); } else if (action === 'retry-red') { var redTask = redTasks.find(function (item) { return item.id === target.dataset.id; }); if (redTask) openDialog('redRetry', redTask); } else if (action === 'correction-detail') { var correction = corrections.find(function (item) { return item.id === target.dataset.id; }); if (correction) openDialog('export', correction); } else if (action === 'review-correction') { toast('已打开更正审核工作流，请先领取审核锁', 'warning'); } else if (action === 'create-correction') { openDialog('correction'); } else if (action === 'config-subtab') { configSubtab = target.dataset.value; configPage = 1; renderView(); } else if (action === 'publish-config') { openDialog('publish'); } else if (action === 'new-config' || action === 'edit-config') { openDialog('export'); } else if (action === 'refresh') { refreshCurrent(); } else if (action === 'export' || action === 'bulk-export' || action === 'bulk-export-documents' || action === 'bulk-export-selected') { openDialog('export'); } else if (action === 'clear-selection') { selectedApplications = []; renderView(); } else if (action === 'close-dialog') { closeDialog(); } else if (action === 'confirm-dialog') { confirmDialog(); } else if (action === 'close-preview') { closePreview(); } else if (action === 'close-anno') { root.querySelector('#invoiceAnnoPopup').hidden = true; } });
      root.addEventListener('change', function (event) { var target = event.target; if (target.classList.contains('application-check')) updateSelection(target.dataset.id, target.checked); if (target.id === 'applicationSelectAll') { var rows = filterApplications().slice((applicationPage - 1) * applicationPageSize, applicationPage * applicationPageSize); rows.forEach(function (item) { if (target.checked && selectedApplications.indexOf(item.id) < 0) selectedApplications.push(item.id); if (!target.checked) selectedApplications = selectedApplications.filter(function (value) { return value !== item.id; }); }); renderView(); } });
      root.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && (applicationCalendarOpen || documentCalendarOpen)) {
          event.preventDefault();
          if (applicationCalendarOpen) cancelApplicationCalendar();
          if (documentCalendarOpen) cancelDocumentCalendar();
          return;
        }
        if (event.target.classList.contains('invoice-date-input') && ['Enter', ' ', 'ArrowDown'].indexOf(event.key) >= 0) {
          event.preventDefault();
          var dateRange = event.target.closest('[data-calendar-scope]');
          if (dateRange && dateRange.dataset.calendarScope === 'document') {
            if (!documentCalendarOpen) openDocumentCalendar();
          } else if (!applicationCalendarOpen) openApplicationCalendar();
          return;
        }
        var target = event.target.closest('.invoice-page-jump-input');
        if (!target || event.key !== 'Enter') return;
        event.preventDefault();
        var maxPage = Math.max(1, Number(target.max) || 1);
        var nextPage = Math.max(1, Math.min(maxPage, Number(target.value) || 1));
        if (target.dataset.pageAction === 'application-page') applicationPage = nextPage;
        if (target.dataset.pageAction === 'document-page') documentPage = nextPage;
        if (target.dataset.pageAction === 'red-page') redPage = nextPage;
        target.value = '1';
        renderView();
      });
      root.addEventListener('focusout', function (event) {
        if (event.target.classList.contains('invoice-page-jump-input') && !event.target.value) event.target.value = '1';
      });
      root.addEventListener('change', function (event) {
        var target = event.target;
        if (!target.classList.contains('invoice-page-size-select')) return;
        var size = Number(target.value);
        if ([10, 20, 50].indexOf(size) < 0) return;
        if (target.dataset.scope === 'application') { applicationPageSize = size; applicationPage = 1; }
        if (target.dataset.scope === 'document') { documentPageSize = size; documentPage = 1; }
        if (target.dataset.scope === 'red') { redPageSize = size; redPage = 1; }
        renderView();
      });
      root.addEventListener('click', function (event) { var target = event.target.closest('[data-action="claim-application"]'); if (!target || drawer.hidden) return; var item = applications.find(function (row) { return row.id === target.dataset.id; }); if (item) renderDrawer(item); });
      root.querySelector('#invoiceAnnoToggle').addEventListener('click', function () { annoVisible = !annoVisible; this.setAttribute('aria-pressed', String(annoVisible)); renderAnno(); });
      root.querySelector('#invoiceAnnoPopup').addEventListener('click', function (event) { if (event.target === this) this.hidden = true; });
      drawer.addEventListener('click', function (event) { if (event.target === drawer) { drawer.hidden = true; document.body.classList.remove('invoice-lock-scroll'); renderAnno(); } });
      dialog.addEventListener('click', function (event) { if (event.target === dialog) closeDialog(); });
      preview.addEventListener('click', function (event) { if (event.target === preview) closePreview(); });
      window.addEventListener('keydown', function (event) { if (event.key !== 'Escape') return; if (!root.querySelector('#invoiceAnnoPopup').hidden) root.querySelector('#invoiceAnnoPopup').hidden = true; else if (!preview.hidden) closePreview(); else if (!dialog.hidden) closeDialog(); else if (!drawer.hidden) { drawer.hidden = true; document.body.classList.remove('invoice-lock-scroll'); renderAnno(); } });
      window.addEventListener('resize', function () { renderAnno(); root.querySelectorAll('[data-status-help][data-open="true"]').forEach(positionStatusHelp); if (applicationCalendarOpen) updateApplicationCalendar(); if (documentCalendarOpen) updateDocumentCalendar(); }); window.addEventListener('scroll', function () { renderAnno(); root.querySelectorAll('[data-status-help][data-open="true"]').forEach(positionStatusHelp); }, true);
      function selectPrimaryTab(tab) { currentTab = tab; root.querySelectorAll('.invoice-primary-tab').forEach(function (button) { var active = button.dataset.tab === tab; button.classList.toggle('is-active', active); button.setAttribute('aria-selected', String(active)); }); }
      var deepLink = new URLSearchParams(window.location.search);
      var deepApplicationId = deepLink.get('application_id');
      var deepDocumentId = deepLink.get('document_id');
      var deepRedTaskId = deepLink.get('red_task_id');
      var deepCorrectionId = deepLink.get('correction_request_id');
      renderView();
      if (deepApplicationId || deepDocumentId || deepRedTaskId || deepCorrectionId) setTimeout(function () {
        if (deepDocumentId) selectPrimaryTab('documents');
        else if (deepRedTaskId || deepCorrectionId) { selectPrimaryTab('red'); if (deepCorrectionId) redSubtab = 'corrections'; }
        else selectPrimaryTab('applications');
        renderView();
        if (deepApplicationId && applications.some(function (item) { return item.id === deepApplicationId; })) openApplication(deepApplicationId);
        else if (deepDocumentId && documents.some(function (item) { return item.id === deepDocumentId; })) openPreview(deepDocumentId);
        else if (deepRedTaskId && redTasks.some(function (item) { return item.id === deepRedTaskId; })) toast('已定位红冲任务 ' + deepRedTaskId, 'success');
        else if (deepCorrectionId && corrections.some(function (item) { return item.id === deepCorrectionId; })) toast('已定位更正申请 ' + deepCorrectionId, 'success');
      }, 0);
    })();
  `;

  window.YundengModuleBundles['invoice-management'] = {
    id: 'invoice-management',
    file: '发票管理.html',
    title: '发票管理',
    html: html,
    styleLinks: [],
    styles: [styles],
    externalScripts: [],
    scripts: [scripts],
    usesAnnotations: false
  };
})();
