export const __rspack_esm_id = 7212;
export const __rspack_esm_ids = [7212];
export const __webpack_modules__ = {
  99486() {
    var e;
    ((e = /\$(?:\w[a-z\d]*(?:_[^\x00-\x1F\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i),
      (Prism.languages.nginx = {
        comment: { pattern: /(^|[\s{};])#.*/, lookbehind: !0, greedy: !0 },
        directive: {
          pattern:
            /(^|\s)\w(?:[^;{}"'\\\s]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/,
          lookbehind: !0,
          greedy: !0,
          inside: {
            string: {
              pattern:
                /((?:^|[^\\])(?:\\\\)*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/,
              lookbehind: !0,
              greedy: !0,
              inside: {
                escape: { pattern: /\\["'\\nrt]/, alias: 'entity' },
                variable: e
              }
            },
            comment: { pattern: /(\s)#.*/, lookbehind: !0, greedy: !0 },
            keyword: { pattern: /^\S+/, greedy: !0 },
            boolean: { pattern: /(\s)(?:off|on)(?!\S)/, lookbehind: !0 },
            number: { pattern: /(\s)\d+[a-z]*(?!\S)/i, lookbehind: !0 },
            variable: e
          }
        },
        punctuation: /[{};]/
      }));
  }
};
//# sourceMappingURL=prism-nginx-js.5a8623daa9ca9f3a.js.map
