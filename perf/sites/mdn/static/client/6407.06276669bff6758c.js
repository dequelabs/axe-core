export const __rspack_esm_id = 6407;
export const __rspack_esm_ids = [6407];
export const __webpack_modules__ = {
  60283(t, r, e) {
    var o = e(22009),
      s = e(31601),
      a = e.n(s),
      n = e(76314),
      i = e.n(n),
      d = e(39807),
      c = i()(a());
    (c.i(d.A),
      c.push([
        t.id,
        ':host{display:block}.error{background-color:var(--error-bg,#fee);border-radius:.25rem;color:var(--error-color,#d33);margin:1rem 0;padding:1rem}section{margin-bottom:3rem}h3{font-size:var(--font-size-large);font-weight:var(--font-weight-normal);line-height:var(--font-line-content);margin-bottom:1rem;margin-top:2rem}.table-container{margin:1rem 0;overflow-x:auto}table{border-collapse:collapse;min-width:600px;width:100%}td,th{border:1px solid var(--color-border-primary);padding:.5rem .75rem;text-align:left}th{background-color:var(--color-background-secondary,#f5f5f5);font-weight:700}th[align=center]{text-align:center}tr:nth-child(2n){background-color:var(--color-background-secondary)}td:last-child{text-align:center}',
        ''
      ]));
    let l = (0, o.AH)([c.toString()]);
    e.d(r, {}, { A: l });
  },
  39807(t, r, e) {
    var o = e(31601),
      s = e.n(o),
      a = e(76314),
      n = e.n(a)()(s());
    n.push([
      t.id,
      '*,:after,:before{box-sizing:border-box}button,input,select,textarea{font:inherit}button{color:inherit;cursor:pointer}img{height:auto;max-width:100%}a{color:var(--color-link-normal)}[hidden]{display:none!important}#content{scroll-margin-block-start:var(--sticky-header-height)}',
      ''
    ]);
    let i = n.toString();
    e.d(r, {}, { A: i });
  },
  56538(t, r, e) {
    e.r(r);
    var o = e(36085),
      s = e(22009),
      a = e(76722),
      n = e(70693),
      i = e(22207),
      d = e(60283);
    let MDNObservatoryTestsAndScores = class MDNObservatoryTestsAndScores extends (0,
    n.J)(s.WF) {
      static styles = d.A;
      static ssr = !1;
      _fetchMatrixTask = new o.YZ(this, {
        task: async () => {
          let t = await fetch(`${i.Q}/api/v2/recommendation_matrix`);
          return t.ok
            ? (await t.json()).map(t => ({
                ...t,
                results: t.results.map(t => ({
                  ...t,
                  description_html: t.description
                }))
              }))
            : [];
        },
        args: () => []
      });
      render() {
        return this._fetchMatrixTask.render({
          pending: () => (0, s.qy)`<div class="loading">
          ${this.l10n('observatory-tests-and-scores-loading-tests-and-scoring-data')`Loading tests and scoring data...`}
        </div>`,
          complete: t =>
            t.map(
              t => (0, s.qy)`
            <section>
              <h3 id=${t.name}>${t.title}</h3>
              <p>
                ${this.l10n('observatory-tests-and-scores-see')`See`}
                <a href=${t.mdnLink}>${t.title}</a>
                ${this.l10n('observatory-tests-and-scores-for-guidance')`for guidance.`}
              </p>
              <figure class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>
                        ${this.l10n('observatory-tests-and-scores-test-result')`Test result`}
                      </th>
                      <th>
                        ${this.l10n('observatory-tests-and-scores-description')`Description`}
                      </th>
                      <th align="center">
                        ${this.l10n('observatory-tests-and-scores-modifier')`Modifier`}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    ${t.results.map(
                      t => (0, s.qy)`
                        <tr>
                          <td>${t.name}</td>
                          <td>${(0, a._)(t.description_html)}</td>
                          <td>${t.scoreModifier}</td>
                        </tr>
                      `
                    )}
                  </tbody>
                </table>
              </figure>
            </section>
          `
            ),
          error: t => (0, s.qy)`
        <div class="error">
          ${this.l10n('observatory-tests-and-scores-failed-to-load-tests-and-scoring')`Failed to load tests and scoring data. Please try again later.`}
          ${console.error('Observatory matrix fetch error:', t)}
        </div>
      `
        });
      }
    };
    (customElements.define(
      'mdn-observatory-tests-and-scores',
      MDNObservatoryTestsAndScores
    ),
      e.d(r, {
        MDNObservatoryTestsAndScores: () => MDNObservatoryTestsAndScores
      }));
  }
};
//# sourceMappingURL=6407.06276669bff6758c.js.map
