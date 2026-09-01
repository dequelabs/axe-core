export const __rspack_esm_id = 6833;
export const __rspack_esm_ids = [6833];
export const __webpack_modules__ = {
  42493() {
    ((Prism.languages.bbcode = {
      tag: {
        pattern:
          /\[\/?[^\s=\]]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+))?(?:\s+[^\s=\]]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+))*\s*\]/,
        inside: {
          tag: {
            pattern: /^\[\/?[^\s=\]]+/,
            inside: { punctuation: /^\[\/?/ }
          },
          'attr-value': {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+)/,
            inside: {
              punctuation: [
                /^=/,
                { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }
              ]
            }
          },
          punctuation: /\]/,
          'attr-name': /[^\s=\]]+/
        }
      }
    }),
      (Prism.languages.shortcode = Prism.languages.bbcode));
  }
};
//# sourceMappingURL=prism-bbcode-js.32bb946165b36f3f.js.map
