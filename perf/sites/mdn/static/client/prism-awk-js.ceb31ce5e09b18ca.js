export const __rspack_esm_id = 3535;
export const __rspack_esm_ids = [3535];
export const __webpack_modules__ = {
  45167() {
    ((Prism.languages.awk = {
      hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' },
      comment: { pattern: /#.*/, greedy: !0 },
      string: {
        pattern: /(^|[^\\])"(?:[^\\"\r\n]|\\.)*"/,
        lookbehind: !0,
        greedy: !0
      },
      regex: {
        pattern: /((?:^|[^\w\s)])\s*)\/(?:[^\/\\\r\n]|\\.)*\//,
        lookbehind: !0,
        greedy: !0
      },
      variable: /\$\w+/,
      keyword:
        /\b(?:BEGIN|BEGINFILE|END|ENDFILE|break|case|continue|default|delete|do|else|exit|for|function|getline|if|in|next|nextfile|printf?|return|switch|while)\b|@(?:include|load)\b/,
      function: /\b[a-z_]\w*(?=\s*\()/i,
      number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[a-fA-F0-9]+)\b/,
      operator: /--|\+\+|!?~|>&|>>|<<|(?:\*\*|[<>!=+\-*/%^])=?|&&|\|[|&]|[?:]/,
      punctuation: /[()[\]{},;]/
    }),
      (Prism.languages.gawk = Prism.languages.awk));
  }
};
//# sourceMappingURL=prism-awk-js.ceb31ce5e09b18ca.js.map
