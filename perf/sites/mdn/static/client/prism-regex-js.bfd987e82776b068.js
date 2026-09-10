export const __rspack_esm_id = 3733;
export const __rspack_esm_ids = [3733];
export const __webpack_modules__ = {
  75133() {
    var a, e, t, n, s, r;
    ((a = Prism),
      (e = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: 'escape' }),
      (s = RegExp(
        (n =
          '(?:[^\\\\-]|' +
          (t =
            /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/)
            .source +
          ')') +
          '-' +
          n
      )),
      (r = {
        pattern: /(<|')[^<>']+(?=[>']$)/,
        lookbehind: !0,
        alias: 'variable'
      }),
      (a.languages.regex = {
        'char-class': {
          pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
          lookbehind: !0,
          inside: {
            'char-class-negation': {
              pattern: /(^\[)\^/,
              lookbehind: !0,
              alias: 'operator'
            },
            'char-class-punctuation': {
              pattern: /^\[|\]$/,
              alias: 'punctuation'
            },
            range: {
              pattern: s,
              inside: {
                escape: t,
                'range-punctuation': { pattern: /-/, alias: 'operator' }
              }
            },
            'special-escape': e,
            'char-set': {
              pattern: /\\[wsd]|\\p\{[^{}]+\}/i,
              alias: 'class-name'
            },
            escape: t
          }
        },
        'special-escape': e,
        'char-set': {
          pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i,
          alias: 'class-name'
        },
        backreference: [
          { pattern: /\\(?![123][0-7]{2})[1-9]/, alias: 'keyword' },
          {
            pattern: /\\k<[^<>']+>/,
            alias: 'keyword',
            inside: { 'group-name': r }
          }
        ],
        anchor: { pattern: /[$^]|\\[ABbGZz]/, alias: 'function' },
        escape: t,
        group: [
          {
            pattern:
              /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
            alias: 'punctuation',
            inside: { 'group-name': r }
          },
          { pattern: /\)/, alias: 'punctuation' }
        ],
        quantifier: {
          pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
          alias: 'number'
        },
        alternation: { pattern: /\|/, alias: 'keyword' }
      }));
  }
};
//# sourceMappingURL=prism-regex-js.bfd987e82776b068.js.map
