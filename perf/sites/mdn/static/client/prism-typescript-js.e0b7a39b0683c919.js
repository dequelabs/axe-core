export const __rspack_esm_id = 7907;
export const __rspack_esm_ids = [7907];
export const __webpack_modules__ = {
  59587() {
    var e, s;
    (((e = Prism).languages.typescript = e.languages.extend('javascript', {
      'class-name': {
        pattern:
          /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
        lookbehind: !0,
        greedy: !0,
        inside: null
      },
      builtin:
        /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
    })),
      e.languages.typescript.keyword.push(
        /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
        /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
        /\btype\b(?=\s*(?:[\{*]|$))/
      ),
      delete e.languages.typescript.parameter,
      delete e.languages.typescript['literal-property'],
      (s = e.languages.extend('typescript', {})),
      delete s['class-name'],
      (e.languages.typescript['class-name'].inside = s),
      e.languages.insertBefore('typescript', 'function', {
        decorator: {
          pattern: /@[$\w\xA0-\uFFFF]+/,
          inside: {
            at: { pattern: /^@/, alias: 'operator' },
            function: /^[\s\S]+/
          }
        },
        'generic-function': {
          pattern:
            /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
          greedy: !0,
          inside: {
            function:
              /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
            generic: { pattern: /<[\s\S]+/, alias: 'class-name', inside: s }
          }
        }
      }),
      (e.languages.ts = e.languages.typescript));
  }
};
//# sourceMappingURL=prism-typescript-js.e0b7a39b0683c919.js.map
