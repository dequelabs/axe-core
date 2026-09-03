export const __rspack_esm_id = 3676;
export const __rspack_esm_ids = [3676];
export const __webpack_modules__ = {
  14942(e, s, t) {
    var r = t(22009),
      i = t(31601),
      a = t.n(i),
      n = t(76314),
      h = t.n(n),
      c = t(39807),
      d = h()(a());
    (d.i(c.A), d.push([e.id, '', '']));
    let o = (0, r.AH)([d.toString()]);
    t.d(s, {}, { A: o });
  },
  1879(e, s, t) {
    t.r(s);
    var r = t(36085),
      i = t(22009),
      a = t(29825),
      n = t(14942);
    let MDNObservatoryHeaderLink = class MDNObservatoryHeaderLink extends i.WF {
      static styles = n.A;
      static get properties() {
        return {
          header: { type: String },
          _headerExists: { type: Boolean, state: !0 },
          _isChecking: { type: Boolean, state: !0 },
          _hasChecked: { type: Boolean, state: !0 }
        };
      }
      constructor() {
        (super(),
          (this.header = ''),
          (this._headerExists = !1),
          (this._isChecking = !1),
          (this._hasChecked = !1));
      }
      _checkHeaderTask = new r.YZ(this, {
        task: async ([e]) => {
          if (!e) return { exists: !1 };
          let s = (0, a.pM)(e),
            t = `/en-US/docs/Web/HTTP/Reference/Headers/${encodeURIComponent(s)}`;
          try {
            return {
              exists: (await fetch(`${t}/index.json`, { method: 'HEAD' })).ok,
              displayHeaderName: s,
              headerPath: t
            };
          } catch {
            return { exists: !1, displayHeaderName: s, headerPath: t };
          }
        },
        args: () => [this.header],
        onComplete: e => {
          ((this._headerExists = e.exists),
            (this._isChecking = !1),
            (this._hasChecked = !0));
        },
        onError: () => {
          ((this._headerExists = !1),
            (this._isChecking = !1),
            (this._hasChecked = !0));
        }
      });
      connectedCallback() {
        (super.connectedCallback(),
          this.header &&
            !this._hasChecked &&
            ((this._isChecking = !0), this._checkHeaderTask.run()));
      }
      render() {
        let e = (0, a.pM)(this.header || '');
        if (this._isChecking || !this._hasChecked) return (0, i.qy)`${e}`;
        if (this._headerExists) {
          let s = `/en-US/docs/Web/HTTP/Reference/Headers/${encodeURIComponent(e)}`;
          return (0, i.qy)`
        <a href=${s} target="_blank" rel="noreferrer">
          ${e}
        </a>
      `;
        }
        return (0, i.qy)`${e}`;
      }
    };
    (customElements.define(
      'mdn-observatory-header-link',
      MDNObservatoryHeaderLink
    ),
      t.d(s, { MDNObservatoryHeaderLink: () => MDNObservatoryHeaderLink }));
  }
};
//# sourceMappingURL=3676.d8f8c8fb42a7d272.js.map
