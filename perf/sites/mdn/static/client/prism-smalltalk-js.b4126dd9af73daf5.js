export const __rspack_esm_id = 7723;
export const __rspack_esm_ids = [7723];
export const __webpack_modules__ = {
  18619() {
    Prism.languages.smalltalk = {
      comment: { pattern: /"(?:""|[^"])*"/, greedy: !0 },
      char: { pattern: /\$./, greedy: !0 },
      string: { pattern: /'(?:''|[^'])*'/, greedy: !0 },
      symbol: /#[\da-z]+|#(?:-|([+\/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
      'block-arguments': {
        pattern: /(\[\s*):[^\[|]*\|/,
        lookbehind: !0,
        inside: { variable: /:[\da-z]+/i, punctuation: /\|/ }
      },
      'temporary-variables': {
        pattern: /\|[^|]+\|/,
        inside: { variable: /[\da-z]+/i, punctuation: /\|/ }
      },
      keyword: /\b(?:new|nil|self|super)\b/,
      boolean: /\b(?:false|true)\b/,
      number: [
        /\d+r-?[\dA-Z]+(?:\.[\dA-Z]+)?(?:e-?\d+)?/,
        /\b\d+(?:\.\d+)?(?:e-?\d+)?/
      ],
      operator: /[<=]=?|:=|~[~=]|\/\/?|\\\\|>[>=]?|[!^+\-*&|,@]/,
      punctuation: /[.;:?\[\](){}]/
    };
  }
};
//# sourceMappingURL=prism-smalltalk-js.b4126dd9af73daf5.js.map
