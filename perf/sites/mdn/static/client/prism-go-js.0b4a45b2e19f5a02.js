export const __rspack_esm_id = 6680;
export const __rspack_esm_ids = [6680];
export const __webpack_modules__ = {
  86378() {
    ((Prism.languages.go = Prism.languages.extend('clike', {
      string: {
        pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
        lookbehind: !0,
        greedy: !0
      },
      keyword:
        /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
      boolean: /\b(?:_|false|iota|nil|true)\b/,
      number: [
        /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
        /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
        /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
      ],
      operator:
        /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
      builtin:
        /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
    })),
      Prism.languages.insertBefore('go', 'string', {
        char: { pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/, greedy: !0 }
      }),
      delete Prism.languages.go['class-name']);
  }
};
//# sourceMappingURL=prism-go-js.0b4a45b2e19f5a02.js.map
