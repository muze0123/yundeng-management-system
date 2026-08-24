# 资产沉淀 PRD

> 所属模块：数据埋点 / 资产沉淀
> 路由：`/data-tracking/dashboards` 
> 优先级：P1 
> 状态：可直接用于 Vibecoding

## 1. 问题陈述

分析结果若只能临时查看，团队无法长期追踪同一指标；如果所有人都能任意改动公共看板，又会造成布局覆盖、口径漂移和权限泄露。看板还需处理卡片局部失败、源事件废弃、极端布局和并发编辑。

## 2. 解决方案

提供看板列表、查看和编辑三种模式。看板由不可变分析 snapshot 卡片组成，支持 12 栅格布局、可见范围、收藏、复制、软删除和版本冲突。系统看板只读，用户看板按权限编辑。

## 3. 用户故事

1. 作为产品经理，我想把常用分析组合成看板。
2. 作为运营，我想查看授权看板而不能改动。
3. 作为 Owner，我想拖拽、缩放和排序卡片。
4. 作为键盘用户，我想用按钮移动和调整卡片。
5. 作为用户，我想复制看板作为自己的版本。
6. 作为用户，我想收藏常用看板。
7. 作为 Owner，我想设置私有、团队和指定角色可见。
8. 作为用户，我想在单卡失败时继续查看其它卡。
9. 作为用户，我想知道卡片口径、更新时间和源分析。
10. 作为 Owner，我想在并发冲突时保留布局草稿。

## 4. 页面结构

```text
FilterSection：搜索 / 类型 / Owner / 可见范围 / 收藏
DataSection
├─ ListMode：看板卡片/表格 + 分页
├─ ViewMode：看板标题 + 全局筛选 + Grid
└─ EditMode：组件库 + 12栅格画布 + 保存/取消
GlobalLayer：新建/权限/删除/冲突 Dialog
```

看板列表字段：名称、类型、可见范围、卡片数、Owner、收藏、更新时间、操作。查看模式可全屏但保留退出入口。编辑模式左侧组件库 280px，画布自适应；1024–1279px 组件库改 Drawer。

## 5. 看板与卡片规则

| 对象 | 规则 |
|---|---|
| 名称 | 2–60 字，团队范围内同 Owner 不重复 |
| 描述 | ≤300 字 |
| 可见范围 | private/team/roles |
| Grid | 12 列，行高 40px，间距引用 design token |
| 卡片尺寸 | 最小 3×2，最大 12×8 |
| 卡片数 | 单看板最多 30 |
| 类型 | metric/line/bar/funnel/retention/path/table/text |
| 数据 | 绑定 analysisSnapshotId，不绑定未运行草稿 |
| 刷新 | 默认使用看板全局筛选，可由卡片锁定日期 |

卡片标题 2–60 字；支持显示定义、源分析、更新时间、局部刷新、查看数据表、编辑、复制、删除。Text 卡片不得执行 HTML。

## 6. 交互与状态管理

1. 列表点击名称进入 ViewMode，返回保持筛选和页码；
2. 新建输入名称和范围，成功后进入空白 EditMode；
3. 从数据分析保存卡片时，若目标看板有权限则追加到首个空位；
4. 拖拽/缩放只更新 layoutDraft 和 dirty=true，不立即持久化；
5. 卡片碰撞时自动下移，不允许重叠；超过画布高度自动扩展；
6. 键盘替代：上/下/左/右移动一格，Shift+方向调整尺寸；
7. 保存使用 version + Idempotency-Key；成功 dirty=false；
8. 取消恢复 serverSnapshot；离开 dirty 状态弹保存/放弃/继续；
9. 删除看板二次确认并软删除；系统看板不可删除；
10. 删除卡片只改草稿，保存后生效；
11. VERSION_CONFLICT 显示本地与服务端布局更新时间，可复制本地看板或刷新。

## 7. 加载中、空状态、错误 与边界

| 状态 | 表现 |
|---|---|
| 列表 Loading | 8 个看板骨架 |
| 默认 Empty | “暂无看板”，有权限展示新建 |
| 筛选 Empty | “未找到符合条件的看板”，清空筛选 |
| 空白看板 | “添加分析卡片，开始搭建看板” |
| 卡片 Loading | 仅卡片骨架 |
| 卡片 Error | 卡内重试和查看源分析，不阻塞全局 |
| 源分析废弃 | 保留最后可用结果并显示“源定义已废弃” |
| 源事件无权限 | 卡内 403，不泄露标题以外数据 |
| 30 卡上限 | 禁用添加并解释上限 |
| 极端标题 | 两行省略，Tooltip 完整值 |

