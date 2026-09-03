export const __rspack_esm_id = 6730;
export const __rspack_esm_ids = [6730];
export const __webpack_modules__ = {
  11380() {
    var e;
    (((e = Prism).languages.crystal = e.languages.extend('ruby', {
      keyword: [
        /\b(?:__DIR__|__END_LINE__|__FILE__|__LINE__|abstract|alias|annotation|as|asm|begin|break|case|class|def|do|else|elsif|end|ensure|enum|extend|for|fun|if|ifdef|include|instance_sizeof|lib|macro|module|next|of|out|pointerof|private|protected|ptr|require|rescue|return|select|self|sizeof|struct|super|then|type|typeof|undef|uninitialized|union|unless|until|when|while|with|yield)\b/,
        { pattern: /(\.\s*)(?:is_a|responds_to)\?/, lookbehind: !0 }
      ],
      number:
        /\b(?:0b[01_]*[01]|0o[0-7_]*[0-7]|0x[\da-fA-F_]*[\da-fA-F]|(?:\d(?:[\d_]*\d)?)(?:\.[\d_]*\d)?(?:[eE][+-]?[\d_]*\d)?)(?:_(?:[uif](?:8|16|32|64))?)?\b/,
      operator: [/->/, e.languages.ruby.operator],
      punctuation: /[(){}[\].,;\\]/
    })),
      e.languages.insertBefore('crystal', 'string-literal', {
        attribute: {
          pattern: /@\[.*?\]/,
          inside: {
            delimiter: { pattern: /^@\[|\]$/, alias: 'punctuation' },
            attribute: {
              pattern: /^(\s*)\w+/,
              lookbehind: !0,
              alias: 'class-name'
            },
            args: { pattern: /\S(?:[\s\S]*\S)?/, inside: e.languages.crystal }
          }
        },
        expansion: {
          pattern: /\{(?:\{.*?\}|%.*?%)\}/,
          inside: {
            content: {
              pattern: /^(\{.)[\s\S]+(?=.\}$)/,
              lookbehind: !0,
              inside: e.languages.crystal
            },
            delimiter: { pattern: /^\{[\{%]|[\}%]\}$/, alias: 'operator' }
          }
        },
        char: {
          pattern:
            /'(?:[^\\\r\n]{1,2}|\\(?:.|u(?:[A-Fa-f0-9]{1,4}|\{[A-Fa-f0-9]{1,6}\})))'/,
          greedy: !0
        }
      }));
  }
};
//# sourceMappingURL=prism-crystal-js.3766e611118ab3a6.js.map
