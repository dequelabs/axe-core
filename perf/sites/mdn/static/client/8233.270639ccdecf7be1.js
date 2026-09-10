export const __rspack_esm_id = 8233;
export const __rspack_esm_ids = [8233];
export const __webpack_modules__ = {
  12911(e, t, n) {
    e.exports = n.p + 'watify_bg.e3ab88fab7f71ec6.wasm';
  },
  72624(e, t, n) {
    let a;
    function r(e) {
      let t = (function (e, t, n) {
          if (void 0 === n) {
            let n = c.encode(e),
              a = t(n.length, 1) >>> 0;
            return (
              o()
                .subarray(a, a + n.length)
                .set(n),
              (f = n.length),
              a
            );
          }
          let a = e.length,
            r = t(a, 1) >>> 0,
            i = o(),
            s = 0;
          for (; s < a; s++) {
            let t = e.charCodeAt(s);
            if (t > 127) break;
            i[r + s] = t;
          }
          if (s !== a) {
            (0 !== s && (e = e.slice(s)),
              (r = n(r, a, (a = s + 3 * e.length), 1) >>> 0));
            let t = o().subarray(r + s, r + a);
            ((s += c.encodeInto(e, t).written), (r = n(r, a, s, 1) >>> 0));
          }
          return ((f = s), r);
        })(e, a.__wbindgen_malloc, a.__wbindgen_realloc),
        n = f,
        r = a.watify(t, n);
      if (r[3]) {
        let e;
        throw (
          (i = r[2]),
          (e = a.__wbindgen_externrefs.get(i)),
          a.__externref_table_dealloc(i),
          e
        );
      }
      var i,
        s,
        l,
        _ = ((s = r[0]),
        (l = r[1]),
        (s >>>= 0),
        o().subarray(s / 1, s / 1 + l)).slice();
      return (a.__wbindgen_free(r[0], +r[1], 1), _);
    }
    let i = null;
    function o() {
      return (
        (null === i || 0 === i.byteLength) &&
          (i = new Uint8Array(a.memory.buffer)),
        i
      );
    }
    let s = new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 });
    s.decode();
    let l = 0,
      c = new TextEncoder();
    'encodeInto' in c ||
      (c.encodeInto = function (e, t) {
        let n = c.encode(e);
        return (t.set(n), { read: e.length, written: n.length });
      });
    let f = 0;
    async function _(e, t) {
      if ('function' == typeof Response && e instanceof Response) {
        if ('function' == typeof WebAssembly.instantiateStreaming)
          try {
            return await WebAssembly.instantiateStreaming(e, t);
          } catch (t) {
            if (
              e.ok &&
              (function (e) {
                switch (e) {
                  case 'basic':
                  case 'cors':
                  case 'default':
                    return !0;
                }
                return !1;
              })(e.type) &&
              'application/wasm' !== e.headers.get('Content-Type')
            )
              console.warn(
                '`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
                t
              );
            else throw t;
          }
        let n = await e.arrayBuffer();
        return await WebAssembly.instantiate(n, t);
      }
      {
        let n = await WebAssembly.instantiate(e, t);
        return n instanceof WebAssembly.Instance
          ? { instance: n, module: e }
          : n;
      }
    }
    async function u(e) {
      if (void 0 !== a) return a;
      (void 0 !== e &&
        (Object.getPrototypeOf(e) === Object.prototype
          ? ({ module_or_path: e } = e)
          : console.warn(
              'using deprecated parameters for the initialization function; pass a single object instead'
            )),
        void 0 === e && (e = new n.U(n(12911))),
        ('string' == typeof e ||
          ('function' == typeof Request && e instanceof Request) ||
          ('function' == typeof URL && e instanceof URL)) &&
          (e = fetch(e)));
      let { instance: t, module: r } = await _(await e, {
        __proto__: null,
        './watify_bg.js': {
          __proto__: null,
          __wbindgen_cast_0000000000000001: function (e, t) {
            var n, a, r, i;
            return (
              (n = e),
              (a = t),
              (r = n >>>= 0),
              (l += i = a) >= 0x7ff00000 &&
                ((s = new TextDecoder('utf-8', {
                  ignoreBOM: !0,
                  fatal: !0
                })).decode(),
                (l = i)),
              s.decode(o().subarray(r, r + i))
            );
          },
          __wbindgen_init_externref_table: function () {
            let e = a.__wbindgen_externrefs,
              t = e.grow(4);
            (e.set(0, void 0),
              e.set(t + 0, void 0),
              e.set(t + 1, null),
              e.set(t + 2, !0),
              e.set(t + 3, !1));
          }
        }
      });
      return ((a = t.exports), (i = null), a.__wbindgen_start(), a);
    }
    n.d(t, { default: () => u, watify: () => r });
  }
};
//# sourceMappingURL=8233.270639ccdecf7be1.js.map
