export const __rspack_esm_id = 8981;
export const __rspack_esm_ids = [8981];
export const __webpack_modules__ = {
  612(e, t, s) {
    s.r(t);
    var o = s(22009);
    let MDNAboutTeamMember = class MDNAboutTeamMember extends o.WF {
      static ssr = !1;
      createRenderRoot() {
        return this;
      }
      _setID() {
        let e = this.querySelector('h4, h5'),
          t = e?.closest('.tabpanel');
        if (e && t) {
          let s = `${t.id}_${e.id}`;
          this.id !== s && (this.id = s);
        }
      }
      _focus({ currentTarget: e }) {
        e instanceof HTMLElement &&
          (globalThis.history.pushState({}, '', `#${e.id}`),
          this.scrollIntoView({ block: 'nearest', inline: 'nearest' }));
      }
      _mousedown(e) {
        e.target instanceof HTMLAnchorElement && e.preventDefault();
      }
      connectedCallback() {
        (super.connectedCallback(),
          (this.tabIndex = 0),
          setTimeout(() => {
            (this._setID(),
              globalThis.location.hash.slice(1) === this.id &&
                this.focus({ preventScroll: !0 }));
          }, 0),
          this.addEventListener('mousedown', this._mousedown),
          this.addEventListener('focus', this._focus));
      }
      disconnectedCallback() {
        (super.disconnectedCallback(),
          this.removeEventListener('mousedown', this._mousedown),
          this.removeEventListener('focus', this._focus));
      }
    };
    (customElements.define('mdn-about-team-member', MDNAboutTeamMember),
      s.d(t, { MDNAboutTeamMember: () => MDNAboutTeamMember }));
  }
};
//# sourceMappingURL=8981.7ea9417c84707f23.js.map
