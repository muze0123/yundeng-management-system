# 项目长期记忆 — 云登后台管理系统（原型）

## 工程约定
- 入口统一 `index.html?page=<英文模块名>`；框架层 = `Prototype/app-shell.js` + `Prototype/系统框架.css`；业务 = `Prototype/modules/*.js`（只建内容区，无 iframe、无本地 JS/CSS 拆分）。
- **缓存破坏（强制）**：模块/CSS 改动后 bump 两处 —— `app-shell.js` 的 `MODULE_VERSION` + `index.html` 的 `系统框架.css?v=` / `app-shell.js?v=`。动版本前先 grep 实际值（多会话并行会互相覆盖）。
- **JSON-string 型模块**（`billing-invoice.js`、`user-list.js` 等）必须用「剥缩进+尾逗号 → json.loads → 改 → json.dumps(ensure_ascii=False) → 还原」往返流程，禁止手工内插代码。补丁需带断言，FAIL 必须追查。
- **⚠️ 必须运行时冒烟验证**：`node --check`/grep/纯函数测试都抓不到「点击无反应」。jsdom 脚本真实执行 `init(root)` 并触发每个事件处理器。跑法：`NODE_PATH=/Users/zhangbin/.workbuddy/binaries/node/workspace/node_modules /Users/zhangbin/.workbuddy/binaries/node/versions/22.22.2-6/bin/node .workbuddy/smoke-test.js`（jsdom 在 workspace）。
- **严格模式**：状态变量必须先 `let` 声明再赋值（V1.7/1.11 血泪教训，漏声明 → ReferenceError → 按钮打不开）。
- **id 约束**：`$()` 取文档第一个匹配，筛选区与弹窗字段 id 绝不能撞车；改 id 三处同步（HTML `id` / `$()` 引用 / 点击白名单）；用脚本做静态 id 去重 + 引用比对兜底。
- **按钮标准**：32px 高、圆角 4px；primary `#0066FF`→hover `#0052CC`→active `#0047B3`；disabled 灰底 `#9DA2AC` 字、不用 opacity。筛选区按钮纯文字放 `.filter-actions`。
- **工具坑**：BSD grep 的 `\|` 静默失效（用 `grep -E`）；Read 对 >2000 字符行截断（改用 Python 按行号改）；冒烟脚本里 jsdom 的 `new Event('keydown',{key})` **不携带 key 属性**，键盘用例必须用 `new window.KeyboardEvent(...)`，否则 Esc/方向键类断言会「假通过或假失败」。
- **⚠️ 绑定期的引用快照陷阱（2026-10-12 拖拽不生效根因）**：模块内状态数组（`sites`/`types` 等）在 init 加载、删除等路径会被**重新赋值**；任何在绑定时固定数组引用的监听器（如拖拽排序）都会改到旧数组上。统一写法：绑定传取值函数 `() => sites`，并在删除时用就地 `splice` 保持引用稳定。凡「操作后不生效」类缺陷，先查引用是否陈旧。
- **⚠️ CSS 规则「写了 ≠ 生效」（2026-10-12 文本域高度不生效根因）**：三条独立死因——
  1. **选择器类名写错**：元素是 `class="control"`，规则却写 `textarea.on-control` → 整条规则零匹配（连 `min-height` 都不生效）。
  2. **类名根本没定义**：独立页写 `class="mono"`，但 Tailwind 只生成 `font-mono`，页面里也没有 `.mono{...}` 规则 → 该 class 是**死类名**，样式静默回落到继承值（2026-10-12 独立页 chip 数量数字未走等宽字体即此因）。凡是自己命的类名（`.mono`/`.on-xxx`/`.xx-xxx`）都必须能在同文件里找到规则定义；用 `getComputedStyle` 真机确认，别只看 HTML。
  3. **特异性被基类压过**：基类 `.on-module .control{height:32px;padding:0 8px}`（0,2,0）会盖掉无前缀的 `textarea.on-control{...}`（0,1,1）。
  正确写法：**作用域前缀 + 元素.真实类**，如 `.on-module .on-modal textarea.control{...}`（0,3,1）。模块内要覆盖 `.control` 的尺寸/间距/行高时一律照此办理。
