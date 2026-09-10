export const __rspack_esm_id = 9456;
export const __rspack_esm_ids = [9456];
export const __webpack_modules__ = {
  39555(e, o, t) {
    let a = `article-footer-last-modified = 此页面最后更新于 <time data-l10n-name="date">{ $date }</time>，由 <a data-l10n-name="contributors">MDN 贡献者</a>更新。
article-footer-source-title = 文件夹：{ $folder }（在新标签页中打开）
baseline-asterisk = 此特性的某些部分的支持程度可能有所不同。
baseline-high-extra = 自 { $date } 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。
baseline-low-extra = 自 { $date } 起，此特性已在最新浏览器中得到支持。但在较旧的设备或浏览器中可能无法运行。
baseline-not-extra = 此特性不属于基线，因为它尚未在主流浏览器中得到支持。
baseline-supported-in = 在 { $browsers } 中得到广泛支持
baseline-unsupported-in = 在 { $browsers } 中未被广泛支持
baseline-supported-and-unsupported-in = 在 { $supported } 中得到广泛支持，但在 { $unsupported } 中未被广泛支持
homepage-hero-title = 开发者的资源，<br>由开发者打造
homepage-hero-description = 自 2005 年以来，持续记录 <a data-l10n-name="css">CSS</a>、<a data-l10n-name="html">HTML</a> 和 <a data-l10n-name="js">JavaScript</a>。
not-found-title = 找不到页面
not-found-description = 抱歉，找不到页面 <code data-l10n-name="url">{ $url }</code>。
not-found-fallback-english = <strong data-l10n-name="strong">好消息：</strong>您请求的页面存在<em data-l10n-name="em">英文版本</em>。
not-found-fallback-search = 您请求的页面不存在，但您可以尝试站内搜索：
not-found-back = 返回首页
footer-copyright = 本内容的部分版权归 mozilla.org 贡献者所有，\xa91998–{ $year }。内容依据<a data-l10n-name="cc">知识共享许可协议</a>提供。
search-modal-site-search = 站内搜索 <em>{ $query }</em>
site-search-search-stats = 找到 { $results } 个文档。
site-search-suggestion-matches =
    { $relation ->
        [gt]
            超过 { $matches ->
                [one] { $matches } 个匹配项
               *[other] { $matches } 个匹配项
            }
       *[eq]
            { $matches ->
                [one] { $matches } 个匹配项
               *[other] { $matches } 个匹配项
            }
    }
blog-time-to-read =
    { $minutes ->
        [one] 阅读需 { $minutes } 分钟
       *[other] 阅读需 { $minutes } 分钟
    }
-brand-name-obs = HTTP Observatory
obs-report = 报告
obs-title = { -brand-name-obs }
obs-landing-intro = { -brand-name-obs } 于 2016 年推出，通过分析网站对安全最佳实践的符合情况来提升 Web 安全性。它已通过 4700 万次扫描为超过 690 万个网站提供了洞察。
obs-assessment = 由 Mozilla 开发的 { -brand-name-obs } 会对网站的 HTTP 标头及其他关键安全配置进行深入分析。
obs-scanning = 其自动化扫描流程会为开发者和网站管理员提供详细且可执行的反馈，重点在于识别并解决潜在的安全漏洞。
obs-security = 在不断发展的数字环境中，该工具对于帮助开发者和网站管理员提升网站抵御常见安全威胁的能力至关重要。
obs-mdn = { -brand-name-obs } 依托 Mozilla 的专业知识及其对更安全互联网的承诺，并基于成熟的趋势和指南，提供有效的安全洞察。
compat-browser-version-date = { $browser } { $version }——发布日期：{ $date }
compat-browser-version-released = 发布日期：{ $date }
compat-link-source-title = 文件：{ $filename }
compat-support-removed = 已在 { $version } 及更高版本中移除
compat-support-see-impl-url = 参见 <a data-l10n-name="impl_url">{ $label }</a>
compat-support-flags =
    { $has_added ->
        [1] 自版本 { $version_added } 起
       *[0] { "" }
    }{ $has_last ->
        [1]
            { $has_added ->
               *[0] 截至 { $versionLast }，用户
                [1] { " " }截至 { $versionLast }，用户
            }
       *[0]
            { $has_added ->
               *[0] 用户
                [1] { " " }用户
            }
    }
    { " " }必须显式将 <code data-l10n-name="name">{ $flag_name }</code>{ " " }
    { $flag_type ->
       *[preference] 首选项
        [runtime_flag] 运行时标志
    }{ $has_value ->
        [1] { " " }设置为 <code data-l10n-name="value">{ $flag_value }</code>
       *[0] { "" }
    }{ "。" }
    { $has_pref_url ->
        [1]
            { $flag_type ->
                [preference] 要更改 { $browser_name } 中的首选项，请访问 { $browser_pref_url }。
               *[other] { "" }
            }
        *[0] { "" }
    }
compat-legend-yes = { compat-support-full }
compat-legend-partial = { compat-support-partial }
compat-legend-preview = 开发中。在预发布版本中受支持。
compat-legend-no = { compat-support-no }
compat-legend-unknown = 兼容性未知
compat-legend-experimental = { compat-experimental }。预计未来行为可能会发生变化。
compat-legend-nonstandard = { compat-nonstandard }。使用前请检查跨浏览器支持情况。
compat-legend-deprecated = { compat-deprecated }。不建议在新网站中使用。
compat-legend-footnote = 参见实现说明。
compat-legend-disabled = 用户必须显式启用此特性。
compat-legend-altname = 使用了非标准名称。
compat-legend-prefix = 使用时需要厂商前缀或不同名称。
compat-legend-more = 含有更多兼容性信息。
placement-note = 广告
placement-no = 不想看到广告？
pagination-next = 下一页
pagination-prev = 上一页
pagination-current = 当前页
pagination-goto = 前往第 { $page } 页
logout = 退出登录
login = 登录
example-play-button-label = 运行
example-play-button-title = 在 MDN 演练场中运行示例（将在新标签页中打开）
writer-reload-polling = 每 { $seconds } 秒轮询一次
a11y-menu-skip-to-main-content = 跳转到主要内容
a11y-menu-skip-to-search = 跳转到搜索
article-footer-title = 帮助改进 MDN
article-footer-learn-how-to-contribute = 了解如何参与贡献
article-footer-view-this-page-on-github = 在 GitHub 上查看此页面
article-footer-this-will-take-you-to-github-to = 这将带您前往 GitHub 提交新问题。
article-footer-report-a-problem-with-this-conte = 报告此内容的问题
baseline-indicator-baseline-cross = 基线（不可用）
baseline-indicator-baseline-check = 基线（可用）
baseline-indicator-limited-availability = 有限可用
baseline-indicator-baseline = 基线
baseline-indicator-widely-available = 广泛可用
baseline-indicator-newly-available = 最近可用
baseline-indicator-check = 可用
baseline-indicator-cross = 不可用
baseline-indicator-learn-more = 了解更多
baseline-indicator-see-full-compatibility = 查看完整兼容性
baseline-indicator-report-feedback = 提交反馈
blog-previous = 上一篇文章
blog-next = 下一篇文章
blog-index-blog-it-better = Blog it better
reference-toc-header = 本文内容
blog-post-not-found = 找不到博客文章。
collection-save-button-save-in-collection = 保存到收藏集
collection-save-button-remove = 移除
collection-save-button-save = 保存
collection-save-button-add-to-collection = 添加到收藏集
collection-save-button-collection = 收藏集：
collection-save-button-saved-articles = 已收藏文章
collection-save-button-new-collection = 新建收藏集
collection-save-button-name = 名称：
collection-save-button-note = 备注：
collection-save-button-saving = 正在保存……
collection-save-button-cancel = 取消
collection-save-button-deleting = 正在删除……
collection-save-button-delete = 删除
theme-default = 跟随系统
color-theme-light = 浅色
color-theme-dark = 深色
color-theme-switch-color-theme = 切换主题颜色
color-theme-theme = 主题
compat-link-report-issue-title = 报告此兼容性数据中的问题
compat-link-report-issue = 报告此兼容性数据的问题
compat-link-source = 在 GitHub 上查看数据
compat-experimental = 实验性
compat-deprecated = 已弃用
compat-nonstandard = 非标准
compat-support-partial = 部分支持
compat-support-preview-browser = 预览版浏览器支持
compat-support-full = 完全支持
compat-support-no = 不支持
compat-support-unknown = 支持情况未知
compat-yes = 是
compat-partial = 部分
compat-no = 否
compat-support-preview = 预览支持
compat-legend = 图例
compat-legend-tip = 提示：您可以点击/轻触单元格以获取更多信息。
compat-link-report-missing-title = 报告缺失的兼容性数据
compat-link-report-missing = 报告此问题
compat-js-required = 启用 JavaScript 以查看此浏览器兼容性表。
compat-loading = 加载中……
content-feedback-content-is-out-of-date = 内容已过时
content-feedback-missing-information = 缺少信息
content-feedback-code-examples-not-working-as-exp = 代码示例未按预期工作
content-feedback-other = 其他
content-feedback-question = 此页面对您有帮助吗？
content-feedback-yes = 是
content-feedback-no = 否
content-feedback-reason = 为什么此页面对您没有帮助？
content-feedback-submit = 提交
content-feedback-thanks = 感谢您的反馈！
contributor-spotlight-want-to-be-part-of-the-journey = 想成为这段旅程的一部分吗？
contributor-spotlight-our-constant-quest-for-innovatio = 我们对创新的不懈追求始于此，也始于您。MDN 的每一部分（文档、演示以及网站本身）都源于我们了不起的开放开发者社区。欢迎加入我们！
contributor-spotlight-get-involved = 参与进来
contributor-spotlight-contributor-profile = 贡献者资料
copy-button-copied = 已复制
copy-button-copy-failed = 复制失败！
copy-button-copy = 复制
footer-mdn-on-github = MDN GitHub 主页
footer-mdn-on-bluesky = MDN Bluesky 账号
footer-mdn-on-x = MDN X 账号
footer-mdn-on-mastodon = MDN Mastodon 账号
footer-mdn-blog-rss-feed = MDN 博客 RSS 订阅源
footer-mdn = MDN
footer-about = 关于
footer-blog = 博客
footer-mozilla-careers = Mozilla 招聘
footer-advertise-with-us = 与我们合作投放广告
footer-mdn-plus = MDN Plus
footer-product-help = 产品帮助
footer-contribute = 参与贡献
footer-mdn-community = MDN 社区
footer-community-resources = 社区资源
footer-writing-guidelines = 写作指南
footer-mdn-discord = MDN Discord
footer-developers = 开发者
footer-web-technologies = Web 技术
footer-learn-web-development = 学习 Web 开发
footer-guides = 指南
footer-tutorials = 教程
footer-glossary = 术语表
footer-hacks-blog = Hacks 博客
footer-website-privacy-notice = 网站隐私声明
footer-telemetry-settings = 遥测设置
footer-legal = 法律声明
footer-community-participation-guidelin = 社区参与准则
footer-mdn-logo = MDN 标志
footer-tagline = 构建更美好互联网的蓝图。
footer-mozilla-logo = Mozilla 标志
generic-toc__header = 本文内容
homepage-body-featured-articles = 精选文章
homepage-body-latest-news = 最新消息
homepage-body-recent-contributions = 最近贡献
homepage-contributor-spotlight-contributor-spotlight = 贡献者聚焦
homepage-contributor-spotlight-get-involved = 参与进来
homepage-search-search-the-site = 搜索本站
homepage-search-search = 搜索
interactive-example-reset = 重置
interactive-example-value-select = 值选择
interactive-example-the-current-value-is-not-support = 当前值不受您的浏览器支持。
interactive-example-run-example-and-show-console-ou = 运行示例并显示控制台输出
interactive-example-run = 运行
interactive-example-reset-example-and-clear-console = 重置示例并清空控制台输出
interactive-example-console-output = 控制台输出
interactive-example-output = 输出
issues-table-loading-issues = 正在加载问题……
issues-table-title = 标题
issues-table-repository = 仓库
language-switcher-remember-language = 记住语言
language-switcher-enable-this-setting-to-always-sw = 启用此设置后，在当前语言可用时将始终切换到该语言。（点击了解更多。）
language-switcher-learn-more = 了解更多
login-button-login = 登录
modal-exit-modal = 关闭对话框
navigation-toggle-navigation = 切换导航
obs-about-title = 关于 HTTP Observatory
observatory-landing-read-our-faq = 阅读我们的常见问题解答
observatory-landing-report-feedback = 提交反馈
observatory-rescan-button-rescan = 重新扫描
observatory-rescan-button-wait-a-minute-to-rescan = 请稍等一分钟后再重新扫描
observatory-results-report-feedback = 提交反馈
observatory-results-faq = 常见问题解答
observatory-tests-and-scores-loading-tests-and-scoring-data = 正在加载测试和评分数据……
observatory-tests-and-scores-see = 参见
observatory-tests-and-scores-for-guidance = 获取指导
observatory-tests-and-scores-test-result = 测试结果
observatory-tests-and-scores-description = 说明
observatory-tests-and-scores-modifier = 分数调整
observatory-tests-and-scores-failed-to-load-tests-and-scoring = 加载测试和评分数据失败，请稍后再试。
brand-web-docs = MDN Web Docs
blog-rss-title = MDN 博客 RSS 订阅源
meta-description = MDN Web Docs 网站提供有关开放 Web 技术的信息，包括 HTML、CSS 以及适用于网站和渐进式 Web 应用的 API。
logo-alt = MDN 标志
pagination-pagination = 分页
playground-do-you-really-want-to-clear-ever = 您确定要清空所有内容吗？
playground-do-you-really-want-to-revert-you = 您确定要撤销您的更改吗？
playground-playground = 演练场
playground-format = 格式化
playground-run = 运行
playground-share = 分享
playground-clear = 清空
playground-reset = 重置
playground-seeing-something-inappropriate = 看到不当内容？
playground-console = 控制台
playground-share-markdown = 分享 Markdown
playground-copy-markdown-to-clipboard = 复制 Markdown 到剪贴板
playground-share-data-url = 分享 Data URL
playground-copy-data-url-to-clipboard = 复制 Data URL 到剪贴板
playground-share-your-code-via-permalink = 通过永久链接分享您的代码
playground-copy-to-clipboard = 复制到剪贴板
playground-create-link = 创建链接
playground-report-this-malicious-or-inappro = 举报此恶意或不当的共享演练场内容。
playground-can-you-please-share-some-detail = 您能否详细说明此内容存在的问题？
playground-cancel = 取消
playground-report = 举报
recently-visited-recently-visited = 最近访问
scrim-inline-clicking-will-load-content-from = 点击后将从 scrimba.com 加载内容
scrim-inline-toggle-fullscreen = 切换全屏
scrim-inline-open-on-scrimba = 在 Scrimba 上打开
scrim-inline-load-scrim-and-open-dialog = 加载 Scrimba 并打开对话框
search-button-search-the-site = 搜索本站
search-modal-loading-search-index = 正在加载搜索索引……
search-modal-search = 搜索
search-modal-exit-search = 退出搜索
sidebar-filter-filter-sidebar = 筛选侧边栏
sidebar-filter-filter = 筛选
sidebar-filter-clear-filter-input = 清除筛选输入
site-search-search = 搜索
site-search-previous = 上一页
site-search-next = 下一页
site-search-suggestions-text = 您是否在找……
site-search-searching = 搜索中……
site-search-language = 语言
site-search-both = 两者
specifications-list-this-feature-does-not-appear-to = 此特性似乎未在任何规范中定义。
specifications-list-specification = 规范
survey-hide-this-survey = 隐藏此调查
survey-take-survey-opens-in-a-new-tab = 参与调查（在新标签页中打开）
toggle-sidebar-toggle-sidebar = 切换侧边栏
user-menu-ai-help = AI 助手
user-menu-collections = 收藏集
user-menu-updates = 更新
user-menu-settings = 我的设置
user-menu-help = 帮助
user-menu-feedback = 反馈
user-menu-user = 用户
writer-open-editor-open-in-editor = 在编辑器中打开
writer-toolbar-view-on-mdn = 在 MDN 上查看
`;
    t.d(o, {}, { default: a });
  }
};
//# sourceMappingURL=9456.c51735bf3786aa02.js.map