全局查询失败保留旧卡片并标记 stale；stale 状态不可导出。卡片刷新结果必须匹配当前 filterSnapshot。

## 8. 权限与安全

权限：`dashboard.read/create/update/delete/share`。private 仅 Owner 和超管；team 按团队范围；roles 按角色。分享范围扩大必须有 share 权限并审计。复制看板不复制原 Owner 权限，只复制用户可见的聚合配置。禁止看板包含用户明细和禁采值。

## 9. 接口契约

| 场景 | 接口 |
|---|---|
| 列表/详情 | `GET /api/v1/tracking/dashboards`、`GET /api/v1/tracking/dashboards/{id}` |
| 新建/保存 | `POST /api/v1/tracking/dashboards`、`PATCH /api/v1/tracking/dashboards/{id}` |
| 复制 | `POST /api/v1/tracking/dashboards/{id}/clone` |
| 删除 | `DELETE /api/v1/tracking/dashboards/{id}` |
| 卡片数据 | `POST /api/v1/tracking/dashboard-card-queries` |
| 收藏 | `PUT /api/v1/tracking/dashboards/{id}/favorite` |

错误：DASHBOARD_LIMIT、CARD_LIMIT、LAYOUT_CONFLICT、VERSION_CONFLICT、SOURCE_UNAVAILABLE、FORBIDDEN。

## 10. 正式文案

- 空白看板：“添加分析卡片，开始搭建看板”
- 保存：“看板已保存”
- 删除标题：“删除看板？”
- 删除说明：“删除后将从列表移除，已有分析不会被删除。”
- 离开：“当前布局尚未保存”
- 冲突：“看板已被他人更新，请查看最新版本后继续”

## 12. 测试决策

使用 `serverDashboard → layoutDraft → save(version)` 测试。验收：

1. 拖拽不重叠，键盘可完成等价操作；
2. dirty 离开保护正确；
3. 单卡错误不影响其它卡；
4. 源废弃、无权限和 stale 状态清晰；
5. 并发冲突不覆盖；
6. 卡片/布局上限可执行；
7. 分享权限和审计正确；
8. 1024–1920 布局完整。

## 13. 非目标范围

实时多人协同编辑、自由 SQL 卡片、公开互联网分享、用户明细、图片上传和自动生成看板。

## 14. 页面布局详细规格与开放条件（V1.1 补充）

> 本模块继续保持导航隐藏，直到画布编辑、布局持久化、并发冲突和权限验收全部通过；本节定义目标态，不代表当前已开放。

### 14.1 列表与画布布局

```text
看板列表
├─ FilterSection：搜索 / Owner / 共享范围 / 更新时间
└─ DataSection：Header / 卡片或表格视图 / Pagination

看板查看或编辑
├─ StickyHeader（64px）：返回 / 名称 / 更新时间 / 分享 / 编辑
├─ GlobalFilterBar（56px）：日期 / 团队 / 端 / 版本 / 刷新
└─ Canvas（12 列栅格，row-height 80px，gap 16px）
 ├─ DashboardCard × N
 │ ├─ CardHeader：标题 / 口径 / 更多
 │ ├─ CardBody：图表或数据表
 │ └─ CardErrorBoundary
 └─ AddCardPlaceholder（编辑态）
GlobalLayer：编辑 Drawer / 选卡 Dialog / 分享 Dialog / 冲突 Dialog
```

列表视图 ≥1440px 3 列、1280px 2 列、1024px 1 列。画布卡片最小 3×3、最大 12×8，正文最小高 240px；拖拽缩放只在编辑态启用。自动保存只保存草稿，正式发布需显式确认；version 冲突展示布局 Diff，不静默覆盖。

开放验收：拖拽、缩放、撤销、重做、草稿恢复和发布布局可复现；卡片仅引用 analysis snapshot 或 metric_id/version；单卡失败不影响其他卡；分享权限与数据范围取交集；1024px 查看态单列，编辑态仍可取消或保存草稿；全部通过前侧栏、快捷入口和普通用户深链保持关闭。
