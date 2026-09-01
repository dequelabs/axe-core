export const __rspack_esm_id = 9985;
export const __rspack_esm_ids = [9985];
export const __webpack_modules__ = {
  4993() {
    Prism.languages.jexl = {
      string: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
      transform: {
        pattern:
          /(\|\s*)[a-zA-Zа-яА-Я_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$][\wа-яА-Я\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$]*/,
        alias: 'function',
        lookbehind: !0
      },
      function:
        /[a-zA-Zа-яА-Я_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$][\wа-яА-Я\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$]*\s*(?=\()/,
      number: /\b\d+(?:\.\d+)?\b|\B\.\d+\b/,
      operator: /[<>!]=?|-|\+|&&|==|\|\|?|\/\/?|[?:*^%]/,
      boolean: /\b(?:false|true)\b/,
      keyword: /\bin\b/,
      punctuation: /[{}[\](),.]/
    };
  }
};
//# sourceMappingURL=prism-jexl-js.c838dc7a145d3b70.js.map
