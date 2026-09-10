export const __rspack_esm_id = 7065;
export const __rspack_esm_ids = [7065];
export const __webpack_modules__ = {
  66489(e, t, s) {
    var o = s(22009),
      a = s(31601),
      l = s.n(a),
      c = s(76314),
      i = s.n(c),
      n = s(39807),
      r = s(17644),
      d = s(10576),
      m = i()(l());
    (m.i(n.A),
      m.i(r.A),
      m.i(d.A),
      m.push([
        e.id,
        '.code-example .example-header{gap:.5rem;padding-right:.5rem}:is(.code-example .example-header) .language-name{margin-right:auto}@media print{mdn-button,mdn-copy-button{display:none!important}}',
        ''
      ]));
    let p = (0, o.AH)([m.toString()]);
    s.d(t, {}, { A: p });
  },
  17644(e, t, s) {
    var o = s(31601),
      a = s.n(o),
      l = s(76314),
      c = s.n(l)()(a());
    c.push([
      e.id,
      ':is(.code-example,.css-formal-syntax) .token.cdata,:is(.code-example,.css-formal-syntax) .token.comment,:is(.code-example,.css-formal-syntax) .token.doctype,:is(.code-example,.css-formal-syntax) .token.prolog{--csstools-light-dark-toggle-360cf513-0:var(--csstools-color-scheme--light) #b3b3b3;color:var(--csstools-light-dark-toggle-360cf513-0,#51565d);color:light-dark(#51565d,#b3b3b3)}:is(.code-example,.css-formal-syntax) .token.punctuation{--csstools-light-dark-toggle-360cf513-1:var(--csstools-color-scheme--light) #b3b3b3;color:var(--csstools-light-dark-toggle-360cf513-1,#51565d);color:light-dark(#51565d,#b3b3b3)}:is(.code-example,.css-formal-syntax) .token.attr-name,:is(.code-example,.css-formal-syntax) .token.builtin,:is(.code-example,.css-formal-syntax) .token.class-name,:is(.code-example,.css-formal-syntax) .token.function,:is(.code-example,.css-formal-syntax) .token.inserted,:is(.code-example,.css-formal-syntax) .token.property,:is(.code-example,.css-formal-syntax) .token.selector{--csstools-light-dark-toggle-360cf513-2:var(--csstools-color-scheme--light) #ff97a0;color:var(--csstools-light-dark-toggle-360cf513-2,#d30038);color:light-dark(#d30038,#ff97a0)}:is(.code-example,.css-formal-syntax) .token.atrule,:is(.code-example,.css-formal-syntax) .token.attr-value{--csstools-light-dark-toggle-360cf513-3:var(--csstools-color-scheme--light) #00d061;color:var(--csstools-light-dark-toggle-360cf513-3,#007936);color:light-dark(#007936,#00d061)}:is(.code-example,.css-formal-syntax) .token.keyword{--csstools-light-dark-toggle-360cf513-4:var(--csstools-color-scheme--light) #c1cff1;color:var(--csstools-light-dark-toggle-360cf513-4,#0069c2);color:light-dark(#0069c2,#c1cff1)}:is(.code-example,.css-formal-syntax) .token.boolean,:is(.code-example,.css-formal-syntax) .token.char,:is(.code-example,.css-formal-syntax) .token.constant,:is(.code-example,.css-formal-syntax) .token.deleted,:is(.code-example,.css-formal-syntax) .token.number,:is(.code-example,.css-formal-syntax) .token.string,:is(.code-example,.css-formal-syntax) .token.symbol,:is(.code-example,.css-formal-syntax) .token.tag{--csstools-light-dark-toggle-360cf513-5:var(--csstools-color-scheme--light) #00d061;color:var(--csstools-light-dark-toggle-360cf513-5,#007936);color:light-dark(#007936,#00d061)}:is(.code-example,.css-formal-syntax) .token.builtin,:is(.code-example,.css-formal-syntax) .token.inserted,:is(.code-example,.css-formal-syntax) .token.selector,:is(.code-example,.css-formal-syntax) .token.template-string>.token.string{--csstools-light-dark-toggle-360cf513-6:var(--csstools-color-scheme--light) #bea5ff;color:var(--csstools-light-dark-toggle-360cf513-6,#872bff);color:light-dark(#872bff,#bea5ff)}:is(.code-example,.css-formal-syntax) .token.bold,:is(.code-example,.css-formal-syntax) .token.important{font-weight:700}:is(.code-example,.css-formal-syntax) .token.italic{font-style:italic}:is(.code-example,.css-formal-syntax) .token.entity{cursor:help}',
      ''
    ]);
    let i = c.toString();
    s.d(t, {}, { A: i });
  },
  84352(e, t, s) {
    s.r(t);
    var o = s(36085),
      a = s(22009),
      l = s(6616),
      c = s(76722);
    s(65517);
    var i = s(70693),
      n = s(66489);
    let r = new Set(['html', 'js', 'css', 'wat']);
    let MDNCodeExample = class MDNCodeExample extends (0, i.J)(a.WF) {
      static styles = n.A;
      static get properties() {
        return { language: { type: String }, code: { type: String } };
      }
      constructor() {
        (super(),
          (this.language = ''),
          (this.code = ''),
          (this._liveSample = void 0),
          (this._liveSampleUpdate = this._liveSampleUpdate.bind(this)));
      }
      get liveSample() {
        return this._liveSample;
      }
      set liveSample(e) {
        e &&
          (this._liveSample &&
            this._liveSample.removeEventListener(
              'mdn-play-runner-src',
              this._liveSampleUpdate
            ),
          (this._liveSample = e),
          this._liveSample.addEventListener(
            'mdn-play-runner-src',
            this._liveSampleUpdate
          ));
      }
      _liveSampleUpdate() {
        this.requestUpdate();
      }
      _codeRef = (0, l._)();
      _highlightTask = new o.YZ(this, {
        args: () => [this.language, this.code],
        task: async ([e, t]) => {
          let { highlightString: o } = await Promise.all([
            s.e(1825),
            s.e(7841)
          ]).then(s.bind(s, 94376));
          return o(t, e);
        }
      });
      render() {
        return (0, a.qy)`
      <div class="code-example">
        <div class="example-header">
          <span class="language-name">${this.language}</span>
          <mdn-copy-button
            .copiesFrom=${this._codeRef.value}
            variant="secondary"
          ></mdn-copy-button>
          ${
            this.liveSample?.breakoutLink
              ? (0, a.qy)`<mdn-button
                  variant="secondary"
                  href=${this.liveSample?.breakoutLink}
                  target="_blank"
                  rel="opener"
                  aria-label=${this.l10n('example-play-button-title')}
                  title=${this.l10n('example-play-button-title')}
                  >${this.l10n('example-play-button-label')}</mdn-button
                >`
              : a.s6
          }
        </div>
        <pre class=${this.className}><code ${(0, l.K)(this._codeRef)}>${this._highlightTask.render({ initial: () => this.code, pending: () => this.code, complete: e => (0, c._)(e) })}</code></pre>
      </div>
    `;
      }
    };
    function d(e) {
      if (e instanceof HTMLPreElement) {
        let t = e.closest('div.code-example'),
          s =
            [...e.classList].find(e => r.has(e)) ||
            t?.querySelector('.language-name')?.textContent?.trim(),
          o = [...e.classList].some(
            e => 'hidden' === e || e.startsWith('interactive-example')
          ),
          a = e.querySelector('code')?.textContent;
        if (t && s && a) {
          let l = document.createElement('mdn-code-example');
          return (
            (l.language = s),
            (l.code = a),
            (l.hidden = o),
            (l.className = e.className),
            t.replaceWith(l),
            l
          );
        }
      }
    }
    (customElements.define('mdn-code-example', MDNCodeExample),
      s.d(t, { MDNCodeExample: () => MDNCodeExample, upgradePre: () => d }));
  }
};
//# sourceMappingURL=7065.19649b1b5b436991.js.map
