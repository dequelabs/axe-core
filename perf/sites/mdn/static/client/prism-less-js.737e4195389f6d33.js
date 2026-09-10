export const __rspack_esm_id = 357;
export const __rspack_esm_ids = [357];
export const __webpack_modules__ = {
  18713() {
    ((Prism.languages.less = Prism.languages.extend('css', {
      comment: [
        /\/\*[\s\S]*?\*\//,
        { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 }
      ],
      atrule: {
        pattern:
          /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
        inside: { punctuation: /[:()]/ }
      },
      selector: {
        pattern:
          /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
        inside: { variable: /@+[\w-]+/ }
      },
      property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/,
      operator: /[+\-*\/]/
    })),
      Prism.languages.insertBefore('less', 'property', {
        variable: [
          { pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } },
          /@@?[\w-]+/
        ],
        'mixin-usage': {
          pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
          lookbehind: !0,
          alias: 'function'
        }
      }));
  }
};
//# sourceMappingURL=prism-less-js.737e4195389f6d33.js.map
