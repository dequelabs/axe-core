export const __rspack_esm_id = 6890;
export const __rspack_esm_ids = [6890];
export const __webpack_modules__ = {
  83960() {
    var e = Prism;
    function a(a, s) {
      e.languages[a] &&
        e.languages.insertBefore(a, 'comment', { 'doc-comment': s });
    }
    var s = e.languages.markup.tag,
      t = {
        pattern: /\/\/\/.*/,
        greedy: !0,
        alias: 'comment',
        inside: { tag: s }
      };
    (a('csharp', t),
      a('fsharp', t),
      a('vbnet', {
        pattern: /'''.*/,
        greedy: !0,
        alias: 'comment',
        inside: { tag: s }
      }));
  }
};
//# sourceMappingURL=prism-xml-doc-js.99fb4592c69f373e.js.map
