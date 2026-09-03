export const __rspack_esm_id = 4920;
export const __rspack_esm_ids = [4920];
export const __webpack_modules__ = {
  59416(t, e, o) {
    var i = o(22009),
      l = o(31601),
      s = o.n(l),
      n = o(76314),
      a = o.n(n),
      c = o(4417),
      r = o.n(c),
      d = new o.U(o(7438)),
      u = new o.U(o(77037)),
      h = a()(s()),
      _ = r()(d),
      m = r()(u);
    h.push([
      t.id,
      `.collection-save-button{align-items:center;background-color:initial;border:none;column-gap:.25rem;cursor:pointer;display:flex;font:inherit;margin:0;padding:0 .5rem}.collection-save-button:hover{background-color:var(--color-background-secondary)}.collection-save-button:before{background-color:currentcolor;content:"";display:inline-block;height:1.25rem;mask-size:cover;width:1.25rem}.collection-save-button[data-state=save]:before{mask-image:url(${_})}.collection-save-button[data-state=remove]:before{mask-image:url(${m})}@media (width <= 769px){.collection-save-button span{display:none}}label{display:block}`,
      ''
    ]);
    let p = (0, i.AH)([h.toString()]);
    o.d(e, {}, { A: p });
  },
  77037(t, e, o) {
    t.exports = o.p + 'bookmark-check.22b3511032ad3541.svg';
  },
  7438(t, e, o) {
    t.exports = o.p + 'bookmark.431a822761ea8a1e.svg';
  },
  1355(t, e, o) {
    o.r(e);
    var i = o(36085),
      l = o(22009),
      s = o(70693),
      n = o(23727),
      a = o(45742),
      c = o(59416);
    (o(14903), o(35268));
    let MDNCollectionSaveButton = class MDNCollectionSaveButton extends (0,
    s.J)(l.WF) {
      static ssr = !1;
      static styles = c.A;
      static get properties() {
        return {
          docUrl: { type: String, attribute: 'doc-url' },
          docTitle: { type: String, attribute: 'doc-title' },
          _item: { state: !0 },
          _pending: { state: !0 },
          _lastAction: { state: !0 }
        };
      }
      constructor() {
        (super(),
          (this.docUrl = ''),
          (this.docTitle = ''),
          (this._item = void 0),
          (this._pending = !1),
          (this._lastAction = void 0));
      }
      _user = new i.YZ(this, {
        task: async () => {
          let t = await (0, a.L)();
          return (t.isAuthenticated && this._bookmarks.run(), t);
        }
      });
      _collections = new i.YZ(this, {
        task: async () => {
          let t = await fetch('/api/v2/collections/');
          if (!t.ok) throw Error(`${t.status}: ${t.statusText}`);
          return await t.json();
        }
      });
      _bookmarks = new i.YZ(this, {
        autoRun: !1,
        args: () => [this.docUrl],
        task: async ([t]) => {
          let e = await fetch(
            `/api/v2/collections/lookup/?url=${encodeURIComponent(t)}`
          );
          if (!e.ok) throw Error(`${e.status}: ${e.statusText}`);
          let o = await e.json(),
            i = o?.results,
            l =
              i && i.map(t => ({ ...t.item, collection_id: t.collection_id }));
          if (l[0]) {
            let { collection_id: t, title: e, notes: o } = l[0];
            this._item = { collection_id: t, title: e, notes: o };
          }
          return l;
        }
      });
      _open() {
        ((this._selectFocusEventTriggered = !1),
          (0, n.w)('article_actions_collections_opened'),
          this._bookmarks.run(),
          this._collections.run(),
          this.shadowRoot?.querySelector('mdn-modal')?.showModal());
      }
      _selectOpen() {
        this._selectFocusEventTriggered ||
          ((0, n.w)('article_actions_collection_select_opened'),
          (this._selectFocusEventTriggered = !0));
      }
      _selectChange({ target: t }) {
        if (t instanceof HTMLSelectElement) {
          let { value: e } = t;
          if ('add' === e)
            ((0, n.w)('article_actions_new_collection'),
              this.shadowRoot?.querySelector('mdn-modal')?.close(),
              open('/en-US/plus/collections'));
          else {
            let t = this._bookmarks.value?.find(t => t.collection_id === e);
            this._item = t || { collection_id: e };
          }
        }
      }
      _cancel() {
        this.shadowRoot?.querySelector('mdn-modal')?.close();
      }
      async _delete() {
        let t = this.shadowRoot?.querySelector('select')?.value,
          e = this._bookmarks.value?.find(e => e.collection_id === t);
        if (t && e) {
          ((this._pending = !0), (this._lastAction = 'delete'));
          let o = await fetch(`/api/v2/collections/${t}/items/${e.id}/`, {
            method: 'DELETE'
          });
          (o.ok || console.error(`${o.status}: ${o.statusText}`),
            this.shadowRoot?.querySelector('mdn-modal')?.close(),
            (this._pending = !1),
            this._bookmarks.run());
        }
      }
      async _submit() {
        let t = this.shadowRoot?.querySelector('select')?.value,
          e = this._bookmarks.value?.find(e => e.collection_id === t);
        if (t) {
          ((this._pending = !0), (this._lastAction = 'save'));
          let o = `/api/v2/collections/${t}/items/${e ? `${e.id}/` : ''}`;
          (0, n.w)('new_collection_modal_submit_article_actions');
          let i = await fetch(o, {
            body: JSON.stringify({
              url: this.docUrl,
              title: this.shadowRoot?.querySelector('input')?.value,
              notes: this.shadowRoot?.querySelector('textarea')?.value
            }),
            method: 'POST',
            headers: { 'content-type': 'application/json' }
          });
          (i.ok || console.error(`${i.status}: ${i.statusText}`),
            this.shadowRoot?.querySelector('mdn-modal')?.close(),
            (this._pending = !1),
            this._bookmarks.run());
        }
      }
      connectedCallback() {
        (super.connectedCallback(), this._user.run());
      }
      willUpdate(t) {
        (t.has('docUrl') || t.has('docTitle')) &&
          (this._item = { url: this.docUrl, title: this.docTitle });
      }
      render() {
        let t =
          this._bookmarks.value?.some(
            t => t.collection_id === this._item?.collection_id
          ) || !1;
        return this._user.render({
          complete: e =>
            e.isAuthenticated
              ? (0, l.qy)`
              <button
                class="collection-save-button"
                data-state=${this._bookmarks.value?.length ? 'remove' : 'save'}
                title=${this.l10n('collection-save-button-save-in-collection')`Save in collection`}
                @click=${this._open}
              >
                <span
                  >${this._bookmarks.value?.length ? this.l10n('collection-save-button-remove')`Remove` : this.l10n('collection-save-button-save')`Save`}</span
                >
              </button>
              <mdn-modal
                modal-title=${this.l10n('collection-save-button-add-to-collection')`Add to collection`}
              >
                ${this._bookmarks.render({
                  initial: () => (0, l.qy)`<progress></progress>`,
                  pending: () => (0, l.qy)`<progress></progress>`,
                  complete: e =>
                    this._collections.render({
                      initial: () => (0, l.qy)`<progress></progress>`,
                      pending: () => (0, l.qy)`<progress></progress>`,
                      complete: o => (0, l.qy)`
                        <label>
                          ${this.l10n('collection-save-button-collection')`Collection:`}
                          <select
                            .value=${this._item?.collection_id}
                            @focus=${this._selectOpen}
                            @change=${this._selectChange}
                          >
                            ${o.map(
                              t => (0, l.qy)`
                                <option
                                  value=${t.id}
                                  ?selected=${t.id === this._item?.collection_id}
                                >
                                  ${e.some(e => e.collection_id === t.id) ? '★' : '☆'}
                                  ${'Default' === t.name ? this.l10n('collection-save-button-saved-articles')`Saved articles` : t.name}
                                </option>
                              `
                            )}
                            <option disabled role="separator">
                              ——————————
                            </option>
                            <option value=${'add'}>
                              +
                              ${this.l10n('collection-save-button-new-collection')`New collection`}
                            </option>
                          </select>
                        </label>
                        <label>
                          ${this.l10n('collection-save-button-name')`Name:`}
                          <input .value=${this._item?.title || this.docTitle} />
                        </label>
                        <label>
                          ${this.l10n('collection-save-button-note')`Note:`}
                          <textarea
                            .value=${this._item?.notes || ''}
                          ></textarea>
                        </label>
                        <mdn-button @click=${this._submit}>
                          ${this._pending && 'save' === this._lastAction ? this.l10n('collection-save-button-saving')`Saving…` : this.l10n('collection-save-button-save')`Save`}
                        </mdn-button>
                        <mdn-button
                          @click=${this._cancel}
                          ?disabled=${this._pending}
                          variant="secondary"
                        >
                          ${this.l10n('collection-save-button-cancel')`Cancel`}
                        </mdn-button>
                        ${
                          e?.length
                            ? (0, l.qy)`<mdn-button
                                @click=${this._delete}
                                variant="secondary"
                                action="negative"
                                id="bookmark-delete"
                                ?disabled=${this._pending || !t}
                              >
                                ${this._pending && 'delete' === this._lastAction ? this.l10n('collection-save-button-deleting')`Deleting…` : this.l10n('collection-save-button-delete')`Delete`}
                              </mdn-button>`
                            : l.s6
                        }
                      `
                    })
                })}
              </mdn-modal>
            `
              : l.s6
        });
      }
    };
    (customElements.define(
      'mdn-collection-save-button',
      MDNCollectionSaveButton
    ),
      o.d(e, { MDNCollectionSaveButton: () => MDNCollectionSaveButton }));
  }
};
//# sourceMappingURL=4920.a37ab55f7abde7d9.js.map
