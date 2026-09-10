export const __rspack_esm_id = 6880;
export const __rspack_esm_ids = [6880];
export const __webpack_modules__ = {
  91166() {
    ((Prism.languages.peoplecode = {
      comment: RegExp(
        [
          /\/\*[\s\S]*?\*\//.source,
          /\bREM[^;]*;/.source,
          /<\*(?:[^<*]|\*(?!>)|<(?!\*)|<\*(?:(?!\*>)[\s\S])*\*>)*\*>/.source,
          /\/\+[\s\S]*?\+\//.source
        ].join('|')
      ),
      string: {
        pattern: /'(?:''|[^'\r\n])*'(?!')|"(?:""|[^"\r\n])*"(?!")/,
        greedy: !0
      },
      variable: /%\w+/,
      'function-definition': {
        pattern: /((?:^|[^\w-])(?:function|method)\s+)\w+/i,
        lookbehind: !0,
        alias: 'function'
      },
      'class-name': {
        pattern:
          /((?:^|[^-\w])(?:as|catch|class|component|create|extends|global|implements|instance|local|of|property|returns)\s+)\w+(?::\w+)*/i,
        lookbehind: !0,
        inside: { punctuation: /:/ }
      },
      keyword:
        /\b(?:abstract|alias|as|catch|class|component|constant|create|declare|else|end-(?:class|evaluate|for|function|get|if|method|set|try|while)|evaluate|extends|for|function|get|global|if|implements|import|instance|library|local|method|null|of|out|peopleCode|private|program|property|protected|readonly|ref|repeat|returns?|set|step|then|throw|to|try|until|value|when(?:-other)?|while)\b/i,
      'operator-keyword': { pattern: /\b(?:and|not|or)\b/i, alias: 'operator' },
      function: /[_a-z]\w*(?=\s*\()/i,
      boolean: /\b(?:false|true)\b/i,
      number: /\b\d+(?:\.\d+)?\b/,
      operator: /<>|[<>]=?|!=|\*\*|[-+*/|=@]/,
      punctuation: /[:.;,()[\]]/
    }),
      (Prism.languages.pcode = Prism.languages.peoplecode));
  }
};
//# sourceMappingURL=prism-peoplecode-js.654b2814306935ed.js.map
