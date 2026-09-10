export const __rspack_esm_id = 8763;
export const __rspack_esm_ids = [8763];
export const __webpack_modules__ = {
  30559() {
    ((Prism.languages.aspnet = Prism.languages.extend('markup', {
      'page-directive': {
        pattern: /<%\s*@.*%>/,
        alias: 'tag',
        inside: {
          'page-directive': {
            pattern:
              /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
            alias: 'tag'
          },
          rest: Prism.languages.markup.tag.inside
        }
      },
      directive: {
        pattern: /<%.*%>/,
        alias: 'tag',
        inside: {
          directive: { pattern: /<%\s*?[$=%#:]{0,2}|%>/, alias: 'tag' },
          rest: Prism.languages.csharp
        }
      }
    })),
      (Prism.languages.aspnet.tag.pattern =
        /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/),
      Prism.languages.insertBefore(
        'inside',
        'punctuation',
        { directive: Prism.languages.aspnet.directive },
        Prism.languages.aspnet.tag.inside['attr-value']
      ),
      Prism.languages.insertBefore('aspnet', 'comment', {
        'asp-comment': {
          pattern: /<%--[\s\S]*?--%>/,
          alias: ['asp', 'comment']
        }
      }),
      Prism.languages.insertBefore(
        'aspnet',
        Prism.languages.javascript ? 'script' : 'tag',
        {
          'asp-script': {
            pattern:
              /(<script(?=.*runat=['"]?server\b)[^>]*>)[\s\S]*?(?=<\/script>)/i,
            lookbehind: !0,
            alias: ['asp', 'script'],
            inside: Prism.languages.csharp || {}
          }
        }
      ));
  }
};
//# sourceMappingURL=prism-aspnet-js.600dfe4022346f08.js.map
