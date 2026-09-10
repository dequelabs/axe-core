export const __rspack_esm_id = 418;
export const __rspack_esm_ids = [418];
export const __webpack_modules__ = {
  42237() {
    var e, t;
    ((e = { pattern: /^[;#].*/m, greedy: !0 }),
      (t = /"(?:[^\r\n"\\]|\\(?:[^\r]|\r\n?))*"(?!\S)/.source),
      (Prism.languages.systemd = {
        comment: e,
        section: {
          pattern: /^\[[^\n\r\[\]]*\](?=[ \t]*$)/m,
          greedy: !0,
          inside: {
            punctuation: /^\[|\]$/,
            'section-name': { pattern: /[\s\S]+/, alias: 'selector' }
          }
        },
        key: {
          pattern: /^[^\s=]+(?=[ \t]*=)/m,
          greedy: !0,
          alias: 'attr-name'
        },
        value: {
          pattern: RegExp(
            /(=[ \t]*(?!\s))/.source +
              '(?:' +
              t +
              '|(?=[^"\r\n]))(?:' +
              (/[^\s\\]/.source + '|[ 	]+(?:(?![ 	"])|' + t) +
              ')|' +
              /\\[\r\n]+(?:[#;].*[\r\n]+)*(?![#;])/.source +
              ')*'
          ),
          lookbehind: !0,
          greedy: !0,
          alias: 'attr-value',
          inside: {
            comment: e,
            quoted: {
              pattern: RegExp(/(^|\s)/.source + t),
              lookbehind: !0,
              greedy: !0
            },
            punctuation: /\\$/m,
            boolean: { pattern: /^(?:false|no|off|on|true|yes)$/, greedy: !0 }
          }
        },
        punctuation: /=/
      }));
  }
};
//# sourceMappingURL=prism-systemd-js.5d19aeb374392880.js.map
