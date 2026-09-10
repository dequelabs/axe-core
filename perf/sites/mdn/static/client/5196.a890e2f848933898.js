export const __rspack_esm_id = 5196;
export const __rspack_esm_ids = [5196];
export const __webpack_modules__ = {
  58621(e, t, s) {
    var r = s(22009),
      i = s(31601),
      a = s.n(i),
      _ = s(76314),
      n = s.n(_),
      o = s(2128),
      u = s(4417),
      h = s.n(u),
      c = new s.U(s(76903)),
      d = n()(a());
    d.i(o.A);
    var l = h()(c);
    d.push([
      e.id,
      `:host{display:block}.survey{background-color:var(--color-background-purple);border-radius:.5rem;display:grid;padding:1rem 1rem 1rem 5rem;row-gap:.75rem}header{align-items:center;display:flex;justify-content:space-between}header:before{background:url(${l});background-size:cover;content:"";height:49px;margin-left:calc(-53px - .5rem);margin-top:1rem;position:absolute;width:53px}p{margin:0}mdn-button::part(button):hover{background-color:initial;border:1px solid var(--color-text-purple)}mdn-button::part(icon){color:var(--color-text-purple)}summary{cursor:pointer}a,summary{color:var(--color-text-purple)}a:hover{-webkit-text-decoration:none;text-decoration:none}iframe{border:none;border-radius:.5rem;height:500px;overflow:hidden;width:100%}footer{font-size:var(--font-size-small);font-style:italic}`,
      ''
    ]);
    let v = (0, r.AH)([d.toString()]);
    s.d(t, {}, { A: v });
  },
  76903(e, t, s) {
    e.exports = s.p + 'survey.f09bea45fd2aabc9.svg';
  },
  10423(e, t, s) {
    (s.r(t), s.d(t, { MDNSurvey: () => MDNSurvey }));
    var r = s(22009),
      i = s(12477),
      a = s(6616);
    s(35268);
    var _ = s(70693),
      n = s(23727),
      o = s(10336),
      u = s(58621);
    let h = Object.freeze({
        BLOG_FEEDBACK_2023: 'BLOG_FEEDBACK_2023',
        BROWSER_SURVEY_OCT_2022: 'BROWSER_SURVEY_OCT_2022',
        CONTENT_DISCOVERY_2023: 'CONTENT_DISCOVERY_2023',
        CSS_CASCADE_2022: 'CSS_CASCADE_2022',
        DE_LOCALE_2024: 'DE_LOCALE_2024',
        DE_LOCALE_2024_EVAL: 'DE_LOCALE_2024_EVAL',
        FIREFOX_WEB_COMPAT_2023: 'FIREFOX_WEB_COMPAT_2023',
        INTEROP_2023: 'INTEROP_2023',
        IT_LOCALE_2025: 'IT_LOCALE_2025',
        WEB_COMPONENTS_2023: 'WEB_COMPONENTS_2023',
        DISCOVERABILITY_2023: 'DISCOVERABILITY_2023',
        WEB_SECURITY_2023: 'WEB_SECURITY_2023',
        DISCOVERABILITY_AUG_2023: 'DISCOVERABILITY_AUG_2023',
        WEB_APP_AUGUST_2024: 'WEB_APP_AUGUST_2024',
        HOMEPAGE_FEEDBACK_2024: 'HOMEPAGE_FEEDBACK_2024',
        WEBDX_EDITING_2024: 'WEBDX_EDITING_2024',
        HOUSE_SURVEY_2025: 'HOUSE_SURVEY_2025',
        JS_PROPOSALS_2025: 'JS_PROPOSALS_2025',
        FIRST_FRED_2025: 'FIRST_FRED_2025',
        DEVELOPER_SURVEY_2025: 'DEVELOPER_SURVEY_2025',
        BASELINE_A11Y_2026: 'BASELINE_A11Y_2026',
        CANVAS_2026: 'CANVAS_2026'
      }),
      c = [
        {
          key: h.CANVAS_2026,
          bucket: h.CANVAS_2026,
          show: e => /^\/en-US\/docs\/Web\/API/.test(e),
          src: e => {
            let t = new URL(
              'https://survey.alchemer.com/s3/8586037/MDN-Canvas-API'
            );
            return (t.searchParams.set('referrer', e), t.toString());
          },
          teaser:
            'We’re running a survey to better understand use of the Canvas API.',
          question:
            'We’d love for you to take 2 minutes to share your feedback.',
          link: !0,
          rateFrom: 0,
          rateTill: 0.1,
          start: Date.parse('2026-06-08'),
          end: Date.parse('2026-06-15')
        }
      ];
    function d(e) {
      let t,
        s = `survey.${e}`;
      try {
        t = JSON.parse(localStorage?.getItem(s) ?? '{}');
      } catch {
        t = {};
      }
      return (
        0 === Object.keys(t).length &&
          l(
            e,
            (t = {
              random: Math.random(),
              seen_at: null,
              dismissed_at: null,
              submitted_at: null,
              opened_at: null
            })
          ),
        t
      );
    }
    function l(e, t) {
      let s = `survey.${e}`;
      try {
        localStorage?.setItem(s, JSON.stringify(t));
      } catch {}
    }
    let MDNSurvey = class MDNSurvey extends (0, _.J)(r.WF) {
      static styles = u.A;
      static ssr = !1;
      constructor() {
        (super(),
          (this._survey = void 0),
          (this._surveyState = void 0),
          (this._isOpen = !1),
          (this._force = !1),
          (this._source = void 0),
          (this._detailsRef = (0, a._)()));
      }
      connectedCallback() {
        (super.connectedCallback(), this.#e(), this.#t());
      }
      disconnectedCallback() {
        (super.disconnectedCallback(), this.#s());
      }
      #e() {
        ((this._survey = this.#r()),
          this._survey &&
            ((this._surveyState = d(this._survey.bucket)),
            (this._source =
              'function' == typeof this._survey.src
                ? this._survey.src(location.pathname)
                : this._survey.src),
            this.#i()));
      }
      #r() {
        let e = new URLSearchParams(location.search).get('force_survey');
        return (
          (this._force = null !== e),
          c.find(t => {
            if (this._force) return !e || t.key === e;
            if (!t.show(location.pathname)) return !1;
            let s = Date.now();
            if (s < t.start || t.end < s) return !1;
            let r = d(t.bucket);
            return r.random >= t.rateFrom && r.random < t.rateTill;
          })
        );
      }
      #i() {
        this._survey &&
          this._surveyState &&
          !this._surveyState.seen_at &&
          ((this._surveyState = { ...this._surveyState, seen_at: Date.now() }),
          l(this._survey.bucket, this._surveyState),
          this.#a('seen'));
      }
      #_() {
        this._survey &&
          this._surveyState &&
          ((this._surveyState = {
            ...this._surveyState,
            dismissed_at: Date.now()
          }),
          l(this._survey.bucket, this._surveyState),
          this.#a('dismissed'),
          this.requestUpdate());
      }
      #n() {
        this.#o();
      }
      #u() {
        if (!this._survey || !this._surveyState || this._isOpen) return;
        let e = this._detailsRef.value;
        e && e.open && (this.#o(), (this._isOpen = !0), this.requestUpdate());
      }
      #o() {
        this._survey &&
          this._surveyState &&
          ((this._surveyState = {
            ...this._surveyState,
            opened_at: Date.now()
          }),
          l(this._survey.bucket, this._surveyState),
          this.#a('opened'));
      }
      #h() {
        this._survey &&
          this._surveyState &&
          ((this._surveyState = {
            ...this._surveyState,
            submitted_at: Date.now()
          }),
          l(this._survey.bucket, this._surveyState),
          this.#a('submitted'),
          this.requestUpdate());
      }
      #a(e) {
        this._survey && (0, n.w)(`survey: ${e} ${this._survey.bucket}`);
      }
      #t() {
        ((this._messageListener = e => {
          'https://survey.alchemer.com' === e.origin &&
            'submit' === e.data &&
            this.#h();
        }),
          window.addEventListener('message', this._messageListener, !1));
      }
      #s() {
        this._messageListener &&
          window.removeEventListener('message', this._messageListener, !1);
      }
      render() {
        if (
          !this._survey ||
          !this._surveyState ||
          (!this._force &&
            (this._surveyState.dismissed_at || this._surveyState?.submitted_at))
        )
          return r.s6;
        let e = this.l10n('survey-hide-this-survey')`Hide this survey`;
        return (0, r.qy)`
      <div class="survey">
        <header>
          <p>${this._survey.teaser}</p>
          <mdn-button
            variant="plain"
            .icon=${o.A}
            icon-only
            title=${e}
            aria-label=${e}
            @click=${this.#_}
          ></mdn-button>
        </header>
        ${
          this._survey.link
            ? (0, r.qy)`<a
                class="external"
                href=${this._source}
                target="_blank"
                title=${this.l10n('survey-take-survey-opens-in-a-new-tab')`Take survey (Opens in a new tab)`}
                @click=${this.#n}
                >${this._survey.question}</a
              >`
            : (0,
              r.qy)`<details ${(0, a.K)(this._detailsRef)} @toggle=${this.#u}>
                <summary>${this._survey.question}</summary>
                ${
                  this._isOpen && this._source
                    ? (0, r.qy)`
                        <iframe
                          title=${(0, i.J)(this._survey.question)}
                          src=${this._source}
                        ></iframe>
                      `
                    : r.s6
                }
              </details>`
        }
        ${this._survey.footnote ? (0, r.qy)` <footer>(${this._survey.footnote})</footer> ` : r.s6}
      </div>
    `;
      }
    };
    customElements.define('mdn-survey', MDNSurvey);
  }
};
//# sourceMappingURL=5196.a890e2f848933898.js.map
