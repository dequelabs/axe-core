export const __rspack_esm_id = 5901;
export const __rspack_esm_ids = [5901];
export const __webpack_modules__ = {
  91113() {
    var s, e, t;
    ((e =
      /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/),
      ((s = Prism).languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: RegExp(
            '@[\\w-](?:' +
              /[^;{\s"']|\s+(?!\s)/.source +
              '|' +
              e.source +
              ')*?' +
              /(?:;|(?=\s*\{))/.source
          ),
          inside: {
            rule: /^@[\w-]+/,
            'selector-function-argument': {
              pattern:
                /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: !0,
              alias: 'selector'
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: !0
            }
          }
        },
        url: {
          pattern: RegExp(
            '\\burl\\((?:' +
              e.source +
              '|' +
              /(?:[^\\\r\n()"']|\\[\s\S])*/.source +
              ')\\)',
            'i'
          ),
          greedy: !0,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: { pattern: RegExp('^' + e.source + '$'), alias: 'url' }
          }
        },
        selector: {
          pattern: RegExp(
            '(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' +
              e.source +
              ')*(?=\\s*\\{)'
          ),
          lookbehind: !0
        },
        string: { pattern: e, greedy: !0 },
        property: {
          pattern:
            /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: !0
        },
        important: /!important\b/i,
        function: {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: !0
        },
        punctuation: /[(){};:,]/
      }),
      (s.languages.css.atrule.inside.rest = s.languages.css),
      (t = s.languages.markup) &&
        (t.tag.addInlined('style', 'css'), t.tag.addAttribute('style', 'css')));
  }
};
//# sourceMappingURL=prism-css-js.bc14af58452f3587.js.map
