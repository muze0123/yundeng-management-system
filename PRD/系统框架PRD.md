# 系统框架 PRD

| 文档信息 | 内容 |
|---|---|
| 产品 | 云登后台管理系统 |
| 需求名称 | 系统框架（App Shell） |
| 文档用途 | 定义唯一 App Shell、内容模块契约与统一路由；后续可迁移至 React + TypeScript 管理后台 |
| 视觉最高优先级 | 附件《codex-clipboard-513de328-bc17-4fd2-97c4-f96d4e7c9d22.png》 |
| 设计与工程约束 | `design.md` 为视觉 token 单一事实来源；`claude.md` 为 HTML 原型工程与标注规范 |
| 本期交付物 | `系统框架.html`、`系统框架.css`、`系统框架.js`、`Prototype/modules/*.js` 内容模块，以及旧业务 HTML 兼容入口 |

## 0. 给 AI 编码工具的执行指令

先完整阅读本 PRD、`design.md` 与 `claude.md`，再生成 `系统框架.html`。附件图片是**页面整体布局、组件层级、可见菜单与视觉结构的最高优先级依据**；当它与文字规范冲突时，按以下顺序决策：

1. 用户最新确认的菜单结构决定分组名称、顺序、层级与可点击性；图片仅决定未被最新确认内容覆盖的页面骨架、组件相对位置与信息密度；
2. 本 PRD 决定交互、状态、数据流、权限与边界；
3. `design.md` 决定颜色、字体、圆角、间距、阴影、通用组件外观；
4. `claude.md` 决定 HTML 原型技术栈、导航、Mock 数据和 

首版必须使用语义化 HTML5、Tailwind CSS CDN、Lucide CDN 和原生 JavaScript（ES6+），不引入 React、Vue、jQuery 或其他未授权库。`系统框架.html` 是唯一页面骨架，公共样式与路由生命周期分别由 `系统框架.css`、`系统框架.js` 维护；已完成业务页面提取为内容模块，禁止使用 iframe，也禁止在模块中重复渲染 TopBar 或 Sidebar。页面双击或通过静态服务均可预览；数据为内联 Mock 数据；页面必须可交互且控制台无错误。后续 React + TypeScript 重构时，保留本 PRD 的状态模型、事件契约与组件边界，不依赖原生 JS 的全局变量。

> **明确覆盖规则（2026-08-19）：** “用户管理、订单管理、财务管理、资源管理、数据埋点”均为灰色静态分组标题，不是一级菜单，不可点击、不可折叠、无路由、无选中态。各组下面直接放置可点击一级菜单；“数据埋点”按产品链路放置八个阶段型一级菜单，其中仅“口径治理”因包含事件管理和指标管理两个独立工作台而展开二级菜单。该规则覆盖此前所有数据埋点扁平菜单或整体可折叠分组方案。

---

## 1. 需求概述

### 1.1 页面定位

系统框架是云登后台管理系统所有登录后页面的唯一应用壳，负责提供工作台、用户、订单、资源和数据埋点能力的全局入口、当前路由上下文、账户与通知入口、内容承载区域及跨页面反馈。用户列表、订单列表、环境管理、代理列表或数据埋点页面内部的表格、表单、分析和详情逻辑由内容模块自行负责，并按路由加载到主内容区；公共框架不复制到任何业务模块。

本框架必须让后台管理员无论身处哪个业务页面，都能稳定完成：识别当前菜单分组与功能、切换一级菜单、查看通知和账户信息，以及在加载、无权限、会话过期或路由失败时获得明确反馈。

### 1.2 用户与场景

| 场景 ID | 角色与触发 | 主路径 | 成功结果 |
|---|---|---|---|
| S-01 | 已登录管理员首次进入系统 | 加载会话、权限与导航配置 → 进入默认有权页面 → 渲染应用壳 | 当前路由、菜单高亮、账户/通知信息一致，内容区显示目标页面或其加载态 |
| S-02 | 管理员切换模块 | 点击任一可点击一级菜单 | 经离开保护校验后切换路由，更新页面标题、菜单高亮、内容区数据 | 仅一个一级菜单为当前页，地址与内容一致 |
| S-03 | 管理员浏览导航分组 | 查看“用户管理、订单管理、财务管理、资源管理、数据埋点”灰色标题 | 标题仅提供信息分组，不响应点击、键盘确认或折叠 | 不产生路由、展开状态、选中态或导航点击事件 |
| S-04 | 管理员进入数据埋点 | 按“数据概览→口径治理→联调验证→质量监控→明细排查→数据分析→资产沉淀→决策复盘”选择一级菜单 | 直接一级菜单进入页面；口径治理展开事件管理/指标管理二级菜单 | 当前阶段及叶子页面高亮，页面标题与路由一致 |
| S-05 | 管理员处理全局信息 | 点击通知或账户入口 | 打开对应 Popover、页面或退出确认；框架维护关闭与焦点返回 | 不破坏当前页面筛选、滚动与未保存数据 |
| S-06 | 权限或网络异常 | 路由加载后发现无权限、网络失败、会话过期 | 内容区显示对应状态；必要时触发一次全局提示与恢复入口 | 用户知道原因、下一步与数据是否保留 |

