export const __rspack_esm_id = 1163;
export const __rspack_esm_ids = [1163];
export const __webpack_modules__ = {
  60463() {
    Prism.languages.julia = {
      comment: {
        pattern:
          /(^|[^\\])(?:#=(?:[^#=]|=(?!#)|#(?!=)|#=(?:[^#=]|=(?!#)|#(?!=))*=#)*=#|#.*)/,
        lookbehind: !0
      },
      regex: { pattern: /r"(?:\\.|[^"\\\r\n])*"[imsx]{0,4}/, greedy: !0 },
      string: {
        pattern:
          /"""[\s\S]+?"""|(?:\b\w+)?"(?:\\.|[^"\\\r\n])*"|`(?:[^\\`\r\n]|\\.)*`/,
        greedy: !0
      },
      char: {
        pattern: /(^|[^\w'])'(?:\\[^\r\n][^'\r\n]*|[^\\\r\n])'/,
        lookbehind: !0,
        greedy: !0
      },
      keyword:
        /\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/,
      boolean: /\b(?:false|true)\b/,
      number:
        /(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+(?:_[\da-f]+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[efp][+-]?\d+(?:_\d+)*)?j?/i,
      operator:
        /&&|\|\||[-+*^%÷⊻&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:|])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥'√∛]/,
      punctuation: /::?|[{}[\]();,.?]/,
      constant: /\b(?:(?:Inf|NaN)(?:16|32|64)?|im|pi)\b|[πℯ]/
    };
  }
};
//# sourceMappingURL=prism-julia-js.273abb70825f2a38.js.map
