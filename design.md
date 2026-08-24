# design.md — 视觉设计规范（单一事实来源）

> 本文件是项目视觉规范的**单一事实来源**，提取自《设计系统.html》。所有页面的颜色、字号、圆角、间距、组件外观**必须**引用本文件，不得自造。视觉如有调整，只改本文件。
> 配套文件：`claude.md`（工程与行为约束）、各模块 `PRD.md`（页面内容与交互）。

---

## 一、颜色

### 1.1 主色

| 角色 | 色值 | 用途 |
|------|------|------|
| primary | `#0066FF` | 主操作、选中、链接、品牌强调 |
| primary-hover | `#0052CC` | 主按钮 hover |
| primary-active | `#0047B3` | 主按钮 active |
| primary-bg | `#E6F0FF` | 主色浅底（选中背景、标签底） |

### 1.2 中性色（文字与线）

| 角色 | 色值 | 用途 |
|------|------|------|
| ink-title | `#1A1D24` | 标题文字 |
| ink-body | `#3A3F4A` | 正文 |
| ink-sub | `#6E7685` | 次要/辅助文字 |
| ink-muted | `#9DA2AC` | 占位/禁用文字 |
| line | `#DFE1E5` | 主分割线/边框 |
| line-light | `#E8EAED` | 浅分割线 |
| line-lighter | `#F0F1F3` | 更浅（表头底等） |
| bg-page | `#F7F8FA` | 页面底色 |
| bg-card | `#FFFFFF` | 卡片底色 |
| bg-hover | `#F3F4F6` | 行/项 hover 底色 |

### 1.3 语义色

| 角色 | 主色 | 浅底 | 用途 |
|------|------|------|------|
| success | `#0FC060` | `#E7F9F0` | 成功、进行中、完成正向 |
| warning | `#E7772D` | `#FDF2E9` | 警告、临期、超时提示 |
| danger | `#D9001B` | `#FFE8EB` | 错误、危险、异常、删除 |
| info | `#0091D5` | `#E4F4FB` | 信息、中性提示 |

### 1.4 语义色使用铁律

- 主操作/选中/链接 → **primary**
- 进行中/完成正向 → **success**
- 临期/超时/警告 → **warning**
- 异常/删除/错误 → **danger**
- 中性信息提示 → **info**
- 状态 Badge 一律"主色字/描边 + 对应浅底"

---

## 二、字体

### 2.1 字体族

| 用途 | 字体 |
|------|------|
| UI 文本（sans） | `-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif` |
| 数字/编号/金额/代码（mono） | `'JetBrains Mono', monospace` |

> 全局实现：在 `body`（或应用全局容器）应用上述 sans 字体栈，并同时设置 `-webkit-font-smoothing: antialiased;` 与 `-moz-osx-font-smoothing: grayscale;`。表单控件继承全局字体；数字、编号、金额、代码与时间戳仍由 mono 规则覆盖。
>
> 数字、订单号、金额、编码、时间戳等**必须**用 mono 字体，增强数据感与对齐。
> JetBrains Mono 通过 CDN 引入：`https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap`

### 2.2 字号层级（B 端高信息密度）

| 层级 | 字号 / 字重 | 用途 |
|------|-------------|------|
| 主标题 | 20–30px / 700 | 弹窗、抽屉或详情内容内部主标题；不用于 App Shell 路由业务页面标题 |
| 区块标题 | 16–19px / 600 | 卡片/区块标题 |
| 正文（主） | 13px / 400–500 | 表格、正文、表单 |
| 正文（次） | 12px / 400 | 密集信息 |
| 辅助 | 11px / 400 | 标签、次要说明 |

### 2.3 界面语言规范

云登后台管理系统的用户界面以简体中文为唯一主展示语言。允许展示的区块标题、卡片标题、字段标签、表头、按钮、状态名称、辅助说明和空/错状态文案必须使用准确、简洁的中文；App Shell 路由业务页面仍遵守 §5.0，不展示页面标题和页面副标题。

- **禁止装饰性英文标题**：不得使用 `DATA GOVERNANCE CONSOLE`、`DELIVERY MAP` 等英文眉题、副标题或氛围文案；此类内容没有独立业务信息时直接删除，不需要中文占位替代。
- **禁止中英双标题或字段翻译**：不得展示“中文标题 / English Title”“负责人（Owner）”“数据结构（Schema）”等并列翻译；统一保留中文名称。
- **英文缩写须中文化**：英文缩写直接充当指标或字段名称时，应改为中文业务名称，例如 `DAU` 显示为“日活跃用户”、`GMV` 显示为“成交金额”、`MTTR` 显示为“平均恢复时长”。
- **允许保留必要技术值**：事件英文名、属性标识、接口参数、事件/会话/请求/链路标识、代码、文件格式、客户端名称、版本号和技术枚举属于数据本身，可按原值展示，并使用等宽字体区分于界面文案。
- **避免重复解释**：技术值已有中文字段标签时，不再额外展示英文标签翻译；需要解释时使用中文帮助文本或 Tooltip。

新增或改版页面必须在视觉验收前执行用户可见文案检查；发现纯英文标题、装饰性英文或中英并列字段时视为不符合设计规范。

---

## 三、圆角与间距

### 3.1 圆角

| 值 | 用途 |
|----|------|
| **4px** | 默认（按钮、输入框、标签、Badge 等小元素） |
| 8px | 卡片、弹窗、模态、大容器 |

