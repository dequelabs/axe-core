export const __rspack_esm_id = 3503;
export const __rspack_esm_ids = [3503];
export const __webpack_modules__ = {
  50151() {
    Prism.languages.abnf = {
      comment: /;.*/,
      string: {
        pattern: /(?:%[is])?"[^"\n\r]*"/,
        greedy: !0,
        inside: { punctuation: /^%[is]/ }
      },
      range: {
        pattern: /%(?:b[01]+-[01]+|d\d+-\d+|x[A-F\d]+-[A-F\d]+)/i,
        alias: 'number'
      },
      terminal: {
        pattern:
          /%(?:b[01]+(?:\.[01]+)*|d\d+(?:\.\d+)*|x[A-F\d]+(?:\.[A-F\d]+)*)/i,
        alias: 'number'
      },
      repetition: {
        pattern: /(^|[^\w-])(?:\d*\*\d*|\d+)/,
        lookbehind: !0,
        alias: 'operator'
      },
      definition: {
        pattern: /(^[ \t]*)(?:[a-z][\w-]*|<[^<>\r\n]*>)(?=\s*=)/m,
        lookbehind: !0,
        alias: 'keyword',
        inside: { punctuation: /<|>/ }
      },
      'core-rule': {
        pattern: RegExp(
          '(?:(^|[^<\\w-])(?:ALPHA|BIT|CHAR|CR|CRLF|CTL|DIGIT|DQUOTE|HEXDIG|HTAB|LF|LWSP|OCTET|SP|VCHAR|WSP)|<(?:ALPHA|BIT|CHAR|CR|CRLF|CTL|DIGIT|DQUOTE|HEXDIG|HTAB|LF|LWSP|OCTET|SP|VCHAR|WSP)>)(?![\\w-])',
          'i'
        ),
        lookbehind: !0,
        alias: ['rule', 'constant'],
        inside: { punctuation: /<|>/ }
      },
      rule: {
        pattern: /(^|[^<\w-])[a-z][\w-]*|<[^<>\r\n]*>/i,
        lookbehind: !0,
        inside: { punctuation: /<|>/ }
      },
      operator: /=\/?|\//,
      punctuation: /[()\[\]]/
    };
  }
};
//# sourceMappingURL=prism-abnf-js.ba826ac221c60da9.js.map
