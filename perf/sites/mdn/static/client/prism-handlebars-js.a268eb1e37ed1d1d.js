export const __rspack_esm_id = 8094;
export const __rspack_esm_ids = [8094];
export const __webpack_modules__ = {
  43800() {
    var a;
    (((a = Prism).languages.handlebars = {
      comment: /\{\{![\s\S]*?\}\}/,
      delimiter: { pattern: /^\{\{\{?|\}\}\}?$/, alias: 'punctuation' },
      string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
      number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
      boolean: /\b(?:false|true)\b/,
      block: {
        pattern: /^(\s*(?:~\s*)?)[#\/]\S+?(?=\s*(?:~\s*)?$|\s)/,
        lookbehind: !0,
        alias: 'keyword'
      },
      brackets: {
        pattern: /\[[^\]]+\]/,
        inside: { punctuation: /\[|\]/, variable: /[\s\S]+/ }
      },
      punctuation: /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
      variable: /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/
    }),
      a.hooks.add('before-tokenize', function (e) {
        a.languages['markup-templating'].buildPlaceholders(
          e,
          'handlebars',
          /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g
        );
      }),
      a.hooks.add('after-tokenize', function (e) {
        a.languages['markup-templating'].tokenizePlaceholders(e, 'handlebars');
      }),
      (a.languages.hbs = a.languages.handlebars),
      (a.languages.mustache = a.languages.handlebars));
  }
};
//# sourceMappingURL=prism-handlebars-js.a268eb1e37ed1d1d.js.map
