export const __rspack_esm_id = 4204;
export const __rspack_esm_ids = [4204];
export const __webpack_modules__ = {
  19912(t, e, s) {
    var r = s(22009),
      i = s(31601),
      a = s.n(i),
      o = s(76314),
      n = s.n(o)()(a());
    n.push([
      t.id,
      ':host{display:block;margin-left:auto;margin-right:auto;margin-top:1rem;max-width:var(--max-width);padding-left:var(--gutter);padding-right:var(--gutter);width:100%}table{background:var(--community-card-bg);border:1px solid var(--community-table-border);border-collapse:initial;border-radius:.5rem;border-spacing:0;color:var(--community-text-primary);width:100%}td,th{border:none;padding:1.5rem}@media (width <= 769px){:is(th,td):last-of-type{display:none}}th{background:none;font-size:var(--font-size-large);font-weight:var(--font-weight-bold);text-align:left}@media (width <= 769px){th{display:none}}tbody tr:nth-child(odd){background:var(--community-table-row)}td>div{align-items:baseline;display:flex;flex-wrap:wrap;gap:1rem 1.5rem}a{color:var(--color-link-normal)}a:visited{color:var(--color-link-visited)}.label{background:var(--community-label-bg);border-radius:.25rem;color:var(--community-text-success);font-weight:500;padding:.5rem 1rem}',
      ''
    ]);
    let l = (0, r.AH)([n.toString()]);
    s.d(e, {}, { A: l });
  },
  37511(t, e, s) {
    s.r(e);
    var r = s(22009),
      i = s(70693),
      a = s(19912);
    let MDNIssuesTable = class MDNIssuesTable extends (0, i.J)(r.WF) {
      static styles = a.A;
      static get properties() {
        return {
          _issues: { state: !0 },
          _isLoading: { state: !0 },
          _error: { state: !0 }
        };
      }
      constructor() {
        (super(),
          (this._issues = []),
          (this._isLoading = !0),
          (this._error = null),
          (this.LABELS = ['good first issue', 'accepting PR']));
      }
      connectedCallback() {
        (super.connectedCallback(), this._fetchIssues());
      }
      async _fetchIssues() {
        ((this._isLoading = !0), (this._error = null));
        let t = new URL('https://api.github.com/search/issues');
        (t.searchParams.append('per_page', '5'),
          t.searchParams.append(
            'q',
            'is:open is:issue repo:mdn/content repo:mdn/translated-content repo:mdn/yari label:"good first issue","accepting PR" sort:created-desc no:assignee is:public'
          ));
        try {
          let e = await fetch(t.toString());
          if (!e.ok)
            throw Error(`GitHub API Error: ${e.status} ${e.statusText}`);
          let s = await e.json();
          this._issues = s.items;
        } catch (t) {
          (console.error('Failed to fetch GitHub issues:', t),
            (this._error = t.toString()),
            (this._issues = []));
        } finally {
          this._isLoading = !1;
        }
      }
      render() {
        return this._isLoading
          ? (0,
            r.qy)`${this.l10n('issues-table-loading-issues')`loading issues…`}`
          : this._error
            ? (0, r.qy)`${this._error}`
            : 0 === this._issues.length
              ? r.s6
              : (0, r.qy)`
      <table>
        <thead>
          <tr>
            <th>${this.l10n('issues-table-title')`Title`}</th>
            <th>${this.l10n('issues-table-repository')`Repository`}</th>
          </tr>
        </thead>
        <tbody>
          ${this._issues.map(
            t => (0, r.qy)`
              <tr>
                <td>
                  <div>
                    <a href=${t.html_url} target="_blank" rel="noreferrer">
                      ${t.title}
                    </a>
                    ${t.labels.map(t => {
                      let e = 'object' == typeof t && null !== t ? t.name : t;
                      return this.LABELS.includes(e)
                        ? (0, r.qy)`<span class="label">${e}</span>`
                        : null;
                    })}
                  </div>
                </td>
                <td>
                  <a
                    href=${t.repository_url.replace('https://api.github.com/repos/', 'https://github.com/')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ${t.repository_url.replace('https://api.github.com/repos/', '')}
                  </a>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
      }
    };
    (customElements.define('mdn-issues-table', MDNIssuesTable),
      s.d(e, { MDNIssuesTable: () => MDNIssuesTable }));
  }
};
//# sourceMappingURL=4204.a3e7518b4323c4c3.js.map
