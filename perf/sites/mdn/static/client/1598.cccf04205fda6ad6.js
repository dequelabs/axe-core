export const __rspack_esm_id = 1598;
export const __rspack_esm_ids = [1598];
export const __webpack_modules__ = {
  65517(t, e, o) {
    (o.r(e), o.d(e, { MDNCopyButton: () => MDNCopyButton }));
    var s = o(22009),
      i = o(70693),
      c = o(35268);
    let r = (0,
    s.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>`;
    let MDNCopyButton = class MDNCopyButton extends (0, i.J)(s.WF) {
      static get properties() {
        return {
          variant: {},
          _message: { state: !0 },
          _copiedSuccessfully: { state: !0 }
        };
      }
      constructor() {
        (super(),
          (this.variant = 'primary'),
          (this._copiedSuccessfully = !1),
          (this.copiesFrom = void 0));
      }
      async _copy({ target: t }) {
        if (t instanceof c.MDNButton) {
          try {
            let t = this.copiesFrom?.textContent?.trim();
            t &&
              (await navigator.clipboard.writeText(t),
              (this._copiedSuccessfully = !0));
          } catch (t) {
            (console.error(
              'Error when trying to use navigator.clipboard.writeText()',
              t
            ),
              (this._copiedSuccessfully = !1));
          }
          ((this._message = this._copiedSuccessfully
            ? this.l10n('copy-button-copied')`Copied`
            : this.l10n('copy-button-copy-failed')`Copy failed!`),
            setTimeout(
              () => {
                ((this._message = void 0), (this._copiedSuccessfully = !1));
              },
              this._copiedSuccessfully ? 1e3 : 3e3
            ));
        }
      }
      render() {
        return (0, s.qy)`<mdn-button
      @click=${this._copy}
      .icon=${this._copiedSuccessfully ? r : void 0}
      variant=${this.variant}
      >${this._message ?? this.l10n('copy-button-copy')`Copy`}</mdn-button
    >`;
      }
    };
    customElements.define('mdn-copy-button', MDNCopyButton);
  }
};
//# sourceMappingURL=1598.cccf04205fda6ad6.js.map
