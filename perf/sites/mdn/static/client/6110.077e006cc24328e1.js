export const __rspack_esm_id = 6110;
export const __rspack_esm_ids = [6110];
export const __webpack_modules__ = {
  60042(r, e, s) {
    var o = s(22009),
      a = s(31601),
      t = s.n(a),
      i = s(76314),
      n = s.n(i)()(t());
    n.push([
      r.id,
      ':host{display:block}.progress-bar{background-color:var(--background-color,#eee);border-radius:var(--border-radius,0);height:20px;overflow:hidden;position:relative;width:100%}.progress-bar:before{animation:scan 2s ease-in-out infinite alternate;background:linear-gradient(to right,#0000 0,var(--progress-color,#aaa) 50%,#0000 100%);content:"";height:100%;left:-200%;position:absolute;top:0;width:200%}@keyframes scan{0%{left:-200%}to{left:100%}}',
      ''
    ]);
    let d = (0, o.AH)([n.toString()]);
    s.d(e, {}, { A: d });
  },
  20141(r, e, s) {
    s.r(e);
    var o = s(22009),
      a = s(60042);
    let MDNProgressBar = class MDNProgressBar extends o.WF {
      static styles = a.A;
      render() {
        return (0, o.qy)`<div class="progress-bar"></div>`;
      }
    };
    (customElements.define('mdn-progress-bar', MDNProgressBar),
      s.d(e, { MDNProgressBar: () => MDNProgressBar }));
  }
};
//# sourceMappingURL=6110.077e006cc24328e1.js.map
