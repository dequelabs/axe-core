export const __rspack_esm_id = 9647;
export const __rspack_esm_ids = [9647];
export const __webpack_modules__ = {
  22130(e, t, o) {
    function n(e, t, { expires: o, maxAge: c, path: i = '/' }) {
      let s = [
        `${e}=${t}`,
        o && `expires=${o.toUTCString()}`,
        c && `max-age=${c}`,
        `path=${i}`,
        'localhost' !== document.location.hostname && 'secure'
      ]
        .filter(Boolean)
        .join(';');
      document.cookie = s;
    }
    o.d(t, { E_: () => i, rM: () => r, ud: () => s });
    let c = 'preferredlocale';
    function i() {
      let e;
      return (
        (e = document.cookie.split('; ').find(e => e.startsWith(`${c}=`))) &&
          e.includes('=') &&
          (e = e.split('=', 2)[1]),
        e
      );
    }
    function s(e) {
      n(c, e, { maxAge: 94608e3 });
    }
    function r() {
      n(c, '', { expires: new Date(0) });
    }
  }
};
//# sourceMappingURL=9647.28b4240dbab81568.js.map
