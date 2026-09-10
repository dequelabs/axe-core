export const __rspack_esm_id = 3711;
export const __rspack_esm_ids = [3711];
export const __webpack_modules__ = {
  25418(e, r, n) {
    var t = n(22009),
      o = n(31601),
      i = n.n(o),
      s = n(76314),
      a = n.n(s),
      l = n(39807),
      u = n(33208),
      d = n(2128),
      m = n(71933),
      p = n(49444),
      c = n(62016),
      h = a()(i());
    (h.i(l.A),
      h.i(u.A),
      h.i(d.A),
      h.i(m.A),
      h.i(p.A),
      h.i(c.A),
      h.push([e.id, '', '']));
    let g = (0, t.AH)([h.toString()]);
    n.d(r, {}, { A: g });
  },
  39807(e, r, n) {
    var t = n(31601),
      o = n.n(t),
      i = n(76314),
      s = n.n(i)()(o());
    s.push([
      e.id,
      '*,:after,:before{box-sizing:border-box}button,input,select,textarea{font:inherit}button{color:inherit;cursor:pointer}img{height:auto;max-width:100%}a{color:var(--color-link-normal)}[hidden]{display:none!important}#content{scroll-margin-block-start:var(--sticky-header-height)}',
      ''
    ]);
    let a = s.toString();
    n.d(r, {}, { A: a });
  },
  71933(e, r, n) {
    var t = n(31601),
      o = n.n(t),
      i = n(76314),
      s = n.n(i)()(o());
    s.push([
      e.id,
      '.user-menu__button{background-color:var(--color-background-primary);cursor:pointer;margin:0;padding:0}.user-menu__button img{border-radius:50%;display:block;height:2rem;width:2rem}.user-menu__dropdown{display:grid;row-gap:1rem}.user-menu__dropdown p{margin:0}.user-menu__dropdown ul{display:grid;list-style:none;margin:0;padding:0;row-gap:.25rem}.user-menu__dropdown a{color:var(--color-text-primary)}:is(.user-menu__dropdown a):hover{color:var(--color-text-secondary)}.user-menu__dropdown form{display:contents}',
      ''
    ]);
    let a = s.toString();
    n.d(r, {}, { A: a });
  },
  62016(e, r, n) {
    var t = n(31601),
      o = n.n(t),
      i = n(76314),
      s = n.n(i)()(o());
    s.push([
      e.id,
      '@media (width > 1044px){.user-menu{position:relative}.user-menu__login{height:100%;width:100%}.user-menu__login::part(label){height:0;overflow:hidden;position:absolute;width:0}.user-menu__button{border:1px solid var(--color-border-primary);border-radius:50%}.user-menu__dropdown{background-color:var(--color-background-primary);border:1px solid var(--color-border-primary);margin:0;padding:.75rem;position:absolute;right:0;z-index:1}}',
      ''
    ]);
    let a = s.toString();
    n.d(r, {}, { A: a });
  },
  49444(e, r, n) {
    var t = n(31601),
      o = n.n(t),
      i = n(76314),
      s = n.n(i),
      a = n(4417),
      l = n.n(a),
      u = new n.U(n(74044)),
      d = s()(o()),
      m = l()(u);
    d.push([
      e.id,
      `@media (width <= 1044px){.user-menu__login{padding:.45rem 0}.user-menu__button{align-items:center;background-color:initial;border:none;display:flex;padding:.5rem .7rem;width:100%}.user-menu__button:after,.user-menu__button:before{background-color:currentcolor;height:1.25rem;margin-left:auto;mask-size:cover;width:1.25rem}.user-menu__button:after{content:"";mask-image:url(${m})}.user-menu__button[aria-expanded=true]{background-color:var(--color-background-blue)}.user-menu__button[aria-expanded=true]:after{scale:-1}.user-menu__dropdown{padding:.5rem .7rem}}`,
      ''
    ]);
    let p = d.toString();
    n.d(r, {}, { A: p });
  },
  74044(e, r, n) {
    e.exports = n.p + 'chevron-down.7c923b7054da305b.svg';
  },
  74354(e, r, n) {
    (n.r(r), n.d(r, { MDNUserMenu: () => MDNUserMenu }));
    var t = n(36085),
      o = n(22009),
      i = n(12477),
      s = n(70693),
      a = n(22207);
    let l = (0,
    o.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m10 17 5-5-5-5m5 5H3m12-9h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/></svg>`;
    var u = n(45742),
      d = n(25418);
    (n(35268), n(58623));
    let MDNUserMenu = class MDNUserMenu extends (0, s.J)(o.WF) {
      static ssr = !1;
      static styles = d.A;
      #e() {
        let e = globalThis.location.origin,
          r = new URL(a.vQ, e);
        return (r.searchParams.append('next', this.#r()), r.toString());
      }
      #r() {
        return globalThis.location.href.replace(globalThis.location.origin, '');
      }
      #n() {
        let e = globalThis.location.origin;
        return new URL(a.kv, e).toString();
      }
      #t() {
        return [
          {
            href: `/${this.locale}/plus/ai-help`,
            label: this.l10n('user-menu-ai-help')`AI Help`
          },
          {
            href: `/${this.locale}/plus/collections`,
            label: this.l10n('user-menu-collections')`Collections`
          },
          {
            href: `/${this.locale}/plus/updates`,
            label: this.l10n('user-menu-updates')`Updates`
          },
          {
            href: `/${this.locale}/plus/settings`,
            label: this.l10n('user-menu-settings')`My settings`
          },
          {
            href: 'https://support.mozilla.org/products/mdn-plus',
            label: this.l10n('user-menu-help')`Help`,
            external: !0
          },
          {
            href: 'https://github.com/mdn/MDN-feedback',
            label: this.l10n('user-menu-feedback')`Feedback`,
            external: !0
          }
        ];
      }
      _user = new t.YZ(this, { task: async () => await (0, u.L)() });
      connectedCallback() {
        (super.connectedCallback(), this._user.run());
      }
      render() {
        return this._user.render({
          initial: () => o.s6,
          pending: () => o.s6,
          complete: e =>
            e.isAuthenticated
              ? (0, o.qy)`
                <div class="user-menu">
                  <mdn-dropdown>
                    <button slot="button" class="user-menu__button">
                      ${
                        e.avatarUrl
                          ? (0, o.qy)`<img
                              src=${(0, i.J)(e.avatarUrl ?? void 0)}
                              width="32"
                              height="32"
                              alt=""
                            />`
                          : this.l10n('user-menu-user')`User`
                      }
                    </button>
                    <div slot="dropdown" class="user-menu__dropdown">
                      <p>${e.email}</p>
                      <ul>
                        ${this.#t().map(
                          e => (0, o.qy)`<li>
                              <a
                                class=${(0, i.J)(e.external ? 'external' : void 0)}
                                href=${e.href}
                                >${e.label}</a
                              >
                            </li>`
                        )}
                      </ul>
                      <form method="post" action=${this.#n()}>
                        <input
                          type="hidden"
                          name="next"
                          .value=${this.#r()}
                        />
                        <button
                          class="button"
                          data-variant="secondary"
                          type="submit"
                        >
                          ${this.l10n('logout')}
                        </button>
                      </form>
                    </div>
                  </mdn-dropdown>
                </div>
              `
              : (0, o.qy)`
                <mdn-button
                  class="user-menu__login"
                  href=${this.#e()}
                  .icon=${l}
                  variant="plain"
                  data-glean-id="top_nav: login"
                >
                  ${this.l10n('login')}
                </mdn-button>
              `
        });
      }
    };
    customElements.define('mdn-user-menu', MDNUserMenu);
  }
};
//# sourceMappingURL=3711.97606c6489b00a61.js.map
