export const __rspack_esm_id = 4098;
export const __rspack_esm_ids = [4098];
export const __webpack_modules__ = {
  11796(e, t, s) {
    var a = s(22009),
      i = s(31601),
      r = s.n(i),
      n = s(76314),
      o = s.n(n)()(r());
    o.push([
      e.id,
      'iframe{border:none;box-sizing:initial;height:100%;width:100%}',
      ''
    ]);
    let l = (0, a.AH)([o.toString()]);
    s.d(t, {}, { A: l });
  },
  63657(e, t, s) {
    s.r(t);
    var a = s(36085),
      i = s(22009),
      r = s(12477),
      n = s(97072),
      o = s(6616),
      l = s(71677),
      c = s(22207),
      d = s(72250),
      h = s(11796);
    let MDNPlayRunner = class MDNPlayRunner extends i.WF {
      static ssr = !1;
      static get properties() {
        return {
          code: { type: Object },
          defaults: { type: String },
          srcPrefix: { type: String, attribute: 'src-prefix' },
          allow: { type: String },
          sandbox: { type: String },
          permalink: { type: Boolean },
          _src: { state: !0 }
        };
      }
      static styles = h.A;
      constructor() {
        (super(),
          (this.theme = new l.W(this)),
          (this.code = void 0),
          (this.defaults = void 0),
          (this.srcPrefix = void 0),
          (this.allow = void 0),
          (this.sandbox = void 0),
          (this.permalink = !1),
          (this._uuid = crypto.randomUUID()),
          (this._subdomain = ''),
          (this.ready = new Promise(e => {
            this._resolveReady = () => e(!0);
          })),
          (this._src = 'about:blank'));
      }
      _iframe = (0, o._)();
      _onMessage({ data: { typ: e, prop: t, args: s, uuid: a }, origin: i }) {
        (a || (a = new URL(i, 'https://example.com').hostname.split('.', 1)[0]),
          a === this._subdomain &&
            ('console' === e
              ? this.dispatchEvent(
                  new CustomEvent('console', {
                    bubbles: !0,
                    composed: !0,
                    detail: { prop: t, args: s }
                  })
                )
              : 'ready' === e && this._resolveReady()));
      }
      _updateSrc = new a.YZ(this, {
        args: () => [
          this.code,
          this.defaults,
          this.theme.value,
          this.srcPrefix,
          this.permalink
        ],
        task: async ([e, t, s, a, i], { signal: r }) => {
          if (e && e.js && e.wat) {
            let t = await p(e.wat);
            e.js = e.js.replace('{%wasm-url%}', t);
          }
          let { state: n, hash: o } = await (0, d.$)(
              JSON.stringify({
                html: e?.html || '',
                css: e?.css || '',
                js: e?.js || '',
                defaults: t,
                theme: s
              })
            ),
            l = (a || '').replace(/\/$/, '');
          r.throwIfAborted();
          let h = i ? o : this._uuid,
            u = new URL(
              `${l}/runner.html`,
              c.sR
                ? location.origin.replace(c.I.toString(), c.mR.toString())
                : `${location.protocol}//${h}.${c.tf}`
            );
          (u.searchParams.set('uuid', h),
            u.searchParams.set('state', n),
            (this._subdomain = h),
            (this._src = u.href),
            this.dispatchEvent(
              new CustomEvent('mdn-play-runner-src', {
                bubbles: !0,
                composed: !0,
                detail: u.href
              })
            ));
        }
      });
      connectedCallback() {
        (super.connectedCallback(),
          (this._onMessage = this._onMessage.bind(this)),
          window.addEventListener('message', this._onMessage));
      }
      async postMessage(e) {
        (await this.ready,
          this._iframe.value?.contentWindow?.postMessage(e, '*'));
      }
      render() {
        return (0, n.D)(
          this._src,
          (0, i.qy)`
        <iframe
          ${(0, o.K)(this._iframe)}
          src=${this._src}
          title="runner"
          allow=${(0, r.J)(this.allow)}
          sandbox=${[...new Set(['allow-scripts', 'allow-same-origin', 'allow-forms', ...(this.sandbox?.split(' ') || [])])].join(' ')}
          aria-live="polite"
        ></iframe>
      `
        );
      }
      disconnectedCallback() {
        (super.disconnectedCallback(),
          window.removeEventListener('message', this._onMessage));
      }
    };
    async function p(e) {
      let { default: t, watify: a } = await s.e(8233).then(s.bind(s, 72624));
      await t();
      let i = a(e);
      return `data:application/wasm;base64,${btoa(Array.from(i, e => String.fromCodePoint(e)).join(''))}`;
    }
    (customElements.define('mdn-play-runner', MDNPlayRunner),
      s.d(t, { MDNPlayRunner: () => MDNPlayRunner }));
  },
  72250(e, t, s) {
    async function a(e) {
      let t = new Blob([e]),
        s = new CompressionStream('deflate-raw'),
        a = new Response(t.stream().pipeThrough(s)).arrayBuffer(),
        i = await a,
        r = [
          ...new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256', i))
        ]
          .slice(0, 20)
          .map(e => e.toString(16).padStart(2, '0'))
          .join('');
      return {
        state: btoa(
          Array.from(new Uint8Array(i), e => String.fromCodePoint(e)).join('')
        ),
        hash: r
      };
    }
    async function i(e) {
      if (!e) return { state: null, hash: null };
      let t = (function (e) {
          let t = atob(e),
            s = t.length,
            a = new Uint8Array(s);
          for (let e = 0; e < s; e++) a[e] = t.charCodeAt(e);
          return a.buffer;
        })(e),
        s = [...new Uint8Array(await crypto.subtle.digest('SHA-256', t))]
          .slice(0, 20)
          .map(e => e.toString(16).padStart(2, '0'))
          .join(''),
        a = new DecompressionStream('deflate-raw'),
        i = new Response(new Blob([t]).stream().pipeThrough(a)).arrayBuffer();
      return { state: new TextDecoder().decode(await i), hash: s };
    }
    s.d(t, { $: () => a, p: () => i });
  }
};
//# sourceMappingURL=4098.c89abab9ea3044df.js.map
