export const __rspack_esm_id = 1996;
export const __rspack_esm_ids = [1996];
export const __webpack_modules__ = {
  30307(e, r, t) {
    var a = t(22009),
      n = t(31601),
      o = t.n(n),
      i = t(76314),
      l = t.n(i),
      s = t(39807),
      c = t(4417),
      d = t.n(c),
      g = new t.U(t(15859)),
      u = l()(o());
    u.i(s.A);
    var h = d()(g);
    u.push([
      e.id,
      `.language-switcher{position:relative}.language-switcher__button{align-items:center;background-color:initial;border:none;color:inherit;column-gap:.25rem;cursor:pointer;display:flex;font:inherit;margin:0;padding:0 .5rem}.language-switcher__button:is(:hover,:focus,[aria-expanded=true]){background-color:var(--color-background-secondary)}@media screen and (width <= 480px){.language-switcher__button>span{display:none}}.language-switcher__button:before{background-color:currentcolor;content:"";height:1.25rem;mask-image:url(${h});mask-size:cover;width:1.25rem}.language-switcher__dropdown{background-color:var(--color-background-primary);border:1px solid var(--color-border-primary);margin:0;padding:.75rem;position:absolute;right:0;width:max-content;z-index:1}.language_switcher__remember{border-bottom:1px solid var(--color-border-primary);display:flex;font-size:var(--font-size-small);place-items:center;width:100%}.language_switcher__remember mdn-switch{padding:.25rem}:is(.language_switcher__remember mdn-switch):hover{background-color:var(--color-background-secondary)}.language-switcher__list{background-color:var(--color-background-primary);list-style:none;margin:0;padding:0;width:100%}.language-switcher__option{align-items:center;background-color:initial;border:none;color:var(--color-text-primary);column-gap:.25rem;display:flex;font:inherit;margin:0;padding:.25rem;-webkit-text-decoration:none;text-decoration:none;width:100%}.language-switcher__option:hover,.language-switcher__option[data-current]{background-color:var(--color-background-secondary)}`,
      ''
    ]);
    let _ = (0, a.AH)([u.toString()]);
    t.d(r, {}, { A: _ });
  },
  15859(e, r, t) {
    e.exports = t.p + 'languages.dcba936080e5be86.svg';
  },
  48423(e, r, t) {
    (t.r(r), t.d(r, { MDNLanguageSwitcher: () => MDNLanguageSwitcher }));
    var a = t(36085),
      n = t(22009),
      o = t(70693),
      i = t(23727);
    let l = (0,
    n.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>`;
    var s = t(15899),
      c = t(22130),
      d = t(30307);
    (t(35268), t(58623), t(41798));
    let MDNLanguageSwitcher = class MDNLanguageSwitcher extends (0, o.J)(n.WF) {
      static styles = d.A;
      static get properties() {
        return {
          locale: { type: String },
          native: { type: String },
          translations: { type: Array },
          url: { type: String },
          notFound: { type: Boolean, attribute: 'not-found' },
          _preferredLocale: { state: !0 }
        };
      }
      constructor() {
        (super(),
          (this.translations = []),
          (this.native = ''),
          (this.locale = 'en-US'),
          (this.url = '/'),
          (this.notFound = !1),
          (this._preferredLocale = void 0));
      }
      _notFoundFallback = new a.YZ(this, {
        args: () => [this.notFound],
        task: async ([e]) => {
          if (e) return await (0, s.$)(location.pathname);
        }
      });
      firstUpdated() {
        ((this._preferredLocale = (0, c.E_)()),
          location.search && (this.url += location.search));
      }
      get _isLocalePreferred() {
        return this._preferredLocale == this.locale;
      }
      _togglePreferredLocale() {
        if (this.notFound) return;
        let e = this._preferredLocale ?? '0';
        this._isLocalePreferred
          ? ((0, c.rM)(),
            (this._preferredLocale = void 0),
            (0, i.w)(`language_remember: ${e} -> 0`))
          : ((0, c.ud)(this.locale),
            (this._preferredLocale = this.locale),
            (0, i.w)(`language_remember: ${e} -> ${this.locale}`));
      }
      render() {
        let {
          translations: e,
          native: r,
          locale: t,
          url: a,
          notFound: o
        } = this;
        return 0 === e.length
          ? n.s6
          : (0, n.qy)`<div class="language-switcher">
      <mdn-dropdown>
        <button
          part="button"
          slot="button"
          class="language-switcher__button"
          type="button"
          aria-labelledby="current-locale"
        >
          <span id="current-locale">${r ?? t}</span>
        </button>
        <div
          slot="dropdown"
          class="language-switcher__dropdown"
          id="language-switcher__dropdown"
        >
          <div class="language_switcher__remember">
            <mdn-switch
              @toggle=${this._togglePreferredLocale}
              ?checked=${this._isLocalePreferred}
              >${this.l10n('language-switcher-remember-language')`Remember language`}</mdn-switch
            >
            <mdn-button
              variant="plain"
              .icon=${l}
              icon-only
              href="https://github.com/orgs/mdn/discussions/739"
              target="_blank"
              title=${this.l10n('language-switcher-enable-this-setting-to-always-sw')`Enable this setting to always switch to the current language when available. (Click to learn more.)`}
              >${this.l10n('language-switcher-learn-more')`Learn more`}</mdn-button
            >
          </div>
          <ul class="language-switcher__list">
            ${o ? this._notFoundFallback.render({ initial: () => this._renderCurrentLocale(), pending: () => this._renderCurrentLocale(), error: () => this._renderCurrentLocale(), complete: e => (e?.other_translations ? this._renderDropdownItems(e.other_translations, t, e.mdn_url, o) : this._renderCurrentLocale()) }) : this._renderDropdownItems(e, t, a)}
          </ul>
        </div>
      </mdn-dropdown>
    </div>`;
      }
      _renderDropdownItems(e, r, t, a = !1) {
        return e
          .sort((e, r) => e.locale.localeCompare(r.locale))
          .map(
            e => (0, n.qy)`
          <li>
            <a
              class="language-switcher__option"
              ?data-current=${r === e.locale}
              @click=${c.rM}
              href=${t.replace(`/${a ? 'en-US' : r}/`, `/${e.locale}/`)}
              data-glean-id=${`language: ${r} -> ${e.locale}`}
              >${e.native}</a
            >
          </li>
        `
          );
      }
      _renderCurrentLocale() {
        return (0, n.qy)`
      <li>
        <a
          class="language-switcher__option"
          ?data-current=${!0}
          href=${this.url}
          >${this.native}</a
        >
      </li>
    `;
      }
    };
    customElements.define('mdn-language-switcher', MDNLanguageSwitcher);
  }
};
//# sourceMappingURL=1996.e833c07cb4ee4327.js.map
