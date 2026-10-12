// 独立页「exports/出海吧-独立页面.html」内联脚本冒烟：jsdom 环境执行渲染逻辑，验证无运行时错误
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('exports/出海吧-独立页面.html', 'utf8');
const dom = new JSDOM(html, { url: 'http://localhost/exports/出海吧-独立页面.html', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.lucide = { createIcons() {} };
window.matchMedia = window.matchMedia || (() => ({ matches: false, addListener() {}, removeListener() {} }));
window.tailwind = window.tailwind || {};  // CDN 未加载时的 stub（真实浏览器由 tailwind CDN 提供）

const failures = [];
// 分别执行每个内联块（与浏览器行为一致：块间隔离，Tailwind 配置块失败不拖垮主脚本）
[...window.document.querySelectorAll('script:not([src])')].forEach((s, i) => {
  try { window.eval(s.textContent); console.log('[OK] 内联脚本块 ' + (i + 1)); }
  catch (e) { failures.push('执行块' + (i + 1) + ': ' + e.message); console.log('[FAIL] 块' + (i + 1) + ': ' + e.message); }
});

const doc = window.document;
const navItems = doc.querySelectorAll('[data-nav]');
const cards = doc.querySelectorAll('.site-card');
const chips = doc.querySelectorAll('[data-chip]');
console.log('      侧栏导航项: ' + navItems.length + '（应为 13 = 精选 + 12 类型）');
console.log('      网站卡片: ' + cards.length);
console.log('      精选 chips: ' + chips.length);
if (navItems.length !== 13) failures.push('导航项数量 ' + navItems.length);
// 精选站点同时出现在精选聚合组与类型组：28 站点 + 13 精选重复 = 41
if (cards.length !== 41) failures.push('卡片数量 ' + cards.length);

// chips 过滤
try {
  const chip2 = doc.querySelector('[data-chip="t05"]');
  chip2.click();
  const after = doc.querySelectorAll('#group-__featured .site-card').length;
  console.log('      点击「社媒资源」chip 后精选卡片: ' + after + '（应为 3）');
  if (after !== 3) failures.push('chip 过滤数量 ' + after);
  const all = doc.querySelector('[data-chip="all"]');
  all.click();
  console.log('      恢复全部后精选卡片: ' + doc.querySelectorAll('#group-__featured .site-card').length);
} catch (e) { failures.push('chips: ' + e.message); }

// 侧栏收起/展开
try {
  doc.getElementById('collapseBtn').click();
  const w1 = doc.getElementById('sidebar').style.width;
  doc.getElementById('collapseBtn').click();
  const w2 = doc.getElementById('sidebar').style.width;
  console.log('      收起后侧栏宽: ' + w1 + '，展开后: ' + w2);
  if (w1 !== '68px' || w2 !== '220px') failures.push('侧栏收起宽度 ' + w1 + '/' + w2);
} catch (e) { failures.push('collapse: ' + e.message); }

// 精选角标存在（须在 storage 变更前检查：变更后数据无精选站点）
if (!doc.querySelector('.feat-ribbon')) failures.push('缺少精选角标');
// 说明：种子回退路径已由首屏断言覆盖（localStorage 无键时 loadData 回退 SEED，41 张卡片）。

// localStorage 联动：后台写入后 storage 事件应重建
try {
  // 构造一份仅 5 个站点的数据（模拟后台写入），SEED 为 eval 词法绑定不可直接读取
  const mutated = { version: 1, types: [{ id: 't01', name: 'AI 工具', icon: '' }],
                    sites: Array.from({ length: 5 }, (_, i) => ({ id: 'x' + i, name: '站点' + i, url: 'https://x' + i + '.com/', intro: '介绍', typeId: 't01', featured: false, icon: '' })) };
  window.localStorage.setItem('yundeng_overseas_nav_v1', JSON.stringify(mutated));
  window.dispatchEvent(new window.StorageEvent('storage', { key: 'yundeng_overseas_nav_v1' }));
  const after = doc.querySelectorAll('.site-card').length;
  console.log('      storage 联动后卡片数: ' + after + '（应为 5）');
  if (after !== 5) failures.push('storage 联动 ' + after);
} catch (e) { failures.push('storage: ' + e.message); }



/* ---------- 页脚（白色背景）与品牌文字 ---------- */
const styleText = [...doc.querySelectorAll('style')].map((s) => s.textContent).join('\n');
const footer = doc.querySelector('footer.site-footer');
if (!footer) failures.push('缺少页脚 footer.site-footer');
else {
  const q = (sel) => !!footer.querySelector(sel);
  console.log('      页脚列标题: ' + [...footer.querySelectorAll('.site-footer-col-title')].map((h) => h.textContent.trim()).join(' / '));
  console.log('      产品链接(云登指纹浏览器): ' + q('a[href="https://www.yunlogin.com/"]'));
  console.log('      服务协议链接: ' + q('a[href="https://www.yunlogin.com/v2/news/userAgreement.html"]')
            + '，隐私政策链接: ' + q('a[href="https://www.yunlogin.com/v2/news/privacyAgreement.html"]'));
  if (!q('a[href="https://www.yunlogin.com/"]')) failures.push('缺少产品链接');
  if (!q('a[href="https://www.yunlogin.com/v2/news/userAgreement.html"]')) failures.push('缺少服务协议链接');
  if (!q('a[href="https://www.yunlogin.com/v2/news/privacyAgreement.html"]')) failures.push('缺少隐私政策链接');
  console.log('      联系方式图标数: ' + footer.querySelectorAll('.contact-item').length + '（应为 3）');
  if (footer.querySelectorAll('.contact-item').length !== 3) failures.push('联系方式图标数不是 3');
  console.log('      邮箱 mailto：' + q('a[href="mailto:service@yunlogin.com"]')
            + '，邮箱地址浮层: ' + (footer.querySelector('#pop-mail') || {}).textContent);
  if (!q('a[href="mailto:service@yunlogin.com"]')) failures.push('缺少邮箱 mailto 链接');
  if ((footer.querySelector('#pop-mail') || {}).textContent !== 'service@yunlogin.com') failures.push('邮箱浮层文案不符');
  console.log('      二维码占位槽: ' + footer.querySelectorAll('.qr-slot').length + '（应为 2）');
  if (footer.querySelectorAll('.qr-slot').length !== 2) failures.push('二维码占位槽不是 2');
  const legal = (footer.querySelector('.site-footer-legal') || {}).textContent || '';
  ['杭州辰链信息科技有限公司', '浙公安网备 33010902003507号', '浙ICP备2022019151号-6', '© 版权所有'].forEach((frag) => {
    if (!legal.includes(frag)) failures.push('法务行缺少「' + frag + '」');
  });
  console.log('      法务行: ' + legal);
  /* 选择器有效性（防「类名写错导致规则零匹配」，同 2026-10-12 文本域缺陷教训） */
  ['#pop-wechat|.contact-pop', '#pop-service|.contact-pop', '#pop-mail|.contact-pop-email'].forEach((pair) => {
    const [id, cls] = pair.split('|');
    const el = doc.querySelector(id);
    if (!el) { failures.push('缺少元素 ' + id); return; }
    if (!el.matches(cls)) failures.push(id + ' 不匹配 ' + cls);
  });
  if (!footer.matches('.site-footer')) failures.push('footer 不匹配 .site-footer');
  if (!doc.querySelector('.contact-btn')) failures.push('缺少 .contact-btn');
  /* 浮层显隐规则（hover 与 focus-within 共用同一声明块，缺一不可） */
  ['.contact-item:hover .contact-pop', '.contact-item:focus-within .contact-pop', '.site-footer {'].forEach((frag) => {
    if (!styleText.includes(frag)) failures.push('样式缺少规则: ' + frag.trim());
  });
  console.log('      浮层规则(hover/focus-within)齐全: ' + (styleText.includes('.contact-item:hover .contact-pop') && styleText.includes('.contact-item:focus-within .contact-pop')));
  console.log('      页脚白色背景声明: ' + /\.site-footer\s*\{[^}]*background:\s*#fff/.test(styleText));
  if (!/\.site-footer\s*\{[^}]*background:\s*#fff/.test(styleText)) failures.push('页脚未声明白色背景');
  /* 页脚内缩 20px + 8px 圆角（间距由 Tailwind mx-5/mb-5 提供，圆角与四边描边由 .site-footer 声明） */
  console.log('      页脚左右/底部间距类: mx-5=' + footer.classList.contains('mx-5') + '，mb-5=' + footer.classList.contains('mb-5'));
  if (!footer.classList.contains('mx-5') || !footer.classList.contains('mb-5')) failures.push('页脚缺少 20px 间距类(mx-5/mb-5)');
  console.log('      页脚 8px 圆角声明: ' + /\.site-footer\s*\{[^}]*border-radius:\s*8px/.test(styleText)
            + '，四边描边: ' + /\.site-footer\s*\{[^}]*border:\s*1px solid/.test(styleText));
  if (!/\.site-footer\s*\{[^}]*border-radius:\s*8px/.test(styleText)) failures.push('页脚未声明 8px 圆角');
  if (!/\.site-footer\s*\{[^}]*border:\s*1px solid/.test(styleText)) failures.push('页脚未声明四边描边');
  /* 公安备案徽标（内嵌 base64，位于「浙公安网备」文字之前） */
  const badge = footer.querySelector('img.gongan-badge');
  console.log('      公安备案徽标: ' + !!badge
            + '，data URI PNG: ' + (!!(badge && (badge.getAttribute('src') || '').startsWith('data:image/png;base64,')))
            + '，alt=' + (badge ? badge.getAttribute('alt') : 'n/a'));
  if (!badge) failures.push('缺少公安备案徽标 img.gongan-badge');
  else {
    if (!(badge.getAttribute('src') || '').startsWith('data:image/png;base64,')) failures.push('徽标未内嵌为 data URI PNG');
    if (badge.getAttribute('alt') !== '公安备案徽标') failures.push('徽标 alt 不符');
    if (!/\.gongan-badge\s*\{[^}]*height:\s*20px/.test(styleText)) failures.push('缺少徽标尺寸规则 .gongan-badge');
    if (!badge.previousSibling || String(badge.previousSibling.textContent || '').indexOf('|') < 0) failures.push('徽标未紧跟公司名分隔符之后');
    if (!badge.nextSibling || badge.nextSibling.textContent.indexOf('浙公安网备') !== 0) failures.push('徽标后未紧跟「浙公安网备」');
  }
  if (!/prefers-reduced-motion/.test(styleText)) failures.push('缺少 reduced-motion 降级');
  /* 参考图样式：深色联系方式图标 / 浅灰栏目标题 / 回到顶部按钮 */
  console.log('      联系方式图标深色底: ' + /\.contact-btn\s*\{[^}]*background:\s*#1A1D24/.test(styleText));
  if (!/\.contact-btn\s*\{[^}]*background:\s*#1A1D24/.test(styleText)) failures.push('联系方式图标未改为深色底');
  console.log('      栏目标题浅灰(ink.body): ' + /\.site-footer-col-title\s*\{[^}]*color:\s*#3A3F4A/.test(styleText));
  if (!/\.site-footer-col-title\s*\{[^}]*color:\s*#3A3F4A/.test(styleText)) failures.push('栏目标题未改为浅灰');
  const totopBtn = doc.getElementById('totopBtn');
  const totopTip = doc.getElementById('totop-tip');
  console.log('      回到顶部按钮: ' + !!totopBtn + '，aria-label=' + (totopBtn ? totopBtn.getAttribute('aria-label') : 'n/a')
            + '，提示语=「' + (totopTip ? totopTip.textContent : 'n/a') + '」');
  if (!totopBtn) failures.push('缺少 #totopBtn');
  else {
    if (totopBtn.getAttribute('aria-label') !== '回到顶部') failures.push('回到顶部 aria-label 不符');
    if (totopBtn.getAttribute('aria-describedby') !== 'totop-tip') failures.push('回到顶部未关联提示语 aria-describedby');
    if (!totopBtn.matches('.totop-btn')) failures.push('#totopBtn 不匹配 .totop-btn');
  }
  if (!totopTip || totopTip.textContent !== '回到顶部') failures.push('缺少提示语「回到顶部」');
  const flat = styleText.replace(/\s+/g, '');
  ['.totop-wrap{position:fixed', '.totop-wrap:hover .totop-tip', '.totop-wrap:focus-within .totop-tip'].forEach((frag) => {
    if (!flat.includes(frag.replace(/\s+/g, ''))) failures.push('样式缺少: ' + frag);
  });
  const mainScript = [...doc.querySelectorAll('script:not([src])')].map((s) => s.textContent).join('\n');
  if (!/scrollTop = start \* \(1 - p\)/.test(mainScript)) failures.push('未找到线性滚动实现');
}
/* 产品名称「出海吧」应整段黑色（不得残留彩色片段） */
const brand = doc.querySelector('header span.text-\\[17px\\]');
console.log('      顶部品牌文字: 「' + (brand ? brand.textContent : '(未找到)') + '」，含彩色子节点: ' + (brand ? !!brand.querySelector('.text-primary') : 'n/a'));
if (!brand) failures.push('未找到顶部品牌文字');
else {
  if (brand.textContent !== '出海吧') failures.push('品牌文字不是「出海吧」: ' + brand.textContent);
  if (brand.querySelector('.text-primary')) failures.push('品牌文字仍含彩色片段');
}
const footerBrand = footer && footer.querySelector('span.text-\\[15px\\]');
console.log('      页脚品牌文字: 「' + (footerBrand ? footerBrand.textContent : '(未找到)') + '」');
if (!footerBrand || footerBrand.textContent !== '出海吧') failures.push('页脚品牌文字不符');

console.log('\n================ 汇总 ================');
if (failures.length === 0) console.log('全部通过。');
else { failures.forEach((f, i) => console.log('  ' + (i + 1) + '. ' + f)); process.exitCode = 1; }