> 注：6px 保留可用，用于内嵌小组件（如 KPI 统计小卡），不作为主要层级。

### 3.2 间距

- 基数 **6px**；
- 常用梯度：`4 / 6 / 8 / 10 / 12 / 16 / 20 / 32px`；
- 就近取梯度值，不用非梯度的随意像素。

---

## 四、阴影层次

| 层级 | 用途 | 参考 |
|------|------|------|
| 无/极浅 | 卡片默认（以边框区分为主） | `border: 1px solid line` |
| 轻 | hover 卡片、下拉 | `0 2px 8px rgba(0,0,0,.06)` |
| 中 | 弹窗、抽屉、悬浮层 | `0 6px 24px rgba(0,0,0,.12)` |

> B 端以边框和底色区分层级为主，阴影克制使用，避免过重。

---

## 五、组件外观标准

同类组件全站外观必须一致。以下为视觉标准（行为交互见 `claude.md`）。

### 5.0 页面标准布局

> **核心原则**：后台列表/管理页面不展示面包屑、页面标题或页面副标题，业务内容直接从一级 Tab、状态切换、筛选条件或数据内容开始。一级 Tab 下方的内容区块不得重复展示与当前 Tab 同名的标题和副标题。

**标准结构**：

```
┌─ 业务模块（左右各 16px）─────────────────────┐
│  ┌─ 筛选区块（100% 宽、无描边）──────────────┐ │
│  │  [一级 Tab]                               │ │
│  │  ─────────────────────────────── 分割线   │ │
│  │  filter-flow（300px 控件，字段内 gap: 0px）│ │
│  │  …… [最后一个条件] [查询] [重置]           │ │
│  └──────────────────────────────────────────┘ │
│  ┌─ 数据区块（100% 宽、无描边）──────────────┐ │
│  │  [语义列表标题] [总数]                       │ │
│  │  [状态 Tab]                  [列表上下文操作]│ │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │ │
│  │  │ KPI │ │ KPI │ │ KPI │ │ KPI │ 可选   │ │
│  │  └─────┘ └─────┘ └─────┘ └─────┘        │ │
│  │  data-table                               │ │
│  │  分页器（表格右下方）                       │ │
│  └──────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

**布局规则**：

| 区域 | 规则 |
|------|------|
| 业务模块 | `width:100%; max-width:none; padding:16px`；不得通过固定最大宽度居中，内容左右边缘与主内容区各保持 16px |
| 内容区块 | `width:100%; max-width:none; margin:0; bg-white rounded-lg p-5 md:p-6 border-0` |
| 多内容区块 | 纵向堆叠，区块间距 16px；每个区块均保持无外描边 |
| 一级 Tab | 作为筛选区块的首个业务导航，Tab 自身不附加装饰性图标；Tab 与筛选条件之间使用 `line-light` 分割线 |
| Tab 下内容 | 不展示当前 Tab 的重复标题或副标题；筛选条件位于 Tab 分割线下方 |
| 数据区标题 | 仅在需要区分独立数据容器时展示语义列表标题，如“申请列表”“票据列表”；不得使用“数据列表”等泛化占位名，也不得重复当前一级 Tab 名称 |
| 列表工具栏 | 标题行左侧为语义列表标题，当前结果总数紧邻标题右侧（间距 8px）；下一行左侧为状态 Tab，右侧放刷新、导出等仅作用于当前列表的操作；分割线位于状态 Tab 上方。没有状态 Tab 时，分割线直接位于标题统计行与指标卡或表格之间 |
| 数据指标卡 | 有则放在筛选区之后、表格上方（`mb-4`），无则不显示 |
| 指标卡样式 | `grid grid-cols-2 lg:grid-cols-4 gap-3`，每卡 `p-3 rounded-md bg-bg-page`；默认可使用 `border border-line`，列表汇总型指标使用 `.is-borderless` 去掉外描边，单个页面内不得混用两种样式 |
| 状态信息归属 | 状态摘要必须归属于当前 Tab 的查询结果或当前业务对象；对象级多维状态放在列表行或详情标题区，不得跨无关主 Tab 固定展示为全局状态轨；仅真实线性流程使用连接线或步骤条 |
| 筛选字段 | 使用可换行的 `filter-flow` 布局；控件基准宽度 300px，字段名称与组件间距 0px，单行最多 4 项（见 §5.4） |
| 查询/重置 | 作为末尾操作组紧跟最后一个查询条件，不另起独立按钮行；容器不足时随筛选项整体换行 |

**页面标题处理**：
- ❌ 禁止在业务内容区展示面包屑、页面 `<h1>`、页面副标题或装饰性眉题。
- ❌ 禁止在一级 Tab 内容区再次展示“申请管理”“票据管理”“数据列表”等重复标题及其说明副标题。
- ✅ 页面名称由 App Shell 路由、浏览器文档标题和业务模块 `aria-label` 提供语义，不新增可见标题占位。
- ✅ 一级 Tab 位于筛选区块首行；筛选相关操作跟随查询条件，列表相关操作放在列表工具栏右侧；无一级 Tab 时，使用无标题的右对齐操作行。
- 同一业务命令在同一视图只保留一个入口。仅当动作在所有主 Tab 下具有相同数据范围、权限和结果语义时，才可作为模块级常驻操作；依赖当前查询或业务对象的导出、新增等动作应放在当前 Tab 工具区，并用“导出查询结果”“导出票据清单”等文案明确作用域。

**标准 HTML 结构参考**：

```html
<main class="app-business-module w-full max-w-none p-4" aria-label="订单管理">
  <section class="w-full max-w-none bg-white rounded-lg border-0 p-5 md:p-6 mb-4">
    <!-- 一级 Tab 位于筛选区块内，不附加装饰性图标 -->
    <div class="primary-tabs border-b border-line-light" role="tablist">...</div>
    <div class="filter-flow">
      <div class="filter-item">...</div>
      ...
      <div class="filter-actions">
        <button class="btn btn-primary btn-sm">查询</button>
        <button class="btn btn-default btn-sm">重置</button>
      </div>
    </div>

  </section>

  <section class="w-full max-w-none bg-white rounded-lg border-0 p-5 md:p-6">
    <div class="flex items-center justify-start gap-2 mb-3">
      <h2 class="text-[16px] font-semibold text-ink-title">申请列表</h2>
      <span class="text-[12px] text-ink-muted">共 N 条</span>
    </div>
    <div class="flex items-center justify-between gap-3 flex-wrap mb-4 border-t border-line-light pt-3">
      <div class="flex items-center gap-1 flex-wrap" id="statusTabs">
        <button class="filter-tab active">全部</button>...
      </div>
      <div class="flex items-center gap-2">...</div>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">...</div>
    <div class="overflow-x-auto"><table class="data-table">...</table></div>
    <div class="pagination" id="pagination">
      <div class="pg-nav">...</div>
      <label class="pg-select-wrap">
        <select class="pg-select" aria-label="每页条数">...</select>
      </label>
      <div class="pg-jump">
        跳至 <input class="pg-jump-input" value="1" aria-label="跳转页码"> 页
        <span class="pg-stats">共 N 条记录　第 a/b 页</span>
      </div>
    </div>
  </section>
