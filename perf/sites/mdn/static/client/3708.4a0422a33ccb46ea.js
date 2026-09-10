/*! LICENSE: 3708.4a0422a33ccb46ea.js.LICENSE.txt */
export const __rspack_esm_id = 3708;
export const __rspack_esm_ids = [3708];
export const __webpack_modules__ = {
  84199(e, t, r) {
    r.d(t, { W: () => o });
    var s = r(36752),
      n = r(7804);
    let l = 'important',
      i = ' !' + l,
      o = (0, n.u$)(
        class extends n.WL {
          constructor(e) {
            if (
              (super(e),
              e.type !== n.OA.ATTRIBUTE ||
                'style' !== e.name ||
                e.strings?.length > 2)
            )
              throw Error(
                'The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.'
              );
          }
          render(e) {
            return Object.keys(e).reduce((t, r) => {
              let s = e[r];
              return null == s
                ? t
                : t +
                    `${(r = r.includes('-') ? r : r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, '-$&').toLowerCase())}:${s};`;
            }, '');
          }
          update(e, [t]) {
            let { style: r } = e.element;
            if (void 0 === this.ft)
              return ((this.ft = new Set(Object.keys(t))), this.render(t));
            for (let e of this.ft)
              null == t[e] &&
                (this.ft.delete(e),
                e.includes('-') ? r.removeProperty(e) : (r[e] = null));
            for (let e in t) {
              let s = t[e];
              if (null != s) {
                this.ft.add(e);
                let t = 'string' == typeof s && s.endsWith(i);
                e.includes('-') || t
                  ? r.setProperty(e, t ? s.slice(0, -11) : s, t ? l : '')
                  : (r[e] = s);
              }
            }
            return s.c0;
          }
        }
      );
  }
};
//# sourceMappingURL=3708.4a0422a33ccb46ea.js.map
