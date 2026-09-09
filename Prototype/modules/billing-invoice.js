window.YundengModules = window.YundengModules || {};
window.YundengModules["invoice-management"] = {
  "id": "invoice-management",
  "file": "index.html?page=billing-invoice",
  "title": "发票管理",
  "html": "\n<section aria-label=\"发票管理\" class=\"app-business-module invoice-module\" data-module-root=\"invoice-management\">\n<main class=\"invoice-main\" id=\"invoiceMain\" tabindex=\"-1\">\n<div class=\"invoice-view\" id=\"invoiceView\"></div>\n</main>\n<div class=\"invoice-overlay\" hidden=\"\" id=\"invoiceDrawer\">\n<aside aria-labelledby=\"invoiceDrawerTitle\" aria-modal=\"true\" class=\"invoice-drawer\" role=\"dialog\">\n<header class=\"invoice-drawer-header\">\n<div><div class=\"invoice-drawer-kicker\">申请详情</div><h2 id=\"invoiceDrawerTitle\">开票申请</h2><p id=\"invoiceDrawerMeta\"></p></div>\n<button aria-label=\"关闭申请详情\" class=\"icon-btn\" data-action=\"close-drawer\" title=\"关闭详情\" type=\"button\"><i class=\"w-5 h-5\" data-lucide=\"x\"></i></button>\n</header>\n<div class=\"invoice-drawer-body\" id=\"invoiceDrawerBody\"></div>\n<footer class=\"invoice-drawer-footer\" id=\"invoiceDrawerFooter\"></footer>\n</aside>\n</div>\n<div class=\"invoice-dialog-overlay\" hidden=\"\" id=\"invoiceDialog\">\n<section aria-labelledby=\"invoiceDialogTitle\" aria-modal=\"true\" class=\"invoice-dialog\" role=\"dialog\">\n<header class=\"invoice-dialog-header\"><h2 id=\"invoiceDialogTitle\">确认操作</h2><button aria-label=\"关闭弹窗\" class=\"icon-btn\" data-action=\"close-dialog\" type=\"button\"><i class=\"w-5 h-5\" data-lucide=\"x\"></i></button></header>\n<div class=\"invoice-dialog-body\" id=\"invoiceDialogBody\"></div>\n<footer class=\"invoice-dialog-footer\" id=\"invoiceDialogFooter\"></footer>\n</section>\n</div>\n<div class=\"invoice-dialog-overlay\" hidden=\"\" id=\"invoicePreview\">\n<section aria-labelledby=\"invoicePreviewTitle\" aria-modal=\"true\" class=\"invoice-preview\" role=\"dialog\">\n<header class=\"invoice-dialog-header\"><div><div class=\"invoice-dialog-kicker\">票据预览</div><h2 id=\"invoicePreviewTitle\">电子发票</h2></div><button aria-label=\"关闭票据预览\" class=\"icon-btn\" data-action=\"close-preview\" type=\"button\"><i class=\"w-5 h-5\" data-lucide=\"x\"></i></button></header>\n<div class=\"invoice-preview-body\" id=\"invoicePreviewBody\"></div>\n</section>\n</div>\n<div aria-live=\"polite\" class=\"invoice-toast-stack\" id=\"invoiceToast\"></div>\n<div class=\"invoice-anno-layer\" id=\"invoiceAnnoLayer\"></div>\n<button aria-pressed=\"false\" class=\"invoice-anno-toggle\" id=\"invoiceAnnoToggle\" title=\"显示交互标注\" type=\"button\"><i class=\"w-4 h-4\" data-lucide=\"tags\"></i><span>交互标注</span></button>\n<div class=\"invoice-anno-popup\" hidden=\"\" id=\"invoiceAnnoPopup\"><div class=\"invoice-anno-panel\"><header><h2 id=\"invoiceAnnoTitle\">交互标注</h2><button aria-label=\"关闭标注说明\" class=\"icon-btn\" data-action=\"close-anno\" type=\"button\"><i class=\"w-5 h-5\" data-lucide=\"x\"></i></button></header><div id=\"invoiceAnnoBody\"></div></div></div>\n</section>",
  "styleLinks": [],
  "styles": [
    "\n    body.invoice-lock-scroll{overflow:hidden}\n    .invoice-module{--invoice-blue:#0066FF;--invoice-blue-hover:#0052CC;--invoice-ink:#1A1D24;--invoice-body:#3A3F4A;--invoice-sub:#6E7685;--invoice-muted:#9DA2AC;--invoice-line:#DFE1E5;--invoice-line-light:#E8EAED;--invoice-page:#F7F8FA;--invoice-card:#FFFFFF;--invoice-hover:#F3F4F6;--invoice-success:#0FC060;--invoice-success-bg:#E7F9F0;--invoice-warning:#E7772D;--invoice-warning-bg:#FDF2E9;--invoice-danger:#D9001B;--invoice-danger-bg:#FFE8EB;--invoice-info:#0091D5;--invoice-info-bg:#E4F4FB;color:var(--invoice-body);font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}\n    .invoice-module *,.invoice-module *::before,.invoice-module *::after{box-sizing:border-box}\n    .invoice-module ::selection{background:#D6E7FF;color:var(--invoice-ink)}\n    .invoice-main{min-height:calc(100vh - 56px);padding:16px 16px 32px;background:var(--invoice-page)}\n    .invoice-primary-tabs{display:flex;min-width:0;gap:4px;margin:0 0 20px;padding:0;border:0;border-bottom:1px solid var(--invoice-line-light);overflow-x:auto;scrollbar-width:none}\n    .invoice-primary-tabs::-webkit-scrollbar{display:none}\n    .invoice-primary-tab{position:relative;display:inline-flex;align-items:center;gap:7px;min-height:42px;padding:0 16px;border:0;border-bottom:2px solid transparent;background:transparent;color:var(--invoice-sub);font:inherit;font-size:14px;cursor:pointer;white-space:nowrap}\n    .invoice-primary-tab:hover{color:var(--invoice-ink);background:var(--invoice-hover)}\n    .invoice-primary-tab.is-active{color:var(--invoice-blue);border-bottom-color:var(--invoice-blue);font-weight:600}\n    .invoice-tab-count{display:inline;color:inherit;background:transparent;font:500 12px/20px 'JetBrains Mono',monospace}\n    .invoice-tab-count.is-danger{color:inherit;background:transparent}\n    .invoice-view{width:100%;margin:0}\n    .invoice-block{width:100%;padding:20px;background:var(--invoice-card);border:0;border-radius:8px}\n    .invoice-block+.invoice-block{margin-top:16px}\n    .invoice-status-tabs{display:flex;align-items:center;flex-wrap:nowrap;gap:0;max-width:100%;overflow-x:auto;border:0;scrollbar-width:none}\n    .invoice-status-tabs::-webkit-scrollbar{display:none}\n    .invoice-status-tab{position:relative;height:30px;padding:0 12px;border:1px solid var(--invoice-line);border-radius:0;background:#fff;color:var(--invoice-sub);font:inherit;font-size:13px;cursor:pointer;white-space:nowrap}\n    .invoice-status-tab:first-child{border-radius:4px 0 0 4px}\n    .invoice-status-tab:last-child{border-radius:0 4px 4px 0}\n    .invoice-status-tab+.invoice-status-tab{margin-left:-1px}\n    .invoice-status-tab:hover{background:var(--invoice-hover);color:var(--invoice-body)}\n    .invoice-status-tab.is-active{z-index:1;border-color:var(--invoice-blue);background:#E6F0FF;color:var(--invoice-blue);font-weight:600;box-shadow:none}\n    .invoice-data-scope-tabs{width:300px;overflow:visible}\n    .invoice-data-scope-tabs .invoice-status-tab{flex:1;height:32px;padding:0 16px}\n    .invoice-filter-flow{display:flex;flex-wrap:wrap;align-items:center;column-gap:16px;row-gap:12px;width:100%;max-width:1776px}\n    .invoice-filter-item{display:flex;flex:0 0 388px;width:388px;min-width:0;align-items:center;gap:0}\n    .invoice-filter-item label,.invoice-filter-name{width:88px;flex:none;text-align:right;color:var(--invoice-body);font-size:13px;line-height:18px}\n    .invoice-filter-item label:after,.invoice-filter-name:after{content:'：'}\n    .invoice-filter-label{display:block;margin-top:14px;color:var(--invoice-body);font-size:13px;line-height:20px}\n    .invoice-control{width:400px;max-width:100%;height:32px;padding:0 8px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-body);font:inherit;font-size:14px;outline:none}\n    .invoice-filter-item .invoice-control{width:300px}\n    .invoice-control::placeholder{color:var(--invoice-muted);font-size:14px}\n    .invoice-control:focus{border-color:var(--invoice-blue);box-shadow:0 0 0 2px rgba(0,102,255,.12)}\n    .invoice-filter-actions{display:flex;flex:none;align-items:center;gap:12px}\n    .invoice-context-actions{display:flex;flex:none;align-items:center;margin-left:auto;padding-left:16px;border-left:1px solid var(--invoice-line-light)}\n    .invoice-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;padding:0 12px;border:1px solid transparent;border-radius:4px;font:inherit;font-size:13px;line-height:30px;cursor:pointer;white-space:nowrap;transition:background .15s,border-color .15s,color .15s,box-shadow .15s}\n    .invoice-btn:focus-visible,.invoice-btn-link:focus-visible,.invoice-icon-btn:focus-visible,.icon-btn:focus-visible,.invoice-primary-tab:focus-visible,.invoice-status-tab:focus-visible,.invoice-config-tab:focus-visible,.invoice-detail-tab:focus-visible,.invoice-page-btn:focus-visible,.invoice-anno-toggle:focus-visible{outline:2px solid var(--invoice-blue);outline-offset:2px}\n    .invoice-btn-primary{background:var(--invoice-blue);color:#fff}\n    .invoice-btn-primary:hover{background:#0052CC}\n    .invoice-btn-default{background:#fff;border-color:var(--invoice-line);color:var(--invoice-body)}\n    .invoice-btn-default:hover{background:var(--invoice-hover);border-color:#C7CBD2}\n    .invoice-btn-danger{background:#fff;border-color:#F0B7BE;color:var(--invoice-danger)}\n    .invoice-btn-danger:hover{background:var(--invoice-danger-bg)}\n    .invoice-btn-link{height:auto;padding:0;border:0;background:transparent;color:var(--invoice-blue);font-size:13px;cursor:pointer}\n    .invoice-btn-link:hover{text-decoration:underline}\n    .invoice-btn[disabled]{opacity:.48;cursor:not-allowed}\n    .invoice-kpi-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin:16px 0}\n    .invoice-kpi{min-height:78px;padding:12px;border:1px solid var(--invoice-line-light);border-radius:6px;background:var(--invoice-page)}\n    .invoice-kpi-grid.is-borderless .invoice-kpi{border:0}\n    .invoice-kpi-label{color:var(--invoice-sub);font-size:12px;line-height:18px}\n    .invoice-kpi-value{margin-top:5px;color:var(--invoice-ink);font:600 20px/26px 'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}\n    .invoice-kpi-note{margin-top:1px;color:var(--invoice-muted);font-size:11px;line-height:16px}\n    .invoice-head-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}\n    .invoice-selection{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:0 0 10px;padding:9px 12px;border:1px solid #B8D2FF;border-radius:4px;background:#F4F8FF;color:var(--invoice-blue);font-size:12px}\n    .invoice-selection-actions{display:flex;align-items:center;gap:8px}\n    .invoice-table-wrap{width:100%;overflow-x:auto;border:0;border-radius:0;scrollbar-color:#C7CBD2 transparent;scrollbar-width:thin}\n    .invoice-table-wrap::-webkit-scrollbar{height:8px}\n    .invoice-table-wrap::-webkit-scrollbar-thumb{background:#C7CBD2;border:2px solid transparent;border-radius:4px;background-clip:padding-box}\n    .invoice-table{width:100%;min-width:1120px;border-collapse:collapse;font-size:13px}\n    .invoice-table th{height:auto;padding:9px 12px;border-bottom:1px solid var(--invoice-line);background:#F0F1F3;color:var(--invoice-sub);font-size:12px;font-weight:600;text-align:left;white-space:nowrap}\n    .invoice-sort-button{display:inline-flex;align-items:center;gap:4px;padding:0;border:0;background:transparent;color:var(--invoice-sub);font:inherit;font-weight:600;white-space:nowrap;cursor:pointer}\n    .invoice-sort-button:hover,.invoice-sort-button:focus-visible,.invoice-sort-button[data-sort-direction=\"asc\"],.invoice-sort-button[data-sort-direction=\"desc\"]{color:var(--invoice-blue)}\n    .invoice-sort-button:focus-visible{outline:2px solid var(--invoice-blue);outline-offset:2px;border-radius:2px}\n    .invoice-sort-icon{display:inline-flex;width:10px;height:14px;flex:none;flex-direction:column;align-items:center;justify-content:center;gap:2px}\n    .invoice-sort-caret{display:block;width:10px;height:6px;flex:none;background:currentColor;color:var(--invoice-muted);transition:color .15s ease}\n    .invoice-sort-caret.is-up{clip-path:polygon(50% 0,100% 100%,0 100%)}\n    .invoice-sort-caret.is-down{clip-path:polygon(0 0,100% 0,50% 100%)}\n    .invoice-sort-button[data-sort-direction=\"asc\"] .invoice-sort-caret.is-up,.invoice-sort-button[data-sort-direction=\"desc\"] .invoice-sort-caret.is-down{color:var(--invoice-blue)}\n    .invoice-table td{height:48px;padding:9px 12px;border-bottom:1px solid var(--invoice-line-light);color:var(--invoice-body);font-size:13px;line-height:18px;text-align:left;vertical-align:middle;white-space:nowrap}\n    .invoice-table tbody tr:last-child td{border-bottom:1px solid var(--invoice-line-light)}\n    .invoice-table tbody tr:hover{background:var(--invoice-hover)}\n    .invoice-table .primary-cell{color:var(--invoice-ink);font-weight:550}\n    .invoice-table .amount{color:var(--invoice-ink);font:500 13px/18px 'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}\n    .invoice-table .muted{color:var(--invoice-muted);font-size:12px}\n    .invoice-table .actions{display:flex;align-items:center;gap:12px}\n    .invoice-check{width:15px;height:15px;accent-color:var(--invoice-blue);vertical-align:middle}\n    .invoice-application-select-cell{width:27px;padding-right:0!important}\n    .invoice-application-id-cell{padding-left:20px!important}\n    .invoice-badge{display:inline-flex;align-items:center;gap:4px;min-height:22px;padding:0 7px;border:1px solid transparent;border-radius:4px;font-size:11px;line-height:20px;white-space:nowrap}\n    .invoice-badge-primary{color:var(--invoice-blue);background:#E6F0FF;border-color:#B8D2FF}\n    .invoice-badge-info{color:#006B9E;background:var(--invoice-info-bg);border-color:#B8DFEF}\n    .invoice-badge-success{color:#087E40;background:var(--invoice-success-bg);border-color:#B8E7CE}\n    .invoice-badge-warning{color:#A84D16;background:var(--invoice-warning-bg);border-color:#F0C9A8}\n    .invoice-badge-danger{color:#AF0017;background:var(--invoice-danger-bg);border-color:#F0B7BE}\n    .invoice-badge-neutral{color:var(--invoice-sub);background:#F0F1F3;border-color:var(--invoice-line)}\n    .invoice-status-parameter{display:inline;color:var(--invoice-sub);font-size:12px;font-weight:500;line-height:20px;white-space:nowrap}\n    .invoice-status-parameter.is-primary{color:var(--invoice-blue)}\n    .invoice-status-parameter.is-info{color:#006B9E}\n    .invoice-status-parameter.is-success{color:#087E40}\n    .invoice-status-parameter.is-warning{color:#A84D16}\n    .invoice-status-parameter.is-danger{color:#AF0017}\n    .invoice-pagination{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:16px;padding-top:20px;color:var(--invoice-sub);font-size:12px}\n    .invoice-page-btn{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;padding:0 8px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-body);font:500 12px inherit;cursor:pointer;transition:background .15s,border-color .15s,color .15s}\n    .invoice-page-btn:not(:disabled):not(.is-active):hover{color:var(--invoice-blue);border-color:var(--invoice-blue);background:#fff}\n    .invoice-page-btn.is-active{color:#fff;background:var(--invoice-blue);border-color:var(--invoice-blue);font-weight:600}\n    .invoice-page-btn:disabled{color:#C7CAD1;cursor:not-allowed;background:var(--invoice-page);border-color:var(--invoice-line)}\n    .invoice-empty{display:grid;place-items:center;padding:48px 20px;color:var(--invoice-sub);text-align:center}\n    .invoice-empty-icon{display:grid;width:44px;height:44px;place-items:center;border-radius:8px;background:var(--invoice-page);color:var(--invoice-muted)}\n    .invoice-empty strong{margin-top:14px;color:var(--invoice-ink);font-size:15px}\n    .invoice-empty p{margin:5px 0 0;font-size:12px}\n    .invoice-subtabs{display:flex;align-items:center;gap:3px;margin:-2px 0 16px;padding-bottom:10px;border-bottom:1px solid var(--invoice-line-light)}\n    .invoice-config-tab{height:30px;padding:0 11px;border:0;border-radius:4px;background:transparent;color:var(--invoice-sub);font:inherit;font-size:13px;cursor:pointer}\n    .invoice-config-tab:hover{background:var(--invoice-hover)}\n    .invoice-config-tab.is-active{background:#E6F0FF;color:var(--invoice-blue);font-weight:600}\n    .invoice-config-callout{display:flex;align-items:flex-start;gap:10px;margin:0 0 14px;padding:11px 13px;border:1px solid #C8E7F3;border-radius:4px;background:#F4FBFE;color:var(--invoice-info);font-size:12px;line-height:18px}\n    .invoice-config-callout strong{color:#006B9E;font-weight:600}\n    .invoice-config-state{font-size:11px;color:var(--invoice-sub)}\n    .invoice-overlay,.invoice-dialog-overlay{position:fixed;inset:0;z-index:80;background:rgba(26,29,36,.28)}\n    .invoice-overlay{display:flex;justify-content:flex-end}\n    .invoice-drawer{width:960px;max-width:100%;height:100%;background:#fff;box-shadow:-8px 0 28px rgba(26,29,36,.12);display:flex;flex-direction:column}\n    .invoice-drawer-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:18px 24px 15px;border-bottom:1px solid var(--invoice-line);flex:none}\n    .invoice-drawer-kicker,.invoice-dialog-kicker{color:var(--invoice-muted);font-size:11px;line-height:16px;letter-spacing:.04em}\n    .invoice-drawer-header h2{margin:2px 0 0;color:var(--invoice-ink);font-size:18px;line-height:25px;font-weight:650}\n    .invoice-drawer-header p{margin:3px 0 0;color:var(--invoice-sub);font:12px/18px 'JetBrains Mono',monospace}\n    .invoice-icon-btn,.icon-btn{display:inline-grid;width:32px;height:32px;place-items:center;border:0;border-radius:4px;background:transparent;color:var(--invoice-sub);cursor:pointer;flex:none}\n    .invoice-icon-btn:hover,.icon-btn:hover{background:var(--invoice-hover);color:var(--invoice-body)}\n    .invoice-drawer-body{flex:1;overflow:auto;padding:20px 24px 24px}\n    .invoice-drawer-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 24px;border-top:1px solid var(--invoice-line);flex:none}\n    .invoice-drawer-footer-note{color:var(--invoice-sub);font-size:12px;line-height:18px}\n    .invoice-detail-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px;margin-bottom:18px}\n    .invoice-detail-title{color:var(--invoice-ink);font-size:15px;font-weight:600}\n    .invoice-detail-sub{margin-top:3px;color:var(--invoice-sub);font-size:12px}\n    .invoice-detail-states{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:18px}\n    .invoice-detail-state{padding:10px;border:1px solid var(--invoice-line-light);border-radius:5px;background:var(--invoice-page)}\n    .invoice-detail-state-label{color:var(--invoice-sub);font-size:11px}\n    .invoice-detail-state-value{margin-top:5px}\n    .invoice-detail-tabs{display:flex;gap:2px;overflow-x:auto;margin-bottom:16px;border-bottom:1px solid var(--invoice-line-light)}\n    .invoice-detail-tab{height:32px;padding:0 11px;border:0;border-bottom:2px solid transparent;background:transparent;color:var(--invoice-sub);font:inherit;font-size:12px;cursor:pointer;white-space:nowrap}\n    .invoice-detail-tab.is-active{border-bottom-color:var(--invoice-blue);color:var(--invoice-blue);font-weight:600}\n    .invoice-detail-section{margin-bottom:18px}\n    .invoice-detail-section h3{margin:0 0 9px;color:var(--invoice-ink);font-size:13px;line-height:20px;font-weight:600}\n    .invoice-detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid var(--invoice-line-light);border-left:1px solid var(--invoice-line-light)}\n    .invoice-detail-field{display:grid;grid-template-columns:110px minmax(0,1fr);min-height:38px;border-right:1px solid var(--invoice-line-light);border-bottom:1px solid var(--invoice-line-light);font-size:12px}\n    .invoice-detail-field dt{padding:10px;background:#FAFBFC;color:var(--invoice-sub)}\n    .invoice-detail-field dd{margin:0;padding:10px;color:var(--invoice-body);overflow-wrap:anywhere}\n    .invoice-detail-field dd.mono{font-family:'JetBrains Mono',monospace;font-size:11px}\n    .invoice-timeline{display:flex;flex-direction:column;gap:0}\n    .invoice-timeline-item{display:grid;grid-template-columns:20px 110px minmax(0,1fr);gap:9px;min-height:48px;font-size:12px}\n    .invoice-timeline-dot{position:relative;display:flex;justify-content:center}\n    .invoice-timeline-dot:before{content:'';width:8px;height:8px;margin-top:5px;border-radius:50%;background:var(--invoice-blue);z-index:1}\n    .invoice-timeline-dot:after{content:'';position:absolute;top:13px;bottom:-1px;width:1px;background:var(--invoice-line)}\n    .invoice-timeline-item:last-child .invoice-timeline-dot:after{display:none}\n    .invoice-timeline-time{color:var(--invoice-muted);font:11px/18px 'JetBrains Mono',monospace}\n    .invoice-timeline-copy{color:var(--invoice-body);line-height:18px}\n    .invoice-dialog-overlay{display:grid;place-items:center;padding:16px}\n    .invoice-dialog{width:600px;max-width:100%;max-height:calc(100vh - 32px);overflow:auto;border-radius:8px;background:#fff;box-shadow:0 8px 28px rgba(26,29,36,.16)}\n    .invoice-dialog-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;border-bottom:1px solid var(--invoice-line)}\n    .invoice-dialog-header h2{margin:0;color:var(--invoice-ink);font-size:16px;line-height:22px;font-weight:650}\n    .invoice-dialog-body{padding:20px}\n    .invoice-dialog-footer{display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:13px 20px;border-top:1px solid var(--invoice-line)}\n    .invoice-dialog-copy{color:var(--invoice-body);font-size:13px;line-height:21px}\n    .invoice-dialog-copy strong{color:var(--invoice-ink)}\n    .invoice-textarea{width:100%;min-height:104px;margin-top:7px;padding:9px;border:1px solid var(--invoice-line);border-radius:4px;resize:vertical;color:var(--invoice-body);font:13px/20px inherit;outline:none}\n    .invoice-textarea:focus{border-color:var(--invoice-blue);box-shadow:0 0 0 2px rgba(0,102,255,.12)}\n    .invoice-form-error{margin-top:6px;color:var(--invoice-danger);font-size:12px;line-height:18px}\n    .invoice-preview{width:760px;max-width:100%;max-height:calc(100vh - 32px);overflow:auto;border-radius:8px;background:#fff;box-shadow:0 8px 28px rgba(26,29,36,.16)}\n    .invoice-preview-body{padding:24px;background:#F1F3F5}\n    .invoice-paper{max-width:620px;margin:0 auto;padding:34px 38px;background:#fff;border:1px solid #D7DADE;box-shadow:0 2px 8px rgba(26,29,36,.08)}\n    .invoice-paper h3{margin:0;text-align:center;color:var(--invoice-ink);font-size:19px;line-height:26px;font-weight:650}\n    .invoice-paper-meta{display:flex;justify-content:space-between;margin-top:25px;color:var(--invoice-sub);font:11px/16px 'JetBrains Mono',monospace}\n    .invoice-paper-lines{margin-top:20px;border:1px solid #BFC4CB;border-bottom:0}\n    .invoice-paper-line{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,.7fr) minmax(0,.8fr) minmax(0,1fr);border-bottom:1px solid #BFC4CB}\n    .invoice-paper-line span{min-width:0;min-height:32px;padding:8px;border-right:1px solid #BFC4CB;color:var(--invoice-body);font-size:11px;overflow-wrap:anywhere}\n    .invoice-paper-line span:last-child{border-right:0}\n    .invoice-paper-total{display:flex;justify-content:flex-end;gap:28px;padding-top:18px;color:var(--invoice-ink);font:600 13px/20px 'JetBrains Mono',monospace}\n    .invoice-toast-stack{position:fixed;top:18px;left:50%;z-index:120;display:flex;flex-direction:column;gap:8px;transform:translateX(-50%);pointer-events:none}\n    .invoice-toast{display:flex;align-items:center;gap:8px;min-width:240px;max-width:min(460px,calc(100vw - 32px));padding:10px 14px;border:1px solid var(--invoice-line);border-radius:5px;background:#fff;box-shadow:0 4px 16px rgba(26,29,36,.12);color:var(--invoice-body);font-size:13px;animation:invoice-toast-enter .18s cubic-bezier(.16,1,.3,1)}\n    .invoice-toast.is-success{border-color:#A9E2C3}\n    .invoice-toast.is-success svg{color:#087E40}\n    .invoice-toast.is-warning{border-color:#F0C9A8}\n    .invoice-toast.is-warning svg{color:#A84D16}\n    .invoice-toast.is-danger{border-color:#F0B7BE}\n    .invoice-toast.is-danger svg{color:#AF0017}\n    @keyframes invoice-toast-enter{from{opacity:0;transform:translateY(-6px);filter:blur(2px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}\n    .invoice-anno-layer{position:fixed;inset:0;z-index:110;pointer-events:none}\n    .invoice-anno-badge{position:fixed;display:grid;width:20px;height:20px;place-items:center;border:0;border-radius:50%;background:var(--invoice-blue);color:#fff;font:700 11px/20px 'JetBrains Mono',monospace;box-shadow:0 2px 6px rgba(0,0,0,.16);pointer-events:auto;cursor:pointer}\n    .invoice-anno-badge:hover{transform:scale(1.12)}\n    .invoice-anno-toggle{position:fixed;right:8px;top:120px;z-index:109;display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 11px;border:0;border-radius:16px;background:var(--invoice-blue);color:#fff;font:500 12px/32px inherit;box-shadow:0 2px 8px rgba(26,29,36,.16);cursor:pointer}\n    .invoice-anno-toggle[aria-pressed=\"true\"]{background:#1A1D24}\n    .invoice-anno-popup{position:fixed;inset:0;z-index:130;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.3)}\n    .invoice-anno-panel{width:520px;max-width:100%;border-radius:8px;background:#fff;box-shadow:0 8px 28px rgba(26,29,36,.16)}\n    .invoice-anno-panel header{display:flex;align-items:center;justify-content:space-between;padding:15px 20px;border-bottom:1px solid var(--invoice-line)}\n    .invoice-anno-panel h2{margin:0;color:var(--invoice-ink);font-size:16px}\n    .invoice-anno-panel>div{padding:18px 20px;color:var(--invoice-body);font-size:13px;line-height:21px}\n    .invoice-anno-panel p{margin:0 0 8px}\n    .invoice-anno-panel p:last-child{margin-bottom:0}\n    .invoice-table .row-attention td:first-child{box-shadow:inset 3px 0 0 var(--invoice-warning)}\n    .invoice-module [hidden]{display:none!important}\n    .invoice-module .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}\n    .invoice-module .text-danger{color:var(--invoice-danger)}\n    .invoice-module .text-success{color:#087E40}\n    .invoice-module .text-info{color:#006B9E}\n    .invoice-overlay:not([hidden])~.invoice-anno-toggle,.invoice-dialog-overlay:not([hidden])~.invoice-anno-toggle{display:none}\n    .invoice-view{container:invoice-view / inline-size}\n    .invoice-section-actions{display:flex;justify-content:flex-end;align-items:center;margin:0 0 12px}\n    .invoice-section-actions.is-leading{justify-content:flex-start}\n    .invoice-list-header{display:flex;align-items:center;justify-content:flex-start;gap:8px;margin:0 0 12px}\n    .invoice-list-header.has-actions{justify-content:space-between;gap:12px}\n    .invoice-list-heading{display:flex;align-items:center;gap:8px;min-width:0}\n    .invoice-list-title{margin:0;color:var(--invoice-ink);font-size:16px;line-height:24px;font-weight:600}\n    .invoice-list-total{color:var(--invoice-muted);font-size:12px;line-height:20px;white-space:nowrap}\n    .invoice-list-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 16px;padding-top:12px;border-top:1px solid var(--invoice-line-light)}\n    .invoice-list-actions{display:flex;align-items:center;gap:8px;flex:none}\n    .invoice-document-summary{padding-top:12px;border-top:1px solid var(--invoice-line-light)}\n    .invoice-document-summary .invoice-kpi-grid{margin:0 0 16px}\n    .invoice-document-summary.is-after-divider{padding-top:0;border-top:0}\n    .invoice-list-divider{margin:0 0 16px;padding-top:12px;border-top:1px solid var(--invoice-line-light)}\n    .invoice-list-divider.is-kpi-compact{padding-top:0}\n    .invoice-list-toolbar.is-actions-only{justify-content:flex-end}\n    .invoice-config-filter{display:flex;flex-direction:column;gap:0}\n    .invoice-config-top{margin-bottom:16px}\n    .invoice-main.is-config-view{padding-bottom:16px}\n    .invoice-config-page{display:flex;min-height:calc(100vh - 56px - 32px);flex-direction:column}\n    .invoice-config-workspace{display:grid;grid-template-columns:300px minmax(0,1fr);gap:0;align-items:stretch;flex:1;min-height:0}\n    .invoice-config-workspace>.invoice-block+.invoice-block{margin-top:0}\n    .invoice-config-nav,.invoice-config-list{min-width:0;height:100%}\n    .invoice-config-nav{min-height:100%;padding:16px;border-radius:8px 0 0 8px;border-right:1px solid var(--invoice-line-light)}\n    .invoice-config-list{border-radius:0 8px 8px 0}\n    .invoice-config-tabs{display:flex;flex-direction:column;gap:4px;margin:0}\n    .invoice-config-tabs .invoice-config-tab{width:100%;height:38px;padding:0 12px;text-align:left}\n    .invoice-config-tabs .invoice-config-tab.is-active{box-shadow:inset 3px 0 0 var(--invoice-blue)}\n    .invoice-config-list .invoice-list-header{margin-bottom:0}\n    .invoice-config-list .invoice-list-divider{margin-top:12px}\n    .invoice-detail-state-panel{margin:0 0 18px;padding:12px 0;border:0;border-radius:6px;background:var(--invoice-page)}\n    .invoice-detail-state-panel .invoice-detail-states{gap:0;margin:0}\n    .invoice-detail-state-panel .invoice-detail-state{min-width:0;padding:2px 16px;border:0;border-right:1px solid var(--invoice-line);border-radius:0;background:transparent}\n    .invoice-detail-state-panel .invoice-detail-state:last-child{border-right:0}\n    .invoice-table .amount,.invoice-table .mono,.invoice-table[aria-label=\"开票申请列表\"] td:nth-child(2),.invoice-table[aria-label=\"票据列表\"] td:first-child,.invoice-table[aria-label=\"红冲任务列表\"] td:first-child,.invoice-table[aria-label=\"红冲任务列表\"] td:nth-child(3),.invoice-table[aria-label=\"更正申请列表\"] td:first-child{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}\n    .invoice-page-nav{display:flex;align-items:center;gap:4px}\n    .invoice-page-ellipsis{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;color:var(--invoice-muted);font-size:13px}\n    .invoice-page-size-control{display:inline-flex;align-items:center;gap:5px;white-space:nowrap}\n    .invoice-page-select-wrap{position:relative;display:inline-flex;align-items:center}\n    .invoice-page-size-select{width:auto;min-width:84px;height:30px;padding:0 8px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-body);font:inherit;outline:none;cursor:pointer}\n    .invoice-page-size-select:focus{border-color:var(--invoice-blue);box-shadow:0 0 0 2px rgba(0,102,255,.12)}\n    .invoice-page-size-select:disabled{cursor:not-allowed;background:var(--invoice-page);color:var(--invoice-muted)}\n    .invoice-page-meta{display:flex;align-items:center;gap:12px;white-space:nowrap}\n    .invoice-page-jump{display:inline-flex;align-items:center;gap:6px;color:var(--invoice-body)}\n    .invoice-page-jump-input{width:44px;height:30px;padding:0;text-align:center;border:1px solid var(--invoice-line);border-radius:4px;color:var(--invoice-body);font:12px inherit;outline:none}\n    .invoice-page-jump-input:focus{border-color:var(--invoice-blue);box-shadow:0 0 0 2px rgba(0,102,255,.12)}\n    .invoice-page-jump-input:disabled{background:var(--invoice-page);color:var(--invoice-muted)}\n    .invoice-page-stats{color:var(--invoice-muted);white-space:nowrap}\n    .invoice-date-range{position:relative;z-index:2;display:flex;align-items:center;gap:0;width:300px;max-width:100%;height:32px;padding:0 10px 0 12px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-body);outline:none;cursor:pointer;transition:border-color .15s,box-shadow .15s}\n    .invoice-date-range:hover{background:var(--invoice-hover)}\n    .invoice-date-range:focus-within,.invoice-date-range.is-open{z-index:70;border-color:var(--invoice-blue);box-shadow:0 0 0 2px rgba(0,102,255,.12)}\n    .invoice-date-range>svg{width:16px;height:16px;flex:none;margin-left:8px;color:var(--invoice-muted)}\n    .invoice-date-input{min-width:0;width:0;flex:1;height:30px;padding:0;border:0;background:transparent;color:var(--invoice-body);font:inherit;font-size:13px;text-align:left;outline:none;cursor:pointer;caret-color:transparent}\n    .invoice-date-input:not(:placeholder-shown){font-family:'JetBrains Mono',monospace;font-size:12px}\n    .invoice-date-input::placeholder{color:var(--invoice-muted);font-size:13px}\n    .invoice-date-sep{flex:none;margin:0 6px;color:var(--invoice-muted);font-size:14px;line-height:30px}\n    .invoice-date-picker{position:absolute;top:calc(100% + 8px);left:0;z-index:80;display:none;width:620px;max-width:calc(100vw - 32px);padding:16px;border:1px solid var(--invoice-line);border-radius:8px;background:#fff;box-shadow:0 6px 24px rgba(0,0,0,.12);cursor:default}\n    .invoice-date-range.is-open .invoice-date-picker{display:block}\n    .invoice-date-picker-months{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}\n    .invoice-calendar-month{min-width:0;padding:0 14px 2px}\n    .invoice-calendar-month+.invoice-calendar-month{border-left:1px solid var(--invoice-line-light)}\n    .invoice-calendar-heading{display:grid;grid-template-columns:60px minmax(0,1fr) 60px;align-items:center;min-height:32px;margin-bottom:8px}\n    .invoice-calendar-title{text-align:center;color:var(--invoice-ink);font-size:14px;font-weight:600;letter-spacing:0}\n    .invoice-calendar-nav-group{display:flex;align-items:center;gap:2px}\n    .invoice-calendar-nav-group.is-end{justify-content:flex-end}\n    .invoice-calendar-nav{display:inline-grid;width:28px;height:28px;place-items:center;padding:0;border:0;border-radius:4px;background:transparent;color:var(--invoice-sub);cursor:pointer}\n    .invoice-calendar-nav:hover{background:var(--invoice-hover);color:var(--invoice-blue)}\n    .invoice-calendar-nav:focus-visible,.invoice-calendar-day:focus-visible{outline:2px solid var(--invoice-blue);outline-offset:1px}\n    .invoice-calendar-nav svg{width:15px;height:15px}\n    .invoice-calendar-nav-spacer{width:60px;height:28px}\n    .invoice-calendar-week,.invoice-calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr))}\n    .invoice-calendar-week{margin-bottom:3px;color:var(--invoice-muted);font-size:12px;text-align:center}\n    .invoice-calendar-week span{height:26px;line-height:26px}\n    .invoice-calendar-grid{gap:0;justify-items:center}\n    .invoice-calendar-day{position:relative;width:30px;height:30px;padding:0;border:1px solid transparent;border-radius:4px;background:transparent;color:var(--invoice-body);font:12px/30px 'JetBrains Mono',monospace;cursor:pointer}\n    .invoice-calendar-day:hover{border-color:var(--invoice-blue);background:#E6F0FF;color:var(--invoice-blue)}\n    .invoice-calendar-day.is-muted{color:#C7CAD1}\n    .invoice-calendar-day.is-today{border-color:var(--invoice-blue);color:var(--invoice-blue);font-weight:600}\n    .invoice-calendar-day.is-in-range{border-radius:0;background:#E6F0FF;color:var(--invoice-blue)}\n    .invoice-calendar-day.is-start,.invoice-calendar-day.is-end{z-index:1;border-color:var(--invoice-blue);border-radius:4px;background:var(--invoice-blue);color:#fff;font-weight:600}\n    .invoice-date-picker-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:45px;margin-top:16px;padding:12px 0 0;border-top:1px solid var(--invoice-line-light)}\n    .invoice-date-picker-hint{color:var(--invoice-muted);font-size:12px;line-height:18px}\n    .invoice-date-picker-actions{display:flex;align-items:center;gap:8px}\n    .invoice-date-picker-action{height:28px;padding:0 10px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-body);font:inherit;font-size:12px;cursor:pointer}\n    .invoice-date-picker-action:hover{border-color:#B8D2FF;color:var(--invoice-blue)}\n    .invoice-date-picker-action.is-primary{border-color:var(--invoice-blue);background:var(--invoice-blue);color:#fff}\n    .invoice-date-picker-action.is-primary:hover{background:var(--invoice-blue-hover)}\n    .invoice-th-with-help{display:inline-flex;align-items:center;gap:5px}\n    .invoice-status-help{position:relative;display:inline-flex;align-items:center}\n    .invoice-status-help>button{display:inline-grid;width:14px;height:14px;place-items:center;padding:0;border:1px solid var(--invoice-muted);border-radius:50%;background:transparent;color:var(--invoice-muted);font:600 9px/12px Arial,sans-serif;cursor:help}\n    .invoice-status-help>button:hover,.invoice-status-help>button:focus-visible{border-color:var(--invoice-blue);color:var(--invoice-blue);outline:none}\n    .invoice-status-help-popover{position:fixed;top:auto;left:auto;z-index:160;display:flex;visibility:hidden;flex-direction:column;gap:5px;width:292px;max-width:calc(100vw - 16px);padding:10px 12px;border:1px solid var(--invoice-line);border-radius:5px;background:#fff;box-shadow:0 5px 16px rgba(26,29,36,.14);color:var(--invoice-body);font-size:12px;font-weight:400;line-height:18px;opacity:0;pointer-events:none;transition:opacity .12s,visibility .12s}\n    .invoice-status-help-popover strong{color:var(--invoice-ink);font-size:12px;font-weight:600}\n    .invoice-status-help-popover span{display:block;white-space:normal}\n    .invoice-status-help:hover .invoice-status-help-popover,.invoice-status-help:focus-within .invoice-status-help-popover,.invoice-status-help[data-open=\"true\"] .invoice-status-help-popover{visibility:visible;opacity:1;pointer-events:auto}\n    .invoice-status-help[data-open=\"false\"] .invoice-status-help-popover{visibility:hidden!important;opacity:0!important;pointer-events:none!important}\n    .invoice-status-help[data-dismissed=\"true\"] .invoice-status-help-popover{visibility:hidden!important;opacity:0!important;pointer-events:none!important}\n    @container invoice-view (max-width:1100px){\n    .invoice-kpi-grid{grid-template-columns:repeat(3,minmax(0,1fr))}\n    }\n    @container invoice-view (max-width:760px){\n    .invoice-context-actions{margin-left:0;padding-left:0;border-left:0}\n    .invoice-kpi-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}\n    .invoice-kpi:last-child:nth-child(odd){grid-column:1 / -1;width:calc((100% - 8px)/2);justify-self:center}\n    }\n    @container invoice-view (max-width:420px){\n    .invoice-filter-item{width:100%;flex-basis:100%}\n    .invoice-filter-item .invoice-control{width:auto;min-width:0;flex:1}\n    .invoice-filter-item .invoice-date-range{width:auto;min-width:0;flex:1}\n    }\n    @container invoice-view (max-width:760px){\n    .invoice-config-workspace{grid-template-columns:1fr;flex:none}\n    .invoice-config-nav{padding:12px}\n    .invoice-config-nav,.invoice-config-list{height:auto}\n    .invoice-config-nav{border-right:0;border-radius:8px 8px 0 0;border-bottom:1px solid var(--invoice-line-light)}\n    .invoice-config-list{border-radius:0 0 8px 8px}\n    .invoice-config-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px}\n    }\n    @media(max-width:720px){\n    .invoice-primary-tab{padding:0 11px;font-size:13px}\n    .invoice-block{padding:16px 12px}\n    .invoice-kpi{min-height:70px;padding:10px}\n    .invoice-kpi-value{font-size:17px}\n    .invoice-detail-state-panel .invoice-detail-states{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:12px}\n    .invoice-detail-state-panel .invoice-detail-state:nth-child(2){border-right:0}\n    .invoice-detail-grid{grid-template-columns:1fr}\n    .invoice-drawer-header,.invoice-drawer-body,.invoice-drawer-footer{padding-left:16px;padding-right:16px}\n    .invoice-paper{padding:24px 18px}\n    .invoice-paper-meta{display:block}\n    .invoice-paper-meta span{display:block;margin-top:4px}\n    .invoice-pagination{justify-content:flex-start}\n    .invoice-page-meta{flex-wrap:wrap;white-space:normal}\n    .invoice-anno-toggle{right:6px;top:104px;width:32px;padding:0;justify-content:center;border-radius:50%}\n    .invoice-anno-toggle span{display:none}\n    }\n    @media(max-width:520px){\n    .invoice-filter-actions,.invoice-context-actions{width:100%}\n    .invoice-list-toolbar{align-items:flex-start;flex-direction:column}\n    .invoice-list-actions{width:100%;justify-content:flex-end}\n    .invoice-list-header.has-actions{align-items:flex-start;flex-direction:column;gap:10px}\n    .invoice-list-header.has-actions .invoice-list-heading{width:100%;flex:none}\n    .invoice-list-header.has-actions .invoice-list-actions{width:100%;justify-content:flex-end}\n    .invoice-drawer-footer{align-items:stretch;flex-direction:column}\n    .invoice-drawer-footer .invoice-head-actions{justify-content:flex-end}\n    .invoice-paper-line{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}\n    .invoice-paper-line span:nth-child(2n){border-right:0}\n    .invoice-pagination{align-items:flex-start;flex-direction:column}\n    .invoice-page-meta{gap:8px}\n    }\n    @media(max-width:480px){\n    .invoice-date-picker{right:0;left:auto;width:calc(100vw - 32px)}\n    .invoice-date-picker-months{grid-template-columns:1fr}\n    .invoice-calendar-month+.invoice-calendar-month{margin-top:16px;padding-top:16px;border-top:1px solid var(--invoice-line-light);border-left:0}\n    }\n    @media(prefers-reduced-motion:reduce){.invoice-toast{animation:none}}\n\n    /* Figma invoice-management surface */\n    .invoice-module .invoice-main{padding:0 16px 24px;background:var(--invoice-page)}\n    .invoice-design-page{min-height:calc(100vh - 56px)}\n    .invoice-design-primary-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:58px}\n    .invoice-design-primary-tabs{flex:1;min-width:0;margin:0;border-bottom:1px solid var(--invoice-line-light);gap:28px;overflow-x:auto}\n    .invoice-design-primary-tabs .invoice-primary-tab{min-height:58px;padding:0 4px;font-size:14px}\n    .invoice-design-primary-tabs .invoice-primary-tab:hover{background:transparent}\n    .invoice-design-primary-actions{display:flex;align-items:center;gap:8px;flex:none}\n    .invoice-design-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;padding:12px 0 16px}\n    .invoice-design-summary-item{display:flex;align-items:center;gap:12px;min-height:54px;padding:10px 16px;background:var(--invoice-page)}\n    .invoice-design-summary-mark{display:inline-flex;min-width:48px;height:24px;align-items:center;justify-content:center;border-radius:4px;font-size:12px;font-weight:600}\n    .invoice-design-summary-mark.is-blue{background:#e6f0ff;color:#0066ff}\n    .invoice-design-summary-mark.is-cyan{background:#e4f4fb;color:#006b9e}\n    .invoice-design-summary-mark.is-green{background:#e7f9f0;color:#087e40}\n    .invoice-design-summary-mark.is-orange{background:#fdf2e9;color:#a84d16}\n    .invoice-design-summary-copy{min-width:0}\n    .invoice-design-summary-title{color:var(--invoice-ink);font-size:13px;font-weight:600;line-height:18px}\n    .invoice-design-summary-note{margin-top:2px;color:var(--invoice-sub);font-size:11px;line-height:16px;white-space:nowrap}\n    .invoice-design-workspace{min-height:calc(100vh - 56px - 58px - 82px);padding:20px;border-radius:8px;background:#fff}\n    .invoice-design-status-row{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:16px}\n    .invoice-design-status-tabs{display:flex;align-items:center;gap:4px;min-width:0;overflow-x:auto;scrollbar-width:none}\n    .invoice-design-status-tabs::-webkit-scrollbar{display:none}\n    .invoice-design-status-tab{height:30px;padding:0 16px;border:0;border-radius:4px;background:transparent;color:var(--invoice-sub);font:inherit;font-size:13px;line-height:30px;white-space:nowrap;cursor:pointer}\n    .invoice-design-status-tab:hover{background:var(--invoice-hover);color:var(--invoice-body)}\n    .invoice-design-status-tab.is-active{background:#e6f0ff;color:var(--invoice-blue);font-weight:600}\n    .invoice-design-filter-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:36px;row-gap:10px;max-width:1080px}\n    .invoice-design-filter-item{display:grid;grid-template-columns:80px minmax(0,1fr);align-items:center;gap:12px;min-width:0}\n    .invoice-design-filter-item>label{color:var(--invoice-body);font-size:13px;line-height:18px;text-align:right;white-space:nowrap}\n    .invoice-design-filter-item>label::after{content:'：'}\n    .invoice-design-control{width:100%;max-width:400px;height:32px;padding:0 10px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-body);font:inherit;font-size:13px;outline:none}\n    .invoice-design-control:focus{border-color:var(--invoice-blue);box-shadow:0 0 0 2px rgba(0,102,255,.12)}\n    .invoice-design-control::placeholder{color:var(--invoice-muted)}\n    .invoice-design-filter-actions{display:flex;align-items:center;gap:12px;margin:10px 0 16px 92px}\n    .invoice-design-date-field{position:relative;display:flex;align-items:center;max-width:400px;height:32px;padding:0 10px;border:1px solid var(--invoice-line);border-radius:4px;background:#fff;color:var(--invoice-muted);cursor:pointer}\n    .invoice-design-date-field:hover{background:var(--invoice-hover)}\n    .invoice-design-date-field .invoice-date-input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}\n    .invoice-design-date-label{overflow:hidden;flex:1;text-overflow:ellipsis;white-space:nowrap;font-size:13px}\n    .invoice-design-date-field>svg{width:16px;height:16px;color:var(--invoice-muted)}\n    .invoice-design-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:12px 0}\n    .invoice-design-kpi{min-width:0;min-height:76px;padding:11px 12px;border:1px solid var(--invoice-line-light);border-radius:6px;background:var(--invoice-page)}\n    .invoice-design-kpi-label{color:var(--invoice-sub);font-size:12px;line-height:18px}\n    .invoice-design-kpi-value{margin-top:4px;color:var(--invoice-ink);font:600 20px/26px 'JetBrains Mono',monospace;font-variant-numeric:tabular-nums;white-space:nowrap}\n    .invoice-design-kpi-value.is-green{color:#087e40}\n    .invoice-design-kpi-value.is-blue{color:#006b9e}\n    .invoice-design-kpi-value.is-orange{color:#a84d16}\n    .invoice-design-kpi-value.is-red{color:#af0017}\n    .invoice-design-kpi-note{margin-top:1px;color:var(--invoice-muted);font-size:11px;line-height:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n    .invoice-design-table-wrap{width:100%;overflow-x:auto;border-top:0}\n    .invoice-design-table{width:100%;min-width:0!important;table-layout:fixed}\n    .invoice-design-table th{height:40px;padding:0 12px;background:#f0f1f3;color:var(--invoice-sub);font-size:12px;font-weight:600;white-space:nowrap}\n    .invoice-design-table td{height:48px;padding:8px 12px;border-bottom:1px solid var(--invoice-line-light);font-size:12px;line-height:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n    .invoice-design-table tbody tr:last-child td{border-bottom:1px solid var(--invoice-line-light)}\n    .invoice-design-table tbody tr:hover{background:var(--invoice-hover)}\n    .invoice-design-table .invoice-btn-link{font-size:12px}\n    .invoice-design-table .invoice-design-primary-cell{color:var(--invoice-ink);font-weight:600}\n    .invoice-design-table .invoice-design-secondary{display:block;margin-top:1px;color:var(--invoice-muted);font-size:11px;line-height:15px}\n    .invoice-design-table .invoice-design-progress{color:var(--invoice-body);font-size:12px}\n    .invoice-design-table .invoice-design-actions{display:flex;align-items:center;gap:8px;overflow:visible}\n    .invoice-design-table .invoice-design-actions .invoice-btn-link{white-space:nowrap}\n    .invoice-design-table.invoice-design-app-table th:nth-child(1){width:17%}\n    .invoice-design-table.invoice-design-app-table th:nth-child(2){width:14%}\n    .invoice-design-table.invoice-design-app-table th:nth-child(3){width:10%}\n    .invoice-design-table.invoice-design-app-table th:nth-child(4){width:11%}\n    .invoice-design-table.invoice-design-app-table th:nth-child(5){width:11%}\n    .invoice-design-table.invoice-design-app-table th:nth-child(6){width:22%}\n    .invoice-design-table.invoice-design-app-table th:nth-child(7){width:11%}\n    .invoice-design-table.invoice-design-app-table th:nth-child(8){width:12%}\n    .invoice-design-table.invoice-design-doc-table th:nth-child(1){width:18%}\n    .invoice-design-table.invoice-design-doc-table th:nth-child(2){width:16%}\n    .invoice-design-table.invoice-design-doc-table th:nth-child(3){width:14%}\n    .invoice-design-table.invoice-design-doc-table th:nth-child(4){width:12%}\n    .invoice-design-table.invoice-design-doc-table th:nth-child(5){width:12%}\n    .invoice-design-table.invoice-design-doc-table th:nth-child(6){width:13%}\n    .invoice-design-table.invoice-design-doc-table th:nth-child(7){width:12%}\n    .invoice-design-table.invoice-design-doc-table th:nth-child(8){width:13%}\n    .invoice-design-table.invoice-design-red-table th:nth-child(1){width:17%}\n    .invoice-design-table.invoice-design-red-table th:nth-child(2){width:15%}\n    .invoice-design-table.invoice-design-red-table th:nth-child(3){width:16%}\n    .invoice-design-table.invoice-design-red-table th:nth-child(4){width:12%}\n    .invoice-design-table.invoice-design-red-table th:nth-child(5){width:13%}\n    .invoice-design-table.invoice-design-red-table th:nth-child(6){width:13%}\n    .invoice-design-table.invoice-design-red-table th:nth-child(7){width:10%}\n    .invoice-design-table.invoice-design-red-table th:nth-child(8){width:14%}\n    .invoice-design-table.invoice-design-config-table th:nth-child(1){width:22%}\n    .invoice-design-table.invoice-design-config-table th:nth-child(2){width:18%}\n    .invoice-design-table.invoice-design-config-table th:nth-child(3){width:15%}\n    .invoice-design-table.invoice-design-config-table th:nth-child(4){width:12%}\n    .invoice-design-table.invoice-design-config-table th:nth-child(5){width:12%}\n    .invoice-design-table.invoice-design-config-table th:nth-child(6){width:16%}\n    .invoice-design-table.invoice-design-config-table th:nth-child(7){width:15%}\n    .invoice-design-pagination{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:16px;padding-top:20px;color:var(--invoice-sub);font-size:12px}\n    .invoice-design-pagination .invoice-page-nav{display:flex;align-items:center;gap:4px}\n    .invoice-design-subtabs{display:flex;align-items:center;gap:4px;margin-bottom:16px}\n    .invoice-design-subtab{height:30px;padding:0 16px;border:0;border-radius:4px;background:transparent;color:var(--invoice-sub);font:inherit;font-size:13px;cursor:pointer}\n    .invoice-design-subtab.is-active{background:#e6f0ff;color:var(--invoice-blue);font-weight:600}\n    .invoice-design-callout{display:flex;align-items:flex-start;gap:10px;margin:0 0 14px;padding:10px 12px;border:1px solid #c8e7f3;border-radius:4px;background:#f4fbfe;color:#006b9e;font-size:12px;line-height:18px}\n    .invoice-design-callout strong{font-weight:600}\n    .invoice-design-config-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}\n    .invoice-design-config-toolbar h2{margin:0;color:var(--invoice-ink);font-size:16px;line-height:24px;font-weight:600}\n    .invoice-design-config-toolbar p{margin:2px 0 0;color:var(--invoice-muted);font-size:12px}\n    .invoice-drawer{width:800px}\n    .invoice-dialog{display:flex;flex-direction:column;overflow:hidden}\n    .invoice-dialog-body{flex:1;min-height:0;overflow:auto}\n    .invoice-dialog-footer{flex-direction:row-reverse}\n    .invoice-dialog-body{padding:24px}\n    .invoice-dialog.invoice-dialog-confirm{width:600px;height:250px;max-height:calc(100vh - 32px)}\n    .invoice-dialog.invoice-dialog-wide{width:760px}\n    .invoice-toast{width:400px;min-height:48px;border-left:4px solid var(--invoice-blue);border-radius:4px;padding:12px 14px;box-shadow:0 4px 16px rgba(26,29,36,.14)}\n    .invoice-toast.is-success{border-left-color:var(--invoice-success)}\n    .invoice-toast.is-warning{border-left-color:var(--invoice-warning)}\n    .invoice-toast.is-danger{border-left-color:var(--invoice-danger)}\n    @media(max-width:900px){\n      .invoice-design-summary{grid-template-columns:repeat(2,minmax(0,1fr))}\n      .invoice-design-filter-grid{grid-template-columns:1fr;max-width:none}\n      .invoice-design-filter-actions{margin-left:0}\n      .invoice-design-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}\n      .invoice-design-workspace{padding:16px 12px}\n      .invoice-design-primary-bar{align-items:flex-start;flex-direction:column;gap:0}\n      .invoice-design-primary-actions{width:100%;justify-content:flex-end;padding:8px 0}\n      .invoice-design-primary-tabs{width:100%}\n      .invoice-design-table{min-width:920px!important;table-layout:auto}\n    }\n    @media(max-width:520px){\n      .invoice-module .invoice-main{padding-inline:12px}\n      .invoice-design-summary{grid-template-columns:1fr;gap:8px}\n      .invoice-design-kpis{grid-template-columns:1fr 1fr;gap:8px}\n      .invoice-design-kpi-value{font-size:17px}\n      .invoice-design-status-row{align-items:flex-start;flex-direction:column}\n      .invoice-design-primary-actions{justify-content:flex-start}\n      .invoice-toast{width:min(400px,calc(100vw - 32px))}\n    }\n    @media(max-width:720px){\n      .invoice-dialog.invoice-dialog-wide,.invoice-dialog.invoice-dialog-confirm,.invoice-preview{width:calc(100vw - 32px);max-width:calc(100vw - 32px)}\n      .invoice-dialog-body{padding:20px 16px}\n      .invoice-dialog-footer{padding:12px 16px;flex-wrap:wrap}\n    }\n  ",
    "\n/* 发票申请详情抽屉与费用管理订单详情抽屉保持同一结构基线。 */\n.invoice-module .invoice-overlay {\n  align-items: stretch;\n  justify-content: flex-end;\n  padding: 0;\n  background: rgba(0, 0, 0, .3);\n}\n\n.invoice-module .invoice-drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  width: 800px;\n  max-width: 100vw;\n  height: 100%;\n  background: #fff;\n  display: flex;\n  flex-direction: column;\n  box-shadow: -4px 0 24px rgba(0, 0, 0, .1);\n  animation: invoice-drawer-in .22s ease;\n  outline: none;\n}\n\n.invoice-module .invoice-drawer-header {\n  width: 100%;\n  height: 56px;\n  flex: 0 0 56px;\n  padding: 0 24px;\n  border-bottom: 0;\n  background: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.invoice-module .invoice-drawer-kicker { display: none; }\n.invoice-module .invoice-drawer-header h2 {\n  margin: 0;\n  color: var(--invoice-ink);\n  font-size: 16px;\n  line-height: 22px;\n  font-weight: 600;\n}\n.invoice-module .invoice-drawer-header p {\n  display: none;\n}\n\n.invoice-module .invoice-drawer-body {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 16px;\n  background: var(--invoice-page);\n}\n\n.invoice-module .invoice-drawer-footer {\n  height: 64px;\n  flex: 0 0 64px;\n  padding: 0 24px;\n  border-top: 1px solid var(--invoice-line-light);\n  background: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.invoice-module .invoice-detail-section {\n  padding: 16px;\n  margin: 0 0 16px;\n  border: 0;\n  border-radius: 8px;\n  background: #fff;\n}\n.invoice-module .invoice-detail-section:last-child { margin-bottom: 0; }\n.invoice-module .invoice-detail-section h3 {\n  margin: 0 0 16px;\n  color: var(--invoice-ink);\n  font-size: 16px;\n  line-height: 22px;\n  font-weight: 600;\n}\n\n.invoice-module .invoice-detail-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  column-gap: 24px;\n  row-gap: 12px;\n  border: 0;\n}\n.invoice-module .invoice-detail-field {\n  display: grid;\n  grid-template-columns: 96px minmax(0, 1fr);\n  gap: 10px;\n  align-items: start;\n  min-height: 0;\n  border: 0;\n  font-size: 12px;\n  line-height: 18px;\n}\n.invoice-module .invoice-detail-field dt {\n  padding: 0;\n  background: transparent;\n  color: var(--invoice-sub);\n  text-align: right;\n  white-space: nowrap;\n}\n.invoice-module .invoice-detail-field dt::after { content: '：'; }\n.invoice-module .invoice-detail-field dd {\n  margin: 0;\n  padding: 0;\n  color: var(--invoice-body);\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n\n.invoice-module .invoice-detail-section .invoice-table {\n  min-width: 1080px;\n  width: 100%;\n  font-size: 12px;\n}\n.invoice-module .invoice-detail-section .invoice-table th {\n  padding: 9px 10px;\n  background: #F0F1F3;\n  color: var(--invoice-sub);\n  font-size: 12px;\n  font-weight: 500;\n  border-bottom: 1px solid var(--invoice-line);\n}\n.invoice-module .invoice-detail-section .invoice-table td {\n  padding: 10px;\n  border-bottom: 1px solid #F0F1F3;\n  font-size: 12px;\n}\n.invoice-module .invoice-detail-section .invoice-table tbody tr:hover { background: var(--invoice-hover); }\n\n.invoice-module .invoice-detail-head {\n  margin: 0;\n  padding: 16px 16px 12px;\n  border-radius: 8px 8px 0 0;\n  background: #fff;\n}\n.invoice-module .invoice-detail-state-panel {\n  margin: 0;\n  padding: 0 16px 12px;\n  border-radius: 0;\n  background: #fff;\n}\n.invoice-module .invoice-detail-tabs {\n  margin: 0 0 16px;\n  padding: 0 16px;\n  border-radius: 0 0 8px 8px;\n  background: #fff;\n}\n\n@keyframes invoice-drawer-in {\n  from { transform: translateX(100%); }\n  to { transform: translateX(0); }\n}\n\n@media (max-width: 767px) {\n  .invoice-module .invoice-drawer { width: 100%; max-width: 100%; }\n  .invoice-module .invoice-drawer-header { padding: 0 16px; }\n  .invoice-module .invoice-drawer-body { padding: 16px; }\n  .invoice-module .invoice-detail-grid { grid-template-columns: 1fr; }\n  .invoice-module .invoice-drawer-footer { padding: 0 16px; }\n}\n\n@media (max-width: 520px) {\n  .invoice-module .invoice-drawer-footer {\n    height: auto;\n    min-height: 64px;\n    padding: 12px 16px;\n    flex-wrap: wrap;\n    flex-direction: row;\n    align-items: center;\n  }\n  .invoice-module .invoice-drawer-footer-note { flex: 1 1 100%; }\n  .invoice-module .invoice-drawer-footer .invoice-head-actions { margin-left: auto; }\n}\n",
    "\n/* 发票管理四个主 Tab 共用 16px 内容安全边距。 */\n.invoice-module .invoice-main {\n  padding: 16px;\n}\n\n/* 弹窗底部统一使用纯文字按钮：取消在左，核心操作在右，整组居右。 */\n.invoice-module #invoiceDialog .invoice-dialog-footer {\n  justify-content: flex-end;\n  flex-direction: row;\n  gap: 12px;\n  padding: 16px 24px;\n}\n\n.invoice-module #invoiceDialog .invoice-dialog-footer [data-lucide],\n.invoice-module #invoiceDialog .invoice-dialog-footer .lucide {\n  display: none !important;\n}\n\n.invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] .invoice-dialog {\n  width: 760px;\n  max-width: 92vw;\n}\n\n.invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] .invoice-dialog-header {\n  padding: 16px 24px;\n}\n\n.invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] .invoice-dialog-body {\n  display: grid;\n  grid-template-columns: 90px minmax(0, 400px);\n  justify-content: center;\n  align-items: start;\n  column-gap: 12px;\n  row-gap: 8px;\n  padding: 32px 24px;\n}\n\n.invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] .invoice-dialog-copy {\n  grid-column: 1 / -1;\n  margin: 0 0 12px;\n}\n\n.invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] label[for=\"retryReason\"] {\n  grid-column: 1;\n  margin: 0;\n  padding-top: 6px;\n  text-align: right;\n}\n\n.invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] label[for=\"retryReason\"]::after {\n  content: '：';\n}\n\n.invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] #retryReason {\n  grid-column: 2;\n  width: 400px;\n  max-width: 100%;\n  margin: 0;\n}\n\n.invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] #dialogError {\n  grid-column: 2;\n  margin-top: 0;\n}\n\n.invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] .invoice-dialog-footer {\n  padding: 16px 24px;\n}\n\n@media (max-width: 620px) {\n  .invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] .invoice-dialog-body {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 20px 16px;\n  }\n\n  .invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] .invoice-dialog-copy,\n  .invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] label[for=\"retryReason\"],\n  .invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] #retryReason,\n  .invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] #dialogError {\n    grid-column: 1;\n  }\n\n  .invoice-module #invoiceDialog[data-dialog-type=\"red-retry\"] label[for=\"retryReason\"] {\n    padding-top: 0;\n    text-align: left;\n  }\n}\n\n/* 开票配置的提示、分类导航与结果列表共用一个业务区块。 */\n.invoice-module .invoice-config-page.invoice-config-shell {\n  width: 100%;\n  min-height: calc(100vh - 56px - 32px);\n  margin: 0;\n  padding: 20px;\n  background: var(--invoice-card);\n  border: 0;\n  border-radius: 8px;\n}\n\n.invoice-module .invoice-config-shell > .invoice-config-top {\n  margin: 0 0 16px;\n  padding: 0;\n  background: transparent;\n  border: 0;\n}\n\n.invoice-module .invoice-config-shell .invoice-config-workspace {\n  flex: 1;\n  min-height: 0;\n}\n\n.invoice-module .invoice-config-shell .invoice-config-nav,\n.invoice-module .invoice-config-shell .invoice-config-list {\n  height: 100%;\n  min-height: 0;\n  background: transparent;\n  border-radius: 0;\n}\n\n.invoice-module .invoice-config-shell .invoice-config-nav {\n  padding: 0 16px 0 0;\n  border-right: 1px solid var(--invoice-line-light);\n}\n\n.invoice-module .invoice-config-shell .invoice-config-list {\n  padding: 0 0 0 20px;\n}\n\n/* 选择列与右侧第一个业务字段保持 20px 的统一阅读间距。 */\n.invoice-module .invoice-table .invoice-selection-cell {\n  width: 27px;\n  padding-right: 0 !important;\n}\n\n.invoice-module .invoice-table .invoice-selection-cell + th,\n.invoice-module .invoice-table .invoice-selection-cell + td,\n.invoice-module .invoice-table .invoice-first-field-cell {\n  padding-left: 20px !important;\n}\n\n@container invoice-view (max-width: 760px) {\n  .invoice-module .invoice-config-shell .invoice-config-workspace {\n    grid-template-columns: 1fr;\n    flex: none;\n  }\n\n  .invoice-module .invoice-config-shell .invoice-config-nav {\n    height: auto;\n    padding: 0 0 16px;\n    border-right: 0;\n    border-bottom: 1px solid var(--invoice-line-light);\n  }\n\n  .invoice-module .invoice-config-shell .invoice-config-list {\n    height: auto;\n    padding: 16px 0 0;\n  }\n}\n\n@media (max-width: 720px) {\n  .invoice-module .invoice-config-page.invoice-config-shell {\n    padding: 16px;\n  }\n\n  .invoice-module .invoice-config-shell .invoice-config-nav {\n    padding: 0 0 16px;\n    border-right: 0;\n    border-bottom: 1px solid var(--invoice-line-light);\n  }\n\n  .invoice-module .invoice-config-shell .invoice-config-list {\n    padding: 16px 0 0;\n  }\n}\n",
    "\n/* 配置编辑使用标准表单弹窗，不复用导出反馈 Dialog。 */\n.invoice-module .invoice-config-editor-dialog {\n  width: 760px;\n  max-width: 92vw;\n}\n\n.invoice-module .invoice-config-editor-dialog .invoice-dialog-body {\n  padding: 32px 24px;\n}\n\n.invoice-module .invoice-config-editor-dialog .invoice-dialog-header,\n.invoice-module .invoice-config-editor-dialog .invoice-dialog-footer {\n  padding-right: 24px;\n  padding-left: 24px;\n}\n\n.invoice-module .invoice-config-editor-form {\n  display: grid;\n  gap: 16px;\n}\n\n.invoice-module .invoice-config-editor-field {\n  display: grid;\n  grid-template-columns: 120px minmax(0, 500px);\n  align-items: start;\n  column-gap: 16px;\n  row-gap: 6px;\n}\n\n.invoice-module .invoice-config-editor-field > label:first-child {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-end;\n  padding-top: 7px;\n  color: var(--invoice-body);\n  font-size: 13px;\n  line-height: 18px;\n  text-align: right;\n}\n\n.invoice-module .invoice-config-editor-field > label:first-child::after {\n  content: '：';\n}\n\n.invoice-module .invoice-config-required {\n  margin-right: 4px;\n  color: var(--invoice-danger);\n  font-weight: 600;\n}\n\n.invoice-module .invoice-config-editor-field .invoice-control {\n  width: 500px;\n  max-width: 100%;\n}\n\n.invoice-module .invoice-config-editor-field .invoice-control.is-error {\n  border-color: var(--invoice-danger);\n  box-shadow: 0 0 0 2px rgba(217, 0, 27, .08);\n}\n\n.invoice-module .invoice-config-field-error {\n  grid-column: 2;\n  margin: 0;\n  color: var(--invoice-danger);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.invoice-module .invoice-config-editor-dialog .invoice-dialog-footer {\n  flex-direction: row;\n  justify-content: flex-end;\n  gap: 12px;\n}\n\n.invoice-module .invoice-config-editor-choice-row {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 12px 20px;\n  min-height: 32px;\n}\n\n.invoice-module .invoice-config-editor-choice {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--invoice-body);\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.invoice-module .invoice-config-editor-choice input {\n  width: 15px;\n  height: 15px;\n  accent-color: var(--invoice-blue);\n}\n\n.invoice-module .invoice-config-editor-help {\n  margin: -6px 0 0 136px;\n  color: var(--invoice-muted);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.invoice-module .invoice-action-toast {\n  position: fixed;\n  top: 18px;\n  left: 50%;\n  z-index: 140;\n  min-width: 240px;\n  max-width: min(460px, calc(100vw - 32px));\n  padding: 12px 14px;\n  transform: translateX(-50%);\n  border: 1px solid var(--invoice-line);\n  border-radius: 4px;\n  background: #fff;\n  box-shadow: 0 4px 16px rgba(26, 29, 36, .12);\n  color: var(--invoice-body);\n  font-size: 13px;\n}\n\n.invoice-module .invoice-action-toast.is-success {\n  border-color: #A9E2C3;\n}\n\n/* 红冲详情使用右侧业务详情抽屉，避免误用导出任务反馈。 */\n.invoice-module .invoice-red-detail-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  display: flex;\n  justify-content: flex-end;\n  background: rgba(0, 0, 0, .3);\n}\n\n.invoice-module .invoice-red-detail-drawer {\n  width: 800px;\n  max-width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n  box-shadow: -4px 0 24px rgba(0, 0, 0, .1);\n  outline: none;\n}\n\n.invoice-module .invoice-red-detail-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  height: 56px;\n  flex: none;\n  padding: 0 24px;\n  background: #fff;\n  border-bottom: 1px solid var(--invoice-line-light);\n}\n\n.invoice-module .invoice-red-detail-header h2 {\n  margin: 0;\n  color: var(--invoice-ink);\n  font-size: 16px;\n  line-height: 22px;\n  font-weight: 600;\n}\n\n.invoice-module .invoice-red-detail-body {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 16px;\n  background: var(--invoice-page);\n}\n\n.invoice-module .invoice-red-detail-section {\n  margin: 0 0 16px;\n  padding: 16px;\n  border: 0;\n  border-radius: 8px;\n  background: #fff;\n}\n\n.invoice-module .invoice-red-detail-section:last-child {\n  margin-bottom: 0;\n}\n\n.invoice-module .invoice-red-detail-section h3 {\n  margin: 0 0 16px;\n  color: var(--invoice-ink);\n  font-size: 16px;\n  line-height: 22px;\n  font-weight: 600;\n}\n\n.invoice-module .invoice-red-detail-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px 24px;\n}\n\n.invoice-module .invoice-red-detail-field {\n  display: grid;\n  grid-template-columns: 96px minmax(0, 1fr);\n  gap: 10px;\n  min-width: 0;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.invoice-module .invoice-red-detail-field dt {\n  color: var(--invoice-sub);\n  text-align: right;\n}\n\n.invoice-module .invoice-red-detail-field dt::after {\n  content: '：';\n}\n\n.invoice-module .invoice-red-detail-field dd {\n  min-width: 0;\n  margin: 0;\n  color: var(--invoice-body);\n  overflow-wrap: anywhere;\n}\n\n.invoice-module .invoice-red-detail-field dd.mono {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 12px;\n}\n\n.invoice-module .invoice-red-detail-footer {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  min-height: 64px;\n  flex: none;\n  padding: 0 24px;\n  border-top: 1px solid var(--invoice-line-light);\n  background: #fff;\n}\n\n@media (max-width: 720px) {\n  .invoice-module .invoice-config-editor-dialog .invoice-dialog-body {\n    padding: 20px 16px;\n  }\n\n  .invoice-module .invoice-config-editor-field {\n    grid-template-columns: 1fr;\n    gap: 6px;\n  }\n\n  .invoice-module .invoice-config-editor-field > label:first-child {\n    justify-content: flex-start;\n    padding-top: 0;\n    text-align: left;\n  }\n\n  .invoice-module .invoice-config-editor-help {\n    margin-left: 0;\n  }\n\n  .invoice-module .invoice-config-field-error {\n    grid-column: 1;\n  }\n\n  .invoice-module .invoice-red-detail-header {\n    padding: 0 16px;\n  }\n\n  .invoice-module .invoice-red-detail-body {\n    padding: 16px;\n  }\n\n  .invoice-module .invoice-red-detail-grid {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n\n  .invoice-module .invoice-red-detail-footer {\n    padding: 0 16px;\n  }\n}\n\n@media (max-width: 768px) {\n  .invoice-module .invoice-config-editor-field {\n    grid-template-columns: 1fr;\n    gap: 6px;\n  }\n\n  .invoice-module .invoice-config-editor-field > label:first-child {\n    justify-content: flex-start;\n    padding-top: 0;\n    text-align: left;\n  }\n\n  .invoice-module .invoice-config-editor-help {\n    margin-left: 0;\n  }\n\n  .invoice-module .invoice-config-field-error {\n    grid-column: 1;\n  }\n\n  .invoice-module .invoice-red-detail-grid {\n    grid-template-columns: 1fr;\n  }\n}\n",
    "\n.invoice-module .invoice-order-cell {\n  white-space: nowrap;\n}\n\n.invoice-module .invoice-order-primary {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 12px;\n}\n\n.invoice-module .invoice-order-more {\n  display: inline-flex;\n  align-items: center;\n  height: 22px;\n  margin-left: 8px;\n  padding: 0 6px;\n  border: 1px solid #B8D2FF;\n  border-radius: 4px;\n  background: var(--invoice-primary-bg, #E6F0FF);\n  color: var(--invoice-blue);\n  font: 500 11px/20px 'JetBrains Mono', monospace;\n  cursor: pointer;\n  vertical-align: middle;\n}\n\n.invoice-module .invoice-order-more:hover,\n.invoice-module .invoice-order-more[aria-expanded=\"true\"] {\n  border-color: var(--invoice-blue);\n  background: var(--invoice-blue);\n  color: #fff;\n}\n\n.invoice-module .invoice-order-more:focus-visible {\n  outline: 2px solid var(--invoice-blue);\n  outline-offset: 2px;\n}\n\n.invoice-order-popover {\n  position: fixed;\n  z-index: 150;\n  min-width: 240px;\n  max-width: min(360px, calc(100vw - 32px));\n  padding: 12px;\n  border: 1px solid var(--invoice-line);\n  border-radius: 6px;\n  background: #fff;\n  box-shadow: 0 6px 24px rgba(0, 0, 0, .12);\n  color: var(--invoice-body);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.invoice-order-popover-title {\n  margin: 0 0 8px;\n  color: var(--invoice-ink);\n  font-weight: 600;\n}\n\n.invoice-order-popover-list {\n  display: grid;\n  gap: 4px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.invoice-order-popover-list li {\n  overflow-wrap: anywhere;\n  color: var(--invoice-body);\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 11px;\n}\n",
    "\n.invoice-module .invoice-detail-head {\n  display: none !important;\n}\n\n.invoice-module .invoice-detail-state-panel {\n  margin: 0 0 16px;\n  padding: 16px;\n  border-radius: 8px;\n  background: #fff;\n}\n\n.invoice-module .invoice-detail-tab-shell {\n  overflow: hidden;\n  border-radius: 8px;\n  background: #fff;\n}\n\n.invoice-module .invoice-detail-tab-shell > .invoice-detail-tabs {\n  margin: 0;\n  padding: 0 16px;\n  border-bottom: 1px solid var(--invoice-line-light);\n  background: #fff;\n}\n\n.invoice-module .invoice-detail-tab-shell > .invoice-detail-section {\n  margin: 0;\n  border-radius: 0;\n  background: #fff;\n}\n\n.invoice-module .invoice-detail-tab-shell > .invoice-detail-section + .invoice-detail-section {\n  padding-top: 0;\n}\n\n.invoice-module .invoice-detail-empty {\n  display: flex;\n  min-height: 120px;\n  align-items: center;\n  justify-content: center;\n  color: var(--invoice-muted);\n  font-size: 13px;\n}\n\n.invoice-module .invoice-detail-order-type {\n  color: var(--invoice-sub);\n  font-size: 12px;\n}\n\n@media (max-width: 767px) {\n  .invoice-module .invoice-detail-state-panel {\n    margin-bottom: 16px;\n  }\n}\n",
    "\n.invoice-module .invoice-correction-rule-note {\n  margin: 0 0 16px;\n  padding: 11px 13px;\n  border: 1px solid #C8E7F3;\n  border-radius: 4px;\n  background: #F4FBFE;\n  color: var(--invoice-body);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.invoice-module .invoice-correction-rule-note strong {\n  color: #006B9E;\n  font-weight: 600;\n}\n\n.invoice-module .invoice-correction-scope-tabs {\n  display: flex;\n  align-items: center;\n  gap: 3px;\n  margin: 0 0 16px;\n\n}\n\n.invoice-module .invoice-correction-scope-tab-count {\n  margin-left: 4px;\n  color: inherit;\n  font: 500 12px/18px 'JetBrains Mono', monospace;\n}\n\n.invoice-module .invoice-correction-delivery-value {\n  color: var(--invoice-blue);\n  font-weight: 550;\n}\n\n.invoice-module .invoice-correction-delivery-note {\n  color: var(--invoice-muted);\n  font-size: 12px;\n}\n"
  ],
  "externalScripts": [],
  "scripts": [
    "\n    (function () {\n      var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n      if (!root) return;\n      var view = root.querySelector('#invoiceView');\n      var drawer = root.querySelector('#invoiceDrawer');\n      var dialog = root.querySelector('#invoiceDialog');\n      var preview = root.querySelector('#invoicePreview');\n      var toastHost = root.querySelector('#invoiceToast');\n      var currentTab = 'applications';\n      var applicationStatus = 'ALL';\n      var applicationPage = 1;\n      var documentPage = 1;\n      var redPage = 1;\n      var applicationPageSize = 20;\n      var documentPageSize = 20;\n      var redPageSize = 20;\n      var configPage = 1;\n      var redSubtab = 'tasks';\n      var configSubtab = 'entities';\n      var detailTab = 'overview';\n      var selectedApplications = [];\n      var currentApplicationId = null;\n      var dialogContext = null;\n      var annoVisible = false;\n      var applicationFilters = { keyword: '', subject: '', type: '', startDate: '', endDate: '' };\n      var applicationSort = { key: 'created', direction: 'desc' };\n      var applicationCalendarOpen = false;\n      var applicationCalendarStart = '';\n      var applicationCalendarEnd = '';\n      var applicationCalendarCommittedStart = '';\n      var applicationCalendarCommittedEnd = '';\n      var applicationCalendarSnapshotStart = '';\n      var applicationCalendarSnapshotEnd = '';\n      var applicationCalendarNow = new Date();\n      var applicationCalendarMonth = new Date(applicationCalendarNow.getFullYear(), applicationCalendarNow.getMonth(), 1);\n      var documentFilters = { keyword: '', status: '', delivery: '', startDate: '', endDate: '' };\n      var documentSort = { key: 'issued', direction: 'desc' };\n      var documentCalendarOpen = false;\n      var documentCalendarStart = '';\n      var documentCalendarEnd = '';\n      var documentCalendarCommittedStart = '';\n      var documentCalendarCommittedEnd = '';\n      var documentCalendarSnapshotStart = '';\n      var documentCalendarSnapshotEnd = '';\n      var documentCalendarMonth = new Date(applicationCalendarNow.getFullYear(), applicationCalendarNow.getMonth(), 1);\n      var redFilters = { keyword: '', status: '', source: '' };\n      var annotations = {\n        2: { title: '工作台主导航', desc: ['触发：点击主 Tab。', '响应：切换申请、票据、红冲或配置视图，当前筛选条件按视图保存。'] },\n        4: { title: '申请列表操作', desc: ['刷新保留当前查询与状态筛选，同时清空已选记录。', '导出按当前申请列表的查询快照创建异步任务。'] },\n        5: { title: '业务视图区', desc: ['筛选、表格、分页和批量操作均在当前工作区内完成。'] },\n        10: { title: '申请状态筛选', desc: ['可按申请状态快速定位待审核、开具中、已开票和失败记录。', '服务端仍需按团队、申请人和开票主体重新鉴权。'] },\n        11: { title: '申请关键词', desc: ['支持申请编号、订单号或购买主体模糊搜索。', '敏感字段以脱敏值呈现。'] },\n        12: { title: '查询动作', desc: ['触发：点击查询。', '响应：基于当前条件重算申请列表和总数，页码回到第一页。'] },\n        14: { title: '申请数据表', desc: ['金额按元展示，后端按分存储。', '同一申请可拆成多个 ProviderTask 或票据，但申请总额不变。'] },\n        15: { title: '审核入口', desc: ['待审核申请无需领取，有权限的管理员或财务可直接审批。', '审批按对象版本原子竞争；通过后事务内写 Outbox，再由服务身份幂等创建第三方任务。'] },\n        30: { title: '票据筛选', desc: ['按票据状态、开票主体和交付状态定位文件缺失、交付失败或待补拉票据。'] },\n        31: { title: '票据表格', desc: ['票据、文件和交付状态正交呈现；文件缺失保持 NOT_SENT，不伪造发送失败。'] },\n        32: { title: '票据预览', desc: ['预览使用短时授权文件地址，原型只展示脱敏纸面，不落盘真实文件。'] },\n        50: { title: '红冲任务筛选', desc: ['退款、用户更正、财务纠错共用原蓝票红冲分配账本。', '来源按 REFUND > FINANCE_CORRECTION > USER_CORRECTION 排队。'] },\n        51: { title: '红冲任务操作', desc: ['UNKNOWN 任务只能先按原请求查询；确认未受理并关闭旧任务后才可重试或补正。'] },\n        52: { title: '更正申请', desc: ['全部目标蓝票金额整组原子占额，红冲全部成功后才生成唯一重开草稿。'] },\n        70: { title: '配置工作台', desc: ['配置分为开票主体、发票内容、SKU 映射、第三方服务商和通知 SLA。', '配置发布需填写变更原因并保留版本审计。'] },\n        71: { title: '配置发布', desc: ['发布动作只更新当前配置版本；历史申请使用支付时固化的销售主体快照。'] },\n        90: { title: '详情四维状态', desc: ['四项为同一申请的独立状态事实，不是先后执行的步骤。', '交付失败只影响交付维度，不回退开具成功或有效票据。'] },\n        91: { title: '审核决策', desc: ['通过前重新校验金额、主体、票种、资格和版本。', '驳回必须记录结构化原因，用户修改后会生成新的申请 ID。'] }\n      };\n\n      var statusMeta = {\n        DRAFT: ['草稿', 'neutral'], PENDING_REVIEW: ['待审核', 'primary'], APPROVED: ['审核通过', 'success'], REJECTED: ['已驳回', 'danger'], WITHDRAWN: ['已撤回', 'neutral'], CANCELLED: ['已取消', 'neutral'],\n        NOT_SUBMITTED: ['未提交', 'neutral'], SUBMITTING: ['提交中', 'info'], ISSUING: ['开具中', 'info'], PARTIAL: ['部分成功', 'warning'], SUCCEEDED: ['开具成功', 'success'], FAILED: ['开具失败', 'danger'], UNKNOWN: ['结果未知', 'warning'],\n        NONE: ['未生成', 'neutral'], ACTIVE: ['有效', 'success'], RED_PENDING: ['红冲处理中', 'warning'], PARTIALLY_RED: ['部分红冲', 'warning'], FULLY_RED: ['已全额红冲', 'neutral'], RED_FAILED: ['红冲失败', 'danger'],\n        NOT_SENT: ['未发送', 'neutral'], SENDING: ['发送中', 'info'], PARTIALLY_DELIVERED: ['部分送达', 'warning'], DELIVERED: ['已送达', 'success'], DELIVERY_FAILED: ['交付失败', 'danger'],\n        REFUND: ['退款红冲', 'danger'], FINANCE_CORRECTION: ['财务纠错', 'warning'], USER_CORRECTION: ['用户更正', 'info'], PENDING: ['待处理', 'neutral'], PROCESSING: ['红冲中', 'warning'], RED_PROCESSING: ['红冲处理中', 'warning'], COMPLETED: ['已完成', 'success']\n      };\n      var applicationStatuses = [['ALL', '全部'], ['PENDING_REVIEW', '待审核'], ['ISSUING', '开具中'], ['PARTIAL', '部分开票异常'], ['SUCCEEDED', '已开票'], ['REJECTED', '已驳回'], ['FAILED', '开票失败'], ['RED_PENDING', '红冲处理中'], ['RED_FAILED', '红冲失败'], ['PARTIALLY_RED', '已部分红冲'], ['FULLY_RED', '已红冲'], ['CANCELLED', '已取消']];\n\n      function application(id, subject, subjectType, amount, status, issuance, document, delivery, created, applicant, order, content, taxRate, source, assignee, note) {\n        return { id: id, subject: subject, subjectType: subjectType, amount: amount, status: status, issuance: issuance, document: document, delivery: delivery, created: created, applicant: applicant, order: order, content: content, taxRate: taxRate, source: source, assignee: assignee || '—', note: note || '—', version: 3 };\n      }\n      var applications = [\n        application('IA-20260819-0012', '上海云栈信息科技有限公司', '企业', 268000, 'PENDING_REVIEW', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-19 09:42', '林财务', 'ORD-20260819-0841', '信息技术服务*技术服务费', '6%', '支付宝', '—', '同主体订单可合并，待核验销售主体快照'),\n        application('IA-20260819-0011', '深圳航迹网络有限公司', '企业', 129900, 'PENDING_REVIEW', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-19 09:28', '周敏', 'ORD-20260818-0719', '信息技术服务*平台服务费', '6%', '微信支付', '—', '待审核，可由授权管理员或财务直接审批'),\n        application('IA-20260819-0010', '杭州星河数字工作室', '组织', 88000, 'APPROVED', 'ISSUING', 'NONE', 'NOT_SENT', '2026-08-19 09:16', '陈昊', 'ORD-20260818-0645', '信息技术服务*软件服务费', '6%', '银联', '陈昊', '已写入 Outbox，等待第三方回执'),\n        application('IA-20260819-0009', '北京启明智能科技有限公司', '企业', 59900, 'APPROVED', 'SUCCEEDED', 'ACTIVE', 'DELIVERED', '2026-08-19 08:50', '林财务', 'ORD-20260817-0588', '信息技术服务*技术服务费', '6%', '支付宝', '林财务', '站内文件与联系邮箱均已送达'),\n        application('IA-20260819-0008', '广州微澜贸易有限公司', '企业', 35000, 'REJECTED', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-19 08:32', '王莉', 'ORD-20260817-0492', '信息技术服务*平台服务费', '6%', '微信支付', '—', '销售主体税号快照缺失，请补充后重新提交'),\n        application('IA-20260818-0026', '成都拾光个人用户', '个人', 12000, 'APPROVED', 'SUCCEEDED', 'ACTIVE', 'PARTIALLY_DELIVERED', '2026-08-18 18:44', '赵宁', 'ORD-20260818-0411', '信息技术服务*服务费', '免税', '支付宝', '赵宁', '站内文件可访问，联系邮箱发送失败可重发'),\n        application('IA-20260818-0025', '上海云栈信息科技有限公司', '企业', 418000, 'APPROVED', 'PARTIAL', 'PARTIALLY_RED', 'PARTIALLY_DELIVERED', '2026-08-18 17:26', '林财务', 'ORD-20260816-0337', '信息技术服务*技术服务费', '6%', '支付宝', '林财务', '3 张票据中 1 张红冲处理中'),\n        application('IA-20260818-0024', '武汉云图数据有限公司', '企业', 19900, 'APPROVED', 'FAILED', 'NONE', 'NOT_SENT', '2026-08-18 16:57', '陈昊', 'ORD-20260816-0298', '信息技术服务*软件服务费', '6%', '银联', '陈昊', '第三方返回税目校验失败，可按原请求重试'),\n        application('IA-20260818-0023', '厦门海岸实验室', '组织', 76000, 'PENDING_REVIEW', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-18 16:08', '周敏', 'ORD-20260815-0198', '信息技术服务*平台服务费', '6%', '微信支付', '—', '待审核，审批提交时重新复核金额占用'),\n        application('IA-20260818-0022', '南京极昼网络有限公司', '企业', 12800, 'WITHDRAWN', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-18 15:42', '—', 'ORD-20260815-0144', '信息技术服务*服务费', '6%', '支付宝', '—', '用户在待审核阶段主动撤回'),\n        application('IA-20260818-0021', '北京启明智能科技有限公司', '企业', 66000, 'APPROVED', 'UNKNOWN', 'NONE', 'NOT_SENT', '2026-08-18 14:25', '林财务', 'ORD-20260814-0111', '信息技术服务*技术服务费', '6%', '支付宝', '林财务', '第三方超时，需按受理号查询，不可直接重试'),\n        application('IA-20260818-0020', '苏州青禾个人用户', '个人', 9900, 'APPROVED', 'SUCCEEDED', 'FULLY_RED', 'DELIVERED', '2026-08-18 13:18', '赵宁', 'ORD-20260813-0087', '信息技术服务*服务费', '免税', '微信支付', '赵宁', '原蓝票已按退款净额全额红冲'),\n        application('IA-20260818-0019', '合肥远见科技有限公司', '企业', 218000, 'DRAFT', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-18 11:52', '—', 'ORD-20260812-0038', '信息技术服务*技术服务费', '6%', '支付宝', '—', '草稿不占用可开票余额'),\n        application('IA-20260818-0018', '重庆山海组织', '组织', 52000, 'CANCELLED', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-18 10:04', '—', 'ORD-20260811-0998', '信息技术服务*平台服务费', '6%', '银联', '—', '订单确认退款，申请已取消并释放占用'),\n        application('IA-20260817-0017', '天津澄明科技有限公司', '企业', 86000, 'APPROVED', 'SUCCEEDED', 'RED_FAILED', 'DELIVERED', '2026-08-17 19:20', '王莉', 'ORD-20260810-0871', '信息技术服务*技术服务费', '6%', '支付宝', '王莉', '红冲明确失败，金额继续占用并等待安全处置')\n      ];\n      var documents = [\n        { id: 'DOC-20260819-0081', applicationId: 'IA-20260819-0009', invoiceNo: '数电票-04438291', subject: '北京启明智能科技有限公司', amount: 59900, type: '数电专票', document: 'ACTIVE', delivery: 'DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 'f***@qiming.cn', issued: '2026-08-19 09:01', provider: '百望云', action: 'download' },\n        { id: 'DOC-20260819-0080', applicationId: 'IA-20260819-0010', invoiceNo: '数电票-04438276', subject: '杭州星河数字工作室', amount: 88000, type: '数电普票', document: 'NONE', delivery: 'NOT_SENT', file: 'NOT_SENT', channel: '站内、邮件', recipient: 'c***@xinghe.cn', issued: '待回执', provider: '航信云', action: 'query' },\n        { id: 'DOC-20260819-0079', applicationId: 'IA-20260818-0026', invoiceNo: '数电票-04438191', subject: '成都拾光个人用户', amount: 12000, type: '数电普票', document: 'ACTIVE', delivery: 'PARTIALLY_DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 's***@mail.com', issued: '2026-08-18 18:51', provider: '百望云', action: 'resend' },\n        { id: 'DOC-20260819-0078', applicationId: 'IA-20260818-0025', invoiceNo: '数电票-04438144', subject: '上海云栈信息科技有限公司', amount: 138000, type: '数电专票', document: 'PARTIALLY_RED', delivery: 'PARTIALLY_DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 'f***@yunstack.cn', issued: '2026-08-18 17:38', provider: '百望云', action: 'red' },\n        { id: 'DOC-20260819-0077', applicationId: 'IA-20260818-0025', invoiceNo: '数电票-04438145', subject: '上海云栈信息科技有限公司', amount: 140000, type: '数电专票', document: 'ACTIVE', delivery: 'DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 'f***@yunstack.cn', issued: '2026-08-18 17:38', provider: '百望云', action: 'download' },\n        { id: 'DOC-20260819-0076', applicationId: 'IA-20260818-0025', invoiceNo: '数电票-04438146', subject: '上海云栈信息科技有限公司', amount: 140000, type: '数电专票', document: 'RED_PENDING', delivery: 'NOT_SENT', file: 'ACTIVE', channel: '站内、邮件', recipient: 'f***@yunstack.cn', issued: '2026-08-18 17:38', provider: '百望云', action: 'query' },\n        { id: 'DOC-20260819-0075', applicationId: 'IA-20260818-0021', invoiceNo: '受理中-2026081803', subject: '北京启明智能科技有限公司', amount: 66000, type: '数电专票', document: 'NONE', delivery: 'NOT_SENT', file: 'NOT_SENT', channel: '站内、邮件', recipient: 'f***@qiming.cn', issued: '结果未知', provider: '航信云', action: 'query' },\n        { id: 'DOC-20260819-0074', applicationId: 'IA-20260818-0020', invoiceNo: '数电票-04437981', subject: '苏州青禾个人用户', amount: 9900, type: '数电普票', document: 'FULLY_RED', delivery: 'DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 's***@mail.com', issued: '2026-08-18 13:28', provider: '百望云', action: 'download' },\n        { id: 'DOC-20260818-0069', applicationId: 'IA-20260817-0138', invoiceNo: '数电票-04437201', subject: '广州云迹科技有限公司', amount: 328000, type: '数电专票', document: 'ACTIVE', delivery: 'SENDING', file: 'ACTIVE', channel: '站内、邮件', recipient: 'a***@yunji.cn', issued: '2026-08-17 18:13', provider: '航信云', action: 'resend' },\n        { id: 'DOC-20260817-0068', applicationId: 'IA-20260817-0017', invoiceNo: '数电票-04436992', subject: '天津澄明科技有限公司', amount: 86000, type: '数电专票', document: 'RED_FAILED', delivery: 'DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 'f***@chengming.cn', issued: '2026-08-17 19:31', provider: '百望云', action: 'query' }\n      ];\n      var redTasks = [\n        { id: 'RT-20260819-004', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04438146', applicationId: 'IA-20260818-0025', subject: '上海云栈信息科技有限公司', amount: 42000, status: 'PROCESSING', progress: '1/1', created: '2026-08-19 09:06', owner: '林财务', reason: '退款净额红冲' },\n        { id: 'RT-20260819-003', source: 'FINANCE_CORRECTION', sourceName: '财务纠错', invoiceNo: '数电票-04438145', applicationId: 'IA-20260818-0025', subject: '上海云栈信息科技有限公司', amount: 140000, status: 'UNKNOWN', progress: '0/1', created: '2026-08-19 08:48', owner: '周敏', reason: '税率录入错误，等待第三方查询' },\n        { id: 'RT-20260819-002', source: 'USER_CORRECTION', sourceName: '用户更正', invoiceNo: '数电票-04438191', applicationId: 'IA-20260818-0026', subject: '成都拾光个人用户', amount: 12000, status: 'FAILED', progress: '0/1', created: '2026-08-18 19:21', owner: '赵宁', reason: '受票人信息不匹配' },\n        { id: 'RT-20260818-018', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04437981', applicationId: 'IA-20260818-0020', subject: '苏州青禾个人用户', amount: 9900, status: 'SUCCEEDED', progress: '1/1', created: '2026-08-18 13:36', owner: '赵宁', reason: '订单全额退款' },\n        { id: 'RT-20260818-017', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04437106', applicationId: 'IA-20260817-0112', subject: '宁波远舟科技有限公司', amount: 80000, status: 'PARTIAL', progress: '1/2', created: '2026-08-18 11:17', owner: '林财务', reason: '部分退款' },\n        { id: 'RT-20260818-016', source: 'FINANCE_CORRECTION', sourceName: '财务纠错', invoiceNo: '数电票-04437084', applicationId: 'IA-20260817-0097', subject: '无锡拾穗科技有限公司', amount: 56000, status: 'PENDING', progress: '0/1', created: '2026-08-18 10:42', owner: '—', reason: '税目映射错误' },\n        { id: 'RT-20260817-015', source: 'FINANCE_CORRECTION', sourceName: '财务纠错', invoiceNo: '数电票-04436517', applicationId: 'IA-20260816-0052', subject: '青岛潮汐个人用户', amount: 15000, status: 'CANCELLED', progress: '0/1', created: '2026-08-17 16:12', owner: '—', reason: '提交第三方前发现重复纠错，已取消' },\n        { id: 'RT-20260817-014', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04436228', applicationId: 'IA-20260816-0029', subject: '郑州微光组织', amount: 23400, status: 'SUCCEEDED', progress: '1/1', created: '2026-08-17 14:54', owner: '周敏', reason: '退款净额红冲' }\n      ];\n      var corrections = [\n        { id: 'CR-20260819-006', subject: '上海云栈信息科技有限公司', targets: '04438145、04438146', amount: 280000, status: 'PENDING_REVIEW', created: '2026-08-19 08:42', applicant: '运营管理员', reason: '发票内容需改为技术服务费', draft: '待红冲', version: 4 },\n        { id: 'CR-20260818-005', subject: '成都拾光个人用户', targets: '04438191', amount: 12000, status: 'COMPLETED', created: '2026-08-18 19:10', applicant: '用户自助', reason: '收件邮箱更正', draft: '—', version: 5 },\n        { id: 'CR-20260818-004', subject: '南京极昼网络有限公司', targets: '04437106', amount: 80000, status: 'COMPLETED', created: '2026-08-18 12:25', applicant: '财务管理员', reason: '主体名称更正', draft: 'IA-20260818-0022-R1', version: 6 },\n        { id: 'CR-20260817-003', subject: '厦门海岸实验室', targets: '04436517', amount: 15000, status: 'REJECTED', created: '2026-08-17 17:45', applicant: '用户自助', reason: '受票人信息更正', draft: '—', version: 3 },\n        { id: 'CR-20260817-002', subject: '天津澄明科技有限公司', targets: '04436992', amount: 86000, status: 'RED_FAILED', created: '2026-08-17 20:04', applicant: '财务管理员', reason: '税务平台明确返回红字信息表校验失败', draft: '待处置', version: 5 },\n        { id: 'CR-20260816-001', subject: '广州微澜贸易有限公司', targets: '04436180', amount: 35000, status: 'APPROVED', created: '2026-08-16 18:16', applicant: '用户自助', reason: '企业地址更正', draft: '红冲任务待处理', version: 4 },\n        { id: 'CR-20260815-009', subject: '北京启明智能科技有限公司', targets: '04435819', amount: 42000, status: 'WITHDRAWN', created: '2026-08-15 15:32', applicant: '用户自助', reason: '用户在审批决定前撤回', draft: '—', version: 2 },\n        { id: 'CR-20260815-008', subject: '深圳航迹网络有限公司', targets: '04435702', amount: 68000, status: 'CANCELLED', created: '2026-08-15 11:08', applicant: '用户自助', reason: '审批前原票有效余额已归零', draft: '—', version: 3 }\n      ];\n      var configs = {\n        entities: [\n          { id: 'ENT-001', name: '云登网络科技（上海）有限公司', type: '企业', taxId: '9131**********48', scope: '代理服务、API/RPA 服务', status: '已发布', version: 'v12', updated: '2026-08-18 17:20', operator: '林财务' },\n          { id: 'ENT-002', name: '云登信息技术（深圳）有限公司', type: '企业', taxId: '9144**********19', scope: '平台服务、增值服务', status: '草稿', version: 'v4', updated: '2026-08-19 09:12', operator: '周敏' },\n          { id: 'ENT-003', name: '云登个人业务主体', type: '个人', taxId: '—', scope: '个人数电普票', status: '已发布', version: 'v3', updated: '2026-08-12 14:06', operator: '林财务' }\n        ],\n        contents: [\n          { id: 'CONT-001', label: '信息技术服务*技术服务费', taxRate: '6%', types: '普票、专票', sku: '已映射 38', status: '已发布', updated: '2026-08-18 17:20' },\n          { id: 'CONT-002', label: '信息技术服务*平台服务费', taxRate: '6%', types: '普票、专票', sku: '已映射 24', status: '已发布', updated: '2026-08-18 17:20' },\n          { id: 'CONT-003', label: '信息技术服务*服务费', taxRate: '免税', types: '普票', sku: '已映射 12', status: '已发布', updated: '2026-08-12 14:06' },\n          { id: 'CONT-004', label: '信息技术服务*软件服务费', taxRate: '6%', types: '普票、专票', sku: '待补 3', status: '草稿', updated: '2026-08-19 09:12' }\n        ],\n        sku: [\n          { id: 'SKU-0718', name: '代理 IP 标准包', content: '信息技术服务*技术服务费', taxRate: '6%', status: '已发布', updated: '2026-08-18 17:20' },\n          { id: 'SKU-0719', name: 'RPA 环境月卡', content: '信息技术服务*平台服务费', taxRate: '6%', status: '已发布', updated: '2026-08-18 17:20' },\n          { id: 'SKU-0720', name: 'API 调用包', content: '—', taxRate: '—', status: '待映射', updated: '2026-08-19 09:12' }\n        ],\n        providers: [\n          { id: 'PRO-001', name: '百望云', env: '生产', tenant: 'yundeng-prod', timeout: '30 秒', status: '主用', updated: '2026-08-18 17:20' },\n          { id: 'PRO-002', name: '航信云', env: '生产', tenant: 'yundeng-backup', timeout: '30 秒', status: '备用', updated: '2026-08-12 14:06' }\n        ],\n        notifications: [\n          { id: 'SLA-001', name: '审核超时提醒', target: '财务审核组', threshold: '24 小时', channel: '站内通知、邮件', status: '已启用', updated: '2026-08-18 17:20' },\n          { id: 'SLA-002', name: '交付失败告警', target: '开票管理员', threshold: '失败即告警', channel: '站内通知', status: '已启用', updated: '2026-08-18 17:20' },\n          { id: 'SLA-003', name: '第三方 UNKNOWN 告警', target: '开票管理员', threshold: '15 分钟', channel: '站内通知、短信', status: '草稿', updated: '2026-08-19 09:12' }\n        ]\n      };\n\n      function esc(value) { return String(value == null ? '' : value).replace(/[&<>\"']/g, function (char) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' })[char]; }); }\n      function money(cents) { return '¥' + (Number(cents || 0) / 100).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }\n      function label(code) { return statusMeta[code] ? statusMeta[code][0] : (code || '—'); }\n      function badge(code) { var meta = statusMeta[code] || [code || '—', 'neutral']; return '<span class=\"invoice-badge invoice-badge-' + meta[1] + '\">' + esc(meta[0]) + '</span>'; }\n      function statusParameter(code) { var meta = statusMeta[code] || [code || '—', 'neutral']; return '<span class=\"invoice-status-parameter is-' + meta[1] + '\">' + esc(meta[0]) + '</span>'; }\n      function statusDot(code) { var meta = statusMeta[code] || ['', 'neutral']; return '<span class=\"invoice-badge invoice-badge-' + meta[1] + '\"><span aria-hidden=\"true\">●</span>' + esc(meta[0]) + '</span>'; }\n      function redTaskBadge(code) { var meta = { PENDING: ['待处理', 'neutral'], PROCESSING: ['红冲中', 'warning'], UNKNOWN: ['结果未知', 'warning'], PARTIAL: ['部分红冲成功', 'warning'], SUCCEEDED: ['已红冲', 'success'], FAILED: ['红冲失败', 'danger'], CANCELLED: ['已取消', 'neutral'] }[code] || [code || '—', 'neutral']; return '<span class=\"invoice-badge invoice-badge-' + meta[1] + '\">' + esc(meta[0]) + '</span>'; }\n      function statusHelp(kind) {\n        var title = kind === 'issuance' ? '开具状态说明' : '交付状态说明';\n        var helpId = 'invoice-' + kind + '-status-help';\n        var scopeNote = kind === 'delivery' ? '<span><b>口径：</b>系统固定按站内、邮件两个交付单元聚合，用户无需选择交付类型</span>' : '';\n        var items = kind === 'issuance' ? [\n          ['未提交', '尚未向第三方服务商发起开具请求'],\n          ['提交中', '请求已提交，等待服务商受理'],\n          ['开具中', '服务商正在处理开具'],\n          ['部分成功', '拆票任务部分成功，失败子任务待处置'],\n          ['开具成功', '服务商已返回有效票据'],\n          ['开具失败', '服务商明确返回失败，可确认未受理后重试'],\n          ['结果未知', '请求超时，需按原受理号查询，不能直接重试']\n        ] : [\n          ['未发送', '票据文件尚未发送'],\n          ['发送中', '正在按渠道投递'],\n          ['部分送达', '部分收件人已收到票据'],\n          ['已送达', '全部收件人已收到票据'],\n          ['交付失败', '当前必达交付单元均失败，需按失败渠道处置']\n        ];\n        return '<span class=\"invoice-status-help\" data-status-help><button type=\"button\" aria-expanded=\"false\" aria-controls=\"' + helpId + '\" aria-describedby=\"' + helpId + '\" aria-label=\"' + title + '\" title=\"查看' + title + '\">?</button><span id=\"' + helpId + '\" class=\"invoice-status-help-popover\" role=\"tooltip\"><strong>' + title + '</strong>' + scopeNote + items.map(function (item) { return '<span><b>' + item[0] + '：</b>' + item[1] + '</span>'; }).join('') + '</span></span>';\n      }\n      function btn(action, text, icon, cls, attrs) { return '<button type=\"button\" class=\"invoice-btn ' + (cls || 'invoice-btn-default') + '\" data-action=\"' + action + '\"' + (attrs || '') + '><i data-lucide=\"' + icon + '\" class=\"w-4 h-4\"></i><span>' + text + '</span></button>'; }\n      function link(action, text, attrs) { return '<button type=\"button\" class=\"invoice-btn-link\" data-action=\"' + action + '\"' + (attrs || '') + '>' + text + '</button>'; }\n      function empty(title, desc, icon) { return '<div class=\"invoice-empty\"><span class=\"invoice-empty-icon\"><i data-lucide=\"' + (icon || 'search-x') + '\" class=\"w-6 h-6\"></i></span><strong>' + esc(title) + '</strong><p>' + esc(desc) + '</p></div>'; }\n      function sortHeader(label, action, key, state) {\n        var active = state.key === key;\n        var direction = active ? state.direction : 'none';\n        var ariaSort = direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none';\n        var nextDirection = active && direction === 'desc' ? '升序' : '降序';\n        var current = active ? '当前' + (direction === 'asc' ? '升序' : '降序') + '，' : '';\n        return '<th aria-sort=\"' + ariaSort + '\"><button type=\"button\" class=\"invoice-sort-button\" data-action=\"' + action + '\" data-sort-key=\"' + key + '\" data-sort-direction=\"' + direction + '\" aria-label=\"' + label + '，' + current + '点击切换为' + nextDirection + '\"><span>' + label + '</span><span class=\"invoice-sort-icon\" aria-hidden=\"true\"><span class=\"invoice-sort-caret is-up\"></span><span class=\"invoice-sort-caret is-down\"></span></span></button></th>';\n      }\n      function toggleSort(state, key) {\n        if (state.key === key) state.direction = state.direction === 'desc' ? 'asc' : 'desc';\n        else { state.key = key; state.direction = 'desc'; }\n      }\n      function sortRows(rows, state) {\n        return rows.slice().sort(function (left, right) {\n          var leftValue = left[state.key];\n          var rightValue = right[state.key];\n          var leftMissing = leftValue === null || leftValue === undefined || leftValue === '' || leftValue === '—' || leftValue === '待回执' || leftValue === '结果未知';\n          var rightMissing = rightValue === null || rightValue === undefined || rightValue === '' || rightValue === '—' || rightValue === '待回执' || rightValue === '结果未知';\n          if (leftMissing || rightMissing) {\n            if (leftMissing && rightMissing) return 0;\n            return leftMissing ? 1 : -1;\n          }\n          var compared = state.key === 'amount' ? Number(leftValue) - Number(rightValue) : String(leftValue).localeCompare(String(rightValue));\n          return state.direction === 'asc' ? compared : -compared;\n        });\n      }\n      function renderPrimaryTabs() {\n        var tabs = [\n          ['applications', '申请管理', 14, ''],\n          ['documents', '票据管理', 9, ''],\n          ['red', '红冲任务', 4, ' is-danger'],\n          ['config', '开票配置', '', '']\n        ];\n        return '<nav class=\"invoice-primary-tabs\" data-anno=\"2\" role=\"tablist\" aria-label=\"发票管理工作台\">' + tabs.map(function (tab) {\n          var active = currentTab === tab[0];\n          return '<button type=\"button\" class=\"invoice-primary-tab' + (active ? ' is-active' : '') + '\" data-tab=\"' + tab[0] + '\" role=\"tab\" aria-selected=\"' + active + '\">' + tab[1] + (tab[2] === '' ? '' : '<span class=\"invoice-tab-count' + tab[3] + '\">' + tab[2] + '</span>') + '</button>';\n        }).join('') + '</nav>';\n      }\n      function paginate(total, page, size, action) {\n        var pages = Math.max(1, Math.ceil(total / size));\n        var scope = action ? action.replace('-page', '') : '';\n        var isStatic = !action;\n        var pageItems = [];\n        for (var i = 1; i <= pages; i += 1) {\n          var visible = pages <= 7 || i === 1 || i === pages || Math.abs(i - page) <= 1;\n          if (visible) pageItems.push(i);\n        }\n        var nav = '<div class=\"invoice-page-nav\"><button type=\"button\" class=\"invoice-page-btn\"' + (isStatic ? '' : ' data-action=\"' + action + '\" data-page=\"' + Math.max(1, page - 1) + '\"') + ' aria-label=\"上一页\"' + (page <= 1 || isStatic ? ' disabled' : '') + '><i data-lucide=\"chevron-left\" class=\"w-4 h-4\"></i></button>';\n        pageItems.forEach(function (item, index) {\n          if (index && item - pageItems[index - 1] > 1) nav += '<span class=\"invoice-page-ellipsis\" aria-hidden=\"true\">…</span>';\n          nav += '<button type=\"button\" class=\"invoice-page-btn' + (item === page ? ' is-active' : '') + '\"' + (isStatic ? '' : ' data-action=\"' + action + '\" data-page=\"' + item + '\"') + ' aria-current=\"' + (item === page ? 'page' : 'false') + '\">' + item + '</button>';\n        });\n        nav += '<button type=\"button\" class=\"invoice-page-btn\"' + (isStatic ? '' : ' data-action=\"' + action + '\" data-page=\"' + Math.min(pages, page + 1) + '\"') + ' aria-label=\"下一页\"' + (page >= pages || isStatic ? ' disabled' : '') + '><i data-lucide=\"chevron-right\" class=\"w-4 h-4\"></i></button></div>';\n        var sizeSelect = '<label class=\"invoice-page-size-control\"><span class=\"sr-only\">每页条数</span><span class=\"invoice-page-select-wrap\"><select class=\"invoice-page-size-select\"' + (scope ? ' data-scope=\"' + scope + '\"' : ' disabled') + ' aria-label=\"每页条数\"><option value=\"10\"' + (size === 10 ? ' selected' : '') + '>10 条/页</option><option value=\"20\"' + (size === 20 ? ' selected' : '') + '>20 条/页</option><option value=\"50\"' + (size === 50 ? ' selected' : '') + '>50 条/页</option></select></span></label>';\n        var jump = '<div class=\"invoice-page-meta\"><label class=\"invoice-page-jump\">跳至 <input class=\"invoice-page-jump-input\" type=\"number\" min=\"1\" max=\"' + pages + '\" value=\"1\"' + (isStatic ? ' disabled' : ' data-page-action=\"' + action + '\"') + ' aria-label=\"跳转页码\"> 页</label><span class=\"invoice-page-stats\">共 ' + total + ' 条记录　第 ' + page + '/' + pages + ' 页</span></div>';\n        return '<div class=\"invoice-pagination\">' + nav + sizeSelect + jump + '</div>';\n      }\n      function valueOf(id) { var el = root.querySelector('#' + id); return el ? el.value.trim() : ''; }\n      function liveFilterValue(id, filters, key) { var el = root.querySelector('#' + id); return el ? el.value.trim() : filters[key]; }\n      function deriveApplicationStatus(item) { if (item.document === 'RED_FAILED') return 'RED_FAILED'; if (item.document === 'RED_PENDING') return 'RED_PENDING'; if (item.document === 'PARTIALLY_RED') return 'PARTIALLY_RED'; if (item.document === 'FULLY_RED') return 'FULLY_RED'; if (item.issuance === 'PARTIAL') return 'PARTIAL'; if (item.issuance === 'FAILED') return 'FAILED'; if (['UNKNOWN', 'SUBMITTING', 'ISSUING'].indexOf(item.issuance) >= 0) return 'ISSUING'; if (item.issuance === 'SUCCEEDED') return 'SUCCEEDED'; if (item.status === 'REJECTED') return 'REJECTED'; if (item.status === 'PENDING_REVIEW') return 'PENDING_REVIEW'; return item.status; }\n      function applicationMatchesStatus(item, status) { return status === 'ALL' || deriveApplicationStatus(item) === status; }\n      function filterApplicationsBase() { var keyword = applicationFilters.keyword.toLowerCase(); var subject = applicationFilters.subject; var type = applicationFilters.type; var startDate = applicationFilters.startDate || ''; var endDate = applicationFilters.endDate || ''; return applications.filter(function (item) { var text = (item.id + ' ' + item.order + ' ' + item.subject).toLowerCase(); var createdDate = item.created.slice(0, 10); return (!keyword || text.indexOf(keyword) >= 0) && (!subject || item.subject.indexOf(subject) >= 0) && (!type || item.subjectType === type) && (!startDate || createdDate >= startDate) && (!endDate || createdDate <= endDate); }); }\n      function filterApplications() { return sortRows(filterApplicationsBase().filter(function (item) { return applicationMatchesStatus(item, applicationStatus); }), applicationSort); }\n      function renderStatusTabs() { var baseRows = filterApplicationsBase(); return '<div class=\"invoice-status-tabs\" data-anno=\"10\" role=\"tablist\" aria-label=\"申请状态\">' + applicationStatuses.map(function (item) { var count = baseRows.filter(function (row) { return applicationMatchesStatus(row, item[0]); }).length; return '<button type=\"button\" class=\"invoice-status-tab' + (applicationStatus === item[0] ? ' is-active' : '') + '\" data-action=\"application-status\" data-status=\"' + item[0] + '\" role=\"tab\" aria-selected=\"' + (applicationStatus === item[0]) + '\">' + item[1] + ' <span class=\"mono\">' + count + '</span></button>'; }).join('') + '</div>'; }\n      function calendarPad(value) { return String(value).padStart(2, '0'); }\n      function formatCalendarDate(date) { return date.getFullYear() + '-' + calendarPad(date.getMonth() + 1) + '-' + calendarPad(date.getDate()); }\n      function addCalendarMonths(date, count) { return new Date(date.getFullYear(), date.getMonth() + count, 1); }\n      function renderCalendarMonth(month, side, scope) {\n        scope = scope || 'application';\n        var rangeStart = scope === 'document' ? documentCalendarStart : applicationCalendarStart;\n        var rangeEnd = scope === 'document' ? documentCalendarEnd : applicationCalendarEnd;\n        var year = month.getFullYear();\n        var monthIndex = month.getMonth();\n        var firstWeekday = new Date(year, monthIndex, 1).getDay();\n        var gridStart = new Date(year, monthIndex, 1 - firstWeekday);\n        var today = formatCalendarDate(applicationCalendarNow);\n        var days = [];\n        for (var index = 0; index < 42; index += 1) {\n          var date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);\n          var value = formatCalendarDate(date);\n          var classes = ['invoice-calendar-day'];\n          if (date.getMonth() !== monthIndex) classes.push('is-muted');\n          if (value === today) classes.push('is-today');\n          if (rangeStart && rangeEnd && value > rangeStart && value < rangeEnd) classes.push('is-in-range');\n          if (value === rangeStart) classes.push('is-start');\n          if (value === rangeEnd) classes.push('is-end');\n          days.push('<button type=\"button\" class=\"' + classes.join(' ') + '\" data-calendar-action=\"select-date\" data-date=\"' + value + '\" aria-label=\"' + year + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日\" aria-pressed=\"' + (value === rangeStart || value === rangeEnd) + '\"' + (value === today ? ' aria-current=\"date\"' : '') + '>' + date.getDate() + '</button>');\n        }\n        var previous = side === 'left' ? '<span class=\"invoice-calendar-nav-group\"><button type=\"button\" class=\"invoice-calendar-nav\" data-calendar-action=\"previous-year\" aria-label=\"上一年\"><i data-lucide=\"chevrons-left\" aria-hidden=\"true\"></i></button><button type=\"button\" class=\"invoice-calendar-nav\" data-calendar-action=\"previous-month\" aria-label=\"上一个月\"><i data-lucide=\"chevron-left\" aria-hidden=\"true\"></i></button></span>' : '<span class=\"invoice-calendar-nav-spacer\" aria-hidden=\"true\"></span>';\n        var next = side === 'right' ? '<span class=\"invoice-calendar-nav-group is-end\"><button type=\"button\" class=\"invoice-calendar-nav\" data-calendar-action=\"next-month\" aria-label=\"下一个月\"><i data-lucide=\"chevron-right\" aria-hidden=\"true\"></i></button><button type=\"button\" class=\"invoice-calendar-nav\" data-calendar-action=\"next-year\" aria-label=\"下一年\"><i data-lucide=\"chevrons-right\" aria-hidden=\"true\"></i></button></span>' : '<span class=\"invoice-calendar-nav-spacer\" aria-hidden=\"true\"></span>';\n        return '<section class=\"invoice-calendar-month\" aria-label=\"' + year + '年' + (monthIndex + 1) + '月\"><div class=\"invoice-calendar-heading\">' + previous + '<div class=\"invoice-calendar-title\">' + year + ' 年 ' + (monthIndex + 1) + ' 月</div>' + next + '</div><div class=\"invoice-calendar-week\" aria-hidden=\"true\"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div><div class=\"invoice-calendar-grid\">' + days.join('') + '</div></section>';\n      }\n      function renderApplicationCalendarPanel() {\n        var hint = applicationCalendarStart && applicationCalendarEnd ? applicationCalendarStart + ' 至 ' + applicationCalendarEnd : applicationCalendarStart ? '已选开始日期' : applicationCalendarEnd ? '已选结束日期' : '未选择';\n        return '<div class=\"invoice-date-picker-months\">' + renderCalendarMonth(applicationCalendarMonth, 'left', 'application') + renderCalendarMonth(addCalendarMonths(applicationCalendarMonth, 1), 'right', 'application') + '</div><div class=\"invoice-date-picker-footer\"><span class=\"invoice-date-picker-hint\" aria-live=\"polite\">' + hint + '</span><div class=\"invoice-date-picker-actions\"><button type=\"button\" class=\"invoice-date-picker-action\" data-calendar-action=\"clear\">清空</button><button type=\"button\" class=\"invoice-date-picker-action\" data-calendar-action=\"cancel\">取消</button><button type=\"button\" class=\"invoice-date-picker-action is-primary\" data-calendar-action=\"confirm\">确定</button></div></div>';\n      }\n      function updateApplicationCalendar() {\n        var range = root.querySelector('.invoice-date-range[data-calendar-scope=\"application\"]');\n        if (!range) return;\n        range.classList.toggle('is-open', applicationCalendarOpen);\n        range.setAttribute('aria-expanded', String(applicationCalendarOpen));\n        range.querySelectorAll('.invoice-date-input').forEach(function (input) { input.setAttribute('aria-expanded', String(applicationCalendarOpen)); });\n        var startInput = range.querySelector('#applicationStartDate');\n        var endInput = range.querySelector('#applicationEndDate');\n        if (startInput) startInput.value = applicationCalendarStart;\n        if (endInput) endInput.value = applicationCalendarEnd;\n        var panel = range.querySelector('#applicationDatePicker');\n        if (panel) {\n          panel.setAttribute('aria-hidden', String(!applicationCalendarOpen));\n          if (applicationCalendarOpen) {\n            panel.innerHTML = renderApplicationCalendarPanel();\n            var panelWidth = Math.min(620, Math.max(280, window.innerWidth - 32));\n            var rangeRect = range.getBoundingClientRect();\n            panel.style.width = panelWidth + 'px';\n            if (rangeRect.left + panelWidth > window.innerWidth - 16 && rangeRect.right - panelWidth >= 16) {\n              panel.style.left = 'auto';\n              panel.style.right = '0';\n            } else if (rangeRect.left + panelWidth > window.innerWidth - 16) {\n              panel.style.left = (16 - rangeRect.left) + 'px';\n              panel.style.right = 'auto';\n            } else {\n              panel.style.left = '0';\n              panel.style.right = 'auto';\n            }\n          } else {\n            panel.style.width = '';\n            panel.style.left = '';\n            panel.style.right = '';\n          }\n        }\n        window.lucide && window.lucide.createIcons();\n      }\n      function openApplicationCalendar() {\n        applicationCalendarSnapshotStart = valueOf('applicationStartDate') || applicationCalendarCommittedStart || applicationFilters.startDate || '';\n        applicationCalendarSnapshotEnd = valueOf('applicationEndDate') || applicationCalendarCommittedEnd || applicationFilters.endDate || '';\n        applicationCalendarStart = applicationCalendarSnapshotStart;\n        applicationCalendarEnd = applicationCalendarSnapshotEnd;\n        if (/^\\d{4}-\\d{2}-\\d{2}$/.test(applicationCalendarStart)) {\n          var parts = applicationCalendarStart.split('-').map(Number);\n          applicationCalendarMonth = new Date(parts[0], parts[1] - 1, 1);\n        }\n        applicationCalendarOpen = true;\n        updateApplicationCalendar();\n      }\n      function closeApplicationCalendar() { applicationCalendarOpen = false; updateApplicationCalendar(); }\n      function cancelApplicationCalendar() {\n        applicationCalendarStart = applicationCalendarSnapshotStart;\n        applicationCalendarEnd = applicationCalendarSnapshotEnd;\n        applicationCalendarCommittedStart = applicationCalendarSnapshotStart;\n        applicationCalendarCommittedEnd = applicationCalendarSnapshotEnd;\n        closeApplicationCalendar();\n      }\n      function selectApplicationCalendarDate(value) {\n        if (!applicationCalendarStart || applicationCalendarEnd) {\n          applicationCalendarStart = value;\n          applicationCalendarEnd = '';\n        } else if (value < applicationCalendarStart) {\n          applicationCalendarEnd = applicationCalendarStart;\n          applicationCalendarStart = value;\n        } else {\n          applicationCalendarEnd = value;\n        }\n        updateApplicationCalendar();\n      }\n      function renderApplicationDateRange() {\n        var startDate = applicationCalendarOpen ? applicationCalendarStart : applicationCalendarCommittedStart;\n        var endDate = applicationCalendarOpen ? applicationCalendarEnd : applicationCalendarCommittedEnd;\n        return '<div class=\"invoice-date-range' + (applicationCalendarOpen ? ' is-open' : '') + '\" data-calendar-trigger data-calendar-scope=\"application\" role=\"group\" aria-label=\"申请时间范围\" aria-haspopup=\"dialog\" aria-expanded=\"' + applicationCalendarOpen + '\"><input id=\"applicationStartDate\" class=\"invoice-date-input\" type=\"text\" placeholder=\"开始时间\" value=\"' + esc(startDate) + '\" aria-label=\"开始时间\" aria-haspopup=\"dialog\" aria-controls=\"applicationDatePicker\" aria-expanded=\"' + applicationCalendarOpen + '\" readonly><span class=\"invoice-date-sep\" aria-hidden=\"true\">~</span><input id=\"applicationEndDate\" class=\"invoice-date-input\" type=\"text\" placeholder=\"结束时间\" value=\"' + esc(endDate) + '\" aria-label=\"结束时间\" aria-haspopup=\"dialog\" aria-controls=\"applicationDatePicker\" aria-expanded=\"' + applicationCalendarOpen + '\" readonly><i data-lucide=\"calendar-days\" aria-hidden=\"true\"></i><div id=\"applicationDatePicker\" class=\"invoice-date-picker\" role=\"dialog\" aria-label=\"选择申请时间范围\" aria-hidden=\"' + (!applicationCalendarOpen) + '\">' + (applicationCalendarOpen ? renderApplicationCalendarPanel() : '') + '</div></div>';\n      }\n\n      function renderDocumentCalendarPanel() {\n        var hint = documentCalendarStart && documentCalendarEnd ? documentCalendarStart + ' 至 ' + documentCalendarEnd : documentCalendarStart ? '已选开始日期' : documentCalendarEnd ? '已选结束日期' : '未选择';\n        return '<div class=\"invoice-date-picker-months\">' + renderCalendarMonth(documentCalendarMonth, 'left', 'document') + renderCalendarMonth(addCalendarMonths(documentCalendarMonth, 1), 'right', 'document') + '</div><div class=\"invoice-date-picker-footer\"><span class=\"invoice-date-picker-hint\" aria-live=\"polite\">' + hint + '</span><div class=\"invoice-date-picker-actions\"><button type=\"button\" class=\"invoice-date-picker-action\" data-calendar-action=\"clear\">清空</button><button type=\"button\" class=\"invoice-date-picker-action\" data-calendar-action=\"cancel\">取消</button><button type=\"button\" class=\"invoice-date-picker-action is-primary\" data-calendar-action=\"confirm\">确定</button></div></div>';\n      }\n      function updateDocumentCalendar() {\n        var range = root.querySelector('.invoice-date-range[data-calendar-scope=\"document\"]');\n        if (!range) return;\n        range.classList.toggle('is-open', documentCalendarOpen);\n        range.setAttribute('aria-expanded', String(documentCalendarOpen));\n        range.querySelectorAll('.invoice-date-input').forEach(function (input) { input.setAttribute('aria-expanded', String(documentCalendarOpen)); });\n        var startInput = range.querySelector('#documentStartDate');\n        var endInput = range.querySelector('#documentEndDate');\n        if (startInput) startInput.value = documentCalendarStart;\n        if (endInput) endInput.value = documentCalendarEnd;\n        var panel = range.querySelector('#documentDatePicker');\n        if (panel) {\n          panel.setAttribute('aria-hidden', String(!documentCalendarOpen));\n          if (documentCalendarOpen) {\n            panel.innerHTML = renderDocumentCalendarPanel();\n            var panelWidth = Math.min(620, Math.max(280, window.innerWidth - 32));\n            var rangeRect = range.getBoundingClientRect();\n            panel.style.width = panelWidth + 'px';\n            if (rangeRect.left + panelWidth > window.innerWidth - 16 && rangeRect.right - panelWidth >= 16) {\n              panel.style.left = 'auto';\n              panel.style.right = '0';\n            } else if (rangeRect.left + panelWidth > window.innerWidth - 16) {\n              panel.style.left = (16 - rangeRect.left) + 'px';\n              panel.style.right = 'auto';\n            } else {\n              panel.style.left = '0';\n              panel.style.right = 'auto';\n            }\n          } else {\n            panel.style.width = '';\n            panel.style.left = '';\n            panel.style.right = '';\n          }\n        }\n        window.lucide && window.lucide.createIcons();\n      }\n      function openDocumentCalendar() {\n        documentCalendarSnapshotStart = valueOf('documentStartDate') || documentCalendarCommittedStart || documentFilters.startDate || '';\n        documentCalendarSnapshotEnd = valueOf('documentEndDate') || documentCalendarCommittedEnd || documentFilters.endDate || '';\n        documentCalendarStart = documentCalendarSnapshotStart;\n        documentCalendarEnd = documentCalendarSnapshotEnd;\n        if (/^\\d{4}-\\d{2}-\\d{2}$/.test(documentCalendarStart)) {\n          var parts = documentCalendarStart.split('-').map(Number);\n          documentCalendarMonth = new Date(parts[0], parts[1] - 1, 1);\n        }\n        documentCalendarOpen = true;\n        updateDocumentCalendar();\n      }\n      function closeDocumentCalendar() { documentCalendarOpen = false; updateDocumentCalendar(); }\n      function cancelDocumentCalendar() {\n        documentCalendarStart = documentCalendarSnapshotStart;\n        documentCalendarEnd = documentCalendarSnapshotEnd;\n        documentCalendarCommittedStart = documentCalendarSnapshotStart;\n        documentCalendarCommittedEnd = documentCalendarSnapshotEnd;\n        closeDocumentCalendar();\n      }\n      function selectDocumentCalendarDate(value) {\n        if (!documentCalendarStart || documentCalendarEnd) {\n          documentCalendarStart = value;\n          documentCalendarEnd = '';\n        } else if (value < documentCalendarStart) {\n          documentCalendarEnd = documentCalendarStart;\n          documentCalendarStart = value;\n        } else {\n          documentCalendarEnd = value;\n        }\n        updateDocumentCalendar();\n      }\n      function renderDocumentDateRange() {\n        var startDate = documentCalendarOpen ? documentCalendarStart : documentCalendarCommittedStart;\n        var endDate = documentCalendarOpen ? documentCalendarEnd : documentCalendarCommittedEnd;\n        return '<div class=\"invoice-date-range' + (documentCalendarOpen ? ' is-open' : '') + '\" data-calendar-trigger data-calendar-scope=\"document\" role=\"group\" aria-label=\"开具时间范围\" aria-haspopup=\"dialog\" aria-expanded=\"' + documentCalendarOpen + '\"><input id=\"documentStartDate\" class=\"invoice-date-input\" type=\"text\" placeholder=\"开始时间\" value=\"' + esc(startDate) + '\" aria-label=\"开具开始时间\" aria-haspopup=\"dialog\" aria-controls=\"documentDatePicker\" aria-expanded=\"' + documentCalendarOpen + '\" readonly><span class=\"invoice-date-sep\" aria-hidden=\"true\">~</span><input id=\"documentEndDate\" class=\"invoice-date-input\" type=\"text\" placeholder=\"结束时间\" value=\"' + esc(endDate) + '\" aria-label=\"开具结束时间\" aria-haspopup=\"dialog\" aria-controls=\"documentDatePicker\" aria-expanded=\"' + documentCalendarOpen + '\" readonly><i data-lucide=\"calendar-days\" aria-hidden=\"true\"></i><div id=\"documentDatePicker\" class=\"invoice-date-picker\" role=\"dialog\" aria-label=\"选择开具时间范围\" aria-hidden=\"' + (!documentCalendarOpen) + '\">' + (documentCalendarOpen ? renderDocumentCalendarPanel() : '') + '</div></div>';\n      }\n\n      function renderApplicationWorkspace() {\n        var rows = filterApplications();\n        var pageSize = applicationPageSize;\n        var pages = Math.max(1, Math.ceil(rows.length / pageSize));\n        applicationPage = Math.min(applicationPage, pages);\n        var pageRows = rows.slice((applicationPage - 1) * pageSize, applicationPage * pageSize);\n        var selectedOnPage = pageRows.filter(function (item) { return selectedApplications.indexOf(item.id) >= 0; }).length;\n        var rowHtml = pageRows.map(function (item) {\n          var attention = item.issuance === 'UNKNOWN' || item.issuance === 'FAILED' || item.delivery === 'DELIVERY_FAILED';\n          return '<tr class=\"' + (attention ? 'row-attention' : '') + '\"><td class=\"invoice-application-select-cell\"><input class=\"invoice-check application-check\" type=\"checkbox\" data-id=\"' + item.id + '\" aria-label=\"选择 ' + esc(item.id) + '\"' + (selectedApplications.indexOf(item.id) >= 0 ? ' checked' : '') + '></td><td class=\"invoice-application-id-cell\"><button type=\"button\" class=\"invoice-btn-link primary-cell\" data-action=\"open-application\" data-id=\"' + item.id + '\">' + esc(item.id) + '</button></td><td class=\"mono\">' + esc(item.created) + '</td><td><span class=\"primary-cell\">' + esc(item.subject) + '</span><div class=\"muted\">' + esc(item.subjectType) + ' · ' + esc(item.source) + '</div></td><td class=\"mono\">' + esc(item.order) + '</td><td>' + esc(item.content) + '</td><td class=\"amount\">' + money(item.amount) + '<div class=\"muted\">税率 ' + esc(item.taxRate) + '</div></td><td>' + badge(deriveApplicationStatus(item)) + '<div class=\"muted\">' + esc(item.status === 'PENDING_REVIEW' ? '可直接审批' : item.assignee) + '</div></td><td>' + badge(item.issuance) + '</td><td>' + badge(item.delivery) + '</td><td><div class=\"actions\">' + (item.status === 'PENDING_REVIEW' ? link('open-application', '审核', ' data-id=\"' + item.id + '\"') : '') + ' ' + ((item.issuance === 'UNKNOWN' || item.issuance === 'FAILED') ? link('query-task', '查询', ' data-id=\"' + item.id + '\"') : '') + ' ' + link('open-application', '详情', ' data-id=\"' + item.id + '\"') + '</div></td></tr>';\n        }).join('');\n        var filterBlock = '<section class=\"invoice-block\"><div class=\"invoice-filter-flow\"><div class=\"invoice-filter-item\"><label for=\"applicationKeyword\">关键词</label><input id=\"applicationKeyword\" class=\"invoice-control\" data-anno=\"11\" maxlength=\"60\" placeholder=\"申请编号 / 订单号 / 购买主体\"></div><div class=\"invoice-filter-item\"><label for=\"applicationSubject\">开票主体</label><input id=\"applicationSubject\" class=\"invoice-control\" maxlength=\"40\" placeholder=\"输入主体名称\"></div><div class=\"invoice-filter-item\"><label for=\"applicationType\">主体类型</label><select id=\"applicationType\" class=\"invoice-control\"><option value=\"\">全部类型</option><option value=\"企业\">企业</option><option value=\"组织\">组织</option><option value=\"个人\">个人</option></select></div><div class=\"invoice-filter-item\"><label for=\"applicationStartDate\">申请时间</label>' + renderApplicationDateRange() + '</div><div class=\"invoice-filter-actions\">' + btn('query-applications', '查询', 'search', 'invoice-btn-primary', ' data-anno=\"12\"') + btn('reset-applications', '重置', 'rotate-ccw', 'invoice-btn-default') + '</div></div></section>';\n        var selection = selectedApplications.length ? '<div class=\"invoice-selection\"><span>已选 <strong class=\"mono\">' + selectedApplications.length + '</strong> 条申请</span><div class=\"invoice-selection-actions\">' + btn('bulk-export-selected', '导出已选（' + selectedApplications.length + '）', 'download', 'invoice-btn-default') + btn('clear-selection', '清除选择', 'x', 'invoice-btn-default') + '</div></div>' : '';\n        var listBlock = '<section class=\"invoice-block\"><div class=\"invoice-list-header\"><h2 class=\"invoice-list-title\">申请列表</h2><span class=\"invoice-list-total\">共 <span class=\"mono\">' + rows.length + '</span> 条</span></div><div class=\"invoice-list-toolbar\">' + renderStatusTabs() + '<div class=\"invoice-list-actions\" data-anno=\"4\">' + btn('refresh', '刷新', 'refresh-cw', 'invoice-btn-default') + btn('bulk-export', '导出', 'download', 'invoice-btn-default') + '</div></div>' + selection + '<div class=\"invoice-table-wrap\" data-anno=\"14\"><table class=\"invoice-table data-table\" aria-label=\"开票申请列表\"><thead><tr><th class=\"invoice-application-select-cell\"><input id=\"applicationSelectAll\" class=\"invoice-check\" type=\"checkbox\" aria-label=\"选择当前页申请\"' + (pageRows.length && selectedOnPage === pageRows.length ? ' checked' : '') + '></th><th class=\"invoice-application-id-cell\">申请编号</th>' + sortHeader('申请时间', 'sort-applications', 'created', applicationSort) + '<th>购买主体</th><th>订单号</th><th>发票内容</th>' + sortHeader('申请金额', 'sort-applications', 'amount', applicationSort) + '<th>派生状态</th><th><span class=\"invoice-th-with-help\">开具状态' + statusHelp('issuance') + '</span></th><th><span class=\"invoice-th-with-help\">交付状态' + statusHelp('delivery') + '</span></th><th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan=\"11\">' + empty('未找到开票申请', '请调整筛选条件后重试。', 'file-search') + '</td></tr>') + '</tbody></table></div>' + paginate(rows.length, applicationPage, pageSize, 'application-page') + '</section>';\n        return filterBlock + listBlock;\n      }\n\n      function filterDocuments() { var keyword = documentFilters.keyword.toLowerCase(); var status = documentFilters.status; var delivery = documentFilters.delivery; var startDate = documentFilters.startDate || ''; var endDate = documentFilters.endDate || ''; return sortRows(documents.filter(function (item) { var issuedDate = /^\\d{4}-\\d{2}-\\d{2}/.test(item.issued) ? item.issued.slice(0, 10) : ''; return (!keyword || (item.invoiceNo + ' ' + item.applicationId + ' ' + item.subject).toLowerCase().indexOf(keyword) >= 0) && (!status || item.document === status) && (!delivery || item.delivery === delivery) && (!startDate || (issuedDate && issuedDate >= startDate)) && (!endDate || (issuedDate && issuedDate <= endDate)); }), documentSort); }\n      function renderDocuments() {\n        var rows = filterDocuments();\n        var size = documentPageSize;\n        var pages = Math.max(1, Math.ceil(rows.length / size));\n        documentPage = Math.min(documentPage, pages);\n        var pageRows = rows.slice((documentPage - 1) * size, documentPage * size);\n        var rowHtml = pageRows.map(function (item) {\n          return '<tr><td><button type=\"button\" class=\"invoice-btn-link primary-cell\" data-action=\"preview-document\" data-id=\"' + item.id + '\">' + esc(item.invoiceNo) + '</button><div class=\"muted\">' + esc(item.id) + '</div></td><td><span class=\"primary-cell\">' + esc(item.subject) + '</span><div class=\"muted\">申请 ' + esc(item.applicationId) + '</div></td><td class=\"amount\">' + money(item.amount) + '<div class=\"muted\">' + esc(item.type) + '</div></td><td>' + statusParameter(item.document) + '</td><td>' + badge(item.file) + '</td><td>' + badge(item.delivery) + '</td><td><span class=\"invoice-status-parameter\">' + esc(item.channel) + '</span></td><td>' + esc(item.recipient) + '</td><td class=\"mono\">' + esc(item.issued) + '</td><td><div class=\"actions\">' + (item.action === 'download' ? link('download-document', '下载', ' data-id=\"' + item.id + '\"') : '') + (item.action === 'resend' ? link('resend-document', '重发', ' data-id=\"' + item.id + '\"') : '') + (item.action === 'query' ? link('query-document', '补拉文件', ' data-id=\"' + item.id + '\"') : '') + link('preview-document', '预览', ' data-id=\"' + item.id + '\"') + '</div></td></tr>';\n        }).join('');\n        var filterBlock = '<section class=\"invoice-block\"><div class=\"invoice-filter-flow\"><div class=\"invoice-filter-item\"><label for=\"documentKeyword\">关键词</label><input id=\"documentKeyword\" class=\"invoice-control\" data-anno=\"30\" placeholder=\"票据号码 / 申请编号 / 主体\"></div><div class=\"invoice-filter-item\"><label for=\"documentStatus\">票据状态</label><select id=\"documentStatus\" class=\"invoice-control\"><option value=\"\">全部票据状态</option><option value=\"ACTIVE\">有效</option><option value=\"RED_PENDING\">红冲处理中</option><option value=\"PARTIALLY_RED\">部分红冲</option><option value=\"FULLY_RED\">已全额红冲</option><option value=\"RED_FAILED\">红冲失败</option></select></div><div class=\"invoice-filter-item\"><label for=\"documentDelivery\">交付状态</label><select id=\"documentDelivery\" class=\"invoice-control\"><option value=\"\">全部交付状态</option><option value=\"NOT_SENT\">未发送</option><option value=\"SENDING\">发送中</option><option value=\"DELIVERED\">已送达</option><option value=\"DELIVERY_FAILED\">交付失败</option><option value=\"PARTIALLY_DELIVERED\">部分送达</option></select></div><div class=\"invoice-filter-item\"><label for=\"documentStartDate\">开具时间</label>' + renderDocumentDateRange() + '</div><div class=\"invoice-filter-actions\">' + btn('query-documents', '查询', 'search', 'invoice-btn-primary') + btn('reset-documents', '重置', 'rotate-ccw', 'invoice-btn-default') + '</div></div></section>';\n        var kpis = '<div class=\"invoice-kpi-grid is-borderless\"><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">有效票据</div><div class=\"invoice-kpi-value\">' + documents.filter(function (item) { return item.document === 'ACTIVE'; }).length + '</div><div class=\"invoice-kpi-note\">可访问票据不重复计金额</div></div><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">待补拉文件</div><div class=\"invoice-kpi-value\">' + documents.filter(function (item) { return item.file === 'NOT_SENT'; }).length + '</div><div class=\"invoice-kpi-note\">文件缺失不等于发送失败</div></div><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">邮件待重发</div><div class=\"invoice-kpi-value\">' + documents.filter(function (item) { return item.action === 'resend'; }).length + '</div><div class=\"invoice-kpi-note\">站内文件不受邮件失败影响</div></div><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">红冲处理中</div><div class=\"invoice-kpi-value\">' + documents.filter(function (item) { return ['RED_PENDING', 'PARTIALLY_RED'].indexOf(item.document) >= 0; }).length + '</div><div class=\"invoice-kpi-note\">按原蓝票占额锁定</div></div><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">今日开具金额</div><div class=\"invoice-kpi-value\">' + money(documents.slice(0, 5).reduce(function (sum, item) { return sum + item.amount; }, 0)) + '</div><div class=\"invoice-kpi-note\">以服务端票据金额为准</div></div></div>';\n        var listBlock = '<section class=\"invoice-block\"><div class=\"invoice-list-header has-actions\"><div class=\"invoice-list-heading\"><h2 class=\"invoice-list-title\">票据列表</h2><span class=\"invoice-list-total\">共 <span class=\"mono\">' + rows.length + '</span> 条</span></div>' + btn('bulk-export-documents', '导出', 'download', 'invoice-btn-default') + '</div><div class=\"invoice-document-summary\">' + kpis + '</div><div class=\"invoice-table-wrap\" data-anno=\"31\"><table class=\"invoice-table data-table\" aria-label=\"票据列表\"><thead><tr><th>票据号码 / 票据 ID</th><th>开票主体</th><th>票面金额</th><th>票据状态</th><th>文件</th><th>交付状态</th><th>交付渠道</th><th>联系邮箱</th>' + sortHeader('开具时间', 'sort-documents', 'issued', documentSort) + '<th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan=\"10\">' + empty('未找到票据', '请调整筛选条件后重试。', 'files') + '</td></tr>') + '</tbody></table></div>' + paginate(rows.length, documentPage, size, 'document-page') + '</section>';\n        return filterBlock + listBlock;\n      }\n\n      function filterRedTasks() { var keyword = String(redFilters.keyword || '').toLowerCase(); var status = redFilters.status; var source = redFilters.source; return redTasks.filter(function (item) { return (!keyword || (item.id + ' ' + item.invoiceNo + ' ' + item.subject + ' ' + item.reason).toLowerCase().indexOf(keyword) >= 0) && (!status || item.status === status) && (!source || item.sourceName === source); }); }\n      function renderRed() { if (redSubtab === 'corrections') return renderCorrections(); var rows = filterRedTasks(); var size = redPageSize; var pages = Math.max(1, Math.ceil(rows.length / size)); redPage = Math.min(redPage, pages); var pageRows = rows.slice((redPage - 1) * size, redPage * size); var rowHtml = pageRows.map(function (item) { var canQuery = item.status === 'UNKNOWN'; var canRetry = item.status === 'FAILED'; return '<tr class=\"' + (canQuery || canRetry ? 'row-attention' : '') + '\"><td><button type=\"button\" class=\"invoice-btn-link primary-cell\" data-action=\"red-detail\" data-id=\"' + item.id + '\">' + esc(item.id) + '</button><div class=\"muted\">' + esc(item.created) + '</div></td><td>' + badge(item.source) + '<div class=\"muted\">' + esc(item.reason) + '</div></td><td><span class=\"primary-cell\">' + esc(item.invoiceNo) + '</span><div class=\"muted\">' + esc(item.subject) + '</div></td><td class=\"amount\">' + money(item.amount) + '<div class=\"muted\">票据 ' + esc(item.progress) + '</div></td><td>' + redTaskBadge(item.status) + '<div class=\"muted\">负责人 ' + esc(item.owner) + '</div></td><td><div class=\"actions\">' + (canQuery ? link('query-red', '查询结果', ' data-id=\"' + item.id + '\"') : '') + (canRetry ? link('retry-red', '确认关闭后重试', ' data-id=\"' + item.id + '\"') : '') + link('red-detail', '详情', ' data-id=\"' + item.id + '\"') + '</div></td></tr>'; }).join(''); return '<section class=\"invoice-block\"><div class=\"invoice-section-actions\"><div class=\"invoice-head-actions\">' + btn('create-correction', '发起财务纠错', 'file-pen-line', 'invoice-btn-default', ' data-anno=\"52\"') + '</div></div><div class=\"invoice-subtabs\"><button type=\"button\" class=\"invoice-config-tab is-active\" data-action=\"red-subtab\" data-value=\"tasks\">红冲任务 <span class=\"mono\">' + redTasks.length + '</span></button><button type=\"button\" class=\"invoice-config-tab\" data-action=\"red-subtab\" data-value=\"corrections\">更正申请 <span class=\"mono\">' + corrections.length + '</span></button></div><div class=\"invoice-filter-flow\"><div class=\"invoice-filter-item\"><label for=\"redKeyword\">关键词</label><input id=\"redKeyword\" class=\"invoice-control\" data-anno=\"50\" placeholder=\"任务号 / 票据号 / 主体\"></div><div class=\"invoice-filter-item\"><label for=\"redStatus\">任务状态</label><select id=\"redStatus\" class=\"invoice-control\"><option value=\"\">全部任务状态</option><option value=\"PENDING\">待处理</option><option value=\"PROCESSING\">红冲中</option><option value=\"UNKNOWN\">结果未知</option><option value=\"PARTIAL\">部分红冲成功</option><option value=\"SUCCEEDED\">已红冲</option><option value=\"FAILED\">红冲失败</option><option value=\"CANCELLED\">已取消</option></select></div><div class=\"invoice-filter-item\"><label for=\"redSource\">红冲来源</label><select id=\"redSource\" class=\"invoice-control\"><option value=\"\">全部来源</option><option>退款红冲</option><option>用户更正</option><option>财务纠错</option></select></div><div class=\"invoice-filter-actions\">' + btn('query-red', '查询', 'search', 'invoice-btn-primary') + btn('reset-red', '重置', 'rotate-ccw', 'invoice-btn-default') + '</div></div><div class=\"invoice-kpi-grid\"><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">待处置任务</div><div class=\"invoice-kpi-value\">' + redTasks.filter(function (item) { return ['SUCCEEDED', 'CANCELLED'].indexOf(item.status) < 0; }).length + '</div><div class=\"invoice-kpi-note\">包含未知与失败</div></div><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">结果未知</div><div class=\"invoice-kpi-value\">' + redTasks.filter(function (item) { return item.status === 'UNKNOWN'; }).length + '</div><div class=\"invoice-kpi-note\">只能查询原任务</div></div><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">金额冻结</div><div class=\"invoice-kpi-value\">' + money(redTasks.filter(function (item) { return ['SUCCEEDED', 'CANCELLED'].indexOf(item.status) < 0; }).reduce(function (sum, item) { return sum + item.amount; }, 0)) + '</div><div class=\"invoice-kpi-note\">失败确认前不释放</div></div><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">退款优先级</div><div class=\"invoice-kpi-value\">REFUND</div><div class=\"invoice-kpi-note\">高于纠错与用户更正</div></div><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">更正申请</div><div class=\"invoice-kpi-value\">' + corrections.length + '</div><div class=\"invoice-kpi-note\">整组红冲后重开草稿</div></div></div><div class=\"invoice-table-wrap\" data-anno=\"51\"><table class=\"invoice-table data-table\" aria-label=\"红冲任务列表\"><thead><tr><th>任务号 / 创建时间</th><th>来源 / 原因</th><th>原蓝票</th><th>红冲金额</th><th>状态 / 负责人</th><th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan=\"6\">' + empty('未找到红冲任务', '请调整筛选条件后重试。', 'rotate-ccw') + '</td></tr>') + '</tbody></table></div>' + paginate(rows.length, redPage, size, 'red-page') + '</section>'; }\n      function renderCorrections() { var rows = corrections; var rowHtml = rows.map(function (item) { return '<tr><td><button type=\"button\" class=\"invoice-btn-link primary-cell\" data-action=\"correction-detail\" data-id=\"' + item.id + '\">' + esc(item.id) + '</button><div class=\"muted\">' + esc(item.created) + '</div></td><td><span class=\"primary-cell\">' + esc(item.subject) + '</span><div class=\"muted\">' + esc(item.applicant) + '</div></td><td>' + esc(item.targets) + '<div class=\"muted\">' + esc(item.reason) + '</div></td><td class=\"amount\">' + money(item.amount) + '</td><td>' + badge(item.status) + '</td><td>' + (item.draft === '—' ? '<span class=\"muted\">—</span>' : '<span class=\"invoice-badge invoice-badge-info\">' + esc(item.draft) + '</span>') + '</td><td><div class=\"actions\">' + link('correction-detail', '详情', ' data-id=\"' + item.id + '\"') + (item.status === 'PENDING_REVIEW' ? link('approve-correction', '通过', ' data-id=\"' + item.id + '\"') + link('reject-correction', '驳回', ' data-id=\"' + item.id + '\"') : '') + '</div></td></tr>'; }).join(''); return '<section class=\"invoice-block\"><div class=\"invoice-section-actions is-leading\"><div class=\"invoice-head-actions\">' + btn('back-red-tasks', '返回红冲任务', 'arrow-left', 'invoice-btn-default') + '</div></div><div class=\"invoice-subtabs\"><button type=\"button\" class=\"invoice-config-tab\" data-action=\"red-subtab\" data-value=\"tasks\">红冲任务 <span class=\"mono\">' + redTasks.length + '</span></button><button type=\"button\" class=\"invoice-config-tab is-active\" data-action=\"red-subtab\" data-value=\"corrections\">更正申请 <span class=\"mono\">' + corrections.length + '</span></button></div><div class=\"invoice-table-wrap\" data-anno=\"52\"><table class=\"invoice-table data-table\" aria-label=\"更正申请列表\"><thead><tr><th>更正申请 / 时间</th><th>受票主体 / 申请人</th><th>目标蓝票 / 原因</th><th>整组金额</th><th>更正状态</th><th>重开草稿</th><th>操作</th></tr></thead><tbody>' + rowHtml + '</tbody></table></div>'+ paginate(rows.length, 1, 20, '') +'</section>'; }\n\n      function configRows() { return configs[configSubtab] || []; }\n      function renderConfig() { var rows = configRows(); var labels = { entities: '开票主体', contents: '发票内容', sku: 'SKU 映射', providers: '第三方服务商', notifications: '通知与 SLA' }; var rowHtml = rows.map(function (item) { var fields = configSubtab === 'entities' ? '<td><span class=\"primary-cell\">' + esc(item.name) + '</span><div class=\"muted\">' + esc(item.type) + ' · 税号 ' + esc(item.taxId) + '</div></td><td>' + esc(item.scope) + '</td><td>' + esc(item.version) + '</td><td>' + statusBadgeText(item.status) + '</td><td>' + esc(item.updated) + '<div class=\"muted\">' + esc(item.operator) + '</div></td>' : configSubtab === 'contents' ? '<td><span class=\"primary-cell\">' + esc(item.label) + '</span><div class=\"muted\">' + esc(item.id) + '</div></td><td>' + esc(item.taxRate) + '</td><td>' + esc(item.types) + '</td><td>' + esc(item.sku) + '</td><td>' + statusBadgeText(item.status) + '<div class=\"muted\">' + esc(item.updated) + '</div></td>' : configSubtab === 'sku' ? '<td><span class=\"primary-cell\">' + esc(item.name) + '</span><div class=\"muted\">' + esc(item.id) + '</div></td><td>' + esc(item.content) + '</td><td>' + esc(item.taxRate) + '</td><td>' + statusBadgeText(item.status) + '</td><td>' + esc(item.updated) + '</td>' : configSubtab === 'providers' ? '<td><span class=\"primary-cell\">' + esc(item.name) + '</span><div class=\"muted\">' + esc(item.id) + '</div></td><td>' + esc(item.env) + '</td><td>' + esc(item.tenant) + '</td><td>' + esc(item.timeout) + '</td><td>' + statusBadgeText(item.status) + '<div class=\"muted\">' + esc(item.updated) + '</div></td>' : '<td><span class=\"primary-cell\">' + esc(item.name) + '</span><div class=\"muted\">' + esc(item.id) + '</div></td><td>' + esc(item.target) + '</td><td>' + esc(item.threshold) + '</td><td>' + esc(item.channel) + '</td><td>' + statusBadgeText(item.status) + '</td>'; return '<tr><td><input class=\"invoice-check config-check\" type=\"checkbox\" data-id=\"' + esc(item.id) + '\" aria-label=\"选择 ' + esc(item.id) + '\"></td>' + fields + '<td><div class=\"actions\">' + link('edit-config', '编辑', ' data-id=\"' + esc(item.id) + '\"') + '</div></td></tr>'; }).join(''); var headers = configSubtab === 'entities' ? '<th>主体名称</th><th>适用范围</th><th>版本</th><th>状态</th><th>更新时间 / 操作人</th>' : configSubtab === 'contents' ? '<th>发票内容</th><th>税率</th><th>票种</th><th>SKU 映射</th><th>状态 / 更新时间</th>' : configSubtab === 'sku' ? '<th>SKU</th><th>发票内容</th><th>税率</th><th>状态</th><th>更新时间</th>' : configSubtab === 'providers' ? '<th>服务商</th><th>环境</th><th>租户</th><th>超时</th><th>状态 / 更新时间</th>' : '<th>规则名称</th><th>通知对象</th><th>阈值</th><th>渠道</th><th>状态</th>'; return '<section class=\"invoice-block\"><div class=\"invoice-section-actions\"><div class=\"invoice-head-actions\">' + btn('new-config', '新增配置', 'plus', 'invoice-btn-default', ' data-anno=\"71\"') + btn('publish-config', '发布变更', 'send', 'invoice-btn-primary') + '</div></div><div class=\"invoice-config-callout\"><i data-lucide=\"shield-check\" class=\"w-4 h-4\"></i><div><strong>配置发布受控</strong>　个人仅可选数电普票；企业 / 组织可选普票或专票。SKU 无映射时，申请不可提交。<div class=\"invoice-config-state\">当前生产版本 v12 · 最近发布 2026-08-18 17:20 · 配置管理员：林财务</div></div></div><div class=\"invoice-subtabs\">' + Object.keys(labels).map(function (key) { return '<button type=\"button\" class=\"invoice-config-tab' + (configSubtab === key ? ' is-active' : '') + '\" data-action=\"config-subtab\" data-value=\"' + key + '\">' + labels[key] + '</button>'; }).join('') + '</div><div class=\"invoice-table-wrap\"><table class=\"invoice-table data-table\" aria-label=\"' + labels[configSubtab] + '配置列表\"><thead><tr><th><span class=\"sr-only\">选择</span></th>' + headers + '<th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan=\"7\">' + empty('暂无配置', '请先新增配置。', 'sliders-horizontal') + '</td></tr>') + '</tbody></table></div>'+ paginate(rows.length, 1, 20, '') +'</section>'; }\n\n      // Synced workspaces keep navigation/filters separate from the result list.\n      function renderRedDataScope() {\n        return '<div class=\"invoice-filter-item\"><span id=\"redDataScopeLabel\" class=\"invoice-filter-name\">数据范围</span><div class=\"invoice-status-tabs invoice-data-scope-tabs\" role=\"tablist\" aria-labelledby=\"redDataScopeLabel\"><button type=\"button\" class=\"invoice-status-tab' + (redSubtab === 'tasks' ? ' is-active' : '') + '\" data-action=\"red-subtab\" data-value=\"tasks\" role=\"tab\" aria-selected=\"' + (redSubtab === 'tasks') + '\">红冲任务</button><button type=\"button\" class=\"invoice-status-tab' + (redSubtab === 'corrections' ? ' is-active' : '') + '\" data-action=\"red-subtab\" data-value=\"corrections\" role=\"tab\" aria-selected=\"' + (redSubtab === 'corrections') + '\">更正申请</button></div></div>';\n      }\n      function renderRedSynced() {\n        var dataScope = renderRedDataScope();\n        if (redSubtab === 'corrections') {\n          var correctionRows = corrections;\n          var correctionHtml = correctionRows.map(function (item) { return '<tr><td><button type=\"button\" class=\"invoice-btn-link primary-cell\" data-action=\"correction-detail\" data-id=\"' + item.id + '\">' + esc(item.id) + '</button><div class=\"muted\">' + esc(item.created) + '</div></td><td><span class=\"primary-cell\">' + esc(item.subject) + '</span><div class=\"muted\">' + esc(item.applicant) + '</div></td><td>' + esc(item.targets) + '<div class=\"muted\">' + esc(item.reason) + '</div></td><td class=\"amount\">' + money(item.amount) + '</td><td>' + badge(item.status) + '</td><td>' + (item.draft === '—' ? '<span class=\"muted\">—</span>' : '<span class=\"invoice-badge invoice-badge-info\">' + esc(item.draft) + '</span>') + '</td><td><div class=\"actions\">' + link('correction-detail', '详情', ' data-id=\"' + item.id + '\"') + (item.status === 'PENDING_REVIEW' ? link('approve-correction', '通过', ' data-id=\"' + item.id + '\"') + link('reject-correction', '驳回', ' data-id=\"' + item.id + '\"') : '') + '</div></td></tr>'; }).join('');\n          return '<section class=\"invoice-block\"><div class=\"invoice-filter-flow\">' + dataScope + '</div></section><section class=\"invoice-block\"><div class=\"invoice-list-header has-actions\"><div class=\"invoice-list-heading\"><h2 class=\"invoice-list-title\">更正申请列表</h2><span class=\"invoice-list-total\">共 <span class=\"mono\">' + correctionRows.length + '</span> 条</span></div><div class=\"invoice-list-actions\">' + btn('refresh', '刷新', 'refresh-cw', 'invoice-btn-default') + btn('export', '导出', 'download', 'invoice-btn-default') + '</div></div><div class=\"invoice-list-divider\"></div><div class=\"invoice-table-wrap\" data-anno=\"52\"><table class=\"invoice-table data-table\" aria-label=\"更正申请列表\"><thead><tr><th>更正申请 / 时间</th><th>受票主体 / 申请人</th><th>目标蓝票 / 原因</th><th>整组金额</th><th>更正状态</th><th>重开草稿</th><th>操作</th></tr></thead><tbody>' + (correctionHtml || '<tr><td colspan=\"7\">' + empty('暂无更正申请', '创建财务纠错后，申请会显示在这里。', 'file-pen-line') + '</td></tr>') + '</tbody></table></div>' + paginate(correctionRows.length, 1, 20, '') + '</section>';\n        }\n        var rows = filterRedTasks();\n        var size = redPageSize;\n        var pages = Math.max(1, Math.ceil(rows.length / size));\n        redPage = Math.min(redPage, pages);\n        var pageRows = rows.slice((redPage - 1) * size, redPage * size);\n        var rowHtml = pageRows.map(function (item) { var canQuery = item.status === 'UNKNOWN'; var canRetry = item.status === 'FAILED'; return '<tr class=\"' + (canQuery || canRetry ? 'row-attention' : '') + '\"><td><button type=\"button\" class=\"invoice-btn-link primary-cell\" data-action=\"red-detail\" data-id=\"' + item.id + '\">' + esc(item.id) + '</button><div class=\"muted\">' + esc(item.created) + '</div></td><td>' + badge(item.source) + '<div class=\"muted\">' + esc(item.reason) + '</div></td><td><span class=\"primary-cell\">' + esc(item.invoiceNo) + '</span><div class=\"muted\">' + esc(item.subject) + '</div></td><td class=\"amount\">' + money(item.amount) + '<div class=\"muted\">票据 ' + esc(item.progress) + '</div></td><td>' + redTaskBadge(item.status) + '</td><td>' + esc(item.owner) + '</td><td><div class=\"actions\">' + (canQuery ? link('query-red', '查询结果', ' data-id=\"' + item.id + '\"') : '') + (canRetry ? link('retry-red', '确认关闭后重试', ' data-id=\"' + item.id + '\"') : '') + link('red-detail', '详情', ' data-id=\"' + item.id + '\"') + '</div></td></tr>'; }).join('');\n        var kpis = '<div class=\"invoice-kpi-grid is-borderless\"><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">待处置任务</div><div class=\"invoice-kpi-value\">' + rows.filter(function (item) { return ['SUCCEEDED', 'CANCELLED'].indexOf(item.status) < 0; }).length + '</div><div class=\"invoice-kpi-note\">包含未知与失败</div></div><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">结果未知</div><div class=\"invoice-kpi-value\">' + rows.filter(function (item) { return item.status === 'UNKNOWN'; }).length + '</div><div class=\"invoice-kpi-note\">只能查询原任务</div></div><div class=\"invoice-kpi\"><div class=\"invoice-kpi-label\">金额冻结</div><div class=\"invoice-kpi-value\">' + money(rows.filter(function (item) { return ['SUCCEEDED', 'CANCELLED'].indexOf(item.status) < 0; }).reduce(function (sum, item) { return sum + item.amount; }, 0)) + '</div><div class=\"invoice-kpi-note\">失败确认前不释放</div></div></div>';\n        var filterBlock = '<section class=\"invoice-block\"><div class=\"invoice-filter-flow\">' + dataScope + '<div class=\"invoice-filter-item\"><label for=\"redKeyword\">关键词</label><input id=\"redKeyword\" class=\"invoice-control\" data-anno=\"50\" placeholder=\"任务号 / 票据号 / 主体\"></div><div class=\"invoice-filter-item\"><label for=\"redStatus\">任务状态</label><select id=\"redStatus\" class=\"invoice-control\"><option value=\"\">全部任务状态</option><option value=\"PENDING\">待处理</option><option value=\"PROCESSING\">红冲中</option><option value=\"UNKNOWN\">结果未知</option><option value=\"PARTIAL\">部分成功</option><option value=\"SUCCEEDED\">已完成</option><option value=\"FAILED\">红冲失败</option></select></div><div class=\"invoice-filter-item\"><label for=\"redSource\">红冲来源</label><select id=\"redSource\" class=\"invoice-control\"><option value=\"\">全部来源</option><option>退款红冲</option><option>用户更正</option><option>财务纠错</option></select></div><div class=\"invoice-filter-actions\">' + btn('query-red', '查询', 'search', 'invoice-btn-primary') + btn('reset-red', '重置', 'rotate-ccw', 'invoice-btn-default') + '</div></div></section>';\n        var listBlock = '<section class=\"invoice-block\"><div class=\"invoice-list-header has-actions\"><div class=\"invoice-list-heading\"><h2 class=\"invoice-list-title\">红冲任务列表</h2><span class=\"invoice-list-total\">共 <span class=\"mono\">' + rows.length + '</span> 条</span></div><div class=\"invoice-list-actions\">' + btn('refresh', '刷新', 'refresh-cw', 'invoice-btn-default') + btn('export', '导出', 'download', 'invoice-btn-default') + btn('create-correction', '发起财务纠错', 'file-pen-line', 'invoice-btn-primary', ' data-anno=\"52\"') + '</div></div><div class=\"invoice-list-divider\"></div><div class=\"invoice-document-summary is-after-divider\">' + kpis + '</div><div class=\"invoice-table-wrap\" data-anno=\"51\"><table class=\"invoice-table data-table\" aria-label=\"红冲任务列表\"><thead><tr><th>任务号 / 创建时间</th><th>来源 / 原因</th><th>原蓝票</th><th>红冲金额</th><th>状态</th><th>负责人</th><th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan=\"7\">' + empty('未找到红冲任务', '请调整筛选条件后重试。', 'rotate-ccw') + '</td></tr>') + '</tbody></table></div>' + paginate(rows.length, redPage, size, 'red-page') + '</section>';\n        return filterBlock + listBlock;\n      }\n\n      function renderConfigSynced() {\n        var rows = configRows();\n        var labels = { entities: '开票主体', contents: '发票内容', sku: 'SKU 映射', providers: '第三方服务商', notifications: '通知与 SLA' };\n        var rowHtml = rows.map(function (item) { var fields = configSubtab === 'entities' ? '<td><span class=\"primary-cell\">' + esc(item.name) + '</span><div class=\"muted\">' + esc(item.type) + ' · 税号 ' + esc(item.taxId) + '</div></td><td>' + esc(item.scope) + '</td><td>' + esc(item.version) + '</td><td>' + statusBadgeText(item.status) + '</td><td>' + esc(item.updated) + '<div class=\"muted\">' + esc(item.operator) + '</div></td>' : configSubtab === 'contents' ? '<td><span class=\"primary-cell\">' + esc(item.label) + '</span><div class=\"muted\">' + esc(item.id) + '</div></td><td>' + esc(item.taxRate) + '</td><td>' + esc(item.types) + '</td><td>' + esc(item.sku) + '</td><td>' + statusBadgeText(item.status) + '<div class=\"muted\">' + esc(item.updated) + '</div></td>' : configSubtab === 'sku' ? '<td><span class=\"primary-cell\">' + esc(item.name) + '</span><div class=\"muted\">' + esc(item.id) + '</div></td><td>' + esc(item.content) + '</td><td>' + esc(item.taxRate) + '</td><td>' + statusBadgeText(item.status) + '</td><td>' + esc(item.updated) + '</td>' : configSubtab === 'providers' ? '<td><span class=\"primary-cell\">' + esc(item.name) + '</span><div class=\"muted\">' + esc(item.id) + '</div></td><td>' + esc(item.env) + '</td><td>' + esc(item.tenant) + '</td><td>' + esc(item.timeout) + '</td><td>' + statusBadgeText(item.status) + '<div class=\"muted\">' + esc(item.updated) + '</div></td>' : '<td><span class=\"primary-cell\">' + esc(item.name) + '</span><div class=\"muted\">' + esc(item.id) + '</div></td><td>' + esc(item.target) + '</td><td>' + esc(item.threshold) + '</td><td>' + esc(item.channel) + '</td><td>' + statusBadgeText(item.status) + '</td>'; return '<tr><td><input class=\"invoice-check config-check\" type=\"checkbox\" data-id=\"' + esc(item.id) + '\" aria-label=\"选择 ' + esc(item.id) + '\"></td>' + fields + '<td><div class=\"actions\">' + link('edit-config', '编辑', ' data-id=\"' + esc(item.id) + '\"') + '</div></td></tr>'; }).join('');\n        var headers = configSubtab === 'entities' ? '<th>主体名称</th><th>适用范围</th><th>版本</th><th>状态</th><th>更新时间 / 操作人</th>' : configSubtab === 'contents' ? '<th>发票内容</th><th>税率</th><th>票种</th><th>SKU 映射</th><th>状态 / 更新时间</th>' : configSubtab === 'sku' ? '<th>SKU</th><th>发票内容</th><th>税率</th><th>状态</th><th>更新时间</th>' : configSubtab === 'providers' ? '<th>服务商</th><th>环境</th><th>租户</th><th>超时</th><th>状态 / 更新时间</th>' : '<th>规则名称</th><th>通知对象</th><th>阈值</th><th>渠道</th><th>状态</th>';\n        var tabs = '<nav class=\"invoice-config-tabs\" role=\"tablist\" aria-label=\"开票配置分类\">' + Object.keys(labels).map(function (key) { return '<button type=\"button\" class=\"invoice-config-tab' + (configSubtab === key ? ' is-active' : '') + '\" data-action=\"config-subtab\" data-value=\"' + key + '\" role=\"tab\" aria-selected=\"' + (configSubtab === key) + '\">' + labels[key] + '</button>'; }).join('') + '</nav>';\n        var contextBlock = '<section class=\"invoice-block invoice-config-top\"><div class=\"invoice-config-filter\"><div class=\"invoice-config-callout\"><i data-lucide=\"shield-check\" class=\"w-4 h-4\"></i><div><strong>配置发布受控</strong>　个人仅可选数电普票；企业 / 组织可选普票或专票。SKU 无映射时，申请不可提交。<div class=\"invoice-config-state\">当前生产版本 v12 · 最近发布 2026-08-18 17:20 · 配置管理员：林财务</div></div></div></div></section>';\n        var navBlock = '<aside class=\"invoice-block invoice-config-nav\" aria-label=\"开票配置分类导航\">' + tabs + '</aside>';\n        var listBlock = '<section class=\"invoice-block invoice-config-list\"><div class=\"invoice-list-header has-actions\"><div class=\"invoice-list-heading\"><h2 class=\"invoice-list-title\">' + labels[configSubtab] + '列表</h2><span class=\"invoice-list-total\">共 <span class=\"mono\">' + rows.length + '</span> 条</span></div><div class=\"invoice-list-actions\">' + btn('new-config', '新增配置', 'plus', 'invoice-btn-default', ' data-anno=\"71\"') + btn('publish-config', '发布变更', 'send', 'invoice-btn-primary') + '</div></div><div class=\"invoice-list-divider\"></div><div class=\"invoice-table-wrap\"><table class=\"invoice-table data-table\" aria-label=\"' + labels[configSubtab] + '配置列表\"><thead><tr><th><span class=\"sr-only\">选择</span></th>' + headers + '<th>操作</th></tr></thead><tbody>' + (rowHtml || '<tr><td colspan=\"7\">' + empty('暂无配置', '请先新增配置。', 'sliders-horizontal') + '</td></tr>') + '</tbody></table></div>' + paginate(rows.length, 1, 20, '') + '</section>';\n        return '<div class=\"invoice-config-page\">' + contextBlock + '<div class=\"invoice-config-workspace\">' + navBlock + listBlock + '</div></div>';\n      }\n      function statusBadgeText(text) { var map = { '已发布': 'success', '草稿': 'warning', '待映射': 'warning', '主用': 'success', '备用': 'info', '已启用': 'success' }; return '<span class=\"invoice-badge invoice-badge-' + (map[text] || 'neutral') + '\">' + esc(text) + '</span>'; }\n      function renderView() {\n        var content = currentTab === 'applications' ? renderApplicationWorkspace() : currentTab === 'documents' ? renderDocuments() : currentTab === 'red' ? renderRedSynced() : renderConfigSynced();\n        view.innerHTML = content.replace(/<section class=\"invoice-block([^\"]*)\">/, function (match, classes) { return '<section class=\"invoice-block' + classes + '\">' + renderPrimaryTabs(); });\n        root.querySelector('.invoice-main').classList.toggle('is-config-view', currentTab === 'config');\n        window.lucide && window.lucide.createIcons();\n        bindStatusHelp();\n        renderAnno();\n      }\n\n      function restoreFilterControls() {\n        var values = currentTab === 'applications' ? { applicationKeyword: applicationFilters.keyword, applicationSubject: applicationFilters.subject, applicationType: applicationFilters.type, applicationStartDate: applicationCalendarOpen ? applicationCalendarStart : applicationFilters.startDate, applicationEndDate: applicationCalendarOpen ? applicationCalendarEnd : applicationFilters.endDate } : currentTab === 'documents' ? { documentKeyword: documentFilters.keyword, documentStatus: documentFilters.status, documentDelivery: documentFilters.delivery, documentStartDate: documentCalendarOpen ? documentCalendarStart : documentFilters.startDate, documentEndDate: documentCalendarOpen ? documentCalendarEnd : documentFilters.endDate } : currentTab === 'red' && redSubtab === 'tasks' ? { redKeyword: redFilters.keyword, redStatus: redFilters.status, redSource: redFilters.source } : {};\n        Object.keys(values).forEach(function (id) { var control = root.querySelector('#' + id); if (control) control.value = values[id]; });\n      }\n      var renderViewBase = renderView;\n      renderView = function () { renderViewBase(); restoreFilterControls(); };\n\n      function openApplication(id) { var item = applications.find(function (row) { return row.id === id; }); if (!item) return; currentApplicationId = id; detailTab = 'overview'; root.querySelector('#invoiceDrawerTitle').textContent = item.id; root.querySelector('#invoiceDrawerMeta').textContent = item.subject + ' · ' + money(item.amount); renderDrawer(item); drawer.hidden = false; document.body.classList.add('invoice-lock-scroll'); window.lucide && window.lucide.createIcons(); renderAnno(); }\n      function renderDrawer(item) { var detail = detailTab === 'overview' ? '<section class=\"invoice-detail-section\"><h3>申请与受票</h3><dl class=\"invoice-detail-grid\"><div class=\"invoice-detail-field\"><dt>申请编号</dt><dd class=\"mono\">' + esc(item.id) + '</dd></div><div class=\"invoice-detail-field\"><dt>申请时间</dt><dd class=\"mono\">' + esc(item.created) + '</dd></div><div class=\"invoice-detail-field\"><dt>购买主体</dt><dd>' + esc(item.subject) + '（' + esc(item.subjectType) + '）</dd></div><div class=\"invoice-detail-field\"><dt>申请人</dt><dd>' + esc(item.applicant) + '</dd></div><div class=\"invoice-detail-field\"><dt>销售主体快照</dt><dd>云登网络科技（上海）有限公司 · 税号 9131**********48</dd></div><div class=\"invoice-detail-field\"><dt>发票类型</dt><dd>' + (item.subjectType === '个人' ? '数电普票' : '数电专票') + '</dd></div><div class=\"invoice-detail-field\"><dt>发票内容</dt><dd>' + esc(item.content) + ' · ' + esc(item.taxRate) + '</dd></div><div class=\"invoice-detail-field\"><dt>收件邮箱</dt><dd>f***@yunstack.cn</dd></div></dl></section><section class=\"invoice-detail-section\"><h3>金额与资格</h3><dl class=\"invoice-detail-grid\"><div class=\"invoice-detail-field\"><dt>本次申请金额</dt><dd class=\"mono\">' + money(item.amount) + '</dd></div><div class=\"invoice-detail-field\"><dt>法币实付净额</dt><dd class=\"mono\">' + money(item.amount + 1200) + '</dd></div><div class=\"invoice-detail-field\"><dt>已确认退款</dt><dd class=\"mono\">¥12.00</dd></div><div class=\"invoice-detail-field\"><dt>有效申请占用</dt><dd class=\"mono\">' + money(item.amount) + '</dd></div></dl></section>' : detailTab === 'orders' ? '<section class=\"invoice-detail-section\"><h3>订单分摊</h3><div class=\"invoice-table-wrap\"><table class=\"invoice-table data-table\"><thead><tr><th>订单号</th><th>商品</th><th>支付方式</th><th>法币实付</th><th>可开票净额</th><th>主体快照</th></tr></thead><tbody><tr><td class=\"mono\">' + esc(item.order) + '</td><td>' + esc(item.content) + '</td><td>' + esc(item.source) + '</td><td class=\"amount\">' + money(item.amount + 1200) + '</td><td class=\"amount\">' + money(item.amount) + '</td><td>上海主体（固化）</td></tr><tr><td class=\"mono\">ORD-20260817-0132</td><td>服务续费</td><td>支付宝</td><td class=\"amount\">¥0.00</td><td class=\"amount\">¥0.00</td><td>不满足法币支付</td></tr></tbody></table></div></section>' : detailTab === 'tasks' ? '<section class=\"invoice-detail-section\"><h3>第三方任务</h3><dl class=\"invoice-detail-grid\"><div class=\"invoice-detail-field\"><dt>ProviderTask</dt><dd class=\"mono\">PT-' + esc(item.id.slice(-4)) + '-01</dd></div><div class=\"invoice-detail-field\"><dt>服务商</dt><dd>百望云 / 生产</dd></div><div class=\"invoice-detail-field\"><dt>受理号</dt><dd class=\"mono\">ACCEPT-20260819-' + esc(item.id.slice(-4)) + '</dd></div><div class=\"invoice-detail-field\"><dt>幂等键</dt><dd class=\"mono\">' + esc(item.id) + ':01</dd></div><div class=\"invoice-detail-field\"><dt>最近响应</dt><dd>' + (item.issuance === 'UNKNOWN' ? '请求超时，结果未知' : '已验签，等待票据文件') + '</dd></div><div class=\"invoice-detail-field\"><dt>允许动作</dt><dd>' + (item.issuance === 'UNKNOWN' ? '按原请求查询' : item.issuance === 'FAILED' ? '确认未受理后重试' : '等待回调') + '</dd></div></dl></section>' : detailTab === 'documents' ? '<section class=\"invoice-detail-section\"><h3>票据与交付</h3><div class=\"invoice-table-wrap\"><table class=\"invoice-table data-table\"><thead><tr><th>票据号</th><th>票据状态</th><th>文件</th><th>交付</th><th>操作</th></tr></thead><tbody>' + documents.filter(function (doc) { return doc.applicationId === item.id; }).map(function (doc) { return '<tr><td class=\"mono\">' + esc(doc.invoiceNo) + '</td><td>' + badge(doc.document) + '</td><td>' + badge(doc.file) + '</td><td>' + badge(doc.delivery) + '</td><td>' + link('preview-document', '预览', ' data-id=\"' + doc.id + '\"') + '</td></tr>'; }).join('') + '</tbody></table></div></section>' : '<section class=\"invoice-detail-section\"><h3>时间线与审计</h3><div class=\"invoice-timeline\"><div class=\"invoice-timeline-item\"><span class=\"invoice-timeline-dot\"></span><time class=\"invoice-timeline-time\">' + esc(item.created) + '</time><span class=\"invoice-timeline-copy\">用户提交申请，服务端冻结可开票金额 <strong>' + money(item.amount) + '</strong>。</span></div><div class=\"invoice-timeline-item\"><span class=\"invoice-timeline-dot\"></span><time class=\"invoice-timeline-time\">2026-08-19 09:46</time><span class=\"invoice-timeline-copy\">系统校验通过：法币支付、履约和 SKU 映射均满足资格。</span></div><div class=\"invoice-timeline-item\"><span class=\"invoice-timeline-dot\"></span><time class=\"invoice-timeline-time\">2026-08-19 09:48</time><span class=\"invoice-timeline-copy\">' + (item.status === 'REJECTED' ? '财务驳回并记录结构化原因。' : item.status === 'PENDING_REVIEW' ? '待审核，可由授权管理员或财务直接提交决定。' : '审核与开具事件已写入 Outbox。') + '</span></div></div></section>'; var tabs = [['overview', '申请与受票'], ['orders', '订单分摊'], ['tasks', '第三方任务'], ['documents', '票据交付'], ['timeline', '时间线审计']]; var stateHtml = '<div class=\"invoice-detail-state-panel\" data-anno=\"90\" role=\"group\" aria-label=\"申请四维状态\"><div class=\"invoice-detail-states\"><div class=\"invoice-detail-state\"><div class=\"invoice-detail-state-label\">申请状态</div><div class=\"invoice-detail-state-value\">' + badge(item.status) + '</div></div><div class=\"invoice-detail-state\"><div class=\"invoice-detail-state-label\">开具状态</div><div class=\"invoice-detail-state-value\">' + badge(item.issuance) + '</div></div><div class=\"invoice-detail-state\"><div class=\"invoice-detail-state-label\">票据状态</div><div class=\"invoice-detail-state-value\">' + badge(item.document) + '</div></div><div class=\"invoice-detail-state\"><div class=\"invoice-detail-state-label\">交付状态</div><div class=\"invoice-detail-state-value\">' + badge(item.delivery) + '</div></div></div></div>'; root.querySelector('#invoiceDrawerBody').innerHTML = '<div class=\"invoice-detail-head\"><div><div class=\"invoice-detail-title\">' + esc(item.subject) + '</div><div class=\"invoice-detail-sub\">订单 ' + esc(item.order) + ' · ' + esc(item.source) + '</div></div><div>' + badge(item.status) + '</div></div>' + stateHtml + '<div class=\"invoice-detail-tabs\" role=\"tablist\">' + tabs.map(function (tab) { return '<button type=\"button\" class=\"invoice-detail-tab' + (detailTab === tab[0] ? ' is-active' : '') + '\" data-action=\"detail-tab\" data-value=\"' + tab[0] + '\" role=\"tab\" aria-selected=\"' + (detailTab === tab[0]) + '\">' + tab[1] + '</button>'; }).join('') + '</div>' + detail; var footer = ''; if (item.status === 'PENDING_REVIEW') footer += '<div class=\"invoice-drawer-footer-note\">待审核，可由授权管理员或财务直接审批；提交时校验当前 version</div><div class=\"invoice-head-actions\" data-anno=\"91\">' + btn('reject-application', '驳回', 'x-circle', 'invoice-btn-danger', ' data-id=\"' + item.id + '\"') + btn('approve-application', '审核通过', 'check-circle-2', 'invoice-btn-primary', ' data-id=\"' + item.id + '\"') + '</div>'; else if (item.issuance === 'UNKNOWN') footer = '<div class=\"invoice-drawer-footer-note\">结果未知，金额继续占用</div><div class=\"invoice-head-actions\">' + btn('query-task', '按原请求查询', 'search-check', 'invoice-btn-primary', ' data-id=\"' + item.id + '\"') + '</div>'; else if (item.issuance === 'FAILED') footer = '<div class=\"invoice-drawer-footer-note\">确认第三方未受理后才可重试</div><div class=\"invoice-head-actions\">' + btn('retry-task', '确认未受理并重试', 'rotate-cw', 'invoice-btn-primary', ' data-id=\"' + item.id + '\"') + '</div>'; else footer = '<div class=\"invoice-drawer-footer-note\">request_id 已写入审计 · version ' + item.version + '</div><div class=\"invoice-head-actions\">' + btn('close-drawer', '关闭', 'x', 'invoice-btn-default') + '</div>'; root.querySelector('#invoiceDrawerFooter').innerHTML = footer; window.lucide && window.lucide.createIcons(); renderAnno(); }\n\n\n      function openDialog(type, payload) { dialogContext = { type: type, payload: payload }; var title = root.querySelector('#invoiceDialogTitle'); var body = root.querySelector('#invoiceDialogBody'); var footer = root.querySelector('#invoiceDialogFooter'); if (type === 'approve') { var item = payload; title.textContent = '审核通过并提交开具'; body.innerHTML = '<p class=\"invoice-dialog-copy\">确认通过申请 <strong>' + esc(item.id) + '</strong>？服务端会再次校验金额、主体快照、票种和 SKU 映射，并在事务内写入 Outbox。</p><div class=\"invoice-config-callout\" style=\"margin-top:14px\"><i data-lucide=\"shield-check\" class=\"w-4 h-4\"></i><div>本次申请金额 <strong>' + money(item.amount) + '</strong> 将继续占用，直到票据成功、失败释放或红冲完成。</div></div>'; footer.innerHTML = btn('confirm-dialog', '确认通过', 'check-circle-2', 'invoice-btn-primary') + btn('close-dialog', '取消', 'x', 'invoice-btn-default'); } else if (type === 'reject') { title.textContent = '驳回开票申请'; body.innerHTML = '<p class=\"invoice-dialog-copy\">驳回后申请不可继续审核，用户修改后将创建新的申请编号并关联 previous_application_id。</p><label for=\"rejectReason\" class=\"invoice-filter-label\">结构化驳回原因</label><textarea id=\"rejectReason\" class=\"invoice-textarea\" maxlength=\"200\" placeholder=\"请输入具体原因，例如：销售主体税号快照缺失\"></textarea><div id=\"dialogError\" class=\"invoice-form-error\" hidden>请填写驳回原因。</div>'; footer.innerHTML = btn('confirm-dialog', '确认驳回', 'x-circle', 'invoice-btn-danger') + btn('close-dialog', '取消', 'x', 'invoice-btn-default'); } else if (type === 'publish') { title.textContent = '发布开票配置'; body.innerHTML = '<p class=\"invoice-dialog-copy\">将发布当前草稿配置到生产。历史申请仍使用支付时固化的销售主体快照。</p><label for=\"publishReason\" class=\"invoice-filter-label\">发布原因</label><textarea id=\"publishReason\" class=\"invoice-textarea\" maxlength=\"200\" placeholder=\"请输入本次配置发布的业务原因\"></textarea><div id=\"dialogError\" class=\"invoice-form-error\" hidden>请填写发布原因。</div>'; footer.innerHTML = btn('confirm-dialog', '确认发布', 'send', 'invoice-btn-primary') + btn('close-dialog', '取消', 'x', 'invoice-btn-default'); } else if (type === 'redRetry') { title.textContent = '确认关闭旧任务并重试'; body.innerHTML = '<p class=\"invoice-dialog-copy\">仅当第三方确认未受理时才允许关闭旧任务。关闭和重试互斥，金额在新任务受理前仍保持冻结。</p><label for=\"retryReason\" class=\"invoice-filter-label\">处置说明</label><textarea id=\"retryReason\" class=\"invoice-textarea\" maxlength=\"200\" placeholder=\"请输入查询凭证或第三方确认信息\"></textarea><div id=\"dialogError\" class=\"invoice-form-error\" hidden>请填写处置说明。</div>'; footer.innerHTML = btn('confirm-dialog', '关闭并重试', 'rotate-cw', 'invoice-btn-primary') + btn('close-dialog', '取消', 'x', 'invoice-btn-default'); } else if (type === 'correction') { title.textContent = '发起财务纠错'; body.innerHTML = '<p class=\"invoice-dialog-copy\">选择已开具的蓝票后，系统会整组占额并串行红冲，全部成功后生成唯一重开草稿。</p><label for=\"correctionInvoice\" class=\"invoice-filter-label\">目标蓝票</label><select id=\"correctionInvoice\" class=\"invoice-control\"><option>数电票-04438145 · 上海云栈信息科技有限公司 · ¥1,400.00</option><option>数电票-04438146 · 上海云栈信息科技有限公司 · ¥1,400.00</option></select><label for=\"correctionReason\" class=\"invoice-filter-label\" style=\"display:block;margin-top:13px\">纠错原因</label><textarea id=\"correctionReason\" class=\"invoice-textarea\" maxlength=\"200\" placeholder=\"请输入可审计的纠错原因\"></textarea><div id=\"dialogError\" class=\"invoice-form-error\" hidden>请填写纠错原因。</div>'; footer.innerHTML = btn('confirm-dialog', '提交纠错申请', 'file-pen-line', 'invoice-btn-primary') + btn('close-dialog', '取消', 'x', 'invoice-btn-default'); } else { title.textContent = '导出任务已创建'; body.innerHTML = '<p class=\"invoice-dialog-copy\">系统已创建异步导出快照。导出内容将按当前数据范围脱敏，完成后可在通知中心下载。</p>'; footer.innerHTML = btn('close-dialog', '知道了', 'check', 'invoice-btn-primary'); } dialog.hidden = false; window.lucide && window.lucide.createIcons(); }\n      function closeDialog() { dialog.hidden = true; dialogContext = null; }\n      function toast(message, type) { var item = document.createElement('div'); item.className = 'invoice-toast' + (type ? ' is-' + type : ''); item.innerHTML = '<i data-lucide=\"' + (type === 'danger' ? 'circle-alert' : type === 'warning' ? 'triangle-alert' : 'circle-check') + '\" class=\"w-4 h-4\"></i><span>' + esc(message) + '</span>'; toastHost.appendChild(item); window.lucide && window.lucide.createIcons(); setTimeout(function () { item.remove(); }, 3200); }\n      function refreshCurrent() { selectedApplications = []; renderView(); toast('当前列表已刷新', 'success'); }\n      function mutateApplication(id, nextStatus) { var item = applications.find(function (row) { return row.id === id; }); if (!item) return; item.status = nextStatus; item.version += 1; if (nextStatus === 'APPROVED') { item.issuance = 'ISSUING'; item.note = '审核通过，已写入 Outbox'; } if (nextStatus === 'REJECTED') { item.note = '财务审核驳回，用户可修改后重新提交'; } }\n      function confirmDialog() { if (!dialogContext) return; var type = dialogContext.type; var payload = dialogContext.payload; var reasonId = type === 'reject' ? 'rejectReason' : type === 'publish' ? 'publishReason' : type === 'redRetry' ? 'retryReason' : type === 'correction' ? 'correctionReason' : ''; if (reasonId && !valueOf(reasonId)) { var error = root.querySelector('#dialogError'); if (error) error.hidden = false; return; } if (type === 'approve') { mutateApplication(payload.id, 'APPROVED'); closeDialog(); renderView(); if (drawer.hidden === false) { var updated = applications.find(function (row) { return row.id === payload.id; }); renderDrawer(updated); } toast('审核通过，已创建唯一开具任务', 'success'); } else if (type === 'reject') { mutateApplication(payload.id, 'REJECTED'); var item = applications.find(function (row) { return row.id === payload.id; }); item.note = valueOf(reasonId); closeDialog(); renderView(); if (!drawer.hidden) { renderDrawer(item); } toast('已驳回申请并记录结构化原因', 'warning'); } else if (type === 'publish') { closeDialog(); toast('配置已发布，版本号已递增并写入审计', 'success'); } else if (type === 'redRetry') { var task = redTasks.find(function (row) { return row.id === payload.id; }); if (task) { task.status = 'PROCESSING'; task.owner = '林财务'; task.reason = valueOf(reasonId); } closeDialog(); renderView(); toast('旧任务已关闭，已创建新的红冲任务', 'success'); } else if (type === 'correction') { corrections.unshift({ id: 'CR-20260819-007', subject: '上海云栈信息科技有限公司', targets: '04438145', amount: 140000, status: 'PENDING_REVIEW', created: '2026-08-19 10:02', applicant: '财务管理员', reason: valueOf(reasonId), draft: '待红冲' }); closeDialog(); redSubtab = 'corrections'; renderView(); toast('更正申请已提交，等待审核', 'success'); } else { closeDialog(); } }\n\n      var toastBase = toast;\n      toast = function (message, type) { if (message !== '审核通过，已创建唯一开具任务') toastBase(message, type); };\n      var openDialogBase = openDialog;\n      openDialog = function (type, payload) {\n        if ((type === 'approve' || type === 'reject') && (!payload || payload.status !== 'PENDING_REVIEW')) {\n          toast('申请状态已变化，请刷新后重新审批', 'warning');\n          return;\n        }\n        if (type === 'redRetry' && payload && String(payload.id || '').indexOf('IA-') === 0) payload.scope = 'issuance';\n        openDialogBase(type, payload);\n        if (type === 'redRetry' && payload && payload.scope === 'issuance') {\n          root.querySelector('#invoiceDialogTitle').textContent = '确认关闭旧开具任务并重试';\n          var copy = root.querySelector('#invoiceDialogBody .invoice-dialog-copy');\n          if (copy) copy.textContent = '仅当第三方确认原请求未受理时才允许关闭旧任务。新尝试沿用原业务幂等键，金额继续占用。';\n        }\n      };\n      var confirmDialogBase = confirmDialog;\n      confirmDialog = function () {\n        if (dialogContext && dialogContext.type === 'redRetry' && dialogContext.payload.scope === 'issuance') {\n          if (!valueOf('retryReason')) { var error = root.querySelector('#dialogError'); if (error) error.hidden = false; return; }\n          var item = applications.find(function (row) { return row.id === dialogContext.payload.id; });\n          if (item) { item.issuance = 'SUBMITTING'; item.note = '原任务确认未受理，已创建新开具尝试'; item.version += 1; }\n          closeDialog();\n          renderView();\n          if (item && !drawer.hidden) renderDrawer(item);\n          toast('旧开具任务已关闭，新的幂等尝试已排队', 'success');\n          return;\n        }\n        var approving = dialogContext && dialogContext.type === 'approve';\n        confirmDialogBase();\n        if (approving && dialog.hidden) toast('审核通过，开具命令已写入队列', 'success');\n      };\n\n      function openPreview(id) { var doc = documents.find(function (row) { return row.id === id; }); if (!doc) return; root.querySelector('#invoicePreviewTitle').textContent = doc.invoiceNo; root.querySelector('#invoicePreviewBody').innerHTML = '<div class=\"invoice-paper\"><h3>电子发票（数电票）</h3><div class=\"invoice-paper-meta\"><span>发票号码：' + esc(doc.invoiceNo) + '</span><span>开票日期：' + esc(doc.issued) + '</span></div><div class=\"invoice-paper-lines\"><div class=\"invoice-paper-line\"><span>购买方</span><span>统一社会信用代码</span><span>金额</span><span>税率</span></div><div class=\"invoice-paper-line\"><span>' + esc(doc.subject) + '</span><span>9131**********48</span><span>' + money(doc.amount) + '</span><span>6%</span></div><div class=\"invoice-paper-line\"><span>销售方</span><span>统一社会信用代码</span><span>开票内容</span><span>票种</span></div><div class=\"invoice-paper-line\"><span>云登网络科技（上海）有限公司</span><span>9131**********48</span><span>信息技术服务*技术服务费</span><span>' + esc(doc.type) + '</span></div></div><div class=\"invoice-paper-total\"><span>价税合计</span><span>' + money(doc.amount) + '</span></div></div>'; preview.hidden = false; window.lucide && window.lucide.createIcons(); }\n      function closePreview() { preview.hidden = true; }\n      function updateSelection(id, checked) { if (checked && selectedApplications.indexOf(id) < 0) selectedApplications.push(id); if (!checked) selectedApplications = selectedApplications.filter(function (value) { return value !== id; }); renderView(); }\n      function renderAnno() { var layer = root.querySelector('#invoiceAnnoLayer'); layer.innerHTML = ''; if (!annoVisible) return; root.querySelectorAll('[data-anno]').forEach(function (target) { var rect = target.getBoundingClientRect(); if (!rect.width || !rect.height || rect.bottom < 0 || rect.top > window.innerHeight) return; var badgeEl = document.createElement('button'); badgeEl.type = 'button'; badgeEl.className = 'invoice-anno-badge'; badgeEl.textContent = target.dataset.anno; badgeEl.style.left = Math.max(2, Math.min(window.innerWidth - 22, rect.right - 9)) + 'px'; badgeEl.style.top = Math.max(2, Math.min(window.innerHeight - 22, rect.top - 8)) + 'px'; badgeEl.addEventListener('click', function (event) { event.stopPropagation(); showAnno(target.dataset.anno); }); layer.appendChild(badgeEl); }); }\n      function showAnno(id) { var item = annotations[id]; if (!item) return; root.querySelector('#invoiceAnnoTitle').textContent = item.title; root.querySelector('#invoiceAnnoBody').innerHTML = item.desc.map(function (line) { return '<p>' + esc(line) + '</p>'; }).join(''); root.querySelector('#invoiceAnnoPopup').hidden = false; }\n      function positionStatusHelp(help) { var button = help.querySelector('button'); var popover = help.querySelector('.invoice-status-help-popover'); if (!button || !popover) return; var rect = button.getBoundingClientRect(); var width = popover.offsetWidth || 292; var left = Math.max(8, Math.min(window.innerWidth - width - 8, rect.left)); popover.style.left = left + 'px'; popover.style.top = '8px'; var height = popover.offsetHeight || 160; var top = rect.bottom + 8; if (top + height > window.innerHeight - 8) top = Math.max(8, rect.top - height - 8); popover.style.top = top + 'px'; }\n      function bindStatusHelp() { root.querySelectorAll('[data-status-help]').forEach(function (help) { var button = help.querySelector('button'); var popover = help.querySelector('.invoice-status-help-popover'); if (!button || !popover) return; help.dataset.open = 'false'; help.dataset.dismissed = 'false'; var overButton = false; var overPopover = false; var focused = false; var closeTimer = null; function open() { if (closeTimer) clearTimeout(closeTimer); help.dataset.dismissed = 'false'; help.dataset.open = 'true'; button.setAttribute('aria-expanded', 'true'); positionStatusHelp(help); } function close() { help.dataset.open = 'false'; button.setAttribute('aria-expanded', 'false'); } function scheduleClose() { if (closeTimer) clearTimeout(closeTimer); closeTimer = setTimeout(function () { if (!overButton && !overPopover && !focused) close(); }, 140); } button.addEventListener('mouseenter', function () { overButton = true; open(); }); button.addEventListener('mouseleave', function () { overButton = false; scheduleClose(); }); button.addEventListener('focus', function () { focused = true; open(); }); button.addEventListener('blur', function () { focused = false; scheduleClose(); }); button.addEventListener('keydown', function (event) { if (event.key === 'Escape') { help.dataset.dismissed = 'true'; close(); button.blur(); } }); button.addEventListener('click', function () { open(); }); popover.addEventListener('mouseenter', function () { overPopover = true; open(); }); popover.addEventListener('mouseleave', function () { overPopover = false; scheduleClose(); }); }); }\n      function closeStatusHelps(except) { root.querySelectorAll('[data-status-help][data-open=\"true\"]').forEach(function (help) { if (except && except.contains(help)) return; help.dataset.open = 'false'; var button = help.querySelector('button'); if (button) button.setAttribute('aria-expanded', 'false'); }); }\n\n      root.addEventListener('click', function (event) {\n        var calendarAction = event.target.closest('[data-calendar-action]');\n        if (calendarAction && root.contains(calendarAction)) {\n          event.preventDefault();\n          event.stopImmediatePropagation();\n          var action = calendarAction.dataset.calendarAction;\n          var calendarScopeNode = calendarAction.closest('[data-calendar-scope]');\n          var calendarScope = calendarScopeNode ? calendarScopeNode.dataset.calendarScope : 'application';\n          var isDocumentCalendar = calendarScope === 'document';\n          if (action === 'previous-year') {\n            if (isDocumentCalendar) { documentCalendarMonth = addCalendarMonths(documentCalendarMonth, -12); updateDocumentCalendar(); }\n            else { applicationCalendarMonth = addCalendarMonths(applicationCalendarMonth, -12); updateApplicationCalendar(); }\n          } else if (action === 'previous-month') {\n            if (isDocumentCalendar) { documentCalendarMonth = addCalendarMonths(documentCalendarMonth, -1); updateDocumentCalendar(); }\n            else { applicationCalendarMonth = addCalendarMonths(applicationCalendarMonth, -1); updateApplicationCalendar(); }\n          } else if (action === 'next-month') {\n            if (isDocumentCalendar) { documentCalendarMonth = addCalendarMonths(documentCalendarMonth, 1); updateDocumentCalendar(); }\n            else { applicationCalendarMonth = addCalendarMonths(applicationCalendarMonth, 1); updateApplicationCalendar(); }\n          } else if (action === 'next-year') {\n            if (isDocumentCalendar) { documentCalendarMonth = addCalendarMonths(documentCalendarMonth, 12); updateDocumentCalendar(); }\n            else { applicationCalendarMonth = addCalendarMonths(applicationCalendarMonth, 12); updateApplicationCalendar(); }\n          } else if (action === 'select-date') {\n            if (isDocumentCalendar) selectDocumentCalendarDate(calendarAction.dataset.date);\n            else selectApplicationCalendarDate(calendarAction.dataset.date);\n          } else if (action === 'clear') {\n            if (isDocumentCalendar) { documentCalendarStart = ''; documentCalendarEnd = ''; updateDocumentCalendar(); }\n            else { applicationCalendarStart = ''; applicationCalendarEnd = ''; updateApplicationCalendar(); }\n          } else if (action === 'cancel') {\n            if (isDocumentCalendar) cancelDocumentCalendar();\n            else cancelApplicationCalendar();\n          } else if (action === 'confirm') {\n            if (isDocumentCalendar) {\n              documentCalendarCommittedStart = documentCalendarStart;\n              documentCalendarCommittedEnd = documentCalendarEnd;\n              closeDocumentCalendar();\n            } else {\n              applicationCalendarCommittedStart = applicationCalendarStart;\n              applicationCalendarCommittedEnd = applicationCalendarEnd;\n              closeApplicationCalendar();\n            }\n          }\n          return;\n        }\n        var trigger = event.target.closest('[data-calendar-trigger]');\n        if (trigger && root.contains(trigger) && !event.target.closest('.invoice-date-picker')) {\n          event.preventDefault();\n          event.stopImmediatePropagation();\n          if (trigger.dataset.calendarScope === 'document') {\n            if (applicationCalendarOpen) cancelApplicationCalendar();\n            if (!documentCalendarOpen) openDocumentCalendar();\n          } else {\n            if (documentCalendarOpen) cancelDocumentCalendar();\n            if (!applicationCalendarOpen) openApplicationCalendar();\n          }\n          return;\n        }\n        if (event.target.closest('.invoice-date-picker')) return;\n        if (applicationCalendarOpen) cancelApplicationCalendar();\n        if (documentCalendarOpen) cancelDocumentCalendar();\n      }, true);\n\n      root.addEventListener('click', function (event) {\n        var target = event.target.closest('[data-action]');\n        if (!target || !root.contains(target)) return;\n        var action = target.dataset.action;\n        var handled = ['application-status', 'query-applications', 'reset-applications', 'query-documents', 'reset-documents', 'reset-red'].indexOf(action) >= 0 || (action === 'query-red' && !target.dataset.id);\n        if (!handled) return;\n        event.preventDefault();\n        event.stopImmediatePropagation();\n        if (action === 'application-status') {\n          applicationStatus = target.dataset.status;\n          selectedApplications = [];\n          applicationPage = 1;\n          renderView();\n        } else if (action === 'query-applications') {\n          var applicationStartDate = valueOf('applicationStartDate');\n          var applicationEndDate = valueOf('applicationEndDate');\n          var datePattern = /^\\d{4}-\\d{2}-\\d{2}$/;\n          if ((applicationStartDate && !datePattern.test(applicationStartDate)) || (applicationEndDate && !datePattern.test(applicationEndDate))) { toast('申请时间格式无效，请选择有效日期', 'warning'); return; }\n          if (applicationStartDate && applicationEndDate && applicationStartDate > applicationEndDate) { toast('申请时间范围无效，请检查开始和结束日期', 'warning'); return; }\n          applicationFilters = { keyword: valueOf('applicationKeyword'), subject: valueOf('applicationSubject'), type: valueOf('applicationType'), startDate: applicationStartDate, endDate: applicationEndDate };\n          applicationCalendarCommittedStart = applicationStartDate;\n          applicationCalendarCommittedEnd = applicationEndDate;\n          selectedApplications = [];\n          applicationPage = 1;\n          renderView();\n          toast('已按当前条件查询申请', 'success');\n        } else if (action === 'reset-applications') {\n          applicationFilters = { keyword: '', subject: '', type: '', startDate: '', endDate: '' };\n          applicationCalendarOpen = false;\n          applicationCalendarStart = '';\n          applicationCalendarEnd = '';\n          applicationCalendarCommittedStart = '';\n          applicationCalendarCommittedEnd = '';\n          applicationCalendarSnapshotStart = '';\n          applicationCalendarSnapshotEnd = '';\n          applicationStatus = 'ALL';\n          selectedApplications = [];\n          applicationPage = 1;\n          renderView();\n          toast('申请筛选已重置');\n        } else if (action === 'query-documents') {\n          var documentStartDate = valueOf('documentStartDate');\n          var documentEndDate = valueOf('documentEndDate');\n          var documentDatePattern = /^\\d{4}-\\d{2}-\\d{2}$/;\n          if ((documentStartDate && !documentDatePattern.test(documentStartDate)) || (documentEndDate && !documentDatePattern.test(documentEndDate))) { toast('开具时间格式无效，请选择有效日期', 'warning'); return; }\n          if (documentStartDate && documentEndDate && documentStartDate > documentEndDate) { toast('开具时间范围无效，请检查开始和结束日期', 'warning'); return; }\n          documentFilters = { keyword: valueOf('documentKeyword'), status: valueOf('documentStatus'), delivery: valueOf('documentDelivery'), startDate: documentStartDate, endDate: documentEndDate };\n          documentCalendarCommittedStart = documentStartDate;\n          documentCalendarCommittedEnd = documentEndDate;\n          documentPage = 1;\n          renderView();\n          toast('已按当前条件查询票据', 'success');\n        } else if (action === 'reset-documents') {\n          documentFilters = { keyword: '', status: '', delivery: '', startDate: '', endDate: '' };\n          documentCalendarOpen = false;\n          documentCalendarStart = '';\n          documentCalendarEnd = '';\n          documentCalendarCommittedStart = '';\n          documentCalendarCommittedEnd = '';\n          documentCalendarSnapshotStart = '';\n          documentCalendarSnapshotEnd = '';\n          documentPage = 1;\n          renderView();\n          toast('票据筛选已重置');\n        } else if (action === 'query-red') {\n          redFilters = { keyword: valueOf('redKeyword'), status: valueOf('redStatus'), source: valueOf('redSource') };\n          redPage = 1;\n          renderView();\n          toast('已按当前条件查询红冲任务', 'success');\n        } else {\n          redFilters = { keyword: '', status: '', source: '' };\n          redPage = 1;\n          renderView();\n          toast('红冲筛选已重置');\n        }\n      }, true);\n      function openCorrectionReviewDialog(action, item) {\n        if (!item || item.status !== 'PENDING_REVIEW') { toast('更正申请状态已变化，请刷新后重新审批', 'warning'); return; }\n        dialogContext = { type: action, payload: item };\n        root.querySelector('#invoiceDialogTitle').textContent = action === 'approveCorrection' ? '通过更正申请' : '驳回更正申请';\n        root.querySelector('#invoiceDialogBody').innerHTML = action === 'approveCorrection'\n          ? '<p class=\"invoice-dialog-copy\">确认通过更正申请 <strong>' + esc(item.id) + '</strong>？系统将按原票顺序在短事务内重校验可红冲余额并创建唯一红冲任务。</p><div class=\"invoice-config-callout\" style=\"margin-top:14px\"><i data-lucide=\"shield-check\" class=\"w-4 h-4\"></i><div>无需领取审批锁；提交按 status=PENDING_REVIEW + version 原子竞争。</div></div>'\n          : '<p class=\"invoice-dialog-copy\">驳回后当前更正申请只读保留；用户修改后需创建关联的新更正申请。</p><label for=\"correctionRejectReason\" class=\"invoice-filter-label\">结构化驳回原因</label><textarea id=\"correctionRejectReason\" class=\"invoice-textarea\" maxlength=\"200\" placeholder=\"请输入具体驳回原因\"></textarea><div id=\"dialogError\" class=\"invoice-form-error\" hidden>请填写驳回原因。</div>';\n        root.querySelector('#invoiceDialogFooter').innerHTML = btn('confirm-dialog', action === 'approveCorrection' ? '确认通过' : '确认驳回', action === 'approveCorrection' ? 'check-circle-2' : 'x-circle', action === 'approveCorrection' ? 'invoice-btn-primary' : 'invoice-btn-danger') + btn('close-dialog', '取消', 'x', 'invoice-btn-default');\n        dialog.hidden = false;\n        window.lucide && window.lucide.createIcons();\n      }\n      function mutateCorrectionReview(item, nextStatus, reason) {\n        if (!item || item.status !== 'PENDING_REVIEW') return false;\n        item.status = nextStatus;\n        item.version = Number(item.version || 1) + 1;\n        item.reviewer = '当前管理员';\n        if (nextStatus === 'APPROVED') {\n          item.draft = '红冲任务待处理';\n          redTasks.unshift({ id: 'RT-' + Date.now().toString().slice(-10), source: 'USER_CORRECTION', sourceName: '用户更正', invoiceNo: '数电票-' + item.targets.split('、')[0], applicationId: item.id, subject: item.subject, amount: item.amount, status: 'PENDING', progress: '0/1', created: new Date().toISOString().slice(0, 16).replace('T', ' '), owner: '—', reason: item.reason });\n        } else {\n          item.reviewReason = reason;\n          item.draft = '—';\n        }\n        return true;\n      }\n      var confirmDialogWithIssuance = confirmDialog;\n      confirmDialog = function () {\n        if (dialogContext && (dialogContext.type === 'approveCorrection' || dialogContext.type === 'rejectCorrection')) {\n          var isReject = dialogContext.type === 'rejectCorrection';\n          var reason = isReject ? valueOf('correctionRejectReason') : '';\n          if (isReject && !reason) { var error = root.querySelector('#dialogError'); if (error) error.hidden = false; return; }\n          var item = dialogContext.payload;\n          if (!mutateCorrectionReview(item, isReject ? 'REJECTED' : 'APPROVED', reason)) { closeDialog(); toast('更正申请已被处理，请刷新查看最新状态', 'warning'); return; }\n          closeDialog(); redSubtab = 'corrections'; renderView();\n          toast(isReject ? '更正申请已驳回并记录原因' : '更正申请已通过，红冲任务已进入待处理队列', isReject ? 'warning' : 'success');\n          return;\n        }\n        confirmDialogWithIssuance();\n      };\n      root.addEventListener('click', function (event) {\n        var target = event.target.closest('[data-action=\"approve-correction\"], [data-action=\"reject-correction\"]');\n        if (!target || !root.contains(target)) return;\n        event.preventDefault(); event.stopImmediatePropagation();\n        var item = corrections.find(function (row) { return row.id === target.dataset.id; });\n        openCorrectionReviewDialog(target.dataset.action === 'approve-correction' ? 'approveCorrection' : 'rejectCorrection', item);\n      }, true);\n\n      root.addEventListener('click', function (event) { if (!event.target.closest('[data-status-help]')) closeStatusHelps(); }, true);\n\n      root.addEventListener('click', function (event) { var target = event.target.closest('[data-action], [data-tab]'); if (!target || !root.contains(target)) return; var action = target.dataset.action; if (target.dataset.tab) { currentTab = target.dataset.tab; selectedApplications = []; renderView(); return; } if (action === 'application-status') { applicationStatus = target.dataset.status; selectedApplications = []; applicationPage = 1; renderView(); } else if (action === 'sort-applications') { toggleSort(applicationSort, target.dataset.sortKey); applicationPage = 1; selectedApplications = []; renderView(); } else if (action === 'sort-documents') { toggleSort(documentSort, target.dataset.sortKey); documentPage = 1; renderView(); } else if (action === 'query-applications') { applicationPage = 1; renderView(); toast('已按当前条件查询申请', 'success'); } else if (action === 'reset-applications') { ['applicationKeyword', 'applicationSubject', 'applicationStartDate', 'applicationEndDate'].forEach(function (id) { var el = root.querySelector('#' + id); if (el) el.value = ''; }); var type = root.querySelector('#applicationType'); if (type) type.value = ''; applicationStatus = 'ALL'; applicationPage = 1; renderView(); toast('申请筛选已重置'); } else if (action === 'application-page') { applicationPage = Number(target.dataset.page); renderView(); } else if (action === 'document-page') { documentPage = Number(target.dataset.page); renderView(); } else if (action === 'red-page') { redPage = Number(target.dataset.page); renderView(); } else if (action === 'open-application') { openApplication(target.dataset.id); } else if (action === 'approve-application') { var approveItem = applications.find(function (item) { return item.id === target.dataset.id; }); if (approveItem) openDialog('approve', approveItem); } else if (action === 'reject-application') { var rejectItem = applications.find(function (item) { return item.id === target.dataset.id; }); if (rejectItem) openDialog('reject', rejectItem); } else if (action === 'close-drawer') { drawer.hidden = true; document.body.classList.remove('invoice-lock-scroll'); renderAnno(); } else if (action === 'detail-tab') { detailTab = target.dataset.value; var detailItem = applications.find(function (item) { return item.id === currentApplicationId; }); if (detailItem) renderDrawer(detailItem); } else if (action === 'query-task' || action === 'query-document' || action === 'query-red') { toast('已提交原任务查询，等待第三方回执', 'success'); } else if (action === 'retry-task') { var retryItem = applications.find(function (item) { return item.id === target.dataset.id; }); if (retryItem) openDialog('redRetry', { id: target.dataset.id }); } else if (action === 'preview-document') { openPreview(target.dataset.id); } else if (action === 'download-document') { toast('下载链接已生成，短时授权 10 分钟有效', 'success'); } else if (action === 'resend-document') { toast('已创建新的交付 Attempt，原票据状态不变', 'success'); } else if (action === 'red-subtab') { redSubtab = target.dataset.value; renderView(); } else if (action === 'back-red-tasks') { redSubtab = 'tasks'; renderView(); } else if (action === 'red-detail') { var task = redTasks.find(function (item) { return item.id === target.dataset.id; }); if (task) openDialog('export', task); } else if (action === 'retry-red') { var redTask = redTasks.find(function (item) { return item.id === target.dataset.id; }); if (redTask) openDialog('redRetry', redTask); } else if (action === 'correction-detail') { var correction = corrections.find(function (item) { return item.id === target.dataset.id; }); if (correction) openDialog('export', correction); } else if (action === 'create-correction') { openDialog('correction'); } else if (action === 'config-subtab') { configSubtab = target.dataset.value; configPage = 1; renderView(); } else if (action === 'publish-config') { openDialog('publish'); } else if (action === 'new-config' || action === 'edit-config') { openDialog('export'); } else if (action === 'refresh') { refreshCurrent(); } else if (action === 'export' || action === 'bulk-export' || action === 'bulk-export-documents' || action === 'bulk-export-selected') { openDialog('export'); } else if (action === 'clear-selection') { selectedApplications = []; renderView(); } else if (action === 'close-dialog') { closeDialog(); } else if (action === 'confirm-dialog') { confirmDialog(); } else if (action === 'close-preview') { closePreview(); } else if (action === 'close-anno') { root.querySelector('#invoiceAnnoPopup').hidden = true; } });\n      root.addEventListener('change', function (event) { var target = event.target; if (target.classList.contains('application-check')) updateSelection(target.dataset.id, target.checked); if (target.id === 'applicationSelectAll') { var rows = filterApplications().slice((applicationPage - 1) * applicationPageSize, applicationPage * applicationPageSize); rows.forEach(function (item) { if (target.checked && selectedApplications.indexOf(item.id) < 0) selectedApplications.push(item.id); if (!target.checked) selectedApplications = selectedApplications.filter(function (value) { return value !== item.id; }); }); renderView(); } });\n      root.addEventListener('keydown', function (event) {\n        if (event.key === 'Escape' && (applicationCalendarOpen || documentCalendarOpen)) {\n          event.preventDefault();\n          if (applicationCalendarOpen) cancelApplicationCalendar();\n          if (documentCalendarOpen) cancelDocumentCalendar();\n          return;\n        }\n        if (event.target.classList.contains('invoice-date-input') && ['Enter', ' ', 'ArrowDown'].indexOf(event.key) >= 0) {\n          event.preventDefault();\n          var dateRange = event.target.closest('[data-calendar-scope]');\n          if (dateRange && dateRange.dataset.calendarScope === 'document') {\n            if (!documentCalendarOpen) openDocumentCalendar();\n          } else if (!applicationCalendarOpen) openApplicationCalendar();\n          return;\n        }\n        var target = event.target.closest('.invoice-page-jump-input');\n        if (!target || event.key !== 'Enter') return;\n        event.preventDefault();\n        var maxPage = Math.max(1, Number(target.max) || 1);\n        var nextPage = Math.max(1, Math.min(maxPage, Number(target.value) || 1));\n        if (target.dataset.pageAction === 'application-page') applicationPage = nextPage;\n        if (target.dataset.pageAction === 'document-page') documentPage = nextPage;\n        if (target.dataset.pageAction === 'red-page') redPage = nextPage;\n        target.value = '1';\n        renderView();\n      });\n      root.addEventListener('focusout', function (event) {\n        if (event.target.classList.contains('invoice-page-jump-input') && !event.target.value) event.target.value = '1';\n      });\n      root.addEventListener('change', function (event) {\n        var target = event.target;\n        if (!target.classList.contains('invoice-page-size-select')) return;\n        var size = Number(target.value);\n        if ([10, 20, 50].indexOf(size) < 0) return;\n        if (target.dataset.scope === 'application') { applicationPageSize = size; applicationPage = 1; }\n        if (target.dataset.scope === 'document') { documentPageSize = size; documentPage = 1; }\n        if (target.dataset.scope === 'red') { redPageSize = size; redPage = 1; }\n        renderView();\n      });\n      root.querySelector('#invoiceAnnoToggle').addEventListener('click', function () { annoVisible = !annoVisible; this.setAttribute('aria-pressed', String(annoVisible)); renderAnno(); });\n      root.querySelector('#invoiceAnnoPopup').addEventListener('click', function (event) { if (event.target === this) this.hidden = true; });\n      drawer.addEventListener('click', function (event) { if (event.target === drawer) { drawer.hidden = true; document.body.classList.remove('invoice-lock-scroll'); renderAnno(); } });\n      dialog.addEventListener('click', function (event) { if (event.target === dialog) closeDialog(); });\n      preview.addEventListener('click', function (event) { if (event.target === preview) closePreview(); });\n      window.addEventListener('keydown', function (event) { if (event.key !== 'Escape') return; if (!root.querySelector('#invoiceAnnoPopup').hidden) root.querySelector('#invoiceAnnoPopup').hidden = true; else if (!preview.hidden) closePreview(); else if (!dialog.hidden) closeDialog(); else if (!drawer.hidden) { drawer.hidden = true; document.body.classList.remove('invoice-lock-scroll'); renderAnno(); } });\n      window.addEventListener('resize', function () { renderAnno(); root.querySelectorAll('[data-status-help][data-open=\"true\"]').forEach(positionStatusHelp); if (applicationCalendarOpen) updateApplicationCalendar(); if (documentCalendarOpen) updateDocumentCalendar(); }); window.addEventListener('scroll', function () { renderAnno(); root.querySelectorAll('[data-status-help][data-open=\"true\"]').forEach(positionStatusHelp); }, true);\n      function selectPrimaryTab(tab) { currentTab = tab; root.querySelectorAll('.invoice-primary-tab').forEach(function (button) { var active = button.dataset.tab === tab; button.classList.toggle('is-active', active); button.setAttribute('aria-selected', String(active)); }); }\n\n      // 红冲重试直接提交；列表与详情共享最新状态。\n      root.__invoiceRedTasks = redTasks;\n      root.__redRetryEvents = {};\n      root.addEventListener('click', function (event) {\n        var target = event.target.closest('[data-action=\"retry-red\"]');\n        if (!target) return;\n        event.preventDefault(); event.stopImmediatePropagation();\n        var task = redTasks.find(function (row) { return row.id === target.dataset.id; });\n        if (!task || task.status !== 'FAILED') { toast('任务状态已变化，请刷新后查看', 'warning'); return; }\n        task.status = 'PROCESSING'; task.progress = '0/1';\n        var now = new Date();\n        var pad = function (n) { return String(n).padStart(2, '0'); };\n        root.__redRetryEvents[task.id] = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes());\n        renderView(); toast('重新发起红冲任务成功', 'success');\n      }, true);\n      root.__invoiceUi = { applications: applications, documents: documents, redTasks: redTasks, renderView: renderView, openDialog: openDialog, corrections: corrections, applicationDateRange: renderApplicationDateRange, bindStatusHelp: bindStatusHelp };\n      var deepLink = new URLSearchParams(window.location.search);\n      var deepApplicationId = deepLink.get('application_id');\n      var deepDocumentId = deepLink.get('document_id');\n      var deepRedTaskId = deepLink.get('red_task_id');\n      var deepCorrectionId = deepLink.get('correction_request_id');\n      renderView();\n      if (deepApplicationId || deepDocumentId || deepRedTaskId || deepCorrectionId) setTimeout(function () {\n        if (deepDocumentId) selectPrimaryTab('documents');\n        else if (deepRedTaskId || deepCorrectionId) { selectPrimaryTab('red'); if (deepCorrectionId) redSubtab = 'corrections'; }\n        else selectPrimaryTab('applications');\n        renderView();\n        if (deepApplicationId && applications.some(function (item) { return item.id === deepApplicationId; })) openApplication(deepApplicationId);\n        else if (deepDocumentId && documents.some(function (item) { return item.id === deepDocumentId; })) openPreview(deepDocumentId);\n        else if (deepRedTaskId && redTasks.some(function (item) { return item.id === deepRedTaskId; })) toast('已定位红冲任务 ' + deepRedTaskId, 'success');\n        else if (deepCorrectionId && corrections.some(function (item) { return item.id === deepCorrectionId; })) toast('已定位更正申请 ' + deepCorrectionId, 'success');\n      }, 0);\n    })();\n  "
  ],
  "usesAnnotations": false,
  "before": [
    "\n(function () {\n  var bundle = window.__YundengInlineBundle;\n  if (!bundle || !Array.isArray(bundle.scripts)) return;\n  bundle.scripts = bundle.scripts.map(function (source) {\n    source = source.replace(\"application('IA-20260819-0012', '上海云栈信息科技有限公司', '企业', 268000, 'PENDING_REVIEW', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-19 09:42', '林财务', 'ORD-20260819-0841', '信息技术服务*技术服务费', '6%', '支付宝', '—', '同主体订单可合并，待核验销售主体快照'),\", \"application('IA-20260819-0012', '上海云栈信息科技有限公司', '企业', 268000, 'PENDING_REVIEW', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-19 09:42', '林财务', 'ORD-20260819-0841', '信息技术服务*技术服务费', '6%', '支付宝', '—', '单订单待审核，待核验销售主体快照'),\");\n    source = source.replace(\"application('IA-20260818-0025', '上海云栈信息科技有限公司', '企业', 418000, 'APPROVED', 'PARTIAL', 'PARTIALLY_RED', 'PARTIALLY_DELIVERED', '2026-08-18 17:26', '林财务', 'ORD-20260816-0337', '信息技术服务*技术服务费', '6%', '支付宝', '林财务', '3 张票据中 1 张红冲处理中'),\", \"application('IA-20260818-0025', '上海云栈信息科技有限公司', '企业', 418000, 'APPROVED', 'SUCCEEDED', 'RED_PENDING', 'PARTIALLY_DELIVERED', '2026-08-18 17:26', '林财务', 'ORD-20260816-0337', '信息技术服务*技术服务费', '6%', '支付宝', '林财务', '单票红冲处理中，邮件待重发'),\");\n    source = source.replace(\"application('IA-20260818-0019', '合肥远见科技有限公司', '企业', 218000, 'DRAFT', 'NOT_SUBMITTED', 'NONE', 'NOT_SENT', '2026-08-18 11:52', '—', 'ORD-20260812-0038', '信息技术服务*技术服务费', '6%', '支付宝', '—', '草稿不占用可开票余额'),\", \"application('IA-20260818-0019', '合肥远见科技有限公司', '企业', 218000, 'APPROVED', 'SUCCEEDED', 'PARTIALLY_RED', 'DELIVERED', '2026-08-18 11:52', '林财务', 'ORD-20260812-0038', '信息技术服务*技术服务费', '6%', '支付宝', '林财务', '原票已红冲部分退款金额，剩余金额仍有效'),\");\n    source = source.replace(\"['applications', '申请管理', 14, '']\", \"['applications', '申请管理', 15, '']\");\n    source = source.replace(\"['PARTIAL', '部分开票异常'], \", '');\n    source = source.replace(\"['PARTIALLY_RED', '已部分红冲']\", \"['PARTIALLY_RED', '部分红冲']\");\n    source = source.replace(\"['FULLY_RED', '已红冲']\", \"['FULLY_RED', '已全额红冲']\");\n    source = source.replace(\"if (item.issuance === 'PARTIAL') return 'PARTIAL'; \", '');\n    source = source.replace(\"PARTIAL: ['部分红冲成功', 'warning']\", \"PARTIAL: ['部分红冲', 'warning']\");\n    source = source.replace(/,?\\s*PARTIALLY_DELIVERED: \\['(?:部分送达|部分渠道送达)', 'warning'\\]/g, '');\n    source = source.replace(/<option value=\"PARTIALLY_DELIVERED\">(?:部分送达|部分渠道送达)<\\/option>/g, '');\n    source = source.replace(/'PARTIALLY_DELIVERED'/g, \"'DELIVERY_FAILED'\");\n    source = source.replace(\"['部分成功', '拆票任务部分成功，失败子任务待处置'],\\n          \", '');\n    source = source.replace(/\\s*\\['(?:部分送达|部分渠道送达)', '[^']*'\\],?/g, '');\n    source = source.replace(\"var scopeNote = kind === 'delivery' ? '<span><b>口径：</b>系统固定按站内、邮件两个交付单元聚合，用户无需选择交付类型</span>' : '';\", \"var scopeNote = kind === 'delivery' ? '<span><b>口径：</b>交付状态仅按邮件发送结果计算</span>' : '';\");\n    source = source.replace(\"['未发送', '票据文件尚未发送']\", \"['未发送', '邮件尚未发送']\");\n    source = source.replace(\"['发送中', '正在按渠道投递']\", \"['发送中', '邮件正在发送']\");\n    source = source.replace(\"['已送达', '全部收件人已收到票据']\", \"['已送达', '邮件已发送成功']\");\n    source = source.replace(\"['交付失败', '当前必达交付单元均失败，需按失败渠道处置']\", \"['交付失败', '邮件发送失败，可更新邮箱后重新发送']\");\n    source = source.replace(\"站内文件可访问，联系邮箱发送失败可重发\", \"邮件发送失败，可更新邮箱后重新发送\");\n    source = source.replace(\"站内文件不受邮件失败影响\", \"交付状态仅按邮件发送结果统计\");\n    source = source.replace(\"同一申请可拆成多个 ProviderTask 或票据，但申请总额不变。\", \"一份申请只关联一个订单和一张发票，开具、票据效力与交付状态仍独立记录。\");\n    source = source.replace(\"全部目标蓝票金额整组原子占额，红冲全部成功后才生成唯一重开草稿。\", \"当前原票按金额原子占额，红冲完成后生成唯一重开申请。\");\n    source = source.replace('value=\"PARTIAL\">部分红冲成功', 'value=\"PARTIAL\">部分红冲');\n    source = source.replace('value=\"PARTIAL\">部分成功', 'value=\"PARTIAL\">部分红冲');\n    source = source.replace(\"'<div class=\\\"muted\\\">票据 ' + esc(item.progress) + '</div>'\", \"'<div class=\\\"muted\\\">' + (item.status === 'PARTIAL' ? '金额部分成功' : '票据 ' + esc(item.progress)) + '</div>'\");\n    source = source.replace(/\\s*\\{ id: 'DOC-20260819-0078', applicationId: 'IA-20260818-0025'[\\s\\S]*?\\n        \\{ id: 'DOC-20260819-0075',/, \"\\n        { id: 'DOC-20260819-0078', applicationId: 'IA-20260818-0025', invoiceNo: '数电票-04438144', subject: '上海云栈信息科技有限公司', amount: 418000, type: '数电专票', document: 'RED_PENDING', delivery: 'DELIVERY_FAILED', file: 'ACTIVE', channel: '邮件', recipient: 'f***@yunstack.cn', issued: '2026-08-18 17:38', provider: '百望云', action: 'resend' },\\n        { id: 'DOC-20260819-0075',\");\n    source = source.replace(\"var documents = [\", \"var documents = [\\n        { id: 'DOC-20260818-0070', applicationId: 'IA-20260818-0019', invoiceNo: '数电票-04437106', subject: '合肥远见科技有限公司', amount: 218000, type: '数电专票', document: 'PARTIALLY_RED', delivery: 'DELIVERED', file: 'ACTIVE', channel: '站内、邮件', recipient: 'finance@yuanjian.cn', issued: '2026-08-18 12:08', provider: '百望云', action: 'download' },\");\n    source = source.replace(/channel: '站内、邮件'/g, \"channel: '邮件'\");\n    source = source.replace(/(\\{ id: 'DOC-20260819-0078'[\\s\\S]*?action: )'red'/, \"$1'resend'\");\n    source = source.replace(\"{ id: 'RT-20260819-004', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04438146', applicationId: 'IA-20260818-0025', subject: '上海云栈信息科技有限公司', amount: 42000\", \"{ id: 'RT-20260819-004', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04438144', applicationId: 'IA-20260818-0025', subject: '上海云栈信息科技有限公司', amount: 42000\");\n    source = source.replace(\"{ id: 'RT-20260819-003', source: 'FINANCE_CORRECTION', sourceName: '财务纠错', invoiceNo: '数电票-04438145', applicationId: 'IA-20260818-0025', subject: '上海云栈信息科技有限公司'\", \"{ id: 'RT-20260819-003', source: 'FINANCE_CORRECTION', sourceName: '财务纠错', invoiceNo: '数电票-04437201', applicationId: 'IA-20260817-0138', subject: '广州云迹科技有限公司'\");\n    source = source.replace(\"{ id: 'RT-20260818-017', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04437106', applicationId: 'IA-20260817-0112', subject: '宁波远舟科技有限公司', amount: 80000, status: 'PARTIAL', progress: '1/2'\", \"{ id: 'RT-20260818-017', source: 'REFUND', sourceName: '退款红冲', invoiceNo: '数电票-04437106', applicationId: 'IA-20260818-0019', subject: '合肥远见科技有限公司', amount: 80000, status: 'PARTIAL', progress: 'AMOUNT_PARTIAL'\");\n    source = source.replace(\"{ id: 'CR-20260819-006', subject: '上海云栈信息科技有限公司', targets: '04438145、04438146', amount: 280000\", \"{ id: 'CR-20260819-006', subject: '上海云栈信息科技有限公司', targets: '04438145', amount: 140000\");\n    source = source.replace(\"item.targets.split('、')[0]\", \"item.targets\");\n    source = source.replace(\"<tr><td class=\\\"mono\\\">ORD-20260817-0132</td><td>服务续费</td><td>支付宝</td><td class=\\\"amount\\\">¥0.00</td><td class=\\\"amount\\\">¥0.00</td><td>不满足法币支付</td></tr>\", '');\n    return source;\n  });\n})();\n"
  ],
  "after": [
    "\n(function () {\n  function installInvoiceDrawerReference() {\n    var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n    if (!root || root.dataset.drawerReferenceReady === 'true') return Boolean(root);\n    var drawer = root.querySelector('#invoiceDrawer');\n    var panel = drawer && drawer.querySelector('.invoice-drawer');\n    var main = root.querySelector('.invoice-main');\n    if (!drawer || !panel || !main) return false;\n    root.dataset.drawerReferenceReady = 'true';\n    panel.tabIndex = -1;\n    var lastFocus = null;\n\n    function rememberDrawerTrigger(event) {\n      var trigger = event.target.closest('[data-action=\"open-application\"]');\n      if (trigger) lastFocus = trigger;\n    }\n    root.addEventListener('pointerdown', rememberDrawerTrigger, true);\n    root.addEventListener('click', rememberDrawerTrigger, true);\n\n    function focusableElements() {\n      return Array.from(panel.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])'))\n        .filter(function (element) { return element.offsetParent !== null; });\n    }\n\n    function syncDrawerState() {\n      var isOpen = !drawer.hidden;\n      if (isOpen && !lastFocus && root.contains(document.activeElement) && !drawer.contains(document.activeElement)) {\n        lastFocus = document.activeElement;\n      }\n      main.inert = isOpen;\n      if (!isOpen) {\n        if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });\n        lastFocus = null;\n        return;\n      }\n      var title = root.querySelector('#invoiceDrawerTitle');\n      var meta = root.querySelector('#invoiceDrawerMeta');\n      if (title && title.textContent !== '开票申请详情') {\n        title.textContent = '开票申请详情';\n      }\n      if (meta) {\n        meta.textContent = '';\n        meta.hidden = true;\n        meta.setAttribute('aria-hidden', 'true');\n      }\n      requestAnimationFrame(function () { panel.focus({ preventScroll: true }); });\n    }\n\n    new MutationObserver(syncDrawerState).observe(drawer, { attributes: true, attributeFilter: ['hidden'] });\n    drawer.addEventListener('keydown', function (event) {\n      if (event.key !== 'Tab' || drawer.hidden) return;\n      var elements = focusableElements();\n      if (!elements.length) {\n        event.preventDefault();\n        panel.focus();\n        return;\n      }\n      var first = elements[0];\n      var last = elements[elements.length - 1];\n      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {\n        event.preventDefault();\n        last.focus();\n      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel)) {\n        event.preventDefault();\n        first.focus();\n      }\n    });\n    window.addEventListener('keydown', function (event) {\n      if (event.key !== 'Escape' || drawer.hidden) return;\n      event.preventDefault();\n      event.stopImmediatePropagation();\n      drawer.hidden = true;\n      document.body.classList.remove('invoice-lock-scroll');\n    }, true);\n    syncDrawerState();\n    return true;\n  }\n\n  if (!installInvoiceDrawerReference()) {\n    var observer = new MutationObserver(function () {\n      if (installInvoiceDrawerReference()) observer.disconnect();\n    });\n    observer.observe(document.body, { childList: true, subtree: true });\n  }\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  if (!root) return;\n  var dialog = root.querySelector('#invoiceDialog');\n  var title = root.querySelector('#invoiceDialogTitle');\n  var footer = root.querySelector('#invoiceDialogFooter');\n  if (!dialog || !title || !footer) return;\n\n  function normalizeDialogFooter() {\n    footer.querySelectorAll('[data-lucide], .lucide').forEach(function (icon) {\n      icon.remove();\n    });\n    var cancel = footer.querySelector('[data-direct-review-close], [data-invoice-config-action=\"cancel\"], [data-action=\"close-dialog\"]');\n    var confirm = footer.querySelector('[data-direct-review-confirm], [data-invoice-config-action=\"save\"], [data-action=\"confirm-dialog\"]');\n    if (cancel && confirm && cancel.nextElementSibling !== confirm) footer.insertBefore(cancel, confirm);\n  }\n\n  function syncDialogType() {\n    var titleText = title.textContent.trim();\n    var isCorrection = titleText === '发起财务纠错';\n    var isRedRetry = titleText === '确认关闭旧任务并重试' || titleText === '确认关闭旧开具任务并重试';\n    var nextType = isCorrection ? 'correction' : isRedRetry ? 'red-retry' : '';\n    if (dialog.dataset.dialogType !== nextType) {\n      if (nextType) dialog.dataset.dialogType = nextType;\n      else delete dialog.dataset.dialogType;\n    }\n    normalizeDialogFooter();\n    removeProductionVersionCopy();\n  }\n\n  function removeProductionVersionCopy() {\n    root.querySelectorAll('.invoice-config-state').forEach(function (element) {\n      element.remove();\n    });\n  }\n\n  function mergeConfigBlocks() {\n    var page = root.querySelector('.invoice-config-page');\n    if (!page) return;\n    page.classList.add('invoice-config-shell');\n    var context = page.querySelector(':scope > .invoice-config-top');\n    var nav = page.querySelector(':scope > .invoice-config-workspace > .invoice-config-nav');\n    var list = page.querySelector(':scope > .invoice-config-workspace > .invoice-config-list');\n    if (context) context.classList.remove('invoice-block');\n    if (nav) nav.classList.remove('invoice-block');\n    if (list) list.classList.remove('invoice-block');\n  }\n\n  function syncSelectionColumnSpacing() {\n    root.querySelectorAll('.invoice-table').forEach(function (table) {\n      var headerRow = table.tHead && table.tHead.rows.length ? table.tHead.rows[0] : null;\n      var headerCells = headerRow ? Array.from(headerRow.cells) : [];\n      var hasSelection = Boolean(headerCells[0] && headerCells[0].querySelector('input[type=\"checkbox\"], input[type=\"radio\"]'));\n      table.querySelectorAll('tbody tr').forEach(function (row) {\n        var cells = Array.from(row.children);\n        var selectionCell = cells[0];\n        if (!selectionCell || !selectionCell.querySelector('input[type=\"checkbox\"], input[type=\"radio\"]')) return;\n        hasSelection = true;\n        selectionCell.classList.add('invoice-selection-cell');\n        if (cells[1]) cells[1].classList.add('invoice-first-field-cell');\n      });\n      if (!hasSelection || !headerCells.length) return;\n      if (headerCells[0]) headerCells[0].classList.add('invoice-selection-cell');\n      if (headerCells[1]) headerCells[1].classList.add('invoice-first-field-cell');\n    });\n  }\n\n  new MutationObserver(function () {\n    syncDialogType();\n    removeProductionVersionCopy();\n    mergeConfigBlocks();\n    syncSelectionColumnSpacing();\n  }).observe(root, { childList: true, subtree: true, characterData: true });\n\n  syncDialogType();\n  removeProductionVersionCopy();\n  mergeConfigBlocks();\n  syncSelectionColumnSpacing();\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  if (!root) return;\n\n  var dialog = root.querySelector('#invoiceDialog');\n  var dialogPanel = dialog && dialog.querySelector('.invoice-dialog');\n  var dialogTitle = root.querySelector('#invoiceDialogTitle');\n  var dialogBody = root.querySelector('#invoiceDialogBody');\n  var dialogFooter = root.querySelector('#invoiceDialogFooter');\n  if (!dialog || !dialogPanel || !dialogTitle || !dialogBody || !dialogFooter) return;\n\n  var configSpecs = {\n    entities: {\n      label: '开票主体',\n      fields: [\n        { id: 'name', label: '主体名称', type: 'text', placeholder: '请输入企业或个人主体名称', errorMessage: '请输入主体名称', required: true },\n        { id: 'taxId', label: '纳税人识别号', type: 'text', placeholder: '请输入纳税人识别号或个人证件号', errorMessage: '请输入纳税人识别号', required: true },\n        { id: 'scope', label: '适用范围', type: 'text', placeholder: '例如：代理服务、API/RPA 服务', errorMessage: '请输入适用范围', required: true },\n        { id: 'provider', label: '服务商', type: 'select', options: ['百望云', '航信云'], required: true },\n        { id: 'types', label: '支持票种', type: 'choice', options: ['数电普票', '数电专票'], required: true }\n      ]\n    },\n    contents: {\n      label: '发票内容',\n      fields: [\n        { id: 'label', label: '展示名称', type: 'text', placeholder: '例如：信息技术服务*技术服务费', errorMessage: '请输入展示名称', required: true },\n        { id: 'standardName', label: '标准名称', type: 'text', placeholder: '请输入税务标准名称', errorMessage: '请输入标准名称', required: true },\n        { id: 'taxCode', label: '税收分类编码', type: 'text', placeholder: '请输入税收分类编码', errorMessage: '请输入税收分类编码', required: true },\n        { id: 'taxRate', label: '税率', type: 'select', options: ['6%', '9%', '13%', '免税'], required: true },\n        { id: 'types', label: '适用票种', type: 'choice', options: ['数电普票', '数电专票'], required: true }\n      ]\n    },\n    sku: {\n      label: 'SKU 映射',\n      fields: [\n        { id: 'skuId', label: 'SKU', type: 'text', placeholder: '请输入 SKU 编号', errorMessage: '请输入 SKU 编号', required: true },\n        { id: 'businessType', label: '业务类型', type: 'select', options: ['代理服务', '平台服务', '增值服务'], required: true },\n        { id: 'seller', label: '开票主体', type: 'select', options: ['云登网络科技（上海）有限公司', '云登信息技术（深圳）有限公司'], required: true },\n        { id: 'content', label: '默认内容', type: 'text', placeholder: '请输入发票内容配置 ID', errorMessage: '请输入默认内容', required: true },\n        { id: 'paymentScope', label: '支付范围', type: 'choice', options: ['法币支付'], required: true }\n      ]\n    },\n    providers: {\n      label: '第三方服务商',\n      fields: [\n        { id: 'name', label: '服务商', type: 'select', options: ['百望云', '航信云'], required: true },\n        { id: 'environment', label: '环境', type: 'select', options: ['生产', '沙箱'], required: true },\n        { id: 'apiVersion', label: '接口版本', type: 'text', placeholder: '例如：v2.1', errorMessage: '请输入接口版本', required: true },\n        { id: 'timeout', label: '请求超时', type: 'select', options: ['15 秒', '30 秒', '60 秒'], required: true },\n        { id: 'capabilities', label: '能力开关', type: 'choice', options: ['蓝票开具', '红冲', '文件补拉'], required: true }\n      ]\n    },\n    notifications: {\n      label: '通知与 SLA',\n      fields: [\n        { id: 'scene', label: '通知场景', type: 'select', options: ['审核超时提醒', '交付失败告警', '第三方 UNKNOWN 告警'], required: true },\n        { id: 'target', label: '接收组', type: 'text', placeholder: '请输入接收人或团队', errorMessage: '请输入接收人或团队', required: true },\n        { id: 'threshold', label: '触发阈值', type: 'text', placeholder: '例如：24 小时', errorMessage: '请输入触发阈值', required: true },\n        { id: 'channels', label: '通知渠道', type: 'choice', options: ['站内通知', '邮件', '短信'], required: true },\n        { id: 'template', label: '模板版本', type: 'text', placeholder: '例如：v3', errorMessage: '请输入模板版本', required: true }\n      ]\n    }\n  };\n\n  var redDetailState = { overlay: null, panel: null, lastFocus: null };\n  var configEditorLastFocus = null;\n\n  function esc(value) {\n    return String(value == null ? '' : value).replace(/[&<>\"']/g, function (char) {\n      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[char];\n    });\n  }\n\n  function activeConfigKey() {\n    var active = root.querySelector('.invoice-config-tabs .invoice-config-tab.is-active');\n    return active && active.dataset.value && configSpecs[active.dataset.value] ? active.dataset.value : 'entities';\n  }\n\n  function fieldMarkup(field, prefix, editValues) {\n    var id = prefix + field.id;\n    var value = editValues[field.id] || '';\n    var required = field.required ? ' required aria-required=\"true\"' : '';\n    var requiredMark = field.required ? '<span class=\"invoice-config-required\" aria-hidden=\"true\">*</span>' : '';\n    var errorId = id + 'Error';\n    var errorMessage = field.errorMessage || '请输入' + field.label;\n    var fieldAttrs = ' data-required=\"' + String(Boolean(field.required)) + '\" data-field-type=\"' + esc(field.type) + '\" data-error-message=\"' + esc(errorMessage) + '\"';\n    var describedBy = field.required ? ' aria-describedby=\"' + esc(errorId) + '\"' : '';\n    var fieldError = field.required ? '<p id=\"' + esc(errorId) + '\" class=\"invoice-config-field-error\" hidden>' + esc(errorMessage) + '</p>' : '';\n    if (field.type === 'choice') {\n      return '<div class=\"invoice-config-editor-field\"' + fieldAttrs + '><label>' + requiredMark + '<span>' + esc(field.label) + '</span></label><div id=\"' + esc(id) + '\" class=\"invoice-config-editor-choice-row\" role=\"group\" aria-label=\"' + esc(field.label) + '\"' + (field.required ? ' aria-required=\"true\"' : '') + describedBy + '>' + field.options.map(function (option, index) {\n        return '<label class=\"invoice-config-editor-choice\"><input type=\"checkbox\" name=\"' + esc(field.id) + '\" value=\"' + esc(option) + '\"' + (index === 0 ? ' checked' : '') + '><span>' + esc(option) + '</span></label>';\n      }).join('') + '</div>' + fieldError + '</div>';\n    }\n    if (field.type === 'select') {\n      return '<div class=\"invoice-config-editor-field\"' + fieldAttrs + '><label for=\"' + esc(id) + '\">' + requiredMark + '<span>' + esc(field.label) + '</span></label><select id=\"' + esc(id) + '\" class=\"invoice-control\"' + required + describedBy + '>' + field.options.map(function (option, index) {\n        return '<option value=\"' + esc(option) + '\"' + (value ? (value === option ? ' selected' : '') : (index === 0 ? ' selected' : '')) + '>' + esc(option) + '</option>';\n      }).join('') + '</select>' + fieldError + '</div>';\n    }\n    return '<div class=\"invoice-config-editor-field\"' + fieldAttrs + '><label for=\"' + esc(id) + '\">' + requiredMark + '<span>' + esc(field.label) + '</span></label><input id=\"' + esc(id) + '\" class=\"invoice-control\" type=\"text\" value=\"' + esc(value) + '\" placeholder=\"' + esc(field.placeholder || '') + '\" maxlength=\"100\"' + required + describedBy + '>' + fieldError + '</div>';\n  }\n\n  function configFieldControl(field) {\n    return field.dataset.fieldType === 'choice' ? field.querySelector('.invoice-config-editor-choice-row') : field.querySelector('.invoice-control');\n  }\n\n  function configFieldHasValue(field) {\n    if (field.dataset.required !== 'true') return true;\n    if (field.dataset.fieldType === 'choice') {\n      return Array.from(field.querySelectorAll('input[type=\"checkbox\"], input[type=\"radio\"]')).some(function (input) { return input.checked; });\n    }\n    var control = field.querySelector('.invoice-control');\n    return Boolean(control && String(control.value || '').trim());\n  }\n\n  function setConfigFieldError(field, visible) {\n    var error = field.querySelector('.invoice-config-field-error');\n    var control = configFieldControl(field);\n    if (error) {\n      error.textContent = field.dataset.errorMessage || '请输入必填内容';\n      error.hidden = !visible;\n    }\n    if (control) {\n      control.classList.toggle('is-error', visible);\n      control.setAttribute('aria-invalid', String(visible));\n    }\n  }\n\n  function validateConfigField(field) {\n    var valid = configFieldHasValue(field);\n    setConfigFieldError(field, !valid);\n    return valid;\n  }\n\n  function validateConfigForm(form) {\n    var invalidFields = Array.from(form.querySelectorAll('.invoice-config-editor-field[data-required=\"true\"]')).filter(function (field) {\n      return !validateConfigField(field);\n    });\n    if (!invalidFields.length) return true;\n    var firstControl = configFieldControl(invalidFields[0]);\n    if (firstControl) {\n      var focusTarget = firstControl.matches('input,select,textarea,button,[tabindex]') ? firstControl : firstControl.querySelector('input,select,textarea,button,[tabindex]');\n      if (focusTarget) focusTarget.focus();\n    }\n    return false;\n  }\n\n  function clearResolvedConfigFieldError(event) {\n    var field = event.target.closest('.invoice-config-editor-field[data-required=\"true\"]');\n    if (field && configFieldHasValue(field)) setConfigFieldError(field, false);\n  }\n\n  function readEditValues(target) {\n    var values = {};\n    var row = target && target.closest('tr');\n    if (!row) return values;\n    var cells = Array.from(row.children).map(function (cell) { return cell.textContent.trim(); });\n    values.name = cells[1] || '';\n    values.label = cells[1] || '';\n    values.skuId = cells[1] || '';\n    values.scene = cells[1] || '';\n    values.provider = cells[2] || '';\n    values.scope = cells[2] || '';\n    values.content = cells[2] || '';\n    values.target = cells[2] || '';\n    return values;\n  }\n\n  function showConfigEditor(target, editing) {\n    var key = activeConfigKey();\n    var spec = configSpecs[key];\n    var editValues = editing ? readEditValues(target) : {};\n    dialog.hidden = true;\n    dialog.classList.add('invoice-config-editor-overlay');\n    dialogPanel.classList.add('invoice-dialog-wide', 'invoice-config-editor-dialog');\n    dialog.removeAttribute('data-dialog-type');\n    configEditorLastFocus = target;\n    dialogTitle.textContent = (editing ? '编辑' : '新增') + spec.label + '配置';\n    dialogBody.innerHTML = '<form id=\"invoiceConfigEditorForm\" class=\"invoice-config-editor-form\" novalidate>' + spec.fields.map(function (field) { return fieldMarkup(field, 'invoiceConfigEditor_', editValues); }).join('') + '<p class=\"invoice-config-editor-help\">保存后先生成草稿，发布前仍需完成配置校验与影响预览。</p></form>';\n    dialogFooter.innerHTML = '<button type=\"button\" class=\"invoice-btn invoice-btn-default\" data-invoice-config-action=\"cancel\">取消</button><button type=\"button\" class=\"invoice-btn invoice-btn-primary\" data-invoice-config-action=\"save\">保存草稿</button>';\n    dialog.hidden = false;\n    document.body.classList.add('invoice-lock-scroll');\n    window.lucide && window.lucide.createIcons();\n    var first = dialogBody.querySelector('input,select');\n    if (first) first.focus();\n    var form = dialogBody.querySelector('#invoiceConfigEditorForm');\n    if (form) {\n      form.addEventListener('input', clearResolvedConfigFieldError);\n      form.addEventListener('change', clearResolvedConfigFieldError);\n    }\n  }\n\n  function closeConfigEditor(restoreFocus) {\n    dialog.hidden = true;\n    dialog.classList.remove('invoice-config-editor-overlay');\n    dialogPanel.classList.remove('invoice-dialog-wide', 'invoice-config-editor-dialog');\n    dialog.removeAttribute('data-dialog-type');\n    document.body.classList.remove('invoice-lock-scroll');\n    if (restoreFocus !== false && configEditorLastFocus && document.contains(configEditorLastFocus)) {\n      configEditorLastFocus.focus({ preventScroll: true });\n    }\n    configEditorLastFocus = null;\n  }\n\n  function showLocalToast(message, type) {\n    var toast = document.createElement('div');\n    toast.className = 'invoice-action-toast' + (type ? ' is-' + type : '');\n    toast.setAttribute('role', 'status');\n    toast.textContent = message;\n    root.appendChild(toast);\n    setTimeout(function () { toast.remove(); }, 2800);\n  }\n\n  function readDetailRow(target, kind) {\n    var row = target && target.closest('tr');\n    var cells = row ? Array.from(row.children).filter(function (cell) { return !cell.dataset.teamColumn; }) : [];\n    if (kind === 'correction' && row && row.querySelector('[data-team-column=applicant]')) { var headers = Array.from(row.closest('table').tHead.rows[0].cells).map(function (th) { var copy=th.cloneNode(true); copy.querySelectorAll('.invoice-status-help').forEach(function (n) { n.remove(); }); return copy.textContent.trim(); }); cells = ['更正申请号','原蓝票类型','原蓝票抬头','原蓝票号码','开票金额','更正类型','更正项','更正原因','变更后信息','重开申请单号','处理状态','申请人','申请时间','操作'].map(function (name) { return row.cells[headers.indexOf(name)]; }); }\n    var text = function (index) { return cells[index] ? cells[index].textContent.trim() : '—'; };\n    var muted = function (index) { var item = cells[index] && cells[index].querySelector('.muted'); return item ? item.textContent.trim() : '—'; };\n    var primary = function (index) {\n      if (!cells[index]) return '—';\n      var clone = cells[index].cloneNode(true);\n      clone.querySelectorAll('.muted').forEach(function (item) { item.remove(); });\n      return clone.textContent.trim() || '—';\n    };\n    if (kind === 'correction') {\n      if (cells.length === 14) {\n        return { id: target.dataset.id, created: primary(12), subject: primary(2), target: primary(3), amount: primary(4), status: primary(10), draft: primary(9), applicant: primary(11), reason: primary(7), type: primary(1), changes: primary(6), changed: primary(8) };\n      }\n      if (cells.length >= 12) {\n        var status = primary(7);\n        var reopenId = primary(10);\n        var draft = reopenId !== '—' ? reopenId : status === '待审核' ? '待红冲' : status === '红冲失败' ? '待处置' : status === '审核通过' ? '红冲任务待处理' : '—';\n        return { id: target.dataset.id, created: primary(1), subject: primary(2), target: primary(4), amount: primary(6), status: status, draft: draft, applicant: primary(3), reason: primary(5) };\n      }\n      return { id: target.dataset.id, created: muted(0), subject: primary(1), target: primary(2), amount: primary(3), status: primary(4), draft: primary(5), applicant: muted(1), reason: muted(2) };\n    }\n    if (kind === 'task' && cells.length === 10) {\n      var task = (root.__invoiceRedTasks || []).find(function (item) { return item.id === target.dataset.id; });\n      return { id: target.dataset.id, created: row.dataset.redCreated || (task && task.created) || '—',\n        source: primary(1), reason: primary(2), blueType: primary(3), subject: primary(4),\n        invoice: primary(5), amount: primary(6), status: primary(7), owner: primary(8), progress: primary(7) };\n    }\n    var progress = muted(3);\n    if (progress === '—') progress = primary(4);\n    return { id: target.dataset.id, created: muted(0), source: cells[1] && cells[1].querySelector('.invoice-badge') ? cells[1].querySelector('.invoice-badge').textContent.trim() : primary(1), reason: muted(1), invoice: primary(2), subject: muted(2), amount: primary(3), progress: progress, status: primary(4), owner: primary(5) };\n  }\n\n  function ensureRedDetailDrawer() {\n    if (redDetailState.overlay) return redDetailState.overlay;\n    var overlay = document.createElement('div');\n    overlay.id = 'invoiceRedDetailDrawer';\n    overlay.className = 'invoice-red-detail-overlay';\n    overlay.hidden = true;\n    overlay.innerHTML = '<aside class=\"invoice-red-detail-drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"invoiceRedDetailTitle\" tabindex=\"-1\"><header class=\"invoice-red-detail-header\"><h2 id=\"invoiceRedDetailTitle\">红冲任务详情</h2><button type=\"button\" class=\"icon-btn\" data-invoice-red-detail-action=\"close\" aria-label=\"关闭红冲详情\"><i data-lucide=\"x\" class=\"w-5 h-5\"></i></button></header><div class=\"invoice-red-detail-body\" id=\"invoiceRedDetailBody\"></div><footer class=\"invoice-red-detail-footer\"><button type=\"button\" class=\"invoice-btn invoice-btn-default\" data-invoice-red-detail-action=\"close\">关闭</button></footer></aside>';\n    root.appendChild(overlay);\n    redDetailState.overlay = overlay;\n    redDetailState.panel = overlay.querySelector('.invoice-red-detail-drawer');\n    overlay.addEventListener('click', function (event) { if (event.target === overlay) closeRedDetail(); });\n    window.lucide && window.lucide.createIcons();\n    return overlay;\n  }\n\n  function detailField(label, value, mono) {\n    return '<div class=\"invoice-red-detail-field\"><dt>' + esc(label) + '</dt><dd' + (mono ? ' class=\"mono\"' : '') + '>' + esc(value || '—') + '</dd></div>';\n  }\n\n\n  function redTaskTimeline(data) {\n    var events = [{ action: '创建红冲任务', time: data.created, copy: data.reason }];\n    var retriedAt = (root.__redRetryEvents || {})[data.id];\n    if (retriedAt) events.push({ action: '重新发起红冲', time: retriedAt, copy: '红冲任务已重新提交，等待处理结果。' });\n    else if (data.status !== '待处理') {\n      var copies = { '红冲失败': '红冲未成功，可点击重试重新发起任务。', '结果未知': '暂未取得最终结果，需查询原任务。',\n        '红冲中': '红冲请求已提交，正在等待处理结果。', '已红冲': '本次红冲已完成。', '部分红冲': '本次红冲金额已处理，原蓝票仍有剩余有效金额。',\n        '已取消': '本次红冲任务已取消。' };\n      events.push({ action: data.status, time: '—', copy: copies[data.status] || '等待任务状态更新。' });\n    }\n    return '<section class=\"invoice-red-detail-section\"><h3>处理时间线</h3><ol class=\"invoice-process-timeline\">' + events.map(function (item) {\n      return '<li><div class=\"invoice-process-timeline-head\"><strong class=\"invoice-process-timeline-action\">' + esc(item.action) + '</strong><time class=\"invoice-process-timeline-time\">' + esc(item.time) + '</time></div><p class=\"invoice-process-timeline-copy\">' + esc(item.copy) + '</p></li>';\n    }).join('') + '</ol></section>';\n  }\n  function showRedDetail(target, kind) {\n    var overlay = ensureRedDetailDrawer();\n    var data = readDetailRow(target, kind);\n    var isCorrection = kind === 'correction';\n    var title = isCorrection ? '更正申请详情' : '红冲任务详情';\n    if (dialog.classList.contains('invoice-config-editor-overlay')) closeConfigEditor(false);\n    else dialog.hidden = true;\n    var body = isCorrection\n      ? '<section class=\"invoice-red-detail-section\"><h3>申请信息</h3><dl class=\"invoice-red-detail-grid\">' + detailField('申请编号', data.id, true) + detailField('申请时间', data.created, true) + detailField('受票主体', data.subject) + detailField('申请人', data.applicant) + detailField('原蓝票类型', data.type) + detailField('原蓝票号码', data.target, true) + detailField('更正项', data.changes) + detailField('变更后信息', data.changed) + detailField('更正原因', data.reason) + '</dl></section><section class=\"invoice-red-detail-section\"><h3>审核与重开</h3><dl class=\"invoice-red-detail-grid\">' + detailField('更正金额', data.amount, true) + detailField('更正状态', data.status) + detailField('重开申请单号', data.draft, true) + detailField('处理说明', data.status === '待审核' ? '等待更正审核员处理' : '按关联红冲任务事实推进') + '</dl></section>'\n      : '<section class=\"invoice-red-detail-section\"><h3>任务信息</h3><dl class=\"invoice-red-detail-grid\">' + detailField('任务编号', data.id, true) + detailField('创建时间', data.created, true) + detailField('来源类型', data.source) + detailField('来源原因', data.reason) + detailField('负责人', data.owner) + detailField('任务状态', data.status) + '</dl></section><section class=\"invoice-red-detail-section\"><h3>原票与金额</h3><dl class=\"invoice-red-detail-grid\">' + detailField('原蓝票类型', data.blueType) + detailField('原蓝票抬头', data.subject) + detailField('原蓝票号码', data.invoice, true) + detailField('目标金额', data.amount, true) + detailField('红冲进度', data.progress, true) + detailField('确认状态', data.status === '待受票方确认' ? '待受票方确认' : '无需受票方确认') + detailField('第三方进度', data.status === '结果未知' ? '结果未知，仅允许查询原任务' : '按任务状态持续同步') + '</dl></section>' + redTaskTimeline(data) + '';\n    overlay.querySelector('#invoiceRedDetailTitle').textContent = title;\n    overlay.querySelector('#invoiceRedDetailBody').innerHTML = body;\n    overlay.hidden = false;\n    redDetailState.lastFocus = target;\n    document.body.classList.add('invoice-lock-scroll');\n    redDetailState.panel.focus({ preventScroll: true });\n    window.lucide && window.lucide.createIcons();\n  }\n\n  function closeRedDetail() {\n    if (!redDetailState.overlay || redDetailState.overlay.hidden) return;\n    redDetailState.overlay.hidden = true;\n    document.body.classList.remove('invoice-lock-scroll');\n    if (redDetailState.lastFocus && document.contains(redDetailState.lastFocus)) redDetailState.lastFocus.focus({ preventScroll: true });\n    redDetailState.lastFocus = null;\n  }\n\n  root.addEventListener('click', function (event) {\n    var target = event.target.closest('[data-action], [data-invoice-config-action], [data-invoice-red-detail-action]');\n    if (!target || !root.contains(target)) return;\n    var configAction = target.dataset.invoiceConfigAction;\n    var redDetailAction = target.dataset.invoiceRedDetailAction;\n    var action = target.dataset.action;\n    var closingConfigEditor = action === 'close-dialog' && dialog.classList.contains('invoice-config-editor-overlay');\n    if (configAction === 'save' || configAction === 'cancel' || closingConfigEditor || redDetailAction === 'close' || action === 'new-config' || action === 'edit-config' || action === 'red-detail' || action === 'correction-detail') {\n      event.preventDefault();\n      event.stopImmediatePropagation();\n      if (configAction === 'cancel' || closingConfigEditor) { closeConfigEditor(); return; }\n      if (configAction === 'save') {\n        var form = root.querySelector('#invoiceConfigEditorForm');\n        if (form && !validateConfigForm(form)) return;\n        closeConfigEditor();\n        showLocalToast('配置草稿已保存，发布前请完成校验与影响预览', 'success');\n        return;\n      }\n      if (redDetailAction === 'close') { closeRedDetail(); return; }\n      if (action === 'new-config') { showConfigEditor(target, false); return; }\n      if (action === 'edit-config') { showConfigEditor(target, true); return; }\n      if (action === 'red-detail') { showRedDetail(target, 'task'); return; }\n      if (action === 'correction-detail') { showRedDetail(target, 'correction'); return; }\n    }\n  }, true);\n\n  dialog.addEventListener('click', function (event) {\n    if (event.target !== dialog || !dialog.classList.contains('invoice-config-editor-overlay')) return;\n    event.preventDefault();\n    event.stopImmediatePropagation();\n    closeConfigEditor();\n  }, true);\n\n  window.addEventListener('keydown', function (event) {\n    if (event.key === 'Tab' && !dialog.hidden && dialog.classList.contains('invoice-config-editor-overlay')) {\n      var focusable = Array.from(dialogPanel.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])')).filter(function (element) {\n        return element.offsetParent !== null;\n      });\n      if (!focusable.length) return;\n      var first = focusable[0];\n      var last = focusable[focusable.length - 1];\n      if (event.shiftKey && document.activeElement === first) {\n        event.preventDefault();\n        last.focus();\n      } else if (!event.shiftKey && document.activeElement === last) {\n        event.preventDefault();\n        first.focus();\n      }\n      return;\n    }\n    if (event.key !== 'Escape') return;\n    if (redDetailState.overlay && !redDetailState.overlay.hidden) {\n      event.preventDefault();\n      event.stopImmediatePropagation();\n      closeRedDetail();\n      return;\n    }\n    if (!dialog.hidden && dialog.classList.contains('invoice-config-editor-overlay')) {\n      event.preventDefault();\n      event.stopImmediatePropagation();\n      closeConfigEditor();\n    }\n  }, true);\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  if (!root) return;\n\n  /* Single-order invoices do not expose multi-order aggregation controls. */\n  var applicationOrders = {};\n  var popover = null;\n  var activeButton = null;\n  var closeTimer = null;\n\n  function esc(value) {\n    return String(value == null ? '' : value).replace(/[&<>\"']/g, function (char) {\n      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[char];\n    });\n  }\n\n  function ensurePopover() {\n    if (popover) return popover;\n    popover = document.createElement('div');\n    popover.id = 'invoiceOrderPopover';\n    popover.className = 'invoice-order-popover';\n    popover.setAttribute('role', 'tooltip');\n    popover.hidden = true;\n    document.body.appendChild(popover);\n    popover.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });\n    popover.addEventListener('mouseleave', scheduleClose);\n    return popover;\n  }\n\n  function positionPopover() {\n    if (!popover || popover.hidden || !activeButton) return;\n    var rect = activeButton.getBoundingClientRect();\n    var width = popover.offsetWidth;\n    var height = popover.offsetHeight;\n    var left = Math.min(Math.max(16, rect.left), Math.max(16, window.innerWidth - width - 16));\n    var top = rect.bottom + 8;\n    if (top + height > window.innerHeight - 16) top = Math.max(16, rect.top - height - 8);\n    popover.style.left = left + 'px';\n    popover.style.top = top + 'px';\n  }\n\n  function showPopover(button) {\n    var orders = applicationOrders[button.dataset.applicationId] || [];\n    if (orders.length < 2) return;\n    clearTimeout(closeTimer);\n    var tip = ensurePopover();\n    activeButton = button;\n    tip.innerHTML = '<p class=\"invoice-order-popover-title\">全部订单号（' + orders.length + ' 笔）</p><ul class=\"invoice-order-popover-list\">' + orders.map(function (order) { return '<li>' + esc(order) + '</li>'; }).join('') + '</ul>';\n    tip.hidden = false;\n    button.setAttribute('aria-expanded', 'true');\n    button.setAttribute('aria-controls', tip.id);\n    positionPopover();\n  }\n\n  function scheduleClose() {\n    clearTimeout(closeTimer);\n    closeTimer = setTimeout(hidePopover, 120);\n  }\n\n  function hidePopover() {\n    if (popover) popover.hidden = true;\n    if (activeButton) activeButton.setAttribute('aria-expanded', 'false');\n    activeButton = null;\n  }\n\n  function renderMultiOrderCells() {\n    if (activeButton && !document.contains(activeButton)) hidePopover();\n    var table = root.querySelector('table[aria-label=\"开票申请列表\"]');\n    if (!table) return;\n    table.querySelectorAll('tbody tr').forEach(function (row) {\n      var idButton = row.querySelector('[data-action=\"open-application\"]');\n      var applicationId = idButton && idButton.dataset.id;\n      var orders = applicationOrders[applicationId];\n      var cell = row.children[4];\n      if (!orders || orders.length < 2 || !cell || cell.dataset.multiOrderReady === applicationId) return;\n      cell.dataset.multiOrderReady = applicationId;\n      cell.classList.add('invoice-order-cell');\n      cell.innerHTML = '<span class=\"invoice-order-primary\">' + esc(orders[0]) + '</span><button type=\"button\" class=\"invoice-order-more\" data-order-more=\"true\" data-application-id=\"' + esc(applicationId) + '\" aria-label=\"查看 ' + orders.length + ' 笔订单号\" aria-expanded=\"false\">+' + (orders.length - 1) + '</button>';\n    });\n  }\n\n  root.addEventListener('mouseenter', function (event) {\n    var button = event.target.closest('[data-order-more]');\n    if (button && root.contains(button)) showPopover(button);\n  }, true);\n  root.addEventListener('mouseleave', function (event) {\n    var button = event.target.closest('[data-order-more]');\n    if (button && root.contains(button) && !event.relatedTarget?.closest?.('#invoiceOrderPopover')) scheduleClose();\n  }, true);\n  root.addEventListener('focusin', function (event) {\n    var button = event.target.closest('[data-order-more]');\n    if (button && root.contains(button)) showPopover(button);\n  }, true);\n  root.addEventListener('focusout', function (event) {\n    var button = event.target.closest('[data-order-more]');\n    if (button && root.contains(button)) scheduleClose();\n  }, true);\n  root.addEventListener('click', function (event) {\n    var button = event.target.closest('[data-order-more]');\n    if (!button || !root.contains(button)) return;\n    event.preventDefault();\n    showPopover(button);\n  }, true);\n  window.addEventListener('resize', positionPopover);\n  window.addEventListener('scroll', positionPopover, true);\n  window.addEventListener('keydown', function (event) {\n    if (event.key !== 'Escape') return;\n    if (popover && !popover.hidden) {\n      event.preventDefault();\n      hidePopover();\n      event.stopImmediatePropagation();\n      return;\n    }\n    /* Annotation DOM is intentionally removed; guard the legacy Escape listener. */\n    var annotationPopup = root.querySelector('#invoiceAnnoPopup');\n    var invoiceDrawer = root.querySelector('#invoiceDrawer');\n    var invoiceDialog = root.querySelector('#invoiceDialog');\n    var invoicePreview = root.querySelector('#invoicePreview');\n    if (!annotationPopup && invoiceDrawer && invoiceDrawer.hidden && invoiceDialog && invoiceDialog.hidden && invoicePreview && invoicePreview.hidden) {\n      event.preventDefault();\n      event.stopImmediatePropagation();\n    }\n  }, true);\n\n  new MutationObserver(renderMultiOrderCells).observe(root, { childList: true, subtree: true });\n  renderMultiOrderCells();\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  var body = root && root.querySelector('#invoiceDrawerBody');\n  if (!root || !body) return;\n  var busy = false;\n  var scheduled = false;\n\n  function esc(value) {\n    return String(value == null ? '' : value).replace(/[&<>\"']/g, function (char) {\n      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[char];\n    });\n  }\n\n  function fieldValue(section, label) {\n    var fields = section ? Array.from(section.querySelectorAll('.invoice-detail-field')) : [];\n    var field = fields.find(function (item) {\n      var term = item.querySelector('dt');\n      return term && term.textContent.trim() === label;\n    });\n    return field && field.querySelector('dd') ? field.querySelector('dd').textContent.trim() : '';\n  }\n\n  function fieldMarkup(label, value, mono) {\n    return '<div class=\"invoice-detail-field\"><dt>' + esc(label) + '</dt><dd' + (mono ? ' class=\"mono\"' : '') + '>' + esc(value || '—') + '</dd></div>';\n  }\n\n  function activeDetailTab() {\n    var active = body.querySelector('.invoice-detail-tab.is-active');\n    return active ? active.dataset.value || '' : '';\n  }\n\n  function buildOverviewContent(shell) {\n    var sections = Array.from(shell.children).filter(function (element) { return element.classList.contains('invoice-detail-section'); });\n    if (!sections.length || sections[0].dataset.detailOverviewReady === 'true') return;\n    var overview = sections[0];\n    var amountSection = sections.find(function (section) { return section.querySelector('h3') && section.querySelector('h3').textContent.trim() === '金额与资格'; }) || sections[1];\n    var buyer = fieldValue(overview, '购买主体');\n    var subjectTypeMatch = buyer.match(/[（(](企业|组织|个人)[）)]/);\n    var subjectType = subjectTypeMatch ? subjectTypeMatch[1] : (/个人/.test(buyer) ? '个人' : '企业');\n    var invoiceTitle = buyer.replace(/[（(](企业|组织|个人)[）)]/g, '').trim();\n    var salesSnapshot = fieldValue(overview, '销售主体快照');\n    var taxIdMatch = salesSnapshot.match(/税号\\s*(.*)$/);\n    var taxId = subjectType === '个人' ? '—' : (taxIdMatch ? taxIdMatch[1].trim() : '9131**********48');\n    var values = {\n      applicationId: fieldValue(overview, '申请编号'),\n      appliedAt: fieldValue(overview, '申请时间'),\n      applicant: fieldValue(overview, '申请人'),\n      invoiceType: fieldValue(overview, '发票类型'),\n      content: fieldValue(overview, '发票内容'),\n      email: fieldValue(overview, '收件邮箱'),\n      amount: fieldValue(amountSection, '本次申请金额'),\n      paid: fieldValue(amountSection, '法币实付净额'),\n      refund: fieldValue(amountSection, '已确认退款'),\n      reserved: fieldValue(amountSection, '有效申请占用')\n    };\n    var identityFields = [\n      fieldMarkup('申请编号', values.applicationId, true),\n      fieldMarkup('申请时间', values.appliedAt, true),\n      fieldMarkup('发票抬头', invoiceTitle),\n      fieldMarkup('税号', taxId, true),\n      fieldMarkup('抬头类型', subjectType),\n      fieldMarkup('发票类型', values.invoiceType),\n      fieldMarkup('申请人', values.applicant),\n      fieldMarkup('发票内容', values.content)\n    ];\n    if (subjectType !== '个人') {\n      identityFields.push(\n        fieldMarkup('开户银行', '中国工商银行上海浦东分行'),\n        fieldMarkup('银行账号', '6222 **** **** 4812', true),\n        fieldMarkup('企业地址', '上海市浦东新区金科路 2889 号'),\n        fieldMarkup('企业电话', '021-6888 2200', true)\n      );\n    }\n    identityFields.push(\n      fieldMarkup('联系邮箱', values.email || 'f***@yunstack.cn'),\n      fieldMarkup('联系电话', '138****8888', true)\n    );\n    var identitySection = '<section class=\"invoice-detail-section\"><h3>申请与受票</h3><dl class=\"invoice-detail-grid\">' + identityFields.join('') + '</dl></section>';\n    var amountMarkup = '<section class=\"invoice-detail-section\"><h3>金额与资格</h3><dl class=\"invoice-detail-grid\">' + [\n      fieldMarkup('本次申请金额', values.amount, true),\n      fieldMarkup('法币实付净额', values.paid, true),\n      fieldMarkup('已确认退款', values.refund, true),\n      fieldMarkup('有效申请占用', values.reserved, true)\n    ].join('') + '</dl></section>';\n    sections.forEach(function (section) { section.remove(); });\n    shell.insertAdjacentHTML('beforeend', identitySection + amountMarkup);\n    shell.querySelectorAll('.invoice-detail-section').forEach(function (section) { section.dataset.detailOverviewReady = 'true'; });\n  }\n\n  function normalizeOrderTable(shell) {\n    var table = shell.querySelector('.invoice-detail-section table');\n    if (!table || table.dataset.detailOrderReady === 'true') return;\n    var headers = table.tHead && table.tHead.rows[0] ? table.tHead.rows[0].cells : [];\n    if (!headers.length || headers[0].textContent.trim() !== '订单号') return;\n    var typeHead = document.createElement('th');\n    typeHead.textContent = '订单类型';\n    headers[0].after(typeHead);\n    Array.from(table.tBodies[0] ? table.tBodies[0].rows : []).forEach(function (row, index) {\n      var typeCell = document.createElement('td');\n      typeCell.className = 'invoice-detail-order-type';\n      typeCell.textContent = index === 0 ? '充值订单' : '续费订单';\n      row.children[0].after(typeCell);\n    });\n    Array.from(table.tHead.rows[0].cells).forEach(function (cell) {\n      if (cell.textContent.trim() === '商品') cell.textContent = '商品名称';\n    });\n    table.dataset.detailOrderReady = 'true';\n  }\n\n  function normalizeDocumentEmpty(shell) {\n    var table = shell.querySelector('.invoice-detail-section table');\n    if (!table || !table.tBodies[0] || table.dataset.detailDocumentReady === 'true') return;\n    if (!table.tBodies[0].rows.length) {\n      var row = document.createElement('tr');\n      row.innerHTML = '<td colspan=\"5\"><div class=\"invoice-detail-empty\">暂无数据</div></td>';\n      table.tBodies[0].appendChild(row);\n    }\n    table.dataset.detailDocumentReady = 'true';\n  }\n\n  function ensureTabShell() {\n    var tabs = body.querySelector('.invoice-detail-tabs');\n    if (!tabs) return null;\n    var shell = body.querySelector('.invoice-detail-tab-shell');\n    if (!shell) {\n      shell = document.createElement('div');\n      shell.className = 'invoice-detail-tab-shell';\n      tabs.parentNode.insertBefore(shell, tabs);\n      shell.appendChild(tabs);\n      Array.from(body.children).filter(function (element) {\n        return element.classList.contains('invoice-detail-section');\n      }).forEach(function (section) { shell.appendChild(section); });\n    }\n    return shell;\n  }\n\n  function normalizeDetail() {\n    if (busy || !body.querySelector('.invoice-detail-tabs')) return;\n    busy = true;\n    try {\n      var head = body.querySelector('.invoice-detail-head');\n      if (head) head.remove();\n      var shell = ensureTabShell();\n      if (!shell) return;\n      var tab = activeDetailTab();\n      if (tab === 'overview') buildOverviewContent(shell);\n      if (tab === 'orders') normalizeOrderTable(shell);\n      if (tab === 'documents') normalizeDocumentEmpty(shell);\n    } finally {\n      busy = false;\n    }\n  }\n\n  function scheduleNormalize() {\n    if (scheduled) return;\n    scheduled = true;\n    requestAnimationFrame(function () {\n      scheduled = false;\n      normalizeDetail();\n    });\n  }\n\n  new MutationObserver(scheduleNormalize).observe(body, { childList: true, subtree: true });\n  root.addEventListener('click', function (event) {\n    if (event.target.closest('.invoice-detail-tab')) setTimeout(normalizeDetail, 0);\n  }, true);\n  scheduleNormalize();\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  if (!root) return;\n  var scheduled = false;\n\n  var subjects = {\n    '上海云栈信息科技有限公司': { taxId: '91310000MA1K5R8X48', email: 'finance@yunstack.cn' },\n    '深圳航迹网络有限公司': { taxId: '91440300MA5H7N3D2Q', email: 'finance@hangji.cn' },\n    '杭州星河数字工作室': { taxId: '91330108MA2B0X9C6T', email: 'cashier@xinghe.cn' },\n    '北京启明智能科技有限公司': { taxId: '91110108MA01Q7M2X8', email: 'finance@qiming.cn' },\n    '广州微澜贸易有限公司': { taxId: '91440101MA5CK8P7X2', email: 'finance@weilan.cn' },\n    '成都拾光个人用户': { taxId: '—', email: 'service@mail.com' },\n    '武汉云图数据有限公司': { taxId: '91420100MA4K3N8F6Y', email: 'finance@yuntu.cn' },\n    '厦门海岸实验室': { taxId: '91350200MA35X8N4P6', email: 'finance@coastlab.cn' },\n    '南京极昼网络有限公司': { taxId: '91320105MA20K7R8X3', email: 'finance@polar-day.cn' },\n    '苏州青禾个人用户': { taxId: '—', email: 'service@mail.com' },\n    '合肥远见科技有限公司': { taxId: '91340100MA2T8R6N5C', email: 'finance@yuanjian.cn' },\n    '重庆山海组织': { taxId: '91500103MA60Q8N7X4', email: 'finance@shanhai.org.cn' },\n    '广州云迹科技有限公司': { taxId: '91440101MA5C7Y2N8Q', email: 'accounts@yunji.cn' }\n  };\n\n  var applicationSubjects = {\n    'IA-20260819-0012': '上海云栈信息科技有限公司',\n    'IA-20260819-0011': '深圳航迹网络有限公司',\n    'IA-20260819-0010': '杭州星河数字工作室',\n    'IA-20260819-0009': '北京启明智能科技有限公司',\n    'IA-20260819-0008': '广州微澜贸易有限公司',\n    'IA-20260818-0026': '成都拾光个人用户',\n    'IA-20260818-0025': '上海云栈信息科技有限公司',\n    'IA-20260818-0024': '武汉云图数据有限公司',\n    'IA-20260818-0023': '厦门海岸实验室',\n    'IA-20260818-0022': '南京极昼网络有限公司',\n    'IA-20260818-0021': '北京启明智能科技有限公司',\n    'IA-20260818-0020': '苏州青禾个人用户',\n    'IA-20260818-0019': '合肥远见科技有限公司',\n    'IA-20260818-0018': '重庆山海组织',\n    'IA-20260817-0138': '广州云迹科技有限公司'\n  };\n\n  var sellerTaxIds = {\n    '云登网络科技（上海）有限公司': '91310000MA1H3Q7X48',\n    '云登信息技术（深圳）有限公司': '91440300MA5F8N2K19'\n  };\n\n  function identityForApplication(applicationId) {\n    return subjects[applicationSubjects[applicationId]] || null;\n  }\n\n  function detailField(label) {\n    return Array.from(root.querySelectorAll('#invoiceDrawerBody .invoice-detail-field')).find(function (field) {\n      var term = field.querySelector('dt');\n      return term && term.textContent.trim() === label;\n    });\n  }\n\n  function setDetailValue(label, value) {\n    var field = detailField(label);\n    var target = field && field.querySelector('dd');\n    if (target && target.textContent.trim() !== value) target.textContent = value;\n  }\n\n  function normalizeApplicationDetail() {\n    var idField = detailField('申请编号');\n    var applicationId = idField && idField.querySelector('dd') ? idField.querySelector('dd').textContent.trim() : '';\n    var identity = identityForApplication(applicationId);\n    if (!identity) return;\n    setDetailValue('税号', identity.taxId);\n    setDetailValue('联系邮箱', identity.email);\n  }\n\n  function normalizeDocumentEmails() {\n    var table = root.querySelector('table[aria-label=\"票据列表\"]');\n    if (!table || !table.tBodies[0]) return;\n    Array.from(table.tBodies[0].rows).forEach(function (row) {\n      var applicationCell = row.cells[1];\n      var emailCell = row.cells[7];\n      var match = applicationCell && applicationCell.textContent.match(/IA-\\d{8}-\\d{4}/);\n      var identity = match ? identityForApplication(match[0]) : null;\n      if (identity && emailCell && emailCell.textContent.trim() !== identity.email) emailCell.textContent = identity.email;\n    });\n  }\n\n  function normalizeConfigTaxIds() {\n    var table = root.querySelector('.invoice-config-list table');\n    if (!table || !table.tBodies[0]) return;\n    Array.from(table.tBodies[0].rows).forEach(function (row) {\n      var name = row.querySelector('.primary-cell');\n      var summary = name && name.closest('td') ? name.closest('td').querySelector('.muted') : null;\n      var taxId = name ? sellerTaxIds[name.textContent.trim()] : '';\n      if (!summary || !taxId) return;\n      var next = '企业 · 税号 ' + taxId;\n      if (summary.textContent.trim() !== next) summary.textContent = next;\n    });\n  }\n\n  function normalizePreviewTaxIds() {\n    var preview = root.querySelector('#invoicePreview');\n    if (!preview || preview.hidden) return;\n    var lines = preview.querySelectorAll('.invoice-paper-line');\n    if (lines.length < 4) return;\n    var buyerName = lines[1].children[0] ? lines[1].children[0].textContent.trim() : '';\n    var buyerTax = subjects[buyerName] && subjects[buyerName].taxId;\n    var sellerName = lines[3].children[0] ? lines[3].children[0].textContent.trim() : '';\n    var sellerTax = sellerTaxIds[sellerName];\n    if (buyerTax && lines[1].children[1] && lines[1].children[1].textContent.trim() !== buyerTax) lines[1].children[1].textContent = buyerTax;\n    if (sellerTax && lines[3].children[1] && lines[3].children[1].textContent.trim() !== sellerTax) lines[3].children[1].textContent = sellerTax;\n  }\n\n  function normalizeIdentityVisibility() {\n    scheduled = false;\n    normalizeApplicationDetail();\n    normalizeDocumentEmails();\n    normalizeConfigTaxIds();\n    normalizePreviewTaxIds();\n  }\n\n  function scheduleNormalize() {\n    if (scheduled) return;\n    scheduled = true;\n    requestAnimationFrame(normalizeIdentityVisibility);\n  }\n\n  window.YundengInvoiceIdentity = {\n    applicationSubjects: applicationSubjects,\n    sellerTaxIds: sellerTaxIds,\n    subjects: subjects\n  };\n  new MutationObserver(scheduleNormalize).observe(root, { childList: true, subtree: true, characterData: true });\n  scheduleNormalize();\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  if (!root) return;\n  var title = root.querySelector('#invoiceDialogTitle');\n  var body = root.querySelector('#invoiceDialogBody');\n  if (!title || !body) return;\n\n  function removeApprovalLockPrompt() {\n    if (title.textContent.trim() !== '通过更正申请') return;\n    body.querySelectorAll('.invoice-config-callout').forEach(function (callout) {\n      if (/审批锁|领取锁|status=PENDING_REVIEW/i.test(callout.textContent)) callout.remove();\n    });\n    var copy = body.querySelector('.invoice-dialog-copy');\n    if (copy && /按原票顺序|短事务内/.test(copy.textContent)) {\n      copy.innerHTML = copy.innerHTML.replace('系统将按原票顺序在短事务内重校验可红冲余额并创建唯一红冲任务。', '系统将重新校验当前原票的可红冲余额，并创建唯一红冲任务。');\n    }\n  }\n\n  new MutationObserver(removeApprovalLockPrompt).observe(body, {\n    childList: true,\n    subtree: true,\n    characterData: true\n  });\n  new MutationObserver(removeApprovalLockPrompt).observe(title, {\n    childList: true,\n    characterData: true,\n    subtree: true\n  });\n  removeApprovalLockPrompt();\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  if (!root) return;\n  var body = root.querySelector('#invoiceDrawerBody');\n  if (!body) return;\n\n  function removeContactPhoneField() {\n    body.querySelectorAll('.invoice-detail-field').forEach(function (field) {\n      var label = field.querySelector('dt');\n      if (label && label.textContent.trim() === '联系电话') field.remove();\n    });\n  }\n\n  new MutationObserver(removeContactPhoneField).observe(body, {\n    childList: true,\n    subtree: true\n  });\n  removeContactPhoneField();\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  if (!root) return;\n\n  function normalizeApplicationOrderCells() {\n    var table = root.querySelector('table[aria-label=\"开票申请列表\"]');\n    if (!table) return;\n    table.querySelectorAll('tbody tr').forEach(function (row) {\n      var cell = row.children[4];\n      if (!cell) return;\n      var more = cell.querySelector('[data-order-more]');\n      if (more) {\n        var primary = cell.querySelector('.invoice-order-primary');\n        var nextValue = primary ? primary.textContent.trim() : cell.textContent.replace(/\\+\\d+\\s*$/, '').trim();\n        if (cell.textContent.trim() !== nextValue || more) cell.textContent = nextValue;\n      } else {\n        var singleValue = cell.textContent.replace(/\\+\\d+\\s*$/, '').trim();\n        if (cell.textContent.trim() !== singleValue) cell.textContent = singleValue;\n      }\n      cell.classList.remove('invoice-order-cell');\n    });\n    var popover = document.getElementById('invoiceOrderPopover');\n    if (popover) popover.remove();\n  }\n\n  function normalizeCorrectionTargets() {\n    var table = root.querySelector('table[aria-label=\"更正申请列表\"]');\n    if (!table) return;\n    table.querySelectorAll('tbody tr').forEach(function (row) {\n      var cell = row.children[2];\n      if (!cell) return;\n      var text = cell.firstChild && cell.firstChild.nodeType === 3 ? cell.firstChild.textContent : '';\n      var nextValue = text.indexOf('、') >= 0 ? text.split('、')[0] : text;\n      if (text !== nextValue && cell.firstChild) cell.firstChild.textContent = nextValue;\n    });\n  }\n\n  function normalizeOrderInfoTab() {\n    var detailTabs = root.querySelectorAll('#invoiceDrawerBody .invoice-detail-tab[data-value=\"orders\"]');\n    detailTabs.forEach(function (tab) {\n      if (tab.textContent.trim() !== '订单信息') tab.textContent = '订单信息';\n    });\n    root.querySelectorAll('#invoiceDrawerBody .invoice-detail-section h3').forEach(function (heading) {\n      if (heading.textContent.trim() === '订单分摊') heading.textContent = '订单信息';\n    });\n    var orderSection = Array.from(root.querySelectorAll('#invoiceDrawerBody .invoice-detail-section')).find(function (section) {\n      var heading = section.querySelector('h3');\n      return heading && heading.textContent.trim() === '订单信息';\n    });\n    var rows = orderSection && orderSection.querySelectorAll('tbody tr');\n    if (rows && rows.length > 1) Array.from(rows).slice(1).forEach(function (row) { row.remove(); });\n  }\n\n  function normalizeSingleOrderView() {\n    normalizeApplicationOrderCells();\n    normalizeCorrectionTargets();\n    normalizeOrderInfoTab();\n  }\n\n  new MutationObserver(normalizeSingleOrderView).observe(root, { childList: true, subtree: true });\n  normalizeSingleOrderView();\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  if (!root) return;\n\n  function esc(value) {\n    return String(value == null ? '' : value).replace(/[&<>\"']/g, function (char) {\n      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[char];\n    });\n  }\n\n  function stateFor(status, draft) {\n    var states = {\n      '待审核': ['审核通过后生成', '当前等待审批', 'info'],\n      '红冲处理中': ['红冲完成后生成', '当前正在处理', 'warning'],\n      '已完成': ['已生成重开申请', '申请号', 'success'],\n      '红冲失败': ['处理完成后生成', '红冲失败，待处理', 'danger'],\n      '审核通过': ['红冲完成后生成', '红冲任务待处理', 'info'],\n      '已驳回': ['未生成', '申请已驳回', 'neutral'],\n      '已撤回': ['未生成', '申请已撤回', 'neutral'],\n      '已取消': ['未生成', '申请已取消', 'neutral']\n    };\n    var state = states[status] || ['未生成', '暂未创建重开申请', 'neutral'];\n    var id = /^IA-[A-Z0-9-]+$/i.test(draft) ? draft : '';\n    return { label: state[0], note: id ? state[1] + ' ' + id : state[1], tone: state[2], id: id };\n  }\n\n  function normalizeReopenColumn() {\n    var table = root.querySelector('table[aria-label=\"更正申请列表\"]');\n    if (!table) return;\n    var header = Array.from(table.tHead ? table.tHead.rows[0].cells : []).find(function (cell) {\n      return cell.textContent.trim() === '重开草稿';\n    });\n    if (header) header.textContent = '重开申请';\n    table.querySelectorAll('tbody tr').forEach(function (row) {\n      if (row.children.length < 6 || row.dataset.reopenCopyReady === 'true') return;\n      var status = row.children[4].textContent.trim();\n      var draft = row.children[5].textContent.trim();\n      var state = stateFor(status, draft);\n      row.children[5].innerHTML = '<span class=\"invoice-badge invoice-badge-' + state.tone + '\">' + esc(state.label) + '</span>' + (state.id ? '<div class=\"muted mono\" title=\"重开申请编号\">申请号 ' + esc(state.id) + '</div>' : '<div class=\"muted\">' + esc(state.note) + '</div>');\n      row.children[5].setAttribute('aria-label', state.id ? state.label + '，申请号 ' + state.id : state.label + '，' + state.note);\n      row.dataset.reopenCopyReady = 'true';\n    });\n  }\n\n  function normalizePartialRedProgress() {\n    var table = root.querySelector('table[aria-label=\"红冲任务列表\"]');\n    if (!table) return;\n    table.querySelectorAll('tbody tr').forEach(function (row) {\n      if (row.children.length < 5 || row.dataset.partialProgressReady === 'true') return;\n      var status = row.children[4].textContent.trim();\n      var progress = row.children[3] && row.children[3].querySelector('.muted');\n      if (progress && status === '部分红冲') progress.textContent = '已红冲部分金额';\n      else if (progress) progress.remove();\n      row.dataset.partialProgressReady = 'true';\n    });\n  }\n\n  function normalizeCorrectionDetail() {\n    var detail = root.querySelector('#invoiceRedDetailBody');\n    if (!detail) return;\n    var field = Array.from(detail.querySelectorAll('.invoice-red-detail-field')).find(function (item) {\n      return item.querySelector('dt') && item.querySelector('dt').textContent.trim() === '重开草稿';\n    });\n    if (!field || field.dataset.reopenDetailReady === 'true') return;\n    var term = field.querySelector('dt');\n    var value = field.querySelector('dd');\n    if (!term || !value) return;\n    var draft = value.textContent.trim();\n    term.textContent = '重开申请';\n    if (/^IA-[A-Z0-9-]+$/i.test(draft)) {\n      value.textContent = '已生成重开申请（申请号 ' + draft + '）';\n    } else if (draft === '待红冲' || draft === '红冲处理中' || draft === '红冲任务待处理') {\n      value.textContent = '红冲完成后生成';\n    } else if (draft === '待处置') {\n      value.textContent = '处理完成后生成';\n    } else if (draft === '—') {\n      value.textContent = '未生成';\n    }\n    field.dataset.reopenDetailReady = 'true';\n  }\n\n  function normalizeInvoiceCopy() {\n    normalizeReopenColumn();\n    normalizePartialRedProgress();\n    normalizeCorrectionDetail();\n  }\n\n  new MutationObserver(normalizeInvoiceCopy).observe(root, { childList: true, subtree: true });\n  normalizeInvoiceCopy();\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  if (!root) return;\n\n  function esc(value) {\n    return String(value == null ? '' : value).replace(/[&<>\"']/g, function (char) {\n      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[char];\n    });\n  }\n\n  function fieldMarkup(label, value, mono) {\n    return '<div class=\"invoice-detail-field\"><dt>' + esc(label) + '</dt><dd' + (mono ? ' class=\"mono\"' : '') + '>' + esc(value || '—') + '</dd></div>';\n  }\n\n  function normalizeOrderInfoFields() {\n    root.querySelectorAll('#invoiceDrawerBody .invoice-detail-section').forEach(function (section) {\n      var heading = section.querySelector('h3');\n      var table = section.querySelector('table');\n      if (!heading || heading.textContent.trim() !== '订单信息' || !table || section.dataset.orderInfoFieldsReady === 'true') return;\n      var headerCells = table.tHead && table.tHead.rows[0] ? Array.from(table.tHead.rows[0].cells) : [];\n      var row = table.tBodies && table.tBodies[0] && table.tBodies[0].rows[0];\n      if (!headerCells.length || !row) return;\n      var values = headerCells.map(function (header, index) {\n        return {\n          label: header.textContent.trim() === '商品' ? '商品名称' : header.textContent.trim(),\n          value: row.cells[index] ? row.cells[index].textContent.trim() : '—'\n        };\n      });\n      if (!values.some(function (item) { return item.label === '订单类型'; })) {\n        values.splice(1, 0, { label: '订单类型', value: '充值订单' });\n      }\n      var monoLabels = { '订单号': true, '法币实付': true, '可开票净额': true };\n      var details = document.createElement('dl');\n      details.className = 'invoice-detail-grid';\n      details.innerHTML = values.map(function (item) {\n        return fieldMarkup(item.label, item.value, Boolean(monoLabels[item.label]));\n      }).join('');\n      var tableWrap = table.closest('.invoice-table-wrap') || table;\n      tableWrap.replaceWith(details);\n      section.dataset.orderInfoFieldsReady = 'true';\n    });\n  }\n\n  new MutationObserver(normalizeOrderInfoFields).observe(root, { childList: true, subtree: true });\n  normalizeOrderInfoFields();\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  var body = root && root.querySelector('#invoiceDrawerBody');\n  if (!root || !body) return;\n  var scheduled = false;\n  var busy = false;\n\n  function esc(value) {\n    return String(value == null ? '' : value).replace(/[&<>\"']/g, function (char) {\n      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[char];\n    });\n  }\n\n  function fieldMarkup(label, value, mono) {\n    return '<div class=\"invoice-detail-field\"><dt>' + esc(label) + '</dt><dd' + (mono ? ' class=\"mono\"' : '') + '>' + esc(value || '—') + '</dd></div>';\n  }\n\n  function currentApplication() {\n    function drawerFieldValue(label) {\n      var field = Array.from(body.querySelectorAll('.invoice-detail-field')).find(function (item) {\n        return item.querySelector('dt') && item.querySelector('dt').textContent.trim() === label;\n      });\n      return field && field.querySelector('dd') ? field.querySelector('dd').textContent.trim() : '';\n    }\n    var idField = Array.from(body.querySelectorAll('.invoice-detail-field')).find(function (field) {\n      return field.querySelector('dt') && field.querySelector('dt').textContent.trim() === '申请编号';\n    });\n    var id = idField && idField.querySelector('dd') ? idField.querySelector('dd').textContent.trim() : '';\n    var row = Array.from(root.querySelectorAll('table[aria-label=\"开票申请列表\"] tbody tr')).find(function (item) {\n      return item.children[1] && item.children[1].textContent.trim() === id;\n    });\n    if (!row) return null;\n    return {\n      id: id,\n      created: row.children[2] ? row.children[2].textContent.trim() : '—',\n      subject: row.children[3] ? row.children[3].querySelector('.primary-cell')?.textContent.trim() : '—',\n      order: row.children[4] ? row.children[4].textContent.trim() : '—',\n      content: row.children[5] ? row.children[5].textContent.trim() : '—',\n      amount: drawerFieldValue('本次申请金额') || (row.children[6] ? row.children[6].textContent.trim().split(/\\s*税率/)[0] : '—'),\n      paid: drawerFieldValue('法币实付净额') || (row.children[6] ? row.children[6].textContent.trim().split(/\\s*税率/)[0] : '—'),\n      issuance: row.children[8] ? row.children[8].textContent.trim() : '—'\n    };\n  }\n\n  function taskSection(app) {\n    var suffix = app.id.slice(-4);\n    var recent = app.issuance.indexOf('结果未知') >= 0 ? '请求超时，结果未知' : app.issuance.indexOf('开具失败') >= 0 ? '服务商明确返回失败' : '已验签，等待票据文件';\n    var action = app.issuance.indexOf('结果未知') >= 0 ? '按原请求查询' : app.issuance.indexOf('开具失败') >= 0 ? '确认未受理后重试' : '等待回调';\n    return '<section class=\"invoice-detail-section\" data-continuous-detail=\"tasks\"><h3>第三方任务</h3><dl class=\"invoice-detail-grid\">' + [\n      fieldMarkup('ProviderTask', 'PT-' + suffix + '-01', true),\n      fieldMarkup('服务商', '百望云 / 生产'),\n      fieldMarkup('受理号', 'ACCEPT-20260819-' + suffix, true),\n      fieldMarkup('幂等键', app.id + ':01', true),\n      fieldMarkup('最近响应', recent),\n      fieldMarkup('允许动作', action)\n    ].join('') + '</dl></section>';\n  }\n\n  function documentSection(app) {\n    var table = root.querySelector('table[aria-label=\"票据列表\"]');\n    var row = table && Array.from(table.querySelectorAll('tbody tr')).find(function (item) {\n      return item.textContent.indexOf('申请 ' + app.id) >= 0;\n    });\n    var documentByApplication = {\n      'IA-20260819-0009': ['数电票-04438291', '有效', '有效', '已送达', 'DOC-20260819-0081'],\n      'IA-20260818-0026': ['数电票-04438191', '有效', '有效', '交付失败', 'DOC-20260819-0079'],\n      'IA-20260818-0025': ['数电票-04438144', '红冲处理中', '有效', '交付失败', 'DOC-20260819-0078'],\n      'IA-20260818-0020': ['数电票-04437981', '已全额红冲', '有效', '已送达', 'DOC-20260819-0074'],\n      'IA-20260818-0019': ['数电票-04437106', '部分红冲', '有效', '已送达', 'DOC-20260818-0070'],\n      'IA-20260817-0017': ['数电票-04436992', '红冲失败', '有效', '已送达', 'DOC-20260817-0068'],\n      'IA-20260819-0010': ['—', '未生成', '未生成', '未发送', ''],\n      'IA-20260818-0021': ['—', '未生成', '未生成', '未发送', '']\n    };\n    var fallback = documentByApplication[app.id] || ['—', '未生成', '未生成', '未发送', ''];\n    var invoiceNo = row && row.children[0] ? row.children[0].textContent.trim().split('\\n')[0] : fallback[0];\n    var documentStatus = row && row.children[3] ? row.children[3].textContent.trim() : fallback[1];\n    var fileStatus = row && row.children[4] ? row.children[4].textContent.trim() : fallback[2];\n    var deliveryStatus = row && row.children[5] ? row.children[5].textContent.trim() : fallback[3];\n    var actionId = row && row.querySelector('[data-action=\"preview-document\"]') ? row.querySelector('[data-action=\"preview-document\"]').dataset.id : fallback[4];\n    return '<section class=\"invoice-detail-section\" data-continuous-detail=\"documents\"><h3>票据交付</h3><div class=\"invoice-table-wrap\"><table class=\"invoice-table data-table\" aria-label=\"票据交付明细\"><thead><tr><th>票据号</th><th>票据状态</th><th>文件</th><th>交付状态</th><th>操作</th></tr></thead><tbody><tr><td class=\"mono\">' + esc(invoiceNo) + '</td><td>' + esc(documentStatus) + '</td><td>' + esc(fileStatus) + '</td><td>' + esc(deliveryStatus) + '</td><td>' + (actionId ? '<button type=\"button\" class=\"invoice-btn-link\" data-action=\"preview-document\" data-id=\"' + esc(actionId) + '\">预览</button>' : '<span class=\"muted\">—</span>') + '</td></tr></tbody></table></div></section>';\n  }\n\n  function timelineSection(app) {\n    return '<section class=\"invoice-detail-section\" data-continuous-detail=\"timeline\"><h3>时间线审计</h3><div class=\"invoice-timeline\"><div class=\"invoice-timeline-item\"><span class=\"invoice-timeline-dot\"></span><time class=\"invoice-timeline-time\">' + esc(app.created) + '</time><span class=\"invoice-timeline-copy\">用户提交申请，服务端冻结可开票金额 <strong>' + esc(app.amount) + '</strong>。</span></div><div class=\"invoice-timeline-item\"><span class=\"invoice-timeline-dot\"></span><time class=\"invoice-timeline-time\">2026-08-19 09:46</time><span class=\"invoice-timeline-copy\">系统校验通过：法币支付、履约和 SKU 映射均满足资格。</span></div><div class=\"invoice-timeline-item\"><span class=\"invoice-timeline-dot\"></span><time class=\"invoice-timeline-time\">2026-08-19 09:48</time><span class=\"invoice-timeline-copy\">审核与开具事件已写入 Outbox。</span></div></div></section>';\n  }\n\n  function normalizeContinuousDetails() {\n    if (busy || body.hidden || !body.querySelector('.invoice-detail-tabs')) return;\n    var app = currentApplication();\n    var tabs = body.querySelector('.invoice-detail-tabs');\n    var shell = body.querySelector('.invoice-detail-tab-shell') || tabs.parentElement;\n    if (!app || !shell) return;\n    busy = true;\n    try {\n      tabs.remove();\n      shell.querySelectorAll('[data-continuous-detail]').forEach(function (section) { section.remove(); });\n      var orderSection = document.createElement('section');\n      orderSection.className = 'invoice-detail-section';\n      orderSection.dataset.continuousDetail = 'orders';\n      orderSection.innerHTML = '<h3>订单信息</h3><dl class=\"invoice-detail-grid\">' + [\n        fieldMarkup('订单号', app.order, true),\n        fieldMarkup('订单类型', '充值订单'),\n        fieldMarkup('商品名称', app.content),\n        fieldMarkup('支付方式', '支付宝'),\n        fieldMarkup('法币实付', app.paid, true),\n        fieldMarkup('可开票净额', app.amount, true),\n        fieldMarkup('主体快照', '上海主体（固化）')\n      ].join('') + '</dl>';\n      shell.appendChild(orderSection);\n      shell.insertAdjacentHTML('beforeend', taskSection(app) + documentSection(app) + timelineSection(app));\n      shell.dataset.continuousDetailsReady = 'true';\n    } finally {\n      busy = false;\n    }\n  }\n\n  function scheduleNormalize() {\n    if (scheduled) return;\n    scheduled = true;\n    requestAnimationFrame(function () {\n      scheduled = false;\n      normalizeContinuousDetails();\n    });\n  }\n\n  new MutationObserver(scheduleNormalize).observe(body, { childList: true, subtree: true });\n  scheduleNormalize();\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  if (!root) return;\n  var scope = 'red';\n  var dialog = root.querySelector('#invoiceDialog');\n  var dialogTitle = root.querySelector('#invoiceDialogTitle');\n  var dialogBody = root.querySelector('#invoiceDialogBody');\n  var dialogFooter = root.querySelector('#invoiceDialogFooter');\n\n  function esc(value) {\n    return String(value == null ? '' : value).replace(/[&<>\"']/g, function (char) {\n      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[char];\n    });\n  }\n\n  function textValue(cell) {\n    return cell ? cell.textContent.trim() : '—';\n  }\n\n  function primaryValue(cell) {\n    if (!cell) return '—';\n    var copy = cell.cloneNode(true);\n    copy.querySelectorAll('.muted').forEach(function (item) { item.remove(); });\n    return copy.textContent.trim() || '—';\n  }\n\n  function mutedValue(cell) {\n    var muted = cell && cell.querySelector('.muted');\n    return muted ? muted.textContent.trim() : '—';\n  }\n\n  function collectRows(table) {\n    if (table.__correctionFlowRows) return table.__correctionFlowRows;\n    var rows = Array.from(table.tBodies && table.tBodies[0] ? table.tBodies[0].rows : []).map(function (row) {\n      var cells = Array.from(row.children);\n      var idCell = cells[0];\n      var subjectCell = cells[1];\n      var targetCell = cells[2];\n      var statusCell = cells[4];\n      var draftCell = cells[5];\n      var actionCell = cells[6];\n      var reason = mutedValue(targetCell);\n      var isDelivery = /邮箱|收件|通知渠道|通知方式|联系电话/.test(reason);\n      return {\n        id: idCell && idCell.querySelector('[data-id]') ? idCell.querySelector('[data-id]').dataset.id : primaryValue(idCell),\n        created: mutedValue(idCell),\n        subject: primaryValue(subjectCell),\n        applicant: mutedValue(subjectCell),\n        target: primaryValue(targetCell).split('、')[0],\n        reason: reason,\n        amount: textValue(cells[3]),\n        status: textValue(statusCell),\n        statusHtml: statusCell ? statusCell.innerHTML : '<span class=\"muted\">—</span>',\n        draft: textValue(draftCell),\n        actionHtml: actionCell ? actionCell.innerHTML : '',\n        isDelivery: isDelivery\n      };\n    });\n    table.__correctionFlowRows = rows;\n    return rows;\n  }\n\n  function redProgress(status) {\n    var progress = {\n      '待审核': '待审批',\n      '审核通过': '待处理',\n      '红冲处理中': '处理中',\n      '红冲失败': '失败待处置',\n      '已完成': '已完成'\n    };\n    return progress[status] || '—';\n  }\n\n  function redReopenState(row) {\n    if (row.status === '已完成') return '<span class=\"invoice-badge invoice-badge-success\">已生成</span>';\n    if (row.status === '已驳回' || row.status === '已撤回' || row.status === '已取消') return '<span class=\"muted\">未生成</span>';\n    return '<span class=\"invoice-badge invoice-badge-info\">待红冲完成</span>';\n  }\n\n  function redReopenId(row) {\n    return row.id === 'CR-20260818-004' ? '<span class=\"mono\">IA-20260818-0022-R1</span>' : '<span class=\"muted\">—</span>';\n  }\n\n  function redRow(row) {\n    var actionHtml = row.actionHtml || '<div class=\"actions\"><button type=\"button\" class=\"invoice-btn-link\" data-action=\"correction-detail\" data-id=\"' + esc(row.id) + '\">详情</button></div>';\n    return '<tr data-correction-flow=\"red\" data-reopen-copy-ready=\"true\"><td class=\"mono\">' + esc(row.id) + '</td><td class=\"mono\">' + esc(row.created) + '</td><td><span class=\"primary-cell\">' + esc(row.subject) + '</span></td><td>' + esc(row.applicant) + '</td><td class=\"mono\">' + esc(row.target) + '</td><td>' + esc(row.reason) + '</td><td class=\"amount\">' + esc(row.amount) + '</td><td>' + row.statusHtml + '</td><td>' + esc(redProgress(row.status)) + '</td><td>' + redReopenState(row) + '</td><td>' + redReopenId(row) + '</td><td>' + actionHtml + '</td></tr>';\n  }\n\n  function deliveryRow(row) {\n    return '<tr data-correction-flow=\"delivery\" data-reopen-copy-ready=\"true\" data-correction-id=\"' + esc(row.id) + '\"><td class=\"mono\">' + esc(row.id) + '</td><td class=\"mono\">' + esc(row.created) + '</td><td><span class=\"primary-cell\">' + esc(row.subject) + '</span></td><td>' + esc(row.applicant) + '</td><td>收件邮箱</td><td><span class=\"invoice-correction-delivery-value\">service@mail.com</span><div class=\"invoice-correction-delivery-note\">仅更新交付信息</div></td><td><span class=\"invoice-badge invoice-badge-info\">待重新发送</span></td><td><div class=\"actions\"><button type=\"button\" class=\"invoice-btn-link\" data-action=\"delivery-change-detail\" data-id=\"' + esc(row.id) + '\">查看详情</button><button type=\"button\" class=\"invoice-btn-link\" data-action=\"delivery-resend\" data-id=\"' + esc(row.id) + '\">重新发送</button></div></td></tr>';\n  }\n\n  function updateCount(section, count) {\n    Array.from(section.querySelectorAll('*')).filter(function (element) {\n      return element.children.length === 0;\n    }).forEach(function (element) {\n      var next = element.textContent.replace(/共\\s*\\d+\\s*条(记录)?/, '共 ' + count + ' 条' + (element.textContent.indexOf('记录') >= 0 ? '记录' : ''));\n      if (next !== element.textContent) element.textContent = next;\n    });\n    var total = section.querySelector('.invoice-list-total');\n    var totalText = '共 ' + count + ' 条';\n    if (total && total.textContent.trim() !== totalText) total.innerHTML = '共 <span class=\"mono\">' + count + '</span> 条';\n  }\n\n  function renderTable(section, table, rows) {\n    var red = scope === 'red';\n    table.tHead.innerHTML = red\n      ? '<tr><th>更正申请号</th><th>申请时间</th><th>受票主体</th><th>申请人</th><th>原发票</th><th>更正原因</th><th>更正金额</th><th>更正状态</th><th>红冲进度</th><th>重开状态</th><th>重开申请号</th><th>操作</th></tr>'\n      : '<tr><th>变更编号</th><th>申请时间</th><th>受票主体</th><th>申请人</th><th>变更项</th><th>变更后信息</th><th>交付状态</th><th>操作</th></tr>';\n    var selected = rows.filter(function (row) { return red ? !row.isDelivery : row.isDelivery; });\n    table.tBodies[0].innerHTML = selected.length\n      ? selected.map(red ? redRow : deliveryRow).join('')\n      : '<tr><td colspan=\"' + (red ? '12' : '8') + '\"><div class=\"invoice-empty\"><strong>' + (red ? '暂无需要红冲的更正申请' : '暂无交付信息变更') + '</strong><p>' + (red ? '邮箱、收件电话和通知渠道变更请在交付信息变更中处理。' : '当前没有待重新发送的交付信息变更。') + '</p></div></td></tr>';\n    table.dataset.correctionFlowScope = scope;\n    updateCount(section, selected.length);\n    return selected.length;\n  }\n\n  function showDeliveryDetail(id, resend) {\n    if (!dialog || !dialogTitle || !dialogBody || !dialogFooter) return;\n    dialogTitle.textContent = resend ? '重新发送票据' : '交付信息变更详情';\n    dialogBody.innerHTML = '<dl class=\"invoice-detail-grid\">' +\n      '<div class=\"invoice-detail-field\"><dt>变更编号</dt><dd class=\"mono\">' + esc(id) + '</dd></div>' +\n      '<div class=\"invoice-detail-field\"><dt>变更类型</dt><dd>收件邮箱</dd></div>' +\n      '<div class=\"invoice-detail-field\"><dt>原收件邮箱</dt><dd class=\"mono\">f***@yunstack.cn</dd></div>' +\n      '<div class=\"invoice-detail-field\"><dt>变更后邮箱</dt><dd class=\"mono\">service@mail.com</dd></div>' +\n      '<div class=\"invoice-detail-field\"><dt>处理方式</dt><dd>更新邮件交付单元，保留原票据</dd></div>' +\n      '<div class=\"invoice-detail-field\"><dt>红冲处理</dt><dd>不创建红冲任务</dd></div>' +\n      '</dl>' + (resend ? '<p class=\"invoice-dialog-copy\">确认重新发送后，将为当前邮箱创建新的交付尝试；原票据和历史交付记录保持不变。</p>' : '');\n    dialogFooter.innerHTML = resend\n      ? '<button type=\"button\" class=\"invoice-btn invoice-btn-default\" data-action=\"close-dialog\">取消</button><button type=\"button\" class=\"invoice-btn invoice-btn-primary\" data-action=\"delivery-confirm-resend\" data-id=\"' + esc(id) + '\">确认发送</button>'\n      : '<button type=\"button\" class=\"invoice-btn invoice-btn-primary\" data-action=\"close-dialog\">关闭</button>';\n    dialog.hidden = false;\n    document.body.classList.add('invoice-lock-scroll');\n    window.lucide && window.lucide.createIcons();\n  }\n\n  function showToast(message) {\n    var host = root.querySelector('#invoiceToast') || root;\n    var item = document.createElement('div');\n    item.className = 'invoice-action-toast is-success';\n    item.setAttribute('role', 'status');\n    item.textContent = message;\n    host.appendChild(item);\n    setTimeout(function () { item.remove(); }, 2800);\n  }\n\n  function normalizeCorrectionFlow() {\n    var table = root.querySelector('table[aria-label=\"更正申请列表\"]');\n    if (!table || !table.tHead || !table.tBodies[0]) return;\n    var section = table.closest('.invoice-block');\n    if (!section) return;\n    var rows = collectRows(table);\n    var scopeTabs = section.querySelector('.invoice-correction-scope-tabs');\n    if (!scopeTabs) {\n      scopeTabs = document.createElement('div');\n      scopeTabs.className = 'invoice-correction-scope-tabs';\n      scopeTabs.setAttribute('role', 'tablist');\n      scopeTabs.innerHTML = '<button type=\"button\" class=\"invoice-config-tab\" data-correction-scope=\"red\" role=\"tab\">票面更正<span class=\"invoice-correction-scope-tab-count\" data-correction-count=\"red\"></span></button><button type=\"button\" class=\"invoice-config-tab\" data-correction-scope=\"delivery\" role=\"tab\">交付信息变更<span class=\"invoice-correction-scope-tab-count\" data-correction-count=\"delivery\"></span></button>';\n      var header = section.querySelector('.invoice-list-header') || section.firstElementChild;\n      if (header) header.before(scopeTabs); else section.prepend(scopeTabs);\n      scopeTabs.addEventListener('click', function (event) {\n        var button = event.target.closest('[data-correction-scope]');\n        if (!button) return;\n        scope = button.dataset.correctionScope;\n        renderCorrectionFlow(section, table, rows);\n      });\n    }\n    renderCorrectionFlow(section, table, rows);\n  }\n\n  function renderCorrectionFlow(section, table, rows) {\n    var redCount = rows.filter(function (row) { return !row.isDelivery; }).length;\n    var deliveryCount = rows.filter(function (row) { return row.isDelivery; }).length;\n    var heading = section.querySelector('.invoice-list-title');\n    var headingText = scope === 'red' ? '票面更正列表' : '交付信息变更列表';\n    if (heading && heading.textContent.trim() !== headingText) heading.textContent = headingText;\n    root.querySelectorAll('[data-action=\"red-subtab\"][data-value=\"corrections\"] .mono').forEach(function (node) {\n      if (node.textContent.trim() !== String(redCount)) node.textContent = redCount;\n    });\n    var redButton = section.querySelector('[data-correction-scope=\"red\"]');\n    var deliveryButton = section.querySelector('[data-correction-scope=\"delivery\"]');\n    if (!redButton || !deliveryButton) return;\n    redButton.classList.toggle('is-active', scope === 'red');\n    deliveryButton.classList.toggle('is-active', scope === 'delivery');\n    var redSelected = String(scope === 'red');\n    var deliverySelected = String(scope === 'delivery');\n    if (redButton.getAttribute('aria-selected') !== redSelected) redButton.setAttribute('aria-selected', redSelected);\n    if (deliveryButton.getAttribute('aria-selected') !== deliverySelected) deliveryButton.setAttribute('aria-selected', deliverySelected);\n    var redCountNode = redButton.querySelector('[data-correction-count]');\n    var deliveryCountNode = deliveryButton.querySelector('[data-correction-count]');\n    if (redCountNode && redCountNode.textContent !== String(redCount)) redCountNode.textContent = redCount;\n    if (deliveryCountNode && deliveryCountNode.textContent !== String(deliveryCount)) deliveryCountNode.textContent = deliveryCount;\n    if (table.dataset.correctionFlowScope !== scope) renderTable(section, table, rows);\n  }\n\n  root.addEventListener('click', function (event) {\n    var target = event.target.closest('[data-action=\"delivery-change-detail\"], [data-action=\"delivery-resend\"], [data-action=\"delivery-confirm-resend\"]');\n    if (!target || !root.contains(target)) return;\n    event.preventDefault();\n    event.stopImmediatePropagation();\n    if (target.dataset.action === 'delivery-change-detail') showDeliveryDetail(target.dataset.id, false);\n    if (target.dataset.action === 'delivery-resend') showDeliveryDetail(target.dataset.id, true);\n    if (target.dataset.action === 'delivery-confirm-resend') {\n      dialog.hidden = true;\n      document.body.classList.remove('invoice-lock-scroll');\n      showToast('已重新发送票据，原票据和交付记录保持不变');\n    }\n  }, true);\n\n  new MutationObserver(normalizeCorrectionFlow).observe(root, { childList: true, subtree: true });\n  normalizeCorrectionFlow();\n})();\n",
    "\n(function () {\n  var root = document.querySelector('[data-module-root=\"invoice-management\"]');\n  if (!root) return;\n  var scheduled = false;\n\n  var statusHelp = {\n    document: {\n      title: '票据状态说明',\n      items: [\n        ['有效', '尚未发生成功红冲，当前有效金额等于原票金额'],\n        ['红冲处理中', '存在待处理、处理中或结果未知的红冲金额'],\n        ['部分红冲', '累计成功红冲金额大于 0，且剩余有效金额仍大于 0'],\n        ['已全额红冲', '累计成功红冲金额等于原票金额，剩余有效金额为 0'],\n        ['红冲失败', '红冲明确失败且任务尚未关闭或恢复']\n      ]\n    },\n    delivery: {\n      title: '交付状态说明',\n      items: [\n        ['未发送', '邮件尚未发送'],\n        ['发送中', '邮件正在发送，尚未返回最终结果'],\n        ['已送达', '邮件已发送成功'],\n        ['交付失败', '邮件发送失败，可更新邮箱后重新发送']\n      ]\n    }\n  };\n\n  function esc(value) {\n    return String(value == null ? '' : value).replace(/[&<>\"']/g, function (char) {\n      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[char];\n    });\n  }\n\n  function positionHelp(help) {\n    var button = help.querySelector('button');\n    var popover = help.querySelector('.invoice-status-help-popover');\n    if (!button || !popover) return;\n    var rect = button.getBoundingClientRect();\n    var width = popover.offsetWidth || 320;\n    var height = popover.offsetHeight || 180;\n    popover.style.left = Math.max(8, Math.min(window.innerWidth - width - 8, rect.left)) + 'px';\n    var top = rect.bottom + 8;\n    if (top + height > window.innerHeight - 8) top = Math.max(8, rect.top - height - 8);\n    popover.style.top = top + 'px';\n  }\n\n  function bindHelp(help) {\n    if (help.dataset.singleOrderHelpBound === 'true') return;\n    var button = help.querySelector('button');\n    var popover = help.querySelector('.invoice-status-help-popover');\n    if (!button || !popover) return;\n    help.dataset.singleOrderHelpBound = 'true';\n    help.dataset.open = 'false';\n    var over = false;\n    var focused = false;\n    var timer = null;\n    function open() {\n      if (timer) clearTimeout(timer);\n      help.dataset.open = 'true';\n      button.setAttribute('aria-expanded', 'true');\n      positionHelp(help);\n    }\n    function close() {\n      help.dataset.open = 'false';\n      button.setAttribute('aria-expanded', 'false');\n    }\n    function scheduleClose() {\n      if (timer) clearTimeout(timer);\n      timer = setTimeout(function () { if (!over && !focused) close(); }, 140);\n    }\n    button.addEventListener('mouseenter', function () { over = true; open(); });\n    button.addEventListener('mouseleave', function () { over = false; scheduleClose(); });\n    button.addEventListener('focus', function () { focused = true; open(); });\n    button.addEventListener('blur', function () { focused = false; scheduleClose(); });\n    button.addEventListener('click', open);\n    button.addEventListener('keydown', function (event) { if (event.key === 'Escape') { close(); button.blur(); } });\n    popover.addEventListener('mouseenter', function () { over = true; open(); });\n    popover.addEventListener('mouseleave', function () { over = false; scheduleClose(); });\n  }\n\n  function helpMarkup(kind) {\n    var config = statusHelp[kind];\n    var id = 'invoice-single-order-' + kind + '-help';\n    return '<span class=\"invoice-status-help\" data-status-help data-single-order-status-help=\"' + kind + '\"><button type=\"button\" aria-expanded=\"false\" aria-controls=\"' + id + '\" aria-label=\"' + esc(config.title) + '\" title=\"查看' + esc(config.title) + '\">?</button><span id=\"' + id + '\" class=\"invoice-status-help-popover\" role=\"tooltip\"><strong>' + esc(config.title) + '</strong>' + config.items.map(function (item) { return '<span><b>' + esc(item[0]) + '：</b>' + esc(item[1]) + '</span>'; }).join('') + '</span></span>';\n  }\n\n  function ensureHeaderHelp() {\n    var table = root.querySelector('table[aria-label=\"票据列表\"]');\n    if (!table || !table.tHead || !table.tHead.rows[0]) return;\n    Array.from(table.tHead.rows[0].cells).forEach(function (header) {\n      var label = header.textContent.trim();\n      var kind = label === '票据状态' ? 'document' : label === '交付状态' ? 'delivery' : '';\n      if (!kind || header.querySelector('[data-single-order-status-help]')) return;\n      header.innerHTML = '<span class=\"invoice-th-with-help\">' + esc(label) + helpMarkup(kind) + '</span>';\n      bindHelp(header.querySelector('[data-single-order-status-help]'));\n    });\n  }\n\n  function normalizeDeliveryCopy() {\n    root.querySelectorAll('option, .invoice-badge, .invoice-detail-state-value, td').forEach(function (element) {\n      var value = element.textContent.trim();\n      if (value !== '部分送达' && value !== '部分渠道送达') return;\n      if (element.tagName === 'OPTION') element.remove();\n      else if (element.children.length === 0) element.textContent = '交付失败';\n    });\n    root.querySelectorAll('td').forEach(function (element) {\n      if (element.children.length === 0 && element.textContent.trim() === '站内、邮件') element.textContent = '邮件';\n    });\n  }\n\n  function normalizeStatusClarity() {\n    scheduled = false;\n    normalizeDeliveryCopy();\n    ensureHeaderHelp();\n  }\n\n  function scheduleNormalize() {\n    if (scheduled) return;\n    scheduled = true;\n    requestAnimationFrame(normalizeStatusClarity);\n  }\n\n  new MutationObserver(scheduleNormalize).observe(root, { childList: true, subtree: true });\n  window.addEventListener('resize', function () {\n    root.querySelectorAll('[data-single-order-status-help][data-open=\"true\"]').forEach(positionHelp);\n  });\n  scheduleNormalize();\n})();\n"
  ]
};

/* 申请详情抽屉：对齐云登 PC 端开票记录详情的分区与处理时间线样式。 */
(function (module) {
  if (!module) return;

  module.styles.push(`
.invoice-module .invoice-detail-tab-shell {
  display: contents;
  overflow: visible;
  border-radius: 0;
  background: transparent;
}

.invoice-module .invoice-detail-state-panel.invoice-detail-section,
.invoice-module .invoice-detail-tab-shell > .invoice-detail-section {
  margin: 0 0 16px;
  padding: 16px;
  border: 0;
  border-radius: 8px;
  background: var(--invoice-card);
}

.invoice-module .invoice-detail-state-panel.invoice-detail-section h3,
.invoice-module .invoice-detail-tab-shell > .invoice-detail-section h3 {
  margin: 0 0 16px;
  color: var(--invoice-ink);
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
}

.invoice-module .invoice-detail-state-panel .invoice-detail-states {
  margin-bottom: 0;
}

.invoice-module .invoice-process-timeline {
  margin: 0;
  padding: 0 0 0 4px;
  list-style: none;
}

.invoice-module .invoice-process-timeline li {
  position: relative;
  min-height: 64px;
  padding: 0 0 20px 20px;
  border-left: 1px solid var(--invoice-line);
}

.invoice-module .invoice-process-timeline li:last-child {
  min-height: 0;
  padding-bottom: 0;
  border-left-color: transparent;
}

.invoice-module .invoice-process-timeline li::before {
  content: '';
  position: absolute;
  top: 6px;
  left: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--invoice-blue);
}

.invoice-module .invoice-process-timeline-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.invoice-module .invoice-process-timeline-action {
  color: var(--invoice-ink);
  font-size: 13px;
  line-height: 20px;
  font-weight: 600;
}

.invoice-module .invoice-process-timeline-time {
  flex: none;
  color: var(--invoice-muted);
  font: 12px/20px 'JetBrains Mono', monospace;
  white-space: nowrap;
}

.invoice-module .invoice-process-timeline-copy {
  margin: 8px 0 0;
  color: var(--invoice-sub);
  font-size: 12px;
  line-height: 20px;
}

.invoice-module .invoice-drawer-footer {
  justify-content: flex-end;
  gap: 12px;
}

.invoice-module .invoice-drawer-footer-note {
  display: none !important;
}

.invoice-module .invoice-drawer-footer .invoice-head-actions {
  margin-left: auto;
}

.invoice-module .invoice-drawer-footer [data-lucide],
.invoice-module .invoice-drawer-footer .lucide {
  display: none !important;
}

@media (max-width: 520px) {
  .invoice-module .invoice-process-timeline-head {
    display: block;
  }

  .invoice-module .invoice-process-timeline-time {
    display: block;
    margin-top: 4px;
  }
}
  `);
  module.styles.push(`
.invoice-module .invoice-correction-filter-flow { display:grid; grid-template-columns:repeat(auto-fill,minmax(388px,1fr)); gap:12px 16px; margin-bottom:16px; }
.invoice-module .invoice-correction-filter-flow .invoice-filter-item { display:flex; align-items:center; gap:0; min-width:0; }
.invoice-module .invoice-correction-filter-flow label { width:88px; flex:0 0 88px; text-align:right; }
.invoice-module .invoice-correction-filter-flow .invoice-control { width:300px; max-width:300px; }
.invoice-module .invoice-correction-filter-flow .invoice-filter-actions { display:flex; align-items:center; gap:12px; }
.invoice-module .invoice-correction-detail-table { min-width:1840px; }
.invoice-module .invoice-correction-detail-table td:nth-child(6), .invoice-module .invoice-correction-detail-table td:nth-child(7), .invoice-module .invoice-correction-detail-table td:nth-child(8), .invoice-module .invoice-correction-detail-table td:nth-child(9) { white-space:normal; min-width:180px; }
@media (max-width:520px) { .invoice-module .invoice-correction-filter-flow { grid-template-columns:minmax(0,1fr); } .invoice-module .invoice-correction-filter-flow .invoice-control { max-width:calc(100% - 88px); } }
`);
  module.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) { return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]; }); }
  function makeFilters(block, table) {
    if (block.querySelector('.invoice-correction-filter-flow')) return;
    var flow = document.createElement('div');
    flow.className = 'invoice-correction-filter-flow';
    flow.innerHTML = '<div class="invoice-filter-item"><label for="correctionNoFilter">更正申请号</label><input id="correctionNoFilter" class="invoice-control" placeholder="请输入更正申请号"></div>' +
      '<div class="invoice-filter-item"><label for="correctionSubjectFilter">受票主体</label><input id="correctionSubjectFilter" class="invoice-control" placeholder="请输入受票主体"></div>' +
      '<div class="invoice-filter-item"><label for="correctionStatusFilter">处理状态</label><select id="correctionStatusFilter" class="invoice-control"><option value="">全部处理状态</option><option>待审核</option><option>已通过</option><option>红冲处理中</option><option>红冲失败</option><option>已完成</option><option>已驳回</option><option>已撤回</option><option>已取消</option></select></div>' +
      '<div class="invoice-filter-item"><label for="correctionTypeFilter">更正类型</label><select id="correctionTypeFilter" class="invoice-control"><option value="">全部更正类型</option><option>票面更正</option><option>交付信息变更</option></select></div>' +
      '<div class="invoice-filter-item"><label for="correctionApplicantFilter">申请人</label><input id="correctionApplicantFilter" class="invoice-control" placeholder="请输入申请人"></div>' +
      '<div class="invoice-filter-item"><label>申请时间</label><div class="invoice-date-range"><input id="correctionStartDate" class="invoice-date-input" type="date" aria-label="申请开始日期"><span class="invoice-date-sep">~</span><input id="correctionEndDate" class="invoice-date-input" type="date" aria-label="申请结束日期"></div></div>' +
      '<div class="invoice-filter-actions"><button type="button" class="invoice-btn invoice-btn-primary" data-correction-filter-action="query">查询</button><button type="button" class="invoice-btn invoice-btn-default" data-correction-filter-action="reset">重置</button></div>';
    var header = block.querySelector('.invoice-list-header');
    if (header) header.after(flow); else block.prepend(flow);
    flow.addEventListener('click', function (event) { var button = event.target.closest('[data-correction-filter-action]'); if (!button) return; event.preventDefault(); if (button.dataset.correctionFilterAction === 'reset') flow.querySelectorAll('input,select').forEach(function (control) { control.value = ''; }); applyFilters(table, flow); });
  }
  function applyFilters(table, flow) {
    var value = function (id) { var node = flow.querySelector('#' + id); return node ? node.value.trim().toLowerCase() : ''; };
    var filters = { no:value('correctionNoFilter'), subject:value('correctionSubjectFilter'), status:value('correctionStatusFilter'), type:value('correctionTypeFilter'), applicant:value('correctionApplicantFilter'), start:value('correctionStartDate'), end:value('correctionEndDate') };
    Array.from(table.tBodies[0].rows).forEach(function (row) {
      var cells = row.children; var date = cells[1] ? cells[1].textContent.trim().slice(0,10) : '';
      var show = (!filters.no || cells[0].textContent.toLowerCase().indexOf(filters.no)>=0) && (!filters.subject || cells[2].textContent.toLowerCase().indexOf(filters.subject)>=0) && (!filters.status || cells[10].textContent.trim() === filters.status) && (!filters.type || cells[5].textContent.trim() === filters.type) && (!filters.applicant || cells[11].textContent.toLowerCase().indexOf(filters.applicant)>=0) && (!filters.start || date >= filters.start) && (!filters.end || date <= filters.end);
      row.hidden = !show;
    });
  }
  function normalize() {
    var table = root.querySelector('table[aria-label="更正申请列表"]');
    if (!table || !table.tHead || !table.tBodies[0]) return;
    var block = table.closest('.invoice-block'); if (!block) return;
    makeFilters(block, table);
    if (table.dataset.correctionDetailColumns === 'true') return;
    table.classList.add('invoice-correction-detail-table');
    table.tHead.innerHTML = '<tr><th>更正申请号</th><th>原蓝票类型</th><th>原蓝票抬头</th><th>原蓝票号码</th><th>开票金额</th><th>更正类型</th><th>更正项</th><th>更正原因</th><th>变更后信息</th><th>重开申请单号</th><th>处理状态</th><th>申请人</th><th>申请时间</th><th>操作</th></tr>';
    Array.from(table.tBodies[0].rows).forEach(function (row) {
      var c = row.children; if (c.length < 11) return;
      var type = c[4].textContent.trim() || '票面更正';
      var item = c[5].textContent.trim() || '—';
      var reason = c[6].textContent.trim() || '—';
      var title = c[2].textContent.trim() || '—';
      var invoice = type === '交付信息变更' ? '—' : item;
      var invoiceType = /个人/.test(title) ? '数电普票' : '数电专票';
      var reOpen = c[9] ? c[9].textContent.trim() : '—';
      var action = c[10] ? c[10].innerHTML : '';
      row.innerHTML = '<td class="mono"><button type="button" class="invoice-btn-link primary-cell" data-action="correction-detail" data-id="' + esc(c[0].textContent.trim()) + '">' + esc(c[0].textContent.trim()) + '</button></td><td>' + invoiceType + '</td><td>' + esc(title) + '</td><td class="mono">' + esc(invoice.replace(/^数电票-?/,'')) + '</td><td class="amount">' + esc(c[7].textContent.trim()) + '</td><td>' + esc(type) + '</td><td>' + esc(item) + '</td><td>' + esc(reason) + '</td><td>' + (type === '交付信息变更' ? 'service@mail.com' : '按更正后票面信息重开') + '</td><td class="mono">' + esc(reOpen) + '</td><td>' + c[8].innerHTML + '</td><td>' + esc(c[3].textContent.trim()) + '</td><td class="mono">' + esc(c[1].textContent.trim()) + '</td><td><div class="actions">' + action + '</div></td>';
    });
    table.dataset.correctionDetailColumns = 'true';
  }
  root.addEventListener('click', function (event) { if (event.target.closest('[data-action="red-subtab"][data-value="corrections"]')) setTimeout(normalize, 900); }, true);
  setTimeout(normalize, 1500);
})();
  `);

  module.styles.push(`
.invoice-module .invoice-correction-scope-tabs { display: none !important; }
.invoice-module .invoice-correction-unified-table { min-width: 1380px; }
.invoice-module .invoice-correction-unified-table td:nth-child(5),
.invoice-module .invoice-correction-unified-table td:nth-child(6) { white-space: normal; min-width: 210px; }
.invoice-module .invoice-list-title[data-correction-unified="true"] { font-size: 0; }
.invoice-module .invoice-list-title[data-correction-unified="true"]::after { content: '更正申请列表'; font-size: 16px; }
.invoice-module .invoice-block:has(table[aria-label="开票申请列表"]) .invoice-list-toolbar { display: none !important; }
`);

  module.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  function normalizeIssuanceStatus() {
    root.querySelectorAll('[data-action="application-status"]').forEach(function (button) {
      if (button.textContent.indexOf('部分开票异常') >= 0) button.remove();
    });
    root.querySelectorAll('select').forEach(function (select) {
      if (select.id === 'applicationExtraissuance' || select.id === 'issuanceStateFilter') {
        Array.from(select.options).forEach(function (option) {
          if (option.textContent.indexOf('部分成功') >= 0) option.remove();
        });
      }
    });
    root.querySelectorAll('th .invoice-status-help-popover, [data-status-help] .invoice-status-help-popover').forEach(function (popover) {
      popover.querySelectorAll('span').forEach(function (item) {
        if (item.textContent.indexOf('部分成功') >= 0 || item.textContent.indexOf('部分开票异常') >= 0) item.remove();
      });
    });
    var table = root.querySelector('table[aria-label="开票申请列表"]');
    if (!table) return;
    Array.from(table.tBodies[0].rows).forEach(function (row) {
      if (row.cells.length < 16) return;
      var issuanceCell = row.cells[12];
      var issuanceText = issuanceCell.textContent.trim();
      if (issuanceText === '部分成功') {
        issuanceCell.innerHTML = '<span class="invoice-badge invoice-badge-danger">开具失败</span>';
      }
      var derivedCell = row.cells[10];
      if (derivedCell && derivedCell.textContent.trim() === '部分开票异常') {
        derivedCell.innerHTML = '<span class="invoice-badge invoice-badge-danger">开票失败</span>';
      }
    });
  }
  setTimeout(normalizeIssuanceStatus, 950);
  setTimeout(normalizeIssuanceStatus, 1300);
  root.addEventListener('click', function () { setTimeout(normalizeIssuanceStatus, 180); }, true);
  root.addEventListener('change', function () { setTimeout(normalizeIssuanceStatus, 180); }, true);
  
  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]; }); }
  function unify() {
    var table = root.querySelector('table[aria-label="更正申请列表"]');
    if (!table || !table.tHead || !table.tBodies[0]) return;
    if (table.dataset.correctionUnified === 'true' && table.tHead.rows[0] && table.tHead.rows[0].cells.length === 11 && table.closest('.invoice-block').querySelector('.invoice-list-title')?.textContent.trim() === '更正申请列表') return;
    var sourceRows = table.__correctionFlowRows || Array.from(table.tBodies[0].rows).map(function (row) {
      var cells = Array.from(row.children);
      return { id: cells[0] && cells[0].textContent.trim(), created: cells[1] && cells[1].textContent.trim(), subject: cells[2] && cells[2].textContent.trim(), applicant: cells[3] && cells[3].textContent.trim(), target: cells[4] && cells[4].textContent.trim(), reason: cells[5] && cells[5].textContent.trim(), amount: cells[6] && cells[6].textContent.trim(), statusHtml: cells[7] ? cells[7].innerHTML : '<span class="muted">—</span>', status: cells[7] ? cells[7].textContent.trim() : '—', draft: '—', actionHtml: cells[8] ? cells[8].innerHTML : '', isDelivery: false };
    });
    var listBlock = table.closest('.invoice-block');
    if (!listBlock) return;
    listBlock.querySelectorAll('.invoice-list-divider').forEach(function (node) { node.remove(); });
    var heading = listBlock.querySelector('.invoice-list-title');
    if (heading) heading.textContent = '更正申请列表';
    var total = listBlock.querySelector('.invoice-list-total');
    if (total) total.innerHTML = '共 <span class="mono">' + sourceRows.length + '</span> 条';
    table.classList.add('invoice-correction-unified-table');
    table.tHead.innerHTML = '<tr><th>更正申请号</th><th>申请时间</th><th>受票主体</th><th>申请人</th><th>更正类型</th><th>更正项</th><th>更正原因 / 变更后信息</th><th>金额</th><th>处理状态</th><th>处理结果</th><th>操作</th></tr>';
    table.tBodies[0].innerHTML = sourceRows.length ? sourceRows.map(function (row) {
      var delivery = Boolean(row.isDelivery);
      var type = delivery ? '交付信息变更' : '票面更正';
      var item = delivery ? (row.target || '收件邮箱') : (row.target || '原蓝票');
      var result = delivery ? '<span class="invoice-badge invoice-badge-info">待重新发送</span>' : (row.draft && row.draft !== '—' ? '<span class="invoice-badge invoice-badge-info">' + esc(row.draft) + '</span>' : '<span class="muted">红冲完成后处理</span>');
      var actions = row.actionHtml || '<button type="button" class="invoice-btn-link" data-action="correction-detail" data-id="' + esc(row.id) + '">详情</button>';
      return '<tr><td class="mono"><button type="button" class="invoice-btn-link primary-cell" data-action="correction-detail" data-id="' + esc(row.id) + '">' + esc(row.id) + '</button></td><td class="mono">' + esc(row.created) + '</td><td>' + esc(row.subject) + '</td><td>' + esc(row.applicant) + '</td><td>' + esc(type) + '</td><td>' + esc(item) + '</td><td>' + esc(row.reason || '—') + '</td><td class="amount">' + esc(row.amount || '—') + '</td><td>' + (row.statusHtml || '<span class="muted">—</span>') + '</td><td>' + result + '</td><td><div class="actions">' + actions + '</div></td></tr>';
    }).join('') : '<tr><td colspan="11"><div class="invoice-empty"><strong>暂无更正申请</strong><p>当前没有票面更正或交付信息变更记录。</p></div></td></tr>';
    table.dataset.correctionUnified = 'true';
    table.dataset.correctionFlowScope = 'red';
    var unifiedHeading = listBlock.querySelector('.invoice-list-title');
    if (unifiedHeading) {
      unifiedHeading.dataset.correctionUnified = 'true';
      unifiedHeading.textContent = '更正申请列表';
      setTimeout(function () { if (unifiedHeading.isConnected) unifiedHeading.textContent = '更正申请列表'; }, 80);
    }
  }
  root.addEventListener('click', function (event) {
    var tab = event.target.closest('[data-action="red-subtab"][data-value="corrections"]');
    if (tab) setTimeout(unify, 1200);
  }, true);
  setTimeout(unify, 1200);
})();

  `);

  (function (module) {
  if (!module) return;
  module.styles.push(`
.invoice-module .invoice-application-filter-range {
  position: relative;
  width: 300px;
  height: 32px;
  gap: 0;
  padding: 0 8px;
  border: 1px solid var(--invoice-line);
  border-radius: 4px;
  background: #fff;
}
.invoice-module .invoice-application-filter-range input {
  width: 122px;
  height: 30px;
  font-size: 14px;
}
.invoice-module .invoice-application-filter-range span { margin: 0 2px; font-size: 14px; }
.invoice-module .invoice-application-filter-range::after {
  content: '⌄';
  position: absolute;
  right: 8px;
  color: var(--invoice-muted);
  pointer-events: none;
}
.invoice-module .invoice-application-filter-range input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0; width: 18px; cursor: pointer; }
.invoice-module .invoice-application-status-filter { order: 0; }
.invoice-module .invoice-application-status-filter select { width: 300px; }
`);

  module.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  var filterState = { application: '', issuance: '', document: '', delivery: '' };
  var busy = false;
  var helpItems = {
    application: [['待审核', '申请已提交，等待授权管理员或财务直接审核。'], ['审核通过', '审核已通过，等待或正在提交开票任务。'], ['已驳回', '审核未通过，申请不可继续按当前版本开具。'], ['已撤回', '用户在审核决定前撤回申请。'], ['已取消', '因退款、余额或其他业务事实变化而取消。']],
    issuance: [['未提交', '尚未向第三方服务商发起开具请求。'], ['提交中', '请求已提交，等待服务商受理。'], ['开具中', '服务商正在处理开具。'], ['开具成功', '服务商已返回有效票据。'], ['开具失败', '服务商明确返回失败，需要查看原因后按规则处置。'], ['结果未知', '请求超时或回调缺失，只能按原请求查询，不能直接重试。']],
    document: [['未生成', '尚未形成正式票据。'], ['有效', '蓝票有效，尚未发生成功红冲。'], ['红冲处理中', '存在待处理、处理中或结果未知的红冲金额。'], ['部分红冲', '部分金额已成功红冲，原票仍有剩余有效金额。'], ['已全额红冲', '累计成功红冲金额等于原票金额，剩余有效金额为 0。'], ['红冲失败', '红冲明确失败，仍需按任务规则处置。']],
    delivery: [['未发送', '邮件尚未发送。'], ['发送中', '邮件正在发送，尚未返回最终结果。'], ['已送达', '邮件已发送成功。'], ['交付失败', '邮件发送失败，可核对邮箱后重新发送。']]
  };
  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]; }); }
  function addHelp(header, key) {
    if (!header || header.dataset.applicationHelpReady === key) return;
    var label = header.textContent.split('?').join('').trim();
    if (!helpItems[key] || label !== ({ application: '申请状态', issuance: '开具状态', document: '票据状态', delivery: '交付状态' }[key])) return;
    header.textContent = '';
    var wrap = document.createElement('span'); wrap.className = 'invoice-th-with-help'; wrap.textContent = label;
    var help = document.createElement('span'); help.className = 'invoice-status-help'; help.setAttribute('data-status-help', '');
    help.innerHTML = '<button type="button" aria-expanded="false" aria-label="' + label + '说明" title="查看' + label + '说明">?</button><span class="invoice-status-help-popover" role="tooltip"><strong>' + label + '说明</strong>' + helpItems[key].map(function (item) { return '<span><b>' + esc(item[0]) + '：</b>' + esc(item[1]) + '</span>'; }).join('') + '</span>';
    wrap.appendChild(help); header.appendChild(wrap); header.dataset.applicationHelpReady = key;
  }
  function makeStatusFilter(flow, key, label, options) {
    if (flow.querySelector('[data-application-extra-filter="' + key + '"]')) return;
    var item = document.createElement('div'); item.className = 'invoice-filter-item invoice-application-status-filter'; item.dataset.applicationExtraFilter = key;
    item.innerHTML = '<label for="applicationExtra' + key + '">' + label + '</label><select id="applicationExtra' + key + '" class="invoice-control"><option value="">全部' + label + '</option>' + options.map(function (value) { return '<option>' + esc(value) + '</option>'; }).join('') + '</select>';
    var actions = flow.querySelector('.invoice-filter-actions');
    flow.insertBefore(item, actions || null);
    item.querySelector('select').value = filterState[key];
  }
  function ensureFilters() {
    var table = root.querySelector('table[aria-label="开票申请列表"]');
    var flow = root.querySelector('.invoice-filter-flow');
    if (!flow || !table) return;
    makeStatusFilter(flow, 'issuance', '开具状态', ['未提交', '提交中', '开具中', '开具成功', '开具失败', '结果未知']);
    makeStatusFilter(flow, 'document', '票据状态', ['未生成', '有效', '红冲处理中', '部分红冲', '已全额红冲', '红冲失败']);
    makeStatusFilter(flow, 'delivery', '交付状态', ['未发送', '发送中', '已送达', '交付失败']);
  }
  function normalizeTable() {
    var table = root.querySelector('table[aria-label="开票申请列表"]');
    if (!table) return;
    var block = table.closest('.invoice-block');
    var toolbar = block && block.querySelector('.invoice-list-toolbar');
    var header = block && block.querySelector('.invoice-list-header');
    if (toolbar) {
      var actions = toolbar.querySelector('.invoice-list-actions');
      if (actions && header && !header.querySelector('.invoice-list-actions')) header.appendChild(actions);
      toolbar.remove();
    }
    block && block.querySelectorAll('.invoice-list-divider, [data-action="application-status"]').forEach(function (node) { node.remove(); });
    Array.from(table.tHead.querySelectorAll('th')).forEach(function (th) {
      var text = th.textContent.split('?')[0].trim();
      var key = text === '申请状态' ? 'application' : text === '开具状态' ? 'issuance' : text === '票据状态' ? 'document' : text === '交付状态' ? 'delivery' : '';
      if (key) addHelp(th, key);
    });
    table.querySelectorAll('tbody td:nth-child(3) .primary-cell').forEach(function (node) { node.classList.remove('primary-cell'); });
    ensureFilters();
    // 筛选统一由申请列表的数据查询处理，帮助脚本不再隐藏行。
  }
  root.addEventListener('click', function (event) {
    var query = event.target.closest('[data-invoice-list-action="query"]');
    var reset = event.target.closest('[data-invoice-list-action="reset"]');
    if (!query && !reset) return;
    var values = function (key) { var node = root.querySelector('#applicationExtra' + key); return node ? node.value : ''; };
    if (reset) filterState = { application: '', issuance: '', document: '', delivery: '' };
    else filterState = { application: values('application'), issuance: values('issuance'), document: values('document'), delivery: values('delivery') };
    setTimeout(normalizeTable, 300);
  }, true);
  root.addEventListener('change', function (event) {
    var select = event.target.closest('[data-application-extra-filter] select');
    if (!select) return;
    filterState[select.closest('[data-application-extra-filter]').dataset.applicationExtraFilter] = select.value;
    setTimeout(normalizeTable, 20);
  }, true);
  var helpScheduled = false;
  new MutationObserver(function () {
    if (helpScheduled) return;
    helpScheduled = true;
    requestAnimationFrame(function () { helpScheduled = false; normalizeTable(); });
  }).observe(root, {childList:true,subtree:true});
  normalizeTable();
})();
  `);
  })(window.YundengModules && window.YundengModules["invoice-management"]);

  module.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  var body = root.querySelector('#invoiceDrawerBody');
  var footer = root.querySelector('#invoiceDrawerFooter');
  if (!body || !footer) return;
  var scheduled = false;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function fieldValue(label) {
    var field = Array.from(body.querySelectorAll('.invoice-detail-field')).find(function (item) {
      var term = item.querySelector('dt');
      return term && term.textContent.trim() === label;
    });
    var value = field && field.querySelector('dd');
    return value ? value.textContent.trim() : '';
  }

  function stateValue(label) {
    var state = Array.from(body.querySelectorAll('.invoice-detail-state')).find(function (item) {
      var name = item.querySelector('.invoice-detail-state-label');
      return name && name.textContent.trim() === label;
    });
    var value = state && state.querySelector('.invoice-detail-state-value');
    return value ? value.textContent.trim() : '';
  }

  function addMinutes(value, minutes) {
    var match = String(value || '').match(/^(\\d{4})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2})$/);
    if (!match) return value || '—';
    var date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4]), Number(match[5]));
    date.setMinutes(date.getMinutes() + minutes);
    var pad = function (number) { return String(number).padStart(2, '0'); };
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes());
  }

  function eventMarkup(event) {
    return '<li><div class="invoice-process-timeline-head"><strong class="invoice-process-timeline-action">' + esc(event.action) + '</strong><time class="invoice-process-timeline-time" datetime="' + esc(event.time.replace(' ', 'T')) + '">' + esc(event.time) + '</time></div><p class="invoice-process-timeline-copy">' + esc(event.copy) + '</p></li>';
  }

  function buildTimeline() {
    var section = Array.from(body.querySelectorAll('.invoice-detail-section')).find(function (item) {
      var heading = item.querySelector('h3');
      return heading && (heading.textContent.trim() === '时间线审计' || heading.textContent.trim() === '处理时间线');
    });
    if (!section) return;
    var applicationId = fieldValue('申请编号');
    if (!applicationId || section.dataset.timelineApplicationId === applicationId) return;
    var created = fieldValue('申请时间') || '—';
    var amount = fieldValue('本次申请金额') || '—';
    var applicationStatus = stateValue('申请状态');
    var issuanceStatus = stateValue('开具状态');
    var deliveryStatus = stateValue('交付状态');
    var events = [
      { action: '提交申请', time: created, copy: '已提交当前订单的开票申请，申请金额 ' + amount + '。' },
      { action: '资格校验', time: addMinutes(created, 4), copy: '订单支付、履约状态和发票内容映射校验完成。' }
    ];

    if (applicationStatus === '待审核') {
      events.push({ action: '等待审核', time: addMinutes(created, 6), copy: '系统校验通过，等待有权限的管理员或财务审核。' });
    } else if (applicationStatus === '已驳回') {
      events.push({ action: '审核驳回', time: addMinutes(created, 6), copy: '财务已驳回申请，驳回原因已记录。' });
    } else if (applicationStatus === '已撤回') {
      events.push({ action: '撤回申请', time: addMinutes(created, 6), copy: '申请人已在审核前撤回本次开票申请。' });
    } else if (applicationStatus === '已取消') {
      events.push({ action: '取消申请', time: addMinutes(created, 6), copy: '业务条件发生变化，本次开票申请已取消。' });
    } else {
      events.push({ action: '审核通过', time: addMinutes(created, 6), copy: '财务审核通过，已提交电子发票开具任务。' });
    }

    if (issuanceStatus === '开具成功') {
      events.push({ action: '开票成功', time: addMinutes(created, 34), copy: '电子发票已生成，可在票据管理中查看。' });
    } else if (issuanceStatus === '开具失败') {
      events.push({ action: '开票失败', time: addMinutes(created, 34), copy: '第三方明确返回失败，等待确认后处置。' });
    } else if (issuanceStatus === '结果未知') {
      events.push({ action: '等待开票结果', time: addMinutes(created, 34), copy: '第三方结果未知，系统将按原受理号继续查询。' });
    } else if (issuanceStatus === '开具中' || issuanceStatus === '提交中') {
      events.push({ action: '开票处理中', time: addMinutes(created, 12), copy: '开票请求已提交，正在等待第三方处理结果。' });
    }

    if (deliveryStatus === '已送达') {
      events.push({ action: '邮件送达', time: addMinutes(created, 36), copy: '电子发票已发送至申请填写的联系邮箱。' });
    } else if (deliveryStatus === '交付失败') {
      events.push({ action: '邮件发送失败', time: addMinutes(created, 36), copy: '电子发票邮件发送失败，可核对邮箱后重新发送。' });
    }

    var heading = section.querySelector('h3');
    if (heading) heading.textContent = '处理时间线';
    section.querySelectorAll('.invoice-timeline, .invoice-process-timeline').forEach(function (timeline) { timeline.remove(); });
    section.insertAdjacentHTML('beforeend', '<ol class="invoice-process-timeline">' + events.map(eventMarkup).join('') + '</ol>');
    section.dataset.timelineApplicationId = applicationId;
  }

  function normalizeStateSection() {
    var panel = body.querySelector('.invoice-detail-state-panel');
    if (!panel) return;
    panel.classList.add('invoice-detail-section');
    if (!panel.querySelector('h3')) panel.insertAdjacentHTML('afterbegin', '<h3>状态概览</h3>');
  }

  function normalizeFooter() {
    footer.querySelectorAll('.invoice-drawer-footer-note').forEach(function (note) { note.remove(); });
    footer.querySelectorAll('[data-lucide], .lucide').forEach(function (icon) { icon.remove(); });
  }

  function normalizeDrawer() {
    scheduled = false;
    normalizeStateSection();
    buildTimeline();
    normalizeFooter();
  }

  function scheduleNormalize() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(normalizeDrawer);
  }

  new MutationObserver(scheduleNormalize).observe(body, { childList: true, subtree: true });
  new MutationObserver(scheduleNormalize).observe(footer, { childList: true, subtree: true });
  scheduleNormalize();
})();
  `);
/* 红冲状态说明：筛选字段和列表表头共用同一套状态口径。 */
(function () {
  var moduleDef = window.YundengModules && window.YundengModules["invoice-management"];
  if (!moduleDef) return;
  moduleDef.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  var descriptions = [
    ['待处理', '任务已创建，尚未提交第三方；仅同一原票任务队列允许提交。'],
    ['待受票方确认', '第三方要求受票方确认红字信息，确认完成后才可继续红冲。'],
    ['提交中', '红冲请求正在发送或等待第三方受理。'],
    ['红冲中', '第三方已受理，正在处理红冲结果。'],
    ['结果未知', '请求超时或回调缺失，只能查询原任务，不能直接重试。'],
    ['部分红冲成功', '部分红冲金额或执行子任务已成功，仍有剩余金额、子任务失败或处理中；原蓝票仍可能存在有效余额。'],
    ['已红冲', '本次目标红冲金额已全部成功，红票已生成或正在进入文件交付。'],
    ['红冲失败', '第三方明确返回失败，确认未生成红票后才允许重试。'],
    ['已取消', '仅符合规则的财务纠错任务在提交第三方前取消，退款和用户更正红冲不可取消。']
  ];
  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]; }); }
  function renderHelp(header) {
    if (!header || header.dataset.redStatusHelpReady === 'true') return;
    var label = header.textContent.trim();
    if (label !== '红冲状态') return;
    header.textContent = '';
    var wrap = document.createElement('span');
    wrap.className = 'invoice-th-with-help';
    wrap.textContent = '红冲状态';
    var help = document.createElement('span');
    help.className = 'invoice-status-help';
    help.setAttribute('data-status-help', '');
    help.innerHTML = '<button type="button" aria-expanded="false" aria-label="红冲状态说明" title="查看红冲状态说明">?</button><span class="invoice-status-help-popover" role="tooltip"><strong>红冲状态说明</strong>' + descriptions.map(function (item) { return '<span><b>' + esc(item[0]) + '：</b>' + esc(item[1]) + '</span>'; }).join('') + '</span>';
    wrap.appendChild(help);
    header.appendChild(wrap);
    header.dataset.redStatusHelpReady = 'true';
    if (window.lucide) window.lucide.createIcons();
  }
  function normalize() {
    var label = root.querySelector('label[for="redStatus"]');
    if (label && label.textContent.trim() !== '红冲状态：') label.textContent = '红冲状态：';
    var table = root.querySelector('table[aria-label="红冲任务列表"]');
    if (table && table.tHead) Array.from(table.tHead.querySelectorAll('th')).forEach(renderHelp);
  }
  new MutationObserver(normalize).observe(root, { childList: true, subtree: true });
  normalize();
})();
  `);
})();

})(window.YundengModules && window.YundengModules["invoice-management"]);

/* 一订单一票：在原型 Mock 装载前移除申请级开具 PARTIAL，保留红冲 PARTIAL。 */
(function () {
  var moduleDef = window.YundengModules && window.YundengModules["invoice-management"];
  if (!moduleDef) return;
  moduleDef.before = moduleDef.before || [];
  moduleDef.before.push(`
(function () {
  var bundle = window.__YundengInlineBundle;
  if (!bundle || !Array.isArray(bundle.scripts)) return;
  bundle.scripts = bundle.scripts.map(function (source) {
    source = source.replace(/'APPROVED', 'PARTIAL'/g, "'APPROVED', 'SUCCEEDED'");
    source = source.replace(/<option value="PARTIAL">部分成功<\\/option>/g, '');
    source = source.replace(/\['部分成功', '[^']*'\],?/g, '');
    source = source.replace(/\['部分开票异常', '[^']*'\],?/g, '');
    source = source.replace(/PARTIAL: \['部分开票异常', '[^']*'\]/g, '');
    return source;
  });
})();
  `);
})();

/* 红冲任务：按业务字段拆分列表，并明确可红冲场景。 */
(function () {
  var moduleDef = window.YundengModules && window.YundengModules["invoice-management"];
  if (!moduleDef) return;

  moduleDef.styles.push(`
    .invoice-module .invoice-red-task-table {
      min-width: 1420px;
    }
    .invoice-module .invoice-red-task-table th:nth-child(1),
    .invoice-module .invoice-red-task-table td:nth-child(1) { min-width: 170px; }
    .invoice-module .invoice-red-task-table th:nth-child(2),
    .invoice-module .invoice-red-task-table td:nth-child(2) { min-width: 120px; }
    .invoice-module .invoice-red-task-table th:nth-child(3),
    .invoice-module .invoice-red-task-table td:nth-child(3) { min-width: 250px; white-space: normal; }
    .invoice-module .invoice-red-task-table th:nth-child(4),
    .invoice-module .invoice-red-task-table td:nth-child(4) { min-width: 120px; }
    .invoice-module .invoice-red-task-table th:nth-child(5),
    .invoice-module .invoice-red-task-table td:nth-child(5) { min-width: 220px; }
    .invoice-module .invoice-red-task-table th:nth-child(6),
    .invoice-module .invoice-red-task-table td:nth-child(6) { min-width: 170px; }
    .invoice-module .invoice-red-task-table th:nth-child(7),
    .invoice-module .invoice-red-task-table td:nth-child(7) { min-width: 125px; }
    .invoice-module .invoice-red-task-table th:nth-child(8),
    .invoice-module .invoice-red-task-table td:nth-child(8) { min-width: 120px; }
    .invoice-module .invoice-red-task-table th:nth-child(9),
    .invoice-module .invoice-red-task-table td:nth-child(9) { min-width: 100px; }
    .invoice-module .invoice-red-task-table th:nth-child(10),
    .invoice-module .invoice-red-task-table td:nth-child(10) { min-width: 190px; }
    .invoice-module .invoice-red-id { border: 0; padding: 0; background: transparent; color: var(--invoice-body); font: inherit; cursor: pointer; }
    .invoice-module .invoice-red-id:hover,
    .invoice-module .invoice-red-id:focus-visible { color: var(--invoice-blue); }
  `);

  moduleDef.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;

  var reasonByTaskId = {
    'RT-20260819-004': '服务中止：业务取消，已退款',
    'RT-20260819-003': '开票错误：税率录入错误，已跨月且已报税',
    'RT-20260819-002': '开票错误：受票人信息不匹配，需更正票面',
    'RT-20260818-018': '销货退回：订单全额退款',
    'RT-20260818-017': '销售折让：协商退还部分金额，可部分红冲',
    'RT-20260818-016': '其他：重复开票，需冲销多余票据',
    'RT-20260817-015': '开票错误：重复纠错，原任务取消',
    'RT-20260817-014': '服务中止：合同终止，退款处理'
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function cleanText(cell, removeSelector) {
    if (!cell) return '—';
    var clone = cell.cloneNode(true);
    clone.querySelectorAll('.muted, .invoice-status-help, ' + (removeSelector || '.never-match')).forEach(function (node) { node.remove(); });
    return clone.textContent.replace(/\\s+/g, ' ').trim() || '—';
  }

  function mutedText(cell) {
    var muted = cell && cell.querySelector('.muted');
    return muted ? muted.textContent.replace(/\\s+/g, ' ').trim() : '—';
  }

  function taskId(cell) {
    var button = cell && cell.querySelector('[data-id]');
    return button ? button.dataset.id : cleanText(cell);
  }

  function normalizeReason(id, cell) {
    return reasonByTaskId[id] || mutedText(cell);
  }

  function normalizeRow(row) {
    var cells = Array.from(row.children);
    if (cells.length < 7) return null;
    var id = taskId(cells[0]);
    var source = cleanText(cells[1]);
    var sourceHtml = esc(source);
    var reason = normalizeReason(id, cells[1]);
    var originalCell = cells[2];
    var originalNo = cleanText(originalCell).replace(/^数电票-?/, '');
    var title = mutedText(originalCell);
    var blueType = /个人/.test(title) ? '数电普票' : '数电专票';
    var amount = cleanText(cells[3]);
    var statusBadge = cells[4].querySelector('.invoice-badge');
    var statusHtml = statusBadge ? statusBadge.outerHTML : '<span class="invoice-status-parameter">' + esc(cleanText(cells[4])) + '</span>';
    var owner = cleanText(cells[5]);
    var actionGroup = cells[6].querySelector('.actions');
    var actions = actionGroup ? actionGroup.innerHTML : cells[6].innerHTML;
    row.dataset.redCreated = mutedText(cells[0]);
    cells[6].querySelectorAll('[data-action="retry-red"]').forEach(function (button) { button.textContent = '重试'; });
    actions = actionGroup ? actionGroup.innerHTML : cells[6].innerHTML;
    return '<td class="mono"><button type="button" class="invoice-red-id" data-action="red-detail" data-id="' + esc(id) + '">' + esc(id) + '</button></td>' +
      '<td>' + sourceHtml + '</td>' +
      '<td>' + esc(reason) + '</td>' +
      '<td>' + esc(blueType) + '</td>' +
      '<td>' + esc(title) + '</td>' +
      '<td class="mono">' + esc(originalNo) + '</td>' +
      '<td class="amount">' + esc(amount) + '</td>' +
      '<td>' + statusHtml + '</td>' +
      '<td>' + esc(owner) + '</td>' +
      '<td><div class="actions">' + actions + '</div></td>';
  }

  function normalizeRedTaskTable() {
    var table = root.querySelector('table[aria-label="红冲任务列表"]');
    if (!table || !table.tHead || !table.tBodies[0] || table.dataset.redTaskColumnsReady === 'true') return;
    table.closest('.invoice-block').querySelectorAll('.invoice-document-summary, .invoice-kpi-grid, .invoice-list-divider').forEach(function (node) { node.remove(); });
    table.classList.add('invoice-red-task-table');
    table.tHead.innerHTML = '<tr><th>任务ID</th><th>红冲来源</th><th>红冲原因</th><th>原蓝票类型</th><th>原蓝票抬头</th><th>原蓝票号码</th><th>红冲金额</th><th>红冲状态</th><th>负责人</th><th>操作</th></tr>';
    Array.from(table.tBodies[0].rows).forEach(function (row) {
      var normalized = normalizeRow(row);
      if (normalized) row.innerHTML = normalized;
      else if (row.cells[0]) row.cells[0].colSpan = 10;
    });
    table.setAttribute('aria-label', '红冲任务列表');
    table.dataset.redTaskColumnsReady = 'true';
  }

  var observer = new MutationObserver(function () { normalizeRedTaskTable(); });
  observer.observe(root, { childList: true, subtree: true });
  normalizeRedTaskTable();
})();
  `);
})();

/* 票据管理：字段拆分、电子发票预览和 PDF 下载。 */
(function (module) {
  if (!module) return;

  module.styles.push(`
.invoice-module table[aria-label="票据列表"] {
  min-width: 1760px;
}

.invoice-module .invoice-document-link,
.invoice-module .invoice-pdf-link {
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--invoice-blue);
  font: inherit;
  cursor: pointer;
}

.invoice-module .invoice-document-link {
  font-family: 'JetBrains Mono', monospace;
}
.invoice-module .invoice-document-id { padding: 0; border: 0; background: transparent; color: var(--invoice-body); font: inherit; cursor: pointer; }
.invoice-module .invoice-document-id:hover,
.invoice-module .invoice-document-id:focus-visible { color: var(--invoice-blue); }
.invoice-module #invoiceDocumentDetail .invoice-red-detail-footer { justify-content: flex-end; gap: 12px; }

.invoice-module .invoice-document-link:hover,
.invoice-module .invoice-pdf-link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.invoice-module .invoice-document-link:focus-visible,
.invoice-module .invoice-pdf-link:focus-visible {
  outline: 2px solid var(--invoice-blue);
  outline-offset: 2px;
  border-radius: 2px;
}

.invoice-module #invoicePreview {
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, .3);
}

.invoice-module #invoicePreview .invoice-preview {
  width: 760px;
  max-width: 92vw;
  max-height: calc(100vh - 40px);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, .12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.invoice-module #invoicePreview .invoice-dialog-header {
  height: 56px;
  flex: 0 0 56px;
  padding: 0 20px;
  border-bottom: 1px solid var(--invoice-line-light);
  background: #fff;
  display: flex;
  align-items: center;
}

.invoice-module #invoicePreview .invoice-dialog-header h2 {
  margin: 0;
  color: var(--invoice-ink);
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
}

.invoice-module #invoicePreview .invoice-preview-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 24px;
  background: var(--invoice-page);
}

.invoice-module .invoice-preview-sheet {
  width: 620px;
  max-width: 100%;
  margin: 0 auto;
  padding: 32px;
  border: 1px solid var(--invoice-line);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .06);
}

.invoice-module .invoice-preview-brand-row,
.invoice-module .invoice-preview-field-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.invoice-module .invoice-preview-brand {
  color: var(--invoice-blue);
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
}

.invoice-module .invoice-preview-number {
  color: var(--invoice-sub);
  font: 12px/22px 'JetBrains Mono', monospace;
}

.invoice-module .invoice-preview-accent {
  height: 2px;
  margin: 16px 0 28px;
  background: var(--invoice-blue);
}

.invoice-module .invoice-preview-title {
  margin: 0;
  color: var(--invoice-ink);
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  letter-spacing: 8px;
  text-align: center;
}

.invoice-module .invoice-preview-type {
  margin: 4px 0 24px;
  color: var(--invoice-sub);
  font-size: 12px;
  line-height: 20px;
  text-align: center;
}

.invoice-module .invoice-preview-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 32px;
  row-gap: 16px;
}

.invoice-module .invoice-preview-field {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 8px;
  color: var(--invoice-body);
  font-size: 13px;
  line-height: 20px;
}

.invoice-module .invoice-preview-field dt {
  color: var(--invoice-sub);
  text-align: right;
}

.invoice-module .invoice-preview-field dt::after {
  content: '：';
}

.invoice-module .invoice-preview-field dd {
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}

.invoice-module .invoice-preview-field dd.mono {
  font-family: 'JetBrains Mono', monospace;
}

.invoice-module .invoice-preview-note {
  margin: 28px 0 0;
  padding-top: 16px;
  border-top: 1px solid var(--invoice-line-light);
  color: var(--invoice-muted);
  font-size: 12px;
  line-height: 20px;
}

.invoice-module .invoice-preview-footer {
  min-height: 64px;
  flex: 0 0 64px;
  padding: 0 20px;
  border-top: 1px solid var(--invoice-line-light);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

@media (max-width: 640px) {
  .invoice-module #invoicePreview {
    padding: 16px;
  }

  .invoice-module #invoicePreview .invoice-preview-body,
  .invoice-module .invoice-preview-sheet {
    padding: 16px;
  }

  .invoice-module .invoice-preview-fields {
    grid-template-columns: 1fr;
  }
}
  `);

  module.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  var preview = root.querySelector('#invoicePreview');
  var previewPanel = preview && preview.querySelector('.invoice-preview');
  var previewBody = root.querySelector('#invoicePreviewBody');
  var previewTitle = root.querySelector('#invoicePreviewTitle');
  if (!preview || !previewPanel || !previewBody || !previewTitle) return;
  var documents = [];
  var activeDocumentId = '';
  var lastFocus = null;
  var scheduled = false;

  var contentMap = {
    'IA-20260819-0009': '信息技术服务*技术服务费',
    'IA-20260818-0026': '信息技术服务*服务费',
    'IA-20260818-0025': '信息技术服务*技术服务费',
    'IA-20260818-0020': '信息技术服务*服务费',
    'IA-20260818-0019': '信息技术服务*技术服务费',
    'IA-20260817-0017': '信息技术服务*技术服务费',
    'IA-20260819-0010': '信息技术服务*软件服务费',
    'IA-20260818-0021': '信息技术服务*技术服务费'
  };

  var taxMap = {
    '北京启明智能科技有限公司': '91110108MA01Q7M2X8',
    '成都拾光个人用户': '—',
    '上海云栈信息科技有限公司': '91310000MA1K5R8X48',
    '苏州青禾个人用户': '—',
    '合肥远见科技有限公司': '91340100MA2T8R6N5C',
    '天津澄明科技有限公司': '91120116MA05N8Q4X2',
    '广州云迹科技有限公司': '91440101MA5C7Y2N8Q',
    '杭州星河数字工作室': '91330108MA2B0X9C6T'
  };

  var emailMap = {
    '北京启明智能科技有限公司': 'finance@qiming.cn',
    '成都拾光个人用户': 'service@mail.com',
    '上海云栈信息科技有限公司': 'finance@yunstack.cn',
    '苏州青禾个人用户': 'service@mail.com',
    '合肥远见科技有限公司': 'finance@yuanjian.cn',
    '天津澄明科技有限公司': 'finance@chengming.cn',
    '广州云迹科技有限公司': 'accounts@yunji.cn',
    '杭州星河数字工作室': 'cashier@xinghe.cn'
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function primaryText(cell) {
    if (!cell) return '—';
    var clone = cell.cloneNode(true);
    clone.querySelectorAll('.muted').forEach(function (item) { item.remove(); });
    return clone.textContent.trim() || '—';
  }

  function mutedText(cell) {
    var muted = cell && cell.querySelector('.muted');
    return muted ? muted.textContent.trim() : '';
  }

  function normalizeIssued(value) {
    return /^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}$/.test(value) ? value : '- -';
  }

  function collectRows(table) {
    return Array.from(table.tBodies[0].rows).map(function (row) {
      var cells = Array.from(row.children);
      if (cells.length < 10) return null;
      var invoiceNo = primaryText(cells[0]);
      var id = mutedText(cells[0]);
      var title = primaryText(cells[1]);
      var applicationId = mutedText(cells[1]).replace(/^申请\\s*/, '');
      var fileStatus = primaryText(cells[4]);
      var actualInvoiceNo = /^数电票-/.test(invoiceNo) ? invoiceNo : '- -';
      return {
        id: id,
        type: mutedText(cells[2]) || '—',
        title: title,
        invoiceNo: actualInvoiceNo,
        amount: primaryText(cells[2]),
        documentStatus: primaryText(cells[3]),
        fileAvailable: fileStatus === '有效',
        deliveryStatus: primaryText(cells[5]),
        channel: '邮件',
        email: emailMap[title] || primaryText(cells[7]),
        issued: normalizeIssued(primaryText(cells[8])),
        applicationId: applicationId,
        content: contentMap[applicationId] || '信息技术服务*技术服务费',
        taxId: taxMap[title] || '—',
        actions: cells[9].querySelector('.actions') ? cells[9].querySelector('.actions').innerHTML : cells[9].innerHTML
      };
    }).filter(Boolean);
  }

  function mergeDocuments(rows) {
    rows.forEach(function (row) {
      var index = documents.findIndex(function (item) { return item.id === row.id; });
      if (index >= 0) documents[index] = row;
      else documents.push(row);
    });
  }

  function statusTone(status) {
    if (['有效', '已送达'].indexOf(status) >= 0) return 'success';
    if (['红冲处理中', '部分红冲', '发送中'].indexOf(status) >= 0) return 'warning';
    if (['红冲失败', '交付失败'].indexOf(status) >= 0) return 'danger';
    return 'neutral';
  }

  function statusBadge(status) {
    return '<span class="invoice-badge invoice-badge-' + statusTone(status) + '">' + esc(status || '—') + '</span>';
  }

  function rowMarkup(item) {
    var invoiceNo = item.invoiceNo.replace(/^数电票-?/, '');
    return '<tr data-document-id="' + esc(item.id) + '"><td class="mono"><button type="button" class="invoice-document-id" data-document-detail="' + esc(item.id) + '">' + esc(item.id) + '</button></td><td>' + esc(item.type) + '</td><td><span class="primary-cell">' + esc(item.title) + '</span></td><td class="mono">' + esc(invoiceNo) + '</td><td class="amount">' + esc(item.amount) + '</td><td>邮件</td><td>' + esc(item.email) + '</td><td class="mono">' + esc(item.issued) + '</td><td class="mono">' + esc(item.applicationId) + '</td><td>' + statusBadge(item.documentStatus) + '</td><td>' + statusBadge(item.deliveryStatus) + '</td><td><div class="actions">' + item.actions + '</div></td></tr>';
  }

  function normalizeDocumentTable() {
    scheduled = false;
    var table = root.querySelector('table[aria-label="票据列表"]');
    if (!table || !table.tHead || !table.tBodies[0] || table.dataset.documentListNormalized === 'true') return;
    table.querySelectorAll('tbody td:nth-child(3) .primary-cell').forEach(function (node) { node.classList.remove('primary-cell'); });
    mergeDocuments(collectRows(table));
    var currentIds = Array.from(table.tBodies[0].rows).map(function (row) { return mutedText(row.children[0]); }).filter(Boolean);
    var rows = documents.filter(function (item) { return currentIds.indexOf(item.id) >= 0; });
    table.tHead.innerHTML = '<tr><th>票据ID</th><th>发票类型</th><th>发票抬头</th><th>发票号码</th><th>开票金额</th><th>交付渠道</th><th>联系邮箱</th><th>开具时间</th><th>申请单号</th><th>票据状态</th><th>交付状态</th><th>操作</th></tr>';
    table.tBodies[0].innerHTML = rows.length ? rows.map(rowMarkup).join('') : '<tr><td colspan="12"><div class="invoice-empty"><strong>未找到票据</strong><p>请调整筛选条件后重新查询。</p></div></td></tr>';
    table.dataset.documentListNormalized = 'true';
  }

  function previewField(label, value, mono) {
    return '<div class="invoice-preview-field"><dt>' + esc(label) + '</dt><dd' + (mono ? ' class="mono"' : '') + '>' + esc(value || '—') + '</dd></div>';
  }

  function ensurePreviewFooter() {
    var footer = previewPanel.querySelector('.invoice-preview-footer');
    if (footer) return footer;
    footer = document.createElement('footer');
    footer.className = 'invoice-preview-footer';
    previewPanel.appendChild(footer);
    return footer;
  }

  function openInvoicePreview(id, trigger) {
    var item = documents.find(function (row) { return row.id === id; });
    if (!item || item.invoiceNo === '- -') return;
    activeDocumentId = id;
    lastFocus = trigger || document.activeElement;
    previewTitle.textContent = '电子发票预览';
    previewBody.innerHTML = '<div class="invoice-preview-sheet"><div class="invoice-preview-brand-row"><strong class="invoice-preview-brand">云登 YunLogin</strong><span class="invoice-preview-number">发票号码 ' + esc(item.invoiceNo.replace('数电票-', '')) + '</span></div><div class="invoice-preview-accent"></div><h3 class="invoice-preview-title">电子发票</h3><p class="invoice-preview-type">' + esc(item.type) + '</p><dl class="invoice-preview-fields">' + previewField('购买方', item.title) + previewField('税号', item.taxId, true) + previewField('开票日期', item.issued === '- -' ? '- -' : item.issued.slice(0, 10), true) + previewField('项目名称', item.content) + previewField('价税合计', item.amount, true) + previewField('销售方', '云登网络科技（上海）有限公司') + '</dl><p class="invoice-preview-note">本页面为高保真电子发票演示预览，不连接真实税务系统。</p></div>';
    ensurePreviewFooter().innerHTML = '<button type="button" class="invoice-btn invoice-btn-default" data-invoice-preview-close>关闭</button><button type="button" class="invoice-btn invoice-btn-primary" data-invoice-pdf-download="' + esc(item.id) + '"><i data-lucide="download" class="w-4 h-4"></i><span>下载电子发票</span></button>';
    preview.hidden = false;
    document.body.classList.add('invoice-lock-scroll');
    window.lucide && window.lucide.createIcons();
    requestAnimationFrame(function () { var close = preview.querySelector('[data-action="close-preview"]'); if (close) close.focus(); });
  }

  function closeInvoicePreview() {
    preview.hidden = true;
    document.body.classList.remove('invoice-lock-scroll');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    lastFocus = null;
  }

  function pdfEscape(value) {
    var slash = String.fromCharCode(92);
    return String(value || '').split('').map(function (character) {
      return character === slash || character === '(' || character === ')' ? slash + character : character;
    }).join('');
  }

  function buildPdf(item) {
    var lines = ['YunLogin Electronic Invoice', 'Invoice No: ' + item.invoiceNo.replace('数电票-', ''), 'Document ID: ' + item.id, 'Amount: CNY ' + item.amount.replace('¥', ''), 'Issued: ' + item.issued, 'Application: ' + item.applicationId];
    var stream = ['BT', '/F1 16 Tf', '72 750 Td'];
    lines.forEach(function (line, index) { if (index) stream.push('0 -28 Td'); stream.push('(' + pdfEscape(line) + ') Tj'); });
    stream.push('ET');
    var content = stream.join('\\n');
    var objects = [
      '1 0 obj\\n<< /Type /Catalog /Pages 2 0 R >>\\nendobj\\n',
      '2 0 obj\\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\\nendobj\\n',
      '3 0 obj\\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\\nendobj\\n',
      '4 0 obj\\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\\nendobj\\n',
      '5 0 obj\\n<< /Length ' + new TextEncoder().encode(content).length + ' >>\\nstream\\n' + content + '\\nendstream\\nendobj\\n'
    ];
    var pdf = '%PDF-1.4\\n';
    var offsets = [0];
    objects.forEach(function (object) { offsets.push(new TextEncoder().encode(pdf).length); pdf += object; });
    var xref = new TextEncoder().encode(pdf).length;
    pdf += 'xref\\n0 6\\n0000000000 65535 f \\n';
    for (var i = 1; i <= 5; i += 1) pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \\n';
    pdf += 'trailer\\n<< /Size 6 /Root 1 0 R >>\\nstartxref\\n' + xref + '\\n%%EOF';
    return new Blob([pdf], { type: 'application/pdf' });
  }

  function downloadInvoicePdf(id) {
    var item = documents.find(function (row) { return row.id === id; });
    if (!item || !item.fileAvailable) return;
    var url = URL.createObjectURL(buildPdf(item));
    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '电子发票-' + item.invoiceNo.replace('数电票-', '') + '.pdf';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  var detailOverlay = null;
  var detailTrigger = null;

  function closeDocumentDetail() {
    if (!detailOverlay || detailOverlay.hidden) return;
    detailOverlay.hidden = true;
    if (preview.hidden) document.body.classList.remove('invoice-lock-scroll');
    if (detailTrigger && document.contains(detailTrigger)) detailTrigger.focus({ preventScroll: true });
  }

  function openDocumentDetail(id, trigger) {
    var item = documents.find(function (row) { return row.id === id; });
    if (!item) return;
    if (!detailOverlay) {
      detailOverlay = document.createElement('div');
      detailOverlay.id = 'invoiceDocumentDetail';
      detailOverlay.className = 'invoice-red-detail-overlay';
      detailOverlay.hidden = true;
      detailOverlay.innerHTML = '<aside class="invoice-red-detail-drawer" role="dialog" aria-modal="true" aria-labelledby="invoiceDocumentDetailTitle" tabindex="-1"><header class="invoice-red-detail-header"><h2 id="invoiceDocumentDetailTitle">票据详情</h2><button type="button" class="icon-btn" aria-label="关闭票据详情" data-document-detail-close><i data-lucide="x" class="w-5 h-5"></i></button></header><div class="invoice-red-detail-body" data-document-detail-body></div><footer class="invoice-red-detail-footer"><button type="button" class="invoice-btn invoice-btn-default" data-document-detail-close>关闭</button></footer></aside>';
      root.appendChild(detailOverlay);
      detailOverlay.addEventListener('click', function (event) { if (event.target === detailOverlay || event.target.closest('[data-document-detail-close]')) closeDocumentDetail(); });
      detailOverlay.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') { event.stopImmediatePropagation(); closeDocumentDetail(); }
        if (event.key !== 'Tab') return;
        var buttons = Array.from(detailOverlay.querySelectorAll('button:not([disabled])'));
        var first = buttons[0], last = buttons[buttons.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === detailOverlay.firstElementChild)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });
    }
    function field(label, value, mono) {
      return '<div class="invoice-red-detail-field"><dt>' + esc(label) + '</dt><dd' + (mono ? ' class="mono"' : '') + '>' + esc(value) + '</dd></div>';
    }
    detailOverlay.querySelector('[data-document-detail-body]').innerHTML = '<section class="invoice-red-detail-section"><h3>票据信息</h3><dl class="invoice-red-detail-grid">' +
      field('票据ID', item.id, true) + field('申请单号', item.applicationId, true) + field('发票类型', item.type) + field('发票抬头', item.title) + field('税号', item.taxId, true) + field('发票号码', item.invoiceNo.replace(/^数电票-?/, ''), true) + field('开票金额', item.amount, true) + field('发票内容', item.content) + field('票据状态', item.documentStatus) + field('开具时间', item.issued, true) + '</dl></section><section class="invoice-red-detail-section"><h3>票据交付</h3><dl class="invoice-red-detail-grid">' + field('交付状态', item.deliveryStatus) + field('交付渠道', item.channel) + field('联系邮箱', item.email) + field('文件状态', item.fileAvailable ? '可下载' : '待补拉') + '</dl></section>';
    detailTrigger = trigger;
    detailOverlay.hidden = false;
    document.body.classList.add('invoice-lock-scroll');
    window.lucide && window.lucide.createIcons();
    detailOverlay.firstElementChild.focus({ preventScroll: true });
  }

  root.addEventListener('click', function (event) {
    var detail = event.target.closest('[data-document-detail]');
    if (detail) { event.preventDefault(); event.stopImmediatePropagation(); openDocumentDetail(detail.dataset.documentDetail, detail); return; }
    var original = event.target.closest('[data-action="preview-document"], [data-action="download-document"]');
    if (original && documents.some(function (row) { return row.id === original.dataset.id; })) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (original.dataset.action === 'download-document') downloadInvoicePdf(original.dataset.id);
      else openInvoicePreview(original.dataset.id, original);
      return;
    }
    var open = event.target.closest('[data-invoice-preview-open]');
    var download = event.target.closest('[data-invoice-pdf-download]');
    var close = event.target.closest('[data-invoice-preview-close]');
    if (open) { event.preventDefault(); event.stopImmediatePropagation(); openInvoicePreview(open.dataset.invoicePreviewOpen, open); return; }
    if (download) { event.preventDefault(); event.stopImmediatePropagation(); downloadInvoicePdf(download.dataset.invoicePdfDownload); return; }
    if (close) { event.preventDefault(); event.stopImmediatePropagation(); closeInvoicePreview(); }
  }, true);

  preview.addEventListener('click', function (event) { if (event.target === preview) closeInvoicePreview(); }, true);
  window.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !preview.hidden) closeInvoicePreview(); }, true);

  function scheduleNormalize() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(normalizeDocumentTable);
  }

  new MutationObserver(scheduleNormalize).observe(root, { childList: true, subtree: true });
  scheduleNormalize();
})();
  `);
  module.styles.push(`
/* 申请管理筛选区按 design.md §5.4 使用自适应栅栏栅格。 */
.invoice-module .invoice-status-help-popover {
  box-sizing: border-box;
  width: min(320px, calc(100vw - 32px));
  max-width: calc(100vw - 32px);
  overflow-wrap: anywhere;
}
.invoice-module .invoice-list-header .invoice-list-actions { margin-left: auto; justify-content: flex-end; }
.invoice-module .invoice-filter-flow {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(388px, 1fr));
  align-items: center;
  column-gap: 16px;
  row-gap: 12px;
  width: 100%;
  max-width: none;
}
.invoice-module .invoice-filter-flow .invoice-filter-item {
  display: flex;
  flex: none;
  width: 100%;
  min-width: 0;
  gap: 0;
}
.invoice-module .invoice-filter-flow .invoice-filter-item > label,
.invoice-module .invoice-filter-flow .invoice-filter-name {
  width: 88px;
  flex: 0 0 88px;
  text-align: right;
}
.invoice-module .invoice-filter-flow .invoice-control,
.invoice-module .invoice-filter-flow .invoice-date-range,
.invoice-module .invoice-filter-flow .invoice-application-filter-range {
  width: 300px;
  max-width: 300px;
}
.invoice-module .invoice-filter-flow .invoice-filter-actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: 12px;
}
.invoice-module .invoice-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.invoice-module .invoice-list-header .invoice-list-actions { margin-left: auto; }
.invoice-module .invoice-list-header .invoice-list-heading { display: flex; align-items: center; gap: 8px; }
.invoice-module .invoice-filter-flow .invoice-filter-actions {
  justify-self: start;
  align-self: center;
  min-height: 32px;
  margin-left: 0;
  padding: 0;
}
.invoice-module .invoice-filter-flow .invoice-filter-actions .invoice-btn { min-width: 52px; }
.invoice-module .invoice-filter-flow .invoice-filter-actions .invoice-btn-primary,
.invoice-module .invoice-filter-flow .invoice-filter-actions .invoice-btn-default {
  height: 32px;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 13px;
}
.invoice-module table[aria-label="开票申请列表"] tbody td:first-child button:hover,
.invoice-module table[aria-label="开票申请列表"] tbody td:first-child button:focus-visible {
  color: var(--invoice-blue);
  text-decoration: underline;
  text-underline-offset: 3px;
}
/* data-open=false is used for click dismissal; hover/focus must still be visible. */
.invoice-module .invoice-status-help:hover > .invoice-status-help-popover,
.invoice-module .invoice-status-help:focus-within > .invoice-status-help-popover {
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}
.invoice-module .invoice-status-help-popover {
  left: auto !important;
  right: 8px !important;
  max-height: calc(100vh - 16px);
  overflow-y: auto;
}
@media (max-width: 900px) {
  .invoice-module .invoice-status-help-popover { max-width: calc(100vw - 32px); }
}
@media (max-width: 420px) {
  .invoice-module .invoice-filter-flow { grid-template-columns: minmax(0, 1fr); }
  .invoice-module .invoice-filter-flow .invoice-filter-item { width: 100%; }
  .invoice-module .invoice-filter-flow .invoice-control,
  .invoice-module .invoice-filter-flow .invoice-date-range,
  .invoice-module .invoice-filter-flow .invoice-application-filter-range { max-width: calc(100% - 88px); }
}
`);
  module.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  function upgradeDateRange() {
    var range = root.querySelector('.invoice-application-filter-range');
    if (!range || range.dataset.commonDateRange === 'true') return;
    var start = range.querySelector('#invoiceApplicationStartDate');
    var end = range.querySelector('#invoiceApplicationEndDate');
    range.className = 'invoice-date-range';
    range.dataset.calendarTrigger = '';
    range.dataset.calendarScope = 'application';
    range.setAttribute('role', 'group');
    range.setAttribute('aria-label', '申请时间范围');
    range.setAttribute('aria-haspopup', 'dialog');
    range.setAttribute('aria-expanded', 'false');
    if (start) { start.className = 'invoice-date-input'; start.type = 'text'; start.readOnly = true; start.placeholder = '开始时间'; start.id = 'applicationStartDate'; }
    if (end) { end.className = 'invoice-date-input'; end.type = 'text'; end.readOnly = true; end.placeholder = '结束时间'; end.id = 'applicationEndDate'; }
    var sep = range.querySelector('span');
    if (sep) { sep.className = 'invoice-date-sep'; sep.textContent = '~'; }
    if (!range.querySelector('[data-lucide="calendar-days"]')) range.insertAdjacentHTML('beforeend', '<i data-lucide="calendar-days" aria-hidden="true"></i>');
    range.insertAdjacentHTML('beforeend', '<input type="hidden" id="invoiceApplicationStartDate"><input type="hidden" id="invoiceApplicationEndDate"><div id="applicationDatePicker" class="invoice-date-picker" role="dialog" aria-label="选择申请时间范围" aria-hidden="true"></div>');
    range.dataset.commonDateRange = 'true';
    var mirror = function () { var s = root.querySelector('#invoiceApplicationStartDate'); var e = root.querySelector('#invoiceApplicationEndDate'); if (s && start) s.value = start.value; if (e && end) e.value = end.value; };
    range.addEventListener('change', mirror);
    window.lucide && window.lucide.createIcons();
  }
  var observer = new MutationObserver(upgradeDateRange);
  observer.observe(root, { childList: true, subtree: true });
  setTimeout(upgradeDateRange, 1100);
})();
  `);
})(window.YundengModules && window.YundengModules["invoice-management"]);

/* 申请管理列表：取消批量选择，按发票申请事实重新组织字段、筛选与交互。 */
(function (module) {
  if (!module) return;

  module.styles.push(`
.invoice-module table[aria-label="开票申请列表"] {
  min-width: 2180px;
}

.invoice-module .invoice-application-filter-range {
  display: flex;
  width: 300px;
  height: 32px;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  border: 1px solid var(--invoice-line);
  border-radius: 4px;
  background: #fff;
}

.invoice-module .invoice-application-filter-range:focus-within {
  border-color: var(--invoice-blue);
  box-shadow: 0 0 0 2px rgba(0, 102, 255, .12);
}

.invoice-module .invoice-application-filter-range input {
  width: 128px;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--invoice-body);
  font: 12px/30px 'JetBrains Mono', monospace;
}

.invoice-module .invoice-application-filter-range span {
  color: var(--invoice-muted);
  font-size: 12px;
}
  `);

  module.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  var masterRows = [];
  var activeDerivedStatus = 'ALL';
  var appliedFilters = { applicationId: '', invoiceType: '', title: '', invoiceNo: '', order: '', applicationStatus: '', startDate: '', endDate: '' };
  var scheduled = false;

  var documentMap = {
    'IA-20260819-0009': ['数电票-04438291', '有效'],
    'IA-20260818-0026': ['数电票-04438191', '有效'],
    'IA-20260818-0025': ['数电票-04438144', '红冲处理中'],
    'IA-20260818-0020': ['数电票-04437981', '已全额红冲'],
    'IA-20260818-0019': ['数电票-04437106', '部分红冲'],
    'IA-20260817-0017': ['数电票-04436992', '红冲失败']
  };

  var derivedStatusLabels = {
    PENDING_REVIEW: '待审核',
    ISSUING: '开具中',
    SUCCEEDED: '开具成功',
    REJECTED: '已驳回',
    FAILED: '开具失败',
    RED_PENDING: '红冲处理中',
    RED_FAILED: '红冲失败',
    PARTIALLY_RED: '部分红冲',
    FULLY_RED: '已全额红冲',
    CANCELLED: '已取消'
  };

  var reviewerMap = {
    'IA-20260819-0008': '王莉'
  };

  var emailMap = {
    '上海云栈信息科技有限公司': 'finance@yunstack.cn',
    '深圳航迹网络有限公司': 'finance@hangji.cn',
    '杭州星河数字工作室': 'cashier@xinghe.cn',
    '北京启明智能科技有限公司': 'finance@qiming.cn',
    '广州微澜贸易有限公司': 'finance@weilan.cn',
    '成都拾光个人用户': 'service@mail.com',
    '武汉云图数据有限公司': 'finance@yuntu.cn',
    '厦门海岸实验室': 'finance@coastlab.cn',
    '南京极昼网络有限公司': 'finance@polar-day.cn',
    '苏州青禾个人用户': 'service@mail.com',
    '合肥远见科技有限公司': 'finance@yuanjian.cn',
    '重庆山海组织': 'finance@shanhai.org.cn',
    '天津澄明科技有限公司': 'finance@chengming.cn'
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function primaryText(cell) {
    if (!cell) return '—';
    var clone = cell.cloneNode(true);
    clone.querySelectorAll('.muted').forEach(function (item) { item.remove(); });
    return clone.textContent.trim() || '—';
  }

  function mutedText(cell) {
    var muted = cell && cell.querySelector('.muted');
    return muted ? muted.textContent.trim() : '';
  }

  function tone(status) {
    if (['审核通过', '开具成功', '有效', '已送达'].indexOf(status) >= 0) return 'success';
    if (['待审核'].indexOf(status) >= 0) return 'primary';
    if (['提交中', '开具中', '发送中', '红冲处理中', '部分红冲', '结果未知'].indexOf(status) >= 0) return 'warning';
    if (['已驳回', '开具失败', '红冲失败', '交付失败'].indexOf(status) >= 0) return 'danger';
    return 'neutral';
  }

  function badge(status) {
    return '<span class="invoice-badge invoice-badge-' + tone(status) + '">' + esc(status || '—') + '</span>';
  }

  function collectBaseRows(table) {
    return Array.from(table.tBodies[0].rows).map(function (row) {
      var cells = Array.from(row.children);
      if (cells.length < 11) return null;
      var idButton = row.querySelector('[data-action="open-application"][data-id]');
      var id = idButton ? idButton.dataset.id : primaryText(cells[1]);
      var subject = cells[3] && cells[3].querySelector('.primary-cell') ? cells[3].querySelector('.primary-cell').textContent.trim() : primaryText(cells[3]);
      var meta = mutedText(cells[3]).split('·').map(function (item) { return item.trim(); });
      var derived = cells[7] && cells[7].querySelector('.invoice-badge') ? cells[7].querySelector('.invoice-badge').textContent.trim() : primaryText(cells[7]);
      var reviewer = mutedText(cells[7]);
      var applicationStatus = ['待审核', '已驳回', '已撤回', '已取消'].indexOf(derived) >= 0 ? derived : '审核通过';
      if (!reviewer || reviewer === '可直接审批') reviewer = reviewerMap[id] || '—';
      var document = documentMap[id] || ['—', '未生成'];
      var amount = primaryText(cells[6]);
      var taxRate = mutedText(cells[6]).replace('税率', '').trim() || '—';
      return {
        id: id,
        invoiceType: meta[0] === '个人' ? '数电普票' : '数电专票',
        subjectType: meta[0] || '企业',
        payment: meta[1] || '—',
        title: subject,
        invoiceNo: document[0].replace(/^数电票-?/, ''),
        amount: amount,
        content: primaryText(cells[5]),
        taxRate: taxRate,
        created: primaryText(cells[2]),
        order: primaryText(cells[4]),
        email: emailMap[subject] || 'service@mail.com',
        applicationStatus: applicationStatus,
        reviewer: reviewer,
        issuanceStatus: primaryText(cells[8]).replace('部分成功', '开具失败'),
        documentStatus: document[1],
        deliveryStatus: primaryText(cells[9]),
        derivedStatus: derived,
        actions: cells[10] ? cells[10].innerHTML : ''
      };
    }).filter(Boolean);
  }

  function mergeMaster(rows) {
    rows.forEach(function (row) {
      var index = masterRows.findIndex(function (item) { return item.id === row.id; });
      if (index >= 0) masterRows[index] = row;
      else masterRows.push(row);
    });
  }

  function filterRows() {
    return masterRows.filter(function (row) {
      var date = row.created.slice(0, 10);
      return (activeDerivedStatus === 'ALL' || row.derivedStatus === derivedStatusLabels[activeDerivedStatus])
        && (!appliedFilters.applicationId || row.id.toLowerCase().indexOf(appliedFilters.applicationId.toLowerCase()) >= 0)
        && (!appliedFilters.invoiceType || row.invoiceType === appliedFilters.invoiceType)
        && (!appliedFilters.title || row.title.toLowerCase().indexOf(appliedFilters.title.toLowerCase()) >= 0)
        && (!appliedFilters.invoiceNo || row.invoiceNo.toLowerCase().indexOf(appliedFilters.invoiceNo.toLowerCase()) >= 0)
        && (!appliedFilters.order || row.order.toLowerCase().indexOf(appliedFilters.order.toLowerCase()) >= 0)
        && (!appliedFilters.applicationStatus || row.applicationStatus === appliedFilters.applicationStatus)
        && (!appliedFilters.issuance || row.issuanceStatus === appliedFilters.issuance)
        && (!appliedFilters.document || row.documentStatus === appliedFilters.document)
        && (!appliedFilters.delivery || row.deliveryStatus === appliedFilters.delivery)
        && (!appliedFilters.startDate || date >= appliedFilters.startDate)
        && (!appliedFilters.endDate || date <= appliedFilters.endDate);
    });
  }

  function renderFilters() {
    var old = root.querySelector('#applicationKeyword');
    var flow = old ? old.closest('.invoice-filter-flow') : root.querySelector('[data-invoice-application-filters]');
    if (!flow || flow.dataset.invoiceApplicationFilters === 'true') return;
    flow.dataset.invoiceApplicationFilters = 'true';
    var statusField = function (key, label, options) { return '<div class="invoice-filter-item" data-application-extra-filter="' + key + '"><label for="applicationExtra' + key + '">' + label + '</label><select class="invoice-control" id="applicationExtra' + key + '"><option value="">全部' + label + '</option>' + options.map(function (value) { return '<option>' + value + '</option>'; }).join('') + '</select></div>'; };
    flow.innerHTML = '<div class="invoice-filter-item"><label for="invoiceApplicationIdFilter">申请单号</label><input id="invoiceApplicationIdFilter" class="invoice-control" placeholder="请输入申请单号"></div>'
      + '<div class="invoice-filter-item"><label for="invoiceTypeFilter">发票类型</label><select id="invoiceTypeFilter" class="invoice-control"><option value="">全部发票类型</option><option>数电普票</option><option>数电专票</option></select></div>'
      + '<div class="invoice-filter-item"><label for="invoiceTitleFilter">发票抬头</label><input id="invoiceTitleFilter" class="invoice-control" placeholder="请输入发票抬头"></div>'
      + '<div class="invoice-filter-item"><label for="invoiceNumberFilter">发票号码</label><input id="invoiceNumberFilter" class="invoice-control" placeholder="请输入发票号码"></div>'
      + '<div class="invoice-filter-item"><label for="invoiceOrderFilter">开票订单</label><input id="invoiceOrderFilter" class="invoice-control" placeholder="请输入订单号"></div>'
      + '<div class="invoice-filter-item"><label for="applicationStateFilter">申请状态</label><select id="applicationStateFilter" class="invoice-control"><option value="">全部申请状态</option><option>待审核</option><option>审核通过</option><option>已驳回</option><option>已撤回</option><option>已取消</option></select></div>'
      + statusField('issuance', '开具状态', ['未提交','提交中','开具中','开具成功','开具失败','结果未知'])
      + statusField('document', '票据状态', ['未生成','有效','红冲处理中','部分红冲','已全额红冲','红冲失败'])
      + statusField('delivery', '交付状态', ['未发送','发送中','已送达','交付失败'])
      + '<div class="invoice-filter-item"><label for="applicationStartDate">申请时间</label>' + root.__invoiceUi.applicationDateRange() + '</div>'
      + '<div class="invoice-filter-actions"><button type="button" class="invoice-btn invoice-btn-primary" data-invoice-list-action="query"><i data-lucide="search" class="w-4 h-4" aria-hidden="true"></i><span>查询</span></button><button type="button" class="invoice-btn invoice-btn-default" data-invoice-list-action="reset"><i data-lucide="rotate-ccw" class="w-4 h-4" aria-hidden="true"></i><span>重置</span></button></div>';
    var values = {
      invoiceApplicationIdFilter: appliedFilters.applicationId,
      invoiceTypeFilter: appliedFilters.invoiceType,
      invoiceTitleFilter: appliedFilters.title,
      invoiceNumberFilter: appliedFilters.invoiceNo,
      invoiceOrderFilter: appliedFilters.order,
      applicationStateFilter: appliedFilters.applicationStatus,
      applicationStartDate: appliedFilters.startDate,
      applicationEndDate: appliedFilters.endDate,
      applicationExtraissuance: appliedFilters.issuance || '', applicationExtradocument: appliedFilters.document || '', applicationExtradelivery: appliedFilters.delivery || ''
    };
    Object.keys(values).forEach(function (id) { var control = root.querySelector('#' + id); if (control) control.value = values[id]; });
    if (window.lucide) window.lucide.createIcons();
  }

  function rowMarkup(row) {
    return '<tr data-application-id="' + esc(row.id) + '" data-subject-type="' + esc(row.subjectType) + '" data-payment="' + esc(row.payment) + '"><td class="mono"><button type="button" class="invoice-btn-link primary-cell" data-action="open-application" data-id="' + esc(row.id) + '">' + esc(row.id) + '</button></td><td>' + esc(row.invoiceType) + '</td><td><span class="primary-cell">' + esc(row.title) + '</span></td><td class="mono">' + esc(row.invoiceNo) + '</td><td class="amount">' + esc(row.amount) + '</td><td>' + esc(row.content) + '</td><td class="mono">' + esc(row.taxRate) + '</td><td class="mono">' + esc(row.created) + '</td><td class="mono">' + esc(row.order) + '</td><td>' + esc(row.email) + '</td><td>' + badge(row.applicationStatus) + '</td><td>' + esc(row.reviewer) + '</td><td>' + badge(row.issuanceStatus) + '</td><td>' + badge(row.documentStatus) + '</td><td>' + badge(row.deliveryStatus) + '</td><td>' + row.actions + '</td></tr>';
  }

  function updateStatusTabs() {
    root.querySelectorAll('[data-action="application-status"]').forEach(function (button) {
      var active = button.dataset.status === activeDerivedStatus;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
  }

  function renderRows(table) {
    var rows = filterRows();
    table.tHead.innerHTML = '<tr><th>申请单号</th><th>发票类型</th><th>发票抬头</th><th>发票号码</th><th>开票金额</th><th>发票内容</th><th>税率</th><th>申请时间</th><th>开票订单</th><th>联系邮箱</th><th>申请状态</th><th>审批人</th><th>开具状态</th><th>票据状态</th><th>交付状态</th><th>操作</th></tr>';
    table.tBodies[0].innerHTML = rows.length ? rows.map(rowMarkup).join('') : '<tr><td colspan="16"><div class="invoice-empty"><strong>未找到开票申请</strong><p>请调整筛选条件后重新查询。</p></div></td></tr>';
    table.dataset.applicationListNormalized = 'true';
    var section = table.closest('.invoice-block');
    var total = section && section.querySelector('.invoice-list-total');
    if (total) total.innerHTML = '共 <span class="mono">' + rows.length + '</span> 条';
    var stats = section && section.querySelector('.invoice-page-stats');
    if (stats) stats.textContent = '共 ' + rows.length + ' 条记录　第 1/1 页';
    section && section.querySelectorAll('.invoice-selection').forEach(function (item) { item.remove(); });
    updateStatusTabs();
  }

  function normalizeApplicationPage() {
    scheduled = false;
    renderFilters();
    var table = root.querySelector('table[aria-label="开票申请列表"]');
    if (!table || !table.tHead || !table.tBodies[0]) return;
    if (table.dataset.applicationListNormalized !== 'true') {
      mergeMaster(collectBaseRows(table));
      renderRows(table);
    }
    root.querySelectorAll('#applicationSelectAll, .application-check').forEach(function (item) { item.remove(); });
    root.querySelectorAll('.invoice-selection').forEach(function (item) { item.remove(); });
  }

  function readFilters() {
    var value = function (id) { var control = root.querySelector('#' + id); return control ? control.value.trim() : ''; };
    return {
      applicationId: value('invoiceApplicationIdFilter'), invoiceType: value('invoiceTypeFilter'), title: value('invoiceTitleFilter'), invoiceNo: value('invoiceNumberFilter'), order: value('invoiceOrderFilter'), applicationStatus: value('applicationStateFilter'), issuance: value('applicationExtraissuance'), document: value('applicationExtradocument'), delivery: value('applicationExtradelivery'), startDate: value('applicationStartDate'), endDate: value('applicationEndDate')
    };
  }

  function rerender() {
    var table = root.querySelector('table[aria-label="开票申请列表"]');
    if (table) renderRows(table);
  }

  document.addEventListener('click', function (event) {
    var statusButton = event.target.closest('[data-module-root="invoice-management"] [data-action="application-status"]');
    if (statusButton) {
      event.preventDefault();
      event.stopPropagation();
      activeDerivedStatus = statusButton.dataset.status || 'ALL';
      rerender();
      return;
    }
    var action = event.target.closest('[data-module-root="invoice-management"] [data-invoice-list-action]');
    if (!action) return;
    event.preventDefault();
    event.stopPropagation();
    if (action.dataset.invoiceListAction === 'query') appliedFilters = readFilters();
    else {
      appliedFilters = { applicationId: '', invoiceType: '', title: '', invoiceNo: '', order: '', applicationStatus: '', startDate: '', endDate: '' };
      activeDerivedStatus = 'ALL';
      root.querySelectorAll('[data-invoice-application-filters] input, [data-invoice-application-filters] select').forEach(function (control) { control.value = ''; });
    }
    rerender();
  }, true);

  function scheduleNormalize() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(normalizeApplicationPage);
  }

  new MutationObserver(scheduleNormalize).observe(root, { childList: true, subtree: true });
  scheduleNormalize();
})();
  `);
})(window.YundengModules && window.YundengModules["invoice-management"]);

/* 统一入口下的最终详情渲染：直接按当前申请生成完整分区，避免旧 Tab 脚本执行顺序影响。 */
(function (module) {
  if (!module) return;

  module.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  var body = root.querySelector('#invoiceDrawerBody');
  var footer = root.querySelector('#invoiceDrawerFooter');
  if (!body || !footer) return;
  var activeApplicationId = '';
  var scheduled = false;

  var applicants = {
    'IA-20260819-0012': '林财务',
    'IA-20260819-0011': '周敏',
    'IA-20260819-0010': '陈昊',
    'IA-20260819-0009': '林财务',
    'IA-20260819-0008': '王莉',
    'IA-20260818-0026': '赵宁',
    'IA-20260818-0025': '林财务',
    'IA-20260818-0024': '陈昊',
    'IA-20260818-0023': '周敏',
    'IA-20260818-0022': '—',
    'IA-20260818-0021': '林财务',
    'IA-20260818-0020': '赵宁',
    'IA-20260818-0019': '林财务',
    'IA-20260818-0018': '—',
    'IA-20260817-0017': '王莉'
  };

  var documents = {
    'IA-20260819-0009': ['数电票-04438291', '有效', 'PDF / OFD / XML', '已送达', '2026-08-19 09:01'],
    'IA-20260818-0026': ['数电票-04438191', '有效', 'PDF / OFD / XML', '交付失败', '2026-08-18 18:51'],
    'IA-20260818-0025': ['数电票-04438144', '红冲处理中', 'PDF / OFD / XML', '交付失败', '2026-08-18 17:38'],
    'IA-20260818-0020': ['数电票-04437981', '已全额红冲', 'PDF / OFD / XML', '已送达', '2026-08-18 13:28'],
    'IA-20260818-0019': ['数电票-04437106', '部分红冲', 'PDF / OFD / XML', '已送达', '2026-08-18 12:08'],
    'IA-20260817-0017': ['数电票-04436992', '红冲失败', 'PDF / OFD / XML', '已送达', '2026-08-17 19:31']
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function field(label, value, mono) {
    return '<div class="invoice-detail-field"><dt>' + esc(label) + '</dt><dd' + (mono ? ' class="mono"' : '') + '>' + esc(value || '—') + '</dd></div>';
  }

  function section(title, fields, attrs) {
    return '<section class="invoice-detail-section"' + (attrs || '') + '><h3>' + esc(title) + '</h3><dl class="invoice-detail-grid">' + fields.join('') + '</dl></section>';
  }

  function rowData(id) {
    var row = Array.from(root.querySelectorAll('table[aria-label="开票申请列表"] tbody tr')).find(function (item) {
      var button = item.querySelector('[data-action="open-application"][data-id="' + id + '"]');
      return Boolean(button);
    });
    if (!row) return null;
    var cells = Array.from(row.children).filter(function (cell) { return !cell.dataset.teamColumn; });
    if (cells.length >= 16) {
      return {
        id: id,
        created: cells[7] ? cells[7].textContent.trim() : '—',
        subject: cells[2] ? cells[2].textContent.trim() : '—',
        subjectType: row.dataset.subjectType || (cells[1] && cells[1].textContent.indexOf('普票') >= 0 ? '个人' : '企业'),
        payment: row.dataset.payment || '—',
        order: cells[8] ? cells[8].textContent.trim() : '—',
        content: cells[5] ? cells[5].textContent.trim() : '—',
        amount: cells[4] ? cells[4].textContent.trim() : '—',
        paid: addMoney(cells[4] ? cells[4].textContent.trim() : '—', 1200),
        taxRate: cells[6] ? cells[6].textContent.trim() : '—',
        applicationStatus: cells[10] ? cells[10].textContent.trim() : '—',
        issuanceStatus: cells[12] ? cells[12].textContent.trim() : '未提交',
        deliveryStatus: cells[14] ? cells[14].textContent.trim() : '未发送',
        applicant: applicants[id] || '—',
        reviewer: cells[11] ? cells[11].textContent.trim() : '—'
      };
    }
    var subjectCell = cells[3];
    var subject = subjectCell && subjectCell.querySelector('.primary-cell') ? subjectCell.querySelector('.primary-cell').textContent.trim() : '—';
    var subjectMeta = subjectCell && subjectCell.querySelector('.muted') ? subjectCell.querySelector('.muted').textContent.trim() : '';
    var metaParts = subjectMeta.split('·').map(function (item) { return item.trim(); });
    var amountCell = cells[6];
    var amount = amountCell ? amountCell.childNodes[0].textContent.trim() : '—';
    var taxRate = amountCell && amountCell.querySelector('.muted') ? amountCell.querySelector('.muted').textContent.replace('税率', '').trim() : '—';
    var derived = cells[7] && cells[7].querySelector('.invoice-badge') ? cells[7].querySelector('.invoice-badge').textContent.trim() : '—';
      var applicationStatus = ['待审核', '已驳回', '已撤回', '已取消'].indexOf(derived) >= 0 ? derived : '审核通过';
    return {
      id: id,
      created: cells[2] ? cells[2].textContent.trim() : '—',
      subject: subject,
      subjectType: metaParts[0] || '企业',
      payment: metaParts[1] || '—',
      order: cells[4] ? cells[4].textContent.trim() : '—',
      content: cells[5] ? cells[5].textContent.trim() : '—',
      amount: amount,
      paid: addMoney(amount, 1200),
      taxRate: taxRate,
      applicationStatus: applicationStatus,
      issuanceStatus: cells[8] ? cells[8].textContent.trim() : '未提交',
      deliveryStatus: cells[9] ? cells[9].textContent.trim() : '未发送',
      applicant: applicants[id] || '—',
      reviewer: cells[7] && cells[7].querySelector('.muted') && cells[7].querySelector('.muted').textContent.trim() !== '可直接审批' ? cells[7].querySelector('.muted').textContent.trim() : '—'
    };
  }

  function addMoney(value, cents) {
    var number = Number(String(value || '').replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(number)) return value || '—';
    return '¥' + (number + cents / 100).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function identity(data) {
    var registry = window.YundengInvoiceIdentity && window.YundengInvoiceIdentity.subjects;
    var current = registry && registry[data.subject] ? registry[data.subject] : {};
    return {
      taxId: data.subjectType === '个人' ? '—' : (current.taxId || '91310000MA1K5R8X48'),
      email: current.email || 'finance@yunstack.cn'
    };
  }

  function taskFields(data) {
    if (data.issuanceStatus === '未提交') {
      return [field('任务编号', '—', true), field('任务状态', '尚未创建'), field('服务商', '—'), field('最近响应', '等待审核通过后创建开具任务')];
    }
    var response = data.issuanceStatus === '结果未知' ? '请求超时，结果未知' : data.issuanceStatus === '开具失败' ? '服务商明确返回失败' : data.issuanceStatus === '开具成功' ? '已返回有效发票' : '开票任务处理中';
    var action = data.issuanceStatus === '结果未知' ? '按原受理号查询' : data.issuanceStatus === '开具失败' ? '确认未受理后重试' : data.issuanceStatus === '开具成功' ? '查看票据' : '等待回调';
    var suffix = data.id.slice(-4);
    return [
      field('任务编号', 'PT-' + suffix + '-01', true),
      field('任务状态', data.issuanceStatus),
      field('服务商', '百望云 / 生产'),
      field('受理号', 'ACCEPT-20260819-' + suffix, true),
      field('最近响应', response),
      field('允许动作', action)
    ];
  }

  function documentFields(data, contact) {
    var item = documents[data.id] || ['—', '未生成', '未生成', '未发送', '—'];
    return [
      field('发票号码', item[0].replace(/^数电票-?/, ''), true),
      field('票据状态', item[1]),
      field('票据文件', item[2]),
      field('开票时间', item[4], true),
      field('接收邮箱', contact.email),
      field('交付状态', item[3])
    ];
  }

  function addMinutes(value, minutes) {
    var match = String(value || '').match(/^(\\d{4})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2})$/);
    if (!match) return value || '—';
    var date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4]), Number(match[5]));
    date.setMinutes(date.getMinutes() + minutes);
    var pad = function (number) { return String(number).padStart(2, '0'); };
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes());
  }

  function timelineEvents(data) {
    var events = [
      { action: '提交申请', time: data.created, copy: '已提交当前订单的开票申请，申请金额 ' + data.amount + '。' },
      { action: '资格校验', time: addMinutes(data.created, 4), copy: '订单支付、履约状态和发票内容映射校验完成。' }
    ];
    if (data.applicationStatus === '待审核') events.push({ action: '等待审核', time: addMinutes(data.created, 6), copy: '系统校验通过，等待有权限的管理员或财务审核。' });
    else if (data.applicationStatus === '已驳回') events.push({ action: '审核驳回', time: addMinutes(data.created, 6), copy: '财务已驳回申请，驳回原因已记录。' });
    else if (data.applicationStatus === '已撤回') events.push({ action: '撤回申请', time: addMinutes(data.created, 6), copy: '申请人已在审核前撤回本次开票申请。' });
    else if (data.applicationStatus === '已取消') events.push({ action: '取消申请', time: addMinutes(data.created, 6), copy: '业务条件发生变化，本次开票申请已取消。' });
    else events.push({ action: '审核通过', time: addMinutes(data.created, 6), copy: '财务审核通过，已提交电子发票开具任务。' });
    if (data.issuanceStatus === '开具成功') events.push({ action: '开票成功', time: addMinutes(data.created, 34), copy: '电子发票已生成，可在票据管理中查看。' });
    else if (data.issuanceStatus === '开具失败') events.push({ action: '开票失败', time: addMinutes(data.created, 34), copy: '第三方明确返回失败，等待确认后处置。' });
    else if (data.issuanceStatus === '结果未知') events.push({ action: '等待开票结果', time: addMinutes(data.created, 34), copy: '第三方结果未知，系统将按原受理号继续查询。' });
    else if (data.issuanceStatus === '开具中' || data.issuanceStatus === '提交中') events.push({ action: '开票处理中', time: addMinutes(data.created, 12), copy: '开票请求已提交，正在等待第三方处理结果。' });
    if (data.deliveryStatus === '已送达') events.push({ action: '邮件送达', time: addMinutes(data.created, 36), copy: '电子发票已发送至申请填写的联系邮箱。' });
    else if (data.deliveryStatus === '交付失败') events.push({ action: '邮件发送失败', time: addMinutes(data.created, 36), copy: '电子发票邮件发送失败，可核对邮箱后重新发送。' });
    return events;
  }

  function timelineMarkup(data) {
    return '<section class="invoice-detail-section" data-reference-detail="timeline" data-timeline-application-id="' + esc(data.id) + '"><h3>处理时间线</h3><ol class="invoice-process-timeline">' + timelineEvents(data).map(function (event) {
      return '<li><div class="invoice-process-timeline-head"><strong class="invoice-process-timeline-action">' + esc(event.action) + '</strong><time class="invoice-process-timeline-time" datetime="' + esc(event.time.replace(' ', 'T')) + '">' + esc(event.time) + '</time></div><p class="invoice-process-timeline-copy">' + esc(event.copy) + '</p></li>';
    }).join('') + '</ol></section>';
  }

  function renderDetail() {
    scheduled = false;
    if (!activeApplicationId || root.querySelector('#invoiceDrawer').hidden) return;
    if (body.querySelector('[data-reference-detail-root="' + activeApplicationId + '"]')) return;
    var data = rowData(activeApplicationId);
    if (!data) return;
    var contact = identity(data);
    var identityFields = [
      field('申请单号', data.id, true), field('申请时间', data.created, true),
      field('发票抬头', data.subject), field('税号', contact.taxId, true),
      field('抬头类型', data.subjectType), field('发票类型', data.subjectType === '个人' ? '数电普票' : '数电专票'),
      field('申请人', data.applicant), field('发票内容', data.content), field('税率', data.taxRate)
    ];
    if (data.subjectType !== '个人') {
      identityFields.push(field('开户银行', '中国工商银行上海浦东分行'), field('银行账号', '6222 **** **** 4812', true), field('企业地址', '上海市浦东新区金科路 2889 号'), field('企业电话', '021-6888 2200', true));
    }
    identityFields.push(field('联系邮箱', contact.email));
    var stateFields = [field('申请状态', data.applicationStatus), field('审批人', data.reviewer), field('开具状态', data.issuanceStatus), field('票据状态', (documents[data.id] || ['', '未生成'])[1]), field('交付状态', data.deliveryStatus)];
    var amountFields = [field('开票金额', data.amount, true), field('法币实付净额', data.paid, true), field('已确认退款', '¥12.00', true), field('有效申请占用', data.amount, true)];
    var orderFields = [field('开票订单', data.order, true), field('订单类型', '充值订单'), field('商品名称', data.content), field('支付方式', data.payment), field('法币实付', data.paid, true), field('可开票净额', data.amount, true), field('主体快照', '上海主体（固化）')];
    body.innerHTML = '<div data-reference-detail-root="' + esc(data.id) + '">' + section('状态概览', stateFields) + section('申请与受票', identityFields) + section('金额与资格', amountFields) + section('订单信息', orderFields) + section('第三方任务', taskFields(data)) + section('票据交付', documentFields(data, contact)) + timelineMarkup(data) + '</div>';
  }

  function normalizeFooter() {
    footer.querySelectorAll('.invoice-drawer-footer-note').forEach(function (note) { note.remove(); });
    footer.querySelectorAll('[data-lucide], .lucide').forEach(function (icon) { icon.remove(); });
  }

  function scheduleRender() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () { renderDetail(); normalizeFooter(); });
  }

  root.addEventListener('click', function (event) {
    var target = event.target.closest('[data-action="open-application"][data-id]');
    if (target) activeApplicationId = target.dataset.id;
  }, true);
  new MutationObserver(scheduleRender).observe(body, { childList: true, subtree: true });
  new MutationObserver(normalizeFooter).observe(footer, { childList: true, subtree: true });
  scheduleRender();
})();
  `);

  module.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  function normalizeTicketList() {
    var table = root.querySelector('table[aria-label="票据列表"]');
    if (!table) return;
    var block = table.closest('.invoice-block');
    if (!block) return;
    block.querySelectorAll('.invoice-document-summary, .invoice-kpi-grid, .invoice-list-divider').forEach(function (node) { node.remove(); });
  }
  new MutationObserver(normalizeTicketList).observe(root, { childList: true, subtree: true });
  normalizeTicketList();
})();
  `);
})(window.YundengModules && window.YundengModules["invoice-management"]);

/* 已移除历史脚本改写链，避免 App Shell 注入时破坏内联脚本。 */
/* 申请管理与更正申请最终布局收口：状态筛选同批渲染，更正列表使用独立字段与完整状态说明。 */
(function (module) {
  if (!module) return;

  module.styles.push(`
.invoice-module [data-invoice-application-filters],
.invoice-module [data-correction-final-filters] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(388px, 1fr));
  align-items: center;
  gap: 12px 16px;
  width: 100%;
  max-width: none;
}
.invoice-module [data-correction-final-filters] { margin-bottom: 16px; }
.invoice-module [data-correction-final-filters] .invoice-filter-item { width: 388px; }
.invoice-module [data-correction-final-filters] .invoice-data-scope-tabs { width: 300px; }
.invoice-module table[aria-label="更正申请列表"] { min-width: 2240px; }
.invoice-module table[aria-label="更正申请列表"] td:nth-child(7),
.invoice-module table[aria-label="更正申请列表"] td:nth-child(8),
.invoice-module table[aria-label="更正申请列表"] td:nth-child(9) { min-width: 180px; white-space: normal; }
.invoice-module .invoice-correction-filter-flow { display: none !important; }
.invoice-module .invoice-block:has(table[aria-label="更正申请列表"]) .invoice-list-title { font-size: 16px; }
.invoice-module .invoice-block:has(table[aria-label="更正申请列表"]) .invoice-list-title::after { content: none; }
.invoice-module .invoice-block:has(table[aria-label="更正申请列表"]) .invoice-list-divider { display:none; }
.invoice-module .invoice-block:has(table[aria-label="更正申请列表"]) .invoice-list-header { border-bottom:0; }
.invoice-module .invoice-filter-flow > * { order:0; }
.invoice-module .invoice-block:has(table[aria-label="开票申请列表"]) .invoice-list-heading { flex:none; justify-content:flex-start; }
.invoice-module .invoice-block:has(table[aria-label="开票申请列表"]) .invoice-list-total { margin-left:0; }
.invoice-module table[aria-label="开票申请列表"] td:nth-child(3) .primary-cell { font-weight:400; }
.invoice-module table[aria-label="更正申请列表"] td:first-child button { color:var(--invoice-body); font-family:'JetBrains Mono',monospace; font-weight:400; }
.invoice-module table[aria-label="更正申请列表"] td:first-child button:hover,
.invoice-module table[aria-label="更正申请列表"] td:first-child button:focus-visible { color:var(--invoice-blue); text-decoration:underline; }
.invoice-module [data-correction-status-help] .invoice-status-help-popover { right:auto!important; left:var(--help-left, 16px)!important; top:var(--help-top, 64px)!important; width:400px; max-width:calc(100vw - 32px); }
@media (max-width: 420px) {
  .invoice-module [data-invoice-application-filters],
  .invoice-module [data-correction-final-filters] { grid-template-columns: minmax(0, 1fr); }
  .invoice-module [data-correction-final-filters] .invoice-filter-item { width: 100%; }
}
  `);

  module.scripts.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  var scheduled = false;
  var correctionFilters = { no: '', subject: '', status: '', type: '', applicant: '', start: '', end: '' };
  var correctionDirection = 'desc';
  // 推断补全：逐字段拟更正值用于 Mock 演示，和原票号码分别保存。
  var changeExamples = {
    'CR-20260819-006': ['发票内容', '信息技术服务*技术服务费'],
    'CR-20260818-005': ['联系邮箱', 'service@mail.com'],
    'CR-20260818-004': ['发票抬头', '南京极昼信息科技有限公司'],
    'CR-20260817-003': ['发票抬头、税号', '厦门海岸科技有限公司；91350200MA8T123456'],
    'CR-20260817-002': ['发票内容', '信息技术服务*软件服务费'],
    'CR-20260816-001': ['企业地址', '广州市天河区科韵路 16 号'],
    'CR-20260815-009': ['发票类型', '数电专票'],
    'CR-20260815-008': ['发票抬头', '深圳航迹信息科技有限公司']
  };
  var statusDescriptions = [
    ['待审核', '更正申请已提交，正在等待有权限的管理员或财务审核；尚未创建红冲任务和重开申请。'],
    ['审核通过', '更正申请已审核通过，系统将按原蓝票创建红冲任务；重开申请需等待红冲完成后生成。'],
    ['红冲处理中', '原蓝票红冲任务已经提交，正在等待服务商返回最终结果；此时不得重复发起红冲。'],
    ['红冲失败', '服务商已明确返回红冲失败，需查看失败原因并完成处置后才能继续更正流程。'],
    ['已完成', '票面更正：原蓝票红冲成功，已生成关联重开申请，后续开具进度以重开申请为准；交付信息变更：邮箱等联系信息已更新，不红冲、不生成重开申请。'],
    ['已驳回', '审核未通过，本次更正申请已终止；原蓝票和原交付信息保持不变。'],
    ['已撤回', '申请人在审核完成前主动撤回，本次更正申请不再继续处理。'],
    ['已取消', '因退款、票据状态变化或其他业务条件不满足，系统或管理员已取消本次更正申请。']
  ];

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function ensureApplicationFilters() {
    var flow = root.querySelector('[data-invoice-application-filters]');
    if (!flow) return;
    var application = flow.querySelector('#applicationStateFilter');
    var applicationItem = application && application.closest('.invoice-filter-item');
    var actions = flow.querySelector('.invoice-filter-actions');
    if (!applicationItem || !actions) return;
    var definitions = [
      ['issuance', '开具状态', ['未提交', '提交中', '开具中', '开具成功', '开具失败', '结果未知']],
      ['document', '票据状态', ['未生成', '有效', '红冲处理中', '部分红冲', '已全额红冲', '红冲失败']],
      ['delivery', '交付状态', ['未发送', '发送中', '已送达', '交付失败']]
    ];
    var cursor = applicationItem;
    definitions.forEach(function (definition) {
      var item = flow.querySelector('[data-application-extra-filter="' + definition[0] + '"]');
      if (!item) {
        item = document.createElement('div');
        item.className = 'invoice-filter-item invoice-application-status-filter';
        item.dataset.applicationExtraFilter = definition[0];
        item.innerHTML = '<label for="applicationExtra' + definition[0] + '">' + definition[1] + '</label><select id="applicationExtra' + definition[0] + '" class="invoice-control"><option value="">全部' + definition[1] + '</option>' + definition[2].map(function (value) { return '<option>' + esc(value) + '</option>'; }).join('') + '</select>';
      }
      if (cursor.nextElementSibling !== item) cursor.after(item);
      cursor = item;
    });
    if (flow.lastElementChild !== actions) flow.appendChild(actions);
  }

  function sourceRows(table) {
    if (root.__invoiceUi) {
      var labels = { PENDING_REVIEW:'待审核', APPROVED:'审核通过', RED_PROCESSING:'红冲处理中', RED_FAILED:'红冲失败', COMPLETED:'已完成', REJECTED:'已驳回', WITHDRAWN:'已撤回', CANCELLED:'已取消' };
      return root.__invoiceUi.corrections.map(function (item) {
        var example = changeExamples[item.id] || ['发票内容', '按已审核信息更正'];
        var delivery = /邮箱|收件|通知渠道/.test(example[0]);
        var status = labels[item.status] || item.status;
        var tone = status === '待审核' ? 'primary' : status === '已完成' ? 'success' : /失败|驳回/.test(status) ? 'danger' : /处理|通过/.test(status) ? 'warning' : 'neutral';
        return { id:item.id, created:item.created, subject:item.subject, applicant:item.applicant, target:item.targets.split('、')[0], reason:item.reason, amount:'¥' + (item.amount / 100).toLocaleString('zh-CN', {minimumFractionDigits:2,maximumFractionDigits:2}), status:status, statusHtml:'<span class="invoice-badge invoice-badge-' + tone + '">' + status + '</span>', draft:delivery ? '—' : item.draft, isDelivery:delivery, changes:example[0], changed:example[1], actionHtml:'<button type="button" class="invoice-btn-link" data-action="correction-detail" data-id="' + item.id + '">详情</button>' + (item.status === 'PENDING_REVIEW' ? '<button type="button" class="invoice-btn-link" data-action="approve-correction" data-id="' + item.id + '">通过</button><button type="button" class="invoice-btn-link" data-action="reject-correction" data-id="' + item.id + '">驳回</button>' : '') };
      });
    }
    if (table.__correctionFlowRows) return table.__correctionFlowRows;
    var rows = Array.from(table.tBodies[0].rows).map(function (row) {
      var cells = Array.from(row.cells);
      if (cells.length < 7) return null;
      var primary = function (cell) { var copy = cell.cloneNode(true); copy.querySelectorAll('.muted').forEach(function (node) { node.remove(); }); return copy.textContent.trim() || '—'; };
      var muted = function (cell) { var node = cell && cell.querySelector('.muted'); return node ? node.textContent.trim() : '—'; };
      var idButton = cells[0].querySelector('[data-id]');
      var reason = muted(cells[2]);
      return { id: idButton ? idButton.dataset.id : primary(cells[0]), created: muted(cells[0]), subject: primary(cells[1]), applicant: muted(cells[1]), target: primary(cells[2]).split('、')[0], reason: reason, amount: primary(cells[3]), status: primary(cells[4]), statusHtml: cells[4].innerHTML, draft: primary(cells[5]), actionHtml: cells[6].innerHTML, isDelivery: /邮箱|收件|通知渠道|通知方式|联系电话/.test(primary(cells[2]) + reason) };
    }).filter(Boolean);
    table.__correctionFlowRows = rows;
    return rows;
  }

  function statusHelpMarkup() {
    return '<span class="invoice-status-help" data-status-help data-correction-status-help><button type="button" aria-expanded="false" aria-label="处理状态说明" title="查看处理状态说明">?</button><span class="invoice-status-help-popover" role="tooltip"><strong>处理状态说明</strong>' + statusDescriptions.map(function (item) { return '<span><b>' + esc(item[0]) + '：</b>' + esc(item[1]) + '</span>'; }).join('') + '</span></span>';
  }

  function ensureCorrectionFilters(block) {
    var filterBlock = block.previousElementSibling && block.previousElementSibling.classList.contains('invoice-block') ? block.previousElementSibling : block;
    var flow = root.querySelector('[data-correction-final-filters]');
    if (!flow) {
      flow = document.createElement('div');
      flow.className = 'invoice-filter-flow';
      flow.dataset.correctionFinalFilters = 'true';
      flow.innerHTML = '<div class="invoice-filter-item"><span class="invoice-filter-name">数据范围</span><div class="invoice-status-tabs invoice-data-scope-tabs" role="tablist"><button type="button" class="invoice-status-tab" data-action="red-subtab" data-value="tasks" role="tab">红冲任务</button><button type="button" class="invoice-status-tab is-active" data-action="red-subtab" data-value="corrections" role="tab" aria-selected="true">更正申请</button></div></div>' +
        '<div class="invoice-filter-item"><label for="correctionFinalNo">更正申请号</label><input id="correctionFinalNo" class="invoice-control" placeholder="请输入更正申请号"></div>' +
        '<div class="invoice-filter-item"><label for="correctionFinalSubject">原蓝票抬头</label><input id="correctionFinalSubject" class="invoice-control" placeholder="请输入原蓝票抬头"></div>' +
        '<div class="invoice-filter-item"><label for="correctionFinalStatus">处理状态</label><select id="correctionFinalStatus" class="invoice-control"><option value="">全部处理状态</option>' + statusDescriptions.map(function (item) { return '<option>' + esc(item[0]) + '</option>'; }).join('') + '</select></div>' +
        '<div class="invoice-filter-item"><label for="correctionFinalType">更正类型</label><select id="correctionFinalType" class="invoice-control"><option value="">全部更正类型</option><option>票面更正</option><option>交付信息变更</option></select></div>' +
        '<div class="invoice-filter-item"><label for="correctionFinalApplicant">申请人</label><input id="correctionFinalApplicant" class="invoice-control" placeholder="请输入申请人"></div>' +
        '<div class="invoice-filter-item"><label for="applicationStartDate">申请时间</label>' + root.__invoiceUi.applicationDateRange() + '</div>' +
        '<div class="invoice-filter-actions"><button type="button" class="invoice-btn invoice-btn-primary" data-correction-final-action="query"><i data-lucide="search" class="w-4 h-4" aria-hidden="true"></i><span>查询</span></button><button type="button" class="invoice-btn invoice-btn-default" data-correction-final-action="reset"><i data-lucide="rotate-ccw" class="w-4 h-4" aria-hidden="true"></i><span>重置</span></button></div>';
      var oldSubtabs = block.querySelector('.invoice-subtabs');
      var header = block.querySelector('.invoice-list-header');
      if (oldSubtabs) oldSubtabs.remove();
      if (header) header.before(flow); else block.prepend(flow);
      if (window.lucide) window.lucide.createIcons();
    }
    var legacyFlow = filterBlock.querySelector('.invoice-filter-flow:not([data-correction-final-filters])');
    if (legacyFlow) legacyFlow.replaceWith(flow);
    else if (flow.parentElement !== filterBlock) filterBlock.appendChild(flow);
    block.querySelectorAll('.invoice-correction-filter-flow, .invoice-correction-scope-tabs').forEach(function (node) { node.remove(); });
    return flow;
  }

  function renderCorrectionTable(table, rows) {
    var filtered = rows.filter(function (row) {
      var date = String(row.created || '').slice(0, 10);
      var type = row.isDelivery ? '交付信息变更' : '票面更正';
      return (!correctionFilters.no || String(row.id).toLowerCase().indexOf(correctionFilters.no) >= 0)
        && (!correctionFilters.subject || String(row.subject).toLowerCase().indexOf(correctionFilters.subject) >= 0)
        && (!correctionFilters.status || row.status === correctionFilters.status)
        && (!correctionFilters.type || type === correctionFilters.type)
        && (!correctionFilters.applicant || String(row.applicant).toLowerCase().indexOf(correctionFilters.applicant) >= 0)
        && (!correctionFilters.start || date >= correctionFilters.start)
        && (!correctionFilters.end || date <= correctionFilters.end);
    });
    filtered.sort(function (a,b) { return (a.created.localeCompare(b.created) || a.id.localeCompare(b.id)) * (correctionDirection === 'asc' ? 1 : -1); });
    table.className = 'invoice-table data-table invoice-correction-detail-table';
    table.tHead.innerHTML = '<tr data-correction-final-header="true"><th>更正申请号</th><th>原蓝票类型</th><th>原蓝票抬头</th><th>原蓝票号码</th><th>开票金额</th><th>更正类型</th><th>更正项</th><th>更正原因</th><th>变更后信息</th><th>重开申请单号</th><th><span class="invoice-th-with-help">处理状态' + statusHelpMarkup() + '</span></th><th>申请人</th><th>申请时间</th><th>操作</th></tr>';
    table.tBodies[0].innerHTML = filtered.length ? filtered.map(function (row) {
      var type = row.isDelivery ? '交付信息变更' : '票面更正';
      var invoiceType = /个人/.test(row.subject || '') ? '数电普票' : '数电专票';
      var invoiceNo = (row.target || '—').replace(/^数电票-?/, '');
      var changed = row.changed || '—';
      var reopen = /^IA-[A-Z0-9-]+$/i.test(row.draft || '') ? row.draft : '—';
      var actions = row.actionHtml || '<button type="button" class="invoice-btn-link" data-action="correction-detail" data-id="' + esc(row.id) + '">详情</button>';
      return '<tr data-correction-final-row="true"><td class="mono"><button type="button" class="invoice-btn-link primary-cell" data-action="correction-detail" data-id="' + esc(row.id) + '">' + esc(row.id) + '</button></td><td>' + invoiceType + '</td><td>' + esc(row.subject || '—') + '</td><td class="mono">' + esc(invoiceNo) + '</td><td class="amount">' + esc(row.amount || '—') + '</td><td>' + type + '</td><td>' + esc(row.changes || '—') + '</td><td>' + esc(row.reason || '—') + '</td><td>' + esc(changed) + '</td><td class="mono">' + esc(reopen) + '</td><td>' + (row.statusHtml || '<span class="muted">—</span>') + '</td><td>' + esc(row.applicant || '—') + '</td><td class="mono">' + esc(row.created || '—') + '</td><td><div class="actions">' + actions + '</div></td></tr>';
    }).join('') : '<tr><td colspan="14"><div class="invoice-empty"><strong>未找到更正申请</strong><p>请调整筛选条件后重新查询。</p></div></td></tr>';
    var timeHeader = table.tHead.rows[0].cells[12];
    timeHeader.setAttribute('aria-sort', correctionDirection === 'asc' ? 'ascending' : 'descending');
    timeHeader.innerHTML = '<button type="button" class="invoice-sort-button" data-correction-final-action="sort" data-sort-direction="' + correctionDirection + '" aria-label="申请时间排序"><span>申请时间</span><span class="invoice-sort-icon" aria-hidden="true"><span class="invoice-sort-caret is-up"></span><span class="invoice-sort-caret is-down"></span></span></button>';
    bindCorrectionHelp(table.querySelector('[data-correction-status-help]'));
    table.dataset.correctionFinal = 'true';
    var total = table.closest('.invoice-block').querySelector('.invoice-list-total');
    if (total) total.innerHTML = '共 <span class="mono">' + filtered.length + '</span> 条';
    var stats = table.closest('.invoice-block').querySelector('.invoice-page-stats');
    if (stats) stats.textContent = '共 ' + filtered.length + ' 条记录　第 1/1 页';
  }

  function bindCorrectionHelp(help) {
    if (!help) return;
    var button = help.querySelector('button'), popover = help.querySelector('[role="tooltip"]'), timer;
    popover.id = 'correctionStatusHelp'; button.setAttribute('aria-describedby', popover.id);
    function open() {
      clearTimeout(timer);
      var rect = button.getBoundingClientRect();
      help.style.setProperty('--help-left', Math.max(16, Math.min(innerWidth - Math.min(400, innerWidth - 32) - 16, rect.left)) + 'px');
      help.style.setProperty('--help-top', Math.max(16, Math.min(innerHeight - popover.offsetHeight - 16, rect.bottom + 8)) + 'px');
      help.dataset.open = 'true'; button.setAttribute('aria-expanded','true');
    }
    function close() { help.dataset.open = 'false'; button.setAttribute('aria-expanded','false'); }
    help.addEventListener('mouseenter', open); button.addEventListener('focus', open); button.addEventListener('click', open);
    help.addEventListener('mouseleave', function () { timer = setTimeout(close, 140); });
    button.addEventListener('blur', close);
    button.addEventListener('keydown', function (event) { if (event.key === 'Escape') { close(); button.blur(); } });
  }

  function normalizeCorrection() {
    var table = root.querySelector('table[aria-label="更正申请列表"]');
    if (!table || !table.tHead || !table.tBodies[0]) return;
    var rows = sourceRows(table);
    if (!rows.length) return;
    var block = table.closest('.invoice-block');
    var flow = ensureCorrectionFilters(block);
    var heading = block.querySelector('.invoice-list-title');
    if (heading && heading.textContent !== '更正申请列表') { heading.textContent = '更正申请列表'; delete heading.dataset.correctionUnified; }
    if (table.dataset.correctionFinal !== 'true') renderCorrectionTable(table, rows);
    flow.querySelector('[data-value="tasks"]')?.setAttribute('aria-selected', 'false');
  }

  function normalize() {
    scheduled = false;
    ensureApplicationFilters();
    normalizeCorrection();
  }

  function readCorrectionFilters() {
    var value = function (id) { var node = root.querySelector('#' + id); return node ? node.value.trim() : ''; };
    correctionFilters = { no: value('correctionFinalNo').toLowerCase(), subject: value('correctionFinalSubject').toLowerCase(), status: value('correctionFinalStatus'), type: value('correctionFinalType'), applicant: value('correctionFinalApplicant').toLowerCase(), start: value('applicationStartDate'), end: value('applicationEndDate') };
  }

  root.addEventListener('click', function (event) {
    var action = event.target.closest('[data-correction-final-action]');
    if (!action) return;
    event.preventDefault();
    if (action.dataset.correctionFinalAction === 'reset') {
      root.querySelectorAll('[data-correction-final-filters] input, [data-correction-final-filters] select').forEach(function (control) { control.value = ''; });
    }
    if (action.dataset.correctionFinalAction === 'sort') correctionDirection = correctionDirection === 'asc' ? 'desc' : 'asc';
    else readCorrectionFilters();
    var table = root.querySelector('table[aria-label="更正申请列表"]');
    if (table) renderCorrectionTable(table, sourceRows(table));
  }, true);

  new MutationObserver(function () {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(normalize);
  }).observe(root, { childList: true, subtree: true });
  normalize();
})();
  `);
})(window.YundengModules && window.YundengModules["invoice-management"]);

window.YundengModules["invoice-management"].scripts = window.YundengModules["invoice-management"].scripts.filter(function (script, index, scripts) {
  if (index === scripts.length - 1) return true;
  return script.indexOf('function makeFilters(block, table)') < 0
    && script.indexOf('function unify()') < 0
    && script.indexOf("var scope = 'red';") < 0
    && script.indexOf('function normalizeReopenColumn()') < 0;
});
window.YundengModules["invoice-management"].before = [];
// 旧 after 阶段按列序号改写更正单，会覆盖新字段并导致 Observer 循环。
window.YundengModules["invoice-management"].after = window.YundengModules["invoice-management"].after.filter(function (script) {
  return !script.includes("var scope = 'red';") && !script.includes('function normalizeReopenColumn()');
});

/* 表头帮助统一使用视口浮层，避免旧定位规则及表格 overflow 裁切。 */
(function (module) {
  module.styles.push(`
.invoice-module th .invoice-status-help > .invoice-status-help-popover {
  display:none!important;
}
.invoice-module.invoice-tooltip-host {
  position:fixed; inset:0; z-index:10000; pointer-events:none;
  padding:0; margin:0; min-height:0; background:transparent;
}
.invoice-module.invoice-tooltip-host > .invoice-status-help-popover {
  display:block!important; position:fixed!important; visibility:visible!important;
  opacity:1!important; pointer-events:auto!important; transform:none!important;
  left:var(--tooltip-x)!important; top:var(--tooltip-y)!important;
  right:auto!important; bottom:auto!important; margin:0!important;
  width:min(400px, calc(100vw - 32px)); max-width:calc(100vw - 32px);
  max-height:var(--tooltip-height)!important; overflow:auto; overscroll-behavior:contain;
  white-space:normal; overflow-wrap:anywhere; text-align:left;
}
  `);
  module.after.unshift(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  if (!root) return;
  var host = document.createElement('div');
  host.className = 'invoice-module invoice-tooltip-host';
  document.body.appendChild(host);
  var active, popup, timer, frame, dismissed;
  var controller = new AbortController();
  var signal = controller.signal;

  function close() {
    clearTimeout(timer);
    if (active) {
      active.setAttribute('aria-expanded', 'false');
      active.removeAttribute('aria-describedby');
    }
    active = null; popup = null; host.replaceChildren();
  }
  function position() {
    frame = null;
    if (!active || !active.isConnected) return close();
    var rect = active.getBoundingClientRect();
    var viewport = window.visualViewport;
    var left = viewport ? viewport.offsetLeft : 0;
    var top = viewport ? viewport.offsetTop : 0;
    var width = viewport ? viewport.width : innerWidth;
    var height = viewport ? viewport.height : innerHeight;
    var right = left + width, bottom = top + height, safe = 16, gap = 8;
    if (rect.bottom < top || rect.top > bottom || rect.right < left || rect.left > right) return close();
    popup.style.width = Math.max(0, Math.min(400, width - safe * 2)) + 'px';
    var below = bottom - safe - rect.bottom - gap;
    var above = rect.top - gap - top - safe;
    // 默认锚定问号下方；极低视口下才翻转，长内容在气泡内部滚动。
    var flipped = below < 96 && above > below;
    var available = Math.max(0, flipped ? above : below);
    popup.style.setProperty('--tooltip-height', available + 'px');
    var bounds = popup.getBoundingClientRect();
    var x = Math.max(left + safe, Math.min(rect.left, right - safe - bounds.width));
    var y = flipped ? rect.top - gap - bounds.height : rect.bottom + gap;
    popup.style.setProperty('--tooltip-x', x + 'px');
    popup.style.setProperty('--tooltip-y', Math.max(top + safe, y) + 'px');
  }
  function open(button) {
    if (button === dismissed) return;
    clearTimeout(timer);
    if (active === button) return position();
    var source = button.parentElement.querySelector('.invoice-status-help-popover');
    if (!source) return;
    close(); active = button;
    popup = source.cloneNode(true);
    popup.id = 'invoiceTableHelpTooltip';
    popup.removeAttribute('style');
    popup.setAttribute('role', 'tooltip');
    popup.setAttribute('tabindex', '0');
    host.appendChild(popup);
    button.setAttribute('aria-describedby', popup.id);
    button.setAttribute('aria-expanded', 'true');
    position();
  }
  function trigger(target) { return target instanceof Element && target.closest('th .invoice-status-help > button'); }
  function deferClose(event) {
    var next = event.relatedTarget;
    if (next instanceof Node && (host.contains(next) || (active && active.parentElement.contains(next)))) return;
    clearTimeout(timer); timer = setTimeout(close, 160);
  }
  root.addEventListener('mouseover', function (event) { var button = trigger(event.target); if (button) open(button); }, {signal:signal});
  root.addEventListener('focusin', function (event) { var button = trigger(event.target); if (button) open(button); }, {signal:signal});
  root.addEventListener('mouseout', function (event) { var button = trigger(event.target); if (button) { if (!(event.relatedTarget instanceof Node) || !button.parentElement.contains(event.relatedTarget)) dismissed = null; deferClose(event); } }, {signal:signal});
  root.addEventListener('focusout', function (event) { if (trigger(event.target)) { dismissed = null; deferClose(event); } }, {signal:signal});
  root.addEventListener('click', function (event) { var button = trigger(event.target); if (button) { dismissed = null; open(button); } }, {capture:true,signal:signal});
  host.addEventListener('mouseenter', function () { clearTimeout(timer); }, {signal:signal});
  host.addEventListener('mouseleave', deferClose, {signal:signal});
  window.addEventListener('keydown', function (event) { if (event.key === 'Escape' && active) { dismissed = active; close(); event.stopImmediatePropagation(); } }, {capture:true,signal:signal});
  document.addEventListener('pointerdown', function (event) { if (!trigger(event.target) && !host.contains(event.target)) close(); }, {capture:true,signal:signal});
  function schedulePosition(event) {
    if (!active || (event && event.target instanceof Node && host.contains(event.target))) return;
    if (!frame) frame = requestAnimationFrame(position);
  }
  window.addEventListener('scroll', schedulePosition, {capture:true,passive:true,signal:signal});
  window.addEventListener('resize', schedulePosition, {signal:signal});
  if (window.visualViewport) {
    visualViewport.addEventListener('resize', schedulePosition, {signal:signal});
    visualViewport.addEventListener('scroll', schedulePosition, {signal:signal});
  }
  var observer = new MutationObserver(function () {
    if (!root.isConnected) { close(); host.remove(); controller.abort(); observer.disconnect(); cancelAnimationFrame(frame); }
    else if (active && !active.isConnected) close();
  });
  observer.observe(document.body, {childList:true,subtree:true});
})();
  `);
})(window.YundengModules["invoice-management"]);

/* 团队开票审核：金额以分计算；演示账号为虚构数据，按用户确认不脱敏。 */
(function (module) {
  module.styles.push(`
.invoice-module .invoice-contract-notice { margin:0 0 16px; padding:16px; border-radius:4px; background:#FDF2E9; color:var(--invoice-body); font-size:12px; line-height:20px; }
.invoice-module .invoice-contract-notice h3 { margin:0 0 8px; color:#E7772D; font-size:14px; font-weight:600; }
.invoice-module .invoice-contract-notice p { margin:0 0 8px; }
.invoice-module .invoice-contract-notice dl { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px 16px; margin:0; }
.invoice-module .invoice-contract-notice dl > div { display:flex; flex-wrap:wrap; gap:8px; }
.invoice-module .invoice-contract-notice dd { margin:0; font-family:'JetBrains Mono',monospace; }
.invoice-module #invoiceDialog { z-index:120; }
.invoice-module [data-team-column] { min-width:140px; white-space:nowrap; font-weight:400; }
.invoice-module th[data-team-column] { font-weight:600; }
.invoice-module td[data-team-column="applicant"] { min-width:200px; }
@media(max-width:768px) { .invoice-module .invoice-contract-notice dl { grid-template-columns:1fr; } }
  `);
  module.scripts.splice(1, 0, `
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]');
  var api = root.__invoiceUi;
  // 推断补全：团队、提交账号及列表之外的历史账本为 Mock；业务关联使用 teamId，不按抬头累计。
  var teams = {};
  var subjects = [];
  [api.applications, api.documents, api.redTasks, api.corrections].forEach(function (list) {
    list.forEach(function (item) { if (!subjects.includes(item.subject)) subjects.push(item.subject); });
  });
  subjects.forEach(function (subject, index) { teams[subject] = { teamId:'TM-' + (10001 + index), account:'customer' + (index + 1) + '@example.com' }; });
  teams['深圳航迹网络有限公司'].account = '13800138001';
  teams['厦门海岸实验室'].account = '13900139002';
  api.applications.forEach(function (item) { Object.assign(item, {teamId:teams[item.subject].teamId, applicant:teams[item.subject].account}); });
  api.documents.forEach(function (item) { var app = api.applications.find(function (a) { return a.id === item.applicationId; }); Object.assign(item, {teamId:teams[item.subject].teamId, applicant:app ? app.applicant : teams[item.subject].account}); });
  api.redTasks.forEach(function (item) { Object.assign(item, {teamId:teams[item.subject].teamId, applicant:item.source === 'FINANCE_CORRECTION' ? 'finance@example.com' : '系统'}); if(item.status==='PARTIAL')item.succeededAmount=40000; });
  api.corrections.forEach(function (item) { Object.assign(item, {teamId:teams[item.subject].teamId, applicant:/管理员/.test(item.applicant) ? 'finance@example.com' : teams[item.subject].account}); });
  var reopen = Object.assign({}, api.applications.find(function (a) { return a.id === 'IA-20260818-0022'; }), {
    id:'IA-20260818-0022-R1', amount:80000, status:'PENDING_REVIEW', issuance:'NOT_SUBMITTED',
    subject:'南京极昼信息科技有限公司', created:'2026-08-19 10:00', applicant:'finance@example.com', reviewer:'—',
    correctionId:'CR-20260818-004', note:'更正申请红冲完成后生成的重开申请'
  });
  teams[reopen.subject] = teams['南京极昼网络有限公司'];
  api.applications.unshift(reopen);
  var historical = [
    {teamId:teams['深圳航迹网络有限公司'].teamId, succeeded:70099, issuing:0, red:0},
    {teamId:teams['厦门海岸实验室'].teamId, succeeded:144000, issuing:10000, red:30000},
    {teamId:reopen.teamId, succeeded:200000, issuing:0, red:80000},
    {teamId:teams['杭州星河数字工作室'].teamId, succeeded:150000, issuing:0, red:0}
  ];
  function summary(item) {
    var result = {succeeded:0, issuing:0, red:0, current:item.amount, total:0};
    historical.filter(function (h) { return h.teamId === item.teamId; }).forEach(function (h) { result.succeeded += h.succeeded; result.issuing += h.issuing; result.red += h.red; });
    api.documents.filter(function (d) { return d.teamId === item.teamId && d.applicationId !== item.id && d.document !== 'NONE'; }).forEach(function (d) { result.succeeded += d.amount; });
    api.applications.filter(function (a) { return a.teamId === item.teamId && a.id !== item.id && ['SUBMITTING','ISSUING'].includes(a.issuance); }).forEach(function (a) { result.issuing += a.amount; });
    api.redTasks.filter(function (r) { return r.teamId === item.teamId && r.status === 'SUCCEEDED'; }).forEach(function (r) { result.red += r.amount; });
    // 部分红冲仅计入明确成功的子金额，不扣处理中、失败或未知金额。
    api.redTasks.filter(function (r) { return r.teamId === item.teamId && r.status === 'PARTIAL'; }).forEach(function (r) { result.red += r.succeededAmount || 0; });
    result.total = Math.max(0, result.succeeded + result.issuing + result.current - result.red);
    return result;
  }
  api.applications.forEach(function (item) { if (item.status !== 'PENDING_REVIEW') item.contractReviewSnapshot = summary(item); });
  root.__invoiceCompliance = {teams:teams, summary:summary, snapshot:function (item) { return item.contractReviewSnapshot || summary(item); }};
  api.renderView();
})();
  `);
  module.after.push(`
(function () {
  var root = document.querySelector('[data-module-root="invoice-management"]'), api = root.__invoiceUi, compliance = root.__invoiceCompliance;
  var activeApp = '', activeDoc = '', activeRed = '', redKind = '', approveId = '', scheduled = false;
  function esc(v) { return String(v == null ? '—' : v).replace(/[&<>"']/g, function(c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function money(n) { return '¥' + (n / 100).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2}); }
  function headerName(th) { var n=th.cloneNode(true); n.querySelectorAll('.invoice-status-help').forEach(function(h){h.remove();}); return n.textContent.trim(); }
  function notice(item) {
    var s = compliance.snapshot(item);
    if (s.total < 200000) return '';
    return '<section class="invoice-contract-notice" data-contract-notice role="note"><h3>达到自助开票限额，请核实合同</h3><p>该团队累计开票金额（含本次申请）为 <strong>' + money(s.total) + '</strong>，已达到平台自助开票限额 ¥2,000.00。请联系商务确认客户已签署合同，并核对合同企业名称与开票抬头一致后，再审批通过。</p><p>当前系统暂不支持自动校验合同信息；本提醒不阻止审批。' + (item.status !== 'PENDING_REVIEW' ? '以下为审批时的金额快照。' : '') + '</p><dl>' + [['历史开具成功',s.succeeded],['其他开具中',s.issuing],['已成功红冲（扣除）',s.red],['本次申请',s.current]].map(function(x){return '<div><dt>' + x[0] + '</dt><dd>' + money(x[1]) + '</dd></div>';}).join('') + '</dl></section>';
  }
  function meta(list,id) { return list.find(function(a){return a.id===id;}); }
  function addColumns(table, list, anchor, before, correction) {
    if (!table || !table.tHead || !table.tBodies[0]) return;
    var heads=Array.from(table.tHead.rows[0].cells);
    if (heads.some(function(h){return h.dataset.teamColumn;})) return;
    var anchorIndex=heads.findIndex(function(h){return headerName(h)===anchor;});
    if(anchorIndex<0)return;
    var oldApplicant=correction ? heads.findIndex(function(h){return headerName(h)==='申请人';}) : -1;
    var rows=[table.tHead.rows[0]].concat(Array.from(table.tBodies[0].rows));
    rows.forEach(function(row,index){
      if(index && row.cells.length===1){row.cells[0].colSpan=heads.length+(correction?1:2);return;}
      var cells=Array.from(row.cells), anchorCell=cells[anchorIndex];
      var button=row.querySelector('[data-id], [data-document-detail]');
      var id=row.dataset.applicationId || row.dataset.documentId || (button && (button.dataset.id || button.dataset.documentDetail));
      var item=index ? meta(list,id) : null;
      if(index && !item) { var invoice=cells.map(function(c){return c.textContent.trim().replace(/^数电票-/,'');}); item=list.find(function(d){return d.invoiceNo && invoice.includes(d.invoiceNo.replace(/^数电票-/,''));}); }
      var team=document.createElement(index?'td':'th'), account=oldApplicant>=0?cells[oldApplicant]:document.createElement(index?'td':'th');
      team.dataset.teamColumn='team'; account.dataset.teamColumn='applicant';
      team.className=index?'mono':'';
      team.textContent=index?(item && item.teamId || '—'):'团队ID';
      account.textContent=index?(item && item.applicant || '—'):'申请人';
      if(before){anchorCell.before(team,account);}else{anchorCell.after(team,account);}
    });
  }
  function fields(container,item,red) {
    if(!container || !item || container.querySelector('[data-team-detail]'))return;
    var grid=container.querySelector('dl'); if(!grid)return;
    var klass=red?'invoice-red-detail-field':'invoice-detail-field';
    var existing=Array.from(container.querySelectorAll('dt')).find(function(n){return n.textContent.trim()==='申请人';});
    if(existing){existing.nextElementSibling.textContent=item.applicant;grid=existing.closest('dl') || grid;}
    var labels=[['团队ID',item.teamId]]; if(!existing)labels.push(['申请人',item.applicant]);
    labels.forEach(function(x){var d=document.createElement('div');d.className=klass;d.dataset.teamDetail='true';d.innerHTML='<dt>'+x[0]+'</dt><dd>'+esc(x[1])+'</dd>';grid.appendChild(d);});
  }
  function normalize() {
    scheduled=false;
    api.redTasks.forEach(function(item){if(!item.teamId){var team=compliance.teams[item.subject];if(team){item.teamId=team.teamId;item.applicant=item.source==='FINANCE_CORRECTION'?'finance@example.com':'系统';}}});
    var appTable=root.querySelector('table[aria-label="开票申请列表"][data-application-list-normalized]');
    addColumns(appTable,api.applications,'申请时间',true,false);
    addColumns(root.querySelector('table[aria-label="票据列表"][data-document-list-normalized]'),api.documents,'开票金额',false,false);
    addColumns(root.querySelector('table[aria-label="红冲任务列表"][data-red-task-columns-ready]'),api.redTasks,'红冲金额',false,false);
    addColumns(root.querySelector('table[aria-label="更正申请列表"][data-correction-final]'),api.corrections,'处理状态',true,true);
    var correctionTable=root.querySelector('table[aria-label="更正申请列表"][data-correction-final]');
    if(correctionTable && correctionTable.tHead){
      var columns=Array.from(correctionTable.tHead.rows[0].cells);
      var statusIndex=columns.findIndex(function(th){return headerName(th)==='处理状态';});
      var actionIndex=columns.findIndex(function(th){return headerName(th)==='操作';});
      if(statusIndex>=0 && actionIndex>=0 && statusIndex!==actionIndex-1){
        [correctionTable.tHead.rows[0]].concat(Array.from(correctionTable.tBodies[0].rows)).forEach(function(row){
          if(row.cells.length===columns.length)row.cells[actionIndex].before(row.cells[statusIndex]);
        });
      }
    }
    if(appTable)appTable.querySelectorAll('tbody tr').forEach(function(row){
      var item=meta(api.applications,row.dataset.applicationId); if(!item || item.status!=='PENDING_REVIEW' || row.querySelector('[data-action="approve-application"]'))return;
      var cell=row.lastElementChild; cell.innerHTML='<div class="actions"><button class="invoice-btn-link" data-action="approve-application" data-id="'+item.id+'">通过</button><button class="invoice-btn-link" data-action="reject-application" data-id="'+item.id+'">驳回</button><button class="invoice-btn-link" data-action="open-application" data-id="'+item.id+'">详情</button></div>';
    });
    var item=meta(api.applications,activeApp), drawer=root.querySelector('#invoiceDrawer');
    if(item && drawer && !drawer.hidden){
      var body=root.querySelector('#invoiceDrawerBody'); fields(body,item,false);
      if(!body.querySelector('[data-contract-notice]'))body.insertAdjacentHTML('afterbegin',notice(item));
    }
    var dialog=root.querySelector('#invoiceDialog');
    if(approveId && dialog && !dialog.hidden && root.querySelector('#invoiceDialogTitle').textContent.includes('审核通过并提交开具')){
      var db=root.querySelector('#invoiceDialogBody'), ai=meta(api.applications,approveId);
      if(ai && !db.querySelector('[data-contract-notice]'))db.insertAdjacentHTML('afterbegin',notice(ai));
    }
    fields(root.querySelector('#invoiceDocumentDetail:not([hidden]) [data-document-detail-body]'),meta(api.documents,activeDoc),true);
    var red=root.querySelector('#invoiceRedDetailDrawer:not([hidden])');
    if(red){
      var ri=meta(redKind==='correction'?api.corrections:api.redTasks,activeRed); fields(red.querySelector('#invoiceRedDetailBody'),ri,true);
      if(ri && redKind==='correction'){
        var statusNames={PENDING_REVIEW:'待审核',APPROVED:'审核通过',RED_PROCESSING:'红冲处理中',RED_FAILED:'红冲失败',COMPLETED:'已完成',REJECTED:'已驳回',WITHDRAWN:'已撤回',CANCELLED:'已取消'};
        var stateLabel=Array.from(red.querySelectorAll('dt')).find(function(n){return n.textContent.trim()==='更正状态';});
        if(stateLabel && stateLabel.nextElementSibling.textContent!==statusNames[ri.status])stateLabel.nextElementSibling.textContent=statusNames[ri.status];
        var resultLabel=Array.from(red.querySelectorAll('dt')).find(function(n){return n.textContent.trim()==='处理说明';});
        var resultCopy={PENDING_REVIEW:'等待更正审核员处理',APPROVED:'已审核通过，等待原蓝票红冲；红冲完成后生成重开申请。',RED_PROCESSING:'原蓝票红冲处理中，等待第三方最终结果。',RED_FAILED:'红冲失败，请核实失败原因后处置。',COMPLETED:ri.draft==='—'?'交付信息已更新，无需红冲或重开。':'已生成关联重开申请，后续开具进度以重开申请为准。',REJECTED:'申请已驳回，本次更正终止。',WITHDRAWN:'申请人已撤回，本次更正终止。',CANCELLED:'本次更正已取消。'}[ri.status];
        if(resultLabel && resultLabel.nextElementSibling.textContent!==resultCopy)resultLabel.nextElementSibling.textContent=resultCopy;
        var footer=red.querySelector('footer'), key=ri.id+ri.status;
        if(footer.dataset.teamActions!==key){footer.dataset.teamActions=key;footer.innerHTML='<button class="invoice-btn invoice-btn-default" data-invoice-red-detail-action="close">关闭</button>'+(ri.status==='PENDING_REVIEW'?'<button class="invoice-btn invoice-btn-danger" data-action="reject-correction" data-id="'+ri.id+'">驳回</button><button class="invoice-btn invoice-btn-primary" data-action="approve-correction" data-id="'+ri.id+'">审核通过</button>':'');}
      }
    }
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(normalize);}}
  document.addEventListener('click',function(event){
    var target=event.target.closest('[data-action],[data-document-detail]');if(!target || !root.contains(target))return;
    var action=target.dataset.action,id=target.dataset.id;
    if(action==='open-application')activeApp=id;
    if(target.dataset.documentDetail)activeDoc=target.dataset.documentDetail;
    if(action==='red-detail'||action==='correction-detail'){activeRed=id;redKind=action==='correction-detail'?'correction':'task';}
    if(action==='approve-application')approveId=id;
    if(action==='reject-application')approveId='';
    if(action==='approve-correction'||action==='reject-correction'){activeRed=id;redKind='correction';approveId='';}
    if(action==='confirm-dialog' && approveId){var item=meta(api.applications,approveId);if(item)item.contractReviewSnapshot=compliance.summary(item);}
    schedule();
  },true);
  new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  normalize();
})();
  `);
})(window.YundengModules["invoice-management"]);
