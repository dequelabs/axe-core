export const __rspack_esm_id = 2326;
export const __rspack_esm_ids = [2326];
export const __webpack_modules__ = {
  36852() {
    var e, a, n, s;
    ((e = Prism),
      (a = /(^(?:[\t ]*(?:\*\s*)*))[^*\s].*$/m),
      (n = /#\s*\w+(?:\s*\([^()]*\))?/.source),
      (s =
        /(?:\b[a-zA-Z]\w+\s*\.\s*)*\b[A-Z]\w*(?:\s*<mem>)?|<mem>/.source.replace(
          /<mem>/g,
          function () {
            return n;
          }
        )),
      (e.languages.javadoc = e.languages.extend('javadoclike', {})),
      e.languages.insertBefore('javadoc', 'keyword', {
        reference: {
          pattern: RegExp(
            /(@(?:exception|link|linkplain|see|throws|value)\s+(?:\*\s*)?)/
              .source +
              '(?:' +
              s +
              ')'
          ),
          lookbehind: !0,
          inside: {
            function: { pattern: /(#\s*)\w+(?=\s*\()/, lookbehind: !0 },
            field: { pattern: /(#\s*)\w+/, lookbehind: !0 },
            namespace: {
              pattern: /\b(?:[a-z]\w*\s*\.\s*)+/,
              inside: { punctuation: /\./ }
            },
            'class-name': /\b[A-Z]\w*/,
            keyword: e.languages.java.keyword,
            punctuation: /[#()[\],.]/
          }
        },
        'class-name': {
          pattern: /(@param\s+)<[A-Z]\w*>/,
          lookbehind: !0,
          inside: { punctuation: /[.<>]/ }
        },
        'code-section': [
          {
            pattern:
              /(\{@code\s+(?!\s))(?:[^\s{}]|\s+(?![\s}])|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\})+(?=\s*\})/,
            lookbehind: !0,
            inside: {
              code: {
                pattern: a,
                lookbehind: !0,
                inside: e.languages.java,
                alias: 'language-java'
              }
            }
          },
          {
            pattern:
              /(<(code|pre|tt)>(?!<code>)\s*)\S(?:\S|\s+\S)*?(?=\s*<\/\2>)/,
            lookbehind: !0,
            inside: {
              line: {
                pattern: a,
                lookbehind: !0,
                inside: {
                  tag: e.languages.markup.tag,
                  entity: e.languages.markup.entity,
                  code: {
                    pattern: /.+/,
                    inside: e.languages.java,
                    alias: 'language-java'
                  }
                }
              }
            }
          }
        ],
        tag: e.languages.markup.tag,
        entity: e.languages.markup.entity
      }),
      e.languages.javadoclike.addSupport('java', e.languages.javadoc));
  }
};
//# sourceMappingURL=prism-javadoc-js.65b4df2306d7fc86.js.map
