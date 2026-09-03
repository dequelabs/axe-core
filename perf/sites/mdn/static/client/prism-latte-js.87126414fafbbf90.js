export const __rspack_esm_id = 7250;
export const __rspack_esm_ids = [7250];
export const __webpack_modules__ = {
  6784() {
    var a, t;
    (((a = Prism).languages.latte = {
      comment: /^\{\*[\s\S]*/,
      'latte-tag': {
        pattern: /(^\{(?:\/(?=[a-z]))?)(?:[=_]|[a-z]\w*\b(?!\())/i,
        lookbehind: !0,
        alias: 'important'
      },
      delimiter: { pattern: /^\{\/?|\}$/, alias: 'punctuation' },
      php: {
        pattern: /\S(?:[\s\S]*\S)?/,
        alias: 'language-php',
        inside: a.languages.php
      }
    }),
      (t = a.languages.extend('markup', {})),
      a.languages.insertBefore(
        'inside',
        'attr-value',
        {
          'n-attr': {
            pattern: /n:[\w-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+))?/,
            inside: {
              'attr-name': { pattern: /^[^\s=]+/, alias: 'important' },
              'attr-value': {
                pattern: /=[\s\S]+/,
                inside: {
                  punctuation: [
                    /^=/,
                    { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }
                  ],
                  php: { pattern: /\S(?:[\s\S]*\S)?/, inside: a.languages.php }
                }
              }
            }
          }
        },
        t.tag
      ),
      a.hooks.add('before-tokenize', function (e) {
        'latte' === e.language &&
          (a.languages['markup-templating'].buildPlaceholders(
            e,
            'latte',
            /\{\*[\s\S]*?\*\}|\{[^'"\s{}*](?:[^"'/{}]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|\/\*(?:[^*]|\*(?!\/))*\*\/)*\}/g
          ),
          (e.grammar = t));
      }),
      a.hooks.add('after-tokenize', function (t) {
        a.languages['markup-templating'].tokenizePlaceholders(t, 'latte');
      }));
  }
};
//# sourceMappingURL=prism-latte-js.87126414fafbbf90.js.map
