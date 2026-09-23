#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""云登后台 · 单文件导出器（standalone exporter）。

把「云登后台」统一入口页面导出为一个自包含的单文件 HTML：所有样式与脚本内联，
双击即可离线打开，无需本地服务。生成逻辑严格沿用仓库既有先例
``exports/发票管理-独立版.html`` 的装配顺序与注释措辞，并从该先例中按 ASCII
区间精确切取已内联的 Tailwind Play CDN 与 lucide UMD 产物（保证版本一致、
离线可用）。

用法::

    python3 scripts/export-standalone.py proxy-replacement
    python3 scripts/export-standalone.py proxy-replacement \\
        --output exports/更换代理-独立版.html --title 更换代理

任何一步替换都必须命中预期次数，命中数不符会抛错退出（严禁静默 no-op）。
"""

from __future__ import annotations

import argparse
import pathlib
import re
import sys
from dataclasses import dataclass, field
from typing import List, Tuple

# ---------------------------------------------------------------------------
# 常量：装配模板 / 先例定位标记
# ---------------------------------------------------------------------------

#: Google Fonts（JetBrains Mono）——本快照唯一保留的外部资源，异步加载 + noscript 回退。
FONT_URL = (
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:"
    "wght@400;500;600&amp;display=swap"
)

#: 先例文件中 Tailwind / lucide 内联体的定位标记（含注释行）。
TAILWIND_OPEN = "<script>\n/* Tailwind Play CDN（内联，离线可用） */\n"
LUCIDE_OPEN = "<script>\n/* lucide UMD（内联，离线可用） */\n"

#: 默认先例文件（提供已内联、离线可用的 Tailwind / lucide 产物）。
DEFAULT_REFERENCE = "exports/发票管理-独立版.html"

#: 源文件相对路径。
SYSTEM_CSS_REL = "Prototype/系统框架.css"
APP_SHELL_REL = "Prototype/app-shell.js"

#: 模块注册表：为常用模块提供默认「标题 / 模块文件 / 输出文件名」。
MODULE_REGISTRY = {
    "proxy-replacement": {
        "title": "更换代理",
        "module_file": "Prototype/modules/proxy-replacement.js",
        "output": "exports/更换代理-独立版.html",
    },
    "invoice-management": {
        "title": "发票管理",
        "module_file": "Prototype/modules/billing-invoice.js",
        "output": "exports/发票管理-独立版.html",
    },
}


class ExportError(RuntimeError):
    """导出过程中的断言失败。"""


# ---------------------------------------------------------------------------
# 断言工具
# ---------------------------------------------------------------------------


def assert_hit(count: int, expected: int, label: str) -> None:
    """断言命中次数与预期一致；不符则抛错退出，禁止静默 no-op。"""
    if count != expected:
        raise ExportError(
            f"【{label}】期望命中 {expected} 次，实际命中 {count} 次；"
            f"命中数不符，导出中止。"
        )


def replace_once(text: str, old: str, new: str, label: str) -> str:
    """执行一次精确字符串替换，并断言恰好命中 1 次。"""
    count = text.count(old)
    assert_hit(count, 1, label)
    return text.replace(old, new)


def escape_script_close(text: str, label: str) -> Tuple[str, int]:
    """校验内联内容不含 ``</script``（大小写不敏感），命中则转义为 ``<\\/script``。

    返回 ``(处理后文本, 命中次数)``，并断言处理后不再残留危险序列。
    """
    hits = len(re.findall(r"</script", text, flags=re.IGNORECASE))
    if hits:
        text = re.sub(r"</script", r"<\\/script", text, flags=re.IGNORECASE)
    remaining = len(re.findall(r"</script", text, flags=re.IGNORECASE))
    if remaining != 0:
        raise ExportError(
            f"【{label}】危险序列 </script 转义后仍残留 {remaining} 处，导出中止。"
        )
    return text, hits


# ---------------------------------------------------------------------------
# 源文件解析
# ---------------------------------------------------------------------------


def extract_tailwind_config(index_html: str) -> str:
    """从 index.html 提取内联的 tailwind.config 脚本体（保留原始缩进与色值）。"""
    open_tag = "<script>\n"
    start_marker = open_tag + "    window.tailwind = window.tailwind || {};"
    assert_hit(index_html.count(start_marker), 1, "tailwind.config · 起始标记")
    body_start = index_html.index(start_marker) + len(open_tag)
    end = index_html.index("</script>", body_start)
    return index_html[body_start:end]


def extract_shell_body(index_html: str) -> str:
    """提取 index.html 的系统壳 HTML（含顶栏/侧栏/容器/弹窗/toast），去掉 app-shell 脚本。"""
    start = index_html.index("<body>") + len("<body>")
    end = index_html.index("<script src=\"Prototype/app-shell.js")
    body = index_html[start:end]
    # 双重保险：确认截取范围内不含任何 <script src> 外链。
    assert_hit(body.count("<script src="), 0, "系统壳 HTML · 残留 <script src>")
    return body


def extract_inlined_asset(reference: str, open_marker: str, label: str) -> str:
    """从先例文件中切出已内联的 Tailwind / lucide 脚本体（注释行之后的纯 JS 内容）。"""
    assert_hit(reference.count(open_marker), 1, f"{label} · 定位标记")
    start = reference.index(open_marker) + len(open_marker)
    end = reference.index("</script>", start)
    return reference[start:end]


# ---------------------------------------------------------------------------
# app-shell 的 4 处 file:// 适配
# ---------------------------------------------------------------------------


def adapt_app_shell(shell_js: str, module_id: str) -> Tuple[str, "List[Tuple[str, int]]"]:
    """对 app-shell.js 施加 4 处 file:// 适配，返回 (结果, 命中统计)。"""
    stats: List[Tuple[str, int]] = []

    # 1) 默认路由兜底：'home' -> 目标模块 id。
    old1 = "decodeURIComponent(location.hash.slice(1)) || 'home');"
    new1 = f"decodeURIComponent(location.hash.slice(1)) || '{module_id}');"
    assert_hit(shell_js.count(old1), 1, "适配①·默认路由兜底")
    shell_js = shell_js.replace(old1, new1)
    stats.append(("①默认路由兜底", 1))

    # 2) 跳过外部模块加载：模块已内联，file:// 下不得再动态加载。
    old2 = "await loadScript(MODULE_FILES[route.id], 'module');"
    new2 = (
        "if (!window.YundengModules || !window.YundengModules[route.id]) "
        "{ await loadScript(MODULE_FILES[route.id], 'module'); }"
    )
    assert_hit(shell_js.count(old2), 1, "适配②·跳过外部模块加载")
    shell_js = shell_js.replace(old2, new2)
    stats.append(("②跳过外部模块加载", 1))

    # 3) pushState 包 try/catch：file:// 下 pushState 可能抛 SecurityError。
    old3 = "history.pushState(null, '', url);"
    new3 = "try { history.pushState(null, '', url); } catch (_) {}"
    assert_hit(shell_js.count(old3), 1, "适配③·pushState 包保护")
    shell_js = shell_js.replace(old3, new3)
    stats.append(("③pushState 包保护", 1))

    # 4) init() 中移除 replaceState 改写地址栏。
    old4 = (
        "    history.replaceState(null, '', "
        "routeHref(currentRoute.id, location.search));\n"
    )
    new4 = "    /* 单文件导出：file:// 下不改写地址栏 */\n"
    assert_hit(shell_js.count(old4), 1, "适配④·移除 replaceState")
    shell_js = shell_js.replace(old4, new4)
    stats.append(("④移除 replaceState", 1))

    # 反向断言：
    # ① 与 ④ 为「替换式」改动，原始片段必须彻底消失；
    # ② 与 ③ 为「包裹式」改动，原始片段仍存在于新片段内部，改为校验包裹结果存在且唯一。
    assert_hit(shell_js.count(old1), 0, "适配①·原始片段残留校验")
    assert_hit(shell_js.count(new2), 1, "适配②·包裹结果校验")
    assert_hit(shell_js.count(new3), 1, "适配③·包裹结果校验")
    assert_hit(shell_js.count(old4), 0, "适配④·原始片段残留校验")

    return shell_js, stats


