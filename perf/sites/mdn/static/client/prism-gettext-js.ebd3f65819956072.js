export const __rspack_esm_id = 6141;
export const __rspack_esm_ids = [6141];
export const __webpack_modules__ = {
  11441() {
    ((Prism.languages.gettext = {
      comment: [
        { pattern: /# .*/, greedy: !0, alias: 'translator-comment' },
        { pattern: /#\..*/, greedy: !0, alias: 'extracted-comment' },
        { pattern: /#:.*/, greedy: !0, alias: 'reference-comment' },
        { pattern: /#,.*/, greedy: !0, alias: 'flag-comment' },
        {
          pattern: /#\|.*/,
          greedy: !0,
          alias: 'previously-untranslated-comment'
        },
        { pattern: /#.*/, greedy: !0 }
      ],
      string: {
        pattern: /(^|[^\\])"(?:[^"\\]|\\.)*"/,
        lookbehind: !0,
        greedy: !0
      },
      keyword: /^msg(?:ctxt|id|id_plural|str)\b/m,
      number: /\b\d+\b/,
      punctuation: /[\[\]]/
    }),
      (Prism.languages.po = Prism.languages.gettext));
  }
};
//# sourceMappingURL=prism-gettext-js.ebd3f65819956072.js.map
