export const __rspack_esm_id = 3864;
export const __rspack_esm_ids = [3864];
export const __webpack_modules__ = {
  7506() {
    var e, a;
    ((a = /(?:\b[a-zA-Z]\w*|[|\\[\]])+/.source),
      ((e = Prism).languages.phpdoc = e.languages.extend('javadoclike', {
        parameter: {
          pattern: RegExp(
            '(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:' +
              a +
              '\\s+)?)\\$\\w+'
          ),
          lookbehind: !0
        }
      })),
      e.languages.insertBefore('phpdoc', 'keyword', {
        'class-name': [
          {
            pattern: RegExp(
              '(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)' +
                a
            ),
            lookbehind: !0,
            inside: {
              keyword:
                /\b(?:array|bool|boolean|callback|double|false|float|int|integer|mixed|null|object|resource|self|string|true|void)\b/,
              punctuation: /[|\\[\]()]/
            }
          }
        ]
      }),
      e.languages.javadoclike.addSupport('php', e.languages.phpdoc));
  }
};
//# sourceMappingURL=prism-phpdoc-js.05d7487b2c790cc1.js.map
