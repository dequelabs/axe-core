export const __rspack_esm_id = 8048;
export const __rspack_esm_ids = [8048];
export const __webpack_modules__ = {
  5283(e, t, s) {
    s.r(t);
    var i = Object.defineProperty,
      r = (e, t) => {
        for (var s in t) i(e, s, { get: t[s], enumerable: !0 });
      },
      n = {};
    r(n, { parsers: () => sR });
    var o = {};
    r(o, {
      __babel_estree: () => sw,
      __js_expression: () => sC,
      __ts_expression: () => sI,
      __vue_event_binding: () => sS,
      __vue_expression: () => sC,
      __vue_ts_event_binding: () => sE,
      __vue_ts_expression: () => sI,
      babel: () => sS,
      'babel-flow': () => sN,
      'babel-ts': () => sE
    });
    var h =
        (e, t) =>
        (s, i, ...r) =>
          1 | s && null == i ? void 0 : (t.call(i) ?? i[e]).apply(i, r),
      p =
        String.prototype.replaceAll ??
        function (e, t) {
          return e.global ? this.replace(e, t) : this.split(e).join(t);
        },
      l = h('replaceAll', function () {
        if ('string' == typeof this) return p;
      }),
      c =
        Object.hasOwn ??
        Function.prototype.call.bind(Object.prototype.hasOwnProperty),
      u = class {
        constructor(e, t, s) {
          ((this.line = void 0),
            (this.column = void 0),
            void 0 !== s && (this.index = void 0),
            (this.line = e),
            (this.column = t),
            void 0 !== s && (this.index = s));
        }
      },
      d = class {
        start;
        end;
        filename;
        identifierName;
        constructor(e, t) {
          ((this.start = e), (this.end = t));
        }
      };
    function m(e, t) {
      let { line: s, column: i, index: r } = e;
      return new u(s, i + t, r + t);
    }
    var f = 'BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED',
      y = {
        ArrayPattern: 'array destructuring pattern',
        AssignmentExpression: 'assignment expression',
        AssignmentPattern: 'assignment expression',
        ArrowFunctionExpression: 'arrow function expression',
        ConditionalExpression: 'conditional expression',
        CatchClause: 'catch clause',
        ForOfStatement: 'for-of statement',
        ForInStatement: 'for-in statement',
        ForStatement: 'for-loop',
        FormalParameters: 'function parameter list',
        Identifier: 'identifier',
        ImportSpecifier: 'import specifier',
        ImportDefaultSpecifier: 'import default specifier',
        ImportNamespaceSpecifier: 'import namespace specifier',
        ObjectPattern: 'object destructuring pattern',
        ParenthesizedExpression: 'parenthesized expression',
        RestElement: 'rest element',
        UpdateExpression: {
          true: 'prefix operation',
          false: 'postfix operation'
        },
        VariableDeclarator: 'variable declaration',
        YieldExpression: 'yield expression'
      },
      x = e =>
        'UpdateExpression' === e.type
          ? y.UpdateExpression[`${e.prefix}`]
          : y[e.type],
      P = new Set([
        'ArrowFunctionExpression',
        'AssignmentExpression',
        'ConditionalExpression',
        'YieldExpression'
      ]);
    function g(e, t, s) {
      Object.defineProperty(e, t, {
        enumerable: !1,
        configurable: !0,
        value: s
      });
    }
    function T(e, t) {
      if (Array.isArray(e)) return t => T(t, e[0]);
      let s = {};
      for (let i of Object.keys(e)) {
        let r = e[i],
          { message: n, ...o } =
            'string' == typeof r
              ? { message: () => r }
              : 'function' == typeof r
                ? { message: r }
                : r,
          h = 'string' == typeof n ? () => n : n;
        s[i] = (function ({
          toMessage: e,
          code: t,
          reasonCode: s,
          syntaxPlugin: i
        }) {
          let r = 'MissingPlugin' === s || 'MissingOneOfPlugins' === s;
          return function n(o, h, p) {
            let l = SyntaxError();
            return (
              (l.code = t),
              (l.reasonCode = s),
              (l.loc = o),
              (l.pos = h),
              (l.syntaxPlugin = i),
              r && (l.missingPlugin = p.missingPlugin),
              g(l, 'clone', function (e = {}) {
                let { line: t, column: s, index: i = h } = e.loc ?? o;
                return n(new u(t, s), i, { ...p, ...e.details });
              }),
              g(l, 'details', p),
              Object.defineProperty(l, 'message', {
                configurable: !0,
                get() {
                  let t = `${e(p)} (${o.line}:${o.column})`;
                  return ((this.message = t), t);
                },
                set(e) {
                  Object.defineProperty(this, 'message', {
                    value: e,
                    writable: !0
                  });
                }
              }),
              l
            );
          };
        })({
          code: 'BABEL_PARSER_SYNTAX_ERROR',
          reasonCode: i,
          toMessage: h,
          ...(t ? { syntaxPlugin: t } : {}),
          ...o
        });
      }
      return s;
    }
    var b = {
      ...T({
        ImportMetaOutsideModule: {
          message: 'import.meta may appear only with \'sourceType: "module"\'',
          code: f
        },
        ImportOutsideModule: {
          message:
            "'import' and 'export' may appear only with 'sourceType: \"module\"'",
          code: f
        }
      }),
      ...T({
        AccessorIsGenerator: ({ kind: e }) =>
          `A ${e}ter cannot be a generator.`,
        ArgumentsInClass:
          "'arguments' is only allowed in functions and class methods.",
        AsyncFunctionInSingleStatementContext:
          'Async functions can only be declared at the top level or inside a block.',
        AwaitBindingIdentifier:
          "Can not use 'await' as identifier inside an async function.",
        AwaitBindingIdentifierInStaticBlock:
          "Can not use 'await' as identifier inside a static block.",
        AwaitExpressionFormalParameter:
          "'await' is not allowed in async function parameters.",
        AwaitUsingNotInAsyncContext:
          "'await using' is only allowed within async functions and at the top levels of modules.",
        AwaitNotInAsyncContext:
          "'await' is only allowed within async functions and at the top levels of modules.",
        BadGetterArity: "A 'get' accessor must not have any formal parameters.",
        BadSetterArity:
          "A 'set' accessor must have exactly one formal parameter.",
        BadSetterRestParameter:
          "A 'set' accessor function argument must not be a rest parameter.",
        ConstructorClassField:
          "Classes may not have a field named 'constructor'.",
        ConstructorClassPrivateField:
          "Classes may not have a private field named '#constructor'.",
        ConstructorIsAccessor: 'Class constructor may not be an accessor.',
        ConstructorIsAsync: "Constructor can't be an async function.",
        ConstructorIsGenerator: "Constructor can't be a generator.",
        DeclarationMissingInitializer: ({ kind: e }) =>
          `Missing initializer in ${e} declaration.`,
        DecoratorArgumentsOutsideParentheses:
          "Decorator arguments must be moved inside parentheses: use '@(decorator(args))' instead of '@(decorator)(args)'.",
        DecoratorsBeforeAfterExport:
          "Decorators can be placed *either* before or after the 'export' keyword, but not in both locations at the same time.",
        DecoratorConstructor:
          "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
        DecoratorSemicolon: 'Decorators must not be followed by a semicolon.',
        DecoratorStaticBlock: "Decorators can't be used with a static block.",
        DeferImportRequiresNamespace:
          'Only `import defer * as x from "./module"` is valid.',
        DeletePrivateField: 'Deleting a private field is not allowed.',
        DestructureNamedImport:
          'ES2015 named imports do not destructure. Use another statement for destructuring after the import.',
        DuplicateConstructor: 'Duplicate constructor in the same class.',
        DuplicateDefaultExport: 'Only one default export allowed per module.',
        DuplicateExport: ({ exportName: e }) =>
          `\`${e}\` has already been exported. Exported identifiers must be unique.`,
        DuplicateProto: 'Redefinition of __proto__ property.',
        DuplicateRegExpFlags: 'Duplicate regular expression flag.',
        ElementAfterRest: 'Rest element must be last element.',
        EscapedCharNotAnIdentifier: 'Invalid Unicode escape.',
        ExportBindingIsString: ({
          localName: e,
          exportName: t
        }) => `A string literal cannot be used as an exported binding without \`from\`.
- Did you mean \`export { '${e}' as '${t}' } from 'some-module'\`?`,
        ExportDefaultFromAsIdentifier:
          "'from' is not allowed as an identifier after 'export default'.",
        ForInOfLoopInitializer: ({ type: e }) =>
          `'${'ForInStatement' === e ? 'for-in' : 'for-of'}' loop variable declaration may not have an initializer.`,
        ForInUsing: "For-in loop may not start with 'using' declaration.",
        ForOfAsync: "The left-hand side of a for-of loop may not be 'async'.",
        ForOfLet:
          "The left-hand side of a for-of loop may not start with 'let'.",
        GeneratorInSingleStatementContext:
          'Generators can only be declared at the top level or inside a block.',
        IllegalBreakContinue: ({ type: e }) =>
          `Unsyntactic ${'BreakStatement' === e ? 'break' : 'continue'}.`,
        IllegalLanguageModeDirective:
          "Illegal 'use strict' directive in function with non-simple parameter list.",
        IllegalReturn: "'return' outside of function.",
        ImportBindingIsString: ({
          importName: e
        }) => `A string literal cannot be used as an imported binding.
- Did you mean \`import { "${e}" as foo }\`?`,
        ImportCallArity: ({ phase: e }) =>
          `\`import${e ? `.${e}` : ''}()\` requires exactly one or two arguments.`,
        ImportCallNotNewExpression: ({ phase: e }) =>
          `Cannot use new with import${e ? `.${e}` : ''}().`,
        ImportCallSpreadArgument: ({ phase: e }) =>
          `\`...\` is not allowed in \`import${e ? `.${e}` : ''}()\`.`,
        IncompatibleRegExpUVFlags:
          "The 'u' and 'v' regular expression flags cannot be enabled at the same time.",
        InvalidBigIntLiteral: 'Invalid BigIntLiteral.',
        InvalidCodePoint: 'Code point out of bounds.',
        InvalidCoverDiscardElement:
          "'void' must be followed by an expression when not used in a binding position.",
        InvalidCoverInitializedName: 'Invalid shorthand property initializer.',
        InvalidDigit: ({ radix: e }) => `Expected number in radix ${e}.`,
        InvalidEscapeSequence: 'Bad character escape sequence.',
        InvalidEscapeSequenceTemplate: 'Invalid escape sequence in template.',
        InvalidEscapedReservedWord: ({ reservedWord: e }) =>
          `Escape sequence in keyword ${e}.`,
        InvalidIdentifier: ({ identifierName: e }) =>
          `Invalid identifier ${e}.`,
        InvalidLhs: ({ ancestor: e }) => `Invalid left-hand side in ${x(e)}.`,
        InvalidLhsBinding: ({ ancestor: e }) =>
          `Binding invalid left-hand side in ${x(e)}.`,
        InvalidLhsOptionalChaining: ({ ancestor: e }) =>
          `Invalid optional chaining in the left-hand side of ${x(e)}.`,
        InvalidNumber: 'Invalid number.',
        InvalidOrMissingExponent:
          "Floating-point numbers require a valid exponent after the 'e'.",
        InvalidOrUnexpectedToken: ({ unexpected: e }) =>
          `Unexpected character '${e}'.`,
        InvalidParenthesizedAssignment:
          'Invalid parenthesized assignment pattern.',
        InvalidPrivateFieldResolution: ({ identifierName: e }) =>
          `Private name #${e} is not defined.`,
        InvalidPropertyBindingPattern: 'Binding member expression.',
        InvalidRestAssignmentPattern: "Invalid rest operator's argument.",
        LabelRedeclaration: ({ labelName: e }) =>
          `Label '${e}' is already declared.`,
        LetInLexicalBinding: "'let' is disallowed as a lexically bound name.",
        LineTerminatorBeforeArrow: "No line break is allowed before '=>'.",
        MalformedRegExpFlags: 'Invalid regular expression flag.',
        MissingClassName: 'A class name is required.',
        MissingEqInAssignment:
          "Only '=' operator can be used for specifying default value.",
        MissingSemicolon: 'Missing semicolon.',
        MissingPlugin: ({ missingPlugin: e }) =>
          `This experimental syntax requires enabling the parser plugin: ${e.map(e => JSON.stringify(e)).join(', ')}.`,
        MissingOneOfPlugins: ({ missingPlugin: e }) =>
          `This experimental syntax requires enabling one of the following parser plugin(s): ${e.map(e => JSON.stringify(e)).join(', ')}.`,
        MissingUnicodeEscape: 'Expecting Unicode escape sequence \\uXXXX.',
        MixingCoalesceWithLogical:
          'Nullish coalescing operator(??) requires parens when mixing with logical operators.',
        ModuleAttributeInvalidValue:
          'Only string literals are allowed as module attribute values.',
        ModuleAttributesWithDuplicateKeys: ({ key: e }) =>
          `Duplicate key "${e}" is not allowed in module attributes.`,
        ModuleExportNameHasLoneSurrogate: ({ surrogateCharCode: e }) =>
          `An export name cannot include a lone surrogate, found '\\u${e.toString(16)}'.`,
        ModuleExportUndefined: ({ localName: e }) =>
          `Export '${e}' is not defined.`,
        MultipleDefaultsInSwitch: 'Multiple default clauses.',
        NewlineAfterThrow: 'Illegal newline after throw.',
        NoCatchOrFinally: 'Missing catch or finally clause.',
        NumberIdentifier: 'Identifier directly after number.',
        NumericSeparatorInEscapeSequence:
          'Numeric separators are not allowed inside unicode escape sequences or hex escape sequences.',
        ObsoleteAwaitStar:
          "'await*' has been removed from the async functions proposal. Use Promise.all() instead.",
        OptionalChainingNoNew:
          'Constructors in/after an Optional Chain are not allowed.',
        OptionalChainingNoTemplate:
          'Tagged Template Literals are not allowed in optionalChain.',
        OverrideOnConstructor:
          "'override' modifier cannot appear on a constructor declaration.",
        ParamDupe: 'Argument name clash.',
        PatternHasAccessor: "Object pattern can't contain getter or setter.",
        PatternHasMethod: "Object pattern can't contain methods.",
        PrivateInExpectedIn: ({ identifierName: e }) =>
          `Private names are only allowed in property accesses (\`obj.#${e}\`) or in \`in\` expressions (\`#${e} in obj\`).`,
        PrivateNameRedeclaration: ({ identifierName: e }) =>
          `Duplicate private name #${e}.`,
        RestTrailingComma: 'Unexpected trailing comma after rest element.',
        SloppyFunction:
          'In non-strict mode code, functions can only be declared at top level or inside a block.',
        SloppyFunctionAnnexB:
          'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement.',
        SourcePhaseImportRequiresDefault:
          'Only `import source x from "./module"` is valid.',
        StaticPrototype:
          'Classes may not have static property named prototype.',
        SuperCallNotNewExpression: 'Cannot use new with super(...).',
        SuperNotAllowed:
          "`super()` is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?",
        SuperPrivateField: "Private fields can't be accessed on super.",
        TrailingDecorator: 'Decorators must be attached to a class element.',
        UnexpectedArgumentPlaceholder: 'Unexpected argument placeholder.',
        UnexpectedDigitAfterHash: 'Unexpected digit after hash token.',
        UnexpectedImportExport:
          "'import' and 'export' may only appear at the top level.",
        UnexpectedKeyword: ({ keyword: e }) => `Unexpected keyword '${e}'.`,
        UnexpectedLeadingDecorator:
          'Leading decorators must be attached to a class declaration.',
        UnexpectedLexicalDeclaration:
          'Lexical declaration cannot appear in a single-statement context.',
        UnexpectedNewTarget:
          '`new.target` can only be used in functions or class properties.',
        UnexpectedNumericSeparator:
          'A numeric separator is only allowed between two digits.',
        UnexpectedPrivateField: 'Unexpected private name.',
        UnexpectedReservedWord: ({ reservedWord: e }) =>
          `Unexpected reserved word '${e}'.`,
        UnexpectedSuper:
          "'super' is only allowed in object methods and classes.",
        UnexpectedToken: ({ expected: e, unexpected: t }) =>
          `Unexpected token${t ? ` '${t}'.` : ''}${e ? `, expected "${e}"` : ''}`,
        UnexpectedTokenUnaryExponentiation:
          'Illegal expression. Wrap left hand side or entire exponentiation in parentheses.',
        UnexpectedUsingDeclaration:
          'Using declaration cannot appear in the top level when source type is `script` or in the bare case statement.',
        UnexpectedVoidPattern: 'Unexpected void binding.',
        UnsupportedDecoratorExport:
          'A decorated export must export a class declaration.',
        UnsupportedDefaultExport:
          'Only expressions, functions or classes are allowed as the `default` export.',
        UnsupportedImport:
          '`import` can only be used in `import()` or `import.meta`.',
        UnsupportedMetaProperty: ({ target: e, onlyValidPropertyName: t }) =>
          `The only valid meta property for ${e} is ${e}.${t}.`,
        UnsupportedParameterDecorator:
          'Decorators cannot be used to decorate parameters.',
        UnsupportedPropertyDecorator:
          'Decorators cannot be used to decorate object literal properties.',
        UnsupportedSuper:
          "'super' can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop]).",
        UnterminatedComment: 'Unterminated comment.',
        UnterminatedRegExp: 'Unterminated regular expression.',
        UnterminatedString: 'Unterminated string constant.',
        UnterminatedTemplate: 'Unterminated template.',
        UsingDeclarationExport: 'Using declaration cannot be exported.',
        UsingDeclarationHasBindingPattern:
          'Using declaration cannot have destructuring patterns.',
        VarRedeclaration: ({ identifierName: e }) =>
          `Identifier '${e}' has already been declared.`,
        VoidPatternCatchClauseParam:
          'A void binding can not be the catch clause parameter. Use `try { ... } catch { ... }` if you want to discard the caught error.',
        VoidPatternInitializer: 'A void binding may not have an initializer.',
        YieldBindingIdentifier:
          "Can not use 'yield' as identifier inside a generator.",
        YieldInParameter:
          'Yield expression is not allowed in formal parameters.',
        YieldNotInGeneratorFunction:
          "'yield' is only allowed within generator functions.",
        ZeroDigitNumericSeparator:
          'Numeric separator can not be used after leading 0.'
      }),
      ...T({
        StrictDelete: 'Deleting local variable in strict mode.',
        StrictEvalArguments: ({ referenceName: e }) =>
          `Assigning to '${e}' in strict mode.`,
        StrictEvalArgumentsBinding: ({ bindingName: e }) =>
          `Binding '${e}' in strict mode.`,
        StrictFunction:
          'In strict mode code, functions can only be declared at top level or inside a block.',
        StrictNumericEscape:
          "The only valid numeric escape in strict mode is '\\0'.",
        StrictOctalLiteral:
          'Legacy octal literals are not allowed in strict mode.',
        StrictWith: "'with' in strict mode."
      }),
      ...T({
        ParseExpressionEmptyInput:
          'Unexpected parseExpression() input: The input is empty or contains only comments.',
        ParseExpressionExpectsEOF: ({ unexpected: e }) =>
          `Unexpected parseExpression() input: The input should contain exactly one expression, but the first expression is followed by the unexpected character \`${String.fromCodePoint(e)}\`.`
      }),
      ...T`pipelineOperator`({
        PipeTopicRequiresHackPipes:
          'Topic references are only supported when using the `"proposal": "hack"` version of the pipeline proposal.',
        PipeTopicUnbound:
          'Topic reference is unbound; it must be inside a pipe body.',
        PipeTopicUnconfiguredToken: ({ token: e }) =>
          `Invalid topic token ${e}. In order to use ${e} as a topic reference, the pipelineOperator plugin must be configured with { "proposal": "hack", "topicToken": "${e}" }.`,
        PipeTopicUnused:
          'Hack-style pipe body does not contain a topic reference; Hack-style pipes must use topic at least once.',
        PipeUnparenthesizedBody: ({ type: e }) =>
          `Hack-style pipe body cannot be an unparenthesized ${x({ type: e })}; please wrap it in parentheses.`,
        PipelineUnparenthesized:
          'Cannot mix binary operator with solo-await F#-style pipeline. Please wrap the pipeline in parentheses.'
      }),
      ...T`functionBind`({
        UnsupportedBind: 'Binding should be performed on object property.',
        UnsupportedBindRHS:
          'The right-hand side of binding can not be super or import.'
      })
    };
    function A(e) {
      let { start: t, end: s } = e.loc;
      return (
        (e.loc.start = new u(t.line, t.column)),
        (e.loc.end = new u(s.line, s.column)),
        e
      );
    }
    var S = class {
        label;
        keyword;
        beforeExpr;
        startsExpr;
        rightAssociative;
        isLoop;
        isAssign;
        prefix;
        postfix;
        binop;
        constructor(e, t = {}) {
          ((this.label = e),
            (this.keyword = t.keyword),
            (this.beforeExpr = !!t.beforeExpr),
            (this.startsExpr = !!t.startsExpr),
            (this.rightAssociative = !!t.rightAssociative),
            (this.isLoop = !!t.isLoop),
            (this.isAssign = !!t.isAssign),
            (this.prefix = !!t.prefix),
            (this.postfix = !!t.postfix),
            (this.binop = null != t.binop ? t.binop : null));
        }
      },
      E = new Map();
    function C(e, t = {}) {
      t.keyword = e;
      let s = O(e, t);
      return (E.set(e, s), s);
    }
    function I(e, t) {
      return O(e, { beforeExpr: !0, binop: t });
    }
    var N = -1,
      w = [],
      k = [],
      v = [],
      L = [],
      M = [],
      D = [];
    function O(e, t = {}) {
      return (
        ++N,
        k.push(e),
        v.push(t.binop ?? -1),
        L.push(t.beforeExpr ?? !1),
        M.push(t.startsExpr ?? !1),
        D.push(t.prefix ?? !1),
        w.push(new S(e, t)),
        N
      );
    }
    function F(e, t = {}) {
      return (
        ++N,
        E.set(e, N),
        k.push(e),
        v.push(t.binop ?? -1),
        L.push(t.beforeExpr ?? !1),
        M.push(t.startsExpr ?? !1),
        D.push(t.prefix ?? !1),
        w.push(new S('name', t)),
        N
      );
    }
    var B = {
      bracketL: O('[', { beforeExpr: !0, startsExpr: !0 }),
      bracketR: O(']'),
      braceL: O('{', { beforeExpr: !0, startsExpr: !0 }),
      braceBarL: O('{|', { beforeExpr: !0, startsExpr: !0 }),
      braceR: O('}'),
      braceBarR: O('|}'),
      parenL: O('(', { beforeExpr: !0, startsExpr: !0 }),
      parenR: O(')'),
      comma: O(',', { beforeExpr: !0 }),
      semi: O(';', { beforeExpr: !0 }),
      colon: O(':', { beforeExpr: !0 }),
      doubleColon: O('::', { beforeExpr: !0 }),
      dot: O('.'),
      question: O('?', { beforeExpr: !0 }),
      questionDot: O('?.'),
      arrow: O('=>', { beforeExpr: !0 }),
      template: O('template'),
      ellipsis: O('...', { beforeExpr: !0 }),
      backQuote: O('`', { startsExpr: !0 }),
      dollarBraceL: O('${', { beforeExpr: !0, startsExpr: !0 }),
      templateTail: O('...`', { startsExpr: !0 }),
      templateNonTail: O('...${', { beforeExpr: !0, startsExpr: !0 }),
      at: O('@'),
      hash: O('#', { startsExpr: !0 }),
      interpreterDirective: O('#!...'),
      eq: O('=', { beforeExpr: !0, isAssign: !0 }),
      assign: O('_=', { beforeExpr: !0, isAssign: !0 }),
      slashAssign: O('_=', { beforeExpr: !0, isAssign: !0 }),
      xorAssign: O('_=', { beforeExpr: !0, isAssign: !0 }),
      moduloAssign: O('_=', { beforeExpr: !0, isAssign: !0 }),
      incDec: O('++/--', { prefix: !0, postfix: !0, startsExpr: !0 }),
      bang: O('!', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      tilde: O('~', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      doubleCaret: O('^^', { startsExpr: !0 }),
      doubleAt: O('@@', { startsExpr: !0 }),
      pipeline: I('|>', 0),
      nullishCoalescing: I('??', 1),
      logicalOR: I('||', 1),
      logicalAND: I('&&', 2),
      bitwiseOR: I('|', 3),
      bitwiseXOR: I('^', 4),
      bitwiseAND: I('&', 5),
      equality: I('==/!=/===/!==', 6),
      lt: I('</>/<=/>=', 7),
      gt: I('</>/<=/>=', 7),
      relational: I('</>/<=/>=', 7),
      bitShift: I('<</>>/>>>', 8),
      bitShiftL: I('<</>>/>>>', 8),
      bitShiftR: I('<</>>/>>>', 8),
      plusMin: O('+/-', {
        beforeExpr: !0,
        binop: 9,
        prefix: !0,
        startsExpr: !0
      }),
      modulo: O('%', { binop: 10, startsExpr: !0 }),
      star: O('*', { binop: 10 }),
      slash: I('/', 10),
      exponent: O('**', { beforeExpr: !0, binop: 11, rightAssociative: !0 }),
      _in: C('in', { beforeExpr: !0, binop: 7 }),
      _instanceof: C('instanceof', { beforeExpr: !0, binop: 7 }),
      _break: C('break'),
      _case: C('case', { beforeExpr: !0 }),
      _catch: C('catch'),
      _continue: C('continue'),
      _debugger: C('debugger'),
      _default: C('default', { beforeExpr: !0 }),
      _else: C('else', { beforeExpr: !0 }),
      _finally: C('finally'),
      _function: C('function', { startsExpr: !0 }),
      _if: C('if'),
      _return: C('return', { beforeExpr: !0 }),
      _switch: C('switch'),
      _throw: C('throw', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _try: C('try'),
      _var: C('var'),
      _const: C('const'),
      _with: C('with'),
      _new: C('new', { beforeExpr: !0, startsExpr: !0 }),
      _this: C('this', { startsExpr: !0 }),
      _super: C('super', { startsExpr: !0 }),
      _class: C('class', { startsExpr: !0 }),
      _extends: C('extends', { beforeExpr: !0 }),
      _export: C('export'),
      _import: C('import', { startsExpr: !0 }),
      _null: C('null', { startsExpr: !0 }),
      _true: C('true', { startsExpr: !0 }),
      _false: C('false', { startsExpr: !0 }),
      _typeof: C('typeof', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _void: C('void', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _delete: C('delete', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _do: C('do', { isLoop: !0, beforeExpr: !0 }),
      _for: C('for', { isLoop: !0 }),
      _while: C('while', { isLoop: !0 }),
      _as: F('as', { startsExpr: !0 }),
      _assert: F('assert', { startsExpr: !0 }),
      _async: F('async', { startsExpr: !0 }),
      _await: F('await', { startsExpr: !0 }),
      _defer: F('defer', { startsExpr: !0 }),
      _from: F('from', { startsExpr: !0 }),
      _get: F('get', { startsExpr: !0 }),
      _let: F('let', { startsExpr: !0 }),
      _meta: F('meta', { startsExpr: !0 }),
      _of: F('of', { startsExpr: !0 }),
      _sent: F('sent', { startsExpr: !0 }),
      _set: F('set', { startsExpr: !0 }),
      _source: F('source', { startsExpr: !0 }),
      _static: F('static', { startsExpr: !0 }),
      _using: F('using', { startsExpr: !0 }),
      _yield: F('yield', { startsExpr: !0 }),
      _asserts: F('asserts', { startsExpr: !0 }),
      _checks: F('checks', { startsExpr: !0 }),
      _exports: F('exports', { startsExpr: !0 }),
      _global: F('global', { startsExpr: !0 }),
      _implements: F('implements', { startsExpr: !0 }),
      _intrinsic: F('intrinsic', { startsExpr: !0 }),
      _infer: F('infer', { startsExpr: !0 }),
      _is: F('is', { startsExpr: !0 }),
      _mixins: F('mixins', { startsExpr: !0 }),
      _proto: F('proto', { startsExpr: !0 }),
      _require: F('require', { startsExpr: !0 }),
      _satisfies: F('satisfies', { startsExpr: !0 }),
      _keyof: F('keyof', { startsExpr: !0 }),
      _readonly: F('readonly', { startsExpr: !0 }),
      _unique: F('unique', { startsExpr: !0 }),
      _abstract: F('abstract', { startsExpr: !0 }),
      _declare: F('declare', { startsExpr: !0 }),
      _enum: F('enum', { startsExpr: !0 }),
      _module: F('module', { startsExpr: !0 }),
      _namespace: F('namespace', { startsExpr: !0 }),
      _interface: F('interface', { startsExpr: !0 }),
      _type: F('type', { startsExpr: !0 }),
      _opaque: F('opaque', { startsExpr: !0 }),
      name: O('name', { startsExpr: !0 }),
      placeholder: O('%%', { startsExpr: !0 }),
      string: O('string', { startsExpr: !0 }),
      num: O('num', { startsExpr: !0 }),
      bigint: O('bigint', { startsExpr: !0 }),
      regexp: O('regexp', { startsExpr: !0 }),
      privateName: O('#name', { startsExpr: !0 }),
      eof: O('eof'),
      jsxName: O('jsxName'),
      jsxText: O('jsxText', { beforeExpr: !0 }),
      jsxTagStart: O('jsxTagStart', { startsExpr: !0 }),
      jsxTagEnd: O('jsxTagEnd')
    };
    function U(e) {
      return e >= 89 && e <= 129;
    }
    function R(e) {
      return e >= 54 && e <= 129;
    }
    function j(e) {
      return e >= 54 && e <= 132;
    }
    function _(e) {
      return e >= 125 && e <= 127;
    }
    function V(e) {
      return e >= 54 && e <= 88;
    }
    function z(e) {
      return e >= 35 && e <= 55;
    }
    function H(e) {
      return e >= 20 && e <= 21;
    }
    var $ = class {
        constructor(e, t) {
          ((this.token = e), (this.preserveSpace = !!t));
        }
        token;
        preserveSpace;
      },
      q = {
        brace: new $('{'),
        j_oTag: new $('<tag'),
        j_cTag: new $('</tag'),
        j_expr: new $('<tag>...</tag>', !0)
      },
      K =
        '\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u037f\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u052f\\u0531-\\u0556\\u0559\\u0560-\\u0588\\u05d0-\\u05ea\\u05ef-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u0860-\\u086a\\u0870-\\u0887\\u0889-\\u088f\\u08a0-\\u08c9\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u09fc\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0af9\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c39\\u0c3d\\u0c58-\\u0c5a\\u0c5c\\u0c5d\\u0c60\\u0c61\\u0c80\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cdc-\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d04-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d54-\\u0d56\\u0d5f-\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e86-\\u0e8a\\u0e8c-\\u0ea3\\u0ea5\\u0ea7-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f5\\u13f8-\\u13fd\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f8\\u1700-\\u1711\\u171f-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1878\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191e\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19b0-\\u19c9\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4c\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1c80-\\u1c8a\\u1c90-\\u1cba\\u1cbd-\\u1cbf\\u1ce9-\\u1cec\\u1cee-\\u1cf3\\u1cf5\\u1cf6\\u1cfa\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2118-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309b-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312f\\u3131-\\u318e\\u31a0-\\u31bf\\u31f0-\\u31ff\\u3400-\\u4dbf\\u4e00-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua69d\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua7dc\\ua7f1-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua8fd\\ua8fe\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\ua9e0-\\ua9e4\\ua9e6-\\ua9ef\\ua9fa-\\ua9fe\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa7e-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uab30-\\uab5a\\uab5c-\\uab69\\uab70-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc',
      W = [
        0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4,
        48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35,
        5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2,
        1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2,
        43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 7,
        25, 39, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2,
        27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39,
        27, 10, 22, 251, 41, 7, 1, 17, 5, 57, 28, 11, 0, 9, 21, 43, 17, 47, 20,
        28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34,
        4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2,
        3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19,
        0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3,
        21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14,
        0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16,
        0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45,
        20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2,
        37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 24, 43, 261, 18, 16, 0, 2, 12, 2,
        33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26,
        3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3,
        32, 20, 6, 18, 433, 44, 212, 63, 33, 24, 3, 24, 45, 74, 6, 0, 67, 12,
        65, 1, 2, 0, 15, 4, 10, 7381, 42, 31, 98, 114, 8702, 3, 2, 6, 2, 1, 2,
        290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9,
        5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3,
        3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30,
        2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5,
        262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0,
        208, 30, 2, 2, 2, 1, 2, 6, 3, 4, 10, 1, 225, 6, 2, 3, 2, 1, 2, 14, 2,
        196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0,
        2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0,
        2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4,
        2, 16, 4421, 42719, 33, 4381, 3, 5773, 3, 7472, 16, 621, 2467, 541,
        1507, 4938, 6, 8489
      ],
      J = [
        509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166,
        1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 78, 5, 71, 10, 50, 3, 123, 2, 54,
        14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1,
        45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7,
        3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0,
        2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3,
        8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14,
        166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9,
        41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 199, 7, 137, 9, 54, 7, 2, 7, 17, 9,
        57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4,
        9, 9, 55, 9, 266, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14,
        11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54,
        8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9,
        7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2,
        14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62,
        13, 499, 13, 245, 1, 2, 9, 233, 0, 3, 0, 8, 1, 6, 0, 475, 6, 110, 6, 6,
        9, 4759, 9, 787719, 239
      ],
      X = RegExp('[' + K + ']'),
      G = RegExp(
        '[' +
          K +
          '\\xb7\\u0300-\\u036f\\u0387\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u064b-\\u0669\\u0670\\u06d6-\\u06dc\\u06df-\\u06e4\\u06e7\\u06e8\\u06ea-\\u06ed\\u06f0-\\u06f9\\u0711\\u0730-\\u074a\\u07a6-\\u07b0\\u07c0-\\u07c9\\u07eb-\\u07f3\\u07fd\\u0816-\\u0819\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0859-\\u085b\\u0897-\\u089f\\u08ca-\\u08e1\\u08e3-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09cb-\\u09cd\\u09d7\\u09e2\\u09e3\\u09e6-\\u09ef\\u09fe\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2\\u0ae3\\u0ae6-\\u0aef\\u0afa-\\u0aff\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b55-\\u0b57\\u0b62\\u0b63\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c00-\\u0c04\\u0c3c\\u0c3e-\\u0c44\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62\\u0c63\\u0c66-\\u0c6f\\u0c81-\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2\\u0ce3\\u0ce6-\\u0cef\\u0cf3\\u0d00-\\u0d03\\u0d3b\\u0d3c\\u0d3e-\\u0d44\\u0d46-\\u0d48\\u0d4a-\\u0d4d\\u0d57\\u0d62\\u0d63\\u0d66-\\u0d6f\\u0d81-\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0de6-\\u0def\\u0df2\\u0df3\\u0e31\\u0e34-\\u0e3a\\u0e47-\\u0e4e\\u0e50-\\u0e59\\u0eb1\\u0eb4-\\u0ebc\\u0ec8-\\u0ece\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f3e\\u0f3f\\u0f71-\\u0f84\\u0f86\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u102b-\\u103e\\u1040-\\u1049\\u1056-\\u1059\\u105e-\\u1060\\u1062-\\u1064\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u1369-\\u1371\\u1712-\\u1715\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17b4-\\u17d3\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u180f-\\u1819\\u18a9\\u1920-\\u192b\\u1930-\\u193b\\u1946-\\u194f\\u19d0-\\u19da\\u1a17-\\u1a1b\\u1a55-\\u1a5e\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1ab0-\\u1abd\\u1abf-\\u1add\\u1ae0-\\u1aeb\\u1b00-\\u1b04\\u1b34-\\u1b44\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1b80-\\u1b82\\u1ba1-\\u1bad\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c24-\\u1c37\\u1c40-\\u1c49\\u1c50-\\u1c59\\u1cd0-\\u1cd2\\u1cd4-\\u1ce8\\u1ced\\u1cf4\\u1cf7-\\u1cf9\\u1dc0-\\u1dff\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2cef-\\u2cf1\\u2d7f\\u2de0-\\u2dff\\u302a-\\u302f\\u3099\\u309a\\u30fb\\ua620-\\ua629\\ua66f\\ua674-\\ua67d\\ua69e\\ua69f\\ua6f0\\ua6f1\\ua802\\ua806\\ua80b\\ua823-\\ua827\\ua82c\\ua880\\ua881\\ua8b4-\\ua8c5\\ua8d0-\\ua8d9\\ua8e0-\\ua8f1\\ua8ff-\\ua909\\ua926-\\ua92d\\ua947-\\ua953\\ua980-\\ua983\\ua9b3-\\ua9c0\\ua9d0-\\ua9d9\\ua9e5\\ua9f0-\\ua9f9\\uaa29-\\uaa36\\uaa43\\uaa4c\\uaa4d\\uaa50-\\uaa59\\uaa7b-\\uaa7d\\uaab0\\uaab2-\\uaab4\\uaab7\\uaab8\\uaabe\\uaabf\\uaac1\\uaaeb-\\uaaef\\uaaf5\\uaaf6\\uabe3-\\uabea\\uabec\\uabed\\uabf0-\\uabf9\\ufb1e\\ufe00-\\ufe0f\\ufe20-\\ufe2f\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f\\uff65]'
      );
    function Y(e, t) {
      let s = 65536;
      for (let i = 0, r = t.length; i < r && !((s += t[i]) > e); i += 2)
        if ((s += t[i + 1]) >= e) return !0;
      return !1;
    }
    function Q(e) {
      return e < 65
        ? 36 === e
        : e <= 90 ||
            (e < 97
              ? 95 === e
              : e <= 122 ||
                (e <= 65535
                  ? e >= 170 && X.test(String.fromCharCode(e))
                  : Y(e, W)));
    }
    function Z(e) {
      return e < 48
        ? 36 === e
        : e < 58 ||
            (!(e < 65) &&
              (e <= 90 ||
                (e < 97
                  ? 95 === e
                  : e <= 122 ||
                    (e <= 65535
                      ? e >= 170 && G.test(String.fromCharCode(e))
                      : Y(e, W) || Y(e, J)))));
    }
    var ee = new Set([
        'break',
        'case',
        'catch',
        'continue',
        'debugger',
        'default',
        'do',
        'else',
        'finally',
        'for',
        'function',
        'if',
        'return',
        'switch',
        'throw',
        'try',
        'var',
        'const',
        'while',
        'with',
        'new',
        'this',
        'super',
        'class',
        'extends',
        'export',
        'import',
        'null',
        'true',
        'false',
        'in',
        'instanceof',
        'typeof',
        'void',
        'delete'
      ]),
      et = new Set([
        'implements',
        'interface',
        'let',
        'package',
        'private',
        'protected',
        'public',
        'static',
        'yield'
      ]),
      es = new Set(['eval', 'arguments']);
    function ei(e, t) {
      return (t && 'await' === e) || 'enum' === e;
    }
    function er(e, t) {
      return ei(e, t) || et.has(e);
    }
    function ea(e, t) {
      return er(e, t) || es.has(e);
    }
    var en = new Set([
        'break',
        'case',
        'catch',
        'continue',
        'debugger',
        'default',
        'do',
        'else',
        'finally',
        'for',
        'function',
        'if',
        'return',
        'switch',
        'throw',
        'try',
        'var',
        'const',
        'while',
        'with',
        'new',
        'this',
        'super',
        'class',
        'extends',
        'export',
        'import',
        'null',
        'true',
        'false',
        'in',
        'instanceof',
        'typeof',
        'void',
        'delete',
        'implements',
        'interface',
        'let',
        'package',
        'private',
        'protected',
        'public',
        'static',
        'yield',
        'eval',
        'arguments',
        'enum',
        'await'
      ]),
      eo = class {
        flags = 0;
        names = new Map();
        firstLexicalName = '';
        constructor(e) {
          this.flags = e;
        }
      },
      eh = class {
        parser;
        scopeStack = [];
        inModule;
        undefinedExports = new Map();
        constructor(e, t) {
          ((this.parser = e), (this.inModule = t));
        }
        get inTopLevel() {
          return (1 & this.currentScope().flags) > 0;
        }
        get inFunction() {
          return (2 & this.currentVarScopeFlags()) > 0;
        }
        get allowSuper() {
          return (16 & this.currentThisScopeFlags()) > 0;
        }
        get allowDirectSuper() {
          return (32 & this.currentThisScopeFlags()) > 0;
        }
        get allowNewTarget() {
          return (512 & this.currentThisScopeFlags()) > 0;
        }
        get inClass() {
          return (64 & this.currentThisScopeFlags()) > 0;
        }
        get inClassAndNotInNonArrowFunction() {
          let e = this.currentThisScopeFlags();
          return (64 & e) > 0 && (2 & e) == 0;
        }
        get inStaticBlock() {
          for (let e = this.scopeStack.length - 1; ; e--) {
            let { flags: t } = this.scopeStack[e];
            if (128 & t) return !0;
            if (3779 & t) return !1;
          }
        }
        get inNonArrowFunction() {
          return (2 & this.currentThisScopeFlags()) > 0;
        }
        get inBareCaseStatement() {
          return (256 & this.currentScope().flags) > 0;
        }
        get treatFunctionsAsVar() {
          return this.treatFunctionsAsVarInScope(this.currentScope());
        }
        createScope(e) {
          return new eo(e);
        }
        enter(e) {
          this.scopeStack.push(this.createScope(e));
        }
        exit() {
          return this.scopeStack.pop().flags;
        }
        treatFunctionsAsVarInScope(e) {
          return !!(130 & e.flags || (!this.parser.inModule && 1 & e.flags));
        }
        declareName(e, t, s) {
          let i = this.currentScope();
          if (8 & t || 16 & t) {
            this.checkRedeclarationInScope(i, e, t, s);
            let r = i.names.get(e) || 0;
            (16 & t
              ? (r |= 4)
              : (i.firstLexicalName || (i.firstLexicalName = e), (r |= 2)),
              i.names.set(e, r),
              8 & t && this.maybeExportDefined(i, e));
          } else if (4 & t)
            for (
              let r = this.scopeStack.length - 1;
              r >= 0 &&
              ((i = this.scopeStack[r]),
              this.checkRedeclarationInScope(i, e, t, s),
              i.names.set(e, 1 | (i.names.get(e) || 0)),
              this.maybeExportDefined(i, e),
              !(3715 & i.flags));
              --r
            );
          this.parser.inModule &&
            1 & i.flags &&
            this.undefinedExports.delete(e);
        }
        maybeExportDefined(e, t) {
          this.parser.inModule &&
            1 & e.flags &&
            this.undefinedExports.delete(t);
        }
        checkRedeclarationInScope(e, t, s, i) {
          this.isRedeclaredInScope(e, t, s) &&
            this.parser.raise(b.VarRedeclaration, i, { identifierName: t });
        }
        isRedeclaredInScope(e, t, s) {
          if (!(1 & s)) return !1;
          if (8 & s) return e.names.has(t);
          let i = e.names.get(t) || 0;
          return 16 & s
            ? (2 & i) > 0 ||
                (!this.treatFunctionsAsVarInScope(e) && (1 & i) > 0)
            : ((2 & i) > 0 && !(8 & e.flags && e.firstLexicalName === t)) ||
                (!this.treatFunctionsAsVarInScope(e) && (4 & i) > 0);
        }
        checkLocalExport(e) {
          let { name: t } = e;
          this.scopeStack[0].names.has(t) ||
            this.undefinedExports.set(t, e.start);
        }
        currentScope() {
          return this.scopeStack[this.scopeStack.length - 1];
        }
        currentVarScopeFlags() {
          for (let e = this.scopeStack.length - 1; ; e--) {
            let { flags: t } = this.scopeStack[e];
            if (3715 & t) return t;
          }
        }
        currentThisScopeFlags() {
          for (let e = this.scopeStack.length - 1; ; e--) {
            let { flags: t } = this.scopeStack[e];
            if (3779 & t && !(4 & t)) return t;
          }
        }
      },
      ep = class extends eo {
        declareFunctions = new Set();
      },
      el = class extends eh {
        createScope(e) {
          return new ep(e);
        }
        declareName(e, t, s) {
          let i = this.currentScope();
          if (2048 & t) {
            (this.checkRedeclarationInScope(i, e, t, s),
              this.maybeExportDefined(i, e),
              i.declareFunctions.add(e));
            return;
          }
          super.declareName(e, t, s);
        }
        isRedeclaredInScope(e, t, s) {
          if (super.isRedeclaredInScope(e, t, s)) return !0;
          if (2048 & s && !e.declareFunctions.has(t)) {
            let s = e.names.get(t);
            return (4 & s) > 0 || (2 & s) > 0;
          }
          return !1;
        }
        checkLocalExport(e) {
          this.scopeStack[0].declareFunctions.has(e.name) ||
            super.checkLocalExport(e);
        }
      },
      ec = new Set([
        '_',
        'any',
        'bool',
        'boolean',
        'empty',
        'extends',
        'false',
        'interface',
        'mixed',
        'null',
        'number',
        'static',
        'string',
        'true',
        'typeof',
        'void'
      ]),
      eu = T`flow`({
        AmbiguousConditionalArrow:
          'Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.',
        AmbiguousDeclareModuleKind:
          'Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module.',
        AssignReservedType: ({ reservedType: e }) =>
          `Cannot overwrite reserved type ${e}.`,
        DeclareClassElement:
          'The `declare` modifier can only appear on class fields.',
        DeclareClassFieldInitializer:
          'Initializers are not allowed in fields with the `declare` modifier.',
        DuplicateDeclareModuleExports:
          'Duplicate `declare module.exports` statement.',
        EnumBooleanMemberNotInitialized: ({ memberName: e, enumName: t }) =>
          `Boolean enum members need to be initialized. Use either \`${e} = true,\` or \`${e} = false,\` in enum \`${t}\`.`,
        EnumDuplicateMemberName: ({ memberName: e, enumName: t }) =>
          `Enum member names need to be unique, but the name \`${e}\` has already been used before in enum \`${t}\`.`,
        EnumInconsistentMemberValues: ({ enumName: e }) =>
          `Enum \`${e}\` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.`,
        EnumInvalidExplicitType: ({ invalidEnumType: e, enumName: t }) =>
          `Enum type \`${e}\` is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${t}\`.`,
        EnumInvalidExplicitTypeUnknownSupplied: ({ enumName: e }) =>
          `Supplied enum type is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${e}\`.`,
        EnumInvalidMemberInitializerPrimaryType: ({
          enumName: e,
          memberName: t,
          explicitType: s
        }) =>
          `Enum \`${e}\` has type \`${s}\`, so the initializer of \`${t}\` needs to be a ${s} literal.`,
        EnumInvalidMemberInitializerSymbolType: ({
          enumName: e,
          memberName: t
        }) =>
          `Symbol enum members cannot be initialized. Use \`${t},\` in enum \`${e}\`.`,
        EnumInvalidMemberInitializerUnknownType: ({
          enumName: e,
          memberName: t
        }) =>
          `The enum member initializer for \`${t}\` needs to be a literal (either a boolean, number, or string) in enum \`${e}\`.`,
        EnumInvalidMemberName: ({
          enumName: e,
          memberName: t,
          suggestion: s
        }) =>
          `Enum member names cannot start with lowercase 'a' through 'z'. Instead of using \`${t}\`, consider using \`${s}\`, in enum \`${e}\`.`,
        EnumNumberMemberNotInitialized: ({ enumName: e, memberName: t }) =>
          `Number enum members need to be initialized, e.g. \`${t} = 1\` in enum \`${e}\`.`,
        EnumStringMemberInconsistentlyInitialized: ({ enumName: e }) =>
          `String enum members need to consistently either all use initializers, or use no initializers, in enum \`${e}\`.`,
        GetterMayNotHaveThisParam: 'A getter cannot have a `this` parameter.',
        ImportTypeShorthandOnlyInPureImport:
          'The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements.',
        InexactInsideExact:
          'Explicit inexact syntax cannot appear inside an explicit exact object type.',
        InexactInsideNonObject:
          'Explicit inexact syntax cannot appear in class or interface definitions.',
        InexactVariance: 'Explicit inexact syntax cannot have variance.',
        InvalidNonTypeImportInDeclareModule:
          'Imports within a `declare module` body must always be `import type` or `import typeof`.',
        MissingTypeParamDefault:
          'Type parameter declaration needs a default, since a preceding type parameter declaration has a default.',
        NestedDeclareModule:
          '`declare module` cannot be used inside another `declare module`.',
        NestedFlowComment:
          'Cannot have a flow comment inside another flow comment.',
        PatternIsOptional: {
          message:
            'A binding pattern parameter cannot be optional in an implementation signature.'
        },
        SetterMayNotHaveThisParam: 'A setter cannot have a `this` parameter.',
        SpreadVariance: 'Spread properties cannot have variance.',
        ThisParamAnnotationRequired:
          'A type annotation is required for the `this` parameter.',
        ThisParamBannedInConstructor:
          "Constructors cannot have a `this` parameter; constructors don't bind `this` like other functions.",
        ThisParamMayNotBeOptional: 'The `this` parameter cannot be optional.',
        ThisParamMustBeFirst:
          'The `this` parameter must be the first function parameter.',
        ThisParamNoDefault:
          'The `this` parameter may not have a default value.',
        TypeBeforeInitializer:
          'Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.',
        TypeCastInPattern:
          'The type cast expression is expected to be wrapped with parenthesis.',
        UnexpectedExplicitInexactInObject:
          'Explicit inexact syntax must appear at the end of an inexact object.',
        UnexpectedReservedType: ({ reservedType: e }) =>
          `Unexpected reserved type ${e}.`,
        UnexpectedReservedUnderscore:
          '`_` is only allowed as a type argument to call or new.',
        UnexpectedSpaceBetweenModuloChecks:
          'Spaces between `%` and `checks` are not allowed here.',
        UnexpectedSpreadType:
          'Spread operator cannot appear in class or interface definitions.',
        UnexpectedSubtractionOperand:
          'Unexpected token, expected "number" or "bigint".',
        UnexpectedTokenAfterTypeParameter:
          'Expected an arrow function after this type parameter declaration.',
        UnexpectedTypeParameterBeforeAsyncArrowFunction:
          'Type parameters must come after the async keyword, e.g. instead of `<T> async () => {}`, use `async <T>() => {}`.',
        UnsupportedDeclareExportKind: ({
          unsupportedExportKind: e,
          suggestion: t
        }) => `\`declare export ${e}\` is not supported. Use \`${t}\` instead.`,
        UnsupportedStatementInDeclareModule:
          'Only declares and type imports are allowed inside declare module.',
        UnterminatedFlowComment: 'Unterminated flow-comment.'
      });
    function ed(e) {
      return 'type' === e.importKind || 'typeof' === e.importKind;
    }
    var em = {
        const: 'declare export var',
        let: 'declare export var',
        type: 'export type',
        interface: 'export interface'
      },
      ef = /\*?\s*@((?:no)?flow)\b/,
      ey = RegExp(/\r\n|[\r\n\u2028\u2029]/.source, 'g');
    function ex(e) {
      switch (e) {
        case 10:
        case 13:
        case 8232:
        case 8233:
          return !0;
        default:
          return !1;
      }
    }
    function eP(e, t, s) {
      for (let i = t; i < s; i++) if (ex(e.charCodeAt(i))) return !0;
      return !1;
    }
    var eg = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
      eT = /(?:[^\S\n\r\u2028\u2029]|\/\/.*|\/\*.*?\*\/)*/g,
      eb = T`jsx`({
        AttributeIsEmpty:
          'JSX attributes must only be assigned a non-empty expression.',
        MissingClosingTagElement: ({ openingTagName: e }) =>
          `Expected corresponding JSX closing tag for <${e}>.`,
        MissingClosingTagFragment:
          'Expected corresponding JSX closing tag for <>.',
        UnexpectedSequenceExpression:
          'Sequence expressions cannot be directly nested inside JSX. Did you mean to wrap it in parentheses (...)?',
        UnexpectedToken: ({ unexpected: e, HTMLEntity: t }) =>
          `Unexpected token \`${e}\`. Did you mean \`${t}\` or \`{'${e}'}\`?`,
        UnsupportedJsxValue:
          'JSX value should be either an expression or a quoted JSX text.',
        UnterminatedJsxContent: 'Unterminated JSX contents.',
        UnwrappedAdjacentJSXElements:
          'Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?'
      });
    function eA(e) {
      return (
        !!e &&
        ('JSXOpeningFragment' === e.type || 'JSXClosingFragment' === e.type)
      );
    }
    function eS(e) {
      if ('JSXIdentifier' === e.type) return e.name;
      if ('JSXNamespacedName' === e.type)
        return e.namespace.name + ':' + e.name.name;
      if ('JSXMemberExpression' === e.type)
        return eS(e.object) + '.' + eS(e.property);
      throw Error('Node had unexpected type: ' + e.type);
    }
    var eE = class extends eo {
        tsNames = new Map();
      },
      eC = class extends eh {
        get inTSNamespace() {
          let e = this.scopeStack;
          return (
            e.length >= 2 &&
            0 === e[e.length - 1].flags &&
            (2048 & e[e.length - 2].flags) > 0
          );
        }
        importsStack = [];
        createScope(e) {
          return (this.importsStack.push(new Set()), new eE(e));
        }
        enter(e) {
          (3072 & e && this.importsStack.push(new Set()), super.enter(e));
        }
        exit() {
          let e = super.exit();
          return (3072 & e && this.importsStack.pop(), e);
        }
        hasImport(e, t) {
          let s = this.importsStack.length;
          if (this.importsStack[s - 1].has(e)) return !0;
          if (!t && s > 1) {
            for (let t = 0; t < s - 1; t++)
              if (this.importsStack[t].has(e)) return !0;
          }
          return !1;
        }
        declareName(e, t, s) {
          if (4096 & t) {
            (this.hasImport(e, !0) &&
              this.parser.raise(b.VarRedeclaration, s, { identifierName: e }),
              this.importsStack[this.importsStack.length - 1].add(e));
            return;
          }
          let i = this.currentScope(),
            r = i.tsNames.get(e) || 0;
          if (1024 & t) {
            (this.maybeExportDefined(i, e), i.tsNames.set(e, 16 | r));
            return;
          }
          (super.declareName(e, t, s),
            2 & t &&
              (1 & t ||
                (this.checkRedeclarationInScope(i, e, t, s),
                this.maybeExportDefined(i, e)),
              (r |= 1)),
            256 & t && (r |= 2),
            512 & t && (r |= 4),
            128 & t && (r |= 8),
            r && i.tsNames.set(e, r));
        }
        isRedeclaredInScope(e, t, s) {
          let i = e.tsNames.get(t);
          return (2 & i) > 0
            ? !(256 & s) || (512 & s) > 0 != (4 & i) > 0
            : 128 & s && (8 & i) > 0
              ? !!(2 & e.names.get(t)) && !!(1 & s)
              : (!!(2 & s) && (1 & i) > 0) ||
                super.isRedeclaredInScope(e, t, s);
        }
        checkLocalExport(e) {
          let { name: t } = e;
          if (this.hasImport(t)) return;
          let s = this.scopeStack.length;
          for (let e = s - 1; e >= 0; e--) {
            let s = this.scopeStack[e].tsNames.get(t);
            if ((1 & s) > 0 || (16 & s) > 0) return;
          }
          super.checkLocalExport(e);
        }
      },
      eI = class {
        sawUnambiguousESM = !1;
        ambiguousScriptDifferentAst = !1;
        sourceToOffsetPos(e) {
          return e + this.startIndex;
        }
        offsetToSourcePos(e) {
          return e - this.startIndex;
        }
        hasPlugin(e) {
          if ('string' == typeof e) return this.plugins.has(e);
          {
            let [t, s] = e;
            if (!this.hasPlugin(t)) return !1;
            let i = this.plugins.get(t);
            for (let e of Object.keys(s)) if (i?.[e] !== s[e]) return !1;
            return !0;
          }
        }
        getPluginOption(e, t) {
          return this.plugins.get(e)?.[t];
        }
      };
    function eN(e, t) {
      void 0 === e.trailingComments
        ? (e.trailingComments = t)
        : e.trailingComments.unshift(...t);
    }
    function ew(e, t) {
      void 0 === e.innerComments
        ? (e.innerComments = t)
        : e.innerComments.unshift(...t);
    }
    function ek(e, t, s) {
      let i = null,
        r = t.length;
      for (; null === i && r > 0;) i = t[--r];
      null === i || i.start > s.start ? ew(e, s.comments) : eN(i, s.comments);
    }
    var ev = class extends eI {
        addComment(e) {
          this.filename && (e.loc.filename = this.filename);
          let { commentsLen: t } = this.state;
          (this.comments.length !== t && (this.comments.length = t),
            this.comments.push(e),
            this.state.commentsLen++);
        }
        processComment(e) {
          let { commentStack: t } = this.state,
            s = t.length;
          if (0 === s) return;
          let i = s - 1,
            r = t[i];
          r.start === e.end && ((r.leadingNode = e), i--);
          let n = e.start;
          for (; i >= 0; i--) {
            let s = t[i],
              r = s.end;
            if (r > n)
              ((s.containingNode = e), this.finalizeComment(s), t.splice(i, 1));
            else {
              r === n && (s.trailingNode = e);
              break;
            }
          }
        }
        finalizeComment(e) {
          let { comments: t } = e;
          if (null !== e.leadingNode || null !== e.trailingNode) {
            var s;
            (null !== e.leadingNode && eN(e.leadingNode, t),
              null !== e.trailingNode &&
                ((s = e.trailingNode),
                void 0 === s.leadingComments
                  ? (s.leadingComments = t)
                  : s.leadingComments.unshift(...t)));
          } else {
            let s = e.containingNode,
              i = e.start;
            if (44 === this.input.charCodeAt(this.offsetToSourcePos(i) - 1))
              switch (s.type) {
                case 'ObjectExpression':
                case 'ObjectPattern':
                  ek(s, s.properties, e);
                  break;
                case 'CallExpression':
                case 'NewExpression':
                case 'OptionalCallExpression':
                  ek(s, s.arguments, e);
                  break;
                case 'ImportExpression':
                  ek(s, [s.source, s.options ?? null], e);
                  break;
                case 'FunctionDeclaration':
                case 'FunctionExpression':
                case 'ArrowFunctionExpression':
                case 'ObjectMethod':
                case 'ClassMethod':
                case 'ClassPrivateMethod':
                case 'TSTypeParameterDeclaration':
                  ek(s, s.params, e);
                  break;
                case 'ArrayExpression':
                case 'ArrayPattern':
                  ek(s, s.elements, e);
                  break;
                case 'ExportNamedDeclaration':
                case 'ImportDeclaration':
                  ek(s, s.specifiers, e);
                  break;
                case 'TSEnumBody':
                  ek(s, s.members, e);
                  break;
                case 'TSInterfaceBody':
                  ek(s, s.body, e);
                  break;
                default:
                  ew(s, t);
              }
            else ew(s, t);
          }
        }
        finalizeRemainingComments() {
          let { commentStack: e } = this.state;
          for (let t = e.length - 1; t >= 0; t--) this.finalizeComment(e[t]);
          this.state.commentStack = [];
        }
        resetPreviousNodeTrailingComments(e) {
          let { commentStack: t } = this.state,
            { length: s } = t;
          if (0 === s) return;
          let i = t[s - 1];
          i.leadingNode === e && (i.leadingNode = null);
        }
        takeSurroundingComments(e, t, s) {
          let { commentStack: i } = this.state,
            r = i.length;
          if (0 === r) return;
          let n = r - 1;
          for (; n >= 0; n--) {
            let r = i[n],
              o = r.end;
            if (r.start === s) r.leadingNode = e;
            else if (o === t) r.trailingNode = e;
            else if (o < t) break;
          }
        }
      },
      eL = class a {
        flags = 2048;
        get strict() {
          return (1 & this.flags) > 0;
        }
        set strict(e) {
          e ? (this.flags |= 1) : (this.flags &= -2);
        }
        startIndex;
        curLine;
        lineStart;
        startLoc;
        endLoc;
        init({
          strictMode: e,
          sourceType: t,
          startIndex: s,
          startLine: i,
          startColumn: r
        }) {
          ((this.strict = !1 !== e && (!0 === e || 'module' === t)),
            (this.startIndex = s),
            (this.curLine = i),
            (this.lineStart = -r),
            (this.startLoc = this.endLoc = new u(i, r, s)));
        }
        errors = [];
        noArrowAt = [];
        noArrowParamsConversionAt = [];
        get canStartArrow() {
          return (2 & this.flags) > 0;
        }
        set canStartArrow(e) {
          e ? (this.flags |= 2) : (this.flags &= -3);
        }
        get inType() {
          return (4 & this.flags) > 0;
        }
        set inType(e) {
          e ? (this.flags |= 4) : (this.flags &= -5);
        }
        get noAnonFunctionType() {
          return (8 & this.flags) > 0;
        }
        set noAnonFunctionType(e) {
          e ? (this.flags |= 8) : (this.flags &= -9);
        }
        get hasFlowComment() {
          return (16 & this.flags) > 0;
        }
        set hasFlowComment(e) {
          e ? (this.flags |= 16) : (this.flags &= -17);
        }
        get isAmbientContext() {
          return (32 & this.flags) > 0;
        }
        set isAmbientContext(e) {
          e ? (this.flags |= 32) : (this.flags &= -33);
        }
        get inAbstractClass() {
          return (64 & this.flags) > 0;
        }
        set inAbstractClass(e) {
          e ? (this.flags |= 64) : (this.flags &= -65);
        }
        get inDisallowConditionalTypesContext() {
          return (128 & this.flags) > 0;
        }
        set inDisallowConditionalTypesContext(e) {
          e ? (this.flags |= 128) : (this.flags &= -129);
        }
        get inConditionalConsequent() {
          return (256 & this.flags) > 0;
        }
        set inConditionalConsequent(e) {
          e ? (this.flags |= 256) : (this.flags &= -257);
        }
        get inHackPipelineBody() {
          return (512 & this.flags) > 0;
        }
        set inHackPipelineBody(e) {
          e ? (this.flags |= 512) : (this.flags &= -513);
        }
        get seenTopicReference() {
          return (1024 & this.flags) > 0;
        }
        set seenTopicReference(e) {
          e ? (this.flags |= 1024) : (this.flags &= -1025);
        }
        labels = [];
        commentsLen = 0;
        commentStack = [];
        pos = 0;
        type = 135;
        value = null;
        start = 0;
        end = 0;
        lastTokEndLoc = null;
        lastTokStartLoc = null;
        context = [q.brace];
        get canStartJSXElement() {
          return (2048 & this.flags) > 0;
        }
        set canStartJSXElement(e) {
          e ? (this.flags |= 2048) : (this.flags &= -2049);
        }
        get containsEsc() {
          return (4096 & this.flags) > 0;
        }
        set containsEsc(e) {
          e ? (this.flags |= 4096) : (this.flags &= -4097);
        }
        firstInvalidTemplateEscapePos = null;
        get hasTopLevelAwait() {
          return (8192 & this.flags) > 0;
        }
        set hasTopLevelAwait(e) {
          e ? (this.flags |= 8192) : (this.flags &= -8193);
        }
        strictErrors = new Map();
        tokensLength = 0;
        curPosition() {
          return new u(
            this.curLine,
            this.pos - this.lineStart,
            this.pos + this.startIndex
          );
        }
        clone() {
          let e = new a();
          return (
            (e.flags = this.flags),
            (e.startIndex = this.startIndex),
            (e.curLine = this.curLine),
            (e.lineStart = this.lineStart),
            (e.startLoc = this.startLoc),
            (e.endLoc = this.endLoc),
            (e.errors = this.errors.slice()),
            (e.noArrowAt = this.noArrowAt.slice()),
            (e.noArrowParamsConversionAt =
              this.noArrowParamsConversionAt.slice()),
            (e.labels = this.labels.slice()),
            (e.commentsLen = this.commentsLen),
            (e.commentStack = this.commentStack.slice()),
            (e.pos = this.pos),
            (e.type = this.type),
            (e.value = this.value),
            (e.start = this.start),
            (e.end = this.end),
            (e.lastTokEndLoc = this.lastTokEndLoc),
            (e.lastTokStartLoc = this.lastTokStartLoc),
            (e.context = this.context.slice()),
            (e.firstInvalidTemplateEscapePos =
              this.firstInvalidTemplateEscapePos),
            (e.strictErrors = this.strictErrors),
            (e.tokensLength = this.tokensLength),
            e
          );
        }
      },
      eM = {
        decBinOct: new Set([46, 66, 69, 79, 95, 98, 101, 111]),
        hex: new Set([46, 88, 95, 120])
      },
      eD = e => 48 === e || 49 === e,
      eO = e => e >= 48 && e <= 55,
      eF = e => e >= 48 && e <= 57,
      eB = e =>
        (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102);
    function eU(e, t, s, i, r, n) {
      let o = s,
        h = i,
        p = r,
        l = '',
        c = null,
        u = s,
        { length: d } = t;
      for (;;) {
        var m, f, y, x;
        if (s >= d) {
          (n.unterminated(o, h, p), (l += t.slice(u, s)));
          break;
        }
        let P = t.charCodeAt(s);
        if (
          ((m = e),
          (f = P),
          (y = t),
          (x = s),
          'template' === m
            ? 96 === f || (36 === f && 123 === y.charCodeAt(x + 1))
            : f === ('double' === m ? 34 : 39))
        ) {
          l += t.slice(u, s);
          break;
        }
        if (92 === P) {
          l += t.slice(u, s);
          let o = (function (e, t, s, i, r, n) {
            let o = !r;
            t++;
            let h = e => ({ pos: t, ch: e, lineStart: s, curLine: i }),
              p = e.charCodeAt(t++);
            switch (p) {
              case 110:
                return h(`
`);
              case 114:
                return h('\r');
              case 120: {
                let r;
                return (
                  ({ code: r, pos: t } = eR(e, t, s, i, 2, !1, o, n)),
                  h(null === r ? null : String.fromCharCode(r))
                );
              }
              case 117: {
                let r;
                return (
                  ({ code: r, pos: t } = e_(e, t, s, i, o, n)),
                  h(null === r ? null : String.fromCodePoint(r))
                );
              }
              case 116:
                return h('	');
              case 98:
                return h('\b');
              case 118:
                return h('\v');
              case 102:
                return h('\f');
              case 13:
                10 === e.charCodeAt(t) && ++t;
              case 10:
                ((s = t), ++i);
              case 8232:
              case 8233:
                return h('');
              case 56:
              case 57:
                if (r) return h(null);
                n.strictNumericEscape(t - 1, s, i);
              default:
                if (p >= 48 && p <= 55) {
                  let o = t - 1,
                    p = /^[0-7]+/.exec(e.slice(o, t + 2))[0],
                    l = parseInt(p, 8);
                  (l > 255 && (l = parseInt((p = p.slice(0, -1)), 8)),
                    (t += p.length - 1));
                  let c = e.charCodeAt(t);
                  if ('0' !== p || 56 === c || 57 === c) {
                    if (r) return h(null);
                    n.strictNumericEscape(o, s, i);
                  }
                  return h(String.fromCharCode(l));
                }
                return h(String.fromCharCode(p));
            }
          })(t, s, i, r, 'template' === e, n);
          (null !== o.ch || c
            ? (l += o.ch)
            : (c = { pos: s, lineStart: i, curLine: r }),
            ({ pos: s, lineStart: i, curLine: r } = o),
            (u = s));
        } else
          8232 === P || 8233 === P
            ? (++s, ++r, (i = s))
            : 10 === P || 13 === P
              ? 'template' === e
                ? ((l +=
                    t.slice(u, s) +
                    `
`),
                  ++s,
                  13 === P && 10 === t.charCodeAt(s) && ++s,
                  ++r,
                  (u = i = s))
                : n.unterminated(o, h, p)
              : ++s;
      }
      return { pos: s, str: l, firstInvalidLoc: c, lineStart: i, curLine: r };
    }
    function eR(e, t, s, i, r, n, o, h) {
      let p = t,
        l;
      return (
        ({ n: l, pos: t } = ej(e, t, s, i, 16, r, n, !1, h, !o)),
        null === l && (o ? h.invalidEscapeSequence(p, s, i) : (t = p - 1)),
        { code: l, pos: t }
      );
    }
    function ej(e, t, s, i, r, n, o, h, p, l) {
      let c = t,
        u = 16 === r ? eM.hex : eM.decBinOct,
        d = 16 === r ? eB : 10 === r ? eF : 8 === r ? eO : eD,
        m = !1,
        f = 0;
      for (let c = 0, y = n ?? 1 / 0; c < y; ++c) {
        let n = e.charCodeAt(t),
          c;
        if (95 === n && 'bail' !== h) {
          let r = e.charCodeAt(t - 1),
            n = e.charCodeAt(t + 1);
          if (h) {
            if (Number.isNaN(n) || !d(n) || u.has(r) || u.has(n)) {
              if (l) return { n: null, pos: t };
              p.unexpectedNumericSeparator(t, s, i);
            }
          } else {
            if (l) return { n: null, pos: t };
            p.numericSeparatorInEscapeSequence(t, s, i);
          }
          ++t;
          continue;
        }
        if (
          (c =
            n >= 97
              ? n - 97 + 10
              : n >= 65
                ? n - 65 + 10
                : n >= 48 && n <= 57
                  ? n - 48
                  : 1 / 0) >= r
        ) {
          if (c <= 9 && l) return { n: null, pos: t };
          if (c <= 9 && p.invalidDigit(t, s, i, r)) c = 0;
          else if (o) ((c = 0), (m = !0));
          else break;
        }
        (++t, (f = f * r + c));
      }
      return t === c || (null != n && t - c !== n) || m
        ? { n: null, pos: t }
        : { n: f, pos: t };
    }
    function e_(e, t, s, i, r, n) {
      let o;
      if (123 === e.charCodeAt(t)) {
        if (
          (++t,
          ({ code: o, pos: t } = eR(
            e,
            t,
            s,
            i,
            e.indexOf('}', t) - t,
            !0,
            r,
            n
          )),
          ++t,
          null !== o && o > 1114111)
        )
          if (!r) return { code: null, pos: t };
          else n.invalidCodePoint(t, s, i);
      } else ({ code: o, pos: t } = eR(e, t, s, i, 4, !1, r, n));
      return { code: o, pos: t };
    }
    function eV(e, t, s) {
      return new u(s, e - t, e);
    }
    var ez,
      eH = new Set([103, 109, 115, 105, 121, 117, 100, 118]),
      e$ = class {
        constructor(e) {
          let t = e.startIndex || 0;
          ((this.type = e.type),
            (this.value = e.value),
            (this.start = t + e.start),
            (this.end = t + e.end),
            (this.loc = new d(e.startLoc, e.endLoc)));
        }
      },
      eq = class extends ev {
        isLookahead;
        tokens = [];
        constructor(e, t) {
          (super(),
            (this.state = new eL()),
            this.state.init(e),
            (this.input = t),
            (this.length = t.length),
            (this.comments = []),
            (this.isLookahead = !1),
            (!ez || ez.length < (this.length + 1) * 2) &&
              (ez = new Uint32Array((this.length + 1) * 2)),
            (this.locData = ez));
        }
        setLoc(e) {
          let t = this.offsetToSourcePos(e.index);
          ((this.locData[2 * t] = e.line),
            (this.locData[2 * t + 1] = e.column));
        }
        getLoc(e) {
          let t = this.offsetToSourcePos(e);
          return new u(this.locData[2 * t], this.locData[2 * t + 1], e);
        }
        pushToken(e) {
          ((this.tokens.length = this.state.tokensLength),
            this.tokens.push(e),
            ++this.state.tokensLength);
        }
        next() {
          (this.checkKeywordEscapes(),
            512 & this.optionFlags && this.pushToken(new e$(this.state)),
            (this.state.lastTokEndLoc = this.state.endLoc),
            (this.state.lastTokStartLoc = this.state.startLoc),
            this.nextToken());
        }
        eat(e) {
          return !!this.match(e) && (this.next(), !0);
        }
        match(e) {
          return this.state.type === e;
        }
        createLookaheadState(e) {
          return {
            pos: e.pos,
            value: null,
            type: e.type,
            start: e.start,
            end: e.end,
            context: [this.curContext()],
            inType: e.inType,
            startLoc: e.startLoc,
            lastTokEndLoc: e.lastTokEndLoc,
            curLine: e.curLine,
            lineStart: e.lineStart,
            curPosition: e.curPosition
          };
        }
        lookahead() {
          let e = this.state;
          ((this.state = this.createLookaheadState(e)),
            (this.isLookahead = !0),
            this.nextToken(),
            (this.isLookahead = !1));
          let t = this.state;
          return ((this.state = e), t);
        }
        nextTokenStart() {
          return this.nextTokenStartSince(this.state.pos);
        }
        nextTokenStartSince(e) {
          return ((eg.lastIndex = e), eg.test(this.input) ? eg.lastIndex : e);
        }
        lookaheadCharCode() {
          return this.lookaheadCharCodeSince(this.state.pos);
        }
        lookaheadCharCodeSince(e) {
          return this.input.charCodeAt(this.nextTokenStartSince(e));
        }
        nextTokenInLineStart() {
          return this.nextTokenInLineStartSince(this.state.pos);
        }
        nextTokenInLineStartSince(e) {
          return ((eT.lastIndex = e), eT.test(this.input) ? eT.lastIndex : e);
        }
        lookaheadInLineCharCode() {
          return this.input.charCodeAt(this.nextTokenInLineStart());
        }
        codePointAtPos(e) {
          let t = this.input.charCodeAt(e);
          if ((64512 & t) == 55296 && ++e < this.input.length) {
            let s = this.input.charCodeAt(e);
            (64512 & s) == 56320 &&
              (t = 65536 + ((1023 & t) << 10) + (1023 & s));
          }
          return t;
        }
        setStrict(e) {
          ((this.state.strict = e),
            e &&
              (this.state.strictErrors.forEach(([e, t]) => this.raise(e, t)),
              this.state.strictErrors.clear()));
        }
        curContext() {
          return this.state.context[this.state.context.length - 1];
        }
        nextToken() {
          (this.skipSpace(),
          (this.state.start = this.state.pos),
          this.isLookahead || (this.state.startLoc = this.state.curPosition()),
          this.state.pos >= this.length)
            ? this.finishToken(135)
            : this.getTokenFromCode(this.codePointAtPos(this.state.pos));
        }
        skipBlockComment(e) {
          let t;
          this.isLookahead || (t = this.state.curPosition());
          let s = this.state.pos,
            i = this.input.indexOf(e, s + 2);
          if (-1 === i)
            throw this.raise(b.UnterminatedComment, this.state.curPosition());
          for (
            this.state.pos = i + e.length, ey.lastIndex = s + 2;
            ey.test(this.input) && ey.lastIndex <= i;
          )
            (++this.state.curLine, (this.state.lineStart = ey.lastIndex));
          if (this.isLookahead) return;
          let r = {
            type: 'CommentBlock',
            value: this.input.slice(s + 2, i),
            start: this.sourceToOffsetPos(s),
            end: this.sourceToOffsetPos(i + e.length),
            loc: new d(t, this.state.curPosition())
          };
          return (512 & this.optionFlags && this.pushToken(r), r);
        }
        skipLineComment(e) {
          let t = this.state.pos,
            s;
          this.isLookahead || (s = this.state.curPosition());
          let i = this.input.charCodeAt((this.state.pos += e));
          if (this.state.pos < this.length)
            for (; !ex(i) && ++this.state.pos < this.length;)
              i = this.input.charCodeAt(this.state.pos);
          if (this.isLookahead) return;
          let r = this.state.pos,
            n = {
              type: 'CommentLine',
              value: this.input.slice(t + e, r),
              start: this.sourceToOffsetPos(t),
              end: this.sourceToOffsetPos(r),
              loc: new d(s, this.state.curPosition())
            };
          return (512 & this.optionFlags && this.pushToken(n), n);
        }
        skipSpace() {
          let e = this.state.pos,
            t = 8192 & this.optionFlags ? [] : null;
          e: for (; this.state.pos < this.length;) {
            let s = this.input.charCodeAt(this.state.pos);
            switch (s) {
              case 32:
              case 160:
              case 9:
                ++this.state.pos;
                break;
              case 13:
                10 === this.input.charCodeAt(this.state.pos + 1) &&
                  ++this.state.pos;
              case 10:
              case 8232:
              case 8233:
                (++this.state.pos,
                  ++this.state.curLine,
                  (this.state.lineStart = this.state.pos));
                break;
              case 47:
                switch (this.input.charCodeAt(this.state.pos + 1)) {
                  case 42: {
                    let e = this.skipBlockComment('*/');
                    void 0 !== e && (this.addComment(e), t?.push(e));
                    break;
                  }
                  case 47: {
                    let e = this.skipLineComment(2);
                    void 0 !== e && (this.addComment(e), t?.push(e));
                    break;
                  }
                  default:
                    break e;
                }
                break;
              default:
                if (
                  (function (e) {
                    switch (e) {
                      case 9:
                      case 11:
                      case 12:
                      case 32:
                      case 160:
                      case 5760:
                      case 8192:
                      case 8193:
                      case 8194:
                      case 8195:
                      case 8196:
                      case 8197:
                      case 8198:
                      case 8199:
                      case 8200:
                      case 8201:
                      case 8202:
                      case 8239:
                      case 8287:
                      case 12288:
                      case 65279:
                        return !0;
                      default:
                        return !1;
                    }
                  })(s)
                )
                  ++this.state.pos;
                else if (
                  45 === s &&
                  !this.inModule &&
                  16384 & this.optionFlags
                ) {
                  let s = this.state.pos;
                  if (
                    45 === this.input.charCodeAt(s + 1) &&
                    62 === this.input.charCodeAt(s + 2) &&
                    (0 === e || this.state.lineStart > e)
                  ) {
                    let e = this.skipLineComment(3);
                    void 0 !== e && (this.addComment(e), t?.push(e));
                  } else break e;
                } else if (
                  60 === s &&
                  !this.inModule &&
                  16384 & this.optionFlags
                ) {
                  let e = this.state.pos;
                  if (
                    33 === this.input.charCodeAt(e + 1) &&
                    45 === this.input.charCodeAt(e + 2) &&
                    45 === this.input.charCodeAt(e + 3)
                  ) {
                    let e = this.skipLineComment(4);
                    void 0 !== e && (this.addComment(e), t?.push(e));
                  } else break e;
                } else break e;
            }
          }
          if (t?.length > 0) {
            let s = this.state.pos,
              i = {
                start: this.sourceToOffsetPos(e),
                end: this.sourceToOffsetPos(s),
                comments: t,
                leadingNode: null,
                trailingNode: null,
                containingNode: null
              };
            this.state.commentStack.push(i);
          }
        }
        finishToken(e, t) {
          ((this.state.end = this.state.pos),
            (this.state.endLoc = this.state.curPosition()));
          let s = this.state.type;
          ((this.state.type = e),
            (this.state.value = t),
            this.isLookahead || this.updateContext(s));
        }
        replaceToken(e) {
          ((this.state.type = e), this.updateContext());
        }
        readToken_numberSign() {
          if (0 === this.state.pos && this.readToken_interpreter()) return;
          let e = this.state.pos + 1,
            t = this.codePointAtPos(e);
          if (t >= 48 && t <= 57)
            throw this.raise(
              b.UnexpectedDigitAfterHash,
              this.state.curPosition()
            );
          Q(t)
            ? (++this.state.pos, this.finishToken(134, this.readWord1(t)))
            : 92 === t
              ? (++this.state.pos, this.finishToken(134, this.readWord1()))
              : this.finishOp(23, 1);
        }
        readToken_dot() {
          let e = this.input.charCodeAt(this.state.pos + 1);
          e >= 48 && e <= 57
            ? this.readNumber(!0)
            : 46 === e && 46 === this.input.charCodeAt(this.state.pos + 2)
              ? ((this.state.pos += 3), this.finishToken(17))
              : (++this.state.pos, this.finishToken(12));
        }
        readToken_slash() {
          61 === this.input.charCodeAt(this.state.pos + 1)
            ? this.finishOp(27, 2)
            : this.finishOp(52, 1);
        }
        readToken_interpreter() {
          if (0 !== this.state.pos || this.length < 2) return !1;
          let e = this.input.charCodeAt(this.state.pos + 1);
          if (33 !== e) return !1;
          let t = this.state.pos;
          for (this.state.pos += 1; !ex(e) && ++this.state.pos < this.length;)
            e = this.input.charCodeAt(this.state.pos);
          let s = this.input.slice(t + 2, this.state.pos);
          return (this.finishToken(24, s), !0);
        }
        readToken_mult_modulo(e) {
          let t = 42 === e ? 51 : 50,
            s = 1,
            i = this.input.charCodeAt(this.state.pos + 1);
          (42 === e &&
            42 === i &&
            (s++, (i = this.input.charCodeAt(this.state.pos + 2)), (t = 53)),
            61 !== i || this.state.inType || (s++, (t = 37 === e ? 29 : 26)),
            this.finishOp(t, s));
        }
        readToken_pipe_amp(e) {
          let t = this.input.charCodeAt(this.state.pos + 1);
          t === e
            ? 61 === this.input.charCodeAt(this.state.pos + 2)
              ? this.finishOp(26, 3)
              : this.finishOp(124 === e ? 37 : 38, 2)
            : 124 === e && 62 === t
              ? this.finishOp(35, 2)
              : 61 === t
                ? this.finishOp(26, 2)
                : this.finishOp(124 === e ? 39 : 41, 1);
        }
        readToken_caret() {
          let e = this.input.charCodeAt(this.state.pos + 1);
          61 !== e || this.state.inType
            ? 94 === e &&
              this.hasPlugin([
                'pipelineOperator',
                { proposal: 'hack', topicToken: '^^' }
              ])
              ? (this.finishOp(33, 2),
                94 === this.input.codePointAt(this.state.pos) &&
                  this.unexpected())
              : this.finishOp(40, 1)
            : this.finishOp(28, 2);
        }
        readToken_atSign() {
          64 === this.input.charCodeAt(this.state.pos + 1) &&
          this.hasPlugin([
            'pipelineOperator',
            { proposal: 'hack', topicToken: '@@' }
          ])
            ? this.finishOp(34, 2)
            : this.finishOp(22, 1);
        }
        readToken_plus_min(e) {
          let t = this.input.charCodeAt(this.state.pos + 1);
          t === e
            ? this.finishOp(30, 2)
            : 61 === t
              ? this.finishOp(26, 2)
              : this.finishOp(49, 1);
        }
        readToken_lt() {
          let { pos: e } = this.state,
            t = this.input.charCodeAt(e + 1);
          60 === t
            ? 61 === this.input.charCodeAt(e + 2)
              ? this.finishOp(26, 3)
              : this.finishOp(47, 2)
            : 61 === t
              ? this.finishOp(45, 2)
              : this.finishOp(43, 1);
        }
        readToken_gt() {
          let { pos: e } = this.state,
            t = this.input.charCodeAt(e + 1);
          if (62 === t) {
            let t = 62 === this.input.charCodeAt(e + 2) ? 3 : 2;
            return 61 === this.input.charCodeAt(e + t)
              ? void this.finishOp(26, t + 1)
              : void this.finishOp(48, t);
          }
          61 === t ? this.finishOp(45, 2) : this.finishOp(44, 1);
        }
        readToken_eq_excl(e) {
          let t = this.input.charCodeAt(this.state.pos + 1);
          if (61 === t)
            return void this.finishOp(
              42,
              61 === this.input.charCodeAt(this.state.pos + 2) ? 3 : 2
            );
          if (61 === e && 62 === t) {
            ((this.state.pos += 2), this.finishToken(15));
            return;
          }
          this.finishOp(61 === e ? 25 : 31, 1);
        }
        readToken_question() {
          let e = this.input.charCodeAt(this.state.pos + 1),
            t = this.input.charCodeAt(this.state.pos + 2);
          63 === e
            ? 61 === t
              ? this.finishOp(26, 3)
              : this.finishOp(36, 2)
            : 46 !== e || (t >= 48 && t <= 57)
              ? (++this.state.pos, this.finishToken(13))
              : ((this.state.pos += 2), this.finishToken(14));
        }
        getTokenFromCode(e) {
          switch (e) {
            case 46:
              this.readToken_dot();
              return;
            case 40:
              (++this.state.pos, this.finishToken(6));
              return;
            case 41:
              (++this.state.pos, this.finishToken(7));
              return;
            case 59:
              (++this.state.pos, this.finishToken(9));
              return;
            case 44:
              (++this.state.pos, this.finishToken(8));
              return;
            case 91:
              (++this.state.pos, this.finishToken(0));
              return;
            case 93:
              (++this.state.pos, this.finishToken(1));
              return;
            case 123:
              (++this.state.pos, this.finishToken(2));
              return;
            case 125:
              (++this.state.pos, this.finishToken(4));
              return;
            case 58:
              this.hasPlugin('functionBind') &&
              58 === this.input.charCodeAt(this.state.pos + 1)
                ? this.finishOp(11, 2)
                : (++this.state.pos, this.finishToken(10));
              return;
            case 63:
              this.readToken_question();
              return;
            case 96:
              this.readTemplateToken();
              return;
            case 48: {
              let e = this.input.charCodeAt(this.state.pos + 1);
              if (120 === e || 88 === e) return void this.readRadixNumber(16);
              if (111 === e || 79 === e) return void this.readRadixNumber(8);
              if (98 === e || 66 === e) return void this.readRadixNumber(2);
            }
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              this.readNumber(!1);
              return;
            case 34:
            case 39:
              this.readString(e);
              return;
            case 47:
              this.readToken_slash();
              return;
            case 37:
            case 42:
              this.readToken_mult_modulo(e);
              return;
            case 124:
            case 38:
              this.readToken_pipe_amp(e);
              return;
            case 94:
              this.readToken_caret();
              return;
            case 43:
            case 45:
              this.readToken_plus_min(e);
              return;
            case 60:
              this.readToken_lt();
              return;
            case 62:
              this.readToken_gt();
              return;
            case 61:
            case 33:
              this.readToken_eq_excl(e);
              return;
            case 126:
              this.finishOp(32, 1);
              return;
            case 64:
              this.readToken_atSign();
              return;
            case 35:
              this.readToken_numberSign();
              return;
            case 92:
              this.readWord();
              return;
            default:
              if (Q(e)) return void this.readWord(e);
          }
          throw this.raise(
            b.InvalidOrUnexpectedToken,
            this.state.curPosition(),
            { unexpected: String.fromCodePoint(e) }
          );
        }
        finishOp(e, t) {
          let s = this.input.slice(this.state.pos, this.state.pos + t);
          ((this.state.pos += t), this.finishToken(e, s));
        }
        readRegexp() {
          let e = this.state.startLoc,
            t = this.state.start + 1,
            s,
            i,
            { pos: r } = this.state;
          for (; ; ++r) {
            if (r >= this.length)
              throw this.raise(b.UnterminatedRegExp, m(e, 1));
            let t = this.input.charCodeAt(r);
            if (ex(t)) throw this.raise(b.UnterminatedRegExp, m(e, 1));
            if (s) s = !1;
            else {
              if (91 === t) i = !0;
              else if (93 === t && i) i = !1;
              else if (47 === t && !i) break;
              s = 92 === t;
            }
          }
          let n = this.input.slice(t, r);
          ++r;
          let o = '',
            h = () => m(e, r + 2 - t);
          for (; r < this.length;) {
            let e = this.codePointAtPos(r),
              t = String.fromCharCode(e);
            if (eH.has(e))
              (118 === e
                ? o.includes('u') &&
                  this.raise(b.IncompatibleRegExpUVFlags, h())
                : 117 === e &&
                  o.includes('v') &&
                  this.raise(b.IncompatibleRegExpUVFlags, h()),
                o.includes(t) && this.raise(b.DuplicateRegExpFlags, h()));
            else if (Z(e) || 92 === e) this.raise(b.MalformedRegExpFlags, h());
            else break;
            (++r, (o += t));
          }
          ((this.state.pos = r),
            this.finishToken(133, { pattern: n, flags: o }));
        }
        readInt(e, t, s = !1, i = !0) {
          let { n: r, pos: n } = ej(
            this.input,
            this.state.pos,
            this.state.lineStart,
            this.state.curLine,
            e,
            t,
            s,
            i,
            this.errorHandlers_readInt,
            !1
          );
          return ((this.state.pos = n), r);
        }
        readRadixNumber(e) {
          let t = this.state.pos,
            s = this.state.curPosition(),
            i = !1;
          this.state.pos += 2;
          let r = this.readInt(e);
          if (
            (null == r && this.raise(b.InvalidDigit, m(s, 2), { radix: e }),
            110 === this.input.charCodeAt(this.state.pos) &&
              (++this.state.pos, (i = !0)),
            Q(this.codePointAtPos(this.state.pos)))
          )
            throw this.raise(b.NumberIdentifier, this.state.curPosition());
          if (i) {
            let e = this.input.slice(t, this.state.pos).replace(/[_n]/g, '');
            this.finishToken(132, e);
            return;
          }
          this.finishToken(131, r);
        }
        readNumber(e) {
          let t = this.state.pos,
            s = this.state.curPosition(),
            i = !1,
            r = !1,
            n = !1;
          e ||
            null !== this.readInt(10) ||
            this.raise(b.InvalidNumber, this.state.curPosition());
          let o = this.state.pos - t >= 2 && 48 === this.input.charCodeAt(t);
          if (o) {
            let e = this.input.slice(t, this.state.pos);
            if (
              (this.recordStrictModeErrors(b.StrictOctalLiteral, s),
              !this.state.strict)
            ) {
              let t = e.indexOf('_');
              t > 0 && this.raise(b.ZeroDigitNumericSeparator, m(s, t));
            }
            n = o && !/[89]/.test(e);
          }
          let h = this.input.charCodeAt(this.state.pos);
          (46 !== h ||
            n ||
            (++this.state.pos,
            this.readInt(10),
            (i = !0),
            (h = this.input.charCodeAt(this.state.pos))),
            (69 !== h && 101 !== h) ||
              n ||
              ((43 === (h = this.input.charCodeAt(++this.state.pos)) ||
                45 === h) &&
                ++this.state.pos,
              null === this.readInt(10) &&
                this.raise(b.InvalidOrMissingExponent, s),
              (i = !0),
              (h = this.input.charCodeAt(this.state.pos))));
          let p = l(0, this.input.slice(t, this.state.pos), '_', '');
          if (
            (110 === h &&
              ((i || o) && this.raise(b.InvalidBigIntLiteral, s),
              ++this.state.pos,
              (r = !0)),
            Q(this.codePointAtPos(this.state.pos)))
          )
            throw this.raise(b.NumberIdentifier, this.state.curPosition());
          if (r) return void this.finishToken(132, p);
          let c = n ? parseInt(p, 8) : parseFloat(p);
          this.finishToken(131, c);
        }
        readCodePoint(e) {
          let { code: t, pos: s } = e_(
            this.input,
            this.state.pos,
            this.state.lineStart,
            this.state.curLine,
            e,
            this.errorHandlers_readCodePoint
          );
          return ((this.state.pos = s), t);
        }
        readString(e) {
          let {
            str: t,
            pos: s,
            curLine: i,
            lineStart: r
          } = eU(
            34 === e ? 'double' : 'single',
            this.input,
            this.state.pos + 1,
            this.state.lineStart,
            this.state.curLine,
            this.errorHandlers_readStringContents_string
          );
          ((this.state.pos = s + 1),
            (this.state.lineStart = r),
            (this.state.curLine = i),
            this.finishToken(130, t));
        }
        readTemplateContinuation() {
          (this.match(4) || this.unexpected(null, 4),
            this.state.pos--,
            this.readTemplateToken());
        }
        readTemplateToken() {
          let e = this.input[this.state.pos],
            {
              str: t,
              firstInvalidLoc: s,
              pos: i,
              curLine: r,
              lineStart: n
            } = eU(
              'template',
              this.input,
              this.state.pos + 1,
              this.state.lineStart,
              this.state.curLine,
              this.errorHandlers_readStringContents_template
            );
          ((this.state.pos = i + 1),
            (this.state.lineStart = n),
            (this.state.curLine = r),
            s &&
              (this.state.firstInvalidTemplateEscapePos = new u(
                s.curLine,
                s.pos - s.lineStart,
                this.sourceToOffsetPos(s.pos)
              )),
            96 === this.input.codePointAt(i)
              ? this.finishToken(20, s ? null : e + t + '`')
              : (this.state.pos++,
                this.finishToken(21, s ? null : e + t + '${')));
        }
        recordStrictModeErrors(e, t) {
          let s = t.index;
          this.state.strict && !this.state.strictErrors.has(s)
            ? this.raise(e, t)
            : this.state.strictErrors.set(s, [e, t]);
        }
        readWord1(e) {
          this.state.containsEsc = !1;
          let t = '',
            s = this.state.pos,
            i = this.state.pos;
          for (
            void 0 !== e && (this.state.pos += e <= 65535 ? 1 : 2);
            this.state.pos < this.length;
          ) {
            let e = this.codePointAtPos(this.state.pos);
            if (Z(e)) this.state.pos += e <= 65535 ? 1 : 2;
            else if (92 === e) {
              ((this.state.containsEsc = !0),
                (t += this.input.slice(i, this.state.pos)));
              let e = this.state.curPosition(),
                r = this.state.pos === s ? Q : Z;
              if (117 !== this.input.charCodeAt(++this.state.pos)) {
                (this.raise(b.MissingUnicodeEscape, this.state.curPosition()),
                  (i = this.state.pos - 1));
                continue;
              }
              ++this.state.pos;
              let n = this.readCodePoint(!0);
              (null !== n &&
                (r(n) || this.raise(b.EscapedCharNotAnIdentifier, e),
                (t += String.fromCodePoint(n))),
                (i = this.state.pos));
            } else break;
          }
          return t + this.input.slice(i, this.state.pos);
        }
        readWord(e) {
          let t = this.readWord1(e),
            s = E.get(t);
          void 0 !== s ? this.finishToken(s, k[s]) : this.finishToken(128, t);
        }
        checkKeywordEscapes() {
          let { type: e } = this.state;
          V(e) &&
            this.state.containsEsc &&
            this.raise(b.InvalidEscapedReservedWord, this.state.startLoc, {
              reservedWord: k[e]
            });
        }
        raise(e, t, s = {}) {
          let i =
              t instanceof u
                ? t
                : 'number' == typeof t
                  ? this.getLoc(t)
                  : 256 & this.optionFlags
                    ? t.loc.start
                    : this.getLoc(t.start),
            r = t instanceof u ? i.index : 'number' == typeof t ? t : t.start,
            n = e(i, r, s);
          if (!(4096 & this.optionFlags)) throw n;
          return (this.isLookahead || this.state.errors.push(n), n);
        }
        raiseOverwrite(e, t, s = {}) {
          let i =
              t instanceof u
                ? t
                : 256 & this.optionFlags
                  ? t.loc.start
                  : this.getLoc(t.start),
            r = t instanceof u ? i.index : t.start,
            n = this.state.errors;
          for (let t = n.length - 1; t >= 0; t--) {
            let o = n[t];
            if (o.pos === r) return (n[t] = e(i, r, s));
            if (o.pos < r) break;
          }
          return this.raise(e, i, s);
        }
        updateContext(e) {}
        unexpected(e, t) {
          throw this.raise(b.UnexpectedToken, e ?? this.state.startLoc, {
            expected: t ? k[t] : null
          });
        }
        expectPlugin(e, t) {
          if (this.hasPlugin(e)) return !0;
          throw this.raise(b.MissingPlugin, t ?? this.state.startLoc, {
            missingPlugin: [e]
          });
        }
        expectOnePlugin(e) {
          if (!e.some(e => this.hasPlugin(e)))
            throw this.raise(b.MissingOneOfPlugins, this.state.startLoc, {
              missingPlugin: e
            });
        }
        errorBuilder(e) {
          return (t, s, i) => {
            this.raise(e, eV(t, s, i));
          };
        }
        errorHandlers_readInt = {
          invalidDigit: (e, t, s, i) =>
            !!(4096 & this.optionFlags) &&
            (this.raise(b.InvalidDigit, eV(e, t, s), { radix: i }), !0),
          numericSeparatorInEscapeSequence: this.errorBuilder(
            b.NumericSeparatorInEscapeSequence
          ),
          unexpectedNumericSeparator: this.errorBuilder(
            b.UnexpectedNumericSeparator
          )
        };
        errorHandlers_readCodePoint = {
          ...this.errorHandlers_readInt,
          invalidEscapeSequence: this.errorBuilder(b.InvalidEscapeSequence),
          invalidCodePoint: this.errorBuilder(b.InvalidCodePoint)
        };
        errorHandlers_readStringContents_string = {
          ...this.errorHandlers_readCodePoint,
          strictNumericEscape: (e, t, s) => {
            this.recordStrictModeErrors(b.StrictNumericEscape, eV(e, t, s));
          },
          unterminated: (e, t, s) => {
            throw this.raise(b.UnterminatedString, eV(e - 1, t, s));
          }
        };
        errorHandlers_readStringContents_template = {
          ...this.errorHandlers_readCodePoint,
          strictNumericEscape: this.errorBuilder(b.StrictNumericEscape),
          unterminated: (e, t, s) => {
            throw this.raise(b.UnterminatedTemplate, eV(e, t, s));
          }
        };
      },
      eK = class {
        privateNames = new Set();
        loneAccessors = new Map();
        undefinedPrivateNames = new Map();
      },
      eW = class {
        parser;
        stack = [];
        constructor(e) {
          this.parser = e;
        }
        current() {
          return this.stack[this.stack.length - 1];
        }
        enter() {
          this.stack.push(new eK());
        }
        exit() {
          let e = this.stack.pop(),
            t = this.current();
          for (let [s, i] of Array.from(e.undefinedPrivateNames))
            t
              ? t.undefinedPrivateNames.has(s) ||
                t.undefinedPrivateNames.set(s, i)
              : this.parser.raise(b.InvalidPrivateFieldResolution, i, {
                  identifierName: s
                });
        }
        declarePrivateName(e, t, s) {
          let {
              privateNames: i,
              loneAccessors: r,
              undefinedPrivateNames: n
            } = this.current(),
            o = i.has(e);
          if (3 & t) {
            let s = o && r.get(e);
            if (s) {
              let i = 4 & t;
              (o = (3 & s) == (3 & t) || (4 & s) !== i) || r.delete(e);
            } else o || r.set(e, t);
          }
          (o &&
            this.parser.raise(b.PrivateNameRedeclaration, s, {
              identifierName: e
            }),
            i.add(e),
            n.delete(e));
        }
        usePrivateName(e, t) {
          let s;
          for (s of this.stack) if (s.privateNames.has(e)) return;
          s
            ? s.undefinedPrivateNames.set(e, t)
            : this.parser.raise(b.InvalidPrivateFieldResolution, t, {
                identifierName: e
              });
        }
      },
      eJ = class {
        constructor(e = 0) {
          this.type = e;
        }
        canBeArrowParameterDeclaration() {
          return 2 === this.type || 1 === this.type;
        }
        isCertainlyParameterDeclaration() {
          return 3 === this.type;
        }
      },
      eX = class extends eJ {
        declarationErrors = new Map();
        constructor(e) {
          super(e);
        }
        recordDeclarationError(e, t) {
          this.declarationErrors.set(t, e);
        }
        clearDeclarationError(e) {
          this.declarationErrors.delete(e);
        }
        iterateErrors(e) {
          this.declarationErrors.forEach(e);
        }
      },
      eG = class {
        parser;
        stack = [new eJ()];
        constructor(e) {
          this.parser = e;
        }
        enter(e) {
          this.stack.push(e);
        }
        exit() {
          this.stack.pop();
        }
        recordParameterInitializerError(e, t) {
          let { stack: s } = this,
            i = s.length - 1,
            r = s[i];
          for (; !r.isCertainlyParameterDeclaration();) {
            if (!r.canBeArrowParameterDeclaration()) return;
            (r.recordDeclarationError(e, t), (r = s[--i]));
          }
          this.parser.raise(e, t);
        }
        recordArrowParameterBindingError(e, t) {
          let { stack: s } = this,
            i = s[s.length - 1],
            r = t.start;
          if (i.isCertainlyParameterDeclaration()) this.parser.raise(e, r);
          else {
            if (!i.canBeArrowParameterDeclaration()) return;
            i.recordDeclarationError(e, r);
          }
        }
        recordAsyncArrowParametersError(e) {
          let { stack: t } = this,
            s = t.length - 1,
            i = t[s];
          for (; i.canBeArrowParameterDeclaration();)
            (2 === i.type &&
              i.recordDeclarationError(b.AwaitBindingIdentifier, e),
              (i = t[--s]));
        }
        validateAsPattern() {
          let { stack: e } = this,
            t = e[e.length - 1];
          t.canBeArrowParameterDeclaration() &&
            t.iterateErrors((t, s) => {
              this.parser.raise(t, s);
              let i = e.length - 2,
                r = e[i];
              for (; r.canBeArrowParameterDeclaration();)
                (r.clearDeclarationError(s), (r = e[--i]));
            });
        }
      },
      eY = class {
        stacks = [];
        enter(e) {
          this.stacks.push(e);
        }
        exit() {
          this.stacks.pop();
        }
        currentFlags() {
          return this.stacks[this.stacks.length - 1];
        }
        get hasAwait() {
          return (2 & this.currentFlags()) > 0;
        }
        get hasYield() {
          return (1 & this.currentFlags()) > 0;
        }
        get hasReturn() {
          return (4 & this.currentFlags()) > 0;
        }
        get hasIn() {
          return (8 & this.currentFlags()) > 0;
        }
        get inFSharpPipelineDirectBody() {
          return (16 & this.currentFlags()) == 0;
        }
      };
    function eQ(e, t) {
      return (2 * !!e) | !!t;
    }
    var eZ = class extends eq {
        addExtra(e, t, s, i = !0) {
          if (!e) return;
          let { extra: r } = e;
          (null == r && (e.extra = r = {}),
            i
              ? (r[t] = s)
              : Object.defineProperty(r, t, { enumerable: i, value: s }));
        }
        isContextual(e) {
          return this.state.type === e && !this.state.containsEsc;
        }
        isUnparsedContextual(e, t) {
          if (this.input.startsWith(t, e)) {
            let s = this.input.charCodeAt(e + t.length);
            return !(Z(s) || (64512 & s) == 55296);
          }
          return !1;
        }
        isLookaheadContextual(e) {
          let t = this.nextTokenStart();
          return this.isUnparsedContextual(t, e);
        }
        eatContextual(e) {
          return !!this.isContextual(e) && (this.next(), !0);
        }
        expectContextual(e, t) {
          if (!this.eatContextual(e)) {
            if (null != t) throw this.raise(t, this.state.startLoc);
            this.unexpected(null, e);
          }
        }
        canInsertSemicolon() {
          return (
            this.match(135) || this.match(4) || this.hasPrecedingLineBreak()
          );
        }
        hasPrecedingLineBreak() {
          return eP(
            this.input,
            this.offsetToSourcePos(this.state.lastTokEndLoc.index),
            this.state.start
          );
        }
        hasFollowingLineBreak() {
          return eP(this.input, this.state.end, this.nextTokenStart());
        }
        isLineTerminator() {
          return this.eat(9) || this.canInsertSemicolon();
        }
        semicolon(e = !0) {
          (e ? this.isLineTerminator() : this.eat(9)) ||
            this.raise(b.MissingSemicolon, this.state.lastTokEndLoc);
        }
        expect(e, t) {
          this.eat(e) || this.unexpected(t, e);
        }
        tryParse(e, t = this.state.clone()) {
          let s = { node: null };
          try {
            let i = e((e = null) => {
              throw ((s.node = e), s);
            });
            if (this.state.errors.length > t.errors.length) {
              let e = this.state;
              return (
                (this.state = t),
                (this.state.tokensLength = e.tokensLength),
                {
                  node: i,
                  error: e.errors[t.errors.length],
                  thrown: !1,
                  aborted: !1,
                  failState: e
                }
              );
            }
            return {
              node: i,
              error: null,
              thrown: !1,
              aborted: !1,
              failState: null
            };
          } catch (i) {
            let e = this.state;
            if (((this.state = t), i instanceof SyntaxError))
              return {
                node: null,
                error: i,
                thrown: !0,
                aborted: !1,
                failState: e
              };
            if (i === s)
              return {
                node: s.node,
                error: null,
                thrown: !1,
                aborted: !0,
                failState: e
              };
            throw i;
          }
        }
        checkExpressionErrors(e, t) {
          if (!e) return !1;
          let {
              shorthandAssignLoc: s,
              doubleProtoLoc: i,
              privateKeyLoc: r,
              optionalParametersLoc: n,
              voidPatternLoc: o
            } = e,
            h = !!s || !!i || !!n || !!r || !!o;
          if (!t) return h;
          (null != s && this.raise(b.InvalidCoverInitializedName, s),
            null != i && this.raise(b.DuplicateProto, i),
            null != r && this.raise(b.UnexpectedPrivateField, r),
            null != n && this.unexpected(n),
            null != o && this.raise(b.InvalidCoverDiscardElement, o));
        }
        isLiteralPropertyName() {
          return j(this.state.type);
        }
        isPrivateName(e) {
          return 'PrivateName' === e.type;
        }
        getPrivateNameSV(e) {
          return e.id.name;
        }
        hasPropertyAsPrivateName(e) {
          return (
            ('MemberExpression' === e.type ||
              'OptionalMemberExpression' === e.type) &&
            this.isPrivateName(e.property)
          );
        }
        isObjectProperty(e) {
          return 'ObjectProperty' === e.type;
        }
        isObjectMethod(e) {
          return 'ObjectMethod' === e.type;
        }
        initializeScopes(e = 'module' === this.options.sourceType) {
          let t = this.state.labels;
          this.state.labels = [];
          let s = this.exportedIdentifiers;
          this.exportedIdentifiers = new Set();
          let i = this.inModule;
          this.inModule = e;
          let r = this.scope,
            n = this.getScopeHandler();
          this.scope = new n(this, e);
          let o = this.prodParam;
          this.prodParam = new eY();
          let h = this.classScope;
          this.classScope = new eW(this);
          let p = this.expressionScope;
          return (
            (this.expressionScope = new eG(this)),
            () => {
              ((this.state.labels = t),
                (this.exportedIdentifiers = s),
                (this.inModule = i),
                (this.scope = r),
                (this.prodParam = o),
                (this.classScope = h),
                (this.expressionScope = p));
            }
          );
        }
        enterInitialScopes() {
          let e = 0;
          ((this.inModule || 1 & this.optionFlags) && (e |= 2),
            32 & this.optionFlags && (e |= 1));
          let t = !this.inModule && 'commonjs' === this.options.sourceType;
          ((t || 2 & this.optionFlags) && (e |= 4), this.prodParam.enter(e));
          let s = t ? 514 : 1;
          (4 & this.optionFlags && (s |= 512),
            16 & this.optionFlags && (s |= 48),
            this.scope.enter(s));
        }
        checkDestructuringPrivate(e) {
          let { privateKeyLoc: t } = e;
          null !== t && this.expectPlugin('destructuringPrivate', t);
        }
      },
      e1 = class {
        shorthandAssignLoc = null;
        doubleProtoLoc = null;
        privateKeyLoc = null;
        optionalParametersLoc = null;
        voidPatternLoc = null;
      },
      e0 = class {
        constructor(e, t, s, i) {
          ((this.start = s),
            (this.end = 0),
            void 0 !== i && (this.loc = new d(i)),
            128 & e && (this.range = [s, 0]),
            void 0 !== i && t && (this.loc.filename = t));
        }
        type = '';
      },
      e2 = e0.prototype,
      e3 = class extends eZ {
        createPosition(e) {
          return e;
        }
        startNode() {
          let { startLoc: e } = this.state;
          return (this.setLoc(e), this.startNodeAt(e));
        }
        startNodeAt(e) {
          let { optionFlags: t, filename: s } = this;
          return 256 & t
            ? new e0(t, s, e.index, this.createPosition(e))
            : new e0(t, s, e.index);
        }
        startNodeAtNode(e) {
          let { optionFlags: t, filename: s } = this;
          return 256 & t
            ? new e0(t, s, e.start, e.loc.start)
            : new e0(t, s, e.start);
        }
        finishNode(e, t) {
          return this.finishNodeAt(e, t, this.state.lastTokEndLoc);
        }
        finishNodeAt(e, t, s) {
          ((e.type = t), (e.end = s.index));
          let { optionFlags: i } = this;
          return (
            256 & i && (e.loc.end = this.createPosition(s)),
            128 & i && (e.range[1] = s.index),
            8192 & i && this.processComment(e),
            e
          );
        }
        finishNodeAtNode(e, t, s) {
          ((e.type = t), (e.end = s.end));
          let { optionFlags: i } = this;
          return (
            256 & i && (e.loc.end = s.loc.end),
            128 & i && (e.range[1] = e.end),
            8192 & i && this.processComment(e),
            e
          );
        }
        resetStartLocation(e, t) {
          e.start = t.index;
          let { optionFlags: s } = this;
          (256 & s && (e.loc.start = this.createPosition(t)),
            128 & s && (e.range[0] = t.index));
        }
        resetEndLocation(e, t = this.state.lastTokEndLoc) {
          e.end = t.index;
          let { optionFlags: s } = this;
          (256 & s && (e.loc.end = this.createPosition(t)),
            128 & s && (e.range[1] = t.index));
        }
        resetStartLocationFromNode(e, t) {
          e.start = t.start;
          let { optionFlags: s } = this;
          (256 & s && (e.loc.start = t.loc.start),
            128 & s && (e.range[0] = t.start));
        }
        resetEndLocationFromNode(e, t) {
          e.end = t.end;
          let { optionFlags: s } = this;
          (256 & s && (e.loc.end = t.loc.end), 128 & s && (e.range[1] = t.end));
        }
        castNodeTo(e, t) {
          return ((e.type = t), e);
        }
        cloneIdentifier(e) {
          let { type: t, start: s, end: i, loc: r, range: n, name: o } = e,
            h = Object.create(e2);
          return (
            (h.type = t),
            (h.start = s),
            (h.end = i),
            (h.loc = r),
            (h.range = n),
            (h.name = o),
            e.extra && (h.extra = e.extra),
            h
          );
        }
        cloneStringLiteral(e) {
          let { type: t, start: s, end: i, loc: r, range: n, extra: o } = e,
            h = Object.create(e2);
          return (
            (h.type = t),
            (h.start = s),
            (h.end = i),
            (h.loc = r),
            (h.range = n),
            (h.extra = o),
            (h.value = e.value),
            h
          );
        }
      },
      e4 = e => ('ParenthesizedExpression' === e.type ? e4(e.expression) : e),
      e8 = class extends e3 {
        toAssignable(e, t = !1) {
          let s;
          switch (
            (('ParenthesizedExpression' === e.type || e.extra?.parenthesized) &&
              ((s = e4(e)),
              t
                ? 'Identifier' === s.type
                  ? this.expressionScope.recordArrowParameterBindingError(
                      b.InvalidParenthesizedAssignment,
                      e
                    )
                  : 'CallExpression' !== s.type &&
                    'MemberExpression' !== s.type &&
                    !this.isOptionalMemberExpression(s) &&
                    this.raise(b.InvalidParenthesizedAssignment, e)
                : this.raise(b.InvalidParenthesizedAssignment, e)),
            e.type)
          ) {
            case 'Identifier':
            case 'ObjectPattern':
            case 'ArrayPattern':
            case 'AssignmentPattern':
            case 'RestElement':
            case 'VoidPattern':
              break;
            case 'ObjectExpression':
              this.castNodeTo(e, 'ObjectPattern');
              for (let s = 0, i = e.properties.length, r = i - 1; s < i; s++) {
                let i = e.properties[s],
                  n = s === r;
                (this.toAssignableObjectExpressionProp(i, n, t),
                  n &&
                    'RestElement' === i.type &&
                    e.extra?.trailingCommaLoc &&
                    this.raise(b.RestTrailingComma, e.extra.trailingCommaLoc));
              }
              break;
            case 'ObjectProperty': {
              let { key: s, value: i } = e;
              (this.isPrivateName(s) &&
                this.classScope.usePrivateName(
                  this.getPrivateNameSV(s),
                  s.start
                ),
                this.toAssignable(i, t));
              break;
            }
            case 'SpreadElement':
              throw Error(
                "Internal @babel/parser error (this is a bug, please report it). SpreadElement should be converted by .toAssignable's caller."
              );
            case 'ArrayExpression':
              (this.castNodeTo(e, 'ArrayPattern'),
                this.toAssignableList(
                  e.elements,
                  e.extra?.trailingCommaLoc,
                  t
                ));
              break;
            case 'AssignmentExpression':
              ('=' !== e.operator &&
                this.raise(
                  b.MissingEqInAssignment,
                  256 & this.optionFlags ? e.left.loc.end : e.left
                ),
                this.castNodeTo(e, 'AssignmentPattern'),
                delete e.operator,
                'VoidPattern' === e.left.type &&
                  this.raise(b.VoidPatternInitializer, e.left),
                this.toAssignable(e.left, t));
              break;
            case 'ParenthesizedExpression':
              this.toAssignable(s, t);
          }
        }
        toAssignableObjectExpressionProp(e, t, s) {
          if ('ObjectMethod' === e.type)
            this.raise(
              'get' === e.kind || 'set' === e.kind
                ? b.PatternHasAccessor
                : b.PatternHasMethod,
              e.key
            );
          else if ('SpreadElement' === e.type) {
            this.castNodeTo(e, 'RestElement');
            let i = e.argument;
            (this.checkToRestConversion(i, !1),
              this.toAssignable(i, s),
              t || this.raise(b.RestTrailingComma, e));
          } else this.toAssignable(e, s);
        }
        toAssignableList(e, t, s) {
          let i = e.length - 1;
          for (let r = 0; r <= i; r++) {
            let n = e[r];
            n &&
              (this.toAssignableListItem(e, r, s),
              'RestElement' === n.type &&
                (r < i
                  ? this.raise(b.RestTrailingComma, n)
                  : t && this.raise(b.RestTrailingComma, t)));
          }
        }
        toAssignableListItem(e, t, s) {
          let i = e[t];
          if ('SpreadElement' === i.type) {
            this.castNodeTo(i, 'RestElement');
            let e = i.argument;
            (this.checkToRestConversion(e, !0), this.toAssignable(e, s));
          } else this.toAssignable(i, s);
        }
        isAssignable(e, t) {
          switch (e.type) {
            case 'Identifier':
            case 'ObjectPattern':
            case 'ArrayPattern':
            case 'AssignmentPattern':
            case 'RestElement':
            case 'VoidPattern':
              return !0;
            case 'ObjectExpression': {
              let t = e.properties.length - 1;
              return e.properties.every(
                (e, s) =>
                  'ObjectMethod' !== e.type &&
                  (s === t || 'SpreadElement' !== e.type) &&
                  this.isAssignable(e)
              );
            }
            case 'ObjectProperty':
              return this.isAssignable(e.value);
            case 'SpreadElement':
              return this.isAssignable(e.argument);
            case 'ArrayExpression':
              return e.elements.every(e => null === e || this.isAssignable(e));
            case 'AssignmentExpression':
              return '=' === e.operator;
            case 'ParenthesizedExpression':
              return this.isAssignable(e.expression);
            case 'MemberExpression':
            case 'OptionalMemberExpression':
              return !t;
            default:
              return !1;
          }
        }
        toReferencedList(e, t) {
          return e;
        }
        parseSpread(e) {
          let t = this.startNode();
          return (
            this.next(),
            (t.argument = this.parseMaybeAssignAllowIn(e, void 0)),
            this.finishNode(t, 'SpreadElement')
          );
        }
        parseRestBinding() {
          let e = this.startNode();
          this.next();
          let t = this.parseBindingAtom();
          return (
            'VoidPattern' === t.type && this.raise(b.UnexpectedVoidPattern, t),
            (e.argument = t),
            this.finishNode(e, 'RestElement')
          );
        }
        parseBindingAtom() {
          switch (this.state.type) {
            case 0: {
              let e = this.startNode();
              return (
                this.next(),
                (e.elements = this.parseBindingList(1, 93, 1)),
                this.finishNode(e, 'ArrayPattern')
              );
            }
            case 2:
              return this.parseObjectLike(4, !0);
            case 84:
              return this.parseVoidPattern(null);
          }
          return this.parseIdentifier();
        }
        parseBindingList(e, t, s) {
          let i = 1 & s,
            r = [],
            n = !0;
          for (; !this.eat(e);)
            if ((n ? (n = !1) : this.expect(8), i && this.match(8)))
              r.push(null);
            else {
              if (this.eat(e)) break;
              if (this.match(17)) {
                let i = this.parseRestBinding();
                if (
                  (2 & s && (i = this.parseFunctionParamType(i)),
                  r.push(i),
                  !this.checkCommaAfterRest(t))
                ) {
                  this.expect(e);
                  break;
                }
              } else {
                let e = [];
                if (2 & s)
                  for (
                    this.match(22) &&
                    this.hasPlugin('decorators') &&
                    this.raise(
                      b.UnsupportedParameterDecorator,
                      this.state.startLoc
                    );
                    this.match(22);
                  )
                    e.push(this.parseDecorator());
                r.push(this.parseBindingElement(s, e));
              }
            }
          return r;
        }
        parseBindingRestProperty(e) {
          return (
            this.next(),
            this.hasPlugin('discardBinding') && this.match(84)
              ? ((e.argument = this.parseVoidPattern(null)),
                this.raise(b.UnexpectedVoidPattern, e.argument))
              : (e.argument = this.parseIdentifier()),
            this.checkCommaAfterRest(125),
            this.finishNode(e, 'RestElement')
          );
        }
        parseBindingProperty() {
          let { type: e, startLoc: t } = this.state;
          if (17 === e) return this.parseBindingRestProperty(this.startNode());
          let s = this.startNode();
          return (
            134 === e
              ? (this.expectPlugin('destructuringPrivate', t),
                this.classScope.usePrivateName(this.state.value, t),
                (s.key = this.parsePrivateName()))
              : this.parsePropertyName(s),
            (s.method = !1),
            this.parseObjPropValue(s, t, !1, !1, !0, !1)
          );
        }
        parseBindingElement(e, t) {
          let { startLoc: s } = this.state,
            i = this.parseMaybeDefault();
          return (
            2 & e && this.parseFunctionParamType(i),
            t.length &&
              ((i.decorators = t), this.resetStartLocationFromNode(i, t[0])),
            this.parseMaybeDefault(s, i)
          );
        }
        parseFunctionParamType(e) {
          return e;
        }
        parseMaybeDefault(e, t) {
          if (
            (e ?? (e = this.state.startLoc),
            (t = t ?? this.parseBindingAtom()),
            !this.eat(25))
          )
            return t;
          let s = this.startNodeAt(e);
          return (
            'VoidPattern' === t.type && this.raise(b.VoidPatternInitializer, t),
            (s.left = t),
            (s.right = this.parseMaybeAssignAllowIn()),
            this.finishNode(s, 'AssignmentPattern')
          );
        }
        isValidLVal(e, t, s, i) {
          switch (e) {
            case 'AssignmentPattern':
              return 'left';
            case 'RestElement':
              return 'argument';
            case 'ObjectProperty':
              return 'value';
            case 'ParenthesizedExpression':
              return 'expression';
            case 'ArrayPattern':
              return 'elements';
            case 'ObjectPattern':
              return 'properties';
            case 'VoidPattern':
              return !0;
            case 'CallExpression':
              if (!t && !this.state.strict && 16384 & this.optionFlags)
                return !0;
          }
          return !1;
        }
        isOptionalMemberExpression(e) {
          return 'OptionalMemberExpression' === e.type;
        }
        checkLVal(e, t, s = 64, i = !1, r = !1, n = !1, o = !1) {
          let h,
            p,
            l = e.type;
          if (this.isObjectMethod(e)) return;
          let c = this.isOptionalMemberExpression(e);
          if (c || 'MemberExpression' === l) {
            (c &&
              (this.expectPlugin('optionalChainingAssign', e.start),
              'AssignmentExpression' !== t.type &&
                this.raise(b.InvalidLhsOptionalChaining, e, { ancestor: t })),
              64 !== s && this.raise(b.InvalidPropertyBindingPattern, e));
            return;
          }
          if ('Identifier' === l) {
            this.checkIdentifier(e, s, r);
            let { name: t } = e;
            i && (i.has(t) ? this.raise(b.ParamDupe, e) : i.add(t));
            return;
          }
          'VoidPattern' === l &&
            'CatchClause' === t.type &&
            this.raise(b.VoidPatternCatchClauseParam, e);
          let u = e4(e);
          o ||
            (o =
              'CallExpression' === u.type &&
              ('Import' === u.callee.type || 'Super' === u.callee.type));
          let d = this.isValidLVal(
            l,
            o,
            !(n || e.extra?.parenthesized) && 'AssignmentExpression' === t.type,
            s
          );
          if (!0 === d) return;
          if (!1 === d) {
            let i = 64 === s ? b.InvalidLhs : b.InvalidLhsBinding;
            this.raise(i, e, { ancestor: t });
            return;
          }
          'string' == typeof d
            ? ((h = d), (p = 'ParenthesizedExpression' === l))
            : ([h, p] = d);
          let m =
              'ArrayPattern' === l || 'ObjectPattern' === l ? { type: l } : t,
            f = e[h];
          if (Array.isArray(f))
            for (let e of f) e && this.checkLVal(e, m, s, i, r, p, !0);
          else f && this.checkLVal(f, m, s, i, r, p, o);
        }
        checkIdentifier(e, t, s = !1) {
          var i;
          (this.state.strict &&
            (s ? ea(e.name, this.inModule) : ((i = e.name), es.has(i))) &&
            (64 === t
              ? this.raise(b.StrictEvalArguments, e, { referenceName: e.name })
              : this.raise(b.StrictEvalArgumentsBinding, e, {
                  bindingName: e.name
                })),
            8192 & t &&
              'let' === e.name &&
              this.raise(b.LetInLexicalBinding, e),
            64 & t || this.declareNameFromIdentifier(e, t));
        }
        declareNameFromIdentifier(e, t) {
          this.scope.declareName(e.name, t, e.start);
        }
        checkToRestConversion(e, t) {
          switch (e.type) {
            case 'ParenthesizedExpression':
              this.checkToRestConversion(e.expression, t);
              break;
            case 'Identifier':
            case 'MemberExpression':
              break;
            case 'ArrayExpression':
            case 'ObjectExpression':
              if (t) break;
            default:
              this.raise(b.InvalidRestAssignmentPattern, e);
          }
        }
        checkCommaAfterRest(e) {
          return (
            !!this.match(8) &&
            (this.raise(
              this.lookaheadCharCode() === e
                ? b.RestTrailingComma
                : b.ElementAfterRest,
              this.state.startLoc
            ),
            !0)
          );
        }
      },
      e6 = class extends e8 {
        checkProto(e, t, s) {
          if (
            'SpreadElement' === e.type ||
            this.isObjectMethod(e) ||
            e.computed ||
            e.shorthand
          )
            return t;
          let i = e.key;
          return ('Identifier' === i.type ? i.name : i.value) === '__proto__'
            ? (t &&
                (s
                  ? null === s.doubleProtoLoc &&
                    (s.doubleProtoLoc = this.getLoc(i.start))
                  : this.raise(b.DuplicateProto, i)),
              !0)
            : t;
        }
        shouldExitDescending(e) {
          return (
            'ArrowFunctionExpression' === e.type && !e.extra?.parenthesized
          );
        }
        getExpression() {
          if ((this.enterInitialScopes(), this.nextToken(), this.match(135)))
            throw this.raise(b.ParseExpressionEmptyInput, this.state.startLoc);
          let e = this.parseExpression();
          if (!this.match(135))
            throw this.raise(b.ParseExpressionExpectsEOF, this.state.startLoc, {
              unexpected: this.input.codePointAt(this.state.start)
            });
          return (
            this.finalizeRemainingComments(),
            (e.comments = this.comments),
            (e.errors = this.state.errors),
            512 & this.optionFlags && (e.tokens = tt(this.tokens)),
            e
          );
        }
        parseExpression(e, t) {
          return e
            ? this.disallowInAnd(() => this.parseExpressionBase(t))
            : this.allowInAnd(() => this.parseExpressionBase(t));
        }
        parseExpressionBase(e) {
          let t = this.state.startLoc,
            s = this.parseMaybeAssign(e);
          if (this.match(8)) {
            let i = this.startNodeAt(t);
            for (i.expressions = [s]; this.eat(8);)
              i.expressions.push(this.parseMaybeAssign(e));
            return (
              this.toReferencedList(i.expressions),
              this.finishNode(i, 'SequenceExpression')
            );
          }
          return s;
        }
        parseMaybeAssignDisallowIn(e, t) {
          return this.disallowInAnd(() => this.parseMaybeAssign(e, t));
        }
        parseMaybeAssignAllowIn(e, t) {
          return this.allowInAnd(() => this.parseMaybeAssign(e, t));
        }
        setOptionalParametersError(e) {
          e.optionalParametersLoc = this.state.startLoc;
        }
        parseMaybeAssign(e, t) {
          var s;
          let i,
            r = this.state.startLoc,
            n = this.isContextual(104);
          if (n && this.prodParam.hasYield) {
            this.next();
            let e = this.parseYield(r);
            return (t && (e = t.call(this, e, r)), e);
          }
          (e ? (i = !1) : ((e = new e1()), (i = !0)),
            (this.state.canStartArrow = !0));
          let o = this.parseMaybeConditional(e);
          if (
            (t && (o = t.call(this, o, r)),
            (s = this.state.type) >= 25 && s <= 29)
          ) {
            let t = this.startNodeAt(r),
              s = this.state.value;
            if (((t.operator = s), this.match(25))) {
              (this.toAssignable(o, !0), (t.left = o));
              let s = r.index;
              (null != e.doubleProtoLoc &&
                e.doubleProtoLoc.index >= s &&
                (e.doubleProtoLoc = null),
                null != e.shorthandAssignLoc &&
                  e.shorthandAssignLoc.index >= s &&
                  (e.shorthandAssignLoc = null),
                null != e.privateKeyLoc &&
                  e.privateKeyLoc.index >= s &&
                  (this.checkDestructuringPrivate(e), (e.privateKeyLoc = null)),
                null != e.voidPatternLoc &&
                  e.voidPatternLoc.index >= s &&
                  (e.voidPatternLoc = null));
            } else t.left = o;
            return (
              this.next(),
              (t.right = this.parseMaybeAssign()),
              this.checkLVal(
                o,
                this.finishNode(t, 'AssignmentExpression'),
                void 0,
                void 0,
                void 0,
                void 0,
                '||=' === s || '&&=' === s || '??=' === s
              ),
              t
            );
          }
          if ((i && this.checkExpressionErrors(e, !0), n)) {
            let { type: e } = this.state;
            if (
              (this.hasPlugin('v8intrinsic')
                ? M[e]
                : M[e] && !this.match(50)) &&
              !this.isAmbiguousPrefixOrIdentifier()
            )
              return (
                this.raiseOverwrite(b.YieldNotInGeneratorFunction, r),
                this.parseYield(r)
              );
          }
          return o;
        }
        parseMaybeConditional(e) {
          let t = this.state.startLoc,
            s = this.parseExprOps(e);
          return this.shouldExitDescending(s)
            ? s
            : this.parseConditional(s, t, e);
        }
        parseConditional(e, t, s) {
          if (this.eat(13)) {
            let s = this.startNodeAt(t);
            return (
              (s.test = e),
              (s.consequent = this.parseMaybeAssignAllowIn()),
              this.expect(10),
              (s.alternate = this.parseMaybeAssign()),
              this.finishNode(s, 'ConditionalExpression')
            );
          }
          return e;
        }
        parseMaybeUnaryOrPrivate(e) {
          return this.match(134)
            ? this.parsePrivateName()
            : this.parseMaybeUnary(e);
        }
        parseExprOps(e) {
          let t = this.state.startLoc,
            s = this.parseMaybeUnaryOrPrivate(e);
          return this.shouldExitDescending(s)
            ? s
            : ((this.state.canStartArrow = !1), this.parseExprOp(s, t, -1));
        }
        parseExprOp(e, t, s) {
          if (this.isPrivateName(e)) {
            let i = this.getPrivateNameSV(e);
            ((!(s >= v[54]) && this.prodParam.hasIn && this.match(54)) ||
              this.raise(b.PrivateInExpectedIn, t, { identifierName: i }),
              this.classScope.usePrivateName(i, t));
          }
          let i = this.state.type;
          if (z(i) && (this.prodParam.hasIn || !this.match(54))) {
            let r = v[i];
            if (r > s) {
              if (
                35 === i &&
                (this.expectPlugin('pipelineOperator'),
                this.prodParam.inFSharpPipelineDirectBody)
              )
                return e;
              let n = this.startNodeAt(t);
              ((n.left = e), (n.operator = this.state.value));
              let o = 37 === i || 38 === i,
                h = 36 === i;
              (h && (r = v[38]),
                this.next(),
                (n.right = this.parseExprOpRightExpr(i, r)));
              let p = this.finishNode(
                  n,
                  o || h ? 'LogicalExpression' : 'BinaryExpression'
                ),
                l = this.state.type;
              if ((h && (37 === l || 38 === l)) || (o && 36 === l))
                throw this.raise(
                  b.MixingCoalesceWithLogical,
                  this.state.startLoc
                );
              return this.parseExprOp(p, t, s);
            }
          }
          return e;
        }
        parseExprOpRightExpr(e, t) {
          if (35 === e)
            switch (this.getPluginOption('pipelineOperator', 'proposal')) {
              case 'hack':
                return this.withTopicBindingContext(() =>
                  this.parseHackPipeBody()
                );
              case 'fsharp':
                return this.parseFSharpPipelineBody(t);
            }
          return this.parseExprOpBaseRightExpr(e, t);
        }
        parseExprOpBaseRightExpr(e, t) {
          let s = this.state.startLoc;
          return this.parseExprOp(
            this.parseMaybeUnaryOrPrivate(),
            s,
            53 === e ? t - 1 : t
          );
        }
        parseHackPipeBody() {
          let { startLoc: e } = this.state,
            t = this.parseMaybeAssign();
          return (
            P.has(t.type) &&
              !t.extra?.parenthesized &&
              this.raise(b.PipeUnparenthesizedBody, e, { type: t.type }),
            this.topicReferenceWasUsedInCurrentContext() ||
              this.raise(b.PipeTopicUnused, e),
            t
          );
        }
        checkExponentialAfterUnary(e) {
          this.match(53) &&
            this.raise(b.UnexpectedTokenUnaryExponentiation, e.argument);
        }
        parseMaybeUnary(e, t) {
          let s = this.state.startLoc,
            i = this.isContextual(92);
          if (i && this.recordAwaitIfAllowed()) {
            this.next();
            let e = this.parseAwait(s);
            return (t || this.checkExponentialAfterUnary(e), e);
          }
          let r = this.match(30),
            n = this.startNode();
          if (D[this.state.type]) {
            ((n.operator = this.state.value),
              (n.prefix = !0),
              (this.state.canStartArrow = !1),
              this.match(68) && this.expectPlugin('throwExpressions'));
            let s = this.match(85);
            if (
              (this.next(),
              (n.argument = this.parseMaybeUnary(null, !0)),
              this.checkExpressionErrors(e, !0),
              this.state.strict && s)
            ) {
              let e = n.argument;
              'Identifier' === e.type
                ? this.raise(b.StrictDelete, n)
                : this.hasPropertyAsPrivateName(e) &&
                  this.raise(b.DeletePrivateField, n);
            }
            if (!r)
              return (
                t || this.checkExponentialAfterUnary(n),
                this.finishNode(n, 'UnaryExpression')
              );
          }
          let o = this.parseUpdate(n, r, e);
          if (i) {
            let { type: e } = this.state;
            if (
              (this.hasPlugin('v8intrinsic')
                ? M[e]
                : M[e] && !this.match(50)) &&
              !this.isAmbiguousPrefixOrIdentifier()
            )
              return (
                this.raiseOverwrite(b.AwaitNotInAsyncContext, s),
                this.parseAwait(s)
              );
          }
          return o;
        }
        parseUpdate(e, t, s) {
          if (t) {
            let t = this.finishNode(e, 'UpdateExpression');
            return (this.checkLVal(t.argument, t), t);
          }
          let i = this.state.startLoc,
            r = this.parseExprSubscripts(s);
          if (this.checkExpressionErrors(s, !1)) return r;
          for (; 30 === this.state.type && !this.canInsertSemicolon();) {
            let e = this.startNodeAt(i);
            ((e.operator = this.state.value),
              (e.prefix = !1),
              (e.argument = r),
              this.next(),
              this.checkLVal(r, (r = this.finishNode(e, 'UpdateExpression'))));
          }
          return r;
        }
        parseExprSubscripts(e) {
          let t = this.state.startLoc;
          this.setLoc(t);
          let s = this.parseExprAtom(e);
          return this.shouldExitDescending(s) ? s : this.parseSubscripts(s, t);
        }
        parseSubscripts(e, t, s) {
          let i = {
            optionalChainMember: !1,
            maybeAsyncArrow: this.atPossibleAsyncArrow(e),
            stop: !1
          };
          do ((e = this.parseSubscript(e, t, s, i)), (i.maybeAsyncArrow = !1));
          while (!i.stop);
          return e;
        }
        parseSubscript(e, t, s, i) {
          let { type: r } = this.state;
          if (!s && 11 === r) return this.parseBind(e, t, i);
          if (H(r)) return this.parseTaggedTemplateExpression(e, t, i);
          let n = !1;
          if (14 === r) {
            if (
              s &&
              (this.raise(b.OptionalChainingNoNew, this.state.startLoc),
              40 === this.lookaheadCharCode())
            )
              return this.stopParseSubscript(e, i);
            ((i.optionalChainMember = n = !0), this.next());
          }
          if (!s && this.match(6))
            return this.parseCoverCallAndAsyncArrowHead(e, t, i, n);
          {
            let s = this.eat(0);
            return s || n || this.eat(12)
              ? this.parseMember(e, t, i, s, n)
              : this.stopParseSubscript(e, i);
          }
        }
        stopParseSubscript(e, t) {
          return ((t.stop = !0), e);
        }
        parseMember(e, t, s, i, r) {
          let n = this.startNodeAt(t);
          return (
            (n.object = e),
            (n.computed = i),
            i
              ? ((n.property = this.parseExpression()), this.expect(1))
              : this.match(134)
                ? ('Super' === e.type && this.raise(b.SuperPrivateField, t),
                  this.classScope.usePrivateName(
                    this.state.value,
                    this.state.startLoc
                  ),
                  (n.property = this.parsePrivateName()))
                : (n.property = this.parseIdentifier(!0)),
            s.optionalChainMember
              ? ((n.optional = r),
                this.finishNode(n, 'OptionalMemberExpression'))
              : this.finishNode(n, 'MemberExpression')
          );
        }
        parseBind(e, t, s) {
          let i = this.startNodeAt(t);
          ((i.object = e), this.next());
          let r = this.match(79),
            n = this.parseNoCallExpr();
          if (
            'Super' === n.type ||
            (r && 'ImportExpression' === n.type) ||
            'Import' === n.type
          )
            throw this.raise(b.UnsupportedBindRHS, n);
          return (
            (i.callee = n),
            (s.stop = !0),
            this.parseSubscripts(this.finishNode(i, 'BindExpression'), t, !1)
          );
        }
        parseCoverCallAndAsyncArrowHead(e, t, s, i) {
          let r = null;
          this.next();
          let n = this.startNodeAt(t);
          n.callee = e;
          let { maybeAsyncArrow: o, optionalChainMember: h } = s;
          (o && (this.expressionScope.enter(new eX(2)), (r = new e1())),
            h && (n.optional = i),
            i
              ? (n.arguments = this.parseCallExpressionArguments())
              : (n.arguments = this.parseCallExpressionArguments(
                  'Super' !== e.type,
                  n,
                  r
                )));
          let p = this.finishCallExpression(n, h);
          return (
            o && this.shouldParseAsyncArrow() && !i
              ? ((s.stop = !0),
                this.checkDestructuringPrivate(r),
                this.expressionScope.validateAsPattern(),
                this.expressionScope.exit(),
                (p = this.parseAsyncArrowFromCallExpression(
                  this.startNodeAt(t),
                  p
                )))
              : (o &&
                  (this.checkExpressionErrors(r, !0),
                  this.expressionScope.exit()),
                this.toReferencedList(n.arguments)),
            p
          );
        }
        parseTaggedTemplateExpression(e, t, s) {
          let i = this.startNodeAt(t);
          return (
            (i.tag = e),
            (i.quasi = this.parseTemplate(!0)),
            s.optionalChainMember &&
              this.raise(b.OptionalChainingNoTemplate, t),
            this.finishNode(i, 'TaggedTemplateExpression')
          );
        }
        atPossibleAsyncArrow(e) {
          return (
            'Identifier' === e.type &&
            'async' === e.name &&
            this.state.lastTokEndLoc.index === e.end &&
            !this.canInsertSemicolon() &&
            e.end - e.start == 5 &&
            this.state.canStartArrow
          );
        }
        finishCallExpression(e, t) {
          if ('Import' === e.callee.type)
            if (0 === e.arguments.length || e.arguments.length > 2)
              this.raise(b.ImportCallArity, e);
            else
              for (let t of e.arguments)
                'SpreadElement' === t.type &&
                  this.raise(b.ImportCallSpreadArgument, t);
          return this.finishNode(
            e,
            t ? 'OptionalCallExpression' : 'CallExpression'
          );
        }
        parseCallExpressionArguments(e, t, s) {
          let i = [],
            r = !0;
          for (; !this.eat(7);) {
            if (r) r = !1;
            else if ((this.expect(8), this.match(7))) {
              (t && this.addTrailingCommaExtraToNode(t), this.next());
              break;
            }
            i.push(this.parseExprListItem(7, !1, s, e));
          }
          return i;
        }
        shouldParseAsyncArrow() {
          return this.match(15) && !this.canInsertSemicolon();
        }
        parseAsyncArrowFromCallExpression(e, t) {
          return (
            this.resetPreviousNodeTrailingComments(t),
            this.expect(15),
            this.parseArrowExpression(
              e,
              t.arguments,
              !0,
              t.extra?.trailingCommaLoc
            ),
            t.innerComments && ew(e, t.innerComments),
            t.callee.trailingComments && ew(e, t.callee.trailingComments),
            e
          );
        }
        parseNoCallExpr() {
          let e = this.state.startLoc;
          return this.parseSubscripts(this.parseExprAtom(), e, !0);
        }
        parseExprAtom(e) {
          let t,
            s = null,
            { type: i } = this.state;
          switch (i) {
            case 75:
              return this.parseSuper();
            case 79:
              return (
                (t = this.startNode()),
                this.next(),
                this.match(12)
                  ? this.parseImportMetaPropertyOrPhaseCall(t)
                  : this.match(6)
                    ? 1024 & this.optionFlags
                      ? this.parseImportCall(t)
                      : this.finishNode(t, 'Import')
                    : (this.raise(
                        b.UnsupportedImport,
                        this.state.lastTokStartLoc
                      ),
                      this.finishNode(t, 'Import'))
              );
            case 74:
              return (
                (t = this.startNode()),
                this.next(),
                this.finishNode(t, 'ThisExpression')
              );
            case 86:
              return this.parseDo(this.startNode(), !1);
            case 52:
            case 27:
              return (
                this.readRegexp(),
                this.parseRegExpLiteral(this.state.value)
              );
            case 131:
              return this.parseNumericLiteral(this.state.value);
            case 132:
              return this.parseBigIntLiteral(this.state.value);
            case 130:
              return this.parseStringLiteral(this.state.value);
            case 80:
              return this.parseNullLiteral();
            case 81:
              return this.parseBooleanLiteral(!0);
            case 82:
              return this.parseBooleanLiteral(!1);
            case 6:
              return this.parseParenAndDistinguishExpression(
                this.state.canStartArrow
              );
            case 0:
              return this.parseArrayLike(1, e);
            case 2:
              return this.parseObjectLike(4, !1, e);
            case 64:
              return this.parseFunctionOrFunctionSent();
            case 22:
              s = this.parseDecorators();
            case 76:
              return this.parseClass(
                this.maybeTakeDecorators(s, this.startNode()),
                !1
              );
            case 73:
              return this.parseNewOrNewTarget();
            case 21:
            case 20:
              return this.parseTemplate(!1);
            case 11: {
              ((t = this.startNode()), this.next(), (t.object = null));
              let e = (t.callee = this.parseNoCallExpr());
              if ('MemberExpression' === e.type)
                return this.finishNode(t, 'BindExpression');
              throw this.raise(b.UnsupportedBind, e);
            }
            case 134:
              return (
                this.raise(b.PrivateInExpectedIn, this.state.startLoc, {
                  identifierName: this.state.value
                }),
                this.parsePrivateName()
              );
            case 29:
              return this.parseTopicReferenceThenEqualsSign(50, '%');
            case 28:
              return this.parseTopicReferenceThenEqualsSign(40, '^');
            case 33:
            case 34:
              return this.parseTopicReference('hack');
            case 40:
            case 50:
            case 23: {
              let e = this.getPluginOption('pipelineOperator', 'proposal');
              if (e) return this.parseTopicReference(e);
              throw this.unexpected();
            }
            case 43: {
              let e = this.input.codePointAt(this.nextTokenStart());
              throw Q(e) || 62 === e
                ? this.expectOnePlugin(['jsx', 'flow', 'typescript'])
                : this.unexpected();
            }
            default:
              if (U(i)) {
                if (
                  this.isContextual(123) &&
                  123 === this.lookaheadInLineCharCode()
                )
                  return this.parseModuleExpression();
                let { canStartArrow: e, containsEsc: t } = this.state,
                  s = this.parseIdentifier();
                if (!t && 'async' === s.name && !this.canInsertSemicolon()) {
                  let { type: t } = this.state;
                  if (64 === t)
                    return (
                      this.resetPreviousNodeTrailingComments(s),
                      this.next(),
                      this.parseAsyncFunctionExpression(this.startNodeAtNode(s))
                    );
                  if (U(t))
                    return e && 61 === this.lookaheadCharCode()
                      ? this.parseAsyncArrowUnaryFunction(
                          this.startNodeAtNode(s)
                        )
                      : s;
                  if (86 === t)
                    return (
                      this.resetPreviousNodeTrailingComments(s),
                      this.parseDo(this.startNodeAtNode(s), !0)
                    );
                }
                return e && this.match(15) && !this.canInsertSemicolon()
                  ? (this.next(),
                    this.parseArrowExpression(this.startNodeAtNode(s), [s], !1))
                  : s;
              }
              throw this.unexpected();
          }
        }
        parseTopicReferenceThenEqualsSign(e, t) {
          let s = this.getPluginOption('pipelineOperator', 'proposal');
          if (s)
            return (
              (this.state.type = e),
              (this.state.value = t),
              this.state.pos--,
              this.state.end--,
              (this.state.endLoc = m(this.state.endLoc, -1)),
              this.parseTopicReference(s)
            );
          throw this.unexpected();
        }
        parseTopicReference(e) {
          let t = this.startNode(),
            s = this.state.startLoc,
            i = this.state.type;
          return (this.next(), this.finishTopicReference(t, s, e, i));
        }
        finishTopicReference(e, t, s, i) {
          if (this.testTopicReferenceConfiguration(s, t, i))
            return (
              this.topicReferenceIsAllowedInCurrentContext() ||
                this.raise(b.PipeTopicUnbound, t),
              this.registerTopicReference(),
              this.finishNode(e, 'TopicReference')
            );
          throw this.raise(b.PipeTopicUnconfiguredToken, t, { token: k[i] });
        }
        testTopicReferenceConfiguration(e, t, s) {
          if ('hack' === e)
            return this.hasPlugin(['pipelineOperator', { topicToken: k[s] }]);
          throw this.raise(b.PipeTopicRequiresHackPipes, t);
        }
        parseAsyncArrowUnaryFunction(e) {
          this.prodParam.enter(eQ(!0, this.prodParam.hasYield));
          let t = [this.parseIdentifier()];
          return (
            this.prodParam.exit(),
            this.hasPrecedingLineBreak() &&
              this.raise(b.LineTerminatorBeforeArrow, this.state.curPosition()),
            this.expect(15),
            this.parseArrowExpression(e, t, !0)
          );
        }
        parseDo(e, t) {
          (this.expectPlugin('doExpressions'),
            t && this.expectPlugin('asyncDoExpressions'),
            (e.async = t),
            this.next());
          let s = this.state.labels;
          return (
            (this.state.labels = []),
            t
              ? (this.prodParam.enter(2),
                (e.body = this.parseBlock()),
                this.prodParam.exit())
              : (e.body = this.parseBlock()),
            (this.state.labels = s),
            this.finishNode(e, 'DoExpression')
          );
        }
        parseSuper() {
          let e = this.startNode();
          return (
            this.next(),
            this.match(6) && !this.scope.allowDirectSuper
              ? this.raise(b.SuperNotAllowed, e)
              : this.scope.allowSuper || this.raise(b.UnexpectedSuper, e),
            this.match(6) ||
              this.match(0) ||
              this.match(12) ||
              this.raise(b.UnsupportedSuper, e),
            this.finishNode(e, 'Super')
          );
        }
        parsePrivateName() {
          let e = this.startNode(),
            t = this.startNodeAt(m(this.state.startLoc, 1)),
            s = this.state.value;
          return (
            this.next(),
            (e.id = this.createIdentifier(t, s)),
            this.finishNode(e, 'PrivateName')
          );
        }
        parseFunctionOrFunctionSent() {
          let e = this.startNode();
          if ((this.next(), this.prodParam.hasYield && this.match(12))) {
            let t = this.createIdentifier(this.startNodeAtNode(e), 'function');
            return (
              this.next(),
              this.match(99)
                ? this.expectPlugin('functionSent')
                : this.hasPlugin('functionSent') || this.unexpected(),
              this.parseMetaProperty(e, t, 'sent')
            );
          }
          return this.parseFunction(e);
        }
        parseMetaProperty(e, t, s) {
          e.meta = t;
          let i = this.state.containsEsc;
          return (
            (e.property = this.parseIdentifier(!0)),
            (e.property.name !== s || i) &&
              this.raise(b.UnsupportedMetaProperty, e.property, {
                target: t.name,
                onlyValidPropertyName: s
              }),
            this.finishNode(e, 'MetaProperty')
          );
        }
        parseImportMetaPropertyOrPhaseCall(e) {
          if ((this.next(), this.isContextual(101) || this.isContextual(93))) {
            let t = this.isContextual(101);
            return (
              this.expectPlugin(
                t ? 'sourcePhaseImports' : 'deferredImportEvaluation'
              ),
              this.next(),
              (e.phase = t ? 'source' : 'defer'),
              this.parseImportCall(e)
            );
          }
          {
            let t = this.createIdentifierAt(
              this.startNodeAtNode(e),
              'import',
              this.state.lastTokStartLoc
            );
            return (
              this.isContextual(97) &&
                (this.inModule || this.raise(b.ImportMetaOutsideModule, t),
                (this.sawUnambiguousESM = !0)),
              this.parseMetaProperty(e, t, 'meta')
            );
          }
        }
        parseLiteralAtNode(e, t, s) {
          return (
            this.addExtra(s, 'rawValue', e),
            this.addExtra(
              s,
              'raw',
              this.input.slice(this.offsetToSourcePos(s.start), this.state.end)
            ),
            (s.value = e),
            this.next(),
            this.finishNode(s, t)
          );
        }
        parseLiteral(e, t) {
          let s = this.startNode();
          return this.parseLiteralAtNode(e, t, s);
        }
        parseStringLiteral(e) {
          return this.parseLiteral(e, 'StringLiteral');
        }
        parseNumericLiteral(e) {
          return this.parseLiteral(e, 'NumericLiteral');
        }
        parseBigIntLiteral(e) {
          let t;
          try {
            t = BigInt(e);
          } catch {
            t = null;
          }
          return this.parseLiteral(t, 'BigIntLiteral');
        }
        parseRegExpLiteral(e) {
          let t = this.startNode();
          return (
            this.addExtra(
              t,
              'raw',
              this.input.slice(this.offsetToSourcePos(t.start), this.state.end)
            ),
            (t.pattern = e.pattern),
            (t.flags = e.flags),
            this.next(),
            this.finishNode(t, 'RegExpLiteral')
          );
        }
        parseBooleanLiteral(e) {
          let t = this.startNode();
          return (
            (t.value = e),
            this.next(),
            this.finishNode(t, 'BooleanLiteral')
          );
        }
        parseNullLiteral() {
          let e = this.startNode();
          return (this.next(), this.finishNode(e, 'NullLiteral'));
        }
        parseParenAndDistinguishExpression(e) {
          let t = this.state.startLoc,
            s;
          (this.next(), this.expressionScope.enter(new eX(1)));
          let i = this.state.startLoc,
            r = [],
            n = new e1(),
            o = !0,
            h,
            p;
          for (; !this.match(7);) {
            if (o) o = !1;
            else if (
              (this.expect(
                8,
                null === n.optionalParametersLoc
                  ? null
                  : n.optionalParametersLoc
              ),
              this.match(7))
            ) {
              p = this.state.startLoc;
              break;
            }
            if (this.match(17)) {
              let e = this.state.startLoc;
              if (
                ((h = this.state.startLoc),
                r.push(this.parseParenItem(this.parseRestBinding(), e)),
                !this.checkCommaAfterRest(41))
              )
                break;
            } else
              r.push(
                this.parseMaybeAssignAllowInOrVoidPattern(
                  7,
                  n,
                  this.parseParenItem
                )
              );
          }
          let l = this.state.lastTokEndLoc;
          this.expect(7);
          let c = this.startNodeAt(t);
          return e && this.shouldParseArrow(r) && (c = this.parseArrow(c))
            ? (this.checkDestructuringPrivate(n),
              this.expressionScope.validateAsPattern(),
              this.expressionScope.exit(),
              this.parseArrowExpression(c, r, !1),
              c)
            : (this.expressionScope.exit(),
              r.length || this.unexpected(this.state.lastTokStartLoc),
              p && this.unexpected(p),
              h && this.unexpected(h),
              this.checkExpressionErrors(n, !0),
              this.toReferencedList(r, !0),
              r.length > 1
                ? (((s = this.startNodeAt(i)).expressions = r),
                  this.finishNode(s, 'SequenceExpression'),
                  this.resetEndLocation(s, l))
                : (s = r[0]),
              this.wrapParenthesis(t, s));
        }
        wrapParenthesis(e, t) {
          if (!(2048 & this.optionFlags))
            return (
              this.addExtra(t, 'parenthesized', !0),
              this.addExtra(t, 'parenStart', e.index),
              this.takeSurroundingComments(
                t,
                e.index,
                this.state.lastTokEndLoc.index
              ),
              t
            );
          let s = this.startNodeAt(e);
          return (
            (s.expression = t),
            this.finishNode(s, 'ParenthesizedExpression')
          );
        }
        shouldParseArrow(e) {
          return !this.canInsertSemicolon();
        }
        parseArrow(e) {
          if (this.eat(15)) return e;
        }
        parseParenItem(e, t) {
          return e;
        }
        parseNewOrNewTarget() {
          let e = this.startNode();
          if ((this.next(), this.match(12))) {
            let t = this.createIdentifier(this.startNodeAtNode(e), 'new');
            this.next();
            let s = this.parseMetaProperty(e, t, 'target');
            return (
              this.scope.allowNewTarget || this.raise(b.UnexpectedNewTarget, s),
              s
            );
          }
          return this.parseNew(e);
        }
        parseNew(e) {
          if ((this.parseNewCallee(e), this.eat(6))) {
            let t = this.parseExprList(7);
            (this.toReferencedList(t), (e.arguments = t));
          } else e.arguments = [];
          return this.finishNode(e, 'NewExpression');
        }
        parseNewCallee(e) {
          let t = this.match(79),
            s = this.parseNoCallExpr();
          ((e.callee = s),
            t &&
              'ImportExpression' === s.type &&
              this.raise(b.ImportCallNotNewExpression, s, s),
            'Import' === s.type && this.raise(b.ImportCallNotNewExpression, s),
            'Super' === s.type && this.raise(b.SuperCallNotNewExpression, s));
        }
        parseTemplateElement(e) {
          let { start: t, startLoc: s, end: i, value: r } = this.state,
            n = this.startNodeAt(m(s, 1));
          null === r &&
            (e ||
              this.raise(
                b.InvalidEscapeSequenceTemplate,
                m(this.state.firstInvalidTemplateEscapePos, 1)
              ));
          let o = this.match(20),
            h = o ? -1 : -2,
            p = i + h;
          ((n.value = {
            raw: this.input.slice(t + 1, p).replace(
              /\r\n?/g,
              `
`
            ),
            cooked: null === r ? null : r.slice(1, h)
          }),
            (n.tail = o),
            this.next());
          let l = this.finishNode(n, 'TemplateElement');
          return (this.resetEndLocation(l, m(this.state.lastTokEndLoc, h)), l);
        }
        parseTemplate(e) {
          let t = this.startNode(),
            s = this.parseTemplateElement(e),
            i = [s],
            r = [];
          for (; !s.tail;)
            (r.push(this.parseTemplateSubstitution()),
              this.readTemplateContinuation(),
              i.push((s = this.parseTemplateElement(e))));
          return (
            (t.expressions = r),
            (t.quasis = i),
            this.finishNode(t, 'TemplateLiteral')
          );
        }
        parseTemplateSubstitution() {
          return this.parseExpression();
        }
        parseObjectLike(e, t, s) {
          let i = !1,
            r = !0,
            n = this.startNode();
          for (n.properties = [], this.next(); !this.match(e);) {
            let o;
            if (r) r = !1;
            else if ((this.expect(8), this.match(e))) {
              this.addTrailingCommaExtraToNode(n);
              break;
            }
            (t
              ? (o = this.parseBindingProperty())
              : ((o = this.parsePropertyDefinition(s)),
                (i = this.checkProto(o, i, s))),
              n.properties.push(o));
          }
          return (
            this.next(),
            this.finishNode(n, t ? 'ObjectPattern' : 'ObjectExpression')
          );
        }
        addTrailingCommaExtraToNode(e) {
          (this.addExtra(e, 'trailingComma', this.state.lastTokStartLoc.index),
            this.addExtra(
              e,
              'trailingCommaLoc',
              this.state.lastTokStartLoc,
              !1
            ));
        }
        maybeAsyncOrAccessorProp(e) {
          return (
            !e.computed &&
            'Identifier' === e.key.type &&
            (this.isLiteralPropertyName() || this.match(0) || this.match(51))
          );
        }
        parsePropertyDefinition(e) {
          let t = [];
          if (this.match(22))
            for (
              this.hasPlugin('decorators') &&
              this.raise(b.UnsupportedPropertyDecorator, this.state.startLoc);
              this.match(22);
            )
              t.push(this.parseDecorator());
          let s = this.startNode(),
            i = !1,
            r = !1,
            n;
          if (this.match(17))
            return (t.length && this.unexpected(), this.parseSpread());
          (t.length && (s.decorators = t),
            (s.method = !1),
            e && (n = this.state.startLoc));
          let o = this.eat(51);
          this.parsePropertyNamePrefixOperator(s);
          let h = this.state.containsEsc;
          if (
            (this.parsePropertyName(s, e),
            !o && !h && this.maybeAsyncOrAccessorProp(s))
          ) {
            let { key: e } = s,
              t = e.name;
            ('async' !== t ||
              this.hasPrecedingLineBreak() ||
              ((i = !0),
              this.resetPreviousNodeTrailingComments(e),
              (o = this.eat(51)),
              this.parsePropertyName(s)),
              ('get' === t || 'set' === t) &&
                ((r = !0),
                this.resetPreviousNodeTrailingComments(e),
                (s.kind = t),
                this.match(51) &&
                  ((o = !0),
                  this.raise(b.AccessorIsGenerator, this.state.curPosition(), {
                    kind: t
                  }),
                  this.next()),
                this.parsePropertyName(s)));
          }
          return this.parseObjPropValue(s, n, o, i, !1, r, e);
        }
        getGetterSetterExpectedParamCount(e) {
          return +('get' !== e.kind);
        }
        getObjectOrClassMethodParams(e) {
          return e.params;
        }
        checkGetterSetterParams(e) {
          let t = this.getGetterSetterExpectedParamCount(e),
            s = this.getObjectOrClassMethodParams(e);
          (s.length !== t &&
            this.raise(
              'get' === e.kind ? b.BadGetterArity : b.BadSetterArity,
              e
            ),
            'set' === e.kind &&
              s[s.length - 1]?.type === 'RestElement' &&
              this.raise(b.BadSetterRestParameter, e));
        }
        parseObjectMethod(e, t, s, i, r) {
          if (r) {
            let s = this.parseMethod(e, t, !1, !1, !1, 'ObjectMethod');
            return (this.checkGetterSetterParams(s), s);
          }
          if (s || t || this.match(6))
            return (
              i && this.unexpected(),
              (e.kind = 'method'),
              (e.method = !0),
              this.parseMethod(e, t, s, !1, !1, 'ObjectMethod')
            );
        }
        parseObjectProperty(e, t, s, i) {
          if (((e.shorthand = !1), this.eat(10)))
            return (
              (e.value = s
                ? this.parseMaybeDefault(this.state.startLoc)
                : this.parseMaybeAssignAllowInOrVoidPattern(4, i)),
              this.finishObjectProperty(e)
            );
          if (!e.computed && 'Identifier' === e.key.type) {
            if ((this.checkReservedWord(e.key.name, e.key.start, !0, !1), s))
              e.value = this.parseMaybeDefault(t, this.cloneIdentifier(e.key));
            else if (this.match(25)) {
              let s = this.state.startLoc;
              (null != i
                ? null === i.shorthandAssignLoc && (i.shorthandAssignLoc = s)
                : this.raise(b.InvalidCoverInitializedName, s),
                (e.value = this.parseMaybeDefault(
                  t,
                  this.cloneIdentifier(e.key)
                )));
            } else e.value = this.cloneIdentifier(e.key);
            return ((e.shorthand = !0), this.finishObjectProperty(e));
          }
        }
        finishObjectProperty(e) {
          return this.finishNode(e, 'ObjectProperty');
        }
        parseObjPropValue(e, t, s, i, r, n, o) {
          let h =
            this.parseObjectMethod(e, s, i, r, n) ||
            this.parseObjectProperty(e, t, r, o);
          return (h || this.unexpected(), h);
        }
        parsePropertyName(e, t) {
          if (this.eat(0))
            ((e.computed = !0),
              (e.key = this.parseMaybeAssignAllowIn()),
              this.expect(1));
          else {
            let { type: s, value: i } = this.state,
              r;
            if (R(s)) r = this.parseIdentifier(!0);
            else
              switch (s) {
                case 131:
                  r = this.parseNumericLiteral(i);
                  break;
                case 130:
                  r = this.parseStringLiteral(i);
                  break;
                case 132:
                  r = this.parseBigIntLiteral(i);
                  break;
                case 134: {
                  let e = this.state.startLoc;
                  (null != t
                    ? null === t.privateKeyLoc && (t.privateKeyLoc = e)
                    : this.raise(b.UnexpectedPrivateField, e),
                    (r = this.parsePrivateName()));
                  break;
                }
                default:
                  this.unexpected();
              }
            ((e.key = r), 134 !== s && (e.computed = !1));
          }
        }
        initFunction(e, t) {
          ((e.id = null), (e.generator = !1), (e.async = t));
        }
        parseMethod(e, t, s, i, r, n, o = !1) {
          (this.initFunction(e, s),
            (e.generator = t),
            this.scope.enter(530 | (576 * !!o) | (32 * !!r)),
            this.prodParam.enter(eQ(s, e.generator)),
            this.parseFunctionParams(e, i));
          let h = this.parseFunctionBodyAndFinish(e, n, !0);
          return (this.prodParam.exit(), this.scope.exit(), h);
        }
        parseArrayLike(e, t) {
          let s = this.startNode();
          return (
            this.next(),
            (s.elements = this.parseExprList(e, !0, t, s)),
            this.finishNode(s, 'ArrayExpression')
          );
        }
        parseArrowExpression(e, t, s, i) {
          this.scope.enter(518);
          let r = eQ(s, !1);
          return (
            this.match(2) || (r |= 24 & this.prodParam.currentFlags()),
            this.prodParam.enter(r),
            this.initFunction(e, s),
            t && this.setArrowFunctionParameters(e, t, i),
            this.parseFunctionBody(e, !0),
            this.prodParam.exit(),
            this.scope.exit(),
            this.finishNode(e, 'ArrowFunctionExpression')
          );
        }
        setArrowFunctionParameters(e, t, s) {
          (this.toAssignableList(t, s, !1), (e.params = t));
        }
        parseFunctionBodyAndFinish(e, t, s = !1) {
          return (this.parseFunctionBody(e, !1, s), this.finishNode(e, t));
        }
        parseFunctionBody(e, t, s = !1) {
          let i = t && !this.match(2);
          if ((this.expressionScope.enter(new eJ()), i))
            ((e.body = this.parseMaybeAssign()),
              this.checkParams(e, !1, t, !1));
          else {
            let i = this.state.strict,
              r = this.state.labels;
            ((this.state.labels = []),
              this.prodParam.enter(4 | this.prodParam.currentFlags()),
              (e.body = this.parseBlock(!0, !1, r => {
                let n = !this.isSimpleParamList(e.params);
                r &&
                  n &&
                  this.raise(
                    b.IllegalLanguageModeDirective,
                    ('method' === e.kind || 'constructor' === e.kind) && e.key
                      ? 256 & this.optionFlags
                        ? e.key.loc.end
                        : e.key
                      : e
                  );
                let o = !i && this.state.strict;
                (this.checkParams(
                  e,
                  !this.state.strict && !t && !s && !n,
                  t,
                  o
                ),
                  this.state.strict &&
                    e.id &&
                    this.checkIdentifier(e.id, 65, o));
              })),
              this.prodParam.exit(),
              (this.state.labels = r));
          }
          this.expressionScope.exit();
        }
        isSimpleParameter(e) {
          return 'Identifier' === e.type;
        }
        isSimpleParamList(e) {
          for (let t = 0, s = e.length; t < s; t++)
            if (!this.isSimpleParameter(e[t])) return !1;
          return !0;
        }
        checkParams(e, t, s, i = !0) {
          let r = !t && new Set(),
            n = { type: 'FormalParameters' };
          for (let t of e.params) this.checkLVal(t, n, 5, r, i);
        }
        parseExprList(e, t, s, i) {
          let r = [],
            n = !0;
          for (; !this.eat(e);) {
            if (n) n = !1;
            else if ((this.expect(8), this.match(e))) {
              (i && this.addTrailingCommaExtraToNode(i), this.next());
              break;
            }
            r.push(this.parseExprListItem(e, t, s));
          }
          return r;
        }
        parseExprListItem(e, t, s, i) {
          let r;
          if (this.match(8))
            (t ||
              this.raise(b.UnexpectedToken, this.state.curPosition(), {
                unexpected: ','
              }),
              (r = null));
          else if (this.match(17)) {
            let e = this.state.startLoc;
            r = this.parseParenItem(this.parseSpread(s), e);
          } else if (this.match(13)) {
            (this.expectPlugin('partialApplication'),
              i ||
                this.raise(
                  b.UnexpectedArgumentPlaceholder,
                  this.state.startLoc
                ));
            let e = this.startNode();
            (this.next(), (r = this.finishNode(e, 'ArgumentPlaceholder')));
          } else
            r = this.parseMaybeAssignAllowInOrVoidPattern(
              e,
              s,
              this.parseParenItem
            );
          return r;
        }
        parseIdentifier(e) {
          let t = this.startNode(),
            s = this.parseIdentifierName(e);
          return this.createIdentifier(t, s);
        }
        createIdentifier(e, t) {
          return (
            (e.name = t),
            256 & this.optionFlags && (e.loc.identifierName = t),
            this.finishNode(e, 'Identifier')
          );
        }
        createIdentifierAt(e, t, s) {
          return (
            (e.name = t),
            256 & this.optionFlags && (e.loc.identifierName = t),
            this.finishNodeAt(e, 'Identifier', s)
          );
        }
        parseIdentifierName(e) {
          let t,
            { start: s, type: i } = this.state;
          R(i) ? (t = this.state.value) : this.unexpected();
          let r = i <= 88;
          return (
            e
              ? r && this.replaceToken(128)
              : this.checkReservedWord(t, this.sourceToOffsetPos(s), r, !1),
            this.next(),
            t
          );
        }
        checkReservedWord(e, t, s, i) {
          if (!(e.length > 10) && en.has(e)) {
            if (s && ee.has(e))
              return void this.raise(b.UnexpectedKeyword, t, { keyword: e });
            if ((this.state.strict ? (i ? ea : er) : ei)(e, this.inModule))
              return void this.raise(b.UnexpectedReservedWord, t, {
                reservedWord: e
              });
            if ('yield' === e) {
              if (this.prodParam.hasYield)
                return void this.raise(b.YieldBindingIdentifier, t);
            } else if ('await' === e) {
              if (this.prodParam.hasAwait)
                return void this.raise(b.AwaitBindingIdentifier, t);
              if (this.scope.inStaticBlock)
                return void this.raise(
                  b.AwaitBindingIdentifierInStaticBlock,
                  t
                );
              this.expressionScope.recordAsyncArrowParametersError(t);
            } else if (
              'arguments' === e &&
              this.scope.inClassAndNotInNonArrowFunction
            )
              return void this.raise(b.ArgumentsInClass, t);
          }
        }
        recordAwaitIfAllowed() {
          let e = this.prodParam.hasAwait;
          return (
            e && !this.scope.inFunction && (this.state.hasTopLevelAwait = !0),
            e
          );
        }
        parseAwait(e, t) {
          let s = e.index;
          this.setLoc(e);
          let i = this.startNodeAt(e);
          return (
            this.expressionScope.recordParameterInitializerError(
              b.AwaitExpressionFormalParameter,
              s
            ),
            this.eat(51) && this.raise(b.ObsoleteAwaitStar, e),
            this.scope.inFunction ||
              1 & this.optionFlags ||
              (this.isAmbiguousPrefixOrIdentifier()
                ? (this.ambiguousScriptDifferentAst = !0)
                : (this.sawUnambiguousESM = !0)),
            t || (i.argument = this.parseMaybeUnary(null, !0)),
            this.finishNode(i, 'AwaitExpression')
          );
        }
        isAmbiguousPrefixOrIdentifier() {
          if (this.hasPrecedingLineBreak()) return !0;
          let { type: e } = this.state;
          return (
            49 === e ||
            6 === e ||
            0 === e ||
            H(e) ||
            (98 === e && !this.state.containsEsc) ||
            133 === e ||
            52 === e ||
            (this.hasPlugin('v8intrinsic') && 50 === e)
          );
        }
        parseYield(e) {
          this.setLoc(e);
          let t = this.startNodeAt(e);
          this.expressionScope.recordParameterInitializerError(
            b.YieldInParameter,
            e.index
          );
          let s = !1,
            i = null;
          if (!this.hasPrecedingLineBreak())
            switch (((s = this.eat(51)), this.state.type)) {
              case 9:
              case 135:
              case 4:
              case 7:
              case 1:
              case 5:
              case 10:
              case 8:
                if (!s) break;
              default:
                i = this.parseMaybeAssign();
            }
          return (
            (t.delegate = s),
            (t.argument = i),
            this.finishNode(t, 'YieldExpression')
          );
        }
        parseImportCall(e) {
          this.next();
          let t = this.parseCallExpressionArguments();
          if (0 === t.length || t.length > 2)
            this.raise(b.ImportCallArity, e, e);
          else
            for (let s of t)
              'SpreadElement' === s.type &&
                this.raise(b.ImportCallSpreadArgument, s, e);
          return (
            (e.source = t[0]),
            (e.options = t[1] ?? null),
            this.finishNode(e, 'ImportExpression')
          );
        }
        withTopicBindingContext(e) {
          let t = this.state.inHackPipelineBody;
          this.state.inHackPipelineBody = !0;
          let s = this.state.seenTopicReference;
          this.state.seenTopicReference = !1;
          try {
            return e();
          } finally {
            ((this.state.inHackPipelineBody = t),
              (this.state.seenTopicReference = s));
          }
        }
        allowInAnd(e) {
          let t = this.prodParam.currentFlags();
          if (24 & ~t) {
            this.prodParam.enter(8 | t | 16);
            try {
              return e();
            } finally {
              this.prodParam.exit();
            }
          }
          return e();
        }
        disallowInAnd(e) {
          let t = this.prodParam.currentFlags();
          if (8 & t || 16 & ~t) {
            this.prodParam.enter((-9 & t) | 16);
            try {
              return e();
            } finally {
              this.prodParam.exit();
            }
          }
          return e();
        }
        registerTopicReference() {
          this.state.seenTopicReference = !0;
        }
        topicReferenceIsAllowedInCurrentContext() {
          return this.state.inHackPipelineBody;
        }
        topicReferenceWasUsedInCurrentContext() {
          return this.state.seenTopicReference;
        }
        parseFSharpPipelineBody(e) {
          let t,
            s = this.state.startLoc;
          if (
            (this.prodParam.enter(-17 & this.prodParam.currentFlags()),
            this.isContextual(92) && this.recordAwaitIfAllowed())
          ) {
            (this.next(), (t = this.parseAwait(s, !0)));
            let e = this.state.type;
            z(e) &&
              35 !== e &&
              (this.prodParam.hasIn || 54 !== e) &&
              this.raise(b.PipelineUnparenthesized, s);
          } else
            ((this.state.canStartArrow = !0),
              (t = this.parseExprOp(this.parseMaybeUnaryOrPrivate(), s, e)));
          return (this.prodParam.exit(), t);
        }
        parseModuleExpression() {
          this.expectPlugin('moduleBlocks');
          let e = this.startNode();
          (this.next(), this.match(2) || this.unexpected(null, 2));
          let t = this.startNodeAt(this.state.endLoc);
          this.next();
          let s = this.initializeScopes(!0);
          this.enterInitialScopes();
          try {
            e.body = this.parseProgram(t, 4, 'module');
          } finally {
            s();
          }
          return this.finishNode(e, 'ModuleExpression');
        }
        parseVoidPattern(e) {
          this.expectPlugin('discardBinding');
          let t = this.startNode();
          return (
            null != e && (e.voidPatternLoc = this.state.startLoc),
            this.next(),
            this.finishNode(t, 'VoidPattern')
          );
        }
        parseMaybeAssignAllowInOrVoidPattern(e, t, s) {
          if (null != t && this.match(84)) {
            let s = this.lookaheadCharCode();
            if (
              44 === s ||
              s === (1 === e ? 93 : 4 === e ? 125 : 41) ||
              61 === s
            )
              return this.parseMaybeDefault(
                this.state.startLoc,
                this.parseVoidPattern(t)
              );
          }
          return this.parseMaybeAssignAllowIn(t, s);
        }
        parsePropertyNamePrefixOperator(e) {}
      },
      e5 = { kind: 1 },
      e9 = { kind: 2 },
      e7 = /[\uD800-\uDFFF]/u,
      te = /in(?:stanceof)?/y;
    function tt(e) {
      for (let t = 0; t < e.length; t++) {
        let s = e[t],
          { type: i } = s;
        'number' == typeof i && (s.type = w[i]);
      }
      return e;
    }
    var ts = class extends e6 {
        parseTopLevel(e, t) {
          return (
            (e.program = this.parseProgram(
              t,
              135,
              'module' === this.options.sourceType ? 'module' : 'script'
            )),
            (e.comments = this.comments),
            512 & this.optionFlags && (e.tokens = tt(this.tokens)),
            this.finishNode(e, 'File')
          );
        }
        parseProgram(e, t, s) {
          if (
            ((e.sourceType = s),
            (e.interpreter = this.parseInterpreterDirective()),
            this.parseBlockBody(e, !0, !0, t),
            this.inModule)
          ) {
            if (
              !(64 & this.optionFlags) &&
              this.scope.undefinedExports.size > 0
            )
              for (let [e, t] of Array.from(this.scope.undefinedExports))
                this.raise(b.ModuleExportUndefined, t, { localName: e });
            this.addExtra(e, 'topLevelAwait', this.state.hasTopLevelAwait);
          }
          return 135 === t
            ? this.finishNode(e, 'Program')
            : this.finishNodeAt(e, 'Program', m(this.state.startLoc, -1));
        }
        stmtToDirective(e) {
          let t = this.castNodeTo(e, 'Directive'),
            s = this.castNodeTo(e.expression, 'DirectiveLiteral'),
            i = s.value,
            r = this.input.slice(
              this.offsetToSourcePos(s.start),
              this.offsetToSourcePos(s.end)
            ),
            n = (s.value = r.slice(1, -1));
          return (
            this.addExtra(s, 'raw', r),
            this.addExtra(s, 'rawValue', n),
            this.addExtra(s, 'expressionValue', i),
            (t.value = s),
            delete e.expression,
            t
          );
        }
        parseInterpreterDirective() {
          if (!this.match(24)) return null;
          let e = this.startNode();
          return (
            (e.value = this.state.value),
            this.next(),
            this.finishNode(e, 'InterpreterDirective')
          );
        }
        isLet() {
          return !!this.isContextual(96) && this.hasFollowingBindingAtom();
        }
        isUsing() {
          return (
            !!this.isContextual(103) && this.nextTokenIsIdentifierOnSameLine()
          );
        }
        isForUsing() {
          if (!this.isContextual(103)) return !1;
          let e = this.nextTokenInLineStart(),
            t = this.codePointAtPos(e);
          if (this.isUnparsedContextual(e, 'of')) {
            let t = this.lookaheadCharCodeSince(e + 2);
            if (61 !== t && 58 !== t && 59 !== t) return !1;
          }
          return !!(
            this.chStartsBindingIdentifier(t, e) ||
            this.isUnparsedContextual(e, 'void')
          );
        }
        nextTokenIsIdentifierOnSameLine() {
          let e = this.nextTokenInLineStart(),
            t = this.codePointAtPos(e);
          return this.chStartsBindingIdentifier(t, e);
        }
        isAwaitUsing() {
          if (!this.isContextual(92)) return !1;
          let e = this.nextTokenInLineStart();
          if (this.isUnparsedContextual(e, 'using')) {
            e = this.nextTokenInLineStartSince(e + 5);
            let t = this.codePointAtPos(e);
            if (this.chStartsBindingIdentifier(t, e)) return !0;
          }
          return !1;
        }
        chStartsBindingIdentifier(e, t) {
          if (!Q(e)) return 92 === e;
          if (((te.lastIndex = t), te.test(this.input))) {
            let e = this.codePointAtPos(te.lastIndex);
            if (!Z(e) && 92 !== e) return !1;
          }
          return !0;
        }
        chStartsBindingPattern(e) {
          return 91 === e || 123 === e;
        }
        hasFollowingBindingAtom() {
          let e = this.nextTokenStart(),
            t = this.codePointAtPos(e);
          return (
            this.chStartsBindingPattern(t) ||
            this.chStartsBindingIdentifier(t, e)
          );
        }
        hasInLineFollowingBindingIdentifierOrBrace() {
          let e = this.nextTokenInLineStart(),
            t = this.codePointAtPos(e);
          return 123 === t || this.chStartsBindingIdentifier(t, e);
        }
        allowsUsing() {
          return (
            (this.scope.inModule || !this.scope.inTopLevel) &&
            !this.scope.inBareCaseStatement
          );
        }
        parseModuleItem() {
          return this.parseStatementLike(15);
        }
        parseStatementListItem() {
          return this.parseStatementLike(
            6 | (!this.options.annexB || this.state.strict ? 0 : 8)
          );
        }
        parseStatementOrSloppyAnnexBFunctionDeclaration(e = !1) {
          let t = 0;
          return (
            this.options.annexB &&
              !this.state.strict &&
              ((t |= 4), e && (t |= 8)),
            this.parseStatementLike(t)
          );
        }
        parseStatement() {
          return this.parseStatementLike(0);
        }
        parseStatementLike(e) {
          let t = null;
          return (
            this.match(22) && (t = this.parseDecorators(!0)),
            this.parseStatementContent(e, t)
          );
        }
        parseStatementContent(e, t) {
          let s = this.state.type,
            i = this.startNode(),
            r = !!(2 & e),
            n = !!(4 & e),
            o = 1 & e;
          switch (s) {
            case 56:
              return this.parseBreakContinueStatement(i, !0);
            case 59:
              return this.parseBreakContinueStatement(i, !1);
            case 60:
              return this.parseDebuggerStatement(i);
            case 86:
              return this.parseDoWhileStatement(i);
            case 87:
              return this.parseForStatement(i);
            case 64:
              if (46 === this.lookaheadCharCode()) break;
              return (
                n ||
                  this.raise(
                    this.state.strict
                      ? b.StrictFunction
                      : this.options.annexB
                        ? b.SloppyFunctionAnnexB
                        : b.SloppyFunction,
                    this.state.startLoc
                  ),
                this.parseFunctionStatement(i, !1, !r && n)
              );
            case 76:
              return (
                r || this.unexpected(),
                this.parseClass(this.maybeTakeDecorators(t, i), !0)
              );
            case 65:
              return this.parseIfStatement(i);
            case 66:
              return this.parseReturnStatement(i);
            case 67:
              return this.parseSwitchStatement(i);
            case 68:
              return this.parseThrowStatement(i);
            case 69:
              return this.parseTryStatement(i);
            case 92:
              if (this.isAwaitUsing())
                return (
                  this.allowsUsing()
                    ? r
                      ? this.recordAwaitIfAllowed() ||
                        this.raise(b.AwaitUsingNotInAsyncContext, i)
                      : this.raise(b.UnexpectedLexicalDeclaration, i)
                    : this.raise(b.UnexpectedUsingDeclaration, i),
                  this.next(),
                  this.parseVarStatement(i, 'await using')
                );
              break;
            case 103:
              if (
                this.state.containsEsc ||
                !this.hasInLineFollowingBindingIdentifierOrBrace()
              )
                break;
              return (
                this.allowsUsing()
                  ? r ||
                    this.raise(
                      b.UnexpectedLexicalDeclaration,
                      this.state.startLoc
                    )
                  : this.raise(
                      b.UnexpectedUsingDeclaration,
                      this.state.startLoc
                    ),
                this.parseVarStatement(i, 'using')
              );
            case 96: {
              if (this.state.containsEsc) break;
              let e = this.nextTokenStart(),
                t = this.codePointAtPos(e);
              if (
                91 !== t &&
                ((!r && this.hasFollowingLineBreak()) ||
                  (!this.chStartsBindingIdentifier(t, e) && 123 !== t))
              )
                break;
            }
            case 71:
              r ||
                this.raise(b.UnexpectedLexicalDeclaration, this.state.startLoc);
            case 70: {
              let e = this.state.value;
              return this.parseVarStatement(i, e);
            }
            case 88:
              return this.parseWhileStatement(i);
            case 72:
              return this.parseWithStatement(i);
            case 2:
              return this.parseBlock();
            case 9:
              return this.parseEmptyStatement(i);
            case 79: {
              let e = this.lookaheadCharCode();
              if (40 === e || 46 === e) break;
            }
            case 78: {
              let e;
              return (
                8 & this.optionFlags ||
                  o ||
                  this.raise(b.UnexpectedImportExport, this.state.startLoc),
                this.next(),
                (e = 79 === s ? this.parseImport(i) : this.parseExport(i, t)),
                this.assertModuleNodeAllowed(e),
                e
              );
            }
            default:
              if (this.isAsyncFunction())
                return (
                  r ||
                    this.raise(
                      b.AsyncFunctionInSingleStatementContext,
                      this.state.startLoc
                    ),
                  this.next(),
                  this.parseFunctionStatement(i, !0, !r && n)
                );
          }
          let h = this.state.value,
            p = this.parseExpression();
          return U(s) && 'Identifier' === p.type && this.eat(10)
            ? this.parseLabeledStatement(i, h, p, e)
            : this.parseExpressionStatement(i, p, t);
        }
        assertModuleNodeAllowed(e) {
          8 & this.optionFlags ||
            this.inModule ||
            this.raise(b.ImportOutsideModule, e);
        }
        maybeTakeDecorators(e, t, s) {
          return (
            e &&
              (t.decorators?.length
                ? (this.raise(b.DecoratorsBeforeAfterExport, t.decorators[0]),
                  t.decorators.unshift(...e))
                : (t.decorators = e),
              this.resetStartLocationFromNode(t, e[0]),
              s && this.resetStartLocationFromNode(s, t)),
            t
          );
        }
        canHaveLeadingDecorator() {
          return this.match(76);
        }
        parseDecorators(e) {
          let t = [];
          do t.push(this.parseDecorator());
          while (this.match(22));
          if (this.match(78)) e || this.unexpected();
          else if (!this.canHaveLeadingDecorator())
            throw this.raise(b.UnexpectedLeadingDecorator, this.state.startLoc);
          return t;
        }
        parseDecorator() {
          this.expectOnePlugin(['decorators', 'decorators-legacy']);
          let e = this.startNode();
          if ((this.next(), this.hasPlugin('decorators'))) {
            let t = this.state.startLoc,
              s;
            if (this.match(6)) {
              let t = this.state.startLoc;
              (this.next(),
                (s = this.parseExpression()),
                this.expect(7),
                (s = this.wrapParenthesis(t, s)));
              let i = this.state.startLoc;
              ((e.expression = this.parseMaybeDecoratorArguments(s, t)),
                e.expression !== s &&
                  this.raise(b.DecoratorArgumentsOutsideParentheses, i));
            } else {
              for (s = this.parseIdentifier(!1); this.eat(12);) {
                let e = this.startNodeAt(t);
                ((e.object = s),
                  this.match(134)
                    ? (this.classScope.usePrivateName(
                        this.state.value,
                        this.state.startLoc
                      ),
                      (e.property = this.parsePrivateName()))
                    : (e.property = this.parseIdentifier(!0)),
                  (e.computed = !1),
                  (s = this.finishNode(e, 'MemberExpression')));
              }
              e.expression = this.parseMaybeDecoratorArguments(s, t);
            }
          } else
            ((this.state.canStartArrow = !1),
              (e.expression = this.parseExprSubscripts()));
          return this.finishNode(e, 'Decorator');
        }
        parseMaybeDecoratorArguments(e, t) {
          if (this.eat(6)) {
            let s = this.startNodeAt(t);
            return (
              (s.callee = e),
              (s.arguments = this.parseCallExpressionArguments()),
              this.toReferencedList(s.arguments),
              this.finishNode(s, 'CallExpression')
            );
          }
          return e;
        }
        parseBreakContinueStatement(e, t) {
          return (
            this.next(),
            this.isLineTerminator()
              ? (e.label = null)
              : ((e.label = this.parseIdentifier()), this.semicolon()),
            this.verifyBreakContinue(e, t),
            this.finishNode(e, t ? 'BreakStatement' : 'ContinueStatement')
          );
        }
        verifyBreakContinue(e, t) {
          let s;
          for (s = 0; s < this.state.labels.length; ++s) {
            let i = this.state.labels[s];
            if (
              (null == e.label || i.name === e.label.name) &&
              ((null != i.kind && (t || 1 === i.kind)) || (e.label && t))
            )
              break;
          }
          s === this.state.labels.length &&
            this.raise(b.IllegalBreakContinue, e, {
              type: t ? 'BreakStatement' : 'ContinueStatement'
            });
        }
        parseDebuggerStatement(e) {
          return (
            this.next(),
            this.semicolon(),
            this.finishNode(e, 'DebuggerStatement')
          );
        }
        parseHeaderExpression() {
          this.expect(6);
          let e = this.parseExpression();
          return (this.expect(7), e);
        }
        parseDoWhileStatement(e) {
          return (
            this.next(),
            this.state.labels.push(e5),
            (e.body = this.parseStatement()),
            this.state.labels.pop(),
            this.expect(88),
            (e.test = this.parseHeaderExpression()),
            this.eat(9),
            this.finishNode(e, 'DoWhileStatement')
          );
        }
        parseForStatement(e) {
          (this.next(), this.state.labels.push(e5));
          let t = null;
          if (
            (this.isContextual(92) &&
              this.recordAwaitIfAllowed() &&
              ((t = this.state.startLoc), this.next()),
            this.scope.enter(0),
            this.expect(6),
            this.match(9))
          )
            return (null !== t && this.unexpected(t), this.parseFor(e, null));
          let s = this.isContextual(96);
          {
            let i = this.isAwaitUsing(),
              r = i || this.isForUsing(),
              n = (s && this.hasFollowingBindingAtom()) || r;
            if (this.match(70) || this.match(71) || n) {
              let s = this.startNode(),
                n;
              (i
                ? ((n = 'await using'),
                  this.recordAwaitIfAllowed() ||
                    this.raise(
                      b.AwaitUsingNotInAsyncContext,
                      this.state.startLoc
                    ),
                  this.next())
                : (n = this.state.value),
                this.next(),
                this.parseVar(s, !0, n));
              let o = this.finishNode(s, 'VariableDeclaration'),
                h = this.match(54);
              return (
                h && r && this.raise(b.ForInUsing, o),
                (h || this.isContextual(98)) && 1 === o.declarations.length
                  ? this.parseForIn(e, o, t)
                  : (null !== t && this.unexpected(t), this.parseFor(e, o))
              );
            }
          }
          let i = this.isContextual(91),
            r = new e1(),
            n = this.parseExpression(!0, r),
            o = this.isContextual(98);
          return (o &&
            (s && this.raise(b.ForOfLet, n),
            null === t &&
              i &&
              'Identifier' === n.type &&
              this.raise(b.ForOfAsync, n)),
          o || this.match(54))
            ? (this.checkDestructuringPrivate(r),
              this.toAssignable(n, !0),
              this.checkLVal(n, {
                type: o ? 'ForOfStatement' : 'ForInStatement'
              }),
              this.parseForIn(e, n, t))
            : (this.checkExpressionErrors(r, !0),
              null !== t && this.unexpected(t),
              this.parseFor(e, n));
        }
        parseFunctionStatement(e, t, s) {
          return (
            this.next(),
            this.parseFunction(e, 1 | (2 * !!s) | (8 * !!t))
          );
        }
        parseIfStatement(e) {
          return (
            this.next(),
            (e.test = this.parseHeaderExpression()),
            (e.consequent =
              this.parseStatementOrSloppyAnnexBFunctionDeclaration()),
            (e.alternate = this.eat(62)
              ? this.parseStatementOrSloppyAnnexBFunctionDeclaration()
              : null),
            this.finishNode(e, 'IfStatement')
          );
        }
        parseReturnStatement(e) {
          return (
            this.prodParam.hasReturn ||
              this.raise(b.IllegalReturn, this.state.startLoc),
            this.next(),
            this.isLineTerminator()
              ? (e.argument = null)
              : ((e.argument = this.parseExpression()), this.semicolon()),
            this.finishNode(e, 'ReturnStatement')
          );
        }
        parseSwitchStatement(e) {
          let t, s;
          (this.next(), (e.discriminant = this.parseHeaderExpression()));
          let i = (e.cases = []);
          for (
            this.expect(2), this.state.labels.push(e9), this.scope.enter(256);
            !this.match(4);
          )
            if (this.match(57) || this.match(61)) {
              let e = this.match(57);
              (t && this.finishNode(t, 'SwitchCase'),
                i.push((t = this.startNode())),
                (t.consequent = []),
                this.next(),
                e
                  ? (t.test = this.parseExpression())
                  : (s &&
                      this.raise(
                        b.MultipleDefaultsInSwitch,
                        this.state.lastTokStartLoc
                      ),
                    (s = !0),
                    (t.test = null)),
                this.expect(10));
            } else
              t
                ? t.consequent.push(this.parseStatementListItem())
                : this.unexpected();
          return (
            this.scope.exit(),
            t && this.finishNode(t, 'SwitchCase'),
            this.next(),
            this.state.labels.pop(),
            this.finishNode(e, 'SwitchStatement')
          );
        }
        parseThrowStatement(e) {
          return (
            this.next(),
            this.hasPrecedingLineBreak() &&
              this.raise(b.NewlineAfterThrow, this.state.lastTokEndLoc),
            (e.argument = this.parseExpression()),
            this.semicolon(),
            this.finishNode(e, 'ThrowStatement')
          );
        }
        parseCatchClauseParam() {
          let e = this.parseBindingAtom();
          return (
            this.scope.enter(
              this.options.annexB && 'Identifier' === e.type ? 8 : 0
            ),
            this.checkLVal(e, { type: 'CatchClause' }, 9),
            e
          );
        }
        parseTryStatement(e) {
          if (
            (this.next(),
            (e.block = this.parseBlock()),
            (e.handler = null),
            this.match(58))
          ) {
            let t = this.startNode();
            (this.next(),
              this.match(6)
                ? (this.expect(6),
                  (t.param = this.parseCatchClauseParam()),
                  this.expect(7))
                : ((t.param = null), this.scope.enter(0)),
              (t.body = this.parseBlock(!1, !1)),
              this.scope.exit(),
              (e.handler = this.finishNode(t, 'CatchClause')));
          }
          return (
            (e.finalizer = this.eat(63) ? this.parseBlock() : null),
            e.handler || e.finalizer || this.raise(b.NoCatchOrFinally, e),
            this.finishNode(e, 'TryStatement')
          );
        }
        parseVarStatement(e, t, s = !1) {
          return (
            this.next(),
            this.parseVar(e, !1, t, s),
            this.semicolon(),
            this.finishNode(e, 'VariableDeclaration')
          );
        }
        parseWhileStatement(e) {
          return (
            this.next(),
            (e.test = this.parseHeaderExpression()),
            this.state.labels.push(e5),
            (e.body = this.parseStatement()),
            this.state.labels.pop(),
            this.finishNode(e, 'WhileStatement')
          );
        }
        parseWithStatement(e) {
          return (
            this.state.strict && this.raise(b.StrictWith, this.state.startLoc),
            this.next(),
            (e.object = this.parseHeaderExpression()),
            (e.body = this.parseStatement()),
            this.finishNode(e, 'WithStatement')
          );
        }
        parseEmptyStatement(e) {
          return (this.next(), this.finishNode(e, 'EmptyStatement'));
        }
        parseLabeledStatement(e, t, s, i) {
          var r;
          for (let e of this.state.labels)
            e.name === t &&
              this.raise(b.LabelRedeclaration, s, { labelName: t });
          let n =
            (r = this.state.type) >= 86 && r <= 88
              ? 1
              : this.match(67)
                ? 2
                : null;
          for (let t = this.state.labels.length - 1; t >= 0; t--) {
            let s = this.state.labels[t];
            if (s.statementStart === e.start)
              ((s.statementStart = this.sourceToOffsetPos(this.state.start)),
                (s.kind = n));
            else break;
          }
          return (
            this.state.labels.push({
              name: t,
              kind: n,
              statementStart: this.sourceToOffsetPos(this.state.start)
            }),
            (e.body =
              8 & i
                ? this.parseStatementOrSloppyAnnexBFunctionDeclaration(!0)
                : this.parseStatement()),
            this.state.labels.pop(),
            (e.label = s),
            this.finishNode(e, 'LabeledStatement')
          );
        }
        parseExpressionStatement(e, t, s) {
          return (
            (e.expression = t),
            this.semicolon(),
            this.finishNode(e, 'ExpressionStatement')
          );
        }
        parseBlock(e = !1, t = !0, s) {
          let i = this.startNode();
          return (
            e && this.state.strictErrors.clear(),
            this.expect(2),
            t && this.scope.enter(0),
            this.parseBlockBody(i, e, !1, 4, s),
            t && this.scope.exit(),
            this.finishNode(i, 'BlockStatement')
          );
        }
        isValidDirective(e) {
          return (
            'ExpressionStatement' === e.type &&
            'StringLiteral' === e.expression.type &&
            !e.expression.extra.parenthesized
          );
        }
        parseBlockBody(e, t, s, i, r) {
          let n = (e.body = []),
            o = (e.directives = []);
          this.parseBlockOrModuleBlockBody(n, t ? o : void 0, s, i, r);
        }
        parseBlockOrModuleBlockBody(e, t, s, i, r) {
          let n = this.state.strict,
            o = !1,
            h = !1;
          for (; !this.match(i);) {
            let i = s ? this.parseModuleItem() : this.parseStatementListItem();
            if (t && !h) {
              if (this.isValidDirective(i)) {
                let e = this.stmtToDirective(i);
                (t.push(e),
                  o ||
                    'use strict' !== e.value.value ||
                    ((o = !0), this.setStrict(!0)));
                continue;
              }
              ((h = !0), this.state.strictErrors.clear());
            }
            e.push(i);
          }
          (r?.call(this, o), n || this.setStrict(!1), this.next());
        }
        parseFor(e, t) {
          return (
            (e.init = t),
            this.semicolon(!1),
            (e.test = this.match(9) ? null : this.parseExpression()),
            this.semicolon(!1),
            (e.update = this.match(7) ? null : this.parseExpression()),
            this.expect(7),
            (e.body = this.parseStatement()),
            this.scope.exit(),
            this.state.labels.pop(),
            this.finishNode(e, 'ForStatement')
          );
        }
        parseForIn(e, t, s) {
          let i = this.match(54);
          return (
            this.next(),
            i ? null !== s && this.unexpected(s) : (e.await = null !== s),
            'VariableDeclaration' !== t.type ||
              null == t.declarations[0].init ||
              (i &&
                this.options.annexB &&
                !this.state.strict &&
                'var' === t.kind &&
                'Identifier' === t.declarations[0].id.type) ||
              this.raise(b.ForInOfLoopInitializer, t, {
                type: i ? 'ForInStatement' : 'ForOfStatement'
              }),
            'AssignmentPattern' === t.type &&
              this.raise(b.InvalidLhs, t, {
                ancestor: { type: 'ForStatement' }
              }),
            (e.left = t),
            (e.right = i
              ? this.parseExpression()
              : this.parseMaybeAssignAllowIn()),
            this.expect(7),
            (e.body = this.parseStatement()),
            this.scope.exit(),
            this.state.labels.pop(),
            this.finishNode(e, i ? 'ForInStatement' : 'ForOfStatement')
          );
        }
        parseVar(e, t, s, i = !1) {
          let r = (e.declarations = []);
          for (e.kind = s; ;) {
            let e = this.startNode();
            if (
              (this.parseVarId(e, s),
              (e.init = this.eat(25)
                ? t
                  ? this.parseMaybeAssignDisallowIn()
                  : this.parseMaybeAssignAllowIn()
                : null),
              null === e.init &&
                !i &&
                ('Identifier' === e.id.type ||
                (t && (this.match(54) || this.isContextual(98)))
                  ? ('const' !== s && 'using' !== s && 'await using' !== s) ||
                    this.match(54) ||
                    this.isContextual(98) ||
                    this.raise(
                      b.DeclarationMissingInitializer,
                      this.state.lastTokEndLoc,
                      { kind: s }
                    )
                  : this.raise(
                      b.DeclarationMissingInitializer,
                      this.state.lastTokEndLoc,
                      { kind: 'destructuring' }
                    )),
              r.push(this.finishNode(e, 'VariableDeclarator')),
              !this.eat(8))
            )
              break;
          }
          return e;
        }
        parseVarId(e, t) {
          let s = this.parseBindingAtom();
          ('using' === t || 'await using' === t
            ? ('ArrayPattern' === s.type || 'ObjectPattern' === s.type) &&
              this.raise(b.UsingDeclarationHasBindingPattern, s)
            : 'VoidPattern' === s.type &&
              this.raise(b.UnexpectedVoidPattern, s),
            this.checkLVal(
              s,
              { type: 'VariableDeclarator' },
              'var' === t ? 5 : 8201
            ),
            (e.id = s));
        }
        parseAsyncFunctionExpression(e) {
          return this.parseFunction(e, 8);
        }
        parseFunction(e, t = 0) {
          let s = 2 & t,
            i = !!(1 & t),
            r = !!(8 & t);
          return (
            this.initFunction(e, r),
            this.match(51) &&
              (s &&
                this.raise(
                  b.GeneratorInSingleStatementContext,
                  this.state.startLoc
                ),
              this.next(),
              (e.generator = !0)),
            i && (e.id = this.parseFunctionId(i && !(4 & t))),
            this.scope.enter(514),
            this.prodParam.enter(eQ(r, e.generator)),
            i || (e.id = this.parseFunctionId()),
            this.parseFunctionParams(e, !1),
            this.parseFunctionBodyAndFinish(
              e,
              i ? 'FunctionDeclaration' : 'FunctionExpression'
            ),
            this.prodParam.exit(),
            this.scope.exit(),
            i && !s && this.registerFunctionStatementId(e),
            e
          );
        }
        parseFunctionId(e) {
          return e || U(this.state.type) ? this.parseIdentifier() : null;
        }
        parseFunctionParams(e, t) {
          (this.expect(6),
            this.expressionScope.enter(new eJ(3)),
            (e.params = this.parseBindingList(7, 41, 2 | (4 * !!t))),
            this.expressionScope.exit());
        }
        registerFunctionStatementId(e) {
          e.id &&
            this.scope.declareName(
              e.id.name,
              !this.options.annexB ||
                this.state.strict ||
                e.generator ||
                e.async
                ? this.scope.treatFunctionsAsVar
                  ? 5
                  : 8201
                : 17,
              e.id.start
            );
        }
        parseClass(e, t, s) {
          this.next();
          let i = this.state.strict;
          return (
            (this.state.strict = !0),
            this.parseClassId(e, t, s),
            this.parseClassSuper(e),
            (e.body = this.parseClassBody(!!e.superClass, i)),
            this.finishNode(e, t ? 'ClassDeclaration' : 'ClassExpression')
          );
        }
        isClassProperty() {
          return this.match(25) || this.match(9) || this.match(4);
        }
        isClassMethod() {
          return this.match(6);
        }
        nameIsConstructor(e) {
          return (
            ('Identifier' === e.type && 'constructor' === e.name) ||
            ('StringLiteral' === e.type && 'constructor' === e.value)
          );
        }
        isNonstaticConstructor(e) {
          return !e.computed && !e.static && this.nameIsConstructor(e.key);
        }
        parseClassBody(e, t) {
          this.classScope.enter();
          let s = { hadConstructor: !1, hadSuperClass: e },
            i = [],
            r = this.startNode();
          for (r.body = [], this.expect(2); !this.match(4);) {
            if (this.eat(9)) {
              if (i.length > 0)
                throw this.raise(
                  b.DecoratorSemicolon,
                  this.state.lastTokEndLoc
                );
              continue;
            }
            if (this.match(22)) {
              i.push(this.parseDecorator());
              continue;
            }
            let e = this.startNode();
            (i.length &&
              ((e.decorators = i),
              this.resetStartLocationFromNode(e, i[0]),
              (i = [])),
              this.parseClassMember(r, e, s));
          }
          if (((this.state.strict = t), this.next(), i.length))
            throw this.raise(b.TrailingDecorator, this.state.startLoc);
          return (this.classScope.exit(), this.finishNode(r, 'ClassBody'));
        }
        parseClassMemberFromModifier(e, t) {
          let s = this.parseIdentifier(!0);
          return this.isClassMethod()
            ? ((t.kind = 'method'),
              (t.computed = !1),
              (t.key = s),
              (t.static = !1),
              this.pushClassMethod(e, t, !1, !1, !1, !1),
              !0)
            : this.isClassProperty()
              ? ((t.computed = !1),
                (t.key = s),
                (t.static = !1),
                e.body.push(this.parseClassProperty(t)),
                !0)
              : (this.resetPreviousNodeTrailingComments(s), !1);
        }
        parseClassMember(e, t, s) {
          let i = this.isContextual(102);
          if (i) {
            if (this.parseClassMemberFromModifier(e, t)) return;
            if (this.eat(2)) return void this.parseClassStaticBlock(e, t);
          }
          this.parseClassMemberWithIsStatic(e, t, s, i);
        }
        parseClassMemberWithIsStatic(e, t, s, i) {
          if (
            ((t.static = i),
            this.parsePropertyNamePrefixOperator(t),
            this.eat(51))
          ) {
            t.kind = 'method';
            let s = this.match(134);
            return (this.parseClassElementName(t),
            this.parsePostMemberNameModifiers(t),
            s)
              ? void this.pushClassPrivateMethod(e, t, !0, !1)
              : (this.isNonstaticConstructor(t) &&
                  this.raise(b.ConstructorIsGenerator, t.key),
                void this.pushClassMethod(e, t, !0, !1, !1, !1));
          }
          let r = !this.state.containsEsc && U(this.state.type),
            n = this.parseClassElementName(t),
            o = r ? n.name : null,
            h = this.isPrivateName(n),
            p = this.state.startLoc;
          if ((this.parsePostMemberNameModifiers(t), this.isClassMethod())) {
            if (((t.kind = 'method'), h))
              return void this.pushClassPrivateMethod(e, t, !1, !1);
            let i = this.isNonstaticConstructor(t),
              r = !1;
            (i &&
              ((t.kind = 'constructor'),
              t.decorators &&
                t.decorators.length > 0 &&
                this.raise(b.DecoratorConstructor, t),
              s.hadConstructor &&
                !this.hasPlugin('typescript') &&
                this.raise(b.DuplicateConstructor, n),
              i &&
                this.hasPlugin('typescript') &&
                t.override &&
                this.raise(b.OverrideOnConstructor, n),
              (s.hadConstructor = !0),
              (r = s.hadSuperClass)),
              this.pushClassMethod(e, t, !1, !1, i, r));
          } else if (this.isClassProperty())
            h
              ? this.pushClassPrivateProperty(e, t)
              : this.pushClassProperty(e, t);
          else if ('async' !== o || this.isLineTerminator())
            if (
              ('get' !== o && 'set' !== o) ||
              (this.match(51) && this.isLineTerminator())
            )
              if ('accessor' !== o || this.isLineTerminator())
                this.isLineTerminator()
                  ? h
                    ? this.pushClassPrivateProperty(e, t)
                    : this.pushClassProperty(e, t)
                  : this.unexpected();
              else {
                (this.expectPlugin('decoratorAutoAccessors'),
                  this.resetPreviousNodeTrailingComments(n));
                let s = this.match(134);
                (this.parseClassElementName(t),
                  this.pushClassAccessorProperty(e, t, s));
              }
            else {
              (this.resetPreviousNodeTrailingComments(n), (t.kind = o));
              let s = this.match(134);
              (this.parseClassElementName(t),
                s
                  ? this.pushClassPrivateMethod(e, t, !1, !1)
                  : (this.isNonstaticConstructor(t) &&
                      this.raise(b.ConstructorIsAccessor, t.key),
                    this.pushClassMethod(e, t, !1, !1, !1, !1)),
                this.checkGetterSetterParams(t));
            }
          else {
            this.resetPreviousNodeTrailingComments(n);
            let s = this.eat(51);
            (t.optional && this.unexpected(p), (t.kind = 'method'));
            let i = this.match(134);
            (this.parseClassElementName(t),
              this.parsePostMemberNameModifiers(t),
              i
                ? this.pushClassPrivateMethod(e, t, s, !0)
                : (this.isNonstaticConstructor(t) &&
                    this.raise(b.ConstructorIsAsync, t.key),
                  this.pushClassMethod(e, t, s, !0, !1, !1)));
          }
        }
        parseClassElementName(e) {
          let { type: t, value: s } = this.state;
          if (
            ((128 === t || 130 === t) &&
              e.static &&
              'prototype' === s &&
              this.raise(b.StaticPrototype, this.state.startLoc),
            134 === t)
          ) {
            'constructor' === s &&
              this.raise(b.ConstructorClassPrivateField, this.state.startLoc);
            let t = this.parsePrivateName();
            return ((e.key = t), t);
          }
          return (this.parsePropertyName(e), e.key);
        }
        parseClassStaticBlock(e, t) {
          this.scope.enter(720);
          let s = this.state.labels;
          ((this.state.labels = []), this.prodParam.enter(0));
          let i = (t.body = []);
          (this.parseBlockOrModuleBlockBody(i, void 0, !1, 4),
            this.prodParam.exit(),
            this.scope.exit(),
            (this.state.labels = s),
            e.body.push(this.finishNode(t, 'StaticBlock')),
            t.decorators?.length && this.raise(b.DecoratorStaticBlock, t));
        }
        pushClassProperty(e, t) {
          (!t.computed &&
            this.nameIsConstructor(t.key) &&
            this.raise(b.ConstructorClassField, t.key),
            e.body.push(this.parseClassProperty(t)));
        }
        pushClassPrivateProperty(e, t) {
          let s = this.parseClassPrivateProperty(t);
          (e.body.push(s),
            this.classScope.declarePrivateName(
              this.getPrivateNameSV(s.key),
              0,
              s.key.start
            ));
        }
        pushClassAccessorProperty(e, t, s) {
          !s &&
            !t.computed &&
            this.nameIsConstructor(t.key) &&
            this.raise(b.ConstructorClassField, t.key);
          let i = this.parseClassAccessorProperty(t);
          (e.body.push(i),
            s &&
              this.classScope.declarePrivateName(
                this.getPrivateNameSV(i.key),
                0,
                i.key.start
              ));
        }
        pushClassMethod(e, t, s, i, r, n) {
          e.body.push(this.parseMethod(t, s, i, r, n, 'ClassMethod', !0));
        }
        pushClassPrivateMethod(e, t, s, i) {
          let r = this.parseMethod(t, s, i, !1, !1, 'ClassPrivateMethod', !0);
          e.body.push(r);
          let n =
            'get' === r.kind
              ? r.static
                ? 6
                : 2
              : 'set' === r.kind
                ? r.static
                  ? 5
                  : 1
                : 0;
          this.declareClassPrivateMethodInScope(r, n);
        }
        declareClassPrivateMethodInScope(e, t) {
          this.classScope.declarePrivateName(
            this.getPrivateNameSV(e.key),
            t,
            e.key.start
          );
        }
        parsePostMemberNameModifiers(e) {}
        parseClassPrivateProperty(e) {
          return (
            this.parseInitializer(e),
            this.semicolon(),
            this.finishNode(e, 'ClassPrivateProperty')
          );
        }
        parseClassProperty(e) {
          return (
            this.parseInitializer(e),
            this.semicolon(),
            this.finishNode(e, 'ClassProperty')
          );
        }
        parseClassAccessorProperty(e) {
          return (
            this.parseInitializer(e),
            this.semicolon(),
            this.finishNode(e, 'ClassAccessorProperty')
          );
        }
        parseInitializer(e) {
          (this.scope.enter(592),
            this.expressionScope.enter(new eJ()),
            this.prodParam.enter(0),
            (e.value = this.eat(25) ? this.parseMaybeAssignAllowIn() : null),
            this.expressionScope.exit(),
            this.prodParam.exit(),
            this.scope.exit());
        }
        parseClassId(e, t, s, i = 8331) {
          if (U(this.state.type))
            ((e.id = this.parseIdentifier()),
              t && this.declareNameFromIdentifier(e.id, i));
          else if (s || !t) e.id = null;
          else throw this.raise(b.MissingClassName, this.state.startLoc);
        }
        parseClassSuper(e) {
          this.eat(77)
            ? ((this.state.canStartArrow = !1),
              (e.superClass = this.parseExprSubscripts()))
            : (e.superClass = null);
        }
        parseExport(e, t) {
          let s,
            i = this.parseMaybeImportPhase(e, !0),
            r = this.maybeParseExportDefaultSpecifier(e, i),
            n = !r || this.eat(8),
            o = n && this.eatExportStar(e),
            h = o && this.maybeParseExportNamespaceSpecifier(e),
            p = n && (!h || this.eat(8)),
            l = r || o;
          if (o && !h) {
            if ((r && this.unexpected(), t))
              throw this.raise(b.UnsupportedDecoratorExport, e);
            return (
              this.parseExportFrom(e, !0),
              (this.sawUnambiguousESM = !0),
              this.finishNode(e, 'ExportAllDeclaration')
            );
          }
          let c = this.maybeParseExportNamedSpecifiers(e);
          if (
            (r && n && !o && !c && this.unexpected(null, 2),
            h && p && this.unexpected(null, 94),
            l || c)
          ) {
            if (((s = !1), t))
              throw this.raise(b.UnsupportedDecoratorExport, e);
            this.parseExportFrom(e, l);
          } else s = this.maybeParseExportDeclaration(e);
          if (l || c || s) {
            if (
              (this.checkExport(e, !0, !1, !!e.source),
              e.declaration?.type === 'ClassDeclaration')
            )
              this.maybeTakeDecorators(t, e.declaration, e);
            else if (t) throw this.raise(b.UnsupportedDecoratorExport, e);
            return (
              (this.sawUnambiguousESM = !0),
              this.finishNode(e, 'ExportNamedDeclaration')
            );
          }
          if (this.eat(61)) {
            let s = this.parseExportDefaultExpression();
            if (((e.declaration = s), 'ClassDeclaration' === s.type))
              this.maybeTakeDecorators(t, s, e);
            else if (t) throw this.raise(b.UnsupportedDecoratorExport, e);
            return (
              this.checkExport(e, !0, !0),
              (this.sawUnambiguousESM = !0),
              this.finishNode(e, 'ExportDefaultDeclaration')
            );
          }
          throw this.unexpected(null, 2);
        }
        eatExportStar(e) {
          return this.eat(51);
        }
        maybeParseExportDefaultSpecifier(e, t) {
          if (t || this.isExportDefaultSpecifier()) {
            this.expectPlugin('exportDefaultFrom', t?.start);
            let s = t || this.parseIdentifier(!0),
              i = this.startNodeAtNode(s);
            return (
              (i.exported = s),
              (e.specifiers = [this.finishNode(i, 'ExportDefaultSpecifier')]),
              !0
            );
          }
          return !1;
        }
        maybeParseExportNamespaceSpecifier(e) {
          if (this.isContextual(89)) {
            e.specifiers ?? (e.specifiers = []);
            let t = this.startNodeAt(this.state.lastTokStartLoc);
            return (
              this.next(),
              (t.exported = this.parseModuleExportName()),
              e.specifiers.push(this.finishNode(t, 'ExportNamespaceSpecifier')),
              !0
            );
          }
          return !1;
        }
        maybeParseExportNamedSpecifiers(e) {
          if (this.match(2)) {
            e.specifiers || (e.specifiers = []);
            let t = 'type' === e.exportKind;
            return (
              e.specifiers.push(...this.parseExportSpecifiers(t)),
              (e.source = null),
              (e.attributes = []),
              (e.declaration = null),
              !0
            );
          }
          return !1;
        }
        maybeParseExportDeclaration(e) {
          return (
            !!this.shouldParseExportDeclaration() &&
            ((e.specifiers = []),
            (e.source = null),
            (e.attributes = []),
            (e.declaration = this.parseExportDeclaration(e)),
            !0)
          );
        }
        isAsyncFunction() {
          if (!this.isContextual(91)) return !1;
          let e = this.nextTokenInLineStart();
          return this.isUnparsedContextual(e, 'function');
        }
        parseExportDefaultExpression() {
          let e = this.startNode();
          if (this.match(64)) return (this.next(), this.parseFunction(e, 5));
          if (this.isAsyncFunction())
            return (this.next(), this.next(), this.parseFunction(e, 13));
          if (this.match(76)) return this.parseClass(e, !0, !0);
          if (this.match(22))
            return this.parseClass(
              this.maybeTakeDecorators(
                this.parseDecorators(!1),
                this.startNode()
              ),
              !0,
              !0
            );
          if (
            this.match(71) ||
            this.match(70) ||
            this.isLet() ||
            this.isUsing() ||
            this.isAwaitUsing()
          )
            throw this.raise(b.UnsupportedDefaultExport, this.state.startLoc);
          let t = this.parseMaybeAssignAllowIn();
          return (this.semicolon(), t);
        }
        parseExportDeclaration(e) {
          return this.match(76)
            ? this.parseClass(this.startNode(), !0, !1)
            : this.parseStatementListItem();
        }
        isExportDefaultSpecifier() {
          let { type: e } = this.state;
          if (U(e)) {
            if ((91 === e && !this.state.containsEsc) || 96 === e) return !1;
            if ((126 === e || 125 === e) && !this.state.containsEsc) {
              let e = this.nextTokenStart(),
                t = this.input.charCodeAt(e);
              if (
                123 === t ||
                (this.chStartsBindingIdentifier(t, e) &&
                  !this.input.startsWith('from', e))
              )
                return (this.expectOnePlugin(['flow', 'typescript']), !1);
            }
          } else if (!this.match(61)) return !1;
          let t = this.nextTokenStart(),
            s = this.isUnparsedContextual(t, 'from');
          if (44 === this.input.charCodeAt(t) || (U(this.state.type) && s))
            return !0;
          if (this.match(61) && s) {
            let e = this.input.charCodeAt(this.nextTokenStartSince(t + 4));
            return 34 === e || 39 === e;
          }
          return !1;
        }
        parseExportFrom(e, t) {
          (this.eatContextual(94)
            ? ((e.source = this.parseImportSource()),
              this.checkExport(e),
              this.maybeParseImportAttributes(e))
            : t && this.unexpected(),
            this.semicolon());
        }
        shouldParseExportDeclaration() {
          let { type: e } = this.state;
          return (
            !!(
              22 === e &&
              (this.expectOnePlugin(['decorators', 'decorators-legacy']),
              this.hasPlugin('decorators'))
            ) ||
            (this.isUsing() || this.isAwaitUsing()
              ? (this.raise(b.UsingDeclarationExport, this.state.startLoc), !0)
              : 70 === e ||
                71 === e ||
                64 === e ||
                76 === e ||
                this.isLet() ||
                this.isAsyncFunction())
          );
        }
        checkExport(e, t, s, i) {
          if (t) {
            if (s) {
              if (
                (this.checkDuplicateExports(e, 'default'),
                this.hasPlugin('exportDefaultFrom'))
              ) {
                let t = e.declaration;
                'Identifier' !== t.type ||
                  'from' !== t.name ||
                  t.end - t.start != 4 ||
                  t.extra?.parenthesized ||
                  this.raise(b.ExportDefaultFromAsIdentifier, t);
              }
            } else if (e.specifiers?.length)
              for (let t of e.specifiers) {
                let { exported: e } = t,
                  s = 'Identifier' === e.type ? e.name : e.value;
                if ((this.checkDuplicateExports(t, s), !i && t.local)) {
                  let { local: e } = t;
                  'Identifier' !== e.type
                    ? this.raise(b.ExportBindingIsString, t, {
                        localName: e.value,
                        exportName: s
                      })
                    : (this.checkReservedWord(e.name, e.start, !0, !1),
                      this.scope.checkLocalExport(e));
                }
              }
            else if (e.declaration) {
              let t = e.declaration;
              if (
                'FunctionDeclaration' === t.type ||
                'ClassDeclaration' === t.type
              ) {
                let { id: s } = t;
                if (!s) throw Error('Assertion failure');
                this.checkDuplicateExports(e, s.name);
              } else if ('VariableDeclaration' === t.type)
                for (let e of t.declarations) this.checkDeclaration(e.id);
            }
          }
        }
        checkDeclaration(e) {
          if ('Identifier' === e.type) this.checkDuplicateExports(e, e.name);
          else if ('ObjectPattern' === e.type)
            for (let t of e.properties) this.checkDeclaration(t);
          else if ('ArrayPattern' === e.type)
            for (let t of e.elements) t && this.checkDeclaration(t);
          else
            'ObjectProperty' === e.type
              ? this.checkDeclaration(e.value)
              : 'RestElement' === e.type
                ? this.checkDeclaration(e.argument)
                : 'AssignmentPattern' === e.type &&
                  this.checkDeclaration(e.left);
        }
        checkDuplicateExports(e, t) {
          (this.exportedIdentifiers.has(t) &&
            ('default' === t
              ? this.raise(b.DuplicateDefaultExport, e)
              : this.raise(b.DuplicateExport, e, { exportName: t })),
            this.exportedIdentifiers.add(t));
        }
        parseExportSpecifiers(e) {
          let t = [],
            s = !0;
          for (this.expect(2); !this.eat(4);) {
            if (s) s = !1;
            else if ((this.expect(8), this.eat(4))) break;
            let i = this.isContextual(126),
              r = this.match(130),
              n = this.startNode();
            ((n.local = this.parseModuleExportName()),
              t.push(this.parseExportSpecifier(n, r, e, i)));
          }
          return t;
        }
        parseExportSpecifier(e, t, s, i) {
          return (
            this.eatContextual(89)
              ? (e.exported = this.parseModuleExportName())
              : t
                ? (e.exported = this.cloneStringLiteral(e.local))
                : e.exported || (e.exported = this.cloneIdentifier(e.local)),
            this.finishNode(e, 'ExportSpecifier')
          );
        }
        parseModuleExportName() {
          if (this.match(130)) {
            let e = this.parseStringLiteral(this.state.value),
              t = e7.exec(e.value);
            return (
              t &&
                this.raise(b.ModuleExportNameHasLoneSurrogate, e, {
                  surrogateCharCode: t[0].charCodeAt(0)
                }),
              e
            );
          }
          return this.parseIdentifier(!0);
        }
        checkImportPhase(e) {
          let { specifiers: t } = e,
            s = 1 === t.length ? t[0].type : null;
          'source' === e.phase
            ? 'ImportDefaultSpecifier' !== s &&
              this.raise(b.SourcePhaseImportRequiresDefault, t[0])
            : 'defer' === e.phase &&
              'ImportNamespaceSpecifier' !== s &&
              this.raise(b.DeferImportRequiresNamespace, t[0]);
        }
        isPotentialImportPhase(e) {
          return !e && (this.isContextual(101) || this.isContextual(93));
        }
        applyImportPhase(e, t, s, i) {
          t ||
            ('source' === s
              ? (this.expectPlugin('sourcePhaseImports', i),
                (e.phase = 'source'))
              : 'defer' === s
                ? (this.expectPlugin('deferredImportEvaluation', i),
                  (e.phase = 'defer'))
                : this.hasPlugin('sourcePhaseImports') && (e.phase = null));
        }
        parseMaybeImportPhase(e, t) {
          if (!this.isPotentialImportPhase(t))
            return (this.applyImportPhase(e, t, null), null);
          let s = this.startNode(),
            i = this.parseIdentifierName(!0),
            { type: r } = this.state;
          return (R(r) ? 94 !== r || 102 === this.lookaheadCharCode() : 8 !== r)
            ? (this.applyImportPhase(e, t, i, s.start), null)
            : (this.applyImportPhase(e, t, null), this.createIdentifier(s, i));
        }
        isPrecedingIdImportPhase(e) {
          let { type: t } = this.state;
          return U(t) ? 94 !== t || 102 === this.lookaheadCharCode() : 8 !== t;
        }
        parseImport(e) {
          return this.match(130)
            ? this.parseImportSourceAndAttributes(e)
            : this.parseImportSpecifiersAndAfter(
                e,
                this.parseMaybeImportPhase(e, !1)
              );
        }
        parseImportSpecifiersAndAfter(e, t) {
          e.specifiers = [];
          let s = !this.maybeParseDefaultImportSpecifier(e, t) || this.eat(8),
            i = s && this.maybeParseStarImportSpecifier(e);
          return (
            s && !i && this.parseNamedImportSpecifiers(e),
            this.expectContextual(94),
            this.parseImportSourceAndAttributes(e)
          );
        }
        parseImportSourceAndAttributes(e) {
          return (
            e.specifiers ?? (e.specifiers = []),
            (e.source = this.parseImportSource()),
            this.maybeParseImportAttributes(e),
            this.checkImportPhase(e),
            this.semicolon(),
            (this.sawUnambiguousESM = !0),
            this.finishNode(e, 'ImportDeclaration')
          );
        }
        parseImportSource() {
          return (this.match(130) || this.unexpected(), this.parseExprAtom());
        }
        parseImportSpecifierLocal(e, t, s) {
          ((t.local = this.parseIdentifier()),
            e.specifiers.push(this.finishImportSpecifier(t, s)));
        }
        finishImportSpecifier(e, t, s = 8201) {
          return (
            this.checkLVal(e.local, { type: t }, s),
            this.finishNode(e, t)
          );
        }
        parseImportAttributes() {
          this.expect(2);
          let e = [],
            t = new Set();
          do {
            if (this.match(4)) break;
            let s = this.startNode(),
              i = this.state.value;
            if (
              (t.has(i) &&
                this.raise(
                  b.ModuleAttributesWithDuplicateKeys,
                  this.state.startLoc,
                  { key: i }
                ),
              t.add(i),
              this.match(130)
                ? (s.key = this.parseStringLiteral(i))
                : (s.key = this.parseIdentifier(!0)),
              this.expect(10),
              !this.match(130))
            )
              throw this.raise(
                b.ModuleAttributeInvalidValue,
                this.state.startLoc
              );
            ((s.value = this.parseStringLiteral(this.state.value)),
              e.push(this.finishNode(s, 'ImportAttribute')));
          } while (this.eat(8));
          return (this.expect(4), e);
        }
        maybeParseImportAttributes(e) {
          let t;
          if (this.match(72)) {
            if (this.hasPrecedingLineBreak() && 40 === this.lookaheadCharCode())
              return;
            (this.next(), (t = this.parseImportAttributes()));
          } else t = [];
          e.attributes = t;
        }
        maybeParseDefaultImportSpecifier(e, t) {
          if (t) {
            let s = this.startNodeAtNode(t);
            return (
              (s.local = t),
              e.specifiers.push(
                this.finishImportSpecifier(s, 'ImportDefaultSpecifier')
              ),
              !0
            );
          }
          return (
            !!R(this.state.type) &&
            (this.parseImportSpecifierLocal(
              e,
              this.startNode(),
              'ImportDefaultSpecifier'
            ),
            !0)
          );
        }
        maybeParseStarImportSpecifier(e) {
          if (this.match(51)) {
            let t = this.startNode();
            return (
              this.next(),
              this.expectContextual(89),
              this.parseImportSpecifierLocal(e, t, 'ImportNamespaceSpecifier'),
              !0
            );
          }
          return !1;
        }
        parseNamedImportSpecifiers(e) {
          let t = !0;
          for (this.expect(2); !this.eat(4);) {
            if (t) t = !1;
            else {
              if (this.eat(10))
                throw this.raise(b.DestructureNamedImport, this.state.startLoc);
              if ((this.expect(8), this.eat(4))) break;
            }
            let s = this.startNode(),
              i = this.match(130),
              r = this.isContextual(126);
            s.imported = this.parseModuleExportName();
            let n = this.parseImportSpecifier(
              s,
              i,
              'type' === e.importKind || 'typeof' === e.importKind,
              r,
              void 0
            );
            e.specifiers.push(n);
          }
        }
        parseImportSpecifier(e, t, s, i, r) {
          if (this.eatContextual(89)) e.local = this.parseIdentifier();
          else {
            let { imported: s } = e;
            if (t)
              throw this.raise(b.ImportBindingIsString, e, {
                importName: s.value
              });
            (this.checkReservedWord(s.name, e.start, !0, !0),
              e.local || (e.local = this.cloneIdentifier(s)));
          }
          return this.finishImportSpecifier(e, 'ImportSpecifier', r);
        }
        isThisParam(e) {
          return 'Identifier' === e.type && 'this' === e.name;
        }
      },
      ti = /in(?:stanceof)?|as|satisfies/y;
    function tr(e) {
      if (!e) throw Error('Assert fail');
    }
    var ta = T`typescript`({
      AbstractMethodHasImplementation: ({ methodName: e }) =>
        `Method '${e}' cannot have an implementation because it is marked abstract.`,
      AbstractPropertyHasInitializer: ({ propertyName: e }) =>
        `Property '${e}' cannot have an initializer because it is marked abstract.`,
      AccessorCannotBeOptional:
        "An 'accessor' property cannot be declared optional.",
      AccessorCannotDeclareThisParameter:
        "'get' and 'set' accessors cannot declare 'this' parameters.",
      AccessorCannotHaveTypeParameters:
        'An accessor cannot have type parameters.',
      ClassMethodHasDeclare:
        "Class methods cannot have the 'declare' modifier.",
      ClassMethodHasReadonly:
        "Class methods cannot have the 'readonly' modifier.",
      ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference:
        "A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.",
      ConstructorHasTypeParameters:
        'Type parameters cannot appear on a constructor declaration.',
      DeclareAccessor: ({ kind: e }) => `'declare' is not allowed in ${e}ters.`,
      DeclareClassFieldHasInitializer:
        'Initializers are not allowed in ambient contexts.',
      DeclareFunctionHasImplementation:
        'An implementation cannot be declared in ambient contexts.',
      DecoratorAbstractMethod: ({ kind: e }) =>
        `Decorators can't be used with ${e.startsWith('a') ? 'an' : 'a'} ${e}.`,
      DuplicateAccessibilityModifier: ({ modifier: e }) =>
        `Accessibility modifier already seen: '${e}'.`,
      DuplicateModifier: ({ modifier: e }) => `Duplicate modifier: '${e}'.`,
      EmptyHeritageClauseType: ({ token: e }) => `'${e}' list cannot be empty.`,
      EmptyTypeArguments: 'Type argument list cannot be empty.',
      EmptyTypeParameters: 'Type parameter list cannot be empty.',
      ExpectedAmbientAfterExportDeclare:
        "'export declare' must be followed by an ambient declaration.",
      ExportAssignmentInTSNamespace:
        'An export assignment cannot be used in a namespace.',
      ExportInTSNamespace:
        'Export declarations are not permitted in a namespace.',
      ImportAliasHasImportType: "An import alias can not use 'import type'.",
      ImportInTSNamespace:
        'Import declarations in a namespace cannot reference a module.',
      IncompatibleModifiers: ({ modifiers: e }) =>
        `'${e[0]}' modifier cannot be used with '${e[1]}' modifier.`,
      IndexSignatureHasAbstract:
        "Index signatures cannot have the 'abstract' modifier.",
      IndexSignatureHasAccessibility: ({ modifier: e }) =>
        `Index signatures cannot have an accessibility modifier ('${e}').`,
      IndexSignatureHasDeclare:
        "Index signatures cannot have the 'declare' modifier.",
      IndexSignatureHasOverride:
        "'override' modifier cannot appear on an index signature.",
      IndexSignatureHasStatic:
        "Index signatures cannot have the 'static' modifier.",
      InitializerNotAllowedInAmbientContext:
        'Initializers are not allowed in ambient contexts.',
      InlineModuleDeclarationMustUseString:
        '`module ... {}` declarations must have a string name. Use `namespace ... {}` instead.',
      InvalidHeritageClauseType: ({ token: e }) =>
        `'${e}' list can only include identifiers or qualified-names with optional type arguments.`,
      InvalidModifierOnAwaitUsingDeclaration: e =>
        `'${e}' modifier cannot appear on an await using declaration.`,
      InvalidModifierOnTypeMember: ({ modifier: e }) =>
        `'${e}' modifier cannot appear on a type member.`,
      InvalidModifierOnTypeParameter: ({ modifier: e }) =>
        `'${e}' modifier cannot appear on a type parameter.`,
      InvalidModifierOnTypeParameterPositions: ({ modifier: e }) =>
        `'${e}' modifier can only appear on a type parameter of a class, interface or type alias.`,
      InvalidModifierOnUsingDeclaration: e =>
        `'${e}' modifier cannot appear on a using declaration.`,
      InvalidModifiersOrder: ({ orderedModifiers: e }) =>
        `'${e[0]}' modifier must precede '${e[1]}' modifier.`,
      InvalidPropertyAccessAfterInstantiationExpression:
        'Invalid property access after an instantiation expression. You can either wrap the instantiation expression in parentheses, or delete the type arguments.',
      InvalidTupleMemberLabel:
        'Tuple members must be labeled with a simple identifier.',
      MissingInterfaceName:
        "'interface' declarations must be followed by an identifier.",
      NamespaceExportInTSNamespace:
        'Global module exports may only appear at top level.',
      NonAbstractClassHasAbstractMethod:
        'Abstract methods can only appear within an abstract class.',
      NonClassMethodPropertyHasAbstractModifier:
        "'abstract' modifier can only appear on a class, method, or property declaration.",
      OptionalTypeBeforeRequired:
        'A required element cannot follow an optional element.',
      OverrideNotInSubClass:
        "This member cannot have an 'override' modifier because its containing class does not extend another class.",
      PatternIsOptional:
        'A binding pattern parameter cannot be optional in an implementation signature.',
      PrivateElementHasAbstract:
        "Private elements cannot have the 'abstract' modifier.",
      PrivateElementHasAccessibility: ({ modifier: e }) =>
        `Private elements cannot have an accessibility modifier ('${e}').`,
      ReadonlyForMethodSignature:
        "'readonly' modifier can only appear on a property declaration or index signature.",
      ReservedArrowTypeParam:
        'This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`.',
      ReservedTypeAssertion:
        'This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead.',
      SetAccessorCannotHaveOptionalParameter:
        "A 'set' accessor cannot have an optional parameter.",
      SetAccessorCannotHaveRestParameter:
        "A 'set' accessor cannot have rest parameter.",
      SetAccessorCannotHaveReturnType:
        "A 'set' accessor cannot have a return type annotation.",
      SingleTypeParameterWithoutTrailingComma: ({ typeParameterName: e }) =>
        `Single type parameter ${e} should have a trailing comma. Example usage: <${e},>.`,
      StaticBlockCannotHaveModifier:
        'Static class blocks cannot have any modifier.',
      TupleOptionalAfterType:
        'A labeled tuple optional element must be declared using a question mark after the name and before the colon (`name?: type`), rather than after the type (`name: type?`).',
      TypeAnnotationAfterAssign:
        'Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.',
      TypeImportCannotSpecifyDefaultAndNamed:
        'A type-only import can specify a default import or named bindings, but not both.',
      TypeModifierIsUsedInTypeExports:
        "The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement.",
      TypeModifierIsUsedInTypeImports:
        "The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement.",
      UnexpectedParameterInitializer:
        'A parameter initializer is only allowed in a function or constructor implementation.',
      UnexpectedParameterModifier:
        'A parameter property is only allowed in a constructor implementation.',
      UnexpectedReadonly:
        "'readonly' type modifier is only permitted on array and tuple literal types.",
      UnexpectedTypeAnnotation: 'Did not expect a type annotation here.',
      UnexpectedTypeCastInParameter:
        'Unexpected type cast in parameter position.',
      UnexpectedTypeDeclaration: e =>
        `'${e}' declarations can only be declared inside a block.`,
      UnsupportedImportTypeArgument:
        'Argument in a type import must be a string literal.',
      UnsupportedParameterPropertyKind:
        'A parameter property may not be declared using a binding pattern.',
      UnsupportedSignatureParameterKind: ({ type: e }) =>
        `Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ${e}.`,
      UsingDeclarationInAmbientContext: e =>
        `'${e}' declarations are not allowed in ambient contexts.`
    });
    function tn(e) {
      return 'private' === e || 'public' === e || 'protected' === e;
    }
    var to = e =>
      class extends e {
        getScopeHandler() {
          return eC;
        }
        tsIsIdentifier() {
          return U(this.state.type);
        }
        tsTokenCanFollowModifier() {
          return (
            this.match(0) ||
            this.match(2) ||
            this.match(51) ||
            this.match(17) ||
            this.match(134) ||
            this.isLiteralPropertyName()
          );
        }
        tsNextTokenOnSameLineAndCanFollowModifier() {
          return (
            this.next(),
            !this.hasPrecedingLineBreak() && this.tsTokenCanFollowModifier()
          );
        }
        tsNextTokenCanFollowModifier() {
          return this.match(102)
            ? (this.next(), this.tsTokenCanFollowModifier())
            : this.tsNextTokenOnSameLineAndCanFollowModifier();
        }
        tsParseModifier(e, t, s) {
          if (
            !U(this.state.type) &&
            54 !== this.state.type &&
            71 !== this.state.type
          )
            return;
          let i = this.state.value;
          if (e.includes(i)) {
            if ((s && this.match(102)) || (t && this.tsIsStartOfStaticBlocks()))
              return;
            if (this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this)))
              return i;
          }
        }
        tsParseModifiers(
          {
            allowedModifiers: e,
            disallowedModifiers: t,
            stopOnStartOfClassStaticBlock: s,
            errorTemplate: i = ta.InvalidModifierOnTypeMember
          },
          r
        ) {
          let n = (e, t, s, i) => {
              t === s &&
                r[i] &&
                this.raise(ta.InvalidModifiersOrder, e, {
                  orderedModifiers: [s, i]
                });
            },
            o = (e, t, s, i) => {
              ((r[s] && t === i) || (r[i] && t === s)) &&
                this.raise(ta.IncompatibleModifiers, e, { modifiers: [s, i] });
            };
          for (;;) {
            let { startLoc: h } = this.state,
              p = this.tsParseModifier(e.concat(t ?? []), s, r.static);
            if (!p) break;
            (tn(p)
              ? r.accessibility
                ? this.raise(ta.DuplicateAccessibilityModifier, h, {
                    modifier: p
                  })
                : (n(h, p, p, 'override'),
                  n(h, p, p, 'static'),
                  n(h, p, p, 'readonly'),
                  (r.accessibility = p))
              : 'in' === p || 'out' === p
                ? (r[p] && this.raise(ta.DuplicateModifier, h, { modifier: p }),
                  (r[p] = !0),
                  n(h, p, 'in', 'out'))
                : (c(r, p)
                    ? this.raise(ta.DuplicateModifier, h, { modifier: p })
                    : (n(h, p, 'static', 'readonly'),
                      n(h, p, 'static', 'override'),
                      n(h, p, 'override', 'readonly'),
                      n(h, p, 'abstract', 'override'),
                      o(h, p, 'declare', 'override'),
                      o(h, p, 'static', 'abstract')),
                  (r[p] = !0)),
              t?.includes(p) && this.raise(i, h, { modifier: p }));
          }
        }
        tsIsListTerminator(e) {
          switch (e) {
            case 'EnumMembers':
            case 'TypeMembers':
              return this.match(4);
            case 'HeritageClauseElement':
              return this.match(2);
            case 'TupleElementTypes':
              return this.match(1);
            case 'TypeParametersOrArguments':
              return this.match(44);
          }
        }
        tsParseList(e, t) {
          let s = [];
          for (; !this.tsIsListTerminator(e);) s.push(t());
          return s;
        }
        tsParseDelimitedList(e, t, s) {
          var i = this.tsParseDelimitedListWorker(e, t, !0, s);
          if (null == i) throw Error(`Unexpected ${i} value.`);
          return i;
        }
        tsParseDelimitedListWorker(e, t, s, i) {
          let r = [],
            n = -1;
          for (; !this.tsIsListTerminator(e);) {
            n = -1;
            let i = t();
            if (null == i) return;
            if ((r.push(i), this.eat(8))) {
              n = this.state.lastTokStartLoc.index;
              continue;
            }
            if (this.tsIsListTerminator(e)) break;
            s && this.expect(8);
            return;
          }
          return (i && (i.value = n), r);
        }
        tsParseBracketedList(e, t, s, i, r) {
          i || (s ? this.expect(0) : this.expect(43));
          let n = this.tsParseDelimitedList(e, t, r);
          return (s ? this.expect(1) : this.expect(44), n);
        }
        tsParseImportType() {
          let e = this.startNode();
          return (
            this.expect(79),
            this.expect(6),
            this.match(130)
              ? (e.source = this.parseStringLiteral(this.state.value))
              : (this.raise(
                  ta.UnsupportedImportTypeArgument,
                  this.state.startLoc
                ),
                (e.source = this.tsParseNonConditionalType())),
            this.eat(8)
              ? (e.options = this.tsParseImportTypeOptions())
              : (e.options = null),
            this.expect(7),
            this.eat(12) && (e.qualifier = this.tsParseEntityName(3)),
            this.match(43) && (e.typeArguments = this.tsParseTypeArguments()),
            this.finishNode(e, 'TSImportType')
          );
        }
        tsParseImportTypeOptions() {
          let e = this.startNode();
          this.expect(2);
          let t = this.startNode();
          return (
            this.isContextual(72)
              ? ((t.method = !1),
                (t.key = this.parseIdentifier(!0)),
                (t.computed = !1),
                (t.shorthand = !1))
              : this.unexpected(null, 72),
            this.expect(10),
            (t.value = this.tsParseImportTypeWithPropertyValue()),
            (e.properties = [this.finishObjectProperty(t)]),
            this.eat(8),
            this.expect(4),
            this.finishNode(e, 'ObjectExpression')
          );
        }
        tsParseImportTypeWithPropertyValue() {
          let e = this.startNode(),
            t = [];
          for (this.expect(2); !this.match(4);) {
            let e = this.state.type;
            (U(e) || 130 === e
              ? t.push(super.parsePropertyDefinition(null))
              : this.unexpected(),
              this.eat(8));
          }
          return (
            (e.properties = t),
            this.next(),
            this.finishNode(e, 'ObjectExpression')
          );
        }
        tsParseEntityName(e) {
          let t;
          if (1 & e && this.match(74))
            if (2 & e) t = this.parseIdentifier(!0);
            else {
              let e = this.startNode();
              (this.next(), (t = this.finishNode(e, 'ThisExpression')));
            }
          else t = this.parseIdentifier(!!(1 & e));
          for (; this.eat(12);) {
            let s = this.startNodeAtNode(t);
            ((s.left = t),
              (s.right = this.parseIdentifier(!!(1 & e))),
              (t = this.finishNode(s, 'TSQualifiedName')));
          }
          return t;
        }
        tsParseTypeReference() {
          let e = this.startNode();
          return (
            (e.typeName = this.tsParseEntityName(1)),
            !this.hasPrecedingLineBreak() &&
              this.match(43) &&
              (e.typeArguments = this.tsParseTypeArguments()),
            this.finishNode(e, 'TSTypeReference')
          );
        }
        tsParseThisTypePredicate(e) {
          this.next();
          let t = this.startNodeAtNode(e);
          return (
            (t.parameterName = e),
            (t.typeAnnotation = this.tsParseTypeAnnotation(!1)),
            (t.asserts = !1),
            this.finishNode(t, 'TSTypePredicate')
          );
        }
        tsParseThisTypeNode() {
          let e = this.startNode();
          return (this.next(), this.finishNode(e, 'TSThisType'));
        }
        tsParseTypeQuery() {
          let e = this.startNode();
          return (
            this.expect(83),
            this.match(79)
              ? (e.exprName = this.tsParseImportType())
              : (e.exprName = this.tsParseEntityName(1)),
            !this.hasPrecedingLineBreak() &&
              this.match(43) &&
              (e.typeArguments = this.tsParseTypeArguments()),
            this.finishNode(e, 'TSTypeQuery')
          );
        }
        tsParseInOutModifiers = this.tsParseModifiers.bind(this, {
          allowedModifiers: ['in', 'out'],
          disallowedModifiers: [
            'const',
            'public',
            'private',
            'protected',
            'readonly',
            'declare',
            'abstract',
            'override'
          ],
          errorTemplate: ta.InvalidModifierOnTypeParameter
        });
        tsParseConstModifier = this.tsParseModifiers.bind(this, {
          allowedModifiers: ['const'],
          disallowedModifiers: ['in', 'out'],
          errorTemplate: ta.InvalidModifierOnTypeParameterPositions
        });
        tsParseInOutConstModifiers = this.tsParseModifiers.bind(this, {
          allowedModifiers: ['in', 'out', 'const'],
          disallowedModifiers: [
            'public',
            'private',
            'protected',
            'readonly',
            'declare',
            'abstract',
            'override'
          ],
          errorTemplate: ta.InvalidModifierOnTypeParameter
        });
        tsParseTypeParameter(e) {
          let t = this.startNode();
          return (
            e(t),
            (t.name = this.tsParseTypeParameterName()),
            (t.constraint = this.tsEatThenParseType(77)),
            (t.default = this.tsEatThenParseType(25)),
            this.finishNode(t, 'TSTypeParameter')
          );
        }
        tsTryParseTypeParameters(e) {
          if (this.match(43)) return this.tsParseTypeParameters(e);
        }
        tsParseTypeParameters(e) {
          let t = this.startNode();
          this.match(43) || this.match(138) ? this.next() : this.unexpected();
          let s = { value: -1 };
          return (
            (t.params = this.tsParseBracketedList(
              'TypeParametersOrArguments',
              this.tsParseTypeParameter.bind(this, e),
              !1,
              !0,
              s
            )),
            0 === t.params.length && this.raise(ta.EmptyTypeParameters, t),
            -1 !== s.value && this.addExtra(t, 'trailingComma', s.value),
            this.finishNode(t, 'TSTypeParameterDeclaration')
          );
        }
        tsFillSignature(e, t) {
          let s = 15 === e,
            i = 'returnType';
          ((t.typeParameters = this.tsTryParseTypeParameters(
            this.tsParseConstModifier
          )),
            this.expect(6),
            (t.params = this.tsParseBindingListForSignature()),
            s
              ? (t[i] = this.tsParseTypeOrTypePredicateAnnotation(e))
              : this.match(e) &&
                (t[i] = this.tsParseTypeOrTypePredicateAnnotation(e)));
        }
        tsParseBindingListForSignature() {
          let e = super.parseBindingList(7, 41, 2);
          for (let t of e) {
            let { type: e } = t;
            ('AssignmentPattern' === e || 'TSParameterProperty' === e) &&
              this.raise(ta.UnsupportedSignatureParameterKind, t, { type: e });
          }
          return e;
        }
        tsParseTypeMemberSemicolon() {
          this.eat(8) || this.isLineTerminator() || this.expect(9);
        }
        tsParseSignatureMember(e, t) {
          return (
            this.tsFillSignature(10, t),
            this.tsParseTypeMemberSemicolon(),
            this.finishNode(t, e)
          );
        }
        tsIsUnambiguouslyIndexSignature() {
          return (
            this.next(),
            !!U(this.state.type) && (this.next(), this.match(10))
          );
        }
        tsTryParseIndexSignature(e) {
          if (!(
            this.match(0) &&
            this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this))
          ))
            return;
          this.expect(0);
          let t = this.parseIdentifier();
          ((t.typeAnnotation = this.tsParseTypeAnnotation()),
            this.resetEndLocation(t),
            this.expect(1),
            (e.parameters = [t]));
          let s = this.tsTryParseTypeAnnotation();
          return (
            s && (e.typeAnnotation = s),
            this.tsParseTypeMemberSemicolon(),
            this.finishNode(e, 'TSIndexSignature')
          );
        }
        tsParsePropertyOrMethodSignature(e, t) {
          if (
            (this.eat(13) && (e.optional = !0), this.match(6) || this.match(43))
          ) {
            if (
              (t && this.raise(ta.ReadonlyForMethodSignature, e),
              e.kind &&
                this.match(43) &&
                this.raise(
                  ta.AccessorCannotHaveTypeParameters,
                  this.state.curPosition()
                ),
              this.tsFillSignature(10, e),
              this.tsParseTypeMemberSemicolon(),
              'get' === e.kind)
            )
              e.params.length > 0 &&
                (this.raise(b.BadGetterArity, this.state.curPosition()),
                this.isThisParam(e.params[0]) &&
                  this.raise(
                    ta.AccessorCannotDeclareThisParameter,
                    this.state.curPosition()
                  ));
            else if ('set' === e.kind) {
              if (1 !== e.params.length)
                this.raise(b.BadSetterArity, this.state.curPosition());
              else {
                let t = e.params[0];
                (this.isThisParam(t) &&
                  this.raise(
                    ta.AccessorCannotDeclareThisParameter,
                    this.state.curPosition()
                  ),
                  'Identifier' === t.type &&
                    t.optional &&
                    this.raise(
                      ta.SetAccessorCannotHaveOptionalParameter,
                      this.state.curPosition()
                    ),
                  'RestElement' === t.type &&
                    this.raise(
                      ta.SetAccessorCannotHaveRestParameter,
                      this.state.curPosition()
                    ));
              }
              e.returnType &&
                this.raise(ta.SetAccessorCannotHaveReturnType, e.returnType);
            } else e.kind = 'method';
            return this.finishNode(e, 'TSMethodSignature');
          }
          {
            t && (e.readonly = !0);
            let s = this.tsTryParseTypeAnnotation();
            return (
              s && (e.typeAnnotation = s),
              this.tsParseTypeMemberSemicolon(),
              this.finishNode(e, 'TSPropertySignature')
            );
          }
        }
        tsParseTypeMember() {
          let e = this.startNode();
          if (this.match(6) || this.match(43))
            return this.tsParseSignatureMember('TSCallSignatureDeclaration', e);
          if (this.match(73)) {
            let t = this.startNode();
            return (
              this.next(),
              this.match(6) || this.match(43)
                ? this.tsParseSignatureMember(
                    'TSConstructSignatureDeclaration',
                    e
                  )
                : ((e.key = this.createIdentifier(t, 'new')),
                  this.tsParsePropertyOrMethodSignature(e, !1))
            );
          }
          return (
            this.tsParseModifiers(
              {
                allowedModifiers: ['readonly'],
                disallowedModifiers: [
                  'declare',
                  'abstract',
                  'private',
                  'protected',
                  'public',
                  'static',
                  'override'
                ]
              },
              e
            ),
            this.tsTryParseIndexSignature(e) ||
              (super.parsePropertyName(e),
              !e.computed &&
                'Identifier' === e.key.type &&
                ('get' === e.key.name || 'set' === e.key.name) &&
                this.tsTokenCanFollowModifier() &&
                ((e.kind = e.key.name),
                super.parsePropertyName(e),
                this.match(6) || this.match(43) || this.unexpected(null, 6)),
              this.tsParsePropertyOrMethodSignature(e, !!e.readonly))
          );
        }
        tsParseTypeLiteral() {
          let e = this.startNode();
          return (
            (e.members = this.tsParseObjectTypeMembers()),
            this.finishNode(e, 'TSTypeLiteral')
          );
        }
        tsParseObjectTypeMembers() {
          this.expect(2);
          let e = this.tsParseList(
            'TypeMembers',
            this.tsParseTypeMember.bind(this)
          );
          return (this.expect(4), e);
        }
        tsIsStartOfMappedType() {
          return (
            this.next(),
            this.eat(49)
              ? this.isContextual(118)
              : (this.isContextual(118) && this.next(),
                !!this.match(0) &&
                  (this.next(), !!this.tsIsIdentifier()) &&
                  (this.next(), this.match(54)))
          );
        }
        tsParseMappedType() {
          let e = this.startNode();
          return (
            this.expect(2),
            this.match(49)
              ? ((e.readonly = this.state.value),
                this.next(),
                this.expectContextual(118))
              : this.eatContextual(118) && (e.readonly = !0),
            this.expect(0),
            (e.key = this.tsParseTypeParameterName()),
            (e.constraint = this.tsExpectThenParseType(54)),
            (e.nameType = this.eatContextual(89) ? this.tsParseType() : null),
            this.expect(1),
            this.match(49)
              ? ((e.optional = this.state.value), this.next(), this.expect(13))
              : this.eat(13) && (e.optional = !0),
            (e.typeAnnotation = this.tsTryParseType()),
            this.semicolon(),
            this.expect(4),
            this.finishNode(e, 'TSMappedType')
          );
        }
        tsParseTupleType() {
          let e = this.startNode();
          e.elementTypes = this.tsParseBracketedList(
            'TupleElementTypes',
            this.tsParseTupleElementType.bind(this),
            !0,
            !1
          );
          let t = !1;
          return (
            e.elementTypes.forEach(e => {
              let { type: s } = e;
              (t &&
                'TSRestType' !== s &&
                'TSOptionalType' !== s &&
                !('TSNamedTupleMember' === s && e.optional) &&
                this.raise(ta.OptionalTypeBeforeRequired, e),
                t ||
                  (t =
                    ('TSNamedTupleMember' === s && e.optional) ||
                    'TSOptionalType' === s));
            }),
            this.finishNode(e, 'TSTupleType')
          );
        }
        tsParseTupleElementType() {
          let e = this.state.startLoc,
            t = this.eat(17),
            { startLoc: s } = this.state,
            i,
            r,
            n,
            o,
            h = R(this.state.type) ? this.lookaheadCharCode() : null;
          if (58 === h)
            ((i = !0),
              (n = !1),
              (r = this.parseIdentifier(!0)),
              this.expect(10),
              (o = this.tsParseType()));
          else if (63 === h) {
            n = !0;
            let e = this.state.value,
              t = this.tsParseNonArrayType();
            58 === this.lookaheadCharCode()
              ? ((i = !0),
                (r = this.createIdentifier(this.startNodeAt(s), e)),
                this.expect(13),
                this.expect(10),
                (o = this.tsParseType()))
              : ((i = !1), (o = t), this.expect(13));
          } else
            ((o = this.tsParseType()), (n = this.eat(13)), (i = this.eat(10)));
          if (i) {
            let e;
            (r
              ? (((e = this.startNodeAt(s)).optional = n),
                (e.label = r),
                (e.elementType = o),
                this.eat(13) &&
                  ((e.optional = !0),
                  this.raise(
                    ta.TupleOptionalAfterType,
                    this.state.lastTokStartLoc
                  )))
              : (((e = this.startNodeAt(s)).optional = n),
                this.raise(ta.InvalidTupleMemberLabel, o),
                (e.label = o),
                (e.elementType = this.tsParseType())),
              (o = this.finishNode(e, 'TSNamedTupleMember')));
          } else if (n) {
            let e = this.startNodeAt(s);
            ((e.typeAnnotation = o),
              (o = this.finishNode(e, 'TSOptionalType')));
          }
          if (t) {
            let t = this.startNodeAt(e);
            ((t.typeAnnotation = o), (o = this.finishNode(t, 'TSRestType')));
          }
          return o;
        }
        tsParseParenthesizedType() {
          let e = this.startNode();
          return (
            this.expect(6),
            (e.typeAnnotation = this.tsParseType()),
            this.expect(7),
            this.finishNode(e, 'TSParenthesizedType')
          );
        }
        tsParseFunctionOrConstructorType(e, t) {
          let s = this.startNode();
          return (
            'TSConstructorType' === e &&
              ((s.abstract = !!t), t && this.next(), this.next()),
            this.tsInAllowConditionalTypesContext(() =>
              this.tsFillSignature(15, s)
            ),
            this.finishNode(s, e)
          );
        }
        tsParseLiteralTypeNode() {
          let e = this.startNode();
          switch (this.state.type) {
            case 131:
            case 132:
            case 130:
            case 81:
            case 82:
              e.literal = super.parseExprAtom();
              break;
            default:
              this.unexpected();
          }
          return this.finishNode(e, 'TSLiteralType');
        }
        tsParseTemplateLiteralType() {
          let e = this.state.startLoc,
            t = this.parseTemplateElement(!1),
            s = [t];
          if (t.tail) {
            let t = this.startNodeAt(e),
              i = this.startNodeAt(e);
            return (
              (i.expressions = []),
              (i.quasis = s),
              (t.literal = this.finishNode(i, 'TemplateLiteral')),
              this.finishNode(t, 'TSLiteralType')
            );
          }
          {
            let i = [];
            for (; !t.tail;)
              (i.push(this.tsParseType()),
                this.readTemplateContinuation(),
                s.push((t = this.parseTemplateElement(!1))));
            let r = this.startNodeAt(e);
            return (
              (r.types = i),
              (r.quasis = s),
              this.finishNode(r, 'TSTemplateLiteralType')
            );
          }
        }
        parseTemplateSubstitution() {
          return this.state.inType
            ? this.tsParseType()
            : super.parseTemplateSubstitution();
        }
        tsParseThisTypeOrThisTypePredicate() {
          let e = this.tsParseThisTypeNode();
          return this.isContextual(112) && !this.hasPrecedingLineBreak()
            ? this.tsParseThisTypePredicate(e)
            : e;
        }
        tsParseNonArrayType() {
          switch (this.state.type) {
            case 130:
            case 131:
            case 132:
            case 81:
            case 82:
              return this.tsParseLiteralTypeNode();
            case 49:
              if ('-' === this.state.value) {
                let e = this.startNode(),
                  t = this.lookahead();
                return (
                  131 !== t.type && 132 !== t.type && this.unexpected(),
                  (e.literal = this.parseMaybeUnary()),
                  this.finishNode(e, 'TSLiteralType')
                );
              }
              break;
            case 74:
              return this.tsParseThisTypeOrThisTypePredicate();
            case 83:
              return this.tsParseTypeQuery();
            case 79:
              return this.tsParseImportType();
            case 2:
              return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this))
                ? this.tsParseMappedType()
                : this.tsParseTypeLiteral();
            case 0:
              return this.tsParseTupleType();
            case 6:
              if (!(2048 & this.optionFlags)) {
                let e = this.state.startLoc;
                this.next();
                let t = this.tsParseType();
                return (
                  this.expect(7),
                  this.addExtra(t, 'parenthesized', !0),
                  this.addExtra(t, 'parenStart', e.index),
                  t
                );
              }
              return this.tsParseParenthesizedType();
            case 21:
            case 20:
              return this.tsParseTemplateLiteralType();
            default: {
              let { type: e } = this.state;
              if (U(e) || 84 === e || 80 === e) {
                let t =
                  84 === e
                    ? 'TSVoidKeyword'
                    : 80 === e
                      ? 'TSNullKeyword'
                      : (function (e) {
                          switch (e) {
                            case 'any':
                              return 'TSAnyKeyword';
                            case 'boolean':
                              return 'TSBooleanKeyword';
                            case 'bigint':
                              return 'TSBigIntKeyword';
                            case 'never':
                              return 'TSNeverKeyword';
                            case 'number':
                              return 'TSNumberKeyword';
                            case 'object':
                              return 'TSObjectKeyword';
                            case 'string':
                              return 'TSStringKeyword';
                            case 'symbol':
                              return 'TSSymbolKeyword';
                            case 'undefined':
                              return 'TSUndefinedKeyword';
                            case 'unknown':
                              return 'TSUnknownKeyword';
                            default:
                              return;
                          }
                        })(this.state.value);
                if (void 0 !== t && 46 !== this.lookaheadCharCode()) {
                  let e = this.startNode();
                  return (this.next(), this.finishNode(e, t));
                }
                return this.tsParseTypeReference();
              }
            }
          }
          throw this.unexpected();
        }
        tsParseArrayTypeOrHigher() {
          let { startLoc: e } = this.state,
            t = this.tsParseNonArrayType();
          for (; !this.hasPrecedingLineBreak() && this.eat(0);)
            if (this.match(1)) {
              let s = this.startNodeAt(e);
              ((s.elementType = t),
                this.expect(1),
                (t = this.finishNode(s, 'TSArrayType')));
            } else {
              let s = this.startNodeAt(e);
              ((s.objectType = t),
                (s.indexType = this.tsParseType()),
                this.expect(1),
                (t = this.finishNode(s, 'TSIndexedAccessType')));
            }
          return t;
        }
        tsParseTypeOperator() {
          let e = this.startNode(),
            t = this.state.value;
          return (
            this.next(),
            (e.operator = t),
            (e.typeAnnotation = this.tsParseTypeOperatorOrHigher()),
            'readonly' === t && this.tsCheckTypeAnnotationForReadOnly(e),
            this.finishNode(e, 'TSTypeOperator')
          );
        }
        tsCheckTypeAnnotationForReadOnly(e) {
          switch (e.typeAnnotation.type) {
            case 'TSTupleType':
            case 'TSArrayType':
              return;
            default:
              this.raise(ta.UnexpectedReadonly, e);
          }
        }
        tsParseInferType() {
          let e = this.startNode();
          this.expectContextual(111);
          let t = this.startNode();
          return (
            (t.name = this.tsParseTypeParameterName()),
            (t.constraint = this.tsTryParse(() =>
              this.tsParseConstraintForInferType()
            )),
            (e.typeParameter = this.finishNode(t, 'TSTypeParameter')),
            this.finishNode(e, 'TSInferType')
          );
        }
        tsParseConstraintForInferType() {
          if (this.eat(77)) {
            let e = this.tsInDisallowConditionalTypesContext(() =>
              this.tsParseType()
            );
            if (this.state.inDisallowConditionalTypesContext || !this.match(13))
              return e;
          }
        }
        tsParseTypeOperatorOrHigher() {
          var e;
          return (e = this.state.type) >= 117 &&
            e <= 119 &&
            !this.state.containsEsc
            ? this.tsParseTypeOperator()
            : this.isContextual(111)
              ? this.tsParseInferType()
              : this.tsInAllowConditionalTypesContext(() =>
                  this.tsParseArrayTypeOrHigher()
                );
        }
        tsParseUnionOrIntersectionType(e, t, s) {
          let i = this.startNode(),
            r = this.eat(s),
            n = [];
          do n.push(t());
          while (this.eat(s));
          return 1 !== n.length || r
            ? ((i.types = n), this.finishNode(i, e))
            : n[0];
        }
        tsParseIntersectionTypeOrHigher() {
          return this.tsParseUnionOrIntersectionType(
            'TSIntersectionType',
            this.tsParseTypeOperatorOrHigher.bind(this),
            41
          );
        }
        tsParseUnionTypeOrHigher() {
          return this.tsParseUnionOrIntersectionType(
            'TSUnionType',
            this.tsParseIntersectionTypeOrHigher.bind(this),
            39
          );
        }
        tsIsStartOfFunctionType() {
          return (
            !!this.match(43) ||
            (this.match(6) &&
              this.tsLookAhead(
                this.tsIsUnambiguouslyStartOfFunctionType.bind(this)
              ))
          );
        }
        tsSkipParameterStart() {
          if (U(this.state.type) || this.match(74)) return (this.next(), !0);
          if (this.match(2)) {
            let { errors: e } = this.state,
              t = e.length;
            try {
              return (this.parseObjectLike(4, !0), e.length === t);
            } catch {
              return !1;
            }
          }
          if (this.match(0)) {
            this.next();
            let { errors: e } = this.state,
              t = e.length;
            try {
              return (super.parseBindingList(1, 93, 1), e.length === t);
            } catch {}
          }
          return !1;
        }
        tsIsUnambiguouslyStartOfFunctionType() {
          return (
            this.next(),
            !!(
              this.match(7) ||
              this.match(17) ||
              (this.tsSkipParameterStart() &&
                (this.match(10) ||
                  this.match(8) ||
                  this.match(13) ||
                  this.match(25) ||
                  (this.match(7) && (this.next(), this.match(15)))))
            )
          );
        }
        tsParseTypeOrTypePredicateAnnotation(e) {
          return this.tsInType(() => {
            let t = this.startNode();
            this.expect(e);
            let s = this.startNode(),
              i = !!this.tsTryParse(
                this.tsParseTypePredicateAsserts.bind(this)
              );
            if (i && this.match(74)) {
              let e = this.tsParseThisTypeOrThisTypePredicate();
              return (
                'TSThisType' === e.type
                  ? ((s.parameterName = e),
                    (s.asserts = !0),
                    (s.typeAnnotation = null),
                    (e = this.finishNode(s, 'TSTypePredicate')))
                  : (this.resetStartLocationFromNode(e, s), (e.asserts = !0)),
                (t.typeAnnotation = e),
                this.finishNode(t, 'TSTypeAnnotation')
              );
            }
            let r =
              this.tsIsIdentifier() &&
              this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
            if (!r)
              return i
                ? ((s.parameterName = this.parseIdentifier()),
                  (s.asserts = i),
                  (s.typeAnnotation = null),
                  (t.typeAnnotation = this.finishNode(s, 'TSTypePredicate')),
                  this.finishNode(t, 'TSTypeAnnotation'))
                : this.tsParseTypeAnnotation(!1, t);
            let n = this.tsParseTypeAnnotation(!1);
            return (
              (s.parameterName = r),
              (s.typeAnnotation = n),
              (s.asserts = i),
              (t.typeAnnotation = this.finishNode(s, 'TSTypePredicate')),
              this.finishNode(t, 'TSTypeAnnotation')
            );
          });
        }
        tsTryParseTypeOrTypePredicateAnnotation() {
          if (this.match(10))
            return this.tsParseTypeOrTypePredicateAnnotation(10);
        }
        tsTryParseTypeAnnotation() {
          if (this.match(10)) return this.tsParseTypeAnnotation();
        }
        tsTryParseType() {
          return this.tsEatThenParseType(10);
        }
        tsParseTypePredicatePrefix() {
          let e = this.parseIdentifier();
          if (this.isContextual(112) && !this.hasPrecedingLineBreak())
            return (this.next(), e);
        }
        tsParseTypePredicateAsserts() {
          if (105 !== this.state.type) return !1;
          let e = this.state.containsEsc;
          return (
            this.next(),
            (!!U(this.state.type) || !!this.match(74)) &&
              (e &&
                this.raise(
                  b.InvalidEscapedReservedWord,
                  this.state.lastTokStartLoc,
                  { reservedWord: 'asserts' }
                ),
              !0)
          );
        }
        tsParseTypeAnnotation(e = !0, t = this.startNode()) {
          return (
            this.tsInType(() => {
              (e && this.expect(10), (t.typeAnnotation = this.tsParseType()));
            }),
            this.finishNode(t, 'TSTypeAnnotation')
          );
        }
        tsParseType() {
          tr(this.state.inType);
          let e = this.tsParseNonConditionalType();
          if (
            this.state.inDisallowConditionalTypesContext ||
            this.hasPrecedingLineBreak() ||
            !this.eat(77)
          )
            return e;
          let t = this.startNodeAtNode(e);
          return (
            (t.checkType = e),
            (t.extendsType = this.tsInDisallowConditionalTypesContext(() =>
              this.tsParseNonConditionalType()
            )),
            this.expect(13),
            (t.trueType = this.tsInAllowConditionalTypesContext(() =>
              this.tsParseType()
            )),
            this.expect(10),
            (t.falseType = this.tsInAllowConditionalTypesContext(() =>
              this.tsParseType()
            )),
            this.finishNode(t, 'TSConditionalType')
          );
        }
        isAbstractConstructorSignature() {
          return this.isContextual(120) && this.isLookaheadContextual('new');
        }
        tsParseNonConditionalType() {
          return this.tsIsStartOfFunctionType()
            ? this.tsParseFunctionOrConstructorType('TSFunctionType')
            : this.match(73)
              ? this.tsParseFunctionOrConstructorType('TSConstructorType')
              : this.isAbstractConstructorSignature()
                ? this.tsParseFunctionOrConstructorType('TSConstructorType', !0)
                : this.tsParseUnionTypeOrHigher();
        }
        tsParseTypeAssertion() {
          this.getPluginOption('typescript', 'disallowAmbiguousJSXLike') &&
            this.raise(ta.ReservedTypeAssertion, this.state.startLoc);
          let e = this.startNode();
          return (
            (e.typeAnnotation = this.tsInType(
              () => (
                this.next(),
                this.match(71)
                  ? this.tsParseTypeReference()
                  : this.tsParseType()
              )
            )),
            this.expect(44),
            (e.expression = this.parseMaybeUnary()),
            this.finishNode(e, 'TSTypeAssertion')
          );
        }
        tsParseHeritageClause(e) {
          let t = this.state.startLoc,
            s = this.tsParseDelimitedList('HeritageClauseElement', () => {
              let t =
                ((this.state.canStartArrow = !1), super.parseExprSubscripts());
              (function e(t) {
                if (t.extra?.parenthesized) return !1;
                switch (t.type) {
                  case 'Identifier':
                    return !0;
                  case 'MemberExpression':
                    return !t.computed && e(t.object);
                  case 'TSInstantiationExpression':
                    return e(t.expression);
                  default:
                    return !1;
                }
              })(t) ||
                this.raise(ta.InvalidHeritageClauseType, t.start, { token: e });
              let s =
                'extends' === e ? 'TSInterfaceHeritage' : 'TSClassImplements';
              if ('TSInstantiationExpression' === t.type)
                return ((t.type = s), t);
              let i = this.startNodeAtNode(t);
              return (
                (i.expression = t),
                (this.match(43) || this.match(47)) &&
                  (i.typeArguments = this.tsParseTypeArgumentsInExpression()),
                this.finishNode(i, s)
              );
            });
          return (
            s.length || this.raise(ta.EmptyHeritageClauseType, t, { token: e }),
            s
          );
        }
        tsParseInterfaceDeclaration(e, t = {}) {
          if (this.hasFollowingLineBreak()) return null;
          (this.expectContextual(125),
            t.declare && (e.declare = !0),
            U(this.state.type)
              ? ((e.id = this.parseIdentifier()),
                this.checkIdentifier(e.id, 130))
              : ((e.id = null),
                this.raise(ta.MissingInterfaceName, this.state.startLoc)),
            (e.typeParameters = this.tsTryParseTypeParameters(
              this.tsParseInOutConstModifiers
            )),
            this.eat(77) &&
              (e.extends = this.tsParseHeritageClause('extends')));
          let s = this.startNode();
          return (
            (s.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this))),
            (e.body = this.finishNode(s, 'TSInterfaceBody')),
            this.finishNode(e, 'TSInterfaceDeclaration')
          );
        }
        tsParseTypeAliasDeclaration(e) {
          return (
            (e.id = this.parseIdentifier()),
            this.checkIdentifier(e.id, 2),
            (e.typeAnnotation = this.tsInType(() => {
              if (
                ((e.typeParameters = this.tsTryParseTypeParameters(
                  this.tsParseInOutModifiers
                )),
                this.expect(25),
                this.isContextual(110) && 46 !== this.lookaheadCharCode())
              ) {
                let e = this.startNode();
                return (this.next(), this.finishNode(e, 'TSIntrinsicKeyword'));
              }
              return this.tsParseType();
            })),
            this.semicolon(),
            this.finishNode(e, 'TSTypeAliasDeclaration')
          );
        }
        tsInTopLevelContext(e) {
          if (this.curContext() === q.brace) return e();
          {
            let t = this.state.context;
            this.state.context = [t[0]];
            try {
              return e();
            } finally {
              this.state.context = t;
            }
          }
        }
        tsInType(e) {
          let t = this.state.inType;
          this.state.inType = !0;
          try {
            return e();
          } finally {
            this.state.inType = t;
          }
        }
        tsInDisallowConditionalTypesContext(e) {
          let t = this.state.inDisallowConditionalTypesContext;
          this.state.inDisallowConditionalTypesContext = !0;
          try {
            return e();
          } finally {
            this.state.inDisallowConditionalTypesContext = t;
          }
        }
        tsInAllowConditionalTypesContext(e) {
          let t = this.state.inDisallowConditionalTypesContext;
          this.state.inDisallowConditionalTypesContext = !1;
          try {
            return e();
          } finally {
            this.state.inDisallowConditionalTypesContext = t;
          }
        }
        tsEatThenParseType(e) {
          if (this.match(e)) return this.tsNextThenParseType();
        }
        tsExpectThenParseType(e) {
          return this.tsInType(() => (this.expect(e), this.tsParseType()));
        }
        tsNextThenParseType() {
          return this.tsInType(() => (this.next(), this.tsParseType()));
        }
        tsParseEnumMember() {
          let e = this.startNode();
          return (
            (e.id = this.match(130)
              ? super.parseStringLiteral(this.state.value)
              : this.parseIdentifier(!0)),
            this.eat(25) && (e.initializer = super.parseMaybeAssignAllowIn()),
            this.finishNode(e, 'TSEnumMember')
          );
        }
        tsParseEnumDeclaration(e, t = {}) {
          return (
            t.const && (e.const = !0),
            t.declare && (e.declare = !0),
            this.expectContextual(122),
            (e.id = this.parseIdentifier()),
            this.checkIdentifier(e.id, e.const ? 8971 : 8459),
            (e.body = this.tsParseEnumBody()),
            this.finishNode(e, 'TSEnumDeclaration')
          );
        }
        tsParseEnumBody() {
          let e = this.startNode();
          return (
            this.expect(2),
            (e.members = this.tsParseDelimitedList(
              'EnumMembers',
              this.tsParseEnumMember.bind(this)
            )),
            this.expect(4),
            this.finishNode(e, 'TSEnumBody')
          );
        }
        tsParseModuleBlock(e) {
          let t = this.startNode();
          return (
            e || this.scope.enter(0),
            this.expect(2),
            super.parseBlockOrModuleBlockBody((t.body = []), void 0, !0, 4),
            e || this.scope.exit(),
            this.finishNode(t, 'TSModuleBlock')
          );
        }
        tsParseNamespaceDeclaration(e) {
          return (
            (e.id = this.tsParseEntityName(0)),
            'Identifier' === e.id.type && this.checkIdentifier(e.id, 1024),
            this.scope.enter(2048),
            this.prodParam.enter(0),
            (e.body = this.tsParseModuleBlock(!1)),
            this.prodParam.exit(),
            this.scope.exit(),
            this.finishNode(e, 'TSModuleDeclaration')
          );
        }
        tsParseAmbientExternalModuleDeclaration(e) {
          let t = this.isContextual(108);
          return (
            t
              ? ((e.kind = 'global'), (e.id = this.parseIdentifier()))
              : ((e.kind = 'module'),
                (e.id = super.parseStringLiteral(this.state.value))),
            this.match(2)
              ? (t || this.scope.enter(1024),
                this.prodParam.enter(0),
                (e.body = this.tsParseModuleBlock(t)),
                this.prodParam.exit(),
                t || this.scope.exit())
              : this.semicolon(),
            this.finishNode(e, 'TSModuleDeclaration')
          );
        }
        tsParseImportEqualsDeclaration(e, t) {
          ((e.id = t || this.parseIdentifier()),
            this.checkIdentifier(e.id, 4096),
            this.expect(25));
          let s = this.tsParseModuleReference();
          return (
            'type' === e.importKind &&
              'TSExternalModuleReference' !== s.type &&
              this.raise(ta.ImportAliasHasImportType, s),
            (e.moduleReference = s),
            this.semicolon(),
            this.finishNode(e, 'TSImportEqualsDeclaration')
          );
        }
        tsIsExternalModuleReference() {
          return this.isContextual(115) && 40 === this.lookaheadCharCode();
        }
        tsParseModuleReference() {
          return this.tsIsExternalModuleReference()
            ? this.tsParseExternalModuleReference()
            : this.tsParseEntityName(0);
        }
        tsParseExternalModuleReference() {
          let e = this.startNode();
          return (
            this.expectContextual(115),
            this.expect(6),
            this.match(130) || this.unexpected(),
            (e.expression = super.parseExprAtom()),
            this.expect(7),
            (this.sawUnambiguousESM = !0),
            this.finishNode(e, 'TSExternalModuleReference')
          );
        }
        tsLookAhead(e) {
          let t = this.state.clone(),
            s = e();
          return ((this.state = t), s);
        }
        tsTryParseAndCatch(e) {
          let t = this.tryParse(t => e() || t());
          if (!(t.aborted || !t.node))
            return (t.error && (this.state = t.failState), t.node);
        }
        tsTryParse(e) {
          let t = this.state.clone(),
            s = e();
          if (void 0 !== s && !1 !== s) return s;
          this.state = t;
        }
        tsTryParseDeclare(e) {
          if (this.isLineTerminator()) return;
          let t = this.state.type;
          return this.tsInAmbientContext(() => {
            switch (t) {
              case 64:
                return (
                  (e.declare = !0),
                  super.parseFunctionStatement(e, !1, !1)
                );
              case 76:
                return ((e.declare = !0), this.parseClass(e, !0, !1));
              case 122:
                return this.tsParseEnumDeclaration(e, { declare: !0 });
              case 108:
                return this.tsParseAmbientExternalModuleDeclaration(e);
              case 96:
                if (this.state.containsEsc) return;
              case 71:
              case 70:
                return this.match(71) && this.isLookaheadContextual('enum')
                  ? (this.expect(71),
                    this.tsParseEnumDeclaration(e, { const: !0, declare: !0 }))
                  : ((e.declare = !0),
                    this.parseVarStatement(e, this.state.value, !0));
              case 103:
                if (this.isUsing())
                  return (
                    this.raise(
                      ta.InvalidModifierOnUsingDeclaration,
                      this.state.startLoc,
                      'declare'
                    ),
                    (e.declare = !0),
                    this.parseVarStatement(e, 'using', !0)
                  );
                break;
              case 92:
                if (this.isAwaitUsing())
                  return (
                    this.raise(
                      ta.InvalidModifierOnAwaitUsingDeclaration,
                      this.state.startLoc,
                      'declare'
                    ),
                    (e.declare = !0),
                    this.next(),
                    this.parseVarStatement(e, 'await using', !0)
                  );
                break;
              case 125: {
                let t = this.tsParseInterfaceDeclaration(e, { declare: !0 });
                if (t) return t;
              }
              default:
                if (U(t))
                  return this.tsParseDeclaration(e, this.state.type, !0, null);
            }
          });
        }
        tsTryParseExportDeclaration() {
          return this.tsParseDeclaration(
            this.startNode(),
            this.state.type,
            !0,
            null
          );
        }
        tsParseDeclaration(e, t, s, i) {
          switch (t) {
            case 120:
              if (
                this.tsCheckLineTerminator(s) &&
                (this.match(76) || U(this.state.type))
              )
                return this.tsParseAbstractDeclaration(e, i);
              break;
            case 123:
              if (this.tsCheckLineTerminator(s))
                return this.tsParseAmbientExternalModuleDeclaration(e);
              break;
            case 124:
              if (this.tsCheckLineTerminator(s) && U(this.state.type))
                return (
                  (e.kind = 'namespace'),
                  this.tsParseNamespaceDeclaration(e)
                );
              break;
            case 126:
              if (this.tsCheckLineTerminator(s) && U(this.state.type))
                return this.tsParseTypeAliasDeclaration(e);
          }
        }
        tsCheckLineTerminator(e) {
          return e
            ? !this.hasFollowingLineBreak() && (this.next(), !0)
            : !this.isLineTerminator();
        }
        tsTryParseGenericAsyncArrowFunction(e) {
          if (!this.match(43)) return;
          let t = this.tsTryParseAndCatch(() => {
            let t = this.startNodeAt(e);
            return (
              (t.typeParameters = this.tsParseTypeParameters(
                this.tsParseConstModifier
              )),
              super.parseFunctionParams(t),
              (t.returnType = this.tsTryParseTypeOrTypePredicateAnnotation()),
              this.expect(15),
              t
            );
          });
          if (t) return super.parseArrowExpression(t, null, !0);
        }
        tsParseTypeArgumentsInExpression() {
          if (43 === this.reScan_lt()) return this.tsParseTypeArguments();
        }
        tsParseTypeArguments() {
          let e = this.startNode();
          return (
            (e.params = this.tsInType(() =>
              this.tsInTopLevelContext(
                () => (
                  this.expect(43),
                  this.tsParseDelimitedList(
                    'TypeParametersOrArguments',
                    this.tsParseType.bind(this)
                  )
                )
              )
            )),
            0 === e.params.length
              ? this.raise(ta.EmptyTypeArguments, e)
              : this.state.inType ||
                this.curContext() !== q.brace ||
                this.reScan_lt_gt(),
            this.expect(44),
            this.finishNode(e, 'TSTypeParameterInstantiation')
          );
        }
        tsIsDeclarationStart() {
          var e;
          return (e = this.state.type) >= 120 && e <= 126;
        }
        isExportDefaultSpecifier() {
          return (
            !this.tsIsDeclarationStart() && super.isExportDefaultSpecifier()
          );
        }
        parseBindingElement(e, t) {
          let s = t.length ? null : this.state.startLoc,
            i = {};
          this.tsParseModifiers(
            {
              allowedModifiers: [
                'public',
                'private',
                'protected',
                'override',
                'readonly'
              ]
            },
            i
          );
          let r = i.accessibility,
            n = i.override,
            o = i.readonly;
          !(4 & e) &&
            (r || o || n) &&
            this.raise(ta.UnexpectedParameterModifier, s || t[0]);
          let h = this.state.startLoc,
            p = this.parseMaybeDefault(h);
          2 & e && this.parseFunctionParamType(p);
          let l = this.parseMaybeDefault(h, p);
          if (r || o || n) {
            let e = s ? this.startNodeAt(s) : this.startNodeAtNode(t[0]);
            return (
              t.length ? (e.decorators = t) : this.setLoc(s),
              r && (e.accessibility = r),
              o && (e.readonly = o),
              n && (e.override = n),
              'Identifier' !== l.type &&
                'AssignmentPattern' !== l.type &&
                this.raise(ta.UnsupportedParameterPropertyKind, s || t[0]),
              (e.parameter = l),
              this.finishNode(e, 'TSParameterProperty')
            );
          }
          return (t.length && (p.decorators = t), l);
        }
        isSimpleParameter(e) {
          return (
            ('TSParameterProperty' === e.type &&
              super.isSimpleParameter(e.parameter)) ||
            super.isSimpleParameter(e)
          );
        }
        tsDisallowOptionalPattern(e) {
          for (let t of e.params)
            'Identifier' !== t.type &&
              t.optional &&
              !this.state.isAmbientContext &&
              this.raise(ta.PatternIsOptional, t);
        }
        setArrowFunctionParameters(e, t, s) {
          (super.setArrowFunctionParameters(e, t, s),
            this.tsDisallowOptionalPattern(e));
        }
        parseFunctionBodyAndFinish(e, t, s = !1) {
          this.match(10) &&
            (e.returnType = this.tsParseTypeOrTypePredicateAnnotation(10));
          let i =
            'FunctionDeclaration' === t
              ? 'TSDeclareFunction'
              : 'ClassMethod' === t || 'ClassPrivateMethod' === t
                ? 'TSDeclareMethod'
                : void 0;
          if (i && !this.match(2) && this.isLineTerminator()) {
            if ('TSDeclareMethod' === i && 'constructor' === e.kind)
              for (let t of e.params)
                'TSParameterProperty' === t.type
                  ? this.raise(ta.UnexpectedParameterModifier, t)
                  : 'AssignmentPattern' === t.type &&
                    this.raise(ta.UnexpectedParameterInitializer, t);
            else
              for (let t of e.params)
                'AssignmentPattern' === t.type &&
                  this.raise(ta.UnexpectedParameterInitializer, t);
            return this.finishNode(e, i);
          }
          return i &&
            this.state.isAmbientContext &&
            (this.raise(
              ta.DeclareFunctionHasImplementation,
              this.state.startLoc
            ),
            'TSDeclareFunction' === i && e.declare)
            ? super.parseFunctionBodyAndFinish(e, i, s)
            : (this.tsDisallowOptionalPattern(e),
              super.parseFunctionBodyAndFinish(e, t, s));
        }
        registerFunctionStatementId(e) {
          !e.body && e.id
            ? this.checkIdentifier(e.id, 1024)
            : super.registerFunctionStatementId(e);
        }
        tsCheckForInvalidTypeCasts(e) {
          e.forEach(e => {
            e?.type === 'TSTypeCastExpression' &&
              this.raise(ta.UnexpectedTypeAnnotation, e.typeAnnotation);
          });
        }
        toReferencedList(e, t) {
          return (this.tsCheckForInvalidTypeCasts(e), e);
        }
        parseArrayLike(e, t) {
          let s = super.parseArrayLike(e, t);
          return (
            'ArrayExpression' === s.type &&
              this.tsCheckForInvalidTypeCasts(s.elements),
            s
          );
        }
        parseSubscript(e, t, s, i) {
          if (!this.hasPrecedingLineBreak() && this.match(31)) {
            ((this.state.canStartJSXElement = !1), this.next());
            let s = this.startNodeAt(t);
            return (
              (s.expression = e),
              this.finishNode(s, 'TSNonNullExpression')
            );
          }
          let r = !1;
          if (this.match(14) && 60 === this.lookaheadCharCode()) {
            if (s) return ((i.stop = !0), e);
            ((i.optionalChainMember = r = !0), this.next());
          }
          if (this.match(43) || this.match(47)) {
            let n,
              o = this.tsTryParseAndCatch(() => {
                if (!s && this.atPossibleAsyncArrow(e)) {
                  let e = this.tsTryParseGenericAsyncArrowFunction(t);
                  if (e) return ((i.stop = !0), e);
                }
                let o = this.tsParseTypeArgumentsInExpression();
                if (!o) return;
                if (r && !this.match(6)) {
                  n = this.state.curPosition();
                  return;
                }
                if (H(this.state.type)) {
                  let s = super.parseTaggedTemplateExpression(e, t, i);
                  return ((s.typeArguments = o), s);
                }
                if (!s && this.eat(6)) {
                  let s = this.startNodeAt(t);
                  return (
                    (s.callee = e),
                    (s.arguments = this.parseCallExpressionArguments()),
                    this.tsCheckForInvalidTypeCasts(s.arguments),
                    (s.typeArguments = o),
                    i.optionalChainMember && (s.optional = r),
                    this.finishCallExpression(s, i.optionalChainMember)
                  );
                }
                let h = this.state.type;
                if (
                  44 === h ||
                  48 === h ||
                  (6 !== h &&
                    89 !== h &&
                    116 !== h &&
                    M[h] &&
                    !this.hasPrecedingLineBreak())
                )
                  return;
                let p = this.startNodeAt(t);
                return (
                  (p.expression = e),
                  (p.typeArguments = o),
                  this.finishNode(p, 'TSInstantiationExpression')
                );
              });
            if ((n && this.unexpected(n, 6), o))
              return (
                'TSInstantiationExpression' === o.type &&
                  ((this.match(12) ||
                    (this.match(14) && 40 !== this.lookaheadCharCode())) &&
                    this.raise(
                      ta.InvalidPropertyAccessAfterInstantiationExpression,
                      this.state.startLoc
                    ),
                  this.match(12) ||
                    this.match(14) ||
                    (o.expression = super.stopParseSubscript(e, i))),
                o
              );
          }
          return super.parseSubscript(e, t, s, i);
        }
        parseNewCallee(e) {
          super.parseNewCallee(e);
          let { callee: t } = e;
          'TSInstantiationExpression' !== t.type ||
            t.extra?.parenthesized ||
            ((e.typeArguments = t.typeArguments), (e.callee = t.expression));
        }
        parseExprOp(e, t, s) {
          let i;
          if (
            v[54] > s &&
            !this.hasPrecedingLineBreak() &&
            (this.isContextual(89) || (i = this.isContextual(116)))
          ) {
            let r = this.startNodeAt(t);
            ((r.expression = e),
              (r.typeAnnotation = this.tsInType(
                () => (
                  this.next(),
                  this.match(71)
                    ? (i &&
                        this.raise(b.UnexpectedKeyword, this.state.startLoc, {
                          keyword: 'const'
                        }),
                      this.tsParseTypeReference())
                    : this.tsParseType()
                )
              )));
            let n = this.finishNode(
              r,
              i ? 'TSSatisfiesExpression' : 'TSAsExpression'
            );
            return (this.reScan_lt_gt(), this.parseExprOp(n, t, s));
          }
          return super.parseExprOp(e, t, s);
        }
        checkReservedWord(e, t, s, i) {
          this.state.isAmbientContext || super.checkReservedWord(e, t, s, i);
        }
        checkDuplicateExports() {}
        isPotentialImportPhase(e) {
          if (super.isPotentialImportPhase(e)) return !0;
          if (this.isContextual(126)) {
            let t = this.lookaheadCharCode();
            return e ? 123 === t || 42 === t : 61 !== t;
          }
          return !e && this.isContextual(83);
        }
        applyImportPhase(e, t, s, i) {
          (super.applyImportPhase(e, t, s, i),
            t
              ? (e.exportKind = 'type' === s ? 'type' : 'value')
              : (e.importKind = 'type' === s || 'typeof' === s ? s : 'value'));
        }
        parseImport(e) {
          let t;
          if (this.match(130))
            return (
              (e.importKind = 'value'),
              this.scope.inTSNamespace && this.raise(ta.ImportInTSNamespace, e),
              super.parseImport(e)
            );
          if (U(this.state.type) && 61 === this.lookaheadCharCode()) {
            e.importKind = 'value';
            let t = this.tsParseImportEqualsDeclaration(e);
            return (
              this.scope.inTSNamespace &&
                'TSExternalModuleReference' === t.moduleReference.type &&
                this.raise(ta.ImportInTSNamespace, e),
              t
            );
          }
          if (this.isContextual(126)) {
            let s = this.parseMaybeImportPhase(e, !1);
            if (61 === this.lookaheadCharCode())
              return (
                this.scope.inTSNamespace &&
                  this.raise(ta.ImportInTSNamespace, e),
                this.tsParseImportEqualsDeclaration(e, s)
              );
            t = super.parseImportSpecifiersAndAfter(e, s);
          } else t = super.parseImport(e);
          return (
            'type' === t.importKind &&
            t.specifiers.length > 1 &&
            'ImportDefaultSpecifier' === t.specifiers[0].type
              ? this.raise(ta.TypeImportCannotSpecifyDefaultAndNamed, t)
              : this.scope.inTSNamespace &&
                this.raise(ta.ImportInTSNamespace, t),
            t
          );
        }
        parseExport(e, t) {
          if (this.match(79)) {
            let t = this.startNode();
            this.next();
            let s = null;
            this.isContextual(126) && this.isPotentialImportPhase(!1)
              ? (s = this.parseMaybeImportPhase(t, !1))
              : (t.importKind = 'value');
            let i = this.tsParseImportEqualsDeclaration(t, s);
            return (
              (e.attributes = []),
              (e.declaration = i),
              (e.exportKind = 'value'),
              (e.source = null),
              (e.specifiers = []),
              this.finishNode(e, 'ExportNamedDeclaration')
            );
          }
          if (this.eat(25))
            return (
              (e.expression = super.parseExpression()),
              this.semicolon(),
              (this.sawUnambiguousESM = !0),
              this.scope.inTSNamespace &&
                this.raise(ta.ExportAssignmentInTSNamespace, e),
              this.finishNode(e, 'TSExportAssignment')
            );
          if (this.eatContextual(89))
            return (
              this.expectContextual(124),
              (e.id = this.parseIdentifier()),
              this.checkIdentifier(e.id, 8201),
              this.semicolon(),
              this.scope.inTSNamespace &&
                this.raise(ta.NamespaceExportInTSNamespace, e),
              this.finishNode(e, 'TSNamespaceExportDeclaration')
            );
          {
            let s = super.parseExport(e, t);
            return (
              this.scope.inTSNamespace &&
                ('ExportNamedDeclaration' !== s.type ||
                  s.source ||
                  (!s.declaration && !this.state.isAmbientContext)) &&
                this.raise(ta.ExportInTSNamespace, s),
              s
            );
          }
        }
        isAbstractClass() {
          return this.isContextual(120) && this.isLookaheadContextual('class');
        }
        parseExportDefaultExpression() {
          if (this.isAbstractClass()) {
            let e = this.startNode();
            return (this.next(), (e.abstract = !0), this.parseClass(e, !0, !0));
          }
          if (this.match(125)) {
            let e = this.tsParseInterfaceDeclaration(this.startNode());
            if (e) return e;
          }
          return super.parseExportDefaultExpression();
        }
        parseVarStatement(e, t, s = !1) {
          let { isAmbientContext: i } = this.state,
            r = super.parseVarStatement(e, t, s || i);
          if (!i) return r;
          if (!e.declare && ('using' === t || 'await using' === t))
            return (
              this.raiseOverwrite(ta.UsingDeclarationInAmbientContext, e, t),
              r
            );
          for (let { id: e, init: s } of r.declarations)
            s &&
              ('var' === t || 'let' === t || e.typeAnnotation
                ? this.raise(ta.InitializerNotAllowedInAmbientContext, s)
                : (function (e, t) {
                    let { type: s } = e;
                    if (e.extra?.parenthesized) return !1;
                    if (t) {
                      if ('Literal' === s) {
                        let { value: t } = e;
                        if ('string' == typeof t || 'boolean' == typeof t)
                          return !0;
                      }
                    } else if ('StringLiteral' === s || 'BooleanLiteral' === s)
                      return !0;
                    return !!(
                      th(e, t) ||
                      (function (e, t) {
                        if ('UnaryExpression' === e.type) {
                          let { operator: s, argument: i } = e;
                          if ('-' === s && th(i, t)) return !0;
                        }
                        return !1;
                      })(e, t) ||
                      ('TemplateLiteral' === s && 0 === e.expressions.length) ||
                      (function (e) {
                        if ('MemberExpression' !== e.type) return !1;
                        let { computed: t, property: s } = e;
                        return (
                          (!t ||
                            'StringLiteral' === s.type ||
                            ('TemplateLiteral' === s.type &&
                              !(s.expressions.length > 0))) &&
                          (function e(t) {
                            return (
                              'Identifier' === t.type ||
                              ('MemberExpression' === t.type &&
                                !t.computed &&
                                e(t.object))
                            );
                          })(e.object)
                        );
                      })(e)
                    );
                  })(s, this.hasPlugin('estree')) ||
                  this.raise(
                    ta.ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference,
                    s
                  ));
          return r;
        }
        parseStatementContent(e, t) {
          let s = !!(2 & e);
          if (!this.state.containsEsc)
            switch (this.state.type) {
              case 71:
                if (this.isLookaheadContextual('enum')) {
                  let e = this.startNode();
                  return (
                    this.next(),
                    this.tsParseEnumDeclaration(e, { const: !0 })
                  );
                }
                break;
              case 120:
              case 121:
                if (
                  this.nextTokenIsIdentifierAndNotTSRelationalOperatorOnSameLine()
                ) {
                  let e = this.state.type,
                    s = this.startNode();
                  this.next();
                  let i =
                    121 === e
                      ? this.tsTryParseDeclare(s)
                      : this.tsParseAbstractDeclaration(s, t);
                  return i
                    ? (121 === e && (i.declare = !0), i)
                    : ((s.expression = this.createIdentifier(
                        this.startNodeAtNode(s),
                        121 === e ? 'declare' : 'abstract'
                      )),
                      this.semicolon(!1),
                      this.finishNode(s, 'ExpressionStatement'));
                }
                break;
              case 122:
                return this.tsParseEnumDeclaration(this.startNode());
              case 108:
                if (123 === this.lookaheadCharCode()) {
                  let e = this.startNode();
                  return this.tsParseAmbientExternalModuleDeclaration(e);
                }
                break;
              case 125: {
                let e = this.tsParseInterfaceDeclaration(this.startNode());
                if (e)
                  return (
                    s ||
                      this.raise(ta.UnexpectedTypeDeclaration, e, 'interface'),
                    e
                  );
                break;
              }
              case 123:
                if (this.nextTokenIsStringLiteralOnSameLine()) {
                  let e = this.startNode();
                  return (this.next(), this.tsParseDeclaration(e, 123, !1, t));
                }
                if (this.nextTokenIsIdentifierOnSameLine()) {
                  this.raise(
                    ta.InlineModuleDeclarationMustUseString,
                    this.state.startLoc
                  );
                  let e = this.startNode();
                  return (this.next(), this.tsParseDeclaration(e, 124, !1, t));
                }
                break;
              case 124:
                if (this.nextTokenIsIdentifierOnSameLine()) {
                  let e = this.startNode();
                  return (this.next(), this.tsParseDeclaration(e, 124, !1, t));
                }
                break;
              case 126:
                if (this.nextTokenIsIdentifierOnSameLine()) {
                  let e = this.startNode();
                  return (
                    s || this.raise(ta.UnexpectedTypeDeclaration, e, 'type'),
                    this.next(),
                    this.tsParseTypeAliasDeclaration(e)
                  );
                }
            }
          return super.parseStatementContent(e, t);
        }
        parseAccessModifier() {
          return this.tsParseModifier(['public', 'protected', 'private']);
        }
        tsHasSomeModifiers(e, t) {
          return t.some(t => (tn(t) ? e.accessibility === t : !!e[t]));
        }
        tsIsStartOfStaticBlocks() {
          return this.isContextual(102) && 123 === this.lookaheadCharCode();
        }
        parseClassMember(e, t, s) {
          let i = [
            'declare',
            'private',
            'public',
            'protected',
            'override',
            'abstract',
            'readonly',
            'static'
          ];
          this.tsParseModifiers(
            {
              allowedModifiers: i,
              disallowedModifiers: ['in', 'out'],
              stopOnStartOfClassStaticBlock: !0,
              errorTemplate: ta.InvalidModifierOnTypeParameterPositions
            },
            t
          );
          let r = () => {
            this.tsIsStartOfStaticBlocks()
              ? (this.next(),
                this.next(),
                this.tsHasSomeModifiers(t, i) &&
                  this.raise(
                    ta.StaticBlockCannotHaveModifier,
                    this.state.curPosition()
                  ),
                super.parseClassStaticBlock(e, t))
              : this.parseClassMemberWithIsStatic(e, t, s, !!t.static);
          };
          (t.declare ? this.tsInAmbientContext(r) : r(),
            t.decorators &&
              t.decorators.length > 0 &&
              !this.hasPlugin('decorators-legacy') &&
              ('TSAbstractMethodDefinition' === t.type ||
              'TSDeclareMethod' === t.type
                ? this.raise(ta.DecoratorAbstractMethod, t, {
                    kind: 'abstract method'
                  })
                : (('ClassProperty' === t.type && t.abstract) ||
                    ('ClassProperty' === t.type && t.declare) ||
                    'TSAbstractPropertyDefinition' === t.type ||
                    ('PropertyDefinition' === t.type && t.declare)) &&
                  this.raise(ta.DecoratorAbstractMethod, t, {
                    kind: t.declare ? 'declare field' : 'abstract field'
                  })));
        }
        parseClassMemberWithIsStatic(e, t, s, i) {
          let r = this.tsTryParseIndexSignature(t);
          if (r) {
            (e.body.push(r),
              t.abstract && this.raise(ta.IndexSignatureHasAbstract, t),
              t.accessibility &&
                this.raise(ta.IndexSignatureHasAccessibility, t, {
                  modifier: t.accessibility
                }),
              t.declare && this.raise(ta.IndexSignatureHasDeclare, t),
              t.override && this.raise(ta.IndexSignatureHasOverride, t));
            return;
          }
          (!this.state.inAbstractClass &&
            t.abstract &&
            this.raise(ta.NonAbstractClassHasAbstractMethod, t),
            t.override &&
              (s.hadSuperClass || this.raise(ta.OverrideNotInSubClass, t)),
            super.parseClassMemberWithIsStatic(e, t, s, i));
        }
        parsePostMemberNameModifiers(e) {
          (this.eat(13) && (e.optional = !0),
            e.readonly &&
              this.match(6) &&
              this.raise(ta.ClassMethodHasReadonly, e),
            e.declare &&
              this.match(6) &&
              this.raise(ta.ClassMethodHasDeclare, e));
        }
        shouldParseExportDeclaration() {
          return (
            !!this.tsIsDeclarationStart() ||
            super.shouldParseExportDeclaration()
          );
        }
        parseConditional(e, t, s) {
          if (!this.match(13)) return e;
          if (null != s) {
            let t = this.lookaheadCharCode();
            if (44 === t || 61 === t || 58 === t || 41 === t)
              return (this.setOptionalParametersError(s), e);
          }
          this.next();
          let i = this.startNodeAt(t);
          i.test = e;
          let r = this.state.inConditionalConsequent;
          return (
            (this.state.inConditionalConsequent = !0),
            (i.consequent = this.parseMaybeAssignAllowIn()),
            (this.state.inConditionalConsequent = r),
            this.expect(10),
            (i.alternate = this.parseMaybeAssign()),
            this.finishNode(i, 'ConditionalExpression')
          );
        }
        parseParenItem(e, t) {
          let s = super.parseParenItem(e, t);
          if (
            (this.eat(13) && ((s.optional = !0), this.resetEndLocation(e)),
            this.match(10))
          ) {
            let s = this.startNodeAt(t);
            return (
              (s.expression = e),
              (s.typeAnnotation = this.tsParseTypeAnnotation()),
              this.finishNode(s, 'TSTypeCastExpression')
            );
          }
          return e;
        }
        parseExportDeclaration(e) {
          if (!this.state.isAmbientContext && this.isContextual(121))
            return this.tsInAmbientContext(() =>
              this.parseExportDeclaration(e)
            );
          let t = this.state.startLoc,
            s = this.eatContextual(121);
          if (
            s &&
            (this.isContextual(121) || !this.shouldParseExportDeclaration())
          )
            throw this.raise(
              ta.ExpectedAmbientAfterExportDeclare,
              this.state.startLoc
            );
          let i =
            (U(this.state.type) && this.tsTryParseExportDeclaration()) ||
            super.parseExportDeclaration(e);
          return i
            ? (('TSInterfaceDeclaration' === i.type ||
                'TSTypeAliasDeclaration' === i.type ||
                s) &&
                (e.exportKind = 'type'),
              s &&
                'TSImportEqualsDeclaration' !== i.type &&
                (this.resetStartLocation(i, t), (i.declare = !0)),
              i)
            : null;
        }
        parseClassId(e, t, s, i) {
          if ((!t || s) && this.isContextual(109)) {
            e.id = null;
            return;
          }
          super.parseClassId(e, t, s, e.declare ? 1024 : 8331);
          let r = this.tsTryParseTypeParameters(
            this.tsParseInOutConstModifiers
          );
          r && (e.typeParameters = r);
        }
        parseClassPropertyAnnotation(e) {
          e.optional ||
            (this.eat(31)
              ? (e.definite = !0)
              : this.eat(13) && (e.optional = !0));
          let t = this.tsTryParseTypeAnnotation();
          t && (e.typeAnnotation = t);
        }
        parseClassProperty(e) {
          if (
            (this.parseClassPropertyAnnotation(e),
            this.state.isAmbientContext &&
              !(e.readonly && !e.typeAnnotation) &&
              this.match(25) &&
              this.raise(
                ta.DeclareClassFieldHasInitializer,
                this.state.startLoc
              ),
            e.abstract && this.match(25))
          ) {
            let { key: t } = e;
            this.raise(ta.AbstractPropertyHasInitializer, this.state.startLoc, {
              propertyName:
                'Identifier' !== t.type || e.computed
                  ? `[${this.input.slice(this.offsetToSourcePos(t.start), this.offsetToSourcePos(t.end))}]`
                  : t.name
            });
          }
          return super.parseClassProperty(e);
        }
        parseClassPrivateProperty(e) {
          return (
            e.abstract && this.raise(ta.PrivateElementHasAbstract, e),
            e.accessibility &&
              this.raise(ta.PrivateElementHasAccessibility, e, {
                modifier: e.accessibility
              }),
            this.parseClassPropertyAnnotation(e),
            super.parseClassPrivateProperty(e)
          );
        }
        parseClassAccessorProperty(e) {
          return (
            this.parseClassPropertyAnnotation(e),
            e.optional && this.raise(ta.AccessorCannotBeOptional, e),
            super.parseClassAccessorProperty(e)
          );
        }
        pushClassMethod(e, t, s, i, r, n) {
          let o = this.tsTryParseTypeParameters(this.tsParseConstModifier);
          o && r && this.raise(ta.ConstructorHasTypeParameters, o);
          let { declare: h = !1, kind: p } = t;
          (h &&
            ('get' === p || 'set' === p) &&
            this.raise(ta.DeclareAccessor, t, { kind: p }),
            o && (t.typeParameters = o),
            super.pushClassMethod(e, t, s, i, r, n));
        }
        pushClassPrivateMethod(e, t, s, i) {
          let r = this.tsTryParseTypeParameters(this.tsParseConstModifier);
          (r && (t.typeParameters = r),
            super.pushClassPrivateMethod(e, t, s, i));
        }
        declareClassPrivateMethodInScope(e, t) {
          'TSDeclareMethod' !== e.type &&
            (('MethodDefinition' === e.type && null == e.value.body) ||
              super.declareClassPrivateMethodInScope(e, t));
        }
        parseClassSuper(e) {
          if ((super.parseClassSuper(e), e.superClass))
            if ('TSInstantiationExpression' === e.superClass.type) {
              let t = e.superClass,
                s = t.expression;
              this.takeSurroundingComments(s, s.start, s.end);
              let i = t.typeArguments;
              (this.takeSurroundingComments(i, i.start, i.end),
                (e.superClass = s),
                (e.superTypeArguments = i));
            } else
              (this.match(43) || this.match(47)) &&
                (e.superTypeArguments =
                  this.tsParseTypeArgumentsInExpression());
          this.eatContextual(109) &&
            (e.implements = this.tsParseHeritageClause('implements'));
        }
        parseObjPropValue(e, t, s, i, r, n, o) {
          let h = this.tsTryParseTypeParameters(this.tsParseConstModifier);
          return (
            h && (e.typeParameters = h),
            super.parseObjPropValue(e, t, s, i, r, n, o)
          );
        }
        parseFunctionParams(e, t) {
          let s = this.tsTryParseTypeParameters(this.tsParseConstModifier);
          (s && (e.typeParameters = s), super.parseFunctionParams(e, t));
        }
        parseVarId(e, t) {
          (super.parseVarId(e, t),
            'Identifier' === e.id.type &&
              !this.hasPrecedingLineBreak() &&
              this.eat(31) &&
              (e.definite = !0));
          let s = this.tsTryParseTypeAnnotation();
          s && ((e.id.typeAnnotation = s), this.resetEndLocation(e.id));
        }
        parseAsyncArrowFromCallExpression(e, t) {
          return (
            this.match(10) && (e.returnType = this.tsParseTypeAnnotation()),
            super.parseAsyncArrowFromCallExpression(e, t)
          );
        }
        parseMaybeAssign(e, t) {
          let s, i, r;
          if (this.hasPlugin('jsx') && (this.match(138) || this.match(43))) {
            if (
              ((s = this.state.clone()),
              !(i = this.tryParse(() => super.parseMaybeAssign(e, t), s)).error)
            )
              return i.node;
            let { context: r } = this.state,
              n = r[r.length - 1];
            (n === q.j_oTag || n === q.j_expr) && r.pop();
          }
          if (!i?.error && !this.match(43)) return super.parseMaybeAssign(e, t);
          (s && s !== this.state) || (s = this.state.clone());
          let n,
            o = this.tryParse(s => {
              n = this.tsParseTypeParameters(this.tsParseConstModifier);
              let i = super.parseMaybeAssign(e, t);
              if (
                (('ArrowFunctionExpression' !== i.type ||
                  i.extra?.parenthesized) &&
                  s(),
                n?.params.length !== 0 && this.resetStartLocationFromNode(i, n),
                (i.typeParameters = n),
                this.hasPlugin('jsx') &&
                  1 === i.typeParameters.params.length &&
                  !i.typeParameters.extra?.trailingComma)
              ) {
                let e = i.typeParameters.params[0];
                e.constraint ||
                  this.raise(
                    ta.SingleTypeParameterWithoutTrailingComma,
                    256 & this.optionFlags ? m(e.loc.end, 1) : e,
                    { typeParameterName: e.name.name }
                  );
              }
              return i;
            }, s);
          if (!o.error && !o.aborted)
            return (n && this.reportReservedArrowTypeParam(n), o.node);
          if (
            !i &&
            (tr(!this.hasPlugin('jsx')),
            !(r = this.tryParse(() => super.parseMaybeAssign(e, t), s)).error)
          )
            return r.node;
          if (i?.node) return ((this.state = i.failState), i.node);
          if (o.node)
            return (
              (this.state = o.failState),
              n && this.reportReservedArrowTypeParam(n),
              o.node
            );
          if (r?.node) return ((this.state = r.failState), r.node);
          throw i?.error || o.error || r?.error;
        }
        reportReservedArrowTypeParam(e) {
          1 === e.params.length &&
            !e.params[0].constraint &&
            !e.extra?.trailingComma &&
            this.getPluginOption('typescript', 'disallowAmbiguousJSXLike') &&
            this.raise(ta.ReservedArrowTypeParam, e);
        }
        parseMaybeUnary(e, t) {
          return !this.hasPlugin('jsx') && this.match(43)
            ? this.tsParseTypeAssertion()
            : super.parseMaybeUnary(e, t);
        }
        parseArrow(e) {
          if (this.match(10)) {
            let t = this.tryParse(e => {
              let t = this.tsParseTypeOrTypePredicateAnnotation(10);
              return ((this.canInsertSemicolon() || !this.match(15)) && e(), t);
            });
            if (t.aborted) return;
            t.thrown ||
              (t.error && (this.state = t.failState), (e.returnType = t.node));
          }
          return super.parseArrow(e);
        }
        parseFunctionParamType(e) {
          this.eat(13) && (e.optional = !0);
          let t = this.tsTryParseTypeAnnotation();
          return (t && (e.typeAnnotation = t), this.resetEndLocation(e), e);
        }
        isAssignable(e, t) {
          switch (e.type) {
            case 'TSTypeCastExpression':
              return this.isAssignable(e.expression, t);
            case 'TSParameterProperty':
              return !0;
            default:
              return super.isAssignable(e, t);
          }
        }
        toAssignable(e, t = !1) {
          switch (e.type) {
            case 'ParenthesizedExpression':
              this.toAssignableParenthesizedExpression(e, t);
              break;
            case 'TSAsExpression':
            case 'TSSatisfiesExpression':
            case 'TSNonNullExpression':
            case 'TSTypeAssertion':
              (t
                ? this.expressionScope.recordArrowParameterBindingError(
                    ta.UnexpectedTypeCastInParameter,
                    e
                  )
                : this.raise(ta.UnexpectedTypeCastInParameter, e),
                this.toAssignable(e.expression, t));
              break;
            case 'AssignmentExpression':
              t ||
                'TSTypeCastExpression' !== e.left.type ||
                (e.left = this.typeCastToParameter(e.left));
            default:
              super.toAssignable(e, t);
          }
        }
        toAssignableParenthesizedExpression(e, t) {
          switch (e.expression.type) {
            case 'TSAsExpression':
            case 'TSSatisfiesExpression':
            case 'TSNonNullExpression':
            case 'TSTypeAssertion':
            case 'ParenthesizedExpression':
              this.toAssignable(e.expression, t);
              break;
            default:
              super.toAssignable(e, t);
          }
        }
        checkToRestConversion(e, t) {
          switch (e.type) {
            case 'TSAsExpression':
            case 'TSSatisfiesExpression':
            case 'TSTypeAssertion':
            case 'TSNonNullExpression':
              this.checkToRestConversion(e.expression, !1);
              break;
            default:
              super.checkToRestConversion(e, t);
          }
        }
        isValidLVal(e, t, s, i) {
          switch (e) {
            case 'TSTypeCastExpression':
              return !0;
            case 'TSParameterProperty':
              return 'parameter';
            case 'TSNonNullExpression':
              return 'expression';
            case 'TSAsExpression':
            case 'TSSatisfiesExpression':
            case 'TSTypeAssertion':
              return (64 !== i || !s) && ['expression', !0];
            default:
              return super.isValidLVal(e, t, s, i);
          }
        }
        parseBindingAtom() {
          return 74 === this.state.type
            ? this.parseIdentifier(!0)
            : super.parseBindingAtom();
        }
        parseMaybeDecoratorArguments(e, t) {
          if (this.match(43) || this.match(47)) {
            let s = this.tsParseTypeArgumentsInExpression();
            if (this.match(6)) {
              let i = super.parseMaybeDecoratorArguments(e, t);
              return ((i.typeArguments = s), i);
            }
            this.unexpected(null, 6);
          }
          return super.parseMaybeDecoratorArguments(e, t);
        }
        checkCommaAfterRest(e) {
          return this.state.isAmbientContext &&
            this.match(8) &&
            this.lookaheadCharCode() === e
            ? (this.next(), !1)
            : super.checkCommaAfterRest(e);
        }
        isClassMethod() {
          return this.match(43) || super.isClassMethod();
        }
        isClassProperty() {
          return this.match(31) || this.match(10) || super.isClassProperty();
        }
        parseMaybeDefault(e, t) {
          let s = super.parseMaybeDefault(e, t);
          return (
            'AssignmentPattern' === s.type &&
              s.typeAnnotation &&
              s.right.start < s.typeAnnotation.start &&
              this.raise(ta.TypeAnnotationAfterAssign, s.typeAnnotation),
            s
          );
        }
        getTokenFromCode(e) {
          if (this.state.inType) {
            if (62 === e) return void this.finishOp(44, 1);
            if (60 === e) return void this.finishOp(43, 1);
          }
          super.getTokenFromCode(e);
        }
        reScan_lt_gt() {
          let { type: e } = this.state;
          43 === e
            ? ((this.state.pos -= 1), this.readToken_lt())
            : 44 === e && ((this.state.pos -= 1), this.readToken_gt());
        }
        reScan_lt() {
          let { type: e } = this.state;
          return 47 === e
            ? ((this.state.pos -= 2), this.finishOp(43, 1), 43)
            : e;
        }
        toAssignableListItem(e, t, s) {
          let i = e[t];
          ('TSTypeCastExpression' === i.type &&
            (e[t] = this.typeCastToParameter(i)),
            super.toAssignableListItem(e, t, s));
        }
        typeCastToParameter(e) {
          return (
            (e.expression.typeAnnotation = e.typeAnnotation),
            this.resetEndLocationFromNode(e.expression, e.typeAnnotation),
            e.expression
          );
        }
        shouldParseArrow(e) {
          return this.match(10)
            ? e.every(e => this.isAssignable(e, !0))
            : super.shouldParseArrow(e);
        }
        shouldParseAsyncArrow() {
          return this.match(10)
            ? !this.state.inConditionalConsequent
            : super.shouldParseAsyncArrow();
        }
        parseParenAndDistinguishExpression(e) {
          let t = this.state.inConditionalConsequent;
          this.state.inConditionalConsequent = !1;
          let s = super.parseParenAndDistinguishExpression(e);
          return ((this.state.inConditionalConsequent = t), s);
        }
        canHaveLeadingDecorator() {
          return super.canHaveLeadingDecorator() || this.isAbstractClass();
        }
        jsxParseOpeningElementAfterName(e) {
          if (this.match(43) || this.match(47)) {
            let t = this.tsTryParseAndCatch(() =>
              this.tsParseTypeArgumentsInExpression()
            );
            t && (e.typeArguments = t);
          }
          return super.jsxParseOpeningElementAfterName(e);
        }
        getGetterSetterExpectedParamCount(e) {
          let t = super.getGetterSetterExpectedParamCount(e),
            s = this.getObjectOrClassMethodParams(e)[0];
          return s && this.isThisParam(s) ? t + 1 : t;
        }
        parseCatchClauseParam() {
          let e = super.parseCatchClauseParam(),
            t = this.tsTryParseTypeAnnotation();
          return (t && ((e.typeAnnotation = t), this.resetEndLocation(e)), e);
        }
        tsInAmbientContext(e) {
          let { isAmbientContext: t, strict: s } = this.state;
          ((this.state.isAmbientContext = !0), (this.state.strict = !1));
          try {
            return e();
          } finally {
            ((this.state.isAmbientContext = t), (this.state.strict = s));
          }
        }
        parseClass(e, t, s) {
          let i = this.state.inAbstractClass;
          this.state.inAbstractClass = !!e.abstract;
          try {
            return super.parseClass(e, t, s);
          } finally {
            this.state.inAbstractClass = i;
          }
        }
        tsParseAbstractDeclaration(e, t) {
          if (this.match(76))
            return (
              (e.abstract = !0),
              this.maybeTakeDecorators(t, this.parseClass(e, !0, !1))
            );
          if (this.isContextual(125))
            return this.hasFollowingLineBreak()
              ? null
              : ((e.abstract = !0),
                this.raise(ta.NonClassMethodPropertyHasAbstractModifier, e),
                this.tsParseInterfaceDeclaration(e));
          throw this.unexpected(null, 76);
        }
        parseMethod(e, t, s, i, r, n, o) {
          let h = super.parseMethod(e, t, s, i, r, n, o);
          if (
            (h.abstract || 'TSAbstractMethodDefinition' === h.type) &&
            (this.hasPlugin('estree') ? h.value : h).body
          ) {
            let { key: e } = h;
            this.raise(ta.AbstractMethodHasImplementation, h, {
              methodName:
                'Identifier' !== e.type || h.computed
                  ? `[${this.input.slice(this.offsetToSourcePos(e.start), this.offsetToSourcePos(e.end))}]`
                  : e.name
            });
          }
          return h;
        }
        tsParseTypeParameterName() {
          return this.parseIdentifier();
        }
        shouldParseAsAmbientContext() {
          return !!this.getPluginOption('typescript', 'dts');
        }
        parse() {
          return (
            this.shouldParseAsAmbientContext() &&
              (this.state.isAmbientContext = !0),
            super.parse()
          );
        }
        getExpression() {
          return (
            this.shouldParseAsAmbientContext() &&
              (this.state.isAmbientContext = !0),
            super.getExpression()
          );
        }
        parseExportSpecifier(e, t, s, i) {
          return !t && i
            ? (this.parseTypeOnlyImportExportSpecifier(e, !1, s),
              this.finishNode(e, 'ExportSpecifier'))
            : ((e.exportKind = 'value'),
              super.parseExportSpecifier(e, t, s, i));
        }
        parseImportSpecifier(e, t, s, i, r) {
          return !t && i
            ? (this.parseTypeOnlyImportExportSpecifier(e, !0, s),
              this.finishNode(e, 'ImportSpecifier'))
            : ((e.importKind = 'value'),
              super.parseImportSpecifier(e, t, s, i, s ? 4098 : 4096));
        }
        parseTypeOnlyImportExportSpecifier(e, t, s) {
          let i = t ? 'imported' : 'local',
            r = t ? 'local' : 'exported',
            n = e[i],
            o,
            h = !1,
            p = !0,
            l = n.start;
          if (this.isContextual(89)) {
            let e = this.parseIdentifier();
            if (this.isContextual(89)) {
              let s = this.parseIdentifier();
              (R(this.state.type)
                ? ((h = !0),
                  (n = e),
                  (o = t
                    ? this.parseIdentifier()
                    : this.parseModuleExportName()))
                : (o = s),
                (p = !1));
            } else
              R(this.state.type)
                ? ((p = !1),
                  (o = t
                    ? this.parseIdentifier()
                    : this.parseModuleExportName()))
                : ((h = !0), (n = e));
          } else
            R(this.state.type) &&
              ((h = !0),
              t
                ? ((n = this.parseIdentifier(!0)),
                  this.isContextual(89) ||
                    this.checkReservedWord(n.name, n.start, !0, !0))
                : (n = this.parseModuleExportName()));
          (h &&
            s &&
            this.raise(
              t
                ? ta.TypeModifierIsUsedInTypeImports
                : ta.TypeModifierIsUsedInTypeExports,
              l
            ),
            (e[i] = n),
            (e[r] = o),
            (e[t ? 'importKind' : 'exportKind'] = h ? 'type' : 'value'),
            p &&
              this.eatContextual(89) &&
              (e[r] = t
                ? this.parseIdentifier()
                : this.parseModuleExportName()),
            e[r] || (e[r] = this.cloneIdentifier(e[i])),
            t && this.checkIdentifier(e[r], h ? 4098 : 4096));
        }
        fillOptionalPropertiesForTSESLint(e) {
          switch (e.type) {
            case 'ExpressionStatement':
              e.directive ?? (e.directive = void 0);
              return;
            case 'RestElement':
              e.value = void 0;
            case 'Identifier':
            case 'ArrayPattern':
            case 'AssignmentPattern':
            case 'ObjectPattern':
              (e.decorators ?? (e.decorators = []),
                e.optional ?? (e.optional = !1),
                e.typeAnnotation ?? (e.typeAnnotation = void 0));
              return;
            case 'TSParameterProperty':
              (e.accessibility ?? (e.accessibility = void 0),
                e.decorators ?? (e.decorators = []),
                e.override ?? (e.override = !1),
                e.readonly ?? (e.readonly = !1),
                e.static ?? (e.static = !1));
              return;
            case 'TSEmptyBodyFunctionExpression':
              e.body = null;
            case 'TSDeclareFunction':
            case 'FunctionDeclaration':
            case 'FunctionExpression':
            case 'ClassMethod':
            case 'ClassPrivateMethod':
              (e.declare ?? (e.declare = !1),
                e.returnType ?? (e.returnType = void 0),
                e.typeParameters ?? (e.typeParameters = void 0));
              return;
            case 'Property':
              e.optional ?? (e.optional = !1);
              return;
            case 'TSMethodSignature':
            case 'TSPropertySignature':
              e.optional ?? (e.optional = !1);
            case 'TSIndexSignature':
              (e.accessibility ?? (e.accessibility = void 0),
                e.readonly ?? (e.readonly = !1),
                e.static ?? (e.static = !1));
              return;
            case 'TSAbstractPropertyDefinition':
            case 'PropertyDefinition':
            case 'TSAbstractAccessorProperty':
            case 'AccessorProperty':
              (e.declare ?? (e.declare = !1),
                e.definite ?? (e.definite = !1),
                e.readonly ?? (e.readonly = !1),
                e.typeAnnotation ?? (e.typeAnnotation = void 0));
            case 'TSAbstractMethodDefinition':
            case 'MethodDefinition':
              (e.accessibility ?? (e.accessibility = void 0),
                e.decorators ?? (e.decorators = []),
                e.override ?? (e.override = !1),
                e.optional ?? (e.optional = !1));
              return;
            case 'ClassExpression':
              e.id ?? (e.id = null);
            case 'ClassDeclaration':
              (e.abstract ?? (e.abstract = !1),
                e.declare ?? (e.declare = !1),
                e.decorators ?? (e.decorators = []),
                e.implements ?? (e.implements = []),
                e.superTypeArguments ?? (e.superTypeArguments = void 0),
                e.typeParameters ?? (e.typeParameters = void 0));
              return;
            case 'TSTypeAliasDeclaration':
            case 'VariableDeclaration':
              e.declare ?? (e.declare = !1);
              return;
            case 'VariableDeclarator':
              e.definite ?? (e.definite = !1);
              return;
            case 'TSEnumDeclaration':
              (e.const ?? (e.const = !1), e.declare ?? (e.declare = !1));
              return;
            case 'TSEnumMember':
              e.computed ?? (e.computed = !1);
              return;
            case 'TSImportType':
              (e.qualifier ?? (e.qualifier = null),
                e.options ?? (e.options = null),
                e.typeArguments ?? (e.typeArguments = null));
              return;
            case 'TSInterfaceDeclaration':
              (e.declare ?? (e.declare = !1), e.extends ?? (e.extends = []));
              return;
            case 'TSMappedType':
              (e.optional ?? (e.optional = !1),
                e.readonly ?? (e.readonly = void 0));
              return;
            case 'TSModuleDeclaration':
              (e.declare ?? (e.declare = !1),
                e.global ?? (e.global = 'global' === e.kind));
              return;
            case 'TSTypeParameter':
              (e.const ?? (e.const = !1),
                e.in ?? (e.in = !1),
                e.out ?? (e.out = !1));
              return;
          }
        }
        chStartsBindingIdentifierAndNotRelationalOperator(e, t) {
          if (!Q(e)) return 92 === e;
          if (((ti.lastIndex = t), ti.test(this.input))) {
            let e = this.codePointAtPos(ti.lastIndex);
            if (!Z(e) && 92 !== e) return !1;
          }
          return !0;
        }
        nextTokenIsIdentifierAndNotTSRelationalOperatorOnSameLine() {
          let e = this.nextTokenInLineStart(),
            t = this.codePointAtPos(e);
          return this.chStartsBindingIdentifierAndNotRelationalOperator(t, e);
        }
        nextTokenIsStringLiteralOnSameLine() {
          let e = this.nextTokenInLineStart(),
            t = this.codePointAtPos(e);
          return 34 === t || 39 === t;
        }
      };
    function th(e, t) {
      return t
        ? 'Literal' === e.type && ('number' == typeof e.value || 'bigint' in e)
        : 'NumericLiteral' === e.type || 'BigIntLiteral' === e.type;
    }
    var tp = T`placeholders`({
        ClassNameIsRequired: 'A class name is required.',
        UnexpectedSpace: 'Unexpected space in placeholder.'
      }),
      tl = ['fsharp', 'hack'],
      tc = ['^^', '@@', '^', '%', '#'],
      tu = {
        estree: e =>
          class extends e {
            createPosition(e) {
              return new u(e.line, e.column);
            }
            parse() {
              let e = super.parse();
              return (
                512 & this.optionFlags && (e.tokens = e.tokens.map(A)),
                A(e)
              );
            }
            parseRegExpLiteral({ pattern: e, flags: t }) {
              let s = null;
              try {
                s = new RegExp(e, t);
              } catch {}
              let i = this.estreeParseLiteral(s);
              return ((i.regex = { pattern: e, flags: t }), i);
            }
            parseBigIntLiteral(e) {
              let t;
              try {
                t = BigInt(e);
              } catch {
                t = null;
              }
              let s = this.estreeParseLiteral(t);
              return ((s.bigint = String(s.value || e)), s);
            }
            estreeParseLiteral(e) {
              return this.parseLiteral(e, 'Literal');
            }
            parseStringLiteral(e) {
              return this.estreeParseLiteral(e);
            }
            parseNumericLiteral(e) {
              return this.estreeParseLiteral(e);
            }
            parseNullLiteral() {
              return this.estreeParseLiteral(null);
            }
            parseBooleanLiteral(e) {
              return this.estreeParseLiteral(e);
            }
            estreeParseChainExpression(e, t) {
              let s = this.startNodeAtNode(e);
              return (
                (s.expression = e),
                this.finishNodeAtNode(s, 'ChainExpression', t)
              );
            }
            directiveToStmt(e) {
              let t = e.value;
              (delete e.value,
                this.castNodeTo(t, 'Literal'),
                (t.raw = t.extra.raw),
                (t.value = t.extra.expressionValue));
              let s = this.castNodeTo(e, 'ExpressionStatement');
              return (
                (s.expression = t),
                (s.directive = t.extra.rawValue),
                delete t.extra,
                s
              );
            }
            fillOptionalPropertiesForTSESLint(e) {}
            cloneEstreeStringLiteral(e) {
              let { start: t, end: s, loc: i, range: r, raw: n, value: o } = e,
                h = Object.create(e.constructor.prototype);
              return (
                (h.type = 'Literal'),
                (h.start = t),
                (h.end = s),
                (h.loc = i),
                (h.range = r),
                (h.raw = n),
                (h.value = o),
                h
              );
            }
            initFunction(e, t) {
              (super.initFunction(e, t), (e.expression = !1));
            }
            checkDeclaration(e) {
              null != e && this.isObjectProperty(e)
                ? this.checkDeclaration(e.value)
                : super.checkDeclaration(e);
            }
            getObjectOrClassMethodParams(e) {
              return e.value.params;
            }
            isValidDirective(e) {
              return (
                'ExpressionStatement' === e.type &&
                'Literal' === e.expression.type &&
                'string' == typeof e.expression.value &&
                !e.expression.extra?.parenthesized
              );
            }
            parseBlockBody(e, t, s, i, r) {
              super.parseBlockBody(e, t, s, i, r);
              let n = e.directives.map(e => this.directiveToStmt(e));
              ((e.body = n.concat(e.body)), delete e.directives);
            }
            parsePrivateName() {
              let e = super.parsePrivateName();
              return this.convertPrivateNameToPrivateIdentifier(e);
            }
            convertPrivateNameToPrivateIdentifier(e) {
              let t = super.getPrivateNameSV(e);
              return (
                delete e.id,
                (e.name = t),
                this.castNodeTo(e, 'PrivateIdentifier')
              );
            }
            isPrivateName(e) {
              return 'PrivateIdentifier' === e.type;
            }
            getPrivateNameSV(e) {
              return e.name;
            }
            parseLiteral(e, t) {
              let s = super.parseLiteral(e, t);
              return ((s.raw = s.extra.raw), delete s.extra, s);
            }
            parseFunctionBody(e, t, s = !1) {
              (super.parseFunctionBody(e, t, s),
                (e.expression = 'BlockStatement' !== e.body.type));
            }
            parseMethod(e, t, s, i, r, n, o = !1) {
              let h = this.startNode();
              ((h.kind = e.kind),
                (h = super.parseMethod(h, t, s, i, r, n, o)),
                delete h.kind);
              let { typeParameters: p } = e;
              return (
                p &&
                  (delete e.typeParameters,
                  (h.typeParameters = p),
                  this.resetStartLocationFromNode(h, p)),
                (e.value = this.castNodeTo(
                  h,
                  this.hasPlugin('typescript') && !h.body
                    ? 'TSEmptyBodyFunctionExpression'
                    : 'FunctionExpression'
                )),
                'ClassPrivateMethod' === n && (e.computed = !1),
                this.hasPlugin('typescript') && e.abstract
                  ? (delete e.abstract,
                    this.finishNode(e, 'TSAbstractMethodDefinition'))
                  : 'ObjectMethod' === n
                    ? ('method' === e.kind && (e.kind = 'init'),
                      (e.shorthand = !1),
                      this.finishNode(e, 'Property'))
                    : this.finishNode(e, 'MethodDefinition')
              );
            }
            nameIsConstructor(e) {
              return 'Literal' === e.type
                ? 'constructor' === e.value
                : super.nameIsConstructor(e);
            }
            parseClassProperty(...e) {
              let t = super.parseClassProperty(...e);
              return (
                t.abstract && this.hasPlugin('typescript')
                  ? (delete t.abstract,
                    this.castNodeTo(t, 'TSAbstractPropertyDefinition'))
                  : this.castNodeTo(t, 'PropertyDefinition'),
                t
              );
            }
            parseClassPrivateProperty(...e) {
              let t = super.parseClassPrivateProperty(...e);
              return (
                t.abstract && this.hasPlugin('typescript')
                  ? this.castNodeTo(t, 'TSAbstractPropertyDefinition')
                  : this.castNodeTo(t, 'PropertyDefinition'),
                (t.computed = !1),
                t
              );
            }
            parseClassAccessorProperty(e) {
              let t = super.parseClassAccessorProperty(e);
              return (
                t.abstract && this.hasPlugin('typescript')
                  ? (delete t.abstract,
                    this.castNodeTo(t, 'TSAbstractAccessorProperty'))
                  : this.castNodeTo(t, 'AccessorProperty'),
                t
              );
            }
            parseObjectProperty(e, t, s, i) {
              let r = super.parseObjectProperty(e, t, s, i);
              return (
                r && ((r.kind = 'init'), this.castNodeTo(r, 'Property')),
                r
              );
            }
            finishObjectProperty(e) {
              return ((e.kind = 'init'), this.finishNode(e, 'Property'));
            }
            isValidLVal(e, t, s, i) {
              return 'Property' === e ? 'value' : super.isValidLVal(e, t, s, i);
            }
            isAssignable(e, t) {
              return null != e && this.isObjectProperty(e)
                ? this.isAssignable(e.value, t)
                : super.isAssignable(e, t);
            }
            toAssignable(e, t = !1) {
              if (null != e && this.isObjectProperty(e)) {
                let { key: s, value: i } = e;
                (this.isPrivateName(s) &&
                  this.classScope.usePrivateName(
                    this.getPrivateNameSV(s),
                    s.start
                  ),
                  this.toAssignable(i, t));
              } else super.toAssignable(e, t);
            }
            toAssignableObjectExpressionProp(e, t, s) {
              'Property' === e.type && ('get' === e.kind || 'set' === e.kind)
                ? this.raise(b.PatternHasAccessor, e.key)
                : 'Property' === e.type && e.method
                  ? this.raise(b.PatternHasMethod, e.key)
                  : super.toAssignableObjectExpressionProp(e, t, s);
            }
            finishCallExpression(e, t) {
              let s = super.finishCallExpression(e, t);
              return (
                'Import' === s.callee.type
                  ? (this.castNodeTo(s, 'ImportExpression'),
                    (s.source = s.arguments[0]),
                    (s.options = s.arguments[1] ?? null),
                    delete s.arguments,
                    delete s.callee)
                  : 'OptionalCallExpression' === s.type
                    ? this.castNodeTo(s, 'CallExpression')
                    : (s.optional = !1),
                s
              );
            }
            parseExport(e, t) {
              let s = this.state.lastTokStartLoc,
                i = super.parseExport(e, t);
              switch (i.type) {
                case 'ExportAllDeclaration':
                  i.exported = null;
                  break;
                case 'ExportNamedDeclaration':
                  1 === i.specifiers.length &&
                    'ExportNamespaceSpecifier' === i.specifiers[0].type &&
                    (this.castNodeTo(i, 'ExportAllDeclaration'),
                    (i.exported = i.specifiers[0].exported),
                    delete i.specifiers);
                case 'ExportDefaultDeclaration': {
                  let { declaration: e } = i;
                  e?.type === 'ClassDeclaration' &&
                    e.decorators?.length > 0 &&
                    e.start === i.start &&
                    this.resetStartLocation(i, s);
                }
              }
              return i;
            }
            stopParseSubscript(e, t) {
              let s = super.stopParseSubscript(e, t);
              return t.optionalChainMember
                ? this.estreeParseChainExpression(s, e)
                : s;
            }
            parseMember(e, t, s, i, r) {
              let n = super.parseMember(e, t, s, i, r);
              return (
                'OptionalMemberExpression' === n.type
                  ? this.castNodeTo(n, 'MemberExpression')
                  : (n.optional = !1),
                n
              );
            }
            isOptionalMemberExpression(e) {
              return 'ChainExpression' === e.type
                ? 'MemberExpression' === e.expression.type
                : super.isOptionalMemberExpression(e);
            }
            hasPropertyAsPrivateName(e) {
              return (
                'ChainExpression' === e.type && (e = e.expression),
                super.hasPropertyAsPrivateName(e)
              );
            }
            isObjectProperty(e) {
              return 'Property' === e.type && 'init' === e.kind && !e.method;
            }
            isObjectMethod(e) {
              return (
                'Property' === e.type &&
                (e.method || 'get' === e.kind || 'set' === e.kind)
              );
            }
            castNodeTo(e, t) {
              let s = super.castNodeTo(e, t);
              return (this.fillOptionalPropertiesForTSESLint(s), s);
            }
            cloneIdentifier(e) {
              let t = super.cloneIdentifier(e);
              return (this.fillOptionalPropertiesForTSESLint(t), t);
            }
            cloneStringLiteral(e) {
              return 'Literal' === e.type
                ? this.cloneEstreeStringLiteral(e)
                : super.cloneStringLiteral(e);
            }
            finishNodeAt(e, t, s) {
              return A(super.finishNodeAt(e, t, s));
            }
            finishNodeAtNode(e, t, s) {
              return A(super.finishNodeAtNode(e, t, s));
            }
            finishNode(e, t) {
              let s = super.finishNode(e, t);
              return (this.fillOptionalPropertiesForTSESLint(s), s);
            }
            resetStartLocation(e, t) {
              (super.resetStartLocation(e, t), A(e));
            }
            resetEndLocation(e, t = this.state.lastTokEndLoc) {
              (super.resetEndLocation(e, t), A(e));
            }
          },
        jsx: e =>
          class extends e {
            jsxReadToken() {
              let e = '',
                t = this.state.pos;
              for (;;) {
                if (this.state.pos >= this.length)
                  throw this.raise(
                    eb.UnterminatedJsxContent,
                    this.state.startLoc
                  );
                let s = this.input.charCodeAt(this.state.pos);
                switch (s) {
                  case 60:
                  case 123:
                    if (this.state.pos === this.state.start)
                      return void (60 === s && this.state.canStartJSXElement
                        ? (++this.state.pos, this.finishToken(138))
                        : super.getTokenFromCode(s));
                    ((e += this.input.slice(t, this.state.pos)),
                      this.finishToken(137, e));
                    return;
                  case 38:
                    ((e += this.input.slice(t, this.state.pos)),
                      (e += this.jsxReadEntity()),
                      (t = this.state.pos));
                    break;
                  case 62:
                  case 125:
                    this.raise(eb.UnexpectedToken, this.state.curPosition(), {
                      unexpected: this.input[this.state.pos],
                      HTMLEntity: 125 === s ? '&rbrace;' : '&gt;'
                    });
                  default:
                    ex(s)
                      ? ((e += this.input.slice(t, this.state.pos)),
                        (e += this.jsxReadNewLine(!0)),
                        (t = this.state.pos))
                      : ++this.state.pos;
                }
              }
            }
            jsxReadNewLine(e) {
              let t = this.input.charCodeAt(this.state.pos),
                s;
              return (
                ++this.state.pos,
                13 === t && 10 === this.input.charCodeAt(this.state.pos)
                  ? (++this.state.pos,
                    (s = e
                      ? `
`
                      : `\r
`))
                  : (s = String.fromCharCode(t)),
                ++this.state.curLine,
                (this.state.lineStart = this.state.pos),
                s
              );
            }
            jsxReadString(e) {
              let t = '',
                s = ++this.state.pos;
              for (;;) {
                if (this.state.pos >= this.length)
                  throw this.raise(b.UnterminatedString, this.state.startLoc);
                let i = this.input.charCodeAt(this.state.pos);
                if (i === e) break;
                38 === i
                  ? ((t += this.input.slice(s, this.state.pos)),
                    (t += this.jsxReadEntity()),
                    (s = this.state.pos))
                  : ex(i)
                    ? ((t += this.input.slice(s, this.state.pos)),
                      (t += this.jsxReadNewLine(!1)),
                      (s = this.state.pos))
                    : ++this.state.pos;
              }
              ((t += this.input.slice(s, this.state.pos++)),
                this.finishToken(130, t));
            }
            jsxReadEntity() {
              let e = ++this.state.pos;
              if (35 === this.codePointAtPos(this.state.pos)) {
                ++this.state.pos;
                let e = 10;
                120 === this.codePointAtPos(this.state.pos) &&
                  ((e = 16), ++this.state.pos);
                let t = this.readInt(e, void 0, !1, 'bail');
                if (null !== t && 59 === this.codePointAtPos(this.state.pos))
                  return (++this.state.pos, String.fromCodePoint(t));
              } else {
                let t = 0,
                  s = !1;
                for (
                  ;
                  t++ < 10 &&
                  this.state.pos < this.length &&
                  !(s = 59 === this.codePointAtPos(this.state.pos));
                )
                  ++this.state.pos;
                if (s) {
                  let t;
                  if (
                    (this.input.slice(e, this.state.pos), ++this.state.pos, t)
                  )
                    return t;
                }
              }
              return ((this.state.pos = e), '&');
            }
            jsxReadWord() {
              let e,
                t = this.state.pos;
              do e = this.input.charCodeAt(++this.state.pos);
              while (Z(e) || 45 === e);
              this.finishToken(136, this.input.slice(t, this.state.pos));
            }
            jsxParseIdentifier() {
              let e = this.startNode();
              return (
                this.match(136)
                  ? (e.name = this.state.value)
                  : V(this.state.type)
                    ? (e.name = k[this.state.type])
                    : this.unexpected(),
                this.next(),
                this.finishNode(e, 'JSXIdentifier')
              );
            }
            jsxParseNamespacedName() {
              let e = this.state.startLoc,
                t = this.jsxParseIdentifier();
              if (!this.eat(10)) return t;
              let s = this.startNodeAt(e);
              return (
                (s.namespace = t),
                (s.name = this.jsxParseIdentifier()),
                this.finishNode(s, 'JSXNamespacedName')
              );
            }
            jsxParseElementName() {
              let e = this.state.startLoc,
                t = this.jsxParseNamespacedName();
              if ('JSXNamespacedName' === t.type) return t;
              for (; this.eat(12);) {
                let s = this.startNodeAt(e);
                ((s.object = t),
                  (s.property = this.jsxParseIdentifier()),
                  (t = this.finishNode(s, 'JSXMemberExpression')));
              }
              return t;
            }
            jsxParseAttributeValue() {
              let e;
              switch (this.state.type) {
                case 2:
                  return (
                    (e = this.startNode()),
                    this.setContext(q.brace),
                    this.next(),
                    'JSXEmptyExpression' ===
                      (e = this.jsxParseExpressionContainer(e, q.j_oTag))
                        .expression.type && this.raise(eb.AttributeIsEmpty, e),
                    e
                  );
                case 138:
                case 130:
                  return this.parseExprAtom();
                default:
                  throw this.raise(eb.UnsupportedJsxValue, this.state.startLoc);
              }
            }
            jsxParseEmptyExpression() {
              let e = this.startNodeAt(this.state.lastTokEndLoc);
              return this.finishNodeAt(
                e,
                'JSXEmptyExpression',
                this.state.startLoc
              );
            }
            jsxParseSpreadChild(e) {
              return (
                this.next(),
                (e.expression = this.parseExpression()),
                this.setContext(q.j_expr),
                (this.state.canStartJSXElement = !0),
                this.expect(4),
                this.finishNode(e, 'JSXSpreadChild')
              );
            }
            jsxParseExpressionContainer(e, t) {
              if (this.match(4)) e.expression = this.jsxParseEmptyExpression();
              else {
                let t = this.parseExpression();
                ('SequenceExpression' !== t.type ||
                  t.extra?.parenthesized ||
                  this.raise(eb.UnexpectedSequenceExpression, t.expressions[1]),
                  (e.expression = t));
              }
              return (
                this.setContext(t),
                (this.state.canStartJSXElement = !0),
                this.expect(4),
                this.finishNode(e, 'JSXExpressionContainer')
              );
            }
            jsxParseAttribute() {
              if (this.match(2)) {
                let e = this.startNode();
                return (
                  this.setContext(q.brace),
                  this.next(),
                  this.expect(17),
                  (e.argument = this.parseMaybeAssignAllowIn()),
                  this.setContext(q.j_oTag),
                  (this.state.canStartJSXElement = !0),
                  this.expect(4),
                  this.finishNode(e, 'JSXSpreadAttribute')
                );
              }
              let e = this.startNode();
              return (
                (e.name = this.jsxParseNamespacedName()),
                (e.value = this.eat(25) ? this.jsxParseAttributeValue() : null),
                this.finishNode(e, 'JSXAttribute')
              );
            }
            jsxParseOpeningElementAt(e) {
              if (this.eat(139)) {
                let t = this.startNodeAt(e);
                return this.finishNode(t, 'JSXOpeningFragment');
              }
              let t = this.startNodeAt(e);
              return (
                (t.name = this.jsxParseElementName()),
                this.jsxParseOpeningElementAfterName(t)
              );
            }
            jsxParseOpeningElementAfterName(e) {
              let t = [];
              for (; !this.match(52) && !this.match(139);)
                t.push(this.jsxParseAttribute());
              return (
                (e.attributes = t),
                (e.selfClosing = this.eat(52)),
                this.expect(139),
                this.finishNode(e, 'JSXOpeningElement')
              );
            }
            jsxParseClosingElementAt(e) {
              if (this.eat(139)) {
                let t = this.startNodeAt(e);
                return this.finishNode(t, 'JSXClosingFragment');
              }
              let t = this.startNodeAt(e);
              return (
                (t.name = this.jsxParseElementName()),
                this.expect(139),
                this.finishNode(t, 'JSXClosingElement')
              );
            }
            jsxParseElementAt(e) {
              let t = this.startNodeAt(e),
                s = [],
                i = this.jsxParseOpeningElementAt(e),
                r = null;
              if (!i.selfClosing) {
                e: for (;;)
                  switch (this.state.type) {
                    case 138:
                      if (
                        ((e = this.state.startLoc), this.next(), this.eat(52))
                      ) {
                        (this.setLoc(e),
                          (r = this.jsxParseClosingElementAt(e)));
                        break e;
                      }
                      s.push(this.jsxParseElementAt(e));
                      break;
                    case 137:
                      s.push(this.parseLiteral(this.state.value, 'JSXText'));
                      break;
                    case 2: {
                      let e = this.startNode();
                      (this.setContext(q.brace),
                        this.next(),
                        this.match(17)
                          ? s.push(this.jsxParseSpreadChild(e))
                          : s.push(
                              this.jsxParseExpressionContainer(e, q.j_expr)
                            ));
                      break;
                    }
                    default:
                      this.unexpected();
                  }
                eA(i) && !eA(r) && null !== r
                  ? this.raise(eb.MissingClosingTagFragment, r)
                  : !eA(i) && eA(r)
                    ? this.raise(eb.MissingClosingTagElement, r, {
                        openingTagName: eS(i.name)
                      })
                    : eA(i) ||
                      eA(r) ||
                      eS(r.name) === eS(i.name) ||
                      this.raise(eb.MissingClosingTagElement, r, {
                        openingTagName: eS(i.name)
                      });
              }
              if (
                (eA(i)
                  ? ((t.openingFragment = i), (t.closingFragment = r))
                  : ((t.openingElement = i), (t.closingElement = r)),
                (t.children = s),
                this.match(43))
              )
                throw this.raise(
                  eb.UnwrappedAdjacentJSXElements,
                  this.state.startLoc
                );
              return eA(i)
                ? this.finishNode(t, 'JSXFragment')
                : this.finishNode(t, 'JSXElement');
            }
            jsxParseElement() {
              let e = this.state.startLoc;
              return (this.next(), this.jsxParseElementAt(e));
            }
            setContext(e) {
              let { context: t } = this.state;
              t[t.length - 1] = e;
            }
            parseExprAtom(e) {
              return this.match(138)
                ? this.jsxParseElement()
                : this.match(43) && 33 !== this.input.charCodeAt(this.state.pos)
                  ? (this.replaceToken(138), this.jsxParseElement())
                  : super.parseExprAtom(e);
            }
            skipSpace() {
              this.curContext().preserveSpace || super.skipSpace();
            }
            getTokenFromCode(e) {
              let t = this.curContext();
              if (t === q.j_expr) return void this.jsxReadToken();
              if (t === q.j_oTag || t === q.j_cTag) {
                if (Q(e)) return void this.jsxReadWord();
                if (62 === e) {
                  (++this.state.pos, this.finishToken(139));
                  return;
                }
                if ((34 === e || 39 === e) && t === q.j_oTag)
                  return void this.jsxReadString(e);
              }
              if (
                60 === e &&
                this.state.canStartJSXElement &&
                33 !== this.input.charCodeAt(this.state.pos + 1)
              ) {
                (++this.state.pos, this.finishToken(138));
                return;
              }
              super.getTokenFromCode(e);
            }
            updateContext(e) {
              let { context: t, type: s } = this.state;
              if (52 === s && 138 === e)
                (t.splice(-2, 2, q.j_cTag),
                  (this.state.canStartJSXElement = !1));
              else if (138 === s) t.push(q.j_oTag);
              else if (139 === s) {
                let s = t[t.length - 1];
                (s === q.j_oTag && 52 === e) || s === q.j_cTag
                  ? (t.pop(),
                    (this.state.canStartJSXElement =
                      t[t.length - 1] === q.j_expr))
                  : (this.setContext(q.j_expr),
                    (this.state.canStartJSXElement = !0));
              } else this.state.canStartJSXElement = L[s];
            }
          },
        flow: e =>
          class extends e {
            flowPragma = void 0;
            getScopeHandler() {
              return el;
            }
            shouldParseTypes() {
              return (
                this.getPluginOption('flow', 'all') ||
                'flow' === this.flowPragma
              );
            }
            finishToken(e, t) {
              (130 !== e &&
                9 !== e &&
                24 !== e &&
                void 0 === this.flowPragma &&
                (this.flowPragma = null),
                super.finishToken(e, t));
            }
            addComment(e) {
              if (void 0 === this.flowPragma) {
                let t = ef.exec(e.value);
                if (t)
                  if ('flow' === t[1]) this.flowPragma = 'flow';
                  else if ('noflow' === t[1]) this.flowPragma = 'noflow';
                  else throw Error('Unexpected flow pragma');
              }
              super.addComment(e);
            }
            flowParseTypeInitialiser(e) {
              let t = this.state.inType;
              ((this.state.inType = !0), this.expect(e || 10));
              let s = this.flowParseType();
              return ((this.state.inType = t), s);
            }
            flowParsePredicate() {
              let e = this.startNode(),
                t = this.state.startLoc;
              return (
                this.next(),
                this.expectContextual(106),
                this.state.lastTokStartLoc.index > t.index + 1 &&
                  this.raise(eu.UnexpectedSpaceBetweenModuloChecks, t),
                this.eat(6)
                  ? ((e.value = super.parseExpression()),
                    this.expect(7),
                    this.finishNode(e, 'DeclaredPredicate'))
                  : this.finishNode(e, 'InferredPredicate')
              );
            }
            flowParseTypeAndPredicateInitialiser(e) {
              let t = this.state.inType;
              ((this.state.inType = !0), this.expect(10));
              let s = null,
                i = null;
              return (
                e && this.match(50)
                  ? ((this.state.inType = t), (i = this.flowParsePredicate()))
                  : ((s = this.flowParseType()),
                    (this.state.inType = t),
                    this.match(50) && (i = this.flowParsePredicate())),
                [s, i]
              );
            }
            flowParseDeclareClass(e) {
              return (
                this.next(),
                this.flowParseInterfaceish(e, !0),
                this.finishNode(e, 'DeclareClass')
              );
            }
            flowParseDeclareFunction(e) {
              this.next();
              let t = (e.id = this.parseIdentifier()),
                s = this.startNode(),
                i = this.startNode();
              (this.match(43)
                ? (s.typeParameters = this.flowParseTypeParameterDeclaration())
                : (s.typeParameters = null),
                this.expect(6));
              let r = this.flowParseFunctionTypeParams();
              return (
                (s.params = r.params),
                (s.rest = r.rest),
                (s.this = r._this),
                this.expect(7),
                ([s.returnType, e.predicate] =
                  this.flowParseTypeAndPredicateInitialiser(!1)),
                (i.typeAnnotation = this.finishNode(
                  s,
                  'FunctionTypeAnnotation'
                )),
                (t.typeAnnotation = this.finishNode(i, 'TypeAnnotation')),
                this.resetEndLocation(t),
                this.semicolon(),
                this.scope.declareName(e.id.name, 2048, e.id.start),
                this.finishNode(e, 'DeclareFunction')
              );
            }
            flowParseDeclare(e, t) {
              if (this.match(76)) return this.flowParseDeclareClass(e);
              if (this.match(64)) return this.flowParseDeclareFunction(e);
              if (this.match(70)) return this.flowParseDeclareVariable(e);
              if (this.eatContextual(123))
                return this.match(12)
                  ? this.flowParseDeclareModuleExports(e)
                  : (t &&
                      this.raise(
                        eu.NestedDeclareModule,
                        this.state.lastTokStartLoc
                      ),
                    this.flowParseDeclareModule(e));
              if (this.isContextual(126))
                return this.flowParseDeclareTypeAlias(e);
              if (this.isContextual(127))
                return this.flowParseDeclareOpaqueType(e);
              if (this.isContextual(125))
                return this.flowParseDeclareInterface(e);
              if (this.match(78))
                return this.flowParseDeclareExportDeclaration(e, t);
              throw this.unexpected();
            }
            flowParseDeclareVariable(e) {
              return (
                this.next(),
                (e.id = this.flowParseTypeAnnotatableIdentifier()),
                this.scope.declareName(e.id.name, 5, e.id.start),
                this.semicolon(),
                this.finishNode(e, 'DeclareVariable')
              );
            }
            flowParseDeclareModule(e) {
              (this.scope.enter(0),
                this.match(130)
                  ? (e.id = super.parseExprAtom())
                  : (e.id = this.parseIdentifier()));
              let t = this.startNode(),
                s = (t.body = []);
              for (this.expect(2); !this.match(4);) {
                let e = this.startNode();
                this.match(79)
                  ? (this.next(),
                    this.isContextual(126) ||
                      this.match(83) ||
                      this.raise(
                        eu.InvalidNonTypeImportInDeclareModule,
                        this.state.lastTokStartLoc
                      ),
                    s.push(super.parseImport(e)))
                  : (this.expectContextual(
                      121,
                      eu.UnsupportedStatementInDeclareModule
                    ),
                    s.push(this.flowParseDeclare(e, !0)));
              }
              (this.scope.exit(),
                this.expect(4),
                (e.body = this.finishNode(t, 'BlockStatement')));
              let i = null,
                r = !1;
              return (
                s.forEach(e => {
                  'DeclareExportAllDeclaration' !== e.type &&
                  ('DeclareExportDeclaration' !== e.type ||
                    (e.declaration &&
                      ('TypeAlias' === e.declaration.type ||
                        'InterfaceDeclaration' === e.declaration.type)))
                    ? 'DeclareModuleExports' === e.type &&
                      (r && this.raise(eu.DuplicateDeclareModuleExports, e),
                      'ES' === i &&
                        this.raise(eu.AmbiguousDeclareModuleKind, e),
                      (i = 'CommonJS'),
                      (r = !0))
                    : ('CommonJS' === i &&
                        this.raise(eu.AmbiguousDeclareModuleKind, e),
                      (i = 'ES'));
                }),
                (e.kind = i || 'CommonJS'),
                this.finishNode(e, 'DeclareModule')
              );
            }
            flowParseDeclareExportDeclaration(e, t) {
              if ((this.expect(78), this.eat(61)))
                return (
                  this.match(64) || this.match(76)
                    ? (e.declaration = this.flowParseDeclare(this.startNode()))
                    : ((e.declaration = this.flowParseType()),
                      this.semicolon()),
                  (e.default = !0),
                  this.finishNode(e, 'DeclareExportDeclaration')
                );
              if (
                this.match(71) ||
                this.isLet() ||
                ((this.isContextual(126) || this.isContextual(125)) && !t)
              ) {
                let e = this.state.value;
                throw this.raise(
                  eu.UnsupportedDeclareExportKind,
                  this.state.startLoc,
                  { unsupportedExportKind: e, suggestion: em[e] }
                );
              }
              if (
                this.match(70) ||
                this.match(64) ||
                this.match(76) ||
                this.isContextual(127)
              )
                return (
                  (e.declaration = this.flowParseDeclare(this.startNode())),
                  (e.default = !1),
                  this.finishNode(e, 'DeclareExportDeclaration')
                );
              if (
                this.match(51) ||
                this.match(2) ||
                this.isContextual(125) ||
                this.isContextual(126) ||
                this.isContextual(127)
              ) {
                let t = this.parseExport(e, null);
                return 'ExportNamedDeclaration' === t.type
                  ? ((t.default = !1),
                    delete t.exportKind,
                    this.castNodeTo(t, 'DeclareExportDeclaration'))
                  : this.castNodeTo(t, 'DeclareExportAllDeclaration');
              }
              throw this.unexpected();
            }
            flowParseDeclareModuleExports(e) {
              return (
                this.next(),
                this.expectContextual(107),
                (e.typeAnnotation = this.flowParseTypeAnnotation()),
                this.semicolon(),
                this.finishNode(e, 'DeclareModuleExports')
              );
            }
            flowParseDeclareTypeAlias(e) {
              this.next();
              let t = this.flowParseTypeAlias(e);
              return (this.castNodeTo(t, 'DeclareTypeAlias'), t);
            }
            flowParseDeclareOpaqueType(e) {
              return (this.next(), this.flowParseOpaqueType(e, !0));
            }
            flowParseDeclareInterface(e) {
              return (
                this.next(),
                this.flowParseInterfaceish(e, !1),
                this.finishNode(e, 'DeclareInterface')
              );
            }
            flowParseInterfaceish(e, t) {
              if (
                ((e.id = this.flowParseRestrictedIdentifier(!t, !0)),
                this.scope.declareName(e.id.name, t ? 17 : 8201, e.id.start),
                this.match(43)
                  ? (e.typeParameters =
                      this.flowParseTypeParameterDeclaration())
                  : (e.typeParameters = null),
                (e.extends = []),
                this.eat(77))
              )
                do e.extends.push(this.flowParseInterfaceExtends());
                while (!t && this.eat(8));
              if (t) {
                let t = [],
                  s = [];
                if (this.eatContextual(113))
                  do s.push(this.flowParseInterfaceExtends());
                  while (this.eat(8));
                if (this.eatContextual(109))
                  do t.push(this.flowParseClassImplements());
                  while (this.eat(8));
                ((e.implements = t), (e.mixins = s));
              }
              e.body = this.flowParseObjectType({
                allowStatic: t,
                allowExact: !1,
                allowSpread: !1,
                allowProto: t,
                allowInexact: !1
              });
            }
            flowParseInterfaceExtends() {
              let e = this.startNode();
              return (
                (e.id = this.flowParseQualifiedTypeIdentifier()),
                this.match(43)
                  ? (e.typeParameters =
                      this.flowParseTypeParameterInstantiation())
                  : (e.typeParameters = null),
                this.finishNode(e, 'InterfaceExtends')
              );
            }
            flowParseInterface(e) {
              return (
                this.flowParseInterfaceish(e, !1),
                this.finishNode(e, 'InterfaceDeclaration')
              );
            }
            checkNotUnderscore(e) {
              '_' === e &&
                this.raise(
                  eu.UnexpectedReservedUnderscore,
                  this.state.startLoc
                );
            }
            checkReservedType(e, t, s) {
              ec.has(e) &&
                this.raise(
                  s ? eu.AssignReservedType : eu.UnexpectedReservedType,
                  t,
                  { reservedType: e }
                );
            }
            flowParseRestrictedIdentifierName(e, t) {
              return (
                this.checkReservedType(
                  this.state.value,
                  this.state.startLoc,
                  t
                ),
                this.parseIdentifierName(e)
              );
            }
            flowParseRestrictedIdentifier(e, t) {
              let s = this.startNode(),
                i = this.flowParseRestrictedIdentifierName(e, t);
              return this.createIdentifier(s, i);
            }
            flowParseTypeAlias(e) {
              return (
                (e.id = this.flowParseRestrictedIdentifier(!1, !0)),
                this.scope.declareName(e.id.name, 8201, e.id.start),
                this.match(43)
                  ? (e.typeParameters =
                      this.flowParseTypeParameterDeclaration())
                  : (e.typeParameters = null),
                (e.right = this.flowParseTypeInitialiser(25)),
                this.semicolon(),
                this.finishNode(e, 'TypeAlias')
              );
            }
            flowParseOpaqueType(e, t) {
              return (
                this.expectContextual(126),
                (e.id = this.flowParseRestrictedIdentifier(!0, !0)),
                this.scope.declareName(e.id.name, 8201, e.id.start),
                this.match(43)
                  ? (e.typeParameters =
                      this.flowParseTypeParameterDeclaration())
                  : (e.typeParameters = null),
                (e.supertype = null),
                this.match(10) &&
                  (e.supertype = this.flowParseTypeInitialiser(10)),
                (e.impltype = null),
                t || (e.impltype = this.flowParseTypeInitialiser(25)),
                this.semicolon(),
                this.finishNode(e, t ? 'DeclareOpaqueType' : 'OpaqueType')
              );
            }
            flowParseTypeParameterBound() {
              if (this.match(10) || this.isContextual(77)) {
                let e = this.startNode();
                return (
                  this.next(),
                  (e.typeAnnotation = this.flowParseType()),
                  this.finishNode(e, 'TypeAnnotation')
                );
              }
            }
            flowParseTypeParameter(e = !1) {
              let t = this.state.startLoc,
                s = this.startNode(),
                i = this.flowParseVariance();
              return (
                (s.name = this.flowParseRestrictedIdentifierName()),
                (s.variance = i),
                (s.bound = this.flowParseTypeParameterBound()),
                this.match(25)
                  ? (this.eat(25), (s.default = this.flowParseType()))
                  : e && this.raise(eu.MissingTypeParamDefault, t),
                this.finishNode(s, 'TypeParameter')
              );
            }
            flowParseTypeParameterDeclaration() {
              let e = this.state.inType,
                t = this.startNode();
              ((t.params = []),
                (this.state.inType = !0),
                this.match(43) || this.match(138)
                  ? this.next()
                  : this.unexpected());
              let s = !1;
              do {
                let e = this.flowParseTypeParameter(s);
                (t.params.push(e),
                  e.default && (s = !0),
                  this.match(44) || this.expect(8));
              } while (!this.match(44));
              return (
                this.expect(44),
                (this.state.inType = e),
                this.finishNode(t, 'TypeParameterDeclaration')
              );
            }
            flowInTopLevelContext(e) {
              if (this.curContext() === q.brace) return e();
              {
                let t = this.state.context;
                this.state.context = [t[0]];
                try {
                  return e();
                } finally {
                  this.state.context = t;
                }
              }
            }
            flowParseTypeParameterInstantiationInExpression() {
              if (43 === this.reScan_lt())
                return this.flowParseTypeParameterInstantiation();
            }
            flowParseTypeParameterInstantiation() {
              let e = this.startNode(),
                t = this.state.inType;
              return (
                (this.state.inType = !0),
                (e.params = []),
                this.flowInTopLevelContext(() => {
                  this.expect(43);
                  let t = this.state.noAnonFunctionType;
                  for (this.state.noAnonFunctionType = !1; !this.match(44);)
                    (e.params.push(this.flowParseType()),
                      this.match(44) || this.expect(8));
                  this.state.noAnonFunctionType = t;
                }),
                (this.state.inType = t),
                this.state.inType ||
                  this.curContext() !== q.brace ||
                  this.reScan_lt_gt(),
                this.expect(44),
                this.finishNode(e, 'TypeParameterInstantiation')
              );
            }
            flowParseTypeParameterInstantiationCallOrNew() {
              if (43 !== this.reScan_lt()) return null;
              let e = this.startNode(),
                t = this.state.inType;
              for (
                e.params = [], this.state.inType = !0, this.expect(43);
                !this.match(44);
              )
                (e.params.push(this.flowParseTypeOrImplicitInstantiation()),
                  this.match(44) || this.expect(8));
              return (
                this.expect(44),
                (this.state.inType = t),
                this.finishNode(e, 'TypeParameterInstantiation')
              );
            }
            flowParseInterfaceType() {
              let e = this.startNode();
              if ((this.expectContextual(125), (e.extends = []), this.eat(77)))
                do e.extends.push(this.flowParseInterfaceExtends());
                while (this.eat(8));
              return (
                (e.body = this.flowParseObjectType({
                  allowStatic: !1,
                  allowExact: !1,
                  allowSpread: !1,
                  allowProto: !1,
                  allowInexact: !1
                })),
                this.finishNode(e, 'InterfaceTypeAnnotation')
              );
            }
            flowParseObjectPropertyKey() {
              return this.match(131) || this.match(130)
                ? super.parseExprAtom()
                : this.parseIdentifier(!0);
            }
            flowParseObjectTypeIndexer(e, t, s) {
              return (
                (e.static = t),
                10 === this.lookahead().type
                  ? ((e.id = this.parseIdentifier(!0)),
                    (e.key = this.flowParseTypeInitialiser()))
                  : ((e.id = null), (e.key = this.flowParseType())),
                this.expect(1),
                (e.value = this.flowParseTypeInitialiser()),
                (e.variance = s),
                this.finishNode(e, 'ObjectTypeIndexer')
              );
            }
            flowParseObjectTypeInternalSlot(e, t) {
              return (
                (e.static = t),
                (e.id = this.parseIdentifier(!0)),
                this.expect(1),
                this.expect(1),
                this.match(43) || this.match(6)
                  ? ((e.method = !0),
                    (e.optional = !1),
                    (e.value = this.flowParseObjectTypeMethodish(
                      this.startNodeAtNode(e)
                    )))
                  : ((e.method = !1),
                    this.eat(13) && (e.optional = !0),
                    (e.value = this.flowParseTypeInitialiser())),
                this.finishNode(e, 'ObjectTypeInternalSlot')
              );
            }
            flowParseObjectTypeMethodish(e) {
              for (
                e.params = [],
                  e.rest = null,
                  e.typeParameters = null,
                  e.this = null,
                  this.match(43) &&
                    (e.typeParameters =
                      this.flowParseTypeParameterDeclaration()),
                  this.expect(6),
                  this.match(74) &&
                    ((e.this = this.flowParseFunctionTypeParam(!0)),
                    (e.this.name = null),
                    this.match(7) || this.expect(8));
                !this.match(7) && !this.match(17);
              )
                (e.params.push(this.flowParseFunctionTypeParam(!1)),
                  this.match(7) || this.expect(8));
              return (
                this.eat(17) && (e.rest = this.flowParseFunctionTypeParam(!1)),
                this.expect(7),
                (e.returnType = this.flowParseTypeInitialiser()),
                this.finishNode(e, 'FunctionTypeAnnotation')
              );
            }
            flowParseObjectTypeCallProperty(e, t) {
              let s = this.startNode();
              return (
                (e.static = t),
                (e.value = this.flowParseObjectTypeMethodish(s)),
                this.finishNode(e, 'ObjectTypeCallProperty')
              );
            }
            flowParseObjectType({
              allowStatic: e,
              allowExact: t,
              allowSpread: s,
              allowProto: i,
              allowInexact: r
            }) {
              let n = this.state.inType;
              this.state.inType = !0;
              let o = this.startNode();
              ((o.callProperties = []),
                (o.properties = []),
                (o.indexers = []),
                (o.internalSlots = []));
              let h,
                p,
                l = !1;
              for (
                t && this.match(3)
                  ? (this.expect(3), (h = 5), (p = !0))
                  : (this.expect(2), (h = 4), (p = !1)),
                  o.exact = p;
                !this.match(h);
              ) {
                let t = !1,
                  n = null,
                  h = null,
                  c = this.startNode();
                if (i && this.isContextual(114)) {
                  let t = this.lookahead();
                  10 !== t.type &&
                    13 !== t.type &&
                    (this.next(), (n = this.state.startLoc), (e = !1));
                }
                if (e && this.isContextual(102)) {
                  let e = this.lookahead();
                  10 !== e.type && 13 !== e.type && (this.next(), (t = !0));
                }
                let u = this.flowParseVariance();
                if (this.eat(0))
                  (null != n && this.unexpected(n),
                    this.eat(0)
                      ? (u && this.unexpected(u.start),
                        o.internalSlots.push(
                          this.flowParseObjectTypeInternalSlot(c, t)
                        ))
                      : o.indexers.push(
                          this.flowParseObjectTypeIndexer(c, t, u)
                        ));
                else if (this.match(6) || this.match(43))
                  (null != n && this.unexpected(n),
                    u && this.unexpected(u.start),
                    o.callProperties.push(
                      this.flowParseObjectTypeCallProperty(c, t)
                    ));
                else {
                  let e = 'init';
                  (this.isContextual(95) || this.isContextual(100)) &&
                    j(this.lookahead().type) &&
                    ((e = this.state.value), this.next());
                  let i = this.flowParseObjectTypeProperty(
                    c,
                    t,
                    n,
                    u,
                    e,
                    s,
                    r ?? !p
                  );
                  null === i
                    ? ((l = !0), (h = this.state.lastTokStartLoc))
                    : o.properties.push(i);
                }
                (this.flowObjectTypeSemicolon(),
                  !h ||
                    this.match(4) ||
                    this.match(5) ||
                    this.raise(eu.UnexpectedExplicitInexactInObject, h));
              }
              (this.expect(h), s && (o.inexact = l));
              let c = this.finishNode(o, 'ObjectTypeAnnotation');
              return ((this.state.inType = n), c);
            }
            flowParseObjectTypeProperty(e, t, s, i, r, n, o) {
              if (this.eat(17))
                return this.match(8) ||
                  this.match(9) ||
                  this.match(4) ||
                  this.match(5)
                  ? (n
                      ? o ||
                        this.raise(
                          eu.InexactInsideExact,
                          this.state.lastTokStartLoc
                        )
                      : this.raise(
                          eu.InexactInsideNonObject,
                          this.state.lastTokStartLoc
                        ),
                    i && this.raise(eu.InexactVariance, i),
                    null)
                  : (n ||
                      this.raise(
                        eu.UnexpectedSpreadType,
                        this.state.lastTokStartLoc
                      ),
                    null != s && this.unexpected(s),
                    i && this.raise(eu.SpreadVariance, i),
                    (e.argument = this.flowParseType()),
                    this.finishNode(e, 'ObjectTypeSpreadProperty'));
              {
                ((e.key = this.flowParseObjectPropertyKey()),
                  (e.static = t),
                  (e.proto = null != s),
                  (e.kind = r));
                let o = !1;
                return (
                  this.match(43) || this.match(6)
                    ? ((e.method = !0),
                      null != s && this.unexpected(s),
                      i && this.unexpected(i.start),
                      (e.value = this.flowParseObjectTypeMethodish(
                        this.startNodeAtNode(e)
                      )),
                      'get' === r || 'set' === r
                        ? this.flowCheckGetterSetterParams(e)
                        : t ||
                          n ||
                          'constructor' !== e.key.name ||
                          !e.value.this ||
                          this.raise(
                            eu.ThisParamBannedInConstructor,
                            e.value.this
                          ))
                    : ('init' !== r && this.unexpected(),
                      (e.method = !1),
                      this.eat(13) && (o = !0),
                      (e.value = this.flowParseTypeInitialiser()),
                      (e.variance = i)),
                  (e.optional = o),
                  this.finishNode(e, 'ObjectTypeProperty')
                );
              }
            }
            flowCheckGetterSetterParams(e) {
              let t = +('get' !== e.kind),
                s = e.value,
                i = s.params.length + +!!s.rest;
              (s.this &&
                this.raise(
                  'get' === e.kind
                    ? eu.GetterMayNotHaveThisParam
                    : eu.SetterMayNotHaveThisParam,
                  s.this
                ),
                i !== t &&
                  this.raise(
                    'get' === e.kind ? b.BadGetterArity : b.BadSetterArity,
                    e
                  ),
                'set' === e.kind &&
                  s.rest &&
                  this.raise(b.BadSetterRestParameter, e));
            }
            flowObjectTypeSemicolon() {
              this.eat(9) ||
                this.eat(8) ||
                this.match(4) ||
                this.match(5) ||
                this.unexpected();
            }
            flowParseQualifiedTypeIdentifier(e, t) {
              e ?? (e = this.state.startLoc);
              let s = t || this.flowParseRestrictedIdentifier(!0);
              for (; this.eat(12);) {
                let t = this.startNodeAt(e);
                ((t.qualification = s),
                  (t.id = this.flowParseRestrictedIdentifier(!0)),
                  (s = this.finishNode(t, 'QualifiedTypeIdentifier')));
              }
              return s;
            }
            flowParseGenericType(e, t) {
              let s = this.startNodeAt(e);
              return (
                (s.typeParameters = null),
                (s.id = this.flowParseQualifiedTypeIdentifier(e, t)),
                this.match(43) &&
                  (s.typeParameters =
                    this.flowParseTypeParameterInstantiation()),
                this.finishNode(s, 'GenericTypeAnnotation')
              );
            }
            flowParseTypeofType() {
              let e = this.startNode();
              return (
                this.expect(83),
                (e.argument = this.flowParsePrimaryType()),
                this.finishNode(e, 'TypeofTypeAnnotation')
              );
            }
            flowParseTupleType() {
              let e = this.startNode();
              for (
                e.types = [], this.expect(0);
                this.state.pos < this.length &&
                !this.match(1) &&
                (e.types.push(this.flowParseType()), !this.match(1));
              )
                this.expect(8);
              return (
                this.expect(1),
                this.finishNode(e, 'TupleTypeAnnotation')
              );
            }
            flowParseFunctionTypeParam(e) {
              let t = null,
                s = !1,
                i,
                r = this.startNode(),
                n = this.lookahead(),
                o = 74 === this.state.type;
              return (
                10 === n.type || 13 === n.type
                  ? (o && !e && this.raise(eu.ThisParamMustBeFirst, r),
                    (t = this.parseIdentifier(o)),
                    this.eat(13) &&
                      ((s = !0),
                      o && this.raise(eu.ThisParamMayNotBeOptional, r)),
                    (i = this.flowParseTypeInitialiser()))
                  : (i = this.flowParseType()),
                (r.name = t),
                (r.optional = s),
                (r.typeAnnotation = i),
                this.finishNode(r, 'FunctionTypeParam')
              );
            }
            reinterpretTypeAsFunctionTypeParam(e) {
              let t = this.startNodeAtNode(e);
              return (
                (t.name = null),
                (t.optional = !1),
                (t.typeAnnotation = e),
                this.finishNode(t, 'FunctionTypeParam')
              );
            }
            flowParseFunctionTypeParams(e = []) {
              let t = null,
                s = null;
              for (
                this.match(74) &&
                (((s = this.flowParseFunctionTypeParam(!0)).name = null),
                this.match(7) || this.expect(8));
                !this.match(7) && !this.match(17);
              )
                (e.push(this.flowParseFunctionTypeParam(!1)),
                  this.match(7) || this.expect(8));
              return (
                this.eat(17) && (t = this.flowParseFunctionTypeParam(!1)),
                { params: e, rest: t, _this: s }
              );
            }
            flowIdentToTypeAnnotation(e, t, s) {
              switch (s.name) {
                case 'any':
                  return this.finishNode(t, 'AnyTypeAnnotation');
                case 'bool':
                case 'boolean':
                  return this.finishNode(t, 'BooleanTypeAnnotation');
                case 'mixed':
                  return this.finishNode(t, 'MixedTypeAnnotation');
                case 'empty':
                  return this.finishNode(t, 'EmptyTypeAnnotation');
                case 'number':
                  return this.finishNode(t, 'NumberTypeAnnotation');
                case 'string':
                  return this.finishNode(t, 'StringTypeAnnotation');
                case 'symbol':
                  return this.finishNode(t, 'SymbolTypeAnnotation');
                default:
                  return (
                    this.checkNotUnderscore(s.name),
                    this.flowParseGenericType(e, s)
                  );
              }
            }
            flowParsePrimaryType() {
              let e = this.state.startLoc,
                t = this.startNode(),
                s,
                i,
                r = !1,
                n = this.state.noAnonFunctionType;
              switch (this.state.type) {
                case 2:
                  return this.flowParseObjectType({
                    allowStatic: !1,
                    allowExact: !1,
                    allowSpread: !0,
                    allowProto: !1,
                    allowInexact: !0
                  });
                case 3:
                  return this.flowParseObjectType({
                    allowStatic: !1,
                    allowExact: !0,
                    allowSpread: !0,
                    allowProto: !1,
                    allowInexact: !1
                  });
                case 0:
                  return (
                    (this.state.noAnonFunctionType = !1),
                    (i = this.flowParseTupleType()),
                    (this.state.noAnonFunctionType = n),
                    i
                  );
                case 43: {
                  let e = this.startNode();
                  return (
                    (e.typeParameters =
                      this.flowParseTypeParameterDeclaration()),
                    this.expect(6),
                    (e.params = (s =
                      this.flowParseFunctionTypeParams()).params),
                    (e.rest = s.rest),
                    (e.this = s._this),
                    this.expect(7),
                    this.expect(15),
                    (e.returnType = this.flowParseType()),
                    this.finishNode(e, 'FunctionTypeAnnotation')
                  );
                }
                case 6: {
                  let e = this.startNode();
                  if ((this.next(), !this.match(7) && !this.match(17)))
                    if (U(this.state.type) || this.match(74)) {
                      let e = this.lookahead().type;
                      r = 13 !== e && 10 !== e;
                    } else r = !0;
                  if (r) {
                    if (
                      ((this.state.noAnonFunctionType = !1),
                      (i = this.flowParseType()),
                      (this.state.noAnonFunctionType = n),
                      this.state.noAnonFunctionType ||
                        !(
                          this.match(8) ||
                          (this.match(7) && 15 === this.lookahead().type)
                        ))
                    )
                      return (this.expect(7), i);
                    this.eat(8);
                  }
                  return (
                    (e.params = (s = i
                      ? this.flowParseFunctionTypeParams([
                          this.reinterpretTypeAsFunctionTypeParam(i)
                        ])
                      : this.flowParseFunctionTypeParams()).params),
                    (e.rest = s.rest),
                    (e.this = s._this),
                    this.expect(7),
                    this.expect(15),
                    (e.returnType = this.flowParseType()),
                    (e.typeParameters = null),
                    this.finishNode(e, 'FunctionTypeAnnotation')
                  );
                }
                case 130:
                  return this.parseLiteral(
                    this.state.value,
                    'StringLiteralTypeAnnotation'
                  );
                case 81:
                case 82:
                  return (
                    (t.value = this.match(81)),
                    this.next(),
                    this.finishNode(t, 'BooleanLiteralTypeAnnotation')
                  );
                case 49:
                  if ('-' === this.state.value) {
                    if ((this.next(), this.match(131)))
                      return this.parseLiteralAtNode(
                        -this.state.value,
                        'NumberLiteralTypeAnnotation',
                        t
                      );
                    if (this.match(132))
                      return this.parseLiteralAtNode(
                        -this.state.value,
                        'BigIntLiteralTypeAnnotation',
                        t
                      );
                    throw this.raise(
                      eu.UnexpectedSubtractionOperand,
                      this.state.startLoc
                    );
                  }
                  break;
                case 131:
                  return this.parseLiteral(
                    this.state.value,
                    'NumberLiteralTypeAnnotation'
                  );
                case 132:
                  return this.parseLiteral(
                    this.state.value,
                    'BigIntLiteralTypeAnnotation'
                  );
                case 84:
                  return (
                    this.next(),
                    this.finishNode(t, 'VoidTypeAnnotation')
                  );
                case 80:
                  return (
                    this.next(),
                    this.finishNode(t, 'NullLiteralTypeAnnotation')
                  );
                case 74:
                  return (
                    this.next(),
                    this.finishNode(t, 'ThisTypeAnnotation')
                  );
                case 51:
                  return (
                    this.next(),
                    this.finishNode(t, 'ExistsTypeAnnotation')
                  );
                case 83:
                  return this.flowParseTypeofType();
                default:
                  if (V(this.state.type)) {
                    let e = k[this.state.type];
                    return (this.next(), super.createIdentifier(t, e));
                  }
                  if (U(this.state.type))
                    return this.isContextual(125)
                      ? this.flowParseInterfaceType()
                      : this.flowIdentToTypeAnnotation(
                          e,
                          t,
                          this.parseIdentifier()
                        );
              }
              throw this.unexpected();
            }
            flowParsePostfixType() {
              let e = this.state.startLoc,
                t = this.flowParsePrimaryType(),
                s = !1;
              for (
                ;
                (this.match(0) || this.match(14)) && !this.canInsertSemicolon();
              ) {
                let i = this.startNodeAt(e),
                  r = this.eat(14);
                ((s = s || r),
                  this.expect(0),
                  !r && this.match(1)
                    ? ((i.elementType = t),
                      this.next(),
                      (t = this.finishNode(i, 'ArrayTypeAnnotation')))
                    : ((i.objectType = t),
                      (i.indexType = this.flowParseType()),
                      this.expect(1),
                      s
                        ? ((i.optional = r),
                          (t = this.finishNode(i, 'OptionalIndexedAccessType')))
                        : (t = this.finishNode(i, 'IndexedAccessType'))));
              }
              return t;
            }
            flowParsePrefixType() {
              let e = this.startNode();
              return this.eat(13)
                ? ((e.typeAnnotation = this.flowParsePrefixType()),
                  this.finishNode(e, 'NullableTypeAnnotation'))
                : this.flowParsePostfixType();
            }
            flowParseAnonFunctionWithoutParens() {
              let e = this.flowParsePrefixType();
              if (!this.state.noAnonFunctionType && this.eat(15)) {
                let t = this.startNodeAtNode(e);
                return (
                  (t.params = [this.reinterpretTypeAsFunctionTypeParam(e)]),
                  (t.rest = null),
                  (t.this = null),
                  (t.returnType = this.flowParseType()),
                  (t.typeParameters = null),
                  this.finishNode(t, 'FunctionTypeAnnotation')
                );
              }
              return e;
            }
            flowParseIntersectionType() {
              let e = this.startNode();
              this.eat(41);
              let t = this.flowParseAnonFunctionWithoutParens();
              for (e.types = [t]; this.eat(41);)
                e.types.push(this.flowParseAnonFunctionWithoutParens());
              return 1 === e.types.length
                ? t
                : this.finishNode(e, 'IntersectionTypeAnnotation');
            }
            flowParseUnionType() {
              let e = this.startNode();
              this.eat(39);
              let t = this.flowParseIntersectionType();
              for (e.types = [t]; this.eat(39);)
                e.types.push(this.flowParseIntersectionType());
              return 1 === e.types.length
                ? t
                : this.finishNode(e, 'UnionTypeAnnotation');
            }
            flowParseType() {
              let e = this.state.inType;
              this.state.inType = !0;
              let t = this.flowParseUnionType();
              return ((this.state.inType = e), t);
            }
            flowParseTypeOrImplicitInstantiation() {
              if (128 !== this.state.type || '_' !== this.state.value)
                return this.flowParseType();
              {
                let e = this.state.startLoc,
                  t = this.parseIdentifier();
                return this.flowParseGenericType(e, t);
              }
            }
            flowParseTypeAnnotation() {
              let e = this.startNode();
              return (
                (e.typeAnnotation = this.flowParseTypeInitialiser()),
                this.finishNode(e, 'TypeAnnotation')
              );
            }
            flowParseTypeAnnotatableIdentifier() {
              let e = this.startNode(),
                t = this.parseIdentifierName();
              return (
                this.match(10) &&
                  (e.typeAnnotation = this.flowParseTypeAnnotation()),
                this.createIdentifier(e, t)
              );
            }
            typeCastToParameter(e) {
              return (
                (e.expression.typeAnnotation = e.typeAnnotation),
                this.resetEndLocationFromNode(e.expression, e.typeAnnotation),
                e.expression
              );
            }
            flowParseVariance() {
              let e = null;
              return this.match(49)
                ? ((e = this.startNode()),
                  '+' === this.state.value
                    ? (e.kind = 'plus')
                    : (e.kind = 'minus'),
                  this.next(),
                  this.finishNode(e, 'Variance'))
                : e;
            }
            parseFunctionBody(e, t, s = !1) {
              t
                ? this.forwardNoArrowParamsConversionAt(e, () =>
                    super.parseFunctionBody(e, !0, s)
                  )
                : super.parseFunctionBody(e, !1, s);
            }
            parseFunctionBodyAndFinish(e, t, s = !1) {
              if (this.match(10)) {
                let s = this.startNode();
                ('FunctionDeclaration' === t ||
                'FunctionExpression' === t ||
                'ArrowFunctionExpression' === t
                  ? ([s.typeAnnotation, e.predicate] =
                      this.flowParseTypeAndPredicateInitialiser(!0))
                  : (s.typeAnnotation = this.flowParseTypeInitialiser()),
                  (e.returnType = s.typeAnnotation
                    ? this.finishNode(s, 'TypeAnnotation')
                    : null));
              }
              return super.parseFunctionBodyAndFinish(e, t, s);
            }
            parseStatementLike(e) {
              if (this.state.strict && this.isContextual(125)) {
                if (R(this.lookahead().type)) {
                  let e = this.startNode();
                  return (this.next(), this.flowParseInterface(e));
                }
              } else if (this.isContextual(122)) {
                let e = this.startNode();
                return (this.next(), this.flowParseEnumDeclaration(e));
              }
              let t = super.parseStatementLike(e);
              return (
                void 0 !== this.flowPragma ||
                  this.isValidDirective(t) ||
                  (this.flowPragma = null),
                t
              );
            }
            parseExpressionStatement(e, t, s) {
              if ('Identifier' === t.type) {
                if ('declare' === t.name) {
                  if (
                    this.match(76) ||
                    U(this.state.type) ||
                    this.match(64) ||
                    this.match(70) ||
                    this.match(78)
                  )
                    return this.flowParseDeclare(e);
                } else if (U(this.state.type)) {
                  if ('interface' === t.name) return this.flowParseInterface(e);
                  if ('type' === t.name) return this.flowParseTypeAlias(e);
                  if ('opaque' === t.name)
                    return this.flowParseOpaqueType(e, !1);
                }
              }
              return super.parseExpressionStatement(e, t, s);
            }
            shouldParseExportDeclaration() {
              let { type: e } = this.state;
              return 122 === e || _(e)
                ? !this.state.containsEsc
                : super.shouldParseExportDeclaration();
            }
            isExportDefaultSpecifier() {
              let { type: e } = this.state;
              return 122 === e || _(e)
                ? this.state.containsEsc
                : super.isExportDefaultSpecifier();
            }
            parseExportDefaultExpression() {
              if (this.isContextual(122)) {
                let e = this.startNode();
                return (this.next(), this.flowParseEnumDeclaration(e));
              }
              return super.parseExportDefaultExpression();
            }
            parseConditional(e, t, s) {
              if (!this.match(13)) return e;
              if (null != s) {
                let t = this.lookaheadCharCode();
                if (44 === t || 61 === t || 58 === t || 41 === t)
                  return (this.setOptionalParametersError(s), e);
              }
              this.expect(13);
              let i = this.state.clone(),
                r = this.state.noArrowAt,
                n = this.startNodeAt(t),
                { consequent: o, failed: h } =
                  this.tryParseConditionalConsequent(),
                p = this.getArrowLikeExpressions(o),
                l = p[0],
                c = p[1];
              if (h || c.length > 0) {
                let e = [...r];
                if (c.length > 0) {
                  ((this.state = i), (this.state.noArrowAt = e));
                  for (let t = 0; t < c.length; t++) e.push(c[t].start);
                  (({ consequent: o, failed: h } =
                    this.tryParseConditionalConsequent()),
                    ([l] = this.getArrowLikeExpressions(o)));
                }
                (h &&
                  l.length > 1 &&
                  this.raise(eu.AmbiguousConditionalArrow, i.startLoc),
                  h &&
                    1 === l.length &&
                    ((this.state = i),
                    e.push(l[0].start),
                    (this.state.noArrowAt = e),
                    ({ consequent: o } =
                      this.tryParseConditionalConsequent())));
              }
              return (
                this.getArrowLikeExpressions(o, !0),
                (this.state.noArrowAt = r),
                this.expect(10),
                (n.test = e),
                (n.consequent = o),
                (n.alternate = this.forwardNoArrowParamsConversionAt(n, () =>
                  this.parseMaybeAssign(void 0, void 0)
                )),
                this.finishNode(n, 'ConditionalExpression')
              );
            }
            tryParseConditionalConsequent() {
              this.state.noArrowParamsConversionAt.push(this.state.start);
              let e = this.parseMaybeAssignAllowIn(),
                t = !this.match(10);
              return (
                this.state.noArrowParamsConversionAt.pop(),
                { consequent: e, failed: t }
              );
            }
            getArrowLikeExpressions(e, t) {
              let s = [e],
                i = [];
              for (; 0 !== s.length;) {
                let e = s.pop();
                'ArrowFunctionExpression' === e.type &&
                'BlockStatement' !== e.body.type
                  ? (e.typeParameters || !e.returnType
                      ? this.finishArrowValidation(e)
                      : i.push(e),
                    s.push(e.body))
                  : 'ConditionalExpression' === e.type &&
                    (s.push(e.consequent), s.push(e.alternate));
              }
              return t
                ? (i.forEach(e => this.finishArrowValidation(e)), [i, []])
                : (function (e, t) {
                    let s = [],
                      i = [];
                    for (let r = 0; r < e.length; r++)
                      (t(e[r], r, e) ? s : i).push(e[r]);
                    return [s, i];
                  })(i, e => e.params.every(e => this.isAssignable(e, !0)));
            }
            finishArrowValidation(e) {
              (this.toAssignableList(e.params, e.extra?.trailingCommaLoc, !1),
                this.scope.enter(518),
                super.checkParams(e, !1, !0),
                this.scope.exit());
            }
            forwardNoArrowParamsConversionAt(e, t) {
              let s;
              return (
                this.state.noArrowParamsConversionAt.includes(
                  this.offsetToSourcePos(e.start)
                )
                  ? (this.state.noArrowParamsConversionAt.push(
                      this.state.start
                    ),
                    (s = t()),
                    this.state.noArrowParamsConversionAt.pop())
                  : (s = t()),
                s
              );
            }
            parseParenItem(e, t) {
              let s = super.parseParenItem(e, t);
              if (
                (this.eat(13) && ((s.optional = !0), this.resetEndLocation(e)),
                this.match(10))
              ) {
                let e = this.startNodeAt(t);
                return (
                  (e.expression = s),
                  (e.typeAnnotation = this.flowParseTypeAnnotation()),
                  this.finishNode(e, 'TypeCastExpression')
                );
              }
              return s;
            }
            assertModuleNodeAllowed(e) {
              ('ImportDeclaration' === e.type &&
                ('type' === e.importKind || 'typeof' === e.importKind)) ||
                ('ExportNamedDeclaration' === e.type &&
                  'type' === e.exportKind) ||
                ('ExportAllDeclaration' === e.type &&
                  'type' === e.exportKind) ||
                super.assertModuleNodeAllowed(e);
            }
            parseExportDeclaration(e) {
              if (this.isContextual(126)) {
                e.exportKind = 'type';
                let t = this.startNode();
                return (
                  this.next(),
                  this.match(2)
                    ? ((e.specifiers = this.parseExportSpecifiers(!0)),
                      super.parseExportFrom(e),
                      null)
                    : this.flowParseTypeAlias(t)
                );
              }
              if (this.isContextual(127)) {
                e.exportKind = 'type';
                let t = this.startNode();
                return (this.next(), this.flowParseOpaqueType(t, !1));
              }
              if (this.isContextual(125)) {
                e.exportKind = 'type';
                let t = this.startNode();
                return (this.next(), this.flowParseInterface(t));
              }
              {
                if (!this.isContextual(122))
                  return super.parseExportDeclaration(e);
                e.exportKind = 'value';
                let t = this.startNode();
                return (this.next(), this.flowParseEnumDeclaration(t));
              }
            }
            eatExportStar(e) {
              return (
                !!super.eatExportStar(e) ||
                (!!this.isContextual(126) &&
                  51 === this.lookahead().type &&
                  ((e.exportKind = 'type'), this.next(), this.next(), !0))
              );
            }
            maybeParseExportNamespaceSpecifier(e) {
              let { startLoc: t } = this.state,
                s = super.maybeParseExportNamespaceSpecifier(e);
              return (s && 'type' === e.exportKind && this.unexpected(t), s);
            }
            parseClassId(e, t, s) {
              if ((!t || s) && this.isContextual(109)) {
                e.id = null;
                return;
              }
              (super.parseClassId(e, t, s),
                this.match(43) &&
                  (e.typeParameters =
                    this.flowParseTypeParameterDeclaration()));
            }
            parseClassMember(e, t, s) {
              let { startLoc: i } = this.state;
              if (this.isContextual(121)) {
                if (super.parseClassMemberFromModifier(e, t)) return;
                t.declare = !0;
              }
              (super.parseClassMember(e, t, s),
                t.declare &&
                  ('ClassProperty' !== t.type &&
                  'ClassPrivateProperty' !== t.type &&
                  'PropertyDefinition' !== t.type
                    ? this.raise(eu.DeclareClassElement, i)
                    : t.value &&
                      this.raise(eu.DeclareClassFieldInitializer, t.value)));
            }
            isIterator(e) {
              return 'iterator' === e || 'asyncIterator' === e;
            }
            readIterator() {
              let e = super.readWord1(),
                t = '@@' + e;
              ((this.isIterator(e) && this.state.inType) ||
                this.raise(b.InvalidIdentifier, this.state.curPosition(), {
                  identifierName: t
                }),
                this.finishToken(128, t));
            }
            getTokenFromCode(e) {
              var t;
              let s = this.input.charCodeAt(this.state.pos + 1);
              123 === e && 124 === s
                ? this.finishOp(3, 2)
                : this.state.inType && (62 === e || 60 === e)
                  ? this.finishOp(62 === e ? 44 : 43, 1)
                  : this.state.inType && 63 === e
                    ? 46 === s
                      ? this.finishOp(14, 2)
                      : this.finishOp(13, 1)
                    : ((t = this.input.charCodeAt(this.state.pos + 2)),
                        64 === e && 64 === s && Q(t))
                      ? ((this.state.pos += 2), this.readIterator())
                      : super.getTokenFromCode(e);
            }
            isAssignable(e, t) {
              return 'TypeCastExpression' === e.type
                ? this.isAssignable(e.expression, t)
                : super.isAssignable(e, t);
            }
            toAssignable(e, t = !1) {
              (t ||
                'AssignmentExpression' !== e.type ||
                'TypeCastExpression' !== e.left.type ||
                (e.left = this.typeCastToParameter(e.left)),
                super.toAssignable(e, t));
            }
            toAssignableListItem(e, t, s) {
              let i = e[t];
              ('TypeCastExpression' === i.type &&
                (e[t] = this.typeCastToParameter(i)),
                super.toAssignableListItem(e, t, s));
            }
            toReferencedList(e, t) {
              for (let s = 0; s < e.length; s++) {
                let i = e[s];
                i?.type !== 'TypeCastExpression' ||
                  i.extra?.parenthesized ||
                  (!(e.length > 1) && t) ||
                  this.raise(eu.TypeCastInPattern, i.typeAnnotation);
              }
              return e;
            }
            parseArrayLike(e, t) {
              let s = super.parseArrayLike(e, t);
              return (
                'ArrayExpression' === s.type &&
                  this.toReferencedList(s.elements),
                s
              );
            }
            isValidLVal(e, t, s, i) {
              return (
                'TypeCastExpression' === e || super.isValidLVal(e, t, s, i)
              );
            }
            parseClassProperty(e) {
              return (
                this.match(10) &&
                  (e.typeAnnotation = this.flowParseTypeAnnotation()),
                super.parseClassProperty(e)
              );
            }
            parseClassPrivateProperty(e) {
              return (
                this.match(10) &&
                  (e.typeAnnotation = this.flowParseTypeAnnotation()),
                super.parseClassPrivateProperty(e)
              );
            }
            isClassMethod() {
              return this.match(43) || super.isClassMethod();
            }
            isClassProperty() {
              return this.match(10) || super.isClassProperty();
            }
            isNonstaticConstructor(e) {
              return !this.match(10) && super.isNonstaticConstructor(e);
            }
            pushClassMethod(e, t, s, i, r, n) {
              if (
                (t.variance && this.unexpected(t.variance.start),
                delete t.variance,
                this.match(43) &&
                  (t.typeParameters = this.flowParseTypeParameterDeclaration()),
                super.pushClassMethod(e, t, s, i, r, n),
                t.params && r)
              ) {
                let e = t.params;
                e.length > 0 &&
                  this.isThisParam(e[0]) &&
                  this.raise(eu.ThisParamBannedInConstructor, t);
              } else if ('MethodDefinition' === t.type && r && t.value.params) {
                let e = t.value.params;
                e.length > 0 &&
                  this.isThisParam(e[0]) &&
                  this.raise(eu.ThisParamBannedInConstructor, t);
              }
            }
            pushClassPrivateMethod(e, t, s, i) {
              (t.variance && this.unexpected(t.variance.start),
                delete t.variance,
                this.match(43) &&
                  (t.typeParameters = this.flowParseTypeParameterDeclaration()),
                super.pushClassPrivateMethod(e, t, s, i));
            }
            flowParseClassImplements() {
              let e = this.startNode();
              return (
                (e.id = this.flowParseRestrictedIdentifier(!0)),
                this.match(43)
                  ? (e.typeParameters =
                      this.flowParseTypeParameterInstantiation())
                  : (e.typeParameters = null),
                this.finishNode(e, 'ClassImplements')
              );
            }
            parseClassSuper(e) {
              if (
                (super.parseClassSuper(e),
                e.superClass &&
                  (this.match(43) || this.match(47)) &&
                  (e.superTypeArguments =
                    this.flowParseTypeParameterInstantiationInExpression()),
                this.eatContextual(109))
              ) {
                let t = (e.implements = []);
                do t.push(this.flowParseClassImplements());
                while (this.eat(8));
              }
            }
            checkGetterSetterParams(e) {
              super.checkGetterSetterParams(e);
              let t = this.getObjectOrClassMethodParams(e);
              if (t.length > 0) {
                let s = t[0];
                this.isThisParam(s) && 'get' === e.kind
                  ? this.raise(eu.GetterMayNotHaveThisParam, s)
                  : this.isThisParam(s) &&
                    this.raise(eu.SetterMayNotHaveThisParam, s);
              }
            }
            parsePropertyNamePrefixOperator(e) {
              e.variance = this.flowParseVariance();
            }
            parseObjPropValue(e, t, s, i, r, n, o) {
              let h;
              (e.variance && this.unexpected(e.variance.start),
                delete e.variance,
                this.match(43) &&
                  !n &&
                  ((h = this.flowParseTypeParameterDeclaration()),
                  this.match(6) || this.unexpected()));
              let p = super.parseObjPropValue(e, t, s, i, r, n, o);
              return (h && ((p.value || p).typeParameters = h), p);
            }
            parseFunctionParamType(e) {
              return (
                this.eat(13) &&
                  ('Identifier' !== e.type &&
                    this.raise(eu.PatternIsOptional, e),
                  this.isThisParam(e) &&
                    this.raise(eu.ThisParamMayNotBeOptional, e),
                  (e.optional = !0)),
                this.match(10)
                  ? (e.typeAnnotation = this.flowParseTypeAnnotation())
                  : this.isThisParam(e) &&
                    this.raise(eu.ThisParamAnnotationRequired, e),
                this.match(25) &&
                  this.isThisParam(e) &&
                  this.raise(eu.ThisParamNoDefault, e),
                this.resetEndLocation(e),
                e
              );
            }
            parseMaybeDefault(e, t) {
              let s = super.parseMaybeDefault(e, t);
              return (
                'AssignmentPattern' === s.type &&
                  s.typeAnnotation &&
                  s.right.start < s.typeAnnotation.start &&
                  this.raise(eu.TypeBeforeInitializer, s.typeAnnotation),
                s
              );
            }
            parseImportSpecifierLocal(e, t, s) {
              ((t.local = ed(e)
                ? this.flowParseRestrictedIdentifier(!0, !0)
                : this.parseIdentifier()),
                e.specifiers.push(this.finishImportSpecifier(t, s)));
            }
            isPotentialImportPhase(e) {
              if (super.isPotentialImportPhase(e)) return !0;
              if (this.isContextual(126)) {
                if (!e) return !0;
                let t = this.lookaheadCharCode();
                return 123 === t || 42 === t;
              }
              return !e && this.isContextual(83);
            }
            applyImportPhase(e, t, s, i) {
              (super.applyImportPhase(e, t, s, i), t)
                ? (!s && this.match(61)) ||
                  (e.exportKind = 'type' === s ? s : 'value')
                : ('type' === s && this.match(51) && this.unexpected(),
                  (e.importKind =
                    'type' === s || 'typeof' === s ? s : 'value'));
            }
            parseImportSpecifier(e, t, s, i, r) {
              let n = e.imported,
                o = null;
              'Identifier' === n.type &&
                ('type' === n.name
                  ? (o = 'type')
                  : 'typeof' === n.name && (o = 'typeof'));
              let h = !1;
              if (this.isContextual(89) && !this.isLookaheadContextual('as')) {
                let t = this.parseIdentifier(!0);
                null === o || R(this.state.type)
                  ? ((e.imported = n),
                    (e.importKind = null),
                    (e.local = this.parseIdentifier()))
                  : ((e.imported = t),
                    (e.importKind = o),
                    (e.local = this.cloneIdentifier(t)));
              } else {
                if (null !== o && R(this.state.type))
                  ((e.imported = this.parseIdentifier(!0)), (e.importKind = o));
                else {
                  if (t)
                    throw this.raise(b.ImportBindingIsString, e, {
                      importName: n.value
                    });
                  ((e.imported = n), (e.importKind = null));
                }
                this.eatContextual(89)
                  ? (e.local = this.parseIdentifier())
                  : ((h = !0), (e.local = this.cloneIdentifier(e.imported)));
              }
              let p = ed(e);
              return (
                s && p && this.raise(eu.ImportTypeShorthandOnlyInPureImport, e),
                (s || p) &&
                  this.checkReservedType(e.local.name, e.local.start, !0),
                !h ||
                  s ||
                  p ||
                  this.checkReservedWord(e.local.name, e.start, !0, !0),
                this.finishImportSpecifier(e, 'ImportSpecifier')
              );
            }
            parseBindingAtom() {
              return 74 === this.state.type
                ? this.parseIdentifier(!0)
                : super.parseBindingAtom();
            }
            parseFunctionParams(e, t) {
              let s = e.kind;
              ('get' !== s &&
                'set' !== s &&
                this.match(43) &&
                (e.typeParameters = this.flowParseTypeParameterDeclaration()),
                super.parseFunctionParams(e, t));
            }
            parseVarId(e, t) {
              (super.parseVarId(e, t),
                this.match(10) &&
                  ((e.id.typeAnnotation = this.flowParseTypeAnnotation()),
                  this.resetEndLocation(e.id)));
            }
            parseAsyncArrowFromCallExpression(e, t) {
              if (this.match(10)) {
                let t = this.state.noAnonFunctionType;
                ((this.state.noAnonFunctionType = !0),
                  (e.returnType = this.flowParseTypeAnnotation()),
                  (this.state.noAnonFunctionType = t));
              }
              return super.parseAsyncArrowFromCallExpression(e, t);
            }
            shouldParseAsyncArrow() {
              return this.match(10) || super.shouldParseAsyncArrow();
            }
            parseMaybeAssign(e, t) {
              let s = null,
                i;
              if (
                this.hasPlugin('jsx') &&
                (this.match(138) || this.match(43))
              ) {
                if (
                  ((s = this.state.clone()),
                  !(i = this.tryParse(() => super.parseMaybeAssign(e, t), s))
                    .error)
                )
                  return i.node;
                let { context: r } = this.state,
                  n = r[r.length - 1];
                (n === q.j_oTag || n === q.j_expr) && r.pop();
              }
              if (i?.error || this.match(43)) {
                s = s || this.state.clone();
                let r,
                  n = this.tryParse(s => {
                    r = this.flowParseTypeParameterDeclaration();
                    let i = this.forwardNoArrowParamsConversionAt(r, () => {
                      let s = super.parseMaybeAssign(e, t);
                      return (this.resetStartLocationFromNode(s, r), s);
                    });
                    i.extra?.parenthesized && s();
                    let n = this.maybeUnwrapTypeCastExpression(i);
                    return (
                      'ArrowFunctionExpression' !== n.type && s(),
                      (n.typeParameters = r),
                      this.resetStartLocationFromNode(n, r),
                      i
                    );
                  }, s),
                  o = null;
                if (
                  n.node &&
                  'ArrowFunctionExpression' ===
                    this.maybeUnwrapTypeCastExpression(n.node).type
                ) {
                  if (!n.error && !n.aborted)
                    return (
                      n.node.async &&
                        this.raise(
                          eu.UnexpectedTypeParameterBeforeAsyncArrowFunction,
                          r
                        ),
                      n.node
                    );
                  o = n.node;
                }
                if (i?.node) return ((this.state = i.failState), i.node);
                if (o) return ((this.state = n.failState), o);
                throw i?.thrown
                  ? i.error
                  : n.thrown
                    ? n.error
                    : this.raise(eu.UnexpectedTokenAfterTypeParameter, r);
              }
              return super.parseMaybeAssign(e, t);
            }
            parseArrow(e) {
              if (this.match(10)) {
                let t = this.tryParse(() => {
                  let t = this.state.noAnonFunctionType;
                  this.state.noAnonFunctionType = !0;
                  let s = this.startNode();
                  return (
                    ([s.typeAnnotation, e.predicate] =
                      this.flowParseTypeAndPredicateInitialiser(!0)),
                    (this.state.noAnonFunctionType = t),
                    this.canInsertSemicolon() && this.unexpected(),
                    this.match(15) || this.unexpected(),
                    s
                  );
                });
                if (t.thrown) return null;
                (t.error && (this.state = t.failState),
                  (e.returnType = t.node.typeAnnotation
                    ? this.finishNode(t.node, 'TypeAnnotation')
                    : null));
              }
              return super.parseArrow(e);
            }
            shouldParseArrow(e) {
              return this.match(10) || super.shouldParseArrow(e);
            }
            setArrowFunctionParameters(e, t) {
              this.state.noArrowParamsConversionAt.includes(
                this.offsetToSourcePos(e.start)
              )
                ? (e.params = t)
                : super.setArrowFunctionParameters(e, t);
            }
            checkParams(e, t, s, i = !0) {
              if (!(
                s &&
                this.state.noArrowParamsConversionAt.includes(
                  this.offsetToSourcePos(e.start)
                )
              )) {
                for (let t = 0; t < e.params.length; t++)
                  this.isThisParam(e.params[t]) &&
                    t > 0 &&
                    this.raise(eu.ThisParamMustBeFirst, e.params[t]);
                super.checkParams(e, t, s, i);
              }
            }
            parseParenAndDistinguishExpression(e) {
              return super.parseParenAndDistinguishExpression(
                e &&
                  !this.state.noArrowAt.includes(
                    this.sourceToOffsetPos(this.state.start)
                  )
              );
            }
            parseSubscripts(e, t, s) {
              if (
                'Identifier' === e.type &&
                'async' === e.name &&
                this.state.noArrowAt.includes(t.index)
              ) {
                this.next();
                let s = this.startNodeAt(t);
                ((s.callee = e),
                  (s.arguments = super.parseCallExpressionArguments()),
                  (e = this.finishNode(s, 'CallExpression')));
              } else if (
                'Identifier' === e.type &&
                'async' === e.name &&
                this.match(43)
              ) {
                let i = this.state.clone(),
                  r = this.tryParse(
                    e => this.parseAsyncArrowWithTypeParameters(t) || e(),
                    i
                  );
                if (!r.error && !r.aborted) return r.node;
                let n = this.tryParse(() => super.parseSubscripts(e, t, s), i);
                if (n.node && !n.error) return n.node;
                if (r.node) return ((this.state = r.failState), r.node);
                if (n.node) return ((this.state = n.failState), n.node);
                throw r.error || n.error;
              }
              return super.parseSubscripts(e, t, s);
            }
            parseSubscript(e, t, s, i) {
              if (this.match(14) && this.isLookaheadToken_lt()) {
                if (((i.optionalChainMember = !0), s))
                  return ((i.stop = !0), e);
                this.next();
                let r = this.startNodeAt(t);
                return (
                  (r.callee = e),
                  (r.typeArguments =
                    this.flowParseTypeParameterInstantiationInExpression()),
                  this.expect(6),
                  (r.arguments = this.parseCallExpressionArguments()),
                  (r.optional = !0),
                  this.finishCallExpression(r, !0)
                );
              }
              if (
                !s &&
                this.shouldParseTypes() &&
                (this.match(43) || this.match(47))
              ) {
                let s = this.startNodeAt(t);
                s.callee = e;
                let r = this.tryParse(
                  () => (
                    (s.typeArguments =
                      this.flowParseTypeParameterInstantiationCallOrNew()),
                    this.expect(6),
                    (s.arguments = super.parseCallExpressionArguments()),
                    i.optionalChainMember && (s.optional = !1),
                    this.finishCallExpression(s, i.optionalChainMember)
                  )
                );
                if (r.node)
                  return (r.error && (this.state = r.failState), r.node);
              }
              return super.parseSubscript(e, t, s, i);
            }
            parseNewCallee(e) {
              super.parseNewCallee(e);
              let t = null;
              (this.shouldParseTypes() &&
                this.match(43) &&
                (t = this.tryParse(() =>
                  this.flowParseTypeParameterInstantiationCallOrNew()
                ).node),
                (e.typeArguments = t));
            }
            parseAsyncArrowWithTypeParameters(e) {
              let t = this.startNodeAt(e);
              if ((this.parseFunctionParams(t, !1), this.parseArrow(t)))
                return super.parseArrowExpression(t, void 0, !0);
            }
            readToken_mult_modulo(e) {
              let t = this.input.charCodeAt(this.state.pos + 1);
              if (42 === e && 47 === t && this.state.hasFlowComment) {
                ((this.state.hasFlowComment = !1),
                  (this.state.pos += 2),
                  this.nextToken());
                return;
              }
              super.readToken_mult_modulo(e);
            }
            readToken_pipe_amp(e) {
              let t = this.input.charCodeAt(this.state.pos + 1);
              124 === e && 125 === t
                ? this.finishOp(5, 2)
                : super.readToken_pipe_amp(e);
            }
            parseTopLevel(e, t) {
              let s = super.parseTopLevel(e, t);
              return (
                this.state.hasFlowComment &&
                  this.raise(
                    eu.UnterminatedFlowComment,
                    this.state.curPosition()
                  ),
                s
              );
            }
            skipBlockComment() {
              if (this.hasPlugin('flowComments') && this.skipFlowComment()) {
                if (this.state.hasFlowComment)
                  throw this.raise(eu.NestedFlowComment, this.state.startLoc);
                this.hasFlowCommentCompletion();
                let e = this.skipFlowComment();
                e && ((this.state.pos += e), (this.state.hasFlowComment = !0));
                return;
              }
              return super.skipBlockComment(
                this.state.hasFlowComment ? '*-/' : '*/'
              );
            }
            skipFlowComment() {
              let { pos: e } = this.state,
                t = 2;
              for (; [32, 9].includes(this.input.charCodeAt(e + t));) t++;
              let s = this.input.charCodeAt(t + e),
                i = this.input.charCodeAt(t + e + 1);
              return 58 === s && 58 === i
                ? t + 2
                : 'flow-include' === this.input.slice(t + e, t + e + 12)
                  ? t + 12
                  : 58 === s && 58 !== i && t;
            }
            hasFlowCommentCompletion() {
              if (-1 === this.input.indexOf('*/', this.state.pos))
                throw this.raise(
                  b.UnterminatedComment,
                  this.state.curPosition()
                );
            }
            flowEnumErrorBooleanMemberNotInitialized(e, t) {
              this.raise(eu.EnumBooleanMemberNotInitialized, e, t);
            }
            flowEnumErrorInvalidMemberInitializer(e, t) {
              return this.raise(
                t.explicitType
                  ? 'symbol' === t.explicitType
                    ? eu.EnumInvalidMemberInitializerSymbolType
                    : eu.EnumInvalidMemberInitializerPrimaryType
                  : eu.EnumInvalidMemberInitializerUnknownType,
                e,
                t
              );
            }
            flowEnumErrorNumberMemberNotInitialized(e, t) {
              this.raise(eu.EnumNumberMemberNotInitialized, e, t);
            }
            flowEnumErrorStringMemberInconsistentlyInitialized(e, t) {
              this.raise(eu.EnumStringMemberInconsistentlyInitialized, e, t);
            }
            flowEnumMemberInit() {
              let e = this.state.startLoc,
                t = () => this.match(8) || this.match(4);
              switch (this.state.type) {
                case 131: {
                  let e = this.parseNumericLiteral(this.state.value);
                  if (t()) return { type: 'number', loc: e.start, value: e };
                  break;
                }
                case 130: {
                  let e = this.parseStringLiteral(this.state.value);
                  if (t()) return { type: 'string', loc: e.start, value: e };
                  break;
                }
                case 81:
                case 82: {
                  let e = this.parseBooleanLiteral(this.match(81));
                  if (t()) return { type: 'boolean', loc: e.start, value: e };
                }
              }
              return { type: 'invalid', loc: e };
            }
            flowEnumMemberRaw() {
              let e = this.state.startLoc;
              return {
                id: this.parseIdentifier(!0),
                init: this.eat(25)
                  ? this.flowEnumMemberInit()
                  : { type: 'none', loc: e }
              };
            }
            flowEnumCheckExplicitTypeMismatch(e, t, s) {
              let { explicitType: i } = t;
              null !== i &&
                i !== s &&
                this.flowEnumErrorInvalidMemberInitializer(e, t);
            }
            flowEnumMembers({ enumName: e, explicitType: t }) {
              let s = new Set(),
                i = {
                  booleanMembers: [],
                  numberMembers: [],
                  stringMembers: [],
                  defaultedMembers: []
                },
                r = !1;
              for (; !this.match(4);) {
                if (this.eat(17)) {
                  r = !0;
                  break;
                }
                let n = this.startNode(),
                  { id: o, init: h } = this.flowEnumMemberRaw(),
                  p = o.name;
                if ('' === p) continue;
                (/^[a-z]/.test(p) &&
                  this.raise(eu.EnumInvalidMemberName, o, {
                    memberName: p,
                    suggestion: p[0].toUpperCase() + p.slice(1),
                    enumName: e
                  }),
                  s.has(p) &&
                    this.raise(eu.EnumDuplicateMemberName, o, {
                      memberName: p,
                      enumName: e
                    }),
                  s.add(p));
                let l = { enumName: e, explicitType: t, memberName: p };
                switch (((n.id = o), h.type)) {
                  case 'boolean':
                    (this.flowEnumCheckExplicitTypeMismatch(
                      h.loc,
                      l,
                      'boolean'
                    ),
                      (n.init = h.value),
                      i.booleanMembers.push(
                        this.finishNode(n, 'EnumBooleanMember')
                      ));
                    break;
                  case 'number':
                    (this.flowEnumCheckExplicitTypeMismatch(h.loc, l, 'number'),
                      (n.init = h.value),
                      i.numberMembers.push(
                        this.finishNode(n, 'EnumNumberMember')
                      ));
                    break;
                  case 'string':
                    (this.flowEnumCheckExplicitTypeMismatch(h.loc, l, 'string'),
                      (n.init = h.value),
                      i.stringMembers.push(
                        this.finishNode(n, 'EnumStringMember')
                      ));
                    break;
                  case 'invalid':
                    throw this.flowEnumErrorInvalidMemberInitializer(h.loc, l);
                  case 'none':
                    switch (t) {
                      case 'boolean':
                        this.flowEnumErrorBooleanMemberNotInitialized(h.loc, l);
                        break;
                      case 'number':
                        this.flowEnumErrorNumberMemberNotInitialized(h.loc, l);
                        break;
                      default:
                        i.defaultedMembers.push(
                          this.finishNode(n, 'EnumDefaultedMember')
                        );
                    }
                }
                this.match(4) || this.expect(8);
              }
              return { members: i, hasUnknownMembers: r };
            }
            flowEnumStringMembers(e, t, { enumName: s }) {
              if (0 === e.length) return t;
              if (0 === t.length) return e;
              if (t.length > e.length) {
                for (let t of e)
                  this.flowEnumErrorStringMemberInconsistentlyInitialized(t, {
                    enumName: s
                  });
                return t;
              }
              for (let e of t)
                this.flowEnumErrorStringMemberInconsistentlyInitialized(e, {
                  enumName: s
                });
              return e;
            }
            flowEnumParseExplicitType({ enumName: e }) {
              if (!this.eatContextual(98)) return null;
              if (!U(this.state.type))
                throw this.raise(
                  eu.EnumInvalidExplicitTypeUnknownSupplied,
                  this.state.startLoc,
                  { enumName: e }
                );
              let { value: t } = this.state;
              return (
                this.next(),
                'boolean' !== t &&
                  'number' !== t &&
                  'string' !== t &&
                  'symbol' !== t &&
                  this.raise(eu.EnumInvalidExplicitType, this.state.startLoc, {
                    enumName: e,
                    invalidEnumType: t
                  }),
                t
              );
            }
            flowEnumBody(e, t) {
              let s = t.name,
                i = t.start,
                r = this.flowEnumParseExplicitType({ enumName: s });
              this.expect(2);
              let { members: n, hasUnknownMembers: o } = this.flowEnumMembers({
                enumName: s,
                explicitType: r
              });
              switch (((e.hasUnknownMembers = o), r)) {
                case 'boolean':
                  return (
                    (e.explicitType = !0),
                    (e.members = n.booleanMembers),
                    this.expect(4),
                    this.finishNode(e, 'EnumBooleanBody')
                  );
                case 'number':
                  return (
                    (e.explicitType = !0),
                    (e.members = n.numberMembers),
                    this.expect(4),
                    this.finishNode(e, 'EnumNumberBody')
                  );
                case 'string':
                  return (
                    (e.explicitType = !0),
                    (e.members = this.flowEnumStringMembers(
                      n.stringMembers,
                      n.defaultedMembers,
                      { enumName: s }
                    )),
                    this.expect(4),
                    this.finishNode(e, 'EnumStringBody')
                  );
                case 'symbol':
                  return (
                    (e.members = n.defaultedMembers),
                    this.expect(4),
                    this.finishNode(e, 'EnumSymbolBody')
                  );
                default: {
                  let t = () => (
                    (e.members = []),
                    this.expect(4),
                    this.finishNode(e, 'EnumStringBody')
                  );
                  e.explicitType = !1;
                  let r = n.booleanMembers.length,
                    o = n.numberMembers.length,
                    h = n.stringMembers.length,
                    p = n.defaultedMembers.length;
                  if (!r && !o && !h && !p) return t();
                  if (!r && !o)
                    return (
                      (e.members = this.flowEnumStringMembers(
                        n.stringMembers,
                        n.defaultedMembers,
                        { enumName: s }
                      )),
                      this.expect(4),
                      this.finishNode(e, 'EnumStringBody')
                    );
                  if (o || h || !(r >= p))
                    if (r || h || !(o >= p))
                      return (
                        this.raise(eu.EnumInconsistentMemberValues, i, {
                          enumName: s
                        }),
                        t()
                      );
                    else {
                      for (let e of n.defaultedMembers)
                        this.flowEnumErrorNumberMemberNotInitialized(e.start, {
                          enumName: s,
                          memberName: e.id.name
                        });
                      return (
                        (e.members = n.numberMembers),
                        this.expect(4),
                        this.finishNode(e, 'EnumNumberBody')
                      );
                    }
                  for (let e of n.defaultedMembers)
                    this.flowEnumErrorBooleanMemberNotInitialized(e.start, {
                      enumName: s,
                      memberName: e.id.name
                    });
                  return (
                    (e.members = n.booleanMembers),
                    this.expect(4),
                    this.finishNode(e, 'EnumBooleanBody')
                  );
                }
              }
            }
            flowParseEnumDeclaration(e) {
              let t = this.parseIdentifier();
              return (
                (e.id = t),
                (e.body = this.flowEnumBody(this.startNode(), t)),
                this.finishNode(e, 'EnumDeclaration')
              );
            }
            jsxParseOpeningElementAfterName(e) {
              return (
                this.shouldParseTypes() &&
                  (this.match(43) || this.match(47)) &&
                  (e.typeArguments =
                    this.flowParseTypeParameterInstantiationInExpression()),
                super.jsxParseOpeningElementAfterName(e)
              );
            }
            isLookaheadToken_lt() {
              let e = this.nextTokenStart();
              if (60 === this.input.charCodeAt(e)) {
                let t = this.input.charCodeAt(e + 1);
                return 60 !== t && 61 !== t;
              }
              return !1;
            }
            reScan_lt_gt() {
              let { type: e } = this.state;
              43 === e
                ? ((this.state.pos -= 1), this.readToken_lt())
                : 44 === e && ((this.state.pos -= 1), this.readToken_gt());
            }
            reScan_lt() {
              let { type: e } = this.state;
              return 47 === e
                ? ((this.state.pos -= 2), this.finishOp(43, 1), 43)
                : e;
            }
            maybeUnwrapTypeCastExpression(e) {
              return 'TypeCastExpression' === e.type ? e.expression : e;
            }
          },
        typescript: to,
        v8intrinsic: e =>
          class extends e {
            parseV8Intrinsic() {
              if (this.match(50)) {
                let e = this.state.startLoc,
                  t = this.startNode();
                if ((this.next(), U(this.state.type))) {
                  let e = this.parseIdentifierName(),
                    s = this.createIdentifier(t, e);
                  if (
                    (this.castNodeTo(s, 'V8IntrinsicIdentifier'), this.match(6))
                  )
                    return s;
                }
                this.unexpected(e);
              }
            }
            parseExprAtom(e) {
              return this.parseV8Intrinsic() || super.parseExprAtom(e);
            }
          },
        placeholders: e =>
          class extends e {
            parsePlaceholder(e) {
              if (this.match(129)) {
                let t = this.startNode();
                return (
                  this.next(),
                  this.assertNoSpace(),
                  (t.name = super.parseIdentifier(!0)),
                  this.assertNoSpace(),
                  this.expect(129),
                  this.finishPlaceholder(t, e)
                );
              }
            }
            finishPlaceholder(e, t) {
              let s = e;
              return (
                (s.expectedNode && s.type) ||
                  (s = this.finishNode(s, 'Placeholder')),
                (s.expectedNode = t),
                s
              );
            }
            getTokenFromCode(e) {
              37 === e && 37 === this.input.charCodeAt(this.state.pos + 1)
                ? this.finishOp(129, 2)
                : super.getTokenFromCode(e);
            }
            parseExprAtom(e) {
              return (
                this.parsePlaceholder('Expression') || super.parseExprAtom(e)
              );
            }
            parseIdentifier(e) {
              return (
                this.parsePlaceholder('Identifier') || super.parseIdentifier(e)
              );
            }
            checkReservedWord(e, t, s, i) {
              void 0 !== e && super.checkReservedWord(e, t, s, i);
            }
            cloneIdentifier(e) {
              let t = super.cloneIdentifier(e);
              return (
                'Placeholder' === t.type && (t.expectedNode = e.expectedNode),
                t
              );
            }
            cloneStringLiteral(e) {
              return 'Placeholder' === e.type
                ? this.cloneIdentifier(e)
                : super.cloneStringLiteral(e);
            }
            parseBindingAtom() {
              return (
                this.parsePlaceholder('Pattern') || super.parseBindingAtom()
              );
            }
            isValidLVal(e, t, s, i) {
              return 'Placeholder' === e || super.isValidLVal(e, t, s, i);
            }
            toAssignable(e, t) {
              e && 'Placeholder' === e.type && 'Expression' === e.expectedNode
                ? (e.expectedNode = 'Pattern')
                : super.toAssignable(e, t);
            }
            chStartsBindingIdentifier(e, t) {
              if (super.chStartsBindingIdentifier(e, t)) return !0;
              let s = this.nextTokenStart();
              return (
                37 === this.input.charCodeAt(s) &&
                37 === this.input.charCodeAt(s + 1)
              );
            }
            verifyBreakContinue(e, t) {
              e.label?.type !== 'Placeholder' &&
                super.verifyBreakContinue(e, t);
            }
            parseExpressionStatement(e, t) {
              return 'Placeholder' !== t.type || t.extra?.parenthesized
                ? super.parseExpressionStatement(e, t)
                : this.match(10)
                  ? ((e.label = this.finishPlaceholder(t, 'Identifier')),
                    this.next(),
                    (e.body =
                      super.parseStatementOrSloppyAnnexBFunctionDeclaration()),
                    this.finishNode(e, 'LabeledStatement'))
                  : (this.semicolon(),
                    (e.name = t.name),
                    this.finishPlaceholder(e, 'Statement'));
            }
            parseBlock(e, t, s) {
              return (
                this.parsePlaceholder('BlockStatement') ||
                super.parseBlock(e, t, s)
              );
            }
            parseFunctionId(e) {
              return (
                this.parsePlaceholder('Identifier') || super.parseFunctionId(e)
              );
            }
            parseClass(e, t, s) {
              let i = t ? 'ClassDeclaration' : 'ClassExpression';
              this.next();
              let r = this.state.strict,
                n = this.parsePlaceholder('Identifier');
              if (n)
                if (this.match(77) || this.match(129) || this.match(2))
                  e.id = n;
                else {
                  if (s || !t)
                    return (
                      (e.id = null),
                      (e.body = this.finishPlaceholder(n, 'ClassBody')),
                      this.finishNode(e, i)
                    );
                  throw this.raise(tp.ClassNameIsRequired, this.state.startLoc);
                }
              else this.parseClassId(e, t, s);
              return (
                super.parseClassSuper(e),
                (e.body =
                  this.parsePlaceholder('ClassBody') ||
                  super.parseClassBody(!!e.superClass, r)),
                this.finishNode(e, i)
              );
            }
            parseExport(e, t) {
              let s = this.parsePlaceholder('Identifier');
              if (!s) return super.parseExport(e, t);
              if (!this.isContextual(94) && !this.match(8))
                return (
                  (e.specifiers = []),
                  (e.source = null),
                  (e.declaration = this.finishPlaceholder(s, 'Declaration')),
                  this.finishNode(e, 'ExportNamedDeclaration')
                );
              this.expectPlugin('exportDefaultFrom');
              let i = this.startNode();
              return (
                (i.exported = s),
                (e.specifiers = [this.finishNode(i, 'ExportDefaultSpecifier')]),
                super.parseExport(e, t)
              );
            }
            isExportDefaultSpecifier() {
              if (this.match(61)) {
                let e = this.nextTokenStart();
                if (
                  this.isUnparsedContextual(e, 'from') &&
                  this.input.startsWith(k[129], this.nextTokenStartSince(e + 4))
                )
                  return !0;
              }
              return super.isExportDefaultSpecifier();
            }
            maybeParseExportDefaultSpecifier(e, t) {
              return (
                !!e.specifiers?.length ||
                super.maybeParseExportDefaultSpecifier(e, t)
              );
            }
            checkExport(e) {
              let { specifiers: t } = e;
              (t?.length &&
                (e.specifiers = t.filter(
                  e => 'Placeholder' === e.exported.type
                )),
                super.checkExport(e),
                (e.specifiers = t));
            }
            parseImport(e) {
              let t = this.parsePlaceholder('Identifier');
              if (!t) return super.parseImport(e);
              if (
                ((e.specifiers = []), !this.isContextual(94) && !this.match(8))
              )
                return (
                  (e.source = this.finishPlaceholder(t, 'StringLiteral')),
                  this.semicolon(),
                  this.finishNode(e, 'ImportDeclaration')
                );
              let s = this.startNodeAtNode(t);
              return (
                (s.local = t),
                e.specifiers.push(this.finishNode(s, 'ImportDefaultSpecifier')),
                this.eat(8) &&
                  (this.maybeParseStarImportSpecifier(e) ||
                    this.parseNamedImportSpecifiers(e)),
                this.expectContextual(94),
                (e.source = this.parseImportSource()),
                this.semicolon(),
                this.finishNode(e, 'ImportDeclaration')
              );
            }
            parseImportSource() {
              return (
                this.parsePlaceholder('StringLiteral') ||
                super.parseImportSource()
              );
            }
            assertNoSpace() {
              this.state.start >
                this.offsetToSourcePos(this.state.lastTokEndLoc.index) &&
                this.raise(tp.UnexpectedSpace, this.state.lastTokEndLoc);
            }
          }
      },
      td = Object.keys(tu),
      tm = class extends ts {
        constructor(e, t, s) {
          let i = (function (e) {
            let t = {
              sourceType: 'script',
              sourceFilename: void 0,
              startIndex: 0,
              startColumn: 0,
              startLine: 1,
              allowAwaitOutsideFunction: !1,
              allowReturnOutsideFunction: !1,
              allowNewTargetOutsideFunction: !1,
              allowImportExportEverywhere: !1,
              allowSuperOutsideMethod: !1,
              allowUndeclaredExports: !1,
              allowYieldOutsideFunction: !1,
              plugins: [],
              strictMode: void 0,
              ranges: !1,
              locations: !0,
              tokens: !1,
              createImportExpressions: !0,
              createParenthesizedExpressions: !1,
              errorRecovery: !1,
              attachComment: !0,
              annexB: !0
            };
            if (null == e) return t;
            if (null != e.annexB && !1 !== e.annexB)
              throw Error('The `annexB` option can only be set to `false`.');
            for (let s of Object.keys(t)) null != e[s] && (t[s] = e[s]);
            if (1 === t.startLine)
              null == e.startIndex && t.startColumn > 0
                ? (t.startIndex = t.startColumn)
                : null == e.startColumn &&
                  t.startIndex > 0 &&
                  (t.startColumn = t.startIndex);
            else if (null == e.startColumn || null == e.startIndex)
              throw Error(
                'With a `startLine > 1` you must also specify `startIndex` and `startColumn`.'
              );
            if ('commonjs' === t.sourceType) {
              if (null != e.allowAwaitOutsideFunction)
                throw Error(
                  "The `allowAwaitOutsideFunction` option cannot be used with `sourceType: 'commonjs'`."
                );
              if (null != e.allowReturnOutsideFunction)
                throw Error(
                  "`sourceType: 'commonjs'` implies `allowReturnOutsideFunction: true`, please remove the `allowReturnOutsideFunction` option or use `sourceType: 'script'`."
                );
              if (null != e.allowNewTargetOutsideFunction)
                throw Error(
                  "`sourceType: 'commonjs'` implies `allowNewTargetOutsideFunction: true`, please remove the `allowNewTargetOutsideFunction` option or use `sourceType: 'script'`."
                );
            }
            return t;
          })(e);
          (super(i, t),
            (this.options = i),
            this.initializeScopes(),
            (this.plugins = s),
            (this.filename = i.sourceFilename),
            (this.startIndex = i.startIndex));
          let r = 0;
          (i.allowAwaitOutsideFunction && (r |= 1),
            i.allowReturnOutsideFunction && (r |= 2),
            i.allowImportExportEverywhere && (r |= 8),
            i.allowSuperOutsideMethod && (r |= 16),
            i.allowUndeclaredExports && (r |= 64),
            i.allowNewTargetOutsideFunction && (r |= 4),
            i.allowYieldOutsideFunction && (r |= 32),
            i.ranges && (r |= 128),
            !0 === i.locations && (r |= 256),
            i.tokens && (r |= 512),
            i.createImportExpressions && (r |= 1024),
            i.createParenthesizedExpressions && (r |= 2048),
            i.errorRecovery && (r |= 4096),
            i.attachComment && (r |= 8192),
            i.annexB && (r |= 16384),
            (this.optionFlags = r));
        }
        getScopeHandler() {
          return eh;
        }
        parse() {
          this.enterInitialScopes();
          let e = this.startNode(),
            t = this.startNode();
          (this.nextToken(), (e.errors = []));
          let s = this.parseTopLevel(e, t);
          return (
            (s.errors = this.state.errors),
            (s.comments.length = this.state.commentsLen),
            s
          );
        }
      };
    function tf(e, t) {
      if (t?.sourceType !== 'unambiguous') return tx(t, e).parse();
      t = { ...t };
      try {
        t.sourceType = 'module';
        let s = tx(t, e),
          i = s.parse();
        if (s.sawUnambiguousESM) return i;
        if (s.ambiguousScriptDifferentAst)
          try {
            return ((t.sourceType = 'script'), tx(t, e).parse());
          } catch {}
        else i.program.sourceType = 'script';
        return i;
      } catch (s) {
        try {
          return ((t.sourceType = 'script'), tx(t, e).parse());
        } catch {}
        throw s;
      }
    }
    function ty(e, t) {
      let s = tx(t, e);
      return (s.options.strictMode && (s.state.strict = !0), s.getExpression());
    }
    function tx(e, t) {
      let s = tm,
        i = new Map();
      if (e?.plugins) {
        for (let t of e.plugins) {
          let e, s;
          ('string' == typeof t ? (e = t) : ([e, s] = t),
            i.has(e) || i.set(e, s || {}));
        }
        ((function (e) {
          if (e.has('decorators') && e.has('decorators-legacy'))
            throw Error(
              'Cannot use the decorators and decorators-legacy plugin together'
            );
          if (e.has('flow') && e.has('typescript'))
            throw Error('Cannot combine flow and typescript plugins.');
          if (e.has('placeholders') && e.has('v8intrinsic'))
            throw Error('Cannot combine placeholders and v8intrinsic plugins.');
          if (e.has('pipelineOperator')) {
            let t = e.get('pipelineOperator').proposal;
            if (!tl.includes(t)) {
              let e = tl.map(e => `"${e}"`).join(', ');
              throw Error(
                `"pipelineOperator" requires "proposal" option whose value must be one of: ${e}.`
              );
            }
            if ('hack' === t) {
              if (e.has('placeholders'))
                throw Error(
                  'Cannot combine placeholders plugin and Hack-style pipes.'
                );
              if (e.has('v8intrinsic'))
                throw Error(
                  'Cannot combine v8intrinsic plugin and Hack-style pipes.'
                );
              let t = e.get('pipelineOperator').topicToken;
              if (!tc.includes(t)) {
                let e = tc.map(e => `"${e}"`).join(', ');
                throw Error(
                  `"pipelineOperator" in "proposal": "hack" mode also requires a "topicToken" option whose value must be one of: ${e}.`
                );
              }
            }
          }
          if (e.has('moduleAttributes'))
            throw Error(
              '`moduleAttributes` has been removed in Babel 8, please migrate to import attributes instead.'
            );
          if (e.has('importAssertions'))
            throw Error(
              '`importAssertions` has been removed in Babel 8, please use import attributes instead.'
            );
          if (
            (e.has('deprecatedImportAssert')
              ? console.warn(
                  '`deprecatedImportAssert` has been removed in Babel 8, please use import attributes instead.'
                )
              : e.has('importAttributes') &&
                e.get('importAttributes').deprecatedAssertSyntax &&
                console.warn(
                  "The 'importAttributes' plugin has been removed in Babel 8. Please migrate any usage of `assert`-style attributes to `with`."
                ),
            e.has('recordAndTuple'))
          )
            throw Error(
              "The 'recordAndTuple' plugin has been removed in Babel 8. Please remove it from your configuration."
            );
          if (e.has('asyncDoExpressions') && !e.has('doExpressions')) {
            let e = Error(
              "'asyncDoExpressions' requires 'doExpressions', please add 'doExpressions' to parser plugins."
            );
            throw ((e.missingPlugins = 'doExpressions'), e);
          }
          if (
            e.has('optionalChainingAssign') &&
            '2023-07' !== e.get('optionalChainingAssign').version
          )
            throw Error(
              "The 'optionalChainingAssign' plugin requires a 'version' option, representing the last proposal update. Currently, the only supported value is '2023-07'."
            );
          if (
            e.has('discardBinding') &&
            'void' !== e.get('discardBinding').syntaxType
          )
            throw Error(
              "The 'discardBinding' plugin requires a 'syntaxType' option. Currently the only supported value is 'void'."
            );
          if (e.has('decimal'))
            throw Error(
              "The 'decimal' plugin has been removed in Babel 8. Please remove it from your configuration."
            );
          if (e.has('importReflection'))
            throw Error(
              "The 'importReflection' plugin has been removed in Babel 8. Use 'sourcePhaseImports' instead, and replace 'import module' with 'import source' in your code."
            );
        })(i),
          (s = (function (e) {
            let t = [];
            for (let s of td) e.has(s) && t.push(s);
            let s = t.join('|'),
              i = tT.get(s);
            if (!i) {
              for (let e of ((i = tm), t)) i = tu[e](i);
              tT.set(s, i);
            }
            return i;
          })(i)));
      }
      return new s(e, t, i);
    }
    var tP = B;
    let tg = {};
    for (let e of Object.keys(tP)) tg[e] = w[tP[e]];
    var tT = new Map();
    function tb(e) {
      return (t, s, i) => {
        if (!1 === s) return !1;
        let r = !!i?.backwards,
          { length: n } = t,
          o = s;
        for (; o >= 0 && o < n;) {
          let s = t.charAt(o);
          if (e instanceof RegExp) {
            if (!e.test(s)) return o;
          } else if (!e.includes(s)) return o;
          r ? o-- : o++;
        }
        return (-1 === o || o === n) && o;
      };
    }
    var tA = tb(' 	'),
      tS = tb(/[^\n\r]/),
      tE = function (e, t) {
        if (!1 === t) return !1;
        if ('/' === e.charAt(t) && '*' === e.charAt(t + 1)) {
          for (let s = t + 2; s < e.length; ++s)
            if ('*' === e.charAt(s) && '/' === e.charAt(s + 1)) return s + 2;
        }
        return t;
      },
      tC = e =>
        e ===
          `
` ||
        '\r' === e ||
        '\u2028' === e ||
        '\u2029' === e,
      tI = function (e, t, s) {
        if (!1 === t) return !1;
        let i = !!s?.backwards,
          r = e.charAt(t);
        if (i) {
          if (
            '\r' === e.charAt(t - 1) &&
            r ===
              `
`
          )
            return t - 2;
          if (tC(r)) return t - 1;
        } else {
          if (
            '\r' === r &&
            e.charAt(t + 1) ===
              `
`
          )
            return t + 2;
          if (tC(r)) return t + 1;
        }
        return t;
      },
      tN = function (e, t) {
        let s = null,
          i = t;
        for (; i !== s;) {
          var r;
          ((s = i),
            (i = tA(e, i)),
            (i = tE(e, i)),
            (i = tI(
              e,
              (i =
                !1 !== (r = i) &&
                ('/' === e.charAt(r) && '/' === e.charAt(r + 1) ? tS(e, r) : r))
            )));
        }
        return i;
      },
      tw = function (e) {
        if (!e.startsWith('#!')) return '';
        let t = e.indexOf(`
`);
        return -1 === t ? e : e.slice(0, t);
      },
      tk =
        Array.prototype.findLast ??
        function (e) {
          for (let t = this.length - 1; t >= 0; t--) {
            let s = this[t];
            if (e(s, t, this)) return s;
          }
        },
      tv = h('findLast', function () {
        if (Array.isArray(this)) return tk;
      }),
      tL = Symbol.for('comments');
    function tM(e) {
      return this[e < 0 ? this.length + e : e];
    }
    var tD = h('at', function () {
      if (Array.isArray(this) || 'string' == typeof this) return tM;
    });
    function tO(e) {
      let t = new Set(e);
      return e => t.has(e?.type);
    }
    function tF(e) {
      return e.range?.[1] ?? e.end;
    }
    function tB(e) {
      let t = e.range?.[0] ?? e.start,
        s = (e.declaration?.decorators ?? e.decorators)?.[0];
      return s ? Math.min(tB(s), t) : t;
    }
    var tU = e => t => (t.label ? tz(t.label) : tB(t) + e),
      tR = e => e.__contentEnd ?? tF(e),
      tj = [
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
      t_ = new Map([
        ['BreakStatement', tU(5)],
        ['ContinueStatement', tU(8)],
        ['DebuggerStatement', e => tB(e) + 8],
        ['VariableDeclaration', e => tz(tD(0, e.declarations, -1))],
        ...tj.map(e => [e, tR])
      ]),
      tV = tO(tj);
    function tz(e) {
      let { type: t } = e;
      return 'IfStatement' === t
        ? tz(e.alternate ?? e.consequent)
        : 'ForInStatement' === t ||
            'ForOfStatement' === t ||
            'ForStatement' === t ||
            'LabeledStatement' === t ||
            'WithStatement' === t ||
            'WhileStatement' === t
          ? tz(e.body)
          : (t_.get(t)?.(e) ?? tF(e));
    }
    var tH = tO(['Block', 'CommentBlock', 'MultiLine']),
      t$ = tO([
        'Line',
        'CommentLine',
        'SingleLine',
        'HashbangComment',
        'HTMLOpen',
        'HTMLClose',
        'Hashbang',
        'InterpreterDirective'
      ]);
    function tq(e, t, s) {
      if (!e.has(t)) {
        let i = s(t);
        e.set(t, i);
      }
      return e.get(t);
    }
    var tK = new WeakMap(),
      tW = new WeakMap();
    function tJ(e) {
      if (
        !tH(e) ||
        !e.value.includes(`
`)
      )
        return [];
      let t = [];
      for (let s of `*${e.value}*`.split(`
`)) {
        if (!(s = s.trimStart()).startsWith('*')) return [];
        t.push(s);
      }
      return t;
    }
    var tX = new WeakMap();
    function tG(e) {
      return tq(tX, e, tJ).length > 0;
    }
    var tY = null;
    function tQ(e) {
      if (null !== tY && (tY.property, 1)) {
        let e = tY;
        return ((tY = tQ.prototype = null), e);
      }
      return ((tY = tQ.prototype = e ?? Object.create(null)), new tQ());
    }
    for (let e = 0; e <= 10; e++) tQ();
    var tZ = [
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
      t1 = (function (e, t = 'type') {
        return (
          tQ(e),
          function (s) {
            let i = s[t],
              r = e[i];
            if (!Array.isArray(r))
              throw Object.assign(Error(`Missing visitor keys for '${i}'.`), {
                node: s
              });
            return r;
          }
        );
      })({
        ArrayExpression: tZ[0],
        AssignmentExpression: tZ[1],
        BinaryExpression: tZ[1],
        InterpreterDirective: [],
        Directive: tZ[2],
        DirectiveLiteral: [],
        BlockStatement: tZ[3],
        BreakStatement: tZ[4],
        CallExpression: tZ[5],
        CatchClause: ['param', 'body'],
        ConditionalExpression: tZ[6],
        ContinueStatement: tZ[4],
        DebuggerStatement: [],
        DoWhileStatement: tZ[7],
        EmptyStatement: [],
        ExpressionStatement: tZ[8],
        File: ['program'],
        ForInStatement: tZ[9],
        ForStatement: ['init', 'test', 'update', 'body'],
        FunctionDeclaration: tZ[10],
        FunctionExpression: tZ[10],
        Identifier: ['typeAnnotation', 'decorators'],
        IfStatement: tZ[6],
        LabeledStatement: ['label', 'body'],
        StringLiteral: [],
        NumericLiteral: [],
        NullLiteral: [],
        BooleanLiteral: [],
        RegExpLiteral: [],
        LogicalExpression: tZ[1],
        MemberExpression: tZ[11],
        NewExpression: tZ[5],
        Program: tZ[3],
        ObjectExpression: tZ[12],
        ObjectMethod: tZ[13],
        ObjectProperty: tZ[14],
        RestElement: ['argument', 'typeAnnotation', 'decorators'],
        ReturnStatement: tZ[15],
        SequenceExpression: tZ[16],
        ParenthesizedExpression: tZ[8],
        SwitchCase: ['test', 'consequent'],
        SwitchStatement: ['discriminant', 'cases'],
        ThisExpression: [],
        ThrowStatement: tZ[15],
        TryStatement: ['block', 'handler', 'finalizer'],
        UnaryExpression: tZ[15],
        UpdateExpression: tZ[15],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: tZ[17],
        WhileStatement: tZ[7],
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
        ClassBody: tZ[18],
        ClassExpression: tZ[19],
        ClassDeclaration: tZ[19],
        ExportAllDeclaration: ['source', 'attributes', 'exported'],
        ExportDefaultDeclaration: ['declaration'],
        ExportNamedDeclaration: tZ[20],
        ExportSpecifier: ['local', 'exported'],
        ForOfStatement: tZ[9],
        ImportDeclaration: ['specifiers', 'source', 'attributes'],
        ImportDefaultSpecifier: tZ[21],
        ImportNamespaceSpecifier: tZ[21],
        ImportSpecifier: ['imported', 'local'],
        MetaProperty: ['meta', 'property'],
        ClassMethod: tZ[13],
        ObjectPattern: ['decorators', 'properties', 'typeAnnotation'],
        SpreadElement: tZ[15],
        Super: [],
        TaggedTemplateExpression: ['tag', 'typeArguments', 'quasi'],
        TemplateElement: [],
        TemplateLiteral: ['quasis', 'expressions'],
        YieldExpression: tZ[15],
        AwaitExpression: tZ[15],
        ImportExpression: ['source', 'options'],
        BigIntLiteral: [],
        ExportNamespaceSpecifier: tZ[22],
        OptionalMemberExpression: tZ[11],
        OptionalCallExpression: tZ[5],
        ClassProperty: tZ[23],
        ClassPrivateProperty: tZ[23],
        ClassPrivateMethod: tZ[13],
        PrivateName: tZ[24],
        StaticBlock: tZ[18],
        ImportAttribute: tZ[25],
        AnyTypeAnnotation: [],
        ArrayTypeAnnotation: tZ[26],
        BooleanTypeAnnotation: [],
        BooleanLiteralTypeAnnotation: [],
        NullLiteralTypeAnnotation: [],
        ClassImplements: tZ[27],
        DeclareClass: [
          'id',
          'typeParameters',
          'extends',
          'mixins',
          'implements',
          'body'
        ],
        DeclareFunction: ['id', 'predicate'],
        DeclareInterface: tZ[28],
        DeclareModule: tZ[29],
        DeclareModuleExports: tZ[30],
        DeclareTypeAlias: tZ[31],
        DeclareOpaqueType: [
          'id',
          'typeParameters',
          'supertype',
          'lowerBound',
          'upperBound'
        ],
        DeclareVariable: ['id', 'declarations'],
        DeclareExportDeclaration: tZ[20],
        DeclareExportAllDeclaration: ['source', 'attributes'],
        DeclaredPredicate: tZ[2],
        ExistsTypeAnnotation: [],
        FunctionTypeAnnotation: [
          'typeParameters',
          'this',
          'params',
          'rest',
          'returnType'
        ],
        FunctionTypeParam: tZ[32],
        GenericTypeAnnotation: tZ[27],
        InferredPredicate: [],
        InterfaceExtends: tZ[27],
        InterfaceDeclaration: tZ[28],
        InterfaceTypeAnnotation: ['extends', 'body'],
        IntersectionTypeAnnotation: tZ[33],
        MixedTypeAnnotation: [],
        EmptyTypeAnnotation: [],
        NullableTypeAnnotation: tZ[30],
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
        ObjectTypeCallProperty: tZ[2],
        ObjectTypeIndexer: ['variance', 'id', 'key', 'value'],
        ObjectTypeProperty: ['key', 'value', 'variance'],
        ObjectTypeSpreadProperty: tZ[15],
        OpaqueType: [
          'id',
          'typeParameters',
          'supertype',
          'impltype',
          'lowerBound',
          'upperBound'
        ],
        QualifiedTypeIdentifier: tZ[34],
        StringLiteralTypeAnnotation: [],
        StringTypeAnnotation: [],
        SymbolTypeAnnotation: [],
        ThisTypeAnnotation: [],
        TupleTypeAnnotation: tZ[35],
        TypeofTypeAnnotation: ['argument', 'typeArguments'],
        TypeAlias: tZ[31],
        TypeAnnotation: tZ[30],
        TypeCastExpression: tZ[36],
        TypeParameter: ['bound', 'default', 'variance'],
        TypeParameterDeclaration: tZ[37],
        TypeParameterInstantiation: tZ[37],
        UnionTypeAnnotation: tZ[33],
        Variance: [],
        VoidTypeAnnotation: [],
        EnumDeclaration: tZ[29],
        EnumBooleanBody: tZ[38],
        EnumNumberBody: tZ[38],
        EnumStringBody: tZ[38],
        EnumSymbolBody: tZ[38],
        EnumBooleanMember: tZ[17],
        EnumNumberMember: tZ[17],
        EnumStringMember: tZ[17],
        EnumDefaultedMember: tZ[24],
        IndexedAccessType: tZ[39],
        OptionalIndexedAccessType: tZ[39],
        JSXAttribute: ['name', 'value'],
        JSXClosingElement: ['name'],
        JSXElement: ['openingElement', 'children', 'closingElement'],
        JSXEmptyExpression: [],
        JSXExpressionContainer: tZ[8],
        JSXSpreadChild: tZ[8],
        JSXIdentifier: [],
        JSXMemberExpression: tZ[11],
        JSXNamespacedName: ['namespace', 'name'],
        JSXOpeningElement: ['name', 'typeArguments', 'attributes'],
        JSXSpreadAttribute: tZ[15],
        JSXText: [],
        JSXFragment: ['openingFragment', 'children', 'closingFragment'],
        JSXOpeningFragment: [],
        JSXClosingFragment: [],
        Placeholder: [],
        V8IntrinsicIdentifier: [],
        ArgumentPlaceholder: [],
        BindExpression: ['object', 'callee'],
        ClassAccessorProperty: tZ[40],
        Decorator: tZ[8],
        DoExpression: tZ[18],
        ExportDefaultSpecifier: tZ[22],
        ModuleExpression: tZ[18],
        TopicReference: [],
        VoidPattern: [],
        TSParameterProperty: ['parameter', 'decorators'],
        TSDeclareFunction: tZ[41],
        TSDeclareMethod: tZ[42],
        TSQualifiedName: tZ[1],
        TSCallSignatureDeclaration: tZ[43],
        TSConstructSignatureDeclaration: tZ[43],
        TSPropertySignature: ['key', 'typeAnnotation'],
        TSMethodSignature: tZ[42],
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
        TSFunctionType: tZ[43],
        TSConstructorType: tZ[43],
        TSTypeReference: ['typeName', 'typeArguments'],
        TSTypePredicate: tZ[44],
        TSTypeQuery: ['exprName', 'typeArguments'],
        TSTypeLiteral: tZ[38],
        TSArrayType: tZ[26],
        TSTupleType: tZ[35],
        TSOptionalType: tZ[30],
        TSRestType: tZ[30],
        TSNamedTupleMember: ['label', 'elementType'],
        TSUnionType: tZ[33],
        TSIntersectionType: tZ[33],
        TSConditionalType: tZ[45],
        TSInferType: tZ[46],
        TSParenthesizedType: tZ[30],
        TSTypeOperator: tZ[30],
        TSIndexedAccessType: tZ[39],
        TSMappedType: ['key', 'constraint', 'nameType', 'typeAnnotation'],
        TSTemplateLiteralType: ['quasis', 'types'],
        TSLiteralType: tZ[47],
        TSClassImplements: tZ[48],
        TSInterfaceHeritage: tZ[48],
        TSInterfaceDeclaration: tZ[28],
        TSInterfaceBody: tZ[18],
        TSTypeAliasDeclaration: ['id', 'typeParameters', 'typeAnnotation'],
        TSInstantiationExpression: tZ[48],
        TSAsExpression: tZ[36],
        TSSatisfiesExpression: tZ[36],
        TSTypeAssertion: tZ[36],
        TSEnumBody: tZ[38],
        TSEnumDeclaration: tZ[29],
        TSEnumMember: ['id', 'initializer'],
        TSModuleDeclaration: tZ[29],
        TSModuleBlock: tZ[18],
        TSImportType: ['source', 'options', 'qualifier', 'typeArguments'],
        TSImportEqualsDeclaration: ['id', 'moduleReference'],
        TSExternalModuleReference: tZ[8],
        TSNonNullExpression: tZ[8],
        TSExportAssignment: tZ[8],
        TSNamespaceExportDeclaration: tZ[24],
        TSTypeAnnotation: tZ[30],
        TSTypeParameterInstantiation: tZ[37],
        TSTypeParameterDeclaration: tZ[37],
        TSTypeParameter: ['name', 'constraint', 'default'],
        ChainExpression: tZ[8],
        Literal: [],
        MethodDefinition: tZ[14],
        PrivateIdentifier: [],
        Property: tZ[25],
        PropertyDefinition: tZ[23],
        AccessorProperty: tZ[40],
        TSAbstractAccessorProperty: tZ[49],
        TSAbstractKeyword: [],
        TSAbstractMethodDefinition: tZ[25],
        TSAbstractPropertyDefinition: tZ[49],
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
        AsConstExpression: tZ[8],
        AsExpression: tZ[36],
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
        ComponentTypeParameter: tZ[32],
        ConditionalTypeAnnotation: tZ[45],
        DeclareComponent: [
          'id',
          'params',
          'rest',
          'typeParameters',
          'rendersType'
        ],
        DeclareEnum: tZ[29],
        DeclareHook: tZ[24],
        DeclareNamespace: tZ[29],
        EnumBigIntBody: tZ[38],
        EnumBigIntMember: tZ[17],
        EnumBody: tZ[38],
        HookDeclaration: tZ[41],
        HookTypeAnnotation: ['params', 'returnType', 'rest', 'typeParameters'],
        InferTypeAnnotation: tZ[46],
        KeyofTypeAnnotation: tZ[15],
        MatchArrayPattern: ['elements', 'rest'],
        MatchAsPattern: ['pattern', 'target'],
        MatchBindingPattern: tZ[24],
        MatchExpression: tZ[50],
        MatchExpressionCase: tZ[51],
        MatchIdentifierPattern: tZ[24],
        MatchInstanceObjectPattern: tZ[52],
        MatchInstancePattern: ['targetConstructor', 'properties'],
        MatchLiteralPattern: tZ[47],
        MatchMemberPattern: ['base', 'property'],
        MatchObjectPattern: tZ[52],
        MatchObjectPatternProperty: ['key', 'pattern'],
        MatchOrPattern: ['patterns'],
        MatchRestPattern: tZ[15],
        MatchStatement: tZ[50],
        MatchStatementCase: tZ[51],
        MatchUnaryPattern: tZ[15],
        MatchWildcardPattern: [],
        NeverTypeAnnotation: [],
        ObjectTypeMappedTypeProperty: [
          'keyTparam',
          'propType',
          'sourceType',
          'variance'
        ],
        QualifiedTypeofIdentifier: tZ[34],
        RecordDeclaration: ['id', 'typeParameters', 'implements', 'body'],
        RecordDeclarationBody: tZ[0],
        RecordDeclarationImplements: ['id', 'typeArguments'],
        RecordDeclarationProperty: ['key', 'typeAnnotation', 'defaultValue'],
        RecordDeclarationStaticProperty: ['key', 'typeAnnotation', 'value'],
        RecordExpression: ['recordConstructor', 'typeArguments', 'properties'],
        RecordExpressionProperties: tZ[12],
        SatisfiesExpression: tZ[36],
        TupleTypeLabeledElement: ['label', 'elementType', 'variance'],
        TupleTypeSpreadElement: ['label', 'typeAnnotation'],
        TypeOperator: tZ[30],
        TypePredicate: tZ[44],
        UndefinedTypeAnnotation: [],
        UnknownTypeAnnotation: [],
        NGChainedExpression: tZ[16],
        NGEmptyExpression: [],
        NGPipeExpression: ['left', 'right', 'arguments'],
        NGMicrosyntax: tZ[18],
        NGMicrosyntaxAs: ['key', 'alias'],
        NGMicrosyntaxExpression: ['expression', 'alias'],
        NGMicrosyntaxKey: [],
        NGMicrosyntaxKeyedExpression: ['key', 'expression'],
        NGMicrosyntaxLet: tZ[25],
        NGRoot: tZ[53],
        JsExpressionRoot: tZ[53],
        JsonRoot: tZ[53],
        TSJSDocAllType: [],
        TSJSDocUnknownType: [],
        TSJSDocNullableType: tZ[30],
        TSJSDocNonNullableType: tZ[30]
      }),
      t0 = function e(t, s) {
        var i;
        if (null === (i = t) || 'object' != typeof i) return t;
        if (Array.isArray(t)) {
          for (let i = 0; i < t.length; i++) t[i] = e(t[i], s);
          return t;
        }
        if (s.onEnter) {
          let i = s.onEnter(t) ?? t;
          if (i !== t) return e(i, s);
          t = i;
        }
        let r = t1(t);
        for (let i = 0; i < r.length; i++) t[r[i]] = e(t[r[i]], s);
        return (s.onLeave && (t = s.onLeave(t) || t), t);
      };
    function t2(e) {
      return (
        'LogicalExpression' === e.type &&
        'LogicalExpression' === e.right.type &&
        e.operator === e.right.operator
      );
    }
    tO([
      'RegExpLiteral',
      'BigIntLiteral',
      'NumericLiteral',
      'StringLiteral',
      'DirectiveLiteral',
      'Literal',
      'JSXText',
      'TemplateElement',
      'StringLiteralTypeAnnotation',
      'NumberLiteralTypeAnnotation',
      'BigIntLiteralTypeAnnotation'
    ]);
    var t3 = function (e, t) {
        let s,
          i,
          { text: r, astType: n } = t,
          { comments: o } = e;
        if (!(o.length < 2))
          for (let e = o.length - 1; e >= 0; e--) {
            let t = o[e];
            if (
              (s &&
                tz(t) === tB(s) &&
                tG(t) &&
                tG(s) &&
                (o.splice(e + 1, 1),
                (t.value += '*//*' + s.value),
                (t.range = [tB(t), tz(s)]),
                tX.delete(t)),
              !t$(t) && !tH(t))
            )
              throw TypeError(`Unknown comment type: "${t.type}".`);
            s = t;
          }
        let h = 'File' === e.type ? e.program : e;
        return (
          h.interpreter && (o.unshift(h.interpreter), delete h.interpreter),
          e.hashbang &&
            (('oxc-ts' === n || 'yuku-js' === n || 'yuku-ts' === n) &&
              o.unshift(e.hashbang),
            delete e.hashbang),
          'Program' === e.type && (e.range = [0, r.length]),
          (e = t0(e, {
            onEnter(t) {
              switch (
                ((function (e, t, s) {
                  var i;
                  if (!tV(e)) return;
                  let r = tF(e);
                  if (';' !== s[r - 1]) return;
                  let n = tq(tW, (i = { [tL]: t, originalText: s })[tL], e =>
                    (function (e, t) {
                      for (let s of t) {
                        let t = tB(s),
                          i = tz(s);
                        e =
                          e.slice(0, t) +
                          l(0, e.slice(t, i), /[^\n]/g, ' ') +
                          e.slice(i);
                      }
                      return e;
                    })(i.originalText, e)
                  );
                  r -= 1;
                  let o = n.slice(tB(e), r),
                    h = o.trimEnd();
                  e.__contentEnd = r - (o.length - h.length);
                })(t, o, r),
                t.type)
              ) {
                case 'ParenthesizedExpression': {
                  let { expression: e } = t,
                    s = tB(t);
                  if ('TypeCastExpression' === e.type)
                    return ((e.range = [s, tz(t)]), e);
                  let h = !1;
                  if ('oxc-ts' !== n) {
                    if (!i)
                      for (let e of ((i = []), o))
                        tq(
                          tK,
                          e,
                          e =>
                            tH(e) &&
                            '*' === e.value[0] &&
                            /@(?:type|satisfies)\b/.test(e.value)
                        ) && i.push(tz(e));
                    let e = tv(0, i, e => e <= s);
                    h = e && 0 === r.slice(e, s).trim().length;
                  }
                  return h
                    ? void 0
                    : ((e.extra = { ...e.extra, parenthesized: !0 }), e);
                }
                case 'TemplateLiteral':
                  if (t.expressions.length !== t.quasis.length - 1)
                    throw Error('Malformed template literal.');
                  break;
                case 'TemplateElement':
                  if (
                    'flow' === n ||
                    'hermes' === n ||
                    'espree' === n ||
                    'typescript' === n ||
                    'oxc-ts' === n ||
                    'yuku-ts' === n
                  ) {
                    let e = tB(t) + 1,
                      s = tz(t) - (t.tail ? 1 : 2);
                    t.range = [e, s];
                  }
                  break;
                case 'TSParenthesizedType':
                  return t.typeAnnotation;
                case 'TopicReference':
                  e.extra = { ...e.extra, __isUsingHackPipeline: !0 };
                  break;
                case 'TSUnionType':
                case 'TSIntersectionType':
                  if (1 === t.types.length) return t.types[0];
                  break;
                case 'TupleTypeAnnotation':
                  t.types && !t.elementTypes && (t.elementTypes = t.types);
                  break;
                case 'ImportDeclaration':
                  'hermes' === n &&
                    t.assertions &&
                    !t.attributes &&
                    ((t.attributes = t.assertions), delete t.assertions);
              }
            },
            onLeave(e) {
              if ('LogicalExpression' === e.type && t2(e))
                return (function e(t) {
                  return t2(t)
                    ? e({
                        type: 'LogicalExpression',
                        operator: t.operator,
                        left: e({
                          type: 'LogicalExpression',
                          operator: t.operator,
                          left: t.left,
                          right: t.right.left,
                          range: [tB(t.left), tz(t.right.left)]
                        }),
                        right: t.right.right,
                        range: [tB(t), tz(t)]
                      })
                    : t;
                })(e);
            }
          }))
        );
      },
      t4 = function (e, t) {
        return Object.assign(
          SyntaxError(
            e + ' (' + t.loc.start.line + ':' + t.loc.start.column + ')'
          ),
          t
        );
      },
      t8 = 'Unexpected parseExpression() input: ',
      t6 = function (e) {
        let { message: t, loc: s, reasonCode: i } = e;
        if (!s) return e;
        let { line: r, column: n } = s,
          o = e;
        ('MissingPlugin' === i || 'MissingOneOfPlugins' === i) &&
          ((t = 'Unexpected token.'), (o = void 0));
        let h = ` (${r}:${n})`;
        return (
          t.endsWith(h) && (t = t.slice(0, -h.length)),
          t.startsWith(t8) && (t = t.slice(t8.length)),
          t4(t, { loc: { start: { line: r, column: n + 1 } }, cause: o })
        );
      },
      t5 = /\*\/$/,
      t9 = /^\/\*\*?/,
      t7 = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/,
      se = /(^|\s+)\/\/([^\n\r]*)/g,
      st = /^(\r?\n)+/,
      ss =
        /(?:^|\r?\n) *(@[^\n\r]*?) *\r?\n *(?![^\n\r@]*\/\/[^]*)([^\s@][^\n\r@]+?) *\r?\n/g,
      si = /(?:^|\r?\n) *@(\S+) *([^\n\r]*)/g,
      sr = /(\r?\n|^) *\* ?/g,
      sa = [],
      sn = ['noformat', 'noprettier'],
      so = ['format', 'prettier'];
    function sh(e) {
      let t,
        s = tw(e);
      s && (e = e.slice(s.length + 1));
      let { pragmas: i, comments: r } = (function (e) {
        e = l(0, e.replace(t9, '').replace(t5, ''), sr, '$1');
        let t = '';
        for (; t !== e;)
          ((t = e),
            (e = l(
              0,
              e,
              ss,
              `
$1 $2
`
            )));
        e = e.replace(st, '').trimEnd();
        let s = Object.create(null),
          i = l(0, e, si, '').replace(st, '').trimEnd(),
          r;
        for (; (r = si.exec(e));) {
          let e = l(0, r[2], se, '');
          if ('string' == typeof s[r[1]] || Array.isArray(s[r[1]])) {
            let t = s[r[1]];
            s[r[1]] = [...sa, ...(Array.isArray(t) ? t : [t]), e];
          } else s[r[1]] = e;
        }
        return { comments: i, pragmas: s };
      })((t = e.match(t7)) ? t[0].trimStart() : '');
      return { shebang: s, text: e, pragmas: i, comments: r };
    }
    function sp(e) {
      let { pragmas: t } = sh(e);
      return so.some(e => c(t, e));
    }
    function sl(e) {
      let { pragmas: t } = sh(e);
      return sn.some(e => c(t, e));
    }
    var sc = function (e) {
        return {
          astFormat: 'estree',
          hasPragma: sp,
          hasIgnorePragma: sl,
          locStart: tB,
          locEnd: tz,
          ...(e = 'function' == typeof e ? { parse: e } : e)
        };
      },
      su = 'module',
      sd = 'commonjs',
      sm = function (e) {
        let {
            type: t = 'JsExpressionRoot',
            expression: s,
            comments: i = s?.comments ?? [],
            text: r,
            rootMarker: n
          } = e,
          o = { type: t, comments: i, range: [0, r.length], rootMarker: n };
        return (s && (delete s.comments, (o.node = s)), o);
      },
      sf = {
        sourceType: su,
        allowImportExportEverywhere: !0,
        allowReturnOutsideFunction: !0,
        allowNewTargetOutsideFunction: !0,
        allowSuperOutsideMethod: !0,
        allowUndeclaredExports: !0,
        errorRecovery: !0,
        createParenthesizedExpressions: !0,
        attachComment: !1,
        plugins: [
          'doExpressions',
          'exportDefaultFrom',
          'functionBind',
          'functionSent',
          'throwExpressions',
          ['partialApplication', { version: '2018-07' }],
          'decorators',
          'moduleBlocks',
          'asyncDoExpressions',
          'destructuringPrivate',
          'decoratorAutoAccessors',
          'sourcePhaseImports',
          'deferredImportEvaluation',
          ['optionalChainingAssign', { version: '2023-07' }],
          ['discardBinding', { syntaxType: 'void' }]
        ],
        tokens: !1,
        ranges: !1
      },
      sy = 'v8intrinsic',
      sx = [
        ['pipelineOperator', { proposal: 'hack', topicToken: '%' }],
        ['pipelineOperator', { proposal: 'fsharp' }]
      ],
      sP = (e, t = sf) => ({ ...t, plugins: [...t.plugins, ...e] }),
      sg = /@(?:no)?flow\b/;
    function sT({ isExpression: e = !1, optionsCombinations: t }) {
      return (s, i = {}) => {
        let { filepath: r } = i;
        if (
          ('string' != typeof r && (r = void 0),
          ('babel' === i.parser || '__babel_estree' === i.parser) &&
            (function (e, t) {
              if (t?.endsWith('.js.flow')) return !0;
              let s = tw(e);
              s && (e = e.slice(s.length));
              let i = tN(e, 0);
              return (!1 !== i && (e = e.slice(0, i)), sg.test(e));
            })(s, r))
        )
          return ((i.parser = 'babel-flow'), sN.parse(s, i));
        let n = t,
          o =
            i.__babelSourceType ??
            (function (e) {
              if ('string' == typeof e) {
                if (((e = e.toLowerCase()), /\.(?:mjs|mts)$/i.test(e)))
                  return su;
                if (/\.(?:cjs|cts)$/i.test(e)) return sd;
              }
            })(r);
        o &&
          o !== su &&
          (n = n.map(e => ({
            ...e,
            sourceType: o,
            ...(o === sd
              ? {
                  allowReturnOutsideFunction: void 0,
                  allowNewTargetOutsideFunction: void 0
                }
              : void 0)
          })));
        let h = /%[A-Z]/.test(s);
        s.includes('|>')
          ? (n = (h ? [...sx, sy] : sx).flatMap(e => n.map(t => sP([e], t))))
          : h && (n = n.map(e => sP([sy], e)));
        let p = e ? ty : tf,
          l;
        try {
          l = (function (e) {
            let t = [];
            for (let s of e)
              try {
                return s();
              } catch (e) {
                t.push(e);
              }
            throw Object.assign(Error('All combinations failed'), {
              errors: t
            });
          })(
            n.map(
              e => () =>
                (function (e, t, s) {
                  let i = e(t, s),
                    r = i.errors.find(e => !sb.has(e.reasonCode));
                  if (r) throw r;
                  return i;
                })(p, s, e)
            )
          );
        } catch ({ errors: [e] }) {
          throw t6(e);
        }
        return (
          e && (l = sm({ expression: l, text: s, rootMarker: i.rootMarker })),
          t3(l, { text: s })
        );
      };
    }
    var sb = new Set([
        'StrictNumericEscape',
        'StrictWith',
        'StrictOctalLiteral',
        'StrictDelete',
        'StrictEvalArguments',
        'StrictEvalArgumentsBinding',
        'StrictFunction',
        'ForInOfLoopInitializer',
        'ParamDupe',
        'RestTrailingComma',
        'UnsupportedParameterDecorator',
        'UnterminatedJsxContent',
        'UnexpectedReservedWord',
        'ModuleAttributesWithDuplicateKeys',
        'InvalidEscapeSequenceTemplate',
        'NonAbstractClassHasAbstractMethod',
        'PatternIsOptional',
        'VarRedeclaration',
        'InvalidPrivateFieldResolution',
        'DuplicateExport',
        'DeclarationMissingInitializer',
        'DecoratorAbstractMethod'
      ]),
      sA = [sP(['jsx'])],
      sS = sc(sT({ optionsCombinations: sA })),
      sE = sc(
        sT({
          optionsCombinations: [sP(['jsx', 'typescript']), sP(['typescript'])]
        })
      ),
      sC = sc(sT({ isExpression: !0, optionsCombinations: [sP(['jsx'])] })),
      sI = sc(
        sT({ isExpression: !0, optionsCombinations: [sP(['typescript'])] })
      ),
      sN = sc(
        sT({
          optionsCombinations: [
            sP(['jsx', ['flow', { all: !0 }], 'flowComments'])
          ]
        })
      ),
      sw = sc(sT({ optionsCombinations: sA.map(e => sP(['estree'], e)) })),
      sk = {};
    r(sk, {
      json: () => sO,
      'json-stringify': () => sU,
      json5: () => sF,
      jsonc: () => sB
    });
    var sv = function (e) {
        return Array.isArray(e) && e.length > 0;
      },
      sL = {
        tokens: !1,
        ranges: !1,
        attachComment: !1,
        createParenthesizedExpressions: !0
      };
    function sM(e, t = {}) {
      let { allowComments: s = !0, allowEmpty: i = !1 } = t,
        r,
        n;
      try {
        n = (r = ty(e, sL)).comments;
      } catch (t) {
        if (
          i &&
          'BABEL_PARSER_SYNTAX_ERROR' === t.code &&
          'ParseExpressionEmptyInput' === t.reasonCode
        )
          try {
            ({ comments: n } = (function (e) {
              let t = tf(e, sL),
                { program: s } = t;
              if (
                0 === s.body.length &&
                0 === s.directives.length &&
                !s.interpreter
              )
                return { comments: t.comments };
            })(e));
          } catch {}
        if (!n) throw t6(t);
      }
      if (!s && sv(n)) throw sD(n[0], 'Comment');
      return (
        (!i || r) &&
          (function e(t) {
            switch (t.type) {
              case 'ArrayExpression':
                for (let s of t.elements) null !== s && e(s);
                return;
              case 'ObjectExpression':
                for (let s of t.properties) e(s);
                return;
              case 'ObjectProperty':
                if (t.computed) throw sD(t.key, 'Computed key');
                if (t.shorthand) throw sD(t.key, 'Shorthand property');
                ('Identifier' !== t.key.type && e(t.key), e(t.value));
                return;
              case 'UnaryExpression': {
                let { operator: e, argument: s } = t;
                if ('+' !== e && '-' !== e)
                  throw sD(t, `Operator '${t.operator}'`);
                if (
                  'NumericLiteral' === s.type ||
                  ('Identifier' === s.type &&
                    ('Infinity' === s.name || 'NaN' === s.name))
                )
                  return;
                throw sD(s, `Operator '${e}' before '${s.type}'`);
              }
              case 'Identifier':
                if (
                  'Infinity' !== t.name &&
                  'NaN' !== t.name &&
                  'undefined' !== t.name
                )
                  throw sD(t, `Identifier '${t.name}'`);
                return;
              case 'TemplateLiteral':
                if (sv(t.expressions))
                  throw sD(
                    t.expressions[0],
                    "'TemplateLiteral' with expression"
                  );
                for (let s of t.quasis) e(s);
                return;
              case 'NullLiteral':
              case 'BooleanLiteral':
              case 'NumericLiteral':
              case 'StringLiteral':
              case 'TemplateElement':
                return;
              default:
                throw sD(t, `'${t.type}'`);
            }
          })(r),
        (r = sm({ type: 'JsonRoot', expression: r, comments: n, text: e }))
      );
    }
    function sD(e, t) {
      let [s, i] = [e.loc.start, e.loc.end].map(({ line: e, column: t }) => ({
        line: e,
        column: t + 1
      }));
      return t4(`${t} is not allowed in JSON.`, { loc: { start: s, end: i } });
    }
    var sO = sc({
        parse: e => sM(e),
        hasPragma: () => !0,
        hasIgnorePragma: () => !1
      }),
      sF = sc(e => sM(e)),
      sB = sc(e => sM(e, { allowEmpty: !0 })),
      sU = sc({
        parse: e => sM(e, { allowComments: !1 }),
        astFormat: 'estree-json'
      }),
      sR = { ...o, ...sk };
    s.d(t, { default: () => n, parsers: () => sR });
  }
};
//# sourceMappingURL=8048.69cc0ea6d614cdaf.js.map
