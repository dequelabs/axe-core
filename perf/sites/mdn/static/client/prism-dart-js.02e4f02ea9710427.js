export const __rspack_esm_id = 8037;
export const __rspack_esm_ids = [8037];
export const __webpack_modules__ = {
  60869() {
    var e, s, a, t;
    ((e = Prism),
      (s = [
        /\b(?:async|sync|yield)\*/,
        /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extends|extension|external|factory|final|finally|for|get|hide|if|implements|import|in|interface|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/
      ]),
      (t = {
        pattern: RegExp(
          (a = /(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source) +
            /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source
        ),
        lookbehind: !0,
        inside: {
          namespace: {
            pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
            inside: { punctuation: /\./ }
          }
        }
      }),
      (e.languages.dart = e.languages.extend('clike', {
        'class-name': [
          t,
          {
            pattern: RegExp(a + /[A-Z]\w*(?=\s+\w+\s*[;,=()])/.source),
            lookbehind: !0,
            inside: t.inside
          }
        ],
        keyword: s,
        operator:
          /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/
      })),
      e.languages.insertBefore('dart', 'string', {
        'string-literal': {
          pattern:
            /r?(?:("""|''')[\s\S]*?\1|(["'])(?:\\.|(?!\2)[^\\\r\n])*\2(?!\2))/,
          greedy: !0,
          inside: {
            interpolation: {
              pattern:
                /((?:^|[^\\])(?:\\{2})*)\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,
              lookbehind: !0,
              inside: {
                punctuation: /^\$\{?|\}$/,
                expression: { pattern: /[\s\S]+/, inside: e.languages.dart }
              }
            },
            string: /[\s\S]+/
          }
        },
        string: void 0
      }),
      e.languages.insertBefore('dart', 'class-name', {
        metadata: { pattern: /@\w+/, alias: 'function' }
      }),
      e.languages.insertBefore('dart', 'class-name', {
        generics: {
          pattern:
            /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
          inside: {
            'class-name': t,
            keyword: s,
            punctuation: /[<>(),.:]/,
            operator: /[?&|]/
          }
        }
      }));
  }
};
//# sourceMappingURL=prism-dart-js.02e4f02ea9710427.js.map
