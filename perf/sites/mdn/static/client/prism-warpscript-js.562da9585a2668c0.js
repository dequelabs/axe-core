export const __rspack_esm_id = 4213;
export const __rspack_esm_ids = [4213];
export const __webpack_modules__ = {
  43037() {
    Prism.languages.warpscript = {
      comment: /#.*|\/\/.*|\/\*[\s\S]*?\*\//,
      string: {
        pattern:
          /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'|<'(?:[^\\']|'(?!>)|\\.)*'>/,
        greedy: !0
      },
      variable: /\$\S+/,
      macro: { pattern: /@\S+/, alias: 'property' },
      keyword:
        /\b(?:BREAK|CHECKMACRO|CONTINUE|CUDF|DEFINED|DEFINEDMACRO|EVAL|FAIL|FOR|FOREACH|FORSTEP|IFT|IFTE|MSGFAIL|NRETURN|RETHROW|RETURN|SWITCH|TRY|UDF|UNTIL|WHILE)\b/,
      number:
        /[+-]?\b(?:NaN|Infinity|\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?|0x[\da-fA-F]+|0b[01]+)\b/,
      boolean: /\b(?:F|T|false|true)\b/,
      punctuation: /<%|%>|[{}[\]()]/,
      operator:
        /==|&&?|\|\|?|\*\*?|>>>?|<<|[<>!~]=?|[-/%^]|\+!?|\b(?:AND|NOT|OR)\b/
    };
  }
};
//# sourceMappingURL=prism-warpscript-js.562da9585a2668c0.js.map
