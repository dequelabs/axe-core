/*! LICENSE: 4585.c86502bf8c0611c2.js.LICENSE.txt */
export const __rspack_esm_id = 4585;
export const __rspack_esm_ids = [4585];
export const __webpack_modules__ = {
  98821(t, r, n) {
    var s = n(36752);
    let a = null,
      o = {
        boundAttributeSuffix: s.ge.M,
        marker: s.ge.P,
        markerMatch: s.ge.A,
        HTML_RESULT: s.ge.C,
        getTemplateHtml: s.ge.L,
        overrideDirectiveResolve: (t, r) =>
          class extends t {
            _$AS(t, n) {
              return r(this, n);
            }
          },
        patchDirectiveResolve: (t, r) => {
          if (t.prototype._$AS.name !== r.name) {
            a ??= t.prototype._$AS.name;
            for (
              let n = t.prototype;
              n !== Object.prototype;
              n = Object.getPrototypeOf(n)
            )
              if (n.hasOwnProperty(a)) return void (n[a] = r);
            throw Error(
              'Internal error: It is possible that both dev mode and production mode Lit was mixed together during SSR. Please comment on the issue: https://github.com/lit/lit/issues/4527'
            );
          }
        },
        setDirectiveClass(t, r) {
          t._$litDirective$ = r;
        },
        getAttributePartCommittedValue: (t, r, n) => {
          let a = s.c0;
          return ((t.j = t => (a = t)), t._$AI(r, t, n), a);
        },
        connectedDisconnectable: t => ({ ...t, _$AU: !0 }),
        resolveDirective: s.ge.V,
        AttributePart: s.ge.H,
        PropertyPart: s.ge.B,
        BooleanAttributePart: s.ge.N,
        EventPart: s.ge.U,
        ElementPart: s.ge.F,
        TemplateInstance: s.ge.R,
        isIterable: s.ge.D,
        ChildPart: s.ge.I
      };
    var l = n(7804),
      c = n(18504);
    let {
        TemplateInstance: d,
        isIterable: u,
        resolveDirective: h,
        ChildPart: p,
        ElementPart: g
      } = o,
      f = (t, r, n, a) => {
        let o, l;
        if (0 === n.length) ((l = new p(r, null, void 0, a)), (o = t));
        else {
          let t = n[n.length - 1];
          if ('template-instance' === t.type)
            ((l = new p(r, null, t.instance, a)),
              t.instance._$AV.push(l),
              (o = t.result.values[t.instancePartIndex++]),
              t.templatePartIndex++);
          else if ('iterable' === t.type) {
            l = new p(r, null, t.part, a);
            let n = t.iterator.next();
            if (n.done)
              throw (
                (o = void 0),
                (t.done = !0),
                Error('Unhandled shorter than expected iterable')
              );
            ((o = n.value), t.part._$AH.push(l));
          } else l = new p(r, null, t.part, a);
        }
        if ((o = h(l, o)) === s.c0) n.push({ part: l, type: 'leaf' });
        else if ((0, c.sO)(o))
          (n.push({ part: l, type: 'leaf' }), (l._$AH = o));
        else if ((0, c.qb)(o)) {
          if ((0, c.ps)(o)) throw Error('compiled templates are not supported');
          let t = 'lit-part ' + w(o);
          if (r.data !== t)
            throw Error(
              'Hydration value mismatch: Unexpected TemplateResult rendered to part'
            );
          {
            let t = new d(p.prototype._$AC(o), l);
            (n.push({
              type: 'template-instance',
              instance: t,
              part: l,
              templatePartIndex: 0,
              instancePartIndex: 0,
              result: o
            }),
              (l._$AH = t));
          }
        } else
          u(o)
            ? (n.push({
                part: l,
                type: 'iterable',
                value: o,
                iterator: o[Symbol.iterator](),
                done: !1
              }),
              (l._$AH = []))
            : (n.push({ part: l, type: 'leaf' }), (l._$AH = o ?? ''));
        return l;
      },
      m = (t, r, n) => {
        if (void 0 === r) throw Error('unbalanced part marker');
        r._$AB = t;
        let s = n.pop();
        if ('iterable' === s.type && !s.iterator.next().done)
          throw Error('unexpected longer than expected iterable');
        if (n.length > 0) return n[n.length - 1].part;
      },
      b = (t, r, n) => {
        let s = parseInt(/lit-node (\d+)/.exec(t.data)[1]),
          a = t.nextElementSibling;
        if (null === a) throw Error('could not find node for attribute parts');
        a.removeAttribute('defer-hydration');
        let o = r[r.length - 1];
        if ('template-instance' !== o.type)
          throw Error(
            'Hydration value mismatch: Primitive found where TemplateResult expected. This usually occurs due to conditional rendering that resulted in a different value or template being rendered between the server and client.'
          );
        {
          let t = o.instance;
          for (;;) {
            let r = t._$AD.parts[o.templatePartIndex];
            if (
              void 0 === r ||
              (r.type !== l.OA.ATTRIBUTE && r.type !== l.OA.ELEMENT) ||
              r.index !== s
            )
              break;
            if (r.type === l.OA.ATTRIBUTE) {
              let s = new r.ctor(a, r.name, r.strings, o.instance, n),
                d = (0, c.Rt)(s)
                  ? o.result.values[o.instancePartIndex]
                  : o.result.values,
                u = s.type !== l.OA.EVENT && s.type !== l.OA.PROPERTY;
              (s._$AI(d, s, o.instancePartIndex, u),
                (o.instancePartIndex += r.strings.length - 1),
                t._$AV.push(s));
            } else {
              let r = new g(a, o.instance, n);
              (h(r, o.result.values[o.instancePartIndex++]), t._$AV.push(r));
            }
            o.templatePartIndex++;
          }
        }
      },
      v = new WeakMap(),
      w = t => {
        let r = v.get(t.strings);
        if (void 0 !== r) return r;
        let n = new Uint32Array(2).fill(5381);
        for (let r of t.strings)
          for (let t = 0; t < r.length; t++)
            n[t % 2] = (33 * n[t % 2]) ^ r.charCodeAt(t);
        return (
          (r = btoa(String.fromCharCode(...new Uint8Array(n.buffer)))),
          v.set(t.strings, r),
          r
        );
      };
    globalThis.litElementHydrateSupport = ({ LitElement: t }) => {
      let r = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(t),
        'observedAttributes'
      ).get;
      Object.defineProperty(t, 'observedAttributes', {
        get() {
          return [...r.call(this), 'defer-hydration'];
        }
      });
      let n = t.prototype.attributeChangedCallback;
      t.prototype.attributeChangedCallback = function (t, r, s) {
        ('defer-hydration' === t && null === s && a.call(this),
          n.call(this, t, r, s));
      };
      let a = t.prototype.connectedCallback;
      t.prototype.connectedCallback = function () {
        this.hasAttribute('defer-hydration') || a.call(this);
      };
      let o = t.prototype.createRenderRoot;
      t.prototype.createRenderRoot = function () {
        return this.shadowRoot
          ? ((this._$AG = !0), this.shadowRoot)
          : o.call(this);
      };
      let l = Object.getPrototypeOf(t.prototype).update;
      t.prototype.update = function (t) {
        let r = this.render();
        if ((l.call(this, t), this._$AG)) {
          for (let t of ((this._$AG = !1), this.getAttributeNames()))
            if (t.startsWith('hydrate-internals-')) {
              let r = t.slice(18);
              (this.removeAttribute(r), this.removeAttribute(t));
            }
          ((t, r, n = {}) => {
            let s, a, o, l;
            if (void 0 !== r._$litPart$)
              throw Error('container already contains a live render');
            let c = [],
              d = document.createTreeWalker(r, NodeFilter.SHOW_COMMENT);
            for (; null !== (l = d.nextNode());) {
              let r = l.data;
              if (r.startsWith('lit-part')) {
                if (0 === c.length && void 0 !== s)
                  throw Error(
                    `There must be only one root part per container. Found a part marker (${l}) when we already have a root part marker (${a})`
                  );
                ((o = f(t, l, c, n)), void 0 === s && (s = o), (a ??= l));
              } else if (r.startsWith('lit-node')) b(l, c, n);
              else if (r.startsWith('/lit-part')) {
                if (1 === c.length && o !== s) throw Error('internal error');
                o = m(l, o, c);
              }
            }
            if (void 0 === s) {
              let t =
                r instanceof ShadowRoot
                  ? "{container.host.localName}'s shadow root"
                  : r instanceof DocumentFragment
                    ? 'DocumentFragment'
                    : r.localName;
              console.error(
                `There should be exactly one root part in a render container, but we didn't find any in ${t}.`
              );
            }
            r._$litPart$ = s;
          })(r, this.renderRoot, this.renderOptions);
        } else (0, s.XX)(r, this.renderRoot, this.renderOptions);
      };
    };
  },
  85675(t, r, n) {
    n.d(r, { mN: () => y, AH: () => c, Ec: () => E });
    let s = globalThis,
      a =
        s.ShadowRoot &&
        (void 0 === s.ShadyCSS || s.ShadyCSS.nativeShadow) &&
        'adoptedStyleSheets' in Document.prototype &&
        'replace' in CSSStyleSheet.prototype,
      o = Symbol(),
      l = new WeakMap();
    let css_tag_n = class css_tag_n {
      constructor(t, r, n) {
        if (((this._$cssResult$ = !0), n !== o))
          throw Error(
            'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
          );
        ((this.cssText = t), (this.t = r));
      }
      get styleSheet() {
        let t = this.o,
          r = this.t;
        if (a && void 0 === t) {
          let n = void 0 !== r && 1 === r.length;
          (n && (t = l.get(r)),
            void 0 === t &&
              ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
              n && l.set(r, t)));
        }
        return t;
      }
      toString() {
        return this.cssText;
      }
    };
    let c = (t, ...r) =>
        new css_tag_n(
          1 === t.length
            ? t[0]
            : r.reduce(
                (r, n, s) =>
                  r +
                  (t => {
                    if (!0 === t._$cssResult$) return t.cssText;
                    if ('number' == typeof t) return t;
                    throw Error(
                      "Value passed to 'css' function must be a 'css' function result: " +
                        t +
                        ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                    );
                  })(n) +
                  t[s + 1],
                t[0]
              ),
          t,
          o
        ),
      d = a
        ? t => t
        : t =>
            t instanceof CSSStyleSheet
              ? (t => {
                  let r,
                    n = '';
                  for (let r of t.cssRules) n += r.cssText;
                  return new css_tag_n(
                    'string' == typeof (r = n) ? r : r + '',
                    void 0,
                    o
                  );
                })(t)
              : t,
      {
        is: u,
        defineProperty: h,
        getOwnPropertyDescriptor: p,
        getOwnPropertyNames: g,
        getOwnPropertySymbols: f,
        getPrototypeOf: m
      } = Object,
      b = globalThis,
      v = b.trustedTypes,
      w = v ? v.emptyScript : '',
      $ = b.reactiveElementPolyfillSupport,
      _ = {
        toAttribute(t, r) {
          switch (r) {
            case Boolean:
              t = t ? w : null;
              break;
            case Object:
            case Array:
              t = null == t ? t : JSON.stringify(t);
          }
          return t;
        },
        fromAttribute(t, r) {
          let n = t;
          switch (r) {
            case Boolean:
              n = null !== t;
              break;
            case Number:
              n = null === t ? null : Number(t);
              break;
            case Object:
            case Array:
              try {
                n = JSON.parse(t);
              } catch (t) {
                n = null;
              }
          }
          return n;
        }
      },
      E = (t, r) => !u(t, r),
      A = {
        attribute: !0,
        type: String,
        converter: _,
        reflect: !1,
        useDefault: !1,
        hasChanged: E
      };
    ((Symbol.metadata ??= Symbol('metadata')),
      (b.litPropertyMetadata ??= new WeakMap()));
    let y = class y extends HTMLElement {
      static addInitializer(t) {
        (this._$Ei(), (this.l ??= []).push(t));
      }
      static get observedAttributes() {
        return (this.finalize(), this._$Eh && [...this._$Eh.keys()]);
      }
      static createProperty(t, r = A) {
        if (
          (r.state && (r.attribute = !1),
          this._$Ei(),
          this.prototype.hasOwnProperty(t) &&
            ((r = Object.create(r)).wrapped = !0),
          this.elementProperties.set(t, r),
          !r.noAccessor)
        ) {
          let n = Symbol(),
            s = this.getPropertyDescriptor(t, n, r);
          void 0 !== s && h(this.prototype, t, s);
        }
      }
      static getPropertyDescriptor(t, r, n) {
        let { get: s, set: a } = p(this.prototype, t) ?? {
          get() {
            return this[r];
          },
          set(t) {
            this[r] = t;
          }
        };
        return {
          get: s,
          set(r) {
            let o = s?.call(this);
            (a?.call(this, r), this.requestUpdate(t, o, n));
          },
          configurable: !0,
          enumerable: !0
        };
      }
      static getPropertyOptions(t) {
        return this.elementProperties.get(t) ?? A;
      }
      static _$Ei() {
        if (this.hasOwnProperty('elementProperties')) return;
        let t = m(this);
        (t.finalize(),
          void 0 !== t.l && (this.l = [...t.l]),
          (this.elementProperties = new Map(t.elementProperties)));
      }
      static finalize() {
        if (this.hasOwnProperty('finalized')) return;
        if (
          ((this.finalized = !0),
          this._$Ei(),
          this.hasOwnProperty('properties'))
        ) {
          let t = this.properties;
          for (let r of [...g(t), ...f(t)]) this.createProperty(r, t[r]);
        }
        let t = this[Symbol.metadata];
        if (null !== t) {
          let r = litPropertyMetadata.get(t);
          if (void 0 !== r)
            for (let [t, n] of r) this.elementProperties.set(t, n);
        }
        for (let [t, r] of ((this._$Eh = new Map()), this.elementProperties)) {
          let n = this._$Eu(t, r);
          void 0 !== n && this._$Eh.set(n, t);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
      }
      static finalizeStyles(t) {
        let r = [];
        if (Array.isArray(t))
          for (let n of new Set(t.flat(1 / 0).reverse())) r.unshift(d(n));
        else void 0 !== t && r.push(d(t));
        return r;
      }
      static _$Eu(t, r) {
        let n = r.attribute;
        return !1 === n
          ? void 0
          : 'string' == typeof n
            ? n
            : 'string' == typeof t
              ? t.toLowerCase()
              : void 0;
      }
      constructor() {
        (super(),
          (this._$Ep = void 0),
          (this.isUpdatePending = !1),
          (this.hasUpdated = !1),
          (this._$Em = null),
          this._$Ev());
      }
      _$Ev() {
        ((this._$ES = new Promise(t => (this.enableUpdating = t))),
          (this._$AL = new Map()),
          this._$E_(),
          this.requestUpdate(),
          this.constructor.l?.forEach(t => t(this)));
      }
      addController(t) {
        ((this._$EO ??= new Set()).add(t),
          void 0 !== this.renderRoot &&
            this.isConnected &&
            t.hostConnected?.());
      }
      removeController(t) {
        this._$EO?.delete(t);
      }
      _$E_() {
        let t = new Map();
        for (let r of this.constructor.elementProperties.keys())
          this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
        t.size > 0 && (this._$Ep = t);
      }
      createRenderRoot() {
        let t =
          this.shadowRoot ??
          this.attachShadow(this.constructor.shadowRootOptions);
        return (
          ((t, r) => {
            if (a)
              t.adoptedStyleSheets = r.map(t =>
                t instanceof CSSStyleSheet ? t : t.styleSheet
              );
            else
              for (let n of r) {
                let r = document.createElement('style'),
                  a = s.litNonce;
                (void 0 !== a && r.setAttribute('nonce', a),
                  (r.textContent = n.cssText),
                  t.appendChild(r));
              }
          })(t, this.constructor.elementStyles),
          t
        );
      }
      connectedCallback() {
        ((this.renderRoot ??= this.createRenderRoot()),
          this.enableUpdating(!0),
          this._$EO?.forEach(t => t.hostConnected?.()));
      }
      enableUpdating(t) {}
      disconnectedCallback() {
        this._$EO?.forEach(t => t.hostDisconnected?.());
      }
      attributeChangedCallback(t, r, n) {
        this._$AK(t, n);
      }
      _$ET(t, r) {
        let n = this.constructor.elementProperties.get(t),
          s = this.constructor._$Eu(t, n);
        if (void 0 !== s && !0 === n.reflect) {
          let a = (
            void 0 !== n.converter?.toAttribute ? n.converter : _
          ).toAttribute(r, n.type);
          ((this._$Em = t),
            null == a ? this.removeAttribute(s) : this.setAttribute(s, a),
            (this._$Em = null));
        }
      }
      _$AK(t, r) {
        let n = this.constructor,
          s = n._$Eh.get(t);
        if (void 0 !== s && this._$Em !== s) {
          let t = n.getPropertyOptions(s),
            a =
              'function' == typeof t.converter
                ? { fromAttribute: t.converter }
                : void 0 !== t.converter?.fromAttribute
                  ? t.converter
                  : _;
          ((this._$Em = s),
            (this[s] = a.fromAttribute(r, t.type) ?? this._$Ej?.get(s) ?? null),
            (this._$Em = null));
        }
      }
      requestUpdate(t, r, n) {
        if (void 0 !== t) {
          let s = this.constructor,
            a = this[t];
          if (!(
            ((n ??= s.getPropertyOptions(t)).hasChanged ?? E)(a, r) ||
            (n.useDefault &&
              n.reflect &&
              a === this._$Ej?.get(t) &&
              !this.hasAttribute(s._$Eu(t, n)))
          ))
            return;
          this.C(t, r, n);
        }
        !1 === this.isUpdatePending && (this._$ES = this._$EP());
      }
      C(t, r, { useDefault: n, reflect: s, wrapped: a }, o) {
        (n &&
          !(this._$Ej ??= new Map()).has(t) &&
          (this._$Ej.set(t, o ?? r ?? this[t]), !0 !== a || void 0 !== o)) ||
          (this._$AL.has(t) ||
            (this.hasUpdated || n || (r = void 0), this._$AL.set(t, r)),
          !0 === s && this._$Em !== t && (this._$Eq ??= new Set()).add(t));
      }
      async _$EP() {
        this.isUpdatePending = !0;
        try {
          await this._$ES;
        } catch (t) {
          Promise.reject(t);
        }
        let t = this.scheduleUpdate();
        return (null != t && (await t), !this.isUpdatePending);
      }
      scheduleUpdate() {
        return this.performUpdate();
      }
      performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
          if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
            for (let [t, r] of this._$Ep) this[t] = r;
            this._$Ep = void 0;
          }
          let t = this.constructor.elementProperties;
          if (t.size > 0)
            for (let [r, n] of t) {
              let { wrapped: t } = n,
                s = this[r];
              !0 !== t ||
                this._$AL.has(r) ||
                void 0 === s ||
                this.C(r, void 0, n, s);
            }
        }
        let t = !1,
          r = this._$AL;
        try {
          (t = this.shouldUpdate(r))
            ? (this.willUpdate(r),
              this._$EO?.forEach(t => t.hostUpdate?.()),
              this.update(r))
            : this._$EM();
        } catch (r) {
          throw ((t = !1), this._$EM(), r);
        }
        t && this._$AE(r);
      }
      willUpdate(t) {}
      _$AE(t) {
        (this._$EO?.forEach(t => t.hostUpdated?.()),
          this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
          this.updated(t));
      }
      _$EM() {
        ((this._$AL = new Map()), (this.isUpdatePending = !1));
      }
      get updateComplete() {
        return this.getUpdateComplete();
      }
      getUpdateComplete() {
        return this._$ES;
      }
      shouldUpdate(t) {
        return !0;
      }
      update(t) {
        ((this._$Eq &&= this._$Eq.forEach(t => this._$ET(t, this[t]))),
          this._$EM());
      }
      updated(t) {}
      firstUpdated(t) {}
    };
    ((y.elementStyles = []),
      (y.shadowRootOptions = { mode: 'open' }),
      (y.elementProperties = new Map()),
      (y.finalized = new Map()),
      $?.({ ReactiveElement: y }),
      (b.reactiveElementVersions ??= []).push('2.1.0'));
  },
  36085(t, r, n) {
    n.d(r, { YZ: () => task_h });
    var s = n(85675);
    let a = Symbol();
    let task_h = class task_h {
      get taskComplete() {
        return (
          this.t ||
            (1 === this.i
              ? (this.t = new Promise((t, r) => {
                  ((this.o = t), (this.h = r));
                }))
              : 3 === this.i
                ? (this.t = Promise.reject(this.l))
                : (this.t = Promise.resolve(this.u))),
          this.t
        );
      }
      constructor(t, r, n) {
        ((this.p = 0), (this.i = 0), (this._ = t).addController(this));
        let s = 'object' == typeof r ? r : { task: r, args: n };
        ((this.v = s.task),
          (this.j = s.args),
          (this.m = s.argsEqual ?? o),
          (this.k = s.onComplete),
          (this.A = s.onError),
          (this.autoRun = s.autoRun ?? !0),
          'initialValue' in s &&
            ((this.u = s.initialValue), (this.i = 2), (this.O = this.T?.())));
      }
      hostUpdate() {
        !0 === this.autoRun && this.S();
      }
      hostUpdated() {
        'afterUpdate' === this.autoRun && this.S();
      }
      T() {
        if (void 0 === this.j) return;
        let t = this.j();
        if (!Array.isArray(t))
          throw Error('The args function must return an array');
        return t;
      }
      async S() {
        let t = this.T(),
          r = this.O;
        ((this.O = t),
          t === r ||
            void 0 === t ||
            (void 0 !== r && this.m(r, t)) ||
            (await this.run(t)));
      }
      async run(t) {
        let r, n;
        ((t ??= this.T()),
          (this.O = t),
          1 === this.i
            ? this.q?.abort()
            : ((this.t = void 0), (this.o = void 0), (this.h = void 0)),
          (this.i = 1),
          'afterUpdate' === this.autoRun
            ? queueMicrotask(() => this._.requestUpdate())
            : this._.requestUpdate());
        let s = ++this.p;
        this.q = new AbortController();
        let o = !1;
        try {
          r = await this.v(t, { signal: this.q.signal });
        } catch (t) {
          ((o = !0), (n = t));
        }
        if (this.p === s) {
          if (r === a) this.i = 0;
          else {
            if (!1 === o) {
              try {
                this.k?.(r);
              } catch {}
              ((this.i = 2), this.o?.(r));
            } else {
              try {
                this.A?.(n);
              } catch {}
              ((this.i = 3), this.h?.(n));
            }
            ((this.u = r), (this.l = n));
          }
          this._.requestUpdate();
        }
      }
      abort(t) {
        1 === this.i && this.q?.abort(t);
      }
      get value() {
        return this.u;
      }
      get error() {
        return this.l;
      }
      get status() {
        return this.i;
      }
      render(t) {
        switch (this.i) {
          case 0:
            return t.initial?.();
          case 1:
            return t.pending?.();
          case 2:
            return t.complete?.(this.value);
          case 3:
            return t.error?.(this.error);
          default:
            throw Error('Unexpected status: ' + this.i);
        }
      }
    };
    let o = (t, r) =>
      t === r ||
      (t.length === r.length && t.every((t, n) => !(0, s.Ec)(t, r[n])));
  },
  30994(t, r, n) {
    let s = '#glean_reference_time',
      a = '#glean_execution_counter',
      o = [a, s];
    n.d(
      r,
      {},
      {
        Gh: 'https://incoming.telemetry.mozilla.org',
        HT: a,
        Kp: 'c0ffeec0-ffee-c0ff-eec0-ffeec0ffeec0',
        OM: 'deletion-request',
        Tg: o,
        Tv: 'glean_client_info',
        cp: 'glean_ping_info',
        zh: s
      }
    );
  },
  27604(t, r, n) {
    var s = n(80849);
    let a = 'core.Context';
    let Context = class Context {
      constructor() {
        ((this.initialized = !1),
          (this.testing = !1),
          (this.supportedMetrics = {}),
          (this.startTime = new Date()));
      }
      static get instance() {
        return (
          Context._instance || (Context._instance = new Context()),
          Context._instance
        );
      }
      static testUninitialize() {
        Context._instance = void 0;
      }
      static get uploadEnabled() {
        return (
          void 0 === Context.instance.uploadEnabled &&
            (0, s.A)(
              a,
              [
                'Attempted to access Context.uploadEnabled before it was set. This may cause unexpected behaviour.'
              ],
              s.q.Trace
            ),
          Context.instance.uploadEnabled
        );
      }
      static set uploadEnabled(t) {
        Context.instance.uploadEnabled = t;
      }
      static get metricsDatabase() {
        return (
          void 0 === Context.instance.metricsDatabase &&
            (0, s.A)(
              a,
              [
                'Attempted to access Context.metricsDatabase before it was set. This may cause unexpected behaviour.'
              ],
              s.q.Trace
            ),
          Context.instance.metricsDatabase
        );
      }
      static set metricsDatabase(t) {
        Context.instance.metricsDatabase = t;
      }
      static get eventsDatabase() {
        return (
          void 0 === Context.instance.eventsDatabase &&
            (0, s.A)(
              a,
              [
                'Attempted to access Context.eventsDatabase before it was set. This may cause unexpected behaviour.'
              ],
              s.q.Trace
            ),
          Context.instance.eventsDatabase
        );
      }
      static set eventsDatabase(t) {
        Context.instance.eventsDatabase = t;
      }
      static get pingsDatabase() {
        return (
          void 0 === Context.instance.pingsDatabase &&
            (0, s.A)(
              a,
              [
                'Attempted to access Context.pingsDatabase before it was set. This may cause unexpected behaviour.'
              ],
              s.q.Trace
            ),
          Context.instance.pingsDatabase
        );
      }
      static set pingsDatabase(t) {
        Context.instance.pingsDatabase = t;
      }
      static get errorManager() {
        return (
          void 0 === Context.instance.errorManager &&
            (0, s.A)(
              a,
              [
                'Attempted to access Context.errorManager before it was set. This may cause unexpected behaviour.'
              ],
              s.q.Trace
            ),
          Context.instance.errorManager
        );
      }
      static set errorManager(t) {
        Context.instance.errorManager = t;
      }
      static get applicationId() {
        return (
          void 0 === Context.instance.applicationId &&
            (0, s.A)(
              a,
              [
                'Attempted to access Context.applicationId before it was set. This may cause unexpected behaviour.'
              ],
              s.q.Trace
            ),
          Context.instance.applicationId
        );
      }
      static set applicationId(t) {
        Context.instance.applicationId = t;
      }
      static get initialized() {
        return Context.instance.initialized;
      }
      static set initialized(t) {
        Context.instance.initialized = t;
      }
      static get config() {
        return (
          void 0 === Context.instance.config &&
            (0, s.A)(
              a,
              [
                'Attempted to access Context.config before it was set. This may cause unexpected behaviour.'
              ],
              s.q.Trace
            ),
          Context.instance.config
        );
      }
      static set config(t) {
        Context.instance.config = t;
      }
      static get startTime() {
        return Context.instance.startTime;
      }
      static get testing() {
        return Context.instance.testing;
      }
      static set testing(t) {
        Context.instance.testing = t;
      }
      static get corePings() {
        return Context.instance.corePings;
      }
      static set corePings(t) {
        Context.instance.corePings = t;
      }
      static get coreMetrics() {
        return Context.instance.coreMetrics;
      }
      static set coreMetrics(t) {
        Context.instance.coreMetrics = t;
      }
      static set platform(t) {
        Context.instance.platform = t;
      }
      static get platform() {
        return (
          void 0 === Context.instance.platform &&
            (0, s.A)(
              a,
              [
                'Attempted to access Context.platform before it was set. This may cause unexpected behaviour.'
              ],
              s.q.Trace
            ),
          Context.instance.platform
        );
      }
      static isPlatformSet() {
        return !!Context.instance.platform;
      }
      static getSupportedMetric(t) {
        return Context.instance.supportedMetrics[t];
      }
      static addSupportedMetric(t, r) {
        t in Context.instance.supportedMetrics ||
          (Context.instance.supportedMetrics[t] = r);
      }
    };
    n.d(r, { o: () => Context });
  },
  40351(t, r, n) {
    var s, a;
    (((a = s || (s = {})).InvalidValue = 'invalid_value'),
      (a.InvalidLabel = 'invalid_label'),
      (a.InvalidState = 'invalid_state'),
      (a.InvalidOverflow = 'invalid_overflow'),
      (a.InvalidType = 'invalid_type'),
      n.d(r, { B: () => s }));
  },
  34388(t, r, n) {
    var s,
      a = n(27604),
      o = n(87484),
      l = n(67867),
      c = n(80849);
    let d = 'core.glean_metrics';
    var u = s || (s = {});
    let h = {
      pageLoad: new l.A(
        {
          category: 'glean',
          name: 'page_load',
          sendInPings: ['events'],
          lifetime: 'ping',
          disabled: !1
        },
        ['url', 'referrer', 'title']
      ),
      elementClick: new l.A(
        {
          category: 'glean',
          name: 'element_click',
          sendInPings: ['events'],
          lifetime: 'ping',
          disabled: !1
        },
        ['id', 'type', 'label', 'url', 'referrer', 'title']
      ),
      pageId: new o.Ay({
        category: 'glean',
        name: 'page_id',
        sendInPings: ['events'],
        lifetime: 'application',
        disabled: !1
      })
    };
    function p(t) {
      a.o.initialized
        ? h.elementClick.record(t)
        : (0, c.A)(
            d,
            'Attempted to record element click event before Glean was initialized. This is a no-op.',
            c.q.Warn
          );
    }
    ((u.pageLoad = function (t) {
      var r, n, s;
      a.o.initialized
        ? (h.pageId.generateAndSet(),
          h.pageLoad.record({
            url:
              null != (r = null == t ? void 0 : t.url)
                ? r
                : 'u' > typeof window
                  ? window.location.href
                  : 'URL_NOT_PROVIDED_OR_AVAILABLE',
            referrer:
              null != (n = null == t ? void 0 : t.referrer)
                ? n
                : 'u' > typeof document
                  ? document.referrer
                  : 'REFERRER_NOT_PROVIDED_OR_AVAILABLE',
            title:
              null != (s = null == t ? void 0 : t.title)
                ? s
                : 'u' > typeof document
                  ? document.title
                  : 'TITLE_NOT_PROVIDED_OR_AVAILABLE'
          }))
        : (0, c.A)(
            d,
            'Attempted to record a page load event before Glean was initialized. This is a no-op.',
            c.q.Warn
          );
    }),
      (u.handleClickEvent = function (t) {
        let r,
          n = t.target.closest(
            '[data-glean-id], [data-glean-type], [data-glean-label]'
          );
        n &&
          p({
            ...((r = n.dataset).gleanId && { id: r.gleanId }),
            ...(r.gleanType && { type: r.gleanType }),
            ...(r.gleanLabel && { label: r.gleanLabel }),
            url:
              'u' > typeof window
                ? window.location.href
                : 'URL_NOT_PROVIDED_OR_AVAILABLE',
            referrer:
              'u' > typeof document
                ? document.referrer
                : 'REFERRER_NOT_PROVIDED_OR_AVAILABLE',
            title:
              'u' > typeof document
                ? document.title
                : 'TITLE_NOT_PROVIDED_OR_AVAILABLE'
          });
      }),
      (u.recordElementClick = p));
    let g = s;
    n.d(r, {}, { A: g });
  },
  80849(t, r, n) {
    var s, a;
    function o(t, r, n = s.Debug) {
      let a = `(Glean.${t})`;
      Array.isArray(r) ? console[n](a, ...r) : console[n](a, r);
    }
    (((a = s || (s = {})).Debug = 'debug'),
      (a.Info = 'info'),
      (a.Warn = 'warn'),
      (a.Error = 'error'),
      (a.Trace = 'trace'),
      n.d(r, { A: () => o, q: () => s }));
  },
  82006(t, r, n) {
    var s = n(30994),
      a = n(36074),
      o = n(88729),
      l = n(25740);
    let RecordedEvent = class RecordedEvent extends o.JW {
      constructor(t) {
        super(t);
      }
      static withTransformedExtras(t, r) {
        let n = r(t.extra || {});
        return {
          category: t.category,
          name: t.name,
          timestamp: t.timestamp,
          extra: n && Object.keys(n).length > 0 ? n : void 0
        };
      }
      addExtra(t, r) {
        (this.inner.extra || (this.inner.extra = {}),
          (this.inner.extra[t] = r));
      }
      withoutReservedExtras() {
        return RecordedEvent.withTransformedExtras(this.get(), t =>
          Object.keys(t)
            .filter(t => !s.Tg.includes(t))
            .reduce((r, n) => ((r[n] = t[n]), r), {})
        );
      }
      validate(t) {
        if (!(0, a.Gv)(t))
          return {
            type: o.iF.Error,
            errorMessage: `Expected Glean event object, got ${typeof t}`
          };
        let r = 'category' in t && (0, a.Kg)(t.category),
          n = 'name' in t && (0, a.Kg)(t.name);
        if (!r || !n)
          return {
            type: o.iF.Error,
            errorMessage: `Unexpected value for "category" or "name" in event object: ${JSON.stringify(t)}`
          };
        if (!('timestamp' in t && (0, a.Fq)(t.timestamp) && t.timestamp >= 0))
          return {
            type: o.iF.Error,
            errorMessage: `Event timestamp must be a positive integer, got ${JSON.stringify(t)}`
          };
        if (t.extra) {
          if (!(0, a.Gv)(t.extra))
            return {
              type: o.iF.Error,
              errorMessage: `Expected Glean extras object, got ${typeof t}`
            };
          for (let [r, n] of Object.entries(t.extra)) {
            let t = (0, l.oI)(r);
            if (t.type === o.iF.Error) return t;
            if (!(0, a.Kg)(n) && !(0, a.Et)(n) && !(0, a.Lm)(n))
              return {
                type: o.iF.Error,
                errorMessage: `Unexpected value for extra key ${r}: ${JSON.stringify(n)}`
              };
          }
        }
        return { type: o.iF.Success };
      }
      payload() {
        return RecordedEvent.withTransformedExtras(
          this.withoutReservedExtras(),
          t =>
            Object.keys(t).reduce((r, n) => ((r[n] = t[n].toString()), r), {})
        );
      }
    };
    n.d(r, { j: () => RecordedEvent });
  },
  62209(t, r, n) {
    var s = n(27604),
      a = n(36074),
      o = n(84592);
    let MetricType = class MetricType {
      constructor(t, r, n) {
        (n && s.o.addSupportedMetric(t, n),
          (this.type = t),
          (this.name = r.name),
          (this.category = r.category),
          (this.sendInPings = r.sendInPings),
          (this.lifetime = r.lifetime),
          (this.disabled = r.disabled),
          (this.dynamicLabel = r.dynamicLabel));
      }
      baseIdentifier() {
        return this.category.length > 0
          ? `${this.category}.${this.name}`
          : this.name;
      }
      identifier() {
        let t = this.baseIdentifier();
        return (0, a.b0)(this.dynamicLabel) ? t : (0, o.cW)(this);
      }
      shouldRecord(t) {
        return t && !this.disabled;
      }
      testGetNumRecordedErrors(t, r = this.sendInPings[0]) {
        return (0, a.xU)('testGetNumRecordedErrors')
          ? s.o.errorManager.testGetNumRecordedErrors(this, t, r)
          : 0;
      }
    };
    n.d(r, { v: () => MetricType });
  },
  88729(t, r, n) {
    var s,
      a,
      o = n(27604),
      l = n(40351);
    (((s = a || (a = {}))[(s.Success = 0)] = 'Success'),
      (s[(s.Error = 1)] = 'Error'));
    let MetricValidationError = class MetricValidationError extends Error {
      constructor(t, r = l.B.InvalidType) {
        (super(t), (this.type = r), (this.name = 'MetricValidationError'));
      }
      recordError(t) {
        o.o.errorManager.record(t, this.type, this.message);
      }
    };
    let Metric = class Metric {
      constructor(t) {
        this.inner = this.validateOrThrow(t);
      }
      get() {
        return this.inner;
      }
      set(t) {
        this.inner = t;
      }
      validateOrThrow(t) {
        let r = this.validate(t);
        if (r.type === a.Error)
          throw new MetricValidationError(r.errorMessage, r.errorType);
        return t;
      }
    };
    n.d(r, { JW: () => Metric, c1: () => MetricValidationError, iF: () => a });
  },
  67867(t, r, n) {
    var s,
      a = n(82006),
      o = n(62209),
      l = n(36074),
      c = n(27604),
      d = n(40351),
      u = n(88729),
      h = function (t, r, n, s, a) {
        if ('m' === s) throw TypeError('Private method is not writable');
        if ('a' === s && !a)
          throw TypeError('Private accessor was defined without a setter');
        if ('function' == typeof r ? t !== r || !a : !r.has(t))
          throw TypeError(
            'Cannot write private member to an object whose class did not declare it'
          );
        return ('a' === s ? a.call(t, n) : a ? (a.value = n) : r.set(t, n), n);
      },
      p = function (t, r, n, s) {
        if ('a' === n && !s)
          throw TypeError('Private accessor was defined without a getter');
        if ('function' == typeof r ? t !== r || !s : !r.has(t))
          throw TypeError(
            'Cannot read private member from an object whose class did not declare it'
          );
        return 'm' === n ? s : 'a' === n ? s.call(t) : s ? s.value : r.get(t);
      };
    let InternalEventMetricType = class InternalEventMetricType extends o.v {
      constructor(t, r) {
        (super('event', t), (this.allowedExtraKeys = r));
      }
      record(t, r = (0, l.bQ)()) {
        if (!this.shouldRecord(c.o.uploadEnabled)) return;
        let n = Date.now();
        try {
          let s = new a.j({
              category: this.category,
              name: this.name,
              timestamp: r,
              extra: t
            }),
            o = {};
          if (t && this.allowedExtraKeys)
            for (let [r, n] of Object.entries(t))
              if (this.allowedExtraKeys.includes(r))
                (0, l.Kg)(n) ? (o[r] = (0, l.Wl)(this, n, 500)) : (o[r] = n);
              else {
                c.o.errorManager.record(
                  this,
                  d.B.InvalidValue,
                  `Invalid key index: ${r}`
                );
                continue;
              }
          ((o.glean_timestamp = n.toString()),
            s.set({ ...s.get(), extra: o }),
            c.o.eventsDatabase.record(this, s));
        } catch (t) {
          t instanceof u.c1 && t.recordError(this);
        }
      }
      testGetValue(t = this.sendInPings[0]) {
        if ((0, l.xU)('testGetValue', 'core.metrics.EventMetricType')) {
          let r = c.o.eventsDatabase.getEvents(t, this);
          return (
            r &&
              r.forEach(t => {
                t.extra &&
                  (delete t.extra.glean_timestamp,
                  0 == Object.keys(t.extra).length && (t.extra = void 0));
              }),
            r
          );
        }
      }
    };
    let EventMetricType = class EventMetricType {
      constructor(t, r) {
        (s.set(this, void 0),
          h(this, s, new InternalEventMetricType(t, r), 'f'));
      }
      record(t) {
        p(this, s, 'f').record(t);
      }
      testGetValue(t = p(this, s, 'f').sendInPings[0]) {
        return p(this, s, 'f').testGetValue(t);
      }
      testGetNumRecordedErrors(t, r = p(this, s, 'f').sendInPings[0]) {
        return p(this, s, 'f').testGetNumRecordedErrors(t, r);
      }
    };
    ((s = new WeakMap()),
      n.d(r, { A: () => EventMetricType, C: () => InternalEventMetricType }));
  },
  84592(t, r, n) {
    var s = n(88729),
      a = n(27604),
      o = n(40351);
    let LabeledMetric = class LabeledMetric extends s.JW {
      constructor(t) {
        super(t);
      }
      validate(t) {
        return { type: s.iF.Success };
      }
      payload() {
        return this.inner;
      }
    };
    let l = /^[a-z_][a-z0-9_-]{0,29}(\.[a-z_][a-z0-9_-]{0,29})*$/;
    function c(t, r) {
      return `${t}/${r}`;
    }
    function d(t) {
      return t.split('/')[0];
    }
    function u(t) {
      if (void 0 === t.dynamicLabel)
        throw Error('This point should never be reached.');
      let r = c(t.baseIdentifier(), t.dynamicLabel);
      for (let n of t.sendInPings)
        if (a.o.metricsDatabase.hasMetric(t.lifetime, n, t.type, r)) return r;
      let n = 0;
      for (let r of t.sendInPings)
        n += a.o.metricsDatabase.countByBaseIdentifier(
          t.lifetime,
          r,
          t.type,
          t.baseIdentifier()
        );
      let s = !1;
      return (
        n >= 16
          ? (s = !0)
          : t.dynamicLabel.length > 61
            ? ((s = !0),
              a.o.errorManager.record(
                t,
                o.B.InvalidLabel,
                `Label length ${t.dynamicLabel.length} exceeds maximum of 61.`
              ))
            : l.test(t.dynamicLabel) ||
              ((s = !0),
              a.o.errorManager.record(
                t,
                o.B.InvalidLabel,
                `Label must be snake_case, got '${t.dynamicLabel}'.`
              )),
        s ? c(t.baseIdentifier(), '__other__') : r
      );
    }
    n.d(r, { Uh: () => c, X3: () => d, cW: () => u, ot: () => LabeledMetric });
  },
  87484(t, r, n) {
    var s,
      a = n(62209),
      o = n(36074),
      l = n(27604),
      c = n(88729),
      d = n(40351),
      u = n(25740),
      h = function (t, r, n, s, a) {
        if ('m' === s) throw TypeError('Private method is not writable');
        if ('a' === s && !a)
          throw TypeError('Private accessor was defined without a setter');
        if ('function' == typeof r ? t !== r || !a : !r.has(t))
          throw TypeError(
            'Cannot write private member to an object whose class did not declare it'
          );
        return ('a' === s ? a.call(t, n) : a ? (a.value = n) : r.set(t, n), n);
      },
      p = function (t, r, n, s) {
        if ('a' === n && !s)
          throw TypeError('Private accessor was defined without a getter');
        if ('function' == typeof r ? t !== r || !s : !r.has(t))
          throw TypeError(
            'Cannot read private member from an object whose class did not declare it'
          );
        return 'm' === n ? s : 'a' === n ? s.call(t) : s ? s.value : r.get(t);
      };
    let g = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    let UUIDMetric = class UUIDMetric extends c.JW {
      constructor(t) {
        super(t);
      }
      validate(t) {
        let r = (0, u.oI)(t);
        return r.type === c.iF.Error
          ? r
          : g.test(t)
            ? { type: c.iF.Success }
            : {
                type: c.iF.Error,
                errorMessage: `"${t}" is not a valid UUID`,
                errorType: d.B.InvalidValue
              };
      }
      payload() {
        return this.inner;
      }
    };
    let InternalUUIDMetricType = class InternalUUIDMetricType extends a.v {
      constructor(t) {
        super('uuid', t, UUIDMetric);
      }
      set(t) {
        let r;
        if (this.shouldRecord(l.o.uploadEnabled)) {
          t || (t = (0, o.Z3)());
          try {
            ((r = new UUIDMetric(t)), l.o.metricsDatabase.record(this, r));
          } catch (t) {
            t instanceof c.c1 && t.recordError(this);
          }
        }
      }
      generateAndSet() {
        if (!this.shouldRecord(l.o.uploadEnabled)) return;
        let t = (0, o.Z3)();
        return (this.set(t), t);
      }
      testGetValue(t = this.sendInPings[0]) {
        if ((0, o.xU)('testGetValue', 'core.metrics.UUIDMetricType'))
          return l.o.metricsDatabase.getMetric(t, this);
      }
    };
    let f = class {
      constructor(t) {
        (s.set(this, void 0), h(this, s, new InternalUUIDMetricType(t), 'f'));
      }
      set(t) {
        p(this, s, 'f').set(t);
      }
      generateAndSet() {
        return p(this, s, 'f').generateAndSet();
      }
      testGetValue(t = p(this, s, 'f').sendInPings[0]) {
        return p(this, s, 'f').testGetValue(t);
      }
      testGetNumRecordedErrors(t, r = p(this, s, 'f').sendInPings[0]) {
        return p(this, s, 'f').testGetNumRecordedErrors(t, r);
      }
    };
    ((s = new WeakMap()),
      n.d(r, { Pc: () => InternalUUIDMetricType }, { Ay: f }));
  },
  25740(t, r, n) {
    var s = n(88729),
      a = n(36074),
      o = n(84592),
      l = n(27604),
      c = n(40351),
      d = n(80849);
    function u(t, r) {
      t.startsWith('labeled_') && l.o.addSupportedMetric(t, o.ot);
      let n = l.o.getSupportedMetric(t);
      if (!n) throw Error(`Unable to create metric of unknown type "${t}".`);
      return new n(r);
    }
    function h(t, r) {
      try {
        return (u(t, r), !0);
      } catch (t) {
        return ((0, d.A)('Glean.core.Metrics.utils', t.message, d.q.Error), !1);
      }
    }
    function p(t, r = !0) {
      return (0, a.Fq)(t)
        ? (r ? t < 0 : t <= 0)
          ? {
              type: s.iF.Error,
              errorMessage: `Expected positive value, got ${JSON.stringify(t)}`,
              errorType: c.B.InvalidValue
            }
          : { type: s.iF.Success }
        : {
            type: s.iF.Error,
            errorMessage: `Expected integer value, got ${JSON.stringify(t)}`
          };
    }
    function g(t) {
      return (0, a.Kg)(t)
        ? { type: s.iF.Success }
        : {
            type: s.iF.Error,
            errorMessage: `Expected string value, got ${JSON.stringify(t)}`
          };
    }
    n.d(r, { Hp: () => u, LE: () => h, oI: () => g, wQ: () => p });
  },
  36074(t, r, n) {
    let s;
    n.d(r, {
      PK: () => $,
      Z3: () => T,
      bQ: () => x,
      Lm: () => b,
      Fq: () => w,
      EJ: () =>
        function t(r) {
          if (m(r) || b(r) || v(r)) return !0;
          if (g(r)) {
            if (0 === Object.keys(r).length) return !0;
            for (let n in r) return t(r[n]);
          }
          return !!Array.isArray(r) && r.every(r => t(r));
        },
      Et: () => v,
      Gv: () => g,
      Kg: () => m,
      b0: () => f,
      IB: () => C,
      zn: () => _,
      cE: () => D,
      xU: () => M,
      Wl: () => P,
      IY: () => A,
      qU: () => E
    });
    let a =
        'u' > typeof crypto &&
        crypto.randomUUID &&
        crypto.randomUUID.bind(crypto),
      o = new Uint8Array(16),
      l = [];
    for (let t = 0; t < 256; ++t) l.push((t + 256).toString(16).slice(1));
    let c = function (t, r, n) {
      if (a && !r && !t) return a();
      let c =
        (t = t || {}).random ||
        (
          t.rng ||
          function () {
            if (
              !s &&
              !(s =
                'u' > typeof crypto &&
                crypto.getRandomValues &&
                crypto.getRandomValues.bind(crypto))
            )
              throw Error(
                'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
              );
            return s(o);
          }
        )();
      if (((c[6] = (15 & c[6]) | 64), (c[8] = (63 & c[8]) | 128), r)) {
        n = n || 0;
        for (let t = 0; t < 16; ++t) r[n + t] = c[t];
        return r;
      }
      return (function (t, r = 0) {
        return (
          l[t[r + 0]] +
          l[t[r + 1]] +
          l[t[r + 2]] +
          l[t[r + 3]] +
          '-' +
          l[t[r + 4]] +
          l[t[r + 5]] +
          '-' +
          l[t[r + 6]] +
          l[t[r + 7]] +
          '-' +
          l[t[r + 8]] +
          l[t[r + 9]] +
          '-' +
          l[t[r + 10]] +
          l[t[r + 11]] +
          l[t[r + 12]] +
          l[t[r + 13]] +
          l[t[r + 14]] +
          l[t[r + 15]]
        );
      })(c);
    };
    var d = n(27604),
      u = n(40351),
      h = n(80849),
      p = n(88729);
    function g(t) {
      return 'object' == typeof t && null !== t && t.constructor === Object;
    }
    function f(t) {
      return void 0 === t;
    }
    function m(t) {
      return 'string' == typeof t;
    }
    function b(t) {
      return 'boolean' == typeof t;
    }
    function v(t) {
      return 'number' == typeof t && !isNaN(t);
    }
    function w(t) {
      return v(t) && Number.isInteger(t);
    }
    function $(t) {
      return (
        'true' === t.toLowerCase() || ('false' !== t.toLowerCase() && void 0)
      );
    }
    function _(t) {
      return t.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    }
    function E(t) {
      return /^(http|https):\/\/[a-zA-Z0-9._-]+(:\d+){0,1}(\/{0,1})$/i.test(t);
    }
    function A(t) {
      return /^[a-z0-9-]{1,20}$/i.test(t);
    }
    function T() {
      return 'u' > typeof crypto
        ? c()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (t) {
            let r = (16 * Math.random()) | 0;
            return ('x' == t ? r : (3 & r) | 8).toString(16);
          });
    }
    function x() {
      return Math.round(
        'u' < typeof performance ? Date.now() : performance.now()
      );
    }
    function P(t, r, n) {
      if (!m(r)) throw new p.c1(`Expected string, got ${JSON.stringify(r)}`);
      let s = new TextEncoder(),
        a = new TextDecoder('utf-8'),
        o = s.encode(r).slice(0, n),
        l = a.decode(o);
      return (
        l !== r &&
          d.o.errorManager.record(
            t,
            u.B.InvalidOverflow,
            `Value length ${new Blob([r]).size} exceeds maximum of ${r.length} bytes.`
          ),
        l
      );
    }
    function M(t, r = 'core.utils') {
      return (
        !!d.o.testing ||
        ((0, h.A)(
          r,
          [
            `Attempted to access test only method \`${t || 'unknown'}\`,`,
            'but Glean is not in testing mode. Ignoring. Make sure to put Glean in testing mode',
            'before accessing such methods, by calling `testResetGlean`.'
          ],
          h.q.Error
        ),
        !1)
      );
    }
    function D(...t) {
      let r = t.reduce((t, r) => t + r, 0);
      return (r > Number.MAX_SAFE_INTEGER && (r = Number.MAX_SAFE_INTEGER), r);
    }
    function C() {
      return 'u' < typeof window;
    }
  },
  70955(t, r, n) {
    let s;
    n.d(r, { A: () => eb });
    var a,
      o,
      l,
      c,
      d,
      u,
      h,
      p,
      g,
      f,
      m,
      b = n(80849);
    (((a = u || (u = {}))[(a.RecoverableFailure = 0)] = 'RecoverableFailure'),
      (a[(a.UnrecoverableFailure = 1)] = 'UnrecoverableFailure'),
      (a[(a.Success = 2)] = 'Success'));
    let UploadResult = class UploadResult {
      constructor(t, r) {
        ((this.result = t), (this.status = r));
      }
    };
    let Uploader = class Uploader {};
    let v = Uploader,
      w = 'platform.browser.FetchUploader';
    let BrowserFetchUploader = class BrowserFetchUploader extends v {
      constructor() {
        (super(...arguments), (this.timeoutMs = 1e4));
      }
      async post(t, r, n = !0) {
        let s,
          a = new AbortController(),
          o = setTimeout(() => a.abort(), this.timeoutMs),
          l = r.asCompressedPayload();
        try {
          s = await fetch(t.toString(), {
            headers: l.headers,
            method: 'POST',
            body: l.payload,
            keepalive: n,
            credentials: 'omit',
            signal: a.signal,
            redirect: 'error'
          });
        } catch (r) {
          if (r instanceof DOMException)
            (0, b.A)(
              w,
              ['Timeout while attempting to upload ping.\n', r],
              b.q.Error
            );
          else if (r instanceof TypeError) {
            if (n) return this.post(t, l, !1);
            (0, b.A)(
              w,
              ['Network error while attempting to upload ping.\n', r],
              b.q.Error
            );
          } else
            (0, b.A)(
              w,
              ['Unknown error while attempting to upload ping.\n', r],
              b.q.Error
            );
          return (clearTimeout(o), new UploadResult(0));
        }
        return (clearTimeout(o), new UploadResult(2, s.status));
      }
      supportsCustomHeaders() {
        return !0;
      }
    };
    let $ = new BrowserFetchUploader();
    let BrowserSendBeaconUploader = class BrowserSendBeaconUploader extends v {
      constructor() {
        (super(...arguments), (this.timeoutMs = 1e4));
      }
      async post(t, r, n = !0) {
        return navigator.sendBeacon(t, r.payload)
          ? new UploadResult(2, 200)
          : (n &&
              (0, b.A)(
                'platform.browser.SendBeaconUploader',
                'The `sendBeacon` call was not serviced by the browser. Deleting data.',
                b.q.Error
              ),
            new UploadResult(1));
      }
      supportsCustomHeaders() {
        return !1;
      }
    };
    let _ = new BrowserSendBeaconUploader();
    var E = n(27604);
    let A = 'platform.browser.SendBeaconFallbackUploader';
    let BrowserSendBeaconFallbackUploader = class BrowserSendBeaconFallbackUploader extends v {
      constructor() {
        (super(...arguments),
          (this.fetchUploader = $),
          (this.sendBeaconUploader = _));
      }
      async post(t, r) {
        var n, s;
        if (
          !(null == (n = E.o.config) ? void 0 : n.sourceTags) &&
          !(null == (s = E.o.config) ? void 0 : s.debugViewTag) &&
          navigator &&
          navigator.sendBeacon
        ) {
          let n = await this.sendBeaconUploader.post(t, r, !1);
          if (2 == n.result) return n;
          (0, b.A)(
            A,
            'The `sendBeacon` call was not serviced by the browser. Falling back to the `fetch` uploader.',
            b.q.Warn
          );
        } else
          (0, b.A)(
            A,
            '`sendBeacon` is not available. Falling back to the `fetch` uploader.',
            b.q.Warn
          );
        return this.fetchUploader.post(t, r);
      }
      supportsCustomHeaders() {
        return !1;
      }
    };
    let T = new BrowserSendBeaconFallbackUploader();
    var x = n(36074);
    let P = 'platform.web.Storage';
    let WebStore = class WebStore {
      constructor(t) {
        ((this.rootKey = t), (this.logTag = `${P}.${t}`));
      }
      get(t = []) {
        let r;
        if (!(0, x.IB)()) {
          try {
            let n = localStorage.getItem(this.rootKey) || '{}',
              s = JSON.parse(n);
            r =
              t.length > 0
                ? (function (t, r) {
                    if (0 === r.length)
                      throw Error(
                        'The index must contain at least one property to get.'
                      );
                    let n = t;
                    for (let t of r)
                      if (!(0, x.Gv)(n) || !(t in n)) return;
                      else {
                        let r = n[t];
                        (0, x.EJ)(r) && (n = r);
                      }
                    return n;
                  })(s, t)
                : 0 === Object.keys(s).length
                  ? void 0
                  : s;
          } catch (t) {
            (0, b.A)(
              P,
              ['Unable to fetch value from local storage.', t],
              b.q.Error
            );
          }
          return (
            this.shouldUpdateSession(t) && E.o.coreMetrics.updateSessionInfo(),
            r
          );
        }
      }
      update(t, r) {
        if (!(0, x.IB)()) {
          try {
            let n = localStorage.getItem(this.rootKey) || '{}',
              s = JSON.parse(n),
              a = (function (t, r, n) {
                if (0 === r.length)
                  throw Error(
                    'The index must contain at least one property to update.'
                  );
                let s = { ...t },
                  a = s;
                for (let t of r.slice(0, r.length - 1))
                  ((0, x.Gv)(a[t]) || (a[t] = {}), (a = a[t]));
                let o = r[r.length - 1],
                  l = n(a[o]);
                return ((a[o] = l), s);
              })(s, t, r);
            localStorage.setItem(this.rootKey, JSON.stringify(a));
          } catch (t) {
            (0, b.A)(
              P,
              ['Unable to update value from local storage.', t],
              b.q.Error
            );
          }
          this.shouldUpdateSession(t) && E.o.coreMetrics.updateSessionInfo();
        }
      }
      delete(t) {
        if (!(0, x.IB)()) {
          try {
            let r = localStorage.getItem(this.rootKey) || '{}',
              n = JSON.parse(r);
            if (0 === t.length) localStorage.removeItem(this.rootKey);
            else
              try {
                let r = (function (t, r) {
                  if (0 === r.length) return {};
                  let n = { ...t },
                    s = n;
                  for (let t of r.slice(0, r.length - 1)) {
                    let n = s[t];
                    if ((0, x.Gv)(n)) s = n;
                    else
                      throw Error(
                        `Attempted to delete an entry from an inexistent index: ${JSON.stringify(r)}.`
                      );
                  }
                  let a = r[r.length - 1];
                  return (delete s[a], n);
                })(n, t);
                localStorage.setItem(this.rootKey, JSON.stringify(r));
              } catch (r) {
                (0, b.A)(
                  this.logTag,
                  [
                    `Error attempting to delete key ${t.toString()} from storage. Ignoring.`,
                    r
                  ],
                  b.q.Warn
                );
              }
          } catch (t) {
            (0, b.A)(P, ['Unable to delete value from storage.', t], b.q.Error);
          }
          this.shouldUpdateSession(t) && E.o.coreMetrics.updateSessionInfo();
        }
      }
      shouldUpdateSession(t) {
        return !t.includes('session_id') && !t.includes('session_count');
      }
    };
    var M = n(30994);
    let D = 'core.Config';
    let Configuration = class Configuration {
      constructor(t) {
        var r;
        if (
          ((this.channel = null == t ? void 0 : t.channel),
          (this.appBuild = null == t ? void 0 : t.appBuild),
          (this.appDisplayVersion = null == t ? void 0 : t.appDisplayVersion),
          (this.buildDate = null == t ? void 0 : t.buildDate),
          (this.maxEvents = (null == t ? void 0 : t.maxEvents) || 1),
          (this.enableAutoPageLoadEvents =
            null == t ? void 0 : t.enableAutoPageLoadEvents),
          (this.enableAutoElementClickEvents =
            null == t ? void 0 : t.enableAutoElementClickEvents),
          (this.experimentationId = null == t ? void 0 : t.experimentationId),
          (this.sessionLengthInMinutesOverride =
            null == t ? void 0 : t.sessionLengthInMinutesOverride),
          (this.debug = {}),
          (null == t ? void 0 : t.serverEndpoint) &&
            !(0, x.qU)(t.serverEndpoint))
        )
          throw Error(
            `Unable to initialize Glean, serverEndpoint ${t.serverEndpoint} is an invalid URL.`
          );
        if (
          !E.o.testing &&
          (null == (r = null == t ? void 0 : t.serverEndpoint)
            ? void 0
            : r.startsWith('http:'))
        )
          throw Error(
            `Unable to initialize Glean, serverEndpoint ${t.serverEndpoint} must use the HTTPS protocol.`
          );
        ((this.serverEndpoint =
          t && t.serverEndpoint ? t.serverEndpoint : M.Gh),
          (this.httpClient = null == t ? void 0 : t.httpClient));
      }
      get logPings() {
        return this.debug.logPings || !1;
      }
      set logPings(t) {
        this.debug.logPings = t;
      }
      get debugViewTag() {
        return this.debug.debugViewTag;
      }
      set debugViewTag(t) {
        (0, x.IY)(t || '')
          ? (this.debug.debugViewTag = t)
          : (0, b.A)(
              D,
              [
                `"${t || ''}" is not a valid \`debugViewTag\` value.`,
                'Please make sure the value passed satisfies the regex `^[a-zA-Z0-9-]{1,20}$`.'
              ],
              b.q.Error
            );
      }
      get sourceTags() {
        return this.debug.sourceTags;
      }
      set sourceTags(t) {
        if (!t || t.length < 1 || t.length > 5)
          return void (0, b.A)(
            D,
            'A list of tags cannot contain more than 5 elements or less than one.',
            b.q.Error
          );
        for (let r of t) {
          if (r.startsWith('glean'))
            return void (0, b.A)(
              D,
              'Tags starting with `glean` are reserved and must not be used.',
              b.q.Error
            );
          if (!(0, x.IY)(r)) return;
        }
        this.debug.sourceTags = t;
      }
    };
    var C = n(69861);
    let U = 'core.Pings.Database';
    let PingsDatabase = class PingsDatabase {
      constructor() {
        this.store = new E.o.platform.Storage('pings');
      }
      attachObserver(t) {
        this.observer = t;
      }
      recordPing(t, r, n, s) {
        let a = {
          collectionDate: new Date().toISOString(),
          path: t,
          payload: n
        };
        (s && (a.headers = s),
          this.store.update([r], () => a),
          this.observer && this.observer.update(r, a));
      }
      deletePing(t) {
        this.store.delete([t]);
      }
      getAllPings() {
        let t = this.store.get(),
          r = {};
        if ((0, x.Gv)(t))
          for (let n in t) {
            let s = t[n];
            !(function (t) {
              if ((0, x.Gv)(t)) {
                let r =
                    'collectionDate' in t &&
                    (0, x.Kg)(t.collectionDate) &&
                    (0, x.Et)(new Date(t.collectionDate).getTime()),
                  n = 'path' in t && (0, x.Kg)(t.path),
                  s =
                    'payload' in t &&
                    (0, x.EJ)(t.payload) &&
                    (0, x.Gv)(t.payload),
                  a =
                    !('headers' in t) ||
                    ((0, x.EJ)(t.headers) && (0, x.Gv)(t.headers));
                return !!r && !!n && !!s && !!a;
              }
              return !1;
            })(s)
              ? ((0, b.A)(
                  U,
                  `Unexpected data found in pings database: ${JSON.stringify(s, null, 2)}. Deleting.`,
                  b.q.Warn
                ),
                this.store.delete([n]))
              : (r[n] = s);
          }
        return Object.entries(r).sort(
          ([t, { collectionDate: r }], [n, { collectionDate: s }]) =>
            new Date(r).getTime() - new Date(s).getTime()
        );
      }
      scanPendingPings() {
        if (this.observer)
          for (let [t, r] of this.getAllPingsWithoutSurplus())
            this.observer.update(t, r);
      }
      clearAll() {
        this.store.delete([]);
      }
      getAllPingsWithoutSurplus(t = 250, r = 0xa00000) {
        let n = this.getAllPings(),
          s = n.filter(([t, r]) => !O(r)).reverse(),
          a = n.filter(([t, r]) => O(r)),
          o = s.length;
        o > t &&
          (0, b.A)(
            U,
            [
              `More than ${t} pending pings in the pings database,`,
              `will delete ${o - t} old pings.`
            ],
            b.q.Warn
          );
        let l = !1,
          c = 0,
          d = 0,
          u = [];
        for (let [n, a] of s) {
          var h;
          (c++,
            (d += ((h = a), (0, C._u)(JSON.stringify(h)).length)),
            !l &&
              d > r &&
              ((0, b.A)(
                U,
                [
                  `Pending pings database has reached the size quota of ${r} bytes,`,
                  'outstanding pings will be deleted.'
                ],
                b.q.Warn
              ),
              (l = !0)),
            c > t && (l = !0),
            l ? this.deletePing(n) : u.unshift([n, a]));
        }
        return [...a, ...u];
      }
    };
    function O(t) {
      return t.path.split('/')[3] === M.OM;
    }
    (((o = h || (h = {}))[(o.Incrementing = 0)] = 'Incrementing'),
      (o[(o.Throttled = 1)] = 'Throttled'));
    let RateLimiter = class RateLimiter {
      constructor(t = 6e4, r = 40, n = 0, s) {
        ((this.interval = t),
          (this.maxCount = r),
          (this.count = n),
          (this.started = s));
      }
      get elapsed() {
        if ((0, x.b0)(this.started)) return 0 / 0;
        let t = (0, x.bQ)() - this.started;
        return t < 0 ? 0 / 0 : t;
      }
      reset() {
        ((this.started = (0, x.bQ)()), (this.count = 0));
      }
      shouldReset() {
        return !!(
          (0, x.b0)(this.started) ||
          isNaN(this.elapsed) ||
          this.elapsed > this.interval
        );
      }
      getState() {
        this.shouldReset() && this.reset();
        let t = this.interval - this.elapsed;
        return this.count >= this.maxCount
          ? { state: 1, remainingTime: t }
          : (this.count++, { state: 0 });
      }
    };
    let Policy = class Policy {
      constructor(t = 3, r = 3, n = 1048576) {
        ((this.maxWaitAttempts = t),
          (this.maxRecoverableFailures = r),
          (this.maxPingBodySize = n));
      }
    };
    let PingBodyOverflowError = class PingBodyOverflowError extends Error {
      constructor(t) {
        (super(t), (this.name = 'PingBodyOverflow'));
      }
    };
    let PingRequest = class PingRequest {
      constructor(t, r, n, s) {
        ((this.identifier = t),
          (this.headers = r),
          (this.payload = n),
          (this.maxBodySize = s));
      }
      asCompressedPayload() {
        let t;
        if ('gzip' == this.headers['Content-Encoding']) return this;
        let r = (0, C._u)(this.payload),
          n = this.headers;
        try {
          ((t = (0, C.u3)(r)),
            (n['Content-Encoding'] = 'gzip'),
            (n['Content-Length'] = t.length.toString()));
        } catch (t) {
          return this;
        }
        if (t.length > this.maxBodySize)
          throw new PingBodyOverflowError(
            `Body for ping ${this.identifier} exceeds ${this.maxBodySize} bytes. Discarding.`
          );
        return new PingRequest(this.identifier, n, t, this.maxBodySize);
      }
    };
    let N = 'core.Upload.PingUploadWorker';
    let PingUploadWorker = class PingUploadWorker {
      constructor(t, r, n = new Policy()) {
        ((this.uploader = t),
          (this.serverEndpoint = r),
          (this.policy = n),
          (this.isBlocking = !1));
      }
      buildPingRequest(t) {
        let r = t.headers || {};
        r = {
          ...t.headers,
          'Content-Type': 'application/json; charset=utf-8',
          Date: new Date().toISOString(),
          'X-Telemetry-Agent': `Glean/5.0.8 (JS on ${E.o.platform.info.os()})`
        };
        let n = JSON.stringify(t.payload);
        if (n.length > this.policy.maxPingBodySize)
          throw new PingBodyOverflowError(
            `Body for ping ${t.identifier} exceeds ${this.policy.maxPingBodySize}bytes. Discarding.`
          );
        return (
          (r['Content-Length'] = n.length.toString()),
          new PingRequest(t.identifier, r, n, this.policy.maxPingBodySize)
        );
      }
      async attemptPingUpload(t) {
        try {
          let r = this.buildPingRequest(t);
          return this.uploader.post(`${this.serverEndpoint}${t.path}`, r);
        } catch (t) {
          return (
            (0, b.A)(
              N,
              ['Error trying to build or post ping request:', t],
              b.q.Warn
            ),
            new UploadResult(1)
          );
        }
      }
      work(t, r) {
        for (;;)
          try {
            let n = t();
            switch (n.type) {
              case 'upload':
                if (this.isBlocking) return;
                this.attemptPingUpload(n.ping)
                  .then(t => {
                    r(n.ping, t);
                  })
                  .catch(t => {
                    console.log(t);
                  });
                continue;
              case 'done':
                return;
            }
          } catch (t) {
            (0, b.A)(
              N,
              [
                'IMPOSSIBLE: Something went wrong while processing ping upload tasks.',
                t
              ],
              b.q.Error
            );
          }
      }
      blockUploading() {
        this.isBlocking = !0;
      }
      resumeUploading() {
        this.isBlocking = !1;
      }
    };
    (((l = p || (p = {})).Done = 'done'),
      (l.Wait = 'wait'),
      (l.Upload = 'upload'));
    let q = () => ({ type: 'done' }),
      B = 'core.Upload.PingUploadManager';
    let PingUploadManager = class PingUploadManager {
      constructor(t, r, n = new Policy(), s = new RateLimiter()) {
        ((this.pingsDatabase = r),
          (this.policy = n),
          (this.rateLimiter = s),
          (this.recoverableFailureCount = 0),
          (this.waitAttemptCount = 0),
          (this.queue = []),
          (this.processing = new Set()),
          (this.worker = new PingUploadWorker(
            t.httpClient ? t.httpClient : E.o.platform.uploader,
            t.serverEndpoint,
            n
          )),
          r.attachObserver(this));
      }
      getUploadTask() {
        let t = this.getUploadTaskInternal();
        return (
          'wait' !== t.type &&
            this.waitAttemptCount > 0 &&
            (this.waitAttemptCount = 0),
          'upload' !== t.type &&
            this.recoverableFailureCount > 0 &&
            (this.recoverableFailureCount = 0),
          t
        );
      }
      processPingUploadResponse(t, r) {
        let { identifier: n } = t;
        this.processing.has(n) && this.processing.delete(n);
        let { status: s, result: a } = r;
        if (s && s >= 200 && s < 300) {
          ((0, b.A)(B, `Ping ${n} successfully sent ${s}.`, b.q.Info),
            this.pingsDatabase.deletePing(n));
          return;
        }
        if (1 === a || (s && s >= 400 && s < 500)) {
          ((0, b.A)(
            B,
            `Unrecoverable upload failure while attempting to send ping ${n}. Error was: ${null != s ? s : 'no status'}.`,
            b.q.Warn
          ),
            this.pingsDatabase.deletePing(n));
          return;
        }
        ((0, b.A)(
          B,
          [
            `Recoverable upload failure while attempting to send ping ${n}, will retry.`,
            `Error was: ${null != s ? s : 'no status'}.`
          ],
          b.q.Warn
        ),
          this.recoverableFailureCount++,
          this.enqueuePing(t));
      }
      clearPendingPingsQueue() {
        this.queue = this.queue.filter(t => O(t));
      }
      blockUploads() {
        this.worker.blockUploading();
      }
      resumeUploads() {
        this.worker.resumeUploading();
      }
      update(t, r) {
        (this.enqueuePing({ identifier: t, ...r }),
          this.worker.isBlocking ||
            (this.processing.delete(t), this.pingsDatabase.deletePing(t)),
          this.worker.work(
            () => this.getUploadTask(),
            (t, r) => this.processPingUploadResponse(t, r)
          ));
      }
      enqueuePing(t) {
        if (!this.processing.has(t.identifier)) {
          for (let r of this.queue) if (r.identifier === t.identifier) return;
          this.queue.push(t);
        }
      }
      getUploadTaskInternal() {
        if (this.recoverableFailureCount >= this.policy.maxRecoverableFailures)
          return (
            (0, b.A)(
              B,
              'Glean has reached maximum recoverable upload failures for the current uploading window.',
              b.q.Debug
            ),
            q()
          );
        if (this.queue.length > 0) {
          let { state: t, remainingTime: r } = this.rateLimiter.getState();
          if (1 === t)
            return ((0, b.A)(
              B,
              [
                'Glean is currently throttled.',
                `Pending pings may be uploaded in ${(r || 0) / 1e3}s.`
              ],
              b.q.Debug
            ),
            this.waitAttemptCount++,
            this.waitAttemptCount > this.policy.maxWaitAttempts)
              ? q()
              : { type: 'wait', remainingTime: r || 0 };
          let n = this.queue.shift();
          return (
            this.processing.add(n.identifier),
            { type: 'upload', ping: n }
          );
        }
        return q();
      }
    };
    var V = n(87484),
      G = n(62209);
    (((c = g || (g = {})).Nanosecond = 'nanosecond'),
      (c.Microsecond = 'microsecond'),
      (c.Millisecond = 'millisecond'),
      (c.Second = 'second'),
      (c.Minute = 'minute'),
      (c.Hour = 'hour'),
      (c.Day = 'day'));
    let W = g;
    var F = n(88729);
    let DatetimeMetric = class DatetimeMetric extends F.JW {
      constructor(t) {
        super(t);
      }
      static fromDate(t, r) {
        if (!(t instanceof Date))
          throw new F.c1(`Expected Date object, got ${JSON.stringify(t)}`);
        return new DatetimeMetric({
          timeUnit: r,
          timezone: t.getTimezoneOffset(),
          date: t.toISOString()
        });
      }
      get date() {
        return new Date(this.inner.date);
      }
      get timezone() {
        return this.inner.timezone;
      }
      get timeUnit() {
        return this.inner.timeUnit;
      }
      get dateISOString() {
        return this.inner.date;
      }
      validate(t) {
        if (!(0, x.Gv)(t) || 3 !== Object.keys(t).length)
          return {
            type: F.iF.Error,
            errorMessage: `Expected Glean datetime metric object, got ${JSON.stringify(t)}`
          };
        let r =
            'timeUnit' in t &&
            (0, x.Kg)(t.timeUnit) &&
            Object.values(W).includes(t.timeUnit),
          n = 'timezone' in t && (0, x.Et)(t.timezone),
          s =
            'date' in t &&
            (0, x.Kg)(t.date) &&
            24 === t.date.length &&
            !isNaN(Date.parse(t.date));
        return r && n && s
          ? { type: F.iF.Success }
          : {
              type: F.iF.Error,
              errorMessage: `Invalid property on datetime metric, got ${JSON.stringify(t)}`
            };
      }
      payload() {
        let t,
          r,
          n = this.dateISOString.match(/\d+/g);
        if (!n || n.length < 0)
          throw Error(
            'IMPOSSIBLE: Unable to extract date information from DatetimeMetric.'
          );
        let s = new Date(
            parseInt(n[0]),
            parseInt(n[1]) - 1,
            parseInt(n[2]),
            parseInt(n[3]) - this.timezone / 60,
            parseInt(n[4]),
            parseInt(n[5]),
            parseInt(n[6])
          ),
          a =
            ((r = Math.abs((t = -((this.timezone / 60) * 1)))
              .toString()
              .padStart(2, '0')),
            `${t > 0 ? '+' : '-'}${r}:00`),
          o = s.getFullYear().toString().padStart(2, '0'),
          l = (s.getMonth() + 1).toString().padStart(2, '0'),
          c = s.getDate().toString().padStart(2, '0');
        if (this.timeUnit === W.Day) return `${o}-${l}-${c}${a}`;
        let d = s.getHours().toString().padStart(2, '0');
        if (this.timeUnit === W.Hour) return `${o}-${l}-${c}T${d}${a}`;
        let u = s.getMinutes().toString().padStart(2, '0');
        if (this.timeUnit === W.Minute) return `${o}-${l}-${c}T${d}:${u}${a}`;
        let h = s.getSeconds().toString().padStart(2, '0');
        if (this.timeUnit === W.Second)
          return `${o}-${l}-${c}T${d}:${u}:${h}${a}`;
        let p = s.getMilliseconds().toString().padStart(3, '0');
        return this.timeUnit === W.Millisecond
          ? `${o}-${l}-${c}T${d}:${u}:${h}.${p}${a}`
          : this.timeUnit === W.Microsecond
            ? `${o}-${l}-${c}T${d}:${u}:${h}.${p}000${a}`
            : `${o}-${l}-${c}T${d}:${u}:${h}.${p}000000${a}`;
      }
    };
    let InternalDatetimeMetricType = class InternalDatetimeMetricType
      extends G.v
    {
      constructor(t, r) {
        (super('datetime', t, DatetimeMetric), (this.timeUnit = r));
      }
      set(t) {
        if (!this.shouldRecord(E.o.uploadEnabled)) return;
        let r = this.truncateDate(t);
        try {
          let t = DatetimeMetric.fromDate(r, this.timeUnit);
          E.o.metricsDatabase.record(this, t);
        } catch (t) {
          t instanceof F.c1 && t.recordError(this);
        }
      }
      truncateDate(t) {
        t || (t = new Date());
        let r = t;
        switch (this.timeUnit) {
          case W.Day:
            (r.setMilliseconds(0),
              r.setSeconds(0),
              r.setMinutes(0),
              r.setMilliseconds(0));
          case W.Hour:
            (r.setMilliseconds(0), r.setSeconds(0), r.setMinutes(0));
          case W.Minute:
            (r.setMilliseconds(0), r.setSeconds(0));
          case W.Second:
            r.setMilliseconds(0);
        }
        return r;
      }
      testGetValueAsDatetimeMetric(t, r) {
        if ((0, x.xU)(r, 'core.metrics.DatetimeMetricType')) {
          let r = E.o.metricsDatabase.getMetric(t, this);
          if (r) return new DatetimeMetric(r);
        }
      }
      testGetValueAsString(t = this.sendInPings[0]) {
        let r = this.testGetValueAsDatetimeMetric(t, 'testGetValueAsString');
        return r ? r.payload() : void 0;
      }
      testGetValue(t = this.sendInPings[0]) {
        let r = this.testGetValueAsDatetimeMetric(t, 'testGetValue');
        return r ? r.date : void 0;
      }
    };
    new WeakMap();
    var j = n(25740);
    let StringMetric = class StringMetric extends F.JW {
      constructor(t) {
        super(t);
      }
      validate(t) {
        return (0, j.oI)(t);
      }
      payload() {
        return this.inner;
      }
    };
    let InternalStringMetricType = class InternalStringMetricType extends G.v {
      constructor(t) {
        super('string', t, StringMetric);
      }
      set(t) {
        if (this.shouldRecord(E.o.uploadEnabled))
          try {
            let r = (0, x.Wl)(this, t, 100),
              n = new StringMetric(r);
            E.o.metricsDatabase.record(this, n);
          } catch (t) {
            t instanceof F.c1 && t.recordError(this);
          }
      }
      testGetValue(t = this.sendInPings[0]) {
        if ((0, x.xU)('testGetValue', 'core.metrics.StringMetricType'))
          return E.o.metricsDatabase.getMetric(t, this);
      }
    };
    new WeakMap();
    let J = 'core.metrics.CounterMetricType';
    let CounterMetric = class CounterMetric extends F.JW {
      constructor(t) {
        super(t);
      }
      validate(t) {
        return (0, j.wQ)(t, !1);
      }
      payload() {
        return this.inner;
      }
      saturatingAdd(t) {
        let r = this.validateOrThrow(t);
        this.inner = (0, x.cE)(this.inner, r);
      }
    };
    let InternalCounterMetricType = class InternalCounterMetricType
      extends G.v
    {
      constructor(t) {
        super('counter', t, CounterMetric);
      }
      add(t) {
        if (this.shouldRecord(E.o.uploadEnabled)) {
          (0, x.b0)(t) && (t = 1);
          try {
            E.o.metricsDatabase.transform(this, this.transformFn(t));
          } catch (t) {
            t instanceof F.c1 && t.recordError(this);
          }
        }
      }
      transformFn(t) {
        return r => {
          let n = new CounterMetric(t);
          if (r)
            try {
              n.saturatingAdd(r);
            } catch (t) {
              (0, b.A)(
                J,
                `Unexpected value found in storage for metric ${this.name}: ${JSON.stringify(r)}. Overwriting.`
              );
            }
          return n;
        };
      }
      testGetValue(t = this.sendInPings[0]) {
        if ((0, x.xU)('testGetValue', J))
          return E.o.metricsDatabase.getMetric(t, this);
      }
    };
    new WeakMap();
    let CoreMetrics = class CoreMetrics {
      constructor() {
        ((this.clientId = new V.Pc({
          name: 'client_id',
          category: '',
          sendInPings: ['glean_client_info'],
          lifetime: 'user',
          disabled: !1
        })),
          (this.firstRunDate = new InternalDatetimeMetricType(
            {
              name: 'first_run_date',
              category: '',
              sendInPings: ['glean_client_info'],
              lifetime: 'user',
              disabled: !1
            },
            W.Day
          )),
          (this.os = new InternalStringMetricType({
            name: 'os',
            category: '',
            sendInPings: ['glean_client_info'],
            lifetime: 'application',
            disabled: !1
          })),
          (this.osVersion = new InternalStringMetricType({
            name: 'os_version',
            category: '',
            sendInPings: ['glean_client_info'],
            lifetime: 'application',
            disabled: !1
          })),
          (this.architecture = new InternalStringMetricType({
            name: 'architecture',
            category: '',
            sendInPings: ['glean_client_info'],
            lifetime: 'application',
            disabled: !1
          })),
          (this.locale = new InternalStringMetricType({
            name: 'locale',
            category: '',
            sendInPings: ['glean_client_info'],
            lifetime: 'application',
            disabled: !1
          })),
          (this.appChannel = new InternalStringMetricType({
            name: 'app_channel',
            category: '',
            sendInPings: ['glean_client_info'],
            lifetime: 'application',
            disabled: !1
          })),
          (this.appBuild = new InternalStringMetricType({
            name: 'app_build',
            category: '',
            sendInPings: ['glean_client_info'],
            lifetime: 'application',
            disabled: !1
          })),
          (this.appDisplayVersion = new InternalStringMetricType({
            name: 'app_display_version',
            category: '',
            sendInPings: ['glean_client_info'],
            lifetime: 'application',
            disabled: !1
          })),
          (this.buildDate = new InternalDatetimeMetricType(
            {
              name: 'build_date',
              category: '',
              sendInPings: ['glean_client_info'],
              lifetime: 'application',
              disabled: !1
            },
            'second'
          )),
          (this.sessionId = new V.Pc({
            name: 'session_id',
            category: '',
            sendInPings: ['glean_client_info'],
            lifetime: 'user',
            disabled: !1
          })),
          (this.sessionCount = new InternalCounterMetricType({
            name: 'session_count',
            category: '',
            sendInPings: ['glean_client_info'],
            lifetime: 'user',
            disabled: !1
          })));
      }
      initialize() {
        !(!E.o.testing && (0, x.IB)()) &&
          (this.initializeClientId(),
          this.initializeFirstRunDate(),
          this.updateSessionInfo(),
          this.os.set(E.o.platform.info.os()),
          this.osVersion.set(E.o.platform.info.osVersion()),
          this.architecture.set(E.o.platform.info.arch()),
          this.locale.set(E.o.platform.info.locale()),
          this.appBuild.set(E.o.config.appBuild || 'Unknown'),
          this.appDisplayVersion.set(E.o.config.appDisplayVersion || 'Unknown'),
          E.o.config.channel && this.appChannel.set(E.o.config.channel),
          E.o.config.buildDate && this.buildDate.set());
      }
      updateSessionInfo() {
        if (!(0, x.IB)()) {
          if (E.o.metricsDatabase.getMetric(M.Tv, this.sessionId))
            try {
              (function (t = 30) {
                let r = null;
                try {
                  r = localStorage.getItem('glean_session_last_active');
                } catch (t) {
                  console.warn(t);
                }
                let n = new Date(Number(r)),
                  s = new Date();
                return (s.setMinutes(s.getMinutes() - t), s > n);
              })(E.o.config.sessionLengthInMinutesOverride) &&
                this.generateNewSession();
            } catch (t) {
              this.generateNewSession();
            }
          else this.generateNewSession();
          try {
            localStorage.setItem(
              'glean_session_last_active',
              Date.now().toString()
            );
          } catch (t) {
            console.warn(t);
          }
        }
      }
      initializeClientId() {
        let t = !1,
          r = E.o.metricsDatabase.getMetric(M.Tv, this.clientId);
        if (r)
          try {
            (0, j.Hp)('uuid', r).payload() === M.Kp && (t = !0);
          } catch (r) {
            ((0, b.A)(
              'core.InternalMetrics',
              'Unexpected value found for Glean clientId. Ignoring.',
              b.q.Warn
            ),
              (t = !0));
          }
        else t = !0;
        t && this.clientId.set((0, x.Z3)());
      }
      initializeFirstRunDate() {
        E.o.metricsDatabase.getMetric(M.Tv, this.firstRunDate) ||
          this.firstRunDate.set();
      }
      generateNewSession() {
        (this.sessionId.generateAndSet(), this.sessionCount.add());
      }
    };
    let K = 'core.Pings.Maker',
      X = function (t, r, n) {
        let s = (function (t, r) {
          let n = E.o.eventsDatabase.getPingEvents(t.name, !0),
            s = E.o.metricsDatabase.getPingMetrics(t.name, !0);
          if (!s && !n) {
            if (!t.sendIfEmpty)
              return void (0, b.A)(
                K,
                `Storage for ${t.name} empty. Bailing out.`,
                b.q.Info
              );
            (0, b.A)(
              K,
              `Storage for ${t.name} empty. Ping will still be sent.`,
              b.q.Info
            );
          }
          t.includeClientId &&
            E.o.config.experimentationId &&
            (s =
              void 0 !== s
                ? {
                    ...s,
                    string: {
                      ...((null == s ? void 0 : s.string) || void 0),
                      'glean.client.annotation.experimentation_id':
                        E.o.config.experimentationId
                    }
                  }
                : {
                    string: {
                      'glean.client.annotation.experimentation_id':
                        E.o.config.experimentationId
                    }
                  });
          let a = s ? { metrics: s } : {},
            o = (function (t, r) {
              let n = (function (t) {
                  let r = new InternalCounterMetricType({
                      category: '',
                      name: `${t.name}#sequence`,
                      sendInPings: [M.cp],
                      lifetime: 'user',
                      disabled: !1
                    }),
                    n = E.o.metricsDatabase.getMetric(M.cp, r);
                  if ((r.add(1), n))
                    try {
                      return new CounterMetric(n).payload();
                    } catch (r) {
                      (0, b.A)(
                        K,
                        `Unexpected value found for sequence number in ping ${t.name}. Ignoring.`,
                        b.q.Warn
                      );
                    }
                  return 0;
                })(t),
                { startTime: s, endTime: a } = (function (t) {
                  let r,
                    n,
                    { startTimeMetric: s, startTime: a } =
                      ((r = new InternalDatetimeMetricType(
                        {
                          category: '',
                          name: `${t.name}#start`,
                          sendInPings: [M.cp],
                          lifetime: 'user',
                          disabled: !1
                        },
                        W.Minute
                      )),
                      (n = E.o.metricsDatabase.getMetric(M.cp, r)),
                      {
                        startTimeMetric: r,
                        startTime: n
                          ? new DatetimeMetric(n)
                          : DatetimeMetric.fromDate(E.o.startTime, W.Minute)
                      }),
                    o = new Date();
                  s.set(o);
                  let l = DatetimeMetric.fromDate(o, W.Minute);
                  return { startTime: a.payload(), endTime: l.payload() };
                })(t),
                o = { seq: n, start_time: s, end_time: a };
              return (r && (o.reason = r), o);
            })(t, r),
            l = (function (t) {
              let r = E.o.metricsDatabase.getPingMetrics(M.Tv, !0);
              r ||
                ((0, b.A)(
                  K,
                  'Empty client info data. Will submit anyways.',
                  b.q.Warn
                ),
                (r = {}));
              let n = { telemetry_sdk_build: '5.0.8' };
              for (let t in r) n = { ...n, ...r[t] };
              return (
                t.includeClientId || (delete n.client_id, delete n.session_id),
                n
              );
            })(t);
          return {
            ...a,
            ...(n ? { events: n } : {}),
            ping_info: o,
            client_info: l
          };
        })(r, n);
        if (!s) return;
        E.o.config.logPings &&
          (0, b.A)(K, JSON.stringify(s, null, 2), b.q.Info);
        let a = (function () {
          let t = {};
          if (
            (E.o.config.debugViewTag &&
              (t['X-Debug-ID'] = E.o.config.debugViewTag),
            E.o.config.sourceTags &&
              (t['X-Source-Tags'] = E.o.config.sourceTags.toString()),
            Object.keys(t).length > 0)
          )
            return t;
        })();
        E.o.pingsDatabase.recordPing(
          `/submit/${E.o.applicationId}/${r.name}/1/${t}`,
          t,
          s,
          a
        );
      },
      Y = 'core.Pings.PingType';
    let InternalPingType = class InternalPingType {
      constructor(t) {
        var r;
        ((this.name = t.name),
          (this.includeClientId = t.includeClientId),
          (this.sendIfEmpty = t.sendIfEmpty),
          (this.reasonCodes = null != (r = t.reasonCodes) ? r : []),
          (this.preciseTimestamps = t.preciseTimestamps));
      }
      submit(t) {
        this.testCallback
          ? this.testCallback(t)
              .then(() => {
                this.internalSubmit(t, this.resolveTestPromiseFunction);
              })
              .catch(r => {
                ((0, b.A)(
                  Y,
                  [
                    `There was an error validating "${this.name}" (${null != t ? t : 'no reason'}):`,
                    r
                  ],
                  b.q.Error
                ),
                  this.internalSubmit(t, this.rejectTestPromiseFunction));
              })
          : this.internalSubmit(t);
      }
      internalSubmit(t, r) {
        if (!E.o.initialized)
          return void (0, b.A)(
            Y,
            'Glean must be initialized before submitting pings.',
            b.q.Info
          );
        if (!E.o.uploadEnabled && this.name !== M.OM)
          return void (0, b.A)(
            Y,
            'Glean disabled: not submitting pings. Glean may still submit the deletion-request ping.',
            b.q.Info
          );
        let n = t;
        (t &&
          !this.reasonCodes.includes(t) &&
          ((0, b.A)(
            Y,
            `Invalid reason code ${t} from ${this.name}. Ignoring.`,
            b.q.Warn
          ),
          (n = void 0)),
          X((0, x.Z3)(), this, n),
          r &&
            (r(),
            (this.resolveTestPromiseFunction = void 0),
            (this.rejectTestPromiseFunction = void 0),
            (this.testCallback = void 0)));
      }
      async testBeforeNextSubmit(t) {
        if ((0, x.xU)('testBeforeNextSubmit', Y))
          return this.testCallback
            ? void (0, b.A)(
                Y,
                `There is an existing test call for ping "${this.name}". Ignoring.`,
                b.q.Error
              )
            : new Promise((r, n) => {
                ((this.resolveTestPromiseFunction = r),
                  (this.rejectTestPromiseFunction = n),
                  (this.testCallback = t));
              });
      }
    };
    new WeakMap();
    let CorePings = class CorePings {
      constructor() {
        ((this.deletionRequest = new InternalPingType({
          name: M.OM,
          includeClientId: !0,
          sendIfEmpty: !0,
          reasonCodes: ['at_init', 'set_upload_enabled']
        })),
          (this.events = new InternalPingType({
            name: 'events',
            includeClientId: !0,
            sendIfEmpty: !1,
            reasonCodes: ['startup', 'max_capacity']
          })));
      }
    };
    let Q = 'core.Metrics.Database',
      ee = 'reserved#',
      et = `glean.${ee}`;
    let MetricsDatabase = class MetricsDatabase {
      constructor() {
        ((this.userStore = new E.o.platform.Storage('userLifetimeMetrics')),
          (this.pingStore = new E.o.platform.Storage('pingLifetimeMetrics')),
          (this.appStore = new E.o.platform.Storage('appLifetimeMetrics')));
      }
      record(t, r) {
        this.transform(t, () => r);
      }
      transform(t, r) {
        if (t.disabled) return;
        let n = this.chooseStore(t.lifetime),
          s = t.identifier();
        for (let a of t.sendInPings) {
          let o = t => r(t).get();
          n.update([a, t.type, s], o);
        }
      }
      hasMetric(t, r, n, s) {
        let a = this.chooseStore(t).get([r, n, s]);
        return !(0, x.b0)(a);
      }
      countByBaseIdentifier(t, r, n, s) {
        let a = this.chooseStore(t).get([r, n]);
        return (0, x.b0)(a)
          ? 0
          : Object.keys(a).filter(t => t.startsWith(s)).length;
      }
      getMetric(t, r) {
        let n = this.chooseStore(r.lifetime),
          s = r.identifier(),
          a = n.get([t, r.type, s]);
        if ((0, x.b0)(a) || (0, j.LE)(r.type, a)) return a;
        ((0, b.A)(
          Q,
          `Unexpected value found for metric ${s}: ${JSON.stringify(a)}. Clearing.`,
          b.q.Error
        ),
          n.delete([t, r.type, s]));
      }
      getPingMetrics(t, r) {
        let n = this.getCorrectedPingData(t, 'user'),
          s = this.getCorrectedPingData(t, 'ping'),
          a = this.getCorrectedPingData(t, 'application');
        r && Object.keys(s).length > 0 && this.clear('ping', t);
        let o = {};
        for (let t of [n, s, a])
          for (let r in t)
            for (let n in t[r])
              n.startsWith(et) ||
                (n.includes('/')
                  ? this.processLabeledMetric(o, r, n, t[r][n])
                  : (o[r] = { ...o[r], [n]: t[r][n] }));
        if (0 !== Object.keys(o).length) {
          let t = {};
          for (let r in o) {
            let n = o[r];
            for (let s in ((t[r] = {}), n)) {
              let a = (0, j.Hp)(r, n[s]);
              t[r][s] = a.payload();
            }
          }
          return t;
        }
      }
      clear(t, r) {
        this.chooseStore(t).delete(r ? [r] : []);
      }
      clearAll() {
        (this.userStore.delete([]),
          this.pingStore.delete([]),
          this.appStore.delete([]));
      }
      chooseStore(t) {
        switch (t) {
          case 'user':
            return this.userStore;
          case 'ping':
            return this.pingStore;
          case 'application':
            return this.appStore;
        }
      }
      getCorrectedPingData(t, r) {
        let n = this.chooseStore(r),
          s = n.get([t]);
        if ((0, x.b0)(s)) return {};
        if (!(0, x.Gv)(s))
          return (
            (0, b.A)(
              Q,
              `Invalid value found in storage for ping "${t}". Deleting.`,
              b.q.Debug
            ),
            n.delete([t]),
            {}
          );
        let a = {};
        for (let r in s) {
          let o = s[r];
          if (!(0, x.Gv)(o)) {
            ((0, b.A)(
              Q,
              `Unexpected data found in storage for metrics of type "${r}" in ping "${t}". Deleting.`,
              b.q.Debug
            ),
              n.delete([t, r]));
            continue;
          }
          for (let s in o) {
            if (!(0, j.LE)(r, o[s])) {
              ((0, b.A)(
                Q,
                `Invalid value "${JSON.stringify(o[s])}" found in storage for metric "${s}". Deleting.`,
                b.q.Debug
              ),
                n.delete([t, r, s]));
              continue;
            }
            (a[r] || (a[r] = {}), (a[r][s] = o[s]));
          }
        }
        return a;
      }
      processLabeledMetric(t, r, n, s) {
        let a = `labeled_${r}`,
          o = n.split('/', 2),
          l = o[0],
          c = o[1];
        if (a in t && l in t[a]) {
          let r = t[a][l];
          t[a][l] = { ...r, [c]: s };
        } else t[a] = { ...t[a], [l]: { [c]: s } };
      }
    };
    var ei = n(40351),
      er = n(67867),
      en = n(82006);
    let es = 'core.Metric.EventsDatabase';
    function ea(t, r = E.o.startTime) {
      ec(t).record({ [M.zh]: r.toISOString() }, 0);
    }
    function eo(t) {
      (0, x.Kg)(t) || (t = '');
      let r = new Date(t);
      if (isNaN(r.getTime()))
        throw Error(
          `Error attempting to generate Date object from string: ${t}`
        );
      return r;
    }
    function el(t) {
      return new InternalCounterMetricType({
        ...{ category: 'glean', name: `${ee}execution_counter` },
        sendInPings: t.filter(t => 'events' !== t),
        lifetime: 'ping',
        disabled: !1
      });
    }
    function ec(t) {
      return new er.C(
        {
          category: 'glean',
          name: 'restarted',
          sendInPings: t.filter(t => 'events' !== t),
          lifetime: 'ping',
          disabled: !1
        },
        [M.zh]
      );
    }
    let EventsDatabase = class EventsDatabase {
      constructor() {
        ((this.initialized = !1),
          (this.eventsStore = new E.o.platform.Storage('events')));
      }
      initialize() {
        var t;
        if (this.initialized) return;
        let r = this.getAvailableStoreNames();
        if (r.includes('events')) {
          let r = null != (t = this.eventsStore.get(['events'])) ? t : [];
          r.length > 0 &&
            r.length >= E.o.config.maxEvents &&
            E.o.corePings.events.submit('startup');
        }
        (el(r).add(1), ea(r), (this.initialized = !0));
      }
      record(t, r) {
        if (!t.disabled)
          for (let n of t.sendInPings) {
            let t = el([n]),
              s = E.o.metricsDatabase.getMetric(n, t);
            (s || (t.add(1), (s = 1), ea([n], new Date())),
              r.addExtra(M.HT, s));
            let a = 0,
              o = t => {
                let n = null != t ? t : [];
                return (n.push(r.get()), (a = n.length), n);
              };
            (this.eventsStore.update([n], o),
              'events' === n &&
                a >= E.o.config.maxEvents &&
                E.o.corePings.events.submit('max_capacity'));
          }
      }
      getEvents(t, r) {
        let n = this.getAndValidatePingData(t);
        if (0 !== n.length)
          return n
            .filter(
              t => t.get().category === r.category && t.get().name === r.name
            )
            .map(t => t.withoutReservedExtras());
      }
      getPingEvents(t, r) {
        let n = this.getAndValidatePingData(t);
        if (
          (r && Object.keys(n).length > 0 && this.eventsStore.delete([t]),
          0 === n.length)
        )
          return;
        let s = this.prepareEventsPayload(t, n);
        if (s.length > 0) return s;
      }
      clearAll() {
        this.eventsStore.delete([]);
      }
      getAvailableStoreNames() {
        let t = this.eventsStore.get([]);
        return (0, x.b0)(t) ? [] : Object.keys(t);
      }
      getAndValidatePingData(t) {
        let r = this.eventsStore.get([t]);
        return (0, x.b0)(r)
          ? []
          : Array.isArray(r)
            ? r.reduce((t, r) => {
                try {
                  let n = new en.j(r);
                  return [...t, n];
                } catch (n) {
                  return (
                    (0, b.A)(
                      es,
                      `Unexpected data found in events storage: ${JSON.stringify(r)}. Ignoring.`
                    ),
                    t
                  );
                }
              }, [])
            : ((0, b.A)(
                es,
                `Unexpected value found for ping ${t}: ${JSON.stringify(r)}. Clearing.`,
                b.q.Error
              ),
              this.eventsStore.delete([t]),
              []);
      }
      prepareEventsPayload(t, r) {
        var n, s, a, o;
        let l,
          c = r.sort((t, r) => {
            var n, s;
            let a = Number(null == (n = t.get().extra) ? void 0 : n[M.HT]),
              o = Number(null == (s = r.get().extra) ? void 0 : s[M.HT]);
            return a !== o ? a - o : t.get().timestamp - r.get().timestamp;
          });
        try {
          ((l = eo(null == (n = c[0].get().extra) ? void 0 : n[M.zh])),
            c.shift());
        } catch (t) {
          l = E.o.startTime;
        }
        let d = (null == (s = c[0]) ? void 0 : s.get().timestamp) || 0,
          u = 0;
        for (let [r, n] of c.entries()) {
          let s;
          try {
            let s = eo(null == (a = n.get().extra) ? void 0 : a[M.zh]),
              o = s.getTime() - l.getTime();
            l = s;
            let d = u + o,
              h = c[r - 1].get().timestamp;
            d <= h
              ? ((u = h + 1),
                E.o.errorManager.record(
                  ec([t]),
                  ei.B.InvalidValue,
                  `Invalid time offset between application sessions found for ping "${t}". Ignoring.`
                ))
              : (u = d);
          } catch (t) {}
          ((s =
            1 === Number((null == (o = n.get().extra) ? void 0 : o[M.HT]) || 1)
              ? n.get().timestamp - d
              : n.get().timestamp + u),
            (c[r] = new en.j({
              category: n.get().category,
              name: n.get().name,
              timestamp: s,
              extra: n.get().extra
            })));
        }
        return (c = (function (t) {
          for (
            var r, n, s;
            t.length &&
            (null ==
            (s =
              null == (n = null == (r = t[t.length - 1]) ? void 0 : r.get())
                ? void 0
                : n.extra)
              ? void 0
              : s[M.zh]);
          )
            t.pop();
          return t;
        })(c)).map(t => t.payload());
      }
    };
    var ed = n(84592);
    function eu(t, r) {
      let n = t.baseIdentifier(),
        s = (0, ed.X3)(n);
      return new InternalCounterMetricType({
        name: (0, ed.Uh)(r, s),
        category: 'glean.error',
        lifetime: 'ping',
        sendInPings: t.sendInPings,
        disabled: !1
      });
    }
    let ErrorManager = class ErrorManager {
      record(t, r, n, s = 1) {
        let a,
          o = eu(t, r);
        ((0, b.A)(
          ((a = t.type.charAt(0).toUpperCase() + t.type.slice(1)),
          `core.metrics.${a}`),
          [`${t.baseIdentifier()}:`, n]
        ),
          s > 0 && o.add(s));
      }
      testGetNumRecordedErrors(t, r, n) {
        return eu(t, r).testGetValue(n) || 0;
      }
    };
    var eh = n(34388);
    let ep = 'core.Glean';
    (((d = f || (f = {})).DebugTag = 'DebugTag'),
      (d.SourceTags = 'SourceTags'),
      (d.LogPings = 'LogPings'));
    let eg = (t, r) => {
        let n = `Glean.${t.toString()}`;
        try {
          switch (t) {
            case f.DebugTag:
              sessionStorage.setItem(n, r);
              break;
            case f.LogPings:
              sessionStorage.setItem(n, r.toString());
              break;
            case f.SourceTags:
              sessionStorage.setItem(n, r.join(','));
          }
        } catch (t) {
          console.warn(t);
        }
      },
      ef = t => {
        try {
          return sessionStorage.getItem(`Glean.${t.toString()}`) || void 0;
        } catch (t) {
          console.warn(t);
          return;
        }
      };
    !(function (t) {
      function r() {
        ((E.o.uploadEnabled = !0), t.pingUploader.resumeUploads());
      }
      function n(t) {
        ((E.o.uploadEnabled = !1),
          E.o.corePings.deletionRequest.submit(
            t ? 'at_init' : 'set_upload_enabled'
          ),
          s());
      }
      function s() {
        let r;
        t.pingUploader.clearPendingPingsQueue();
        try {
          r = new DatetimeMetric(
            E.o.metricsDatabase.getMetric(M.Tv, E.o.coreMetrics.firstRunDate)
          ).date;
        } catch (t) {
          r = new Date();
        }
        (E.o.eventsDatabase.clearAll(),
          E.o.metricsDatabase.clearAll(),
          E.o.pingsDatabase.clearAll(),
          (E.o.uploadEnabled = !0),
          E.o.coreMetrics.clientId.set(M.Kp),
          E.o.coreMetrics.firstRunDate.set(r),
          (E.o.uploadEnabled = !1));
      }
      ((t.initialize = function (a, o, l) {
        let c, d, u;
        if (E.o.initialized)
          return void (0, b.A)(
            ep,
            'Attempted to initialize Glean, but it has already been initialized. Ignoring.',
            b.q.Warn
          );
        if (!(0, x.Kg)(a))
          return void (0, b.A)(
            ep,
            'Unable to initialize Glean, applicationId must be a string.',
            b.q.Error
          );
        if (!(0, x.Lm)(o))
          return void (0, b.A)(
            ep,
            'Unable to initialize Glean, uploadEnabled must be a boolean.',
            b.q.Error
          );
        if (0 === a.length)
          return void (0, b.A)(
            ep,
            'Unable to initialize Glean, applicationId cannot be an empty string.',
            b.q.Error
          );
        if (!E.o.platform)
          return void (0, b.A)(
            ep,
            'Unable to initialize Glean, platform has not been set.',
            b.q.Error
          );
        if (
          ((E.o.coreMetrics = new CoreMetrics()),
          (E.o.corePings = new CorePings()),
          (E.o.applicationId = (0, x.zn)(a)),
          (E.o.config = new Configuration(l)),
          (c = ef(f.LogPings)) && (t.preInitLogPings = (0, x.PK)(c)),
          (d = ef(f.DebugTag)) && (t.preInitDebugViewTag = d),
          (u = ef(f.SourceTags)) && (t.preInitSourceTags = u.split(',')),
          t.preInitLogPings && (E.o.config.logPings = t.preInitLogPings),
          t.preInitDebugViewTag &&
            (E.o.config.debugViewTag = t.preInitDebugViewTag),
          t.preInitSourceTags && (E.o.config.sourceTags = t.preInitSourceTags),
          (E.o.metricsDatabase = new MetricsDatabase()),
          (E.o.eventsDatabase = new EventsDatabase()),
          (E.o.pingsDatabase = new PingsDatabase()),
          (E.o.errorManager = new ErrorManager()),
          (t.pingUploader = new PingUploadManager(
            E.o.config,
            E.o.pingsDatabase
          )),
          (E.o.initialized = !0),
          (E.o.uploadEnabled = o),
          E.o.eventsDatabase.initialize(),
          o)
        )
          (E.o.metricsDatabase.clear('application'),
            r(),
            E.o.coreMetrics.initialize(),
            (null == l ? void 0 : l.enableAutoPageLoadEvents) &&
              eh.A.pageLoad(),
            (null == l ? void 0 : l.enableAutoElementClickEvents) &&
              document.addEventListener('click', t => {
                eh.A.handleClickEvent(t);
              }));
        else {
          let t = E.o.metricsDatabase.getMetric(M.Tv, E.o.coreMetrics.clientId);
          t ? t !== M.Kp && n(!0) : s();
        }
        E.o.pingsDatabase.scanPendingPings();
      }),
        (t.setUploadEnabled = function (t) {
          E.o.initialized
            ? (0, x.Lm)(t)
              ? E.o.uploadEnabled !== t &&
                (t ? (r(), E.o.coreMetrics.initialize()) : n(!1))
              : (0, b.A)(
                  ep,
                  'Unable to change upload state, new value must be a boolean. Ignoring.',
                  b.q.Error
                )
            : (0, b.A)(
                ep,
                [
                  'Changing upload enabled before Glean is initialized is not supported.\n',
                  'Pass the correct state into `initialize`.\n',
                  'See documentation at https://mozilla.github.io/glean/book/user/general-api.html#initializing-the-glean-sdk`'
                ],
                b.q.Error
              );
        }),
        (t.setExperimentationId = function (t) {
          E.o.config.experimentationId = t;
        }),
        (t.setLogPings = function (r) {
          E.o.initialized ? (E.o.config.logPings = r) : (t.preInitLogPings = r);
        }),
        (t.setDebugViewTag = function (r) {
          E.o.initialized
            ? (E.o.config.debugViewTag = r)
            : (t.preInitDebugViewTag = r);
        }),
        (t.setSourceTags = function (r) {
          E.o.initialized
            ? (E.o.config.sourceTags = r)
            : (t.preInitSourceTags = r);
        }),
        (t.setPlatform = function (t) {
          E.o.initialized ||
            (E.o.isPlatformSet() &&
              E.o.platform.name !== t.name &&
              !E.o.testing &&
              (0, b.A)(
                ep,
                [
                  `IMPOSSIBLE: Attempted to change Glean's targeted platform",
            "from "${E.o.platform.name}" to "${t.name}". Ignoring.`
                ],
                b.q.Error
              ),
            (E.o.platform = t));
        }));
    })(m || (m = {}));
    let em = !1;
    try {
      em = 'u' > typeof window && void 0 !== window.sessionStorage;
    } catch (t) {
      console.error('No session storage available', t);
    }
    em &&
      (window.Glean = {
        setLogPings: t => {
          (eg(f.LogPings, t),
            m.setLogPings(t),
            console.log(
              'Pings will be logged to the console until this tab is closed.'
            ));
        },
        setDebugViewTag: t => {
          (eg(f.DebugTag, t),
            m.setDebugViewTag(t),
            console.log(
              'Pings will be sent to the Debug Ping Viewer until this tab is closed. Pings can be found here: https://debug-ping-preview.firebaseapp.com/.'
            ));
        },
        setSourceTags: t => {
          (eg(f.SourceTags, t),
            m.setSourceTags(t),
            console.log(
              'Pings will be given the specified tags until the tab is closed.'
            ));
        },
        debugSession: () => {
          let t = E.o.metricsDatabase.getMetric(
            M.Tv,
            E.o.coreMetrics.sessionId
          );
          t && 'string' == typeof t && E.o.config.debugViewTag
            ? window.open(
                `https://debug-ping-preview.firebaseapp.com/stream/${E.o.config.debugViewTag}#${t}`,
                '_blank'
              )
            : console.info(
                'You must set a debug tag via `window.Glean.setDebugViewTag` before debugging your session.'
              );
        }
      });
    let ey = m,
      eb =
        ((s = {
          Storage: WebStore,
          uploader: T,
          info: {
            os() {
              let t;
              return (t =
                navigator && navigator.userAgent
                  ? navigator.userAgent
                  : 'Unknown').includes('Windows')
                ? 'Windows'
                : /tvOS/i.test(t)
                  ? 'TvOS'
                  : /Watch( OS)?/i.test(t)
                    ? 'WatchOS'
                    : /iPhone|iPad|iOS/i.test(t)
                      ? 'iOS'
                      : /Mac OS X|macOS/i.test(t)
                        ? 'Darwin'
                        : /Android/i.test(t)
                          ? 'Android'
                          : /CrOS/i.test(t)
                            ? 'ChromeOS'
                            : /WebOS/i.test(t)
                              ? 'WebOS'
                              : /Linux/i.test(t)
                                ? 'Linux'
                                : /OpenBSD/i.test(t)
                                  ? 'OpenBSD'
                                  : /FreeBSD/i.test(t)
                                    ? 'FreeBSD'
                                    : /NetBSD/i.test(t)
                                      ? 'NetBSD'
                                      : /SunOS/i.test(t)
                                        ? 'SunOS'
                                        : /AIX/i.test(t)
                                          ? 'IBM_AIX'
                                          : 'Unknown';
            },
            osVersion: () => 'Unknown',
            arch: () => 'Unknown',
            locale: () =>
              navigator && navigator.language ? navigator.language : 'und'
          },
          timer: { setTimeout, clearTimeout },
          name: 'web'
        }),
        {
          initialize(t, r, n) {
            (ey.setPlatform(s), ey.initialize(t, r, n));
          },
          setUploadEnabled(t) {
            ey.setUploadEnabled(t);
          },
          setLogPings(t) {
            ey.setLogPings(t);
          },
          setDebugViewTag(t) {
            ey.setDebugViewTag(t);
          },
          setSourceTags(t) {
            ey.setSourceTags(t);
          }
        });
  },
  18504(t, r, n) {
    let { I: s } = n(36752).ge,
      a = {};
    n.d(
      r,
      {},
      {
        Rt: t => void 0 === t.strings,
        mY: (t, r = a) => (t._$AH = r),
        ps: t => null != t?._$litType$?.h,
        qb: (t, r) =>
          void 0 === r ? void 0 !== t?._$litType$ : t?._$litType$ === r,
        sO: t => null === t || ('object' != typeof t && 'function' != typeof t)
      }
    );
  },
  7804(t, r, n) {
    let i = class i {
      constructor(t) {}
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AT(t, r, n) {
        ((this._$Ct = t), (this._$AM = r), (this._$Ci = n));
      }
      _$AS(t, r) {
        return this.update(t, r);
      }
      update(t, r) {
        return this.render(...r);
      }
    };
    n.d(
      r,
      { WL: () => i },
      {
        OA: {
          ATTRIBUTE: 1,
          CHILD: 2,
          PROPERTY: 3,
          BOOLEAN_ATTRIBUTE: 4,
          EVENT: 5,
          ELEMENT: 6
        },
        u$:
          t =>
          (...r) => ({ _$litDirective$: t, values: r })
      }
    );
  },
  36752(t, r, n) {
    let s = globalThis,
      a = t => t,
      o = s.trustedTypes,
      l = o ? o.createPolicy('lit-html', { createHTML: t => t }) : void 0,
      c = '$lit$',
      d = `lit$${Math.random().toFixed(9).slice(2)}$`,
      u = '?' + d,
      h = `<${u}>`,
      p = document,
      g = () => p.createComment(''),
      f = t => null === t || ('object' != typeof t && 'function' != typeof t),
      m = Array.isArray,
      b = t => m(t) || 'function' == typeof t?.[Symbol.iterator],
      v = '[ 	\n\f\r]',
      w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
      $ = /-->/g,
      _ = />/g,
      E = RegExp(
        `>|${v}(?:([^\\s"'>=/]+)(${v}*=${v}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
        'g'
      ),
      A = /'/g,
      T = /"/g,
      x = /^(?:script|style|textarea|title)$/i,
      P =
        t =>
        (r, ...n) => ({ _$litType$: t, strings: r, values: n }),
      M = P(1),
      D = P(2),
      C = Symbol.for('lit-noChange'),
      U = Symbol.for('lit-nothing'),
      O = new WeakMap(),
      N = p.createTreeWalker(p, 129);
    function q(t, r) {
      if (!m(t) || !t.hasOwnProperty('raw'))
        throw Error('invalid template strings array');
      return void 0 !== l ? l.createHTML(r) : r;
    }
    let B = (t, r) => {
      let n = t.length - 1,
        s = [],
        a,
        o = 2 === r ? '<svg>' : 3 === r ? '<math>' : '',
        l = w;
      for (let r = 0; r < n; r++) {
        let n = t[r],
          u,
          p,
          g = -1,
          f = 0;
        for (; f < n.length && ((l.lastIndex = f), null !== (p = l.exec(n)));)
          ((f = l.lastIndex),
            l === w
              ? '!--' === p[1]
                ? (l = $)
                : void 0 !== p[1]
                  ? (l = _)
                  : void 0 !== p[2]
                    ? (x.test(p[2]) && (a = RegExp('</' + p[2], 'g')), (l = E))
                    : void 0 !== p[3] && (l = E)
              : l === E
                ? '>' === p[0]
                  ? ((l = a ?? w), (g = -1))
                  : void 0 === p[1]
                    ? (g = -2)
                    : ((g = l.lastIndex - p[2].length),
                      (u = p[1]),
                      (l = void 0 === p[3] ? E : '"' === p[3] ? T : A))
                : l === T || l === A
                  ? (l = E)
                  : l === $ || l === _
                    ? (l = w)
                    : ((l = E), (a = void 0)));
        let m = l === E && t[r + 1].startsWith('/>') ? ' ' : '';
        o +=
          l === w
            ? n + h
            : g >= 0
              ? (s.push(u), n.slice(0, g) + c + n.slice(g) + d + m)
              : n + d + (-2 === g ? r : m);
      }
      return [
        q(
          t,
          o + (t[n] || '<?>') + (2 === r ? '</svg>' : 3 === r ? '</math>' : '')
        ),
        s
      ];
    };
    let S = class S {
      constructor({ strings: t, _$litType$: r }, n) {
        let s;
        this.parts = [];
        let a = 0,
          l = 0,
          h = t.length - 1,
          p = this.parts,
          [f, m] = B(t, r);
        if (
          ((this.el = S.createElement(f, n)),
          (N.currentNode = this.el.content),
          2 === r || 3 === r)
        ) {
          let t = this.el.content.firstChild;
          t.replaceWith(...t.childNodes);
        }
        for (; null !== (s = N.nextNode()) && p.length < h;) {
          if (1 === s.nodeType) {
            if (s.hasAttributes())
              for (let t of s.getAttributeNames())
                if (t.endsWith(c)) {
                  let r = m[l++],
                    n = s.getAttribute(t).split(d),
                    o = /([.?@])?(.*)/.exec(r);
                  (p.push({
                    type: 1,
                    index: a,
                    name: o[2],
                    strings: n,
                    ctor:
                      '.' === o[1] ? I : '?' === o[1] ? L : '@' === o[1] ? z : H
                  }),
                    s.removeAttribute(t));
                } else
                  t.startsWith(d) &&
                    (p.push({ type: 6, index: a }), s.removeAttribute(t));
            if (x.test(s.tagName)) {
              let t = s.textContent.split(d),
                r = t.length - 1;
              if (r > 0) {
                s.textContent = o ? o.emptyScript : '';
                for (let n = 0; n < r; n++)
                  (s.append(t[n], g()),
                    N.nextNode(),
                    p.push({ type: 2, index: ++a }));
                s.append(t[r], g());
              }
            }
          } else if (8 === s.nodeType)
            if (s.data === u) p.push({ type: 2, index: a });
            else {
              let t = -1;
              for (; -1 !== (t = s.data.indexOf(d, t + 1));)
                (p.push({ type: 7, index: a }), (t += d.length - 1));
            }
          a++;
        }
      }
      static createElement(t, r) {
        let n = p.createElement('template');
        return ((n.innerHTML = t), n);
      }
    };
    function V(t, r, n = t, s) {
      if (r === C) return r;
      let a = void 0 !== s ? n._$Co?.[s] : n._$Cl,
        o = f(r) ? void 0 : r._$litDirective$;
      return (
        a?.constructor !== o &&
          (a?._$AO?.(!1),
          void 0 === o ? (a = void 0) : (a = new o(t))._$AT(t, n, s),
          void 0 !== s ? ((n._$Co ??= [])[s] = a) : (n._$Cl = a)),
        void 0 !== a && (r = V(t, a._$AS(t, r.values), a, s)),
        r
      );
    }
    let R = class R {
      constructor(t, r) {
        ((this._$AV = []),
          (this._$AN = void 0),
          (this._$AD = t),
          (this._$AM = r));
      }
      get parentNode() {
        return this._$AM.parentNode;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      u(t) {
        let {
            el: { content: r },
            parts: n
          } = this._$AD,
          s = (t?.creationScope ?? p).importNode(r, !0);
        N.currentNode = s;
        let a = N.nextNode(),
          o = 0,
          l = 0,
          c = n[0];
        for (; void 0 !== c;) {
          if (o === c.index) {
            let r;
            (2 === c.type
              ? (r = new k(a, a.nextSibling, this, t))
              : 1 === c.type
                ? (r = new c.ctor(a, c.name, c.strings, this, t))
                : 6 === c.type && (r = new Z(a, this, t)),
              this._$AV.push(r),
              (c = n[++l]));
          }
          o !== c?.index && ((a = N.nextNode()), o++);
        }
        return ((N.currentNode = p), s);
      }
      p(t) {
        let r = 0;
        for (let n of this._$AV)
          (void 0 !== n &&
            (void 0 !== n.strings
              ? (n._$AI(t, n, r), (r += n.strings.length - 2))
              : n._$AI(t[r])),
            r++);
      }
    };
    let k = class k {
      get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
      }
      constructor(t, r, n, s) {
        ((this.type = 2),
          (this._$AH = U),
          (this._$AN = void 0),
          (this._$AA = t),
          (this._$AB = r),
          (this._$AM = n),
          (this.options = s),
          (this._$Cv = s?.isConnected ?? !0));
      }
      get parentNode() {
        let t = this._$AA.parentNode,
          r = this._$AM;
        return (void 0 !== r && 11 === t?.nodeType && (t = r.parentNode), t);
      }
      get startNode() {
        return this._$AA;
      }
      get endNode() {
        return this._$AB;
      }
      _$AI(t, r = this) {
        f((t = V(this, t, r)))
          ? t === U || null == t || '' === t
            ? (this._$AH !== U && this._$AR(), (this._$AH = U))
            : t !== this._$AH && t !== C && this._(t)
          : void 0 !== t._$litType$
            ? this.$(t)
            : void 0 !== t.nodeType
              ? this.T(t)
              : b(t)
                ? this.k(t)
                : this._(t);
      }
      O(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
      }
      T(t) {
        this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)));
      }
      _(t) {
        (this._$AH !== U && f(this._$AH)
          ? (this._$AA.nextSibling.data = t)
          : this.T(p.createTextNode(t)),
          (this._$AH = t));
      }
      $(t) {
        let { values: r, _$litType$: n } = t,
          s =
            'number' == typeof n
              ? this._$AC(t)
              : (void 0 === n.el &&
                  (n.el = S.createElement(q(n.h, n.h[0]), this.options)),
                n);
        if (this._$AH?._$AD === s) this._$AH.p(r);
        else {
          let t = new R(s, this),
            n = t.u(this.options);
          (t.p(r), this.T(n), (this._$AH = t));
        }
      }
      _$AC(t) {
        let r = O.get(t.strings);
        return (void 0 === r && O.set(t.strings, (r = new S(t))), r);
      }
      k(t) {
        m(this._$AH) || ((this._$AH = []), this._$AR());
        let r = this._$AH,
          n,
          s = 0;
        for (let a of t)
          (s === r.length
            ? r.push((n = new k(this.O(g()), this.O(g()), this, this.options)))
            : (n = r[s]),
            n._$AI(a),
            s++);
        s < r.length && (this._$AR(n && n._$AB.nextSibling, s), (r.length = s));
      }
      _$AR(t = this._$AA.nextSibling, r) {
        for (this._$AP?.(!1, !0, r); t !== this._$AB;) {
          let r = a(t).nextSibling;
          (a(t).remove(), (t = r));
        }
      }
      setConnected(t) {
        void 0 === this._$AM && ((this._$Cv = t), this._$AP?.(t));
      }
    };
    let H = class H {
      get tagName() {
        return this.element.tagName;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      constructor(t, r, n, s, a) {
        ((this.type = 1),
          (this._$AH = U),
          (this._$AN = void 0),
          (this.element = t),
          (this.name = r),
          (this._$AM = s),
          (this.options = a),
          n.length > 2 || '' !== n[0] || '' !== n[1]
            ? ((this._$AH = Array(n.length - 1).fill(new String())),
              (this.strings = n))
            : (this._$AH = U));
      }
      _$AI(t, r = this, n, s) {
        let a = this.strings,
          o = !1;
        if (void 0 === a)
          (o = !f((t = V(this, t, r, 0))) || (t !== this._$AH && t !== C)) &&
            (this._$AH = t);
        else {
          let s,
            l,
            c = t;
          for (t = a[0], s = 0; s < a.length - 1; s++)
            ((l = V(this, c[n + s], r, s)) === C && (l = this._$AH[s]),
              (o ||= !f(l) || l !== this._$AH[s]),
              l === U ? (t = U) : t !== U && (t += (l ?? '') + a[s + 1]),
              (this._$AH[s] = l));
        }
        o && !s && this.j(t);
      }
      j(t) {
        t === U
          ? this.element.removeAttribute(this.name)
          : this.element.setAttribute(this.name, t ?? '');
      }
    };
    let I = class I extends H {
      constructor() {
        (super(...arguments), (this.type = 3));
      }
      j(t) {
        this.element[this.name] = t === U ? void 0 : t;
      }
    };
    let L = class L extends H {
      constructor() {
        (super(...arguments), (this.type = 4));
      }
      j(t) {
        this.element.toggleAttribute(this.name, !!t && t !== U);
      }
    };
    let z = class z extends H {
      constructor(t, r, n, s, a) {
        (super(t, r, n, s, a), (this.type = 5));
      }
      _$AI(t, r = this) {
        if ((t = V(this, t, r, 0) ?? U) === C) return;
        let n = this._$AH,
          s =
            (t === U && n !== U) ||
            t.capture !== n.capture ||
            t.once !== n.once ||
            t.passive !== n.passive,
          a = t !== U && (n === U || s);
        (s && this.element.removeEventListener(this.name, this, n),
          a && this.element.addEventListener(this.name, this, t),
          (this._$AH = t));
      }
      handleEvent(t) {
        'function' == typeof this._$AH
          ? this._$AH.call(this.options?.host ?? this.element, t)
          : this._$AH.handleEvent(t);
      }
    };
    let Z = class Z {
      constructor(t, r, n) {
        ((this.element = t),
          (this.type = 6),
          (this._$AN = void 0),
          (this._$AM = r),
          (this.options = n));
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AI(t) {
        V(this, t);
      }
    };
    let G = s.litHtmlPolyfillSupport;
    (G?.(S, k),
      (s.litHtmlVersions ??= []).push('3.3.3'),
      n.d(
        r,
        {},
        {
          JW: D,
          XX: (t, r, n) => {
            let s = n?.renderBefore ?? r,
              a = s._$litPart$;
            if (void 0 === a) {
              let t = n?.renderBefore ?? null;
              s._$litPart$ = a = new k(
                r.insertBefore(g(), t),
                t,
                void 0,
                n ?? {}
              );
            }
            return (a._$AI(t), a);
          },
          c0: C,
          ge: {
            M: c,
            P: d,
            A: u,
            C: 1,
            L: B,
            R,
            D: b,
            V: V,
            I: k,
            H,
            N: L,
            U: z,
            B: I,
            F: Z
          },
          qy: M,
          s6: U
        }
      ));
  },
  12477(t, r, n) {
    n.d(r, { J: () => a });
    var s = n(36752);
    let a = t => t ?? s.s6;
  },
  76722(t, r, n) {
    n.d(r, { _: () => o });
    var s = n(36752),
      a = n(7804);
    let e = class e extends a.WL {
      constructor(t) {
        if ((super(t), (this.it = s.s6), t.type !== a.OA.CHILD))
          throw Error(
            this.constructor.directiveName +
              '() can only be used in child bindings'
          );
      }
      render(t) {
        if (t === s.s6 || null == t) return ((this._t = void 0), (this.it = t));
        if (t === s.c0) return t;
        if ('string' != typeof t)
          throw Error(
            this.constructor.directiveName + '() called with a non-string value'
          );
        if (t === this.it) return this._t;
        this.it = t;
        let r = [t];
        return (
          (r.raw = r),
          (this._t = {
            _$litType$: this.constructor.resultType,
            strings: r,
            values: []
          })
        );
      }
    };
    ((e.directiveName = 'unsafeHTML'), (e.resultType = 1));
    let o = (0, a.u$)(e);
  },
  22009(t, r, n) {
    n.d(r, {
      WF: () => i,
      AH: () => s.AH,
      qy: () => a.qy,
      s6: () => a.s6,
      JW: () => a.JW
    });
    var s = n(85675),
      a = n(36752);
    let o = globalThis;
    let i = class i extends s.mN {
      constructor() {
        (super(...arguments),
          (this.renderOptions = { host: this }),
          (this._$Do = void 0));
      }
      createRenderRoot() {
        let t = super.createRenderRoot();
        return ((this.renderOptions.renderBefore ??= t.firstChild), t);
      }
      update(t) {
        let r = this.render();
        (this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
          super.update(t),
          (this._$Do = (0, a.XX)(r, this.renderRoot, this.renderOptions)));
      }
      connectedCallback() {
        (super.connectedCallback(), this._$Do?.setConnected(!0));
      }
      disconnectedCallback() {
        (super.disconnectedCallback(), this._$Do?.setConnected(!1));
      }
      render() {
        return a.c0;
      }
    };
    ((i._$litElement$ = !0),
      (i.finalized = !0),
      o.litElementHydrateSupport?.({ LitElement: i }));
    let l = o.litElementPolyfillSupport;
    (l?.({ LitElement: i }), (o.litElementVersions ??= []).push('4.2.0'));
  }
};
//# sourceMappingURL=4585.c86502bf8c0611c2.js.map
