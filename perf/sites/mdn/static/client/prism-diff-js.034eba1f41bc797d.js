export const __rspack_esm_id = 4203;
export const __rspack_esm_ids = [4203];
export const __webpack_modules__ = {
  47839() {
    var e, s;
    (((e = Prism).languages.diff = {
      coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m]
    }),
      Object.keys(
        (s = {
          'deleted-sign': '-',
          'deleted-arrow': '<',
          'inserted-sign': '+',
          'inserted-arrow': '>',
          unchanged: ' ',
          diff: '!'
        })
      ).forEach(function (n) {
        var r = s[n],
          a = [];
        (/^\w+$/.test(n) || a.push(/\w+/.exec(n)[0]),
          'diff' === n && a.push('bold'),
          (e.languages.diff[n] = {
            pattern: RegExp(
              '^(?:[' + r + '].*(?:\r\n?|\n|(?![\\s\\S])))+',
              'm'
            ),
            alias: a,
            inside: {
              line: { pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/, lookbehind: !0 },
              prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(n)[0] }
            }
          }));
      }),
      Object.defineProperty(e.languages.diff, 'PREFIXES', { value: s }));
  }
};
//# sourceMappingURL=prism-diff-js.034eba1f41bc797d.js.map
