# 项目长期记忆 — 云登后台管理系统（原型）

## 工程约定
- 入口统一 `index.html?page=<英文模块名>`；框架层 = `Prototype/app-shell.js` + `Prototype/系统框架.css`；业务 = `Prototype/modules/*.js`（只建内容区，无 iframe、无本地 JS/CSS 拆分）。
- **缓存破坏（强制）**：任何 `Prototype/modules/*.js` 或 `Prototype/系统框架.css` 改动后，必须同步 bump 两处 —— `Prototype/app-shell.js` 的 `MODULE_VERSION` 与 `index.html` 里 `系统框架.css?v=` / `app-shell.js?v=`。
- **编辑 JSON-string 型模块**（如 `billing-invoice.js`、`user-list.js`）：`scripts[]`/`html` 是 JSON 字符串。必须用「剥缩进+尾逗号 → `json.loads` → 改 → `json.dumps(ensure_ascii=False)` → 还原缩进/逗号」的往返流程，禁止手工向 JSON 字符串内插代码（含未转义双引号会整体损坏模块）。
- 补丁需带断言（命中次数校验），出现 FAIL 必须追查，禁止静默 no-op 交付。
- **⚠️ 原型改动必须做运行时冒烟验证（V1.11 血泪教训）**：`node --check`（只验语法）+ grep 断言（只验字符串命中）+ 纯函数逻辑测试（不跑 UI）**三者都抓不到「点击无反应」这类缺陷**。冒烟脚本 `.workbuddy/smoke-test.js`（jsdom），真实执行 `init(root)` 并触发模块内**每一个事件处理器**。跑法：`NODE_PATH=/Users/zhangbin/.workbuddy/binaries/node/workspace/node_modules /Users/zhangbin/.workbuddy/binaries/node/versions/22.22.2-3/bin/node .workbuddy/smoke-test.js`（jsdom 装在 `/Users/zhangbin/.workbuddy/binaries/node/workspace`）。**改完模块务必跑一遍再交付。**
- **给状态变量赋值前，必须先确认 `let` 声明已存在**：模块以**严格模式**运行，未声明变量赋值会抛 `ReferenceError`（不是静默创建全局）。V1.7 加 `ipOwners` / `linkMismatchKey` 时只加了赋值处、漏了声明行，导致 `openReplacement` 首行即抛错、**「更换代理」按钮完全打不开弹窗**，直到 V1.11 才发现。新增状态一律写进 `let modalKind='',returnFocus=null,busy=false,lookupTimer,lookupVersion=0,selectedUser=null,selectedAsset=null,ipOwners=[],linkMismatchKey='';` 这一行。**断言式补丁只校验命中次数，不校验语义完整性** —— 所以运行时验证不可省。
- **本机工具坑**：BSD grep 的 `\|` 多模式交替会**静默失效**（返回 0 命中而不报错），核验必须用 `grep -F` 逐词或 `grep -E`；Read 工具对 >2000 字符的超长行会截断，此时改用 Python 按行号改（带断言）。
- **按钮标准（跨模块，模块内自建 `.btn`）**：`height:32px;padding:0 14px;gap:6px;font-size:13px;font-weight:500;white-space:nowrap;transition:background .15s,border-color .15s,color .15s`，圆角 4px；`-primary` `#0066FF` → hover `#0052CC` → active `#0047B3`（均带 `border-color`）；`-default` 白底 + `#DFE1E5` 描边，hover `#E6F0FF` 底 + primary 描边与字色；`:disabled` 统一 `#F7F8FA` 底 / `#DFE1E5` 描边 / `#9DA2AC` 字 + `cursor:not-allowed`（不要用 `opacity` 淡化）。筛选区按钮为**纯文字、不带装饰图标**，放在 `.filter-actions`（gap 12px、高 32px、整组不拆分）。
- **判断模块是否合规前先看 CSS 覆盖顺序**：模块样式串里常有前段旧规则 + 后段覆盖块（如 `filter-flow` 前 480px/auto-fit、后 388px/auto-fill；`filter-label` 前 112px、后 88px），按前段判会误判。
- 独立版导出：`scripts/export-standalone.py <模块名> --output exports/<名>-独立版.html`（先例 `exports/发票管理-独立版.html`）。
- **模块内新增/改动 DOM 控件的 id 约束（V1.10 踩坑总结）**：① `$ = id => root.querySelector('#pr-'+id)` 取**文档顺序第一个**匹配，筛选区控件**绝不能**与弹窗 `field()` / `selectField()` 生成的名字撞车（弹窗字段名 = `pr-<字段id>`，已有 `pr-account` / `pr-source-ip` / `pr-channel` / `pr-change-reason` / `pr-remark` 及其 `-error/-count/-help`），否则弹窗打开时读值会拿到筛选区的 hidden input（本轮 `pr-change-reason` 撞车会导致提交永久失败）；② 筛选区控件的 `name` **必须等于** `id` 去掉 `pr-` 前缀（`getDraft` 用 `new FormData`、`restoreView` 用 `$(key)` 按 name 反查 id），否则草稿恢复静默失效；③ 改 id 必须同时改三处 —— HTML 的 `id` 属性、JS 的 `$()` 引用、点击穿透白名单里的 `#id`；④ 用脚本兜底：提取静态 `id="pr-xxx"` 做去重检查 + 提取全部 `$('xxx')` 与静态 id 比对（弹窗动态字段放白名单），本轮正是它抓出了漏改的 `pr-reason-filter-trigger`。

