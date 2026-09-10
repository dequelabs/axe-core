/*! LICENSE: 7489.cd806d2f427a883d.js.LICENSE.txt */
export const __rspack_esm_id = 7489;
export const __rspack_esm_ids = [7489];
export const __webpack_modules__ = {
  6616(t, e, i) {
    i.d(e, { _: () => $, K: () => A });
    var s = i(36752),
      h = i(18504),
      o = i(7804);
    let n = (t, e) => {
        let i = t._$AN;
        if (void 0 === i) return !1;
        for (let t of i) (t._$AO?.(e, !1), n(t, e));
        return !0;
      },
      l = t => {
        let e, i;
        do {
          if (void 0 === (e = t._$AM)) break;
          ((i = e._$AN).delete(t), (t = e));
        } while (0 === i?.size);
      },
      _ = t => {
        for (let e; (e = t._$AM); t = e) {
          let i = e._$AN;
          if (void 0 === i) e._$AN = i = new Set();
          else if (i.has(t)) break;
          (i.add(t), c(e));
        }
      };
    function r(t) {
      void 0 !== this._$AN
        ? (l(this), (this._$AM = t), _(this))
        : (this._$AM = t);
    }
    function d(t, e = !1, i = 0) {
      let s = this._$AH,
        h = this._$AN;
      if (void 0 !== h && 0 !== h.size)
        if (e)
          if (Array.isArray(s))
            for (let t = i; t < s.length; t++) (n(s[t], !1), l(s[t]));
          else null != s && (n(s, !1), l(s));
        else n(this, t);
    }
    let c = t => {
      t.type == o.OA.CHILD && ((t._$AP ??= d), (t._$AQ ??= r));
    };
    let f = class f extends o.WL {
      constructor() {
        (super(...arguments), (this._$AN = void 0));
      }
      _$AT(t, e, i) {
        (super._$AT(t, e, i), _(this), (this.isConnected = t._$AU));
      }
      _$AO(t, e = !0) {
        (t !== this.isConnected &&
          ((this.isConnected = t),
          t ? this.reconnected?.() : this.disconnected?.()),
          e && (n(this, t), l(this)));
      }
      setValue(t) {
        if ((0, h.Rt)(this._$Ct)) this._$Ct._$AI(t, this);
        else {
          let e = [...this._$Ct._$AH];
          ((e[this._$Ci] = t), this._$Ct._$AI(e, this, 0));
        }
      }
      disconnected() {}
      reconnected() {}
    };
    let $ = () => new ref_h();
    let ref_h = class ref_h {};
    let a = new WeakMap(),
      A = (0, o.u$)(
        class extends f {
          render(t) {
            return s.s6;
          }
          update(t, [e]) {
            let i = e !== this.G;
            return (
              i && this.rt(void 0),
              (i || this.lt !== this.ct) &&
                ((this.G = e),
                (this.ht = t.options?.host),
                this.rt((this.ct = t.element))),
              s.s6
            );
          }
          rt(t) {
            if (void 0 !== this.G)
              if (
                (this.isConnected || (t = void 0), 'function' == typeof this.G)
              ) {
                let e = this.ht ?? globalThis,
                  i = a.get(e);
                (void 0 === i && ((i = new WeakMap()), a.set(e, i)),
                  void 0 !== i.get(this.G) && this.G.call(this.ht, void 0),
                  i.set(this.G, t),
                  void 0 !== t && this.G.call(this.ht, t));
              } else this.G.value = t;
          }
          get lt() {
            return 'function' == typeof this.G
              ? a.get(this.ht ?? globalThis)?.get(this.G)
              : this.G?.value;
          }
          disconnected() {
            this.lt === this.ct && this.rt(void 0);
          }
          reconnected() {
            this.rt(this.ct);
          }
        }
      );
  }
};
//# sourceMappingURL=7489.cd806d2f427a883d.js.map
