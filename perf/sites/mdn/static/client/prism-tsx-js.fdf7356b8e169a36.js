export const __rspack_esm_id = 8677;
export const __rspack_esm_ids = [8677];
export const __webpack_modules__ = {
  82769() {
    var e, t, s;
    ((t = (e = Prism).util.clone(e.languages.typescript)),
      (e.languages.tsx = e.languages.extend('jsx', t)),
      delete e.languages.tsx.parameter,
      delete e.languages.tsx['literal-property'],
      ((s = e.languages.tsx.tag).pattern = RegExp(
        /(^|[^\w$]|(?=<\/))/.source + '(?:' + s.pattern.source + ')',
        s.pattern.flags
      )),
      (s.lookbehind = !0));
  }
};
//# sourceMappingURL=prism-tsx-js.fdf7356b8e169a36.js.map
