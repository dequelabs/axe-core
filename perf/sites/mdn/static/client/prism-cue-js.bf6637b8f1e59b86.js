export const __rspack_esm_id = 2381;
export const __rspack_esm_ids = [2381];
export const __webpack_modules__ = {
  57193() {
    var e, n, t;
    ((e = Prism),
      (n = /\\(?:(?!\2)|\2(?:[^()\r\n]|\([^()]*\)))/.source),
      (t =
        '(?:' +
        (
          /"""(?:[^\\"]|"(?!""\2)|<esc>)*"""/.source +
          '|' +
          /'''(?:[^\\']|'(?!''\2)|<esc>)*'''/.source +
          '|' +
          /"(?:[^\\\r\n"]|"(?!\2)|<esc>)*"/.source +
          '|' +
          /'(?:[^\\\r\n']|'(?!\2)|<esc>)*'/.source
        ).replace(/<esc>/g, n) +
        ')'),
      (e.languages.cue = {
        comment: { pattern: /\/\/.*/, greedy: !0 },
        'string-literal': {
          pattern: RegExp(/(^|[^#"'\\])(#*)/.source + t + /(?!["'])\2/.source),
          lookbehind: !0,
          greedy: !0,
          inside: {
            escape: {
              pattern:
                /(?=[\s\S]*["'](#*)$)\\\1(?:U[a-fA-F0-9]{1,8}|u[a-fA-F0-9]{1,4}|x[a-fA-F0-9]{1,2}|\d{2,3}|[^(])/,
              greedy: !0,
              alias: 'string'
            },
            interpolation: {
              pattern: /(?=[\s\S]*["'](#*)$)\\\1\([^()]*\)/,
              greedy: !0,
              inside: {
                punctuation: /^\\#*\(|\)$/,
                expression: { pattern: /[\s\S]+/, inside: null }
              }
            },
            string: /[\s\S]+/
          }
        },
        keyword: {
          pattern: /(^|[^\w$])(?:for|if|import|in|let|null|package)(?![\w$])/,
          lookbehind: !0
        },
        boolean: {
          pattern: /(^|[^\w$])(?:false|true)(?![\w$])/,
          lookbehind: !0
        },
        builtin: {
          pattern:
            /(^|[^\w$])(?:bool|bytes|float|float(?:32|64)|u?int(?:8|16|32|64|128)?|number|rune|string)(?![\w$])/,
          lookbehind: !0
        },
        attribute: { pattern: /@[\w$]+(?=\s*\()/, alias: 'function' },
        function: {
          pattern: /(^|[^\w$])[a-z_$][\w$]*(?=\s*\()/i,
          lookbehind: !0
        },
        number: {
          pattern:
            /(^|[^\w$.])(?:0b[01]+(?:_[01]+)*|0o[0-7]+(?:_[0-7]+)*|0[xX][0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*|(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[eE][+-]?\d+(?:_\d+)*)?(?:[KMGTP]i?)?)(?![\w$])/,
          lookbehind: !0
        },
        operator: /\.{3}|_\|_|&&?|\|\|?|[=!]~|[<>=!]=?|[+\-*/?]/,
        punctuation: /[()[\]{},.:]/
      }),
      (e.languages.cue[
        'string-literal'
      ].inside.interpolation.inside.expression.inside = e.languages.cue));
  }
};
//# sourceMappingURL=prism-cue-js.bf6637b8f1e59b86.js.map
