export const __rspack_esm_id = 749;
export const __rspack_esm_ids = [749];
export const __webpack_modules__ = {
  47404(e, t, n) {
    var o = n(6585),
      i = n(1371),
      r = n(15874);
    let CompletionContext = class CompletionContext {
      constructor(e, t, n, o) {
        ((this.state = e),
          (this.pos = t),
          (this.explicit = n),
          (this.view = o),
          (this.abortListeners = []),
          (this.abortOnDocChange = !1));
      }
      tokenBefore(e) {
        let t = (0, r.mv)(this.state).resolveInner(this.pos, -1);
        for (; t && 0 > e.indexOf(t.name);) t = t.parent;
        return t
          ? {
              from: t.from,
              to: this.pos,
              text: this.state.sliceDoc(t.from, this.pos),
              type: t.type
            }
          : null;
      }
      matchBefore(e) {
        let t = this.state.doc.lineAt(this.pos),
          n = Math.max(t.from, this.pos - 250),
          o = t.text.slice(n - t.from, this.pos - t.from),
          i = o.search(h(e, !1));
        return i < 0 ? null : { from: n + i, to: this.pos, text: o.slice(i) };
      }
      get aborted() {
        return null == this.abortListeners;
      }
      addEventListener(e, t, n) {
        'abort' == e &&
          this.abortListeners &&
          (this.abortListeners.push(t),
          n && n.onDocChange && (this.abortOnDocChange = !0));
      }
    };
    function s(e) {
      let t = Object.keys(e).join(''),
        n = /\w/.test(t);
      return (
        n && (t = t.replace(/\w/g, '')),
        `[${n ? '\\w' : ''}${t.replace(/[^\w\s]/g, '\\$&')}]`
      );
    }
    function l(e) {
      let t = e.map(e => ('string' == typeof e ? { label: e } : e)),
        [n, o] = t.every(e => /^\w+$/.test(e.label))
          ? [/\w*$/, /\w+$/]
          : (function (e) {
              let t = Object.create(null),
                n = Object.create(null);
              for (let { label: o } of e) {
                t[o[0]] = !0;
                for (let e = 1; e < o.length; e++) n[o[e]] = !0;
              }
              let o = s(t) + s(n) + '*$';
              return [RegExp('^' + o), new RegExp(o)];
            })(t);
      return e => {
        let i = e.matchBefore(o);
        return i || e.explicit
          ? { from: i ? i.from : e.pos, options: t, validFor: n }
          : null;
      };
    }
    function a(e, t) {
      return n => {
        for (
          let t = (0, r.mv)(n.state).resolveInner(n.pos, -1);
          t;
          t = t.parent
        ) {
          if (e.indexOf(t.name) > -1) return null;
          if (t.type.isTop) break;
        }
        return t(n);
      };
    }
    let Option = class Option {
      constructor(e, t, n, o) {
        ((this.completion = e),
          (this.source = t),
          (this.match = n),
          (this.score = o));
      }
    };
    function c(e) {
      return e.selection.main.from;
    }
    function h(e, t) {
      var n;
      let { source: o } = e,
        i = t && '^' != o[0],
        r = '$' != o[o.length - 1];
      return i || r
        ? RegExp(
            `${i ? '^' : ''}(?:${o})${r ? '$' : ''}`,
            null != (n = e.flags) ? n : e.ignoreCase ? 'i' : ''
          )
        : e;
    }
    let f = o.YH.define(),
      u = new WeakMap();
    function p(e) {
      if (!Array.isArray(e)) return e;
      let t = u.get(e);
      return (t || u.set(e, (t = l(e))), t);
    }
    let d = o.Pe.define(),
      m = o.Pe.define();
    let FuzzyMatcher = class FuzzyMatcher {
      constructor(e) {
        ((this.pattern = e),
          (this.chars = []),
          (this.folded = []),
          (this.any = []),
          (this.precise = []),
          (this.byWord = []),
          (this.score = 0),
          (this.matched = []));
        for (let t = 0; t < e.length;) {
          let n = (0, o.vS)(e, t),
            i = (0, o.Fh)(n);
          this.chars.push(n);
          let r = e.slice(t, t + i),
            s = r.toUpperCase();
          (this.folded.push((0, o.vS)(s == r ? r.toLowerCase() : s, 0)),
            (t += i));
        }
        this.astral = e.length != this.chars.length;
      }
      ret(e, t) {
        return ((this.score = e), (this.matched = t), this);
      }
      match(e) {
        if (0 == this.pattern.length) return this.ret(-100, []);
        if (e.length < this.pattern.length) return null;
        let { chars: t, folded: n, any: i, precise: r, byWord: s } = this;
        if (1 == t.length) {
          let i = (0, o.vS)(e, 0),
            r = (0, o.Fh)(i),
            s = r == e.length ? 0 : -100;
          if (i == t[0]);
          else {
            if (i != n[0]) return null;
            s += -200;
          }
          return this.ret(s, [0, r]);
        }
        let l = e.indexOf(this.pattern);
        if (0 == l)
          return this.ret(e.length == this.pattern.length ? 0 : -100, [
            0,
            this.pattern.length
          ]);
        let a = t.length,
          c = 0;
        if (l < 0) {
          for (let r = 0, s = Math.min(e.length, 200); r < s && c < a;) {
            let s = (0, o.vS)(e, r);
            ((s == t[c] || s == n[c]) && (i[c++] = r), (r += (0, o.Fh)(s)));
          }
          if (c < a) return null;
        }
        let h = 0,
          f = 0,
          u = !1,
          p = 0,
          d = -1,
          m = -1,
          g = /[a-z]/.test(e),
          v = !0;
        for (let i = 0, c = Math.min(e.length, 200), y = 0; i < c && f < a;) {
          let c = (0, o.vS)(e, i);
          l < 0 &&
            (h < a && c == t[h] && (r[h++] = i),
            p < a &&
              (c == t[p] || c == n[p]
                ? (0 == p && (d = i), (m = i + 1), p++)
                : (p = 0)));
          let w,
            b =
              c < 255
                ? (c >= 48 && c <= 57) || (c >= 97 && c <= 122)
                  ? 2
                  : +(c >= 65 && c <= 90)
                : (w = (0, o.MK)(c)) != w.toLowerCase()
                  ? 1
                  : 2 * (w != w.toUpperCase());
          ((!i || (1 == b && g) || (0 == y && 0 != b)) &&
            (t[f] == c || (n[f] == c && (u = !0))
              ? (s[f++] = i)
              : s.length && (v = !1)),
            (y = b),
            (i += (0, o.Fh)(c)));
        }
        return f == a && 0 == s[0] && v
          ? this.result(-100 + (u ? -200 : 0), s, e)
          : p == a && 0 == d
            ? this.ret(-200 - e.length + (m == e.length ? 0 : -100), [0, m])
            : l > -1
              ? this.ret(-700 - e.length, [l, l + this.pattern.length])
              : p == a
                ? this.ret(-900 - e.length, [d, m])
                : f == a
                  ? this.result(
                      -100 + (u ? -200 : 0) + -700 + (v ? 0 : -1100),
                      s,
                      e
                    )
                  : 2 == t.length
                    ? null
                    : this.result((i[0] ? -700 : 0) + -200 + -1100, i, e);
      }
      result(e, t, n) {
        let i = [],
          r = 0;
        for (let e of t) {
          let t = e + (this.astral ? (0, o.Fh)((0, o.vS)(n, e)) : 1);
          r && i[r - 1] == e ? (i[r - 1] = t) : ((i[r++] = e), (i[r++] = t));
        }
        return this.ret(e - n.length, i);
      }
    };
    let StrictMatcher = class StrictMatcher {
      constructor(e) {
        ((this.pattern = e),
          (this.matched = []),
          (this.score = 0),
          (this.folded = e.toLowerCase()));
      }
      match(e) {
        if (e.length < this.pattern.length) return null;
        let t = e.slice(0, this.pattern.length),
          n =
            t == this.pattern
              ? 0
              : t.toLowerCase() == this.folded
                ? -200
                : null;
        return null == n
          ? null
          : ((this.matched = [0, t.length]),
            (this.score = n + (e.length == this.pattern.length ? 0 : -100)),
            this);
      }
    };
    let g = o.sj.define({
      combine: e =>
        (0, o.QR)(
          e,
          {
            activateOnTyping: !0,
            activateOnCompletion: () => !1,
            activateOnTypingDelay: 100,
            selectOnOpen: !0,
            override: null,
            closeOnBlur: !0,
            maxRenderedOptions: 100,
            defaultKeymap: !0,
            tooltipClass: () => '',
            optionClass: () => '',
            aboveCursor: !1,
            icons: !0,
            addToOptions: [],
            positionInfo: y,
            filterStrict: !1,
            compareCompletions: (e, t) =>
              (e.sortText || e.label).localeCompare(t.sortText || t.label),
            interactionDelay: 75,
            updateSyncTime: 100
          },
          {
            defaultKeymap: (e, t) => e && t,
            closeOnBlur: (e, t) => e && t,
            icons: (e, t) => e && t,
            tooltipClass: (e, t) => n => v(e(n), t(n)),
            optionClass: (e, t) => n => v(e(n), t(n)),
            addToOptions: (e, t) => e.concat(t),
            filterStrict: (e, t) => e || t
          }
        )
    });
    function v(e, t) {
      return e ? (t ? e + ' ' + t : e) : t;
    }
    function y(e, t, n, o, r, s) {
      let l = e.textDirection == i.OP.RTL,
        a = l,
        c = !1,
        h = 'top',
        f,
        u,
        p = t.left - r.left,
        d = r.right - t.right,
        m = o.right - o.left,
        g = o.bottom - o.top;
      if (
        (a && p < Math.min(m, d)
          ? (a = !1)
          : !a && d < Math.min(m, p) && (a = !0),
        m <= (a ? p : d))
      )
        ((f = Math.max(r.top, Math.min(n.top, r.bottom - g)) - t.top),
          (u = Math.min(400, a ? p : d)));
      else {
        ((c = !0), (u = Math.min(400, (l ? t.right : r.right - t.left) - 30)));
        let e = r.bottom - t.bottom;
        e >= g || e > t.top
          ? (f = n.bottom - t.top)
          : ((h = 'bottom'), (f = t.bottom - n.top));
      }
      let v = (t.bottom - t.top) / s.offsetHeight,
        y = (t.right - t.left) / s.offsetWidth;
      return {
        style: `${h}: ${f / v}px; max-width: ${u / y}px`,
        class:
          'cm-completionInfo-' +
          (c ? (l ? 'left-narrow' : 'right-narrow') : a ? 'left' : 'right')
      };
    }
    let w = o.Pe.define();
    function b(e, t, n) {
      if (e <= n) return { from: 0, to: e };
      if ((t < 0 && (t = 0), t <= e >> 1)) {
        let e = Math.floor(t / n);
        return { from: e * n, to: (e + 1) * n };
      }
      let o = Math.ceil((e - t) / n);
      return { from: e - o * n, to: e - (o - 1) * n };
    }
    let CompletionTooltip = class CompletionTooltip {
      constructor(e, t, n) {
        let o;
        ((this.view = e),
          (this.stateField = t),
          (this.applyCompletion = n),
          (this.info = null),
          (this.infoDestroy = null),
          (this.placeInfoReq = {
            read: () => this.measureInfo(),
            write: e => this.placeInfo(e),
            key: this
          }),
          (this.space = null),
          (this.currentClass = ''));
        let i = e.state.field(t),
          { options: r, selected: s } = i.open,
          l = e.state.facet(g);
        ((this.optionContent =
          ((o = l.addToOptions.slice()),
          l.icons &&
            o.push({
              render(e) {
                let t = document.createElement('div');
                return (
                  t.classList.add('cm-completionIcon'),
                  e.type &&
                    t.classList.add(
                      ...e.type.split(/\s+/g).map(e => 'cm-completionIcon-' + e)
                    ),
                  t.setAttribute('aria-hidden', 'true'),
                  t
                );
              },
              position: 20
            }),
          o.push(
            {
              render(e, t, n, o) {
                let i = document.createElement('span');
                i.className = 'cm-completionLabel';
                let r = e.displayLabel || e.label,
                  s = 0;
                for (let e = 0; e < o.length;) {
                  let t = o[e++],
                    n = o[e++];
                  t > s &&
                    i.appendChild(document.createTextNode(r.slice(s, t)));
                  let l = i.appendChild(document.createElement('span'));
                  (l.appendChild(document.createTextNode(r.slice(t, n))),
                    (l.className = 'cm-completionMatchedText'),
                    (s = n));
                }
                return (
                  s < r.length &&
                    i.appendChild(document.createTextNode(r.slice(s))),
                  i
                );
              },
              position: 50
            },
            {
              render(e) {
                if (!e.detail) return null;
                let t = document.createElement('span');
                return (
                  (t.className = 'cm-completionDetail'),
                  (t.textContent = e.detail),
                  t
                );
              },
              position: 80
            }
          ),
          o.sort((e, t) => e.position - t.position).map(e => e.render))),
          (this.optionClass = l.optionClass),
          (this.tooltipClass = l.tooltipClass),
          (this.range = b(r.length, s, l.maxRenderedOptions)),
          (this.dom = document.createElement('div')),
          (this.dom.className = 'cm-tooltip-autocomplete'),
          this.updateTooltipClass(e.state),
          this.dom.addEventListener('mousedown', n => {
            let { options: o } = e.state.field(t).open;
            for (let t = n.target, i; t && t != this.dom; t = t.parentNode)
              if (
                'LI' == t.nodeName &&
                (i = /-(\d+)$/.exec(t.id)) &&
                +i[1] < o.length
              ) {
                (this.applyCompletion(e, o[+i[1]]), n.preventDefault());
                return;
              }
            if (n.target == this.list) {
              let t =
                this.list.classList.contains(
                  'cm-completionListIncompleteTop'
                ) &&
                n.clientY < this.list.firstChild.getBoundingClientRect().top
                  ? this.range.from - 1
                  : this.list.classList.contains(
                        'cm-completionListIncompleteBottom'
                      ) &&
                      n.clientY >
                        this.list.lastChild.getBoundingClientRect().bottom
                    ? this.range.to
                    : null;
              null != t &&
                (e.dispatch({ effects: w.of(t) }), n.preventDefault());
            }
          }),
          this.dom.addEventListener('focusout', t => {
            let n = e.state.field(this.stateField, !1);
            n &&
              n.tooltip &&
              e.state.facet(g).closeOnBlur &&
              t.relatedTarget != e.contentDOM &&
              e.dispatch({ effects: m.of(null) });
          }),
          this.showOptions(r, i.id));
      }
      mount() {
        this.updateSel();
      }
      showOptions(e, t) {
        (this.list && this.list.remove(),
          (this.list = this.dom.appendChild(
            this.createListBox(e, t, this.range)
          )),
          this.list.addEventListener('scroll', () => {
            this.info && this.view.requestMeasure(this.placeInfoReq);
          }));
      }
      update(e) {
        var t;
        let n = e.state.field(this.stateField),
          o = e.startState.field(this.stateField);
        if ((this.updateTooltipClass(e.state), n != o)) {
          let { options: i, selected: r, disabled: s } = n.open;
          ((o.open && o.open.options == i) ||
            ((this.range = b(i.length, r, e.state.facet(g).maxRenderedOptions)),
            this.showOptions(i, n.id)),
            this.updateSel(),
            s != (null == (t = o.open) ? void 0 : t.disabled) &&
              this.dom.classList.toggle(
                'cm-tooltip-autocomplete-disabled',
                !!s
              ));
        }
      }
      updateTooltipClass(e) {
        let t = this.tooltipClass(e);
        if (t != this.currentClass) {
          for (let e of this.currentClass.split(' '))
            e && this.dom.classList.remove(e);
          for (let e of t.split(' ')) e && this.dom.classList.add(e);
          this.currentClass = t;
        }
      }
      positioned(e) {
        ((this.space = e),
          this.info && this.view.requestMeasure(this.placeInfoReq));
      }
      updateSel() {
        let e = this.view.state.field(this.stateField),
          t = e.open;
        ((t.selected > -1 && t.selected < this.range.from) ||
          t.selected >= this.range.to) &&
          ((this.range = b(
            t.options.length,
            t.selected,
            this.view.state.facet(g).maxRenderedOptions
          )),
          this.showOptions(t.options, e.id));
        let n = this.updateSelectedOption(t.selected);
        if (n) {
          this.destroyInfo();
          let { completion: o } = t.options[t.selected],
            { info: r } = o;
          if (!r) return;
          let s = 'string' == typeof r ? document.createTextNode(r) : r(o);
          if (!s) return;
          'then' in s
            ? s
                .then(t => {
                  t &&
                    this.view.state.field(this.stateField, !1) == e &&
                    this.addInfoPane(t, o);
                })
                .catch(e => (0, i.c_)(this.view.state, e, 'completion info'))
            : (this.addInfoPane(s, o),
              n.setAttribute('aria-describedby', this.info.id));
        }
      }
      addInfoPane(e, t) {
        this.destroyInfo();
        let n = (this.info = document.createElement('div'));
        if (
          ((n.className = 'cm-tooltip cm-completionInfo'),
          (n.id =
            'cm-completionInfo-' +
            Math.floor(65535 * Math.random()).toString(16)),
          null != e.nodeType)
        )
          (n.appendChild(e), (this.infoDestroy = null));
        else {
          let { dom: t, destroy: o } = e;
          (n.appendChild(t), (this.infoDestroy = o || null));
        }
        (this.dom.appendChild(n), this.view.requestMeasure(this.placeInfoReq));
      }
      updateSelectedOption(e) {
        var t, n;
        let o,
          i,
          r,
          s = null;
        for (
          let t = this.list.firstChild, n = this.range.from;
          t;
          t = t.nextSibling, n++
        )
          'LI' == t.nodeName && t.id
            ? n == e
              ? t.hasAttribute('aria-selected') ||
                (t.setAttribute('aria-selected', 'true'), (s = t))
              : t.hasAttribute('aria-selected') &&
                (t.removeAttribute('aria-selected'),
                t.removeAttribute('aria-describedby'))
            : n--;
        return (
          s &&
            ((t = this.list),
            (n = s),
            (o = t.getBoundingClientRect()),
            (i = n.getBoundingClientRect()),
            (r = o.height / t.offsetHeight),
            i.top < o.top
              ? (t.scrollTop -= (o.top - i.top) / r)
              : i.bottom > o.bottom &&
                (t.scrollTop += (i.bottom - o.bottom) / r)),
          s
        );
      }
      measureInfo() {
        let e = this.dom.querySelector('[aria-selected]');
        if (!e || !this.info) return null;
        let t = this.dom.getBoundingClientRect(),
          n = this.info.getBoundingClientRect(),
          o = e.getBoundingClientRect(),
          i = this.space;
        if (!i) {
          let e = this.dom.ownerDocument.documentElement;
          i = { left: 0, top: 0, right: e.clientWidth, bottom: e.clientHeight };
        }
        return o.top > Math.min(i.bottom, t.bottom) - 10 ||
          o.bottom < Math.max(i.top, t.top) + 10
          ? null
          : this.view.state
              .facet(g)
              .positionInfo(this.view, t, o, n, i, this.dom);
      }
      placeInfo(e) {
        this.info &&
          (e
            ? (e.style && (this.info.style.cssText = e.style),
              (this.info.className =
                'cm-tooltip cm-completionInfo ' + (e.class || '')))
            : (this.info.style.cssText = 'top: -1e6px'));
      }
      createListBox(e, t, n) {
        let o = document.createElement('ul');
        ((o.id = t),
          o.setAttribute('role', 'listbox'),
          o.setAttribute('aria-expanded', 'true'),
          o.setAttribute('aria-label', this.view.state.phrase('Completions')),
          o.addEventListener('mousedown', e => {
            e.target == o && e.preventDefault();
          }));
        let i = null;
        for (let r = n.from; r < n.to; r++) {
          let { completion: s, match: l } = e[r],
            { section: a } = s;
          if (a) {
            let e = 'string' == typeof a ? a : a.name;
            e != i &&
              (r > n.from || 0 == n.from) &&
              ((i = e),
              'string' != typeof a && a.header
                ? o.appendChild(a.header(a))
                : (o.appendChild(
                    document.createElement('completion-section')
                  ).textContent = e));
          }
          let c = o.appendChild(document.createElement('li'));
          ((c.id = t + '-' + r), c.setAttribute('role', 'option'));
          let h = this.optionClass(s);
          for (let e of (h && (c.className = h), this.optionContent)) {
            let t = e(s, this.view.state, this.view, l);
            t && c.appendChild(t);
          }
        }
        return (
          n.from && o.classList.add('cm-completionListIncompleteTop'),
          n.to < e.length &&
            o.classList.add('cm-completionListIncompleteBottom'),
          o
        );
      }
      destroyInfo() {
        this.info &&
          (this.infoDestroy && this.infoDestroy(),
          this.info.remove(),
          (this.info = null));
      }
      destroy() {
        this.destroyInfo();
      }
    };
    function A(e) {
      return 100 * (e.boost || 0) + 10 * !!e.apply + 5 * !!e.info + +!!e.type;
    }
    let CompletionDialog = class CompletionDialog {
      constructor(e, t, n, o, i, r) {
        ((this.options = e),
          (this.attrs = t),
          (this.tooltip = n),
          (this.timestamp = o),
          (this.selected = i),
          (this.disabled = r));
      }
      setSelected(e, t) {
        return e == this.selected || e >= this.options.length
          ? this
          : new CompletionDialog(
              this.options,
              S(t, e),
              this.tooltip,
              this.timestamp,
              e,
              this.disabled
            );
      }
      static build(e, t, n, o, i, r) {
        if (o && !r && e.some(e => e.isPending)) return o.setDisabled();
        let s = (function (e, t) {
          let n = [],
            o = null,
            i = null,
            r = e => {
              n.push(e);
              let { section: t } = e.completion;
              if (t) {
                o || (o = []);
                let e = 'string' == typeof t ? t : t.name;
                o.some(t => t.name == e) ||
                  o.push('string' == typeof t ? { name: e } : t);
              }
            },
            s = t.facet(g);
          for (let o of e)
            if (o.hasResult()) {
              let e = o.result.getMatch;
              if (!1 === o.result.filter)
                for (let t of o.result.options)
                  r(new Option(t, o.source, e ? e(t) : [], 1e9 - n.length));
              else {
                let n = t.sliceDoc(o.from, o.to),
                  l,
                  a = s.filterStrict
                    ? new StrictMatcher(n)
                    : new FuzzyMatcher(n);
                for (let t of o.result.options)
                  if ((l = a.match(t.label))) {
                    let n = t.displayLabel
                        ? e
                          ? e(t, l.matched)
                          : []
                        : l.matched,
                      s = l.score + (t.boost || 0);
                    if (
                      (r(new Option(t, o.source, n, s)),
                      'object' == typeof t.section &&
                        'dynamic' === t.section.rank)
                    ) {
                      let { name: e } = t.section;
                      (i || (i = Object.create(null)),
                        (i[e] = Math.max(s, i[e] || -1e9)));
                    }
                  }
              }
            }
          if (o) {
            let e = Object.create(null),
              t = 0;
            for (let n of o.sort(
              (e, t) =>
                ('dynamic' === e.rank && 'dynamic' === t.rank
                  ? i[t.name] - i[e.name]
                  : 0) ||
                ('number' == typeof e.rank ? e.rank : 1e9) -
                  ('number' == typeof t.rank ? t.rank : 1e9) ||
                (e.name < t.name ? -1 : 1)
            ))
              ((t -= 1e5), (e[n.name] = t));
            for (let t of n) {
              let { section: n } = t.completion;
              n && (t.score += e['string' == typeof n ? n : n.name]);
            }
          }
          let l = [],
            a = null,
            c = s.compareCompletions;
          for (let e of n.sort(
            (e, t) => t.score - e.score || c(e.completion, t.completion)
          )) {
            let t = e.completion;
            (a &&
            a.label == t.label &&
            a.detail == t.detail &&
            (null == a.type || null == t.type || a.type == t.type) &&
            a.apply == t.apply &&
            a.boost == t.boost
              ? A(e.completion) > A(a) && (l[l.length - 1] = e)
              : l.push(e),
              (a = e.completion));
          }
          return l;
        })(e, t);
        if (!s.length)
          return o && e.some(e => e.isPending) ? o.setDisabled() : null;
        let l = t.facet(g).selectOnOpen ? 0 : -1;
        if (o && o.selected != l && -1 != o.selected) {
          let e = o.options[o.selected].completion;
          for (let t = 0; t < s.length; t++)
            if (s[t].completion == e) {
              l = t;
              break;
            }
        }
        return new CompletionDialog(
          s,
          S(n, l),
          {
            pos: e.reduce(
              (e, t) => (t.hasResult() ? Math.min(e, t.from) : e),
              1e8
            ),
            create: E,
            above: i.aboveCursor
          },
          o ? o.timestamp : Date.now(),
          l,
          !1
        );
      }
      map(e) {
        return new CompletionDialog(
          this.options,
          this.attrs,
          { ...this.tooltip, pos: e.mapPos(this.tooltip.pos) },
          this.timestamp,
          this.selected,
          this.disabled
        );
      }
      setDisabled() {
        return new CompletionDialog(
          this.options,
          this.attrs,
          this.tooltip,
          this.timestamp,
          this.selected,
          !0
        );
      }
    };
    let CompletionState = class CompletionState {
      constructor(e, t, n) {
        ((this.active = e), (this.id = t), (this.open = n));
      }
      static start() {
        return new CompletionState(
          C,
          'cm-ac-' + Math.floor(2e6 * Math.random()).toString(36),
          null
        );
      }
      update(e) {
        let { state: t } = e,
          n = t.facet(g),
          o = (n.override || t.languageDataAt('autocomplete', c(t)).map(p)).map(
            t =>
              (
                this.active.find(e => e.source == t) ||
                new ActiveSource(t, +!!this.active.some(e => 0 != e.state))
              ).update(e, n)
          );
        o.length == this.active.length &&
          o.every((e, t) => e == this.active[t]) &&
          (o = this.active);
        let i = this.open,
          r = e.effects.some(e => e.is(D));
        for (let s of (i && e.docChanged && (i = i.map(e.changes)),
        e.selection ||
        o.some(t => t.hasResult() && e.changes.touchesRange(t.from, t.to)) ||
        !(function (e, t) {
          if (e == t) return !0;
          for (let n = 0, o = 0; ;) {
            for (; n < e.length && !e[n].hasResult();) n++;
            for (; o < t.length && !t[o].hasResult();) o++;
            let i = n == e.length,
              r = o == t.length;
            if (i || r) return i == r;
            if (e[n++].result != t[o++].result) return !1;
          }
        })(o, this.active) ||
        r
          ? (i = CompletionDialog.build(o, t, this.id, i, n, r))
          : i && i.disabled && !o.some(e => e.isPending) && (i = null),
        !i &&
          o.every(e => !e.isPending) &&
          o.some(e => e.hasResult()) &&
          (o = o.map(e => (e.hasResult() ? new ActiveSource(e.source, 0) : e))),
        e.effects))
          s.is(w) && (i = i && i.setSelected(s.value, this.id));
        return o == this.active && i == this.open
          ? this
          : new CompletionState(o, this.id, i);
      }
      get tooltip() {
        return this.open ? this.open.tooltip : null;
      }
      get attrs() {
        return this.open ? this.open.attrs : this.active.length ? x : k;
      }
    };
    let x = { 'aria-autocomplete': 'list' },
      k = {};
    function S(e, t) {
      let n = {
        'aria-autocomplete': 'list',
        'aria-haspopup': 'listbox',
        'aria-controls': e
      };
      return (t > -1 && (n['aria-activedescendant'] = e + '-' + t), n);
    }
    let C = [];
    function O(e, t) {
      if (e.isUserEvent('input.complete')) {
        let n = e.annotation(f);
        if (n && t.activateOnCompletion(n)) return 12;
      }
      let n = e.isUserEvent('input.type');
      return n && t.activateOnTyping
        ? 5
        : n
          ? 1
          : e.isUserEvent('delete.backward')
            ? 2
            : e.selection
              ? 8
              : 16 * !!e.docChanged;
    }
    let ActiveSource = class ActiveSource {
      constructor(e, t, n = !1) {
        ((this.source = e), (this.state = t), (this.explicit = n));
      }
      hasResult() {
        return !1;
      }
      get isPending() {
        return 1 == this.state;
      }
      update(e, t) {
        let n = O(e, t),
          o = this;
        for (let t of ((8 & n || (16 & n && this.touches(e))) &&
          (o = new ActiveSource(o.source, 0)),
        4 & n && 0 == o.state && (o = new ActiveSource(this.source, 1)),
        (o = o.updateFor(e, n)),
        e.effects))
          if (t.is(d)) o = new ActiveSource(o.source, 1, t.value);
          else if (t.is(m)) o = new ActiveSource(o.source, 0);
          else if (t.is(D))
            for (let e of t.value) e.source == o.source && (o = e);
        return o;
      }
      updateFor(e, t) {
        return this.map(e.changes);
      }
      map(e) {
        return this;
      }
      touches(e) {
        return e.changes.touchesRange(c(e.state));
      }
    };
    let ActiveResult = class ActiveResult extends ActiveSource {
      constructor(e, t, n, o, i, r) {
        (super(e, 3, t),
          (this.limit = n),
          (this.result = o),
          (this.from = i),
          (this.to = r));
      }
      hasResult() {
        return !0;
      }
      updateFor(e, t) {
        var n;
        if (!(3 & t)) return this.map(e.changes);
        let o = this.result;
        o.map && !e.changes.empty && (o = o.map(o, e.changes));
        let i = e.changes.mapPos(this.from),
          r = e.changes.mapPos(this.to, 1),
          s = c(e.state);
        if (
          s > r ||
          !o ||
          (2 & t && (c(e.startState) == this.from || s < this.limit))
        )
          return new ActiveSource(this.source, 4 & t ? 1 : 0);
        let l = e.changes.mapPos(this.limit);
        return !(function (e, t, n, o) {
          if (!e) return !1;
          let i = t.sliceDoc(n, o);
          return 'function' == typeof e ? e(i, n, o, t) : h(e, !0).test(i);
        })(o.validFor, e.state, i, r)
          ? o.update &&
            (o = o.update(o, i, r, new CompletionContext(e.state, s, !1)))
            ? new ActiveResult(
                this.source,
                this.explicit,
                l,
                o,
                o.from,
                null != (n = o.to) ? n : c(e.state)
              )
            : new ActiveSource(this.source, 1, this.explicit)
          : new ActiveResult(this.source, this.explicit, l, o, i, r);
      }
      map(e) {
        if (e.empty) return this;
        let t = this.result.map ? this.result.map(this.result, e) : this.result;
        return t
          ? new ActiveResult(
              this.source,
              this.explicit,
              e.mapPos(this.limit),
              t,
              e.mapPos(this.from),
              e.mapPos(this.to, 1)
            )
          : new ActiveSource(this.source, 0);
      }
      touches(e) {
        return e.changes.touchesRange(this.from, this.to);
      }
    };
    let D = o.Pe.define({ map: (e, t) => e.map(e => e.map(t)) }),
      I = o.sU.define({
        create: () => CompletionState.start(),
        update: (e, t) => e.update(t),
        provide: e => [
          i.DK.from(e, e => e.tooltip),
          i.Lz.contentAttributes.from(e, e => e.attrs)
        ]
      });
    function M(e, t) {
      let n = t.completion.apply || t.completion.label,
        i = e.state.field(I).active.find(e => e.source == t.source);
      return (
        i instanceof ActiveResult &&
        ('string' == typeof n
          ? e.dispatch({
              ...(function (e, t, n, i) {
                let { main: r } = e.selection,
                  s = n - r.from,
                  l = i - r.from;
                return {
                  ...e.changeByRange(a => {
                    if (
                      a != r &&
                      n != i &&
                      e.sliceDoc(a.from + s, a.from + l) != e.sliceDoc(n, i)
                    )
                      return { range: a };
                    let c = e.toText(t);
                    return {
                      changes: {
                        from: a.from + s,
                        to: i == r.from ? a.to : a.from + l,
                        insert: c
                      },
                      range: o.OF.cursor(a.from + s + c.length)
                    };
                  }),
                  scrollIntoView: !0,
                  userEvent: 'input.complete'
                };
              })(e.state, n, i.from, i.to),
              annotations: f.of(t.completion)
            })
          : n(e, t.completion, i.from, i.to),
        !0)
      );
    }
    let E = e => new CompletionTooltip(e, I, M);
    function F(e, t = 'option') {
      return n => {
        let o = n.state.field(I, !1);
        if (
          !o ||
          !o.open ||
          o.open.disabled ||
          Date.now() - o.open.timestamp < n.state.facet(g).interactionDelay
        )
          return !1;
        let r = 1,
          s;
        'page' == t &&
          (s = (0, i.Eg)(n, o.open.tooltip)) &&
          (r = Math.max(
            2,
            Math.floor(
              s.dom.offsetHeight / s.dom.querySelector('li').offsetHeight
            ) - 1
          ));
        let { length: l } = o.open.options,
          a =
            o.open.selected > -1
              ? o.open.selected + r * (e ? 1 : -1)
              : e
                ? 0
                : l - 1;
        return (
          a < 0
            ? (a = 'page' == t ? 0 : l - 1)
            : a >= l && (a = 'page' == t ? l - 1 : 0),
          n.dispatch({ effects: w.of(a) }),
          !0
        );
      };
    }
    let R = e =>
      !!e.state.field(I, !1) && (e.dispatch({ effects: d.of(!0) }), !0);
    let RunningQuery = class RunningQuery {
      constructor(e, t) {
        ((this.active = e),
          (this.context = t),
          (this.time = Date.now()),
          (this.updates = []),
          (this.done = void 0));
      }
    };
    let T = i.Z9.fromClass(
        class {
          constructor(e) {
            for (let t of ((this.view = e),
            (this.debounceUpdate = -1),
            (this.running = []),
            (this.debounceAccept = -1),
            (this.pendingStart = !1),
            (this.composing = 0),
            e.state.field(I).active))
              t.isPending && this.startQuery(t);
          }
          update(e) {
            let t = e.state.field(I),
              n = e.state.facet(g);
            if (!e.selectionSet && !e.docChanged && e.startState.field(I) == t)
              return;
            let o = e.transactions.some(e => {
              let t = O(e, n);
              return 8 & t || ((e.selection || e.docChanged) && !(3 & t));
            });
            for (let t = 0; t < this.running.length; t++) {
              let n = this.running[t];
              if (
                o ||
                (n.context.abortOnDocChange && e.docChanged) ||
                (n.updates.length + e.transactions.length > 50 &&
                  Date.now() - n.time > 1e3)
              ) {
                for (let e of n.context.abortListeners)
                  try {
                    e();
                  } catch (e) {
                    (0, i.c_)(this.view.state, e);
                  }
                ((n.context.abortListeners = null),
                  this.running.splice(t--, 1));
              } else n.updates.push(...e.transactions);
            }
            (this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate),
              e.transactions.some(e => e.effects.some(e => e.is(d))) &&
                (this.pendingStart = !0));
            let r = this.pendingStart ? 50 : n.activateOnTypingDelay;
            if (
              ((this.debounceUpdate = t.active.some(
                e =>
                  e.isPending &&
                  !this.running.some(t => t.active.source == e.source)
              )
                ? setTimeout(() => this.startUpdate(), r)
                : -1),
              0 != this.composing)
            )
              for (let t of e.transactions)
                t.isUserEvent('input.type')
                  ? (this.composing = 2)
                  : 2 == this.composing && t.selection && (this.composing = 3);
          }
          startUpdate() {
            ((this.debounceUpdate = -1), (this.pendingStart = !1));
            let { state: e } = this.view,
              t = e.field(I);
            for (let e of t.active)
              e.isPending &&
                !this.running.some(t => t.active.source == e.source) &&
                this.startQuery(e);
            this.running.length &&
              t.open &&
              t.open.disabled &&
              (this.debounceAccept = setTimeout(
                () => this.accept(),
                this.view.state.facet(g).updateSyncTime
              ));
          }
          startQuery(e) {
            let { state: t } = this.view,
              n = c(t),
              o = new CompletionContext(t, n, e.explicit, this.view),
              r = new RunningQuery(e, o);
            (this.running.push(r),
              Promise.resolve(e.source(o)).then(
                e => {
                  r.context.aborted ||
                    ((r.done = e || null), this.scheduleAccept());
                },
                e => {
                  (this.view.dispatch({ effects: m.of(null) }),
                    (0, i.c_)(this.view.state, e));
                }
              ));
          }
          scheduleAccept() {
            this.running.every(e => void 0 !== e.done)
              ? this.accept()
              : this.debounceAccept < 0 &&
                (this.debounceAccept = setTimeout(
                  () => this.accept(),
                  this.view.state.facet(g).updateSyncTime
                ));
          }
          accept() {
            var e;
            (this.debounceAccept > -1 && clearTimeout(this.debounceAccept),
              (this.debounceAccept = -1));
            let t = [],
              n = this.view.state.facet(g),
              o = this.view.state.field(I);
            for (let i = 0; i < this.running.length; i++) {
              let r = this.running[i];
              if (void 0 === r.done) continue;
              if ((this.running.splice(i--, 1), r.done)) {
                let o = c(
                    r.updates.length ? r.updates[0].startState : this.view.state
                  ),
                  i = Math.min(o, r.done.from + +!r.active.explicit),
                  s = new ActiveResult(
                    r.active.source,
                    r.active.explicit,
                    i,
                    r.done,
                    r.done.from,
                    null != (e = r.done.to) ? e : o
                  );
                for (let e of r.updates) s = s.update(e, n);
                if (s.hasResult()) {
                  t.push(s);
                  continue;
                }
              }
              let s = o.active.find(e => e.source == r.active.source);
              if (s && s.isPending)
                if (null == r.done) {
                  let e = new ActiveSource(r.active.source, 0);
                  for (let t of r.updates) e = e.update(t, n);
                  e.isPending || t.push(e);
                } else this.startQuery(s);
            }
            (t.length || (o.open && o.open.disabled)) &&
              this.view.dispatch({ effects: D.of(t) });
          }
        },
        {
          eventHandlers: {
            blur(e) {
              let t = this.view.state.field(I, !1);
              if (t && t.tooltip && this.view.state.facet(g).closeOnBlur) {
                let n = t.open && (0, i.Eg)(this.view, t.open.tooltip);
                (n && n.dom.contains(e.relatedTarget)) ||
                  setTimeout(
                    () => this.view.dispatch({ effects: m.of(null) }),
                    10
                  );
              }
            },
            compositionstart() {
              this.composing = 1;
            },
            compositionend() {
              (3 == this.composing &&
                setTimeout(() => this.view.dispatch({ effects: d.of(!1) }), 20),
                (this.composing = 0));
            }
          }
        }
      ),
      L = 'object' == typeof navigator && /Win/.test(navigator.platform),
      B = o.Nb.highest(
        i.Lz.domEventHandlers({
          keydown(e, t) {
            let n = t.state.field(I, !1);
            if (
              !n ||
              !n.open ||
              n.open.disabled ||
              n.open.selected < 0 ||
              e.key.length > 1 ||
              (e.ctrlKey && !(L && e.altKey)) ||
              e.metaKey
            )
              return !1;
            let o = n.open.options[n.open.selected],
              i = n.active.find(e => e.source == o.source),
              r = o.completion.commitCharacters || i.result.commitCharacters;
            return (r && r.indexOf(e.key) > -1 && M(t, o), !1);
          }
        })
      ),
      P = i.Lz.baseTheme({
        '.cm-tooltip.cm-tooltip-autocomplete': {
          '& > ul': {
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            overflow: 'hidden auto',
            maxWidth_fallback: '700px',
            maxWidth: 'min(700px, 95vw)',
            minWidth: '250px',
            maxHeight: '10em',
            height: '100%',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            '& > li, & > completion-section': {
              padding: '1px 3px',
              lineHeight: 1.2
            },
            '& > li': {
              overflowX: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer'
            },
            '& > completion-section': {
              display: 'list-item',
              borderBottom: '1px solid silver',
              paddingLeft: '0.5em',
              opacity: 0.7
            }
          }
        },
        '&light .cm-tooltip-autocomplete ul li[aria-selected]': {
          background: '#17c',
          color: 'white'
        },
        '&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]': {
          background: '#777'
        },
        '&dark .cm-tooltip-autocomplete ul li[aria-selected]': {
          background: '#347',
          color: 'white'
        },
        '&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]': {
          background: '#444'
        },
        '.cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after':
          {
            content: '"···"',
            opacity: 0.5,
            display: 'block',
            textAlign: 'center',
            cursor: 'pointer'
          },
        '.cm-tooltip.cm-completionInfo': {
          position: 'absolute',
          padding: '3px 9px',
          width: 'max-content',
          maxWidth: '400px',
          boxSizing: 'border-box',
          whiteSpace: 'pre-line'
        },
        '.cm-completionInfo.cm-completionInfo-left': { right: '100%' },
        '.cm-completionInfo.cm-completionInfo-right': { left: '100%' },
        '.cm-completionInfo.cm-completionInfo-left-narrow': { right: '30px' },
        '.cm-completionInfo.cm-completionInfo-right-narrow': { left: '30px' },
        '&light .cm-snippetField': { backgroundColor: '#00000022' },
        '&dark .cm-snippetField': { backgroundColor: '#ffffff22' },
        '.cm-snippetFieldPosition': {
          verticalAlign: 'text-top',
          width: 0,
          height: '1.15em',
          display: 'inline-block',
          margin: '0 -0.7px -.7em',
          borderLeft: '1.4px dotted #888'
        },
        '.cm-completionMatchedText': { textDecoration: 'underline' },
        '.cm-completionDetail': { marginLeft: '0.5em', fontStyle: 'italic' },
        '.cm-completionIcon': {
          fontSize: '90%',
          width: '.8em',
          display: 'inline-block',
          textAlign: 'center',
          paddingRight: '.6em',
          opacity: '0.6',
          boxSizing: 'content-box'
        },
        '.cm-completionIcon-function, .cm-completionIcon-method': {
          '&:after': { content: "'ƒ'" }
        },
        '.cm-completionIcon-class': { '&:after': { content: "'○'" } },
        '.cm-completionIcon-interface': { '&:after': { content: "'◌'" } },
        '.cm-completionIcon-variable': { '&:after': { content: "'𝑥'" } },
        '.cm-completionIcon-constant': { '&:after': { content: "'𝐶'" } },
        '.cm-completionIcon-type': { '&:after': { content: "'𝑡'" } },
        '.cm-completionIcon-enum': { '&:after': { content: "'∪'" } },
        '.cm-completionIcon-property': { '&:after': { content: "'□'" } },
        '.cm-completionIcon-keyword': { '&:after': { content: "'🔑︎'" } },
        '.cm-completionIcon-namespace': { '&:after': { content: "'▢'" } },
        '.cm-completionIcon-text': {
          '&:after': {
            content: "'abc'",
            fontSize: '50%',
            verticalAlign: 'middle'
          }
        }
      });
    let FieldPos = class FieldPos {
      constructor(e, t, n, o) {
        ((this.field = e), (this.line = t), (this.from = n), (this.to = o));
      }
    };
    let FieldRange = class FieldRange {
      constructor(e, t, n) {
        ((this.field = e), (this.from = t), (this.to = n));
      }
      map(e) {
        let t = e.mapPos(this.from, -1, o.iR.TrackDel),
          n = e.mapPos(this.to, 1, o.iR.TrackDel);
        return null == t || null == n ? null : new FieldRange(this.field, t, n);
      }
    };
    let Snippet = class Snippet {
      constructor(e, t) {
        ((this.lines = e), (this.fieldPositions = t));
      }
      instantiate(e, t) {
        let n = [],
          o = [t],
          i = e.doc.lineAt(t),
          s = /^\s*/.exec(i.text)[0];
        for (let i of this.lines) {
          if (n.length) {
            let n = s,
              l = /^\t*/.exec(i)[0].length;
            for (let t = 0; t < l; t++) n += e.facet(r.Xt);
            (o.push(t + n.length - l), (i = n + i.slice(l)));
          }
          (n.push(i), (t += i.length + 1));
        }
        return {
          text: n,
          ranges: this.fieldPositions.map(
            e => new FieldRange(e.field, o[e.line] + e.from, o[e.line] + e.to)
          )
        };
      }
      static parse(e) {
        let t = [],
          n = [],
          o = [],
          i;
        for (let r of e.split(/\r\n?|\n/)) {
          for (
            ;
            (i = /[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(r));
          ) {
            let e = i[1] ? +i[1] : null,
              s = i[2] || i[3] || '',
              l = -1;
            0 === e && (e = 1e9);
            let a = s.replace(/\\[{}]/g, e => e[1]);
            for (let n = 0; n < t.length; n++)
              (null != e ? t[n].seq == e : a && t[n].name == a) && (l = n);
            if (l < 0) {
              let n = 0;
              for (
                ;
                n < t.length &&
                (null == e || (null != t[n].seq && t[n].seq < e));
              )
                n++;
              for (let i of (t.splice(n, 0, { seq: e, name: a }), (l = n), o))
                i.field >= l && i.field++;
            }
            for (let e of o)
              if (e.line == n.length && e.from > i.index) {
                let t = i[2] ? 3 + (i[1] || '').length : 2;
                ((e.from -= t), (e.to -= t));
              }
            (o.push(new FieldPos(l, n.length, i.index, i.index + a.length)),
              (r = r.slice(0, i.index) + s + r.slice(i.index + i[0].length)));
          }
          ((r = r.replace(/\\([{}])/g, (e, t, i) => {
            for (let e of o)
              e.line == n.length && e.from > i && (e.from--, e.to--);
            return t;
          })),
            n.push(r));
        }
        return new Snippet(n, o);
      }
    };
    let H = i.NZ.widget({
        widget: new (class extends i.xO {
          toDOM() {
            let e = document.createElement('span');
            return ((e.className = 'cm-snippetFieldPosition'), e);
          }
          ignoreEvent() {
            return !1;
          }
        })()
      }),
      N = i.NZ.mark({ class: 'cm-snippetField' });
    let ActiveSnippet = class ActiveSnippet {
      constructor(e, t) {
        ((this.ranges = e),
          (this.active = t),
          (this.deco = i.NZ.set(
            e.map(e => (e.from == e.to ? H : N).range(e.from, e.to)),
            !0
          )));
      }
      map(e) {
        let t = [];
        for (let n of this.ranges) {
          let o = n.map(e);
          if (!o) return null;
          t.push(o);
        }
        return new ActiveSnippet(t, this.active);
      }
      selectionInsideField(e) {
        return e.ranges.every(e =>
          this.ranges.some(
            t => t.field == this.active && t.from <= e.from && t.to >= e.to
          )
        );
      }
    };
    let U = o.Pe.define({ map: (e, t) => e && e.map(t) }),
      z = o.Pe.define(),
      V = o.sU.define({
        create: () => null,
        update(e, t) {
          for (let n of t.effects) {
            if (n.is(U)) return n.value;
            if (n.is(z) && e) return new ActiveSnippet(e.ranges, n.value);
          }
          return (
            e && t.docChanged && (e = e.map(t.changes)),
            e &&
              t.selection &&
              !e.selectionInsideField(t.selection) &&
              (e = null),
            e
          );
        },
        provide: e => i.Lz.decorations.from(e, e => (e ? e.deco : i.NZ.none))
      });
    function $(e, t) {
      return o.OF.create(
        e.filter(e => e.field == t).map(e => o.OF.range(e.from, e.to))
      );
    }
    function j(e) {
      return ({ state: t, dispatch: n }) => {
        let o = t.field(V, !1);
        if (!o || (e < 0 && 0 == o.active)) return !1;
        let i = o.active + e,
          r = e > 0 && !o.ranges.some(t => t.field == i + e);
        return (
          n(
            t.update({
              selection: $(o.ranges, i),
              effects: U.of(r ? null : new ActiveSnippet(o.ranges, i)),
              scrollIntoView: !0
            })
          ),
          !0
        );
      };
    }
    let J = [
        { key: 'Tab', run: j(1), shift: j(-1) },
        {
          key: 'Escape',
          run: ({ state: e, dispatch: t }) =>
            !!e.field(V, !1) && (t(e.update({ effects: U.of(null) })), !0)
        }
      ],
      _ = o.sj.define({ combine: e => (e.length ? e[0] : J) }),
      q = o.Nb.highest(i.w4.compute([_], e => e.facet(_)));
    function K(e, t) {
      let n;
      return {
        ...t,
        apply:
          ((n = Snippet.parse(e)),
          (e, t, i, r) => {
            let { text: s, ranges: l } = n.instantiate(e.state, i),
              { main: a } = e.state.selection,
              c = {
                changes: {
                  from: i,
                  to: r == a.from ? a.to : r,
                  insert: o.EY.of(s)
                },
                scrollIntoView: !0,
                annotations: t
                  ? [f.of(t), o.ZX.userEvent.of('input.complete')]
                  : void 0
              };
            if (
              (l.length && (c.selection = $(l, 0)), l.some(e => e.field > 0))
            ) {
              let t = new ActiveSnippet(l, 0),
                n = (c.effects = [U.of(t)]);
              void 0 === e.state.field(V, !1) &&
                n.push(o.Pe.appendConfig.of([V, q, W, P]));
            }
            e.dispatch(e.state.update(c));
          })
      };
    }
    let W = i.Lz.domEventHandlers({
        mousedown(e, t) {
          let n = t.state.field(V, !1),
            o;
          if (!n || null == (o = t.posAtCoords({ x: e.clientX, y: e.clientY })))
            return !1;
          let i = n.ranges.find(e => e.from <= o && e.to >= o);
          return (
            !!i &&
            i.field != n.active &&
            (t.dispatch({
              selection: $(n.ranges, i.field),
              effects: U.of(
                n.ranges.some(e => e.field > i.field)
                  ? new ActiveSnippet(n.ranges, i.field)
                  : null
              ),
              scrollIntoView: !0
            }),
            !0)
          );
        }
      }),
      Y = {
        brackets: ['(', '[', '{', "'", '"'],
        before: ')]}:;>',
        stringPrefixes: []
      },
      Z = o.Pe.define({
        map(e, t) {
          let n = t.mapPos(e, -1, o.iR.TrackAfter);
          return null == n ? void 0 : n;
        }
      }),
      G = new (class extends o.FB {})();
    ((G.startSide = 1), (G.endSide = -1));
    let Q = o.sU.define({
      create: () => o.om.empty,
      update(e, t) {
        if (((e = e.map(t.changes)), t.selection)) {
          let n = t.state.doc.lineAt(t.selection.main.head);
          e = e.update({ filter: e => e >= n.from && e <= n.to });
        }
        for (let n of t.effects)
          n.is(Z) && (e = e.update({ add: [G.range(n.value, n.value + 1)] }));
        return e;
      }
    });
    function X() {
      return [ei, Q];
    }
    let ee = '()[]{}<>«»»«［］｛｝';
    function et(e) {
      for (let t = 0; t < ee.length; t += 2)
        if (ee.charCodeAt(t) == e) return ee.charAt(t + 1);
      return (0, o.MK)(e < 128 ? e : e + 1);
    }
    function en(e, t) {
      return e.languageDataAt('closeBrackets', t)[0] || Y;
    }
    let eo =
        'object' == typeof navigator && /Android\b/.test(navigator.userAgent),
      ei = i.Lz.inputHandler.of((e, t, n, i) => {
        if ((eo ? e.composing : e.compositionStarted) || e.state.readOnly)
          return !1;
        let s = e.state.selection.main;
        if (
          i.length > 2 ||
          (2 == i.length && 1 == (0, o.Fh)((0, o.vS)(i, 0))) ||
          t != s.from ||
          n != s.to
        )
          return !1;
        let l = (function (e, t) {
          let n = en(e, e.selection.main.head),
            i = n.brackets || Y.brackets;
          for (let s of i) {
            let l = et((0, o.vS)(s, 0));
            if (t == s)
              return l == s
                ? (function (e, t, n, i) {
                    let s = i.stringPrefixes || Y.stringPrefixes,
                      l = null,
                      a = e.changeByRange(i => {
                        if (!i.empty)
                          return {
                            changes: [
                              { insert: t, from: i.from },
                              { insert: t, from: i.to }
                            ],
                            effects: Z.of(i.to + t.length),
                            range: o.OF.range(
                              i.anchor + t.length,
                              i.head + t.length
                            )
                          };
                        let a = i.head,
                          c = el(e.doc, a),
                          h;
                        if (c == t) {
                          if (ea(e, a))
                            return {
                              changes: { insert: t + t, from: a },
                              effects: Z.of(a + t.length),
                              range: o.OF.cursor(a + t.length)
                            };
                          else if (es(e, a)) {
                            let i =
                              n && e.sliceDoc(a, a + 3 * t.length) == t + t + t
                                ? t + t + t
                                : t;
                            return {
                              changes: { from: a, to: a + i.length, insert: i },
                              range: o.OF.cursor(a + i.length)
                            };
                          }
                        } else if (
                          n &&
                          e.sliceDoc(a - 2 * t.length, a) == t + t &&
                          (h = ec(e, a - 2 * t.length, s)) > -1 &&
                          ea(e, h)
                        )
                          return {
                            changes: { insert: t + t + t + t, from: a },
                            effects: Z.of(a + t.length),
                            range: o.OF.cursor(a + t.length)
                          };
                        else if (
                          e.charCategorizer(a)(c) != o.Je.Word &&
                          ec(e, a, s) > -1 &&
                          !(function (e, t, n, o) {
                            let i = (0, r.mv)(e).resolveInner(t, -1),
                              s = o.reduce((e, t) => Math.max(e, t.length), 0);
                            for (let r = 0; r < 5; r++) {
                              let r = e.sliceDoc(
                                  i.from,
                                  Math.min(i.to, i.from + n.length + s)
                                ),
                                l = r.indexOf(n);
                              if (
                                !l ||
                                (l > -1 && o.indexOf(r.slice(0, l)) > -1)
                              ) {
                                let t = i.firstChild;
                                for (
                                  ;
                                  t &&
                                  t.from == i.from &&
                                  t.to - t.from > n.length + l;
                                ) {
                                  if (e.sliceDoc(t.to - n.length, t.to) == n)
                                    return !1;
                                  t = t.firstChild;
                                }
                                return !0;
                              }
                              let a = i.to == t && i.parent;
                              if (!a) break;
                              i = a;
                            }
                            return !1;
                          })(e, a, t, s)
                        )
                          return {
                            changes: { insert: t + t, from: a },
                            effects: Z.of(a + t.length),
                            range: o.OF.cursor(a + t.length)
                          };
                        return { range: (l = i) };
                      });
                    return l
                      ? null
                      : e.update(a, {
                          scrollIntoView: !0,
                          userEvent: 'input.type'
                        });
                  })(e, s, i.indexOf(s + s + s) > -1, n)
                : (function (e, t, n, i) {
                    let r = null,
                      s = e.changeByRange(s => {
                        if (!s.empty)
                          return {
                            changes: [
                              { insert: t, from: s.from },
                              { insert: n, from: s.to }
                            ],
                            effects: Z.of(s.to + t.length),
                            range: o.OF.range(
                              s.anchor + t.length,
                              s.head + t.length
                            )
                          };
                        let l = el(e.doc, s.head);
                        return !l || /\s/.test(l) || i.indexOf(l) > -1
                          ? {
                              changes: { insert: t + n, from: s.head },
                              effects: Z.of(s.head + t.length),
                              range: o.OF.cursor(s.head + t.length)
                            }
                          : { range: (r = s) };
                      });
                    return r
                      ? null
                      : e.update(s, {
                          scrollIntoView: !0,
                          userEvent: 'input.type'
                        });
                  })(e, s, l, n.before || Y.before);
            if (t == l && es(e, e.selection.main.from))
              return (function (e, t) {
                let n = null,
                  i = e.changeByRange(i =>
                    i.empty && el(e.doc, i.head) == t
                      ? {
                          changes: {
                            from: i.head,
                            to: i.head + t.length,
                            insert: t
                          },
                          range: o.OF.cursor(i.head + t.length)
                        }
                      : (n = { range: i })
                  );
                return n
                  ? null
                  : e.update(i, {
                      scrollIntoView: !0,
                      userEvent: 'input.type'
                    });
              })(e, l);
          }
          return null;
        })(e.state, i);
        return !!l && (e.dispatch(l), !0);
      }),
      er = [
        {
          key: 'Backspace',
          run: ({ state: e, dispatch: t }) => {
            if (e.readOnly) return !1;
            let n = en(e, e.selection.main.head).brackets || Y.brackets,
              i = null,
              r = e.changeByRange(t => {
                if (t.empty) {
                  var r, s;
                  let i,
                    l =
                      ((r = e.doc),
                      (s = t.head),
                      (i = r.sliceString(s - 2, s)),
                      (0, o.Fh)((0, o.vS)(i, 0)) == i.length ? i : i.slice(1));
                  for (let i of n)
                    if (i == l && el(e.doc, t.head) == et((0, o.vS)(i, 0)))
                      return {
                        changes: {
                          from: t.head - i.length,
                          to: t.head + i.length
                        },
                        range: o.OF.cursor(t.head - i.length)
                      };
                }
                return { range: (i = t) };
              });
            return (
              i ||
                t(
                  e.update(r, {
                    scrollIntoView: !0,
                    userEvent: 'delete.backward'
                  })
                ),
              !i
            );
          }
        }
      ];
    function es(e, t) {
      let n = !1;
      return (
        e.field(Q).between(0, e.doc.length, e => {
          e == t && (n = !0);
        }),
        n
      );
    }
    function el(e, t) {
      let n = e.sliceString(t, t + 2);
      return n.slice(0, (0, o.Fh)((0, o.vS)(n, 0)));
    }
    function ea(e, t) {
      let n = (0, r.mv)(e).resolveInner(t + 1);
      return n.parent && n.from == t;
    }
    function ec(e, t, n) {
      let i = e.charCategorizer(t);
      if (i(e.sliceDoc(t - 1, t)) != o.Je.Word) return t;
      for (let r of n) {
        let n = t - r.length;
        if (e.sliceDoc(n, t) == r && i(e.sliceDoc(n - 1, n)) != o.Je.Word)
          return n;
      }
      return -1;
    }
    function eh(e = {}) {
      return [B, I, g.of(e), T, eu, P];
    }
    let ef = [
        { key: 'Ctrl-Space', run: R },
        { mac: 'Alt-`', run: R },
        { mac: 'Alt-i', run: R },
        {
          key: 'Escape',
          run: e => {
            let t = e.state.field(I, !1);
            return (
              !!t &&
              !!t.active.some(e => 0 != e.state) &&
              (e.dispatch({ effects: m.of(null) }), !0)
            );
          }
        },
        { key: 'ArrowDown', run: F(!0) },
        { key: 'ArrowUp', run: F(!1) },
        { key: 'PageDown', run: F(!0, 'page') },
        { key: 'PageUp', run: F(!1, 'page') },
        {
          key: 'Enter',
          run: e => {
            let t = e.state.field(I, !1);
            return (
              !(
                e.state.readOnly ||
                !t ||
                !t.open ||
                t.open.selected < 0 ||
                t.open.disabled ||
                Date.now() - t.open.timestamp <
                  e.state.facet(g).interactionDelay
              ) && M(e, t.open.options[t.open.selected])
            );
          }
        }
      ],
      eu = o.Nb.highest(
        i.w4.computeN([g], e => (e.facet(g).defaultKeymap ? [ef] : []))
      );
    n.d(
      t,
      { Ar: () => a, Gw: () => K, et: () => l, wm: () => X, yU: () => eh },
      { Bc: er, OO: ef }
    );
  },
  45230(e, t, n) {
    var o = n(6585),
      i = n(1371),
      r = n(15874),
      s = n(90365);
    function l(e, t) {
      return ({ state: n, dispatch: o }) => {
        if (n.readOnly) return !1;
        let i = e(t, n);
        return !!i && (o(n.update(i)), !0);
      };
    }
    let a = l(function (e, t, n = t.selection.ranges) {
        let o = [],
          i = -1;
        e: for (let { from: e, to: r } of n) {
          let n = o.length,
            s = 1e9,
            l;
          for (let n = e; n <= r;) {
            let a = t.doc.lineAt(n);
            if (void 0 == l && !(l = f(t, a.from).line)) continue e;
            if (a.from > i && (e == r || r > a.from)) {
              i = a.from;
              let e = /^\s*/.exec(a.text)[0].length,
                t = e == a.length,
                n = a.text.slice(e, e + l.length) == l ? e : -1;
              (e < a.text.length && e < s && (s = e),
                o.push({
                  line: a,
                  comment: n,
                  token: l,
                  indent: e,
                  empty: t,
                  single: !1
                }));
            }
            n = a.to + 1;
          }
          if (s < 1e9)
            for (let e = n; e < o.length; e++)
              o[e].indent < o[e].line.text.length && (o[e].indent = s);
          o.length == n + 1 && (o[n].single = !0);
        }
        if (2 != e && o.some(e => e.comment < 0 && (!e.empty || e.single))) {
          let e = [];
          for (let { line: t, token: n, indent: i, empty: r, single: s } of o)
            (s || !r) && e.push({ from: t.from + i, insert: n + ' ' });
          let n = t.changes(e);
          return { changes: n, selection: t.selection.map(n, 1) };
        }
        if (1 != e && o.some(e => e.comment >= 0)) {
          let e = [];
          for (let { line: t, comment: n, token: i } of o)
            if (n >= 0) {
              let o = t.from + n,
                r = o + i.length;
              (' ' == t.text[r - t.from] && r++, e.push({ from: o, to: r }));
            }
          return { changes: e };
        }
        return null;
      }, 0),
      c = l(u, 0),
      h = l(
        (e, t) =>
          u(
            e,
            t,
            (function (e) {
              let t = [];
              for (let n of e.selection.ranges) {
                let o = e.doc.lineAt(n.from),
                  i = n.to <= o.to ? o : e.doc.lineAt(n.to);
                i.from > o.from &&
                  i.from == n.to &&
                  (i = n.to == o.to + 1 ? o : e.doc.lineAt(n.to - 1));
                let r = t.length - 1;
                r >= 0 && t[r].to > o.from
                  ? (t[r].to = i.to)
                  : t.push({
                      from: o.from + /^\s*/.exec(o.text)[0].length,
                      to: i.to
                    });
              }
              return t;
            })(t)
          ),
        0
      );
    function f(e, t) {
      let n = e.languageDataAt('commentTokens', t, 1);
      return n.length ? n[0] : {};
    }
    function u(e, t, n = t.selection.ranges) {
      let o = n.map(e => f(t, e.from).block);
      if (!o.every(e => e)) return null;
      let i = n.map((e, n) =>
        (function (e, { open: t, close: n }, o, i) {
          let r,
            s,
            l = e.sliceDoc(o - 50, o),
            a = e.sliceDoc(i, i + 50),
            c = /\s*$/.exec(l)[0].length,
            h = /^\s*/.exec(a)[0].length,
            f = l.length - c;
          if (l.slice(f - t.length, f) == t && a.slice(h, h + n.length) == n)
            return {
              open: { pos: o - c, margin: c && 1 },
              close: { pos: i + h, margin: h && 1 }
            };
          i - o <= 100
            ? (r = s = e.sliceDoc(o, i))
            : ((r = e.sliceDoc(o, o + 50)), (s = e.sliceDoc(i - 50, i)));
          let u = /^\s*/.exec(r)[0].length,
            p = /\s*$/.exec(s)[0].length,
            d = s.length - p - n.length;
          return r.slice(u, u + t.length) == t && s.slice(d, d + n.length) == n
            ? {
                open: {
                  pos: o + u + t.length,
                  margin: +!!/\s/.test(r.charAt(u + t.length))
                },
                close: {
                  pos: i - p - n.length,
                  margin: +!!/\s/.test(s.charAt(d - 1))
                }
              }
            : null;
        })(t, o[n], e.from, e.to)
      );
      if (2 != e && !i.every(e => e))
        return {
          changes: t.changes(
            n.map((e, t) =>
              i[t]
                ? []
                : [
                    { from: e.from, insert: o[t].open + ' ' },
                    { from: e.to, insert: ' ' + o[t].close }
                  ]
            )
          )
        };
      if (1 != e && i.some(e => e)) {
        let e = [];
        for (let t = 0, n; t < i.length; t++)
          if ((n = i[t])) {
            let i = o[t],
              { open: r, close: s } = n;
            e.push(
              { from: r.pos - i.open.length, to: r.pos + r.margin },
              { from: s.pos - s.margin, to: s.pos + i.close.length }
            );
          }
        return { changes: e };
      }
      return null;
    }
    let p = o.YH.define(),
      d = o.YH.define(),
      m = o.sj.define(),
      g = o.sj.define({
        combine: e =>
          (0, o.QR)(
            e,
            { minDepth: 100, newGroupDelay: 500, joinToEvent: (e, t) => t },
            {
              minDepth: Math.max,
              newGroupDelay: Math.min,
              joinToEvent: (e, t) => (n, o) => e(n, o) || t(n, o)
            }
          )
      }),
      v = o.sU.define({
        create: () => HistoryState.empty,
        update(e, t) {
          let n = t.state.facet(g),
            i = t.annotation(p);
          if (i) {
            let o = HistEvent.fromTransaction(t, i.selection),
              r = i.side,
              s = 0 == r ? e.undone : e.done;
            return (
              (s = o
                ? S(s, s.length, n.minDepth, o)
                : D(s, t.startState.selection)),
              new HistoryState(0 == r ? i.rest : s, 0 == r ? s : i.rest)
            );
          }
          let r = t.annotation(d);
          if (
            (('full' == r || 'before' == r) && (e = e.isolate()),
            !1 === t.annotation(o.ZX.addToHistory))
          )
            return t.changes.empty ? e : e.addMapping(t.changes.desc);
          let s = HistEvent.fromTransaction(t),
            l = t.annotation(o.ZX.time),
            a = t.annotation(o.ZX.userEvent);
          return (
            s
              ? (e = e.addChanges(s, l, a, n, t))
              : t.selection &&
                (e = e.addSelection(
                  t.startState.selection,
                  l,
                  a,
                  n.newGroupDelay
                )),
            ('full' == r || 'after' == r) && (e = e.isolate()),
            e
          );
        },
        toJSON: e => ({
          done: e.done.map(e => e.toJSON()),
          undone: e.undone.map(e => e.toJSON())
        }),
        fromJSON: e =>
          new HistoryState(
            e.done.map(HistEvent.fromJSON),
            e.undone.map(HistEvent.fromJSON)
          )
      });
    function y(e = {}) {
      return [
        v,
        g.of(e),
        i.Lz.domEventHandlers({
          beforeinput(e, t) {
            let n =
              'historyUndo' == e.inputType
                ? b
                : 'historyRedo' == e.inputType
                  ? A
                  : null;
            return !!n && (e.preventDefault(), n(t));
          }
        })
      ];
    }
    function w(e, t) {
      return function ({ state: n, dispatch: o }) {
        if (!t && n.readOnly) return !1;
        let i = n.field(v, !1);
        if (!i) return !1;
        let r = i.pop(e, n, t);
        return !!r && (o(r), !0);
      };
    }
    let b = w(0, !1),
      A = w(1, !1),
      x = w(0, !0),
      k = w(1, !0);
    let HistEvent = class HistEvent {
      constructor(e, t, n, o, i) {
        ((this.changes = e),
          (this.effects = t),
          (this.mapped = n),
          (this.startSelection = o),
          (this.selectionsAfter = i));
      }
      setSelAfter(e) {
        return new HistEvent(
          this.changes,
          this.effects,
          this.mapped,
          this.startSelection,
          e
        );
      }
      toJSON() {
        var e, t, n;
        return {
          changes: null == (e = this.changes) ? void 0 : e.toJSON(),
          mapped: null == (t = this.mapped) ? void 0 : t.toJSON(),
          startSelection:
            null == (n = this.startSelection) ? void 0 : n.toJSON(),
          selectionsAfter: this.selectionsAfter.map(e => e.toJSON())
        };
      }
      static fromJSON(e) {
        return new HistEvent(
          e.changes && o.VR.fromJSON(e.changes),
          [],
          e.mapped && o.Gu.fromJSON(e.mapped),
          e.startSelection && o.OF.fromJSON(e.startSelection),
          e.selectionsAfter.map(o.OF.fromJSON)
        );
      }
      static fromTransaction(e, t) {
        let n = O;
        for (let t of e.startState.facet(m)) {
          let o = t(e);
          o.length && (n = n.concat(o));
        }
        return !n.length && e.changes.empty
          ? null
          : new HistEvent(
              e.changes.invert(e.startState.doc),
              n,
              void 0,
              t || e.startState.selection,
              O
            );
      }
      static selection(e) {
        return new HistEvent(void 0, O, void 0, void 0, e);
      }
    };
    function S(e, t, n, o) {
      let i = e.slice(t + 1 > n + 20 ? t - n - 1 : 0, t);
      return (i.push(o), i);
    }
    function C(e, t) {
      return e.length ? (t.length ? e.concat(t) : e) : t;
    }
    let O = [];
    function D(e, t) {
      if (!e.length) return [HistEvent.selection([t])];
      {
        let n = e[e.length - 1],
          o = n.selectionsAfter.slice(
            Math.max(0, n.selectionsAfter.length - 200)
          );
        return o.length && o[o.length - 1].eq(t)
          ? e
          : (o.push(t), S(e, e.length - 1, 1e9, n.setSelAfter(o)));
      }
    }
    function I(e, t) {
      if (!e.length) return e;
      let n = e.length,
        i = O;
      for (; n;) {
        let r = (function (e, t, n) {
          let i = C(
            e.selectionsAfter.length ? e.selectionsAfter.map(e => e.map(t)) : O,
            n
          );
          if (!e.changes) return HistEvent.selection(i);
          let r = e.changes.map(t),
            s = t.mapDesc(e.changes, !0),
            l = e.mapped ? e.mapped.composeDesc(s) : s;
          return new HistEvent(
            r,
            o.Pe.mapEffects(e.effects, t),
            l,
            e.startSelection.map(s),
            i
          );
        })(e[n - 1], t, i);
        if ((r.changes && !r.changes.empty) || r.effects.length) {
          let t = e.slice(0, n);
          return ((t[n - 1] = r), t);
        }
        ((t = r.mapped), n--, (i = r.selectionsAfter));
      }
      return i.length ? [HistEvent.selection(i)] : O;
    }
    let M = /^(input\.type|delete)($|\.)/;
    let HistoryState = class HistoryState {
      constructor(e, t, n = 0, o) {
        ((this.done = e),
          (this.undone = t),
          (this.prevTime = n),
          (this.prevUserEvent = o));
      }
      isolate() {
        return this.prevTime ? new HistoryState(this.done, this.undone) : this;
      }
      addChanges(e, t, n, i, r) {
        var s, l;
        let a,
          c,
          h = this.done,
          f = h[h.length - 1];
        return new HistoryState(
          (h =
            f &&
            f.changes &&
            !f.changes.empty &&
            e.changes &&
            (!n || M.test(n)) &&
            ((!f.selectionsAfter.length &&
              t - this.prevTime < i.newGroupDelay &&
              i.joinToEvent(
                r,
                ((s = f.changes),
                (l = e.changes),
                (a = []),
                (c = !1),
                s.iterChangedRanges((e, t) => a.push(e, t)),
                l.iterChangedRanges((e, t, n, o) => {
                  for (let e = 0; e < a.length;) {
                    let t = a[e++],
                      i = a[e++];
                    o >= t && n <= i && (c = !0);
                  }
                }),
                c)
              )) ||
              'input.type.compose' == n)
              ? S(
                  h,
                  h.length - 1,
                  i.minDepth,
                  new HistEvent(
                    e.changes.compose(f.changes),
                    C(o.Pe.mapEffects(e.effects, f.changes), f.effects),
                    f.mapped,
                    f.startSelection,
                    O
                  )
                )
              : S(h, h.length, i.minDepth, e)),
          O,
          t,
          n
        );
      }
      addSelection(e, t, n, o) {
        var i;
        let r = this.done.length
          ? this.done[this.done.length - 1].selectionsAfter
          : O;
        return r.length > 0 &&
          t - this.prevTime < o &&
          n == this.prevUserEvent &&
          n &&
          /^select($|\.)/.test(n) &&
          ((i = r[r.length - 1]),
          i.ranges.length == e.ranges.length &&
            0 ===
              i.ranges.filter((t, n) => t.empty != e.ranges[n].empty).length)
          ? this
          : new HistoryState(D(this.done, e), this.undone, t, n);
      }
      addMapping(e) {
        return new HistoryState(
          I(this.done, e),
          I(this.undone, e),
          this.prevTime,
          this.prevUserEvent
        );
      }
      pop(e, t, n) {
        let o = 0 == e ? this.done : this.undone;
        if (0 == o.length) return null;
        let i = o[o.length - 1],
          r =
            i.selectionsAfter[0] ||
            (i.startSelection
              ? i.startSelection.map(i.changes.invertedDesc, 1)
              : t.selection);
        if (n && i.selectionsAfter.length) {
          let n, s;
          return t.update({
            selection: i.selectionsAfter[i.selectionsAfter.length - 1],
            annotations: p.of({
              side: e,
              rest:
                ((n = o[o.length - 1]),
                ((s = o.slice())[o.length - 1] = n.setSelAfter(
                  n.selectionsAfter.slice(0, n.selectionsAfter.length - 1)
                )),
                s),
              selection: r
            }),
            userEvent: 0 == e ? 'select.undo' : 'select.redo',
            scrollIntoView: !0
          });
        }
        {
          if (!i.changes) return null;
          let n = 1 == o.length ? O : o.slice(0, o.length - 1);
          return (
            i.mapped && (n = I(n, i.mapped)),
            t.update({
              changes: i.changes,
              selection: i.startSelection,
              effects: i.effects,
              annotations: p.of({ side: e, rest: n, selection: r }),
              filter: !1,
              userEvent: 0 == e ? 'undo' : 'redo',
              scrollIntoView: !0
            })
          );
        }
      }
    };
    function E(e, t) {
      return o.OF.create(e.ranges.map(t), e.mainIndex);
    }
    function F(e, t) {
      return e.update({
        selection: t,
        scrollIntoView: !0,
        userEvent: 'select'
      });
    }
    function R({ state: e, dispatch: t }, n) {
      let o = E(e.selection, n);
      return !o.eq(e.selection, !0) && (t(F(e, o)), !0);
    }
    function T(e, t) {
      return o.OF.cursor(t ? e.to : e.from);
    }
    function L(e, t) {
      return R(e, n => (n.empty ? e.moveByChar(n, t) : T(n, t)));
    }
    function B(e) {
      return e.textDirectionAt(e.state.selection.main.head) == i.OP.LTR;
    }
    HistoryState.empty = new HistoryState(O, O);
    let P = e => L(e, !B(e)),
      H = e => L(e, B(e));
    function N(e, t) {
      return R(e, n => (n.empty ? e.moveByGroup(n, t) : T(n, t)));
    }
    function U(e, t, n) {
      let i,
        l,
        a = (0, r.mv)(e).resolveInner(t.head),
        c = n ? s.uY.closedBy : s.uY.openedBy;
      for (let o = t.head; ;) {
        let t = n ? a.childAfter(o) : a.childBefore(o);
        if (!t) break;
        !(function (e, t, n) {
          if (t.type.prop(n)) return !0;
          let o = t.to - t.from;
          return (
            (o && (o > 2 || /[^\s,.;:]/.test(e.sliceDoc(t.from, t.to)))) ||
            t.firstChild
          );
        })(e, t, c)
          ? (o = n ? t.to : t.from)
          : (a = t);
      }
      return (
        (l =
          a.type.prop(c) &&
          (i = n ? (0, r.jU)(e, a.from, 1) : (0, r.jU)(e, a.to, -1)) &&
          i.matched
            ? n
              ? i.end.to
              : i.end.from
            : n
              ? a.to
              : a.from),
        o.OF.cursor(l, n ? -1 : 1)
      );
    }
    function z(e, t) {
      return R(e, n => {
        if (!n.empty) return T(n, t);
        let o = e.moveVertically(n, t);
        return o.head != n.head ? o : e.moveToLineBoundary(n, t);
      });
    }
    'u' > typeof Intl && Intl.Segmenter;
    let V = e => z(e, !1),
      $ = e => z(e, !0);
    function j(e) {
      let t = e.scrollDOM.clientHeight < e.scrollDOM.scrollHeight - 2,
        n = 0,
        o = 0,
        r;
      if (t) {
        for (let t of e.state.facet(i.Lz.scrollMargins)) {
          let i = t(e);
          ((null == i ? void 0 : i.top) &&
            (n = Math.max(null == i ? void 0 : i.top, n)),
            (null == i ? void 0 : i.bottom) &&
              (o = Math.max(null == i ? void 0 : i.bottom, o)));
        }
        r = e.scrollDOM.clientHeight - n - o;
      } else r = (e.dom.ownerDocument.defaultView || window).innerHeight;
      return {
        marginTop: n,
        marginBottom: o,
        selfScroll: t,
        height: Math.max(e.defaultLineHeight, r - 5)
      };
    }
    function J(e, t) {
      let n,
        o = j(e),
        { state: r } = e,
        s = E(r.selection, n =>
          n.empty ? e.moveVertically(n, t, o.height) : T(n, t)
        );
      if (s.eq(r.selection)) return !1;
      if (o.selfScroll) {
        let t = e.coordsAtPos(r.selection.main.head),
          l = e.scrollDOM.getBoundingClientRect(),
          a = l.top + o.marginTop,
          c = l.bottom - o.marginBottom;
        t &&
          t.top > a &&
          t.bottom < c &&
          (n = i.Lz.scrollIntoView(s.main.head, {
            y: 'start',
            yMargin: t.top - a
          }));
      }
      return (e.dispatch(F(r, s), { effects: n }), !0);
    }
    let _ = e => J(e, !1),
      q = e => J(e, !0);
    function K(e, t, n) {
      let i = e.lineBlockAt(t.head),
        r = e.moveToLineBoundary(t, n);
      if (
        (r.head == t.head &&
          r.head != (n ? i.to : i.from) &&
          (r = e.moveToLineBoundary(t, n, !1)),
        !n && r.head == i.from && i.length)
      ) {
        let n = /^\s*/.exec(
          e.state.sliceDoc(i.from, Math.min(i.from + 100, i.to))
        )[0].length;
        n && t.head != i.from + n && (r = o.OF.cursor(i.from + n));
      }
      return r;
    }
    function W(e, t, n) {
      let i = E(e.state.selection, e => {
        e.undirectional &&
          e.head >= e.anchor != t &&
          (e = o.OF.range(e.head, e.anchor));
        let i = n(e);
        return o.OF.range(
          e.anchor,
          i.head,
          i.goalColumn,
          i.bidiLevel || void 0,
          i.assoc
        );
      });
      return !i.eq(e.state.selection) && (e.dispatch(F(e.state, i)), !0);
    }
    function Y(e, t) {
      return W(e, t, n => e.moveByChar(n, t));
    }
    let Z = e => Y(e, !B(e)),
      G = e => Y(e, B(e));
    function Q(e, t) {
      return W(e, t, n => e.moveByGroup(n, t));
    }
    function X(e, t) {
      return W(e, t, n => e.moveVertically(n, t));
    }
    let ee = e => X(e, !1),
      et = e => X(e, !0);
    function en(e, t) {
      return W(e, t, n => e.moveVertically(n, t, j(e).height));
    }
    let eo = e => en(e, !1),
      ei = e => en(e, !0),
      er = ({ state: e, dispatch: t }) => (t(F(e, { anchor: 0 })), !0),
      es = ({ state: e, dispatch: t }) => (
        t(F(e, { anchor: e.doc.length })),
        !0
      ),
      el = ({ state: e, dispatch: t }) => (
        t(F(e, { anchor: e.selection.main.anchor, head: 0 })),
        !0
      ),
      ea = ({ state: e, dispatch: t }) => (
        t(F(e, { anchor: e.selection.main.anchor, head: e.doc.length })),
        !0
      );
    function ec(e, t) {
      let { state: n } = e,
        i = n.selection,
        r = n.selection.ranges.slice();
      for (let o of n.selection.ranges) {
        let i = n.doc.lineAt(o.head);
        if (t ? i.to < e.state.doc.length : i.from > 0)
          for (let n = o; ;) {
            let o = e.moveVertically(n, t);
            if (o.head < i.from || o.head > i.to) {
              r.some(e => e.head == o.head) || r.push(o);
              break;
            }
            if (o.head == n.head) break;
            n = o;
          }
      }
      return (
        r.length != i.ranges.length &&
        (e.dispatch(F(n, o.OF.create(r, r.length - 1))), !0)
      );
    }
    function eh(e, t) {
      if (e.state.readOnly) return !1;
      let n = 'delete.selection',
        { state: r } = e,
        s = r.changeByRange(i => {
          let { from: r, to: s } = i;
          if (r == s) {
            let o = t(i);
            (o < r
              ? ((n = 'delete.backward'), (o = ef(e, o, !1)))
              : o > r && ((n = 'delete.forward'), (o = ef(e, o, !0))),
              (r = Math.min(r, o)),
              (s = Math.max(s, o)));
          } else ((r = ef(e, r, !1)), (s = ef(e, s, !0)));
          return r == s
            ? { range: i }
            : {
                changes: { from: r, to: s },
                range: o.OF.cursor(r, r < i.head ? -1 : 1)
              };
        });
      return (
        !s.changes.empty &&
        (e.dispatch(
          r.update(s, {
            scrollIntoView: !0,
            userEvent: n,
            effects:
              'delete.selection' == n
                ? i.Lz.announce.of(r.phrase('Selection deleted'))
                : void 0
          })
        ),
        !0)
      );
    }
    function ef(e, t, n) {
      if (e instanceof i.Lz)
        for (let o of e.state.facet(i.Lz.atomicRanges).map(t => t(e)))
          o.between(t, t, (e, o) => {
            e < t && o > t && (t = n ? o : e);
          });
      return t;
    }
    let eu = (e, t, n) =>
        eh(e, i => {
          let s = i.from,
            { state: l } = e,
            a = l.doc.lineAt(s),
            c,
            h;
          if (
            n &&
            !t &&
            s > a.from &&
            s < a.from + 200 &&
            !/[^ \t]/.test((c = a.text.slice(0, s - a.from)))
          ) {
            if ('	' == c[c.length - 1]) return s - 1;
            let e = (0, o.y$)(c, l.tabSize) % (0, r.tp)(l) || (0, r.tp)(l);
            for (let t = 0; t < e && ' ' == c[c.length - 1 - t]; t++) s--;
            h = s;
          } else
            (h = (0, o.zK)(a.text, s - a.from, t, t) + a.from) == s &&
            a.number != (t ? l.doc.lines : 1)
              ? (h += t ? 1 : -1)
              : !t &&
                /[\ufe00-\ufe0f]/.test(a.text.slice(h - a.from, s - a.from)) &&
                (h = (0, o.zK)(a.text, h - a.from, !1, !1) + a.from);
          return h;
        }),
      ep = e => eu(e, !1, !0),
      ed = e => eu(e, !0, !1),
      em = (e, t) =>
        eh(e, n => {
          let i = n.head,
            { state: r } = e,
            s = r.doc.lineAt(i),
            l = r.charCategorizer(i);
          for (let e = null; ;) {
            if (i == (t ? s.to : s.from)) {
              i == n.head &&
                s.number != (t ? r.doc.lines : 1) &&
                (i += t ? 1 : -1);
              break;
            }
            let a = (0, o.zK)(s.text, i - s.from, t) + s.from,
              c = s.text.slice(
                Math.min(i, a) - s.from,
                Math.max(i, a) - s.from
              ),
              h = l(c);
            if (null != e && h != e) break;
            ((' ' != c || i != n.head) && (e = h), (i = a));
          }
          return i;
        }),
      eg = e => em(e, !1);
    function ev(e) {
      let t = [],
        n = -1;
      for (let o of e.selection.ranges) {
        let i = e.doc.lineAt(o.from),
          r = e.doc.lineAt(o.to);
        if (
          (o.empty || o.to != r.from || (r = e.doc.lineAt(o.to - 1)),
          n >= i.number)
        ) {
          let e = t[t.length - 1];
          ((e.to = r.to), e.ranges.push(o));
        } else t.push({ from: i.from, to: r.to, ranges: [o] });
        n = r.number + 1;
      }
      return t;
    }
    function ey(e, t, n) {
      if (e.readOnly) return !1;
      let i = [],
        r = [];
      for (let t of ev(e)) {
        if (n ? t.to == e.doc.length : 0 == t.from) continue;
        let s = e.doc.lineAt(n ? t.to + 1 : t.from - 1),
          l = s.length + 1;
        if (n)
          for (let n of (i.push(
            { from: t.to, to: s.to },
            { from: t.from, insert: s.text + e.lineBreak }
          ),
          t.ranges))
            r.push(
              o.OF.range(
                Math.min(e.doc.length, n.anchor + l),
                Math.min(e.doc.length, n.head + l)
              )
            );
        else
          for (let n of (i.push(
            { from: s.from, to: t.from },
            { from: t.to, insert: e.lineBreak + s.text }
          ),
          t.ranges))
            r.push(o.OF.range(n.anchor - l, n.head - l));
      }
      return (
        !!i.length &&
        (t(
          e.update({
            changes: i,
            scrollIntoView: !0,
            selection: o.OF.create(r, e.selection.mainIndex),
            userEvent: 'move.line'
          })
        ),
        !0)
      );
    }
    function ew(e, t, n) {
      if (e.readOnly) return !1;
      let o = [];
      for (let t of ev(e))
        n
          ? o.push({
              from: t.from,
              insert: e.doc.slice(t.from, t.to) + e.lineBreak
            })
          : o.push({
              from: t.to,
              insert: e.lineBreak + e.doc.slice(t.from, t.to)
            });
      let i = e.changes(o);
      return (
        t(
          e.update({
            changes: i,
            selection: e.selection.map(i, n ? 1 : -1),
            scrollIntoView: !0,
            userEvent: 'input.copyline'
          })
        ),
        !0
      );
    }
    let eb = ex(!1),
      eA = ex(!0);
    function ex(e) {
      return ({ state: t, dispatch: n }) => {
        if (t.readOnly) return !1;
        let i = t.changeByRange(n => {
          let { from: i, to: l } = n,
            a = t.doc.lineAt(i),
            c =
              !e &&
              i == l &&
              (function (e, t) {
                if (/\(\)|\[\]|\{\}/.test(e.sliceDoc(t - 1, t + 1)))
                  return { from: t, to: t };
                let n = (0, r.mv)(e).resolveInner(t),
                  o = n.childBefore(t),
                  i = n.childAfter(t),
                  l;
                return o &&
                  i &&
                  o.to <= t &&
                  i.from >= t &&
                  (l = o.type.prop(s.uY.closedBy)) &&
                  l.indexOf(i.name) > -1 &&
                  e.doc.lineAt(o.to).from == e.doc.lineAt(i.from).from &&
                  !/\S/.test(e.sliceDoc(o.to, i.from))
                  ? { from: o.to, to: i.from }
                  : null;
              })(t, i);
          e && (i = l = (l <= a.to ? a : t.doc.lineAt(l)).to);
          let h = new r.KB(t, { simulateBreak: i, simulateDoubleBreak: !!c }),
            f = (0, r._v)(h, i);
          for (
            null == f &&
            (f = (0, o.y$)(/^\s*/.exec(t.doc.lineAt(i).text)[0], t.tabSize));
            l < a.to && /\s/.test(a.text[l - a.from]);
          )
            l++;
          c
            ? ({ from: i, to: l } = c)
            : i > a.from &&
              i < a.from + 100 &&
              !/\S/.test(a.text.slice(0, i)) &&
              (i = a.from);
          let u = ['', (0, r.EI)(t, f)];
          return (
            c && u.push((0, r.EI)(t, h.lineIndent(a.from, -1))),
            {
              changes: { from: i, to: l, insert: o.EY.of(u) },
              range: o.OF.cursor(i + 1 + u[1].length)
            }
          );
        });
        return (n(t.update(i, { scrollIntoView: !0, userEvent: 'input' })), !0);
      };
    }
    function ek(e, t) {
      let n = -1;
      return e.changeByRange(i => {
        let r = [];
        for (let o = i.from; o <= i.to;) {
          let s = e.doc.lineAt(o);
          (s.number > n &&
            (i.empty || i.to > s.from) &&
            (t(s, r, i), (n = s.number)),
            (o = s.to + 1));
        }
        let s = e.changes(r);
        return {
          changes: r,
          range: o.OF.range(s.mapPos(i.anchor, 1), s.mapPos(i.head, 1))
        };
      });
    }
    let eS = ({ state: e, dispatch: t }) =>
        !e.readOnly &&
        (t(
          e.update(
            ek(e, (t, n) => {
              n.push({ from: t.from, insert: e.facet(r.Xt) });
            }),
            { userEvent: 'input.indent' }
          )
        ),
        !0),
      eC = ({ state: e, dispatch: t }) =>
        !e.readOnly &&
        (t(
          e.update(
            ek(e, (t, n) => {
              let i = /^\s*/.exec(t.text)[0];
              if (!i) return;
              let s = (0, o.y$)(i, e.tabSize),
                l = 0,
                a = (0, r.EI)(e, Math.max(0, s - (0, r.tp)(e)));
              for (
                ;
                l < i.length &&
                l < a.length &&
                i.charCodeAt(l) == a.charCodeAt(l);
              )
                l++;
              n.push({
                from: t.from + l,
                to: t.from + i.length,
                insert: a.slice(l)
              });
            }),
            { userEvent: 'delete.dedent' }
          )
        ),
        !0),
      eO = [
        { key: 'Ctrl-b', run: P, shift: Z, preventDefault: !0 },
        { key: 'Ctrl-f', run: H, shift: G },
        { key: 'Ctrl-p', run: V, shift: ee },
        { key: 'Ctrl-n', run: $, shift: et },
        {
          key: 'Ctrl-a',
          run: e => R(e, t => o.OF.cursor(e.lineBlockAt(t.head).from, 1)),
          shift: e => W(e, !1, t => o.OF.cursor(e.lineBlockAt(t.head).from))
        },
        {
          key: 'Ctrl-e',
          run: e => R(e, t => o.OF.cursor(e.lineBlockAt(t.head).to, -1)),
          shift: e => W(e, !0, t => o.OF.cursor(e.lineBlockAt(t.head).to))
        },
        { key: 'Ctrl-d', run: ed },
        { key: 'Ctrl-h', run: ep },
        {
          key: 'Ctrl-k',
          run: e =>
            eh(e, t => {
              let n = e.lineBlockAt(t.head).to;
              return t.head < n ? n : Math.min(e.state.doc.length, t.head + 1);
            })
        },
        { key: 'Ctrl-Alt-h', run: eg },
        {
          key: 'Ctrl-o',
          run: ({ state: e, dispatch: t }) => {
            if (e.readOnly) return !1;
            let n = e.changeByRange(e => ({
              changes: { from: e.from, to: e.to, insert: o.EY.of(['', '']) },
              range: o.OF.cursor(e.from)
            }));
            return (
              t(e.update(n, { scrollIntoView: !0, userEvent: 'input' })),
              !0
            );
          }
        },
        {
          key: 'Ctrl-t',
          run: ({ state: e, dispatch: t }) => {
            if (e.readOnly) return !1;
            let n = e.changeByRange(t => {
              if (!t.empty || 0 == t.from || t.from == e.doc.length)
                return { range: t };
              let n = t.from,
                i = e.doc.lineAt(n),
                r =
                  n == i.from
                    ? n - 1
                    : (0, o.zK)(i.text, n - i.from, !1) + i.from,
                s =
                  n == i.to
                    ? n + 1
                    : (0, o.zK)(i.text, n - i.from, !0) + i.from;
              return {
                changes: {
                  from: r,
                  to: s,
                  insert: e.doc.slice(n, s).append(e.doc.slice(r, n))
                },
                range: o.OF.cursor(s)
              };
            });
            return (
              !n.changes.empty &&
              (t(
                e.update(n, { scrollIntoView: !0, userEvent: 'move.character' })
              ),
              !0)
            );
          }
        },
        { key: 'Ctrl-v', run: q }
      ],
      eD = [
        {
          key: 'Alt-ArrowLeft',
          mac: 'Ctrl-ArrowLeft',
          run: e => R(e, t => U(e.state, t, !B(e))),
          shift: e => {
            let t = !B(e);
            return W(e, t, n => U(e.state, n, t));
          }
        },
        {
          key: 'Alt-ArrowRight',
          mac: 'Ctrl-ArrowRight',
          run: e => R(e, t => U(e.state, t, B(e))),
          shift: e => {
            let t = B(e);
            return W(e, t, n => U(e.state, n, t));
          }
        },
        {
          key: 'Alt-ArrowUp',
          run: ({ state: e, dispatch: t }) => ey(e, t, !1)
        },
        {
          key: 'Shift-Alt-ArrowUp',
          run: ({ state: e, dispatch: t }) => ew(e, t, !1)
        },
        {
          key: 'Alt-ArrowDown',
          run: ({ state: e, dispatch: t }) => ey(e, t, !0)
        },
        {
          key: 'Shift-Alt-ArrowDown',
          run: ({ state: e, dispatch: t }) => ew(e, t, !0)
        },
        { key: 'Mod-Alt-ArrowUp', run: e => ec(e, !1) },
        { key: 'Mod-Alt-ArrowDown', run: e => ec(e, !0) },
        {
          key: 'Escape',
          run: ({ state: e, dispatch: t }) => {
            let n = e.selection,
              i = null;
            return (
              n.ranges.length > 1
                ? (i = o.OF.create([n.main]))
                : n.main.empty || (i = o.OF.create([o.OF.cursor(n.main.head)])),
              !!i && (t(F(e, i)), !0)
            );
          }
        },
        { key: 'Mod-Enter', run: eA },
        {
          key: 'Alt-l',
          mac: 'Ctrl-l',
          run: ({ state: e, dispatch: t }) => {
            let n = ev(e).map(({ from: t, to: n }) =>
              o.OF.undirectionalRange(t, Math.min(n + 1, e.doc.length))
            );
            return (
              t(e.update({ selection: o.OF.create(n), userEvent: 'select' })),
              !0
            );
          }
        },
        {
          key: 'Mod-i',
          run: ({ state: e, dispatch: t }) => {
            let n = E(e.selection, t => {
              let n = (0, r.mv)(e),
                i = n.resolveStack(t.from, 1);
              if (t.empty) {
                let e = n.resolveStack(t.from, -1);
                e.node.from >= i.node.from && e.node.to <= i.node.to && (i = e);
              }
              for (let e = i; e; e = e.next) {
                let { node: n } = e;
                if (
                  ((n.from < t.from && n.to >= t.to) ||
                    (n.to > t.to && n.from <= t.from)) &&
                  e.next
                )
                  return o.OF.undirectionalRange(n.from, n.to);
              }
              return t;
            });
            return !n.eq(e.selection) && (t(F(e, n)), !0);
          },
          preventDefault: !0
        },
        { key: 'Mod-[', run: eC },
        { key: 'Mod-]', run: eS },
        {
          key: 'Mod-Alt-\\',
          run: ({ state: e, dispatch: t }) => {
            if (e.readOnly) return !1;
            let n = Object.create(null),
              o = new r.KB(e, {
                overrideIndentation: e => {
                  let t = n[e];
                  return null == t ? -1 : t;
                }
              }),
              i = ek(e, (t, i, s) => {
                let l = (0, r._v)(o, t.from);
                if (null == l) return;
                /\S/.test(t.text) || (l = 0);
                let a = /^\s*/.exec(t.text)[0],
                  c = (0, r.EI)(e, l);
                (a != c || s.from < t.from + a.length) &&
                  ((n[t.from] = l),
                  i.push({ from: t.from, to: t.from + a.length, insert: c }));
              });
            return (
              i.changes.empty || t(e.update(i, { userEvent: 'indent' })),
              !0
            );
          }
        },
        {
          key: 'Shift-Mod-k',
          run: e => {
            if (e.state.readOnly) return !1;
            let { state: t } = e,
              n = t.changes(
                ev(t).map(
                  ({ from: e, to: n }) => (
                    e > 0 ? e-- : n < t.doc.length && n++,
                    { from: e, to: n }
                  )
                )
              ),
              o = E(t.selection, t => {
                let n;
                if (e.lineWrapping) {
                  let o = e.lineBlockAt(t.head),
                    i = e.coordsAtPos(t.head, t.assoc || 1);
                  i &&
                    (n =
                      o.bottom +
                      e.documentTop -
                      i.bottom +
                      e.defaultLineHeight / 2);
                }
                return e.moveVertically(t, !0, n);
              }).map(n);
            return (
              e.dispatch({
                changes: n,
                selection: o,
                scrollIntoView: !0,
                userEvent: 'delete.line'
              }),
              !0
            );
          }
        },
        {
          key: 'Shift-Mod-\\',
          run: ({ state: e, dispatch: t }) => {
            let n, i;
            return (
              (n = !1),
              (i = E(e.selection, t => {
                let i =
                  (0, r.jU)(e, t.head, -1) ||
                  (0, r.jU)(e, t.head, 1) ||
                  (t.head > 0 && (0, r.jU)(e, t.head - 1, 1)) ||
                  (t.head < e.doc.length && (0, r.jU)(e, t.head + 1, -1));
                if (!i || !i.end) return t;
                n = !0;
                let s = i.start.from == t.head ? i.end.to : i.end.from;
                return o.OF.cursor(s);
              })),
              !!n && (t(F(e, i)), !0)
            );
          }
        },
        {
          key: 'Mod-/',
          run: e => {
            let { state: t } = e,
              n = t.doc.lineAt(t.selection.main.from),
              o = f(e.state, n.from);
            return o.line ? a(e) : !!o.block && h(e);
          }
        },
        { key: 'Alt-A', mac: 'Ctrl-A', run: c },
        {
          key: 'Ctrl-m',
          mac: 'Shift-Alt-m',
          run: e => (e.setTabFocusMode(), !0)
        }
      ].concat(
        [
          { key: 'ArrowLeft', run: P, shift: Z, preventDefault: !0 },
          {
            key: 'Mod-ArrowLeft',
            mac: 'Alt-ArrowLeft',
            run: e => N(e, !B(e)),
            shift: e => Q(e, !B(e)),
            preventDefault: !0
          },
          {
            mac: 'Cmd-ArrowLeft',
            run: e => R(e, t => K(e, t, !B(e))),
            shift: e => {
              let t = !B(e);
              return W(e, t, n => K(e, n, t));
            },
            preventDefault: !0
          },
          { key: 'ArrowRight', run: H, shift: G, preventDefault: !0 },
          {
            key: 'Mod-ArrowRight',
            mac: 'Alt-ArrowRight',
            run: e => N(e, B(e)),
            shift: e => Q(e, B(e)),
            preventDefault: !0
          },
          {
            mac: 'Cmd-ArrowRight',
            run: e => R(e, t => K(e, t, B(e))),
            shift: e => {
              let t = B(e);
              return W(e, t, n => K(e, n, t));
            },
            preventDefault: !0
          },
          { key: 'ArrowUp', run: V, shift: ee, preventDefault: !0 },
          { mac: 'Cmd-ArrowUp', run: er, shift: el },
          { mac: 'Ctrl-ArrowUp', run: _, shift: eo },
          { key: 'ArrowDown', run: $, shift: et, preventDefault: !0 },
          { mac: 'Cmd-ArrowDown', run: es, shift: ea },
          { mac: 'Ctrl-ArrowDown', run: q, shift: ei },
          { key: 'PageUp', run: _, shift: eo },
          { key: 'PageDown', run: q, shift: ei },
          {
            key: 'Home',
            run: e => R(e, t => K(e, t, !1)),
            shift: e => W(e, !1, t => K(e, t, !1)),
            preventDefault: !0
          },
          { key: 'Mod-Home', run: er, shift: el },
          {
            key: 'End',
            run: e => R(e, t => K(e, t, !0)),
            shift: e => W(e, !0, t => K(e, t, !0)),
            preventDefault: !0
          },
          { key: 'Mod-End', run: es, shift: ea },
          { key: 'Enter', run: eb, shift: eb },
          {
            key: 'Mod-a',
            run: ({ state: e, dispatch: t }) => (
              t(
                e.update({
                  selection: { anchor: 0, head: e.doc.length },
                  userEvent: 'select'
                })
              ),
              !0
            )
          },
          { key: 'Backspace', run: ep, shift: ep, preventDefault: !0 },
          { key: 'Delete', run: ed, preventDefault: !0 },
          {
            key: 'Mod-Backspace',
            mac: 'Alt-Backspace',
            run: eg,
            preventDefault: !0
          },
          {
            key: 'Mod-Delete',
            mac: 'Alt-Delete',
            run: e => em(e, !0),
            preventDefault: !0
          },
          {
            mac: 'Mod-Backspace',
            run: e =>
              eh(e, t => {
                let n = e.moveToLineBoundary(t, !1).head;
                return t.head > n ? n : Math.max(0, t.head - 1);
              }),
            preventDefault: !0
          },
          {
            mac: 'Mod-Delete',
            run: e =>
              eh(e, t => {
                let n = e.moveToLineBoundary(t, !0).head;
                return t.head < n
                  ? n
                  : Math.min(e.state.doc.length, t.head + 1);
              }),
            preventDefault: !0
          }
        ].concat(eO.map(e => ({ mac: e.key, run: e.run, shift: e.shift })))
      );
    n.d(
      t,
      { b6: () => y },
      {
        Yc: { key: 'Tab', run: eS, shift: eC },
        cL: [
          { key: 'Mod-z', run: b, preventDefault: !0 },
          { key: 'Mod-y', mac: 'Mod-Shift-z', run: A, preventDefault: !0 },
          { linux: 'Ctrl-Shift-z', run: A, preventDefault: !0 },
          { key: 'Mod-u', run: x, preventDefault: !0 },
          { key: 'Alt-u', mac: 'Mod-Shift-u', run: k, preventDefault: !0 }
        ],
        pw: eD
      }
    );
  },
  6363(e, t, n) {
    var o = n(1371),
      i = n(15874),
      r = n(45230);
    let s = [
      (0, o.N$)(),
      (0, r.b6)(),
      (0, o.VH)(),
      (0, i.y9)(i.Zt, { fallback: !0 }),
      o.w4.of([...r.pw, ...r.cL])
    ];
    n.d(t, {}, { V0: s });
  }
};
//# sourceMappingURL=749.ddec1e1a3032a830.js.map
