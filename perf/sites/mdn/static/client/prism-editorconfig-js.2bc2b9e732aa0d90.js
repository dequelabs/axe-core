export const __rspack_esm_id = 9911;
export const __rspack_esm_ids = [9911];
export const __webpack_modules__ = {
  33959() {
    Prism.languages.editorconfig = {
      comment: /[;#].*/,
      section: {
        pattern: /(^[ \t]*)\[.+\]/m,
        lookbehind: !0,
        alias: 'selector',
        inside: {
          regex: /\\\\[\[\]{},!?.*]/,
          operator: /[!?]|\.\.|\*{1,2}/,
          punctuation: /[\[\]{},]/
        }
      },
      key: {
        pattern: /(^[ \t]*)[^\s=]+(?=[ \t]*=)/m,
        lookbehind: !0,
        alias: 'attr-name'
      },
      value: {
        pattern: /=.*/,
        alias: 'attr-value',
        inside: { punctuation: /^=/ }
      }
    };
  }
};
//# sourceMappingURL=prism-editorconfig-js.2bc2b9e732aa0d90.js.map