- **⚠️ 必须跑真引擎计算样式守卫（强制）**：jsdom **不做 CSS 级联**，所以「断言 CSS 文本含 `height:60px`」是**假通过**。R 级改动 CSS 尺寸/级联类规则后，跑
  `NODE_PATH=... node .workbuddy/verify-computed-style.js .workbuddy/specs/<name>.json`
  它把模块真实 CSS+HTML 塞进 headless Chrome（`--headless=new --dump-dom`），断言 `getComputedStyle` 与 `offsetHeight`。spec 支持 `unhide`（去弹窗 hidden）、`checks[].extraClass`（补运行时状态类）。新增视觉断言时同步加 spec。
- **CSS 假通过的第二道补丁**：jsdom 冒烟里用 `element.matches(选择器)` 校验「规则选择器确实命中元素」+「含 `.on-module` 前缀」，可低成本抓出类名写错/缺作用域（本次两处守卫均已用变异测试证明有效）。
- **⚠️ hover / 交互态必须用 CDP 真机验证（强制）**：`:hover` 无法用 JS 合成，jsdom 更无级联与布局。`.workbuddy/verify-standalone-footer.js` 是可复用的 CDP 骨架：`WebSocket`（Node 22 内建）直连 Chrome、`Input.dispatchMouseEvent` 派发真实鼠标移动、`Emulation.setFocusEmulationEnabled` + **`DOM.focus`** 验证 `:focus-within`、再用 `getComputedStyle`/`getBoundingClientRect` 断言。**坑**：headless 下 `element.focus()` 不建立真实焦点（activeElement 变了但 `:focus` 不匹配）→ 会造成「假失败」，必须用 `DOM.focus`。新增交互态（hover/focus/drag）一律照此补验证 + 变异测试。
- **可访问性守卫**：页脚/正文类小字不要用 `ink.muted #9DA2AC`（白底仅 2.56:1，不达 WCAG AA）；改用 `ink.sub #6E7685`（4.57:1）。CDP 脚本内置对比度计算断言。
- **独立版导出**：`scripts/export-standalone.py <MODULE_REGISTRY键>`（发票=**invoice-management**，非文件名）；**导出件 mtime 必须晚于模块源**（改完模块不重导 = 导出件内联的是旧代码，2026-10-12 出海吧就踩过：模块 12:03 改完、导出件停在 12:01，里面的路径引用还是旧的）；重导前备份。**它只导出「后台模块抽取版」**（把模块 HTML/CSS 抽出来并内联 Tailwind/lucide），注册表当前 **5 项**：proxy-replacement / invoice-management / proxy-exception-log / rebate-management / **overseas-nav**。**⚠️ 出海吧有两个 exports 产物、极易混**：① `exports/出海吧-独立页面.html` —— 独立设计的**导航站单文件**，手写维护、不进注册表、用公网 CDN（不内联，故离线不可用），是**对外**页面；② `exports/出海吧-独立版.html` —— 本脚本产物（键 `overseas-nav`），**后台模块的单文件快照**（保留顶栏/侧栏），供**分享评审**。一句话：独立页面给用户看，独立版给同事看后台界面。
- **兼容重定向页**：每个后台模块都要有 `Prototype/<中文名>.html`（模板见 `Prototype/返佣管理.html`：`new URL('../index.html',location.href)` → 透传 `location.search` → `searchParams.set('page',路由)` → `location.replace`，并带 `noscript` 兜底链接）。`app-shell.js` 的 `legacyRoutes` 里已登记的名字**必须**有对应文件，否则旧链接 404（2026-10-12 出海吧即缺此文件才被发现）。**守卫：`python3 .workbuddy/verify-legacy-routes.py`**（28 项全查：文件存在性 / page 是否指向本模块或官方别名 `PAGE_NAMES` / noscript 兜底 / 无外部依赖）；已用 4 组变异测试证明灵敏度。历史遗留兼容页有两种代数：老式带 `aliases` 哈希映射（约 20 个）、新式单行模板（更换代理/返佣管理/代理异常日志/出海吧）；`PAGE_NAMES` 是**单行**对象字面量，解析要 `\{(.*?)\};` 不能用 `\n  \};`。

