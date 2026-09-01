export const __rspack_esm_id = 6216;
export const __rspack_esm_ids = [6216];
export const __webpack_modules__ = {
  1371(t, e, i) {
    let s;
    var o,
      n,
      r,
      l = i(6585),
      a = i(97417),
      h = i(62534);
    let c =
        'u' > typeof navigator
          ? navigator
          : { userAgent: '', vendor: '', platform: '' },
      d = 'u' > typeof document ? document : { documentElement: { style: {} } },
      u = /Edge\/(\d+)/.exec(c.userAgent),
      f = /MSIE \d/.test(c.userAgent),
      p = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(c.userAgent),
      g = !!(f || p || u),
      m = !g && /gecko\/(\d+)/i.test(c.userAgent),
      w = !g && /Chrome\/(\d+)/.exec(c.userAgent),
      v = 'webkitFontSmoothing' in d.documentElement.style,
      b = !g && /Apple Computer/.test(c.vendor),
      y = b && (/Mobile\/\w+/.test(c.userAgent) || c.maxTouchPoints > 2);
    var x = {
      mac: y || /Mac/.test(c.platform),
      windows: /Win/.test(c.platform),
      linux: /Linux|X11/.test(c.platform),
      ie: g,
      ie_version: f ? d.documentMode || 6 : p ? +p[1] : u ? +u[1] : 0,
      gecko: m,
      gecko_version: m ? +(/Firefox\/(\d+)/.exec(c.userAgent) || [0, 0])[1] : 0,
      chrome: !!w,
      chrome_version: w ? +w[1] : 0,
      ios: y,
      android: /Android\b/.test(c.userAgent),
      webkit: v,
      webkit_version: v
        ? +(/\bAppleWebKit\/(\d+)/.exec(c.userAgent) || [0, 0])[1]
        : 0,
      safari: b,
      safari_version: b
        ? +(/\bVersion\/(\d+(\.\d+)?)/.exec(c.userAgent) || [0, 0])[1]
        : 0,
      tabSize:
        null != d.documentElement.style.tabSize ? 'tab-size' : '-moz-tab-size'
    };
    function M(t, e) {
      for (let i in t)
        'class' == i && e.class
          ? (e.class += ' ' + t.class)
          : 'style' == i && e.style
            ? (e.style += ';' + t.style)
            : (e[i] = t[i]);
      return e;
    }
    let S = Object.create(null);
    function k(t, e, i) {
      if (t == e) return !0;
      (t || (t = S), e || (e = S));
      let s = Object.keys(t),
        o = Object.keys(e);
      if (
        s.length - (i && s.indexOf(i) > -1 ? 1 : 0) !=
        o.length - (i && o.indexOf(i) > -1 ? 1 : 0)
      )
        return !1;
      for (let n of s)
        if (n != i && (-1 == o.indexOf(n) || t[n] !== e[n])) return !1;
      return !0;
    }
    function C(t, e, i) {
      let s = !1;
      if (e)
        for (let o in e)
          (i && o in i) ||
            ((s = !0),
            'style' == o ? (t.style.cssText = '') : t.removeAttribute(o));
      if (i)
        for (let o in i)
          (e && e[o] == i[o]) ||
            ((s = !0),
            'style' == o ? (t.style.cssText = i[o]) : t.setAttribute(o, i[o]));
      return s;
    }
    let WidgetType = class WidgetType {
      eq(t) {
        return !1;
      }
      updateDOM(t, e, i) {
        return !1;
      }
      compare(t) {
        return this == t || (this.constructor == t.constructor && this.eq(t));
      }
      get estimatedHeight() {
        return -1;
      }
      get lineBreaks() {
        return 0;
      }
      ignoreEvent(t) {
        return !0;
      }
      coordsAt(t, e, i) {
        return null;
      }
      get isHidden() {
        return !1;
      }
      get editable() {
        return !1;
      }
      destroy(t) {}
    };
    var T =
      (((o = T || (T = {}))[(o.Text = 0)] = 'Text'),
      (o[(o.WidgetBefore = 1)] = 'WidgetBefore'),
      (o[(o.WidgetAfter = 2)] = 'WidgetAfter'),
      (o[(o.WidgetRange = 3)] = 'WidgetRange'),
      o);
    let Decoration = class Decoration extends l.FB {
      constructor(t, e, i, s) {
        (super(),
          (this.startSide = t),
          (this.endSide = e),
          (this.widget = i),
          (this.spec = s));
      }
      get heightRelevant() {
        return !1;
      }
      static mark(t) {
        return new MarkDecoration(t);
      }
      static widget(t) {
        let e = Math.max(-1e4, Math.min(1e4, t.side || 0)),
          i = !!t.block;
        return (
          (e +=
            i && !t.inlineOrder ? (e > 0 ? 3e8 : -4e8) : e > 0 ? 1e8 : -1e8),
          new PointDecoration(t, e, e, i, t.widget || null, !1)
        );
      }
      static replace(t) {
        let e = !!t.block,
          i,
          s;
        if (t.isBlockGap) ((i = -5e8), (s = 4e8));
        else {
          let { start: o, end: n } = A(t, e);
          ((i = (o ? (e ? -3e8 : -1) : 5e8) - 1),
            (s = (n ? (e ? 2e8 : 1) : -6e8) + 1));
        }
        return new PointDecoration(t, i, s, e, t.widget || null, !0);
      }
      static line(t) {
        return new LineDecoration(t);
      }
      static set(t, e = !1) {
        return l.om.of(t, e);
      }
      hasHeight() {
        return !!this.widget && this.widget.estimatedHeight > -1;
      }
    };
    Decoration.none = l.om.empty;
    let MarkDecoration = class MarkDecoration extends Decoration {
      constructor(t) {
        let { start: e, end: i } = A(t);
        (super(e ? -1 : 5e8, i ? 1 : -6e8, null, t),
          (this.tagName = t.tagName || 'span'),
          (this.attrs =
            t.class && t.attributes
              ? M(t.attributes, { class: t.class })
              : t.class
                ? { class: t.class }
                : t.attributes || S));
      }
      eq(t) {
        return (
          this == t ||
          (t instanceof MarkDecoration &&
            this.tagName == t.tagName &&
            k(this.attrs, t.attrs))
        );
      }
      range(t, e = t) {
        if (t >= e) throw RangeError('Mark decorations may not be empty');
        return super.range(t, e);
      }
    };
    MarkDecoration.prototype.point = !1;
    let LineDecoration = class LineDecoration extends Decoration {
      constructor(t) {
        super(-2e8, -2e8, null, t);
      }
      eq(t) {
        return (
          t instanceof LineDecoration &&
          this.spec.class == t.spec.class &&
          k(this.spec.attributes, t.spec.attributes)
        );
      }
      range(t, e = t) {
        if (e != t)
          throw RangeError('Line decoration ranges must be zero-length');
        return super.range(t, e);
      }
    };
    ((LineDecoration.prototype.mapMode = l.iR.TrackBefore),
      (LineDecoration.prototype.point = !0));
    let PointDecoration = class PointDecoration extends Decoration {
      constructor(t, e, i, s, o, n) {
        (super(e, i, o, t),
          (this.block = s),
          (this.isReplace = n),
          (this.mapMode = s
            ? e <= 0
              ? l.iR.TrackBefore
              : l.iR.TrackAfter
            : l.iR.TrackDel));
      }
      get type() {
        return this.startSide != this.endSide
          ? T.WidgetRange
          : this.startSide <= 0
            ? T.WidgetBefore
            : T.WidgetAfter;
      }
      get heightRelevant() {
        return (
          this.block ||
          (!!this.widget &&
            (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0))
        );
      }
      eq(t) {
        var e, i;
        return (
          t instanceof PointDecoration &&
          ((e = this.widget),
          e == (i = t.widget) || !!(e && i && e.compare(i))) &&
          this.block == t.block &&
          this.startSide == t.startSide &&
          this.endSide == t.endSide
        );
      }
      range(t, e = t) {
        if (
          this.isReplace &&
          (t > e || (t == e && this.startSide > 0 && this.endSide <= 0))
        )
          throw RangeError('Invalid range for replacement decoration');
        if (!this.isReplace && e != t)
          throw RangeError(
            'Widget decorations can only have zero-length ranges'
          );
        return super.range(t, e);
      }
    };
    function A(t, e = !1) {
      let { inclusiveStart: i, inclusiveEnd: s } = t;
      return (
        null == i && (i = t.inclusive),
        null == s && (s = t.inclusive),
        { start: null != i ? i : e, end: null != s ? s : e }
      );
    }
    function O(t, e, i, s = 0) {
      let o = i.length - 1;
      o >= 0 && i[o] + s >= t ? (i[o] = Math.max(i[o], e)) : i.push(t, e);
    }
    PointDecoration.prototype.point = !0;
    let BlockWrapper = class BlockWrapper extends l.FB {
      constructor(t, e, i) {
        (super(), (this.tagName = t), (this.attributes = e), (this.rank = i));
      }
      eq(t) {
        return (
          t == this ||
          (t instanceof BlockWrapper &&
            this.tagName == t.tagName &&
            k(this.attributes, t.attributes))
        );
      }
      static create(t) {
        return new BlockWrapper(
          t.tagName,
          t.attributes || S,
          null == t.rank ? 50 : Math.max(0, Math.min(t.rank, 100))
        );
      }
      static set(t, e = !1) {
        return l.om.of(t, e);
      }
    };
    function D(t) {
      return (
        11 == t.nodeType ? (t.getSelection ? t : t.ownerDocument) : t
      ).getSelection();
    }
    function B(t, e) {
      return !!e && (t == e || t.contains(1 != e.nodeType ? e.parentNode : e));
    }
    function E(t, e) {
      if (!e.anchorNode) return !1;
      try {
        return B(t, e.anchorNode);
      } catch (t) {
        return !1;
      }
    }
    function R(t) {
      return 3 == t.nodeType
        ? j(t, 0, t.nodeValue.length).getClientRects()
        : 1 == t.nodeType
          ? t.getClientRects()
          : [];
    }
    function H(t, e, i, s) {
      return !!i && (W(t, e, i, s, -1) || W(t, e, i, s, 1));
    }
    function L(t) {
      for (var e = 0; ; e++) if (!(t = t.previousSibling)) return e;
    }
    function V(t) {
      return (
        1 == t.nodeType &&
        /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(t.nodeName)
      );
    }
    function W(t, e, i, s, o) {
      for (;;) {
        if (t == i && e == s) return !0;
        if (e == (o < 0 ? 0 : P(t))) {
          if ('DIV' == t.nodeName) return !1;
          let i = t.parentNode;
          if (!i || 1 != i.nodeType) return !1;
          ((e = L(t) + (o < 0 ? 0 : 1)), (t = i));
        } else {
          if (
            1 != t.nodeType ||
            (1 == (t = t.childNodes[e + (o < 0 ? -1 : 0)]).nodeType &&
              'false' == t.contentEditable)
          )
            return !1;
          e = o < 0 ? P(t) : 0;
        }
      }
    }
    function P(t) {
      return 3 == t.nodeType ? t.nodeValue.length : t.childNodes.length;
    }
    function N(t, e) {
      let { left: i, right: s } = t;
      if (i == s) return t;
      let o = e ? i : s;
      return { left: o, right: o, top: t.top, bottom: t.bottom };
    }
    function F(t, e) {
      let i = e.width / t.offsetWidth,
        s = e.height / t.offsetHeight;
      return (
        ((i > 0.995 && i < 1.005) ||
          !isFinite(i) ||
          1 > Math.abs(e.width - t.offsetWidth)) &&
          (i = 1),
        ((s > 0.995 && s < 1.005) ||
          !isFinite(s) ||
          1 > Math.abs(e.height - t.offsetHeight)) &&
          (s = 1),
        { scaleX: i, scaleY: s }
      );
    }
    function I(t, e = !0) {
      let i = t.ownerDocument,
        s = null,
        o = null;
      for (let n = t.parentNode; n;)
        if (n == i.body || ((!e || s) && o)) break;
        else if (1 == n.nodeType)
          (!o && n.scrollHeight > n.clientHeight && (o = n),
            e && !s && n.scrollWidth > n.clientWidth && (s = n),
            (n = n.assignedSlot || n.parentNode));
        else if (11 == n.nodeType) n = n.host;
        else break;
      return { x: s, y: o };
    }
    BlockWrapper.prototype.startSide = BlockWrapper.prototype.endSide = -1;
    let DOMSelectionState = class DOMSelectionState {
      constructor() {
        ((this.anchorNode = null),
          (this.anchorOffset = 0),
          (this.focusNode = null),
          (this.focusOffset = 0));
      }
      eq(t) {
        return (
          this.anchorNode == t.anchorNode &&
          this.anchorOffset == t.anchorOffset &&
          this.focusNode == t.focusNode &&
          this.focusOffset == t.focusOffset
        );
      }
      setRange(t) {
        let { anchorNode: e, focusNode: i } = t;
        this.set(
          e,
          Math.min(t.anchorOffset, e ? P(e) : 0),
          i,
          Math.min(t.focusOffset, i ? P(i) : 0)
        );
      }
      set(t, e, i, s) {
        ((this.anchorNode = t),
          (this.anchorOffset = e),
          (this.focusNode = i),
          (this.focusOffset = s));
      }
    };
    function z(t) {
      let e = [];
      for (let i = t; i; i = 11 == i.nodeType ? i.host : i.parentNode)
        1 == i.nodeType &&
          e.push({ node: i, left: i.scrollLeft, top: i.scrollTop });
      return e;
    }
    function K(t, e = !0) {
      for (let { node: i, left: s, top: o } of t)
        (e && i.scrollTop != o && (i.scrollTop = o),
          i.scrollLeft != s && (i.scrollLeft = s));
    }
    let G = null;
    function q(t) {
      if (t.setActive) return t.setActive();
      if (G) return t.focus(G);
      let e = z(t);
      (t.focus(
        null == G
          ? {
              get preventScroll() {
                return ((G = { preventScroll: !0 }), !0);
              }
            }
          : void 0
      ),
        G || ((G = !1), K(e)));
    }
    function j(t, e, i = e) {
      let o = s || (s = document.createRange());
      return (o.setEnd(t, i), o.setStart(t, e), o);
    }
    function _(t, e, i, s) {
      let o = { key: e, code: e, keyCode: i, which: i, cancelable: !0 };
      s &&
        ({
          altKey: o.altKey,
          ctrlKey: o.ctrlKey,
          shiftKey: o.shiftKey,
          metaKey: o.metaKey
        } = s);
      let n = new KeyboardEvent('keydown', o);
      ((n.synthetic = !0), t.dispatchEvent(n));
      let r = new KeyboardEvent('keyup', o);
      return (
        (r.synthetic = !0),
        t.dispatchEvent(r),
        n.defaultPrevented || r.defaultPrevented
      );
    }
    function Y(t) {
      return t instanceof Window
        ? t.pageYOffset >
            Math.max(
              0,
              t.document.documentElement.scrollHeight - t.innerHeight - 4
            )
        : t.scrollTop > Math.max(1, t.scrollHeight - t.clientHeight - 4);
    }
    function X(t, e) {
      for (let i = t, s = e; ;)
        if (3 == i.nodeType && s > 0) return { node: i, offset: s };
        else if (1 == i.nodeType && s > 0) {
          if ('false' == i.contentEditable) return null;
          s = P((i = i.childNodes[s - 1]));
        } else {
          if (!i.parentNode || V(i)) return null;
          ((s = L(i)), (i = i.parentNode));
        }
    }
    function $(t, e) {
      for (let i = t, s = e; ;)
        if (3 == i.nodeType && s < i.nodeValue.length)
          return { node: i, offset: s };
        else if (1 == i.nodeType && s < i.childNodes.length) {
          if ('false' == i.contentEditable) return null;
          ((i = i.childNodes[s]), (s = 0));
        } else {
          if (!i.parentNode || V(i)) return null;
          ((s = L(i) + 1), (i = i.parentNode));
        }
    }
    x.safari && x.safari_version >= 26 && (G = !1);
    let DOMPos = class DOMPos {
      constructor(t, e, i = !0) {
        ((this.node = t), (this.offset = e), (this.precise = i));
      }
      static before(t, e) {
        return new DOMPos(t.parentNode, L(t), e);
      }
      static after(t, e) {
        return new DOMPos(t.parentNode, L(t) + 1, e);
      }
    };
    var U =
      (((n = U || (U = {}))[(n.LTR = 0)] = 'LTR'), (n[(n.RTL = 1)] = 'RTL'), n);
    let Q = U.LTR,
      J = U.RTL;
    function Z(t) {
      let e = [];
      for (let i = 0; i < t.length; i++) e.push(1 << t[i]);
      return e;
    }
    let tt = Z(
        '88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008'
      ),
      te = Z(
        '4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333'
      ),
      ti = Object.create(null),
      ts = [];
    for (let t of ['()', '[]', '{}']) {
      let e = t.charCodeAt(0),
        i = t.charCodeAt(1);
      ((ti[e] = i), (ti[i] = -e));
    }
    function to(t) {
      return t <= 247
        ? tt[t]
        : 1424 <= t && t <= 1524
          ? 2
          : 1536 <= t && t <= 1785
            ? te[t - 1536]
            : 1774 <= t && t <= 2220
              ? 4
              : 8192 <= t && t <= 8204
                ? 256
                : 64336 <= t && t <= 65023
                  ? 4
                  : 1;
    }
    let tn = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
    let BidiSpan = class BidiSpan {
      get dir() {
        return this.level % 2 ? J : Q;
      }
      constructor(t, e, i) {
        ((this.from = t), (this.to = e), (this.level = i));
      }
      side(t, e) {
        return (this.dir == e) == t ? this.to : this.from;
      }
      forward(t, e) {
        return t == (this.dir == e);
      }
      static find(t, e, i, s) {
        let o = -1;
        for (let n = 0; n < t.length; n++) {
          let r = t[n];
          if (r.from <= e && r.to >= e) {
            if (r.level == i) return n;
            (o < 0 ||
              (0 != s
                ? s < 0
                  ? r.from < e
                  : r.to > e
                : t[o].level > r.level)) &&
              (o = n);
          }
        }
        if (o < 0) throw RangeError('Index out of range');
        return o;
      }
    };
    let tr = [];
    function tl(t) {
      return [new BidiSpan(0, t, 0)];
    }
    let ta = '',
      th = l.sj.define(),
      tc = l.sj.define(),
      td = l.sj.define(),
      tu = l.sj.define(),
      tf = l.sj.define(),
      tp = l.sj.define(),
      tg = l.sj.define(),
      tm = l.sj.define(),
      tw = l.sj.define(),
      tv = l.sj.define({ combine: t => t.some(t => t) }),
      tb = l.sj.define({ combine: t => t.some(t => t) }),
      ty = l.sj.define();
    let ScrollTarget = class ScrollTarget {
      constructor(t, e, i, s, o, n = !1) {
        ((this.range = t),
          (this.y = e),
          (this.x = i),
          (this.yMargin = s),
          (this.xMargin = o),
          (this.isSnapshot = n));
      }
      map(t) {
        return t.empty
          ? this
          : new ScrollTarget(
              this.range.map(t),
              this.y,
              this.x,
              this.yMargin,
              this.xMargin,
              this.isSnapshot
            );
      }
      clip(t) {
        return this.range.to <= t.doc.length
          ? this
          : new ScrollTarget(
              l.OF.cursor(t.doc.length),
              this.y,
              this.x,
              this.yMargin,
              this.xMargin,
              this.isSnapshot
            );
      }
    };
    let tx = l.Pe.define({ map: (t, e) => t.map(e) }),
      tM = l.Pe.define();
    function tS(t, e, i) {
      let s = t.facet(tu);
      s.length
        ? s[0](e)
        : (window.onerror && window.onerror(String(e), i, void 0, void 0, e)) ||
          (i ? console.error(i + ':', e) : console.error(e));
    }
    let tk = l.sj.define({ combine: t => !t.length || t[0] }),
      tC = 0,
      tT = l.sj.define({
        combine: t =>
          t.filter((e, i) => {
            for (let s = 0; s < i; s++) if (t[s].plugin == e.plugin) return !1;
            return !0;
          })
      });
    let ViewPlugin = class ViewPlugin {
      constructor(t, e, i, s, o) {
        ((this.id = t),
          (this.create = e),
          (this.domEventHandlers = i),
          (this.domEventObservers = s),
          (this.baseExtensions = o(this)),
          (this.extension = this.baseExtensions.concat(
            tT.of({ plugin: this, arg: void 0 })
          )));
      }
      of(t) {
        return this.baseExtensions.concat(tT.of({ plugin: this, arg: t }));
      }
      static define(t, e) {
        let {
          eventHandlers: i,
          eventObservers: s,
          provide: o,
          decorations: n
        } = e || {};
        return new ViewPlugin(tC++, t, i, s, t => {
          let e = [];
          return (
            n &&
              e.push(
                tD.of(e => {
                  let i = e.plugin(t);
                  return i ? n(i) : Decoration.none;
                })
              ),
            o && e.push(o(t)),
            e
          );
        });
      }
      static fromClass(t, e) {
        return ViewPlugin.define((e, i) => new t(e, i), e);
      }
    };
    let PluginInstance = class PluginInstance {
      constructor(t) {
        ((this.spec = t), (this.mustUpdate = null), (this.value = null));
      }
      get plugin() {
        return this.spec && this.spec.plugin;
      }
      update(t) {
        if (this.value) {
          if (this.mustUpdate) {
            let t = this.mustUpdate;
            if (((this.mustUpdate = null), this.value.update))
              try {
                this.value.update(t);
              } catch (e) {
                if (
                  (tS(t.state, e, 'CodeMirror plugin crashed'),
                  this.value.destroy)
                )
                  try {
                    this.value.destroy();
                  } catch (t) {}
                this.deactivate();
              }
          }
        } else if (this.spec)
          try {
            this.value = this.spec.plugin.create(t, this.spec.arg);
          } catch (e) {
            (tS(t.state, e, 'CodeMirror plugin crashed'), this.deactivate());
          }
        return this;
      }
      destroy(t) {
        var e;
        if (null == (e = this.value) ? void 0 : e.destroy)
          try {
            this.value.destroy();
          } catch (e) {
            tS(t.state, e, 'CodeMirror plugin crashed');
          }
      }
      deactivate() {
        this.spec = this.value = null;
      }
    };
    let tA = l.sj.define(),
      tO = l.sj.define(),
      tD = l.sj.define(),
      tB = l.sj.define(),
      tE = l.sj.define(),
      tR = l.sj.define(),
      tH = l.sj.define();
    function tL(t, e) {
      let i = t.state.facet(tH);
      if (!i.length) return i;
      let s = i.map(e => (e instanceof Function ? e(t) : e)),
        o = [];
      return (
        l.om.spans(s, e.from, e.to, {
          point() {},
          span(t, i, s, n) {
            let r = t - e.from,
              l = i - e.from,
              a = o;
            for (let t = s.length - 1; t >= 0; t--, n--) {
              let i = s[t].spec.bidiIsolate,
                o;
              if (
                (null == i &&
                  (i = (function (t, e, i) {
                    for (let s = e; s < i; s++) {
                      let e = to(t.charCodeAt(s));
                      if (1 == e) break;
                      if (2 == e || 4 == e) return J;
                    }
                    return Q;
                  })(e.text, r, l)),
                n > 0 &&
                  a.length &&
                  (o = a[a.length - 1]).to == r &&
                  o.direction == i)
              )
                ((o.to = l), (a = o.inner));
              else {
                let t = { from: r, to: l, direction: i, inner: [] };
                (a.push(t), (a = t.inner));
              }
            }
          }
        }),
        o
      );
    }
    let tV = l.sj.define();
    function tW(t) {
      let e = 0,
        i = 0,
        s = 0,
        o = 0;
      for (let n of t.state.facet(tV)) {
        let r = n(t);
        r &&
          (null != r.left && (e = Math.max(e, r.left)),
          null != r.right && (i = Math.max(i, r.right)),
          null != r.top && (s = Math.max(s, r.top)),
          null != r.bottom && (o = Math.max(o, r.bottom)));
      }
      return { left: e, right: i, top: s, bottom: o };
    }
    let tP = l.sj.define();
    let ChangedRange = class ChangedRange {
      constructor(t, e, i, s) {
        ((this.fromA = t), (this.toA = e), (this.fromB = i), (this.toB = s));
      }
      join(t) {
        return new ChangedRange(
          Math.min(this.fromA, t.fromA),
          Math.max(this.toA, t.toA),
          Math.min(this.fromB, t.fromB),
          Math.max(this.toB, t.toB)
        );
      }
      addToSet(t) {
        let e = t.length,
          i = this;
        for (; e > 0; e--) {
          let s = t[e - 1];
          if (!(s.fromA > i.toA)) {
            if (s.toA < i.fromA) break;
            ((i = i.join(s)), t.splice(e - 1, 1));
          }
        }
        return (t.splice(e, 0, i), t);
      }
      static extendWithRanges(t, e) {
        if (0 == e.length) return t;
        let i = [];
        for (let s = 0, o = 0, n = 0; ;) {
          let r = Math.min(
            s < t.length ? t[s].fromB : 1e9,
            o < e.length ? e[o] : 1e9
          );
          if (1e9 == r) break;
          let l = r + n,
            a = r,
            h = l;
          for (;;)
            if (o < e.length && e[o] <= a) {
              let i = e[o + 1];
              ((o += 2), (a = Math.max(a, i)));
              for (let e = s; e < t.length && t[e].fromB <= a; e++)
                n = t[e].toA - t[e].toB;
              h = Math.max(h, i + n);
            } else if (s < t.length && t[s].fromB <= a) {
              let e = t[s++];
              ((a = Math.max(a, e.toB)),
                (h = Math.max(h, e.toA)),
                (n = e.toA - e.toB));
            } else break;
          i.push(new ChangedRange(l, h, r, a));
        }
        return i;
      }
    };
    let ViewUpdate = class ViewUpdate {
      constructor(t, e, i) {
        for (let s of ((this.view = t),
        (this.state = e),
        (this.transactions = i),
        (this.flags = 0),
        (this.startState = t.state),
        (this.changes = l.VR.empty(this.startState.doc.length)),
        i))
          this.changes = this.changes.compose(s.changes);
        let s = [];
        (this.changes.iterChangedRanges((t, e, i, o) =>
          s.push(new ChangedRange(t, e, i, o))
        ),
          (this.changedRanges = s));
      }
      static create(t, e, i) {
        return new ViewUpdate(t, e, i);
      }
      get viewportChanged() {
        return (4 & this.flags) > 0;
      }
      get viewportMoved() {
        return (8 & this.flags) > 0;
      }
      get heightChanged() {
        return (2 & this.flags) > 0;
      }
      get geometryChanged() {
        return this.docChanged || (18 & this.flags) > 0;
      }
      get focusChanged() {
        return (1 & this.flags) > 0;
      }
      get docChanged() {
        return !this.changes.empty;
      }
      get selectionSet() {
        return this.transactions.some(t => t.selection);
      }
      get empty() {
        return 0 == this.flags && 0 == this.transactions.length;
      }
    };
    let tN = [];
    let Tile = class Tile {
      constructor(t, e, i = 0) {
        ((this.dom = t),
          (this.length = e),
          (this.flags = i),
          (this.parent = null),
          (t.cmTile = this));
      }
      get breakAfter() {
        return 1 & this.flags;
      }
      get children() {
        return tN;
      }
      isWidget() {
        return !1;
      }
      get isHidden() {
        return !1;
      }
      isComposite() {
        return !1;
      }
      isLine() {
        return !1;
      }
      isText() {
        return !1;
      }
      isBlock() {
        return !1;
      }
      get domAttrs() {
        return null;
      }
      sync(t) {
        if (((this.flags |= 2), 4 & this.flags)) {
          this.flags &= -5;
          let t = this.domAttrs;
          t &&
            (function (t, e) {
              for (let i = t.attributes.length - 1; i >= 0; i--) {
                let s = t.attributes[i].name;
                null == e[s] && t.removeAttribute(s);
              }
              for (let i in e) {
                let s = e[i];
                'style' == i
                  ? (t.style.cssText = s)
                  : t.getAttribute(i) != s && t.setAttribute(i, s);
              }
            })(this.dom, t);
        }
      }
      toString() {
        return (
          this.constructor.name +
          (this.children.length ? `(${this.children})` : '') +
          (this.breakAfter ? '#' : '')
        );
      }
      destroy() {
        this.parent = null;
      }
      setDOM(t) {
        ((this.dom = t), (t.cmTile = this));
      }
      get posAtStart() {
        return this.parent ? this.parent.posBefore(this) : 0;
      }
      get posAtEnd() {
        return this.posAtStart + this.length;
      }
      posBefore(t, e = this.posAtStart) {
        let i = e;
        for (let e of this.children) {
          if (e == t) return i;
          i += e.length + e.breakAfter;
        }
        throw RangeError('Invalid child in posBefore');
      }
      posAfter(t) {
        return this.posBefore(t) + t.length;
      }
      covers(t) {
        return !0;
      }
      coordsIn(t, e, i) {
        return null;
      }
      domPosFor(t, e) {
        let i = L(this.dom),
          s = this.length ? t > 0 : e > 0;
        return new DOMPos(
          this.parent.dom,
          i + +!!s,
          0 == t || t == this.length
        );
      }
      markDirty(t) {
        ((this.flags &= -3),
          t && (this.flags |= 4),
          this.parent && 2 & this.parent.flags && this.parent.markDirty(!1));
      }
      get overrideDOMText() {
        return null;
      }
      get root() {
        for (let t = this; t; t = t.parent) if (t instanceof DocTile) return t;
        return null;
      }
      static get(t) {
        return t.cmTile;
      }
    };
    let CompositeTile = class CompositeTile extends Tile {
      constructor(t) {
        (super(t, 0), (this._children = []));
      }
      isComposite() {
        return !0;
      }
      get children() {
        return this._children;
      }
      get lastChild() {
        return this.children.length
          ? this.children[this.children.length - 1]
          : null;
      }
      append(t) {
        (this.children.push(t), (t.parent = this));
      }
      sync(t) {
        if (2 & this.flags) return;
        super.sync(t);
        let e = this.dom,
          i = null,
          s,
          o = (null == t ? void 0 : t.node) == e ? t : null,
          n = 0;
        for (let r of this.children) {
          if (
            (r.sync(t),
            (n += r.length + r.breakAfter),
            (s = i ? i.nextSibling : e.firstChild),
            o && s != r.dom && (o.written = !0),
            r.dom.parentNode == e)
          )
            for (; s && s != r.dom;) s = tF(s);
          else e.insertBefore(r.dom, s);
          i = r.dom;
        }
        for (
          s = i ? i.nextSibling : e.firstChild, o && s && (o.written = !0);
          s;
        )
          s = tF(s);
        this.length = n;
      }
    };
    function tF(t) {
      let e = t.nextSibling;
      return (t.parentNode.removeChild(t), e);
    }
    let DocTile = class DocTile extends CompositeTile {
      constructor(t, e) {
        (super(e), (this.view = t));
      }
      owns(t) {
        for (; t; t = t.parent) if (t == this) return !0;
        return !1;
      }
      isBlock() {
        return !0;
      }
      nearest(t) {
        for (;;) {
          if (!t) return null;
          let e = Tile.get(t);
          if (e && this.owns(e)) return e;
          t = t.parentNode;
        }
      }
      blockTiles(t) {
        for (let e = [], i = this, s = 0, o = 0; ;)
          if (s == i.children.length) {
            if (!e.length) return;
            ((i = i.parent).breakAfter && o++, (s = e.pop()));
          } else {
            let n = i.children[s++];
            if (n instanceof BlockWrapperTile) (e.push(s), (i = n), (s = 0));
            else {
              let e = o + n.length,
                i = t(n, o);
              if (void 0 !== i) return i;
              o = e + n.breakAfter;
            }
          }
      }
      resolveBlock(t, e) {
        let i,
          s = -1,
          o,
          n = -1;
        if (
          (this.blockTiles((r, l) => {
            let a = l + r.length;
            if (t >= l && t <= a) {
              if (r.isWidget() && e >= -1 && e <= 1) {
                if (32 & r.flags) return !0;
                16 & r.flags && (i = void 0);
              }
              ((l < t || (t == a && (e < -1 ? r.length : r.covers(1)))) &&
                (!i || (!r.isWidget() && i.isWidget())) &&
                ((i = r), (s = t - l)),
                (a > t || (t == l && (e > 1 ? r.length : r.covers(-1)))) &&
                  (!o || (!r.isWidget() && o.isWidget())) &&
                  ((o = r), (n = t - l)));
            }
          }),
          !i && !o)
        )
          throw Error('No tile at position ' + t);
        return (i && e < 0) || !o
          ? { tile: i, offset: s }
          : { tile: o, offset: n };
      }
    };
    let BlockWrapperTile = class BlockWrapperTile extends CompositeTile {
      constructor(t, e) {
        (super(t), (this.wrapper = e));
      }
      isBlock() {
        return !0;
      }
      covers(t) {
        return (
          !!this.children.length &&
          (t < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1))
        );
      }
      get domAttrs() {
        return this.wrapper.attributes;
      }
      static of(t, e) {
        let i = new BlockWrapperTile(e || document.createElement(t.tagName), t);
        return (e || (i.flags |= 4), i);
      }
    };
    let LineTile = class LineTile extends CompositeTile {
      constructor(t, e) {
        (super(t), (this.attrs = e));
      }
      isLine() {
        return !0;
      }
      static start(t, e, i) {
        let s = new LineTile(e || document.createElement('div'), t);
        return ((e && i) || (s.flags |= 4), s);
      }
      get domAttrs() {
        return this.attrs;
      }
      resolveInline(t, e, i) {
        let s = null,
          o = -1,
          n = null,
          r = -1;
        !(function t(l, a) {
          for (let h = 0, c = 0; h < l.children.length && c <= a; h++) {
            let d = l.children[h],
              u = c + d.length;
            (u >= a &&
              (d.isComposite()
                ? t(d, a - c)
                : (!n ||
                      (n.isHidden &&
                        ((e > 0 && !(32 & n.flags)) ||
                          (i &&
                            (function (t, e) {
                              let i = t.coordsIn(0, 1),
                                s = e.coordsIn(0, 1);
                              return i && s && s.top < i.bottom;
                            })(n, d))))) &&
                    (u > a || (32 & d.flags && e <= 1))
                  ? ((n = d), (r = a - c))
                  : (c < a || (16 & d.flags && !d.isHidden && e >= -1)) &&
                    ((s = d), (o = a - c))),
              (c = u));
          }
        })(this, t);
        let l = (e < 0 ? s : n) || s || n;
        return l ? { tile: l, offset: l == s ? o : r } : null;
      }
      coordsIn(t, e, i) {
        let s = this.resolveInline(t, e, !0);
        return s
          ? s.tile.coordsIn(Math.max(0, s.offset), e, i)
          : (function (t) {
              let e = t.dom.lastChild;
              if (!e) return t.dom.getBoundingClientRect();
              let i = R(e);
              return i[i.length - 1] || null;
            })(this);
      }
      domIn(t, e) {
        let i = this.resolveInline(t, e);
        if (i) {
          let { tile: t, offset: s } = i;
          if (this.dom.contains(t.dom))
            return t.isText()
              ? new DOMPos(t.dom, Math.min(t.dom.nodeValue.length, s))
              : t.domPosFor(s, 16 & t.flags ? 1 : 32 & t.flags ? -1 : e);
          let o = i.tile.parent,
            n = !1;
          for (let t of o.children) {
            if (n) return new DOMPos(t.dom, 0);
            t == i.tile && (n = !0);
          }
        }
        return new DOMPos(this.dom, 0);
      }
    };
    let MarkTile = class MarkTile extends CompositeTile {
      constructor(t, e) {
        (super(t), (this.mark = e));
      }
      get domAttrs() {
        return this.mark.attrs;
      }
      static of(t, e) {
        let i = new MarkTile(e || document.createElement(t.tagName), t);
        return (e || (i.flags |= 4), i);
      }
    };
    let TextTile = class TextTile extends Tile {
      constructor(t, e) {
        (super(t, e.length), (this.text = e));
      }
      sync(t) {
        2 & this.flags ||
          (super.sync(t),
          this.dom.nodeValue != this.text &&
            (t && t.node == this.dom && (t.written = !0),
            (this.dom.nodeValue = this.text)));
      }
      isText() {
        return !0;
      }
      toString() {
        return JSON.stringify(this.text);
      }
      coordsIn(t, e, i) {
        let s = this.dom.nodeValue.length;
        t > s && (t = s);
        let o = t,
          n = t,
          r = 0;
        (0 == t && e < 0) || (t == s && e >= 0)
          ? !(x.chrome || x.gecko) &&
            (t ? (o--, (r = 1)) : n < s && (n++, (r = -1)))
          : e < 0
            ? o--
            : n < s && n++;
        let l = j(this.dom, o, n).getClientRects();
        if (!l.length) return null;
        let a = l[(r ? r < 0 : e >= 0) ? 0 : l.length - 1];
        return (
          x.safari &&
            !r &&
            0 == a.width &&
            (a = Array.prototype.find.call(l, t => t.width) || a),
          null == i ? a : N(a, (r ? r > 0 : e < 0) == i)
        );
      }
      static of(t, e) {
        let i = new TextTile(e || document.createTextNode(t), t);
        return (e || (i.flags |= 2), i);
      }
    };
    let WidgetTile = class WidgetTile extends Tile {
      constructor(t, e, i, s) {
        (super(t, e, s), (this.widget = i));
      }
      isWidget() {
        return !0;
      }
      get isHidden() {
        return this.widget.isHidden;
      }
      covers(t) {
        return !(48 & this.flags) && (this.flags & (t < 0 ? 64 : 128)) > 0;
      }
      coordsIn(t, e) {
        return this.coordsInWidget(t, e, !1);
      }
      coordsInWidget(t, e, i) {
        let s = this.widget.coordsAt(this.dom, t, e);
        if (s) return s;
        if (i)
          return N(
            this.dom.getBoundingClientRect(),
            this.length ? 0 == t : e <= 0
          );
        {
          let e = this.dom.getClientRects(),
            i = null;
          if (!e.length) return null;
          let s = !!(16 & this.flags) || (!(32 & this.flags) && t > 0);
          for (
            let o = s ? e.length - 1 : 0;
            (i = e[o]),
              t > 0 ? 0 != o : o != e.length - 1 && !(i.top < i.bottom);
            o += s ? -1 : 1
          );
          return N(i, !s);
        }
      }
      get overrideDOMText() {
        if (!this.length) return l.EY.empty;
        let { root: t } = this;
        if (!t) return l.EY.empty;
        let e = this.posAtStart;
        return t.view.state.doc.slice(e, e + this.length);
      }
      destroy() {
        (super.destroy(), this.widget.destroy(this.dom));
      }
      static of(t, e, i, s, o) {
        return (
          !o && ((o = t.toDOM(e)), t.editable || (o.contentEditable = 'false')),
          new WidgetTile(o, i, t, s)
        );
      }
    };
    let WidgetBufferTile = class WidgetBufferTile extends Tile {
      constructor(t) {
        let e = document.createElement('img');
        ((e.className = 'cm-widgetBuffer'),
          e.setAttribute('aria-hidden', 'true'),
          super(e, 0, t));
      }
      get isHidden() {
        return !0;
      }
      get overrideDOMText() {
        return l.EY.empty;
      }
      coordsIn(t, e, i) {
        let s = this.dom.getBoundingClientRect();
        return null == i ? s : N(s, e > 0 == i);
      }
    };
    let TilePointer = class TilePointer {
      constructor(t) {
        ((this.index = 0),
          (this.beforeBreak = !1),
          (this.parents = []),
          (this.tile = t));
      }
      advance(t, e, i) {
        let { tile: s, index: o, beforeBreak: n, parents: r } = this;
        for (; t || e > 0;)
          if (s.isComposite())
            if (n) {
              if (!t) break;
              (i && i.break(), t--, (n = !1));
            } else if (o == s.children.length) {
              if (!t && !r.length) break;
              (i && i.leave(s),
                (n = !!s.breakAfter),
                ({ tile: s, index: o } = r.pop()),
                o++);
            } else {
              let l = s.children[o],
                a = l.breakAfter;
              (e > 0 ? l.length <= t : l.length < t) &&
              (!i || !1 !== i.skip(l, 0, l.length) || !l.isComposite)
                ? ((n = !!a), o++, (t -= l.length))
                : (r.push({ tile: s, index: o }),
                  (s = l),
                  (o = 0),
                  i && l.isComposite() && i.enter(l));
            }
          else {
            let e = s.length;
            if (o < e && t) {
              let n = Math.min(t, e - o);
              (i && i.skip(s, o, o + n), (t -= n), (o += n));
            }
            if (o == e)
              ((n = !!s.breakAfter), ({ tile: s, index: o } = r.pop()), o++);
            else if (!t) break;
          }
        return (
          (this.tile = s),
          (this.index = o),
          (this.beforeBreak = n),
          this
        );
      }
      get root() {
        return this.parents.length ? this.parents[0].tile : this.tile;
      }
    };
    let OpenWrapper = class OpenWrapper {
      constructor(t, e, i, s) {
        ((this.from = t), (this.to = e), (this.wrapper = i), (this.rank = s));
      }
    };
    let TileBuilder = class TileBuilder {
      constructor(t, e, i) {
        ((this.cache = t),
          (this.root = e),
          (this.blockWrappers = i),
          (this.curLine = null),
          (this.lastBlock = null),
          (this.afterWidget = null),
          (this.pos = 0),
          (this.wrappers = []),
          (this.wrapperPos = 0));
      }
      addText(t, e, i, s) {
        var o;
        this.flushBuffer();
        let n = this.ensureMarks(e, i),
          r = n.lastChild;
        (r && r.isText() && !(8 & r.flags) && r.length + t.length < 512
          ? (this.cache.reused.set(r, 2),
            ((n.children[n.children.length - 1] = new TextTile(
              r.dom,
              r.text + t
            )).parent = n))
          : n.append(
              s ||
                TextTile.of(
                  t,
                  null == (o = this.cache.find(TextTile)) ? void 0 : o.dom
                )
            ),
          (this.pos += t.length),
          (this.afterWidget = null));
      }
      addComposition(t, e) {
        let i = this.curLine;
        i.dom != e.line.dom &&
          (i.setDOM(
            this.cache.reused.has(e.line) ? tG(e.line.dom) : e.line.dom
          ),
          this.cache.reused.set(e.line, 2));
        let s = i;
        for (let t = e.marks.length - 1; t >= 0; t--) {
          let i = e.marks[t],
            o = s.lastChild;
          if (o instanceof MarkTile && o.mark.eq(i.mark))
            (o.dom != i.dom && o.setDOM(tG(i.dom)), (s = o));
          else {
            if (this.cache.reused.get(i)) {
              let t = Tile.get(i.dom);
              t && t.setDOM(tG(i.dom));
            }
            let t = MarkTile.of(i.mark, i.dom);
            (s.append(t), (s = t));
          }
          this.cache.reused.set(i, 2);
        }
        let o = Tile.get(t.text);
        o && this.cache.reused.set(o, 2);
        let n = new TextTile(t.text, t.text.nodeValue);
        ((n.flags |= 8), (this.pos = t.range.toB), s.append(n));
      }
      addInlineWidget(t, e, i) {
        let s =
          this.afterWidget &&
          48 & t.flags &&
          (48 & this.afterWidget.flags) == (48 & t.flags);
        s || this.flushBuffer();
        let o = this.ensureMarks(e, i);
        (s || 16 & t.flags || o.append(this.getBuffer(1)),
          o.append(t),
          (this.pos += t.length),
          (this.afterWidget = t));
      }
      addMark(t, e, i) {
        (this.flushBuffer(),
          this.ensureMarks(e, i).append(t),
          (this.pos += t.length),
          (this.afterWidget = null));
      }
      addBlockWidget(t) {
        (this.getBlockPos().append(t),
          (this.pos += t.length),
          (this.lastBlock = t),
          this.endLine());
      }
      continueWidget(t) {
        let e = this.afterWidget || this.lastBlock;
        ((e.length += t), (this.pos += t));
      }
      addLineStart(t, e) {
        var i;
        t || (t = tK);
        let s = LineTile.start(
          t,
          e || (null == (i = this.cache.find(LineTile)) ? void 0 : i.dom),
          !!e
        );
        this.getBlockPos().append((this.lastBlock = this.curLine = s));
      }
      addLine(t) {
        (this.getBlockPos().append(t),
          (this.pos += t.length),
          (this.lastBlock = t),
          this.endLine());
      }
      addBreak() {
        ((this.lastBlock.flags |= 1), this.endLine(), this.pos++);
      }
      addLineStartIfNotCovered(t) {
        this.blockPosCovered() || this.addLineStart(t);
      }
      ensureLine(t) {
        this.curLine || this.addLineStart(t);
      }
      ensureMarks(t, e) {
        var i;
        let s = this.curLine;
        for (let o = t.length - 1; o >= 0; o--) {
          let n = t[o],
            r;
          if (
            e > 0 &&
            (r = s.lastChild) &&
            r instanceof MarkTile &&
            r.mark.eq(n)
          )
            ((s = r), e--);
          else {
            let t = MarkTile.of(
              n,
              null == (i = this.cache.find(MarkTile, t => t.mark.eq(n)))
                ? void 0
                : i.dom
            );
            (s.append(t), (s = t), (e = 0));
          }
        }
        return s;
      }
      endLine() {
        if (this.curLine) {
          this.flushBuffer();
          let t = this.curLine.lastChild;
          ((!t ||
            !tz(this.curLine, !1) ||
            ('BR' != t.dom.nodeName &&
              t.isWidget() &&
              !(x.ios && tz(this.curLine, !0)))) &&
            this.curLine.append(
              this.cache.findWidget(tq, 0, 32) ||
                new WidgetTile(tq.toDOM(), 0, tq, 32)
            ),
            (this.curLine = this.afterWidget = null));
        }
      }
      updateBlockWrappers() {
        this.wrapperPos > this.pos + 1e4 &&
          (this.blockWrappers.goto(this.pos), (this.wrappers.length = 0));
        for (let t = this.wrappers.length - 1; t >= 0; t--)
          this.wrappers[t].to < this.pos && this.wrappers.splice(t, 1);
        for (
          let t = this.blockWrappers;
          t.value && t.from <= this.pos;
          t.next()
        )
          if (t.to >= this.pos) {
            let e = 102 * t.rank + t.value.rank,
              i = new OpenWrapper(t.from, t.to, t.value, e),
              s = this.wrappers.length;
            for (
              ;
              s > 0 &&
              0 >
                (this.wrappers[s - 1].rank - i.rank ||
                  this.wrappers[s - 1].to - i.to);
            )
              s--;
            this.wrappers.splice(s, 0, i);
          }
        this.wrapperPos = this.pos;
      }
      getBlockPos() {
        var t;
        this.updateBlockWrappers();
        let e = this.root;
        for (let i of this.wrappers) {
          let s = e.lastChild;
          if (
            i.from < this.pos &&
            s instanceof BlockWrapperTile &&
            s.wrapper.eq(i.wrapper)
          )
            e = s;
          else {
            let s = BlockWrapperTile.of(
              i.wrapper,
              null ==
                (t = this.cache.find(BlockWrapperTile, t =>
                  t.wrapper.eq(i.wrapper)
                ))
                ? void 0
                : t.dom
            );
            (e.append(s), (e = s));
          }
        }
        return e;
      }
      blockPosCovered() {
        let t = this.lastBlock;
        return (
          null != t && !t.breakAfter && (!t.isWidget() || (160 & t.flags) > 0)
        );
      }
      getBuffer(t) {
        let e = 2 | (t < 0 ? 16 : 32),
          i = this.cache.find(WidgetBufferTile, void 0, 1);
        return (i && (i.flags = e), i || new WidgetBufferTile(e));
      }
      flushBuffer() {
        this.afterWidget &&
          !(32 & this.afterWidget.flags) &&
          (this.afterWidget.parent.append(this.getBuffer(-1)),
          (this.afterWidget = null));
      }
    };
    let TextStream = class TextStream {
      constructor(t) {
        ((this.skipCount = 0),
          (this.text = ''),
          (this.textOff = 0),
          (this.cursor = t.iter()));
      }
      skip(t) {
        this.textOff + t <= this.text.length
          ? (this.textOff += t)
          : ((this.skipCount += t - (this.text.length - this.textOff)),
            (this.text = ''),
            (this.textOff = 0));
      }
      next(t) {
        if (this.textOff == this.text.length) {
          let {
            value: e,
            lineBreak: i,
            done: s
          } = this.cursor.next(this.skipCount);
          if (((this.skipCount = 0), s))
            throw Error('Ran out of text content when drawing inline views');
          this.text = e;
          let o = (this.textOff = Math.min(t, e.length));
          return i ? null : e.slice(0, o);
        }
        let e = Math.min(this.text.length, this.textOff + t),
          i = this.text.slice(this.textOff, e);
        return ((this.textOff = e), i);
      }
    };
    let tI = [
      WidgetTile,
      LineTile,
      TextTile,
      MarkTile,
      WidgetBufferTile,
      BlockWrapperTile,
      DocTile
    ];
    for (let t = 0; t < tI.length; t++) tI[t].bucket = t;
    let TileCache = class TileCache {
      constructor(t) {
        ((this.view = t),
          (this.buckets = tI.map(() => [])),
          (this.index = tI.map(() => 0)),
          (this.reused = new Map()));
      }
      add(t) {
        let e = t.constructor.bucket,
          i = this.buckets[e];
        i.length < 6
          ? i.push(t)
          : (i[(this.index[e] = (this.index[e] + 1) % 6)] = t);
      }
      find(t, e, i = 2) {
        let s = t.bucket,
          o = this.buckets[s],
          n = this.index[s];
        for (let t = 0; t < o.length; t++) {
          let r = (t + n) % o.length,
            l = o[r];
          if ((!e || e(l)) && !this.reused.has(l))
            return (
              o.splice(r, 1),
              r < n && this.index[s]--,
              this.reused.set(l, i),
              l
            );
        }
        return null;
      }
      findWidget(t, e, i) {
        let s = this.buckets[0];
        if (s.length)
          for (let o = 0, n = 0; ; o++) {
            if (o == s.length) {
              if (n) return null;
              ((n = 1), (o = 0));
            }
            let r = s[o];
            if (
              !this.reused.has(r) &&
              (0 == n
                ? r.widget.compare(t)
                : r.widget.constructor == t.constructor &&
                  t.updateDOM(r.dom, this.view, r.widget))
            ) {
              if (
                (s.splice(o, 1),
                o < this.index[0] && this.index[0]--,
                r.widget == t && r.length == e && (497 & r.flags) == i)
              )
                return (this.reused.set(r, 1), r);
              return (
                this.reused.set(r, 2),
                new WidgetTile(r.dom, e, t, (-498 & r.flags) | i)
              );
            }
          }
      }
      reuse(t) {
        return (this.reused.set(t, 1), t);
      }
      maybeReuse(t, e = 2) {
        if (!this.reused.has(t)) return (this.reused.set(t, e), t.dom);
      }
      clear() {
        for (let t = 0; t < this.buckets.length; t++)
          this.buckets[t].length = this.index[t] = 0;
      }
    };
    let TileUpdate = class TileUpdate {
      constructor(t, e, i, s, o) {
        ((this.view = t),
          (this.decorations = s),
          (this.disallowBlockEffectsFor = o),
          (this.openWidget = !1),
          (this.openMarks = 0),
          (this.cache = new TileCache(t)),
          (this.text = new TextStream(t.state.doc)),
          (this.builder = new TileBuilder(
            this.cache,
            new DocTile(t, t.contentDOM),
            l.om.iter(i)
          )),
          this.cache.reused.set(e, 2),
          (this.old = new TilePointer(e)),
          (this.reuseWalker = {
            skip: (t, e, i) => {
              if ((this.cache.add(t), t.isComposite())) return !1;
            },
            enter: t => this.cache.add(t),
            leave: () => {},
            break: () => {}
          }));
      }
      run(t, e) {
        let i = e && this.getCompositionContext(e.text);
        for (let s = 0, o = 0, n = 0; ;) {
          let r = n < t.length ? t[n++] : null,
            l = r ? r.fromA : this.old.root.length;
          if (l > s) {
            let t = l - s;
            (this.preserve(t, !n, !r), (s = l), (o += t));
          }
          if (!r) break;
          (e && r.fromA <= e.range.fromA && r.toA >= e.range.toA
            ? (this.forward(
                r.fromA,
                e.range.fromA,
                e.range.fromA < e.range.toA ? 1 : -1
              ),
              this.emit(o, e.range.fromB),
              this.builder.flushBuffer(),
              this.cache.clear(),
              this.builder.addComposition(e, i),
              this.text.skip(e.range.toB - e.range.fromB),
              this.forward(e.range.fromA, r.toA),
              this.emit(e.range.toB, r.toB))
            : (this.forward(r.fromA, r.toA), this.emit(o, r.toB)),
            (o = r.toB),
            (s = r.toA));
        }
        return (
          this.builder.curLine && this.builder.endLine(),
          this.builder.root
        );
      }
      preserve(t, e, i) {
        let s = (function (t) {
            let e = [];
            for (let i = t.parents.length; i > 1; i--) {
              let s = i == t.parents.length ? t.tile : t.parents[i].tile;
              s instanceof MarkTile && e.push(s.mark);
            }
            return e;
          })(this.old),
          o = this.openMarks;
        (this.old.advance(t, i ? 1 : -1, {
          skip: (t, e, i) => {
            if (t.isWidget())
              if (this.openWidget) this.builder.continueWidget(i - e);
              else {
                let n =
                  i > 0 || e < t.length
                    ? WidgetTile.of(
                        t.widget,
                        this.view,
                        i - e,
                        496 & t.flags,
                        this.cache.maybeReuse(t)
                      )
                    : this.cache.reuse(t);
                256 & n.flags
                  ? ((n.flags &= -2), this.builder.addBlockWidget(n))
                  : (this.builder.ensureLine(null),
                    this.builder.addInlineWidget(n, s, o),
                    (o = s.length));
              }
            else if (t.isText())
              (this.builder.ensureLine(null),
                e || i != t.length || this.cache.reused.has(t)
                  ? (this.cache.add(t),
                    this.builder.addText(t.text.slice(e, i), s, o))
                  : this.builder.addText(t.text, s, o, this.cache.reuse(t)),
                (o = s.length));
            else if (t.isLine())
              ((t.flags &= -2),
                this.cache.reused.set(t, 1),
                this.builder.addLine(t));
            else if (t instanceof WidgetBufferTile) this.cache.add(t);
            else {
              if (!(t instanceof MarkTile)) return !1;
              (this.builder.ensureLine(null),
                this.builder.addMark(t, s, o),
                this.cache.reused.set(t, 1),
                (o = s.length));
            }
            this.openWidget = !1;
          },
          enter: t => {
            (t.isLine()
              ? this.builder.addLineStart(t.attrs, this.cache.maybeReuse(t))
              : (this.cache.add(t), t instanceof MarkTile && s.unshift(t.mark)),
              (this.openWidget = !1));
          },
          leave: t => {
            t.isLine()
              ? s.length && (s.length = o = 0)
              : t instanceof MarkTile &&
                (s.shift(), (o = Math.min(o, s.length)));
          },
          break: () => {
            (this.builder.addBreak(), (this.openWidget = !1));
          }
        }),
          this.text.skip(t));
      }
      emit(t, e) {
        let i = null,
          s = this.builder,
          o = -1,
          n = l.om.spans(this.decorations, t, e, {
            point: (t, e, n, r, l, a) => {
              var h, c, d;
              if (n instanceof PointDecoration) {
                if (this.disallowBlockEffectsFor[a]) {
                  if (n.block)
                    throw RangeError(
                      'Block decorations may not be specified via plugins'
                    );
                  if (e > this.view.state.doc.lineAt(t).to)
                    throw RangeError(
                      'Decorations that replace line breaks may not be specified via plugins'
                    );
                }
                if (((o = r.length), l > r.length)) s.continueWidget(e - t);
                else {
                  let o,
                    a =
                      n.widget ||
                      (n.block ? NullWidget.block : NullWidget.inline),
                    c =
                      ((o = (h = n).isReplace
                        ? (64 * (h.startSide < 0)) | (128 * (h.endSide > 0))
                        : h.startSide > 0
                          ? 32
                          : 16),
                      h.block && (o |= 256),
                      o),
                    d =
                      this.cache.findWidget(a, e - t, c) ||
                      WidgetTile.of(a, this.view, e - t, c);
                  n.block
                    ? (n.startSide > 0 && s.addLineStartIfNotCovered(i),
                      s.addBlockWidget(d))
                    : (s.ensureLine(i), s.addInlineWidget(d, r, l));
                }
                i = null;
              } else {
                let t, e;
                ((c = i),
                  (t = (d = n).spec.attributes),
                  (e = d.spec.class),
                  (t || e) &&
                    (c || (c = { class: 'cm-line' }),
                    t && M(t, c),
                    e && (c.class += ' ' + e)),
                  (i = c));
              }
              e > t && this.text.skip(e - t);
            },
            span: (t, e, n, r) => {
              for (let o = t; o < e;) {
                let l = this.text.next(Math.min(512, e - o));
                (null == l
                  ? (s.addLineStartIfNotCovered(i), s.addBreak(), o++)
                  : (s.ensureLine(i),
                    s.addText(l, n, o == t ? r : n.length),
                    (o += l.length)),
                  (i = null));
              }
              o = n.length;
            }
          });
        (o > -1 && (this.openWidget = n > o),
          this.openWidget || s.addLineStartIfNotCovered(i),
          (this.openMarks = n));
      }
      forward(t, e, i = 1) {
        e - t <= 10
          ? this.old.advance(e - t, i, this.reuseWalker)
          : (this.old.advance(5, -1, this.reuseWalker),
            this.old.advance(e - t - 10, -1),
            this.old.advance(5, i, this.reuseWalker));
      }
      getCompositionContext(t) {
        let e = [],
          i = null;
        for (let s = t.parentNode; ; s = s.parentNode) {
          let t = Tile.get(s);
          if (s == this.view.contentDOM) break;
          t instanceof MarkTile
            ? e.push(t)
            : (null == t ? void 0 : t.isLine())
              ? (i = t)
              : t instanceof BlockWrapperTile ||
                ('DIV' != s.nodeName || i || s == this.view.contentDOM
                  ? i ||
                    e.push(
                      MarkTile.of(
                        new MarkDecoration({
                          tagName: s.nodeName.toLowerCase(),
                          attributes: (function (t) {
                            let e = Object.create(null);
                            for (let i = 0; i < t.attributes.length; i++) {
                              let s = t.attributes[i];
                              e[s.name] = s.value;
                            }
                            return e;
                          })(s)
                        }),
                        s
                      )
                    )
                  : (i = new LineTile(s, tK)));
        }
        return { line: i, marks: e };
      }
    };
    function tz(t, e) {
      let i = t => {
        for (let s of t.children)
          if ((e ? s.isText() : s.length) || i(s)) return !0;
        return !1;
      };
      return i(t);
    }
    let tK = { class: 'cm-line' };
    function tG(t) {
      let e = Tile.get(t);
      return (e && e.setDOM(t.cloneNode()), t);
    }
    let NullWidget = class NullWidget extends WidgetType {
      constructor(t) {
        (super(), (this.tag = t));
      }
      eq(t) {
        return t.tag == this.tag;
      }
      toDOM() {
        return document.createElement(this.tag);
      }
      updateDOM(t) {
        return t.nodeName.toLowerCase() == this.tag;
      }
      get isHidden() {
        return !0;
      }
    };
    ((NullWidget.inline = new NullWidget('span')),
      (NullWidget.block = new NullWidget('div')));
    let tq = new (class extends WidgetType {
      toDOM() {
        return document.createElement('br');
      }
      get isHidden() {
        return !0;
      }
      get editable() {
        return !0;
      }
    })();
    let DocView = class DocView {
      constructor(t) {
        ((this.view = t),
          (this.decorations = []),
          (this.blockWrappers = []),
          (this.dynamicDecorationMap = [!1]),
          (this.domChanged = null),
          (this.hasComposition = null),
          (this.editContextFormatting = Decoration.none),
          (this.lastCompositionAfterCursor = !1),
          (this.minWidth = 0),
          (this.minWidthFrom = 0),
          (this.minWidthTo = 0),
          (this.impreciseAnchor = null),
          (this.impreciseHead = null),
          (this.forceSelection = !1),
          (this.lastUpdate = Date.now()),
          this.updateDeco(),
          (this.tile = new DocTile(t, t.contentDOM)),
          this.updateInner(
            [new ChangedRange(0, 0, 0, t.state.doc.length)],
            null
          ));
      }
      update(t) {
        var e, i, s, o, n, r, a, h, c;
        let d,
          u,
          f,
          p = t.changedRanges;
        (this.minWidth > 0 &&
          p.length &&
          (p.every(
            ({ fromA: t, toA: e }) =>
              e < this.minWidthFrom || t > this.minWidthTo
          )
            ? ((this.minWidthFrom = t.changes.mapPos(this.minWidthFrom, 1)),
              (this.minWidthTo = t.changes.mapPos(this.minWidthTo, 1)))
            : (this.minWidth = this.minWidthFrom = this.minWidthTo = 0)),
          this.updateEditContextFormatting(t));
        let g = -1;
        this.view.inputState.composing >= 0 &&
          !this.view.observer.editContext &&
          ((null == (e = this.domChanged) ? void 0 : e.newSel)
            ? (g = this.domChanged.newSel.head)
            : ((i = t.changes),
              (s = this.hasComposition),
              (d = !1),
              s &&
                i.iterChangedRanges((t, e) => {
                  t < s.to && e > s.from && (d = !0);
                }),
              d || t.selectionSet || (g = t.state.selection.main.head)));
        let m =
          g > -1
            ? (function (t, e, i) {
                let s = t_(t, i);
                if (!s) return null;
                let { node: o, from: n, to: r } = s,
                  l = o.nodeValue;
                if (
                  /[\n\r]/.test(l) ||
                  t.state.doc.sliceString(s.from, s.to) != l
                )
                  return null;
                let a = e.invertedDesc;
                return {
                  range: new ChangedRange(a.mapPos(n), a.mapPos(r), n, r),
                  text: o
                };
              })(this.view, t.changes, g)
            : null;
        if (((this.domChanged = null), this.hasComposition)) {
          let { from: e, to: i } = this.hasComposition;
          p = new ChangedRange(
            e,
            i,
            t.changes.mapPos(e, -1),
            t.changes.mapPos(i, 1)
          ).addToSet(p.slice());
        }
        ((this.hasComposition = m
          ? { from: m.range.fromB, to: m.range.toB }
          : null),
          (x.ie || x.chrome) &&
            !m &&
            t &&
            t.state.doc.lines != t.startState.doc.lines &&
            (this.forceSelection = !0));
        let w = this.decorations,
          v = this.blockWrappers;
        this.updateDeco();
        let b =
          ((o = w),
          (n = this.decorations),
          (r = t.changes),
          (u = new tY()),
          l.om.compare(o, n, r, u),
          u.changes);
        b.length && (p = ChangedRange.extendWithRanges(p, b));
        let y =
          ((a = v),
          (h = this.blockWrappers),
          (c = t.changes),
          (f = new WrapperComparator()),
          l.om.compare(a, h, c, f),
          f.changes);
        return (
          y.length && (p = ChangedRange.extendWithRanges(p, y)),
          m &&
            !p.some(t => t.fromA <= m.range.fromA && t.toA >= m.range.toA) &&
            (p = m.range.addToSet(p.slice())),
          (!(2 & this.tile.flags) || 0 != p.length) &&
            (this.updateInner(p, m),
            t.transactions.length && (this.lastUpdate = Date.now()),
            !0)
        );
      }
      updateInner(t, e) {
        this.view.viewState.mustMeasureContent = !0;
        let { observer: i } = this.view;
        i.ignore(() => {
          if (e || t.length) {
            let i = this.tile,
              s = new TileUpdate(
                this.view,
                i,
                this.blockWrappers,
                this.decorations,
                this.dynamicDecorationMap
              );
            (e && Tile.get(e.text) && s.cache.reused.set(Tile.get(e.text), 2),
              (this.tile = s.run(t, e)),
              tj(i, s.cache.reused));
          }
          ((this.tile.dom.style.height =
            this.view.viewState.contentHeight / this.view.scaleY + 'px'),
            (this.tile.dom.style.flexBasis = this.minWidth
              ? this.minWidth + 'px'
              : ''));
          let s =
            x.chrome || x.ios
              ? { node: i.selectionRange.focusNode, written: !1 }
              : void 0;
          (this.tile.sync(s),
            s &&
              (s.written ||
                i.selectionRange.focusNode != s.node ||
                !this.tile.dom.contains(s.node)) &&
              (this.forceSelection = !0),
            (this.tile.dom.style.height = ''));
        });
        let s = [];
        if (
          this.view.viewport.from ||
          this.view.viewport.to < this.view.state.doc.length
        )
          for (let t of this.tile.children)
            t.isWidget() && t.widget instanceof BlockGapWidget && s.push(t.dom);
        i.updateGaps(s);
      }
      updateEditContextFormatting(t) {
        for (let e of ((this.editContextFormatting =
          this.editContextFormatting.map(t.changes)),
        t.transactions))
          for (let t of e.effects)
            t.is(tM) && (this.editContextFormatting = t.value);
      }
      updateSelection(t = !1, e = !1) {
        var i;
        (t || !this.view.observer.selectionRange.focusNode) &&
          this.view.observer.readSelectionRange();
        let { dom: s } = this.tile,
          o = this.view.root.activeElement,
          n = o == s,
          r =
            !n &&
            !(this.view.state.facet(tk) || s.tabIndex > -1) &&
            E(s, this.view.observer.selectionRange) &&
            !(o && s.contains(o));
        if (!(n || e || r)) return;
        let l = this.forceSelection;
        this.forceSelection = !1;
        let a = this.view.state.selection.main,
          h,
          c;
        if (
          (a.empty
            ? (c = h = this.inlineDOMNearPos(a.anchor, a.assoc || 1))
            : ((c = this.inlineDOMNearPos(a.head, a.head == a.from ? 1 : -1)),
              (h = this.inlineDOMNearPos(
                a.anchor,
                a.anchor == a.from ? 1 : -1
              ))),
          x.gecko &&
            a.empty &&
            !this.hasComposition &&
            1 == (i = h).node.nodeType &&
            i.node.firstChild &&
            (0 == i.offset ||
              'false' == i.node.childNodes[i.offset - 1].contentEditable) &&
            (i.offset == i.node.childNodes.length ||
              'false' == i.node.childNodes[i.offset].contentEditable))
        ) {
          let t = document.createTextNode('');
          (this.view.observer.ignore(() =>
            h.node.insertBefore(t, h.node.childNodes[h.offset] || null)
          ),
            (h = c = new DOMPos(t, 0)),
            (l = !0));
        }
        let d = this.view.observer.selectionRange;
        ((!l &&
          d.focusNode &&
          ((H(h.node, h.offset, d.anchorNode, d.anchorOffset) &&
            H(c.node, c.offset, d.focusNode, d.focusOffset)) ||
            this.suppressWidgetCursorChange(d, a))) ||
          (this.view.observer.ignore(() => {
            x.android &&
              x.chrome &&
              s.contains(d.focusNode) &&
              (function (t, e) {
                for (let i = t; i && i != e; i = i.assignedSlot || i.parentNode)
                  if (1 == i.nodeType && 'false' == i.contentEditable)
                    return !0;
                return !1;
              })(d.focusNode, s) &&
              (s.blur(), s.focus({ preventScroll: !0 }));
            let t = D(this.view.root);
            if (t)
              if (a.empty) {
                if (x.gecko) {
                  var e, i;
                  let t =
                    ((e = h.node),
                    (i = h.offset),
                    1 != e.nodeType
                      ? 0
                      : (i && 'false' == e.childNodes[i - 1].contentEditable
                          ? 1
                          : 0) |
                        (2 *
                          (i < e.childNodes.length &&
                            'false' == e.childNodes[i].contentEditable)));
                  if (t && 3 != t) {
                    let e = (1 == t ? X : $)(h.node, h.offset);
                    e && (h = new DOMPos(e.node, e.offset));
                  }
                }
                (t.collapse(h.node, h.offset),
                  null != a.bidiLevel &&
                    void 0 !== t.caretBidiLevel &&
                    (t.caretBidiLevel = a.bidiLevel));
              } else if (t.extend) {
                t.collapse(h.node, h.offset);
                try {
                  t.extend(c.node, c.offset);
                } catch (t) {}
              } else {
                let e = document.createRange();
                (a.anchor > a.head && ([h, c] = [c, h]),
                  e.setEnd(c.node, c.offset),
                  e.setStart(h.node, h.offset),
                  t.removeAllRanges(),
                  t.addRange(e));
              }
            r &&
              this.view.root.activeElement == s &&
              (s.blur(), o && o.focus());
          }),
          this.view.observer.setSelectionRange(h, c)),
          (this.impreciseAnchor = h.precise
            ? null
            : new DOMPos(d.anchorNode, d.anchorOffset)),
          (this.impreciseHead = c.precise
            ? null
            : new DOMPos(d.focusNode, d.focusOffset)));
      }
      suppressWidgetCursorChange(t, e) {
        return (
          this.hasComposition &&
          e.empty &&
          H(t.focusNode, t.focusOffset, t.anchorNode, t.anchorOffset) &&
          this.posFromDOM(t.focusNode, t.focusOffset) == e.head
        );
      }
      enforceCursorAssoc() {
        if (this.hasComposition) return;
        let { view: t } = this,
          e = t.state.selection.main,
          i = D(t.root),
          { anchorNode: s, anchorOffset: o } = t.observer.selectionRange;
        if (!i || !e.empty || !e.assoc || !i.modify) return;
        let n = this.lineAt(e.head, e.assoc);
        if (!n) return;
        let r = n.posAtStart;
        if (e.head == r || e.head == r + n.length) return;
        let l = this.coordsAt(e.head, -1),
          a = this.coordsAt(e.head, 1);
        if (!l || !a || l.bottom > a.top) return;
        let h = this.domAtPos(e.head + e.assoc, e.assoc);
        (i.collapse(h.node, h.offset),
          i.modify(
            'move',
            e.assoc < 0 ? 'forward' : 'backward',
            'lineboundary'
          ),
          t.observer.readSelectionRange());
        let c = t.observer.selectionRange;
        t.docView.posFromDOM(c.anchorNode, c.anchorOffset) != e.from &&
          i.collapse(s, o);
      }
      posFromDOM(t, e) {
        let i = this.tile.nearest(t);
        if (!i)
          return 2 & this.tile.dom.compareDocumentPosition(t)
            ? 0
            : this.view.state.doc.length;
        let s = i.posAtStart;
        if (i.isComposite()) {
          let o;
          if (t == i.dom) o = i.dom.childNodes[e];
          else {
            let s = 0 == P(t) ? 0 : 0 == e ? -1 : 1;
            for (;;) {
              let e = t.parentNode;
              if (e == i.dom) break;
              (0 == s &&
                e.firstChild != e.lastChild &&
                (s = t == e.firstChild ? -1 : 1),
                (t = e));
            }
            o = s < 0 ? t : t.nextSibling;
          }
          if (o == i.dom.firstChild) return s;
          for (; o && !Tile.get(o);) o = o.nextSibling;
          if (!o) return s + i.length;
          for (let t = 0, e = s; ; t++) {
            let s = i.children[t];
            if (s.dom == o) return e;
            e += s.length + s.breakAfter;
          }
        } else if (i.isText())
          return t == i.dom ? s + e : s + (e ? i.length : 0);
        else return s;
      }
      domAtPos(t, e) {
        let { tile: i, offset: s } = this.tile.resolveBlock(t, e);
        return i.isWidget() ? i.domPosFor(s, e) : i.domIn(s, e);
      }
      inlineDOMNearPos(t, e) {
        let i,
          s = -1,
          o = !1,
          n,
          r = -1,
          l = !1;
        return (this.tile.blockTiles((e, a) => {
          if (e.isWidget()) {
            if (32 & e.flags && a >= t) return !0;
            16 & e.flags && (o = !0);
          } else {
            let h = a + e.length;
            if (
              (a <= t && ((i = e), (s = t - a), (o = h < t)),
              h >= t && !n && ((n = e), (r = t - a), (l = a > t)),
              a > t && n)
            )
              return !0;
          }
        }),
        i || n)
          ? (o && n ? (i = null) : l && i && (n = null),
            (i && e < 0) || !n ? i.domIn(s, e) : n.domIn(r, e))
          : this.domAtPos(t, e);
      }
      coordsAt(t, e, i) {
        let { tile: s, offset: o } = this.tile.resolveBlock(t, e);
        return s.isWidget()
          ? s.widget instanceof BlockGapWidget
            ? null
            : s.coordsInWidget(o, e, !0)
          : s.coordsIn(o, e, i);
      }
      lineAt(t, e) {
        let { tile: i } = this.tile.resolveBlock(t, e);
        return i.isLine() ? i : null;
      }
      coordsForChar(t) {
        let { tile: e, offset: i } = this.tile.resolveBlock(t, 1);
        return e.isLine()
          ? (function t(e, i) {
              if (e.isComposite())
                for (let s of e.children) {
                  if (s.length >= i) {
                    let e = t(s, i);
                    if (e) return e;
                  }
                  if ((i -= s.length) < 0) break;
                }
              else if (e.isText() && i < e.length) {
                let t = (0, l.zK)(e.text, i);
                if (t == i) return null;
                let s = j(e.dom, i, t).getClientRects();
                for (let t = 0; t < s.length; t++) {
                  let e = s[t];
                  if (
                    t == s.length - 1 ||
                    (e.top < e.bottom && e.left < e.right)
                  )
                    return e;
                }
              }
              return null;
            })(e, i)
          : null;
      }
      measureVisibleLineHeights(t) {
        let e = [],
          { from: i, to: s } = t,
          o = this.view.contentDOM.clientWidth,
          n = o > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1,
          r = -1,
          l = this.view.textDirection == U.LTR,
          a = 0,
          h = (t, c, d) => {
            for (let u = 0; u < t.children.length && !(c > s); u++) {
              let s = t.children[u],
                f = c + s.length,
                p = s.dom.getBoundingClientRect(),
                { height: g } = p;
              if (
                (d && !u && (a += p.top - d.top), s instanceof BlockWrapperTile)
              )
                f > i && h(s, c, p);
              else if (
                c >= i &&
                (a > 0 && e.push(-a), e.push(g + a), (a = 0), n)
              ) {
                let t = s.dom.lastChild,
                  e = t ? R(t) : [];
                if (e.length) {
                  let t = e[e.length - 1],
                    i = l ? t.right - p.left : p.right - t.left;
                  i > r &&
                    ((r = i),
                    (this.minWidth = o),
                    (this.minWidthFrom = c),
                    (this.minWidthTo = f));
                }
              }
              (d && u == t.children.length - 1 && (a += d.bottom - p.bottom),
                (c = f + s.breakAfter));
            }
          };
        return (h(this.tile, 0, null), e);
      }
      textDirectionAt(t) {
        let { tile: e } = this.tile.resolveBlock(t, 1);
        return 'rtl' == getComputedStyle(e.dom).direction ? U.RTL : U.LTR;
      }
      measureTextSize() {
        let t = this.tile.blockTiles(t => {
          if (t.isLine() && t.children.length && t.length <= 20) {
            let e = 0,
              i;
            for (let s of t.children) {
              if (!s.isText() || /[^ -~]/.test(s.text)) return;
              let t = R(s.dom);
              if (1 != t.length) return;
              ((e += t[0].width), (i = t[0].height));
            }
            if (e)
              return {
                lineHeight: t.dom.getBoundingClientRect().height,
                charWidth: e / t.length,
                textHeight: i
              };
          }
        });
        if (t) return t;
        let e = document.createElement('div'),
          i,
          s,
          o;
        return (
          (e.className = 'cm-line'),
          (e.style.width = '99999px'),
          (e.style.position = 'absolute'),
          (e.textContent = 'abc def ghi jkl mno pqr stu'),
          this.view.observer.ignore(() => {
            this.tile.dom.appendChild(e);
            let t = R(e.firstChild)[0];
            ((i = e.getBoundingClientRect().height),
              (s = t && t.width ? t.width / 27 : 7),
              (o = t && t.height ? t.height : i),
              e.remove());
          }),
          { lineHeight: i, charWidth: s, textHeight: o }
        );
      }
      computeBlockGapDeco() {
        let t = [],
          e = this.view.viewState;
        for (let i = 0, s = 0; ; s++) {
          let o = s == e.viewports.length ? null : e.viewports[s],
            n = o ? o.from - 1 : this.view.state.doc.length;
          if (n > i) {
            let s =
              (e.lineBlockAt(n).bottom - e.lineBlockAt(i).top) /
              this.view.scaleY;
            t.push(
              Decoration.replace({
                widget: new BlockGapWidget(s),
                block: !0,
                inclusive: !0,
                isBlockGap: !0
              }).range(i, n)
            );
          }
          if (!o) break;
          i = o.to + 1;
        }
        return Decoration.set(t);
      }
      updateDeco() {
        let t = 1,
          e = this.view.state
            .facet(tD)
            .map(e =>
              (this.dynamicDecorationMap[t++] = 'function' == typeof e)
                ? e(this.view)
                : e
            ),
          i = !1,
          s = this.view.state.facet(tE).map((t, e) => {
            let s = 'function' == typeof t;
            return (s && (i = !0), s ? t(this.view) : t);
          });
        for (
          s.length &&
            ((this.dynamicDecorationMap[t++] = i), e.push(l.om.join(s))),
            this.decorations = [
              this.editContextFormatting,
              ...e,
              this.computeBlockGapDeco(),
              this.view.viewState.lineGapDeco
            ];
          t < this.decorations.length;
        )
          this.dynamicDecorationMap[t++] = !1;
        this.blockWrappers = this.view.state
          .facet(tB)
          .map(t => ('function' == typeof t ? t(this.view) : t));
      }
      scrollIntoView(t) {
        if (t.isSnapshot) {
          let e = this.view.viewState.lineBlockAt(t.range.head);
          ((this.view.scrollDOM.scrollTop = e.top - t.yMargin),
            (this.view.scrollDOM.scrollLeft = t.xMargin));
          return;
        }
        for (let e of this.view.state.facet(ty))
          try {
            if (e(this.view, t.range, t)) return !0;
          } catch (t) {
            tS(this.view.state, t, 'scroll handler');
          }
        let { range: e } = t,
          i = this.coordsAt(e.head, e.assoc || (e.head > e.anchor ? -1 : 1)),
          s;
        if (!i) return;
        !e.empty &&
          (s = this.coordsAt(e.anchor, e.anchor > e.head ? -1 : 1)) &&
          (i = {
            left: Math.min(i.left, s.left),
            top: Math.min(i.top, s.top),
            right: Math.max(i.right, s.right),
            bottom: Math.max(i.bottom, s.bottom)
          });
        let o = tW(this.view),
          n = {
            left: i.left - o.left,
            top: i.top - o.top,
            right: i.right + o.right,
            bottom: i.bottom + o.bottom
          },
          { offsetWidth: r, offsetHeight: l } = this.view.scrollDOM;
        if (
          (!(function (t, e, i, s, o, n, r, l) {
            let a = t.ownerDocument,
              h = a.defaultView || window;
            for (let c = t, d = !1; c && !d;)
              if (1 == c.nodeType) {
                let t,
                  u = c == a.body,
                  f = 1,
                  p = 1;
                if (u)
                  t = (function (t) {
                    let e = t.visualViewport;
                    return e
                      ? { left: 0, right: e.width, top: 0, bottom: e.height }
                      : {
                          left: 0,
                          right: t.innerWidth,
                          top: 0,
                          bottom: t.innerHeight
                        };
                  })(h);
                else {
                  if (
                    (/^(fixed|sticky)$/.test(getComputedStyle(c).position) &&
                      (d = !0),
                    c.scrollHeight <= c.clientHeight &&
                      c.scrollWidth <= c.clientWidth)
                  ) {
                    c = c.assignedSlot || c.parentNode;
                    continue;
                  }
                  let e = c.getBoundingClientRect();
                  (({ scaleX: f, scaleY: p } = F(c, e)),
                    (t = {
                      left: e.left,
                      right: e.left + c.clientWidth * f,
                      top: e.top,
                      bottom: e.top + c.clientHeight * p
                    }));
                }
                let g = 0,
                  m = 0;
                if ('nearest' == o)
                  e.top < t.top + r
                    ? ((m = e.top - (t.top + r)),
                      i > 0 &&
                        e.bottom > t.bottom + m &&
                        (m = e.bottom - t.bottom + r))
                    : e.bottom > t.bottom - r &&
                      ((m = e.bottom - t.bottom + r),
                      i < 0 && e.top - m < t.top && (m = e.top - (t.top + r)));
                else {
                  let s = e.bottom - e.top,
                    n = t.bottom - t.top;
                  m =
                    ('center' == o && s <= n
                      ? e.top + s / 2 - n / 2
                      : 'start' == o || ('center' == o && i < 0)
                        ? e.top - r
                        : e.bottom - n + r) - t.top;
                }
                if (
                  ('nearest' == s
                    ? e.left < t.left + n
                      ? ((g = e.left - (t.left + n)),
                        i > 0 &&
                          e.right > t.right + g &&
                          (g = e.right - t.right + n))
                      : e.right > t.right - n &&
                        ((g = e.right - t.right + n),
                        i < 0 &&
                          e.left < t.left + g &&
                          (g = e.left - (t.left + n)))
                    : (g =
                        ('center' == s
                          ? e.left +
                            (e.right - e.left) / 2 -
                            (t.right - t.left) / 2
                          : ('start' == s) == l
                            ? e.left - n
                            : e.right - (t.right - t.left) + n) - t.left),
                  g || m)
                )
                  if (u) h.scrollBy(g, m);
                  else {
                    let t = 0,
                      i = 0;
                    if (m) {
                      let t = c.scrollTop;
                      ((c.scrollTop += m / p), (i = (c.scrollTop - t) * p));
                    }
                    if (g) {
                      let e = c.scrollLeft;
                      ((c.scrollLeft += g / f), (t = (c.scrollLeft - e) * f));
                    }
                    ((e = {
                      left: e.left - t,
                      top: e.top - i,
                      right: e.right - t,
                      bottom: e.bottom - i
                    }),
                      t && 1 > Math.abs(t - g) && (s = 'nearest'),
                      i && 1 > Math.abs(i - m) && (o = 'nearest'));
                  }
                if (u) break;
                ((e.top < t.top ||
                  e.bottom > t.bottom ||
                  e.left < t.left ||
                  e.right > t.right) &&
                  (e = {
                    left: Math.max(e.left, t.left),
                    right: Math.min(e.right, t.right),
                    top: Math.max(e.top, t.top),
                    bottom: Math.min(e.bottom, t.bottom)
                  }),
                  (c = c.assignedSlot || c.parentNode));
              } else if (11 == c.nodeType) c = c.host;
              else break;
          })(
            this.view.scrollDOM,
            n,
            e.head < e.anchor ? -1 : 1,
            t.x,
            t.y,
            Math.max(Math.min(t.xMargin, r), -r),
            Math.max(Math.min(t.yMargin, l), -l),
            this.view.textDirection == U.LTR
          ),
          window.visualViewport &&
            window.innerHeight - window.visualViewport.height > 1 &&
            (i.top >
              window.visualViewport.offsetTop + window.visualViewport.height ||
              i.bottom < window.visualViewport.offsetTop))
        ) {
          let t = this.view.docView.lineAt(e.head, 1);
          if (t) {
            let e = z(t.dom);
            (t.dom.scrollIntoView({ block: 'nearest' }), K(e, !1));
          }
        }
      }
      lineHasWidget(t) {
        let e = t => t.isWidget() || t.children.some(e);
        return e(this.tile.resolveBlock(t, 1).tile);
      }
      destroy() {
        tj(this.tile);
      }
    };
    function tj(t, e) {
      let i = null == e ? void 0 : e.get(t);
      if (1 != i)
        for (let s of (null == i && t.destroy(), t.children)) tj(s, e);
    }
    function t_(t, e) {
      let i = t.observer.selectionRange;
      if (!i.focusNode) return null;
      let s = X(i.focusNode, i.focusOffset),
        o = $(i.focusNode, i.focusOffset),
        n = s || o;
      if (o && s && o.node != s.node) {
        let e = Tile.get(o.node);
        if (!e || (e.isText() && e.text != o.node.nodeValue)) n = o;
        else if (t.docView.lastCompositionAfterCursor) {
          let t = Tile.get(s.node);
          !t || (t.isText() && t.text != s.node.nodeValue) || (n = o);
        }
      }
      if (((t.docView.lastCompositionAfterCursor = n != s), !n)) return null;
      let r = e - n.offset;
      return { from: r, to: r + n.node.nodeValue.length, node: n.node };
    }
    let tY = class {
      constructor() {
        this.changes = [];
      }
      compareRange(t, e) {
        O(t, e, this.changes);
      }
      comparePoint(t, e) {
        O(t, e, this.changes);
      }
      boundChange(t) {
        O(t, t, this.changes);
      }
    };
    let WrapperComparator = class WrapperComparator {
      constructor() {
        this.changes = [];
      }
      compareRange(t, e) {
        O(t, e, this.changes);
      }
      comparePoint() {}
      boundChange(t) {
        O(t, t, this.changes);
      }
    };
    let BlockGapWidget = class BlockGapWidget extends WidgetType {
      constructor(t) {
        (super(), (this.height = t));
      }
      toDOM() {
        let t = document.createElement('div');
        return ((t.className = 'cm-gap'), this.updateDOM(t), t);
      }
      eq(t) {
        return t.height == this.height;
      }
      updateDOM(t) {
        return ((t.style.height = this.height + 'px'), !0);
      }
      get editable() {
        return !0;
      }
      get estimatedHeight() {
        return this.height;
      }
      ignoreEvent() {
        return !1;
      }
    };
    function tX(t, e, i) {
      let s = t.lineBlockAt(e);
      if (Array.isArray(s.type)) {
        let t;
        for (let o of s.type) {
          if (o.from > e) break;
          if (!(o.to < e)) {
            if (o.from < e && o.to > e) return o;
            (!t ||
              (o.type == T.Text &&
                (t.type != o.type || (i < 0 ? o.from < e : o.to > e)))) &&
              (t = o);
          }
        }
        return t || s;
      }
      return s;
    }
    function t$(t, e, i, s) {
      let o = t.state.doc.lineAt(e.head),
        n = t.bidiSpans(o),
        r = t.textDirectionAt(o.from);
      for (let a = e, h = null; ;) {
        let e = (function (t, e, i, s, o) {
            var n;
            let r = s.head - t.from,
              a = BidiSpan.find(
                e,
                r,
                null != (n = s.bidiLevel) ? n : -1,
                s.assoc
              ),
              h = e[a],
              c = h.side(o, i);
            if (r == c) {
              let t = (a += o ? 1 : -1);
              if (t < 0 || t >= e.length) return null;
              ((r = (h = e[(a = t)]).side(!o, i)), (c = h.side(o, i)));
            }
            let d = (0, l.zK)(t.text, r, h.forward(o, i));
            ((d < h.from || d > h.to) && (d = c),
              (ta = t.text.slice(Math.min(r, d), Math.max(r, d))));
            let u = a == (o ? e.length - 1 : 0) ? null : e[a + (o ? 1 : -1)];
            return u && d == c && u.level + +!o < h.level
              ? l.OF.cursor(
                  u.side(!o, i) + t.from,
                  u.forward(o, i) ? 1 : -1,
                  u.level
                )
              : l.OF.cursor(d + t.from, h.forward(o, i) ? -1 : 1, h.level);
          })(o, n, r, a, i),
          c = ta;
        if (!e) {
          if (o.number == (i ? t.state.doc.lines : 1)) return a;
          ((c = '\n'),
            (o = t.state.doc.line(o.number + (i ? 1 : -1))),
            (n = t.bidiSpans(o)),
            (e = t.visualLineSide(o, !i)));
        }
        if (h) {
          if (!h(c)) return a;
        } else {
          if (!s) return e;
          h = s(c);
        }
        a = e;
      }
    }
    function tU(t, e, i) {
      for (;;) {
        let s = 0;
        for (let o of t)
          o.between(e - 1, e + 1, (t, o, n) => {
            if (e > t && e < o) {
              let n = s || i || (e - t < o - e ? -1 : 1);
              ((e = n < 0 ? t : o), (s = n));
            }
          });
        if (!s) return e;
      }
    }
    function tQ(t, e) {
      let i = null;
      for (let s = 0; s < e.ranges.length; s++) {
        let o = e.ranges[s],
          n = null;
        if (o.empty) {
          let e = tU(t, o.from, 0);
          e != o.from && (n = l.OF.cursor(e, -1));
        } else {
          let e = tU(t, o.from, -1),
            i = tU(t, o.to, 1);
          (e != o.from || i != o.to) &&
            (n = o.undirectional
              ? l.OF.undirectionalRange(o.from, o.to)
              : l.OF.range(
                  o.from == o.anchor ? e : i,
                  o.from == o.head ? e : i
                ));
        }
        n && (i || (i = e.ranges.slice()), (i[s] = n));
      }
      return i ? l.OF.create(i, e.mainIndex) : e;
    }
    function tJ(t, e, i) {
      let s = tU(
        t.state.facet(tR).map(e => e(t)),
        i.from,
        e.head > i.from ? -1 : 1
      );
      return s == i.from ? i : l.OF.cursor(s, s < i.from ? 1 : -1);
    }
    let PosAssoc = class PosAssoc {
      constructor(t, e) {
        ((this.pos = t), (this.assoc = e));
      }
    };
    function tZ(t, e, i, s) {
      let o = t.contentDOM.getBoundingClientRect(),
        n = o.top + t.viewState.paddingTop,
        { x: r, y: a } = e,
        h = a - n,
        c;
      for (;;) {
        if (h < 0) return new PosAssoc(0, 1);
        if (h > t.viewState.docHeight)
          return new PosAssoc(t.state.doc.length, -1);
        if (((c = t.elementAtHeight(h)), null == s)) break;
        if (c.type == T.Text) {
          if (s < 0 ? c.to < t.viewport.from : c.from > t.viewport.to) break;
          let e = t.docView.coordsAt(s < 0 ? c.from : c.to, s > 0 ? -1 : 1);
          if (e && (s < 0 ? e.top <= h + n : e.bottom >= h + n)) break;
        }
        let e = t.viewState.heightOracle.textHeight / 2;
        h = s > 0 ? c.bottom + e : c.top - e;
      }
      if (t.viewport.from >= c.to || t.viewport.to <= c.from) {
        if (i) return null;
        if (c.type == T.Text) {
          let e = (function (t, e, i, s, o) {
            let n = Math.round((s - e.left) * t.defaultCharacterWidth);
            if (t.lineWrapping && i.height > 1.5 * t.defaultLineHeight) {
              let e = t.viewState.heightOracle.textHeight;
              n +=
                Math.floor((o - i.top - (t.defaultLineHeight - e) * 0.5) / e) *
                t.viewState.heightOracle.lineLength;
            }
            let r = t.state.sliceDoc(i.from, i.to);
            return i.from + (0, l.kn)(r, n, t.state.tabSize);
          })(t, o, c, r, a);
          return new PosAssoc(e, e == c.from ? 1 : -1);
        }
      }
      if (c.type != T.Text)
        return h < (c.top + c.bottom) / 2
          ? new PosAssoc(c.from, 1)
          : new PosAssoc(c.to, -1);
      let d = t.docView.lineAt(c.from, 2);
      return (
        (d && d.length == c.length) || (d = t.docView.lineAt(c.from, -2)),
        new InlineCoordsScan(t, r, a, t.textDirectionAt(c.from)).scanTile(
          d,
          c.from
        )
      );
    }
    let InlineCoordsScan = class InlineCoordsScan {
      constructor(t, e, i, s) {
        ((this.view = t),
          (this.x = e),
          (this.y = i),
          (this.baseDir = s),
          (this.line = null),
          (this.spans = null));
      }
      bidiSpansAt(t) {
        return (
          (!this.line || this.line.from > t || this.line.to < t) &&
            ((this.line = this.view.state.doc.lineAt(t)),
            (this.spans = this.view.bidiSpans(this.line))),
          this
        );
      }
      baseDirAt(t, e) {
        let { line: i, spans: s } = this.bidiSpansAt(t);
        return s[BidiSpan.find(s, t - i.from, -1, e)].level == this.baseDir;
      }
      dirAt(t, e) {
        let { line: i, spans: s } = this.bidiSpansAt(t);
        return s[BidiSpan.find(s, t - i.from, -1, e)].dir;
      }
      bidiIn(t, e) {
        let { spans: i, line: s } = this.bidiSpansAt(t);
        return (
          i.length > 1 ||
          (i.length && (i[0].level != this.baseDir || i[0].to + s.from < e))
        );
      }
      scan(t, e, i = !1) {
        let s,
          o,
          n = 0,
          r = t.length - 1,
          l = new Set(),
          a = this.bidiIn(t[0], t[r]),
          h = -1,
          c = 1e9,
          d;
        for (; n < r;) {
          let i = r - n,
            u = (n + r) >> 1;
          t: if (l.has(u)) {
            for (let t = 1; t < i; t++) {
              let e = u + t;
              if ((e >= r && (e -= i), !l.has(e))) {
                u = e;
                break t;
              }
            }
            break;
          }
          l.add(u);
          let f = e(u),
            p = 0;
          if (f)
            for (let t = 0; t < f.length; t++) {
              let e = f[t];
              if (0 != e.width || !(f.length > 1))
                if (e.bottom < this.y)
                  ((!s || s.bottom < e.bottom) && (s = e), (p = 1));
                else if (e.top > this.y)
                  ((!o || o.top > e.top) && (o = e), (p = -1));
                else {
                  let t =
                      e.left > this.x
                        ? this.x - e.left
                        : e.right < this.x
                          ? this.x - e.right
                          : 0,
                    i = Math.abs(t);
                  (i < c && ((h = u), (c = i), (d = e)),
                    t && (p = t < 0 == (this.baseDir == U.LTR) ? -1 : 1));
                }
            }
          -1 == p && (!a || this.baseDirAt(t[u], 1))
            ? (r = u)
            : 1 == p && (!a || this.baseDirAt(t[u + 1], -1)) && (n = u + 1);
        }
        if (!d) {
          if (!o && !s) return { i: t[0], after: !1 };
          let i = s && (!o || this.y - s.bottom < o.top - this.y) ? s : o;
          return ((this.y = (i.top + i.bottom) / 2), this.scan(t, e, !0));
        }
        if (c && !i) {
          let { top: i, bottom: n } = d;
          if (s && s.bottom > (i + i + n) / 3)
            return ((this.y = s.bottom - 1), this.scan(t, e, !0));
          if (o && o.top < (i + n + n) / 3)
            return ((this.y = o.top + 1), this.scan(t, e, !0));
        }
        let u = (a ? this.dirAt(t[h], 1) : this.baseDir) == U.LTR;
        return { i: h, after: this.x > (d.left + d.right) / 2 == u };
      }
      scanText(t, e) {
        let i = [];
        for (let s = 0; s < t.length; s = (0, l.zK)(t.text, s)) i.push(e + s);
        i.push(e + t.length);
        let s = this.scan(i, s => {
          let o = i[s] - e,
            n = i[s + 1] - e;
          return j(t.dom, o, n).getClientRects();
        });
        return s.after ? new PosAssoc(i[s.i + 1], -1) : new PosAssoc(i[s.i], 1);
      }
      scanTile(t, e) {
        if (!t.length) return new PosAssoc(e, 1);
        if (1 == t.children.length) {
          let i = t.children[0];
          if (i.isText()) return this.scanText(i, e);
          if (i.isComposite()) return this.scanTile(i, e);
        }
        let i = [e];
        for (let s = 0, o = e; s < t.children.length; s++)
          i.push((o += t.children[s].length));
        let s = this.scan(i, e => {
            let i = t.children[e];
            return 48 & i.flags
              ? null
              : (1 == i.dom.nodeType
                  ? i.dom
                  : j(i.dom, 0, i.length)
                ).getClientRects();
          }),
          o = t.children[s.i],
          n = i[s.i];
        return o.isText()
          ? this.scanText(o, n)
          : o.isComposite()
            ? this.scanTile(o, n)
            : s.after
              ? new PosAssoc(i[s.i + 1], -1)
              : new PosAssoc(n, 1);
      }
    };
    let DOMReader = class DOMReader {
      constructor(t, e) {
        ((this.points = t),
          (this.view = e),
          (this.text = ''),
          (this.lineSeparator = e.state.facet(l.$t.lineSeparator)));
      }
      append(t) {
        this.text += t;
      }
      lineBreak() {
        this.text += '￿';
      }
      readRange(t, e) {
        if (!t) return this;
        let i = t.parentNode;
        for (let s = t; ;) {
          this.findPointBefore(i, s);
          let t = this.text.length;
          this.readNode(s);
          let o = Tile.get(s),
            n = s.nextSibling;
          if (n == e) {
            (null == o ? void 0 : o.breakAfter) &&
              !n &&
              i != this.view.contentDOM &&
              this.lineBreak();
            break;
          }
          let r = Tile.get(n);
          ((o && r
            ? o.breakAfter
            : (o ? o.breakAfter : V(s)) ||
              (V(n) &&
                ('BR' != s.nodeName || (null == o ? void 0 : o.isWidget())) &&
                this.text.length > t)) &&
            !(function (t, e) {
              let i;
              for (; t != e && t; t = t.nextSibling) {
                let e = Tile.get(t);
                if (!(null == e ? void 0 : e.isWidget())) return !1;
                e && (i || (i = [])).push(e);
              }
              if (i)
                for (let t of i) {
                  let e = t.overrideDOMText;
                  if (null == e ? void 0 : e.length) return !1;
                }
              return !0;
            })(n, e) &&
            this.lineBreak(),
            (s = n));
        }
        return (this.findPointBefore(i, e), this);
      }
      readTextNode(t) {
        let e = t.nodeValue;
        for (let i of this.points)
          i.node == t &&
            (i.pos = this.text.length + Math.min(i.offset, e.length));
        for (let i = 0, s = this.lineSeparator ? null : /\r\n?|\n/g; ;) {
          let o = -1,
            n = 1,
            r;
          if (
            (this.lineSeparator
              ? ((o = e.indexOf(this.lineSeparator, i)),
                (n = this.lineSeparator.length))
              : (r = s.exec(e)) && ((o = r.index), (n = r[0].length)),
            this.append(e.slice(i, o < 0 ? e.length : o)),
            o < 0)
          )
            break;
          if ((this.lineBreak(), n > 1))
            for (let e of this.points)
              e.node == t && e.pos > this.text.length && (e.pos -= n - 1);
          i = o + n;
        }
      }
      readNode(t) {
        let e = Tile.get(t),
          i = e && e.overrideDOMText;
        if (null != i) {
          this.findPointInside(t, i.length);
          for (let t = i.iter(); !t.next().done;)
            t.lineBreak ? this.lineBreak() : this.append(t.value);
        } else
          3 == t.nodeType
            ? this.readTextNode(t)
            : 'BR' == t.nodeName
              ? t.nextSibling && this.lineBreak()
              : 1 == t.nodeType && this.readRange(t.firstChild, null);
      }
      findPointBefore(t, e) {
        for (let i of this.points)
          i.node == t &&
            t.childNodes[i.offset] == e &&
            (i.pos = this.text.length);
      }
      findPointInside(t, e) {
        for (let i of this.points)
          (3 == t.nodeType ? i.node == t : t.contains(i.node)) &&
            (i.pos =
              this.text.length +
              (!(function (t, e, i) {
                for (;;) {
                  if (!e || i < P(e)) return !1;
                  if (e == t) return !0;
                  ((i = L(e) + 1), (e = e.parentNode));
                }
              })(t, i.node, i.offset)
                ? 0
                : e));
      }
    };
    let DOMPoint = class DOMPoint {
      constructor(t, e) {
        ((this.node = t), (this.offset = e), (this.pos = -1));
      }
    };
    let DOMChange = class DOMChange {
      constructor(t, e, i, s) {
        ((this.typeOver = s),
          (this.bounds = null),
          (this.text = ''),
          (this.domChanged = e > -1));
        let { impreciseHead: o, impreciseAnchor: n } = t.docView,
          r = t.state.selection;
        if (t.state.readOnly && e > -1) this.newSel = null;
        else if (
          e > -1 &&
          (this.bounds = (function t(e, i, s, o) {
            if (e.isComposite()) {
              let n = -1,
                r = -1,
                l = -1,
                a = -1;
              for (let h = 0, c = o, d = o; h < e.children.length; h++) {
                let o = e.children[h],
                  u = c + o.length;
                if (c < i && u > s) return t(o, i, s, c);
                if (
                  (u >= i && -1 == n && ((n = h), (r = c)),
                  c > s && o.dom.parentNode == e.dom)
                ) {
                  ((l = h), (a = d));
                  break;
                }
                ((d = u), (c = u + o.breakAfter));
              }
              return {
                from: r,
                to: a < 0 ? o + e.length : a,
                startDOM:
                  (n ? e.children[n - 1].dom.nextSibling : null) ||
                  e.dom.firstChild,
                endDOM:
                  l < e.children.length && l >= 0 ? e.children[l].dom : null
              };
            }
            return e.isText()
              ? {
                  from: o,
                  to: o + e.length,
                  startDOM: e.dom,
                  endDOM: e.dom.nextSibling
                }
              : null;
          })(t.docView.tile, e, i, 0))
        ) {
          let e =
              o || n
                ? []
                : (function (t) {
                    let e = [];
                    if (t.root.activeElement != t.contentDOM) return e;
                    let {
                      anchorNode: i,
                      anchorOffset: s,
                      focusNode: o,
                      focusOffset: n
                    } = t.observer.selectionRange;
                    return (
                      i &&
                        (e.push(new DOMPoint(i, s)),
                        (o != i || n != s) && e.push(new DOMPoint(o, n))),
                      e
                    );
                  })(t),
            i = new DOMReader(e, t);
          (i.readRange(this.bounds.startDOM, this.bounds.endDOM),
            (this.text = i.text),
            (this.newSel = (function (t, e) {
              if (0 == t.length) return null;
              let i = t[0].pos,
                s = 2 == t.length ? t[1].pos : i;
              return i > -1 && s > -1 ? l.OF.single(i + e, s + e) : null;
            })(e, this.bounds.from)));
        } else {
          let e = t.observer.selectionRange,
            i =
              (o && o.node == e.focusNode && o.offset == e.focusOffset) ||
              !B(t.contentDOM, e.focusNode)
                ? r.main.head
                : t.docView.posFromDOM(e.focusNode, e.focusOffset),
            s =
              (n && n.node == e.anchorNode && n.offset == e.anchorOffset) ||
              !B(t.contentDOM, e.anchorNode)
                ? r.main.anchor
                : t.docView.posFromDOM(e.anchorNode, e.anchorOffset),
            a = t.viewport;
          if (
            (x.ios || x.chrome) &&
            i != s &&
            Math.min(i, s) <= r.main.from &&
            Math.max(i, s) >= r.main.to &&
            (a.from > 0 || a.to < t.state.doc.length)
          ) {
            let e = Math.min(i, s),
              o = Math.max(i, s),
              n = a.from - e,
              r = a.to - o;
            (0 == n || 1 == n || 0 == e) &&
              (0 == r || -1 == r || o == t.state.doc.length) &&
              ((i = 0), (s = t.state.doc.length));
          }
          if (t.inputState.composing > -1 && r.ranges.length > 1)
            this.newSel = r.replaceRange(l.OF.range(s, i));
          else if (
            t.lineWrapping &&
            s == i &&
            !(r.main.empty && r.main.head == i) &&
            t.inputState.lastTouchTime > Date.now() - 100
          ) {
            let e = t.coordsAtPos(i, -1),
              s = 0;
            (e && (s = t.inputState.lastTouchY <= e.bottom ? -1 : 1),
              (this.newSel = l.OF.create([l.OF.cursor(i, s)])));
          } else this.newSel = l.OF.single(s, i);
        }
      }
    };
    function t0(t, e) {
      let i,
        { newSel: s } = e,
        { state: o } = t,
        n = o.selection.main,
        r =
          t.inputState.lastKeyTime > Date.now() - 100
            ? t.inputState.lastKeyCode
            : -1;
      if (e.bounds) {
        let { from: t, to: s } = e.bounds,
          a = n.from,
          h = null;
        (8 === r || (x.android && e.text.length < s - t)) &&
          ((a = n.to), (h = 'end'));
        let c = o.doc.sliceString(t, s, '￿'),
          d,
          u;
        !n.empty &&
        n.from >= t &&
        n.to <= s &&
        (e.typeOver || c != e.text) &&
        c.slice(0, n.from - t) == e.text.slice(0, n.from - t) &&
        c.slice(n.to - t) ==
          e.text.slice((d = e.text.length - (c.length - (n.to - t))))
          ? (i = {
              from: n.from,
              to: n.to,
              insert: l.EY.of(e.text.slice(n.from - t, d).split('￿'))
            })
          : (u = t2(c, e.text, a - t, h)) &&
            (x.chrome &&
              13 == r &&
              u.toB == u.from + 2 &&
              '￿￿' == e.text.slice(u.from, u.toB) &&
              u.toB--,
            (i = {
              from: t + u.from,
              to: t + u.toA,
              insert: l.EY.of(e.text.slice(u.from, u.toB).split('￿'))
            }));
      } else s && ((!t.hasFocus && o.facet(tk)) || t8(s, n)) && (s = null);
      if (!i && !s) return !1;
      if (
        ((x.mac || x.android) &&
        i &&
        i.from == i.to &&
        i.from == n.head - 1 &&
        /^\. ?$/.test(i.insert.toString()) &&
        'off' == t.contentDOM.getAttribute('autocorrect')
          ? (s &&
              2 == i.insert.length &&
              (s = l.OF.single(s.main.anchor - 1, s.main.head - 1)),
            (i = {
              from: i.from,
              to: i.to,
              insert: l.EY.of([i.insert.toString().replace('.', ' ')])
            }))
          : o.doc.lineAt(n.from).to < n.to &&
              t.docView.lineHasWidget(n.to) &&
              t.inputState.insertingTextAt > Date.now() - 50
            ? (i = {
                from: n.from,
                to: n.to,
                insert: o.toText(t.inputState.insertingText)
              })
            : x.chrome &&
              i &&
              i.from == i.to &&
              i.from == n.head &&
              '\n ' == i.insert.toString() &&
              t.lineWrapping &&
              (s && (s = l.OF.single(s.main.anchor - 1, s.main.head - 1)),
              (i = { from: n.from, to: n.to, insert: l.EY.of([' ']) })),
        i)
      )
        return t1(t, i, s, r);
      if (!s || t8(s, n)) return !1;
      {
        let e = !1,
          i = 'select';
        return (
          t.inputState.lastSelectionTime > Date.now() - 50 &&
            ('select' == t.inputState.lastSelectionOrigin && (e = !0),
            'select.pointer' == (i = t.inputState.lastSelectionOrigin) &&
              (s = tQ(
                o.facet(tR).map(e => e(t)),
                s
              ))),
          t.dispatch({ selection: s, scrollIntoView: e, userEvent: i }),
          !0
        );
      }
    }
    function t1(t, e, i, s = -1) {
      let o;
      if (x.ios && t.inputState.flushIOSKey(e)) return !0;
      let n = t.state.selection.main;
      if (
        x.android &&
        ((e.to == n.to &&
          (e.from == n.from ||
            (e.from == n.from - 1 &&
              ' ' == t.state.sliceDoc(e.from, n.from))) &&
          1 == e.insert.length &&
          2 == e.insert.lines &&
          _(t.contentDOM, 'Enter', 13)) ||
          (((e.from == n.from - 1 && e.to == n.to && 0 == e.insert.length) ||
            (8 == s && e.insert.length < e.to - e.from && e.to > n.head)) &&
            _(t.contentDOM, 'Backspace', 8)) ||
          (e.from == n.from &&
            e.to == n.to + 1 &&
            0 == e.insert.length &&
            _(t.contentDOM, 'Delete', 46)))
      )
        return !0;
      let r = e.insert.toString();
      t.inputState.composing >= 0 && t.inputState.composing++;
      let a = () =>
        o ||
        (o = (function (t, e, i) {
          let s,
            o = t.state,
            n = o.selection.main,
            r = -1;
          if ((e.from == e.to && e.from < n.from) || e.from > n.to) {
            let i = e.from < n.from ? -1 : 1,
              s = i < 0 ? n.from : n.to,
              l = tU(
                o.facet(tR).map(e => e(t)),
                s,
                i
              );
            e.from == l && (r = l);
          }
          if (r > -1)
            s = {
              changes: e,
              selection: l.OF.cursor(e.from + e.insert.length, -1)
            };
          else if (
            e.from >= n.from &&
            e.to <= n.to &&
            e.to - e.from >= (n.to - n.from) / 3 &&
            (!i || (i.main.empty && i.main.from == e.from + e.insert.length)) &&
            t.inputState.composing < 0
          ) {
            let i = n.from < e.from ? o.sliceDoc(n.from, e.from) : '',
              r = n.to > e.to ? o.sliceDoc(e.to, n.to) : '';
            s = o.replaceSelection(
              t.state.toText(
                i + e.insert.sliceString(0, void 0, t.state.lineBreak) + r
              )
            );
          } else {
            let r = o.changes(e),
              a = i && i.main.to <= r.newLength ? i.main : void 0;
            if (
              o.selection.ranges.length > 1 &&
              (t.inputState.composing >= 0 ||
                t.inputState.compositionPendingChange) &&
              e.to <= n.to + 10 &&
              e.to >= n.to - 10
            ) {
              let h = t.state.sliceDoc(e.from, e.to),
                c,
                d = i && t_(t, i.main.head);
              if (d) {
                let t = e.insert.length - (e.to - e.from);
                c = { from: d.from, to: d.to - t };
              } else c = t.state.doc.lineAt(n.head);
              let u = n.to - e.to;
              s = o.changeByRange(i => {
                if (i.from == n.from && i.to == n.to)
                  return { changes: r, range: a || i.map(r) };
                let s = i.to - u,
                  d = s - h.length;
                if (t.state.sliceDoc(d, s) != h || (s >= c.from && d <= c.to))
                  return { range: i };
                let f = o.changes({ from: d, to: s, insert: e.insert }),
                  p = i.to - n.to;
                return {
                  changes: f,
                  range: a
                    ? l.OF.range(
                        Math.max(0, a.anchor + p),
                        Math.max(0, a.head + p)
                      )
                    : i.map(f)
                };
              });
            } else
              s = { changes: r, selection: a && o.selection.replaceRange(a) };
          }
          let a = 'input.type';
          return (
            (t.composing ||
              (t.inputState.compositionPendingChange &&
                t.inputState.compositionEndedAt > Date.now() - 50)) &&
              ((t.inputState.compositionPendingChange = !1),
              (a += '.compose'),
              t.inputState.compositionFirstChange &&
                ((a += '.start'), (t.inputState.compositionFirstChange = !1))),
            o.update(s, { userEvent: a, scrollIntoView: !0 })
          );
        })(t, e, i));
      return (
        t.state.facet(tp).some(i => i(t, e.from, e.to, r, a)) ||
          t.dispatch(a()),
        !0
      );
    }
    function t2(t, e, i, s) {
      let o = Math.min(t.length, e.length),
        n = 0;
      for (; n < o && t.charCodeAt(n) == e.charCodeAt(n);) n++;
      if (n == o && t.length == e.length) return null;
      let r = t.length,
        l = e.length;
      for (; r > 0 && l > 0 && t.charCodeAt(r - 1) == e.charCodeAt(l - 1);)
        (r--, l--);
      if ('end' == s) {
        let t = Math.max(0, n - Math.min(r, l));
        i -= r + t - n;
      }
      if (r < n && t.length < e.length) {
        let t = i <= n && i >= r ? n - i : 0;
        ((n -= t), (l = n + (l - r)), (r = n));
      } else if (l < n) {
        let t = i <= n && i >= l ? n - i : 0;
        ((n -= t), (r = n + (r - l)), (l = n));
      }
      return { from: n, toA: r, toB: l };
    }
    function t8(t, e) {
      return e.head == t.main.head && e.anchor == t.main.anchor;
    }
    let InputState = class InputState {
      setSelectionOrigin(t) {
        ((this.lastSelectionOrigin = t), (this.lastSelectionTime = Date.now()));
      }
      constructor(t) {
        var e;
        ((this.view = t),
          (this.lastKeyCode = 0),
          (this.lastKeyTime = 0),
          (this.touchActive = !1),
          (this.lastTouchTime = 0),
          (this.lastTouchX = 0),
          (this.lastTouchY = 0),
          (this.lastFocusTime = 0),
          (this.lastScrollTop = 0),
          (this.lastScrollLeft = 0),
          (this.lastWheelEvent = 0),
          (this.pendingIOSKey = void 0),
          (this.lastIOSMomentumScroll = 0),
          (this.tabFocusMode = -1),
          (this.lastSelectionOrigin = null),
          (this.lastSelectionTime = 0),
          (this.lastContextMenu = 0),
          (this.scrollHandlers = []),
          (this.handlers = Object.create(null)),
          (this.composing = -1),
          (this.compositionFirstChange = null),
          (this.compositionEndedAt = 0),
          (this.compositionPendingKey = !1),
          (this.compositionPendingChange = !1),
          (this.insertingText = ''),
          (this.insertingTextAt = 0),
          (this.mouseSelection = null),
          (this.draggedContent = null),
          (this.handleEvent = this.handleEvent.bind(this)),
          (this.notifiedFocused = t.hasFocus),
          x.safari && t.contentDOM.addEventListener('input', () => null),
          x.gecko &&
            ((e = t.contentDOM.ownerDocument),
            eg.has(e) ||
              (eg.add(e),
              e.addEventListener('copy', () => {}),
              e.addEventListener('cut', () => {}))));
      }
      handleEvent(t) {
        !(function (t, e) {
          if (!e.bubbles) return !0;
          if (e.defaultPrevented) return !1;
          for (let i = e.target, s; i != t.contentDOM; i = i.parentNode)
            if (
              !i ||
              11 == i.nodeType ||
              ((s = Tile.get(i)) &&
                s.isWidget() &&
                !s.isHidden &&
                s.widget.ignoreEvent(e))
            )
              return !1;
          return !0;
        })(this.view, t) ||
          this.ignoreDuringComposition(t) ||
          ('keydown' == t.type && this.keydown(t)) ||
          (0 != this.view.updateState
            ? Promise.resolve().then(() => this.runHandlers(t.type, t))
            : this.runHandlers(t.type, t));
      }
      runHandlers(t, e) {
        let i = this.handlers[t];
        if (i) {
          for (let t of i.observers) t(this.view, e);
          for (let t of i.handlers) {
            if (e.defaultPrevented) break;
            if (t(this.view, e)) {
              e.preventDefault();
              break;
            }
          }
        }
      }
      ensureHandlers(t) {
        let e = (function (t) {
            let e = Object.create(null);
            function i(t) {
              return e[t] || (e[t] = { observers: [], handlers: [] });
            }
            for (let e of t) {
              let t = e.spec,
                s = t && t.plugin.domEventHandlers,
                o = t && t.plugin.domEventObservers;
              if (s)
                for (let t in s) {
                  let o = s[t];
                  o && i(t).handlers.push(t3(e.value, o));
                }
              if (o)
                for (let t in o) {
                  let s = o[t];
                  s && i(t).observers.push(t3(e.value, s));
                }
            }
            for (let t in t7) i(t).handlers.push(t7[t]);
            for (let t in et) i(t).observers.push(et[t]);
            return e;
          })(t),
          i = this.handlers,
          s = this.view.contentDOM;
        for (let t in e)
          if ('scroll' != t) {
            let o = !e[t].handlers.length,
              n = i[t];
            (n &&
              !n.handlers.length != o &&
              (s.removeEventListener(t, this.handleEvent), (n = null)),
              n || s.addEventListener(t, this.handleEvent, { passive: o }));
          }
        for (let t in i)
          'scroll' == t || e[t] || s.removeEventListener(t, this.handleEvent);
        this.handlers = e;
      }
      keydown(t) {
        if (
          ((this.lastKeyCode = t.keyCode),
          (this.lastKeyTime = Date.now()),
          9 == t.keyCode &&
            this.tabFocusMode > -1 &&
            (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
        )
          return !0;
        if (
          (this.tabFocusMode > 0 &&
            27 != t.keyCode &&
            0 > t4.indexOf(t.keyCode) &&
            (this.tabFocusMode = -1),
          x.android &&
            x.chrome &&
            !t.synthetic &&
            (13 == t.keyCode || 8 == t.keyCode))
        )
          return (this.view.observer.delayAndroidKey(t.key, t.keyCode), !0);
        if (
          x.ios &&
          !t.synthetic &&
          !t.altKey &&
          !t.metaKey &&
          ((t5.some(e => e.keyCode == t.keyCode) && !t.ctrlKey) ||
            (t9.indexOf(t.key) > -1 && t.ctrlKey))
        ) {
          var e;
          let i = {
            ctrlKey: t.ctrlKey,
            altKey: t.altKey,
            metaKey: t.metaKey,
            shiftKey: t.shiftKey
          };
          return (
            i.shiftKey &&
              x.ios &&
              !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) &&
              (e = this.view.win).visualViewport &&
              (e.visualViewport.height * e.visualViewport.scale) /
                e.document.documentElement.clientHeight <
                0.85 &&
              (i.shiftKey = !1),
            (this.pendingIOSKey = { key: t.key, keyCode: t.keyCode, mods: i }),
            setTimeout(() => this.flushIOSKey(), 250),
            !0
          );
        }
        return (229 != t.keyCode && this.view.observer.forceFlush(), !1);
      }
      flushIOSKey(t) {
        let e = this.pendingIOSKey;
        return (
          !(
            !e ||
            ('Enter' == e.key &&
              t &&
              t.from < t.to &&
              /^\S+$/.test(t.insert.toString()))
          ) &&
          ((this.pendingIOSKey = void 0),
          _(this.view.contentDOM, e.key, e.keyCode, e.mods))
        );
      }
      ignoreDuringComposition(t) {
        return (
          !!/^key/.test(t.type) &&
          !t.synthetic &&
          (this.composing > 0 ||
            (!!(
              x.safari &&
              !x.ios &&
              this.compositionPendingKey &&
              Date.now() - this.compositionEndedAt < 100
            ) &&
              ((this.compositionPendingKey = !1), !0)))
        );
      }
      startMouseSelection(t) {
        (this.mouseSelection && this.mouseSelection.destroy(),
          (this.mouseSelection = t));
      }
      update(t) {
        (this.view.observer.update(t),
          this.mouseSelection && this.mouseSelection.update(t),
          this.draggedContent &&
            t.docChanged &&
            (this.draggedContent = this.draggedContent.map(t.changes)),
          t.transactions.length &&
            (this.lastKeyCode = this.lastSelectionTime = 0));
      }
      destroy() {
        this.mouseSelection && this.mouseSelection.destroy();
      }
    };
    function t3(t, e) {
      return (i, s) => {
        try {
          return e.call(t, s, i);
        } catch (t) {
          tS(i.state, t);
        }
      };
    }
    let t5 = [
        { key: 'Backspace', keyCode: 8, inputType: 'deleteContentBackward' },
        { key: 'Enter', keyCode: 13, inputType: 'insertParagraph' },
        { key: 'Enter', keyCode: 13, inputType: 'insertLineBreak' },
        { key: 'Delete', keyCode: 46, inputType: 'deleteContentForward' }
      ],
      t9 = 'dthko',
      t4 = [16, 17, 18, 20, 91, 92, 224, 225];
    function t6(t) {
      return 0.7 * Math.max(0, t) + 8;
    }
    let MouseSelection = class MouseSelection {
      constructor(t, e, i, s) {
        var o, n;
        let r;
        ((this.view = t),
          (this.startEvent = e),
          (this.style = i),
          (this.mustSelect = s),
          (this.scrollSpeed = { x: 0, y: 0 }),
          (this.scrolling = -1),
          (this.lastEvent = e),
          (this.scrollParents = I(t.contentDOM)),
          (this.atoms = t.state.facet(tR).map(e => e(t))));
        let a = t.contentDOM.ownerDocument;
        (a.addEventListener('mousemove', (this.move = this.move.bind(this))),
          a.addEventListener('mouseup', (this.up = this.up.bind(this))),
          (this.extend = e.shiftKey),
          (this.multiple =
            t.state.facet(l.$t.allowMultipleSelections) &&
            ((o = t),
            (n = e),
            (r = o.state.facet(th)).length
              ? r[0](n)
              : x.mac
                ? n.metaKey
                : n.ctrlKey)),
          (this.dragging =
            !!(function (t, e) {
              let { main: i } = t.state.selection;
              if (i.empty) return !1;
              let s = D(t.root);
              if (!s || 0 == s.rangeCount) return !0;
              let o = s.getRangeAt(0).getClientRects();
              for (let t = 0; t < o.length; t++) {
                let i = o[t];
                if (
                  i.left <= e.clientX &&
                  i.right >= e.clientX &&
                  i.top <= e.clientY &&
                  i.bottom >= e.clientY
                )
                  return !0;
              }
              return !1;
            })(t, e) &&
            1 == eh(e) &&
            null));
      }
      start(t) {
        !1 === this.dragging && this.select(t);
      }
      move(t) {
        var e;
        if (0 == t.buttons) return this.destroy();
        if (
          this.dragging ||
          (null == this.dragging &&
            10 >
              ((e = this.startEvent),
              Math.max(
                Math.abs(e.clientX - t.clientX),
                Math.abs(e.clientY - t.clientY)
              )))
        )
          return;
        this.select((this.lastEvent = t));
        let i = 0,
          s = 0,
          o = 0,
          n = 0,
          r = this.view.win.innerWidth,
          l = this.view.win.innerHeight;
        (this.scrollParents.x &&
          ({ left: o, right: r } =
            this.scrollParents.x.getBoundingClientRect()),
          this.scrollParents.y &&
            ({ top: n, bottom: l } =
              this.scrollParents.y.getBoundingClientRect()));
        let a = tW(this.view);
        (t.clientX - a.left <= o + 6
          ? (i = -t6(o - t.clientX))
          : t.clientX + a.right >= r - 6 && (i = t6(t.clientX - r)),
          t.clientY - a.top <= n + 6
            ? (s = -t6(n - t.clientY))
            : t.clientY + a.bottom >= l - 6 && (s = t6(t.clientY - l)),
          this.setScrollSpeed(i, s));
      }
      up(t) {
        (null == this.dragging && this.select(this.lastEvent),
          this.dragging || t.preventDefault(),
          this.destroy());
      }
      destroy() {
        this.setScrollSpeed(0, 0);
        let t = this.view.contentDOM.ownerDocument;
        (t.removeEventListener('mousemove', this.move),
          t.removeEventListener('mouseup', this.up),
          (this.view.inputState.mouseSelection =
            this.view.inputState.draggedContent =
              null));
      }
      setScrollSpeed(t, e) {
        ((this.scrollSpeed = { x: t, y: e }),
          t || e
            ? this.scrolling < 0 &&
              (this.scrolling = setInterval(() => this.scroll(), 50))
            : this.scrolling > -1 &&
              (clearInterval(this.scrolling), (this.scrolling = -1)));
      }
      scroll() {
        let { x: t, y: e } = this.scrollSpeed;
        (t &&
          this.scrollParents.x &&
          ((this.scrollParents.x.scrollLeft += t), (t = 0)),
          e &&
            this.scrollParents.y &&
            ((this.scrollParents.y.scrollTop += e), (e = 0)),
          (t || e) && this.view.win.scrollBy(t, e),
          !1 === this.dragging && this.select(this.lastEvent));
      }
      select(t) {
        let { view: e } = this,
          i = tQ(this.atoms, this.style.get(t, this.extend, this.multiple));
        ((this.mustSelect || !i.eq(e.state.selection, !1 === this.dragging)) &&
          this.view.dispatch({ selection: i, userEvent: 'select.pointer' }),
          (this.mustSelect = !1));
      }
      update(t) {
        t.transactions.some(t => t.isUserEvent('input.type'))
          ? this.destroy()
          : this.style.update(t) &&
            setTimeout(() => this.select(this.lastEvent), 20);
      }
    };
    let t7 = Object.create(null),
      et = Object.create(null),
      ee = (x.ie && x.ie_version < 15) || (x.ios && x.webkit_version < 604);
    function ei(t, e, i) {
      for (let s of t.facet(e)) i = s(i, t);
      return i;
    }
    function es(t, e) {
      e = ei(t.state, tm, e);
      let { state: i } = t,
        s,
        o = 1,
        n = i.toText(e),
        r = n.lines == i.selection.ranges.length;
      if (
        null != ed &&
        i.selection.ranges.every(t => t.empty) &&
        ed == n.toString()
      ) {
        let t = -1;
        s = i.changeByRange(s => {
          let a = i.doc.lineAt(s.from);
          if (a.from == t) return { range: s };
          t = a.from;
          let h = i.toText((r ? n.line(o++).text : e) + i.lineBreak);
          return {
            changes: { from: a.from, insert: h },
            range: l.OF.cursor(s.from + h.length)
          };
        });
      } else
        s = r
          ? i.changeByRange(t => {
              let e = n.line(o++);
              return {
                changes: { from: t.from, to: t.to, insert: e.text },
                range: l.OF.cursor(t.from + e.length)
              };
            })
          : i.replaceSelection(n);
      t.dispatch(s, { userEvent: 'input.paste', scrollIntoView: !0 });
    }
    function eo(t, e, i, s) {
      if (1 == s) return l.OF.cursor(e, i);
      {
        if (2 == s)
          return (function (t, e, i = 1) {
            let s = t.charCategorizer(e),
              o = t.doc.lineAt(e),
              n = e - o.from;
            if (0 == o.length) return l.OF.cursor(e);
            0 == n ? (i = 1) : n == o.length && (i = -1);
            let r = n,
              a = n;
            i < 0 ? (r = (0, l.zK)(o.text, n, !1)) : (a = (0, l.zK)(o.text, n));
            let h = s(o.text.slice(r, a));
            for (; r > 0;) {
              let t = (0, l.zK)(o.text, r, !1);
              if (s(o.text.slice(t, r)) != h) break;
              r = t;
            }
            for (; a < o.length;) {
              let t = (0, l.zK)(o.text, a);
              if (s(o.text.slice(a, t)) != h) break;
              a = t;
            }
            return l.OF.undirectionalRange(r + o.from, a + o.from);
          })(t.state, e, i);
        let o = t.docView.lineAt(e, i),
          n = t.state.doc.lineAt(o ? o.posAtEnd : e),
          r = o ? o.posAtStart : n.from,
          a = o ? o.posAtEnd : n.to;
        return (
          a < t.state.doc.length && a == n.to && a++,
          l.OF.undirectionalRange(r, a)
        );
      }
    }
    ((et.scroll = t => {
      let e = t.inputState;
      ((e.lastScrollTop = t.scrollDOM.scrollTop),
        (e.lastScrollLeft = t.scrollDOM.scrollLeft),
        x.ios && !e.touchActive && (e.lastIOSMomentumScroll = Date.now()));
    }),
      (et.wheel = et.mousewheel =
        t => {
          t.inputState.lastWheelEvent = Date.now();
        }),
      (t7.keydown = (t, e) => (
        t.inputState.setSelectionOrigin('select'),
        27 == e.keyCode &&
          0 != t.inputState.tabFocusMode &&
          (t.inputState.tabFocusMode = Date.now() + 2e3),
        !1
      )),
      (et.touchstart = (t, e) => {
        let i = t.inputState,
          s = e.targetTouches[0];
        ((i.touchActive = !0),
          (i.lastTouchTime = Date.now()),
          s && ((i.lastTouchX = s.clientX), (i.lastTouchY = s.clientY)),
          i.setSelectionOrigin('select.pointer'));
      }),
      (et.touchmove = t => {
        t.inputState.setSelectionOrigin('select.pointer');
      }),
      (et.touchend = (t, e) => {
        t.inputState.touchActive = !1;
      }),
      (t7.mousedown = (t, e) => {
        var i, s;
        let o, n, r;
        if ((t.observer.flush(), t.inputState.lastTouchTime > Date.now() - 2e3))
          return !1;
        let a = null;
        for (let i of t.state.facet(td)) if ((a = i(t, e))) break;
        if (
          (a ||
            0 != e.button ||
            ((i = t),
            (s = e),
            (o = i.posAndSideAtCoords({ x: s.clientX, y: s.clientY }, !1)),
            (n = eh(s)),
            (r = i.state.selection),
            (a = {
              update(t) {
                t.docChanged &&
                  ((o.pos = t.changes.mapPos(o.pos)), (r = r.map(t.changes)));
              },
              get(t, e, s) {
                let a = i.posAndSideAtCoords(
                    { x: t.clientX, y: t.clientY },
                    !1
                  ),
                  h,
                  c = eo(i, a.pos, a.assoc, n);
                if (o.pos != a.pos && !e) {
                  let t = eo(i, o.pos, o.assoc, n),
                    e = Math.min(t.from, c.from),
                    s = Math.max(t.to, c.to);
                  c =
                    e < c.from
                      ? l.OF.range(e, s, c.assoc)
                      : l.OF.range(s, e, c.assoc);
                }
                return e
                  ? r.replaceRange(r.main.extend(c.from, c.to, c.assoc))
                  : s &&
                      1 == n &&
                      r.ranges.length > 1 &&
                      (h = (function (t, e) {
                        for (let i = 0; i < t.ranges.length; i++) {
                          let { from: s, to: o } = t.ranges[i];
                          if (s <= e && o >= e)
                            return l.OF.create(
                              t.ranges
                                .slice(0, i)
                                .concat(t.ranges.slice(i + 1)),
                              t.mainIndex == i
                                ? 0
                                : t.mainIndex - (t.mainIndex > i)
                            );
                        }
                        return null;
                      })(r, a.pos))
                    ? h
                    : s
                      ? r.addRange(c)
                      : l.OF.create([c]);
              }
            })),
          a)
        ) {
          let i = !t.hasFocus;
          (t.inputState.startMouseSelection(new MouseSelection(t, e, a, i)),
            i &&
              t.observer.ignore(() => {
                q(t.contentDOM);
                let e = t.root.activeElement;
                e && !e.contains(t.contentDOM) && e.blur();
              }));
          let s = t.inputState.mouseSelection;
          if (s) return (s.start(e), !1 === s.dragging);
        } else t.inputState.setSelectionOrigin('select.pointer');
        return !1;
      }));
    let en = x.ie && x.ie_version <= 11,
      er = null,
      el = 0,
      ea = 0;
    function eh(t) {
      if (!en) return t.detail;
      let e = er,
        i = ea;
      return (
        (er = t),
        (ea = Date.now()),
        (el =
          !e ||
          (i > Date.now() - 400 &&
            2 > Math.abs(e.clientX - t.clientX) &&
            2 > Math.abs(e.clientY - t.clientY))
            ? (el + 1) % 3
            : 1)
      );
    }
    function ec(t, e, i, s) {
      let o;
      if (!(i = ei(t.state, tm, i))) return;
      let n = t.posAtCoords({ x: e.clientX, y: e.clientY }, !1),
        { draggedContent: r } = t.inputState,
        l =
          s &&
          r &&
          ((o = t.state.facet(tc)).length
            ? o[0](e)
            : x.mac
              ? !e.altKey
              : !e.ctrlKey)
            ? { from: r.from, to: r.to }
            : null,
        a = { from: n, insert: i },
        h = t.state.changes(l ? [l, a] : a);
      (t.focus(),
        t.dispatch({
          changes: h,
          selection: { anchor: h.mapPos(n, -1), head: h.mapPos(n, 1) },
          userEvent: l ? 'move.drop' : 'input.drop'
        }),
        (t.inputState.draggedContent = null));
    }
    ((t7.dragstart = (t, e) => {
      let {
        selection: { main: i }
      } = t.state;
      if (e.target.draggable) {
        let s = t.docView.tile.nearest(e.target);
        if (s && s.isWidget()) {
          let t = s.posAtStart,
            e = t + s.length;
          (t >= i.to || e <= i.from) && (i = l.OF.undirectionalRange(t, e));
        }
      }
      let { inputState: s } = t;
      return (
        s.mouseSelection && (s.mouseSelection.dragging = !0),
        (s.draggedContent = i),
        e.dataTransfer &&
          (e.dataTransfer.setData(
            'Text',
            ei(t.state, tw, t.state.sliceDoc(i.from, i.to))
          ),
          (e.dataTransfer.effectAllowed = 'copyMove')),
        !1
      );
    }),
      (t7.dragend = t => ((t.inputState.draggedContent = null), !1)),
      (t7.drop = (t, e) => {
        if (!e.dataTransfer) return !1;
        if (t.state.readOnly) return !0;
        let i = e.dataTransfer.files;
        if (i && i.length) {
          let s = Array(i.length),
            o = 0,
            n = () => {
              ++o == i.length &&
                ec(t, e, s.filter(t => null != t).join(t.state.lineBreak), !1);
            };
          for (let t = 0; t < i.length; t++) {
            let e = new FileReader();
            ((e.onerror = n),
              (e.onload = () => {
                (/[\x00-\x08\x0e-\x1f]{2}/.test(e.result) || (s[t] = e.result),
                  n());
              }),
              e.readAsText(i[t]));
          }
          return !0;
        }
        {
          let i = e.dataTransfer.getData('Text');
          if (i) return (ec(t, e, i, !0), !0);
        }
        return !1;
      }),
      (t7.paste = (t, e) => {
        if (t.state.readOnly) return !0;
        t.observer.flush();
        let i = ee ? null : e.clipboardData;
        return i
          ? (es(t, i.getData('text/plain') || i.getData('text/uri-list')), !0)
          : (!(function (t) {
              let e = t.dom.parentNode;
              if (!e) return;
              let i = e.appendChild(document.createElement('textarea'));
              ((i.style.cssText = 'position: fixed; left: -10000px; top: 10px'),
                i.focus(),
                setTimeout(() => {
                  (t.focus(), i.remove(), es(t, i.value));
                }, 50));
            })(t),
            !1);
      }));
    let ed = null;
    t7.copy = t7.cut = (t, e) => {
      if (!E(t.contentDOM, t.observer.selectionRange)) return !1;
      let {
        text: i,
        ranges: s,
        linewise: o
      } = (function (t) {
        let e = [],
          i = [],
          s = !1;
        for (let s of t.selection.ranges)
          s.empty || (e.push(t.sliceDoc(s.from, s.to)), i.push(s));
        if (!e.length) {
          let o = -1;
          for (let { from: s } of t.selection.ranges) {
            let n = t.doc.lineAt(s);
            (n.number > o &&
              (e.push(n.text),
              i.push({ from: n.from, to: Math.min(t.doc.length, n.to + 1) })),
              (o = n.number));
          }
          s = !0;
        }
        return { text: ei(t, tw, e.join(t.lineBreak)), ranges: i, linewise: s };
      })(t.state);
      if (!i && !o) return !1;
      ((ed = o ? i : null),
        'cut' != e.type ||
          t.state.readOnly ||
          t.dispatch({
            changes: s,
            scrollIntoView: !0,
            userEvent: 'delete.cut'
          }));
      let n = ee ? null : e.clipboardData;
      return n
        ? (n.clearData(), n.setData('text/plain', i), !0)
        : (!(function (t, e) {
            let i = t.dom.parentNode;
            if (!i) return;
            let s = i.appendChild(document.createElement('textarea'));
            ((s.style.cssText = 'position: fixed; left: -10000px; top: 10px'),
              (s.value = e),
              s.focus(),
              (s.selectionEnd = e.length),
              (s.selectionStart = 0),
              setTimeout(() => {
                (s.remove(), t.focus());
              }, 50));
          })(t, i),
          !1);
    };
    let eu = l.YH.define();
    function ef(t, e) {
      let i = [];
      for (let s of t.facet(tg)) {
        let o = s(t, e);
        o && i.push(o);
      }
      return i.length ? t.update({ effects: i, annotations: eu.of(!0) }) : null;
    }
    function ep(t) {
      setTimeout(() => {
        let e = t.hasFocus;
        if (e != t.inputState.notifiedFocused) {
          let i = ef(t.state, e);
          i ? t.dispatch(i) : t.update([]);
        }
      }, 10);
    }
    ((et.focus = t => {
      ((t.inputState.lastFocusTime = Date.now()),
        !t.scrollDOM.scrollTop &&
          (t.inputState.lastScrollTop || t.inputState.lastScrollLeft) &&
          ((t.scrollDOM.scrollTop = t.inputState.lastScrollTop),
          (t.scrollDOM.scrollLeft = t.inputState.lastScrollLeft)),
        ep(t));
    }),
      (et.blur = t => {
        (t.observer.clearSelectionRange(), ep(t));
      }),
      (et.compositionstart = et.compositionupdate =
        t => {
          !t.observer.editContext &&
            (null == t.inputState.compositionFirstChange &&
              (t.inputState.compositionFirstChange = !0),
            t.inputState.composing < 0 && (t.inputState.composing = 0));
        }),
      (et.compositionend = t => {
        t.observer.editContext ||
          ((t.inputState.composing = -1),
          (t.inputState.compositionEndedAt = Date.now()),
          (t.inputState.compositionPendingKey = !0),
          (t.inputState.compositionPendingChange =
            t.observer.pendingRecords().length > 0),
          (t.inputState.compositionFirstChange = null),
          x.chrome && x.android
            ? t.observer.flushSoon()
            : t.inputState.compositionPendingChange
              ? Promise.resolve().then(() => t.observer.flush())
              : setTimeout(() => {
                  t.inputState.composing < 0 &&
                    t.docView.hasComposition &&
                    t.update([]);
                }, 50));
      }),
      (et.contextmenu = t => {
        t.inputState.lastContextMenu = Date.now();
      }),
      (t7.beforeinput = (t, e) => {
        var i, s;
        let o;
        if (
          (('insertText' == e.inputType ||
            'insertCompositionText' == e.inputType) &&
            ((t.inputState.insertingText = e.data),
            (t.inputState.insertingTextAt = Date.now())),
          'insertReplacementText' == e.inputType && t.observer.editContext)
        ) {
          let s =
              null == (i = e.dataTransfer) ? void 0 : i.getData('text/plain'),
            o = e.getTargetRanges();
          if (s && o.length) {
            let e = o[0],
              i = t.posAtDOM(e.startContainer, e.startOffset),
              n = t.posAtDOM(e.endContainer, e.endOffset);
            return (
              t1(t, { from: i, to: n, insert: t.state.toText(s) }, null),
              !0
            );
          }
        }
        if (
          x.chrome &&
          x.android &&
          (o = t5.find(t => t.inputType == e.inputType)) &&
          (t.observer.delayAndroidKey(o.key, o.keyCode),
          'Backspace' == o.key || 'Delete' == o.key)
        ) {
          let e =
            (null == (s = window.visualViewport) ? void 0 : s.height) || 0;
          setTimeout(() => {
            var i;
            ((null == (i = window.visualViewport) ? void 0 : i.height) || 0) >
              e + 10 &&
              t.hasFocus &&
              (t.contentDOM.blur(), t.focus());
          }, 100);
        }
        return (
          x.ios &&
            'deleteContentForward' == e.inputType &&
            t.observer.flushSoon(),
          x.safari &&
            'insertText' == e.inputType &&
            t.inputState.composing >= 0 &&
            setTimeout(() => et.compositionend(t, e), 20),
          !1
        );
      }));
    let eg = new Set(),
      em = ['pre-wrap', 'normal', 'pre-line', 'break-spaces'],
      ew = !1;
    let HeightOracle = class HeightOracle {
      constructor(t) {
        ((this.lineWrapping = t),
          (this.doc = l.EY.empty),
          (this.heightSamples = {}),
          (this.lineHeight = 14),
          (this.charWidth = 7),
          (this.textHeight = 14),
          (this.lineLength = 30));
      }
      heightForGap(t, e) {
        let i = this.doc.lineAt(e).number - this.doc.lineAt(t).number + 1;
        return (
          this.lineWrapping &&
            (i += Math.max(
              0,
              Math.ceil((e - t - i * this.lineLength * 0.5) / this.lineLength)
            )),
          this.lineHeight * i
        );
      }
      heightForLine(t) {
        return this.lineWrapping
          ? (1 +
              Math.max(
                0,
                Math.ceil(
                  (t - this.lineLength) / Math.max(1, this.lineLength - 5)
                )
              )) *
              this.lineHeight
          : this.lineHeight;
      }
      setDoc(t) {
        return ((this.doc = t), this);
      }
      mustRefreshForWrapping(t) {
        return em.indexOf(t) > -1 != this.lineWrapping;
      }
      mustRefreshForHeights(t) {
        let e = !1;
        for (let i = 0; i < t.length; i++) {
          let s = t[i];
          s < 0
            ? i++
            : this.heightSamples[Math.floor(10 * s)] ||
              ((e = !0), (this.heightSamples[Math.floor(10 * s)] = !0));
        }
        return e;
      }
      refresh(t, e, i, s, o, n) {
        let r = em.indexOf(t) > -1,
          l = Math.abs(e - this.lineHeight) > 0.3 || this.lineWrapping != r;
        if (
          ((this.lineWrapping = r),
          (this.lineHeight = e),
          (this.charWidth = i),
          (this.textHeight = s),
          (this.lineLength = o),
          l)
        ) {
          this.heightSamples = {};
          for (let t = 0; t < n.length; t++) {
            let e = n[t];
            e < 0 ? t++ : (this.heightSamples[Math.floor(10 * e)] = !0);
          }
        }
        return l;
      }
    };
    let MeasuredHeights = class MeasuredHeights {
      constructor(t, e) {
        ((this.from = t), (this.heights = e), (this.index = 0));
      }
      get more() {
        return this.index < this.heights.length;
      }
    };
    let BlockInfo = class BlockInfo {
      constructor(t, e, i, s, o) {
        ((this.from = t),
          (this.length = e),
          (this.top = i),
          (this.height = s),
          (this._content = o));
      }
      get type() {
        return 'number' == typeof this._content
          ? T.Text
          : Array.isArray(this._content)
            ? this._content
            : this._content.type;
      }
      get to() {
        return this.from + this.length;
      }
      get bottom() {
        return this.top + this.height;
      }
      get widget() {
        return this._content instanceof PointDecoration
          ? this._content.widget
          : null;
      }
      get widgetLineBreaks() {
        return 'number' == typeof this._content ? this._content : 0;
      }
      join(t) {
        let e = (Array.isArray(this._content) ? this._content : [this]).concat(
          Array.isArray(t._content) ? t._content : [t]
        );
        return new BlockInfo(
          this.from,
          this.length + t.length,
          this.top,
          this.height + t.height,
          e
        );
      }
    };
    var ev =
      (((r = ev || (ev = {}))[(r.ByPos = 0)] = 'ByPos'),
      (r[(r.ByHeight = 1)] = 'ByHeight'),
      (r[(r.ByPosNoHeight = 2)] = 'ByPosNoHeight'),
      r);
    let HeightMap = class HeightMap {
      constructor(t, e, i = 2) {
        ((this.length = t), (this.height = e), (this.flags = i));
      }
      get outdated() {
        return (2 & this.flags) > 0;
      }
      set outdated(t) {
        this.flags = (2 * !!t) | (-3 & this.flags);
      }
      setHeight(t) {
        this.height != t &&
          (Math.abs(this.height - t) > 0.001 && (ew = !0), (this.height = t));
      }
      replace(t, e, i) {
        return HeightMap.of(i);
      }
      decomposeLeft(t, e) {
        e.push(this);
      }
      decomposeRight(t, e) {
        e.push(this);
      }
      applyChanges(t, e, i, s) {
        let o = this,
          n = i.doc;
        for (let r = s.length - 1; r >= 0; r--) {
          let { fromA: l, toA: a, fromB: h, toB: c } = s[r],
            d = o.lineAt(l, ev.ByPosNoHeight, i.setDoc(e), 0, 0),
            u = d.to >= a ? d : o.lineAt(a, ev.ByPosNoHeight, i, 0, 0);
          for (c += u.to - a, a = u.to; r > 0 && d.from <= s[r - 1].toA;)
            ((l = s[r - 1].fromA),
              (h = s[r - 1].fromB),
              r--,
              l < d.from && (d = o.lineAt(l, ev.ByPosNoHeight, i, 0, 0)));
          ((h += d.from - l), (l = d.from));
          let f = NodeBuilder.build(i.setDoc(n), t, h, c);
          o = eb(o, o.replace(l, a, f));
        }
        return o.updateHeight(i, 0);
      }
      static empty() {
        return new HeightMapText(0, 0, 0);
      }
      static of(t) {
        if (1 == t.length) return t[0];
        let e = 0,
          i = t.length,
          s = 0,
          o = 0;
        for (;;)
          if (e == i)
            if (s > 2 * o) {
              let o = t[e - 1];
              (o.break
                ? t.splice(--e, 1, o.left, null, o.right)
                : t.splice(--e, 1, o.left, o.right),
                (i += 1 + o.break),
                (s -= o.size));
            } else if (o > 2 * s) {
              let e = t[i];
              (e.break
                ? t.splice(i, 1, e.left, null, e.right)
                : t.splice(i, 1, e.left, e.right),
                (i += 2 + e.break),
                (o -= e.size));
            } else break;
          else if (s < o) {
            let i = t[e++];
            i && (s += i.size);
          } else {
            let e = t[--i];
            e && (o += e.size);
          }
        let n = 0;
        return (
          null == t[e - 1] ? ((n = 1), e--) : null == t[e] && ((n = 1), i++),
          new HeightMapBranch(
            HeightMap.of(t.slice(0, e)),
            n,
            HeightMap.of(t.slice(i))
          )
        );
      }
    };
    function eb(t, e) {
      return t == e ? t : (t.constructor != e.constructor && (ew = !0), e);
    }
    HeightMap.prototype.size = 1;
    let ey = Decoration.replace({});
    let HeightMapBlock = class HeightMapBlock extends HeightMap {
      constructor(t, e, i) {
        (super(t, e), (this.deco = i), (this.spaceAbove = 0));
      }
      mainBlock(t, e) {
        return new BlockInfo(
          e,
          this.length,
          t + this.spaceAbove,
          this.height - this.spaceAbove,
          this.deco || 0
        );
      }
      blockAt(t, e, i, s) {
        return this.spaceAbove && t < i + this.spaceAbove
          ? new BlockInfo(s, 0, i, this.spaceAbove, ey)
          : this.mainBlock(i, s);
      }
      lineAt(t, e, i, s, o) {
        let n = this.mainBlock(s, o);
        return this.spaceAbove ? this.blockAt(0, i, s, o).join(n) : n;
      }
      forEachLine(t, e, i, s, o, n) {
        t <= o + this.length && e >= o && n(this.lineAt(0, ev.ByPos, i, s, o));
      }
      setMeasuredHeight(t) {
        let e = t.heights[t.index++];
        (e < 0
          ? ((this.spaceAbove = -e), (e = t.heights[t.index++]))
          : (this.spaceAbove = 0),
          this.setHeight(e));
      }
      updateHeight(t, e = 0, i = !1, s) {
        return (
          s && s.from <= e && s.more && this.setMeasuredHeight(s),
          (this.outdated = !1),
          this
        );
      }
      toString() {
        return `block(${this.length})`;
      }
    };
    let HeightMapText = class HeightMapText extends HeightMapBlock {
      constructor(t, e, i) {
        (super(t, e, null),
          (this.collapsed = 0),
          (this.widgetHeight = 0),
          (this.breaks = 0),
          (this.spaceAbove = i));
      }
      mainBlock(t, e) {
        return new BlockInfo(
          e,
          this.length,
          t + this.spaceAbove,
          this.height - this.spaceAbove,
          this.breaks
        );
      }
      replace(t, e, i) {
        let s = i[0];
        return 1 == i.length &&
          (s instanceof HeightMapText ||
            (s instanceof HeightMapGap && 4 & s.flags)) &&
          10 > Math.abs(this.length - s.length)
          ? (s instanceof HeightMapGap
              ? (s = new HeightMapText(s.length, this.height, this.spaceAbove))
              : (s.height = this.height),
            this.outdated || (s.outdated = !1),
            s)
          : HeightMap.of(i);
      }
      updateHeight(t, e = 0, i = !1, s) {
        return (
          s && s.from <= e && s.more
            ? this.setMeasuredHeight(s)
            : (i || this.outdated) &&
              ((this.spaceAbove = 0),
              this.setHeight(
                Math.max(
                  this.widgetHeight,
                  t.heightForLine(this.length - this.collapsed)
                ) +
                  this.breaks * t.lineHeight
              )),
          (this.outdated = !1),
          this
        );
      }
      toString() {
        return `line(${this.length}${this.collapsed ? -this.collapsed : ''}${this.widgetHeight ? ':' + this.widgetHeight : ''})`;
      }
    };
    let HeightMapGap = class HeightMapGap extends HeightMap {
      constructor(t) {
        super(t, 0);
      }
      heightMetrics(t, e) {
        let i = t.doc.lineAt(e).number,
          s = t.doc.lineAt(e + this.length).number,
          o = s - i + 1,
          n,
          r = 0;
        if (t.lineWrapping) {
          let e = Math.min(this.height, t.lineHeight * o);
          ((n = e / o),
            this.length > o + 1 &&
              (r = (this.height - e) / (this.length - o - 1)));
        } else n = this.height / o;
        return { firstLine: i, lastLine: s, perLine: n, perChar: r };
      }
      blockAt(t, e, i, s) {
        let {
          firstLine: o,
          lastLine: n,
          perLine: r,
          perChar: l
        } = this.heightMetrics(e, s);
        if (e.lineWrapping) {
          let o =
              s +
              (t < e.lineHeight
                ? 0
                : Math.round(
                    Math.max(0, Math.min(1, (t - i) / this.height)) *
                      this.length
                  )),
            n = e.doc.lineAt(o),
            a = r + n.length * l,
            h = Math.max(i, t - a / 2);
          return new BlockInfo(n.from, n.length, h, a, 0);
        }
        {
          let s = Math.max(0, Math.min(n - o, Math.floor((t - i) / r))),
            { from: l, length: a } = e.doc.line(o + s);
          return new BlockInfo(l, a, i + r * s, r, 0);
        }
      }
      lineAt(t, e, i, s, o) {
        if (e == ev.ByHeight) return this.blockAt(t, i, s, o);
        if (e == ev.ByPosNoHeight) {
          let { from: e, to: s } = i.doc.lineAt(t);
          return new BlockInfo(e, s - e, 0, 0, 0);
        }
        let { firstLine: n, perLine: r, perChar: l } = this.heightMetrics(i, o),
          a = i.doc.lineAt(t),
          h = r + a.length * l,
          c = a.number - n,
          d = s + r * c + l * (a.from - o - c);
        return new BlockInfo(
          a.from,
          a.length,
          Math.max(s, Math.min(d, s + this.height - h)),
          h,
          0
        );
      }
      forEachLine(t, e, i, s, o, n) {
        ((t = Math.max(t, o)), (e = Math.min(e, o + this.length)));
        let { firstLine: r, perLine: l, perChar: a } = this.heightMetrics(i, o);
        for (let h = t, c = s; h <= e;) {
          let e = i.doc.lineAt(h);
          if (h == t) {
            let i = e.number - r;
            c += l * i + a * (t - o - i);
          }
          let s = l + a * e.length;
          (n(new BlockInfo(e.from, e.length, c, s, 0)),
            (c += s),
            (h = e.to + 1));
        }
      }
      replace(t, e, i) {
        let s = this.length - e;
        if (s > 0) {
          let t = i[i.length - 1];
          t instanceof HeightMapGap
            ? (i[i.length - 1] = new HeightMapGap(t.length + s))
            : i.push(null, new HeightMapGap(s - 1));
        }
        if (t > 0) {
          let e = i[0];
          e instanceof HeightMapGap
            ? (i[0] = new HeightMapGap(t + e.length))
            : i.unshift(new HeightMapGap(t - 1), null);
        }
        return HeightMap.of(i);
      }
      decomposeLeft(t, e) {
        e.push(new HeightMapGap(t - 1), null);
      }
      decomposeRight(t, e) {
        e.push(null, new HeightMapGap(this.length - t - 1));
      }
      updateHeight(t, e = 0, i = !1, s) {
        let o = e + this.length;
        if (s && s.from <= e + this.length && s.more) {
          let i = [],
            n = Math.max(e, s.from),
            r = -1;
          for (
            s.from > e &&
            i.push(new HeightMapGap(s.from - e - 1).updateHeight(t, e));
            n <= o && s.more;
          ) {
            let e = t.doc.lineAt(n).length;
            i.length && i.push(null);
            let o = s.heights[s.index++],
              l = 0;
            (o < 0 && ((l = -o), (o = s.heights[s.index++])),
              -1 == r ? (r = o) : Math.abs(o - r) >= 0.001 && (r = -2));
            let a = new HeightMapText(e, o, l);
            ((a.outdated = !1), i.push(a), (n += e + 1));
          }
          n <= o && i.push(null, new HeightMapGap(o - n).updateHeight(t, n));
          let l = HeightMap.of(i);
          return (
            (r < 0 ||
              Math.abs(l.height - this.height) >= 0.001 ||
              Math.abs(r - this.heightMetrics(t, e).perLine) >= 0.001) &&
              (ew = !0),
            eb(this, l)
          );
        }
        return (
          (i || this.outdated) &&
            (this.setHeight(t.heightForGap(e, e + this.length)),
            (this.outdated = !1)),
          this
        );
      }
      toString() {
        return `gap(${this.length})`;
      }
    };
    let HeightMapBranch = class HeightMapBranch extends HeightMap {
      constructor(t, e, i) {
        (super(
          t.length + e + i.length,
          t.height + i.height,
          e | (t.outdated || i.outdated ? 2 : 0)
        ),
          (this.left = t),
          (this.right = i),
          (this.size = t.size + i.size));
      }
      get break() {
        return 1 & this.flags;
      }
      blockAt(t, e, i, s) {
        let o = i + this.left.height;
        return t < o
          ? this.left.blockAt(t, e, i, s)
          : this.right.blockAt(t, e, o, s + this.left.length + this.break);
      }
      lineAt(t, e, i, s, o) {
        let n = s + this.left.height,
          r = o + this.left.length + this.break,
          l = e == ev.ByHeight ? t < n : t < r,
          a = l
            ? this.left.lineAt(t, e, i, s, o)
            : this.right.lineAt(t, e, i, n, r);
        if (this.break || (l ? a.to < r : a.from > r)) return a;
        let h = e == ev.ByPosNoHeight ? ev.ByPosNoHeight : ev.ByPos;
        return l
          ? a.join(this.right.lineAt(r, h, i, n, r))
          : this.left.lineAt(r, h, i, s, o).join(a);
      }
      forEachLine(t, e, i, s, o, n) {
        let r = s + this.left.height,
          l = o + this.left.length + this.break;
        if (this.break)
          (t < l && this.left.forEachLine(t, e, i, s, o, n),
            e >= l && this.right.forEachLine(t, e, i, r, l, n));
        else {
          let a = this.lineAt(l, ev.ByPos, i, s, o);
          (t < a.from && this.left.forEachLine(t, a.from - 1, i, s, o, n),
            a.to >= t && a.from <= e && n(a),
            e > a.to && this.right.forEachLine(a.to + 1, e, i, r, l, n));
        }
      }
      replace(t, e, i) {
        let s = this.left.length + this.break;
        if (e < s) return this.balanced(this.left.replace(t, e, i), this.right);
        if (t > this.left.length)
          return this.balanced(this.left, this.right.replace(t - s, e - s, i));
        let o = [];
        t > 0 && this.decomposeLeft(t, o);
        let n = o.length;
        for (let t of i) o.push(t);
        if ((t > 0 && ex(o, n - 1), e < this.length)) {
          let t = o.length;
          (this.decomposeRight(e, o), ex(o, t));
        }
        return HeightMap.of(o);
      }
      decomposeLeft(t, e) {
        let i = this.left.length;
        if (t <= i) return this.left.decomposeLeft(t, e);
        (e.push(this.left),
          this.break && t >= ++i && e.push(null),
          t > i && this.right.decomposeLeft(t - i, e));
      }
      decomposeRight(t, e) {
        let i = this.left.length,
          s = i + this.break;
        if (t >= s) return this.right.decomposeRight(t - s, e);
        (t < i && this.left.decomposeRight(t, e),
          this.break && t < s && e.push(null),
          e.push(this.right));
      }
      balanced(t, e) {
        return t.size > 2 * e.size || e.size > 2 * t.size
          ? HeightMap.of(this.break ? [t, null, e] : [t, e])
          : ((this.left = eb(this.left, t)),
            (this.right = eb(this.right, e)),
            this.setHeight(t.height + e.height),
            (this.outdated = t.outdated || e.outdated),
            (this.size = t.size + e.size),
            (this.length = t.length + this.break + e.length),
            this);
      }
      updateHeight(t, e = 0, i = !1, s) {
        let { left: o, right: n } = this,
          r = e + o.length + this.break,
          l = null;
        return (s && s.from <= e + o.length && s.more
          ? (l = o = o.updateHeight(t, e, i, s))
          : o.updateHeight(t, e, i),
        s && s.from <= r + n.length && s.more
          ? (l = n = n.updateHeight(t, r, i, s))
          : n.updateHeight(t, r, i),
        l)
          ? this.balanced(o, n)
          : ((this.height = this.left.height + this.right.height),
            (this.outdated = !1),
            this);
      }
      toString() {
        return this.left + (this.break ? ' ' : '-') + this.right;
      }
    };
    function ex(t, e) {
      let i, s;
      null == t[e] &&
        (i = t[e - 1]) instanceof HeightMapGap &&
        (s = t[e + 1]) instanceof HeightMapGap &&
        t.splice(e - 1, 3, new HeightMapGap(i.length + 1 + s.length));
    }
    let NodeBuilder = class NodeBuilder {
      constructor(t, e) {
        ((this.pos = t),
          (this.oracle = e),
          (this.nodes = []),
          (this.lineStart = -1),
          (this.lineEnd = -1),
          (this.covering = null),
          (this.writtenTo = t));
      }
      get isCovered() {
        return (
          this.covering && this.nodes[this.nodes.length - 1] == this.covering
        );
      }
      span(t, e) {
        if (this.lineStart > -1) {
          let t = Math.min(e, this.lineEnd),
            i = this.nodes[this.nodes.length - 1];
          (i instanceof HeightMapText
            ? (i.length += t - this.pos)
            : (t > this.pos || !this.isCovered) &&
              this.nodes.push(new HeightMapText(t - this.pos, -1, 0)),
            (this.writtenTo = t),
            e > t &&
              (this.nodes.push(null), this.writtenTo++, (this.lineStart = -1)));
        }
        this.pos = e;
      }
      point(t, e, i) {
        if (t < e || i.heightRelevant) {
          let s = i.widget ? i.widget.estimatedHeight : 0,
            o = i.widget ? i.widget.lineBreaks : 0;
          s < 0 && (s = this.oracle.lineHeight);
          let n = e - t;
          i.block
            ? this.addBlock(new HeightMapBlock(n, s, i))
            : (n || o || s >= 5) && this.addLineDeco(s, o, n);
        } else e > t && this.span(t, e);
        this.lineEnd > -1 &&
          this.lineEnd < this.pos &&
          (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
      }
      enterLine() {
        if (this.lineStart > -1) return;
        let { from: t, to: e } = this.oracle.doc.lineAt(this.pos);
        ((this.lineStart = t),
          (this.lineEnd = e),
          this.writtenTo < t &&
            ((this.writtenTo < t - 1 ||
              null == this.nodes[this.nodes.length - 1]) &&
              this.nodes.push(this.blankContent(this.writtenTo, t - 1)),
            this.nodes.push(null)),
          this.pos > t &&
            this.nodes.push(new HeightMapText(this.pos - t, -1, 0)),
          (this.writtenTo = this.pos));
      }
      blankContent(t, e) {
        let i = new HeightMapGap(e - t);
        return (this.oracle.doc.lineAt(t).to == e && (i.flags |= 4), i);
      }
      ensureLine() {
        this.enterLine();
        let t = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
        if (t instanceof HeightMapText) return t;
        let e = new HeightMapText(0, -1, 0);
        return (this.nodes.push(e), e);
      }
      addBlock(t) {
        this.enterLine();
        let e = t.deco;
        (e && e.startSide > 0 && !this.isCovered && this.ensureLine(),
          this.nodes.push(t),
          (this.writtenTo = this.pos = this.pos + t.length),
          e && e.endSide > 0 && (this.covering = t));
      }
      addLineDeco(t, e, i) {
        let s = this.ensureLine();
        ((s.length += i),
          (s.collapsed += i),
          (s.widgetHeight = Math.max(s.widgetHeight, t)),
          (s.breaks += e),
          (this.writtenTo = this.pos = this.pos + i));
      }
      finish(t) {
        let e =
          0 == this.nodes.length ? null : this.nodes[this.nodes.length - 1];
        !(this.lineStart > -1) || e instanceof HeightMapText || this.isCovered
          ? (this.writtenTo < this.pos || null == e) &&
            this.nodes.push(this.blankContent(this.writtenTo, this.pos))
          : this.nodes.push(new HeightMapText(0, -1, 0));
        let i = t;
        for (let t of this.nodes)
          (t instanceof HeightMapText && t.updateHeight(this.oracle, i),
            (i += t ? t.length : 1));
        return this.nodes;
      }
      static build(t, e, i, s) {
        let o = new NodeBuilder(i, t);
        return (l.om.spans(e, i, s, o, 0), o.finish(i));
      }
    };
    let DecorationComparator = class DecorationComparator {
      constructor() {
        this.changes = [];
      }
      compareRange() {}
      comparePoint(t, e, i, s) {
        (t < e || (i && i.heightRelevant) || (s && s.heightRelevant)) &&
          O(t, e, this.changes, 5);
      }
    };
    let LineGap = class LineGap {
      constructor(t, e, i, s) {
        ((this.from = t),
          (this.to = e),
          (this.size = i),
          (this.displaySize = s));
      }
      static same(t, e) {
        if (t.length != e.length) return !1;
        for (let i = 0; i < t.length; i++) {
          let s = t[i],
            o = e[i];
          if (s.from != o.from || s.to != o.to || s.size != o.size) return !1;
        }
        return !0;
      }
      draw(t, e) {
        return Decoration.replace({
          widget: new LineGapWidget(
            this.displaySize * (e ? t.scaleY : t.scaleX),
            e
          )
        }).range(this.from, this.to);
      }
    };
    let LineGapWidget = class LineGapWidget extends WidgetType {
      constructor(t, e) {
        (super(), (this.size = t), (this.vertical = e));
      }
      eq(t) {
        return t.size == this.size && t.vertical == this.vertical;
      }
      toDOM() {
        let t = document.createElement('div');
        return (
          this.vertical
            ? (t.style.height = this.size + 'px')
            : ((t.style.width = this.size + 'px'),
              (t.style.height = '2px'),
              (t.style.display = 'inline-block')),
          t
        );
      }
      get estimatedHeight() {
        return this.vertical ? this.size : -1;
      }
    };
    let ViewState = class ViewState {
      constructor(t, e) {
        ((this.view = t),
          (this.state = e),
          (this.pixelViewport = {
            left: 0,
            right: window.innerWidth,
            top: 0,
            bottom: 0
          }),
          (this.inView = !0),
          (this.paddingTop = 0),
          (this.paddingBottom = 0),
          (this.contentDOMWidth = 0),
          (this.contentDOMHeight = 0),
          (this.editorHeight = 0),
          (this.editorWidth = 0),
          (this.scaleX = 1),
          (this.scaleY = 1),
          (this.scrollOffset = 0),
          (this.scrolledToBottom = !1),
          (this.scrollAnchorPos = 0),
          (this.scrollAnchorHeight = -1),
          (this.scaler = ek),
          (this.scrollTarget = null),
          (this.printing = !1),
          (this.mustMeasureContent = !0),
          (this.defaultTextDirection = U.LTR),
          (this.visibleRanges = []),
          (this.mustEnforceCursorAssoc = !1));
        let i = e
          .facet(tO)
          .some(t => 'function' != typeof t && 'cm-lineWrapping' == t.class);
        ((this.heightOracle = new HeightOracle(i)),
          (this.stateDeco = eC(e)),
          (this.heightMap = HeightMap.empty().applyChanges(
            this.stateDeco,
            l.EY.empty,
            this.heightOracle.setDoc(e.doc),
            [new ChangedRange(0, 0, 0, e.doc.length)]
          )));
        for (
          let t = 0;
          t < 2 &&
          ((this.viewport = this.getViewport(0, null)),
          this.updateForViewport());
          t++
        );
        (this.updateViewportLines(),
          (this.lineGaps = this.ensureLineGaps([])),
          (this.lineGapDeco = Decoration.set(
            this.lineGaps.map(t => t.draw(this, !1))
          )),
          (this.scrollParent = t.scrollDOM),
          this.computeVisibleRanges());
      }
      updateForViewport() {
        let t = [this.viewport],
          { main: e } = this.state.selection;
        for (let i = 0; i <= 1; i++) {
          let s = i ? e.head : e.anchor;
          if (!t.some(({ from: t, to: e }) => s >= t && s <= e)) {
            let { from: e, to: i } = this.lineBlockAt(s);
            t.push(new Viewport(e, i));
          }
        }
        return (
          (this.viewports = t.sort((t, e) => t.from - e.from)),
          this.updateScaler()
        );
      }
      updateScaler() {
        let t = this.scaler;
        return (
          (this.scaler =
            this.heightMap.height <= 7e6
              ? ek
              : new BigScaler(
                  this.heightOracle,
                  this.heightMap,
                  this.viewports
                )),
          2 * !t.eq(this.scaler)
        );
      }
      updateViewportLines() {
        ((this.viewportLines = []),
          this.heightMap.forEachLine(
            this.viewport.from,
            this.viewport.to,
            this.heightOracle.setDoc(this.state.doc),
            0,
            0,
            t => {
              this.viewportLines.push(eT(t, this.scaler));
            }
          ));
      }
      update(t, e = null) {
        var i, s;
        let o;
        this.state = t.state;
        let n = this.stateDeco;
        this.stateDeco = eC(this.state);
        let r = t.changedRanges,
          a = ChangedRange.extendWithRanges(
            r,
            ((i = this.stateDeco),
            (s = t ? t.changes : l.VR.empty(this.state.doc.length)),
            (o = new DecorationComparator()),
            l.om.compare(n, i, s, o, 0),
            o.changes)
          ),
          h = this.heightMap.height,
          c = this.scrolledToBottom
            ? null
            : this.scrollAnchorAt(this.scrollOffset);
        ((ew = !1),
          (this.heightMap = this.heightMap.applyChanges(
            this.stateDeco,
            t.startState.doc,
            this.heightOracle.setDoc(this.state.doc),
            a
          )),
          (this.heightMap.height != h || ew) && (t.flags |= 2),
          c
            ? ((this.scrollAnchorPos = t.changes.mapPos(c.from, -1)),
              (this.scrollAnchorHeight = c.top))
            : ((this.scrollAnchorPos = -1), (this.scrollAnchorHeight = h)));
        let d = a.length
          ? this.mapViewport(this.viewport, t.changes)
          : this.viewport;
        ((e && (e.range.head < d.from || e.range.head > d.to)) ||
          !this.viewportIsAppropriate(d)) &&
          (d = this.getViewport(0, e));
        let u = d.from != this.viewport.from || d.to != this.viewport.to;
        ((this.viewport = d),
          (t.flags |= this.updateForViewport()),
          (u || !t.changes.empty || 2 & t.flags) && this.updateViewportLines(),
          (this.lineGaps.length ||
            this.viewport.to - this.viewport.from > 4e3) &&
            this.updateLineGaps(
              this.ensureLineGaps(this.mapLineGaps(this.lineGaps, t.changes))
            ),
          (t.flags |= this.computeVisibleRanges(t.changes)),
          e && (this.scrollTarget = e),
          !this.mustEnforceCursorAssoc &&
            (t.selectionSet || t.focusChanged) &&
            t.view.lineWrapping &&
            t.state.selection.main.empty &&
            t.state.selection.main.assoc &&
            !t.state.facet(tb) &&
            (this.mustEnforceCursorAssoc = !0));
      }
      measure() {
        var t;
        let e,
          i,
          { view: s } = this,
          o = s.contentDOM,
          n = window.getComputedStyle(o),
          r = this.heightOracle,
          a = n.whiteSpace;
        this.defaultTextDirection = 'rtl' == n.direction ? U.RTL : U.LTR;
        let h =
            this.heightOracle.mustRefreshForWrapping(a) ||
            'refresh' === this.mustMeasureContent,
          c = o.getBoundingClientRect(),
          d = h || this.mustMeasureContent || this.contentDOMHeight != c.height;
        ((this.contentDOMHeight = c.height), (this.mustMeasureContent = !1));
        let u = 0,
          f = 0;
        if (c.width && c.height) {
          let { scaleX: t, scaleY: e } = F(o, c);
          ((t > 0.005 && Math.abs(this.scaleX - t) > 0.005) ||
            (e > 0.005 && Math.abs(this.scaleY - e) > 0.005)) &&
            ((this.scaleX = t), (this.scaleY = e), (u |= 16), (h = d = !0));
        }
        let p = (parseInt(n.paddingTop) || 0) * this.scaleY,
          g = (parseInt(n.paddingBottom) || 0) * this.scaleY;
        ((this.paddingTop != p || this.paddingBottom != g) &&
          ((this.paddingTop = p), (this.paddingBottom = g), (u |= 18)),
          this.editorWidth != s.scrollDOM.clientWidth &&
            (r.lineWrapping && (d = !0),
            (this.editorWidth = s.scrollDOM.clientWidth),
            (u |= 16)));
        let m = I(this.view.contentDOM, !1).y;
        m != this.scrollParent &&
          ((this.scrollParent = m),
          (this.scrollAnchorHeight = -1),
          (this.scrollOffset = 0));
        let w = this.getScrollOffset();
        (this.scrollOffset != w &&
          ((this.scrollAnchorHeight = -1), (this.scrollOffset = w)),
          (this.scrolledToBottom = Y(this.scrollParent || s.win)));
        let v = (
            this.printing
              ? function (t, e) {
                  let i = t.getBoundingClientRect();
                  return {
                    left: 0,
                    right: i.right - i.left,
                    top: e,
                    bottom: i.bottom - (i.top + e)
                  };
                }
              : function (t, e) {
                  let i = t.getBoundingClientRect(),
                    s = t.ownerDocument,
                    o = s.defaultView || window,
                    n = Math.max(0, i.left),
                    r = Math.min(o.innerWidth, i.right),
                    l = Math.max(0, i.top),
                    a = Math.min(o.innerHeight, i.bottom);
                  for (let e = t.parentNode; e && e != s.body;)
                    if (1 == e.nodeType) {
                      let i = e,
                        s = window.getComputedStyle(i);
                      if (
                        (i.scrollHeight > i.clientHeight ||
                          i.scrollWidth > i.clientWidth) &&
                        'visible' != s.overflow
                      ) {
                        let s = i.getBoundingClientRect();
                        ((n = Math.max(n, s.left)),
                          (r = Math.min(r, s.right)),
                          (l = Math.max(l, s.top)),
                          (a = Math.min(
                            e == t.parentNode ? o.innerHeight : a,
                            s.bottom
                          )));
                      }
                      e =
                        'absolute' == s.position || 'fixed' == s.position
                          ? i.offsetParent
                          : i.parentNode;
                    } else if (11 == e.nodeType) e = e.host;
                    else break;
                  return {
                    left: n - i.left,
                    right: Math.max(n, r) - i.left,
                    top: l - (i.top + e),
                    bottom: Math.max(l, a) - (i.top + e)
                  };
                }
          )(o, this.paddingTop),
          b = v.top - this.pixelViewport.top,
          y = v.bottom - this.pixelViewport.bottom;
        this.pixelViewport = v;
        let x =
          this.pixelViewport.bottom > this.pixelViewport.top &&
          this.pixelViewport.right > this.pixelViewport.left;
        if (
          (x != this.inView && ((this.inView = x), x && (d = !0)),
          !this.inView &&
            !this.scrollTarget &&
            ((e = (t = s.dom).getBoundingClientRect()),
            (i = t.ownerDocument.defaultView || window),
            !(e.left < i.innerWidth) ||
              !(e.right > 0) ||
              !(e.top < i.innerHeight) ||
              !(e.bottom > 0)))
        )
          return 0;
        let M = c.width;
        if (
          ((this.contentDOMWidth != M ||
            this.editorHeight != s.scrollDOM.clientHeight) &&
            ((this.contentDOMWidth = c.width),
            (this.editorHeight = s.scrollDOM.clientHeight),
            (u |= 16)),
          d)
        ) {
          let t = s.docView.measureVisibleLineHeights(this.viewport);
          if (
            (r.mustRefreshForHeights(t) && (h = !0),
            h ||
              (r.lineWrapping &&
                Math.abs(M - this.contentDOMWidth) > r.charWidth))
          ) {
            let {
              lineHeight: e,
              charWidth: i,
              textHeight: o
            } = s.docView.measureTextSize();
            (h = e > 0 && r.refresh(a, e, i, o, Math.max(5, M / i), t)) &&
              ((s.docView.minWidth = 0), (u |= 16));
          }
          for (let e of (b > 0 && y > 0
            ? (f = Math.max(b, y))
            : b < 0 && y < 0 && (f = Math.min(b, y)),
          (ew = !1),
          this.viewports)) {
            let i =
              e.from == this.viewport.from
                ? t
                : s.docView.measureVisibleLineHeights(e);
            this.heightMap = (
              h
                ? HeightMap.empty().applyChanges(
                    this.stateDeco,
                    l.EY.empty,
                    this.heightOracle,
                    [new ChangedRange(0, 0, 0, s.state.doc.length)]
                  )
                : this.heightMap
            ).updateHeight(r, 0, h, new MeasuredHeights(e.from, i));
          }
          ew && (u |= 2);
        }
        let S =
          !this.viewportIsAppropriate(this.viewport, f) ||
          (this.scrollTarget &&
            (this.scrollTarget.range.head < this.viewport.from ||
              this.scrollTarget.range.head > this.viewport.to));
        return (
          S &&
            (2 & u && (u |= this.updateScaler()),
            (this.viewport = this.getViewport(f, this.scrollTarget)),
            (u |= this.updateForViewport())),
          (2 & u || S) && this.updateViewportLines(),
          (this.lineGaps.length ||
            this.viewport.to - this.viewport.from > 4e3) &&
            this.updateLineGaps(this.ensureLineGaps(h ? [] : this.lineGaps, s)),
          (u |= this.computeVisibleRanges()),
          this.mustEnforceCursorAssoc &&
            ((this.mustEnforceCursorAssoc = !1),
            s.docView.enforceCursorAssoc()),
          u
        );
      }
      get visibleTop() {
        return this.scaler.fromDOM(this.pixelViewport.top);
      }
      get visibleBottom() {
        return this.scaler.fromDOM(this.pixelViewport.bottom);
      }
      getViewport(t, e) {
        let i = 0.5 - Math.max(-0.5, Math.min(0.5, t / 1e3 / 2)),
          s = this.heightMap,
          o = this.heightOracle,
          { visibleTop: n, visibleBottom: r } = this,
          l = new Viewport(
            s.lineAt(n - 1e3 * i, ev.ByHeight, o, 0, 0).from,
            s.lineAt(r + (1 - i) * 1e3, ev.ByHeight, o, 0, 0).to
          );
        if (e) {
          let { head: t } = e.range;
          if (t < l.from || t > l.to) {
            let i = Math.min(
                this.editorHeight,
                this.pixelViewport.bottom - this.pixelViewport.top
              ),
              n = s.lineAt(t, ev.ByPos, o, 0, 0),
              r;
            ((r =
              'center' == e.y
                ? (n.top + n.bottom) / 2 - i / 2
                : 'start' == e.y || ('nearest' == e.y && t < l.from)
                  ? n.top
                  : n.bottom - i),
              (l = new Viewport(
                s.lineAt(r - 500, ev.ByHeight, o, 0, 0).from,
                s.lineAt(r + i + 500, ev.ByHeight, o, 0, 0).to
              )));
          }
        }
        return l;
      }
      mapViewport(t, e) {
        let i = e.mapPos(t.from, -1),
          s = e.mapPos(t.to, 1);
        return new Viewport(
          this.heightMap.lineAt(i, ev.ByPos, this.heightOracle, 0, 0).from,
          this.heightMap.lineAt(s, ev.ByPos, this.heightOracle, 0, 0).to
        );
      }
      viewportIsAppropriate({ from: t, to: e }, i = 0) {
        if (!this.inView) return !0;
        let { top: s } = this.heightMap.lineAt(
            t,
            ev.ByPos,
            this.heightOracle,
            0,
            0
          ),
          { bottom: o } = this.heightMap.lineAt(
            e,
            ev.ByPos,
            this.heightOracle,
            0,
            0
          ),
          { visibleTop: n, visibleBottom: r } = this;
        return (
          (0 == t || s <= n - Math.max(10, Math.min(-i, 250))) &&
          (e == this.state.doc.length ||
            o >= r + Math.max(10, Math.min(i, 250))) &&
          s > n - 2e3 &&
          o < r + 2e3
        );
      }
      mapLineGaps(t, e) {
        if (!t.length || e.empty) return t;
        let i = [];
        for (let s of t)
          e.touchesRange(s.from, s.to) ||
            i.push(
              new LineGap(
                e.mapPos(s.from),
                e.mapPos(s.to),
                s.size,
                s.displaySize
              )
            );
        return i;
      }
      ensureLineGaps(t, e) {
        let i = this.heightOracle.lineWrapping,
          s = i ? 1e4 : 2e3,
          o = s >> 1,
          n = s << 1;
        if (this.defaultTextDirection != U.LTR && !i) return [];
        let r = [],
          a = (s, n, h, c) => {
            if (n - s < o) return;
            let d = this.state.selection.main,
              u = [d.from];
            for (let t of (d.empty || u.push(d.to), u))
              if (t > s && t < n) {
                (a(s, t - 10, h, c), a(t + 10, n, h, c));
                return;
              }
            let f = (function (t, e) {
              for (let i of t) if (e(i)) return i;
            })(
              t,
              t =>
                t.from >= h.from &&
                t.to <= h.to &&
                Math.abs(t.from - s) < o &&
                Math.abs(t.to - n) < o &&
                !u.some(e => t.from < e && t.to > e)
            );
            if (!f) {
              if (
                n < h.to &&
                e &&
                i &&
                e.visibleRanges.some(t => t.from <= n && t.to >= n)
              ) {
                let t = e.moveToLineBoundary(l.OF.cursor(n), !1, !0).head;
                t > s && (n = t);
              }
              let t = this.gapSize(h, s, n, c),
                o = i || t < 2e6 ? t : 2e6;
              f = new LineGap(s, n, t, o);
            }
            r.push(f);
          },
          h = e => {
            var o, r, h;
            let c, d, u, f, p;
            if (e.length < n || e.type != T.Text) return;
            let g =
              ((o = e.from),
              (r = e.to),
              (h = this.stateDeco),
              (u = []),
              (f = o),
              (p = 0),
              l.om.spans(
                h,
                o,
                r,
                {
                  span() {},
                  point(t, e) {
                    (t > f && (u.push({ from: f, to: t }), (p += t - f)),
                      (f = e));
                  }
                },
                20
              ),
              f < r && (u.push({ from: f, to: r }), (p += r - f)),
              { total: p, ranges: u });
            if (g.total < n) return;
            let m = this.scrollTarget ? this.scrollTarget.range.head : null;
            if (i) {
              let t,
                i,
                o =
                  (s / this.heightOracle.lineLength) *
                  this.heightOracle.lineHeight;
              if (null != m) {
                let s = eS(g, m),
                  n =
                    ((this.visibleBottom - this.visibleTop) / 2 + o) / e.height;
                ((t = s - n), (i = s + n));
              } else
                ((t = (this.visibleTop - e.top - o) / e.height),
                  (i = (this.visibleBottom - e.top + o) / e.height));
              ((c = eM(g, t)), (d = eM(g, i)));
            } else {
              let i,
                o,
                n = g.total * this.heightOracle.charWidth,
                r = s * this.heightOracle.charWidth,
                l = 0;
              if (n > 2e6)
                for (let i of t)
                  i.from >= e.from &&
                    i.from < e.to &&
                    i.size != i.displaySize &&
                    i.from * this.heightOracle.charWidth + l <
                      this.pixelViewport.left &&
                    (l = i.size - i.displaySize);
              let a = this.pixelViewport.left + l,
                h = this.pixelViewport.right + l;
              if (null != m) {
                let t = eS(g, m),
                  e = ((h - a) / 2 + r) / n;
                ((i = t - e), (o = t + e));
              } else ((i = (a - r) / n), (o = (h + r) / n));
              ((c = eM(g, i)), (d = eM(g, o)));
            }
            (c > e.from && a(e.from, c, e, g), d < e.to && a(d, e.to, e, g));
          };
        for (let t of this.viewportLines)
          Array.isArray(t.type) ? t.type.forEach(h) : h(t);
        return r;
      }
      gapSize(t, e, i, s) {
        let o = eS(s, i) - eS(s, e);
        return this.heightOracle.lineWrapping
          ? t.height * o
          : s.total * this.heightOracle.charWidth * o;
      }
      updateLineGaps(t) {
        LineGap.same(t, this.lineGaps) ||
          ((this.lineGaps = t),
          (this.lineGapDeco = Decoration.set(
            t.map(t => t.draw(this, this.heightOracle.lineWrapping))
          )));
      }
      computeVisibleRanges(t) {
        let e = this.stateDeco;
        this.lineGaps.length && (e = e.concat(this.lineGapDeco));
        let i = [];
        l.om.spans(
          e,
          this.viewport.from,
          this.viewport.to,
          {
            span(t, e) {
              i.push({ from: t, to: e });
            },
            point() {}
          },
          20
        );
        let s = 0;
        if (i.length != this.visibleRanges.length) s = 12;
        else
          for (let e = 0; e < i.length && !(8 & s); e++) {
            let o = this.visibleRanges[e],
              n = i[e];
            (o.from != n.from || o.to != n.to) &&
              ((s |= 4),
              (t &&
                t.mapPos(o.from, -1) == n.from &&
                t.mapPos(o.to, 1) == n.to) ||
                (s |= 8));
          }
        return ((this.visibleRanges = i), s);
      }
      lineBlockAt(t) {
        return (
          (t >= this.viewport.from &&
            t <= this.viewport.to &&
            this.viewportLines.find(e => e.from <= t && e.to >= t)) ||
          eT(
            this.heightMap.lineAt(t, ev.ByPos, this.heightOracle, 0, 0),
            this.scaler
          )
        );
      }
      lineBlockAtHeight(t) {
        return (
          (t >= this.viewportLines[0].top &&
            t <= this.viewportLines[this.viewportLines.length - 1].bottom &&
            this.viewportLines.find(e => e.top <= t && e.bottom >= t)) ||
          eT(
            this.heightMap.lineAt(
              this.scaler.fromDOM(t),
              ev.ByHeight,
              this.heightOracle,
              0,
              0
            ),
            this.scaler
          )
        );
      }
      getScrollOffset() {
        return (
          (this.scrollParent == this.view.scrollDOM
            ? this.scrollParent.scrollTop
            : (this.scrollParent
                ? this.scrollParent.getBoundingClientRect().top
                : 0) - this.view.contentDOM.getBoundingClientRect().top) *
          this.scaleY
        );
      }
      scrollAnchorAt(t) {
        let e = this.lineBlockAtHeight(t + 8);
        return e.from >= this.viewport.from ||
          this.viewportLines[0].top - t > 200
          ? e
          : this.viewportLines[0];
      }
      elementAtHeight(t) {
        return eT(
          this.heightMap.blockAt(
            this.scaler.fromDOM(t),
            this.heightOracle,
            0,
            0
          ),
          this.scaler
        );
      }
      get docHeight() {
        return this.scaler.toDOM(this.heightMap.height);
      }
      get contentHeight() {
        return this.docHeight + this.paddingTop + this.paddingBottom;
      }
    };
    let Viewport = class Viewport {
      constructor(t, e) {
        ((this.from = t), (this.to = e));
      }
    };
    function eM({ total: t, ranges: e }, i) {
      if (i <= 0) return e[0].from;
      if (i >= 1) return e[e.length - 1].to;
      let s = Math.floor(t * i);
      for (let t = 0; ; t++) {
        let { from: i, to: o } = e[t],
          n = o - i;
        if (s <= n) return i + s;
        s -= n;
      }
    }
    function eS(t, e) {
      let i = 0;
      for (let { from: s, to: o } of t.ranges) {
        if (e <= o) {
          i += e - s;
          break;
        }
        i += o - s;
      }
      return i / t.total;
    }
    let ek = {
      toDOM: t => t,
      fromDOM: t => t,
      scale: 1,
      eq(t) {
        return t == this;
      }
    };
    function eC(t) {
      let e = t.facet(tD).filter(t => 'function' != typeof t),
        i = t.facet(tE).filter(t => 'function' != typeof t);
      return (i.length && e.push(l.om.join(i)), e);
    }
    let BigScaler = class BigScaler {
      constructor(t, e, i) {
        let s = 0,
          o = 0,
          n = 0;
        for (let r of ((this.viewports = i.map(({ from: i, to: o }) => {
          let n = e.lineAt(i, ev.ByPos, t, 0, 0).top,
            r = e.lineAt(o, ev.ByPos, t, 0, 0).bottom;
          return (
            (s += r - n),
            { from: i, to: o, top: n, bottom: r, domTop: 0, domBottom: 0 }
          );
        })),
        (this.scale = (7e6 - s) / (e.height - s)),
        this.viewports))
          ((r.domTop = n + (r.top - o) * this.scale),
            (n = r.domBottom = r.domTop + (r.bottom - r.top)),
            (o = r.bottom));
      }
      toDOM(t) {
        for (let e = 0, i = 0, s = 0; ; e++) {
          let o = e < this.viewports.length ? this.viewports[e] : null;
          if (!o || t < o.top) return s + (t - i) * this.scale;
          if (t <= o.bottom) return o.domTop + (t - o.top);
          ((i = o.bottom), (s = o.domBottom));
        }
      }
      fromDOM(t) {
        for (let e = 0, i = 0, s = 0; ; e++) {
          let o = e < this.viewports.length ? this.viewports[e] : null;
          if (!o || t < o.domTop) return i + (t - s) / this.scale;
          if (t <= o.domBottom) return o.top + (t - o.domTop);
          ((i = o.bottom), (s = o.domBottom));
        }
      }
      eq(t) {
        return (
          t instanceof BigScaler &&
          this.scale == t.scale &&
          this.viewports.length == t.viewports.length &&
          this.viewports.every(
            (e, i) => e.from == t.viewports[i].from && e.to == t.viewports[i].to
          )
        );
      }
    };
    function eT(t, e) {
      if (1 == e.scale) return t;
      let i = e.toDOM(t.top),
        s = e.toDOM(t.bottom);
      return new BlockInfo(
        t.from,
        t.length,
        i,
        s - i,
        Array.isArray(t._content) ? t._content.map(t => eT(t, e)) : t._content
      );
    }
    let eA = l.sj.define({ combine: t => t.join(' ') }),
      eO = l.sj.define({ combine: t => t.indexOf(!0) > -1 }),
      eD = a.G.newName(),
      eB = a.G.newName(),
      eE = a.G.newName(),
      eR = { '&light': '.' + eB, '&dark': '.' + eE };
    function eH(t, e, i) {
      return new a.G(e, {
        finish: e =>
          /&/.test(e)
            ? e.replace(/&\w*/, e => {
                if ('&' == e) return t;
                if (!i || !i[e]) throw RangeError(`Unsupported selector: ${e}`);
                return i[e];
              })
            : t + ' ' + e
      });
    }
    let eL = eH(
        '.' + eD,
        {
          '&': {
            position: 'relative !important',
            boxSizing: 'border-box',
            '&.cm-focused': { outline: '1px dotted #212121' },
            display: 'flex !important',
            flexDirection: 'column'
          },
          '.cm-scroller': {
            display: 'flex !important',
            alignItems: 'flex-start !important',
            fontFamily: 'monospace',
            lineHeight: 1.4,
            height: '100%',
            overflowX: 'auto',
            position: 'relative',
            zIndex: 0,
            overflowAnchor: 'none'
          },
          '.cm-content': {
            margin: 0,
            flexGrow: 2,
            flexShrink: 0,
            display: 'block',
            whiteSpace: 'pre',
            wordWrap: 'normal',
            boxSizing: 'border-box',
            minHeight: '100%',
            padding: '4px 0',
            outline: 'none',
            '&[contenteditable=true]': {
              WebkitUserModify: 'read-write-plaintext-only'
            }
          },
          '.cm-lineWrapping': {
            whiteSpace_fallback: 'pre-wrap',
            whiteSpace: 'break-spaces',
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
            flexShrink: 1
          },
          '&light .cm-content': { caretColor: 'black' },
          '&dark .cm-content': { caretColor: 'white' },
          '.cm-line': { display: 'block', padding: '0 2px 0 6px' },
          '.cm-layer': {
            userSelect: 'none',
            position: 'absolute',
            left: 0,
            top: 0,
            contain: 'size style',
            '& > *': { position: 'absolute' }
          },
          '&light .cm-selectionBackground': { background: '#d9d9d9' },
          '&dark .cm-selectionBackground': { background: '#222' },
          '&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground':
            { background: '#d7d4f0' },
          '&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground':
            { background: '#233' },
          '.cm-cursorLayer': { pointerEvents: 'none' },
          '&.cm-focused > .cm-scroller > .cm-cursorLayer': {
            animation: 'steps(1) cm-blink 1.2s infinite'
          },
          '@keyframes cm-blink': {
            '0%': {},
            '50%': { opacity: 0 },
            '100%': {}
          },
          '@keyframes cm-blink2': {
            '0%': {},
            '50%': { opacity: 0 },
            '100%': {}
          },
          '.cm-cursor, .cm-dropCursor': {
            borderLeft: '1.2px solid black',
            marginLeft: '-0.6px',
            pointerEvents: 'none'
          },
          '.cm-cursor': { display: 'none' },
          '&dark .cm-cursor': { borderLeftColor: '#ddd' },
          '.cm-selectionHandle': {
            backgroundColor: 'currentColor',
            width: '1.5px'
          },
          '.cm-selectionHandle-start::before, .cm-selectionHandle-end::before':
            {
              content: '""',
              backgroundColor: 'inherit',
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              position: 'absolute',
              left: '-3.25px'
            },
          '.cm-selectionHandle-start::before': { top: '-8px' },
          '.cm-selectionHandle-end::before': { bottom: '-8px' },
          '.cm-dropCursor': { position: 'absolute' },
          '&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor': {
            display: 'block'
          },
          '.cm-iso': { unicodeBidi: 'isolate' },
          '.cm-announced': { position: 'fixed', top: '-10000px' },
          '@media print': { '.cm-announced': { display: 'none' } },
          '&light .cm-activeLine': { backgroundColor: '#cceeff44' },
          '&dark .cm-activeLine': { backgroundColor: '#99eeff33' },
          '&light .cm-specialChar': { color: 'red' },
          '&dark .cm-specialChar': { color: '#f78' },
          '.cm-gutters': {
            flexShrink: 0,
            display: 'flex',
            height: '100%',
            boxSizing: 'border-box',
            zIndex: 200
          },
          '.cm-gutters-before': { insetInlineStart: 0 },
          '.cm-gutters-after': { insetInlineEnd: 0 },
          '&light .cm-gutters': {
            backgroundColor: '#f5f5f5',
            color: '#6c6c6c',
            border: '0px solid #ddd',
            '&.cm-gutters-before': { borderRightWidth: '1px' },
            '&.cm-gutters-after': { borderLeftWidth: '1px' }
          },
          '&dark .cm-gutters': { backgroundColor: '#333338', color: '#ccc' },
          '.cm-gutter': {
            display: 'flex !important',
            flexDirection: 'column',
            flexShrink: 0,
            boxSizing: 'border-box',
            minHeight: '100%',
            overflow: 'hidden'
          },
          '.cm-gutterElement': { boxSizing: 'border-box' },
          '.cm-lineNumbers .cm-gutterElement': {
            padding: '0 3px 0 5px',
            minWidth: '20px',
            textAlign: 'right',
            whiteSpace: 'nowrap'
          },
          '&light .cm-activeLineGutter': { backgroundColor: '#e2f2ff' },
          '&dark .cm-activeLineGutter': { backgroundColor: '#222227' },
          '.cm-panels': {
            boxSizing: 'border-box',
            position: 'sticky',
            left: 0,
            right: 0,
            zIndex: 300
          },
          '&light .cm-panels': { backgroundColor: '#f5f5f5', color: 'black' },
          '.cm-panels-top': { top: '0' },
          '.cm-panels-bottom': { bottom: '0' },
          '&light .cm-panels-top': { borderBottom: '1px solid #ddd' },
          '&light .cm-panels-bottom': { borderTop: '1px solid #ddd' },
          '&dark .cm-panels': { backgroundColor: '#333338', color: 'white' },
          '.cm-dialog': {
            padding: '2px 19px 4px 6px',
            position: 'relative',
            '& label': { fontSize: '80%' }
          },
          '.cm-dialog-close': {
            position: 'absolute',
            top: '3px',
            right: '4px',
            backgroundColor: 'inherit',
            border: 'none',
            font: 'inherit',
            fontSize: '14px',
            padding: '0'
          },
          '.cm-tab': {
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom'
          },
          '.cm-widgetBuffer': {
            verticalAlign: 'text-top',
            height: '1em',
            width: 0,
            display: 'inline'
          },
          '.cm-placeholder': {
            color: '#888',
            display: 'inline-block',
            verticalAlign: 'top',
            userSelect: 'none'
          },
          '.cm-highlightSpace': {
            backgroundImage:
              'radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)',
            backgroundPosition: 'center'
          },
          '.cm-highlightTab': {
            backgroundImage:
              'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>\')',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right 90%',
            backgroundRepeat: 'no-repeat'
          },
          '.cm-trailingSpace': { backgroundColor: '#ff332255' },
          '.cm-button': {
            verticalAlign: 'middle',
            color: 'inherit',
            fontSize: '70%',
            padding: '.2em 1em',
            borderRadius: '1px'
          },
          '&light .cm-button': {
            backgroundImage: 'linear-gradient(#eff1f5, #d9d9df)',
            border: '1px solid #888',
            '&:active': { backgroundImage: 'linear-gradient(#b4b4b4, #d0d3d6)' }
          },
          '&dark .cm-button': {
            backgroundImage: 'linear-gradient(#393939, #111)',
            border: '1px solid #888',
            '&:active': { backgroundImage: 'linear-gradient(#111, #333)' }
          },
          '.cm-textfield': {
            verticalAlign: 'middle',
            color: 'inherit',
            fontSize: '70%',
            border: '1px solid silver',
            padding: '.2em .5em'
          },
          '&light .cm-textfield': { backgroundColor: 'white' },
          '&dark .cm-textfield': {
            border: '1px solid #555',
            backgroundColor: 'inherit'
          }
        },
        eR
      ),
      eV = {
        childList: !0,
        characterData: !0,
        subtree: !0,
        attributes: !0,
        characterDataOldValue: !0
      },
      eW = x.ie && x.ie_version <= 11;
    let DOMObserver = class DOMObserver {
      constructor(t) {
        ((this.view = t),
          (this.active = !1),
          (this.editContext = null),
          (this.selectionRange = new DOMSelectionState()),
          (this.selectionChanged = !1),
          (this.delayedFlush = -1),
          (this.resizeTimeout = -1),
          (this.queue = []),
          (this.delayedAndroidKey = null),
          (this.flushingAndroidKey = -1),
          (this.lastChange = 0),
          (this.scrollTargets = []),
          (this.intersection = null),
          (this.resizeScroll = null),
          (this.intersecting = !1),
          (this.gapIntersection = null),
          (this.gaps = []),
          (this.printQuery = null),
          (this.parentCheck = -1),
          (this.dom = t.contentDOM),
          (this.observer = new MutationObserver(e => {
            for (let t of e) this.queue.push(t);
            ((x.ie && x.ie_version <= 11) || (x.ios && t.composing)) &&
            e.some(
              t =>
                ('childList' == t.type && t.removedNodes.length) ||
                ('characterData' == t.type &&
                  t.oldValue.length > t.target.nodeValue.length)
            )
              ? this.flushSoon()
              : this.flush();
          })),
          window.EditContext &&
            x.android &&
            !1 !== t.constructor.EDIT_CONTEXT &&
            !(x.chrome && x.chrome_version < 126) &&
            ((this.editContext = new EditContextManager(t)),
            t.state.facet(tk) &&
              (t.contentDOM.editContext = this.editContext.editContext)),
          eW &&
            (this.onCharData = t => {
              (this.queue.push({
                target: t.target,
                type: 'characterData',
                oldValue: t.prevValue
              }),
                this.flushSoon());
            }),
          (this.onSelectionChange = this.onSelectionChange.bind(this)),
          (this.onResize = this.onResize.bind(this)),
          (this.onPrint = this.onPrint.bind(this)),
          (this.onScroll = this.onScroll.bind(this)),
          window.matchMedia && (this.printQuery = window.matchMedia('print')),
          'function' == typeof ResizeObserver &&
            ((this.resizeScroll = new ResizeObserver(() => {
              var t;
              (null == (t = this.view.docView) ? void 0 : t.lastUpdate) <
                Date.now() - 75 && this.onResize();
            })),
            this.resizeScroll.observe(t.scrollDOM)),
          this.addWindowListeners((this.win = t.win)),
          this.start(),
          'function' == typeof IntersectionObserver &&
            ((this.intersection = new IntersectionObserver(
              t => {
                (this.parentCheck < 0 &&
                  (this.parentCheck = setTimeout(
                    this.listenForScroll.bind(this),
                    1e3
                  )),
                  t.length > 0 &&
                    t[t.length - 1].intersectionRatio > 0 !=
                      this.intersecting &&
                    ((this.intersecting = !this.intersecting),
                    this.intersecting != this.view.inView &&
                      this.onScrollChanged(document.createEvent('Event'))));
              },
              { threshold: [0, 0.001] }
            )),
            this.intersection.observe(this.dom),
            (this.gapIntersection = new IntersectionObserver(t => {
              t.length > 0 &&
                t[t.length - 1].intersectionRatio > 0 &&
                this.onScrollChanged(document.createEvent('Event'));
            }, {}))),
          this.listenForScroll(),
          this.readSelectionRange());
      }
      onScrollChanged(t) {
        (this.view.inputState.runHandlers('scroll', t),
          this.intersecting && this.view.measure());
      }
      onScroll(t) {
        (this.intersecting && this.flush(!1),
          this.editContext &&
            this.view.requestMeasure(this.editContext.measureReq),
          this.onScrollChanged(t));
      }
      onResize() {
        this.resizeTimeout < 0 &&
          (this.resizeTimeout = setTimeout(() => {
            ((this.resizeTimeout = -1), this.view.requestMeasure());
          }, 50));
      }
      onPrint(t) {
        (('change' != t.type && t.type) || t.matches) &&
          ((this.view.viewState.printing = !0),
          this.view.measure(),
          setTimeout(() => {
            ((this.view.viewState.printing = !1), this.view.requestMeasure());
          }, 500));
      }
      updateGaps(t) {
        if (
          this.gapIntersection &&
          (t.length != this.gaps.length || this.gaps.some((e, i) => e != t[i]))
        ) {
          for (let e of (this.gapIntersection.disconnect(), t))
            this.gapIntersection.observe(e);
          this.gaps = t;
        }
      }
      onSelectionChange(t) {
        let e = this.selectionChanged;
        if (!this.readSelectionRange() || this.delayedAndroidKey) return;
        let { view: i } = this,
          s = this.selectionRange;
        if (
          i.state.facet(tk) ? i.root.activeElement != this.dom : !E(this.dom, s)
        )
          return;
        let o = s.anchorNode && i.docView.tile.nearest(s.anchorNode);
        if (o && o.isWidget() && o.widget.ignoreEvent(t)) {
          e || (this.selectionChanged = !1);
          return;
        }
        ((x.ie && x.ie_version <= 11) || (x.android && x.chrome)) &&
        !i.state.selection.main.empty &&
        s.focusNode &&
        H(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset)
          ? this.flushSoon()
          : this.flush(!1);
      }
      readSelectionRange() {
        let { view: t } = this,
          e = D(t.root);
        if (!e) return !1;
        let i =
          (x.safari &&
            11 == t.root.nodeType &&
            t.root.activeElement == this.dom &&
            (function (t, e) {
              if (e.getComposedRanges) {
                let i = e.getComposedRanges(t.root)[0];
                if (i) return eN(t, i);
              }
              let i = null;
              function s(t) {
                (t.preventDefault(),
                  t.stopImmediatePropagation(),
                  (i = t.getTargetRanges()[0]));
              }
              return (
                t.contentDOM.addEventListener('beforeinput', s, !0),
                t.dom.ownerDocument.execCommand('indent'),
                t.contentDOM.removeEventListener('beforeinput', s, !0),
                i ? eN(t, i) : null
              );
            })(this.view, e)) ||
          e;
        if (!i || this.selectionRange.eq(i)) return !1;
        let s = E(this.dom, i);
        return s &&
          !this.selectionChanged &&
          t.inputState.lastFocusTime > Date.now() - 200 &&
          t.inputState.lastTouchTime < Date.now() - 300 &&
          (function (t, e) {
            let i = e.focusNode,
              s = e.focusOffset;
            if (!i || e.anchorNode != i || e.anchorOffset != s) return !1;
            for (s = Math.min(s, P(i)); ;)
              if (s) {
                if (1 != i.nodeType) return !1;
                let t = i.childNodes[s - 1];
                'false' == t.contentEditable ? s-- : (s = P((i = t)));
              } else {
                if (i == t) return !0;
                ((s = L(i)), (i = i.parentNode));
              }
          })(this.dom, i)
          ? ((this.view.inputState.lastFocusTime = 0),
            t.docView.updateSelection(),
            !1)
          : (this.selectionRange.setRange(i),
            s && (this.selectionChanged = !0),
            !0);
      }
      setSelectionRange(t, e) {
        (this.selectionRange.set(t.node, t.offset, e.node, e.offset),
          (this.selectionChanged = !1));
      }
      clearSelectionRange() {
        this.selectionRange.set(null, 0, null, 0);
      }
      listenForScroll() {
        this.parentCheck = -1;
        let t = 0,
          e = null;
        for (let i = this.dom; i;)
          if (1 == i.nodeType)
            (!e && t < this.scrollTargets.length && this.scrollTargets[t] == i
              ? t++
              : e || (e = this.scrollTargets.slice(0, t)),
              e && e.push(i),
              (i = i.assignedSlot || i.parentNode));
          else if (11 == i.nodeType) i = i.host;
          else break;
        if (
          (t < this.scrollTargets.length &&
            !e &&
            (e = this.scrollTargets.slice(0, t)),
          e)
        ) {
          for (let t of this.scrollTargets)
            t.removeEventListener('scroll', this.onScroll);
          for (let t of (this.scrollTargets = e))
            t.addEventListener('scroll', this.onScroll);
        }
      }
      ignore(t) {
        if (!this.active) return t();
        try {
          return (this.stop(), t());
        } finally {
          (this.start(), this.clear());
        }
      }
      start() {
        this.active ||
          (this.observer.observe(this.dom, eV),
          eW &&
            this.dom.addEventListener(
              'DOMCharacterDataModified',
              this.onCharData
            ),
          (this.active = !0));
      }
      stop() {
        this.active &&
          ((this.active = !1),
          this.observer.disconnect(),
          eW &&
            this.dom.removeEventListener(
              'DOMCharacterDataModified',
              this.onCharData
            ));
      }
      clear() {
        (this.processRecords(),
          (this.queue.length = 0),
          (this.selectionChanged = !1));
      }
      delayAndroidKey(t, e) {
        var i;
        if (!this.delayedAndroidKey) {
          let t = () => {
            let t = this.delayedAndroidKey;
            t &&
              (this.clearDelayedAndroidKey(),
              (this.view.inputState.lastKeyCode = t.keyCode),
              (this.view.inputState.lastKeyTime = Date.now()),
              !this.flush() && t.force && _(this.dom, t.key, t.keyCode));
          };
          this.flushingAndroidKey = this.view.win.requestAnimationFrame(t);
        }
        (this.delayedAndroidKey && 'Enter' != t) ||
          (this.delayedAndroidKey = {
            key: t,
            keyCode: e,
            force:
              this.lastChange < Date.now() - 50 ||
              !!(null == (i = this.delayedAndroidKey) ? void 0 : i.force)
          });
      }
      clearDelayedAndroidKey() {
        (this.win.cancelAnimationFrame(this.flushingAndroidKey),
          (this.delayedAndroidKey = null),
          (this.flushingAndroidKey = -1));
      }
      flushSoon() {
        this.delayedFlush < 0 &&
          (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
            ((this.delayedFlush = -1), this.flush());
          }));
      }
      forceFlush() {
        (this.delayedFlush >= 0 &&
          (this.view.win.cancelAnimationFrame(this.delayedFlush),
          (this.delayedFlush = -1)),
          this.flush());
      }
      pendingRecords() {
        for (let t of this.observer.takeRecords()) this.queue.push(t);
        return this.queue;
      }
      processRecords() {
        let t = this.pendingRecords();
        t.length && (this.queue = []);
        let e = -1,
          i = -1,
          s = !1;
        for (let o of t) {
          let t = this.readMutation(o);
          t &&
            (t.typeOver && (s = !0),
            -1 == e
              ? ({ from: e, to: i } = t)
              : ((e = Math.min(t.from, e)), (i = Math.max(t.to, i))));
        }
        return { from: e, to: i, typeOver: s };
      }
      readChange() {
        let { from: t, to: e, typeOver: i } = this.processRecords(),
          s = this.selectionChanged && E(this.dom, this.selectionRange);
        if (t < 0 && !s) return null;
        (t > -1 && (this.lastChange = Date.now()),
          (this.view.inputState.lastFocusTime = 0),
          (this.selectionChanged = !1));
        let o = new DOMChange(this.view, t, e, i);
        return (
          (this.view.docView.domChanged = {
            newSel: o.newSel ? o.newSel.main : null
          }),
          o
        );
      }
      flush(t = !0) {
        if (this.delayedFlush >= 0 || this.delayedAndroidKey) return !1;
        t && this.readSelectionRange();
        let e = this.readChange();
        if (!e) return (this.view.requestMeasure(), !1);
        let i = this.view.state,
          s = t0(this.view, e);
        return (
          this.view.state == i &&
            (e.domChanged ||
              (e.newSel && !t8(this.view.state.selection, e.newSel.main))) &&
            this.view.update([]),
          s
        );
      }
      readMutation(t) {
        let e = this.view.docView.tile.nearest(t.target);
        if (!e || e.isWidget()) return null;
        if ((e.markDirty('attributes' == t.type), 'childList' == t.type)) {
          let i = eP(e, t.previousSibling || t.target.previousSibling, -1),
            s = eP(e, t.nextSibling || t.target.nextSibling, 1);
          return {
            from: i ? e.posAfter(i) : e.posAtStart,
            to: s ? e.posBefore(s) : e.posAtEnd,
            typeOver: !1
          };
        }
        return 'characterData' == t.type
          ? {
              from: e.posAtStart,
              to: e.posAtEnd,
              typeOver: t.target.nodeValue == t.oldValue
            }
          : null;
      }
      setWindow(t) {
        t != this.win &&
          (this.removeWindowListeners(this.win),
          (this.win = t),
          this.addWindowListeners(this.win));
      }
      addWindowListeners(t) {
        (t.addEventListener('resize', this.onResize),
          this.printQuery
            ? this.printQuery.addEventListener
              ? this.printQuery.addEventListener('change', this.onPrint)
              : this.printQuery.addListener(this.onPrint)
            : t.addEventListener('beforeprint', this.onPrint),
          t.addEventListener('scroll', this.onScroll),
          t.document.addEventListener(
            'selectionchange',
            this.onSelectionChange
          ));
      }
      removeWindowListeners(t) {
        (t.removeEventListener('scroll', this.onScroll),
          t.removeEventListener('resize', this.onResize),
          this.printQuery
            ? this.printQuery.removeEventListener
              ? this.printQuery.removeEventListener('change', this.onPrint)
              : this.printQuery.removeListener(this.onPrint)
            : t.removeEventListener('beforeprint', this.onPrint),
          t.document.removeEventListener(
            'selectionchange',
            this.onSelectionChange
          ));
      }
      update(t) {
        this.editContext &&
          (this.editContext.update(t),
          t.startState.facet(tk) != t.state.facet(tk) &&
            (t.view.contentDOM.editContext = t.state.facet(tk)
              ? this.editContext.editContext
              : null));
      }
      destroy() {
        var t, e, i;
        for (let s of (this.stop(),
        null == (t = this.intersection) || t.disconnect(),
        null == (e = this.gapIntersection) || e.disconnect(),
        null == (i = this.resizeScroll) || i.disconnect(),
        this.scrollTargets))
          s.removeEventListener('scroll', this.onScroll);
        (this.removeWindowListeners(this.win),
          clearTimeout(this.parentCheck),
          clearTimeout(this.resizeTimeout),
          this.win.cancelAnimationFrame(this.delayedFlush),
          this.win.cancelAnimationFrame(this.flushingAndroidKey),
          this.editContext &&
            ((this.view.contentDOM.editContext = null),
            this.editContext.destroy()));
      }
    };
    function eP(t, e, i) {
      for (; e;) {
        let s = Tile.get(e);
        if (s && s.parent == t) return s;
        let o = e.parentNode;
        e = o != t.dom ? o : i > 0 ? e.nextSibling : e.previousSibling;
      }
      return null;
    }
    function eN(t, e) {
      let i = e.startContainer,
        s = e.startOffset,
        o = e.endContainer,
        n = e.endOffset,
        r = t.docView.domAtPos(t.state.selection.main.anchor, 1);
      return (
        H(r.node, r.offset, o, n) && ([i, s, o, n] = [o, n, i, s]),
        { anchorNode: i, anchorOffset: s, focusNode: o, focusOffset: n }
      );
    }
    let EditContextManager = class EditContextManager {
      constructor(t) {
        ((this.from = 0),
          (this.to = 0),
          (this.pendingContextChange = null),
          (this.handlers = Object.create(null)),
          (this.composing = null),
          this.resetRange(t.state));
        let e = (this.editContext = new window.EditContext({
          text: t.state.doc.sliceString(this.from, this.to),
          selectionStart: this.toContextPos(
            Math.max(
              this.from,
              Math.min(this.to, t.state.selection.main.anchor)
            )
          ),
          selectionEnd: this.toContextPos(t.state.selection.main.head)
        }));
        for (let i in ((this.handlers.textupdate = i => {
          let s = t.state.selection.main,
            { anchor: o, head: n } = s,
            r = this.toEditorPos(i.updateRangeStart),
            a = this.toEditorPos(i.updateRangeEnd);
          t.inputState.composing >= 0 &&
            !this.composing &&
            (this.composing = {
              contextBase: i.updateRangeStart,
              editorBase: r,
              drifted: !1
            });
          let h = a - r > i.text.length;
          r == this.from && o < this.from
            ? (r = o)
            : a == this.to && o > this.to && (a = o);
          let c = t2(
            t.state.sliceDoc(r, a),
            i.text,
            (h ? s.from : s.to) - r,
            h ? 'end' : null
          );
          if (!c) {
            let e = l.OF.single(
              this.toEditorPos(i.selectionStart),
              this.toEditorPos(i.selectionEnd)
            );
            t8(e, s) || t.dispatch({ selection: e, userEvent: 'select' });
            return;
          }
          let d = {
            from: c.from + r,
            to: c.toA + r,
            insert: l.EY.of(i.text.slice(c.from, c.toB).split('\n'))
          };
          if (
            ((x.mac || x.android) &&
              d.from == n - 1 &&
              /^\. ?$/.test(i.text) &&
              'off' == t.contentDOM.getAttribute('autocorrect') &&
              (d = {
                from: r,
                to: a,
                insert: l.EY.of([i.text.replace('.', ' ')])
              }),
            (this.pendingContextChange = d),
            !t.state.readOnly)
          ) {
            let e = this.to - this.from + (d.to - d.from + d.insert.length);
            t1(
              t,
              d,
              l.OF.single(
                this.toEditorPos(i.selectionStart, e),
                this.toEditorPos(i.selectionEnd, e)
              )
            );
          }
          (this.pendingContextChange &&
            (this.revertPending(t.state), this.setSelection(t.state)),
            d.from < d.to &&
              !d.insert.length &&
              t.inputState.composing >= 0 &&
              !/[\\p{Alphabetic}\\p{Number}_]/.test(
                e.text.slice(
                  Math.max(0, i.updateRangeStart - 1),
                  Math.min(e.text.length, i.updateRangeStart + 1)
                )
              ) &&
              this.handlers.compositionend(i));
        }),
        (this.handlers.characterboundsupdate = i => {
          let s = [],
            o = null;
          for (
            let e = this.toEditorPos(i.rangeStart),
              n = this.toEditorPos(i.rangeEnd);
            e < n;
            e++
          ) {
            let i = t.coordsForChar(e);
            ((o =
              (i &&
                new DOMRect(
                  i.left,
                  i.top,
                  i.right - i.left,
                  i.bottom - i.top
                )) ||
              o ||
              new DOMRect()),
              s.push(o));
          }
          e.updateCharacterBounds(i.rangeStart, s);
        }),
        (this.handlers.textformatupdate = e => {
          let i = [];
          for (let t of e.getTextFormats()) {
            let e = t.underlineStyle,
              s = t.underlineThickness;
            if (!/none/i.test(e) && !/none/i.test(s)) {
              let o = this.toEditorPos(t.rangeStart),
                n = this.toEditorPos(t.rangeEnd);
              if (o < n) {
                let t = `text-decoration: underline ${/^[a-z]/.test(e) ? e + ' ' : 'Dashed' == e ? 'dashed ' : 'Squiggle' == e ? 'wavy ' : ''}${/thin/i.test(s) ? 1 : 2}px`;
                i.push(
                  Decoration.mark({ attributes: { style: t } }).range(o, n)
                );
              }
            }
          }
          t.dispatch({ effects: tM.of(Decoration.set(i)) });
        }),
        (this.handlers.compositionstart = () => {
          t.inputState.composing < 0 &&
            ((t.inputState.composing = 0),
            (t.inputState.compositionFirstChange = !0));
        }),
        (this.handlers.compositionend = () => {
          if (
            ((t.inputState.composing = -1),
            (t.inputState.compositionFirstChange = null),
            this.composing)
          ) {
            let { drifted: e } = this.composing;
            ((this.composing = null), e && this.reset(t.state));
          }
        }),
        this.handlers))
          e.addEventListener(i, this.handlers[i]);
        this.measureReq = {
          read: t => {
            let e = D(t.root);
            e &&
              e.rangeCount &&
              this.editContext.updateSelectionBounds(
                e.getRangeAt(0).getBoundingClientRect()
              );
          }
        };
      }
      applyEdits(t) {
        let e = 0,
          i = !1,
          s = this.pendingContextChange;
        return (
          t.changes.iterChanges((o, n, r, l, a) => {
            if (i) return;
            let h = a.length - (n - o);
            if (s && n >= s.to)
              if (s.from == o && s.to == n && s.insert.eq(a)) {
                ((s = this.pendingContextChange = null),
                  (e += h),
                  (this.to += h));
                return;
              } else ((s = null), this.revertPending(t.state));
            if (((o += e), (n += e) <= this.from))
              ((this.from += h), (this.to += h));
            else if (o < this.to) {
              if (
                o < this.from ||
                n > this.to ||
                this.to - this.from + a.length > 3e4
              ) {
                i = !0;
                return;
              }
              (this.editContext.updateText(
                this.toContextPos(o),
                this.toContextPos(n),
                a.toString()
              ),
                (this.to += h));
            }
            e += h;
          }),
          s && !i && this.revertPending(t.state),
          !i
        );
      }
      update(t) {
        let e = this.pendingContextChange,
          i = t.startState.selection.main;
        (this.composing &&
        (this.composing.drifted ||
          (!t.changes.touchesRange(i.from, i.to) &&
            t.transactions.some(
              t =>
                !t.isUserEvent('input.type') &&
                t.changes.touchesRange(this.from, this.to)
            )))
          ? ((this.composing.drifted = !0),
            (this.composing.editorBase = t.changes.mapPos(
              this.composing.editorBase
            )))
          : this.applyEdits(t) && this.rangeIsValid(t.state)
            ? (t.docChanged || t.selectionSet || e) &&
              this.setSelection(t.state)
            : ((this.pendingContextChange = null), this.reset(t.state)),
          (t.geometryChanged || t.docChanged || t.selectionSet) &&
            t.view.requestMeasure(this.measureReq));
      }
      resetRange(t) {
        let { head: e } = t.selection.main;
        ((this.from = Math.max(0, e - 1e4)),
          (this.to = Math.min(t.doc.length, e + 1e4)));
      }
      reset(t) {
        (this.resetRange(t),
          this.editContext.updateText(
            0,
            this.editContext.text.length,
            t.doc.sliceString(this.from, this.to)
          ),
          this.setSelection(t));
      }
      revertPending(t) {
        let e = this.pendingContextChange;
        ((this.pendingContextChange = null),
          this.editContext.updateText(
            this.toContextPos(e.from),
            this.toContextPos(e.from + e.insert.length),
            t.doc.sliceString(e.from, e.to)
          ));
      }
      setSelection(t) {
        let { main: e } = t.selection,
          i = this.toContextPos(
            Math.max(this.from, Math.min(this.to, e.anchor))
          ),
          s = this.toContextPos(e.head);
        (this.editContext.selectionStart != i ||
          this.editContext.selectionEnd != s) &&
          this.editContext.updateSelection(i, s);
      }
      rangeIsValid(t) {
        let { head: e } = t.selection.main;
        return !(
          (this.from > 0 && e - this.from < 500) ||
          (this.to < t.doc.length && this.to - e < 500) ||
          this.to - this.from > 3e4
        );
      }
      toEditorPos(t, e = this.to - this.from) {
        t = Math.min(t, e);
        let i = this.composing;
        return i && i.drifted
          ? i.editorBase + (t - i.contextBase)
          : t + this.from;
      }
      toContextPos(t) {
        let e = this.composing;
        return e && e.drifted
          ? e.contextBase + (t - e.editorBase)
          : t - this.from;
      }
      destroy() {
        for (let t in this.handlers)
          this.editContext.removeEventListener(t, this.handlers[t]);
      }
    };
    let EditorView = class EditorView {
      get state() {
        return this.viewState.state;
      }
      get viewport() {
        return this.viewState.viewport;
      }
      get visibleRanges() {
        return this.viewState.visibleRanges;
      }
      get inView() {
        return this.viewState.inView;
      }
      get composing() {
        return !!this.inputState && this.inputState.composing > 0;
      }
      get compositionStarted() {
        return !!this.inputState && this.inputState.composing >= 0;
      }
      get root() {
        return this._root;
      }
      get win() {
        return this.dom.ownerDocument.defaultView || window;
      }
      constructor(t = {}) {
        var e;
        ((this.plugins = []),
          (this.pluginMap = new Map()),
          (this.editorAttrs = {}),
          (this.contentAttrs = {}),
          (this.bidiCache = []),
          (this.destroyed = !1),
          (this.updateState = 2),
          (this.measureScheduled = -1),
          (this.measureRequests = []),
          (this.contentDOM = document.createElement('div')),
          (this.scrollDOM = document.createElement('div')),
          (this.scrollDOM.tabIndex = -1),
          (this.scrollDOM.className = 'cm-scroller'),
          this.scrollDOM.appendChild(this.contentDOM),
          (this.announceDOM = document.createElement('div')),
          (this.announceDOM.className = 'cm-announced'),
          this.announceDOM.setAttribute('aria-live', 'polite'),
          (this.dom = document.createElement('div')),
          this.dom.appendChild(this.announceDOM),
          this.dom.appendChild(this.scrollDOM),
          t.parent && t.parent.appendChild(this.dom));
        let { dispatch: i } = t;
        for (let e of ((this.dispatchTransactions =
          t.dispatchTransactions ||
          (i && (t => t.forEach(t => i(t, this)))) ||
          (t => this.update(t))),
        (this.dispatch = this.dispatch.bind(this)),
        (this._root =
          t.root ||
          (function (t) {
            for (; t;) {
              if (t && (9 == t.nodeType || (11 == t.nodeType && t.host)))
                return t;
              t = t.assignedSlot || t.parentNode;
            }
            return null;
          })(t.parent) ||
          document),
        (this.viewState = new ViewState(this, t.state || l.$t.create(t))),
        t.scrollTo &&
          t.scrollTo.is(tx) &&
          (this.viewState.scrollTarget = t.scrollTo.value.clip(
            this.viewState.state
          )),
        (this.plugins = this.state.facet(tT).map(t => new PluginInstance(t))),
        this.plugins))
          e.update(this);
        ((this.observer = new DOMObserver(this)),
          (this.inputState = new InputState(this)),
          this.inputState.ensureHandlers(this.plugins),
          (this.docView = new DocView(this)),
          this.mountStyles(),
          this.updateAttrs(),
          (this.updateState = 0),
          this.requestMeasure(),
          (null == (e = document.fonts) ? void 0 : e.ready) &&
            document.fonts.ready.then(() => {
              ((this.viewState.mustMeasureContent = 'refresh'),
                this.requestMeasure());
            }));
      }
      dispatch(...t) {
        let e =
          1 == t.length && t[0] instanceof l.ZX
            ? t
            : 1 == t.length && Array.isArray(t[0])
              ? t[0]
              : [this.state.update(...t)];
        this.dispatchTransactions(e, this);
      }
      update(t) {
        if (0 != this.updateState)
          throw Error(
            'Calls to EditorView.update are not allowed while an update is in progress'
          );
        let e = !1,
          i = !1,
          s,
          o = this.state;
        for (let e of t) {
          if (e.startState != o)
            throw RangeError(
              "Trying to update state with a transaction that doesn't start from the previous state."
            );
          o = e.state;
        }
        if (this.destroyed) {
          this.viewState.state = o;
          return;
        }
        let n = this.hasFocus,
          r = 0,
          a = null;
        t.some(t => t.annotation(eu))
          ? ((this.inputState.notifiedFocused = n), (r = 1))
          : n != this.inputState.notifiedFocused &&
            ((this.inputState.notifiedFocused = n), (a = ef(o, n)) || (r = 1));
        let h = this.observer.delayedAndroidKey,
          c = null;
        if (
          (h
            ? (this.observer.clearDelayedAndroidKey(),
              (((c = this.observer.readChange()) &&
                !this.state.doc.eq(o.doc)) ||
                !this.state.selection.eq(o.selection)) &&
                (c = null))
            : this.observer.clear(),
          o.facet(l.$t.phrases) != this.state.facet(l.$t.phrases))
        )
          return this.setState(o);
        ((s = ViewUpdate.create(this, o, t)), (s.flags |= r));
        let d = this.viewState.scrollTarget;
        try {
          for (let e of ((this.updateState = 2), t)) {
            if ((d && (d = d.map(e.changes)), e.scrollIntoView)) {
              let { main: t } = e.state.selection,
                { x: i, y: s } = this.state.facet(
                  EditorView.cursorScrollMargin
                );
              d = new ScrollTarget(
                t.empty ? t : l.OF.cursor(t.head, t.head > t.anchor ? -1 : 1),
                'nearest',
                'nearest',
                s,
                i
              );
            }
            for (let t of e.effects) t.is(tx) && (d = t.value.clip(this.state));
          }
          (this.viewState.update(s, d),
            (this.bidiCache = CachedOrder.update(this.bidiCache, s.changes)),
            s.empty || (this.updatePlugins(s), this.inputState.update(s)),
            (e = this.docView.update(s)),
            this.state.facet(tP) != this.styleModules && this.mountStyles(),
            (i = this.updateAttrs()),
            this.showAnnouncements(t),
            this.docView.updateSelection(
              e,
              t.some(t => t.isUserEvent('select.pointer'))
            ));
        } finally {
          this.updateState = 0;
        }
        if (
          (s.startState.facet(eA) != s.state.facet(eA) &&
            (this.viewState.mustMeasureContent = !0),
          (e ||
            i ||
            d ||
            this.viewState.mustEnforceCursorAssoc ||
            this.viewState.mustMeasureContent) &&
            this.requestMeasure(),
          e && this.docViewUpdate(),
          !s.empty)
        )
          for (let t of this.state.facet(tf))
            try {
              t(s);
            } catch (t) {
              tS(this.state, t, 'update listener');
            }
        (a || c) &&
          Promise.resolve().then(() => {
            (a && this.state == a.startState && this.dispatch(a),
              c &&
                !t0(this, c) &&
                h.force &&
                _(this.contentDOM, h.key, h.keyCode));
          });
      }
      setState(t) {
        if (0 != this.updateState)
          throw Error(
            'Calls to EditorView.setState are not allowed while an update is in progress'
          );
        if (this.destroyed) {
          this.viewState.state = t;
          return;
        }
        this.updateState = 2;
        let e = this.hasFocus;
        try {
          for (let t of this.plugins) t.destroy(this);
          for (let e of ((this.viewState = new ViewState(this, t)),
          (this.plugins = t.facet(tT).map(t => new PluginInstance(t))),
          this.pluginMap.clear(),
          this.plugins))
            e.update(this);
          (this.docView.destroy(),
            (this.docView = new DocView(this)),
            this.inputState.ensureHandlers(this.plugins),
            this.mountStyles(),
            this.updateAttrs(),
            (this.bidiCache = []));
        } finally {
          this.updateState = 0;
        }
        (e && this.focus(), this.requestMeasure());
      }
      updatePlugins(t) {
        let e = t.startState.facet(tT),
          i = t.state.facet(tT);
        if (e != i) {
          let s = [];
          for (let o of i) {
            let i = e.indexOf(o);
            if (i < 0) s.push(new PluginInstance(o));
            else {
              let e = this.plugins[i];
              ((e.mustUpdate = t), s.push(e));
            }
          }
          for (let e of this.plugins) e.mustUpdate != t && e.destroy(this);
          ((this.plugins = s), this.pluginMap.clear());
        } else for (let e of this.plugins) e.mustUpdate = t;
        for (let t = 0; t < this.plugins.length; t++)
          this.plugins[t].update(this);
        e != i && this.inputState.ensureHandlers(this.plugins);
      }
      docViewUpdate() {
        for (let t of this.plugins) {
          let e = t.value;
          if (e && e.docViewUpdate)
            try {
              e.docViewUpdate(this);
            } catch (t) {
              tS(this.state, t, 'doc view update listener');
            }
        }
      }
      measure(t = !0) {
        if (this.destroyed) return;
        if (
          (this.measureScheduled > -1 &&
            this.win.cancelAnimationFrame(this.measureScheduled),
          this.observer.delayedAndroidKey)
        ) {
          ((this.measureScheduled = -1), this.requestMeasure());
          return;
        }
        ((this.measureScheduled = 0), t && this.observer.forceFlush());
        let e = null,
          i = this.viewState.scrollParent,
          s = this.viewState.getScrollOffset(),
          { scrollAnchorPos: o, scrollAnchorHeight: n } = this.viewState;
        (Math.abs(s - this.viewState.scrollOffset) > 1 && (n = -1),
          (this.viewState.scrollAnchorHeight = -1));
        try {
          for (let t = 0; ; t++) {
            if (n < 0)
              if (Y(i || this.win))
                ((o = -1), (n = this.viewState.heightMap.height));
              else {
                let t = this.viewState.scrollAnchorAt(s);
                ((o = t.from), (n = t.top));
              }
            this.updateState = 1;
            let r = this.viewState.measure();
            if (
              !r &&
              !this.measureRequests.length &&
              null == this.viewState.scrollTarget
            )
              break;
            if (t > 5) {
              console.warn(
                this.measureRequests.length
                  ? 'Measure loop restarted more than 5 times'
                  : 'Viewport failed to stabilize'
              );
              break;
            }
            let l = [];
            4 & r || ([this.measureRequests, l] = [l, this.measureRequests]);
            let a = l.map(t => {
                try {
                  return t.read(this);
                } catch (t) {
                  return (tS(this.state, t), eI);
                }
              }),
              h = ViewUpdate.create(this, this.state, []),
              c = !1;
            ((h.flags |= r),
              e ? (e.flags |= r) : (e = h),
              (this.updateState = 2),
              !h.empty &&
                (this.updatePlugins(h),
                this.inputState.update(h),
                this.updateAttrs(),
                (c = this.docView.update(h)) && this.docViewUpdate()));
            for (let t = 0; t < l.length; t++)
              if (a[t] != eI)
                try {
                  let e = l[t];
                  e.write && e.write(a[t], this);
                } catch (t) {
                  tS(this.state, t);
                }
            if (
              (c && this.docView.updateSelection(!0),
              !h.viewportChanged && 0 == this.measureRequests.length)
            ) {
              if (this.viewState.editorHeight)
                if (this.viewState.scrollTarget) {
                  (this.docView.scrollIntoView(this.viewState.scrollTarget),
                    (this.viewState.scrollTarget = null),
                    (n = -1));
                  continue;
                } else {
                  let t =
                    ((o < 0
                      ? this.viewState.heightMap.height
                      : this.viewState.lineBlockAt(o).top) -
                      n) /
                    this.scaleY;
                  if (
                    (t > 1 || t < -1) &&
                    !(
                      x.ios &&
                      this.inputState.lastIOSMomentumScroll > Date.now() - 100
                    ) &&
                    (i == this.scrollDOM ||
                      this.hasFocus ||
                      Math.max(
                        this.inputState.lastWheelEvent,
                        this.inputState.lastTouchTime
                      ) >
                        Date.now() - 100)
                  ) {
                    ((s += t),
                      i
                        ? o < 0
                          ? (i.scrollTop = i.scrollHeight)
                          : (i.scrollTop += t)
                        : this.win.scrollBy(0, t),
                      (n = -1));
                    continue;
                  }
                }
              break;
            }
          }
        } finally {
          ((this.updateState = 0), (this.measureScheduled = -1));
        }
        if (e && !e.empty) for (let t of this.state.facet(tf)) t(e);
      }
      get themeClasses() {
        return (
          eD +
          ' ' +
          (this.state.facet(eO) ? eE : eB) +
          ' ' +
          this.state.facet(eA)
        );
      }
      updateAttrs() {
        let t = ez(this, tA, {
            class:
              'cm-editor' +
              (this.hasFocus ? ' cm-focused ' : ' ') +
              this.themeClasses
          }),
          e = {
            spellcheck: 'false',
            autocorrect: 'off',
            autocapitalize: 'off',
            writingsuggestions: 'false',
            translate: 'no',
            contenteditable: this.state.facet(tk) ? 'true' : 'false',
            class: 'cm-content',
            style: `${x.tabSize}: ${this.state.tabSize}`,
            role: 'textbox',
            'aria-multiline': 'true'
          };
        (this.state.readOnly && (e['aria-readonly'] = 'true'), ez(this, tO, e));
        let i = this.observer.ignore(() => {
          let i = C(this.contentDOM, this.contentAttrs, e),
            s = C(this.dom, this.editorAttrs, t);
          return i || s;
        });
        return ((this.editorAttrs = t), (this.contentAttrs = e), i);
      }
      showAnnouncements(t) {
        let e = !0;
        for (let i of t)
          for (let t of i.effects)
            t.is(EditorView.announce) &&
              (e && (this.announceDOM.textContent = ''),
              (e = !1),
              (this.announceDOM.appendChild(
                document.createElement('div')
              ).textContent = t.value));
      }
      mountStyles() {
        this.styleModules = this.state.facet(tP);
        let t = this.state.facet(EditorView.cspNonce);
        a.G.mount(
          this.root,
          this.styleModules.concat(eL).reverse(),
          t ? { nonce: t } : void 0
        );
      }
      readMeasured() {
        if (2 == this.updateState)
          throw Error(
            "Reading the editor layout isn't allowed during an update"
          );
        0 == this.updateState && this.measureScheduled > -1 && this.measure(!1);
      }
      requestMeasure(t) {
        if (
          (this.measureScheduled < 0 &&
            (this.measureScheduled = this.win.requestAnimationFrame(() =>
              this.measure()
            )),
          t) &&
          !(this.measureRequests.indexOf(t) > -1)
        ) {
          if (null != t.key) {
            for (let e = 0; e < this.measureRequests.length; e++)
              if (this.measureRequests[e].key === t.key) {
                this.measureRequests[e] = t;
                return;
              }
          }
          this.measureRequests.push(t);
        }
      }
      plugin(t) {
        let e = this.pluginMap.get(t);
        return (
          (void 0 === e || (e && e.plugin != t)) &&
            this.pluginMap.set(
              t,
              (e = this.plugins.find(e => e.plugin == t) || null)
            ),
          e && e.update(this).value
        );
      }
      get documentTop() {
        return (
          this.contentDOM.getBoundingClientRect().top +
          this.viewState.paddingTop
        );
      }
      get documentPadding() {
        return {
          top: this.viewState.paddingTop,
          bottom: this.viewState.paddingBottom
        };
      }
      get scaleX() {
        return this.viewState.scaleX;
      }
      get scaleY() {
        return this.viewState.scaleY;
      }
      elementAtHeight(t) {
        return (this.readMeasured(), this.viewState.elementAtHeight(t));
      }
      lineBlockAtHeight(t) {
        return (this.readMeasured(), this.viewState.lineBlockAtHeight(t));
      }
      get viewportLineBlocks() {
        return this.viewState.viewportLines;
      }
      lineBlockAt(t) {
        return this.viewState.lineBlockAt(t);
      }
      get contentHeight() {
        return this.viewState.contentHeight;
      }
      moveByChar(t, e, i) {
        return tJ(this, t, t$(this, t, e, i));
      }
      moveByGroup(t, e) {
        return tJ(
          this,
          t,
          t$(this, t, e, e => {
            var i;
            let s, o;
            return (
              (i = t.head),
              (o = (s = this.state.charCategorizer(i))(e)),
              t => {
                let e = s(t);
                return (o == l.Je.Space && (o = e), o == e);
              }
            );
          })
        );
      }
      visualLineSide(t, e) {
        let i = this.bidiSpans(t),
          s = this.textDirectionAt(t.from),
          o = i[e ? i.length - 1 : 0];
        return l.OF.cursor(o.side(e, s) + t.from, o.forward(!e, s) ? 1 : -1);
      }
      moveToLineBoundary(t, e, i = !0) {
        return (function (t, e, i, s) {
          let o = tX(t, e.head, e.assoc || -1),
            n =
              s && o.type == T.Text && (t.lineWrapping || o.widgetLineBreaks)
                ? t.coordsAtPos(
                    e.assoc < 0 && e.head > o.from ? e.head - 1 : e.head
                  )
                : null;
          if (n) {
            let e = t.dom.getBoundingClientRect(),
              s = t.textDirectionAt(o.from),
              r = t.posAtCoords({
                x: i == (s == U.LTR) ? e.right - 1 : e.left + 1,
                y: (n.top + n.bottom) / 2
              });
            if (null != r) return l.OF.cursor(r, i ? -1 : 1);
          }
          return l.OF.cursor(i ? o.to : o.from, i ? -1 : 1);
        })(this, t, e, i);
      }
      moveVertically(t, e, i) {
        return tJ(
          this,
          t,
          (function (t, e, i, s) {
            let o = e.head,
              n = i ? 1 : -1;
            if (o == (i ? t.state.doc.length : 0))
              return l.OF.cursor(o, e.assoc);
            let r = e.goalColumn,
              a,
              h = t.contentDOM.getBoundingClientRect(),
              c = t.coordsAtPos(
                o,
                e.assoc || ((e.empty ? i : e.head == e.from) ? 1 : -1)
              ),
              d = t.documentTop;
            if (c)
              (null == r && (r = c.left - h.left),
                (a = n < 0 ? c.top : c.bottom));
            else {
              let e = t.viewState.lineBlockAt(o);
              (null == r &&
                (r = Math.min(
                  h.right - h.left,
                  t.defaultCharacterWidth * (o - e.from)
                )),
                (a = (n < 0 ? e.top : e.bottom) + d));
            }
            let u = h.left + r,
              f = t.viewState.heightOracle.textHeight >> 1,
              p = null != s ? s : f;
            for (let e = 0; ; e += f) {
              let s = a + (p + e) * n,
                o = tZ(t, { x: u, y: s }, !1, n);
              if (i ? s > h.bottom : s < h.top)
                return l.OF.cursor(o.pos, o.assoc);
              let c = t.coordsAtPos(o.pos, o.assoc),
                d = c ? (c.top + c.bottom) / 2 : 0;
              if (!c || (i ? d > a : d < a))
                return l.OF.cursor(o.pos, o.assoc, void 0, r);
            }
          })(this, t, e, i)
        );
      }
      domAtPos(t, e = 1) {
        return this.docView.domAtPos(t, e);
      }
      posAtDOM(t, e = 0) {
        return this.docView.posFromDOM(t, e);
      }
      posAtCoords(t, e = !0) {
        this.readMeasured();
        let i = tZ(this, t, e);
        return i && i.pos;
      }
      posAndSideAtCoords(t, e = !0) {
        return (this.readMeasured(), tZ(this, t, e));
      }
      coordsAtPos(t, e = 1) {
        this.readMeasured();
        let i = this.state.doc.lineAt(t),
          s = this.bidiSpans(i),
          o = s[BidiSpan.find(s, t - i.from, -1, e)];
        return this.docView.coordsAt(t, e, o.dir == U.RTL);
      }
      coordsForChar(t) {
        return (this.readMeasured(), this.docView.coordsForChar(t));
      }
      get defaultCharacterWidth() {
        return this.viewState.heightOracle.charWidth;
      }
      get defaultLineHeight() {
        return this.viewState.heightOracle.lineHeight;
      }
      get textDirection() {
        return this.viewState.defaultTextDirection;
      }
      textDirectionAt(t) {
        return !this.state.facet(tv) ||
          t < this.viewport.from ||
          t > this.viewport.to
          ? this.textDirection
          : (this.readMeasured(), this.docView.textDirectionAt(t));
      }
      get lineWrapping() {
        return this.viewState.heightOracle.lineWrapping;
      }
      bidiSpans(t) {
        if (t.length > eF) return tl(t.length);
        let e = this.textDirectionAt(t.from),
          i;
        for (let s of this.bidiCache)
          if (
            s.from == t.from &&
            s.dir == e &&
            (s.fresh ||
              (function t(e, i) {
                if (e.length != i.length) return !1;
                for (let s = 0; s < e.length; s++) {
                  let o = e[s],
                    n = i[s];
                  if (
                    o.from != n.from ||
                    o.to != n.to ||
                    o.direction != n.direction ||
                    !t(o.inner, n.inner)
                  )
                    return !1;
                }
                return !0;
              })(s.isolates, (i = tL(this, t))))
          )
            return s.order;
        i || (i = tL(this, t));
        let s = (function (t, e, i) {
          if (!t) return [new BidiSpan(0, 0, +(e == J))];
          if (e == Q && !i.length && !tn.test(t)) return tl(t.length);
          if (i.length) for (; t.length > tr.length;) tr[tr.length] = 256;
          let s = [],
            o = +(e != Q);
          return (
            (function t(e, i, s, o, n, r, l) {
              let a = i % 2 ? 2 : 1;
              (!(function (t, e, i, s, o) {
                for (let n = 0; n <= s.length; n++) {
                  let r = n ? s[n - 1].to : e,
                    l = n < s.length ? s[n].from : i,
                    a = n ? 256 : o;
                  for (let e = r, i = a, s = a; e < l; e++) {
                    let o = to(t.charCodeAt(e));
                    (512 == o ? (o = i) : 8 == o && 4 == s && (o = 16),
                      (tr[e] = 4 == o ? 2 : o),
                      7 & o && (s = o),
                      (i = o));
                  }
                  for (let t = r, e = a, s = a; t < l; t++) {
                    let o = tr[t];
                    if (128 == o)
                      t < l - 1 && e == tr[t + 1] && 24 & e
                        ? (o = tr[t] = e)
                        : (tr[t] = 256);
                    else if (64 == o) {
                      let o = t + 1;
                      for (; o < l && 64 == tr[o];) o++;
                      let n =
                        (t && 8 == e) || (o < i && 8 == tr[o])
                          ? 1 == s
                            ? 1
                            : 8
                          : 256;
                      for (let e = t; e < o; e++) tr[e] = n;
                      t = o - 1;
                    } else 8 == o && 1 == s && (tr[t] = 1);
                    ((e = o), 7 & o && (s = o));
                  }
                }
              })(e, n, r, o, a),
                (function (t, e, i, s, o) {
                  let n = 1 == o ? 2 : 1;
                  for (let r = 0, l = 0, a = 0; r <= s.length; r++) {
                    let h = r ? s[r - 1].to : e,
                      c = r < s.length ? s[r].from : i;
                    for (let e = h, i, s, r; e < c; e++)
                      if ((s = ti[(i = t.charCodeAt(e))]))
                        if (s < 0) {
                          for (let t = l - 3; t >= 0; t -= 3)
                            if (ts[t + 1] == -s) {
                              let i = ts[t + 2],
                                s = 2 & i ? o : 4 & i ? (1 & i ? n : o) : 0;
                              (s && (tr[e] = tr[ts[t]] = s), (l = t));
                              break;
                            }
                        } else if (189 == ts.length) break;
                        else ((ts[l++] = e), (ts[l++] = i), (ts[l++] = a));
                      else if (2 == (r = tr[e]) || 1 == r) {
                        let t = r == o;
                        a = +!t;
                        for (let e = l - 3; e >= 0; e -= 3) {
                          let i = ts[e + 2];
                          if (2 & i) break;
                          if (t) ts[e + 2] |= 2;
                          else {
                            if (4 & i) break;
                            ts[e + 2] |= 4;
                          }
                        }
                      }
                  }
                })(e, n, r, o, a),
                (function (t, e, i, s) {
                  for (let o = 0, n = s; o <= i.length; o++) {
                    let r = o ? i[o - 1].to : t,
                      l = o < i.length ? i[o].from : e;
                    for (let a = r; a < l;) {
                      let r = tr[a];
                      if (256 == r) {
                        let r = a + 1;
                        for (;;)
                          if (r == l) {
                            if (o == i.length) break;
                            ((r = i[o++].to),
                              (l = o < i.length ? i[o].from : e));
                          } else if (256 == tr[r]) r++;
                          else break;
                        let h = 1 == n,
                          c = h == ((r < e ? tr[r] : s) == 1) ? (h ? 1 : 2) : s;
                        for (let e = r, s = o, n = s ? i[s - 1].to : t; e > a;)
                          (e == n &&
                            ((e = i[--s].from), (n = s ? i[s - 1].to : t)),
                            (tr[--e] = c));
                        a = r;
                      } else ((n = r), a++);
                    }
                  }
                })(n, r, o, a),
                (function e(i, s, o, n, r, l, a) {
                  let h = n % 2 ? 2 : 1;
                  if (n % 2 == r % 2)
                    for (let c = s, d = 0; c < o;) {
                      let s = !0,
                        u = !1;
                      if (d == l.length || c < l[d].from) {
                        let t = tr[c];
                        t != h && ((s = !1), (u = 16 == t));
                      }
                      let f = s || 1 != h ? null : [],
                        p = s ? n : n + 1,
                        g = c;
                      e: for (;;)
                        if (d < l.length && g == l[d].from) {
                          if (u) break;
                          let e = l[d];
                          if (!s)
                            for (let t = e.to, i = d + 1; ;) {
                              if (t == o) break e;
                              if (i < l.length && l[i].from == t) t = l[i++].to;
                              else if (tr[t] == h) break e;
                              else break;
                            }
                          (d++,
                            f
                              ? f.push(e)
                              : (e.from > c &&
                                  a.push(new BidiSpan(c, e.from, p)),
                                t(
                                  i,
                                  (e.direction == Q) != !(p % 2) ? n + 1 : n,
                                  r,
                                  e.inner,
                                  e.from,
                                  e.to,
                                  a
                                ),
                                (c = e.to)),
                            (g = e.to));
                        } else if (g == o || (s ? tr[g] != h : tr[g] == h))
                          break;
                        else g++;
                      (f
                        ? e(i, c, g, n + 1, r, f, a)
                        : c < g && a.push(new BidiSpan(c, g, p)),
                        (c = g));
                    }
                  else
                    for (let c = o, d = l.length; c > s;) {
                      let o = !0,
                        u = !1;
                      if (!d || c > l[d - 1].to) {
                        let t = tr[c - 1];
                        t != h && ((o = !1), (u = 16 == t));
                      }
                      let f = o || 1 != h ? null : [],
                        p = o ? n : n + 1,
                        g = c;
                      e: for (;;)
                        if (d && g == l[d - 1].to) {
                          if (u) break;
                          let e = l[--d];
                          if (!o)
                            for (let t = e.from, i = d; ;) {
                              if (t == s) break e;
                              if (i && l[i - 1].to == t) t = l[--i].from;
                              else if (tr[t - 1] == h) break e;
                              else break;
                            }
                          (f
                            ? f.push(e)
                            : (e.to < c && a.push(new BidiSpan(e.to, c, p)),
                              t(
                                i,
                                (e.direction == Q) != !(p % 2) ? n + 1 : n,
                                r,
                                e.inner,
                                e.from,
                                e.to,
                                a
                              ),
                              (c = e.from)),
                            (g = e.from));
                        } else if (
                          g == s ||
                          (o ? tr[g - 1] != h : tr[g - 1] == h)
                        )
                          break;
                        else g--;
                      (f
                        ? e(i, g, c, n + 1, r, f, a)
                        : g < c && a.push(new BidiSpan(g, c, p)),
                        (c = g));
                    }
                })(e, n, r, i, s, o, l));
            })(t, o, o, i, 0, t.length, s),
            s
          );
        })(t.text, e, i);
        return (
          this.bidiCache.push(new CachedOrder(t.from, t.to, e, i, !0, s)),
          s
        );
      }
      get hasFocus() {
        var t;
        return (
          (this.dom.ownerDocument.hasFocus() ||
            (x.safari &&
              (null == (t = this.inputState) ? void 0 : t.lastContextMenu) >
                Date.now() - 3e4)) &&
          this.root.activeElement == this.contentDOM
        );
      }
      focus() {
        this.observer.ignore(() => {
          (q(this.contentDOM), this.docView.updateSelection());
        });
      }
      setRoot(t) {
        this._root != t &&
          ((this._root = t),
          this.observer.setWindow(
            (9 == t.nodeType ? t : t.ownerDocument).defaultView || window
          ),
          this.mountStyles());
      }
      destroy() {
        for (let t of (this.root.activeElement == this.contentDOM &&
          this.contentDOM.blur(),
        this.plugins))
          t.destroy(this);
        ((this.plugins = []),
          this.inputState.destroy(),
          this.docView.destroy(),
          this.dom.remove(),
          this.observer.destroy(),
          this.measureScheduled > -1 &&
            this.win.cancelAnimationFrame(this.measureScheduled),
          (this.destroyed = !0));
      }
      static scrollIntoView(t, e = {}) {
        var i, s, o, n;
        return tx.of(
          new ScrollTarget(
            'number' == typeof t ? l.OF.cursor(t) : t,
            null != (i = e.y) ? i : 'nearest',
            null != (s = e.x) ? s : 'nearest',
            null != (o = e.yMargin) ? o : 5,
            null != (n = e.xMargin) ? n : 5
          )
        );
      }
      scrollSnapshot() {
        let { scrollTop: t, scrollLeft: e } = this.scrollDOM,
          i = this.viewState.scrollAnchorAt(t);
        return tx.of(
          new ScrollTarget(
            l.OF.cursor(i.from),
            'start',
            'start',
            i.top - t,
            e,
            !0
          )
        );
      }
      setTabFocusMode(t) {
        null == t
          ? (this.inputState.tabFocusMode =
              this.inputState.tabFocusMode < 0 ? 0 : -1)
          : 'boolean' == typeof t
            ? (this.inputState.tabFocusMode = t ? 0 : -1)
            : 0 != this.inputState.tabFocusMode &&
              (this.inputState.tabFocusMode = Date.now() + t);
      }
      static domEventHandlers(t) {
        return ViewPlugin.define(() => ({}), { eventHandlers: t });
      }
      static domEventObservers(t) {
        return ViewPlugin.define(() => ({}), { eventObservers: t });
      }
      static theme(t, e) {
        let i = a.G.newName(),
          s = [eA.of(i), tP.of(eH(`.${i}`, t))];
        return (e && e.dark && s.push(eO.of(!0)), s);
      }
      static baseTheme(t) {
        return l.Nb.lowest(tP.of(eH('.' + eD, t, eR)));
      }
      static findFromDOM(t) {
        var e;
        let i = t.querySelector('.cm-content'),
          s = (i && Tile.get(i)) || Tile.get(t);
        return (
          (null == (e = null == s ? void 0 : s.root) ? void 0 : e.view) || null
        );
      }
    };
    ((EditorView.styleModule = tP),
      (EditorView.inputHandler = tp),
      (EditorView.clipboardInputFilter = tm),
      (EditorView.clipboardOutputFilter = tw),
      (EditorView.scrollHandler = ty),
      (EditorView.focusChangeEffect = tg),
      (EditorView.perLineTextDirection = tv),
      (EditorView.exceptionSink = tu),
      (EditorView.updateListener = tf),
      (EditorView.editable = tk),
      (EditorView.mouseSelectionStyle = td),
      (EditorView.dragMovesSelection = tc),
      (EditorView.clickAddsSelectionRange = th),
      (EditorView.decorations = tD),
      (EditorView.blockWrappers = tB),
      (EditorView.outerDecorations = tE),
      (EditorView.atomicRanges = tR),
      (EditorView.bidiIsolatedRanges = tH),
      (EditorView.cursorScrollMargin = l.sj.define({
        combine: t => {
          let e = 5,
            i = 5;
          for (let s of t)
            'number' == typeof s ? (e = i = s) : ({ x: e, y: i } = s);
          return { x: e, y: i };
        }
      })),
      (EditorView.scrollMargins = tV),
      (EditorView.darkTheme = eO),
      (EditorView.cspNonce = l.sj.define({
        combine: t => (t.length ? t[0] : '')
      })),
      (EditorView.contentAttributes = tO),
      (EditorView.editorAttributes = tA),
      (EditorView.lineWrapping = EditorView.contentAttributes.of({
        class: 'cm-lineWrapping'
      })),
      (EditorView.announce = l.Pe.define()));
    let eF = 4096,
      eI = {};
    let CachedOrder = class CachedOrder {
      constructor(t, e, i, s, o, n) {
        ((this.from = t),
          (this.to = e),
          (this.dir = i),
          (this.isolates = s),
          (this.fresh = o),
          (this.order = n));
      }
      static update(t, e) {
        if (e.empty && !t.some(t => t.fresh)) return t;
        let i = [],
          s = t.length ? t[t.length - 1].dir : U.LTR;
        for (let o = Math.max(0, t.length - 10); o < t.length; o++) {
          let n = t[o];
          n.dir != s ||
            e.touchesRange(n.from, n.to) ||
            i.push(
              new CachedOrder(
                e.mapPos(n.from, 1),
                e.mapPos(n.to, -1),
                n.dir,
                n.isolates,
                !1,
                n.order
              )
            );
        }
        return i;
      }
    };
    function ez(t, e, i) {
      for (let s = t.state.facet(e), o = s.length - 1; o >= 0; o--) {
        let e = s[o],
          n = 'function' == typeof e ? e(t) : e;
        n && M(n, i);
      }
      return i;
    }
    let eK = x.mac ? 'mac' : x.windows ? 'win' : x.linux ? 'linux' : 'key';
    function eG(t, e, i) {
      return (
        e.altKey && (t = 'Alt-' + t),
        e.ctrlKey && (t = 'Ctrl-' + t),
        e.metaKey && (t = 'Meta-' + t),
        !1 !== i && e.shiftKey && (t = 'Shift-' + t),
        t
      );
    }
    let eq = l.Nb.default(
        EditorView.domEventHandlers({
          keydown: (t, e) => {
            var i, s, o, n;
            let r, a, c, d, u, f, p, g, m, w, v, b, y, M;
            return (
              (i =
                ((r = e.state.facet(ej)),
                (a = e_.get(r)) ||
                  e_.set(
                    r,
                    (a = (function (t, e = eK) {
                      let i = Object.create(null),
                        s = Object.create(null),
                        o = (t, e) => {
                          let i = s[t];
                          if (null == i) s[t] = e;
                          else if (i != e)
                            throw Error(
                              'Key binding ' +
                                t +
                                ' is used both as a regular binding and as a multi-stroke prefix'
                            );
                        },
                        n = (t, s, n, r, l) => {
                          var a, h;
                          let c = i[t] || (i[t] = Object.create(null)),
                            d = s.split(/ (?!$)/).map(t =>
                              (function (t, e) {
                                let i,
                                  s,
                                  o,
                                  n,
                                  r = t.split(/-(?!$)/),
                                  l = r[r.length - 1];
                                'Space' == l && (l = ' ');
                                for (let t = 0; t < r.length - 1; ++t) {
                                  let l = r[t];
                                  if (/^(cmd|meta|m)$/i.test(l)) n = !0;
                                  else if (/^a(lt)?$/i.test(l)) i = !0;
                                  else if (/^(c|ctrl|control)$/i.test(l))
                                    s = !0;
                                  else if (/^s(hift)?$/i.test(l)) o = !0;
                                  else if (/^mod$/i.test(l))
                                    'mac' == e ? (n = !0) : (s = !0);
                                  else
                                    throw Error(
                                      'Unrecognized modifier name: ' + l
                                    );
                                }
                                return (
                                  i && (l = 'Alt-' + l),
                                  s && (l = 'Ctrl-' + l),
                                  n && (l = 'Meta-' + l),
                                  o && (l = 'Shift-' + l),
                                  l
                                );
                              })(t, e)
                            );
                          for (let e = 1; e < d.length; e++) {
                            let i = d.slice(0, e).join(' ');
                            (o(i, !0),
                              c[i] ||
                                (c[i] = {
                                  preventDefault: !0,
                                  stopPropagation: !1,
                                  run: [
                                    e => {
                                      let s = (eY = {
                                        view: e,
                                        prefix: i,
                                        scope: t
                                      });
                                      return (
                                        setTimeout(() => {
                                          eY == s && (eY = null);
                                        }, 4e3),
                                        !0
                                      );
                                    }
                                  ]
                                }));
                          }
                          let u = d.join(' ');
                          o(u, !1);
                          let f =
                            c[u] ||
                            (c[u] = {
                              preventDefault: !1,
                              stopPropagation: !1,
                              run:
                                (null ==
                                (h = null == (a = c._any) ? void 0 : a.run)
                                  ? void 0
                                  : h.slice()) || []
                            });
                          (n && f.run.push(n),
                            r && (f.preventDefault = !0),
                            l && (f.stopPropagation = !0));
                        };
                      for (let s of t) {
                        let t = s.scope ? s.scope.split(' ') : ['editor'];
                        if (s.any)
                          for (let e of t) {
                            let t = i[e] || (i[e] = Object.create(null));
                            t._any ||
                              (t._any = {
                                preventDefault: !1,
                                stopPropagation: !1,
                                run: []
                              });
                            let { any: o } = s;
                            for (let e in t) t[e].run.push(t => o(t, eX));
                          }
                        let o = s[e] || s.key;
                        if (o)
                          for (let e of t)
                            (n(
                              e,
                              o,
                              s.run,
                              s.preventDefault,
                              s.stopPropagation
                            ),
                              s.shift &&
                                n(
                                  e,
                                  'Shift-' + o,
                                  s.shift,
                                  s.preventDefault,
                                  s.stopPropagation
                                ));
                      }
                      return i;
                    })(r.reduce((t, e) => t.concat(e), [])))
                  ),
                a)),
              (s = t),
              (o = e),
              (n = 'editor'),
              (eX = s),
              (c = (0, h.xT)(s)),
              (d = (0, l.vS)(c, 0)),
              (u = (0, l.Fh)(d) == c.length && ' ' != c),
              (f = ''),
              (p = !1),
              (g = !1),
              (m = !1),
              eY &&
                eY.view == o &&
                eY.scope == n &&
                ((f = eY.prefix + ' '),
                0 > t4.indexOf(s.keyCode) && ((g = !0), (eY = null))),
              (w = new Set()),
              (v = t => {
                if (t) {
                  for (let e of t.run)
                    if (!w.has(e) && (w.add(e), e(o)))
                      return (t.stopPropagation && (m = !0), !0);
                  t.preventDefault && (t.stopPropagation && (m = !0), (g = !0));
                }
                return !1;
              }),
              (b = i[n]) &&
                (v(b[f + eG(c, s, !u)])
                  ? (p = !0)
                  : u &&
                      (s.altKey || s.metaKey || s.ctrlKey) &&
                      !(x.windows && s.ctrlKey && s.altKey) &&
                      !(x.mac && s.altKey && !(s.ctrlKey || s.metaKey)) &&
                      (y = h.E3[s.keyCode]) &&
                      y != c
                    ? v(b[f + eG(y, s, !0)])
                      ? (p = !0)
                      : s.shiftKey &&
                        (M = h.BN[s.keyCode]) != c &&
                        M != y &&
                        v(b[f + eG(M, s, !1)]) &&
                        (p = !0)
                    : u && s.shiftKey && v(b[f + eG(c, s, !0)]) && (p = !0),
                !p && v(b._any) && (p = !0)),
              g && (p = !0),
              p && m && s.stopPropagation(),
              (eX = null),
              p
            );
          }
        })
      ),
      ej = l.sj.define({ enables: eq }),
      e_ = new WeakMap(),
      eY = null,
      eX = null;
    let RectangleMarker = class RectangleMarker {
      constructor(t, e, i, s, o) {
        ((this.className = t),
          (this.left = e),
          (this.top = i),
          (this.width = s),
          (this.height = o));
      }
      draw() {
        let t = document.createElement('div');
        return ((t.className = this.className), this.adjust(t), t);
      }
      update(t, e) {
        return e.className == this.className && (this.adjust(t), !0);
      }
      adjust(t) {
        ((t.style.left = this.left + 'px'),
          (t.style.top = this.top + 'px'),
          null != this.width && (t.style.width = this.width + 'px'),
          (t.style.height = this.height + 'px'));
      }
      eq(t) {
        return (
          this.left == t.left &&
          this.top == t.top &&
          this.width == t.width &&
          this.height == t.height &&
          this.className == t.className
        );
      }
      static forRange(t, e, i) {
        if (!i.empty)
          return (function (t, e, i) {
            if (i.to <= t.viewport.from || i.from >= t.viewport.to) return [];
            let s = Math.max(i.from, t.viewport.from),
              o = Math.min(i.to, t.viewport.to),
              n = t.textDirection == U.LTR,
              r = t.contentDOM,
              l = r.getBoundingClientRect(),
              a = e$(t),
              h = r.querySelector('.cm-line'),
              c = h && window.getComputedStyle(h),
              d =
                l.left +
                (c
                  ? parseInt(c.paddingLeft) +
                    Math.min(0, parseInt(c.textIndent))
                  : 0),
              u = l.right - (c ? parseInt(c.paddingRight) : 0),
              f = tX(t, s, 1),
              p = tX(t, o, -1),
              g = f.type == T.Text ? f : null,
              m = p.type == T.Text ? p : null;
            if (
              (g &&
                (t.lineWrapping || f.widgetLineBreaks) &&
                (g = eU(t, s, 1, g)),
              m &&
                (t.lineWrapping || p.widgetLineBreaks) &&
                (m = eU(t, o, -1, m)),
              g && m && g.from == m.from && g.to == m.to)
            )
              return v(b(i.from, i.to, g));
            {
              let e = g ? b(i.from, null, g) : y(f, !1),
                s = m ? b(null, i.to, m) : y(p, !0),
                o = [];
              return (
                (g || f).to < (m || p).from - (g && m ? 1 : 0) ||
                (f.widgetLineBreaks > 1 &&
                  e.bottom + t.defaultLineHeight / 2 < s.top)
                  ? o.push(w(d, e.bottom, u, s.top))
                  : e.bottom < s.top &&
                    t.elementAtHeight((e.bottom + s.top) / 2).type == T.Text &&
                    (e.bottom = s.top = (e.bottom + s.top) / 2),
                v(e).concat(o).concat(v(s))
              );
            }
            function w(t, i, s, o) {
              return new RectangleMarker(
                e,
                t - a.left,
                i - a.top,
                Math.max(0, s - t),
                o - i
              );
            }
            function v({ top: t, bottom: e, horizontal: i }) {
              let s = [];
              for (let o = 0; o < i.length; o += 2)
                s.push(w(i[o], t, i[o + 1], e));
              return s;
            }
            function b(e, i, s) {
              let o = 1e9,
                r = -1e9,
                l = [];
              function a(e, i, a, h, c) {
                let f = t.coordsAtPos(e, e == s.to ? -2 : 2),
                  p = t.coordsAtPos(a, a == s.from ? 2 : -2);
                f &&
                  p &&
                  ((o = Math.min(f.top, p.top, o)),
                  (r = Math.max(f.bottom, p.bottom, r)),
                  c == U.LTR
                    ? l.push(n && i ? d : f.left, n && h ? u : p.right)
                    : l.push(!n && h ? d : p.left, !n && i ? u : f.right));
              }
              let h = null != e ? e : s.from,
                c = null != i ? i : s.to;
              for (let s of t.visibleRanges)
                if (s.to > h && s.from < c)
                  for (let o = Math.max(s.from, h), n = Math.min(s.to, c); ;) {
                    let s = t.state.doc.lineAt(o);
                    for (let r of t.bidiSpans(s)) {
                      let t = r.from + s.from,
                        l = r.to + s.from;
                      if (t >= n) break;
                      l > o &&
                        a(
                          Math.max(t, o),
                          null == e && t <= h,
                          Math.min(l, n),
                          null == i && l >= c,
                          r.dir
                        );
                    }
                    if ((o = s.to + 1) >= n) break;
                  }
              return (
                0 == l.length && a(h, null == e, c, null == i, t.textDirection),
                { top: o, bottom: r, horizontal: l }
              );
            }
            function y(t, e) {
              let i = l.top + (e ? t.top : t.bottom);
              return { top: i, bottom: i, horizontal: [] };
            }
          })(t, e, i);
        {
          let s = t.coordsAtPos(i.head, i.assoc || 1);
          if (!s) return [];
          let o = e$(t);
          return [
            new RectangleMarker(
              e,
              s.left - o.left,
              s.top - o.top,
              null,
              s.bottom - s.top
            )
          ];
        }
      }
    };
    function e$(t) {
      let e = t.scrollDOM.getBoundingClientRect();
      return {
        left:
          (t.textDirection == U.LTR
            ? e.left
            : e.right - t.scrollDOM.clientWidth * t.scaleX) -
          t.scrollDOM.scrollLeft * t.scaleX,
        top: e.top - t.scrollDOM.scrollTop * t.scaleY
      };
    }
    function eU(t, e, i, s) {
      let o = t.coordsAtPos(e, 2 * i);
      if (!o) return s;
      let n = t.dom.getBoundingClientRect(),
        r = (o.top + o.bottom) / 2,
        l = t.posAtCoords({ x: n.left + 1, y: r }),
        a = t.posAtCoords({ x: n.right - 1, y: r });
      return null == l || null == a
        ? s
        : {
            from: Math.max(s.from, Math.min(l, a)),
            to: Math.min(s.to, Math.max(l, a))
          };
    }
    let LayerView = class LayerView {
      constructor(t, e) {
        ((this.view = t),
          (this.layer = e),
          (this.drawn = []),
          (this.scaleX = 1),
          (this.scaleY = 1),
          (this.measureReq = {
            read: this.measure.bind(this),
            write: this.draw.bind(this)
          }),
          (this.dom = t.scrollDOM.appendChild(document.createElement('div'))),
          this.dom.classList.add('cm-layer'),
          e.above && this.dom.classList.add('cm-layer-above'),
          e.class && this.dom.classList.add(e.class),
          this.scale(),
          this.dom.setAttribute('aria-hidden', 'true'),
          this.setOrder(t.state),
          t.requestMeasure(this.measureReq),
          e.mount && e.mount(this.dom, t));
      }
      update(t) {
        (t.startState.facet(eQ) != t.state.facet(eQ) && this.setOrder(t.state),
          (this.layer.update(t, this.dom) || t.geometryChanged) &&
            (this.scale(), t.view.requestMeasure(this.measureReq)));
      }
      docViewUpdate(t) {
        !1 !== this.layer.updateOnDocViewUpdate &&
          t.requestMeasure(this.measureReq);
      }
      setOrder(t) {
        let e = 0,
          i = t.facet(eQ);
        for (; e < i.length && i[e] != this.layer;) e++;
        this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - e);
      }
      measure() {
        return this.layer.markers(this.view);
      }
      scale() {
        let { scaleX: t, scaleY: e } = this.view;
        (t != this.scaleX || e != this.scaleY) &&
          ((this.scaleX = t),
          (this.scaleY = e),
          (this.dom.style.transform = `scale(${1 / t}, ${1 / e})`));
      }
      draw(t) {
        if (
          t.length != this.drawn.length ||
          t.some((t, e) => {
            var i;
            return (
              (i = this.drawn[e]),
              !(t.constructor == i.constructor && t.eq(i))
            );
          })
        ) {
          let e = this.dom.firstChild,
            i = 0;
          for (let s of t)
            s.update &&
            e &&
            s.constructor &&
            this.drawn[i].constructor &&
            s.update(e, this.drawn[i])
              ? ((e = e.nextSibling), i++)
              : this.dom.insertBefore(s.draw(), e);
          for (; e;) {
            let t = e.nextSibling;
            (e.remove(), (e = t));
          }
          ((this.drawn = t),
            x.webkit &&
              (this.dom.style.display = this.dom.firstChild ? '' : 'none'));
        }
      }
      destroy() {
        (this.layer.destroy && this.layer.destroy(this.dom, this.view),
          this.dom.remove());
      }
    };
    let eQ = l.sj.define();
    function eJ(t) {
      return [ViewPlugin.define(e => new LayerView(e, t)), eQ.of(t)];
    }
    let eZ = l.sj.define({
      combine: t =>
        (0, l.QR)(
          t,
          {
            cursorBlinkRate: 1200,
            drawRangeCursor: !0,
            iosSelectionHandles: !0
          },
          {
            cursorBlinkRate: (t, e) => Math.min(t, e),
            drawRangeCursor: (t, e) => t || e
          }
        )
    });
    function e0(t = {}) {
      return [eZ.of(t), e2, e3, e9, tb.of(!0)];
    }
    function e1(t) {
      return t.startState.facet(eZ) != t.state.facet(eZ);
    }
    let e2 = eJ({
      above: !0,
      markers(t) {
        let { state: e } = t,
          i = e.facet(eZ),
          s = [];
        for (let o of e.selection.ranges) {
          let n = o == e.selection.main;
          if (
            o.empty ||
            (i.drawRangeCursor && !(n && x.ios && i.iosSelectionHandles))
          ) {
            let e = n
                ? 'cm-cursor cm-cursor-primary'
                : 'cm-cursor cm-cursor-secondary',
              i = o.empty ? o : l.OF.cursor(o.head, o.assoc);
            for (let o of RectangleMarker.forRange(t, e, i)) s.push(o);
          }
        }
        return s;
      },
      update(t, e) {
        t.transactions.some(t => t.selection) &&
          (e.style.animationName =
            'cm-blink' == e.style.animationName ? 'cm-blink2' : 'cm-blink');
        let i = e1(t);
        return (i && e8(t.state, e), t.docChanged || t.selectionSet || i);
      },
      mount(t, e) {
        e8(e.state, t);
      },
      class: 'cm-cursorLayer'
    });
    function e8(t, e) {
      e.style.animationDuration = t.facet(eZ).cursorBlinkRate + 'ms';
    }
    let e3 = eJ({
        above: !1,
        markers(t) {
          let e = [],
            { main: i, ranges: s } = t.state.selection;
          for (let i of s)
            if (!i.empty)
              for (let s of RectangleMarker.forRange(
                t,
                'cm-selectionBackground',
                i
              ))
                e.push(s);
          if (x.ios && !i.empty && t.state.facet(eZ).iosSelectionHandles) {
            for (let s of RectangleMarker.forRange(
              t,
              'cm-selectionHandle cm-selectionHandle-start',
              l.OF.cursor(i.from, 1)
            ))
              e.push(s);
            for (let s of RectangleMarker.forRange(
              t,
              'cm-selectionHandle cm-selectionHandle-end',
              l.OF.cursor(i.to, 1)
            ))
              e.push(s);
          }
          return e;
        },
        update: (t, e) =>
          t.docChanged || t.selectionSet || t.viewportChanged || e1(t),
        class: 'cm-selectionLayer'
      }),
      e5 = x.gecko && 153 == x.gecko_version ? '#ffffff01' : 'transparent',
      e9 = l.Nb.highest(
        EditorView.theme({
          '.cm-line': {
            '& ::selection, &::selection': {
              backgroundColor: `${e5} !important`
            },
            caretColor: 'transparent !important'
          },
          '.cm-content': {
            caretColor: 'transparent !important',
            '& :focus': {
              caretColor: 'initial !important',
              '&::selection, & ::selection': {
                backgroundColor: 'Highlight !important'
              }
            }
          }
        })
      );
    function e4(t, e, i, s, o) {
      e.lastIndex = 0;
      for (
        let n = t.iterRange(i, s), r = i, l;
        !n.next().done;
        r += n.value.length
      )
        if (!n.lineBreak) for (; (l = e.exec(n.value));) o(r + l.index, l);
    }
    let MatchDecorator = class MatchDecorator {
      constructor(t) {
        let {
          regexp: e,
          decoration: i,
          decorate: s,
          boundary: o,
          maxLength: n = 1e3
        } = t;
        if (!e.global)
          throw RangeError(
            "The regular expression given to MatchDecorator should have its 'g' flag set"
          );
        if (((this.regexp = e), s))
          this.addMatch = (t, e, i, o) => s(o, i, i + t[0].length, t, e);
        else if ('function' == typeof i)
          this.addMatch = (t, e, s, o) => {
            let n = i(t, e, s);
            n && o(s, s + t[0].length, n);
          };
        else if (i) this.addMatch = (t, e, s, o) => o(s, s + t[0].length, i);
        else
          throw RangeError(
            "Either 'decorate' or 'decoration' should be provided to MatchDecorator"
          );
        ((this.boundary = o), (this.maxLength = n));
      }
      createDeco(t) {
        let e = new l.vB(),
          i = e.add.bind(e);
        for (let { from: e, to: s } of (function (t, e) {
          let i = t.visibleRanges;
          if (
            1 == i.length &&
            i[0].from == t.viewport.from &&
            i[0].to == t.viewport.to
          )
            return i;
          let s = [];
          for (let { from: o, to: n } of i)
            ((o = Math.max(t.state.doc.lineAt(o).from, o - e)),
              (n = Math.min(t.state.doc.lineAt(n).to, n + e)),
              s.length && s[s.length - 1].to >= o
                ? (s[s.length - 1].to = n)
                : s.push({ from: o, to: n }));
          return s;
        })(t, this.maxLength))
          e4(t.state.doc, this.regexp, e, s, (e, s) =>
            this.addMatch(s, t, e, i)
          );
        return e.finish();
      }
      updateDeco(t, e) {
        let i = 1e9,
          s = -1;
        return (t.docChanged &&
          t.changes.iterChanges((e, o, n, r) => {
            r >= t.view.viewport.from &&
              n <= t.view.viewport.to &&
              ((i = Math.min(n, i)), (s = Math.max(r, s)));
          }),
        t.viewportMoved || s - i > 1e3)
          ? this.createDeco(t.view)
          : s > -1
            ? this.updateRange(t.view, e.map(t.changes), i, s)
            : e;
      }
      updateRange(t, e, i, s) {
        for (let o of t.visibleRanges) {
          let n = Math.max(o.from, i),
            r = Math.min(o.to, s);
          if (r >= n) {
            let i = t.state.doc.lineAt(n),
              s = i.to < r ? t.state.doc.lineAt(r) : i,
              l = Math.max(o.from, i.from),
              a = Math.min(o.to, s.to);
            if (this.boundary) {
              for (; n > i.from; n--)
                if (this.boundary.test(i.text[n - 1 - i.from])) {
                  l = n;
                  break;
                }
              for (; r < s.to; r++)
                if (this.boundary.test(s.text[r - s.from])) {
                  a = r;
                  break;
                }
            }
            let h = [],
              c,
              d = (t, e, i) => h.push(i.range(t, e));
            if (i == s)
              for (
                this.regexp.lastIndex = l - i.from;
                (c = this.regexp.exec(i.text)) && c.index < a - i.from;
              )
                this.addMatch(c, t, c.index + i.from, d);
            else
              e4(t.state.doc, this.regexp, l, a, (e, i) =>
                this.addMatch(i, t, e, d)
              );
            e = e.update({
              filterFrom: l,
              filterTo: a,
              filter: (t, e) => t < l || e > a,
              add: h
            });
          }
        }
        return e;
      }
    };
    let e6 = null != /x/.unicode ? 'gu' : 'g',
      e7 = RegExp('[\0-\b\n-\x1f-­؜​‎‏\u2028\u2029‭‮⁦⁧⁩\uFEFF￹-￼]', e6),
      it = {
        0: 'null',
        7: 'bell',
        8: 'backspace',
        10: 'newline',
        11: 'vertical tab',
        13: 'carriage return',
        27: 'escape',
        8203: 'zero width space',
        8204: 'zero width non-joiner',
        8205: 'zero width joiner',
        8206: 'left-to-right mark',
        8207: 'right-to-left mark',
        8232: 'line separator',
        8237: 'left-to-right override',
        8238: 'right-to-left override',
        8294: 'left-to-right isolate',
        8295: 'right-to-left isolate',
        8297: 'pop directional isolate',
        8233: 'paragraph separator',
        65279: 'zero width no-break space',
        65532: 'object replacement'
      },
      ie = null,
      ii = l.sj.define({
        combine(t) {
          let e = (0, l.QR)(t, {
            render: null,
            specialChars: e7,
            addSpecialChars: null
          });
          return (
            (e.replaceTabs = !(function () {
              var t;
              if (null == ie && 'u' > typeof document && document.body) {
                let e = document.body.style;
                ie = (null != (t = e.tabSize) ? t : e.MozTabSize) != null;
              }
              return ie || !1;
            })()) && (e.specialChars = RegExp('	|' + e.specialChars.source, e6)),
            e.addSpecialChars &&
              (e.specialChars = RegExp(
                e.specialChars.source + '|' + e.addSpecialChars.source,
                e6
              )),
            e
          );
        }
      });
    function is(t = {}) {
      return [
        ii.of(t),
        io ||
          (io = ViewPlugin.fromClass(
            class {
              constructor(t) {
                ((this.view = t),
                  (this.decorations = Decoration.none),
                  (this.decorationCache = Object.create(null)),
                  (this.decorator = this.makeDecorator(t.state.facet(ii))),
                  (this.decorations = this.decorator.createDeco(t)));
              }
              makeDecorator(t) {
                return new MatchDecorator({
                  regexp: t.specialChars,
                  decoration: (e, i, s) => {
                    let { doc: o } = i.state,
                      n = (0, l.vS)(e[0], 0);
                    if (9 == n) {
                      let t = o.lineAt(s),
                        e = i.state.tabSize,
                        n = (0, l.y$)(t.text, e, s - t.from);
                      return Decoration.replace({
                        widget: new TabWidget(
                          ((e - (n % e)) * this.view.defaultCharacterWidth) /
                            this.view.scaleX
                        )
                      });
                    }
                    return (
                      this.decorationCache[n] ||
                      (this.decorationCache[n] = Decoration.replace({
                        widget: new SpecialCharWidget(t, n)
                      }))
                    );
                  },
                  boundary: t.replaceTabs ? void 0 : /[^]/
                });
              }
              update(t) {
                let e = t.state.facet(ii);
                t.startState.facet(ii) != e
                  ? ((this.decorator = this.makeDecorator(e)),
                    (this.decorations = this.decorator.createDeco(t.view)))
                  : (this.decorations = this.decorator.updateDeco(
                      t,
                      this.decorations
                    ));
              }
            },
            { decorations: t => t.decorations }
          ))
      ];
    }
    let io = null;
    let SpecialCharWidget = class SpecialCharWidget extends WidgetType {
      constructor(t, e) {
        (super(), (this.options = t), (this.code = e));
      }
      eq(t) {
        return t.code == this.code;
      }
      toDOM(t) {
        var e;
        let i =
            (e = this.code) >= 32
              ? '•'
              : 10 == e
                ? '␤'
                : String.fromCharCode(9216 + e),
          s =
            t.state.phrase('Control character') +
            ' ' +
            (it[this.code] || '0x' + this.code.toString(16)),
          o = this.options.render && this.options.render(this.code, s, i);
        if (o) return o;
        let n = document.createElement('span');
        return (
          (n.textContent = i),
          (n.title = s),
          n.setAttribute('aria-label', s),
          (n.className = 'cm-specialChar'),
          n
        );
      }
      ignoreEvent() {
        return !1;
      }
    };
    let TabWidget = class TabWidget extends WidgetType {
      constructor(t) {
        (super(), (this.width = t));
      }
      eq(t) {
        return t.width == this.width;
      }
      toDOM() {
        let t = document.createElement('span');
        return (
          (t.textContent = '	'),
          (t.className = 'cm-tab'),
          (t.style.width = this.width + 'px'),
          t
        );
      }
      ignoreEvent() {
        return !1;
      }
    };
    function ir() {
      return ia;
    }
    let il = Decoration.line({ class: 'cm-activeLine' }),
      ia = ViewPlugin.fromClass(
        class {
          constructor(t) {
            this.decorations = this.getDeco(t);
          }
          update(t) {
            (t.docChanged || t.selectionSet) &&
              (this.decorations = this.getDeco(t.view));
          }
          getDeco(t) {
            let e = -1,
              i = [];
            for (let s of t.state.selection.ranges) {
              let o = t.lineBlockAt(s.head);
              o.from > e && (i.push(il.range(o.from)), (e = o.from));
            }
            return Decoration.set(i);
          }
        },
        { decorations: t => t.decorations }
      ),
      ih = '-10000px';
    let TooltipViewManager = class TooltipViewManager {
      constructor(t, e, i, s) {
        ((this.facet = e),
          (this.createTooltipView = i),
          (this.removeTooltipView = s),
          (this.input = t.state.facet(e)),
          (this.tooltips = this.input.filter(t => t)));
        let o = null;
        this.tooltipViews = this.tooltips.map(t => (o = i(t, o)));
      }
      update(t, e) {
        var i;
        let s = t.state.facet(this.facet),
          o = s.filter(t => t);
        if (s === this.input) {
          for (let e of this.tooltipViews) e.update && e.update(t);
          return !1;
        }
        let n = [],
          r = e ? [] : null;
        for (let i = 0; i < o.length; i++) {
          let s = o[i],
            l = -1;
          if (s) {
            for (let t = 0; t < this.tooltips.length; t++) {
              let e = this.tooltips[t];
              e && e.create == s.create && (l = t);
            }
            if (l < 0)
              ((n[i] = this.createTooltipView(s, i ? n[i - 1] : null)),
                r && (r[i] = !!s.above));
            else {
              let s = (n[i] = this.tooltipViews[l]);
              (r && (r[i] = e[l]), s.update && s.update(t));
            }
          }
        }
        for (let t of this.tooltipViews)
          0 > n.indexOf(t) &&
            (this.removeTooltipView(t), null == (i = t.destroy) || i.call(t));
        return (
          e && (r.forEach((t, i) => (e[i] = t)), (e.length = r.length)),
          (this.input = s),
          (this.tooltips = o),
          (this.tooltipViews = n),
          !0
        );
      }
    };
    function ic(t) {
      let e = t.dom.ownerDocument.documentElement;
      return { top: 0, left: 0, bottom: e.clientHeight, right: e.clientWidth };
    }
    let id = l.sj.define({
        combine: t => {
          var e, i, s;
          return {
            position: x.ios
              ? 'absolute'
              : (null == (e = t.find(t => t.position)) ? void 0 : e.position) ||
                'fixed',
            parent:
              (null == (i = t.find(t => t.parent)) ? void 0 : i.parent) || null,
            tooltipSpace:
              (null == (s = t.find(t => t.tooltipSpace))
                ? void 0
                : s.tooltipSpace) || ic
          };
        }
      }),
      iu = new WeakMap(),
      ip = ViewPlugin.fromClass(
        class {
          constructor(t) {
            ((this.view = t),
              (this.above = []),
              (this.inView = !0),
              (this.madeAbsolute = !1),
              (this.lastTransaction = 0),
              (this.measureTimeout = -1));
            let e = t.state.facet(id);
            ((this.position = e.position),
              (this.parent = e.parent),
              (this.classes = t.themeClasses),
              this.createContainer(),
              (this.measureReq = {
                read: this.readMeasure.bind(this),
                write: this.writeMeasure.bind(this),
                key: this
              }),
              (this.resizeObserver =
                'function' == typeof ResizeObserver
                  ? new ResizeObserver(() => this.measureSoon())
                  : null),
              (this.manager = new TooltipViewManager(
                t,
                iv,
                (t, e) => this.createTooltip(t, e),
                t => {
                  (this.resizeObserver && this.resizeObserver.unobserve(t.dom),
                    t.dom.remove());
                }
              )),
              (this.above = this.manager.tooltips.map(t => !!t.above)),
              (this.intersectionObserver =
                'function' == typeof IntersectionObserver
                  ? new IntersectionObserver(
                      t => {
                        Date.now() > this.lastTransaction - 50 &&
                          t.length > 0 &&
                          t[t.length - 1].intersectionRatio < 1 &&
                          this.measureSoon();
                      },
                      { threshold: [1] }
                    )
                  : null),
              this.observeIntersection(),
              t.win.addEventListener(
                'resize',
                (this.measureSoon = this.measureSoon.bind(this))
              ),
              this.maybeMeasure());
          }
          createContainer() {
            this.parent
              ? ((this.container = document.createElement('div')),
                (this.container.style.position = 'relative'),
                (this.container.className = this.view.themeClasses),
                this.parent.appendChild(this.container))
              : (this.container = this.view.dom);
          }
          observeIntersection() {
            if (this.intersectionObserver)
              for (let t of (this.intersectionObserver.disconnect(),
              this.manager.tooltipViews))
                this.intersectionObserver.observe(t.dom);
          }
          measureSoon() {
            this.measureTimeout < 0 &&
              (this.measureTimeout = setTimeout(() => {
                ((this.measureTimeout = -1), this.maybeMeasure());
              }, 50));
          }
          update(t) {
            t.transactions.length && (this.lastTransaction = Date.now());
            let e = this.manager.update(t, this.above);
            e && this.observeIntersection();
            let i = e || t.geometryChanged,
              s = t.state.facet(id);
            if (s.position != this.position && !this.madeAbsolute) {
              for (let t of ((this.position = s.position),
              this.manager.tooltipViews))
                t.dom.style.position = this.position;
              i = !0;
            }
            if (s.parent != this.parent) {
              for (let t of (this.parent && this.container.remove(),
              (this.parent = s.parent),
              this.createContainer(),
              this.manager.tooltipViews))
                this.container.appendChild(t.dom);
              i = !0;
            } else
              this.parent &&
                this.view.themeClasses != this.classes &&
                (this.classes = this.container.className =
                  this.view.themeClasses);
            i && this.maybeMeasure();
          }
          createTooltip(t, e) {
            let i = t.create(this.view),
              s = e ? e.dom : null;
            if (
              (i.dom.classList.add('cm-tooltip'),
              t.arrow &&
                !i.dom.querySelector('.cm-tooltip > .cm-tooltip-arrow'))
            ) {
              let t = document.createElement('div');
              ((t.className = 'cm-tooltip-arrow'), i.dom.appendChild(t));
            }
            return (
              (i.dom.style.position = this.position),
              (i.dom.style.top = ih),
              (i.dom.style.left = '0px'),
              this.container.insertBefore(i.dom, s),
              i.mount && i.mount(this.view),
              this.resizeObserver && this.resizeObserver.observe(i.dom),
              i
            );
          }
          destroy() {
            var t, e, i;
            for (let e of (this.view.win.removeEventListener(
              'resize',
              this.measureSoon
            ),
            this.manager.tooltipViews))
              (e.dom.remove(), null == (t = e.destroy) || t.call(e));
            (this.parent && this.container.remove(),
              null == (e = this.resizeObserver) || e.disconnect(),
              null == (i = this.intersectionObserver) || i.disconnect(),
              clearTimeout(this.measureTimeout));
          }
          readMeasure() {
            let t = 1,
              e = 1,
              i = !1;
            if ('fixed' == this.position && this.manager.tooltipViews.length) {
              let { dom: t } = this.manager.tooltipViews[0];
              if (x.safari) {
                let e = t.getBoundingClientRect();
                i = Math.abs(e.top + 1e4) > 1 || Math.abs(e.left) > 1;
              } else
                i =
                  !!t.offsetParent &&
                  t.offsetParent != this.container.ownerDocument.body;
            }
            if (i || 'absolute' == this.position)
              if (this.parent) {
                let i = this.parent.getBoundingClientRect();
                i.width &&
                  i.height &&
                  ((t = i.width / this.parent.offsetWidth),
                  (e = i.height / this.parent.offsetHeight));
              } else ({ scaleX: t, scaleY: e } = this.view.viewState);
            let s = this.view.scrollDOM.getBoundingClientRect(),
              o = tW(this.view);
            return {
              visible: {
                left: s.left + o.left,
                top: s.top + o.top,
                right: s.right - o.right,
                bottom: s.bottom - o.bottom
              },
              parent: this.parent
                ? this.container.getBoundingClientRect()
                : this.view.dom.getBoundingClientRect(),
              pos: this.manager.tooltips.map((t, e) => {
                let i = this.manager.tooltipViews[e];
                return i.getCoords
                  ? i.getCoords(t.pos)
                  : this.view.coordsAtPos(t.pos);
              }),
              size: this.manager.tooltipViews.map(({ dom: t }) =>
                t.getBoundingClientRect()
              ),
              space: this.view.state.facet(id).tooltipSpace(this.view),
              scaleX: t,
              scaleY: e,
              makeAbsolute: i
            };
          }
          writeMeasure(t) {
            var e;
            if (t.makeAbsolute)
              for (let t of ((this.madeAbsolute = !0),
              (this.position = 'absolute'),
              this.manager.tooltipViews))
                t.dom.style.position = 'absolute';
            let { visible: i, space: s, scaleX: o, scaleY: n } = t,
              r = [];
            for (let l = 0; l < this.manager.tooltips.length; l++) {
              let a = this.manager.tooltips[l],
                h = this.manager.tooltipViews[l],
                { dom: c } = h,
                d = t.pos[l],
                u = t.size[l];
              if (
                !d ||
                (!1 !== a.clip &&
                  (d.bottom <= Math.max(i.top, s.top) ||
                    d.top >= Math.min(i.bottom, s.bottom) ||
                    d.right < Math.max(i.left, s.left) - 0.1 ||
                    d.left > Math.min(i.right, s.right) + 0.1))
              ) {
                c.style.top = ih;
                continue;
              }
              let f = a.arrow ? h.dom.querySelector('.cm-tooltip-arrow') : null,
                p = 7 * !!f,
                g = u.right - u.left,
                m = null != (e = iu.get(h)) ? e : u.bottom - u.top,
                w = h.offset || iw,
                v = this.view.textDirection == U.LTR,
                b =
                  u.width > s.right - s.left
                    ? v
                      ? s.left
                      : s.right - u.width
                    : v
                      ? Math.max(
                          s.left,
                          Math.min(d.left - 14 * !!f + w.x, s.right - g)
                        )
                      : Math.min(
                          Math.max(s.left, d.left - g + 14 * !!f - w.x),
                          s.right - g
                        ),
                y = this.above[l];
              !a.strictSide &&
                (y
                  ? d.top - m - p - w.y < s.top
                  : d.bottom + m + p + w.y > s.bottom) &&
                y == s.bottom - d.bottom > d.top - s.top &&
                (y = this.above[l] = !y);
              let x = (y ? d.top - s.top : s.bottom - d.bottom) - p;
              if (x < m && !1 !== h.resize) {
                if (x < this.view.defaultLineHeight) {
                  c.style.top = ih;
                  continue;
                }
                (iu.set(h, m), (c.style.height = (m = x) / n + 'px'));
              } else c.style.height && (c.style.height = '');
              let M = y ? d.top - m - p - w.y : d.bottom + p + w.y,
                S = b + g;
              if (!0 !== h.overlap)
                for (let t of r)
                  t.left < S &&
                    t.right > b &&
                    t.top < M + m &&
                    t.bottom > M &&
                    (M = y ? t.top - m - 2 - p : t.bottom + p + 2);
              if (
                ('absolute' == this.position
                  ? ((c.style.top = (M - t.parent.top) / n + 'px'),
                    ig(c, (b - t.parent.left) / o))
                  : ((c.style.top = M / n + 'px'), ig(c, b / o)),
                f)
              ) {
                let t = d.left + (v ? w.x : -w.x) - (b + 14 - 7);
                f.style.left = t / o + 'px';
              }
              (!0 !== h.overlap &&
                r.push({ left: b, top: M, right: S, bottom: M + m }),
                c.classList.toggle('cm-tooltip-above', y),
                c.classList.toggle('cm-tooltip-below', !y),
                h.positioned && h.positioned(t.space));
            }
          }
          maybeMeasure() {
            if (
              this.manager.tooltips.length &&
              (this.view.inView && this.view.requestMeasure(this.measureReq),
              this.inView != this.view.inView) &&
              ((this.inView = this.view.inView), !this.inView)
            )
              for (let t of this.manager.tooltipViews) t.dom.style.top = ih;
          }
        },
        {
          eventObservers: {
            scroll() {
              this.maybeMeasure();
            }
          }
        }
      );
    function ig(t, e) {
      let i = parseInt(t.style.left, 10);
      (isNaN(i) || Math.abs(e - i) > 1) && (t.style.left = e + 'px');
    }
    let im = EditorView.baseTheme({
        '.cm-tooltip': { zIndex: 500, boxSizing: 'border-box' },
        '&light .cm-tooltip': {
          border: '1px solid #bbb',
          backgroundColor: '#f5f5f5'
        },
        '&light .cm-tooltip-section:not(:first-child)': {
          borderTop: '1px solid #bbb'
        },
        '&dark .cm-tooltip': { backgroundColor: '#333338', color: 'white' },
        '.cm-tooltip-arrow': {
          height: '7px',
          width: '14px',
          position: 'absolute',
          zIndex: -1,
          overflow: 'hidden',
          '&:before, &:after': {
            content: "''",
            position: 'absolute',
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent'
          },
          '.cm-tooltip-above &': {
            bottom: '-7px',
            '&:before': { borderTop: '7px solid #bbb' },
            '&:after': { borderTop: '7px solid #f5f5f5', bottom: '1px' }
          },
          '.cm-tooltip-below &': {
            top: '-7px',
            '&:before': { borderBottom: '7px solid #bbb' },
            '&:after': { borderBottom: '7px solid #f5f5f5', top: '1px' }
          }
        },
        '&dark .cm-tooltip .cm-tooltip-arrow': {
          '&:before': {
            borderTopColor: '#333338',
            borderBottomColor: '#333338'
          },
          '&:after': {
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent'
          }
        }
      }),
      iw = { x: 0, y: 0 },
      iv = l.sj.define({ enables: [ip, im] }),
      ib = l.sj.define({ combine: t => t.reduce((t, e) => t.concat(e), []) });
    let HoverTooltipHost = class HoverTooltipHost {
      static create(t) {
        return new HoverTooltipHost(t);
      }
      constructor(t) {
        ((this.view = t),
          (this.mounted = !1),
          (this.dom = document.createElement('div')),
          this.dom.classList.add('cm-tooltip-hover'),
          (this.manager = new TooltipViewManager(
            t,
            ib,
            (t, e) => this.createHostedView(t, e),
            t => t.dom.remove()
          )));
      }
      createHostedView(t, e) {
        let i = t.create(this.view);
        return (
          i.dom.classList.add('cm-tooltip-section'),
          this.dom.insertBefore(
            i.dom,
            e ? e.dom.nextSibling : this.dom.firstChild
          ),
          this.mounted && i.mount && i.mount(this.view),
          i
        );
      }
      mount(t) {
        for (let e of this.manager.tooltipViews) e.mount && e.mount(t);
        this.mounted = !0;
      }
      positioned(t) {
        for (let e of this.manager.tooltipViews)
          e.positioned && e.positioned(t);
      }
      update(t) {
        this.manager.update(t);
      }
      destroy() {
        var t;
        for (let e of this.manager.tooltipViews)
          null == (t = e.destroy) || t.call(e);
      }
      passProp(t) {
        let e;
        for (let i of this.manager.tooltipViews) {
          let s = i[t];
          if (void 0 !== s) {
            if (void 0 === e) e = s;
            else if (e !== s) return;
          }
        }
        return e;
      }
      get offset() {
        return this.passProp('offset');
      }
      get getCoords() {
        return this.passProp('getCoords');
      }
      get overlap() {
        return this.passProp('overlap');
      }
      get resize() {
        return this.passProp('resize');
      }
    };
    let iy = iv.compute([ib], t => {
        let e = t.facet(ib);
        return 0 === e.length
          ? null
          : {
              pos: Math.min(...e.map(t => t.pos)),
              end: Math.max(
                ...e.map(t => {
                  var e;
                  return null != (e = t.end) ? e : t.pos;
                })
              ),
              create: HoverTooltipHost.create,
              above: e[0].above,
              arrow: e.some(t => t.arrow)
            };
      }),
      ix = l.sj.define();
    let HoverPlugin = class HoverPlugin {
      constructor(t, e, i, s, o, n) {
        ((this.view = t),
          (this.source = e),
          (this.field = i),
          (this.locked = s),
          (this.setHover = o),
          (this.hoverTime = n),
          (this.hoverTimeout = -1),
          (this.restartTimeout = -1),
          (this.pending = null),
          (this.lastMove = { x: 0, y: 0, target: t.dom, time: 0 }),
          (this.checkHover = this.checkHover.bind(this)),
          t.dom.addEventListener(
            'mouseleave',
            (this.mouseleave = this.mouseleave.bind(this))
          ),
          t.dom.addEventListener(
            'mousemove',
            (this.mousemove = this.mousemove.bind(this))
          ));
      }
      update(t) {
        this.pending &&
          ((this.pending = null),
          clearTimeout(this.restartTimeout),
          (this.restartTimeout = setTimeout(() => this.startHover(), 20)));
      }
      get active() {
        return this.view.state.field(this.field);
      }
      checkHover() {
        if (((this.hoverTimeout = -1), this.active.length)) return;
        let t = Date.now() - this.lastMove.time;
        t < this.hoverTime
          ? (this.hoverTimeout = setTimeout(
              this.checkHover,
              this.hoverTime - t
            ))
          : this.startHover();
      }
      startHover() {
        clearTimeout(this.restartTimeout);
        let { view: t, lastMove: e } = this,
          i = t.docView.tile.nearest(e.target);
        if (!i) return;
        let s,
          o = 1;
        if (i.isWidget()) s = i.posAtStart;
        else {
          if (null == (s = t.posAtCoords(e))) return;
          let i = t.coordsAtPos(s);
          if (
            !i ||
            e.y < i.top ||
            e.y > i.bottom ||
            e.x < i.left - t.defaultCharacterWidth ||
            e.x > i.right + t.defaultCharacterWidth
          )
            return;
          let n = t
              .bidiSpans(t.state.doc.lineAt(s))
              .find(t => t.from <= s && t.to >= s),
            r = n && n.dir == U.RTL ? -1 : 1;
          o = e.x < i.left ? -r : r;
        }
        this.activateHover(t, s, o);
      }
      activateHover(t, e, i, s) {
        let o = this.source(t, e, i),
          n = e => {
            if (e && !(Array.isArray(e) && !e.length)) {
              let i = Array.isArray(e) ? e : [e];
              (s && this.locked.set(i, s),
                t.dispatch({ effects: this.setHover.of(i) }));
            }
          };
        if (o && 'then' in o) {
          let i = (this.pending = { pos: e });
          o.then(
            t => {
              this.pending == i && ((this.pending = null), n(t));
            },
            e => tS(t.state, e, 'hover tooltip')
          );
        } else n(o);
      }
      get tooltip() {
        let t = this.view.plugin(ip),
          e = t
            ? t.manager.tooltips.findIndex(
                t => t.create == HoverTooltipHost.create
              )
            : -1;
        return e > -1 ? t.manager.tooltipViews[e] : null;
      }
      mousemove(t) {
        var e, i;
        ((this.lastMove = {
          x: t.clientX,
          y: t.clientY,
          target: t.target,
          time: Date.now()
        }),
          this.hoverTimeout < 0 &&
            (this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime)));
        let { active: s, tooltip: o } = this;
        if (
          (s.length &&
            !this.locked.has(s) &&
            o &&
            !(function (t, e) {
              let {
                  left: i,
                  right: s,
                  top: o,
                  bottom: n
                } = t.getBoundingClientRect(),
                r;
              if ((r = t.querySelector('.cm-tooltip-arrow'))) {
                let t = r.getBoundingClientRect();
                ((o = Math.min(t.top, o)), (n = Math.max(t.bottom, n)));
              }
              return (
                e.clientX >= i - 4 &&
                e.clientX <= s + 4 &&
                e.clientY >= o - 4 &&
                e.clientY <= n + 4
              );
            })(o.dom, t)) ||
          this.pending
        ) {
          let { pos: o } = s[0] || this.pending,
            n = null != (i = null == (e = s[0]) ? void 0 : e.end) ? i : o;
          (o == n
            ? this.view.posAtCoords(this.lastMove) != o
            : !(function (t, e, i, s, o) {
                let n = t.scrollDOM.getBoundingClientRect(),
                  r = t.documentTop + t.documentPadding.top + t.contentHeight;
                if (
                  n.left > s ||
                  n.right < s ||
                  n.top > o ||
                  Math.min(n.bottom, r) < o
                )
                  return !1;
                let l = t.posAtCoords({ x: s, y: o }, !1);
                return l >= e && l <= i;
              })(this.view, o, n, t.clientX, t.clientY)) &&
            (this.view.dispatch({ effects: this.setHover.of([]) }),
            (this.pending = null));
        }
      }
      mouseleave(t) {
        (clearTimeout(this.hoverTimeout), (this.hoverTimeout = -1));
        let { active: e } = this;
        if (e.length && !this.locked.has(e)) {
          let { tooltip: e } = this;
          e && e.dom.contains(t.relatedTarget)
            ? this.watchTooltipLeave(e.dom)
            : this.view.dispatch({ effects: this.setHover.of([]) });
        }
      }
      watchTooltipLeave(t) {
        let e = i => {
          t.removeEventListener('mouseleave', e);
          let { active: s } = this;
          !s.length ||
            this.locked.has(s) ||
            this.view.dom.contains(i.relatedTarget) ||
            this.view.dispatch({ effects: this.setHover.of([]) });
        };
        t.addEventListener('mouseleave', e);
      }
      destroy() {
        (clearTimeout(this.hoverTimeout),
          clearTimeout(this.restartTimeout),
          this.view.dom.removeEventListener('mouseleave', this.mouseleave),
          this.view.dom.removeEventListener('mousemove', this.mousemove));
      }
    };
    function iM(t, e = {}) {
      let i = l.Pe.define(),
        s = new WeakMap(),
        o = l.sU.define({
          create: () => [],
          update(t, n) {
            let r = s.get(t);
            if (
              (t.length &&
                ((e.hideOnChange && (n.docChanged || n.selection)) ||
                (r && r(n))
                  ? (t = [])
                  : e.hideOn && (t = t.filter(t => !e.hideOn(n, t)))),
              n.docChanged && t.length)
            ) {
              let e = [];
              for (let i of t) {
                let t = n.changes.mapPos(i.pos, -1, l.iR.TrackDel);
                if (null != t) {
                  let s = Object.assign(Object.create(null), i);
                  ((s.pos = t),
                    null != s.end && (s.end = n.changes.mapPos(s.end)),
                    e.push(s));
                }
              }
              t = e;
            }
            for (let e of n.effects)
              (e.is(i) && ((t = e.value), (r = void 0)),
                ((e.is(iC) && !e.value) || e.value == o) && (t = []));
            return (t.length && r && s.set(t, r), t);
          },
          provide: t => ib.from(t)
        }),
        n = ViewPlugin.define(
          n => new HoverPlugin(n, t, o, s, i, e.hoverTime || 300)
        );
      return { active: o, extension: [o, n, ix.of(n), iy] };
    }
    function iS(t, e, i, s = {}) {
      var o;
      let n = t.state
        .facet(ix)
        .map(e => t.plugin(e))
        .filter(t => !!t);
      if (s.tooltip && s.tooltip.active) {
        let t = n.find(t => t.field == s.tooltip.active);
        t && (n = [t]);
      }
      for (let r of n)
        r.activateHover(t, e, i, null != (o = s.until) ? o : () => !1);
    }
    function ik(t, e) {
      let i = t.plugin(ip);
      if (!i) return null;
      let s = i.manager.tooltips.indexOf(e);
      return s < 0 ? null : i.manager.tooltipViews[s];
    }
    let iC = l.Pe.define(),
      iT = l.sj.define({
        combine(t) {
          let e, i;
          for (let s of t)
            ((e = e || s.topContainer), (i = i || s.bottomContainer));
          return { topContainer: e, bottomContainer: i };
        }
      });
    function iA(t, e) {
      let i = t.plugin(iO),
        s = i ? i.specs.indexOf(e) : -1;
      return s > -1 ? i.panels[s] : null;
    }
    let iO = ViewPlugin.fromClass(
      class {
        constructor(t) {
          ((this.input = t.state.facet(iB)),
            (this.specs = this.input.filter(t => t)),
            (this.panels = this.specs.map(e => e(t))));
          let e = t.state.facet(iT);
          for (let i of ((this.top = new PanelGroup(t, !0, e.topContainer)),
          (this.bottom = new PanelGroup(t, !1, e.bottomContainer)),
          this.top.sync(this.panels.filter(t => t.top)),
          this.bottom.sync(this.panels.filter(t => !t.top)),
          this.panels))
            (i.dom.classList.add('cm-panel'), i.mount && i.mount());
        }
        update(t) {
          let e = t.state.facet(iT);
          (this.top.container != e.topContainer &&
            (this.top.sync([]),
            (this.top = new PanelGroup(t.view, !0, e.topContainer))),
            this.bottom.container != e.bottomContainer &&
              (this.bottom.sync([]),
              (this.bottom = new PanelGroup(t.view, !1, e.bottomContainer))),
            this.top.syncClasses(),
            this.bottom.syncClasses());
          let i = t.state.facet(iB);
          if (i != this.input) {
            let e = i.filter(t => t),
              s = [],
              o = [],
              n = [],
              r = [];
            for (let i of e) {
              let e = this.specs.indexOf(i),
                l;
              (e < 0
                ? ((l = i(t.view)), r.push(l))
                : (l = this.panels[e]).update && l.update(t),
                s.push(l),
                (l.top ? o : n).push(l));
            }
            for (let t of ((this.specs = e),
            (this.panels = s),
            this.top.sync(o),
            this.bottom.sync(n),
            r))
              (t.dom.classList.add('cm-panel'), t.mount && t.mount());
          } else for (let e of this.panels) e.update && e.update(t);
        }
        destroy() {
          (this.top.sync([]), this.bottom.sync([]));
        }
      },
      {
        provide: t =>
          EditorView.scrollMargins.of(e => {
            let i = e.plugin(t);
            return (
              i && {
                top: i.top.scrollMargin(),
                bottom: i.bottom.scrollMargin()
              }
            );
          })
      }
    );
    let PanelGroup = class PanelGroup {
      constructor(t, e, i) {
        ((this.view = t),
          (this.top = e),
          (this.container = i),
          (this.dom = void 0),
          (this.classes = ''),
          (this.panels = []),
          this.syncClasses());
      }
      sync(t) {
        for (let e of this.panels) e.destroy && 0 > t.indexOf(e) && e.destroy();
        ((this.panels = t), this.syncDOM());
      }
      syncDOM() {
        if (0 == this.panels.length) {
          this.dom && (this.dom.remove(), (this.dom = void 0));
          return;
        }
        if (!this.dom) {
          ((this.dom = document.createElement('div')),
            (this.dom.className = this.top
              ? 'cm-panels cm-panels-top'
              : 'cm-panels cm-panels-bottom'));
          let t = this.container || this.view.dom;
          t.insertBefore(this.dom, this.top ? t.firstChild : null);
        }
        let t = this.dom.firstChild;
        for (let e of this.panels)
          if (e.dom.parentNode == this.dom) {
            for (; t != e.dom;) t = iD(t);
            t = t.nextSibling;
          } else this.dom.insertBefore(e.dom, t);
        for (; t;) t = iD(t);
      }
      scrollMargin() {
        return !this.dom || this.container
          ? 0
          : Math.max(
              0,
              this.top
                ? this.dom.getBoundingClientRect().bottom -
                    Math.max(0, this.view.scrollDOM.getBoundingClientRect().top)
                : Math.min(
                    innerHeight,
                    this.view.scrollDOM.getBoundingClientRect().bottom
                  ) - this.dom.getBoundingClientRect().top
            );
      }
      syncClasses() {
        if (this.container && this.classes != this.view.themeClasses) {
          for (let t of this.classes.split(' '))
            t && this.container.classList.remove(t);
          for (let t of (this.classes = this.view.themeClasses).split(' '))
            t && this.container.classList.add(t);
        }
      }
    };
    function iD(t) {
      let e = t.nextSibling;
      return (t.remove(), e);
    }
    let iB = l.sj.define({ enables: iO });
    let GutterMarker = class GutterMarker extends l.FB {
      compare(t) {
        return this == t || (this.constructor == t.constructor && this.eq(t));
      }
      eq(t) {
        return !1;
      }
      destroy(t) {}
    };
    ((GutterMarker.prototype.elementClass = ''),
      (GutterMarker.prototype.toDOM = void 0),
      (GutterMarker.prototype.mapMode = l.iR.TrackBefore),
      (GutterMarker.prototype.startSide = GutterMarker.prototype.endSide = -1),
      (GutterMarker.prototype.point = !0));
    let iE = l.sj.define(),
      iR = l.sj.define(),
      iH = l.sj.define(),
      iL = l.sj.define({ combine: t => t.some(t => t) }),
      iV = ViewPlugin.fromClass(
        class {
          constructor(t) {
            for (let e of ((this.view = t),
            (this.domAfter = null),
            (this.prevViewport = t.viewport),
            (this.dom = document.createElement('div')),
            (this.dom.className = 'cm-gutters cm-gutters-before'),
            this.dom.setAttribute('aria-hidden', 'true'),
            (this.dom.style.minHeight =
              this.view.contentHeight / this.view.scaleY + 'px'),
            (this.gutters = t.state
              .facet(iH)
              .map(e => new SingleGutterView(t, e))),
            (this.fixed = !t.state.facet(iL)),
            this.gutters))
              'after' == e.config.side
                ? this.getDOMAfter().appendChild(e.dom)
                : this.dom.appendChild(e.dom);
            (this.fixed && (this.dom.style.position = 'sticky'),
              this.syncGutters(!1),
              t.scrollDOM.insertBefore(this.dom, t.contentDOM));
          }
          getDOMAfter() {
            return (
              this.domAfter ||
                ((this.domAfter = document.createElement('div')),
                (this.domAfter.className = 'cm-gutters cm-gutters-after'),
                this.domAfter.setAttribute('aria-hidden', 'true'),
                (this.domAfter.style.minHeight =
                  this.view.contentHeight / this.view.scaleY + 'px'),
                (this.domAfter.style.position = this.fixed ? 'sticky' : ''),
                this.view.scrollDOM.appendChild(this.domAfter)),
              this.domAfter
            );
          }
          update(t) {
            if (this.updateGutters(t)) {
              let e = this.prevViewport,
                i = t.view.viewport,
                s = Math.min(e.to, i.to) - Math.max(e.from, i.from);
              this.syncGutters(s < (i.to - i.from) * 0.8);
            }
            if (t.geometryChanged) {
              let t = this.view.contentHeight / this.view.scaleY + 'px';
              ((this.dom.style.minHeight = t),
                this.domAfter && (this.domAfter.style.minHeight = t));
            }
            (this.view.state.facet(iL) != !this.fixed &&
              ((this.fixed = !this.fixed),
              (this.dom.style.position = this.fixed ? 'sticky' : ''),
              this.domAfter &&
                (this.domAfter.style.position = this.fixed ? 'sticky' : '')),
              (this.prevViewport = t.view.viewport));
          }
          syncGutters(t) {
            let e = this.dom.nextSibling;
            t && (this.dom.remove(), this.domAfter && this.domAfter.remove());
            let i = l.om.iter(
                this.view.state.facet(iE),
                this.view.viewport.from
              ),
              s = [],
              o = this.gutters.map(
                t =>
                  new UpdateContext(
                    t,
                    this.view.viewport,
                    -this.view.documentPadding.top
                  )
              );
            for (let t of this.view.viewportLineBlocks)
              if ((s.length && (s = []), Array.isArray(t.type))) {
                let e = !0;
                for (let n of t.type)
                  if (n.type == T.Text && e) {
                    for (let t of (iP(i, s, n.from), o))
                      t.line(this.view, n, s);
                    e = !1;
                  } else if (n.widget) for (let t of o) t.widget(this.view, n);
              } else if (t.type == T.Text)
                for (let e of (iP(i, s, t.from), o)) e.line(this.view, t, s);
              else if (t.widget) for (let e of o) e.widget(this.view, t);
            for (let t of o) t.finish();
            t &&
              (this.view.scrollDOM.insertBefore(this.dom, e),
              this.domAfter && this.view.scrollDOM.appendChild(this.domAfter));
          }
          updateGutters(t) {
            let e = t.startState.facet(iH),
              i = t.state.facet(iH),
              s =
                t.docChanged ||
                t.heightChanged ||
                t.viewportChanged ||
                !l.om.eq(
                  t.startState.facet(iE),
                  t.state.facet(iE),
                  t.view.viewport.from,
                  t.view.viewport.to
                );
            if (e == i) for (let e of this.gutters) e.update(t) && (s = !0);
            else {
              s = !0;
              let o = [];
              for (let s of i) {
                let i = e.indexOf(s);
                i < 0
                  ? o.push(new SingleGutterView(this.view, s))
                  : (this.gutters[i].update(t), o.push(this.gutters[i]));
              }
              for (let t of this.gutters)
                (t.dom.remove(), 0 > o.indexOf(t) && t.destroy());
              for (let t of o)
                'after' == t.config.side
                  ? this.getDOMAfter().appendChild(t.dom)
                  : this.dom.appendChild(t.dom);
              this.gutters = o;
            }
            return s;
          }
          destroy() {
            for (let t of this.gutters) t.destroy();
            (this.dom.remove(), this.domAfter && this.domAfter.remove());
          }
        },
        {
          provide: t =>
            EditorView.scrollMargins.of(e => {
              let i = e.plugin(t);
              if (!i || 0 == i.gutters.length || !i.fixed) return null;
              let s = i.dom.offsetWidth * e.scaleX,
                o = i.domAfter ? i.domAfter.offsetWidth * e.scaleX : 0;
              return e.textDirection == U.LTR
                ? { left: s, right: o }
                : { right: s, left: o };
            })
        }
      );
    function iW(t) {
      return Array.isArray(t) ? t : [t];
    }
    function iP(t, e, i) {
      for (; t.value && t.from <= i;)
        (t.from == i && e.push(t.value), t.next());
    }
    let UpdateContext = class UpdateContext {
      constructor(t, e, i) {
        ((this.gutter = t),
          (this.height = i),
          (this.i = 0),
          (this.cursor = l.om.iter(t.markers, e.from)));
      }
      addElement(t, e, i) {
        let { gutter: s } = this,
          o = (e.top - this.height) / t.scaleY,
          n = e.height / t.scaleY;
        if (this.i == s.elements.length) {
          let e = new GutterElement(t, n, o, i);
          (s.elements.push(e), s.dom.appendChild(e.dom));
        } else s.elements[this.i].update(t, n, o, i);
        ((this.height = e.bottom), this.i++);
      }
      line(t, e, i) {
        let s = [];
        (iP(this.cursor, s, e.from), i.length && (s = s.concat(i)));
        let o = this.gutter.config.lineMarker(t, e, s);
        o && s.unshift(o);
        let n = this.gutter;
        (0 != s.length || n.config.renderEmptyElements) &&
          this.addElement(t, e, s);
      }
      widget(t, e) {
        let i = this.gutter.config.widgetMarker(t, e.widget, e),
          s = i ? [i] : null;
        for (let i of t.state.facet(iR)) {
          let o = i(t, e.widget, e);
          o && (s || (s = [])).push(o);
        }
        s && this.addElement(t, e, s);
      }
      finish() {
        let t = this.gutter;
        for (; t.elements.length > this.i;) {
          let e = t.elements.pop();
          (t.dom.removeChild(e.dom), e.destroy());
        }
      }
    };
    let SingleGutterView = class SingleGutterView {
      constructor(t, e) {
        for (let i in ((this.view = t),
        (this.config = e),
        (this.elements = []),
        (this.spacer = null),
        (this.dom = document.createElement('div')),
        (this.dom.className =
          'cm-gutter' + (this.config.class ? ' ' + this.config.class : '')),
        e.domEventHandlers))
          this.dom.addEventListener(i, s => {
            let o = s.target,
              n;
            if (o != this.dom && this.dom.contains(o)) {
              for (; o.parentNode != this.dom;) o = o.parentNode;
              let t = o.getBoundingClientRect();
              n = (t.top + t.bottom) / 2;
            } else n = s.clientY;
            let r = t.lineBlockAtHeight(n - t.documentTop);
            e.domEventHandlers[i](t, r, s) && s.preventDefault();
          });
        ((this.markers = iW(e.markers(t))),
          e.initialSpacer &&
            ((this.spacer = new GutterElement(t, 0, 0, [e.initialSpacer(t)])),
            this.dom.appendChild(this.spacer.dom),
            (this.spacer.dom.style.cssText +=
              'visibility: hidden; pointer-events: none')));
      }
      update(t) {
        let e = this.markers;
        if (
          ((this.markers = iW(this.config.markers(t.view))),
          this.spacer && this.config.updateSpacer)
        ) {
          let e = this.config.updateSpacer(this.spacer.markers[0], t);
          e != this.spacer.markers[0] && this.spacer.update(t.view, 0, 0, [e]);
        }
        let i = t.view.viewport;
        return (
          !l.om.eq(this.markers, e, i.from, i.to) ||
          (!!this.config.lineMarkerChange && this.config.lineMarkerChange(t))
        );
      }
      destroy() {
        for (let t of this.elements) t.destroy();
      }
    };
    let GutterElement = class GutterElement {
      constructor(t, e, i, s) {
        ((this.height = -1),
          (this.above = 0),
          (this.markers = []),
          (this.dom = document.createElement('div')),
          (this.dom.className = 'cm-gutterElement'),
          this.update(t, e, i, s));
      }
      update(t, e, i, s) {
        (this.height != e &&
          ((this.height = e), (this.dom.style.height = e + 'px')),
          this.above != i &&
            (this.dom.style.marginTop = (this.above = i) ? i + 'px' : ''),
          !(function (t, e) {
            if (t.length != e.length) return !1;
            for (let i = 0; i < t.length; i++)
              if (!t[i].compare(e[i])) return !1;
            return !0;
          })(this.markers, s) && this.setMarkers(t, s));
      }
      setMarkers(t, e) {
        let i = 'cm-gutterElement',
          s = this.dom.firstChild;
        for (let o = 0, n = 0; ;) {
          let r = n,
            l = o < e.length ? e[o++] : null,
            a = !1;
          if (l) {
            let t = l.elementClass;
            t && (i += ' ' + t);
            for (let t = n; t < this.markers.length; t++)
              if (this.markers[t].compare(l)) {
                ((r = t), (a = !0));
                break;
              }
          } else r = this.markers.length;
          for (; n < r;) {
            let t = this.markers[n++];
            if (t.toDOM) {
              t.destroy(s);
              let e = s.nextSibling;
              (s.remove(), (s = e));
            }
          }
          if (!l) break;
          (l.toDOM &&
            (a ? (s = s.nextSibling) : this.dom.insertBefore(l.toDOM(t), s)),
            a && n++);
        }
        ((this.dom.className = i), (this.markers = e));
      }
      destroy() {
        this.setMarkers(null, []);
      }
    };
    let iN = l.sj.define(),
      iF = l.sj.define(),
      iI = l.sj.define({
        combine: t =>
          (0, l.QR)(
            t,
            { formatNumber: String, domEventHandlers: {} },
            {
              domEventHandlers(t, e) {
                let i = Object.assign({}, t);
                for (let t in e) {
                  let s = i[t],
                    o = e[t];
                  i[t] = s ? (t, e, i) => s(t, e, i) || o(t, e, i) : o;
                }
                return i;
              }
            }
          )
      });
    let NumberMarker = class NumberMarker extends GutterMarker {
      constructor(t) {
        (super(), (this.number = t));
      }
      eq(t) {
        return this.number == t.number;
      }
      toDOM() {
        return document.createTextNode(this.number);
      }
    };
    function iz(t, e) {
      return t.state.facet(iI).formatNumber(e, t.state);
    }
    let iK = iH.compute([iI], t => ({
      class: 'cm-lineNumbers',
      renderEmptyElements: !1,
      markers: t => t.state.facet(iN),
      lineMarker: (t, e, i) =>
        i.some(t => t.toDOM)
          ? null
          : new NumberMarker(iz(t, t.state.doc.lineAt(e.from).number)),
      widgetMarker: (t, e, i) => {
        for (let s of t.state.facet(iF)) {
          let o = s(t, e, i);
          if (o) return o;
        }
        return null;
      },
      lineMarkerChange: t => t.startState.facet(iI) != t.state.facet(iI),
      initialSpacer: t => new NumberMarker(iz(t, iq(t.state.doc.lines))),
      updateSpacer(t, e) {
        let i = iz(e.view, iq(e.view.state.doc.lines));
        return i == t.number ? t : new NumberMarker(i);
      },
      domEventHandlers: t.facet(iI).domEventHandlers,
      side: 'before'
    }));
    function iG(t = {}) {
      return [iI.of(t), [iV], iK];
    }
    function iq(t) {
      let e = 9;
      for (; e < t;) e = 10 * e + 9;
      return e;
    }
    i.d(
      e,
      {
        $K: () => iG,
        Eg: () => ik,
        Lz: () => EditorView,
        N$: () => is,
        NZ: () => Decoration,
        OP: () => U,
        Ux: () => iM,
        VH: () => e0,
        Z9: () => ViewPlugin,
        ab: () => iS,
        c_: () => tS,
        dz: () => ir,
        ld: () => iA,
        wJ: () => GutterMarker,
        xO: () => WidgetType
      },
      { DK: iv, S7: iB, w4: ej }
    );
  }
};
//# sourceMappingURL=6216.84a6436aae7019df.js.map
