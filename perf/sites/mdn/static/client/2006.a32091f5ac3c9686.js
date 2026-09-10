export const __rspack_esm_id = 2006;
export const __rspack_esm_ids = [2006];
export const __webpack_modules__ = {
  40226(r, e, t) {
    var a = t(22009),
      o = t(31601),
      s = t.n(o),
      i = t(76314),
      d = t.n(i),
      l = t(39807),
      n = t(67168),
      g = d()(s());
    (g.i(l.A),
      g.i(n.A),
      g.push([
        r.id,
        '.grade{background:var(--grade-bg);border:1px solid var(--grade-border);border-radius:.2em;color:var(--grade-border);display:inline-block;font-size:var(--font-size-large);font-weight:var(--font-weight-bold);height:5rem;line-height:5rem;text-align:center;width:5rem}.grade-a{--grade-bg:var(--observatory-grade-a-bg);--grade-border:var(--observatory-grade-a-border)}.grade-b{--grade-bg:var(--observatory-grade-b-bg);--grade-border:var(--observatory-grade-b-border)}.grade-c{--grade-bg:var(--observatory-grade-c-bg);--grade-border:var(--observatory-grade-c-border)}.grade-d{--grade-bg:var(--observatory-grade-d-bg);--grade-border:var(--observatory-grade-d-border)}.grade-f{--grade-bg:var(--observatory-grade-f-bg);--grade-border:var(--observatory-grade-f-border)}.chart{background-color:var(--color-background-primary);border-radius:var(--border-radius)}.tick text{font-family:var(--font-body);font-size:var(--font-size-normal);font-weight:300;fill:var(--color-text-secondary);transform:scale(1)}.tick text.x-labels{text-anchor:middle}.current:is(.tick text.x-labels){fill:var(--grade-border)}.tick text.y-labels{text-anchor:end}.tick line{opacity:.9;--csstools-light-dark-toggle-00eec90e-0:var(--csstools-color-scheme--light) var(--color-gray-40);stroke:var(--csstools-light-dark-toggle-00eec90e-0,var(--color-gray-60));stroke-width:1px;stroke-dasharray:5,5}@supports (color:light-dark(red,red)){.tick line{stroke:light-dark(var(--color-gray-60),var(--color-gray-40))}}.bar{fill:var(--grade-bg);stroke:var(--grade-bg);stroke-width:1}.bar.current-grade{stroke:var(--grade-border)}.you-are-here polyline{filter:drop-shadow(0 0 3px rgb(170 170 170));z-index:9;fill:var(--color-background-primary)}.you-are-here text{font-family:var(--font-body);font-size:var(--font-size-small);font-weight:var(--font-weight-normal);fill:var(--color-text-primary)}',
        ''
      ]));
    let c = (0, a.AH)([g.toString()]);
    t.d(e, {}, { A: c });
  },
  67168(r, e, t) {
    var a = t(31601),
      o = t.n(a),
      s = t(76314),
      i = t.n(s)()(o());
    i.push([
      r.id,
      '.visually-hidden{border:0!important;clip-path:inset(50%)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}',
      ''
    ]);
    let d = i.toString();
    t.d(e, {}, { A: d });
  },
  50117(r, e, t) {
    t.r(e);
    var a = t(36085),
      o = t(22009),
      s = t(22207),
      i = t(29825),
      d = t(40226);
    let MDNObservatoryComparisonTable = class MDNObservatoryComparisonTable
      extends o.WF
    {
      static get properties() {
        return { result: { type: Object } };
      }
      static styles = d.A;
      constructor() {
        (super(), (this.result = null));
      }
      _gradeDistributionTask = new a.YZ(this, {
        task: async () => {
          try {
            let r = new URL(s.Q + '/api/v2/grade_distribution'),
              e = await fetch(r);
            if (!e.ok) {
              let r = `${e.status}: ${e.statusText}`;
              try {
                let t = await e.json();
                t.error && (r = t.message);
              } catch {}
              throw Error(r);
            }
            return await e.json();
          } catch (r) {
            throw (
              console.log(r),
              Error('Observatory API request for comparison data failed', {
                cause: r
              })
            );
          }
        },
        args: () => []
      });
      render() {
        return this.result
          ? this._gradeDistributionTask.render({
              pending: () => (0, o.qy)`<progress></progress>`,
              complete: r =>
                this.result
                  ? (function ({ gradeDistribution: r, result: e }) {
                      let t = 960 / (r.length - 1),
                        a = 100 + t / 2,
                        s = (function (r) {
                          let e = Math.max(...r.map(r => r.count)),
                            t = l(e, !1),
                            a = l(t / 7, !0),
                            o = Math.ceil((Math.ceil(e / a) * a) / a) + 1,
                            s = [];
                          for (let r = 0; r < o; r++) s.push(r * a);
                          return s;
                        })(r),
                        d = 260 / (s.length - 1),
                        n = Math.max(...s),
                        g = r.map(
                          r => (0, o.qy)` <tr>
        <th>
          ${(0, i.c0)(r.grade)}
          ${r.grade === e.scan.grade ? '(Current grade)' : ''}
        </th>
        <td>${r.count} sites</td>
      </tr>`
                        );
                      return (0, o.qy)`
    <table id="grade-svg-a11y-table" class="visually-hidden">
      <caption>
        Number of sites by grade
      </caption>
      <thead>
        <tr>
          <th scope="col">Grade</th>
          <th scope="col">Sites</th>
        </tr>
      </thead>
      <tbody>
        ${g}
      </tbody>
    </table>
    ${(0, o.JW)`
    <svg
      class="chart"
      viewBox="0 0 1200 380"
      aria-labelledby="grade-svg-title"
      aria-describedby="grade-svg-a11y-table"
    >
      <title id="grade-svg-title">Number of sites by grade</title>
      <g class="axes-g"> </g>
        <g
          class="x-axis"
          transform="translate(${a}, ${320})"
        >
          ${r.map(
            (r, a) => (0, o.JW)` <g
              class="tick tick-x"
              transform="${`translate(${a * t}, 0)`}"
            >
              <text
                fill="currentColor"
                y="6"
                dy="1em"
                class="${['x-labels', r.grade === e.scan.grade ? `current grade-${r.grade[0]?.toLowerCase()}` : void 0].filter(Boolean).join(' ')}"
              >
                ${(0, i.c0)(r.grade)}
              </text>
            </g>`
          )}
        </g>
        <g>
          ${r.map((r, s) => {
            let i = 260 * (r.count / n);
            return (0, o.JW)` <rect
              class="bar grade-${r.grade.replace(/[+-]/, '').toLowerCase()} ${r.grade === e.scan.grade ? 'current-grade' : ''}"
              x="${a + s * t - 30}"
              y="${320 - i - 1}"
              rx="4"
              ry="4"
              width="${60}"
              height="${i}"
            ></rect>`;
          })}
        </g>
        <g
          class="y-axis"
          fill="none"
          textAnchor="end"
          transform="translate(${100}, 0)"
        >
          ${s.map(
            (r, e) => (0, o.JW)` <g
              class="tick tick-y"
              transform="translate(0, ${320 - d * e})"
            >
              <line
                stroke="currentColor"
                x2="${1050}"
              ></line>
              <text class="y-labels" fill="currentColor" x="-25" dy="0.32em">
                ${r / 1e3}k
              </text>
            </g>`
          )}
        </g>
      </g>
      <g>
        ${r.map((r, s) => {
          if (r.grade !== e.scan.grade) return [];
          {
            let e = 260 * (r.count / n);
            return (0, o.JW)` <g
              class="you-are-here"
              transform="translate(${a + s * t}, ${320 - e - 50})"
            >
              <polyline
                points="-60,0 60,0 60,36 7,36 0,48 -7,36 -60,36"
              ></polyline>
              <text
                x="0"
                y="0"
                text-anchor="middle"
                transform="translate(0, 24)"
              >
                Current grade
              </text>
            </g>`;
          }
        })}
      </g>
    </svg>
  `}
  `;
                    })({ gradeDistribution: r, result: this.result })
                  : o.s6,
              error: r => (0, o.qy)`<div class="error">${r}</div>`
            })
          : o.s6;
      }
    };
    function l(r, e) {
      let t = Math.floor(Math.log10(r)),
        a = r / Math.pow(10, t);
      return (
        (e
          ? a < 1.5
            ? 1
            : a < 3
              ? 2
              : a < 7
                ? 5
                : 10
          : a <= 1
            ? 1
            : a <= 2
              ? 2
              : a <= 5
                ? 5
                : 10) * Math.pow(10, t)
      );
    }
    (customElements.define(
      'mdn-observatory-comparison-table',
      MDNObservatoryComparisonTable
    ),
      t.d(e, {
        MDNObservatoryComparisonTable: () => MDNObservatoryComparisonTable
      }));
  }
};
//# sourceMappingURL=2006.a32091f5ac3c9686.js.map
