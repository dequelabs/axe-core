export const __rspack_esm_id = 251;
export const __rspack_esm_ids = [251];
export const __webpack_modules__ = {
  61109(t, e, a) {
    var r = a(22009),
      o = a(31601),
      i = a.n(o),
      s = a(76314),
      n = a.n(s),
      l = a(39807),
      c = n()(i());
    (c.i(l.A), c.push([t.id, '', '']));
    let p = (0, r.AH)([c.toString()]);
    a.d(e, {}, { A: p });
  },
  39807(t, e, a) {
    var r = a(31601),
      o = a.n(r),
      i = a(76314),
      s = a.n(i)()(o());
    s.push([
      t.id,
      '*,:after,:before{box-sizing:border-box}button,input,select,textarea{font:inherit}button{color:inherit;cursor:pointer}img{height:auto;max-width:100%}a{color:var(--color-link-normal)}[hidden]{display:none!important}#content{scroll-margin-block-start:var(--sticky-header-height)}',
      ''
    ]);
    let n = s.toString();
    a.d(e, {}, { A: n });
  },
  96678(t, e, a) {
    a.r(e);
    var r = a(36085),
      o = a(22009),
      i = a(76722);
    a(7086);
    var s = a(70693),
      n = a(12520),
      l = a(34156),
      c = a(61109);
    let MDNCompatTableLazy = class MDNCompatTableLazy extends (0, s.J)(o.WF) {
      static styles = c.A;
      static get properties() {
        return { query: {}, locale: {} };
      }
      constructor() {
        (super(), (this.query = ''), (this.locale = 'en-US'));
      }
      connectedCallback() {
        super.connectedCallback();
      }
      get _issueUrl() {
        let t = new URLSearchParams(),
          e = n.N.replaceAll('$DATE', new Date().toISOString())
            .replaceAll('$QUERY_ID', this.query)
            .trim();
        return (
          t.set(
            'mdn-url',
            `https://developer.mozilla.org${globalThis.location.pathname}`
          ),
          t.set('metadata', e),
          t.set('title', `${this.query} - Missing compatibility data`),
          t.set('template', 'data-problem.yml'),
          `https://github.com/mdn/browser-compat-data/issues/new?${t.toString()}`
        );
      }
      get _issueLink() {
        let t = t => {
          (t.preventDefault(),
            window.open(this._issueUrl, '_blank', 'noopener,noreferrer'));
        };
        return (0, o.qy)`<a
      class="bc-github-link external external-icon"
      href="#"
      @click=${t}
      target="_blank"
      rel="noopener noreferrer"
      title=${this.l10n('compat-link-report-missing-title')`Report missing compatibility data`}
      >${this.l10n('compat-link-report-missing')`Report this issue`}</a
    >`;
      }
      _dataTask = new r.YZ(this, {
        args: () => [this.query],
        task: async ([t], { signal: e }) => {
          let a = await fetch((0, l.D)(t), { signal: e });
          if (!a.ok) {
            if (
              (console.error('Failed to fetch BCD data:', a), 404 === a.status)
            )
              throw (0, o.qy)`No compatibility data found for <code>${t}</code>.
            (${this._issueLink})`;
            throw (0, o.qy)`Got HTTP ${a.status} when fetching browser
          compatibility data for <code>${t}</code>`;
          }
          return a.json();
        }
      });
      render() {
        let t = (0, i._)(
          `<noscript>${this.l10n('compat-js-required')`Enable JavaScript to view this browser compatibility table.`}</noscript>`
        );
        return this._dataTask.render({
          initial: () => (0, o.qy)`<p>${t}</p>`,
          pending: () =>
            (0, o.qy)`<p>${this.l10n('compat-loading')`Loading…`}</p>`,
          complete: t =>
            t
              ? (0, o.qy)`<mdn-compat-table
                query=${this.query}
                locale=${this.locale}
                .data=${t.data}
                .browserInfo=${t.browsers}
              ></mdn-compat-table>`
              : (0, o.qy)`<p>No compatibility data found</p>`,
          error: t => (0, o.qy)`<p>${t}</p>`
        });
      }
    };
    (customElements.define('mdn-compat-table-lazy', MDNCompatTableLazy),
      a.d(e, { MDNCompatTableLazy: () => MDNCompatTableLazy }));
  }
};
//# sourceMappingURL=251.c7f932cc631e0f14.js.map
