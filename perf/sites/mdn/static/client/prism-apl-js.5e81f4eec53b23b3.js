export const __rspack_esm_id = 6517;
export const __rspack_esm_ids = [6517];
export const __webpack_modules__ = {
  76181() {
    Prism.languages.apl = {
      comment: /(?:⍝|#[! ]).*$/m,
      string: { pattern: /'(?:[^'\r\n]|'')*'/, greedy: !0 },
      number:
        /¯?(?:\d*\.?\b\d+(?:e[+¯]?\d+)?|¯|∞)(?:j¯?(?:(?:\d+(?:\.\d+)?|\.\d+)(?:e[+¯]?\d+)?|¯|∞))?/i,
      statement: /:[A-Z][a-z][A-Za-z]*\b/,
      'system-function': { pattern: /⎕[A-Z]+/i, alias: 'function' },
      constant: /[⍬⌾#⎕⍞]/,
      function:
        /[-+×÷⌈⌊∣|⍳⍸?*⍟○!⌹<≤=>≥≠≡≢∊⍷∪∩~∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⊆⊇⌷⍋⍒⊤⊥⍕⍎⊣⊢⍁⍂≈⍯↗¤→]/,
      'monadic-operator': { pattern: /[\\\/⌿⍀¨⍨⌶&∥]/, alias: 'operator' },
      'dyadic-operator': { pattern: /[.⍣⍠⍤∘⌸@⌺⍥]/, alias: 'operator' },
      assignment: { pattern: /←/, alias: 'keyword' },
      punctuation: /[\[;\]()◇⋄]/,
      dfn: { pattern: /[{}⍺⍵⍶⍹∇⍫:]/, alias: 'builtin' }
    };
  }
};
//# sourceMappingURL=prism-apl-js.5e81f4eec53b23b3.js.map
