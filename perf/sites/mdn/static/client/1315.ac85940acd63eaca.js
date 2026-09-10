export const __rspack_esm_id = 1315;
export const __rspack_esm_ids = [1315];
export const __webpack_modules__ = {
  51310(e, t, r) {
    r.r(t);
    var i = r(22009),
      n = r(70693);
    r(35268);
    let MDNWriterOpenEditor = class MDNWriterOpenEditor extends (0, n.J)(i.WF) {
      static get properties() {
        return { filepath: { type: String } };
      }
      constructor() {
        (super(), (this.filepath = ''));
      }
      async _open() {
        let e = new URLSearchParams({ filepath: this.filepath });
        await fetch(`/_open?${e}`);
      }
      render() {
        return (0, i.qy)`<mdn-button @click=${this._open} variant="plain">
      ${this.l10n('writer-open-editor-open-in-editor')`Open in editor`}
    </mdn-button>`;
      }
    };
    (customElements.define('mdn-writer-open-editor', MDNWriterOpenEditor),
      r.d(t, { MDNWriterOpenEditor: () => MDNWriterOpenEditor }));
  }
};
//# sourceMappingURL=1315.ac85940acd63eaca.js.map
