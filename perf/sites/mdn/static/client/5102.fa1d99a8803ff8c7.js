export const __rspack_esm_id = 5102;
export const __rspack_esm_ids = [5102];
export const __webpack_modules__ = {
  22250(e, t, s) {
    var r = s(22009),
      i = s(31601),
      h = s.n(i),
      a = s(76314),
      c = s.n(a)()(h());
    c.push([
      e.id,
      ':host{display:block}:host picture{display:block;max-width:100%}:host img{height:auto;width:100%}:host picture{justify-self:end;width:100%}',
      ''
    ]);
    let m = (0, r.AH)([c.toString()]);
    s.d(t, {}, { A: m });
  },
  48125(e, t, s) {
    s.r(t);
    var r = s(22009),
      i = s(22250);
    let MDNThemedImage = class MDNThemedImage extends r.WF {
      static styles = i.A;
      static ssr = !1;
      static get properties() {
        return {
          srcLight: { type: String, attribute: 'src-light' },
          srcDark: { type: String, attribute: 'src-dark' },
          alt: { type: String },
          _theme: { type: String }
        };
      }
      constructor() {
        (super(),
          (this.srcLight = ''),
          (this.srcDark = ''),
          (this.alt = ''),
          (this._theme = 'os'));
      }
      connectedCallback() {
        (super.connectedCallback(),
          this._setupThemeObserver(),
          this._updateTheme());
      }
      disconnectedCallback() {
        (super.disconnectedCallback(),
          this._themeObserver && this._themeObserver.disconnect());
      }
      _updateTheme() {
        this._theme =
          'light dark' === document.documentElement.dataset.theme
            ? 'os'
            : (document.documentElement.dataset.theme ?? 'light');
      }
      _setupThemeObserver() {
        let e = new MutationObserver(this._handleThemeChange.bind(this));
        (e.observe(document.documentElement, {
          attributes: !0,
          attributeFilter: ['data-theme']
        }),
          (this._themeObserver = e));
      }
      _handleThemeChange(e) {
        for (let t of e)
          'attributes' === t.type &&
            'data-theme' === t.attributeName &&
            this._updateTheme();
      }
      render() {
        switch (this._theme) {
          case 'os':
            return (0, r.qy)`<picture>
          <source
            srcset=${this.srcLight}
            media="(prefers-color-scheme: light)"
          />
          <source srcset=${this.srcDark} media="(prefers-color-scheme: dark)" />
          <img src=${this.srcLight} alt=${this.alt} />
        </picture>`;
          case 'dark':
            return (0, r.qy)`<img src=${this.srcDark} alt=${this.alt} />`;
          default:
            return (0, r.qy)`<img src=${this.srcLight} alt=${this.alt} />`;
        }
      }
    };
    (customElements.define('mdn-themed-image', MDNThemedImage),
      s.d(t, { MDNThemedImage: () => MDNThemedImage }));
  }
};
//# sourceMappingURL=5102.fa1d99a8803ff8c7.js.map
