export const __rspack_esm_id = 7190;
export const __rspack_esm_ids = [7190];
export const __webpack_modules__ = {
  28904() {
    Prism.languages.nevod = {
      comment: /\/\/.*|(?:\/\*[\s\S]*?(?:\*\/|$))/,
      string: {
        pattern: /(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))!?\*?/,
        greedy: !0,
        inside: { 'string-attrs': /!$|!\*$|\*$/ }
      },
      namespace: {
        pattern: /(@namespace\s+)[a-zA-Z0-9\-.]+(?=\s*\{)/,
        lookbehind: !0
      },
      pattern: {
        pattern:
          /(@pattern\s+)?#?[a-zA-Z0-9\-.]+(?:\s*\(\s*(?:~\s*)?[a-zA-Z0-9\-.]+\s*(?:,\s*(?:~\s*)?[a-zA-Z0-9\-.]*)*\))?(?=\s*=)/,
        lookbehind: !0,
        inside: {
          'pattern-name': {
            pattern: /^#?[a-zA-Z0-9\-.]+/,
            alias: 'class-name'
          },
          fields: {
            pattern: /\(.*\)/,
            inside: {
              'field-name': { pattern: /[a-zA-Z0-9\-.]+/, alias: 'variable' },
              punctuation: /[,()]/,
              operator: { pattern: /~/, alias: 'field-hidden-mark' }
            }
          }
        }
      },
      search: {
        pattern: /(@search\s+|#)[a-zA-Z0-9\-.]+(?:\.\*)?(?=\s*;)/,
        alias: 'function',
        lookbehind: !0
      },
      keyword:
        /@(?:having|inside|namespace|outside|pattern|require|search|where)\b/,
      'standard-pattern': {
        pattern:
          /\b(?:Alpha|AlphaNum|Any|Blank|End|LineBreak|Num|NumAlpha|Punct|Space|Start|Symbol|Word|WordBreak)\b(?:\([a-zA-Z0-9\-.,\s+]*\))?/,
        inside: {
          'standard-pattern-name': {
            pattern: /^[a-zA-Z0-9\-.]+/,
            alias: 'builtin'
          },
          quantifier: {
            pattern: /\b\d+(?:\s*\+|\s*-\s*\d+)?(?!\w)/,
            alias: 'number'
          },
          'standard-pattern-attr': {
            pattern: /[a-zA-Z0-9\-.]+/,
            alias: 'builtin'
          },
          punctuation: /[,()]/
        }
      },
      quantifier: {
        pattern: /\b\d+(?:\s*\+|\s*-\s*\d+)?(?!\w)/,
        alias: 'number'
      },
      operator: [
        { pattern: /=/, alias: 'pattern-def' },
        { pattern: /&/, alias: 'conjunction' },
        { pattern: /~/, alias: 'exception' },
        { pattern: /\?/, alias: 'optionality' },
        { pattern: /[[\]]/, alias: 'repetition' },
        { pattern: /[{}]/, alias: 'variation' },
        { pattern: /[+_]/, alias: 'sequence' },
        { pattern: /\.{2,3}/, alias: 'span' }
      ],
      'field-capture': [
        {
          pattern:
            /([a-zA-Z0-9\-.]+\s*\()\s*[a-zA-Z0-9\-.]+\s*:\s*[a-zA-Z0-9\-.]+(?:\s*,\s*[a-zA-Z0-9\-.]+\s*:\s*[a-zA-Z0-9\-.]+)*(?=\s*\))/,
          lookbehind: !0,
          inside: {
            'field-name': { pattern: /[a-zA-Z0-9\-.]+/, alias: 'variable' },
            colon: /:/
          }
        },
        {
          pattern: /[a-zA-Z0-9\-.]+\s*:/,
          inside: {
            'field-name': { pattern: /[a-zA-Z0-9\-.]+/, alias: 'variable' },
            colon: /:/
          }
        }
      ],
      punctuation: /[:;,()]/,
      name: /[a-zA-Z0-9\-.]+/
    };
  }
};
//# sourceMappingURL=prism-nevod-js.aef2f8efd884bad6.js.map
