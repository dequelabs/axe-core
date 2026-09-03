export const __rspack_esm_id = 4366;
export const __rspack_esm_ids = [4366];
export const __webpack_modules__ = {
  11932(t, e, i) {
    var s = i(22009),
      a = i(31601),
      r = i.n(a),
      n = i(76314),
      o = i.n(n)()(r());
    o.push([
      t.id,
      'div{align-items:center;display:flex;height:100%;padding-inline:.5em}',
      ''
    ]);
    let l = (0, s.AH)([o.toString()]);
    i.d(e, {}, { A: l });
  },
  14925(t, e, i) {
    i.r(e);
    var s = i(22009),
      a = i(70693),
      r = i(11932);
    let MDNWriterReload = class MDNWriterReload extends (0, a.J)(s.WF) {
      static ssr = !1;
      static styles = r.A;
      constructor() {
        (super(), (this._state = ''), (this._comparisons = 0));
      }
      get _interval() {
        return Number(sessionStorage.getItem('writer-reload-interval') || 1e3);
      }
      set _interval(t) {
        (sessionStorage.setItem('writer-reload-interval', t.toString()),
          this._reloading || this.requestUpdate());
      }
      connectedCallback() {
        (super.connectedCallback(), this._pollForChanges());
      }
      render() {
        let t = this._interval / 1e3;
        return (0, s.qy)`<div>
      ${this.l10n.raw({ id: 'writer-reload-polling', args: { seconds: t } })}
    </div>`;
      }
      async _reloadIfChanged() {
        let t = new URL(
            'index.json',
            new URL(location.pathname + '/', location.origin)
          ),
          e = await fetch(t);
        if (e.ok) {
          let t = await e.text();
          this._state
            ? (this._comparisons++,
              this._state !== t
                ? (this._comparisons <= 1 &&
                    (this._interval = 2 * this._interval),
                  location.reload(),
                  (this._reloading = !0))
                : (this._interval =
                    this._interval <= 2e3 ? 1e3 : this._interval / 2))
            : (this._state = t);
        } else
          console.error('Failed to fetch document', e.status, e.statusText);
      }
      async _pollForChanges() {
        for (; !this._reloading;)
          ('visible' === document.visibilityState &&
            (await this._reloadIfChanged()),
            await n(this._interval));
      }
    };
    async function n(t) {
      return new Promise(e => setTimeout(e, t));
    }
    (customElements.define('mdn-writer-reload', MDNWriterReload),
      i.d(e, { default: () => MDNWriterReload }));
  }
};
//# sourceMappingURL=4366.c631051400430846.js.map
