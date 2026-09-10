export const __rspack_esm_id = 8336;
export const __rspack_esm_ids = [8336];
export const __webpack_modules__ = {
  27966() {
    ((Prism.languages.d = Prism.languages.extend('clike', {
      comment: [
        { pattern: /^\s*#!.+/, greedy: !0 },
        {
          pattern: RegExp(
            /(^|[^\\])/.source +
              '(?:' +
              [
                /\/\+(?:\/\+(?:[^+]|\+(?!\/))*\+\/|(?!\/\+)[\s\S])*?\+\//
                  .source,
                /\/\/.*/.source,
                /\/\*[\s\S]*?\*\//.source
              ].join('|') +
              ')'
          ),
          lookbehind: !0,
          greedy: !0
        }
      ],
      string: [
        {
          pattern: RegExp(
            [
              /\b[rx]"(?:\\[\s\S]|[^\\"])*"[cwd]?/.source,
              /\bq"(?:\[[\s\S]*?\]|\([\s\S]*?\)|<[\s\S]*?>|\{[\s\S]*?\})"/
                .source,
              /\bq"((?!\d)\w+)$[\s\S]*?^\1"/.source,
              /\bq"(.)[\s\S]*?\2"/.source,
              /(["`])(?:\\[\s\S]|(?!\3)[^\\])*\3[cwd]?/.source
            ].join('|'),
            'm'
          ),
          greedy: !0
        },
        {
          pattern: /\bq\{(?:\{[^{}]*\}|[^{}])*\}/,
          greedy: !0,
          alias: 'token-string'
        }
      ],
      keyword:
        /\$|\b(?:__(?:(?:DATE|EOF|FILE|FUNCTION|LINE|MODULE|PRETTY_FUNCTION|TIMESTAMP|TIME|VENDOR|VERSION)__|gshared|parameters|traits|vector)|abstract|alias|align|asm|assert|auto|body|bool|break|byte|case|cast|catch|cdouble|cent|cfloat|char|class|const|continue|creal|dchar|debug|default|delegate|delete|deprecated|do|double|dstring|else|enum|export|extern|false|final|finally|float|for|foreach|foreach_reverse|function|goto|idouble|if|ifloat|immutable|import|inout|int|interface|invariant|ireal|lazy|long|macro|mixin|module|new|nothrow|null|out|override|package|pragma|private|protected|ptrdiff_t|public|pure|real|ref|return|scope|shared|short|size_t|static|string|struct|super|switch|synchronized|template|this|throw|true|try|typedef|typeid|typeof|ubyte|ucent|uint|ulong|union|unittest|ushort|version|void|volatile|wchar|while|with|wstring)\b/,
      number: [
        /\b0x\.?[a-f\d_]+(?:(?!\.\.)\.[a-f\d_]*)?(?:p[+-]?[a-f\d_]+)?[ulfi]{0,4}/i,
        {
          pattern:
            /((?:\.\.)?)(?:\b0b\.?|\b|\.)\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:e[+-]?\d[\d_]*)?[ulfi]{0,4}/i,
          lookbehind: !0
        }
      ],
      operator:
        /\|[|=]?|&[&=]?|\+[+=]?|-[-=]?|\.?\.\.|=[>=]?|!(?:i[ns]\b|<>?=?|>=?|=)?|\bi[ns]\b|(?:<[<>]?|>>?>?|\^\^|[*\/%^~])=?/
    })),
      Prism.languages.insertBefore('d', 'string', {
        char: /'(?:\\(?:\W|\w+)|[^\\])'/
      }),
      Prism.languages.insertBefore('d', 'keyword', { property: /\B@\w*/ }),
      Prism.languages.insertBefore('d', 'function', {
        register: {
          pattern:
            /\b(?:[ABCD][LHX]|E?(?:BP|DI|SI|SP)|[BS]PL|[ECSDGF]S|CR[0234]|[DS]IL|DR[012367]|E[ABCD]X|X?MM[0-7]|R(?:1[0-5]|[89])[BWD]?|R[ABCD]X|R[BS]P|R[DS]I|TR[3-7]|XMM(?:1[0-5]|[89])|YMM(?:1[0-5]|\d))\b|\bST(?:\([0-7]\)|\b)/,
          alias: 'variable'
        }
      }));
  }
};
//# sourceMappingURL=prism-d-js.8dbf1ae06328d9ef.js.map
