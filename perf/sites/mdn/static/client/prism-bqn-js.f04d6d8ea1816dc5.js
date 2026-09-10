export const __rspack_esm_id = 167;
export const __rspack_esm_ids = [167];
export const __webpack_modules__ = {
  45663() {
    Prism.languages.bqn = {
      shebang: { pattern: /^#![ \t]*\/.*/, alias: 'important', greedy: !0 },
      comment: { pattern: /#.*/, greedy: !0 },
      'string-literal': {
        pattern: /"(?:[^"]|"")*"/,
        greedy: !0,
        alias: 'string'
      },
      'character-literal': {
        pattern: /'(?:[\s\S]|[\uD800-\uDBFF][\uDC00-\uDFFF])'/,
        greedy: !0,
        alias: 'char'
      },
      function: /•[\w¯.∞π]+[\w¯.∞π]*/,
      'dot-notation-on-brackets': {
        pattern: /\{(?=.*\}\.)|\}\./,
        alias: 'namespace'
      },
      'special-name': {
        pattern: /(?:𝕨|𝕩|𝕗|𝕘|𝕤|𝕣|𝕎|𝕏|𝔽|𝔾|𝕊|_𝕣_|_𝕣)/,
        alias: 'keyword'
      },
      'dot-notation-on-name': {
        pattern: /[A-Za-z_][\w¯∞π]*\./,
        alias: 'namespace'
      },
      'word-number-scientific': {
        pattern: /\d+(?:\.\d+)?[eE]¯?\d+/,
        alias: 'number'
      },
      'word-name': { pattern: /[A-Za-z_][\w¯∞π]*/, alias: 'symbol' },
      'word-number': {
        pattern:
          /[¯∞π]?(?:\d*\.?\b\d+(?:e[+¯]?\d+|E[+¯]?\d+)?|¯|∞|π)(?:j¯?(?:(?:\d+(?:\.\d+)?|\.\d+)(?:e[+¯]?\d+|E[+¯]?\d+)?|¯|∞|π))?/,
        alias: 'number'
      },
      'null-literal': { pattern: /@/, alias: 'char' },
      'primitive-functions': {
        pattern: /[-+×÷⋆√⌊⌈|¬∧∨<>≠=≤≥≡≢⊣⊢⥊∾≍⋈↑↓↕«»⌽⍉/⍋⍒⊏⊑⊐⊒∊⍷⊔!]/,
        alias: 'operator'
      },
      'primitive-1-operators': { pattern: /[`˜˘¨⁼⌜´˝˙]/, alias: 'operator' },
      'primitive-2-operators': { pattern: /[∘⊸⟜○⌾⎉⚇⍟⊘◶⎊]/, alias: 'operator' },
      punctuation: /[←⇐↩(){}⟨⟩[\]‿·⋄,.;:?]/
    };
  }
};
//# sourceMappingURL=prism-bqn-js.f04d6d8ea1816dc5.js.map
