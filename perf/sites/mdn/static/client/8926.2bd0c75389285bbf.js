export const __rspack_esm_id = 8926;
export const __rspack_esm_ids = [8926];
export const __webpack_modules__ = {
  39807(t, o, e) {
    var n = e(31601),
      i = e.n(n),
      r = e(76314),
      s = e.n(r)()(i());
    s.push([
      t.id,
      '*,:after,:before{box-sizing:border-box}button,input,select,textarea{font:inherit}button{color:inherit;cursor:pointer}img{height:auto;max-width:100%}a{color:var(--color-link-normal)}[hidden]{display:none!important}#content{scroll-margin-block-start:var(--sticky-header-height)}',
      ''
    ]);
    let a = s.toString();
    e.d(o, {}, { A: a });
  },
  15899(t, o, e) {
    async function n(t) {
      if (t && t.includes('/docs/') && !t.startsWith('/en-US/')) {
        let o =
            '/en-US/' +
            t.split('/').slice(2).join('/') +
            'https://developer.mozilla.org/index.json',
          e = await fetch(o);
        if (e.ok) {
          let { doc: t } = await e.json();
          return t;
        }
      }
    }
    e.d(o, { $: () => n });
  }
};
//# sourceMappingURL=8926.2bd0c75389285bbf.js.map
