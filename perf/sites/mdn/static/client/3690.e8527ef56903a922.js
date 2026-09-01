export const __rspack_esm_id = 3690;
export const __rspack_esm_ids = [3690];
export const __webpack_modules__ = {
  58592(r, o, e) {
    var t = e(22009),
      s = e(31601),
      a = e.n(s),
      c = e(76314),
      n = e.n(c)()(a());
    n.push([
      r.id,
      '.mdn-search-button{align-items:center;background-color:var(--color-background-page);border:1px solid var(--color-border-primary);border-radius:var(--radius-full);color:var(--color-text-primary);cursor:pointer;display:flex;justify-content:space-between;margin:0;padding:.25rem .25rem .25rem .75rem;width:5rem}.mdn-search-button:hover{background-color:var(--color-background-secondary)}.mdn-search-button:before{content:"";height:18px;width:15px;--csstools-light-dark-toggle-bfa2e85e-0:var(--csstools-color-scheme--light) var(--color-blue-80);border-bottom:2px solid var(--csstools-light-dark-toggle-bfa2e85e-0,var(--color-blue-50))}@supports (color:light-dark(red,red)){.mdn-search-button:before{border-bottom:2px solid light-dark(var(--color-blue-50),var(--color-blue-80))}}',
      ''
    ]);
    let l = (0, t.AH)([n.toString()]);
    e.d(o, {}, { A: l });
  },
  68770(r, o, e) {
    var t = e(22009);
    let s = (0,
    t.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>`;
    e.d(o, {}, { A: s });
  },
  23745(r, o, e) {
    e.r(o);
    var t = e(22009),
      s = e(70693),
      a = e(68770),
      c = e(97154),
      n = e(58592);
    let MDNSearchButton = class MDNSearchButton extends (0, s.J)(t.WF) {
      static styles = n.A;
      _showModal() {
        let r = document.querySelector('#search');
        r instanceof c.MDNSearchModal
          ? r.showModal()
          : console.error('MDNSearchModal not found!');
      }
      render() {
        return (0, t.qy)`<button
      class="mdn-search-button"
      title=${this.l10n('search-button-search-the-site')`Search the site`}
      @click=${this._showModal}
      data-glean-id="quick-search-open: menu"
    >
      ${a.A}
    </button>`;
      }
    };
    (customElements.define('mdn-search-button', MDNSearchButton),
      e.d(o, { MDNSearchButton: () => MDNSearchButton }));
  }
};
//# sourceMappingURL=3690.e8527ef56903a922.js.map
