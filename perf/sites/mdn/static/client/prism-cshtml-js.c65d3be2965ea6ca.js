export const __rspack_esm_id = 991;
export const __rspack_esm_ids = [991];
export const __webpack_modules__ = {
  30019() {
    !(function (e) {
      var s = /\/(?![/*])|\/\/.*[\r\n]|\/\*[^*]*(?:\*(?!\/)[^*]*)*\*\//.source,
        r =
          /@(?!")|"(?:[^\r\n\\"]|\\.)*"|@"(?:[^\\"]|""|\\[\s\S])*"(?!")/
            .source +
          '|' +
          /'(?:(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'|(?=[^\\](?!')))/
            .source;
      function a(e, a) {
        for (var o = 0; o < a; o++)
          e = e.replace(/<self>/g, function () {
            return '(?:' + e + ')';
          });
        return e
          .replace(/<self>/g, '[^\\s\\S]')
          .replace(/<str>/g, '(?:' + r + ')')
          .replace(/<comment>/g, '(?:' + s + ')');
      }
      var o = a(/\((?:[^()'"@/]|<str>|<comment>|<self>)*\)/.source, 2),
        c = a(/\[(?:[^\[\]'"@/]|<str>|<comment>|<self>)*\]/.source, 1),
        t = a(/\{(?:[^{}'"@/]|<str>|<comment>|<self>)*\}/.source, 2),
        u = a(/<(?:[^<>'"@/]|<comment>|<self>)*>/.source, 1),
        n =
          /@/.source +
          /(?:await\b\s*)?/.source +
          '(?:' +
          /(?!await\b)\w+\b/.source +
          '|' +
          o +
          ')(?:' +
          /[?!]?\.\w+\b/.source +
          '|(?:' +
          u +
          ')?' +
          o +
          '|' +
          c +
          ')*' +
          /(?![?!\.(\[]|<(?!\/))/.source,
        l = /@(?![\w()])/.source + '|' + n,
        i =
          '(?:' +
          /"[^"@]*"|'[^'@]*'|[^\s'"@>=]+(?=[\s>])/.source +
          '|["\'][^"\'@]*(?:(?:' +
          l +
          ')[^"\'@]*)+["\'])',
        g =
          /(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*<tagAttrValue>|(?=[\s/>])))+)?/.source.replace(
            /<tagAttrValue>/,
            i
          ),
        p = /(?!\d)[^\s>\/=$<%]+/.source + g + /\s*\/?>/.source,
        d =
          /\B@?/.source +
          '(?:' +
          /<([a-zA-Z][\w:]*)/.source +
          g +
          /\s*>/.source +
          '(?:' +
          (/[^<]/.source + '|' + /<\/?(?!\1\b)/.source + p) +
          '|' +
          a(
            /<\1/.source +
              g +
              /\s*>/.source +
              '(?:' +
              (/[^<]/.source + '|' + /<\/?(?!\1\b)/.source) +
              p +
              '|<self>)*' +
              /<\/\1\s*>/.source,
            2
          ) +
          ')*' +
          /<\/\1\s*>/.source +
          '|' +
          /</.source +
          p +
          ')';
      e.languages.cshtml = e.languages.extend('markup', {});
      var m = {
          pattern: /\S[\s\S]*/,
          alias: 'language-csharp',
          inside: e.languages.insertBefore(
            'csharp',
            'string',
            {
              html: {
                pattern: RegExp(d),
                greedy: !0,
                inside: e.languages.cshtml
              }
            },
            { csharp: e.languages.extend('csharp', {}) }
          )
        },
        h = {
          pattern: RegExp(/(^|[^@])/.source + n),
          lookbehind: !0,
          greedy: !0,
          alias: 'variable',
          inside: { keyword: /^@/, csharp: m }
        };
      ((e.languages.cshtml.tag.pattern = RegExp(/<\/?/.source + p)),
        (e.languages.cshtml.tag.inside['attr-value'].pattern = RegExp(
          /=\s*/.source + i
        )),
        e.languages.insertBefore(
          'inside',
          'punctuation',
          { value: h },
          e.languages.cshtml.tag.inside['attr-value']
        ),
        e.languages.insertBefore('cshtml', 'prolog', {
          'razor-comment': {
            pattern: /@\*[\s\S]*?\*@/,
            greedy: !0,
            alias: 'comment'
          },
          block: {
            pattern: RegExp(
              /(^|[^@])@/.source +
                '(?:' +
                [
                  t,
                  /(?:code|functions)\s*/.source + t,
                  /(?:for|foreach|lock|switch|using|while)\s*/.source +
                    o +
                    /\s*/.source +
                    t,
                  /do\s*/.source +
                    t +
                    /\s*while\s*/.source +
                    o +
                    /(?:\s*;)?/.source,
                  /try\s*/.source +
                    t +
                    /\s*catch\s*/.source +
                    o +
                    /\s*/.source +
                    t +
                    /\s*finally\s*/.source +
                    t,
                  /if\s*/.source +
                    o +
                    /\s*/.source +
                    t +
                    '(?:' +
                    /\s*else/.source +
                    '(?:' +
                    /\s+if\s*/.source +
                    o +
                    ')?' +
                    /\s*/.source +
                    t +
                    ')*',
                  /helper\s+\w+\s*/.source + o + /\s*/.source + t
                ].join('|') +
                ')'
            ),
            lookbehind: !0,
            greedy: !0,
            inside: { keyword: /^@\w*/, csharp: m }
          },
          directive: {
            pattern:
              /^([ \t]*)@(?:addTagHelper|attribute|implements|inherits|inject|layout|model|namespace|page|preservewhitespace|removeTagHelper|section|tagHelperPrefix|using)(?=\s).*/m,
            lookbehind: !0,
            greedy: !0,
            inside: { keyword: /^@\w+/, csharp: m }
          },
          value: h,
          'delegate-operator': {
            pattern: /(^|[^@])@(?=<)/,
            lookbehind: !0,
            alias: 'operator'
          }
        }),
        (e.languages.razor = e.languages.cshtml));
    })(Prism);
  }
};
//# sourceMappingURL=prism-cshtml-js.c65d3be2965ea6ca.js.map
