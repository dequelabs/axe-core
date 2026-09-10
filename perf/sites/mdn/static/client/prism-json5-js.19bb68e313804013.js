export const __rspack_esm_id = 7043;
export const __rspack_esm_ids = [7043];
export const __webpack_modules__ = {
  10267() {
    var e, s;
    ((s = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/),
      ((e = Prism).languages.json5 = e.languages.extend('json', {
        property: [
          { pattern: RegExp(s.source + '(?=\\s*:)'), greedy: !0 },
          {
            pattern:
              /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
            alias: 'unquoted'
          }
        ],
        string: { pattern: s, greedy: !0 },
        number:
          /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/
      })));
  }
};
//# sourceMappingURL=prism-json5-js.19bb68e313804013.js.map
