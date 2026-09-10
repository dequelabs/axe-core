export const __rspack_esm_id = 9099;
export const __rspack_esm_ids = [9099];
export const __webpack_modules__ = {
  70335(e, i, t) {
    var s = t(22009),
      c = t(31601),
      a = t.n(c),
      r = t(76314),
      o = t.n(r)()(a());
    o.push([
      e.id,
      '@property --switch-position{syntax:"<percentage>";inherits:false;initial-value:0}.switch{cursor:pointer;display:flex;gap:.5em;place-items:center}.switch__input{--switch-size:1.25em;appearance:none;background-color:var(--color-text-secondary);background-image:radial-gradient(circle at calc(var(--switch-size)/2),var(--color-background-primary) calc((var(--switch-size)/2)*.8),#0000 calc((var(--switch-size)/2)*.8 + 1px));background-position:var(--switch-position) 0;background-repeat:no-repeat;background-size:var(--switch-size);border-radius:var(--radius-full);display:inline-block;height:var(--switch-size);margin:0;transition:--switch-position .2s;width:calc(var(--switch-size)*1.6)}.switch__input:checked{--switch-position:100%;background-color:var(--color-link-normal)}.switch__input:focus-visible{outline:2px solid var(--color-link-normal);outline-offset:2px}.switch__input:active:not(:disabled){filter:brightness(1.2)}.switch__input:disabled{opacity:.7}',
      ''
    ]);
    let n = (0, s.AH)([o.toString()]);
    t.d(i, {}, { A: n });
  },
  41798(e, i, t) {
    t.r(i);
    var s = t(22009),
      c = t(70335);
    let MDNSwitch = class MDNSwitch extends s.WF {
      static styles = c.A;
      static get properties() {
        return {
          label: { type: String },
          checked: { type: Boolean, reflect: !0 },
          disabled: { type: Boolean }
        };
      }
      constructor() {
        (super(), (this.label = ''), (this.checked = !1), (this.disabled = !1));
      }
      _toggle() {
        this.dispatchEvent(new Event('toggle', { bubbles: !0, composed: !0 }));
      }
      render() {
        return (0, s.qy)` <label class="switch">
      <input
        class="switch__input"
        type="checkbox"
        ?checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${this._toggle}
      />
      <slot></slot>
    </label>`;
      }
    };
    (customElements.define('mdn-switch', MDNSwitch),
      t.d(i, { MDNSwitch: () => MDNSwitch }));
  }
};
//# sourceMappingURL=9099.d5fd55aa8af08e99.js.map
