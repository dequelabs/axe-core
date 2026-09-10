export const __rspack_esm_id = 6616;
export const __rspack_esm_ids = [6616];
export const __webpack_modules__ = {
  45714() {
    Prism.languages.roboconf = {
      comment: /#.*/,
      keyword: {
        pattern:
          /(^|\s)(?:(?:external|import)\b|(?:facet|instance of)(?=[ \t]+[\w-]+[ \t]*\{))/,
        lookbehind: !0
      },
      component: { pattern: /[\w-]+(?=[ \t]*\{)/, alias: 'variable' },
      property: /[\w.-]+(?=[ \t]*:)/,
      value: {
        pattern: /(=[ \t]*(?![ \t]))[^,;]+/,
        lookbehind: !0,
        alias: 'attr-value'
      },
      optional: { pattern: /\(optional\)/, alias: 'builtin' },
      wildcard: { pattern: /(\.)\*/, lookbehind: !0, alias: 'operator' },
      punctuation: /[{},.;:=]/
    };
  }
};
//# sourceMappingURL=prism-roboconf-js.cfa7a54c859f73c1.js.map
