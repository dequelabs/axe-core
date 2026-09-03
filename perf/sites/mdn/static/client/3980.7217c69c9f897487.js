export const __rspack_esm_id = 3980;
export const __rspack_esm_ids = [3980];
export const __webpack_modules__ = {
  17566(o, e, t) {
    var d = t(22009),
      a = t(31601),
      l = t.n(a),
      r = t(76314),
      s = t.n(r)()(l());
    s.push([
      o.id,
      'dialog{border:1px solid var(--color-border-primary);border-radius:.25rem;padding:0}header{display:flex;padding:.5rem}header h2{margin:0}header mdn-button{margin-left:auto}slot{display:block;padding:0 1rem 1rem}',
      ''
    ]);
    let i = (0, d.AH)([s.toString()]);
    t.d(e, {}, { A: i });
  },
  14903(o, e, t) {
    t.r(e);
    var d = t(22009),
      a = t(70693),
      l = t(10336);
    t(35268);
    var r = t(17566);
    let MDNModal = class MDNModal extends (0, a.J)(d.WF) {
      static styles = r.A;
      static get properties() {
        return { modalTitle: { type: String, attribute: 'modal-title' } };
      }
      constructor() {
        (super(), (this.modalTitle = ''));
      }
      showModal() {
        this.shadowRoot?.querySelector('dialog')?.showModal();
      }
      close() {
        this.shadowRoot?.querySelector('dialog')?.close();
      }
      render() {
        return (0, d.qy)`
      <dialog closedby="any">
        <header>
          ${this.modalTitle ? (0, d.qy)`<h2>${this.modalTitle}</h2>` : d.s6}
          <mdn-button
            variant="plain"
            icon-only
            .icon=${l.A}
            @click=${this.close}
            >${this.l10n('modal-exit-modal')`Exit modal`}</mdn-button
          >
        </header>
        <slot></slot>
      </dialog>
    `;
      }
    };
    (customElements.define('mdn-modal', MDNModal),
      t.d(e, { MDNModal: () => MDNModal }));
  }
};
//# sourceMappingURL=3980.7217c69c9f897487.js.map
