export const __rspack_esm_id = 3695;
export const __rspack_esm_ids = [3695];
export const __webpack_modules__ = {
  62091() {
    var e, o, n;
    (((e = Prism).languages.django = {
      comment: /^\{#[\s\S]*?#\}$/,
      tag: { pattern: /(^\{%[+-]?\s*)\w+/, lookbehind: !0, alias: 'keyword' },
      delimiter: { pattern: /^\{[{%][+-]?|[+-]?[}%]\}$/, alias: 'punctuation' },
      string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
      filter: { pattern: /(\|)\w+/, lookbehind: !0, alias: 'function' },
      test: {
        pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/,
        lookbehind: !0,
        alias: 'function'
      },
      function: /\b[a-z_]\w+(?=\s*\()/i,
      keyword:
        /\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,
      operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
      number: /\b\d+(?:\.\d+)?\b/,
      boolean: /[Ff]alse|[Nn]one|[Tt]rue/,
      variable: /\b\w+\b/,
      punctuation: /[{}[\](),.:;]/
    }),
      (o = /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}|\{#[\s\S]*?#\}/g),
      (n = e.languages['markup-templating']),
      e.hooks.add('before-tokenize', function (e) {
        n.buildPlaceholders(e, 'django', o);
      }),
      e.hooks.add('after-tokenize', function (e) {
        n.tokenizePlaceholders(e, 'django');
      }),
      (e.languages.jinja2 = e.languages.django),
      e.hooks.add('before-tokenize', function (e) {
        n.buildPlaceholders(e, 'jinja2', o);
      }),
      e.hooks.add('after-tokenize', function (e) {
        n.tokenizePlaceholders(e, 'jinja2');
      }));
  }
};
//# sourceMappingURL=prism-django-js.6d51ffacc3e49df6.js.map
