export const __rspack_esm_id = 1436;
export const __rspack_esm_ids = [1436];
export const __webpack_modules__ = {
  88530() {
    ((Prism.languages.openqasm = {
      comment: /\/\*[\s\S]*?\*\/|\/\/.*/,
      string: { pattern: /"[^"\r\n\t]*"|'[^'\r\n\t]*'/, greedy: !0 },
      keyword:
        /\b(?:CX|OPENQASM|U|barrier|boxas|boxto|break|const|continue|ctrl|def|defcal|defcalgrammar|delay|else|end|for|gate|gphase|if|in|include|inv|kernel|lengthof|let|measure|pow|reset|return|rotary|stretchinf|while)\b|#pragma\b/,
      'class-name':
        /\b(?:angle|bit|bool|creg|fixed|float|int|length|qreg|qubit|stretch|uint)\b/,
      function: /\b(?:cos|exp|ln|popcount|rotl|rotr|sin|sqrt|tan)\b(?=\s*\()/,
      constant: /\b(?:euler|pi|tau)\b|π|𝜏|ℇ/,
      number: {
        pattern:
          /(^|[^.\w$])(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?(?:dt|ns|us|µs|ms|s)?/i,
        lookbehind: !0
      },
      operator: /->|>>=?|<<=?|&&|\|\||\+\+|--|[!=<>&|~^+\-*/%]=?|@/,
      punctuation: /[(){}\[\];,:.]/
    }),
      (Prism.languages.qasm = Prism.languages.openqasm));
  }
};
//# sourceMappingURL=prism-openqasm-js.62d309b43c09446b.js.map