</main>
```

### 5.1 按钮

| 类型 | 外观 |
|------|------|
| 主按钮 | primary 实底 + 白字，圆角 4px，高度 32px（默认）/28px（小） |
| 次按钮 | 白底 + line 描边 + ink-body 字 |
| 危险按钮 | danger 实底/描边 |
| 禁用 | 底色/文字置灰（ink-muted），不可点 |
| hover/active | 主按钮用 primary-hover / primary-active |

**列表内状态 Tab**：状态筛选使用紧凑分段控件。未选中项为白底、`ink-sub` 字色，相邻项以 `line` 分隔；选中项必须同时使用完整四边 `1px solid primary` 描边、`primary` 字色、`#E6F0FF` 背景和 600 字重。不得只使用底线表示选中状态；相邻边线通过 `margin-left:-1px` 折叠，选中项提高层级，确保四边均清晰且总高度不抖动。

### 5.2 表格

| 区域 | 样式 |
|------|------|
| 表格整体 | `width:100%; border-collapse:collapse; font-size:13px` |
| 表格外层 | 仅负责 `overflow-x:auto`，不增加外描边、圆角或额外卡片包裹 |
| 表头 | `line-lighter` 底色（`#F0F1F3`）+ `ink-sub` 字色（`#6E7685`），字重 600，字号 12px，padding `9px 12px`，下边框 `1px solid line`，不换行 |
| 可排序表头 | 字段名与排序图标水平排列，间距 4px；图标固定 `10×14px`，由上下两个 `10×6px` 实心三角组成，中间间距 2px。未排序时字段名使用 `ink-sub`、上下三角使用 `ink-muted`；升序时字段名与上三角使用 `primary`，降序时字段名与下三角使用 `primary`，另一方向保持 `ink-muted`。使用原生按钮，默认业务顺序可直接显示为激活降序；点击同一字段在升序/降序间切换，点击新字段先进入降序。所属 `th` 必须同步 `aria-sort="none/ascending/descending"`，且字段名与激活方向必须同步高亮。 |
| 数据行 | 字号 13px，`ink-body` 字色，padding `9px 12px`，下边框 `1px solid line-lighter`，行高约 44–52px |
| hover 行 | `bg-hover`（`#F3F4F6`）高亮底色；斑马纹可选 |
| 对齐 | **所有列左对齐**（含数字列）；列头与数据水平 padding 一致，保持上下对齐 |
| 数字列 | 使用 mono 字体（金额、数量、订单号等），与其他列保持左对齐 |
| 响应式 | 表格外层容器 `overflow-x: auto`，窄屏横向滚动 |
| 操作列 | 操作链接之间 12px 水平间距（如"编辑 删除"），危险操作（删除）用 danger 色 |

**选择列间距**：列表存在复选框或单选框时，选择控件独占第一列；选择列与右侧第一个业务字段之间保持 `20px` 的左侧内边距。表头选择单元格与数据行选择单元格必须使用同一列宽和同一间距，申请、票据、红冲、更正、配置等所有发票管理列表统一执行；无选择控件的列表不额外增加首列留白。

**多订单字段**：一个业务申请关联多个订单时，订单号列保留首个订单号，右侧以 `+N` 角标表示其余订单数量；角标使用可聚焦按钮，鼠标移入或键盘聚焦时通过固定定位气泡展示全部订单号。气泡不得被表格横向滚动容器裁切，失焦、移出或按 `Escape` 后关闭；单订单时不显示角标。

