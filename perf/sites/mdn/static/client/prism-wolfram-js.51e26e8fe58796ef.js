export const __rspack_esm_id = 3076;
export const __rspack_esm_ids = [3076];
export const __webpack_modules__ = {
  43501() {
    ((Prism.languages.wolfram = {
      comment: /\(\*(?:\(\*(?:[^*]|\*(?!\)))*\*\)|(?!\(\*)[\s\S])*?\*\)/,
      string: { pattern: /"(?:\\.|[^"\\\r\n])*"/, greedy: !0 },
      keyword:
        /\b(?:Abs|AbsArg|Accuracy|Block|Do|For|Function|If|Manipulate|Module|Nest|NestList|None|Return|Switch|Table|Which|While)\b/,
      context: { pattern: /\b\w+`+\w*/, alias: 'class-name' },
      blank: { pattern: /\b\w+_\b/, alias: 'regex' },
      'global-variable': { pattern: /\$\w+/, alias: 'variable' },
      boolean: /\b(?:False|True)\b/,
      number:
        /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
      operator:
        /\/\.|;|=\.|\^=|\^:=|:=|<<|>>|<\||\|>|:>|\|->|->|<-|@@@|@@|@|\/@|=!=|===|==|=|\+|-|\[\/-+%=\]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
      punctuation: /[{}[\];(),.:]/
    }),
      (Prism.languages.mathematica = Prism.languages.wolfram),
      (Prism.languages.wl = Prism.languages.wolfram),
      (Prism.languages.nb = Prism.languages.wolfram));
  }
};
//# sourceMappingURL=prism-wolfram-js.51e26e8fe58796ef.js.map
