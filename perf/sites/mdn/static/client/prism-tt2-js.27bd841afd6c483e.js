export const __rspack_esm_id = 7270;
export const __rspack_esm_ids = [7270];
export const __webpack_modules__ = {
  18872() {
    var e;
    (((e = Prism).languages.tt2 = e.languages.extend('clike', {
      comment: /#.*|\[%#[\s\S]*?%\]/,
      keyword:
        /\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FOREACH|GET|IF|IN|INCLUDE|INSERT|LAST|MACRO|META|NEXT|PERL|PROCESS|RAWPERL|RETURN|SET|STOP|SWITCH|TAGS|THROW|TRY|UNLESS|USE|WHILE|WRAPPER)\b/,
      punctuation: /[[\]{},()]/
    })),
      e.languages.insertBefore('tt2', 'number', {
        operator: /=[>=]?|!=?|<=?|>=?|&&|\|\|?|\b(?:and|not|or)\b/,
        variable: { pattern: /\b[a-z]\w*(?:\s*\.\s*(?:\d+|\$?[a-z]\w*))*\b/i }
      }),
      e.languages.insertBefore('tt2', 'keyword', {
        delimiter: { pattern: /^(?:\[%|%%)-?|-?%\]$/, alias: 'punctuation' }
      }),
      e.languages.insertBefore('tt2', 'string', {
        'single-quoted-string': {
          pattern: /'[^\\']*(?:\\[\s\S][^\\']*)*'/,
          greedy: !0,
          alias: 'string'
        },
        'double-quoted-string': {
          pattern: /"[^\\"]*(?:\\[\s\S][^\\"]*)*"/,
          greedy: !0,
          alias: 'string',
          inside: {
            variable: { pattern: /\$(?:[a-z]\w*(?:\.(?:\d+|\$?[a-z]\w*))*)/i }
          }
        }
      }),
      delete e.languages.tt2.string,
      e.hooks.add('before-tokenize', function (t) {
        e.languages['markup-templating'].buildPlaceholders(
          t,
          'tt2',
          /\[%[\s\S]+?%\]/g
        );
      }),
      e.hooks.add('after-tokenize', function (t) {
        e.languages['markup-templating'].tokenizePlaceholders(t, 'tt2');
      }));
  }
};
//# sourceMappingURL=prism-tt2-js.27bd841afd6c483e.js.map
