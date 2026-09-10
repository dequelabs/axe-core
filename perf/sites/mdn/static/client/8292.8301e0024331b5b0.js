export const __rspack_esm_id = 8292;
export const __rspack_esm_ids = [8292];
export const __webpack_modules__ = {
  68463(e, t, u) {
    var r,
      n = Object.defineProperty,
      D = (e, t) => {
        for (var u in t) n(e, u, { get: t[u], enumerable: !0 });
      };
    D(
      {},
      {
        __debug: () => u6,
        check: () => u8,
        doc: () => u_,
        format: () => u1,
        formatWithCursor: () => u2,
        getSupportInfo: () => u3,
        util: () => uT,
        version: () => uP
      }
    );
    var i =
        (e, t) =>
        (u, r, ...n) =>
          1 | u && null == r ? void 0 : (t.call(r) ?? r[e]).apply(r, n),
      o =
        String.prototype.replaceAll ??
        function (e, t) {
          return e.global ? this.replace(e, t) : this.split(e).join(t);
        },
      a = i('replaceAll', function () {
        if ('string' == typeof this) return o;
      }),
      s = class {
        diff(e, t, u = {}) {
          let r;
          'function' == typeof u
            ? ((r = u), (u = {}))
            : 'callback' in u && (r = u.callback);
          let n = this.castInput(e, u),
            D = this.castInput(t, u),
            i = this.removeEmpty(this.tokenize(n, u)),
            o = this.removeEmpty(this.tokenize(D, u));
          return this.diffWithOptionsObj(i, o, u, r);
        }
        diffWithOptionsObj(e, t, u, r) {
          var n;
          let D = e =>
              ((e = this.postProcess(e, u)), r)
                ? void setTimeout(function () {
                    r(e);
                  }, 0)
                : e,
            i = t.length,
            o = e.length,
            a = 1,
            s = i + o;
          null != u.maxEditLength && (s = Math.min(s, u.maxEditLength));
          let l = null != (n = u.timeout) ? n : 1 / 0,
            c = Date.now() + l,
            F = [{ oldPos: -1, lastComponent: void 0 }],
            f = this.extractCommon(F[0], t, e, 0, u);
          if (F[0].oldPos + 1 >= o && f + 1 >= i)
            return D(this.buildValues(F[0].lastComponent, t, e));
          let d = -1 / 0,
            p = 1 / 0,
            h = () => {
              for (let r = Math.max(d, -a); r <= Math.min(p, a); r += 2) {
                let n,
                  a = F[r - 1],
                  s = F[r + 1];
                a && (F[r - 1] = void 0);
                let l = !1;
                if (s) {
                  let e = s.oldPos - r;
                  l = s && 0 <= e && e < i;
                }
                let c = a && a.oldPos + 1 < o;
                if (!l && !c) {
                  F[r] = void 0;
                  continue;
                }
                if (
                  ((n =
                    !c || (l && a.oldPos < s.oldPos)
                      ? this.addToPath(s, !0, !1, 0, u)
                      : this.addToPath(a, !1, !0, 1, u)),
                  (f = this.extractCommon(n, t, e, r, u)),
                  n.oldPos + 1 >= o && f + 1 >= i)
                )
                  return D(this.buildValues(n.lastComponent, t, e)) || !0;
                ((F[r] = n),
                  n.oldPos + 1 >= o && (p = Math.min(p, r - 1)),
                  f + 1 >= i && (d = Math.max(d, r + 1)));
              }
              a++;
            };
          if (r)
            !(function e() {
              setTimeout(function () {
                if (a > s || Date.now() > c) return r(void 0);
                h() || e();
              }, 0);
            })();
          else
            for (; a <= s && Date.now() <= c;) {
              let e = h();
              if (e) return e;
            }
        }
        addToPath(e, t, u, r, n) {
          let D = e.lastComponent;
          return D && !n.oneChangePerToken && D.added === t && D.removed === u
            ? {
                oldPos: e.oldPos + r,
                lastComponent: {
                  count: D.count + 1,
                  added: t,
                  removed: u,
                  previousComponent: D.previousComponent
                }
              }
            : {
                oldPos: e.oldPos + r,
                lastComponent: {
                  count: 1,
                  added: t,
                  removed: u,
                  previousComponent: D
                }
              };
        }
        extractCommon(e, t, u, r, n) {
          let D = t.length,
            i = u.length,
            o = e.oldPos,
            a = o - r,
            s = 0;
          for (; a + 1 < D && o + 1 < i && this.equals(u[o + 1], t[a + 1], n);)
            (a++,
              o++,
              s++,
              n.oneChangePerToken &&
                (e.lastComponent = {
                  count: 1,
                  previousComponent: e.lastComponent,
                  added: !1,
                  removed: !1
                }));
          return (
            s &&
              !n.oneChangePerToken &&
              (e.lastComponent = {
                count: s,
                previousComponent: e.lastComponent,
                added: !1,
                removed: !1
              }),
            (e.oldPos = o),
            a
          );
        }
        equals(e, t, u) {
          return u.comparator
            ? u.comparator(e, t)
            : e === t ||
                (!!u.ignoreCase && e.toLowerCase() === t.toLowerCase());
        }
        removeEmpty(e) {
          let t = [];
          for (let u = 0; u < e.length; u++) e[u] && t.push(e[u]);
          return t;
        }
        castInput(e, t) {
          return e;
        }
        tokenize(e, t) {
          return Array.from(e);
        }
        join(e) {
          return e.join('');
        }
        postProcess(e, t) {
          return e;
        }
        get useLongestToken() {
          return !1;
        }
        buildValues(e, t, u) {
          let r = [],
            n;
          for (; e;)
            (r.push(e),
              (n = e.previousComponent),
              delete e.previousComponent,
              (e = n));
          r.reverse();
          let D = r.length,
            i = 0,
            o = 0,
            a = 0;
          for (; i < D; i++) {
            let e = r[i];
            if (e.removed)
              ((e.value = this.join(u.slice(a, a + e.count))), (a += e.count));
            else {
              if (!e.added && this.useLongestToken) {
                let r = t.slice(o, o + e.count);
                ((r = r.map(function (e, t) {
                  let r = u[a + t];
                  return r.length > e.length ? r : e;
                })),
                  (e.value = this.join(r)));
              } else e.value = this.join(t.slice(o, o + e.count));
              ((o += e.count), e.added || (a += e.count));
            }
          }
          return r;
        }
      },
      l = new (class extends s {
        tokenize(e) {
          return e.slice();
        }
        join(e) {
          return e;
        }
        removeEmpty(e) {
          return e;
        }
      })(),
      c = () => {},
      F = 'crlf',
      f = `\r
`,
      d = `
`;
    function p(e) {
      return 'cr' === e ? '\r' : e === F ? f : d;
    }
    var h = new Map([
      [d, /\n/g],
      ['\r', /\r/g],
      [f, /\r\n/g]
    ]);
    function C(e, t) {
      let u = h.get(t);
      return e.match(u)?.length ?? 0;
    }
    var E = /\r\n?/g,
      m = Symbol.for('comments');
    function g(e) {
      return this[e < 0 ? this.length + e : e];
    }
    var y = i('at', function () {
        if (Array.isArray(this) || 'string' == typeof this) return g;
      }),
      B = 'string',
      A = 'array',
      b = 'cursor',
      v = 'indent',
      w = 'align',
      k = 'trim',
      S = 'group',
      x = 'fill',
      _ = 'if-break',
      O = 'indent-if-break',
      N = 'line-suffix',
      j = 'line-suffix-boundary',
      P = 'line',
      T = 'label',
      L = 'break-parent',
      $ = new Set([b, v, w, k, S, x, _, O, N, j, P, T, L]);
    function I(e, t, u) {
      if (!e.has(t)) {
        let r = u(t);
        e.set(t, r);
      }
      return e.get(t);
    }
    var R = function (e) {
        if ('string' == typeof e) return B;
        if (Array.isArray(e)) return A;
        if (!e) return;
        let { type: t } = e;
        if ($.has(t)) return t;
      },
      M = class extends Error {
        name = 'InvalidDocError';
        constructor(e) {
          (super(
            (function (e) {
              let t,
                u = null === e ? 'null' : typeof e;
              if ('string' !== u && 'object' !== u)
                return `Unexpected doc '${u}', 
Expected it to be 'string' or 'object'.`;
              if (R(e)) throw Error('doc is valid.');
              let r = Object.prototype.toString.call(e);
              if ('[object Object]' !== r) return `Unexpected doc '${r}'.`;
              let n =
                ((t = [...$].map(e => `'${e}'`)),
                new Intl.ListFormat('en-US', { type: 'disjunction' }).format(
                  t
                ));
              return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`;
            })(e)
          ),
            (this.doc = e));
        }
      },
      W = {},
      V = function (e, t, u, r) {
        let n = [e];
        for (; n.length > 0;) {
          let e = n.pop();
          if (e === W) {
            u(n.pop());
            continue;
          }
          u && n.push(e, W);
          let D = R(e);
          if (!D) throw new M(e);
          if (t?.(e) !== !1)
            switch (D) {
              case A:
              case x: {
                let t = D === A ? e : e.parts;
                for (let e = t.length, u = e - 1; u >= 0; --u) n.push(t[u]);
                break;
              }
              case _:
                n.push(e.flatContents, e.breakContents);
                break;
              case S:
                if (r && e.expandedStates)
                  for (let t = e.expandedStates.length, u = t - 1; u >= 0; --u)
                    n.push(e.expandedStates[u]);
                else n.push(e.contents);
                break;
              case w:
              case v:
              case O:
              case T:
              case N:
                n.push(e.contents);
                break;
              case B:
              case b:
              case k:
              case j:
              case P:
              case L:
                break;
              default:
                throw new M(e);
            }
        }
      };
    function z(e, t) {
      if ('string' == typeof e) return t(e);
      let u = new Map();
      return r(e);
      function r(e) {
        return I(u, e, n);
      }
      function n(e) {
        switch (R(e)) {
          case A:
            return t(e.map(r));
          case x:
            return t({ ...e, parts: e.parts.map(r) });
          case _:
            return t({
              ...e,
              breakContents: r(e.breakContents),
              flatContents: r(e.flatContents)
            });
          case S: {
            let { expandedStates: u, contents: n } = e;
            return (
              (n = u ? (u = u.map(r))[0] : r(n)),
              t({ ...e, contents: n, expandedStates: u })
            );
          }
          case w:
          case v:
          case O:
          case T:
          case N:
            return t({ ...e, contents: r(e.contents) });
          case B:
          case b:
          case k:
          case j:
          case P:
          case L:
            return t(e);
          default:
            throw new M(e);
        }
      }
    }
    function K(e, t, u) {
      let r = u,
        n = !1;
      return (
        V(e, function (e) {
          if (n) return !1;
          let u = t(e);
          void 0 !== u && ((n = !0), (r = u));
        }),
        r
      );
    }
    function U(e) {
      if ((e.type === S && e.break) || (e.type === P && e.hard) || e.type === L)
        return !0;
    }
    function q(e) {
      if (e.length > 0) {
        let t = y(0, e, -1);
        t.expandedStates || t.break || (t.break = 'propagated');
      }
      return null;
    }
    function J(e) {
      return e.type !== P || e.hard
        ? e.type === _
          ? e.flatContents
          : e
        : e.soft
          ? ''
          : ' ';
    }
    function H(e) {
      for (
        e = [...e];
        e.length >= 2 && y(0, e, -2).type === P && y(0, e, -1).type === L;
      )
        e.length -= 2;
      if (e.length > 0) {
        let t = G(y(0, e, -1));
        e[e.length - 1] = t;
      }
      return e;
    }
    function G(e) {
      switch (R(e)) {
        case v:
        case O:
        case S:
        case N:
        case T: {
          let t = G(e.contents);
          return { ...e, contents: t };
        }
        case _:
          return {
            ...e,
            breakContents: G(e.breakContents),
            flatContents: G(e.flatContents)
          };
        case x:
          return { ...e, parts: H(e.parts) };
        case A:
          return H(e);
        case B:
          let t = e.length;
          for (
            ;
            t > 0 &&
            ('\r' === e[t - 1] ||
              e[t - 1] ===
                `
`);
          )
            t--;
          return t < e.length ? e.slice(0, t) : e;
        case w:
        case b:
        case k:
        case j:
        case P:
        case L:
          break;
        default:
          throw new M(e);
      }
      return e;
    }
    function Z(e) {
      return G(
        z(e, e =>
          (function (e) {
            switch (R(e)) {
              case x: {
                let { parts: t } = e;
                if (t.every(e => '' === e)) return '';
                if (1 === t.length) return t[0];
                break;
              }
              case S:
                if (!e.contents && !e.id && !e.break && !e.expandedStates)
                  return '';
                if (
                  e.contents.type === S &&
                  e.contents.id === e.id &&
                  e.contents.break === e.break &&
                  e.contents.expandedStates === e.expandedStates
                )
                  return e.contents;
                break;
              case w:
              case v:
              case O:
              case N:
                if (!e.contents) return '';
                break;
              case _:
                if (!e.flatContents && !e.breakContents) return '';
                break;
              case A: {
                let t = [];
                for (let u of e) {
                  if (!u) continue;
                  let [e, ...r] = Array.isArray(u) ? u : [u];
                  ('string' == typeof e && 'string' == typeof y(0, t, -1)
                    ? (t[t.length - 1] += e)
                    : t.push(e),
                    t.push(...r));
                }
                return 0 === t.length ? '' : 1 === t.length ? t[0] : t;
              }
              case B:
              case b:
              case k:
              case j:
              case P:
              case T:
              case L:
                break;
              default:
                throw new M(e);
            }
            return e;
          })(e)
        )
      );
    }
    function Q(e) {
      if (e.type === P) return !0;
    }
    function X(e, t) {
      return e.type === T ? { ...e, contents: t(e.contents) } : t(e);
    }
    function Y(e) {
      return (c(), { type: v, contents: e });
    }
    function ee(e, t) {
      return (c(), c(), { type: w, contents: t, n: e });
    }
    function et(e) {
      return ee({ type: 'root' }, e);
    }
    function eu(e, t, u) {
      c();
      let r = e;
      if (t > 0) {
        for (let e = 0; e < Math.floor(t / u); ++e) r = Y(r);
        ((r = ee(t % u, r)), (r = ee(-1 / 0, r)));
      }
      return r;
    }
    var er = { type: L },
      en = { type: b };
    function eD(e, t = {}) {
      return (
        c(),
        c(t.expandedStates),
        {
          type: S,
          id: t.id,
          contents: e,
          break: !!t.shouldBreak,
          expandedStates: t.expandedStates
        }
      );
    }
    function ei(e, t) {
      (c(), c());
      let u = [];
      for (let r = 0; r < t.length; r++) (0 !== r && u.push(e), u.push(t[r]));
      return u;
    }
    var eo = { type: P },
      ea = { type: P, hard: !0 },
      es = [ea, er],
      el = { type: P, hard: !0, literal: !0 },
      ec = [el, er];
    function eF(e) {
      return (c(), { type: N, contents: e });
    }
    var ef = [12288, 12288, 65281, 65376, 65504, 65510],
      ed = [
        4352, 4447, 8986, 8987, 9001, 9002, 9193, 9196, 9200, 9200, 9203, 9203,
        9725, 9726, 9748, 9749, 9776, 9783, 9800, 9811, 9855, 9855, 9866, 9871,
        9875, 9875, 9889, 9889, 9898, 9899, 9917, 9918, 9924, 9925, 9934, 9934,
        9940, 9940, 9962, 9962, 9970, 9971, 9973, 9973, 9978, 9978, 9981, 9981,
        9989, 9989, 9994, 9995, 10024, 10024, 10060, 10060, 10062, 10062, 10067,
        10069, 10071, 10071, 10133, 10135, 10160, 10160, 10175, 10175, 11035,
        11036, 11088, 11088, 11093, 11093, 11904, 11929, 11931, 12019, 12032,
        12245, 12272, 12287, 12289, 12350, 12353, 12438, 12441, 12543, 12549,
        12591, 12593, 12686, 12688, 12773, 12783, 12830, 12832, 12871, 12880,
        42124, 42128, 42182, 43360, 43388, 44032, 55203, 63744, 64255, 65040,
        65049, 65072, 65106, 65108, 65126, 65128, 65131, 94176, 94180, 94192,
        94198, 94208, 101589, 101631, 101662, 101760, 101874, 110576, 110579,
        110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928,
        110930, 110933, 110933, 110948, 110951, 110960, 111355, 119552, 119638,
        119648, 119670, 126980, 126980, 127183, 127183, 127374, 127374, 127377,
        127386, 127488, 127490, 127504, 127547, 127552, 127560, 127568, 127569,
        127584, 127589, 127744, 127776, 127789, 127797, 127799, 127868, 127870,
        127891, 127904, 127946, 127951, 127955, 127968, 127984, 127988, 127988,
        127992, 128062, 128064, 128064, 128066, 128252, 128255, 128317, 128331,
        128334, 128336, 128359, 128378, 128378, 128405, 128406, 128420, 128420,
        128507, 128591, 128640, 128709, 128716, 128716, 128720, 128722, 128725,
        128728, 128732, 128735, 128747, 128748, 128756, 128764, 128992, 129003,
        129008, 129008, 129292, 129338, 129340, 129349, 129351, 129535, 129648,
        129660, 129664, 129674, 129678, 129734, 129736, 129736, 129741, 129756,
        129759, 129770, 129775, 129784, 131072, 196605, 196608, 262141
      ],
      ep = (e, t) => {
        let u = 0,
          r = Math.floor(e.length / 2) - 1;
        for (; u <= r;) {
          let n = Math.floor((u + r) / 2),
            D = 2 * n;
          if (t < e[D]) r = n - 1;
          else {
            if (!(t > e[D + 1])) return !0;
            u = n + 1;
          }
        }
        return !1;
      },
      [eh, eC] = (function (e) {
        let t = e[0],
          u = e[1];
        for (let r = 0; r < e.length; r += 2) {
          let n = e[r],
            D = e[r + 1];
          if (19968 >= n && 19968 <= D) return [n, D];
          D - n > u - t && ((t = n), (u = D));
        }
        return [t, u];
      })(ed),
      eE = e => !(e < 12288) && !(e > 65510) && ep(ef, e),
      em = e =>
        (e >= eh && e <= eC) || (!(e < 4352) && !(e > 262141) && ep(ed, e)),
      eg =
        /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05-\u2B07]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF3\uDFF5\uDFF7]|\uD83D[\uDC3F\uDC41\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])$/,
      ey = /[^\x20-\x7F]/,
      eB = function (e) {
        if (!e) return 0;
        if (!ey.test(e)) return e.length;
        let t = 0;
        for (let u of (e = e.replace(
          /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g,
          e => ((t += eg.test(e) ? 1 : 2), '')
        ))) {
          let e = u.codePointAt(0);
          e <= 31 ||
            (e >= 127 && e <= 159) ||
            (e >= 768 && e <= 879) ||
            (e >= 65024 && e <= 65039) ||
            (t += eE(e) || em(e) ? 2 : 1);
        }
        return t;
      },
      eA = { type: 0 },
      eb = { type: 1 },
      ev = {
        value: '',
        length: 0,
        queue: [],
        get root() {
          return ev;
        }
      };
    function ew(e, t, u) {
      let r = 1 === t.type ? e.queue.slice(0, -1) : [...e.queue, t],
        n = '',
        D = 0,
        i = 0,
        o = 0;
      for (let e of r)
        switch (e.type) {
          case 0:
            (l(), u.useTabs ? a(1) : s(u.tabWidth));
            break;
          case 3: {
            let { string: t } = e;
            (l(), (n += t), (D += t.length));
            break;
          }
          case 2: {
            let { width: t } = e;
            ((i += 1), (o += t));
            break;
          }
          default:
            throw Error(`Unexpected indent comment '${e.type}'.`);
        }
      return (c(), { ...e, value: n, length: D, queue: r });
      function a(e) {
        ((n += '	'.repeat(e)), (D += u.tabWidth * e));
      }
      function s(e) {
        ((n += ' '.repeat(e)), (D += e));
      }
      function l() {
        u.useTabs ? (i > 0 && a(i), (i = 0), (o = 0)) : c();
      }
      function c() {
        (o > 0 && s(o), (i = 0), (o = 0));
      }
    }
    function ek(e) {
      let t = (function (e) {
        let t = 0;
        for (let u = e.length - 1; u >= 0; u--) {
          let r = e[u];
          if (' ' === r || '	' === r) t++;
          else break;
        }
        return t;
      })(e);
      return { text: 0 === t ? e : e.slice(0, e.length - t), count: t };
    }
    var eS = class {
        #e = [];
        #t = '';
        #u = 0;
        #r = [];
        #n = [];
        #D() {
          let e = this.#t;
          for (let t of ('' !== e &&
            (this.#e.push(e), (this.#u += e.length), (this.#t = '')),
          this.#n))
            this.#r.push(Math.min(t, this.#u));
          this.#n.length = 0;
        }
        markPosition() {
          if (this.#r.length + this.#n.length >= 2)
            throw Error("There are too many 'cursor' in doc.");
          this.#n.push(this.#u + this.#t.length);
        }
        write(e) {
          this.#t += e;
        }
        trim() {
          let { text: e, count: t } = ek(this.#t);
          return ((this.#t = e), this.#D(), t);
        }
        finish() {
          return (this.#D(), { text: this.#e.join(''), positions: this.#r });
        }
      },
      ex = Symbol('MODE_BREAK'),
      e_ = Symbol('MODE_FLAT'),
      eO = Symbol('DOC_FILL_PRINTED_LENGTH');
    function eN(e, t, u, r, n, D) {
      if (1 / 0 === u) return !0;
      let i = t.length,
        o = !1,
        a = [e],
        s = '';
      for (; u >= 0;) {
        if (0 === a.length) {
          if (0 === i) return !0;
          a.push(t[--i]);
          continue;
        }
        let { mode: e, doc: l } = a.pop(),
          c = R(l);
        switch (c) {
          case B:
            l &&
              (o && ((s += ' '), (u -= 1), (o = !1)), (s += l), (u -= eB(l)));
            break;
          case A:
          case x: {
            let t = c === A ? l : l.parts,
              u = l[eO] ?? 0;
            for (let r = t.length - 1; r >= u; r--)
              a.push({ mode: e, doc: t[r] });
            break;
          }
          case v:
          case w:
          case O:
          case T:
            a.push({ mode: e, doc: l.contents });
            break;
          case k: {
            let { text: e, count: t } = ek(s);
            ((s = e), (u += t));
            break;
          }
          case S: {
            if (D && l.break) return !1;
            let t = l.break ? ex : e,
              u =
                l.expandedStates && t === ex
                  ? y(0, l.expandedStates, -1)
                  : l.contents;
            a.push({ mode: t, doc: u });
            break;
          }
          case _: {
            let t =
              (l.groupId ? n[l.groupId] || e_ : e) === ex
                ? l.breakContents
                : l.flatContents;
            t && a.push({ mode: e, doc: t });
            break;
          }
          case P:
            if (e === ex || l.hard) return !0;
            l.soft || (o = !0);
            break;
          case N:
            r = !0;
            break;
          case j:
            if (r) return !1;
        }
      }
      return !1;
    }
    function ej(e, t) {
      let u,
        r,
        n = Object.create(null),
        D = t.printWidth,
        i = p(t.endOfLine),
        o = 0,
        s = [{ indent: ev, mode: ex, doc: e }],
        l = !1,
        c = [],
        F = new eS();
      for (
        u = new Set(),
          r = [],
          V(
            e,
            function (e) {
              if ((e.type === L && q(r), e.type === S)) {
                if ((r.push(e), u.has(e))) return !1;
                u.add(e);
              }
            },
            function (e) {
              e.type === S && r.pop().break && q(r);
            },
            !0
          );
        s.length > 0;
      ) {
        let { indent: e, mode: u, doc: r } = s.pop();
        switch (R(r)) {
          case B: {
            let e =
              i !==
              `
`
                ? a(
                    0,
                    r,
                    `
`,
                    i
                  )
                : r;
            e && (F.write(e), s.length > 0 && (o += eB(e)));
            break;
          }
          case A:
            for (let t = r.length - 1; t >= 0; t--)
              s.push({ indent: e, mode: u, doc: r[t] });
            break;
          case b:
            F.markPosition();
            break;
          case v:
            s.push({ indent: ew(e, eA, t), mode: u, doc: r.contents });
            break;
          case w:
            s.push({
              indent: (function (e, t, u) {
                return t
                  ? 'root' === t.type
                    ? { ...e, root: e }
                    : -1 / 0 === t
                      ? e.root
                      : ew(
                          e,
                          'number' == typeof t
                            ? t < 0
                              ? eb
                              : { type: 2, width: t }
                            : { type: 3, string: t },
                          u
                        )
                  : e;
              })(e, r.n, t),
              mode: u,
              doc: r.contents
            });
            break;
          case k:
            o -= F.trim();
            break;
          case S: {
            let t = (function () {
              if (u === e_ && !l)
                return { indent: e, mode: r.break ? ex : e_, doc: r.contents };
              l = !1;
              let t = D - o,
                i = c.length > 0,
                a = { indent: e, mode: e_, doc: r.contents };
              if (!r.break && eN(a, s, t, i, n)) return a;
              if (!r.expandedStates)
                return { indent: e, mode: ex, doc: r.contents };
              if (!r.break)
                for (let u = 1; u < r.expandedStates.length - 1; u++) {
                  let D = { indent: e, mode: e_, doc: r.expandedStates[u] };
                  if (eN(D, s, t, i, n)) return D;
                }
              return { indent: e, mode: ex, doc: y(0, r.expandedStates, -1) };
            })();
            (s.push(t), r.id && (n[r.id] = t.mode));
            break;
          }
          case x: {
            let t = D - o,
              i = r[eO] ?? 0,
              { parts: a } = r,
              l = a.length - i;
            if (0 === l) break;
            let F = a[i + 0],
              f = a[i + 1],
              d = { indent: e, mode: e_, doc: F },
              p = { indent: e, mode: ex, doc: F },
              h = eN(d, [], t, c.length > 0, n, !0);
            if (1 === l) {
              h ? s.push(d) : s.push(p);
              break;
            }
            let C = { indent: e, mode: e_, doc: f },
              E = { indent: e, mode: ex, doc: f };
            if (2 === l) {
              h ? s.push(C, d) : s.push(E, p);
              break;
            }
            let m = a[i + 2],
              g = { indent: e, mode: u, doc: { ...r, [eO]: i + 2 } },
              y = eN(
                { indent: e, mode: e_, doc: [F, f, m] },
                [],
                t,
                c.length > 0,
                n,
                !0
              );
            (s.push(g), y ? s.push(C, d) : h ? s.push(E, d) : s.push(E, p));
            break;
          }
          case _:
          case O: {
            let t = r.groupId ? n[r.groupId] : u;
            if (t === ex) {
              let t =
                r.type === _
                  ? r.breakContents
                  : r.negate
                    ? r.contents
                    : Y(r.contents);
              t && s.push({ indent: e, mode: u, doc: t });
            }
            if (t === e_) {
              let t =
                r.type === _
                  ? r.flatContents
                  : r.negate
                    ? Y(r.contents)
                    : r.contents;
              t && s.push({ indent: e, mode: u, doc: t });
            }
            break;
          }
          case N:
            c.push({ indent: e, mode: u, doc: r.contents });
            break;
          case j:
            c.length > 0 && s.push({ indent: e, mode: u, doc: ea });
            break;
          case P:
            switch (u) {
              case e_:
                if (!r.hard) {
                  r.soft || (F.write(' '), (o += 1));
                  break;
                }
                l = !0;
              case ex:
                if (c.length > 0) {
                  (s.push({ indent: e, mode: u, doc: r }, ...c.reverse()),
                    (c.length = 0));
                  break;
                }
                r.literal
                  ? (F.write(i),
                    (o = 0),
                    e.root &&
                      (e.root.value && F.write(e.root.value),
                      (o = e.root.length)))
                  : (F.trim(), F.write(i + e.value), (o = e.length));
            }
            break;
          case T:
            s.push({ indent: e, mode: u, doc: r.contents });
            break;
          case L:
            break;
          default:
            throw new M(r);
        }
        0 === s.length &&
          c.length > 0 &&
          (s.push(...c.reverse()), (c.length = 0));
      }
      let { text: f, positions: d } = F.finish();
      if (2 !== d.length) return { formatted: f };
      let [h, C] = d;
      return {
        formatted: f,
        cursorNodeStart: h,
        cursorNodeText: f.slice(h, C)
      };
    }
    var eP = function (e, t, u = 0) {
        let r = 0;
        for (let n = u; n < e.length; ++n)
          '	' === e[n] ? (r = r + t - (r % t)) : r++;
        return r;
      },
      eT = class {
        constructor(e) {
          this.stack = [e];
        }
        get key() {
          let { stack: e, siblings: t } = this;
          return y(0, e, null === t ? -2 : -4) ?? null;
        }
        get index() {
          return null === this.siblings ? null : y(0, this.stack, -2);
        }
        get node() {
          return y(0, this.stack, -1);
        }
        get parent() {
          return this.getNode(1);
        }
        get grandparent() {
          return this.getNode(2);
        }
        get isInArray() {
          return null !== this.siblings;
        }
        get siblings() {
          let { stack: e } = this,
            t = y(0, e, -3);
          return Array.isArray(t) ? t : null;
        }
        get next() {
          let { siblings: e } = this;
          return null === e ? null : e[this.index + 1];
        }
        get previous() {
          let { siblings: e } = this;
          return null === e ? null : e[this.index - 1];
        }
        get isFirst() {
          return 0 === this.index;
        }
        get isLast() {
          let { siblings: e, index: t } = this;
          return null !== e && t === e.length - 1;
        }
        get isRoot() {
          return 1 === this.stack.length;
        }
        get root() {
          return this.stack[0];
        }
        get ancestors() {
          return [...this.#t()];
        }
        getName() {
          let { stack: e } = this,
            { length: t } = e;
          return t > 1 ? y(0, e, -2) : null;
        }
        getValue() {
          return y(0, this.stack, -1);
        }
        getNode(e = 0) {
          let t = this.#e(e);
          return -1 === t ? null : this.stack[t];
        }
        getParentNode(e = 0) {
          return this.getNode(e + 1);
        }
        #e(e) {
          let { stack: t } = this;
          for (let u = t.length - 1; u >= 0; u -= 2)
            if (!Array.isArray(t[u]) && --e < 0) return u;
          return -1;
        }
        call(e, ...t) {
          let { stack: u } = this,
            { length: r } = u,
            n = y(0, u, -1);
          for (let e of t) ((n = n?.[e]), u.push(e, n));
          try {
            return e(this);
          } finally {
            u.length = r;
          }
        }
        callParent(e, t = 0) {
          let u = this.#e(t + 1),
            r = this.stack.splice(u + 1);
          try {
            return e(this);
          } finally {
            this.stack.push(...r);
          }
        }
        each(e, ...t) {
          let { stack: u } = this,
            { length: r } = u,
            n = y(0, u, -1);
          for (let e of t) ((n = n[e]), u.push(e, n));
          try {
            for (let t = 0; t < n.length; ++t)
              (u.push(t, n[t]), e(this, t, n), (u.length -= 2));
          } finally {
            u.length = r;
          }
        }
        map(e, ...t) {
          let u = [];
          return (
            this.each(
              (t, r, n) => {
                u[r] = e(t, r, n);
              },
              ...t
            ),
            u
          );
        }
        match(...e) {
          let t = this.stack.length - 1,
            u = null,
            r = this.stack[t--];
          for (let n of e) {
            if (void 0 === r) return !1;
            let e = null;
            if (
              ('number' == typeof u &&
                ((e = u), (u = this.stack[t--]), (r = this.stack[t--])),
              n && !n(r, u, e))
            )
              return !1;
            ((u = this.stack[t--]), (r = this.stack[t--]));
          }
          return !0;
        }
        findAncestor(e) {
          for (let t of this.#t()) if (e(t)) return t;
        }
        hasAncestor(e) {
          for (let t of this.#t()) if (e(t)) return !0;
          return !1;
        }
        *#t() {
          let { stack: e } = this;
          for (let t = e.length - 3; t >= 0; t -= 2) {
            let u = e[t];
            Array.isArray(u) || (yield u);
          }
        }
      },
      eL = function (e) {
        return Array.isArray(e) && e.length > 0;
      },
      e$ = function (e) {
        return null !== e && 'object' == typeof e;
      };
    function eI(e) {
      return (t, u, r) => {
        if (!1 === u) return !1;
        let n = !!r?.backwards,
          { length: D } = t,
          i = u;
        for (; i >= 0 && i < D;) {
          let u = t.charAt(i);
          if (e instanceof RegExp) {
            if (!e.test(u)) return i;
          } else if (!e.includes(u)) return i;
          n ? i-- : i++;
        }
        return (-1 === i || i === D) && i;
      };
    }
    var eR = eI(/\s/),
      eM = eI(' 	'),
      eW = eI(',; 	'),
      eV = eI(/[^\n\r]/),
      ez = e =>
        e ===
          `
` ||
        '\r' === e ||
        '\u2028' === e ||
        '\u2029' === e,
      eK = function (e, t, u) {
        if (!1 === t) return !1;
        let r = !!u?.backwards,
          n = e.charAt(t);
        if (r) {
          if (
            '\r' === e.charAt(t - 1) &&
            n ===
              `
`
          )
            return t - 2;
          if (ez(n)) return t - 1;
        } else {
          if (
            '\r' === n &&
            e.charAt(t + 1) ===
              `
`
          )
            return t + 2;
          if (ez(n)) return t + 1;
        }
        return t;
      },
      eU = function (e, t, u = {}) {
        let r = eM(e, u.backwards ? t - 1 : t, u),
          n = eK(e, r, u);
        return r !== n;
      };
    function* eq(e, t) {
      let { getVisitorKeys: u, filter: r = () => !0 } = t,
        n = e => e$(e) && r(e);
      for (let t of u(e)) {
        let u = e[t];
        if (Array.isArray(u)) for (let e of u) n(e) && (yield e);
        else n(u) && (yield u);
      }
    }
    var eJ = function e(t, u, r) {
      return I(r.cache, t, t =>
        (function (t, u, r) {
          let { filter: n } = r;
          if (!n) return [];
          let D,
            i = (
              r.getChildren?.(t, r) ?? [
                ...eq(t, { getVisitorKeys: r.getVisitorKeys })
              ]
            ).flatMap(i => (D ?? (D = [t, ...u]), n(i, D) ? [i] : e(i, D, r))),
            { locStart: o, locEnd: a } = r;
          return (i.sort((e, t) => o(e) - o(t) || a(e) - a(t)), i);
        })(t, u, r)
      );
    };
    function eH(e, t) {
      let u, r;
      ((e.comments ?? (e.comments = [])).push(t),
        (t.printed = !1),
        (u = e.type || e.kind || '(unknown type)'),
        (r = String(
          e.name ||
            (e.id && ('object' == typeof e.id ? e.id.name : e.id)) ||
            (e.key && ('object' == typeof e.key ? e.key.name : e.key)) ||
            (e.value && ('object' == typeof e.value ? '' : String(e.value))) ||
            e.operator ||
            ''
        )).length > 20 && (r = r.slice(0, 19) + '…'),
        (t.nodeDescription = u + (r ? ' ' + r : '')));
    }
    function eG(e, t) {
      ((t.leading = !0), (t.trailing = !1), eH(e, t));
    }
    function eZ(e, t, u) {
      ((t.leading = !1), (t.trailing = !1), u && (t.marker = u), eH(e, t));
    }
    function eQ(e, t) {
      ((t.leading = !1), (t.trailing = !0), eH(e, t));
    }
    var eX = new WeakMap(),
      eY = () => !1,
      e0 = e => !/[\S\n\u2028\u2029]/.test(e);
    function e2(e, t) {
      let u = e.length;
      if (0 === u) return;
      let { precedingNode: r, followingNode: n } = e[0],
        D = t.locStart(n),
        i;
      for (i = u; i > 0; --i) {
        let { comment: u, precedingNode: r, followingNode: n } = e[i - 1];
        (c(), c());
        let o = t.originalText.slice(t.locEnd(u), D);
        if (t.printer.isGap?.(o, t) ?? /^[\s(]*$/.test(o)) D = t.locStart(u);
        else break;
      }
      for (let [t, { comment: u }] of e.entries()) t < i ? eQ(r, u) : eG(n, u);
      for (let e of [r, n])
        e.comments &&
          e.comments.length > 1 &&
          e.comments.sort((e, u) => t.locStart(e) - t.locStart(u));
      e.length = 0;
    }
    function e1(e, t, u) {
      let r = u.locStart(t) - 1;
      for (let t = 1; t < e.length; ++t) if (r < u.locStart(e[t])) return t - 1;
      return 0;
    }
    var e8 = function (e, t) {
        let u = t - 1;
        ((u = eM(e, u, { backwards: !0 })),
          (u = eK(e, u, { backwards: !0 })),
          (u = eM(e, u, { backwards: !0 })));
        let r = eK(e, u, { backwards: !0 });
        return u !== r;
      },
      e3 = () => !0;
    function e6(e, t) {
      return ((e.node.printed = !0), t.printer.printComment(e, t));
    }
    var e7 = class extends Error {
        name = 'ConfigError';
      },
      e9 = class extends Error {
        name = 'UndefinedParserError';
      },
      e4 =
        Object.hasOwn ??
        Function.prototype.call.bind(Object.prototype.hasOwnProperty),
      e5 = {
        checkIgnorePragma: {
          category: 'Special',
          type: 'boolean',
          default: !1,
          description:
            "Check whether the file's first docblock comment contains '@noprettier' or '@noformat' to determine if it should be formatted.",
          cliCategory: 'Other'
        },
        cursorOffset: {
          category: 'Special',
          type: 'int',
          default: -1,
          range: { start: -1, end: 1 / 0, step: 1 },
          description:
            'Print (to stderr) where a cursor at the given position would move to after formatting.',
          cliCategory: 'Editor'
        },
        endOfLine: {
          category: 'Global',
          type: 'choice',
          default: 'lf',
          description: 'Which end of line characters to apply.',
          choices: [
            {
              value: 'lf',
              description:
                'Line Feed only (\\n), common on Linux and macOS as well as inside git repos'
            },
            {
              value: 'crlf',
              description:
                'Carriage Return + Line Feed characters (\\r\\n), common on Windows'
            },
            {
              value: 'cr',
              description:
                'Carriage Return character only (\\r), used very rarely'
            },
            {
              value: 'auto',
              description: `Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)`
            }
          ]
        },
        filepath: {
          category: 'Special',
          type: 'path',
          description:
            'Specify the input filepath. This will be used to do parser inference.',
          cliName: 'stdin-filepath',
          cliCategory: 'Other',
          cliDescription: 'Path to the file to pretend that stdin comes from.'
        },
        insertPragma: {
          category: 'Special',
          type: 'boolean',
          default: !1,
          description:
            "Insert @format pragma into file's first docblock comment.",
          cliCategory: 'Other'
        },
        parser: {
          category: 'Global',
          type: 'choice',
          default: void 0,
          description: 'Which parser to use.',
          exception: e => 'string' == typeof e || 'function' == typeof e,
          choices: [
            { value: 'flow', description: 'Flow' },
            { value: 'babel', description: 'JavaScript' },
            { value: 'babel-flow', description: 'Flow' },
            { value: 'babel-ts', description: 'TypeScript' },
            { value: 'typescript', description: 'TypeScript' },
            { value: 'acorn', description: 'JavaScript' },
            { value: 'espree', description: 'JavaScript' },
            { value: 'meriyah', description: 'JavaScript' },
            { value: 'css', description: 'CSS' },
            { value: 'less', description: 'Less' },
            { value: 'scss', description: 'SCSS' },
            { value: 'json', description: 'JSON' },
            { value: 'json5', description: 'JSON5' },
            { value: 'jsonc', description: 'JSON with Comments' },
            { value: 'json-stringify', description: 'JSON.stringify' },
            { value: 'graphql', description: 'GraphQL' },
            { value: 'markdown', description: 'Markdown' },
            { value: 'mdx', description: 'MDX' },
            { value: 'vue', description: 'Vue' },
            { value: 'yaml', description: 'YAML' },
            { value: 'glimmer', description: 'Ember / Handlebars' },
            { value: 'html', description: 'HTML' },
            { value: 'angular', description: 'Angular' },
            { value: 'lwc', description: 'Lightning Web Components' },
            { value: 'mjml', description: 'MJML' }
          ]
        },
        plugins: {
          type: 'path',
          array: !0,
          default: [{ value: [] }],
          category: 'Global',
          description:
            'Add a plugin. Multiple plugins can be passed as separate `--plugin`s.',
          exception: e => 'string' == typeof e || 'object' == typeof e,
          cliName: 'plugin',
          cliCategory: 'Config'
        },
        printWidth: {
          category: 'Global',
          type: 'int',
          default: 80,
          description: 'The line length where Prettier will try wrap.',
          range: { start: 0, end: 1 / 0, step: 1 }
        },
        rangeEnd: {
          category: 'Special',
          type: 'int',
          default: 1 / 0,
          range: { start: 0, end: 1 / 0, step: 1 },
          description: `Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.`,
          cliCategory: 'Editor'
        },
        rangeStart: {
          category: 'Special',
          type: 'int',
          default: 0,
          range: { start: 0, end: 1 / 0, step: 1 },
          description: `Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.`,
          cliCategory: 'Editor'
        },
        requirePragma: {
          category: 'Special',
          type: 'boolean',
          default: !1,
          description:
            "Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted.",
          cliCategory: 'Other'
        },
        tabWidth: {
          type: 'int',
          category: 'Global',
          default: 2,
          description: 'Number of spaces per indentation level.',
          range: { start: 0, end: 1 / 0, step: 1 }
        },
        useTabs: {
          category: 'Global',
          type: 'boolean',
          default: !1,
          description: 'Indent with tabs instead of spaces.'
        },
        embeddedLanguageFormatting: {
          category: 'Global',
          type: 'choice',
          default: 'auto',
          description:
            'Control how Prettier formats quoted code embedded in the file.',
          choices: [
            {
              value: 'auto',
              description:
                'Format embedded code if Prettier can automatically identify it.'
            },
            {
              value: 'off',
              description: 'Never automatically format embedded code.'
            }
          ]
        }
      };
    function te({ plugins: e = [], showDeprecated: t = !1 } = {}) {
      let u = e.flatMap(e => e.languages ?? []),
        r = [];
      for (let n of (function (e) {
        let t = [];
        for (let [u, r] of Object.entries(e)) {
          let e = { name: u, ...r };
          (Array.isArray(e.default) && (e.default = y(0, e.default, -1).value),
            t.push(e));
        }
        return t;
      })(Object.assign({}, ...e.map(({ options: e }) => e), e5)))
        (!t && n.deprecated) ||
          (Array.isArray(n.choices) &&
            (t || (n.choices = n.choices.filter(e => !e.deprecated)),
            'parser' === n.name &&
              (n.choices = [
                ...n.choices,
                ...(function* (e, t, u) {
                  let r = new Set(e.map(e => e.value));
                  for (let e of t)
                    if (e.parsers) {
                      for (let t of e.parsers)
                        if (!r.has(t)) {
                          r.add(t);
                          let n = u.find(e => e.parsers && e4(e.parsers, t)),
                            D = e.name;
                          (n?.name && (D += ` (plugin: ${n.name})`),
                            yield { value: t, description: D });
                        }
                    }
                })(n.choices, u, e)
              ])),
          (n.pluginDefaults = Object.fromEntries(
            e
              .filter(e => e.defaultOptions?.[n.name] !== void 0)
              .map(e => [e.name, e.defaultOptions[n.name]])
          )),
          r.push(n));
      return { languages: u, options: r };
    }
    var tt =
        Array.prototype.toReversed ??
        function () {
          return [...this].reverse();
        },
      tu = i('toReversed', function () {
        if (Array.isArray(this)) return tt;
      }),
      tr = (function () {
        let e = globalThis,
          t = e.process?.platform;
        if ('string' == typeof t) return t.startsWith('win');
        let u = e.Deno?.build?.os;
        return 'string' == typeof u
          ? 'windows' === u
          : (e.navigator?.platform?.startsWith('Win') ?? !1);
      })();
    function tn(e) {
      if ('file:' !== (e = e instanceof URL ? e : new URL(e)).protocol)
        throw TypeError(`URL must be a file URL: received "${e.protocol}"`);
      return e;
    }
    function tD(e, t) {
      if (!t) return;
      let u = String(t).split(/[/\\]/).pop().toLowerCase();
      return (
        e.find(({ filenames: e }) => e?.some(e => e.toLowerCase() === u)) ??
        e.find(({ extensions: e }) => e?.some(e => u.endsWith(e)))
      );
    }
    var ti = void 0;
    function to(e, t) {
      if (t) {
        if (String(t).startsWith('file:'))
          try {
            var u, r;
            let e;
            ((u = t),
              (t = tr
                ? ((e = decodeURIComponent(
                    (r = tn((r = u))).pathname
                      .replace(/\//g, '\\')
                      .replace(/%(?![0-9A-Fa-f]{2})/g, '%25')
                  ).replace(/^\\*([A-Za-z]:)(\\|$)/, '$1\\')),
                  '' !== r.hostname && (e = `\\\\${r.hostname}${e}`),
                  e)
                : decodeURIComponent(
                    tn(u).pathname.replace(/%(?![0-9A-Fa-f]{2})/g, '%25')
                  )));
          } catch {
            return;
          }
        if ('string' == typeof t)
          return e.find(({ isSupported: e }) => e?.({ filepath: t }));
      }
    }
    var ta = function (e, t) {
        let u = tu(0, e.plugins).flatMap(e => e.languages ?? []);
        return (
          (function (e, t) {
            if (t)
              return (
                e.find(({ name: e }) => e.toLowerCase() === t) ??
                e.find(({ aliases: e }) => e?.includes(t)) ??
                e.find(({ extensions: e }) => e?.includes(`.${t}`))
              );
          })(u, t.language) ??
          tD(u, t.physicalFile) ??
          tD(u, t.file) ??
          to(u, t.physicalFile) ??
          to(u, t.file) ??
          ti?.(u, t.physicalFile)
        )?.parsers[0];
      },
      ts = {
        key: e =>
          /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(e) ? e : JSON.stringify(e),
        value(e) {
          if (null === e || 'object' != typeof e) return JSON.stringify(e);
          if (Array.isArray(e))
            return `[${e.map(e => ts.value(e)).join(', ')}]`;
          let t = Object.keys(e);
          return 0 === t.length
            ? '{}'
            : `{ ${t.map(t => `${ts.key(t)}: ${ts.value(e[t])}`).join(', ')} }`;
        },
        pair: ({ key: e, value: t }) => ts.value({ [e]: t })
      },
      tl = new Proxy(String, { get: () => tl }),
      tc = Symbol.for('vnopts.VALUE_NOT_EXIST'),
      tF = Symbol.for('vnopts.VALUE_UNCHANGED'),
      tf = ' '.repeat(2);
    function td(e, t, u, r) {
      return `Invalid ${tl.red(r.key(e))} value. Expected ${tl.blue(u)}, but received ${t === tc ? tl.gray('nothing') : tl.red(r.value(t))}.`;
    }
    function tp(e, t) {
      if (1 === e.length) return e[0];
      let [u, r] = e,
        [n, D] = e.map(
          e =>
            e.split(
              `
`,
              1
            )[0].length
        );
      return n > t && n > D ? r : u;
    }
    var th = [],
      tC = [];
    function tE(e, t, u) {
      if (e === t) return 0;
      let r = u?.maxDistance,
        n = e;
      e.length > t.length && ((e = t), (t = n));
      let D = e.length,
        i = t.length;
      for (; D > 0 && e.charCodeAt(~-D) === t.charCodeAt(~-i);) (D--, i--);
      let o = 0;
      for (; o < D && e.charCodeAt(o) === t.charCodeAt(o);) o++;
      if (((D -= o), (i -= o), void 0 !== r && i - D > r)) return r;
      if (0 === D) return void 0 !== r && i > r ? r : i;
      let a,
        s,
        l,
        c,
        F = 0,
        f = 0;
      for (; F < D;) ((tC[F] = e.charCodeAt(o + F)), (th[F] = ++F));
      for (; f < i;) {
        for (a = t.charCodeAt(o + f), l = f++, s = f, F = 0; F < D; F++)
          ((c = a === tC[F] ? l : l + 1),
            (l = th[F]),
            (s = th[F] = l > s ? (c > s ? s + 1 : c) : c > l ? l + 1 : c));
        if (void 0 !== r) {
          let e = s;
          for (F = 0; F < D; F++) th[F] < e && (e = th[F]);
          if (e > r) return r;
        }
      }
      return ((th.length = D), (tC.length = D), void 0 !== r && s > r ? r : s);
    }
    var tm = (e, t, { descriptor: u, logger: r, schemas: n }) => {
        let D = [
            `Ignored unknown option ${tl.yellow(u.pair({ key: e, value: t }))}.`
          ],
          i = (function (e, t, u) {
            if (!Array.isArray(t) || 0 === t.length) return;
            let r = u?.maxDistance,
              n = e.length;
            for (let u of t) if (u === e) return u;
            if (0 === r) return;
            let D,
              i = 1 / 0,
              o = new Set();
            for (let u of t) {
              if (o.has(u)) continue;
              o.add(u);
              let t = Math.abs(u.length - n);
              if (t >= i || (void 0 !== r && t > r)) continue;
              let a = Number.isFinite(i)
                  ? void 0 === r
                    ? i
                    : Math.min(i, r)
                  : r,
                s = void 0 === a ? tE(e, u) : tE(e, u, { maxDistance: a });
              if (void 0 !== r && s > r) continue;
              let l = s;
              if (
                (void 0 !== a && s === a && a === r && (l = tE(e, u)),
                l < i && ((i = l), (D = u), 0 === i))
              )
                break;
            }
            if (!(void 0 !== r && i > r)) return D;
          })(e, Object.keys(n), { maxDistance: 3 });
        (i && D.push(`Did you mean ${tl.blue(u.key(i))}?`),
          r.warn(D.join(' ')));
      },
      tg = [
        'default',
        'expected',
        'validate',
        'deprecated',
        'forward',
        'redirect',
        'overlap',
        'preprocess',
        'postprocess'
      ],
      ty = class {
        static create(e) {
          let t = new this(e),
            u = Object.create(t);
          for (let r of tg)
            r in e &&
              (u[r] = (function (e, t, u) {
                return 'function' == typeof e
                  ? (...r) => e(...r.slice(0, u - 1), t, ...r.slice(u - 1))
                  : () => e;
              })(e[r], t, ty.prototype[r].length));
          return u;
        }
        constructor(e) {
          this.name = e.name;
        }
        default(e) {}
        expected(e) {
          return 'nothing';
        }
        validate(e, t) {
          return !1;
        }
        deprecated(e, t) {
          return !1;
        }
        forward(e, t) {}
        redirect(e, t) {}
        overlap(e, t, u) {
          return e;
        }
        preprocess(e, t) {
          return e;
        }
        postprocess(e, t) {
          return tF;
        }
      },
      tB = class extends ty {
        constructor(e) {
          (super(e), (this._sourceName = e.sourceName));
        }
        expected(e) {
          return e.schemas[this._sourceName].expected(e);
        }
        validate(e, t) {
          return t.schemas[this._sourceName].validate(e, t);
        }
        redirect(e, t) {
          return this._sourceName;
        }
      },
      tA = class extends ty {
        expected() {
          return 'anything';
        }
        validate() {
          return !0;
        }
      },
      tb = class extends ty {
        constructor({ valueSchema: e, name: t = e.name, ...u }) {
          (super({ ...u, name: t }), (this._valueSchema = e));
        }
        expected(e) {
          let { text: t, list: u } = e.normalizeExpectedResult(
            this._valueSchema.expected(e)
          );
          return {
            text: t && `an array of ${t}`,
            list: u && {
              title: 'an array of the following values',
              values: [{ list: u }]
            }
          };
        }
        validate(e, t) {
          if (!Array.isArray(e)) return !1;
          let u = [];
          for (let r of e) {
            let e = t.normalizeValidateResult(
              this._valueSchema.validate(r, t),
              r
            );
            !0 !== e && u.push(e.value);
          }
          return 0 === u.length || { value: u };
        }
        deprecated(e, t) {
          let u = [];
          for (let r of e) {
            let e = t.normalizeDeprecatedResult(
              this._valueSchema.deprecated(r, t),
              r
            );
            !1 !== e && u.push(...e.map(({ value: e }) => ({ value: [e] })));
          }
          return u;
        }
        forward(e, t) {
          let u = [];
          for (let r of e) {
            let e = t.normalizeForwardResult(
              this._valueSchema.forward(r, t),
              r
            );
            u.push(...e.map(tv));
          }
          return u;
        }
        redirect(e, t) {
          let u = [],
            r = [];
          for (let n of e) {
            let e = t.normalizeRedirectResult(
              this._valueSchema.redirect(n, t),
              n
            );
            ('remain' in e && u.push(e.remain), r.push(...e.redirect.map(tv)));
          }
          return 0 === u.length ? { redirect: r } : { redirect: r, remain: u };
        }
        overlap(e, t) {
          return e.concat(t);
        }
      };
    function tv({ from: e, to: t }) {
      return { from: [e], to: t };
    }
    var tw = class extends ty {
      expected() {
        return 'true or false';
      }
      validate(e) {
        return 'boolean' == typeof e;
      }
    };
    function tk(e, t) {
      if (e === t) return 0;
      let u = typeof e,
        r = typeof t,
        n = ['undefined', 'object', 'boolean', 'number', 'string'];
      return u !== r
        ? n.indexOf(u) - n.indexOf(r)
        : 'string' !== u
          ? Number(e) - Number(t)
          : e.localeCompare(t);
    }
    function tS(e) {
      return void 0 === e ? {} : e;
    }
    function tx(e) {
      if ('string' == typeof e) return { text: e };
      let { text: t, list: u } = e;
      return (
        (function (e, t) {
          if (!e) throw Error(t);
        })(
          (t || u) !== void 0,
          'Unexpected `expected` result, there should be at least one field.'
        ),
        u
          ? { text: t, list: { title: u.title, values: u.values.map(tx) } }
          : { text: t }
      );
    }
    function t_(e, t) {
      return !0 === e || (!1 === e ? { value: t } : e);
    }
    function tO(e, t, u = !1) {
      return (
        !1 !== e &&
        (!0 === e
          ? !!u || [{ value: t }]
          : 'value' in e
            ? [e]
            : 0 !== e.length && e)
      );
    }
    function tN(e, t) {
      return 'string' == typeof e || 'key' in e
        ? { from: t, to: e }
        : 'from' in e
          ? { from: e.from, to: e.to }
          : { from: t, to: e.to };
    }
    function tj(e, t) {
      return void 0 === e
        ? []
        : Array.isArray(e)
          ? e.map(e => tN(e, t))
          : [tN(e, t)];
    }
    function tP(e, t) {
      let u = tj('object' == typeof e && 'redirect' in e ? e.redirect : e, t);
      return 0 === u.length
        ? { remain: t, redirect: u }
        : 'object' == typeof e && 'remain' in e
          ? { remain: e.remain, redirect: u }
          : { redirect: u };
    }
    var tT = class extends ty {
        constructor(e) {
          (super(e),
            (this._choices = (function (e, t) {
              let u = new Map();
              for (let r of e) {
                let e = r[t];
                if (u.has(e))
                  throw Error(`Duplicate ${t} ${JSON.stringify(e)}`);
                u.set(e, r);
              }
              return u;
            })(
              e.choices.map(e =>
                e && 'object' == typeof e ? e : { value: e }
              ),
              'value'
            )));
        }
        expected({ descriptor: e }) {
          let t = Array.from(this._choices.keys())
              .map(e => this._choices.get(e))
              .filter(({ hidden: e }) => !e)
              .map(e => e.value)
              .sort(tk)
              .map(e.value),
            u = t.slice(0, -2),
            r = t.slice(-2);
          return {
            text: u.concat(r.join(' or ')).join(', '),
            list: { title: 'one of the following values', values: t }
          };
        }
        validate(e) {
          return this._choices.has(e);
        }
        deprecated(e) {
          let t = this._choices.get(e);
          return !!t && !!t.deprecated && { value: e };
        }
        forward(e) {
          let t = this._choices.get(e);
          return t ? t.forward : void 0;
        }
        redirect(e) {
          let t = this._choices.get(e);
          return t ? t.redirect : void 0;
        }
      },
      tL = class extends ty {
        expected() {
          return 'a number';
        }
        validate(e, t) {
          return 'number' == typeof e;
        }
      },
      t$ = class extends tL {
        expected() {
          return 'an integer';
        }
        validate(e, t) {
          return (
            !0 === t.normalizeValidateResult(super.validate(e, t), e) &&
            e === Math.floor(e)
          );
        }
      },
      tI = class extends ty {
        expected() {
          return 'a string';
        }
        validate(e) {
          return 'string' == typeof e;
        }
      },
      tR = (e, t, u) => {
        let { text: r, list: n } = u.normalizeExpectedResult(
            u.schemas[e].expected(u)
          ),
          D = [];
        return (
          r && D.push(td(e, t, r, u.descriptor)),
          n &&
            D.push(
              [td(e, t, n.title, u.descriptor)].concat(
                n.values.map(e =>
                  (function e({ text: t, list: u }, r) {
                    let n = [];
                    return (
                      t && n.push(`- ${tl.blue(t)}`),
                      u &&
                        n.push(
                          [`- ${tl.blue(u.title)}:`].concat(
                            u.values.map(t =>
                              e(t, r - tf.length).replace(/^|\n/g, `$&${tf}`)
                            )
                          ).join(`
`)
                        ),
                      tp(n, r)
                    );
                  })(e, u.loggerPrintWidth)
                )
              ).join(`
`)
            ),
          tp(D, u.loggerPrintWidth)
        );
      },
      tM = (e, t, { descriptor: u }) => {
        let r = [
          `${tl.yellow('string' == typeof e ? u.key(e) : u.pair(e))} is deprecated`
        ];
        return (
          t &&
            r.push(
              `we now treat it as ${tl.blue('string' == typeof t ? u.key(t) : u.pair(t))}`
            ),
          r.join('; ') + '.'
        );
      },
      tW = class {
        constructor(e, t) {
          let {
            logger: u = console,
            loggerPrintWidth: r = 80,
            descriptor: n = ts,
            unknown: D = tm,
            invalid: i = tR,
            deprecated: o = tM,
            missing: a = () => !1,
            required: s = () => !1,
            preprocess: l = e => e,
            postprocess: c = () => tF
          } = t || {};
          ((this._utils = {
            descriptor: n,
            logger: u || { warn: () => {} },
            loggerPrintWidth: r,
            schemas: (function (e, t) {
              let u = Object.create(null);
              for (let r of e) {
                let e = r[t];
                if (u[e]) throw Error(`Duplicate ${t} ${JSON.stringify(e)}`);
                u[e] = r;
              }
              return u;
            })(e, 'name'),
            normalizeDefaultResult: tS,
            normalizeExpectedResult: tx,
            normalizeDeprecatedResult: tO,
            normalizeForwardResult: tj,
            normalizeRedirectResult: tP,
            normalizeValidateResult: t_
          }),
            (this._unknownHandler = D),
            (this._invalidHandler = (...e) => {
              let t = i(...e);
              return 'string' == typeof t ? Error(t) : t;
            }),
            (this._deprecatedHandler = o),
            (this._identifyMissing = (e, t) => !(e in t) || a(e, t)),
            (this._identifyRequired = s),
            (this._preprocess = l),
            (this._postprocess = c),
            this.cleanHistory());
        }
        cleanHistory() {
          let e;
          this._hasDeprecationWarned =
            ((e = Object.create(null)),
            t => {
              let u = JSON.stringify(t);
              return !!e[u] || ((e[u] = !0), !1);
            });
        }
        normalize(e) {
          let t = {},
            u = [this._preprocess(e, this._utils)],
            r = () => {
              for (; 0 !== u.length;) {
                let e = u.shift(),
                  r = this._applyNormalization(e, t);
                u.push(...r);
              }
            };
          for (let e of (r(), Object.keys(this._utils.schemas))) {
            let r = this._utils.schemas[e];
            if (!(e in t)) {
              let t = tS(r.default(this._utils));
              'value' in t && u.push({ [e]: t.value });
            }
          }
          for (let e of (r(), Object.keys(this._utils.schemas))) {
            if (!(e in t)) continue;
            let u = this._utils.schemas[e],
              r = t[e],
              n = u.postprocess(r, this._utils);
            n !== tF && (this._applyValidation(n, e, u), (t[e] = n));
          }
          return (this._applyPostprocess(t), this._applyRequiredCheck(t), t);
        }
        _applyNormalization(e, t) {
          let u = [],
            { knownKeys: r, unknownKeys: n } = this._partitionOptionKeys(e);
          for (let n of r) {
            let r = this._utils.schemas[n],
              D = r.preprocess(e[n], this._utils);
            this._applyValidation(D, n, r);
            let i = ({ from: e, to: t }) => {
                u.push(
                  'string' == typeof t ? { [t]: e } : { [t.key]: t.value }
                );
              },
              o = ({ value: e, redirectTo: t }) => {
                let u = tO(r.deprecated(e, this._utils), D, !0);
                if (!1 !== u)
                  if (!0 === u)
                    this._hasDeprecationWarned(n) ||
                      this._utils.logger.warn(
                        this._deprecatedHandler(n, t, this._utils)
                      );
                  else
                    for (let { value: e } of u) {
                      let u = { key: n, value: e };
                      if (!this._hasDeprecationWarned(u)) {
                        let r = 'string' == typeof t ? { key: t, value: e } : t;
                        this._utils.logger.warn(
                          this._deprecatedHandler(u, r, this._utils)
                        );
                      }
                    }
              };
            tj(r.forward(D, this._utils), D).forEach(i);
            let a = tP(r.redirect(D, this._utils), D);
            if ((a.redirect.forEach(i), 'remain' in a)) {
              let e = a.remain;
              ((t[n] = n in t ? r.overlap(t[n], e, this._utils) : e),
                o({ value: e }));
            }
            for (let { from: e, to: t } of a.redirect)
              o({ value: e, redirectTo: t });
          }
          for (let r of n) {
            let n = e[r];
            this._applyUnknownHandler(r, n, t, (e, t) => {
              u.push({ [e]: t });
            });
          }
          return u;
        }
        _applyRequiredCheck(e) {
          for (let t of Object.keys(this._utils.schemas))
            if (this._identifyMissing(t, e) && this._identifyRequired(t))
              throw this._invalidHandler(t, tc, this._utils);
        }
        _partitionOptionKeys(e) {
          let [t, u] = (function (e, t) {
            let u = [],
              r = [];
            for (let n of e) t(n) ? u.push(n) : r.push(n);
            return [u, r];
          })(
            Object.keys(e).filter(t => !this._identifyMissing(t, e)),
            e => e in this._utils.schemas
          );
          return { knownKeys: t, unknownKeys: u };
        }
        _applyValidation(e, t, u) {
          let r = t_(u.validate(e, this._utils), e);
          if (!0 !== r) throw this._invalidHandler(t, r.value, this._utils);
        }
        _applyUnknownHandler(e, t, u, r) {
          let n = this._unknownHandler(e, t, this._utils);
          if (n)
            for (let e of Object.keys(n)) {
              if (this._identifyMissing(e, n)) continue;
              let t = n[e];
              e in this._utils.schemas ? r(e, t) : (u[e] = t);
            }
        }
        _applyPostprocess(e) {
          let t = this._postprocess(e, this._utils);
          if (t !== tF) {
            if (t.delete) for (let u of t.delete) delete e[u];
            if (t.override) {
              let { knownKeys: u, unknownKeys: r } = this._partitionOptionKeys(
                t.override
              );
              for (let r of u) {
                let u = t.override[r];
                (this._applyValidation(u, r, this._utils.schemas[r]),
                  (e[r] = u));
              }
              for (let u of r) {
                let r = t.override[u];
                this._applyUnknownHandler(u, r, e, (t, u) => {
                  let r = this._utils.schemas[t];
                  (this._applyValidation(u, t, r), (e[t] = u));
                });
              }
            }
          }
        }
      },
      tV = function (
        e,
        t,
        {
          logger: u = !1,
          isCLI: n = !1,
          passThrough: D = !1,
          FlagSchema: i,
          descriptor: o
        } = {}
      ) {
        if (n) {
          if (!i) throw Error("'FlagSchema' option is required.");
          if (!o) throw Error("'descriptor' option is required.");
        } else o = ts;
        let a = D
            ? Array.isArray(D)
              ? (e, t) => (D.includes(e) ? { [e]: t } : void 0)
              : (e, t) => ({ [e]: t })
            : (e, t, u) => {
                let { _: r, ...n } = u.schemas;
                return tm(e, t, { ...u, schemas: n });
              },
          s = new tW(
            (function (e, { isCLI: t, FlagSchema: u }) {
              let r = [];
              for (let n of (t && r.push(tA.create({ name: '_' })), e))
                (r.push(
                  (function (e, { isCLI: t, optionInfos: u, FlagSchema: r }) {
                    let { name: n } = e,
                      D = { name: n },
                      i,
                      o = {};
                    switch (e.type) {
                      case 'int':
                        ((i = t$), t && (D.preprocess = Number));
                        break;
                      case 'string':
                      case 'path':
                        i = tI;
                        break;
                      case 'choice':
                        ((i = tT),
                          (D.choices = e.choices.map(t =>
                            t?.redirect
                              ? {
                                  ...t,
                                  redirect: {
                                    to: { key: e.name, value: t.redirect }
                                  }
                                }
                              : t
                          )));
                        break;
                      case 'boolean':
                        i = tw;
                        break;
                      case 'flag':
                        ((i = r),
                          (D.flags = u.flatMap(e =>
                            [
                              e.alias,
                              e.description && e.name,
                              e.oppositeDescription && `no-${e.name}`
                            ].filter(Boolean)
                          )));
                        break;
                      default:
                        throw Error(`Unexpected type ${e.type}`);
                    }
                    if (
                      (e.exception
                        ? (D.validate = (t, u, r) =>
                            e.exception(t) || u.validate(t, r))
                        : (D.validate = (e, t, u) =>
                            void 0 === e || t.validate(e, u)),
                      e.redirect &&
                        (o.redirect = t =>
                          t
                            ? {
                                to:
                                  'string' == typeof e.redirect
                                    ? e.redirect
                                    : {
                                        key: e.redirect.option,
                                        value: e.redirect.value
                                      }
                              }
                            : void 0),
                      e.deprecated && (o.deprecated = !0),
                      t && !e.array)
                    ) {
                      let e = D.preprocess || (e => e);
                      D.preprocess = (t, u, r) =>
                        u.preprocess(e(Array.isArray(t) ? y(0, t, -1) : t), r);
                    }
                    return e.array
                      ? tb.create({
                          ...(t
                            ? { preprocess: e => (Array.isArray(e) ? e : [e]) }
                            : {}),
                          ...o,
                          valueSchema: i.create(D)
                        })
                      : i.create({ ...D, ...o });
                  })(n, { isCLI: t, optionInfos: e, FlagSchema: u })
                ),
                  n.alias &&
                    t &&
                    r.push(tB.create({ name: n.alias, sourceName: n.name })));
              return r;
            })(t, { isCLI: n, FlagSchema: i }),
            { logger: u, unknown: a, descriptor: o }
          ),
          l = !1 !== u;
        l && r && (s._hasDeprecationWarned = r);
        let c = s.normalize(e);
        return (l && (r = s._hasDeprecationWarned), c);
      },
      tz =
        Array.prototype.findLast ??
        function (e) {
          for (let t = this.length - 1; t >= 0; t--) {
            let u = this[t];
            if (e(u, t, this)) return u;
          }
        },
      tK = i('findLast', function () {
        if (Array.isArray(this)) return tz;
      }),
      tU = Symbol.for('PRETTIER_IS_FRONT_MATTER'),
      tq = [],
      tJ = function (e) {
        return !!e?.[tU];
      },
      tH = new Set(['yaml', 'toml']),
      tG = ({ node: e }) => tJ(e) && tH.has(e.language);
    async function tZ(e, t, u, r) {
      let { node: n } = u,
        { language: D } = n;
      if (!tH.has(D)) return;
      let i = n.value.trim(),
        o;
      if (i) {
        let t = 'yaml' === D ? D : ta(r, { language: D });
        if (!t) return;
        o = i ? await e(i, { parser: t }) : '';
      } else o = i;
      return et([
        n.startDelimiter,
        n.explicitLanguage ?? '',
        es,
        o,
        o ? es : '',
        n.endDelimiter
      ]);
    }
    var tQ = new Set([
        'tokens',
        'comments',
        'parent',
        'enclosingNode',
        'precedingNode',
        'followingNode'
      ]),
      tX = e => Object.keys(e).filter(e => !tQ.has(e)),
      tY = function (e, t) {
        let u = e ? t => e(t, tQ) : tX;
        return t
          ? new Proxy(u, {
              apply: (e, t, u) => (tJ(u[0]) ? tq : Reflect.apply(e, t, u))
            })
          : u;
      };
    function t0(e, t) {
      if (!t) throw Error('parserName is required.');
      let u = tK(0, e, e => e.parsers && e4(e.parsers, t));
      if (u) return u;
      let r = `Couldn't resolve parser "${t}".`;
      throw new e7(
        (r += ' Plugins must be explicitly added to the standalone bundle.')
      );
    }
    function t2({ plugins: e, parser: t }) {
      return t1(t0(e, t), t);
    }
    function t1(e, t) {
      let u = e.parsers[t];
      return 'function' == typeof u ? u() : u;
    }
    async function t8(e, t) {
      let u = e.printers[t];
      return I(t6, 'function' == typeof u ? await u() : u, t3);
    }
    function t3(e) {
      var t, u;
      let {
          features: r,
          getVisitorKeys: n,
          embed: D,
          massageAstNode: i,
          print: o,
          ...a
        } = e,
        s = (r = {
          experimental_avoidAstMutation: !1,
          ...(t = r),
          experimental_frontMatterSupport:
            ((u = t?.experimental_frontMatterSupport), { ...t7, ...u })
        }).experimental_frontMatterSupport;
      n = tY(n, s.massageAstNode || s.embed || s.print);
      let l = i;
      i &&
        s.massageAstNode &&
        (l = new Proxy(i, {
          apply: (e, t, u) => (
            (function (e, t) {
              tG({ node: e }) && (delete t.end, delete t.raw, delete t.value);
            })(...u),
            Reflect.apply(e, t, u)
          )
        }));
      let c = D;
      if (D) {
        let e;
        c = new Proxy(D, {
          get: (t, u, r) =>
            'getVisitorKeys' === u
              ? (e ??
                  (e = D.getVisitorKeys
                    ? tY(D.getVisitorKeys, s.massageAstNode || s.embed)
                    : n),
                e)
              : Reflect.get(t, u, r),
          apply: (e, t, u) =>
            s.embed && tG(...u) ? tZ : Reflect.apply(e, t, u)
        });
      }
      let F = o;
      return (
        s.print &&
          (F = new Proxy(o, {
            apply(e, t, u) {
              let [r] = u;
              return tJ(r.node)
                ? (function ({ node: e }) {
                    return e.raw;
                  })(r)
                : Reflect.apply(e, t, u);
            }
          })),
        {
          features: r,
          getVisitorKeys: n,
          embed: c,
          massageAstNode: l,
          print: F,
          ...a
        }
      );
    }
    var t6 = new WeakMap(),
      t7 = Object.fromEntries(['clean', 'embed', 'print'].map(e => [e, !1])),
      t9 = {
        astFormat: 'estree',
        printer: {},
        originalText: void 0,
        locStart: null,
        locEnd: null,
        getVisitorKeys: null
      };
    async function t4(e, t = {}) {
      let u = { ...e };
      if (!u.parser) {
        if (!u.filepath)
          throw new e9(
            "No parser and no file path given, couldn't infer a parser."
          );
        if (((u.parser = ta(u, { physicalFile: u.filepath })), !u.parser))
          throw new e9(`No parser could be inferred for file "${u.filepath}".`);
      }
      let r = te({ plugins: e.plugins, showDeprecated: !0 }).options,
        n = {
          ...t9,
          ...Object.fromEntries(
            r.filter(e => void 0 !== e.default).map(e => [e.name, e.default])
          )
        },
        D = t0(u.plugins, u.parser),
        i = await t1(D, u.parser);
      ((u.astFormat = i.astFormat),
        (u.locEnd = i.locEnd),
        (u.locStart = i.locStart));
      let o = D.printers?.[i.astFormat]
          ? D
          : (function (e, t) {
              if (!t) throw Error('astFormat is required.');
              let u = tK(0, e, e => e.printers && e4(e.printers, t));
              if (u) return u;
              let r = `Couldn't find plugin for AST format "${t}".`;
              throw new e7(
                (r +=
                  ' Plugins must be explicitly added to the standalone bundle.')
              );
            })(u.plugins, i.astFormat),
        a = await t8(o, i.astFormat);
      ((u.printer = a), (u.getVisitorKeys = a.getVisitorKeys));
      let s = o.defaultOptions
        ? Object.fromEntries(
            Object.entries(o.defaultOptions).filter(([, e]) => void 0 !== e)
          )
        : {};
      for (let [e, t] of Object.entries({ ...n, ...s })) u[e] ?? (u[e] = t);
      return (
        'json' === u.parser && (u.trailingComma = 'none'),
        tV(u, r, { passThrough: Object.keys(t9), ...t })
      );
    }
    var t5 = /\r\n|[\n\r\u2028\u2029]/;
    async function ue(e, t) {
      let u,
        r = await t2(t),
        n = r.preprocess ? await r.preprocess(e, t) : e;
      t.originalText = n;
      try {
        u = await r.parse(n, t, t);
      } catch (t) {
        !(function (e, t) {
          let { loc: u } = e;
          if (u) {
            let { start: r, end: n } = u;
            (r && (r = { line: r.line, column: r.column - 1 }),
              n && (n = { line: n.line, column: n.column - 1 }));
            let D = (function (e, t, u = {}) {
              return (function (e, t, u = {}) {
                let { defs: r, highlight: n } = {
                    defs: {
                      gutter: String,
                      marker: String,
                      message: String,
                      reset: String
                    },
                    highlight: String
                  },
                  D = (u.startLine || 1) - 1,
                  {
                    start: i,
                    end: o,
                    markerLines: a
                  } = (function (e, t, u, r) {
                    let n = { column: null, line: -1, ...e.start },
                      D = { ...n, ...e.end },
                      { linesAbove: i = 2, linesBelow: o = 3 } = u || {},
                      a = n.line - r,
                      s = n.column,
                      l = D.line - r,
                      c = D.column,
                      F = Math.max(a - (i + 1), 0),
                      f = Math.min(t.length, l + o);
                    (-1 === a && (F = 0), -1 === l && (f = t.length));
                    let d = l - a,
                      p = {};
                    if (d)
                      for (let e = 0; e <= d; e++) {
                        let u = e + a;
                        if (null == s) p[u] = !0;
                        else if (0 === e) {
                          let e = t[u - 1].length;
                          p[u] = [s, e - s];
                        } else if (e === d) p[u] = [0, c];
                        else {
                          let e = t[u - 1].length;
                          p[u] = [0, e];
                        }
                      }
                    else if (s === c) null != s ? (p[a] = [s, 0]) : (p[a] = !0);
                    else {
                      let e = s ?? 0,
                        t = c ?? e;
                      p[a] = [e, t - e];
                    }
                    return { start: F, end: f, markerLines: p };
                  })(t, e.split(t5), u, D),
                  s = t.start && 'number' == typeof t.start.column,
                  l = String(o + D).length,
                  c = n(e)
                    .split(t5, o)
                    .slice(i, o)
                    .map((e, t) => {
                      let n = i + 1 + t,
                        o = ` ${` ${n + D}`.slice(-l)} |`,
                        s = a[n],
                        c = !a[n + 1];
                      if (!s)
                        return ` ${r.gutter(o)}${e.length > 0 ? ` ${e}` : ''}`;
                      {
                        let t = '';
                        if (Array.isArray(s)) {
                          let n = e.slice(0, s[0]).replace(/[^\t]/g, ' '),
                            D = s[1] || 1;
                          ((t = [
                            `
 `,
                            r.gutter(o.replace(/\d/g, ' ')),
                            ' ',
                            n,
                            r.marker('^').repeat(D)
                          ].join('')),
                            c &&
                              u.message &&
                              (t += ' ' + r.message(u.message)));
                        }
                        return [
                          r.marker('>'),
                          r.gutter(o),
                          e.length > 0 ? ` ${e}` : '',
                          t
                        ].join('');
                      }
                    }).join(`
`);
                return (
                  u.message &&
                    !s &&
                    (c = `${' '.repeat(l + 1)}${u.message}
${c}`),
                  r.reset(c)
                );
              })(e, t, u);
            })(t, { start: r, end: n }, { highlightCode: !0 });
            ((e.message +=
              `
` + D),
              (e.codeFrame = D));
          }
          throw e;
        })(t, e);
      }
      return { text: n, ast: u };
    }
    async function ut(e, t, u, r, n) {
      if ('auto' !== u.embeddedLanguageFormatting) return;
      let { printer: D } = u,
        { embed: i } = D;
      if (!i) return;
      if (i.length > 2)
        throw Error(
          'printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/plugins#optional-embed'
        );
      let { hasPrettierIgnore: o } = D,
        { getVisitorKeys: a } = i,
        s = [];
      !(function t() {
        let { node: r } = e;
        if (null === r || 'object' != typeof r || o?.(e)) return;
        for (let u of a(r)) Array.isArray(r[u]) ? e.each(t, u) : e.call(t, u);
        let D = i(e, u);
        if (D) {
          if ('function' == typeof D)
            return void s.push({ print: D, node: r, pathStack: [...e.stack] });
          n.set(r, D);
        }
      })();
      let l = e.stack;
      for (let { print: r, node: D, pathStack: i } of s)
        try {
          e.stack = i;
          let o = await r(c, t, e, u);
          o && n.set(D, o);
        } catch (e) {
          if (globalThis.PRETTIER_DEBUG) throw e;
        }
      function c(e, t) {
        return uu(e, t, u, r);
      }
      e.stack = l;
    }
    async function uu(e, t, u, r) {
      let n = await t4(
          {
            ...u,
            ...t,
            parentParser: u.parser,
            originalText: e,
            cursorOffset: void 0,
            rangeStart: void 0,
            rangeEnd: void 0
          },
          { passThrough: !0 }
        ),
        { ast: D } = await ue(e, n);
      return Z(await r(D, n));
    }
    var ur = function (e, t, u, r) {
      let {
          originalText: n,
          [m]: D,
          locStart: i,
          locEnd: o,
          [Symbol.for('printedComments')]: a
        } = t,
        { node: s } = e,
        l = i(s),
        c = o(s);
      for (let e of D) i(e) >= l && o(e) <= c && a.add(e);
      let { printPrettierIgnored: F } = t.printer;
      return F ? F(e, t, u, r) : n.slice(l, c);
    };
    async function un(e, t) {
      ({ ast: e } = await ui(e, t));
      let u = new Map(),
        r = new eT(e),
        n = new Map();
      await ut(r, i, t, un, n);
      let D = await uD(r, t, i, void 0, n);
      if (
        ((function (e) {
          let { [m]: t, [Symbol.for('printedComments')]: u } = e;
          for (let e of t) {
            if (!e.printed && !u.has(e))
              throw Error(
                'Comment "' +
                  e.value.trim() +
                  '" was not printed. Please report this error!'
              );
            delete e.printed;
          }
        })(t),
        t.cursorOffset >= 0)
      ) {
        if (t.nodeAfterCursor && !t.nodeBeforeCursor) return [en, D];
        if (t.nodeBeforeCursor && !t.nodeAfterCursor) return [D, en];
      }
      return D;
      function i(e, t) {
        return void 0 === e || e === r
          ? o(t)
          : Array.isArray(e)
            ? r.call(() => o(t), ...e)
            : r.call(() => o(t), e);
      }
      function o(e) {
        c();
        let D = r.node;
        if (null == D) return '';
        let o = e$(D) && void 0 === e;
        if (o && u.has(D)) return u.get(D);
        let a = uD(r, t, i, e, n);
        return (o && u.set(D, a), a);
      }
    }
    function uD(e, t, u, r, n) {
      var D, i;
      let o,
        a,
        s,
        l,
        c,
        { node: F } = e,
        { printer: f } = t,
        d;
      switch (
        ((d = f.hasPrettierIgnore?.(e)
          ? ur(e, t, u, r)
          : n.has(F)
            ? n.get(F)
            : f.print(e, t, u, r)),
        F)
      ) {
        case t.cursorNode:
          d = X(d, e => [en, e, en]);
          break;
        case t.nodeBeforeCursor:
          d = X(d, e => [e, en]);
          break;
        case t.nodeAfterCursor:
          d = X(d, e => [en, e]);
      }
      return (
        f.printComment &&
          eL(F.comments) &&
          !f.willPrintOwnComments?.(e, t) &&
          ((D = d),
          (i = void 0),
          (o = t[Symbol.for('printedComments')]),
          (a = i?.filter ?? e3),
          (l =
            0 ===
            (s = new Set(
              e.node?.comments?.filter(e => !o?.has(e) && e.leading && a(e))
            )).size
              ? ''
              : e
                  .map(
                    ({ node: u }) =>
                      s.has(u)
                        ? (function (e, t) {
                            let u = e.node,
                              r = [e6(e, t)],
                              {
                                printer: n,
                                originalText: D,
                                locStart: i,
                                locEnd: o
                              } = t;
                            if (n.isBlockComment?.(u)) {
                              let e = ' ';
                              (eU(D, o(u)) &&
                                (e = eU(D, i(u), { backwards: !0 }) ? es : eo),
                                r.push(e));
                            } else r.push(es);
                            let a = eK(D, eM(D, o(u)));
                            return (!1 !== a && eU(D, a) && r.push(es), r);
                          })(e, t)
                        : '',
                    'comments'
                  )
                  .filter(Boolean)),
          (c = (function (e, t, u) {
            let r = e.node?.comments,
              n = new Set(r?.filter(e => e.trailing)),
              D = t[Symbol.for('printedComments')],
              i = u?.filter ?? e3,
              o = new Set(r?.filter(e => n.has(e) && !D?.has(e) && i(e)));
            if (0 === o.size) return '';
            let a = [],
              s;
            return (
              e.each(({ node: u }) => {
                n.has(u) &&
                  ((s = (function (e, t, u) {
                    let r = e.node,
                      n = e6(e, t),
                      { printer: D, originalText: i, locStart: o } = t,
                      a = D.isBlockComment?.(r);
                    return (u?.hasLineSuffix && !u?.isBlock) ||
                      eU(i, o(r), { backwards: !0 })
                      ? {
                          doc: eF([es, e8(i, o(r)) ? es : '', n]),
                          isBlock: a,
                          hasLineSuffix: !0
                        }
                      : !a || u?.hasLineSuffix
                        ? {
                            doc: [eF([' ', n]), er],
                            isBlock: a,
                            hasLineSuffix: !0
                          }
                        : { doc: [' ', n], isBlock: a, hasLineSuffix: !1 };
                  })(e, t, s)),
                  o.has(u) && a.push(s.doc));
              }, 'comments'),
              a
            );
          })(e, t, void 0)),
          (d = l || c ? X(D, e => [l, e, c]) : D)),
        d
      );
    }
    async function ui(e, t) {
      let u = e.comments ?? [];
      ((t[m] = u),
        (t[Symbol.for('printedComments')] = new Set()),
        (function (e, t) {
          let { comments: u } = e;
          if ((delete e.comments, !eL(u) || !t.printer.canAttachComment))
            return;
          let r = [],
            {
              printer: {
                features: { experimental_avoidAstMutation: n },
                handleComments: D = {}
              },
              originalText: i
            } = t,
            { ownLine: o = eY, endOfLine: a = eY, remaining: s = eY } = D,
            l = u.map((r, n) => ({
              ...(function e(t, u, r, n, D = []) {
                let { locStart: i, locEnd: o } = r,
                  a = i(u),
                  s = o(u),
                  l = eJ(t, D, {
                    cache: eX,
                    locStart: i,
                    locEnd: o,
                    getVisitorKeys: r.getVisitorKeys,
                    filter: r.printer.canAttachComment,
                    getChildren: r.printer.getCommentChildNodes
                  }),
                  c,
                  F,
                  f = 0,
                  d = l.length;
                for (; f < d;) {
                  let t = (f + d) >> 1,
                    n = l[t],
                    p = i(n),
                    h = o(n);
                  if (p <= a && s <= h) return e(n, u, r, n, [n, ...D]);
                  if (h <= a) {
                    ((c = n), (f = t + 1));
                    continue;
                  }
                  if (s <= p) {
                    ((F = n), (d = t));
                    continue;
                  }
                  throw Error('Comment location overlaps with node location');
                }
                if (n?.type === 'TemplateLiteral') {
                  let { quasis: e } = n,
                    t = e1(e, u, r);
                  (c && e1(e, c, r) !== t && (c = null),
                    F && e1(e, F, r) !== t && (F = null));
                }
                return { enclosingNode: n, precedingNode: c, followingNode: F };
              })(e, r, t),
              comment: r,
              text: i,
              options: t,
              ast: e,
              isLastComment: u.length - 1 === n,
              placement: void 0
            })),
            c = !n;
          for (let [e, t] of l.entries()) {
            let {
                comment: u,
                precedingNode: D,
                enclosingNode: i,
                followingNode: F,
                text: f,
                options: d,
                ast: p,
                isLastComment: h
              } = t,
              C = !(function (e, t, u, r) {
                let { comment: n, precedingNode: D } = u[r],
                  { locStart: i, locEnd: o } = t,
                  a = i(n);
                if (D)
                  for (let t = r - 1; t >= 0; t--) {
                    let { comment: r, precedingNode: n } = u[t];
                    if (n !== D || !e0(e.slice(o(r), a))) break;
                    a = i(r);
                  }
                return eU(e, a, { backwards: !0 });
              })(f, d, l, e)
                ? !(function (e, t, u, r) {
                    let { comment: n, followingNode: D } = u[r],
                      { locStart: i, locEnd: o } = t,
                      a = o(n);
                    if (D)
                      for (let t = r + 1; t < u.length; t++) {
                        let { comment: r, followingNode: n } = u[t];
                        if (n !== D || !e0(e.slice(a, i(r)))) break;
                        a = o(r);
                      }
                    return eU(e, a);
                  })(f, d, l, e)
                  ? 'remaining'
                  : 'endOfLine'
                : 'ownLine',
              E;
            if (
              (n ? ((t.placement = C), (E = [t])) : (E = [u, f, d, p, h]),
              c &&
                ((u.enclosingNode = i),
                (u.precedingNode = D),
                (u.followingNode = F)),
              (u.placement = C),
              'ownLine' === C)
            )
              o(...E) ||
                (F ? eG(F, u) : D ? eQ(D, u) : i ? eZ(i, u) : eZ(p, u));
            else if ('endOfLine' === C)
              a(...E) ||
                (D ? eQ(D, u) : F ? eG(F, u) : i ? eZ(i, u) : eZ(p, u));
            else if (!s(...E))
              if (D && F) {
                let e = r.length;
                (e > 0 && r[e - 1].followingNode !== F && e2(r, d), r.push(t));
              } else D ? eQ(D, u) : F ? eG(F, u) : i ? eZ(i, u) : eZ(p, u);
          }
          if ((e2(r, t), c))
            for (let e of u)
              (delete e.precedingNode,
                delete e.enclosingNode,
                delete e.followingNode);
        })(e, t));
      let {
        printer: { preprocess: r }
      } = t;
      return { ast: (e = r ? await r(e, t) : e), comments: u };
    }
    var uo = function (e, t) {
        let { cursorOffset: u, locStart: r, locEnd: n, getVisitorKeys: D } = t,
          i = e,
          o = [e];
        for (let t of (function* (e, t) {
          let u = [e];
          for (let e = 0; e < u.length; e++)
            for (let r of eq(u[e], t)) (yield r, u.push(r));
        })(e, { getVisitorKeys: D, filter: e => r(e) <= u && n(e) >= u }))
          (o.push(t), (i = t));
        if (eq(i, { getVisitorKeys: D }).next().done) return { cursorNode: i };
        let a,
          s,
          l = -1,
          c = 1 / 0;
        for (; o.length > 0 && (void 0 === a || void 0 === s);) {
          i = o.pop();
          let e = void 0 !== a,
            t = void 0 !== s;
          for (let o of eq(i, { getVisitorKeys: D })) {
            if (!e) {
              let e = n(o);
              e <= u && e > l && ((a = o), (l = e));
            }
            if (!t) {
              let e = r(o);
              e >= u && e < c && ((s = o), (c = e));
            }
          }
        }
        return { nodeBeforeCursor: a, nodeAfterCursor: s };
      },
      ua = function (e, t) {
        let { printer: u } = t,
          r = u.massageAstNode;
        if (!r) return e;
        let { getVisitorKeys: n } = u,
          { ignoredProperties: D } = r;
        return (function e(t, u) {
          if (!e$(t)) return t;
          if (Array.isArray(t)) return t.map(t => e(t, u)).filter(Boolean);
          let i = {},
            o = new Set(n(t));
          for (let u in t)
            !e4(t, u) ||
              D?.has(u) ||
              (o.has(u) ? (i[u] = e(t[u], t)) : (i[u] = t[u]));
          let a = r(t, i, u);
          if (null !== a) return a ?? i;
        })(e);
      },
      us =
        Array.prototype.findLastIndex ??
        function (e) {
          for (let t = this.length - 1; t >= 0; t--)
            if (e(this[t], t, this)) return t;
          return -1;
        },
      ul = i('findLastIndex', function () {
        if (Array.isArray(this)) return us;
      });
    function uc(e) {
      let t = ul(0, e, e => 'Program' !== e.type && 'File' !== e.type);
      return -1 === t ? e : e.slice(0, t + 1);
    }
    function uF(e, t, u, r, n = [], D, i) {
      let { locStart: o, locEnd: a } = i,
        s = o(e),
        l = a(e);
      if (
        t > l ||
        t < s ||
        ('rangeEnd' === D && t === s) ||
        ('rangeStart' === D && t === l)
      )
        return;
      let c = [e, ...n];
      for (let n of eJ(e, c, {
        cache: eX,
        locStart: o,
        locEnd: a,
        getVisitorKeys: u.getVisitorKeys,
        filter: u.printer.canAttachComment,
        getChildren: u.printer.getCommentChildNodes
      })) {
        let e = uF(n, t, u, r, c, D, i);
        if (e) return e;
      }
      if (r(e, n[0])) return c;
    }
    var uf = new Set([
        'JsonRoot',
        'ObjectExpression',
        'ArrayExpression',
        'StringLiteral',
        'NumericLiteral',
        'BooleanLiteral',
        'NullLiteral',
        'UnaryExpression',
        'TemplateLiteral'
      ]),
      ud = new Set([
        'OperationDefinition',
        'FragmentDefinition',
        'VariableDefinition',
        'TypeExtensionDefinition',
        'ObjectTypeDefinition',
        'FieldDefinition',
        'DirectiveDefinition',
        'EnumTypeDefinition',
        'EnumValueDefinition',
        'InputValueDefinition',
        'InputObjectTypeDefinition',
        'SchemaDefinition',
        'OperationTypeDefinition',
        'InterfaceTypeDefinition',
        'UnionTypeDefinition',
        'ScalarTypeDefinition'
      ]);
    function up(e, t, u) {
      if (!t) return !1;
      switch (e.parser) {
        case 'flow':
        case 'hermes':
        case 'babel':
        case 'babel-flow':
        case 'babel-ts':
        case 'typescript':
        case 'acorn':
        case 'espree':
        case 'meriyah':
        case 'oxc':
        case 'oxc-ts':
        case 'yuku':
        case 'yuku-ts':
        case '__babel_estree':
          var r;
          return (
            (r = t.type),
            'DeclareExportDeclaration' !== u?.type &&
              'TypeParameterDeclaration' !== r &&
              ('Directive' === r ||
                'TypeAlias' === r ||
                'TSExportAssignment' === r ||
                r.startsWith('Declare') ||
                r.startsWith('TSDeclare') ||
                r.endsWith('Statement') ||
                r.endsWith('Declaration'))
          );
        case 'json':
        case 'json5':
        case 'jsonc':
        case 'json-stringify':
          return uf.has(t.type);
        case 'graphql':
          return ud.has(t.kind);
        case 'vue':
          return 'root' !== t.tag;
      }
      return !1;
    }
    var uh = Symbol('cursor');
    async function uC(e, t, u = 0) {
      if (!e || 0 === e.trim().length)
        return { formatted: '', cursorOffset: -1, comments: [] };
      let { ast: r, text: n } = await ue(e, t);
      t.cursorOffset >= 0 && (t = { ...t, ...uo(r, t) });
      let D = await un(r, t);
      u > 0 && (D = eu([es, D], u, t.tabWidth));
      let i = ej(D, t);
      if (u > 0) {
        let e = i.formatted.trim();
        (void 0 !== i.cursorNodeStart &&
          ((i.cursorNodeStart -= i.formatted.indexOf(e)),
          i.cursorNodeStart < 0 &&
            ((i.cursorNodeStart = 0),
            (i.cursorNodeText = i.cursorNodeText.trimStart())),
          i.cursorNodeStart + i.cursorNodeText.length > e.length &&
            (i.cursorNodeText = i.cursorNodeText.trimEnd())),
          (i.formatted = e + p(t.endOfLine)));
      }
      let o = t[m];
      if (t.cursorOffset >= 0) {
        let e, u, r, D;
        if (
          (t.cursorNode || t.nodeBeforeCursor || t.nodeAfterCursor) &&
          i.cursorNodeText
        )
          if (((r = i.cursorNodeStart), (D = i.cursorNodeText), t.cursorNode))
            ((e = t.locStart(t.cursorNode)),
              (u = n.slice(e, t.locEnd(t.cursorNode))));
          else {
            if (!t.nodeBeforeCursor && !t.nodeAfterCursor)
              throw Error(
                'Cursor location must contain at least one of cursorNode, nodeBeforeCursor, nodeAfterCursor'
              );
            e = t.nodeBeforeCursor ? t.locEnd(t.nodeBeforeCursor) : 0;
            let r = t.nodeAfterCursor
              ? t.locStart(t.nodeAfterCursor)
              : n.length;
            u = n.slice(e, r);
          }
        else ((e = 0), (u = n), (r = 0), (D = i.formatted));
        let a = t.cursorOffset - e;
        if (u === D)
          return { formatted: i.formatted, cursorOffset: r + a, comments: o };
        let s = u.split('');
        s.splice(a, 0, uh);
        let c = D.split(''),
          F = l.diff(s, c, void 0),
          f = r;
        for (let e of F)
          if (e.removed) {
            if (e.value.includes(uh)) break;
          } else f += e.count;
        return { formatted: i.formatted, cursorOffset: f, comments: o };
      }
      return { formatted: i.formatted, cursorOffset: -1, comments: o };
    }
    async function uE(e, t) {
      let { ast: u, text: r } = await ue(e, t),
        [n, D] = (function (e, t, u) {
          let r,
            n,
            { rangeStart: D, rangeEnd: i } = t;
          c();
          let o = e.slice(D, i).search(/\S/),
            a = -1 === o;
          if (!a) for (D += o; i > D && !/\S/.test(e[i - 1]); --i);
          let s = t.printer.features?.experimental_locForRangeFormat ?? t,
            l = uF(u, D, t, (e, u) => up(t, e, u), [], 'rangeStart', s);
          if (!l) return;
          let F = a ? l : uF(u, i, t, e => up(t, e), [], 'rangeEnd', s);
          if (!F) return;
          if ('JsonRoot' === u.type) {
            var f;
            let e =
              ((f = new Set((f = F))), l.find(e => uf.has(e.type) && f.has(e)));
            ((r = e), (n = e));
          } else
            [r, n] = (function (e, t, { locStart: u, locEnd: r }) {
              let [n, ...D] = e,
                [i, ...o] = t;
              if (n === i) return [n, i];
              let a = u(n);
              for (let e of uc(o))
                if (u(e) >= a) i = e;
                else break;
              let s = r(i);
              for (let e of uc(D)) {
                if (r(e) <= s) n = e;
                else break;
                if (n === i) break;
              }
              return [n, i];
            })(l, F, t);
          let { locStart: d, locEnd: p } = s;
          return [Math.min(d(r), d(n)), Math.max(p(r), p(n))];
        })(r, t, u) ?? [0, 0],
        i = r.slice(n, D),
        o = Math.min(
          n,
          r.lastIndexOf(
            `
`,
            n
          ) + 1
        ),
        s = eP(r.slice(o, n).match(/^\s*/)[0], t.tabWidth),
        l = await uC(
          i,
          {
            ...t,
            rangeStart: 0,
            rangeEnd: 1 / 0,
            cursorOffset:
              t.cursorOffset > n && t.cursorOffset <= D
                ? t.cursorOffset - n
                : -1,
            endOfLine: 'lf'
          },
          s
        ),
        F = l.formatted.trimEnd(),
        { cursorOffset: f } = t;
      f > D
        ? (f += F.length - i.length)
        : l.cursorOffset >= 0 && (f = l.cursorOffset + n);
      let d = r.slice(0, n) + F + r.slice(D);
      if ('lf' !== t.endOfLine) {
        let e = p(t.endOfLine);
        (f >= 0 &&
          e ===
            `\r
` &&
          (f += C(
            d.slice(0, f),
            `
`
          )),
          (d = a(
            0,
            d,
            `
`,
            e
          )));
      }
      return { formatted: d, cursorOffset: f, comments: l.comments };
    }
    function um(e, t, u) {
      return 'number' != typeof t || Number.isNaN(t) || t < 0 || t > e.length
        ? u
        : t;
    }
    function ug(e, t) {
      let { cursorOffset: u, rangeStart: r, rangeEnd: n } = t;
      return (
        (u = um(e, u, -1)),
        (r = um(e, r, 0)),
        (n = um(e, n, e.length)),
        { ...t, cursorOffset: u, rangeStart: r, rangeEnd: n }
      );
    }
    function uy(e, t) {
      var u;
      let r,
        {
          cursorOffset: n,
          rangeStart: D,
          rangeEnd: i,
          endOfLine: o
        } = ug(e, t),
        s = '\uFEFF' === e.charAt(0);
      if (
        (s && ((e = e.slice(1)), n--, D--, i--),
        'auto' === o &&
          (o =
            -1 !== (r = (u = e).indexOf('\r'))
              ? u.charAt(r + 1) === d
                ? F
                : 'cr'
              : 'lf'),
        e.includes('\r'))
      ) {
        let t = t =>
          C(
            e.slice(0, Math.max(t, 0)),
            `\r
`
          );
        ((n -= t(n)), (D -= t(D)), (i -= t(i)), (e = a(0, e, E, d)));
      }
      return {
        hasBOM: s,
        text: e,
        options: ug(e, {
          ...t,
          cursorOffset: n,
          rangeStart: D,
          rangeEnd: i,
          endOfLine: o
        })
      };
    }
    async function uB(e, t) {
      let u = await t2(t);
      return !u.hasPragma || u.hasPragma(e);
    }
    async function uA(e, t) {
      return (await t2(t)).hasIgnorePragma?.(e);
    }
    async function ub(e, t) {
      let u,
        { hasBOM: r, text: n, options: D } = uy(e, await t4(t));
      return (D.rangeStart >= D.rangeEnd && '' !== n) ||
        (D.requirePragma && !(await uB(n, D))) ||
        (D.checkIgnorePragma && (await uA(n, D)))
        ? { formatted: e, cursorOffset: t.cursorOffset, comments: [] }
        : (D.rangeStart > 0 || D.rangeEnd < n.length
            ? (u = await uE(n, D))
            : (!D.requirePragma &&
                D.insertPragma &&
                D.printer.insertPragma &&
                !(await uB(n, D)) &&
                (n = D.printer.insertPragma(n)),
              (u = await uC(n, D))),
          r &&
            ((u.formatted = '\uFEFF' + u.formatted),
            u.cursorOffset >= 0 && u.cursorOffset++),
          u);
    }
    async function uv(e, t, u) {
      let { text: r, options: n } = uy(e, await t4(t)),
        D = await ue(r, n);
      return (
        u &&
          (u.preprocessForPrint && (D.ast = await ui(D.ast, n)),
          u.massage && (D.ast = ua(D.ast, n))),
        D
      );
    }
    async function uw(e, t) {
      return ((t = await t4(t)), ej(await un(e, t), t));
    }
    async function uk(e, t) {
      let u = (function (e) {
          let t = Object.create(null),
            u = new Set();
          return (function e(t, u, n) {
            if ('string' == typeof t) return JSON.stringify(t);
            if (Array.isArray(t)) {
              let u = t.map(e).filter(Boolean);
              return 1 === u.length ? u[0] : `[${u.join(', ')}]`;
            }
            if (t.type === P) {
              let e = n?.[u + 1]?.type === L;
              return t.literal
                ? e
                  ? 'literalline'
                  : 'literallineWithoutBreakParent'
                : t.hard
                  ? e
                    ? 'hardline'
                    : 'hardlineWithoutBreakParent'
                  : t.soft
                    ? 'softline'
                    : 'line';
            }
            if (t.type === L)
              return n?.[u - 1]?.type === P && n[u - 1].hard
                ? void 0
                : 'breakParent';
            if (t.type === k) return 'trim';
            if (t.type === v) return 'indent(' + e(t.contents) + ')';
            if (t.type === w)
              return -1 / 0 === t.n
                ? 'dedentToRoot(' + e(t.contents) + ')'
                : t.n < 0
                  ? 'dedent(' + e(t.contents) + ')'
                  : 'root' === t.n.type
                    ? 'markAsRoot(' + e(t.contents) + ')'
                    : 'align(' +
                      JSON.stringify(t.n) +
                      ', ' +
                      e(t.contents) +
                      ')';
            if (t.type === _)
              return (
                'ifBreak(' +
                e(t.breakContents) +
                (t.flatContents ? ', ' + e(t.flatContents) : '') +
                (t.groupId
                  ? (t.flatContents ? '' : ', ""') +
                    `, { groupId: ${r(t.groupId)} }`
                  : '') +
                ')'
              );
            if (t.type === O) {
              let u = [];
              (t.negate && u.push('negate: true'),
                t.groupId && u.push(`groupId: ${r(t.groupId)}`));
              let n = u.length > 0 ? `, { ${u.join(', ')} }` : '';
              return `indentIfBreak(${e(t.contents)}${n})`;
            }
            if (t.type === S) {
              let u = [];
              (t.break &&
                'propagated' !== t.break &&
                u.push('shouldBreak: true'),
                t.id && u.push(`id: ${r(t.id)}`));
              let n = u.length > 0 ? `, { ${u.join(', ')} }` : '';
              return t.expandedStates
                ? `conditionalGroup([${t.expandedStates.map(t => e(t)).join(',')}]${n})`
                : `group(${e(t.contents)}${n})`;
            }
            if (t.type === x)
              return `fill([${t.parts.map(t => e(t)).join(', ')}])`;
            if (t.type === N) return 'lineSuffix(' + e(t.contents) + ')';
            if (t.type === j) return 'lineSuffixBoundary';
            if (t.type === T)
              return `label(${JSON.stringify(t.label)}, ${e(t.contents)})`;
            if (t.type === b) return 'cursor';
            throw Error('Unknown doc type ' + t.type);
          })(
            (function e(t) {
              if (!t) return '';
              if (Array.isArray(t)) {
                let u = [];
                for (let r of t)
                  if (Array.isArray(r)) u.push(...e(r));
                  else {
                    let t = e(r);
                    '' !== t && u.push(t);
                  }
                return u;
              }
              return t.type === _
                ? {
                    ...t,
                    breakContents: e(t.breakContents),
                    flatContents: e(t.flatContents)
                  }
                : t.type === S
                  ? {
                      ...t,
                      contents: e(t.contents),
                      expandedStates: t.expandedStates?.map(e)
                    }
                  : t.type === x
                    ? { type: 'fill', parts: t.parts.map(e) }
                    : t.contents
                      ? { ...t, contents: e(t.contents) }
                      : t;
            })(e)
          );
          function r(e) {
            if ('symbol' != typeof e) return JSON.stringify(String(e));
            if (e in t) return t[e];
            let r = e.description || 'symbol';
            for (let n = 0; ; n++) {
              let D = r + (n > 0 ? ` #${n}` : '');
              if (!u.has(D))
                return (u.add(D), (t[e] = `Symbol.for(${JSON.stringify(D)})`));
            }
          }
        })(e),
        { formatted: r } = await ub(u, { ...t, parser: '__js_expression' });
      return r;
    }
    async function uS(e, t) {
      t = await t4(t);
      let { ast: u } = await ue(e, t);
      return (t.cursorOffset >= 0 && (t = { ...t, ...uo(u, t) }), un(u, t));
    }
    async function ux(e, t) {
      return ej(e, await t4(t));
    }
    var u_ = {};
    D(u_, { builders: () => uO, printer: () => uN, utils: () => uj });
    var uO = {
        join: ei,
        line: eo,
        softline: { type: P, soft: !0 },
        hardline: es,
        literalline: ec,
        group: eD,
        conditionalGroup: function (e, t) {
          return eD(e[0], { ...t, expandedStates: e });
        },
        fill: function (e) {
          return (c(), { type: x, parts: e });
        },
        lineSuffix: eF,
        lineSuffixBoundary: { type: j },
        cursor: en,
        breakParent: er,
        ifBreak: function (e, t = '', u = {}) {
          return (
            c(),
            '' !== t && c(),
            { type: _, breakContents: e, flatContents: t, groupId: u.groupId }
          );
        },
        trim: { type: k },
        indent: Y,
        indentIfBreak: function (e, t) {
          return (
            c(),
            { type: O, contents: e, groupId: t.groupId, negate: t.negate }
          );
        },
        align: ee,
        addAlignmentToDoc: eu,
        markAsRoot: et,
        dedentToRoot: function (e) {
          return ee(-1 / 0, e);
        },
        dedent: function (e) {
          return ee(-1, e);
        },
        hardlineWithoutBreakParent: ea,
        literallineWithoutBreakParent: el,
        label: function (e, t) {
          return (c(), e ? { type: T, label: e, contents: t } : t);
        },
        concat: e => e
      },
      uN = { printDocToString: ej },
      uj = {
        willBreak: function (e) {
          return K(e, U, !1);
        },
        traverseDoc: V,
        findInDoc: K,
        mapDoc: z,
        removeLines: function (e) {
          return z(e, J);
        },
        stripTrailingHardline: Z,
        replaceEndOfLine: function (e, t = ec) {
          return z(e, e =>
            'string' == typeof e
              ? ei(
                  t,
                  e.split(`
`)
                )
              : e
          );
        },
        canBreak: function (e) {
          return K(e, Q, !1);
        }
      },
      uP = '3.9.6',
      uT = {};
    D(uT, {
      addDanglingComment: () => eZ,
      addLeadingComment: () => eG,
      addTrailingComment: () => eQ,
      getAlignmentSize: () => eP,
      getIndentSize: () => uM,
      getMaxContinuousCount: () => uW,
      getNextNonSpaceNonCommentCharacter: () => uV,
      getNextNonSpaceNonCommentCharacterIndex: () => uZ,
      getPreferredQuote: () => uJ,
      getStringWidth: () => eB,
      hasNewline: () => eU,
      hasNewlineInRange: () => uH,
      hasSpaces: () => uG,
      isNextLineEmpty: () => uY,
      isNextLineEmptyAfterIndex: () => uR,
      isPreviousLineEmpty: () => uQ,
      makeString: () => uX,
      skip: () => eI,
      skipEverythingButNewLine: () => eV,
      skipInlineComment: () => uL,
      skipNewline: () => eK,
      skipSpaces: () => eM,
      skipToLineEnd: () => eW,
      skipTrailingComment: () => u$,
      skipWhitespace: () => eR
    });
    var uL = function (e, t) {
        if (!1 === t) return !1;
        if ('/' === e.charAt(t) && '*' === e.charAt(t + 1)) {
          for (let u = t + 2; u < e.length; ++u)
            if ('*' === e.charAt(u) && '/' === e.charAt(u + 1)) return u + 2;
        }
        return t;
      },
      u$ = function (e, t) {
        return (
          !1 !== t &&
          ('/' === e.charAt(t) && '/' === e.charAt(t + 1) ? eV(e, t) : t)
        );
      },
      uI = function (e, t) {
        let u = null,
          r = t;
        for (; r !== u;)
          ((u = r),
            (r = eM(e, r)),
            (r = uL(e, r)),
            (r = u$(e, r)),
            (r = eK(e, r)));
        return r;
      },
      uR = function (e, t) {
        let u = null,
          r = t;
        for (; r !== u;)
          ((u = r), (r = eW(e, r)), (r = uL(e, r)), (r = eM(e, r)));
        return ((r = u$(e, r)), !1 !== (r = eK(e, r)) && eU(e, r));
      },
      uM = function (e, t) {
        let u = e.lastIndexOf(`
`);
        return -1 === u ? 0 : eP(e.slice(u + 1).match(/^[\t ]*/)[0], t);
      },
      uW = function (e, t) {
        let u = e.matchAll(
          RegExp(
            `(?:${(function (e) {
              if ('string' != typeof e) throw TypeError('Expected a string');
              return e
                .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                .replace(/-/g, '\\x2d');
            })(t)})+`,
            'g'
          )
        );
        return (
          u.reduce || (u = [...u]),
          u.reduce((e, [t]) => Math.max(e, t.length), 0) / t.length
        );
      },
      uV = function (e, t) {
        let u = uI(e, t);
        return !1 === u ? '' : e.charAt(u);
      },
      uz = Object.freeze({ character: "'", codePoint: 39 }),
      uK = Object.freeze({ character: '"', codePoint: 34 }),
      uU = Object.freeze({ preferred: uz, alternate: uK }),
      uq = Object.freeze({ preferred: uK, alternate: uz });
    function uJ(e, t) {
      let { preferred: u, alternate: r } = !0 === t || "'" === t ? uU : uq,
        { length: n } = e,
        D = 0,
        i = 0;
      for (let t = 0; t < n; t++) {
        let n = e.charCodeAt(t);
        n === u.codePoint ? D++ : n === r.codePoint && i++;
      }
      return (D > i ? r : u).character;
    }
    var uH = function (e, t, u) {
        for (let r = t; r < u; ++r)
          if (
            e.charAt(r) ===
            `
`
          )
            return !0;
        return !1;
      },
      uG = function (e, t, u = {}) {
        return eM(e, u.backwards ? t - 1 : t, u) !== t;
      };
    function uZ(e, t) {
      return 2 == arguments.length || 'number' == typeof t
        ? uI(e, t)
        : (function (e, t, u) {
            return uI(e, u(t));
          })(...arguments);
    }
    function uQ(e, t) {
      return 2 == arguments.length || 'number' == typeof t
        ? e8(e, t)
        : (function (e, t, u) {
            return e8(e, u(t));
          })(...arguments);
    }
    function uX(e, t, u) {
      let r = '"' === t ? "'" : '"',
        n = a(0, e, /\\(.)|(["'])/gs, (e, n, D) =>
          n === r
            ? n
            : D === t
              ? '\\' + D
              : D ||
                (u && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(n)
                  ? n
                  : '\\' + n)
        );
      return t + n + t;
    }
    function uY(e, t) {
      return 2 == arguments.length || 'number' == typeof t
        ? uR(e, t)
        : (function (e, t, u) {
            return uR(e, u(t));
          })(...arguments);
    }
    function u0(e, t = 1) {
      return async (...u) => {
        let r = u[t] ?? {},
          n = r.plugins ?? [];
        return (
          (u[t] = { ...r, plugins: Array.isArray(n) ? n : Object.values(n) }),
          await e(...u)
        );
      };
    }
    var u2 = u0(ub);
    async function u1(e, t) {
      let { formatted: u } = await u2(e, { ...t, cursorOffset: -1 });
      return u;
    }
    async function u8(e, t) {
      return (await u1(e, t)) === e;
    }
    var u3 = u0(te, 0),
      u6 = {
        parse: u0(uv),
        formatAST: u0(uw),
        formatDoc: u0(uk),
        printToDoc: u0(uS),
        printDocToString: u0(ux)
      };
    u.d(t, { format: () => u1 });
  }
};
//# sourceMappingURL=8292.8301e0024331b5b0.js.map
