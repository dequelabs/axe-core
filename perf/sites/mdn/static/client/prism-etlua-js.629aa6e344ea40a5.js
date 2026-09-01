export const __rspack_esm_id = 8411;
export const __rspack_esm_ids = [8411];
export const __webpack_modules__ = {
  97595() {
    var e;
    (((e = Prism).languages.etlua = {
      delimiter: { pattern: /^<%[-=]?|-?%>$/, alias: 'punctuation' },
      'language-lua': { pattern: /[\s\S]+/, inside: e.languages.lua }
    }),
      e.hooks.add('before-tokenize', function (a) {
        e.languages['markup-templating'].buildPlaceholders(
          a,
          'etlua',
          /<%[\s\S]+?%>/g
        );
      }),
      e.hooks.add('after-tokenize', function (a) {
        e.languages['markup-templating'].tokenizePlaceholders(a, 'etlua');
      }));
  }
};
//# sourceMappingURL=prism-etlua-js.629aa6e344ea40a5.js.map
