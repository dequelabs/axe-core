export const __rspack_esm_id = 8615;
export const __rspack_esm_ids = [8615];
export const __webpack_modules__ = {
  14775() {
    ((Prism.languages.processing = Prism.languages.extend('clike', {
      keyword:
        /\b(?:break|case|catch|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/,
      function: /\b\w+(?=\s*\()/,
      operator: /<[<=]?|>[>=]?|&&?|\|\|?|[%?]|[!=+\-*\/]=?/
    })),
      Prism.languages.insertBefore('processing', 'number', {
        constant: /\b(?!XML\b)[A-Z][A-Z\d_]+\b/,
        type: {
          pattern: /\b(?:boolean|byte|char|color|double|float|int|[A-Z]\w*)\b/,
          alias: 'class-name'
        }
      }));
  }
};
//# sourceMappingURL=prism-processing-js.50fb47886b13edbf.js.map
