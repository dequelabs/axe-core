export const __rspack_esm_id = 5166;
export const __rspack_esm_ids = [5166];
export const __webpack_modules__ = {
  19700() {
    var e = Prism;
    function n(e, n) {
      return '___' + e.toUpperCase() + n + '___';
    }
    Object.defineProperties((e.languages['markup-templating'] = {}), {
      buildPlaceholders: {
        value: function (t, a, r, o) {
          if (t.language === a) {
            var c = (t.tokenStack = []);
            ((t.code = t.code.replace(r, function (e) {
              if ('function' == typeof o && !o(e)) return e;
              for (var r, s = c.length; -1 !== t.code.indexOf((r = n(a, s)));)
                ++s;
              return ((c[s] = e), r);
            })),
              (t.grammar = e.languages.markup));
          }
        }
      },
      tokenizePlaceholders: {
        value: function (t, a) {
          if (t.language === a && t.tokenStack) {
            t.grammar = e.languages[a];
            var r = 0,
              o = Object.keys(t.tokenStack);
            !(function c(s) {
              for (var i = 0; i < s.length && !(r >= o.length); i++) {
                var p = s[i];
                if (
                  'string' == typeof p ||
                  (p.content && 'string' == typeof p.content)
                ) {
                  var u = o[r],
                    g = t.tokenStack[u],
                    l = 'string' == typeof p ? p : p.content,
                    f = n(a, u),
                    _ = l.indexOf(f);
                  if (_ > -1) {
                    ++r;
                    var k = l.substring(0, _),
                      m = new e.Token(
                        a,
                        e.tokenize(g, t.grammar),
                        'language-' + a,
                        g
                      ),
                      d = l.substring(_ + f.length),
                      v = [];
                    (k && v.push.apply(v, c([k])),
                      v.push(m),
                      d && v.push.apply(v, c([d])),
                      'string' == typeof p
                        ? s.splice.apply(s, [i, 1].concat(v))
                        : (p.content = v));
                  }
                } else p.content && c(p.content);
              }
              return s;
            })(t.tokens);
          }
        }
      }
    });
  }
};
//# sourceMappingURL=prism-markup-templating-js.46252012f572be08.js.map
