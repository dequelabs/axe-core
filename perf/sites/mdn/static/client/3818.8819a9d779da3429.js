export const __rspack_esm_id = 3818;
export const __rspack_esm_ids = [3818];
export const __webpack_modules__ = {
  47105(e, r, t) {
    var o = t(22009),
      s = t(31601),
      n = t.n(s),
      i = t(76314),
      l = t.n(i)()(n());
    l.push([
      e.id,
      ':host{background-color:var(--color-background-secondary);box-sizing:border-box;display:flex;flex-direction:column;font-size:var(--font-size-small);margin:0;overflow:auto;width:100%}ul{list-style:none;margin:0;padding:0}li{padding:0 .5em;white-space:nowrap}li:before{content:"> ";vertical-align:top;width:.75rem}code,li:before{display:inline-block}code{font-family:var(--font-family-code);margin:0;tab-size:4;white-space:pre-wrap;width:calc(100% - .75rem)}',
      ''
    ]);
    let a = (0, o.AH)([l.toString()]);
    t.d(r, {}, { A: a });
  },
  56369(e, r, t) {
    (t.r(r), t.d(r, { MDNPlayConsole: () => MDNPlayConsole }));
    var o = t(22009),
      s = t(47105);
    function n(e) {
      let r = '';
      for (let t = 0, o = e.length; t < o; t++) {
        if ('string' == typeof e[t]) r += '"' + e[t] + '"';
        else if (Array.isArray(e[t]))
          ((r += 'Array ['), (r += n(e[t])), (r += ']'));
        else if (Object.prototype.hasOwnProperty.call(e, t)) r += i(e[t]);
        else {
          let s = 1;
          for (; t + 1 < o && !Object.prototype.hasOwnProperty.call(e, t + 1);)
            (s++, t++);
          r += 1 === s ? '<1 empty slot>' : `<${s} empty slots>`;
        }
        t < e.length - 1 && (r += ', ');
      }
      return r;
    }
    function i(e) {
      if (null == e || 'boolean' == typeof e) return String(e);
      if ('number' == typeof e) return Object.is(e, -0) ? '-0' : String(e);
      if ('bigint' == typeof e) return String(e) + 'n';
      if ('string' == typeof e)
        return e.includes('"') ? "'" + e + "'" : '"' + e + '"';
      if (Array.isArray(e)) return 'Array [' + n(e) + ']';
      else
        return (function (e) {
          let r = e.constructor ? e.constructor.name : e;
          if ('String' === r) return `String { "${e.valueOf()}" }`;
          if (e === JSON) return 'JSON {}';
          if (r.match && /^(ArrayBuffer|SharedArrayBuffer|DataView)$/.test(r))
            return r + ' {}';
          if (
            r.match &&
            /^(Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array|BigInt64Array|BigUint64Array)$/.test(
              r
            )
          )
            return e.length > 0 ? r + ' [' + n(e) + ']' : r + ' []';
          if ('Symbol' === r && void 0 !== e) return e.toString();
          if ('Object' === r) {
            if (e?._MDNPlaySerializedObject) return e._MDNPlaySerializedObject;
            let t = '',
              o = !0;
            for (let r in e)
              Object.prototype.hasOwnProperty.call(e, r) &&
                (o ? (o = !1) : (t += ', '), (t = t + r + ': ' + i(e[r])));
            return r + ' { ' + t + ' }';
          }
          if (!e.constructor && !e.prototype) {
            let r = '',
              t = !0;
            for (let o in e)
              (t ? (t = !1) : (r += ', '), (r = r + o + ': ' + i(e[o])));
            return 'Object { ' + r + ' }';
          }
          return e;
        })(e);
    }
    let VirtualConsole = class VirtualConsole {
      #e;
      constructor(e) {
        this.#e = e;
      }
      clear() {
        this.#e._messages = [];
      }
      debug(...e) {
        return this.log(...e);
      }
      error(...e) {
        return this.log(...e);
      }
      info(...e) {
        return this.log(...e);
      }
      log(...e) {
        (e.length > 1 &&
          'string' == typeof e[0] &&
          (e[0] = e[0].replaceAll(/%(?:\.([0-9]+))?(.)/g, (r, t, o) => {
            switch (o) {
              case 'o':
              case 'O':
                return i(e.splice(1, 1)[0]);
              case 'd':
              case 'i':
                return Math.trunc(e.splice(1, 1)[0])
                  .toFixed(0)
                  .padStart(t, '0');
              case 's':
                return e.splice(1, 1)[0].toString();
              case 'f': {
                let r = e.splice(1, 1)[0];
                return (
                  'number' == typeof r ? r : Number.parseFloat(r)
                ).toFixed(t ?? 6);
              }
              case 'c':
                return (e.splice(1, 1), '');
              case '%':
                return '%';
              default:
                return r;
            }
          })),
          (this.#e._messages = [
            ...this.#e._messages,
            e.map(e => i(e)).join(' ')
          ]));
      }
      warn(...e) {
        return this.log(...e);
      }
    };
    let MDNPlayConsole = class MDNPlayConsole extends o.WF {
      static get properties() {
        return { _messages: { state: !0 } };
      }
      static styles = s.A;
      constructor() {
        (super(),
          (this.vconsole = new VirtualConsole(this)),
          (this._messages = []));
      }
      onConsole({ detail: e }) {
        if (e.prop in this.vconsole) {
          let r = e.prop;
          e.args ? this.vconsole[r](...e.args) : this.vconsole[r]();
        } else
          this.vconsole.warn(
            '[Playground] Unsupported console message (see browser console)'
          );
      }
      render() {
        return (0, o.qy)`
      <ul aria-live="polite">
        ${this._messages.map(e => (0, o.qy)`<li><code>${e}</code></li>`)}
      </ul>
    `;
      }
      updated() {
        this.scrollTo({ top: this.scrollHeight });
      }
    };
    customElements.define('mdn-play-console', MDNPlayConsole);
  }
};
//# sourceMappingURL=3818.8819a9d779da3429.js.map
