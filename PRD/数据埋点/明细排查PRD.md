# 明细排查 PRD

> 产品：云登后台管理系统  
> 模块：数据埋点 / 明细排查
> 需求类型：新建  
> 优先级：P1  
> 目标端：Web PC（设计基准 ≥1280px，最低支持 1024px）  
> 文档日期：2026-08-07  
> 状态：可直接用于 Vibecoding

## 0. 文档依据与执行约束

实现前依次读取《数据埋点PRD.md》、本 PRD、《云登指纹浏览器数据埋点.md》、`design.md`、`claude.md`。明细排查是受控的数据排查能力，不是用户画像或自由 SQL。任何模块权限均不能放宽禁采字段规则。

原型文件为 `Prototype/明细排查.html`，复用后台 App Shell、统一筛选布局、侧栏折叠和 Portal 标注系统。使用语义化 HTML、Tailwind CSS CDN、Lucide 和原生 JavaScript；Mock 中不得出现真实敏感值。

## 1. 问题陈述

数据概览、数据分析和看板只能发现聚合异常，事件管理只定义 Schema，联调验证只覆盖短期测试会话。当实名认证转化、代理首购、环境启动或数据质量指标异常时，产品、数据、研发和 QA 无法在后台核对已入库的历史事件样本，只能依赖临时 SQL 和线下文件，导致定位慢、权限不可控、口径不一致且难以审计。

## 2. 解决方案

新增“明细排查”可点击一级菜单及对应页面，以事件记录为入口，提供授权范围内的历史脱敏事件查询、详情检查、限定窗口行为序列和受审计异步导出。服务端先完成租户裁剪、字段权限和脱敏，前端只接收可展示值。

本页不建立永久用户画像，不支持真实身份搜索，不提供全量原始数据下载，不修改或重放生产事件。

## 3. 页面定位与成功指标

明细排查是数据埋点模块中的只读排查页面，承接数据概览、数据分析、质量监控和工单深链，输出事件详情、会话行为序列、Schema 跳转、调试复现入口及脱敏导出任务。

| 指标 | V1 目标 |
|---|---:|
| 常规查询 P95 | ≤3 秒 |
| 详情打开 P95 | ≤1 秒 |
| 异常定位平均耗时降低 | ≥50% |
| 导出任务成功率 | ≥99% |
| 越权读取 | 0 |
| 敏感原值泄露 | 0 |
| 查询与导出审计覆盖率 | 100% |

## 4. 用户故事

1. 作为产品经理，我想从异常指标下钻脱敏事件样本，以判断问题是否集中在特定版本或认证类型。
2. 作为数据分析师，我想按事件、时间、端、版本和属性查询，以验证聚合口径。
3. 作为研发，我想按 request_id 或 trace_id 定位链路，以排查上报和入库失败。
4. 作为 QA，我想查看 Schema 版本与质量校验结果，以确认事件是否符合定义。
5. 作为安全人员，我想确认敏感命中只展示规则而不展示原值。
6. 作为授权用户，我想查看同一会话前后事件，以还原有限时间窗口内的行为路径。
7. 作为授权用户，我想创建脱敏导出任务，以便离线核对样本。
8. 作为管理员，我想限制时间、条数、字段和下载次数，以控制数据暴露。
9. 作为审计人员，我想追踪查询、详情、复制、序列和导出操作。
10. 作为用户，我想在失败时保留筛选和旧结果，以便重试。
11. 作为用户，我想知道数据截止时间、时区和入库延迟，以避免误判。
12. 作为无权限用户，我想看到缺少的权限码，而不是空列表。

## 5. 信息架构

```text
明细排查
├─ 筛选区
│  ├─ 时间范围 / 事件 / 业务域 / 结果
│  ├─ 客户端 / 版本 / 认证类型 / 质量状态
│  └─ 高级标识：event_id / user_hash / session_id / request_id / trace_id
├─ 数据区
│  ├─ 数据截止时间 / 结果量 / 导出明细
│  ├─ 明细表格
│  └─ 分页
├─ 事件详情 Drawer
│  ├─ 公共属性 / 业务属性 / 上下文
│  ├─ Schema 与质量校验
│  └─ 查看行为序列 / 跳转事件管理 / 复制脱敏 JSON
├─ 行为序列 Dialog
└─ 导出任务 Dialog
```

路由：`/data-tracking/event-details`。支持深链参数 `eventName`、`eventId`、`requestId`、`traceId`、`qualityStatus`、`from`、`to`；参数必须服务端校验，URL 禁止携带敏感原值。

## 6. 筛选与查询规则

筛选控件遵循 `design.md`：400px 基准宽度、单行最多 4 项、操作组跟随最后条件、自适应换行。

