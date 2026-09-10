export const __rspack_esm_id = 4637;
export const __rspack_esm_ids = [4637];
export const __webpack_modules__ = {
  90237() {
    Prism.languages.icon = {
      comment: /#.*/,
      string: {
        pattern: /(["'])(?:(?!\1)[^\\\r\n_]|\\.|_(?!\1)(?:\r\n|[\s\S]))*\1/,
        greedy: !0
      },
      number: /\b(?:\d+r[a-z\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\.\d+\b/i,
      'builtin-keyword': {
        pattern:
          /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|lcase|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|ucase|version)\b/,
        alias: 'variable'
      },
      directive: { pattern: /\$\w+/, alias: 'builtin' },
      keyword:
        /\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\b/,
      function: /\b(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/,
      operator:
        /[+-]:(?!=)|(?:[\/?@^%&]|\+\+?|--?|==?=?|~==?=?|\*\*?|\|\|\|?|<(?:->?|<?=?)|>>?=?)(?::=)?|:(?:=:?)?|[!.\\|~]/,
      punctuation: /[\[\](){},;]/
    };
  }
};
//# sourceMappingURL=prism-icon-js.b76bbf47a053e243.js.map
