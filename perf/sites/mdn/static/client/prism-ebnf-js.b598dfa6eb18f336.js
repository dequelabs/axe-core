export const __rspack_esm_id = 8171;
export const __rspack_esm_ids = [8171];
export const __webpack_modules__ = {
  763() {
    Prism.languages.ebnf = {
      comment: /\(\*[\s\S]*?\*\)/,
      string: { pattern: /"[^"\r\n]*"|'[^'\r\n]*'/, greedy: !0 },
      special: { pattern: /\?[^?\r\n]*\?/, greedy: !0, alias: 'class-name' },
      definition: {
        pattern: /^([\t ]*)[a-z]\w*(?:[ \t]+[a-z]\w*)*(?=\s*=)/im,
        lookbehind: !0,
        alias: ['rule', 'keyword']
      },
      rule: /\b[a-z]\w*(?:[ \t]+[a-z]\w*)*\b/i,
      punctuation: /\([:/]|[:/]\)|[.,;()[\]{}]/,
      operator: /[-=|*/!]/
    };
  }
};
//# sourceMappingURL=prism-ebnf-js.b598dfa6eb18f336.js.map
