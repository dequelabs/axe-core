export const __rspack_esm_id = 8392;
export const __rspack_esm_ids = [8392];
export const __webpack_modules__ = {
  25294() {
    var a, e, t;
    ((a = Prism),
      (t = {
        'equation-command': {
          pattern: (e = /\\(?:[^a-z()[\]]|[a-z*]+)/i),
          alias: 'regex'
        }
      }),
      (a.languages.latex = {
        comment: /%.*/,
        cdata: {
          pattern:
            /(\\begin\{((?:lstlisting|verbatim)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
          lookbehind: !0
        },
        equation: [
          {
            pattern:
              /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
            inside: t,
            alias: 'string'
          },
          {
            pattern:
              /(\\begin\{((?:align|eqnarray|equation|gather|math|multline)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
            lookbehind: !0,
            inside: t,
            alias: 'string'
          }
        ],
        keyword: {
          pattern:
            /(\\(?:begin|cite|documentclass|end|label|ref|usepackage)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
          lookbehind: !0
        },
        url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
        headline: {
          pattern:
            /(\\(?:chapter|frametitle|paragraph|part|section|subparagraph|subsection|subsubparagraph|subsubsection|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
          lookbehind: !0,
          alias: 'class-name'
        },
        function: { pattern: e, alias: 'selector' },
        punctuation: /[[\]{}&]/
      }),
      (a.languages.tex = a.languages.latex),
      (a.languages.context = a.languages.latex));
  }
};
//# sourceMappingURL=prism-latex-js.9b9f63151e4d4275.js.map
