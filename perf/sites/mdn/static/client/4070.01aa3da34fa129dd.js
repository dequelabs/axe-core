export const __rspack_esm_id = 4070;
export const __rspack_esm_ids = [4070];
export const __webpack_modules__ = {
  96082(t, e, a) {
    var r = a(22009),
      s = a(31601),
      n = a.n(s),
      i = a(76314),
      o = a.n(i),
      l = a(39807),
      d = o()(n());
    (d.i(l.A), d.push([t.id, '', '']));
    let c = (0, r.AH)([d.toString()]);
    a.d(e, {}, { A: c });
  },
  37077(t, e, a) {
    a.r(e);
    var r = a(22009),
      s = a(29825),
      n = a(96082);
    let MDNObservatoryHumanDuration = class MDNObservatoryHumanDuration
      extends r.WF
    {
      static styles = n.A;
      static get properties() {
        return { date: { attribute: !1 }, _text: { state: !0 } };
      }
      constructor() {
        (super(),
          (this.date = new Date()),
          (this._text = ''),
          (this._interval = null));
      }
      connectedCallback() {
        (super.connectedCallback(),
          (this._text = (0, s.S6)(this.date)),
          (this._interval = setInterval(() => {
            this._text = (0, s.S6)(this.date);
          }, 1e4)));
      }
      disconnectedCallback() {
        (super.disconnectedCallback(),
          this._interval &&
            (clearInterval(this._interval), (this._interval = null)));
      }
      _displayString() {
        return (0, s.S6)(this.date);
      }
      render() {
        return (0, r.qy)`
      <time
        datetime=${this.date.toDateString()}
        title=${(0, s.r6)(this.date)}
      >
        ${this._text}
      </time>
    `;
      }
    };
    (customElements.define(
      'mdn-observatory-human-duration',
      MDNObservatoryHumanDuration
    ),
      a.d(e, {
        MDNObservatoryHumanDuration: () => MDNObservatoryHumanDuration
      }));
  }
};
//# sourceMappingURL=4070.01aa3da34fa129dd.js.map
