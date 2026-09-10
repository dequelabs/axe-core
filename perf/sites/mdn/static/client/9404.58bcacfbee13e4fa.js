export const __rspack_esm_id = 9404;
export const __rspack_esm_ids = [9404];
export const __webpack_modules__ = {
  65628(e, t, r) {
    var o = r(22009),
      a = r(31601),
      i = r.n(a),
      l = r(76314),
      s = r.n(l),
      c = r(4417),
      n = r.n(c),
      d = new r.U(r(8238)),
      p = new r.U(r(78547)),
      h = s()(i()),
      m = n()(d),
      u = n()(p);
    h.push([
      e.id,
      `:host{--border:1px solid var(--color-border-primary);--tabbed-font-heading:600 0.625rem/1.2 var(--font-family-text);--elem-radius:0.25rem}header{align-items:center;border-bottom:var(--border);border-top-left-radius:var(--elem-radius);border-top-right-radius:var(--elem-radius);display:flex;grid-area:header;justify-content:space-between;padding:.5rem 1rem}header h4{font-size:var(--font-size-normal);font-weight:400;line-height:1.1876;margin:0;overflow-wrap:anywhere}header mdn-button{margin-right:-.5rem}mdn-play-editor{grid-area:editor;height:100%;overflow:auto}.buttons{display:flex;flex-direction:column;gap:.5rem;grid-area:buttons}mdn-play-console{border:var(--border);border-radius:var(--elem-radius);grid-area:console}mdn-ix-tab-wrapper{grid-area:tabs}.template-console{align-content:start;display:grid;gap:.5rem;grid-template-areas:"header  header" "editor  editor" "buttons console";grid-template-columns:max-content 1fr;grid-template-rows:max-content 1fr 8rem;height:100%}.template-console header{border:var(--border)}.template-console mdn-play-runner{display:none}.template-console mdn-ix-tab-wrapper,.template-console>mdn-play-editor{border:var(--border);border-bottom-left-radius:var(--elem-radius);border-bottom-right-radius:var(--elem-radius);border-top:0;grid-area:editor;margin-top:-.5rem}@media (width <= 769px){.template-console{grid-template-areas:"header" "editor" "buttons" "console";grid-template-columns:1fr;grid-template-rows:max-content 1fr max-content 8rem}.template-console .buttons{flex-direction:row;justify-content:space-between}}.template-tabbed{border:var(--border);border-radius:var(--elem-radius);display:grid;grid-template-areas:"header header" "tabs   runner";grid-template-columns:6fr 4fr;grid-template-rows:max-content 1fr;height:100%;overflow:hidden}.template-tabbed .output-wrapper{border-left:var(--border);grid-area:runner;overflow:hidden;position:relative}:is(.template-tabbed .output-wrapper) h4{background-color:var(--color-background-secondary);border-bottom-left-radius:var(--elem-radius);color:var(--color-text-secondary);font:var(--tabbed-font-heading);margin:0;padding:.5rem 1.6rem;position:absolute;right:0;text-transform:uppercase;top:0;z-index:2}@media (width <= 992px){.template-tabbed{grid-template-areas:"header" "tabs" "runner";grid-template-columns:1fr;grid-template-rows:max-content 1fr 1fr}.template-tabbed .output-wrapper{border-left:0;border-top:var(--border)}}.template-choices{border:var(--border);border-radius:var(--elem-radius);display:grid;grid-template-areas:"header header" "choice runner";grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-rows:max-content 1fr;height:100%}@media (width <= 992px){.template-choices{grid-template-areas:"header" "choice" "runner";grid-template-columns:1fr}}.template-choices .choice-wrapper{border-right:var(--border);display:flex;flex-direction:column;grid-area:choice;overflow-y:auto;padding:1rem 0 1rem 1rem;row-gap:.4rem}@media (width <= 992px){.template-choices .choice-wrapper{border-bottom:var(--border);border-right:none;padding-right:1em}}:is(.template-choices .choice-wrapper) .choice{--csstools-light-dark-toggle-f9892825-0:var(--csstools-color-scheme--light) var(--color-blue-80);--field-focus-border:var(--csstools-light-dark-toggle-f9892825-0,var(--color-blue-50));--csstools-light-dark-toggle-f9892825-1:var(--csstools-color-scheme--light) var(--color-blue-10);--focus-01:0 0 0 3px var(--csstools-light-dark-toggle-f9892825-1,var(--color-blue-90));align-items:center;display:flex;flex-grow:1}@supports (color:light-dark(red,red)){:is(.template-choices .choice-wrapper) .choice{--field-focus-border:light-dark(var(--color-blue-50),var(--color-blue-80));--focus-01:0 0 0 3px light-dark(var(--color-blue-90),var(--color-blue-10))}}@supports not (color:light-dark(tan,tan)){:is(:is(.template-choices .choice-wrapper) .choice) *{--csstools-light-dark-toggle-f9892825-0:var(--csstools-color-scheme--light) var(--color-blue-80);--field-focus-border:var(--csstools-light-dark-toggle-f9892825-0,var(--color-blue-50));--csstools-light-dark-toggle-f9892825-1:var(--csstools-color-scheme--light) var(--color-blue-10);--focus-01:0 0 0 3px var(--csstools-light-dark-toggle-f9892825-1,var(--color-blue-90))}}:is(:is(.template-choices .choice-wrapper) .choice):after{background-color:currentcolor;color:var(--field-focus-border);content:"";display:block;height:1.25rem;margin:0 .75rem;mask-image:url(${m});mask-size:cover;opacity:0;width:1.25rem}@media (width <= 992px){:is(:is(.template-choices .choice-wrapper) .choice):after{display:none}}.selected:is(:is(.template-choices .choice-wrapper) .choice) mdn-play-editor{border-color:var(--field-focus-border);box-shadow:var(--focus-01);cursor:text}.selected:is(:is(.template-choices .choice-wrapper) .choice):after{opacity:1;transition:all .2s ease-out}.unsupported:is(:is(.template-choices .choice-wrapper) .choice){--csstools-light-dark-toggle-f9892825-2:var(--csstools-color-scheme--light) var(--color-yellow-80);--color-unsupported:var(--csstools-light-dark-toggle-f9892825-2,var(--color-yellow-50))}@supports (color:light-dark(red,red)){.unsupported:is(:is(.template-choices .choice-wrapper) .choice){--color-unsupported:light-dark(var(--color-yellow-50),var(--color-yellow-80))}}@supports not (color:light-dark(tan,tan)){.unsupported:is(:is(.template-choices .choice-wrapper) .choice) *{--csstools-light-dark-toggle-f9892825-2:var(--csstools-color-scheme--light) var(--color-yellow-80);--color-unsupported:var(--csstools-light-dark-toggle-f9892825-2,var(--color-yellow-50))}}.unsupported:is(:is(.template-choices .choice-wrapper) .choice) mdn-play-editor{border-color:var(--color-unsupported)}.unsupported:is(:is(.template-choices .choice-wrapper) .choice):after{background-color:var(--color-unsupported);mask-image:url(${u});mask-repeat:no-repeat;mask-size:contain;transition:none}:is(:is(.template-choices .choice-wrapper) .choice) mdn-play-editor{border:var(--border);border-radius:var(--elem-radius);cursor:pointer;width:100%}.template-choices .output-wrapper{height:300px;overflow:hidden}@media print{mdn-button{display:none!important}}`,
      ''
    ]);
    let g = (0, o.AH)([h.toString()]);
    r.d(t, {}, { A: g });
  },
  8238(e, t, r) {
    e.exports = r.p + 'chevron-right.a81fc439dd5e4839.svg';
  },
  78547(e, t, r) {
    e.exports = r.p + 'triangle-alert.cff4c57ccef57da3.svg';
  },
  79879(e, t, r) {
    (r.r(t),
      r.d(t, {
        InteractiveExampleBase: () => InteractiveExampleBase,
        MDNInteractiveExample: () => MDNInteractiveExample
      }));
    var o = r(22009),
      a = r(6616),
      i = r(23727),
      l = r(84352),
      s = r(65628),
      c = r(66067),
      n = r(12477),
      d = r(70693),
      p = r(63386),
      h = r(81519);
    function m(e) {
      let t = document.createElement('div');
      e = e.replaceAll(/(\/\*)[\s\S]+(\*\/)/g, '');
      let r = /^-(?:webkit|moz|ms|o)-/,
        o = t.style,
        a = e
          .split(';')
          .map(e => e.trim())
          .filter(e => e.length > 0);
      o.cssText = '';
      let i = new Set(),
        l = new Set();
      for (let e of a) {
        let t = o.cssText;
        o.cssText += e + ';';
        let a = o.cssText !== t,
          s = r.test(e),
          c = (function (e) {
            let t = r.exec(e),
              o = null === t ? '' : t[0];
            return (null === o ? e : e.slice(o.length)).split(/[\s:]/)[0] ?? '';
          })(e);
        a && s ? i.add(c) : a || s || l.add(c);
      }
      if (l.size > 0) {
        for (let e of i) l.delete(e);
        if (l.size > 0) return !1;
      }
      return !0;
    }
    (r(35268), r(23731), r(63657));
    let u = e =>
      class extends (0, d.J)(e) {
        static get properties() {
          return {
            __choiceSelected: { state: !0 },
            __choiceUnsupported: { state: !0 },
            __choiceUpdated: { state: !0 }
          };
        }
        constructor(...e) {
          (super(),
            (this.__choiceSelected = -1),
            (this.__choiceUnsupported = []),
            (this.__choiceUpdated = !1));
        }
        #e({ target: e }) {
          e instanceof p.MDNPlayEditor && e.focus();
        }
        #t({ target: e }) {
          e instanceof p.MDNPlayEditor && (this.#r(e), this.#o(e));
        }
        #a({ target: e }) {
          e instanceof p.MDNPlayEditor &&
            (this.#r(e),
            this.__choiceSelected === this.#i(e) && this.#o(e),
            (this.__choiceUpdated = !0));
        }
        #l() {
          ((this.__choiceSelected = -1), (this.__choiceUpdated = !1));
          let e = [
            ...(this.shadowRoot?.querySelectorAll('mdn-play-editor') || [])
          ];
          for (let [t, r] of [...e].entries())
            r.value = this._choices?.at(t) ?? '';
          this.__choiceUnsupported = this._choices?.map(e => !m(e || '')) || [];
          let t = e[0];
          t && this.#o(t);
        }
        async #o(e) {
          let t = this.#i(e);
          (await this._runner.value?.postMessage({
            typ: 'choice',
            code: e.value
          }),
            (this.__choiceSelected = t));
        }
        #r(e) {
          let t = this.#i(e);
          this.__choiceUnsupported = this.__choiceUnsupported.map((r, o) =>
            t === o ? !m(e.value) : r
          );
        }
        #i(e) {
          return Number.parseInt(e.dataset.index ?? '-1', 10);
        }
        #s() {
          let e = (0, h.O)();
          return (0, o.qy)`
        <div class="template-choices" aria-labelledby=${e}>
          <header>
            <h4 id=${e}>${(0, c.decode)(this.name)}</h4>
            <mdn-button
              id="reset"
              @click=${this._reset}
              variant="secondary"
              .disabled=${!this.__choiceUpdated}
              >${this.l10n('interactive-example-reset')`Reset`}</mdn-button
            >
          </header>
          <ul
            class="choice-wrapper"
            @click=${this.#e}
            @focus=${this.#t}
            @update=${this.#a}
            aria-label=${this.l10n('interactive-example-value-select')`Value select`}
          >
            ${this._choices?.map(
              (e, t) => (0, o.qy)`
                <li
                  class=${['choice', ...(t === this.__choiceSelected ? ['selected'] : []), ...(this.__choiceUnsupported[t] ? ['unsupported'] : [])].join(' ')}
                >
                  <mdn-play-editor
                    data-index=${t}
                    language="css"
                    minimal
                    .delay=${100}
                    .value=${e?.trim()}
                    aria-label=${(0, n.J)(this.__choiceUnsupported[t] ? this.l10n('interactive-example-the-current-value-is-not-support')`The current value is not supported by your browser.` : void 0)}
                  ></mdn-play-editor>
                </li>
              `
            )}
          </ul>
          <div class="output-wrapper">
            <mdn-play-controller ${(0, a.K)(this._controller)} run-on-start>
              <mdn-play-runner
                ${(0, a.K)(this._runner)}
                defaults="ix-choice"
                sandbox="allow-modals"
              ></mdn-play-runner>
            </mdn-play-controller>
          </div>
        </div>
      `;
        }
        _reset() {
          'choices' === this._template ? this.#l() : super._reset();
        }
        _initialCode() {
          let e = super._initialCode();
          return (
            'choices' === this._template &&
              (e['js-hidden'] =
                `setChoice(${JSON.stringify(this._choices?.[0])})`),
            e
          );
        }
        render() {
          return 'choices' === this._template ? this.#s() : super.render();
        }
        firstUpdated() {
          (super.firstUpdated(), 'choices' === this._template && this.#l());
        }
      };
    (r(56369), r(18977), r(89854), r(49979));
    let g = e =>
        class extends (0, d.J)(e) {
          #s() {
            let e = (0, h.O)();
            return (0, o.qy)`
        <mdn-play-controller ${(0, a.K)(this._controller)}>
          <div class="template-console" aria-labelledby=${e}>
            <header>
              <h4 id=${e}>${(0, c.decode)(this.name)}</h4>
            </header>
            ${
              1 === this._languages.length
                ? (0, o.qy)`<mdn-play-editor
                    id="editor"
                    language=${(0, n.J)(this._languages[0])}
                  ></mdn-play-editor>`
                : (0, o.qy)`<mdn-ix-tab-wrapper>
                    ${this._languages.map(
                      e => (0, o.qy)`
                        <mdn-ix-tab id=${e}
                          >${this._langName(e)}</mdn-ix-tab
                        >
                        <mdn-ix-tab-panel id=${`${e}-panel`}>
                          <mdn-play-editor language=${e}></mdn-play-editor>
                        </mdn-ix-tab-panel>
                      `
                    )}
                  </mdn-ix-tab-wrapper>`
            }
            <div class="buttons">
              <mdn-button
                id="execute"
                @click=${this._run}
                variant="secondary"
                title=${this.l10n('interactive-example-run-example-and-show-console-ou')`Run example, and show console output`}
                >${this.l10n('interactive-example-run')`Run`}</mdn-button
              >
              <mdn-button
                id="reset"
                @click=${this._reset}
                variant="secondary"
                title=${this.l10n('interactive-example-reset-example-and-clear-console')`Reset example, and clear console output`}
                >${this.l10n('interactive-example-reset')`Reset`}</mdn-button
              >
            </div>
            <mdn-play-console
              id="console"
              title=${this.l10n('interactive-example-console-output')`Console output`}
            ></mdn-play-console>
            <mdn-play-runner
              defaults=${(0, n.J)(this._languages.includes('wat') ? 'ix-wat' : void 0)}
              sandbox="allow-modals"
            ></mdn-play-runner>
          </div>
        </mdn-play-controller>
      `;
          }
          render() {
            return 'console' === this._template ? this.#s() : super.render();
          }
        },
      b = e =>
        class extends (0, d.J)(e) {
          #s() {
            let e = (0, h.O)();
            return (0, o.qy)`
        <mdn-play-controller
          ${(0, a.K)(this._controller)}
          run-on-start
          run-on-change
        >
          <div class="template-tabbed" aria-labelledby=${e}>
            <header>
              <h4 id=${e}>${(0, c.decode)(this.name)}</h4>
              <mdn-button id="reset" @click=${this._reset} variant="secondary"
                >${this.l10n('interactive-example-reset')`Reset`}</mdn-button
              >
            </header>
            <mdn-ix-tab-wrapper>
              ${this._languages.map(
                e => (0, o.qy)`
                  <mdn-ix-tab id=${e}>${this._langName(e)}</mdn-ix-tab>
                  <mdn-ix-tab-panel id=${`${e}-panel`}>
                    <mdn-play-editor language=${e}></mdn-play-editor>
                  </mdn-ix-tab-panel>
                `
              )}
            </mdn-ix-tab-wrapper>
            <div class="output-wrapper">
              <h4>${this.l10n('interactive-example-output')`Output`}</h4>
              <mdn-play-runner
                ${(0, a.K)(this._runner)}
                sandbox="allow-modals allow-top-navigation-by-user-activation"
                defaults="ix-tabbed"
              ></mdn-play-runner>
            </div>
          </div>
        </mdn-play-controller>
      `;
          }
          render() {
            return 'tabbed' === this._template ? this.#s() : super.render();
          }
        },
      v = ['focus', 'copy', 'cut', 'paste', 'click'];
    let InteractiveExampleBase = class InteractiveExampleBase extends o.WF {
      static ssr = !1;
      static get properties() {
        return { name: { type: String } };
      }
      static styles = s.A;
      constructor() {
        (super(), (this.name = ''), (this._languages = []), (this._code = {}));
      }
      _controller = (0, a._)();
      _runner = (0, a._)();
      _run() {
        this._controller.value?.run();
      }
      _reset() {
        this._controller.value?.reset();
      }
      _initialCode() {
        let e = {};
        for (let t of this.closest('section')?.querySelectorAll(
          '.code-example pre.interactive-example'
        ) ?? []) {
          let r = (0, l.upgradePre)(t);
          if (r) {
            let { language: t, code: o } = r;
            e[t] = e[t]
              ? `${e[t]}
${o}`
              : o;
          }
        }
        return (
          (this._choices = [
            ...(this.closest('section')?.querySelectorAll(
              '.code-example pre.interactive-example-choice'
            ) || [])
          ]
            .map(e => (0, l.upgradePre)(e)?.code.trim())
            .filter(e => void 0 !== e)),
          (this._languages = Object.keys(e)),
          (this._template =
            this._choices.length > 0
              ? 'choices'
              : (1 === this._languages.length && 'js' === this._languages[0]) ||
                  (this._languages.includes('js') &&
                    this._languages.includes('wat'))
                ? 'console'
                : 'tabbed'),
          e
        );
      }
      _langName(e) {
        return 'js' === e ? 'JavaScript' : e.toUpperCase();
      }
      _telemetryHandler(e) {
        let t = e.type;
        ('click' === e.type &&
          e.target instanceof HTMLElement &&
          e.target.id &&
          (t = `click@${e.target.id}`),
          (0, i.w)(`interactive-example: ${t}`));
      }
      connectedCallback() {
        for (let e of (super.connectedCallback(),
        (this._telemetryHandler = this._telemetryHandler.bind(this)),
        v))
          this.renderRoot.addEventListener(e, this._telemetryHandler);
        this._code = this._initialCode();
      }
      firstUpdated() {
        this._controller.value && (this._controller.value.code = this._code);
      }
      disconnectedCallback() {
        for (let e of (super.disconnectedCallback(), v))
          this.renderRoot.removeEventListener(e, this._telemetryHandler);
      }
    };
    let MDNInteractiveExample = class MDNInteractiveExample extends u(
      b(g(InteractiveExampleBase))
    ) {};
    customElements.define('interactive-example', MDNInteractiveExample);
  }
};
//# sourceMappingURL=9404.58bcacfbee13e4fa.js.map
