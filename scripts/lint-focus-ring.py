#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""云登后台 · 焦点态「双描边」缺陷检查器（focus-ring linter）。

对应规范：``design.md`` §5.13「焦点态（Focus）—— 单一指示铁律」。

缺陷定义（即用户反馈的「筛选条件组件出现两个蓝色描边」）：

    同一模块内既给输入类控件设置了 ``:focus`` 的柔光环
        .control:focus { border-color:#0066FF; box-shadow:0 0 0 2px rgba(0,102,255,.12); }
    又存在一条会把 ``input`` / ``select`` 命中的 ``:focus-visible`` 实心描边规则
        :is(button,input,select):focus-visible { outline:2px solid #0066FF; ... }

由于 ``:focus-visible`` 对文本输入框恒定命中（鼠标点击也一样），两套指示必然叠加，
渲染为两圈蓝色描边。正确写法是在描边规则中显式排除 ``.control`` / ``.pg-jump-input``：

    .xx-module .control:focus-visible,
    .xx-module .pg-jump-input:focus-visible { outline:none; outline-offset:0; }
    .xx-module :is(button,input,select):not(.control):not(.pg-jump-input):focus-visible {
        outline:2px solid #0066FF; outline-offset:2px;
    }

判定分档（静态分析只能逼近，因此分档而非一刀切）
--------------------------------------------------

* ``hit``   —— 描边规则**必定/极可能**与焦点环落在同一元素上：
               直接点名焦点环类（如 ``.control:focus-visible``）、
               裸 ``input`` / ``select`` 无差别扫射、
               或 ``:is()`` / ``:where()`` 扫射中含 ``input`` / ``select``。
               命中即报错（阻止缺陷回流）。
* ``maybe`` —— 描边规则涉及 ``input`` / ``select``，但被**非焦点环类**的祖先类限定
               （如 ``.invoice-proxy-radio-group input[type=radio]:focus-visible``）。
               两者元素集合是否相交静态不可证伪，故**不阻断**，仅列为「待复核」。
* ``none``  —— 不涉及输入类控件，或已显式排除全部输入类控件（合格写法）。

为什么「只加 ``:not(.control)`` 排除、不额外写 ``outline:none``」也能通过？
因为判定的是同一元素是否被**两套自定义指示**同时命中，前提是该元素的描边已被排除。
此时浏览器 UA 样式表虽会对 ``:focus-visible`` 施加默认焦点环，但作者样式优先于 UA 样式，
模块基类 ``.control{...;outline:none}`` 已把它压掉，故最终只剩柔光环一套。
**该前提由 ``.workbuddy/smoke-test-*.js`` 的「.control 基类已 outline:none」断言守住**——
一旦有人删掉基类重置，双描边会以「UA 默认环 + 柔光环」的形式重新出现，而本检查器
从描边规则文本上无法察觉，所以两边必须配套。

用法::

    python3 scripts/lint-focus-ring.py            # 检查；新出现的违规会以非 0 退出码报错
    python3 scripts/lint-focus-ring.py --strict   # 忽略历史豁免，任何 hit 都报错（交付前把关）
    python3 scripts/lint-focus-ring.py --list     # 仅列出全部 :focus 相关规则，便于人工复核
    python3 scripts/lint-focus-ring.py --why      # 打印每处判定所属分档及理由

行为约定：

* ``KNOWN_PENDING`` 记录**已知但尚未修复**的模块。它们会被打印为待办，但**不影响退出码**，
  避免检查器长期处于红态而失去约束力。**修复后请从该集合中删除对应条目。**
* ``JUSTIFIED`` 记录**经人工复核确认不构成缺陷**的 ``maybe`` 规则及其理由，
  在输出中降为一行说明，避免每次运行都要重新复核同一处。
* 任何不在 ``KNOWN_PENDING`` 中的 ``hit`` 都会以退出码 1 结束，从而阻止「双描边」再次进入代码库。
"""

from __future__ import annotations

import argparse
import pathlib
import re
import sys
from typing import Dict, List, Set, Tuple

# ---------------------------------------------------------------------------
# 常量
# ---------------------------------------------------------------------------

#: 模块目录（相对项目根）。
MODULES_REL = "Prototype/modules"

#: 已知存在「双描边」缺陷、但本轮未修复的模块。修复后必须从此集合删除。
#: 这三个模块与本轮修复的 proxy-exception-log.js 属同一缺陷模式：
#: 它们既有 ``.control:focus`` 柔光环，又有会把 input/select 命中的描边规则。
KNOWN_PENDING = {
    "environment-management.js",
    "member-list.js",
    "user-statistics.js",
}

#: 经人工复核，确认**不构成**双描边的 ``maybe`` 规则。键为 ``(模块名, 选择器前缀)``。
JUSTIFIED: Dict[Tuple[str, str], str] = {
    (
        "billing-invoice.js",
        ".invoice-proxy-radio-group input[type=radio]",
    ): "具名单选组内的 appearance:radio 原生控件（13px），模块焦点环键在 .invoice-control / "
       ".invoice-page-jump-input / .invoice-textarea 等类上，与本规则指向的元素集合不相交；"
       "该规则正是「给原生 radio 补单一键盘焦点指示」的正确写法（默认 outline:0）。",
}

#: 输入类控件的类名（其焦点由柔光环承担，描边规则必须排除它们）。
INPUT_CLASSES = ("control", "pg-jump-input")

#: 柔光环声明特征。
RING_DECL_RE = re.compile(r"box-shadow\s*:\s*0\s+0\s+0\s+2px")

#: 实心描边声明特征（outline: none 不算）。
OUTLINE_DECL_RE = re.compile(r"outline\s*:\s*(?:1|1\.5|2)px")

#: CSS 规则切分：``选择器 { 声明 }``。``@media`` 包裹层因含嵌套花括号而不会被整体匹配，
#: 其内部规则会被逐个正常捕获。
RULE_RE = re.compile(r"([^{}]+)\{([^{}]*)\}")

#: CSS 注释（须在切分规则前剥离，否则注释文本会被并进选择器）。
COMMENT_RE = re.compile(r"/\*.*?\*/", re.S)

#: 类名 token（``.control`` → ``control``）。
CLASS_TOKEN_RE = re.compile(r"\.([A-Za-z0-9_-]+)")

#: 复合选择器中落在 ``input`` / ``select`` 标签上的位置。
INPUT_TAG_RE = re.compile(r"(?:^|[\s>+~])(?:input|select)\b")


# ---------------------------------------------------------------------------
# 解析
# ---------------------------------------------------------------------------

def read_module_css(path: pathlib.Path) -> str:
    """读取模块文件中的样式文本。

    模块存在两种形态：手写 JS 对象的模板字符串（``styles: [`...`]``）与
    JSON 字符串数组（``"styles": ["..."]``）。为覆盖两种形态，这里读取整份文件并把
    转义还原（``\\n`` → 换行、``\\"`` → 引号）后再剥离注释，最后交给规则正则处理。

    注意：JSON-string 型模块（如 ``user-list.js``）里换行是**多重转义**的（``\\\\n``），
    一次 ``replace`` 会残留裸反斜杠，导致选择器被判为「缺少作用域前缀」。这里用
    ``\\\\{1,3}n`` 一次性吃掉 1~3 个反斜杠，保证还原干净。
    """
    text = path.read_text(encoding="utf-8")
    text = re.sub(r"\\{1,3}n", "\n", text)
    text = text.replace('\\"', '"').replace("\\/", "/")
    return COMMENT_RE.sub(" ", text)


def focus_rules(css: str) -> Tuple[List[str], List[str]]:
    """返回 ``(ring_rules, outline_rules)`` 两组选择器文本。"""
    ring_rules: List[str] = []
    outline_rules: List[str] = []
    for match in RULE_RE.finditer(css):
        selector = match.group(1).strip()
        body = match.group(2)
        if ":focus" not in selector:
            continue
        # 柔光环规则：:focus（不含 -visible 后缀）且声明了 2px box-shadow 环
        bare_focus = re.sub(r":focus-visible", "", selector)
        if re.search(r":focus(?![-a-z])", bare_focus) and RING_DECL_RE.search(body):
            ring_rules.append(selector)
        # 实心描边规则：:focus-visible 且声明了可见 outline
        if ":focus-visible" in selector and OUTLINE_DECL_RE.search(body):
            outline_rules.append(selector)
    return ring_rules, outline_rules


def ring_key_classes(ring_rules: List[str]) -> Set[str]:
    """提取各焦点环规则所「挂靠」的类名（``.control:focus`` → ``control``）。

    这些类名就是柔光环的载体；一旦描边规则点名了其中任一，同一元素必然双描边。
    """
    keys: Set[str] = set()
    for selector in ring_rules:
        for part in selector.split(","):
            head = part.split(":focus")[0]
            tokens = CLASS_TOKEN_RE.findall(head)
            if tokens:
                keys.add(tokens[-1])
    return keys


def classify(selector: str, key_classes: Set[str]) -> str:
    """判定描边规则与模块焦点环的重叠可能性：``hit`` / ``maybe`` / ``none``。"""
    # 合格写法：显式排除全部输入类控件。
    if INPUT_CLASSES and all(f":not(.{c})" in selector for c in INPUT_CLASSES):
        return "none"
    # 直接点名输入类控件（如 .control:focus-visible）—— 必定与柔光环落在同一元素。
    if any(f".{c}" in selector for c in INPUT_CLASSES):
        return "hit"

    verdict = "none"
    for part in selector.split(","):
        head = part.split(":focus")[0].strip()
        compound = re.sub(r"\[[^\]]*\]", "", head).strip()
        if not INPUT_TAG_RE.search(compound):
            continue
        # :is() / :where() 扫射、或裸 input/select（无任何类限定）—— 必定命中 .control 载体。
        if re.search(r":(?:is|where)\(", head):
            return "hit"
        tokens = CLASS_TOKEN_RE.findall(head.split(":is(")[0])
        if not tokens:
            return "hit"
        # 被「非焦点环类」的祖先类限定 —— 静态不可证伪，降为待复核。
        if any(t in key_classes for t in tokens):
            return "hit"
        verdict = "maybe"
    return verdict


def unscoped(selector: str) -> bool:
    """判断描边规则是否缺少模块作用域前缀（模块样式注入 <head>，裸选择器会越界）。"""
    first = selector.split(",")[0]
    first = first.split(":focus")[0].strip().lstrip("\\").strip()
    return not first.startswith(".")


def justified_reason(module: str, selector: str) -> str | None:
    """返回命中 ``JUSTIFIED`` 的理由；未命中返回 ``None``。"""
    for (name, prefix), reason in JUSTIFIED.items():
        if name == module and prefix in selector:
            return reason
    return None


# ---------------------------------------------------------------------------
# 主流程
# ---------------------------------------------------------------------------


def main(argv: List[str]) -> int:
    parser = argparse.ArgumentParser(description="云登后台 · 焦点态双描边缺陷检查器（design.md §5.13）")
    parser.add_argument("--root", default=None, help="项目根目录，默认脚本上级目录")
    parser.add_argument("--strict", action="store_true", help="忽略 KNOWN_PENDING 豁免，任何 hit 都报错")
    parser.add_argument("--list", action="store_true", help="仅列出全部 :focus 相关规则，不做判定")
    parser.add_argument("--why", action="store_true", help="打印每处判定所属分档及理由")
    args = parser.parse_args(argv)

    root = pathlib.Path(args.root).resolve() if args.root else pathlib.Path(__file__).resolve().parent.parent
    modules_dir = root / MODULES_REL
    if not modules_dir.is_dir():
        print(f"[错误] 找不到模块目录：{modules_dir}", file=sys.stderr)
        return 2

    violations: List[Tuple[str, List[str]]] = []
    pending_hits: List[Tuple[str, List[str]]] = []
    review: List[Tuple[str, List[str]]] = []
    justified: List[Tuple[str, str]] = []
    unscoped_warnings: List[Tuple[str, List[str]]] = []
    scanned = 0

    for path in sorted(modules_dir.glob("*.js")):
        scanned += 1
        ring_rules, outline_rules = focus_rules(read_module_css(path))
        if args.list:
            if ring_rules or outline_rules:
                print(f"\n{path.name}")
                for s in ring_rules:
                    print(f"    [光环] {s}")
                for s in outline_rules:
                    print(f"    [描边] {s}")
            continue

        keys = ring_key_classes(ring_rules)
        hits: List[str] = []
        maybe: List[str] = []
        for s in outline_rules:
            verdict = classify(s, keys)
            if verdict == "hit":
                hits.append(s)
            elif verdict == "maybe":
                reason = justified_reason(path.name, s)
                if reason:
                    justified.append((f"{path.name}：{s}", reason))
                else:
                    maybe.append(s)

        if hits and ring_rules:
            if path.name in KNOWN_PENDING and not args.strict:
                pending_hits.append((path.name, hits))
            else:
                violations.append((path.name, hits))
        if maybe:
            review.append((path.name, maybe))
        unscoped_warnings.append((path.name, [s for s in outline_rules if unscoped(s)]))

        if args.why:
            for s in outline_rules:
                print(f"  {path.name} -> {classify(s, keys):5s} : {s[:96]}")

    if args.list:
        print(f"\n共扫描 {scanned} 个模块。")
        return 0

    unscoped_warnings = [(n, s) for n, s in unscoped_warnings if s]

    print("=" * 66)
    print("焦点态「双描边」检查（design.md §5.13）")
    print("=" * 66)
    print(f"扫描模块数：{scanned}")

    if pending_hits:
        print(f"\n[待修复] 已知历史缺陷 {len(pending_hits)} 项（不影响退出码，修复后请从 KNOWN_PENDING 移除）：")
        for name, sels in pending_hits:
            print(f"  · {name}")
            for s in sels:
                print(f"      ↳ {s[:112]}")

    if review:
        print(f"\n[待复核] 静态不可证否 {len(review)} 项（不阻断；若确认无害请登记进 JUSTIFIED）：")
        for name, sels in review:
            for s in sels:
                print(f"  · {name}：{s[:104]}")

    if unscoped_warnings:
        print(f"\n[提示] 缺少模块作用域前缀的描边规则 {len(unscoped_warnings)} 项（不阻断，建议补 .xx-module）：")
        for name, sels in unscoped_warnings:
            for s in sels:
                print(f"  · {name}：{s[:100]}")

    if justified:
        print(f"\n[已复核] 经确认无害 {len(justified)} 项：")
        for label, reason in justified:
            print(f"  · {label[:96]}")
            print(f"      理由：{reason}")

    print("\n合格写法：")
    print("  .xx-module .control:focus-visible,")
    print("  .xx-module .pg-jump-input:focus-visible { outline:none; outline-offset:0; }")
    print("  .xx-module :is(button,input,select):not(.control):not(.pg-jump-input):focus-visible {")
    print("      outline:2px solid #0066FF; outline-offset:2px; }")

    if violations:
        print(f"\n[失败] 新出现的「双描边」违规 {len(violations)} 项：")
        for name, sels in violations:
            print(f"  ✗ {name}")
            for s in sels:
                print(f"      ↳ {s[:112]}")
        print("\n请按上方「合格写法」在描边规则中显式排除 .control / .pg-jump-input，")
        print("并同步模块的 MODULE_VERSION 与 index.html 的 ?v= 缓存版本号。")
        return 1

    print("\n[通过] 未发现新的「双描边」违规。")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main(sys.argv[1:]))
    except KeyboardInterrupt:
        raise SystemExit(130)
