export const __rspack_esm_id = 6375;
export const __rspack_esm_ids = [6375];
export const __webpack_modules__ = {
  29082(e, t, r) {
    r.r(t);
    var n,
      a = Object.defineProperty,
      i = e => {
        throw TypeError(e);
      },
      s = (e, t) => {
        for (var r in t) a(e, r, { get: t[r], enumerable: !0 });
      },
      o = (e, t, r) => {
        let n;
        return (n = 'symbol' != typeof t ? t + '' : t) in e
          ? a(e, n, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: r
            })
          : (e[n] = r);
      },
      l = (e, t, r) => (
        t.has(e) || i('Cannot read from private field'),
        r ? r.call(e) : t.get(e)
      ),
      c = {};
    s(c, {
      languages: () => r5,
      options: () => r9,
      parsers: () => r8,
      printers: () => nx
    });
    var u =
        (e, t) =>
        (r, n, ...a) =>
          1 | r && null == n ? void 0 : (t.call(n) ?? n[e]).apply(n, a),
      p =
        String.prototype.replaceAll ??
        function (e, t) {
          return e.global ? this.replace(e, t) : this.split(e).join(t);
        },
      h = u('replaceAll', function () {
        if ('string' == typeof this) return p;
      });
    function d(e) {
      return this[e < 0 ? this.length + e : e];
    }
    var m = u('at', function () {
        if (Array.isArray(this) || 'string' == typeof this) return d;
      }),
      g = () => {},
      f = 'string',
      v = 'array',
      _ = 'cursor',
      S = 'indent',
      k = 'align',
      b = 'trim',
      w = 'group',
      y = 'fill',
      C = 'if-break',
      T = 'indent-if-break',
      x = 'line-suffix',
      E = 'line-suffix-boundary',
      L = 'line',
      q = 'label',
      N = 'break-parent',
      A = new Set([_, S, k, b, w, y, C, T, x, E, L, q, N]);
    function D(e, t, r) {
      if (!e.has(t)) {
        let n = r(t);
        e.set(t, n);
      }
      return e.get(t);
    }
    var I = function (e) {
        if ('string' == typeof e) return f;
        if (Array.isArray(e)) return v;
        if (!e) return;
        let { type: t } = e;
        if (A.has(t)) return t;
      },
      M = class extends Error {
        name = 'InvalidDocError';
        constructor(e) {
          (super(
            (function (e) {
              let t,
                r = null === e ? 'null' : typeof e;
              if ('string' !== r && 'object' !== r)
                return `Unexpected doc '${r}', 
Expected it to be 'string' or 'object'.`;
              if (I(e)) throw Error('doc is valid.');
              let n = Object.prototype.toString.call(e);
              if ('[object Object]' !== n) return `Unexpected doc '${n}'.`;
              let a =
                ((t = [...A].map(e => `'${e}'`)),
                new Intl.ListFormat('en-US', { type: 'disjunction' }).format(
                  t
                ));
              return `Unexpected doc.type '${e.type}'.
Expected it to be ${a}.`;
            })(e)
          ),
            (this.doc = e));
        }
      };
    function P(e, t) {
      if ('string' == typeof e) return t(e);
      let r = new Map();
      return n(e);
      function n(e) {
        return D(r, e, a);
      }
      function a(e) {
        switch (I(e)) {
          case v:
            return t(e.map(n));
          case y:
            return t({ ...e, parts: e.parts.map(n) });
          case C:
            return t({
              ...e,
              breakContents: n(e.breakContents),
              flatContents: n(e.flatContents)
            });
          case w: {
            let { expandedStates: r, contents: a } = e;
            return (
              (a = r ? (r = r.map(n))[0] : n(a)),
              t({ ...e, contents: a, expandedStates: r })
            );
          }
          case k:
          case S:
          case T:
          case q:
          case x:
            return t({ ...e, contents: n(e.contents) });
          case f:
          case _:
          case b:
          case E:
          case L:
          case N:
            return t(e);
          default:
            throw new M(e);
        }
      }
    }
    function B(e, t = j) {
      return P(e, e =>
        'string' == typeof e
          ? O(
              t,
              e.split(`
`)
            )
          : e
      );
    }
    function H(e) {
      return (g(), { type: S, contents: e });
    }
    var R = { type: N };
    function F(e) {
      return (g(), { type: y, parts: e });
    }
    function U(e, t = {}) {
      return (
        g(),
        g(t.expandedStates),
        {
          type: w,
          id: t.id,
          contents: e,
          break: !!t.shouldBreak,
          expandedStates: t.expandedStates
        }
      );
    }
    function V(e, t = '', r = {}) {
      return (
        g(),
        '' !== t && g(),
        { type: C, breakContents: e, flatContents: t, groupId: r.groupId }
      );
    }
    function O(e, t) {
      (g(), g());
      let r = [];
      for (let n = 0; n < t.length; n++) (0 !== n && r.push(e), r.push(t[n]));
      return r;
    }
    var z = { type: L },
      $ = { type: L, soft: !0 },
      W = [{ type: L, hard: !0 }, R],
      j = [{ type: L, hard: !0, literal: !0 }, R],
      G = Object.freeze({ character: "'", codePoint: 39 }),
      K = Object.freeze({ character: '"', codePoint: 34 }),
      J =
        (Object.freeze({ preferred: G, alternate: K }),
        Object.freeze({ preferred: K, alternate: G })),
      Y = new (class {
        #e;
        constructor(e) {
          this.#e = new Set(e);
        }
        getLeadingWhitespaceCount(e) {
          let t = this.#e,
            r = 0;
          for (let n = 0; n < e.length && t.has(e.charAt(n)); n++) r++;
          return r;
        }
        getTrailingWhitespaceCount(e) {
          let t = this.#e,
            r = 0;
          for (let n = e.length - 1; n >= 0 && t.has(e.charAt(n)); n--) r++;
          return r;
        }
        getLeadingWhitespace(e) {
          let t = this.getLeadingWhitespaceCount(e);
          return e.slice(0, t);
        }
        getTrailingWhitespace(e) {
          let t = this.getTrailingWhitespaceCount(e);
          return e.slice(e.length - t);
        }
        hasLeadingWhitespace(e) {
          return this.#e.has(e.charAt(0));
        }
        hasTrailingWhitespace(e) {
          return this.#e.has(m(0, e, -1));
        }
        trimStart(e) {
          let t = this.getLeadingWhitespaceCount(e);
          return e.slice(t);
        }
        trimEnd(e) {
          let t = this.getTrailingWhitespaceCount(e);
          return e.slice(0, e.length - t);
        }
        trim(e) {
          return this.trimEnd(this.trimStart(e));
        }
        split(e, t = !1) {
          let r = `[${(function (e) {
              if ('string' != typeof e) throw TypeError('Expected a string');
              return e
                .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                .replace(/-/g, '\\x2d');
            })([...this.#e].join(''))}]+`,
            n = new RegExp(t ? `(${r})` : r);
          return e.split(n);
        }
        hasWhitespaceCharacter(e) {
          let t = this.#e;
          return Array.prototype.some.call(e, e => t.has(e));
        }
        hasNonWhitespaceCharacter(e) {
          let t = this.#e;
          return Array.prototype.some.call(e, e => !t.has(e));
        }
        isWhitespaceOnly(e) {
          let t = this.#e;
          return Array.prototype.every.call(e, e => t.has(e));
        }
        #t(e) {
          let t = 1 / 0;
          for (let r of e.split(`
`)) {
            if (0 === r.length) continue;
            let e = this.getLeadingWhitespaceCount(r);
            if (0 === e) return 0;
            r.length !== e && e < t && (t = e);
          }
          return 1 / 0 === t ? 0 : t;
        }
        dedentString(e) {
          let t = this.#t(e);
          return 0 === t
            ? e
            : e
                .split(
                  `
`
                )
                .map(e => e.slice(t)).join(`
`);
        }
      })([
        '	',
        `
`,
        '\f',
        '\r',
        ' '
      ]),
      Z = class extends Error {
        name = 'UnexpectedNodeError';
        constructor(e, t, r = 'type') {
          (super(`Unexpected ${t} node ${r}: ${JSON.stringify(e[r])}.`),
            (this.node = e));
        }
      };
    function Q(e, t = !0) {
      return [H([$, e]), t ? $ : ''];
    }
    function X(e, t) {
      let r =
        'NGRoot' === e.type
          ? 'NGMicrosyntax' === e.node.type &&
            1 === e.node.body.length &&
            'NGMicrosyntaxExpression' === e.node.body[0].type
            ? e.node.body[0].expression
            : e.node
          : 'JsExpressionRoot' === e.type
            ? e.node
            : e;
      return (
        r &&
        ('ObjectExpression' === r.type ||
          'ArrayExpression' === r.type ||
          (('__vue_expression' === t.parser ||
            '__vue_ts_expression' === t.parser ||
            '__ng_binding' === t.parser ||
            '__ng_directive' === t.parser) &&
            ('TemplateLiteral' === r.type || 'StringLiteral' === r.type)))
      );
    }
    async function ee(e, t, r, n) {
      r = { __isInHtmlAttribute: !0, __embeddedInHtml: !0, ...r };
      let a = !0;
      n &&
        (r.__onHtmlBindingRoot = (e, t) => {
          a = n(e, t);
        });
      let i = await t(e, r, t);
      return a ? U(i) : Q(i);
    }
    var et = function (e, t, r, n) {
        let { node: a } = r,
          i = n.originalText.slice(
            a.sourceSpan.start.offset,
            a.sourceSpan.end.offset
          );
        return /^\s*$/.test(i)
          ? ''
          : ee(i, e, { parser: '__ng_directive', __isInHtmlAttribute: !1 }, X);
      },
      er =
        Object.hasOwn ??
        Function.prototype.call.bind(Object.prototype.hasOwnProperty),
      en =
        Array.prototype.toReversed ??
        function () {
          return [...this].reverse();
        },
      ea = u('toReversed', function () {
        if (Array.isArray(this)) return en;
      }),
      ei = (function () {
        let e = globalThis,
          t = e.process?.platform;
        if ('string' == typeof t) return t.startsWith('win');
        let r = e.Deno?.build?.os;
        return 'string' == typeof r
          ? 'windows' === r
          : (e.navigator?.platform?.startsWith('Win') ?? !1);
      })();
    function es(e) {
      if ('file:' !== (e = e instanceof URL ? e : new URL(e)).protocol)
        throw TypeError(`URL must be a file URL: received "${e.protocol}"`);
      return e;
    }
    var eo = function (e) {
      return Array.isArray(e) && e.length > 0;
    };
    function el(e, t) {
      if (!t) return;
      let r = String(t).split(/[/\\]/).pop().toLowerCase();
      return (
        e.find(({ filenames: e }) => e?.some(e => e.toLowerCase() === r)) ??
        e.find(({ extensions: e }) => e?.some(e => r.endsWith(e)))
      );
    }
    var ec = void 0;
    function eu(e, t) {
      if (t) {
        if (String(t).startsWith('file:'))
          try {
            var r, n;
            let e;
            ((r = t),
              (t = ei
                ? ((e = decodeURIComponent(
                    (n = es((n = r))).pathname
                      .replace(/\//g, '\\')
                      .replace(/%(?![0-9A-Fa-f]{2})/g, '%25')
                  ).replace(/^\\*([A-Za-z]:)(\\|$)/, '$1\\')),
                  '' !== n.hostname && (e = `\\\\${n.hostname}${e}`),
                  e)
                : decodeURIComponent(
                    es(r).pathname.replace(/%(?![0-9A-Fa-f]{2})/g, '%25')
                  )));
          } catch {
            return;
          }
        if ('string' == typeof t)
          return e.find(({ isSupported: e }) => e?.({ filepath: t }));
      }
    }
    var ep = function (e, t) {
        let r = ea(0, e.plugins).flatMap(e => e.languages ?? []);
        return (
          (function (e, t) {
            if (t)
              return (
                e.find(({ name: e }) => e.toLowerCase() === t) ??
                e.find(({ aliases: e }) => e?.includes(t)) ??
                e.find(({ extensions: e }) => e?.includes(`.${t}`))
              );
          })(r, t.language) ??
          el(r, t.physicalFile) ??
          el(r, t.file) ??
          eu(r, t.physicalFile) ??
          eu(r, t.file) ??
          ec?.(r, t.physicalFile)
        )?.parsers[0];
      },
      eh = Symbol.for('PRETTIER_IS_FRONT_MATTER'),
      ed = function (e) {
        return !!e?.[eh];
      },
      em = function (e) {
        return h(0, e, /[^\n]/g, ' ');
      },
      eg = function (e) {
        let t = (function (e) {
          let t = e.slice(0, 3);
          if ('---' !== t && '+++' !== t) return;
          let r = e.indexOf(
            `
`,
            3
          );
          if (-1 === r) return;
          let n = e.slice(3, r).trim(),
            a = e.indexOf(
              `
${t}`,
              r
            ),
            i = n;
          if (
            (i || (i = '+++' === t ? 'toml' : 'yaml'),
            -1 === a &&
              '---' === t &&
              'yaml' === i &&
              (a = e.indexOf(
                `
...`,
                r
              )),
            -1 === a)
          )
            return;
          let s = a + 1 + 3,
            o = e.charAt(s + 1);
          if (!/\s?/.test(o)) return;
          let l = e.slice(0, s),
            c;
          return {
            language: i,
            explicitLanguage: n || null,
            value: e.slice(r + 1, a),
            startDelimiter: t,
            endDelimiter: l.slice(-3),
            raw: l,
            start: { line: 1, column: 0, index: 0 },
            end: {
              index: l.length,
              get line() {
                return (
                  c ??
                    (c = l.split(`
`)),
                  c.length
                );
              },
              get column() {
                return (
                  c ??
                    (c = l.split(`
`)),
                  m(0, c, -1).length
                );
              }
            },
            [eh]: !0
          };
        })(e);
        return t
          ? {
              frontMatter: t,
              get content() {
                let { raw: r } = t;
                return em(r) + e.slice(r.length);
              }
            }
          : { content: e };
      },
      ef = {
        area: 'none',
        base: 'none',
        basefont: 'none',
        datalist: 'none',
        head: 'none',
        link: 'none',
        meta: 'none',
        noembed: 'none',
        noframes: 'none',
        param: 'block',
        rp: 'none',
        script: 'block',
        style: 'none',
        template: 'inline',
        title: 'none',
        html: 'block',
        body: 'block',
        address: 'block',
        blockquote: 'block',
        center: 'block',
        dialog: 'block',
        div: 'block',
        figure: 'block',
        figcaption: 'block',
        footer: 'block',
        form: 'block',
        header: 'block',
        hr: 'block',
        legend: 'block',
        listing: 'block',
        main: 'block',
        p: 'block',
        plaintext: 'block',
        pre: 'block',
        search: 'block',
        xmp: 'block',
        slot: 'contents',
        ruby: 'ruby',
        rt: 'ruby-text',
        article: 'block',
        aside: 'block',
        h1: 'block',
        h2: 'block',
        h3: 'block',
        h4: 'block',
        h5: 'block',
        h6: 'block',
        hgroup: 'block',
        nav: 'block',
        section: 'block',
        dir: 'block',
        dd: 'block',
        dl: 'block',
        dt: 'block',
        menu: 'block',
        ol: 'block',
        ul: 'block',
        li: 'list-item',
        table: 'table',
        caption: 'table-caption',
        colgroup: 'table-column-group',
        col: 'table-column',
        thead: 'table-header-group',
        tbody: 'table-row-group',
        tfoot: 'table-footer-group',
        tr: 'table-row',
        td: 'table-cell',
        th: 'table-cell',
        input: 'inline-block',
        button: 'inline-block',
        fieldset: 'block',
        details: 'block',
        summary: 'block',
        marquee: 'inline-block',
        option: 'block',
        optgroup: 'block',
        select: 'inline-block',
        source: 'block',
        track: 'block',
        meter: 'inline-block',
        progress: 'inline-block',
        object: 'inline-block',
        video: 'inline-block',
        audio: 'inline-block'
      },
      ev = {
        listing: 'pre',
        plaintext: 'pre',
        pre: 'pre',
        xmp: 'pre',
        nobr: 'nowrap',
        table: 'initial',
        textarea: 'pre-wrap'
      },
      e_ = function (e) {
        return (
          'element' === e.kind &&
          !e.hasExplicitNamespace &&
          !['html', 'svg'].includes(e.namespace)
        );
      },
      eS = e => h(0, Y.trimEnd(e), /^[\t\f\r ]*\n/g, ''),
      ek = e => {
        let t = e,
          r = Y.getLeadingWhitespace(t);
        r && (t = t.slice(r.length));
        let n = Y.getTrailingWhitespace(t);
        return (
          n && (t = t.slice(0, -n.length)),
          { leadingWhitespace: r, trailingWhitespace: n, text: t }
        );
      };
    function eb(e, t) {
      return !!(
        ('ieConditionalComment' === e.kind &&
          e.lastChild &&
          !e.lastChild.isSelfClosing &&
          !e.lastChild.endSourceSpan) ||
        ('ieConditionalComment' === e.kind && !e.complete) ||
        (eB(e) &&
          e.children.some(
            e => 'text' !== e.kind && 'interpolation' !== e.kind
          )) ||
        (ez(e, t) && !eC(e, t) && 'interpolation' !== e.kind)
      );
    }
    function ew(e) {
      var t;
      return (
        'attribute' !== e.kind &&
        !!e.parent &&
        !!e.prev &&
        'comment' === (t = e.prev).kind &&
        'prettier-ignore' === t.value.trim()
      );
    }
    function ey(e) {
      return 'text' === e.kind || 'comment' === e.kind;
    }
    function eC(e, t) {
      return (
        'element' === e.kind &&
        ('script' === e.fullName ||
          'style' === e.fullName ||
          'svg:style' === e.fullName ||
          'svg:script' === e.fullName ||
          ('mj-style' === e.fullName && 'mjml' === t.parser) ||
          (e_(e) && ('script' === e.name || 'style' === e.name)))
      );
    }
    function eT(e) {
      return eH(e).startsWith('pre');
    }
    function ex(e) {
      return (
        ed(e) ||
        (e.next &&
          e.sourceSpan.end &&
          e.sourceSpan.end.line + 1 < e.next.sourceSpan.start.line)
      );
    }
    function eE(e) {
      return (
        'element' === e.kind &&
        e.children.length > 0 &&
        (['html', 'head', 'ul', 'ol', 'select'].includes(e.name) ||
          (e.cssDisplay.startsWith('table') && 'table-cell' !== e.cssDisplay))
      );
    }
    function eL(e) {
      var t, r;
      return (
        eA(e) ||
        (e.prev &&
          (eA((t = e.prev)) ||
            ('element' === t.kind && 'br' === t.fullName) ||
            (function (e) {
              return eq(e) && eN(e);
            })(t))) ||
        (eq((r = e)) && eN(r))
      );
    }
    function eq(e) {
      return (
        e.hasLeadingSpaces &&
        (e.prev
          ? e.prev.sourceSpan.end.line < e.sourceSpan.start.line
          : 'root' === e.parent.kind ||
            e.parent.startSourceSpan.end.line < e.sourceSpan.start.line)
      );
    }
    function eN(e) {
      return (
        e.hasTrailingSpaces &&
        (e.next
          ? e.next.sourceSpan.start.line > e.sourceSpan.end.line
          : 'root' === e.parent.kind ||
            (e.parent.endSourceSpan &&
              e.parent.endSourceSpan.start.line > e.sourceSpan.end.line))
      );
    }
    function eA(e) {
      switch (e.kind) {
        case 'ieConditionalComment':
        case 'comment':
        case 'directive':
          return !0;
        case 'element':
          return ['script', 'select'].includes(e.name);
      }
      return !1;
    }
    function eD(e) {
      return e.lastChild ? eD(e.lastChild) : e;
    }
    function eI(e) {
      if (e)
        switch (e) {
          case 'module':
          case 'text/javascript':
          case 'text/babel':
          case 'text/jsx':
          case 'application/javascript':
            return 'babel';
          case 'application/x-typescript':
            return 'typescript';
          case 'text/markdown':
            return 'markdown';
          case 'text/html':
            return 'html';
          case 'text/x-handlebars-template':
            return 'glimmer';
          default:
            if (
              e.endsWith('json') ||
              e.endsWith('importmap') ||
              'speculationrules' === e
            )
              return 'json';
        }
    }
    function eM(e, t) {
      return (
        (function (e, t) {
          let { name: r, attrMap: n } = e;
          if ('script' !== r || er(n, 'src')) return;
          let { type: a, lang: i } = e.attrMap;
          return i || a ? (ep(t, { language: i }) ?? eI(a)) : 'babel';
        })(e, t) ??
        (function (e, t) {
          if ('style' === e.name) {
            let { lang: r } = e.attrMap;
            return r ? ep(t, { language: r }) : 'css';
          }
          if ('mj-style' === e.name && 'mjml' === t.parser) return 'css';
        })(e, t) ??
        (function (e, t) {
          if (!ez(e, t)) return;
          let { attrMap: r } = e;
          if (er(r, 'src')) return;
          let { type: n, lang: a } = r;
          return ep(t, { language: a }) ?? eI(n);
        })(e, t)
      );
    }
    function eP(e) {
      return 'block' === e || 'list-item' === e || e.startsWith('table');
    }
    function eB(e) {
      return eH(e).startsWith('pre');
    }
    function eH(e) {
      return 'element' === e.kind && (!e.namespace || e_(e)) && er(ev, e.name)
        ? ev[e.name]
        : 'normal';
    }
    function eR(e) {
      return h(0, h(0, e, '&apos;', "'"), '&quot;', '"');
    }
    function eF(e) {
      return eR(e.value);
    }
    var eU = new Set(['template', 'style', 'script']);
    function eV(e, t) {
      return eO(e, t) && !eU.has(e.fullName);
    }
    function eO(e, t) {
      return (
        'vue' === t.parser &&
        'element' === e.kind &&
        'root' === e.parent.kind &&
        'html' !== e.fullName.toLowerCase()
      );
    }
    function ez(e, t) {
      return (
        eO(e, t) && (eV(e, t) || (e.attrMap.lang && 'html' !== e.attrMap.lang))
      );
    }
    function e$(e, t = e.value) {
      return e.parent.isWhitespaceSensitive
        ? e.parent.isIndentationSensitive
          ? B(t)
          : B(Y.dedentString(eS(t)), W)
        : O(z, Y.split(t));
    }
    function eW(e, t) {
      return eO(e, t) && 'script' === e.name;
    }
    function ej(e, t) {
      if (
        (function (e) {
          let { valueSpan: t, value: r } = e;
          return t.end.offset - t.start.offset === r.length + 2;
        })(e)
      )
        return !1;
      let { value: r } = e;
      return (
        /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(r) ||
        ('lwc' === t.parser && r.startsWith('{') && r.endsWith('}'))
      );
    }
    var eG = /\{\{(.+?)\}\}/s;
    async function eK(e, t, r) {
      let n = eF(r.node),
        a = [];
      for (let [t, r] of n.split(eG).entries())
        if (t % 2 == 0) a.push(B(r));
        else
          try {
            a.push(
              U([
                '{{',
                H([
                  z,
                  await ee(r, e, {
                    parser: '__ng_interpolation',
                    __isInHtmlInterpolation: !0
                  })
                ]),
                z,
                '}}'
              ])
            );
          } catch {
            a.push('{{', B(r), '}}');
          }
      return a;
    }
    var eJ = e => (t, r, n) => ee(eF(n.node), t, { parser: e }, X),
      eY = [
        {
          test(e) {
            let t = e.node.fullName;
            return (
              (t.startsWith('(') && t.endsWith(')')) || t.startsWith('on-')
            );
          },
          print: eJ('__ng_action')
        },
        {
          test(e) {
            let t = e.node.fullName;
            return (
              (t.startsWith('[') && t.endsWith(']')) ||
              /^bind(?:on)?-/.test(t) ||
              /^ng-(?:if|show|hide|class|style)$/.test(t)
            );
          },
          print: eJ('__ng_binding')
        },
        {
          test: e => e.node.fullName.startsWith('*'),
          print: eJ('__ng_directive')
        },
        {
          test: e => /^i18n(?:-.+)?$/.test(e.node.fullName),
          print: function (e, t, { node: r }) {
            let n = eF(r);
            return Q(F(e$(r, n.trim())), !n.includes('@@'));
          }
        },
        { test: ({ node: { value: e } }) => eG.test(e), print: eK }
      ].map(({ test: e, print: t }) => ({
        test: (t, r) => 'angular' === r.parser && e(t),
        print: t
      })),
      eZ = new Set([
        'onabort',
        'onafterprint',
        'onauxclick',
        'onbeforeinput',
        'onbeforematch',
        'onbeforeprint',
        'onbeforetoggle',
        'onbeforeunload',
        'onblur',
        'oncancel',
        'oncanplay',
        'oncanplaythrough',
        'onchange',
        'onclick',
        'onclose',
        'oncommand',
        'oncontextlost',
        'oncontextmenu',
        'oncontextrestored',
        'oncopy',
        'oncuechange',
        'oncut',
        'ondblclick',
        'ondrag',
        'ondragend',
        'ondragenter',
        'ondragleave',
        'ondragover',
        'ondragstart',
        'ondrop',
        'ondurationchange',
        'onemptied',
        'onended',
        'onerror',
        'onfocus',
        'onformdata',
        'onhashchange',
        'oninput',
        'oninvalid',
        'onkeydown',
        'onkeypress',
        'onkeyup',
        'onlanguagechange',
        'onload',
        'onloadeddata',
        'onloadedmetadata',
        'onloadstart',
        'onmessage',
        'onmessageerror',
        'onmousedown',
        'onmouseenter',
        'onmouseleave',
        'onmousemove',
        'onmouseout',
        'onmouseover',
        'onmouseup',
        'onoffline',
        'ononline',
        'onpagehide',
        'onpagereveal',
        'onpageshow',
        'onpageswap',
        'onpaste',
        'onpause',
        'onplay',
        'onplaying',
        'onpopstate',
        'onprogress',
        'onratechange',
        'onrejectionhandled',
        'onreset',
        'onresize',
        'onscroll',
        'onscrollend',
        'onsecuritypolicyviolation',
        'onseeked',
        'onseeking',
        'onselect',
        'onslotchange',
        'onstalled',
        'onstorage',
        'onsubmit',
        'onsuspend',
        'ontimeupdate',
        'ontoggle',
        'onunhandledrejection',
        'onunload',
        'onvolumechange',
        'onwaiting',
        'onwheel'
      ]),
      eQ = function (e) {
        let t = [];
        for (let r of e.split(';')) {
          if (!(r = Y.trim(r))) continue;
          let [e, ...n] = Y.split(r);
          t.push({ name: e, value: n });
        }
        return t;
      };
    function eX(e) {
      return (
        '	' === e ||
        e ===
          `
` ||
        '\f' === e ||
        '\r' === e ||
        ' ' === e
      );
    }
    var e0 = /^[ \t\n\r\u000c]+/,
      e1 = /^[, \t\n\r\u000c]+/,
      e2 = /^[^ \t\n\r\u000c]+/,
      e3 = /[,]+$/,
      e4 = /^\d+$/,
      e5 = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
      e6 = function (e) {
        let t = e.length,
          r,
          n,
          a,
          i,
          s,
          o = 0,
          l;
        function c(t) {
          let r,
            n = t.exec(e.substring(o));
          if (n) return (([r] = n), (o += r.length), r);
        }
        let u = [];
        for (;;) {
          if ((c(e1), o >= t)) {
            if (0 === u.length)
              throw Error('Must contain one or more image candidate strings.');
            return u;
          }
          ((l = o),
            (r = c(e2)),
            (n = []),
            ',' === r.slice(-1)
              ? ((r = r.replace(e3, '')), p())
              : (function () {
                  for (c(e0), a = '', i = 'in descriptor'; ;) {
                    if (((s = e.charAt(o)), 'in descriptor' === i))
                      if (eX(s))
                        a && (n.push(a), (a = ''), (i = 'after descriptor'));
                      else if (',' === s) {
                        ((o += 1), a && n.push(a), p());
                        return;
                      } else if ('(' === s) ((a += s), (i = 'in parens'));
                      else if ('' === s) {
                        (a && n.push(a), p());
                        return;
                      } else a += s;
                    else if ('in parens' === i)
                      if (')' === s) ((a += s), (i = 'in descriptor'));
                      else if ('' === s) {
                        (n.push(a), p());
                        return;
                      } else a += s;
                    else if ('after descriptor' === i && !eX(s))
                      if ('' === s) return void p();
                      else ((i = 'in descriptor'), (o -= 1));
                    o += 1;
                  }
                })());
        }
        function p() {
          let t = !1,
            a,
            i,
            s,
            o,
            c = {},
            p,
            h,
            d,
            m,
            g;
          for (o = 0; o < n.length; o++)
            ((h = (p = n[o])[p.length - 1]),
              (m = parseInt((d = p.substring(0, p.length - 1)), 10)),
              (g = parseFloat(d)),
              e4.test(d) && 'w' === h
                ? ((a || i) && (t = !0), 0 === m ? (t = !0) : (a = m))
                : e5.test(d) && 'x' === h
                  ? ((a || i || s) && (t = !0), g < 0 ? (t = !0) : (i = g))
                  : e4.test(d) && 'h' === h
                    ? ((s || i) && (t = !0), 0 === m ? (t = !0) : (s = m))
                    : (t = !0));
          if (t)
            throw Error(`Invalid srcset descriptor found in "${e}" at "${p}".`);
          ((c.source = { value: r, startOffset: l }),
            a && (c.width = { value: a }),
            i && (c.density = { value: i }),
            s && (c.height = { value: s }),
            u.push(c));
        }
      },
      e9 = { width: 'w', height: 'h', density: 'x' },
      e8 = Object.keys(e9),
      e7 = async (e, t, r) =>
        Q(await e(eF(r.node), { parser: 'css', __isHTMLStyleAttribute: !0 })),
      te = new WeakMap(),
      tt = function (e, t) {
        return D(te, e.root, e =>
          e.children.some(
            e => eW(e, t) && ['ts', 'typescript'].includes(e.attrMap.lang)
          )
        );
      };
    function tr(e, t, r, n) {
      return ee(
        eF(r.node),
        e,
        { parser: tt(r, n) ? '__ts_expression' : '__js_expression' },
        X
      );
    }
    var tn = [
        {
          test: e =>
            'srcset' === e.node.fullName &&
            ('img' === e.parent.fullName || 'source' === e.parent.fullName),
          print: function (e, t, r) {
            let n = e6(eF(r.node)),
              a = e8.filter(e => n.some(t => er(t, e)));
            if (a.length > 1)
              throw Error('Mixed descriptor in srcset is not supported');
            let [i] = a,
              s = e9[i],
              o = n.map(e => e.source.value),
              l = Math.max(...o.map(e => e.length)),
              c = n.map(e => (e[i] ? String(e[i].value) : '')),
              u = c.map(e => {
                let t = e.indexOf('.');
                return -1 === t ? e.length : t;
              }),
              p = Math.max(...u);
            return Q(
              O(
                [',', z],
                o.map((e, t) => {
                  let r = [e],
                    n = c[t];
                  if (n) {
                    let a = l - e.length + 1,
                      i = p - u[t],
                      o = ' '.repeat(a + i);
                    r.push(V(o, ' '), n + s);
                  }
                  return r;
                })
              )
            );
          }
        },
        {
          test: ({ node: e }, t) =>
            'style' === e.fullName &&
            !t.parentParser &&
            !e.value.includes('{{'),
          print: e7
        },
        {
          test: ({ node: e }, t) =>
            eZ.has(e.fullName) && !t.parentParser && !e.value.includes('{{'),
          print: (e, t, r) =>
            ee(
              eF(r.node),
              e,
              { parser: 'babel', __isHtmlInlineEventHandler: !0 },
              () => !1
            )
        },
        {
          test: ({ node: e }, t) =>
            !t.parentParser &&
            'class' === e.fullName &&
            !e.value.includes('{{'),
          print: (e, t, r) => h(0, eF(r.node).trim(), /\s+/g, ' ')
        },
        {
          test: ({ node: e }, t) =>
            'allow' === e.fullName &&
            !t.parentParser &&
            'iframe' === e.parent.fullName &&
            !e.value.includes('{{'),
          print: function (e, t, r) {
            let { node: n } = r,
              a = eQ(eF(n));
            return 0 === a.length
              ? ['']
              : Q(
                  a.map(({ name: e, value: t }, r) => [
                    [e, ...t].join(' '),
                    r === a.length - 1 ? V(';') : [';', z]
                  ])
                );
          }
        },
        ...[
          {
            test: e => 'v-for' === e.node.fullName,
            print: async function e(e, t, r, n) {
              let {
                  left: a,
                  operator: i,
                  right: s
                } = (function (e) {
                  let t = e.match(/(.*?)\s+(in|of)\s+(.*)/s);
                  if (!t) return;
                  let r = { for: t[3].trim() };
                  if (!r.for) return;
                  let n = /,([^,\]}]*)(?:,([^,\]}]*))?$/,
                    a = h(0, t[1].trim(), /^\(|\)$/g, ''),
                    i = a.match(n);
                  i
                    ? ((r.alias = a.replace(n, '')),
                      (r.iterator1 = i[1].trim()),
                      i[2] && (r.iterator2 = i[2].trim()))
                    : (r.alias = a);
                  let s = [r.alias, r.iterator1, r.iterator2];
                  if (
                    !s.some(
                      (e, t) => !e && (0 === t || s.slice(t + 1).some(Boolean))
                    )
                  )
                    return {
                      left: s.filter(Boolean).join(','),
                      operator: t[2],
                      right: r.for
                    };
                })(eF(r.node)),
                o = tt(r, n);
              return [
                U(
                  await ee(`function _(${a}) {}`, e, {
                    parser: o ? 'babel-ts' : 'babel',
                    __isVueForBindingLeft: !0
                  })
                ),
                ' ',
                i,
                ' ',
                await ee(s, e, {
                  parser: o ? '__ts_expression' : '__js_expression'
                })
              ];
            }
          },
          {
            test: (e, t) => 'generic' === e.node.fullName && eW(e.parent, t),
            print: function (e, t, r) {
              let n = eF(r.node);
              return ee(
                `type T<${n}> = any`,
                e,
                {
                  parser: 'babel-ts',
                  __isEmbeddedTypescriptGenericParameters: !0
                },
                X
              );
            }
          },
          {
            test: ({ node: e }, t) => {
              let r;
              return (
                '#' === (r = e.fullName).charAt(0) ||
                'slot-scope' === r ||
                'v-slot' === r ||
                r.startsWith('v-slot:') ||
                (function (e, t) {
                  let r = e.parent;
                  if (!eO(r, t)) return !1;
                  let n = r.fullName,
                    a = e.fullName;
                  return (
                    ('script' === n && 'setup' === a) ||
                    ('style' === n && 'vars' === a)
                  );
                })(e, t)
              );
            },
            print: function (e, t, r, n) {
              let a = eF(r.node);
              return ee(`function _(${a}) {}`, e, {
                parser: tt(r, n) ? 'babel-ts' : 'babel',
                __isVueBindings: !0
              });
            }
          },
          {
            test(e) {
              let t = e.node.fullName;
              return t.startsWith('@') || t.startsWith('v-on:');
            },
            print: async function e(e, t, r, n) {
              try {
                return await tr(e, t, r, n);
              } catch (e) {
                if (e.cause?.code !== 'BABEL_PARSER_SYNTAX_ERROR') throw e;
              }
              return ee(
                eF(r.node),
                e,
                {
                  parser: tt(r, n)
                    ? '__vue_ts_event_binding'
                    : '__vue_event_binding'
                },
                X
              );
            }
          },
          {
            test(e) {
              let t = e.node.fullName;
              return (
                t.startsWith(':') ||
                t.startsWith('.') ||
                t.startsWith('v-bind:')
              );
            },
            print: function (e, t, r, n) {
              return ee(
                eF(r.node),
                e,
                {
                  parser: tt(r, n) ? '__vue_ts_expression' : '__vue_expression'
                },
                X
              );
            }
          },
          { test: e => e.node.fullName.startsWith('v-'), print: tr }
        ].map(({ test: e, print: t }) => ({
          test: (t, r) => 'vue' === r.parser && e(t, r),
          print: t
        })),
        ...eY
      ].map(({ test: e, print: t }) => {
        var r;
        return {
          test: e,
          print:
            ((r = t),
            async (e, t, n, a) => {
              let i = await r(e, t, n, a);
              if (i)
                return (
                  (i = P(i, e =>
                    'string' == typeof e ? h(0, e, '"', '&quot;') : e
                  )),
                  [n.node.rawName, '="', U(i), '"']
                );
            })
        };
      }),
      ta = function (e, t) {
        let { node: r } = e,
          { value: n } = r;
        if (n)
          return ej(r, t)
            ? [r.rawName, '=', n]
            : tn.find(({ test: r }) => r(e, t))?.print;
      },
      ti = e => e.sourceSpan.start.offset,
      ts = e => e.sourceSpan.end.offset;
    function to(e, t) {
      var r, n, a, i;
      return [
        e.isSelfClosing
          ? ''
          : ((r = e),
            (n = t),
            r.lastChild && tg(r.lastChild)
              ? ''
              : [
                  ((a = r), (i = n), tm(a) ? tp(a.lastChild, i) : ''),
                  tu(r, n)
                ]),
        tl(e, t)
      ];
    }
    function tl(e, t) {
      return (e.next ? td(e.next) : tm(e.parent)) ? '' : [tp(e, t), tc(e, t)];
    }
    function tc(e, t) {
      return tg(e) ? tu(e.parent, t) : tf(e) ? tw(e.next, t) : '';
    }
    function tu(e, t) {
      if (th(e, t)) return '';
      switch (e.kind) {
        case 'ieConditionalComment':
          return '<!';
        case 'element':
          if (e.hasHtmComponentClosingTag) return '<//';
        default:
          return `</${e.rawName}`;
      }
    }
    function tp(e, t) {
      if (th(e, t)) return '';
      switch (e.kind) {
        case 'ieConditionalComment':
        case 'ieConditionalEndComment':
          return '[endif]--\x3e';
        case 'ieConditionalStartComment':
          return ']>\x3c!--\x3e';
        case 'interpolation':
          return '}}';
        case 'angularIcuExpression':
          return '}';
        case 'element':
          if (e.isSelfClosing) return '/>';
        default:
          return '>';
      }
    }
    function th(e, t) {
      return !e.isSelfClosing && !e.endSourceSpan && (ew(e) || eb(e.parent, t));
    }
    function td(e) {
      return (
        e.prev &&
        'docType' !== e.prev.kind &&
        'angularControlFlowBlock' !== e.kind &&
        !ey(e.prev) &&
        e.isLeadingSpaceSensitive &&
        !e.hasLeadingSpaces
      );
    }
    function tm(e) {
      return (
        e.lastChild?.isTrailingSpaceSensitive &&
        !e.lastChild.hasTrailingSpaces &&
        !ey(eD(e.lastChild)) &&
        !eB(e)
      );
    }
    function tg(e) {
      return (
        !e.next &&
        !e.hasTrailingSpaces &&
        e.isTrailingSpaceSensitive &&
        ey(eD(e))
      );
    }
    function tf(e) {
      return (
        e.next &&
        !ey(e.next) &&
        ey(e) &&
        e.isTrailingSpaceSensitive &&
        !e.hasTrailingSpaces
      );
    }
    function tv(e) {
      return !e.prev && e.isLeadingSpaceSensitive && !e.hasLeadingSpaces;
    }
    function t_(e, t, r) {
      var n;
      let { node: a } = e;
      return [
        tS(a, t),
        (function (e, t, r) {
          let n,
            { node: a } = e,
            { attrs: i = [], startTagComments: s = [] } = a;
          if (0 === i.length && 0 === s.length)
            return a.isSelfClosing ? ' ' : '';
          let o =
              a.prev?.kind === 'comment' &&
              !!(n = a.prev.value
                .trim()
                .match(/^prettier-ignore-attribute(?:\s+(.+))?$/s)) &&
              (!n[1] || n[1].split(/\s+/)),
            l =
              'boolean' == typeof o
                ? () => o
                : Array.isArray(o)
                  ? e => o.includes(e.rawName)
                  : () => !1,
            c = ['attrs', 'startTagComments'].filter(e => eo(a[e])),
            u = c.flatMap(n =>
              e.map(
                ({ node: e }) => ({
                  loc: ti(e),
                  printed:
                    'attribute' === e.kind && l(e)
                      ? B(t.originalText.slice(ti(e), ts(e)))
                      : r()
                }),
                n
              )
            );
          c.length > 1 && u.sort((e, t) => e.loc - t.loc);
          let p =
              'element' === a.kind &&
              'script' === a.fullName &&
              1 === i.length &&
              'src' === i[0].fullName &&
              0 === a.children.length &&
              0 === s.length,
            h = s.some(e => 'single' === e.type),
            d =
              h || (t.singleAttributePerLine && i.length > 1 && !eO(a, t))
                ? W
                : z,
            m = [
              H([
                p ? ' ' : h ? W : z,
                O(
                  d,
                  u.map(({ printed: e }) => e)
                )
              ])
            ];
          return (
            (a.firstChild && tv(a.firstChild)) ||
            (a.isSelfClosing && tm(a.parent)) ||
            p
              ? m.push(a.isSelfClosing ? ' ' : '')
              : m.push(
                  t.bracketSameLine
                    ? a.isSelfClosing
                      ? ' '
                      : ''
                    : a.isSelfClosing
                      ? z
                      : $
                ),
            m
          );
        })(e, t, r),
        a.isSelfClosing || ((n = a).firstChild && tv(n.firstChild)) ? '' : ty(n)
      ];
    }
    function tS(e, t) {
      return e.prev && tf(e.prev) ? '' : [tk(e, t), tw(e, t)];
    }
    function tk(e, t) {
      return tv(e) ? ty(e.parent) : td(e) ? tp(e.prev, t) : '';
    }
    var tb = '<!doctype';
    function tw(e, t) {
      switch (e.kind) {
        case 'ieConditionalComment':
        case 'ieConditionalStartComment':
          return `<!--[if ${e.condition}`;
        case 'ieConditionalEndComment':
          return '\x3c!--<!';
        case 'interpolation':
          return '{{';
        case 'docType': {
          if ('html' === e.value) {
            let { filepath: e } = t;
            if (e && /\.html?$/.test(e)) return tb;
          }
          let r = ti(e);
          return t.originalText.slice(r, r + tb.length);
        }
        case 'angularIcuExpression':
          return '{';
        case 'element':
          if (e.condition) return `<!--[if ${e.condition}]><!--><${e.rawName}`;
        default:
          return `<${e.rawName}`;
      }
    }
    function ty(e) {
      switch (e.kind) {
        case 'ieConditionalComment':
          return ']>';
        case 'element':
          if (e.condition) return '>\x3c!--<![endif]--\x3e';
        default:
          return '>';
      }
    }
    var tC = function (e, t) {
        if (!e.endSourceSpan) return '';
        let r = e.startSourceSpan.end.offset;
        e.firstChild && tv(e.firstChild) && (r -= ty(e).length);
        let n = e.endSourceSpan.start.offset;
        return (
          e.lastChild && tg(e.lastChild)
            ? (n += tu(e, t).length)
            : tm(e) && (n -= tp(e.lastChild, t).length),
          t.originalText.slice(r, n)
        );
      },
      tT = new Set(['if', 'else if', 'for', 'switch', 'case']),
      tx = null;
    function tE(e) {
      if (null !== tx && (tx.property, 1)) {
        let e = tx;
        return ((tx = tE.prototype = null), e);
      }
      return ((tx = tE.prototype = e ?? Object.create(null)), new tE());
    }
    for (let e = 0; e <= 10; e++) tE();
    var tL = [['children']],
      tq = (function (e, t = 'type') {
        return (
          tE(e),
          function (r) {
            let n = r[t],
              a = e[n];
            if (!Array.isArray(a))
              throw Object.assign(Error(`Missing visitor keys for '${n}'.`), {
                node: r
              });
            return a;
          }
        );
      })(
        {
          root: tL[0],
          element: ['attrs', 'startTagComments', 'children'],
          ieConditionalComment: tL[0],
          ieConditionalStartComment: [],
          ieConditionalEndComment: [],
          interpolation: tL[0],
          text: tL[0],
          docType: [],
          comment: [],
          attribute: [],
          startTagComment: [],
          cdata: [],
          angularControlFlowBlock: ['children', 'parameters'],
          angularControlFlowBlockParameters: tL[0],
          angularControlFlowBlockParameter: [],
          angularLetDeclaration: ['init'],
          angularLetDeclarationInitializer: [],
          angularIcuExpression: ['cases'],
          angularIcuCase: ['expression']
        },
        'kind'
      ),
      tN = new Set([
        'sourceSpan',
        'startSourceSpan',
        'endSourceSpan',
        'nameSpan',
        'valueSpan',
        'keySpan',
        'tagDefinition',
        'tokens',
        'valueTokens',
        'switchValueSourceSpan',
        'expSourceSpan',
        'valueSourceSpan'
      ]),
      tA = new Set(['if', 'else if', 'for', 'switch', 'case']);
    function tD(e, t, r) {
      if ('text' === e.kind || 'comment' === e.kind) return null;
      if (('yaml' === e.kind && delete t.value, 'attribute' === e.kind)) {
        let { fullName: n, value: a } = e;
        'style' === n ||
        'class' === n ||
        ('srcset' === n && ('img' === r.fullName || 'source' === r.fullName)) ||
        ('allow' === n && 'iframe' === r.fullName) ||
        n.startsWith('on') ||
        n.startsWith('@') ||
        n.startsWith(':') ||
        n.startsWith('.') ||
        n.startsWith('#') ||
        n.startsWith('v-') ||
        ('vars' === n && 'style' === r.fullName) ||
        (('setup' === n || 'generic' === n) && 'script' === r.fullName) ||
        'slot-scope' === n ||
        n.startsWith('(') ||
        n.startsWith('[') ||
        n.startsWith('*') ||
        n.startsWith('bind') ||
        n.startsWith('i18n') ||
        n.startsWith('on-') ||
        n.startsWith('ng-') ||
        a?.includes('{{')
          ? delete t.value
          : a && (t.value = h(0, a, /'|&quot;|&apos;/g, '"'));
      }
      if (
        ('docType' === e.kind &&
          (t.value = h(0, e.value.toLowerCase(), /\s+/g, ' ')),
        'angularControlFlowBlock' === e.kind && e.parameters?.children)
      )
        for (let r of t.parameters.children)
          tA.has(e.name)
            ? delete r.expression
            : (r.expression = r.expression.trim());
      ('angularIcuExpression' === e.kind &&
        (t.switchValue = e.switchValue.trim()),
        'angularLetDeclarationInitializer' === e.kind && delete t.value,
        'element' === e.kind &&
          e.isVoid &&
          !e.isSelfClosing &&
          (t.isSelfClosing = !0));
    }
    tD.ignoredProperties = tN;
    var tI = /^\s*<!--\s*@(?:noformat|noprettier)\s*-->/,
      tM = /^\s*<!--\s*@(?:format|prettier)\s*-->/,
      tP = e => tM.test(e),
      tB = e => tI.test(e),
      tH = new Map([
        ['if', new Set(['else if', 'else'])],
        ['else if', new Set(['else if', 'else'])],
        ['for', new Set(['empty'])],
        ['defer', new Set(['placeholder', 'error', 'loading'])],
        ['placeholder', new Set(['placeholder', 'error', 'loading'])],
        ['error', new Set(['placeholder', 'error', 'loading'])],
        ['loading', new Set(['placeholder', 'error', 'loading'])]
      ]);
    function tR(e, t, r) {
      let n = e.node;
      if (ew(n)) {
        let e = (function e(t) {
          let r = ts(t);
          return 'element' === t.kind && !t.endSourceSpan && eo(t.children)
            ? Math.max(r, e(m(0, t.children, -1)))
            : r;
        })(n);
        return [
          tk(n, t),
          B(
            Y.trimEnd(
              t.originalText.slice(
                ti(n) + (n.prev && tf(n.prev) ? tw(n).length : 0),
                e - (n.next && td(n.next) ? tp(n, t).length : 0)
              )
            )
          ),
          tc(n, t)
        ];
      }
      return r();
    }
    function tF(e, t) {
      return ey(e) && ey(t)
        ? e.isTrailingSpaceSensitive
          ? e.hasTrailingSpaces
            ? eL(t)
              ? W
              : z
            : ''
          : eL(t)
            ? W
            : $
        : (tf(e) &&
              (ew(t) ||
                t.firstChild ||
                t.isSelfClosing ||
                ('element' === t.kind && t.attrs.length > 0))) ||
            ('element' === e.kind && e.isSelfClosing && td(t))
          ? ''
          : 'comment' === t.kind &&
              t.isLeadingSpaceSensitive &&
              !t.hasLeadingSpaces
            ? $
            : !t.isLeadingSpaceSensitive ||
                eL(t) ||
                (td(t) &&
                  e.lastChild &&
                  tg(e.lastChild) &&
                  e.lastChild.lastChild &&
                  tg(e.lastChild.lastChild))
              ? W
              : t.hasLeadingSpaces
                ? z
                : $;
    }
    function tU(e, t, r) {
      let { node: n } = e;
      if (eE(n))
        return [
          R,
          ...e.map(() => {
            let n = e.node,
              a = n.prev ? tF(n.prev, n) : '';
            return [a ? [a, ex(n.prev) ? W : ''] : '', tR(e, t, r)];
          }, 'children')
        ];
      let a = n.children.map(() => Symbol(''));
      return e.map(({ node: n, index: i }) => {
        if (ey(n)) {
          if (n.prev && ey(n.prev)) {
            let a = tF(n.prev, n);
            if (a) return ex(n.prev) ? [W, W, tR(e, t, r)] : [a, tR(e, t, r)];
          }
          return tR(e, t, r);
        }
        let s = [],
          o = [],
          l = [],
          c = [],
          u = n.prev ? tF(n.prev, n) : '',
          p = n.next ? tF(n, n.next) : '';
        return (
          u &&
            (ex(n.prev)
              ? s.push(W, W)
              : u === W
                ? s.push(W)
                : ey(n.prev)
                  ? o.push(u)
                  : o.push(V('', $, { groupId: a[i - 1] }))),
          p &&
            (ex(n)
              ? ey(n.next) && c.push(W, W)
              : p === W
                ? ey(n.next) && c.push(W)
                : l.push(p)),
          [...s, U([...o, U([tR(e, t, r), ...l], { id: a[i] })]), ...c]
        );
      }, 'children');
    }
    function tV(e) {
      return !(
        e.next?.kind === 'angularControlFlowBlock' &&
        tH.get(e.name)?.has(e.next.name)
      );
    }
    var tO =
      (((t1 = {})[(t1.RAW_TEXT = 0)] = 'RAW_TEXT'),
      (t1[(t1.ESCAPABLE_RAW_TEXT = 1)] = 'ESCAPABLE_RAW_TEXT'),
      (t1[(t1.PARSABLE_DATA = 2)] = 'PARSABLE_DATA'),
      t1);
    function tz(e, t = !0) {
      if (':' != e[0]) return [null, e];
      let r = e.indexOf(':', 1);
      if (-1 === r) {
        if (t)
          throw Error(`Unsupported format "${e}" expecting ":namespace:name"`);
        return [null, e];
      }
      return [e.slice(1, r), e.slice(r + 1)];
    }
    function t$(e) {
      return 'ng-container' === tz(e)[1];
    }
    function tW(e) {
      return 'ng-content' === tz(e)[1];
    }
    function tj(e) {
      return null === e ? null : tz(e)[0];
    }
    function tG(e, t) {
      return e ? `:${e}:${t}` : t;
    }
    var tK = () => Object.create(null);
    function tJ(e, t, r) {
      let n = t ?? '';
      for (let [t, i] of r) {
        let r = t.toLowerCase();
        for (let t of i) {
          var a;
          let i = t.toLowerCase(),
            s = (a = t2)[i] ?? (a[i] = tK());
          (s[n] ?? (s[n] = tK()))[r] = e;
        }
      }
    }
    var tY = 'custom-elements',
      tZ = 'no-errors-schema',
      tQ = /-+([a-z0-9])/g,
      tX = class {};
    function t0(e) {
      let [t, r] = tz(e.toLowerCase(), !1);
      return 'svg' === t || 'math' === t ? `:${t}:${r}` : r;
    }
    var t1,
      t2,
      t3,
      t4,
      t5 = [
        '[Element]|textContent,%ariaActiveDescendantElement,%ariaAtomic,%ariaAutoComplete,%ariaBusy,%ariaChecked,%ariaColCount,%ariaColIndex,%ariaColIndexText,%ariaColSpan,%ariaControlsElements,%ariaCurrent,%ariaDescribedByElements,%ariaDescription,%ariaDetailsElements,%ariaDisabled,%ariaErrorMessageElements,%ariaExpanded,%ariaFlowToElements,%ariaHasPopup,%ariaHidden,%ariaInvalid,%ariaKeyShortcuts,%ariaLabel,%ariaLabelledByElements,%ariaLevel,%ariaLive,%ariaModal,%ariaMultiLine,%ariaMultiSelectable,%ariaOrientation,%ariaOwnsElements,%ariaPlaceholder,%ariaPosInSet,%ariaPressed,%ariaReadOnly,%ariaRelevant,%ariaRequired,%ariaRoleDescription,%ariaRowCount,%ariaRowIndex,%ariaRowIndexText,%ariaRowSpan,%ariaSelected,%ariaSetSize,%ariaSort,%ariaValueMax,%ariaValueMin,%ariaValueNow,%ariaValueText,%classList,className,elementTiming,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*fullscreenchange,*fullscreenerror,*search,*webkitfullscreenchange,*webkitfullscreenerror,outerHTML,%part,#scrollLeft,#scrollTop,slot,*message,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored',
        '[HTMLElement]^[Element]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,!inert,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy',
        'abbr,address,article,aside,b,bdi,bdo,cite,content,code,dd,dfn,dt,em,figcaption,figure,footer,header,hgroup,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,search,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy',
        'media^[HTMLElement]|!autoplay,!controls,%controlsList,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,*waitingforkey,#playbackRate,preload,!preservesPitch,src,%srcObject,#volume',
        ':svg:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex',
        ':svg:graphics^:svg:|',
        ':svg:animation^:svg:|*begin,*end,*repeat',
        ':svg:geometry^:svg:|',
        ':svg:componentTransferFunction^:svg:|',
        ':svg:gradient^:svg:|',
        ':svg:textContent^:svg:graphics|',
        ':svg:textPositioning^:svg:textContent|',
        'a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,rev,search,shape,target,text,type,username',
        'area^[HTMLElement]|alt,coords,download,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,search,shape,target,username',
        'audio^media|',
        'br^[HTMLElement]|clear',
        'base^[HTMLElement]|href,target',
        'body^[HTMLElement]|aLink,background,bgColor,link,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink',
        'button^[HTMLElement]|!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value',
        'canvas^[HTMLElement]|#height,#width',
        'content^[HTMLElement]|select',
        'dl^[HTMLElement]|!compact',
        'data^[HTMLElement]|value',
        'datalist^[HTMLElement]|',
        'details^[HTMLElement]|!open',
        'dialog^[HTMLElement]|!open,returnValue',
        'dir^[HTMLElement]|!compact',
        'div^[HTMLElement]|align',
        'embed^[HTMLElement]|align,height,name,src,type,width',
        'fieldset^[HTMLElement]|!disabled,name',
        'font^[HTMLElement]|color,face,size',
        'form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target',
        'frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src',
        'frameset^[HTMLElement]|cols,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows',
        'geolocation^[HTMLElement]|accuracymode,!autolocate,*location,*promptaction,*promptdismiss,*validationstatuschange,!watch',
        'hr^[HTMLElement]|align,color,!noShade,size,width',
        'head^[HTMLElement]|',
        'h1,h2,h3,h4,h5,h6^[HTMLElement]|align',
        'html^[HTMLElement]|version',
        'iframe^[HTMLElement]|align,allow,!allowFullscreen,!allowPaymentRequest,csp,!credentialless,frameBorder,height,loading,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width',
        'img^[HTMLElement]|align,alt,border,%crossOrigin,decoding,#height,#hspace,!isMap,loading,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width',
        'input^[HTMLElement]|accept,align,alt,autocomplete,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width',
        'li^[HTMLElement]|type,#value',
        'label^[HTMLElement]|htmlFor',
        'legend^[HTMLElement]|align',
        'link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,imageSizes,imageSrcset,integrity,media,referrerPolicy,rel,%relList,rev,%sizes,target,type',
        'map^[HTMLElement]|name',
        'marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width',
        'menu^[HTMLElement]|!compact',
        'meta^[HTMLElement]|content,httpEquiv,media,name,scheme',
        'meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value',
        'ins,del^[HTMLElement]|cite,dateTime',
        'ol^[HTMLElement]|!compact,!reversed,#start,type',
        'object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width',
        'optgroup^[HTMLElement]|!disabled,label',
        'option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value',
        'output^[HTMLElement]|defaultValue,%htmlFor,name,value',
        'p^[HTMLElement]|align',
        'param^[HTMLElement]|name,type,value,valueType',
        'picture^[HTMLElement]|',
        'pre^[HTMLElement]|#width',
        'progress^[HTMLElement]|#max,#value',
        'q,blockquote,cite^[HTMLElement]|',
        'script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,!noModule,%referrerPolicy,src,text,type',
        'select^[HTMLElement]|autocomplete,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value',
        'selectedcontent^[HTMLElement]|',
        'slot^[HTMLElement]|name',
        'source^[HTMLElement]|#height,media,sizes,src,srcset,type,#width',
        'span^[HTMLElement]|',
        'style^[HTMLElement]|!disabled,media,type',
        'search^[HTMLELement]|',
        'caption^[HTMLElement]|align',
        'th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width',
        'col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width',
        'table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width',
        'tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign',
        'tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign',
        'template^[HTMLElement]|',
        'textarea^[HTMLElement]|autocomplete,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap',
        'time^[HTMLElement]|dateTime',
        'title^[HTMLElement]|text',
        'track^[HTMLElement]|!default,kind,label,src,srclang',
        'ul^[HTMLElement]|!compact,type',
        'unknown^[HTMLElement]|',
        'video^media|!disablePictureInPicture,#height,*enterpictureinpicture,*leavepictureinpicture,!playsInline,poster,#width',
        ':svg:a^:svg:graphics|',
        ':svg:animate^:svg:animation|',
        ':svg:animateMotion^:svg:animation|',
        ':svg:animateTransform^:svg:animation|',
        ':svg:circle^:svg:geometry|',
        ':svg:clipPath^:svg:graphics|',
        ':svg:defs^:svg:graphics|',
        ':svg:desc^:svg:|',
        ':svg:discard^:svg:|',
        ':svg:ellipse^:svg:geometry|',
        ':svg:feBlend^:svg:|',
        ':svg:feColorMatrix^:svg:|',
        ':svg:feComponentTransfer^:svg:|',
        ':svg:feComposite^:svg:|',
        ':svg:feConvolveMatrix^:svg:|',
        ':svg:feDiffuseLighting^:svg:|',
        ':svg:feDisplacementMap^:svg:|',
        ':svg:feDistantLight^:svg:|',
        ':svg:feDropShadow^:svg:|',
        ':svg:feFlood^:svg:|',
        ':svg:feFuncA^:svg:componentTransferFunction|',
        ':svg:feFuncB^:svg:componentTransferFunction|',
        ':svg:feFuncG^:svg:componentTransferFunction|',
        ':svg:feFuncR^:svg:componentTransferFunction|',
        ':svg:feGaussianBlur^:svg:|',
        ':svg:feImage^:svg:|',
        ':svg:feMerge^:svg:|',
        ':svg:feMergeNode^:svg:|',
        ':svg:feMorphology^:svg:|',
        ':svg:feOffset^:svg:|',
        ':svg:fePointLight^:svg:|',
        ':svg:feSpecularLighting^:svg:|',
        ':svg:feSpotLight^:svg:|',
        ':svg:feTile^:svg:|',
        ':svg:feTurbulence^:svg:|',
        ':svg:filter^:svg:|',
        ':svg:foreignObject^:svg:graphics|',
        ':svg:g^:svg:graphics|',
        ':svg:image^:svg:graphics|decoding',
        ':svg:line^:svg:geometry|',
        ':svg:linearGradient^:svg:gradient|',
        ':svg:mpath^:svg:|',
        ':svg:marker^:svg:|',
        ':svg:mask^:svg:|',
        ':svg:metadata^:svg:|',
        ':svg:path^:svg:geometry|',
        ':svg:pattern^:svg:|',
        ':svg:polygon^:svg:geometry|',
        ':svg:polyline^:svg:geometry|',
        ':svg:radialGradient^:svg:gradient|',
        ':svg:rect^:svg:geometry|',
        ':svg:svg^:svg:graphics|#currentScale,#zoomAndPan',
        ':svg:script^:svg:|type',
        ':svg:set^:svg:animation|',
        ':svg:stop^:svg:|',
        ':svg:style^:svg:|!disabled,media,title,type',
        ':svg:switch^:svg:graphics|',
        ':svg:symbol^:svg:|',
        ':svg:tspan^:svg:textPositioning|',
        ':svg:text^:svg:textPositioning|',
        ':svg:textPath^:svg:textContent|',
        ':svg:title^:svg:|',
        ':svg:use^:svg:graphics|',
        ':svg:view^:svg:|#zoomAndPan',
        'data^[HTMLElement]|value',
        'keygen^[HTMLElement]|!autofocus,challenge,!disabled,form,keytype,name',
        'menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default',
        'summary^[HTMLElement]|',
        'time^[HTMLElement]|dateTime',
        ':svg:cursor^:svg:|',
        ':math:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforeinput,*beforematch,*beforetoggle,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contentvisibilityautostatechange,*contextlost,*contextmenu,*contextrestored,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*scrollend,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex',
        ':math:math^:math:|',
        ':math:maction^:math:|',
        ':math:menclose^:math:|',
        ':math:merror^:math:|',
        ':math:mfenced^:math:|',
        ':math:mfrac^:math:|',
        ':math:mi^:math:|',
        ':math:mmultiscripts^:math:|',
        ':math:mn^:math:|',
        ':math:mo^:math:|',
        ':math:mover^:math:|',
        ':math:mpadded^:math:|',
        ':math:mphantom^:math:|',
        ':math:mroot^:math:|',
        ':math:mrow^:math:|',
        ':math:ms^:math:|',
        ':math:mspace^:math:|',
        ':math:msqrt^:math:|',
        ':math:mstyle^:math:|',
        ':math:msub^:math:|',
        ':math:msubsup^:math:|',
        ':math:msup^:math:|',
        ':math:mtable^:math:|',
        ':math:mtd^:math:|',
        ':math:mtext^:math:|',
        ':math:mtr^:math:|',
        ':math:munder^:math:|',
        ':math:munderover^:math:|',
        ':math:semantics^:math:|'
      ],
      t6 = new Map(
        Object.entries({
          class: 'className',
          for: 'htmlFor',
          formaction: 'formAction',
          innerHtml: 'innerHTML',
          readonly: 'readOnly',
          tabindex: 'tabIndex',
          'aria-activedescendant': 'ariaActiveDescendantElement',
          'aria-atomic': 'ariaAtomic',
          'aria-autocomplete': 'ariaAutoComplete',
          'aria-busy': 'ariaBusy',
          'aria-checked': 'ariaChecked',
          'aria-colcount': 'ariaColCount',
          'aria-colindex': 'ariaColIndex',
          'aria-colindextext': 'ariaColIndexText',
          'aria-colspan': 'ariaColSpan',
          'aria-controls': 'ariaControlsElements',
          'aria-current': 'ariaCurrent',
          'aria-describedby': 'ariaDescribedByElements',
          'aria-description': 'ariaDescription',
          'aria-details': 'ariaDetailsElements',
          'aria-disabled': 'ariaDisabled',
          'aria-errormessage': 'ariaErrorMessageElements',
          'aria-expanded': 'ariaExpanded',
          'aria-flowto': 'ariaFlowToElements',
          'aria-haspopup': 'ariaHasPopup',
          'aria-hidden': 'ariaHidden',
          'aria-invalid': 'ariaInvalid',
          'aria-keyshortcuts': 'ariaKeyShortcuts',
          'aria-label': 'ariaLabel',
          'aria-labelledby': 'ariaLabelledByElements',
          'aria-level': 'ariaLevel',
          'aria-live': 'ariaLive',
          'aria-modal': 'ariaModal',
          'aria-multiline': 'ariaMultiLine',
          'aria-multiselectable': 'ariaMultiSelectable',
          'aria-orientation': 'ariaOrientation',
          'aria-owns': 'ariaOwnsElements',
          'aria-placeholder': 'ariaPlaceholder',
          'aria-posinset': 'ariaPosInSet',
          'aria-pressed': 'ariaPressed',
          'aria-readonly': 'ariaReadOnly',
          'aria-required': 'ariaRequired',
          'aria-roledescription': 'ariaRoleDescription',
          'aria-rowcount': 'ariaRowCount',
          'aria-rowindex': 'ariaRowIndex',
          'aria-rowindextext': 'ariaRowIndexText',
          'aria-rowspan': 'ariaRowSpan',
          'aria-selected': 'ariaSelected',
          'aria-setsize': 'ariaSetSize',
          'aria-sort': 'ariaSort',
          'aria-valuemax': 'ariaValueMax',
          'aria-valuemin': 'ariaValueMin',
          'aria-valuenow': 'ariaValueNow',
          'aria-valuetext': 'ariaValueText'
        })
      ),
      t9 = Array.from(t6).reduce((e, [t, r]) => (e.set(t, r), e), new Map()),
      t8 = class extends tX {
        _schema = new Map();
        _eventSchema = new Map();
        constructor() {
          (super(),
            t5.forEach(e => {
              let t = new Map(),
                r = new Set(),
                [n, a] = e.split('|'),
                i = a.split(','),
                [s, o] = n.split('^');
              s.split(',').forEach(e => {
                (this._schema.set(e.toLowerCase(), t),
                  this._eventSchema.set(e.toLowerCase(), r));
              });
              let l = o && this._schema.get(o.toLowerCase());
              if (l) {
                for (let [e, r] of l) t.set(e, r);
                for (let e of this._eventSchema.get(o.toLowerCase())) r.add(e);
              }
              i.forEach(e => {
                if (e.length > 0)
                  switch (e[0]) {
                    case '*':
                      r.add(e.substring(1));
                      break;
                    case '!':
                      t.set(e.substring(1), 'boolean');
                      break;
                    case '#':
                      t.set(e.substring(1), 'number');
                      break;
                    case '%':
                      t.set(e.substring(1), 'object');
                      break;
                    default:
                      t.set(e, 'string');
                  }
              });
            }));
        }
        hasProperty(e, t, r) {
          if (r.some(e => e.name === tZ)) return !0;
          let n = t0(e);
          if (n.includes('-')) {
            if (t$(n) || tW(n)) return !1;
            if (r.some(e => e.name === tY)) return !0;
          }
          return (this._schema.get(n) || this._schema.get('unknown')).has(t);
        }
        hasElement(e, t) {
          if (t.some(e => e.name === tZ)) return !0;
          let r = t0(e);
          return (
            !!(
              r.includes('-') &&
              (t$(r) || tW(r) || t.some(e => e.name === tY))
            ) || this._schema.has(r)
          );
        }
        securityContext(e, t, r) {
          r && (t = this.getMappedPropName(t));
          let [n, a] = tz(e, !1);
          return (function (e, t, r) {
            let n = (t2 ||
              ((t2 = tK()),
              tJ(1, void 0, [
                ['iframe', ['srcdoc']],
                ['*', ['innerHTML', 'outerHTML']]
              ]),
              tJ(2, void 0, [['*', ['style']]]),
              tJ(4, void 0, [
                ['*', ['formAction']],
                ['area', ['href']],
                ['a', ['href', 'xlink:href']],
                ['form', ['action']],
                ['img', ['src']],
                ['video', ['src']]
              ]),
              tJ(4, 'math', [['*', ['href', 'xlink:href']]]),
              tJ(5, void 0, [
                ['base', ['href']],
                ['embed', ['src']],
                ['frame', ['src']],
                ['iframe', ['src']],
                ['link', ['href']],
                ['object', ['codebase', 'data']]
              ]),
              tJ(4, 'svg', [['a', ['href', 'xlink:href']]]),
              tJ(6, 'svg', [
                ['animate', ['attributeName', 'values', 'to', 'from']],
                ['set', ['to', 'attributeName']],
                ['animateMotion', ['attributeName']],
                ['animateTransform', ['attributeName']]
              ]),
              tJ(6, void 0, [
                [
                  'unknown',
                  [
                    'attributeName',
                    'values',
                    'to',
                    'from',
                    'sandbox',
                    'allow',
                    'allowFullscreen',
                    'referrerPolicy',
                    'csp',
                    'fetchPriority',
                    'credentialless'
                  ]
                ],
                [
                  'iframe',
                  [
                    'sandbox',
                    'allow',
                    'allowFullscreen',
                    'referrerPolicy',
                    'csp',
                    'fetchPriority',
                    'credentialless'
                  ]
                ]
              ]),
              t2))[t.toLowerCase()];
            if (!n) return 0;
            let a = e.toLowerCase(),
              i;
            if (r) {
              let e = n[r];
              e && (i = e[a] ?? e['*']);
            }
            if (void 0 === i) {
              let e = n[''];
              e && (i = e[a] ?? e['*']);
            }
            return i ?? 0;
          })(a, t, n);
        }
        getMappedPropName(e) {
          return t6.get(e) ?? e;
        }
        getDefaultComponentElementName() {
          return 'ng-component';
        }
        validateProperty(e) {
          return e.toLowerCase().startsWith('on')
            ? {
                error: !0,
                msg: `Binding to event property '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...
If '${e}' is a directive input, make sure the directive is imported by the current module.`
              }
            : { error: !1 };
        }
        validateAttribute(e) {
          return e.toLowerCase().startsWith('on')
            ? {
                error: !0,
                msg: `Binding to event attribute '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...`
              }
            : { error: !1 };
        }
        allKnownElementNames() {
          return Array.from(this._schema.keys());
        }
        allKnownAttributesOfElement(e) {
          let t = t0(e);
          return Array.from(
            (this._schema.get(t) || this._schema.get('unknown')).keys()
          ).map(e => t9.get(e) ?? e);
        }
        allKnownEventsOfElement(e) {
          let t = t0(e);
          return Array.from(this._eventSchema.get(t) ?? []);
        }
        normalizeAnimationStyleProperty(e) {
          return e.replace(tQ, (...e) => e[1].toUpperCase());
        }
        normalizeAnimationStyleValue(e, t, r) {
          let n = '',
            a = r.toString().trim(),
            i = null;
          if (
            (function (e) {
              switch (e) {
                case 'width':
                case 'height':
                case 'minWidth':
                case 'minHeight':
                case 'maxWidth':
                case 'maxHeight':
                case 'left':
                case 'top':
                case 'bottom':
                case 'right':
                case 'fontSize':
                case 'outlineWidth':
                case 'outlineOffset':
                case 'paddingTop':
                case 'paddingLeft':
                case 'paddingBottom':
                case 'paddingRight':
                case 'marginTop':
                case 'marginLeft':
                case 'marginBottom':
                case 'marginRight':
                case 'borderRadius':
                case 'borderWidth':
                case 'borderTopWidth':
                case 'borderLeftWidth':
                case 'borderRightWidth':
                case 'borderBottomWidth':
                case 'textIndent':
                  return !0;
                default:
                  return !1;
              }
            })(e) &&
            0 !== r &&
            '0' !== r
          )
            if ('number' == typeof r) n = 'px';
            else {
              let e = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
              e &&
                0 == e[1].length &&
                (i = `Please provide a CSS unit value for ${t}:${r}`);
            }
          return { error: i, value: a + n };
        }
      },
      t7 = class {
        closedByChildren = {};
        contentType;
        closedByParent = !1;
        implicitNamespacePrefix;
        isVoid;
        ignoreFirstLf;
        canSelfClose;
        preventNamespaceInheritance;
        constructor({
          closedByChildren: e,
          implicitNamespacePrefix: t,
          contentType: r = 2,
          closedByParent: n = !1,
          isVoid: a = !1,
          ignoreFirstLf: i = !1,
          preventNamespaceInheritance: s = !1,
          canSelfClose: o = !1
        } = {}) {
          (e && e.length > 0 && e.forEach(e => (this.closedByChildren[e] = !0)),
            (this.isVoid = a),
            (this.closedByParent = n || a),
            (this.implicitNamespacePrefix = t || null),
            (this.contentType = r),
            (this.ignoreFirstLf = i),
            (this.preventNamespaceInheritance = s),
            (this.canSelfClose = o ?? a));
        }
        isClosedByChild(e) {
          return this.isVoid || e.toLowerCase() in this.closedByChildren;
        }
        getContentType(e) {
          return 'object' == typeof this.contentType
            ? ((void 0 === e ? void 0 : this.contentType[e]) ??
                this.contentType.default)
            : this.contentType;
        }
      };
    function re(e) {
      return (
        t4 ||
          ((t3 = new t7({ canSelfClose: !0 })),
          (t4 = Object.assign(Object.create(null), {
            base: new t7({ isVoid: !0 }),
            meta: new t7({ isVoid: !0 }),
            area: new t7({ isVoid: !0 }),
            embed: new t7({ isVoid: !0 }),
            link: new t7({ isVoid: !0 }),
            img: new t7({ isVoid: !0 }),
            input: new t7({ isVoid: !0 }),
            param: new t7({ isVoid: !0 }),
            hr: new t7({ isVoid: !0 }),
            br: new t7({ isVoid: !0 }),
            source: new t7({ isVoid: !0 }),
            track: new t7({ isVoid: !0 }),
            wbr: new t7({ isVoid: !0 }),
            p: new t7({
              closedByChildren: [
                'address',
                'article',
                'aside',
                'blockquote',
                'div',
                'dl',
                'fieldset',
                'footer',
                'form',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'header',
                'hgroup',
                'hr',
                'main',
                'nav',
                'ol',
                'p',
                'pre',
                'section',
                'table',
                'ul'
              ],
              closedByParent: !0
            }),
            thead: new t7({ closedByChildren: ['tbody', 'tfoot'] }),
            tbody: new t7({
              closedByChildren: ['tbody', 'tfoot'],
              closedByParent: !0
            }),
            tfoot: new t7({ closedByChildren: ['tbody'], closedByParent: !0 }),
            tr: new t7({ closedByChildren: ['tr'], closedByParent: !0 }),
            td: new t7({ closedByChildren: ['td', 'th'], closedByParent: !0 }),
            th: new t7({ closedByChildren: ['td', 'th'], closedByParent: !0 }),
            col: new t7({ isVoid: !0 }),
            svg: new t7({ implicitNamespacePrefix: 'svg' }),
            foreignObject: new t7({
              implicitNamespacePrefix: 'svg',
              preventNamespaceInheritance: !0
            }),
            math: new t7({ implicitNamespacePrefix: 'math' }),
            li: new t7({ closedByChildren: ['li'], closedByParent: !0 }),
            dt: new t7({ closedByChildren: ['dt', 'dd'] }),
            dd: new t7({ closedByChildren: ['dt', 'dd'], closedByParent: !0 }),
            rb: new t7({
              closedByChildren: ['rb', 'rt', 'rtc', 'rp'],
              closedByParent: !0
            }),
            rt: new t7({
              closedByChildren: ['rb', 'rt', 'rtc', 'rp'],
              closedByParent: !0
            }),
            rtc: new t7({
              closedByChildren: ['rb', 'rtc', 'rp'],
              closedByParent: !0
            }),
            rp: new t7({
              closedByChildren: ['rb', 'rt', 'rtc', 'rp'],
              closedByParent: !0
            }),
            optgroup: new t7({
              closedByChildren: ['optgroup'],
              closedByParent: !0
            }),
            option: new t7({
              closedByChildren: ['option', 'optgroup'],
              closedByParent: !0
            }),
            pre: new t7({ ignoreFirstLf: !0 }),
            listing: new t7({ ignoreFirstLf: !0 }),
            style: new t7({ contentType: 0 }),
            script: new t7({ contentType: 0 }),
            title: new t7({ contentType: { default: 1, svg: 2 } }),
            textarea: new t7({ contentType: 1, ignoreFirstLf: !0 })
          })),
          new t8().allKnownElementNames().forEach(e => {
            t4[e] || null !== tj(e) || (t4[e] = new t7({ canSelfClose: !1 }));
          })),
        t4[e] ?? t3
      );
    }
    var rt = class gi {
        file;
        offset;
        line;
        col;
        constructor(e, t, r, n) {
          ((this.file = e), (this.offset = t), (this.line = r), (this.col = n));
        }
        toString() {
          return null != this.offset
            ? `${this.file.url}@${this.line}:${this.col}`
            : this.file.url;
        }
        moveBy(e) {
          let t = this.file.content,
            r = t.length,
            n = this.offset,
            a = this.line,
            i = this.col;
          for (; n > 0 && e < 0;)
            if ((n--, e++, 10 == t.charCodeAt(n))) {
              a--;
              let e = t.substring(0, n - 1).lastIndexOf(`
`);
              i = e > 0 ? n - e : n;
            } else i--;
          for (; n < r && e > 0;) {
            let r = t.charCodeAt(n);
            (n++, e--, 10 == r ? (a++, (i = 0)) : i++);
          }
          return new gi(this.file, n, a, i);
        }
        getContext(e, t) {
          let r = this.file.content,
            n = this.offset;
          if (null != n) {
            n > r.length - 1 && (n = r.length - 1);
            let a = n,
              i = 0,
              s = 0;
            for (
              ;
              i < e &&
              n > 0 &&
              (n--,
              i++,
              r[n] !=
                `
` || ++s != t);
            );
            for (
              i = 0, s = 0;
              i < e &&
              a < r.length - 1 &&
              (a++,
              i++,
              r[a] !=
                `
` || ++s != t);
            );
            return {
              before: r.substring(n, this.offset),
              after: r.substring(this.offset, a + 1)
            };
          }
          return null;
        }
      },
      rr = class {
        content;
        url;
        constructor(e, t) {
          ((this.content = e), (this.url = t));
        }
      },
      rn = class {
        start;
        end;
        fullStart;
        details;
        constructor(e, t, r = e, n = null) {
          ((this.start = e),
            (this.end = t),
            (this.fullStart = r),
            (this.details = n));
        }
        toString() {
          return this.start.file.content.substring(
            this.start.offset,
            this.end.offset
          );
        }
      },
      ra =
        (((nt = {})[(nt.WARNING = 0)] = 'WARNING'),
        (nt[(nt.ERROR = 1)] = 'ERROR'),
        nt),
      ri = class extends Error {
        span;
        msg;
        level;
        relatedError;
        constructor(e, t, r = 1, n) {
          (super(t),
            (this.span = e),
            (this.msg = t),
            (this.level = r),
            (this.relatedError = n),
            Object.setPrototypeOf(this, new.target.prototype));
        }
        contextualMessage() {
          let e = this.span.start.getContext(100, 3);
          return e
            ? `${this.msg} ("${e.before}[${ra[this.level]} ->]${e.after}")`
            : this.msg;
        }
        toString() {
          let e = this.span.details ? `, ${this.span.details}` : '';
          return `${this.contextualMessage()}: ${this.span.start}${e}`;
        }
      },
      rs = class {
        sourceSpan;
        i18n;
        constructor(e, t) {
          ((this.sourceSpan = e), (this.i18n = t));
        }
      },
      ro = class extends rs {
        value;
        tokens;
        constructor(e, t, r, n) {
          (super(t, n), (this.value = e), (this.tokens = r));
        }
        visit(e, t) {
          return e.visitText(this, t);
        }
        kind = 'text';
      },
      rl = class extends rs {
        value;
        tokens;
        constructor(e, t, r, n) {
          (super(t, n), (this.value = e), (this.tokens = r));
        }
        visit(e, t) {
          return e.visitCdata(this, t);
        }
        kind = 'cdata';
      },
      rc = class extends rs {
        switchValue;
        type;
        cases;
        switchValueSourceSpan;
        constructor(e, t, r, n, a, i) {
          (super(n, i),
            (this.switchValue = e),
            (this.type = t),
            (this.cases = r),
            (this.switchValueSourceSpan = a));
        }
        visit(e, t) {
          return e.visitExpansion(this, t);
        }
        kind = 'expansion';
      },
      ru = class {
        value;
        expression;
        sourceSpan;
        valueSourceSpan;
        expSourceSpan;
        constructor(e, t, r, n, a) {
          ((this.value = e),
            (this.expression = t),
            (this.sourceSpan = r),
            (this.valueSourceSpan = n),
            (this.expSourceSpan = a));
        }
        visit(e, t) {
          return e.visitExpansionCase(this, t);
        }
        kind = 'expansionCase';
      },
      rp = class extends rs {
        name;
        value;
        keySpan;
        valueSpan;
        valueTokens;
        constructor(e, t, r, n, a, i, s) {
          (super(r, s),
            (this.name = e),
            (this.value = t),
            (this.keySpan = n),
            (this.valueSpan = a),
            (this.valueTokens = i));
        }
        visit(e, t) {
          return e.visitAttribute(this, t);
        }
        kind = 'attribute';
        get nameSpan() {
          return this.keySpan;
        }
      },
      rh = class {
        value;
        type;
        sourceSpan;
        constructor(e, t, r) {
          ((this.value = e), (this.type = t), (this.sourceSpan = r));
        }
        visit(e, t) {
          return e.visitStartTagComment
            ? e.visitStartTagComment(this, t)
            : void 0;
        }
        kind = 'startTagComment';
      },
      rd = class extends rs {
        name;
        attrs;
        directives;
        children;
        isSelfClosing;
        startSourceSpan;
        endSourceSpan;
        nameSpan;
        isVoid;
        comments;
        constructor(e, t, r, n, a, i, s, o = null, l = null, c, u, p = []) {
          (super(i, u),
            (this.name = e),
            (this.attrs = t),
            (this.directives = r),
            (this.children = n),
            (this.isSelfClosing = a),
            (this.startSourceSpan = s),
            (this.endSourceSpan = o),
            (this.nameSpan = l),
            (this.isVoid = c),
            (this.comments = p));
        }
        visit(e, t) {
          return e.visitElement(this, t);
        }
        kind = 'element';
      },
      rm = class {
        value;
        sourceSpan;
        constructor(e, t) {
          ((this.value = e), (this.sourceSpan = t));
        }
        visit(e, t) {
          return e.visitComment(this, t);
        }
        kind = 'comment';
      },
      rg = class {
        value;
        sourceSpan;
        constructor(e, t) {
          ((this.value = e), (this.sourceSpan = t));
        }
        visit(e, t) {
          return e.visitDocType(this, t);
        }
        kind = 'docType';
      },
      rf = class extends rs {
        name;
        parameters;
        children;
        nameSpan;
        startSourceSpan;
        endSourceSpan;
        constructor(e, t, r, n, a, i, s = null, o) {
          (super(n, o),
            (this.name = e),
            (this.parameters = t),
            (this.children = r),
            (this.nameSpan = a),
            (this.startSourceSpan = i),
            (this.endSourceSpan = s));
        }
        visit(e, t) {
          return e.visitBlock(this, t);
        }
        kind = 'block';
      },
      rv = class extends rs {
        componentName;
        tagName;
        fullName;
        attrs;
        directives;
        children;
        isSelfClosing;
        startSourceSpan;
        endSourceSpan;
        comments;
        constructor(e, t, r, n, a, i, s, o, l, c = null, u, p = []) {
          (super(o, u),
            (this.componentName = e),
            (this.tagName = t),
            (this.fullName = r),
            (this.attrs = n),
            (this.directives = a),
            (this.children = i),
            (this.isSelfClosing = s),
            (this.startSourceSpan = l),
            (this.endSourceSpan = c),
            (this.comments = p));
        }
        visit(e, t) {
          return e.visitComponent(this, t);
        }
        kind = 'component';
      },
      r_ = class {
        name;
        attrs;
        sourceSpan;
        startSourceSpan;
        endSourceSpan;
        constructor(e, t, r, n, a = null) {
          ((this.name = e),
            (this.attrs = t),
            (this.sourceSpan = r),
            (this.startSourceSpan = n),
            (this.endSourceSpan = a));
        }
        visit(e, t) {
          return e.visitDirective(this, t);
        }
        kind = 'directive';
      },
      rS = class {
        expression;
        sourceSpan;
        constructor(e, t) {
          ((this.expression = e), (this.sourceSpan = t));
        }
        visit(e, t) {
          return e.visitBlockParameter(this, t);
        }
        kind = 'blockParameter';
        startSourceSpan = null;
        endSourceSpan = null;
      },
      rk = class {
        name;
        value;
        sourceSpan;
        nameSpan;
        valueSpan;
        constructor(e, t, r, n, a) {
          ((this.name = e),
            (this.value = t),
            (this.sourceSpan = r),
            (this.nameSpan = n),
            (this.valueSpan = a));
        }
        visit(e, t) {
          return e.visitLetDeclaration(this, t);
        }
        kind = 'letDeclaration';
        startSourceSpan = null;
        endSourceSpan = null;
      };
    function rb(e, t, r = null) {
      let n = [],
        a = e.visit ? t => e.visit(t, r) || t.visit(e, r) : t => t.visit(e, r);
      return (
        t.forEach(e => {
          let t = a(e);
          t && n.push(t);
        }),
        n
      );
    }
    var rw = class {
      visitElement(e, t) {
        this.visitChildren(t, t => {
          (t(e.attrs), t(e.directives), t(e.comments), t(e.children));
        });
      }
      visitAttribute(e, t) {}
      visitStartTagComment(e, t) {}
      visitText(e, t) {}
      visitCdata(e, t) {}
      visitComment(e, t) {}
      visitDocType(e, t) {}
      visitExpansion(e, t) {
        return this.visitChildren(t, t => {
          t(e.cases);
        });
      }
      visitExpansionCase(e, t) {}
      visitBlock(e, t) {
        this.visitChildren(t, t => {
          (t(e.parameters), t(e.children));
        });
      }
      visitBlockParameter(e, t) {}
      visitLetDeclaration(e, t) {}
      visitComponent(e, t) {
        this.visitChildren(t, t => {
          (t(e.attrs), t(e.comments), t(e.children));
        });
      }
      visitDirective(e, t) {
        this.visitChildren(t, t => {
          t(e.attrs);
        });
      }
      visitChildren(e, t) {
        let r = [],
          n = this;
        return (
          t(function (t) {
            t && r.push(rb(n, t, e));
          }),
          Array.prototype.concat.apply([], r)
        );
      }
    };
    function ry(e) {
      return (e >= 9 && e <= 32) || 160 == e;
    }
    function rC(e) {
      return 48 <= e && e <= 57;
    }
    function rT(e) {
      return (e >= 97 && e <= 122) || (e >= 65 && e <= 90);
    }
    function rx(e) {
      return 10 === e || 13 === e;
    }
    function rE(e) {
      return 48 <= e && e <= 55;
    }
    function rL(e) {
      return 39 === e || 34 === e || 96 === e;
    }
    var rq = {
      AElig: 'Æ',
      AMP: '&',
      amp: '&',
      Aacute: 'Á',
      Abreve: 'Ă',
      Acirc: 'Â',
      Acy: 'А',
      Afr: '𝔄',
      Agrave: 'À',
      Alpha: 'Α',
      Amacr: 'Ā',
      And: '⩓',
      Aogon: 'Ą',
      Aopf: '𝔸',
      ApplyFunction: '⁡',
      af: '⁡',
      Aring: 'Å',
      angst: 'Å',
      Ascr: '𝒜',
      Assign: '≔',
      colone: '≔',
      coloneq: '≔',
      Atilde: 'Ã',
      Auml: 'Ä',
      Backslash: '∖',
      setminus: '∖',
      setmn: '∖',
      smallsetminus: '∖',
      ssetmn: '∖',
      Barv: '⫧',
      Barwed: '⌆',
      doublebarwedge: '⌆',
      Bcy: 'Б',
      Because: '∵',
      becaus: '∵',
      because: '∵',
      Bernoullis: 'ℬ',
      Bscr: 'ℬ',
      bernou: 'ℬ',
      Beta: 'Β',
      Bfr: '𝔅',
      Bopf: '𝔹',
      Breve: '˘',
      breve: '˘',
      Bumpeq: '≎',
      HumpDownHump: '≎',
      bump: '≎',
      CHcy: 'Ч',
      COPY: '©',
      copy: '©',
      Cacute: 'Ć',
      Cap: '⋒',
      CapitalDifferentialD: 'ⅅ',
      DD: 'ⅅ',
      Cayleys: 'ℭ',
      Cfr: 'ℭ',
      Ccaron: 'Č',
      Ccedil: 'Ç',
      Ccirc: 'Ĉ',
      Cconint: '∰',
      Cdot: 'Ċ',
      Cedilla: '¸',
      cedil: '¸',
      CenterDot: '·',
      centerdot: '·',
      middot: '·',
      Chi: 'Χ',
      CircleDot: '⊙',
      odot: '⊙',
      CircleMinus: '⊖',
      ominus: '⊖',
      CirclePlus: '⊕',
      oplus: '⊕',
      CircleTimes: '⊗',
      otimes: '⊗',
      ClockwiseContourIntegral: '∲',
      cwconint: '∲',
      CloseCurlyDoubleQuote: '”',
      rdquo: '”',
      rdquor: '”',
      CloseCurlyQuote: '’',
      rsquo: '’',
      rsquor: '’',
      Colon: '∷',
      Proportion: '∷',
      Colone: '⩴',
      Congruent: '≡',
      equiv: '≡',
      Conint: '∯',
      DoubleContourIntegral: '∯',
      ContourIntegral: '∮',
      conint: '∮',
      oint: '∮',
      Copf: 'ℂ',
      complexes: 'ℂ',
      Coproduct: '∐',
      coprod: '∐',
      CounterClockwiseContourIntegral: '∳',
      awconint: '∳',
      Cross: '⨯',
      Cscr: '𝒞',
      Cup: '⋓',
      CupCap: '≍',
      asympeq: '≍',
      DDotrahd: '⤑',
      DJcy: 'Ђ',
      DScy: 'Ѕ',
      DZcy: 'Џ',
      Dagger: '‡',
      ddagger: '‡',
      Darr: '↡',
      Dashv: '⫤',
      DoubleLeftTee: '⫤',
      Dcaron: 'Ď',
      Dcy: 'Д',
      Del: '∇',
      nabla: '∇',
      Delta: 'Δ',
      Dfr: '𝔇',
      DiacriticalAcute: '´',
      acute: '´',
      DiacriticalDot: '˙',
      dot: '˙',
      DiacriticalDoubleAcute: '˝',
      dblac: '˝',
      DiacriticalGrave: '`',
      grave: '`',
      DiacriticalTilde: '˜',
      tilde: '˜',
      Diamond: '⋄',
      diam: '⋄',
      diamond: '⋄',
      DifferentialD: 'ⅆ',
      dd: 'ⅆ',
      Dopf: '𝔻',
      Dot: '¨',
      DoubleDot: '¨',
      die: '¨',
      uml: '¨',
      DotDot: '⃜',
      DotEqual: '≐',
      doteq: '≐',
      esdot: '≐',
      DoubleDownArrow: '⇓',
      Downarrow: '⇓',
      dArr: '⇓',
      DoubleLeftArrow: '⇐',
      Leftarrow: '⇐',
      lArr: '⇐',
      DoubleLeftRightArrow: '⇔',
      Leftrightarrow: '⇔',
      hArr: '⇔',
      iff: '⇔',
      DoubleLongLeftArrow: '⟸',
      Longleftarrow: '⟸',
      xlArr: '⟸',
      DoubleLongLeftRightArrow: '⟺',
      Longleftrightarrow: '⟺',
      xhArr: '⟺',
      DoubleLongRightArrow: '⟹',
      Longrightarrow: '⟹',
      xrArr: '⟹',
      DoubleRightArrow: '⇒',
      Implies: '⇒',
      Rightarrow: '⇒',
      rArr: '⇒',
      DoubleRightTee: '⊨',
      vDash: '⊨',
      DoubleUpArrow: '⇑',
      Uparrow: '⇑',
      uArr: '⇑',
      DoubleUpDownArrow: '⇕',
      Updownarrow: '⇕',
      vArr: '⇕',
      DoubleVerticalBar: '∥',
      par: '∥',
      parallel: '∥',
      shortparallel: '∥',
      spar: '∥',
      DownArrow: '↓',
      ShortDownArrow: '↓',
      darr: '↓',
      downarrow: '↓',
      DownArrowBar: '⤓',
      DownArrowUpArrow: '⇵',
      duarr: '⇵',
      DownBreve: '̑',
      DownLeftRightVector: '⥐',
      DownLeftTeeVector: '⥞',
      DownLeftVector: '↽',
      leftharpoondown: '↽',
      lhard: '↽',
      DownLeftVectorBar: '⥖',
      DownRightTeeVector: '⥟',
      DownRightVector: '⇁',
      rhard: '⇁',
      rightharpoondown: '⇁',
      DownRightVectorBar: '⥗',
      DownTee: '⊤',
      top: '⊤',
      DownTeeArrow: '↧',
      mapstodown: '↧',
      Dscr: '𝒟',
      Dstrok: 'Đ',
      ENG: 'Ŋ',
      ETH: 'Ð',
      Eacute: 'É',
      Ecaron: 'Ě',
      Ecirc: 'Ê',
      Ecy: 'Э',
      Edot: 'Ė',
      Efr: '𝔈',
      Egrave: 'È',
      Element: '∈',
      in: '∈',
      isin: '∈',
      isinv: '∈',
      Emacr: 'Ē',
      EmptySmallSquare: '◻',
      EmptyVerySmallSquare: '▫',
      Eogon: 'Ę',
      Eopf: '𝔼',
      Epsilon: 'Ε',
      Equal: '⩵',
      EqualTilde: '≂',
      eqsim: '≂',
      esim: '≂',
      Equilibrium: '⇌',
      rightleftharpoons: '⇌',
      rlhar: '⇌',
      Escr: 'ℰ',
      expectation: 'ℰ',
      Esim: '⩳',
      Eta: 'Η',
      Euml: 'Ë',
      Exists: '∃',
      exist: '∃',
      ExponentialE: 'ⅇ',
      ee: 'ⅇ',
      exponentiale: 'ⅇ',
      Fcy: 'Ф',
      Ffr: '𝔉',
      FilledSmallSquare: '◼',
      FilledVerySmallSquare: '▪',
      blacksquare: '▪',
      squarf: '▪',
      squf: '▪',
      Fopf: '𝔽',
      ForAll: '∀',
      forall: '∀',
      Fouriertrf: 'ℱ',
      Fscr: 'ℱ',
      GJcy: 'Ѓ',
      GT: '>',
      gt: '>',
      Gamma: 'Γ',
      Gammad: 'Ϝ',
      Gbreve: 'Ğ',
      Gcedil: 'Ģ',
      Gcirc: 'Ĝ',
      Gcy: 'Г',
      Gdot: 'Ġ',
      Gfr: '𝔊',
      Gg: '⋙',
      ggg: '⋙',
      Gopf: '𝔾',
      GreaterEqual: '≥',
      ge: '≥',
      geq: '≥',
      GreaterEqualLess: '⋛',
      gel: '⋛',
      gtreqless: '⋛',
      GreaterFullEqual: '≧',
      gE: '≧',
      geqq: '≧',
      GreaterGreater: '⪢',
      GreaterLess: '≷',
      gl: '≷',
      gtrless: '≷',
      GreaterSlantEqual: '⩾',
      geqslant: '⩾',
      ges: '⩾',
      GreaterTilde: '≳',
      gsim: '≳',
      gtrsim: '≳',
      Gscr: '𝒢',
      Gt: '≫',
      NestedGreaterGreater: '≫',
      gg: '≫',
      HARDcy: 'Ъ',
      Hacek: 'ˇ',
      caron: 'ˇ',
      Hat: '^',
      Hcirc: 'Ĥ',
      Hfr: 'ℌ',
      Poincareplane: 'ℌ',
      HilbertSpace: 'ℋ',
      Hscr: 'ℋ',
      hamilt: 'ℋ',
      Hopf: 'ℍ',
      quaternions: 'ℍ',
      HorizontalLine: '─',
      boxh: '─',
      Hstrok: 'Ħ',
      HumpEqual: '≏',
      bumpe: '≏',
      bumpeq: '≏',
      IEcy: 'Е',
      IJlig: 'Ĳ',
      IOcy: 'Ё',
      Iacute: 'Í',
      Icirc: 'Î',
      Icy: 'И',
      Idot: 'İ',
      Ifr: 'ℑ',
      Im: 'ℑ',
      image: 'ℑ',
      imagpart: 'ℑ',
      Igrave: 'Ì',
      Imacr: 'Ī',
      ImaginaryI: 'ⅈ',
      ii: 'ⅈ',
      Int: '∬',
      Integral: '∫',
      int: '∫',
      Intersection: '⋂',
      bigcap: '⋂',
      xcap: '⋂',
      InvisibleComma: '⁣',
      ic: '⁣',
      InvisibleTimes: '⁢',
      it: '⁢',
      Iogon: 'Į',
      Iopf: '𝕀',
      Iota: 'Ι',
      Iscr: 'ℐ',
      imagline: 'ℐ',
      Itilde: 'Ĩ',
      Iukcy: 'І',
      Iuml: 'Ï',
      Jcirc: 'Ĵ',
      Jcy: 'Й',
      Jfr: '𝔍',
      Jopf: '𝕁',
      Jscr: '𝒥',
      Jsercy: 'Ј',
      Jukcy: 'Є',
      KHcy: 'Х',
      KJcy: 'Ќ',
      Kappa: 'Κ',
      Kcedil: 'Ķ',
      Kcy: 'К',
      Kfr: '𝔎',
      Kopf: '𝕂',
      Kscr: '𝒦',
      LJcy: 'Љ',
      LT: '<',
      lt: '<',
      Lacute: 'Ĺ',
      Lambda: 'Λ',
      Lang: '⟪',
      Laplacetrf: 'ℒ',
      Lscr: 'ℒ',
      lagran: 'ℒ',
      Larr: '↞',
      twoheadleftarrow: '↞',
      Lcaron: 'Ľ',
      Lcedil: 'Ļ',
      Lcy: 'Л',
      LeftAngleBracket: '⟨',
      lang: '⟨',
      langle: '⟨',
      LeftArrow: '←',
      ShortLeftArrow: '←',
      larr: '←',
      leftarrow: '←',
      slarr: '←',
      LeftArrowBar: '⇤',
      larrb: '⇤',
      LeftArrowRightArrow: '⇆',
      leftrightarrows: '⇆',
      lrarr: '⇆',
      LeftCeiling: '⌈',
      lceil: '⌈',
      LeftDoubleBracket: '⟦',
      lobrk: '⟦',
      LeftDownTeeVector: '⥡',
      LeftDownVector: '⇃',
      dharl: '⇃',
      downharpoonleft: '⇃',
      LeftDownVectorBar: '⥙',
      LeftFloor: '⌊',
      lfloor: '⌊',
      LeftRightArrow: '↔',
      harr: '↔',
      leftrightarrow: '↔',
      LeftRightVector: '⥎',
      LeftTee: '⊣',
      dashv: '⊣',
      LeftTeeArrow: '↤',
      mapstoleft: '↤',
      LeftTeeVector: '⥚',
      LeftTriangle: '⊲',
      vartriangleleft: '⊲',
      vltri: '⊲',
      LeftTriangleBar: '⧏',
      LeftTriangleEqual: '⊴',
      ltrie: '⊴',
      trianglelefteq: '⊴',
      LeftUpDownVector: '⥑',
      LeftUpTeeVector: '⥠',
      LeftUpVector: '↿',
      uharl: '↿',
      upharpoonleft: '↿',
      LeftUpVectorBar: '⥘',
      LeftVector: '↼',
      leftharpoonup: '↼',
      lharu: '↼',
      LeftVectorBar: '⥒',
      LessEqualGreater: '⋚',
      leg: '⋚',
      lesseqgtr: '⋚',
      LessFullEqual: '≦',
      lE: '≦',
      leqq: '≦',
      LessGreater: '≶',
      lessgtr: '≶',
      lg: '≶',
      LessLess: '⪡',
      LessSlantEqual: '⩽',
      leqslant: '⩽',
      les: '⩽',
      LessTilde: '≲',
      lesssim: '≲',
      lsim: '≲',
      Lfr: '𝔏',
      Ll: '⋘',
      Lleftarrow: '⇚',
      lAarr: '⇚',
      Lmidot: 'Ŀ',
      LongLeftArrow: '⟵',
      longleftarrow: '⟵',
      xlarr: '⟵',
      LongLeftRightArrow: '⟷',
      longleftrightarrow: '⟷',
      xharr: '⟷',
      LongRightArrow: '⟶',
      longrightarrow: '⟶',
      xrarr: '⟶',
      Lopf: '𝕃',
      LowerLeftArrow: '↙',
      swarr: '↙',
      swarrow: '↙',
      LowerRightArrow: '↘',
      searr: '↘',
      searrow: '↘',
      Lsh: '↰',
      lsh: '↰',
      Lstrok: 'Ł',
      Lt: '≪',
      NestedLessLess: '≪',
      ll: '≪',
      Map: '⤅',
      Mcy: 'М',
      MediumSpace: ' ',
      Mellintrf: 'ℳ',
      Mscr: 'ℳ',
      phmmat: 'ℳ',
      Mfr: '𝔐',
      MinusPlus: '∓',
      mnplus: '∓',
      mp: '∓',
      Mopf: '𝕄',
      Mu: 'Μ',
      NJcy: 'Њ',
      Nacute: 'Ń',
      Ncaron: 'Ň',
      Ncedil: 'Ņ',
      Ncy: 'Н',
      NegativeMediumSpace: '​',
      NegativeThickSpace: '​',
      NegativeThinSpace: '​',
      NegativeVeryThinSpace: '​',
      ZeroWidthSpace: '​',
      NewLine: `
`,
      Nfr: '𝔑',
      NoBreak: '⁠',
      NonBreakingSpace: ' ',
      nbsp: ' ',
      Nopf: 'ℕ',
      naturals: 'ℕ',
      Not: '⫬',
      NotCongruent: '≢',
      nequiv: '≢',
      NotCupCap: '≭',
      NotDoubleVerticalBar: '∦',
      npar: '∦',
      nparallel: '∦',
      nshortparallel: '∦',
      nspar: '∦',
      NotElement: '∉',
      notin: '∉',
      notinva: '∉',
      NotEqual: '≠',
      ne: '≠',
      NotEqualTilde: '≂̸',
      nesim: '≂̸',
      NotExists: '∄',
      nexist: '∄',
      nexists: '∄',
      NotGreater: '≯',
      ngt: '≯',
      ngtr: '≯',
      NotGreaterEqual: '≱',
      nge: '≱',
      ngeq: '≱',
      NotGreaterFullEqual: '≧̸',
      ngE: '≧̸',
      ngeqq: '≧̸',
      NotGreaterGreater: '≫̸',
      nGtv: '≫̸',
      NotGreaterLess: '≹',
      ntgl: '≹',
      NotGreaterSlantEqual: '⩾̸',
      ngeqslant: '⩾̸',
      nges: '⩾̸',
      NotGreaterTilde: '≵',
      ngsim: '≵',
      NotHumpDownHump: '≎̸',
      nbump: '≎̸',
      NotHumpEqual: '≏̸',
      nbumpe: '≏̸',
      NotLeftTriangle: '⋪',
      nltri: '⋪',
      ntriangleleft: '⋪',
      NotLeftTriangleBar: '⧏̸',
      NotLeftTriangleEqual: '⋬',
      nltrie: '⋬',
      ntrianglelefteq: '⋬',
      NotLess: '≮',
      nless: '≮',
      nlt: '≮',
      NotLessEqual: '≰',
      nle: '≰',
      nleq: '≰',
      NotLessGreater: '≸',
      ntlg: '≸',
      NotLessLess: '≪̸',
      nLtv: '≪̸',
      NotLessSlantEqual: '⩽̸',
      nleqslant: '⩽̸',
      nles: '⩽̸',
      NotLessTilde: '≴',
      nlsim: '≴',
      NotNestedGreaterGreater: '⪢̸',
      NotNestedLessLess: '⪡̸',
      NotPrecedes: '⊀',
      npr: '⊀',
      nprec: '⊀',
      NotPrecedesEqual: '⪯̸',
      npre: '⪯̸',
      npreceq: '⪯̸',
      NotPrecedesSlantEqual: '⋠',
      nprcue: '⋠',
      NotReverseElement: '∌',
      notni: '∌',
      notniva: '∌',
      NotRightTriangle: '⋫',
      nrtri: '⋫',
      ntriangleright: '⋫',
      NotRightTriangleBar: '⧐̸',
      NotRightTriangleEqual: '⋭',
      nrtrie: '⋭',
      ntrianglerighteq: '⋭',
      NotSquareSubset: '⊏̸',
      NotSquareSubsetEqual: '⋢',
      nsqsube: '⋢',
      NotSquareSuperset: '⊐̸',
      NotSquareSupersetEqual: '⋣',
      nsqsupe: '⋣',
      NotSubset: '⊂⃒',
      nsubset: '⊂⃒',
      vnsub: '⊂⃒',
      NotSubsetEqual: '⊈',
      nsube: '⊈',
      nsubseteq: '⊈',
      NotSucceeds: '⊁',
      nsc: '⊁',
      nsucc: '⊁',
      NotSucceedsEqual: '⪰̸',
      nsce: '⪰̸',
      nsucceq: '⪰̸',
      NotSucceedsSlantEqual: '⋡',
      nsccue: '⋡',
      NotSucceedsTilde: '≿̸',
      NotSuperset: '⊃⃒',
      nsupset: '⊃⃒',
      vnsup: '⊃⃒',
      NotSupersetEqual: '⊉',
      nsupe: '⊉',
      nsupseteq: '⊉',
      NotTilde: '≁',
      nsim: '≁',
      NotTildeEqual: '≄',
      nsime: '≄',
      nsimeq: '≄',
      NotTildeFullEqual: '≇',
      ncong: '≇',
      NotTildeTilde: '≉',
      nap: '≉',
      napprox: '≉',
      NotVerticalBar: '∤',
      nmid: '∤',
      nshortmid: '∤',
      nsmid: '∤',
      Nscr: '𝒩',
      Ntilde: 'Ñ',
      Nu: 'Ν',
      OElig: 'Œ',
      Oacute: 'Ó',
      Ocirc: 'Ô',
      Ocy: 'О',
      Odblac: 'Ő',
      Ofr: '𝔒',
      Ograve: 'Ò',
      Omacr: 'Ō',
      Omega: 'Ω',
      ohm: 'Ω',
      Omicron: 'Ο',
      Oopf: '𝕆',
      OpenCurlyDoubleQuote: '“',
      ldquo: '“',
      OpenCurlyQuote: '‘',
      lsquo: '‘',
      Or: '⩔',
      Oscr: '𝒪',
      Oslash: 'Ø',
      Otilde: 'Õ',
      Otimes: '⨷',
      Ouml: 'Ö',
      OverBar: '‾',
      oline: '‾',
      OverBrace: '⏞',
      OverBracket: '⎴',
      tbrk: '⎴',
      OverParenthesis: '⏜',
      PartialD: '∂',
      part: '∂',
      Pcy: 'П',
      Pfr: '𝔓',
      Phi: 'Φ',
      Pi: 'Π',
      PlusMinus: '±',
      plusmn: '±',
      pm: '±',
      Popf: 'ℙ',
      primes: 'ℙ',
      Pr: '⪻',
      Precedes: '≺',
      pr: '≺',
      prec: '≺',
      PrecedesEqual: '⪯',
      pre: '⪯',
      preceq: '⪯',
      PrecedesSlantEqual: '≼',
      prcue: '≼',
      preccurlyeq: '≼',
      PrecedesTilde: '≾',
      precsim: '≾',
      prsim: '≾',
      Prime: '″',
      Product: '∏',
      prod: '∏',
      Proportional: '∝',
      prop: '∝',
      propto: '∝',
      varpropto: '∝',
      vprop: '∝',
      Pscr: '𝒫',
      Psi: 'Ψ',
      QUOT: '"',
      quot: '"',
      Qfr: '𝔔',
      Qopf: 'ℚ',
      rationals: 'ℚ',
      Qscr: '𝒬',
      RBarr: '⤐',
      drbkarow: '⤐',
      REG: '®',
      circledR: '®',
      reg: '®',
      Racute: 'Ŕ',
      Rang: '⟫',
      Rarr: '↠',
      twoheadrightarrow: '↠',
      Rarrtl: '⤖',
      Rcaron: 'Ř',
      Rcedil: 'Ŗ',
      Rcy: 'Р',
      Re: 'ℜ',
      Rfr: 'ℜ',
      real: 'ℜ',
      realpart: 'ℜ',
      ReverseElement: '∋',
      SuchThat: '∋',
      ni: '∋',
      niv: '∋',
      ReverseEquilibrium: '⇋',
      leftrightharpoons: '⇋',
      lrhar: '⇋',
      ReverseUpEquilibrium: '⥯',
      duhar: '⥯',
      Rho: 'Ρ',
      RightAngleBracket: '⟩',
      rang: '⟩',
      rangle: '⟩',
      RightArrow: '→',
      ShortRightArrow: '→',
      rarr: '→',
      rightarrow: '→',
      srarr: '→',
      RightArrowBar: '⇥',
      rarrb: '⇥',
      RightArrowLeftArrow: '⇄',
      rightleftarrows: '⇄',
      rlarr: '⇄',
      RightCeiling: '⌉',
      rceil: '⌉',
      RightDoubleBracket: '⟧',
      robrk: '⟧',
      RightDownTeeVector: '⥝',
      RightDownVector: '⇂',
      dharr: '⇂',
      downharpoonright: '⇂',
      RightDownVectorBar: '⥕',
      RightFloor: '⌋',
      rfloor: '⌋',
      RightTee: '⊢',
      vdash: '⊢',
      RightTeeArrow: '↦',
      map: '↦',
      mapsto: '↦',
      RightTeeVector: '⥛',
      RightTriangle: '⊳',
      vartriangleright: '⊳',
      vrtri: '⊳',
      RightTriangleBar: '⧐',
      RightTriangleEqual: '⊵',
      rtrie: '⊵',
      trianglerighteq: '⊵',
      RightUpDownVector: '⥏',
      RightUpTeeVector: '⥜',
      RightUpVector: '↾',
      uharr: '↾',
      upharpoonright: '↾',
      RightUpVectorBar: '⥔',
      RightVector: '⇀',
      rharu: '⇀',
      rightharpoonup: '⇀',
      RightVectorBar: '⥓',
      Ropf: 'ℝ',
      reals: 'ℝ',
      RoundImplies: '⥰',
      Rrightarrow: '⇛',
      rAarr: '⇛',
      Rscr: 'ℛ',
      realine: 'ℛ',
      Rsh: '↱',
      rsh: '↱',
      RuleDelayed: '⧴',
      SHCHcy: 'Щ',
      SHcy: 'Ш',
      SOFTcy: 'Ь',
      Sacute: 'Ś',
      Sc: '⪼',
      Scaron: 'Š',
      Scedil: 'Ş',
      Scirc: 'Ŝ',
      Scy: 'С',
      Sfr: '𝔖',
      ShortUpArrow: '↑',
      UpArrow: '↑',
      uarr: '↑',
      uparrow: '↑',
      Sigma: 'Σ',
      SmallCircle: '∘',
      compfn: '∘',
      Sopf: '𝕊',
      Sqrt: '√',
      radic: '√',
      Square: '□',
      squ: '□',
      square: '□',
      SquareIntersection: '⊓',
      sqcap: '⊓',
      SquareSubset: '⊏',
      sqsub: '⊏',
      sqsubset: '⊏',
      SquareSubsetEqual: '⊑',
      sqsube: '⊑',
      sqsubseteq: '⊑',
      SquareSuperset: '⊐',
      sqsup: '⊐',
      sqsupset: '⊐',
      SquareSupersetEqual: '⊒',
      sqsupe: '⊒',
      sqsupseteq: '⊒',
      SquareUnion: '⊔',
      sqcup: '⊔',
      Sscr: '𝒮',
      Star: '⋆',
      sstarf: '⋆',
      Sub: '⋐',
      Subset: '⋐',
      SubsetEqual: '⊆',
      sube: '⊆',
      subseteq: '⊆',
      Succeeds: '≻',
      sc: '≻',
      succ: '≻',
      SucceedsEqual: '⪰',
      sce: '⪰',
      succeq: '⪰',
      SucceedsSlantEqual: '≽',
      sccue: '≽',
      succcurlyeq: '≽',
      SucceedsTilde: '≿',
      scsim: '≿',
      succsim: '≿',
      Sum: '∑',
      sum: '∑',
      Sup: '⋑',
      Supset: '⋑',
      Superset: '⊃',
      sup: '⊃',
      supset: '⊃',
      SupersetEqual: '⊇',
      supe: '⊇',
      supseteq: '⊇',
      THORN: 'Þ',
      TRADE: '™',
      trade: '™',
      TSHcy: 'Ћ',
      TScy: 'Ц',
      Tab: '	',
      Tau: 'Τ',
      Tcaron: 'Ť',
      Tcedil: 'Ţ',
      Tcy: 'Т',
      Tfr: '𝔗',
      Therefore: '∴',
      there4: '∴',
      therefore: '∴',
      Theta: 'Θ',
      ThickSpace: '  ',
      ThinSpace: ' ',
      thinsp: ' ',
      Tilde: '∼',
      sim: '∼',
      thicksim: '∼',
      thksim: '∼',
      TildeEqual: '≃',
      sime: '≃',
      simeq: '≃',
      TildeFullEqual: '≅',
      cong: '≅',
      TildeTilde: '≈',
      ap: '≈',
      approx: '≈',
      asymp: '≈',
      thickapprox: '≈',
      thkap: '≈',
      Topf: '𝕋',
      TripleDot: '⃛',
      tdot: '⃛',
      Tscr: '𝒯',
      Tstrok: 'Ŧ',
      Uacute: 'Ú',
      Uarr: '↟',
      Uarrocir: '⥉',
      Ubrcy: 'Ў',
      Ubreve: 'Ŭ',
      Ucirc: 'Û',
      Ucy: 'У',
      Udblac: 'Ű',
      Ufr: '𝔘',
      Ugrave: 'Ù',
      Umacr: 'Ū',
      UnderBar: '_',
      lowbar: '_',
      UnderBrace: '⏟',
      UnderBracket: '⎵',
      bbrk: '⎵',
      UnderParenthesis: '⏝',
      Union: '⋃',
      bigcup: '⋃',
      xcup: '⋃',
      UnionPlus: '⊎',
      uplus: '⊎',
      Uogon: 'Ų',
      Uopf: '𝕌',
      UpArrowBar: '⤒',
      UpArrowDownArrow: '⇅',
      udarr: '⇅',
      UpDownArrow: '↕',
      updownarrow: '↕',
      varr: '↕',
      UpEquilibrium: '⥮',
      udhar: '⥮',
      UpTee: '⊥',
      bot: '⊥',
      bottom: '⊥',
      perp: '⊥',
      UpTeeArrow: '↥',
      mapstoup: '↥',
      UpperLeftArrow: '↖',
      nwarr: '↖',
      nwarrow: '↖',
      UpperRightArrow: '↗',
      nearr: '↗',
      nearrow: '↗',
      Upsi: 'ϒ',
      upsih: 'ϒ',
      Upsilon: 'Υ',
      Uring: 'Ů',
      Uscr: '𝒰',
      Utilde: 'Ũ',
      Uuml: 'Ü',
      VDash: '⊫',
      Vbar: '⫫',
      Vcy: 'В',
      Vdash: '⊩',
      Vdashl: '⫦',
      Vee: '⋁',
      bigvee: '⋁',
      xvee: '⋁',
      Verbar: '‖',
      Vert: '‖',
      VerticalBar: '∣',
      mid: '∣',
      shortmid: '∣',
      smid: '∣',
      VerticalLine: '|',
      verbar: '|',
      vert: '|',
      VerticalSeparator: '❘',
      VerticalTilde: '≀',
      wr: '≀',
      wreath: '≀',
      VeryThinSpace: ' ',
      hairsp: ' ',
      Vfr: '𝔙',
      Vopf: '𝕍',
      Vscr: '𝒱',
      Vvdash: '⊪',
      Wcirc: 'Ŵ',
      Wedge: '⋀',
      bigwedge: '⋀',
      xwedge: '⋀',
      Wfr: '𝔚',
      Wopf: '𝕎',
      Wscr: '𝒲',
      Xfr: '𝔛',
      Xi: 'Ξ',
      Xopf: '𝕏',
      Xscr: '𝒳',
      YAcy: 'Я',
      YIcy: 'Ї',
      YUcy: 'Ю',
      Yacute: 'Ý',
      Ycirc: 'Ŷ',
      Ycy: 'Ы',
      Yfr: '𝔜',
      Yopf: '𝕐',
      Yscr: '𝒴',
      Yuml: 'Ÿ',
      ZHcy: 'Ж',
      Zacute: 'Ź',
      Zcaron: 'Ž',
      Zcy: 'З',
      Zdot: 'Ż',
      Zeta: 'Ζ',
      Zfr: 'ℨ',
      zeetrf: 'ℨ',
      Zopf: 'ℤ',
      integers: 'ℤ',
      Zscr: '𝒵',
      aacute: 'á',
      abreve: 'ă',
      ac: '∾',
      mstpos: '∾',
      acE: '∾̳',
      acd: '∿',
      acirc: 'â',
      acy: 'а',
      aelig: 'æ',
      afr: '𝔞',
      agrave: 'à',
      alefsym: 'ℵ',
      aleph: 'ℵ',
      alpha: 'α',
      amacr: 'ā',
      amalg: '⨿',
      and: '∧',
      wedge: '∧',
      andand: '⩕',
      andd: '⩜',
      andslope: '⩘',
      andv: '⩚',
      ang: '∠',
      angle: '∠',
      ange: '⦤',
      angmsd: '∡',
      measuredangle: '∡',
      angmsdaa: '⦨',
      angmsdab: '⦩',
      angmsdac: '⦪',
      angmsdad: '⦫',
      angmsdae: '⦬',
      angmsdaf: '⦭',
      angmsdag: '⦮',
      angmsdah: '⦯',
      angrt: '∟',
      angrtvb: '⊾',
      angrtvbd: '⦝',
      angsph: '∢',
      angzarr: '⍼',
      aogon: 'ą',
      aopf: '𝕒',
      apE: '⩰',
      apacir: '⩯',
      ape: '≊',
      approxeq: '≊',
      apid: '≋',
      apos: "'",
      aring: 'å',
      ascr: '𝒶',
      ast: '*',
      midast: '*',
      atilde: 'ã',
      auml: 'ä',
      awint: '⨑',
      bNot: '⫭',
      backcong: '≌',
      bcong: '≌',
      backepsilon: '϶',
      bepsi: '϶',
      backprime: '‵',
      bprime: '‵',
      backsim: '∽',
      bsim: '∽',
      backsimeq: '⋍',
      bsime: '⋍',
      barvee: '⊽',
      barwed: '⌅',
      barwedge: '⌅',
      bbrktbrk: '⎶',
      bcy: 'б',
      bdquo: '„',
      ldquor: '„',
      bemptyv: '⦰',
      beta: 'β',
      beth: 'ℶ',
      between: '≬',
      twixt: '≬',
      bfr: '𝔟',
      bigcirc: '◯',
      xcirc: '◯',
      bigodot: '⨀',
      xodot: '⨀',
      bigoplus: '⨁',
      xoplus: '⨁',
      bigotimes: '⨂',
      xotime: '⨂',
      bigsqcup: '⨆',
      xsqcup: '⨆',
      bigstar: '★',
      starf: '★',
      bigtriangledown: '▽',
      xdtri: '▽',
      bigtriangleup: '△',
      xutri: '△',
      biguplus: '⨄',
      xuplus: '⨄',
      bkarow: '⤍',
      rbarr: '⤍',
      blacklozenge: '⧫',
      lozf: '⧫',
      blacktriangle: '▴',
      utrif: '▴',
      blacktriangledown: '▾',
      dtrif: '▾',
      blacktriangleleft: '◂',
      ltrif: '◂',
      blacktriangleright: '▸',
      rtrif: '▸',
      blank: '␣',
      blk12: '▒',
      blk14: '░',
      blk34: '▓',
      block: '█',
      bne: '=⃥',
      bnequiv: '≡⃥',
      bnot: '⌐',
      bopf: '𝕓',
      bowtie: '⋈',
      boxDL: '╗',
      boxDR: '╔',
      boxDl: '╖',
      boxDr: '╓',
      boxH: '═',
      boxHD: '╦',
      boxHU: '╩',
      boxHd: '╤',
      boxHu: '╧',
      boxUL: '╝',
      boxUR: '╚',
      boxUl: '╜',
      boxUr: '╙',
      boxV: '║',
      boxVH: '╬',
      boxVL: '╣',
      boxVR: '╠',
      boxVh: '╫',
      boxVl: '╢',
      boxVr: '╟',
      boxbox: '⧉',
      boxdL: '╕',
      boxdR: '╒',
      boxdl: '┐',
      boxdr: '┌',
      boxhD: '╥',
      boxhU: '╨',
      boxhd: '┬',
      boxhu: '┴',
      boxminus: '⊟',
      minusb: '⊟',
      boxplus: '⊞',
      plusb: '⊞',
      boxtimes: '⊠',
      timesb: '⊠',
      boxuL: '╛',
      boxuR: '╘',
      boxul: '┘',
      boxur: '└',
      boxv: '│',
      boxvH: '╪',
      boxvL: '╡',
      boxvR: '╞',
      boxvh: '┼',
      boxvl: '┤',
      boxvr: '├',
      brvbar: '¦',
      bscr: '𝒷',
      bsemi: '⁏',
      bsol: '\\',
      bsolb: '⧅',
      bsolhsub: '⟈',
      bull: '•',
      bullet: '•',
      bumpE: '⪮',
      cacute: 'ć',
      cap: '∩',
      capand: '⩄',
      capbrcup: '⩉',
      capcap: '⩋',
      capcup: '⩇',
      capdot: '⩀',
      caps: '∩︀',
      caret: '⁁',
      ccaps: '⩍',
      ccaron: 'č',
      ccedil: 'ç',
      ccirc: 'ĉ',
      ccups: '⩌',
      ccupssm: '⩐',
      cdot: 'ċ',
      cemptyv: '⦲',
      cent: '¢',
      cfr: '𝔠',
      chcy: 'ч',
      check: '✓',
      checkmark: '✓',
      chi: 'χ',
      cir: '○',
      cirE: '⧃',
      circ: 'ˆ',
      circeq: '≗',
      cire: '≗',
      circlearrowleft: '↺',
      olarr: '↺',
      circlearrowright: '↻',
      orarr: '↻',
      circledS: 'Ⓢ',
      oS: 'Ⓢ',
      circledast: '⊛',
      oast: '⊛',
      circledcirc: '⊚',
      ocir: '⊚',
      circleddash: '⊝',
      odash: '⊝',
      cirfnint: '⨐',
      cirmid: '⫯',
      cirscir: '⧂',
      clubs: '♣',
      clubsuit: '♣',
      colon: ':',
      comma: ',',
      commat: '@',
      comp: '∁',
      complement: '∁',
      congdot: '⩭',
      copf: '𝕔',
      copysr: '℗',
      crarr: '↵',
      cross: '✗',
      cscr: '𝒸',
      csub: '⫏',
      csube: '⫑',
      csup: '⫐',
      csupe: '⫒',
      ctdot: '⋯',
      cudarrl: '⤸',
      cudarrr: '⤵',
      cuepr: '⋞',
      curlyeqprec: '⋞',
      cuesc: '⋟',
      curlyeqsucc: '⋟',
      cularr: '↶',
      curvearrowleft: '↶',
      cularrp: '⤽',
      cup: '∪',
      cupbrcap: '⩈',
      cupcap: '⩆',
      cupcup: '⩊',
      cupdot: '⊍',
      cupor: '⩅',
      cups: '∪︀',
      curarr: '↷',
      curvearrowright: '↷',
      curarrm: '⤼',
      curlyvee: '⋎',
      cuvee: '⋎',
      curlywedge: '⋏',
      cuwed: '⋏',
      curren: '¤',
      cwint: '∱',
      cylcty: '⌭',
      dHar: '⥥',
      dagger: '†',
      daleth: 'ℸ',
      dash: '‐',
      hyphen: '‐',
      dbkarow: '⤏',
      rBarr: '⤏',
      dcaron: 'ď',
      dcy: 'д',
      ddarr: '⇊',
      downdownarrows: '⇊',
      ddotseq: '⩷',
      eDDot: '⩷',
      deg: '°',
      delta: 'δ',
      demptyv: '⦱',
      dfisht: '⥿',
      dfr: '𝔡',
      diamondsuit: '♦',
      diams: '♦',
      digamma: 'ϝ',
      gammad: 'ϝ',
      disin: '⋲',
      div: '÷',
      divide: '÷',
      divideontimes: '⋇',
      divonx: '⋇',
      djcy: 'ђ',
      dlcorn: '⌞',
      llcorner: '⌞',
      dlcrop: '⌍',
      dollar: '$',
      dopf: '𝕕',
      doteqdot: '≑',
      eDot: '≑',
      dotminus: '∸',
      minusd: '∸',
      dotplus: '∔',
      plusdo: '∔',
      dotsquare: '⊡',
      sdotb: '⊡',
      drcorn: '⌟',
      lrcorner: '⌟',
      drcrop: '⌌',
      dscr: '𝒹',
      dscy: 'ѕ',
      dsol: '⧶',
      dstrok: 'đ',
      dtdot: '⋱',
      dtri: '▿',
      triangledown: '▿',
      dwangle: '⦦',
      dzcy: 'џ',
      dzigrarr: '⟿',
      eacute: 'é',
      easter: '⩮',
      ecaron: 'ě',
      ecir: '≖',
      eqcirc: '≖',
      ecirc: 'ê',
      ecolon: '≕',
      eqcolon: '≕',
      ecy: 'э',
      edot: 'ė',
      efDot: '≒',
      fallingdotseq: '≒',
      efr: '𝔢',
      eg: '⪚',
      egrave: 'è',
      egs: '⪖',
      eqslantgtr: '⪖',
      egsdot: '⪘',
      el: '⪙',
      elinters: '⏧',
      ell: 'ℓ',
      els: '⪕',
      eqslantless: '⪕',
      elsdot: '⪗',
      emacr: 'ē',
      empty: '∅',
      emptyset: '∅',
      emptyv: '∅',
      varnothing: '∅',
      emsp13: ' ',
      emsp14: ' ',
      emsp: ' ',
      eng: 'ŋ',
      ensp: ' ',
      eogon: 'ę',
      eopf: '𝕖',
      epar: '⋕',
      eparsl: '⧣',
      eplus: '⩱',
      epsi: 'ε',
      epsilon: 'ε',
      epsiv: 'ϵ',
      straightepsilon: 'ϵ',
      varepsilon: 'ϵ',
      equals: '=',
      equest: '≟',
      questeq: '≟',
      equivDD: '⩸',
      eqvparsl: '⧥',
      erDot: '≓',
      risingdotseq: '≓',
      erarr: '⥱',
      escr: 'ℯ',
      eta: 'η',
      eth: 'ð',
      euml: 'ë',
      euro: '€',
      excl: '!',
      fcy: 'ф',
      female: '♀',
      ffilig: 'ﬃ',
      fflig: 'ﬀ',
      ffllig: 'ﬄ',
      ffr: '𝔣',
      filig: 'ﬁ',
      fjlig: 'fj',
      flat: '♭',
      fllig: 'ﬂ',
      fltns: '▱',
      fnof: 'ƒ',
      fopf: '𝕗',
      fork: '⋔',
      pitchfork: '⋔',
      forkv: '⫙',
      fpartint: '⨍',
      frac12: '½',
      half: '½',
      frac13: '⅓',
      frac14: '¼',
      frac15: '⅕',
      frac16: '⅙',
      frac18: '⅛',
      frac23: '⅔',
      frac25: '⅖',
      frac34: '¾',
      frac35: '⅗',
      frac38: '⅜',
      frac45: '⅘',
      frac56: '⅚',
      frac58: '⅝',
      frac78: '⅞',
      frasl: '⁄',
      frown: '⌢',
      sfrown: '⌢',
      fscr: '𝒻',
      gEl: '⪌',
      gtreqqless: '⪌',
      gacute: 'ǵ',
      gamma: 'γ',
      gap: '⪆',
      gtrapprox: '⪆',
      gbreve: 'ğ',
      gcirc: 'ĝ',
      gcy: 'г',
      gdot: 'ġ',
      gescc: '⪩',
      gesdot: '⪀',
      gesdoto: '⪂',
      gesdotol: '⪄',
      gesl: '⋛︀',
      gesles: '⪔',
      gfr: '𝔤',
      gimel: 'ℷ',
      gjcy: 'ѓ',
      glE: '⪒',
      gla: '⪥',
      glj: '⪤',
      gnE: '≩',
      gneqq: '≩',
      gnap: '⪊',
      gnapprox: '⪊',
      gne: '⪈',
      gneq: '⪈',
      gnsim: '⋧',
      gopf: '𝕘',
      gscr: 'ℊ',
      gsime: '⪎',
      gsiml: '⪐',
      gtcc: '⪧',
      gtcir: '⩺',
      gtdot: '⋗',
      gtrdot: '⋗',
      gtlPar: '⦕',
      gtquest: '⩼',
      gtrarr: '⥸',
      gvertneqq: '≩︀',
      gvnE: '≩︀',
      hardcy: 'ъ',
      harrcir: '⥈',
      harrw: '↭',
      leftrightsquigarrow: '↭',
      hbar: 'ℏ',
      hslash: 'ℏ',
      planck: 'ℏ',
      plankv: 'ℏ',
      hcirc: 'ĥ',
      hearts: '♥',
      heartsuit: '♥',
      hellip: '…',
      mldr: '…',
      hercon: '⊹',
      hfr: '𝔥',
      hksearow: '⤥',
      searhk: '⤥',
      hkswarow: '⤦',
      swarhk: '⤦',
      hoarr: '⇿',
      homtht: '∻',
      hookleftarrow: '↩',
      larrhk: '↩',
      hookrightarrow: '↪',
      rarrhk: '↪',
      hopf: '𝕙',
      horbar: '―',
      hscr: '𝒽',
      hstrok: 'ħ',
      hybull: '⁃',
      iacute: 'í',
      icirc: 'î',
      icy: 'и',
      iecy: 'е',
      iexcl: '¡',
      ifr: '𝔦',
      igrave: 'ì',
      iiiint: '⨌',
      qint: '⨌',
      iiint: '∭',
      tint: '∭',
      iinfin: '⧜',
      iiota: '℩',
      ijlig: 'ĳ',
      imacr: 'ī',
      imath: 'ı',
      inodot: 'ı',
      imof: '⊷',
      imped: 'Ƶ',
      incare: '℅',
      infin: '∞',
      infintie: '⧝',
      intcal: '⊺',
      intercal: '⊺',
      intlarhk: '⨗',
      intprod: '⨼',
      iprod: '⨼',
      iocy: 'ё',
      iogon: 'į',
      iopf: '𝕚',
      iota: 'ι',
      iquest: '¿',
      iscr: '𝒾',
      isinE: '⋹',
      isindot: '⋵',
      isins: '⋴',
      isinsv: '⋳',
      itilde: 'ĩ',
      iukcy: 'і',
      iuml: 'ï',
      jcirc: 'ĵ',
      jcy: 'й',
      jfr: '𝔧',
      jmath: 'ȷ',
      jopf: '𝕛',
      jscr: '𝒿',
      jsercy: 'ј',
      jukcy: 'є',
      kappa: 'κ',
      kappav: 'ϰ',
      varkappa: 'ϰ',
      kcedil: 'ķ',
      kcy: 'к',
      kfr: '𝔨',
      kgreen: 'ĸ',
      khcy: 'х',
      kjcy: 'ќ',
      kopf: '𝕜',
      kscr: '𝓀',
      lAtail: '⤛',
      lBarr: '⤎',
      lEg: '⪋',
      lesseqqgtr: '⪋',
      lHar: '⥢',
      lacute: 'ĺ',
      laemptyv: '⦴',
      lambda: 'λ',
      langd: '⦑',
      lap: '⪅',
      lessapprox: '⪅',
      laquo: '«',
      larrbfs: '⤟',
      larrfs: '⤝',
      larrlp: '↫',
      looparrowleft: '↫',
      larrpl: '⤹',
      larrsim: '⥳',
      larrtl: '↢',
      leftarrowtail: '↢',
      lat: '⪫',
      latail: '⤙',
      late: '⪭',
      lates: '⪭︀',
      lbarr: '⤌',
      lbbrk: '❲',
      lbrace: '{',
      lcub: '{',
      lbrack: '[',
      lsqb: '[',
      lbrke: '⦋',
      lbrksld: '⦏',
      lbrkslu: '⦍',
      lcaron: 'ľ',
      lcedil: 'ļ',
      lcy: 'л',
      ldca: '⤶',
      ldrdhar: '⥧',
      ldrushar: '⥋',
      ldsh: '↲',
      le: '≤',
      leq: '≤',
      leftleftarrows: '⇇',
      llarr: '⇇',
      leftthreetimes: '⋋',
      lthree: '⋋',
      lescc: '⪨',
      lesdot: '⩿',
      lesdoto: '⪁',
      lesdotor: '⪃',
      lesg: '⋚︀',
      lesges: '⪓',
      lessdot: '⋖',
      ltdot: '⋖',
      lfisht: '⥼',
      lfr: '𝔩',
      lgE: '⪑',
      lharul: '⥪',
      lhblk: '▄',
      ljcy: 'љ',
      llhard: '⥫',
      lltri: '◺',
      lmidot: 'ŀ',
      lmoust: '⎰',
      lmoustache: '⎰',
      lnE: '≨',
      lneqq: '≨',
      lnap: '⪉',
      lnapprox: '⪉',
      lne: '⪇',
      lneq: '⪇',
      lnsim: '⋦',
      loang: '⟬',
      loarr: '⇽',
      longmapsto: '⟼',
      xmap: '⟼',
      looparrowright: '↬',
      rarrlp: '↬',
      lopar: '⦅',
      lopf: '𝕝',
      loplus: '⨭',
      lotimes: '⨴',
      lowast: '∗',
      loz: '◊',
      lozenge: '◊',
      lpar: '(',
      lparlt: '⦓',
      lrhard: '⥭',
      lrm: '‎',
      lrtri: '⊿',
      lsaquo: '‹',
      lscr: '𝓁',
      lsime: '⪍',
      lsimg: '⪏',
      lsquor: '‚',
      sbquo: '‚',
      lstrok: 'ł',
      ltcc: '⪦',
      ltcir: '⩹',
      ltimes: '⋉',
      ltlarr: '⥶',
      ltquest: '⩻',
      ltrPar: '⦖',
      ltri: '◃',
      triangleleft: '◃',
      lurdshar: '⥊',
      luruhar: '⥦',
      lvertneqq: '≨︀',
      lvnE: '≨︀',
      mDDot: '∺',
      macr: '¯',
      strns: '¯',
      male: '♂',
      malt: '✠',
      maltese: '✠',
      marker: '▮',
      mcomma: '⨩',
      mcy: 'м',
      mdash: '—',
      mfr: '𝔪',
      mho: '℧',
      micro: 'µ',
      midcir: '⫰',
      minus: '−',
      minusdu: '⨪',
      mlcp: '⫛',
      models: '⊧',
      mopf: '𝕞',
      mscr: '𝓂',
      mu: 'μ',
      multimap: '⊸',
      mumap: '⊸',
      nGg: '⋙̸',
      nGt: '≫⃒',
      nLeftarrow: '⇍',
      nlArr: '⇍',
      nLeftrightarrow: '⇎',
      nhArr: '⇎',
      nLl: '⋘̸',
      nLt: '≪⃒',
      nRightarrow: '⇏',
      nrArr: '⇏',
      nVDash: '⊯',
      nVdash: '⊮',
      nacute: 'ń',
      nang: '∠⃒',
      napE: '⩰̸',
      napid: '≋̸',
      napos: 'ŉ',
      natur: '♮',
      natural: '♮',
      ncap: '⩃',
      ncaron: 'ň',
      ncedil: 'ņ',
      ncongdot: '⩭̸',
      ncup: '⩂',
      ncy: 'н',
      ndash: '–',
      neArr: '⇗',
      nearhk: '⤤',
      nedot: '≐̸',
      nesear: '⤨',
      toea: '⤨',
      nfr: '𝔫',
      nharr: '↮',
      nleftrightarrow: '↮',
      nhpar: '⫲',
      nis: '⋼',
      nisd: '⋺',
      njcy: 'њ',
      nlE: '≦̸',
      nleqq: '≦̸',
      nlarr: '↚',
      nleftarrow: '↚',
      nldr: '‥',
      nopf: '𝕟',
      not: '¬',
      notinE: '⋹̸',
      notindot: '⋵̸',
      notinvb: '⋷',
      notinvc: '⋶',
      notnivb: '⋾',
      notnivc: '⋽',
      nparsl: '⫽⃥',
      npart: '∂̸',
      npolint: '⨔',
      nrarr: '↛',
      nrightarrow: '↛',
      nrarrc: '⤳̸',
      nrarrw: '↝̸',
      nscr: '𝓃',
      nsub: '⊄',
      nsubE: '⫅̸',
      nsubseteqq: '⫅̸',
      nsup: '⊅',
      nsupE: '⫆̸',
      nsupseteqq: '⫆̸',
      ntilde: 'ñ',
      nu: 'ν',
      num: '#',
      numero: '№',
      numsp: ' ',
      nvDash: '⊭',
      nvHarr: '⤄',
      nvap: '≍⃒',
      nvdash: '⊬',
      nvge: '≥⃒',
      nvgt: '>⃒',
      nvinfin: '⧞',
      nvlArr: '⤂',
      nvle: '≤⃒',
      nvlt: '<⃒',
      nvltrie: '⊴⃒',
      nvrArr: '⤃',
      nvrtrie: '⊵⃒',
      nvsim: '∼⃒',
      nwArr: '⇖',
      nwarhk: '⤣',
      nwnear: '⤧',
      oacute: 'ó',
      ocirc: 'ô',
      ocy: 'о',
      odblac: 'ő',
      odiv: '⨸',
      odsold: '⦼',
      oelig: 'œ',
      ofcir: '⦿',
      ofr: '𝔬',
      ogon: '˛',
      ograve: 'ò',
      ogt: '⧁',
      ohbar: '⦵',
      olcir: '⦾',
      olcross: '⦻',
      olt: '⧀',
      omacr: 'ō',
      omega: 'ω',
      omicron: 'ο',
      omid: '⦶',
      oopf: '𝕠',
      opar: '⦷',
      operp: '⦹',
      or: '∨',
      vee: '∨',
      ord: '⩝',
      order: 'ℴ',
      orderof: 'ℴ',
      oscr: 'ℴ',
      ordf: 'ª',
      ordm: 'º',
      origof: '⊶',
      oror: '⩖',
      orslope: '⩗',
      orv: '⩛',
      oslash: 'ø',
      osol: '⊘',
      otilde: 'õ',
      otimesas: '⨶',
      ouml: 'ö',
      ovbar: '⌽',
      para: '¶',
      parsim: '⫳',
      parsl: '⫽',
      pcy: 'п',
      percnt: '%',
      period: '.',
      permil: '‰',
      pertenk: '‱',
      pfr: '𝔭',
      phi: 'φ',
      phiv: 'ϕ',
      straightphi: 'ϕ',
      varphi: 'ϕ',
      phone: '☎',
      pi: 'π',
      piv: 'ϖ',
      varpi: 'ϖ',
      planckh: 'ℎ',
      plus: '+',
      plusacir: '⨣',
      pluscir: '⨢',
      plusdu: '⨥',
      pluse: '⩲',
      plussim: '⨦',
      plustwo: '⨧',
      pointint: '⨕',
      popf: '𝕡',
      pound: '£',
      prE: '⪳',
      prap: '⪷',
      precapprox: '⪷',
      precnapprox: '⪹',
      prnap: '⪹',
      precneqq: '⪵',
      prnE: '⪵',
      precnsim: '⋨',
      prnsim: '⋨',
      prime: '′',
      profalar: '⌮',
      profline: '⌒',
      profsurf: '⌓',
      prurel: '⊰',
      pscr: '𝓅',
      psi: 'ψ',
      puncsp: ' ',
      qfr: '𝔮',
      qopf: '𝕢',
      qprime: '⁗',
      qscr: '𝓆',
      quatint: '⨖',
      quest: '?',
      rAtail: '⤜',
      rHar: '⥤',
      race: '∽̱',
      racute: 'ŕ',
      raemptyv: '⦳',
      rangd: '⦒',
      range: '⦥',
      raquo: '»',
      rarrap: '⥵',
      rarrbfs: '⤠',
      rarrc: '⤳',
      rarrfs: '⤞',
      rarrpl: '⥅',
      rarrsim: '⥴',
      rarrtl: '↣',
      rightarrowtail: '↣',
      rarrw: '↝',
      rightsquigarrow: '↝',
      ratail: '⤚',
      ratio: '∶',
      rbbrk: '❳',
      rbrace: '}',
      rcub: '}',
      rbrack: ']',
      rsqb: ']',
      rbrke: '⦌',
      rbrksld: '⦎',
      rbrkslu: '⦐',
      rcaron: 'ř',
      rcedil: 'ŗ',
      rcy: 'р',
      rdca: '⤷',
      rdldhar: '⥩',
      rdsh: '↳',
      rect: '▭',
      rfisht: '⥽',
      rfr: '𝔯',
      rharul: '⥬',
      rho: 'ρ',
      rhov: 'ϱ',
      varrho: 'ϱ',
      rightrightarrows: '⇉',
      rrarr: '⇉',
      rightthreetimes: '⋌',
      rthree: '⋌',
      ring: '˚',
      rlm: '‏',
      rmoust: '⎱',
      rmoustache: '⎱',
      rnmid: '⫮',
      roang: '⟭',
      roarr: '⇾',
      ropar: '⦆',
      ropf: '𝕣',
      roplus: '⨮',
      rotimes: '⨵',
      rpar: ')',
      rpargt: '⦔',
      rppolint: '⨒',
      rsaquo: '›',
      rscr: '𝓇',
      rtimes: '⋊',
      rtri: '▹',
      triangleright: '▹',
      rtriltri: '⧎',
      ruluhar: '⥨',
      rx: '℞',
      sacute: 'ś',
      scE: '⪴',
      scap: '⪸',
      succapprox: '⪸',
      scaron: 'š',
      scedil: 'ş',
      scirc: 'ŝ',
      scnE: '⪶',
      succneqq: '⪶',
      scnap: '⪺',
      succnapprox: '⪺',
      scnsim: '⋩',
      succnsim: '⋩',
      scpolint: '⨓',
      scy: 'с',
      sdot: '⋅',
      sdote: '⩦',
      seArr: '⇘',
      sect: '§',
      semi: ';',
      seswar: '⤩',
      tosa: '⤩',
      sext: '✶',
      sfr: '𝔰',
      sharp: '♯',
      shchcy: 'щ',
      shcy: 'ш',
      shy: '­',
      sigma: 'σ',
      sigmaf: 'ς',
      sigmav: 'ς',
      varsigma: 'ς',
      simdot: '⩪',
      simg: '⪞',
      simgE: '⪠',
      siml: '⪝',
      simlE: '⪟',
      simne: '≆',
      simplus: '⨤',
      simrarr: '⥲',
      smashp: '⨳',
      smeparsl: '⧤',
      smile: '⌣',
      ssmile: '⌣',
      smt: '⪪',
      smte: '⪬',
      smtes: '⪬︀',
      softcy: 'ь',
      sol: '/',
      solb: '⧄',
      solbar: '⌿',
      sopf: '𝕤',
      spades: '♠',
      spadesuit: '♠',
      sqcaps: '⊓︀',
      sqcups: '⊔︀',
      sscr: '𝓈',
      star: '☆',
      sub: '⊂',
      subset: '⊂',
      subE: '⫅',
      subseteqq: '⫅',
      subdot: '⪽',
      subedot: '⫃',
      submult: '⫁',
      subnE: '⫋',
      subsetneqq: '⫋',
      subne: '⊊',
      subsetneq: '⊊',
      subplus: '⪿',
      subrarr: '⥹',
      subsim: '⫇',
      subsub: '⫕',
      subsup: '⫓',
      sung: '♪',
      sup1: '¹',
      sup2: '²',
      sup3: '³',
      supE: '⫆',
      supseteqq: '⫆',
      supdot: '⪾',
      supdsub: '⫘',
      supedot: '⫄',
      suphsol: '⟉',
      suphsub: '⫗',
      suplarr: '⥻',
      supmult: '⫂',
      supnE: '⫌',
      supsetneqq: '⫌',
      supne: '⊋',
      supsetneq: '⊋',
      supplus: '⫀',
      supsim: '⫈',
      supsub: '⫔',
      supsup: '⫖',
      swArr: '⇙',
      swnwar: '⤪',
      szlig: 'ß',
      target: '⌖',
      tau: 'τ',
      tcaron: 'ť',
      tcedil: 'ţ',
      tcy: 'т',
      telrec: '⌕',
      tfr: '𝔱',
      theta: 'θ',
      thetasym: 'ϑ',
      thetav: 'ϑ',
      vartheta: 'ϑ',
      thorn: 'þ',
      times: '×',
      timesbar: '⨱',
      timesd: '⨰',
      topbot: '⌶',
      topcir: '⫱',
      topf: '𝕥',
      topfork: '⫚',
      tprime: '‴',
      triangle: '▵',
      utri: '▵',
      triangleq: '≜',
      trie: '≜',
      tridot: '◬',
      triminus: '⨺',
      triplus: '⨹',
      trisb: '⧍',
      tritime: '⨻',
      trpezium: '⏢',
      tscr: '𝓉',
      tscy: 'ц',
      tshcy: 'ћ',
      tstrok: 'ŧ',
      uHar: '⥣',
      uacute: 'ú',
      ubrcy: 'ў',
      ubreve: 'ŭ',
      ucirc: 'û',
      ucy: 'у',
      udblac: 'ű',
      ufisht: '⥾',
      ufr: '𝔲',
      ugrave: 'ù',
      uhblk: '▀',
      ulcorn: '⌜',
      ulcorner: '⌜',
      ulcrop: '⌏',
      ultri: '◸',
      umacr: 'ū',
      uogon: 'ų',
      uopf: '𝕦',
      upsi: 'υ',
      upsilon: 'υ',
      upuparrows: '⇈',
      uuarr: '⇈',
      urcorn: '⌝',
      urcorner: '⌝',
      urcrop: '⌎',
      uring: 'ů',
      urtri: '◹',
      uscr: '𝓊',
      utdot: '⋰',
      utilde: 'ũ',
      uuml: 'ü',
      uwangle: '⦧',
      vBar: '⫨',
      vBarv: '⫩',
      vangrt: '⦜',
      varsubsetneq: '⊊︀',
      vsubne: '⊊︀',
      varsubsetneqq: '⫋︀',
      vsubnE: '⫋︀',
      varsupsetneq: '⊋︀',
      vsupne: '⊋︀',
      varsupsetneqq: '⫌︀',
      vsupnE: '⫌︀',
      vcy: 'в',
      veebar: '⊻',
      veeeq: '≚',
      vellip: '⋮',
      vfr: '𝔳',
      vopf: '𝕧',
      vscr: '𝓋',
      vzigzag: '⦚',
      wcirc: 'ŵ',
      wedbar: '⩟',
      wedgeq: '≙',
      weierp: '℘',
      wp: '℘',
      wfr: '𝔴',
      wopf: '𝕨',
      wscr: '𝓌',
      xfr: '𝔵',
      xi: 'ξ',
      xnis: '⋻',
      xopf: '𝕩',
      xscr: '𝓍',
      yacute: 'ý',
      yacy: 'я',
      ycirc: 'ŷ',
      ycy: 'ы',
      yen: '¥',
      yfr: '𝔶',
      yicy: 'ї',
      yopf: '𝕪',
      yscr: '𝓎',
      yucy: 'ю',
      yuml: 'ÿ',
      zacute: 'ź',
      zcaron: 'ž',
      zcy: 'з',
      zdot: 'ż',
      zeta: 'ζ',
      zfr: '𝔷',
      zhcy: 'ж',
      zigrarr: '⇝',
      zopf: '𝕫',
      zscr: '𝓏',
      zwj: '‍',
      zwnj: '‌'
    };
    rq.ngsp = '';
    var rN = class {
        tokens;
        errors;
        nonNormalizedIcuExpressions;
        constructor(e, t, r) {
          ((this.tokens = e),
            (this.errors = t),
            (this.nonNormalizedIcuExpressions = r));
        }
      },
      rA = /\r\n?/g;
    function rD(e) {
      return `Unexpected character "${0 === e ? 'EOF' : String.fromCharCode(e)}"`;
    }
    function rI(e) {
      return `Unknown entity "${e}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`;
    }
    var rM = [
        '@if',
        '@else',
        '@for',
        '@switch',
        '@case',
        '@default',
        '@empty',
        '@defer',
        '@placeholder',
        '@loading',
        '@error',
        '@content'
      ],
      rP = /^default[^\S\r\n]+never/,
      rB = /^else[^\S\r\n]+if/,
      rH = class {
        _getTagContentType;
        _cursor;
        _tokenizeIcu;
        _leadingTriviaCodePoints;
        _canSelfClose;
        _allowHtmComponentClosingTags;
        _allowStartTagComments;
        _currentTokenStart = null;
        _currentTokenType = null;
        _expansionCaseStack = [];
        _openDirectiveCount = 0;
        _inInterpolation = !1;
        _preserveLineEndings;
        _i18nNormalizeLineEndingsInICUs;
        _fullNameStack = [];
        _tokenizeBlocks;
        _tokenizeLet;
        _selectorlessEnabled;
        tokens = [];
        errors = [];
        nonNormalizedIcuExpressions = [];
        constructor(e, t, r) {
          ((this._getTagContentType = t),
            (this._tokenizeIcu = r.tokenizeExpansionForms || !1),
            (this._leadingTriviaCodePoints =
              r.leadingTriviaChars &&
              r.leadingTriviaChars.map(e => e.codePointAt(0) || 0)),
            (this._canSelfClose = r.canSelfClose || !1),
            (this._allowHtmComponentClosingTags =
              r.allowHtmComponentClosingTags || !1),
            (this._allowStartTagComments = r.allowStartTagComments ?? !0));
          let n = r.range || {
            endPos: e.content.length,
            startPos: 0,
            startLine: 0,
            startCol: 0
          };
          ((this._cursor = r.escapedString ? new rK(e, n) : new rG(e, n)),
            (this._preserveLineEndings = r.preserveLineEndings || !1),
            (this._i18nNormalizeLineEndingsInICUs =
              r.i18nNormalizeLineEndingsInICUs || !1),
            (this._tokenizeBlocks = r.tokenizeBlocks ?? !0),
            (this._tokenizeLet = r.tokenizeLet ?? !0),
            (this._selectorlessEnabled = r.selectorlessEnabled ?? !1));
          try {
            this._cursor.init();
          } catch (e) {
            this.handleError(e);
          }
        }
        _processCarriageReturns(e) {
          return this._preserveLineEndings
            ? e
            : e.replace(
                rA,
                `
`
              );
        }
        tokenize() {
          for (; 0 !== this._cursor.peek();) {
            let e = this._cursor.clone();
            try {
              if (this._attemptCharCode(60))
                if (this._attemptCharCode(33))
                  this._attemptStr('[CDATA[')
                    ? this._consumeCdata(e)
                    : this._attemptStr('--')
                      ? this._consumeComment(e)
                      : this._attemptStrCaseInsensitive('doctype')
                        ? this._consumeDocType(e)
                        : this._consumeBogusComment(e);
                else if (this._attemptCharCode(47)) this._consumeTagClose(e);
                else {
                  let t = this._cursor.clone();
                  this._attemptCharCode(63)
                    ? ((this._cursor = t), this._consumeBogusComment(e))
                    : this._consumeTagOpen(e);
                }
              else
                this._tokenizeLet &&
                64 === this._cursor.peek() &&
                !this._inInterpolation &&
                this._isLetStart()
                  ? this._consumeLetDeclaration(e)
                  : this._tokenizeBlocks && this._isBlockStart()
                    ? this._consumeBlockStart(e)
                    : this._tokenizeBlocks &&
                        !this._inInterpolation &&
                        !this._isInExpansionCase() &&
                        !this._isInExpansionForm() &&
                        this._attemptCharCode(125)
                      ? this._consumeBlockEnd(e)
                      : (this._tokenizeIcu && this._tokenizeExpansionForm()) ||
                        this._consumeWithInterpolation(
                          5,
                          8,
                          () => this._isTextEnd(),
                          () => this._isTagStart()
                        );
            } catch (e) {
              this.handleError(e);
            }
          }
          (this._beginToken(43), this._endToken([]));
        }
        _getBlockName() {
          let e = !1,
            t = this._cursor.clone();
          this._attemptCharCodeUntilFn(t => {
            var r;
            return ry(t)
              ? !e
              : !(rT((r = t)) || rC(r) || 95 === r) || ((e = !0), !1);
          });
          let r = this._cursor.getChars(t).trim();
          return (
            rB.test(r) ? (r = 'else if') : rP.test(r) && (r = 'default never'),
            r
          );
        }
        _consumeBlockStart(e) {
          (this._requireCharCode(64), this._beginToken(26, e));
          let t = this._endToken([this._getBlockName()]);
          if (40 === this._cursor.peek())
            if (
              (this._cursor.advance(),
              this._consumeBlockParameters(),
              this._attemptCharCodeUntilFn(rR),
              this._attemptCharCode(41))
            )
              this._attemptCharCodeUntilFn(rR);
            else {
              t.type = 30;
              return;
            }
          if ('default never' === t.parts[0] && this._attemptCharCode(59)) {
            (this._beginToken(27),
              this._endToken([]),
              this._beginToken(28),
              this._endToken([]));
            return;
          }
          this._attemptCharCode(123)
            ? (this._beginToken(27), this._endToken([]))
            : this._isBlockStart() &&
                ('case' === t.parts[0] || 'default' === t.parts[0])
              ? (this._beginToken(27),
                this._endToken([]),
                this._beginToken(28),
                this._endToken([]))
              : (t.type = 30);
        }
        _consumeBlockEnd(e) {
          (this._beginToken(28, e), this._endToken([]));
        }
        _consumeBlockParameters() {
          for (
            this._attemptCharCodeUntilFn(rz);
            41 !== this._cursor.peek() && 0 !== this._cursor.peek();
          ) {
            this._beginToken(29);
            let e = this._cursor.clone(),
              t = null,
              r = 0;
            for (
              ;
              (59 !== this._cursor.peek() && 0 !== this._cursor.peek()) ||
              null !== t;
            ) {
              let e = this._cursor.peek();
              if (92 === e) this._cursor.advance();
              else if (e === t) t = null;
              else if (null === t && rL(e)) t = e;
              else if (40 === e && null === t) r++;
              else if (41 === e && null === t) {
                if (0 === r) break;
                r > 0 && r--;
              }
              this._cursor.advance();
            }
            (this._endToken([this._cursor.getChars(e)]),
              this._attemptCharCodeUntilFn(rz));
          }
        }
        _consumeLetDeclaration(e) {
          if (
            (this._requireStr('@let'),
            this._beginToken(31, e),
            ry(this._cursor.peek()))
          )
            this._attemptCharCodeUntilFn(rR);
          else {
            this._endToken([this._cursor.getChars(e)]).type = 34;
            return;
          }
          let t = this._endToken([this._getLetDeclarationName()]);
          if ((this._attemptCharCodeUntilFn(rR), !this._attemptCharCode(61))) {
            t.type = 34;
            return;
          }
          (this._attemptCharCodeUntilFn(e => rR(e) && !rx(e)),
            this._consumeLetDeclarationValue(),
            59 === this._cursor.peek()
              ? (this._beginToken(33),
                this._cursor.advance(),
                this._endToken([]))
              : ((t.type = 34), (t.sourceSpan = this._cursor.getSpan(e))));
        }
        _getLetDeclarationName() {
          let e = this._cursor.clone(),
            t = !1;
          return (
            this._attemptCharCodeUntilFn(
              e =>
                !(rT(e) || 36 === e || 95 === e || (t && rC(e))) ||
                ((t = !0), !1)
            ),
            this._cursor.getChars(e).trim()
          );
        }
        _consumeLetDeclarationValue() {
          let e = this._cursor.clone();
          for (this._beginToken(32, e); 0 !== this._cursor.peek();) {
            let e = this._cursor.peek();
            if (59 === e) break;
            (rL(e) &&
              (this._cursor.advance(),
              this._attemptCharCodeUntilFn(t =>
                92 === t ? (this._cursor.advance(), !1) : t === e
              )),
              this._cursor.advance());
          }
          this._endToken([this._cursor.getChars(e)]);
        }
        _tokenizeExpansionForm() {
          if (this.isExpansionFormStart())
            return (this._consumeExpansionFormStart(), !0);
          if (125 !== this._cursor.peek() && this._isInExpansionForm())
            return (this._consumeExpansionCaseStart(), !0);
          if (125 === this._cursor.peek()) {
            if (this._isInExpansionCase())
              return (this._consumeExpansionCaseEnd(), !0);
            if (this._isInExpansionForm())
              return (this._consumeExpansionFormEnd(), !0);
          }
          return !1;
        }
        _beginToken(e, t = this._cursor.clone()) {
          ((this._currentTokenStart = t), (this._currentTokenType = e));
        }
        _endToken(e, t) {
          if (null === this._currentTokenStart)
            throw new ri(
              this._cursor.getSpan(t),
              'Programming error - attempted to end a token when there was no start to the token'
            );
          if (null === this._currentTokenType)
            throw new ri(
              this._cursor.getSpan(this._currentTokenStart),
              'Programming error - attempted to end a token which has no token type'
            );
          let r = {
            type: this._currentTokenType,
            parts: e,
            sourceSpan: (t ?? this._cursor).getSpan(
              this._currentTokenStart,
              this._leadingTriviaCodePoints
            )
          };
          return (
            this.tokens.push(r),
            (this._currentTokenStart = null),
            (this._currentTokenType = null),
            r
          );
        }
        _createError(e, t) {
          this._isInExpansionForm() &&
            (e +=
              ' (Do you have an unescaped "{" in your template? Use "{{ \'{\' }}") to escape it.)');
          let r = new ri(t, e);
          return (
            (this._currentTokenStart = null),
            (this._currentTokenType = null),
            r
          );
        }
        handleError(e) {
          if (
            (e instanceof rJ &&
              (e = this._createError(e.msg, this._cursor.getSpan(e.cursor))),
            e instanceof ri)
          )
            this.errors.push(e);
          else throw e;
        }
        _attemptCharCode(e) {
          return this._cursor.peek() === e && (this._cursor.advance(), !0);
        }
        _attemptCharCodeCaseInsensitive(e) {
          var t, r;
          return (
            (t = this._cursor.peek()),
            (r = e),
            rO(t) === rO(r) && (this._cursor.advance(), !0)
          );
        }
        _requireCharCode(e) {
          let t = this._cursor.clone();
          if (!this._attemptCharCode(e))
            throw this._createError(
              rD(this._cursor.peek()),
              this._cursor.getSpan(t)
            );
        }
        _attemptStr(e) {
          let t = e.length;
          if (this._cursor.charsLeft() < t) return !1;
          let r = this._cursor.clone();
          for (let n = 0; n < t; n++)
            if (!this._attemptCharCode(e.charCodeAt(n)))
              return ((this._cursor = r), !1);
          return !0;
        }
        _attemptStrCaseInsensitive(e) {
          for (let t = 0; t < e.length; t++)
            if (!this._attemptCharCodeCaseInsensitive(e.charCodeAt(t)))
              return !1;
          return !0;
        }
        _requireStr(e) {
          let t = this._cursor.clone();
          if (!this._attemptStr(e))
            throw this._createError(
              rD(this._cursor.peek()),
              this._cursor.getSpan(t)
            );
        }
        _requireStrCaseInsensitive(e) {
          let t = this._cursor.clone();
          if (!this._attemptStrCaseInsensitive(e))
            throw this._createError(
              rD(this._cursor.peek()),
              this._cursor.getSpan(t)
            );
        }
        _attemptCharCodeUntilFn(e) {
          for (; !e(this._cursor.peek());) this._cursor.advance();
        }
        _requireCharCodeUntilFn(e, t) {
          let r = this._cursor.clone();
          if ((this._attemptCharCodeUntilFn(e), this._cursor.diff(r) < t))
            throw this._createError(
              rD(this._cursor.peek()),
              this._cursor.getSpan(r)
            );
        }
        _attemptUntilChar(e) {
          for (; this._cursor.peek() !== e;) this._cursor.advance();
        }
        _readChar() {
          let e = String.fromCodePoint(this._cursor.peek());
          return (this._cursor.advance(), e);
        }
        _peekStr(e) {
          let t = e.length;
          if (this._cursor.charsLeft() < t) return !1;
          let r = this._cursor.clone();
          for (let n = 0; n < t; n++) {
            if (r.peek() !== e.charCodeAt(n)) return !1;
            r.advance();
          }
          return !0;
        }
        _isBlockStart() {
          return 64 === this._cursor.peek() && rM.some(e => this._peekStr(e));
        }
        _isLetStart() {
          return 64 === this._cursor.peek() && this._peekStr('@let');
        }
        _consumeEntity(e) {
          this._beginToken(9);
          let t = this._cursor.clone();
          if ((this._cursor.advance(), this._attemptCharCode(35))) {
            let e = this._attemptCharCode(120) || this._attemptCharCode(88),
              a = this._cursor.clone();
            if ((this._attemptCharCodeUntilFn(rU), 59 != this._cursor.peek())) {
              var r, n;
              throw (
                this._cursor.advance(),
                this._createError(
                  ((r = e ? 'hexadecimal' : 'decimal'),
                  (n = this._cursor.getChars(t)),
                  `Unable to parse entity "${n}" - ${r} character reference entities must end with ";"`),
                  this._cursor.getSpan()
                )
              );
            }
            let i = this._cursor.getChars(a);
            this._cursor.advance();
            try {
              let r = parseInt(i, e ? 16 : 10);
              this._endToken([
                String.fromCodePoint(r),
                this._cursor.getChars(t)
              ]);
            } catch {
              throw this._createError(
                rI(this._cursor.getChars(t)),
                this._cursor.getSpan()
              );
            }
          } else {
            let r = this._cursor.clone();
            if ((this._attemptCharCodeUntilFn(rV), 59 != this._cursor.peek()))
              (this._beginToken(e, t),
                (this._cursor = r),
                this._endToken(['&']));
            else {
              let e = this._cursor.getChars(r);
              this._cursor.advance();
              let n = rq.hasOwnProperty(e) && rq[e];
              if (!n) throw this._createError(rI(e), this._cursor.getSpan(t));
              this._endToken([n, `&${e};`]);
            }
          }
        }
        _consumeRawText(e, t) {
          this._beginToken(e ? 6 : 7);
          let r = [];
          for (;;) {
            let n = this._cursor.clone(),
              a = t();
            if (((this._cursor = n), a)) break;
            e && 38 === this._cursor.peek()
              ? (this._endToken([this._processCarriageReturns(r.join(''))]),
                (r.length = 0),
                this._consumeEntity(6),
                this._beginToken(6))
              : r.push(this._readChar());
          }
          this._endToken([this._processCarriageReturns(r.join(''))]);
        }
        _consumeComment(e) {
          (this._beginToken(10, e),
            this._endToken([]),
            this._consumeRawText(!1, () => this._attemptStr('--\x3e')),
            this._beginToken(11),
            this._requireStr('--\x3e'),
            this._endToken([]));
        }
        _consumeBogusComment(e) {
          (this._beginToken(10, e),
            this._endToken([]),
            this._consumeRawText(!1, () => 62 === this._cursor.peek()),
            this._beginToken(11),
            this._cursor.advance(),
            this._endToken([]));
        }
        _consumeCdata(e) {
          (this._beginToken(13, e),
            this._endToken([]),
            this._consumeRawText(!1, () => this._attemptStr(']]>')),
            this._beginToken(14),
            this._requireStr(']]>'),
            this._endToken([]));
        }
        _consumeDocType(e) {
          (this._beginToken(19, e),
            this._endToken([]),
            this._consumeRawText(!1, () => 62 === this._cursor.peek()),
            this._beginToken(20),
            this._cursor.advance(),
            this._endToken([]));
        }
        _consumePrefixAndName(e) {
          var t;
          let r,
            n = this._cursor.clone(),
            a = '';
          for (
            ;
            58 !== this._cursor.peek() &&
            !(
              ((t = this._cursor.peek()) < 97 || 122 < t) &&
              (t < 65 || 90 < t) &&
              (t < 48 || t > 57)
            );
          )
            this._cursor.advance();
          return (
            58 === this._cursor.peek()
              ? ((a = this._cursor.getChars(n)),
                this._cursor.advance(),
                (r = this._cursor.clone()))
              : (r = n),
            this._requireCharCodeUntilFn(e, +('' !== a)),
            [a, this._cursor.getChars(r)]
          );
        }
        _consumeSingleLineComment(e) {
          let t = this._cursor.clone();
          this._attemptCharCodeUntilFn(e => rx(e) || 0 === e);
          let r = this._cursor.clone(),
            n = r.getChars(t);
          (this._beginToken(12, e),
            this._endToken([n, 'single'], r),
            this._attemptCharCodeUntilFn(rR));
        }
        _consumeMultiLineComment(e) {
          let t = this._cursor.clone();
          this._attemptCharCodeUntilFn(e => {
            if (0 === e) return !0;
            if (42 === e) {
              let e = this._cursor.clone();
              return (e.advance(), 47 === e.peek());
            }
            return !1;
          });
          let r = this._cursor.clone(),
            n = r.getChars(t),
            a = r;
          (this._attemptStr('*/') &&
            ((a = this._cursor.clone()), this._attemptCharCodeUntilFn(rR)),
            this._beginToken(12, e),
            this._endToken([n, 'multi'], a));
        }
        _consumeTagOpen(e) {
          let t,
            r,
            n,
            a,
            i = [];
          try {
            if (this._selectorlessEnabled && r$(this._cursor.peek()))
              ((a = this._consumeComponentOpenStart(e)),
                ([n, r, t] = a.parts),
                r && (n += `:${r}`),
                t && (n += `:${t}`),
                this._attemptCharCodeUntilFn(rR));
            else {
              if (!rT(this._cursor.peek()))
                throw this._createError(
                  rD(this._cursor.peek()),
                  this._cursor.getSpan(e)
                );
              ((r = (a = this._consumeTagOpenStart(e)).parts[0]),
                (t = n = a.parts[1]),
                this._attemptCharCodeUntilFn(rR));
            }
            for (;;) {
              if (this._allowStartTagComments) {
                let e = this._cursor.clone();
                if (this._attemptStr('//')) {
                  this._consumeSingleLineComment(e);
                  continue;
                }
                if (this._attemptStr('/*')) {
                  this._consumeMultiLineComment(e);
                  continue;
                }
              }
              if (rj(this._cursor.peek())) break;
              if (this._selectorlessEnabled && 64 === this._cursor.peek()) {
                let e = this._cursor.clone(),
                  t = e.clone();
                (t.advance(), r$(t.peek()) && this._consumeDirective(e, t));
              } else {
                let e = this._consumeAttribute();
                i.push(e);
              }
            }
            35 === a.type
              ? this._consumeComponentOpenEnd()
              : this._consumeTagOpenEnd();
          } catch (t) {
            if (t instanceof ri)
              return void (a
                ? (a.type = 35 === a.type ? 39 : 4)
                : (this._beginToken(5, e), this._endToken(['<'])));
            throw t;
          }
          if (
            this._canSelfClose &&
            2 === this.tokens[this.tokens.length - 1].type
          )
            return;
          let s = this._getTagContentType(
            t,
            r,
            this._fullNameStack.length > 0,
            i
          );
          (this._handleFullNameStackForTagOpen(r, t),
            0 === s
              ? this._consumeRawTextWithTagClose(r, a, n, !1)
              : 1 === s && this._consumeRawTextWithTagClose(r, a, n, !0));
        }
        _consumeRawTextWithTagClose(e, t, r, n) {
          (this._consumeRawText(
            n,
            () =>
              !!this._attemptCharCode(60) &&
              !!this._attemptCharCode(47) &&
              (this._attemptCharCodeUntilFn(rR),
              !!this._attemptStrCaseInsensitive(
                e && 35 !== t.type ? `${e}:${r}` : r
              )) &&
              (this._attemptCharCodeUntilFn(rR), this._attemptCharCode(62))
          ),
            this._beginToken(35 === t.type ? 38 : 3),
            this._requireCharCodeUntilFn(e => 62 === e, 3),
            this._cursor.advance(),
            this._endToken(t.parts),
            this._handleFullNameStackForTagClose(e, r));
        }
        _consumeTagOpenStart(e) {
          this._beginToken(0, e);
          let t = this._consumePrefixAndName(rF);
          return this._endToken(t);
        }
        _consumeComponentOpenStart(e) {
          this._beginToken(35, e);
          let t = this._consumeComponentName();
          return this._endToken(t);
        }
        _consumeComponentName() {
          let e = this._cursor.clone();
          for (; rW(this._cursor.peek());) this._cursor.advance();
          let t = this._cursor.getChars(e),
            r = '',
            n = '';
          return (
            58 === this._cursor.peek() &&
              (this._cursor.advance(),
              ([r, n] = this._consumePrefixAndName(rF))),
            [t, r, n]
          );
        }
        _consumeAttribute() {
          let [e, t] = this._consumeAttributeName(),
            r;
          return (
            this._attemptCharCodeUntilFn(rR),
            this._attemptCharCode(61) &&
              (this._attemptCharCodeUntilFn(rR),
              (r = this._consumeAttributeValue())),
            this._attemptCharCodeUntilFn(rR),
            { prefix: e, name: t, value: r }
          );
        }
        _consumeAttributeName() {
          let e,
            t = this._cursor.peek();
          if (39 === t || 34 === t)
            throw this._createError(rD(t), this._cursor.getSpan());
          if ((this._beginToken(15), this._openDirectiveCount > 0)) {
            let t = 0;
            e = e => {
              if (this._openDirectiveCount > 0) {
                if (40 === e) t++;
                else if (41 === e) {
                  if (0 === t) return !0;
                  t--;
                }
              }
              return rF(e);
            };
          } else if (91 === t) {
            let t = 0;
            e = e => (91 === e ? t++ : 93 === e && t--, t <= 0 ? rF(e) : rx(e));
          } else e = rF;
          let r = this._consumePrefixAndName(e);
          return (this._endToken(r), r);
        }
        _consumeAttributeValue() {
          let e;
          if (39 === this._cursor.peek() || 34 === this._cursor.peek()) {
            let t = this._cursor.peek();
            this._consumeQuote(t);
            let r = () => this._cursor.peek() === t;
            ((e = this._consumeWithInterpolation(17, 18, r, r)),
              this._consumeQuote(t));
          } else {
            let t = () => rF(this._cursor.peek());
            e = this._consumeWithInterpolation(17, 18, t, t);
          }
          return e;
        }
        _consumeQuote(e) {
          (this._beginToken(16),
            this._requireCharCode(e),
            this._endToken([String.fromCodePoint(e)]));
        }
        _consumeTagOpenEnd() {
          let e = this._attemptCharCode(47) ? 2 : 1;
          (this._beginToken(e), this._requireCharCode(62), this._endToken([]));
        }
        _consumeComponentOpenEnd() {
          let e = this._attemptCharCode(47) ? 37 : 36;
          (this._beginToken(e), this._requireCharCode(62), this._endToken([]));
        }
        _consumeTagClose(e) {
          if (this._selectorlessEnabled) {
            let t = e.clone();
            for (; 62 !== t.peek() && !r$(t.peek());) t.advance();
            if (r$(t.peek())) {
              this._beginToken(38, e);
              let t = this._consumeComponentName();
              (this._attemptCharCodeUntilFn(rR),
                this._requireCharCode(62),
                this._endToken(t));
              return;
            }
          }
          if (
            (this._beginToken(3, e),
            this._attemptCharCodeUntilFn(rR),
            this._allowHtmComponentClosingTags && this._attemptCharCode(47))
          )
            (this._attemptCharCodeUntilFn(rR),
              this._requireCharCode(62),
              this._endToken([]));
          else {
            let [e, t] = this._consumePrefixAndName(rF);
            (this._attemptCharCodeUntilFn(rR),
              this._requireCharCode(62),
              this._endToken([e, t]),
              this._handleFullNameStackForTagClose(e, t));
          }
        }
        _consumeExpansionFormStart() {
          (this._beginToken(21),
            this._requireCharCode(123),
            this._endToken([]),
            this._expansionCaseStack.push(21),
            this._beginToken(7));
          let e = this._readUntil(44),
            t = this._processCarriageReturns(e);
          if (this._i18nNormalizeLineEndingsInICUs) this._endToken([t]);
          else {
            let r = this._endToken([e]);
            t !== e && this.nonNormalizedIcuExpressions.push(r);
          }
          (this._requireCharCode(44),
            this._attemptCharCodeUntilFn(rR),
            this._beginToken(7));
          let r = this._readUntil(44);
          (this._endToken([r]),
            this._requireCharCode(44),
            this._attemptCharCodeUntilFn(rR));
        }
        _consumeExpansionCaseStart() {
          this._beginToken(22);
          let e = this._readUntil(123).trim();
          (this._endToken([e]),
            this._attemptCharCodeUntilFn(rR),
            this._beginToken(23),
            this._requireCharCode(123),
            this._endToken([]),
            this._attemptCharCodeUntilFn(rR),
            this._expansionCaseStack.push(23));
        }
        _consumeExpansionCaseEnd() {
          (this._beginToken(24),
            this._requireCharCode(125),
            this._endToken([]),
            this._attemptCharCodeUntilFn(rR),
            this._expansionCaseStack.pop());
        }
        _consumeExpansionFormEnd() {
          (this._beginToken(25),
            this._requireCharCode(125),
            this._endToken([]),
            this._expansionCaseStack.pop());
        }
        _consumeWithInterpolation(e, t, r, n) {
          this._beginToken(e);
          let a = [];
          for (; !r();) {
            let r = this._cursor.clone();
            this._attemptStr('{{')
              ? (this._endToken([this._processCarriageReturns(a.join(''))], r),
                (a.length = 0),
                this._consumeInterpolation(t, r, n),
                this._beginToken(e))
              : 38 === this._cursor.peek()
                ? (this._endToken([this._processCarriageReturns(a.join(''))]),
                  (a.length = 0),
                  this._consumeEntity(e),
                  this._beginToken(e))
                : a.push(this._readChar());
          }
          this._inInterpolation = !1;
          let i = this._processCarriageReturns(a.join(''));
          return (this._endToken([i]), i);
        }
        _consumeInterpolation(e, t, r) {
          let n = [];
          (this._beginToken(e, t), n.push('{{'));
          let a = this._cursor.clone(),
            i = null,
            s = !1;
          for (; 0 !== this._cursor.peek() && (null === r || !r());) {
            let e = this._cursor.clone();
            if (this._isTagStart()) {
              ((this._cursor = e),
                n.push(this._getProcessedChars(a, e)),
                this._endToken(n));
              return;
            }
            if (null === i)
              if (this._attemptStr('}}')) {
                (n.push(this._getProcessedChars(a, e)),
                  n.push('}}'),
                  this._endToken(n));
                return;
              } else this._attemptStr('//') && (s = !0);
            let t = this._cursor.peek();
            (this._cursor.advance(),
              92 === t
                ? this._cursor.advance()
                : t === i
                  ? (i = null)
                  : !s && null === i && rL(t) && (i = t));
          }
          (n.push(this._getProcessedChars(a, this._cursor)), this._endToken(n));
        }
        _consumeDirective(e, t) {
          for (
            this._requireCharCode(64), this._cursor.advance();
            rW(this._cursor.peek());
          )
            this._cursor.advance();
          this._beginToken(40, e);
          let r = this._cursor.getChars(t);
          if (
            (this._endToken([r]),
            this._attemptCharCodeUntilFn(rR),
            40 === this._cursor.peek())
          ) {
            for (
              this._openDirectiveCount++,
                this._beginToken(41),
                this._cursor.advance(),
                this._endToken([]),
                this._attemptCharCodeUntilFn(rR);
              !rj(this._cursor.peek()) && 41 !== this._cursor.peek();
            )
              this._consumeAttribute();
            if (
              (this._attemptCharCodeUntilFn(rR),
              this._openDirectiveCount--,
              41 !== this._cursor.peek())
            ) {
              if (62 === this._cursor.peek() || 47 === this._cursor.peek())
                return;
              throw this._createError(
                rD(this._cursor.peek()),
                this._cursor.getSpan(e)
              );
            }
            (this._beginToken(42),
              this._cursor.advance(),
              this._endToken([]),
              this._attemptCharCodeUntilFn(rR));
          }
        }
        _getProcessedChars(e, t) {
          return this._processCarriageReturns(t.getChars(e));
        }
        _isTextEnd() {
          return !!(
            this._isTagStart() ||
            0 === this._cursor.peek() ||
            (this._tokenizeIcu &&
              !this._inInterpolation &&
              (this.isExpansionFormStart() ||
                (125 === this._cursor.peek() && this._isInExpansionCase()))) ||
            (this._tokenizeBlocks &&
              !this._inInterpolation &&
              !this._isInExpansion() &&
              (this._isBlockStart() ||
                this._isLetStart() ||
                125 === this._cursor.peek()))
          );
        }
        _isTagStart() {
          if (60 === this._cursor.peek()) {
            let e = this._cursor.clone();
            e.advance();
            let t = e.peek();
            if (
              (97 <= t && t <= 122) ||
              (65 <= t && t <= 90) ||
              47 === t ||
              33 === t
            )
              return !0;
          }
          return !1;
        }
        _readUntil(e) {
          let t = this._cursor.clone();
          return (this._attemptUntilChar(e), this._cursor.getChars(t));
        }
        _isInExpansion() {
          return this._isInExpansionCase() || this._isInExpansionForm();
        }
        _isInExpansionCase() {
          return (
            this._expansionCaseStack.length > 0 &&
            23 === this._expansionCaseStack[this._expansionCaseStack.length - 1]
          );
        }
        _isInExpansionForm() {
          return (
            this._expansionCaseStack.length > 0 &&
            21 === this._expansionCaseStack[this._expansionCaseStack.length - 1]
          );
        }
        isExpansionFormStart() {
          if (123 !== this._cursor.peek()) return !1;
          let e = this._cursor.clone(),
            t = this._attemptStr('{{');
          return ((this._cursor = e), !t);
        }
        _handleFullNameStackForTagOpen(e, t) {
          let r = tG(e, t);
          (0 === this._fullNameStack.length ||
            this._fullNameStack[this._fullNameStack.length - 1] === r) &&
            this._fullNameStack.push(r);
        }
        _handleFullNameStackForTagClose(e, t) {
          let r = tG(e, t);
          0 !== this._fullNameStack.length &&
            this._fullNameStack[this._fullNameStack.length - 1] === r &&
            this._fullNameStack.pop();
        }
      };
    function rR(e) {
      return !ry(e) || 0 === e;
    }
    function rF(e) {
      return (
        ry(e) ||
        62 === e ||
        60 === e ||
        47 === e ||
        39 === e ||
        34 === e ||
        61 === e ||
        0 === e
      );
    }
    function rU(e) {
      return (
        59 === e ||
        0 === e ||
        !((e >= 97 && e <= 102) || (e >= 65 && e <= 70) || rC(e))
      );
    }
    function rV(e) {
      return 59 === e || 0 === e || !(rT(e) || rC(e));
    }
    function rO(e) {
      return e >= 97 && e <= 122 ? e - 97 + 65 : e;
    }
    function rz(e) {
      return 59 !== e && rR(e);
    }
    function r$(e) {
      return 95 === e || (e >= 65 && e <= 90);
    }
    function rW(e) {
      return rT(e) || rC(e) || 95 === e;
    }
    function rj(e) {
      return 47 === e || 62 === e || 60 === e || 0 === e;
    }
    var rG = class Sr {
        state;
        file;
        input;
        end;
        constructor(e, t) {
          if (e instanceof Sr) {
            ((this.file = e.file), (this.input = e.input), (this.end = e.end));
            let t = e.state;
            this.state = {
              peek: t.peek,
              offset: t.offset,
              line: t.line,
              column: t.column
            };
          } else {
            if (!t)
              throw Error(
                'Programming error: the range argument must be provided with a file argument.'
              );
            ((this.file = e),
              (this.input = e.content),
              (this.end = t.endPos),
              (this.state = {
                peek: -1,
                offset: t.startPos,
                line: t.startLine,
                column: t.startCol
              }));
          }
        }
        clone() {
          return new Sr(this);
        }
        peek() {
          return this.state.peek;
        }
        charsLeft() {
          return this.end - this.state.offset;
        }
        diff(e) {
          return this.state.offset - e.state.offset;
        }
        advance() {
          this.advanceState(this.state);
        }
        init() {
          this.updatePeek(this.state);
        }
        getSpan(e, t) {
          let r = (e = e || this);
          if (t)
            for (; this.diff(e) > 0 && -1 !== t.indexOf(e.peek());)
              (r === e && (e = e.clone()), e.advance());
          let n = this.locationFromCursor(e);
          return new rn(
            n,
            this.locationFromCursor(this),
            r !== e ? this.locationFromCursor(r) : n
          );
        }
        getChars(e) {
          return this.input.substring(e.state.offset, this.state.offset);
        }
        charAt(e) {
          return this.input.charCodeAt(e);
        }
        advanceState(e) {
          if (e.offset >= this.end)
            throw (
              (this.state = e),
              new rJ('Unexpected character "EOF"', this)
            );
          let t = this.charAt(e.offset);
          (10 === t ? (e.line++, (e.column = 0)) : rx(t) || e.column++,
            e.offset++,
            this.updatePeek(e));
        }
        updatePeek(e) {
          e.peek = e.offset >= this.end ? 0 : this.charAt(e.offset);
        }
        locationFromCursor(e) {
          return new rt(e.file, e.state.offset, e.state.line, e.state.column);
        }
      },
      rK = class vr extends rG {
        internalState;
        constructor(e, t) {
          e instanceof vr
            ? (super(e), (this.internalState = { ...e.internalState }))
            : (super(e, t), (this.internalState = this.state));
        }
        advance() {
          ((this.state = this.internalState),
            super.advance(),
            this.processEscapeSequence());
        }
        init() {
          (super.init(), this.processEscapeSequence());
        }
        clone() {
          return new vr(this);
        }
        getChars(e) {
          let t = e.clone(),
            r = '';
          for (; t.internalState.offset < this.internalState.offset;)
            ((r += String.fromCodePoint(t.peek())), t.advance());
          return r;
        }
        processEscapeSequence() {
          let e = () => this.internalState.peek;
          if (92 === e())
            if (
              ((this.internalState = { ...this.state }),
              this.advanceState(this.internalState),
              110 === e())
            )
              this.state.peek = 10;
            else if (114 === e()) this.state.peek = 13;
            else if (118 === e()) this.state.peek = 11;
            else if (116 === e()) this.state.peek = 9;
            else if (98 === e()) this.state.peek = 8;
            else if (102 === e()) this.state.peek = 12;
            else if (117 === e())
              if ((this.advanceState(this.internalState), 123 === e())) {
                this.advanceState(this.internalState);
                let t = this.clone(),
                  r = 0;
                for (; 125 !== e();)
                  (this.advanceState(this.internalState), r++);
                this.state.peek = this.decodeHexDigits(t, r);
              } else {
                let e = this.clone();
                (this.advanceState(this.internalState),
                  this.advanceState(this.internalState),
                  this.advanceState(this.internalState),
                  (this.state.peek = this.decodeHexDigits(e, 4)));
              }
            else if (120 === e()) {
              this.advanceState(this.internalState);
              let e = this.clone();
              (this.advanceState(this.internalState),
                (this.state.peek = this.decodeHexDigits(e, 2)));
            } else if (rE(e())) {
              let t = '',
                r = 0,
                n = this.clone();
              for (; rE(e()) && r < 3;)
                ((n = this.clone()),
                  (t += String.fromCodePoint(e())),
                  this.advanceState(this.internalState),
                  r++);
              ((this.state.peek = parseInt(t, 8)),
                (this.internalState = n.internalState));
            } else
              rx(this.internalState.peek)
                ? (this.advanceState(this.internalState),
                  (this.state = this.internalState))
                : (this.state.peek = this.internalState.peek);
        }
        decodeHexDigits(e, t) {
          let r = parseInt(
            this.input.slice(
              e.internalState.offset,
              e.internalState.offset + t
            ),
            16
          );
          if (isNaN(r))
            throw (
              (e.state = e.internalState),
              new rJ('Invalid hexadecimal escape sequence', e)
            );
          return r;
        }
      },
      rJ = class extends Error {
        msg;
        cursor;
        constructor(e, t) {
          (super(e),
            (this.msg = e),
            (this.cursor = t),
            Object.setPrototypeOf(this, new.target.prototype));
        }
      },
      rY = class Mi extends ri {
        elementName;
        static create(e, t, r) {
          return new Mi(e, t, r);
        }
        constructor(e, t, r) {
          (super(t, r), (this.elementName = e));
        }
      },
      rZ = class {
        rootNodes;
        errors;
        constructor(e, t) {
          ((this.rootNodes = e), (this.errors = t));
        }
      },
      rQ = class {
        getTagDefinition;
        constructor(e) {
          this.getTagDefinition = e;
        }
        parse(e, t, r, n = !1, a) {
          let i =
              e =>
              (t, ...r) =>
                e(t.toLowerCase(), ...r),
            s = n ? this.getTagDefinition : i(this.getTagDefinition),
            o = e => s(e).getContentType(),
            l = n ? a : i(a),
            c = (function (e, t, r, n = {}) {
              let a = new rH(new rr(e, t), r, n);
              return (
                a.tokenize(),
                new rN(
                  (function (e) {
                    let t = [],
                      r;
                    for (let n = 0; n < e.length; n++) {
                      let a = e[n];
                      (r && 5 === r.type && 5 === a.type) ||
                      (r && 17 === r.type && 17 === a.type)
                        ? ((r.parts[0] += a.parts[0]),
                          (r.sourceSpan.end = a.sourceSpan.end))
                        : ((r = a), t.push(r));
                    }
                    return t;
                  })(a.tokens),
                  a.errors,
                  a.nonNormalizedIcuExpressions
                )
              );
            })(
              e,
              t,
              a
                ? (e, t, r, n) => {
                    let a = l(e, t, r, n);
                    return void 0 !== a ? a : o(e);
                  }
                : o,
              r
            ),
            u = (r && r.canSelfClose) || !1,
            p = (r && r.allowHtmComponentClosingTags) || !1,
            h = new rX(c.tokens, s, u, p, n);
          return (h.build(), new rZ(h.rootNodes, [...c.errors, ...h.errors]));
        }
      },
      rX = class qi {
        tokens;
        tagDefinitionResolver;
        canSelfClose;
        allowHtmComponentClosingTags;
        isTagNameCaseSensitive;
        _index = -1;
        _peek;
        _containerStack = [];
        rootNodes = [];
        errors = [];
        constructor(e, t, r, n, a) {
          ((this.tokens = e),
            (this.tagDefinitionResolver = t),
            (this.canSelfClose = r),
            (this.allowHtmComponentClosingTags = n),
            (this.isTagNameCaseSensitive = a),
            this._advance());
        }
        build() {
          for (; 43 !== this._peek.type;)
            0 === this._peek.type || 4 === this._peek.type
              ? this._consumeElementStartTag(this._advance())
              : 3 === this._peek.type
                ? (this._closeVoidElement(),
                  this._consumeElementEndTag(this._advance()))
                : 13 === this._peek.type
                  ? (this._closeVoidElement(),
                    this._consumeCdata(this._advance()))
                  : 10 === this._peek.type
                    ? (this._closeVoidElement(),
                      this._consumeComment(this._advance()))
                    : 5 === this._peek.type ||
                        7 === this._peek.type ||
                        6 === this._peek.type
                      ? (this._closeVoidElement(),
                        this._consumeText(this._advance()))
                      : 21 === this._peek.type
                        ? this._consumeExpansion(this._advance())
                        : 26 === this._peek.type
                          ? (this._closeVoidElement(),
                            this._consumeBlockOpen(this._advance()))
                          : 28 === this._peek.type
                            ? (this._closeVoidElement(),
                              this._consumeBlockClose(this._advance()))
                            : 30 === this._peek.type
                              ? (this._closeVoidElement(),
                                this._consumeIncompleteBlock(this._advance()))
                              : 31 === this._peek.type
                                ? (this._closeVoidElement(),
                                  this._consumeLet(this._advance()))
                                : 19 === this._peek.type
                                  ? this._consumeDocType(this._advance())
                                  : 34 === this._peek.type
                                    ? (this._closeVoidElement(),
                                      this._consumeIncompleteLet(
                                        this._advance()
                                      ))
                                    : 35 === this._peek.type ||
                                        39 === this._peek.type
                                      ? this._consumeComponentStartTag(
                                          this._advance()
                                        )
                                      : 38 === this._peek.type
                                        ? this._consumeComponentEndTag(
                                            this._advance()
                                          )
                                        : this._advance();
          for (let e of this._containerStack)
            e instanceof rf &&
              this.errors.push(
                rY.create(e.name, e.sourceSpan, `Unclosed block "${e.name}"`)
              );
        }
        _advance() {
          let e = this._peek;
          return (
            this._index < this.tokens.length - 1 && this._index++,
            (this._peek = this.tokens[this._index]),
            e
          );
        }
        _advanceIf(e) {
          return this._peek.type === e ? this._advance() : null;
        }
        _consumeCdata(e) {
          let t = this._advance(),
            r = this._getText(t),
            n = this._advanceIf(14);
          this._addToParent(
            new rl(r, new rn(e.sourceSpan.start, (n || t).sourceSpan.end), [t])
          );
        }
        _consumeComment(e) {
          let t = this._advanceIf(7),
            r = this._advanceIf(11),
            n = null != t ? t.parts[0].trim() : null,
            a =
              null == r
                ? e.sourceSpan
                : new rn(
                    e.sourceSpan.start,
                    r.sourceSpan.end,
                    e.sourceSpan.fullStart
                  );
          this._addToParent(new rm(n, a));
        }
        _consumeDocType(e) {
          let t = this._advanceIf(7),
            r = this._advanceIf(20),
            n = null != t ? t.parts[0].trim() : null,
            a = new rn(e.sourceSpan.start, (r || t || e).sourceSpan.end);
          this._addToParent(new rg(n, a));
        }
        _consumeExpansion(e) {
          let t = this._advance(),
            r = this._advance(),
            n = [];
          for (; 22 === this._peek.type;) {
            let e = this._parseExpansionCase();
            if (!e) return;
            n.push(e);
          }
          if (25 !== this._peek.type)
            return void this.errors.push(
              rY.create(
                null,
                this._peek.sourceSpan,
                "Invalid ICU message. Missing '}'."
              )
            );
          let a = new rn(
            e.sourceSpan.start,
            this._peek.sourceSpan.end,
            e.sourceSpan.fullStart
          );
          (this._addToParent(
            new rc(t.parts[0], r.parts[0], n, a, t.sourceSpan)
          ),
            this._advance());
        }
        _parseExpansionCase() {
          let e = this._advance();
          if (23 !== this._peek.type)
            return (
              this.errors.push(
                rY.create(
                  null,
                  this._peek.sourceSpan,
                  "Invalid ICU message. Missing '{'."
                )
              ),
              null
            );
          let t = this._advance(),
            r = this._collectExpansionExpTokens(t);
          if (!r) return null;
          let n = this._advance();
          r.push({ type: 43, parts: [], sourceSpan: n.sourceSpan });
          let a = new qi(
            r,
            this.tagDefinitionResolver,
            this.canSelfClose,
            this.allowHtmComponentClosingTags,
            this.isTagNameCaseSensitive
          );
          if ((a.build(), a.errors.length > 0))
            return ((this.errors = this.errors.concat(a.errors)), null);
          let i = new rn(
              e.sourceSpan.start,
              n.sourceSpan.end,
              e.sourceSpan.fullStart
            ),
            s = new rn(
              t.sourceSpan.start,
              n.sourceSpan.end,
              t.sourceSpan.fullStart
            );
          return new ru(e.parts[0], a.rootNodes, i, e.sourceSpan, s);
        }
        _collectExpansionExpTokens(e) {
          let t = [],
            r = [23];
          for (;;) {
            if (
              ((21 === this._peek.type || 23 === this._peek.type) &&
                r.push(this._peek.type),
              24 === this._peek.type)
            ) {
              if (!r0(r, 23))
                return (
                  this.errors.push(
                    rY.create(
                      null,
                      e.sourceSpan,
                      "Invalid ICU message. Missing '}'."
                    )
                  ),
                  null
                );
              else if ((r.pop(), 0 === r.length)) return t;
            }
            if (25 === this._peek.type)
              if (!r0(r, 21))
                return (
                  this.errors.push(
                    rY.create(
                      null,
                      e.sourceSpan,
                      "Invalid ICU message. Missing '}'."
                    )
                  ),
                  null
                );
              else r.pop();
            if (43 === this._peek.type)
              return (
                this.errors.push(
                  rY.create(
                    null,
                    e.sourceSpan,
                    "Invalid ICU message. Missing '}'."
                  )
                ),
                null
              );
            t.push(this._advance());
          }
        }
        _getText(e) {
          let t = e.parts[0];
          if (
            t.length > 0 &&
            t[0] ==
              `
`
          ) {
            var r;
            let e = this._getClosestElementLikeParent();
            null != e &&
              0 == e.children.length &&
              null != (r = this._getTagDefinition(e)) &&
              r.ignoreFirstLf &&
              (t = t.substring(1));
          }
          return t;
        }
        _consumeText(e) {
          let t = [e],
            r = e.sourceSpan,
            n = e.parts[0];
          if (
            n.length > 0 &&
            n[0] ===
              `
`
          ) {
            var a;
            let r = this._getContainer();
            null != r &&
              0 === r.children.length &&
              null != (a = this._getTagDefinition(r)) &&
              a.ignoreFirstLf &&
              ((n = n.substring(1)),
              (t[0] = { type: e.type, sourceSpan: e.sourceSpan, parts: [n] }));
          }
          for (
            ;
            8 === this._peek.type ||
            5 === this._peek.type ||
            9 === this._peek.type;
          )
            ((e = this._advance()),
              t.push(e),
              8 === e.type
                ? (n += e.parts.join('').replace(/&([^;]+);/g, r1))
                : 9 === e.type
                  ? (n += e.parts[0])
                  : (n += e.parts.join('')));
          if (n.length > 0) {
            let a = e.sourceSpan;
            this._addToParent(
              new ro(n, new rn(r.start, a.end, r.fullStart, r.details), t)
            );
          }
        }
        _closeVoidElement() {
          var e;
          let t = this._getContainer();
          null !== t &&
            null != (e = this._getTagDefinition(t)) &&
            e.isVoid &&
            this._containerStack.pop();
        }
        _consumeElementStartTag(e) {
          var t;
          let r = [],
            n = [],
            a = [];
          this._consumeAttributesAndDirectives(r, n, a);
          let i = this._getElementFullName(
              e,
              this._getClosestElementLikeParent()
            ),
            s = this._getTagDefinition(i),
            o = !1;
          if (2 === this._peek.type) {
            (this._advance(), (o = !0));
            let t = this._getTagDefinition(i);
            this.canSelfClose ||
              t?.canSelfClose ||
              null !== tj(i) ||
              t?.isVoid ||
              this.errors.push(
                rY.create(
                  i,
                  e.sourceSpan,
                  `Only void, custom and foreign elements can be self closed "${e.parts[1]}"`
                )
              );
          } else 1 === this._peek.type && (this._advance(), (o = !1));
          let l = this._peek.sourceSpan.fullStart,
            c = new rn(e.sourceSpan.start, l, e.sourceSpan.fullStart),
            u = new rd(
              i,
              r,
              n,
              [],
              o,
              c,
              new rn(e.sourceSpan.start, l, e.sourceSpan.fullStart),
              void 0,
              new rn(e.sourceSpan.start.moveBy(1), e.sourceSpan.end),
              s?.isVoid ?? !1,
              void 0,
              a
            ),
            p = this._getContainer(),
            h =
              null !== p &&
              !!(
                null != (t = this._getTagDefinition(p)) &&
                t.isClosedByChild(u.name)
              );
          (this._pushContainer(u, h),
            o
              ? this._popContainer(i, rd, c)
              : 4 === e.type &&
                (this._popContainer(i, rd, null),
                this.errors.push(
                  rY.create(i, c, `Opening tag "${i}" not terminated.`)
                )));
        }
        _consumeComponentStartTag(e) {
          var t;
          let r = e.parts[0],
            n = [],
            a = [],
            i = [];
          this._consumeAttributesAndDirectives(n, a, i);
          let s = this._getClosestElementLikeParent(),
            o = this._getComponentTagName(e, s),
            l = this._getComponentFullName(e, s),
            c = 37 === this._peek.type;
          this._advance();
          let u = this._peek.sourceSpan.fullStart,
            p = new rn(e.sourceSpan.start, u, e.sourceSpan.fullStart),
            h = new rv(
              r,
              o,
              l,
              n,
              a,
              [],
              c,
              p,
              new rn(e.sourceSpan.start, u, e.sourceSpan.fullStart),
              void 0,
              void 0,
              i
            ),
            d = this._getContainer(),
            m =
              null !== d &&
              null !== h.tagName &&
              !!(
                null != (t = this._getTagDefinition(d)) &&
                t.isClosedByChild(h.tagName)
              );
          (this._pushContainer(h, m),
            c
              ? this._popContainer(l, rv, p)
              : 39 === e.type &&
                (this._popContainer(l, rv, null),
                this.errors.push(
                  rY.create(l, p, `Opening tag "${l}" not terminated.`)
                )));
        }
        _consumeAttributesAndDirectives(e, t, r) {
          for (
            ;
            15 === this._peek.type ||
            40 === this._peek.type ||
            12 === this._peek.type;
          )
            if (40 === this._peek.type)
              t.push(this._consumeDirective(this._peek));
            else if (15 === this._peek.type)
              e.push(this._consumeAttr(this._advance()));
            else {
              let e = this._advance();
              r.push(new rh(e.parts[0], e.parts[1], e.sourceSpan));
            }
        }
        _consumeComponentEndTag(e) {
          let t = this._getComponentFullName(
            e,
            this._getClosestElementLikeParent()
          );
          if (!this._popContainer(t, rv, e.sourceSpan)) {
            let r = this._containerStack[this._containerStack.length - 1],
              n;
            n =
              r instanceof rv && r.componentName === e.parts[0]
                ? `, did you mean "${r.fullName}"?`
                : '. It may happen when the tag has already been closed by another tag.';
            let a = `Unexpected closing tag "${t}"${n}`;
            this.errors.push(rY.create(t, e.sourceSpan, a));
          }
        }
        _getTagDefinition(e) {
          return 'string' == typeof e
            ? this.tagDefinitionResolver(e)
            : e instanceof rd
              ? this.tagDefinitionResolver(e.name)
              : e instanceof rv && null !== e.tagName
                ? this.tagDefinitionResolver(e.tagName)
                : null;
        }
        _pushContainer(e, t) {
          (t && this._containerStack.pop(),
            this._addToParent(e),
            this._containerStack.push(e));
        }
        _consumeElementEndTag(e) {
          var t;
          let r =
            this.allowHtmComponentClosingTags && 0 === e.parts.length
              ? null
              : this._getElementFullName(
                  e,
                  this._getClosestElementLikeParent()
                );
          if (r && null != (t = this._getTagDefinition(r)) && t.isVoid)
            this.errors.push(
              rY.create(
                r,
                e.sourceSpan,
                `Void elements do not have end tags "${e.parts[1]}"`
              )
            );
          else if (!this._popContainer(r, rd, e.sourceSpan)) {
            let t = `Unexpected closing tag "${r}". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags`;
            this.errors.push(rY.create(r, e.sourceSpan, t));
          }
        }
        _popContainer(e, t, r) {
          let n = !1;
          for (let i = this._containerStack.length - 1; i >= 0; i--) {
            var a;
            let s = this._containerStack[i],
              o = s instanceof rv ? s.fullName : s.name;
            if (tj(o) ? o === e : (o === e || null === e) && s instanceof t)
              return (
                (s.endSourceSpan = r),
                (s.sourceSpan.end = null !== r ? r.end : s.sourceSpan.end),
                this._containerStack.splice(i, this._containerStack.length - i),
                !n
              );
            (s instanceof rf ||
              !(null != (a = this._getTagDefinition(s)) && a.closedByParent)) &&
              (n = !0);
          }
          return !1;
        }
        _consumeAttr(e) {
          let t = tG(e.parts[0], e.parts[1]),
            r = e.sourceSpan.end,
            n;
          16 === this._peek.type && (n = this._advance());
          let a = '',
            i = [],
            s,
            o;
          if (17 === this._peek.type)
            for (
              s = this._peek.sourceSpan, o = this._peek.sourceSpan.end;
              17 === this._peek.type ||
              18 === this._peek.type ||
              9 === this._peek.type;
            ) {
              let e = this._advance();
              (i.push(e),
                18 === e.type
                  ? (a += e.parts.join('').replace(/&([^;]+);/g, r1))
                  : 9 === e.type
                    ? (a += e.parts[0])
                    : (a += e.parts.join('')),
                (o = r = e.sourceSpan.end));
            }
          16 === this._peek.type && (o = r = this._advance().sourceSpan.end);
          let l =
            s &&
            o &&
            new rn(
              n?.sourceSpan.start ?? s.start,
              o,
              n?.sourceSpan.fullStart ?? s.fullStart
            );
          return new rp(
            t,
            a,
            new rn(e.sourceSpan.start, r, e.sourceSpan.fullStart),
            e.sourceSpan,
            l,
            i.length > 0 ? i : void 0,
            void 0
          );
        }
        _consumeDirective(e) {
          let t = [],
            r = e.sourceSpan.end,
            n = null;
          if ((this._advance(), 41 === this._peek.type)) {
            for (
              r = this._peek.sourceSpan.end, this._advance();
              15 === this._peek.type;
            )
              t.push(this._consumeAttr(this._advance()));
            42 === this._peek.type
              ? ((n = this._peek.sourceSpan), this._advance())
              : this.errors.push(
                  rY.create(
                    null,
                    e.sourceSpan,
                    'Unterminated directive definition'
                  )
                );
          }
          let a = new rn(e.sourceSpan.start, r, e.sourceSpan.fullStart),
            i = new rn(
              a.start,
              null === n ? e.sourceSpan.end : n.end,
              a.fullStart
            );
          return new r_(e.parts[0], t, i, a, n);
        }
        _consumeBlockOpen(e) {
          let t = [];
          for (; 29 === this._peek.type;) {
            let e = this._advance();
            t.push(new rS(e.parts[0], e.sourceSpan));
          }
          27 === this._peek.type && this._advance();
          let r = this._peek.sourceSpan.fullStart,
            n = new rn(e.sourceSpan.start, r, e.sourceSpan.fullStart),
            a = new rn(e.sourceSpan.start, r, e.sourceSpan.fullStart),
            i = new rf(e.parts[0], t, [], n, e.sourceSpan, a);
          this._pushContainer(i, !1);
        }
        _consumeBlockClose(e) {
          let t = this._containerStack.length,
            r = this._containerStack[t - 1];
          if (!this._popContainer(null, rf, e.sourceSpan)) {
            if (this._containerStack.length < t) {
              let t = r instanceof rv ? r.fullName : r.name;
              this.errors.push(
                rY.create(
                  null,
                  e.sourceSpan,
                  `Unexpected closing block. The block may have been closed earlier. Did you forget to close the <${t}> element? If you meant to write the \`}\` character, you should use the "&#125;" HTML entity instead.`
                )
              );
              return;
            }
            this.errors.push(
              rY.create(
                null,
                e.sourceSpan,
                'Unexpected closing block. The block may have been closed earlier. If you meant to write the `}` character, you should use the "&#125;" HTML entity instead.'
              )
            );
          }
        }
        _consumeIncompleteBlock(e) {
          let t = [];
          for (; 29 === this._peek.type;) {
            let e = this._advance();
            t.push(new rS(e.parts[0], e.sourceSpan));
          }
          let r = this._peek.sourceSpan.fullStart,
            n = new rn(e.sourceSpan.start, r, e.sourceSpan.fullStart),
            a = new rn(e.sourceSpan.start, r, e.sourceSpan.fullStart),
            i = new rf(e.parts[0], t, [], n, e.sourceSpan, a);
          (this._pushContainer(i, !1),
            this._popContainer(null, rf, null),
            this.errors.push(
              rY.create(
                e.parts[0],
                n,
                `Incomplete block "${e.parts[0]}". If you meant to write the @ character, you should use the "&#64;" HTML entity instead.`
              )
            ));
        }
        _consumeLet(e) {
          let t = e.parts[0],
            r;
          if (32 !== this._peek.type)
            return void this.errors.push(
              rY.create(
                e.parts[0],
                e.sourceSpan,
                `Invalid @let declaration "${t}". Declaration must have a value.`
              )
            );
          if (((r = this._advance()), 33 !== this._peek.type))
            return void this.errors.push(
              rY.create(
                e.parts[0],
                e.sourceSpan,
                `Unterminated @let declaration "${t}". Declaration must be terminated with a semicolon.`
              )
            );
          let n = this._advance().sourceSpan.end,
            a = new rn(e.sourceSpan.start, n, e.sourceSpan.fullStart),
            i = e.sourceSpan.toString().lastIndexOf(t),
            s = new rn(e.sourceSpan.start.moveBy(i), e.sourceSpan.end),
            o = new rk(t, r.parts[0], a, s, r.sourceSpan);
          this._addToParent(o);
        }
        _consumeIncompleteLet(e) {
          let t = e.parts[0] ?? '',
            r = t ? ` "${t}"` : '';
          if (t.length > 0) {
            let r = e.sourceSpan.toString().lastIndexOf(t),
              n = new rn(e.sourceSpan.start.moveBy(r), e.sourceSpan.end),
              a = new rn(e.sourceSpan.start, e.sourceSpan.start.moveBy(0)),
              i = new rk(t, '', e.sourceSpan, n, a);
            this._addToParent(i);
          }
          this.errors.push(
            rY.create(
              e.parts[0],
              e.sourceSpan,
              `Incomplete @let declaration${r}. @let declarations must be written as \`@let <name> = <value>;\``
            )
          );
        }
        _getContainer() {
          return this._containerStack.length > 0
            ? this._containerStack[this._containerStack.length - 1]
            : null;
        }
        _getClosestElementLikeParent() {
          for (let e = this._containerStack.length - 1; e > -1; e--) {
            let t = this._containerStack[e];
            if (t instanceof rd || t instanceof rv) return t;
          }
          return null;
        }
        _addToParent(e) {
          let t = this._getContainer();
          null === t ? this.rootNodes.push(e) : t.children.push(e);
        }
        _getElementFullName(e, t) {
          return tG(this._getPrefix(e, t), e.parts[1]);
        }
        _getComponentFullName(e, t) {
          let r = e.parts[0],
            n = this._getComponentTagName(e, t);
          return null === n ? r : n.startsWith(':') ? r + n : `${r}:${n}`;
        }
        _getComponentTagName(e, t) {
          let r = this._getPrefix(e, t),
            n = e.parts[2];
          return r || n ? (!r && n ? n : tG(r, n || 'ng-component')) : null;
        }
        _getPrefix(e, t) {
          var r;
          let n, a;
          if (
            (35 === e.type || 39 === e.type || 38 === e.type
              ? ((n = e.parts[1]), (a = e.parts[2]))
              : ((n = e.parts[0]), (a = e.parts[1])),
            !(n =
              n ||
              (null == (r = this._getTagDefinition(a))
                ? void 0
                : r.implicitNamespacePrefix) ||
              '') && t)
          ) {
            let e = t instanceof rd ? t.name : t.tagName;
            if (null !== e) {
              let t = tz(e)[1],
                r = this._getTagDefinition(t);
              null === r || r.preventNamespaceInheritance || (n = tj(e));
            }
          }
          return n;
        }
      };
    function r0(e, t) {
      return e.length > 0 && e[e.length - 1] === t;
    }
    function r1(e, t) {
      return void 0 !== rq[t]
        ? rq[t] || e
        : /^#x[a-f0-9]+$/i.test(t)
          ? String.fromCodePoint(parseInt(t.slice(2), 16))
          : /^#\d+$/.test(t)
            ? String.fromCodePoint(parseInt(t.slice(1), 10))
            : e;
    }
    var r2 = class extends rQ {
      constructor() {
        super(re);
      }
      parse(e, t, r, n = !1, a) {
        return super.parse(e, t, r, n, a);
      }
    };
    function r3(e, t = {}) {
      let {
        canSelfClose: r = !1,
        allowHtmComponentClosingTags: n = !1,
        allowStartTagComments: a = !1,
        isTagNameCaseSensitive: i = !1,
        getTagContentType: s,
        tokenizeAngularBlocks: o = !1,
        tokenizeAngularLetDeclaration: l = !1,
        enableAngularSelectorlessSyntax: c = !1
      } = t;
      return (
        nr ?? (nr = new r2()),
        nr.parse(
          e,
          'angular-html-parser',
          {
            tokenizeExpansionForms: o,
            canSelfClose: r,
            allowHtmComponentClosingTags: n,
            allowStartTagComments: a,
            tokenizeBlocks: o,
            tokenizeLet: l,
            selectorlessEnabled: c
          },
          i,
          s
        )
      );
    }
    var r4 = [
        function (e) {
          e.walk(e => {
            if (
              'element' === e.kind &&
              e.tagDefinition.ignoreFirstLf &&
              e.children.length > 0 &&
              'text' === e.children[0].kind &&
              e.children[0].value[0] ===
                `
`
            ) {
              let t = e.children[0];
              1 === t.value.length
                ? e.removeChild(t)
                : (t.value = t.value.slice(1));
            }
          });
        },
        function (e) {
          let t = e =>
            'element' === e.kind &&
            e.prev?.kind === 'ieConditionalStartComment' &&
            e.prev.sourceSpan.end.offset === e.startSourceSpan.start.offset &&
            e.firstChild?.kind === 'ieConditionalEndComment' &&
            e.firstChild.sourceSpan.start.offset ===
              e.startSourceSpan.end.offset;
          e.walk(e => {
            if (e.children)
              for (let r = 0; r < e.children.length; r++) {
                let n = e.children[r];
                if (!t(n)) continue;
                let a = n.prev,
                  i = n.firstChild;
                (e.removeChild(a), r--);
                let s = new rn(a.sourceSpan.start, i.sourceSpan.end),
                  o = new rn(s.start, n.sourceSpan.end);
                ((n.condition = a.condition),
                  (n.sourceSpan = o),
                  (n.startSourceSpan = s),
                  n.removeChild(i));
              }
          });
        },
        function (e) {
          var t, r;
          return (
            (t = e => 'cdata' === e.kind),
            (r = e => `<![CDATA[${e.value}]]>`),
            void e.walk(e => {
              if (e.children)
                for (let n = 0; n < e.children.length; n++) {
                  let a = e.children[n];
                  if ('text' !== a.kind && !t(a)) continue;
                  'text' !== a.kind && ((a.kind = 'text'), (a.value = r(a)));
                  let i = a.prev;
                  !i ||
                    'text' !== i.kind ||
                    ((i.value += a.value),
                    (i.sourceSpan = new rn(
                      i.sourceSpan.start,
                      a.sourceSpan.end
                    )),
                    e.removeChild(a),
                    n--);
                }
            })
          );
        },
        function (e, t) {
          if ('html' === t.parser) return;
          let r = /\{\{(.+?)\}\}/s;
          e.walk(e => {
            if (e.children && !eC(e, t))
              for (let t of e.children) {
                if ('text' !== t.kind) continue;
                let n = t.sourceSpan.start,
                  a,
                  i = t.value.split(r);
                for (let r = 0; r < i.length; r++, n = a) {
                  let s = i[r];
                  if (r % 2 == 0) {
                    ((a = n.moveBy(s.length)),
                      s.length > 0 &&
                        e.insertChildBefore(t, {
                          kind: 'text',
                          value: s,
                          sourceSpan: new rn(n, a)
                        }));
                    continue;
                  }
                  ((a = n.moveBy(s.length + 4)),
                    e.insertChildBefore(t, {
                      kind: 'interpolation',
                      sourceSpan: new rn(n, a),
                      children:
                        0 === s.length
                          ? []
                          : [
                              {
                                kind: 'text',
                                value: s,
                                sourceSpan: new rn(n.moveBy(2), a.moveBy(-2))
                              }
                            ]
                    }));
                }
                e.removeChild(t);
              }
          });
        },
        function (e, t) {
          e.walk(e => {
            let r = e.$children;
            if (!r) return;
            if (
              0 === r.length ||
              (1 === r.length &&
                'text' === r[0].kind &&
                0 === Y.trim(r[0].value).length)
            ) {
              ((e.hasDanglingSpaces = r.length > 0), (e.$children = []));
              return;
            }
            let n = eC(e, t) || 'interpolation' === e.kind || eT(e),
              a = eT(e);
            if (!n)
              for (let t = 0; t < r.length; t++) {
                let n = r[t];
                if ('text' !== n.kind) continue;
                let {
                    leadingWhitespace: a,
                    text: i,
                    trailingWhitespace: s
                  } = ek(n.value),
                  o = n.prev,
                  l = n.next;
                i
                  ? ((n.value = i),
                    (n.sourceSpan = new rn(
                      n.sourceSpan.start.moveBy(a.length),
                      n.sourceSpan.end.moveBy(-s.length)
                    )),
                    a &&
                      (o && (o.hasTrailingSpaces = !0),
                      (n.hasLeadingSpaces = !0)),
                    s &&
                      ((n.hasTrailingSpaces = !0),
                      l && (l.hasLeadingSpaces = !0)))
                  : (e.removeChild(n),
                    t--,
                    (a || s) &&
                      (o && (o.hasTrailingSpaces = !0),
                      l && (l.hasLeadingSpaces = !0)));
              }
            ((e.isWhitespaceSensitive = n), (e.isIndentationSensitive = a));
          });
        },
        function (e, t) {
          e.walk(e => {
            e.cssDisplay = (function (e, t) {
              if (eO(e, t)) return 'block';
              if (e.prev?.kind === 'comment') {
                let t = e.prev.value.match(/^\s*display:\s*([a-z]+)\s*$/);
                if (t) return t[1];
              }
              let r = !1;
              if ('element' === e.kind && 'svg' === e.namespace)
                if (
                  !(function (e, t) {
                    let r = e;
                    for (; r;) {
                      if (t(r)) return !0;
                      r = r.parent;
                    }
                    return !1;
                  })(e, e => 'svg:foreignObject' === e.fullName)
                )
                  return 'svg' === e.name ? 'inline-block' : 'block';
                else r = !0;
              switch (t.htmlWhitespaceSensitivity) {
                case 'strict':
                  break;
                case 'ignore':
                  return 'block';
                default:
                  if (
                    'element' === e.kind &&
                    (!e.namespace || r || e_(e)) &&
                    er(ef, e.name)
                  )
                    return ef[e.name];
              }
              return 'inline';
            })(e, t);
          });
        },
        function (e) {
          e.walk(e => {
            e.isSelfClosing =
              !e.children ||
              ('element' === e.kind &&
                (e.tagDefinition.isVoid ||
                  (e.endSourceSpan &&
                    e.startSourceSpan.start === e.endSourceSpan.start &&
                    e.startSourceSpan.end === e.endSourceSpan.end)));
          });
        },
        function (e, t) {
          e.walk(e => {
            'element' === e.kind &&
              (e.hasHtmComponentClosingTag =
                e.endSourceSpan &&
                /^<\s*\/\s*\/\s*>$/.test(
                  t.originalText.slice(
                    e.endSourceSpan.start.offset,
                    e.endSourceSpan.end.offset
                  )
                ));
          });
        },
        function (e, t) {
          e.walk(e => {
            let { children: r } = e;
            if (r) {
              var n, a;
              if (0 === r.length) {
                e.isDanglingSpaceSensitive =
                  !eP((n = e.cssDisplay)) && 'inline-block' !== n && !eC(e, t);
                return;
              }
              for (let e of r) {
                ((e.isLeadingSpaceSensitive = (function (e, t) {
                  let r = (function () {
                    var r;
                    return (
                      !ed(e) &&
                      'angularControlFlowBlock' !== e.kind &&
                      ((('text' === e.kind || 'interpolation' === e.kind) &&
                        !!e.prev &&
                        ('text' === e.prev.kind ||
                          'interpolation' === e.prev.kind)) ||
                        (!!e.parent &&
                          'none' !== e.parent.cssDisplay &&
                          (!!eB(e.parent) ||
                            !(
                              (!e.prev &&
                                ('root' === e.parent.kind ||
                                  (eB(e) && e.parent) ||
                                  eC(e.parent, t) ||
                                  eV(e.parent, t) ||
                                  !(
                                    !eP((r = e.parent.cssDisplay)) &&
                                    'inline-block' !== r
                                  ))) ||
                              (e.prev && eP(e.prev.cssDisplay))
                            ))))
                    );
                  })();
                  return r && !e.prev && e.parent?.tagDefinition?.ignoreFirstLf
                    ? 'interpolation' === e.kind
                    : r;
                })(e, t)),
                  (e.isTrailingSpaceSensitive =
                    !ed(e) &&
                    'angularControlFlowBlock' !== e.kind &&
                    ((('text' === e.kind || 'interpolation' === e.kind) &&
                      !!e.next &&
                      ('text' === e.next.kind ||
                        'interpolation' === e.next.kind)) ||
                      (!!e.parent &&
                        'none' !== e.parent.cssDisplay &&
                        (!!eB(e.parent) ||
                          !(
                            (!e.next &&
                              ('root' === e.parent.kind ||
                                (eB(e) && e.parent) ||
                                eC(e.parent, t) ||
                                eV(e.parent, t) ||
                                !(
                                  !eP((a = e.parent.cssDisplay)) &&
                                  'inline-block' !== a
                                ))) ||
                            (e.next && eP(e.next.cssDisplay))
                          ))))));
              }
              for (let e = 0; e < r.length; e++) {
                let t = r[e];
                ((t.isLeadingSpaceSensitive =
                  (0 === e || t.prev.isTrailingSpaceSensitive) &&
                  t.isLeadingSpaceSensitive),
                  (t.isTrailingSpaceSensitive =
                    (e === r.length - 1 || t.next.isLeadingSpaceSensitive) &&
                    t.isTrailingSpaceSensitive));
              }
            }
          });
        },
        function (e) {
          let t = e =>
            'element' === e.kind &&
            0 === e.attrs.length &&
            !eo(e.startTagComments) &&
            1 === e.children.length &&
            'text' === e.firstChild.kind &&
            !Y.hasWhitespaceCharacter(e.children[0].value) &&
            !e.firstChild.hasLeadingSpaces &&
            !e.firstChild.hasTrailingSpaces &&
            e.isLeadingSpaceSensitive &&
            !e.hasLeadingSpaces &&
            e.isTrailingSpaceSensitive &&
            !e.hasTrailingSpaces &&
            e.prev?.kind === 'text' &&
            e.next?.kind === 'text';
          e.walk(e => {
            if (e.children)
              for (let r = 0; r < e.children.length; r++) {
                let n = e.children[r];
                if (!t(n)) continue;
                let a = n.prev,
                  i = n.next;
                ((a.value +=
                  `<${n.rawName}>` +
                  n.firstChild.value +
                  `</${n.rawName}>` +
                  i.value),
                  (a.sourceSpan = new rn(a.sourceSpan.start, i.sourceSpan.end)),
                  (a.isTrailingSpaceSensitive = i.isTrailingSpaceSensitive),
                  (a.hasTrailingSpaces = i.hasTrailingSpaces),
                  e.removeChild(n),
                  r--,
                  e.removeChild(i));
              }
          });
        }
      ],
      r5 = [
        {
          name: 'Angular',
          type: 'markup',
          aceMode: 'html',
          extensions: ['.component.html'],
          tmScope: 'text.html.basic',
          aliases: ['xhtml'],
          codemirrorMode: 'htmlmixed',
          codemirrorMimeType: 'text/html',
          parsers: ['angular'],
          vscodeLanguageIds: ['html'],
          filenames: [],
          linguistLanguageId: 146
        },
        {
          name: 'HTML',
          type: 'markup',
          aceMode: 'html',
          extensions: [
            '.html',
            '.hta',
            '.htm',
            '.html.hl',
            '.inc',
            '.xht',
            '.xhtml'
          ],
          tmScope: 'text.html.basic',
          aliases: ['xhtml'],
          codemirrorMode: 'htmlmixed',
          codemirrorMimeType: 'text/html',
          parsers: ['html'],
          vscodeLanguageIds: ['html'],
          linguistLanguageId: 146
        },
        {
          name: 'Lightning Web Components',
          type: 'markup',
          aceMode: 'html',
          extensions: [],
          tmScope: 'text.html.basic',
          aliases: ['LWC', 'lwc'],
          codemirrorMode: 'htmlmixed',
          codemirrorMimeType: 'text/html',
          parsers: ['lwc'],
          vscodeLanguageIds: ['html'],
          filenames: [],
          linguistLanguageId: 146
        },
        {
          name: 'MJML',
          type: 'markup',
          aceMode: 'html',
          extensions: ['.mjml'],
          tmScope: 'text.mjml.basic',
          aliases: ['MJML', 'mjml'],
          codemirrorMode: 'htmlmixed',
          codemirrorMimeType: 'text/html',
          parsers: ['mjml'],
          filenames: [],
          vscodeLanguageIds: ['mjml'],
          linguistLanguageId: 146
        },
        {
          name: 'Vue',
          type: 'markup',
          aceMode: 'vue',
          extensions: ['.vue'],
          tmScope: 'text.html.vue',
          codemirrorMode: 'vue',
          codemirrorMimeType: 'text/x-vue',
          parsers: ['vue'],
          vscodeLanguageIds: ['vue'],
          linguistLanguageId: 391
        }
      ],
      r6 = 'HTML',
      r9 = {
        bracketSameLine: {
          category: 'Common',
          type: 'boolean',
          default: !1,
          description:
            'Put > of opening tags on the last line instead of on a new line.'
        },
        htmlWhitespaceSensitivity: {
          category: r6,
          type: 'choice',
          default: 'css',
          description: 'How to handle whitespaces in HTML.',
          choices: [
            {
              value: 'css',
              description: 'Respect the default value of CSS display property.'
            },
            {
              value: 'strict',
              description: 'Whitespaces are considered sensitive.'
            },
            {
              value: 'ignore',
              description: 'Whitespaces are considered insensitive.'
            }
          ]
        },
        singleAttributePerLine: {
          category: 'Common',
          type: 'boolean',
          default: !1,
          description: 'Enforce single attribute per line in HTML, Vue and JSX.'
        },
        vueIndentScriptAndStyle: {
          category: r6,
          type: 'boolean',
          default: !1,
          description: 'Indent script and style tags in Vue files.'
        }
      },
      r8 = {};
    s(r8, {
      angular: () => ny,
      html: () => nk,
      lwc: () => nT,
      mjml: () => nw,
      vue: () => nC
    });
    var r7 = {
      canSelfClose: !0,
      normalizeTagName: !1,
      normalizeAttributeName: !1,
      allowHtmComponentClosingTags: !1,
      allowStartTagComments: !1,
      isTagNameCaseSensitive: !1,
      shouldParseFrontMatter: !0
    };
    function ne(e) {
      let {
        canSelfClose: t,
        allowHtmComponentClosingTags: r,
        allowStartTagComments: n,
        isTagNameCaseSensitive: a,
        shouldParseAsRawText: i,
        tokenizeAngularBlocks: s,
        tokenizeAngularLetDeclaration: o
      } = e;
      return {
        canSelfClose: t,
        allowHtmComponentClosingTags: r,
        allowStartTagComments: n,
        isTagNameCaseSensitive: a,
        getTagContentType: i
          ? (...e) => (i(...e) ? tO.RAW_TEXT : void 0)
          : void 0,
        tokenizeAngularBlocks: s,
        tokenizeAngularLetDeclaration: o
      };
    }
    var nt,
      nr,
      nn,
      na,
      ni,
      ns = new Map([
        [
          '*',
          new Set([
            'accesskey',
            'autocapitalize',
            'autocorrect',
            'autofocus',
            'class',
            'contenteditable',
            'dir',
            'draggable',
            'enterkeyhint',
            'exportparts',
            'hidden',
            'id',
            'inert',
            'inputmode',
            'is',
            'itemid',
            'itemprop',
            'itemref',
            'itemscope',
            'itemtype',
            'lang',
            'nonce',
            'part',
            'popover',
            'slot',
            'spellcheck',
            'style',
            'tabindex',
            'title',
            'translate',
            'writingsuggestions'
          ])
        ],
        [
          'a',
          new Set([
            'charset',
            'coords',
            'download',
            'href',
            'hreflang',
            'name',
            'ping',
            'referrerpolicy',
            'rel',
            'rev',
            'shape',
            'target',
            'type'
          ])
        ],
        [
          'applet',
          new Set([
            'align',
            'alt',
            'archive',
            'code',
            'codebase',
            'height',
            'hspace',
            'name',
            'object',
            'vspace',
            'width'
          ])
        ],
        [
          'area',
          new Set([
            'alt',
            'coords',
            'download',
            'href',
            'hreflang',
            'nohref',
            'ping',
            'referrerpolicy',
            'rel',
            'shape',
            'target',
            'type'
          ])
        ],
        [
          'audio',
          new Set([
            'autoplay',
            'controls',
            'crossorigin',
            'loop',
            'muted',
            'preload',
            'src'
          ])
        ],
        ['base', new Set(['href', 'target'])],
        ['basefont', new Set(['color', 'face', 'size'])],
        ['blockquote', new Set(['cite'])],
        [
          'body',
          new Set(['alink', 'background', 'bgcolor', 'link', 'text', 'vlink'])
        ],
        ['br', new Set(['clear'])],
        [
          'button',
          new Set([
            'command',
            'commandfor',
            'disabled',
            'form',
            'formaction',
            'formenctype',
            'formmethod',
            'formnovalidate',
            'formtarget',
            'name',
            'popovertarget',
            'popovertargetaction',
            'type',
            'value'
          ])
        ],
        ['canvas', new Set(['height', 'width'])],
        ['caption', new Set(['align'])],
        [
          'col',
          new Set(['align', 'char', 'charoff', 'span', 'valign', 'width'])
        ],
        [
          'colgroup',
          new Set(['align', 'char', 'charoff', 'span', 'valign', 'width'])
        ],
        ['data', new Set(['value'])],
        ['del', new Set(['cite', 'datetime'])],
        ['details', new Set(['name', 'open'])],
        ['dialog', new Set(['closedby', 'open'])],
        ['dir', new Set(['compact'])],
        ['div', new Set(['align'])],
        ['dl', new Set(['compact'])],
        ['embed', new Set(['height', 'src', 'type', 'width'])],
        ['fieldset', new Set(['disabled', 'form', 'name'])],
        ['font', new Set(['color', 'face', 'size'])],
        [
          'form',
          new Set([
            'accept',
            'accept-charset',
            'action',
            'autocomplete',
            'enctype',
            'method',
            'name',
            'novalidate',
            'target'
          ])
        ],
        [
          'frame',
          new Set([
            'frameborder',
            'longdesc',
            'marginheight',
            'marginwidth',
            'name',
            'noresize',
            'scrolling',
            'src'
          ])
        ],
        ['frameset', new Set(['cols', 'rows'])],
        ['h1', new Set(['align'])],
        ['h2', new Set(['align'])],
        ['h3', new Set(['align'])],
        ['h4', new Set(['align'])],
        ['h5', new Set(['align'])],
        ['h6', new Set(['align'])],
        ['head', new Set(['profile'])],
        ['hr', new Set(['align', 'noshade', 'size', 'width'])],
        ['html', new Set(['manifest', 'version'])],
        [
          'iframe',
          new Set([
            'align',
            'allow',
            'allowfullscreen',
            'allowpaymentrequest',
            'allowusermedia',
            'frameborder',
            'height',
            'loading',
            'longdesc',
            'marginheight',
            'marginwidth',
            'name',
            'referrerpolicy',
            'sandbox',
            'scrolling',
            'src',
            'srcdoc',
            'width'
          ])
        ],
        [
          'img',
          new Set([
            'align',
            'alt',
            'border',
            'crossorigin',
            'decoding',
            'fetchpriority',
            'height',
            'hspace',
            'ismap',
            'loading',
            'longdesc',
            'name',
            'referrerpolicy',
            'sizes',
            'src',
            'srcset',
            'usemap',
            'vspace',
            'width'
          ])
        ],
        [
          'input',
          new Set([
            'accept',
            'align',
            'alpha',
            'alt',
            'autocomplete',
            'checked',
            'colorspace',
            'dirname',
            'disabled',
            'form',
            'formaction',
            'formenctype',
            'formmethod',
            'formnovalidate',
            'formtarget',
            'height',
            'ismap',
            'list',
            'max',
            'maxlength',
            'min',
            'minlength',
            'multiple',
            'name',
            'pattern',
            'placeholder',
            'popovertarget',
            'popovertargetaction',
            'readonly',
            'required',
            'size',
            'src',
            'step',
            'type',
            'usemap',
            'value',
            'width'
          ])
        ],
        ['ins', new Set(['cite', 'datetime'])],
        ['isindex', new Set(['prompt'])],
        ['label', new Set(['for', 'form'])],
        ['legend', new Set(['align'])],
        ['li', new Set(['type', 'value'])],
        [
          'link',
          new Set([
            'as',
            'blocking',
            'charset',
            'color',
            'crossorigin',
            'disabled',
            'fetchpriority',
            'href',
            'hreflang',
            'imagesizes',
            'imagesrcset',
            'integrity',
            'media',
            'referrerpolicy',
            'rel',
            'rev',
            'sizes',
            'target',
            'type'
          ])
        ],
        ['map', new Set(['name'])],
        ['menu', new Set(['compact'])],
        [
          'meta',
          new Set([
            'charset',
            'content',
            'http-equiv',
            'media',
            'name',
            'scheme'
          ])
        ],
        ['meter', new Set(['high', 'low', 'max', 'min', 'optimum', 'value'])],
        [
          'object',
          new Set([
            'align',
            'archive',
            'border',
            'classid',
            'codebase',
            'codetype',
            'data',
            'declare',
            'form',
            'height',
            'hspace',
            'name',
            'standby',
            'type',
            'typemustmatch',
            'usemap',
            'vspace',
            'width'
          ])
        ],
        ['ol', new Set(['compact', 'reversed', 'start', 'type'])],
        ['optgroup', new Set(['disabled', 'label'])],
        ['option', new Set(['disabled', 'label', 'selected', 'value'])],
        ['output', new Set(['for', 'form', 'name'])],
        ['p', new Set(['align'])],
        ['param', new Set(['name', 'type', 'value', 'valuetype'])],
        ['pre', new Set(['width'])],
        ['progress', new Set(['max', 'value'])],
        ['q', new Set(['cite'])],
        [
          'script',
          new Set([
            'async',
            'blocking',
            'charset',
            'crossorigin',
            'defer',
            'fetchpriority',
            'integrity',
            'language',
            'nomodule',
            'referrerpolicy',
            'src',
            'type'
          ])
        ],
        [
          'select',
          new Set([
            'autocomplete',
            'disabled',
            'form',
            'multiple',
            'name',
            'required',
            'size'
          ])
        ],
        ['slot', new Set(['name'])],
        [
          'source',
          new Set([
            'height',
            'media',
            'sizes',
            'src',
            'srcset',
            'type',
            'width'
          ])
        ],
        ['style', new Set(['blocking', 'media', 'type'])],
        [
          'table',
          new Set([
            'align',
            'bgcolor',
            'border',
            'cellpadding',
            'cellspacing',
            'frame',
            'rules',
            'summary',
            'width'
          ])
        ],
        ['tbody', new Set(['align', 'char', 'charoff', 'valign'])],
        [
          'td',
          new Set([
            'abbr',
            'align',
            'axis',
            'bgcolor',
            'char',
            'charoff',
            'colspan',
            'headers',
            'height',
            'nowrap',
            'rowspan',
            'scope',
            'valign',
            'width'
          ])
        ],
        [
          'template',
          new Set([
            'shadowrootclonable',
            'shadowrootcustomelementregistry',
            'shadowrootdelegatesfocus',
            'shadowrootmode',
            'shadowrootserializable'
          ])
        ],
        [
          'textarea',
          new Set([
            'autocomplete',
            'cols',
            'dirname',
            'disabled',
            'form',
            'maxlength',
            'minlength',
            'name',
            'placeholder',
            'readonly',
            'required',
            'rows',
            'wrap'
          ])
        ],
        ['tfoot', new Set(['align', 'char', 'charoff', 'valign'])],
        [
          'th',
          new Set([
            'abbr',
            'align',
            'axis',
            'bgcolor',
            'char',
            'charoff',
            'colspan',
            'headers',
            'height',
            'nowrap',
            'rowspan',
            'scope',
            'valign',
            'width'
          ])
        ],
        ['thead', new Set(['align', 'char', 'charoff', 'valign'])],
        ['time', new Set(['datetime'])],
        ['tr', new Set(['align', 'bgcolor', 'char', 'charoff', 'valign'])],
        ['track', new Set(['default', 'kind', 'label', 'src', 'srclang'])],
        ['ul', new Set(['compact', 'type'])],
        [
          'video',
          new Set([
            'autoplay',
            'controls',
            'crossorigin',
            'height',
            'loop',
            'muted',
            'playsinline',
            'poster',
            'preload',
            'src',
            'width'
          ])
        ]
      ]),
      no = new Set([
        'a',
        'abbr',
        'acronym',
        'address',
        'applet',
        'area',
        'article',
        'aside',
        'audio',
        'b',
        'base',
        'basefont',
        'bdi',
        'bdo',
        'bgsound',
        'big',
        'blink',
        'blockquote',
        'body',
        'br',
        'button',
        'canvas',
        'caption',
        'center',
        'cite',
        'code',
        'col',
        'colgroup',
        'command',
        'content',
        'data',
        'datalist',
        'dd',
        'del',
        'details',
        'dfn',
        'dialog',
        'dir',
        'div',
        'dl',
        'dt',
        'em',
        'embed',
        'fencedframe',
        'fieldset',
        'figcaption',
        'figure',
        'font',
        'footer',
        'form',
        'frame',
        'frameset',
        'geolocation',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'head',
        'header',
        'hgroup',
        'hr',
        'html',
        'i',
        'iframe',
        'image',
        'img',
        'input',
        'ins',
        'isindex',
        'kbd',
        'keygen',
        'label',
        'legend',
        'li',
        'link',
        'listing',
        'main',
        'map',
        'mark',
        'marquee',
        'math',
        'menu',
        'menuitem',
        'meta',
        'meter',
        'multicol',
        'nav',
        'nextid',
        'nobr',
        'noembed',
        'noframes',
        'noscript',
        'object',
        'ol',
        'optgroup',
        'option',
        'output',
        'p',
        'param',
        'picture',
        'plaintext',
        'pre',
        'progress',
        'q',
        'rb',
        'rbc',
        'rp',
        'rt',
        'rtc',
        'ruby',
        's',
        'samp',
        'script',
        'search',
        'section',
        'select',
        'selectedcontent',
        'shadow',
        'slot',
        'small',
        'source',
        'spacer',
        'span',
        'strike',
        'strong',
        'style',
        'sub',
        'summary',
        'sup',
        'svg',
        'table',
        'tbody',
        'td',
        'template',
        'textarea',
        'tfoot',
        'th',
        'thead',
        'time',
        'title',
        'tr',
        'track',
        'tt',
        'u',
        'ul',
        'var',
        'video',
        'wbr',
        'xmp'
      ]),
      nl = { attrs: !0, children: !0, cases: !0, expression: !0 },
      nc = new Set(['parent']),
      nu = class Me {
        constructor(e = {}) {
          let t;
          for (let r of ((t = nn).has(this)
            ? i('Cannot add the same private member more than once')
            : t instanceof WeakSet
              ? t.add(this)
              : t.set(this, void 0),
          o(this, 'kind'),
          o(this, 'parent'),
          new Set([...nc, ...Object.keys(e)])))
            this.setProperty(r, e[r]);
          if (ed(e))
            for (let t of Object.getOwnPropertySymbols(e))
              this.setProperty(t, e[t]);
        }
        setProperty(e, t) {
          if (this[e] !== t) {
            if (
              (e in nl && (t = t.map(e => this.createChild(e))), !nc.has(e))
            ) {
              this[e] = t;
              return;
            }
            Object.defineProperty(this, e, {
              value: t,
              enumerable: !1,
              configurable: !0
            });
          }
        }
        map(e) {
          let t;
          for (let r in nl) {
            let n = this[r];
            if (n) {
              let a = (function (e, t) {
                let r = e.map(t);
                return r.some((t, r) => t !== e[r]) ? r : e;
              })(n, t => t.map(e));
              t !== n &&
                (t ?? (t = new Me({ parent: this.parent })),
                t.setProperty(r, a));
            }
          }
          if (t) for (let e in this) e in nl || (t[e] = this[e]);
          return e(t || this);
        }
        walk(e) {
          for (let t in nl) {
            let r = this[t];
            if (r) for (let t = 0; t < r.length; t++) r[t].walk(e);
          }
          e(this);
        }
        createChild(e) {
          let t = e instanceof Me ? e.clone() : new Me(e);
          return (t.setProperty('parent', this), t);
        }
        insertChildBefore(e, t) {
          let r = this.$children;
          r.splice(r.indexOf(e), 0, this.createChild(t));
        }
        removeChild(e) {
          let t = this.$children;
          t.splice(t.indexOf(e), 1);
        }
        replaceChild(e, t) {
          let r = this.$children;
          r[r.indexOf(e)] = this.createChild(t);
        }
        clone() {
          return new Me(this);
        }
        get $children() {
          return this[l(this, nn, na)];
        }
        set $children(e) {
          this[l(this, nn, na)] = e;
        }
        get firstChild() {
          return this.$children?.[0];
        }
        get lastChild() {
          return m(1, this.$children, -1);
        }
        get prev() {
          let e = l(this, nn, ni);
          return e[e.indexOf(this) - 1];
        }
        get next() {
          let e = l(this, nn, ni);
          return e[e.indexOf(this) + 1];
        }
        get rawName() {
          return this.hasExplicitNamespace ? this.fullName : this.name;
        }
        get fullName() {
          return this.namespace ? this.namespace + ':' + this.name : this.name;
        }
        get attrMap() {
          return Object.fromEntries(this.attrs.map(e => [e.fullName, e.value]));
        }
      };
    ((nn = new WeakSet()),
      (na = function () {
        return 'angularIcuCase' === this.kind
          ? 'expression'
          : 'angularIcuExpression' === this.kind
            ? 'cases'
            : 'children';
      }),
      (ni = function () {
        return this.parent?.$children ?? [];
      }));
    var np = [
        {
          regex:
            /^(?<openingTagSuffix>\[if(?<condition>[^\]]*)\]>)(?<data>.*?)<!\s*\[endif\]$/s,
          parse: function (e, t, r) {
            let { openingTagSuffix: n, condition: a, data: i } = t.groups,
              s = 4 + n.length,
              o = e.sourceSpan.start.moveBy(s),
              l = o.moveBy(i.length),
              [c, u] = (() => {
                try {
                  return [!0, r(i, o).children];
                } catch {
                  return [
                    !1,
                    [{ kind: 'text', value: i, sourceSpan: new rn(o, l) }]
                  ];
                }
              })();
            return {
              kind: 'ieConditionalComment',
              complete: c,
              children: u,
              condition: h(0, a.trim(), /\s+/g, ' '),
              sourceSpan: e.sourceSpan,
              startSourceSpan: new rn(e.sourceSpan.start, o),
              endSourceSpan: new rn(l, e.sourceSpan.end)
            };
          }
        },
        {
          regex: /^\[if(?<condition>[^\]]*)\]><!$/,
          parse: function (e, t) {
            let { condition: r } = t.groups;
            return {
              kind: 'ieConditionalStartComment',
              condition: h(0, r.trim(), /\s+/g, ' '),
              sourceSpan: e.sourceSpan
            };
          }
        },
        {
          regex: /^<!\s*\[endif\]$/,
          parse: function (e) {
            return {
              kind: 'ieConditionalEndComment',
              sourceSpan: e.sourceSpan
            };
          }
        }
      ],
      nh = class extends rw {
        visitExpansionCase(e, t) {
          'angular' === t.parseOptions.name &&
            this.visitChildren(t, t => {
              t(e.expression);
            });
        }
        visit(e, { parseOptions: t }) {
          var r;
          ((function (e) {
            switch (e.kind) {
              case 'element':
                for (let t of (nm(e), e.attrs))
                  (nm(t),
                    t.valueSpan
                      ? ((t.value = t.valueSpan.toString()),
                        /["']/.test(t.value[0]) &&
                          (t.value = t.value.slice(1, -1)))
                      : (t.value = null));
                break;
              case 'comment':
                e.value = e.sourceSpan.toString().slice(4, -3);
                break;
              case 'text':
                e.value = e.sourceSpan.toString();
            }
          })(e),
            (function (e, t) {
              if ('element' === e.kind) {
                let r = re(
                  t.isTagNameCaseSensitive ? e.name : e.name.toLowerCase()
                );
                !e.namespace ||
                e.namespace === r.implicitNamespacePrefix ||
                e_(e)
                  ? (e.tagDefinition = r)
                  : (e.tagDefinition = re(''));
              }
            })(e, t),
            (function (e, t) {
              if (
                'element' === e.kind &&
                (t.normalizeTagName &&
                  (!e.namespace ||
                    e.namespace === e.tagDefinition.implicitNamespacePrefix ||
                    e_(e)) &&
                  (e.name = nd(e.name, e => no.has(e))),
                t.normalizeAttributeName)
              )
                for (let t of e.attrs)
                  t.namespace ||
                    (t.name = nd(
                      t.name,
                      t =>
                        ns.has(e.name) &&
                        (ns.get('*').has(t) || ns.get(e.name).has(t))
                    ));
            })(e, t),
            (r = e).sourceSpan &&
              r.endSourceSpan &&
              (r.sourceSpan = new rn(r.sourceSpan.start, r.endSourceSpan.end)));
        }
      };
    function nd(e, t) {
      let r = e.toLowerCase();
      return t(r) ? r : e;
    }
    function nm(e) {
      let t = e.name.startsWith(':') ? e.name.slice(1).split(':', 1)[0] : null,
        r = e.nameSpan.toString(),
        n = null !== t && r.startsWith(`${t}:`);
      ((e.name = n ? r.slice(t.length + 1) : r),
        (e.namespace = t),
        (e.hasExplicitNamespace = n));
    }
    function ng(e, t) {
      let { rootNodes: r, errors: n } = r3(e, ne(t));
      return (n.length > 0 && nv(n[0]), { parseOptions: t, rootNodes: r });
    }
    function nf(e, t) {
      let r = ne(t),
        { rootNodes: n, errors: a } = r3(e, r);
      if (
        n.some(
          e =>
            ('docType' === e.kind && 'html' === e.value) ||
            ('element' === e.kind && 'html' === e.name.toLowerCase())
        )
      )
        return ng(e, n_);
      let i,
        s = () => i ?? (i = r3(e, { ...r, getTagContentType: void 0 })),
        o = e => {
          let { offset: t } = e.startSourceSpan.start;
          return (
            s().rootNodes.find(
              e => 'element' === e.kind && e.startSourceSpan.start.offset === t
            ) ?? e
          );
        };
      for (let [e, t] of n.entries())
        if ('element' === t.kind) {
          if (t.isVoid) ((a = s().errors), (n[e] = o(t)));
          else if (
            (function (e) {
              if ('element' !== e.kind || 'template' !== e.name) return !1;
              let t = e.attrs.find(e => 'lang' === e.name)?.value;
              return !t || 'html' === t;
            })(t)
          ) {
            let { endSourceSpan: r, startSourceSpan: a } = t,
              i = s().errors.find(
                e =>
                  e.span.start.offset > a.start.offset &&
                  e.span.start.offset < r.end.offset
              );
            (i && nv(i), (n[e] = o(t)));
          }
        }
      return (a.length > 0 && nv(a[0]), { parseOptions: t, rootNodes: n });
    }
    function nv(e) {
      var t;
      let {
        msg: r,
        span: { start: n, end: a }
      } = e;
      throw Object.assign(
        SyntaxError(
          r +
            ' (' +
            (t = {
              loc: {
                start: { line: n.line + 1, column: n.col + 1 },
                end: { line: a.line + 1, column: a.col + 1 }
              },
              cause: e
            }).loc.start.line +
            ':' +
            t.loc.start.column +
            ')'
        ),
        t
      );
    }
    var n_ =
      ((n = {
        name: 'html',
        normalizeTagName: !0,
        normalizeAttributeName: !0,
        allowHtmComponentClosingTags: !0
      }),
      { ...r7, ...n });
    function nS(e) {
      let t = { ...r7, ...e },
        r = 'vue' === t.name ? nf : ng;
      return {
        parse: (e, n) =>
          (function e(t, r, n, a = {}) {
            var i, s;
            let o,
              l,
              { frontMatter: c, content: u } = n.shouldParseFrontMatter
                ? eg(t)
                : { content: t },
              p = new rr(t, a.filepath),
              d = new rt(p, 0, 0, 0),
              g = d.moveBy(t.length),
              { parseOptions: f, rootNodes: v } = r(u, n),
              _ = { kind: 'root', sourceSpan: new rn(d, g), children: v },
              S;
            if (c) {
              let [e, t] = [c.start, c.end].map(
                e => new rt(p, e.index, e.line - 1, e.column)
              );
              S = { ...c, kind: 'frontMatter', sourceSpan: new rn(e, t) };
            }
            return (
              (i = S),
              (s = (n, i) =>
                (function (t, r, n, a, i, s) {
                  let { offset: o } = a,
                    l = e(
                      em(r.slice(0, o)) + n,
                      t,
                      { ...i, shouldParseFrontMatter: !1 },
                      s
                    );
                  l.sourceSpan = new rn(a, m(0, l.children, -1).sourceSpan.end);
                  let c = l.children[0];
                  return (
                    c.length === o
                      ? l.children.shift()
                      : ((c.sourceSpan = new rn(
                          c.sourceSpan.start.moveBy(o),
                          c.sourceSpan.end
                        )),
                        (c.value = c.value.slice(o))),
                    l
                  );
                })(r, t, n, i, f, a)),
              (o = 'angular' === f.name),
              rb(new nh(), _.children, { parseOptions: f }),
              i && _.children.unshift(i),
              (l = new nu(_)).walk(e => {
                var t, r;
                if ('comment' === e.kind) {
                  let t = (function (e, t) {
                    if (e.value)
                      for (let { regex: r, parse: n } of np) {
                        let a = e.value.match(r);
                        if (a) return n(e, a, t);
                      }
                    return null;
                  })(e, s);
                  t && e.parent.replaceChild(e, t);
                } else
                  o &&
                    'element' === e.kind &&
                    e.comments &&
                    ((e.startTagComments = e.comments), delete e.comments);
                o &&
                  ((function (e) {
                    if ('block' === e.kind) {
                      if (
                        ((e.name = h(
                          0,
                          e.name.toLowerCase(),
                          /\s+/g,
                          ' '
                        ).trim()),
                        (e.kind = 'angularControlFlowBlock'),
                        !eo(e.parameters))
                      )
                        return delete e.parameters;
                      for (let t of e.parameters)
                        t.kind = 'angularControlFlowBlockParameter';
                      e.parameters = {
                        kind: 'angularControlFlowBlockParameters',
                        children: e.parameters,
                        sourceSpan: new rn(
                          e.parameters[0].sourceSpan.start,
                          m(0, e.parameters, -1).sourceSpan.end
                        )
                      };
                    }
                  })(e),
                  'letDeclaration' === (t = e).kind &&
                    ((t.kind = 'angularLetDeclaration'),
                    (t.id = t.name),
                    (t.init = {
                      kind: 'angularLetDeclarationInitializer',
                      sourceSpan: new rn(t.valueSpan.start, t.valueSpan.end),
                      value: t.value
                    }),
                    delete t.name,
                    delete t.value),
                  'expansion' === (r = e).kind &&
                    (r.kind = 'angularIcuExpression'),
                  'expansionCase' === r.kind && (r.kind = 'angularIcuCase'));
              }),
              l
            );
          })(e, r, t, n),
        hasPragma: tP,
        hasIgnorePragma: tB,
        astFormat: 'html',
        locStart: ti,
        locEnd: ts
      };
    }
    var nk = nS(n_),
      nb = new Set(['mj-style', 'mj-raw']),
      nw = nS({ ...n_, name: 'mjml', shouldParseAsRawText: e => nb.has(e) }),
      ny = nS({
        name: 'angular',
        tokenizeAngularBlocks: !0,
        tokenizeAngularLetDeclaration: !0,
        allowStartTagComments: !0
      }),
      nC = nS({
        name: 'vue',
        isTagNameCaseSensitive: !0,
        shouldParseAsRawText: (e, t, r, n) =>
          'html' !== e.toLowerCase() &&
          !r &&
          ('template' !== e ||
            n.some(
              ({ name: e, value: t }) =>
                'lang' === e && 'html' !== t && '' !== t && void 0 !== t
            ))
      }),
      nT = nS({ name: 'lwc', canSelfClose: !1 }),
      nx = {
        html: {
          features: {
            experimental_frontMatterSupport: {
              massageAstNode: !0,
              embed: !0,
              print: !0
            }
          },
          preprocess: function (e, t) {
            for (let r of r4) r(e, t);
            return e;
          },
          print: function (e, t, r) {
            let { node: n } = e;
            switch (n.kind) {
              case 'root':
                return (
                  t.__onHtmlRoot && t.__onHtmlRoot(n),
                  [U(tU(e, t, r)), W]
                );
              case 'element':
              case 'ieConditionalComment':
                return (function (e, t, r) {
                  var n, a;
                  let { node: i } = e;
                  if (eb(i, t))
                    return [
                      tk(i, t),
                      U(t_(e, t, r)),
                      B(tC(i, t)),
                      ...to(i, t),
                      tc(i, t)
                    ];
                  let s =
                      1 === i.children.length &&
                      ('interpolation' === i.firstChild.kind ||
                        'angularIcuExpression' === i.firstChild.kind) &&
                      i.firstChild.isLeadingSpaceSensitive &&
                      !i.firstChild.hasLeadingSpaces &&
                      i.lastChild.isTrailingSpaceSensitive &&
                      !i.lastChild.hasTrailingSpaces,
                    o = Symbol('element-attr-group-id'),
                    l = n => U([U(t_(e, t, r), { id: o }), n, to(i, t)]);
                  return 0 === i.children.length
                    ? l(
                        i.hasDanglingSpaces && i.isDanglingSpaceSensitive
                          ? z
                          : ''
                      )
                    : l([
                        eE(i) ||
                        ('element' === i.kind &&
                          i.children.length > 0 &&
                          (['body', 'script', 'style'].includes(i.name) ||
                            i.children.some(e => {
                              var t;
                              return (
                                (t = e),
                                t.children?.some(e => 'text' !== e.kind)
                              );
                            }))) ||
                        (i.firstChild &&
                          i.firstChild === i.lastChild &&
                          'text' !== i.firstChild.kind &&
                          eq(i.firstChild) &&
                          (!i.lastChild.isTrailingSpaceSensitive ||
                            eN(i.lastChild)))
                          ? R
                          : '',
                        ((n = [
                          (() =>
                            s
                              ? V($, '', { groupId: o })
                              : i.firstChild.hasLeadingSpaces &&
                                  i.firstChild.isLeadingSpaceSensitive
                                ? z
                                : 'text' === i.firstChild.kind &&
                                    i.isWhitespaceSensitive &&
                                    i.isIndentationSensitive
                                  ? (g(),
                                    g(),
                                    { type: k, contents: $, n: -1 / 0 })
                                  : $)(),
                          tU(e, t, r)
                        ]),
                        s
                          ? ((a = { groupId: o }),
                            g(),
                            {
                              type: T,
                              contents: n,
                              groupId: a.groupId,
                              negate: a.negate
                            })
                          : (eC(i, t) || eV(i, t)) &&
                              'root' === i.parent.kind &&
                              'vue' === t.parser &&
                              !t.vueIndentScriptAndStyle
                            ? n
                            : H(n)),
                        (i.next ? td(i.next) : tm(i.parent))
                          ? i.lastChild.hasTrailingSpaces &&
                            i.lastChild.isTrailingSpaceSensitive
                            ? ' '
                            : ''
                          : eB(i) && tg(i.lastChild)
                            ? ''
                            : s
                              ? V($, '', { groupId: o })
                              : i.lastChild.hasTrailingSpaces &&
                                  i.lastChild.isTrailingSpaceSensitive
                                ? z
                                : ('comment' === i.lastChild.kind ||
                                      ('text' === i.lastChild.kind &&
                                        i.isWhitespaceSensitive &&
                                        i.isIndentationSensitive)) &&
                                    RegExp(
                                      `\\n[\\t ]{${t.tabWidth * (e.ancestors.length - 1)}}$`
                                    ).test(i.lastChild.value)
                                  ? ''
                                  : $
                      ]);
                })(e, t, r);
              case 'angularControlFlowBlock':
                return (function (e, t, r) {
                  let n,
                    { node: a } = e,
                    i = [];
                  ((function (e) {
                    let { previous: t } = e;
                    return (
                      t?.kind === 'angularControlFlowBlock' && !ew(t) && !tV(t)
                    );
                  })(e) && i.push('} '),
                    i.push('@', a.name));
                  let s =
                    ((n = a),
                    n?.kind === 'angularControlFlowBlock' &&
                      'default never' === n.name);
                  if (
                    (a.parameters &&
                      (s || i.push(' '), i.push('(', U(r('parameters')), ')')),
                    s)
                  )
                    return (i.push(';'), i);
                  if (
                    !(function (e) {
                      return (
                        e?.kind === 'angularControlFlowBlock' &&
                        ('case' === e.name || 'default' === e.name) &&
                        e.endSourceSpan &&
                        e.endSourceSpan.start.offset ===
                          e.endSourceSpan.end.offset
                      );
                    })(a)
                  ) {
                    i.push(' {');
                    let n = tV(a);
                    a.children.length > 0
                      ? ((a.firstChild.hasLeadingSpaces = !0),
                        (a.lastChild.hasTrailingSpaces = !0),
                        i.push(H([W, tU(e, t, r)])),
                        n && i.push(W, '}'))
                      : n && i.push('}');
                  }
                  return U(i, { shouldBreak: !0 });
                })(e, t, r);
              case 'angularControlFlowBlockParameters':
                return [H([$, O([';', z], e.map(r, 'children'))]), $];
              case 'angularControlFlowBlockParameter':
                return Y.trim(n.expression);
              case 'angularLetDeclaration':
                return U(['@let ', U([n.id, ' =', U(H([z, r('init')]))]), ';']);
              case 'angularLetDeclarationInitializer':
                return n.value;
              case 'angularIcuExpression':
                return (function (e, t, r) {
                  let { node: n } = e;
                  return [
                    tS(n, t),
                    U([
                      n.switchValue.trim(),
                      ', ',
                      n.type,
                      n.cases.length > 0
                        ? [',', H([z, O(z, e.map(r, 'cases'))])]
                        : '',
                      $
                    ]),
                    tl(n, t)
                  ];
                })(e, t, r);
              case 'angularIcuCase':
                return (function (e, t) {
                  let { node: r } = e;
                  return [
                    r.value,
                    ' {',
                    U([
                      H([
                        $,
                        e.map(({ node: e, isLast: r }) => {
                          let n = [t()];
                          return (
                            'text' === e.kind &&
                              (e.hasLeadingSpaces && n.unshift(z),
                              e.hasTrailingSpaces && !r && n.push(z)),
                            n
                          );
                        }, 'expression')
                      ]),
                      $
                    ]),
                    '}'
                  ];
                })(e, r);
              case 'ieConditionalStartComment':
              case 'ieConditionalEndComment':
                return [tS(n), tl(n)];
              case 'interpolation':
                return [tS(n, t), ...e.map(r, 'children'), tl(n, t)];
              case 'text': {
                if ('interpolation' === n.parent.kind) {
                  let e = /\n[^\S\n]*$/,
                    t = e.test(n.value);
                  return [B(t ? n.value.replace(e, '') : n.value), t ? W : ''];
                }
                let e = tk(n, t),
                  r = e$(n),
                  a = tc(n, t);
                return ((r[0] = [e, r[0]]), r.push([r.pop(), a]), F(r));
              }
              case 'docType':
                return [
                  U([
                    tS(n, t),
                    ' ',
                    h(0, n.value.replace(/^html\b/i, 'html'), /\s+/g, ' ')
                  ]),
                  tl(n, t)
                ];
              case 'comment':
                return [
                  tk(n, t),
                  B(t.originalText.slice(ti(n), ts(n))),
                  tc(n, t)
                ];
              case 'attribute': {
                if (null === n.value) return n.rawName;
                let e = eR(n.value),
                  r = ej(n, t)
                    ? ''
                    : (function (e) {
                        let { preferred: t, alternate: r } = J,
                          { length: n } = e,
                          a = 0,
                          i = 0;
                        for (let s = 0; s < n; s++) {
                          let n = e.charCodeAt(s);
                          n === t.codePoint ? a++ : n === r.codePoint && i++;
                        }
                        return (a > i ? r : t).character;
                      })(e);
                return [
                  n.rawName,
                  '=',
                  r,
                  B(
                    '"' === r ? h(0, e, '"', '&quot;') : h(0, e, "'", '&apos;')
                  ),
                  r
                ];
              }
              case 'startTagComment':
                return (function (e) {
                  let {
                    node: { value: t, type: r }
                  } = e;
                  return 'single' === r
                    ? `//${t.trimEnd()}`
                    : ['/*', B(t), '*/'];
                })(e);
              default:
                throw new Z(n, 'HTML');
            }
          },
          insertPragma: e => `<!-- @format -->

${e}`,
          massageAstNode: tD,
          embed: function (e, t) {
            let { node: r } = e;
            switch (r.kind) {
              case 'element':
                if (eC(r, t) || 'interpolation' === r.kind) return;
                if (!r.isSelfClosing && ez(r, t)) {
                  let n = eM(r, t);
                  return n
                    ? async (a, i) => {
                        let s = tC(r, t),
                          o = /^\s*$/.test(s),
                          l = '';
                        return (
                          o ||
                            (o =
                              '' ===
                              (l = await a(eS(s), {
                                parser: n,
                                __embeddedInHtml: !0
                              }))),
                          [
                            tk(r, t),
                            U(t_(e, t, i)),
                            o ? '' : W,
                            l,
                            o ? '' : W,
                            to(r, t),
                            tc(r, t)
                          ]
                        );
                      }
                    : void 0;
                }
                break;
              case 'text':
                if (eC(r.parent, t)) {
                  let e = eM(r.parent, t);
                  if (e)
                    return async n => {
                      let a =
                          'markdown' === e
                            ? Y.dedentString(r.value.replace(/^[^\S\n]*\n/, ''))
                            : r.value,
                        i = { parser: e, __embeddedInHtml: !0 };
                      if ('html' === t.parser && 'babel' === e) {
                        let e = 'script',
                          { attrMap: t } = r.parent;
                        (t &&
                          ('module' === t.type ||
                            (('text/babel' === t.type ||
                              'text/jsx' === t.type) &&
                              'module' === t['data-type'])) &&
                          (e = 'module'),
                          (i.__babelSourceType = e));
                      }
                      return [R, tk(r, t), await n(a, i), tc(r, t)];
                    };
                } else if ('interpolation' === r.parent.kind)
                  return async n => {
                    let a = {
                      __isInHtmlInterpolation: !0,
                      __embeddedInHtml: !0
                    };
                    return (
                      'angular' === t.parser
                        ? (a.parser = '__ng_interpolation')
                        : 'vue' === t.parser
                          ? (a.parser = tt(e, t)
                              ? '__vue_ts_expression'
                              : '__vue_expression')
                          : (a.parser = '__js_expression'),
                      [
                        H([z, await n(r.value, a)]),
                        r.parent.next && td(r.parent.next) ? ' ' : z
                      ]
                    );
                  };
                break;
              case 'attribute':
                return ta(e, t);
              case 'angularControlFlowBlockParameters':
                return tT.has(e.parent.name) ? et : void 0;
              case 'angularLetDeclarationInitializer':
                return e =>
                  ee(r.value, e, {
                    parser: '__ng_binding',
                    __isInHtmlAttribute: !1
                  });
            }
          },
          getVisitorKeys: tq
        }
      };
    r.d(t, {
      default: () => c,
      languages: () => r5,
      options: () => r9,
      parsers: () => r8,
      printers: () => nx
    });
  }
};
//# sourceMappingURL=6375.053f587dc69c9469.js.map