> **实现要求**：所有原型页面中的数据列表必须使用 `.data-table` 类统一以上样式。可以追加业务语义类，但不得以 `.xxx-table` 自建另一套表头、行高、间距、hover 或对齐规则；新页面直接复用框架模板内置样式。

> **票据列表字段规则**：票据状态、文件、交付状态、收件人、开具时间分别使用独立列，不得通过“票据 / 文件”或“收件人 / 开具时间”复合表头和单元格合并展示。

> **红冲与配置工作台规则**：红冲任务（含更正申请）和开票配置沿用“筛选/导航区块 + 数据列表区块”的双区结构。红冲任务与更正申请通过筛选项“数据范围”后的连续描边分段控件切换，不额外设置带下分割线的二级导航；红冲任务列表的“状态”“负责人”使用独立列。红冲任务列表使用“红冲任务列表 / 更正申请列表”及紧邻总数；红冲任务的“刷新、导出、发起财务纠错”作为当前列表上下文操作，和“红冲任务列表 + 共 N 条”处于同一标题行并在区块右侧对齐，标题行下保留唯一分割线；更正申请列表的“刷新、导出”也与“更正申请列表 + 共 N 条”处于同一标题行并在区块右侧对齐，按钮文案统一为“导出”；红冲指标卡采用 `.is-borderless` 汇总样式，指标卡与标题下分割线、下方表格之间的垂直间距统一为 16px，使用紧凑分割线变体时不得叠加额外顶部留白。开票配置的受控发布提示、五个配置分类 Tab（开票主体、发票内容、SKU 映射、第三方服务商、通知与 SLA）和当前分类列表必须放在同一个顶部业务区块内；区块内部左侧为分类导航、右侧为数据列表，桌面端左侧导航固定宽度 `300px`，左右内容间距 `0px`，交界处使用贯穿区块高度的 `1px line-light` 竖向分割线，右侧列表标题使用“分类名称 + 列表”及紧邻总数，“新增配置、发布变更”与标题处于同一行并在区块内居右，标题下保留唯一分割线。该顶部业务区块底部与页面内容安全边距保持 `16px`，整体无外描边；窄屏时导航区与列表区上下堆叠，以横向分割线替代竖线，操作组允许换行但保持右对齐，不产生页面级横向滚动。

### 5.3 状态 Badge

- 圆角标签（4px），主色字/描边 + 对应浅底；
- 进行中 success / 临期超时 warning / 异常 danger / 终态 ink-muted 灰。
- 表格中的参数型状态在明确要求弱化视觉权重时使用纯文字状态：不设置描边、背景、圆角或额外内边距，仅保留 12px 语义色文字与 500 字重；同一列统一使用 Badge 或纯文字，不得混用。

### 5.4 筛选区

> 筛选区统一采用“右对齐标签 + 300px 定宽控件 + 流式换行”的响应式布局。查询控件基准宽度固定为 300px，字段名称与组件之间不留水平间距；单行最多展示 4 个查询条件，可用宽度不足时按 4→3→2→1 项自然换行，不产生页面级横向滚动。

**容器 `.filter-flow`**：`display:flex; flex-wrap:wrap; align-items:center; column-gap:16px; row-gap:12px; max-width:1776px;`。横向间距 16px 用于区分不同查询维度；换行后的上下两行保持 12px 间距。最大宽度可容纳 4 个完整筛选项及末尾查询操作组，但不能容纳第 5 个筛选项。

**筛选项 `.filter-item`**：`flex:0 0 388px; width:388px; display:flex; flex-direction:row; align-items:center; gap:0;`。388px 由 88px 标签和 300px 控件组成，标签与组件直接相邻，不增加 margin 或 padding 形成额外间距。

**标签 `.filter-label`**：标签位于控件左侧并右对齐，`width:88px; flex:none; text-align:right; font-size:13px; line-height:18px; color:#3A3F4A;`；通过 `::after` 统一追加中文冒号 `：`。控件起始边缘在同一筛选项内左对齐。

**控件 `.control`**：筛选区内使用 `width:300px; max-width:100%;`。非筛选表单继续按对应组件规范确定宽度。

- 内部 `input` / `select`：`width:100%; height:32px; font-size:14px; padding:0 8px; border-radius:4px; border:1px solid #DFE1E5; color:#3A3F4A; outline:none; font-family:inherit; background:#fff;`
- placeholder 样式：`color:#9DA2AC; font-size:14px;`
- focus 态：`border-color:#0066FF; box-shadow:0 0 0 2px rgba(0,102,255,.12);`
- select 下拉箭头使用内联 SVG background-image 替代浏览器默认样式，`padding-right:24px;`

**日期范围 `.date-range`**：筛选区使用一个 300px 组合输入组件，`display:flex; align-items:center; gap:4px; position:relative;`，内部依次为日历图标、开始日期、分隔符和结束日期；字段名与该组件间距仍为 0px。

