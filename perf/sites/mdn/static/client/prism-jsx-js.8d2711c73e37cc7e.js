export const __rspack_esm_id = 9559;
export const __rspack_esm_ids = [9559];
export const __webpack_modules__ = {
  65903() {
    !(function (t) {
      var e = t.util.clone(t.languages.javascript),
        n = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,
        a = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,
        s = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
      function o(t, e) {
        return RegExp(
          (t = t
            .replace(/<S>/g, function () {
              return n;
            })
            .replace(/<BRACES>/g, function () {
              return a;
            })
            .replace(/<SPREAD>/g, function () {
              return s;
            })),
          e
        );
      }
      ((s = o(s).source),
        (t.languages.jsx = t.languages.extend('markup', e)),
        (t.languages.jsx.tag.pattern = o(
          /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/
            .source
        )),
        (t.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/),
        (t.languages.jsx.tag.inside['attr-value'].pattern =
          /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/),
        (t.languages.jsx.tag.inside.tag.inside['class-name'] =
          /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
        (t.languages.jsx.tag.inside.comment = e.comment),
        t.languages.insertBefore(
          'inside',
          'attr-name',
          {
            spread: { pattern: o(/<SPREAD>/.source), inside: t.languages.jsx }
          },
          t.languages.jsx.tag
        ),
        t.languages.insertBefore(
          'inside',
          'special-attr',
          {
            script: {
              pattern: o(/=<BRACES>/.source),
              alias: 'language-javascript',
              inside: {
                'script-punctuation': {
                  pattern: /^=(?=\{)/,
                  alias: 'punctuation'
                },
                rest: t.languages.jsx
              }
            }
          },
          t.languages.jsx.tag
        ));
      var g = function (t) {
          return t
            ? 'string' == typeof t
              ? t
              : 'string' == typeof t.content
                ? t.content
                : t.content.map(g).join('')
            : '';
        },
        r = function (e) {
          for (var n = [], a = 0; a < e.length; a++) {
            var s = e[a],
              o = !1;
            if (
              ('string' != typeof s &&
                ('tag' === s.type && s.content[0] && 'tag' === s.content[0].type
                  ? '</' === s.content[0].content[0].content
                    ? n.length > 0 &&
                      n[n.length - 1].tagName === g(s.content[0].content[1]) &&
                      n.pop()
                    : '/>' === s.content[s.content.length - 1].content ||
                      n.push({
                        tagName: g(s.content[0].content[1]),
                        openedBraces: 0
                      })
                  : n.length > 0 &&
                      'punctuation' === s.type &&
                      '{' === s.content
                    ? n[n.length - 1].openedBraces++
                    : n.length > 0 &&
                        n[n.length - 1].openedBraces > 0 &&
                        'punctuation' === s.type &&
                        '}' === s.content
                      ? n[n.length - 1].openedBraces--
                      : (o = !0)),
              (o || 'string' == typeof s) &&
                n.length > 0 &&
                0 === n[n.length - 1].openedBraces)
            ) {
              var c = g(s);
              (a < e.length - 1 &&
                ('string' == typeof e[a + 1] ||
                  'plain-text' === e[a + 1].type) &&
                ((c += g(e[a + 1])), e.splice(a + 1, 1)),
                a > 0 &&
                  ('string' == typeof e[a - 1] ||
                    'plain-text' === e[a - 1].type) &&
                  ((c = g(e[a - 1]) + c), e.splice(a - 1, 1), a--),
                (e[a] = new t.Token('plain-text', c, null, c)));
            }
            s.content && 'string' != typeof s.content && r(s.content);
          }
        };
      t.hooks.add('after-tokenize', function (t) {
        ('jsx' === t.language || 'tsx' === t.language) && r(t.tokens);
      });
    })(Prism);
  }
};
//# sourceMappingURL=prism-jsx-js.8d2711c73e37cc7e.js.map
