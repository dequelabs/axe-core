export const __rspack_esm_id = 8889;
export const __rspack_esm_ids = [8889];
export const __webpack_modules__ = {
  57449() {
    var e;
    (((e = Prism).languages.erb = {
      delimiter: {
        pattern: /^(\s*)<%=?|%>(?=\s*$)/,
        lookbehind: !0,
        alias: 'punctuation'
      },
      ruby: {
        pattern: /\s*\S[\s\S]*/,
        alias: 'language-ruby',
        inside: e.languages.ruby
      }
    }),
      e.hooks.add('before-tokenize', function (n) {
        e.languages['markup-templating'].buildPlaceholders(
          n,
          'erb',
          /<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/g
        );
      }),
      e.hooks.add('after-tokenize', function (n) {
        e.languages['markup-templating'].tokenizePlaceholders(n, 'erb');
      }));
  }
};
//# sourceMappingURL=prism-erb-js.251e043543152905.js.map
