export const __rspack_esm_id = 7645;
export const __rspack_esm_ids = [7645];
export const __webpack_modules__ = {
  86061() {
    ((Prism.languages.birb = Prism.languages.extend('clike', {
      string: { pattern: /r?("|')(?:\\.|(?!\1)[^\\])*\1/, greedy: !0 },
      'class-name': [
        /\b[A-Z](?:[\d_]*[a-zA-Z]\w*)?\b/,
        /\b(?:[A-Z]\w*|(?!(?:var|void)\b)[a-z]\w*)(?=\s+\w+\s*[;,=()])/
      ],
      keyword:
        /\b(?:assert|break|case|class|const|default|else|enum|final|follows|for|grab|if|nest|new|next|noSeeb|return|static|switch|throw|var|void|while)\b/,
      operator: /\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?|:/,
      variable: /\b[a-z_]\w*\b/
    })),
      Prism.languages.insertBefore('birb', 'function', {
        metadata: { pattern: /<\w+>/, greedy: !0, alias: 'symbol' }
      }));
  }
};
//# sourceMappingURL=prism-birb-js.2c992d2234eddf19.js.map
