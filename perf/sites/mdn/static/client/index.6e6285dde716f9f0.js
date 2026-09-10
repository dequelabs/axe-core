/*! LICENSE: index.6e6285dde716f9f0.js.LICENSE.txt */
export const __rspack_esm_id = 8410;
export const __rspack_esm_ids = [8410];
export const __webpack_modules__ = {
  537(e, t, o) {
    let a = `# WARNING: don't use this file as a source for strings requiring l10n, use ../template.ftl instead:
# this file only contains manually added strings, not ones inlined in code. See ../README.md for more details.

# TODO Use comments, see: https://firefox-source-docs.mozilla.org/l10n/fluent/review.html#comments
# TODO Consider using terms, see: https://firefox-source-docs.mozilla.org/l10n/fluent/review.html#terms and https://projectfluent.org/fluent/guide/references.html#message-references

article-footer-last-modified = This page was last modified on <time data-l10n-name="date">{ $date }</time> by <a data-l10n-name="contributors">MDN contributors</a>.
article-footer-source-title = Folder: { $folder } (Opens in a new tab)

baseline-asterisk = Some parts of this feature may have varying levels of support.
baseline-high-extra = This feature is well established and works across many devices and browser versions. It’s been available across browsers since { $date }.
baseline-low-extra = Since { $date }, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
baseline-not-extra = This feature is not Baseline because it does not work in some of the most widely-used browsers.
baseline-supported-in = Supported in { $browsers }
baseline-unsupported-in = Not widely supported in { $browsers }
baseline-supported-and-unsupported-in = Supported in { $supported }, but not widely supported in { $unsupported }
baseline-signals = Want more browser support for this feature? <a data-l10n-name="link">Tell us why.</a>

homepage-hero-title = Resources for Developers,<br> by Developers

playground-user-shared-warning = This is a user-shared playground.<br>Always inspect the code before running it.
homepage-hero-description = Documenting <a data-l10n-name="css">CSS</a>, <a data-l10n-name="html">HTML</a>, and <a data-l10n-name="js">JavaScript</a>, since 2005.

not-found-title = Page not found
not-found-description = Sorry, the page <code data-l10n-name="url">{ $url }</code> could not be found.
not-found-fallback-english = <strong data-l10n-name="strong">Good news:</strong> The page you requested exists in <em data-l10n-name="em">English</em>.
not-found-fallback-search = The page you requested doesn't exist, but you could try a site search for:
not-found-back = Go back to the home page

reference-toc-header = In this article

footer-copyright = Portions of this content are \xa91998–{ $year } by individual mozilla.org contributors. Content available under <a data-l10n-name="cc">a Creative Commons license</a>.

search-modal-site-search = Site search for <em>{ $query }</em>

site-search-search-stats = Found { $results } documents.
site-search-suggestion-matches =  { $relation ->
    [gt] more than { $matches ->
        [one]   { $matches } match
       *[other] { $matches } matches
    }
   *[eq] { $matches ->
        [one]   { $matches } match
       *[other] { $matches } matches
    }
}

blog-time-to-read = { $minutes ->
    [one]   { $minutes } minute read
   *[other] { $minutes } minutes read
}
blog-post-not-found = Blog post not found.

blog-previous = Previous post
blog-next = Next post

-brand-name-obs = HTTP Observatory
obs-report = Report
obs-title = { -brand-name-obs }
obs-landing-intro = Launched in 2016, the { -brand-name-obs } enhances web security by analyzing compliance with best security practices. It has provided insights to over 6.9 million websites through 47 million scans.
obs-assessment = Developed by Mozilla, the { -brand-name-obs } performs an in-depth assessment of a site’s HTTP headers and other key security configurations.
obs-scanning = Its automated scanning process provides developers and website administrators with detailed, actionable feedback, focusing on identifying and addressing potential security vulnerabilities.
obs-security = The tool is instrumental in helping developers and website administrators strengthen their sites against common security threats in a constantly advancing digital environment.
obs-mdn = The { -brand-name-obs } provides effective security insights, guided by Mozilla's expertise and commitment to a safer and more secure internet and based on well-established trends and guidelines.


compat-loading = Loading…
compat-js-required = Enable JavaScript to view this browser compatibility table.

compat-browser-version-date = { $browser } { $version } – Release date: { $date }
compat-browser-version-released = Release date: { $date }

compat-link-report-issue = Report problems with this compatibility data
compat-link-report-issue-title = Report an issue with this compatibility data
compat-link-report-missing-title = Report missing compatibility data
compat-link-report-missing = Report this issue
compat-link-source = View data on GitHub
compat-link-source-title = File: { $filename }

compat-deprecated = Deprecated
compat-experimental = Experimental
compat-nonstandard = Non-standard
compat-no = No

compat-support-full = Full support
compat-support-partial = Partial support
compat-support-no = No support
compat-support-unknown = Support unknown
compat-branch-prefix = Prefix: <code data-l10n-name="prefix">{ $prefix }</code>
compat-branch-altname = Alternate name: <code data-l10n-name="altname">{ $altname }</code>
compat-branch-prefix-altname = Prefix: <code data-l10n-name="prefix">{ $prefix }</code>, alternate name: <code data-l10n-name="altname">{ $altname }</code>
compat-support-removed = Removed in { $version } and later
compat-support-see-impl-url = See <a data-l10n-name="impl_url">{ $label }</a>
compat-support-flag-range =
    { $version_range ->
        [range] From version { $version_added } until { $version_last }, users
        [from] From version { $version_added }, users
        [until] Until { $version_last }, users
       *[none] Users
    } must explicitly set the <code data-l10n-name="name">{ $flag_name }</code> { $flag_type ->
       *[preference] preference
        [runtime_flag] runtime flag
    }{ $has_value ->
        [1] { " " }to <code data-l10n-name="value">{ $flag_value }</code>
       *[0] { "" }
    }.{ $has_pref_url ->
        [1]
            { $flag_type ->
                [preference] { " " }To change preferences in { $browser_name }, visit { $browser_pref_url }.
               *[other] { "" }
            }
       *[0] { "" }
    }
compat-legend = Legend
compat-legend-tip = Tip: you can click/tap on a cell for more information.
compat-legend-yes = { compat-support-full }
compat-legend-partial = { compat-support-partial }
compat-legend-preview = In development. Supported in a pre-release version.
compat-legend-no = { compat-support-no }
compat-legend-unknown = Compatibility unknown
compat-legend-experimental = { compat-experimental }. Expect behavior to change in the future.
compat-legend-nonstandard = { compat-nonstandard }. Check cross-browser support before using.
compat-legend-deprecated = { compat-deprecated }. Not for use in new websites.
compat-legend-footnote = See implementation notes.
compat-legend-disabled = User must explicitly enable this feature.
compat-legend-altname = Uses a non-standard name.
compat-legend-prefix = Requires a vendor prefix or different name for use.
compat-legend-more = Has more compatibility info.

placement-note = Ad
placement-no = Don't want to see ads?

pagination-next = Next page
pagination-prev = Previous page
pagination-current = Current page
pagination-goto = Go to page { $page }

logout = Sign out
login = Log in

example-play-button-label = Play
example-play-button-title = Run example in MDN Playground (opens in new tab)

content-feedback-question = Was this page helpful to you?
content-feedback-reason = Why was this page not helpful to you?
content-feedback-thanks = Thank you for your feedback!

writer-reload-polling = Polling every { $seconds }s
`;
    o.d(t, {}, { default: a });
  },
  96191(e, t, o) {
    var a = o(22009),
      r = o(31601),
      n = o.n(r),
      l = o(76314),
      s = o.n(l),
      i = o(33208),
      c = s()(n());
    (c.i(i.A),
      c.push([
        e.id,
        ':host{display:inline-flex;vertical-align:middle}.button{box-sizing:border-box;height:100%;width:100%}',
        ''
      ]));
    let d = (0, a.AH)([c.toString()]);
    o.d(t, {}, { A: d });
  },
  3971(e, t, o) {
    var a = o(22009),
      r = o(31601),
      n = o.n(r),
      l = o(76314),
      s = o.n(l),
      i = o(4417),
      c = o.n(i),
      d = new o.U(o(70054)),
      g = s()(n()),
      u = c()(d);
    g.push([
      e.id,
      `*,:after,:before{box-sizing:border-box}dialog{border:0;overscroll-behavior:contain;padding:0}@media (width > 1044px){dialog{background-color:var(--color-background-primary);border:1px solid var(--color-border-primary);border-radius:.5rem;font-size:var(--font-size-large);margin:calc(var(--sticky-header-height) + 1rem) auto 1rem;max-height:calc(100% - var(--sticky-header-height) - 2rem);width:calc(var(--layout-content-max) + 1rem)}dialog::backdrop{--csstools-light-dark-toggle-dee8eb9e-0:var(--csstools-color-scheme--light) var(--color-black-alpha-75);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background-color:var(--csstools-light-dark-toggle-dee8eb9e-0,var(--color-white-alpha-75))}@supports (color:light-dark(red,red)){dialog::backdrop{background-color:light-dark(var(--color-white-alpha-75),var(--color-black-alpha-75))}}}@media (width <= 1044px){dialog{font-size:var(--font-size-normal);height:100%;margin:0;max-height:100%;max-width:100%;width:100%}}dialog[open]{display:flex;flex-direction:column}progress{flex-shrink:0;margin:0 1rem .5rem}@media (width <= 1044px){progress{margin-inline:.3rem}}.header{align-items:center;display:flex;flex-shrink:0;height:var(--navigation-height)}.close{font-size:1.37rem}@media (width > 1044px){.close{display:none}}form{display:grid;flex:1;gap:.5rem;grid-template-columns:min-content 1fr;padding:1rem;place-items:center}@media (width <= 1044px){form{align-self:center;background-color:var(--color-background-primary);border:1px solid var(--color-border-primary);border-radius:.5rem;margin-left:.3rem;padding:.5rem}}form:before{background-color:var(--color-border-secondary);content:"";height:1em;mask-image:url(${u});mask-size:contain;width:1em}input{background-color:initial;border:none;font-size:inherit;margin:0;outline:none;padding:0;width:100%}input::placeholder{color:var(--color-text-secondary)}ul{margin:0;overflow:auto;padding:0}ul:has(li){border-top:1px solid var(--color-border-primary)}li[data-selected]{background:var(--color-background-blue);border-color:var(--color-blue-50)}li{border-inline-start:2px solid #0000;list-style-type:none}li:not([data-selected]):hover{background-color:var(--color-background-secondary)}li>*{padding:.5rem 1.5rem;width:100%}a{color:var(--color-link-normal);display:grid;-webkit-text-decoration:none;text-decoration:none}a:visited{color:var(--color-link-visited)}.slug{color:var(--color-text-secondary);font-size:var(--font-size-small)}mark{background-color:var(--color-background-yellow);color:var(--color-text-primary)}`,
      ''
    ]);
    let h = (0, a.AH)([g.toString()]);
    o.d(t, {}, { A: h });
  },
  10336(e, t, o) {
    var a = o(22009);
    let r = (0,
    a.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
    o.d(t, {}, { A: r });
  },
  95061(e, t, o) {
    var a = {
      './code-example/element.js': ['84352', [7489, 1861, 1598, 7065]],
      './dropdown/element.js': ['58623', [2868]],
      './live-sample-result/element.js': [
        '47849',
        [7489, 3708, 5950, 4098, 1861, 8401]
      ],
      './observatory-tests-and-scores/element.js': ['56538', [6407]],
      './play-runner/element.js': ['63657', [7489, 5950, 4098, 1721]],
      './search-button/element.js': ['23745', [3690]],
      './survey/element.js': ['10423', [7489, 8121, 5196]],
      './ix-tab-wrapper/element.js': ['49979', [2568]],
      './placement-sidebar/element.js': [
        '57468',
        [7489, 3708, 8280, 1477, 4249, 2173]
      ],
      './placement-hp-main/element.js': [
        '44394',
        [7489, 3708, 8280, 1477, 4249, 4759]
      ],
      './record-visit/element.js': ['55237', [5562, 3094]],
      './toggle-sidebar/element.js': ['39337', [9234]],
      './user-menu/element.js': ['74354', [2868, 8121, 3711]],
      './interactive-example/element.js': [
        '79879',
        [
          7489, 749, 8520, 3649, 6216, 2080, 640, 9515, 2135, 5950, 4098, 3818,
          3047, 1861, 2448, 1598, 4419, 7065, 2568, 5338, 9404
        ]
      ],
      './copy-button/element.js': ['65517', [1598]],
      './observatory-comparison-table/element.js': ['50117', [8160, 2006]],
      './sidebar-filter/element.js': ['50128', [169]],
      './issues-table/element.js': ['37511', [4204]],
      './scrim-inline/element.js': ['33878', [7489, 3708, 1691]],
      './switch/element.js': ['41798', [9099]],
      './collection-save-button/element.js': ['1355', [3980, 4920]],
      './contributor-list/element.js': ['23082', [9127]],
      './button/element.js': ['35268', []],
      './homepage-search/element.js': ['27373', [7678]],
      './modal/element.js': ['14903', [3980]],
      './color-theme/element.js': ['55269', [2868, 5542]],
      './about-team-member/element.js': ['612', [8981]],
      './content-feedback/element.js': ['65929', [7938]],
      './play-console/element.js': ['56369', [3818]],
      './ix-tab/element.js': ['18977', [4419, 5338]],
      './observatory-header-link/element.js': ['1879', [8160, 3676]],
      './curriculum-tabs/element.js': ['52500', [9717]],
      './placement-bottom/element.js': [
        '7895',
        [7489, 3708, 8280, 1477, 4249, 4060]
      ],
      './image-history/element.js': ['47706', [1975]],
      './not-found/element.js': ['2622', [8926, 3555]],
      './placement-note/element.js': ['47764', [1477]],
      './compat-table-lazy/element.js': ['96678', [7489, 8121, 8067, 251]],
      './site-search/element.js': ['53163', [9784]],
      './placement-no/element.js': ['13755', [8280]],
      './play-controller/element.js': ['23731', [2448]],
      './placement-top/element.js': [
        '9951',
        [7489, 3708, 8280, 1477, 4249, 9204]
      ],
      './observatory-form/element.js': ['17547', [7489, 6110, 1672]],
      './observatory-results/element.js': [
        '23247',
        [2868, 8160, 6110, 2006, 3676, 921, 4070, 9764]
      ],
      './about-tabs/element.js': ['54842', [7047]],
      './observatory-human-duration/element.js': ['37077', [8160, 4070]],
      './playground/element.js': [
        '28940',
        [
          7489, 749, 8520, 3649, 6216, 2080, 640, 9515, 5950, 4098, 3818, 3047,
          2448, 3980, 3416
        ]
      ],
      './ix-tab-panel/element.js': ['89854', [4419]],
      './play-editor/element.js': [
        '63386',
        [749, 8520, 3649, 6216, 2080, 640, 9515, 5950, 3047]
      ],
      './themed-image/element.js': ['48125', [5102]],
      './writer-open-editor/element.js': ['51310', [1315]],
      './progress-bar/element.js': ['20141', [6110]],
      './compat-table/element.js': ['7086', [7489, 8121, 8067]],
      './login-button/element.js': ['70242', [6319]],
      './observatory-rescan-button/element.js': ['14416', [921, 3140]],
      './recently-visited/element.js': ['95821', [5562, 5246]],
      './language-always-redirect-button/element.js': ['77108', [9647, 5685]],
      './language-switcher/element.js': [
        '48423',
        [2868, 9099, 9647, 8926, 1996]
      ],
      './search-modal/element.js': ['97154', []],
      './writer-reload/element.js': ['14925', [4366]]
    };
    function r(e) {
      if (!o.o(a, e))
        return Promise.resolve().then(() => {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = 'MODULE_NOT_FOUND'), t);
        });
      var t = a[e],
        r = t[0];
      return Promise.all(
        t[1].map(function (e) {
          return o.e(e);
        })
      ).then(() => o(r));
    }
    ((r.keys = () => Object.keys(a)), (r.id = 95061), (e.exports = r));
  },
  91369(e, t, o) {
    var a = {
      './en-US.ftl': ['537', []],
      './es.ftl': ['59137', [7898]],
      './de.ftl': ['89516', [6333]],
      './pt-BR.ftl': ['27146', [8839]],
      './ja.ftl': ['68942', [7027]],
      './zh-TW.ftl': ['81023', [8964]],
      './fr.ftl': ['23293', [1550]],
      './ru.ftl': ['40730', [3255]],
      './zh-CN.ftl': ['39555', [9456]],
      './ko.ftl': ['45687', [8604]]
    };
    function r(e) {
      if (!o.o(a, e))
        return Promise.resolve().then(() => {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = 'MODULE_NOT_FOUND'), t);
        });
      var t = a[e],
        r = t[0];
      return Promise.all(
        t[1].map(function (e) {
          return o.e(e);
        })
      ).then(() => o(r));
    }
    ((r.keys = () => Object.keys(a)), (r.id = 91369), (e.exports = r));
  },
  33208(e, t, o) {
    var a = o(31601),
      r = o.n(a),
      n = o(76314),
      l = o.n(n)()(r());
    l.push([
      e.id,
      '.button{align-items:center;background-color:initial;border:1px solid #0000;border-radius:.25rem;color:var(--color-text-primary);column-gap:.3125em;cursor:pointer;display:inline-flex;font-family:var(--font-family-text);font-size:.875em;font-weight:450;justify-content:center;line-height:var(--font-line-ui);margin:0;padding:.5em;-webkit-text-decoration:none;text-decoration:none;vertical-align:middle}.button[data-variant=primary]{--csstools-light-dark-toggle-4dae8a1e-0:var(--csstools-color-scheme--light) var(--color-black);color:var(--csstools-light-dark-toggle-4dae8a1e-0,var(--color-white));--csstools-light-dark-toggle-4dae8a1e-1:var(--csstools-color-scheme--light) var(--color-white);background-color:var(--csstools-light-dark-toggle-4dae8a1e-1,var(--color-black))}@supports (color:light-dark(red,red)){.button[data-variant=primary]{background-color:light-dark(var(--color-black),var(--color-white));color:light-dark(var(--color-white),var(--color-black))}}.button[data-variant=primary]:hover{--csstools-light-dark-toggle-4dae8a1e-2:var(--csstools-color-scheme--light) var(--color-gray-60);background-color:var(--csstools-light-dark-toggle-4dae8a1e-2,var(--color-gray-40))}@supports (color:light-dark(red,red)){.button[data-variant=primary]:hover{background-color:light-dark(var(--color-gray-40),var(--color-gray-60))}}.button[data-variant=primary][data-action=positive]{color:var(--color-white);--csstools-light-dark-toggle-4dae8a1e-3:var(--csstools-color-scheme--light) var(--color-green-20);background-color:var(--csstools-light-dark-toggle-4dae8a1e-3,var(--color-green-50))}@supports (color:light-dark(red,red)){.button[data-variant=primary][data-action=positive]{background-color:light-dark(var(--color-green-50),var(--color-green-20))}}.button[data-variant=primary][data-action=positive]:hover{--csstools-light-dark-toggle-4dae8a1e-4:var(--csstools-color-scheme--light) var(--color-green-50);background-color:var(--csstools-light-dark-toggle-4dae8a1e-4,var(--color-green-20))}@supports (color:light-dark(red,red)){.button[data-variant=primary][data-action=positive]:hover{background-color:light-dark(var(--color-green-20),var(--color-green-50))}}.button[data-variant=primary][data-action=negative]{color:var(--color-white);--csstools-light-dark-toggle-4dae8a1e-5:var(--csstools-color-scheme--light) var(--color-red-20);background-color:var(--csstools-light-dark-toggle-4dae8a1e-5,var(--color-red-50))}@supports (color:light-dark(red,red)){.button[data-variant=primary][data-action=negative]{background-color:light-dark(var(--color-red-50),var(--color-red-20))}}.button[data-variant=primary][data-action=negative]:hover{--csstools-light-dark-toggle-4dae8a1e-6:var(--csstools-color-scheme--light) var(--color-red-50);background-color:var(--csstools-light-dark-toggle-4dae8a1e-6,var(--color-red-20))}@supports (color:light-dark(red,red)){.button[data-variant=primary][data-action=negative]:hover{background-color:light-dark(var(--color-red-20),var(--color-red-50))}}.button[data-variant=secondary]{border-color:currentcolor}.button[data-variant=secondary]:hover{--csstools-light-dark-toggle-4dae8a1e-7:var(--csstools-color-scheme--light) var(--color-gray-40);background-color:var(--csstools-light-dark-toggle-4dae8a1e-7,var(--color-gray-80))}@supports (color:light-dark(red,red)){.button[data-variant=secondary]:hover{background-color:light-dark(var(--color-gray-80),var(--color-gray-40))}}.button[data-variant=secondary][data-action=positive]{--csstools-light-dark-toggle-4dae8a1e-8:var(--csstools-color-scheme--light) var(--color-green-80);color:var(--csstools-light-dark-toggle-4dae8a1e-8,var(--color-green-20))}@supports (color:light-dark(red,red)){.button[data-variant=secondary][data-action=positive]{color:light-dark(var(--color-green-20),var(--color-green-80))}}.button[data-variant=secondary][data-action=positive]:hover{--csstools-light-dark-toggle-4dae8a1e-9:var(--csstools-color-scheme--light) var(--color-green-20);background-color:var(--csstools-light-dark-toggle-4dae8a1e-9,var(--color-green-90))}@supports (color:light-dark(red,red)){.button[data-variant=secondary][data-action=positive]:hover{background-color:light-dark(var(--color-green-90),var(--color-green-20))}}.button[data-variant=secondary][data-action=negative]{--csstools-light-dark-toggle-4dae8a1e-10:var(--csstools-color-scheme--light) var(--color-red-80);color:var(--csstools-light-dark-toggle-4dae8a1e-10,var(--color-red-50))}@supports (color:light-dark(red,red)){.button[data-variant=secondary][data-action=negative]{color:light-dark(var(--color-red-50),var(--color-red-80))}}.button[data-variant=secondary][data-action=negative]:hover{--csstools-light-dark-toggle-4dae8a1e-11:var(--csstools-color-scheme--light) var(--color-red-80);color:var(--csstools-light-dark-toggle-4dae8a1e-11,var(--color-red-20));--csstools-light-dark-toggle-4dae8a1e-12:var(--csstools-color-scheme--light) var(--color-red-10);background-color:var(--csstools-light-dark-toggle-4dae8a1e-12,var(--color-red-90))}@supports (color:light-dark(red,red)){.button[data-variant=secondary][data-action=negative]:hover{background-color:light-dark(var(--color-red-90),var(--color-red-10));color:light-dark(var(--color-red-20),var(--color-red-80))}}.button[data-variant=plain]:hover{--csstools-light-dark-toggle-4dae8a1e-13:var(--csstools-color-scheme--light) var(--color-gray-40);background-color:var(--csstools-light-dark-toggle-4dae8a1e-13,var(--color-gray-80))}@supports (color:light-dark(red,red)){.button[data-variant=plain]:hover{background-color:light-dark(var(--color-gray-80),var(--color-gray-40))}}.button[data-variant=plain][data-action=positive]{--csstools-light-dark-toggle-4dae8a1e-14:var(--csstools-color-scheme--light) var(--color-green-80);color:var(--csstools-light-dark-toggle-4dae8a1e-14,var(--color-green-20))}@supports (color:light-dark(red,red)){.button[data-variant=plain][data-action=positive]{color:light-dark(var(--color-green-20),var(--color-green-80))}}.button[data-variant=plain][data-action=positive]:hover{--csstools-light-dark-toggle-4dae8a1e-15:var(--csstools-color-scheme--light) var(--color-green-20);background-color:var(--csstools-light-dark-toggle-4dae8a1e-15,var(--color-green-90))}@supports (color:light-dark(red,red)){.button[data-variant=plain][data-action=positive]:hover{background-color:light-dark(var(--color-green-90),var(--color-green-20))}}.button[data-variant=plain][data-action=negative]{--csstools-light-dark-toggle-4dae8a1e-16:var(--csstools-color-scheme--light) var(--color-red-80);color:var(--csstools-light-dark-toggle-4dae8a1e-16,var(--color-red-50))}@supports (color:light-dark(red,red)){.button[data-variant=plain][data-action=negative]{color:light-dark(var(--color-red-50),var(--color-red-80))}}.button[data-variant=plain][data-action=negative]:hover{--csstools-light-dark-toggle-4dae8a1e-17:var(--csstools-color-scheme--light) var(--color-red-80);color:var(--csstools-light-dark-toggle-4dae8a1e-17,var(--color-red-20));--csstools-light-dark-toggle-4dae8a1e-18:var(--csstools-color-scheme--light) var(--color-red-10);background-color:var(--csstools-light-dark-toggle-4dae8a1e-18,var(--color-red-90))}@supports (color:light-dark(red,red)){.button[data-variant=plain][data-action=negative]:hover{background-color:light-dark(var(--color-red-90),var(--color-red-10));color:light-dark(var(--color-red-20),var(--color-red-80))}}.button[disabled]{--csstools-light-dark-toggle-4dae8a1e-19:var(--csstools-color-scheme--light) var(--color-gray-60)!important;color:var(--csstools-light-dark-toggle-4dae8a1e-19,var(--color-gray-40))!important;cursor:default;--csstools-light-dark-toggle-4dae8a1e-20:var(--csstools-color-scheme--light) var(--color-gray-20)!important;background-color:var(--csstools-light-dark-toggle-4dae8a1e-20,var(--color-gray-80))!important;border-color:#0000}@supports (color:light-dark(red,red)){.button[disabled]{background-color:light-dark(var(--color-gray-80),var(--color-gray-20))!important;color:light-dark(var(--color-gray-40),var(--color-gray-60))!important}}.button .icon{display:flex}.button svg{height:1.25em;width:1.25em}.button .label{padding-block:.125em;padding-inline:.0625em}',
      ''
    ]);
    let s = l.toString();
    o.d(t, {}, { A: s });
  },
  70054(e, t, o) {
    e.exports = o.p + 'search.5dd31cbeea7d1af9.svg';
  },
  51874() {
    try {
      let t = document.querySelector('.baseline-indicator');
      if (t instanceof HTMLDetailsElement) {
        let { openByDefault: o } = t.dataset;
        void 0 === o &&
          (t.addEventListener('toggle', () => {
            e(t.open);
          }),
          e(t.open));
      }
      function e(e) {
        e
          ? localStorage.setItem('baseline-indicator', 'open')
          : localStorage.removeItem('baseline-indicator');
      }
    } catch (e) {
      console.warn('Unable to attach to baseline indicator', e);
    }
  },
  35268(e, t, o) {
    (o.r(t), o.d(t, { MDNButton: () => MDNButton }));
    var a = o(22009),
      r = o(96191),
      n = o(12477),
      l = o(81519);
    let MDNButton = class MDNButton extends a.WF {
      static styles = r.A;
      static get properties() {
        return {
          disabled: { type: Boolean },
          variant: { type: String },
          action: { type: String },
          icon: { state: !0 },
          iconOnly: { type: Boolean, attribute: 'icon-only' },
          iconPosition: { type: String, attribute: 'icon-position' },
          href: { type: String },
          target: { type: String },
          rel: { type: String }
        };
      }
      constructor() {
        (super(),
          (this.disabled = !1),
          (this.icon = void 0),
          (this.iconOnly = !1),
          (this.iconPosition = 'before'),
          (this.variant = 'primary'),
          (this.action = void 0),
          (this.href = void 0),
          (this.target = void 0),
          (this.rel = void 0));
      }
      render() {
        return (function ({
          label: e,
          icon: t,
          iconOnly: o,
          iconPosition: r,
          disabled: s = !1,
          href: i,
          target: c,
          rel: d,
          variant: g = 'primary',
          action: u
        }) {
          let h = (0, l.O)('label-'),
            m = t
              ? (0, a.qy)`<span class="icon" part="icon">${t}</span>`
              : a.s6,
            p = (0, a.qy)`
    <span id=${h} class="label" ?hidden=${o} part="label"
      >${e}</span
    >
  `,
            v = 'after' === r ? [p, m] : [m, p];
          return i
            ? (0, a.qy)`
        <a
          class="button"
          href=${i}
          target=${(0, n.J)(c)}
          rel=${(0, n.J)(d)}
          aria-labelledby=${h}
          data-variant=${(0, n.J)(g)}
          data-action=${(0, n.J)(u)}
          part="button"
        >
          ${v}
        </a>
      `
            : (0, a.qy)`
        <button
          class="button"
          aria-labelledby=${h}
          ?disabled=${s}
          data-variant=${(0, n.J)(g)}
          data-action=${(0, n.J)(u)}
          part="button"
        >
          ${v}
        </button>
      `;
        })({
          label: (0, a.qy)`<slot></slot>`,
          disabled: this.disabled,
          icon: this.icon,
          iconOnly: this.iconOnly,
          iconPosition: this.iconPosition,
          variant: this.variant,
          action: this.action,
          href: this.href,
          target: this.target,
          rel: this.rel
        });
      }
    };
    customElements.define('mdn-button', MDNButton);
  },
  22207(e, t, o) {
    o.d(t, {
      iW: () => f,
      vQ: () => u,
      kv: () => h,
      g_: () => p,
      i7: () => v,
      _0: () => m,
      Q: () => y,
      tf: () => i,
      sR: () => c,
      mR: () => g,
      I: () => d,
      QD: () => b
    });
    let a = [],
      r = n('RUNTIME_ENV', !0);
    function n(e, t, o) {
      try {
        return !!JSON.parse(s(e, o) || JSON.stringify(t));
      } catch {
        return t;
      }
    }
    function l(e, t, o) {
      let a = s(e, o),
        r = a ? Number.parseInt(a, 10) : t;
      return Number.isNaN(r) ? t : r;
    }
    function s(e, t = {}) {
      let { runtime: o } = { runtime: !1, ...t },
        n = `FRED_${e}`;
      return o && r
        ? (a.push(n), globalThis.process?.env[n] || s(e))
        : {
            FRED_RUNTIME_ENV: 'true',
            FRED_PLAYGROUND_LOCAL: 'false',
            FRED_LEGACY: 'true'
          }[n];
    }
    let i = s('PLAYGROUND_BASE_HOST', void 0) || 'mdnplay.dev',
      c = n('PLAYGROUND_LOCAL', !1, { runtime: !0 }),
      d = l('PORT', 3e3, { runtime: !0 });
    n('OPEN_BROWSER_ON_START', !1, { runtime: !0 });
    let g = l('PLAYGROUND_PORT', 3001, { runtime: !0 }),
      u = s('FXA_SIGNIN_URL', void 0) || '/users/fxa/login/authenticate/',
      h = s('FXA_SIGNOUT_URL', void 0) || '/users/fxa/login/logout/',
      m = n('GLEAN_ENABLED', !1),
      p = s('GLEAN_CHANNEL', void 0) || 'dev',
      v = n('GLEAN_DEBUG', !1);
    n('ROBOTS_GLOBAL_ALLOW', !0);
    let b = n('WRITER_MODE', !1, { runtime: !0 }),
      f = s('BCD_BASE_URL', void 0) || 'https://bcd.developer.mozilla.org',
      y =
        s('OBSERVATORY_API_URL', void 0) ||
        'https://observatory-api.mdn.mozilla.net';
    s('TRANSCEND_AIRGAP_URL', void 0);
  },
  36153() {
    let e = document.querySelector('[aria-controls="navigation__popup"]'),
      t = document.querySelector('.navigation');
    e instanceof HTMLElement &&
      t instanceof HTMLElement &&
      e.addEventListener('click', () => {
        let o = ('true' !== t.dataset.open).toString();
        ((t.dataset.open = o), e.setAttribute('aria-expanded', o));
      });
  },
  97154(e, t, o) {
    o.r(t);
    var a = o(36085),
      r = o(22009),
      n = o(70693),
      l = o(23727),
      s = o(14632),
      i = o(10336),
      c = o(3971);
    o(35268);
    let MDNSearchModal = class MDNSearchModal extends (0, n.J)(r.WF) {
      static ssr = !1;
      static styles = c.A;
      static get properties() {
        return {
          _index: { state: !0 },
          _query: { state: !0 },
          _selected: { state: !0 },
          _shiftFocus: { state: !0 }
        };
      }
      constructor() {
        (super(),
          (this._index = void 0),
          (this._query = ''),
          (this._selected = 0),
          (this._shiftFocus = !1),
          (this._hasEngaged = !1));
      }
      async _loadIndex() {
        this._index || (this._index = this._fetchIndex());
      }
      async _fetchIndex() {
        let e = await fetch(`/${this.locale}/search-index.json`),
          t = await e.json();
        return {
          flex: t.map(({ title: e, url: t }, o) => ({
            index: o,
            title: e.toLowerCase(),
            slugTail: t.split('/').pop()?.toLowerCase() || ''
          })),
          items: t
        };
      }
      showModal() {
        (this._loadIndex(),
          this.shadowRoot?.querySelector('dialog')?.showModal(),
          this.shadowRoot?.querySelector('input')?.select());
      }
      _input({ inputType: e, target: t }) {
        t instanceof HTMLInputElement &&
          ((this._query = t.value),
          !this._hasEngaged &&
            e.startsWith('insert') &&
            ((this._hasEngaged = !0),
            (0, l.w)(
              `quick-search-change: ${'insertFromPaste' === e ? 'paste' : 'type'}`
            )));
      }
      _keydown(e) {
        switch (e.key) {
          case 'ArrowUp':
            (e.preventDefault(), this._select(this._selected - 1));
            break;
          case 'ArrowDown':
            (e.preventDefault(), this._select(this._selected + 1));
            break;
          case 'Enter': {
            let { ctrlKey: t, shiftKey: o, altKey: a, metaKey: r } = e,
              n = this._getSelectedItem();
            n instanceof HTMLElement &&
              (e.preventDefault(),
              n.dispatchEvent(
                new MouseEvent('click', {
                  bubbles: !0,
                  composed: !0,
                  ctrlKey: t,
                  shiftKey: o,
                  altKey: a,
                  metaKey: r
                })
              ));
            break;
          }
          default:
            return;
        }
      }
      _getSelectedItem() {
        return this.shadowRoot?.querySelector('[data-selected] a') ?? null;
      }
      _select(e) {
        let t = (this._queryIndex.value?.length || 0) + 1,
          o = e % t;
        ((this._selected = o < 0 ? t + e : o),
          setTimeout(() => {
            let e = this._getSelectedItem();
            e instanceof HTMLElement &&
              e.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 0));
      }
      _submit(e) {
        e.preventDefault();
        let t = this._getSelectedItem();
        t instanceof HTMLElement && t.click();
      }
      _focus({ target: e }) {
        if (e instanceof HTMLElement) {
          let t = e.closest('[data-result]');
          if (t instanceof HTMLElement) {
            let e = Number.parseInt(t.dataset.result || 'NaN', 10);
            Number.isNaN(e) || ((this._selected = e), (this._shiftFocus = !0));
          } else this._shiftFocus = !1;
        }
      }
      _globalKeydown(e) {
        let t = e.composedPath()?.[0] || e.target;
        if (
          t instanceof HTMLElement &&
          (['TEXTAREA', 'INPUT'].includes(t.tagName) || t.isContentEditable)
        )
          return;
        let o = globalThis.getSelection()?.toString(),
          a = e.key,
          r = e.ctrlKey || e.metaKey,
          n = '/' === a && !r,
          s = 'k' === a && r && !e.shiftKey;
        (n || s) &&
          (e.preventDefault(),
          (0, l.w)(`quick-search-open: keyboard -> ${n ? 'slash' : 'ctrl-k'}`),
          this.showModal(),
          o &&
            ((this._query = o),
            this._hasEngaged ||
              ((this._hasEngaged = !0),
              (0, l.w)('quick-search-change: selection'))));
      }
      _queryIndex = new a.YZ(this, {
        args: () => [this._index, this._query],
        task: async ([e, t]) => {
          if (e && t) {
            var o, a;
            let r, n;
            return (
              (o = t),
              (a = await e),
              (r = o.toLowerCase().trim()),
              (n = d(o)),
              a.flex
                .filter(({ title: e }) => n.every(t => e.includes(t)))
                .map(({ index: e, title: t, slugTail: o }) => [
                  Number([t, o].includes(r)),
                  e
                ])
                .sort(([e], [t]) => t - e)
                .map(([e, t]) => t)
                .slice(0, 10)
                .map(e => (a.items || [])[e])
                .filter(e => void 0 !== e)
            );
          }
        }
      });
      _close() {
        this.shadowRoot?.querySelector('dialog')?.close();
      }
      _toggle({ newState: e }) {
        document.documentElement.classList.toggle(
          'search-modal-open',
          'open' === e
        );
      }
      connectedCallback() {
        (super.connectedCallback(),
          (this._globalKeydown = this._globalKeydown.bind(this)),
          document.addEventListener('keydown', this._globalKeydown),
          (this._loadIndex = this._loadIndex.bind(this)),
          this.renderRoot.addEventListener('mouseover', this._loadIndex));
      }
      disconnectedCallback() {
        (super.disconnectedCallback(),
          this.renderRoot.removeEventListener('mouseover', this._loadIndex),
          document.removeEventListener('keydown', this._globalKeydown),
          document.documentElement.classList.remove('search-modal-open'));
      }
      _renderLoadingSearchIndex() {
        return (0, r.qy)`<progress
      aria-label=${this.l10n('search-modal-loading-search-index')`Loading search index…`}
    ></progress>`;
      }
      render() {
        let e = this._queryIndex.value?.length || 0,
          t = this._query
            ? `/${this.locale}/search?${new URLSearchParams({ q: this._query })}`
            : null;
        return (0, r.qy)`
      <dialog
        @keydown=${this._keydown}
        @focusin=${this._focus}
        @toggle=${this._toggle}
        closedby="any"
      >
        <div class="header">
          <form
            method="get"
            action=${`/${this.locale}/search`}
            @submit=${this._submit}
          >
            <input
              type="search"
              name="q"
              .value=${this._query}
              autocomplete="off"
              autofocus
              @input=${this._input}
              placeholder=${this.l10n('search-modal-search')`Search`}
              aria-label=${this.l10n('search-modal-search')`Search`}
            />
          </form>
          <mdn-button
            class="close"
            variant="plain"
            icon-only
            .icon=${i.A}
            @click=${this._close}
            >${this.l10n('search-modal-exit-search')`Exit search`}</mdn-button
          >
        </div>
        ${this._queryIndex.render({ initial: this._renderLoadingSearchIndex.bind(this), pending: this._renderLoadingSearchIndex.bind(this) })}
        <ul>
          ${this._queryIndex.render({
            complete: e =>
              e?.map(({ title: e, url: t }, o) => {
                var a;
                let n, l;
                return (0, r.qy)`
                  <li ?data-selected=${this._selected === o} data-result=${o}>
                    <a
                      href=${t}
                      data-glean-id=${`quick-search: results[${1 + o}] -> ${this._query} -> ${t}`}
                      ><span class="slug"
                        >${(0, s.o)(t, this.locale)}</span
                      >
                      <span class="title"
                        >${
                          ((a = e),
                          (l = (n = d(this._query))
                            .map(e =>
                              e.replaceAll(
                                /[.*+?^${}()|[\]\\]/g,
                                String.raw`\$&`
                              )
                            )
                            .map(e => `(${e})`)
                            .join('|')),
                          a
                            .split(RegExp(l, 'gi'))
                            .filter(Boolean)
                            .map(e =>
                              n.includes(e.toLowerCase())
                                ? (0, r.qy)`<mark>${e}</mark>`
                                : e
                            ))
                        }</span
                      ></a
                    >
                  </li>
                `;
              })
          })}
          ${
            t
              ? (0, r.qy)`<li
                  ?data-selected=${this._selected === e}
                  data-result=${e}
                >
                  <a
                    href=${t}
                    data-glean-id=${`quick-search: site-search -> ${this._query}`}
                    ><span class="title"
                      >${this.l10n.raw({ id: 'search-modal-site-search', args: { query: this._query }, elements: { query: { tag: 'code' } } })}</span
                    ></a
                  >
                </li>`
              : r.s6
          }
        </ul>
      </dialog>
    `;
      }
      updated() {
        if (this._shiftFocus) {
          let e = this._getSelectedItem();
          e instanceof HTMLElement && e.focus();
        }
      }
    };
    function d(e) {
      return (e = e.trim().toLowerCase()).startsWith('.') || e.endsWith('.')
        ? e.split(/[ ,]+/)
        : e.split(/[ ,.]+/);
    }
    (customElements.define('mdn-search-modal', MDNSearchModal),
      o.d(t, { MDNSearchModal: () => MDNSearchModal, splitQuery: () => d }));
  },
  45742(e, t, o) {
    let a;
    var r = o(22207);
    let n = { country: 'United States', country_iso: 'US' },
      l = {
        username: null,
        isAuthenticated: !1,
        avatarUrl: null,
        isSubscriber: !1,
        subscriptionType: null,
        email: null,
        geo: n,
        settings: null
      };
    function s() {
      return r.QD
        ? new Promise(() => {})
        : (a || (a = i().catch(e => (console.error(e), l))), a);
    }
    async function i() {
      let e = await fetch('/api/v1/whoami');
      if (!e.ok) throw Error(e.statusText);
      try {
        let t = await e.json(),
          o = t?.settings
            ? {
                aiHelpHistory:
                  'boolean' == typeof t.settings?.ai_help_history
                    ? t.settings.ai_help_history
                    : null,
                noAds: t.settings?.no_ads ?? null
              }
            : l.settings;
        return (
          (c.noAds = o?.noAds || !1),
          {
            username: t.username ?? l.username,
            isAuthenticated: t.is_authenticated ?? l.isAuthenticated,
            avatarUrl: t.avatar_url ?? l.avatarUrl,
            isSubscriber: t.is_subscriber ?? l.isSubscriber,
            subscriptionType:
              'core' === t.subscription_type
                ? 'mdn_core'
                : (t.subscription_type ?? l.subscriptionType),
            email: t.email ?? l.email,
            geo: {
              country: (t.geo && t.geo.country) ?? n.country,
              country_iso: (t.geo && t.geo.country_iso) ?? n.country_iso
            },
            settings: o
          }
        );
      } catch {
        throw Error(e.statusText);
      }
    }
    let c = {
      set noAds(value) {
        value
          ? globalThis.localStorage.setItem('nop', 'yes')
          : globalThis.localStorage.removeItem('nop');
      },
      get noAds() {
        return globalThis.localStorage?.getItem?.('nop') === 'yes';
      }
    };
    o.d(t, { L: () => s });
  },
  81519(e, t, o) {
    function a(e = 'id-') {
      return Math.random().toString(36).replace('0.', e);
    }
    o.d(t, { O: () => a });
  },
  18376(e, t, o) {
    let a = { threshold: 0.5 };
    let ViewedObserver = class ViewedObserver {
      #e;
      #t;
      #o;
      #a = null;
      #r = null;
      #n = !1;
      #l = !globalThis.document?.hidden;
      #s = this.#i.bind(this);
      constructor(e, t, o = a) {
        ((this.#e = e), (this.#t = t), (this.#o = o));
      }
      connect() {
        (document.addEventListener('visibilitychange', this.#s),
          (this.#a = new IntersectionObserver(e => {
            for (let t of e) this.#c(t.isIntersecting);
          }, this.#o)),
          this.#a.observe(this.#e));
      }
      disconnect() {
        (this.#a && (this.#a.disconnect(), (this.#a = null)),
          null !== this.#r && (clearTimeout(this.#r), (this.#r = null)),
          document.removeEventListener('visibilitychange', this.#s));
      }
      #i() {
        ((this.#l = !document.hidden), this.#c());
      }
      #c(e = !1) {
        !this.#n && this.#l && e
          ? null === this.#r &&
            (this.#r = globalThis.setTimeout(() => {
              ((this.#n = !0), this.#t());
            }, 1e3))
          : null !== this.#r && (clearTimeout(this.#r), (this.#r = null));
      }
    };
    o.d(t, { x: () => ViewedObserver });
  },
  33779(e, t, o) {
    o.a(e, async function (e, t) {
      try {
        (o(95831), o(98821), o(41857), o(98769));
        var a = o(17765);
        (o(31557), o(51874), o(70315), o(36153), o(70408));
        var r = o(88068),
          n = o(76787);
        o(98109);
        var l = o(15381),
          s = e([a, r, n, l]);
        (([a, r, n, l] = s.then ? (await s)() : s), t());
      } catch (e) {
        t(e);
      }
    });
  },
  88068(e, t, o) {
    o.a(
      e,
      async function (e, t) {
        try {
          for (let e of document.querySelectorAll(
            'div.code-example pre:not(.hidden):not([class*="live-sample"]):not([class*="interactive-example"])'
          )) {
            let { upgradePre: t } = await Promise.all([
              o.e(7489),
              o.e(1861),
              o.e(1598),
              o.e(7065)
            ]).then(o.bind(o, 84352));
            t(e);
          }
          t();
        } catch (e) {
          t(e);
        }
      },
      1
    );
  },
  98769() {
    'closedBy' in HTMLDialogElement.prototype ||
      addEventListener('click', e => {
        let t = e.composedPath()[0];
        if (
          t instanceof HTMLDialogElement &&
          'any' === t.getAttribute('closedby')
        ) {
          let o = t.getBoundingClientRect(),
            { clientX: a, clientY: r } = e;
          (o.top <= r && r <= o.bottom && o.left <= a && a <= o.right) ||
            t.close();
        }
      });
  },
  41857(e, t, o) {
    var a = o(70955),
      r = o(22207),
      n = o(18376),
      l = o(23727);
    let s =
      !document.cookie
        .split('; ')
        .includes('moz-1st-party-data-opt-out=true') && r._0;
    for (let e of (r.i7 &&
      (a.A.setDebugViewTag('mdn-dev'), a.A.setLogPings(!0)),
    a.A.initialize('mdn-fred', s, {
      enableAutoPageLoadEvents: !0,
      enableAutoElementClickEvents: !0,
      channel: r.g_
    }),
    document.addEventListener('toggle', e => {
      for (let t of e.composedPath())
        t instanceof HTMLElement &&
          'string' == typeof t.dataset.gleanToggleOpen &&
          'open' in t &&
          t.open &&
          (0, l.w)(t.dataset.gleanToggleOpen);
    }),
    document.querySelectorAll('[data-glean-view]'))) {
      let t = e.dataset.gleanView;
      if (t) {
        let o = new n.x(e, () => {
          ((0, l.w)(t), o.disconnect());
        });
        o.connect();
      }
    }
    document.addEventListener('click', e => {
      let t = e.composedPath(),
        o = t?.[0];
      if (o !== e.target && o instanceof Element)
        for (let e of t)
          e instanceof HTMLElement &&
            'string' == typeof e.dataset.gleanId &&
            (0, l.w)(e.dataset.gleanId);
      let a = o ?? e.target;
      if (a instanceof Element) {
        let e = a.closest('a');
        if (
          (e instanceof HTMLAnchorElement &&
            e.href &&
            e.origin &&
            e.origin !== document.location.origin &&
            (0, l.w)(`external-link: ${e.href}`),
          e instanceof HTMLAnchorElement &&
            e.href &&
            e.closest('.left-sidebar'))
        ) {
          let t = e.getAttribute('href') || e.href;
          (0, l.w)(`sidebar_click: sidebar ${t}`);
        }
      }
    });
  },
  76787(e, t, o) {
    o.a(
      e,
      async function (e, t) {
        try {
          for (let e of document.querySelectorAll('iframe[data-live-id]'))
            if (e instanceof HTMLIFrameElement) {
              let { liveId: t, livePath: a } = e.dataset;
              if (t) {
                let r = {},
                  n = [],
                  l = t.replaceAll('.', String.raw`\.`);
                for (let e of document.querySelectorAll(
                  `.live-sample___${l}, .live-sample---${l}`
                )) {
                  let { MDNCodeExample: t, upgradePre: a } = await Promise.all([
                      o.e(7489),
                      o.e(1861),
                      o.e(1598),
                      o.e(7065)
                    ]).then(o.bind(o, 84352)),
                    l = e instanceof t ? e : a(e);
                  if (l) {
                    n.push(l);
                    let { language: e, code: t } = l;
                    r[e] ? (r[e] += t) : (r[e] = t);
                  }
                }
                await Promise.all([
                  o.e(7489),
                  o.e(3708),
                  o.e(5950),
                  o.e(4098),
                  o.e(1861),
                  o.e(8401)
                ]).then(o.bind(o, 47849));
                let s = document.createElement('mdn-live-sample-result');
                for (let o of ((s.liveId = t),
                (s.code = r),
                (s.srcPrefix = a),
                (s.allow = e.allow || void 0),
                (s.sandbox = e.sandbox.toString()),
                (s.height = e.height),
                e.closest('.code-example')?.replaceWith(s),
                n))
                  o.liveSample ||= s;
              }
            }
          t();
        } catch (e) {
          t(e);
        }
      },
      1
    );
  },
  31557(e, t, o) {
    let a = new Set();
    for (let e of document.querySelectorAll('*')) {
      let t = e.tagName.toLowerCase();
      if (t.startsWith('mdn-') || 'interactive-example' === t) {
        let e = t.replace('mdn-', '');
        a.has(e) ||
          (a.add(e),
          o(95061)(`./${e}/element.js`).catch(t => {
            console.error(
              `couldn't load code for <${e}>: does the element's code not match the naming schema?`,
              t
            );
          }));
      }
    }
  },
  70315() {
    let e = document.querySelector('#main-sidebar'),
      t = e?.querySelector('[aria-current="page"]');
    e &&
      t instanceof HTMLElement &&
      e.scrollTo({ top: t.offsetTop - window.innerHeight / 4 });
  },
  98109(e, t, o) {
    var a = o(97154);
    let r = document.querySelector('.a11y-menu a[href="#search"]');
    if (r instanceof HTMLAnchorElement) {
      let e = document.querySelector('#search');
      e instanceof a.MDNSearchModal
        ? r.addEventListener('click', t => {
            let { target: o } = t;
            (o instanceof HTMLElement && (o.blur(), t.preventDefault()),
              e.showModal());
          })
        : (console.error('MDNSearchModal not found!'), (r.hidden = !0));
    }
  },
  70408() {
    for (let e of document.querySelectorAll(
      '.generic-toc, .reference-toc, .document-toc, .blog-toc'
    ))
      e instanceof HTMLElement &&
        (function (e) {
          let t = [...e.querySelectorAll('a')],
            o = new Map();
          for (let e of t.reverse()) {
            let t = document.querySelector(
              `[id="${CSS.escape(decodeURIComponent(e.hash).slice(1))}"]`
            );
            if (!t) continue;
            let a = t.closest('section');
            for (; a && a instanceof HTMLElement && !o.has(a);)
              (o.set(a, e), (a = a.nextElementSibling));
          }
          let a = new WeakMap(),
            r = new Set(),
            n = { threshold: 0 },
            l = document.querySelector('header');
          l instanceof HTMLElement &&
            (n.rootMargin = `-${l.clientHeight}px 0px 0px 0px`);
          let s = new IntersectionObserver(e => {
            for (let { target: t, isIntersecting: n } of e) {
              if (!(t instanceof HTMLElement)) continue;
              if (!r.has(t))
                if (!n) continue;
                else r.add(t);
              let e = o.get(t);
              if (!e) continue;
              let l = (a.get(e) ?? 0) + (n ? 1 : -1);
              ((e.ariaCurrent = l > 0 ? 'true' : null), a.set(e, l));
            }
          }, n);
          for (let e of o.keys()) s.observe(e);
        })(e);
  },
  15381(e, t, o) {
    o.a(
      e,
      async function (e, t) {
        try {
          var a = o(45742);
          try {
            let e = await (0, a.L)(),
              t = new Date(localStorage.getItem('next-ping') || 0);
            if (navigator.sendBeacon && e.isAuthenticated && t < new Date()) {
              let e = new URLSearchParams();
              navigator.sendBeacon('/api/v1/ping', e);
              let t = new Date();
              (t.setUTCDate(t.getUTCDate() + 1),
                t.setUTCHours(0),
                t.setUTCMinutes(0),
                t.setUTCSeconds(0),
                t.setUTCMilliseconds(0),
                localStorage.setItem('next-ping', t.toISOString()));
            }
          } catch (e) {
            console.error('Failed to send ping', e);
          }
          t();
        } catch (e) {
          t(e);
        }
      },
      1
    );
  },
  99704(e, t, o) {
    var a = o(45379),
      r = o(81233),
      n = o(76722),
      l = o(537);
    let s = { 'en-US': l.default },
      i = new Set(['i', 'strong', 'br', 'em']),
      c = ['title', 'aria-label'];
    let Fluent = class Fluent {
      constructor(e = 'en-US', t = []) {
        ((this.locale = e),
          (this.usBundle = Fluent.constructBundle(
            new a.Np(e, { useIsolating: !1 }),
            [l.default]
          )),
          t.length > 0 &&
            (this.bundle = Fluent.constructBundle(
              new a.Np(e, { useIsolating: !1 }),
              [l.default, ...t]
            )));
      }
      static constructBundle(e, t = []) {
        for (let o of t) {
          let t = e.addResource(new a.B$(o), { allowOverrides: !0 });
          t.length > 0 && console.error(t);
        }
        return e;
      }
      get(e, t, o, a) {
        let r = this.getMessage(e, t, o);
        if (r) return Fluent.sanitize(r, a);
      }
      static sanitize(e, t = {}) {
        let o = {};
        for (let e of Object.values(t))
          o[e.tag] = [...Object.keys(e).filter(e => 'tag' !== e), ...c];
        let a = [...Object.values(t).map(e => e.tag), ...i],
          l = !0,
          s = r(
            e,
            {
              allowedAttributes: o,
              allowedTags: a,
              allowedSchemes: ['http', 'https', 'mailto'],
              filter(e) {
                let o = e.attrs['data-l10n-name'];
                if (o)
                  for (let [a, r] of Object.entries(t[o] || {})) e.attrs[a] = r;
                return (
                  !!(
                    i.has(e.tag) ||
                    (o && Object.keys(t).includes(o) && t[o]?.tag === e.tag)
                  ) && ((l = !1), !0)
                );
              }
            },
            !0
          );
        return l ? s : (0, n._)(s);
      }
      getMessage(e, t, o = {}, a = this.bundle, r = !1) {
        let n,
          l = a ? a.getMessage(e) : void 0;
        if ('qai' === this.locale) return `[${e}${t ? `.${t}` : ''}]`;
        if (!l) {
          if (r) return;
          return this.getMessage(e, t, o, this.usBundle, !0);
        }
        if (t) {
          if (!(n = l.attributes[t])) {
            if (r) return;
            return this.getMessage(e, t, o, this.usBundle, !0);
          }
        } else l.value && (n = l.value);
        if (!n || !a) return '';
        let s = [],
          i = a?.formatPattern(
            n,
            (function (e) {
              let t = {};
              for (let [o, a] of Object.entries(e))
                void 0 !== a &&
                  (t[o] =
                    'string' == typeof a
                      ? a
                          .replaceAll('&', '&amp;')
                          .replaceAll('<', '&lt;')
                          .replaceAll('>', '&gt;')
                      : a);
              return t;
            })(o),
            s
          );
        return (s.length > 0 && console.error(s), i);
      }
    };
    let d = new Map();
    function g(e) {
      if (e) {
        if (!d.has(e)) {
          let t = s[e];
          if (!t) return new Fluent(e);
          let o = new Fluent(e, [t]);
          d.set(e, o);
        }
        return d.get(e);
      }
    }
    async function u(e) {
      if ('qai' !== e && !s[e])
        try {
          let { default: t } = await o(91369)(`./${e}.ftl`);
          s[e] = t;
        } catch (e) {
          console.error(e);
        }
    }
    function h(e) {
      function t(t, o) {
        let a = g(e)?.get(t),
          r = 'string' == typeof a ? a : void 0,
          n = `[${t}]`,
          l = e => {
            let t = e[0];
            return r || t || n;
          };
        return ((l.toString = () => r || n), l);
      }
      return (
        (t.raw = function ({ id: t, attr: o, args: a, elements: r }) {
          let n = g(e);
          return n ? n.get(t, o, a, r) : `[${t}]`;
        }),
        t
      );
    }
    o.d(t, { Ay: () => h, FU: () => u });
  },
  17765(e, t, o) {
    o.a(
      e,
      async function (e, t) {
        try {
          var a = o(36611),
            r = o(99704);
          let e = (0, a.V)().locale;
          (e && (await (0, r.FU)(e)), t());
        } catch (e) {
          t(e);
        }
      },
      1
    );
  },
  70693(e, t, o) {
    var a = o(36611),
      r = o(99704);
    o.d(
      t,
      {},
      {
        J: e =>
          class extends e {
            constructor(...e) {
              super(...e);
              let t = (0, a.V)();
              ((this.locale = t.locale), (this.l10n = (0, r.Ay)(this.locale)));
            }
          }
      }
    );
  },
  36611(e, t, o) {
    function a() {
      let e = globalThis.__MDNServerContext?.getStore(),
        t = globalThis.__MDNClientContext;
      return e || t;
    }
    o.d(t, { V: () => a });
  },
  95831() {
    globalThis.__MDNClientContext = {
      locale: globalThis.location.pathname.split('/', 2)[1] || 'en-US'
    };
  },
  23727(e, t, o) {
    var a = o(34388);
    function r(e) {
      a.A.recordElementClick({
        id: e,
        url: globalThis.location.href,
        referrer: document.referrer,
        title: document.title
      });
    }
    o.d(t, { w: () => r });
  },
  14632(e, t, o) {
    function a(e, t) {
      let o = e
          .replaceAll('_', ' ')
          .split('/')
          .filter(e => !['', 'docs'].includes(e)),
        a = o.shift();
      return (
        'Web' === o.at(0) && 'API' === o.at(1) && (o[1] = 'Web APIs'),
        o.length > 1 && 'Web' === o.at(0) && o.splice(0, 1),
        o.length > 1 && o.splice(-1, 1),
        [...(a === t ? [] : [a]), ...o].join(' / ')
      );
    }
    o.d(t, { o: () => a });
  }
};
import { __webpack_require__ as e } from './runtime.61c7b2d5edd53dfb.js';
import * as t from './5909.489e266d049aa182.js';
e.C(t);
import * as o from './4585.c86502bf8c0611c2.js';
e.C(o);
import * as a from './index.6e6285dde716f9f0.js';
(e.C(a), e((e.s = 33779)));
//# sourceMappingURL=index.6e6285dde716f9f0.js.map
