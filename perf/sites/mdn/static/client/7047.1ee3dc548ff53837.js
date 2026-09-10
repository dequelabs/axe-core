export const __rspack_esm_id = 7047;
export const __rspack_esm_ids = [7047];
export const __webpack_modules__ = {
  74711(t, e, a) {
    var i = a(22009),
      o = a(31601),
      s = a.n(o),
      n = a(76314),
      r = a.n(n),
      l = a(39807),
      d = r()(s());
    (d.i(l.A),
      d.push([
        t.id,
        ':host{display:block}.tablist-wrapper{background:var(--about-bg-secondary);margin:0 calc(var(--center-padding)*-1);margin-bottom:2rem;padding:0 var(--center-padding);position:sticky;top:var(--sticky-header-height);z-index:2}.tablist{border-bottom:1px solid var(--about-tablist-border);display:flex;gap:3rem;overflow-x:auto}::slotted([slot=tab]){color:var(--about-tablist-color)!important;flex-shrink:0;font-weight:400;-webkit-text-decoration:none;text-decoration:none}::slotted([slot=tab].active),::slotted([slot=tab]:hover){border-bottom:2px solid var(--about-tablist-active-border);color:var(--about-tablist-active-color)!important}::slotted([slot=panel]:not(.active)){display:none!important}::slotted([slot=panel].active){display:block}',
        ''
      ]));
    let c = (0, i.AH)([d.toString()]);
    a.d(e, {}, { A: c });
  },
  39807(t, e, a) {
    var i = a(31601),
      o = a.n(i),
      s = a(76314),
      n = a.n(s)()(o());
    n.push([
      t.id,
      '*,:after,:before{box-sizing:border-box}button,input,select,textarea{font:inherit}button{color:inherit;cursor:pointer}img{height:auto;max-width:100%}a{color:var(--color-link-normal)}[hidden]{display:none!important}#content{scroll-margin-block-start:var(--sticky-header-height)}',
      ''
    ]);
    let r = n.toString();
    a.d(e, {}, { A: r });
  },
  54842(t, e, a) {
    a.r(e);
    var i = a(22009),
      o = a(74711);
    let MDNAboutTabs = class MDNAboutTabs extends i.WF {
      static styles = o.A;
      static get properties() {
        return { active_index: { type: Number } };
      }
      constructor() {
        (super(), (this.active_index = 0));
      }
      firstUpdated() {
        if (null === this.shadowRoot) return;
        let t = this.shadowRoot.querySelector("slot[name='tab']");
        if (null === t) return;
        let e = globalThis.location.hash.slice(1);
        if (e) {
          let a = e.startsWith('our_team')
              ? 'our_team'
              : e.startsWith('our_partners') ||
                  'product_advisory_board' === e ||
                  'open_web_docs' === e
                ? 'our_partners'
                : e,
            i = t.assignedElements({ flatten: !0 });
          if (i && i.length > 0) {
            for (let [t, e] of i.entries())
              if (e instanceof HTMLElement && e.dataset.panelId === a) {
                this.active_index = t;
                break;
              }
          }
        }
        (t.addEventListener('slotchange', () => this._wireSlots()),
          this._wireSlots());
      }
      _wireSlots() {
        if (null === this.shadowRoot) return;
        let t = this.shadowRoot.querySelector('slot[name="tab"]');
        if (null === t) return;
        let e = t.assignedElements({ flatten: !0 }),
          a = this.shadowRoot.querySelector('slot[name="panel"]');
        if (null === a) return;
        let i = a.assignedElements({ flatten: !0 });
        for (let [t, a] of e.entries()) {
          (a.setAttribute('role', 'tab'),
            a.setAttribute(
              'aria-selected',
              (t === this.active_index).toString()
            ),
            a.setAttribute('tabindex', t === this.active_index ? '0' : '-1'),
            a.classList.toggle('active', t === this.active_index));
          let o = a => {
            (a.preventDefault(), this._activateTab(t, e, i));
          };
          (a.removeEventListener('click', a.__handleClick),
            a.addEventListener('click', o),
            (a.__handleClick = o));
          let s = a => {
            let o = this._nextTabIndex(a, t, e.length);
            null !== o && (a.preventDefault(), this._activateTab(o, e, i));
          };
          (a.removeEventListener('keydown', a.__handleKeydown),
            a.addEventListener('keydown', s),
            (a.__handleKeydown = s));
        }
        for (let [t, e] of i.entries())
          (e.setAttribute('role', 'tabpanel'),
            e.setAttribute('aria-hidden', (t !== this.active_index).toString()),
            e.classList.toggle('active', t === this.active_index),
            e.classList.add('tabpanel'));
      }
      _nextTabIndex(t, e, a) {
        return 'ArrowRight' === t.key
          ? (e + 1 + a) % a
          : 'ArrowLeft' === t.key
            ? (e - 1 + a) % a
            : null;
      }
      _activateTab(t, e, a) {
        this.active_index = t;
        let i = e[t];
        (i instanceof HTMLElement &&
          (i.dataset.panelId && (globalThis.location.hash = i.dataset.panelId),
          i.focus()),
          requestAnimationFrame(() => {
            let t = a[this.active_index];
            t &&
              t.getBoundingClientRect().top < 0 &&
              t.scrollIntoView({ block: 'start', inline: 'nearest' });
          }));
      }
      updated(t) {
        t.has('active_index') && this._wireSlots();
      }
      render() {
        return (0, i.qy)`
      <div class="tablist-wrapper">
        <div class="tablist" role="tablist" aria-orientation="horizontal">
          <slot name="tab"></slot>
        </div>
      </div>
      <slot name="panel"></slot>
    `;
      }
    };
    (customElements.define('mdn-about-tabs', MDNAboutTabs),
      a.d(e, { MDNAboutTabs: () => MDNAboutTabs }));
  }
};
//# sourceMappingURL=7047.1ee3dc548ff53837.js.map