# ---------------------------------------------------------------------------
# 守卫脚本
# ---------------------------------------------------------------------------


def build_guard_script(module_id: str, title: str) -> str:
    """生成「单文件导出守卫」脚本：拦截导航点击，仅保留目标模块。"""
    return (
        "(function () {\n"
        "  'use strict';\n"
        "  function exportToast(message) {\n"
        "    var host = document.getElementById('appToastContainer');\n"
        "    if (!host) return;\n"
        "    var el = document.createElement('div');\n"
        "    el.className = 'app-toast';\n"
        "    el.textContent = message;\n"
        "    host.append(el);\n"
        "    setTimeout(function () { el.remove(); }, 2600);\n"
        "  }\n"
        "  function block(event) {\n"
        "    var link = event.target && event.target.closest ? "
        "event.target.closest('a[data-app-route]') : null;\n"
        "    if (!link) return;\n"
        "    event.preventDefault();\n"
        "    event.stopPropagation();\n"
        "    var routeId = link.getAttribute('data-app-route');\n"
        f"    exportToast(routeId === '{module_id}'\n"
        f"      ? '当前已是「{title}」'\n"
        f"      : '本单文件快照仅包含「{title}」模块，未包含该页面');\n"
        "  }\n"
        "  document.addEventListener('click', block, true);\n"
        "  document.addEventListener('auxclick', block, true);\n"
        "})();\n"
    )


