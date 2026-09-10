export const __rspack_esm_id = 5542;
export const __rspack_esm_ids = [5542];
export const __webpack_modules__ = {
  58952(o, e, t) {
    var r = t(22009),
      l = t(31601),
      a = t.n(l),
      n = t(76314),
      i = t.n(n),
      d = t(4417),
      c = t.n(d),
      m = new t.U(t(4512)),
      s = new t.U(t(56324)),
      h = new t.U(t(27677)),
      _ = i()(a()),
      g = c()(m),
      p = c()(s),
      u = c()(h);
    _.push([
      o.id,
      `.color-theme{--color-theme-light-dark:url(${g});--color-theme-light:url(${p});--color-theme-dark:url(${u});position:relative}.color-theme__button{align-items:center;background-color:initial;border:none;color:inherit;column-gap:.25rem;cursor:pointer;display:flex;font:inherit;margin:0;padding:0 .5rem}.color-theme__button:is(:hover,:focus,[aria-expanded=true]){background-color:var(--color-background-secondary)}@media (width <= 769px){.color-theme__button>span{display:none}}.color-theme__button:before{background-color:currentcolor;content:"";height:1.25rem;mask-size:cover;width:1.25rem}.color-theme__button[data-mode="light dark"]:before{mask-image:var(--color-theme-light-dark)}.color-theme__button[data-mode=light]:before{mask-image:var(--color-theme-light)}.color-theme__button[data-mode=dark]:before{mask-image:var(--color-theme-dark)}.color-theme__dropdown{border:1px solid var(--color-border-primary);padding:.75rem;position:absolute;right:0;z-index:1}.color-theme__dropdown,.color-theme__list{background-color:var(--color-background-primary);margin:0;width:max-content}.color-theme__list{list-style:none;padding:0}.color-theme__option{align-items:center;background-color:initial;border:none;color:var(--color-text-primary);column-gap:.25rem;cursor:pointer;display:flex;font:inherit;margin:0;padding:.25rem;width:100%}.color-theme__option:hover{background-color:var(--color-background-secondary)}.color-theme__option:before{background-color:currentcolor;content:"";height:1.25rem;mask-size:cover;width:1.25rem}.color-theme__option[data-mode="light dark"]:before{mask-image:var(--color-theme-light-dark)}.color-theme__option[data-mode=light]:before{mask-image:var(--color-theme-light)}.color-theme__option[data-mode=dark]:before{mask-image:var(--color-theme-dark)}.color-theme__option[data-current]{background:var(--color-background-secondary)}`,
      ''
    ]);
    let b = (0, r.AH)([_.toString()]);
    t.d(e, {}, { A: b });
  },
  4512(o, e, t) {
    o.exports = t.p + 'contrast.d86e85c43de8dee8.svg';
  },
  27677(o, e, t) {
    o.exports = t.p + 'moon.74026b9da82b0694.svg';
  },
  56324(o, e, t) {
    o.exports = t.p + 'sun.1d7c3ad7bf6fc390.svg';
  },
  55269(o, e, t) {
    t.r(e);
    var r = t(22009),
      l = t(70693),
      a = t(23727),
      n = t(58952);
    t(58623);
    let MDNColorTheme = class MDNColorTheme extends (0, l.J)(r.WF) {
      static styles = n.A;
      static get properties() {
        return { _mode: { state: !0 } };
      }
      constructor() {
        (super(),
          (this._mode = 'light dark'),
          (this._closingFromSelect = !1),
          (this._options = Object.entries({
            'light dark': this.l10n('theme-default')`OS default`,
            light: this.l10n('color-theme-light')`Light`,
            dark: this.l10n('color-theme-dark')`Dark`
          })));
      }
      _setMode({ target: o }) {
        if (o instanceof HTMLElement) {
          let e = o.dataset.mode;
          if ('light dark' === e || 'light' === e || 'dark' === e) {
            this._mode = e;
            let o = 'light dark' === e ? 'os-default' : e;
            (0, a.w)(`theme_switcher: switch -> ${o}`);
            try {
              localStorage.setItem('theme', e);
            } catch (o) {
              console.warn('Unable to write theme to localStorage', o);
            }
            let t = this.shadowRoot?.querySelector('mdn-dropdown');
            t && ((this._closingFromSelect = !0), (t.open = !1));
          }
        }
      }
      _onDropdownToggle({ target: o }) {
        if (o instanceof HTMLElement && 'open' in o) {
          if (!o.open && this._closingFromSelect) {
            this._closingFromSelect = !1;
            return;
          }
          (0, a.w)(`theme_switcher: ${o.open ? 'open' : 'close'}`);
        }
      }
      willUpdate(o) {
        o.has('_mode') &&
          globalThis.document &&
          ((document.documentElement.dataset.theme = this._mode),
          this.dispatchEvent(
            new CustomEvent('mdn-color-theme-update', {
              bubbles: !0,
              composed: !0,
              detail: this._mode
            })
          ));
      }
      render() {
        return (0, r.qy)`<div class="color-theme">
      <mdn-dropdown @toggle=${this._onDropdownToggle}>
        <button
          part="button"
          slot="button"
          class="color-theme__button"
          data-mode=${this._mode}
          type="button"
          aria-label=${this.l10n('color-theme-switch-color-theme')`Switch color theme`}
        >
          <span>${this.l10n('color-theme-theme')`Theme`}</span>
        </button>
        <div
          slot="dropdown"
          class="color-theme__dropdown"
          id="color-theme__dropdown"
        >
          <ul class="color-theme__list">
            ${this._options.map(
              ([o, e]) => (0, r.qy)`<li>
                  <button
                    class="color-theme__option"
                    data-mode=${o}
                    ?data-current=${o === this._mode}
                    type="button"
                    @click=${this._setMode}
                  >
                    ${e}
                  </button>
                </li>`
            )}
          </ul>
        </div>
      </mdn-dropdown>
    </div>`;
      }
      firstUpdated() {
        let o;
        try {
          o = localStorage.getItem('theme');
        } catch (o) {
          console.warn('Unable to read theme from localStorage', o);
        }
        ('light dark' === o || 'light' === o || 'dark' === o) &&
          (this._mode = o);
      }
    };
    (customElements.define('mdn-color-theme', MDNColorTheme),
      t.d(e, { MDNColorTheme: () => MDNColorTheme }));
  }
};
//# sourceMappingURL=5542.1e868b3ebf533fa2.js.map
