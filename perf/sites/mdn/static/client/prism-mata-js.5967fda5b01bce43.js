export const __rspack_esm_id = 8865;
export const __rspack_esm_ids = [8865];
export const __webpack_modules__ = {
  645() {
    var e, t, s;
    ((e = Prism),
      (t = /\b(?:(?:col|row)?vector|matrix|scalar)\b/.source),
      (s =
        /\bvoid\b|<org>|\b(?:complex|numeric|pointer(?:\s*\([^()]*\))?|real|string|(?:class|struct)\s+\w+|transmorphic)(?:\s*<org>)?/.source.replace(
          /<org>/g,
          t
        )),
      (e.languages.mata = {
        comment: {
          pattern:
            /\/\/.*|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\//,
          greedy: !0
        },
        string: { pattern: /"[^"\r\n]*"|[‘`']".*?"[’`']/, greedy: !0 },
        'class-name': {
          pattern:
            /(\b(?:class|extends|struct)\s+)\w+(?=\s*(?:\{|\bextends\b))/,
          lookbehind: !0
        },
        type: {
          pattern: RegExp(s),
          alias: 'class-name',
          inside: {
            punctuation: /[()]/,
            keyword: /\b(?:class|function|struct|void)\b/
          }
        },
        keyword:
          /\b(?:break|class|continue|do|else|end|extends|external|final|for|function|goto|if|pragma|private|protected|public|return|static|struct|unset|unused|version|virtual|while)\b/,
        constant: /\bNULL\b/,
        number: {
          pattern:
            /(^|[^\w.])(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|\d[a-f0-9]*(?:\.[a-f0-9]+)?x[+-]?\d+)i?(?![\w.])/i,
          lookbehind: !0
        },
        missing: {
          pattern: /(^|[^\w.])(?:\.[a-z]?)(?![\w.])/,
          lookbehind: !0,
          alias: 'symbol'
        },
        function: /\b[a-z_]\w*(?=\s*\()/i,
        operator:
          /\.\.|\+\+|--|&&|\|\||:?(?:[!=<>]=|[+\-*/^<>&|:])|[!?=\\#’`']/,
        punctuation: /[()[\]{},;.]/
      }));
  }
};
//# sourceMappingURL=prism-mata-js.5967fda5b01bce43.js.map
