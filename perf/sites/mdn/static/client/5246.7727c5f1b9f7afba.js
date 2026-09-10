export const __rspack_esm_id = 5246;
export const __rspack_esm_ids = [5246];
export const __webpack_modules__ = {
  40050(e, t, r) {
    var i = r(22009),
      o = r(31601),
      n = r.n(o),
      s = r(76314),
      d = r.n(s),
      l = r(39807),
      a = d()(n());
    (a.i(l.A),
      a.push([
        e.id,
        'h2{font-size:var(--font-size-large);font-weight:500}ul{border:1px solid var(--color-border-primary);border-radius:.5rem;list-style:none;overflow:hidden;padding:0}li{border-top:1px solid var(--color-border-primary)}li:first-child{border-top:none}a{color:var(--color-text-primary);display:block;padding:1rem}a:not(:hover){-webkit-text-decoration:none;text-decoration:none}',
        ''
      ]));
    let c = (0, i.AH)([a.toString()]);
    r.d(t, {}, { A: c });
  },
  39807(e, t, r) {
    var i = r(31601),
      o = r.n(i),
      n = r(76314),
      s = r.n(n)()(o());
    s.push([
      e.id,
      '*,:after,:before{box-sizing:border-box}button,input,select,textarea{font:inherit}button{color:inherit;cursor:pointer}img{height:auto;max-width:100%}a{color:var(--color-link-normal)}[hidden]{display:none!important}#content{scroll-margin-block-start:var(--sticky-header-height)}',
      ''
    ]);
    let d = s.toString();
    r.d(t, {}, { A: d });
  },
  95821(e, t, r) {
    r.r(t);
    var i = r(22009),
      o = r(70693),
      n = r(40050),
      s = r(93649);
    let MDNRecentlyVisited = class MDNRecentlyVisited extends (0, o.J)(i.WF) {
      static ssr = !1;
      static styles = n.A;
      constructor() {
        (super(), (this._pages = new s.B()));
      }
      render() {
        return (0, i.qy)`<h2>
        ${this.l10n('recently-visited-recently-visited')`Recently visited`}
      </h2>
      <ul>
        ${this._pages.map(({ path: e, title: t }) => (0, i.qy)`<li><a href=${e}>${t}</a></li>`)}
      </ul>`;
      }
    };
    (customElements.define('mdn-recently-visited', MDNRecentlyVisited),
      r.d(t, { MDNRecentlyVisited: () => MDNRecentlyVisited }));
  }
};
//# sourceMappingURL=5246.7727c5f1b9f7afba.js.map
