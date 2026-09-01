export const __rspack_esm_id = 4249;
export const __rspack_esm_ids = [4249];
export const __webpack_modules__ = {
  51360(e, t, s) {
    var r = s(36085),
      n = s(22009),
      i = s(6616),
      o = s(23727),
      a = s(91118),
      c = s(20126);
    s(13755);
    let d = e =>
      class extends e {
        static ssr = !1;
        _placementRef = (0, i._)();
        _dataTask = new r.YZ(this, { task: async () => await (0, c.M)() });
        constructor(...e) {
          (super(...e),
            (this._viewedUrl = void 0),
            (this._version = void 0),
            (this.viewed = new a.B(this, this._placementRef, () => {
              if (this._viewedUrl) {
                navigator.sendBeacon?.(
                  this.viewedLink(this._viewedUrl, this._version)
                );
                let e = this._placementRef.value?.dataset.type ?? 'unknown';
                (0, o.w)(`pong: pong->viewed ${e}`);
              }
            })));
        }
        connectedCallback() {
          (super.connectedCallback(), this._dataTask.run());
        }
        renderComplete(e) {
          throw Error('Must be implemented by subclass');
        }
        renderFallback() {
          return n.s6;
        }
        renderInitial() {
          return n.s6;
        }
        render() {
          return this._dataTask.render({
            initial: () => this.renderInitial(),
            pending: () => this.renderInitial(),
            error: () => this.renderFallback(),
            complete: e => this.renderComplete(e)
          });
        }
        clickLink(e, t) {
          return `/pong/click?code=${encodeURIComponent(e)}&version=${t}`;
        }
        imgLink(e) {
          return `/pimg/${encodeURIComponent(e || '')}`;
        }
        viewedLink(e, t) {
          return `/pong/viewed?code=${encodeURIComponent(e)}${t ? `&version=${t}` : ''}`;
        }
      };
    s.d(t, {}, { N: d });
  },
  91118(e, t, s) {
    var r = s(18376);
    let ViewedController = class ViewedController {
      #e;
      observer = null;
      constructor(e, t, s, r) {
        ((this.#e = e),
          this.#e.addController(this),
          (this.target = t),
          (this.callback = s),
          (this.observerOptions = r));
      }
      hostDisconnected() {
        (this.observer?.disconnect(), (this.observer = null));
      }
      hostUpdated() {
        let e = this.target.value;
        e &&
          !this.observer &&
          ((this.observer = new r.x(e, this.callback, this.observerOptions)),
          this.observer.connect());
      }
    };
    s.d(t, { B: () => ViewedController });
  }
};
//# sourceMappingURL=4249.f72e3bc533441dbe.js.map