- 分隔符 `.date-sep`：`font-size:14px; color:#9DA2AC; flex-shrink:0; margin:0 2px;`
- 日期输入框使用只读 `type="text"` + `placeholder` 展示提示文字，点击组件任意输入区域展开自定义日期范围下拉框，不再依赖浏览器原生单日期面板。
- 桌面端日期下拉框宽度 640px，连续展示左右两个月；月标题居中，外侧提供上月/下月图标按钮，星期标题和日期网格均为 7 列。窄屏下拉框宽度为 `calc(100vw - 32px)`，两个月改为纵向排列，不产生页面级横向滚动。
- 下拉框根据触发组件与视口的可用空间自动向左或向右对齐；无法完整容纳时以视口左右 16px 安全边距为边界，禁止被表格或页面边缘裁切。
- 第一次点击日期设为开始日期，第二次点击设为结束日期；如果第二次日期早于开始日期则自动交换。区间内部使用 `#E6F0FF` 背景，起止日期使用 `primary` 实底和白字；同一天范围同时作为起止日期。
- 下拉框底部左侧显示已选范围或下一步提示，右侧提供“清空”“确定”；点击外部或按 `Escape` 收起，月切换、清空和确定不得触发列表查询。确定后仍由筛选区“查询”按钮统一提交全部筛选条件。
- 空状态文字色 `#9DA2AC`，有值后切换为 `#3A3F4A`。

**查询/重置按钮**使用 `.filter-actions` 作为一个不可拆分的末尾操作组，紧跟最后一个查询条件右侧；按钮间距 12px，高度 32px。操作组不得通过绝对定位或空标签占位实现，容器不足时应整体换行。

**筛选字段顺序建议**：搜索框放第一位，日期范围合并为一个字段（`创建时间：[开始时间 - 结束时间]`），其余按业务优先级排列。单行最多 4 个查询条件，超过 4 个从下一行继续；查询/重置始终位于全部条件之后。

**响应式降级**：当筛选区可用宽度不足 388px 时，`.filter-item` 切换为 `width:100%`，仍保持标签在左、控件在右；控件使用剩余宽度并允许小于 300px，操作组保持左对齐并整组换行。其余宽度保持 300px 控件基准宽度，由 Flex 容器依据实际可用宽度决定每行展示数量。

**搜索框清空按钮**：搜索输入框在有内容时，右侧显示清空按钮 `✕`（位于搜索图标对面），点击后清空输入内容并保持焦点；无内容时按钮隐藏。清空按钮样式：`position:absolute;right:8px;top:50%;transform:translateY(-50%);width:16px;height:16px;font-size:12px;color:#9DA2AC;cursor:pointer`，hover 时颜色变深 `#6E7685`。

### 5.5 分页

> 所有分页数据列表必须严格复用设计系统.html 中的完整分页器 DOM、class 和页码逻辑，不得输出仅含总数、上一页/下一页或条数选择的简化版分页器。

**容器**：`display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:16px;font-size:12px`。

**位置**：分页器放在数据表格所在无描边内容区块（`.bg-white.rounded-lg.border-0`）内部，位于表格（`.overflow-x-auto`）的右下方，通过 `pt-5`（20px）与上方表格区域保持间距。分页器**不是**独立区块，也不得增加外描边，应与表格同属一个内容区块。

**布局（三区，居右）**：

| 位置 | 内容 | 说明 |
|------|------|------|
| 左 | 页码导航 `#pg-nav` | `display:flex;gap:4px` — `‹` + 页码按钮 + 省略号 `…` + `›` |
| 中 | 条/页选择 | `.pg-select-wrap` 包裹 `<select>`，`::after` 自定义下拉箭头 |
| 右 | 跳页 + 统计 | 跳至 `[input(value=1)]` 页 + `共 N 条记录　第 a/b 页` |

**页码按钮 `.pg-btn`**：`min-width:30px;height:30px;padding:0 8px;font:500 12px inherit;color:#3A3F4A;background:#fff;border:1px solid #DFE1E5;border-radius:4px;cursor:pointer;transition:all .15s;display:inline-flex;align-items:center;justify-content:center`
- hover（非当前页、非禁用）：`color:primary;border-color:primary`
- 当前页 `.pg-current`：`background:primary;border-color:primary;color:#fff`
- 禁用（首页 `‹` / 末页 `›`）：`color:#C7CAD1;background:#F7F8FA;cursor:not-allowed;border-color:#DFE1E5`

**省略号 `.pg-ellipsis`**：`min-width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;color:#9DA2AC;font-size:13px`

**条/页下拉 `.pg-select`**：`font:12px inherit;height:30px;padding:0 28px 0 8px;border-radius:4px;border:1px solid #DFE1E5;color:#3A3F4A;background:#fff;cursor:pointer;appearance:none;-webkit-appearance:none`
- 选项固定为 `10 / 20 / 50 条/页`，默认 `20 条/页`；不得另行添加与其他列表不一致的 `100 条/页`。
- `.pg-select-wrap`：`position:relative;display:inline-flex;align-items:center`
- `.pg-select-wrap::after`：`content:'▼';position:absolute;right:8px;font-size:8px;color:#9DA2AC;pointer-events:none`

**跳页输入框 `.pg-jump-input`**：`font:12px inherit;width:44px;height:30px;text-align:center;border-radius:4px;border:1px solid #DFE1E5;color:#3A3F4A;outline:none`
- focus：`border-color:primary;box-shadow:0 0 0 2px rgba(0,102,255,.12)`
- **默认值**：`value="1"`，输入框始终不为空；跳页成功后重置为 `1`（不清空）

**统计文字 `.pg-stats`**：`color:#9DA2AC;white-space:nowrap`

**页码逻辑**：≤7 页全显示；>7 页时始终显示首页和末页，当前页 ±1 范围显示，其余用 `…` 折叠。

**响应式**：桌面端三区整体居右；窄屏允许自然换行，小于 520px 时分页器改为纵向排列并左对齐。分页器自身不得造成页面级横向滚动。

