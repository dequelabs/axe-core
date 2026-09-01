export const __rspack_esm_id = 2868;
export const __rspack_esm_ids = [2868];
export const __webpack_modules__ = {
  16720(t, e, o) {
    var n = o(22009),
      s = o(31601),
      l = o.n(s),
      i = o(76314),
      d = o.n(i)()(l());
    d.push([
      t.id,
      ':host{display:contents}:host(:not([loaded],:focus-within)) slot[name=dropdown]{display:none}',
      ''
    ]);
    let r = (0, n.AH)([d.toString()]);
    o.d(e, {}, { A: r });
  },
  58623(t, e, o) {
    o.r(e);
    var n = o(22009),
      s = o(81519),
      l = o(16720);
    let MDNDropdown = class MDNDropdown extends n.WF {
      static styles = l.A;
      static get properties() {
        return {
          open: { type: Boolean },
          loaded: { type: Boolean, reflect: !0 }
        };
      }
      constructor() {
        (super(), (this.open = !1), (this.loaded = !1));
      }
      get _buttonSlotElements() {
        return this._slotElements('button');
      }
      get _dropdownSlotElements() {
        return this._slotElements('dropdown');
      }
      _slotElements(t) {
        let e = this.shadowRoot?.querySelector(`slot[name="${CSS.escape(t)}"]`);
        return e instanceof HTMLSlotElement ? e.assignedElements() : [];
      }
      _globalClick(t) {
        t.composedPath().includes(this) || (this.open = !1);
      }
      _globalKeyDown(t) {
        this.open && 'Escape' === t.key && this._toggleDropDown();
      }
      _toggleDropDown() {
        this.open = !this.open;
      }
      _setAriaAttributes() {
        let t = this._dropdownSlotElements.find(t => t.id)?.id;
        for (let e of (t ||
          ((t = (0, s.O)('uid_')),
          this._dropdownSlotElements[0]?.setAttribute('id', t)),
        this._buttonSlotElements))
          (e.setAttribute('aria-expanded', this.open.toString()),
            t && e.setAttribute('aria-controls', t));
      }
      connectedCallback() {
        (super.connectedCallback(),
          (this._globalClick = this._globalClick.bind(this)),
          document.addEventListener('click', this._globalClick),
          (this._globalKeyDown = this._globalKeyDown.bind(this)),
          document.addEventListener('keydown', this._globalKeyDown));
      }
      render() {
        return (0, n.qy)`
      <slot name="button" @click=${this._toggleDropDown}></slot>
      <slot name="dropdown" ?hidden=${!this.open && this.loaded}></slot>
    `;
      }
      updated(t) {
        (this._setAriaAttributes(),
          t.has('open') &&
            void 0 !== t.get('open') &&
            this.dispatchEvent(
              new Event('toggle', { bubbles: !0, composed: !0 })
            ));
      }
      firstUpdated() {
        this.loaded = !0;
      }
      disconnectedCallback() {
        (super.disconnectedCallback(),
          document.removeEventListener('click', this._globalClick),
          document.removeEventListener('keydown', this._globalKeyDown));
      }
    };
    (customElements.define('mdn-dropdown', MDNDropdown),
      o.d(e, { MDNDropdown: () => MDNDropdown }));
  }
};
//# sourceMappingURL=2868.72600e71ae8128fe.js.map
