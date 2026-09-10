export const __rspack_esm_id = 681;
export const __rspack_esm_ids = [681];
export const __webpack_modules__ = {
  84709() {
    Prism.languages.qore = Prism.languages.extend('clike', {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:\/\/|#).*)/,
        lookbehind: !0
      },
      string: { pattern: /("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
      keyword:
        /\b(?:abstract|any|assert|binary|bool|boolean|break|byte|case|catch|char|class|code|const|continue|data|default|do|double|else|enum|extends|final|finally|float|for|goto|hash|if|implements|import|inherits|instanceof|int|interface|long|my|native|new|nothing|null|object|our|own|private|reference|rethrow|return|short|soft(?:bool|date|float|int|list|number|string)|static|strictfp|string|sub|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/,
      boolean: /\b(?:false|true)\b/i,
      function: /\$?\b(?!\d)\w+(?=\()/,
      number:
        /\b(?:0b[01]+|0x(?:[\da-f]*\.)?[\da-fp\-]+|(?:\d+(?:\.\d+)?|\.\d+)(?:e\d+)?[df]|(?:\d+(?:\.\d+)?|\.\d+))\b/i,
      operator: {
        pattern:
          /(^|[^.])(?:\+[+=]?|-[-=]?|[!=](?:==?|~)?|>>?=?|<(?:=>?|<=?)?|&[&=]?|\|[|=]?|[*\/%^]=?|[~?])/,
        lookbehind: !0
      },
      variable: /\$(?!\d)\w+\b/
    });
  }
};
//# sourceMappingURL=prism-qore-js.bc7d31037640c0a8.js.map
