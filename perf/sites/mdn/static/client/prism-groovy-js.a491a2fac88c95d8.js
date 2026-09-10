export const __rspack_esm_id = 6444;
export const __rspack_esm_ids = [6444];
export const __webpack_modules__ = {
  75538() {
    var e, t;
    ((t = {
      pattern: /((?:^|[^\\$])(?:\\{2})*)\$(?:\w+|\{[^{}]*\})/,
      lookbehind: !0,
      inside: {
        'interpolation-punctuation': {
          pattern: /^\$\{?|\}$/,
          alias: 'punctuation'
        },
        expression: { pattern: /[\s\S]+/, inside: null }
      }
    }),
      ((e = Prism).languages.groovy = e.languages.extend('clike', {
        string: {
          pattern: /'''(?:[^\\]|\\[\s\S])*?'''|'(?:\\.|[^\\'\r\n])*'/,
          greedy: !0
        },
        keyword:
          /\b(?:abstract|as|assert|boolean|break|byte|case|catch|char|class|const|continue|def|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|in|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
        number:
          /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?)[glidf]?\b/i,
        operator: {
          pattern:
            /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
          lookbehind: !0
        },
        punctuation: /\.+|[{}[\];(),:$]/
      })),
      e.languages.insertBefore('groovy', 'string', {
        shebang: { pattern: /#!.+/, alias: 'comment', greedy: !0 },
        'interpolation-string': {
          pattern:
            /"""(?:[^\\]|\\[\s\S])*?"""|(["/])(?:\\.|(?!\1)[^\\\r\n])*\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/,
          greedy: !0,
          inside: { interpolation: t, string: /[\s\S]+/ }
        }
      }),
      e.languages.insertBefore('groovy', 'punctuation', {
        'spock-block': /\b(?:and|cleanup|expect|given|setup|then|when|where):/
      }),
      e.languages.insertBefore('groovy', 'function', {
        annotation: {
          pattern: /(^|[^.])@\w+/,
          lookbehind: !0,
          alias: 'punctuation'
        }
      }),
      (t.inside.expression.inside = e.languages.groovy));
  }
};
//# sourceMappingURL=prism-groovy-js.a491a2fac88c95d8.js.map
