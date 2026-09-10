export const __rspack_esm_id = 4550;
export const __rspack_esm_ids = [4550];
export const __webpack_modules__ = {
  13028() {
    var e;
    (((e = Prism).languages.flow = e.languages.extend('javascript', {})),
      e.languages.insertBefore('flow', 'keyword', {
        type: [
          {
            pattern:
              /\b(?:[Bb]oolean|Function|[Nn]umber|[Ss]tring|[Ss]ymbol|any|mixed|null|void)\b/,
            alias: 'class-name'
          }
        ]
      }),
      (e.languages.flow['function-variable'].pattern =
        /(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/i),
      delete e.languages.flow.parameter,
      e.languages.insertBefore('flow', 'operator', {
        'flow-punctuation': { pattern: /\{\||\|\}/, alias: 'punctuation' }
      }),
      Array.isArray(e.languages.flow.keyword) ||
        (e.languages.flow.keyword = [e.languages.flow.keyword]),
      e.languages.flow.keyword.unshift(
        {
          pattern: /(^|[^$]\b)(?:Class|declare|opaque|type)\b(?!\$)/,
          lookbehind: !0
        },
        {
          pattern:
            /(^|[^$]\B)\$(?:Diff|Enum|Exact|Keys|ObjMap|PropertyType|Record|Shape|Subtype|Supertype|await)\b(?!\$)/,
          lookbehind: !0
        }
      ));
  }
};
//# sourceMappingURL=prism-flow-js.0097b6feb53d6ae3.js.map