### 1.3 范围与非目标

**本期包含**：左侧导航 + 顶部栏 + 主内容区布局、静态分组标题、可点击一级菜单、Router Outlet、侧栏收起与响应式行为、全局通知和账户入口、Toast / Dialog / Drawer 容器、Loading / Empty / Error / Forbidden 状态、Mock 会话与导航数据、框架/业务 

**本期不包含**：尚未完成的用户列表、代理列表业务开发；对既有模块业务规则的重写；通知中心真实消息数据；服务端鉴权实现。迁移仅改变公共框架归属和页面路由，不改变已完成模块的 Mock 业务语义。

---

## 2. 信息架构与页面整体结构

### 2.1 图片对齐的页面骨架

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│ Sidebar（固定左侧） │ TopBar（固定顶部，位于主内容列） │
│ 用户管理〔灰色标题〕├────────────────────────────────────────────────────────┤
│ 用户列表 │ MainContent / Router Outlet │
│ 用户统计 │ │
│ 团队列表 │ 由当前一级菜单路由注入业务页面。 │
│ 企业列表 │ │
│ 成员列表 │ │
│ 订单管理〔灰色标题〕│ │
│ 订单列表 │ │
│ 套餐订单 │ │
│ 财务管理〔灰色标题〕│ │
│ 发票管理 │ │
│ 资源管理〔灰色标题〕│ │
│ 环境管理（默认） │ │
│ 代理列表 │ │
│ 数据埋点〔灰色标题〕│ │
│ 数据概览 │ │
│ 口径治理 │ │
│ ├ 事件管理 │ │
│ └ 指标管理〔阶段〕│ │
│ 联调验证 │ │
│ 质量监控 │ │
│ 明细排查 │ │
│ 数据分析 │ │
│ 资产沉淀〔阶段〕 │ │
│ 决策复盘〔阶段〕 │ │
│ 系统设置（底部） │ │
└───────────────────────────────────────────────────────────────────────────────┘
```

除登录页与原型导航页外，所有后台页面均复用此 App Shell。主内容区不是业务“空状态”：在框架层，它是路由内容插槽；只有目标路由已成功加载且返回零条可展示数据时，才由目标页面显示业务 Empty。

### 2.1.1 导航分组与一级菜单路由映射

系统框架左侧导航由 navItems 数据驱动渲染。`type=sectionLabel` 仅渲染灰色分组标题；`type=menuItem` 是直接进入路由的一级菜单；`type=menuGroup` 是可展开的一级菜单；`type=subMenuItem` 是其二级叶子菜单。以下顺序为系统唯一菜单顺序。

| 类型/分组 | 路由 ID | 菜单名 | 原型文件（当前交付） | 说明 |
|---|---|---|---|---|
| sectionLabel | — | 工作台 | — | 灰色、不可点击 |
| 工作台 / menuItem | home | 工作台 | `Prototype/modules/home.js` | 无 hash 时的默认内容 |
| sectionLabel | — | 用户管理 | — | 灰色、不可点击 |
| 用户管理 / menuItem | user-list | 用户列表 | 规划态 | 暂无业务模块 |
| 用户管理 / menuItem | user-statistics | 用户统计 | `Prototype/modules/user-statistics.js` | — |
| 用户管理 / menuItem | team-list | 团队列表 | `Prototype/modules/team-list.js` | — |
| 用户管理 / menuItem | enterprise-list | 企业列表 | `Prototype/modules/enterprise-list.js` | — |
| 用户管理 / menuItem | member-list | 成员列表 | `Prototype/modules/member-list.js` | — |
| sectionLabel | — | 订单管理 | — | 灰色、不可点击 |
| 订单管理 / menuItem | order-list | 订单列表 | `Prototype/modules/order-list.js` | — |
| 订单管理 / menuItem | package-order | 套餐订单 | `Prototype/modules/package-order.js` | — |
| sectionLabel | — | 财务管理 | — | 灰色、不可点击 |
| 财务管理 / menuItem | invoice-management | 发票管理 | `Prototype/modules/invoice-management.js` | 申请审核、票据、红冲与配置工作台 |
| sectionLabel | — | 资源管理 | — | 灰色、不可点击 |
| 资源管理 / menuItem | environment-management | 环境管理 | `Prototype/modules/environment-management.js` | — |
| 资源管理 / menuItem | proxy-list | 代理列表 | 规划态 | 暂无业务模块 |
| sectionLabel | — | 数据埋点 | — | 灰色、不可点击；位于资源管理之后 |
| 数据埋点 / menuItem | tracking-overview | 数据概览 | `Prototype/modules/tracking-overview.js` | 对应“概览”，直接进入数据概览 |
| 数据埋点 / menuGroup | tracking-governance | 口径治理 | — | 可展开一级菜单，无独立业务页 |
| 口径治理 / subMenuItem | tracking-events | 事件管理 | `Prototype/modules/tracking-events.js` | 事件、属性与版本管理 |
| 口径治理 / subMenuItem | tracking-metrics | 指标管理 | `Prototype/modules/tracking-metrics.js` | 指标口径与版本治理 |
| 数据埋点 / menuItem | tracking-debug | 联调验证 | `Prototype/modules/tracking-debug.js` | 直接进入联调验证 |
| 数据埋点 / menuItem | tracking-quality | 质量监控 | `Prototype/modules/tracking-quality.js` | 直接进入质量监控 |
| 数据埋点 / menuItem | tracking-detail | 明细排查 | `Prototype/modules/tracking-detail.js` | 直接进入明细排查 |
| 数据埋点 / menuItem | tracking-analysis | 数据分析 | `Prototype/modules/tracking-analysis.js` | 直接进入数据分析 |
| 数据埋点 / menuItem | tracking-dashboards | 资产沉淀 | `Prototype/modules/tracking-dashboards.js` | 进入资产沉淀 |
| 数据埋点 / menuItem | tracking-insights | 决策复盘 | `Prototype/modules/tracking-insights.js` | 进入决策复盘 |

> 约定：灰色分组标题不进入 Tab 顺序，不绑定 click/keydown，不显示 Chevron。`口径治理`显示 Chevron 并维护 expanded 状态；点击一级菜单行仅展开/收起，事件管理和指标管理负责路由跳转。直接型一级菜单点击即跳转。权限过滤后二级菜单为空时隐藏口径治理；数据埋点全部一级菜单为空时连同灰色标题一起隐藏。

> **统一命名规则：** 数据埋点一级模块必须且只能命名为“数据概览、口径治理、联调验证、质量监控、明细排查、数据分析、资产沉淀、决策复盘”；口径治理二级模块必须且只能命名为“事件管理、指标管理”。菜单名、页面标题、PRD 文件名和 HTML 文件名使用同一名称，不再使用另一套工作台名称。口径治理因无独立页面，不建立同名 PRD 和 HTML。

### 2.1.2 内容模块与路由生命周期

- 唯一路由格式为 `系统框架.html#route-id`；直接打开旧业务 HTML 时，兼容入口必须透传原查询参数并使用 `location.replace` 转入对应 hash，避免浏览器后退再次经过跳转页。
- 无 hash、空 hash 或未知 hash 默认进入 `#home` 工作台；口径治理组路由规范化为首个有权二级页面。
- 业务模块只注册内容区 DOM、内容区业务操作、业务浮层、局部样式和业务脚本。框架按当前路由只挂载一个模块；不使用 iframe，不同时挂载多个业务模块，不允许模块维护自己的公共菜单。
- 切换路由前保存当前模块筛选控件、当前 Tab、分页与滚动位置；浏览器前进或后退返回模块时恢复到仍然有效的位置。模块状态使用 `sessionStorage`，侧栏折叠与菜单组展开态使用 `localStorage`。
- App Shell 不自动创建“页面工具”区块，也不得把开关移入工具栏；历史内容模块根级 `.app-module-toolbar` 统一不展示。开关恢复为页面右侧悬浮胶囊按钮，支持拖拽调整位置、视口安全区限制与位置持久化；拖拽完成不得触发
- App Shell 与 Router Outlet 均锁定在视口高度内，只有主内容区承担纵向滚动；浮标固定于视口，不随主内容滚动离开可视区，也不得与 TopBar 的全局操作混用。

