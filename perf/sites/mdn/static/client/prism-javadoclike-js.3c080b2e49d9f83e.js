export const __rspack_esm_id = 8311;
export const __rspack_esm_ids = [8311];
export const __webpack_modules__ = {
  35643() {
    var e, a;
    (Object.defineProperty(
      (a = (e = Prism).languages.javadoclike =
        {
          parameter: {
            pattern:
              /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m,
            lookbehind: !0
          },
          keyword: {
            pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
            lookbehind: !0
          },
          punctuation: /[{}]/
        }),
      'addSupport',
      {
        value: function (a, t) {
          ('string' == typeof a && (a = [a]),
            a.forEach(function (a) {
              !(function (a, t) {
                var n = 'doc-comment',
                  r = e.languages[a];
                if (r) {
                  var o = r[n];
                  if (!o) {
                    var s = {};
                    ((s[n] = {
                      pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
                      lookbehind: !0,
                      alias: 'comment'
                    }),
                      (o = (r = e.languages.insertBefore(a, 'comment', s))[n]));
                  }
                  if (
                    (o instanceof RegExp && (o = r[n] = { pattern: o }),
                    Array.isArray(o))
                  )
                    for (var i = 0, p = o.length; i < p; i++)
                      (o[i] instanceof RegExp && (o[i] = { pattern: o[i] }),
                        t(o[i]));
                  else t(o);
                }
              })(a, function (e) {
                (e.inside || (e.inside = {}), (e.inside.rest = t));
              });
            }));
        }
      }
    ),
      a.addSupport(['java', 'javascript', 'php'], a));
  }
};
//# sourceMappingURL=prism-javadoclike-js.3c080b2e49d9f83e.js.map
