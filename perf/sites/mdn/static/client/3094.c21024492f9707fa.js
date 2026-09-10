export const __rspack_esm_id = 3094;
export const __rspack_esm_ids = [3094];
export const __webpack_modules__ = {
  55237(e, t, s) {
    s.r(t);
    var i = s(22009),
      c = s(93649);
    let MDNRecordVisit = class MDNRecordVisit extends i.WF {
      static ssr = !1;
      static get properties() {
        return { pageTitle: { type: String, attribute: 'page-title' } };
      }
      constructor() {
        (super(), (this.pageTitle = void 0));
      }
      connectedCallback() {
        (super.connectedCallback(),
          this.pageTitle &&
            new c.B().add(
              new c.E({ title: this.pageTitle, path: location.pathname })
            ));
      }
    };
    (customElements.define('mdn-record-visit', MDNRecordVisit),
      s.d(t, { MDNRecordVisit: () => MDNRecordVisit }));
  }
};
//# sourceMappingURL=3094.c21024492f9707fa.js.map
