export const __rspack_esm_id = 7059;
export const __rspack_esm_ids = [7059];
export const __webpack_modules__ = {
  5651() {
    !(function (e) {
      function s(e, s) {
        return e.replace(/<<(\d+)>>/g, function (e, n) {
          return '(?:' + s[+n] + ')';
        });
      }
      function n(e, n, r) {
        return RegExp(s(e, n), r || '');
      }
      function r(e, s) {
        for (var n = 0; n < s; n++)
          e = e.replace(/<<self>>/g, function () {
            return '(?:' + e + ')';
          });
        return e.replace(/<<self>>/g, '[^\\s\\S]');
      }
      var t =
          'bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void',
        a = 'class enum interface record struct',
        o =
          'add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)',
        i =
          'abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield';
      function c(e) {
        return '\\b(?:' + e.trim().replace(/ /g, '|') + ')\\b';
      }
      var u = c(a),
        l = RegExp(c(t + ' ' + a + ' ' + o + ' ' + i)),
        d = c(a + ' ' + o + ' ' + i),
        p = c(t + ' ' + a + ' ' + i),
        g = r(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source, 2),
        b = r(/\((?:[^()]|<<self>>)*\)/.source, 2),
        h = /@?\b[A-Za-z_]\w*\b/.source,
        f = s(/<<0>>(?:\s*<<1>>)?/.source, [h, g]),
        m = s(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source, [d, f]),
        k = /\[\s*(?:,\s*)*\]/.source,
        y = s(/<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source, [m, k]),
        w = s(/[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source, [g, b, k]),
        _ = s(/\(<<0>>+(?:,<<0>>+)+\)/.source, [w]),
        v = s(/(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source, [
          _,
          m,
          k
        ]),
        x = { keyword: l, punctuation: /[<>()?,.:[\]]/ },
        $ = /'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source,
        B = /"(?:\\.|[^\\"\r\n])*"/.source,
        E = /@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;
      ((e.languages.csharp = e.languages.extend('clike', {
        string: [
          {
            pattern: n(/(^|[^$\\])<<0>>/.source, [E]),
            lookbehind: !0,
            greedy: !0
          },
          {
            pattern: n(/(^|[^@$\\])<<0>>/.source, [B]),
            lookbehind: !0,
            greedy: !0
          }
        ],
        'class-name': [
          {
            pattern: n(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source, [m]),
            lookbehind: !0,
            inside: x
          },
          {
            pattern: n(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source, [h, v]),
            lookbehind: !0,
            inside: x
          },
          {
            pattern: n(/(\busing\s+)<<0>>(?=\s*=)/.source, [h]),
            lookbehind: !0
          },
          {
            pattern: n(/(\b<<0>>\s+)<<1>>/.source, [u, f]),
            lookbehind: !0,
            inside: x
          },
          {
            pattern: n(/(\bcatch\s*\(\s*)<<0>>/.source, [m]),
            lookbehind: !0,
            inside: x
          },
          { pattern: n(/(\bwhere\s+)<<0>>/.source, [h]), lookbehind: !0 },
          {
            pattern: n(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source, [y]),
            lookbehind: !0,
            inside: x
          },
          {
            pattern: n(
              /\b<<0>>(?=\s+(?!<<1>>|with\s*\{)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/
                .source,
              [v, p, h]
            ),
            inside: x
          }
        ],
        keyword: l,
        number:
          /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
        operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
        punctuation: /\?\.?|::|[{}[\];(),.:]/
      })),
        e.languages.insertBefore('csharp', 'number', {
          range: { pattern: /\.\./, alias: 'operator' }
        }),
        e.languages.insertBefore('csharp', 'punctuation', {
          'named-parameter': {
            pattern: n(/([(,]\s*)<<0>>(?=\s*:)/.source, [h]),
            lookbehind: !0,
            alias: 'punctuation'
          }
        }),
        e.languages.insertBefore('csharp', 'class-name', {
          namespace: {
            pattern: n(
              /(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/
                .source,
              [h]
            ),
            lookbehind: !0,
            inside: { punctuation: /\./ }
          },
          'type-expression': {
            pattern: n(
              /(\b(?:default|sizeof|typeof)\s*\(\s*(?!\s))(?:[^()\s]|\s(?!\s)|<<0>>)*(?=\s*\))/
                .source,
              [b]
            ),
            lookbehind: !0,
            alias: 'class-name',
            inside: x
          },
          'return-type': {
            pattern: n(
              /<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/
                .source,
              [v, m]
            ),
            inside: x,
            alias: 'class-name'
          },
          'constructor-invocation': {
            pattern: n(/(\bnew\s+)<<0>>(?=\s*[[({])/.source, [v]),
            lookbehind: !0,
            inside: x,
            alias: 'class-name'
          },
          'generic-method': {
            pattern: n(/<<0>>\s*<<1>>(?=\s*\()/.source, [h, g]),
            inside: {
              function: n(/^<<0>>/.source, [h]),
              generic: { pattern: RegExp(g), alias: 'class-name', inside: x }
            }
          },
          'type-list': {
            pattern: n(
              /\b((?:<<0>>\s+<<1>>|record\s+<<1>>\s*<<5>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>|<<1>>\s*<<5>>|<<6>>)(?:\s*,\s*(?:<<3>>|<<4>>|<<6>>))*(?=\s*(?:where|[{;]|=>|$))/
                .source,
              [u, f, h, v, l.source, b, /\bnew\s*\(\s*\)/.source]
            ),
            lookbehind: !0,
            inside: {
              'record-arguments': {
                pattern: n(/(^(?!new\s*\()<<0>>\s*)<<1>>/.source, [f, b]),
                lookbehind: !0,
                greedy: !0,
                inside: e.languages.csharp
              },
              keyword: l,
              'class-name': { pattern: RegExp(v), greedy: !0, inside: x },
              punctuation: /[,()]/
            }
          },
          preprocessor: {
            pattern: /(^[\t ]*)#.*/m,
            lookbehind: !0,
            alias: 'property',
            inside: {
              directive: {
                pattern:
                  /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
                lookbehind: !0,
                alias: 'keyword'
              }
            }
          }
        }));
      var R = B + '|' + $,
        S = s(
          /\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/
            .source,
          [R]
        ),
        z = r(s(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [S]), 2),
        j =
          /\b(?:assembly|event|field|method|module|param|property|return|type)\b/
            .source,
        A = s(/<<0>>(?:\s*\(<<1>>*\))?/.source, [m, z]);
      e.languages.insertBefore('csharp', 'class-name', {
        attribute: {
          pattern: n(
            /((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/
              .source,
            [j, A]
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            target: {
              pattern: n(/^<<0>>(?=\s*:)/.source, [j]),
              alias: 'keyword'
            },
            'attribute-arguments': {
              pattern: n(/\(<<0>>*\)/.source, [z]),
              inside: e.languages.csharp
            },
            'class-name': { pattern: RegExp(m), inside: { punctuation: /\./ } },
            punctuation: /[:,]/
          }
        }
      });
      var F = /:[^}\r\n]+/.source,
        P = r(s(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [S]), 2),
        U = s(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [P, F]),
        Z = r(
          s(
            /[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/
              .source,
            [R]
          ),
          2
        ),
        q = s(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [Z, F]);
      function C(s, r) {
        return {
          interpolation: {
            pattern: n(/((?:^|[^{])(?:\{\{)*)<<0>>/.source, [s]),
            lookbehind: !0,
            inside: {
              'format-string': {
                pattern: n(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source, [
                  r,
                  F
                ]),
                lookbehind: !0,
                inside: { punctuation: /^:/ }
              },
              punctuation: /^\{|\}$/,
              expression: {
                pattern: /[\s\S]+/,
                alias: 'language-csharp',
                inside: e.languages.csharp
              }
            }
          },
          string: /[\s\S]+/
        };
      }
      (e.languages.insertBefore('csharp', 'string', {
        'interpolation-string': [
          {
            pattern: n(
              /(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/
                .source,
              [U]
            ),
            lookbehind: !0,
            greedy: !0,
            inside: C(U, P)
          },
          {
            pattern: n(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source, [q]),
            lookbehind: !0,
            greedy: !0,
            inside: C(q, Z)
          }
        ],
        char: { pattern: RegExp($), greedy: !0 }
      }),
        (e.languages.dotnet = e.languages.cs = e.languages.csharp));
    })(Prism);
  }
};
//# sourceMappingURL=prism-csharp-js.a437436cbf746fb2.js.map
