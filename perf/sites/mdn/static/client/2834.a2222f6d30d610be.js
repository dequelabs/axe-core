export const __rspack_esm_id = 2834;
export const __rspack_esm_ids = [2834];
export const __webpack_modules__ = {
  76745(e, t, n) {
    let r;
    n.r(t);
    var u = Object.defineProperty,
      a = (e, t) => {
        for (var n in t) u(e, n, { get: t[n], enumerable: !0 });
      },
      o = {};
    a(o, { languages: () => oZ, options: () => oQ, printers: () => oY });
    var i = {};
    a(i, { estree: () => oW });
    var s = function (e) {
        return Array.isArray(e) && e.length > 0;
      },
      p = () => {};
    function l(e) {
      let t = new Set(e);
      return e => t.has(e?.type);
    }
    var c =
      (e, t) =>
      (n, r, ...u) =>
        1 | n && null == r ? void 0 : (t.call(r) ?? r[e]).apply(r, u);
    function D(e) {
      return this[e < 0 ? this.length + e : e];
    }
    var y = c('at', function () {
      if (Array.isArray(this) || 'string' == typeof this) return D;
    });
    function d(e, t, n) {
      if (!e.has(t)) {
        let r = n(t);
        e.set(t, r);
      }
      return e.get(t);
    }
    function m(e) {
      let t = [];
      return (
        e.this && t.push(e.this),
        t.push(...e.params),
        e.rest && t.push(e.rest),
        t
      );
    }
    var f = new WeakMap();
    function F(e) {
      return d(f, e, m);
    }
    function E({ node: e, parent: t }) {
      return (
        e?.type === 'EmptyStatement' &&
        ('IfStatement' === t.type
          ? t.consequent === e || t.alternate === e
          : ('DoWhileStatement' === t.type ||
              'ForInStatement' === t.type ||
              'ForOfStatement' === t.type ||
              'ForStatement' === t.type ||
              'LabeledStatement' === t.type ||
              'WithStatement' === t.type ||
              'WhileStatement' === t.type) &&
            t.body === e)
      );
    }
    function A(e) {
      return (
        (e.method && 'init' === e.kind) || 'get' === e.kind || 'set' === e.kind
      );
    }
    var C = e => Number.isSafeInteger(e) && e >= 0;
    function x(e) {
      return e.range?.[1] ?? e.end;
    }
    function g(e) {
      let t = e.range?.[0] ?? e.start,
        n = (e.declaration?.decorators ?? e.decorators)?.[0];
      return n ? Math.min(g(n), t) : t;
    }
    var h = e => t => (t.label ? P(t.label) : g(t) + e),
      T = e => e.__contentEnd ?? x(e),
      S = [
        'ExpressionStatement',
        'Directive',
        'ImportDeclaration',
        'ExportDefaultDeclaration',
        'ExportNamedDeclaration',
        'ExportAllDeclaration',
        'ReturnStatement',
        'ThrowStatement',
        'DoWhileStatement'
      ],
      B = new Map([
        ['BreakStatement', h(5)],
        ['ContinueStatement', h(8)],
        ['DebuggerStatement', e => g(e) + 8],
        ['VariableDeclaration', e => P(y(0, e.declarations, -1))],
        ...S.map(e => [e, T])
      ]),
      b = l(S),
      v = e => {
        if (b(e) && e.__contentEnd) return !0;
        let { type: t } = e;
        return (
          'BreakStatement' === t ||
          'ContinueStatement' === t ||
          'DebuggerStatement' === t ||
          'VariableDeclaration' === t ||
          ('IfStatement' === t
            ? v(e.alternate ?? e.consequent)
            : ('ForInStatement' === t ||
                'ForOfStatement' === t ||
                'ForStatement' === t ||
                'LabeledStatement' === t ||
                'WithStatement' === t ||
                'WhileStatement' === t) &&
              v(e.body))
        );
      };
    function P(e) {
      let { type: t } = e;
      return 'IfStatement' === t
        ? P(e.alternate ?? e.consequent)
        : 'ForInStatement' === t ||
            'ForOfStatement' === t ||
            'ForStatement' === t ||
            'LabeledStatement' === t ||
            'WithStatement' === t ||
            'WhileStatement' === t
          ? P(e.body)
          : (B.get(t)?.(e) ?? x(e));
    }
    function k(e, t) {
      let n = g(e);
      return C(n) && n === g(t);
    }
    function w(e) {
      return e.extra?.raw ?? e.raw;
    }
    function I(e) {
      return (
        'NumericLiteral' === e.type ||
        ('Literal' === e.type && 'number' == typeof e.value)
      );
    }
    function N(e) {
      return 'RegExpLiteral' === e.type || ('Literal' === e.type && !!e.regex);
    }
    function M(e) {
      return (
        e?.type === 'StringLiteral' ||
        (e?.type === 'Literal' && 'string' == typeof e.value)
      );
    }
    var j = l([
        'TSAsExpression',
        'TSSatisfiesExpression',
        'AsExpression',
        'AsConstExpression',
        'SatisfiesExpression'
      ]),
      L = l(['SatisfiesExpression', 'TSSatisfiesExpression']),
      O = l(['TSUnionType', 'UnionTypeAnnotation']),
      J = l(['TSIntersectionType', 'IntersectionTypeAnnotation']),
      q = l(['TupleTypeAnnotation', 'TSTupleType']),
      R = l(['TSConditionalType', 'ConditionalTypeAnnotation']),
      X = l(['TSTypeAliasDeclaration', 'TypeAlias']),
      _ = l(['ReturnStatement', 'ThrowStatement']),
      W = l([
        'ExportDefaultDeclaration',
        'DeclareExportDeclaration',
        'ExportNamedDeclaration',
        'ExportAllDeclaration',
        'DeclareExportAllDeclaration'
      ]),
      $ = l(['ArrayExpression']),
      U = l(['ObjectExpression']),
      G = l([
        'Literal',
        'BooleanLiteral',
        'BigIntLiteral',
        'DirectiveLiteral',
        'NullLiteral',
        'NumericLiteral',
        'RegExpLiteral',
        'StringLiteral'
      ]),
      V = l(['ObjectTypeAnnotation', 'TSTypeLiteral', 'TSMappedType']),
      K = l(['FunctionExpression', 'ArrowFunctionExpression']),
      H = l(['JSXElement', 'JSXFragment']),
      z = l(['BinaryExpression', 'LogicalExpression', 'NGPipeExpression']),
      Q = l(['CallExpression', 'OptionalCallExpression']),
      Y = l(['MemberExpression', 'OptionalMemberExpression']),
      Z = l(['CallExpression', 'OptionalCallExpression', 'NewExpression']),
      ee = l([
        'CallExpression',
        'OptionalCallExpression',
        'NewExpression',
        'ImportExpression'
      ]),
      et = l(['ChainExpression', 'TSNonNullExpression']),
      en = l(['TSArrayType', 'ArrayTypeAnnotation']),
      er = l(['TSTypeParameterInstantiation', 'TypeParameterInstantiation']);
    function eu(e) {
      let t;
      if ('ImportSpecifier' !== e.type && 'ExportSpecifier' !== e.type)
        return !1;
      let {
        local: n,
        ['ImportSpecifier' === e.type ? 'imported' : 'exported']: r
      } = e;
      return (
        n.type === r.type &&
        !!(k(n, r) && C((t = P(n))) && t === P(r)) &&
        (M(n)
          ? n.value === r.value && w(n) === w(r)
          : 'Identifier' === n.type && n.name === r.name)
      );
    }
    var ea = l([
        'File',
        'TemplateElement',
        'TSEmptyBodyFunctionExpression',
        'ChainExpression'
      ]),
      eo = (e, [t]) =>
        t?.typeAnnotation === e &&
        t?.type === 'TSAsExpression' &&
        'TSTypeReference' === t.typeAnnotation.type &&
        'Identifier' === t.typeAnnotation.typeName.type &&
        'const' === t.typeAnnotation.typeName.name;
    function ei(e, t) {
      let n, r;
      ((e.comments ?? (e.comments = [])).push(t),
        (t.printed = !1),
        (n = e.type || e.kind || '(unknown type)'),
        (r = String(
          e.name ||
            (e.id && ('object' == typeof e.id ? e.id.name : e.id)) ||
            (e.key && ('object' == typeof e.key ? e.key.name : e.key)) ||
            (e.value && ('object' == typeof e.value ? '' : String(e.value))) ||
            e.operator ||
            ''
        )).length > 20 && (r = r.slice(0, 19) + '…'),
        (t.nodeDescription = n + (r ? ' ' + r : '')));
    }
    function es(e, t) {
      ((t.leading = !0), (t.trailing = !1), ei(e, t));
    }
    function ep(e, t, n) {
      ((t.leading = !1), (t.trailing = !1), n && (t.marker = n), ei(e, t));
    }
    function el(e, t) {
      ((t.leading = !1), (t.trailing = !0), ei(e, t));
    }
    function ec(e) {
      return (t, n, r) => {
        if (!1 === n) return !1;
        let u = !!r?.backwards,
          { length: a } = t,
          o = n;
        for (; o >= 0 && o < a;) {
          let n = t.charAt(o);
          if (e instanceof RegExp) {
            if (!e.test(n)) return o;
          } else if (!e.includes(n)) return o;
          u ? o-- : o++;
        }
        return (-1 === o || o === a) && o;
      };
    }
    var eD = ec(' 	'),
      ey = ec(',; 	'),
      ed = ec(/[^\n\r]/),
      em = function (e, t) {
        if (!1 === t) return !1;
        if ('/' === e.charAt(t) && '*' === e.charAt(t + 1)) {
          for (let n = t + 2; n < e.length; ++n)
            if ('*' === e.charAt(n) && '/' === e.charAt(n + 1)) return n + 2;
        }
        return t;
      },
      ef = e =>
        e ===
          `
` ||
        '\r' === e ||
        '\u2028' === e ||
        '\u2029' === e,
      eF = function (e, t, n) {
        if (!1 === t) return !1;
        let r = !!n?.backwards,
          u = e.charAt(t);
        if (r) {
          if (
            '\r' === e.charAt(t - 1) &&
            u ===
              `
`
          )
            return t - 2;
          if (ef(u)) return t - 1;
        } else {
          if (
            '\r' === u &&
            e.charAt(t + 1) ===
              `
`
          )
            return t + 2;
          if (ef(u)) return t + 1;
        }
        return t;
      },
      eE = function (e, t) {
        return (
          !1 !== t &&
          ('/' === e.charAt(t) && '/' === e.charAt(t + 1) ? ed(e, t) : t)
        );
      },
      eA = function (e, t) {
        let n = null,
          r = t;
        for (; r !== n;)
          ((n = r),
            (r = eD(e, r)),
            (r = em(e, r)),
            (r = eE(e, r)),
            (r = eF(e, r)));
        return r;
      },
      eC = function (e, t) {
        let n = eA(e, t);
        return !1 === n ? '' : e.charAt(n);
      },
      ex = function (e, t, n = {}) {
        let r = eD(e, n.backwards ? t - 1 : t, n),
          u = eF(e, r, n);
        return r !== u;
      },
      eg = function (e, t, n) {
        for (let r = t; r < n; ++r)
          if (
            e.charAt(r) ===
            `
`
          )
            return !0;
        return !1;
      },
      eh = new WeakMap();
    function eT(e) {
      let t;
      return (
        'ImportExpression' === e.type || 'TSImportType' === e.type
          ? ((t = [e.source]), e.options && t.push(e.options))
          : (t =
              'TSExternalModuleReference' === e.type
                ? [e.expression]
                : e.arguments),
        t
      );
    }
    function eS(e) {
      return d(eh, e, eT);
    }
    function eB(e, t) {
      let { node: n } = e;
      'ImportExpression' === n.type || 'TSImportType' === n.type
        ? (e.call(() => t(e, 0), 'source'),
          n.options && e.call(() => t(e, 1), 'options'))
        : 'TSExternalModuleReference' === n.type
          ? e.call(() => t(e, 0), 'expression')
          : e.each(t, 'arguments');
    }
    function eb(e, t) {
      if ('ImportExpression' === e.type || 'TSImportType' === e.type) {
        if (0 === t || t === (e.options ? -2 : -1)) return ['source'];
        if (e.options && (1 === t || -1 === t)) return ['options'];
        throw RangeError('Invalid argument index');
      }
      if ('TSExternalModuleReference' === e.type) {
        if (0 === t || -1 === t) return ['expression'];
      } else if (
        (t < 0 && (t = e.arguments.length + t),
        t >= 0 && t < e.arguments.length)
      )
        return ['arguments', t];
      throw RangeError('Invalid argument index');
    }
    var ev = Symbol.for('comments'),
      eP =
        String.prototype.replaceAll ??
        function (e, t) {
          return e.global ? this.replace(e, t) : this.split(e).join(t);
        },
      ek = c('replaceAll', function () {
        if ('string' == typeof this) return eP;
      }),
      ew = new WeakMap();
    function eI(e) {
      return d(ew, e[ev], t =>
        (function (e, t) {
          for (let n of t) {
            let t = g(n),
              r = P(n);
            e =
              e.slice(0, t) + ek(0, e.slice(t, r), /[^\n]/g, ' ') + e.slice(r);
          }
          return e;
        })(e.originalText, t)
      );
    }
    function eN(e, t) {
      let n = P(e) - 1;
      if (')' === t.originalText[n]) return n;
    }
    var eM = l(['Block', 'CommentBlock', 'MultiLine']),
      ej = l([
        'Line',
        'CommentLine',
        'SingleLine',
        'HashbangComment',
        'HTMLOpen',
        'HTMLClose',
        'Hashbang',
        'InterpreterDirective'
      ]);
    function eL(e) {
      return e?.type === 'ObjectProperty' || (e?.type === 'Property' && !A(e));
    }
    function eO(e) {
      return 'prettier-ignore' === e.value.trim() && !e.unignore;
    }
    var eJ = new WeakMap();
    function eq(e) {
      return d(
        eJ,
        e,
        e =>
          eM(e) && '*' === e.value[0] && /@(?:type|satisfies)\b/.test(e.value)
      );
    }
    function eR({
      comment: e,
      enclosingNode: t,
      followingNode: n,
      options: r
    }) {
      if (
        (t?.type === 'ForInStatement' ||
          t?.type === 'ForOfStatement' ||
          t?.type === 'ForStatement') &&
        n &&
        n === t.body
      ) {
        let t = eI(r).lastIndexOf(')', g(n));
        if (g(e) > t) return (es(n, e), !0);
      }
      return !1;
    }
    var eX = (e, t) => eM(e) && !eg(t, g(e), P(e)),
      e_ = (e, t) => ej(e) || eX(e, t);
    function eW(e, t) {
      'BlockStatement' === e.type ? e$(e, t) : es(e, t);
    }
    function e$(e, t) {
      let n = (e.body || e.properties).find(
        ({ type: e }) => 'EmptyStatement' !== e
      );
      n ? es(n, t) : ep(e, t);
    }
    function eU({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      followingNode: r,
      text: u,
      options: a
    }) {
      return (
        n?.type === 'IfStatement' &&
        !!r &&
        (')' === eC(u, P(e))
          ? (el(t, e), !0)
          : r === n.consequent
            ? (es(r, e), !0)
            : t === n.consequent &&
              r === n.alternate &&
              (function ({
                comment: e,
                precedingNode: t,
                enclosingNode: n,
                followingNode: r,
                text: u,
                options: a
              }) {
                let o = eI(a).indexOf('else', P(n.consequent));
                return (
                  g(e) >= o
                    ? es(r, e)
                    : 'BlockStatement' !== t.type &&
                        e_(e, u) &&
                        !eg(u, P(t), g(e))
                      ? el(t, e)
                      : ep(n, e),
                  !0
                );
              })({
                comment: e,
                precedingNode: t,
                enclosingNode: n,
                followingNode: r,
                text: u,
                options: a
              }))
      );
    }
    function eG({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      followingNode: r,
      text: u
    }) {
      return (
        n?.type === 'SwitchStatement' &&
        0 === n.cases.length &&
        !r &&
        t === n.discriminant &&
        '}' === eC(u, P(e)) &&
        (ep(n, e), !0)
      );
    }
    function eV({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      followingNode: r,
      text: u
    }) {
      return (
        (n?.type === 'WhileStatement' || n?.type === 'WithStatement') &&
        !!r &&
        (')' === eC(u, P(e)) ? (el(t, e), !0) : n.body === r && (es(r, e), !0))
      );
    }
    function eK(e, { comment: t, text: n, options: r }) {
      if (O(e) && eX(t, n) && !eO(t)) {
        let n = eI(r).slice(P(t), g(e));
        return /^[ \t]*$/.test(n);
      }
      return !1;
    }
    function eH(e, t) {
      return (es(eK(e, t) ? e.types[0] : e, t.comment), !0);
    }
    function ez({ comment: e, followingNode: t }) {
      return !!(t && eq(e)) && (es(t, e), !0);
    }
    function eQ({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      followingNode: r
    }) {
      return (
        (n?.type === 'TryStatement' || n?.type === 'CatchClause') &&
        !!r &&
        ('CatchClause' === n.type && t
          ? (el(t, e), !0)
          : 'BlockStatement' === r.type
            ? (e$(r, e), !0)
            : 'TryStatement' === r.type
              ? (eW(r.finalizer, e), !0)
              : 'CatchClause' === r.type && (eW(r.body, e), !0))
      );
    }
    function eY({ comment: e, enclosingNode: t, followingNode: n }) {
      return !!Y(t) && n?.type === 'Identifier' && (es(t, e), !0);
    }
    function eZ({
      comment: e,
      enclosingNode: t,
      followingNode: n,
      options: r
    }) {
      return (
        !!r.experimentalTernaries &&
        !!(t?.type === 'ConditionalExpression' || R(t)) &&
        !!(n?.type === 'ConditionalExpression' || R(n)) &&
        (ep(t, e), !0)
      );
    }
    function e0({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      followingNode: r,
      text: u,
      options: a
    }) {
      let o = t && !eg(u, P(t), g(e));
      return (
        !!((!t || !o) && (n?.type === 'ConditionalExpression' || R(n))) &&
        !!r &&
        (a.experimentalTernaries &&
        n.alternate === r &&
        !(eM(e) && !eg(a.originalText, g(e), P(e)))
          ? ep(n, e)
          : es(r, e),
        !0)
      );
    }
    var e1 = l([
      'ClassDeclaration',
      'ClassExpression',
      'DeclareClass',
      'DeclareInterface',
      'InterfaceDeclaration',
      'TSInterfaceDeclaration'
    ]);
    function e2({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      followingNode: r
    }) {
      if (e1(n)) {
        let { decorators: u } = n;
        if (s(u) && r?.type !== 'Decorator') return (el(y(0, u, -1), e), !0);
        if (n.body && r === n.body) return (e$(n.body, e), !0);
        if (r) {
          let { superClass: u } = n;
          if (u && r === u && t && (t === n.id || t === n.typeParameters))
            return (el(t, e), !0);
          for (let a of ['implements', 'extends', 'mixins'])
            if (n[a] && r === n[a][0])
              return (
                t && (t === n.id || t === n.typeParameters || t === u)
                  ? el(t, e)
                  : ep(n, e, a),
                !0
              );
        }
      }
      return !1;
    }
    var e8 = l([
      'ClassMethod',
      'ClassProperty',
      'PropertyDefinition',
      'TSAbstractPropertyDefinition',
      'TSAbstractMethodDefinition',
      'TSDeclareMethod',
      'MethodDefinition',
      'ClassAccessorProperty',
      'AccessorProperty',
      'TSAbstractAccessorProperty',
      'TSParameterProperty'
    ]);
    function e3({
      placement: e,
      comment: t,
      precedingNode: n,
      enclosingNode: r,
      followingNode: u,
      text: a
    }) {
      return r &&
        n &&
        '(' === eC(a, P(t)) &&
        ('Property' === r.type ||
          'TSDeclareMethod' === r.type ||
          'TSAbstractMethodDefinition' === r.type) &&
        'Identifier' === n.type &&
        r.key === n &&
        ':' !== eC(a, P(n))
        ? (el(n, t), !0)
        : e8(r) && !u && 'remaining' === e
          ? (el('(' === eC(a, P(t)) ? n : r, t), !0)
          : !!(
              n?.type === 'Decorator' &&
              e8(r) &&
              (ej(t) || 'ownLine' === e)
            ) && (el(n, t), !0);
    }
    var e6 = l([
      'FunctionDeclaration',
      'FunctionExpression',
      'ClassMethod',
      'MethodDefinition',
      'ObjectMethod'
    ]);
    function e7({ comment: e, precedingNode: t, enclosingNode: n, text: r }) {
      return '(' === eC(r, P(e)) && !!(t && e6(n)) && (el(t, e), !0);
    }
    function e9({ comment: e, enclosingNode: t, text: n }) {
      if (t?.type !== 'ArrowFunctionExpression') return !1;
      let r = eA(n, P(e));
      return (
        !1 !== r &&
        '=>' === n.slice(r, r + 2) &&
        (ep(t, e, 'commentBeforeArrow'), !0)
      );
    }
    function e4(e, t, n) {
      if (g(t) >= P(e) || P(t) <= g(e)) return !1;
      let r = eI(n);
      return (
        r.slice(0, g(t)).trimEnd().endsWith('(') &&
        r.slice(P(t)).trimStart().startsWith(')')
      );
    }
    var e5 = l([
      'ComponentDeclaration',
      'DeclareComponent',
      'ComponentTypeAnnotation'
    ]);
    function te({ comment: e, enclosingNode: t, options: n }) {
      if (!t) return !1;
      if (ee(t) && 0 === eS(t).length && e4(t, e, n)) return (ep(t, e), !0);
      let r =
        tS(t) || e5(t) || 'HookTypeAnnotation' === t.type
          ? t
          : 'MethodDefinition' === t.type ||
              'TSAbstractMethodDefinition' === t.type ||
              ('Property' === t.type && A(t))
            ? t.value
            : void 0;
      return !!(r && 0 === F(r).length && e4(r, e, n)) && (ep(r, e), !0);
    }
    function tt({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      followingNode: r,
      text: u
    }) {
      return (t?.type === 'FunctionTypeParam' &&
        n?.type === 'FunctionTypeAnnotation' &&
        r?.type !== 'FunctionTypeParam') ||
        (t?.type === 'ComponentTypeParameter' &&
          (n?.type === 'DeclareComponent' ||
            n?.type === 'ComponentTypeAnnotation') &&
          r?.type !== 'ComponentTypeParameter') ||
        ((t?.type === 'Identifier' ||
          t?.type === 'AssignmentPattern' ||
          t?.type === 'ObjectPattern' ||
          t?.type === 'ArrayPattern' ||
          t?.type === 'RestElement' ||
          t?.type === 'TSParameterProperty') &&
          (tS(n) ||
            ((n?.type === 'TSAbstractMethodDefinition' ||
              n?.type === 'MethodDefinition') &&
              'TSEmptyBodyFunctionExpression' === n.value.type)) &&
          ')' === eC(u, P(e))) ||
        ((t?.type === 'ComponentParameter' || t?.type === 'RestElement') &&
          (n?.type === 'ComponentDeclaration' ||
            n?.type === 'DeclareComponent') &&
          ')' === eC(u, P(e)))
        ? (el(t, e), !0)
        : !!(!eM(e) && r?.type === 'BlockStatement' && e6(n)) &&
            ('MethodDefinition' === n.type ? n.value.body : n.body) === r &&
            eA(u, P(e)) === g(r) &&
            (e$(r, e), !0);
    }
    function tn({ comment: e, enclosingNode: t }) {
      return t?.type === 'LabeledStatement' && (es(t, e), !0);
    }
    function tr({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      options: r
    }) {
      return (
        !!(
          Z(n) &&
          n.callee === t &&
          n.arguments.length > 0 &&
          (function (e, t, n) {
            let r = eN(e, n);
            if (void 0 === r || P(t) > r) return !1;
            let u = (function (e, t) {
              if (void 0 === eN(e, t)) return;
              let n = eI(t),
                r = P(e.typeArguments ?? e.callee),
                u = n.indexOf('(', r);
              if (-1 !== u) return u;
            })(e, n);
            return void 0 !== u && g(t) > u;
          })(n, e, r)
        ) && (es(n.arguments[0], e), !0)
      );
    }
    function tu({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      followingNode: r
    }) {
      return O(n)
        ? (eO(e) && ((r.prettierIgnore = !0), (e.unignore = !0)),
          !!t && (el(t, e), !0))
        : (O(r) &&
            eO(e) &&
            ((r.types[0].prettierIgnore = !0), (e.unignore = !0)),
          !1);
    }
    function ta({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      followingNode: r
    }) {
      return n && 'MatchOrPattern' === n.type
        ? (eO(e) && ((r.prettierIgnore = !0), (e.unignore = !0)),
          !!t && (el(t, e), !0))
        : (r &&
            'MatchOrPattern' === r.type &&
            eO(e) &&
            ((r.types[0].prettierIgnore = !0), (e.unignore = !0)),
          !1);
    }
    function to({ comment: e, enclosingNode: t }) {
      return !!eL(t) && (es(t, e), !0);
    }
    function ti({ comment: e, enclosingNode: t, ast: n, isLastComment: r }) {
      return n?.body?.length === 0
        ? (r ? ep(n, e) : es(n, e), !0)
        : !(t?.type !== 'Program' || 0 !== t.body.length || s(t.directives)) &&
            (r ? ep(t, e) : es(t, e), !0);
    }
    function ts({ comment: e, precedingNode: t, enclosingNode: n, text: r }) {
      if (n?.type === 'ImportSpecifier' || n?.type === 'ExportSpecifier')
        return (es(n, e), !0);
      let u = t?.type === 'ImportSpecifier' && n?.type === 'ImportDeclaration',
        a =
          t?.type === 'ExportSpecifier' && n?.type === 'ExportNamedDeclaration';
      return !!((u || a) && ex(r, P(e))) && (el(t, e), !0);
    }
    function tp({ comment: e, enclosingNode: t }) {
      return t?.type === 'AssignmentPattern' && (es(t, e), !0);
    }
    var tl = l([
        'VariableDeclarator',
        'AssignmentExpression',
        'TypeAlias',
        'TSTypeAliasDeclaration'
      ]),
      tc = l([
        'ObjectExpression',
        'ArrayExpression',
        'TemplateLiteral',
        'TaggedTemplateExpression',
        'ObjectTypeAnnotation',
        'TSTypeLiteral'
      ]);
    function tD(e) {
      let {
        comment: t,
        enclosingNode: n,
        followingNode: r,
        options: u,
        placement: a
      } = e;
      if (tl(n) && r && 'endOfLine' === a && (tc(r) || eM(t))) return eH(r, e);
      if (X(n) && r) {
        let a = n.id,
          o = eI(u).indexOf('=', P(a));
        if (g(t) >= o) return eH(r, e);
      }
      return !1;
    }
    function ty({
      comment: e,
      enclosingNode: t,
      precedingNode: n,
      followingNode: r,
      text: u
    }) {
      return (
        !r &&
        (t?.type === 'TSMethodSignature' ||
          t?.type === 'TSDeclareFunction' ||
          t?.type === 'TSAbstractMethodDefinition') &&
        (!n || n !== t.returnType) &&
        ';' === eC(u, P(e)) &&
        (el(t, e), !0)
      );
    }
    function td({ comment: e, enclosingNode: t, followingNode: n }) {
      if (eO(e) && t?.type === 'TSMappedType' && n === t.key)
        return ((t.prettierIgnore = !0), (e.unignore = !0), !0);
    }
    function tm({ comment: e, enclosingNode: t, options: n }) {
      let r;
      if (
        t?.type === 'TSMappedType' &&
        ((r = eI(n).indexOf('[', g(t))), P(e) < r)
      )
        return (ep(t, e), !0);
    }
    function tf({ comment: e, enclosingNode: t, followingNode: n }) {
      return (
        !!t &&
        'SwitchCase' === t.type &&
        !t.test &&
        !!n &&
        n === t.consequent[0] &&
        ('BlockStatement' === n.type && ej(e) ? e$(n, e) : ep(t, e), !0)
      );
    }
    function tF({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      followingNode: r
    }) {
      return (
        !!(O(t) && ((en(n) && !r) || J(n) || O(n))) &&
        (el(y(0, t.types, -1), e), !0)
      );
    }
    function tE({
      comment: e,
      enclosingNode: t,
      precedingNode: n,
      followingNode: r
    }) {
      if (
        (t?.type === 'ObjectPattern' || t?.type === 'ArrayPattern') &&
        r?.type === 'TSTypeAnnotation'
      )
        return (n ? el(n, e) : ep(t, e), !0);
    }
    function tA({
      comment: e,
      precedingNode: t,
      enclosingNode: n,
      followingNode: r,
      text: u
    }) {
      return (
        !(
          !(
            !r &&
            n?.type === 'UnaryExpression' &&
            (t?.type === 'LogicalExpression' ||
              t?.type === 'BinaryExpression') &&
            eg(u, g(n.argument), g(t.right)) &&
            e_(e, u)
          ) || eg(u, g(t.right), g(e))
        ) && (el(t.right, e), !0)
      );
    }
    function tC({ enclosingNode: e, followingNode: t, comment: n }) {
      if (
        e &&
        ('TSPropertySignature' === e.type || 'ObjectTypeProperty' === e.type) &&
        (O(t) || J(t))
      )
        return (es(t, n), !0);
    }
    function tx({
      enclosingNode: e,
      precedingNode: t,
      followingNode: n,
      comment: r,
      text: u
    }) {
      if (j(e) && t === e.expression && !e_(r, u))
        return (n ? es(n, r) : el(e, r), !0);
    }
    function tg({
      comment: e,
      enclosingNode: t,
      followingNode: n,
      precedingNode: r,
      options: u
    }) {
      let a;
      return (
        !(
          t?.type !== 'ArrowFunctionExpression' ||
          !n ||
          !r ||
          ((a = eI(u).lastIndexOf('=>', g(t.body))), P(e) < a)
        ) && (eW(n, e), !0)
      );
    }
    function th({
      comment: e,
      enclosingNode: t,
      precedingNode: n,
      followingNode: r
    }) {
      if (!r && t && n) {
        if ('ExpressionStatement' === t.type && t.expression === n)
          return (el(t, e), !0);
        let r = 'SequenceExpression' === n.type,
          u = 'AssignmentExpression' === n.type;
        if (
          (r || u) &&
          (('ArrowFunctionExpression' === t.type && t.body === n) ||
            ('VariableDeclarator' === t.type && t.init === n) ||
            ('ReturnStatement' === t.type && t.argument === n) ||
            ('AssignmentExpression' === t.type && t.right === n))
        )
          return (el(r ? y(0, n.expressions, -1) : n.right, e), !0);
      }
      return !1;
    }
    function tT(e) {
      let { followingNode: t, comment: n } = e;
      return !!eK(t, e) && (es(t.types[0], n), !0);
    }
    var tS = l([
        'ArrowFunctionExpression',
        'FunctionExpression',
        'FunctionDeclaration',
        'ObjectMethod',
        'ClassMethod',
        'TSDeclareFunction',
        'TSCallSignatureDeclaration',
        'TSConstructSignatureDeclaration',
        'TSMethodSignature',
        'TSConstructorType',
        'TSFunctionType',
        'TSDeclareMethod',
        'HookDeclaration'
      ]),
      tB = (e, t) => {
        if (('function' == typeof e && ((t = e), (e = 0)), e || t))
          return (n, r, u) =>
            !(
              (2 & e && !n.leading) ||
              (4 & e && !n.trailing) ||
              (8 & e && (n.leading || n.trailing)) ||
              (16 & e && !eM(n)) ||
              (32 & e && !ej(n)) ||
              (128 & e && 0 !== r) ||
              (256 & e && r !== u.length - 1) ||
              (64 & e && !eO(n)) ||
              (t && !t(n))
            );
      };
    function tb(e, t, n) {
      if (!s(e?.comments)) return !1;
      let r = tB(t, n);
      return !r || e.comments.some(r);
    }
    function tv(e, t, n) {
      if (!Array.isArray(e?.comments)) return [];
      let r = tB(t, n);
      return r ? e.comments.filter(r) : e.comments;
    }
    function tP(e) {
      return e?.prettierIgnore || tb(e, 64);
    }
    function tk(e) {
      let { node: t } = e;
      return (
        ('FunctionExpression' === t.type ||
          'ArrowFunctionExpression' === t.type) &&
        (('callee' === e.key && Q(e.parent)) ||
          ('tag' === e.key && 'TaggedTemplateExpression' === e.parent.type))
      );
    }
    var tw = new Map(
      [
        ['|>'],
        ['??'],
        ['||'],
        ['&&'],
        ['|'],
        ['^'],
        ['&'],
        ['==', '===', '!=', '!=='],
        ['<', '>', '<=', '>=', 'in', 'instanceof'],
        ['>>', '<<', '>>>'],
        ['+', '-'],
        ['*', '/', '%'],
        ['**']
      ].flatMap((e, t) => e.map(e => [e, t]))
    );
    function tI(e) {
      return tw.get(e);
    }
    var tN = { '==': !0, '!=': !0, '===': !0, '!==': !0 },
      tM = { '*': !0, '/': !0, '%': !0 },
      tj = { '>>': !0, '>>>': !0, '<<': !0 };
    function tL(e, t) {
      return !(
        tI(t) !== tI(e) ||
        '**' === e ||
        (tN[e] && tN[t]) ||
        ('%' === t && tM[e]) ||
        ('%' === e && tM[t]) ||
        (t !== e && tM[t] && tM[e]) ||
        (tj[e] && tj[t])
      );
    }
    function tO(e, t) {
      switch (e.type) {
        case 'BinaryExpression':
        case 'LogicalExpression':
        case 'AssignmentExpression':
        case 'NGPipeExpression':
          return tO(e.left, t);
        case 'MemberExpression':
        case 'OptionalMemberExpression':
          return tO(e.object, t);
        case 'TaggedTemplateExpression':
          return 'FunctionExpression' !== e.tag.type && tO(e.tag, t);
        case 'CallExpression':
        case 'OptionalCallExpression':
          return 'FunctionExpression' !== e.callee.type && tO(e.callee, t);
        case 'ConditionalExpression':
          return tO(e.test, t);
        case 'UpdateExpression':
          return !e.prefix && tO(e.argument, t);
        case 'BindExpression':
          return e.object && tO(e.object, t);
        case 'SequenceExpression':
          return tO(e.expressions[0], t);
        case 'ChainExpression':
        case 'TSNonNullExpression':
        case 'TSSatisfiesExpression':
        case 'TSAsExpression':
        case 'AsExpression':
        case 'AsConstExpression':
        case 'SatisfiesExpression':
          return tO(e.expression, t);
        default:
          return t(e);
      }
    }
    var tJ = e => e.extra?.parenthesized,
      tq = l(['OptionalCallExpression', 'OptionalMemberExpression']),
      tR = function (e) {
        return null !== e && 'object' == typeof e;
      },
      tX = null;
    function t_(e) {
      if (null !== tX && (tX.property, 1)) {
        let e = tX;
        return ((tX = t_.prototype = null), e);
      }
      return ((tX = t_.prototype = e ?? Object.create(null)), new t_());
    }
    for (let e = 0; e <= 10; e++) t_();
    var tW = function (e, t = 'type') {
        return (
          t_(e),
          function (n) {
            let r = n[t],
              u = e[r];
            if (!Array.isArray(u))
              throw Object.assign(Error(`Missing visitor keys for '${r}'.`), {
                node: n
              });
            return u;
          }
        );
      },
      t$ = [
        ['elements'],
        ['left', 'right'],
        ['value'],
        ['directives', 'body'],
        ['label'],
        ['callee', 'typeArguments', 'arguments'],
        ['test', 'consequent', 'alternate'],
        ['body', 'test'],
        ['expression'],
        ['left', 'right', 'body'],
        ['id', 'typeParameters', 'params', 'predicate', 'returnType', 'body'],
        ['object', 'property'],
        ['properties'],
        ['decorators', 'key', 'typeParameters', 'params', 'returnType', 'body'],
        ['decorators', 'key', 'value'],
        ['argument'],
        ['expressions'],
        ['id', 'init'],
        ['body'],
        [
          'decorators',
          'id',
          'typeParameters',
          'superClass',
          'superTypeArguments',
          'mixins',
          'implements',
          'body'
        ],
        ['declaration', 'specifiers', 'source', 'attributes'],
        ['local'],
        ['exported'],
        ['decorators', 'variance', 'key', 'typeAnnotation', 'value'],
        ['id'],
        ['key', 'value'],
        ['elementType'],
        ['id', 'typeParameters'],
        ['id', 'typeParameters', 'extends', 'body'],
        ['id', 'body'],
        ['typeAnnotation'],
        ['id', 'typeParameters', 'right'],
        ['name', 'typeAnnotation'],
        ['types'],
        ['qualification', 'id'],
        ['elementTypes'],
        ['expression', 'typeAnnotation'],
        ['params'],
        ['members'],
        ['objectType', 'indexType'],
        ['decorators', 'key', 'typeAnnotation', 'value'],
        ['id', 'typeParameters', 'params', 'returnType', 'body'],
        ['key', 'typeParameters', 'params', 'returnType'],
        ['typeParameters', 'params', 'returnType'],
        ['parameterName', 'typeAnnotation'],
        ['checkType', 'extendsType', 'trueType', 'falseType'],
        ['typeParameter'],
        ['literal'],
        ['expression', 'typeArguments'],
        ['decorators', 'key', 'typeAnnotation'],
        ['argument', 'cases'],
        ['pattern', 'body', 'guard'],
        ['properties', 'rest'],
        ['node']
      ],
      tU = tW({
        ArrayExpression: t$[0],
        AssignmentExpression: t$[1],
        BinaryExpression: t$[1],
        InterpreterDirective: [],
        Directive: t$[2],
        DirectiveLiteral: [],
        BlockStatement: t$[3],
        BreakStatement: t$[4],
        CallExpression: t$[5],
        CatchClause: ['param', 'body'],
        ConditionalExpression: t$[6],
        ContinueStatement: t$[4],
        DebuggerStatement: [],
        DoWhileStatement: t$[7],
        EmptyStatement: [],
        ExpressionStatement: t$[8],
        File: ['program'],
        ForInStatement: t$[9],
        ForStatement: ['init', 'test', 'update', 'body'],
        FunctionDeclaration: t$[10],
        FunctionExpression: t$[10],
        Identifier: ['typeAnnotation', 'decorators'],
        IfStatement: t$[6],
        LabeledStatement: ['label', 'body'],
        StringLiteral: [],
        NumericLiteral: [],
        NullLiteral: [],
        BooleanLiteral: [],
        RegExpLiteral: [],
        LogicalExpression: t$[1],
        MemberExpression: t$[11],
        NewExpression: t$[5],
        Program: t$[3],
        ObjectExpression: t$[12],
        ObjectMethod: t$[13],
        ObjectProperty: t$[14],
        RestElement: ['argument', 'typeAnnotation', 'decorators'],
        ReturnStatement: t$[15],
        SequenceExpression: t$[16],
        ParenthesizedExpression: t$[8],
        SwitchCase: ['test', 'consequent'],
        SwitchStatement: ['discriminant', 'cases'],
        ThisExpression: [],
        ThrowStatement: t$[15],
        TryStatement: ['block', 'handler', 'finalizer'],
        UnaryExpression: t$[15],
        UpdateExpression: t$[15],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: t$[17],
        WhileStatement: t$[7],
        WithStatement: ['object', 'body'],
        AssignmentPattern: ['left', 'right', 'decorators', 'typeAnnotation'],
        ArrayPattern: ['elements', 'typeAnnotation', 'decorators'],
        ArrowFunctionExpression: [
          'typeParameters',
          'params',
          'predicate',
          'returnType',
          'body'
        ],
        ClassBody: t$[18],
        ClassExpression: t$[19],
        ClassDeclaration: t$[19],
        ExportAllDeclaration: ['source', 'attributes', 'exported'],
        ExportDefaultDeclaration: ['declaration'],
        ExportNamedDeclaration: t$[20],
        ExportSpecifier: ['local', 'exported'],
        ForOfStatement: t$[9],
        ImportDeclaration: ['specifiers', 'source', 'attributes'],
        ImportDefaultSpecifier: t$[21],
        ImportNamespaceSpecifier: t$[21],
        ImportSpecifier: ['imported', 'local'],
        MetaProperty: ['meta', 'property'],
        ClassMethod: t$[13],
        ObjectPattern: ['decorators', 'properties', 'typeAnnotation'],
        SpreadElement: t$[15],
        Super: [],
        TaggedTemplateExpression: ['tag', 'typeArguments', 'quasi'],
        TemplateElement: [],
        TemplateLiteral: ['quasis', 'expressions'],
        YieldExpression: t$[15],
        AwaitExpression: t$[15],
        ImportExpression: ['source', 'options'],
        BigIntLiteral: [],
        ExportNamespaceSpecifier: t$[22],
        OptionalMemberExpression: t$[11],
        OptionalCallExpression: t$[5],
        ClassProperty: t$[23],
        ClassPrivateProperty: t$[23],
        ClassPrivateMethod: t$[13],
        PrivateName: t$[24],
        StaticBlock: t$[18],
        ImportAttribute: t$[25],
        AnyTypeAnnotation: [],
        ArrayTypeAnnotation: t$[26],
        BooleanTypeAnnotation: [],
        BooleanLiteralTypeAnnotation: [],
        NullLiteralTypeAnnotation: [],
        ClassImplements: t$[27],
        DeclareClass: [
          'id',
          'typeParameters',
          'extends',
          'mixins',
          'implements',
          'body'
        ],
        DeclareFunction: ['id', 'predicate'],
        DeclareInterface: t$[28],
        DeclareModule: t$[29],
        DeclareModuleExports: t$[30],
        DeclareTypeAlias: t$[31],
        DeclareOpaqueType: [
          'id',
          'typeParameters',
          'supertype',
          'lowerBound',
          'upperBound'
        ],
        DeclareVariable: ['id', 'declarations'],
        DeclareExportDeclaration: t$[20],
        DeclareExportAllDeclaration: ['source', 'attributes'],
        DeclaredPredicate: t$[2],
        ExistsTypeAnnotation: [],
        FunctionTypeAnnotation: [
          'typeParameters',
          'this',
          'params',
          'rest',
          'returnType'
        ],
        FunctionTypeParam: t$[32],
        GenericTypeAnnotation: t$[27],
        InferredPredicate: [],
        InterfaceExtends: t$[27],
        InterfaceDeclaration: t$[28],
        InterfaceTypeAnnotation: ['extends', 'body'],
        IntersectionTypeAnnotation: t$[33],
        MixedTypeAnnotation: [],
        EmptyTypeAnnotation: [],
        NullableTypeAnnotation: t$[30],
        NumberLiteralTypeAnnotation: [],
        BigIntLiteralTypeAnnotation: [],
        NumberTypeAnnotation: [],
        ObjectTypeAnnotation: [
          'properties',
          'indexers',
          'callProperties',
          'internalSlots'
        ],
        ObjectTypeInternalSlot: ['id', 'value'],
        ObjectTypeCallProperty: t$[2],
        ObjectTypeIndexer: ['variance', 'id', 'key', 'value'],
        ObjectTypeProperty: ['key', 'value', 'variance'],
        ObjectTypeSpreadProperty: t$[15],
        OpaqueType: [
          'id',
          'typeParameters',
          'supertype',
          'impltype',
          'lowerBound',
          'upperBound'
        ],
        QualifiedTypeIdentifier: t$[34],
        StringLiteralTypeAnnotation: [],
        StringTypeAnnotation: [],
        SymbolTypeAnnotation: [],
        ThisTypeAnnotation: [],
        TupleTypeAnnotation: t$[35],
        TypeofTypeAnnotation: ['argument', 'typeArguments'],
        TypeAlias: t$[31],
        TypeAnnotation: t$[30],
        TypeCastExpression: t$[36],
        TypeParameter: ['bound', 'default', 'variance'],
        TypeParameterDeclaration: t$[37],
        TypeParameterInstantiation: t$[37],
        UnionTypeAnnotation: t$[33],
        Variance: [],
        VoidTypeAnnotation: [],
        EnumDeclaration: t$[29],
        EnumBooleanBody: t$[38],
        EnumNumberBody: t$[38],
        EnumStringBody: t$[38],
        EnumSymbolBody: t$[38],
        EnumBooleanMember: t$[17],
        EnumNumberMember: t$[17],
        EnumStringMember: t$[17],
        EnumDefaultedMember: t$[24],
        IndexedAccessType: t$[39],
        OptionalIndexedAccessType: t$[39],
        JSXAttribute: ['name', 'value'],
        JSXClosingElement: ['name'],
        JSXElement: ['openingElement', 'children', 'closingElement'],
        JSXEmptyExpression: [],
        JSXExpressionContainer: t$[8],
        JSXSpreadChild: t$[8],
        JSXIdentifier: [],
        JSXMemberExpression: t$[11],
        JSXNamespacedName: ['namespace', 'name'],
        JSXOpeningElement: ['name', 'typeArguments', 'attributes'],
        JSXSpreadAttribute: t$[15],
        JSXText: [],
        JSXFragment: ['openingFragment', 'children', 'closingFragment'],
        JSXOpeningFragment: [],
        JSXClosingFragment: [],
        Placeholder: [],
        V8IntrinsicIdentifier: [],
        ArgumentPlaceholder: [],
        BindExpression: ['object', 'callee'],
        ClassAccessorProperty: t$[40],
        Decorator: t$[8],
        DoExpression: t$[18],
        ExportDefaultSpecifier: t$[22],
        ModuleExpression: t$[18],
        TopicReference: [],
        VoidPattern: [],
        TSParameterProperty: ['parameter', 'decorators'],
        TSDeclareFunction: t$[41],
        TSDeclareMethod: t$[42],
        TSQualifiedName: t$[1],
        TSCallSignatureDeclaration: t$[43],
        TSConstructSignatureDeclaration: t$[43],
        TSPropertySignature: ['key', 'typeAnnotation'],
        TSMethodSignature: t$[42],
        TSIndexSignature: ['parameters', 'typeAnnotation'],
        TSAnyKeyword: [],
        TSBooleanKeyword: [],
        TSBigIntKeyword: [],
        TSIntrinsicKeyword: [],
        TSNeverKeyword: [],
        TSNullKeyword: [],
        TSNumberKeyword: [],
        TSObjectKeyword: [],
        TSStringKeyword: [],
        TSSymbolKeyword: [],
        TSUndefinedKeyword: [],
        TSUnknownKeyword: [],
        TSVoidKeyword: [],
        TSThisType: [],
        TSFunctionType: t$[43],
        TSConstructorType: t$[43],
        TSTypeReference: ['typeName', 'typeArguments'],
        TSTypePredicate: t$[44],
        TSTypeQuery: ['exprName', 'typeArguments'],
        TSTypeLiteral: t$[38],
        TSArrayType: t$[26],
        TSTupleType: t$[35],
        TSOptionalType: t$[30],
        TSRestType: t$[30],
        TSNamedTupleMember: ['label', 'elementType'],
        TSUnionType: t$[33],
        TSIntersectionType: t$[33],
        TSConditionalType: t$[45],
        TSInferType: t$[46],
        TSParenthesizedType: t$[30],
        TSTypeOperator: t$[30],
        TSIndexedAccessType: t$[39],
        TSMappedType: ['key', 'constraint', 'nameType', 'typeAnnotation'],
        TSTemplateLiteralType: ['quasis', 'types'],
        TSLiteralType: t$[47],
        TSClassImplements: t$[48],
        TSInterfaceHeritage: t$[48],
        TSInterfaceDeclaration: t$[28],
        TSInterfaceBody: t$[18],
        TSTypeAliasDeclaration: ['id', 'typeParameters', 'typeAnnotation'],
        TSInstantiationExpression: t$[48],
        TSAsExpression: t$[36],
        TSSatisfiesExpression: t$[36],
        TSTypeAssertion: t$[36],
        TSEnumBody: t$[38],
        TSEnumDeclaration: t$[29],
        TSEnumMember: ['id', 'initializer'],
        TSModuleDeclaration: t$[29],
        TSModuleBlock: t$[18],
        TSImportType: ['source', 'options', 'qualifier', 'typeArguments'],
        TSImportEqualsDeclaration: ['id', 'moduleReference'],
        TSExternalModuleReference: t$[8],
        TSNonNullExpression: t$[8],
        TSExportAssignment: t$[8],
        TSNamespaceExportDeclaration: t$[24],
        TSTypeAnnotation: t$[30],
        TSTypeParameterInstantiation: t$[37],
        TSTypeParameterDeclaration: t$[37],
        TSTypeParameter: ['name', 'constraint', 'default'],
        ChainExpression: t$[8],
        Literal: [],
        MethodDefinition: t$[14],
        PrivateIdentifier: [],
        Property: t$[25],
        PropertyDefinition: t$[23],
        AccessorProperty: t$[40],
        TSAbstractAccessorProperty: t$[49],
        TSAbstractKeyword: [],
        TSAbstractMethodDefinition: t$[25],
        TSAbstractPropertyDefinition: t$[49],
        TSAsyncKeyword: [],
        TSDeclareKeyword: [],
        TSEmptyBodyFunctionExpression: [
          'id',
          'typeParameters',
          'params',
          'returnType'
        ],
        TSExportKeyword: [],
        TSPrivateKeyword: [],
        TSProtectedKeyword: [],
        TSPublicKeyword: [],
        TSReadonlyKeyword: [],
        TSStaticKeyword: [],
        AsConstExpression: t$[8],
        AsExpression: t$[36],
        BigIntTypeAnnotation: [],
        ComponentDeclaration: [
          'id',
          'params',
          'body',
          'typeParameters',
          'rendersType'
        ],
        ComponentParameter: ['name', 'local'],
        ComponentTypeAnnotation: [
          'params',
          'rest',
          'typeParameters',
          'rendersType'
        ],
        ComponentTypeParameter: t$[32],
        ConditionalTypeAnnotation: t$[45],
        DeclareComponent: [
          'id',
          'params',
          'rest',
          'typeParameters',
          'rendersType'
        ],
        DeclareEnum: t$[29],
        DeclareHook: t$[24],
        DeclareNamespace: t$[29],
        EnumBigIntBody: t$[38],
        EnumBigIntMember: t$[17],
        EnumBody: t$[38],
        HookDeclaration: t$[41],
        HookTypeAnnotation: ['params', 'returnType', 'rest', 'typeParameters'],
        InferTypeAnnotation: t$[46],
        KeyofTypeAnnotation: t$[15],
        MatchArrayPattern: ['elements', 'rest'],
        MatchAsPattern: ['pattern', 'target'],
        MatchBindingPattern: t$[24],
        MatchExpression: t$[50],
        MatchExpressionCase: t$[51],
        MatchIdentifierPattern: t$[24],
        MatchInstanceObjectPattern: t$[52],
        MatchInstancePattern: ['targetConstructor', 'properties'],
        MatchLiteralPattern: t$[47],
        MatchMemberPattern: ['base', 'property'],
        MatchObjectPattern: t$[52],
        MatchObjectPatternProperty: ['key', 'pattern'],
        MatchOrPattern: ['patterns'],
        MatchRestPattern: t$[15],
        MatchStatement: t$[50],
        MatchStatementCase: t$[51],
        MatchUnaryPattern: t$[15],
        MatchWildcardPattern: [],
        NeverTypeAnnotation: [],
        ObjectTypeMappedTypeProperty: [
          'keyTparam',
          'propType',
          'sourceType',
          'variance'
        ],
        QualifiedTypeofIdentifier: t$[34],
        RecordDeclaration: ['id', 'typeParameters', 'implements', 'body'],
        RecordDeclarationBody: t$[0],
        RecordDeclarationImplements: ['id', 'typeArguments'],
        RecordDeclarationProperty: ['key', 'typeAnnotation', 'defaultValue'],
        RecordDeclarationStaticProperty: ['key', 'typeAnnotation', 'value'],
        RecordExpression: ['recordConstructor', 'typeArguments', 'properties'],
        RecordExpressionProperties: t$[12],
        SatisfiesExpression: t$[36],
        TupleTypeLabeledElement: ['label', 'elementType', 'variance'],
        TupleTypeSpreadElement: ['label', 'typeAnnotation'],
        TypeOperator: t$[30],
        TypePredicate: t$[44],
        UndefinedTypeAnnotation: [],
        UnknownTypeAnnotation: [],
        NGChainedExpression: t$[16],
        NGEmptyExpression: [],
        NGPipeExpression: ['left', 'right', 'arguments'],
        NGMicrosyntax: t$[18],
        NGMicrosyntaxAs: ['key', 'alias'],
        NGMicrosyntaxExpression: ['expression', 'alias'],
        NGMicrosyntaxKey: [],
        NGMicrosyntaxKeyedExpression: ['key', 'expression'],
        NGMicrosyntaxLet: t$[25],
        NGRoot: t$[53],
        JsExpressionRoot: t$[53],
        JsonRoot: t$[53],
        TSJSDocAllType: [],
        TSJSDocUnknownType: [],
        TSJSDocNullableType: t$[30],
        TSJSDocNonNullableType: t$[30]
      });
    function tG(e, t) {
      return (
        t(e) ||
        (function (e, { getVisitorKeys: t, predicate: n }) {
          for (let r of (function* (e, t) {
            let n = [e];
            for (let e = 0; e < n.length; e++)
              for (let r of (function* (e, t) {
                let { getVisitorKeys: n, filter: r = () => !0 } = t,
                  u = e => tR(e) && r(e);
                for (let t of n(e)) {
                  let n = e[t];
                  if (Array.isArray(n)) for (let e of n) u(e) && (yield e);
                  else u(n) && (yield n);
                }
              })(n[e], t))
                (yield r, n.push(r));
          })(e, { getVisitorKeys: t }))
            if (n(r)) return !0;
          return !1;
        })(e, { getVisitorKeys: tU, predicate: t })
      );
    }
    function tV(e) {
      return (
        'AssignmentExpression' === e.type ||
        'BinaryExpression' === e.type ||
        'LogicalExpression' === e.type ||
        'NGPipeExpression' === e.type ||
        'ConditionalExpression' === e.type ||
        Q(e) ||
        Y(e) ||
        'SequenceExpression' === e.type ||
        'TaggedTemplateExpression' === e.type ||
        'BindExpression' === e.type ||
        ('UpdateExpression' === e.type && !e.prefix) ||
        j(e) ||
        et(e)
      );
    }
    function tK(e) {
      if (e.expressions) return ['expressions', 0];
      if (e.left) return ['left'];
      if (e.test) return ['test'];
      if (e.object) return ['object'];
      if (e.callee) return ['callee'];
      if (e.tag) return ['tag'];
      if (e.argument) return ['argument'];
      if (e.expression) return ['expression'];
      throw Error('Unexpected node has no left side.');
    }
    function tH(e, t) {
      return H(t) ? tP(t) : tb(t, 2, t => ex(e, P(t)));
    }
    var tz = new WeakMap();
    function tQ(e, t) {
      return d(tz, e, e =>
        (function (e, t) {
          if (
            tH(t.originalText, e) ||
            (tb(e, 2, e => eg(t.originalText, g(e), P(e))) && !H(e))
          )
            return !0;
          if (tV(e)) {
            var n;
            let r = e,
              u;
            for (
              ;
              (u = (n = r).expressions
                ? n.expressions[0]
                : (n.left ??
                  n.test ??
                  n.callee ??
                  n.object ??
                  n.tag ??
                  n.argument ??
                  n.expression));
            )
              if (((r = u), tH(t.originalText, r))) return !0;
          }
          return !1;
        })(e, t)
      );
    }
    function tY(e) {
      for (; et(e);) e = e.expression;
      return e;
    }
    function tZ(e) {
      return (
        'Identifier' === e.type ||
        (!!Y(e) &&
          !e.computed &&
          !e.optional &&
          'Identifier' === e.property.type &&
          tZ(e.object))
      );
    }
    var t0 = l([
        'BlockStatement',
        'BreakStatement',
        'ComponentDeclaration',
        'ClassBody',
        'ClassDeclaration',
        'ClassMethod',
        'ClassProperty',
        'PropertyDefinition',
        'ClassPrivateProperty',
        'ContinueStatement',
        'DebuggerStatement',
        'DeclareComponent',
        'DeclareClass',
        'DeclareExportAllDeclaration',
        'DeclareExportDeclaration',
        'DeclareFunction',
        'DeclareHook',
        'DeclareInterface',
        'DeclareModule',
        'DeclareModuleExports',
        'DeclareNamespace',
        'DeclareVariable',
        'DeclareEnum',
        'DoWhileStatement',
        'EnumDeclaration',
        'ExportAllDeclaration',
        'ExportDefaultDeclaration',
        'ExportNamedDeclaration',
        'ExpressionStatement',
        'ForInStatement',
        'ForOfStatement',
        'ForStatement',
        'FunctionDeclaration',
        'HookDeclaration',
        'IfStatement',
        'ImportDeclaration',
        'InterfaceDeclaration',
        'LabeledStatement',
        'MethodDefinition',
        'ReturnStatement',
        'SwitchStatement',
        'ThrowStatement',
        'TryStatement',
        'TSDeclareFunction',
        'TSEnumDeclaration',
        'TSImportEqualsDeclaration',
        'TSInterfaceDeclaration',
        'TSModuleDeclaration',
        'TSNamespaceExportDeclaration',
        'TypeAlias',
        'VariableDeclaration',
        'WhileStatement',
        'WithStatement'
      ]),
      t1 = function e(t, n) {
        var r;
        if (t.isRoot) return !1;
        let { node: u, key: a, parent: o } = t;
        if (
          n.__isInHtmlInterpolation &&
          !n.bracketSpacing &&
          U(u) &&
          (function e(t) {
            let { parent: n, key: r } = t;
            switch (n.type) {
              case 'NGPipeExpression':
                if ('arguments' === r && t.isLast) return t.callParent(e);
                break;
              case 'ObjectProperty':
                if ('value' === r)
                  return t.callParent(() => 'properties' === t.key && t.isLast);
                break;
              case 'BinaryExpression':
              case 'LogicalExpression':
                if ('right' === r) return t.callParent(e);
                break;
              case 'ConditionalExpression':
                if ('alternate' === r) return t.callParent(e);
                break;
              case 'UnaryExpression':
                if (n.prefix && t.callParent(e)) return !0;
            }
            return !1;
          })(t)
        )
          return !0;
        if (t0(u)) return !1;
        if ('Identifier' === u.type)
          return (function (e) {
            let { node: t } = e;
            if ('Identifier' !== t.type) return !1;
            if (
              t.extra?.parenthesized &&
              /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(t.name)
            )
              return !0;
            let { key: n, parent: r } = e;
            if (
              'left' === n &&
              (('async' === t.name && !r.await) || 'let' === t.name) &&
              'ForOfStatement' === r.type
            )
              return !0;
            if ('let' === t.name) {
              let n = e.findAncestor(
                e => 'ForOfStatement' === e.type || 'ForInStatement' === e.type
              )?.left;
              if (n && tO(n, e => e === t)) return !0;
            }
            if (
              'object' === n &&
              'let' === t.name &&
              'MemberExpression' === r.type &&
              r.computed &&
              !r.optional
            ) {
              let n = e.findAncestor(
                  e =>
                    'ExpressionStatement' === e.type ||
                    'ForStatement' === e.type ||
                    'ForInStatement' === e.type
                ),
                r = n
                  ? 'ExpressionStatement' === n.type
                    ? n.expression
                    : 'ForStatement' === n.type
                      ? n.init
                      : n.left
                  : void 0;
              if (r && tO(r, e => e === t)) return !0;
            }
            if ('expression' === n)
              switch (t.name) {
                case 'await':
                case 'interface':
                case 'module':
                case 'using':
                case 'yield':
                case 'let':
                case 'component':
                case 'hook':
                case 'type': {
                  let t = e.findAncestor(e => !j(e));
                  if (t !== r && 'ExpressionStatement' === t.type) return !0;
                }
              }
            return !1;
          })(t);
        if (
          'ObjectExpression' === u.type ||
          'FunctionExpression' === u.type ||
          'ClassExpression' === u.type ||
          'DoExpression' === u.type
        ) {
          let e = t.findAncestor(
            e => 'ExpressionStatement' === e.type
          )?.expression;
          if (e && tO(e, e => e === u)) return !0;
        }
        if ('ObjectExpression' === u.type) {
          let e = t.findAncestor(
            e => 'ArrowFunctionExpression' === e.type
          )?.body;
          if (
            e &&
            'SequenceExpression' !== e.type &&
            'AssignmentExpression' !== e.type &&
            tO(e, e => e === u)
          )
            return !0;
        }
        let i = (function (e, t, n) {
          let { node: r, key: u, parent: a } = e;
          switch (a.type) {
            case 'ReturnStatement':
            case 'ThrowStatement':
              if (
                (function (e, t) {
                  let { key: n, parent: r } = e;
                  if (!('argument' === n && _(r))) return !1;
                  let { node: u } = e;
                  return !!(
                    ('SequenceExpression' === u.type ||
                      'AssignmentExpression' === u.type) &&
                    tQ(u, t)
                  );
                })(e, t)
              )
                return !1;
              break;
            case 'ParenthesizedExpression':
              return !1;
            case 'ClassDeclaration':
            case 'ClassExpression':
              if ('superClass' === u) {
                let e = tY(r);
                if (
                  'ArrowFunctionExpression' === e.type ||
                  'AssignmentExpression' === e.type ||
                  'AwaitExpression' === e.type ||
                  'BinaryExpression' === e.type ||
                  'ConditionalExpression' === e.type ||
                  'LogicalExpression' === e.type ||
                  'NewExpression' === e.type ||
                  'ObjectExpression' === e.type ||
                  'SequenceExpression' === e.type ||
                  'TaggedTemplateExpression' === e.type ||
                  'UnaryExpression' === e.type ||
                  'UpdateExpression' === e.type ||
                  'YieldExpression' === e.type ||
                  ('ClassExpression' === e.type && s(e.decorators))
                )
                  return !0;
              }
              break;
            case 'ExportDefaultDeclaration':
              if (
                (function e(t, n, r) {
                  let { node: u, parent: a } = t;
                  return 'FunctionExpression' === u.type ||
                    'ClassExpression' === u.type
                    ? 'ExportDefaultDeclaration' === a.type || !r(t, n)
                    : !(
                        !tV(u) ||
                        ('ExportDefaultDeclaration' !== a.type && r(t, n))
                      ) && t.call(() => e(t, n, r), ...tK(u));
                })(e, t, n)
              )
                return !0;
              break;
            case 'Decorator':
              var o;
              if (
                'expression' === u &&
                ('ChainExpression' === (o = r).type && (o = o.expression),
                !(tZ(o) || (Q(o) && !o.optional && tZ(o.callee))))
              )
                return !0;
              break;
            case 'TypeAnnotation':
              if (
                e.match(
                  void 0,
                  void 0,
                  (e, t) =>
                    'returnType' === t && 'ArrowFunctionExpression' === e.type
                ) &&
                !(
                  'NullableTypeAnnotation' === r.type &&
                  e.call(() => n(e, t), 'typeAnnotation')
                ) &&
                tG(
                  r,
                  e =>
                    'ObjectTypeAnnotation' === e.type &&
                    tG(e, e => 'FunctionTypeAnnotation' === e.type)
                )
              )
                return !0;
              break;
            case 'VariableDeclarator':
              if (
                'init' === u &&
                e.match(
                  void 0,
                  void 0,
                  (e, t) =>
                    'declarations' === t && 'VariableDeclaration' === e.type,
                  (e, t) => 'left' === t && 'ForInStatement' === e.type
                )
              )
                return !0;
              break;
            case 'TSInstantiationExpression':
              if (
                'expression' === u &&
                ('AwaitExpression' === r.type || 'YieldExpression' === r.type)
              )
                return !0;
          }
        })(t, n, e);
        if ('boolean' == typeof i) return i;
        switch (u.type) {
          case 'UpdateExpression':
            if ('UnaryExpression' === o.type)
              return (
                u.prefix &&
                (('++' === u.operator && '+' === o.operator) ||
                  ('--' === u.operator && '-' === o.operator))
              );
          case 'UnaryExpression':
            switch (o.type) {
              case 'UnaryExpression':
                return (
                  u.operator === o.operator &&
                  ('+' === u.operator || '-' === u.operator)
                );
              case 'BindExpression':
              case 'TaggedTemplateExpression':
              case 'TSNonNullExpression':
                return !0;
              case 'MemberExpression':
              case 'OptionalMemberExpression':
                return 'object' === a;
              case 'NewExpression':
              case 'CallExpression':
              case 'OptionalCallExpression':
                return 'callee' === a;
              case 'BinaryExpression':
                return (
                  ('left' === a &&
                    'UnaryExpression' === u.type &&
                    ('in' === o.operator || 'instanceof' === o.operator)) ||
                  ('left' === a && '**' === o.operator)
                );
              default:
                return !1;
            }
          case 'BinaryExpression':
            if (
              'UpdateExpression' === o.type ||
              ('in' === u.operator &&
                (function (e) {
                  let t = 0,
                    { node: n } = e;
                  for (; n;) {
                    let r = e.getParentNode(t++);
                    if (r?.type === 'ForStatement' && r.init === n) return !0;
                    n = r;
                  }
                  return !1;
                })(t))
            )
              return !0;
            if ('|>' === u.operator && u.extra?.parenthesized) {
              let e = t.grandparent;
              if ('BinaryExpression' === e.type && '|>' === e.operator)
                return !0;
            }
          case 'TSTypeAssertion':
          case 'TSAsExpression':
          case 'TSSatisfiesExpression':
          case 'AsExpression':
          case 'AsConstExpression':
          case 'SatisfiesExpression':
          case 'LogicalExpression':
            switch (o.type) {
              case 'TSAsExpression':
              case 'TSSatisfiesExpression':
              case 'AsExpression':
              case 'AsConstExpression':
              case 'SatisfiesExpression':
                return !j(u);
              case 'ConditionalExpression':
                return (
                  j(u) ||
                  ('LogicalExpression' === u.type && '??' === u.operator)
                );
              case 'CallExpression':
              case 'NewExpression':
              case 'OptionalCallExpression':
                return 'callee' === a;
              case 'ClassExpression':
              case 'ClassDeclaration':
                return 'superClass' === a;
              case 'TSTypeAssertion':
              case 'TaggedTemplateExpression':
              case 'JSXSpreadAttribute':
              case 'SpreadElement':
              case 'BindExpression':
              case 'AwaitExpression':
              case 'TSNonNullExpression':
              case 'UpdateExpression':
                return !0;
              case 'UnaryExpression':
                if (!tb(u)) return !0;
                break;
              case 'MemberExpression':
              case 'OptionalMemberExpression':
                return 'object' === a;
              case 'AssignmentExpression':
              case 'AssignmentPattern':
                return 'left' === a && ('TSTypeAssertion' === u.type || j(u));
              case 'LogicalExpression':
                if ('LogicalExpression' === u.type)
                  return o.operator !== u.operator;
              case 'BinaryExpression': {
                let { operator: e, type: t } = u;
                if (!e && 'TSTypeAssertion' !== t) return !0;
                let n = tI(e),
                  i = o.operator,
                  s = tI(i);
                return !!(
                  s > n ||
                  ('right' === a && s === n) ||
                  (s === n && !tL(i, e)) ||
                  (s < n && '%' === e && ('+' === i || '-' === i)) ||
                  tj[(r = i)] ||
                  '|' === r ||
                  '^' === r ||
                  '&' === r
                );
              }
              default:
                return !1;
            }
            break;
          case 'SequenceExpression':
            return 'ForStatement' !== o.type;
          case 'YieldExpression':
            if ('AwaitExpression' === o.type || 'TSTypeAssertion' === o.type)
              return !0;
          case 'AwaitExpression':
            switch (o.type) {
              case 'TaggedTemplateExpression':
              case 'UnaryExpression':
              case 'LogicalExpression':
              case 'SpreadElement':
              case 'TSAsExpression':
              case 'TSSatisfiesExpression':
              case 'TSNonNullExpression':
              case 'AsExpression':
              case 'AsConstExpression':
              case 'SatisfiesExpression':
              case 'BindExpression':
                return !0;
              case 'MemberExpression':
              case 'OptionalMemberExpression':
                return 'object' === a;
              case 'NewExpression':
              case 'CallExpression':
              case 'OptionalCallExpression':
                return 'callee' === a;
              case 'ConditionalExpression':
                return 'test' === a;
              case 'BinaryExpression':
                return !(!u.argument && '|>' === o.operator);
              default:
                return !1;
            }
          case 'TSFunctionType':
            if (
              t.match(
                e => 'TSFunctionType' === e.type,
                (e, t) =>
                  'typeAnnotation' === t && 'TSTypeAnnotation' === e.type,
                (e, t) =>
                  'returnType' === t && 'ArrowFunctionExpression' === e.type
              )
            )
              return !0;
          case 'TSConditionalType':
          case 'TSConstructorType':
          case 'ConditionalTypeAnnotation':
            if (
              ('extendsType' === a && R(u) && o.type === u.type) ||
              ('constraint' === a &&
                'TSConditionalType' === u.type &&
                'TSTypeParameter' === o.type) ||
              ('typeAnnotation' === a &&
                'ConditionalTypeAnnotation' === u.type &&
                'TypeAnnotation' === o.type &&
                'TypeParameter' === t.grandparent.type &&
                t.grandparent.bound === o &&
                t.grandparent.usesExtendsBound) ||
              ('checkType' === a && R(o))
            )
              return !0;
            if ('extendsType' === a && 'TSConditionalType' === o.type) {
              let { typeAnnotation: e } = u.returnType || u.typeAnnotation;
              if (
                ('TSTypePredicate' === e.type &&
                  e.typeAnnotation &&
                  (e = e.typeAnnotation.typeAnnotation),
                'TSInferType' === e.type && e.typeParameter.constraint)
              )
                return !0;
            }
          case 'TSUnionType':
          case 'TSIntersectionType':
            if (O(o) || J(o)) return !0;
          case 'TSInferType':
            if ('TSInferType' === u.type) {
              if ('TSRestType' === o.type) return !1;
              if (
                'types' === a &&
                ('TSUnionType' === o.type || 'TSIntersectionType' === o.type) &&
                'TSTypeParameter' === u.typeParameter.type &&
                u.typeParameter.constraint
              )
                return !0;
            }
          case 'TSTypeOperator':
            return (
              'TSArrayType' === o.type ||
              'TSOptionalType' === o.type ||
              'TSRestType' === o.type ||
              ('objectType' === a && 'TSIndexedAccessType' === o.type) ||
              'TSTypeOperator' === o.type ||
              ('TSTypeAnnotation' === o.type &&
                t.grandparent.type.startsWith('TSJSDoc'))
            );
          case 'TSTypeQuery':
            return (
              ('objectType' === a && 'TSIndexedAccessType' === o.type) ||
              ('elementType' === a && 'TSArrayType' === o.type)
            );
          case 'TypeOperator':
            return (
              'ArrayTypeAnnotation' === o.type ||
              'NullableTypeAnnotation' === o.type ||
              ('objectType' === a &&
                ('IndexedAccessType' === o.type ||
                  'OptionalIndexedAccessType' === o.type)) ||
              'TypeOperator' === o.type
            );
          case 'TypeofTypeAnnotation':
          case 'KeyofTypeAnnotation':
            return (
              ('objectType' === a &&
                ('IndexedAccessType' === o.type ||
                  'OptionalIndexedAccessType' === o.type)) ||
              ('elementType' === a && 'ArrayTypeAnnotation' === o.type)
            );
          case 'ArrayTypeAnnotation':
            return 'NullableTypeAnnotation' === o.type;
          case 'IntersectionTypeAnnotation':
          case 'UnionTypeAnnotation':
            return (
              'TypeOperator' === o.type ||
              'KeyofTypeAnnotation' === o.type ||
              'ArrayTypeAnnotation' === o.type ||
              'NullableTypeAnnotation' === o.type ||
              'IntersectionTypeAnnotation' === o.type ||
              'UnionTypeAnnotation' === o.type ||
              ('objectType' === a &&
                ('IndexedAccessType' === o.type ||
                  'OptionalIndexedAccessType' === o.type))
            );
          case 'InferTypeAnnotation':
          case 'NullableTypeAnnotation':
            if (
              'ArrayTypeAnnotation' === o.type ||
              ('objectType' === a &&
                ('IndexedAccessType' === o.type ||
                  'OptionalIndexedAccessType' === o.type))
            )
              return !0;
            break;
          case 'ComponentTypeAnnotation':
          case 'FunctionTypeAnnotation': {
            if (
              'ComponentTypeAnnotation' === u.type &&
              (null === u.rendersType || void 0 === u.rendersType)
            )
              return !1;
            if (
              t.match(
                void 0,
                (e, t) => 'typeAnnotation' === t && 'TypeAnnotation' === e.type,
                (e, t) =>
                  'returnType' === t && 'ArrowFunctionExpression' === e.type
              ) ||
              t.match(
                void 0,
                (e, t) =>
                  'typeAnnotation' === t && 'NullableTypeAnnotation' === e.type,
                (e, t) => 'typeAnnotation' === t && 'TypeAnnotation' === e.type,
                (e, t) =>
                  'returnType' === t && 'ArrowFunctionExpression' === e.type
              ) ||
              t.match(
                void 0,
                (e, t) => 'typeAnnotation' === t && 'TypePredicate' === e.type,
                (e, t) => 'typeAnnotation' === t && 'TypeAnnotation' === e.type,
                (e, t) =>
                  'returnType' === t && 'ArrowFunctionExpression' === e.type
              )
            )
              return !0;
            let e = 'NullableTypeAnnotation' === o.type ? t.grandparent : o;
            return (
              'UnionTypeAnnotation' === e.type ||
              'IntersectionTypeAnnotation' === e.type ||
              'ArrayTypeAnnotation' === e.type ||
              ('objectType' === a &&
                ('IndexedAccessType' === e.type ||
                  'OptionalIndexedAccessType' === e.type)) ||
              ('checkType' === a && 'ConditionalTypeAnnotation' === o.type) ||
              ('extendsType' === a &&
                'ConditionalTypeAnnotation' === o.type &&
                u.returnType?.type === 'InferTypeAnnotation' &&
                u.returnType.typeParameter.bound) ||
              'NullableTypeAnnotation' === e.type ||
              ('FunctionTypeParam' === o.type &&
                null === o.name &&
                F(u).some(
                  e => e.typeAnnotation?.type === 'NullableTypeAnnotation'
                ))
            );
          }
          case 'OptionalIndexedAccessType':
            return 'objectType' === a && 'IndexedAccessType' === o.type;
          case 'StringLiteral':
          case 'NumericLiteral':
          case 'Literal':
            if (
              'string' == typeof u.value &&
              'ExpressionStatement' === o.type &&
              'string' != typeof o.directive
            ) {
              let e = t.grandparent;
              return 'Program' === e.type || 'BlockStatement' === e.type;
            }
            return 'object' === a && Y(o) && I(u);
          case 'AssignmentExpression':
            return !(
              (('init' === a || 'update' === a) && 'ForStatement' === o.type) ||
              ('expression' === a &&
                'ObjectPattern' !== u.left.type &&
                'ExpressionStatement' === o.type) ||
              ('key' === a && 'TSPropertySignature' === o.type) ||
              'AssignmentExpression' === o.type ||
              ('expressions' === a &&
                'SequenceExpression' === o.type &&
                t.match(
                  void 0,
                  void 0,
                  (e, t) =>
                    ('init' === t || 'update' === t) &&
                    'ForStatement' === e.type
                )) ||
              ('value' === a &&
                'Property' === o.type &&
                t.match(
                  void 0,
                  void 0,
                  (e, t) => 'properties' === t && 'ObjectPattern' === e.type
                )) ||
              'NGChainedExpression' === o.type ||
              ('node' === a && 'JsExpressionRoot' === o.type)
            );
          case 'ConditionalExpression':
            switch (o.type) {
              case 'TaggedTemplateExpression':
              case 'UnaryExpression':
              case 'SpreadElement':
              case 'BinaryExpression':
              case 'LogicalExpression':
              case 'NGPipeExpression':
              case 'AwaitExpression':
              case 'JSXSpreadAttribute':
              case 'TSTypeAssertion':
              case 'TypeCastExpression':
              case 'TSAsExpression':
              case 'TSSatisfiesExpression':
              case 'AsExpression':
              case 'AsConstExpression':
              case 'SatisfiesExpression':
              case 'TSNonNullExpression':
                return !0;
              case 'NewExpression':
              case 'CallExpression':
              case 'OptionalCallExpression':
                return 'callee' === a;
              case 'ConditionalExpression':
                return !n.experimentalTernaries && 'test' === a;
              case 'MemberExpression':
              case 'OptionalMemberExpression':
                return 'object' === a;
              default:
                return !1;
            }
          case 'FunctionExpression':
            switch (o.type) {
              case 'NewExpression':
              case 'CallExpression':
              case 'OptionalCallExpression':
                return 'callee' === a;
              case 'TaggedTemplateExpression':
                return !0;
              case 'ExportDefaultDeclaration':
                return 'declaration' === a;
              default:
                return !1;
            }
          case 'ArrowFunctionExpression':
            switch (o.type) {
              case 'BinaryExpression':
                return '|>' !== o.operator || u.extra?.parenthesized;
              case 'NewExpression':
              case 'CallExpression':
              case 'OptionalCallExpression':
                return 'callee' === a;
              case 'MemberExpression':
              case 'OptionalMemberExpression':
                return 'object' === a;
              case 'TSAsExpression':
              case 'TSSatisfiesExpression':
              case 'AsExpression':
              case 'AsConstExpression':
              case 'SatisfiesExpression':
              case 'TSNonNullExpression':
              case 'BindExpression':
              case 'TaggedTemplateExpression':
              case 'UnaryExpression':
              case 'LogicalExpression':
              case 'AwaitExpression':
              case 'TSTypeAssertion':
              case 'MatchExpressionCase':
                return !0;
              case 'TSInstantiationExpression':
                return 'expression' === a;
              case 'ConditionalExpression':
                return 'test' === a;
              default:
                return !1;
            }
          case 'ClassExpression':
            switch (o.type) {
              case 'NewExpression':
                return 'callee' === a;
              case 'ExportDefaultDeclaration':
                return 'declaration' === a;
              default:
                return !1;
            }
          case 'OptionalMemberExpression':
          case 'OptionalCallExpression':
          case 'ChainExpression':
          case 'TSNonNullExpression':
            if (
              ('ChainExpression' === t.node.type ||
                (function (e) {
                  let { node: t } = e,
                    n = t;
                  for (; 'TSNonNullExpression' === n.type;)
                    if (tJ((n = n.expression))) return !1;
                  return (
                    !!tq(n) &&
                    (!!tJ(t) ||
                      'expression' !== e.key ||
                      'TSNonNullExpression' !== e.parent.type)
                  );
                })(t)) &&
              (function (e) {
                let { key: t, parent: n } = e;
                return (
                  ('expression' === t && 'TSNonNullExpression' === n.type) ||
                  ('object' === t &&
                    'MemberExpression' === n.type &&
                    !n.optional) ||
                  ('callee' === t &&
                    'CallExpression' === n.type &&
                    !n.optional) ||
                  ('callee' === t && 'NewExpression' === n.type) ||
                  ('tag' === t && 'TaggedTemplateExpression' === n.type)
                );
              })(t)
            )
              return !0;
          case 'CallExpression':
          case 'MemberExpression':
          case 'TaggedTemplateExpression':
          case 'ImportExpression':
            if (
              'callee' === a &&
              ('BindExpression' === o.type || 'NewExpression' === o.type)
            ) {
              let e = u;
              for (; e;)
                switch (e.type) {
                  case 'CallExpression':
                  case 'ImportExpression':
                    return !0;
                  case 'MemberExpression':
                  case 'OptionalMemberExpression':
                  case 'BindExpression':
                    e = e.object;
                    break;
                  case 'TaggedTemplateExpression':
                    e = e.tag;
                    break;
                  case 'TSNonNullExpression':
                    e = e.expression;
                    break;
                  default:
                    return !1;
                }
            }
            break;
          case 'BindExpression':
            return (
              ('callee' === a &&
                ('BindExpression' === o.type || 'NewExpression' === o.type)) ||
              ('object' === a && Y(o))
            );
          case 'NGPipeExpression':
            return !(
              'NGRoot' === o.type ||
              'NGMicrosyntaxExpression' === o.type ||
              ('ObjectProperty' === o.type && !u.extra?.parenthesized) ||
              $(o) ||
              ('arguments' === a && Q(o)) ||
              ('right' === a && 'NGPipeExpression' === o.type) ||
              ('property' === a && 'MemberExpression' === o.type) ||
              'AssignmentExpression' === o.type
            );
          case 'JSXFragment':
          case 'JSXElement':
            return (
              'callee' === a ||
              ('left' === a &&
                'BinaryExpression' === o.type &&
                '<' === o.operator) ||
              (!$(o) &&
                'ArrowFunctionExpression' !== o.type &&
                'AssignmentExpression' !== o.type &&
                'AssignmentPattern' !== o.type &&
                'BinaryExpression' !== o.type &&
                'ConditionalExpression' !== o.type &&
                'ExpressionStatement' !== o.type &&
                'JsExpressionRoot' !== o.type &&
                'JSXAttribute' !== o.type &&
                'JSXElement' !== o.type &&
                'JSXExpressionContainer' !== o.type &&
                'JSXFragment' !== o.type &&
                'LogicalExpression' !== o.type &&
                !Z(o) &&
                !eL(o) &&
                !_(o) &&
                'TypeCastExpression' !== o.type &&
                'VariableDeclarator' !== o.type &&
                'YieldExpression' !== o.type &&
                'MatchExpressionCase' !== o.type &&
                ('declaration' !== a || 'ExportDefaultDeclaration' !== o.type))
            );
          case 'TSInstantiationExpression':
            return 'object' === a && Y(o);
          case 'MatchOrPattern':
            return 'MatchAsPattern' === o.type;
        }
        return !1;
      },
      t2 = 'string',
      t8 = 'array',
      t3 = 'cursor',
      t6 = 'indent',
      t7 = 'align',
      t9 = 'trim',
      t4 = 'group',
      t5 = 'fill',
      ne = 'if-break',
      nt = 'indent-if-break',
      nn = 'line-suffix',
      nr = 'line-suffix-boundary',
      nu = 'line',
      na = 'label',
      no = 'break-parent',
      ni = new Set([t3, t6, t7, t9, t4, t5, ne, nt, nn, nr, nu, na, no]),
      ns = function (e) {
        if ('string' == typeof e) return t2;
        if (Array.isArray(e)) return t8;
        if (!e) return;
        let { type: t } = e;
        if (ni.has(t)) return t;
      },
      np = class extends Error {
        name = 'InvalidDocError';
        constructor(e) {
          (super(
            (function (e) {
              let t,
                n = null === e ? 'null' : typeof e;
              if ('string' !== n && 'object' !== n)
                return `Unexpected doc '${n}', 
Expected it to be 'string' or 'object'.`;
              if (ns(e)) throw Error('doc is valid.');
              let r = Object.prototype.toString.call(e);
              if ('[object Object]' !== r) return `Unexpected doc '${r}'.`;
              let u =
                ((t = [...ni].map(e => `'${e}'`)),
                new Intl.ListFormat('en-US', { type: 'disjunction' }).format(
                  t
                ));
              return `Unexpected doc.type '${e.type}'.
Expected it to be ${u}.`;
            })(e)
          ),
            (this.doc = e));
        }
      },
      nl = {},
      nc = function (e, t, n, r) {
        let u = [e];
        for (; u.length > 0;) {
          let e = u.pop();
          if (e === nl) {
            n(u.pop());
            continue;
          }
          n && u.push(e, nl);
          let a = ns(e);
          if (!a) throw new np(e);
          if (t?.(e) !== !1)
            switch (a) {
              case t8:
              case t5: {
                let t = a === t8 ? e : e.parts;
                for (let e = t.length, n = e - 1; n >= 0; --n) u.push(t[n]);
                break;
              }
              case ne:
                u.push(e.flatContents, e.breakContents);
                break;
              case t4:
                if (r && e.expandedStates)
                  for (let t = e.expandedStates.length, n = t - 1; n >= 0; --n)
                    u.push(e.expandedStates[n]);
                else u.push(e.contents);
                break;
              case t7:
              case t6:
              case nt:
              case na:
              case nn:
                u.push(e.contents);
                break;
              case t2:
              case t3:
              case t9:
              case nr:
              case nu:
              case no:
                break;
              default:
                throw new np(e);
            }
        }
      };
    function nD(e, t) {
      if ('string' == typeof e) return t(e);
      let n = new Map();
      return r(e);
      function r(e) {
        return d(n, e, u);
      }
      function u(e) {
        switch (ns(e)) {
          case t8:
            return t(e.map(r));
          case t5:
            return t({ ...e, parts: e.parts.map(r) });
          case ne:
            return t({
              ...e,
              breakContents: r(e.breakContents),
              flatContents: r(e.flatContents)
            });
          case t4: {
            let { expandedStates: n, contents: u } = e;
            return (
              (u = n ? (n = n.map(r))[0] : r(u)),
              t({ ...e, contents: u, expandedStates: n })
            );
          }
          case t7:
          case t6:
          case nt:
          case na:
          case nn:
            return t({ ...e, contents: r(e.contents) });
          case t2:
          case t3:
          case t9:
          case nr:
          case nu:
          case no:
            return t(e);
          default:
            throw new np(e);
        }
      }
    }
    function ny(e, t, n) {
      let r = n,
        u = !1;
      return (
        nc(e, function (e) {
          if (u) return !1;
          let n = t(e);
          void 0 !== n && ((u = !0), (r = n));
        }),
        r
      );
    }
    function nd(e) {
      if (
        (e.type === t4 && e.break) ||
        (e.type === nu && e.hard) ||
        e.type === no
      )
        return !0;
    }
    function nm(e) {
      return ny(e, nd, !1);
    }
    function nf(e) {
      if (e.length > 0) {
        let t = y(0, e, -1);
        t.expandedStates || t.break || (t.break = 'propagated');
      }
      return null;
    }
    function nF(e) {
      return e.type !== nu || e.hard
        ? e.type === ne
          ? e.flatContents
          : e
        : e.soft
          ? ''
          : ' ';
    }
    function nE(e) {
      return nD(e, e =>
        (function (e) {
          switch (ns(e)) {
            case t5: {
              let { parts: t } = e;
              if (t.every(e => '' === e)) return '';
              if (1 === t.length) return t[0];
              break;
            }
            case t4:
              if (!e.contents && !e.id && !e.break && !e.expandedStates)
                return '';
              if (
                e.contents.type === t4 &&
                e.contents.id === e.id &&
                e.contents.break === e.break &&
                e.contents.expandedStates === e.expandedStates
              )
                return e.contents;
              break;
            case t7:
            case t6:
            case nt:
            case nn:
              if (!e.contents) return '';
              break;
            case ne:
              if (!e.flatContents && !e.breakContents) return '';
              break;
            case t8: {
              let t = [];
              for (let n of e) {
                if (!n) continue;
                let [e, ...r] = Array.isArray(n) ? n : [n];
                ('string' == typeof e && 'string' == typeof y(0, t, -1)
                  ? (t[t.length - 1] += e)
                  : t.push(e),
                  t.push(...r));
              }
              return 0 === t.length ? '' : 1 === t.length ? t[0] : t;
            }
            case t2:
            case t3:
            case t9:
            case nr:
            case nu:
            case na:
            case no:
              break;
            default:
              throw new np(e);
          }
          return e;
        })(e)
      );
    }
    function nA(e, t = nO) {
      return nD(e, e =>
        'string' == typeof e
          ? nw(
              t,
              e.split(`
`)
            )
          : e
      );
    }
    function nC(e) {
      if (e.type === nu) return !0;
    }
    function nx(e, t) {
      return e.type === na ? { ...e, contents: t(e.contents) } : t(e);
    }
    function ng(e) {
      return (p(), { type: t6, contents: e });
    }
    function nh(e, t) {
      return (p(), p(), { type: t7, contents: t, n: e });
    }
    var nT = { type: no },
      nS = { type: t3 };
    function nB(e) {
      return (p(), { type: t5, parts: e });
    }
    function nb(e, t = {}) {
      return (
        p(),
        p(t.expandedStates),
        {
          type: t4,
          id: t.id,
          contents: e,
          break: !!t.shouldBreak,
          expandedStates: t.expandedStates
        }
      );
    }
    function nv(e, t) {
      return nb(e[0], { ...t, expandedStates: e });
    }
    function nP(e, t = '', n = {}) {
      return (
        p(),
        '' !== t && p(),
        { type: ne, breakContents: e, flatContents: t, groupId: n.groupId }
      );
    }
    function nk(e, t) {
      return (
        p(),
        { type: nt, contents: e, groupId: t.groupId, negate: t.negate }
      );
    }
    function nw(e, t) {
      (p(), p());
      let n = [];
      for (let r = 0; r < t.length; r++) (0 !== r && n.push(e), n.push(t[r]));
      return n;
    }
    function nI(e, t) {
      return (p(), e ? { type: na, label: e, contents: t } : t);
    }
    var nN = { type: nu },
      nM = { type: nu, soft: !0 },
      nj = { type: nu, hard: !0 },
      nL = [nj, nT],
      nO = [{ type: nu, hard: !0, literal: !0 }, nT];
    function nJ(e) {
      return (p(), { type: nn, contents: e });
    }
    var nq = { type: nr },
      nR = `\r
`,
      nX = `
`,
      n_ = [12288, 12288, 65281, 65376, 65504, 65510],
      nW = [
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
      n$ = (e, t) => {
        let n = 0,
          r = Math.floor(e.length / 2) - 1;
        for (; n <= r;) {
          let u = Math.floor((n + r) / 2),
            a = 2 * u;
          if (t < e[a]) r = u - 1;
          else {
            if (!(t > e[a + 1])) return !0;
            n = u + 1;
          }
        }
        return !1;
      },
      [nU, nG] = (function (e) {
        let t = e[0],
          n = e[1];
        for (let r = 0; r < e.length; r += 2) {
          let u = e[r],
            a = e[r + 1];
          if (19968 >= u && 19968 <= a) return [u, a];
          a - u > n - t && ((t = u), (n = a));
        }
        return [t, n];
      })(nW),
      nV = e => !(e < 12288) && !(e > 65510) && n$(n_, e),
      nK = e =>
        (e >= nU && e <= nG) || (!(e < 4352) && !(e > 262141) && n$(nW, e)),
      nH =
        /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05-\u2B07]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF3\uDFF5\uDFF7]|\uD83D[\uDC3F\uDC41\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])$/,
      nz = /[^\x20-\x7F]/,
      nQ = function (e) {
        if (!e) return 0;
        if (!nz.test(e)) return e.length;
        let t = 0;
        for (let n of (e = e.replace(
          /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g,
          e => ((t += nH.test(e) ? 1 : 2), '')
        ))) {
          let e = n.codePointAt(0);
          e <= 31 ||
            (e >= 127 && e <= 159) ||
            (e >= 768 && e <= 879) ||
            (e >= 65024 && e <= 65039) ||
            (t += nV(e) || nK(e) ? 2 : 1);
        }
        return t;
      },
      nY = { type: 0 },
      nZ = { type: 1 },
      n0 = {
        value: '',
        length: 0,
        queue: [],
        get root() {
          return n0;
        }
      };
    function n1(e, t, n) {
      let r = 1 === t.type ? e.queue.slice(0, -1) : [...e.queue, t],
        u = '',
        a = 0,
        o = 0,
        i = 0;
      for (let e of r)
        switch (e.type) {
          case 0:
            (l(), n.useTabs ? s(1) : p(n.tabWidth));
            break;
          case 3: {
            let { string: t } = e;
            (l(), (u += t), (a += t.length));
            break;
          }
          case 2: {
            let { width: t } = e;
            ((o += 1), (i += t));
            break;
          }
          default:
            throw Error(`Unexpected indent comment '${e.type}'.`);
        }
      return (c(), { ...e, value: u, length: a, queue: r });
      function s(e) {
        ((u += '	'.repeat(e)), (a += n.tabWidth * e));
      }
      function p(e) {
        ((u += ' '.repeat(e)), (a += e));
      }
      function l() {
        n.useTabs ? (o > 0 && s(o), (o = 0), (i = 0)) : c();
      }
      function c() {
        (i > 0 && p(i), (o = 0), (i = 0));
      }
    }
    function n2(e) {
      let t = (function (e) {
        let t = 0;
        for (let n = e.length - 1; n >= 0; n--) {
          let r = e[n];
          if (' ' === r || '	' === r) t++;
          else break;
        }
        return t;
      })(e);
      return { text: 0 === t ? e : e.slice(0, e.length - t), count: t };
    }
    var n8 = class {
        #e = [];
        #t = '';
        #n = 0;
        #r = [];
        #u = [];
        #a() {
          let e = this.#t;
          for (let t of ('' !== e &&
            (this.#e.push(e), (this.#n += e.length), (this.#t = '')),
          this.#u))
            this.#r.push(Math.min(t, this.#n));
          this.#u.length = 0;
        }
        markPosition() {
          if (this.#r.length + this.#u.length >= 2)
            throw Error("There are too many 'cursor' in doc.");
          this.#u.push(this.#n + this.#t.length);
        }
        write(e) {
          this.#t += e;
        }
        trim() {
          let { text: e, count: t } = n2(this.#t);
          return ((this.#t = e), this.#a(), t);
        }
        finish() {
          return (this.#a(), { text: this.#e.join(''), positions: this.#r });
        }
      },
      n3 = Symbol('MODE_BREAK'),
      n6 = Symbol('MODE_FLAT'),
      n7 = Symbol('DOC_FILL_PRINTED_LENGTH');
    function n9(e, t, n, r, u, a) {
      if (1 / 0 === n) return !0;
      let o = t.length,
        i = !1,
        s = [e],
        p = '';
      for (; n >= 0;) {
        if (0 === s.length) {
          if (0 === o) return !0;
          s.push(t[--o]);
          continue;
        }
        let { mode: e, doc: l } = s.pop(),
          c = ns(l);
        switch (c) {
          case t2:
            l &&
              (i && ((p += ' '), (n -= 1), (i = !1)), (p += l), (n -= nQ(l)));
            break;
          case t8:
          case t5: {
            let t = c === t8 ? l : l.parts,
              n = l[n7] ?? 0;
            for (let r = t.length - 1; r >= n; r--)
              s.push({ mode: e, doc: t[r] });
            break;
          }
          case t6:
          case t7:
          case nt:
          case na:
            s.push({ mode: e, doc: l.contents });
            break;
          case t9: {
            let { text: e, count: t } = n2(p);
            ((p = e), (n += t));
            break;
          }
          case t4: {
            if (a && l.break) return !1;
            let t = l.break ? n3 : e,
              n =
                l.expandedStates && t === n3
                  ? y(0, l.expandedStates, -1)
                  : l.contents;
            s.push({ mode: t, doc: n });
            break;
          }
          case ne: {
            let t =
              (l.groupId ? u[l.groupId] || n6 : e) === n3
                ? l.breakContents
                : l.flatContents;
            t && s.push({ mode: e, doc: t });
            break;
          }
          case nu:
            if (e === n3 || l.hard) return !0;
            l.soft || (i = !0);
            break;
          case nn:
            r = !0;
            break;
          case nr:
            if (r) return !1;
        }
      }
      return !1;
    }
    function n4(e, t) {
      var n;
      let r,
        u,
        a = Object.create(null),
        o = t.printWidth,
        i = 'cr' === (n = t.endOfLine) ? '\r' : 'crlf' === n ? nR : nX,
        s = 0,
        p = [{ indent: n0, mode: n3, doc: e }],
        l = !1,
        c = [],
        D = new n8();
      for (
        r = new Set(),
          u = [],
          nc(
            e,
            function (e) {
              if ((e.type === no && nf(u), e.type === t4)) {
                if ((u.push(e), r.has(e))) return !1;
                r.add(e);
              }
            },
            function (e) {
              e.type === t4 && u.pop().break && nf(u);
            },
            !0
          );
        p.length > 0;
      ) {
        let { indent: e, mode: n, doc: r } = p.pop();
        switch (ns(r)) {
          case t2: {
            let e =
              i !==
              `
`
                ? ek(
                    0,
                    r,
                    `
`,
                    i
                  )
                : r;
            e && (D.write(e), p.length > 0 && (s += nQ(e)));
            break;
          }
          case t8:
            for (let t = r.length - 1; t >= 0; t--)
              p.push({ indent: e, mode: n, doc: r[t] });
            break;
          case t3:
            D.markPosition();
            break;
          case t6:
            p.push({ indent: n1(e, nY, t), mode: n, doc: r.contents });
            break;
          case t7:
            p.push({
              indent: (function (e, t, n) {
                return t
                  ? 'root' === t.type
                    ? { ...e, root: e }
                    : -1 / 0 === t
                      ? e.root
                      : n1(
                          e,
                          'number' == typeof t
                            ? t < 0
                              ? nZ
                              : { type: 2, width: t }
                            : { type: 3, string: t },
                          n
                        )
                  : e;
              })(e, r.n, t),
              mode: n,
              doc: r.contents
            });
            break;
          case t9:
            s -= D.trim();
            break;
          case t4: {
            let t = (function () {
              if (n === n6 && !l)
                return { indent: e, mode: r.break ? n3 : n6, doc: r.contents };
              l = !1;
              let t = o - s,
                u = c.length > 0,
                i = { indent: e, mode: n6, doc: r.contents };
              if (!r.break && n9(i, p, t, u, a)) return i;
              if (!r.expandedStates)
                return { indent: e, mode: n3, doc: r.contents };
              if (!r.break)
                for (let n = 1; n < r.expandedStates.length - 1; n++) {
                  let o = { indent: e, mode: n6, doc: r.expandedStates[n] };
                  if (n9(o, p, t, u, a)) return o;
                }
              return { indent: e, mode: n3, doc: y(0, r.expandedStates, -1) };
            })();
            (p.push(t), r.id && (a[r.id] = t.mode));
            break;
          }
          case t5: {
            let t = o - s,
              u = r[n7] ?? 0,
              { parts: i } = r,
              l = i.length - u;
            if (0 === l) break;
            let D = i[u + 0],
              y = i[u + 1],
              d = { indent: e, mode: n6, doc: D },
              m = { indent: e, mode: n3, doc: D },
              f = n9(d, [], t, c.length > 0, a, !0);
            if (1 === l) {
              f ? p.push(d) : p.push(m);
              break;
            }
            let F = { indent: e, mode: n6, doc: y },
              E = { indent: e, mode: n3, doc: y };
            if (2 === l) {
              f ? p.push(F, d) : p.push(E, m);
              break;
            }
            let A = i[u + 2],
              C = { indent: e, mode: n, doc: { ...r, [n7]: u + 2 } },
              x = n9(
                { indent: e, mode: n6, doc: [D, y, A] },
                [],
                t,
                c.length > 0,
                a,
                !0
              );
            (p.push(C), x ? p.push(F, d) : f ? p.push(E, d) : p.push(E, m));
            break;
          }
          case ne:
          case nt: {
            let t = r.groupId ? a[r.groupId] : n;
            if (t === n3) {
              let t =
                r.type === ne
                  ? r.breakContents
                  : r.negate
                    ? r.contents
                    : ng(r.contents);
              t && p.push({ indent: e, mode: n, doc: t });
            }
            if (t === n6) {
              let t =
                r.type === ne
                  ? r.flatContents
                  : r.negate
                    ? ng(r.contents)
                    : r.contents;
              t && p.push({ indent: e, mode: n, doc: t });
            }
            break;
          }
          case nn:
            c.push({ indent: e, mode: n, doc: r.contents });
            break;
          case nr:
            c.length > 0 && p.push({ indent: e, mode: n, doc: nj });
            break;
          case nu:
            switch (n) {
              case n6:
                if (!r.hard) {
                  r.soft || (D.write(' '), (s += 1));
                  break;
                }
                l = !0;
              case n3:
                if (c.length > 0) {
                  (p.push({ indent: e, mode: n, doc: r }, ...c.reverse()),
                    (c.length = 0));
                  break;
                }
                r.literal
                  ? (D.write(i),
                    (s = 0),
                    e.root &&
                      (e.root.value && D.write(e.root.value),
                      (s = e.root.length)))
                  : (D.trim(), D.write(i + e.value), (s = e.length));
            }
            break;
          case na:
            p.push({ indent: e, mode: n, doc: r.contents });
            break;
          case no:
            break;
          default:
            throw new np(r);
        }
        0 === p.length &&
          c.length > 0 &&
          (p.push(...c.reverse()), (c.length = 0));
      }
      let { text: d, positions: m } = D.finish();
      if (2 !== m.length) return { formatted: d };
      let [f, F] = m;
      return {
        formatted: d,
        cursorNodeStart: f,
        cursorNodeText: d.slice(f, F)
      };
    }
    var n5 = class extends Error {
      name = 'ArgExpansionBailout';
    };
    function re(e) {
      return (
        ('ObjectTypeProperty' === e.type ||
          'ObjectTypeInternalSlot' === e.type) &&
        !e.static &&
        !e.method &&
        'get' !== e.kind &&
        'set' !== e.kind &&
        'FunctionTypeAnnotation' === e.value.type
      );
    }
    var rt = function (e, t) {
        let n = null,
          r = t;
        for (; r !== n;)
          ((n = r), (r = ey(e, r)), (r = em(e, r)), (r = eD(e, r)));
        return ((r = eE(e, r)), !1 !== (r = eF(e, r)) && ex(e, r));
      },
      rn = (e, { originalText: t }) => {
        let n = P(e);
        if (rt(t, n)) return !0;
        let r = x(e);
        return r !== n && rt(t, r);
      },
      rr = l([
        'AnyTypeAnnotation',
        'ThisTypeAnnotation',
        'NumberTypeAnnotation',
        'VoidTypeAnnotation',
        'BooleanTypeAnnotation',
        'BigIntTypeAnnotation',
        'SymbolTypeAnnotation',
        'StringTypeAnnotation',
        'NeverTypeAnnotation',
        'UndefinedTypeAnnotation',
        'UnknownTypeAnnotation',
        'EmptyTypeAnnotation',
        'MixedTypeAnnotation'
      ]),
      ru = l([
        'TSThisType',
        'NullLiteralTypeAnnotation',
        'BooleanLiteralTypeAnnotation',
        'StringLiteralTypeAnnotation',
        'BigIntLiteralTypeAnnotation',
        'NumberLiteralTypeAnnotation',
        'TSLiteralType',
        'TSTemplateLiteralType'
      ]),
      ra = function ({ type: e }) {
        return e.startsWith('TS') && e.endsWith('Keyword');
      };
    function ro(e) {
      return (
        ra(e) ||
        rr(e) ||
        ru(e) ||
        ('GenericTypeAnnotation' === e.type && !e.typeParameters) ||
        ('TSTypeReference' === e.type && !e.typeArguments)
      );
    }
    function ri(e, t) {
      return t.some(t =>
        (function (e, t) {
          let n = t.split('.');
          for (let t = n.length - 1; t >= 0; t--) {
            let r = n[t];
            if (0 === t) return 'Identifier' === e.type && e.name === r;
            if (
              1 === t &&
              'MetaProperty' === e.type &&
              'Identifier' === e.property.type &&
              e.property.name === r
            ) {
              e = e.meta;
              continue;
            }
            if (
              'MemberExpression' === e.type &&
              !e.optional &&
              !e.computed &&
              'Identifier' === e.property.type &&
              e.property.name === r
            ) {
              e = e.object;
              continue;
            }
            return !1;
          }
        })(e, t)
      );
    }
    var rs = [
      'it',
      'it.only',
      'it.skip',
      'describe',
      'describe.only',
      'describe.skip',
      'test',
      'test.only',
      'test.skip',
      'test.fixme',
      'test.step',
      'test.describe',
      'test.describe.only',
      'test.describe.skip',
      'test.describe.fixme',
      'test.describe.parallel',
      'test.describe.parallel.only',
      'test.describe.serial',
      'test.describe.serial.only',
      'skip',
      'xit',
      'xdescribe',
      'xtest',
      'fit',
      'fdescribe',
      'ftest'
    ];
    function rp(e) {
      return (
        Q(e) &&
        'Identifier' === e.callee.type &&
        ['async', 'inject', 'fakeAsync', 'waitForAsync'].includes(e.callee.name)
      );
    }
    function rl(e, t) {
      var n, r;
      if (e?.type !== 'CallExpression' || e.optional) return !1;
      let u = eS(e);
      if (1 === u.length) {
        if (rp(e) && rl(t)) return K(u[0]);
        if (
          'Identifier' === (n = e.callee).type &&
          ('beforeEach' === n.name ||
            'beforeAll' === n.name ||
            'afterEach' === n.name ||
            'afterAll' === n.name)
        )
          return rp(u[0]);
      } else if (
        (2 === u.length || 3 === u.length) &&
        ('TemplateLiteral' === u[0].type || M(u[0])) &&
        ri(e.callee, rs)
      )
        return (
          (!u[2] || !!I(u[2])) &&
          ((2 === u.length
            ? K(u[1])
            : ('FunctionExpression' === (r = u[1]).type ||
                ('ArrowFunctionExpression' === r.type &&
                  'BlockStatement' === r.body.type)) &&
              F(u[1]).length <= 1) ||
            rp(u[1]))
        );
      return !1;
    }
    var rc = function (e, t) {
        let n = t - 1;
        ((n = eD(e, n, { backwards: !0 })),
          (n = eF(e, n, { backwards: !0 })),
          (n = eD(e, n, { backwards: !0 })));
        let r = eF(e, n, { backwards: !0 });
        return n !== r;
      },
      rD = () => !0;
    function ry(e, t) {
      return ((e.node.printed = !0), t.printer.printComment(e, t));
    }
    function rd(e, t, n = {}) {
      let { indent: r = !1, marker: u, filter: a = rD } = n,
        o = new Set(
          e.node?.comments?.filter(
            e => !(e.leading || e.trailing || e.marker !== u || !a(e))
          )
        );
      if (0 === o.size) return '';
      let i = nw(
        nL,
        e
          .map(({ node: n }) => (o.has(n) ? ry(e, t) : ''), 'comments')
          .filter(Boolean)
      );
      return r ? ng([nL, i]) : i;
    }
    function rm(e, t, n) {
      let r = t[Symbol.for('printedComments')],
        u = n?.filter ?? rD,
        a = new Set(
          e.node?.comments?.filter(e => !r?.has(e) && e.leading && u(e))
        );
      return 0 === a.size
        ? ''
        : e
            .map(
              ({ node: n }) =>
                a.has(n)
                  ? (function (e, t) {
                      let n = e.node,
                        r = [ry(e, t)],
                        {
                          printer: u,
                          originalText: a,
                          locStart: o,
                          locEnd: i
                        } = t;
                      if (u.isBlockComment?.(n)) {
                        let e = ' ';
                        (ex(a, i(n)) &&
                          (e = ex(a, o(n), { backwards: !0 }) ? nL : nN),
                          r.push(e));
                      } else r.push(nL);
                      let s = eF(a, eD(a, i(n)));
                      return (!1 !== s && ex(a, s) && r.push(nL), r);
                    })(e, t)
                  : '',
              'comments'
            )
            .filter(Boolean);
    }
    function rf(e, t, n) {
      let r = e.node?.comments,
        u = new Set(r?.filter(e => e.trailing)),
        a = t[Symbol.for('printedComments')],
        o = n?.filter ?? rD,
        i = new Set(r?.filter(e => u.has(e) && !a?.has(e) && o(e)));
      if (0 === i.size) return '';
      let s = [],
        p;
      return (
        e.each(({ node: n }) => {
          u.has(n) &&
            ((p = (function (e, t, n) {
              let r = e.node,
                u = ry(e, t),
                { printer: a, originalText: o, locStart: i } = t,
                s = a.isBlockComment?.(r);
              return (n?.hasLineSuffix && !n?.isBlock) ||
                ex(o, i(r), { backwards: !0 })
                ? {
                    doc: nJ([nL, rc(o, i(r)) ? nL : '', u]),
                    isBlock: s,
                    hasLineSuffix: !0
                  }
                : !s || n?.hasLineSuffix
                  ? { doc: [nJ([' ', u]), nT], isBlock: s, hasLineSuffix: !0 }
                  : { doc: [' ', u], isBlock: s, hasLineSuffix: !1 };
            })(e, t, p)),
            i.has(n) && s.push(p.doc));
        }, 'comments'),
        s
      );
    }
    function rF(e, t, n) {
      return { leading: rm(e, t, n), trailing: rf(e, t, n) };
    }
    function rE(e, t, n, r) {
      let u = rm(e, n, r),
        a = rf(e, n, r);
      return u || a ? nx(t, e => [u, e, a]) : t;
    }
    function rA(e, t = 'es5') {
      return (
        ('es5' === e.trailingComma && 'es5' === t) ||
        ('all' === e.trailingComma && ('all' === t || 'es5' === t))
      );
    }
    function rC(e) {
      let { node: t } = e;
      return t.optional && ('Identifier' !== t.type || t !== e.parent.key)
        ? Q(t) || (Y(t) && t.computed) || 'OptionalIndexedAccessType' === t.type
          ? '?.'
          : '?'
        : '';
    }
    function rx(e) {
      return e.node.definite ||
        e.match(
          void 0,
          (e, t) => 'id' === t && 'VariableDeclarator' === e.type && e.definite
        )
        ? '!'
        : '';
    }
    var rg = l([
      'DeclareClass',
      'DeclareComponent',
      'DeclareFunction',
      'DeclareHook',
      'DeclareVariable',
      'DeclareExportDeclaration',
      'DeclareExportAllDeclaration',
      'DeclareOpaqueType',
      'DeclareTypeAlias',
      'DeclareEnum',
      'DeclareInterface'
    ]);
    function rh(e) {
      return (e => {
        let { node: t } = e;
        return rg(t)
          ? 'DeclareExportDeclaration' !== e.parent.type && !t.implicitDeclare
          : t.declare;
      })(e)
        ? 'declare '
        : '';
    }
    var rT = l([
      'TSAbstractMethodDefinition',
      'TSAbstractPropertyDefinition',
      'TSAbstractAccessorProperty'
    ]);
    function rS({ node: e }) {
      return e.abstract || rT(e) ? 'abstract ' : '';
    }
    function rB(e) {
      return e.accessibility ? e.accessibility + ' ' : '';
    }
    var rb = e => 'UnaryExpression' === e.type && '!' === e.operator;
    function rv(e, t, n) {
      var r;
      let { node: u } = e,
        a = 'WithStatement' === u.type ? 'object' : 'test',
        o = n(a);
      return !tb((r = u[a])) &&
        rb(r) &&
        'LogicalExpression' === (r = rb((r = r.argument)) ? r.argument : r).type
        ? o
        : nb([ng([nM, o]), nM]);
    }
    function rP(e, t, n) {
      let { node: r } = e;
      return tb(r, 8, n)
        ? [ng([nM, rd(e, t, { filter: n })]), tb(r, 40, n) ? nL : nM]
        : '';
    }
    function rk(e, t = 'es5') {
      return rA(e, t) ? nP(',') : '';
    }
    function rw(e) {
      return e.semi ? ';' : '';
    }
    var rI = e => 'commentBeforeArrow' !== e.mark;
    function rN(e, t, n, r, u) {
      let a = e.node,
        o = F(a),
        i = u && a.typeParameters ? n('typeParameters') : '';
      if (0 === o.length) return [i, '(', rP(e, t, rI), ')'];
      let { parent: p } = e,
        l = rl(p),
        c = rM(a),
        D = [];
      if (
        ((function (e, t) {
          let { node: n } = e,
            r = 0,
            u = () => t(e, r++);
          (n.this && e.call(u, 'this'),
            e.each(u, 'params'),
            n.rest && e.call(u, 'rest'));
        })(e, (e, r) => {
          let u = r === o.length - 1;
          (u && a.rest && D.push('...'),
            D.push(n()),
            u ||
              (D.push(','),
              l || c
                ? D.push(' ')
                : rn(o[r], t)
                  ? D.push(nL, nL)
                  : D.push(nN)));
        }),
        r &&
          !e.match(
            e =>
              'ArrowFunctionExpression' === e.type &&
              'BlockStatement' === e.body.type,
            (e, t) => {
              if (
                'CallExpression' === e.type &&
                'arguments' === t &&
                1 === e.arguments.length &&
                'CallExpression' === e.callee.type
              ) {
                let t = e.callee.callee;
                return (
                  'Identifier' === t.type ||
                  ('MemberExpression' === t.type &&
                    !t.computed &&
                    'Identifier' === t.object.type &&
                    'Identifier' === t.property.type)
                );
              }
              return !1;
            },
            (e, t) =>
              ('VariableDeclarator' === e.type && 'init' === t) ||
              ('ExportDefaultDeclaration' === e.type && 'declaration' === t) ||
              ('TSExportAssignment' === e.type && 'expression' === t) ||
              ('AssignmentExpression' === e.type &&
                'right' === t &&
                'MemberExpression' === e.left.type &&
                'Identifier' === e.left.object.type &&
                'module' === e.left.object.name &&
                'Identifier' === e.left.property.type &&
                'exports' === e.left.property.name),
            e =>
              'VariableDeclaration' !== e.type ||
              ('const' === e.kind && 1 === e.declarations.length)
          ))
      ) {
        if (nm(i) || nm(D)) throw new n5();
        return nb([nD(i, nF), '(', nD(D, nF), ')']);
      }
      let d = o.every(e => !s(e.decorators));
      return (c && d) || l
        ? [i, '(', ...D, ')']
        : (re(p) ||
              (('TypeAnnotation' === p.type || 'TSTypeAnnotation' === p.type) &&
                'FunctionTypeAnnotation' === p.typeAnnotation.type &&
                !p.static &&
                !k(p, p.typeAnnotation)) ||
              'TypeAlias' === p.type ||
              'UnionTypeAnnotation' === p.type ||
              'IntersectionTypeAnnotation' === p.type ||
              ('FunctionTypeAnnotation' === p.type && p.returnType === a)) &&
            1 === o.length &&
            null === o[0].name &&
            a.this !== o[0] &&
            o[0].typeAnnotation &&
            null === a.typeParameters &&
            ro(o[0].typeAnnotation) &&
            !a.rest
          ? 'always' === t.arrowParens || 'HookTypeAnnotation' === a.type
            ? ['(', ...D, ')']
            : D
          : [
              i,
              '(',
              ng([nM, ...D]),
              (function (e) {
                if (e.rest) return !0;
                let t = F(e);
                return y(0, t, -1)?.type === 'RestElement';
              })(a) || 'NGRoot' === e.root.type
                ? ''
                : rk(t, 'all'),
              nM,
              ')'
            ];
    }
    function rM(e) {
      if (!e) return !1;
      let t = F(e);
      if (1 !== t.length) return !1;
      let [n] = t;
      return (
        !tb(n) &&
        ('ObjectPattern' === n.type ||
          'ArrayPattern' === n.type ||
          ('Identifier' === n.type &&
            n.typeAnnotation &&
            ('TypeAnnotation' === n.typeAnnotation.type ||
              'TSTypeAnnotation' === n.typeAnnotation.type) &&
            V(n.typeAnnotation.typeAnnotation)) ||
          ('FunctionTypeParam' === n.type &&
            V(n.typeAnnotation) &&
            n !== e.rest) ||
          ('AssignmentPattern' === n.type &&
            ('ObjectPattern' === n.left.type ||
              'ArrayPattern' === n.left.type) &&
            ('Identifier' === n.right.type ||
              (U(n.right) && 0 === n.right.properties.length) ||
              ($(n.right) && 0 === n.right.elements.length))))
      );
    }
    function rj(e, t) {
      let n,
        r =
          (e.returnType
            ? (n = e.returnType).typeAnnotation && (n = n.typeAnnotation)
            : e.typeAnnotation && (n = e.typeAnnotation),
          n);
      if (!r) return !1;
      let u = e.typeParameters?.params;
      if (u) {
        if (u.length > 1) return !1;
        if (1 === u.length) {
          let e = u[0];
          if (e.constraint || e.default) return !1;
        }
      }
      return 1 === F(e).length && (V(r) || nm(t));
    }
    function rL(e, t) {
      return ('params' === t || 'this' === t || 'rest' === t) && rM(e);
    }
    var rO =
        /^[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC][\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*$/,
      rJ = function (e) {
        return 1 === e.length
          ? e
          : e
              .toLowerCase()
              .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(?=\d)/, '$1$2')
              .replace(/^([+-]?[\d.]+)e[+-]?0+$/, '$1')
              .replace(/^([+-])?\./, '$10.')
              .replace(/(\.\d+?)0+(?=e|$)/, '$1')
              .replace(/\.(?=e|$)/, '');
      },
      rq = Object.freeze({ character: "'", codePoint: 39 }),
      rR = Object.freeze({ character: '"', codePoint: 34 }),
      rX = Object.freeze({ preferred: rq, alternate: rR }),
      r_ = Object.freeze({ preferred: rR, alternate: rq });
    function rW(e, t) {
      let { preferred: n, alternate: r } = !0 === t || "'" === t ? rX : r_,
        { length: u } = e,
        a = 0,
        o = 0;
      for (let t = 0; t < u; t++) {
        let u = e.charCodeAt(t);
        u === n.codePoint ? a++ : u === r.codePoint && o++;
      }
      return (a > o ? r : n).character;
    }
    var r$ = /\\(["'\\])|(["'])/g,
      rU = function (e, t) {
        let n = '"' === t ? "'" : '"',
          r = ek(0, e, r$, (e, r, u) =>
            r ? (r === n ? n : e) : u === t ? '\\' + u : u
          );
        return t + r + t;
      },
      rG = function (e, t) {
        p(/^(?<quote>["']).*\k<quote>$/s.test(e));
        let n = e.slice(1, -1),
          r;
        return (
          (r =
            'json' !== t.parser &&
            'jsonc' !== t.parser &&
            'json-stringify' !== t.parser &&
            ('json5' !== t.parser ||
              'preserve' !== t.quoteProps ||
              t.singleQuote)
              ? t.__isInHtmlAttribute
                ? "'"
                : rW(n, t.singleQuote)
              : '"'),
          e.charAt(0) === r ? e : rU(n, r)
        );
      },
      rV = e => ('TSEnumMember' === e.type ? 'id' : 'key'),
      rK = e => e[rV(e)],
      rH = e => 'TSEnumMember' !== e.type && e.computed;
    function rz(e) {
      return /^(?:\d+|\d+\.\d+)$/.test(e);
    }
    function rQ(e, t) {
      let { parser: n } = t;
      if ('json' === n || 'jsonc' === n) return !1;
      let r = rK(e);
      if (!M(r)) return !1;
      let { value: u } = r;
      return (
        rG(w(r), t).slice(1, -1) === u &&
        ('TSMethodSignature' !== e.type || 'new' !== u) &&
        !!(
          (('babel-ts' !== n || 'ClassProperty' !== e.type) &&
            (('typescript' !== n && 'oxc-ts' !== n && 'yuku-ts' !== n) ||
              'PropertyDefinition' !== e.type) &&
            rO.test(u)) ||
          (('babel' === n ||
            'acorn' === n ||
            'oxc' === n ||
            'yuku' === n ||
            'espree' === n ||
            'meriyah' === n ||
            '__babel_estree' === n) &&
            'ImportAttribute' !== e.type &&
            rz(u) &&
            String(Number(u)) === u)
        )
      );
    }
    var rY = new WeakMap();
    function rZ(e, t) {
      return d(rY, e.parent, () =>
        e.siblings.some(e => !rH(e) && M(rK(e)) && !rQ(e, t))
      );
    }
    function r0(e, t, n) {
      let { node: r } = e,
        u = rV(r);
      if (rH(r)) return ['[', n(u), ']'];
      if (
        ('json' === t.parser ||
          'jsonc' === t.parser ||
          ('consistent' === t.quoteProps && rZ(e, t))) &&
        (function (e, t) {
          let n = rK(e);
          if ('Identifier' === n.type) return !0;
          if (
            !I(n) ||
            (({ parser: e }) =>
              'typescript' === e ||
              'babel-ts' === e ||
              'oxc-ts' === e ||
              'yuku-ts' === e)(t)
          )
            return !1;
          let r = rJ(w(n));
          return String(n.value) === r && rz(r);
        })(e.node, t)
      ) {
        let n = rK(r),
          a = rG(
            JSON.stringify('Identifier' === n.type ? n.name : String(n.value)),
            t
          );
        return e.call(() => rE(e, a, t), u);
      }
      if (
        ('as-needed' === t.quoteProps ||
          ('consistent' === t.quoteProps && !rZ(e, t))) &&
        rQ(e.node, t)
      ) {
        let { value: n } = rK(r),
          a = /^\d/.test(n) ? rJ(n) : n;
        return e.call(() => rE(e, a, t), u);
      }
      return n(u);
    }
    var r1 = l([
        'VoidTypeAnnotation',
        'TSVoidKeyword',
        'NullLiteralTypeAnnotation',
        'TSNullKeyword'
      ]),
      r2 = l([
        'ObjectTypeAnnotation',
        'TSTypeLiteral',
        'GenericTypeAnnotation',
        'TSTypeReference'
      ]);
    function r8(e) {
      return (
        'elementTypes' === e.key &&
        q(e.parent) &&
        e.parent.elementTypes.length > 1
      );
    }
    function r3(e) {
      let { types: t } = e;
      if (t.some(e => tb(e))) return !1;
      let n = t.find(e => r2(e));
      return !!n && t.every(e => e === n || r1(e));
    }
    function r6(e) {
      let { key: t, node: n, parent: r } = e;
      return !(
        r3(n) ||
        ('types' === t && O(r)) ||
        ('types' === t && J(r)) ||
        r8(e)
      );
    }
    function r7(e, t, n, r) {
      let { node: u } = e;
      if (r3(u)) return nw(' | ', e.map(n, 'types'));
      let a = nb(
        e.map(({ isFirst: r }) => {
          let u = r ? nP('| ') : [nN, '| '],
            a = n();
          return tb(e.node, 2)
            ? [u, nh(2, rE(e, a, t))]
            : [u, rE(e, nh(2, a), t)];
        }, 'types')
      );
      return (
        r6(e) && (a = rE(e, a, t)),
        t1(e, t)
          ? nb([ng([nM, a]), nM])
          : r8(e)
            ? nb([ng([nP(['(', nM]), a]), nM, nP(')')])
            : r?.assignmentLayout !== 'break-after-operator' &&
                (function (e) {
                  let { key: t, parent: n } = e;
                  return !(
                    ('typeAnnotation' === t && 'TSTypeAssertion' === n.type) ||
                    ('elementTypes' === t && q(n)) ||
                    (('trueType' === t || 'falseType' === t) && R(n)) ||
                    ('params' === t && er(n)) ||
                    ('typeAnnotation' === t &&
                      'FunctionTypeParam' === n.type &&
                      !n.name &&
                      e.grandparent.this !== n) ||
                    e.match(
                      void 0,
                      (e, t) =>
                        'typeAnnotation' === t &&
                        'FunctionTypeParam' === e.type,
                      (e, t) =>
                        'params' === t && 'FunctionTypeAnnotation' === e.type,
                      (e, t) =>
                        'value' === t &&
                        'ObjectTypeProperty' === e.type &&
                        re(e)
                    )
                  );
                })(e)
              ? nb(ng([nM, a]))
              : a
      );
    }
    var r9 = new WeakSet();
    function r4(e, t, n = 'typeAnnotation') {
      let {
        node: { [n]: r }
      } = e;
      if (!r) return '';
      let u = !1;
      if ('TSTypeAnnotation' === r.type || 'TypeAnnotation' === r.type) {
        let t = e.call(r5, n);
        (('=>' === t || (':' === t && tb(r, 2))) && (u = !0), r9.add(r));
      }
      return u ? [' ', t(n)] : t(n);
    }
    var r5 = e =>
      e.match(
        e => 'TSTypeAnnotation' === e.type,
        (e, t) =>
          ('returnType' === t || 'typeAnnotation' === t) &&
          ('TSFunctionType' === e.type || 'TSConstructorType' === e.type)
      )
        ? '=>'
        : e.match(
              e => 'TSTypeAnnotation' === e.type,
              (e, t) =>
                'typeAnnotation' === t &&
                ('TSJSDocNullableType' === e.type ||
                  'TSJSDocNonNullableType' === e.type ||
                  'TSTypePredicate' === e.type)
            ) ||
            e.match(
              e => 'TypeAnnotation' === e.type,
              (e, t) => 'typeAnnotation' === t && 'Identifier' === e.type,
              (e, t) => 'id' === t && 'DeclareFunction' === e.type
            ) ||
            e.match(
              e => 'TypeAnnotation' === e.type,
              (e, t) => 'typeAnnotation' === t && 'Identifier' === e.type,
              (e, t) => 'id' === t && 'DeclareHook' === e.type
            ) ||
            e.match(
              e => 'TypeAnnotation' === e.type,
              (e, t) =>
                'bound' === t &&
                'TypeParameter' === e.type &&
                e.usesExtendsBound
            )
          ? ''
          : ':';
    function ue(e, t, n) {
      let r = r5(e);
      return r ? [r, ' ', n('typeAnnotation')] : n('typeAnnotation');
    }
    function ut(e, t, n, r) {
      if (
        (({ node: e, key: t, parent: n }) =>
          'value' === t &&
          'FunctionExpression' === e.type &&
          ('ObjectMethod' === n.type ||
            'ClassMethod' === n.type ||
            'ClassPrivateMethod' === n.type ||
            'MethodDefinition' === n.type ||
            'TSAbstractMethodDefinition' === n.type ||
            'TSDeclareMethod' === n.type ||
            ('Property' === n.type && A(n))))(e)
      )
        return ur(e, t, n);
      let { node: u } = e,
        a = !1;
      if ('FunctionExpression' === u.type && r?.expandLastArg) {
        let { parent: t } = e;
        Q(t) &&
          (eS(t).length > 1 ||
            F(u).every(e => 'Identifier' === e.type && !e.typeAnnotation)) &&
          (a = !0);
      }
      let o = rN(e, t, n, a),
        i = ua(e, n),
        s = rj(u, i),
        p = 'HookDeclaration' === u.type ? 'hook' : 'function';
      return [
        rh(e),
        u.async ? 'async ' : '',
        p,
        u.generator ? '*' : '',
        ' ',
        u.id ? n('id') : '',
        n('typeParameters'),
        nb([s ? nb(o) : o, i]),
        u.body ? ' ' : '',
        n('body'),
        u.declare || !u.body ? rw(t) : ''
      ];
    }
    function un(e, t, n) {
      let { node: r } = e,
        { kind: u } = r,
        a = r.value || r,
        o = [];
      return (
        u && 'init' !== u && 'method' !== u && 'constructor' !== u
          ? (p(), o.push(u, ' '))
          : a.async && o.push('async '),
        a.generator && o.push('*'),
        o.push(
          r0(e, t, n),
          r.optional ? '?' : '',
          r === a ? ur(e, t, n) : n('value')
        ),
        o
      );
    }
    function ur(e, t, n) {
      let r,
        { node: u } = e,
        a = rN(e, t, n),
        o = ua(e, n),
        i =
          (r = F(u)).length > 1 &&
          r.some(e => 'TSParameterProperty' === e.type),
        s = rj(u, o),
        p = [
          n('typeParameters'),
          nb([i ? nb(a, { shouldBreak: !0 }) : s ? nb(a) : a, o])
        ];
      return (u.body ? p.push(' ', n('body')) : p.push(rw(t)), p);
    }
    function uu(e, t) {
      if ('always' === t.arrowParens) return !1;
      if ('avoid' === t.arrowParens) {
        let t,
          { node: n } = e;
        return (
          1 === (t = F(n)).length &&
          !n.typeParameters &&
          !tb(n, 8) &&
          'Identifier' === t[0].type &&
          !t[0].typeAnnotation &&
          !tb(t[0]) &&
          !t[0].optional &&
          !n.predicate &&
          !n.returnType
        );
      }
      return !1;
    }
    function ua(e, t) {
      let { node: n } = e,
        r = [r4(e, t, 'returnType')];
      return (n.predicate && r.push(t('predicate')), r);
    }
    function uo(e, t) {
      if (t.semi) return !1;
      let { node: n } = e;
      if ('ExpressionStatement' !== n.type || us(e, t) || ul(e, t) || up(e, t))
        return !1;
      let { key: r, parent: u } = e;
      return !!(
        (('body' === r &&
          ('Program' === u.type ||
            'BlockStatement' === u.type ||
            'StaticBlock' === u.type ||
            'TSModuleBlock' === u.type)) ||
          ('consequent' === r && 'SwitchCase' === u.type)) &&
        e.call(
          () =>
            (function e(t, n) {
              let { node: r } = t;
              switch (r.type) {
                case 'ParenthesizedExpression':
                case 'TypeCastExpression':
                case 'TSTypeAssertion':
                case 'ArrayExpression':
                case 'ArrayPattern':
                case 'TemplateLiteral':
                case 'TemplateElement':
                case 'RegExpLiteral':
                  return !0;
                case 'ArrowFunctionExpression':
                  if (!uu(t, n)) return !0;
                  break;
                case 'UnaryExpression': {
                  let { prefix: e, operator: t } = r;
                  if (e && ('+' === t || '-' === t)) return !0;
                  break;
                }
                case 'BindExpression':
                  if (!r.object) return !0;
                  break;
                case 'Literal':
                  if (r.regex) return !0;
                  break;
                default:
                  if (H(r)) return !0;
              }
              return !!t1(t, n) || (!!tV(r) && t.call(() => e(t, n), ...tK(r)));
            })(e, t),
          'expression'
        )
      );
    }
    var ui = ({ node: e, parent: t }) =>
      'ExpressionStatement' === e.type &&
      'Program' === t.type &&
      1 === t.body.length &&
      ((Array.isArray(t.directives) && 0 === t.directives.length) ||
        !t.directives);
    function us(e, t) {
      return (
        ('markdown' === t.parentParser || 'mdx' === t.parentParser) &&
        ui(e) &&
        H(e.node.expression)
      );
    }
    function up(e, t) {
      return t.__isHtmlInlineEventHandler && ui(e);
    }
    function ul(e, t) {
      return (
        ('__vue_event_binding' === t.parser ||
          '__vue_ts_event_binding' === t.parser) &&
        ui(e)
      );
    }
    function uc(e, t) {
      if (!uo(e, t)) return !1;
      let n = y(0, tv(e.node, 2), -1);
      return !!(n && eq(n));
    }
    var uD = l([
        'ClassDeclaration',
        'ClassExpression',
        'DeclareClass',
        'DeclareInterface',
        'InterfaceDeclaration',
        'TSInterfaceDeclaration'
      ]),
      uy = function (e, t, n = 0) {
        let r = 0;
        for (let u = n; u < e.length; ++u)
          '	' === e[u] ? (r = r + t - (r % t)) : r++;
        return r;
      },
      ud = function (e, t) {
        let n = e.lastIndexOf(`
`);
        return -1 === n ? 0 : uy(e.slice(n + 1).match(/^[\t ]*/)[0], t);
      };
    function um(e, t, n) {
      if (
        (function ({ node: e, parent: t }) {
          return (
            'TemplateLiteral' === e.type &&
            'TaggedTemplateExpression' === t.type &&
            t.quasi === e &&
            'MemberExpression' === t.tag.type &&
            'Identifier' === t.tag.property.type &&
            'each' === t.tag.property.name &&
            (('Identifier' === t.tag.object.type &&
              uC.test(t.tag.object.name)) ||
              ('MemberExpression' === t.tag.object.type &&
                'Identifier' === t.tag.object.property.type &&
                ('only' === t.tag.object.property.name ||
                  'skip' === t.tag.object.property.name) &&
                'Identifier' === t.tag.object.object.type &&
                uC.test(t.tag.object.object.name)))
          );
        })(e)
      ) {
        let r = (function (e, t, n) {
          let { node: r } = e,
            u = r.quasis[0].value.raw.trim().split(/\s*\|\s*/);
          if (u.length > 1 || u.some(e => e.length > 0)) {
            t.__inJestEach = !0;
            let a = uF(e, t, n);
            t.__inJestEach = !1;
            let o = a.map(
                e =>
                  n4(e, { ...t, printWidth: 1 / 0, endOfLine: 'lf' }).formatted
              ),
              i = [{ hasLineBreak: !1, cells: [] }];
            for (let e = 1; e < r.quasis.length; e++) {
              let t = y(0, i, -1),
                n = o[e - 1];
              (t.cells.push(n),
                n.includes(`
`) && (t.hasLineBreak = !0),
                r.quasis[e].value.raw.includes(`
`) && i.push({ hasLineBreak: !1, cells: [] }));
            }
            let s = Array.from(
                { length: Math.max(u.length, ...i.map(e => e.cells.length)) },
                () => 0
              ),
              p = [{ cells: u }, ...i.filter(e => e.cells.length > 0)];
            for (let e of p)
              if (!e.hasLineBreak)
                for (let [t, n] of e.cells.entries())
                  s[t] = Math.max(s[t], nQ(n));
            return [
              nq,
              '`',
              ng([
                nL,
                nw(
                  nL,
                  p.map(e =>
                    nw(
                      ' | ',
                      e.cells.map((t, n) =>
                        e.hasLineBreak ? t : t + ' '.repeat(s[n] - nQ(t))
                      )
                    )
                  )
                )
              ]),
              nL,
              '`'
            ];
          }
        })(e, t, n);
        if (r) return r;
      }
      let r = uF(e, t, n);
      return [
        nq,
        '`',
        ...e.map(({ isLast: e, index: t }) => [n(), e ? '' : r[t]], 'quasis'),
        '`'
      ];
    }
    var uf = new WeakMap();
    function uF(e, t, n) {
      return e.map(
        () =>
          (function (e, t, n) {
            let { node: r, index: u } = e,
              a = n(),
              { quasis: o } = e.parent,
              i = P(o[u]),
              s = g(o[u + 1]),
              l = eg(t.originalText, i, s);
            if (!l) {
              let e = n4(a, { ...t, printWidth: 1 / 0 }).formatted;
              e.includes(`
`)
                ? (l = !0)
                : (a = e);
            }
            l &&
              (tb(r) ||
                'Identifier' === r.type ||
                Y(tY(r)) ||
                'ConditionalExpression' === r.type ||
                'SequenceExpression' === r.type ||
                j(r) ||
                z(r)) &&
              (a = [ng([nM, a]), nM]);
            let { indentSize: c, previousQuasiText: D } = (function (e, t) {
              let { parent: n, index: r } = e;
              return d(uf, n, e => {
                let { tabWidth: n } = t,
                  r = 0;
                return e.quasis.map(e => {
                  let t = e.value.raw,
                    u = t.includes(`
`)
                      ? ud(t, n)
                      : r;
                  return ((r = u), { indentSize: u, previousQuasiText: t });
                });
              })[r];
            })(e, t);
            return (
              t.__inJestEach && (c = Math.max(c, t.tabWidth)),
              nb([
                '${',
                (a =
                  0 === c &&
                  D.endsWith(`
`)
                    ? nh(-1 / 0, a)
                    : (function (e, t, n) {
                        p();
                        let r = e;
                        if (t > 0) {
                          for (let e = 0; e < Math.floor(t / n); ++e) r = ng(r);
                          ((r = nh(t % n, r)), (r = nh(-1 / 0, r)));
                        }
                        return r;
                      })(a, c, t.tabWidth)),
                nq,
                '}'
              ])
            );
          })(e, t, n),
        'TSTemplateLiteralType' === e.node.type ? 'types' : 'expressions'
      );
    }
    function uE(e, t) {
      return nD(e, e =>
        'string' == typeof e ? (t ? ek(0, e, /(\\*)`/g, '$1$1\\`') : uA(e)) : e
      );
    }
    function uA(e) {
      return ek(0, e, /([\\`]|\$\{)/g, '\\$1');
    }
    var uC = /^[fx]?(?:describe|it|test)$/,
      ux = [
        (e, t) => 'properties' === t && 'ObjectExpression' === e.type,
        (e, t) =>
          'arguments' === t &&
          'CallExpression' === e.type &&
          'Identifier' === e.callee.type &&
          'Component' === e.callee.name,
        (e, t) => 'expression' === t && 'Decorator' === e.type
      ];
    function ug(e, t) {
      return tb(e, 18, ({ value: e }) => e === ` ${t} `);
    }
    function uh({ node: e, parent: t }, n) {
      var r;
      return (
        ug(e, n) ||
        (('AsConstExpression' === (r = t).type ||
          ('TSAsExpression' === r.type &&
            'TSTypeReference' === r.typeAnnotation.type &&
            'Identifier' === r.typeAnnotation.typeName.type &&
            'const' === r.typeAnnotation.typeName.name)) &&
          ug(t, n)) ||
        ('ExpressionStatement' === t.type && ug(t, n))
      );
    }
    function uT(e) {
      return 'Identifier' === e.type && 'styled' === e.name;
    }
    function uS(e) {
      return /^[A-Z]/.test(e.object.name) && 'extend' === e.property.name;
    }
    var uB = 0;
    async function ub(e, t, n, r, u) {
      let { node: a } = r,
        o = uB;
      uB = (uB + 1) >>> 0;
      let i = e => `PRETTIER_HTML_PLACEHOLDER_${e}_${o}_IN_JS`,
        s = a.quasis
          .map((e, t, n) =>
            t === n.length - 1 ? e.value.cooked : e.value.cooked + i(t)
          )
          .join(''),
        p = uF(r, u, n),
        l = RegExp(i('(\\d+)'), 'g'),
        c = 0,
        D = nD(
          await t(s, {
            parser: e,
            __onHtmlRoot(e) {
              c = e.children.length;
            }
          }),
          e => {
            if ('string' != typeof e) return e;
            let t = [],
              n = e.split(l);
            for (let e = 0; e < n.length; e++) {
              let r = n[e];
              if (e % 2 == 0) {
                r &&
                  ((r = uA(r)),
                  u.__embeddedInHtml &&
                    (r = ek(0, r, /<\/(?=script\b)/gi, '<\\/')),
                  t.push(r));
                continue;
              }
              let a = Number(r);
              t.push(p[a]);
            }
            return t;
          }
        ),
        y = /^\s/.test(s) ? ' ' : '',
        d = /\s$/.test(s) ? ' ' : '',
        m = 'ignore' === u.htmlWhitespaceSensitivity ? nL : y && d ? nN : null;
      return m
        ? nb(['`', ng([m, nb(D)]), m, '`'])
        : nI({ hug: !1 }, nb(['`', y, c > 1 ? ng(nb(D)) : nb(D), d, '`']));
    }
    async function uv(e, t, n) {
      let r,
        { node: u } = n,
        a = ek(
          0,
          u.quasis[0].value.raw,
          /((?:\\\\)*)\\`/g,
          (e, t) => '\\'.repeat(t.length / 2) + '`'
        ),
        o = null === (r = a.match(/^([^\S\n]*)\S/m)) ? '' : r[1],
        i = '' !== o;
      i && (a = ek(0, a, RegExp(`^${o}`, 'gm'), ''));
      let s = uE(await e(a, { parser: 'markdown', __inJsTemplate: !0 }), !0);
      return ['`', i ? ng([nM, s]) : [nO, nh(-1 / 0, s)], nM, '`'];
    }
    var uP = [
      {
        test: e => {
          let t, n;
          return (
            e.match(
              void 0,
              (e, t) =>
                'quasi' === t &&
                'TaggedTemplateExpression' === e.type &&
                ri(e.tag, ['css', 'css.global', 'css.resolve'])
            ) ||
            e.match(
              void 0,
              (e, t) =>
                'expression' === t && 'JSXExpressionContainer' === e.type,
              (e, t) =>
                'children' === t &&
                'JSXElement' === e.type &&
                'JSXIdentifier' === e.openingElement.name.type &&
                'style' === e.openingElement.name.name &&
                e.openingElement.attributes.some(
                  e =>
                    'JSXAttribute' === e.type &&
                    'JSXIdentifier' === e.name.type &&
                    'jsx' === e.name.name
                )
            ) ||
            (function ({ parent: e }) {
              if (!e || 'TaggedTemplateExpression' !== e.type) return !1;
              let t =
                'ParenthesizedExpression' === e.tag.type
                  ? e.tag.expression
                  : e.tag;
              switch (t.type) {
                case 'MemberExpression':
                  return uT(t.object) || uS(t);
                case 'CallExpression':
                  return (
                    uT(t.callee) ||
                    ('MemberExpression' === t.callee.type &&
                      (('MemberExpression' === t.callee.object.type &&
                        (uT(t.callee.object.object) || uS(t.callee.object))) ||
                        ('CallExpression' === t.callee.object.type &&
                          uT(t.callee.object.callee))))
                  );
                case 'Identifier':
                  return 'css' === t.name;
                default:
                  return !1;
              }
            })(e) ||
            (function ({ parent: e, grandparent: t }) {
              return (
                t?.type === 'JSXAttribute' &&
                'JSXExpressionContainer' === e.type &&
                'JSXIdentifier' === t.name.type &&
                'css' === t.name.name
              );
            })(e) ||
            ((t = e => 'TemplateLiteral' === e.type),
            (n = (e, t) =>
              eL(e) &&
              !e.computed &&
              'Identifier' === e.key.type &&
              'styles' === e.key.name &&
              'value' === t),
            e.match(t, (e, t) => $(e) && 'elements' === t, n, ...ux) ||
              e.match(t, n, ...ux))
          );
        },
        print: async function e(e, t, n, r) {
          let { node: u } = n,
            a = '';
          for (let [e, t] of u.quasis.entries()) {
            let { raw: n } = t.value;
            (e > 0 && (a += '@prettier-placeholder-' + (e - 1) + '-id'),
              (a += n));
          }
          let o = (function (e, t) {
            if (!s(t)) return e;
            let n = 0,
              r = nD(nE(e), e =>
                'string' == typeof e && e.includes('@prettier-placeholder')
                  ? e
                      .split(/@prettier-placeholder-(\d+)-id/)
                      .map((e, r) => (r % 2 == 0 ? nA(e) : (n++, t[e])))
                  : e
              );
            return t.length === n ? r : null;
          })(await e(a, { parser: 'scss' }), uF(n, r, t));
          if (!o) throw Error("Couldn't insert all the expressions");
          return ['`', ng([nL, o]), nM, '`'];
        }
      },
      {
        test: function ({ node: e, parent: t }) {
          return (
            uh({ node: e, parent: t }, 'GraphQL') ||
            (t &&
              (('TaggedTemplateExpression' === t.type &&
                (('MemberExpression' === t.tag.type &&
                  'graphql' === t.tag.object.name &&
                  'experimental' === t.tag.property.name) ||
                  ('Identifier' === t.tag.type &&
                    ('gql' === t.tag.name || 'graphql' === t.tag.name)))) ||
                ('CallExpression' === t.type &&
                  'Identifier' === t.callee.type &&
                  'graphql' === t.callee.name)))
          );
        },
        print: async function e(e, t, n, r) {
          let { node: u } = n,
            a = u.quasis.length,
            o = uF(n, r, t),
            i = [];
          for (let t = 0; t < a; t++) {
            let n = u.quasis[t],
              r = 0 === t,
              s = t === a - 1,
              p = n.value.cooked,
              l = p.split(`
`),
              c = l.length;
            if (!s && /#[^\n\r]*$/.test(l[c - 1])) return null;
            let D = c > 2 && '' === l[0].trim() && '' === l[1].trim(),
              y = c > 2 && '' === l[c - 1].trim() && '' === l[c - 2].trim(),
              d;
            ((d = l.every(e => /^\s*(?:#[^\n\r]*)?$/.test(e))
              ? (function (e) {
                  let t = [],
                    n = !1,
                    r = e.map(e => e.trim());
                  for (let [e, u] of r.entries())
                    '' !== u &&
                      ('' === r[e - 1] && n ? t.push([nL, u]) : t.push(u),
                      (n = !0));
                  return 0 === t.length ? null : nw(nL, t);
                })(l)
              : await e(p, { parser: 'graphql' }))
              ? ((d = uE(d, !1)),
                !r && D && i.push(''),
                i.push(d),
                !s && y && i.push(''))
              : r || s || !D || i.push(''),
              s || i.push(o[t]));
          }
          return ['`', ng([nL, nw(nL, i)]), nL, '`'];
        }
      },
      {
        test: function (e) {
          return (
            uh(e, 'HTML') ||
            e.match(
              e => 'TemplateLiteral' === e.type,
              (e, t) =>
                'TaggedTemplateExpression' === e.type &&
                'Identifier' === e.tag.type &&
                'html' === e.tag.name &&
                'quasi' === t
            )
          );
        },
        print: ub.bind(void 0, 'html')
      },
      {
        test: function (e) {
          return e.match(
            e => 'TemplateLiteral' === e.type,
            (e, t) =>
              eL(e) &&
              !e.computed &&
              'Identifier' === e.key.type &&
              'template' === e.key.name &&
              'value' === t,
            ...ux
          );
        },
        print: ub.bind(void 0, 'angular')
      },
      {
        test: function ({ node: e, parent: t }) {
          return (
            t?.type === 'TaggedTemplateExpression' &&
            1 === e.quasis.length &&
            'Identifier' === t.tag.type &&
            ('md' === t.tag.name || 'markdown' === t.tag.name)
          );
        },
        print: uv
      }
    ].map(({ test: e, print: t }) => {
      var n;
      return {
        test: e,
        print:
          ((n = t),
          async (...e) => {
            let t = await n(...e);
            return t && nI({ embed: !0, ...t.label }, t);
          })
      };
    });
    function uk(e) {
      return Y(e) ? 'object' : Q(e) ? 'callee' : et(e) ? 'expression' : void 0;
    }
    function uw(e) {
      let t = uk(e);
      if (t) return e[t];
    }
    function uI(e, t, n) {
      let r = t[n];
      ((M(r) || I(r)) && (e[n] = String(r.value)),
        'Identifier' === r.type && (e[n] = r.name));
    }
    var uN = new Set([
        'range',
        'raw',
        'comments',
        'extra',
        'start',
        'end',
        'loc',
        'errors',
        'tokens',
        'trailingComma',
        'docblock',
        '__contentEnd'
      ]),
      uM = e => {
        for (let t of e.quasis) delete t.value;
      };
    function uj(e, t, n) {
      if (
        ('Program' === e.type && delete t.sourceType,
        'ChainExpression' === e.type
          ? (function (e) {
              for (
                e = uw(e);
                'MemberExpression' === e.type ||
                'CallExpression' === e.type ||
                'TSNonNullExpression' === e.type;
                e = uw(e)
              ) {
                let t = uk(e),
                  n = e[t];
                'ChainExpression' === n.type && (e[t] = n.expression);
              }
            })(t)
          : ('OptionalMemberExpression' === e.type ||
              'OptionalCallExpression' === e.type) &&
            (function (e) {
              for (
                e = uw(e);
                'MemberExpression' === e.type || 'CallExpression' === e.type;
                e = uw(e)
              )
                e.type = `Optional${e.type}`;
            })(t),
        ('Property' !== e.type &&
          'ObjectProperty' !== e.type &&
          'MethodDefinition' !== e.type &&
          'ClassProperty' !== e.type &&
          'ClassMethod' !== e.type &&
          'PropertyDefinition' !== e.type &&
          'TSDeclareMethod' !== e.type &&
          'TSPropertySignature' !== e.type &&
          'TSMethodSignature' !== e.type &&
          'ObjectTypeProperty' !== e.type &&
          'ImportAttribute' !== e.type &&
          'RecordDeclarationProperty' !== e.type &&
          'RecordDeclarationStaticProperty' !== e.type) ||
          e.computed ||
          uI(t, e, 'key'),
        'TSEnumMember' === e.type && uI(t, e, 'id'),
        'RegExpLiteral' === e.type && (t.flags = [...e.flags].sort().join('')),
        'Literal' === e.type &&
          'regex' in e &&
          (t.regex.flags = [...e.regex.flags].sort().join('')),
        ('BigIntLiteral' === e.type ||
          ('Literal' === e.type && e.bigint) ||
          'BigIntLiteralTypeAnnotation' === e.type) &&
          'bigint' in e &&
          (t.bigint = e.bigint.toLowerCase()),
        ('EmptyStatement' === e.type && !E({ node: e, parent: n })) ||
          'JSXText' === e.type ||
          ('JSXExpressionContainer' === e.type &&
            ('Literal' === e.expression.type ||
              'StringLiteral' === e.expression.type) &&
            ' ' === e.expression.value))
      )
        return null;
      if (
        'JSXElement' === e.type &&
        'JSXIdentifier' === e.openingElement.name.type &&
        'style' === e.openingElement.name.name &&
        e.openingElement.attributes.some(
          e => 'JSXAttribute' === e.type && 'jsx' === e.name.name
        )
      )
        for (let { type: e, expression: n } of t.children)
          'JSXExpressionContainer' === e &&
            'TemplateLiteral' === n.type &&
            uM(n);
      ('JSXAttribute' === e.type &&
        'css' === e.name.name &&
        'JSXExpressionContainer' === e.value.type &&
        'TemplateLiteral' === e.value.expression.type &&
        uM(t.value.expression),
        'JSXAttribute' === e.type &&
          M(e.value) &&
          /["']|&quot;|&apos;/.test(e.value.value) &&
          (t.value.value = ek(0, e.value.value, /["']|&quot;|&apos;/g, '"')));
      let r = e.expression || e.callee;
      if (
        'Decorator' === e.type &&
        'CallExpression' === r.type &&
        'Component' === r.callee.name &&
        1 === r.arguments.length
      ) {
        let n = e.expression.arguments[0].properties;
        for (let [e, r] of t.expression.arguments[0].properties.entries())
          switch (n[e].key.name) {
            case 'styles':
              $(r.value) && uM(r.value.elements[0]);
              break;
            case 'template':
              'TemplateLiteral' === r.value.type && uM(r.value);
          }
      }
      ('TaggedTemplateExpression' === e.type &&
        ('MemberExpression' === e.tag.type ||
          ('Identifier' === e.tag.type &&
            ('gql' === e.tag.name ||
              'graphql' === e.tag.name ||
              'css' === e.tag.name ||
              'md' === e.tag.name ||
              'markdown' === e.tag.name ||
              'html' === e.tag.name)) ||
          'CallExpression' === e.tag.type) &&
        uM(t.quasi),
        ('CallExpression' !== e.type && 'MemberExpression' !== e.type) ||
          e.optional ||
          delete t.optional,
        'TemplateLiteral' === e.type && uM(t));
    }
    uj.ignoredProperties = uN;
    var uL = /\*\/$/,
      uO = /^\/\*\*?/,
      uJ = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/,
      uq = /(^|\s+)\/\/([^\n\r]*)/g,
      uR = /^(\r?\n)+/,
      uX =
        /(?:^|\r?\n) *(@[^\n\r]*?) *\r?\n *(?![^\n\r@]*\/\/[^]*)([^\s@][^\n\r@]+?) *\r?\n/g,
      u_ = /(?:^|\r?\n) *@(\S+) *([^\n\r]*)/g,
      uW = /(\r?\n|^) *\* ?/g,
      u$ = [];
    function uU(e, t) {
      return [...u$, ...(Array.isArray(t) ? t : [t])].map(t =>
        `@${e} ${t}`.trim()
      );
    }
    var uG = function (e) {
      if (!e.startsWith('#!')) return '';
      let t = e.indexOf(`
`);
      return -1 === t ? e : e.slice(0, t);
    };
    function uV(e) {
      if (
        !eM(e) ||
        !e.value.includes(`
`)
      )
        return [];
      let t = [];
      for (let n of `*${e.value}*`.split(`
`)) {
        if (!(n = n.trimStart()).startsWith('*')) return [];
        t.push(n);
      }
      return t;
    }
    var uK = new WeakMap();
    function uH(e) {
      return d(uK, e, uV).length > 0;
    }
    var uz = new (class {
      #e;
      constructor(e) {
        this.#e = new Set(e);
      }
      getLeadingWhitespaceCount(e) {
        let t = this.#e,
          n = 0;
        for (let r = 0; r < e.length && t.has(e.charAt(r)); r++) n++;
        return n;
      }
      getTrailingWhitespaceCount(e) {
        let t = this.#e,
          n = 0;
        for (let r = e.length - 1; r >= 0 && t.has(e.charAt(r)); r--) n++;
        return n;
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
        return this.#e.has(y(0, e, -1));
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
        let n = `[${(function (e) {
            if ('string' != typeof e) throw TypeError('Expected a string');
            return e
              .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
              .replace(/-/g, '\\x2d');
          })([...this.#e].join(''))}]+`,
          r = new RegExp(t ? `(${n})` : n);
        return e.split(r);
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
        for (let n of e.split(`
`)) {
          if (0 === n.length) continue;
          let e = this.getLeadingWhitespaceCount(n);
          if (0 === e) return 0;
          n.length !== e && e < t && (t = e);
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
    })(` 
\r	`);
    function uQ(e) {
      return (
        'JSXText' === e.type &&
        (uz.hasNonWhitespaceCharacter(w(e)) || !/\n/.test(w(e)))
      );
    }
    var uY = function (e) {
        return (
          tP(e.node) ||
          (function (e) {
            let { node: t, parent: n } = e;
            if (!H(t) || !H(n)) return !1;
            let { index: r, siblings: u } = e,
              a;
            for (let e = r; e > 0; e--) {
              let t = u[e - 1];
              if (!('JSXText' === t.type && !uQ(t))) {
                a = t;
                break;
              }
            }
            return (
              a?.type === 'JSXExpressionContainer' &&
              'JSXEmptyExpression' === a.expression.type &&
              tP(a.expression)
            );
          })(e)
        );
      },
      uZ = class extends Error {
        name = 'UnexpectedNodeError';
        constructor(e, t, n = 'type') {
          (super(`Unexpected ${t} node ${n}: ${JSON.stringify(e[n])}.`),
            (this.node = e));
        }
      },
      u0 = 0;
    function u1(e, t, n) {
      var r;
      let { node: u, parent: a, grandparent: o, key: i } = e,
        s =
          'body' !== i &&
          ('IfStatement' === a.type ||
            'WhileStatement' === a.type ||
            'SwitchStatement' === a.type ||
            'DoWhileStatement' === a.type),
        p = '|>' === u.operator && e.root.extra?.__isUsingHackPipeline,
        l = (function e(t, n, r, u, a) {
          var o, i;
          let { node: s } = t;
          if (!z(s)) return [nb(r())];
          let p = [];
          tL(s.operator, s.left.operator)
            ? (p = t.call(() => e(t, n, r, !0, a), 'left'))
            : p.push(nb(r('left')));
          let l = u2(s),
            c =
              'ChainExpression' === s.right.type ? s.right.expression : s.right,
            D =
              ('NGPipeExpression' === s.type ||
                '|>' === s.operator ||
                ((o = t),
                ('__vue_expression' === (i = n).parser ||
                  '__vue_ts_expression' === i.parser) &&
                  u8(o.node) &&
                  !o.hasAncestor(
                    e => !u8(e) && 'JsExpressionRoot' !== e.type
                  ))) &&
              !tH(n.originalText, c),
            y = !tb(c, 2, eq) && tH(n.originalText, c),
            d = 'NGPipeExpression' === s.type ? '|' : s.operator,
            m =
              'NGPipeExpression' === s.type && s.arguments.length > 0
                ? nb(
                    ng([
                      nM,
                      ': ',
                      nw(
                        [nN, ': '],
                        t.map(() => nh(2, nb(r())), 'arguments')
                      )
                    ])
                  )
                : '',
            f;
          if (l)
            f = [
              d,
              tH(n.originalText, c)
                ? ng([nN, r('right'), m])
                : [' ', r('right'), m]
            ];
          else {
            let u =
              '|>' === d && t.root.extra?.__isUsingHackPipeline
                ? t.call(() => e(t, n, r, !0, a), 'right')
                : r('right');
            if ('start' === n.experimentalOperatorPosition) {
              let e = '';
              if (y)
                switch (ns(u)) {
                  case t8:
                    ((e = u[0]), u.shift());
                    break;
                  case na:
                    ((e = u.contents[0]), u.contents.shift());
                }
              f = [nN, e, d, ' ', u, m];
            } else f = [D ? nN : '', d, D ? ' ' : nN, u, m];
          }
          let { parent: F } = t,
            E = tb(s.left, 36);
          if (
            ((E ||
              (!(a && 'LogicalExpression' === s.type) &&
                F.type !== s.type &&
                s.left.type !== s.type &&
                s.right.type !== s.type)) &&
              (f = nb(f, { shouldBreak: E })),
            'start' === n.experimentalOperatorPosition
              ? p.push(l || y ? ' ' : '', f)
              : p.push(D ? '' : ' ', f),
            u && tb(s))
          ) {
            let e = nE(rE(t, p, n));
            return e.type === t5 ? e.parts : Array.isArray(e) ? e : [e];
          }
          return p;
        })(e, t, n, !1, s);
      if (s) return l;
      if (p) return nb(l);
      if (
        ('callee' === i && Z(a)) ||
        ('UnaryExpression' === a.type && !tb(u)) ||
        (Y(a) && !a.computed)
      )
        return nb([ng([nM, ...l]), nM]);
      let c =
          _(a) ||
          ('JSXExpressionContainer' === a.type && 'JSXAttribute' === o.type) ||
          ('|' !== u.operator && 'JsExpressionRoot' === a.type) ||
          ('NGPipeExpression' !== u.type &&
            (('NGRoot' === a.type && '__ng_binding' === t.parser) ||
              ('NGMicrosyntaxExpression' === a.type &&
                'NGMicrosyntax' === o.type &&
                1 === o.body.length))) ||
          (u === a.body && 'ArrowFunctionExpression' === a.type) ||
          (u !== a.body && 'ForStatement' === a.type) ||
          ('ConditionalExpression' === a.type && !_(o) && !Z(o)) ||
          'TemplateLiteral' === a.type ||
          ('argument' === i && 'UnaryExpression' === a.type) ||
          ('arguments' === i &&
            'CallExpression' === (r = a).type &&
            !r.optional &&
            1 === r.arguments.length &&
            'Identifier' === r.callee.type &&
            'Boolean' === r.callee.name),
        D =
          'AssignmentExpression' === a.type ||
          'VariableDeclarator' === a.type ||
          'ClassProperty' === a.type ||
          'PropertyDefinition' === a.type ||
          'TSAbstractPropertyDefinition' === a.type ||
          'ClassPrivateProperty' === a.type ||
          eL(a),
        d = z(u.left) && tL(u.operator, u.left.operator);
      if (c || (u2(u) && !d) || (!u2(u) && D)) return nb(l);
      if (0 === l.length) return '';
      let m = H(u.right),
        f = l.findIndex(
          e => 'string' != typeof e && !Array.isArray(e) && e.type === t4
        ),
        F = l.slice(0, -1 === f ? 1 : f + 1),
        E = l.slice(F.length, m ? -1 : void 0),
        A = Symbol('logicalChain-' + ++u0),
        C = nb([...F, ng(E)], { id: A });
      return m ? nb([C, nk(y(0, l, -1), { groupId: A })]) : C;
    }
    function u2(e) {
      return (
        'LogicalExpression' === e.type &&
        !!(
          (U(e.right) && e.right.properties.length > 0) ||
          ($(e.right) && e.right.elements.length > 0) ||
          H(e.right)
        )
      );
    }
    var u8 = e => 'BinaryExpression' === e.type && '|' === e.operator;
    function u3(e, t, n) {
      let { node: r } = e;
      if (r.type.startsWith('NG'))
        switch (r.type) {
          case 'NGRoot':
            return n('node');
          case 'NGPipeExpression':
            return u1(e, t, n);
          case 'NGChainedExpression':
            return nb(
              nw(
                [';', nN],
                e.map(
                  () =>
                    !(function ({ node: e }) {
                      return tG(e, u7);
                    })(e)
                      ? ['(', n(), ')']
                      : n(),
                  'expressions'
                )
              )
            );
          case 'NGEmptyExpression':
            return '';
          case 'NGMicrosyntax':
            return e.map(
              () => [e.isFirst ? '' : u6(e) ? ' ' : [';', nN], n()],
              'body'
            );
          case 'NGMicrosyntaxKey':
            return /^[$_a-z][\w$]*(?:-[$_a-z][\w$])*$/i.test(r.name)
              ? r.name
              : JSON.stringify(r.name);
          case 'NGMicrosyntaxExpression':
            return [
              n('expression'),
              null === r.alias ? '' : [' as ', n('alias')]
            ];
          case 'NGMicrosyntaxKeyedExpression': {
            let { index: t, parent: u } = e,
              a =
                u6(e) ||
                (function (e) {
                  let { node: t } = e;
                  return (
                    'of' === e.parent.body[1].key.name &&
                    'NGMicrosyntaxKeyedExpression' === t.type &&
                    'track' === t.key.name &&
                    'NGMicrosyntaxKey' === t.key.type
                  );
                })(e) ||
                (((1 === t &&
                  ('then' === r.key.name ||
                    'else' === r.key.name ||
                    'as' === r.key.name)) ||
                  (2 === t &&
                    (('else' === r.key.name &&
                      'NGMicrosyntaxKeyedExpression' === u.body[t - 1].type &&
                      'then' === u.body[t - 1].key.name) ||
                      'track' === r.key.name))) &&
                  'NGMicrosyntaxExpression' === u.body[0].type);
            return [n('key'), a ? ' ' : ': ', n('expression')];
          }
          case 'NGMicrosyntaxLet':
            return [
              'let ',
              n('key'),
              null === r.value ? '' : [' = ', n('value')]
            ];
          case 'NGMicrosyntaxAs':
            return [n('key'), ' as ', n('alias')];
          default:
            throw new uZ(r, 'Angular');
        }
    }
    function u6({ node: e, index: t }) {
      return (
        'NGMicrosyntaxKeyedExpression' === e.type &&
        'of' === e.key.name &&
        1 === t
      );
    }
    var u7 = l([
      'CallExpression',
      'OptionalCallExpression',
      'AssignmentExpression'
    ]);
    function u9(e, t, n) {
      let { node: r } = e;
      return nb([nw(nN, e.map(n, 'decorators')), u5(r, t) ? nL : nN]);
    }
    function u4(e, t, n) {
      let { node: r, parent: u } = e,
        { decorators: a } = r;
      if (!s(a) || ae(u) || uY(e)) return '';
      let o =
        'ClassExpression' === r.type ||
        'ClassDeclaration' === r.type ||
        u5(r, t);
      return [
        'declaration' === e.key && W(u) ? nL : o ? nT : '',
        nw(nN, e.map(n, 'decorators')),
        nN
      ];
    }
    function u5(e, t) {
      return e.decorators.some(e => ex(t.originalText, P(e)));
    }
    function ae(e) {
      if (
        'ExportDefaultDeclaration' !== e.type &&
        'ExportNamedDeclaration' !== e.type &&
        'DeclareExportDeclaration' !== e.type
      )
        return !1;
      let t = e.declaration?.decorators;
      return s(t) && k(e, t[0]);
    }
    function at(e) {
      return (
        'UnaryExpression' === e.type &&
        ('+' === e.operator || '-' === e.operator) &&
        I(e.argument)
      );
    }
    function an(e, t, n) {
      let { node: r } = e,
        u = [],
        a = q(r) ? 'elementTypes' : 'elements',
        o = r[a];
      if (0 !== o.length || r.inexact) {
        var i, s, p, l, c, D, d, m, f;
        let F,
          E,
          A = y(0, o, -1),
          C = A?.type !== 'RestElement' && !r.inexact,
          x = null === A,
          g = Symbol('array'),
          h =
            (!t.__inJestEach &&
              o.length > 1 &&
              o.every((e, t, n) => {
                if (!$(e) && !U(e)) return !1;
                let r = e?.type,
                  u = n[t + 1];
                if (u && r !== u.type) return !1;
                let a = $(e) ? 'elements' : 'properties';
                return e[a] && e[a].length > 1;
              })) ||
            tb(r, 40),
          T = ar(r, t),
          S = C
            ? x
              ? ','
              : rA(t)
                ? T
                  ? nP(',', '', { groupId: g })
                  : nP(',')
                : ''
            : '';
        u.push(
          nb(
            [
              '[',
              ng([
                nM,
                T
                  ? ((i = e),
                    (s = t),
                    (p = n),
                    (l = S),
                    (F = []),
                    i.each(({ isLast: e, next: t }) => {
                      (F.push([p(), e ? l : ',']),
                        e || F.push(au(i, s) ? [nL, nL] : tb(t, 34) ? nL : nN));
                    }, 'elements'),
                    nB(F))
                  : [
                      ((c = e),
                      (D = t),
                      (d = n),
                      (m = a),
                      (f = r.inexact),
                      (E = []),
                      c.each(({ node: e, isLast: t }) => {
                        (E.push(e ? nb(d()) : ''),
                          (!t || f) &&
                            E.push([',', nN, e && au(c, D) ? nM : '']));
                      }, m),
                      f && E.push('...'),
                      E),
                      S
                    ],
                rd(e, t)
              ]),
              nM,
              ']'
            ],
            { shouldBreak: h, id: g }
          )
        );
      } else u.push(nb(['[', rP(e, t), ']']));
      return (u.push(rC(e), r4(e, n)), u);
    }
    function ar(e, t) {
      return (
        $(e) &&
        e.elements.length > 0 &&
        e.elements.every(
          e =>
            e &&
            (I(e) || (at(e) && !tb(e.argument))) &&
            !tb(e, 36, e => !ex(t.originalText, g(e), { backwards: !0 }))
        )
      );
    }
    function au({ node: e }, { originalText: t }) {
      let n = P(e);
      if (n === g(e)) return !1;
      let { length: r } = t;
      for (; n < r && ',' !== t[n];) n = em(t, eE(t, n + 1));
      return rt(t, n);
    }
    function aa(e) {
      return e.quasis.some(e =>
        e.value.raw.includes(`
`)
      );
    }
    function ao(e, t) {
      return (
        (('TemplateLiteral' === e.type && aa(e)) ||
          ('TaggedTemplateExpression' === e.type && aa(e.quasi))) &&
        !ex(t, g(e), { backwards: !0 })
      );
    }
    var ai = new WeakMap();
    function as(e) {
      return d(
        ai,
        e,
        e =>
          'ConditionalExpression' === e.type &&
          !tO(e, e => 'ObjectExpression' === e.type)
      );
    }
    function ap(e, t) {
      let { printWidth: n } = t;
      if (tb(e)) return !1;
      let r = 0.25 * n;
      if (
        'ThisExpression' === e.type ||
        ('Identifier' === e.type && e.name.length <= r) ||
        (at(e) && !tb(e.argument))
      )
        return !0;
      let u =
        ('Literal' === e.type && 'regex' in e && e.regex.pattern) ||
        ('RegExpLiteral' === e.type && e.pattern);
      return u
        ? u.length <= r
        : M(e)
          ? rG(w(e), t).length <= r
          : 'TemplateLiteral' === e.type
            ? 0 === e.expressions.length &&
              e.quasis[0].value.raw.length <= r &&
              !e.quasis[0].value.raw.includes(`
`)
            : 'UnaryExpression' === e.type
              ? ap(e.argument, { printWidth: n })
              : 'CallExpression' === e.type &&
                  0 === e.arguments.length &&
                  'Identifier' === e.callee.type
                ? e.callee.name.length <= r - 2
                : G(e);
    }
    function al(e) {
      return Y(e) || ('BindExpression' === e.type && !!e.object);
    }
    function ac(e) {
      let { node: t, parent: n, key: r } = e;
      return (
        'callee' === r &&
        Q(t) &&
        Q(n) &&
        n.arguments.length > 0 &&
        t.arguments.length > n.arguments.length
      );
    }
    var aD = new Set(['!', '-', '+', '~']),
      ay = l([
        'Identifier',
        'ThisExpression',
        'Super',
        'PrivateName',
        'PrivateIdentifier'
      ]);
    function ad(e, t = 2) {
      if (t <= 0) return !1;
      let n = e => ad(e, t - 1);
      if (N((e = tY(e)))) return 5 >= nQ(e.pattern ?? e.regex.pattern);
      if (G(e) || ay(e) || 'ArgumentPlaceholder' === e.type) return !0;
      if ('TemplateLiteral' === e.type)
        return (
          e.quasis.every(
            e =>
              !e.value.raw.includes(`
`)
          ) && e.expressions.every(n)
        );
      if (U(e))
        return e.properties.every(
          e => !e.computed && (e.shorthand || (e.value && n(e.value)))
        );
      if ($(e)) return e.elements.every(e => null === e || n(e));
      if (ee(e)) {
        if ('ImportExpression' === e.type || ad(e.callee, t)) {
          let r = eS(e);
          return r.length <= t && r.every(n);
        }
        return !1;
      }
      return Y(e)
        ? ad(e.object, t) && ad(e.property, t)
        : (!!('UnaryExpression' === e.type && aD.has(e.operator)) ||
            'UpdateExpression' === e.type) &&
            ad(e.argument, t);
    }
    function am(e, t = !1) {
      if (
        (U(e) && (e.properties.length > 0 || tb(e))) ||
        ($(e) && (e.elements.length > 0 || tb(e))) ||
        ((j(e) || 'TSTypeAssertion' === e.type) && am(e.expression)) ||
        'FunctionExpression' === e.type ||
        'DoExpression' === e.type ||
        'ModuleExpression' === e.type
      )
        return !0;
      if ('ArrowFunctionExpression' === e.type) {
        let { body: n } = e;
        if (
          'BlockStatement' === n.type ||
          H(n) ||
          U(n) ||
          $(n) ||
          ('ArrowFunctionExpression' === n.type && am(n, !0)) ||
          (!t && ('ConditionalExpression' === n.type || Q(tY(n))))
        )
          return !0;
      }
      return !1;
    }
    function af(e, t) {
      let n = e[t],
        r = e[t + 1];
      return (
        'ArrowFunctionExpression' === n.type &&
        0 === F(n).length &&
        'BlockStatement' === n.body.type &&
        'ArrayExpression' === r.type &&
        e.every(e => !tb(e))
      );
    }
    var aF = function (e, t, n) {
      var r;
      let { node: u } = e,
        a = eS(u);
      if (0 === a.length) return nb(['(', rP(e, t), ')']);
      let o = a.length - 1;
      if (
        2 === (r = a).length
          ? af(r, 0)
          : 3 === r.length && 'Identifier' === r[0].type && af(r, 1)
      ) {
        let t = ['('];
        return (
          eB(e, (e, r) => {
            (t.push(n()), r !== o && t.push(', '));
          }),
          t.push(')'),
          t
        );
      }
      let i = !1,
        s = [];
      eB(e, ({ node: e }, r) => {
        let u = n();
        (r === o ||
          (rn(e, t) ? ((i = !0), (u = [u, ',', nL, nL])) : (u = [u, ',', nN])),
          s.push(u));
      });
      let p =
        'NGRoot' !== e.root.type &&
        'ImportExpression' !== u.type &&
        'TSImportType' !== u.type &&
        'TSExternalModuleReference' !== u.type
          ? rk(t, 'all')
          : '';
      function l() {
        return nb(['(', ng([nN, ...s]), p, nN, ')'], { shouldBreak: !0 });
      }
      if (
        i ||
        ('Decorator' !== e.parent.type &&
          (function (e) {
            if (e.length <= 1) return !1;
            let t = 0;
            for (let n of e)
              if (K(n)) {
                if ((t += 1) > 1) return !0;
              } else if (Q((n = tY(n)))) {
                for (let e of eS(n)) if (K(e)) return !0;
              }
            return !1;
          })(a))
      )
        return l();
      if (
        (function (e) {
          if (2 !== e.length) return !1;
          let [t, n] = e;
          return (
            !!(
              'ModuleExpression' === t.type &&
              (function (e) {
                if ('ObjectExpression' !== e.type || 1 !== e.properties.length)
                  return !1;
                let [t] = e.properties;
                return (
                  !!eL(t) &&
                  !t.computed &&
                  (('Identifier' === t.key.type && 'type' === t.key.name) ||
                    (M(t.key) && 'type' === t.key.value)) &&
                  M(t.value) &&
                  'module' === t.value.value
                );
              })(n)
            ) ||
            (!tb(t) &&
              ('FunctionExpression' === t.type ||
                ('ArrowFunctionExpression' === t.type &&
                  'BlockStatement' === t.body.type)) &&
              'FunctionExpression' !== n.type &&
              'ArrowFunctionExpression' !== n.type &&
              'ConditionalExpression' !== n.type &&
              (function e(t) {
                if ('ParenthesizedExpression' === t.type)
                  return e(t.expression);
                if (j(t) || 'TypeCastExpression' === t.type) {
                  let { typeAnnotation: e } = t;
                  if (
                    ('TypeAnnotation' === e.type && (e = e.typeAnnotation),
                    'TSArrayType' === e.type &&
                      'TSArrayType' === (e = e.elementType).type &&
                      (e = e.elementType),
                    'GenericTypeAnnotation' === e.type ||
                      'TSTypeReference' === e.type)
                  ) {
                    let t =
                      'GenericTypeAnnotation' === e.type
                        ? e.typeParameters
                        : e.typeArguments;
                    t?.params.length === 1 && (e = t.params[0]);
                  }
                  return ro(e) && ad(t.expression, 1);
                }
                return (
                  (!ee(t) || !(eS(t).length > 1)) &&
                  (z(t) ? ad(t.left, 1) && ad(t.right, 1) : N(t) || ad(t))
                );
              })(n) &&
              !am(n))
          );
        })(a)
      ) {
        let e,
          t = s.slice(1);
        if (t.some(nm)) return l();
        try {
          e = n(eb(u, 0), { expandFirstArg: !0 });
        } catch (e) {
          if (e instanceof n5) return l();
          throw e;
        }
        return nm(e)
          ? [nT, nv([['(', nb(e, { shouldBreak: !0 }), ', ', ...t, ')'], l()])]
          : nv([
              ['(', e, ', ', ...t, ')'],
              ['(', nb(e, { shouldBreak: !0 }), ', ', ...t, ')'],
              l()
            ]);
      }
      if (
        (function (e, t, n) {
          if (1 === e.length) {
            let e = y(0, t, -1);
            if (e.label?.embed && e.label?.hug !== !1) return !0;
          }
          let r = y(0, e, -1),
            u = y(0, e, -2);
          return (
            !tb(r, 2) &&
            !tb(r, 4) &&
            am(r) &&
            (!u || u.type !== r.type) &&
            (2 !== e.length || 'ArrowFunctionExpression' !== u.type || !$(r)) &&
            !(e.length > 1 && ar(r, n))
          );
        })(a, s, t)
      ) {
        let e,
          t = s.slice(0, -1);
        if (t.some(nm)) return l();
        try {
          e = n(eb(u, -1), { expandLastArg: !0 });
        } catch (e) {
          if (e instanceof n5) return l();
          throw e;
        }
        return nm(e)
          ? [nT, nv([['(', ...t, nb(e, { shouldBreak: !0 }), ')'], l()])]
          : nv([
              ['(', ...t, e, ')'],
              ['(', ...t, nb(e, { shouldBreak: !0 }), ')'],
              l()
            ]);
      }
      let c = ['(', ng([nM, ...s]), p, nM, ')'];
      return ac(e) ? c : nb(c, { shouldBreak: s.some(nm) || i });
    };
    function aE(e, t, n) {
      return ['::', n('callee')];
    }
    function aA(e, t, n) {
      let r = n('property'),
        { node: u } = e,
        a = rC(e);
      return u.computed
        ? !u.property || I(u.property)
          ? [a, '[', r, ']']
          : nb([a, '[', ng([nM, r]), nM, ']'])
        : [a, '.', r];
    }
    var aC = function (e, t, n) {
      var r;
      let u,
        a,
        o =
          'ExpressionStatement' ===
          ('ChainExpression' === e.parent.type ? e.grandparent : e.parent).type,
        i = [];
      function s(e) {
        let { originalText: n } = t,
          r = eA(n, P(e));
        return ')' === n.charAt(r) ? !1 !== r && rt(n, r + 1) : rn(e, t);
      }
      let { node: p } = e;
      (i.unshift({
        node: p,
        printed: [rC(e), n('typeArguments'), aF(e, t, n)]
      }),
        p.callee &&
          e.call(function r() {
            let { node: u } = e;
            if (Q(u) && (al(u.callee) || Q(u.callee)) && !t1(e, t)) {
              let a = s(u);
              (i.unshift({
                node: u,
                hasTrailingEmptyLine: a,
                printed: [
                  rE(e, [rC(e), n('typeArguments'), aF(e, t, n)], t),
                  a ? nL : ''
                ]
              }),
                e.call(r, 'callee'));
            } else
              al(u) && !t1(e, t)
                ? (i.unshift({
                    node: u,
                    printed: rE(e, Y(u) ? aA(e, t, n) : aE(e, t, n), t)
                  }),
                  e.call(r, 'object'))
                : 'ChainExpression' !== u.type || t1(e, t)
                  ? 'TSNonNullExpression' !== u.type || t1(e, t)
                    ? i.unshift({ node: u, printed: n() })
                    : (i.unshift({ node: u, printed: rE(e, '!', t) }),
                      e.call(r, 'expression'))
                  : e.call(r, 'expression');
          }, 'callee'));
      let l = [],
        c = [i[0]],
        D = 1;
      for (
        ;
        D < i.length &&
        ('TSNonNullExpression' === i[D].node.type ||
          'ChainExpression' === i[D].node.type ||
          Q(i[D].node) ||
          (Y(i[D].node) && i[D].node.computed && I(i[D].node.property)));
        ++D
      )
        c.push(i[D]);
      if (!Q(i[0].node))
        for (; D + 1 < i.length && al(i[D].node) && al(i[D + 1].node); ++D)
          c.push(i[D]);
      (l.push(c), (c = []));
      let d = !1;
      for (; D < i.length; ++D) {
        if (d && al(i[D].node)) {
          if (i[D].node.computed && I(i[D].node.property)) {
            c.push(i[D]);
            continue;
          }
          (l.push(c), (c = []), (d = !1));
        }
        ((Q(i[D].node) || 'ImportExpression' === i[D].node.type) && (d = !0),
          c.push(i[D]),
          tb(i[D].node, 4) && (l.push(c), (c = []), (d = !1)));
      }
      function m(e) {
        return /^[A-Z]|^[$_]+$/.test(e);
      }
      c.length > 0 && l.push(c);
      let f =
        l.length >= 2 &&
        !tb(l[1][0].node) &&
        (function (e) {
          let n = e[1][0]?.node.computed;
          if (1 === e[0].length) {
            let r = e[0][0].node;
            return (
              'ThisExpression' === r.type ||
              ('Identifier' === r.type &&
                (m(r.name) || (o && r.name.length <= t.tabWidth) || n))
            );
          }
          let r = y(0, e[0], -1).node;
          return (
            Y(r) &&
            'Identifier' === r.property.type &&
            (m(r.property.name) || n)
          );
        })(l);
      function F(e) {
        return e.map(e => e.printed);
      }
      let E = l.map(F),
        A = f ? 3 : 2,
        C = l.flat(),
        x =
          C.slice(1, -1).some(e => tb(e.node, 2)) ||
          C.slice(0, -1).some(e => tb(e.node, 4)) ||
          (l[A] && tb(l[A][0].node, 2));
      if (
        l.length <= A &&
        !x &&
        l.every(e => !y(0, e, -1).hasTrailingEmptyLine)
      )
        return ac(e) ? E : nb(E);
      let g = y(0, l[+!!f], -1).node,
        h = !Q(g) && s(g),
        T = [
          F(l[0]),
          f ? l.slice(1, 2).map(F) : '',
          h ? nL : '',
          0 === (r = l.slice(f ? 2 : 1)).length
            ? ''
            : ng([nL, nw(nL, r.map(F))])
        ],
        S = i.map(({ node: e }) => e).filter(Q);
      return nI(
        { memberChain: !0 },
        x ||
          (S.length > 2 && S.some(e => e.arguments.some(e => !ad(e)))) ||
          E.slice(0, -1).some(nm) ||
          ((u = y(0, y(0, l, -1), -1).node),
          (a = y(0, E, -1)),
          Q(u) && nm(a) && S.slice(0, -1).some(e => e.arguments.some(K)))
          ? nb(T)
          : [nm(E) || h ? nT : '', nv([E, T])]
      );
    };
    function ax(e, t, n) {
      let { node: r } = e,
        u = 'NewExpression' === r.type,
        a = rC(e),
        o = eS(r),
        i =
          'TSImportType' !== r.type && r.typeArguments
            ? [n('typeArguments'), nq]
            : '',
        s = 1 === o.length && ao(o[0], t.originalText);
      if (
        s ||
        (function (e) {
          let { node: t } = e;
          if (!(
            'ImportExpression' === t.type ||
            'TSImportType' === t.type ||
            'TSExternalModuleReference' === t.type ||
            ('CallExpression' === t.type && !t.optional && ri(t.callee, ah))
          ))
            return !1;
          let n = eS(t);
          return 1 === n.length && M(n[0]) && !tb(n[0]);
        })(e) ||
        (function (e) {
          let { node: t } = e;
          if (
            'CallExpression' !== t.type ||
            t.optional ||
            'Identifier' !== t.callee.type
          )
            return !1;
          let n = eS(t);
          return 'require' === t.callee.name
            ? ((1 === n.length && M(n[0])) || n.length > 1) && !tb(n[0])
            : 'define' === t.callee.name &&
                'ExpressionStatement' === e.parent.type &&
                (1 === n.length ||
                  (2 === n.length && 'ArrayExpression' === n[0].type) ||
                  (3 === n.length &&
                    M(n[0]) &&
                    'ArrayExpression' === n[1].type));
        })(e) ||
        rl(r, e.parent)
      ) {
        let t = [];
        if (
          (eB(e, () => {
            t.push(n());
          }),
          !(s && t[0].label?.embed))
        )
          return [ag(e, n), a, i, '(', nw(', ', t), ')'];
      }
      let p =
        'ImportExpression' === r.type ||
        'TSImportType' === r.type ||
        'TSExternalModuleReference' === r.type;
      if (
        !p &&
        !u &&
        al(r.callee) &&
        !e.call(
          () => t1(e, t),
          'callee',
          ...('ChainExpression' === r.callee.type ? ['expression'] : [])
        )
      )
        return aC(e, t, n);
      let l = [ag(e, n), a, i, aF(e, t, n)];
      return p || Q(r.callee) ? nb(l) : l;
    }
    function ag(e, t) {
      let { node: n } = e;
      return 'ImportExpression' === n.type
        ? `import${n.phase ? `.${n.phase}` : ''}`
        : 'TSImportType' === n.type
          ? 'import'
          : 'TSExternalModuleReference' === n.type
            ? 'require'
            : ['NewExpression' === n.type ? 'new ' : '', t('callee'), nq];
    }
    var ah = [
      'require',
      'require.resolve',
      'require.resolve.paths',
      'import.meta.resolve'
    ];
    function aT(e, t, n, r, u, a) {
      let o = (function (e, t, n, r, u) {
          var a, o, i, p;
          let { node: l } = e,
            c = l[u];
          if (!c) return 'only-left';
          let D = !aS(c);
          if (
            e.match(
              aS,
              aB,
              e =>
                !D ||
                ('ExpressionStatement' !== e.type &&
                  'VariableDeclaration' !== e.type)
            )
          )
            return D
              ? 'ArrowFunctionExpression' === c.type &&
                'ArrowFunctionExpression' === c.body.type
                ? 'chain-tail-arrow-chain'
                : 'chain-tail'
              : 'chain';
          if (
            (!D && aS(c.right)) ||
            (O(c) && !r3(c)) ||
            tH(t.originalText, c) ||
            tb(c, 2, uH)
          )
            return 'break-after-operator';
          if (
            'ImportAttribute' === l.type ||
            ('CallExpression' === c.type && 'require' === c.callee.name) ||
            'JsonRoot' === e.root.type
          )
            return 'never-break-after-operator';
          let y = ny(r, nC, !1);
          if (
            (function (e) {
              if (aB(e)) {
                let t = e.left || e.id;
                return (
                  'ObjectPattern' === t.type &&
                  t.properties.length > 2 &&
                  t.properties.some(
                    e =>
                      eL(e) &&
                      (!e.shorthand || e.value?.type === 'AssignmentPattern')
                  )
                );
              }
              return !1;
            })(l) ||
            (function (e) {
              if ('VariableDeclarator' !== e.type) return !1;
              let { typeAnnotation: t } = e.id;
              if (!t || !t.typeAnnotation) return !1;
              let n = av(t.typeAnnotation);
              return (
                s(n) &&
                n.length > 1 &&
                n.some(e => s(av(e)) || 'TSConditionalType' === e.type)
              );
            })(l) ||
            (ab(l) && y)
          )
            return 'break-lhs';
          let d =
            ((o = l),
            (i = r),
            (p = t),
            !!eL(o) &&
              'string' == typeof (i = nE(i)) &&
              nQ(i) < p.tabWidth + 3);
          return e.call(
            () =>
              (function (e, t, n, r) {
                let u = e.node;
                if (z(u) && !u2(u)) return !0;
                switch (u.type) {
                  case 'StringLiteralTypeAnnotation':
                  case 'SequenceExpression':
                    return !0;
                  case 'TSConditionalType':
                  case 'ConditionalTypeAnnotation':
                    var a;
                    if (
                      !t.experimentalTernaries &&
                      !(aP((a = u).checkType) || aP(a.extendsType))
                    )
                      break;
                    return !0;
                  case 'ConditionalExpression': {
                    if (!t.experimentalTernaries) {
                      let { test: e } = u;
                      return z(e) && !u2(e);
                    }
                    let { consequent: e, alternate: n } = u;
                    return (
                      'ConditionalExpression' === e.type ||
                      'ConditionalExpression' === n.type
                    );
                  }
                  case 'ClassExpression':
                    return s(u.decorators);
                }
                if (r) return !1;
                let o = u,
                  i = [];
                for (;;)
                  if (
                    'UnaryExpression' === o.type ||
                    'AwaitExpression' === o.type ||
                    ('YieldExpression' === o.type && null !== o.argument)
                  )
                    ((o = o.argument), i.push('argument'));
                  else if ('TSNonNullExpression' === o.type)
                    ((o = o.expression), i.push('expression'));
                  else break;
                return !!(
                  M(o) ||
                  e.call(
                    () =>
                      (function e(t, n, r, u = !1) {
                        let { node: a } = t,
                          o = () => e(t, n, r, !0);
                        if (et(a)) return t.call(o, 'expression');
                        if (Q(a)) {
                          if (ax(t, n, r).label?.memberChain) return !1;
                          let e = eS(a);
                          return (
                            !(
                              !(
                                0 === e.length ||
                                (1 === e.length && ap(e[0], n))
                              ) ||
                              (function (e, t) {
                                let n = e.typeArguments?.params;
                                if (s(n)) {
                                  if (n.length > 1) return !0;
                                  if (1 === n.length) {
                                    let e = n[0];
                                    if (
                                      O(e) ||
                                      J(e) ||
                                      'TSTypeLiteral' === e.type ||
                                      'ObjectTypeAnnotation' === e.type
                                    )
                                      return !0;
                                  }
                                  if (nm(t('typeArguments'))) return !0;
                                }
                                return !1;
                              })(a, r)
                            ) && t.call(o, 'callee')
                          );
                        }
                        return Y(a)
                          ? t.call(o, 'object')
                          : u &&
                              ('Identifier' === a.type ||
                                'ThisExpression' === a.type);
                      })(e, t, n),
                    ...i
                  )
                );
              })(e, t, n, d),
            u
          )
            ? 'break-after-operator'
            : !(function (e) {
                  let t = (function (e) {
                    if (X(e)) return e.typeParameters?.params;
                  })(e);
                  if (s(t)) {
                    let n =
                      'TSTypeAliasDeclaration' === e.type
                        ? 'constraint'
                        : 'bound';
                    if (t.length > 1 && t.some(e => e[n] || e.default))
                      return !0;
                  }
                  return !1;
                })(l)
              ? !y &&
                (d ||
                  'TemplateLiteral' === c.type ||
                  'TaggedTemplateExpression' === c.type ||
                  'BooleanLiteral' === (a = c).type ||
                  ('Literal' === a.type && 'boolean' == typeof a.value) ||
                  I(c) ||
                  'ClassExpression' === c.type)
                ? 'never-break-after-operator'
                : 'fluid'
              : 'break-lhs';
        })(e, t, n, r, a),
        i = a ? n(a, { assignmentLayout: o }) : '';
      switch (o) {
        case 'break-after-operator':
          return nb([nb(r), u, nb(ng([nN, i]))]);
        case 'never-break-after-operator':
          return nb([nb(r), u, ' ', i]);
        case 'fluid': {
          let e = Symbol('assignment');
          return nb([
            nb(r),
            u,
            nb(ng(nN), { id: e }),
            nq,
            nk(i, { groupId: e })
          ]);
        }
        case 'break-lhs':
          return nb([r, u, ' ', nb(i)]);
        case 'chain':
          return [nb(r), u, nN, i];
        case 'chain-tail':
          return [nb(r), u, ng([nN, i])];
        case 'chain-tail-arrow-chain':
          return [nb(r), u, i];
        case 'only-left':
          return r;
      }
    }
    function aS(e) {
      return 'AssignmentExpression' === e.type;
    }
    function aB(e) {
      return aS(e) || 'VariableDeclarator' === e.type;
    }
    function ab(e) {
      return (
        'VariableDeclarator' === e.type &&
        e.init?.type === 'ArrowFunctionExpression'
      );
    }
    function av(e) {
      let t;
      switch (e.type) {
        case 'GenericTypeAnnotation':
          t = e.typeParameters;
          break;
        case 'TSTypeReference':
          t = e.typeArguments;
      }
      return t?.params;
    }
    function aP(e) {
      switch (e.type) {
        case 'FunctionTypeAnnotation':
        case 'GenericTypeAnnotation':
        case 'TSFunctionType':
          return !!e.typeParameters;
        case 'TSTypeReference':
          return !!e.typeArguments;
        default:
          return !1;
      }
    }
    var ak =
        Array.prototype.findLast ??
        function (e) {
          for (let t = this.length - 1; t >= 0; t--) {
            let n = this[t];
            if (e(n, t, this)) return n;
          }
        },
      aw = c('findLast', function () {
        if (Array.isArray(this)) return ak;
      });
    function aI(e, t, n, r) {
      let { node: u } = e,
        a = [],
        o = aw(0, u[r], e => 'EmptyStatement' !== e.type);
      return (
        e.each(({ node: e }) => {
          'EmptyStatement' !== e.type &&
            (a.push(n()), e !== o && (a.push(nL), rn(e, t) && a.push(nL)));
        }, r),
        a
      );
    }
    function aN(e, t, n) {
      let r = (function (e, t, n) {
          let { node: r } = e,
            u = s(r.directives),
            a = r.body.some(e => 'EmptyStatement' !== e.type),
            o = tb(r, 8);
          if (!u && !a && !o) return '';
          let i = [];
          return (
            u &&
              (i.push(aI(e, t, n, 'directives')),
              (a || o) &&
                (i.push(nL), rn(y(0, r.directives, -1), t) && i.push(nL))),
            a && i.push(aI(e, t, n, 'body')),
            o && i.push(rd(e, t)),
            i
          );
        })(e, t, n),
        { node: u, parent: a } = e;
      if ('Program' === u.type && a?.type !== 'ModuleExpression')
        return r ? [r, nL] : '';
      let o = [];
      if (('StaticBlock' === u.type && o.push('static '), o.push('{'), r))
        o.push(ng([nL, r]), nL);
      else {
        let t = e.grandparent;
        'ArrowFunctionExpression' !== a.type &&
          'FunctionExpression' !== a.type &&
          'FunctionDeclaration' !== a.type &&
          'ComponentDeclaration' !== a.type &&
          'HookDeclaration' !== a.type &&
          'ObjectMethod' !== a.type &&
          'ClassMethod' !== a.type &&
          'ClassPrivateMethod' !== a.type &&
          'ForStatement' !== a.type &&
          'WhileStatement' !== a.type &&
          'DoWhileStatement' !== a.type &&
          'DoExpression' !== a.type &&
          'ModuleExpression' !== a.type &&
          ('CatchClause' !== a.type || t.finalizer) &&
          'TSModuleDeclaration' !== a.type &&
          'DeclareModule' !== a.type &&
          'MatchStatementCase' !== a.type &&
          'StaticBlock' !== u.type &&
          o.push(nL);
      }
      return (o.push('}'), o);
    }
    var aM = ['properties', 'indexers', 'callProperties', 'internalSlots'];
    function aj(e, t, n) {
      let { node: r } = e,
        u = [],
        a = 'ObjectTypeAnnotation' === r.type,
        o = 'RecordDeclarationBody' === r.type,
        i = !aL(e),
        s = i ? nN : nL,
        p = tb(r, 8),
        [l, c] = a && r.exact ? ['{|', '|}'] : '{}',
        D = !0,
        d;
      if (
        ((function (e, t) {
          let { node: n } = e;
          if ('ClassBody' === n.type || 'TSInterfaceBody' === n.type)
            return e.each(t, 'body');
          if ('TSTypeLiteral' === n.type) return e.each(t, 'members');
          if ('RecordDeclarationBody' === n.type) return e.each(t, 'elements');
          if ('ObjectTypeAnnotation' === n.type) {
            let n = aM
              .flatMap(t =>
                e.map(
                  ({ node: e, index: n }) => ({
                    node: e,
                    loc: g(e),
                    selector: [t, n]
                  }),
                  t
                )
              )
              .sort((e, t) => e.loc - t.loc);
            for (let [r, { node: u, selector: a }] of n.entries())
              e.call(
                () =>
                  t({
                    node: u,
                    next: n[r + 1]?.node,
                    isLast: r === n.length - 1
                  }),
                ...a
              );
          }
        })(e, ({ node: r, next: p, isLast: l }) => {
          if ((d ?? (d = r), D && (D = !1), u.push(n()), !o && i && a)) {
            let { parent: n } = e;
            n.inexact || !l ? u.push(',') : u.push(rk(t));
          }
          (o && 'MethodDefinition' !== r.type && u.push(','),
            !o &&
              !i &&
              ((function ({ node: e, next: t }, n) {
                if (n.semi || !aJ(e)) return !1;
                if (!e.value && aq(e)) return !0;
                if (!t || t.static || t.accessibility || t.readonly) return !1;
                if (!t.computed) {
                  let e = t.key?.name;
                  if ('in' === e || 'instanceof' === e) return !0;
                }
                if (aJ(t) && !t.static && t.variance && !t.declare) return !0;
                switch (t.type) {
                  case 'ClassProperty':
                  case 'PropertyDefinition':
                  case 'TSAbstractPropertyDefinition':
                    return t.computed;
                  case 'MethodDefinition':
                  case 'TSAbstractMethodDefinition':
                  case 'ClassMethod':
                  case 'ClassPrivateMethod': {
                    if (
                      (t.value ? t.value.async : t.async) ||
                      'get' === t.kind ||
                      'set' === t.kind
                    )
                      return !1;
                    let e = t.value ? t.value.generator : t.generator;
                    return !!(t.computed || e);
                  }
                  case 'TSIndexSignature':
                    return !0;
                }
                return !1;
              })({ node: r, next: p }, t) ||
                aX({ node: r, next: p }, t)) &&
              u.push(';'),
            l || (u.push(s), rn(r, t) && u.push(nL)));
        }),
        p && u.push(rd(e, t)),
        'ObjectTypeAnnotation' === r.type && r.inexact)
      ) {
        let e;
        (D && (D = !1),
          (e = tb(r, 8)
            ? [
                tb(r, 32) || ex(t.originalText, P(y(0, tv(r), -1))) ? nL : nN,
                '...'
              ]
            : [d ? nN : '', '...']),
          u.push(e));
      }
      if (i) {
        let n =
            tb(r, 40) ||
            ('preserve' === t.objectWrap &&
              d &&
              eg(t.originalText, g(r), g(d))),
          a;
        if (0 === u.length) a = l + c;
        else {
          let e = t.bracketSpacing && (!D || n) ? nN : nM;
          a = [l, ng([e, ...u]), e, c];
        }
        return e.match(
          void 0,
          (e, t) => 'typeAnnotation' === t,
          (e, t) => 'typeAnnotation' === t,
          rL
        ) ||
          e.match(
            void 0,
            (e, t) => 'FunctionTypeParam' === e.type && 'typeAnnotation' === t,
            rL
          )
          ? a
          : nb(a, { shouldBreak: n });
      }
      return [l, u.length > 0 ? [ng([nL, u]), nL] : '', c];
    }
    function aL(e) {
      let { node: t } = e;
      if ('ObjectTypeAnnotation' === t.type) {
        let { key: t, parent: n } = e;
        return (
          'body' === t &&
          ('InterfaceDeclaration' === n.type ||
            'DeclareInterface' === n.type ||
            'DeclareClass' === n.type)
        );
      }
      return (
        'ClassBody' === t.type ||
        'TSInterfaceBody' === t.type ||
        'RecordDeclarationBody' === t.type
      );
    }
    function aO(e, t) {
      let { parent: n } = e;
      return e.callParent(aL)
        ? 'ObjectTypeAnnotation' === n.type
          ? ';'
          : rw(t)
        : 'TSTypeLiteral' === n.type
          ? e.isLast
            ? t.semi
              ? nP(';')
              : ''
            : t.semi || aX({ node: e.node, next: e.next }, t)
              ? ';'
              : nP('', ';')
          : '';
    }
    var aJ = l([
        'ClassProperty',
        'PropertyDefinition',
        'ClassPrivateProperty',
        'ClassAccessorProperty',
        'AccessorProperty',
        'TSAbstractPropertyDefinition',
        'TSAbstractAccessorProperty'
      ]),
      aq = e => {
        if (e.computed || e.typeAnnotation) return !1;
        let { type: t, name: n } = e.key;
        return (
          'Identifier' === t && ('static' === n || 'get' === n || 'set' === n)
        );
      },
      aR = l(['TSPropertySignature']);
    function aX({ node: e, next: t }, n) {
      return (
        !n.semi &&
        !!aR(e) &&
        (!!aq(e) ||
          (!!t &&
            'TSCallSignatureDeclaration' === t.type &&
            !('TSPropertySignature' === e.type && e.typeAnnotation)))
      );
    }
    var a_ = ((r = new WeakMap()), e => d(r, e, () => Symbol('heritageGroup'))),
      aW = l([
        'TSInterfaceDeclaration',
        'DeclareInterface',
        'InterfaceDeclaration',
        'InterfaceTypeAnnotation'
      ]);
    function a$(e, t, n) {
      let r = (function (e, t, n) {
          var r;
          let u,
            { node: a } = e,
            o = aW(a),
            i = 'RecordDeclaration' === a.type,
            p = [rh(e), rS(e), o ? 'interface' : i ? 'record' : 'class'],
            l = aV(e),
            c = [],
            D = [];
          if ('InterfaceTypeAnnotation' !== a.type) {
            for (let r of (a.id && c.push(' '), ['id', 'typeParameters']))
              if (a[r]) {
                let { leading: u, trailing: a } = e.call(() => rF(e, t), r);
                c.push(u, n(r), ng(a));
              }
          }
          if (a.superClass) {
            let r = [
                (function (e, t) {
                  let n = t('superClass'),
                    { parent: r } = e;
                  return 'AssignmentExpression' === r.type
                    ? nb(nP(['(', ng([nM, n]), nM, ')'], n))
                    : n;
                })(e, n),
                n('superTypeArguments')
              ],
              u = e.call(() => ['extends ', rE(e, r, t)], 'superClass');
            l ? D.push(nN, nb(u)) : D.push(' ', u);
          } else D.push(aK(e, t, n, 'extends'));
          return (
            D.push(aK(e, t, n, 'mixins'), aK(e, t, n, 'implements')),
            l
              ? ((u = a_(a)), p.push(nb([...c, ng(D)], { id: u })))
              : p.push(...c, ...D),
            !o &&
            l &&
            ('ObjectTypeAnnotation' === (r = a.body).type
              ? aM.some(e => s(r[e]))
              : s('RecordDeclarationBody' === r.type ? r.elements : r.body))
              ? p.push(nP(nL, ' ', { groupId: u }))
              : p.push(' '),
            p.push(n('body')),
            p
          );
        })(e, t, n),
        { node: u } = e;
      if ('ClassExpression' === u.type && s(u.decorators)) {
        let u = u4(e, t, n);
        return t1(e, t) ? [ng([nM, u, r]), nM] : [u, r];
      }
      return r;
    }
    function aU(e) {
      let t = +!!e.superClass;
      for (let n of ['extends', 'mixins', 'implements'])
        if ((Array.isArray(e[n]) && (t += e[n].length), t > 1)) return !0;
      return t > 1;
    }
    var aG = new WeakMap();
    function aV(e) {
      return d(aG, e.node, () =>
        (function (e) {
          let { node: t } = e;
          if (
            tb(t.id, 4) ||
            tb(t.typeParameters, 4) ||
            tb(t.superClass) ||
            aU(t)
          )
            return !0;
          if (t.superClass)
            return (
              'AssignmentExpression' !== e.parent.type &&
              !t.superTypeArguments &&
              Y(tY(t.superClass))
            );
          let n = t.extends?.[0] ?? t.mixins?.[0] ?? t.implements?.[0];
          return (
            !!n &&
            (('InterfaceExtends' === n.type &&
              'QualifiedTypeIdentifier' === n.id.type &&
              !n.typeParameters) ||
              (('TSClassImplements' === n.type ||
                'TSInterfaceHeritage' === n.type) &&
                Y(n.expression) &&
                !n.typeArguments))
          );
        })(e)
      );
    }
    function aK(e, t, n, r) {
      let { node: u } = e;
      if (!s(u[r])) return '';
      let a = rd(e, t, { marker: r }),
        o = nw([',', nN], e.map(n, r));
      if (!aU(u)) {
        let t = [`${r} `, a, o];
        return aV(e) ? [nN, nb(t)] : [' ', t];
      }
      return [nN, a, a && nL, r, nb(ng([nN, o]))];
    }
    function aH(e, t, n) {
      let { node: r } = e,
        u = [];
      return (
        s(r.decorators) && u.push(u9(e, t, n)),
        u.push(rB(r)),
        r.static && u.push('static '),
        u.push(rS(e)),
        r.override && u.push('override '),
        u.push(un(e, t, n)),
        u
      );
    }
    function az(e, t, n) {
      let { node: r } = e,
        u = [];
      return (
        s(r.decorators) && u.push(u9(e, t, n)),
        u.push(rh(e), rB(r)),
        r.static && u.push('static '),
        u.push(rS(e)),
        r.override && u.push('override '),
        r.readonly && u.push('readonly '),
        r.variance && u.push(n('variance')),
        ('ClassAccessorProperty' === r.type ||
          'AccessorProperty' === r.type ||
          'TSAbstractAccessorProperty' === r.type) &&
          u.push('accessor '),
        u.push(r0(e, t, n), rC(e), rx(e), r4(e, n)),
        [
          aT(
            e,
            t,
            n,
            u,
            ' =',
            'TSAbstractPropertyDefinition' === r.type ||
              'TSAbstractAccessorProperty' === r.type
              ? void 0
              : 'value'
          ),
          rw(t)
        ]
      );
    }
    function aQ(e, t, n, r = 'body') {
      return e.call(({ node: r }) => {
        let u = n();
        if ('EmptyStatement' === r.type) return tb(r, 2) ? [' ', u] : u;
        let a = 'BlockStatement' === r.type;
        return !(function (e, t) {
          let n = tv(e, 2);
          if (0 === n.length) return !1;
          let [r] = n,
            u = t.originalText,
            a = g(r);
          return eg(u, a, P(r)) || ex(u, a, { backwards: !0 });
        })(r, t)
          ? a ||
            ('IfStatement' === r.type &&
              'IfStatement' === e.parent.type &&
              'alternate' === e.key)
            ? [' ', u]
            : ng([nN, u])
          : a
            ? [nL, u]
            : ng([nL, u]);
      }, r);
    }
    var aY = l([
        'TSAsExpression',
        'TSTypeAssertion',
        'TSNonNullExpression',
        'TSInstantiationExpression',
        'TSSatisfiesExpression'
      ]),
      aZ = l(['FunctionExpression', 'ArrowFunctionExpression']);
    function a0(e) {
      return ej(y(0, tv(e, 8), -1));
    }
    function a1(e) {
      return e.toLowerCase();
    }
    function a2({ pattern: e, flags: t }) {
      return ((t = [...t].sort().join('')), `/${e}/${t}`);
    }
    function a8(e, t) {
      let n = e.slice(1, -1);
      if ('use strict' === n || !(n.includes('"') || n.includes("'"))) {
        let e = t.singleQuote ? "'" : '"';
        return e + n + e;
      }
      return e;
    }
    var a3 = l([
        'ImportDeclaration',
        'ExportDefaultDeclaration',
        'ExportNamedDeclaration',
        'ExportAllDeclaration',
        'DeclareExportDeclaration',
        'DeclareExportAllDeclaration'
      ]),
      a6 = l([
        'EnumBody',
        'EnumBooleanBody',
        'EnumNumberBody',
        'EnumBigIntBody',
        'EnumStringBody',
        'EnumSymbolBody'
      ]);
    function a7(e, t, n) {
      var r, u, a;
      let o,
        i,
        p,
        { node: l, parent: c } = e,
        D = a6(l),
        d = 'TSEnumBody' === l.type || D,
        m = a3(l),
        f = D && l.hasUnknownMembers,
        F = d ? 'members' : m ? 'attributes' : 'properties',
        E = l[F],
        A =
          d ||
          ('ObjectPattern' === l.type &&
            'FunctionDeclaration' !== c.type &&
            'FunctionExpression' !== c.type &&
            'ArrowFunctionExpression' !== c.type &&
            'ObjectMethod' !== c.type &&
            'ClassMethod' !== c.type &&
            'ClassPrivateMethod' !== c.type &&
            'AssignmentPattern' !== c.type &&
            'CatchClause' !== c.type &&
            l.properties.some(
              e =>
                e.value &&
                ('ObjectPattern' === e.value.type ||
                  'ArrayPattern' === e.value.type)
            )) ||
          ('ObjectPattern' !== l.type &&
            'preserve' === t.objectWrap &&
            E.length > 0 &&
            ((r = l),
            (u = E[0]),
            (o = (a = t).originalText),
            (i = g(u)),
            (p = g(r)),
            a3(r) && (p = eI(a).lastIndexOf('{', i)),
            eg(o, p, i))),
        C = [],
        x = e.map(({ node: e }) => {
          let r = [...C, n()];
          return ((C = [',', nN]), rn(e, t) && C.push(nL), r);
        }, F);
      if (f) {
        let n;
        if (tb(l, 8)) {
          let r = tb(l, 32);
          n = [
            rd(e, t),
            r || ex(t.originalText, P(y(0, tv(l), -1))) ? nL : nN,
            '...'
          ];
        } else n = ['...'];
        x.push([...C, ...n]);
      }
      let h = !(f || y(0, E, -1)?.type === 'RestElement'),
        T;
      if (0 === x.length) T = nb(['{', rP(e, t), '}', rC(e), r4(e, n)]);
      else {
        let r = t.bracketSpacing ? nN : nM;
        T = ['{', ng([r, ...x]), h ? rk(t) : '', r, '}', rC(e), r4(e, n)];
      }
      return e.match(e => 'ObjectPattern' === e.type && !s(e.decorators), rL) ||
        (V(l) &&
          (e.match(
            void 0,
            (e, t) => 'typeAnnotation' === t,
            (e, t) => 'typeAnnotation' === t,
            rL
          ) ||
            e.match(
              void 0,
              (e, t) =>
                'FunctionTypeParam' === e.type && 'typeAnnotation' === t,
              rL
            ))) ||
        (!A &&
          e.match(
            e => 'ObjectPattern' === e.type,
            e =>
              'AssignmentExpression' === e.type ||
              'VariableDeclarator' === e.type
          ))
        ? T
        : nb(T, { shouldBreak: A });
    }
    var a9 = e =>
      'ExportDefaultDeclaration' === e.type ||
      ('DeclareExportDeclaration' === e.type && e.default);
    function a4(e, t, n) {
      var r, u;
      let { node: a } = e,
        o = [
          ae(e.node) ? [nw(nL, e.map(n, 'declaration', 'decorators')), nL] : '',
          rh(e),
          'export',
          a9(a) ? ' default' : ''
        ],
        { declaration: i, exported: s } = a;
      return (
        tb(a, 8) && (o.push(' ', rd(e, t)), a0(a) && o.push(nL)),
        i
          ? o.push(' ', n('declaration'))
          : (o.push(oe(a.exportKind)),
            'ExportAllDeclaration' === a.type ||
            'DeclareExportAllDeclaration' === a.type
              ? (o.push(' *'), s && o.push(' as ', n('exported')))
              : o.push(or(e, t, n)),
            o.push(on(e, t, n), oa(e, t, n))),
        o.push(
          ((r = a),
          (u = t),
          !r.declaration || (a9(r) && !a5(r.declaration)) ? rw(u) : '')
        ),
        o
      );
    }
    var a5 = l([
      'ClassDeclaration',
      'ComponentDeclaration',
      'FunctionDeclaration',
      'TSInterfaceDeclaration',
      'DeclareClass',
      'DeclareComponent',
      'DeclareFunction',
      'DeclareHook',
      'HookDeclaration',
      'TSDeclareFunction',
      'EnumDeclaration'
    ]);
    function oe(e, t = !0) {
      return e && 'value' !== e ? `${t ? ' ' : ''}${e}${t ? '' : ' '}` : '';
    }
    function ot(e, t) {
      return oe(e.importKind, t);
    }
    function on(e, t, n) {
      let { node: r } = e;
      return r.source ? [ou(r, t) ? ' from' : '', ' ', n('source')] : '';
    }
    function or(e, t, n) {
      let { node: r } = e;
      if (!ou(r, t)) return '';
      let u = [' '];
      if (s(r.specifiers)) {
        let a = [],
          o = [];
        (e.each(() => {
          let t = e.node.type;
          if (
            'ExportNamespaceSpecifier' === t ||
            'ExportDefaultSpecifier' === t ||
            'ImportNamespaceSpecifier' === t ||
            'ImportDefaultSpecifier' === t
          )
            a.push(n());
          else if ('ExportSpecifier' === t || 'ImportSpecifier' === t)
            o.push(n());
          else throw new uZ(r, 'specifier');
        }, 'specifiers'),
          u.push(nw(', ', a)),
          o.length > 0 &&
            (a.length > 0 && u.push(', '),
            o.length > 1 || a.length > 0 || r.specifiers.some(e => tb(e))
              ? u.push(
                  nb([
                    '{',
                    ng([t.bracketSpacing ? nN : nM, nw([',', nN], o)]),
                    rk(t),
                    t.bracketSpacing ? nN : nM,
                    '}'
                  ])
                )
              : u.push([
                  '{',
                  t.bracketSpacing ? ' ' : '',
                  ...o,
                  t.bracketSpacing ? ' ' : '',
                  '}'
                ])));
      } else u.push('{}');
      return u;
    }
    function ou(e, t) {
      return (
        !!('ImportDeclaration' !== e.type || s(e.specifiers)) ||
        'type' === e.importKind ||
        eI(t).slice(g(e), g(e.source)).trimEnd().endsWith('from')
      );
    }
    function oa(e, t, n) {
      let r,
        { node: u } = e;
      if (!u.source) return '';
      let a = (r = eI(t)
        .slice(P(u.source), u.attributes?.[0] ? g(u.attributes[0]) : P(u))
        .trimStart()).startsWith('assert')
        ? 'assert'
        : r.startsWith('with') || s(u.attributes)
          ? 'with'
          : void 0;
      if (!a) return '';
      let o = a7(e, t, n);
      return (
        (e => {
          let { attributes: t } = e;
          if (1 !== t.length) return !1;
          let [n] = t,
            { type: r, key: u, value: a } = n;
          return (
            'ImportAttribute' === r &&
            (('Identifier' === u.type && 'type' === u.name) ||
              (M(u) && 'type' === u.value)) &&
            M(a) &&
            !tb(n) &&
            !tb(u) &&
            !tb(a)
          );
        })(u) && (o = nD(o, nF)),
        [` ${a} `, o]
      );
    }
    function oo(e, t, n) {
      let { node: r } = e;
      return r.shorthand ? n('value') : aT(e, t, n, r0(e, t, n), ':', 'value');
    }
    function oi(e, t) {
      return ['...', t('argument'), r4(e, t)];
    }
    function os(e, t = 5) {
      return (
        (function e(t, n) {
          let r = 0;
          for (let u in t) {
            let a = t[u];
            if (
              (tR(a) && 'string' == typeof a.type && (r++, (r += e(a, n - r))),
              r > n)
            )
              break;
          }
          return r;
        })(e, t) <= t
      );
    }
    var op = new Map([
        ['AssignmentExpression', 'right'],
        ['VariableDeclarator', 'init'],
        ['ReturnStatement', 'argument'],
        ['ThrowStatement', 'argument'],
        ['UnaryExpression', 'argument'],
        ['YieldExpression', 'argument'],
        ['AwaitExpression', 'argument']
      ]),
      ol = new Map([
        ['AssignmentExpression', 'right'],
        ['VariableDeclarator', 'init'],
        ['ReturnStatement', 'argument'],
        ['ThrowStatement', 'argument'],
        ['UnaryExpression', 'argument'],
        ['YieldExpression', 'argument'],
        ['AwaitExpression', 'argument']
      ]),
      oc = e => [nP('('), ng([nM, e]), nM, nP(')')];
    function oD(e, t, n, r) {
      if (!t.experimentalTernaries)
        return (function (e, t, n) {
          let r,
            { node: u } = e,
            a = 'ConditionalExpression' === u.type,
            o = a ? 'consequent' : 'trueType',
            i = a ? 'alternate' : 'falseType',
            s = a ? ['test'] : ['checkType', 'extendsType'],
            p = u[o],
            l = u[i],
            c = [],
            D = !1,
            { parent: y } = e,
            d = y.type === u.type && s.some(e => y[e] === u),
            m = y.type === u.type && !d,
            f,
            F,
            E = 0;
          do ((F = f || u), (f = e.getParentNode(E)), E++);
          while (f && f.type === u.type && s.every(e => f[e] !== F));
          let A = f || y;
          if (
            a &&
            (H(u[s[0]]) ||
              H(p) ||
              H(l) ||
              (function (e) {
                let t = [e];
                for (let e = 0; e < t.length; e++) {
                  let n = t[e];
                  for (let e of ['test', 'consequent', 'alternate']) {
                    let r = n[e];
                    if (H(r)) return !0;
                    'ConditionalExpression' === r.type && t.push(r);
                  }
                }
                return !1;
              })(F))
          ) {
            ((D = !0), (m = !0));
            let e = e => [nP('('), ng([nM, e]), nM, nP(')')],
              t = e =>
                'NullLiteral' === e.type ||
                ('Literal' === e.type && null === e.value) ||
                ('Identifier' === e.type && 'undefined' === e.name);
            c.push(
              ' ? ',
              t(p) ? n(o) : e(n(o)),
              ' : ',
              l.type === u.type || t(l) ? n(i) : e(n(i))
            );
          } else {
            let e = e => (t.useTabs ? ng(n(e)) : nh(2, n(e))),
              r = [
                nN,
                '? ',
                p.type === u.type ? nP('', '(') : '',
                e(o),
                p.type === u.type ? nP('', ')') : '',
                nN,
                ': ',
                e(i)
              ];
            c.push(
              y.type !== u.type || y[i] === u || d
                ? r
                : t.useTabs
                  ? nh(-1, ng(r))
                  : nh(Math.max(0, t.tabWidth - 2), r)
            );
          }
          let C =
              !D &&
              (Y(y) || ('NGPipeExpression' === y.type && y.left === u)) &&
              !y.computed,
            x = (function (e) {
              let { node: t } = e;
              if ('ConditionalExpression' !== t.type) return !1;
              let n,
                r = t;
              for (let t = 0; !n; t++) {
                let u = e.getParentNode(t);
                if (
                  (et(u) && u.expression === r) ||
                  (Q(u) && u.callee === r) ||
                  (Y(u) && u.object === r)
                ) {
                  r = u;
                  continue;
                }
                ('NewExpression' === u.type && u.callee === r) ||
                (j(u) && u.expression === r)
                  ? ((n = e.getParentNode(t + 1)), (r = u))
                  : (n = u);
              }
              return r !== t && n[op.get(n.type)] === r;
            })(e),
            g =
              ((r = [
                (function (e, t) {
                  let { node: n } = e,
                    r = 'ConditionalExpression' === n.type,
                    { parent: u } = e,
                    a = r
                      ? t('test')
                      : [t('checkType'), ' ', 'extends', ' ', t('extendsType')];
                  return u.type === n.type &&
                    u[r ? 'alternate' : 'falseType'] === n
                    ? nh(2, a)
                    : a;
                })(e, n),
                m ? c : ng(c),
                a && C && !x ? nM : ''
              ]),
              y === A ? nb(r) : r);
          return d || x ? nb([ng([nM, g]), nM]) : g;
        })(e, t, n);
      let { node: u } = e,
        a = 'ConditionalExpression' === u.type,
        o = R(u),
        i = a ? 'consequent' : 'trueType',
        s = a ? 'alternate' : 'falseType',
        p = a ? ['test'] : ['checkType', 'extendsType'],
        l = u[i],
        c = u[s],
        D = p.map(e => u[e]),
        { parent: y } = e,
        d = y.type === u.type,
        m = d && p.some(e => y[e] === u),
        f = d && y[s] === u,
        F = l.type === u.type,
        E = c.type === u.type,
        A = E || f,
        C = t.tabWidth > 2 || t.useTabs,
        x,
        h,
        T = 0;
      do ((h = x || u), (x = e.getParentNode(T)), T++);
      while (x && x.type === u.type && p.every(e => x[e] !== h));
      let S = x || y,
        B =
          r &&
          r.assignmentLayout &&
          'break-after-operator' !== r.assignmentLayout &&
          ('AssignmentExpression' === y.type ||
            'VariableDeclarator' === y.type ||
            'ClassProperty' === y.type ||
            'PropertyDefinition' === y.type ||
            'ClassPrivateProperty' === y.type ||
            'ObjectProperty' === y.type ||
            'Property' === y.type),
        b = _(y) && !(F || E),
        v =
          a &&
          'JSXExpressionContainer' === S.type &&
          'JSXAttribute' !== e.grandparent.type,
        k = (function (e) {
          let { node: t } = e;
          if ('ConditionalExpression' !== t.type) return !1;
          let n,
            r = t;
          for (let t = 0; !n; t++) {
            let u = e.getParentNode(t);
            if (
              (et(u) && u.expression === r) ||
              (Q(u) && u.callee === r) ||
              (Y(u) && u.object === r)
            ) {
              r = u;
              continue;
            }
            ('NewExpression' === u.type && u.callee === r) ||
            (j(u) && u.expression === r)
              ? ((n = e.getParentNode(t + 1)), (r = u))
              : (n = u);
          }
          return r !== t && n[ol.get(n.type)] === r;
        })(e),
        w =
          (Y(y) || ('NGPipeExpression' === y.type && y.left === u)) &&
          !y.computed,
        I = o && t1(e, t),
        N = C ? (t.useTabs ? '	' : ' '.repeat(t.tabWidth - 1)) : '',
        M =
          [...D.map(e => tv(e)), tv(l), tv(c)]
            .flat()
            .some(e => eM(e) && eg(t.originalText, g(e), P(e))) ||
          F ||
          E,
        L =
          !A &&
          !d &&
          !o &&
          (v
            ? 'NullLiteral' === l.type ||
              ('Literal' === l.type && null === l.value)
            : ap(l, t) && os(u.test, 3)),
        O = A || f || (o && !d) || (d && a && os(u.test, 1)) || L,
        J = [];
      (tb(u.test, 8) &&
        e.call(() => {
          J.push(rd(e, t));
        }, 'test'),
        tb(u, 8) && J.push(rd(e, t)));
      let q = Symbol('test'),
        X = Symbol('consequent'),
        W = Symbol('test-and-consequent'),
        $ = a
          ? [oc(n('test')), 'ConditionalExpression' === u.test.type ? nT : '']
          : [
              n('checkType'),
              ' ',
              'extends',
              ' ',
              R(u.extendsType) || 'TSMappedType' === u.extendsType.type
                ? n('extendsType')
                : nb(oc(n('extendsType')))
            ],
        U = nb([$, ' ?'], { id: q }),
        G = n(i),
        V = ng([F || (v && (H(l) || d || A)) ? nL : nN, G]),
        K = O
          ? nb([U, A ? V : nP(V, nb(V, { id: X }), { groupId: q })], { id: W })
          : [U, V],
        z = n(s),
        Z = L ? nP(z, nh(-1, oc(z)), { groupId: W }) : z,
        ee = [
          K,
          J.length > 0
            ? [ng([nL, J]), nL]
            : E
              ? nL
              : L
                ? nP(nN, ' ', { groupId: W })
                : nN,
          ':',
          E || !C
            ? ' '
            : O
              ? nP(N, nP(A || L ? ' ' : N, ' '), { groupId: W })
              : nP(N, ' '),
          E ? Z : nb([ng(Z), v && !L ? nM : '']),
          w && !k ? nM : '',
          M ? nT : ''
        ];
      return B && !M
        ? nb(ng([nM, nb(ee)]))
        : B || b
          ? nb(ng(ee))
          : k || (o && m)
            ? nb([ng([nM, ee]), I ? nM : ''])
            : y === S
              ? nb(ee)
              : ee;
    }
    function oy(e, t, n) {
      let { node: r } = e,
        u = e.map(n, 'declarations'),
        a =
          ('init' === e.key && 'ForStatement' === e.parent.type) ||
          ('left' === e.key &&
            ('ForInStatement' === e.parent.type ||
              'ForOfStatement' === e.parent.type)),
        o = r.declarations.some(e => e.init),
        i;
      return (
        (i = 1 !== u.length || tb(r.declarations[0]) ? ng(u[0]) : u[0]),
        nb([
          rh(e),
          r.kind,
          i ? [' ', i] : '',
          ng(u.slice(1).map(e => [',', o && !a ? nL : nN, e])),
          a ? '' : rw(t)
        ])
      );
    }
    function od(e, t, n, r) {
      let { node: u } = e;
      if (G(u))
        return (function (e, t) {
          let { node: n } = e;
          switch (n.type) {
            case 'RegExpLiteral':
              return a2(n);
            case 'BigIntLiteral':
              return a1(n.extra.raw);
            case 'NumericLiteral':
              return rJ(n.extra.raw);
            case 'StringLiteral':
              return nA(rG(n.extra.raw, t));
            case 'NullLiteral':
              return 'null';
            case 'BooleanLiteral':
              return String(n.value);
            case 'DirectiveLiteral':
              return a8(n.extra.raw, t);
            case 'Literal': {
              if (n.regex) return a2(n.regex);
              if (n.bigint) return a1(n.raw);
              let { value: r } = n;
              return 'number' == typeof r
                ? rJ(n.raw)
                : 'string' == typeof r
                  ? !(function (e) {
                      if ('expression' !== e.key) return;
                      let { parent: t } = e;
                      return (
                        'ExpressionStatement' === t.type &&
                        'string' == typeof t.directive
                      );
                    })(e)
                    ? nA(rG(n.raw, t))
                    : a8(n.raw, t)
                  : String(r);
            }
          }
        })(e, t);
      switch (u.type) {
        case 'JsExpressionRoot':
          return n('node');
        case 'JsonRoot':
          return [rd(e, t), n('node'), nL];
        case 'File':
          return (
            (function (e, t, n) {
              if (t.__isVueBindings || t.__isVueForBindingLeft) {
                let r = e.map(n, 'program', 'body', 0, 'params');
                if (1 === r.length) return r[0];
                let u = nw([',', nN], r);
                return t.__isVueForBindingLeft
                  ? ['(', ng([nM, nb(u)]), nM, ')']
                  : u;
              }
              if (t.__isEmbeddedTypescriptGenericParameters)
                return nw(
                  [',', nN],
                  e.map(n, 'program', 'body', 0, 'typeParameters', 'params')
                );
            })(e, t, n) ?? n('program')
          );
        case 'ExpressionStatement':
          return (function (e, t, n) {
            let r = [n('expression')];
            if (uo(e, t)) {
              if (uc(e, t)) {
                let { node: n } = e,
                  u = y(0, tv(n, 2), -1),
                  a = rm(e, t, { filter: e => e === u });
                return rE(e, [';', a, ...r], t, { filter: e => e !== u });
              }
              r.unshift(';');
            } else
              (function (e, t) {
                if (ul(e, t)) {
                  var n;
                  let t = (function e(t) {
                    return aY(t) ? e(t.expression) : t;
                  })(e.node.expression);
                  return (
                    aZ(t) ||
                    'MemberExpression' === (n = t).type ||
                    'OptionalMemberExpression' === n.type ||
                    ('Identifier' === n.type && 'undefined' !== n.name)
                  );
                }
                return !(!t.semi || us(e, t) || up(e, t));
              })(e, t) && r.push(';');
            return r;
          })(e, t, n);
        case 'ChainExpression':
          return n('expression');
        case 'ParenthesizedExpression':
          return !tb(u.expression) && (U(u.expression) || $(u.expression))
            ? ['(', n('expression'), ')']
            : nb(['(', ng([nM, n('expression')]), nM, ')']);
        case 'AssignmentExpression':
          return (function (e, t, n) {
            let { node: r } = e;
            return aT(e, t, n, n('left'), [' ', r.operator], 'right');
          })(e, t, n);
        case 'VariableDeclarator':
          return aT(e, t, n, n('id'), ' =', 'init');
        case 'BinaryExpression':
        case 'LogicalExpression':
          return u1(e, t, n);
        case 'AssignmentPattern':
          return [n('left'), ' = ', n('right')];
        case 'OptionalMemberExpression':
        case 'MemberExpression':
          return (function (e, t, n) {
            let r,
              u = n('object'),
              a = aA(e, t, n),
              { node: o } = e,
              i = e.findAncestor(
                e => !(Y(e) || 'TSNonNullExpression' === e.type)
              ),
              s = e.findAncestor(e => !et(e)),
              p =
                'BindExpression' === i.type ||
                ('AssignmentExpression' === i.type &&
                  'Identifier' !== i.left.type) ||
                (function (e) {
                  let { node: t, ancestors: n } = e;
                  for (let e of n) {
                    if (!(
                      (Y(e) && e.object === t) ||
                      ('TSNonNullExpression' === e.type && e.expression === t)
                    ))
                      return 'NewExpression' === e.type && e.callee === t;
                    t = e;
                  }
                  return !1;
                })(e) ||
                o.computed ||
                ('Identifier' === o.object.type &&
                  'Identifier' === o.property.type &&
                  !Y(s)) ||
                (('AssignmentExpression' === s.type ||
                  'VariableDeclarator' === s.type) &&
                  ((Q((r = tY(o.object))) && eS(r).length > 0) ||
                    u.label?.memberChain));
            return nI(u.label, [u, nq, p ? a : nb(ng([nM, a]))]);
          })(e, t, n);
        case 'MetaProperty':
          return [n('meta'), '.', n('property')];
        case 'BindExpression':
          return [n('object'), nb(ng([nM, aE(e, t, n)]))];
        case 'Identifier':
          return [u.name, rC(e), rx(e), r4(e, n)];
        case 'V8IntrinsicIdentifier':
          return ['%', u.name];
        case 'SpreadElement':
        case 'RestElement':
          return oi(e, n);
        case 'FunctionDeclaration':
        case 'FunctionExpression':
          return ut(e, t, n, r);
        case 'ArrowFunctionExpression':
          return (function (e, t, n, r = {}) {
            var u, a, o;
            let i = [],
              s,
              p = [],
              l = !1,
              c =
                !r.expandLastArg &&
                'ArrowFunctionExpression' === e.node.body.type,
              D;
            !(function u() {
              let { node: a } = e,
                o = (function (e, t, n, r) {
                  let { node: u } = e,
                    a = [];
                  if ((u.async && a.push('async '), uu(e, t)))
                    a.push(n(['params', 0]));
                  else {
                    let u = r.expandLastArg || r.expandFirstArg,
                      o = ua(e, n);
                    if (u) {
                      if (nm(o)) throw new n5();
                      o = nb(nD(o, nF));
                    }
                    a.push(nb([rN(e, t, n, u, !0), o]));
                  }
                  let o = rd(e, t, { marker: 'commentBeforeArrow' });
                  return (o && a.push(' ', o), a);
                })(e, t, n, r);
              if (0 === i.length) i.push(o);
              else {
                let { leading: n, trailing: r } = rF(e, t);
                (i.push([n, o]), p.unshift(r));
              }
              (c &&
                (l ||
                  (l =
                    (a.returnType && F(a).length > 0) ||
                    a.typeParameters ||
                    F(a).some(e => 'Identifier' !== e.type))),
                c && 'ArrowFunctionExpression' === a.body.type
                  ? e.call(u, 'body')
                  : ((s = n('body', r)), (D = a.body)));
            })();
            let y =
                !tH(t.originalText, D) &&
                ('SequenceExpression' === D.type ||
                  ((u = D),
                  (a = s),
                  (o = t),
                  $(u) ||
                    U(u) ||
                    'ArrowFunctionExpression' === u.type ||
                    'DoExpression' === u.type ||
                    'BlockStatement' === u.type ||
                    H(u) ||
                    (a.label?.hug !== !1 &&
                      (a.label?.embed || ao(u, o.originalText)))) ||
                  (!l && as(D))),
              d = 'callee' === e.key && ee(e.parent),
              m = Symbol('arrow-chain'),
              f = (function (e, t, { signatureDocs: n, shouldBreak: r }) {
                if (1 === n.length) return n[0];
                let { parent: u, key: a } = e;
                return ('callee' !== a && ee(u)) || z(u)
                  ? nb([n[0], ' =>', ng([nN, nw([' =>', nN], n.slice(1))])], {
                      shouldBreak: r
                    })
                  : ('callee' === a && ee(u)) || t.assignmentLayout
                    ? nb(nw([' =>', nN], n), { shouldBreak: r })
                    : nb(ng(nw([' =>', nN], n)), { shouldBreak: r });
              })(e, r, { signatureDocs: i, shouldBreak: l }),
              E = !1,
              A = !1,
              C = !1;
            return (
              c &&
                (d || r.assignmentLayout) &&
                ((A = !0),
                (C = !tb(e.node, 0)),
                (E =
                  'chain-tail-arrow-chain' === r.assignmentLayout ||
                  (d && !y))),
              (s = (function (
                e,
                t,
                n,
                {
                  bodyDoc: r,
                  bodyComments: u,
                  functionBody: a,
                  shouldPutBodyOnSameLine: o
                }
              ) {
                let { node: i, parent: s } = e,
                  p = n.expandLastArg ? rk(t, 'all') : '',
                  l =
                    (n.expandLastArg || 'JSXExpressionContainer' === s.type) &&
                    !tb(i)
                      ? nM
                      : '';
                return o && as(a)
                  ? [' ', nb([nP('', '('), ng([nM, r]), nP('', ')'), p, l]), u]
                  : o
                    ? [' ', r, u]
                    : [ng([nN, r, u]), p, l];
              })(e, t, r, {
                bodyDoc: s,
                bodyComments: p,
                functionBody: D,
                shouldPutBodyOnSameLine: y
              })),
              nb([
                nb(A ? ng([C ? nM : '', f]) : f, { shouldBreak: E, id: m }),
                ' =>',
                c ? nk(s, { groupId: m }) : nb(s),
                c && d ? nP(nM, '', { groupId: m }) : ''
              ])
            );
          })(e, t, n, r);
        case 'YieldExpression':
          return [
            `yield${u.delegate ? '*' : ''}`,
            u.argument ? [' ', n('argument')] : ''
          ];
        case 'AwaitExpression':
          return (function (e, t) {
            let { node: n } = e,
              r = ['await'];
            if (n.argument) {
              r.push(' ', t('argument'));
              let { parent: u } = e;
              if ((Q(u) && u.callee === n) || (Y(u) && u.object === n)) {
                r = [ng([nM, ...r]), nM];
                let t = e.findAncestor(
                  e =>
                    'AwaitExpression' === e.type || 'BlockStatement' === e.type
                );
                if (
                  t?.type !== 'AwaitExpression' ||
                  !tO(t.argument, e => e === n)
                )
                  return nb(r);
              }
            }
            return r;
          })(e, n);
        case 'ExportDefaultDeclaration':
        case 'ExportNamedDeclaration':
        case 'ExportAllDeclaration':
          return a4(e, t, n);
        case 'ImportDeclaration':
          return (function (e, t, n) {
            let { node: r } = e;
            return [
              'import',
              r.phase ? ` ${r.phase}` : '',
              ot(r),
              or(e, t, n),
              on(e, t, n),
              oa(e, t, n),
              rw(t)
            ];
          })(e, t, n);
        case 'ImportSpecifier':
        case 'ExportSpecifier':
        case 'ImportNamespaceSpecifier':
        case 'ExportNamespaceSpecifier':
        case 'ImportDefaultSpecifier':
        case 'ExportDefaultSpecifier':
          return (function (e, t) {
            let { node: n } = e,
              { type: r } = n,
              u = r.startsWith('Import'),
              a = u ? 'imported' : 'local',
              o = u ? 'local' : 'exported',
              i = n[a],
              s = n[o],
              p = '',
              l = '';
            return (
              'ExportNamespaceSpecifier' === r ||
              'ImportNamespaceSpecifier' === r
                ? (p = '*')
                : i && (p = t(a)),
              s && !eu(n) && (l = t(o)),
              [
                oe('ImportSpecifier' === r ? n.importKind : n.exportKind, !1),
                p,
                p && l ? ' as ' : '',
                l
              ]
            );
          })(e, n);
        case 'ImportAttribute':
        case 'ObjectProperty':
          return oo(e, t, n);
        case 'Program':
        case 'BlockStatement':
        case 'StaticBlock':
          return aN(e, t, n);
        case 'ClassBody':
          return aj(e, t, n);
        case 'ThrowStatement':
        case 'ReturnStatement':
          return (function (e, t, n) {
            let { node: r } = e;
            return [
              'ThrowStatement' === r.type ? 'throw' : 'return',
              r.argument
                ? [
                    ' ',
                    e.call(
                      () =>
                        (function (e, t, n) {
                          let { node: r } = e,
                            u = n();
                          return tQ(r, t)
                            ? ['(', ng([nL, u]), nL, ')']
                            : z(r) ||
                                (t.experimentalTernaries &&
                                  'ConditionalExpression' === r.type &&
                                  ('ConditionalExpression' ===
                                    r.consequent.type ||
                                    'ConditionalExpression' ===
                                      r.alternate.type))
                              ? nb([nP('('), ng([nM, u]), nM, nP(')')])
                              : u;
                        })(e, t, n),
                      'argument'
                    )
                  ]
                : '',
              rw(t)
            ];
          })(e, t, n);
        case 'NewExpression':
        case 'ImportExpression':
        case 'OptionalCallExpression':
        case 'CallExpression':
          return ax(e, t, n);
        case 'ObjectExpression':
        case 'ObjectPattern':
          return a7(e, t, n);
        case 'Property':
          return A(u) ? un(e, t, n) : oo(e, t, n);
        case 'ObjectMethod':
          return un(e, t, n);
        case 'Decorator':
          return ['@', n('expression')];
        case 'ArrayExpression':
        case 'ArrayPattern':
          return an(e, t, n);
        case 'SequenceExpression':
          return (function (e, t, n) {
            let { parent: r } = e;
            if ('ExpressionStatement' === r.type || 'ForStatement' === r.type) {
              let t = [];
              return (
                e.each(({ isFirst: e }) => {
                  e ? t.push(n()) : t.push(',', ng([nN, n()]));
                }, 'expressions'),
                nb(t)
              );
            }
            let u = nw([',', nN], e.map(n, 'expressions'));
            return !(function (e, t) {
              let { key: n, parent: r } = e;
              return !!(
                ('argument' === n && _(r) && t1(e, t)) ||
                ('body' === n && 'ArrowFunctionExpression' === r.type)
              );
            })(e, t)
              ? nb(u)
              : nb(nP([ng([nM, u]), nM], u));
          })(e, t, n);
        case 'ThisExpression':
          return 'this';
        case 'Super':
          return 'super';
        case 'Directive':
          return [n('value'), rw(t)];
        case 'UnaryExpression': {
          let e = [u.operator];
          /[a-z]$/.test(u.operator) && e.push(' ');
          let t = n('argument');
          return (
            tb(u.argument)
              ? e.push(nb(['(', ng([nM, t]), nM, ')']))
              : e.push(t),
            e
          );
        }
        case 'UpdateExpression':
          return [
            u.prefix ? u.operator : '',
            n('argument'),
            u.prefix ? '' : u.operator
          ];
        case 'ConditionalExpression':
          return oD(e, t, n, r);
        case 'VariableDeclaration':
          return oy(e, t, n);
        case 'IfStatement':
          return (function (e, t, n) {
            let { node: r } = e,
              u = nb(['if (', rv(e, t, n), ')', aQ(e, t, n, 'consequent')]);
            if (!r.alternate) return u;
            let { consequent: a } = r,
              o = 'BlockStatement' === a.type,
              i = [u],
              s = o;
            o || (i.push(nL), (s = !1));
            let p = tv(r, 8);
            if (p.length > 0) {
              let [n] = p;
              (((e, { originalText: t }) => rc(t, g(e)))(n, t)
                ? i.push(o ? [nL, nL] : nL)
                : ex(t.originalText, g(n), { backwards: !0 })
                  ? i.push(o ? nL : '')
                  : i.push(' '),
                i.push(
                  rd(e, t),
                  a0(r) || ex(t.originalText, P(y(0, p, -1))) ? nL : ' '
                ),
                (s = !1));
            }
            return (
              i.push(s ? ' ' : '', 'else', nb(aQ(e, t, n, 'alternate'))),
              i
            );
          })(e, t, n);
        case 'ForStatement':
          return (function (e, t, n) {
            let { node: r } = e,
              u = aQ(e, t, n),
              a = rd(e, t),
              o = a ? [a, nM] : '';
            return r.init || r.test || r.update
              ? [
                  o,
                  nb([
                    'for (',
                    nb([
                      ng([
                        nM,
                        n('init'),
                        ';',
                        nN,
                        n('test'),
                        ';',
                        r.update ? [nN, n('update')] : ''
                      ]),
                      nM
                    ]),
                    ')',
                    u
                  ])
                ]
              : [o, nb(['for (;;)', u])];
          })(e, t, n);
        case 'WithStatement':
        case 'WhileStatement':
          return (function (e, t, n) {
            let { node: r } = e;
            return nb([
              'WithStatement' === r.type ? 'with' : 'while',
              ' (',
              rv(e, t, n),
              ')',
              aQ(e, t, n)
            ]);
          })(e, t, n);
        case 'DoWhileStatement':
          return [
            nb(['do', aQ(e, t, n)]),
            'BlockStatement' === e.node.body.type ? ' ' : nL,
            'while (',
            rv(e, t, n),
            ')',
            rw(t)
          ];
        case 'ForInStatement':
        case 'ForOfStatement':
          return (function (e, t, n) {
            let { node: r } = e,
              u = 'ForOfStatement' === r.type;
            return nb([
              'for',
              u && r.await ? ' await' : '',
              ' (',
              n('left'),
              ' ',
              u ? 'of' : 'in',
              ' ',
              n('right'),
              ')',
              aQ(e, t, n)
            ]);
          })(e, t, n);
        case 'DoExpression':
          return [u.async ? 'async ' : '', 'do ', n('body')];
        case 'BreakStatement':
        case 'ContinueStatement':
          return [
            'BreakStatement' === u.type ? 'break' : 'continue',
            u.label ? [' ', n('label')] : '',
            rw(t)
          ];
        case 'LabeledStatement':
          return [
            n('label'),
            `:${'EmptyStatement' === u.body.type && !tb(u.body, 2) ? '' : ' '}`,
            n('body')
          ];
        case 'TryStatement':
          return (function (e, t) {
            let { node: n } = e;
            return [
              'try ',
              t('block'),
              n.handler ? [' ', t('handler')] : '',
              n.finalizer ? [' finally ', t('finalizer')] : ''
            ];
          })(e, n);
        case 'CatchClause':
          return (function (e, t, n) {
            let { node: r } = e;
            if (r.param) {
              let e = tb(
                  r.param,
                  e =>
                    !eM(e) ||
                    (e.leading && ex(t.originalText, P(e))) ||
                    (e.trailing && ex(t.originalText, g(e), { backwards: !0 }))
                ),
                u = n('param');
              return [
                'catch ',
                e ? ['(', ng([nM, u]), nM, ') '] : ['(', u, ') '],
                n('body')
              ];
            }
            return ['catch ', n('body')];
          })(e, t, n);
        case 'SwitchStatement':
          return [
            nb(['switch (', ng([nM, n('discriminant')]), nM, ')']),
            ' {',
            e.node.cases.length > 0
              ? ng([
                  nL,
                  nw(
                    nL,
                    e.map(
                      ({ node: e, isLast: r }) => [
                        n(),
                        !r && rn(e, t) ? nL : ''
                      ],
                      'cases'
                    )
                  )
                ])
              : rd(e, t, { indent: !0 }),
            nL,
            '}'
          ];
        case 'SwitchCase':
          return (function (e, t, n) {
            let { node: r } = e,
              u = [];
            (r.test ? u.push('case ', n('test'), ':') : u.push('default:'),
              tb(r, 8) && u.push(' ', rd(e, t)));
            let a = r.consequent.filter(e => 'EmptyStatement' !== e.type);
            if (a.length > 0) {
              let r = aI(e, t, n, 'consequent');
              u.push(
                1 === a.length && 'BlockStatement' === a[0].type
                  ? [' ', r]
                  : ng([nL, r])
              );
            }
            return u;
          })(e, t, n);
        case 'DebuggerStatement':
          return ['debugger', rw(t)];
        case 'ClassDeclaration':
        case 'ClassExpression':
          return a$(e, t, n);
        case 'ClassMethod':
        case 'ClassPrivateMethod':
        case 'MethodDefinition':
          return aH(e, t, n);
        case 'ClassProperty':
        case 'PropertyDefinition':
        case 'ClassPrivateProperty':
        case 'ClassAccessorProperty':
        case 'AccessorProperty':
          return az(e, t, n);
        case 'TemplateElement':
          return nA(u.value.raw);
        case 'TemplateLiteral':
          return um(e, t, n);
        case 'TaggedTemplateExpression':
          return (function (e, t, n) {
            let r = n('quasi'),
              { node: u } = e,
              a = '',
              o = tv(u.quasi, 2)[0];
            return (
              o &&
                (a = eg(t.originalText, P(u.typeArguments ?? u.tag), g(o))
                  ? nM
                  : ' '),
              nI(r.label && { tagged: !0, ...r.label }, [
                n('tag'),
                n('typeArguments'),
                a,
                nq,
                r
              ])
            );
          })(e, t, n);
        case 'PrivateIdentifier':
          return ['#', u.name];
        case 'PrivateName':
          return ['#', n('id')];
        case 'TopicReference':
          return '%';
        case 'ArgumentPlaceholder':
          return '?';
        case 'ModuleExpression':
          return ['module ', n('body')];
        case 'VoidPattern':
          return 'void';
        case 'EmptyStatement':
          if (E(e)) return ';';
        default:
          throw new uZ(u, 'ESTree');
      }
    }
    function om(e) {
      return [e('elementType'), '[]'];
    }
    function of(e, t, n) {
      let { parent: r, node: u, key: a } = e,
        o = 'AsConstExpression' === u.type ? 'const' : n('typeAnnotation'),
        i = [n('expression'), ' ', L(u) ? 'satisfies' : 'as', ' ', o];
      return ('callee' === a && Z(r)) || ('object' === a && Y(r))
        ? nb([ng([nM, ...i]), nM])
        : i;
    }
    function oF(e, t, n) {
      let { node: r } = e,
        u = 'TSEnumMember' === r.type,
        a = u ? r0(e, t, n) : n('id'),
        o = u ? 'initializer' : 'init';
      return r[o] ? [a, ' = ', n(o)] : a;
    }
    function oE(e, t) {
      let { node: n } = e;
      return [rh(e), n.const ? 'const ' : '', 'enum ', t('id'), ' ', t('body')];
    }
    function oA(e, t, n) {
      let { node: r } = e,
        u = [rS(e)];
      ('TSConstructorType' === r.type ||
        'TSConstructSignatureDeclaration' === r.type) &&
        u.push('new ');
      let a = rN(e, t, n, !1, !0),
        o = [];
      return (
        'FunctionTypeAnnotation' === r.type
          ? o.push(
              !(function (e) {
                let { node: t, parent: n } = e;
                return (
                  'FunctionTypeAnnotation' === t.type &&
                  (re(n) ||
                    !(
                      (('ObjectTypeProperty' === n.type ||
                        'ObjectTypeInternalSlot' === n.type) &&
                        !n.variance &&
                        !n.optional &&
                        k(n, t)) ||
                      'ObjectTypeCallProperty' === n.type ||
                      e.getParentNode(2)?.type === 'DeclareFunction'
                    ))
                );
              })(e)
                ? ': '
                : ' => ',
              n('returnType')
            )
          : o.push(r4(e, n, 'returnType')),
        rj(r, o) && (a = nb(a)),
        u.push(a, o),
        [
          nb(u),
          'TSConstructSignatureDeclaration' === r.type ||
          'TSCallSignatureDeclaration' === r.type
            ? aO(e, t)
            : ''
        ]
      );
    }
    function oC(e) {
      let { node: t } = e;
      return (
        'HookTypeAnnotation' === t.type &&
        e.getParentNode(2)?.type === 'DeclareHook'
      );
    }
    function ox(e, t, n) {
      return [n('objectType'), rC(e), '[', n('indexType'), ']'];
    }
    function og(e, t, n) {
      return ['infer ', n('typeParameter')];
    }
    function oh(e, t, n) {
      let r = !1;
      return nb(
        e.map(({ isFirst: e, previous: u, node: a, index: o }) => {
          let i = n();
          if (e) return i;
          let s = V(a),
            p = V(u);
          return p && s
            ? [' & ', r ? ng(i) : i]
            : (!p && !s) || tH(t.originalText, a)
              ? 'start' === t.experimentalOperatorPosition
                ? ng([nN, '& ', i])
                : ng([' &', nN, i])
              : (o > 1 && (r = !0), [' & ', o > 1 ? ng(i) : i]);
        }, 'types')
      );
    }
    function oT(e, t) {
      return '+' === e || '-' === e ? e + t : t;
    }
    var oS = l([
      'MatchWildcardPattern',
      'MatchLiteralPattern',
      'MatchUnaryPattern',
      'MatchIdentifierPattern'
    ]);
    function oB(e, t, n) {
      let { node: r } = e;
      return [
        '...',
        ...('TupleTypeSpreadElement' === r.type && r.label
          ? [n('label'), ': ']
          : []),
        n('typeAnnotation')
      ];
    }
    function ob(e, t, n) {
      let { node: r } = e;
      return [
        r.variance ? n('variance') : '',
        n('label'),
        r.optional ? '?' : '',
        ': ',
        n('elementType')
      ];
    }
    function ov(e, t, n) {
      let { node: r } = e,
        u = [rh(e), 'type ', n('id'), n('typeParameters')];
      return [
        aT(
          e,
          t,
          n,
          u,
          ' =',
          'TSTypeAliasDeclaration' === r.type ? 'typeAnnotation' : 'right'
        ),
        rw(t)
      ];
    }
    function oP(e, t, n, r) {
      var u;
      let { node: a } = e,
        o = a[r];
      if (!o) return '';
      if (!Array.isArray(o)) return n(r);
      let i = rl(e.grandparent),
        s = e.match(
          e => !(1 === e[r].length && V(e[r][0])),
          void 0,
          (e, t) => 'typeAnnotation' === t,
          e => 'Identifier' === e.type,
          ab
        );
      if (
        0 === o.length ||
        (!s &&
          (i ||
            (1 === o.length &&
              ('NullableTypeAnnotation' === o[0].type ||
                ro((u = o[0])) ||
                V(u) ||
                (O(u) && r3(u))))) &&
          !o.some(e => {
            let n = tv(e, e => e.leading || e.trailing);
            return (
              n.length > 0 &&
              (n.some(e => ej(e)) || ex(t.originalText, P(y(0, n, -1))))
            );
          }))
      )
        return [
          '<',
          nw(', ', e.map(n, r)),
          (function (e, t) {
            let { node: n } = e;
            if (!tb(n, 8)) return '';
            let r = !tb(n, 32),
              u = rd(e, t, { indent: !r });
            return r ? u : [u, nL];
          })(e, t),
          '>'
        ];
      let p =
        'TSTypeParameterInstantiation' === a.type
          ? ''
          : !(function (e, t, n) {
                let { node: r } = e;
                return (
                  1 === F(r).length &&
                  r.type.startsWith('TS') &&
                  !r[n][0].constraint &&
                  'ArrowFunctionExpression' === e.parent.type &&
                  !(t.filepath && /\.ts$/.test(t.filepath))
                );
              })(e, t, r)
            ? rk(t)
            : ',';
      return nb(['<', ng([nM, nw([',', nN], e.map(n, r))]), p, nM, '>']);
    }
    function ok(e, t, n) {
      let { node: r } = e,
        u = [r.const ? 'const ' : ''],
        a = 'TSTypeParameter' === r.type ? n('name') : r.name;
      if (
        (r.variance && u.push(n('variance')),
        r.in && u.push('in '),
        r.out && u.push('out '),
        u.push(a),
        r.bound &&
          (r.usesExtendsBound && u.push(' extends '),
          u.push(r4(e, n, 'bound'))),
        r.constraint)
      ) {
        let e = Symbol('constraint');
        u.push(
          ' extends',
          nb(ng(nN), { id: e }),
          nq,
          nk(n('constraint'), { groupId: e })
        );
      }
      if (r.default) {
        let e = Symbol('default');
        u.push(
          ' =',
          nb(ng(nN), { id: e }),
          nq,
          nk(n('default'), { groupId: e })
        );
      }
      return nb(u);
    }
    function ow(e, t) {
      let { node: n } = e;
      return [
        'TSTypePredicate' === n.type && n.asserts
          ? 'asserts '
          : 'TypePredicate' === n.type && n.kind
            ? `${n.kind} `
            : '',
        t('parameterName'),
        n.typeAnnotation ? [' is ', r4(e, t)] : ''
      ];
    }
    function oI({ node: e }, t) {
      return [
        'typeof ',
        t('TSTypeQuery' === e.type ? 'exprName' : 'argument'),
        t('typeArguments')
      ];
    }
    function oN(e, t, n, r) {
      let { node: u } = e;
      if (rr(u)) return u.type.slice(0, -14).toLowerCase();
      switch (u.type) {
        case 'ComponentDeclaration':
        case 'DeclareComponent':
        case 'ComponentTypeAnnotation':
          return (function (e, t, n) {
            let { node: r } = e,
              u = [rh(e), r.async ? 'async ' : '', 'component'];
            (r.id && u.push(' ', n('id')), u.push(n('typeParameters')));
            let a = rN(e, t, n);
            return (
              r.rendersType
                ? u.push(nb([a, ' ', n('rendersType')]))
                : u.push(nb([a])),
              r.body && u.push(' ', n('body')),
              'DeclareComponent' === r.type && u.push(rw(t)),
              u
            );
          })(e, t, n);
        case 'ComponentParameter':
          return (function (e, t) {
            let { node: n } = e;
            return n.shorthand ? t('local') : [t('name'), ' as ', t('local')];
          })(e, n);
        case 'ComponentTypeParameter':
          return (function (e, t) {
            let { node: n } = e,
              r = [];
            return (
              n.name && r.push(t('name'), n.optional ? '?: ' : ': '),
              r.push(t('typeAnnotation')),
              r
            );
          })(e, n);
        case 'HookDeclaration':
          return ut(e, t, n);
        case 'DeclareHook':
          return [rh(e), 'hook', e.node.id ? [' ', n('id')] : '', rw(t)];
        case 'HookTypeAnnotation':
          return (function (e, t, n) {
            let { node: r } = e,
              u = rN(e, t, n, !1, !0),
              a = [oC(e) ? ': ' : ' => ', n('returnType')];
            return nb([oC(e) ? '' : 'hook ', rj(r, a) ? nb(u) : u, a]);
          })(e, t, n);
        case 'DeclareFunction':
          return [rh(e), 'function ', n('id'), n('predicate'), rw(t)];
        case 'DeclareModule':
          return ['declare module ', n('id'), ' ', n('body')];
        case 'DeclareModuleExports':
          return ['declare module.exports', r4(e, n), rw(t)];
        case 'DeclareNamespace':
          return ['declare namespace ', n('id'), ' ', n('body')];
        case 'DeclareVariable':
          return Array.isArray(u.declarations)
            ? oy(e, t, n)
            : [rh(e), u.kind ?? 'var', ' ', n('id'), rw(t)];
        case 'DeclareExportDeclaration':
        case 'DeclareExportAllDeclaration':
          return a4(e, t, n);
        case 'DeclareOpaqueType':
        case 'OpaqueType':
          return (function (e, t, n) {
            let { node: r } = e,
              u = [rh(e), 'opaque type ', n('id'), n('typeParameters')];
            if (
              (r.supertype && u.push(': ', n('supertype')),
              r.lowerBound || r.upperBound)
            ) {
              let e = [];
              (r.lowerBound && e.push(ng([nN, 'super ', n('lowerBound')])),
                r.upperBound && e.push(ng([nN, 'extends ', n('upperBound')])),
                u.push(nb(e)));
            }
            return (
              r.impltype && u.push(' = ', n('impltype')),
              u.push(rw(t)),
              u
            );
          })(e, t, n);
        case 'DeclareTypeAlias':
        case 'TypeAlias':
          return ov(e, t, n);
        case 'IntersectionTypeAnnotation':
          return oh(e, t, n);
        case 'UnionTypeAnnotation':
          return r7(e, t, n, r);
        case 'ConditionalTypeAnnotation':
          return oD(e, t, n);
        case 'InferTypeAnnotation':
          return og(e, t, n);
        case 'FunctionTypeAnnotation':
          return oA(e, t, n);
        case 'TupleTypeAnnotation':
          return an(e, t, n);
        case 'TupleTypeLabeledElement':
          return ob(e, t, n);
        case 'TupleTypeSpreadElement':
          return oB(e, t, n);
        case 'GenericTypeAnnotation':
          return [n('id'), oP(e, t, n, 'typeParameters')];
        case 'IndexedAccessType':
        case 'OptionalIndexedAccessType':
          return ox(e, t, n);
        case 'TypeAnnotation':
          return ue(e, t, n);
        case 'TypeParameter':
          return ok(e, t, n);
        case 'TypeofTypeAnnotation':
          return oI(e, n);
        case 'ExistsTypeAnnotation':
          return '*';
        case 'ArrayTypeAnnotation':
          return om(n);
        case 'DeclareEnum':
        case 'EnumDeclaration':
          return oE(e, n);
        case 'EnumBody':
          return (function (e, t, n) {
            let { node: r } = e;
            return [r.explicitType ? `of ${r.explicitType} ` : '', a7(e, t, n)];
          })(e, t, n);
        case 'EnumBooleanBody':
        case 'EnumNumberBody':
        case 'EnumBigIntBody':
        case 'EnumStringBody':
        case 'EnumSymbolBody':
          return (function (e, t, n) {
            let { node: r } = e;
            return [
              'EnumSymbolBody' === r.type || r.explicitType
                ? `of ${r.type.slice(4, -4).toLowerCase()} `
                : '',
              a7(e, t, n)
            ];
          })(e, t, n);
        case 'EnumBooleanMember':
        case 'EnumNumberMember':
        case 'EnumBigIntMember':
        case 'EnumStringMember':
        case 'EnumDefaultedMember':
          return oF(e, t, n);
        case 'FunctionTypeParam': {
          let t = u.name ? n('name') : e.parent.this === u ? 'this' : '';
          return [t, rC(e), t ? ': ' : '', n('typeAnnotation')];
        }
        case 'DeclareClass':
        case 'DeclareInterface':
        case 'InterfaceDeclaration':
        case 'InterfaceTypeAnnotation':
        case 'RecordDeclaration':
          return a$(e, t, n);
        case 'ObjectTypeAnnotation':
        case 'RecordDeclarationBody':
          return aj(e, t, n);
        case 'ClassImplements':
        case 'InterfaceExtends':
          return [n('id'), n('typeParameters')];
        case 'RecordDeclarationImplements':
          return [n('id'), n('typeArguments')];
        case 'NullableTypeAnnotation':
          return ['?', n('typeAnnotation')];
        case 'Variance': {
          let { kind: e } = u;
          return (p(), 'plus' === e ? '+' : 'minus' === e ? '-' : `${e} `);
        }
        case 'KeyofTypeAnnotation':
          return ['keyof ', n('argument')];
        case 'ObjectTypeCallProperty':
          return [u.static ? 'static ' : '', n('value'), aO(e, t)];
        case 'ObjectTypeMappedTypeProperty':
          return (function (e, t, n) {
            let { node: r } = e;
            return [
              nb([
                r.variance ? n('variance') : '',
                nb([
                  '[',
                  ng([nM, n('keyTparam'), ' in ', n('sourceType')]),
                  nM,
                  ']'
                ]),
                (function (e) {
                  switch (e) {
                    case null:
                      return '';
                    case 'PlusOptional':
                      return '+?';
                    case 'MinusOptional':
                      return '-?';
                    case 'Optional':
                      return '?';
                  }
                })(r.optional),
                ': ',
                n('propType')
              ]),
              aO(e, t)
            ];
          })(e, t, n);
        case 'ObjectTypeIndexer':
          return [
            u.static ? 'static ' : '',
            u.variance ? n('variance') : '',
            '[',
            n('id'),
            u.id ? ': ' : '',
            n('key'),
            ']: ',
            n('value'),
            aO(e, t)
          ];
        case 'ObjectTypeProperty': {
          let r = '';
          return (
            u.proto ? (r = 'proto ') : u.static && (r = 'static '),
            [
              r,
              'init' !== u.kind ? u.kind + ' ' : '',
              u.variance ? n('variance') : '',
              r0(e, t, n),
              rC(e),
              A(u) ? '' : ': ',
              n('value'),
              aO(e, t)
            ]
          );
        }
        case 'ObjectTypeInternalSlot':
          return [
            u.static ? 'static ' : '',
            '[[',
            n('id'),
            ']]',
            rC(e),
            u.method ? '' : ': ',
            n('value'),
            aO(e, t)
          ];
        case 'ObjectTypeSpreadProperty':
          return oi(e, n);
        case 'QualifiedTypeofIdentifier':
        case 'QualifiedTypeIdentifier':
          return [n('qualification'), '.', n('id')];
        case 'NullLiteralTypeAnnotation':
          return 'null';
        case 'BooleanLiteralTypeAnnotation':
          return String(u.value);
        case 'StringLiteralTypeAnnotation':
          return nA(rG(w(u), t));
        case 'NumberLiteralTypeAnnotation':
          return rJ(w(u));
        case 'BigIntLiteralTypeAnnotation':
          return a1(w(u));
        case 'TypeCastExpression':
          return ['(', n('expression'), r4(e, n), ')'];
        case 'TypePredicate':
          return ow(e, n);
        case 'TypeOperator':
          return [u.operator, ' ', n('typeAnnotation')];
        case 'TypeParameterDeclaration':
        case 'TypeParameterInstantiation':
          return oP(e, t, n, 'params');
        case 'InferredPredicate':
        case 'DeclaredPredicate':
          return [
            'predicate' !== e.key ||
            'DeclareFunction' === e.parent.type ||
            e.parent.returnType
              ? ' '
              : ': ',
            '%checks',
            ...('DeclaredPredicate' === u.type ? ['(', n('value'), ')'] : [])
          ];
        case 'AsExpression':
        case 'AsConstExpression':
        case 'SatisfiesExpression':
          return of(e, t, n);
        case 'MatchExpression':
        case 'MatchStatement':
          return (function (e, t, n) {
            let { node: r } = e;
            return [
              nb(['match (', ng([nM, n('argument')]), nM, ')']),
              ' {',
              r.cases.length > 0
                ? ng([
                    nL,
                    nw(
                      nL,
                      e.map(
                        ({ node: e, isLast: r }) => [
                          n(),
                          !r && rn(e, t) ? nL : ''
                        ],
                        'cases'
                      )
                    )
                  ])
                : '',
              nL,
              '}'
            ];
          })(e, t, n);
        case 'MatchExpressionCase':
        case 'MatchStatementCase':
          return (function (e, t, n) {
            let { node: r } = e,
              u = tb(r, 8) ? [' ', rd(e, t)] : [],
              a =
                'MatchStatementCase' === r.type
                  ? [' ', n('body')]
                  : ng([nN, n('body'), ',']);
            return [
              n('pattern'),
              r.guard ? nb([ng([nN, 'if (', n('guard'), ')'])]) : '',
              nb([' =>', u, a])
            ];
          })(e, t, n);
        case 'MatchOrPattern':
        case 'MatchAsPattern':
        case 'MatchWildcardPattern':
        case 'MatchLiteralPattern':
        case 'MatchUnaryPattern':
        case 'MatchIdentifierPattern':
        case 'MatchInstancePattern':
        case 'MatchInstanceObjectPattern':
        case 'MatchMemberPattern':
        case 'MatchBindingPattern':
        case 'MatchObjectPattern':
        case 'MatchObjectPatternProperty':
        case 'MatchRestPattern':
        case 'MatchArrayPattern':
          return (function (e, t, n) {
            let { node: r } = e;
            switch (r.type) {
              case 'MatchOrPattern':
                return (function (e, t, n) {
                  let { node: r } = e,
                    { parent: u } = e,
                    a =
                      'MatchStatementCase' !== u.type &&
                      'MatchExpressionCase' !== u.type &&
                      'MatchArrayPattern' !== u.type &&
                      'MatchObjectPatternProperty' !== u.type &&
                      !tH(t.originalText, r),
                    o =
                      !!oS(r) ||
                      'MatchObjectPattern' === r.type ||
                      ('MatchOrPattern' === r.type &&
                        (function (e) {
                          let { patterns: t } = e;
                          if (t.some(e => tb(e))) return !1;
                          let n = t.find(e => 'MatchObjectPattern' === e.type);
                          return !!n && t.every(e => e === n || oS(e));
                        })(r)),
                    i = e.map(() => {
                      let r = n();
                      return (o || (r = nh(2, r)), rE(e, r, t));
                    }, 'patterns');
                  if (o) return nw(' | ', i);
                  let s = [nP(['| ']), nw([nN, '| '], i)];
                  return t1(e, t)
                    ? nb([ng([nP([nM]), s]), nM])
                    : 'MatchArrayPattern' === u.type && u.elements.length > 1
                      ? nb([ng([nP(['(', nM]), s]), nM, nP(')')])
                      : nb(a ? ng(s) : s);
                })(e, t, n);
              case 'MatchAsPattern':
                return [n('pattern'), ' as ', n('target')];
              case 'MatchWildcardPattern':
                return ['_'];
              case 'MatchLiteralPattern':
                return n('literal');
              case 'MatchUnaryPattern':
                return [r.operator, n('argument')];
              case 'MatchIdentifierPattern':
                return n('id');
              case 'MatchMemberPattern': {
                let e =
                  'Identifier' === r.property.type
                    ? ['.', n('property')]
                    : ['[', ng([nM, n('property')]), nM, ']'];
                return nb([n('base'), e]);
              }
              case 'MatchBindingPattern':
                return [r.kind, ' ', n('id')];
              case 'MatchObjectPattern':
              case 'MatchInstanceObjectPattern':
                return (function (e, t) {
                  let { node: n } = e,
                    r = e.map(t, 'properties');
                  return (
                    n.rest && r.push(t('rest')),
                    nb([
                      '{',
                      ng([nM, nw([',', nN], r)]),
                      n.rest ? '' : nP(','),
                      nM,
                      '}'
                    ])
                  );
                })(e, n);
              case 'MatchInstancePattern':
                return nb([n('targetConstructor'), ' ', n('properties')]);
              case 'MatchArrayPattern': {
                let t = e.map(n, 'elements');
                return (
                  r.rest && t.push(n('rest')),
                  nb([
                    '[',
                    ng([nM, nw([',', nN], t)]),
                    r.rest ? '' : nP(','),
                    nM,
                    ']'
                  ])
                );
              }
              case 'MatchObjectPatternProperty':
                return r.shorthand
                  ? n('pattern')
                  : nb([n('key'), ':', ng([nN, n('pattern')])]);
              case 'MatchRestPattern': {
                let e = ['...'];
                return (r.argument && e.push(n('argument')), e);
              }
            }
          })(e, t, n);
        case 'RecordExpression':
          return [
            n('recordConstructor'),
            n('typeArguments'),
            ' ',
            n('properties')
          ];
        case 'RecordExpressionProperties':
          return a7(e, t, n);
        case 'RecordDeclarationProperty':
        case 'RecordDeclarationStaticProperty': {
          let r = 'RecordDeclarationStaticProperty' === u.type,
            a = r ? 'value' : 'defaultValue';
          return [
            r ? 'static ' : '',
            r0(e, t, n),
            r4(e, n),
            u[a] ? [' = ', n(a)] : ''
          ];
        }
      }
    }
    var oM = e => '' === e || e === nN || e === nL || e === nM;
    function oj(e, t, n, r) {
      return e
        ? ''
        : (('JSXElement' !== n.type || n.closingElement) &&
              (r?.type !== 'JSXElement' || r.closingElement)) ||
            1 === t.length
          ? nM
          : nL;
    }
    function oL(e, t, n, r) {
      return e
        ? nL
        : 1 === t.length &&
            ('JSXElement' !== n.type || n.closingElement) &&
            (r?.type !== 'JSXElement' || r.closingElement)
          ? nM
          : nL;
    }
    var oO = l([
      'ArrayExpression',
      'JSXAttribute',
      'JSXElement',
      'JSXExpressionContainer',
      'JSXFragment',
      'ExpressionStatement',
      'NewExpression',
      'CallExpression',
      'OptionalCallExpression',
      'ConditionalExpression',
      'JsExpressionRoot',
      'MatchExpressionCase'
    ]);
    function oJ(e, t, n) {
      let { node: r } = e;
      if (r.type.startsWith('JSX'))
        switch (r.type) {
          case 'JSXAttribute':
            return (function (e, t, n) {
              let { node: r } = e,
                u = [n('name')];
              if (r.value) {
                let a;
                if (M(r.value)) {
                  let n = ek(
                      0,
                      ek(0, w(r.value).slice(1, -1), '&apos;', "'"),
                      '&quot;',
                      '"'
                    ),
                    u = rW(n, t.jsxSingleQuote);
                  ((n =
                    '"' === u
                      ? ek(0, n, '"', '&quot;')
                      : ek(0, n, "'", '&apos;')),
                    (a = e.call(() => rE(e, nA(u + n + u), t), 'value')));
                } else a = n('value');
                u.push('=', a);
              }
              return u;
            })(e, t, n);
          case 'JSXIdentifier':
            return r.name;
          case 'JSXNamespacedName':
            return nw(':', [n('namespace'), n('name')]);
          case 'JSXMemberExpression':
            return nw('.', [n('object'), n('property')]);
          case 'JSXSpreadAttribute':
          case 'JSXSpreadChild':
            return (function (e, t, n) {
              let { node: r } = e;
              return [
                '{',
                e.call(
                  ({ node: r }) => {
                    let u = ['...', n()];
                    return tb(r) ? [ng([nM, rE(e, u, t)]), nM] : u;
                  },
                  'JSXSpreadAttribute' === r.type ? 'argument' : 'expression'
                ),
                '}'
              ];
            })(e, t, n);
          case 'JSXExpressionContainer':
            return (function (e, t) {
              let { node: n } = e,
                r = (e, t) =>
                  'JSXEmptyExpression' === e.type ||
                  (!tb(e) &&
                    ($(e) ||
                      U(e) ||
                      'ArrowFunctionExpression' === e.type ||
                      ('AwaitExpression' === e.type &&
                        (r(e.argument, e) ||
                          'JSXElement' === e.argument.type)) ||
                      Q(tY(e)) ||
                      'FunctionExpression' === e.type ||
                      'TemplateLiteral' === e.type ||
                      'TaggedTemplateExpression' === e.type ||
                      'DoExpression' === e.type ||
                      (H(t) && ('ConditionalExpression' === e.type || z(e)))));
              return r(n.expression, e.parent)
                ? nb(['{', t('expression'), nq, '}'])
                : nb(['{', ng([nM, t('expression')]), nM, nq, '}']);
            })(e, n);
          case 'JSXFragment':
          case 'JSXElement':
            let u;
            return (
              (u = rE(
                e,
                (function (e, t, n) {
                  let { node: r } = e;
                  if (
                    'JSXElement' === r.type &&
                    (function (e) {
                      if (0 === e.children.length) return !0;
                      if (e.children.length > 1) return !1;
                      let t = e.children[0];
                      return 'JSXText' === t.type && !uQ(t);
                    })(r)
                  )
                    return [n('openingElement'), n('closingElement')];
                  let u = n(
                      'JSXElement' === r.type
                        ? 'openingElement'
                        : 'openingFragment'
                    ),
                    a = n(
                      'JSXElement' === r.type
                        ? 'closingElement'
                        : 'closingFragment'
                    );
                  if (
                    1 === r.children.length &&
                    'JSXExpressionContainer' === r.children[0].type &&
                    ('TemplateLiteral' === r.children[0].expression.type ||
                      'TaggedTemplateExpression' ===
                        r.children[0].expression.type)
                  )
                    return [u, ...e.map(n, 'children'), a];
                  r.children = r.children.map(e => {
                    var t;
                    return 'JSXExpressionContainer' === (t = e).type &&
                      M(t.expression) &&
                      ' ' === t.expression.value &&
                      !tb(t.expression)
                      ? { type: 'JSXText', value: ' ', raw: ' ' }
                      : e;
                  });
                  let o = r.children.some(H),
                    i =
                      r.children.filter(
                        e => 'JSXExpressionContainer' === e.type
                      ).length > 1,
                    s =
                      'JSXElement' === r.type &&
                      r.openingElement.attributes.length > 1,
                    p = nm(u) || o || s || i,
                    l = 'mdx' === e.parent.rootMarker,
                    c = t.singleQuote ? "{' '}" : '{" "}',
                    D = l ? nN : nP([c, nM], ' '),
                    d = (function (e, t, n, r) {
                      let u = '',
                        a = [u];
                      function o(e) {
                        ((u = e), a.push([a.pop(), e]));
                      }
                      function i(e) {
                        '' !== e && ((u = e), a.push(e, ''));
                      }
                      return (
                        e.each(({ node: e, next: a }) => {
                          if ('JSXText' === e.type) {
                            let t = w(e);
                            if (uQ(e)) {
                              let s,
                                p = uz.split(t, !0);
                              if (
                                ('' === p[0] &&
                                  (p.shift(),
                                  /\n/.test(p[0]) ? i(oL(r, p[1], e, a)) : i(n),
                                  p.shift()),
                                '' === y(0, p, -1) && (p.pop(), (s = p.pop())),
                                0 === p.length)
                              )
                                return;
                              for (let [e, t] of p.entries())
                                e % 2 == 1 ? i(nN) : o(t);
                              void 0 !== s
                                ? /\n/.test(s)
                                  ? i(oL(r, u, e, a))
                                  : i(n)
                                : i(oj(r, u, e, a));
                            } else
                              /\n/.test(t)
                                ? t.match(/\n/g).length > 1 && i(nL)
                                : i(n);
                          } else if ((o(t()), a && uQ(a))) {
                            let t = uz.trim(w(a)),
                              [n] = uz.split(t);
                            i(oj(r, n, e, a));
                          } else i(nL);
                        }, 'children'),
                        a
                      );
                    })(e, n, D, r.openingElement?.name?.name === 'fbt'),
                    m = r.children.some(e => uQ(e));
                  for (let e = d.length - 2; e >= 0; e--) {
                    let t = '' === d[e] && '' === d[e + 1],
                      n = d[e] === nL && '' === d[e + 1] && d[e + 2] === nL,
                      r =
                        (d[e] === nM || d[e] === nL) &&
                        '' === d[e + 1] &&
                        d[e + 2] === D,
                      u =
                        d[e] === D &&
                        '' === d[e + 1] &&
                        (d[e + 2] === nM || d[e + 2] === nL),
                      a = d[e] === D && '' === d[e + 1] && d[e + 2] === D,
                      o =
                        (d[e] === nM && '' === d[e + 1] && d[e + 2] === nL) ||
                        (d[e] === nL && '' === d[e + 1] && d[e + 2] === nM);
                    (n && m) || t || r || a || o
                      ? d.splice(e, 2)
                      : u && d.splice(e + 1, 2);
                  }
                  for (; d.length > 0 && oM(y(0, d, -1));) d.pop();
                  for (; d.length > 1 && oM(d[0]) && oM(d[1]);)
                    (d.shift(), d.shift());
                  let f = [''];
                  for (let [e, t] of d.entries()) {
                    if (t === D) {
                      if (
                        1 === e &&
                        (function (e) {
                          let t = !0;
                          return (
                            nc(e, e => {
                              switch (ns(e)) {
                                case t2:
                                  if ('' === e) break;
                                case t9:
                                case nr:
                                case nu:
                                case no:
                                  return ((t = !1), !1);
                              }
                            }),
                            t
                          );
                        })(d[e - 1])
                      ) {
                        if (2 === d.length) {
                          f.push([f.pop(), c]);
                          continue;
                        }
                        f.push([c, nL], '');
                        continue;
                      }
                      if (
                        e === d.length - 1 ||
                        ('' === d[e - 1] && d[e - 2] === nL)
                      ) {
                        f.push([f.pop(), c]);
                        continue;
                      }
                    }
                    (e % 2 == 0 ? f.push([f.pop(), t]) : f.push(t, ''),
                      nm(t) && (p = !0));
                  }
                  let F = m ? nB(f) : nb(f, { shouldBreak: !0 });
                  if (
                    (t.cursorNode?.type === 'JSXText' &&
                    r.children.includes(t.cursorNode)
                      ? (F = [nS, F, nS])
                      : t.nodeBeforeCursor?.type === 'JSXText' &&
                          r.children.includes(t.nodeBeforeCursor)
                        ? (F = [nS, F])
                        : t.nodeAfterCursor?.type === 'JSXText' &&
                          r.children.includes(t.nodeAfterCursor) &&
                          (F = [F, nS]),
                    l)
                  )
                    return F;
                  let E = nb([u, ng([nL, F]), nL, a]);
                  return p ? E : nv([nb([u, ...d, a]), E]);
                })(e, t, n),
                t
              )),
              (function (e, t, n) {
                var r;
                let { parent: u } = e;
                if (oO(u)) return t;
                let a =
                    (r = e).match(
                      void 0,
                      (e, t) =>
                        'body' === t && 'ArrowFunctionExpression' === e.type,
                      (e, t) => 'arguments' === t && Q(e)
                    ) &&
                    (r.match(
                      void 0,
                      void 0,
                      void 0,
                      (e, t) =>
                        'expression' === t &&
                        'JSXExpressionContainer' === e.type
                    ) ||
                      r.match(
                        void 0,
                        void 0,
                        void 0,
                        (e, t) =>
                          'expression' === t && 'ChainExpression' === e.type,
                        (e, t) =>
                          'expression' === t &&
                          'JSXExpressionContainer' === e.type
                      )),
                  o = t1(e, n);
                return nb(
                  [o ? '' : nP('('), ng([nM, t]), nM, o ? '' : nP(')')],
                  { shouldBreak: a }
                );
              })(e, u, t)
            );
          case 'JSXOpeningElement':
            return (function (e, t, n) {
              var r, u, a, o, i, s;
              let p,
                { node: l } = e,
                c = tb(l.name) || tb(l.typeArguments);
              if (l.selfClosing && 0 === l.attributes.length && !c)
                return ['<', n('name'), n('typeArguments'), ' />'];
              if (
                l.attributes?.length === 1 &&
                M(l.attributes[0].value) &&
                !l.attributes[0].value.value.includes(`
`) &&
                !c &&
                !tb(l.attributes[0])
              )
                return nb([
                  '<',
                  n('name'),
                  n('typeArguments'),
                  ' ',
                  ...e.map(n, 'attributes'),
                  l.selfClosing ? ' />' : '>'
                ]);
              let D = l.attributes?.some(
                  e =>
                    M(e.value) &&
                    e.value.value.includes(`
`)
                ),
                d =
                  t.singleAttributePerLine && l.attributes.length > 1 ? nL : nN;
              return nb(
                [
                  '<',
                  n('name'),
                  n('typeArguments'),
                  ng(
                    e.map(
                      ({ isFirst: e, previous: r }) => [
                        e ? d : rn(r, t) ? [nL, nL] : d,
                        n()
                      ],
                      'attributes'
                    )
                  ),
                  ...((r = l),
                  (u = t),
                  (a = c),
                  r.selfClosing
                    ? [nN, '/>']
                    : ((o = r),
                        (i = u),
                        (s = a),
                        (p =
                          o.attributes.length > 0 &&
                          tb(y(0, o.attributes, -1), 4)),
                        (0 === o.attributes.length && !s) ||
                          ((i.bracketSameLine || i.jsxBracketSameLine) &&
                            (!s || o.attributes.length > 0) &&
                            !p))
                      ? ['>']
                      : [nM, '>'])
                ],
                { shouldBreak: D }
              );
            })(e, t, n);
          case 'JSXClosingElement':
            return (function (e, t) {
              let { node: n } = e,
                r = ['</'],
                u = t('name');
              return (
                tb(n.name, 34)
                  ? r.push(ng([nL, u]), nL)
                  : tb(n.name, 18)
                    ? r.push(' ', u)
                    : r.push(u),
                r.push('>'),
                r
              );
            })(e, n);
          case 'JSXOpeningFragment':
          case 'JSXClosingFragment':
            return (function (e, t) {
              let { node: n } = e,
                r = tb(n),
                u = tb(n, 32),
                a = 'JSXOpeningFragment' === n.type;
              return [
                a ? '<' : '</',
                ng([u ? nL : r && !a ? ' ' : '', rd(e, t)]),
                u ? nL : '',
                '>'
              ];
            })(e, t);
          case 'JSXEmptyExpression':
            return (function (e, t) {
              let { node: n } = e,
                r = tb(n, 32);
              return [rd(e, t, { indent: r }), r ? nL : ''];
            })(e, t);
          case 'JSXText':
            throw Error('JSXText should be handled by JSXElement');
          default:
            throw new uZ(r, 'JSX');
        }
    }
    function oq(e, t, n) {
      let { node: r } = e;
      return [r.postfix ? '' : n, r4(e, t), r.postfix ? n : ''];
    }
    function oR(e, t, n, r) {
      let { node: u } = e;
      if (u.type.startsWith('TS')) {
        if (ra(u)) return u.type.slice(2, -7).toLowerCase();
        switch (u.type) {
          case 'TSThisType':
            return 'this';
          case 'TSTypeAssertion':
            return (function (e, t) {
              let { node: n } = e,
                r = !($(n.expression) || U(n.expression)),
                u = nb(['<', ng([nM, t('typeAnnotation')]), nM, '>']),
                a = [nP('('), ng([nM, t('expression')]), nM, nP(')')];
              return r
                ? nv([
                    [u, t('expression')],
                    [u, nb(a, { shouldBreak: !0 })],
                    [u, t('expression')]
                  ])
                : nb([u, t('expression')]);
            })(e, n);
          case 'TSDeclareFunction':
            return ut(e, t, n);
          case 'TSExportAssignment':
            return ['export = ', n('expression'), rw(t)];
          case 'TSModuleBlock':
            return aN(e, t, n);
          case 'TSInterfaceBody':
          case 'TSTypeLiteral':
            return aj(e, t, n);
          case 'TSTypeAliasDeclaration':
            return ov(e, t, n);
          case 'TSQualifiedName':
            return [n('left'), '.', n('right')];
          case 'TSAbstractMethodDefinition':
          case 'TSDeclareMethod':
            return aH(e, t, n);
          case 'TSAbstractAccessorProperty':
          case 'TSAbstractPropertyDefinition':
            return az(e, t, n);
          case 'TSInterfaceHeritage':
          case 'TSClassImplements':
          case 'TSInstantiationExpression':
            return [n('expression'), n('typeArguments')];
          case 'TSTemplateLiteralType':
            return um(e, t, n);
          case 'TSNamedTupleMember':
            return ob(e, t, n);
          case 'TSRestType':
            return oB(e, t, n);
          case 'TSOptionalType':
            return [n('typeAnnotation'), '?'];
          case 'TSInterfaceDeclaration':
            return a$(e, t, n);
          case 'TSTypeParameterDeclaration':
          case 'TSTypeParameterInstantiation':
            return oP(e, t, n, 'params');
          case 'TSTypeParameter':
            return ok(e, t, n);
          case 'TSAsExpression':
          case 'TSSatisfiesExpression':
            return of(e, t, n);
          case 'TSArrayType':
            return om(n);
          case 'TSPropertySignature':
            return [
              u.readonly ? 'readonly ' : '',
              r0(e, t, n),
              rC(e),
              r4(e, n),
              aO(e, t)
            ];
          case 'TSParameterProperty':
            return [
              rB(u),
              u.static ? 'static ' : '',
              u.override ? 'override ' : '',
              u.readonly ? 'readonly ' : '',
              n('parameter')
            ];
          case 'TSTypeQuery':
            return oI(e, n);
          case 'TSIndexSignature':
            return (function (e, t, n) {
              let { node: r } = e,
                u = r.parameters.length > 1 ? rk(t) : '',
                a = nb([
                  ng([nM, nw([', ', nM], e.map(n, 'parameters'))]),
                  u,
                  nM
                ]);
              return [
                'body' === e.key && 'ClassBody' === e.parent.type && r.static
                  ? 'static '
                  : '',
                r.readonly ? 'readonly ' : '',
                '[',
                r.parameters ? a : '',
                ']',
                r4(e, n),
                aO(e, t)
              ];
            })(e, t, n);
          case 'TSTypePredicate':
            return ow(e, n);
          case 'TSNonNullExpression':
            return [n('expression'), '!'];
          case 'TSImportType':
            return [
              ax(e, t, n),
              u.qualifier ? ['.', n('qualifier')] : '',
              oP(e, t, n, 'typeArguments')
            ];
          case 'TSLiteralType':
            return n('literal');
          case 'TSIndexedAccessType':
            return ox(e, t, n);
          case 'TSTypeOperator':
            return [u.operator, ' ', n('typeAnnotation')];
          case 'TSMappedType':
            return (function (e, t, n) {
              let { node: r } = e,
                u = !1;
              if ('preserve' === t.objectWrap) {
                let e = eI(t),
                  n = g(r) + 1,
                  a = e.slice(n),
                  o = n + a.search(/\S/);
                eg(t.originalText, n, o) && (u = !0);
              }
              let a = [],
                o = tv(r, 8);
              if (o.length > 0) {
                let n = y(0, o, -1),
                  r = rd(e, t);
                a.push(
                  ...r.slice(0, -1),
                  nb([y(0, r, -1), ej(n) || ex(t.originalText, P(n)) ? nL : nN])
                );
              }
              return nb(
                [
                  '{',
                  ng([
                    t.bracketSpacing ? nN : nM,
                    ...a,
                    r.readonly ? [oT(r.readonly, 'readonly'), ' '] : '',
                    nb([
                      '[',
                      ng([
                        nM,
                        n('key'),
                        ' in ',
                        n('constraint'),
                        r.nameType ? [' as ', n('nameType')] : ''
                      ]),
                      nM,
                      ']'
                    ]),
                    r.optional ? oT(r.optional, '?') : '',
                    r.typeAnnotation ? ': ' : '',
                    n('typeAnnotation'),
                    t.semi ? nP(';') : ''
                  ]),
                  t.bracketSpacing ? nN : nM,
                  '}'
                ],
                { shouldBreak: u }
              );
            })(e, t, n);
          case 'TSMethodSignature':
            return (function (e, t, n) {
              let { node: r } = e,
                u = [],
                a = r.kind && 'method' !== r.kind ? `${r.kind} ` : '';
              u.push(rB(r), a, r0(e, t, n), rC(e));
              let o = rN(e, t, n, !1, !0),
                i = r4(e, n, 'returnType'),
                s = rj(r, i);
              return (
                u.push(s ? nb(o) : o),
                r.returnType && u.push(nb(i)),
                [nb(u), aO(e, t)]
              );
            })(e, t, n);
          case 'TSNamespaceExportDeclaration':
            return ['export as namespace ', n('id'), rw(t)];
          case 'TSEnumDeclaration':
            return oE(e, n);
          case 'TSEnumBody':
            return a7(e, t, n);
          case 'TSEnumMember':
            return oF(e, t, n);
          case 'TSImportEqualsDeclaration':
            return [
              'import ',
              ot(u, !1),
              n('id'),
              ' = ',
              n('moduleReference'),
              rw(t)
            ];
          case 'TSExternalModuleReference':
            return ax(e, t, n);
          case 'TSModuleDeclaration':
            return (function (e, t, n) {
              let { node: r } = e;
              return [
                rh(e),
                'global' === r.kind ? '' : `${r.kind} `,
                n('id'),
                r.body ? [' ', nb(n('body'))] : rw(t)
              ];
            })(e, t, n);
          case 'TSConditionalType':
            return oD(e, t, n);
          case 'TSInferType':
            return og(e, t, n);
          case 'TSIntersectionType':
            return oh(e, t, n);
          case 'TSUnionType':
            return r7(e, t, n, r);
          case 'TSFunctionType':
          case 'TSCallSignatureDeclaration':
          case 'TSConstructorType':
          case 'TSConstructSignatureDeclaration':
            return oA(e, t, n);
          case 'TSTupleType':
            return an(e, t, n);
          case 'TSTypeReference':
            return [n('typeName'), oP(e, t, n, 'typeArguments')];
          case 'TSTypeAnnotation':
            return ue(e, t, n);
          case 'TSEmptyBodyFunctionExpression':
            return ur(e, t, n);
          case 'TSJSDocAllType':
            return '*';
          case 'TSJSDocUnknownType':
            return '?';
          case 'TSJSDocNullableType':
            return oq(e, n, '?');
          case 'TSJSDocNonNullableType':
            return oq(e, n, '!');
          default:
            throw new uZ(u, 'TypeScript');
        }
      }
    }
    var oX = l([
      'ClassMethod',
      'ClassPrivateMethod',
      'ClassProperty',
      'ClassAccessorProperty',
      'AccessorProperty',
      'TSAbstractAccessorProperty',
      'PropertyDefinition',
      'TSAbstractPropertyDefinition',
      'ClassPrivateProperty',
      'MethodDefinition',
      'TSAbstractMethodDefinition',
      'TSDeclareMethod'
    ]);
    function o_(e, t, n, r) {
      e.isRoot && t.__onHtmlBindingRoot?.(e.node, t);
      let { node: u } = e,
        a = uY(e)
          ? (function (e, t) {
              let { node: n } = e,
                r = t.originalText.slice(g(n), P(n));
              return (
                t.semi && v(n) ? (r += ';') : uo(e, t) && (r = `;${r}`),
                'ClassExpression' === n.type && s(n.decorators)
                  ? [ng([nM, r]), nM]
                  : r
              );
            })(e, t)
          : (function (e, t, n, r) {
              for (let u of [u3, oJ, oN, oR, od]) {
                let a = u(e, t, n, r);
                if (void 0 !== a) return a;
              }
            })(e, t, n, r);
      if (!a) return '';
      if (oX(u)) return a;
      a = (function (e, t, n) {
        let { node: r } = e;
        return (tb(r, 2) || tb(r, 4)) && tk(e)
          ? [ng([nM, rE(e, n, t)]), nM]
          : n;
      })(e, t, a);
      let o =
          'ClassExpression' !== u.type && s(u.decorators) ? u4(e, t, n) : '',
        i = t1(e, t);
      return o || i
        ? nx(a, e => [i ? '(' : '', o ? nb([o, e]) : e, i ? ')' : ''])
        : a;
    }
    var oW = {
        features: {
          experimental_avoidAstMutation: !0,
          experimental_locForRangeFormat: { locStart: g, locEnd: x }
        },
        massageAstNode: uj,
        canAttachComment: function (e, t) {
          return (
            !(
              ea(e) ||
              ((e, [t]) =>
                (t?.type === 'ComponentParameter' &&
                  t.shorthand &&
                  t.name === e &&
                  t.local !== t.name) ||
                (t?.type === 'MatchObjectPatternProperty' &&
                  t.shorthand &&
                  t.key === e) ||
                (t?.type === 'ObjectProperty' &&
                  t.shorthand &&
                  t.key === e &&
                  t.value !== t.key) ||
                (t?.type === 'Property' &&
                  t.shorthand &&
                  t.key === e &&
                  !A(t) &&
                  t.value !== t.key) ||
                (t?.type === 'ImportSpecifier' &&
                  eu(t) &&
                  t.local === e &&
                  t.local !== t.imported) ||
                (t?.type === 'ExportSpecifier' &&
                  eu(t) &&
                  t.exported === e &&
                  t.local !== t.exported))(e, t) ||
              ((e, [t]) =>
                !!(
                  'FunctionExpression' === e.type &&
                  'MethodDefinition' === t.type &&
                  t.value === e &&
                  0 === F(e).length &&
                  !e.returnType &&
                  !s(e.typeParameters) &&
                  e.body
                ))(e, t)
            ) &&
            ('EmptyStatement' === e.type
              ? E({ node: e, parent: t[0] })
              : !(
                  ((e, [t, ...n]) =>
                    eo(e, [t]) || (t?.typeName === e && eo(t, n)))(e, t) ||
                  ('TSTypeAnnotation' === e.type &&
                    'TSPropertySignature' === t[0].type)
                ))
          );
        },
        handleComments: {
          endOfLine: function (e) {
            return [
              te,
              ez,
              tt,
              e0,
              ts,
              eU,
              eV,
              eG,
              eQ,
              e2,
              eR,
              tn,
              tr,
              to,
              ti,
              tD,
              tf,
              tF,
              tA,
              tm,
              tg,
              th,
              tC,
              tx
            ].some(t => t(e));
          },
          ownLine: function (e) {
            return [
              te,
              td,
              e0,
              tt,
              eY,
              eU,
              eV,
              eG,
              eQ,
              e2,
              eR,
              tu,
              ta,
              ti,
              ts,
              tp,
              e3,
              tn,
              eZ,
              tE,
              tm,
              tx,
              tT
            ].some(t => t(e));
          },
          remaining: function (e) {
            return [
              te,
              td,
              eU,
              eV,
              eG,
              eR,
              e3,
              ti,
              tD,
              tm,
              e9,
              e7,
              ty,
              th,
              tx,
              tT
            ].some(t => t(e));
          }
        },
        isGap: function (e, { parser: t }) {
          if ('flow' === t || 'hermes' === t || 'babel-flow' === t)
            return (
              '' === (e = ek(0, e, /[\s(]/g, '')) || '/*' === e || '/*::' === e
            );
        },
        willPrintOwnComments: function (e, t) {
          let { key: n, parent: r } = e;
          if (
            ('types' === n && O(r)) ||
            ('argument' === n && 'JSXSpreadAttribute' === r.type) ||
            ('expression' === n && 'JSXSpreadChild' === r.type) ||
            ('superClass' === n &&
              ('ClassDeclaration' === r.type ||
                'ClassExpression' === r.type)) ||
            (('id' === n || 'typeParameters' === n) && uD(r)) ||
            ('patterns' === n && 'MatchOrPattern' === r.type) ||
            tk(e)
          )
            return !0;
          let { node: u } = e;
          return (
            !tP(u) &&
            ('ExpressionStatement' === u.type
              ? uc(e, t)
              : O(u)
                ? r6(e)
                : !!H(u))
          );
        },
        embed: function (e) {
          let { node: t } = e;
          if (
            'TemplateLiteral' !== t.type ||
            (function ({ quasis: e }) {
              return e.some(({ value: { cooked: e } }) => null === e);
            })(t)
          )
            return;
          let n = uP.find(({ test: t }) => t(e));
          if (n)
            return 1 === t.quasis.length && '' === t.quasis[0].value.raw.trim()
              ? '``'
              : n.print;
        },
        insertPragma: function (e) {
          let t,
            {
              shebang: n,
              text: r,
              pragmas: u,
              comments: a
            } = (function (e) {
              let t,
                n = uG(e);
              n && (e = e.slice(n.length + 1));
              let { pragmas: r, comments: u } = (function (e) {
                e = ek(0, e.replace(uO, '').replace(uL, ''), uW, '$1');
                let t = '';
                for (; t !== e;)
                  ((t = e),
                    (e = ek(
                      0,
                      e,
                      uX,
                      `
$1 $2
`
                    )));
                e = e.replace(uR, '').trimEnd();
                let n = Object.create(null),
                  r = ek(0, e, u_, '').replace(uR, '').trimEnd(),
                  u;
                for (; (u = u_.exec(e));) {
                  let e = ek(0, u[2], uq, '');
                  if ('string' == typeof n[u[1]] || Array.isArray(n[u[1]])) {
                    let t = n[u[1]];
                    n[u[1]] = [...u$, ...(Array.isArray(t) ? t : [t]), e];
                  } else n[u[1]] = e;
                }
                return { comments: r, pragmas: n };
              })((t = e.match(uJ)) ? t[0].trimStart() : '');
              return { shebang: n, text: e, pragmas: r, comments: u };
            })(e),
            o = null == (t = r.match(uJ)?.[0]) ? r : r.slice(t.length);
          return (
            (n
              ? `${n}
`
              : '') +
            (function ({ comments: e = '', pragmas: t = {} }) {
              let n = Object.keys(t),
                r = n
                  .flatMap(e => uU(e, t[e]))
                  .map(
                    e => ` * ${e}
`
                  )
                  .join('');
              if (!e) {
                if (0 === n.length) return '';
                if (1 === n.length && !Array.isArray(t[n[0]])) {
                  let e = t[n[0]];
                  return `/** ${uU(n[0], e)[0]} */`;
                }
              }
              let u =
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
                (e ? u : '') +
                (e && n.length > 0
                  ? ` *
`
                  : '') +
                r +
                ' */'
              );
            })({ pragmas: { format: '', ...u }, comments: a.trimStart() }) +
            (o.startsWith(`
`)
              ? `
`
              : `

`) +
            o
          );
        },
        printComment: function (e, t) {
          let n = e.node;
          if (ej(n)) return t.originalText.slice(g(n), P(n)).trimEnd();
          if (uH(n)) {
            var r;
            let e, t;
            return (
              (e = d(uK, (r = n), uV)),
              (t = '*' === r.value[0] && '*' !== r.value[1]),
              [
                '/',
                e.map((n, r) => {
                  if (0 === r) return [n.trimEnd(), nL];
                  if (r === e.length - 1) return [' ', n];
                  let u = n.trimEnd(),
                    a = [' ', u];
                  return t && '*' !== u && n.endsWith('  ')
                    ? [a, '  ', nh({ type: 'root' }, nO)]
                    : [a, nL];
                }),
                '/'
              ]
            );
          }
          if (eM(n)) return ['/*', nA(n.value), '*/'];
          throw Error('Not a comment: ' + JSON.stringify(n));
        },
        printPrettierIgnored: o_,
        print: o_,
        getVisitorKeys: tU,
        isBlockComment: eM,
        hasPrettierIgnore: uY
      },
      o$ = {};
    a(o$, { estree: () => oW, 'estree-json': () => oH });
    var oU = tW({
      JsonRoot: ['node'],
      ArrayExpression: ['elements'],
      ObjectExpression: ['properties'],
      ObjectProperty: ['key', 'value'],
      UnaryExpression: ['argument'],
      NullLiteral: [],
      BooleanLiteral: [],
      StringLiteral: [],
      NumericLiteral: [],
      Identifier: [],
      TemplateLiteral: ['quasis'],
      TemplateElement: []
    });
    function oG(e) {
      return e.extra.raw;
    }
    function oV(e, t) {
      let { type: n } = e;
      if ('ObjectProperty' === n) {
        let { key: n } = e;
        if ('Identifier' === n.type) {
          let { name: e } = n;
          t.key = { type: 'StringLiteral', value: e, extra: { rawValue: e } };
        } else if ('NumericLiteral' === n.type) {
          let e = oG(n);
          String(Number(e)) === e &&
            (t.key = {
              type: 'StringLiteral',
              value: e,
              extra: { rawValue: e }
            });
        }
      }
      if (
        ('StringLiteral' === n && delete t.extra.raw,
        'UnaryExpression' === n && '+' === e.operator)
      )
        return t.argument;
      if (
        (('ArrayExpression' === n || 'ObjectExpression' === n) &&
          (t.extra ?? (t.extra = {}),
          e.extra?.trailingComma && delete t.extra.trailingComma),
        'ArrayExpression' === n)
      ) {
        for (let [n, r] of e.elements.entries())
          null === r && t.elements.splice(n, 0, { type: 'NullLiteral' });
        return;
      }
      if ('TemplateLiteral' === n) {
        let t = e.quasis[0].value.cooked;
        return { type: 'StringLiteral', value: t, extra: { rawValue: t } };
      }
    }
    function oK(e) {
      return 'key' === e.key && 'ObjectProperty' === e.parent.type;
    }
    oV.ignoredProperties = new Set([
      'start',
      'end',
      'loc',
      'comments',
      'leadingComments',
      'trailingComments',
      'innerComments',
      'errors',
      'range',
      'tokens'
    ]);
    var oH = {
        massageAstNode: oV,
        print: function (e, t, n) {
          let { node: r } = e;
          switch (r.type) {
            case 'JsonRoot':
              return [n('node'), nL];
            case 'ArrayExpression':
              if (0 === r.elements.length) return '[]';
              return [
                '[',
                ng([
                  nL,
                  nw(
                    [',', nL],
                    e.map(() => (null === e.node ? 'null' : n()), 'elements')
                  )
                ]),
                nL,
                ']'
              ];
            case 'ObjectExpression':
              return 0 === r.properties.length
                ? '{}'
                : [
                    '{',
                    ng([nL, nw([',', nL], e.map(n, 'properties'))]),
                    nL,
                    '}'
                  ];
            case 'ObjectProperty':
              return [n('key'), ': ', n('value')];
            case 'UnaryExpression':
              return ['+' === r.operator ? '' : r.operator, n('argument')];
            case 'NullLiteral':
              return 'null';
            case 'BooleanLiteral':
              return r.value ? 'true' : 'false';
            case 'StringLiteral':
              return rG(oG(r), t);
            case 'NumericLiteral': {
              let t = oG(r);
              return oK(e) && String(Number(t)) === t ? `"${t}"` : t;
            }
            case 'Identifier':
              return oK(e) ? JSON.stringify(r.name) : r.name;
            case 'TemplateLiteral':
              return n(['quasis', 0]);
            case 'TemplateElement':
              return JSON.stringify(r.value.cooked);
            default:
              throw new uZ(r, 'JSON');
          }
        },
        getVisitorKeys: oU
      },
      oz = 'JavaScript',
      oQ = {
        arrowParens: {
          category: oz,
          type: 'choice',
          default: 'always',
          description:
            'Include parentheses around a sole arrow function parameter.',
          choices: [
            {
              value: 'always',
              description: 'Always include parens. Example: `(x) => x`'
            },
            {
              value: 'avoid',
              description: 'Omit parens when possible. Example: `x => x`'
            }
          ]
        },
        bracketSameLine: {
          category: 'Common',
          type: 'boolean',
          default: !1,
          description:
            'Put > of opening tags on the last line instead of on a new line.'
        },
        objectWrap: {
          category: 'Common',
          type: 'choice',
          default: 'preserve',
          description: 'How to wrap object literals.',
          choices: [
            {
              value: 'preserve',
              description:
                'Keep as multi-line, if there is a newline between the opening brace and first property.'
            },
            {
              value: 'collapse',
              description: 'Fit to a single line when possible.'
            }
          ]
        },
        bracketSpacing: {
          category: 'Common',
          type: 'boolean',
          default: !0,
          description: 'Print spaces between brackets.',
          oppositeDescription: 'Do not print spaces between brackets.'
        },
        jsxBracketSameLine: {
          category: oz,
          type: 'boolean',
          description: 'Put > on the last line instead of at a new line.',
          deprecated: '2.4.0'
        },
        semi: {
          category: oz,
          type: 'boolean',
          default: !0,
          description: 'Print semicolons.',
          oppositeDescription:
            'Do not print semicolons, except at the beginning of lines which may need them.'
        },
        experimentalOperatorPosition: {
          category: oz,
          type: 'choice',
          default: 'end',
          description:
            'Where to print operators when binary expressions wrap lines.',
          choices: [
            {
              value: 'start',
              description: 'Print operators at the start of new lines.'
            },
            {
              value: 'end',
              description: 'Print operators at the end of previous lines.'
            }
          ]
        },
        experimentalTernaries: {
          category: oz,
          type: 'boolean',
          default: !1,
          description:
            'Use curious ternaries, with the question mark after the condition.',
          oppositeDescription:
            'Default behavior of ternaries; keep question marks on the same line as the consequent.'
        },
        singleQuote: {
          category: 'Common',
          type: 'boolean',
          default: !1,
          description: 'Use single quotes instead of double quotes.'
        },
        jsxSingleQuote: {
          category: oz,
          type: 'boolean',
          default: !1,
          description: 'Use single quotes in JSX.'
        },
        quoteProps: {
          category: oz,
          type: 'choice',
          default: 'as-needed',
          description: 'Change when properties in objects are quoted.',
          choices: [
            {
              value: 'as-needed',
              description:
                'Only add quotes around object properties where required.'
            },
            {
              value: 'consistent',
              description:
                'If at least one property in an object requires quotes, quote all properties.'
            },
            {
              value: 'preserve',
              description:
                'Respect the input use of quotes in object properties.'
            }
          ]
        },
        trailingComma: {
          category: oz,
          type: 'choice',
          default: 'all',
          description:
            'Print trailing commas wherever possible when multi-line.',
          choices: [
            {
              value: 'all',
              description:
                'Trailing commas wherever possible (including function arguments).'
            },
            {
              value: 'es5',
              description:
                'Trailing commas where valid in ES5 (objects, arrays, etc.)'
            },
            { value: 'none', description: 'No trailing commas.' }
          ]
        },
        singleAttributePerLine: {
          category: 'Common',
          type: 'boolean',
          default: !1,
          description: 'Enforce single attribute per line in HTML, Vue and JSX.'
        }
      },
      oY = { ...i, ...o$ },
      oZ = [
        {
          name: 'JavaScript',
          type: 'programming',
          aceMode: 'javascript',
          extensions: [
            '.js',
            '._js',
            '.bones',
            '.cjs',
            '.es',
            '.es6',
            '.gs',
            '.jake',
            '.javascript',
            '.jsb',
            '.jscad',
            '.jsfl',
            '.jslib',
            '.jsm',
            '.jspre',
            '.jss',
            '.mjs',
            '.njs',
            '.pac',
            '.sjs',
            '.ssjs',
            '.xsjs',
            '.xsjslib',
            '.start.frag',
            '.end.frag',
            '.wxs'
          ],
          filenames: ['Jakefile', 'start.frag', 'end.frag'],
          tmScope: 'source.js',
          aliases: ['js', 'node'],
          codemirrorMode: 'javascript',
          codemirrorMimeType: 'text/javascript',
          interpreters: [
            'bun',
            'chakra',
            'd8',
            'deno',
            'gjs',
            'js',
            'node',
            'nodejs',
            'qjs',
            'rhino',
            'v8',
            'v8-shell',
            'zx'
          ],
          parsers: [
            'babel',
            'acorn',
            'espree',
            'meriyah',
            'babel-flow',
            'babel-ts',
            'flow',
            'typescript'
          ],
          vscodeLanguageIds: ['javascript', 'mongo'],
          linguistLanguageId: 183
        },
        {
          name: 'Flow',
          type: 'programming',
          aceMode: 'javascript',
          extensions: ['.js.flow'],
          filenames: [],
          tmScope: 'source.js',
          aliases: [],
          codemirrorMode: 'javascript',
          codemirrorMimeType: 'text/javascript',
          interpreters: [
            'bun',
            'chakra',
            'd8',
            'deno',
            'gjs',
            'js',
            'node',
            'nodejs',
            'qjs',
            'rhino',
            'v8',
            'v8-shell'
          ],
          parsers: ['flow', 'babel-flow'],
          vscodeLanguageIds: ['javascript'],
          linguistLanguageId: 183
        },
        {
          name: 'JSX',
          type: 'programming',
          aceMode: 'javascript',
          extensions: ['.jsx'],
          filenames: void 0,
          tmScope: 'source.js.jsx',
          aliases: void 0,
          codemirrorMode: 'jsx',
          codemirrorMimeType: 'text/jsx',
          interpreters: void 0,
          parsers: [
            'babel',
            'babel-flow',
            'babel-ts',
            'flow',
            'typescript',
            'espree',
            'meriyah'
          ],
          vscodeLanguageIds: ['javascriptreact'],
          group: 'JavaScript',
          linguistLanguageId: 183
        },
        {
          name: 'TypeScript',
          type: 'programming',
          aceMode: 'typescript',
          extensions: ['.ts', '.cts', '.mts'],
          tmScope: 'source.ts',
          aliases: ['ts'],
          codemirrorMode: 'javascript',
          codemirrorMimeType: 'application/typescript',
          interpreters: ['bun', 'deno', 'ts-node', 'tsx'],
          parsers: ['typescript', 'babel-ts'],
          vscodeLanguageIds: ['typescript'],
          linguistLanguageId: 378
        },
        {
          name: 'TSX',
          type: 'programming',
          aceMode: 'tsx',
          extensions: ['.tsx'],
          tmScope: 'source.tsx',
          aliases: ['typescriptreact'],
          codemirrorMode: 'jsx',
          codemirrorMimeType: 'text/typescript-jsx',
          group: 'TypeScript',
          parsers: ['typescript', 'babel-ts'],
          vscodeLanguageIds: ['typescriptreact'],
          linguistLanguageId: 0x5a816a4
        },
        {
          name: 'JSON.stringify',
          type: 'data',
          aceMode: 'json',
          extensions: ['.importmap'],
          filenames: ['package.json', 'package-lock.json', 'composer.json'],
          tmScope: 'source.json',
          aliases: ['geojson', 'jsonl', 'sarif', 'topojson'],
          codemirrorMode: 'javascript',
          codemirrorMimeType: 'application/json',
          parsers: ['json-stringify'],
          vscodeLanguageIds: ['json'],
          linguistLanguageId: 174
        },
        {
          name: 'JSON',
          type: 'data',
          aceMode: 'json',
          extensions: [
            '.json',
            '.4DForm',
            '.4DProject',
            '.avsc',
            '.geojson',
            '.gltf',
            '.har',
            '.ice',
            '.JSON-tmLanguage',
            '.json.example',
            '.mcmeta',
            '.sarif',
            '.slnlaunch',
            '.tact',
            '.tfstate',
            '.tfstate.backup',
            '.topojson',
            '.webapp',
            '.webmanifest',
            '.yy',
            '.yyp'
          ],
          filenames: [
            '.all-contributorsrc',
            '.arcconfig',
            '.auto-changelog',
            '.c8rc',
            '.htmlhintrc',
            '.imgbotconfig',
            '.nycrc',
            '.tern-config',
            '.tern-project',
            '.watchmanconfig',
            '.babelrc',
            '.jscsrc',
            '.jshintrc',
            '.jslintrc',
            '.swcrc'
          ],
          tmScope: 'source.json',
          aliases: ['geojson', 'jsonl', 'sarif', 'topojson'],
          codemirrorMode: 'javascript',
          codemirrorMimeType: 'application/json',
          parsers: ['json'],
          vscodeLanguageIds: ['json'],
          linguistLanguageId: 174
        },
        {
          name: 'JSON with Comments',
          type: 'data',
          aceMode: 'javascript',
          extensions: [
            '.jsonc',
            '.code-snippets',
            '.code-workspace',
            '.sublime-build',
            '.sublime-color-scheme',
            '.sublime-commands',
            '.sublime-completions',
            '.sublime-keymap',
            '.sublime-macro',
            '.sublime-menu',
            '.sublime-mousemap',
            '.sublime-project',
            '.sublime-settings',
            '.sublime-theme',
            '.sublime-workspace',
            '.sublime_metrics',
            '.sublime_session'
          ],
          filenames: [],
          tmScope: 'source.json.comments',
          aliases: ['jsonc'],
          codemirrorMode: 'javascript',
          codemirrorMimeType: 'text/javascript',
          group: 'JSON',
          parsers: ['jsonc'],
          vscodeLanguageIds: ['jsonc'],
          linguistLanguageId: 423
        },
        {
          name: 'JSON5',
          type: 'data',
          aceMode: 'json5',
          extensions: ['.json5'],
          tmScope: 'source.js',
          codemirrorMode: 'javascript',
          codemirrorMimeType: 'application/json',
          parsers: ['json5'],
          vscodeLanguageIds: ['json5'],
          linguistLanguageId: 175
        }
      ];
    n.d(t, {
      default: () => o,
      languages: () => oZ,
      options: () => oQ,
      printers: () => oY
    });
  }
};
//# sourceMappingURL=2834.a2222f6d30d610be.js.map