# ---------------------------------------------------------------------------
# 装配
# ---------------------------------------------------------------------------


@dataclass
class ExportResult:
    output_path: pathlib.Path
    module_id: str
    title: str
    shell_adaptations: List[Tuple[str, int]] = field(default_factory=list)
    danger_checks: List[Tuple[str, int]] = field(default_factory=list)


def build_standalone(root: pathlib.Path, module_id: str, title: str,
                     module_file: str, reference: pathlib.Path) -> Tuple[str, ExportResult]:
    """装配单文件 HTML，返回 (html, 统计结果)。"""
    index_path = root / "index.html"
    css_path = root / SYSTEM_CSS_REL
    shell_path = root / APP_SHELL_REL
    module_path = root / module_file

    for path in (index_path, css_path, shell_path, module_path, reference):
        if not path.is_file():
            raise ExportError(f"缺少源文件：{path}")

    index_html = index_path.read_text(encoding="utf-8")
    system_css = css_path.read_text(encoding="utf-8")
    shell_js = shell_path.read_text(encoding="utf-8")
    module_js = module_path.read_text(encoding="utf-8")
    reference_html = reference.read_text(encoding="utf-8")

    # --- 从 index.html 提取公共片段 -------------------------------------
    config_block = extract_tailwind_config(index_html)
    body_inner = extract_shell_body(index_html)

    # --- 从先例切取已内联的 Tailwind / lucide 产物 ----------------------
    tailwind_body = extract_inlined_asset(reference_html, TAILWIND_OPEN, "Tailwind 内联体")
    lucide_body = extract_inlined_asset(reference_html, LUCIDE_OPEN, "lucide 内联体")

    # --- 危险序列校验（内联前） -----------------------------------------
    danger_checks: List[Tuple[str, int]] = []
    tailwind_body, tw_hits = escape_script_close(tailwind_body, "Tailwind 内联体")
    lucide_body, lu_hits = escape_script_close(lucide_body, "lucide 内联体")
    config_block, cfg_hits = escape_script_close(config_block, "tailwind.config")
    system_css, css_hits = escape_script_close(system_css, "系统框架.css")
    body_inner, body_hits = escape_script_close(body_inner, "系统壳 HTML")
    module_js, mod_hits = escape_script_close(module_js, module_file)
    danger_checks += [
        ("Tailwind 内联体", tw_hits),
        ("lucide 内联体", lu_hits),
        ("tailwind.config", cfg_hits),
        ("系统框架.css", css_hits),
        ("系统壳 HTML", body_hits),
        (module_file, mod_hits),
    ]

    # --- app-shell 4 处 file:// 适配 ------------------------------------
    shell_js, adaptations = adapt_app_shell(shell_js, module_id)
    shell_js, shell_hits = escape_script_close(shell_js, APP_SHELL_REL)
    danger_checks.append((APP_SHELL_REL, shell_hits))

    # --- 守卫脚本 --------------------------------------------------------
    guard_js = build_guard_script(module_id, title)

    # --- 装配（严格沿用先例顺序与注释措辞） -----------------------------
    parts: List[str] = []
    parts.append("<!DOCTYPE html>\n")
    parts.append("<!--\n")
    parts.append(f"  云登后台 · {title} —— 单文件导出快照\n")
    parts.append(
        "  仅用于设计与前端联调评审：所有样式与脚本已内联，双击即可打开（无需本地服务）。\n"
    )
    parts.append(
        "  生成来源：index.html + Prototype/系统框架.css + "
        f"Prototype/app-shell.js + {module_file}\n"
    )
    parts.append("  注意：本文件为只读快照，修改原型请改源文件后重新导出。\n")
    parts.append("-->\n\n")
    parts.append('<html lang="zh-CN">\n')
    parts.append("<head>\n")
    parts.append('<meta charset="utf-8"/>\n')
    parts.append(
        '<meta content="width=device-width, initial-scale=1.0" name="viewport"/>\n'
    )
    parts.append(f"<title>云登后台 · {title}（单文件导出）</title>\n")
    # Tailwind Play CDN（内联）
    parts.append(TAILWIND_OPEN)
    parts.append(tailwind_body)
    parts.append("</script>\n")
    # lucide UMD（内联）
    parts.append(LUCIDE_OPEN)
    parts.append(lucide_body)
    parts.append("</script>\n")
    # Google Fonts（唯一外部资源，异步 + noscript 回退）
    parts.append(
        f'<link href="{FONT_URL}" media="print" onload="this.media=\'all\'"/>\n'
    )
    parts.append(
        f'<noscript><link href="{FONT_URL}" rel="stylesheet"/></noscript>\n'
    )
    # tailwind.config（内联）
    parts.append("<script>\n")
    parts.append(config_block)
    parts.append("</script>\n")
    # 系统框架.css（内联）
    parts.append("<style>\n")
    parts.append("/* ===== Prototype/系统框架.css（内联） ===== */\n")
    parts.append(system_css)
    parts.append("\n</style></head>\n")
    # 系统壳 HTML
    parts.append("<body>")
    parts.append(body_inner)
    # 业务模块（内联）
    parts.append("<script>\n")
    parts.append(f"/* ===== 业务模块：{module_file}（内联） ===== */\n")
    parts.append(module_js)
    parts.append("\n</script>\n")
    # 框架层 app-shell.js（内联，含 4 处 file:// 适配）
    parts.append("<script>\n")
    parts.append(
        "/* ===== 框架层：Prototype/app-shell.js（内联，含 4 处 file:// 适配） ===== */\n"
    )
    parts.append(shell_js)
    parts.append("\n</script>\n")
    # 单文件导出守卫
    parts.append("<script>\n")
    parts.append(
        f"/* ===== 单文件导出守卫：仅「{title}」可用，其余导航不跳转 ===== */\n"
    )
    parts.append(guard_js)
    parts.append("</script>\n")
    parts.append("</body>\n")
    parts.append("</html>\n")

    html = "".join(parts)
    result = ExportResult(
        output_path=pathlib.Path(""),
        module_id=module_id,
        title=title,
        shell_adaptations=adaptations,
        danger_checks=danger_checks,
    )
    return html, result