### 5.6 弹窗 Modal

- 居中；遮罩 `rgba(0,0,0,.3)`；圆角 8px；宽度 **760px**（`max-width:92vw` 响应式）；
- 结构：标题栏（16px/600）+ 关闭 ×（20px，ink-muted，右上角）+ 内容区（padding 32px 24px）+ 底部操作区（border-top 分隔，按钮居右）；
- 表单字段：label 90px 右对齐（标签文字末尾带中文冒号 `：`）+ 控件 400px 宽 30px 高（`border-radius:4px;border:1px solid line`）；字段区块在弹窗内容区居中。

### 5.7 抽屉 Drawer

- 右侧滑出；用于详情展示；宽度 **800px**（`max-width:100%` 响应式）；
- 遮罩 `rgba(0,0,0,.3)`；阴影 `-4px 0 24px rgba(0,0,0,.1)`；入场动画 `ds-drawer-in .22s ease`；
- 结构：标题栏（16px/600 + 关闭 ×）+ 内容区（`overflow-y:auto`）+ 底部按钮。

**标准业务详情 Drawer（以订单详情为基准）**：

- 使用 `position:fixed;inset:0` 的本地遮罩，遮罩不留内边距；面板贴右、贴顶、满高，`width:800px;max-width:100%`，采用纵向 Flex 布局，不得改造成居中 Modal 或在面板外再套卡片。
- 标题栏固定高 `56px`、左右内边距 `24px`、白底；标题为 16px/600，关闭按钮为 `32×32px`，图标使用 Lucide `x`、18–20px、`ink-sub`。对象编号、主体、金额等信息已在正文详情字段展示时，标题栏只保留标题与关闭按钮，不重复展示摘要、副标题或元信息。
- 内容区使用 `flex:1;overflow-y:auto;padding:16px;background:bg-page`。详情分区为白底、8px 圆角、16px 内边距、无外描边，分区之间保持 16px 垂直间距；分区标题为 16px/600，标题下间距 16px。
- 信息项默认两列网格，列间距 24px、行间距 12px；每项标签列宽 96px、右对齐且追加中文冒号，值沿用正文色。金额、编号、账号、时间使用 mono 字体；小于 768px 时降为单列。
- 分区内明细表格使用横向滚动容器，继续保留表头底色和行分隔线；详情分区“无外描边”不影响表格自身边线。
- 可选底部操作栏固定高 `64px`，白底、`line-light` 上分隔线、左右内边距 `24px`，按钮组居右并保持 12px 间距；无业务操作时可省略底部栏。
- 打开后锁定背景滚动，将焦点移入面板并约束 Tab；支持关闭按钮、点击遮罩和 `Escape` 关闭，关闭后恢复触发控件焦点。

**发票申请详情抽屉**：复用上述标准业务详情 Drawer。标题栏下不重复展示主体、订单号或金额摘要；四维状态独立为一个白底状态区。状态区下方使用一个白底 Tab 内容区块，Tab 导航与当前内容随 Tab 切换；申请与受票字段按业务顺序使用两列网格，个人主体不展示开户银行、银行账号、企业地址、企业电话；金额与资格作为申请与受票 Tab 内的第二个详情分区。订单分摊表格在“订单号”右侧保留“订单类型”列，并使用“商品名称”列名；票据交付无数据时在表格体内显示“暂无数据”。订单分摊、票据明细等表格最小宽度 `1080px` 并在详情分区内横向滚动；审核、异常处置和关闭操作使用固定底部操作栏。

### 5.8 信息提示弹窗 Dialog

> 严格对齐设计系统.html 中的 Dialog 组件。用于信息提示、操作确认（如删除确认）等轻量场景，与 Modal（表单弹窗）区分。

**容器**：`position:fixed;inset:0;background:rgba(0,0,0,.3);z-index:1200;display:flex;align-items:center;justify-content:center`

**弹窗本体**：`width:600px;max-width:92vw;height:250px;background:#fff;border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,.12);display:flex;flex-direction:column;position:relative;animation:ds-modal-in .15s ease`

**结构**：

| 区域 | 样式 |
|------|------|
| 关闭 × | `position:absolute;top:14px;right:18px;font-size:20px;color:#9DA2AC;cursor:pointer;z-index:1`（纯文本 `×`，非 Lucide 图标） |
| 内容区 | `flex:1;display:flex;align-items:center;padding:0 24px` |
| ICO | `width:20px;height:20px;border-radius:50%;flex-shrink:0` 圆形图标，颜色随 Dialog 类型变化 |
| 标题 | `font-size:16px;font-weight:600;color:#1A1D24` |
| 副标题 | `font-size:14px;color:#6E7685;margin-top:6px` |
| 底部按钮区 | `padding:0 24px 20px;display:flex;justify-content:flex-end;gap:12px` |
| 取消按钮 | `font:500 13px inherit;padding:6px 20px;border-radius:4px;background:#fff;color:#3A3F4A;border:1px solid #DFE1E5;cursor:pointer` |
| 确定按钮 | `font:500 13px inherit;padding:6px 20px;border-radius:4px;border:1px solid transparent;cursor:pointer;background:primary;color:#fff` |

**6 种 Dialog 类型**：

