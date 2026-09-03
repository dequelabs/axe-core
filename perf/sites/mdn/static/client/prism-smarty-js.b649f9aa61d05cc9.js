export const __rspack_esm_id = 2578;
export const __rspack_esm_ids = [2578];
export const __webpack_modules__ = {
  99124() {
    var e, n, t;
    (((e = Prism).languages.smarty = {
      comment: { pattern: /^\{\*[\s\S]*?\*\}/, greedy: !0 },
      'embedded-php': {
        pattern: /^\{php\}[\s\S]*?\{\/php\}/,
        greedy: !0,
        inside: {
          smarty: { pattern: /^\{php\}|\{\/php\}$/, inside: null },
          php: {
            pattern: /[\s\S]+/,
            alias: 'language-php',
            inside: e.languages.php
          }
        }
      },
      string: [
        {
          pattern: /"(?:\\.|[^"\\\r\n])*"/,
          greedy: !0,
          inside: {
            interpolation: {
              pattern: /\{[^{}]*\}|`[^`]*`/,
              inside: {
                'interpolation-punctuation': {
                  pattern: /^[{`]|[`}]$/,
                  alias: 'punctuation'
                },
                expression: { pattern: /[\s\S]+/, inside: null }
              }
            },
            variable: /\$\w+/
          }
        },
        { pattern: /'(?:\\.|[^'\\\r\n])*'/, greedy: !0 }
      ],
      keyword: {
        pattern: /(^\{\/?)[a-z_]\w*\b(?!\()/i,
        lookbehind: !0,
        greedy: !0
      },
      delimiter: { pattern: /^\{\/?|\}$/, greedy: !0, alias: 'punctuation' },
      number: /\b0x[\dA-Fa-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][-+]?\d+)?/,
      variable: [
        /\$(?!\d)\w+/,
        /#(?!\d)\w+#/,
        { pattern: /(\.|->|\w\s*=)(?!\d)\w+\b(?!\()/, lookbehind: !0 },
        { pattern: /(\[)(?!\d)\w+(?=\])/, lookbehind: !0 }
      ],
      function: {
        pattern: /(\|\s*)@?[a-z_]\w*|\b[a-z_]\w*(?=\()/i,
        lookbehind: !0
      },
      'attr-name': /\b[a-z_]\w*(?=\s*=)/i,
      boolean: /\b(?:false|no|off|on|true|yes)\b/,
      punctuation: /[\[\](){}.,:`]|->/,
      operator: [
        /[+\-*\/%]|==?=?|[!<>]=?|&&|\|\|?/,
        /\bis\s+(?:not\s+)?(?:div|even|odd)(?:\s+by)?\b/,
        /\b(?:and|eq|gt?e|gt|lt?e|lt|mod|neq?|not|or)\b/
      ]
    }),
      (e.languages.smarty['embedded-php'].inside.smarty.inside =
        e.languages.smarty),
      (e.languages.smarty.string[0].inside.interpolation.inside.expression.inside =
        e.languages.smarty),
      (n = /"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*'/),
      (t = RegExp(
        /\{\*[\s\S]*?\*\}/.source +
          '|' +
          /\{php\}[\s\S]*?\{\/php\}/.source +
          '|' +
          /\{(?:[^{}"']|<str>|\{(?:[^{}"']|<str>|\{(?:[^{}"']|<str>)*\})*\})*\}/.source.replace(
            /<str>/g,
            function () {
              return n.source;
            }
          ),
        'g'
      )),
      e.hooks.add('before-tokenize', function (n) {
        var a = !1;
        e.languages['markup-templating'].buildPlaceholders(
          n,
          'smarty',
          t,
          function (e) {
            return (
              '{/literal}' === e && (a = !1),
              !a && ('{literal}' === e && (a = !0), !0)
            );
          }
        );
      }),
      e.hooks.add('after-tokenize', function (n) {
        e.languages['markup-templating'].tokenizePlaceholders(n, 'smarty');
      }));
  }
};
//# sourceMappingURL=prism-smarty-js.b649f9aa61d05cc9.js.map
