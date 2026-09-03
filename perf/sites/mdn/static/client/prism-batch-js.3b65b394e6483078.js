export const __rspack_esm_id = 2328;
export const __rspack_esm_ids = [2328];
export const __webpack_modules__ = {
  40990() {
    var e, r, t, n;
    ((e = /%%?[~:\w]+%?|!\S+!/),
      (r = {
        pattern: /\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im,
        alias: 'attr-name',
        inside: { punctuation: /:/ }
      }),
      (t = /"(?:[\\"]"|[^"])*"(?!")/),
      (n = /(?:\b|-)\d+\b/),
      (Prism.languages.batch = {
        comment: [
          /^::.*/m,
          {
            pattern:
              /((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
            lookbehind: !0
          }
        ],
        label: { pattern: /^:.*/m, alias: 'property' },
        command: [
          {
            pattern:
              /((?:^|[&(])[ \t]*)for(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* \S+ in \([^)]+\) do/im,
            lookbehind: !0,
            inside: {
              keyword: /\b(?:do|in)\b|^for\b/i,
              string: t,
              parameter: r,
              variable: e,
              number: n,
              punctuation: /[()',]/
            }
          },
          {
            pattern:
              /((?:^|[&(])[ \t]*)if(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|(?!")(?:(?!==)\S)+)?(?:==| (?:equ|geq|gtr|leq|lss|neq) )(?:"[^"]*"|[^\s"]\S*))/im,
            lookbehind: !0,
            inside: {
              keyword:
                /\b(?:cmdextversion|defined|errorlevel|exist|not)\b|^if\b/i,
              string: t,
              parameter: r,
              variable: e,
              number: n,
              operator: /\^|==|\b(?:equ|geq|gtr|leq|lss|neq)\b/i
            }
          },
          {
            pattern: /((?:^|[&()])[ \t]*)else\b/im,
            lookbehind: !0,
            inside: { keyword: /^else\b/i }
          },
          {
            pattern:
              /((?:^|[&(])[ \t]*)set(?: \/[a-z](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
            lookbehind: !0,
            inside: {
              keyword: /^set\b/i,
              string: t,
              parameter: r,
              variable: [e, /\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/],
              number: n,
              operator: /[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/,
              punctuation: /[()',]/
            }
          },
          {
            pattern:
              /((?:^|[&(])[ \t]*@?)\w+\b(?:"(?:[\\"]"|[^"])*"(?!")|[^"^&)\r\n]|\^(?:\r\n|[\s\S]))*/m,
            lookbehind: !0,
            inside: {
              keyword: /^\w+\b/,
              string: t,
              parameter: r,
              label: {
                pattern: /(^\s*):\S+/m,
                lookbehind: !0,
                alias: 'property'
              },
              variable: e,
              number: n,
              operator: /\^/
            }
          }
        ],
        operator: /[&@]/,
        punctuation: /[()']/
      }));
  }
};
//# sourceMappingURL=prism-batch-js.3b65b394e6483078.js.map
