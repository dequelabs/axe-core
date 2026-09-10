export const __rspack_esm_id = 1975;
export const __rspack_esm_ids = [1975];
export const __webpack_modules__ = {
  47706(e, t, s) {
    s.r(t);
    var r = s(22009);
    let MDNImageHistory = class MDNImageHistory extends r.WF {
      static ssr = !1;
      createRenderRoot() {
        return this;
      }
      firstUpdated() {
        for (let e of this.renderRoot.querySelectorAll('img')) {
          let t = /@([0-9]+(?:\.[0-9]+)?)(?=x\.[a-z]+$)/,
            s = e.src.match(t);
          if (s?.[1]) {
            let r = Number.parseFloat(s[1]);
            e.srcset = [1, 2]
              .map(s => `${e.src.replace(t, `@${r * s}`)} ${s}x`)
              .join(', ');
          }
        }
      }
    };
    (customElements.define('mdn-image-history', MDNImageHistory),
      s.d(t, { MDNImageHistory: () => MDNImageHistory }));
  }
};
//# sourceMappingURL=1975.613ee2ee7d1ea470.js.map