| 类型 | ICO | 图标色 | 底色 | 用途 |
|------|-----|--------|------|------|
| info | `i` | `#0091D5` | `#E4F4FB` | 信息提示 |
| success | `✓` | `#0FC060` | `#E7F9F0` | 操作成功 |
| warning | `!` | `#E7772D` | `#FDF2E9` | 警告提示 |
| danger | `✕` | `#D9001B` | `#FFE8EB` | 错误提示（操作失败、系统异常等已发生的错误） |
| confirm | `?` | `#E7772D` | `#FDF2E9` | 操作确认（删除确认、标记异常等需用户二次确认的操作） |

> **删除确认**使用 `confirm` 类型（ICO `?`），因为本质是"确认是否执行"的询问，而非已发生的错误。确定按钮可使用 `danger` 红底强调破坏性操作。
| system | `ⓘ` | `#0091D5` | `#E4F4FB` | 系统通知 |

### 5.9 表单

- label + 控件；配置型表单标签默认不显示中文冒号；必填标识 `*`（danger 色）位于标签文字**左侧**（即 `* 字段名`）；
- 通用控件默认宽度 400px、高度 30px；配置型表单控件宽度 500px、高度 32px；圆角 4px；边框 1px solid line；
- 校验错误：控件描边转 danger + 下方 danger 字提示。

**配置型长表单（编辑浏览器等页面）**：

| 项目 | 规范 |
|---|---|
| 字段布局 | 一个字段占一行，不使用双栏字段栅格 |
| 标签列 | 桌面端宽 120px，右对齐；移动端移至控件上方并左对齐 |
| 控件区 | 标准宽 500px，最大宽度不超过可用空间 |
| 组合控件 | 同一字段内多个输入框、下拉框的总宽度为 500px；操作按钮、帮助提示不计入控件宽度 |
| 字段间距 | 垂直 16px；不得依赖会被全局规则覆盖的临时 margin 类 |
| 字段分隔 | 默认不使用字段行分割线，尤其是偏好设置等连续分段控件 |
| 区块开合 | 下拉面板或菜单参与文档流时，父区块必须自动增高/收回，后续字段不得重叠或被裁切 |

**字段语义图标**：安全项与风险项均使用 `16×16px`、`1.5px` 描边圆形图标；安全项为绿色描边 `✓`，风险项为红色描边 `!`。页面顶部图例必须复用字段旁同一套尺寸、线宽和颜色，必填项继续使用 danger 色 `*`。

**字段帮助入口**：文本帮助使用灰色文字与虚线下划线，hover/focus 是否变蓝由业务语义决定；低优先级问号使用 `18×18px` 低对比度灰色圆形图标。Popover 必须支持 hover 与键盘 focus，用户移入 Popover 后不得立即关闭；帮助中心链接使用 primary 蓝色。

**插件分组选择器**：触发器宽 500px；展开面板宽 500px、高 280px，左侧范围导航宽 200px，右侧为内容区；空集合显示“暂无数据”。面板在配置区块内展开并参与高度计算。全局插件快捷菜单宽 210px，菜单文字不换行；与分组面板互斥打开。

**字符计数器 `x/y`**（全局适用）：

| 控件类型 | 计数器位置 | 说明 |
|---------|-----------|------|
| 单行文本输入框 `<input>` | 控件内**右侧** | `x` 为当前已输入字符数，`y` 为最大字符数（`maxlength`），输入时实时更新 |
| 多行文本域 `<textarea>` | 控件外**右下侧** | 同上，位于文本域下方、右对齐 |

- 计数器样式：字号 12px，颜色 `ink-muted`（`#9DA2AC`），格式 `x/y`（如 `0/20`、`15/200`）；
- 单行输入框：计数器 `position:absolute` 定位在输入框内右侧，输入框 `padding-right` 预留 48px 空间，避免输入文字与计数器重叠；
- 多行文本域：计数器独立一行，`text-align:right`，宽度与文本域一致；
- 计数逻辑：以 `input.value.length` 为准，maxlength 由 `input` 属性直接提供或隐式声明。

**Toggle 开关**：

- 尺寸 40×22px，圆角 11px；圆钮 18px 白色；过渡 `.2s`；
- 关闭态：底色 `#C7CAD1`，圆钮居左（`left:2px`）；
- **开启态：底色 primary `#0066FF`**（非 success 绿），圆钮居右（`translateX(18px)`）。

### 5.10 卡片

- 通用数据卡片：`bg-card` + `line` 边框 + 圆角 8px + 内边距 16–20px；
- App Shell 路由承载卡片和配置页主要业务区块：使用 `width:100%; max-width:none; bg-card; border:0`、圆角与留白分层；业务内容区块不得使用外描边，内部标题/内容分隔可继续使用 `line-lighter`；
- 强调型配置命令区可使用浅主色背景与 `1px` 浅蓝描边，但同一页面只保留一个此类强调容器。

### 5.11 图标

- Lucide 图标；尺寸随文本（14–16px 常用）；颜色随语义。

### 5.12 空状态 / 加载态

- 空状态：图标 + 说明文案 +（可选）操作引导；
- 加载态：骨架屏或 loading 指示。

---

## 六、布局规范

### 6.1 后台（Web 管理系统）

经典三段布局：

