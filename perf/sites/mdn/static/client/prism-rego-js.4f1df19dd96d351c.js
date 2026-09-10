export const __rspack_esm_id = 4431;
export const __rspack_esm_ids = [4431];
export const __webpack_modules__ = {
  38383() {
    Prism.languages.rego = {
      comment: /#.*/,
      property: {
        pattern:
          /(^|[^\\.])(?:"(?:\\.|[^\\"\r\n])*"|`[^`]*`|\b[a-z_]\w*\b)(?=\s*:(?!=))/i,
        lookbehind: !0,
        greedy: !0
      },
      string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"|`[^`]*`/,
        lookbehind: !0,
        greedy: !0
      },
      keyword:
        /\b(?:as|default|else|import|not|null|package|set(?=\s*\()|some|with)\b/,
      boolean: /\b(?:false|true)\b/,
      function: {
        pattern: /\b[a-z_]\w*\b(?:\s*\.\s*\b[a-z_]\w*\b)*(?=\s*\()/i,
        inside: { namespace: /\b\w+\b(?=\s*\.)/, punctuation: /\./ }
      },
      number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      operator: /[-+*/%|&]|[<>:=]=?|!=|\b_\b/,
      punctuation: /[,;.\[\]{}()]/
    };
  }
};
//# sourceMappingURL=prism-rego-js.4f1df19dd96d351c.js.map
