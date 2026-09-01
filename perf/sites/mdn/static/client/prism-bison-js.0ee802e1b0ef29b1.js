export const __rspack_esm_id = 6253;
export const __rspack_esm_ids = [6253];
export const __webpack_modules__ = {
  99669() {
    ((Prism.languages.bison = Prism.languages.extend('c', {})),
      Prism.languages.insertBefore('bison', 'comment', {
        bison: {
          pattern: /^(?:[^%]|%(?!%))*%%[\s\S]*?%%/,
          inside: {
            c: {
              pattern: /%\{[\s\S]*?%\}|\{(?:\{[^}]*\}|[^{}])*\}/,
              inside: {
                delimiter: { pattern: /^%?\{|%?\}$/, alias: 'punctuation' },
                'bison-variable': {
                  pattern: /[$@](?:<[^\s>]+>)?[\w$]+/,
                  alias: 'variable',
                  inside: { punctuation: /<|>/ }
                },
                rest: Prism.languages.c
              }
            },
            comment: Prism.languages.c.comment,
            string: Prism.languages.c.string,
            property: /\S+(?=:)/,
            keyword: /%\w+/,
            number: {
              pattern: /(^|[^@])\b(?:0x[\da-f]+|\d+)/i,
              lookbehind: !0
            },
            punctuation: /%[%?]|[|:;\[\]<>]/
          }
        }
      }));
  }
};
//# sourceMappingURL=prism-bison-js.0ee802e1b0ef29b1.js.map
