export const __rspack_esm_id = 3649;
export const __rspack_esm_ids = [3649];
export const __webpack_modules__ = {
  25130(t, e, n) {
    n.d(e, { $w: () => g });
    var i = n(1371),
      s = n(6585);
    function r() {
      var t = arguments[0];
      'string' == typeof t && (t = document.createElement(t));
      var e = 1,
        n = arguments[1];
      if (
        n &&
        'object' == typeof n &&
        null == n.nodeType &&
        !Array.isArray(n)
      ) {
        for (var i in n)
          if (Object.prototype.hasOwnProperty.call(n, i)) {
            var s = n[i];
            'string' == typeof s
              ? t.setAttribute(i, s)
              : null != s && (t[i] = s);
          }
        e++;
      }
      for (; e < arguments.length; e++)
        !(function t(e, n) {
          if ('string' == typeof n) e.appendChild(document.createTextNode(n));
          else if (null == n);
          else if (null != n.nodeType) e.appendChild(n);
          else if (Array.isArray(n))
            for (var i = 0; i < n.length; i++) t(e, n[i]);
          else throw RangeError('Unsupported child node: ' + n);
        })(t, arguments[e]);
      return t;
    }
    let SelectedDiagnostic = class SelectedDiagnostic {
      constructor(t, e, n) {
        ((this.from = t), (this.to = e), (this.diagnostic = n));
      }
    };
    let LintState = class LintState {
      constructor(t, e, n) {
        ((this.diagnostics = t), (this.panel = e), (this.selected = n));
      }
      static init(t, e, n) {
        let r = n.facet(m).markerFilter;
        r && (t = r(t, n));
        let a = t.slice().sort((t, e) => t.from - e.from || t.to - e.to),
          l = new s.vB(),
          h = [],
          c = 0,
          f = n.doc.iter(),
          u = 0,
          d = n.doc.length;
        for (let t = 0; ;) {
          let e,
            n,
            s = t == a.length ? null : a[t];
          if (!s && !h.length) break;
          if (h.length)
            ((e = c),
              (n = h.reduce(
                (t, e) => Math.min(t, e.to),
                s && s.from > e ? s.from : 1e8
              )));
          else {
            if ((e = s.from) > d) break;
            ((n = s.to), h.push(s), t++);
          }
          for (; t < a.length;) {
            let i = a[t];
            if (i.from == e && (i.to > i.from || i.to == e))
              (h.push(i), t++, (n = Math.min(i.to, n)));
            else {
              n = Math.min(i.from, n);
              break;
            }
          }
          n = Math.min(n, d);
          let r = !1;
          if (
            h.some(t => t.from == e && (t.to == n || n == d)) &&
            !(r = e == n) &&
            n - e < 10
          ) {
            let t = e - (u + f.value.length);
            t > 0 && (f.next(t), (u = e));
            for (let t = e; ;) {
              if (t >= n) {
                r = !0;
                break;
              }
              if (!f.lineBreak && u + f.value.length > t) break;
              ((t = u + f.value.length), (u += f.value.length), f.next());
            }
          }
          let o = (function (t) {
            let e = 'hint',
              n = 1;
            for (let s of t) {
              var i;
              let t =
                'error' == (i = s.severity)
                  ? 4
                  : 'warning' == i
                    ? 3
                    : 'info' == i
                      ? 2
                      : 1;
              t > n && ((n = t), (e = s.severity));
            }
            return e;
          })(h);
          if (r)
            l.add(
              e,
              e,
              i.NZ.widget({
                widget: new DiagnosticWidget(o),
                diagnostics: h.slice()
              })
            );
          else {
            let t = h.reduce(
              (t, e) => (e.markClass ? t + ' ' + e.markClass : t),
              ''
            );
            l.add(
              e,
              n,
              i.NZ.mark({
                class: 'cm-lintRange cm-lintRange-' + o + t,
                diagnostics: h.slice(),
                inclusiveEnd: h.some(t => t.to > n)
              })
            );
          }
          if ((c = n) == d) break;
          for (let t = 0; t < h.length; t++) h[t].to <= c && h.splice(t--, 1);
        }
        let g = l.finish();
        return new LintState(g, e, o(g));
      }
    };
    function o(t, e = null, n = 0) {
      let i = null;
      return (
        t.between(n, 1e9, (t, n, { spec: s }) => {
          if (!(e && 0 > s.diagnostics.indexOf(e)))
            if (i) {
              if (0 > s.diagnostics.indexOf(i.diagnostic)) return !1;
              i = new SelectedDiagnostic(i.from, n, i.diagnostic);
            } else i = new SelectedDiagnostic(t, n, e || s.diagnostics[0]);
        }),
        i
      );
    }
    function a(t, e) {
      let n = e.pos,
        i = e.end || n,
        s = t.state.facet(m).hideOn(t, n, i);
      if (null != s) return s;
      let r = t.startState.doc.lineAt(e.pos);
      return !!(
        t.effects.some(t => t.is(l)) ||
        t.changes.touchesRange(r.from, Math.max(r.to, i))
      );
    }
    let l = s.Pe.define(),
      h = s.Pe.define(),
      c = s.Pe.define(),
      f = s.sU.define({
        create: () => new LintState(i.NZ.none, null, null),
        update(t, e) {
          if (e.docChanged && t.diagnostics.size) {
            let n = t.diagnostics.map(e.changes),
              i = null,
              s = t.panel;
            if (t.selected) {
              let s = e.changes.mapPos(t.selected.from, 1);
              i = o(n, t.selected.diagnostic, s) || o(n, null, s);
            }
            (!n.size && s && e.state.facet(m).autoPanel && (s = null),
              (t = new LintState(n, s, i)));
          }
          for (let n of e.effects)
            if (n.is(l)) {
              let i = e.state.facet(m).autoPanel
                ? n.value.length
                  ? LintPanel.open
                  : null
                : t.panel;
              t = LintState.init(n.value, i, e.state);
            } else
              n.is(h)
                ? (t = new LintState(
                    t.diagnostics,
                    n.value ? LintPanel.open : null,
                    t.selected
                  ))
                : n.is(c) &&
                  (t = new LintState(t.diagnostics, t.panel, n.value));
          return t;
        },
        provide: t => [
          i.S7.from(t, t => t.panel),
          i.Lz.decorations.from(t, t => t.diagnostics)
        ]
      }),
      u = i.NZ.mark({ class: 'cm-lintRange cm-lintRange-active' }),
      d = t => {
        let e = t.state.field(f, !1);
        return !!e && !!e.panel && (t.dispatch({ effects: h.of(!1) }), !0);
      },
      g = [
        {
          key: 'Mod-Shift-m',
          run: t => {
            var e, n;
            let r = t.state.field(f, !1);
            (r && r.panel) ||
              t.dispatch({
                effects:
                  ((e = t.state),
                  (n = [h.of(!0)]),
                  e.field(f, !1) ? n : n.concat(s.Pe.appendConfig.of(b)))
              });
            let o = (0, i.ld)(t, LintPanel.open);
            return (o && o.dom.querySelector('.cm-panel-lint ul').focus(), !0);
          },
          preventDefault: !0
        },
        {
          key: 'F8',
          run: t => {
            let e = t.state.field(f, !1);
            if (!e) return !1;
            let n = t.state.selection.main,
              s = o(e.diagnostics, null, n.to + 1);
            return (
              (!!s ||
                (!!(s = o(e.diagnostics, null, 0)) &&
                  (s.from != n.from || s.to != n.to))) &&
              (t.dispatch({
                selection: { anchor: s.from, head: s.to },
                scrollIntoView: !0
              }),
              (0, i.ab)(t, s.from, 1, {
                tooltip: y,
                until: t =>
                  t.docChanged ||
                  t.newSelection.main.head < s.from ||
                  t.newSelection.main.head > s.to
              }),
              !0)
            );
          }
        }
      ],
      m = s.sj.define({
        combine: t => ({
          sources: t.map(t => t.source).filter(t => null != t),
          ...(0, s.QR)(
            t.map(t => t.config),
            {
              delay: 750,
              markerFilter: null,
              tooltipFilter: null,
              needsRefresh: null,
              hideOn: () => null
            },
            {
              delay: Math.max,
              markerFilter: p,
              tooltipFilter: p,
              needsRefresh: (t, e) => (t ? (e ? n => t(n) || e(n) : t) : e),
              hideOn: (t, e) =>
                t ? (e ? (n, i, s) => t(n, i, s) || e(n, i, s) : t) : e,
              autoPanel: (t, e) => t || e
            }
          )
        })
      });
    function p(t, e) {
      return t ? (e ? (n, i) => e(t(n, i), i) : t) : e;
    }
    function x(t) {
      let e = [];
      if (t)
        t: for (let { name: n } of t) {
          for (let t = 0; t < n.length; t++) {
            let i = n[t];
            if (
              /[a-zA-Z]/.test(i) &&
              !e.some(t => t.toLowerCase() == i.toLowerCase())
            ) {
              e.push(i);
              continue t;
            }
          }
          e.push('');
        }
      return e;
    }
    function S(t, e, n) {
      var i;
      let s = n ? x(e.actions) : [];
      return r(
        'li',
        { class: 'cm-diagnostic cm-diagnostic-' + e.severity },
        r(
          'span',
          { class: 'cm-diagnosticText' },
          e.renderMessage ? e.renderMessage(t) : e.message
        ),
        null == (i = e.actions)
          ? void 0
          : i.map((n, i) => {
              let a = !1,
                l = i => {
                  if ((i.preventDefault(), a)) return;
                  a = !0;
                  let s = o(t.state.field(f).diagnostics, e);
                  s && n.apply(t, s.from, s.to);
                },
                { name: h } = n,
                c = s[i] ? h.indexOf(s[i]) : -1,
                u =
                  c < 0
                    ? h
                    : [
                        h.slice(0, c),
                        r('u', h.slice(c, c + 1)),
                        h.slice(c + 1)
                      ];
              return r(
                'button',
                {
                  type: 'button',
                  class:
                    'cm-diagnosticAction' +
                    (n.markClass ? ' ' + n.markClass : ''),
                  onclick: l,
                  onmousedown: l,
                  'aria-label': ` Action: ${h}${c < 0 ? '' : ` (access key "${s[i]})"`}.`
                },
                u
              );
            }),
        e.source && r('div', { class: 'cm-diagnosticSource' }, e.source)
      );
    }
    let DiagnosticWidget = class DiagnosticWidget extends i.xO {
      constructor(t) {
        (super(), (this.sev = t));
      }
      eq(t) {
        return t.sev == this.sev;
      }
      toDOM() {
        return r('span', { class: 'cm-lintPoint cm-lintPoint-' + this.sev });
      }
    };
    let PanelItem = class PanelItem {
      constructor(t, e) {
        ((this.diagnostic = e),
          (this.id =
            'item_' + Math.floor(0xffffffff * Math.random()).toString(16)),
          (this.dom = S(t, e, !0)),
          (this.dom.id = this.id),
          this.dom.setAttribute('role', 'option'));
      }
    };
    let LintPanel = class LintPanel {
      constructor(t) {
        ((this.view = t), (this.items = []));
        let e = e => {
            if (!e.ctrlKey && !e.altKey && !e.metaKey) {
              if (27 == e.keyCode) (d(this.view), this.view.focus());
              else if (38 == e.keyCode || 33 == e.keyCode)
                this.moveSelection(
                  (this.selectedIndex - 1 + this.items.length) %
                    this.items.length
                );
              else if (40 == e.keyCode || 34 == e.keyCode)
                this.moveSelection(
                  (this.selectedIndex + 1) % this.items.length
                );
              else if (36 == e.keyCode) this.moveSelection(0);
              else if (35 == e.keyCode)
                this.moveSelection(this.items.length - 1);
              else if (13 == e.keyCode) this.view.focus();
              else {
                if (
                  !(e.keyCode >= 65) ||
                  !(e.keyCode <= 90) ||
                  !(this.selectedIndex >= 0)
                )
                  return;
                let { diagnostic: n } = this.items[this.selectedIndex],
                  i = x(n.actions);
                for (let s = 0; s < i.length; s++)
                  if (i[s].toUpperCase().charCodeAt(0) == e.keyCode) {
                    let e = o(this.view.state.field(f).diagnostics, n);
                    e && n.actions[s].apply(t, e.from, e.to);
                  }
              }
              e.preventDefault();
            }
          },
          n = t => {
            for (let e = 0; e < this.items.length; e++)
              this.items[e].dom.contains(t.target) && this.moveSelection(e);
          };
        ((this.list = r('ul', {
          tabIndex: 0,
          role: 'listbox',
          'aria-label': this.view.state.phrase('Diagnostics'),
          onkeydown: e,
          onclick: n
        })),
          (this.dom = r(
            'div',
            { class: 'cm-panel-lint' },
            this.list,
            r(
              'button',
              {
                type: 'button',
                name: 'close',
                'aria-label': this.view.state.phrase('close'),
                onclick: () => d(this.view)
              },
              '×'
            )
          )),
          this.update());
      }
      get selectedIndex() {
        let t = this.view.state.field(f).selected;
        if (!t) return -1;
        for (let e = 0; e < this.items.length; e++)
          if (this.items[e].diagnostic == t.diagnostic) return e;
        return -1;
      }
      update() {
        let { diagnostics: t, selected: e } = this.view.state.field(f),
          n = 0,
          i = !1,
          s = null,
          r = new Set();
        for (
          t.between(0, this.view.state.doc.length, (t, o, { spec: a }) => {
            for (let t of a.diagnostics) {
              if (r.has(t)) continue;
              r.add(t);
              let o = -1,
                a;
              for (let e = n; e < this.items.length; e++)
                if (this.items[e].diagnostic == t) {
                  o = e;
                  break;
                }
              (o < 0
                ? ((a = new PanelItem(this.view, t)),
                  this.items.splice(n, 0, a),
                  (i = !0))
                : ((a = this.items[o]),
                  o > n && (this.items.splice(n, o - n), (i = !0))),
                e && a.diagnostic == e.diagnostic
                  ? a.dom.hasAttribute('aria-selected') ||
                    (a.dom.setAttribute('aria-selected', 'true'), (s = a))
                  : a.dom.hasAttribute('aria-selected') &&
                    a.dom.removeAttribute('aria-selected'),
                n++);
            }
          });
          n < this.items.length &&
          !(1 == this.items.length && this.items[0].diagnostic.from < 0);
        )
          ((i = !0), this.items.pop());
        (0 == this.items.length &&
          (this.items.push(
            new PanelItem(this.view, {
              from: -1,
              to: -1,
              severity: 'info',
              message: this.view.state.phrase('No diagnostics')
            })
          ),
          (i = !0)),
          s
            ? (this.list.setAttribute('aria-activedescendant', s.id),
              this.view.requestMeasure({
                key: this,
                read: () => ({
                  sel: s.dom.getBoundingClientRect(),
                  panel: this.list.getBoundingClientRect()
                }),
                write: ({ sel: t, panel: e }) => {
                  let n = e.height / this.list.offsetHeight;
                  t.top < e.top
                    ? (this.list.scrollTop -= (e.top - t.top) / n)
                    : t.bottom > e.bottom &&
                      (this.list.scrollTop += (t.bottom - e.bottom) / n);
                }
              }))
            : this.selectedIndex < 0 &&
              this.list.removeAttribute('aria-activedescendant'),
          i && this.sync());
      }
      sync() {
        let t = this.list.firstChild;
        function e() {
          let e = t;
          ((t = e.nextSibling), e.remove());
        }
        for (let n of this.items)
          if (n.dom.parentNode == this.list) {
            for (; t != n.dom;) e();
            t = n.dom.nextSibling;
          } else this.list.insertBefore(n.dom, t);
        for (; t;) e();
      }
      moveSelection(t) {
        if (this.selectedIndex < 0) return;
        let e = o(
          this.view.state.field(f).diagnostics,
          this.items[t].diagnostic
        );
        e &&
          this.view.dispatch({
            selection: { anchor: e.from, head: e.to },
            scrollIntoView: !0,
            effects: c.of(e)
          });
      }
      static open(t) {
        return new LintPanel(t);
      }
    };
    function v(t) {
      return (function (t, e = 'viewBox="0 0 40 40"') {
        return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${e}>${encodeURIComponent(t)}</svg>')`;
      })(
        `<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${t}" fill="none" stroke-width=".7"/>`,
        'width="6" height="3"'
      );
    }
    let k = i.Lz.baseTheme({
      '.cm-diagnostic': {
        padding: '3px 6px 3px 8px',
        marginLeft: '-1px',
        display: 'block',
        whiteSpace: 'pre-wrap'
      },
      '.cm-diagnostic-error': { borderLeft: '5px solid #d11' },
      '.cm-diagnostic-warning': { borderLeft: '5px solid orange' },
      '.cm-diagnostic-info': { borderLeft: '5px solid #999' },
      '.cm-diagnostic-hint': { borderLeft: '5px solid #66d' },
      '.cm-diagnosticAction': {
        font: 'inherit',
        border: 'none',
        padding: '2px 4px',
        backgroundColor: '#444',
        color: 'white',
        borderRadius: '3px',
        marginLeft: '8px',
        cursor: 'pointer'
      },
      '.cm-diagnosticSource': { fontSize: '70%', opacity: 0.7 },
      '.cm-lintRange': {
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'repeat-x',
        paddingBottom: '0.7px'
      },
      '.cm-lintRange-error': { backgroundImage: v('#f11') },
      '.cm-lintRange-warning': { backgroundImage: v('orange') },
      '.cm-lintRange-info': { backgroundImage: v('#999') },
      '.cm-lintRange-hint': { backgroundImage: v('#66d') },
      '.cm-lintRange-active': { backgroundColor: '#ffdd9980' },
      '.cm-tooltip-lint': { padding: 0, margin: 0 },
      '.cm-lintPoint': {
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '-2px',
          borderLeft: '3px solid transparent',
          borderRight: '3px solid transparent',
          borderBottom: '4px solid #d11'
        }
      },
      '.cm-lintPoint-warning': { '&:after': { borderBottomColor: 'orange' } },
      '.cm-lintPoint-info': { '&:after': { borderBottomColor: '#999' } },
      '.cm-lintPoint-hint': { '&:after': { borderBottomColor: '#66d' } },
      '.cm-panel.cm-panel-lint': {
        position: 'relative',
        '& ul': {
          maxHeight: '100px',
          overflowY: 'auto',
          '& [aria-selected]': {
            backgroundColor: '#ddd',
            '& u': { textDecoration: 'underline' }
          },
          '&:focus [aria-selected]': {
            background_fallback: '#bdf',
            backgroundColor: 'Highlight',
            color_fallback: 'white',
            color: 'HighlightText'
          },
          '& u': { textDecoration: 'none' },
          padding: 0,
          margin: 0
        },
        '& [name=close]': {
          position: 'absolute',
          top: '0',
          right: '2px',
          background: 'inherit',
          border: 'none',
          font: 'inherit',
          padding: 0,
          margin: 0
        }
      },
      '&dark .cm-lintRange-active': { backgroundColor: '#86714a80' },
      '&dark .cm-panel.cm-panel-lint ul': {
        '& [aria-selected]': { backgroundColor: '#2e343e' }
      }
    });
    i.wJ;
    let w = s.Pe.define(),
      y = (0, i.Ux)(
        function (t, e, n) {
          let { diagnostics: i } = t.state.field(f),
            s,
            o = -1,
            a = -1;
          i.between(e - (n < 0), e + +(n > 0), (t, i, { spec: r }) => {
            if (
              e >= t &&
              e <= i &&
              (t == i || ((e > t || n > 0) && (e < i || n < 0)))
            )
              return ((s = r.diagnostics), (o = t), (a = i), !1);
          });
          let l = t.state.facet(m).tooltipFilter;
          return (s && l && (s = l(s, t.state)), s)
            ? {
                pos: o,
                end: a,
                above: !0,
                create: () => {
                  var e;
                  return {
                    dom:
                      ((e = t),
                      r(
                        'ul',
                        { class: 'cm-tooltip-lint' },
                        s.map(t => S(e, t, !1))
                      ))
                  };
                }
              }
            : null;
        },
        { hideOn: a }
      ),
      b = [
        f,
        i.Lz.decorations.compute([f], t => {
          let { selected: e, panel: n } = t.field(f);
          return e && n && e.from != e.to
            ? i.NZ.set([u.range(e.from, e.to)])
            : i.NZ.none;
        }),
        y,
        k
      ];
  },
  6585(t, e, n) {
    let i;
    var s,
      r,
      o = n(51587);
    let Text = class Text {
      lineAt(t) {
        if (t < 0 || t > this.length)
          throw RangeError(
            `Invalid position ${t} in document of length ${this.length}`
          );
        return this.lineInner(t, !1, 1, 0);
      }
      line(t) {
        if (t < 1 || t > this.lines)
          throw RangeError(
            `Invalid line number ${t} in ${this.lines}-line document`
          );
        return this.lineInner(t, !0, 1, 0);
      }
      replace(t, e, n) {
        [t, e] = l(this, t, e);
        let i = [];
        return (
          this.decompose(0, t, i, 2),
          n.length && n.decompose(0, n.length, i, 3),
          this.decompose(e, this.length, i, 1),
          TextNode.from(i, this.length - (e - t) + n.length)
        );
      }
      append(t) {
        return this.replace(this.length, this.length, t);
      }
      slice(t, e = this.length) {
        [t, e] = l(this, t, e);
        let n = [];
        return (this.decompose(t, e, n, 0), TextNode.from(n, e - t));
      }
      eq(t) {
        if (t == this) return !0;
        if (t.length != this.length || t.lines != this.lines) return !1;
        let e = this.scanIdentical(t, 1),
          n = this.length - this.scanIdentical(t, -1),
          i = new RawTextCursor(this),
          s = new RawTextCursor(t);
        for (let t = e, r = e; ;) {
          if (
            (i.next(t),
            s.next(t),
            (t = 0),
            i.lineBreak != s.lineBreak ||
              i.done != s.done ||
              i.value != s.value)
          )
            return !1;
          if (((r += i.value.length), i.done || r >= n)) return !0;
        }
      }
      iter(t = 1) {
        return new RawTextCursor(this, t);
      }
      iterRange(t, e = this.length) {
        return new PartialTextCursor(this, t, e);
      }
      iterLines(t, e) {
        let n;
        if (null == t) n = this.iter();
        else {
          null == e && (e = this.lines + 1);
          let i = this.line(t).from;
          n = this.iterRange(
            i,
            Math.max(
              i,
              e == this.lines + 1
                ? this.length
                : e <= 1
                  ? 0
                  : this.line(e - 1).to
            )
          );
        }
        return new LineCursor(n);
      }
      toString() {
        return this.sliceString(0);
      }
      toJSON() {
        let t = [];
        return (this.flatten(t), t);
      }
      static of(t) {
        if (0 == t.length)
          throw RangeError('A document must have at least one line');
        return 1 != t.length || t[0]
          ? t.length <= 32
            ? new TextLeaf(t)
            : TextNode.from(TextLeaf.split(t, []))
          : Text.empty;
      }
    };
    let TextLeaf = class TextLeaf extends Text {
      constructor(
        t,
        e = (function (t) {
          let e = -1;
          for (let n of t) e += n.length + 1;
          return e;
        })(t)
      ) {
        (super(), (this.text = t), (this.length = e));
      }
      get lines() {
        return this.text.length;
      }
      get children() {
        return null;
      }
      lineInner(t, e, n, i) {
        for (let s = 0; ; s++) {
          let r = this.text[s],
            o = i + r.length;
          if ((e ? n : o) >= t) return new Line(i, o, n, r);
          ((i = o + 1), n++);
        }
      }
      decompose(t, e, n, i) {
        var s;
        let r =
          t <= 0 && e >= this.length
            ? this
            : new TextLeaf(
                ((s = this.text), a(s, [''], t, e)),
                Math.min(e, this.length) - Math.max(0, t)
              );
        if (1 & i) {
          let t = n.pop(),
            e = a(r.text, t.text.slice(), 0, r.length);
          if (e.length <= 32) n.push(new TextLeaf(e, t.length + r.length));
          else {
            let t = e.length >> 1;
            n.push(new TextLeaf(e.slice(0, t)), new TextLeaf(e.slice(t)));
          }
        } else n.push(r);
      }
      replace(t, e, n) {
        var i;
        if (!(n instanceof TextLeaf)) return super.replace(t, e, n);
        [t, e] = l(this, t, e);
        let s = a(this.text, a(n.text, ((i = this.text), a(i, [''], 0, t))), e),
          r = this.length + n.length - (e - t);
        return s.length <= 32
          ? new TextLeaf(s, r)
          : TextNode.from(TextLeaf.split(s, []), r);
      }
      sliceString(t, e = this.length, n = '\n') {
        [t, e] = l(this, t, e);
        let i = '';
        for (let s = 0, r = 0; s <= e && r < this.text.length; r++) {
          let o = this.text[r],
            a = s + o.length;
          (s > t && r && (i += n),
            t < a && e > s && (i += o.slice(Math.max(0, t - s), e - s)),
            (s = a + 1));
        }
        return i;
      }
      flatten(t) {
        for (let e of this.text) t.push(e);
      }
      scanIdentical() {
        return 0;
      }
      static split(t, e) {
        let n = [],
          i = -1;
        for (let s of t)
          (n.push(s),
            (i += s.length + 1),
            32 == n.length && (e.push(new TextLeaf(n, i)), (n = []), (i = -1)));
        return (i > -1 && e.push(new TextLeaf(n, i)), e);
      }
    };
    let TextNode = class TextNode extends Text {
      constructor(t, e) {
        for (let n of (super(),
        (this.children = t),
        (this.length = e),
        (this.lines = 0),
        t))
          this.lines += n.lines;
      }
      lineInner(t, e, n, i) {
        for (let s = 0; ; s++) {
          let r = this.children[s],
            o = i + r.length,
            a = n + r.lines - 1;
          if ((e ? a : o) >= t) return r.lineInner(t, e, n, i);
          ((i = o + 1), (n = a + 1));
        }
      }
      decompose(t, e, n, i) {
        for (let s = 0, r = 0; r <= e && s < this.children.length; s++) {
          let o = this.children[s],
            a = r + o.length;
          if (t <= a && e >= r) {
            let s = i & ((r <= t) | (2 * (a >= e)));
            r >= t && a <= e && !s
              ? n.push(o)
              : o.decompose(t - r, e - r, n, s);
          }
          r = a + 1;
        }
      }
      replace(t, e, n) {
        if ((([t, e] = l(this, t, e)), n.lines < this.lines))
          for (let i = 0, s = 0; i < this.children.length; i++) {
            let r = this.children[i],
              o = s + r.length;
            if (t >= s && e <= o) {
              let a = r.replace(t - s, e - s, n),
                l = this.lines - r.lines + a.lines;
              if (a.lines < l >> 4 && a.lines > l >> 6) {
                let s = this.children.slice();
                return (
                  (s[i] = a),
                  new TextNode(s, this.length - (e - t) + n.length)
                );
              }
              return super.replace(s, o, a);
            }
            s = o + 1;
          }
        return super.replace(t, e, n);
      }
      sliceString(t, e = this.length, n = '\n') {
        [t, e] = l(this, t, e);
        let i = '';
        for (let s = 0, r = 0; s < this.children.length && r <= e; s++) {
          let o = this.children[s],
            a = r + o.length;
          (r > t && s && (i += n),
            t < a && e > r && (i += o.sliceString(t - r, e - r, n)),
            (r = a + 1));
        }
        return i;
      }
      flatten(t) {
        for (let e of this.children) e.flatten(t);
      }
      scanIdentical(t, e) {
        if (!(t instanceof TextNode)) return 0;
        let n = 0,
          [i, s, r, o] =
            e > 0
              ? [0, 0, this.children.length, t.children.length]
              : [this.children.length - 1, t.children.length - 1, -1, -1];
        for (; ; i += e, s += e) {
          if (i == r || s == o) return n;
          let a = this.children[i],
            l = t.children[s];
          if (a != l) return n + a.scanIdentical(l, e);
          n += a.length + 1;
        }
      }
      static from(t, e = t.reduce((t, e) => t + e.length + 1, -1)) {
        let n = 0;
        for (let e of t) n += e.lines;
        if (n < 32) {
          let n = [];
          for (let e of t) e.flatten(n);
          return new TextLeaf(n, e);
        }
        let i = Math.max(32, n >> 5),
          s = i << 1,
          r = i >> 1,
          o = [],
          a = 0,
          l = -1,
          h = [];
        function c() {
          0 != a &&
            (o.push(1 == h.length ? h[0] : TextNode.from(h, l)),
            (l = -1),
            (a = h.length = 0));
        }
        for (let e of t)
          !(function t(e) {
            let n;
            if (e.lines > s && e instanceof TextNode)
              for (let n of e.children) t(n);
            else
              e.lines > r && (a > r || !a)
                ? (c(), o.push(e))
                : e instanceof TextLeaf &&
                    a &&
                    (n = h[h.length - 1]) instanceof TextLeaf &&
                    e.lines + n.lines <= 32
                  ? ((a += e.lines),
                    (l += e.length + 1),
                    (h[h.length - 1] = new TextLeaf(
                      n.text.concat(e.text),
                      n.length + 1 + e.length
                    )))
                  : (a + e.lines > i && c(),
                    (a += e.lines),
                    (l += e.length + 1),
                    h.push(e));
          })(e);
        return (c(), 1 == o.length ? o[0] : new TextNode(o, e));
      }
    };
    function a(t, e, n = 0, i = 1e9) {
      for (let s = 0, r = 0, o = !0; r < t.length && s <= i; r++) {
        let a = t[r],
          l = s + a.length;
        (l >= n &&
          (l > i && (a = a.slice(0, i - s)),
          s < n && (a = a.slice(n - s)),
          o ? ((e[e.length - 1] += a), (o = !1)) : e.push(a)),
          (s = l + 1));
      }
      return e;
    }
    Text.empty = new TextLeaf([''], 0);
    let RawTextCursor = class RawTextCursor {
      constructor(t, e = 1) {
        ((this.dir = e),
          (this.done = !1),
          (this.lineBreak = !1),
          (this.value = ''),
          (this.nodes = [t]),
          (this.offsets = [
            e > 0
              ? 1
              : (t instanceof TextLeaf ? t.text.length : t.children.length) << 1
          ]));
      }
      nextInner(t, e) {
        for (this.done = this.lineBreak = !1; ;) {
          let n = this.nodes.length - 1,
            i = this.nodes[n],
            s = this.offsets[n],
            r = s >> 1,
            o = i instanceof TextLeaf ? i.text.length : i.children.length;
          if (r == (e > 0 ? o : 0)) {
            if (0 == n) return ((this.done = !0), (this.value = ''), this);
            (e > 0 && this.offsets[n - 1]++,
              this.nodes.pop(),
              this.offsets.pop());
          } else if ((1 & s) == (e > 0 ? 0 : 1)) {
            if (((this.offsets[n] += e), 0 == t))
              return ((this.lineBreak = !0), (this.value = '\n'), this);
            t--;
          } else if (i instanceof TextLeaf) {
            let s = i.text[r + (e < 0 ? -1 : 0)];
            if (((this.offsets[n] += e), s.length > Math.max(0, t)))
              return (
                (this.value =
                  0 == t ? s : e > 0 ? s.slice(t) : s.slice(0, s.length - t)),
                this
              );
            t -= s.length;
          } else {
            let s = i.children[r + (e < 0 ? -1 : 0)];
            t > s.length
              ? ((t -= s.length), (this.offsets[n] += e))
              : (e < 0 && this.offsets[n]--,
                this.nodes.push(s),
                this.offsets.push(
                  e > 0
                    ? 1
                    : (s instanceof TextLeaf
                        ? s.text.length
                        : s.children.length) << 1
                ));
          }
        }
      }
      next(t = 0) {
        return (
          t < 0 && (this.nextInner(-t, -this.dir), (t = this.value.length)),
          this.nextInner(t, this.dir)
        );
      }
    };
    let PartialTextCursor = class PartialTextCursor {
      constructor(t, e, n) {
        ((this.value = ''),
          (this.done = !1),
          (this.cursor = new RawTextCursor(t, e > n ? -1 : 1)),
          (this.pos = e > n ? t.length : 0),
          (this.from = Math.min(e, n)),
          (this.to = Math.max(e, n)));
      }
      nextInner(t, e) {
        if (e < 0 ? this.pos <= this.from : this.pos >= this.to)
          return ((this.value = ''), (this.done = !0), this);
        t += Math.max(0, e < 0 ? this.pos - this.to : this.from - this.pos);
        let n = e < 0 ? this.pos - this.from : this.to - this.pos;
        (t > n && (t = n), (n -= t));
        let { value: i } = this.cursor.next(t);
        return (
          (this.pos += (i.length + t) * e),
          (this.value =
            i.length <= n ? i : e < 0 ? i.slice(i.length - n) : i.slice(0, n)),
          (this.done = !this.value),
          this
        );
      }
      next(t = 0) {
        return (
          t < 0
            ? (t = Math.max(t, this.from - this.pos))
            : t > 0 && (t = Math.min(t, this.to - this.pos)),
          this.nextInner(t, this.cursor.dir)
        );
      }
      get lineBreak() {
        return this.cursor.lineBreak && '' != this.value;
      }
    };
    let LineCursor = class LineCursor {
      constructor(t) {
        ((this.inner = t),
          (this.afterBreak = !0),
          (this.value = ''),
          (this.done = !1));
      }
      next(t = 0) {
        let { done: e, lineBreak: n, value: i } = this.inner.next(t);
        return (
          e && this.afterBreak
            ? ((this.value = ''), (this.afterBreak = !1))
            : e
              ? ((this.done = !0), (this.value = ''))
              : n
                ? this.afterBreak
                  ? (this.value = '')
                  : ((this.afterBreak = !0), this.next())
                : ((this.value = i), (this.afterBreak = !1)),
          this
        );
      }
      get lineBreak() {
        return !1;
      }
    };
    'u' > typeof Symbol &&
      ((Text.prototype[Symbol.iterator] = function () {
        return this.iter();
      }),
      (RawTextCursor.prototype[Symbol.iterator] =
        PartialTextCursor.prototype[Symbol.iterator] =
        LineCursor.prototype[Symbol.iterator] =
          function () {
            return this;
          }));
    let Line = class Line {
      constructor(t, e, n, i) {
        ((this.from = t), (this.to = e), (this.number = n), (this.text = i));
      }
      get length() {
        return this.to - this.from;
      }
    };
    function l(t, e, n) {
      return [
        (e = Math.max(0, Math.min(t.length, e))),
        Math.max(e, Math.min(t.length, n))
      ];
    }
    function h(t, e, n = !0, i = !0) {
      return (0, o.z)(t, e, n, i);
    }
    function c(t, e) {
      let n = t.charCodeAt(e);
      if (!(n >= 55296 && n < 56320) || e + 1 == t.length) return n;
      let i = t.charCodeAt(e + 1);
      return i >= 56320 && i < 57344
        ? ((n - 55296) << 10) + (i - 56320) + 65536
        : n;
    }
    function f(t) {
      return t <= 65535
        ? String.fromCharCode(t)
        : String.fromCharCode(((t -= 65536) >> 10) + 55296, (1023 & t) + 56320);
    }
    function u(t) {
      return t < 65536 ? 1 : 2;
    }
    let d = /\r\n?|\n/;
    var g =
      (((s = g || (g = {}))[(s.Simple = 0)] = 'Simple'),
      (s[(s.TrackDel = 1)] = 'TrackDel'),
      (s[(s.TrackBefore = 2)] = 'TrackBefore'),
      (s[(s.TrackAfter = 3)] = 'TrackAfter'),
      s);
    let ChangeDesc = class ChangeDesc {
      constructor(t) {
        this.sections = t;
      }
      get length() {
        let t = 0;
        for (let e = 0; e < this.sections.length; e += 2) t += this.sections[e];
        return t;
      }
      get newLength() {
        let t = 0;
        for (let e = 0; e < this.sections.length; e += 2) {
          let n = this.sections[e + 1];
          t += n < 0 ? this.sections[e] : n;
        }
        return t;
      }
      get empty() {
        return (
          0 == this.sections.length ||
          (2 == this.sections.length && this.sections[1] < 0)
        );
      }
      iterGaps(t) {
        for (let e = 0, n = 0, i = 0; e < this.sections.length;) {
          let s = this.sections[e++],
            r = this.sections[e++];
          (r < 0 ? (t(n, i, s), (i += s)) : (i += r), (n += s));
        }
      }
      iterChangedRanges(t, e = !1) {
        x(this, t, e);
      }
      get invertedDesc() {
        let t = [];
        for (let e = 0; e < this.sections.length;) {
          let n = this.sections[e++],
            i = this.sections[e++];
          i < 0 ? t.push(n, i) : t.push(i, n);
        }
        return new ChangeDesc(t);
      }
      composeDesc(t) {
        return this.empty ? t : t.empty ? this : v(this, t);
      }
      mapDesc(t, e = !1) {
        return t.empty ? this : S(this, t, e);
      }
      mapPos(t, e = -1, n = g.Simple) {
        let i = 0,
          s = 0;
        for (let r = 0; r < this.sections.length;) {
          let o = this.sections[r++],
            a = this.sections[r++],
            l = i + o;
          if (a < 0) {
            if (l > t) return s + (t - i);
            s += o;
          } else {
            if (
              n != g.Simple &&
              l >= t &&
              ((n == g.TrackDel && i < t && l > t) ||
                (n == g.TrackBefore && i < t) ||
                (n == g.TrackAfter && l > t))
            )
              return null;
            if (l > t || (l == t && e < 0 && !o))
              return t == i || e < 0 ? s : s + a;
            s += a;
          }
          i = l;
        }
        if (t > i)
          throw RangeError(
            `Position ${t} is out of range for changeset of length ${i}`
          );
        return s;
      }
      touchesRange(t, e = t) {
        for (let n = 0, i = 0; n < this.sections.length && i <= e;) {
          let s = this.sections[n++],
            r = this.sections[n++],
            o = i + s;
          if (r >= 0 && i <= e && o >= t)
            return !(i < t) || !(o > e) || 'cover';
          i = o;
        }
        return !1;
      }
      toString() {
        let t = '';
        for (let e = 0; e < this.sections.length;) {
          let n = this.sections[e++],
            i = this.sections[e++];
          t += (t ? ' ' : '') + n + (i >= 0 ? ':' + i : '');
        }
        return t;
      }
      toJSON() {
        return this.sections;
      }
      static fromJSON(t) {
        if (
          !Array.isArray(t) ||
          t.length % 2 ||
          t.some(t => 'number' != typeof t)
        )
          throw RangeError('Invalid JSON representation of ChangeDesc');
        return new ChangeDesc(t);
      }
      static create(t) {
        return new ChangeDesc(t);
      }
    };
    let ChangeSet = class ChangeSet extends ChangeDesc {
      constructor(t, e) {
        (super(t), (this.inserted = e));
      }
      apply(t) {
        if (this.length != t.length)
          throw RangeError(
            'Applying change set to a document with the wrong length'
          );
        return (
          x(this, (e, n, i, s, r) => (t = t.replace(i, i + (n - e), r)), !1),
          t
        );
      }
      mapDesc(t, e = !1) {
        return S(this, t, e, !0);
      }
      invert(t) {
        let e = this.sections.slice(),
          n = [];
        for (let i = 0, s = 0; i < e.length; i += 2) {
          let r = e[i],
            o = e[i + 1];
          if (o >= 0) {
            ((e[i] = o), (e[i + 1] = r));
            let a = i >> 1;
            for (; n.length < a;) n.push(Text.empty);
            n.push(r ? t.slice(s, s + r) : Text.empty);
          }
          s += r;
        }
        return new ChangeSet(e, n);
      }
      compose(t) {
        return this.empty ? t : t.empty ? this : v(this, t, !0);
      }
      map(t, e = !1) {
        return t.empty ? this : S(this, t, e, !0);
      }
      iterChanges(t, e = !1) {
        x(this, t, e);
      }
      get desc() {
        return ChangeDesc.create(this.sections);
      }
      filter(t) {
        let e = [],
          n = [],
          i = [],
          s = new SectionIter(this);
        e: for (let r = 0, o = 0; ;) {
          let a = r == t.length ? 1e9 : t[r++];
          for (; o < a || (o == a && 0 == s.len);) {
            if (s.done) break e;
            let t = Math.min(s.len, a - o);
            m(i, t, -1);
            let r = -1 == s.ins ? -1 : 0 == s.off ? s.ins : 0;
            (m(e, t, r), r > 0 && p(n, e, s.text), s.forward(t), (o += t));
          }
          let l = t[r++];
          for (; o < l;) {
            if (s.done) break e;
            let t = Math.min(s.len, l - o);
            (m(e, t, -1),
              m(i, t, -1 == s.ins ? -1 : 0 == s.off ? s.ins : 0),
              s.forward(t),
              (o += t));
          }
        }
        return { changes: new ChangeSet(e, n), filtered: ChangeDesc.create(i) };
      }
      toJSON() {
        let t = [];
        for (let e = 0; e < this.sections.length; e += 2) {
          let n = this.sections[e],
            i = this.sections[e + 1];
          i < 0
            ? t.push(n)
            : 0 == i
              ? t.push([n])
              : t.push([n].concat(this.inserted[e >> 1].toJSON()));
        }
        return t;
      }
      static of(t, e, n) {
        let i = [],
          s = [],
          r = 0,
          o = null;
        function a(t = !1) {
          if (!t && !i.length) return;
          r < e && m(i, e - r, -1);
          let n = new ChangeSet(i, s);
          ((o = o ? o.compose(n.map(o)) : n), (i = []), (s = []), (r = 0));
        }
        return (
          !(function t(l) {
            if (Array.isArray(l)) for (let e of l) t(e);
            else if (l instanceof ChangeSet) {
              if (l.length != e)
                throw RangeError(
                  `Mismatched change set length (got ${l.length}, expected ${e})`
                );
              (a(), (o = o ? o.compose(l.map(o)) : l));
            } else {
              let { from: t, to: o = t, insert: h } = l;
              if (t > o || t < 0 || o > e)
                throw RangeError(
                  `Invalid change range ${t} to ${o} (in doc of length ${e})`
                );
              let c = h
                  ? 'string' == typeof h
                    ? Text.of(h.split(n || d))
                    : h
                  : Text.empty,
                f = c.length;
              if (t == o && 0 == f) return;
              (t < r && a(),
                t > r && m(i, t - r, -1),
                m(i, o - t, f),
                p(s, i, c),
                (r = o));
            }
          })(t),
          a(!o),
          o
        );
      }
      static empty(t) {
        return new ChangeSet(t ? [t, -1] : [], []);
      }
      static fromJSON(t) {
        if (!Array.isArray(t))
          throw RangeError('Invalid JSON representation of ChangeSet');
        let e = [],
          n = [];
        for (let i = 0; i < t.length; i++) {
          let s = t[i];
          if ('number' == typeof s) e.push(s, -1);
          else if (
            !Array.isArray(s) ||
            'number' != typeof s[0] ||
            s.some((t, e) => e && 'string' != typeof t)
          )
            throw RangeError('Invalid JSON representation of ChangeSet');
          else if (1 == s.length) e.push(s[0], 0);
          else {
            for (; n.length < i;) n.push(Text.empty);
            ((n[i] = Text.of(s.slice(1))), e.push(s[0], n[i].length));
          }
        }
        return new ChangeSet(e, n);
      }
      static createSet(t, e) {
        return new ChangeSet(t, e);
      }
    };
    function m(t, e, n, i = !1) {
      if (0 == e && n <= 0) return;
      let s = t.length - 2;
      s >= 0 && n <= 0 && n == t[s + 1]
        ? (t[s] += e)
        : s >= 0 && 0 == e && 0 == t[s]
          ? (t[s + 1] += n)
          : i
            ? ((t[s] += e), (t[s + 1] += n))
            : t.push(e, n);
    }
    function p(t, e, n) {
      if (0 == n.length) return;
      let i = (e.length - 2) >> 1;
      if (i < t.length) t[t.length - 1] = t[t.length - 1].append(n);
      else {
        for (; t.length < i;) t.push(Text.empty);
        t.push(n);
      }
    }
    function x(t, e, n) {
      let i = t.inserted;
      for (let s = 0, r = 0, o = 0; o < t.sections.length;) {
        let a = t.sections[o++],
          l = t.sections[o++];
        if (l < 0) ((s += a), (r += a));
        else {
          let h = s,
            c = r,
            f = Text.empty;
          for (
            ;
            (h += a),
              (c += l),
              l && i && (f = f.append(i[(o - 2) >> 1])),
              !n && o != t.sections.length && !(t.sections[o + 1] < 0);
          )
            ((a = t.sections[o++]), (l = t.sections[o++]));
          (e(s, h, r, c, f), (s = h), (r = c));
        }
      }
    }
    function S(t, e, n, i = !1) {
      let s = [],
        r = i ? [] : null,
        o = new SectionIter(t),
        a = new SectionIter(e);
      for (let t = -1; ;)
        if ((o.done && a.len) || (a.done && o.len))
          throw Error('Mismatched change set lengths');
        else if (-1 == o.ins && -1 == a.ins) {
          let t = Math.min(o.len, a.len);
          (m(s, t, -1), o.forward(t), a.forward(t));
        } else if (
          a.ins >= 0 &&
          (o.ins < 0 ||
            t == o.i ||
            (0 == o.off && (a.len < o.len || (a.len == o.len && !n))))
        ) {
          let e = a.len;
          for (m(s, a.ins, -1); e;) {
            let n = Math.min(o.len, e);
            (o.ins >= 0 &&
              t < o.i &&
              o.len <= n &&
              (m(s, 0, o.ins), r && p(r, s, o.text), (t = o.i)),
              o.forward(n),
              (e -= n));
          }
          a.next();
        } else if (o.ins >= 0) {
          let e = 0,
            n = o.len;
          for (; n;)
            if (-1 == a.ins) {
              let t = Math.min(n, a.len);
              ((e += t), (n -= t), a.forward(t));
            } else if (0 == a.ins && a.len < n) ((n -= a.len), a.next());
            else break;
          (m(s, e, t < o.i ? o.ins : 0),
            r && t < o.i && p(r, s, o.text),
            (t = o.i),
            o.forward(o.len - n));
        } else if (o.done && a.done)
          return r ? ChangeSet.createSet(s, r) : ChangeDesc.create(s);
        else throw Error('Mismatched change set lengths');
    }
    function v(t, e, n = !1) {
      let i = [],
        s = n ? [] : null,
        r = new SectionIter(t),
        o = new SectionIter(e);
      for (let t = !1; ;)
        if (r.done && o.done)
          return s ? ChangeSet.createSet(i, s) : ChangeDesc.create(i);
        else if (0 == r.ins) (m(i, r.len, 0, t), r.next());
        else if (0 != o.len || o.done)
          if (r.done || o.done) throw Error('Mismatched change set lengths');
          else {
            let e = Math.min(r.len2, o.len),
              n = i.length;
            if (-1 == r.ins) {
              let n = -1 == o.ins ? -1 : o.off ? 0 : o.ins;
              (m(i, e, n, t), s && n && p(s, i, o.text));
            } else
              -1 == o.ins
                ? (m(i, r.off ? 0 : r.len, e, t), s && p(s, i, r.textBit(e)))
                : (m(i, r.off ? 0 : r.len, o.off ? 0 : o.ins, t),
                  s && !o.off && p(s, i, o.text));
            ((t =
              (r.ins > e || (o.ins >= 0 && o.len > e)) && (t || i.length > n)),
              r.forward2(e),
              o.forward(e));
          }
        else (m(i, 0, o.ins, t), s && p(s, i, o.text), o.next());
    }
    let SectionIter = class SectionIter {
      constructor(t) {
        ((this.set = t), (this.i = 0), this.next());
      }
      next() {
        let { sections: t } = this.set;
        (this.i < t.length
          ? ((this.len = t[this.i++]), (this.ins = t[this.i++]))
          : ((this.len = 0), (this.ins = -2)),
          (this.off = 0));
      }
      get done() {
        return -2 == this.ins;
      }
      get len2() {
        return this.ins < 0 ? this.len : this.ins;
      }
      get text() {
        let { inserted: t } = this.set,
          e = (this.i - 2) >> 1;
        return e >= t.length ? Text.empty : t[e];
      }
      textBit(t) {
        let { inserted: e } = this.set,
          n = (this.i - 2) >> 1;
        return n >= e.length && !t
          ? Text.empty
          : e[n].slice(this.off, null == t ? void 0 : this.off + t);
      }
      forward(t) {
        t == this.len ? this.next() : ((this.len -= t), (this.off += t));
      }
      forward2(t) {
        -1 == this.ins
          ? this.forward(t)
          : t == this.ins
            ? this.next()
            : ((this.ins -= t), (this.off += t));
      }
    };
    let SelectionRange = class SelectionRange {
      constructor(t, e, n, i) {
        ((this.from = t),
          (this.to = e),
          (this.flags = n),
          (this.goalColumn = i));
      }
      get anchor() {
        return 32 & this.flags ? this.to : this.from;
      }
      get head() {
        return 32 & this.flags ? this.from : this.to;
      }
      get empty() {
        return this.from == this.to;
      }
      get assoc() {
        return 8 & this.flags ? -1 : 16 & this.flags ? 1 : 0;
      }
      get undirectional() {
        return (64 & this.flags) > 0;
      }
      get bidiLevel() {
        let t = 7 & this.flags;
        return 7 == t ? null : t;
      }
      map(t, e = -1) {
        let n, i;
        return (
          this.empty
            ? (n = i = t.mapPos(this.from, e))
            : ((n = t.mapPos(this.from, 1)), (i = t.mapPos(this.to, -1))),
          n == this.from && i == this.to
            ? this
            : new SelectionRange(n, i, this.flags, this.goalColumn)
        );
      }
      extend(t, e = t, n = 0) {
        if (t <= this.anchor && e >= this.anchor)
          return EditorSelection.range(t, e, void 0, void 0, n);
        let i = Math.abs(t - this.anchor) > Math.abs(e - this.anchor) ? t : e;
        return EditorSelection.range(this.anchor, i, void 0, void 0, n);
      }
      eq(t, e = !1) {
        return (
          this.anchor == t.anchor &&
          this.head == t.head &&
          this.goalColumn == t.goalColumn &&
          (!e || !this.empty || this.assoc == t.assoc)
        );
      }
      toJSON() {
        return { anchor: this.anchor, head: this.head };
      }
      static fromJSON(t) {
        if (!t || 'number' != typeof t.anchor || 'number' != typeof t.head)
          throw RangeError('Invalid JSON representation for SelectionRange');
        return EditorSelection.range(t.anchor, t.head);
      }
      static create(t, e, n, i) {
        return new SelectionRange(t, e, n, i);
      }
    };
    let EditorSelection = class EditorSelection {
      constructor(t, e) {
        ((this.ranges = t), (this.mainIndex = e));
      }
      map(t, e = -1) {
        return t.empty
          ? this
          : EditorSelection.create(
              this.ranges.map(n => n.map(t, e)),
              this.mainIndex
            );
      }
      eq(t, e = !1) {
        if (
          this.ranges.length != t.ranges.length ||
          this.mainIndex != t.mainIndex
        )
          return !1;
        for (let n = 0; n < this.ranges.length; n++)
          if (!this.ranges[n].eq(t.ranges[n], e)) return !1;
        return !0;
      }
      get main() {
        return this.ranges[this.mainIndex];
      }
      asSingle() {
        return 1 == this.ranges.length
          ? this
          : new EditorSelection([this.main], 0);
      }
      addRange(t, e = !0) {
        return EditorSelection.create(
          [t].concat(this.ranges),
          e ? 0 : this.mainIndex + 1
        );
      }
      replaceRange(t, e = this.mainIndex) {
        let n = this.ranges.slice();
        return ((n[e] = t), EditorSelection.create(n, this.mainIndex));
      }
      toJSON() {
        return {
          ranges: this.ranges.map(t => t.toJSON()),
          main: this.mainIndex
        };
      }
      static fromJSON(t) {
        if (
          !t ||
          !Array.isArray(t.ranges) ||
          'number' != typeof t.main ||
          t.main >= t.ranges.length
        )
          throw RangeError('Invalid JSON representation for EditorSelection');
        return new EditorSelection(
          t.ranges.map(t => SelectionRange.fromJSON(t)),
          t.main
        );
      }
      static single(t, e = t) {
        return new EditorSelection([EditorSelection.range(t, e)], 0);
      }
      static create(t, e = 0) {
        if (0 == t.length)
          throw RangeError('A selection needs at least one range');
        for (let n = 0, i = 0; i < t.length; i++) {
          let s = t[i];
          if (s.empty ? s.from <= n : s.from < n)
            return EditorSelection.normalized(t.slice(), e);
          n = s.to;
        }
        return new EditorSelection(t, e);
      }
      static cursor(t, e = 0, n, i) {
        return SelectionRange.create(
          t,
          t,
          (0 == e ? 0 : e < 0 ? 8 : 16) | (null == n ? 7 : Math.min(6, n)),
          i
        );
      }
      static range(t, e, n, i, s) {
        let r = null == i ? 7 : Math.min(6, i);
        return (
          s || t == e || (s = e < t ? 1 : -1),
          s && (r |= s < 0 ? 8 : 16),
          e < t
            ? SelectionRange.create(e, t, 32 | r, n)
            : SelectionRange.create(t, e, r, n)
        );
      }
      static undirectionalRange(t, e) {
        return SelectionRange.create(t, e, 64, void 0);
      }
      static normalized(t, e = 0) {
        let n = t[e];
        (t.sort((t, e) => t.from - e.from), (e = t.indexOf(n)));
        for (let n = 1; n < t.length; n++) {
          let i = t[n],
            s = t[n - 1];
          if (i.empty ? i.from <= s.to : i.from < s.to) {
            let r = s.from,
              o = Math.max(i.to, s.to);
            (n <= e && e--,
              t.splice(
                --n,
                2,
                i.anchor > i.head
                  ? EditorSelection.range(o, r)
                  : EditorSelection.range(r, o)
              ));
          }
        }
        return new EditorSelection(t, e);
      }
    };
    function k(t, e) {
      for (let n of t.ranges)
        if (n.to > e) throw RangeError('Selection points outside of document');
    }
    let w = 0;
    let Facet = class Facet {
      constructor(t, e, n, i, s) {
        ((this.combine = t),
          (this.compareInput = e),
          (this.compare = n),
          (this.isStatic = i),
          (this.id = w++),
          (this.default = t([])),
          (this.extensions = 'function' == typeof s ? s(this) : s));
      }
      get reader() {
        return this;
      }
      static define(t = {}) {
        return new Facet(
          t.combine || (t => t),
          t.compareInput || ((t, e) => t === e),
          t.compare || (!t.combine ? y : (t, e) => t === e),
          !!t.static,
          t.enables
        );
      }
      of(t) {
        return new FacetProvider([], this, 0, t);
      }
      compute(t, e) {
        if (this.isStatic) throw Error("Can't compute a static facet");
        return new FacetProvider(t, this, 1, e);
      }
      computeN(t, e) {
        if (this.isStatic) throw Error("Can't compute a static facet");
        return new FacetProvider(t, this, 2, e);
      }
      from(t, e) {
        return (e || (e = t => t), this.compute([t], n => e(n.field(t))));
      }
    };
    function y(t, e) {
      return t == e || (t.length == e.length && t.every((t, n) => t === e[n]));
    }
    let FacetProvider = class FacetProvider {
      constructor(t, e, n, i) {
        ((this.dependencies = t),
          (this.facet = e),
          (this.type = n),
          (this.value = i),
          (this.id = w++));
      }
      dynamicSlot(t) {
        var e;
        let n = this.value,
          i = this.facet.compareInput,
          s = this.id,
          r = t[s] >> 1,
          o = 2 == this.type,
          a = !1,
          l = !1,
          h = [];
        for (let n of this.dependencies)
          'doc' == n
            ? (a = !0)
            : 'selection' == n
              ? (l = !0)
              : ((null != (e = t[n.id]) ? e : 1) & 1) == 0 && h.push(t[n.id]);
        return {
          create: t => ((t.values[r] = n(t)), 1),
          update(t, e) {
            if (
              (a && e.docChanged) ||
              (l && (e.docChanged || e.selection)) ||
              C(t, h)
            ) {
              let e = n(t);
              if (o ? !b(e, t.values[r], i) : !i(e, t.values[r]))
                return ((t.values[r] = e), 1);
            }
            return 0;
          },
          reconfigure: (t, e) => {
            let a,
              l = e.config.address[s];
            if (null != l) {
              let s = R(e, l);
              if (
                this.dependencies.every(n =>
                  n instanceof Facet
                    ? e.facet(n) === t.facet(n)
                    : !(n instanceof StateField) ||
                      e.field(n, !1) == t.field(n, !1)
                ) ||
                (o ? b((a = n(t)), s, i) : i((a = n(t)), s))
              )
                return ((t.values[r] = s), 0);
            } else a = n(t);
            return ((t.values[r] = a), 1);
          }
        };
      }
      get extension() {
        return this;
      }
    };
    function b(t, e, n) {
      if (t.length != e.length) return !1;
      for (let i = 0; i < t.length; i++) if (!n(t[i], e[i])) return !1;
      return !0;
    }
    function C(t, e) {
      let n = !1;
      for (let i of e) 1 & A(t, i) && (n = !0);
      return n;
    }
    let E = Facet.define({ static: !0 });
    let StateField = class StateField {
      constructor(t, e, n, i, s) {
        ((this.id = t),
          (this.createF = e),
          (this.updateF = n),
          (this.compareF = i),
          (this.spec = s),
          (this.provides = void 0));
      }
      static define(t) {
        let e = new StateField(
          w++,
          t.create,
          t.update,
          t.compare || ((t, e) => t === e),
          t
        );
        return (t.provide && (e.provides = t.provide(e)), e);
      }
      create(t) {
        let e = t.facet(E).find(t => t.field == this);
        return ((null == e ? void 0 : e.create) || this.createF)(t);
      }
      slot(t) {
        let e = t[this.id] >> 1;
        return {
          create: t => ((t.values[e] = this.create(t)), 1),
          update: (t, n) => {
            let i = t.values[e],
              s = this.updateF(i, n);
            return this.compareF(i, s) ? 0 : ((t.values[e] = s), 1);
          },
          reconfigure: (t, n) => {
            let i = t.facet(E),
              s = n.facet(E),
              r;
            return (r = i.find(t => t.field == this)) &&
              r != s.find(t => t.field == this)
              ? ((t.values[e] = r.create(t)), 1)
              : null != n.config.address[this.id]
                ? ((t.values[e] = n.field(this)), 0)
                : ((t.values[e] = this.create(t)), 1);
          }
        };
      }
      init(t) {
        return [this, E.of({ field: this, create: t })];
      }
      get extension() {
        return this;
      }
    };
    function T(t) {
      return e => new PrecExtension(e, t);
    }
    let I = {
      highest: T(0),
      high: T(1),
      default: T(2),
      low: T(3),
      lowest: T(4)
    };
    let PrecExtension = class PrecExtension {
      constructor(t, e) {
        ((this.inner = t), (this.prec = e));
      }
      get extension() {
        return this;
      }
    };
    let Compartment = class Compartment {
      of(t) {
        return new CompartmentInstance(this, t);
      }
      reconfigure(t) {
        return Compartment.reconfigure.of({ compartment: this, extension: t });
      }
      get(t) {
        return t.config.compartments.get(this);
      }
    };
    let CompartmentInstance = class CompartmentInstance {
      constructor(t, e) {
        ((this.compartment = t), (this.inner = e));
      }
      get extension() {
        return this;
      }
    };
    let Configuration = class Configuration {
      constructor(t, e, n, i, s, r) {
        for (
          this.base = t,
            this.compartments = e,
            this.dynamicSlots = n,
            this.address = i,
            this.staticValues = s,
            this.facets = r,
            this.statusTemplate = [];
          this.statusTemplate.length < n.length;
        )
          this.statusTemplate.push(0);
      }
      staticFacet(t) {
        let e = this.address[t.id];
        return null == e ? t.default : this.staticValues[e >> 1];
      }
      static resolve(t, e, n) {
        var i, s, r;
        let o,
          a,
          l = [],
          h = Object.create(null),
          c = new Map();
        for (let n of ((i = t),
        (s = e),
        (r = c),
        (o = [[], [], [], [], []]),
        (a = new Map()),
        !(function t(e, n) {
          let i = a.get(e);
          if (null != i) {
            if (i <= n) return;
            let t = o[i].indexOf(e);
            (t > -1 && o[i].splice(t, 1),
              e instanceof CompartmentInstance && r.delete(e.compartment));
          }
          if ((a.set(e, n), Array.isArray(e))) for (let i of e) t(i, n);
          else if (e instanceof CompartmentInstance) {
            if (r.has(e.compartment))
              throw RangeError('Duplicate use of compartment in extensions');
            let i = s.get(e.compartment) || e.inner;
            (r.set(e.compartment, i), t(i, n));
          } else if (e instanceof PrecExtension) t(e.inner, e.prec);
          else if (e instanceof StateField)
            (o[n].push(e), e.provides && t(e.provides, n));
          else if (e instanceof FacetProvider)
            (o[n].push(e), e.facet.extensions && t(e.facet.extensions, 2));
          else {
            let i = e.extension;
            if (!i)
              throw Error(
                `Unrecognized extension value in extension set (${e}).`
              );
            if (i == e)
              throw Error(
                `Unrecognized extension value in extension set (${e}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`
              );
            t(i, n);
          }
        })(i, 2),
        o.reduce((t, e) => t.concat(e))))
          n instanceof StateField
            ? l.push(n)
            : (h[n.facet.id] || (h[n.facet.id] = [])).push(n);
        let f = Object.create(null),
          u = [],
          d = [];
        for (let t of l) ((f[t.id] = d.length << 1), d.push(e => t.slot(e)));
        let g = null == n ? void 0 : n.config.facets;
        for (let t in h) {
          let e = h[t],
            i = e[0].facet,
            s = (g && g[t]) || [];
          if (e.every(t => 0 == t.type))
            if (((f[i.id] = (u.length << 1) | 1), y(s, e))) u.push(n.facet(i));
            else {
              let t = i.combine(e.map(t => t.value));
              u.push(n && i.compare(t, n.facet(i)) ? n.facet(i) : t);
            }
          else {
            for (let t of e)
              0 == t.type
                ? ((f[t.id] = (u.length << 1) | 1), u.push(t.value))
                : ((f[t.id] = d.length << 1), d.push(e => t.dynamicSlot(e)));
            ((f[i.id] = d.length << 1),
              d.push(t =>
                (function (t, e, n) {
                  let i = n.map(e => t[e.id]),
                    s = n.map(t => t.type),
                    r = i.filter(t => !(1 & t)),
                    o = t[e.id] >> 1;
                  function a(t) {
                    let n = [];
                    for (let e = 0; e < i.length; e++) {
                      let r = R(t, i[e]);
                      if (2 == s[e]) for (let t of r) n.push(t);
                      else n.push(r);
                    }
                    return e.combine(n);
                  }
                  return {
                    create(t) {
                      for (let e of i) A(t, e);
                      return ((t.values[o] = a(t)), 1);
                    },
                    update(t, n) {
                      if (!C(t, r)) return 0;
                      let i = a(t);
                      return e.compare(i, t.values[o])
                        ? 0
                        : ((t.values[o] = i), 1);
                    },
                    reconfigure(t, s) {
                      let r = C(t, i),
                        l = s.config.facets[e.id],
                        h = s.facet(e);
                      if (l && !r && y(n, l)) return ((t.values[o] = h), 0);
                      let c = a(t);
                      return e.compare(c, h)
                        ? ((t.values[o] = h), 0)
                        : ((t.values[o] = c), 1);
                    }
                  };
                })(t, i, e)
              ));
          }
        }
        return new Configuration(
          t,
          c,
          d.map(t => t(f)),
          f,
          u,
          h
        );
      }
    };
    function A(t, e) {
      if (1 & e) return 2;
      let n = e >> 1,
        i = t.status[n];
      if (4 == i) throw Error('Cyclic dependency between fields and/or facets');
      if (2 & i) return i;
      t.status[n] = 4;
      let s = t.computeSlot(t, t.config.dynamicSlots[n]);
      return (t.status[n] = 2 | s);
    }
    function R(t, e) {
      return 1 & e ? t.config.staticValues[e >> 1] : t.values[e >> 1];
    }
    let P = Facet.define(),
      L = Facet.define({ combine: t => t.some(t => t), static: !0 }),
      M = Facet.define({
        combine: t => (t.length ? t[0] : void 0),
        static: !0
      }),
      _ = Facet.define(),
      O = Facet.define(),
      F = Facet.define(),
      N = Facet.define({ combine: t => !!t.length && t[0] });
    let Annotation = class Annotation {
      constructor(t, e) {
        ((this.type = t), (this.value = e));
      }
      static define() {
        return new AnnotationType();
      }
    };
    let AnnotationType = class AnnotationType {
      of(t) {
        return new Annotation(this, t);
      }
    };
    let StateEffectType = class StateEffectType {
      constructor(t) {
        this.map = t;
      }
      of(t) {
        return new StateEffect(this, t);
      }
    };
    let StateEffect = class StateEffect {
      constructor(t, e) {
        ((this.type = t), (this.value = e));
      }
      map(t) {
        let e = this.type.map(this.value, t);
        return void 0 === e
          ? void 0
          : e == this.value
            ? this
            : new StateEffect(this.type, e);
      }
      is(t) {
        return this.type == t;
      }
      static define(t = {}) {
        return new StateEffectType(t.map || (t => t));
      }
      static mapEffects(t, e) {
        if (!t.length) return t;
        let n = [];
        for (let i of t) {
          let t = i.map(e);
          t && n.push(t);
        }
        return n;
      }
    };
    ((StateEffect.reconfigure = StateEffect.define()),
      (StateEffect.appendConfig = StateEffect.define()));
    let Transaction = class Transaction {
      constructor(t, e, n, i, s, r) {
        ((this.startState = t),
          (this.changes = e),
          (this.selection = n),
          (this.effects = i),
          (this.annotations = s),
          (this.scrollIntoView = r),
          (this._doc = null),
          (this._state = null),
          n && k(n, e.newLength),
          s.some(t => t.type == Transaction.time) ||
            (this.annotations = s.concat(Transaction.time.of(Date.now()))));
      }
      static create(t, e, n, i, s, r) {
        return new Transaction(t, e, n, i, s, r);
      }
      get newDoc() {
        return (
          this._doc || (this._doc = this.changes.apply(this.startState.doc))
        );
      }
      get newSelection() {
        return this.selection || this.startState.selection.map(this.changes);
      }
      get state() {
        return (
          this._state || this.startState.applyTransaction(this),
          this._state
        );
      }
      annotation(t) {
        for (let e of this.annotations) if (e.type == t) return e.value;
      }
      get docChanged() {
        return !this.changes.empty;
      }
      get reconfigured() {
        return this.startState.config != this.state.config;
      }
      isUserEvent(t) {
        let e = this.annotation(Transaction.userEvent);
        return !!(
          e &&
          (e == t ||
            (e.length > t.length &&
              e.slice(0, t.length) == t &&
              '.' == e[t.length]))
        );
      }
    };
    function B(t, e, n) {
      var i;
      let s, r, o;
      return (
        n
          ? ((s = e.changes),
            (r = ChangeSet.empty(e.changes.length)),
            (o = t.changes.compose(e.changes)))
          : ((s = e.changes.map(t.changes)),
            (r = t.changes.mapDesc(e.changes, !0)),
            (o = t.changes.compose(s))),
        {
          changes: o,
          selection: e.selection
            ? e.selection.map(r)
            : null == (i = t.selection)
              ? void 0
              : i.map(s),
          effects: StateEffect.mapEffects(t.effects, s).concat(
            StateEffect.mapEffects(e.effects, r)
          ),
          annotations: t.annotations.length
            ? t.annotations.concat(e.annotations)
            : e.annotations,
          scrollIntoView: t.scrollIntoView || e.scrollIntoView
        }
      );
    }
    function D(t, e, n) {
      let i = e.selection,
        s = $(e.annotations);
      return (
        e.userEvent && (s = s.concat(Transaction.userEvent.of(e.userEvent))),
        {
          changes:
            e.changes instanceof ChangeSet
              ? e.changes
              : ChangeSet.of(e.changes || [], n, t.facet(M)),
          selection:
            i &&
            (i instanceof EditorSelection
              ? i
              : EditorSelection.single(i.anchor, i.head)),
          effects: $(e.effects),
          annotations: s,
          scrollIntoView: !!e.scrollIntoView
        }
      );
    }
    ((Transaction.time = Annotation.define()),
      (Transaction.userEvent = Annotation.define()),
      (Transaction.addToHistory = Annotation.define()),
      (Transaction.remote = Annotation.define()));
    let J = [];
    function $(t) {
      return null == t ? J : Array.isArray(t) ? t : [t];
    }
    var z =
      (((r = z || (z = {}))[(r.Word = 0)] = 'Word'),
      (r[(r.Space = 1)] = 'Space'),
      (r[(r.Other = 2)] = 'Other'),
      r);
    let V =
      /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    try {
      i = RegExp('[\\p{Alphabetic}\\p{Number}_]', 'u');
    } catch (t) {}
    let EditorState = class EditorState {
      constructor(t, e, n, i, s, r) {
        ((this.config = t),
          (this.doc = e),
          (this.selection = n),
          (this.values = i),
          (this.status = t.statusTemplate.slice()),
          (this.computeSlot = s),
          r && (r._state = this));
        for (let t = 0; t < this.config.dynamicSlots.length; t++)
          A(this, t << 1);
        this.computeSlot = null;
      }
      field(t, e = !0) {
        let n = this.config.address[t.id];
        if (null == n) {
          if (e) throw RangeError('Field is not present in this state');
          return;
        }
        return (A(this, n), R(this, n));
      }
      update(...t) {
        return (function t(e, n, i) {
          let s = D(e, n.length ? n[0] : {}, e.doc.length);
          n.length && !1 === n[0].filter && (i = !1);
          for (let t = 1; t < n.length; t++) {
            !1 === n[t].filter && (i = !1);
            let r = !!n[t].sequential;
            s = B(s, D(e, n[t], r ? s.changes.newLength : e.doc.length), r);
          }
          let r = Transaction.create(
            e,
            s.changes,
            s.selection,
            s.effects,
            s.annotations,
            s.scrollIntoView
          );
          return (function (t) {
            let e = t.startState,
              n = e.facet(F),
              i = t;
            for (let s = n.length - 1; s >= 0; s--) {
              let r = n[s](t);
              r &&
                Object.keys(r).length &&
                (i = B(i, D(e, r, t.changes.newLength), !0));
            }
            return i == t
              ? t
              : Transaction.create(
                  e,
                  t.changes,
                  t.selection,
                  i.effects,
                  i.annotations,
                  i.scrollIntoView
                );
          })(
            i
              ? (function (e) {
                  let n = e.startState,
                    i = !0;
                  for (let t of n.facet(_)) {
                    let n = t(e);
                    if (!1 === n) {
                      i = !1;
                      break;
                    }
                    Array.isArray(n) &&
                      (i =
                        !0 === i
                          ? n
                          : (function (t, e) {
                              let n = [];
                              for (let i = 0, s = 0; ;) {
                                let r, o;
                                if (
                                  i < t.length &&
                                  (s == e.length || e[s] >= t[i])
                                )
                                  ((r = t[i++]), (o = t[i++]));
                                else {
                                  if (!(s < e.length)) return n;
                                  ((r = e[s++]), (o = e[s++]));
                                }
                                !n.length || n[n.length - 1] < r
                                  ? n.push(r, o)
                                  : n[n.length - 1] < o &&
                                    (n[n.length - 1] = o);
                              }
                            })(i, n));
                  }
                  if (!0 !== i) {
                    let t, s;
                    if (!1 === i)
                      ((s = e.changes.invertedDesc),
                        (t = ChangeSet.empty(n.doc.length)));
                    else {
                      let n = e.changes.filter(i);
                      ((t = n.changes),
                        (s = n.filtered.mapDesc(n.changes).invertedDesc));
                    }
                    e = Transaction.create(
                      n,
                      t,
                      e.selection && e.selection.map(s),
                      StateEffect.mapEffects(e.effects, s),
                      e.annotations,
                      e.scrollIntoView
                    );
                  }
                  let s = n.facet(O);
                  for (let i = s.length - 1; i >= 0; i--) {
                    let r = s[i](e);
                    e =
                      r instanceof Transaction
                        ? r
                        : Array.isArray(r) &&
                            1 == r.length &&
                            r[0] instanceof Transaction
                          ? r[0]
                          : t(n, $(r), !1);
                  }
                  return e;
                })(r)
              : r
          );
        })(this, t, !0);
      }
      applyTransaction(t) {
        let e,
          n = this.config,
          { base: i, compartments: s } = n;
        for (let e of t.effects)
          e.is(Compartment.reconfigure)
            ? (n &&
                ((s = new Map()),
                n.compartments.forEach((t, e) => s.set(e, t)),
                (n = null)),
              s.set(e.value.compartment, e.value.extension))
            : e.is(StateEffect.reconfigure)
              ? ((n = null), (i = e.value))
              : e.is(StateEffect.appendConfig) &&
                ((n = null), (i = $(i).concat(e.value)));
        e = n
          ? t.startState.values.slice()
          : new EditorState(
              (n = Configuration.resolve(i, s, this)),
              this.doc,
              this.selection,
              n.dynamicSlots.map(() => null),
              (t, e) => e.reconfigure(t, this),
              null
            ).values;
        let r = t.startState.facet(L)
          ? t.newSelection
          : t.newSelection.asSingle();
        new EditorState(n, t.newDoc, r, e, (e, n) => n.update(e, t), t);
      }
      replaceSelection(t) {
        return (
          'string' == typeof t && (t = this.toText(t)),
          this.changeByRange(e => ({
            changes: { from: e.from, to: e.to, insert: t },
            range: EditorSelection.cursor(e.from + t.length)
          }))
        );
      }
      changeByRange(t) {
        let e = this.selection,
          n = t(e.ranges[0]),
          i = this.changes(n.changes),
          s = [n.range],
          r = $(n.effects);
        for (let n = 1; n < e.ranges.length; n++) {
          let o = t(e.ranges[n]),
            a = this.changes(o.changes),
            l = a.map(i);
          for (let t = 0; t < n; t++) s[t] = s[t].map(l);
          let h = i.mapDesc(a, !0);
          (s.push(o.range.map(h)),
            (i = i.compose(l)),
            (r = StateEffect.mapEffects(r, l).concat(
              StateEffect.mapEffects($(o.effects), h)
            )));
        }
        return {
          changes: i,
          selection: EditorSelection.create(s, e.mainIndex),
          effects: r
        };
      }
      changes(t = []) {
        return t instanceof ChangeSet
          ? t
          : ChangeSet.of(
              t,
              this.doc.length,
              this.facet(EditorState.lineSeparator)
            );
      }
      toText(t) {
        return Text.of(t.split(this.facet(EditorState.lineSeparator) || d));
      }
      sliceDoc(t = 0, e = this.doc.length) {
        return this.doc.sliceString(t, e, this.lineBreak);
      }
      facet(t) {
        let e = this.config.address[t.id];
        return null == e ? t.default : (A(this, e), R(this, e));
      }
      toJSON(t) {
        let e = { doc: this.sliceDoc(), selection: this.selection.toJSON() };
        if (t)
          for (let n in t) {
            let i = t[n];
            i instanceof StateField &&
              null != this.config.address[i.id] &&
              (e[n] = i.spec.toJSON(this.field(t[n]), this));
          }
        return e;
      }
      static fromJSON(t, e = {}, n) {
        if (!t || 'string' != typeof t.doc)
          throw RangeError('Invalid JSON representation for EditorState');
        let i = [];
        if (n) {
          for (let e in n)
            if (Object.prototype.hasOwnProperty.call(t, e)) {
              let s = n[e],
                r = t[e];
              i.push(s.init(t => s.spec.fromJSON(r, t)));
            }
        }
        return EditorState.create({
          doc: t.doc,
          selection: EditorSelection.fromJSON(t.selection),
          extensions: e.extensions ? i.concat([e.extensions]) : i
        });
      }
      static create(t = {}) {
        let e = Configuration.resolve(t.extensions || [], new Map()),
          n =
            t.doc instanceof Text
              ? t.doc
              : Text.of(
                  (t.doc || '').split(
                    e.staticFacet(EditorState.lineSeparator) || d
                  )
                ),
          i = t.selection
            ? t.selection instanceof EditorSelection
              ? t.selection
              : EditorSelection.single(t.selection.anchor, t.selection.head)
            : EditorSelection.single(0);
        return (
          k(i, n.length),
          e.staticFacet(L) || (i = i.asSingle()),
          new EditorState(
            e,
            n,
            i,
            e.dynamicSlots.map(() => null),
            (t, e) => e.create(t),
            null
          )
        );
      }
      get tabSize() {
        return this.facet(EditorState.tabSize);
      }
      get lineBreak() {
        return this.facet(EditorState.lineSeparator) || '\n';
      }
      get readOnly() {
        return this.facet(N);
      }
      phrase(t, ...e) {
        for (let e of this.facet(EditorState.phrases))
          if (Object.prototype.hasOwnProperty.call(e, t)) {
            t = e[t];
            break;
          }
        return (
          e.length &&
            (t = t.replace(/\$(\$|\d*)/g, (t, n) => {
              if ('$' == n) return '$';
              let i = +(n || 1);
              return !i || i > e.length ? t : e[i - 1];
            })),
          t
        );
      }
      languageDataAt(t, e, n = -1) {
        let i = [];
        for (let s of this.facet(P))
          for (let r of s(this, e, n))
            Object.prototype.hasOwnProperty.call(r, t) && i.push(r[t]);
        return i;
      }
      charCategorizer(t) {
        var e;
        let n = this.languageDataAt('wordChars', t);
        return (
          (e = n.length ? n[0] : ''),
          t => {
            if (!/\S/.test(t)) return z.Space;
            if (
              (function (t) {
                if (i) return i.test(t);
                for (let e = 0; e < t.length; e++) {
                  let n = t[e];
                  if (
                    /\w/.test(n) ||
                    (n > '' &&
                      (n.toUpperCase() != n.toLowerCase() || V.test(n)))
                  )
                    return !0;
                }
                return !1;
              })(t)
            )
              return z.Word;
            for (let n = 0; n < e.length; n++)
              if (t.indexOf(e[n]) > -1) return z.Word;
            return z.Other;
          }
        );
      }
      wordAt(t) {
        let { text: e, from: n, length: i } = this.doc.lineAt(t),
          s = this.charCategorizer(t),
          r = t - n,
          o = t - n;
        for (; r > 0;) {
          let t = h(e, r, !1);
          if (s(e.slice(t, r)) != z.Word) break;
          r = t;
        }
        for (; o < i;) {
          let t = h(e, o);
          if (s(e.slice(o, t)) != z.Word) break;
          o = t;
        }
        return r == o ? null : EditorSelection.range(r + n, o + n);
      }
    };
    function j(t, e, n = {}) {
      let i = {};
      for (let e of t)
        for (let t of Object.keys(e)) {
          let s = e[t],
            r = i[t];
          if (void 0 === r) i[t] = s;
          else if (r === s || void 0 === s);
          else if (Object.hasOwnProperty.call(n, t)) i[t] = n[t](r, s);
          else throw Error('Config merge conflict for field ' + t);
        }
      for (let t in e) void 0 === i[t] && (i[t] = e[t]);
      return i;
    }
    ((EditorState.allowMultipleSelections = L),
      (EditorState.tabSize = Facet.define({
        combine: t => (t.length ? t[0] : 4)
      })),
      (EditorState.lineSeparator = M),
      (EditorState.readOnly = N),
      (EditorState.phrases = Facet.define({
        compare(t, e) {
          let n = Object.keys(t),
            i = Object.keys(e);
          return n.length == i.length && n.every(n => t[n] == e[n]);
        }
      })),
      (EditorState.languageData = P),
      (EditorState.changeFilter = _),
      (EditorState.transactionFilter = O),
      (EditorState.transactionExtender = F),
      (Compartment.reconfigure = StateEffect.define()));
    let RangeValue = class RangeValue {
      eq(t) {
        return this == t;
      }
      range(t, e = t) {
        return Range.create(t, e, this);
      }
    };
    function q(t, e) {
      return t == e || (t.constructor == e.constructor && t.eq(e));
    }
    ((RangeValue.prototype.startSide = RangeValue.prototype.endSide = 0),
      (RangeValue.prototype.point = !1),
      (RangeValue.prototype.mapMode = g.TrackDel));
    let Range = class Range {
      constructor(t, e, n) {
        ((this.from = t), (this.to = e), (this.value = n));
      }
      static create(t, e, n) {
        return new Range(t, e, n);
      }
    };
    function H(t, e) {
      return t.from - e.from || t.value.startSide - e.value.startSide;
    }
    let Chunk = class Chunk {
      constructor(t, e, n, i) {
        ((this.from = t), (this.to = e), (this.value = n), (this.maxPoint = i));
      }
      get length() {
        return this.to[this.to.length - 1];
      }
      findIndex(t, e, n, i = 0) {
        let s = n ? this.to : this.from;
        for (let r = i, o = s.length; ;) {
          if (r == o) return r;
          let i = (r + o) >> 1,
            a =
              s[i] - t ||
              (n ? this.value[i].endSide : this.value[i].startSide) - e;
          if (i == r) return a >= 0 ? r : o;
          a >= 0 ? (o = i) : (r = i + 1);
        }
      }
      between(t, e, n, i) {
        for (
          let s = this.findIndex(e, -1e9, !0),
            r = this.findIndex(n, 1e9, !1, s);
          s < r;
          s++
        )
          if (!1 === i(this.from[s] + t, this.to[s] + t, this.value[s]))
            return !1;
      }
      map(t, e) {
        let n = [],
          i = [],
          s = [],
          r = -1,
          o = -1;
        for (let a = 0; a < this.value.length; a++) {
          let l = this.value[a],
            h = this.from[a] + t,
            c = this.to[a] + t,
            f,
            u;
          if (h == c) {
            let t = e.mapPos(h, l.startSide, l.mapMode);
            if (
              null == t ||
              ((f = u = t),
              l.startSide != l.endSide && (u = e.mapPos(h, l.endSide)) < f)
            )
              continue;
          } else if (
            (f = e.mapPos(h, l.startSide)) > (u = e.mapPos(c, l.endSide)) ||
            (f == u && l.startSide > 0 && l.endSide <= 0)
          )
            continue;
          0 > (u - f || l.endSide - l.startSide) ||
            (r < 0 && (r = f),
            l.point && (o = Math.max(o, u - f)),
            n.push(l),
            i.push(f - r),
            s.push(u - r));
        }
        return { mapped: n.length ? new Chunk(i, s, n, o) : null, pos: r };
      }
    };
    let RangeSet = class RangeSet {
      constructor(t, e, n, i) {
        ((this.chunkPos = t),
          (this.chunk = e),
          (this.nextLayer = n),
          (this.maxPoint = i));
      }
      static create(t, e, n, i) {
        return new RangeSet(t, e, n, i);
      }
      get length() {
        let t = this.chunk.length - 1;
        return t < 0 ? 0 : Math.max(this.chunkEnd(t), this.nextLayer.length);
      }
      get size() {
        if (this.isEmpty) return 0;
        let t = this.nextLayer.size;
        for (let e of this.chunk) t += e.value.length;
        return t;
      }
      chunkEnd(t) {
        return this.chunkPos[t] + this.chunk[t].length;
      }
      update(t) {
        let {
            add: e = [],
            sort: n = !1,
            filterFrom: i = 0,
            filterTo: s = this.length
          } = t,
          r = t.filter;
        if (0 == e.length && !r) return this;
        if ((n && (e = e.slice().sort(H)), this.isEmpty))
          return e.length ? RangeSet.of(e) : this;
        let o = new LayerCursor(this, null, -1).goto(0),
          a = 0,
          l = [],
          h = new RangeSetBuilder();
        for (; o.value || a < e.length;)
          if (
            a < e.length &&
            (o.from - e[a].from || o.startSide - e[a].value.startSide) >= 0
          ) {
            let t = e[a++];
            h.addInner(t.from, t.to, t.value) || l.push(t);
          } else
            1 == o.rangeIndex &&
            o.chunkIndex < this.chunk.length &&
            (a == e.length || this.chunkEnd(o.chunkIndex) < e[a].from) &&
            (!r ||
              i > this.chunkEnd(o.chunkIndex) ||
              s < this.chunkPos[o.chunkIndex]) &&
            h.addChunk(this.chunkPos[o.chunkIndex], this.chunk[o.chunkIndex])
              ? o.nextChunk()
              : ((!r || i > o.to || s < o.from || r(o.from, o.to, o.value)) &&
                  !h.addInner(o.from, o.to, o.value) &&
                  l.push(Range.create(o.from, o.to, o.value)),
                o.next());
        return h.finishInner(
          this.nextLayer.isEmpty && !l.length
            ? RangeSet.empty
            : this.nextLayer.update({
                add: l,
                filter: r,
                filterFrom: i,
                filterTo: s
              })
        );
      }
      map(t) {
        if (t.empty || this.isEmpty) return this;
        let e = [],
          n = [],
          i = -1;
        for (let s = 0; s < this.chunk.length; s++) {
          let r = this.chunkPos[s],
            o = this.chunk[s],
            a = t.touchesRange(r, r + o.length);
          if (!1 === a)
            ((i = Math.max(i, o.maxPoint)), e.push(o), n.push(t.mapPos(r)));
          else if (!0 === a) {
            let { mapped: s, pos: a } = o.map(r, t);
            s && ((i = Math.max(i, s.maxPoint)), e.push(s), n.push(a));
          }
        }
        let s = this.nextLayer.map(t);
        return 0 == e.length ? s : new RangeSet(n, e, s || RangeSet.empty, i);
      }
      between(t, e, n) {
        if (!this.isEmpty) {
          for (let i = 0; i < this.chunk.length; i++) {
            let s = this.chunkPos[i],
              r = this.chunk[i];
            if (
              e >= s &&
              t <= s + r.length &&
              !1 === r.between(s, t - s, e - s, n)
            )
              return;
          }
          this.nextLayer.between(t, e, n);
        }
      }
      iter(t = 0) {
        return HeapCursor.from([this]).goto(t);
      }
      get isEmpty() {
        return this.nextLayer == this;
      }
      static iter(t, e = 0) {
        return HeapCursor.from(t).goto(e);
      }
      static compare(t, e, n, i, s = -1) {
        let r = t.filter(
            t => t.maxPoint > 0 || (!t.isEmpty && t.maxPoint >= s)
          ),
          o = e.filter(t => t.maxPoint > 0 || (!t.isEmpty && t.maxPoint >= s)),
          a = U(r, o, n),
          l = new SpanCursor(r, a, s),
          h = new SpanCursor(o, a, s);
        (n.iterGaps((t, e, n) => Z(l, t, h, e, n, i)),
          n.empty && 0 == n.length && Z(l, 0, h, 0, 0, i));
      }
      static eq(t, e, n = 0, i) {
        null == i && (i = 1e9 - 1);
        let s = t.filter(t => !t.isEmpty && 0 > e.indexOf(t)),
          r = e.filter(e => !e.isEmpty && 0 > t.indexOf(e));
        if (s.length != r.length) return !1;
        if (!s.length) return !0;
        let o = U(s, r),
          a = new SpanCursor(s, o, 0).goto(n),
          l = new SpanCursor(r, o, 0).goto(n);
        for (;;) {
          if (
            a.to != l.to ||
            !K(a.active, l.active) ||
            (a.point && (!l.point || !q(a.point, l.point)))
          )
            return !1;
          if (a.to > i) return !0;
          (a.next(), l.next());
        }
      }
      static spans(t, e, n, i, s = -1) {
        let r = new SpanCursor(t, null, s).goto(e),
          o = e,
          a = r.openStart;
        for (;;) {
          let t = Math.min(r.to, n);
          if (r.point) {
            let n = r.activeForPoint(r.to),
              s =
                r.pointFrom < e
                  ? n.length + 1
                  : r.point.startSide < 0
                    ? n.length
                    : Math.min(n.length, a);
            (i.point(o, t, r.point, n, s, r.pointRank),
              (a = Math.min(r.openEnd(t), n.length)));
          } else t > o && (i.span(o, t, r.active, a), (a = r.openEnd(t)));
          if (r.to > n) return a + (r.point && r.to > n ? 1 : 0);
          ((o = r.to), r.next());
        }
      }
      static of(t, e = !1) {
        let n = new RangeSetBuilder();
        for (let i of t instanceof Range
          ? [t]
          : e
            ? (function (t) {
                if (t.length > 1)
                  for (let e = t[0], n = 1; n < t.length; n++) {
                    let i = t[n];
                    if (H(e, i) > 0) return t.slice().sort(H);
                    e = i;
                  }
                return t;
              })(t)
            : t)
          n.add(i.from, i.to, i.value);
        return n.finish();
      }
      static join(t) {
        if (!t.length) return RangeSet.empty;
        let e = t[t.length - 1];
        for (let n = t.length - 2; n >= 0; n--)
          for (let i = t[n]; i != RangeSet.empty; i = i.nextLayer)
            e = new RangeSet(
              i.chunkPos,
              i.chunk,
              e,
              Math.max(i.maxPoint, e.maxPoint)
            );
        return e;
      }
    };
    ((RangeSet.empty = new RangeSet([], [], null, -1)),
      (RangeSet.empty.nextLayer = RangeSet.empty));
    let RangeSetBuilder = class RangeSetBuilder {
      finishChunk(t) {
        (this.chunks.push(
          new Chunk(this.from, this.to, this.value, this.maxPoint)
        ),
          this.chunkPos.push(this.chunkStart),
          (this.chunkStart = -1),
          (this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint)),
          (this.maxPoint = -1),
          t && ((this.from = []), (this.to = []), (this.value = [])));
      }
      constructor() {
        ((this.chunks = []),
          (this.chunkPos = []),
          (this.chunkStart = -1),
          (this.last = null),
          (this.lastFrom = -1e9),
          (this.lastTo = -1e9),
          (this.from = []),
          (this.to = []),
          (this.value = []),
          (this.maxPoint = -1),
          (this.setMaxPoint = -1),
          (this.nextLayer = null));
      }
      add(t, e, n) {
        this.addInner(t, e, n) ||
          (this.nextLayer || (this.nextLayer = new RangeSetBuilder())).add(
            t,
            e,
            n
          );
      }
      addInner(t, e, n) {
        let i = t - this.lastTo || n.startSide - this.last.endSide;
        if (
          i <= 0 &&
          0 > (t - this.lastFrom || n.startSide - this.last.startSide)
        )
          throw Error(
            'Ranges must be added sorted by `from` position and `startSide`'
          );
        return (
          !(i < 0) &&
          (250 == this.from.length && this.finishChunk(!0),
          this.chunkStart < 0 && (this.chunkStart = t),
          this.from.push(t - this.chunkStart),
          this.to.push(e - this.chunkStart),
          (this.last = n),
          (this.lastFrom = t),
          (this.lastTo = e),
          this.value.push(n),
          n.point && (this.maxPoint = Math.max(this.maxPoint, e - t)),
          !0)
        );
      }
      addChunk(t, e) {
        if (0 > (t - this.lastTo || e.value[0].startSide - this.last.endSide))
          return !1;
        (this.from.length && this.finishChunk(!0),
          (this.setMaxPoint = Math.max(this.setMaxPoint, e.maxPoint)),
          this.chunks.push(e),
          this.chunkPos.push(t));
        let n = e.value.length - 1;
        return (
          (this.last = e.value[n]),
          (this.lastFrom = e.from[n] + t),
          (this.lastTo = e.to[n] + t),
          !0
        );
      }
      finish() {
        return this.finishInner(RangeSet.empty);
      }
      finishInner(t) {
        if ((this.from.length && this.finishChunk(!1), 0 == this.chunks.length))
          return t;
        let e = RangeSet.create(
          this.chunkPos,
          this.chunks,
          this.nextLayer ? this.nextLayer.finishInner(t) : t,
          this.setMaxPoint
        );
        return ((this.from = null), e);
      }
    };
    function U(t, e, n) {
      let i = new Map();
      for (let e of t)
        for (let t = 0; t < e.chunk.length; t++)
          e.chunk[t].maxPoint <= 0 && i.set(e.chunk[t], e.chunkPos[t]);
      let s = new Set();
      for (let t of e)
        for (let e = 0; e < t.chunk.length; e++) {
          let r = i.get(t.chunk[e]);
          null == r ||
            (n ? n.mapPos(r) : r) != t.chunkPos[e] ||
            (null == n ? void 0 : n.touchesRange(r, r + t.chunk[e].length)) ||
            s.add(t.chunk[e]);
        }
      return s;
    }
    let LayerCursor = class LayerCursor {
      constructor(t, e, n, i = 0) {
        ((this.layer = t),
          (this.skip = e),
          (this.minPoint = n),
          (this.rank = i));
      }
      get startSide() {
        return this.value ? this.value.startSide : 0;
      }
      get endSide() {
        return this.value ? this.value.endSide : 0;
      }
      goto(t, e = -1e9) {
        return (
          (this.chunkIndex = this.rangeIndex = 0),
          this.gotoInner(t, e, !1),
          this
        );
      }
      gotoInner(t, e, n) {
        for (; this.chunkIndex < this.layer.chunk.length;) {
          let e = this.layer.chunk[this.chunkIndex];
          if (!(
            (this.skip && this.skip.has(e)) ||
            this.layer.chunkEnd(this.chunkIndex) < t ||
            e.maxPoint < this.minPoint
          ))
            break;
          (this.chunkIndex++, (n = !1));
        }
        if (this.chunkIndex < this.layer.chunk.length) {
          let i = this.layer.chunk[this.chunkIndex].findIndex(
            t - this.layer.chunkPos[this.chunkIndex],
            e,
            !0
          );
          (!n || this.rangeIndex < i) && this.setRangeIndex(i);
        }
        this.next();
      }
      forward(t, e) {
        0 > (this.to - t || this.endSide - e) && this.gotoInner(t, e, !0);
      }
      next() {
        for (;;)
          if (this.chunkIndex == this.layer.chunk.length) {
            ((this.from = this.to = 1e9), (this.value = null));
            break;
          } else {
            let t = this.layer.chunkPos[this.chunkIndex],
              e = this.layer.chunk[this.chunkIndex],
              n = t + e.from[this.rangeIndex];
            if (
              ((this.from = n),
              (this.to = t + e.to[this.rangeIndex]),
              (this.value = e.value[this.rangeIndex]),
              this.setRangeIndex(this.rangeIndex + 1),
              this.minPoint < 0 ||
                (this.value.point && this.to - this.from >= this.minPoint))
            )
              break;
          }
      }
      setRangeIndex(t) {
        if (t == this.layer.chunk[this.chunkIndex].value.length) {
          if ((this.chunkIndex++, this.skip))
            for (
              ;
              this.chunkIndex < this.layer.chunk.length &&
              this.skip.has(this.layer.chunk[this.chunkIndex]);
            )
              this.chunkIndex++;
          this.rangeIndex = 0;
        } else this.rangeIndex = t;
      }
      nextChunk() {
        (this.chunkIndex++, (this.rangeIndex = 0), this.next());
      }
      compare(t) {
        return (
          this.from - t.from ||
          this.startSide - t.startSide ||
          this.rank - t.rank ||
          this.to - t.to ||
          this.endSide - t.endSide
        );
      }
    };
    let HeapCursor = class HeapCursor {
      constructor(t) {
        this.heap = t;
      }
      static from(t, e = null, n = -1) {
        let i = [];
        for (let s = 0; s < t.length; s++)
          for (let r = t[s]; !r.isEmpty; r = r.nextLayer)
            r.maxPoint >= n && i.push(new LayerCursor(r, e, n, s));
        return 1 == i.length ? i[0] : new HeapCursor(i);
      }
      get startSide() {
        return this.value ? this.value.startSide : 0;
      }
      goto(t, e = -1e9) {
        for (let n of this.heap) n.goto(t, e);
        for (let t = this.heap.length >> 1; t >= 0; t--) W(this.heap, t);
        return (this.next(), this);
      }
      forward(t, e) {
        for (let n of this.heap) n.forward(t, e);
        for (let t = this.heap.length >> 1; t >= 0; t--) W(this.heap, t);
        0 > (this.to - t || this.value.endSide - e) && this.next();
      }
      next() {
        if (0 == this.heap.length)
          ((this.from = this.to = 1e9), (this.value = null), (this.rank = -1));
        else {
          let t = this.heap[0];
          ((this.from = t.from),
            (this.to = t.to),
            (this.value = t.value),
            (this.rank = t.rank),
            t.value && t.next(),
            W(this.heap, 0));
        }
      }
    };
    function W(t, e) {
      for (let n = t[e]; ;) {
        let i = (e << 1) + 1;
        if (i >= t.length) break;
        let s = t[i];
        if (
          (i + 1 < t.length &&
            s.compare(t[i + 1]) >= 0 &&
            ((s = t[i + 1]), i++),
          0 > n.compare(s))
        )
          break;
        ((t[i] = n), (t[e] = s), (e = i));
      }
    }
    let SpanCursor = class SpanCursor {
      constructor(t, e, n) {
        ((this.minPoint = n),
          (this.active = []),
          (this.activeTo = []),
          (this.activeRank = []),
          (this.minActive = -1),
          (this.point = null),
          (this.pointFrom = 0),
          (this.pointRank = 0),
          (this.to = -1e9),
          (this.endSide = 0),
          (this.openStart = -1),
          (this.cursor = HeapCursor.from(t, e, n)));
      }
      goto(t, e = -1e9) {
        return (
          this.cursor.goto(t, e),
          (this.active.length =
            this.activeTo.length =
            this.activeRank.length =
              0),
          (this.minActive = -1),
          (this.to = t),
          (this.endSide = e),
          (this.openStart = -1),
          this.next(),
          this
        );
      }
      forward(t, e) {
        for (
          ;
          this.minActive > -1 &&
          0 >
            (this.activeTo[this.minActive] - t ||
              this.active[this.minActive].endSide - e);
        )
          this.removeActive(this.minActive);
        this.cursor.forward(t, e);
      }
      removeActive(t) {
        (G(this.active, t),
          G(this.activeTo, t),
          G(this.activeRank, t),
          (this.minActive = Q(this.active, this.activeTo)));
      }
      addActive(t) {
        let e = 0,
          { value: n, to: i, rank: s } = this.cursor;
        for (
          ;
          e < this.activeRank.length &&
          (s - this.activeRank[e] || i - this.activeTo[e]) > 0;
        )
          e++;
        (Y(this.active, e, n),
          Y(this.activeTo, e, i),
          Y(this.activeRank, e, s),
          t && Y(t, e, this.cursor.from),
          (this.minActive = Q(this.active, this.activeTo)));
      }
      next() {
        let t = this.to,
          e = this.point;
        this.point = null;
        let n = this.openStart < 0 ? [] : null;
        for (;;) {
          let i = this.minActive;
          if (
            i > -1 &&
            0 >
              (this.activeTo[i] - this.cursor.from ||
                this.active[i].endSide - this.cursor.startSide)
          ) {
            if (this.activeTo[i] > t) {
              ((this.to = this.activeTo[i]),
                (this.endSide = this.active[i].endSide));
              break;
            }
            (this.removeActive(i), n && G(n, i));
          } else if (this.cursor.value)
            if (this.cursor.from > t) {
              ((this.to = this.cursor.from),
                (this.endSide = this.cursor.startSide));
              break;
            } else {
              let t = this.cursor.value;
              if (t.point)
                if (
                  e &&
                  this.cursor.to == this.to &&
                  this.cursor.from < this.cursor.to
                )
                  this.cursor.next();
                else {
                  ((this.point = t),
                    (this.pointFrom = this.cursor.from),
                    (this.pointRank = this.cursor.rank),
                    (this.to = this.cursor.to),
                    (this.endSide = t.endSide),
                    this.cursor.next(),
                    this.forward(this.to, this.endSide));
                  break;
                }
              else (this.addActive(n), this.cursor.next());
            }
          else {
            this.to = this.endSide = 1e9;
            break;
          }
        }
        if (n) {
          this.openStart = 0;
          for (let e = n.length - 1; e >= 0 && n[e] < t; e--) this.openStart++;
        }
      }
      activeForPoint(t) {
        if (!this.active.length) return this.active;
        let e = [];
        for (
          let n = this.active.length - 1;
          n >= 0 && !(this.activeRank[n] < this.pointRank);
          n--
        )
          (this.activeTo[n] > t ||
            (this.activeTo[n] == t &&
              this.active[n].endSide >= this.point.endSide)) &&
            e.push(this.active[n]);
        return e.reverse();
      }
      openEnd(t) {
        let e = 0;
        for (
          let n = this.activeTo.length - 1;
          n >= 0 && this.activeTo[n] > t;
          n--
        )
          e++;
        return e;
      }
    };
    function Z(t, e, n, i, s, r) {
      (t.goto(e), n.goto(i));
      let o = i + s,
        a = i,
        l = i - e,
        h = !!r.boundChange;
      for (let e = !1; ;) {
        let i = t.to + l - n.to,
          s = i || t.endSide - n.endSide,
          c = s < 0 ? t.to + l : n.to,
          f = Math.min(c, o);
        if (
          (t.point || n.point
            ? ((t.point &&
                n.point &&
                q(t.point, n.point) &&
                K(t.activeForPoint(t.to), n.activeForPoint(n.to))) ||
                r.comparePoint(a, f, t.point, n.point),
              (e = !1))
            : (e && r.boundChange(a),
              f > a &&
                !K(t.active, n.active) &&
                r.compareRange(a, f, t.active, n.active),
              h && f < o && (i || t.openEnd(c) != n.openEnd(c)) && (e = !0)),
          c > o)
        )
          break;
        ((a = c), s <= 0 && t.next(), s >= 0 && n.next());
      }
    }
    function K(t, e) {
      if (t.length != e.length) return !1;
      for (let n = 0; n < t.length; n++)
        if (t[n] != e[n] && !q(t[n], e[n])) return !1;
      return !0;
    }
    function G(t, e) {
      for (let n = e, i = t.length - 1; n < i; n++) t[n] = t[n + 1];
      t.pop();
    }
    function Y(t, e, n) {
      for (let n = t.length - 1; n >= e; n--) t[n + 1] = t[n];
      t[e] = n;
    }
    function Q(t, e) {
      let n = -1,
        i = 1e9;
      for (let s = 0; s < e.length; s++)
        0 > (e[s] - i || t[s].endSide - t[n].endSide) && ((n = s), (i = e[s]));
      return n;
    }
    function X(t, e, n = t.length) {
      let i = 0;
      for (let s = 0; s < n && s < t.length;)
        9 == t.charCodeAt(s) ? ((i += e - (i % e)), s++) : (i++, (s = h(t, s)));
      return i;
    }
    function tt(t, e, n, i) {
      for (let i = 0, s = 0; ;) {
        if (s >= e) return i;
        if (i == t.length) break;
        ((s += 9 == t.charCodeAt(i) ? n - (s % n) : 1), (i = h(t, i)));
      }
      return !0 === i ? -1 : t.length;
    }
    n.d(
      e,
      {
        $t: () => EditorState,
        EY: () => Text,
        FB: () => RangeValue,
        Fh: () => u,
        Gu: () => ChangeDesc,
        Je: () => z,
        MK: () => f,
        OF: () => EditorSelection,
        Pe: () => StateEffect,
        QR: () => j,
        VR: () => ChangeSet,
        YH: () => Annotation,
        ZX: () => Transaction,
        iR: () => g,
        kn: () => tt,
        om: () => RangeSet,
        sU: () => StateField,
        sj: () => Facet,
        vB: () => RangeSetBuilder,
        vS: () => c,
        y$: () => X,
        zK: () => h
      },
      { Nb: I }
    );
  },
  85109(t, e, n) {
    var i = n(1371),
      s = n(15874),
      r = n(43720);
    let o = '#e06c75',
      a = '#abb2bf',
      l = '#7d8799',
      h = '#d19a66',
      c = '#2c313a',
      f = '#282c34',
      u = '#353a42',
      d = '#528bff',
      g = i.Lz.theme(
        {
          '&': { color: a, backgroundColor: f },
          '.cm-content': { caretColor: d },
          '.cm-cursor, .cm-dropCursor': { borderLeftColor: d },
          '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
            { backgroundColor: '#3E4451' },
          '.cm-panels': { backgroundColor: '#21252b', color: a },
          '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
          '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },
          '.cm-searchMatch': {
            backgroundColor: '#72a1ff59',
            outline: '1px solid #457dff'
          },
          '.cm-searchMatch.cm-searchMatch-selected': {
            backgroundColor: '#6199ff2f'
          },
          '.cm-activeLine': { backgroundColor: '#6699ff0b' },
          '.cm-selectionMatch': { backgroundColor: '#aafe661a' },
          '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket':
            { backgroundColor: '#bad0f847' },
          '.cm-gutters': { backgroundColor: f, color: l, border: 'none' },
          '.cm-activeLineGutter': { backgroundColor: c },
          '.cm-foldPlaceholder': {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#ddd'
          },
          '.cm-tooltip': { border: 'none', backgroundColor: u },
          '.cm-tooltip .cm-tooltip-arrow:before': {
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent'
          },
          '.cm-tooltip .cm-tooltip-arrow:after': {
            borderTopColor: u,
            borderBottomColor: u
          },
          '.cm-tooltip-autocomplete': {
            '& > ul > li[aria-selected]': { backgroundColor: c, color: a }
          }
        },
        { dark: !0 }
      ),
      m = s.cr.define([
        { tag: r._A.keyword, color: '#c678dd' },
        {
          tag: [
            r._A.name,
            r._A.deleted,
            r._A.character,
            r._A.propertyName,
            r._A.macroName
          ],
          color: o
        },
        {
          tag: [r._A.function(r._A.variableName), r._A.labelName],
          color: '#61afef'
        },
        {
          tag: [r._A.color, r._A.constant(r._A.name), r._A.standard(r._A.name)],
          color: h
        },
        { tag: [r._A.definition(r._A.name), r._A.separator], color: a },
        {
          tag: [
            r._A.typeName,
            r._A.className,
            r._A.number,
            r._A.changed,
            r._A.annotation,
            r._A.modifier,
            r._A.self,
            r._A.namespace
          ],
          color: '#e5c07b'
        },
        {
          tag: [
            r._A.operator,
            r._A.operatorKeyword,
            r._A.url,
            r._A.escape,
            r._A.regexp,
            r._A.link,
            r._A.special(r._A.string)
          ],
          color: '#56b6c2'
        },
        { tag: [r._A.meta, r._A.comment], color: l },
        { tag: r._A.strong, fontWeight: 'bold' },
        { tag: r._A.emphasis, fontStyle: 'italic' },
        { tag: r._A.strikethrough, textDecoration: 'line-through' },
        { tag: r._A.link, color: l, textDecoration: 'underline' },
        { tag: r._A.heading, fontWeight: 'bold', color: o },
        {
          tag: [r._A.atom, r._A.bool, r._A.special(r._A.variableName)],
          color: h
        },
        {
          tag: [r._A.processingInstruction, r._A.string, r._A.inserted],
          color: '#98c379'
        },
        { tag: r._A.invalid, color: '#ffffff' }
      ]),
      p = [g, (0, s.y9)(m)];
    n.d(e, {}, { bM: p });
  }
};
//# sourceMappingURL=3649.d948918045d25776.js.map