TopBar 高 56px（h-14），固定于系统顶部并横跨全宽，不使用底部描边；阴影只允许向下显示，顶部及左右侧阴影必须裁掉。响应式内边距统一为 `px-4 md:px-6`，并声明 `shrink-0` 与稳定层级以保证滚动与布局不位移。业务页面若提供固定底部操作栏，应使用方向相反的向上阴影，并为正文预留操作栏高度。

Sidebar 位于 TopBar 下方。桌面端收起/展开按钮固定在侧栏右边缘垂直居中，尺寸为 12×50px，默认隐藏；鼠标移入侧栏或键盘焦点进入侧栏时显示。按钮背景默认使用 `#E5E6ED`，hover 使用 `#ACB0BA`，按钮内箭头为白色实心箭头。完整态点击后侧栏收为 68px 并只显示功能图标；图标态点击后恢复 220px。折叠状态继续使用 `localStorage` 持久化；移动端使用抽屉菜单，不显示该桌面折叠按钮。

### 2.2 组件树

```text
AppShell
├─ AppBootstrapGate
│ ├─ AppLoadingScreen
│ └─ AppFatalErrorScreen
├─ Sidebar
│ ├─ PrimaryNavigation
│ │ ├─ SectionLabel（灰色、静态、不可聚焦）
│ │ ├─ PrimaryMenuItem（可点击、可聚焦、绑定路由）
│ │ └─ PrimaryMenuGroup（可展开、无业务路由）
│ │ └─ SecondaryMenuItem（可点击、绑定路由）
│ ├─ SidebarCollapseToggle
```
