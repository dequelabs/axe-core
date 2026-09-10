export const __rspack_esm_id = 1691;
export const __rspack_esm_ids = [1691];
export const __webpack_modules__ = {
  52055(i, e, s) {
    var r = s(22009),
      t = s(31601),
      n = s.n(t),
      o = s(76314),
      l = s.n(o),
      a = s(67168),
      c = s(4417),
      d = s.n(c),
      m = new s.U(s(3080)),
      h = new s.U(s(96720)),
      g = new s.U(s(22300)),
      u = new s.U(s(11376)),
      p = new s.U(s(21747)),
      f = new s.U(s(53266)),
      b = l()(n());
    b.i(a.A);
    var v = d()(m),
      k = d()(h),
      _ = d()(g),
      w = d()(u),
      x = d()(p),
      y = d()(f);
    b.push([
      i.id,
      `:host{display:block;overflow:hidden}*{box-sizing:border-box}button{appearance:none;background:none;border:none;padding:0}dialog{display:contents}dialog[open]{background-color:#0009;height:90vh;width:90vw}.inner{background-color:#000;border:1px solid #000;container-type:size;flex-direction:column;height:100%}.header,.inner{display:flex;width:100%}.header{align-items:center;background:#000;gap:.25rem;margin:0;min-height:1.75rem;padding:0 .5rem}.header span{color:#fff;font-size:var(--font-size-small);margin-right:auto}.scrim-fullscreen,.scrim-link{background-color:#fff;cursor:pointer;height:1rem;mask-position:center;mask-repeat:no-repeat;mask-size:contain;width:1rem}:is(.scrim-fullscreen,.scrim-link):hover{background-color:var(--curriculum-color)}.enter:is(.scrim-fullscreen,.scrim-link){mask-image:url(${v})}.exit:is(.scrim-fullscreen,.scrim-link){mask-image:url(${k})}.scrim-link:is(.scrim-fullscreen,.scrim-link){mask-image:url(${_});mask-size:75%}.body{flex:1;font-size:4cqmin;position:relative}.background{background-color:#453c78;background-image:url(${w}),url(${x}),url(${y});background-position:1.5em 1.5em,100%,50%;background-repeat:no-repeat;background-size:auto .6em,contain,cover;inset:0;position:absolute}.background h1{bottom:0;color:var(--color-white);font-family:BarlowCondensed-SemiBold,Inter,sans-serif;font-size:3em;font-weight:var(--font-weight-bold);left:0;line-height:var(--font-line-ui);margin:.5em;position:absolute;text-transform:uppercase;text-wrap:balance;width:60%}.background-noise{filter:url(#noise);inset:0;mix-blend-mode:soft-light;position:absolute}.open,iframe{border:none;height:100%;position:absolute;width:100%}.open{--color:#8cb4ffcc;background-image:var(--scrim-img);background-position:50%;background-repeat:no-repeat;background-size:cover;cursor:pointer;font-size:inherit}.open:hover{--color:#8cb4ffe5}.open svg{height:9em;width:auto;stroke-width:2px}:is(.open svg) circle{fill:var(--color)}:is(.open svg) path{fill:#fff}`,
      ''
    ]);
    let $ = (0, r.AH)([b.toString()]);
    s.d(e, {}, { A: $ });
  },
  67168(i, e, s) {
    var r = s(31601),
      t = s.n(r),
      n = s(76314),
      o = s.n(n)()(t());
    o.push([
      i.id,
      '.visually-hidden{border:0!important;clip-path:inset(50%)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}',
      ''
    ]);
    let l = o.toString();
    s.d(e, {}, { A: l });
  },
  53266(i, e, s) {
    i.exports = s.p + 'scrim-bg.27f047d7e991dbe9.png';
  },
  96720(i, e, s) {
    i.exports = s.p + 'cancel.7362f2cdf3515e0d.svg';
  },
  22300(i, e, s) {
    i.exports = s.p + 'external-link.4f3a2dc8e402cae5.svg';
  },
  3080(i, e, s) {
    i.exports = s.p + 'fullscreen-enter.452bcbaed6904ec7.svg';
  },
  21747(i, e, s) {
    i.exports = s.p + 'scrim-hexagons.e59318adb5550050.svg';
  },
  11376(i, e, s) {
    i.exports = s.p + 'scrimba-logo.0c5b5b4efd2b23dc.svg';
  },
  33878(i, e, s) {
    (s.r(e), s.d(e, { MDNScrimInline: () => MDNScrimInline }));
    var r = s(22009),
      t = s(12477),
      n = s(6616),
      o = s(84199),
      l = s(70693),
      a = s(23727),
      c = s(91118);
    let d = (0,
    r.JW)`<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" viewBox="0 0 112 112"><circle cx="55.764" cy="55.764" r="41.823"/><path d="M69.011 57.428a2 2 0 0 0 0-3.328L50.903 42.027c-1.33-.886-3.11.067-3.11 1.664v24.145c0 1.598 1.78 2.55 3.11 1.664z"/></svg>`;
    var m = s(52055);
    let MDNScrimInline = class MDNScrimInline extends (0, l.J)(r.WF) {
      static styles = m.A;
      static ssr = !1;
      static get properties() {
        return {
          url: { type: String },
          img: { type: String },
          scrimTitle: { type: String, attribute: 'scrimtitle' },
          _fullscreen: { state: !0 },
          _scrimLoaded: { state: !0 }
        };
      }
      _bodyRef = (0, n._)();
      constructor() {
        (super(),
          (this.url = void 0),
          (this._fullUrl = void 0),
          (this._scrimId = void 0),
          (this.img = void 0),
          (this._imgStyle = {}),
          (this.scrimTitle = void 0),
          (this._fullscreen = !1),
          (this._scrimLoaded = !1),
          new c.B(this, this._bodyRef, () => {
            this._scrimId &&
              (0, a.w)(`curriculum: scrim view id:${this._scrimId}`);
          }));
      }
      willUpdate(i) {
        if (i.has('url'))
          if (this.url) {
            let i = new URL(this.url);
            (i.searchParams.set('via', 'mdn'),
              i.searchParams.set('embed', ''),
              (this._fullUrl = i.toString()),
              (this._scrimId = i.pathname.slice(1)));
          } else ((this._fullUrl = void 0), (this._scrimId = void 0));
        i.has('img') &&
          (this._imgStyle = this.img
            ? { '--scrim-img': `url(${this.img})` }
            : {});
      }
      render() {
        return this.url && this._fullUrl
          ? (0, r.qy)`
      <dialog @close=${this.#i} style=${(0, o.W)(this._imgStyle)}>
        <div class="inner">
          <div class="header">
            <span
              >${this.l10n('scrim-inline-clicking-will-load-content-from')`Clicking will load content from scrimba.com`}</span
            >
            <button tabindex="0" @click=${this.#e} class="toggle">
              <div
                class="scrim-fullscreen ${this._fullscreen ? 'exit' : 'enter'}"
              ></div>
              <span class="visually-hidden"
                >${this.l10n('scrim-inline-toggle-fullscreen')`Toggle fullscreen`}</span
              >
            </button>
            <a
              href=${this._fullUrl}
              target="_blank"
              rel="origin noreferrer"
              class="external"
              data-glean-id="curriculum: scrim link id:${this._scrimId}"
            >
              <div class="scrim-link"></div>
              <span class="visually-hidden"
                >${this.l10n('scrim-inline-open-on-scrimba')`Open on Scrimba`}</span
              >
            </a>
          </div>
          <div class="body" ${(0, n.K)(this._bodyRef)}>
            ${
              this._scrimLoaded
                ? (0, r.qy)`
                    <iframe
                      src=${this._fullUrl}
                      title=${(0, t.J)(this.scrimTitle)}
                    ></iframe>
                  `
                : (0, r.qy)`
                    ${
                      this.scrimTitle && !this.img
                        ? (0, r.qy)`<div class="background">
                            <div class="background-noise">
                              <svg width="0" height="0">
                                <filter id="noise">
                                  <feTurbulence
                                    type="fractalNoise"
                                    baseFrequency="0.7"
                                    numOctaves="4"
                                  />
                                </filter>
                              </svg>
                            </div>
                            <h1>${this.scrimTitle}</h1>
                          </div>`
                        : null
                    }
                    <button
                      @click=${this.#s}
                      class="open"
                      data-glean-id=${`curriculum: scrim engage id:${this._scrimId}`}
                    >
                      ${d}
                      <span class="visually-hidden">
                        ${this.l10n('scrim-inline-load-scrim-and-open-dialog')`Load scrim and open dialog.`}
                      </span>
                    </button>
                  `
            }
          </div>
        </div>
      </dialog>
    `
          : r.s6;
      }
      #e(i) {
        (i.target instanceof HTMLElement &&
          (i.target.dataset.gleanId = `curriculum: scrim fullscreen -> ${+!this._fullscreen} id:${this._scrimId}`),
          this._fullscreen ? this.#r() : this.#s());
      }
      #s() {
        let i = this.renderRoot.querySelector('dialog');
        i && (i.showModal(), (this._scrimLoaded = !0), (this._fullscreen = !0));
      }
      #r() {
        let i = this.renderRoot.querySelector('dialog');
        i?.close();
      }
      #i() {
        this._fullscreen = !1;
      }
    };
    customElements.define('mdn-scrim-inline', MDNScrimInline);
  },
  91118(i, e, s) {
    var r = s(18376);
    let ViewedController = class ViewedController {
      #t;
      observer = null;
      constructor(i, e, s, r) {
        ((this.#t = i),
          this.#t.addController(this),
          (this.target = e),
          (this.callback = s),
          (this.observerOptions = r));
      }
      hostDisconnected() {
        (this.observer?.disconnect(), (this.observer = null));
      }
      hostUpdated() {
        let i = this.target.value;
        i &&
          !this.observer &&
          ((this.observer = new r.x(i, this.callback, this.observerOptions)),
          this.observer.connect());
      }
    };
    s.d(e, { B: () => ViewedController });
  }
};
//# sourceMappingURL=1691.d6bf21754dc5769c.js.map
