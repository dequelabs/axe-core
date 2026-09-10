export const __rspack_esm_id = 7678;
export const __rspack_esm_ids = [7678];
export const __webpack_modules__ = {
  91700(e, r, o) {
    var a = o(22009),
      t = o(31601),
      n = o.n(t),
      c = o(76314),
      s = o.n(c),
      i = o(39807),
      h = o(4417),
      d = o.n(h),
      l = new o.U(o(70054)),
      m = s()(n());
    m.i(i.A);
    var g = d()(l);
    m.push([
      e.id,
      `.mdn-homepage-search{align-items:center;background-color:initial;border:2px solid var(--color-border-primary);border-radius:var(--radius-full);display:flex;font-size:var(--font-size-large);gap:.25em;margin:0 auto;padding:.8em 1em}.mdn-homepage-search:hover{background-color:var(--color-background-secondary)}.mdn-homepage-search:before{background-color:currentcolor;content:"";height:1em;mask-image:url(${g});mask-size:contain;width:1em}`,
      ''
    ]);
    let p = (0, a.AH)([m.toString()]);
    o.d(r, {}, { A: p });
  },
  39807(e, r, o) {
    var a = o(31601),
      t = o.n(a),
      n = o(76314),
      c = o.n(n)()(t());
    c.push([
      e.id,
      '*,:after,:before{box-sizing:border-box}button,input,select,textarea{font:inherit}button{color:inherit;cursor:pointer}img{height:auto;max-width:100%}a{color:var(--color-link-normal)}[hidden]{display:none!important}#content{scroll-margin-block-start:var(--sticky-header-height)}',
      ''
    ]);
    let s = c.toString();
    o.d(r, {}, { A: s });
  },
  27373(e, r, o) {
    o.r(r);
    var a = o(22009),
      t = o(70693),
      n = o(97154),
      c = o(91700);
    let MDNHomepageSearch = class MDNHomepageSearch extends (0, t.J)(a.WF) {
      static styles = c.A;
      _showModal() {
        let e = document.querySelector('#search');
        e instanceof n.MDNSearchModal
          ? e.showModal()
          : console.error('MDNSearchModal not found!');
      }
      render() {
        return (0, a.qy)`<button
      class="mdn-homepage-search"
      title=${this.l10n('homepage-search-search-the-site')`Search the site`}
      @click=${this._showModal}
      data-glean-id="quick-search-open: homepage"
    >
      ${this.l10n('homepage-search-search')`Search`}
    </button>`;
      }
    };
    (customElements.define('mdn-homepage-search', MDNHomepageSearch),
      o.d(r, { MDNHomepageSearch: () => MDNHomepageSearch }));
  }
};
//# sourceMappingURL=7678.af45e3f1f24b7058.js.map