## 更换代理页面约定（2026-09-23 定稿）
- **设计规则**：数据列表的标题栏与数据表之间，只有当两者中间存在 KPI 指标卡、批量操作工具条等辅助内容时才需要分割线；**标题栏直接接数据表时不需要分割线**（本次已据此移除「更换记录」标题栏下分割线）。
- **「更换结果 / 同步状态」双字段口径**：`result`（资源替换结果）= success 更换成功 / failed 更换失败；`syncStatus`（环境与指纹同步状态）= syncing 同步中 / success 同步成功 / failed 同步失败 / na 不适用（列表显示 `- -`）。合法组合仅 4 种，`result=failed ⟺ syncStatus=na`。**更换结果 ≠ 同步成功**：syncing/sync-failed 都属于 result=success（新 IP 已生效）。
- 列表列序（**V1.9 起 15 列**）：用户ID / 用户手机号邮箱 / 原代理IP(+单价) / 新代理IP(+单价) / **渠道商** / 代理类型 / 最近登录时间 / 代理到期时间 / **更换原因** / 更换结果 / 同步状态 / 备注 / 操作人 / 操作时间 / 操作。主表 `min-width:2280px`，空态 `colspan="15"`。单价为 IP 下方子行（`192.0.2.31` → 换行 `中国-浙江-杭州 ￥50.25/月`）。
- **渠道商列（V1.9）= 原 / 新两行**：`原：{oldChannel}` / `新：{channel}`，前缀用 `.pr-sub` 灰、值用正文色。**记录存双快照** `oldChannel`（原代理所属渠道商）+ `channel`（本次所选 = 新渠道商）；**新行跟 `r.newIp` 判断**，更换失败无新代理时显示 `- -`（与「新代理IP」「同步状态」空值口径一致）。种子 `oldChannel = channels[(i+2)%5].name`、`channel` 保持 `channels[i%5]` 不动（+2 保证历史记录原/新全部错开、且旧会话 `channel` 数据不失效）。⚠️ **历史记录的 `oldIp`（198.51.100.80~91）不在资产表内**，无法靠 IP 反查资产取渠道商，必须用记录级快照。
- **改字段顺序必须表头 + 行渲染两处同步改**（`<th>` 序列与 split('<td') 的序列），漏一处就整行错位。核验小坑：`grep -oE "<th>[^<]+</th>"` 只出 14 个（`操作时间` 是 `<th id="pr-sort-th">` 不匹配），不是缺列。
- 已移除：「绑定环境」列、「代理状态」列、「代理到期时间」下剩余天数、「绑定环境详情」弹窗（入口随列移除）。`envs` 数据模型、`environments()` 种子与 `queueSync`/`retrySync` 环境遍历**保留**（同步功能仍在）。
- **更换弹窗代理信息卡片（V1.7 起 7 项）**：代理IP / 所属地区 / 代理类型 / **渠道商** / **单价** / 最近登录时间 / 到期时间；**不展示代理状态**，状态拦截原因由 `#pr-source-ip-error` 的字段级文案（F-05 / F-06）承担。资产状态在列表与弹窗中均不成列/成项，仅用于资格判定。
- **弹窗双向联动（V1.7）**：可「先账号后原代理IP」也可反向。先填 IP 时按 IP 反查关联用户下拉（`ownersFor(ip)` / `renderOwners`），单选回填账号；两者无关联 → **不可提交 + toast**（`linkMismatchKey` 去重防重复弹）。判定集中在一个函数 **`evaluateLink()`**，一次算出卡片内容 / 关联用户下拉 / 字段错误 / 提交按钮可用性，禁止散落多处各判一套。
- **弹窗必填项（V1.7）**：渠道商（下拉单选，**= 货源渠道，仅记录来源**，选项显示「名称 + ￥区间/月」**不显示 IP**，回显时带渠道商名称）；更换原因（下拉单选，13 值：下架/断网/卡顿/跳地区/黑白名单/浏览器问题/业务不支持/IP质量与实际不符/复卖/客户自身问题/其他/买错地区/外网（无法认证））；备注（多行，选填，限 **500 字**，带 `0/500` 计数器）。
- **单价口径（V1.7）**：`priceText(v)` 空值显示 `- -`，否则 `￥xx.xx/月`。**新代理单价 = 自动分配后那台新代理 IP 的单价**（非原 IP、非渠道商报价）。
- **状态列呈现是本模块的特例（V1.8）**：更换结果 / 同步状态改为**纯文字 + 语义色**——`.pr-badge` 已去掉 `border`/`border-radius`/`padding`（padding 必须一起去，否则文字左右留空隙与相邻列对不齐），`.pr-success`/`.pr-warning`/`.pr-info`/`.pr-danger` 已去掉 `background`，只剩 `color`。⚠️ **其余 18 个模块仍是带底色描边的徽标**，跨模块观感不一致；若要全站统一需另开一轮批量改造。
- **浮层入口有两套（V1.8）**：① 更换结果 / 同步状态 → 状态文本右侧**问号**按钮（`.pr-help-dot`），hover / focus 展开 `.pr-reason-pop`；② 备注 → **无问号**，备注文本本身带 `.pr-clamp pr-help-text`，鼠标移入或键盘聚焦即弹同一浮层。两者都由 `data-reason` / `data-reason-label` 驱动同一个 `openReason()`，与元素标签类型无关。**事件委托选择器必须写成 `'.pr-help-dot,.pr-help-text'`（共 5 处：pointerdown 白名单 1 + pointerover/out/focusin/out 4），漏改则备注悬浮失效**。备注列不再写 `title` 属性（否则原生 tooltip 与自定义浮层同时弹出），并保留 `tabindex="0"` + `aria-describedby` 维持键盘可达。
- **动版本号前必须先 grep `MODULE_VERSION` 实际值**（多会话并行改同一文件，上一轮记下的字符串可能已被覆盖，按旧值断言会 FAIL）。当前值：`20260927-channel-copy-align`。
- **渠道商口径已定稿（2026-09-27 用户「其他说明」7 条最终确认）**：渠道商**不参与**新 IP 分配、仅记录来源（R-09 权威）；「新渠道商」= 本次所选渠道商（仅记录快照）。弹窗固定说明已修正为「自动分配其他可用 IP」（V1.11 消除了 V1.8 文案与 R-09 的矛盾）。用户 7 条权威口径已结构化落在 PRD §1.5。若日后要求渠道商参与库存限定，需同时改原型匹配代码 + R-09 + §3.2.3/§3.2.4。
- 筛选区顺序（**V1.10 起 8 项**）：用户搜索 / 原代理IP / 新代理IP / **更换原因（多选下拉）** / 更换结果 / 同步状态 / 操作人 / 操作时间。多选与其他条件 AND、内部 OR，选择只改草稿、点「查询」才应用；触发器文案 0 项→「全部更换原因」、1 项→该项名、≥2 项→「已选 N 项」。
- 交付物：`exports/更换代理-独立版.html`（单文件可分享，与 `Prototype/modules/proxy-replacement.js` 同步导出）。**导出前后必比 mtime**：模块 mtime 必须早于导出件，否则重导。
- 多持有者演示数据：`198.51.100.21` 同属 `100001` + `100003`（演示反查下拉多选一）；`198.51.100.27` 只属 `100002`。

