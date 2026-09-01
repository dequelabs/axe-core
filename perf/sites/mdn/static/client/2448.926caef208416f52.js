export const __rspack_esm_id = 2448;
export const __rspack_esm_ids = [2448];
export const __webpack_modules__ = {
  23731(e, t, r) {
    r.r(t);
    var o = r(22009);
    let MDNPlayController = class MDNPlayController extends o.WF {
      static get properties() {
        return {
          runOnStart: { type: Boolean, attribute: 'run-on-start' },
          runOnChange: { type: Boolean, attribute: 'run-on-change' },
          srcPrefix: { attribute: !1 }
        };
      }
      static styles = (0, o.AH)`
    :host {
      display: contents;
    }
  `;
      constructor() {
        (super(),
          (this.runOnStart = !1),
          (this.runOnChange = !1),
          (this.srcPrefix = ''),
          (this._code = {}),
          (this._hiddenCode = {}));
      }
      set code(e) {
        for (let t of ((this._code = Object.fromEntries(
          Object.entries(e).filter(([e]) => !e.endsWith('-hidden'))
        )),
        (this._hiddenCode = Object.fromEntries(
          Object.entries(e)
            .filter(([e]) => e.endsWith('-hidden'))
            .map(([e, t]) => [e.replace(/-hidden$/, ''), t])
        )),
        this.initialCode || (this.initialCode = e),
        this.querySelectorAll('mdn-play-editor'))) {
          let r = t.language;
          r && (t.value = e[r] ?? '');
        }
        this.runOnStart && this.run();
      }
      get code() {
        let e = { ...this._code };
        for (let t of this.querySelectorAll('mdn-play-editor')) {
          let r = t.language;
          r && (e[r] = t.value);
        }
        for (let [t, r] of Object.entries(this._hiddenCode))
          e[t] = e[t]
            ? `${r}
${e[t]}`
            : r;
        return e;
      }
      async format() {
        try {
          await Promise.all(
            [...this.querySelectorAll('mdn-play-editor')].map(e => e.format())
          );
        } catch (e) {
          console.error(e);
        }
      }
      run() {
        this.querySelector('mdn-play-console')?.vconsole.clear();
        let e = this.querySelector('mdn-play-runner');
        e && ((e.srcPrefix = this.srcPrefix), (e.code = this.code));
      }
      reset() {
        if (((this.code = this.initialCode ?? {}), this.runOnStart)) this.run();
        else {
          this.querySelector('mdn-play-console')?.vconsole.clear();
          let e = this.querySelector('mdn-play-runner');
          e && (e.code = void 0);
        }
      }
      clear() {
        ((this.runOnChange = !0),
          (this.initialCode = void 0),
          (this.srcPrefix = ''),
          this.reset());
      }
      _onEditorUpdate() {
        this.runOnChange && this.run();
      }
      _onConsole(e) {
        this.querySelector('mdn-play-console')?.onConsole(e);
      }
      render() {
        return (0, o.qy)`
      <slot @update=${this._onEditorUpdate} @console=${this._onConsole}></slot>
    `;
      }
    };
    (customElements.define('mdn-play-controller', MDNPlayController),
      r.d(t, { MDNPlayController: () => MDNPlayController }));
  }
};
//# sourceMappingURL=2448.926caef208416f52.js.map
