export const __rspack_esm_id = 4468;
export const __rspack_esm_ids = [4468];
export const __webpack_modules__ = {
  56258() {
    var e;
    (((e = Prism).languages.ejs = {
      delimiter: { pattern: /^<%[-_=]?|[-_]?%>$/, alias: 'punctuation' },
      comment: /^#[\s\S]*/,
      'language-javascript': {
        pattern: /[\s\S]+/,
        inside: e.languages.javascript
      }
    }),
      e.hooks.add('before-tokenize', function (a) {
        e.languages['markup-templating'].buildPlaceholders(
          a,
          'ejs',
          /<%(?!%)[\s\S]+?%>/g
        );
      }),
      e.hooks.add('after-tokenize', function (a) {
        e.languages['markup-templating'].tokenizePlaceholders(a, 'ejs');
      }),
      (e.languages.eta = e.languages.ejs));
  }
};
//# sourceMappingURL=prism-ejs-js.36d58400995ef97c.js.map
