export const __rspack_esm_id = 4419;
export const __rspack_esm_ids = [4419];
export const __webpack_modules__ = {
  19059(t, e, s) {
    var a = s(22009),
      n = s(31601),
      l = s.n(n),
      i = s(76314),
      r = s.n(i)()(l());
    r.push([t.id, ':host{flex:1;min-height:0}', '']);
    let c = (0, a.AH)([r.toString()]);
    s.d(e, {}, { A: c });
  },
  89854(t, e, s) {
    s.r(e);
    var a = s(22009),
      n = s(19059);
    let MDNIXTabPanel = class MDNIXTabPanel extends a.WF {
      static styles = n.A;
      connectedCallback() {
        (super.connectedCallback(),
          this.setAttribute('tabindex', '0'),
          this.setAttribute('role', 'tabpanel'));
      }
      setActive() {
        this.setAttribute('slot', 'active-panel');
      }
      unsetActive() {
        this.removeAttribute('slot');
      }
      render() {
        return (0, a.qy)`<slot></slot>`;
      }
    };
    (customElements.define('mdn-ix-tab-panel', MDNIXTabPanel),
      s.d(e, { MDNIXTabPanel: () => MDNIXTabPanel }));
  }
};
//# sourceMappingURL=4419.6de41f5295751420.js.map
