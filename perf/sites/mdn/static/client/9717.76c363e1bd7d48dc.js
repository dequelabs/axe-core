export const __rspack_esm_id = 9717;
export const __rspack_esm_ids = [9717];
export const __webpack_modules__ = {
  52500(e, t, s) {
    s.r(t);
    var r = s(22009),
      i = s(70693);
    let MDNCurriculumTabs = class MDNCurriculumTabs extends (0, i.J)(r.WF) {
      static ssr = !1;
      static get properties() {
        return { selectedtab: {} };
      }
      createRenderRoot() {
        return this;
      }
      firstUpdated() {
        let e = this.querySelectorAll('input[type="radio"]'),
          t = globalThis.location.hash.replace(/^#/, '');
        for (let s of e) {
          if (s.id === t) {
            let e = s instanceof HTMLInputElement ? s : void 0;
            if (!e) continue;
            ((e.checked = !0),
              (this.selectedtab = e.dataset.index
                ? Number(e.dataset.index)
                : 1));
          }
          s.addEventListener('click', e => {
            let t = s.id;
            t && history.pushState(null, '', `#${t}`);
          });
        }
      }
      constructor() {
        (super(), (this.selectedtab = 1));
      }
    };
    (customElements.define('mdn-curriculum-tabs', MDNCurriculumTabs),
      s.d(t, { MDNCurriculumTabs: () => MDNCurriculumTabs }));
  }
};
//# sourceMappingURL=9717.76c363e1bd7d48dc.js.map
