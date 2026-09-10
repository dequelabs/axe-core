export const __rspack_esm_id = 9021;
export const __rspack_esm_ids = [9021];
export const __webpack_modules__ = {
  70537() {
    ((Prism.languages.sparql = Prism.languages.extend('turtle', {
      boolean: /\b(?:false|true)\b/i,
      variable: { pattern: /[?$]\w+/, greedy: !0 }
    })),
      Prism.languages.insertBefore('sparql', 'punctuation', {
        keyword: [
          /\b(?:A|ADD|ALL|AS|ASC|ASK|BNODE|BY|CLEAR|CONSTRUCT|COPY|CREATE|DATA|DEFAULT|DELETE|DESC|DESCRIBE|DISTINCT|DROP|EXISTS|FILTER|FROM|GROUP|HAVING|INSERT|INTO|LIMIT|LOAD|MINUS|MOVE|NAMED|NOT|NOW|OFFSET|OPTIONAL|ORDER|RAND|REDUCED|SELECT|SEPARATOR|SERVICE|SILENT|STRUUID|UNION|USING|UUID|VALUES|WHERE)\b/i,
          /\b(?:ABS|AVG|BIND|BOUND|CEIL|COALESCE|CONCAT|CONTAINS|COUNT|DATATYPE|DAY|ENCODE_FOR_URI|FLOOR|GROUP_CONCAT|HOURS|IF|IRI|isBLANK|isIRI|isLITERAL|isNUMERIC|isURI|LANG|LANGMATCHES|LCASE|MAX|MD5|MIN|MINUTES|MONTH|REGEX|REPLACE|ROUND|sameTerm|SAMPLE|SECONDS|SHA1|SHA256|SHA384|SHA512|STR|STRAFTER|STRBEFORE|STRDT|STRENDS|STRLANG|STRLEN|STRSTARTS|SUBSTR|SUM|TIMEZONE|TZ|UCASE|URI|YEAR)\b(?=\s*\()/i,
          /\b(?:BASE|GRAPH|PREFIX)\b/i
        ]
      }),
      (Prism.languages.rq = Prism.languages.sparql));
  }
};
//# sourceMappingURL=prism-sparql-js.16bd42997561f86d.js.map
