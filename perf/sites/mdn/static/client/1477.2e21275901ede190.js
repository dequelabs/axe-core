export const __rspack_esm_id = 1477;
export const __rspack_esm_ids = [1477];
export const __webpack_modules__ = {
  99677(e, t, n) {
    var o = n(22009),
      r = n(31601),
      a = n.n(r),
      c = n(76314),
      s = n.n(c)()(a());
    s.push([
      e.id,
      '.placement-note{background-color:#f9f9fbd0;border:1px solid #313131;border-radius:.25rem;color:#313131;display:block;font-size:.625rem;margin:.25rem;opacity:.85;padding:0 .25rem;-webkit-text-decoration:underline;text-decoration:underline;text-transform:uppercase;width:max-content}.placement-note:focus,.placement-note:hover{opacity:unset;-webkit-text-decoration:none;text-decoration:none}',
      ''
    ]);
    let d = (0, o.AH)([s.toString()]);
    n.d(t, {}, { A: d });
  },
  47764(e, t, n) {
    n.r(t);
    var o = n(22009),
      r = n(70693),
      a = n(99677);
    let MDNPlacementNote = class MDNPlacementNote extends (0, r.J)(o.WF) {
      static styles = a.A;
      render() {
        return (0, o.qy)`<a
      href="https://developer.mozilla.org/en-US/advertising"
      class="placement-note"
      data-glean-id=${'pong: pong->about'}
      target="_blank"
      rel="noreferrer"
      >${this.l10n('placement-note')}</a
    >`;
      }
    };
    customElements.define('mdn-placement-note', MDNPlacementNote);
  }
};
//# sourceMappingURL=1477.2e21275901ede190.js.map
