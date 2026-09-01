export const __rspack_esm_id = 6962;
export const __rspack_esm_ids = [6962];
export const __webpack_modules__ = {
  30260() {
    Prism.languages.makefile = {
      comment: {
        pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
        lookbehind: !0
      },
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
      },
      'builtin-target': {
        pattern: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
        alias: 'builtin'
      },
      target: {
        pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
        alias: 'symbol',
        inside: { variable: /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/ }
      },
      variable: /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
      keyword:
        /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
      function: {
        pattern:
          /(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,
        lookbehind: !0
      },
      operator: /(?:::|[?:+!])?=|[|@]/,
      punctuation: /[:;(){}]/
    };
  }
};
//# sourceMappingURL=prism-makefile-js.da4ef4dbda43e3d9.js.map