## 焦点态单一指示铁律（design.md §5.13）
- 输入类 `.control`/`.pg-jump-input` 用 A 类光环（`:focus`），其余 B 类描边（`:focus-visible`），二选一。模块必须写：`.xx-module .control:focus-visible{outline:none}` + `:is(button,input,select):not(.control):not(.pg-jump-input):focus-visible{outline:2px...}`。
- **前提**：`.control` 基类必须含 `outline:none`（否则 UA 默认环叠加成双描边）。
- 守卫：`python3 scripts/lint-focus-ring.py --strict`（交付把关）。KNOWN_PENDING 未修：environment-management / member-list / user-statistics。解析坑：先剥 CSS 注释；JSON-string 换行多重转义需 `re.sub(r"\\{1,3}n","\n")`。

## Mock 数据口径（2026-10-10 定稿）
- Mock 源值一律**明文**（手机/邮箱/账号），仅代理凭证脱敏；**产品级脱敏**由各模块 PRD 规定、渲染层负责（成员列表/团队列表/环境管理/套餐订单/发票管理等 PRD 有要求）。判定「残留脱敏」必须查该模块 PRD「脱敏」词频，不能只看正则命中。守卫：`.workbuddy/verify-plaintext-mock.js`。claude.md 与 PRD 冲突时按「产品需求 vs Mock 规范」定性，两方同时满足。

## 新增业务模块标准清单（2026-10-10 沉淀）
1. 手写 JS 对象式模块（`styles[]`+`html`+`init(root)`，作用域 `.xx-module`，仿 rebate-management）。
2. `app-shell.js` 四处注册：`MODULE_FILES` / `PAGE_NAMES` / `navigation` / `legacyRoutes`。
3. 两处版本 bump（见工程约定）。
4. 兼容重定向页 `Prototype/<中文名>.html`。
5. `PRD/<域>/<中文名>PRD.md` + `PRD/系统框架PRD.md` 路由表补行。
6. 需独立版时注册 `export-standalone.py` 并导出。
7. `.workbuddy/smoke-test-<name>.js` 跑绿；含输入控件时跑 lint-focus-ring 确认不新增 hit。

