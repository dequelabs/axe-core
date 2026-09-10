export const __rspack_esm_id = 86;
export const __rspack_esm_ids = [86];
export const __webpack_modules__ = {
  99948() {
    var e = Prism;
    function t(e, t, a) {
      return {
        pattern: RegExp('<#' + e + '[\\s\\S]*?#>'),
        alias: 'block',
        inside: {
          delimiter: {
            pattern: RegExp('^<#' + e + '|#>$'),
            alias: 'important'
          },
          content: { pattern: /[\s\S]+/, inside: t, alias: a }
        }
      };
    }
    e.languages['t4-templating'] = Object.defineProperty({}, 'createT4', {
      value: function (a) {
        var n = e.languages[a],
          s = 'language-' + a;
        return {
          block: {
            pattern: /<#[\s\S]+?#>/,
            inside: {
              directive: t('@', {
                'attr-value': {
                  pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/,
                  inside: { punctuation: /^=|^["']|["']$/ }
                },
                keyword: /\b\w+(?=\s)/,
                'attr-name': /\b\w+/
              }),
              expression: t('=', n, s),
              'class-feature': t('\\+', n, s),
              standard: t('', n, s)
            }
          }
        };
      }
    });
  }
};
//# sourceMappingURL=prism-t4-templating-js.3f4b0c1ee3d9d6fc.js.map
