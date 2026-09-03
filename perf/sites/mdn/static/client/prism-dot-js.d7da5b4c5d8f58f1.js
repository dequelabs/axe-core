export const __rspack_esm_id = 3997;
export const __rspack_esm_ids = [3997];
export const __webpack_modules__ = {
  84497() {
    var e = Prism,
      a =
        '(?:' +
        [
          /[a-zA-Z_\x80-\uFFFF][\w\x80-\uFFFF]*/.source,
          /-?(?:\.\d+|\d+(?:\.\d*)?)/.source,
          /"[^"\\]*(?:\\[\s\S][^"\\]*)*"/.source,
          /<(?:[^<>]|(?!<!--)<(?:[^<>"']|"[^"]*"|'[^']*')+>|<!--(?:[^-]|-(?!->))*-->)*>/
            .source
        ].join('|') +
        ')',
      r = {
        markup: {
          pattern: /(^<)[\s\S]+(?=>$)/,
          lookbehind: !0,
          alias: ['language-markup', 'language-html', 'language-xml'],
          inside: e.languages.markup
        }
      };
    function n(e, r) {
      return RegExp(
        e.replace(/<ID>/g, function () {
          return a;
        }),
        r
      );
    }
    ((e.languages.dot = {
      comment: { pattern: /\/\/.*|\/\*[\s\S]*?\*\/|^#.*/m, greedy: !0 },
      'graph-name': {
        pattern: n(/(\b(?:digraph|graph|subgraph)[ \t\r\n]+)<ID>/.source, 'i'),
        lookbehind: !0,
        greedy: !0,
        alias: 'class-name',
        inside: r
      },
      'attr-value': {
        pattern: n(/(=[ \t\r\n]*)<ID>/.source),
        lookbehind: !0,
        greedy: !0,
        inside: r
      },
      'attr-name': {
        pattern: n(/([\[;, \t\r\n])<ID>(?=[ \t\r\n]*=)/.source),
        lookbehind: !0,
        greedy: !0,
        inside: r
      },
      keyword: /\b(?:digraph|edge|graph|node|strict|subgraph)\b/i,
      'compass-point': {
        pattern: /(:[ \t\r\n]*)(?:[ewc_]|[ns][ew]?)(?![\w\x80-\uFFFF])/,
        lookbehind: !0,
        alias: 'builtin'
      },
      node: {
        pattern: n(/(^|[^-.\w\x80-\uFFFF\\])<ID>/.source),
        lookbehind: !0,
        greedy: !0,
        inside: r
      },
      operator: /[=:]|-[->]/,
      punctuation: /[\[\]{};,]/
    }),
      (e.languages.gv = e.languages.dot));
  }
};
//# sourceMappingURL=prism-dot-js.d7da5b4c5d8f58f1.js.map
