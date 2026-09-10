export const __rspack_esm_id = 5909;
export const __rspack_esm_ids = [5909];
export const __webpack_modules__ = {
  20639(e) {
    e.exports = function e(r) {
      for (var t, n, o = Array.prototype.slice.call(arguments, 1); o.length;)
        for (n in (t = o.shift()))
          t.hasOwnProperty(n) &&
            ('[object Object]' === Object.prototype.toString.call(r[n])
              ? (r[n] = e(r[n], t[n]))
              : (r[n] = t[n]));
      return r;
    };
  },
  76314(e) {
    e.exports = function (e) {
      var r = [];
      return (
        (r.toString = function () {
          return this.map(function (r) {
            var t = '',
              n = void 0 !== r[5];
            return (
              r[4] && (t += '@supports ('.concat(r[4], ') {')),
              r[2] && (t += '@media '.concat(r[2], ' {')),
              n &&
                (t += '@layer'.concat(
                  r[5].length > 0 ? ' '.concat(r[5]) : '',
                  ' {'
                )),
              (t += e(r)),
              n && (t += '}'),
              r[2] && (t += '}'),
              r[4] && (t += '}'),
              t
            );
          }).join('');
        }),
        (r.i = function (e, t, n, o, a) {
          'string' == typeof e && (e = [[null, e, void 0]]);
          var i = {};
          if (n)
            for (var u = 0; u < this.length; u++) {
              var s = this[u][0];
              null != s && (i[s] = !0);
            }
          for (var l = 0; l < e.length; l++) {
            var f = [].concat(e[l]);
            (n && i[f[0]]) ||
              (void 0 !== a &&
                (void 0 === f[5] ||
                  (f[1] = '@layer'
                    .concat(f[5].length > 0 ? ' '.concat(f[5]) : '', ' {')
                    .concat(f[1], '}')),
                (f[5] = a)),
              t &&
                (f[2] &&
                  (f[1] = '@media '.concat(f[2], ' {').concat(f[1], '}')),
                (f[2] = t)),
              o &&
                (f[4]
                  ? ((f[1] = '@supports ('
                      .concat(f[4], ') {')
                      .concat(f[1], '}')),
                    (f[4] = o))
                  : (f[4] = ''.concat(o))),
              r.push(f));
          }
        }),
        r
      );
    };
  },
  4417(e) {
    e.exports = function (e, r) {
      return (r || (r = {}),
      e &&
        ((e = String(e.__esModule ? e.default : e)),
        /^['"].*['"]$/.test(e) && (e = e.slice(1, -1)),
        r.hash && (e += r.hash),
        /["'() \t\n]|(%20)/.test(e) || r.needQuotes))
        ? '"'.concat(e.replace(/"/g, '\\"').replace(/\n/g, '\\n'), '"')
        : e;
    };
  },
  31601(e) {
    e.exports = function (e) {
      return e[1];
    };
  },
  69861(e, r, t) {
    var n = Uint8Array,
      o = Uint16Array,
      a = Int32Array,
      i = new n([
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
        5, 5, 5, 5, 0, 0, 0, 0
      ]),
      u = new n([
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
        10, 11, 11, 12, 12, 13, 13, 0, 0
      ]),
      s = new n([
        16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
      ]),
      l = function (e, r) {
        for (var t = new o(31), n = 0; n < 31; ++n) t[n] = r += 1 << e[n - 1];
        for (var i = new a(t[30]), n = 1; n < 30; ++n)
          for (var u = t[n]; u < t[n + 1]; ++u) i[u] = ((u - t[n]) << 5) | n;
        return { b: t, r: i };
      },
      f = l(i, 2),
      c = f.b,
      h = f.r;
    ((c[28] = 258), (h[258] = 28));
    for (
      var p = l(u, 0), m = (p.b, p.r), d = new o(32768), v = 0;
      v < 32768;
      ++v
    ) {
      var g = ((43690 & v) >> 1) | ((21845 & v) << 1);
      ((g =
        ((61680 & (g = ((52428 & g) >> 2) | ((13107 & g) << 2))) >> 4) |
        ((3855 & g) << 4)),
        (d[v] = (((65280 & g) >> 8) | ((255 & g) << 8)) >> 1));
    }
    for (
      var y = function (e, r, t) {
          for (var n, a = e.length, i = 0, u = new o(r); i < a; ++i)
            e[i] && ++u[e[i] - 1];
          var s = new o(r);
          for (i = 1; i < r; ++i) s[i] = (s[i - 1] + u[i - 1]) << 1;
          if (t) {
            n = new o(1 << r);
            var l = 15 - r;
            for (i = 0; i < a; ++i)
              if (e[i])
                for (
                  var f = (i << 4) | e[i],
                    c = r - e[i],
                    h = s[e[i] - 1]++ << c,
                    p = h | ((1 << c) - 1);
                  h <= p;
                  ++h
                )
                  n[d[h] >> l] = f;
          } else
            for (n = new o(a), i = 0; i < a; ++i)
              e[i] && (n[i] = d[s[e[i] - 1]++] >> (15 - e[i]));
          return n;
        },
        w = new n(288),
        v = 0;
      v < 144;
      ++v
    )
      w[v] = 8;
    for (var v = 144; v < 256; ++v) w[v] = 9;
    for (var v = 256; v < 280; ++v) w[v] = 7;
    for (var v = 280; v < 288; ++v) w[v] = 8;
    for (var b = new n(32), v = 0; v < 32; ++v) b[v] = 5;
    var x = y(w, 9, 0),
      E = y(b, 5, 0),
      F = function (e) {
        return ((e + 7) / 8) | 0;
      },
      S = function (e, r, t) {
        return (
          (null == r || r < 0) && (r = 0),
          (null == t || t > e.length) && (t = e.length),
          new n(e.subarray(r, t))
        );
      },
      T = function (e, r, t) {
        t <<= 7 & r;
        var n = (r / 8) | 0;
        ((e[n] |= t), (e[n + 1] |= t >> 8));
      },
      N = function (e, r, t) {
        t <<= 7 & r;
        var n = (r / 8) | 0;
        ((e[n] |= t), (e[n + 1] |= t >> 8), (e[n + 2] |= t >> 16));
      },
      $ = function (e, r) {
        for (var t = [], a = 0; a < e.length; ++a)
          e[a] && t.push({ s: a, f: e[a] });
        var i = t.length,
          u = t.slice();
        if (!i) return { t: k, l: 0 };
        if (1 == i) {
          var s = new n(t[0].s + 1);
          return ((s[t[0].s] = 1), { t: s, l: 1 });
        }
        (t.sort(function (e, r) {
          return e.f - r.f;
        }),
          t.push({ s: -1, f: 25001 }));
        var l = t[0],
          f = t[1],
          c = 0,
          h = 1,
          p = 2;
        for (t[0] = { s: -1, f: l.f + f.f, l: l, r: f }; h != i - 1;)
          ((l = t[t[c].f < t[p].f ? c++ : p++]),
            (f = t[c != h && t[c].f < t[p].f ? c++ : p++]),
            (t[h++] = { s: -1, f: l.f + f.f, l: l, r: f }));
        for (var m = u[0].s, a = 1; a < i; ++a) u[a].s > m && (m = u[a].s);
        var d = new o(m + 1),
          v = _(t[h - 1], d, 0);
        if (v > r) {
          var a = 0,
            g = 0,
            y = v - r,
            w = 1 << y;
          for (
            u.sort(function (e, r) {
              return d[r.s] - d[e.s] || e.f - r.f;
            });
            a < i;
            ++a
          ) {
            var b = u[a].s;
            if (d[b] > r) ((g += w - (1 << (v - d[b]))), (d[b] = r));
            else break;
          }
          for (g >>= y; g > 0;) {
            var x = u[a].s;
            d[x] < r ? (g -= 1 << (r - d[x]++ - 1)) : ++a;
          }
          for (; a >= 0 && g; --a) {
            var E = u[a].s;
            d[E] == r && (--d[E], ++g);
          }
          v = r;
        }
        return { t: new n(d), l: v };
      },
      _ = function (e, r, t) {
        return -1 == e.s
          ? Math.max(_(e.l, r, t + 1), _(e.r, r, t + 1))
          : (r[e.s] = t);
      },
      O = function (e) {
        for (var r = e.length; r && !e[--r];);
        for (
          var t = new o(++r),
            n = 0,
            a = e[0],
            i = 1,
            u = function (e) {
              t[n++] = e;
            },
            s = 1;
          s <= r;
          ++s
        )
          if (e[s] == a && s != r) ++i;
          else {
            if (!a && i > 2) {
              for (; i > 138; i -= 138) u(32754);
              i > 2 &&
                (u(i > 10 ? ((i - 11) << 5) | 28690 : ((i - 3) << 5) | 12305),
                (i = 0));
            } else if (i > 3) {
              for (u(a), --i; i > 6; i -= 6) u(8304);
              i > 2 && (u(((i - 3) << 5) | 8208), (i = 0));
            }
            for (; i--;) u(a);
            ((i = 1), (a = e[s]));
          }
        return { c: t.subarray(0, n), n: r };
      },
      D = function (e, r) {
        for (var t = 0, n = 0; n < r.length; ++n) t += e[n] * r[n];
        return t;
      },
      M = function (e, r, t) {
        var n = t.length,
          o = F(r + 2);
        ((e[o] = 255 & n),
          (e[o + 1] = n >> 8),
          (e[o + 2] = 255 ^ e[o]),
          (e[o + 3] = 255 ^ e[o + 1]));
        for (var a = 0; a < n; ++a) e[o + a + 4] = t[a];
        return (o + 4 + n) * 8;
      },
      I = function (e, r, t, n, a, l, f, c, h, p, m) {
        (T(r, m++, t), ++a[256]);
        for (
          var d,
            v,
            g,
            F,
            S = $(a, 15),
            _ = S.t,
            I = S.l,
            A = $(l, 15),
            k = A.t,
            j = A.l,
            U = O(_),
            R = U.c,
            P = U.n,
            z = O(k),
            C = z.c,
            Z = z.n,
            q = new o(19),
            B = 0;
          B < R.length;
          ++B
        )
          ++q[31 & R[B]];
        for (var B = 0; B < C.length; ++B) ++q[31 & C[B]];
        for (
          var V = $(q, 7), W = V.t, G = V.l, J = 19;
          J > 4 && !W[s[J - 1]];
          --J
        );
        var L = (p + 5) << 3,
          Q = D(a, w) + D(l, b) + f,
          Y =
            D(a, _) +
            D(l, k) +
            f +
            14 +
            3 * J +
            D(q, W) +
            2 * q[16] +
            3 * q[17] +
            7 * q[18];
        if (h >= 0 && L <= Q && L <= Y) return M(r, m, e.subarray(h, h + p));
        if ((T(r, m, 1 + (Y < Q)), (m += 2), Y < Q)) {
          ((d = y(_, I, 0)), (v = _), (g = y(k, j, 0)), (F = k));
          var H = y(W, G, 0);
          (T(r, m, P - 257),
            T(r, m + 5, Z - 1),
            T(r, m + 10, J - 4),
            (m += 14));
          for (var B = 0; B < J; ++B) T(r, m + 3 * B, W[s[B]]);
          m += 3 * J;
          for (var K = [R, C], X = 0; X < 2; ++X)
            for (var ee = K[X], B = 0; B < ee.length; ++B) {
              var er = 31 & ee[B];
              (T(r, m, H[er]),
                (m += W[er]),
                er > 15 && (T(r, m, (ee[B] >> 5) & 127), (m += ee[B] >> 12)));
            }
        } else ((d = x), (v = w), (g = E), (F = b));
        for (var B = 0; B < c; ++B) {
          var et = n[B];
          if (et > 255) {
            var er = (et >> 18) & 31;
            (N(r, m, d[er + 257]),
              (m += v[er + 257]),
              er > 7 && (T(r, m, (et >> 23) & 31), (m += i[er])));
            var en = 31 & et;
            (N(r, m, g[en]),
              (m += F[en]),
              en > 3 && (N(r, m, (et >> 5) & 8191), (m += u[en])));
          } else (N(r, m, d[et]), (m += v[et]));
        }
        return (N(r, m, d[256]), m + v[256]);
      },
      A = new a([
        65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560,
        2117632
      ]),
      k = new n(0),
      j = function (e, r, t, s, l, f) {
        var c = f.z || e.length,
          p = new n(s + c + 5 * (1 + Math.ceil(c / 7e3)) + l),
          d = p.subarray(s, p.length - l),
          v = f.l,
          g = 7 & (f.r || 0);
        if (r) {
          g && (d[0] = f.r >> 3);
          for (
            var y = A[r - 1],
              w = y >> 13,
              b = 8191 & y,
              x = (1 << t) - 1,
              E = f.p || new o(32768),
              T = f.h || new o(x + 1),
              N = Math.ceil(t / 3),
              $ = 2 * N,
              _ = function (r) {
                return (e[r] ^ (e[r + 1] << N) ^ (e[r + 2] << $)) & x;
              },
              O = new a(25e3),
              D = new o(288),
              k = new o(32),
              j = 0,
              U = 0,
              R = f.i || 0,
              P = 0,
              z = f.w || 0,
              C = 0;
            R + 2 < c;
            ++R
          ) {
            var Z = _(R),
              q = 32767 & R,
              B = T[Z];
            if (((E[q] = B), (T[Z] = q), z <= R)) {
              var V = c - R;
              if ((j > 7e3 || P > 24576) && (V > 423 || !v)) {
                ((g = I(e, d, 0, O, D, k, U, P, C, R - C, g)),
                  (P = j = U = 0),
                  (C = R));
                for (var W = 0; W < 286; ++W) D[W] = 0;
                for (var W = 0; W < 30; ++W) k[W] = 0;
              }
              var G = 2,
                J = 0,
                L = b,
                Q = (q - B) & 32767;
              if (V > 2 && Z == _(R - Q))
                for (
                  var Y = Math.min(w, V) - 1,
                    H = Math.min(32767, R),
                    K = Math.min(258, V);
                  Q <= H && --L && q != B;
                ) {
                  if (e[R + G] == e[R + G - Q]) {
                    for (var X = 0; X < K && e[R + X] == e[R + X - Q]; ++X);
                    if (X > G) {
                      if (((G = X), (J = Q), X > Y)) break;
                      for (
                        var ee = Math.min(Q, X - 2), er = 0, W = 0;
                        W < ee;
                        ++W
                      ) {
                        var et = (R - Q + W) & 32767,
                          en = E[et],
                          eo = (et - en) & 32767;
                        eo > er && ((er = eo), (B = et));
                      }
                    }
                  }
                  ((B = E[(q = B)]), (Q += (q - B) & 32767));
                }
              if (J) {
                O[P++] = 0x10000000 | (h[G] << 18) | m[J];
                var ea = 31 & h[G],
                  ei = 31 & m[J];
                ((U += i[ea] + u[ei]),
                  ++D[257 + ea],
                  ++k[ei],
                  (z = R + G),
                  ++j);
              } else ((O[P++] = e[R]), ++D[e[R]]);
            }
          }
          for (R = Math.max(R, z); R < c; ++R) ((O[P++] = e[R]), ++D[e[R]]);
          ((g = I(e, d, v, O, D, k, U, P, C, R - C, g)),
            v ||
              ((f.r = (7 & g) | (d[(g / 8) | 0] << 3)),
              (g -= 7),
              (f.h = T),
              (f.p = E),
              (f.i = R),
              (f.w = z)));
        } else {
          for (var R = f.w || 0; R < c + v; R += 65535) {
            var eu = R + 65535;
            (eu >= c && ((d[(g / 8) | 0] = v), (eu = c)),
              (g = M(d, g + 1, e.subarray(R, eu))));
          }
          f.i = c;
        }
        return S(p, 0, s + F(g) + l);
      },
      U = (function () {
        for (var e = new Int32Array(256), r = 0; r < 256; ++r) {
          for (var t = r, n = 9; --n;) t = (1 & t && -0x12477ce0) ^ (t >>> 1);
          e[r] = t;
        }
        return e;
      })(),
      R = function () {
        var e = -1;
        return {
          p: function (r) {
            for (var t = e, n = 0; n < r.length; ++n)
              t = U[(255 & t) ^ r[n]] ^ (t >>> 8);
            e = t;
          },
          d: function () {
            return ~e;
          }
        };
      },
      P = function (e, r, t, o, a) {
        if (!a && ((a = { l: 1 }), r.dictionary)) {
          var i = r.dictionary.subarray(-32768),
            u = new n(i.length + e.length);
          (u.set(i), u.set(e, i.length), (e = u), (a.w = i.length));
        }
        return j(
          e,
          null == r.level ? 6 : r.level,
          null == r.mem
            ? a.l
              ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e.length))))
              : 20
            : 12 + r.mem,
          t,
          o,
          a
        );
      },
      z = function (e, r, t) {
        for (; t; ++r) ((e[r] = t), (t >>>= 8));
      },
      C = function (e, r) {
        var t = r.filename;
        if (
          ((e[0] = 31),
          (e[1] = 139),
          (e[2] = 8),
          (e[8] = r.level < 2 ? 4 : 2 * (9 == r.level)),
          (e[9] = 3),
          0 != r.mtime &&
            z(e, 4, Math.floor(new Date(r.mtime || Date.now()) / 1e3)),
          t)
        ) {
          e[3] = 8;
          for (var n = 0; n <= t.length; ++n) e[n + 10] = t.charCodeAt(n);
        }
      };
    function Z(e, r) {
      r || (r = {});
      var t,
        n = R(),
        o = e.length;
      n.p(e);
      var a = P(e, r, 10 + ((t = r).filename ? t.filename.length + 1 : 0), 8),
        i = a.length;
      return (C(a, r), z(a, i - 8, n.d()), z(a, i - 4, o), a);
    }
    var q = 'u' > typeof TextEncoder && new TextEncoder(),
      B = 'u' > typeof TextDecoder && new TextDecoder();
    try {
      B.decode(k, { stream: !0 });
    } catch (e) {}
    function V(e, r) {
      if (r) {
        for (var t = new n(e.length), o = 0; o < e.length; ++o)
          t[o] = e.charCodeAt(o);
        return t;
      }
      if (q) return q.encode(e);
      for (
        var a = e.length,
          i = new n(e.length + (e.length >> 1)),
          u = 0,
          s = function (e) {
            i[u++] = e;
          },
          o = 0;
        o < a;
        ++o
      ) {
        if (u + 5 > i.length) {
          var l = new n(u + 8 + ((a - o) << 1));
          (l.set(i), (i = l));
        }
        var f = e.charCodeAt(o);
        f < 128 || r
          ? s(f)
          : (f < 2048
              ? s(192 | (f >> 6))
              : (f > 55295 && f < 57344
                  ? (s(
                      240 |
                        ((f =
                          (65536 + (1047552 & f)) |
                          (1023 & e.charCodeAt(++o))) >>
                          18)
                    ),
                    s(128 | ((f >> 12) & 63)))
                  : s(224 | (f >> 12)),
                s(128 | ((f >> 6) & 63))),
            s(128 | (63 & f)));
      }
      return S(i, 0, u);
    }
    ('function' == typeof queueMicrotask && queueMicrotask,
      t.d(r, { _u: () => V, u3: () => Z }));
  },
  52126(e, r, t) {
    e.exports = {
      uris: t(12162)([
        'background',
        'base',
        'cite',
        'href',
        'longdesc',
        'src',
        'usemap'
      ])
    };
  },
  2921(e) {
    e.exports = {
      allowedAttributes: {
        a: ['href', 'name', 'target', 'title', 'aria-label'],
        iframe: ['allowfullscreen', 'frameborder', 'src'],
        img: ['src', 'alt', 'title', 'aria-label']
      },
      allowedClasses: {},
      allowedSchemes: ['http', 'https', 'mailto'],
      allowedTags: [
        'a',
        'abbr',
        'article',
        'b',
        'blockquote',
        'br',
        'caption',
        'code',
        'del',
        'details',
        'div',
        'em',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'hr',
        'i',
        'img',
        'ins',
        'kbd',
        'li',
        'main',
        'mark',
        'ol',
        'p',
        'pre',
        'section',
        'span',
        'strike',
        'strong',
        'sub',
        'summary',
        'sup',
        'table',
        'tbody',
        'td',
        'th',
        'thead',
        'tr',
        'u',
        'ul'
      ],
      filter: null
    };
  },
  3862(e, r, t) {
    e.exports = {
      voids: t(12162)([
        'area',
        'br',
        'col',
        'hr',
        'img',
        'wbr',
        'input',
        'base',
        'basefont',
        'link',
        'meta'
      ])
    };
  },
  81233(e, r, t) {
    t(87073);
    var n = t(20639),
      o = t(33120),
      a = t(56312),
      i = t(2921);
    function u(e, r, t) {
      var u = [];
      return (o(e, a(u, !0 === t ? r : n({}, i, r))), u.join(''));
    }
    ((u.defaults = i), (e.exports = u));
  },
  69382(e) {
    e.exports = function (e) {
      return 'string' == typeof e ? e.toLowerCase() : e;
    };
  },
  33120(e, r, t) {
    var n = t(87073),
      o = t(69382);
    t(52126);
    var a = t(3862),
      i =
        /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,
      u = /^<\s*\/\s*([\w:-]+)[^>]*>/,
      s =
        /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
      l = /^</,
      f = /^<\s*\//;
    e.exports = function (e, r) {
      for (
        var t,
          c,
          h =
            (((t = []).lastItem = function () {
              return t[t.length - 1];
            }),
            t),
          p = e;
        e;
      )
        !(function () {
          ((c = !0),
            '\x3c!--' === e.substr(0, 4)
              ? (function () {
                  var t = e.indexOf('--\x3e');
                  t >= 0 &&
                    (r.comment && r.comment(e.substring(4, t)),
                    (e = e.substring(t + 3)),
                    (c = !1));
                })()
              : f.test(e)
                ? m(u, v)
                : l.test(e) && m(i, d),
            (function () {
              if (c) {
                var t,
                  n = e.indexOf('<');
                (n >= 0
                  ? ((t = e.substring(0, n)), (e = e.substring(n)))
                  : ((t = e), (e = '')),
                  r.chars && r.chars(t));
              }
            })());
          var t = e === p;
          ((p = e), t && (e = ''));
        })();
      function m(r, t) {
        var n = e.match(r);
        n && ((e = e.substring(n[0].length)), n[0].replace(r, t), (c = !1));
      }
      function d(e, t, i, u) {
        var l = {},
          f = o(t),
          c = a.voids[f] || !!u;
        (i.replace(s, function (e, r, t, o, a) {
          void 0 === t && void 0 === o && void 0 === a
            ? (l[r] = void 0)
            : (l[r] = n.decode(t || o || a || ''));
        }),
          c || h.push(f),
          r.start && r.start(f, l, c));
      }
      function v(e, t) {
        var n,
          a = 0,
          i = o(t);
        if (i) for (a = h.length - 1; a >= 0 && h[a] !== i; a--);
        if (a >= 0) {
          for (n = h.length - 1; n >= a; n--) r.end && r.end(h[n]);
          h.length = a;
        }
      }
      v();
    };
  },
  56312(e, r, t) {
    var n = t(87073),
      o = t(69382),
      a = t(52126),
      i = t(3862);
    e.exports = function (e, r) {
      var t,
        u = r || {};
      return (
        l(),
        {
          start: function (e, r, l) {
            var f = o(e);
            t.ignoring ||
            -1 === (u.allowedTags || []).indexOf(f) ||
            (u.filter && !u.filter({ tag: f, attrs: r }))
              ? (function (e) {
                  !i.voids[e] &&
                    (!1 === t.ignoring
                      ? (t = { ignoring: e, depth: 1 })
                      : t.ignoring === e && t.depth++);
                })(f)
              : (s('<'),
                s(f),
                Object.keys(r).forEach(function (e) {
                  var t = r[e],
                    i = (u.allowedClasses || {})[f] || [],
                    l = (u.allowedAttributes || {})[f] || [],
                    c = o(e);
                  ('class' === c && -1 === l.indexOf(c)
                    ? (t = t
                        .split(' ')
                        .filter(function (e) {
                          return i && -1 !== i.indexOf(e);
                        })
                        .join(' ')
                        .trim()).length
                    : -1 !== l.indexOf(c) &&
                      (!0 !== a.uris[c] ||
                        (function (e) {
                          var r = e[0];
                          if ('#' === r || '/' === r) return !0;
                          var t = e.indexOf(':');
                          if (-1 === t) return !0;
                          var n = e.indexOf('?');
                          if (-1 !== n && t > n) return !0;
                          var o = e.indexOf('#');
                          return (
                            (-1 !== o && t > o) ||
                            u.allowedSchemes.some(function (r) {
                              return 0 === e.indexOf(r + ':');
                            })
                          );
                        })(t))) &&
                    (s(' '),
                    s(e),
                    'string' == typeof t && (s('="'), s(n.encode(t)), s('"')));
                }),
                s(l ? '/>' : '>'));
          },
          end: function (e) {
            var r = o(e);
            -1 !== (u.allowedTags || []).indexOf(r) && !1 === t.ignoring
              ? (s('</'), s(r), s('>'))
              : (function (e) {
                  t.ignoring === e && --t.depth <= 0 && l();
                })(r);
          },
          chars: function (e) {
            !1 === t.ignoring && s(u.transformText ? u.transformText(e) : e);
          }
        }
      );
      function s(r) {
        e.push(r);
      }
      function l() {
        t = { ignoring: !1, depth: 0 };
      }
    };
  },
  87073(e) {
    var r = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      },
      t = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'"
      },
      n = /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
      o = /[&<>"']/g;
    function a(e) {
      return r[e];
    }
    function i(e) {
      return t[e];
    }
    function u(e) {
      return null == e ? '' : String(e).replace(o, a);
    }
    function s(e) {
      return null == e ? '' : String(e).replace(n, i);
    }
    ((u.options = s.options = {}),
      (e.exports = {
        encode: u,
        escape: u,
        decode: s,
        unescape: s,
        version: '1.0.0-browser'
      }));
  },
  12162(e) {
    function r(e, r) {
      return ((e[r] = !0), e);
    }
    e.exports = function (e) {
      return e.reduce(r, {});
    };
  },
  45379(e, r, t) {
    t.d(r, { Np: () => FluentBundle, B$: () => FluentResource });
    let FluentType = class FluentType {
      constructor(e) {
        this.value = e;
      }
      valueOf() {
        return this.value;
      }
    };
    let FluentNone = class FluentNone extends FluentType {
      constructor(e = '???') {
        super(e);
      }
      toString(e) {
        return `{${this.value}}`;
      }
    };
    let FluentNumber = class FluentNumber extends FluentType {
      constructor(e, r = {}) {
        (super(e), (this.opts = r));
      }
      toString(e) {
        if (e)
          try {
            return e
              .memoizeIntlObject(Intl.NumberFormat, this.opts)
              .format(this.value);
          } catch (r) {
            e.reportError(r);
          }
        return this.value.toString(10);
      }
    };
    let FluentDateTime = class FluentDateTime extends FluentType {
      static supportsValue(e) {
        if ('number' == typeof e || e instanceof Date) return !0;
        if (e instanceof FluentType)
          return FluentDateTime.supportsValue(e.valueOf());
        if ('Temporal' in globalThis) {
          let r = globalThis.Temporal;
          if (
            e instanceof r.Instant ||
            e instanceof r.PlainDateTime ||
            e instanceof r.PlainDate ||
            e instanceof r.PlainMonthDay ||
            e instanceof r.PlainTime ||
            e instanceof r.PlainYearMonth
          )
            return !0;
        }
        return !1;
      }
      constructor(e, r = {}) {
        (e instanceof FluentDateTime
          ? ((r = { ...e.opts, ...r }), (e = e.value))
          : e instanceof FluentType && (e = e.valueOf()),
          'object' == typeof e &&
            'calendarId' in e &&
            void 0 === r.calendar &&
            (r = { ...r, calendar: e.calendarId }),
          super(e),
          (this.opts = r));
      }
      [Symbol.toPrimitive](e) {
        return 'string' === e ? this.toString() : this.toNumber();
      }
      toNumber() {
        let e = this.value;
        if ('number' == typeof e) return e;
        if (e instanceof Date) return e.getTime();
        if ('epochMilliseconds' in e) return e.epochMilliseconds;
        if ('toZonedDateTime' in e)
          return e.toZonedDateTime('UTC').epochMilliseconds;
        throw TypeError('Unwrapping a non-number value as a number');
      }
      toString(e) {
        if (e)
          try {
            return e
              .memoizeIntlObject(Intl.DateTimeFormat, this.opts)
              .format(this.value);
          } catch (r) {
            e.reportError(r);
          }
        return 'number' == typeof this.value || this.value instanceof Date
          ? new Date(this.value).toISOString()
          : this.value.toString();
      }
    };
    function n(e, r, t) {
      return r[t]
        ? u(e, r[t].value)
        : (e.reportError(RangeError('No default')), new FluentNone());
    }
    function o(e, r) {
      let t = [],
        n = Object.create(null);
      for (let o of r)
        'narg' === o.type ? (n[o.name] = a(e, o.value)) : t.push(a(e, o));
      return { positional: t, named: n };
    }
    function a(e, r) {
      switch (r.type) {
        case 'str':
          return r.value;
        case 'num':
          return new FluentNumber(r.value, {
            minimumFractionDigits: r.precision
          });
        case 'var':
          return (function (e, { name: r }) {
            let t;
            if (e.params)
              if (!Object.prototype.hasOwnProperty.call(e.params, r))
                return new FluentNone(`$${r}`);
              else t = e.params[r];
            else {
              if (!(e.args && Object.prototype.hasOwnProperty.call(e.args, r)))
                return (
                  e.reportError(ReferenceError(`Unknown variable: $${r}`)),
                  new FluentNone(`$${r}`)
                );
              t = e.args[r];
            }
            if (t instanceof FluentType) return t;
            switch (typeof t) {
              case 'string':
                return t;
              case 'number':
                return new FluentNumber(t);
              case 'object':
                if (FluentDateTime.supportsValue(t))
                  return new FluentDateTime(t);
              default:
                return (
                  e.reportError(
                    TypeError(`Variable type not supported: $${r}, ${typeof t}`)
                  ),
                  new FluentNone(`$${r}`)
                );
            }
          })(e, r);
        case 'mesg':
          return (function (e, { name: r, attr: t }) {
            let n = e.bundle._messages.get(r);
            if (!n)
              return (
                e.reportError(ReferenceError(`Unknown message: ${r}`)),
                new FluentNone(r)
              );
            if (t) {
              let o = n.attributes[t];
              return o
                ? u(e, o)
                : (e.reportError(ReferenceError(`Unknown attribute: ${t}`)),
                  new FluentNone(`${r}.${t}`));
            }
            return n.value
              ? u(e, n.value)
              : (e.reportError(ReferenceError(`No value: ${r}`)),
                new FluentNone(r));
          })(e, r);
        case 'term':
          return (function (e, { name: r, attr: t, args: n }) {
            let a = `-${r}`,
              i = e.bundle._terms.get(a);
            if (!i)
              return (
                e.reportError(ReferenceError(`Unknown term: ${a}`)),
                new FluentNone(a)
              );
            if (t) {
              let r = i.attributes[t];
              if (r) {
                e.params = o(e, n).named;
                let t = u(e, r);
                return ((e.params = null), t);
              }
              return (
                e.reportError(ReferenceError(`Unknown attribute: ${t}`)),
                new FluentNone(`${a}.${t}`)
              );
            }
            e.params = o(e, n).named;
            let s = u(e, i.value);
            return ((e.params = null), s);
          })(e, r);
        case 'func':
          return (function (e, { name: r, args: t }) {
            let n = e.bundle._functions[r];
            if (!n)
              return (
                e.reportError(ReferenceError(`Unknown function: ${r}()`)),
                new FluentNone(`${r}()`)
              );
            if ('function' != typeof n)
              return (
                e.reportError(TypeError(`Function ${r}() is not callable`)),
                new FluentNone(`${r}()`)
              );
            try {
              let r = o(e, t);
              return n(r.positional, r.named);
            } catch (t) {
              return (e.reportError(t), new FluentNone(`${r}()`));
            }
          })(e, r);
        case 'select':
          return (function (e, { selector: r, variants: t, star: o }) {
            let i = a(e, r);
            if (i instanceof FluentNone) return n(e, t, o);
            for (let r of t) {
              var s, l, f;
              let t = a(e, r.key);
              if (
                ((s = e),
                (l = i),
                (f = t) === l ||
                  (f instanceof FluentNumber &&
                    l instanceof FluentNumber &&
                    f.value === l.value) ||
                  (l instanceof FluentNumber &&
                    'string' == typeof f &&
                    f ===
                      s
                        .memoizeIntlObject(Intl.PluralRules, l.opts)
                        .select(l.value)) ||
                  0)
              )
                return u(e, r.value);
            }
            return n(e, t, o);
          })(e, r);
        default:
          return new FluentNone();
      }
    }
    function i(e, r) {
      if (e.dirty.has(r))
        return (
          e.reportError(RangeError('Cyclic reference')),
          new FluentNone()
        );
      e.dirty.add(r);
      let t = [],
        n = e.bundle._useIsolating && r.length > 1;
      for (let o of r) {
        if ('string' == typeof o) {
          t.push(e.bundle._transform(o));
          continue;
        }
        if ((e.placeables++, e.placeables > 100))
          throw (
            e.dirty.delete(r),
            RangeError(
              `Too many placeables expanded: ${e.placeables}, max allowed is 100`
            )
          );
        (n && t.push('⁨'), t.push(a(e, o).toString(e)), n && t.push('⁩'));
      }
      return (e.dirty.delete(r), t.join(''));
    }
    function u(e, r) {
      return 'string' == typeof r ? e.bundle._transform(r) : i(e, r);
    }
    let Scope = class Scope {
      constructor(e, r, t) {
        ((this.dirty = new WeakSet()),
          (this.params = null),
          (this.placeables = 0),
          (this.bundle = e),
          (this.errors = r),
          (this.args = t));
      }
      reportError(e) {
        if (!this.errors || !(e instanceof Error)) throw e;
        this.errors.push(e);
      }
      memoizeIntlObject(e, r) {
        let t = this.bundle._intls.get(e);
        t || ((t = {}), this.bundle._intls.set(e, t));
        let n = JSON.stringify(r);
        return (t[n] || (t[n] = new e(this.bundle.locales, r)), t[n]);
      }
    };
    function s(e, r) {
      let t = Object.create(null);
      for (let [n, o] of Object.entries(e))
        r.includes(n) && (t[n] = o.valueOf());
      return t;
    }
    let l = [
      'unitDisplay',
      'currencyDisplay',
      'useGrouping',
      'minimumIntegerDigits',
      'minimumFractionDigits',
      'maximumFractionDigits',
      'minimumSignificantDigits',
      'maximumSignificantDigits'
    ];
    function f(e, r) {
      let t = e[0];
      if (t instanceof FluentNone)
        return new FluentNone(`NUMBER(${t.valueOf()})`);
      if (t instanceof FluentNumber)
        return new FluentNumber(t.valueOf(), { ...t.opts, ...s(r, l) });
      if (t instanceof FluentDateTime)
        return new FluentNumber(t.toNumber(), { ...s(r, l) });
      throw TypeError('Invalid argument to NUMBER');
    }
    let c = [
      'dateStyle',
      'timeStyle',
      'fractionalSecondDigits',
      'dayPeriod',
      'hour12',
      'weekday',
      'era',
      'year',
      'month',
      'day',
      'hour',
      'minute',
      'second',
      'timeZoneName'
    ];
    function h(e, r) {
      let t = e[0];
      if (t instanceof FluentNone)
        return new FluentNone(`DATETIME(${t.valueOf()})`);
      if (t instanceof FluentDateTime || t instanceof FluentNumber)
        return new FluentDateTime(t, s(r, c));
      throw TypeError('Invalid argument to DATETIME');
    }
    let p = new Map();
    let FluentBundle = class FluentBundle {
      constructor(
        e,
        { functions: r, useIsolating: t = !0, transform: n = e => e } = {}
      ) {
        let o, a;
        ((this._terms = new Map()),
          (this._messages = new Map()),
          (this.locales = Array.isArray(e) ? e : [e]),
          (this._functions = { NUMBER: f, DATETIME: h, ...r }),
          (this._useIsolating = t),
          (this._transform = n),
          (this._intls =
            ((o = Array.isArray(e) ? e.join(' ') : e),
            void 0 === (a = p.get(o)) && ((a = new Map()), p.set(o, a)),
            a)));
      }
      hasMessage(e) {
        return this._messages.has(e);
      }
      getMessage(e) {
        return this._messages.get(e);
      }
      addResource(e, { allowOverrides: r = !1 } = {}) {
        let t = [];
        for (let n = 0; n < e.body.length; n++) {
          let o = e.body[n];
          if (o.id.startsWith('-')) {
            if (!1 === r && this._terms.has(o.id)) {
              t.push(Error(`Attempt to override an existing term: "${o.id}"`));
              continue;
            }
            this._terms.set(o.id, o);
          } else {
            if (!1 === r && this._messages.has(o.id)) {
              t.push(
                Error(`Attempt to override an existing message: "${o.id}"`)
              );
              continue;
            }
            this._messages.set(o.id, o);
          }
        }
        return t;
      }
      formatPattern(e, r = null, t = null) {
        if ('string' == typeof e) return this._transform(e);
        let n = new Scope(this, t, r);
        try {
          return i(n, e).toString(n);
        } catch (e) {
          if (n.errors && e instanceof Error)
            return (n.errors.push(e), new FluentNone().toString(n));
          throw e;
        }
      }
    };
    let m = /^(-?[a-zA-Z][\w-]*) *= */gm,
      d = /\.([a-zA-Z][\w-]*) *= */y,
      v = /\*?\[/y,
      g = /(-?[0-9]+(?:\.([0-9]+))?)/y,
      y = /([a-zA-Z][\w-]*)/y,
      w = /([$-])?([a-zA-Z][\w-]*)(?:\.([a-zA-Z][\w-]*))?/y,
      b = /^[A-Z][A-Z0-9_-]*$/,
      x = /([^{}\n\r]+)/y,
      E = /([^\\"\n\r]*)/y,
      F = /\\([\\"])/y,
      S = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{6})/y,
      T = /^\n+/,
      N = / +$/,
      $ = / *\r?\n/g,
      _ = /( *)$/,
      O = /{\s*/y,
      D = /\s*}/y,
      M = /\[\s*/y,
      I = /\s*] */y,
      A = /\s*\(\s*/y,
      k = /\s*->\s*/y,
      j = /\s*:\s*/y,
      U = /\s*,?\s*/y,
      R = /\s+/y;
    let FluentResource = class FluentResource {
      constructor(e) {
        ((this.body = []), (m.lastIndex = 0));
        let r = 0;
        for (;;) {
          let n = m.exec(e);
          if (null === n) break;
          r = m.lastIndex;
          try {
            this.body.push(
              (function (e) {
                let r = u(),
                  n = (function () {
                    let e = Object.create(null);
                    for (; t(d);) {
                      let r = i(d),
                        t = u();
                      if (null === t)
                        throw SyntaxError('Expected attribute value');
                      e[r] = t;
                    }
                    return e;
                  })();
                if (null === r && 0 === Object.keys(n).length)
                  throw SyntaxError('Expected message value or attributes');
                return { id: e, value: r, attributes: n };
              })(n[1])
            );
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
        function t(t) {
          return ((t.lastIndex = r), t.test(e));
        }
        function n(t, n) {
          if (e[r] === t) return (r++, !0);
          if (n) throw new n(`Expected ${t}`);
          return !1;
        }
        function o(e, n) {
          if (t(e)) return ((r = e.lastIndex), !0);
          if (n) throw new n(`Expected ${e.toString()}`);
          return !1;
        }
        function a(t) {
          t.lastIndex = r;
          let n = t.exec(e);
          if (null === n) throw SyntaxError(`Expected ${t.toString()}`);
          return ((r = t.lastIndex), n);
        }
        function i(e) {
          return a(e)[1];
        }
        function u() {
          let n;
          if ((t(x) && (n = i(x)), '{' === e[r] || '}' === e[r]))
            return s(n ? [n] : [], 1 / 0);
          let o = h();
          return o
            ? n
              ? s([n, o], o.length)
              : ((o.value = p(o.value, T)), s([o], o.length))
            : n
              ? p(n, N)
              : null;
        }
        function s(n = [], o) {
          for (;;) {
            if (t(x)) {
              n.push(i(x));
              continue;
            }
            if ('{' === e[r]) {
              n.push(l());
              continue;
            }
            if ('}' === e[r]) throw SyntaxError('Unbalanced closing brace');
            let a = h();
            if (a) {
              (n.push(a), (o = Math.min(o, a.length)));
              continue;
            }
            break;
          }
          let a = n.length - 1,
            u = n[a];
          'string' == typeof u && (n[a] = p(u, N));
          let f = [];
          for (let e of n)
            (e instanceof Indent && (e = e.value.slice(0, e.value.length - o)),
              e && f.push(e));
          return f;
        }
        function l() {
          o(O, SyntaxError);
          let s = (function n() {
            if ('{' === e[r]) return l();
            if (t(w)) {
              let [, t, i, u = null] = a(w);
              if ('$' === t) return { type: 'var', name: i };
              if (o(A)) {
                let a = (function () {
                  let t = [];
                  for (;;) {
                    switch (e[r]) {
                      case ')':
                        return (r++, t);
                      case void 0:
                        throw SyntaxError('Unclosed argument list');
                    }
                    (t.push(
                      (function () {
                        let e = n();
                        return 'mesg' !== e.type
                          ? e
                          : o(j)
                            ? { type: 'narg', name: e.name, value: f() }
                            : e;
                      })()
                    ),
                      o(U));
                  }
                })();
                if ('-' === t)
                  return { type: 'term', name: i, attr: u, args: a };
                if (b.test(i)) return { type: 'func', name: i, args: a };
                throw SyntaxError('Function names must be all upper-case');
              }
              return '-' === t
                ? { type: 'term', name: i, attr: u, args: [] }
                : { type: 'mesg', name: i, attr: u };
            }
            return f();
          })();
          if (o(D)) return s;
          if (o(k)) {
            let e = (function () {
              let e,
                r = [],
                a = 0;
              for (; t(v);) {
                n('*') && (e = a);
                let s = (function () {
                    let e;
                    return (
                      o(M, SyntaxError),
                      (e = t(g) ? c() : { type: 'str', value: i(y) }),
                      o(I, SyntaxError),
                      e
                    );
                  })(),
                  l = u();
                if (null === l) throw SyntaxError('Expected variant value');
                r[a++] = { key: s, value: l };
              }
              if (0 === a) return null;
              if (void 0 === e) throw SyntaxError('Expected default variant');
              return { variants: r, star: e };
            })();
            return (o(D, SyntaxError), { type: 'select', selector: s, ...e });
          }
          throw SyntaxError('Unclosed placeable');
        }
        function f() {
          if (t(g)) return c();
          if ('"' === e[r]) {
            n('"', SyntaxError);
            let o = '';
            for (;;) {
              if (((o += i(E)), '\\' === e[r])) {
                o += (function () {
                  if (t(F)) return i(F);
                  if (t(S)) {
                    let [, e, r] = a(S),
                      t = parseInt(e || r, 16);
                    return t <= 55295 || 57344 <= t
                      ? String.fromCodePoint(t)
                      : '�';
                  }
                  throw SyntaxError('Unknown escape sequence');
                })();
                continue;
              }
              if (n('"')) return { type: 'str', value: o };
              throw SyntaxError('Unclosed string literal');
            }
            return;
          }
          throw SyntaxError('Invalid expression');
        }
        function c() {
          let [, e, r = ''] = a(g),
            t = r.length;
          return { type: 'num', value: parseFloat(e), precision: t };
        }
        function h() {
          let t = r;
          switch ((o(R), e[r])) {
            case '.':
            case '[':
            case '*':
            case '}':
            case void 0:
              return !1;
            case '{':
              return P(e.slice(t, r));
          }
          return ' ' === e[r - 1] && P(e.slice(t, r));
        }
        function p(e, r) {
          return e.replace(r, '');
        }
        function P(e) {
          return new Indent(e.replace($, '\n'), _.exec(e)[1].length);
        }
      }
    };
    let Indent = class Indent {
      constructor(e, r) {
        ((this.value = e), (this.length = r));
      }
    };
  }
};
//# sourceMappingURL=5909.489e266d049aa182.js.map
