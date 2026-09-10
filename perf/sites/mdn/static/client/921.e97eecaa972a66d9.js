export const __rspack_esm_id = 921;
export const __rspack_esm_ids = [921];
export const __webpack_modules__ = {
  43959(t, e, n) {
    var r = n(22009),
      a = n(31601),
      i = n.n(a),
      s = n(76314),
      o = n.n(s),
      c = n(39807),
      l = o()(i());
    (l.i(c.A), l.push([t.id, '', '']));
    let m = (0, r.AH)([l.toString()]);
    n.d(e, {}, { A: m });
  },
  14416(t, e, n) {
    n.r(e);
    var r = n(22009);
    n(35268);
    var a = n(70693),
      i = n(43959);
    let MDNObservatoryRescanButton = class MDNObservatoryRescanButton extends (0,
    a.J)(r.WF) {
      static styles = i.A;
      static get properties() {
        return {
          from: { type: Object },
          duration: { type: Number },
          _remainingTime: { state: !0 }
        };
      }
      constructor() {
        (super(),
          (this.from = new Date()),
          (this.duration = 60),
          (this._remainingTime = 0),
          (this._interval = null));
      }
      connectedCallback() {
        (super.connectedCallback(),
          (this._remainingTime = this._calculateRemainingTime()),
          (this._interval = setInterval(() => {
            this._remainingTime = this._calculateRemainingTime();
          }, 1e3)));
      }
      disconnectedCallback() {
        (super.disconnectedCallback(),
          this._interval &&
            (clearInterval(this._interval), (this._interval = null)));
      }
      _calculateRemainingTime() {
        return Math.max(
          0,
          this.from.getTime() + 1e3 * this.duration - Date.now()
        );
      }
      _icon(t) {
        return (0, r.qy)`<span
      class="progress"
      style="  display: inline-block; width: 0.9rem; height: 0.9rem; border-radius: 50%; background: conic-gradient(light-dark(var(--color-gray-40), var(--color-gray-60)) 0grad, ${t}%, rgba(0,0,0,0) ${t}% 100%)"
    ></span>`;
      }
      render() {
        let t = this._remainingTime <= 0,
          e = Math.floor(this._remainingTime / 1e3) + 1;
        return t
          ? (0, r.qy)`<mdn-button
          >${this.l10n('observatory-rescan-button-rescan')`Rescan`}</mdn-button
        >`
          : (0, r.qy)` <mdn-button disabled .icon=${this._icon((100 * e) / 60)}
          >${this.l10n('observatory-rescan-button-wait-a-minute-to-rescan')`Wait a minute to rescan`}</mdn-button
        >`;
      }
    };
    (customElements.define(
      'mdn-observatory-rescan-button',
      MDNObservatoryRescanButton
    ),
      n.d(e, { MDNObservatoryRescanButton: () => MDNObservatoryRescanButton }));
  }
};
//# sourceMappingURL=921.e97eecaa972a66d9.js.map
