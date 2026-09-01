export const __rspack_esm_id = 9234;
export const __rspack_esm_ids = [9234];
export const __webpack_modules__ = {
  97228(e, t, i) {
    var s = i(22009),
      r = i(31601),
      o = i.n(r),
      n = i(76314),
      a = i.n(n)()(o());
    a.push([
      e.id,
      ':host{border-right:1px solid var(--color-border-primary);display:block;height:100%}mdn-button{height:100%}',
      ''
    ]);
    let d = (0, s.AH)([a.toString()]);
    i.d(t, {}, { A: d });
  },
  39337(e, t, i) {
    (i.r(t), i.d(t, { MDNToggleSidebar: () => MDNToggleSidebar }));
    var s = i(22009),
      r = i(70693);
    let o = (0,
      s.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18m7-6-3-3 3-3"/></svg>`,
      n = (0,
      s.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>`;
    var a = i(97228);
    i(35268);
    let d = 'main-sidebar';
    let MDNToggleSidebar = class MDNToggleSidebar extends (0, r.J)(s.WF) {
      static styles = a.A;
      static get properties() {
        return { _canClose: { type: Boolean, state: !0 } };
      }
      constructor() {
        (super(), (this._canClose = !1));
      }
      get _sidebar() {
        let e = document.querySelector(`#${d}`);
        return e instanceof HTMLElement ? e : null;
      }
      _click() {
        let e = this._sidebar;
        e &&
          (this._isHidden(e)
            ? ((e.style.display = 'block'), (this._canClose = !0))
            : (e.style.removeProperty('display'), (this._canClose = !1)));
      }
      _isHidden(e) {
        return e && 'none' === getComputedStyle(e).display;
      }
      _mediaChange(e) {
        (this._sidebar?.style.removeProperty('display'), (this._canClose = !1));
      }
      connectedCallback() {
        (super.connectedCallback(),
          (this._matchMedia = matchMedia('(width < 769px)')),
          (this._mediaChange = this._mediaChange.bind(this)),
          this._matchMedia.addEventListener('change', this._mediaChange));
      }
      render() {
        return (0, s.qy)`<mdn-button
      @click=${this._click}
      aria-controls=${d}
      .icon=${this._canClose ? o : n}
      icon-only
      variant="plain"
    >
      ${this.l10n('toggle-sidebar-toggle-sidebar')`Toggle sidebar`}
    </mdn-button>`;
      }
      firstUpdated() {
        this._canClose = !this._isHidden(this._sidebar);
      }
    };
    customElements.define('mdn-toggle-sidebar', MDNToggleSidebar);
  }
};
//# sourceMappingURL=9234.e2ca939eeab03c93.js.map
