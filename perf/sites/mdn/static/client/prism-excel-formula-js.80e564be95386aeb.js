export const __rspack_esm_id = 3396;
export const __rspack_esm_ids = [3396];
export const __webpack_modules__ = {
  80130() {
    ((Prism.languages['excel-formula'] = {
      comment: {
        pattern: /(\bN\(\s*)"(?:[^"]|"")*"(?=\s*\))/i,
        lookbehind: !0,
        greedy: !0
      },
      string: { pattern: /"(?:[^"]|"")*"(?!")/, greedy: !0 },
      reference: {
        pattern:
          /(?:'[^']*'|(?:[^\s()[\]{}<>*?"';,$&]*\[[^^\s()[\]{}<>*?"']+\])?\w+)!/,
        greedy: !0,
        alias: 'string',
        inside: {
          operator: /!$/,
          punctuation: /'/,
          sheet: { pattern: /[^[\]]+$/, alias: 'function' },
          file: { pattern: /\[[^[\]]+\]$/, inside: { punctuation: /[[\]]/ } },
          path: /[\s\S]+/
        }
      },
      'function-name': { pattern: /\b[A-Z]\w*(?=\()/i, alias: 'builtin' },
      range: {
        pattern:
          /\$?\b(?:[A-Z]+\$?\d+:\$?[A-Z]+\$?\d+|[A-Z]+:\$?[A-Z]+|\d+:\$?\d+)\b/i,
        alias: 'selector',
        inside: {
          operator: /:/,
          cell: /\$?[A-Z]+\$?\d+/i,
          column: /\$?[A-Z]+/i,
          row: /\$?\d+/
        }
      },
      cell: {
        pattern: /\b[A-Z]+\d+\b|\$[A-Za-z]+\$?\d+\b|\b[A-Za-z]+\$\d+\b/,
        alias: 'selector'
      },
      number: /(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e[+-]?\d+)?\b/i,
      boolean: /\b(?:FALSE|TRUE)\b/i,
      operator: /[-+*/^%=&,]|<[=>]?|>=?/,
      punctuation: /[[\]();{}|]/
    }),
      (Prism.languages.xlsx = Prism.languages.xls =
        Prism.languages['excel-formula']));
  }
};
//# sourceMappingURL=prism-excel-formula-js.80e564be95386aeb.js.map
