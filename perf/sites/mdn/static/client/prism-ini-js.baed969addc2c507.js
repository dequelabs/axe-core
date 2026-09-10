export const __rspack_esm_id = 4342;
export const __rspack_esm_ids = [4342];
export const __webpack_modules__ = {
  70824() {
    Prism.languages.ini = {
      comment: { pattern: /(^[ \f\t\v]*)[#;][^\n\r]*/m, lookbehind: !0 },
      section: {
        pattern: /(^[ \f\t\v]*)\[[^\n\r\]]*\]?/m,
        lookbehind: !0,
        inside: {
          'section-name': {
            pattern: /(^\[[ \f\t\v]*)[^ \f\t\v\]]+(?:[ \f\t\v]+[^ \f\t\v\]]+)*/,
            lookbehind: !0,
            alias: 'selector'
          },
          punctuation: /\[|\]/
        }
      },
      key: {
        pattern:
          /(^[ \f\t\v]*)[^ \f\n\r\t\v=]+(?:[ \f\t\v]+[^ \f\n\r\t\v=]+)*(?=[ \f\t\v]*=)/m,
        lookbehind: !0,
        alias: 'attr-name'
      },
      value: {
        pattern: /(=[ \f\t\v]*)[^ \f\n\r\t\v]+(?:[ \f\t\v]+[^ \f\n\r\t\v]+)*/,
        lookbehind: !0,
        alias: 'attr-value',
        inside: {
          'inner-value': { pattern: /^("|').+(?=\1$)/, lookbehind: !0 }
        }
      },
      punctuation: /=/
    };
  }
};
//# sourceMappingURL=prism-ini-js.baed969addc2c507.js.map
