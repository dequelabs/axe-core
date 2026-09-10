export const __rspack_esm_id = 1957;
export const __rspack_esm_ids = [1957];
export const __webpack_modules__ = {
  72513() {
    ((Prism.languages.actionscript = Prism.languages.extend('javascript', {
      keyword:
        /\b(?:as|break|case|catch|class|const|default|delete|do|dynamic|each|else|extends|final|finally|for|function|get|if|implements|import|in|include|instanceof|interface|internal|is|namespace|native|new|null|override|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|use|var|void|while|with)\b/,
      operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/
    })),
      (Prism.languages.actionscript['class-name'].alias = 'function'),
      delete Prism.languages.actionscript.parameter,
      delete Prism.languages.actionscript['literal-property'],
      Prism.languages.markup &&
        Prism.languages.insertBefore('actionscript', 'string', {
          xml: {
            pattern:
              /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
            lookbehind: !0,
            inside: Prism.languages.markup
          }
        }));
  }
};
//# sourceMappingURL=prism-actionscript-js.cca5e22c50508e66.js.map
