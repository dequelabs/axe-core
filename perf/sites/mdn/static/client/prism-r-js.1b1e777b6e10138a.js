export const __rspack_esm_id = 2966;
export const __rspack_esm_ids = [2966];
export const __webpack_modules__ = {
  27768() {
    Prism.languages.r = {
      comment: /#.*/,
      string: { pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
      'percent-operator': { pattern: /%[^%\s]*%/, alias: 'operator' },
      boolean: /\b(?:FALSE|TRUE)\b/,
      ellipsis: /\.\.(?:\.|\d+)/,
      number: [
        /\b(?:Inf|NaN)\b/,
        /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/
      ],
      keyword:
        /\b(?:NA|NA_character_|NA_complex_|NA_integer_|NA_real_|NULL|break|else|for|function|if|in|next|repeat|while)\b/,
      operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
      punctuation: /[(){}\[\],;]/
    };
  }
};
//# sourceMappingURL=prism-r-js.1b1e777b6e10138a.js.map
