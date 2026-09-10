export const __rspack_esm_id = 751;
export const __rspack_esm_ids = [751];
export const __webpack_modules__ = {
  44511() {
    var e, t, n;
    ((t = /#(?!\{).+/),
      (n = { pattern: /#\{[^}]+\}/, alias: 'variable' }),
      ((e = Prism).languages.coffeescript = e.languages.extend('javascript', {
        comment: t,
        string: [
          { pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0 },
          {
            pattern: /"(?:\\[\s\S]|[^\\"])*"/,
            greedy: !0,
            inside: { interpolation: n }
          }
        ],
        keyword:
          /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
        'class-member': { pattern: /@(?!\d)\w+/, alias: 'variable' }
      })),
      e.languages.insertBefore('coffeescript', 'comment', {
        'multiline-comment': { pattern: /###[\s\S]+?###/, alias: 'comment' },
        'block-regex': {
          pattern: /\/{3}[\s\S]*?\/{3}/,
          alias: 'regex',
          inside: { comment: t, interpolation: n }
        }
      }),
      e.languages.insertBefore('coffeescript', 'string', {
        'inline-javascript': {
          pattern: /`(?:\\[\s\S]|[^\\`])*`/,
          inside: {
            delimiter: { pattern: /^`|`$/, alias: 'punctuation' },
            script: {
              pattern: /[\s\S]+/,
              alias: 'language-javascript',
              inside: e.languages.javascript
            }
          }
        },
        'multiline-string': [
          { pattern: /'''[\s\S]*?'''/, greedy: !0, alias: 'string' },
          {
            pattern: /"""[\s\S]*?"""/,
            greedy: !0,
            alias: 'string',
            inside: { interpolation: n }
          }
        ]
      }),
      e.languages.insertBefore('coffeescript', 'keyword', {
        property: /(?!\d)\w+(?=\s*:(?!:))/
      }),
      delete e.languages.coffeescript['template-string'],
      (e.languages.coffee = e.languages.coffeescript));
  }
};
//# sourceMappingURL=prism-coffeescript-js.a061f60ffe071c82.js.map