| 字段 | 规则 |
|---|---|
| 时间范围 | 默认最近 24 小时；普通用户最长 7 天；大查询权限最长 30 天 |
| 事件 | 支持中文名/英文名；默认全部授权事件 |
| 业务域 | AUTH、PROXY、ENV、PAY、TEAM 等 |
| 结果 | success、failure、cancel、timeout |
| 客户端 | PC、Web、Server |
| 版本 | 与客户端联动 |
| 认证类型 | all、personal、enterprise |
| 质量状态 | valid、missing_required、invalid_enum、duplicate、sensitive_detected |
| 技术标识 | 精确匹配 event_id、session_id、request_id、trace_id |
| 用户标识 | 仅允许不可逆 `user_hash`；禁止手机号、姓名、证件号查询 |

点击查询生成新 requestId 并取消旧请求；只接受当前 requestId 响应。重置恢复最近 24 小时和默认授权范围。查询条件改变不自动请求，避免大查询误触。

## 7. 明细表格

列：事件时间、事件名称、脱敏用户标识、会话 ID、客户端/版本、认证类型、结果、质量状态、Schema 版本、入库延迟、操作。默认按事件时间倒序，服务端分页 20/50/100。

长标识中间省略，悬停展示完整脱敏值；复制需权限并写审计。质量状态使用文字+颜色，不以颜色作为唯一信息。表格只在自身容器横向滚动。

## 8. 事件详情

点击事件名称打开右侧 Drawer。详情加载与列表独立；关闭后焦点返回触发行。

属性分组：公共属性、业务属性、上下文属性、质量校验。大对象默认折叠，数组最多预览 20 项。敏感命中仅显示 `ruleId`、字段名和 `[REDACTED]`，不得显示原值、长度特征或可逆摘要。

操作：

- 查看行为序列：需要 `tracking.event_detail.sequence`；
- 查看 Schema：跳转事件管理并定位版本；
- 复制脱敏 JSON：服务端二次脱敏，包含 `redactedFields`；
- 在联调验证中复现：只带非敏感技术标识，不自动启动生产调试。

## 9. 行为序列

默认按同一 session_id 展示当前事件前后各 30 分钟；允许 5 分钟、30 分钟、2 小时，拥有扩展权限时最长 7 天。同一 `user_hash` 序列需要更高权限，且不得跨租户/团队。

时间轴显示事件时间、名称、结果、客户端和与当前事件的时间差；当前事件高亮。分页/懒加载时顺序稳定，重复 event_id 去重。序列查看写审计。

## 10. 导出任务

导出不是浏览器同步下载。点击“导出明细”后打开 Dialog：展示筛选快照、预计条数、字段选择、格式和合规提示。

| 项目 | 规则 |
|---|---|
| 权限 | `tracking.event_detail.export`；大任务另需 `export_large` |
| 格式 | CSV；复杂属性可选 JSONL |
| 普通上限 | 100,000 条、7 天 |
| 大任务 | 审批后执行，不在 V1 原型真实审批 |
| 文件有效期 | 24 小时 |
| 下载次数 | 最多 3 次 |
| 脱敏 | 服务端生成前执行，前端不接触原值 |
| 快照 | 任务绑定创建时筛选和字段，不受后续页面修改影响 |
| 状态 | queued、processing、success、failed、cancelled、expired |
| 审计 | 创建、取消、完成、下载、失败、过期全部记录 |

任务成功显示任务号、条数、文件大小、过期时间与下载按钮；失败保留条件并允许幂等重试。不生成残缺文件。

## 11. 权限、安全与审计

权限：`tracking.event_detail.read`、`sequence`、`export`、`export_large`、`production`、`audit`。前端可见性与服务端鉴权同时执行，字段权限由服务端裁剪。

产品经理默认只能查看脱敏抽样，不默认导出；运营无明细权限；研发/QA 默认测试环境；数据管理员和数据分析师按授权团队查看。超级管理员也不能查看禁采原文。

审计记录查询条件摘要、结果规模、事件详情 ID、序列窗口、导出字段、任务和下载信息；审计日志不得记录完整查询敏感值或导出内容。

## 12. 状态与边界

| 状态 | 展示与恢复 |
|---|---|
| Loading | 首屏表格骨架；局部查询保留旧结果并显示进度 |
| Empty-default | “最近 24 小时暂无授权事件” |
| Empty-filtered | “当前条件下没有事件”，提供清空筛选 |
| Error | 保留条件和旧结果，标记 stale，提供重试 |
| Forbidden | 显示缺少权限码与返回入口 |
| Extreme | 超长属性省略、超大结果提示缩小范围或导出 |
| Data delayed | 展示数据截止时间和预计延迟 |
| Permission revoked | 中止查询/下载、关闭浮层并进入 403 |
| Sensitive detected | 原值隐藏，复制与导出再次扫描 |
| Export expired | 禁止下载，允许基于原快照重建任务 |

## 13. 状态管理

```js
eventDetailState = {
  filters: { range: '24h', event: 'all', result: 'all', identifiers: {} },
  query: { status: 'idle', requestId: null, stale: false, total: 0 },
  pagination: { page: 1, pageSize: 20 },
  selection: { activeEventId: null },
  drawer: { open: false, status: 'idle', event: null },
  sequence: { open: false, scope: 'session', window: '30m', status: 'idle' },
  exportTask: { open: false, snapshot: null, status: 'idle', taskId: null },
  permissions: []
}
```

