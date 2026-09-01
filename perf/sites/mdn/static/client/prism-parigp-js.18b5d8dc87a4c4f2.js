export const __rspack_esm_id = 5249;
export const __rspack_esm_ids = [5249];
export const __webpack_modules__ = {
  94741() {
    Prism.languages.parigp = {
      comment: /\/\*[\s\S]*?\*\/|\\\\.*/,
      string: { pattern: /"(?:[^"\\\r\n]|\\.)*"/, greedy: !0 },
      keyword: RegExp(
        '\\b(?:' +
          [
            'breakpoint',
            'break',
            'dbg_down',
            'dbg_err',
            'dbg_up',
            'dbg_x',
            'forcomposite',
            'fordiv',
            'forell',
            'forpart',
            'forprime',
            'forstep',
            'forsubgroup',
            'forvec',
            'for',
            'iferr',
            'if',
            'local',
            'my',
            'next',
            'return',
            'until',
            'while'
          ]
            .map(function (r) {
              return r.split('').join(' *');
            })
            .join('|') +
          ')\\b'
      ),
      function: /\b\w(?:[\w ]*\w)?(?= *\()/,
      number: {
        pattern:
          /((?:\. *\. *)?)(?:\b\d(?: *\d)*(?: *(?!\. *\.)\.(?: *\d)*)?|\. *\d(?: *\d)*)(?: *e *(?:[+-] *)?\d(?: *\d)*)?/i,
        lookbehind: !0
      },
      operator:
        /\. *\.|[*\/!](?: *=)?|%(?: *=|(?: *#)?(?: *')*)?|\+(?: *[+=])?|-(?: *[-=>])?|<(?: *>|(?: *<)?(?: *=)?)?|>(?: *>)?(?: *=)?|=(?: *=){0,2}|\\(?: *\/)?(?: *=)?|&(?: *&)?|\| *\||['#~^]/,
      punctuation: /[\[\]{}().,:;|]/
    };
  }
};
//# sourceMappingURL=prism-parigp-js.18b5d8dc87a4c4f2.js.map
