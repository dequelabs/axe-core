export const __rspack_esm_id = 169;
export const __rspack_esm_ids = [169];
export const __webpack_modules__ = {
  27376(t, e, i) {
    var r = i(22009),
      n = i(31601),
      l = i.n(n),
      s = i(76314),
      o = i.n(s),
      a = i(67168),
      h = i(39807),
      d = i(4417),
      c = i.n(d),
      p = new i.U(i(36956)),
      u = o()(l());
    (u.i(a.A), u.i(h.A));
    var f = c()(p);
    u.push([
      t.id,
      `:host{align-items:center;display:grid;grid-template-areas:"icon input button";grid-template-columns:2.2rem 1fr min-content}.icon{background-color:var(--color-text-secondary);content:"";grid-area:icon;height:1.25rem;justify-self:center;margin-left:.4rem;mask-image:url(${f});mask-size:cover;width:1.25rem}.input{background-color:initial;border:1px solid var(--color-border-primary);border-radius:var(--radius-full);grid-area:1/1/-1/-1;margin:0;padding:.3rem 4.2rem .3rem 2.2rem;width:100%}.input::placeholder{color:var(--color-text-secondary)}.input:focus{border-color:#0000}.counter{background-color:var(--color-background-yellow);border-radius:var(--radius-normal);font-size:var(--font-size-small);grid-area:input;justify-self:end;line-height:var(--font-line-ui);padding:.25rem;white-space:nowrap}.button{grid-area:button}.button::part(button){border-radius:50%}.button::part(button):hover{background-color:initial}:placeholder-shown~.button{visibility:hidden}`,
      ''
    ]);
    let g = (0, r.AH)([u.toString()]);
    i.d(e, {}, { A: g });
  },
  39807(t, e, i) {
    var r = i(31601),
      n = i.n(r),
      l = i(76314),
      s = i.n(l)()(n());
    s.push([
      t.id,
      '*,:after,:before{box-sizing:border-box}button,input,select,textarea{font:inherit}button{color:inherit;cursor:pointer}img{height:auto;max-width:100%}a{color:var(--color-link-normal)}[hidden]{display:none!important}#content{scroll-margin-block-start:var(--sticky-header-height)}',
      ''
    ]);
    let o = s.toString();
    i.d(e, {}, { A: o });
  },
  67168(t, e, i) {
    var r = i(31601),
      n = i.n(r),
      l = i(76314),
      s = i.n(l)()(n());
    s.push([
      t.id,
      '.visually-hidden{border:0!important;clip-path:inset(50%)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}',
      ''
    ]);
    let o = s.toString();
    i.d(e, {}, { A: o });
  },
  36956(t, e, i) {
    t.exports = i.p + 'filter.b77a4ccbfb57e2ef.svg';
  },
  50128(t, e, i) {
    var r = i(22009),
      n = i(70693),
      l = i(23727),
      s = i(10336),
      o = i(27376);
    let SidebarFilterer = class SidebarFilterer {
      constructor(t) {
        ((this.allHeadings = [...t.querySelectorAll('li strong')].filter(
          t => t instanceof HTMLElement
        )),
          (this.allParents = [...t.querySelectorAll('details')]));
        let e = [...t.querySelectorAll('a[href]')].filter(
          t => t instanceof HTMLAnchorElement
        );
        ((this.items = e.map(t => ({
          haystack: (t.textContent || '').toLowerCase(),
          link: t,
          container: this.getContainerOf(t),
          heading: this.getHeadingOf(t),
          parents: this.getParentsOf(t)
        }))),
          (this.toc = t.querySelector('.reference-toc') || null));
      }
      applyFilter(t) {
        if (t) return (this.toggleTOC(!1), this.showOnlyMatchingItems(t));
        (this.toggleTOC(!0), this.showAllItems());
      }
      toggleTOC(t) {
        this.toc && this.toggleElement(this.toc, t);
      }
      toggleElement(t, e) {
        t.style.display = e ? '' : 'none';
      }
      showAllItems() {
        for (let { link: t } of this.items) this.resetLink(t);
        for (let t of this.allHeadings) this.resetHeading(t);
        for (let t of this.allParents) this.resetParent(t);
      }
      resetLink(t) {
        this.resetHighlighting(t);
        let e = this.getContainerOf(t);
        this.toggleElement(e, !0);
      }
      getContainerOf(t) {
        return t.closest('li') || t;
      }
      resetHeading(t) {
        let e = this.getContainerOf(t);
        this.toggleElement(e, !0);
      }
      resetParent(t) {
        let e = this.getContainerOf(t);
        (this.toggleElement(e, !0),
          t.dataset.wasOpen &&
            ((t.open = JSON.parse(t.dataset.wasOpen)),
            delete t.dataset.wasOpen));
      }
      resetHighlighting(t) {
        let e = [
            ...t.querySelectorAll('span.sidebar-filter-mark-container, mark')
          ],
          i = new Set();
        for (let t of e) {
          let e = t.parentElement;
          (t.replaceWith(document.createTextNode(t.textContent || '')),
            e && i.add(e));
        }
        for (let t of i) t.normalize();
      }
      showOnlyMatchingItems(t) {
        for (let t of this.allHeadings) this.hideHeading(t);
        for (let t of this.allParents) this.collapseParent(t);
        let e = t.toLowerCase().split(/\s+/).filter(Boolean),
          i = 0;
        for (let {
          haystack: t,
          link: r,
          container: n,
          heading: l,
          parents: s
        } of this.items) {
          this.resetHighlighting(r);
          let o = e.every(e => t.includes(e));
          if ((this.toggleElement(n, o), o))
            for (let t of (i++,
            this.highlightMatches(r, e),
            l && this.showHeading(l),
            s))
              this.expandParent(t);
        }
        return i;
      }
      hideHeading(t) {
        let e = this.getContainerOf(t);
        this.toggleElement(e, !1);
      }
      collapseParent(t) {
        let e = this.getContainerOf(t);
        (this.toggleElement(e, !1),
          (t.dataset.wasOpen = t.dataset.wasOpen || String(t.open)),
          (t.open = !1));
      }
      highlightMatches(t, e) {
        for (let i of this.getTextNodesOf(t)) {
          let t = i.textContent?.toLowerCase();
          if (!t) continue;
          let r = new Map();
          for (let i of e) {
            let e = t.indexOf(i);
            -1 !== e && r.set(e, e + i.length);
          }
          let n = [...r.entries()].sort(([t, e], [i, r]) => t - i || e - r),
            l = this.replaceChildNode(i, 'span');
          l.className = 'sidebar-filter-mark-container';
          let s = [...l.childNodes].find(t => t instanceof Text);
          if (!s) continue;
          let o = s,
            a = 0;
          for (let [t, e] of n) {
            if (t < a) continue;
            let i = o.splitText(t - a),
              r = i.splitText(e - t);
            (this.replaceChildNode(i, 'mark'), (o = r), (a = e));
          }
        }
      }
      getTextNodesOf(t) {
        let e = [t],
          i = [];
        for (let t of e)
          for (let r of t.childNodes)
            r.nodeType === Node.TEXT_NODE
              ? i.push(r)
              : r.hasChildNodes && r.hasChildNodes() && e.push(r);
        return i;
      }
      replaceChildNode(t, e) {
        let i = t.textContent,
          r = document.createElement(e);
        return ((r.textContent = i || ''), t.replaceWith(r), r);
      }
      showHeading(t) {
        let e = t && this.getContainerOf(t);
        e && this.toggleElement(e, !0);
      }
      getHeadingOf(t) {
        return this.findFirstElementBefore(t, this.allHeadings);
      }
      findFirstElementBefore(t, e) {
        return e.findLast(
          e => e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING
        );
      }
      expandParent(t) {
        let e = this.getContainerOf(t);
        (this.toggleElement(e, !0), (t.open = !0));
      }
      getParentsOf(t) {
        let e = [],
          i = t.parentElement ? t.parentElement.closest('details') : null;
        for (; i;)
          (e.push(i),
            (i = i.parentElement ? i.parentElement.closest('details') : null));
        return e;
      }
    };
    i(35268);
    let MDNSidebarFilter = class MDNSidebarFilter extends (0, n.J)(r.WF) {
      static styles = o.A;
      static get properties() {
        return {
          query: { type: String },
          matchCount: { state: !0, type: Number }
        };
      }
      constructor() {
        (super(),
          (this.query = ''),
          (this.matchCount = void 0),
          (this.hasTyped = !1),
          (this._filterer = null),
          (this._quicklinks = null),
          (this._sidebarInnerNav = null));
      }
      firstUpdated() {
        ((this._quicklinks = document.querySelector('.left-sidebar')),
          this._quicklinks &&
            (this._sidebarInnerNav =
              this._quicklinks.querySelector('.left-sidebar__content') ||
              null));
      }
      _saveScrollPosition() {
        for (let t of [this._quicklinks, this._sidebarInnerNav])
          t &&
            void 0 === t.dataset.lastScrollTop &&
            t.scrollTop > 0 &&
            ((t.dataset.lastScrollTop = String(t.scrollTop)),
            (t.scrollTop = 0));
      }
      _restoreScrollPosition() {
        for (let t of [this._quicklinks, this._sidebarInnerNav])
          t &&
            'string' == typeof t.dataset.lastScrollTop &&
            ((t.scrollTop = Number(t.dataset.lastScrollTop)),
            delete t.dataset.lastScrollTop);
      }
      updated(t) {
        if (
          t.has('query') &&
          (this.query &&
            this.query.trim().length > 0 &&
            !this.hasTyped &&
            ((this.hasTyped = !0), (0, l.w)('sidebar_filter_typed')),
          this._quicklinks)
        ) {
          if (!this._filterer) {
            let t = this._quicklinks.querySelector('.left-sidebar__content');
            t instanceof HTMLElement &&
              (this._filterer = new SidebarFilterer(t));
          }
          let t = this.query.trim();
          if ((t && this._saveScrollPosition(), this._filterer)) {
            let e = this._filterer.applyFilter(t);
            this.matchCount = e;
          }
          t || this._restoreScrollPosition();
        }
      }
      _onFocus() {
        (0, l.w)('sidebar_filter_focus');
      }
      _onInput(t) {
        let e = t.target;
        this.query = e.value;
      }
      _clearFilter() {
        this.query = '';
      }
      render() {
        return (0, r.qy)`
      <label class="icon" for="input">
        <span class="visually-hidden"
          >${this.l10n('sidebar-filter-filter-sidebar')`Filter sidebar`}</span
        >
      </label>
      <input
        id="input"
        autocomplete="off"
        class="input"
        type="text"
        placeholder=${this.l10n('sidebar-filter-filter')`Filter`}
        .value=${this.query}
        @focus=${this._onFocus}
        @input=${this._onInput}
      />
      ${void 0 === this.matchCount ? '' : (0, r.qy)` <span class="counter"> ${this.matchCount} </span> `}
      <mdn-button
        class="button"
        variant="plain"
        .icon=${s.A}
        icon-only
        @click=${this._clearFilter}
        >${this.l10n('sidebar-filter-clear-filter-input')`Clear filter input`}</mdn-button
      >
    `;
      }
    };
    customElements.define('mdn-sidebar-filter', MDNSidebarFilter);
  }
};
//# sourceMappingURL=169.cb6acbd8b6db88b3.js.map
