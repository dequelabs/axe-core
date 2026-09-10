export const __rspack_esm_id = 6936;
export const __rspack_esm_ids = [6936];
export const __webpack_modules__ = {
  39319() {
    Prism.languages.eiffel = {
      comment: /--.*/,
      string: [
        { pattern: /"([^[]*)\[[\s\S]*?\]\1"/, greedy: !0 },
        { pattern: /"([^{]*)\{[\s\S]*?\}\1"/, greedy: !0 },
        { pattern: /"(?:%(?:(?!\n)\s)*\n\s*%|%\S|[^%"\r\n])*"/, greedy: !0 }
      ],
      char: /'(?:%.|[^%'\r\n])+'/,
      keyword:
        /\b(?:across|agent|alias|all|and|as|assign|attached|attribute|check|class|convert|create|Current|debug|deferred|detachable|do|else|elseif|end|ensure|expanded|export|external|feature|from|frozen|if|implies|inherit|inspect|invariant|like|local|loop|not|note|obsolete|old|once|or|Precursor|redefine|rename|require|rescue|Result|retry|select|separate|some|then|undefine|until|variant|Void|when|xor)\b/i,
      boolean: /\b(?:False|True)\b/i,
      'class-name': /\b[A-Z][\dA-Z_]*\b/,
      number: [
        /\b0[xcb][\da-f](?:_*[\da-f])*\b/i,
        /(?:\b\d(?:_*\d)*)?\.(?:(?:\d(?:_*\d)*)?e[+-]?)?\d(?:_*\d)*\b|\b\d(?:_*\d)*\b\.?/i
      ],
      punctuation: /:=|<<|>>|\(\||\|\)|->|\.(?=\w)|[{}[\];(),:?]/,
      operator: /\\\\|\|\.\.\||\.\.|\/[~\/=]?|[><]=?|[-+*^=~]/
    };
  }
};
//# sourceMappingURL=prism-eiffel-js.b0b2446dbeae6b20.js.map
