export const __rspack_esm_id = 753;
export const __rspack_esm_ids = [753];
export const __webpack_modules__ = {
  16625() {
    var e, a, s, n;
    ((a = (e = Prism).languages.javascript),
      (n =
        '(@(?:arg|argument|param|property)\\s+(?:' +
        (s = /\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})+\}/.source) +
        '\\s+)?)'),
      (e.languages.jsdoc = e.languages.extend('javadoclike', {
        parameter: {
          pattern: RegExp(n + /(?:(?!\s)[$\w\xA0-\uFFFF.])+(?=\s|$)/.source),
          lookbehind: !0,
          inside: { punctuation: /\./ }
        }
      })),
      e.languages.insertBefore('jsdoc', 'keyword', {
        'optional-parameter': {
          pattern: RegExp(
            n + /\[(?:(?!\s)[$\w\xA0-\uFFFF.])+(?:=[^[\]]+)?\](?=\s|$)/.source
          ),
          lookbehind: !0,
          inside: {
            parameter: {
              pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/,
              lookbehind: !0,
              inside: { punctuation: /\./ }
            },
            code: {
              pattern: /(=)[\s\S]*(?=\]$)/,
              lookbehind: !0,
              inside: a,
              alias: 'language-javascript'
            },
            punctuation: /[=[\]]/
          }
        },
        'class-name': [
          {
            pattern: RegExp(
              /(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\s+(?:<TYPE>\s+)?)[A-Z]\w*(?:\.[A-Z]\w*)*/.source.replace(
                /<TYPE>/g,
                function () {
                  return s;
                }
              )
            ),
            lookbehind: !0,
            inside: { punctuation: /\./ }
          },
          {
            pattern: RegExp('(@[a-z]+\\s+)' + s),
            lookbehind: !0,
            inside: {
              string: a.string,
              number: a.number,
              boolean: a.boolean,
              keyword: e.languages.typescript.keyword,
              operator: /=>|\.\.\.|[&|?:*]/,
              punctuation: /[.,;=<>{}()[\]]/
            }
          }
        ],
        example: {
          pattern:
            /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
          lookbehind: !0,
          inside: {
            code: {
              pattern: /^([\t ]*(?:\*\s*)?)\S.*$/m,
              lookbehind: !0,
              inside: a,
              alias: 'language-javascript'
            }
          }
        }
      }),
      e.languages.javadoclike.addSupport('javascript', e.languages.jsdoc));
  }
};
//# sourceMappingURL=prism-jsdoc-js.9c6c6368a70bafb4.js.map
