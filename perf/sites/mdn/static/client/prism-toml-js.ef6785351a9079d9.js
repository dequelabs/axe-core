export const __rspack_esm_id = 9686;
export const __rspack_esm_ids = [9686];
export const __webpack_modules__ = {
  70132() {
    var e = Prism,
      r = /(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")/.source;
    function n(e) {
      return e.replace(/__/g, function () {
        return r;
      });
    }
    e.languages.toml = {
      comment: { pattern: /#.*/, greedy: !0 },
      table: {
        pattern: RegExp(
          n(/(^[\t ]*\[\s*(?:\[\s*)?)__(?:\s*\.\s*__)*(?=\s*\])/.source),
          'm'
        ),
        lookbehind: !0,
        greedy: !0,
        alias: 'class-name'
      },
      key: {
        pattern: RegExp(
          n(/(^[\t ]*|[{,]\s*)__(?:\s*\.\s*__)*(?=\s*=)/.source),
          'm'
        ),
        lookbehind: !0,
        greedy: !0,
        alias: 'property'
      },
      string: {
        pattern:
          /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,
        greedy: !0
      },
      date: [
        {
          pattern:
            /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,
          alias: 'number'
        },
        { pattern: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/, alias: 'number' }
      ],
      number:
        /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,
      boolean: /\b(?:false|true)\b/,
      punctuation: /[.,=[\]{}]/
    };
  }
};
//# sourceMappingURL=prism-toml-js.ef6785351a9079d9.js.map
