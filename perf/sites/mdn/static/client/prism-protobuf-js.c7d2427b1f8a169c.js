export const __rspack_esm_id = 391;
export const __rspack_esm_ids = [391];
export const __webpack_modules__ = {
  39535() {
    var s, e;
    ((e =
      /\b(?:bool|bytes|double|s?fixed(?:32|64)|float|[su]?int(?:32|64)|string)\b/),
      ((s = Prism).languages.protobuf = s.languages.extend('clike', {
        'class-name': [
          {
            pattern:
              /(\b(?:enum|extend|message|service)\s+)[A-Za-z_]\w*(?=\s*\{)/,
            lookbehind: !0
          },
          {
            pattern:
              /(\b(?:rpc\s+\w+|returns)\s*\(\s*(?:stream\s+)?)\.?[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?=\s*\))/,
            lookbehind: !0
          }
        ],
        keyword:
          /\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|returns|rpc(?=\s+\w)|service|stream|syntax|to)\b(?!\s*=\s*\d)/,
        function: /\b[a-z_]\w*(?=\s*\()/i
      })),
      s.languages.insertBefore('protobuf', 'operator', {
        map: {
          pattern: /\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[a-z_]\w*\s*[=;])/i,
          alias: 'class-name',
          inside: { punctuation: /[<>.,]/, builtin: e }
        },
        builtin: e,
        'positional-class-name': {
          pattern:
            /(?:\b|\B\.)[a-z_]\w*(?:\.[a-z_]\w*)*(?=\s+[a-z_]\w*\s*[=;])/i,
          alias: 'class-name',
          inside: { punctuation: /\./ }
        },
        annotation: { pattern: /(\[\s*)[a-z_]\w*(?=\s*=)/i, lookbehind: !0 }
      }));
  }
};
//# sourceMappingURL=prism-protobuf-js.c7d2427b1f8a169c.js.map
