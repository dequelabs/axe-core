export const __rspack_esm_id = 3047;
export const __rspack_esm_ids = [3047];
export const __webpack_modules__ = {
  14041(e, t, i) {
    var s = i(22009),
      a = i(31601),
      r = i.n(a),
      n = i(76314),
      o = i.n(n)()(r());
    o.push([
      e.id,
      ':host{display:block}.editor{height:100%}.editor.minimal{display:flex;flex-direction:column;justify-content:center}.editor.minimal .cm-content{align-self:center;min-height:auto}.editor.minimal .cm-focused{outline:none}.editor.minimal .cm-line{padding:0 12px}.editor .cm-editor{height:100%;width:100%}:is(.editor .cm-editor) *{font-family:var(--font-family-code)!important}',
      ''
    ]);
    let l = (0, s.AH)([o.toString()]);
    i.d(t, {}, { A: l });
  },
  63386(e, t, i) {
    i.r(t);
    var s = i(47404),
      a = i(45230),
      r = i(40734),
      n = i(70028),
      o = i(64110),
      l = i(42570),
      d = i(15874),
      h = i(25130),
      u = i(6585),
      c = i(85109),
      m = i(1371),
      p = i(6363),
      _ = i(22009),
      g = i(71677),
      f = i(14041);
    let MDNPlayEditor = class MDNPlayEditor extends _.WF {
      static get properties() {
        return {
          language: { type: String },
          minimal: { type: Boolean },
          value: { attribute: !1 },
          delay: { type: Number }
        };
      }
      static styles = f.A;
      _editor;
      _updateTimer = -1;
      constructor() {
        (super(),
          (this.theme = new g.W(this)),
          (this.language = ''),
          (this.minimal = !1),
          (this._value = ''),
          (this.delay = 1e3));
      }
      set value(e) {
        ((this._value = e),
          this._editor &&
            this._editor.dispatch({
              changes: { from: 0, to: this._editor.state.doc.length, insert: e }
            }));
      }
      get value() {
        return this._editor ? this._editor.state.doc.toString() : this._value;
      }
      focus() {
        this._editor?.focus();
      }
      _extensions() {
        let e = (() => {
          switch (this.language) {
            case 'js':
              return [(0, o.Q2)()];
            case 'html':
              return [(0, n.qy)()];
            case 'css':
              return [(0, r.AH)()];
            case 'wat':
              return [(0, l.C)()];
            default:
              return [];
          }
        })();
        return [
          p.V0,
          (0, d.SG)(),
          (0, s.wm)(),
          ...(this.minimal
            ? []
            : [
                (0, m.$K)(),
                (0, d.WD)(),
                (0, s.yU)(),
                (0, m.dz)(),
                m.w4.of([...s.Bc, ...a.pw, ...s.OO, ...h.$w, a.Yc]),
                m.Lz.lineWrapping
              ]),
          ...('dark' === this.theme.value ? [c.bM] : []),
          ...e,
          m.Lz.focusChangeEffect.of(
            (e, t) => (
              this.dispatchEvent(
                new Event(t ? 'focus' : 'blur', { bubbles: !0, composed: !0 })
              ),
              null
            )
          ),
          m.Lz.updateListener.of(e => {
            e.docChanged &&
              (-1 !== this._updateTimer && clearTimeout(this._updateTimer),
              (this._updateTimer = globalThis?.setTimeout(() => {
                ((this._updateTimer = -1),
                  this.dispatchEvent(
                    new Event('update', { bubbles: !0, composed: !0 })
                  ));
              }, this.delay)));
          })
        ];
      }
      async format() {
        let e = await i.e(8292).then(i.bind(i, 68463)),
          t = (() => {
            switch (this.language) {
              case 'js':
                return {
                  parser: 'babel',
                  plugins: [
                    i.e(8048).then(i.bind(i, 5283)),
                    i.e(2834).then(i.bind(i, 76745))
                  ]
                };
              case 'html':
                return {
                  parser: 'html',
                  plugins: [
                    i.e(6375).then(i.bind(i, 29082)),
                    i.e(4517).then(i.bind(i, 33220)),
                    i.e(8048).then(i.bind(i, 5283)),
                    i.e(2834).then(i.bind(i, 76745))
                  ]
                };
              case 'css':
                return {
                  parser: 'css',
                  plugins: [i.e(4517).then(i.bind(i, 33220))]
                };
              default:
                return;
            }
          })();
        if (t) {
          let i = await Promise.all(t.plugins),
            s = this.value,
            a = await e.format(s, { parser: t.parser, plugins: i });
          this.value === s && s !== a && (this.value = a);
        }
      }
      willUpdate(e) {
        (e.has('language') || e.has('ThemeController.value')) &&
          this._editor?.dispatch({
            effects: u.Pe.reconfigure.of(this._extensions())
          });
      }
      render() {
        return (0, _.qy)`<div
      class=${this.minimal ? 'editor minimal' : 'editor'}
    ></div>`;
      }
      firstUpdated() {
        let e = u.$t.create({
          doc: this._value,
          extensions: this._extensions()
        });
        this._editor = new m.Lz({
          state: e,
          parent: this.renderRoot.querySelector('div') || void 0
        });
      }
    };
    (customElements.define('mdn-play-editor', MDNPlayEditor),
      i.d(t, { MDNPlayEditor: () => MDNPlayEditor }));
  }
};
//# sourceMappingURL=3047.64c46943e9562cc7.js.map
