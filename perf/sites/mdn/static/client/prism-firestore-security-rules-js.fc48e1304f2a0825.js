export const __rspack_esm_id = 7790;
export const __rspack_esm_ids = [7790];
export const __webpack_modules__ = {
  59576() {
    ((Prism.languages['firestore-security-rules'] = Prism.languages.extend(
      'clike',
      {
        comment: /\/\/.*/,
        keyword:
          /\b(?:allow|function|if|match|null|return|rules_version|service)\b/,
        operator: /&&|\|\||[<>!=]=?|[-+*/%]|\b(?:in|is)\b/
      }
    )),
      delete Prism.languages['firestore-security-rules']['class-name'],
      Prism.languages.insertBefore('firestore-security-rules', 'keyword', {
        path: {
          pattern:
            /(^|[\s(),])(?:\/(?:[\w\xA0-\uFFFF]+|\{[\w\xA0-\uFFFF]+(?:=\*\*)?\}|\$\([\w\xA0-\uFFFF.]+\)))+/,
          lookbehind: !0,
          greedy: !0,
          inside: {
            variable: {
              pattern: /\{[\w\xA0-\uFFFF]+(?:=\*\*)?\}|\$\([\w\xA0-\uFFFF.]+\)/,
              inside: {
                operator: /=/,
                keyword: /\*\*/,
                punctuation: /[.$(){}]/
              }
            },
            punctuation: /\//
          }
        },
        method: {
          pattern: /(\ballow\s+)[a-z]+(?:\s*,\s*[a-z]+)*(?=\s*[:;])/,
          lookbehind: !0,
          alias: 'builtin',
          inside: { punctuation: /,/ }
        }
      }));
  }
};
//# sourceMappingURL=prism-firestore-security-rules-js.fc48e1304f2a0825.js.map
