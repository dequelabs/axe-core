export const __rspack_esm_id = 6745;
export const __rspack_esm_ids = [6745];
export const __webpack_modules__ = {
  6497() {
    Prism.languages.gedcom = {
      'line-value': {
        pattern:
          /(^[\t ]*\d+ +(?:@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@ +)?\w+ ).+/m,
        lookbehind: !0,
        inside: {
          pointer: {
            pattern: /^@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@$/,
            alias: 'variable'
          }
        }
      },
      record: {
        pattern:
          /(^[\t ]*\d+ +(?:@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@ +)?)\w+/m,
        lookbehind: !0,
        alias: 'tag'
      },
      level: { pattern: /(^[\t ]*)\d+/m, lookbehind: !0, alias: 'number' },
      pointer: {
        pattern: /@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@/,
        alias: 'variable'
      }
    };
  }
};
//# sourceMappingURL=prism-gedcom-js.a31adcee1f2a128e.js.map