## 发票管理状态体系（2026-09-18 定稿）
- **票据状态（6）**：有效 / 红冲中 / 部分红冲 / 已红冲 / 红冲失败 / 未生成。
- **红冲状态（8，业务顺序）**：提交中 / 待处理 / 红冲中 / 部分红冲 / 已红冲 / 结果未知 / 红冲失败 / 已取消。
  - 「待受票方确认」（`AWAITING_CONFIRMATION`）已于 2026-09-18 按原型**全量移除**（含权限点、`confirmation-query` 接口、幂等键、通知与验收条目）；如需恢复见 PRD 第 23 章 O-09。
- **更正申请状态（独立体系，勿混用）**：待审核 / 审核通过 / 红冲处理中 / 红冲失败 / 已完成 / 已驳回 / 已撤回 / 已取消。注意「红冲处理中」是更正域专有词，不随票据/红冲状态改名。
- 作废词：红冲处理中、已全额红冲、已部分红冲、部分红冲成功、全部任务状态（票据/红冲域内不再使用）。
  - ⚠️ 两份文档中的「停用词声明」会故意保留这些词，grep 命中属正常，不是遗漏。
- 业务规则：同一原票不得同时存在两条在途红冲任务。
- 关联文档：`PRD/财务管理/发票管理PRD.md`（V2.2）、`PRD/财务管理/发票管理产品设计方案.md`（v1.5）以本章口径为准。