```
顶部栏 TopBar（平台 Logo 与名称 / 移动导航 / 通知 / 账号；不显示功能模块名称，无描边、仅底部轻阴影）
├─ 侧边导航 Sidebar（220px，可折叠，当前页高亮；容器无描边）
│   ├─ 一级菜单 .menu-item.l1：左侧 Lucide 图标统一 16×16px，图标与文字间距 12px
│   └─ 二级菜单 .menu-item.l2：padding-left 64px（比一级文字右缩 6px，形成层级缩进）
└─ 主内容区 MainContent（flex-1，bg-page 背景，唯一纵向滚动容器，自适应宽度）
    ├─ Router Outlet 本身不重复添加内边距；业务模块使用 `width:100%; max-width:none; padding-inline:16px`（p-4），框架不自动插入“页面工具”区块，历史模块根级 `.app-module-toolbar` 统一不展示
    ├─ App Shell 内容承载卡片：width:100%; max-width:none; bg-white rounded-lg p-5 md:p-6，无描边；卡片内部所需分隔仍使用 line
    ├─ 单区块：卡片最小高度 = 内容区高度 − 16px（`min-h-full` + `flex-1` 撑满），内容超过时自适应增高，main 滚动
    ├─ 多区块（≥2）：卡片高度由内容决定，垂直堆叠，间距 16px（mb-4）
    └─ 无面包屑、页面标题和页面副标题；有一级 Tab 时直接以 Tab 作为业务内容起点，Tab 下不重复展示标题/副标题
```

**App Shell 导航栏细则**：

- 平台 Logo 与平台名称固定放置于全宽 TopBar 左侧，不在侧栏内重复展示；TopBar 不显示功能模块名称，阴影只向下投射，左侧不得出现阴影；
- 侧栏收起/展开按钮固定在侧栏右边缘垂直居中，尺寸为 12×50px，鼠标移入或键盘聚焦侧栏时显示；默认背景为 `#E5E6ED`，按钮 hover 背景为 `#ACB0BA`，按钮内使用白色实心方向箭头。完整态点击“收起”后侧栏切换为 68px 图标态，图标态点击“展开”后恢复 220px；
- 侧栏功能模块左侧 Lucide 图标统一为 16×16px；折叠按钮、二级菜单 Chevron、顶部栏与业务内容图标按各自组件规范执行；
- 侧栏所有可点击模块文字（一级菜单、唯一展开组及二级菜单）统一使用 13px，字距为 0；仅静态分组标题使用 11px 辅助字号；
- 根目录 `index.html` 是后台入口索引；每个业务 HTML 都内嵌同一套 App Shell（TopBar、Sidebar、全局通知、账号入口和菜单路由），业务内容只挂载在自身 Router Outlet 内；`Prototype/系统框架.html` 仅作为兼容跳转页，禁止页面分叉公共外壳行为；
- 已完成业务模块均以独立单文件 HTML 交付，系统框架外壳、业务内容、样式与脚本全部内嵌；根 `index.html` 为入口索引，业务 HTML 可直接打开，旧 `Prototype/系统框架.html` 仅保留兼容跳转；不依赖本地 JS/CSS 文件。
- 工作台是无 hash 或 `#home` 的默认内容；切换模块必须支持浏览器前进/后退，并在会话内恢复模块筛选值、当前 Tab、分页和有效滚动位置，侧栏折叠态使用本地持久化；
- 页面专属操作由业务模块放置在自身内容区内；TopBar 只保留全局操作，App Shell 不为业务模块自动生成页面工具栏，历史模块根级 `.app-module-toolbar` 统一隐藏，避免因业务模块差异造成公共框架分叉；
- TopBar 不使用底部描边，使用仅向下可见的轻阴影与正文分层，并裁掉顶部及左右阴影；保持固定时底部阴影不得被主内容裁切；
- 页面底部固定操作栏使用方向相反的向上阴影，正文底部需预留其高度，避免最后一项表单被遮挡；
- 本规则仅适用于后台 App Shell 的顶栏、侧栏与路由内容承载容器。表格、表单控件、弹窗与卡片内部信息分隔仍按各自组件规范使用 `line` 边框。

### 6.2 用户端（小程序，如需）

- 移动端竖屏基准宽 375px；页面中居中放"手机外框"容器展示；主色仍用本规范 token。

---

## 七、Tailwind 配置镜像（供实现直接引用）

> 以下为本规范的 Tailwind 映射，实现时内联到页面 `tailwind.config`。**本文件为准，此为镜像。**

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0066FF', hover: '#0052CC', active: '#0047B3', bg: '#E6F0FF' },
        ink:     { title: '#1A1D24', body: '#3A3F4A', sub: '#6E7685', muted: '#9DA2AC' },
        line:    { DEFAULT: '#DFE1E5', light: '#E8EAED', lighter: '#F0F1F3' },
        bg:      { page: '#F7F8FA', card: '#FFFFFF', hover: '#F3F4F6' },
        success: { DEFAULT: '#0FC060', bg: '#E7F9F0' },
        warning: { DEFAULT: '#E7772D', bg: '#FDF2E9' },
        danger:  { DEFAULT: '#D9001B', bg: '#FFE8EB' },
        info:    { DEFAULT: '#0091D5', bg: '#E4F4FB' },
      },
      borderRadius: { DEFAULT: '4px', md: '6px', lg: '8px' },
      fontFamily: {
        sans: ['-apple-system','BlinkMacSystemFont','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue','Helvetica','Arial','sans-serif'],
        mono: ['JetBrains Mono','monospace'],
      },
    }
  }
}
```

---

**说明**：本文件与《设计系统.html》保持一致。若设计系统更新，先更新《设计系统.html》，再同步本文件，确保单一事实来源。
