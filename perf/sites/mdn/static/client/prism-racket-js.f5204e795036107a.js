export const __rspack_esm_id = 4832;
export const __rspack_esm_ids = [4832];
export const __webpack_modules__ = {
  47702() {
    ((Prism.languages.racket = Prism.languages.extend('scheme', {
      'lambda-parameter': {
        pattern: /([(\[]lambda\s+[(\[])[^()\[\]'\s]+/,
        lookbehind: !0
      }
    })),
      Prism.languages.insertBefore('racket', 'string', {
        lang: { pattern: /^#lang.+/m, greedy: !0, alias: 'keyword' }
      }),
      (Prism.languages.rkt = Prism.languages.racket));
  }
};
//# sourceMappingURL=prism-racket-js.f5204e795036107a.js.map
