export const __rspack_esm_id = 1672;
export const __rspack_esm_ids = [1672];
export const __webpack_modules__ = {
  69504(r, o, e) {
    var t = e(22009),
      a = e(31601),
      s = e.n(a),
      i = e(76314),
      n = e.n(i),
      l = e(39807),
      d = e(33208),
      m = e(67168),
      p = n()(s());
    (p.i(l.A),
      p.i(d.A),
      p.i(m.A),
      p.push([
        r.id,
        ':host{font:400 var(--base-font-size) var(--font-body);--border-radius:0.3rem}.observatory-form__input-group{display:flex;height:3rem}.observatory-form__input-group :focus-visible{outline:1px solid var(--observatory-accent);outline-offset:-1px;outline-width:1px}.observatory-form__input-group ::placeholder{color:var(--color-text-secondary);opacity:.8}.observatory-form__input-group .observatory-form__input{flex-grow:1;font:inherit;padding:0 .75rem;width:100%;--csstools-light-dark-toggle-77e093d8-0:var(--csstools-color-scheme--light) var(--color-gray-05);background-color:var(--csstools-light-dark-toggle-77e093d8-0,var(--color-gray-90));border:1px solid var(--color-border-primary);border-bottom-left-radius:var(--border-radius);border-top-left-radius:var(--border-radius)}@supports (color:light-dark(red,red)){.observatory-form__input-group .observatory-form__input{background-color:light-dark(var(--color-gray-90),var(--color-gray-05))}}:is(.observatory-form__input-group .observatory-form__input)::placeholder{overflow-x:hidden;text-overflow:ellipsis}.observatory-form__input-group .observatory-form__submit{border:none;border-radius:0 var(--border-radius) var(--border-radius) 0;border-bottom-right-radius:var(--border-radius);border-top-right-radius:var(--border-radius);font-size:var(--font-size-normal);font-weight:var(--font-weight-bold);height:unset;padding:0 2rem}.error{color:var(--form-invalid-color);margin-top:.5rem}.error:before{background-color:var(--form-invalid-color);content:"";display:inline-block;height:1.15rem;margin-bottom:.25rem;margin-right:.5rem;mask-image:var(--alert-circle-img);mask-position:center;mask-repeat:no-repeat;vertical-align:middle;width:1.5em}',
        ''
      ]));
    let u = (0, t.AH)([p.toString()]);
    e.d(o, {}, { A: u });
  },
  39807(r, o, e) {
    var t = e(31601),
      a = e.n(t),
      s = e(76314),
      i = e.n(s)()(a());
    i.push([
      r.id,
      '*,:after,:before{box-sizing:border-box}button,input,select,textarea{font:inherit}button{color:inherit;cursor:pointer}img{height:auto;max-width:100%}a{color:var(--color-link-normal)}[hidden]{display:none!important}#content{scroll-margin-block-start:var(--sticky-header-height)}',
      ''
    ]);
    let n = i.toString();
    e.d(o, {}, { A: n });
  },
  67168(r, o, e) {
    var t = e(31601),
      a = e.n(t),
      s = e(76314),
      i = e.n(s)()(a());
    i.push([
      r.id,
      '.visually-hidden{border:0!important;clip-path:inset(50%)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}',
      ''
    ]);
    let n = i.toString();
    e.d(o, {}, { A: n });
  },
  17547(r, o, e) {
    e.r(o);
    var t = e(22009),
      a = e(6616),
      s = e(23727),
      i = e(22207);
    (e(20141), e(35268));
    var n = e(69504);
    let l = { TypeError: 'Observatory is currently down.' };
    let MDNObservatoryForm = class MDNObservatoryForm extends t.WF {
      static styles = n.A;
      static get properties() {
        return {
          _queryRunning: { type: Boolean, state: !0 },
          _hostname: { type: String, state: !0 },
          _errorMessage: { type: String, state: !0 }
        };
      }
      constructor() {
        (super(),
          (this._queryRunning = !1),
          (this._hostname = ''),
          (this._errorMessage = ''));
      }
      inputRef = (0, a._)();
      firstUpdated() {
        this.inputRef.value?.focus();
      }
      async _handleSubmit(r) {
        (r.preventDefault(), (this._errorMessage = ''));
        let o = this.inputRef.value;
        if (!o?.value.trim()) {
          this._errorMessage = 'Please enter a valid hostname';
          return;
        }
        let e = o.value.trim();
        try {
          let r = new URL(e),
            o = r.hostname.trim() || e;
          (r.port && (o += ':' + r.port),
            r.pathname && '/' !== r.pathname && (o += r.pathname),
            (this._hostname = o));
        } catch {
          this._hostname = e;
        }
        ((this._queryRunning = !0), (0, s.w)('observatory: scan'));
        try {
          let r = new URL(
              i.Q + `/api/v2/analyze?host=${encodeURIComponent(this._hostname)}`
            ),
            o = await fetch(r, { method: 'POST' });
          if (!o.ok) {
            let r = await o.json();
            throw Error(`Request failed: ${r.message}`);
          }
          globalThis.location.href = `/en-US/observatory/analyze?host=${encodeURIComponent(this._hostname)}`;
        } catch (r) {
          ((this._errorMessage = `${l[r.name] || 'message' in r ? r.message : r}`),
            (0, s.w)(`observatory: error -> ${this._errorMessage}`));
        } finally {
          this._queryRunning = !1;
        }
      }
      render() {
        return this._queryRunning
          ? (0, t.qy)`
          <label class="visually-hidden" for="progress-bar">
            Scanning ${this._hostname} </label
          ><mdn-progress-bar id="progress-bar"></mdn-progress-bar>
        `
          : (0, t.qy)`
          <form @submit=${this._handleSubmit} class="observatory-form">
            <div class="observatory-form__input-group">
              <label for="host" class="visually-hidden">
                Domain name or URL
              </label>
              <input
                class="input observatory-form__input"
                placeholder="Scan a website for free (e.g. mdn.dev)"
                type="text"
                name="host"
                id="host"
                .value=${this._hostname}
                autofocus
                ${(0, a.K)(this.inputRef)}
              />
              <button
                class="button observatory-form__submit"
                type="submit"
                ?disabled=${this._queryRunning}
                data-variant="primary"
              >
                Scan
              </button>
            </div>
          </form>
          ${this._errorMessage ? (0, t.qy)`<div class="error">${this._errorMessage}</div>` : t.s6}
        `;
      }
    };
    (customElements.define('mdn-observatory-form', MDNObservatoryForm),
      e.d(o, { MDNObservatoryForm: () => MDNObservatoryForm }));
  }
};
//# sourceMappingURL=1672.da1c2370e520277d.js.map
