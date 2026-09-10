export const __rspack_esm_id = 4517;
export const __rspack_esm_ids = [4517];
export const __webpack_modules__ = {
  33220(e, r, s) {
    s.r(r);
    var n = Object.create,
      o = Object.defineProperty,
      i = Object.getOwnPropertyDescriptor,
      a = Object.getOwnPropertyNames,
      u = Object.getPrototypeOf,
      l = Object.prototype.hasOwnProperty,
      c = (e, r) => () => {
        try {
          return (r || e((r = { exports: {} }).exports, r), r.exports);
        } catch (e) {
          throw ((r = 0), e);
        }
      },
      p = (e, r) => {
        for (var s in r) o(e, s, { get: r[s], enumerable: !0 });
      },
      h = (e, r, s) => (
        (s = null != e ? n(u(e)) : {}),
        ((e, r, s) => {
          if ((r && 'object' == typeof r) || 'function' == typeof r)
            for (let n of a(r))
              l.call(e, n) ||
                void 0 === n ||
                o(e, n, {
                  get: () => r[n],
                  enumerable: !(s = i(r, n)) || s.enumerable
                });
          return e;
        })(
          !r && e && e.__esModule
            ? s
            : o(s, 'default', { value: e, enumerable: !0 }),
          e
        )
      ),
      f = c((e, r) => {
        var s = String,
          n = function () {
            return {
              isColorSupported: !1,
              reset: s,
              bold: s,
              dim: s,
              italic: s,
              underline: s,
              inverse: s,
              hidden: s,
              strikethrough: s,
              black: s,
              red: s,
              green: s,
              yellow: s,
              blue: s,
              magenta: s,
              cyan: s,
              white: s,
              gray: s,
              bgBlack: s,
              bgRed: s,
              bgGreen: s,
              bgYellow: s,
              bgBlue: s,
              bgMagenta: s,
              bgCyan: s,
              bgWhite: s,
              blackBright: s,
              redBright: s,
              greenBright: s,
              yellowBright: s,
              blueBright: s,
              magentaBright: s,
              cyanBright: s,
              whiteBright: s,
              bgBlackBright: s,
              bgRedBright: s,
              bgGreenBright: s,
              bgYellowBright: s,
              bgBlueBright: s,
              bgMagentaBright: s,
              bgCyanBright: s,
              bgWhiteBright: s
            };
          };
        ((r.exports = n()), (r.exports.createColors = n));
      }),
      d = c(() => {}),
      m = c((e, r) => {
        'use strict';
        var s = f(),
          n = d(),
          o = class t extends Error {
            constructor(e, r, s, n, o, i) {
              (super(e),
                (this.name = 'CssSyntaxError'),
                (this.reason = e),
                o && (this.file = o),
                n && (this.source = n),
                i && (this.plugin = i),
                'u' > typeof r &&
                  'u' > typeof s &&
                  ('number' == typeof r
                    ? ((this.line = r), (this.column = s))
                    : ((this.line = r.line),
                      (this.column = r.column),
                      (this.endLine = s.line),
                      (this.endColumn = s.column))),
                this.setMessage(),
                Error.captureStackTrace && Error.captureStackTrace(this, t));
            }
            setMessage() {
              ((this.message = this.plugin ? this.plugin + ': ' : ''),
                (this.message += this.file ? this.file : '<css input>'),
                'u' > typeof this.line &&
                  (this.message += ':' + this.line + ':' + this.column),
                (this.message += ': ' + this.reason));
            }
            showSourceCode(e) {
              if (!this.source) return '';
              let r = this.source;
              null == e && (e = s.isColorSupported);
              let o = e => e,
                i = e => e,
                a = e => e;
              if (e) {
                let { bold: e, gray: r, red: u } = s.createColors(!0);
                ((i = r => e(u(r))), (o = e => r(e)), n && (a = e => n(e)));
              }
              let u = r.split(/\r?\n/),
                l = Math.max(this.line - 3, 0),
                c = Math.min(this.line + 2, u.length),
                p = String(c).length;
              return u.slice(l, c).map((e, r) => {
                let s = l + 1 + r,
                  n = ' ' + (' ' + s).slice(-p) + ' | ';
                if (s === this.line) {
                  if (e.length > 160) {
                    let r = Math.max(0, this.column - 20),
                      s = Math.max(this.column + 20, this.endColumn + 20),
                      u = e.slice(r, s),
                      l =
                        o(n.replace(/\d/g, ' ')) +
                        e
                          .slice(0, Math.min(this.column - 1, 19))
                          .replace(/[^\t]/g, ' ');
                    return (
                      i('>') +
                      o(n) +
                      a(u) +
                      `
 ` +
                      l +
                      i('^')
                    );
                  }
                  let r =
                    o(n.replace(/\d/g, ' ')) +
                    e.slice(0, this.column - 1).replace(/[^\t]/g, ' ');
                  return (
                    i('>') +
                    o(n) +
                    a(e) +
                    `
 ` +
                    r +
                    i('^')
                  );
                }
                return ' ' + o(n) + a(e);
              }).join(`
`);
            }
            toString() {
              let e = this.showSourceCode();
              return (
                e &&
                  (e =
                    `

` +
                    e +
                    `
`),
                this.name + ': ' + this.message + e
              );
            }
          };
        ((r.exports = o), (o.default = o));
      }),
      y = c((e, r) => {
        'use strict';
        var s = /(<)(\/?style\b)/gi,
          n = /(<)(!--)/g;
        function o(e) {
          return 'string' == typeof e && e.includes('<')
            ? e.replace(s, '\\3c $2').replace(n, '\\3c $2')
            : e;
        }
        var i = {
            after: `
`,
            beforeClose: `
`,
            beforeComment: `
`,
            beforeDecl: `
`,
            beforeOpen: ' ',
            beforeRule: `
`,
            colon: ': ',
            commentLeft: ' ',
            commentRight: ' ',
            emptyBody: '',
            indent: '    ',
            semicolon: !1
          },
          a = class {
            constructor(e) {
              this.builder = e;
            }
            atrule(e, r) {
              let s = e.raws,
                n = '@' + e.name,
                i = e.params ? this.rawValue(e, 'params') : '';
              if (
                ('u' > typeof s.afterName
                  ? (n += s.afterName)
                  : i && (n += ' '),
                e.nodes)
              )
                this.block(e, n + i);
              else {
                let a = (s.between || '') + (r ? ';' : '');
                this.builder(o(n + i + a), e);
              }
            }
            beforeAfter(e, r) {
              let s;
              s =
                'decl' === e.type
                  ? this.raw(e, null, 'beforeDecl')
                  : 'comment' === e.type
                    ? this.raw(e, null, 'beforeComment')
                    : 'before' === r
                      ? this.raw(e, null, 'beforeRule')
                      : this.raw(e, null, 'beforeClose');
              let n = e.parent,
                o = 0;
              for (; n && 'root' !== n.type;) ((o += 1), (n = n.parent));
              if (
                s.includes(`
`)
              ) {
                let r = this.raw(e, null, 'indent');
                if (r.length) for (let e = 0; e < o; e++) s += r;
              }
              return s;
            }
            block(e, r) {
              let s,
                n = this.raw(e, 'between', 'beforeOpen');
              (this.builder(o(r + n) + '{', e, 'start'),
                e.nodes && e.nodes.length
                  ? (this.body(e), (s = this.raw(e, 'after')))
                  : (s = this.raw(e, 'after', 'emptyBody')),
                s && this.builder(o(s)),
                this.builder('}', e, 'end'));
            }
            body(e) {
              let r = e.nodes,
                s = r.length - 1;
              for (; s > 0 && 'comment' === r[s].type;) s -= 1;
              let n = this.raw(e, 'semicolon'),
                i = 'document' === e.type;
              for (let e = 0; e < r.length; e++) {
                let a = r[e],
                  u = this.raw(a, 'before');
                (u && this.builder(i ? u : o(u)),
                  this.stringify(a, s !== e || n));
              }
            }
            comment(e) {
              let r = this.raw(e, 'left', 'commentLeft'),
                s = this.raw(e, 'right', 'commentRight');
              this.builder(o('/*' + r + e.text + s + '*/'), e);
            }
            decl(e, r) {
              let s = e.raws,
                n = this.raw(e, 'between', 'colon'),
                i = e.prop + n + this.rawValue(e, 'value');
              (e.important && (i += s.important || ' !important'),
                r && (i += ';'),
                this.builder(o(i), e));
            }
            document(e) {
              this.body(e);
            }
            raw(e, r, s) {
              let n;
              if ((s || (s = r), r && 'u' > typeof (n = e.raws[r]))) return n;
              let o = e.parent;
              if (
                'before' === s &&
                (!o ||
                  ('root' === o.type && o.first === e) ||
                  (o && 'document' === o.type))
              )
                return '';
              if (!o) return i[s];
              let a = e.root(),
                u = a.rawCache || (a.rawCache = {});
              if ('u' > typeof u[s]) return u[s];
              if ('before' === s || 'after' === s)
                return this.beforeAfter(e, s);
              {
                var l;
                let o = 'raw' + ((l = s)[0].toUpperCase() + l.slice(1));
                this[o]
                  ? (n = this[o](a, e))
                  : a.walk(e => {
                      if ('u' > typeof (n = e.raws[r])) return !1;
                    });
              }
              return (typeof n > 'u' && (n = i[s]), (u[s] = n), n);
            }
            rawBeforeClose(e) {
              let r;
              return (
                e.walk(e => {
                  if (
                    e.nodes &&
                    e.nodes.length > 0 &&
                    'u' > typeof e.raws.after
                  )
                    return (
                      (r = e.raws.after).includes(`
`) && (r = r.replace(/[^\n]+$/, '')),
                      !1
                    );
                }),
                r && (r = r.replace(/\S/g, '')),
                r
              );
            }
            rawBeforeComment(e, r) {
              let s;
              return (
                e.walkComments(e => {
                  if ('u' > typeof e.raws.before)
                    return (
                      (s = e.raws.before).includes(`
`) && (s = s.replace(/[^\n]+$/, '')),
                      !1
                    );
                }),
                typeof s > 'u'
                  ? (s = this.raw(r, null, 'beforeDecl'))
                  : s && (s = s.replace(/\S/g, '')),
                s
              );
            }
            rawBeforeDecl(e, r) {
              let s;
              return (
                e.walkDecls(e => {
                  if ('u' > typeof e.raws.before)
                    return (
                      (s = e.raws.before).includes(`
`) && (s = s.replace(/[^\n]+$/, '')),
                      !1
                    );
                }),
                typeof s > 'u'
                  ? (s = this.raw(r, null, 'beforeRule'))
                  : s && (s = s.replace(/\S/g, '')),
                s
              );
            }
            rawBeforeOpen(e) {
              let r;
              return (
                e.walk(e => {
                  if ('decl' !== e.type && 'u' > typeof (r = e.raws.between))
                    return !1;
                }),
                r
              );
            }
            rawBeforeRule(e) {
              let r;
              return (
                e.walk(s => {
                  if (
                    s.nodes &&
                    (s.parent !== e || e.first !== s) &&
                    'u' > typeof s.raws.before
                  )
                    return (
                      (r = s.raws.before).includes(`
`) && (r = r.replace(/[^\n]+$/, '')),
                      !1
                    );
                }),
                r && (r = r.replace(/\S/g, '')),
                r
              );
            }
            rawColon(e) {
              let r;
              return (
                e.walkDecls(e => {
                  if ('u' > typeof e.raws.between)
                    return ((r = e.raws.between.replace(/[^\s:]/g, '')), !1);
                }),
                r
              );
            }
            rawEmptyBody(e) {
              let r;
              return (
                e.walk(e => {
                  if (
                    e.nodes &&
                    0 === e.nodes.length &&
                    'u' > typeof (r = e.raws.after)
                  )
                    return !1;
                }),
                r
              );
            }
            rawIndent(e) {
              let r;
              return e.raws.indent
                ? e.raws.indent
                : (e.walk(s => {
                    let n = s.parent;
                    if (
                      n &&
                      n !== e &&
                      n.parent &&
                      n.parent === e &&
                      'u' > typeof s.raws.before
                    ) {
                      let e = s.raws.before.split(`
`);
                      return (
                        (r = (r = e[e.length - 1]).replace(/\S/g, '')),
                        !1
                      );
                    }
                  }),
                  r);
            }
            rawSemicolon(e) {
              let r;
              return (
                e.walk(e => {
                  if (
                    e.nodes &&
                    e.nodes.length &&
                    'decl' === e.last.type &&
                    'u' > typeof (r = e.raws.semicolon)
                  )
                    return !1;
                }),
                r
              );
            }
            rawValue(e, r) {
              let s = e[r],
                n = e.raws[r];
              return n && n.value === s ? n.raw : s;
            }
            root(e) {
              if ((this.body(e), e.raws.after)) {
                let r = e.raws.after,
                  s = e.parent && 'document' === e.parent.type;
                this.builder(s ? r : o(r));
              }
            }
            rule(e) {
              (this.block(e, this.rawValue(e, 'selector')),
                e.raws.ownSemicolon &&
                  this.builder(o(e.raws.ownSemicolon), e, 'end'));
            }
            stringify(e, r) {
              if (!this[e.type])
                throw Error(
                  'Unknown AST node type ' +
                    e.type +
                    '. Maybe you need to change PostCSS stringifier.'
                );
              this[e.type](e, r);
            }
          };
        ((r.exports = a), (a.default = a));
      }),
      g = c((e, r) => {
        'use strict';
        var s = y();
        function n(e, r) {
          new s(r).stringify(e);
        }
        ((r.exports = n), (n.default = n));
      }),
      v = c((e, r) => {
        'use strict';
        ((r.exports.isClean = Symbol('isClean')),
          (r.exports.my = Symbol('my')));
      }),
      w = c((e, r) => {
        'use strict';
        var s = m(),
          n = y(),
          o = g(),
          { isClean: i, my: a } = v();
        function u(e, r) {
          if (r && 'u' > typeof r.offset) return r.offset;
          let s = 1,
            n = 1,
            o = 0;
          for (let i = 0; i < e.length; i++) {
            if (n === r.line && s === r.column) {
              o = i;
              break;
            }
            e[i] ===
            `
`
              ? ((s = 1), (n += 1))
              : (s += 1);
          }
          return o;
        }
        var l = class {
          get proxyOf() {
            return this;
          }
          constructor(e = {}) {
            for (let r in ((this.raws = {}), (this[i] = !1), (this[a] = !0), e))
              if ('nodes' === r)
                for (let s of ((this.nodes = []), e[r]))
                  'function' == typeof s.clone && s.parent
                    ? this.append(s.clone())
                    : this.append(s);
              else this[r] = e[r];
          }
          addToError(e) {
            if (
              ((e.postcssNode = this),
              e.stack && this.source && /\n\s{4}at /.test(e.stack))
            ) {
              let r = this.source;
              e.stack = e.stack.replace(
                /\n\s{4}at /,
                `$&${r.input.from}:${r.start.line}:${r.start.column}$&`
              );
            }
            return e;
          }
          after(e) {
            return (this.parent.insertAfter(this, e), this);
          }
          assign(e = {}) {
            for (let r in e) this[r] = e[r];
            return this;
          }
          before(e) {
            return (this.parent.insertBefore(this, e), this);
          }
          cleanRaws(e) {
            (delete this.raws.before,
              delete this.raws.after,
              e || delete this.raws.between);
          }
          clone(e = {}) {
            let r = (function e(r, s) {
              let n = new r.constructor();
              for (let o in r) {
                if (
                  !Object.prototype.hasOwnProperty.call(r, o) ||
                  'proxyCache' === o
                )
                  continue;
                let i = r[o],
                  a = typeof i;
                'parent' === o && 'object' === a
                  ? s && (n[o] = s)
                  : 'source' === o
                    ? (n[o] = i)
                    : Array.isArray(i)
                      ? (n[o] = i.map(r => e(r, n)))
                      : ('object' === a && null !== i && (i = e(i)),
                        (n[o] = i));
              }
              return n;
            })(this);
            for (let s in e) r[s] = e[s];
            return r;
          }
          cloneAfter(e = {}) {
            let r = this.clone(e);
            return (this.parent.insertAfter(this, r), r);
          }
          cloneBefore(e = {}) {
            let r = this.clone(e);
            return (this.parent.insertBefore(this, r), r);
          }
          error(e, r = {}) {
            if (this.source) {
              let { end: s, start: n } = this.rangeBy(r);
              return this.source.input.error(
                e,
                { column: n.column, line: n.line },
                { column: s.column, line: s.line },
                r
              );
            }
            return new s(e);
          }
          getProxyProcessor() {
            return {
              get: (e, r) =>
                'proxyOf' === r
                  ? e
                  : 'root' === r
                    ? () => e.root().toProxy()
                    : e[r],
              set: (e, r, s) => (
                e[r] === s ||
                  ((e[r] = s),
                  ('prop' === r ||
                    'value' === r ||
                    'name' === r ||
                    'params' === r ||
                    'important' === r ||
                    'text' === r) &&
                    e.markDirty()),
                !0
              )
            };
          }
          markClean() {
            this[i] = !0;
          }
          markDirty() {
            if (this[i]) {
              this[i] = !1;
              let e = this;
              for (; (e = e.parent);) e[i] = !1;
            }
          }
          next() {
            if (!this.parent) return;
            let e = this.parent.index(this);
            return this.parent.nodes[e + 1];
          }
          positionBy(e = {}) {
            let r =
                'document' in this.source.input
                  ? this.source.input.document
                  : this.source.input.css,
              s = {
                column: this.source.start.column,
                line: this.source.start.line,
                offset: u(r, this.source.start)
              };
            if (e.index) s = this.positionInside(e.index);
            else if (e.word) {
              let n = r
                .slice(u(r, this.source.start), u(r, this.source.end))
                .indexOf(e.word);
              -1 !== n && (s = this.positionInside(n));
            }
            return s;
          }
          positionInside(e) {
            let r = this.source.start.column,
              s = this.source.start.line,
              n =
                'document' in this.source.input
                  ? this.source.input.document
                  : this.source.input.css,
              o = u(n, this.source.start),
              i = o + e;
            for (let e = o; e < i; e++)
              n[e] ===
              `
`
                ? ((r = 1), (s += 1))
                : (r += 1);
            return { column: r, line: s, offset: i };
          }
          prev() {
            if (!this.parent) return;
            let e = this.parent.index(this);
            return this.parent.nodes[e - 1];
          }
          rangeBy(e = {}) {
            let r =
                'document' in this.source.input
                  ? this.source.input.document
                  : this.source.input.css,
              s = {
                column: this.source.start.column,
                line: this.source.start.line,
                offset: u(r, this.source.start)
              },
              n = this.source.end
                ? {
                    column: this.source.end.column + 1,
                    line: this.source.end.line,
                    offset:
                      'number' == typeof this.source.end.offset
                        ? this.source.end.offset
                        : u(r, this.source.end) + 1
                  }
                : { column: s.column + 1, line: s.line, offset: s.offset + 1 };
            if (e.word) {
              let o = r
                .slice(u(r, this.source.start), u(r, this.source.end))
                .indexOf(e.word);
              -1 !== o &&
                ((s = this.positionInside(o)),
                (n = this.positionInside(o + e.word.length)));
            } else
              (e.start
                ? (s = {
                    column: e.start.column,
                    line: e.start.line,
                    offset: u(r, e.start)
                  })
                : 'number' == typeof e.index &&
                  (s = this.positionInside(e.index)),
                e.end
                  ? (n = {
                      column: e.end.column,
                      line: e.end.line,
                      offset: u(r, e.end)
                    })
                  : 'number' == typeof e.endIndex
                    ? (n = this.positionInside(e.endIndex))
                    : 'number' == typeof e.index &&
                      (n = this.positionInside(e.index + 1)));
            return (
              (n.line < s.line ||
                (n.line === s.line && n.column <= s.column)) &&
                (n = {
                  column: s.column + 1,
                  line: s.line,
                  offset: s.offset + 1
                }),
              { end: n, start: s }
            );
          }
          raw(e, r) {
            return new n().raw(this, e, r);
          }
          remove() {
            return (
              this.parent && this.parent.removeChild(this),
              (this.parent = void 0),
              this
            );
          }
          replaceWith(...e) {
            if (this.parent) {
              let r = this,
                s = !1;
              for (let n of e)
                n === this
                  ? (s = !0)
                  : s
                    ? (this.parent.insertAfter(r, n), (r = n))
                    : this.parent.insertBefore(r, n);
              s || this.remove();
            }
            return this;
          }
          root() {
            let e = this;
            for (; e.parent && 'document' !== e.parent.type;) e = e.parent;
            return e;
          }
          toJSON(e, r) {
            let s = {},
              n = null == r;
            r = r || new Map();
            let o = 0;
            for (let e in this) {
              if (
                !Object.prototype.hasOwnProperty.call(this, e) ||
                'parent' === e ||
                'proxyCache' === e
              )
                continue;
              let n = this[e];
              if (Array.isArray(n))
                s[e] = n.map(e =>
                  'object' == typeof e && e.toJSON ? e.toJSON(null, r) : e
                );
              else if ('object' == typeof n && n.toJSON)
                s[e] = n.toJSON(null, r);
              else if ('source' === e) {
                if (null == n) continue;
                let i = r.get(n.input);
                (null == i && ((i = o), r.set(n.input, o), o++),
                  (s[e] = { end: n.end, inputId: i, start: n.start }));
              } else s[e] = n;
            }
            return (n && (s.inputs = [...r.keys()].map(e => e.toJSON())), s);
          }
          toProxy() {
            return (
              this.proxyCache ||
                (this.proxyCache = new Proxy(this, this.getProxyProcessor())),
              this.proxyCache
            );
          }
          toString(e = o) {
            e.stringify && (e = e.stringify);
            let r = '';
            return (
              e(this, e => {
                r += e;
              }),
              r
            );
          }
          warn(e, r, s = {}) {
            let n = { node: this };
            for (let e in s) n[e] = s[e];
            return e.warn(r, n);
          }
        };
        ((r.exports = l), (l.default = l));
      }),
      b = c((e, r) => {
        'use strict';
        var s = w(),
          n = class extends s {
            constructor(e) {
              (super(e), (this.type = 'comment'));
            }
          };
        ((r.exports = n), (n.default = n));
      }),
      x = c((e, r) => {
        'use strict';
        var s = w(),
          n = class extends s {
            get variable() {
              return this.prop.startsWith('--') || '$' === this.prop[0];
            }
            constructor(e) {
              (e &&
                'u' > typeof e.value &&
                'string' != typeof e.value &&
                (e = { ...e, value: String(e.value) }),
                super(e),
                (this.type = 'decl'));
            }
          };
        ((r.exports = n), (n.default = n));
      }),
      k = c((e, r) => {
        'use strict';
        var s,
          n,
          o,
          i,
          a = b(),
          u = x(),
          l = w(),
          { isClean: c, my: p } = v(),
          h = class t extends l {
            get first() {
              if (this.proxyOf.nodes) return this.proxyOf.nodes[0];
            }
            get last() {
              if (this.proxyOf.nodes)
                return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
            }
            append(...e) {
              for (let r of e)
                for (let e of this.normalize(r, this.last))
                  this.proxyOf.nodes.push(e);
              return (this.markDirty(), this);
            }
            cleanRaws(e) {
              if ((super.cleanRaws(e), this.nodes))
                for (let r of this.nodes) r.cleanRaws(e);
            }
            each(e) {
              if (!this.proxyOf.nodes) return;
              let r = this.getIterator(),
                s,
                n;
              for (
                ;
                this.indexes[r] < this.proxyOf.nodes.length &&
                ((s = this.indexes[r]),
                !1 !== (n = e(this.proxyOf.nodes[s], s)));
              )
                this.indexes[r] += 1;
              return (delete this.indexes[r], n);
            }
            every(e) {
              return this.nodes.every(e);
            }
            getIterator() {
              (this.lastEach || (this.lastEach = 0),
                this.indexes || (this.indexes = {}),
                (this.lastEach += 1));
              let e = this.lastEach;
              return ((this.indexes[e] = 0), e);
            }
            getProxyProcessor() {
              return {
                get: (e, r) =>
                  'proxyOf' === r
                    ? e
                    : e[r]
                      ? 'each' === r ||
                        ('string' == typeof r && r.startsWith('walk'))
                        ? (...s) =>
                            e[r](
                              ...s.map(e =>
                                'function' == typeof e
                                  ? (r, s) => e(r.toProxy(), s)
                                  : e
                              )
                            )
                        : 'every' === r || 'some' === r
                          ? s => e[r]((e, ...r) => s(e.toProxy(), ...r))
                          : 'root' === r
                            ? () => e.root().toProxy()
                            : 'nodes' === r
                              ? e.nodes.map(e => e.toProxy())
                              : 'first' === r || 'last' === r
                                ? e[r].toProxy()
                                : e[r]
                      : e[r],
                set: (e, r, s) => (
                  e[r] === s ||
                    ((e[r] = s),
                    ('name' === r || 'params' === r || 'selector' === r) &&
                      e.markDirty()),
                  !0
                )
              };
            }
            index(e) {
              return 'number' == typeof e
                ? e
                : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
            }
            insertAfter(e, r) {
              let s,
                n = this.index(e),
                o = this.normalize(r, this.proxyOf.nodes[n]).reverse();
              for (let r of ((n = this.index(e)), o))
                this.proxyOf.nodes.splice(n + 1, 0, r);
              for (let e in this.indexes)
                n < (s = this.indexes[e]) && (this.indexes[e] = s + o.length);
              return (this.markDirty(), this);
            }
            insertBefore(e, r) {
              let s,
                n = this.index(e),
                o = 0 === n && 'prepend',
                i = this.normalize(r, this.proxyOf.nodes[n], o).reverse();
              for (let r of ((n = this.index(e)), i))
                this.proxyOf.nodes.splice(n, 0, r);
              for (let e in this.indexes)
                n <= (s = this.indexes[e]) && (this.indexes[e] = s + i.length);
              return (this.markDirty(), this);
            }
            normalize(e, r) {
              if ('string' == typeof e)
                e = (function e(r) {
                  return r.map(
                    r => (r.nodes && (r.nodes = e(r.nodes)), delete r.source, r)
                  );
                })(n(e).nodes);
              else if (typeof e > 'u') e = [];
              else if (Array.isArray(e))
                for (let r of (e = e.slice(0)))
                  r.parent && r.parent.removeChild(r, 'ignore');
              else if ('root' === e.type && 'document' !== this.type)
                for (let r of (e = e.nodes.slice(0)))
                  r.parent && r.parent.removeChild(r, 'ignore');
              else if (e.type) e = [e];
              else if (e.prop) {
                if (typeof e.value > 'u')
                  throw Error('Value field is missed in node creation');
                ('string' != typeof e.value && (e.value = String(e.value)),
                  (e = [new u(e)]));
              } else if (e.selector || e.selectors) e = [new i(e)];
              else if (e.name) e = [new s(e)];
              else if (e.text) e = [new a(e)];
              else throw Error('Unknown node type in node creation');
              return e.map(
                e => (
                  e[p] || t.rebuild(e),
                  (e = e.proxyOf).parent && e.parent.removeChild(e),
                  e[c] &&
                    (function e(r) {
                      if (((r[c] = !1), r.proxyOf.nodes))
                        for (let s of r.proxyOf.nodes) e(s);
                    })(e),
                  e.raws || (e.raws = {}),
                  typeof e.raws.before > 'u' &&
                    r &&
                    'u' > typeof r.raws.before &&
                    (e.raws.before = r.raws.before.replace(/\S/g, '')),
                  (e.parent = this.proxyOf),
                  e
                )
              );
            }
            prepend(...e) {
              for (let r of (e = e.reverse())) {
                let e = this.normalize(r, this.first, 'prepend').reverse();
                for (let r of e) this.proxyOf.nodes.unshift(r);
                for (let r in this.indexes)
                  this.indexes[r] = this.indexes[r] + e.length;
              }
              return (this.markDirty(), this);
            }
            push(e) {
              return ((e.parent = this), this.proxyOf.nodes.push(e), this);
            }
            removeAll() {
              for (let e of this.proxyOf.nodes) e.parent = void 0;
              return ((this.proxyOf.nodes = []), this.markDirty(), this);
            }
            removeChild(e) {
              let r;
              for (let s in ((e = this.index(e)),
              (this.proxyOf.nodes[e].parent = void 0),
              this.proxyOf.nodes.splice(e, 1),
              this.indexes))
                (r = this.indexes[s]) >= e && (this.indexes[s] = r - 1);
              return (this.markDirty(), this);
            }
            replaceValues(e, r, s) {
              return (
                s || ((s = r), (r = {})),
                this.walkDecls(n => {
                  (r.props && !r.props.includes(n.prop)) ||
                    (r.fast && !n.value.includes(r.fast)) ||
                    (n.value = n.value.replace(e, s));
                }),
                this.markDirty(),
                this
              );
            }
            some(e) {
              return this.nodes.some(e);
            }
            walk(e) {
              return this.each((r, s) => {
                let n;
                try {
                  n = e(r, s);
                } catch (e) {
                  throw r.addToError(e);
                }
                return (!1 !== n && r.walk && (n = r.walk(e)), n);
              });
            }
            walkAtRules(e, r) {
              return r
                ? e instanceof RegExp
                  ? this.walk((s, n) => {
                      if ('atrule' === s.type && e.test(s.name)) return r(s, n);
                    })
                  : this.walk((s, n) => {
                      if ('atrule' === s.type && s.name === e) return r(s, n);
                    })
                : ((r = e),
                  this.walk((e, s) => {
                    if ('atrule' === e.type) return r(e, s);
                  }));
            }
            walkComments(e) {
              return this.walk((r, s) => {
                if ('comment' === r.type) return e(r, s);
              });
            }
            walkDecls(e, r) {
              return r
                ? e instanceof RegExp
                  ? this.walk((s, n) => {
                      if ('decl' === s.type && e.test(s.prop)) return r(s, n);
                    })
                  : this.walk((s, n) => {
                      if ('decl' === s.type && s.prop === e) return r(s, n);
                    })
                : ((r = e),
                  this.walk((e, s) => {
                    if ('decl' === e.type) return r(e, s);
                  }));
            }
            walkRules(e, r) {
              return r
                ? e instanceof RegExp
                  ? this.walk((s, n) => {
                      if ('rule' === s.type && e.test(s.selector))
                        return r(s, n);
                    })
                  : this.walk((s, n) => {
                      if ('rule' === s.type && s.selector === e) return r(s, n);
                    })
                : ((r = e),
                  this.walk((e, s) => {
                    if ('rule' === e.type) return r(e, s);
                  }));
            }
          };
        ((h.registerParse = e => {
          n = e;
        }),
          (h.registerRule = e => {
            i = e;
          }),
          (h.registerAtRule = e => {
            s = e;
          }),
          (h.registerRoot = e => {
            o = e;
          }),
          (r.exports = h),
          (h.default = h),
          (h.rebuild = e => {
            ('atrule' === e.type
              ? Object.setPrototypeOf(e, s.prototype)
              : 'rule' === e.type
                ? Object.setPrototypeOf(e, i.prototype)
                : 'decl' === e.type
                  ? Object.setPrototypeOf(e, u.prototype)
                  : 'comment' === e.type
                    ? Object.setPrototypeOf(e, a.prototype)
                    : 'root' === e.type &&
                      Object.setPrototypeOf(e, o.prototype),
              (e[p] = !0),
              e.nodes &&
                e.nodes.forEach(e => {
                  h.rebuild(e);
                }));
          }));
      }),
      O = c((e, r) => {
        r.exports = {
          nanoid: (e = 21) => {
            let r = '',
              s = 0 | e;
            for (; s--;)
              r +=
                'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'[
                  (64 * Math.random()) | 0
                ];
            return r;
          },
          customAlphabet:
            (e, r = 21) =>
            (s = r) => {
              let n = '',
                o = 0 | s;
              for (; o--;) n += e[(Math.random() * e.length) | 0];
              return n;
            }
        };
      }),
      T = c(() => {}),
      _ = c((e, r) => {
        r.exports = class {};
      }),
      S = c((e, r) => {
        'use strict';
        var { nanoid: s } = O(),
          { isAbsolute: n, resolve: o } = {},
          { SourceMapConsumer: i, SourceMapGenerator: a } = T(),
          { fileURLToPath: u, pathToFileURL: l } = {},
          c = m(),
          p = _(),
          h = d(),
          f = Symbol('lineToIndexCache'),
          y = !!(i && a),
          g = !!(o && n);
        function v(e) {
          if (e[f]) return e[f];
          let r = e.css.split(`
`),
            s = Array(r.length),
            n = 0;
          for (let e = 0, o = r.length; e < o; e++)
            ((s[e] = n), (n += r[e].length + 1));
          return ((e[f] = s), s);
        }
        var w = class {
          get from() {
            return this.file || this.id;
          }
          constructor(e, r = {}) {
            if (
              null === e ||
              typeof e > 'u' ||
              ('object' == typeof e && !e.toString)
            )
              throw Error(`PostCSS received ${e} instead of CSS string`);
            if (
              ((this.css = e.toString()),
              '\uFEFF' === this.css[0] || '￾' === this.css[0]
                ? ((this.hasBOM = !0), (this.css = this.css.slice(1)))
                : (this.hasBOM = !1),
              (this.document = this.css),
              r.document && (this.document = r.document.toString()),
              r.from &&
                (!g || /^\w+:\/\//.test(r.from) || n(r.from)
                  ? (this.file = r.from)
                  : (this.file = o(r.from))),
              g && y)
            ) {
              let e = new p(this.css, r);
              if (e.text) {
                this.map = e;
                let r = e.consumer().file;
                !this.file && r && (this.file = this.mapResolve(r));
              }
            }
            (this.file || (this.id = '<input css ' + s(6) + '>'),
              this.map && (this.map.file = this.from));
          }
          error(e, r, s, n = {}) {
            let o, i, a, u, p;
            if (r && 'object' == typeof r) {
              let e = r,
                n = s;
              if ('number' == typeof e.offset) {
                u = e.offset;
                let n = this.fromOffset(u);
                ((r = n.line), (s = n.col));
              } else
                ((r = e.line),
                  (s = e.column),
                  (u = this.fromLineAndColumn(r, s)));
              if ('number' == typeof n.offset) {
                a = n.offset;
                let e = this.fromOffset(a);
                ((i = e.line), (o = e.col));
              } else
                ((i = n.line),
                  (o = n.column),
                  (a = this.fromLineAndColumn(n.line, n.column)));
            } else if (s) u = this.fromLineAndColumn(r, s);
            else {
              u = r;
              let e = this.fromOffset(u);
              ((r = e.line), (s = e.col));
            }
            let h = this.origin(r, s, i, o);
            return (
              ((p = h
                ? new c(
                    e,
                    void 0 === h.endLine
                      ? h.line
                      : { column: h.column, line: h.line },
                    void 0 === h.endLine
                      ? h.column
                      : { column: h.endColumn, line: h.endLine },
                    h.source,
                    h.file,
                    n.plugin
                  )
                : new c(
                    e,
                    void 0 === i ? r : { column: s, line: r },
                    void 0 === i ? s : { column: o, line: i },
                    this.css,
                    this.file,
                    n.plugin
                  )).input = {
                column: s,
                endColumn: o,
                endLine: i,
                endOffset: a,
                line: r,
                offset: u,
                source: this.css
              }),
              this.file &&
                (l && (p.input.url = l(this.file).toString()),
                (p.input.file = this.file)),
              p
            );
          }
          fromLineAndColumn(e, r) {
            return v(this)[e - 1] + r - 1;
          }
          fromOffset(e) {
            let r = v(this),
              s = r[r.length - 1],
              n = 0;
            if (e >= s) n = r.length - 1;
            else {
              let s = r.length - 2,
                o;
              for (; n < s;)
                if (e < r[(o = n + ((s - n) >> 1))]) s = o - 1;
                else if (e >= r[o + 1]) n = o + 1;
                else {
                  n = o;
                  break;
                }
            }
            return { col: e - r[n] + 1, line: n + 1 };
          }
          mapResolve(e) {
            return /^\w+:\/\//.test(e)
              ? e
              : o(this.map.consumer().sourceRoot || this.map.root || '.', e);
          }
          origin(e, r, s, o) {
            let i, a;
            if (!this.map) return !1;
            let c = this.map.consumer(),
              p = c.originalPositionFor({ column: r - 1, line: e });
            if (!p.source) return !1;
            ('number' == typeof s &&
              (i = c.originalPositionFor({ column: o - 1, line: s })),
              (a = n(p.source)
                ? l(p.source)
                : new URL(
                    p.source,
                    this.map.consumer().sourceRoot || l(this.map.mapFile)
                  )));
            let h = {
              column: p.column + 1,
              endColumn: i && i.column + 1,
              endLine: i && i.line,
              line: p.line,
              url: a.toString()
            };
            if ('file:' === a.protocol)
              if (u) h.file = u(a);
              else
                throw Error(
                  'file: protocol is not available in this PostCSS build'
                );
            let f = c.sourceContentFor(p.source);
            return (f && (h.source = f), h);
          }
          toJSON() {
            let e = {};
            for (let r of ['hasBOM', 'css', 'file', 'id'])
              null != this[r] && (e[r] = this[r]);
            return (
              this.map &&
                ((e.map = { ...this.map }),
                e.map.consumerCache && (e.map.consumerCache = void 0)),
              e
            );
          }
        };
        ((r.exports = w),
          (w.default = w),
          h && h.registerInput && h.registerInput(w));
      }),
      C = c((e, r) => {
        'use strict';
        var s = k(),
          n = class extends s {
            constructor(e) {
              (super(e), (this.type = 'atrule'));
            }
            append(...e) {
              return (
                this.proxyOf.nodes || (this.nodes = []),
                super.append(...e)
              );
            }
            prepend(...e) {
              return (
                this.proxyOf.nodes || (this.nodes = []),
                super.prepend(...e)
              );
            }
          };
        ((r.exports = n), (n.default = n), s.registerAtRule(n));
      }),
      A = c((e, r) => {
        'use strict';
        var s,
          n,
          o = k(),
          i = class extends o {
            constructor(e) {
              (super(e), (this.type = 'root'), this.nodes || (this.nodes = []));
            }
            normalize(e, r, s) {
              let n = super.normalize(e);
              if (r) {
                if ('prepend' === s)
                  this.nodes.length > 1
                    ? (r.raws.before = this.nodes[1].raws.before)
                    : delete r.raws.before;
                else if (this.first !== r)
                  for (let e of n) e.raws.before = r.raws.before;
              }
              return n;
            }
            removeChild(e, r) {
              let s = this.index(e);
              return (
                !r &&
                  0 === s &&
                  this.nodes.length > 1 &&
                  (this.nodes[1].raws.before = this.nodes[s].raws.before),
                super.removeChild(e)
              );
            }
            toResult(e = {}) {
              return new s(new n(), this, e).stringify();
            }
          };
        ((i.registerLazyResult = e => {
          s = e;
        }),
          (i.registerProcessor = e => {
            n = e;
          }),
          (r.exports = i),
          (i.default = i),
          o.registerRoot(i));
      }),
      E = c((e, r) => {
        'use strict';
        var s = {
          comma: e => s.split(e, [','], !0),
          space(e) {
            let r = [
              ' ',
              `
`,
              '	'
            ];
            return s.split(e, r);
          },
          split(e, r, s) {
            let n = [],
              o = '',
              i = !1,
              a = 0,
              u = !1,
              l = '',
              c = !1;
            for (let s of e)
              (c
                ? (c = !1)
                : '\\' === s
                  ? (c = !0)
                  : u
                    ? s === l && (u = !1)
                    : '"' === s || "'" === s
                      ? ((u = !0), (l = s))
                      : '(' === s
                        ? (a += 1)
                        : ')' === s
                          ? a > 0 && (a -= 1)
                          : 0 === a && r.includes(s) && (i = !0),
                i
                  ? ('' !== o && n.push(o.trim()), (o = ''), (i = !1))
                  : (o += s));
            return ((s || '' !== o) && n.push(o.trim()), n);
          }
        };
        ((r.exports = s), (s.default = s));
      }),
      j = c((e, r) => {
        'use strict';
        var s = k(),
          n = E(),
          o = class extends s {
            get selectors() {
              return n.comma(this.selector);
            }
            set selectors(e) {
              let r = this.selector ? this.selector.match(/,\s*/) : null,
                s = r ? r[0] : ',' + this.raw('between', 'beforeOpen');
              this.selector = e.join(s);
            }
            constructor(e) {
              (super(e), (this.type = 'rule'), this.nodes || (this.nodes = []));
            }
          };
        ((r.exports = o), (o.default = o), s.registerRule(o));
      }),
      I = c((e, r) => {
        'use strict';
        var s = /[\t\n\f\r "#'()/;[\\\]{}]/g,
          n = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,
          o = /.[\r\n"'(/\\]/,
          i = /[\da-f]/i;
        r.exports = function (e, r = {}) {
          let a = e.css.valueOf(),
            u = r.ignoreErrors,
            l,
            c,
            p,
            h,
            f,
            d,
            m,
            y,
            g,
            v,
            w = a.length,
            b = 0,
            x = [],
            k = [],
            O = -1;
          function T(r) {
            throw e.error('Unclosed ' + r, b);
          }
          return {
            back: function (e) {
              k.push(e);
            },
            endOfFile: function () {
              return 0 === k.length && b >= w;
            },
            nextToken: function (e) {
              if (k.length) return k.pop();
              if (b >= w) return;
              let r = !!e && e.ignoreUnclosed;
              switch ((l = a.charCodeAt(b))) {
                case 10:
                case 32:
                case 9:
                case 13:
                case 12:
                  h = b;
                  do ((h += 1), (l = a.charCodeAt(h)));
                  while (
                    32 === l ||
                    10 === l ||
                    9 === l ||
                    13 === l ||
                    12 === l
                  );
                  ((d = ['space', a.slice(b, h)]), (b = h - 1));
                  break;
                case 91:
                case 93:
                case 123:
                case 125:
                case 58:
                case 59:
                case 41: {
                  let e = String.fromCharCode(l);
                  d = [e, e, b];
                  break;
                }
                case 40:
                  if (
                    ((v = x.length ? x.pop()[1] : ''),
                    (g = a.charCodeAt(b + 1)),
                    'url' === v &&
                      39 !== g &&
                      34 !== g &&
                      32 !== g &&
                      10 !== g &&
                      9 !== g &&
                      12 !== g &&
                      13 !== g)
                  ) {
                    h = b;
                    do {
                      if (((m = !1), -1 === (h = a.indexOf(')', h + 1))))
                        if (u || r) {
                          h = b;
                          break;
                        } else T('bracket');
                      for (y = h; 92 === a.charCodeAt(y - 1);)
                        ((y -= 1), (m = !m));
                    } while (m);
                    ((d = ['brackets', a.slice(b, h + 1), b, h]), (b = h));
                  } else
                    b <= O
                      ? (d = ['(', '(', b])
                      : ((h = a.indexOf(')', b + 1)),
                        (c = a.slice(b, h + 1)),
                        -1 === h || o.test(c)
                          ? ((O = -1 === h ? w : h), (d = ['(', '(', b]))
                          : ((d = ['brackets', c, b, h]), (b = h)));
                  break;
                case 39:
                case 34:
                  ((f = 39 === l ? "'" : '"'), (h = b));
                  do {
                    if (((m = !1), -1 === (h = a.indexOf(f, h + 1))))
                      if (u || r) {
                        h = b + 1;
                        break;
                      } else T('string');
                    for (y = h; 92 === a.charCodeAt(y - 1);)
                      ((y -= 1), (m = !m));
                  } while (m);
                  ((d = ['string', a.slice(b, h + 1), b, h]), (b = h));
                  break;
                case 64:
                  ((s.lastIndex = b + 1),
                    s.test(a),
                    (h = 0 === s.lastIndex ? a.length - 1 : s.lastIndex - 2),
                    (d = ['at-word', a.slice(b, h + 1), b, h]),
                    (b = h));
                  break;
                case 92:
                  for (h = b, p = !0; 92 === a.charCodeAt(h + 1);)
                    ((h += 1), (p = !p));
                  if (
                    ((l = a.charCodeAt(h + 1)),
                    p &&
                      47 !== l &&
                      32 !== l &&
                      10 !== l &&
                      9 !== l &&
                      13 !== l &&
                      12 !== l &&
                      ((h += 1), i.test(a.charAt(h))))
                  ) {
                    for (; i.test(a.charAt(h + 1));) h += 1;
                    32 === a.charCodeAt(h + 1) && (h += 1);
                  }
                  ((d = ['word', a.slice(b, h + 1), b, h]), (b = h));
                  break;
                default:
                  (47 === l && 42 === a.charCodeAt(b + 1)
                    ? (0 === (h = a.indexOf('*/', b + 2) + 1) &&
                        (u || r ? (h = a.length) : T('comment')),
                      (d = ['comment', a.slice(b, h + 1), b, h]))
                    : ((n.lastIndex = b + 1),
                      n.test(a),
                      (h = 0 === n.lastIndex ? a.length - 1 : n.lastIndex - 2),
                      (d = ['word', a.slice(b, h + 1), b, h]),
                      x.push(d)),
                    (b = h));
              }
              return (b++, d);
            },
            position: function () {
              return b;
            }
          };
        };
      }),
      P = c((e, r) => {
        'use strict';
        var s = C(),
          n = b(),
          o = x(),
          i = A(),
          a = j(),
          u = I(),
          l = { empty: !0, space: !0 };
        function c(e, r, s) {
          let n = '';
          for (let o = r; o < s; o++) n += e[o][1];
          return n;
        }
        r.exports = class {
          constructor(e) {
            ((this.input = e),
              (this.root = new i()),
              (this.current = this.root),
              (this.spaces = ''),
              (this.semicolon = !1),
              this.createTokenizer(),
              (this.root.source = {
                input: e,
                start: { column: 1, line: 1, offset: 0 }
              }));
          }
          atrule(e) {
            let r = new s();
            ((r.name = e[1].slice(1)),
              '' === r.name && this.unnamedAtrule(r, e),
              this.init(r, e[2]));
            let n,
              o,
              i,
              a = !1,
              u = !1,
              l = [],
              c = [];
            for (; !this.tokenizer.endOfFile();) {
              if (
                ('(' === (n = (e = this.tokenizer.nextToken())[0]) || '[' === n
                  ? c.push('(' === n ? ')' : ']')
                  : '{' === n && c.length > 0
                    ? c.push('}')
                    : n === c[c.length - 1] && c.pop(),
                0 === c.length)
              )
                if (';' === n) {
                  ((r.source.end = this.getPosition(e[2])),
                    r.source.end.offset++,
                    (this.semicolon = !0));
                  break;
                } else if ('{' === n) {
                  u = !0;
                  break;
                } else if ('}' === n) {
                  if (l.length > 0) {
                    for (i = l.length - 1, o = l[i]; o && 'space' === o[0];)
                      o = l[--i];
                    o &&
                      ((r.source.end = this.getPosition(o[3] || o[2])),
                      r.source.end.offset++);
                  }
                  this.end(e);
                  break;
                } else l.push(e);
              else l.push(e);
              if (this.tokenizer.endOfFile()) {
                a = !0;
                break;
              }
            }
            ((r.raws.between = this.spacesAndCommentsFromEnd(l)),
              l.length
                ? ((r.raws.afterName = this.spacesAndCommentsFromStart(l)),
                  this.raw(r, 'params', l),
                  a &&
                    ((e = l[l.length - 1]),
                    (r.source.end = this.getPosition(e[3] || e[2])),
                    r.source.end.offset++,
                    (this.spaces = r.raws.between),
                    (r.raws.between = '')))
                : ((r.raws.afterName = ''), (r.params = '')),
              u && ((r.nodes = []), (this.current = r)));
          }
          checkMissedSemicolon(e) {
            let r = this.colon(e);
            if (!1 === r) return;
            let s = 0,
              n;
            for (
              let o = r - 1;
              o >= 0 && ('space' === (n = e[o])[0] || 2 !== (s += 1));
              o--
            );
            throw this.input.error(
              'Missed semicolon',
              'word' === n[0] ? n[3] + 1 : n[2]
            );
          }
          colon(e) {
            let r = 0,
              s,
              n;
            for (let [o, i] of e.entries()) {
              if (
                ('(' === (n = i[0]) && (r += 1),
                ')' === n && (r -= 1),
                0 === r && ':' === n)
              )
                if (s) {
                  if ('word' === s[0] && 'progid' === s[1]) continue;
                  return o;
                } else this.doubleColon(i);
              s = i;
            }
            return !1;
          }
          comment(e) {
            let r = new n();
            (this.init(r, e[2]),
              (r.source.end = this.getPosition(e[3] || e[2])),
              r.source.end.offset++);
            let s = e[1].slice(2, -2);
            if (s.trim()) {
              let e = s.match(/^(\s*)([^]*\S)(\s*)$/);
              ((r.text = e[2]), (r.raws.left = e[1]), (r.raws.right = e[3]));
            } else ((r.text = ''), (r.raws.left = s), (r.raws.right = ''));
          }
          createTokenizer() {
            this.tokenizer = u(this.input);
          }
          decl(e, r) {
            let s = new o();
            this.init(s, e[0][2]);
            let n = e[e.length - 1];
            (';' === n[0] && ((this.semicolon = !0), e.pop()),
              (s.source.end = this.getPosition(
                n[3] ||
                  n[2] ||
                  (function (e) {
                    for (let r = e.length - 1; r >= 0; r--) {
                      let s = e[r],
                        n = s[3] || s[2];
                      if (n) return n;
                    }
                  })(e)
              )),
              s.source.end.offset++);
            let i = 0;
            for (; 'word' !== e[i][0];)
              (i === e.length - 1 && this.unknownWord([e[i]]), i++);
            ((s.raws.before += c(e, 0, i)),
              (s.source.start = this.getPosition(e[i][2])));
            let a = i;
            for (; i < e.length;) {
              let r = e[i][0];
              if (':' === r || 'space' === r || 'comment' === r) break;
              i++;
            }
            s.prop = c(e, a, i);
            let u = i,
              l;
            for (; i < e.length && ((l = e[i]), i++, ':' !== l[0]);)
              'word' === l[0] && /\w/.test(l[1]) && this.unknownWord([l]);
            ((s.raws.between = c(e, u, i)),
              ('_' === s.prop[0] || '*' === s.prop[0]) &&
                ((s.raws.before += s.prop[0]), (s.prop = s.prop.slice(1))));
            let p = i;
            for (; i < e.length;) {
              let r = e[i][0];
              if ('space' !== r && 'comment' !== r) break;
              i++;
            }
            let h = e.slice(p, i);
            ((e = e.slice(i)), this.precheckMissedSemicolon(e));
            for (let r = e.length - 1; r >= 0; r--) {
              if ('!important' === (l = e[r])[1].toLowerCase()) {
                s.important = !0;
                let n = this.stringFrom(e, r);
                ' !important' !== (n = this.spacesFromEnd(e) + n) &&
                  (s.raws.important = n);
                break;
              }
              if ('important' === l[1].toLowerCase()) {
                let n = e.slice(0),
                  o = '';
                for (let e = r; e > 0; e--) {
                  let r = n[e][0];
                  if (o.trim().startsWith('!') && 'space' !== r) break;
                  o = n.pop()[1] + o;
                }
                o.trim().startsWith('!') &&
                  ((s.important = !0), (s.raws.important = o), (e = n));
              }
              if ('space' !== l[0] && 'comment' !== l[0]) break;
            }
            (e.some(e => 'space' !== e[0] && 'comment' !== e[0]) &&
              ((s.raws.between += h.map(e => e[1]).join('')), (h = [])),
              this.raw(s, 'value', h.concat(e), r),
              s.value.includes(':') && !r && this.checkMissedSemicolon(e));
          }
          doubleColon(e) {
            throw this.input.error(
              'Double colon',
              { offset: e[2] },
              { offset: e[2] + e[1].length }
            );
          }
          emptyRule(e) {
            let r = new a();
            (this.init(r, e[2]),
              (r.selector = ''),
              (r.raws.between = ''),
              (this.current = r));
          }
          end(e) {
            (this.current.nodes &&
              this.current.nodes.length &&
              (this.current.raws.semicolon = this.semicolon),
              (this.semicolon = !1),
              (this.current.raws.after =
                (this.current.raws.after || '') + this.spaces),
              (this.spaces = ''),
              this.current.parent
                ? ((this.current.source.end = this.getPosition(e[2])),
                  this.current.source.end.offset++,
                  (this.current = this.current.parent))
                : this.unexpectedClose(e));
          }
          endFile() {
            (this.current.parent && this.unclosedBlock(),
              this.current.nodes &&
                this.current.nodes.length &&
                (this.current.raws.semicolon = this.semicolon),
              (this.current.raws.after =
                (this.current.raws.after || '') + this.spaces),
              (this.root.source.end = this.getPosition(
                this.tokenizer.position()
              )));
          }
          freeSemicolon(e) {
            if (((this.spaces += e[1]), this.current.nodes)) {
              let r = this.current.nodes[this.current.nodes.length - 1];
              r &&
                'rule' === r.type &&
                !r.raws.ownSemicolon &&
                ((r.raws.ownSemicolon = this.spaces),
                (this.spaces = ''),
                (r.source.end = this.getPosition(e[2])),
                (r.source.end.offset += r.raws.ownSemicolon.length));
            }
          }
          getPosition(e) {
            let r = this.input.fromOffset(e);
            return { column: r.col, line: r.line, offset: e };
          }
          init(e, r) {
            (this.current.push(e),
              (e.source = { input: this.input, start: this.getPosition(r) }),
              (e.raws.before = this.spaces),
              (this.spaces = ''),
              'comment' !== e.type && (this.semicolon = !1));
          }
          other(e) {
            let r = !1,
              s = null,
              n = !1,
              o = null,
              i = [],
              a = e[1].startsWith('--'),
              u = [],
              l = e;
            for (; l;) {
              if (((s = l[0]), u.push(l), '(' === s || '[' === s))
                (o || (o = l), i.push('(' === s ? ')' : ']'));
              else if (a && n && '{' === s) (o || (o = l), i.push('}'));
              else if (0 === i.length)
                if (';' === s)
                  if (n) return void this.decl(u, a);
                  else break;
                else if ('{' === s) return void this.rule(u);
                else if ('}' === s) {
                  (this.tokenizer.back(u.pop()), (r = !0));
                  break;
                } else ':' === s && (n = !0);
              else
                s === i[i.length - 1] &&
                  (i.pop(), 0 === i.length && (o = null));
              l = this.tokenizer.nextToken();
            }
            if (
              (this.tokenizer.endOfFile() && (r = !0),
              i.length > 0 && this.unclosedBracket(o),
              r && n)
            ) {
              if (!a)
                for (
                  ;
                  u.length &&
                  ('space' === (l = u[u.length - 1][0]) || 'comment' === l);
                )
                  this.tokenizer.back(u.pop());
              this.decl(u, a);
            } else this.unknownWord(u);
          }
          parse() {
            let e;
            for (; !this.tokenizer.endOfFile();)
              switch ((e = this.tokenizer.nextToken())[0]) {
                case 'space':
                  this.spaces += e[1];
                  break;
                case ';':
                  this.freeSemicolon(e);
                  break;
                case '}':
                  this.end(e);
                  break;
                case 'comment':
                  this.comment(e);
                  break;
                case 'at-word':
                  this.atrule(e);
                  break;
                case '{':
                  this.emptyRule(e);
                  break;
                default:
                  this.other(e);
              }
            this.endFile();
          }
          precheckMissedSemicolon() {}
          raw(e, r, s, n) {
            let o,
              i,
              a = s.length,
              u = '',
              c = !0,
              p,
              h;
            for (let e = 0; e < a; e += 1)
              'space' !== (i = (o = s[e])[0]) || e !== a - 1 || n
                ? 'comment' === i
                  ? ((h = s[e - 1] ? s[e - 1][0] : 'empty'),
                    (p = s[e + 1] ? s[e + 1][0] : 'empty'),
                    l[h] || l[p] || ',' === u.slice(-1)
                      ? (c = !1)
                      : (u += o[1]))
                  : (u += o[1])
                : (c = !1);
            if (!c) {
              let n = s.reduce((e, r) => e + r[1], '');
              e.raws[r] = { raw: n, value: u };
            }
            e[r] = u;
          }
          rule(e) {
            e.pop();
            let r = new a();
            (this.init(r, e[0][2]),
              (r.raws.between = this.spacesAndCommentsFromEnd(e)),
              this.raw(r, 'selector', e),
              (this.current = r));
          }
          spacesAndCommentsFromEnd(e) {
            let r,
              s = '';
            for (
              ;
              e.length &&
              ('space' === (r = e[e.length - 1][0]) || 'comment' === r);
            )
              s = e.pop()[1] + s;
            return s;
          }
          spacesAndCommentsFromStart(e) {
            let r,
              s = '';
            for (; e.length && ('space' === (r = e[0][0]) || 'comment' === r);)
              s += e.shift()[1];
            return s;
          }
          spacesFromEnd(e) {
            let r = '';
            for (; e.length && 'space' === e[e.length - 1][0];)
              r = e.pop()[1] + r;
            return r;
          }
          stringFrom(e, r) {
            let s = '';
            for (let n = r; n < e.length; n++) s += e[n][1];
            return (e.splice(r, e.length - r), s);
          }
          unclosedBlock() {
            let e = this.current.source.start;
            throw this.input.error('Unclosed block', e.line, e.column);
          }
          unclosedBracket(e) {
            throw this.input.error(
              'Unclosed bracket',
              { offset: e[2] },
              { offset: e[2] + 1 }
            );
          }
          unexpectedClose(e) {
            throw this.input.error(
              'Unexpected }',
              { offset: e[2] },
              { offset: e[2] + 1 }
            );
          }
          unknownWord(e) {
            throw this.input.error(
              'Unknown word ' + e[0][1],
              { offset: e[0][2] },
              { offset: e[0][2] + e[0][1].length }
            );
          }
          unnamedAtrule(e, r) {
            throw this.input.error(
              'At-rule without name',
              { offset: r[2] },
              { offset: r[2] + r[1].length }
            );
          }
        };
      }),
      M = c((e, r) => {
        'use strict';
        var s = k(),
          n = S(),
          o = P();
        function i(e, r) {
          let s = new o(new n(e, r));
          try {
            s.parse();
          } catch (e) {
            throw e;
          }
          return s.root;
        }
        ((r.exports = i), (i.default = i), s.registerParse(i));
      }),
      N = c((e, r) => {
        var s = I(),
          n = S();
        r.exports = {
          isInlineComment(e) {
            if ('word' === e[0] && '//' === e[1].slice(0, 2)) {
              let r = e,
                o = [],
                i,
                a;
              for (; e;) {
                if (/\r?\n/.test(e[1])) {
                  if (/['"].*\r?\n/.test(e[1])) {
                    (o.push(
                      e[1].substring(
                        0,
                        e[1].indexOf(`
`)
                      )
                    ),
                      (a = e[1].substring(
                        e[1].indexOf(`
`)
                      )));
                    let r = this.input.css
                      .valueOf()
                      .substring(this.tokenizer.position());
                    ((a += r), (i = e[3] + r.length - a.length));
                  } else this.tokenizer.back(e);
                  break;
                }
                (o.push(e[1]),
                  (i = e[2]),
                  (e = this.tokenizer.nextToken({ ignoreUnclosed: !0 })));
              }
              let u = ['comment', o.join(''), r[2], i];
              return (
                this.inlineComment(u),
                a &&
                  ((this.input = new n(a)), (this.tokenizer = s(this.input))),
                !0
              );
            }
            if ('/' === e[1]) {
              let s = this.tokenizer.nextToken({ ignoreUnclosed: !0 });
              if ('comment' === s[0] && /^\/\*/.test(s[1]))
                return (
                  (s[0] = 'word'),
                  (s[1] = s[1].slice(1)),
                  (e[1] = '//'),
                  this.tokenizer.back(s),
                  r.exports.isInlineComment.bind(this)(e)
                );
            }
            return !1;
          }
        };
      }),
      $ = c((e, r) => {
        r.exports = {
          interpolation(e) {
            let r = [e, this.tokenizer.nextToken()],
              s = ['word', '}'];
            if (r[0][1].length > 1 || '{' !== r[1][0])
              return (this.tokenizer.back(r[1]), !1);
            for (e = this.tokenizer.nextToken(); e && s.includes(e[0]);)
              (r.push(e), (e = this.tokenizer.nextToken()));
            let n = r.map(e => e[1]),
              [o] = r,
              i = r.pop(),
              a = ['word', n.join(''), o[2], i[2]];
            return (this.tokenizer.back(e), this.tokenizer.back(a), !0);
          }
        };
      }),
      R = c((e, r) => {
        var s = /^#[0-9a-fA-F]{6}$|^#[0-9a-fA-F]{3}$/,
          n = /\.[0-9]/;
        r.exports = {
          isMixinToken: e => {
            let [, r] = e,
              [o] = r;
            return (
              ('.' === o || '#' === o) && !1 === s.test(r) && !1 === n.test(r)
            );
          }
        };
      }),
      W = c((e, r) => {
        var s = I(),
          n = /^url\((.+)\)/;
        r.exports = e => {
          let { name: r, params: o = '' } = e;
          if ('import' === r && o.length) {
            e.import = !0;
            let r = s({ css: o });
            for (e.filename = o.replace(n, '$1'); !r.endOfFile();) {
              let [s, n] = r.nextToken();
              if ('word' === s && 'url' === n) return;
              if ('brackets' === s) {
                ((e.options = n), (e.filename = o.replace(n, '').trim()));
                break;
              }
            }
          }
        };
      }),
      L = c((e, r) => {
        var s = /:$/,
          n = /^:(\s+)?/;
        r.exports = e => {
          let { name: r, params: o = '' } = e;
          if (':' === e.name.slice(-1)) {
            if (s.test(r)) {
              let [n] = r.match(s);
              ((e.name = r.replace(n, '')),
                (e.raws.afterName = n + (e.raws.afterName || '')),
                (e.variable = !0),
                (e.value = e.params));
            }
            if (n.test(o)) {
              let [r] = o.match(n);
              ((e.value = o.replace(r, '')),
                (e.raws.afterName = (e.raws.afterName || '') + r),
                (e.variable = !0));
            }
          }
        };
      }),
      z = c((e, r) => {
        var s = b(),
          n = P(),
          { isInlineComment: o } = N(),
          { interpolation: i } = $(),
          { isMixinToken: a } = R(),
          u = W(),
          l = L(),
          c = /(!\s*important)$/i;
        r.exports = class extends n {
          constructor(...e) {
            (super(...e), (this.lastNode = null));
          }
          atrule(e) {
            i.bind(this)(e) ||
              (super.atrule(e), u(this.lastNode), l(this.lastNode));
          }
          decl(...e) {
            (super.decl(...e),
              /extend\(.+\)/i.test(this.lastNode.value) &&
                (this.lastNode.extend = !0));
          }
          each(e) {
            e[0][1] = ` ${e[0][1]}`;
            let r = e.findIndex(e => '(' === e[0]),
              s = e.reverse().find(e => ')' === e[0]),
              n = e.reverse().indexOf(s),
              o = e
                .splice(r, n)
                .map(e => e[1])
                .join('');
            for (let r of e.reverse()) this.tokenizer.back(r);
            (this.atrule(this.tokenizer.nextToken()),
              (this.lastNode.function = !0),
              (this.lastNode.params = o));
          }
          init(e, r, s) {
            (super.init(e, r, s), (this.lastNode = e));
          }
          inlineComment(e) {
            let r = new s(),
              n = e[1].slice(2);
            if (
              (this.init(r, e[2]),
              (r.source.end = this.getPosition(e[3] || e[2])),
              (r.inline = !0),
              (r.raws.begin = '//'),
              /^\s*$/.test(n))
            )
              ((r.text = ''), (r.raws.left = n), (r.raws.right = ''));
            else {
              let e = n.match(/^(\s*)([^]*[^\s])(\s*)$/);
              [, r.raws.left, r.text, r.raws.right] = e;
            }
          }
          mixin(e) {
            let [r] = e,
              s = r[1].slice(0, 1),
              n = e.findIndex(e => 'brackets' === e[0]),
              o = e.findIndex(e => '(' === e[0]),
              i = '';
            if ((n < 0 || n > 3) && o > 0) {
              let r = e.reduce((e, r, s) => (')' === r[0] ? s : e)),
                s = e
                  .slice(o, r + o)
                  .map(e => e[1])
                  .join(''),
                [n] = e.slice(o),
                i = [n[2], n[3]],
                [a] = e.slice(r, r + 1),
                u = ['brackets', s].concat(i, [a[2], a[3]]),
                l = e.slice(0, o),
                c = e.slice(r + 1);
              ((e = l).push(u), (e = e.concat(c)));
            }
            let a = [];
            for (let r of e)
              if (
                (('!' === r[1] || a.length) && a.push(r), 'important' === r[1])
              )
                break;
            if (a.length) {
              let [r] = a,
                s = e.indexOf(r),
                n = a[a.length - 1],
                o = [r[2], r[3]],
                i = [n[4], n[5]],
                u = ['word', a.map(e => e[1]).join('')].concat(o, i);
              e.splice(s, a.length, u);
            }
            let u = e.findIndex(e => c.test(e[1]));
            for (let r of (u > 0 && (([, i] = e[u]), e.splice(u, 1)),
            e.reverse()))
              this.tokenizer.back(r);
            (this.atrule(this.tokenizer.nextToken()),
              (this.lastNode.mixin = !0),
              (this.lastNode.raws.identifier = s),
              i &&
                ((this.lastNode.important = !0),
                (this.lastNode.raws.important = i)));
          }
          other(e) {
            o.bind(this)(e) || super.other(e);
          }
          rule(e) {
            let r = e[e.length - 1],
              s = e[e.length - 2];
            if (
              'at-word' === s[0] &&
              '{' === r[0] &&
              (this.tokenizer.back(r), i.bind(this)(s))
            ) {
              let r = this.tokenizer.nextToken();
              for (let s of (e = e
                .slice(0, e.length - 2)
                .concat([r])).reverse())
                this.tokenizer.back(s);
              return;
            }
            (super.rule(e),
              /:extend\(.+\)/i.test(this.lastNode.selector) &&
                (this.lastNode.extend = !0));
          }
          unknownWord(e) {
            let [r] = e;
            'each' === e[0][1] && '(' === e[1][0]
              ? this.each(e)
              : a(r)
                ? this.mixin(e)
                : super.unknownWord(e);
          }
        };
      }),
      B = c((e, r) => {
        var s = y();
        r.exports = class extends s {
          atrule(e, r) {
            if (!e.mixin && !e.variable && !e.function)
              return void super.atrule(e, r);
            let s = `${e.function ? '' : e.raws.identifier || '@'}${e.name}`,
              n = e.params ? this.rawValue(e, 'params') : '',
              o = e.raws.important || '';
            if (
              (e.variable && (n = e.value),
              'u' > typeof e.raws.afterName
                ? (s += e.raws.afterName)
                : n && (s += ' '),
              e.nodes)
            )
              this.block(e, s + n + o);
            else {
              let i = (e.raws.between || '') + o + (r ? ';' : '');
              this.builder(s + n + i, e);
            }
          }
          comment(e) {
            if (e.inline) {
              let r = this.raw(e, 'left', 'commentLeft'),
                s = this.raw(e, 'right', 'commentRight');
              this.builder(`//${r}${e.text}${s}`, e);
            } else super.comment(e);
          }
        };
      }),
      q = c((e, r) => {
        var s = S(),
          n = z(),
          o = B();
        r.exports = {
          parse(e, r) {
            let o = new s(e, r),
              i = new n(o);
            return (
              i.parse(),
              i.root.walk(e => {
                let r = o.css.lastIndexOf(e.source.input.css);
                if (0 === r) return;
                if (r + e.source.input.css.length !== o.css.length)
                  throw Error('Invalid state detected in postcss-less');
                let s = r + e.source.start.offset,
                  n = o.fromOffset(r + e.source.start.offset);
                if (
                  ((e.source.start = {
                    offset: s,
                    line: n.line,
                    column: n.col
                  }),
                  e.source.end)
                ) {
                  let s = r + e.source.end.offset,
                    n = o.fromOffset(r + e.source.end.offset);
                  e.source.end = { offset: s, line: n.line, column: n.col };
                }
              }),
              i.root
            );
          },
          stringify(e, r) {
            new o(r).stringify(e);
          },
          nodeToString(e) {
            let s = '';
            return (
              r.exports.stringify(e, e => {
                s += e;
              }),
              s
            );
          }
        };
      }),
      D = c((e, r) => {
        'use strict';
        var s,
          n,
          o = k(),
          i = class extends o {
            constructor(e) {
              (super({ type: 'document', ...e }),
                this.nodes || (this.nodes = []));
            }
            toResult(e = {}) {
              return new s(new n(), this, e).stringify();
            }
          };
        ((i.registerLazyResult = e => {
          s = e;
        }),
          (i.registerProcessor = e => {
            n = e;
          }),
          (r.exports = i),
          (i.default = i));
      }),
      F = c((e, r) => {
        'use strict';
        var s = C(),
          n = b(),
          o = x(),
          i = S(),
          a = _(),
          u = A(),
          l = j();
        function c(e, r) {
          let p, h;
          if (Array.isArray(e)) return e.map(e => c(e));
          let { inputs: f, ...d } = e;
          if (f)
            for (let e of ((r = []), f)) {
              let s = { ...e, __proto__: i.prototype };
              (s.map && (s.map = { ...s.map, __proto__: a.prototype }),
                r.push(s));
            }
          if (
            (d.nodes && ((p = e.nodes.map(e => c(e, r))), delete d.nodes),
            d.source)
          ) {
            let { inputId: e, ...s } = d.source;
            ((d.source = s), null != e && (d.source.input = r[e]));
          }
          if ('root' === d.type) h = new u(d);
          else if ('decl' === d.type) h = new o(d);
          else if ('rule' === d.type) h = new l(d);
          else if ('comment' === d.type) h = new n(d);
          else if ('atrule' === d.type) h = new s(d);
          else throw Error('Unknown node type: ' + e.type);
          if (p) for (let e of ((h.nodes = p), p)) e.parent = h;
          return h;
        }
        ((r.exports = c), (c.default = c));
      }),
      U = c((e, r) => {
        r.exports = class {
          generate() {}
        };
      }),
      V = c((e, r) => {
        'use strict';
        var s = class {
          constructor(e, r = {}) {
            if (
              ((this.type = 'warning'),
              (this.text = e),
              r.node && r.node.source)
            ) {
              let e = r.node.rangeBy(r);
              ((this.line = e.start.line),
                (this.column = e.start.column),
                (this.endLine = e.end.line),
                (this.endColumn = e.end.column));
            }
            for (let e in r) this[e] = r[e];
          }
          toString() {
            return this.node
              ? this.node.error(this.text, {
                  index: this.index,
                  plugin: this.plugin,
                  word: this.word
                }).message
              : this.plugin
                ? this.plugin + ': ' + this.text
                : this.text;
          }
        };
        ((r.exports = s), (s.default = s));
      }),
      G = c((e, r) => {
        'use strict';
        var s = V(),
          n = class {
            get content() {
              return this.css;
            }
            constructor(e, r, s) {
              ((this.processor = e),
                (this.messages = []),
                (this.root = r),
                (this.opts = s),
                (this.css = ''),
                (this.map = void 0));
            }
            toString() {
              return this.css;
            }
            warn(e, r = {}) {
              r.plugin ||
                (this.lastPlugin &&
                  this.lastPlugin.postcssPlugin &&
                  (r.plugin = this.lastPlugin.postcssPlugin));
              let n = new s(e, r);
              return (this.messages.push(n), n);
            }
            warnings() {
              return this.messages.filter(e => 'warning' === e.type);
            }
          };
        ((r.exports = n), (n.default = n));
      }),
      J = c((e, r) => {
        'use strict';
        var s = {};
        r.exports = function (e) {
          s[e] ||
            ((s[e] = !0),
            'u' > typeof console && console.warn && console.warn(e));
        };
      }),
      H = c((e, r) => {
        'use strict';
        var s = k(),
          n = D(),
          o = U(),
          i = M(),
          a = G(),
          u = A(),
          l = g(),
          { isClean: c, my: p } = v(),
          h =
            (J(),
            {
              atrule: 'AtRule',
              comment: 'Comment',
              decl: 'Declaration',
              document: 'Document',
              root: 'Root',
              rule: 'Rule'
            }),
          f = {
            AtRule: !0,
            AtRuleExit: !0,
            Comment: !0,
            CommentExit: !0,
            Declaration: !0,
            DeclarationExit: !0,
            Document: !0,
            DocumentExit: !0,
            Once: !0,
            OnceExit: !0,
            postcssPlugin: !0,
            prepare: !0,
            Root: !0,
            RootExit: !0,
            Rule: !0,
            RuleExit: !0
          },
          d = { Once: !0, postcssPlugin: !0, prepare: !0 };
        function m(e) {
          return 'object' == typeof e && 'function' == typeof e.then;
        }
        function y(e) {
          let r = !1,
            s = h[e.type];
          return (
            'decl' === e.type
              ? (r = e.prop.toLowerCase())
              : 'atrule' === e.type && (r = e.name.toLowerCase()),
            r && e.append
              ? [s, s + '-' + r, 0, s + 'Exit', s + 'Exit-' + r]
              : r
                ? [s, s + '-' + r, s + 'Exit', s + 'Exit-' + r]
                : e.append
                  ? [s, 0, s + 'Exit']
                  : [s, s + 'Exit']
          );
        }
        function w(e) {
          return {
            eventIndex: 0,
            events:
              'document' === e.type
                ? ['Document', 0, 'DocumentExit']
                : 'root' === e.type
                  ? ['Root', 0, 'RootExit']
                  : y(e),
            iterator: 0,
            node: e,
            visitorIndex: 0,
            visitors: []
          };
        }
        function b(e) {
          return ((e[c] = !1), e.nodes && e.nodes.forEach(e => b(e)), e);
        }
        var x = {},
          O = class t {
            get content() {
              return this.stringify().content;
            }
            get css() {
              return this.stringify().css;
            }
            get map() {
              return this.stringify().map;
            }
            get messages() {
              return this.sync().messages;
            }
            get opts() {
              return this.result.opts;
            }
            get processor() {
              return this.result.processor;
            }
            get root() {
              return this.sync().root;
            }
            get [Symbol.toStringTag]() {
              return 'LazyResult';
            }
            constructor(e, r, n) {
              let o;
              if (
                ((this.stringified = !1),
                (this.processed = !1),
                'object' == typeof r &&
                  null !== r &&
                  ('root' === r.type || 'document' === r.type))
              )
                o = b(r);
              else if (r instanceof t || r instanceof a)
                ((o = b(r.root)),
                  r.map &&
                    (typeof n.map > 'u' && (n.map = {}),
                    n.map.inline || (n.map.inline = !1),
                    (n.map.prev = r.map)));
              else {
                let e = i;
                (n.syntax && (e = n.syntax.parse),
                  n.parser && (e = n.parser),
                  e.parse && (e = e.parse));
                try {
                  o = e(r, n);
                } catch (e) {
                  ((this.processed = !0), (this.error = e));
                }
                o && !o[p] && s.rebuild(o);
              }
              ((this.result = new a(e, o, n)),
                (this.helpers = { ...x, postcss: x, result: this.result }),
                (this.plugins = this.processor.plugins.map(e =>
                  'object' == typeof e && e.prepare
                    ? { ...e, ...e.prepare(this.result) }
                    : e
                )));
            }
            async() {
              return this.error
                ? Promise.reject(this.error)
                : this.processed
                  ? Promise.resolve(this.result)
                  : (this.processing || (this.processing = this.runAsync()),
                    this.processing);
            }
            catch(e) {
              return this.async().catch(e);
            }
            finally(e) {
              return this.async().then(e, e);
            }
            getAsyncError() {
              throw Error(
                'Use process(css).then(cb) to work with async plugins'
              );
            }
            handleError(e, r) {
              let s = this.result.lastPlugin;
              try {
                (r && r.addToError(e),
                  (this.error = e),
                  'CssSyntaxError' !== e.name || e.plugin
                    ? s.postcssVersion
                    : ((e.plugin = s.postcssPlugin), e.setMessage()));
              } catch (e) {
                console && console.error && console.error(e);
              }
              return e;
            }
            prepareVisitors() {
              this.listeners = {};
              let e = (e, r, s) => {
                (this.listeners[r] || (this.listeners[r] = []),
                  this.listeners[r].push([e, s]));
              };
              for (let r of this.plugins)
                if ('object' == typeof r)
                  for (let s in r) {
                    if (!f[s] && /^[A-Z]/.test(s))
                      throw Error(
                        `Unknown event ${s} in ${r.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
                      );
                    if (!d[s])
                      if ('object' == typeof r[s])
                        for (let n in r[s])
                          e(
                            r,
                            '*' === n ? s : s + '-' + n.toLowerCase(),
                            r[s][n]
                          );
                      else 'function' == typeof r[s] && e(r, s, r[s]);
                  }
              this.hasListener = Object.keys(this.listeners).length > 0;
            }
            async runAsync() {
              this.plugin = 0;
              for (let e = 0; e < this.plugins.length; e++) {
                let r = this.plugins[e],
                  s = this.runOnRoot(r);
                if (m(s))
                  try {
                    await s;
                  } catch (e) {
                    throw this.handleError(e);
                  }
              }
              if ((this.prepareVisitors(), this.hasListener)) {
                let e = this.result.root;
                for (; !e[c];) {
                  e[c] = !0;
                  let r = [w(e)];
                  for (; r.length > 0;) {
                    let e = this.visitTick(r);
                    if (m(e))
                      try {
                        await e;
                      } catch (s) {
                        let e = r[r.length - 1].node;
                        throw this.handleError(s, e);
                      }
                  }
                }
                if (this.listeners.OnceExit)
                  for (let [r, s] of this.listeners.OnceExit) {
                    this.result.lastPlugin = r;
                    try {
                      if ('document' === e.type) {
                        let r = e.nodes.map(e => s(e, this.helpers));
                        await Promise.all(r);
                      } else await s(e, this.helpers);
                    } catch (e) {
                      throw this.handleError(e);
                    }
                  }
              }
              return ((this.processed = !0), this.stringify());
            }
            runOnRoot(e) {
              this.result.lastPlugin = e;
              try {
                if ('object' == typeof e && e.Once) {
                  if ('document' === this.result.root.type) {
                    let r = this.result.root.nodes.map(r =>
                      e.Once(r, this.helpers)
                    );
                    return m(r[0]) ? Promise.all(r) : r;
                  }
                  return e.Once(this.result.root, this.helpers);
                }
                if ('function' == typeof e)
                  return e(this.result.root, this.result);
              } catch (e) {
                throw this.handleError(e);
              }
            }
            stringify() {
              if (this.error) throw this.error;
              if (this.stringified) return this.result;
              ((this.stringified = !0), this.sync());
              let e = this.result.opts,
                r = l;
              (e.syntax && (r = e.syntax.stringify),
                e.stringifier && (r = e.stringifier),
                r.stringify && (r = r.stringify));
              let s = this.result.root.source;
              if (void 0 === e.map && !(s && s.input && s.input.map)) {
                let e = '';
                return (
                  r(this.result.root, r => {
                    e += r;
                  }),
                  (this.result.css = e),
                  this.result
                );
              }
              let n = new o(r, this.result.root, this.result.opts).generate();
              return (
                (this.result.css = n[0]),
                (this.result.map = n[1]),
                this.result
              );
            }
            sync() {
              if (this.error) throw this.error;
              if (this.processed) return this.result;
              if (((this.processed = !0), this.processing))
                throw this.getAsyncError();
              for (let e of this.plugins)
                if (m(this.runOnRoot(e))) throw this.getAsyncError();
              if ((this.prepareVisitors(), this.hasListener)) {
                let e = this.result.root;
                for (; !e[c];) ((e[c] = !0), this.walkSync(e));
                if (this.listeners.OnceExit)
                  if ('document' === e.type)
                    for (let r of e.nodes)
                      this.visitSync(this.listeners.OnceExit, r);
                  else this.visitSync(this.listeners.OnceExit, e);
              }
              return this.result;
            }
            then(e, r) {
              return this.async().then(e, r);
            }
            toString() {
              return this.css;
            }
            visitSync(e, r) {
              for (let [s, n] of e) {
                let e;
                this.result.lastPlugin = s;
                try {
                  e = n(r, this.helpers);
                } catch (e) {
                  throw this.handleError(e, r.proxyOf);
                }
                if ('root' !== r.type && 'document' !== r.type && !r.parent)
                  return !0;
                if (m(e)) throw this.getAsyncError();
              }
            }
            visitTick(e) {
              let r = e[e.length - 1],
                { node: s, visitors: n } = r;
              if ('root' !== s.type && 'document' !== s.type && !s.parent)
                return void e.pop();
              if (n.length > 0 && r.visitorIndex < n.length) {
                let [e, o] = n[r.visitorIndex];
                ((r.visitorIndex += 1),
                  r.visitorIndex === n.length &&
                    ((r.visitors = []), (r.visitorIndex = 0)),
                  (this.result.lastPlugin = e));
                try {
                  return o(s.toProxy(), this.helpers);
                } catch (e) {
                  throw this.handleError(e, s);
                }
              }
              if (0 !== r.iterator) {
                let n = r.iterator,
                  o;
                for (; (o = s.nodes[s.indexes[n]]);)
                  if (((s.indexes[n] += 1), !o[c])) {
                    ((o[c] = !0), e.push(w(o)));
                    return;
                  }
                ((r.iterator = 0), delete s.indexes[n]);
              }
              let o = r.events;
              for (; r.eventIndex < o.length;) {
                let e = o[r.eventIndex];
                if (((r.eventIndex += 1), 0 === e)) {
                  s.nodes &&
                    s.nodes.length &&
                    ((s[c] = !0), (r.iterator = s.getIterator()));
                  return;
                }
                if (this.listeners[e]) {
                  r.visitors = this.listeners[e];
                  return;
                }
              }
              e.pop();
            }
            walkSync(e) {
              for (let r of ((e[c] = !0), y(e)))
                if (0 === r)
                  e.nodes &&
                    e.each(e => {
                      e[c] || this.walkSync(e);
                    });
                else {
                  let s = this.listeners[r];
                  if (s && this.visitSync(s, e.toProxy())) return;
                }
            }
            warnings() {
              return this.sync().warnings();
            }
          };
        ((O.registerPostcss = e => {
          x = e;
        }),
          (r.exports = O),
          (O.default = O),
          u.registerLazyResult(O),
          n.registerLazyResult(O));
      }),
      Q = c((e, r) => {
        'use strict';
        var s = U(),
          n = M(),
          o = G(),
          i = g(),
          a =
            (J(),
            class {
              get content() {
                return this.result.css;
              }
              get css() {
                return this.result.css;
              }
              get map() {
                return this.result.map;
              }
              get messages() {
                return [];
              }
              get opts() {
                return this.result.opts;
              }
              get processor() {
                return this.result.processor;
              }
              get root() {
                let e;
                if (this._root) return this._root;
                try {
                  e = n(this._css, this._opts);
                } catch (e) {
                  this.error = e;
                }
                if (this.error) throw this.error;
                return ((this._root = e), e);
              }
              get [Symbol.toStringTag]() {
                return 'NoWorkResult';
              }
              constructor(e, r, n) {
                ((r = r.toString()),
                  (this.stringified = !1),
                  (this._processor = e),
                  (this._css = r),
                  (this._opts = n),
                  (this._map = void 0),
                  (this.result = new o(this._processor, void 0, this._opts)),
                  (this.result.css = r));
                let a = this;
                Object.defineProperty(this.result, 'root', {
                  get: () => a.root
                });
                let u = new s(i, void 0, this._opts, r);
                if (u.isMap()) {
                  let [e, r] = u.generate();
                  (e && (this.result.css = e), r && (this.result.map = r));
                } else (u.clearAnnotation(), (this.result.css = u.css));
              }
              async() {
                return this.error
                  ? Promise.reject(this.error)
                  : Promise.resolve(this.result);
              }
              catch(e) {
                return this.async().catch(e);
              }
              finally(e) {
                return this.async().then(e, e);
              }
              sync() {
                if (this.error) throw this.error;
                return this.result;
              }
              then(e, r) {
                return this.async().then(e, r);
              }
              toString() {
                return this._css;
              }
              warnings() {
                return [];
              }
            });
        ((r.exports = a), (a.default = a));
      }),
      K = c((e, r) => {
        'use strict';
        var s = D(),
          n = H(),
          o = Q(),
          i = A(),
          a = class {
            constructor(e = []) {
              ((this.version = '8.5.16'), (this.plugins = this.normalize(e)));
            }
            normalize(e) {
              let r = [];
              for (let s of e)
                if (
                  (!0 === s.postcss ? (s = s()) : s.postcss && (s = s.postcss),
                  'object' == typeof s && Array.isArray(s.plugins))
                )
                  r = r.concat(s.plugins);
                else if ('object' == typeof s && s.postcssPlugin) r.push(s);
                else if ('function' == typeof s) r.push(s);
                else if (!('object' == typeof s && (s.parse || s.stringify)))
                  throw Error(s + ' is not a PostCSS plugin');
              return r;
            }
            process(e, r = {}) {
              return this.plugins.length ||
                r.parser ||
                r.stringifier ||
                r.syntax
                ? new n(this, e, r)
                : new o(this, e, r);
            }
            use(e) {
              return (
                (this.plugins = this.plugins.concat(this.normalize([e]))),
                this
              );
            }
          };
        ((r.exports = a),
          (a.default = a),
          i.registerProcessor(a),
          s.registerProcessor(a));
      }),
      Y = c((e, r) => {
        'use strict';
        var s = C(),
          n = b(),
          o = k(),
          i = m(),
          a = x(),
          u = D(),
          l = F(),
          c = S(),
          p = H(),
          h = E(),
          f = w(),
          d = M(),
          y = K(),
          v = G(),
          O = A(),
          T = j(),
          _ = g(),
          I = V();
        function P(...e) {
          return (
            1 === e.length && Array.isArray(e[0]) && (e = e[0]),
            new y(e)
          );
        }
        ((P.plugin = function (e, r) {
          let s,
            n = !1;
          function o(...s) {
            console &&
              console.warn &&
              !n &&
              ((n = !0),
              console.warn(
                e +
                  `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`
              ));
            let i = r(...s);
            return (
              (i.postcssPlugin = e),
              (i.postcssVersion = new y().version),
              i
            );
          }
          return (
            Object.defineProperty(o, 'postcss', {
              get: () => (s || (s = o()), s)
            }),
            (o.process = function (e, r, s) {
              return P([o(s)]).process(e, r);
            }),
            o
          );
        }),
          (P.stringify = _),
          (P.parse = d),
          (P.fromJSON = l),
          (P.list = h),
          (P.comment = e => new n(e)),
          (P.atRule = e => new s(e)),
          (P.decl = e => new a(e)),
          (P.rule = e => new T(e)),
          (P.root = e => new O(e)),
          (P.document = e => new u(e)),
          (P.CssSyntaxError = i),
          (P.Declaration = a),
          (P.Container = o),
          (P.Processor = y),
          (P.Document = u),
          (P.Comment = n),
          (P.Warning = I),
          (P.AtRule = s),
          (P.Result = v),
          (P.Input = c),
          (P.Rule = T),
          (P.Root = O),
          (P.Node = f),
          p.registerPostcss(P),
          (r.exports = P),
          (P.default = P));
      }),
      Z = c((e, r) => {
        var { Container: s } = Y();
        r.exports = class extends s {
          constructor(e) {
            (super(e),
              (this.type = 'decl'),
              (this.isNested = !0),
              this.nodes || (this.nodes = []));
          }
        };
      }),
      X = c((e, r) => {
        'use strict';
        var s = /[\t\n\f\r "#'()/;[\\\]{}]/g,
          n = /[,\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,
          o = /.[\r\n"'(/\\]/,
          i = /[\da-f]/i,
          a = /[\n\f\r]/g;
        r.exports = function (e, r = {}) {
          let u = e.css.valueOf(),
            l = r.ignoreErrors,
            c,
            p,
            h,
            f,
            d,
            m,
            y,
            g,
            v,
            w = u.length,
            b = 0,
            x = [],
            k = [],
            O;
          function T(r) {
            throw e.error('Unclosed ' + r, b);
          }
          function _() {
            let e = 1,
              r = !1,
              s = !1;
            for (; e > 0;)
              ((p += 1),
                u.length <= p && T('interpolation'),
                (c = u.charCodeAt(p)),
                (g = u.charCodeAt(p + 1)),
                r
                  ? s || c !== r
                    ? 92 === c
                      ? (s = !s)
                      : s && (s = !1)
                    : ((r = !1), (s = !1))
                  : 39 === c || 34 === c
                    ? (r = c)
                    : 125 === c
                      ? (e -= 1)
                      : 35 === c && 123 === g && (e += 1));
          }
          return {
            back: function (e) {
              k.push(e);
            },
            endOfFile: function () {
              return 0 === k.length && b >= w;
            },
            nextToken: function (e) {
              if (k.length) return k.pop();
              if (b >= w) return;
              let r = !!e && e.ignoreUnclosed;
              switch ((c = u.charCodeAt(b))) {
                case 10:
                case 32:
                case 9:
                case 13:
                case 12:
                  p = b;
                  do ((p += 1), (c = u.charCodeAt(p)));
                  while (
                    32 === c ||
                    10 === c ||
                    9 === c ||
                    13 === c ||
                    12 === c
                  );
                  ((v = ['space', u.slice(b, p)]), (b = p - 1));
                  break;
                case 91:
                case 93:
                case 123:
                case 125:
                case 58:
                case 59:
                case 41: {
                  let e = String.fromCharCode(c);
                  v = [e, e, b];
                  break;
                }
                case 44:
                  v = ['word', ',', b, b + 1];
                  break;
                case 40:
                  if (
                    ((y = x.length ? x.pop()[1] : ''),
                    (g = u.charCodeAt(b + 1)),
                    'url' === y && 39 !== g && 34 !== g)
                  ) {
                    for (O = 1, m = !1, p = b + 1; p <= u.length - 1;) {
                      if (92 === (g = u.charCodeAt(p))) m = !m;
                      else if (40 === g) O += 1;
                      else if (41 === g && 0 == (O -= 1)) break;
                      p += 1;
                    }
                    ((v = ['brackets', (f = u.slice(b, p + 1)), b, p]),
                      (b = p));
                  } else
                    ((p = u.indexOf(')', b + 1)),
                      (f = u.slice(b, p + 1)),
                      -1 === p || o.test(f)
                        ? (v = ['(', '(', b])
                        : ((v = ['brackets', f, b, p]), (b = p)));
                  break;
                case 39:
                case 34:
                  for (
                    h = c, p = b, m = !1;
                    p < w &&
                    (++p === w && T('string'),
                    (c = u.charCodeAt(p)),
                    (g = u.charCodeAt(p + 1)),
                    !(!m && c === h));
                  )
                    92 === c
                      ? (m = !m)
                      : m
                        ? (m = !1)
                        : 35 === c && 123 === g && _();
                  ((v = ['string', u.slice(b, p + 1), b, p]), (b = p));
                  break;
                case 64:
                  ((s.lastIndex = b + 1),
                    s.test(u),
                    (p = 0 === s.lastIndex ? u.length - 1 : s.lastIndex - 2),
                    (v = ['at-word', u.slice(b, p + 1), b, p]),
                    (b = p));
                  break;
                case 92:
                  for (p = b, d = !0; 92 === u.charCodeAt(p + 1);)
                    ((p += 1), (d = !d));
                  if (
                    ((c = u.charCodeAt(p + 1)),
                    d &&
                      47 !== c &&
                      32 !== c &&
                      10 !== c &&
                      9 !== c &&
                      13 !== c &&
                      12 !== c &&
                      ((p += 1), i.test(u.charAt(p))))
                  ) {
                    for (; i.test(u.charAt(p + 1));) p += 1;
                    32 === u.charCodeAt(p + 1) && (p += 1);
                  }
                  ((v = ['word', u.slice(b, p + 1), b, p]), (b = p));
                  break;
                default:
                  ((g = u.charCodeAt(b + 1)),
                    35 === c && 123 === g
                      ? ((p = b),
                        _(),
                        (v = ['word', (f = u.slice(b, p + 1)), b, p]))
                      : 47 === c && 42 === g
                        ? (0 === (p = u.indexOf('*/', b + 2) + 1) &&
                            (l || r ? (p = u.length) : T('comment')),
                          (v = ['comment', u.slice(b, p + 1), b, p]))
                        : 47 === c && 47 === g
                          ? ((a.lastIndex = b + 1),
                            a.test(u),
                            (p =
                              0 === a.lastIndex
                                ? u.length - 1
                                : a.lastIndex - 2),
                            (v = [
                              'comment',
                              (f = u.slice(b, p + 1)),
                              b,
                              p,
                              'inline'
                            ]))
                          : ((n.lastIndex = b + 1),
                            n.test(u),
                            (p =
                              0 === n.lastIndex
                                ? u.length - 1
                                : n.lastIndex - 2),
                            (v = ['word', u.slice(b, p + 1), b, p]),
                            x.push(v)),
                    (b = p));
              }
              return (b++, v);
            },
            position: function () {
              return b;
            }
          };
        };
      }),
      ee = c((e, r) => {
        var { Comment: s } = Y(),
          n = P(),
          o = Z(),
          i = X();
        r.exports = class extends n {
          atrule(e) {
            let r = e[1],
              s = e;
            for (; !this.tokenizer.endOfFile();) {
              let e = this.tokenizer.nextToken();
              if ('word' === e[0] && e[2] === s[3] + 1) ((r += e[1]), (s = e));
              else {
                this.tokenizer.back(e);
                break;
              }
            }
            super.atrule(['at-word', r, e[2], s[3]]);
          }
          comment(e) {
            if ('inline' === e[4]) {
              let r = new s();
              (this.init(r, e[2]), (r.raws.inline = !0));
              let n = this.input.fromOffset(e[3]);
              r.source.end = { column: n.col, line: n.line, offset: e[3] + 1 };
              let o = e[1].slice(2);
              if (/^\s*$/.test(o))
                ((r.text = ''), (r.raws.left = o), (r.raws.right = ''));
              else {
                let e = o.match(/^(\s*)([^]*\S)(\s*)$/);
                ((r.text = e[2].replace(/(\*\/|\/\*)/g, '*//*')),
                  (r.raws.left = e[1]),
                  (r.raws.right = e[3]),
                  (r.raws.text = e[2]));
              }
            } else super.comment(e);
          }
          createTokenizer() {
            this.tokenizer = i(this.input);
          }
          raw(e, r, s, n) {
            if ((super.raw(e, r, s, n), e.raws[r])) {
              let n = e.raws[r].raw;
              ((e.raws[r].raw = s.reduce(
                (e, r) =>
                  'comment' === r[0] && 'inline' === r[4]
                    ? e +
                      '/*' +
                      r[1].slice(2).replace(/(\*\/|\/\*)/g, '*//*') +
                      '*/'
                    : e + r[1],
                ''
              )),
                n !== e.raws[r].raw && (e.raws[r].scss = n));
            }
          }
          rule(e) {
            let r = !1,
              s = 0,
              n = '';
            for (let o of e)
              if (r) 'comment' !== o[0] && '{' !== o[0] && (n += o[1]);
              else {
                if (
                  'space' === o[0] &&
                  o[1].includes(`
`)
                )
                  break;
                '(' === o[0]
                  ? (s += 1)
                  : ')' === o[0]
                    ? (s -= 1)
                    : 0 === s && ':' === o[0] && (r = !0);
              }
            if (!r || '' === n.trim() || /^[#:A-Za-z-]/.test(n)) super.rule(e);
            else {
              let r, s;
              e.pop();
              let n = new o();
              this.init(n, e[0][2]);
              for (let s = e.length - 1; s >= 0; s--)
                if ('space' !== e[s][0]) {
                  r = e[s];
                  break;
                }
              if (r[3]) {
                let e = this.input.fromOffset(r[3]);
                n.source.end = {
                  column: e.col,
                  line: e.line,
                  offset: r[3] + 1
                };
              } else {
                let e = this.input.fromOffset(r[2]);
                n.source.end = {
                  column: e.col,
                  line: e.line,
                  offset: r[2] + 1
                };
              }
              for (; 'word' !== e[0][0];) n.raws.before += e.shift()[1];
              if (e[0][2]) {
                let r = this.input.fromOffset(e[0][2]);
                n.source.start = {
                  column: r.col,
                  line: r.line,
                  offset: e[0][2]
                };
              }
              for (n.prop = ''; e.length;) {
                let r = e[0][0];
                if (':' === r || 'space' === r || 'comment' === r) break;
                n.prop += e.shift()[1];
              }
              for (n.raws.between = ''; e.length;)
                if (':' === (s = e.shift())[0]) {
                  n.raws.between += s[1];
                  break;
                } else n.raws.between += s[1];
              (('_' === n.prop[0] || '*' === n.prop[0]) &&
                ((n.raws.before += n.prop[0]), (n.prop = n.prop.slice(1))),
                (n.raws.between += this.spacesAndCommentsFromStart(e)),
                this.precheckMissedSemicolon(e));
              for (let r = e.length - 1; r > 0; r--) {
                if ('!important' === (s = e[r])[1]) {
                  n.important = !0;
                  let s = this.stringFrom(e, r);
                  ' !important' !== (s = this.spacesFromEnd(e) + s) &&
                    (n.raws.important = s);
                  break;
                }
                if ('important' === s[1]) {
                  let s = e.slice(0),
                    o = '';
                  for (let e = r; e > 0; e--) {
                    let r = s[e][0];
                    if (0 === o.trim().indexOf('!') && 'space' !== r) break;
                    o = s.pop()[1] + o;
                  }
                  0 === o.trim().indexOf('!') &&
                    ((n.important = !0), (n.raws.important = o), (e = s));
                }
                if ('space' !== s[0] && 'comment' !== s[0]) break;
              }
              (this.raw(n, 'value', e),
                n.value.includes(':') && this.checkMissedSemicolon(e),
                (this.current = n));
            }
          }
        };
      }),
      et = c((e, r) => {
        var { Input: s } = Y(),
          n = ee();
        r.exports = function (e, r) {
          let o = new n(new s(e, r));
          return (o.parse(), o.root);
        };
      }),
      er = c(e => {
        'use strict';
        (Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.default = function (e) {
            ((this.after = e.after),
              (this.before = e.before),
              (this.type = e.type),
              (this.value = e.value),
              (this.sourceIndex = e.sourceIndex));
          }));
      }),
      es = c(e => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 });
        var r,
          s = (r = er()) && r.__esModule ? r : { default: r };
        function n(e) {
          var r = this;
          (this.constructor(e),
            (this.nodes = e.nodes),
            void 0 === this.after &&
              (this.after =
                this.nodes.length > 0
                  ? this.nodes[this.nodes.length - 1].after
                  : ''),
            void 0 === this.before &&
              (this.before = this.nodes.length > 0 ? this.nodes[0].before : ''),
            void 0 === this.sourceIndex &&
              (this.sourceIndex = this.before.length),
            this.nodes.forEach(function (e) {
              e.parent = r;
            }));
        }
        ((n.prototype = Object.create(s.default.prototype)),
          (n.constructor = s.default),
          (n.prototype.walk = function (e, r) {
            for (
              var s = 'string' == typeof e || e instanceof RegExp,
                n = s ? r : e,
                o = 'string' == typeof e ? new RegExp(e) : e,
                i = 0;
              i < this.nodes.length;
              i++
            ) {
              var a = this.nodes[i];
              if (
                ((!s || o.test(a.type)) && n && !1 === n(a, i, this.nodes)) ||
                (a.nodes && !1 === a.walk(e, r))
              )
                return !1;
            }
            return !0;
          }),
          (n.prototype.each = function () {
            for (
              var e =
                  arguments.length <= 0 || void 0 === arguments[0]
                    ? function () {}
                    : arguments[0],
                r = 0;
              r < this.nodes.length;
              r++
            )
              if (!1 === e(this.nodes[r], r, this.nodes)) return !1;
            return !0;
          }),
          (e.default = n));
      }),
      en = c(e => {
        'use strict';
        (Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.parseMediaFeature = o),
          (e.parseMediaQuery = i),
          (e.parseMediaList = function (e) {
            var n = [],
              o = 0,
              a = 0,
              u = /^(\s*)url\s*\(/.exec(e);
            if (null !== u) {
              for (var l = u[0].length, c = 1; c > 0;) {
                var p = e[l];
                ('(' === p && c++, ')' === p && c--, l++);
              }
              (n.unshift(
                new r.default({
                  type: 'url',
                  value: e.substring(0, l).trim(),
                  sourceIndex: u[1].length,
                  before: u[1],
                  after: /^(\s*)/.exec(e.substring(l))[1]
                })
              ),
                (o = l));
            }
            for (var h = o; h < e.length; h++) {
              var f = e[h];
              if (('(' === f && a++, ')' === f && a--, 0 === a && ',' === f)) {
                var d = e.substring(o, h),
                  m = /^(\s*)/.exec(d)[1];
                (n.push(
                  new s.default({
                    type: 'media-query',
                    value: d.trim(),
                    sourceIndex: o + m.length,
                    nodes: i(d, o),
                    before: m,
                    after: /(\s*)$/.exec(d)[1]
                  })
                ),
                  (o = h + 1));
              }
            }
            var y = e.substring(o),
              g = /^(\s*)/.exec(y)[1];
            return (
              n.push(
                new s.default({
                  type: 'media-query',
                  value: y.trim(),
                  sourceIndex: o + g.length,
                  nodes: i(y, o),
                  before: g,
                  after: /(\s*)$/.exec(y)[1]
                })
              ),
              n
            );
          }));
        var r = n(er()),
          s = n(es());
        function n(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function o(e) {
          var r =
              arguments.length <= 1 || void 0 === arguments[1]
                ? 0
                : arguments[1],
            s = [{ mode: 'normal', character: null }],
            n = [],
            o = 0,
            i = '',
            a = null,
            u = null,
            l = r,
            c = e;
          '(' === e[0] &&
            ')' === e[e.length - 1] &&
            ((c = e.substring(1, e.length - 1)), l++);
          for (var p = 0; p < c.length; p++) {
            var h = c[p];
            if (
              (("'" === h || '"' === h) &&
                (!0 === s[o].isCalculationEnabled
                  ? (s.push({
                      mode: 'string',
                      isCalculationEnabled: !1,
                      character: h
                    }),
                    o++)
                  : 'string' === s[o].mode &&
                    s[o].character === h &&
                    '\\' !== c[p - 1] &&
                    (s.pop(), o--)),
              '{' === h
                ? (s.push({ mode: 'interpolation', isCalculationEnabled: !0 }),
                  o++)
                : '}' === h && (s.pop(), o--),
              'normal' === s[o].mode && ':' === h)
            ) {
              var f = c.substring(p + 1);
              (((u = {
                type: 'value',
                before: /^(\s*)/.exec(f)[1],
                after: /(\s*)$/.exec(f)[1],
                value: f.trim()
              }).sourceIndex = u.before.length + p + 1 + l),
                (a = {
                  type: 'colon',
                  sourceIndex: p + l,
                  after: u.before,
                  value: ':'
                }));
              break;
            }
            i += h;
          }
          return (
            ((i = {
              type: 'media-feature',
              before: /^(\s*)/.exec(i)[1],
              after: /(\s*)$/.exec(i)[1],
              value: i.trim()
            }).sourceIndex = i.before.length + l),
            n.push(i),
            null !== a && ((a.before = i.after), n.push(a)),
            null !== u && n.push(u),
            n
          );
        }
        function i(e) {
          var n =
              arguments.length <= 1 || void 0 === arguments[1]
                ? 0
                : arguments[1],
            i = [],
            a = 0,
            u = !1,
            l = void 0;
          function c() {
            return { before: '', after: '', value: '' };
          }
          l = c();
          for (var p = 0; p < e.length; p++) {
            var h = e[p];
            (u
              ? ((l.value += h),
                ('{' === h || '(' === h) && a++,
                (')' === h || '}' === h) && a--)
              : -1 !== h.search(/\s/)
                ? (l.before += h)
                : ('(' === h && ((l.type = 'media-feature-expression'), a++),
                  (l.value = h),
                  (l.sourceIndex = n + p),
                  (u = !0)),
              u &&
                0 === a &&
                (')' === h ||
                  p === e.length - 1 ||
                  -1 !== e[p + 1].search(/\s/)) &&
                (-1 !== ['not', 'only', 'and'].indexOf(l.value) &&
                  (l.type = 'keyword'),
                'media-feature-expression' === l.type &&
                  (l.nodes = o(l.value, l.sourceIndex)),
                i.push(
                  Array.isArray(l.nodes) ? new s.default(l) : new r.default(l)
                ),
                (l = c()),
                (u = !1)));
          }
          for (var f = 0; f < i.length; f++)
            if (
              ((l = i[f]),
              f > 0 && (i[f - 1].after = l.before),
              void 0 === l.type)
            ) {
              if (f > 0) {
                if ('media-feature-expression' === i[f - 1].type) {
                  l.type = 'keyword';
                  continue;
                }
                if ('not' === i[f - 1].value || 'only' === i[f - 1].value) {
                  l.type = 'media-type';
                  continue;
                }
                if ('and' === i[f - 1].value) {
                  l.type = 'media-feature-expression';
                  continue;
                }
                'media-type' === i[f - 1].type &&
                  (i[f + 1]
                    ? (l.type =
                        'media-feature-expression' === i[f + 1].type
                          ? 'keyword'
                          : 'media-feature-expression')
                    : (l.type = 'media-feature-expression'));
              }
              if (0 === f) {
                if (
                  !i[f + 1] ||
                  (i[f + 1] &&
                    ('media-feature-expression' === i[f + 1].type ||
                      'keyword' === i[f + 1].type))
                ) {
                  l.type = 'media-type';
                  continue;
                }
                if (i[f + 2]) {
                  if ('media-feature-expression' === i[f + 2].type) {
                    ((l.type = 'media-type'), (i[f + 1].type = 'keyword'));
                    continue;
                  }
                  if ('keyword' === i[f + 2].type) {
                    ((l.type = 'keyword'), (i[f + 1].type = 'media-type'));
                    continue;
                  }
                }
                if (i[f + 3] && 'media-feature-expression' === i[f + 3].type) {
                  ((l.type = 'keyword'),
                    (i[f + 1].type = 'media-type'),
                    (i[f + 2].type = 'keyword'));
                  continue;
                }
              }
            }
          return i;
        }
      }),
      eo = c(e => {
        'use strict';
        (Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.default = function (e) {
            return new s.default({
              nodes: (0, n.parseMediaList)(e),
              type: 'media-query-list',
              value: e.trim()
            });
          }));
        var r,
          s = (r = es()) && r.__esModule ? r : { default: r },
          n = en();
      }),
      ei = c((e, r) => {
        r.exports = function (e, r) {
          return (r = 'number' == typeof r ? r : 1 / 0)
            ? (function e(s, n) {
                return s.reduce(function (s, o) {
                  return Array.isArray(o) && n < r
                    ? s.concat(e(o, n + 1))
                    : s.concat(o);
                }, []);
              })(e, 1)
            : Array.isArray(e)
              ? e.map(function (e) {
                  return e;
                })
              : e;
        };
      }),
      ea = c((e, r) => {
        r.exports = function (e, r) {
          for (var s = -1, n = []; -1 !== (s = e.indexOf(r, s + 1));) n.push(s);
          return n;
        };
      }),
      eu = c((e, r) => {
        'use strict';
        r.exports = function (e, r, s) {
          return 0 === e.length
            ? e
            : r
              ? (s || e.sort(r),
                (function (e, r) {
                  for (
                    var s = 1, n = e.length, o = e[0], i = e[0], a = 1;
                    a < n;
                    ++a
                  )
                    if (((i = o), r((o = e[a]), i))) {
                      if (a === s) {
                        s++;
                        continue;
                      }
                      e[s++] = o;
                    }
                  return ((e.length = s), e);
                })(e, r))
              : (s || e.sort(),
                (function (e) {
                  for (
                    var r = 1, s = e.length, n = e[0], o = e[0], i = 1;
                    i < s;
                    ++i, o = n
                  )
                    if (((o = n), (n = e[i]) !== o)) {
                      if (i === r) {
                        r++;
                        continue;
                      }
                      e[r++] = n;
                    }
                  return ((e.length = r), e);
                })(e));
        };
      }),
      el = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          n = function e(r, n) {
            if ((typeof r > 'u' ? 'undefined' : s(r)) !== 'object') return r;
            var o = new r.constructor();
            for (var i in r)
              if (r.hasOwnProperty(i)) {
                var a = r[i],
                  u = typeof a > 'u' ? 'undefined' : s(a);
                'parent' === i && 'object' === u
                  ? n && (o[i] = n)
                  : a instanceof Array
                    ? (o[i] = a.map(function (r) {
                        return e(r, o);
                      }))
                    : (o[i] = e(a, o));
              }
            return o;
          };
        ((e.default = (function () {
          function e() {
            var r =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            if (!(this instanceof e))
              throw TypeError('Cannot call a class as a function');
            for (var s in r) this[s] = r[s];
            var n = r.spaces,
              o = (n = void 0 === n ? {} : n).before,
              i = n.after;
            this.spaces = {
              before: void 0 === o ? '' : o,
              after: void 0 === i ? '' : i
            };
          }
          return (
            (e.prototype.remove = function () {
              return (
                this.parent && this.parent.removeChild(this),
                (this.parent = void 0),
                this
              );
            }),
            (e.prototype.replaceWith = function () {
              if (this.parent) {
                for (var e in arguments)
                  this.parent.insertBefore(this, arguments[e]);
                this.remove();
              }
              return this;
            }),
            (e.prototype.next = function () {
              return this.parent.at(this.parent.index(this) + 1);
            }),
            (e.prototype.prev = function () {
              return this.parent.at(this.parent.index(this) - 1);
            }),
            (e.prototype.clone = function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                r = n(this);
              for (var s in e) r[s] = e[s];
              return r;
            }),
            (e.prototype.toString = function () {
              return [
                this.spaces.before,
                String(this.value),
                this.spaces.after
              ].join('');
            }),
            e
          );
        })()),
          (r.exports = e.default));
      }),
      ec = c(e => {
        'use strict';
        ((e.__esModule = !0),
          (e.TAG = 'tag'),
          (e.STRING = 'string'),
          (e.SELECTOR = 'selector'),
          (e.ROOT = 'root'),
          (e.PSEUDO = 'pseudo'),
          (e.NESTING = 'nesting'),
          (e.ID = 'id'),
          (e.COMMENT = 'comment'),
          (e.COMBINATOR = 'combinator'),
          (e.CLASS = 'class'),
          (e.ATTRIBUTE = 'attribute'),
          (e.UNIVERSAL = 'universal'));
      }),
      ep = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (function () {
            function e(e, r) {
              for (var s = 0; s < r.length; s++) {
                var n = r[s];
                ((n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n));
              }
            }
            return function (r, s, n) {
              return (s && e(r.prototype, s), n && e(r, n), r);
            };
          })(),
          o = (s = el()) && s.__esModule ? s : { default: s },
          i = (function (e) {
            if (e && e.__esModule) return e;
            var r = {};
            if (null != e)
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (r[s] = e[s]);
            return ((r.default = e), r);
          })(ec());
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return (n.nodes || (n.nodes = []), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            (r.prototype.append = function (e) {
              return ((e.parent = this), this.nodes.push(e), this);
            }),
            (r.prototype.prepend = function (e) {
              return ((e.parent = this), this.nodes.unshift(e), this);
            }),
            (r.prototype.at = function (e) {
              return this.nodes[e];
            }),
            (r.prototype.index = function (e) {
              return 'number' == typeof e ? e : this.nodes.indexOf(e);
            }),
            (r.prototype.removeChild = function (e) {
              ((e = this.index(e)),
                (this.at(e).parent = void 0),
                this.nodes.splice(e, 1));
              var r = void 0;
              for (var s in this.indexes)
                (r = this.indexes[s]) >= e && (this.indexes[s] = r - 1);
              return this;
            }),
            (r.prototype.removeAll = function () {
              for (
                var e,
                  r = this.nodes,
                  s = Array.isArray(r),
                  n = 0,
                  r = s ? r : r[Symbol.iterator]();
                ;
              ) {
                if (s) {
                  if (n >= r.length) break;
                  e = r[n++];
                } else {
                  if ((n = r.next()).done) break;
                  e = n.value;
                }
                e.parent = void 0;
              }
              return ((this.nodes = []), this);
            }),
            (r.prototype.empty = function () {
              return this.removeAll();
            }),
            (r.prototype.insertAfter = function (e, r) {
              var s = this.index(e);
              this.nodes.splice(s + 1, 0, r);
              var n = void 0;
              for (var o in this.indexes)
                s <= (n = this.indexes[o]) &&
                  (this.indexes[o] = n + this.nodes.length);
              return this;
            }),
            (r.prototype.insertBefore = function (e, r) {
              var s = this.index(e);
              this.nodes.splice(s, 0, r);
              var n = void 0;
              for (var o in this.indexes)
                s <= (n = this.indexes[o]) &&
                  (this.indexes[o] = n + this.nodes.length);
              return this;
            }),
            (r.prototype.each = function (e) {
              (this.lastEach || (this.lastEach = 0),
                this.indexes || (this.indexes = {}),
                this.lastEach++);
              var r = this.lastEach;
              if (((this.indexes[r] = 0), this.length)) {
                for (
                  var s = void 0, n = void 0;
                  this.indexes[r] < this.length &&
                  ((s = this.indexes[r]), !1 !== (n = e(this.at(s), s)));
                )
                  this.indexes[r] += 1;
                if ((delete this.indexes[r], !1 === n)) return !1;
              }
            }),
            (r.prototype.walk = function (e) {
              return this.each(function (r, s) {
                var n = e(r, s);
                if ((!1 !== n && r.length && (n = r.walk(e)), !1 === n))
                  return !1;
              });
            }),
            (r.prototype.walkAttributes = function (e) {
              var r = this;
              return this.walk(function (s) {
                if (s.type === i.ATTRIBUTE) return e.call(r, s);
              });
            }),
            (r.prototype.walkClasses = function (e) {
              var r = this;
              return this.walk(function (s) {
                if (s.type === i.CLASS) return e.call(r, s);
              });
            }),
            (r.prototype.walkCombinators = function (e) {
              var r = this;
              return this.walk(function (s) {
                if (s.type === i.COMBINATOR) return e.call(r, s);
              });
            }),
            (r.prototype.walkComments = function (e) {
              var r = this;
              return this.walk(function (s) {
                if (s.type === i.COMMENT) return e.call(r, s);
              });
            }),
            (r.prototype.walkIds = function (e) {
              var r = this;
              return this.walk(function (s) {
                if (s.type === i.ID) return e.call(r, s);
              });
            }),
            (r.prototype.walkNesting = function (e) {
              var r = this;
              return this.walk(function (s) {
                if (s.type === i.NESTING) return e.call(r, s);
              });
            }),
            (r.prototype.walkPseudos = function (e) {
              var r = this;
              return this.walk(function (s) {
                if (s.type === i.PSEUDO) return e.call(r, s);
              });
            }),
            (r.prototype.walkTags = function (e) {
              var r = this;
              return this.walk(function (s) {
                if (s.type === i.TAG) return e.call(r, s);
              });
            }),
            (r.prototype.walkUniversals = function (e) {
              var r = this;
              return this.walk(function (s) {
                if (s.type === i.UNIVERSAL) return e.call(r, s);
              });
            }),
            (r.prototype.split = function (e) {
              var r = this,
                s = [];
              return this.reduce(function (n, o, i) {
                var a = e.call(r, o);
                return (
                  s.push(o),
                  a ? (n.push(s), (s = [])) : i === r.length - 1 && n.push(s),
                  n
                );
              }, []);
            }),
            (r.prototype.map = function (e) {
              return this.nodes.map(e);
            }),
            (r.prototype.reduce = function (e, r) {
              return this.nodes.reduce(e, r);
            }),
            (r.prototype.every = function (e) {
              return this.nodes.every(e);
            }),
            (r.prototype.some = function (e) {
              return this.nodes.some(e);
            }),
            (r.prototype.filter = function (e) {
              return this.nodes.filter(e);
            }),
            (r.prototype.sort = function (e) {
              return this.nodes.sort(e);
            }),
            (r.prototype.toString = function () {
              return this.map(String).join('');
            }),
            n(r, [
              {
                key: 'first',
                get: function () {
                  return this.at(0);
                }
              },
              {
                key: 'last',
                get: function () {
                  return this.at(this.length - 1);
                }
              },
              {
                key: 'length',
                get: function () {
                  return this.nodes.length;
                }
              }
            ]),
            r
          );
        })(o.default)),
          (r.exports = e.default));
      }),
      eh = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = ep()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.ROOT), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            (r.prototype.toString = function () {
              var e = this.reduce(function (e, r) {
                var s = String(r);
                return s ? e + s + ',' : '';
              }, '').slice(0, -1);
              return this.trailingComma ? e + ',' : e;
            }),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      ef = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = ep()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.SELECTOR), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      ed = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (function () {
            function e(e, r) {
              for (var s = 0; s < r.length; s++) {
                var n = r[s];
                ((n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n));
              }
            }
            return function (r, s, n) {
              return (s && e(r.prototype, s), n && e(r, n), r);
            };
          })();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r() {
            return (
              (function (e, r) {
                if (!(e instanceof r))
                  throw TypeError('Cannot call a class as a function');
              })(this, r),
              (function (e, r) {
                if (!e)
                  throw ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                return r && ('object' == typeof r || 'function' == typeof r)
                  ? r
                  : e;
              })(this, e.apply(this, arguments))
            );
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            (r.prototype.toString = function () {
              return [
                this.spaces.before,
                this.ns,
                String(this.value),
                this.spaces.after
              ].join('');
            }),
            n(r, [
              {
                key: 'ns',
                get: function () {
                  var e = this.namespace;
                  return e ? ('string' == typeof e ? e : '') + '|' : '';
                }
              }
            ]),
            r
          );
        })(((s = el()) && s.__esModule ? s : { default: s }).default)),
          (r.exports = e.default));
      }),
      em = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = ed()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.CLASS), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            (r.prototype.toString = function () {
              return [
                this.spaces.before,
                this.ns,
                '.' + this.value,
                this.spaces.after
              ].join('');
            }),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      ey = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = el()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.COMMENT), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      eg = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = ed()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.ID), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            (r.prototype.toString = function () {
              return [
                this.spaces.before,
                this.ns,
                '#' + this.value,
                this.spaces.after
              ].join('');
            }),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      ev = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = ed()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.TAG), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      ew = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = el()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.STRING), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      eb = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = ep()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.PSEUDO), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            (r.prototype.toString = function () {
              var e = this.length ? '(' + this.map(String).join(',') + ')' : '';
              return [
                this.spaces.before,
                String(this.value),
                e,
                this.spaces.after
              ].join('');
            }),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      ex = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = ed()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.ATTRIBUTE), (n.raws = {}), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            (r.prototype.toString = function () {
              var e = [this.spaces.before, '[', this.ns, this.attribute];
              return (
                this.operator && e.push(this.operator),
                this.value && e.push(this.value),
                this.raws.insensitive
                  ? e.push(this.raws.insensitive)
                  : this.insensitive && e.push(' i'),
                e.push(']'),
                e.concat(this.spaces.after).join('')
              );
            }),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      ek = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = ed()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.UNIVERSAL), (n.value = '*'), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      eO = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = el()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.COMBINATOR), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      eT = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (s = el()) && s.__esModule ? s : { default: s },
          o = ec();
        ((e.default = (function (e) {
          if ('function' != typeof e && null !== e)
            throw TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            );
          function r(s) {
            if (!(this instanceof r))
              throw TypeError('Cannot call a class as a function');
            var n = (function (e, r) {
              if (!e)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return r && ('object' == typeof r || 'function' == typeof r)
                ? r
                : e;
            })(this, e.call(this, s));
            return ((n.type = o.NESTING), (n.value = '&'), n);
          }
          return (
            (r.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(r, e)
                : (r.__proto__ = e)),
            r
          );
        })(n.default)),
          (r.exports = e.default));
      }),
      e_ = c((e, r) => {
        'use strict';
        ((e.__esModule = !0),
          (e.default = function (e) {
            return e.sort(function (e, r) {
              return e - r;
            });
          }),
          (r.exports = e.default));
      }),
      eS = c((e, r) => {
        'use strict';
        ((e.__esModule = !0),
          (e.default = function (e) {
            for (
              var r = [],
                o = e.css.valueOf(),
                i = void 0,
                a = void 0,
                u = void 0,
                l = void 0,
                c = void 0,
                p = void 0,
                h = void 0,
                f = void 0,
                d = void 0,
                m = void 0,
                y = void 0,
                g = o.length,
                v = -1,
                w = 1,
                b = 0,
                x = function (r, s) {
                  if (e.safe) ((o += s), (a = o.length - 1));
                  else throw e.error('Unclosed ' + r, w, b - v, b);
                };
              b < g;
            ) {
              switch (
                (10 === (i = o.charCodeAt(b)) && ((v = b), (w += 1)), i)
              ) {
                case 10:
                case 32:
                case 9:
                case 13:
                case 12:
                  a = b;
                  do
                    ((a += 1),
                      10 === (i = o.charCodeAt(a)) && ((v = a), (w += 1)));
                  while (
                    32 === i ||
                    10 === i ||
                    9 === i ||
                    13 === i ||
                    12 === i
                  );
                  (r.push(['space', o.slice(b, a), w, b - v, b]), (b = a - 1));
                  break;
                case 43:
                case 62:
                case 126:
                case 124:
                  a = b;
                  do ((a += 1), (i = o.charCodeAt(a)));
                  while (43 === i || 62 === i || 126 === i || 124 === i);
                  (r.push(['combinator', o.slice(b, a), w, b - v, b]),
                    (b = a - 1));
                  break;
                case 42:
                  r.push(['*', '*', w, b - v, b]);
                  break;
                case 38:
                  r.push(['&', '&', w, b - v, b]);
                  break;
                case 44:
                  r.push([',', ',', w, b - v, b]);
                  break;
                case 91:
                  r.push(['[', '[', w, b - v, b]);
                  break;
                case 93:
                  r.push([']', ']', w, b - v, b]);
                  break;
                case 58:
                  r.push([':', ':', w, b - v, b]);
                  break;
                case 59:
                  r.push([';', ';', w, b - v, b]);
                  break;
                case 40:
                  r.push(['(', '(', w, b - v, b]);
                  break;
                case 41:
                  r.push([')', ')', w, b - v, b]);
                  break;
                case 39:
                case 34:
                  ((u = 39 === i ? "'" : '"'), (a = b));
                  do
                    for (
                      m = !1,
                        -1 === (a = o.indexOf(u, a + 1)) && x('quote', u),
                        y = a;
                      92 === o.charCodeAt(y - 1);
                    )
                      ((y -= 1), (m = !m));
                  while (m);
                  (r.push(['string', o.slice(b, a + 1), w, b - v, w, a - v, b]),
                    (b = a));
                  break;
                case 64:
                  ((s.lastIndex = b + 1),
                    s.test(o),
                    (a = 0 === s.lastIndex ? o.length - 1 : s.lastIndex - 2),
                    r.push([
                      'at-word',
                      o.slice(b, a + 1),
                      w,
                      b - v,
                      w,
                      a - v,
                      b
                    ]),
                    (b = a));
                  break;
                case 92:
                  for (a = b, h = !0; 92 === o.charCodeAt(a + 1);)
                    ((a += 1), (h = !h));
                  ((i = o.charCodeAt(a + 1)),
                    h &&
                      47 !== i &&
                      32 !== i &&
                      10 !== i &&
                      9 !== i &&
                      13 !== i &&
                      12 !== i &&
                      (a += 1),
                    r.push(['word', o.slice(b, a + 1), w, b - v, w, a - v, b]),
                    (b = a));
                  break;
                default:
                  (47 === i && 42 === o.charCodeAt(b + 1)
                    ? (0 === (a = o.indexOf('*/', b + 2) + 1) &&
                        x('comment', '*/'),
                      (c =
                        (l = (p = o.slice(b, a + 1)).split(`
`)).length - 1) > 0
                        ? ((f = w + c), (d = a - l[c].length))
                        : ((f = w), (d = v)),
                      r.push(['comment', p, w, b - v, f, a - d, b]),
                      (v = d),
                      (w = f))
                    : ((n.lastIndex = b + 1),
                      n.test(o),
                      (a = 0 === n.lastIndex ? o.length - 1 : n.lastIndex - 2),
                      r.push([
                        'word',
                        o.slice(b, a + 1),
                        w,
                        b - v,
                        w,
                        a - v,
                        b
                      ])),
                    (b = a));
              }
              b++;
            }
            return r;
          }));
        var s = /[ \n\t\r\{\(\)'"\\;/]/g,
          n = /[ \n\t\r\(\)\*:;@!&'"\+\|~>,\[\]\\]|\/(?=\*)/g;
        r.exports = e.default;
      }),
      eC = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s = (function () {
            function e(e, r) {
              for (var s = 0; s < r.length; s++) {
                var n = r[s];
                ((n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n));
              }
            }
            return function (r, s, n) {
              return (s && e(r.prototype, s), n && e(r, n), r);
            };
          })(),
          n = k(ei()),
          o = k(ea()),
          i = k(eu()),
          a = k(eh()),
          u = k(ef()),
          l = k(em()),
          c = k(ey()),
          p = k(eg()),
          h = k(ev()),
          f = k(ew()),
          d = k(eb()),
          m = k(ex()),
          y = k(ek()),
          g = k(eO()),
          v = k(eT()),
          w = k(e_()),
          b = k(eS()),
          x = (function (e) {
            if (e && e.__esModule) return e;
            var r = {};
            if (null != e)
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (r[s] = e[s]);
            return ((r.default = e), r);
          })(ec());
        function k(e) {
          return e && e.__esModule ? e : { default: e };
        }
        ((e.default = (function () {
          function e(r) {
            ((function (e, r) {
              if (!(e instanceof r))
                throw TypeError('Cannot call a class as a function');
            })(this, e),
              (this.input = r),
              (this.lossy = !1 === r.options.lossless),
              (this.position = 0),
              (this.root = new a.default()));
            var s = new u.default();
            return (
              this.root.append(s),
              (this.current = s),
              this.lossy
                ? (this.tokens = (0, b.default)({
                    safe: r.safe,
                    css: r.css.trim()
                  }))
                : (this.tokens = (0, b.default)(r)),
              this.loop()
            );
          }
          return (
            (e.prototype.attribute = function () {
              var e = '',
                r = void 0,
                s = this.currToken;
              for (
                this.position++;
                this.position < this.tokens.length && ']' !== this.currToken[0];
              )
                ((e += this.tokens[this.position][1]), this.position++);
              this.position !== this.tokens.length ||
                ~e.indexOf(']') ||
                this.error('Expected a closing square bracket.');
              var n = e.split(/((?:[*~^$|]?=))([^]*)/),
                o = n[0].split(/(\|)/g),
                i = {
                  operator: n[1],
                  value: n[2],
                  source: {
                    start: { line: s[2], column: s[3] },
                    end: { line: this.currToken[2], column: this.currToken[3] }
                  },
                  sourceIndex: s[4]
                };
              if (
                (o.length > 1
                  ? ('' === o[0] && (o[0] = !0),
                    (i.attribute = this.parseValue(o[2])),
                    (i.namespace = this.parseNamespace(o[0])))
                  : (i.attribute = this.parseValue(n[0])),
                (r = new m.default(i)),
                n[2])
              ) {
                var a = n[2].split(/(\s+i\s*?)$/),
                  u = a[0].trim();
                ((r.value = this.lossy ? u : a[0]),
                  a[1] &&
                    ((r.insensitive = !0),
                    this.lossy || (r.raws.insensitive = a[1])),
                  (r.quoted = "'" === u[0] || '"' === u[0]),
                  (r.raws.unquoted = r.quoted ? u.slice(1, -1) : u));
              }
              (this.newNode(r), this.position++);
            }),
            (e.prototype.combinator = function () {
              if ('|' === this.currToken[1]) return this.namespace();
              for (
                var e = new g.default({
                  value: '',
                  source: {
                    start: {
                      line: this.currToken[2],
                      column: this.currToken[3]
                    },
                    end: { line: this.currToken[2], column: this.currToken[3] }
                  },
                  sourceIndex: this.currToken[4]
                });
                this.position < this.tokens.length &&
                this.currToken &&
                ('space' === this.currToken[0] ||
                  'combinator' === this.currToken[0]);
              )
                (this.nextToken && 'combinator' === this.nextToken[0]
                  ? ((e.spaces.before = this.parseSpace(this.currToken[1])),
                    (e.source.start.line = this.nextToken[2]),
                    (e.source.start.column = this.nextToken[3]),
                    (e.source.end.column = this.nextToken[3]),
                    (e.source.end.line = this.nextToken[2]),
                    (e.sourceIndex = this.nextToken[4]))
                  : this.prevToken && 'combinator' === this.prevToken[0]
                    ? (e.spaces.after = this.parseSpace(this.currToken[1]))
                    : 'combinator' === this.currToken[0]
                      ? (e.value = this.currToken[1])
                      : 'space' === this.currToken[0] &&
                        (e.value = this.parseSpace(this.currToken[1], ' ')),
                  this.position++);
              return this.newNode(e);
            }),
            (e.prototype.comma = function () {
              if (this.position === this.tokens.length - 1) {
                ((this.root.trailingComma = !0), this.position++);
                return;
              }
              var e = new u.default();
              (this.current.parent.append(e),
                (this.current = e),
                this.position++);
            }),
            (e.prototype.comment = function () {
              var e = new c.default({
                value: this.currToken[1],
                source: {
                  start: { line: this.currToken[2], column: this.currToken[3] },
                  end: { line: this.currToken[4], column: this.currToken[5] }
                },
                sourceIndex: this.currToken[6]
              });
              (this.newNode(e), this.position++);
            }),
            (e.prototype.error = function (e) {
              throw new this.input.error(e);
            }),
            (e.prototype.missingBackslash = function () {
              return this.error(
                'Expected a backslash preceding the semicolon.'
              );
            }),
            (e.prototype.missingParenthesis = function () {
              return this.error('Expected opening parenthesis.');
            }),
            (e.prototype.missingSquareBracket = function () {
              return this.error('Expected opening square bracket.');
            }),
            (e.prototype.namespace = function () {
              var e = (this.prevToken && this.prevToken[1]) || !0;
              return 'word' === this.nextToken[0]
                ? (this.position++, this.word(e))
                : '*' === this.nextToken[0]
                  ? (this.position++, this.universal(e))
                  : void 0;
            }),
            (e.prototype.nesting = function () {
              (this.newNode(
                new v.default({
                  value: this.currToken[1],
                  source: {
                    start: {
                      line: this.currToken[2],
                      column: this.currToken[3]
                    },
                    end: { line: this.currToken[2], column: this.currToken[3] }
                  },
                  sourceIndex: this.currToken[4]
                })
              ),
                this.position++);
            }),
            (e.prototype.parentheses = function () {
              var e = this.current.last;
              if (e && e.type === x.PSEUDO) {
                var r = new u.default(),
                  s = this.current;
                (e.append(r), (this.current = r));
                var n = 1;
                for (this.position++; this.position < this.tokens.length && n;)
                  ('(' === this.currToken[0] && n++,
                    ')' === this.currToken[0] && n--,
                    n
                      ? this.parse()
                      : ((r.parent.source.end.line = this.currToken[2]),
                        (r.parent.source.end.column = this.currToken[3]),
                        this.position++));
                (n && this.error('Expected closing parenthesis.'),
                  (this.current = s));
              } else {
                var o = 1;
                for (
                  this.position++, e.value += '(';
                  this.position < this.tokens.length && o;
                )
                  ('(' === this.currToken[0] && o++,
                    ')' === this.currToken[0] && o--,
                    (e.value += this.parseParenthesisToken(this.currToken)),
                    this.position++);
                o && this.error('Expected closing parenthesis.');
              }
            }),
            (e.prototype.pseudo = function () {
              for (
                var e = this, r = '', s = this.currToken;
                this.currToken && ':' === this.currToken[0];
              )
                ((r += this.currToken[1]), this.position++);
              if (!this.currToken)
                return this.error('Expected pseudo-class or pseudo-element');
              if ('word' === this.currToken[0]) {
                var n = void 0;
                this.splitWord(!1, function (o, i) {
                  ((r += o),
                    (n = new d.default({
                      value: r,
                      source: {
                        start: { line: s[2], column: s[3] },
                        end: { line: e.currToken[4], column: e.currToken[5] }
                      },
                      sourceIndex: s[4]
                    })),
                    e.newNode(n),
                    i > 1 &&
                      e.nextToken &&
                      '(' === e.nextToken[0] &&
                      e.error('Misplaced parenthesis.'));
                });
              } else
                this.error('Unexpected "' + this.currToken[0] + '" found.');
            }),
            (e.prototype.space = function () {
              var e = this.currToken;
              0 === this.position ||
              ',' === this.prevToken[0] ||
              '(' === this.prevToken[0]
                ? ((this.spaces = this.parseSpace(e[1])), this.position++)
                : this.position === this.tokens.length - 1 ||
                    ',' === this.nextToken[0] ||
                    ')' === this.nextToken[0]
                  ? ((this.current.last.spaces.after = this.parseSpace(e[1])),
                    this.position++)
                  : this.combinator();
            }),
            (e.prototype.string = function () {
              var e = this.currToken;
              (this.newNode(
                new f.default({
                  value: this.currToken[1],
                  source: {
                    start: { line: e[2], column: e[3] },
                    end: { line: e[4], column: e[5] }
                  },
                  sourceIndex: e[6]
                })
              ),
                this.position++);
            }),
            (e.prototype.universal = function (e) {
              var r = this.nextToken;
              if (r && '|' === r[1]) return (this.position++, this.namespace());
              (this.newNode(
                new y.default({
                  value: this.currToken[1],
                  source: {
                    start: {
                      line: this.currToken[2],
                      column: this.currToken[3]
                    },
                    end: { line: this.currToken[2], column: this.currToken[3] }
                  },
                  sourceIndex: this.currToken[4]
                }),
                e
              ),
                this.position++);
            }),
            (e.prototype.splitWord = function (e, r) {
              for (
                var s = this, a = this.nextToken, u = this.currToken[1];
                a && 'word' === a[0];
              ) {
                this.position++;
                var c = this.currToken[1];
                if (((u += c), c.lastIndexOf('\\') === c.length - 1)) {
                  var f = this.nextToken;
                  f &&
                    'space' === f[0] &&
                    ((u += this.parseSpace(f[1], ' ')), this.position++);
                }
                a = this.nextToken;
              }
              var d = (0, o.default)(u, '.'),
                m = (0, o.default)(u, '#'),
                y = (0, o.default)(u, '#{');
              y.length &&
                (m = m.filter(function (e) {
                  return !~y.indexOf(e);
                }));
              var g = (0, w.default)(
                (0, i.default)((0, n.default)([[0], d, m]))
              );
              (g.forEach(function (n, o) {
                var i = g[o + 1] || u.length,
                  a = u.slice(n, i);
                if (0 === o && r) return r.call(s, a, g.length);
                var c = void 0;
                ((c = ~d.indexOf(n)
                  ? new l.default({
                      value: a.slice(1),
                      source: {
                        start: {
                          line: s.currToken[2],
                          column: s.currToken[3] + n
                        },
                        end: {
                          line: s.currToken[4],
                          column: s.currToken[3] + (i - 1)
                        }
                      },
                      sourceIndex: s.currToken[6] + g[o]
                    })
                  : ~m.indexOf(n)
                    ? new p.default({
                        value: a.slice(1),
                        source: {
                          start: {
                            line: s.currToken[2],
                            column: s.currToken[3] + n
                          },
                          end: {
                            line: s.currToken[4],
                            column: s.currToken[3] + (i - 1)
                          }
                        },
                        sourceIndex: s.currToken[6] + g[o]
                      })
                    : new h.default({
                        value: a,
                        source: {
                          start: {
                            line: s.currToken[2],
                            column: s.currToken[3] + n
                          },
                          end: {
                            line: s.currToken[4],
                            column: s.currToken[3] + (i - 1)
                          }
                        },
                        sourceIndex: s.currToken[6] + g[o]
                      })),
                  s.newNode(c, e));
              }),
                this.position++);
            }),
            (e.prototype.word = function (e) {
              var r = this.nextToken;
              return r && '|' === r[1]
                ? (this.position++, this.namespace())
                : this.splitWord(e);
            }),
            (e.prototype.loop = function () {
              for (; this.position < this.tokens.length;) this.parse(!0);
              return this.root;
            }),
            (e.prototype.parse = function (e) {
              switch (this.currToken[0]) {
                case 'space':
                  this.space();
                  break;
                case 'comment':
                  this.comment();
                  break;
                case '(':
                  this.parentheses();
                  break;
                case ')':
                  e && this.missingParenthesis();
                  break;
                case '[':
                  this.attribute();
                  break;
                case ']':
                  this.missingSquareBracket();
                  break;
                case 'at-word':
                case 'word':
                  this.word();
                  break;
                case ':':
                  this.pseudo();
                  break;
                case ';':
                  this.missingBackslash();
                  break;
                case ',':
                  this.comma();
                  break;
                case '*':
                  this.universal();
                  break;
                case '&':
                  this.nesting();
                  break;
                case 'combinator':
                  this.combinator();
                  break;
                case 'string':
                  this.string();
              }
            }),
            (e.prototype.parseNamespace = function (e) {
              if (this.lossy && 'string' == typeof e) {
                var r = e.trim();
                return !r.length || r;
              }
              return e;
            }),
            (e.prototype.parseSpace = function (e, r) {
              return this.lossy ? r || '' : e;
            }),
            (e.prototype.parseValue = function (e) {
              return this.lossy && e && 'string' == typeof e ? e.trim() : e;
            }),
            (e.prototype.parseParenthesisToken = function (e) {
              return this.lossy
                ? 'space' === e[0]
                  ? this.parseSpace(e[1], ' ')
                  : this.parseValue(e[1])
                : e[1];
            }),
            (e.prototype.newNode = function (e, r) {
              return (
                r && (e.namespace = this.parseNamespace(r)),
                this.spaces &&
                  ((e.spaces.before = this.spaces), (this.spaces = '')),
                this.current.append(e)
              );
            }),
            s(e, [
              {
                key: 'currToken',
                get: function () {
                  return this.tokens[this.position];
                }
              },
              {
                key: 'nextToken',
                get: function () {
                  return this.tokens[this.position + 1];
                }
              },
              {
                key: 'prevToken',
                get: function () {
                  return this.tokens[this.position - 1];
                }
              }
            ]),
            e
          );
        })()),
          (r.exports = e.default));
      }),
      eA = c((e, r) => {
        'use strict';
        e.__esModule = !0;
        var s,
          n = (function () {
            function e(e, r) {
              for (var s = 0; s < r.length; s++) {
                var n = r[s];
                ((n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n));
              }
            }
            return function (r, s, n) {
              return (s && e(r.prototype, s), n && e(r, n), r);
            };
          })(),
          o = (s = eC()) && s.__esModule ? s : { default: s };
        ((e.default = (function () {
          function e(r) {
            return (
              (function (e, r) {
                if (!(e instanceof r))
                  throw TypeError('Cannot call a class as a function');
              })(this, e),
              (this.func = r || function () {}),
              this
            );
          }
          return (
            (e.prototype.process = function (e) {
              var r =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                s = new o.default({
                  css: e,
                  error: function (e) {
                    throw Error(e);
                  },
                  options: r
                });
              return ((this.res = s), this.func(s), this);
            }),
            n(e, [
              {
                key: 'result',
                get: function () {
                  return String(this.res);
                }
              }
            ]),
            e
          );
        })()),
          (r.exports = e.default));
      }),
      eE = c((e, r) => {
        'use strict';
        var s = function (e, r) {
          let n = new e.constructor();
          for (let o in e) {
            if (!e.hasOwnProperty(o)) continue;
            let i = e[o],
              a = typeof i;
            'parent' === o && 'object' === a
              ? r && (n[o] = r)
              : 'source' === o
                ? (n[o] = i)
                : i instanceof Array
                  ? (n[o] = i.map(e => s(e, n)))
                  : 'before' !== o &&
                    'after' !== o &&
                    'between' !== o &&
                    'semicolon' !== o &&
                    ('object' === a && null !== i && (i = s(i)), (n[o] = i));
          }
          return n;
        };
        r.exports = class {
          constructor(e) {
            for (let r in ((e = e || {}),
            (this.raws = { before: '', after: '' }),
            e))
              this[r] = e[r];
          }
          remove() {
            return (
              this.parent && this.parent.removeChild(this),
              (this.parent = void 0),
              this
            );
          }
          toString() {
            return [this.raws.before, String(this.value), this.raws.after].join(
              ''
            );
          }
          clone(e) {
            e = e || {};
            let r = s(this);
            for (let s in e) r[s] = e[s];
            return r;
          }
          cloneBefore(e) {
            e = e || {};
            let r = this.clone(e);
            return (this.parent.insertBefore(this, r), r);
          }
          cloneAfter(e) {
            e = e || {};
            let r = this.clone(e);
            return (this.parent.insertAfter(this, r), r);
          }
          replaceWith() {
            let e = Array.prototype.slice.call(arguments);
            if (this.parent) {
              for (let r of e) this.parent.insertBefore(this, r);
              this.remove();
            }
            return this;
          }
          moveTo(e) {
            return (
              this.cleanRaws(this.root() === e.root()),
              this.remove(),
              e.append(this),
              this
            );
          }
          moveBefore(e) {
            return (
              this.cleanRaws(this.root() === e.root()),
              this.remove(),
              e.parent.insertBefore(e, this),
              this
            );
          }
          moveAfter(e) {
            return (
              this.cleanRaws(this.root() === e.root()),
              this.remove(),
              e.parent.insertAfter(e, this),
              this
            );
          }
          next() {
            let e = this.parent.index(this);
            return this.parent.nodes[e + 1];
          }
          prev() {
            let e = this.parent.index(this);
            return this.parent.nodes[e - 1];
          }
          toJSON() {
            let e = {};
            for (let r in this) {
              if (!this.hasOwnProperty(r) || 'parent' === r) continue;
              let s = this[r];
              s instanceof Array
                ? (e[r] = s.map(e =>
                    'object' == typeof e && e.toJSON ? e.toJSON() : e
                  ))
                : 'object' == typeof s && s.toJSON
                  ? (e[r] = s.toJSON())
                  : (e[r] = s);
            }
            return e;
          }
          root() {
            let e = this;
            for (; e.parent;) e = e.parent;
            return e;
          }
          cleanRaws(e) {
            (delete this.raws.before,
              delete this.raws.after,
              e || delete this.raws.between);
          }
          positionInside(e) {
            let r = this.toString(),
              s = this.source.start.column,
              n = this.source.start.line;
            for (let o = 0; o < e; o++)
              r[o] ===
              `
`
                ? ((s = 1), (n += 1))
                : (s += 1);
            return { line: n, column: s };
          }
          positionBy(e) {
            let r = this.source.start;
            if (Object(e).index) r = this.positionInside(e.index);
            else if (Object(e).word) {
              let s = this.toString().indexOf(e.word);
              -1 !== s && (r = this.positionInside(s));
            }
            return r;
          }
        };
      }),
      ej = c((e, r) => {
        'use strict';
        var s = eE(),
          n = class extends s {
            constructor(e) {
              (super(e), this.nodes || (this.nodes = []));
            }
            push(e) {
              return ((e.parent = this), this.nodes.push(e), this);
            }
            each(e) {
              (this.lastEach || (this.lastEach = 0),
                this.indexes || (this.indexes = {}),
                (this.lastEach += 1));
              let r = this.lastEach,
                s,
                n;
              if (((this.indexes[r] = 0), this.nodes)) {
                for (
                  ;
                  this.indexes[r] < this.nodes.length &&
                  ((s = this.indexes[r]), !1 !== (n = e(this.nodes[s], s)));
                )
                  this.indexes[r] += 1;
                return (delete this.indexes[r], n);
              }
            }
            walk(e) {
              return this.each((r, s) => {
                let n = e(r, s);
                return (!1 !== n && r.walk && (n = r.walk(e)), n);
              });
            }
            walkType(e, r) {
              if (!e || !r)
                throw Error('Parameters {type} and {callback} are required.');
              let s = 'function' == typeof e;
              return this.walk((n, o) => {
                if ((s && n instanceof e) || (!s && n.type === e))
                  return r.call(this, n, o);
              });
            }
            append(e) {
              return ((e.parent = this), this.nodes.push(e), this);
            }
            prepend(e) {
              return ((e.parent = this), this.nodes.unshift(e), this);
            }
            cleanRaws(e) {
              if ((super.cleanRaws(e), this.nodes))
                for (let r of this.nodes) r.cleanRaws(e);
            }
            insertAfter(e, r) {
              let s = this.index(e),
                n;
              for (let e in (this.nodes.splice(s + 1, 0, r), this.indexes))
                s <= (n = this.indexes[e]) &&
                  (this.indexes[e] = n + this.nodes.length);
              return this;
            }
            insertBefore(e, r) {
              let s = this.index(e),
                n;
              for (let e in (this.nodes.splice(s, 0, r), this.indexes))
                s <= (n = this.indexes[e]) &&
                  (this.indexes[e] = n + this.nodes.length);
              return this;
            }
            removeChild(e) {
              let r;
              for (let s in ((e = this.index(e)),
              (this.nodes[e].parent = void 0),
              this.nodes.splice(e, 1),
              this.indexes))
                (r = this.indexes[s]) >= e && (this.indexes[s] = r - 1);
              return this;
            }
            removeAll() {
              for (let e of this.nodes) e.parent = void 0;
              return ((this.nodes = []), this);
            }
            every(e) {
              return this.nodes.every(e);
            }
            some(e) {
              return this.nodes.some(e);
            }
            index(e) {
              return 'number' == typeof e ? e : this.nodes.indexOf(e);
            }
            get first() {
              if (this.nodes) return this.nodes[0];
            }
            get last() {
              if (this.nodes) return this.nodes[this.nodes.length - 1];
            }
            toString() {
              let e = this.nodes.map(String).join('');
              return (
                this.value && (e = this.value + e),
                this.raws.before && (e = this.raws.before + e),
                this.raws.after && (e += this.raws.after),
                e
              );
            }
          };
        ((n.registerWalker = e => {
          let r = 'walk' + e.name;
          (r.lastIndexOf('s') !== r.length - 1 && (r += 's'),
            n.prototype[r] ||
              (n.prototype[r] = function (r) {
                return this.walkType(e, r);
              }));
        }),
          (r.exports = n));
      }),
      eI = c((e, r) => {
        'use strict';
        var s = ej();
        r.exports = class extends s {
          constructor(e) {
            (super(e), (this.type = 'root'));
          }
        };
      }),
      eP = c((e, r) => {
        'use strict';
        var s = ej();
        r.exports = class extends s {
          constructor(e) {
            (super(e), (this.type = 'value'), (this.unbalanced = 0));
          }
        };
      }),
      eM = c((e, r) => {
        'use strict';
        var s = ej(),
          n = class extends s {
            constructor(e) {
              (super(e), (this.type = 'atword'));
            }
            toString() {
              return (
                this.quoted && this.raws.quote,
                [
                  this.raws.before,
                  '@',
                  String.prototype.toString.call(this.value),
                  this.raws.after
                ].join('')
              );
            }
          };
        (s.registerWalker(n), (r.exports = n));
      }),
      eN = c((e, r) => {
        'use strict';
        var s = ej(),
          n = eE(),
          o = class extends n {
            constructor(e) {
              (super(e), (this.type = 'colon'));
            }
          };
        (s.registerWalker(o), (r.exports = o));
      }),
      e$ = c((e, r) => {
        'use strict';
        var s = ej(),
          n = eE(),
          o = class extends n {
            constructor(e) {
              (super(e), (this.type = 'comma'));
            }
          };
        (s.registerWalker(o), (r.exports = o));
      }),
      eR = c((e, r) => {
        'use strict';
        var s = ej(),
          n = eE(),
          o = class extends n {
            constructor(e) {
              (super(e),
                (this.type = 'comment'),
                (this.inline = Object(e).inline || !1));
            }
            toString() {
              return [
                this.raws.before,
                this.inline ? '//' : '/*',
                String(this.value),
                this.inline ? '' : '*/',
                this.raws.after
              ].join('');
            }
          };
        (s.registerWalker(o), (r.exports = o));
      }),
      eW = c((e, r) => {
        'use strict';
        var s = ej(),
          n = class extends s {
            constructor(e) {
              (super(e), (this.type = 'func'), (this.unbalanced = -1));
            }
          };
        (s.registerWalker(n), (r.exports = n));
      }),
      eL = c((e, r) => {
        'use strict';
        var s = ej(),
          n = eE(),
          o = class extends n {
            constructor(e) {
              (super(e),
                (this.type = 'number'),
                (this.unit = Object(e).unit || ''));
            }
            toString() {
              return [
                this.raws.before,
                String(this.value),
                this.unit,
                this.raws.after
              ].join('');
            }
          };
        (s.registerWalker(o), (r.exports = o));
      }),
      ez = c((e, r) => {
        'use strict';
        var s = ej(),
          n = eE(),
          o = class extends n {
            constructor(e) {
              (super(e), (this.type = 'operator'));
            }
          };
        (s.registerWalker(o), (r.exports = o));
      }),
      eB = c((e, r) => {
        'use strict';
        var s = ej(),
          n = eE(),
          o = class extends n {
            constructor(e) {
              (super(e), (this.type = 'paren'), (this.parenType = ''));
            }
          };
        (s.registerWalker(o), (r.exports = o));
      }),
      eq = c((e, r) => {
        'use strict';
        var s = ej(),
          n = eE(),
          o = class extends n {
            constructor(e) {
              (super(e), (this.type = 'string'));
            }
            toString() {
              let e = this.quoted ? this.raws.quote : '';
              return [
                this.raws.before,
                e,
                this.value + '',
                e,
                this.raws.after
              ].join('');
            }
          };
        (s.registerWalker(o), (r.exports = o));
      }),
      eD = c((e, r) => {
        'use strict';
        var s = ej(),
          n = eE(),
          o = class extends n {
            constructor(e) {
              (super(e), (this.type = 'word'));
            }
          };
        (s.registerWalker(o), (r.exports = o));
      }),
      eF = c((e, r) => {
        'use strict';
        var s = ej(),
          n = eE(),
          o = class extends n {
            constructor(e) {
              (super(e), (this.type = 'unicode-range'));
            }
          };
        (s.registerWalker(o), (r.exports = o));
      }),
      eU = c((e, r) => {
        'use strict';
        r.exports = class extends Error {
          constructor(e) {
            (super(e),
              (this.name = this.constructor.name),
              (this.message = e || 'An error ocurred while tokzenizing.'),
              'function' == typeof Error.captureStackTrace
                ? Error.captureStackTrace(this, this.constructor)
                : (this.stack = Error(e).stack));
          }
        };
      }),
      eV = c((e, r) => {
        'use strict';
        var s = /[ \n\t\r\{\(\)'"\\;,/]/g,
          n = /[ \n\t\r\(\)\{\}\*:;@!&'"\+\|~>,\[\]\\]|\/(?=\*)/g,
          o = /[ \n\t\r\(\)\{\}\*:;@!&'"\-\+\|~>,\[\]\\]|\//g,
          i = /^[a-z0-9]/i,
          a = /^[a-f0-9?\-]/i,
          u = eU();
        r.exports = function (e, r) {
          r = r || {};
          let l = [],
            c = e.valueOf(),
            p = c.length,
            h = -1,
            f = 1,
            d = 0,
            m = 0,
            y = null,
            g,
            v,
            w,
            b,
            x,
            k,
            O,
            T,
            _,
            S,
            C,
            A;
          function E(e) {
            throw new u(
              `Unclosed ${e} at line: ${f}, column: ${d - h}, token: ${d}`
            );
          }
          for (; d < p;) {
            switch ((10 === (g = c.charCodeAt(d)) && ((h = d), (f += 1)), g)) {
              case 10:
              case 32:
              case 9:
              case 13:
              case 12:
                v = d;
                do
                  ((v += 1),
                    10 === (g = c.charCodeAt(v)) && ((h = v), (f += 1)));
                while (32 === g || 10 === g || 9 === g || 13 === g || 12 === g);
                (l.push(['space', c.slice(d, v), f, d - h, f, v - h, d]),
                  (d = v - 1));
                break;
              case 58:
                ((v = d + 1),
                  l.push(['colon', c.slice(d, v), f, d - h, f, v - h, d]),
                  (d = v - 1));
                break;
              case 44:
                ((v = d + 1),
                  l.push(['comma', c.slice(d, v), f, d - h, f, v - h, d]),
                  (d = v - 1));
                break;
              case 123:
                l.push(['{', '{', f, d - h, f, v - h, d]);
                break;
              case 125:
                l.push(['}', '}', f, d - h, f, v - h, d]);
                break;
              case 40:
                (m++,
                  (y =
                    !y &&
                    1 === m &&
                    l.length > 0 &&
                    'word' === l[l.length - 1][0] &&
                    'url' === l[l.length - 1][1]),
                  l.push(['(', '(', f, d - h, f, v - h, d]));
                break;
              case 41:
                (m--,
                  (y = y && m > 0),
                  l.push([')', ')', f, d - h, f, v - h, d]));
                break;
              case 39:
              case 34:
                ((w = 39 === g ? "'" : '"'), (v = d));
                do
                  for (
                    S = !1,
                      -1 === (v = c.indexOf(w, v + 1)) && E('quote'),
                      C = v;
                    92 === c.charCodeAt(C - 1);
                  )
                    ((C -= 1), (S = !S));
                while (S);
                (l.push(['string', c.slice(d, v + 1), f, d - h, f, v - h, d]),
                  (d = v));
                break;
              case 64:
                ((s.lastIndex = d + 1),
                  s.test(c),
                  (v = 0 === s.lastIndex ? c.length - 1 : s.lastIndex - 2),
                  l.push(['atword', c.slice(d, v + 1), f, d - h, f, v - h, d]),
                  (d = v));
                break;
              case 92:
                ((v = d),
                  (g = c.charCodeAt(v + 1)),
                  O &&
                    47 !== g &&
                    32 !== g &&
                    10 !== g &&
                    9 !== g &&
                    13 !== g &&
                    12 !== g &&
                    (v += 1),
                  l.push(['word', c.slice(d, v + 1), f, d - h, f, v - h, d]),
                  (d = v));
                break;
              case 43:
              case 45:
              case 42:
                if (
                  ((v = d + 1),
                  (A = c.slice(d + 1, v + 1)),
                  c.slice(d - 1, d),
                  45 === g && 45 === A.charCodeAt(0))
                ) {
                  (v++,
                    l.push(['word', c.slice(d, v), f, d - h, f, v - h, d]),
                    (d = v - 1));
                  break;
                }
                (l.push(['operator', c.slice(d, v), f, d - h, f, v - h, d]),
                  (d = v - 1));
                break;
              default:
                if (
                  47 === g &&
                  (42 === c.charCodeAt(d + 1) ||
                    (r.loose && !y && 47 === c.charCodeAt(d + 1)))
                ) {
                  if (42 === c.charCodeAt(d + 1))
                    0 === (v = c.indexOf('*/', d + 2) + 1) && E('comment');
                  else {
                    let e = c.indexOf(
                      `
`,
                      d + 2
                    );
                    v = -1 !== e ? e - 1 : p;
                  }
                  ((x =
                    (b = (k = c.slice(d, v + 1)).split(`
`)).length - 1) > 0
                    ? ((T = f + x), (_ = v - b[x].length))
                    : ((T = f), (_ = h)),
                    l.push(['comment', k, f, d - h, T, v - _, d]),
                    (h = _),
                    (f = T),
                    (d = v));
                } else if (35 !== g || i.test(c.slice(d + 1, d + 2)))
                  if ((117 === g || 85 === g) && 43 === c.charCodeAt(d + 1)) {
                    v = d + 2;
                    do ((v += 1), (g = c.charCodeAt(v)));
                    while (v < p && a.test(c.slice(v, v + 1)));
                    (l.push([
                      'unicoderange',
                      c.slice(d, v),
                      f,
                      d - h,
                      f,
                      v - h,
                      d
                    ]),
                      (d = v - 1));
                  } else if (47 === g)
                    ((v = d + 1),
                      l.push([
                        'operator',
                        c.slice(d, v),
                        f,
                        d - h,
                        f,
                        v - h,
                        d
                      ]),
                      (d = v - 1));
                  else {
                    let e = n;
                    if (
                      (g >= 48 && g <= 57 && (e = o),
                      (e.lastIndex = d + 1),
                      e.test(c),
                      (v = 0 === e.lastIndex ? c.length - 1 : e.lastIndex - 2),
                      e === o || 46 === g)
                    ) {
                      let e = c.charCodeAt(v),
                        r = c.charCodeAt(v + 1),
                        s = c.charCodeAt(v + 2);
                      (101 === e || 69 === e) &&
                        (45 === r || 43 === r) &&
                        s >= 48 &&
                        s <= 57 &&
                        ((o.lastIndex = v + 2),
                        o.test(c),
                        (v =
                          0 === o.lastIndex ? c.length - 1 : o.lastIndex - 2));
                    }
                    (l.push(['word', c.slice(d, v + 1), f, d - h, f, v - h, d]),
                      (d = v));
                  }
                else
                  ((v = d + 1),
                    l.push(['#', c.slice(d, v), f, d - h, f, v - h, d]),
                    (d = v - 1));
            }
            d++;
          }
          return l;
        };
      }),
      eG = c((e, r) => {
        'use strict';
        r.exports = class extends Error {
          constructor(e) {
            (super(e),
              (this.name = this.constructor.name),
              (this.message = e || 'An error ocurred while parsing.'),
              'function' == typeof Error.captureStackTrace
                ? Error.captureStackTrace(this, this.constructor)
                : (this.stack = Error(e).stack));
          }
        };
      }),
      eJ = c((e, r) => {
        'use strict';
        var s = eI(),
          n = eP(),
          o = eM(),
          i = eN(),
          a = e$(),
          u = eR(),
          l = eW(),
          c = eL(),
          p = ez(),
          h = eB(),
          f = eq(),
          d = eD(),
          m = eF(),
          y = eV(),
          g = ei(),
          v = ea(),
          w = eu(),
          b = eG();
        r.exports = class {
          constructor(e, r) {
            ((this.cache = []),
              (this.input = e),
              (this.options = Object.assign({}, { loose: !1 }, r)),
              (this.position = 0),
              (this.unbalanced = 0),
              (this.root = new s()));
            let o = new n();
            (this.root.append(o),
              (this.current = o),
              (this.tokens = y(e, this.options)));
          }
          parse() {
            return this.loop();
          }
          colon() {
            let e = this.currToken;
            (this.newNode(
              new i({
                value: e[1],
                source: {
                  start: { line: e[2], column: e[3] },
                  end: { line: e[4], column: e[5] }
                },
                sourceIndex: e[6]
              })
            ),
              this.position++);
          }
          comma() {
            let e = this.currToken;
            (this.newNode(
              new a({
                value: e[1],
                source: {
                  start: { line: e[2], column: e[3] },
                  end: { line: e[4], column: e[5] }
                },
                sourceIndex: e[6]
              })
            ),
              this.position++);
          }
          comment() {
            let e = !1,
              r = this.currToken[1].replace(/\/\*|\*\//g, ''),
              s;
            (this.options.loose &&
              r.startsWith('//') &&
              ((r = r.substring(2)), (e = !0)),
              (s = new u({
                value: r,
                inline: e,
                source: {
                  start: { line: this.currToken[2], column: this.currToken[3] },
                  end: { line: this.currToken[4], column: this.currToken[5] }
                },
                sourceIndex: this.currToken[6]
              })),
              this.newNode(s),
              this.position++);
          }
          error(e, r) {
            throw new b(e + ` at line: ${r[2]}, column ${r[3]}`);
          }
          loop() {
            for (; this.position < this.tokens.length;) this.parseTokens();
            return (
              !this.current.last && this.spaces
                ? (this.current.raws.before += this.spaces)
                : this.spaces && (this.current.last.raws.after += this.spaces),
              (this.spaces = ''),
              this.root
            );
          }
          operator() {
            let e = this.currToken[1],
              r;
            if ('+' === e || '-' === e) {
              if (
                (this.options.loose ||
                  (this.position > 0 &&
                    ('func' === this.current.type &&
                    'calc' === this.current.value
                      ? ('space' !== this.prevToken[0] &&
                          '(' !== this.prevToken[0]) ||
                        ('space' !== this.nextToken[0] &&
                          'word' !== this.nextToken[0])
                        ? this.error('Syntax Error', this.currToken)
                        : 'word' === this.nextToken[0] &&
                          'operator' !== this.current.last.type &&
                          '(' !== this.current.last.value &&
                          this.error('Syntax Error', this.currToken)
                      : ('space' === this.nextToken[0] ||
                          'operator' === this.nextToken[0] ||
                          'operator' === this.prevToken[0]) &&
                        this.error('Syntax Error', this.currToken))),
                this.options.loose)
              ) {
                if (
                  (!this.current.nodes.length ||
                    (this.current.last &&
                      'operator' === this.current.last.type)) &&
                  'word' === this.nextToken[0]
                )
                  return this.word();
              } else if ('word' === this.nextToken[0]) return this.word();
            }
            return (
              (r = new p({
                value: this.currToken[1],
                source: {
                  start: { line: this.currToken[2], column: this.currToken[3] },
                  end: { line: this.currToken[2], column: this.currToken[3] }
                },
                sourceIndex: this.currToken[4]
              })),
              this.position++,
              this.newNode(r)
            );
          }
          parseTokens() {
            switch (this.currToken[0]) {
              case 'space':
                this.space();
                break;
              case 'colon':
                this.colon();
                break;
              case 'comma':
                this.comma();
                break;
              case 'comment':
                this.comment();
                break;
              case '(':
                this.parenOpen();
                break;
              case ')':
                this.parenClose();
                break;
              case 'atword':
              case 'word':
              default:
                this.word();
                break;
              case 'operator':
                this.operator();
                break;
              case 'string':
                this.string();
                break;
              case 'unicoderange':
                this.unicodeRange();
            }
          }
          parenOpen() {
            let e = 1,
              r = this.position + 1,
              s = this.currToken,
              n;
            for (; r < this.tokens.length && e;) {
              let s = this.tokens[r];
              ('(' === s[0] && e++, ')' === s[0] && e--, r++);
            }
            if (
              (e && this.error('Expected closing parenthesis', s),
              (n = this.current.last) &&
                'func' === n.type &&
                n.unbalanced < 0 &&
                ((n.unbalanced = 0), (this.current = n)),
              this.current.unbalanced++,
              this.newNode(
                new h({
                  value: s[1],
                  source: {
                    start: { line: s[2], column: s[3] },
                    end: { line: s[4], column: s[5] }
                  },
                  sourceIndex: s[6]
                })
              ),
              this.position++,
              'func' === this.current.type &&
                this.current.unbalanced &&
                'url' === this.current.value &&
                'string' !== this.currToken[0] &&
                ')' !== this.currToken[0] &&
                !this.options.loose)
            ) {
              let e = this.nextToken,
                r = this.currToken[1],
                s = { line: this.currToken[2], column: this.currToken[3] };
              for (; e && ')' !== e[0] && this.current.unbalanced;)
                (this.position++,
                  (r += this.currToken[1]),
                  (e = this.nextToken));
              this.position !== this.tokens.length - 1 &&
                (this.position++,
                this.newNode(
                  new d({
                    value: r,
                    source: {
                      start: s,
                      end: {
                        line: this.currToken[4],
                        column: this.currToken[5]
                      }
                    },
                    sourceIndex: this.currToken[6]
                  })
                ));
            }
          }
          parenClose() {
            let e = this.currToken;
            (this.newNode(
              new h({
                value: e[1],
                source: {
                  start: { line: e[2], column: e[3] },
                  end: { line: e[4], column: e[5] }
                },
                sourceIndex: e[6]
              })
            ),
              this.position++,
              (this.position >= this.tokens.length - 1 &&
                !this.current.unbalanced) ||
                (this.current.unbalanced--,
                this.current.unbalanced < 0 &&
                  this.error('Expected opening parenthesis', e),
                !this.current.unbalanced &&
                  this.cache.length &&
                  (this.current = this.cache.pop())));
          }
          space() {
            let e = this.currToken;
            (this.position === this.tokens.length - 1 ||
            ',' === this.nextToken[0] ||
            ')' === this.nextToken[0]
              ? (this.current.last.raws.after += e[1])
              : (this.spaces = e[1]),
              this.position++);
          }
          unicodeRange() {
            let e = this.currToken;
            (this.newNode(
              new m({
                value: e[1],
                source: {
                  start: { line: e[2], column: e[3] },
                  end: { line: e[4], column: e[5] }
                },
                sourceIndex: e[6]
              })
            ),
              this.position++);
          }
          splitWord() {
            let e = this.nextToken,
              r = this.currToken[1],
              s = /^[\+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][\+\-]?\d+)?/,
              n,
              i;
            if (!/^(?!\#([a-z0-9]+))[\#\{\}]/gi.test(r))
              for (; e && 'word' === e[0];) {
                this.position++;
                let s = this.currToken[1];
                ((r += s), (e = this.nextToken));
              }
            ((i = w(g([[0], (n = v(r, '@'))])).sort((e, r) => e - r)).forEach(
              (a, u) => {
                let p = i[u + 1] || r.length,
                  h = r.slice(a, p),
                  f;
                if (~n.indexOf(a))
                  f = new o({
                    value: h.slice(1),
                    source: {
                      start: {
                        line: this.currToken[2],
                        column: this.currToken[3] + a
                      },
                      end: {
                        line: this.currToken[4],
                        column: this.currToken[3] + (p - 1)
                      }
                    },
                    sourceIndex: this.currToken[6] + i[u]
                  });
                else if (s.test(this.currToken[1])) {
                  let e = h.replace(s, '');
                  f = new c({
                    value: h.replace(e, ''),
                    source: {
                      start: {
                        line: this.currToken[2],
                        column: this.currToken[3] + a
                      },
                      end: {
                        line: this.currToken[4],
                        column: this.currToken[3] + (p - 1)
                      }
                    },
                    sourceIndex: this.currToken[6] + i[u],
                    unit: e
                  });
                } else
                  'word' ===
                  (f = new (e && '(' === e[0] ? l : d)({
                    value: h,
                    source: {
                      start: {
                        line: this.currToken[2],
                        column: this.currToken[3] + a
                      },
                      end: {
                        line: this.currToken[4],
                        column: this.currToken[3] + (p - 1)
                      }
                    },
                    sourceIndex: this.currToken[6] + i[u]
                  })).type
                    ? ((f.isHex = /^#(.+)/.test(h)),
                      (f.isColor =
                        /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(
                          h
                        )))
                    : this.cache.push(this.current);
                this.newNode(f);
              }
            ),
              this.position++);
          }
          string() {
            let e = this.currToken,
              r = this.currToken[1],
              s = /^(\"|\')/,
              n = s.test(r),
              o = '',
              i;
            (n && ((o = r.match(s)[0]), (r = r.slice(1, r.length - 1))),
              ((i = new f({
                value: r,
                source: {
                  start: { line: e[2], column: e[3] },
                  end: { line: e[4], column: e[5] }
                },
                sourceIndex: e[6],
                quoted: n
              })).raws.quote = o),
              this.newNode(i),
              this.position++);
          }
          word() {
            return this.splitWord();
          }
          newNode(e) {
            return (
              this.spaces &&
                ((e.raws.before += this.spaces), (this.spaces = '')),
              this.current.append(e)
            );
          }
          get currToken() {
            return this.tokens[this.position];
          }
          get nextToken() {
            return this.tokens[this.position + 1];
          }
          get prevToken() {
            return this.tokens[this.position - 1];
          }
        };
      }),
      eH = {};
    p(eH, {
      languages: () => rK,
      options: () => rY,
      parsers: () => rZ,
      printers: () => sd
    });
    var eQ =
        (e, r) =>
        (s, n, ...o) =>
          1 | s && null == n ? void 0 : (r.call(n) ?? n[e]).apply(n, o),
      eK =
        String.prototype.replaceAll ??
        function (e, r) {
          return e.global ? this.replace(e, r) : this.split(e).join(r);
        },
      eY = eQ('replaceAll', function () {
        if ('string' == typeof this) return eK;
      });
    function eZ(e) {
      return this[e < 0 ? this.length + e : e];
    }
    var eX = eQ('at', function () {
        if (Array.isArray(this) || 'string' == typeof this) return eZ;
      }),
      e1 = () => {},
      e0 = 'string',
      e2 = 'array',
      e3 = 'cursor',
      e4 = 'indent',
      e9 = 'align',
      e5 = 'trim',
      e6 = 'group',
      e7 = 'fill',
      e8 = 'if-break',
      te = 'indent-if-break',
      tt = 'line-suffix',
      tr = 'line-suffix-boundary',
      ts = 'line',
      tn = 'label',
      to = 'break-parent',
      ti = new Set([e3, e4, e9, e5, e6, e7, e8, te, tt, tr, ts, tn, to]),
      ta = function (e) {
        if ('string' == typeof e) return e0;
        if (Array.isArray(e)) return e2;
        if (!e) return;
        let { type: r } = e;
        if (ti.has(r)) return r;
      },
      tu = class extends Error {
        name = 'InvalidDocError';
        constructor(e) {
          (super(
            (function (e) {
              let r,
                s = null === e ? 'null' : typeof e;
              if ('string' !== s && 'object' !== s)
                return `Unexpected doc '${s}', 
Expected it to be 'string' or 'object'.`;
              if (ta(e)) throw Error('doc is valid.');
              let n = Object.prototype.toString.call(e);
              if ('[object Object]' !== n) return `Unexpected doc '${n}'.`;
              let o =
                ((r = [...ti].map(e => `'${e}'`)),
                new Intl.ListFormat('en-US', { type: 'disjunction' }).format(
                  r
                ));
              return `Unexpected doc.type '${e.type}'.
Expected it to be ${o}.`;
            })(e)
          ),
            (this.doc = e));
        }
      };
    function tl(e, r) {
      if ('string' == typeof e) return r(e);
      let s = new Map();
      return n(e);
      function n(e) {
        if (!s.has(e)) {
          let r = o(e);
          s.set(e, r);
        }
        return s.get(e);
      }
      function o(e) {
        switch (ta(e)) {
          case e2:
            return r(e.map(n));
          case e7:
            return r({ ...e, parts: e.parts.map(n) });
          case e8:
            return r({
              ...e,
              breakContents: n(e.breakContents),
              flatContents: n(e.flatContents)
            });
          case e6: {
            let { expandedStates: s, contents: o } = e;
            return (
              (o = s ? (s = s.map(n))[0] : n(o)),
              r({ ...e, contents: o, expandedStates: s })
            );
          }
          case e9:
          case e4:
          case te:
          case tn:
          case tt:
            return r({ ...e, contents: n(e.contents) });
          case e0:
          case e3:
          case e5:
          case tr:
          case ts:
          case to:
            return r(e);
          default:
            throw new tu(e);
        }
      }
    }
    function tc(e) {
      return e.type !== ts || e.hard
        ? e.type === e8
          ? e.flatContents
          : e
        : e.soft
          ? ''
          : ' ';
    }
    function tp(e) {
      return (e1(), { type: e4, contents: e });
    }
    function th(e) {
      return (e1(), e1(), { type: e9, contents: e, n: -1 });
    }
    var tf = { type: to };
    function td(e) {
      return (e1(), { type: e7, parts: e });
    }
    function tm(e, r = {}) {
      return (
        e1(),
        e1(r.expandedStates),
        {
          type: e6,
          id: r.id,
          contents: e,
          break: !!r.shouldBreak,
          expandedStates: r.expandedStates
        }
      );
    }
    function ty(e, r = '', s = {}) {
      return (
        e1(),
        '' !== r && e1(),
        { type: e8, breakContents: e, flatContents: r, groupId: s.groupId }
      );
    }
    function tg(e, r) {
      (e1(), e1());
      let s = [];
      for (let n = 0; n < r.length; n++) (0 !== n && s.push(e), s.push(r[n]));
      return s;
    }
    var tv = { type: ts },
      tw = { type: ts, soft: !0 },
      tb = [{ type: ts, hard: !0 }, tf],
      tx = { type: ts, hard: !0, literal: !0 },
      tk = [tx, tf];
    function tO(e) {
      return (e1(), { type: tt, contents: e });
    }
    var tT = { type: tr },
      t_ = function (e) {
        return Array.isArray(e) && e.length > 0;
      },
      tS = Object.freeze({ character: "'", codePoint: 39 }),
      tC = Object.freeze({ character: '"', codePoint: 34 }),
      tA = Object.freeze({ preferred: tS, alternate: tC }),
      tE = Object.freeze({ preferred: tC, alternate: tS }),
      tj = /\\(["'\\])|(["'])/g,
      tI = function (e, r) {
        let s = '"' === r ? "'" : '"',
          n = eY(0, e, tj, (e, n, o) =>
            n ? (n === s ? s : e) : o === r ? '\\' + o : o
          );
        return r + n + r;
      },
      tP = function (e, r) {
        e1(/^(?<quote>["']).*\k<quote>$/s.test(e));
        let s = e.slice(1, -1),
          n;
        return (
          (n =
            'json' !== r.parser &&
            'jsonc' !== r.parser &&
            'json-stringify' !== r.parser &&
            ('json5' !== r.parser ||
              'preserve' !== r.quoteProps ||
              r.singleQuote)
              ? r.__isInHtmlAttribute
                ? "'"
                : (function (e, r) {
                    let { preferred: s, alternate: n } =
                        !0 === r || "'" === r ? tA : tE,
                      { length: o } = e,
                      i = 0,
                      a = 0;
                    for (let r = 0; r < o; r++) {
                      let o = e.charCodeAt(r);
                      o === s.codePoint ? i++ : o === n.codePoint && a++;
                    }
                    return (i > a ? n : s).character;
                  })(s, r.singleQuote)
              : '"'),
          e.charAt(0) === n ? e : tI(s, n)
        );
      },
      tM = class extends Error {
        name = 'UnexpectedNodeError';
        constructor(e, r, s = 'type') {
          (super(`Unexpected ${r} node ${s}: ${JSON.stringify(e[s])}.`),
            (this.node = e));
        }
      };
    function tN() {}
    tN.getVisitorKeys = e => ('css-root' === e.type ? ['frontMatter'] : []);
    var t$ = null;
    function tR(e) {
      if (null !== t$ && (t$.property, 1)) {
        let e = t$;
        return ((t$ = tR.prototype = null), e);
      }
      return ((t$ = tR.prototype = e ?? Object.create(null)), new tR());
    }
    for (let e = 0; e <= 10; e++) tR();
    var tW = [['nodes'], ['group']],
      tL = (function (e, r = 'type') {
        return (
          tR(e),
          function (s) {
            let n = s[r],
              o = e[n];
            if (!Array.isArray(o))
              throw Object.assign(Error(`Missing visitor keys for '${n}'.`), {
                node: s
              });
            return o;
          }
        );
      })({
        'css-root': ['frontMatter', 'nodes'],
        'css-comment': [],
        'css-rule': ['selector', 'nodes'],
        'css-decl': ['value', 'selector', 'nodes'],
        'css-atrule': ['selector', 'params', 'value', 'nodes'],
        'media-query-list': tW[0],
        'media-query': tW[0],
        'media-type': [],
        'media-feature-expression': tW[0],
        'media-feature': [],
        'media-colon': [],
        'media-value': [],
        'media-keyword': [],
        'media-url': [],
        'media-unknown': [],
        'selector-root': tW[0],
        'selector-selector': tW[0],
        'selector-comment': [],
        'selector-string': [],
        'selector-tag': [],
        'selector-id': [],
        'selector-class': [],
        'selector-attribute': [],
        'selector-combinator': tW[0],
        'selector-universal': [],
        'selector-pseudo': tW[0],
        'selector-nesting': [],
        'selector-unknown': [],
        'value-value': tW[1],
        'value-root': tW[1],
        'value-comment': [],
        'value-comma_group': ['groups'],
        'value-paren_group': ['open', 'groups', 'close'],
        'value-func': tW[1],
        'value-paren': [],
        'value-number': [],
        'value-operator': [],
        'value-word': [],
        'value-colon': [],
        'value-comma': [],
        'value-string': [],
        'value-atword': [],
        'value-unicode-range': [],
        'value-unknown': []
      }),
      tz = function (e, r) {
        let s = 0;
        for (let n = 0; n < e.line - 1; ++n)
          s =
            r.indexOf(
              `
`,
              s
            ) + 1;
        return s + e.column;
      };
    function tB(e) {
      return (r, s, n) => {
        if (!1 === s) return !1;
        let o = !!n?.backwards,
          { length: i } = r,
          a = s;
        for (; a >= 0 && a < i;) {
          let s = r.charAt(a);
          if (e instanceof RegExp) {
            if (!e.test(s)) return a;
          } else if (!e.includes(s)) return a;
          o ? a-- : a++;
        }
        return (-1 === a || a === i) && a;
      };
    }
    var tq = tB(' 	'),
      tD = tB(',; 	'),
      tF = tB(/[^\n\r]/);
    function tU(e, r) {
      let { value: s } = e;
      return '-' === s || '--' === s || '-' !== s.charAt(0)
        ? r
        : r - ('-' === s.charAt(1) ? 2 : 1);
    }
    function tV(e, r) {
      if ('number' == typeof e.source?.start?.offset)
        return e.source.start.offset;
      if ('number' == typeof e.sourceIndex)
        return 'value-word' === e.type ? tU(e, e.sourceIndex) : e.sourceIndex;
      if (e.source?.start) return tz(e.source.start, r);
      throw Object.assign(Error('Can not locate node.'), { node: e });
    }
    function tG(e) {
      let r = e.source.startOffset;
      return (
        'string' == typeof e.prop && (r += e.prop.length),
        'css-atrule' === e.type &&
          'string' == typeof e.name &&
          (r +=
            1 + e.name.length + e.raws.afterName.match(/^\s*:?\s*/)[0].length),
        'css-atrule' !== e.type &&
          'string' == typeof e.raws?.between &&
          (r += e.raws.between.length),
        r
      );
    }
    function tJ(e) {
      let r = e.source.startOffset;
      return (
        'css-atrule' === e.type &&
          'string' == typeof e.name &&
          (r +=
            1 + e.name.length + e.raws.afterName.match(/^\s*:?\s*/)[0].length),
        r
      );
    }
    function tH(e, r) {
      let s = e.indexOf(r);
      return -1 === s ? 0 : s;
    }
    function tQ(e, r) {
      var s;
      'string' != typeof e.type ||
        e.source ||
        'number' != typeof r.source?.startOffset ||
        'number' != typeof r.source?.endOffset ||
        !(
          (Array.isArray((s = e).nodes) && 0 === s.nodes.length) ||
          (Array.isArray(s.groups) && 0 === s.groups.length)
        ) ||
        (e.source = {
          startOffset: r.source.startOffset,
          endOffset: r.source.startOffset,
          start: r.source.start,
          end: r.source.start
        });
    }
    var tK = e => e.source.startOffset,
      tY = e => e.source.endOffset,
      tZ = Symbol.for('PRETTIER_IS_FRONT_MATTER'),
      tX = function (e) {
        return !!e?.[tZ];
      },
      t1 = function (e) {
        return eY(0, e, /[^\n]/g, ' ');
      },
      t0 = function (e) {
        let r = (function (e) {
          let r = e.slice(0, 3);
          if ('---' !== r && '+++' !== r) return;
          let s = e.indexOf(
            `
`,
            3
          );
          if (-1 === s) return;
          let n = e.slice(3, s).trim(),
            o = e.indexOf(
              `
${r}`,
              s
            ),
            i = n;
          if (
            (i || (i = '+++' === r ? 'toml' : 'yaml'),
            -1 === o &&
              '---' === r &&
              'yaml' === i &&
              (o = e.indexOf(
                `
...`,
                s
              )),
            -1 === o)
          )
            return;
          let a = o + 1 + 3,
            u = e.charAt(a + 1);
          if (!/\s?/.test(u)) return;
          let l = e.slice(0, a),
            c;
          return {
            language: i,
            explicitLanguage: n || null,
            value: e.slice(s + 1, o),
            startDelimiter: r,
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
                  eX(0, c, -1).length
                );
              }
            },
            [tZ]: !0
          };
        })(e);
        return r
          ? {
              frontMatter: r,
              get content() {
                let { raw: s } = r;
                return t1(s) + e.slice(s.length);
              }
            }
          : { content: e };
      };
    function t2(e, r, s) {
      var n;
      if (
        'css-comment' === e.type &&
        'css-root' === s.type &&
        s.nodes.length > 0 &&
        (((s.nodes[0] === e || (tX(s.nodes[0]) && s.nodes[1] === e)) &&
          (delete r.text, /^\*\s*@(?:format|prettier)\s*$/.test(e.text))) ||
          ('css-root' === s.type && eX(0, s.nodes, -1) === e))
      )
        return null;
      if (
        ('value-root' === e.type && delete r.text,
        ('media-query' === e.type ||
          'media-query-list' === e.type ||
          'media-feature-expression' === e.type) &&
          delete r.value,
        'css-rule' === e.type &&
          (delete r.params,
          e.extend &&
            ((n = e.selector),
            n?.nodes?.some(e =>
              e.nodes?.some(
                e => 'selector-pseudo' === e.type && ':extend' === e.value
              )
            )) &&
            delete r.extend),
        ('media-feature' === e.type ||
          'media-keyword' === e.type ||
          'media-type' === e.type ||
          'media-unknown' === e.type ||
          'media-url' === e.type ||
          'media-value' === e.type ||
          'selector-attribute' === e.type ||
          'selector-string' === e.type ||
          'selector-class' === e.type ||
          'selector-combinator' === e.type ||
          'value-string' === e.type) &&
          e.value &&
          (r.value = eY(0, eY(0, e.value, "'", '"'), /\\([^\da-f])/gi, '$1')),
        'selector-combinator' === e.type &&
          (r.value = eY(0, r.value, /\s+/g, ' ')),
        'media-feature' === e.type && (r.value = eY(0, r.value, ' ', '')),
        (('value-word' === e.type &&
          ((e.isColor && e.isHex) ||
            ['initial', 'inherit', 'unset', 'revert'].includes(
              e.value.toLowerCase()
            ))) ||
          'media-feature' === e.type ||
          'selector-root-invalid' === e.type ||
          'selector-pseudo' === e.type) &&
          (r.value = r.value.toLowerCase()),
        'css-decl' === e.type && (r.prop = e.prop.toLowerCase()),
        ('css-atrule' === e.type || 'css-import' === e.type) &&
          (r.name = e.name.toLowerCase()),
        'value-number' === e.type && (r.unit = e.unit.toLowerCase()),
        'value-unknown' === e.type && (r.value = eY(0, r.value, /;$/g, '')),
        'selector-attribute' === e.type &&
          ((r.attribute = e.attribute.trim()),
          e.namespace &&
            'string' == typeof e.namespace &&
            (r.namespace = e.namespace.trim() || !0),
          e.value))
      ) {
        let { value: e } = r;
        (/\s[a-z]$/i.test(e) &&
          ((r.__prettier_attribute_selector_flag = eX(0, e, -1)),
          (e = e.slice(0, -1))),
          (r.value = e =
            (e = e.trim()).replace(
              /^(?<quote>["'])(?<value>.*?)\k<quote>$/,
              '$<value>'
            )),
          delete r.quoted);
      }
      if (
        (('media-value' === e.type ||
          'media-type' === e.type ||
          'value-number' === e.type ||
          'selector-root-invalid' === e.type ||
          'selector-class' === e.type ||
          'selector-combinator' === e.type ||
          'selector-tag' === e.type) &&
          e.value &&
          (r.value = eY(0, r.value, /([\d+.e-]+)([a-z]*)/gi, (e, r, s) => {
            let n = Number(r);
            return Number.isNaN(n) ? e : n + s.toLowerCase();
          })),
        'selector-tag' === e.type)
      ) {
        let e = r.value.toLowerCase();
        ['from', 'to'].includes(e) && (r.value = e);
      }
      if (
        ('css-atrule' === e.type &&
          'supports' === e.name.toLowerCase() &&
          delete r.value,
        'selector-unknown' === e.type && delete r.value,
        'value-comma_group' === e.type)
      ) {
        let s = e.groups.findIndex(
          e => 'value-number' === e.type && '...' === e.unit
        );
        -1 !== s &&
          ((r.groups[s].unit = ''),
          r.groups.splice(s + 1, 0, {
            type: 'value-word',
            value: '...',
            isColor: !1,
            isHex: !1
          }));
      }
      if (
        'value-comma_group' === e.type &&
        e.groups.some(
          e =>
            ('value-atword' === e.type &&
              (e.value.endsWith('[') || e.value.endsWith(']'))) ||
            ('value-word' === e.type &&
              (e.value.startsWith(']') || e.value.startsWith('[')))
        )
      )
        return {
          type: 'value-atword',
          value: e.groups.map(e => e.value).join('')
        };
      if (
        'value-func' === e.type &&
        'if' === e.value &&
        'value-paren_group' === e.group.type &&
        1 === e.group.groups.length &&
        'value-comma_group' === e.group.groups[0].type
      ) {
        let s = e.group.groups[0].groups,
          n = r.group.groups[0].groups;
        for (let e = s.length - 1; e >= 0; e--) {
          let r = s[e];
          if (
            'value-word' === r.type &&
            'string' == typeof r.value &&
            r.value.endsWith(';')
          ) {
            if (';' === r.value) {
              s[e - 1]?.type === 'value-number' &&
                n.splice(e - 1, 2, { type: '#node-placeholder' });
              continue;
            }
            n[e] = { type: '#node-placeholder' };
          }
        }
      }
    }
    t2.ignoredProperties = new Set([
      'raw',
      'raws',
      'sourceIndex',
      'source',
      'before',
      'after',
      'trailingComma',
      'spaces'
    ]);
    var t3 =
        Object.hasOwn ??
        Function.prototype.call.bind(Object.prototype.hasOwnProperty),
      t4 = /\*\/$/,
      t9 = /^\/\*\*?/,
      t5 = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/,
      t6 = /(^|\s+)\/\/([^\n\r]*)/g,
      t7 = /^(\r?\n)+/,
      t8 =
        /(?:^|\r?\n) *(@[^\n\r]*?) *\r?\n *(?![^\n\r@]*\/\/[^]*)([^\s@][^\n\r@]+?) *\r?\n/g,
      re = /(?:^|\r?\n) *@(\S+) *([^\n\r]*)/g,
      rt = /(\r?\n|^) *\* ?/g,
      rr = [];
    function rs(e, r) {
      return [...rr, ...(Array.isArray(r) ? r : [r])].map(r =>
        `@${e} ${r}`.trim()
      );
    }
    var rn = ['noformat', 'noprettier'],
      ro = ['format', 'prettier'],
      ri = function (e) {
        if (!e.startsWith('#!')) return '';
        let r = e.indexOf(`
`);
        return -1 === r ? e : e.slice(0, r);
      };
    function ra(e) {
      let r,
        s = ri(e);
      s && (e = e.slice(s.length + 1));
      let { pragmas: n, comments: o } = (function (e) {
        e = eY(0, e.replace(t9, '').replace(t4, ''), rt, '$1');
        let r = '';
        for (; r !== e;)
          ((r = e),
            (e = eY(
              0,
              e,
              t8,
              `
$1 $2
`
            )));
        e = e.replace(t7, '').trimEnd();
        let s = Object.create(null),
          n = eY(0, e, re, '').replace(t7, '').trimEnd(),
          o;
        for (; (o = re.exec(e));) {
          let e = eY(0, o[2], t6, '');
          if ('string' == typeof s[o[1]] || Array.isArray(s[o[1]])) {
            let r = s[o[1]];
            s[o[1]] = [...rr, ...(Array.isArray(r) ? r : [r]), e];
          } else s[o[1]] = e;
        }
        return { comments: n, pragmas: s };
      })((r = e.match(t5)) ? r[0].trimStart() : '');
      return { shebang: s, text: e, pragmas: n, comments: o };
    }
    var ru = new Set([
        'red',
        'green',
        'blue',
        'alpha',
        'a',
        'rgb',
        'hue',
        'h',
        'saturation',
        's',
        'lightness',
        'l',
        'whiteness',
        'w',
        'blackness',
        'b',
        'tint',
        'shade',
        'blend',
        'blenda',
        'contrast',
        'hsl',
        'hsla',
        'hwb',
        'hwba'
      ]),
      rl = new Set(['initial', 'inherit', 'unset', 'revert']);
    function rc(e) {
      return e.includes('$') ||
        e.includes('@') ||
        e.includes('#') ||
        e.startsWith('%') ||
        e.startsWith('--') ||
        e.startsWith(':--') ||
        (e.includes('(') && e.includes(')'))
        ? e
        : e.toLowerCase();
    }
    function rp(e, r) {
      return (
        e.findAncestor(e => 'value-func' === e.type)?.value?.toLowerCase() === r
      );
    }
    function rh(e, r) {
      let s = Array.isArray(r) ? r : [r],
        n = e.findAncestor(e => 'css-atrule' === e.type);
      return n && s.includes(n.name.toLowerCase());
    }
    function rf(e) {
      return 'value-operator' === e.type && '*' === e.value;
    }
    function rd(e) {
      return e?.type === 'value-operator' && '/' === e.value;
    }
    function rm(e) {
      return 'value-operator' === e.type && '+' === e.value;
    }
    function ry(e) {
      return 'value-operator' === e.type && '-' === e.value;
    }
    function rg(e) {
      return (
        rf(e) ||
        rd(e) ||
        rm(e) ||
        ry(e) ||
        ('value-operator' === e.type && '%' === e.value)
      );
    }
    function rv(e, r) {
      return (
        'scss' === r.parser &&
        'css-atrule' === e.type &&
        ['if', 'else', 'for', 'each', 'while'].includes(e.name)
      );
    }
    function rw(e) {
      return e.raws?.params && /^\(\s*\)$/.test(e.raws.params);
    }
    function rb(e) {
      return e.name.startsWith('prettier-placeholder');
    }
    function rx(e) {
      return e?.raws?.before === '';
    }
    function rk(e) {
      return (
        'value-comma_group' === e.type && e.groups?.[1]?.type === 'value-colon'
      );
    }
    function rO(e) {
      return 'value-paren_group' === e.type && e.groups?.[0] && rk(e.groups[0]);
    }
    function rT(e, r) {
      if ('scss' !== r.parser) return !1;
      let { node: s } = e;
      if (
        0 === s.groups.length ||
        ('value-paren_group' === s.type &&
          s.open &&
          s.close &&
          1 === s.groups.length &&
          'value-comma_group' !== s.groups[0].type)
      )
        return !1;
      let n = e.parent;
      if (n && 'value-func' === n.type && 'if' === n.value) return !1;
      let o = e.grandparent;
      return (
        (!!rO(s) || !!(o && rO(o))) &&
        (!!e.findAncestor(e => 'css-decl' === e.type)?.prop?.startsWith('$') ||
          (rO(o) ? !n.groups.some(e => rg(e)) : 'value-func' === o.type))
      );
    }
    function r_(e) {
      return 'value-comment' === e.type && e.inline;
    }
    function rS(e) {
      return 'value-word' === e.type && '#' === e.value;
    }
    function rC(e) {
      return 'value-word' === e.type && '{' === e.value;
    }
    function rA(e) {
      return 'value-word' === e.type && '}' === e.value;
    }
    function rE(e) {
      return ['value-word', 'value-atword'].includes(e.type);
    }
    function rj(e) {
      return e?.type === 'value-colon';
    }
    function rI(e) {
      return /\/\//.test(e.split(/[\n\r]/).pop());
    }
    function rP(e) {
      return (
        e?.type === 'value-atword' &&
        e.value.startsWith('prettier-placeholder-')
      );
    }
    function rM(e) {
      return (
        'value-paren_group' === e.type &&
        e.open?.value === '(' &&
        e.close?.value === ')'
      );
    }
    function rN(e) {
      if (e?.type === 'value-number') return !0;
      if (e?.type !== 'value-func') return !1;
      let r = e.value.toLowerCase();
      return (
        'var' === r ||
        'calc' === r ||
        'min' === r ||
        'max' === r ||
        'clamp' === r ||
        r.startsWith('--')
      );
    }
    var r$ = function (e, r, s) {
        var n;
        let { node: o } = e,
          i = e.parent,
          a = e.grandparent,
          u = e.findAncestor(e => 'css-decl' === e.type)?.prop?.toLowerCase(),
          l =
            u &&
            'value-value' === i.type &&
            ('grid' === u || u.startsWith('grid-template')),
          c = e.findAncestor(e => 'css-atrule' === e.type),
          p = c && rv(c, r),
          h = o.groups.some(e => r_(e)),
          f = e.map(s, 'groups'),
          d = [''],
          m = rp(e, 'url'),
          y = !1,
          g = !1;
        for (let s = 0; s < o.groups.length; ++s) {
          let h = o.groups[s - 1],
            v = o.groups[s],
            w = o.groups[s + 1];
          if (r_(v) && !w) {
            d.push([d.pop(), tO([' ', f[s]])]);
            continue;
          }
          if ((d.push([d.pop(), f[s]]), m)) {
            ((w && rm(w)) || rm(v)) && d.push([d.pop(), ' ']);
            continue;
          }
          if (
            (rh(e, 'forward') &&
              'value-word' === v.type &&
              v.value &&
              void 0 !== h &&
              'value-word' === h.type &&
              'as' === h.value &&
              'value-operator' === w.type &&
              '*' === w.value) ||
            (rh(e, 'utility') &&
              'value-word' === v.type &&
              w &&
              'value-operator' === w.type &&
              '*' === w.value) ||
            !w ||
            ('scss' === r.parser &&
              'value-word' === w.type &&
              ';' === w.value &&
              e.match(
                void 0,
                (e, r) => 'groups' === r && 'value-paren_group' === e.type,
                (e, r) =>
                  'group' === r && 'value-func' === e.type && 'if' === e.value
              )) ||
            ('value-word' === v.type && rP(w) && tY(v) === tK(w))
          )
            continue;
          if ('value-string' === v.type && v.quoted) {
            let e = v.value.lastIndexOf('#{'),
              r = v.value.lastIndexOf('}');
            -1 !== e && -1 !== r
              ? (y = e > r)
              : -1 !== e
                ? (y = !0)
                : -1 !== r && (y = !1);
          }
          if (
            y ||
            rj(v) ||
            rj(w) ||
            ('value-atword' === v.type &&
              ('' === v.value || v.value.endsWith('['))) ||
            ('value-word' === w.type && w.value.startsWith(']')) ||
            '~' === v.value
          )
            continue;
          if ('less' === r.parser) {
            if (w?.type === 'value-word' && '[' === w.value) continue;
            if (
              'value-word' === v.type &&
              v.value.endsWith('[') &&
              (w?.type === 'value-atword' || w?.type === 'value-word')
            ) {
              e1(
                o.groups.some(
                  (e, r) =>
                    r > s &&
                    (e.value?.startsWith(']') || e.value?.endsWith(']'))
                )
              );
              continue;
            }
          }
          if (
            ('value-string' !== v.type &&
              v.value &&
              v.value.includes('\\') &&
              w &&
              'value-comment' !== w.type) ||
            (h?.value &&
              h.value.indexOf('\\') === h.value.length - 1 &&
              'value-operator' === v.type &&
              '/' === v.value) ||
            '\\' === v.value ||
            ('$$' === v.value &&
              'value-func' === v.type &&
              w?.type === 'value-word' &&
              !w.raws.before) ||
            rS(v) ||
            rC(v) ||
            rA(w) ||
            (rC(w) && rx(w)) ||
            (rA(v) && rx(w)) ||
            ('--' === v.value && rS(w))
          )
            continue;
          let b = rg(v),
            x = rg(w);
          if (
            (((b && rS(w)) || (x && rA(v))) && rx(w)) ||
            (rm(w) && rp(e, 'type') && rx(w)) ||
            (!h && rd(v)) ||
            (rp(e, 'calc') && (rm(v) || rm(w) || ry(v) || ry(w)) && rx(w))
          )
            continue;
          if (
            'scss' === r.parser &&
            b &&
            '-' === v.value &&
            'value-func' === w.type &&
            tY(v) !== tK(w)
          ) {
            d.push([d.pop(), ' ']);
            continue;
          }
          let k = o.groups[s + 2],
            O =
              (rm(v) || ry(v)) &&
              0 === s &&
              ('value-number' === w.type || w.isHex) &&
              a &&
              'value-func' === (n = a).type &&
              ru.has(n.value.toLowerCase()) &&
              !rx(w),
            T =
              k?.type === 'value-func' ||
              (k && rE(k)) ||
              'value-func' === v.type ||
              rE(v),
            _ =
              'value-func' === w.type ||
              rE(w) ||
              h?.type === 'value-func' ||
              (h && rE(h));
          if (
            !(
              !(rf(w) || rf(v)) &&
              !rp(e, 'calc') &&
              !O &&
              ((rd(w) && !T) ||
                (rd(v) && !_) ||
                (rm(w) && !T) ||
                (rm(v) && !_) ||
                ry(w) ||
                ry(v)) &&
              (rx(w) || (b && (!h || (h && rg(h)))))
            ) &&
            !(
              ('scss' === r.parser || 'less' === r.parser) &&
              b &&
              '-' === v.value &&
              rM(w) &&
              tY(v) === tK(w.open) &&
              '(' === w.open.value
            )
          ) {
            if (r_(v)) {
              if ('value-paren_group' === i.type) {
                d.push(th(tb), '');
                continue;
              }
              d.push(tb, '');
              continue;
            }
            if (
              (p &&
                (('value-word' === w.type && ['==', '!='].includes(w.value)) ||
                  ('value-word' === w.type &&
                    ['<', '>', '<=', '>='].includes(w.value)) ||
                  ('value-word' === w.type &&
                    ['and', 'or', 'not'].includes(w.value)) ||
                  ('value-word' === v.type && 'in' === v.value) ||
                  ('value-word' === v.type &&
                    ['from', 'through', 'end'].includes(v.value)))) ||
              (c && 'namespace' === c.name.toLowerCase())
            ) {
              d.push([d.pop(), ' ']);
              continue;
            }
            if (l) {
              v.source &&
              w.source &&
              v.source.start.line !== w.source.start.line
                ? (d.push(tb, ''), (g = !0))
                : d.push([d.pop(), ' ']);
              continue;
            }
            if (!(
              u &&
              ('font' === u || u.startsWith('--')) &&
              ((rd(w) && rx(w) && rN(v)) || (rd(v) && rx(v) && rN(h)))
            )) {
              if (x) {
                d.push([d.pop(), ' ']);
                continue;
              }
              if (w?.value !== '...' && !(rP(v) && rP(w) && tY(v) === tK(w))) {
                if (rP(v) && rM(w) && tY(v) === tK(w.open)) {
                  d.push(tw, '');
                  continue;
                }
                if ('with' === v.value && rM(w)) {
                  d = [[td(d), ' ']];
                  continue;
                }
                if (
                  !(v.value?.endsWith('#') && '{' === w.value && rM(w.group)) &&
                  !(r_(w) && !k)
                ) {
                  if (
                    !c &&
                    'value-comment' === v.type &&
                    !v.inline &&
                    o.groups.slice(0, s).every(e => 'value-comment' === e.type)
                  ) {
                    d.push(th(tv), '');
                    continue;
                  }
                  d.push(tv, '');
                }
              }
            }
          }
        }
        return (
          h && d.push([d.pop(), tf]),
          g && d.unshift('', tb),
          p
            ? tm(tp(d))
            : !(function (e) {
                  let { node: r } = e;
                  return (
                    r.groups[0]?.value === 'url' &&
                    2 === r.groups.length &&
                    e.findAncestor(e => 'css-atrule' === e.type)?.name ===
                      'import'
                  );
                })(e)
              ? tm(tp(td(d)))
              : tm(td(d))
        );
      },
      rR = new Map([
        ['em', 'em'],
        ['rem', 'rem'],
        ['ex', 'ex'],
        ['rex', 'rex'],
        ['cap', 'cap'],
        ['rcap', 'rcap'],
        ['ch', 'ch'],
        ['rch', 'rch'],
        ['ic', 'ic'],
        ['ric', 'ric'],
        ['lh', 'lh'],
        ['rlh', 'rlh'],
        ['vw', 'vw'],
        ['svw', 'svw'],
        ['lvw', 'lvw'],
        ['dvw', 'dvw'],
        ['vh', 'vh'],
        ['svh', 'svh'],
        ['lvh', 'lvh'],
        ['dvh', 'dvh'],
        ['vi', 'vi'],
        ['svi', 'svi'],
        ['lvi', 'lvi'],
        ['dvi', 'dvi'],
        ['vb', 'vb'],
        ['svb', 'svb'],
        ['lvb', 'lvb'],
        ['dvb', 'dvb'],
        ['vmin', 'vmin'],
        ['svmin', 'svmin'],
        ['lvmin', 'lvmin'],
        ['dvmin', 'dvmin'],
        ['vmax', 'vmax'],
        ['svmax', 'svmax'],
        ['lvmax', 'lvmax'],
        ['dvmax', 'dvmax'],
        ['cm', 'cm'],
        ['mm', 'mm'],
        ['q', 'Q'],
        ['in', 'in'],
        ['pt', 'pt'],
        ['pc', 'pc'],
        ['px', 'px'],
        ['deg', 'deg'],
        ['grad', 'grad'],
        ['rad', 'rad'],
        ['turn', 'turn'],
        ['s', 's'],
        ['ms', 'ms'],
        ['hz', 'Hz'],
        ['khz', 'kHz'],
        ['dpi', 'dpi'],
        ['dpcm', 'dpcm'],
        ['dppx', 'dppx'],
        ['x', 'x'],
        ['cqw', 'cqw'],
        ['cqh', 'cqh'],
        ['cqi', 'cqi'],
        ['cqb', 'cqb'],
        ['cqmin', 'cqmin'],
        ['cqmax', 'cqmax'],
        ['fr', 'fr']
      ]);
    function rW(e) {
      let r = e.toLowerCase();
      return rR.has(r) ? rR.get(r) : e;
    }
    var rL = /(["'])(?:(?!\1)[^\\]|\\.)*\1/gs,
      rz = RegExp(
        rL.source +
          `|(${/[$@]?[_a-z\u0080-\uFFFF][\w\u0080-\uFFFF-]*/gi.source})?(${/(?:\d*\.\d+|\d+\.?)(?:e[+-]?\d+)?/gi.source})(${/[a-z]+/gi.source})?`,
        'gi'
      );
    function rB(e, r) {
      return eY(0, e, rL, e => tP(e, r));
    }
    function rq(e) {
      return eY(0, e, rz, (e, r, s, n, o) =>
        !s &&
        n &&
        (o ?? (o = ''), !(o = o.toLowerCase()) || 'n' === o || rR.has(o))
          ? rD(n) + (o ? rW(o) : '')
          : e
      );
    }
    function rD(e) {
      return (
        1 === e.length
          ? e
          : e
              .toLowerCase()
              .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(?=\d)/, '$1$2')
              .replace(/^([+-]?[\d.]+)e[+-]?0+$/, '$1')
              .replace(/^([+-])?\./, '$10.')
              .replace(/(\.\d+?)0+(?=e|$)/, '$1')
              .replace(/\.(?=e|$)/, '')
      ).replace(/\.0(?=$|e)/, '');
    }
    var rF = e =>
        e ===
          `
` ||
        '\r' === e ||
        '\u2028' === e ||
        '\u2029' === e,
      rU = function (e, r, s) {
        if (!1 === r) return !1;
        let n = !!s?.backwards,
          o = e.charAt(r);
        if (n) {
          if (
            '\r' === e.charAt(r - 1) &&
            o ===
              `
`
          )
            return r - 2;
          if (rF(o)) return r - 1;
        } else {
          if (
            '\r' === o &&
            e.charAt(r + 1) ===
              `
`
          )
            return r + 2;
          if (rF(o)) return r + 1;
        }
        return r;
      },
      rV = function (e, r, s = {}) {
        let n = tq(e, s.backwards ? r - 1 : r, s),
          o = rU(e, n, s);
        return n !== o;
      },
      rG = function (e, r) {
        if (!1 === r) return !1;
        if ('/' === e.charAt(r) && '*' === e.charAt(r + 1)) {
          for (let s = r + 2; s < e.length; ++s)
            if ('*' === e.charAt(s) && '/' === e.charAt(s + 1)) return s + 2;
        }
        return r;
      },
      rJ = function (e, r) {
        var s;
        let n = null,
          o = r;
        for (; o !== n;)
          ((n = o), (o = tD(e, o)), (o = rG(e, o)), (o = tq(e, o)));
        return (
          !1 !==
            (o = rU(
              e,
              (o =
                !1 !== (s = o) &&
                ('/' === e.charAt(s) && '/' === e.charAt(s + 1) ? tF(e, s) : s))
            )) && rV(e, o)
        );
      };
    function rH(e) {
      return e.match(
        e =>
          'value-paren_group' === e.type &&
          !e.open &&
          e.groups.some(e => 'value-comma_group' === e.type),
        (e, r) => 'group' === r && 'value-value' === e.type,
        (e, r) => 'group' === r && 'value-root' === e.type,
        (e, r) =>
          'value' === r &&
          (('css-decl' === e.type && !e.prop.startsWith('--')) ||
            ('css-atrule' === e.type && e.variable))
      );
    }
    var rQ = function (e, r, s) {
        let n = [];
        return (
          e.each(() => {
            let { node: o, previous: i } = e;
            if (
              (i?.type === 'css-comment' && 'prettier-ignore' === i.text.trim()
                ? n.push(r.originalText.slice(tK(o), tY(o)))
                : n.push(s()),
              e.isLast)
            )
              return;
            let { next: a } = e;
            ('css-comment' !== a.type ||
              rV(r.originalText, tK(a), { backwards: !0 }) ||
              tX(o)) &&
            ('css-atrule' !== a.type ||
              'else' !== a.name ||
              'css-comment' === o.type)
              ? (n.push(r.__isHTMLStyleAttribute ? tv : tb),
                rJ(r.originalText, tY(o)) && !tX(o) && n.push(tb))
              : n.push(' ');
          }, 'nodes'),
          n
        );
      },
      rK = [
        {
          name: 'CSS',
          type: 'markup',
          aceMode: 'css',
          extensions: ['.css', '.wxss'],
          tmScope: 'source.css',
          codemirrorMode: 'css',
          codemirrorMimeType: 'text/css',
          parsers: ['css'],
          vscodeLanguageIds: ['css'],
          linguistLanguageId: 50
        },
        {
          name: 'PostCSS',
          type: 'markup',
          aceMode: 'text',
          extensions: ['.pcss', '.postcss'],
          tmScope: 'source.postcss',
          group: 'CSS',
          parsers: ['css'],
          vscodeLanguageIds: ['postcss'],
          linguistLanguageId: 0xfa97795
        },
        {
          name: 'Less',
          type: 'markup',
          aceMode: 'less',
          extensions: ['.less'],
          tmScope: 'source.css.less',
          aliases: ['less-css'],
          codemirrorMode: 'css',
          codemirrorMimeType: 'text/x-less',
          parsers: ['less'],
          vscodeLanguageIds: ['less'],
          linguistLanguageId: 198
        },
        {
          name: 'SCSS',
          type: 'markup',
          aceMode: 'scss',
          extensions: ['.scss'],
          tmScope: 'source.css.scss',
          codemirrorMode: 'css',
          codemirrorMimeType: 'text/x-scss',
          parsers: ['scss'],
          vscodeLanguageIds: ['scss'],
          linguistLanguageId: 329
        }
      ],
      rY = {
        singleQuote: {
          category: 'Common',
          type: 'boolean',
          default: !1,
          description: 'Use single quotes instead of double quotes.'
        }
      },
      rZ = {};
    p(rZ, { css: () => sp, less: () => sh, scss: () => sf });
    var rX = h(M(), 1),
      r1 = h(q(), 1),
      r0 = h(et(), 1),
      r2 = function (e) {
        return null !== e && 'object' == typeof e;
      };
    function r3(e, r, s) {
      if (r2(e))
        for (let n in (delete e.parent, e))
          (r3(e[n], r, s),
            'type' !== n ||
              'string' != typeof e[n] ||
              e[n].startsWith(r) ||
              (s && s.test(e[n])) ||
              (e[n] = r + e[n]));
      return e;
    }
    var r4 = h(eo(), 1).default.default,
      r9 = function (e) {
        let r;
        try {
          r = r4(e);
        } catch {
          return { type: 'selector-unknown', value: e };
        }
        return r3(
          (function e(r) {
            if (r2(r)) {
              for (let s in (delete r.parent, r)) e(r[s]);
              Array.isArray(r) || !r.value || r.type || (r.type = 'unknown');
            }
            return r;
          })(r),
          'media-'
        );
      },
      r5 = h(eA(), 1),
      r6 = function (e) {
        let r;
        if (/\/[/*]/.test(eY(0, e, /"[^"]+"|'[^']+'/g, '')))
          return { type: 'selector-unknown', value: e.trim() };
        try {
          new r5.default(e => {
            r = e;
          }).process(e);
        } catch {
          return { type: 'selector-unknown', value: e };
        }
        return r3(r, 'selector-');
      },
      r7 = h(eJ(), 1),
      r8 = e => {
        for (; e.parent;) e = e.parent;
        return e;
      },
      se = function (e) {
        if (t_(e)) {
          for (let r = e.length - 1; r > 0; r--)
            if (
              'word' === e[r].type &&
              '{' === e[r].value &&
              'word' === e[r - 1].type &&
              e[r - 1].value.endsWith('#')
            )
              return !0;
        }
        return !1;
      },
      st = e => 'paren' === e.type && ')' === e.value,
      sr = function (e, r) {
        let s;
        if ('less' === r.parser && e.startsWith('~`'))
          return { type: 'value-unknown', value: e };
        try {
          s = new r7.default(e, { loose: !0 }).parse();
        } catch {
          return { type: 'value-unknown', value: e };
        }
        return (
          (s.text = e),
          r3(
            (function e(r, s) {
              if (r2(r))
                for (let n in r)
                  'parent' !== n &&
                    (e(r[n], s),
                    'nodes' === n &&
                      (('atword' === r.type && 0 === r.nodes.length) ||
                        (r.group = (function e(r) {
                          return ('paren_group' !== r.type ||
                            r.open ||
                            r.close ||
                            1 !== r.groups.length) &&
                            ('comma_group' !== r.type || 1 !== r.groups.length)
                            ? 'paren_group' === r.type ||
                              'comma_group' === r.type
                              ? { ...r, groups: r.groups.map(e) }
                              : r
                            : e(r.groups[0]);
                        })(
                          (function (e, r) {
                            let { nodes: s } = e,
                              n = {
                                open: null,
                                close: null,
                                groups: [],
                                type: 'paren_group'
                              },
                              o = [n],
                              i = n,
                              a = { groups: [], type: 'comma_group' },
                              u = [a];
                            for (let i = 0; i < s.length; ++i) {
                              let c = s[i];
                              if (
                                ('scss' === r.parser &&
                                  'number' === c.type &&
                                  '..' === c.unit &&
                                  c.value.endsWith('.') &&
                                  ((c.value = c.value.slice(0, -1)),
                                  (c.unit = '...')),
                                'func' === c.type && 'selector' === c.value)
                              ) {
                                let r = r8(e).text.slice(
                                    c.group.open.sourceIndex + 1,
                                    c.group.close.sourceIndex
                                  ),
                                  s = r6(r);
                                ((s.sourceIndex = c.group.open.sourceIndex + 1),
                                  s.raws ?? (s.raws = {}),
                                  (s.raws.selector = r),
                                  (c.group.groups = [s]));
                              }
                              if ('func' === c.type && 'url' === c.value) {
                                var l;
                                let e = c.group?.groups ?? [],
                                  s = [];
                                for (let r = 0; r < e.length; r++) {
                                  let n = e[r];
                                  'comma_group' === n.type
                                    ? (s = [...s, ...n.groups])
                                    : s.push(n);
                                }
                                (!se(s) &&
                                  (s.some(
                                    e =>
                                      'string' === e.type ||
                                      ('func' === e.type &&
                                        !e.value.endsWith('\\'))
                                  ) ||
                                    ((l = s[0]),
                                    'scss' === r.parser &&
                                      l?.type === 'word' &&
                                      l.value.startsWith('$')))) ||
                                  (c.group.groups = [
                                    r8(c)
                                      .text.slice(
                                        c.group.open.sourceIndex + 1,
                                        c.group.close.sourceIndex
                                      )
                                      .trim()
                                  ]);
                              }
                              if ('paren' === c.type && '(' === c.value)
                                ((n = {
                                  open: c,
                                  close: null,
                                  groups: [],
                                  type: 'paren_group'
                                }),
                                  o.push(n),
                                  (a = { groups: [], type: 'comma_group' }),
                                  u.push(a));
                              else if (st(c)) {
                                if (
                                  (a.groups.length > 0 && n.groups.push(a),
                                  (n.close = c),
                                  1 === u.length)
                                )
                                  throw Error('Unbalanced parenthesis');
                                (u.pop(),
                                  (a = eX(0, u, -1)).groups.push(n),
                                  o.pop(),
                                  (n = eX(0, o, -1)));
                              } else if ('comma' === c.type) {
                                if (
                                  i === s.length - 3 &&
                                  'comment' === s[i + 1].type &&
                                  st(s[i + 2])
                                )
                                  continue;
                                (n.groups.push(a),
                                  (a = { groups: [], type: 'comma_group' }),
                                  (u[u.length - 1] = a));
                              } else a.groups.push(c);
                            }
                            return (a.groups.length > 0 && n.groups.push(a), i);
                          })(r, s)
                        )),
                      delete r[n]));
              return r;
            })(s, r),
            'value-',
            /^selector-/
          )
        );
      },
      ss = new Set(['import', 'use', 'forward']),
      sn = /(\s*)(!default).*$/,
      so = /(\s*)(!global).*$/;
    function si(e, r, s) {
      let { frontMatter: n, content: o } = t0(r),
        i;
      try {
        i = e(o, { map: !1 });
      } catch (o) {
        var a;
        let { name: e, reason: r, line: s, column: n } = o;
        throw 'number' != typeof s
          ? o
          : Object.assign(
              SyntaxError(
                `${e}: ${r} (` +
                  (a = { loc: { start: { line: s, column: n } }, cause: o }).loc
                    .start.line +
                  ':' +
                  a.loc.start.column +
                  ')'
              ),
              a
            );
      }
      return (
        (s.originalText = r),
        (function e(r, s, n, o) {
          if (o && 'string' == typeof r.type)
            (r.source ?? (r.source = {}),
              (r.source.startOffset = n),
              (r.source.endOffset = n + s.length));
          else if (
            ('number' != typeof r.source?.startOffset ||
              'number' != typeof r.source?.endOffset) &&
            (r.source || 'number' == typeof r.sourceIndex)
          ) {
            r.source ?? (r.source = {});
            let e = n + s.length;
            r.source.startOffset = Math.min(tV(r, s) + n, e);
            let o = (function e(r, s) {
              if ('css-comment' === r.type && r.inline)
                return tF(s, r.source.startOffset);
              if ('value-paren' === r.type && 'number' == typeof r.sourceIndex)
                return r.sourceIndex + (')' === r.value ? r.value.length : 0);
              if ('number' == typeof r.source?.end?.offset)
                return r.source.end.offset;
              if (r.source) {
                if (r.source.end) {
                  let e = tz(r.source.end, s);
                  return 'value-word' === r.type ? tU(r, e) : e;
                }
                if (t_(r.nodes)) return e(eX(0, r.nodes, -1), s);
                if ('css-atrule' === r.type && 'string' == typeof r.name)
                  return (
                    tV(r, s) +
                    1 +
                    r.name.length +
                    r.raws.afterName.length +
                    r.raws.params.length
                  );
              }
              return 'number' == typeof r.sourceIndex &&
                'string' == typeof r.value
                ? r.sourceIndex + r.value.length
                : null;
            })(r, s);
            r.source.endOffset = 'number' == typeof o ? Math.min(o + n, e) : o;
          }
          for (let o in r) {
            let i = r[o];
            if ('source' !== o && i && 'object' == typeof i)
              for (let o of Array.isArray(i) ? i : [i]) {
                if (!o || 'object' != typeof o) continue;
                let i = (function (e, r, s) {
                  if ('value-root' === r.type || 'value-unknown' === r.type)
                    return { rootOffset: tG(e), text: r.text || r.value || '' };
                  if ('media-query-list' === r.type || e.params === r)
                    return {
                      rootOffset: tJ(e),
                      text: e.raws?.params || r.value || ''
                    };
                  if (r.type?.startsWith('selector-')) {
                    let u = (function (e, r) {
                      if ('string' == typeof r.raws?.selector)
                        return r.raws.selector;
                      if (e.selector === r) {
                        if (e.mixin)
                          return (
                            e.raws.identifier +
                            e.name +
                            e.raws.afterName +
                            e.raws.params
                          );
                        if ('string' == typeof e.raws?.selector)
                          return e.raws.selector;
                        if (
                          e.customSelector &&
                          'string' == typeof e.raws?.params
                        )
                          return e.raws.params
                            .slice(e.customSelector.length)
                            .trim();
                        if ('string' == typeof e.raws?.params)
                          return e.raws.params;
                        if (
                          'css-decl' === e.type &&
                          'string' == typeof e.raws?.value
                        ) {
                          let { value: r } = e.raws;
                          return e.extend && r.startsWith('extend(')
                            ? r.slice(7, -1)
                            : r;
                        }
                      }
                    })(e, r);
                    if ('string' == typeof u) {
                      var n, o, i, a;
                      return {
                        rootOffset:
                          ((n = e),
                          (o = r),
                          (i = u),
                          (a = s),
                          'number' == typeof o.sourceIndex &&
                          'string' == typeof o.raws?.selector
                            ? a + o.sourceIndex
                            : n.mixin
                              ? n.source.startOffset
                              : 'string' == typeof n.raws?.selector
                                ? n.source.startOffset + tH(n.raws.selector, i)
                                : 'string' == typeof n.raws?.params
                                  ? tJ(n) + tH(n.raws.params, i)
                                  : 'css-decl' === n.type &&
                                      'string' == typeof n.raws?.value
                                    ? tG(n) + tH(n.raws.value, i)
                                    : a),
                        text: u
                      };
                    }
                  }
                })(r, o, n);
                (i ? e(o, i.text, i.rootOffset, !0) : e(o, s, n, !1), tQ(o, r));
              }
          }
          ((function (e) {
            var r, s;
            if ('string' != typeof e.type) return;
            let n =
                'number' == typeof e.source?.startOffset &&
                'number' == typeof e.source?.endOffset,
              o = e.source?.start && e.source.end;
            if (n && o) return;
            let i = 1 / 0,
              a = -1 / 0,
              u,
              l;
            for (let r in e) {
              if ('source' === r || 'raws' === r || 'spaces' === r) continue;
              let s = e[r];
              for (let e of Array.isArray(s) ? s : [s])
                !e ||
                  'object' != typeof e ||
                  'number' != typeof e.source?.startOffset ||
                  'number' != typeof e.source?.endOffset ||
                  (e.source.startOffset < i &&
                    ((i = e.source.startOffset), (u = e.source.start)),
                  e.source.endOffset > a &&
                    ((a = e.source.endOffset), (l = e.source.end)));
            }
            1 / 0 !== i &&
              (e.source ?? (e.source = {}),
              n || ((e.source.startOffset = i), (e.source.endOffset = a)),
              (r = e.source).start ?? (r.start = u),
              (s = e.source).end ?? (s.end = l));
          })(r),
            (function (e) {
              if (
                'number' == typeof e.source?.startOffset &&
                'number' == typeof e.source?.endOffset
              )
                for (let r in e) {
                  if ('source' === r || 'raws' === r || 'spaces' === r)
                    continue;
                  let s = e[r];
                  for (let r of Array.isArray(s) ? s : [s])
                    r && 'object' == typeof r && tQ(r, e);
                }
            })(r));
        })(
          (i = (function e(r, s) {
            if (r2(r)) {
              for (let n in (delete r.parent, r)) e(r[n], s);
              if (!r.type) return r;
              if (
                (r.raws ?? (r.raws = {}),
                'css-decl' === r.type &&
                  'string' == typeof r.prop &&
                  r.prop.startsWith('--') &&
                  'string' == typeof r.value &&
                  r.value.startsWith('{'))
              ) {
                let e;
                if (r.value.trimEnd().endsWith('}')) {
                  let n,
                    o = s.originalText.slice(0, r.source.start.offset),
                    i =
                      'a'.repeat(r.prop.length) +
                      s.originalText.slice(
                        r.source.start.offset + r.prop.length,
                        r.source.end.offset
                      ),
                    a = t1(o) + i,
                    u;
                  u = 'scss' === s.parser ? sl : 'less' === s.parser ? su : sa;
                  try {
                    n = u(a, { ...s });
                  } catch {}
                  n?.nodes?.length === 1 &&
                    'css-rule' === n.nodes[0].type &&
                    (e = n.nodes[0].nodes);
                }
                return (
                  e
                    ? (r.value = { type: 'css-rule', nodes: e })
                    : (r.value = {
                        type: 'value-unknown',
                        value: r.raws.value.raw
                      }),
                  r
                );
              }
              let n = '';
              'string' == typeof r.selector &&
                ((n = r.raws.selector
                  ? (r.raws.selector.scss ?? r.raws.selector.raw)
                  : r.selector),
                r.raws.between &&
                  r.raws.between.trim().length > 0 &&
                  (n += r.raws.between),
                (r.raws.selector = n));
              let o = '';
              'string' == typeof r.value &&
                ((o = r.raws.value
                  ? (r.raws.value.scss ?? r.raws.value.raw)
                  : r.value),
                (r.raws.value = o.trim()));
              let i = '';
              if (
                ('string' == typeof r.params &&
                  ((i = r.raws.params
                    ? (r.raws.params.scss ?? r.raws.params.raw)
                    : r.params),
                  r.raws.afterName &&
                    r.raws.afterName.trim().length > 0 &&
                    (i = r.raws.afterName + i),
                  r.raws.between &&
                    r.raws.between.trim().length > 0 &&
                    (i += r.raws.between),
                  (i = i.trim()),
                  (r.raws.params = i)),
                n.trim().length > 0)
              )
                return (
                  (n.startsWith('@') && n.endsWith(':')) ||
                    (r.mixin
                      ? (r.selector = sr(n, s))
                      : ('scss' === s.parser &&
                          r.selector &&
                          r.selector
                            .replace(/\/\*.*?\*\//, '')
                            .replace(/\/\/.*\n/, '')
                            .trimEnd()
                            .endsWith(':') &&
                          (r.isScssNestedProperty = !0),
                        (r.selector = r6(n)))),
                  r
                );
              if (o.trim().length > 0) {
                let e = o.match(sn);
                e &&
                  ((o = o.slice(0, e.index)),
                  (r.scssDefault = !0),
                  '!default' !== e[0].trim() && (r.raws.scssDefault = e[0]));
                let n = o.match(so);
                if (
                  (n &&
                    ((o = o.slice(0, n.index)),
                    (r.scssGlobal = !0),
                    '!global' !== n[0].trim() && (r.raws.scssGlobal = n[0])),
                  o.startsWith('progid:'))
                )
                  return { type: 'value-unknown', value: o };
                r.value = sr(o, s);
              }
              if (
                ('less' === s.parser &&
                  'css-decl' === r.type &&
                  'string' == typeof r.prop &&
                  /^\s*\+\s*:/.test(r.raws.between) &&
                  ((r.prop += '+'),
                  (r.raws.between = r.raws.between.replace('+', ''))),
                'less' === s.parser &&
                  'css-decl' === r.type &&
                  o.startsWith('extend(') &&
                  (r.extend || (r.extend = ':' === r.raws.between),
                  r.extend &&
                    !r.selector &&
                    (delete r.value, (r.selector = r6(o.slice(7, -1))))),
                'css-atrule' === r.type)
              ) {
                if ('less' === s.parser) {
                  if (r.mixin) {
                    let e =
                      r.raws.identifier +
                      r.name +
                      r.raws.afterName +
                      r.raws.params;
                    return ((r.selector = r6(e)), delete r.params, r);
                  }
                  if (r.function) return r;
                }
                if ('css' === s.parser && 'custom-selector' === r.name) {
                  let e = r.params.match(/:--\S+\s+/)[0].trim();
                  return (
                    (r.customSelector = e),
                    (r.selector = r6(r.params.slice(e.length).trim())),
                    delete r.params,
                    r
                  );
                }
                if ('less' === s.parser) {
                  if (r.name.includes(':')) {
                    r.variable = !0;
                    let e = r.name.split(':');
                    r.name = e[0];
                    let n = e.slice(1).join(':');
                    (r.params && (n += r.params), (r.value = sr(n, s)));
                  }
                  if (
                    !['page', 'nest', 'keyframes'].includes(r.name) &&
                    r.params?.[0] === ':'
                  ) {
                    r.variable = !0;
                    let e = r.params.slice(1);
                    (e && (r.value = sr(e, s)), (r.raws.afterName += ':'));
                  }
                  if (r.variable)
                    return (delete r.params, r.value || delete r.value, r);
                }
              }
              if ('css-atrule' === r.type && i.length > 0) {
                let { name: e } = r;
                if ('warn' === e || 'error' === e)
                  return ((r.params = { type: 'media-unknown', value: i }), r);
                if ('extend' === e || 'nest' === e)
                  return ((r.selector = r6(i)), delete r.params, r);
                if ('at-root' === e)
                  return (
                    /^\(\s*(?:without|with)\s*:.+\)$/s.test(i)
                      ? (r.params = sr(i, s))
                      : ((r.selector = r6(i)), delete r.params),
                    r
                  );
                let n = e.toLowerCase();
                return ss.has(n)
                  ? ((r.import = !0),
                    delete r.filename,
                    (r.params = sr(i, s)),
                    r)
                  : [
                        'namespace',
                        'supports',
                        'if',
                        'else',
                        'for',
                        'each',
                        'while',
                        'debug',
                        'mixin',
                        'include',
                        'function',
                        'return',
                        'define-mixin',
                        'add-mixin'
                      ].includes(e)
                    ? ((r.value = sr(
                        (i = (i = i.replace(
                          /(\$\S+?)(\s+)?\.{3}/,
                          '$1...$2'
                        )).replace(/^(?!if)([^"'\s(]+)(\s+)\(/, '$1($2')),
                        s
                      )),
                      delete r.params,
                      r)
                    : ['media', 'custom-media'].includes(n)
                      ? i.includes('#{')
                        ? { type: 'media-unknown', value: i }
                        : ((r.params = r9(i)), r)
                      : ((r.params = i), r);
              }
            }
            return r;
          })(r3(i, 'css-'), s)),
          r,
          0,
          !1
        ),
        n &&
          (i.frontMatter = {
            ...n,
            type: 'front-matter',
            source: { startOffset: n.start.index, endOffset: n.end.index }
          }),
        i
      );
    }
    function sa(e, r = {}) {
      return si(rX.default.default, e, r);
    }
    function su(e, r = {}) {
      return si(
        e =>
          r1.default.parse(
            (function (e) {
              let r = 'initial',
                s = 'initial',
                n,
                o = !1,
                i = [];
              for (let a = 0; a < e.length; a++) {
                let u = e[a];
                switch (r) {
                  case 'initial':
                    if ("'" === u) {
                      r = 'single-quotes';
                      continue;
                    }
                    if ('"' === u) {
                      r = 'double-quotes';
                      continue;
                    }
                    if (
                      ('u' === u || 'U' === u) &&
                      'url(' === e.slice(a, a + 4).toLowerCase()
                    ) {
                      ((r = 'url'), (a += 3));
                      continue;
                    }
                    if ('/' === u) {
                      let s = e[a + 1];
                      '*' === s
                        ? ((r = 'comment-block'), a++)
                        : '/' === s && ((r = 'comment-inline'), (n = a), a++);
                    }
                    continue;
                  case 'single-quotes':
                    if (
                      ("'" === u &&
                        '\\' !== e[a - 1] &&
                        ((r = s), (s = 'initial')),
                      u ===
                        `
` || '\r' === u)
                    )
                      return e;
                    continue;
                  case 'double-quotes':
                    if (
                      ('"' === u &&
                        '\\' !== e[a - 1] &&
                        ((r = s), (s = 'initial')),
                      u ===
                        `
` || '\r' === u)
                    )
                      return e;
                    continue;
                  case 'url':
                    if (')' === u) r = 'initial';
                    else if (
                      u ===
                        `
` ||
                      '\r' === u
                    )
                      return e;
                    if ("'" === u) {
                      ((r = 'single-quotes'), (s = 'url'));
                      continue;
                    }
                    '"' === u && ((r = 'double-quotes'), (s = 'url'));
                    continue;
                  case 'comment-block':
                    '/' === u && '*' === e[a - 1] && (r = 'initial');
                    continue;
                  case 'comment-inline':
                    '"' === u || "'" === u || '*' === u
                      ? (o = !0)
                      : (u ===
                          `
` ||
                          '\r' === u) &&
                        (o && i.push([n, a]), (r = 'initial'), (o = !1));
                    continue;
                }
              }
              for (let [r, s] of i)
                e =
                  e.slice(0, r) +
                  eY(0, e.slice(r, s), /["'*]/g, ' ') +
                  e.slice(s);
              return e;
            })(e)
          ),
        e,
        r
      );
    }
    function sl(e, r = {}) {
      return si(r0.default, e, r);
    }
    var sc = {
        astFormat: 'postcss',
        hasPragma: e =>
          (function (e) {
            let { pragmas: r } = ra(e);
            return ro.some(e => t3(r, e));
          })(t0(e).content),
        hasIgnorePragma: e =>
          (function (e) {
            let { pragmas: r } = ra(e);
            return rn.some(e => t3(r, e));
          })(t0(e).content),
        locStart: tK,
        locEnd: tY
      },
      sp = { ...sc, parse: sa },
      sh = { ...sc, parse: su },
      sf = { ...sc, parse: sl },
      sd = {
        postcss: {
          features: {
            experimental_frontMatterSupport: {
              massageAstNode: !0,
              embed: !0,
              print: !0
            }
          },
          print: function (e, r, s) {
            var n, o, i, a;
            let { node: u } = e;
            switch (u.type) {
              case 'css-root': {
                let n = rQ(e, r, s),
                  o = u.raws.after.trim();
                return (
                  o.startsWith(';') && (o = o.slice(1).trim()),
                  [
                    u.frontMatter
                      ? [s('frontMatter'), tb, u.nodes.length > 0 ? tb : '']
                      : '',
                    n,
                    o ? ` ${o}` : '',
                    u.nodes.length > 0 ? tb : ''
                  ]
                );
              }
              case 'css-comment': {
                let e = u.inline || u.raws.inline,
                  s = r.originalText.slice(tK(u), tY(u));
                return e ? s.trimEnd() : s;
              }
              case 'css-rule':
                return [
                  s('selector'),
                  u.important ? ' !important' : '',
                  u.nodes
                    ? [
                        u.selector?.type === 'selector-unknown' &&
                        rI(u.selector.value)
                          ? tv
                          : u.selector
                            ? ' '
                            : '',
                        '{',
                        u.nodes.length > 0 ? tp([tb, rQ(e, r, s)]) : '',
                        tb,
                        '}',
                        !(function (e) {
                          let { selector: r } = e;
                          return (
                            !!r &&
                            (('string' == typeof r && /^@.+:.*$/.test(r)) ||
                              (r.value && /^@.+:.*$/.test(r.value)))
                          );
                        })(u)
                          ? ''
                          : ';'
                      ]
                    : ';'
                ];
              case 'css-decl': {
                let n = e.parent,
                  { between: o } = u.raws,
                  i = o.trim(),
                  a = ':' === i,
                  l = o.endsWith(' ') && a,
                  c = 'string' == typeof u.value && /^ *$/.test(u.value),
                  p = 'string' == typeof u.value ? u.value : s('value');
                return (
                  (p =
                    u.value?.type === 'value-root' &&
                    u.value.group?.type === 'value-value' &&
                    'composes' === u.prop.toLowerCase()
                      ? tl(p, tc)
                      : p),
                  !a &&
                    rI(i) &&
                    !e.call(() => rH(e), 'value', 'group', 'group') &&
                    (p = tp([tb, th(p)])),
                  [
                    eY(0, u.raws.before, /[\s;]/g, ''),
                    ('css-atrule' === n.type && n.variable) ||
                    e.hasAncestor(e => {
                      if ('css-rule' !== e.type) return !1;
                      let r = e.raws?.selector;
                      return (
                        r &&
                        (r.startsWith(':import') || r.startsWith(':export'))
                      );
                    })
                      ? u.prop
                      : rc(u.prop),
                    i.startsWith('//') ? ' ' : '',
                    i,
                    u.extend ||
                    c ||
                    (!l &&
                      u.isNested &&
                      (rP(u.value.group.group) ||
                        rP(u.value.group.group.groups?.[0])))
                      ? ''
                      : ' ',
                    'less' === r.parser && u.extend && u.selector
                      ? u.selector.nodes.length > 1
                        ? tm(['extend(', tp([tw, s('selector')]), tw, ')'])
                        : ['extend(', s('selector'), ')']
                      : '',
                    p,
                    u.raws.important
                      ? u.raws.important.replace(
                          /\s*!\s*important/i,
                          ' !important'
                        )
                      : u.important
                        ? ' !important'
                        : '',
                    u.raws.scssDefault
                      ? u.raws.scssDefault.replace(/\s*!default/i, ' !default')
                      : u.scssDefault
                        ? ' !default'
                        : '',
                    u.raws.scssGlobal
                      ? u.raws.scssGlobal.replace(/\s*!global/i, ' !global')
                      : u.scssGlobal
                        ? ' !global'
                        : '',
                    u.nodes
                      ? [
                          ' {',
                          u.nodes.length > 0 ? tp([tw, rQ(e, r, s)]) : '',
                          tw,
                          '}'
                        ]
                      : u.prop.startsWith('@prettier-placeholder') &&
                          !n.raws.semicolon &&
                          ';' !== r.originalText[tY(u) - 1]
                        ? ''
                        : r.__isHTMLStyleAttribute && e.isLast
                          ? ty(';')
                          : ';'
                  ]
                );
              }
              case 'css-atrule': {
                let n = e.parent,
                  o =
                    rb(u) &&
                    !n.raws.semicolon &&
                    ';' !== r.originalText[tY(u) - 1];
                if ('less' === r.parser) {
                  if (u.mixin)
                    return [
                      s('selector'),
                      u.important ? ' !important' : '',
                      o ? '' : ';'
                    ];
                  if (u.function)
                    return [
                      u.name,
                      'string' == typeof u.params ? u.params : s('params'),
                      o ? '' : ';'
                    ];
                  if (u.variable)
                    return [
                      '@',
                      u.name,
                      ': ',
                      u.value ? [s('value'), tT] : '',
                      u.raws.between.trim() ? u.raws.between.trim() + ' ' : '',
                      u.nodes
                        ? [
                            '{',
                            u.nodes.length > 0 ? tp([tw, rQ(e, r, s)]) : '',
                            tw,
                            '}'
                          ]
                        : '',
                      o ? '' : ';'
                    ];
                }
                let i =
                  'import' === u.name &&
                  u.params?.type === 'value-unknown' &&
                  u.params.value.endsWith(';');
                return [
                  '@',
                  rw(u) || u.name.endsWith(':') || rb(u) ? u.name : rc(u.name),
                  u.params
                    ? [
                        rw(u)
                          ? ''
                          : rb(u)
                            ? '' === u.raws.afterName
                              ? ''
                              : u.name.endsWith(':')
                                ? ' '
                                : /^\s*\n\s*\n/.test(u.raws.afterName)
                                  ? [tb, tb]
                                  : /^\s*\n/.test(u.raws.afterName)
                                    ? tb
                                    : ' '
                            : ' ',
                        'string' == typeof u.params ? u.params : s('params')
                      ]
                    : '',
                  u.selector ? tp([' ', s('selector')]) : '',
                  u.value
                    ? tm([
                        ' ',
                        s('value'),
                        rv(u, r)
                          ? u.value?.group?.group?.type ===
                              'value-paren_group' &&
                            null !== u.value.group.group.open &&
                            null !== u.value.group.group.close
                            ? ' '
                            : tv
                          : ''
                      ])
                    : 'else' === u.name
                      ? ' '
                      : '',
                  u.nodes
                    ? [
                        rv(u, r)
                          ? ''
                          : (u.selector &&
                                !u.selector.nodes &&
                                'string' == typeof u.selector.value &&
                                rI(u.selector.value)) ||
                              (!u.selector &&
                                'string' == typeof u.params &&
                                rI(u.params))
                            ? tv
                            : ' ',
                        '{',
                        u.nodes.length > 0 ? tp([tw, rQ(e, r, s)]) : '',
                        tw,
                        '}'
                      ]
                    : o || i
                      ? ''
                      : ';'
                ];
              }
              case 'media-query-list': {
                let r = [];
                return (
                  e.each(({ node: e }) => {
                    ('media-query' === e.type && '' === e.value) || r.push(s());
                  }, 'nodes'),
                  tm(tp(tg(tv, r)))
                );
              }
              case 'media-query':
                return [tg(' ', e.map(s, 'nodes')), e.isLast ? '' : ','];
              case 'media-type':
              case 'media-value':
                return rq(rB(u.value, r));
              case 'media-feature-expression':
                return u.nodes ? ['(', ...e.map(s, 'nodes'), ')'] : u.value;
              case 'media-feature':
                return rc(rB(eY(0, u.value, / +/g, ' '), r));
              case 'media-colon':
                return [u.value, ' '];
              case 'media-keyword':
              case 'selector-string':
                return rB(u.value, r);
              case 'media-url':
                return rB(
                  eY(0, eY(0, u.value, /^url\(\s+/gi, 'url('), /\s+\)$/g, ')'),
                  r
                );
              case 'media-unknown':
              case 'selector-comment':
              case 'selector-nesting':
              case 'value-paren':
              case 'value-operator':
              case 'value-unicode-range':
              case 'value-unknown':
                return u.value;
              case 'selector-root':
                return tm([
                  rh(e, 'custom-selector')
                    ? [
                        e.findAncestor(e => 'css-atrule' === e.type)
                          .customSelector,
                        tv
                      ]
                    : '',
                  tg(
                    [
                      ',',
                      rh(e, ['extend', 'custom-selector', 'nest']) ? tv : tb
                    ],
                    e.map(s, 'nodes')
                  )
                ]);
              case 'selector-selector':
                return tm(
                  (u.nodes.length > 2 ? tp : e => e)(e.map(s, 'nodes'))
                );
              case 'selector-tag':
                return [
                  u.namespace
                    ? [!0 === u.namespace ? '' : u.namespace.trim(), '|']
                    : '',
                  e.previous?.type === 'selector-nesting'
                    ? u.value
                    : rq(
                        ((n = u.value),
                        e
                          .findAncestor(e => 'css-atrule' === e.type)
                          ?.name?.toLowerCase()
                          .endsWith('keyframes') &&
                          ['from', 'to'].includes(n.toLowerCase()))
                          ? u.value.toLowerCase()
                          : u.value
                      )
                ];
              case 'selector-id':
                return ['#', u.value];
              case 'selector-class':
                return ['.', rq(rB(u.value, r))];
              case 'selector-attribute':
                let l, c, p;
                return [
                  '[',
                  u.namespace
                    ? [!0 === u.namespace ? '' : u.namespace.trim(), '|']
                    : '',
                  u.attribute.trim(),
                  u.operator ?? '',
                  u.value
                    ? (function (e, r = tk) {
                        return tl(e, e =>
                          'string' == typeof e
                            ? tg(
                                r,
                                e.split(`
`)
                              )
                            : e
                        );
                      })(
                        ((o = rB(u.value.trim(), r)),
                        (l = r.singleQuote ? "'" : '"'),
                        (c = ''),
                        (p = o.match(/^(?<value>.+?)\s+(?<flag>[a-z])$/i)) &&
                          ({ value: o, flag: c } = p.groups),
                        (o.includes('"') || o.includes("'") ? o : l + o + l) +
                          (c ? ` ${c}` : '')),
                        tx
                      )
                    : '',
                  u.insensitive ? ' i' : '',
                  ']'
                ];
              case 'selector-combinator':
                if (
                  '+' === u.value ||
                  '>' === u.value ||
                  '~' === u.value ||
                  '>>>' === u.value
                ) {
                  let r = e.parent;
                  return [
                    'selector-selector' === r.type && r.nodes[0] === u
                      ? ''
                      : tv,
                    u.value,
                    e.isLast ? '' : ' '
                  ];
                }
                return [
                  u.value.trimStart().startsWith('(') ? tv : '',
                  rq(rB(u.value.trim(), r)) || tv
                ];
              case 'selector-universal':
                return [
                  u.namespace
                    ? [!0 === u.namespace ? '' : u.namespace.trim(), '|']
                    : '',
                  u.value
                ];
              case 'selector-pseudo':
                return [
                  rc(u.value),
                  t_(u.nodes)
                    ? tm([
                        '(',
                        tp([tw, tg([',', tv], e.map(s, 'nodes'))]),
                        tw,
                        ')'
                      ])
                    : ''
                ];
              case 'selector-unknown': {
                if (
                  e.findAncestor(e => 'css-rule' === e.type)
                    ?.isScssNestedProperty
                )
                  return rq(rB(rc(u.value), r));
                let s = e.parent;
                if (s.raws?.selector) {
                  let e = tK(s),
                    n = e + s.raws.selector.length;
                  return r.originalText.slice(e, n).trim();
                }
                let n = e.grandparent;
                if (
                  'value-paren_group' === s.type &&
                  n?.type === 'value-func' &&
                  'selector' === n.value
                ) {
                  let e = tY(s.open) + 1,
                    n = tK(s.close),
                    o = r.originalText.slice(e, n).trim();
                  return rI(o) ? [tf, o] : o;
                }
                return u.value;
              }
              case 'value-value':
              case 'value-root':
                return s('group');
              case 'value-comment': {
                let e = r.originalText.slice(tK(u), tY(u));
                return u.inline ? tO(e.trimEnd()) : e;
              }
              case 'value-comma_group':
                return r$(e, r, s);
              case 'value-paren_group':
                return (function (e, r, s) {
                  var n;
                  let { node: o, parent: i } = e,
                    a = e.map(
                      ({ node: e }) => ('string' == typeof e ? e : s()),
                      'groups'
                    );
                  if (
                    i &&
                    'value-func' === (n = i).type &&
                    'url' === n.value.toLowerCase() &&
                    (1 === o.groups.length ||
                      (o.groups.length > 0 &&
                        'value-comma_group' === o.groups[0].type &&
                        o.groups[0].groups.length > 0 &&
                        'value-word' === o.groups[0].groups[0].type &&
                        o.groups[0].groups[0].value.startsWith('data:')))
                  )
                    return [
                      o.open ? s('open') : '',
                      tg(',', a),
                      o.close ? s('close') : ''
                    ];
                  if (!o.open) {
                    let r = rH(e);
                    e1();
                    let s = (function (e) {
                        let r = [];
                        for (let s = 0; s < e.length; s += 2)
                          r.push(e.slice(s, s + 2));
                        return r;
                      })(tg(',', a)),
                      n = tg(r ? tb : tv, s);
                    return tp(
                      r
                        ? [tb, n]
                        : tm([
                            e.match(
                              e => 'value-paren_group' === e.type && !e.open,
                              (e, r) =>
                                'group' === r && 'value-value' === e.type,
                              (e, r) =>
                                'group' === r && 'value-root' === e.type,
                              (e, r) => 'value' === r && 'css-decl' === e.type
                            )
                              ? tw
                              : '',
                            td(n)
                          ])
                    );
                  }
                  let u = e.map(({ node: s, isLast: n, index: o }) => {
                      var i;
                      let u = a[o];
                      rk(s) &&
                        'value-comma_group' === s.type &&
                        s.groups &&
                        'value-paren_group' !== s.groups[0].type &&
                        s.groups[2]?.type === 'value-paren_group' &&
                        ta(u) === e6 &&
                        ta(u.contents) === e4 &&
                        ta(u.contents.contents) === e7 &&
                        (u = tm(th(u)));
                      let l = [
                        u,
                        n
                          ? 'value-func' === (i = e.grandparent).type &&
                            'var' === i.value.toLowerCase() &&
                            (function ({ node: e, parent: r }, s) {
                              return !!(
                                e.source &&
                                s.originalText
                                  .slice(tK(e), tK(r.close))
                                  .trimEnd()
                                  .endsWith(',')
                              );
                            })(e, r)
                            ? ','
                            : 'value-comment' !== e.node.type &&
                                !(
                                  'value-comma_group' === e.node.type &&
                                  e.node.groups.every(
                                    e => 'value-comment' === e.type
                                  )
                                ) &&
                                ('es5' === r.trailingComma ||
                                  'all' === r.trailingComma) &&
                                e.callParent(() => rT(e, r))
                              ? ty(',')
                              : ''
                          : ','
                      ];
                      if (
                        !n &&
                        'value-comma_group' === s.type &&
                        t_(s.groups)
                      ) {
                        let e = eX(0, s.groups, -1);
                        (!e.source && e.close && (e = e.close),
                          e.source && rJ(r.originalText, tY(e)) && l.push(tb));
                      }
                      return l;
                    }, 'groups'),
                    l = (function (e, r) {
                      if (!rk(r)) return !1;
                      let { groups: s } = r,
                        n = s.indexOf(e);
                      return -1 !== n && rj(s[n + 1]);
                    })(o, i),
                    c = (function (e, r) {
                      if (
                        e.open?.value !== '(' ||
                        e.close?.value !== ')' ||
                        e.groups.some(e => 'value-comma_group' !== e.type)
                      )
                        return !1;
                      if ('value-comma_group' === r.type) {
                        let s = r.groups.indexOf(e) - 1,
                          n = r.groups[s];
                        if (n?.type === 'value-word' && 'with' === n.value)
                          return !0;
                      }
                      return !1;
                    })(o, i),
                    p = rT(e, r),
                    h = tm(
                      [
                        o.open ? s('open') : '',
                        tp([tw, tg(tv, u)]),
                        tw,
                        tT,
                        o.close ? s('close') : ''
                      ],
                      { shouldBreak: c || (p && !l) }
                    );
                  return c || l ? th(h) : h;
                })(e, r, s);
              case 'value-func':
                return [
                  u.value,
                  rh(e, 'supports') &&
                  (i = u).value &&
                  ['not', 'and', 'or'].includes(i.value.toLowerCase())
                    ? ' '
                    : '',
                  s('group')
                ];
              case 'value-number':
                return [rD(u.value), rW(u.unit)];
              case 'value-word':
                return (u.isColor && u.isHex) ||
                  ((a = u.value), rl.has(a.toLowerCase()))
                  ? u.value.toLowerCase()
                  : u.value;
              case 'value-colon': {
                let { previous: r } = e;
                return tm([
                  u.value,
                  ('string' == typeof r?.value && r.value.endsWith('\\')) ||
                  rp(e, 'url')
                    ? ''
                    : tv
                ]);
              }
              case 'value-string':
                return tP(u.raws.quote + u.value + u.raws.quote, r);
              case 'value-atword':
                return ['@', u.value];
              default:
                throw new tM(u, 'PostCSS');
            }
          },
          embed: tN,
          insertPragma: e => {
            let { frontMatter: r, content: s } = t0(e);
            return (
              (r
                ? r.raw +
                  `

`
                : '') +
              (function (e) {
                let r,
                  { shebang: s, text: n, pragmas: o, comments: i } = ra(e),
                  a = null == (r = n.match(t5)?.[0]) ? n : n.slice(r.length);
                return (
                  (s
                    ? `${s}
`
                    : '') +
                  (function ({ comments: e = '', pragmas: r = {} }) {
                    let s = Object.keys(r),
                      n = s
                        .flatMap(e => rs(e, r[e]))
                        .map(
                          e => ` * ${e}
`
                        )
                        .join('');
                    if (!e) {
                      if (0 === s.length) return '';
                      if (1 === s.length && !Array.isArray(r[s[0]])) {
                        let e = r[s[0]];
                        return `/** ${rs(s[0], e)[0]} */`;
                      }
                    }
                    let o =
                      e
                        .split(
                          `
`
                        )
                        .map(e => ` * ${e}`).join(`
`) +
                      `
`;
                    return (
                      `/**
` +
                      (e ? o : '') +
                      (e && s.length > 0
                        ? ` *
`
                        : '') +
                      n +
                      ' */'
                    );
                  })({
                    pragmas: { format: '', ...o },
                    comments: i.trimStart()
                  }) +
                  (a.startsWith(`
`)
                    ? `
`
                    : `

`) +
                  a
                );
              })(s)
            );
          },
          massageAstNode: t2,
          getVisitorKeys: tL
        }
      };
    s.d(r, {
      default: () => eH,
      languages: () => rK,
      options: () => rY,
      parsers: () => rZ,
      printers: () => sd
    });
  }
};
//# sourceMappingURL=4517.ca78ccf13f03ceeb.js.map
