#!/usr/bin/env python3
"""旧文件名兼容入口守卫（Prototype/<中文名>.html）

背景：2026-10-12 发现 `Prototype/出海吧.html` 缺失 —— `app-shell.js` 的 `legacyRoutes`
已登记 `'出海吧.html': 'overseas-nav'`，但文件从未创建，通过旧文件名/历史书签访问时静默 404。
登记项与文件是两处独立维护的清单，天生会漂移，因此用脚本兜住。

检查内容
1. `legacyRoutes` 的每个键在 `Prototype/<键>` 都有对应文件（`index.html` 是根入口，跳过）。
2. 每个兼容页含 `noscript` 兜底链接、不引外部 CDN（兼容页必须极简，避免加载失败阻塞跳转）。
3. 兼容页最终落到的 `page` 值必须被框架认识：取值方式兼容两代写法 ——
   - 新式：`target.searchParams.set('page','<路由>')`
   - 老式：`target.searchParams.set('page', target.searchParams.get('page') || aliases[old] || "<路由>")`
   - 极简式：`location.replace('../index.html?page=<路由>')`
   判定集合 = `MODULE_FILES` 键 ∪ `PAGE_NAMES` 值 ∪ `legacyRoutes` 值（框架对 page 的容错范围）。
   这条能抓出「复制模板后忘了改 page」→ 跳到别的模块。
4. `target.search=location.search` 透传原查询参数（老式/极简式可豁免，仅记录提示）。

用法：python3 .workbuddy/verify-legacy-routes.py
退出码：0 = 全部通过；1 = 有缺失或不一致。
"""
from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SHELL = ROOT / "Prototype/app-shell.js"
PROTO = ROOT / "Prototype"

fails: list[str] = []
notes: list[str] = []


def obj_body(src: str, name: str) -> str:
    """取对象字面量主体：到第一个 `};` 为止，兼容「整个对象压在一行」与多行两种排版。"""
    m = re.search(rf"const {name} = \{{(.*?)\}};", src, re.S)
    return m.group(1) if m else ""


def obj_keys(src: str, name: str) -> list[str]:
    return re.findall(r'"([^"]+)":', obj_body(src, name))


def extract_page(html: str) -> str | None:
    """从兼容页里取出最终生效的 page 路由值。"""
    m = re.search(r"searchParams\.set\('page',(.*?)\);", html, re.S)
    if m:
        literals = re.findall(r"'([^']*)'|\"([^\"]*)\"", m.group(1))
        flat = [a or b for a, b in literals]
        # 末位字符串即兜底路由（老式写法里前面还有 'page'、aliases 的键）
        for candidate in reversed(flat):
            if candidate and candidate != "page":
                return candidate
    m = re.search(r"index\.html\?page=([A-Za-z0-9_-]+)", html)
    return m.group(1) if m else None


def main() -> int:
    if not SHELL.exists():
        print(f"未找到 {SHELL}", file=sys.stderr)
        return 1

    src = SHELL.read_text(encoding="utf-8")
    block = re.search(r"const legacyRoutes = \{(.*?)\n  \};", src, re.S)
    if not block:
        print("未能在 app-shell.js 中定位 legacyRoutes", file=sys.stderr)
        return 1

    pairs = re.findall(r"'([^']+\.html)':\s*'([^']+)'", block.group(1))
    allowed = set(obj_keys(src, "MODULE_FILES"))
    # route → 官方 page 别名（PAGE_NAMES 的 id→name 映射）
    alias: dict[str, str] = dict(re.findall(r'"([^"]+)":\s*"([^"]+)"', obj_body(src, "PAGE_NAMES")))
    allowed |= set(alias.values())
    allowed |= {r for _, r in pairs}

    print(f"旧文件名兼容入口守卫 · 登记 {len(pairs)} 项 · 框架可接受的 page 值 {len(allowed)} 个\n")

    for name, route in pairs:
        if name == "index.html":  # 根入口指向仓库根目录的 index.html
            if not (ROOT / "index.html").exists():
                fails.append("根入口 index.html 缺失")
                print("  [FAIL] index.html（根入口）缺失")
            else:
                print("  [OK]   index.html（根入口）")
            continue

        path = PROTO / name
        if not path.exists():
            fails.append(f"Prototype/{name} 缺失（路由 {route}）")
            print(f"  [FAIL] {name}  → 文件缺失（应指向 {route}）")
            continue

        html = path.read_text(encoding="utf-8")
        bad: list[str] = []
        if "location.replace(" not in html:
            bad.append("缺 location.replace 跳转")
        page = extract_page(html)
        if not page:
            bad.append("无法解析 page 路由")
        elif page not in allowed:
            bad.append(f"page 值 `{page}` 框架不认识")
        elif not (page == route or alias.get(route) == page):
            bad.append(f"page 值 `{page}` 指向了别的模块（该文件应为 {route}"
                       + (f"，官方别名 {alias[route]}" if route in alias and alias[route] != route else "") + "）")
        if "<noscript>" not in html:
            bad.append("缺 noscript 兜底链接")
        if re.search(r"src=[\"']https?://|href=[\"']https?://|src=[\"']//", html):
            bad.append("引用了外部资源（兼容页应零依赖）")
        if "target.search=location.search" not in html.replace(" ", "") and "location.replace('../index.html" not in html:
            notes.append(f"Prototype/{name} 未透传 location.search（老式写法，可接受）")

        if bad:
            fails.append(f"Prototype/{name}：" + "；".join(bad))
            print(f"  [FAIL] {name:<18} → {page or '?'}；" + "；".join(bad))
        else:
            print(f"  [OK]   {name:<18} → {page:<22} {len(html.encode('utf-8'))} 字节")

    print("\n" + "-" * 62)
    if notes:
        print(f"[提示] {len(notes)} 项：")
        for n in notes:
            print("  · " + n)
    if fails:
        print(f"失败 {len(fails)} 项：")
        for f in fails:
            print("  · " + f)
        return 1
    print("全部通过。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
