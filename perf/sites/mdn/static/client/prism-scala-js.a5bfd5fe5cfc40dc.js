export const __rspack_esm_id = 6945;
export const __rspack_esm_ids = [6945];
export const __webpack_modules__ = {
  64252() {
    ((Prism.languages.scala = Prism.languages.extend('java', {
      'triple-quoted-string': {
        pattern: /"""[\s\S]*?"""/,
        greedy: !0,
        alias: 'string'
      },
      string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
      keyword:
        /<-|=>|\b(?:abstract|case|catch|class|def|derives|do|else|enum|extends|extension|final|finally|for|forSome|given|if|implicit|import|infix|inline|lazy|match|new|null|object|opaque|open|override|package|private|protected|return|sealed|self|super|this|throw|trait|transparent|try|type|using|val|var|while|with|yield)\b/,
      number:
        /\b0x(?:[\da-f]*\.)?[\da-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e\d+)?[dfl]?/i,
      builtin:
        /\b(?:Any|AnyRef|AnyVal|Boolean|Byte|Char|Double|Float|Int|Long|Nothing|Short|String|Unit)\b/,
      symbol: /'[^\d\s\\]\w*/
    })),
      Prism.languages.insertBefore('scala', 'triple-quoted-string', {
        'string-interpolation': {
          pattern:
            /\b[a-z]\w*(?:"""(?:[^$]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*?"""|"(?:[^$"\r\n]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*")/i,
          greedy: !0,
          inside: {
            id: { pattern: /^\w+/, greedy: !0, alias: 'function' },
            escape: { pattern: /\\\$"|\$[$"]/, greedy: !0, alias: 'symbol' },
            interpolation: {
              pattern: /\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,
              greedy: !0,
              inside: {
                punctuation: /^\$\{?|\}$/,
                expression: {
                  pattern: /[\s\S]+/,
                  inside: Prism.languages.scala
                }
              }
            },
            string: /[\s\S]+/
          }
        }
      }),
      delete Prism.languages.scala['class-name'],
      delete Prism.languages.scala.function,
      delete Prism.languages.scala.constant);
  }
};
//# sourceMappingURL=prism-scala-js.a5bfd5fe5cfc40dc.js.map
