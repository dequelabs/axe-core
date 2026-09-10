export const __rspack_esm_id = 5616;
export const __rspack_esm_ids = [5616];
export const __webpack_modules__ = {
  72514() {
    ((Prism.languages.json = {
      property: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
        lookbehind: !0,
        greedy: !0
      },
      string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        lookbehind: !0,
        greedy: !0
      },
      comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
      number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      punctuation: /[{}[\],]/,
      operator: /:/,
      boolean: /\b(?:false|true)\b/,
      null: { pattern: /\bnull\b/, alias: 'keyword' }
    }),
      (Prism.languages.webmanifest = Prism.languages.json));
  }
};
//# sourceMappingURL=prism-json-js.69f907cc2a904a1e.js.map
