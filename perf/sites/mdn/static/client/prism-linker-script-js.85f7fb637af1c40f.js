export const __rspack_esm_id = 1379;
export const __rspack_esm_ids = [1379];
export const __webpack_modules__ = {
  95635() {
    ((Prism.languages['linker-script'] = {
      comment: {
        pattern: /(^|\s)\/\*[\s\S]*?(?:$|\*\/)/,
        lookbehind: !0,
        greedy: !0
      },
      identifier: { pattern: /"[^"\r\n]*"/, greedy: !0 },
      'location-counter': { pattern: /\B\.\B/, alias: 'important' },
      section: {
        pattern: /(^|[^\w*])\.\w+\b/,
        lookbehind: !0,
        alias: 'keyword'
      },
      function: /\b[A-Z][A-Z_]*(?=\s*\()/,
      number: /\b(?:0[xX][a-fA-F0-9]+|\d+)[KM]?\b/,
      operator: />>=?|<<=?|->|\+\+|--|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?/,
      punctuation: /[(){},;]/
    }),
      (Prism.languages.ld = Prism.languages['linker-script']));
  }
};
//# sourceMappingURL=prism-linker-script-js.85f7fb637af1c40f.js.map
