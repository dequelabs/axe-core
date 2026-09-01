export const __rspack_esm_id = 9939;
export const __rspack_esm_ids = [9939];
export const __webpack_modules__ = {
  50803() {
    Prism.languages.tap = {
      fail: /not ok[^#{\n\r]*/,
      pass: /ok[^#{\n\r]*/,
      pragma: /pragma [+-][a-z]+/,
      bailout: /bail out!.*/i,
      version: /TAP version \d+/i,
      plan: /\b\d+\.\.\d+(?: +#.*)?/,
      subtest: { pattern: /# Subtest(?:: .*)?/, greedy: !0 },
      punctuation: /[{}]/,
      directive: /#.*/,
      yamlish: {
        pattern: /(^[ \t]*)---[\s\S]*?[\r\n][ \t]*\.\.\.$/m,
        lookbehind: !0,
        inside: Prism.languages.yaml,
        alias: 'language-yaml'
      }
    };
  }
};
//# sourceMappingURL=prism-tap-js.d906089dca5f8c77.js.map