这是页面 E2E 的最高测试接缝。抽屉、序列和导出使用独立 requestId；旧响应不得覆盖当前对象。关闭浮层必须恢复焦点并同步 Portal 标注作用域。

## 14. API 契约

| 能力 | API |
|---|---|
| 上下文 | `GET /api/v1/tracking/event-details/context` |
| 查询 | `POST /api/v1/tracking/event-details/query` |
| 详情 | `GET /api/v1/tracking/event-details/{eventId}` |
| 行为序列 | `POST /api/v1/tracking/event-details/{eventId}/sequence` |
| 脱敏复制 | `POST /api/v1/tracking/event-details/{eventId}/redacted-copy` |
| 创建导出 | `POST /api/v1/tracking/event-detail-exports` |
| 导出任务 | `GET /api/v1/tracking/event-detail-exports/{taskId}` |
| 下载 | `POST /api/v1/tracking/event-detail-exports/{taskId}/download-token` |

错误码：QUERY_RANGE_EXCEEDED、QUERY_TOO_BROAD、IDENTIFIER_BLOCKED、FIELD_FORBIDDEN、SENSITIVE_DATA_DETECTED、EXPORT_LIMIT_EXCEEDED、EXPORT_APPROVAL_REQUIRED、EXPORT_EXPIRED、QUERY_TIMEOUT。

## 15. 正式文案

- 默认空：“最近 24 小时暂无授权事件”
- 筛选空：“当前条件下没有事件，调整条件后重试”
- 延迟：“数据更新至 {time}，当前预计延迟 {delay}”
- 导出创建：“导出任务已创建，可关闭窗口后继续处理”
- 脱敏复制：“已复制脱敏 JSON”
- 越权：“暂无明细排查权限（{permissionCode}）”
- 敏感命中：“检测到禁止采集的数据，原值已隐藏”

## 16. 模拟数据与门户标注

至少 36 条事件，覆盖 AUTH、PROXY、ENV；personal/enterprise；PC/Web/Server；success/failure/timeout；五类质量状态；不同 Schema 版本和入库延迟。所有身份值使用不可逆样例或 `[REDACTED]`。

标注覆盖筛选、查询、导出、数据截止时间、事件名、质量状态、详情分组、行为序列、复制、Schema 跳转、导出字段和任务状态。Drawer/Dialog 标注作用域必须 push/pop 配对。

## 17. 测试决策

通过 `eventDetailState + render()` 验证外部行为，不测试 DOM 嵌套。验收：

1. 查询防竞态、分页和筛选快照准确；
2. 详情、序列与 Schema 版本对应；
3. 时间窗口、租户和团队边界生效；
4. 禁采原值不进入 DOM、URL、复制、导出、日志；
5. 导出异步状态、上限、过期、重试和审计正确；
6. Loading/Empty/Error/Forbidden/Extreme 可恢复；
7. 1280/1440/1920 无页面级横向溢出；
8. 键盘操作、焦点回归和 Portal 标注正确；
9. 控制台零错误。

## 18. 非目标范围

用户画像、真实身份搜索、跨租户查询、自由 SQL、无限时间轨迹、生产事件修改/删除/重放、禁采原文查看、浏览器同步全量下载、公开分享链接、自动产品结论与真实审批系统。

## 19. 页面布局详细规格（V1.1 补充）

```text
Main / PageContainer（24px）
├─ FilterSection
│  ├─ BasicFilters（4 列）
│  ├─ AdvancedIdentityFilters（默认折叠）
│  └─ 查询 / 重置 / 收起高级筛选
├─ QueryStatusBar：截止时间 / 时区 / 延迟 / 结果数
└─ DataSection
   ├─ Header：查询摘要 | 导出明细
   ├─ EventDetailTable（表头 sticky）
   └─ Pagination
GlobalLayer
├─ EventDetailDrawer（760px）
├─ BehaviorSequenceDialog（1040px × max 80vh）
└─ ExportTaskDialog（680px）
```

| 区域 | 尺寸/规则 |
|---|---|
| 基础筛选 | ≥1280px 4 列，1024–1279px 2 列；时间范围始终首位 |
| 高级筛选 | 单独一行；标识类型和值成对出现；展开状态写入 URL |
| 明细表 | 最小宽 1480px；时间/事件左侧 sticky，操作右侧 sticky |
| 详情 Drawer | Header/Footer 固定；公共属性、业务属性、上下文、Schema/质量分节 |
| 行为序列 | 左侧时间轴 64%，右侧事件摘要 36%；正文独立滚动 |

属性值使用“字段名/脱敏值/类型/质量状态”四列；对象和数组默认折叠，最多展开 5 层。复制只使用服务端脱敏值。

布局验收：高级筛选收起不清空输入且深链可恢复；Drawer 内打开行为序列后焦点与 Portal 正确返回；Stale 时导出禁用但筛选可编辑；1024px 下表格横向滚动且页面无双重横向滚动；长 JSON、空属性、质量失败和 200 条序列不破坏布局。
