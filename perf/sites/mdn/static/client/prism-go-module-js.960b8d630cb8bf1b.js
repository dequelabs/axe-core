export const __rspack_esm_id = 7151;
export const __rspack_esm_ids = [7151];
export const __webpack_modules__ = {
  75955() {
    Prism.languages['go-mod'] = Prism.languages['go-module'] = {
      comment: { pattern: /\/\/.*/, greedy: !0 },
      version: {
        pattern: /(^|[\s()[\],])v\d+\.\d+\.\d+(?:[+-][-+.\w]*)?(?![^\s()[\],])/,
        lookbehind: !0,
        alias: 'number'
      },
      'go-version': {
        pattern: /((?:^|\s)go\s+)\d+(?:\.\d+){1,2}/,
        lookbehind: !0,
        alias: 'number'
      },
      keyword: {
        pattern: /^([ \t]*)(?:exclude|go|module|replace|require|retract)\b/m,
        lookbehind: !0
      },
      operator: /=>/,
      punctuation: /[()[\],]/
    };
  }
};
//# sourceMappingURL=prism-go-module-js.960b8d630cb8bf1b.js.map
