export const __rspack_esm_id = 1243;
export const __rspack_esm_ids = [1243];
export const __webpack_modules__ = {
  37723() {
    ((Prism.languages.idris = Prism.languages.extend('haskell', {
      comment: { pattern: /(?:(?:--|\|\|\|).*$|\{-[\s\S]*?-\})/m },
      keyword:
        /\b(?:Type|case|class|codata|constructor|corecord|data|do|dsl|else|export|if|implementation|implicit|import|impossible|in|infix|infixl|infixr|instance|interface|let|module|mutual|namespace|of|parameters|partial|postulate|private|proof|public|quoteGoal|record|rewrite|syntax|then|total|using|where|with)\b/,
      builtin: void 0
    })),
      Prism.languages.insertBefore('idris', 'keyword', {
        'import-statement': {
          pattern: /(^\s*import\s+)(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*/m,
          lookbehind: !0,
          inside: { punctuation: /\./ }
        }
      }),
      (Prism.languages.idr = Prism.languages.idris));
  }
};
//# sourceMappingURL=prism-idris-js.474cc6a3ef1aa8cd.js.map
