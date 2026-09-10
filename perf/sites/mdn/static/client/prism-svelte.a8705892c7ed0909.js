export const __rspack_esm_id = 4531;
export const __rspack_esm_ids = [4531];
export const __webpack_modules__ = {
  22627(a, e, s) {
    s.r(e);
    let t = '(if|else if|await|then|catch|each|html|debug)';
    ((Prism.languages.svelte = Prism.languages.extend('markup', {
      each: {
        pattern: RegExp(
          '{[#/]each(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}'
        ),
        inside: {
          'language-javascript': [
            {
              pattern: /(as[\s\S]*)\([\s\S]*\)(?=\s*\})/,
              lookbehind: !0,
              inside: Prism.languages.javascript
            },
            {
              pattern: /(as[\s]*)[\s\S]*(?=\s*)/,
              lookbehind: !0,
              inside: Prism.languages.javascript
            },
            {
              pattern: /(#each[\s]*)[\s\S]*(?=as)/,
              lookbehind: !0,
              inside: Prism.languages.javascript
            }
          ],
          keyword: /[#/]each|as/,
          punctuation: /{|}/
        }
      },
      block: {
        pattern: RegExp(
          '{[#:/@]/s' +
            t +
            '(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}'
        ),
        inside: {
          punctuation: /^{|}$/,
          keyword: [RegExp('[#:/@]' + t + '( )*'), /as/, /then/],
          'language-javascript': {
            pattern: /[\s\S]*/,
            inside: Prism.languages.javascript
          }
        }
      },
      tag: {
        pattern:
          /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?:"[^"]*"|'[^']*'|{[\s\S]+?}(?=[\s/>])))|(?=[\s/>])))+)?\s*\/?>/i,
        greedy: !0,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/i,
            inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ }
          },
          'language-javascript': {
            pattern:
              /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
            inside: Prism.languages.javascript
          },
          'attr-value': {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
            inside: {
              punctuation: [
                /^=/,
                { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }
              ],
              'language-javascript': {
                pattern: /{[\s\S]+}/,
                inside: Prism.languages.javascript
              }
            }
          },
          punctuation: /\/?>/,
          'attr-name': {
            pattern: /[^\s>\/]+/,
            inside: { namespace: /^[^\s>\/:]+:/ }
          }
        }
      },
      'language-javascript': {
        pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      }
    })),
      (Prism.languages.svelte.tag.inside['attr-value'].inside.entity =
        Prism.languages.svelte.entity),
      Prism.hooks.add('wrap', a => {
        'entity' === a.type &&
          (a.attributes.title = a.content.replace(/&amp;/, '&'));
      }),
      Object.defineProperty(Prism.languages.svelte.tag, 'addInlined', {
        value: function (a, e) {
          let s = {};
          ((s['language-' + e] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Prism.languages[e]
          }),
            (s.cdata = /^<!\[CDATA\[|\]\]>$/i));
          let t = {
            'included-cdata': {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: s
            }
          };
          t['language-' + e] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[e]
          };
          let i = {};
          ((i[a] = {
            pattern: RegExp(
              /(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(
                /__/g,
                a
              ),
              'i'
            ),
            lookbehind: !0,
            greedy: !0,
            inside: t
          }),
            Prism.languages.insertBefore('svelte', 'cdata', i));
        }
      }),
      Prism.languages.svelte.tag.addInlined('style', 'css'),
      Prism.languages.svelte.tag.addInlined('script', 'javascript'));
  }
};
//# sourceMappingURL=prism-svelte.a8705892c7ed0909.js.map
