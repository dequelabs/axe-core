export const __rspack_esm_id = 8549;
export const __rspack_esm_ids = [8549];
export const __webpack_modules__ = {
  54029() {
    !(function (e) {
      var t = e.languages.javascript['template-string'],
        n = t.pattern.source,
        r = t.inside.interpolation,
        a = r.inside['interpolation-punctuation'],
        s = r.pattern.source;
      function o(t, r) {
        if (e.languages[t])
          return {
            pattern: RegExp('((?:' + r + ')\\s*)' + n),
            lookbehind: !0,
            greedy: !0,
            inside: {
              'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
              'embedded-code': { pattern: /[\s\S]+/, alias: t }
            }
          };
      }
      function i(t, n, r) {
        var a = { code: t, grammar: n, language: r };
        return (
          e.hooks.run('before-tokenize', a),
          (a.tokens = e.tokenize(a.code, a.grammar)),
          e.hooks.run('after-tokenize', a),
          a.tokens
        );
      }
      e.languages.javascript['template-string'] = [
        o(
          'css',
          /\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)/
            .source
        ),
        o('html', /\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=/.source),
        o('svg', /\bsvg/.source),
        o('markdown', /\b(?:markdown|md)/.source),
        o('graphql', /\b(?:gql|graphql(?:\s*\.\s*experimental)?)/.source),
        o('sql', /\bsql/.source),
        t
      ].filter(Boolean);
      var p = {
        javascript: !0,
        js: !0,
        typescript: !0,
        ts: !0,
        jsx: !0,
        tsx: !0
      };
      e.hooks.add('after-tokenize', function (t) {
        t.language in p &&
          (function t(n) {
            for (var o = 0, p = n.length; o < p; o++) {
              var l = n[o];
              if ('string' != typeof l) {
                var c = l.content;
                if (!Array.isArray(c)) {
                  'string' != typeof c && t([c]);
                  continue;
                }
                if ('template-string' === l.type) {
                  var u = c[1];
                  if (
                    3 === c.length &&
                    'string' != typeof u &&
                    'embedded-code' === u.type
                  ) {
                    var g = (function e(t) {
                        return 'string' == typeof t
                          ? t
                          : Array.isArray(t)
                            ? t.map(e).join('')
                            : e(t.content);
                      })(u),
                      f = u.alias,
                      y = Array.isArray(f) ? f[0] : f,
                      d = e.languages[y];
                    if (!d) continue;
                    c[1] = (function (t, n, o) {
                      var p = e.tokenize(t, {
                          interpolation: { pattern: RegExp(s), lookbehind: !0 }
                        }),
                        l = 0,
                        c = {},
                        u = i(
                          p
                            .map(function (e) {
                              if ('string' == typeof e) return e;
                              for (
                                var n, r, a = e.content;
                                -1 !==
                                t.indexOf(
                                  ((n = l++),
                                  (r =
                                    '___' + o.toUpperCase() + '_' + n + '___'))
                                );
                              );
                              return ((c[r] = a), r);
                            })
                            .join(''),
                          n,
                          o
                        ),
                        g = Object.keys(c);
                      return (
                        (l = 0),
                        !(function t(n) {
                          for (var s = 0; s < n.length; s++) {
                            if (l >= g.length) return;
                            var o = n[s];
                            if (
                              'string' == typeof o ||
                              'string' == typeof o.content
                            ) {
                              var p = g[l],
                                u = 'string' == typeof o ? o : o.content,
                                f = u.indexOf(p);
                              if (-1 !== f) {
                                ++l;
                                var y = u.substring(0, f),
                                  d = (function (t) {
                                    var n = {};
                                    n['interpolation-punctuation'] = a;
                                    var s = e.tokenize(t, n);
                                    if (3 === s.length) {
                                      var o = [1, 1];
                                      (o.push.apply(
                                        o,
                                        i(
                                          s[1],
                                          e.languages.javascript,
                                          'javascript'
                                        )
                                      ),
                                        s.splice.apply(s, o));
                                    }
                                    return new e.Token(
                                      'interpolation',
                                      s,
                                      r.alias,
                                      t
                                    );
                                  })(c[p]),
                                  v = u.substring(f + p.length),
                                  k = [];
                                if ((y && k.push(y), k.push(d), v)) {
                                  var m = [v];
                                  (t(m), k.push.apply(k, m));
                                }
                                'string' == typeof o
                                  ? (n.splice.apply(n, [s, 1].concat(k)),
                                    (s += k.length - 1))
                                  : (o.content = k);
                              }
                            } else {
                              var h = o.content;
                              Array.isArray(h) ? t(h) : t([h]);
                            }
                          }
                        })(u),
                        new e.Token(o, u, 'language-' + o, t)
                      );
                    })(g, d, y);
                  }
                } else t(c);
              }
            }
          })(t.tokens);
      });
    })(Prism);
  }
};
//# sourceMappingURL=prism-js-templates-js.1bddfc3a3dab31f1.js.map