## 发票管理分期交付（2026-09-18 定稿）
- **一期**：仅「申请管理 + 票据管理」（用户申请 → 财务审核 → 第三方开蓝票 → 交付）。**不做**红冲任务、更正申请、开票配置、灾备线下登记、组合支付、批量选择、KPI 指标卡。
- **二期**：红冲任务（含更正申请）+ 开票配置。
- 一期文档：`PRD/财务管理/发票管理（一期）PRD.md`（V1.0，开发基线）+ `PRD/财务管理/发票管理（一期）后台开发简要清单.md`（项目组通知用）。母文档 `发票管理PRD.md` 仍是业务规则唯一来源；一期只裁剪**范围与排期**，不重定义规则。
- 一期 `document_status` 只产 `NONE`/`ACTIVE`（筛选项按原型保留 6 值以便二期零返工）；一期权限点 17 个（剔除 `invoice.red.*` / `invoice.correction.*` / `invoice.config.*` / `offline.*`，新增 `invoice.application.proxy.create`）。
- **两处硬阻塞**：① 一期无配置页面，配置数据靠初始化脚本 + 变更工单（否则无法开票）；② 一期无红冲，已开票后退款只登记人工待办 + 告警，`effective_blue_amount` 不静默改写，需人工 SOP。
- 原型与完整版 PRD 的 **9 项差异（D1–D9）** 已记录在一期 PRD 第 25.2 节，研发按该表实现。
