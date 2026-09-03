export const __rspack_esm_id = 638;
export const __rspack_esm_ids = [638];
export const __webpack_modules__ = {
  55248() {
    Prism.languages.insertBefore('php', 'variable', {
      this: { pattern: /\$this\b/, alias: 'keyword' },
      global:
        /\$(?:GLOBALS|HTTP_RAW_POST_DATA|_(?:COOKIE|ENV|FILES|GET|POST|REQUEST|SERVER|SESSION)|argc|argv|http_response_header|php_errormsg)\b/,
      scope: {
        pattern: /\b[\w\\]+::/,
        inside: { keyword: /\b(?:parent|self|static)\b/, punctuation: /::|\\/ }
      }
    });
  }
};
//# sourceMappingURL=prism-php-extras-js.ed0f05ae15f79746.js.map
