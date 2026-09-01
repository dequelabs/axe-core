/*! LICENSE: 3416.eaa98ee28d7733ad.js.LICENSE.txt */
export const __rspack_esm_id = 3416;
export const __rspack_esm_ids = [3416];
export const __webpack_modules__ = {
  13852(e, n, t) {
    var r = t(22009),
      o = t(31601),
      a = t.n(o),
      i = t(76314),
      s = t.n(i),
      l = t(39807),
      d = s()(a());
    (d.i(l.A),
      d.push([
        e.id,
        '.wrapper{display:grid;gap:1rem;grid-template-areas:"left runner";grid-template-columns:1fr 1fr;grid-template-rows:1fr;height:100%}.wrapper section{display:flex;flex-direction:column;flex-grow:1;gap:1rem;grid-area:left}:is(.wrapper section) aside{align-items:center;display:flex;flex-wrap:wrap;gap:.5rem;padding:.5rem}:is(:is(.wrapper section) aside) h1{font-size:var(--font-size-normal);margin:0 auto 0 0}:is(:is(.wrapper section) aside) menu{display:flex;flex-wrap:wrap;gap:.5rem;margin:0;padding:0}:is(.wrapper section) details{border:var(--border);border-radius:.25rem;flex-direction:column;flex-shrink:0;overflow:hidden}[open]:is(:is(.wrapper section) details){flex-basis:0;flex-grow:1;min-height:12rem}[open]:is(:is(.wrapper section) details) mdn-play-editor{display:block}:is(:is(.wrapper section) details)::details-content{display:contents}:is(:is(.wrapper section) details) summary{cursor:pointer;height:2em;line-height:var(--font-line-ui);padding:.5em;-webkit-user-select:none;user-select:none}:is(:is(.wrapper section) details) mdn-play-editor{display:none;height:calc(100% - 2em)}:is(.wrapper section) .playground__runner-menu{align-self:flex-end;padding:.5rem 0}@media (width <= 992px){:is(.wrapper section) .playground__runner-menu{align-self:center}}.playground__runner-console:is(.wrapper section){grid-area:runner;overflow:hidden}.playground__runner-console:is(.wrapper section) .overlay-run-button,.playground__runner-console:is(.wrapper section) mdn-play-runner{border:var(--border);border-radius:.25rem;flex-grow:1}.hidden:is(.playground__runner-console:is(.wrapper section) mdn-play-runner,.playground__runner-console:is(.wrapper section) .overlay-run-button){display:none}.playground__runner-console:is(.wrapper section) .overlay-run-button{border-color:currentcolor}.playground__runner-console:is(.wrapper section) .overlay-run-button--header{font-size:clamp(1.5rem,3vw,3rem)}:is(.playground__runner-console:is(.wrapper section) .overlay-run-button--header) svg{height:clamp(1.5rem,3vw,3rem)!important;vertical-align:bottom;width:clamp(1.5rem,3vw,3rem)!important}.playground__runner-console:is(.wrapper section) .overlay-run-button--body{color:var(--color-text-secondary);line-height:var(--font-line-normal);margin-top:.5rem}.playground__runner-console:is(.wrapper section) .playground__console{background-color:var(--color-background-secondary);border:var(--border);border-radius:.25rem}:is(.playground__runner-console:is(.wrapper section) .playground__console) div{font-size:var(--font-size-small);font-weight:var(--font-weight-bold);text-align:center}:is(.playground__runner-console:is(.wrapper section) .playground__console) mdn-play-console{height:6rem}.wrapper mdn-placement-sidebar{grid-area:place;justify-self:center}@media (width <= 992px){.wrapper{display:flex;flex-direction:column}}mdn-modal section{display:flex;flex-direction:column;gap:.5rem}:is(mdn-modal section):not(:last-child){margin-bottom:1rem}mdn-modal h2{font-size:var(--font-size-normal);font-weight:400;margin:0}mdn-modal label{display:flex;flex-direction:column;gap:.5rem}mdn-modal p{margin:0}mdn-modal.share section{align-items:center}mdn-modal.report section:last-child{flex-direction:row;justify-content:flex-end}',
        ''
      ]));
    let c = (0, r.AH)([d.toString()]);
    t.d(n, {}, { A: c });
  },
  39807(e, n, t) {
    var r = t(31601),
      o = t.n(r),
      a = t(76314),
      i = t.n(a)()(o());
    i.push([
      e.id,
      '*,:after,:before{box-sizing:border-box}button,input,select,textarea{font:inherit}button{color:inherit;cursor:pointer}img{height:auto;max-width:100%}a{color:var(--color-link-normal)}[hidden]{display:none!important}#content{scroll-margin-block-start:var(--sticky-header-height)}',
      ''
    ]);
    let s = i.toString();
    t.d(n, {}, { A: s });
  },
  70242(e, n, t) {
    t.r(n);
    var r = t(22009);
    t(35268);
    var o = t(70693),
      a = t(22207);
    let MDNLoginButton = class MDNLoginButton extends (0, o.J)(r.WF) {
      static ssr = !1;
      get _loginUrl() {
        let e = location.href.replace(location.origin, ''),
          n = new URL(a.vQ, location.origin);
        return (
          (n.search = new URLSearchParams({ next: e }).toString()),
          n.toString()
        );
      }
      render() {
        return (0,
        r.qy)`<mdn-button href=${this._loginUrl} data-glean-id="login_button"
      >${this.l10n('login-button-login')`Login`}</mdn-button
    >`;
      }
    };
    (customElements.define('mdn-login-button', MDNLoginButton),
      t.d(n, { MDNLoginButton: () => MDNLoginButton }));
  },
  28940(e, n, t) {
    (t.r(n), t.d(n, { MDNPlayground: () => MDNPlayground }));
    var r = t(36085),
      o = t(22009),
      a = t(6616),
      i = t(70693),
      s = t(23727);
    let l = (0,
      o.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z"/></svg>`,
      d = (0,
      o.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01"/></svg>`;
    var c = t(45742),
      p = t(13852),
      u = t(72250);
    (t(23731), t(35268), t(63386), t(63657), t(56369), t(14903), t(70242));
    let h = 'playground-session-code';
    let MDNPlayground = class MDNPlayground extends (0, i.J)(o.WF) {
      static styles = p.A;
      static get properties() {
        return { _gistID: { state: !0 } };
      }
      constructor() {
        (super(),
          (this._permalink = ''),
          (this._autoRun = !0),
          (this._gistId = void 0));
      }
      _controller = (0, a._)();
      _shareModal = (0, a._)();
      _reportModal = (0, a._)();
      _user = new r.YZ(this, { task: async () => await (0, c.L)() });
      _format() {
        this._controller.value?.format();
      }
      _run() {
        let e = this._controller.value;
        e &&
          (e.run(),
          this._autoRun ||
            ((this._autoRun = !0),
            (e.runOnChange = !0),
            this._storeSession(),
            this.requestUpdate()));
      }
      _share() {
        this._shareModal.value?.showModal();
      }
      _clear() {
        let e = this._controller.value;
        if (
          confirm(
            this.l10n(
              'playground-do-you-really-want-to-clear-ever'
            )`Do you really want to clear everything?`
          ) &&
          e
        ) {
          (e.clear(),
            (this._autoRun = !0),
            this._storeSession(),
            this.requestUpdate());
          let n = new URL(location.href);
          ((n.search = ''), history.replaceState(void 0, '', n));
        }
      }
      _reset() {
        let e = this._controller.value;
        confirm(
          this.l10n(
            'playground-do-you-really-want-to-revert-you'
          )`Do you really want to revert your changes?`
        ) &&
          e &&
          (e.reset(), this._storeSession(), this.requestUpdate());
      }
      async _copyMarkdown() {
        let e = this._controller.value;
        if (e) {
          let n = Object.entries(e.code)
            .map(
              ([e, n]) =>
                n &&
                `\`\`\`${e}
${n}
\`\`\``
            )
            .filter(Boolean)
            .join('\n\n');
          await navigator.clipboard.writeText(n);
        }
      }
      async _copyDataUrl() {
        let e = this._controller.value;
        if (e) {
          let { css: n, html: t, js: r } = e.code,
            o = '<!doctype html><body>';
          (n && (o += `<style>${n}</style>`),
            t && (o += t),
            r && (o += `<script>${r}</script>`),
            (o += '</body>'),
            (o = o.replaceAll(/[^ <>/{}=:;]+/g, e => encodeURIComponent(e))),
            await navigator.clipboard.writeText(
              `data:text/html;charset=utf-8,${o}`
            ));
        }
      }
      async _createPermalink() {
        let e = this._controller.value;
        if (e) {
          let n = await fetch('/api/v1/play/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(e.code)
            }),
            { id: t } = await n.json(),
            r = new URL(location.href);
          ((r.search = new URLSearchParams({ id: t }).toString()),
            (e.initialCode = e.code),
            (this._permalink = r.toString()),
            history.replaceState(void 0, '', r),
            this.requestUpdate());
        }
      }
      async _copyPermalink() {
        this._permalink &&
          (await navigator.clipboard.writeText(this._permalink));
      }
      _storeSession() {
        let e = this._controller.value;
        if (e) {
          let { srcPrefix: n, initialCode: t, code: r } = e,
            o = {
              srcPrefix: n,
              initialCode: t,
              code: r,
              autoRun: this._autoRun
            };
          sessionStorage.setItem(h, JSON.stringify(o));
        }
      }
      _loadSession() {
        let {
            srcPrefix: e,
            initialCode: n,
            code: t,
            autoRun: r
          } = m(JSON.parse(sessionStorage.getItem(h) || '{}')),
          o = this._controller.value;
        o &&
          (!1 === r &&
            ((this._autoRun = !1), (o.runOnStart = !1), (o.runOnChange = !1)),
          (o.srcPrefix = e),
          (o.initialCode = n),
          (o.code = t),
          this.requestUpdate());
      }
      async _loadFromUrl() {
        let e = this._controller.value;
        if (e) {
          let n = new URLSearchParams(location.search),
            t = n.get('id'),
            r = n.get('state'),
            o = n.get('srcPrefix');
          t && (this._gistId = t);
          let { srcPrefix: a, code: i } =
              (await (t
                ? this._sessionFromApi(t)
                : r
                  ? this._sessionFromState(r)
                  : void 0)) || {},
            s = o || a;
          if (
            void 0 !== s &&
            void 0 !== i &&
            (e.srcPrefix !== s || !g(e.initialCode, i))
          ) {
            try {
              if (
                !opener?.location?.origin ||
                opener?.location?.origin !== location.origin
              )
                throw Error("origin doesn't match");
            } catch {
              ((this._autoRun = !1), (e.runOnStart = !1), (e.runOnChange = !1));
            }
            ((e.srcPrefix = s),
              (e.initialCode = i),
              (e.code = i),
              this._storeSession());
          }
          this.requestUpdate();
        }
      }
      async _sessionFromApi(e) {
        let n = await fetch(`/api/v1/play/${encodeURIComponent(e)}`);
        if (!n.ok) return void console.error(n.statusText);
        let t = new URL(location.href);
        return (
          (t.search = new URLSearchParams({ id: e }).toString()),
          (this._permalink = t.toString()),
          (0, s.w)('playground: load-shared'),
          m(await n.json())
        );
      }
      async _sessionFromState(e) {
        let { state: n } = await (0, u.p)(e);
        return m(JSON.parse(n || '{}'));
      }
      _editorUpdate() {
        (this._storeSession(), this.requestUpdate());
      }
      _reportOpen() {
        this._reportModal.value?.showModal();
      }
      _reportCancel() {
        this._reportModal.value?.close();
      }
      async _reportSubmit() {
        (await fetch('/api/v1/play/flag', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this._gistId,
            reason: this._reportModal.value?.querySelector('textarea')?.value
          })
        }),
          this._reportModal.value?.close());
      }
      connectedCallback() {
        (super.connectedCallback(), this._user.run());
      }
      render() {
        let { code: e, initialCode: n } = this._controller.value ?? {},
          t = Object.values(e ?? {}).some(Boolean),
          r = Object.values(n ?? {}).some(Boolean),
          i = r && !g(e, n);
        return (0, o.qy)`
      <div class="wrapper">
        <mdn-play-controller
          ${(0, a.K)(this._controller)}
          run-on-start
          run-on-change
        >
          <section>
            <aside>
              <h1>${this.l10n('playground-playground')`Playground`}</h1>
              <menu>
                <mdn-button
                  variant="secondary"
                  @click=${this._format}
                  ?disabled=${!t}
                  >${this.l10n('playground-format')`Format`}</mdn-button
                >
                <mdn-button
                  variant="secondary"
                  @click=${this._run}
                  ?disabled=${!t}
                  >${this.l10n('playground-run')`Run`}</mdn-button
                >
                <mdn-button
                  variant="secondary"
                  @click=${this._share}
                  ?disabled=${!t}
                  data-id="share"
                  data-glean-id="playground: share-click"
                  >${this.l10n('playground-share')`Share`}</mdn-button
                >
                <mdn-button
                  variant="secondary"
                  @click=${this._clear}
                  ?disabled=${!(t || i)}
                  data-id="clear"
                  >${this.l10n('playground-clear')`Clear`}</mdn-button
                >
                ${
                  r
                    ? (0, o.qy)`<mdn-button
                        variant="secondary"
                        @click=${this._reset}
                        ?disabled=${!i}
                        data-glean-id="playground: reset-click"
                        >${this.l10n('playground-reset')`Reset`}</mdn-button
                      >`
                    : o.s6
                }
              </menu>
            </aside>
            <details open>
              <summary>HTML</summary>
              <mdn-play-editor
                language="html"
                @update=${this._editorUpdate}
              ></mdn-play-editor>
            </details>
            <details open>
              <summary>CSS</summary>
              <mdn-play-editor
                language="css"
                @update=${this._editorUpdate}
              ></mdn-play-editor>
            </details>
            <details open>
              <summary>JAVASCRIPT</summary>
              <mdn-play-editor
                language="js"
                @update=${this._editorUpdate}
              ></mdn-play-editor>
            </details>
          </section>
          <section class="playground__runner-console">
            ${
              this._gistId
                ? (0, o.qy)`<aside class="playground__runner-menu">
                    <menu>
                      <mdn-button
                        @click=${this._reportOpen}
                        variant="secondary"
                        .icon=${d}
                        data-glean-id="playground: flag-click"
                      >
                        ${this.l10n('playground-seeing-something-inappropriate')`Seeing something inappropriate?`}
                      </mdn-button>
                    </menu>
                  </aside>`
                : o.s6
            }
            ${
              this._autoRun
                ? o.s6
                : (0, o.qy)`<mdn-button
                    class="overlay-run-button"
                    @click=${this._run}
                    variant="plain"
                  >
                    <div class="overlay-run-button--header">
                      ${l} ${this.l10n('playground-run')`Run`}
                    </div>
                    <div class="overlay-run-button--body">
                      ${this.l10n.raw({ id: 'playground-user-shared-warning' })}
                    </div>
                  </mdn-button>`
            }
            <mdn-play-runner
              class=${this._autoRun ? o.s6 : 'hidden'}
            ></mdn-play-runner>
            <div class="playground__console">
              <div>${this.l10n('playground-console')`Console`}</div>
              <mdn-play-console></mdn-play-console>
            </div>
          </section>
        </mdn-play-controller>
      </div>
      <mdn-modal ${(0, a.K)(this._shareModal)} class="share">
        <section>
          <h2>${this.l10n('playground-share-markdown')`Share Markdown`}</h2>
          <mdn-button
            variant="secondary"
            @click=${this._copyMarkdown}
            data-glean-id="playground: share-markdown"
            >${this.l10n('playground-copy-markdown-to-clipboard')`Copy markdown to clipboard`}</mdn-button
          >
        </section>
        <section>
          <h2>${this.l10n('playground-share-data-url')`Share Data URL`}</h2>
          <mdn-button
            variant="secondary"
            @click=${this._copyDataUrl}
            data-glean-id="playground: share-data-url"
            >${this.l10n('playground-copy-data-url-to-clipboard')`Copy data URL to clipboard`}</mdn-button
          >
        </section>
        <section>
          <h2>
            ${this.l10n('playground-share-your-code-via-permalink')`Share your code via Permalink`}
          </h2>
          ${this._user.render({
            initial: () => (0, o.qy)`<mdn-login-button
                data-glean-id="playground: banner-login"
              ></mdn-login-button>`,
            pending: () => (0, o.qy)`<mdn-login-button
                data-glean-id="playground: banner-login"
              ></mdn-login-button>`,
            complete: e =>
              e.isAuthenticated
                ? this._permalink && !i
                  ? (0, o.qy)`
                      <input .value=${this._permalink} />
                      <mdn-button
                        variant="secondary"
                        @click=${this._copyPermalink}
                        data-glean-id="playground: share-permalink"
                        >${this.l10n('playground-copy-to-clipboard')`Copy to clipboard`}</mdn-button
                      >
                    `
                  : (0, o.qy)`<mdn-button
                      @click=${this._createPermalink}
                      data-glean-id="playground: share-permalink"
                      >${this.l10n('playground-create-link')`Create link`}</mdn-button
                    >`
                : (0, o.qy)`<mdn-login-button
                    data-glean-id="playground: banner-login"
                  ></mdn-login-button>`
          })}
        </section>
      </mdn-modal>
      <mdn-modal ${(0, a.K)(this._reportModal)} class="report">
        <section>
          <p>
            ${this.l10n('playground-report-this-malicious-or-inappro')`Report this malicious or inappropriate shared playground.`}
          </p>
          <label>
            ${this.l10n('playground-can-you-please-share-some-detail')`Can you please share some details on what's wrong with this content:`}
            <textarea></textarea>
          </label>
        </section>
        <section>
          <mdn-button variant="secondary" @click=${this._reportCancel}
            >${this.l10n('playground-cancel')`Cancel`}</mdn-button
          >
          <mdn-button @click=${this._reportSubmit}
            >${this.l10n('playground-report')`Report`}</mdn-button
          >
        </section>
      </mdn-modal>
    `;
      }
      firstUpdated() {
        (this._loadSession(), this._loadFromUrl());
      }
    };
    function m(e) {
      return 'html' in e
        ? {
            srcPrefix: e.src || '',
            code: { html: e.html, css: e.css, js: e.js }
          }
        : 'srcPrefix' in e
          ? e
          : { srcPrefix: '', code: {} };
    }
    function g(e, n) {
      return void 0 === e || void 0 === n
        ? e === n
        : Object.keys(e).length === Object.keys(n).length &&
            Object.entries(e).every(([e, t]) => n[e] === t);
    }
    customElements.define('mdn-playground', MDNPlayground);
  },
  97072(e, n, t) {
    t.d(n, { D: () => i });
    var r = t(36752),
      o = t(7804),
      a = t(18504);
    let i = (0, o.u$)(
      class extends o.WL {
        constructor() {
          (super(...arguments), (this.key = r.s6));
        }
        render(e, n) {
          return ((this.key = e), n);
        }
        update(e, [n, t]) {
          return (n !== this.key && ((0, a.mY)(e), (this.key = n)), t);
        }
      }
    );
  }
};
//# sourceMappingURL=3416.eaa98ee28d7733ad.js.map