# ---------------------------------------------------------------------------
# 产物自检
# ---------------------------------------------------------------------------


def self_check(html: str) -> List[Tuple[str, str, int]]:
    """产物自检：断言无外链 CDN / 无项目内资源引用，返回检查明细。"""
    checks: List[Tuple[str, str, int]] = []

    # 收集所有「资源加载型」标签（script/link/img/iframe/source/video/audio）的
    # src/href 属性；这些属性才会真正发起网络或本地资源请求。
    resource_refs: List[Tuple[str, str, str]] = []
    tag_re = re.compile(r"<(script|link|img|iframe|source|video|audio)\b[^>]*>", re.IGNORECASE)
    attr_re = re.compile(r'\b(src|href)\s*=\s*"([^"]*)"', re.IGNORECASE)
    for tag_match in tag_re.finditer(html):
        tag = tag_match.group(0)
        for attr in attr_re.finditer(tag):
            resource_refs.append((tag_match.group(1).lower(), attr.group(1).lower(), attr.group(2)))

    # 1) 资源加载型标签不得存在指向 CDN 的外链。
    bad_cdn = [
        ref for ref in resource_refs
        if "cdn.tailwindcss.com" in ref[2] or "unpkg.com" in ref[2]
    ]
    assert_hit(len(bad_cdn), 0, "自检·CDN 外链资源")
    checks.append(("CDN 外链资源（cdn.tailwindcss.com / unpkg.com）", "0", len(bad_cdn)))

    # 2) 资源加载型标签不得存在指向项目内相对路径的引用。
    bad_local = [
        ref for ref in resource_refs
        if re.search(r"^(?:\./)?(?:Prototype/|index\.html|modules/)", ref[2])
    ]
    assert_hit(len(bad_local), 0, "自检·项目内相对资源引用")
    checks.append(("项目内相对资源引用（Prototype/、index.html、modules/）", "0", len(bad_local)))

    # 3) 所有 <script> 必须为内联（无 src）；外部资源仅允许 Google Fonts。
    script_src = [ref for ref in resource_refs if ref[0] == "script" and ref[1] == "src"]
    assert_hit(len(script_src), 0, "自检·外部 <script src> 标签")
    checks.append(("外部 <script src> 标签（应为内联）", "0", len(script_src)))

    external = [ref for ref in resource_refs if ref[2].startswith(("http://", "https://"))]
    non_google = [ref for ref in external if "fonts.googleapis.com" not in ref[2]]
    assert_hit(len(non_google), 0, "自检·非 Google Fonts 外部资源")
    assert_hit(len(external), 2, "自检·Google Fonts link 数量")
    checks.append(("外部资源标签（应仅 2 个 Google Fonts）", "2 Google Fonts", len(external)))

    # 4) 关键内联块存在性（各命中 1 次）。
    required = [
        "/* Tailwind Play CDN（内联，离线可用） */",
        "/* lucide UMD（内联，离线可用） */",
        "window.tailwind = window.tailwind || {};",
        "/* ===== Prototype/系统框架.css（内联） ===== */",
        "/* ===== 框架层：Prototype/app-shell.js（内联，含 4 处 file:// 适配） ===== */",
        "/* ===== 单文件导出守卫",
        "<body>",
    ]
    for token in required:
        assert_hit(html.count(token), 1, f"自检·内联块 {token[:24]}")
    checks.append(("关键内联块", "全部命中", len(required)))

    # 5) 说明性统计：品牌锚点 href="index.html?page=home" 为静态导航锚点（非资源加载），
    #    由「单文件导出守卫」在捕获阶段拦截点击，与先例保持一致，属可接受残留。
    brand_anchor = html.count('href="index.html?page=home"')
    checks.append(("导航锚点 href=\"index.html?page=home\"（已被守卫拦截）", "1", brand_anchor))
    return checks


