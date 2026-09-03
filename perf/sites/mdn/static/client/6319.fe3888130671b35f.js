export const __rspack_esm_id = 6319;
export const __rspack_esm_ids = [6319];
export const __webpack_modules__ = {
  70242(n, t, o) {
    o.r(t);
    var e = o(22009);
    o(35268);
    var i = o(70693),
      r = o(22207);
    let MDNLoginButton = class MDNLoginButton extends (0, i.J)(e.WF) {
      static ssr = !1;
      get _loginUrl() {
        let n = location.href.replace(location.origin, ''),
          t = new URL(r.vQ, location.origin);
        return (
          (t.search = new URLSearchParams({ next: n }).toString()),
          t.toString()
        );
      }
      render() {
        return (0,
        e.qy)`<mdn-button href=${this._loginUrl} data-glean-id="login_button"
      >${this.l10n('login-button-login')`Login`}</mdn-button
    >`;
      }
    };
    (customElements.define('mdn-login-button', MDNLoginButton),
      o.d(t, { MDNLoginButton: () => MDNLoginButton }));
  }
};
//# sourceMappingURL=6319.fe3888130671b35f.js.map
