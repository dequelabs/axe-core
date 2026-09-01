export const __rspack_esm_id = 4008;
export const __rspack_esm_ids = [4008];
export const __webpack_modules__ = {
  62486() {
    var n = Prism,
      o = /\s\x00-\x1f\x22-\x2f\x3a-\x3f\x5b-\x5e\x60\x7b-\x7e/.source;
    function e(n, e) {
      return RegExp(n.replace(/<nonId>/g, o), e);
    }
    ((n.languages.kumir = {
      comment: { pattern: /\|.*/ },
      prolog: { pattern: /#.*/, greedy: !0 },
      string: { pattern: /"[^\n\r"]*"|'[^\n\r']*'/, greedy: !0 },
      boolean: {
        pattern: e(/(^|[<nonId>])(?:да|нет)(?=[<nonId>]|$)/.source),
        lookbehind: !0
      },
      'operator-word': {
        pattern: e(/(^|[<nonId>])(?:и|или|не)(?=[<nonId>]|$)/.source),
        lookbehind: !0,
        alias: 'keyword'
      },
      'system-variable': {
        pattern: e(/(^|[<nonId>])знач(?=[<nonId>]|$)/.source),
        lookbehind: !0,
        alias: 'keyword'
      },
      type: [
        {
          pattern: e(
            /(^|[<nonId>])(?:вещ|лит|лог|сим|цел)(?:\x20*таб)?(?=[<nonId>]|$)/
              .source
          ),
          lookbehind: !0,
          alias: 'builtin'
        },
        {
          pattern: e(
            /(^|[<nonId>])(?:компл|сканкод|файл|цвет)(?=[<nonId>]|$)/.source
          ),
          lookbehind: !0,
          alias: 'important'
        }
      ],
      keyword: {
        pattern: e(
          /(^|[<nonId>])(?:алг|арг(?:\x20*рез)?|ввод|ВКЛЮЧИТЬ|вс[её]|выбор|вывод|выход|дано|для|до|дс|если|иначе|исп|использовать|кон(?:(?:\x20+|_)исп)?|кц(?:(?:\x20+|_)при)?|надо|нач|нс|нц|от|пауза|пока|при|раза?|рез|стоп|таб|то|утв|шаг)(?=[<nonId>]|$)/
            .source
        ),
        lookbehind: !0
      },
      name: {
        pattern: e(
          /(^|[<nonId>])[^\d<nonId>][^<nonId>]*(?:\x20+[^<nonId>]+)*(?=[<nonId>]|$)/
            .source
        ),
        lookbehind: !0
      },
      number: {
        pattern: e(
          /(^|[<nonId>])(?:\B\$[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)(?=[<nonId>]|$)/
            .source,
          'i'
        ),
        lookbehind: !0
      },
      punctuation: /:=|[(),:;\[\]]/,
      'operator-char': { pattern: /\*\*?|<[=>]?|>=?|[-+/=]/, alias: 'operator' }
    }),
      (n.languages.kum = n.languages.kumir));
  }
};
//# sourceMappingURL=prism-kumir-js.62b830e28f19c87f.js.map