# ---------------------------------------------------------------------------
# 入口
# ---------------------------------------------------------------------------


def parse_args(argv: "List[str]") -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="云登后台 · 单文件导出器（生成自包含、离线可用的单文件 HTML）"
    )
    parser.add_argument(
        "module_id",
        nargs="?",
        default="proxy-replacement",
        help="业务模块 id（如 proxy-replacement），默认 proxy-replacement",
    )
    parser.add_argument("--output", default=None, help="输出文件路径（相对项目根或绝对）")
    parser.add_argument("--title", default=None, help="页面中文标题，如「更换代理」")
    parser.add_argument(
        "--module-file",
        default=None,
        help="模块 JS 相对路径，默认 Prototype/modules/<module-id>.js",
    )
    parser.add_argument("--root", default=None, help="项目根目录，默认脚本上级目录")
    parser.add_argument(
        "--reference",
        default=None,
        help=f"提供已内联 Tailwind/lucide 的先例文件，默认 {DEFAULT_REFERENCE}",
    )
    return parser.parse_args(argv)


def main(argv: "List[str]") -> int:
    args = parse_args(argv)

    if args.root:
        root = pathlib.Path(args.root).resolve()
    else:
        root = pathlib.Path(__file__).resolve().parent.parent

    registry = MODULE_REGISTRY.get(args.module_id, {})
    title = args.title or registry.get("title") or args.module_id
    module_file = args.module_file or registry.get("module_file") or (
        f"Prototype/modules/{args.module_id}.js"
    )
    output = args.output or registry.get("output") or (
        f"exports/{args.module_id}-独立版.html"
    )
    reference = pathlib.Path(args.reference) if args.reference else root / DEFAULT_REFERENCE
    if not reference.is_absolute():
        reference = root / reference

    output_path = pathlib.Path(output)
    if not output_path.is_absolute():
        output_path = root / output_path

    print(f"[导出] 模块      : {args.module_id}")
    print(f"[导出] 标题      : {title}")
    print(f"[导出] 模块文件  : {module_file}")
    print(f"[导出] 先例文件  : {reference}")
    print(f"[导出] 输出路径  : {output_path}")

    html, result = build_standalone(root, args.module_id, title, module_file, reference)
    checks = self_check(html)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(html, encoding="utf-8")

    data = output_path.read_bytes()
    line_count = html.count("\n") + (0 if html.endswith("\n") else 1)

    print("\n===== app-shell file:// 适配命中次数 =====")
    for name, hits in result.shell_adaptations:
        print(f"  {name}: {hits}")
    print("\n===== 内联前危险序列 </script 命中（应全部为 0） =====")
    total_danger = 0
    for name, hits in result.danger_checks:
        total_danger += hits
        print(f"  {name}: {hits}")
    print(f"  合计: {total_danger}")
    print("\n===== 产物自检 =====")
    for name, expect, actual in checks:
        print(f"  {name}: 期望 {expect} / 实际 {actual}")
    print("\n===== 产物统计 =====")
    print(f"  路径    : {output_path}")
    print(f"  字节数  : {len(data)}")
    print(f"  行数    : {line_count}")
    print("\n[完成] 单文件导出成功。")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main(sys.argv[1:]))
    except ExportError as error:
        print(f"\n[导出失败] {error}", file=sys.stderr)
        raise SystemExit(1)