## 模块口径速查（详见各自 PRD）
- **更换代理** proxy-replacement：列表 15 列；`result`/`syncStatus` 双字段（`failed ⟺ na`）。**V1.14（2026-10-16）口径变更：弹窗新增「更换地区」（层级单选+搜索，默认带入原代理地区、可改）+「更换代理商」，两者都参与分配** → 匹配 = 所选地区 + 所选代理商 + 原类型；**取代 R-09"渠道商仅记录来源"**。列表列名「渠道商」→「代理商」（底层字段仍 `oldChannel/channel`）。代理商字典 `channels[].areaIdx`→`regions`（德国仅云梯 1 家且不铺库存=失败演示）；库存按 地区×代理商×类型×2=78 条重铺；`dbKey` 升 `-v2`。弹窗「说明」区块及 `.pr-note` 样式已删（口径落入 R-02/04/05，勿因文案没了就删规则）。守卫：冒烟 `.workbuddy/smoke-test.js`（含 A2/C1/C2/C3/D/E/F 段）+ 计算样式 `.workbuddy/specs/proxy-replacement.json`（**verify-computed-style.js 已扩展 `init`/`click` 可选字段**，弹窗类运行时 DOM 必须用）+ 截图 `.workbuddy/shoot-proxy-modal.js`。PRD 在 `PRD/运营中心/`（**非** 用户管理）。交付 `exports/更换代理-独立版.html`（md5 `127fb1527531523fa5864cd37e7d5ce2`）。待定：O-10 真实地区/代理商数据源、O-11 三重匹配的容量与调剂。
- **发票管理** invoice-management（文件 billing-invoice.js）：票据 6 态 / 红冲 8 态 / 更正 8 态三体系勿混；一期只做申请+票据（两处硬阻塞、D1–D9 差异见一期 PRD 第 25.2 节）。
- **代理异常日志** proxy-exception-log：13 列，标签「平/静」两维独立可并存；脱敏口径冲突未决（PRD O-07）。
- **出海吧** overseas-nav（2026-10-10 新增）：一级菜单侧栏末尾（rocket 图标），下划线式双 Tab（网站管理/类型管理），筛选=搜索+网站类型+是否精选+查询/重置（草稿态提交），拖拽排序（筛选生效时禁用），列表精选列为**星标按钮**点击切换推荐、简介列 hover/聚焦弹完整简介气泡，图标上传（≤200KB dataURL）/网址自动匹配 favicon（favicon.im，降级首字母头像）；与独立页 `exports/出海吧-独立页面.html` 共享 localStorage **`yundeng_overseas_nav_v1`**（后台写、独立页 storage 事件联动；独立页无键时回退内置种子）。删除类型需先清空其下网站。**区块合并（2026-10-12，design.md §5.0 新规）**：无筛选条件的页签，其数据列表并入页签区块、整页单区块（类型管理=单区块；网站管理有筛选=两区块）；并入面板不得带 bg-white/rounded-lg/p-5（禁卡片套卡片）。**独立页（2026-10-12 补）**：平台名「出海吧」纯标题黑；`#content` 为纵向 flex，底部白色页脚（三列=品牌+定位语 / 中列产品云登指纹浏览器 / 右列联系方式三图标 hover·focus 展开邮箱地址与二维码占位槽；法务行 + 服务协议/隐私政策链接），二维码待业务方提供真实图片。**PRD 现为两份**：`PRD/出海吧PRD.md`（后台模块 + 数据契约权威；第三章已精简为耦合口径速览；开头有「〇 交付物对照」表区分 4 个同名前缀文件）、`PRD/出海吧独立页PRD.md`（**独立页唯一事实来源**，页面结构/交互/视觉/验收）；兼容入口 `Prototype/出海吧.html`；导出产物 `exports/出海吧-独立版.html`（后台单文件快照，供分享评审）。**守卫清单**：冒烟 `.workbuddy/smoke-test-overseas.js`（B2 段断言区块数）+ `.workbuddy/smoke-standalone-chuhai.js`；真机 `.workbuddy/verify-standalone-footer.js`（独立页页脚/hover）+ `.workbuddy/verify-standalone-export.js <导出件> overseas-nav`（导出快照 8 段 25 断言）+ `.workbuddy/verify-computed-style.js .workbuddy/specs/overseas-nav.json`（计算样式）。

## 集成测试环境（jsdom 30）
- 用 `resources:{interceptors:[...]}` 拦截 CDN（jsdom 30 已移除 `resources:'usable'`）；`beforeParse` 里 `defineProperty(window,'innerWidth',{value:1440})` + scrollBy/scrollTo/scrollIntoView no-op polyfill；先起 `python3 -m http.server 8788`（必须后台任务方式）。

## 通用缺陷模式（静态检查抓不到，靠运行时断言兜）
- `form.reset()` 不复位 hidden input：日期区间等隐藏域须显式清空（rebate-management 仍有同类隐患）。
- 枚举标签映射漏配渲染字面量 `undefined`：`map` 前 `filter(t=>LABEL[t])`，断言覆盖标签文案白名单。
