export const __rspack_esm_id = 4555;
export const __rspack_esm_ids = [4555];
export const __webpack_modules__ = {
  77099() {
    Prism.languages.agda = {
      comment: /\{-[\s\S]*?(?:-\}|$)|--.*/,
      string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/, greedy: !0 },
      punctuation: /[(){}⦃⦄.;@]/,
      'class-name': { pattern: /((?:data|record) +)\S+/, lookbehind: !0 },
      function: { pattern: /(^[ \t]*)(?!\s)[^:\r\n]+(?=:)/m, lookbehind: !0 },
      operator: {
        pattern: /(^\s*|\s)(?:[=|:∀→λ\\?_]|->)(?=\s)/,
        lookbehind: !0
      },
      keyword:
        /\b(?:Set|abstract|constructor|data|eta-equality|field|forall|hiding|import|in|inductive|infix|infixl|infixr|instance|let|macro|module|mutual|no-eta-equality|open|overlap|pattern|postulate|primitive|private|public|quote|quoteContext|quoteGoal|quoteTerm|record|renaming|rewrite|syntax|tactic|unquote|unquoteDecl|unquoteDef|using|variable|where|with)\b/
    };
  }
};
//# sourceMappingURL=prism-agda-js.00afcbd73697c169.js.map
