export const __rspack_esm_id = 5338;
export const __rspack_esm_ids = [5338];
export const __webpack_modules__ = {
  39658(t, r, o) {
    var e = o(22009),
      s = o(31601),
      a = o.n(s),
      i = o(76314),
      c = o.n(i)()(a());
    c.push([
      t.id,
      ':host{--csstools-light-dark-toggle-8176b3cd-0:var(--csstools-color-scheme--light) var(--color-gray-10);--ix-tab-background-active:var(--csstools-light-dark-toggle-8176b3cd-0,var(--color-gray-90));background-color:initial;border-bottom:0;border-top:0;border-color:#0000 currentcolor;border-style:solid none;border-width:3px 0;color:var(--color-text-secondary);cursor:pointer;font-size:var(--font-size-small);padding:.5em 30px;transition:color .2s,background-color .2s}@supports (color:light-dark(red,red)){:host{--ix-tab-background-active:light-dark(var(--color-gray-90),var(--color-gray-10))}}@supports not (color:light-dark(tan,tan)){:host *{--csstools-light-dark-toggle-8176b3cd-0:var(--csstools-color-scheme--light) var(--color-gray-10);--ix-tab-background-active:var(--csstools-light-dark-toggle-8176b3cd-0,var(--color-gray-90))}}:host(:focus),:host(:hover){background-color:var(--ix-tab-background-active);color:var(--color-text-primary)}:host([aria-selected=true]){background-color:var(--ix-tab-background-active);border-bottom-color:var(--color-border-active);color:var(--color-border-active)}',
      ''
    ]);
    let l = (0, e.AH)([c.toString()]);
    o.d(r, {}, { A: l });
  },
  18977(t, r, o) {
    o.r(r);
    var e = o(22009),
      s = o(89854),
      a = o(39658);
    let MDNIXTab = class MDNIXTab extends e.WF {
      static styles = a.A;
      connectedCallback() {
        (super.connectedCallback(),
          this.setAttribute('slot', 'tablist'),
          this.setAttribute('role', 'tab'),
          this.unsetActive());
        let t = this.nextElementSibling;
        t instanceof s.MDNIXTabPanel &&
          ((this.panel = t),
          t.id && this.setAttribute('aria-controls', t.id),
          this.id && t.setAttribute('aria-labelledby', this.id));
      }
      setActive() {
        (this.setAttribute('tabindex', '0'),
          this.setAttribute('aria-selected', 'true'),
          this.panel?.setActive());
      }
      unsetActive() {
        (this.setAttribute('tabindex', '-1'),
          this.setAttribute('aria-selected', 'false'),
          this.panel?.unsetActive());
      }
      get isActive() {
        return 'true' === this.getAttribute('aria-selected');
      }
      render() {
        return (0, e.qy)`<slot></slot>`;
      }
    };
    (customElements.define('mdn-ix-tab', MDNIXTab),
      o.d(r, { MDNIXTab: () => MDNIXTab }));
  }
};
//# sourceMappingURL=5338.c60fc26b5f12c980.js.map
