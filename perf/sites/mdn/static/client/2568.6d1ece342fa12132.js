export const __rspack_esm_id = 2568;
export const __rspack_esm_ids = [2568];
export const __webpack_modules__ = {
  5052(e, t, r) {
    var a = r(22009),
      s = r(31601),
      i = r.n(s),
      l = r(76314),
      o = r.n(l)()(i());
    o.push([
      e.id,
      ':host{display:flex;flex-direction:column;overflow:hidden}#tablist{background:var(--color-background-secondary);border-bottom:1px solid var(--color-border-primary);display:flex;flex-shrink:0;gap:.5rem;overflow-x:auto}',
      ''
    ]);
    let n = (0, a.AH)([o.toString()]);
    r.d(t, {}, { A: n });
  },
  49979(e, t, r) {
    r.r(t);
    var a = r(22009),
      s = r(5052);
    let MDNIXTabWrapper = class MDNIXTabWrapper extends a.WF {
      static styles = s.A;
      _getTab(e) {
        let t = [...this.querySelectorAll('mdn-ix-tab')];
        if ('first' === e) return t[0];
        if ('last' === e) return t.at(-1);
        let r = t.findIndex(e => e.isActive);
        return 'active' === e
          ? t[r]
          : 'prev' === e
            ? t.at((r - 1) % t.length)
            : 'next' === e
              ? t.at((r + 1) % t.length)
              : void 0;
      }
      _setTabActive(e, t = !1) {
        e &&
          (this._getTab('active')?.unsetActive(),
          e.setActive(),
          t && e.focus());
      }
      _tablistClick({ target: e }) {
        if (e instanceof HTMLElement) {
          let t = e.closest('mdn-ix-tab') || void 0;
          this._setTabActive(t);
        }
      }
      _tablistKeyDown(e) {
        let t;
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            t = 'next';
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            t = 'prev';
            break;
          case 'Home':
            t = 'first';
            break;
          case 'End':
            t = 'last';
            break;
          default:
            return;
        }
        (e.preventDefault(), this._setTabActive(this._getTab(t), !0));
      }
      render() {
        return (0, a.qy)`
      <div id="tablist" role="tablist">
        <slot
          name="tablist"
          @click=${this._tablistClick}
          @keydown=${this._tablistKeyDown}
        ></slot>
      </div>
      <slot name="active-panel"></slot>
    `;
      }
      firstUpdated() {
        this.querySelector('mdn-ix-tab')?.setActive();
      }
    };
    (customElements.define('mdn-ix-tab-wrapper', MDNIXTabWrapper),
      r.d(t, { MDNIXTabWrapper: () => MDNIXTabWrapper }));
  }
};
//# sourceMappingURL=2568.6d1ece342fa12132.js.map
