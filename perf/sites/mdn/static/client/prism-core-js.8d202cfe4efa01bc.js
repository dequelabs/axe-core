/*! LICENSE: prism-core-js.8d202cfe4efa01bc.js.LICENSE.txt */
export const __rspack_esm_id = 5087;
export const __rspack_esm_ids = [5087];
export const __webpack_modules__ = {
  71983(e, t, n) {
    var r = (function (e) {
      var t = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
        n = 0,
        r = {},
        a = {
          manual: e.Prism && e.Prism.manual,
          disableWorkerMessageHandler:
            e.Prism && e.Prism.disableWorkerMessageHandler,
          util: {
            encode: function e(t) {
              return t instanceof i
                ? new i(t.type, e(t.content), t.alias)
                : Array.isArray(t)
                  ? t.map(e)
                  : t
                      .replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/\u00a0/g, ' ');
            },
            type: function (e) {
              return Object.prototype.toString.call(e).slice(8, -1);
            },
            objId: function (e) {
              return (
                e.__id || Object.defineProperty(e, '__id', { value: ++n }),
                e.__id
              );
            },
            clone: function e(t, n) {
              var r, i;
              switch (((n = n || {}), a.util.type(t))) {
                case 'Object':
                  if (n[(i = a.util.objId(t))]) return n[i];
                  for (var o in ((r = {}), (n[i] = r), t))
                    t.hasOwnProperty(o) && (r[o] = e(t[o], n));
                  return r;
                case 'Array':
                  if (n[(i = a.util.objId(t))]) return n[i];
                  return (
                    (r = []),
                    (n[i] = r),
                    t.forEach(function (t, a) {
                      r[a] = e(t, n);
                    }),
                    r
                  );
                default:
                  return t;
              }
            },
            getLanguage: function (e) {
              for (; e;) {
                var n = t.exec(e.className);
                if (n) return n[1].toLowerCase();
                e = e.parentElement;
              }
              return 'none';
            },
            setLanguage: function (e, n) {
              ((e.className = e.className.replace(RegExp(t, 'gi'), '')),
                e.classList.add('language-' + n));
            },
            currentScript: function () {
              if ('u' < typeof document) return null;
              if (
                document.currentScript &&
                'SCRIPT' === document.currentScript.tagName &&
                1
              )
                return document.currentScript;
              try {
                throw Error();
              } catch (r) {
                var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) ||
                  [])[1];
                if (e) {
                  var t = document.getElementsByTagName('script');
                  for (var n in t) if (t[n].src == e) return t[n];
                }
                return null;
              }
            },
            isActive: function (e, t, n) {
              for (var r = 'no-' + t; e;) {
                var a = e.classList;
                if (a.contains(t)) return !0;
                if (a.contains(r)) return !1;
                e = e.parentElement;
              }
              return !!n;
            }
          },
          languages: {
            plain: r,
            plaintext: r,
            text: r,
            txt: r,
            extend: function (e, t) {
              var n = a.util.clone(a.languages[e]);
              for (var r in t) n[r] = t[r];
              return n;
            },
            insertBefore: function (e, t, n, r) {
              var i = (r = r || a.languages)[e],
                o = {};
              for (var l in i)
                if (i.hasOwnProperty(l)) {
                  if (l == t)
                    for (var s in n) n.hasOwnProperty(s) && (o[s] = n[s]);
                  n.hasOwnProperty(l) || (o[l] = i[l]);
                }
              var u = r[e];
              return (
                (r[e] = o),
                a.languages.DFS(a.languages, function (t, n) {
                  n === u && t != e && (this[t] = o);
                }),
                o
              );
            },
            DFS: function e(t, n, r, i) {
              i = i || {};
              var o = a.util.objId;
              for (var l in t)
                if (t.hasOwnProperty(l)) {
                  n.call(t, l, t[l], r || l);
                  var s = t[l],
                    u = a.util.type(s);
                  'Object' !== u || i[o(s)]
                    ? 'Array' !== u ||
                      i[o(s)] ||
                      ((i[o(s)] = !0), e(s, n, l, i))
                    : ((i[o(s)] = !0), e(s, n, null, i));
                }
            }
          },
          plugins: {},
          highlightAll: function (e, t) {
            a.highlightAllUnder(document, e, t);
          },
          highlightAllUnder: function (e, t, n) {
            var r = {
              callback: n,
              container: e,
              selector:
                'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            (a.hooks.run('before-highlightall', r),
              (r.elements = Array.prototype.slice.apply(
                r.container.querySelectorAll(r.selector)
              )),
              a.hooks.run('before-all-elements-highlight', r));
            for (var i, o = 0; (i = r.elements[o++]);)
              a.highlightElement(i, !0 === t, r.callback);
          },
          highlightElement: function (t, n, r) {
            var i = a.util.getLanguage(t),
              o = a.languages[i];
            a.util.setLanguage(t, i);
            var l = t.parentElement;
            l && 'pre' === l.nodeName.toLowerCase() && a.util.setLanguage(l, i);
            var s = t.textContent,
              u = { element: t, language: i, grammar: o, code: s };
            function c(e) {
              ((u.highlightedCode = e),
                a.hooks.run('before-insert', u),
                (u.element.innerHTML = u.highlightedCode),
                a.hooks.run('after-highlight', u),
                a.hooks.run('complete', u),
                r && r.call(u.element));
            }
            if (
              (a.hooks.run('before-sanity-check', u),
              (l = u.element.parentElement) &&
                'pre' === l.nodeName.toLowerCase() &&
                !l.hasAttribute('tabindex') &&
                l.setAttribute('tabindex', '0'),
              !u.code)
            ) {
              (a.hooks.run('complete', u), r && r.call(u.element));
              return;
            }
            if ((a.hooks.run('before-highlight', u), !u.grammar))
              return void c(a.util.encode(u.code));
            if (n && e.Worker) {
              var g = new Worker(a.filename);
              ((g.onmessage = function (e) {
                c(e.data);
              }),
                g.postMessage(
                  JSON.stringify({
                    language: u.language,
                    code: u.code,
                    immediateClose: !0
                  })
                ));
            } else c(a.highlight(u.code, u.grammar, u.language));
          },
          highlight: function (e, t, n) {
            var r = { code: e, grammar: t, language: n };
            if ((a.hooks.run('before-tokenize', r), !r.grammar))
              throw Error('The language "' + r.language + '" has no grammar.');
            return (
              (r.tokens = a.tokenize(r.code, r.grammar)),
              a.hooks.run('after-tokenize', r),
              i.stringify(a.util.encode(r.tokens), r.language)
            );
          },
          tokenize: function (e, t) {
            var n = t.rest;
            if (n) {
              for (var r in n) t[r] = n[r];
              delete t.rest;
            }
            var u = new l();
            return (
              s(u, u.head, e),
              (function e(t, n, r, l, u, c) {
                for (var g in r)
                  if (r.hasOwnProperty(g) && r[g]) {
                    var h = r[g];
                    h = Array.isArray(h) ? h : [h];
                    for (var f = 0; f < h.length; ++f) {
                      if (c && c.cause == g + ',' + f) return;
                      var d = h[f],
                        p = d.inside,
                        v = !!d.lookbehind,
                        m = !!d.greedy,
                        y = d.alias;
                      if (m && !d.pattern.global) {
                        var k = d.pattern.toString().match(/[imsuy]*$/)[0];
                        d.pattern = RegExp(d.pattern.source, k + 'g');
                      }
                      for (
                        var x = d.pattern || d, b = l.next, w = u;
                        b !== n.tail && (!c || !(w >= c.reach));
                        w += b.value.length, b = b.next
                      ) {
                        var A,
                          _ = b.value;
                        if (n.length > t.length) return;
                        if (!(_ instanceof i)) {
                          var E = 1;
                          if (m) {
                            if (!(A = o(x, w, t, v)) || A.index >= t.length)
                              break;
                            var S = A.index,
                              L = A.index + A[0].length,
                              P = w;
                            for (P += b.value.length; S >= P;)
                              P += (b = b.next).value.length;
                            if (
                              ((P -= b.value.length),
                              (w = P),
                              b.value instanceof i)
                            )
                              continue;
                            for (
                              var O = b;
                              O !== n.tail &&
                              (P < L || 'string' == typeof O.value);
                              O = O.next
                            )
                              (E++, (P += O.value.length));
                            (E--, (_ = t.slice(w, P)), (A.index -= w));
                          } else if (!(A = o(x, 0, _, v))) continue;
                          var S = A.index,
                            C = A[0],
                            j = _.slice(0, S),
                            N = _.slice(S + C.length),
                            M = w + _.length;
                          c && M > c.reach && (c.reach = M);
                          var W = b.prev;
                          if (
                            (j && ((W = s(n, W, j)), (w += j.length)),
                            (function (e, t, n) {
                              for (
                                var r = t.next, a = 0;
                                a < n && r !== e.tail;
                                a++
                              )
                                r = r.next;
                              ((t.next = r), (r.prev = t), (e.length -= a));
                            })(n, W, E),
                            (b = s(
                              n,
                              W,
                              new i(g, p ? a.tokenize(C, p) : C, y, C)
                            )),
                            N && s(n, b, N),
                            E > 1)
                          ) {
                            var I = { cause: g + ',' + f, reach: M };
                            (e(t, n, r, b.prev, w, I),
                              c && I.reach > c.reach && (c.reach = I.reach));
                          }
                        }
                      }
                    }
                  }
              })(e, u, t, u.head, 0),
              (function (e) {
                for (var t = [], n = e.head.next; n !== e.tail;)
                  (t.push(n.value), (n = n.next));
                return t;
              })(u)
            );
          },
          hooks: {
            all: {},
            add: function (e, t) {
              var n = a.hooks.all;
              ((n[e] = n[e] || []), n[e].push(t));
            },
            run: function (e, t) {
              var n = a.hooks.all[e];
              if (n && n.length) for (var r, i = 0; (r = n[i++]);) r(t);
            }
          },
          Token: i
        };
      function i(e, t, n, r) {
        ((this.type = e),
          (this.content = t),
          (this.alias = n),
          (this.length = 0 | (r || '').length));
      }
      function o(e, t, n, r) {
        e.lastIndex = t;
        var a = e.exec(n);
        if (a && r && a[1]) {
          var i = a[1].length;
          ((a.index += i), (a[0] = a[0].slice(i)));
        }
        return a;
      }
      function l() {
        var e = { value: null, prev: null, next: null },
          t = { value: null, prev: e, next: null };
        ((e.next = t), (this.head = e), (this.tail = t), (this.length = 0));
      }
      function s(e, t, n) {
        var r = t.next,
          a = { value: n, prev: t, next: r };
        return ((t.next = a), (r.prev = a), e.length++, a);
      }
      if (
        ((e.Prism = a),
        (i.stringify = function e(t, n) {
          if ('string' == typeof t) return t;
          if (Array.isArray(t)) {
            var r = '';
            return (
              t.forEach(function (t) {
                r += e(t, n);
              }),
              r
            );
          }
          var i = {
              type: t.type,
              content: e(t.content, n),
              tag: 'span',
              classes: ['token', t.type],
              attributes: {},
              language: n
            },
            o = t.alias;
          (o &&
            (Array.isArray(o)
              ? Array.prototype.push.apply(i.classes, o)
              : i.classes.push(o)),
            a.hooks.run('wrap', i));
          var l = '';
          for (var s in i.attributes)
            l +=
              ' ' +
              s +
              '="' +
              (i.attributes[s] || '').replace(/"/g, '&quot;') +
              '"';
          return (
            '<' +
            i.tag +
            ' class="' +
            i.classes.join(' ') +
            '"' +
            l +
            '>' +
            i.content +
            '</' +
            i.tag +
            '>'
          );
        }),
        !e.document)
      )
        return (
          e.addEventListener &&
            (a.disableWorkerMessageHandler ||
              e.addEventListener(
                'message',
                function (t) {
                  var n = JSON.parse(t.data),
                    r = n.language,
                    i = n.code,
                    o = n.immediateClose;
                  (e.postMessage(a.highlight(i, a.languages[r], r)),
                    o && e.close());
                },
                !1
              )),
          a
        );
      var u = a.util.currentScript();
      function c() {
        a.manual || a.highlightAll();
      }
      if (
        (u &&
          ((a.filename = u.src),
          u.hasAttribute('data-manual') && (a.manual = !0)),
        !a.manual)
      ) {
        var g = document.readyState;
        'loading' === g || ('interactive' === g && u && u.defer)
          ? document.addEventListener('DOMContentLoaded', c)
          : window.requestAnimationFrame
            ? window.requestAnimationFrame(c)
            : window.setTimeout(c, 16);
      }
      return a;
    })(
      'u' > typeof window
        ? window
        : 'u' > typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
          ? self
          : {}
    );
    (e.exports && (e.exports = r), void 0 !== n.g && (n.g.Prism = r));
  }
};
//# sourceMappingURL=prism-core-js.8d202cfe4efa01bc.js.map
