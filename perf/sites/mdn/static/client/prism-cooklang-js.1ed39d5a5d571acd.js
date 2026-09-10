export const __rspack_esm_id = 1074;
export const __rspack_esm_ids = [1074];
export const __webpack_modules__ = {
  36340() {
    var e, a, r, t, n;
    ((e = Prism),
      (a = /(?:(?!\s)[\d$+<=a-zA-Z\x80-\uFFFF])+/.source),
      (t = (r = /[^{}@#]+/.source) + /\{[^}#@]*\}/.source),
      (n = /(?:h|hours|hrs|m|min|minutes)/.source),
      (e.languages.cooklang = {
        comment: { pattern: /\[-[\s\S]*?-\]|--.*/, greedy: !0 },
        meta: {
          pattern: />>.*:.*/,
          inside: {
            property: {
              pattern: /(>>\s*)[^\s:](?:[^:]*[^\s:])?/,
              lookbehind: !0
            }
          }
        },
        'cookware-group': {
          pattern: RegExp('#(?:' + t + '|' + a + ')'),
          inside: {
            cookware: {
              pattern: RegExp('(^#)(?:' + r + ')'),
              lookbehind: !0,
              alias: 'variable'
            },
            'cookware-keyword': { pattern: /^#/, alias: 'keyword' },
            'quantity-group': {
              pattern: new RegExp(/\{[^{}@#]*\}/),
              inside: {
                quantity: {
                  pattern: new RegExp(/(^\{)/.source + r),
                  lookbehind: !0,
                  alias: 'number'
                },
                punctuation: /[{}]/
              }
            }
          }
        },
        'ingredient-group': {
          pattern: RegExp('@(?:' + t + '|' + a + ')'),
          inside: {
            ingredient: {
              pattern: RegExp('(^@)(?:' + r + ')'),
              lookbehind: !0,
              alias: 'variable'
            },
            'ingredient-keyword': { pattern: /^@/, alias: 'keyword' },
            'amount-group': {
              pattern: /\{[^{}]*\}/,
              inside: {
                amount: {
                  pattern: /([\{|])[^{}|*%]+/,
                  lookbehind: !0,
                  alias: 'number'
                },
                unit: { pattern: /(%)[^}]+/, lookbehind: !0, alias: 'symbol' },
                'servings-scaler': { pattern: /\*/, alias: 'operator' },
                'servings-alternative-separator': {
                  pattern: /\|/,
                  alias: 'operator'
                },
                'unit-separator': {
                  pattern: /(?:%|(\*)%)/,
                  lookbehind: !0,
                  alias: 'operator'
                },
                punctuation: /[{}]/
              }
            }
          }
        },
        'timer-group': {
          pattern: /~(?!\s)[^@#~{}]*\{[^{}]*\}/,
          inside: {
            timer: { pattern: /(^~)[^{]+/, lookbehind: !0, alias: 'variable' },
            'duration-group': {
              pattern: /\{[^{}]*\}/,
              inside: {
                punctuation: /[{}]/,
                unit: {
                  pattern: new RegExp(/(%\s*)/.source + n + /\b/.source),
                  lookbehind: !0,
                  alias: 'symbol'
                },
                operator: /%/,
                duration: { pattern: /\d+/, alias: 'number' }
              }
            },
            'timer-keyword': { pattern: /^~/, alias: 'keyword' }
          }
        }
      }));
  }
};
//# sourceMappingURL=prism-cooklang-js.1ed39d5a5d571acd.js.map
