export const __rspack_esm_id = 7938;
export const __rspack_esm_ids = [7938];
export const __webpack_modules__ = {
  56706(e, t, n) {
    var a = n(22009),
      s = n(31601),
      o = n.n(s),
      i = n(76314),
      r = n.n(i)()(o());
    r.push([
      e.id,
      '.content-feedback{border:none;margin:0 0 .25rem;padding:0}.content-feedback>label{display:block;margin-bottom:.25rem}.content-feedback .thank-you{display:block;margin-bottom:calc(2.75rem + 2px)}.content-feedback mdn-button{flex:1;min-width:0}.content-feedback--buttons{display:inline-flex;gap:.75rem;margin:.25rem 0}.content-feedback--radios{align-items:center;display:flex;gap:.25rem;margin:.25rem 0}',
      ''
    ]);
    let c = (0, a.AH)([r.toString()]);
    n.d(t, {}, { A: c });
  },
  65929(e, t, n) {
    (n.r(t),
      n.d(t, { MDNContentFeedback: () => MDNContentFeedback }),
      n(35268));
    var a = n(22009),
      s = n(70693),
      o = n(23727);
    let i = (0,
      a.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88"/></svg>`,
      r = (0,
      a.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M7 10v12m8-16.12L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88"/></svg>`;
    var c = n(56706);
    let MDNContentFeedback = class MDNContentFeedback extends (0, s.J)(a.WF) {
      static styles = c.A;
      static get properties() {
        return {
          locale: { type: String },
          _reason: { state: !0 },
          _view: { state: !0 }
        };
      }
      constructor() {
        (super(),
          (this.locale = ''),
          (this._reason = ''),
          (this._view = 'vote'));
      }
      _handleVote({ target: e }) {
        if (e instanceof HTMLElement) {
          let t = e.dataset.vote;
          ('yes' === t
            ? (this._view = 'thanks')
            : 'no' === t && (this._view = 'feedback'),
            (0, o.w)(`thumbs: article-footer -> ${'yes' === t ? '1' : '0'}`));
        }
      }
      _handleFeedback() {
        ((this._view = 'thanks'),
          (0, o.w)(`article_footer: feedback -> ${this._reason}`));
      }
      _getFeedbackReasons() {
        return 'de' === this.locale
          ? [
              {
                key: 'technical',
                label: 'Übersetzung enthält fachliche Fehler'
              },
              {
                key: 'consistency',
                label: 'Begriffe sind inkonsistent übersetzt'
              },
              {
                key: 'incomprehensible',
                label: 'Übersetzung ist nicht verständlich'
              },
              {
                key: 'linguistic',
                label: 'Übersetzung enthält sprachliche Fehler'
              },
              {
                key: 'code_examples',
                label: 'Code-Beispiele funktionieren nicht'
              },
              { key: 'other', label: 'Sonstige' }
            ]
          : [
              {
                key: 'outdated',
                label: this.l10n(
                  'content-feedback-content-is-out-of-date'
                )`Content is out of date`
              },
              {
                key: 'incomplete',
                label: this.l10n(
                  'content-feedback-missing-information'
                )`Missing information`
              },
              {
                key: 'code_examples',
                label: this.l10n(
                  'content-feedback-code-examples-not-working-as-exp'
                )`Code examples not working as expected`
              },
              {
                key: 'other',
                label: this.l10n('content-feedback-other')`Other`
              }
            ];
      }
      _renderVote() {
        return (0, a.qy)`<label
        >${this.l10n('content-feedback-question')`Was this page helpful to you?`}
      </label>
      <div class="content-feedback--buttons">
        <mdn-button
          data-vote="yes"
          @click=${this._handleVote}
          .icon=${r}
          variant="secondary"
          action="positive"
        >
          ${this.l10n('content-feedback-yes')`Yes`}
        </mdn-button>
        <mdn-button
          data-vote="no"
          @click=${this._handleVote}
          .icon=${i}
          variant="secondary"
          action="negative"
        >
          ${this.l10n('content-feedback-no')`No`}
        </mdn-button>
      </div>`;
      }
      _renderFeedback() {
        let e = ({ target: e }) => {
            e instanceof HTMLInputElement && (this._reason = e.value);
          },
          t = this._getFeedbackReasons();
        return (0, a.qy)`<label
        >${this.l10n('content-feedback-reason')`Why was this page not helpful to you?`}</label
      >
      ${t.map(
        ({ key: t, label: n }) => (0,
        a.qy)`<div class="content-feedback--radios">
            <input
              type="radio"
              id=${`reason_${t}`}
              name="reason"
              .value=${t}
              ?checked=${this._reason === t}
              @change=${e}
            />
            <label for=${`reason_${t}`}>${n}</label>
          </div>`
      )}
      <div class="button-container">
        <mdn-button @click=${this._handleFeedback} ?disabled=${!this._reason}>
          ${this.l10n('content-feedback-submit')`Submit`}
        </mdn-button>
      </div>`;
      }
      _renderThanks() {
        return (0, a.qy)`<span class="thank-you">
      ${this.l10n('content-feedback-thanks')`Thank you for your feedback!`}
      <span class="emoji">❤️</span>
    </span>`;
      }
      _renderInner(e) {
        switch (e) {
          case 'vote':
            return this._renderVote();
          case 'feedback':
            return this._renderFeedback();
          case 'thanks':
            return this._renderThanks();
        }
      }
      render() {
        return (0, a.qy)`<fieldset class="content-feedback">
      ${this._renderInner(this._view)}
    </fieldset>`;
      }
    };
    customElements.define('mdn-content-feedback', MDNContentFeedback);
  }
};
//# sourceMappingURL=7938.07886f31308437a6.js.map
