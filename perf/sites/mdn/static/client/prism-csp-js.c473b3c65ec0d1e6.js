export const __rspack_esm_id = 2890;
export const __rspack_esm_ids = [2890];
export const __webpack_modules__ = {
  58160() {
    function e(e) {
      return RegExp(
        /([ \t])/.source + '(?:' + e + ')' + /(?=[\s;]|$)/.source,
        'i'
      );
    }
    Prism.languages.csp = {
      directive: {
        pattern:
          /(^|[\s;])(?:base-uri|block-all-mixed-content|(?:child|connect|default|font|frame|img|manifest|media|object|prefetch|script|style|worker)-src|disown-opener|form-action|frame-(?:ancestors|options)|input-protection(?:-(?:clip|selectors))?|navigate-to|plugin-types|policy-uri|referrer|reflected-xss|report-(?:to|uri)|require-sri-for|sandbox|(?:script|style)-src-(?:attr|elem)|upgrade-insecure-requests)(?=[\s;]|$)/i,
        lookbehind: !0,
        alias: 'property'
      },
      scheme: { pattern: e(/[a-z][a-z0-9.+-]*:/.source), lookbehind: !0 },
      none: { pattern: e(/'none'/.source), lookbehind: !0, alias: 'keyword' },
      nonce: {
        pattern: e(/'nonce-[-+/\w=]+'/.source),
        lookbehind: !0,
        alias: 'number'
      },
      hash: {
        pattern: e(/'sha(?:256|384|512)-[-+/\w=]+'/.source),
        lookbehind: !0,
        alias: 'number'
      },
      host: {
        pattern: e(
          /[a-z][a-z0-9.+-]*:\/\/[^\s;,']*/.source +
            '|' +
            /\*[^\s;,']*/.source +
            '|' +
            /[a-z0-9-]+(?:\.[a-z0-9-]+)+(?::[\d*]+)?(?:\/[^\s;,']*)?/.source
        ),
        lookbehind: !0,
        alias: 'url',
        inside: { important: /\*/ }
      },
      keyword: [
        {
          pattern: e(/'unsafe-[a-z-]+'/.source),
          lookbehind: !0,
          alias: 'unsafe'
        },
        { pattern: e(/'[a-z-]+'/.source), lookbehind: !0, alias: 'safe' }
      ],
      punctuation: /;/
    };
  }
};
//# sourceMappingURL=prism-csp-js.c473b3c65ec0d1e6.js.map
