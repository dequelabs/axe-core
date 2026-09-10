/*! LICENSE: 8401.adf96abc27ac7387.js.LICENSE.txt */
export const __rspack_esm_id = 8401;
export const __rspack_esm_ids = [8401];
export const __webpack_modules__ = {
  78458(e, t, i) {
    var l = i(22009),
      s = i(31601),
      n = i.n(s),
      r = i(76314),
      a = i.n(r),
      c = i(39807),
      o = i(10576),
      d = a()(n());
    (d.i(c.A),
      d.i(o.A),
      d.push([
        e.id,
        '.code-example .example-header{justify-content:end;padding-right:.5rem}@media print{.example-header,mdn-button{display:none!important}}',
        ''
      ]));
    let h = (0, l.AH)([d.toString()]);
    i.d(t, {}, { A: h });
  },
  47849(e, t, i) {
    i.r(t);
    var l = i(22009),
      s = i(84199),
      n = i(70693),
      r = i(78458);
    (i(63657), i(35268));
    let MDNLiveSampleResult = class MDNLiveSampleResult extends (0, n.J)(l.WF) {
      static styles = r.A;
      static get properties() {
        return {
          liveId: { attribute: 'live-id' },
          code: { type: Object },
          allowed: {},
          sandbox: {},
          srcPrefix: { attribute: 'src-prefix' },
          height: {},
          breakoutLink: { state: !0 }
        };
      }
      constructor() {
        (super(),
          (this.liveId = void 0),
          (this.code = void 0),
          (this.allow = void 0),
          (this.sandbox = void 0),
          (this.srcPrefix = void 0),
          (this.height = void 0),
          (this.breakoutLink = void 0));
      }
      _openFullscreen(e = !1) {
        this._runnerSrc
          ? e || this._fullscreenReplace
            ? location.replace(this._runnerSrc)
            : (location.href = this._runnerSrc)
          : ((this._fullscreenPending = !0),
            e && (this._fullscreenReplace = !0));
      }
      _fullscreenClick(e) {
        this.liveId &&
          e.target instanceof HTMLAnchorElement &&
          e.target.hash === `#livesample_fullscreen=${this.liveId}` &&
          (e.preventDefault(), this._openFullscreen());
      }
      _runnerSrcUpdated({ detail: e }) {
        ((this._runnerSrc = e),
          this._fullscreenPending && this._openFullscreen());
        let t = new URL(
          `/${document.documentElement.lang}/play`,
          location.href
        );
        ((t.search = new URL(this._runnerSrc).search),
          this.srcPrefix && t.searchParams.append('srcPrefix', this.srcPrefix),
          (this.breakoutLink = t.href));
      }
      connectedCallback() {
        (super.connectedCallback(),
          (this._fullscreenClick = this._fullscreenClick.bind(this)),
          document.addEventListener('click', this._fullscreenClick),
          location.hash === `#livesample_fullscreen=${this.liveId}` &&
            this._openFullscreen());
      }
      render() {
        return (0, l.qy)`
      <div class="code-example">
        <div class="example-header">
          ${
            this.breakoutLink
              ? (0, l.qy)`<mdn-button
                  variant="secondary"
                  href=${this.breakoutLink}
                  target="_blank"
                  rel="opener"
                  aria-label=${this.l10n('example-play-button-title')}
                  title=${this.l10n('example-play-button-title')}
                  >${this.l10n('example-play-button-label')}</mdn-button
                >`
              : l.s6
          }
        </div>
        <mdn-play-runner
          @mdn-play-runner-src=${this._runnerSrcUpdated}
          .code=${this.code}
          .allow=${this.allow}
          .sandbox=${[...new Set(['allow-modals', 'allow-downloads', 'allow-fullscreen', 'allow-orientation-lock', ...(this.sandbox?.split(' ') || [])])].join(' ')}
          .srcPrefix=${this.srcPrefix}
          permalink
          style=${(0, s.W)({ height: this.height ? `${this.height}${/[0-9]$/.test(this.height) ? 'px' : ''}` : void 0 })}
        ></mdn-play-runner>
      </div>
    `;
      }
      disconnectedCallback() {
        (super.disconnectedCallback(),
          document.removeEventListener('click', this._fullscreenClick));
      }
    };
    (customElements.define('mdn-live-sample-result', MDNLiveSampleResult),
      i.d(t, { MDNLiveSampleResult: () => MDNLiveSampleResult }));
  },
  97072(e, t, i) {
    i.d(t, { D: () => r });
    var l = i(36752),
      s = i(7804),
      n = i(18504);
    let r = (0, s.u$)(
      class extends s.WL {
        constructor() {
          (super(...arguments), (this.key = l.s6));
        }
        render(e, t) {
          return ((this.key = e), t);
        }
        update(e, [t, i]) {
          return (t !== this.key && ((0, n.mY)(e), (this.key = t)), i);
        }
      }
    );
  }
};
//# sourceMappingURL=8401.adf96abc27ac7387.js.map
