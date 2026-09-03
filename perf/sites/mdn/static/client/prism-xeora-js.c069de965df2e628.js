export const __rspack_esm_id = 9967;
export const __rspack_esm_ids = [9967];
export const __webpack_modules__ = {
  52639() {
    var n;
    (((n = Prism).languages.xeora = n.languages.extend('markup', {
      constant: {
        pattern: /\$(?:DomainContents|PageRenderDuration)\$/,
        inside: { punctuation: { pattern: /\$/ } }
      },
      variable: {
        pattern: /\$@?(?:#+|[-+*~=^])?[\w.]+\$/,
        inside: {
          punctuation: { pattern: /[$.]/ },
          operator: { pattern: /#+|[-+*~=^@]/ }
        }
      },
      'function-inline': {
        pattern:
          /\$F:[-\w.]+\?[-\w.]+(?:,(?:(?:@[-#]*\w+\.[\w+.]\.*)*\|)*(?:(?:[\w+]|[-#*.~^]+[\w+]|=\S)(?:[^$=]|=+[^=])*=*|(?:@[-#]*\w+\.[\w+.]\.*)+(?:(?:[\w+]|[-#*~^][-#*.~^]*[\w+]|=\S)(?:[^$=]|=+[^=])*=*)?)?)?\$/,
        inside: {
          variable: {
            pattern: /(?:[,|])@?(?:#+|[-+*~=^])?[\w.]+/,
            inside: {
              punctuation: { pattern: /[,.|]/ },
              operator: { pattern: /#+|[-+*~=^@]/ }
            }
          },
          punctuation: { pattern: /\$\w:|[$:?.,|]/ }
        },
        alias: 'function'
      },
      'function-block': {
        pattern:
          /\$XF:\{[-\w.]+\?[-\w.]+(?:,(?:(?:@[-#]*\w+\.[\w+.]\.*)*\|)*(?:(?:[\w+]|[-#*.~^]+[\w+]|=\S)(?:[^$=]|=+[^=])*=*|(?:@[-#]*\w+\.[\w+.]\.*)+(?:(?:[\w+]|[-#*~^][-#*.~^]*[\w+]|=\S)(?:[^$=]|=+[^=])*=*)?)?)?\}:XF\$/,
        inside: { punctuation: { pattern: /[$:{}?.,|]/ } },
        alias: 'function'
      },
      'directive-inline': {
        pattern: /\$\w(?:#\d+\+?)?(?:\[[-\w.]+\])?:[-\/\w.]+\$/,
        inside: {
          punctuation: {
            pattern: /\$(?:\w:|C(?:\[|#\d))?|[:{[\]]/,
            inside: { tag: { pattern: /#\d/ } }
          }
        },
        alias: 'function'
      },
      'directive-block-open': {
        pattern:
          /\$\w+:\{|\$\w(?:#\d+\+?)?(?:\[[-\w.]+\])?:[-\w.]+:\{(?:![A-Z]+)?/,
        inside: {
          punctuation: {
            pattern: /\$(?:\w:|C(?:\[|#\d))?|[:{[\]]/,
            inside: { tag: { pattern: /#\d/ } }
          },
          attribute: {
            pattern: /![A-Z]+$/,
            inside: { punctuation: { pattern: /!/ } },
            alias: 'keyword'
          }
        },
        alias: 'function'
      },
      'directive-block-separator': {
        pattern: /\}:[-\w.]+:\{/,
        inside: { punctuation: { pattern: /[:{}]/ } },
        alias: 'function'
      },
      'directive-block-close': {
        pattern: /\}:[-\w.]+\$/,
        inside: { punctuation: { pattern: /[:{}$]/ } },
        alias: 'function'
      }
    })),
      n.languages.insertBefore(
        'inside',
        'punctuation',
        { variable: n.languages.xeora['function-inline'].inside.variable },
        n.languages.xeora['function-block']
      ),
      (n.languages.xeoracube = n.languages.xeora));
  }
};
//# sourceMappingURL=prism-xeora-js.c069de965df2e628.js.map
