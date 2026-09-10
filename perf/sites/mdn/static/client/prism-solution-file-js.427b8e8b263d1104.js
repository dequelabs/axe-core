export const __rspack_esm_id = 2812;
export const __rspack_esm_ids = [2812];
export const __webpack_modules__ = {
  24686() {
    var n, e;
    ((e = {
      pattern: /\{[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}\}/i,
      alias: 'constant',
      inside: { punctuation: /[{}]/ }
    }),
      ((n = Prism).languages['solution-file'] = {
        comment: { pattern: /#.*/, greedy: !0 },
        string: {
          pattern: /"[^"\r\n]*"|'[^'\r\n]*'/,
          greedy: !0,
          inside: { guid: e }
        },
        object: {
          pattern:
            /^([ \t]*)(?:([A-Z]\w*)\b(?=.*(?:\r\n?|\n)(?:\1[ \t].*(?:\r\n?|\n))*\1End\2(?=[ \t]*$))|End[A-Z]\w*(?=[ \t]*$))/m,
          lookbehind: !0,
          greedy: !0,
          alias: 'keyword'
        },
        property: {
          pattern: /^([ \t]*)(?!\s)[^\r\n"#=()]*[^\s"#=()](?=\s*=)/m,
          lookbehind: !0,
          inside: { guid: e }
        },
        guid: e,
        number: /\b\d+(?:\.\d+)*\b/,
        boolean: /\b(?:FALSE|TRUE)\b/,
        operator: /=/,
        punctuation: /[(),]/
      }),
      (n.languages.sln = n.languages['solution-file']));
  }
};
//# sourceMappingURL=prism-solution-file-js.427b8e8b263d1104.js.map
