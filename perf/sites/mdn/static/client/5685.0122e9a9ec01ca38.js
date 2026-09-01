export const __rspack_esm_id = 5685;
export const __rspack_esm_ids = [5685];
export const __webpack_modules__ = {
  77108(t, e, a) {
    a.r(e);
    var n = a(22009),
      o = a(23727),
      s = a(22130);
    a(35268);
    let MDNLanguageAlwaysRedirectButton = class MDNLanguageAlwaysRedirectButton
      extends n.WF
    {
      static get properties() {
        return { locale: { type: String }, to: { type: String } };
      }
      constructor() {
        (super(), (this.locale = ''), (this.to = ''));
      }
      _handleClick() {
        ((0, o.w)(`language: ${this.locale} -> ${this.to} (always)`),
          (0, s.ud)(this.to));
        let t = document.location.pathname.replace(
          `/${this.locale}/`,
          `/${this.to}/`
        );
        document.location.replace(t);
      }
      render() {
        return (0, n.qy)`<mdn-button variant="plain" @click=${this._handleClick}
      ><slot></slot
    ></mdn-button>`;
      }
    };
    (customElements.define(
      'mdn-language-always-redirect-button',
      MDNLanguageAlwaysRedirectButton
    ),
      a.d(e, {
        MDNLanguageAlwaysRedirectButton: () => MDNLanguageAlwaysRedirectButton
      }));
  }
};
//# sourceMappingURL=5685.0122e9a9ec01ca38.js.map
