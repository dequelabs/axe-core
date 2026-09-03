export const __rspack_esm_id = 4759;
export const __rspack_esm_ids = [4759];
export const __webpack_modules__ = {
  43437(a, t, e) {
    var n = e(22009),
      o = e(31601),
      r = e.n(o),
      i = e(76314),
      l = e.n(i)()(r());
    l.push([
      a.id,
      '.hp-main-placement{--hp-main-background-light:var(--color-background-primary);--hp-main-color-light:var(--color-text-primary);--hp-main-background-dark:var(--color-background-primary);--hp-main-color-dark:var(--color-text-primary);--csstools-light-dark-toggle-195607df-0:var(--csstools-color-scheme--light) var(--hp-main-background-dark);--hp-main-background:var(--csstools-light-dark-toggle-195607df-0,var(--hp-main-background-light));--csstools-light-dark-toggle-195607df-1:var(--csstools-color-scheme--light) var(--hp-main-color-dark);--hp-main-color:var(--csstools-light-dark-toggle-195607df-1,var(--hp-main-color-light));background-color:var(--hp-main-background);padding-inline:var(--layout-side-padding)}@supports (color:light-dark(red,red)){.hp-main-placement{--hp-main-background:light-dark(var(--hp-main-background-light),var(--hp-main-background-dark));--hp-main-color:light-dark(var(--hp-main-color-light),var(--hp-main-color-dark))}}@supports not (color:light-dark(tan,tan)){.hp-main-placement *{--csstools-light-dark-toggle-195607df-0:var(--csstools-color-scheme--light) var(--hp-main-background-dark);--hp-main-background:var(--csstools-light-dark-toggle-195607df-0,var(--hp-main-background-light));--csstools-light-dark-toggle-195607df-1:var(--csstools-color-scheme--light) var(--hp-main-color-dark);--hp-main-color:var(--csstools-light-dark-toggle-195607df-1,var(--hp-main-color-light))}}.hp-main-placement .placement-container{column-gap:3rem;display:grid;grid-template-areas:"nope pong note" "nope pong no";grid-template-columns:auto auto auto;margin:0 auto;padding:0 1rem}@media (width <= 1441px){.hp-main-placement .placement-container{grid-template-areas:"pong note" "pong no";grid-template-columns:auto max-content;grid-template-rows:auto 2rem}}@media (width <= 769px){.hp-main-placement .placement-container{grid-template-areas:"pong" "note";grid-template-columns:auto;grid-template-rows:auto 2rem}}:is(.hp-main-placement .placement-container) .placement-link{display:flex;grid-area:pong;justify-content:center}:is(:is(.hp-main-placement .placement-container) .placement-link) img{display:block;height:auto;max-width:100%}:is(.hp-main-placement .placement-container) mdn-placement-note{grid-area:note;margin:0 0 auto auto}',
      ''
    ]);
    let c = (0, n.AH)([l.toString()]);
    e.d(t, {}, { A: c });
  },
  44394(a, t, e) {
    e.r(t);
    var n = e(22009),
      o = e(6616),
      r = e(84199);
    (e(47764), e(13755));
    var i = e(51360),
      l = e(43437);
    let MDNPlacementHpMain = class MDNPlacementHpMain extends (0, i.N)(n.WF) {
      static styles = l.A;
      renderComplete(a) {
        let { hpMain: t } = a;
        if (!t) return n.s6;
        let {
          status: e,
          click: i,
          view: l,
          image: c,
          alt: p,
          colors: m,
          version: s
        } = t;
        if ('success' !== e) return n.s6;
        this._viewedUrl || ((this._viewedUrl = l), (this._version = s));
        let { backgroundColor: d, textColor: g } = m || {},
          h = Object.fromEntries(
            [
              ['--hp-main-background', d],
              ['--hp-main-color', g]
            ].filter(([a, t]) => !!t)
          ),
          k = 'hp-main';
        return (0, n.qy)`<div
      ${(0, o.K)(this._placementRef)}
      class="hp-main-placement"
      style=${(0, r.W)(h)}
      data-type=${k}
    >
      <section class="placement-container">
        <a
          class="placement-link"
          data-glean-id=${`pong: pong->click ${k}`}
          href=${this.clickLink(i, s)}
          target="_blank"
          rel="sponsored"
        >
          <img
            src=${this.imgLink(c)}
            aria-hidden=${!p}
            alt=${p || ''}
            width="970"
            height="250"
          />
        </a>
        <mdn-placement-note></mdn-placement-note>
      </section>
    </div>`;
      }
    };
    (customElements.define('mdn-placement-hp-main', MDNPlacementHpMain),
      e.d(t, { MDNPlacementHpMain: () => MDNPlacementHpMain }));
  }
};
//# sourceMappingURL=4759.5c1f42f6042d6457.js.map
