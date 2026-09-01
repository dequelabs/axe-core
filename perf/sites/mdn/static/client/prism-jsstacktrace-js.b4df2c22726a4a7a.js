export const __rspack_esm_id = 9172;
export const __rspack_esm_ids = [9172];
export const __webpack_modules__ = {
  52850() {
    Prism.languages.jsstacktrace = {
      'error-message': { pattern: /^\S.*/m, alias: 'string' },
      'stack-frame': {
        pattern: /(^[ \t]+)at[ \t].*/m,
        lookbehind: !0,
        inside: {
          'not-my-code': {
            pattern:
              /^at[ \t]+(?!\s)(?:node\.js|<unknown>|.*(?:node_modules|\(<anonymous>\)|\(<unknown>|<anonymous>$|\(internal\/|\(node\.js)).*/m,
            alias: 'comment'
          },
          filename: {
            pattern: /(\bat\s+(?!\s)|\()(?:[a-zA-Z]:)?[^():]+(?=:)/,
            lookbehind: !0,
            alias: 'url'
          },
          function: {
            pattern:
              /(\bat\s+(?:new\s+)?)(?!\s)[_$a-zA-Z\xA0-\uFFFF<][.$\w\xA0-\uFFFF<>]*/,
            lookbehind: !0,
            inside: { punctuation: /\./ }
          },
          punctuation: /[()]/,
          keyword: /\b(?:at|new)\b/,
          alias: {
            pattern:
              /\[(?:as\s+)?(?!\s)[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\]/,
            alias: 'variable'
          },
          'line-number': {
            pattern: /:\d+(?::\d+)?\b/,
            alias: 'number',
            inside: { punctuation: /:/ }
          }
        }
      }
    };
  }
};
//# sourceMappingURL=prism-jsstacktrace-js.b4df2c22726a4a7a.js.map
