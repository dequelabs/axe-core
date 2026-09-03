export const __rspack_esm_id = 84;
export const __rspack_esm_ids = [84];
export const __webpack_modules__ = {
  99562() {
    var e, r, s;
    (((e = Prism).languages.sass = e.languages.extend('css', {
      comment: {
        pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
        lookbehind: !0,
        greedy: !0
      }
    })),
      e.languages.insertBefore('sass', 'atrule', {
        'atrule-line': {
          pattern: /^(?:[ \t]*)[@+=].+/m,
          greedy: !0,
          inside: { atrule: /(?:@[\w-]+|[+=])/ }
        }
      }),
      delete e.languages.sass.atrule,
      (r = /\$[-\w]+|#\{\$[-\w]+\}/),
      (s = [
        /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|not|or)\b/,
        { pattern: /(\s)-(?=\s)/, lookbehind: !0 }
      ]),
      e.languages.insertBefore('sass', 'property', {
        'variable-line': {
          pattern: /^[ \t]*\$.+/m,
          greedy: !0,
          inside: { punctuation: /:/, variable: r, operator: s }
        },
        'property-line': {
          pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
          greedy: !0,
          inside: {
            property: [
              /[^:\s]+(?=\s*:)/,
              { pattern: /(:)[^:\s]+/, lookbehind: !0 }
            ],
            punctuation: /:/,
            variable: r,
            operator: s,
            important: e.languages.sass.important
          }
        }
      }),
      delete e.languages.sass.property,
      delete e.languages.sass.important,
      e.languages.insertBefore('sass', 'punctuation', {
        selector: {
          pattern:
            /^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/m,
          lookbehind: !0,
          greedy: !0
        }
      }));
  }
};
//# sourceMappingURL=prism-sass-js.7482a6a4a49af94c.js.map
