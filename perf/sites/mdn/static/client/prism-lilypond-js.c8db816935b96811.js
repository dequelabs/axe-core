export const __rspack_esm_id = 1211;
export const __rspack_esm_ids = [1211];
export const __webpack_modules__ = {
  74215() {
    for (
      var e = Prism,
        n =
          /\((?:[^();"#\\]|\\[\s\S]|;.*(?!.)|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[\s\S])*#\}|[^{])|<expr>)*\)/
            .source,
        s = 0;
      s < 5;
      s++
    )
      n = n.replace(/<expr>/g, function () {
        return n;
      });
    n = n.replace(/<expr>/g, /[^\s\S]/.source);
    var d = (e.languages.lilypond = {
      comment: /%(?:(?!\{).*|\{[\s\S]*?%\})/,
      'embedded-scheme': {
        pattern: RegExp(
          /(^|[=\s])#(?:"(?:[^"\\]|\\.)*"|[^\s()"]*(?:[^\s()]|<expr>))/.source.replace(
            /<expr>/g,
            function () {
              return n;
            }
          ),
          'm'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          scheme: {
            pattern: /^(#)[\s\S]+$/,
            lookbehind: !0,
            alias: 'language-scheme',
            inside: {
              'embedded-lilypond': {
                pattern: /#\{[\s\S]*?#\}/,
                greedy: !0,
                inside: {
                  punctuation: /^#\{|#\}$/,
                  lilypond: {
                    pattern: /[\s\S]+/,
                    alias: 'language-lilypond',
                    inside: null
                  }
                }
              },
              rest: e.languages.scheme
            }
          },
          punctuation: /#/
        }
      },
      string: { pattern: /"(?:[^"\\]|\\.)*"/, greedy: !0 },
      'class-name': { pattern: /(\\new\s+)[\w-]+/, lookbehind: !0 },
      keyword: { pattern: /\\[a-z][-\w]*/i, inside: { punctuation: /^\\/ } },
      operator: /[=|]|<<|>>/,
      punctuation: {
        pattern:
          /(^|[a-z\d])(?:'+|,+|[_^]?-[_^]?(?:[-+^!>._]|(?=\d))|[_^]\.?|[.!])|[{}()[\]<>^~]|\\[()[\]<>\\!]|--|__/,
        lookbehind: !0
      },
      number: /\b\d+(?:\/\d+)?\b/
    });
    ((d['embedded-scheme'].inside.scheme.inside[
      'embedded-lilypond'
    ].inside.lilypond.inside = d),
      (e.languages.ly = d));
  }
};
//# sourceMappingURL=prism-lilypond-js.c8db816935b96811.js.map
