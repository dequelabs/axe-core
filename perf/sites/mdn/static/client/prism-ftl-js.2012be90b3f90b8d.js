export const __rspack_esm_id = 3298;
export const __rspack_esm_ids = [3298];
export const __webpack_modules__ = {
  27308() {
    for (
      var e = Prism,
        t =
          /[^<()"']|\((?:<expr>)*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'/
            .source,
        n = 0;
      n < 2;
      n++
    )
      t = t.replace(/<expr>/g, function () {
        return t;
      });
    t = t.replace(/<expr>/g, /[^\s\S]/.source);
    var r = {
      comment: /<#--[\s\S]*?-->/,
      string: [
        { pattern: /\br("|')(?:(?!\1)[^\\]|\\.)*\1/, greedy: !0 },
        {
          pattern: RegExp(
            /("|')(?:(?!\1|\$\{)[^\\]|\\.|\$\{(?:(?!\})(?:<expr>))*\})*\1/.source.replace(
              /<expr>/g,
              function () {
                return t;
              }
            )
          ),
          greedy: !0,
          inside: {
            interpolation: {
              pattern: RegExp(
                /((?:^|[^\\])(?:\\\\)*)\$\{(?:(?!\})(?:<expr>))*\}/.source.replace(
                  /<expr>/g,
                  function () {
                    return t;
                  }
                )
              ),
              lookbehind: !0,
              inside: {
                'interpolation-punctuation': {
                  pattern: /^\$\{|\}$/,
                  alias: 'punctuation'
                },
                rest: null
              }
            }
          }
        }
      ],
      keyword: /\b(?:as)\b/,
      boolean: /\b(?:false|true)\b/,
      'builtin-function': {
        pattern: /((?:^|[^?])\?\s*)\w+/,
        lookbehind: !0,
        alias: 'function'
      },
      function: /\b\w+(?=\s*\()/,
      number: /\b\d+(?:\.\d+)?\b/,
      operator:
        /\.\.[<*!]?|->|--|\+\+|&&|\|\||\?{1,2}|[-+*/%!=<>]=?|\b(?:gt|gte|lt|lte)\b/,
      punctuation: /[,;.:()[\]{}]/
    };
    ((r.string[1].inside.interpolation.inside.rest = r),
      (e.languages.ftl = {
        'ftl-comment': { pattern: /^<#--[\s\S]*/, alias: 'comment' },
        'ftl-directive': {
          pattern: /^<[\s\S]+>$/,
          inside: {
            directive: {
              pattern: /(^<\/?)[#@][a-z]\w*/i,
              lookbehind: !0,
              alias: 'keyword'
            },
            punctuation: /^<\/?|\/?>$/,
            content: { pattern: /\s*\S[\s\S]*/, alias: 'ftl', inside: r }
          }
        },
        'ftl-interpolation': {
          pattern: /^\$\{[\s\S]*\}$/,
          inside: {
            punctuation: /^\$\{|\}$/,
            content: { pattern: /\s*\S[\s\S]*/, alias: 'ftl', inside: r }
          }
        }
      }),
      e.hooks.add('before-tokenize', function (n) {
        var r = RegExp(
          /<#--[\s\S]*?-->|<\/?[#@][a-zA-Z](?:<expr>)*?>|\$\{(?:<expr>)*?\}/.source.replace(
            /<expr>/g,
            function () {
              return t;
            }
          ),
          'gi'
        );
        e.languages['markup-templating'].buildPlaceholders(n, 'ftl', r);
      }),
      e.hooks.add('after-tokenize', function (t) {
        e.languages['markup-templating'].tokenizePlaceholders(t, 'ftl');
      }));
  }
};
//# sourceMappingURL=prism-ftl-js.2012be90b3f90b8d.js.map
