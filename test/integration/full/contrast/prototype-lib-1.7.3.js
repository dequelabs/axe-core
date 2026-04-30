/* eslint-disable */
/*  Prototype JavaScript framework, version 1.7.3
 *  (c) 2005-2010 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/

var Prototype = {
  Version: '1.7.3',

  Browser: (() => {
    const ua = navigator.userAgent;
    const isOpera =
      Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE: !!window.attachEvent && !isOpera,
      Opera: isOpera,
      WebKit: ua.indexOf('AppleWebKit/') > -1,
      Gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari: /Apple.*Mobile/.test(ua)
    };
  })(),

  BrowserFeatures: {
    XPath: !!document.evaluate,

    SelectorsAPI: !!document.querySelector,

    ElementExtensions: (() => {
      const constructor = window.Element || window.HTMLElement;
      return !!(constructor && constructor.prototype);
    })(),
    SpecificElementExtensions: (() => {
      if (typeof window.HTMLDivElement !== 'undefined') return true;

      let div = document.createElement('div'),
        form = document.createElement('form'),
        isSupported = false;

      if (div['__proto__'] && div['__proto__'] !== form['__proto__']) {
        isSupported = true;
      }

      div = form = null;

      return isSupported;
    })()
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)</script\\s*>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: () => {},

  K: x => {
    return x;
  }
};

if (Prototype.Browser.MobileSafari)
  Prototype.BrowserFeatures.SpecificElementExtensions = false;
/* Based on Alex Arnell's inheritance implementation. */

var Class = (() => {
  const IS_DONTENUM_BUGGY = (() => {
    for (var p in { toString: 1 }) {
      if (p === 'toString') return false;
    }
    return true;
  })();

  function subclass() {}
  function create() {
    let parent = null;
    const properties = $A(arguments);
    if (Object.isFunction(properties[0])) parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass();
      parent.subclasses.push(klass);
    }

    for (var i = 0, length = properties.length; i < length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    const ancestor = this.superclass && this.superclass.prototype,
      properties = Object.keys(source);

    if (IS_DONTENUM_BUGGY) {
      if (source.toString != Object.prototype.toString)
        properties.push('toString');
      if (source.valueOf != Object.prototype.valueOf)
        properties.push('valueOf');
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i],
        value = source[property];
      if (
        ancestor &&
        Object.isFunction(value) &&
        value.argumentNames()[0] == '$super'
      ) {
        var method = value;
        value = (m => {
          return function () {
            return ancestor[m].apply(this, arguments);
          };
        })(property).wrap(method);

        value.valueOf = (method => {
          return () => {
            return method.valueOf.call(method);
          };
        })(method);

        value.toString = (method => {
          return () => {
            return method.toString.call(method);
          };
        })(method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    Methods: {
      addMethods: addMethods
    }
  };
})();
(() => {
  const _toString = Object.prototype.toString,
    _hasOwnProperty = Object.prototype.hasOwnProperty,
    NULL_TYPE = 'Null',
    UNDEFINED_TYPE = 'Undefined',
    BOOLEAN_TYPE = 'Boolean',
    NUMBER_TYPE = 'Number',
    STRING_TYPE = 'String',
    OBJECT_TYPE = 'Object',
    FUNCTION_CLASS = '[object Function]',
    BOOLEAN_CLASS = '[object Boolean]',
    NUMBER_CLASS = '[object Number]',
    STRING_CLASS = '[object String]',
    ARRAY_CLASS = '[object Array]',
    DATE_CLASS = '[object Date]',
    NATIVE_JSON_STRINGIFY_SUPPORT =
      window.JSON &&
      typeof JSON.stringify === 'function' &&
      JSON.stringify(0) === '0' &&
      typeof JSON.stringify(Prototype.K) === 'undefined';

  const DONT_ENUMS = [
    'toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'constructor'
  ];

  const IS_DONTENUM_BUGGY = (() => {
    for (var p in { toString: 1 }) {
      if (p === 'toString') return false;
    }
    return true;
  })();

  function Type(o) {
    switch (o) {
      case null:
        return NULL_TYPE;
      case void 0:
        return UNDEFINED_TYPE;
    }
    const type = typeof o;
    switch (type) {
      case 'boolean':
        return BOOLEAN_TYPE;
      case 'number':
        return NUMBER_TYPE;
      case 'string':
        return STRING_TYPE;
    }
    return OBJECT_TYPE;
  }

  function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  }

  function inspect(object) {
    try {
      if (isUndefined(object)) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : String(object);
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  }

  function toJSON(value) {
    return Str('', { '': value }, []);
  }

  function Str(key, holder, stack) {
    let value = holder[key];
    if (Type(value) === OBJECT_TYPE && typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }

    const _class = _toString.call(value);

    switch (_class) {
      case NUMBER_CLASS:
      case BOOLEAN_CLASS:
      case STRING_CLASS:
        value = value.valueOf();
    }

    switch (value) {
      case null:
        return 'null';
      case true:
        return 'true';
      case false:
        return 'false';
    }

    const type = typeof value;
    switch (type) {
      case 'string':
        return value.inspect(true);
      case 'number':
        return isFinite(value) ? String(value) : 'null';
      case 'object':
        for (var i = 0, length = stack.length; i < length; i++) {
          if (stack[i] === value) {
            throw new TypeError(`Cyclic reference to '${value}' in object`);
          }
        }
        stack.push(value);

        var partial = [];
        if (_class === ARRAY_CLASS) {
          for (var i = 0, length = value.length; i < length; i++) {
            var str = Str(i, value, stack);
            partial.push(typeof str === 'undefined' ? 'null' : str);
          }
          partial = `[${partial.join(',')}]`;
        } else {
          var keys = Object.keys(value);
          for (var i = 0, length = keys.length; i < length; i++) {
            var key = keys[i],
              str = Str(key, value, stack);
            if (typeof str !== 'undefined') {
              partial.push(`${key.inspect(true)}:${str}`);
            }
          }
          partial = `{${partial.join(',')}}`;
        }
        stack.pop();
        return partial;
    }
  }

  function stringify(object) {
    return JSON.stringify(object);
  }

  function toQueryString(object) {
    return $H(object).toQueryString();
  }

  function toHTML(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  }

  function keys(object) {
    if (Type(object) !== OBJECT_TYPE) {
      throw new TypeError();
    }
    const results = [];
    for (var property in object) {
      if (_hasOwnProperty.call(object, property)) results.push(property);
    }

    if (IS_DONTENUM_BUGGY) {
      for (var i = 0; (property = DONT_ENUMS[i]); i++) {
        if (_hasOwnProperty.call(object, property)) results.push(property);
      }
    }

    return results;
  }

  function values(object) {
    const results = [];
    for (var property in object) results.push(object[property]);
    return results;
  }

  function clone(object) {
    return extend({}, object);
  }

  function isElement(object) {
    return !!(object && object.nodeType == 1);
  }

  function isArray(object) {
    return _toString.call(object) === ARRAY_CLASS;
  }

  const hasNativeIsArray =
    typeof Array.isArray == 'function' &&
    Array.isArray([]) &&
    !Array.isArray({});

  if (hasNativeIsArray) {
    isArray = Array.isArray;
  }

  function isHash(object) {
    return object instanceof Hash;
  }

  function isFunction(object) {
    return _toString.call(object) === FUNCTION_CLASS;
  }

  function isString(object) {
    return _toString.call(object) === STRING_CLASS;
  }

  function isNumber(object) {
    return _toString.call(object) === NUMBER_CLASS;
  }

  function isDate(object) {
    return _toString.call(object) === DATE_CLASS;
  }

  function isUndefined(object) {
    return typeof object === 'undefined';
  }

  extend(Object, {
    extend: extend,
    inspect: inspect,
    toJSON: NATIVE_JSON_STRINGIFY_SUPPORT ? stringify : toJSON,
    toQueryString: toQueryString,
    toHTML: toHTML,
    keys: Object.keys || keys,
    values: values,
    clone: clone,
    isElement: isElement,
    isArray: isArray,
    isHash: isHash,
    isFunction: isFunction,
    isString: isString,
    isNumber: isNumber,
    isDate: isDate,
    isUndefined: isUndefined
  });
})();
Object.extend(
  Function.prototype,
  (() => {
    const slice = Array.prototype.slice;

    function update(array, args) {
      const arrayLength = array.length;
      let length = args.length;
      while (length--) array[arrayLength + length] = args[length];
      return array;
    }

    function merge(array, args) {
      array = slice.call(array, 0);
      return update(array, args);
    }

    function argumentNames() {
      const names = this.toString()
        .match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
        .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
        .replace(/\s+/g, '')
        .split(',');
      return names.length == 1 && !names[0] ? [] : names;
    }

    function bind(context) {
      if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;

      if (!Object.isFunction(this))
        throw new TypeError('The object is not callable.');

      const nop = () => {};
      const __method = this,
        args = slice.call(arguments, 1);

      const bound = function () {
        const a = merge(args, arguments);
        const c = this instanceof bound ? this : context;
        return __method.apply(c, a);
      };

      nop.prototype = this.prototype;
      bound.prototype = new nop();

      return bound;
    }

    function bindAsEventListener(context) {
      const __method = this,
        args = slice.call(arguments, 1);
      return event => {
        const a = update([event || window.event], args);
        return __method.apply(context, a);
      };
    }

    function curry() {
      if (!arguments.length) return this;
      const __method = this,
        args = slice.call(arguments, 0);
      return function () {
        const a = merge(args, arguments);
        return __method.apply(this, a);
      };
    }

    function delay(timeout) {
      const __method = this,
        args = slice.call(arguments, 1);
      timeout = timeout * 1000;
      return window.setTimeout(() => {
        return __method.apply(__method, args);
      }, timeout);
    }

    function defer() {
      const args = update([0.01], arguments);
      return this.delay.apply(this, args);
    }

    function wrap(wrapper) {
      const __method = this;
      return function () {
        const a = update([__method.bind(this)], arguments);
        return wrapper.apply(this, a);
      };
    }

    function methodize() {
      if (this._methodized) return this._methodized;
      const __method = this;
      return (this._methodized = function () {
        const a = update([this], arguments);
        return __method.apply(null, a);
      });
    }

    const extensions = {
      argumentNames: argumentNames,
      bindAsEventListener: bindAsEventListener,
      curry: curry,
      delay: delay,
      defer: defer,
      wrap: wrap,
      methodize: methodize
    };

    if (!Function.prototype.bind) extensions.bind = bind;

    return extensions;
  })()
);

(proto => {
  function toISOString() {
    return `${this.getUTCFullYear()}-${(this.getUTCMonth() + 1).toPaddedString(2)}-${this.getUTCDate().toPaddedString(2)}T${this.getUTCHours().toPaddedString(2)}:${this.getUTCMinutes().toPaddedString(2)}:${this.getUTCSeconds().toPaddedString(2)}Z`;
  }

  function toJSON() {
    return this.toISOString();
  }

  if (!proto.toISOString) proto.toISOString = toISOString;
  if (!proto.toJSON) proto.toJSON = toJSON;
})(Date.prototype);

RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = str => {
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};
var PeriodicalExecuter = Class.create({
  initialize: function (callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function () {
    this.timer = setInterval(
      this.onTimerEvent.bind(this),
      this.frequency * 1000
    );
  },

  execute: function () {
    this.callback(this);
  },

  stop: function () {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimerEvent: function () {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.execute();
        this.currentlyExecuting = false;
      } catch (e) {
        this.currentlyExecuting = false;
        throw e;
      }
    }
  }
});
Object.extend(String, {
  interpret: value => {
    return value == null ? '' : String(value);
  },
  specialChar: {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '\\': '\\\\'
  }
});

Object.extend(
  String.prototype,
  (() => {
    const NATIVE_JSON_PARSE_SUPPORT =
      window.JSON &&
      typeof JSON.parse === 'function' &&
      JSON.parse('{"test": true}').test;

    function prepareReplacement(replacement) {
      if (Object.isFunction(replacement)) return replacement;
      const template = new Template(replacement);
      return match => {
        return template.evaluate(match);
      };
    }

    function isNonEmptyRegExp(regexp) {
      return regexp.source && regexp.source !== '(?:)';
    }

    function gsub(pattern, replacement) {
      let result = '',
        source = this,
        match;
      replacement = prepareReplacement(replacement);

      if (Object.isString(pattern)) pattern = RegExp.escape(pattern);

      if (!(pattern.length || isNonEmptyRegExp(pattern))) {
        replacement = replacement('');
        return replacement + source.split('').join(replacement) + replacement;
      }

      while (source.length > 0) {
        match = source.match(pattern);
        if (match && match[0].length > 0) {
          result += source.slice(0, match.index);
          result += String.interpret(replacement(match));
          source = source.slice(match.index + match[0].length);
        } else {
          ((result += source), (source = ''));
        }
      }
      return result;
    }

    function sub(pattern, replacement, count) {
      replacement = prepareReplacement(replacement);
      count = Object.isUndefined(count) ? 1 : count;

      return this.gsub(pattern, match => {
        if (--count < 0) return match[0];
        return replacement(match);
      });
    }

    function scan(pattern, iterator) {
      this.gsub(pattern, iterator);
      return String(this);
    }

    function truncate(length, truncation) {
      length = length || 30;
      truncation = Object.isUndefined(truncation) ? '...' : truncation;
      return this.length > length
        ? this.slice(0, length - truncation.length) + truncation
        : String(this);
    }

    function strip() {
      return this.replace(/^\s+/, '').replace(/\s+$/, '');
    }

    function stripTags() {
      return this.replace(
        /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?(\/)?>|<\/\w+>/gi,
        ''
      );
    }

    function stripScripts() {
      return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
    }

    function extractScripts() {
      const matchAll = new RegExp(Prototype.ScriptFragment, 'img'),
        matchOne = new RegExp(Prototype.ScriptFragment, 'im');
      return (this.match(matchAll) || []).map(scriptTag => {
        return (scriptTag.match(matchOne) || ['', ''])[1];
      });
    }

    function evalScripts() {
      return this.extractScripts().map(script => {
        return eval(script);
      });
    }

    function escapeHTML() {
      return this.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    function unescapeHTML() {
      return this.stripTags()
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
    }

    function toQueryParams(separator) {
      const match = this.strip().match(/([^?#]*)(#.*)?$/);
      if (!match) return {};

      return match[1].split(separator || '&').inject({}, (hash, pair) => {
        if ((pair = pair.split('='))[0]) {
          var key = decodeURIComponent(pair.shift()),
            value = pair.length > 1 ? pair.join('=') : pair[0];

          if (value != undefined) {
            value = value.gsub('+', ' ');
            value = decodeURIComponent(value);
          }

          if (key in hash) {
            if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
            hash[key].push(value);
          } else hash[key] = value;
        }
        return hash;
      });
    }

    function toArray() {
      return this.split('');
    }

    function succ() {
      return (
        this.slice(0, this.length - 1) +
        String.fromCharCode(this.charCodeAt(this.length - 1) + 1)
      );
    }

    function times(count) {
      return count < 1 ? '' : new Array(count + 1).join(this);
    }

    function camelize() {
      return this.replace(/-+(.)?/g, (match, chr) => {
        return chr ? chr.toUpperCase() : '';
      });
    }

    function capitalize() {
      return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
    }

    function underscore() {
      return this.replace(/::/g, '/')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        .replace(/([a-z\d])([A-Z])/g, '$1_$2')
        .replace(/-/g, '_')
        .toLowerCase();
    }

    function dasherize() {
      return this.replace(/_/g, '-');
    }

    function inspect(useDoubleQuotes) {
      const escapedString = this.replace(/[\x00-\x1f\\]/g, character => {
        if (character in String.specialChar) {
          return String.specialChar[character];
        }
        return `\\u00${character.charCodeAt().toPaddedString(2, 16)}`;
      });
      if (useDoubleQuotes) return `"${escapedString.replace(/"/g, '\\"')}"`;
      return `'${escapedString.replace(/'/g, "\\'")}'`;
    }

    function unfilterJSON(filter) {
      return this.replace(filter || Prototype.JSONFilter, '$1');
    }

    function isJSON() {
      let str = this;
      if (str.blank()) return false;
      str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
      str = str.replace(
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        ']'
      );
      str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
      return /^[\],:{}\s]*$/.test(str);
    }

    function evalJSON(sanitize) {
      let json = this.unfilterJSON();

      const cx =
        /[\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff\u0000]/g;

      if (cx.test(json)) {
        json = json.replace(cx, a => {
          return `\\u${`0000${a.charCodeAt(0).toString(16)}`.slice(-4)}`;
        });
      }
      try {
        if (!sanitize || json.isJSON()) return eval(`(${json})`);
      } catch (e) {}
      throw new SyntaxError(`Badly formed JSON string: ${this.inspect()}`);
    }

    function parseJSON() {
      const json = this.unfilterJSON();
      return JSON.parse(json);
    }

    function include(pattern) {
      return this.indexOf(pattern) > -1;
    }

    function startsWith(pattern, position) {
      position = Object.isNumber(position) ? position : 0;
      return this.lastIndexOf(pattern, position) === position;
    }

    function endsWith(pattern, position) {
      pattern = String(pattern);
      position = Object.isNumber(position) ? position : this.length;
      if (position < 0) position = 0;
      if (position > this.length) position = this.length;
      const d = position - pattern.length;
      return d >= 0 && this.indexOf(pattern, d) === d;
    }

    function empty() {
      return this == '';
    }

    function blank() {
      return /^\s*$/.test(this);
    }

    function interpolate(object, pattern) {
      return new Template(this, pattern).evaluate(object);
    }

    return {
      gsub: gsub,
      sub: sub,
      scan: scan,
      truncate: truncate,
      strip: String.prototype.trim || strip,
      stripTags: stripTags,
      stripScripts: stripScripts,
      extractScripts: extractScripts,
      evalScripts: evalScripts,
      escapeHTML: escapeHTML,
      unescapeHTML: unescapeHTML,
      toQueryParams: toQueryParams,
      parseQuery: toQueryParams,
      toArray: toArray,
      succ: succ,
      times: times,
      camelize: camelize,
      capitalize: capitalize,
      underscore: underscore,
      dasherize: dasherize,
      inspect: inspect,
      unfilterJSON: unfilterJSON,
      isJSON: isJSON,
      evalJSON: NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
      include: include,
      startsWith: String.prototype.startsWith || startsWith,
      endsWith: String.prototype.endsWith || endsWith,
      empty: empty,
      blank: blank,
      interpolate: interpolate
    };
  })()
);

var Template = Class.create({
  initialize: function (template, pattern) {
    this.template = template.toString();
    this.pattern = pattern || Template.Pattern;
  },

  evaluate: function (object) {
    if (object && Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();

    return this.template.gsub(this.pattern, match => {
      if (object == null) return `${match[1]}`;

      const before = match[1] || '';
      if (before == '\\') return match[2];

      let ctx = object;
      let expr = match[3];
      const pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;

      match = pattern.exec(expr);
      if (match == null) return before;

      while (match != null) {
        var comp = match[1].startsWith('[')
          ? match[2].replace(/\\\\]/g, ']')
          : match[1];
        ctx = ctx[comp];
        if (null == ctx || '' == match[3]) break;
        expr = expr.substring(
          '[' == match[3] ? match[1].length : match[0].length
        );
        match = pattern.exec(expr);
      }

      return before + String.interpret(ctx);
    });
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $break = {};

var Enumerable = (() => {
  function each(iterator, context) {
    try {
      this._each(iterator, context);
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  }

  function eachSlice(number, iterator, context) {
    let index = -number;
    const slices = [];
    const array = this.toArray();
    if (number < 1) return array;
    while ((index += number) < array.length)
      slices.push(array.slice(index, index + number));
    return slices.collect(iterator, context);
  }

  function all(iterator, context) {
    iterator = iterator || Prototype.K;
    let result = true;
    this.each(function (value, index) {
      result = result && !!iterator.call(context, value, index, this);
      if (!result) throw $break;
    }, this);
    return result;
  }

  function any(iterator, context) {
    iterator = iterator || Prototype.K;
    let result = false;
    this.each(function (value, index) {
      if ((result = !!iterator.call(context, value, index, this))) throw $break;
    }, this);
    return result;
  }

  function collect(iterator, context) {
    iterator = iterator || Prototype.K;
    const results = [];
    this.each(function (value, index) {
      results.push(iterator.call(context, value, index, this));
    }, this);
    return results;
  }

  function detect(iterator, context) {
    let result;
    this.each(function (value, index) {
      if (iterator.call(context, value, index, this)) {
        result = value;
        throw $break;
      }
    }, this);
    return result;
  }

  function findAll(iterator, context) {
    const results = [];
    this.each(function (value, index) {
      if (iterator.call(context, value, index, this)) results.push(value);
    }, this);
    return results;
  }

  function grep(filter, iterator, context) {
    iterator = iterator || Prototype.K;
    const results = [];

    if (Object.isString(filter)) filter = new RegExp(RegExp.escape(filter));

    this.each(function (value, index) {
      if (filter.match(value))
        results.push(iterator.call(context, value, index, this));
    }, this);
    return results;
  }

  function include(object) {
    if (Object.isFunction(this.indexOf) && this.indexOf(object) != -1)
      return true;

    let found = false;
    this.each(value => {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  }

  function inGroupsOf(number, fillWith) {
    fillWith = Object.isUndefined(fillWith) ? null : fillWith;
    return this.eachSlice(number, slice => {
      while (slice.length < number) slice.push(fillWith);
      return slice;
    });
  }

  function inject(memo, iterator, context) {
    this.each(function (value, index) {
      memo = iterator.call(context, memo, value, index, this);
    }, this);
    return memo;
  }

  function invoke(method) {
    const args = $A(arguments).slice(1);
    return this.map(value => {
      return value[method].apply(value, args);
    });
  }

  function max(iterator, context) {
    iterator = iterator || Prototype.K;
    let result;
    this.each(function (value, index) {
      value = iterator.call(context, value, index, this);
      if (result == null || value >= result) result = value;
    }, this);
    return result;
  }

  function min(iterator, context) {
    iterator = iterator || Prototype.K;
    let result;
    this.each(function (value, index) {
      value = iterator.call(context, value, index, this);
      if (result == null || value < result) result = value;
    }, this);
    return result;
  }

  function partition(iterator, context) {
    iterator = iterator || Prototype.K;
    const trues = [],
      falses = [];
    this.each(function (value, index) {
      (iterator.call(context, value, index, this) ? trues : falses).push(value);
    }, this);
    return [trues, falses];
  }

  function pluck(property) {
    const results = [];
    this.each(value => {
      results.push(value[property]);
    });
    return results;
  }

  function reject(iterator, context) {
    const results = [];
    this.each(function (value, index) {
      if (!iterator.call(context, value, index, this)) results.push(value);
    }, this);
    return results;
  }

  function sortBy(iterator, context) {
    return this.map(function (value, index) {
      return {
        value: value,
        criteria: iterator.call(context, value, index, this)
      };
    }, this)
      .sort((left, right) => {
        const a = left.criteria,
          b = right.criteria;
        return a < b ? -1 : a > b ? 1 : 0;
      })
      .pluck('value');
  }

  function toArray() {
    return this.map();
  }

  function zip() {
    let iterator = Prototype.K;
    const args = $A(arguments);
    if (Object.isFunction(args.last())) iterator = args.pop();

    const collections = [this].concat(args).map($A);
    return this.map((value, index) => {
      return iterator(collections.pluck(index));
    });
  }

  function size() {
    return this.toArray().length;
  }

  function inspect() {
    return `#<Enumerable:${this.toArray().inspect()}>`;
  }

  return {
    each: each,
    eachSlice: eachSlice,
    all: all,
    every: all,
    any: any,
    some: any,
    collect: collect,
    map: collect,
    detect: detect,
    findAll: findAll,
    select: findAll,
    filter: findAll,
    grep: grep,
    include: include,
    member: include,
    inGroupsOf: inGroupsOf,
    inject: inject,
    invoke: invoke,
    max: max,
    min: min,
    partition: partition,
    pluck: pluck,
    reject: reject,
    sortBy: sortBy,
    toArray: toArray,
    entries: toArray,
    zip: zip,
    size: size,
    inspect: inspect,
    find: detect
  };
})();

function $A(iterable) {
  if (!iterable) return [];
  if ('toArray' in Object(iterable)) return iterable.toArray();
  let length = iterable.length || 0;
  const results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}

function $w(string) {
  if (!Object.isString(string)) return [];
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

Array.from = $A;

(() => {
  const arrayProto = Array.prototype;
  const slice = arrayProto.slice;
  let _each = arrayProto.forEach;

  function each(iterator, context) {
    for (var i = 0, length = this.length >>> 0; i < length; i++) {
      if (i in this) iterator.call(context, this[i], i, this);
    }
  }
  if (!_each) _each = each;

  function clear() {
    this.length = 0;
    return this;
  }

  function first() {
    return this[0];
  }

  function last() {
    return this[this.length - 1];
  }

  function compact() {
    return this.select(value => {
      return value != null;
    });
  }

  function flatten() {
    return this.inject([], (array, value) => {
      if (Object.isArray(value)) return array.concat(value.flatten());
      array.push(value);
      return array;
    });
  }

  function without() {
    const values = slice.call(arguments, 0);
    return this.select(value => {
      return !values.include(value);
    });
  }

  function reverse(inline) {
    return (inline === false ? this.toArray() : this)._reverse();
  }

  function uniq(sorted) {
    return this.inject([], (array, value, index) => {
      if (
        0 == index ||
        (sorted ? array.last() != value : !array.include(value))
      )
        array.push(value);
      return array;
    });
  }

  function intersect(array) {
    return this.uniq().findAll(item => {
      return array.indexOf(item) !== -1;
    });
  }

  function clone() {
    return slice.call(this, 0);
  }

  function size() {
    return this.length;
  }

  function inspect() {
    return `[${this.map(Object.inspect).join(', ')}]`;
  }

  function indexOf(item, i) {
    if (this == null) throw new TypeError();

    const array = Object(this),
      length = array.length >>> 0;
    if (length === 0) return -1;

    i = Number(i);
    if (isNaN(i)) {
      i = 0;
    } else if (i !== 0 && isFinite(i)) {
      i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
    }

    if (i > length) return -1;

    let k = i >= 0 ? i : Math.max(length - Math.abs(i), 0);
    for (; k < length; k++) if (k in array && array[k] === item) return k;
    return -1;
  }

  function lastIndexOf(item, i) {
    if (this == null) throw new TypeError();

    const array = Object(this),
      length = array.length >>> 0;
    if (length === 0) return -1;

    if (!Object.isUndefined(i)) {
      i = Number(i);
      if (isNaN(i)) {
        i = 0;
      } else if (i !== 0 && isFinite(i)) {
        i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
      }
    } else {
      i = length;
    }

    let k = i >= 0 ? Math.min(i, length - 1) : length - Math.abs(i);

    for (; k >= 0; k--) if (k in array && array[k] === item) return k;
    return -1;
  }

  function concat(_) {
    const array = [];
    const items = slice.call(arguments, 0);
    let item;
    let n = 0;
    items.unshift(this);
    for (var i = 0, length = items.length; i < length; i++) {
      item = items[i];
      if (Object.isArray(item) && !('callee' in item)) {
        for (var j = 0, arrayLength = item.length; j < arrayLength; j++) {
          if (j in item) array[n] = item[j];
          n++;
        }
      } else {
        array[n++] = item;
      }
    }
    array.length = n;
    return array;
  }

  function wrapNative(method) {
    return function () {
      if (arguments.length === 0) {
        return method.call(this, Prototype.K);
      } else if (arguments[0] === undefined) {
        var args = slice.call(arguments, 1);
        args.unshift(Prototype.K);
        return method.apply(this, args);
      } else {
        return method.apply(this, arguments);
      }
    };
  }

  function map(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;

    const object = Object(this);
    const results = [];
    const context = arguments[1];
    let n = 0;

    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object) {
        results[n] = iterator.call(context, object[i], i, object);
      }
      n++;
    }
    results.length = n;
    return results;
  }

  if (arrayProto.map) {
    map = wrapNative(Array.prototype.map);
  }

  function filter(iterator) {
    if (this == null || !Object.isFunction(iterator)) throw new TypeError();

    const object = Object(this);
    const results = [];
    const context = arguments[1];
    let value;

    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object) {
        value = object[i];
        if (iterator.call(context, value, i, object)) {
          results.push(value);
        }
      }
    }
    return results;
  }

  if (arrayProto.filter) {
    filter = Array.prototype.filter;
  }

  function some(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;
    const context = arguments[1];

    const object = Object(this);
    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object && iterator.call(context, object[i], i, object)) {
        return true;
      }
    }

    return false;
  }

  if (arrayProto.some) {
    some = wrapNative(Array.prototype.some);
  }

  function every(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;
    const context = arguments[1];

    const object = Object(this);
    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object && !iterator.call(context, object[i], i, object)) {
        return false;
      }
    }

    return true;
  }

  if (arrayProto.every) {
    every = wrapNative(Array.prototype.every);
  }

  Object.extend(arrayProto, Enumerable);

  if (arrayProto.entries === Enumerable.entries) {
    delete arrayProto.entries;
  }

  if (!arrayProto._reverse) arrayProto._reverse = arrayProto.reverse;

  Object.extend(arrayProto, {
    _each: _each,

    map: map,
    collect: map,
    select: filter,
    filter: filter,
    findAll: filter,
    some: some,
    any: some,
    every: every,
    all: every,

    clear: clear,
    first: first,
    last: last,
    compact: compact,
    flatten: flatten,
    without: without,
    reverse: reverse,
    uniq: uniq,
    intersect: intersect,
    clone: clone,
    toArray: clone,
    size: size,
    inspect: inspect
  });

  const CONCAT_ARGUMENTS_BUGGY = (function () {
    return [].concat(arguments)[0][0] !== 1;
  })(1, 2);

  if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

  if (!arrayProto.indexOf) arrayProto.indexOf = indexOf;
  if (!arrayProto.lastIndexOf) arrayProto.lastIndexOf = lastIndexOf;
})();
function $H(object) {
  return new Hash(object);
}

var Hash = Class.create(
  Enumerable,
  (() => {
    function initialize(object) {
      this._object = Object.isHash(object)
        ? object.toObject()
        : Object.clone(object);
    }

    function _each(iterator, context) {
      let i = 0;
      for (var key in this._object) {
        var value = this._object[key],
          pair = [key, value];
        pair.key = key;
        pair.value = value;
        iterator.call(context, pair, i);
        i++;
      }
    }

    function set(key, value) {
      return (this._object[key] = value);
    }

    function get(key) {
      if (this._object[key] !== Object.prototype[key]) return this._object[key];
    }

    function unset(key) {
      const value = this._object[key];
      delete this._object[key];
      return value;
    }

    function toObject() {
      return Object.clone(this._object);
    }

    function keys() {
      return this.pluck('key');
    }

    function values() {
      return this.pluck('value');
    }

    function index(value) {
      const match = this.detect(pair => {
        return pair.value === value;
      });
      return match && match.key;
    }

    function merge(object) {
      return this.clone().update(object);
    }

    function update(object) {
      return new Hash(object).inject(this, (result, pair) => {
        result.set(pair.key, pair.value);
        return result;
      });
    }

    function toQueryPair(key, value) {
      if (Object.isUndefined(value)) return key;

      value = String.interpret(value);

      value = value.gsub(/(\r)?\n/, '\r\n');
      value = encodeURIComponent(value);
      value = value.gsub(/%20/, '+');
      return `${key}=${value}`;
    }

    function toQueryString() {
      return this.inject([], (results, pair) => {
        const key = encodeURIComponent(pair.key),
          values = pair.value;

        if (values && typeof values == 'object') {
          if (Object.isArray(values)) {
            var queryValues = [];
            for (var i = 0, len = values.length, value; i < len; i++) {
              value = values[i];
              queryValues.push(toQueryPair(key, value));
            }
            return results.concat(queryValues);
          }
        } else results.push(toQueryPair(key, values));
        return results;
      }).join('&');
    }

    function inspect() {
      return `#<Hash:{${this.map(pair => {
        return pair.map(Object.inspect).join(': ');
      }).join(', ')}}>`;
    }

    function clone() {
      return new Hash(this);
    }

    return {
      initialize: initialize,
      _each: _each,
      set: set,
      get: get,
      unset: unset,
      toObject: toObject,
      toTemplateReplacements: toObject,
      keys: keys,
      values: values,
      index: index,
      merge: merge,
      update: update,
      toQueryString: toQueryString,
      inspect: inspect,
      toJSON: toObject,
      clone: clone
    };
  })()
);

Hash.from = $H;
Object.extend(
  Number.prototype,
  (() => {
    function toColorPart() {
      return this.toPaddedString(2, 16);
    }

    function succ() {
      return this + 1;
    }

    function times(iterator, context) {
      $R(0, this, true).each(iterator, context);
      return this;
    }

    function toPaddedString(length, radix) {
      const string = this.toString(radix || 10);
      return '0'.times(length - string.length) + string;
    }

    function abs() {
      return Math.abs(this);
    }

    function round() {
      return Math.round(this);
    }

    function ceil() {
      return Math.ceil(this);
    }

    function floor() {
      return Math.floor(this);
    }

    return {
      toColorPart: toColorPart,
      succ: succ,
      times: times,
      toPaddedString: toPaddedString,
      abs: abs,
      round: round,
      ceil: ceil,
      floor: floor
    };
  })()
);

function $R(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var ObjectRange = Class.create(
  Enumerable,
  (() => {
    function initialize(start, end, exclusive) {
      this.start = start;
      this.end = end;
      this.exclusive = exclusive;
    }

    function _each(iterator, context) {
      let value = this.start,
        i;
      for (i = 0; this.include(value); i++) {
        iterator.call(context, value, i);
        value = value.succ();
      }
    }

    function include(value) {
      if (value < this.start) return false;
      if (this.exclusive) return value < this.end;
      return value <= this.end;
    }

    return {
      initialize: initialize,
      _each: _each,
      include: include
    };
  })()
);

var Abstract = {};

var Try = {
  these: function () {
    let returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) {}
    }

    return returnValue;
  }
};

var Ajax = {
  getTransport: () => {
    return (
      Try.these(
        () => {
          return new XMLHttpRequest();
        },
        () => {
          return new ActiveXObject('Msxml2.XMLHTTP');
        },
        () => {
          return new ActiveXObject('Microsoft.XMLHTTP');
        }
      ) || false
    );
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  responders: [],

  _each: function (iterator, context) {
    this.responders._each(iterator, context);
  },

  register: function (responder) {
    if (!this.include(responder)) this.responders.push(responder);
  },

  unregister: function (responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function (callback, request, transport, json) {
    this.each(responder => {
      if (Object.isFunction(responder[callback])) {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) {}
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate: () => {
    Ajax.activeRequestCount++;
  },
  onComplete: () => {
    Ajax.activeRequestCount--;
  }
});
Ajax.Base = Class.create({
  initialize: function (options) {
    this.options = {
      method: 'post',
      asynchronous: true,
      contentType: 'application/x-www-form-urlencoded',
      encoding: 'UTF-8',
      parameters: '',
      evalJSON: true,
      evalJS: true
    };
    Object.extend(this.options, options || {});

    this.options.method = this.options.method.toLowerCase();

    if (Object.isHash(this.options.parameters))
      this.options.parameters = this.options.parameters.toObject();
  }
});
Ajax.Request = Class.create(Ajax.Base, {
  _complete: false,

  initialize: function ($super, url, options) {
    $super(options);
    this.transport = Ajax.getTransport();
    this.request(url);
  },

  request: function (url) {
    this.url = url;
    this.method = this.options.method;
    let params = Object.isString(this.options.parameters)
      ? this.options.parameters
      : Object.toQueryString(this.options.parameters);

    if (!['get', 'post'].include(this.method)) {
      params += `${params ? '&' : ''}_method=${this.method}`;
      this.method = 'post';
    }

    if (params && this.method === 'get') {
      this.url += (this.url.include('?') ? '&' : '?') + params;
    }

    this.parameters = params.toQueryParams();

    try {
      var response = new Ajax.Response(this);
      if (this.options.onCreate) this.options.onCreate(response);
      Ajax.Responders.dispatch('onCreate', this, response);

      this.transport.open(
        this.method.toUpperCase(),
        this.url,
        this.options.asynchronous
      );

      if (this.options.asynchronous)
        this.respondToReadyState.bind(this).defer(1);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      this.body =
        this.method == 'post' ? this.options.postBody || params : null;
      this.transport.send(this.body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();
    } catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function () {
    const readyState = this.transport.readyState;
    if (readyState > 1 && !(readyState == 4 && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function () {
    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      Accept: 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] =
        this.options.contentType +
        (this.options.encoding ? `; charset=${this.options.encoding}` : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (
        this.transport.overrideMimeType &&
        (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0, 2005])[1] < 2005
      )
        headers['Connection'] = 'close';
    }

    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (Object.isFunction(extras.push))
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i + 1];
      else
        $H(extras).each(pair => {
          headers[pair.key] = pair.value;
        });
    }

    for (var name in headers)
      if (headers[name] != null)
        this.transport.setRequestHeader(name, headers[name]);
  },

  success: function () {
    const status = this.getStatus();
    return !status || (status >= 200 && status < 300) || status == 304;
  },

  getStatus: function () {
    try {
      if (this.transport.status === 1223) return 204;
      return this.transport.status || 0;
    } catch (e) {
      return 0;
    }
  },

  respondToReadyState: function (readyState) {
    const state = Ajax.Request.Events[readyState],
      response = new Ajax.Response(this);

    if (state == 'Complete') {
      try {
        this._complete = true;
        (
          this.options[`on${response.status}`] ||
          this.options[`on${this.success() ? 'Success' : 'Failure'}`] ||
          Prototype.emptyFunction
        )(response, response.headerJSON);
      } catch (e) {
        this.dispatchException(e);
      }

      var contentType = response.getHeader('Content-type');
      if (
        this.options.evalJS == 'force' ||
        (this.options.evalJS &&
          this.isSameOrigin() &&
          contentType &&
          contentType.match(
            /^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i
          ))
      )
        this.evalResponse();
    }

    try {
      (this.options[`on${state}`] || Prototype.emptyFunction)(
        response,
        response.headerJSON
      );
      Ajax.Responders.dispatch(
        `on${state}`,
        this,
        response,
        response.headerJSON
      );
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  isSameOrigin: function () {
    const m = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return (
      !m ||
      m[0] ==
        '#{protocol}//#{domain}#{port}'.interpolate({
          protocol: location.protocol,
          domain: document.domain,
          port: location.port ? `:${location.port}` : ''
        })
    );
  },

  getHeader: function (name) {
    try {
      return this.transport.getResponseHeader(name) || null;
    } catch (e) {
      return null;
    }
  },

  evalResponse: function () {
    try {
      return eval((this.transport.responseText || '').unfilterJSON());
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function (exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Request.Events = [
  'Uninitialized',
  'Loading',
  'Loaded',
  'Interactive',
  'Complete'
];

Ajax.Response = Class.create({
  initialize: function (request) {
    this.request = request;
    const transport = (this.transport = request.transport),
      readyState = (this.readyState = transport.readyState);

    if ((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
      this.status = this.getStatus();
      this.statusText = this.getStatusText();
      this.responseText = String.interpret(transport.responseText);
      this.headerJSON = this._getHeaderJSON();
    }

    if (readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML = Object.isUndefined(xml) ? null : xml;
      this.responseJSON = this._getResponseJSON();
    }
  },

  status: 0,

  statusText: '',

  getStatus: Ajax.Request.prototype.getStatus,

  getStatusText: function () {
    try {
      return this.transport.statusText || '';
    } catch (e) {
      return '';
    }
  },

  getHeader: Ajax.Request.prototype.getHeader,

  getAllHeaders: function () {
    try {
      return this.getAllResponseHeaders();
    } catch (e) {
      return null;
    }
  },

  getResponseHeader: function (name) {
    return this.transport.getResponseHeader(name);
  },

  getAllResponseHeaders: function () {
    return this.transport.getAllResponseHeaders();
  },

  _getHeaderJSON: function () {
    let json = this.getHeader('X-JSON');
    if (!json) return null;

    try {
      json = decodeURIComponent(escape(json));
    } catch (e) {}

    try {
      return json.evalJSON(
        this.request.options.sanitizeJSON || !this.request.isSameOrigin()
      );
    } catch (e) {
      this.request.dispatchException(e);
    }
  },

  _getResponseJSON: function () {
    const options = this.request.options;
    if (
      !options.evalJSON ||
      (options.evalJSON != 'force' &&
        !(this.getHeader('Content-type') || '').include('application/json')) ||
      this.responseText.blank()
    )
      return null;
    try {
      return this.responseText.evalJSON(
        options.sanitizeJSON || !this.request.isSameOrigin()
      );
    } catch (e) {
      this.request.dispatchException(e);
    }
  }
});

Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function ($super, container, url, options) {
    this.container = {
      success: container.success || container,
      failure: container.failure || (container.success ? null : container)
    };

    options = Object.clone(options);
    const onComplete = options.onComplete;
    options.onComplete = function (response, json) {
      this.updateContent(response.responseText);
      if (Object.isFunction(onComplete)) onComplete(response, json);
    }.bind(this);

    $super(url, options);
  },

  updateContent: function (responseText) {
    let receiver = this.container[this.success() ? 'success' : 'failure'];
    const options = this.options;

    if (!options.evalScripts) responseText = responseText.stripScripts();

    if ((receiver = $(receiver))) {
      if (options.insertion) {
        if (Object.isString(options.insertion)) {
          var insertion = {};
          insertion[options.insertion] = responseText;
          receiver.insert(insertion);
        } else options.insertion(receiver, responseText);
      } else receiver.update(responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function ($super, container, url, options) {
    $super(options);
    this.onComplete = this.options.onComplete;

    this.frequency = this.options.frequency || 2;
    this.decay = this.options.decay || 1;

    this.updater = {};
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function () {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function () {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function (response) {
    if (this.options.decay) {
      this.decay =
        response.responseText == this.lastText
          ? this.decay * this.options.decay
          : 1;

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent
      .bind(this)
      .delay(this.decay * this.frequency);
  },

  onTimerEvent: function () {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});

(GLOBAL => {
  let UNDEFINED;
  const SLICE = Array.prototype.slice;

  let DIV = document.createElement('div');

  function $(element) {
    if (arguments.length > 1) {
      for (var i = 0, elements = [], length = arguments.length; i < length; i++)
        elements.push($(arguments[i]));
      return elements;
    }

    if (Object.isString(element)) element = document.getElementById(element);
    return Element.extend(element);
  }

  GLOBAL.$ = $;

  if (!GLOBAL.Node) GLOBAL.Node = {};

  if (!GLOBAL.Node.ELEMENT_NODE) {
    Object.extend(GLOBAL.Node, {
      ELEMENT_NODE: 1,
      ATTRIBUTE_NODE: 2,
      TEXT_NODE: 3,
      CDATA_SECTION_NODE: 4,
      ENTITY_REFERENCE_NODE: 5,
      ENTITY_NODE: 6,
      PROCESSING_INSTRUCTION_NODE: 7,
      COMMENT_NODE: 8,
      DOCUMENT_NODE: 9,
      DOCUMENT_TYPE_NODE: 10,
      DOCUMENT_FRAGMENT_NODE: 11,
      NOTATION_NODE: 12
    });
  }

  let ELEMENT_CACHE = {};

  function shouldUseCreationCache(tagName, attributes) {
    if (tagName === 'select') return false;
    if ('type' in attributes) return false;
    return true;
  }

  const HAS_EXTENDED_CREATE_ELEMENT_SYNTAX = (() => {
    try {
      var el = document.createElement('<input name="x">');
      return el.tagName.toLowerCase() === 'input' && el.name === 'x';
    } catch (err) {
      return false;
    }
  })();

  const oldElement = GLOBAL.Element;
  function Element(tagName, attributes) {
    attributes = attributes || {};
    tagName = tagName.toLowerCase();

    if (HAS_EXTENDED_CREATE_ELEMENT_SYNTAX && attributes.name) {
      tagName = `<${tagName} name="${attributes.name}">`;
      delete attributes.name;
      return Element.writeAttribute(
        document.createElement(tagName),
        attributes
      );
    }

    if (!ELEMENT_CACHE[tagName])
      ELEMENT_CACHE[tagName] = Element.extend(document.createElement(tagName));

    const node = shouldUseCreationCache(tagName, attributes)
      ? ELEMENT_CACHE[tagName].cloneNode(false)
      : document.createElement(tagName);

    return Element.writeAttribute(node, attributes);
  }

  GLOBAL.Element = Element;

  Object.extend(GLOBAL.Element, oldElement || {});
  if (oldElement) GLOBAL.Element.prototype = oldElement.prototype;

  Element.Methods = { ByTag: {}, Simulated: {} };

  const methods = {};

  const INSPECT_ATTRIBUTES = { id: 'id', className: 'class' };
  function inspect(element) {
    element = $(element);
    let result = `<${element.tagName.toLowerCase()}`;

    let attribute, value;
    for (var property in INSPECT_ATTRIBUTES) {
      attribute = INSPECT_ATTRIBUTES[property];
      value = (element[property] || '').toString();
      if (value) result += ` ${attribute}=${value.inspect(true)}`;
    }

    return `${result}>`;
  }

  methods.inspect = inspect;

  function visible(element) {
    return $(element).getStyle('display') !== 'none';
  }

  function toggle(element, bool) {
    element = $(element);
    if (typeof bool !== 'boolean') bool = !Element.visible(element);
    Element[bool ? 'show' : 'hide'](element);

    return element;
  }

  function hide(element) {
    element = $(element);
    element.style.display = 'none';
    return element;
  }

  function show(element) {
    element = $(element);
    element.style.display = '';
    return element;
  }

  Object.extend(methods, {
    visible: visible,
    toggle: toggle,
    hide: hide,
    show: show
  });

  function remove(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  }

  const SELECT_ELEMENT_INNERHTML_BUGGY = (() => {
    let el = document.createElement('select'),
      isBuggy = true;
    el.innerHTML = '<option value="test">test</option>';
    if (el.options && el.options[0]) {
      isBuggy = el.options[0].nodeName.toUpperCase() !== 'OPTION';
    }
    el = null;
    return isBuggy;
  })();

  const TABLE_ELEMENT_INNERHTML_BUGGY = (() => {
    try {
      var el = document.createElement('table');
      if (el && el.tBodies) {
        el.innerHTML = '<tbody><tr><td>test</td></tr></tbody>';
        var isBuggy = typeof el.tBodies[0] == 'undefined';
        el = null;
        return isBuggy;
      }
    } catch (e) {
      return true;
    }
  })();

  const LINK_ELEMENT_INNERHTML_BUGGY = (() => {
    try {
      var el = document.createElement('div');
      el.innerHTML = '<link />';
      var isBuggy = el.childNodes.length === 0;
      el = null;
      return isBuggy;
    } catch (e) {
      return true;
    }
  })();

  const ANY_INNERHTML_BUGGY =
    SELECT_ELEMENT_INNERHTML_BUGGY ||
    TABLE_ELEMENT_INNERHTML_BUGGY ||
    LINK_ELEMENT_INNERHTML_BUGGY;

  const SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = (() => {
    let s = document.createElement('script'),
      isBuggy = false;
    try {
      s.appendChild(document.createTextNode(''));
      isBuggy = !s.firstChild || (s.firstChild && s.firstChild.nodeType !== 3);
    } catch (e) {
      isBuggy = true;
    }
    s = null;
    return isBuggy;
  })();

  function update(element, content) {
    element = $(element);

    const descendants = element.getElementsByTagName('*');
    let i = descendants.length;
    while (i--) purgeElement(descendants[i]);

    if (content && content.toElement) content = content.toElement();

    if (Object.isElement(content)) return element.update().insert(content);

    content = Object.toHTML(content);
    const tagName = element.tagName.toUpperCase();

    if (tagName === 'SCRIPT' && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) {
      element.text = content;
      return element;
    }

    if (ANY_INNERHTML_BUGGY) {
      if (tagName in INSERTION_TRANSLATIONS.tags) {
        while (element.firstChild) element.removeChild(element.firstChild);

        var nodes = getContentFromAnonymousElement(
          tagName,
          content.stripScripts()
        );
        for (var k = 0, node; (node = nodes[k]); k++) element.appendChild(node);
      } else if (
        LINK_ELEMENT_INNERHTML_BUGGY &&
        Object.isString(content) &&
        content.indexOf('<link') > -1
      ) {
        while (element.firstChild) element.removeChild(element.firstChild);

        var nodes = getContentFromAnonymousElement(
          tagName,
          content.stripScripts(),
          true
        );

        for (var j = 0, node; (node = nodes[j]); j++) element.appendChild(node);
      } else {
        element.innerHTML = content.stripScripts();
      }
    } else {
      element.innerHTML = content.stripScripts();
    }

    content.evalScripts.bind(content).defer();
    return element;
  }

  function replace(element, content) {
    element = $(element);

    if (content && content.toElement) {
      content = content.toElement();
    } else if (!Object.isElement(content)) {
      content = Object.toHTML(content);
      var range = element.ownerDocument.createRange();
      range.selectNode(element);
      content.evalScripts.bind(content).defer();
      content = range.createContextualFragment(content.stripScripts());
    }

    element.parentNode.replaceChild(content, element);
    return element;
  }

  const INSERTION_TRANSLATIONS = {
    before: (element, node) => {
      element.parentNode.insertBefore(node, element);
    },
    top: (element, node) => {
      element.insertBefore(node, element.firstChild);
    },
    bottom: (element, node) => {
      element.appendChild(node);
    },
    after: (element, node) => {
      element.parentNode.insertBefore(node, element.nextSibling);
    },

    tags: {
      TABLE: ['<table>', '</table>', 1],
      TBODY: ['<table><tbody>', '</tbody></table>', 2],
      TR: ['<table><tbody><tr>', '</tr></tbody></table>', 3],
      TD: ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
      SELECT: ['<select>', '</select>', 1]
    }
  };

  const tags = INSERTION_TRANSLATIONS.tags;

  Object.extend(tags, {
    THEAD: tags.TBODY,
    TFOOT: tags.TBODY,
    TH: tags.TD
  });

  function replace_IE(element, content) {
    element = $(element);
    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) {
      element.parentNode.replaceChild(content, element);
      return element;
    }

    content = Object.toHTML(content);
    const parent = element.parentNode,
      tagName = parent.tagName.toUpperCase();

    if (tagName in INSERTION_TRANSLATIONS.tags) {
      var nextSibling = Element.next(element);
      var fragments = getContentFromAnonymousElement(
        tagName,
        content.stripScripts()
      );

      parent.removeChild(element);

      var iterator;
      if (nextSibling)
        iterator = node => {
          parent.insertBefore(node, nextSibling);
        };
      else
        iterator = node => {
          parent.appendChild(node);
        };

      fragments.each(iterator);
    } else {
      element.outerHTML = content.stripScripts();
    }

    content.evalScripts.bind(content).defer();
    return element;
  }

  if ('outerHTML' in document.documentElement) replace = replace_IE;

  function isContent(content) {
    if (Object.isUndefined(content) || content === null) return false;

    if (Object.isString(content) || Object.isNumber(content)) return true;
    if (Object.isElement(content)) return true;
    if (content.toElement || content.toHTML) return true;

    return false;
  }

  function insertContentAt(element, content, position) {
    position = position.toLowerCase();
    const method = INSERTION_TRANSLATIONS[position];

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) {
      method(element, content);
      return element;
    }

    content = Object.toHTML(content);
    const tagName = (
      position === 'before' || position === 'after'
        ? element.parentNode
        : element
    ).tagName.toUpperCase();

    const childNodes = getContentFromAnonymousElement(
      tagName,
      content.stripScripts()
    );

    if (position === 'top' || position === 'after') childNodes.reverse();

    for (var i = 0, node; (node = childNodes[i]); i++) method(element, node);

    content.evalScripts.bind(content).defer();
  }

  function insert(element, insertions) {
    element = $(element);

    if (isContent(insertions)) insertions = { bottom: insertions };

    for (var position in insertions)
      insertContentAt(element, insertions[position], position);

    return element;
  }

  function wrap(element, wrapper, attributes) {
    element = $(element);

    if (Object.isElement(wrapper)) {
      $(wrapper).writeAttribute(attributes || {});
    } else if (Object.isString(wrapper)) {
      wrapper = new Element(wrapper, attributes);
    } else {
      wrapper = new Element('div', wrapper);
    }

    if (element.parentNode) element.parentNode.replaceChild(wrapper, element);

    wrapper.appendChild(element);

    return wrapper;
  }

  function cleanWhitespace(element) {
    element = $(element);
    let node = element.firstChild;

    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType === Node.TEXT_NODE && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  }

  function empty(element) {
    return $(element).innerHTML.blank();
  }

  function getContentFromAnonymousElement(tagName, html, force) {
    let t = INSERTION_TRANSLATIONS.tags[tagName],
      div = DIV;

    let workaround = !!t;
    if (!workaround && force) {
      workaround = true;
      t = ['', '', 0];
    }

    if (workaround) {
      div.innerHTML = `&#160;${t[0]}${html}${t[1]}`;
      div.removeChild(div.firstChild);
      for (var i = t[2]; i--; ) div = div.firstChild;
    } else {
      div.innerHTML = html;
    }

    return $A(div.childNodes);
  }

  function clone(element, deep) {
    if (!(element = $(element))) return;
    const clone = element.cloneNode(deep);
    if (!HAS_UNIQUE_ID_PROPERTY) {
      clone._prototypeUID = UNDEFINED;
      if (deep) {
        var descendants = Element.select(clone, '*'),
          i = descendants.length;
        while (i--) descendants[i]._prototypeUID = UNDEFINED;
      }
    }
    return Element.extend(clone);
  }

  function purgeElement(element) {
    const uid = getUniqueElementID(element);
    if (uid) {
      Element.stopObserving(element);
      if (!HAS_UNIQUE_ID_PROPERTY) element._prototypeUID = UNDEFINED;
      delete Element.Storage[uid];
    }
  }

  function purgeCollection(elements) {
    let i = elements.length;
    while (i--) purgeElement(elements[i]);
  }

  function purgeCollection_IE(elements) {
    let i = elements.length,
      element,
      uid;
    while (i--) {
      element = elements[i];
      uid = getUniqueElementID(element);
      delete Element.Storage[uid];
      delete Event.cache[uid];
    }
  }

  if (HAS_UNIQUE_ID_PROPERTY) {
    purgeCollection = purgeCollection_IE;
  }

  function purge(element) {
    if (!(element = $(element))) return;
    purgeElement(element);

    const descendants = element.getElementsByTagName('*');
    let i = descendants.length;

    while (i--) purgeElement(descendants[i]);

    return null;
  }

  Object.extend(methods, {
    remove: remove,
    update: update,
    replace: replace,
    insert: insert,
    wrap: wrap,
    cleanWhitespace: cleanWhitespace,
    empty: empty,
    clone: clone,
    purge: purge
  });

  function recursivelyCollect(element, property, maximumLength) {
    element = $(element);
    maximumLength = maximumLength || -1;
    const elements = [];

    while ((element = element[property])) {
      if (element.nodeType === Node.ELEMENT_NODE)
        elements.push(Element.extend(element));

      if (elements.length === maximumLength) break;
    }

    return elements;
  }

  function ancestors(element) {
    return recursivelyCollect(element, 'parentNode');
  }

  function descendants(element) {
    return Element.select(element, '*');
  }

  function firstDescendant(element) {
    element = $(element).firstChild;
    while (element && element.nodeType !== Node.ELEMENT_NODE)
      element = element.nextSibling;

    return $(element);
  }

  function immediateDescendants(element) {
    const results = [];
    let child = $(element).firstChild;

    while (child) {
      if (child.nodeType === Node.ELEMENT_NODE)
        results.push(Element.extend(child));

      child = child.nextSibling;
    }

    return results;
  }

  function previousSiblings(element) {
    return recursivelyCollect(element, 'previousSibling');
  }

  function nextSiblings(element) {
    return recursivelyCollect(element, 'nextSibling');
  }

  function siblings(element) {
    element = $(element);
    const previous = previousSiblings(element),
      next = nextSiblings(element);
    return previous.reverse().concat(next);
  }

  function match(element, selector) {
    element = $(element);

    if (Object.isString(selector))
      return Prototype.Selector.match(element, selector);

    return selector.match(element);
  }

  function _recursivelyFind(element, property, expression, index) {
    ((element = $(element)),
      (expression = expression || 0),
      (index = index || 0));
    if (Object.isNumber(expression)) {
      ((index = expression), (expression = null));
    }

    while ((element = element[property])) {
      if (element.nodeType !== 1) continue;
      if (expression && !Prototype.Selector.match(element, expression))
        continue;
      if (--index >= 0) continue;

      return Element.extend(element);
    }
  }

  function up(element, expression, index) {
    element = $(element);

    if (arguments.length === 1) return $(element.parentNode);
    return _recursivelyFind(element, 'parentNode', expression, index);
  }

  function down(element, expression, index) {
    if (arguments.length === 1) return firstDescendant(element);
    ((element = $(element)),
      (expression = expression || 0),
      (index = index || 0));

    if (Object.isNumber(expression)) ((index = expression), (expression = '*'));

    const node = Prototype.Selector.select(expression, element)[index];
    return Element.extend(node);
  }

  function previous(element, expression, index) {
    return _recursivelyFind(element, 'previousSibling', expression, index);
  }

  function next(element, expression, index) {
    return _recursivelyFind(element, 'nextSibling', expression, index);
  }

  function select(element) {
    element = $(element);
    const expressions = SLICE.call(arguments, 1).join(', ');
    return Prototype.Selector.select(expressions, element);
  }

  function adjacent(element) {
    element = $(element);
    const expressions = SLICE.call(arguments, 1).join(', ');
    const siblings = Element.siblings(element),
      results = [];
    for (var i = 0, sibling; (sibling = siblings[i]); i++) {
      if (Prototype.Selector.match(sibling, expressions)) results.push(sibling);
    }

    return results;
  }

  function descendantOf_DOM(element, ancestor) {
    ((element = $(element)), (ancestor = $(ancestor)));
    if (!element || !ancestor) return false;
    while ((element = element.parentNode))
      if (element === ancestor) return true;
    return false;
  }

  function descendantOf_contains(element, ancestor) {
    ((element = $(element)), (ancestor = $(ancestor)));
    if (!element || !ancestor) return false;
    if (!ancestor.contains) return descendantOf_DOM(element, ancestor);
    return ancestor.contains(element) && ancestor !== element;
  }

  function descendantOf_compareDocumentPosition(element, ancestor) {
    ((element = $(element)), (ancestor = $(ancestor)));
    if (!element || !ancestor) return false;
    return (element.compareDocumentPosition(ancestor) & 8) === 8;
  }

  let descendantOf;
  if (DIV.compareDocumentPosition) {
    descendantOf = descendantOf_compareDocumentPosition;
  } else if (DIV.contains) {
    descendantOf = descendantOf_contains;
  } else {
    descendantOf = descendantOf_DOM;
  }

  Object.extend(methods, {
    recursivelyCollect: recursivelyCollect,
    ancestors: ancestors,
    descendants: descendants,
    firstDescendant: firstDescendant,
    immediateDescendants: immediateDescendants,
    previousSiblings: previousSiblings,
    nextSiblings: nextSiblings,
    siblings: siblings,
    match: match,
    up: up,
    down: down,
    previous: previous,
    next: next,
    select: select,
    adjacent: adjacent,
    descendantOf: descendantOf,

    getElementsBySelector: select,

    childElements: immediateDescendants
  });

  let idCounter = 1;
  function identify(element) {
    element = $(element);
    let id = Element.readAttribute(element, 'id');
    if (id) return id;

    do {
      id = `anonymous_element_${idCounter++}`;
    } while ($(id));

    Element.writeAttribute(element, 'id', id);
    return id;
  }

  function readAttribute(element, name) {
    return $(element).getAttribute(name);
  }

  function readAttribute_IE(element, name) {
    element = $(element);

    const table = ATTRIBUTE_TRANSLATIONS.read;
    if (table.values[name]) return table.values[name](element, name);

    if (table.names[name]) name = table.names[name];

    if (name.include(':')) {
      if (!element.attributes || !element.attributes[name]) return null;
      return element.attributes[name].value;
    }

    return element.getAttribute(name);
  }

  function readAttribute_Opera(element, name) {
    if (name === 'title') return element.title;
    return element.getAttribute(name);
  }

  const PROBLEMATIC_ATTRIBUTE_READING = (() => {
    DIV.setAttribute('onclick', []);
    const value = DIV.getAttribute('onclick');
    const isFunction = Object.isArray(value);
    DIV.removeAttribute('onclick');
    return isFunction;
  })();

  if (PROBLEMATIC_ATTRIBUTE_READING) {
    readAttribute = readAttribute_IE;
  } else if (Prototype.Browser.Opera) {
    readAttribute = readAttribute_Opera;
  }

  function writeAttribute(element, name, value) {
    element = $(element);
    let attributes = {};
    const table = ATTRIBUTE_TRANSLATIONS.write;

    if (typeof name === 'object') {
      attributes = name;
    } else {
      attributes[name] = Object.isUndefined(value) ? true : value;
    }

    for (var attr in attributes) {
      name = table.names[attr] || attr;
      value = attributes[attr];
      if (table.values[attr]) {
        value = table.values[attr](element, value);
        if (Object.isUndefined(value)) continue;
      }
      if (value === false || value === null) element.removeAttribute(name);
      else if (value === true) element.setAttribute(name, name);
      else element.setAttribute(name, value);
    }

    return element;
  }

  const PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES = (() => {
    if (!HAS_EXTENDED_CREATE_ELEMENT_SYNTAX) {
      return false;
    }
    const checkbox = document.createElement('<input type="checkbox">');
    checkbox.checked = true;
    const node = checkbox.getAttributeNode('checked');
    return !node || !node.specified;
  })();

  function hasAttribute(element, attribute) {
    attribute = ATTRIBUTE_TRANSLATIONS.has[attribute] || attribute;
    const node = $(element).getAttributeNode(attribute);
    return !!(node && node.specified);
  }

  function hasAttribute_IE(element, attribute) {
    if (attribute === 'checked') {
      return element.checked;
    }
    return hasAttribute(element, attribute);
  }

  GLOBAL.Element.Methods.Simulated.hasAttribute =
    PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES ? hasAttribute_IE : hasAttribute;

  function classNames(element) {
    return new Element.ClassNames(element);
  }

  const regExpCache = {};
  function getRegExpForClassName(className) {
    if (regExpCache[className]) return regExpCache[className];

    const re = new RegExp(`(^|\\s+)${className}(\\s+|$)`);
    regExpCache[className] = re;
    return re;
  }

  function hasClassName(element, className) {
    if (!(element = $(element))) return;

    const elementClassName = element.className;

    if (elementClassName.length === 0) return false;
    if (elementClassName === className) return true;

    return getRegExpForClassName(className).test(elementClassName);
  }

  function addClassName(element, className) {
    if (!(element = $(element))) return;

    if (!hasClassName(element, className))
      element.className += (element.className ? ' ' : '') + className;

    return element;
  }

  function removeClassName(element, className) {
    if (!(element = $(element))) return;

    element.className = element.className
      .replace(getRegExpForClassName(className), ' ')
      .strip();

    return element;
  }

  function toggleClassName(element, className, bool) {
    if (!(element = $(element))) return;

    if (Object.isUndefined(bool)) bool = !hasClassName(element, className);

    const method = Element[bool ? 'addClassName' : 'removeClassName'];
    return method(element, className);
  }

  const ATTRIBUTE_TRANSLATIONS = {};

  let classProp = 'className',
    forProp = 'for';

  DIV.setAttribute(classProp, 'x');
  if (DIV.className !== 'x') {
    DIV.setAttribute('class', 'x');
    if (DIV.className === 'x') classProp = 'class';
  }

  let LABEL = document.createElement('label');
  LABEL.setAttribute(forProp, 'x');
  if (LABEL.htmlFor !== 'x') {
    LABEL.setAttribute('htmlFor', 'x');
    if (LABEL.htmlFor === 'x') forProp = 'htmlFor';
  }
  LABEL = null;

  function _getAttr(element, attribute) {
    return element.getAttribute(attribute);
  }

  function _getAttr2(element, attribute) {
    return element.getAttribute(attribute, 2);
  }

  function _getAttrNode(element, attribute) {
    const node = element.getAttributeNode(attribute);
    return node ? node.value : '';
  }

  function _getFlag(element, attribute) {
    return $(element).hasAttribute(attribute) ? attribute : null;
  }

  DIV.onclick = Prototype.emptyFunction;
  const onclickValue = DIV.getAttribute('onclick');

  let _getEv;

  if (String(onclickValue).indexOf('{') > -1) {
    _getEv = (element, attribute) => {
      let value = element.getAttribute(attribute);
      if (!value) return null;
      value = value.toString();
      value = value.split('{')[1];
      value = value.split('}')[0];
      return value.strip();
    };
  } else if (onclickValue === '') {
    _getEv = (element, attribute) => {
      const value = element.getAttribute(attribute);
      if (!value) return null;
      return value.strip();
    };
  }

  ATTRIBUTE_TRANSLATIONS.read = {
    names: {
      class: classProp,
      className: classProp,
      for: forProp,
      htmlFor: forProp
    },

    values: {
      style: element => {
        return element.style.cssText.toLowerCase();
      },
      title: element => {
        return element.title;
      }
    }
  };

  ATTRIBUTE_TRANSLATIONS.write = {
    names: {
      className: 'class',
      htmlFor: 'for',
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing'
    },

    values: {
      checked: (element, value) => {
        value = !!value;
        element.checked = value;
        return value ? 'checked' : null;
      },

      style: (element, value) => {
        element.style.cssText = value ? value : '';
      }
    }
  };

  ATTRIBUTE_TRANSLATIONS.has = { names: {} };

  Object.extend(
    ATTRIBUTE_TRANSLATIONS.write.names,
    ATTRIBUTE_TRANSLATIONS.read.names
  );

  const CAMEL_CASED_ATTRIBUTE_NAMES = $w(`
    colSpan rowSpan vAlign dateTime 
    accessKey tabIndex encType maxLength readOnly longDesc frameBorder
  `);

  for (var i = 0, attr; (attr = CAMEL_CASED_ATTRIBUTE_NAMES[i]); i++) {
    ATTRIBUTE_TRANSLATIONS.write.names[attr.toLowerCase()] = attr;
    ATTRIBUTE_TRANSLATIONS.has.names[attr.toLowerCase()] = attr;
  }

  Object.extend(ATTRIBUTE_TRANSLATIONS.read.values, {
    href: _getAttr2,
    src: _getAttr2,
    type: _getAttr,
    action: _getAttrNode,
    disabled: _getFlag,
    checked: _getFlag,
    readonly: _getFlag,
    multiple: _getFlag,
    onload: _getEv,
    onunload: _getEv,
    onclick: _getEv,
    ondblclick: _getEv,
    onmousedown: _getEv,
    onmouseup: _getEv,
    onmouseover: _getEv,
    onmousemove: _getEv,
    onmouseout: _getEv,
    onfocus: _getEv,
    onblur: _getEv,
    onkeypress: _getEv,
    onkeydown: _getEv,
    onkeyup: _getEv,
    onsubmit: _getEv,
    onreset: _getEv,
    onselect: _getEv,
    onchange: _getEv
  });

  Object.extend(methods, {
    identify: identify,
    readAttribute: readAttribute,
    writeAttribute: writeAttribute,
    classNames: classNames,
    hasClassName: hasClassName,
    addClassName: addClassName,
    removeClassName: removeClassName,
    toggleClassName: toggleClassName
  });

  function normalizeStyleName(style) {
    if (style === 'float' || style === 'styleFloat') return 'cssFloat';
    return style.camelize();
  }

  function normalizeStyleName_IE(style) {
    if (style === 'float' || style === 'cssFloat') return 'styleFloat';
    return style.camelize();
  }

  function setStyle(element, styles) {
    element = $(element);
    const elementStyle = element.style;
    let match;

    if (Object.isString(styles)) {
      elementStyle.cssText += `;${styles}`;
      if (styles.include('opacity')) {
        var opacity = styles.match(/opacity:\s*(\d?\.?\d*)/)[1];
        Element.setOpacity(element, opacity);
      }
      return element;
    }

    for (var property in styles) {
      if (property === 'opacity') {
        Element.setOpacity(element, styles[property]);
      } else {
        var value = styles[property];
        if (property === 'float' || property === 'cssFloat') {
          property = Object.isUndefined(elementStyle.styleFloat)
            ? 'cssFloat'
            : 'styleFloat';
        }
        elementStyle[property] = value;
      }
    }

    return element;
  }

  function getStyle(element, style) {
    element = $(element);
    style = normalizeStyleName(style);

    let value = element.style[style];
    if (!value || value === 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }

    if (style === 'opacity') return value ? parseFloat(value) : 1.0;
    return value === 'auto' ? null : value;
  }

  function getStyle_Opera(element, style) {
    switch (style) {
      case 'height':
      case 'width':
        if (!Element.visible(element)) return null;

        var dim = parseInt(getStyle(element, style), 10);

        if (dim !== element[`offset${style.capitalize()}`]) return `${dim}px`;

        return Element.measure(element, style);

      default:
        return getStyle(element, style);
    }
  }

  function getStyle_IE(element, style) {
    element = $(element);
    style = normalizeStyleName_IE(style);

    let value = element.style[style];
    if (!value && element.currentStyle) {
      value = element.currentStyle[style];
    }

    if (style === 'opacity') {
      if (!STANDARD_CSS_OPACITY_SUPPORTED) return getOpacity_IE(element);
      else return value ? parseFloat(value) : 1.0;
    }

    if (value === 'auto') {
      if ((style === 'width' || style === 'height') && Element.visible(element))
        return `${Element.measure(element, style)}px`;
      return null;
    }

    return value;
  }

  function stripAlphaFromFilter_IE(filter) {
    return (filter || '').replace(/alpha\([^\)]*\)/gi, '');
  }

  function hasLayout_IE(element) {
    if (!element.currentStyle || !element.currentStyle.hasLayout)
      element.style.zoom = 1;
    return element;
  }

  const STANDARD_CSS_OPACITY_SUPPORTED = (() => {
    DIV.style.cssText = 'opacity:.55';
    return /^0.55/.test(DIV.style.opacity);
  })();

  function setOpacity(element, value) {
    element = $(element);
    if (value == 1 || value === '') value = '';
    else if (value < 0.00001) value = 0;
    element.style.opacity = value;
    return element;
  }

  function setOpacity_IE(element, value) {
    if (STANDARD_CSS_OPACITY_SUPPORTED) return setOpacity(element, value);

    element = hasLayout_IE($(element));
    let filter = Element.getStyle(element, 'filter');
    const style = element.style;

    if (value == 1 || value === '') {
      filter = stripAlphaFromFilter_IE(filter);
      if (filter) style.filter = filter;
      else style.removeAttribute('filter');
      return element;
    }

    if (value < 0.00001) value = 0;

    style.filter = `${stripAlphaFromFilter_IE(filter)} alpha(opacity=${value * 100})`;

    return element;
  }

  function getOpacity(element) {
    return Element.getStyle(element, 'opacity');
  }

  function getOpacity_IE(element) {
    if (STANDARD_CSS_OPACITY_SUPPORTED) return getOpacity(element);

    const filter = Element.getStyle(element, 'filter');
    if (filter.length === 0) return 1.0;
    const match = (filter || '').match(/alpha\(opacity=(.*)\)/i);
    if (match && match[1]) return parseFloat(match[1]) / 100;
    return 1.0;
  }

  Object.extend(methods, {
    setStyle: setStyle,
    getStyle: getStyle,
    setOpacity: setOpacity,
    getOpacity: getOpacity
  });

  if ('styleFloat' in DIV.style) {
    methods.getStyle = getStyle_IE;
    methods.setOpacity = setOpacity_IE;
    methods.getOpacity = getOpacity_IE;
  }

  const UID = 0;

  GLOBAL.Element.Storage = { UID: 1 };

  function getUniqueElementID(element) {
    if (element === window) return 0;

    if (typeof element._prototypeUID === 'undefined')
      element._prototypeUID = Element.Storage.UID++;
    return element._prototypeUID;
  }

  function getUniqueElementID_IE(element) {
    if (element === window) return 0;
    if (element == document) return 1;
    return element.uniqueID;
  }

  const HAS_UNIQUE_ID_PROPERTY = 'uniqueID' in DIV;
  if (HAS_UNIQUE_ID_PROPERTY) getUniqueElementID = getUniqueElementID_IE;

  function getStorage(element) {
    if (!(element = $(element))) return;

    const uid = getUniqueElementID(element);

    if (!Element.Storage[uid]) Element.Storage[uid] = $H();

    return Element.Storage[uid];
  }

  function store(element, key, value) {
    if (!(element = $(element))) return;
    const storage = getStorage(element);
    if (arguments.length === 2) {
      storage.update(key);
    } else {
      storage.set(key, value);
    }
    return element;
  }

  function retrieve(element, key, defaultValue) {
    if (!(element = $(element))) return;
    const storage = getStorage(element);
    let value = storage.get(key);

    if (Object.isUndefined(value)) {
      storage.set(key, defaultValue);
      value = defaultValue;
    }

    return value;
  }

  Object.extend(methods, {
    getStorage: getStorage,
    store: store,
    retrieve: retrieve
  });

  const Methods = {},
    ByTag = Element.Methods.ByTag,
    F = Prototype.BrowserFeatures;

  if (!F.ElementExtensions && '__proto__' in DIV) {
    GLOBAL.HTMLElement = {};
    GLOBAL.HTMLElement.prototype = DIV['__proto__'];
    F.ElementExtensions = true;
  }

  function checkElementPrototypeDeficiency(tagName) {
    if (typeof window.Element === 'undefined') return false;
    if (!HAS_EXTENDED_CREATE_ELEMENT_SYNTAX) return false;
    const proto = window.Element.prototype;
    if (proto) {
      var id = `_${`${Math.random()}`.slice(2)}`,
        el = document.createElement(tagName);
      proto[id] = 'x';
      var isBuggy = el[id] !== 'x';
      delete proto[id];
      el = null;
      return isBuggy;
    }

    return false;
  }

  const HTMLOBJECTELEMENT_PROTOTYPE_BUGGY =
    checkElementPrototypeDeficiency('object');

  function extendElementWith(element, methods) {
    for (var property in methods) {
      var value = methods[property];
      if (Object.isFunction(value) && !(property in element))
        element[property] = value.methodize();
    }
  }

  let EXTENDED = {};
  function elementIsExtended(element) {
    const uid = getUniqueElementID(element);
    return uid in EXTENDED;
  }

  function extend(element) {
    if (!element || elementIsExtended(element)) return element;
    if (element.nodeType !== Node.ELEMENT_NODE || element == window)
      return element;

    const methods = Object.clone(Methods),
      tagName = element.tagName.toUpperCase();

    if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

    extendElementWith(element, methods);
    EXTENDED[getUniqueElementID(element)] = true;
    return element;
  }

  function extend_IE8(element) {
    if (!element || elementIsExtended(element)) return element;

    const t = element.tagName;
    if (t && /^(?:object|applet|embed)$/i.test(t)) {
      extendElementWith(element, Element.Methods);
      extendElementWith(element, Element.Methods.Simulated);
      extendElementWith(element, Element.Methods.ByTag[t.toUpperCase()]);
    }

    return element;
  }

  if (F.SpecificElementExtensions) {
    extend = HTMLOBJECTELEMENT_PROTOTYPE_BUGGY ? extend_IE8 : Prototype.K;
  }

  function addMethodsToTagName(tagName, methods) {
    tagName = tagName.toUpperCase();
    if (!ByTag[tagName]) ByTag[tagName] = {};
    Object.extend(ByTag[tagName], methods);
  }

  function mergeMethods(destination, methods, onlyIfAbsent) {
    if (Object.isUndefined(onlyIfAbsent)) onlyIfAbsent = false;
    for (var property in methods) {
      var value = methods[property];
      if (!Object.isFunction(value)) continue;
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = value.methodize();
    }
  }

  function findDOMClass(tagName) {
    let klass;
    const trans = {
      OPTGROUP: 'OptGroup',
      TEXTAREA: 'TextArea',
      P: 'Paragraph',
      FIELDSET: 'FieldSet',
      UL: 'UList',
      OL: 'OList',
      DL: 'DList',
      DIR: 'Directory',
      H1: 'Heading',
      H2: 'Heading',
      H3: 'Heading',
      H4: 'Heading',
      H5: 'Heading',
      H6: 'Heading',
      Q: 'Quote',
      INS: 'Mod',
      DEL: 'Mod',
      A: 'Anchor',
      IMG: 'Image',
      CAPTION: 'TableCaption',
      COL: 'TableCol',
      COLGROUP: 'TableCol',
      THEAD: 'TableSection',
      TFOOT: 'TableSection',
      TBODY: 'TableSection',
      TR: 'TableRow',
      TH: 'TableCell',
      TD: 'TableCell',
      FRAMESET: 'FrameSet',
      IFRAME: 'IFrame'
    };
    if (trans[tagName]) klass = `HTML${trans[tagName]}Element`;
    if (window[klass]) return window[klass];
    klass = `HTML${tagName}Element`;
    if (window[klass]) return window[klass];
    klass = `HTML${tagName.capitalize()}Element`;
    if (window[klass]) return window[klass];

    let element = document.createElement(tagName);
    const proto = element['__proto__'] || element.constructor.prototype;

    element = null;
    return proto;
  }

  function addMethods(methods) {
    if (arguments.length === 0) addFormMethods();

    if (arguments.length === 2) {
      var tagName = methods;
      methods = arguments[1];
    }

    if (!tagName) {
      Object.extend(Element.Methods, methods || {});
    } else {
      if (Object.isArray(tagName)) {
        for (var i = 0, tag; (tag = tagName[i]); i++)
          addMethodsToTagName(tag, methods);
      } else {
        addMethodsToTagName(tagName, methods);
      }
    }

    const ELEMENT_PROTOTYPE = window.HTMLElement
      ? HTMLElement.prototype
      : Element.prototype;

    if (F.ElementExtensions) {
      mergeMethods(ELEMENT_PROTOTYPE, Element.Methods);
      mergeMethods(ELEMENT_PROTOTYPE, Element.Methods.Simulated, true);
    }

    if (F.SpecificElementExtensions) {
      for (var tag in Element.Methods.ByTag) {
        var klass = findDOMClass(tag);
        if (Object.isUndefined(klass)) continue;
        mergeMethods(klass.prototype, ByTag[tag]);
      }
    }

    Object.extend(Element, Element.Methods);
    Object.extend(Element, Element.Methods.Simulated);
    delete Element.ByTag;
    delete Element.Simulated;

    Element.extend.refresh();

    ELEMENT_CACHE = {};
  }

  Object.extend(GLOBAL.Element, {
    extend: extend,
    addMethods: addMethods
  });

  if (extend === Prototype.K) {
    GLOBAL.Element.extend.refresh = Prototype.emptyFunction;
  } else {
    GLOBAL.Element.extend.refresh = () => {
      if (Prototype.BrowserFeatures.ElementExtensions) return;
      Object.extend(Methods, Element.Methods);
      Object.extend(Methods, Element.Methods.Simulated);

      EXTENDED = {};
    };
  }

  function addFormMethods() {
    Object.extend(Form, Form.Methods);
    Object.extend(Form.Element, Form.Element.Methods);
    Object.extend(Element.Methods.ByTag, {
      FORM: Object.clone(Form.Methods),
      INPUT: Object.clone(Form.Element.Methods),
      SELECT: Object.clone(Form.Element.Methods),
      TEXTAREA: Object.clone(Form.Element.Methods),
      BUTTON: Object.clone(Form.Element.Methods)
    });
  }

  Element.addMethods(methods);

  function destroyCache_IE() {
    DIV = null;
    ELEMENT_CACHE = null;
  }

  if (window.attachEvent) window.attachEvent('onunload', destroyCache_IE);
})(this);
(() => {
  function toDecimal(pctString) {
    const match = pctString.match(/^(\d+)%?$/i);
    if (!match) return null;
    return Number(match[1]) / 100;
  }

  function getRawStyle(element, style) {
    element = $(element);

    let value = element.style[style];
    if (!value || value === 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }

    if (style === 'opacity') return value ? parseFloat(value) : 1.0;
    return value === 'auto' ? null : value;
  }

  function getRawStyle_IE(element, style) {
    let value = element.style[style];
    if (!value && element.currentStyle) {
      value = element.currentStyle[style];
    }
    return value;
  }

  function getContentWidth(element, context) {
    const boxWidth = element.offsetWidth;

    const bl = getPixelValue(element, 'borderLeftWidth', context) || 0;
    const br = getPixelValue(element, 'borderRightWidth', context) || 0;
    const pl = getPixelValue(element, 'paddingLeft', context) || 0;
    const pr = getPixelValue(element, 'paddingRight', context) || 0;

    return boxWidth - bl - br - pl - pr;
  }

  if (
    !Object.isUndefined(document.documentElement.currentStyle) &&
    !Prototype.Browser.Opera
  ) {
    getRawStyle = getRawStyle_IE;
  }

  function getPixelValue(value, property, context) {
    let element = null;
    if (Object.isElement(value)) {
      element = value;
      value = getRawStyle(element, property);
    }

    if (value === null || Object.isUndefined(value)) {
      return null;
    }

    if (/^(?:-)?\d+(\.\d+)?(px)?$/i.test(value)) {
      return window.parseFloat(value);
    }

    const isPercentage = value.include('%'),
      isViewport = context === document.viewport;

    if (
      /\d/.test(value) &&
      element &&
      element.runtimeStyle &&
      !(isPercentage && isViewport)
    ) {
      var style = element.style.left,
        rStyle = element.runtimeStyle.left;
      element.runtimeStyle.left = element.currentStyle.left;
      element.style.left = value || 0;
      value = element.style.pixelLeft;
      element.style.left = style;
      element.runtimeStyle.left = rStyle;

      return value;
    }

    if (element && isPercentage) {
      context = context || element.parentNode;
      var decimal = toDecimal(value),
        whole = null;

      var isHorizontal =
        property.include('left') ||
        property.include('right') ||
        property.include('width');

      var isVertical =
        property.include('top') ||
        property.include('bottom') ||
        property.include('height');

      if (context === document.viewport) {
        if (isHorizontal) {
          whole = document.viewport.getWidth();
        } else if (isVertical) {
          whole = document.viewport.getHeight();
        }
      } else {
        if (isHorizontal) {
          whole = $(context).measure('width');
        } else if (isVertical) {
          whole = $(context).measure('height');
        }
      }

      return whole === null ? 0 : whole * decimal;
    }

    return 0;
  }

  function toCSSPixels(number) {
    if (Object.isString(number) && number.endsWith('px')) return number;
    return `${number}px`;
  }

  function isDisplayed(element) {
    while (element && element.parentNode) {
      var display = element.getStyle('display');
      if (display === 'none') {
        return false;
      }
      element = $(element.parentNode);
    }
    return true;
  }

  let hasLayout = Prototype.K;
  if ('currentStyle' in document.documentElement) {
    hasLayout = element => {
      if (!element.currentStyle.hasLayout) {
        element.style.zoom = 1;
      }
      return element;
    };
  }

  function cssNameFor(key) {
    if (key.include('border')) key = `${key}-width`;
    return key.camelize();
  }

  Element.Layout = Class.create(Hash, {
    initialize: function ($super, element, preCompute) {
      $super();
      this.element = $(element);

      Element.Layout.PROPERTIES.each(function (property) {
        this._set(property, null);
      }, this);

      if (preCompute) {
        this._preComputing = true;
        this._begin();
        Element.Layout.PROPERTIES.each(this._compute, this);
        this._end();
        this._preComputing = false;
      }
    },

    _set: function (property, value) {
      return Hash.prototype.set.call(this, property, value);
    },

    set: (property, value) => {
      throw 'Properties of Element.Layout are read-only.';
    },

    get: function ($super, property) {
      const value = $super(property);
      return value === null ? this._compute(property) : value;
    },

    _begin: function () {
      if (this._isPrepared()) return;

      const element = this.element;
      if (isDisplayed(element)) {
        this._setPrepared(true);
        return;
      }

      const originalStyles = {
        position: element.style.position || '',
        width: element.style.width || '',
        visibility: element.style.visibility || '',
        display: element.style.display || ''
      };

      element.store('prototype_original_styles', originalStyles);

      const position = getRawStyle(element, 'position');
      let width = element.offsetWidth;

      if (width === 0 || width === null) {
        element.style.display = 'block';
        width = element.offsetWidth;
      }

      const context =
        position === 'fixed' ? document.viewport : element.parentNode;

      const tempStyles = {
        visibility: 'hidden',
        display: 'block'
      };

      if (position !== 'fixed') tempStyles.position = 'absolute';

      element.setStyle(tempStyles);

      const positionedWidth = element.offsetWidth;
      let newWidth;
      if (width && positionedWidth === width) {
        newWidth = getContentWidth(element, context);
      } else if (position === 'absolute' || position === 'fixed') {
        newWidth = getContentWidth(element, context);
      } else {
        var parent = element.parentNode,
          pLayout = $(parent).getLayout();

        newWidth =
          pLayout.get('width') -
          this.get('margin-left') -
          this.get('border-left') -
          this.get('padding-left') -
          this.get('padding-right') -
          this.get('border-right') -
          this.get('margin-right');
      }

      element.setStyle({ width: `${newWidth}px` });

      this._setPrepared(true);
    },

    _end: function () {
      const element = this.element;
      const originalStyles = element.retrieve('prototype_original_styles');
      element.store('prototype_original_styles', null);
      element.setStyle(originalStyles);
      this._setPrepared(false);
    },

    _compute: function (property) {
      const COMPUTATIONS = Element.Layout.COMPUTATIONS;
      if (!(property in COMPUTATIONS)) {
        throw 'Property not found.';
      }

      return this._set(
        property,
        COMPUTATIONS[property].call(this, this.element)
      );
    },

    _isPrepared: function () {
      return this.element.retrieve('prototype_element_layout_prepared', false);
    },

    _setPrepared: function (bool) {
      return this.element.store('prototype_element_layout_prepared', bool);
    },

    toObject: function () {
      const args = $A(arguments);
      const keys =
        args.length === 0
          ? Element.Layout.PROPERTIES
          : args.join(' ').split(' ');
      const obj = {};
      keys.each(function (key) {
        if (!Element.Layout.PROPERTIES.include(key)) return;
        const value = this.get(key);
        if (value != null) obj[key] = value;
      }, this);
      return obj;
    },

    toHash: function () {
      const obj = this.toObject.apply(this, arguments);
      return new Hash(obj);
    },

    toCSS: function () {
      const args = $A(arguments);
      const keys =
        args.length === 0
          ? Element.Layout.PROPERTIES
          : args.join(' ').split(' ');
      const css = {};

      keys.each(function (key) {
        if (!Element.Layout.PROPERTIES.include(key)) return;
        if (Element.Layout.COMPOSITE_PROPERTIES.include(key)) return;

        const value = this.get(key);
        if (value != null) css[cssNameFor(key)] = `${value}px`;
      }, this);
      return css;
    },

    inspect: () => {
      return '#<Element.Layout>';
    }
  });

  Object.extend(Element.Layout, {
    PROPERTIES: $w(
      'height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height'
    ),

    COMPOSITE_PROPERTIES: $w(
      'padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height'
    ),

    COMPUTATIONS: {
      height: function (element) {
        if (!this._preComputing) this._begin();

        const bHeight = this.get('border-box-height');
        if (bHeight <= 0) {
          if (!this._preComputing) this._end();
          return 0;
        }

        const bTop = this.get('border-top'),
          bBottom = this.get('border-bottom');

        const pTop = this.get('padding-top'),
          pBottom = this.get('padding-bottom');

        if (!this._preComputing) this._end();

        return bHeight - bTop - bBottom - pTop - pBottom;
      },

      width: function (element) {
        if (!this._preComputing) this._begin();

        const bWidth = this.get('border-box-width');
        if (bWidth <= 0) {
          if (!this._preComputing) this._end();
          return 0;
        }

        const bLeft = this.get('border-left'),
          bRight = this.get('border-right');

        const pLeft = this.get('padding-left'),
          pRight = this.get('padding-right');

        if (!this._preComputing) this._end();
        return bWidth - bLeft - bRight - pLeft - pRight;
      },

      'padding-box-height': function (element) {
        const height = this.get('height'),
          pTop = this.get('padding-top'),
          pBottom = this.get('padding-bottom');

        return height + pTop + pBottom;
      },

      'padding-box-width': function (element) {
        const width = this.get('width'),
          pLeft = this.get('padding-left'),
          pRight = this.get('padding-right');

        return width + pLeft + pRight;
      },

      'border-box-height': function (element) {
        if (!this._preComputing) this._begin();
        const height = element.offsetHeight;
        if (!this._preComputing) this._end();
        return height;
      },

      'border-box-width': function (element) {
        if (!this._preComputing) this._begin();
        const width = element.offsetWidth;
        if (!this._preComputing) this._end();
        return width;
      },

      'margin-box-height': function (element) {
        const bHeight = this.get('border-box-height'),
          mTop = this.get('margin-top'),
          mBottom = this.get('margin-bottom');

        if (bHeight <= 0) return 0;

        return bHeight + mTop + mBottom;
      },

      'margin-box-width': function (element) {
        const bWidth = this.get('border-box-width'),
          mLeft = this.get('margin-left'),
          mRight = this.get('margin-right');

        if (bWidth <= 0) return 0;

        return bWidth + mLeft + mRight;
      },

      top: element => {
        const offset = element.positionedOffset();
        return offset.top;
      },

      bottom: function (element) {
        const offset = element.positionedOffset(),
          parent = element.getOffsetParent(),
          pHeight = parent.measure('height');

        const mHeight = this.get('border-box-height');

        return pHeight - mHeight - offset.top;
      },

      left: element => {
        const offset = element.positionedOffset();
        return offset.left;
      },

      right: function (element) {
        const offset = element.positionedOffset(),
          parent = element.getOffsetParent(),
          pWidth = parent.measure('width');

        const mWidth = this.get('border-box-width');

        return pWidth - mWidth - offset.left;
      },

      'padding-top': element => {
        return getPixelValue(element, 'paddingTop');
      },

      'padding-bottom': element => {
        return getPixelValue(element, 'paddingBottom');
      },

      'padding-left': element => {
        return getPixelValue(element, 'paddingLeft');
      },

      'padding-right': element => {
        return getPixelValue(element, 'paddingRight');
      },

      'border-top': element => {
        return getPixelValue(element, 'borderTopWidth');
      },

      'border-bottom': element => {
        return getPixelValue(element, 'borderBottomWidth');
      },

      'border-left': element => {
        return getPixelValue(element, 'borderLeftWidth');
      },

      'border-right': element => {
        return getPixelValue(element, 'borderRightWidth');
      },

      'margin-top': element => {
        return getPixelValue(element, 'marginTop');
      },

      'margin-bottom': element => {
        return getPixelValue(element, 'marginBottom');
      },

      'margin-left': element => {
        return getPixelValue(element, 'marginLeft');
      },

      'margin-right': element => {
        return getPixelValue(element, 'marginRight');
      }
    }
  });

  if ('getBoundingClientRect' in document.documentElement) {
    Object.extend(Element.Layout.COMPUTATIONS, {
      right: element => {
        const parent = hasLayout(element.getOffsetParent());
        const rect = element.getBoundingClientRect(),
          pRect = parent.getBoundingClientRect();

        return (pRect.right - rect.right).round();
      },

      bottom: element => {
        const parent = hasLayout(element.getOffsetParent());
        const rect = element.getBoundingClientRect(),
          pRect = parent.getBoundingClientRect();

        return (pRect.bottom - rect.bottom).round();
      }
    });
  }

  Element.Offset = Class.create({
    initialize: function (left, top) {
      this.left = left.round();
      this.top = top.round();

      this[0] = this.left;
      this[1] = this.top;
    },

    relativeTo: function (offset) {
      return new Element.Offset(this.left - offset.left, this.top - offset.top);
    },

    inspect: function () {
      return '#<Element.Offset left: #{left} top: #{top}>'.interpolate(this);
    },

    toString: function () {
      return '[#{left}, #{top}]'.interpolate(this);
    },

    toArray: function () {
      return [this.left, this.top];
    }
  });

  function getLayout(element, preCompute) {
    return new Element.Layout(element, preCompute);
  }

  function measure(element, property) {
    return $(element).getLayout().get(property);
  }

  function getHeight(element) {
    return Element.getDimensions(element).height;
  }

  function getWidth(element) {
    return Element.getDimensions(element).width;
  }

  function getDimensions(element) {
    element = $(element);
    const display = Element.getStyle(element, 'display');

    if (display && display !== 'none') {
      return { width: element.offsetWidth, height: element.offsetHeight };
    }

    const style = element.style;
    const originalStyles = {
      visibility: style.visibility,
      position: style.position,
      display: style.display
    };

    const newStyles = {
      visibility: 'hidden',
      display: 'block'
    };

    if (originalStyles.position !== 'fixed') newStyles.position = 'absolute';

    Element.setStyle(element, newStyles);

    const dimensions = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };

    Element.setStyle(element, originalStyles);

    return dimensions;
  }

  function getOffsetParent(element) {
    element = $(element);

    function selfOrBody(element) {
      return isHtml(element) ? $(document.body) : $(element);
    }

    if (
      isDocument(element) ||
      isDetached(element) ||
      isBody(element) ||
      isHtml(element)
    )
      return $(document.body);

    const isInline = Element.getStyle(element, 'display') === 'inline';
    if (!isInline && element.offsetParent)
      return selfOrBody(element.offsetParent);

    while ((element = element.parentNode) && element !== document.body) {
      if (Element.getStyle(element, 'position') !== 'static') {
        return selfOrBody(element);
      }
    }

    return $(document.body);
  }

  function cumulativeOffset(element) {
    element = $(element);
    let valueT = 0,
      valueL = 0;
    if (element.parentNode) {
      do {
        valueT += element.offsetTop || 0;
        valueL += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);
    }
    return new Element.Offset(valueL, valueT);
  }

  function positionedOffset(element) {
    element = $(element);

    const layout = element.getLayout();

    let valueT = 0,
      valueL = 0;
    do {
      valueT += element.offsetTop || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (isBody(element)) break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);

    valueL -= layout.get('margin-left');
    valueT -= layout.get('margin-top');

    return new Element.Offset(valueL, valueT);
  }

  function cumulativeScrollOffset(element) {
    let valueT = 0,
      valueL = 0;
    do {
      if (element === document.body) {
        var bodyScrollNode =
          document.documentElement || document.body.parentNode || document.body;
        valueT += !Object.isUndefined(window.pageYOffset)
          ? window.pageYOffset
          : bodyScrollNode.scrollTop || 0;
        valueL += !Object.isUndefined(window.pageXOffset)
          ? window.pageXOffset
          : bodyScrollNode.scrollLeft || 0;
        break;
      } else {
        valueT += element.scrollTop || 0;
        valueL += element.scrollLeft || 0;
        element = element.parentNode;
      }
    } while (element);
    return new Element.Offset(valueL, valueT);
  }

  function viewportOffset(forElement) {
    let valueT = 0;
    let valueL = 0;
    const docBody = document.body;

    forElement = $(forElement);
    let element = forElement;
    do {
      valueT += element.offsetTop || 0;
      valueL += element.offsetLeft || 0;
      if (
        element.offsetParent == docBody &&
        Element.getStyle(element, 'position') == 'absolute'
      )
        break;
    } while ((element = element.offsetParent));

    element = forElement;
    do {
      if (element != docBody) {
        valueT -= element.scrollTop || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while ((element = element.parentNode));
    return new Element.Offset(valueL, valueT);
  }

  function absolutize(element) {
    element = $(element);

    if (Element.getStyle(element, 'position') === 'absolute') {
      return element;
    }

    const offsetParent = getOffsetParent(element);
    const eOffset = element.viewportOffset(),
      pOffset = offsetParent.viewportOffset();

    const offset = eOffset.relativeTo(pOffset);
    const layout = element.getLayout();

    element.store('prototype_absolutize_original_styles', {
      position: element.getStyle('position'),
      left: element.getStyle('left'),
      top: element.getStyle('top'),
      width: element.getStyle('width'),
      height: element.getStyle('height')
    });

    element.setStyle({
      position: 'absolute',
      top: `${offset.top}px`,
      left: `${offset.left}px`,
      width: `${layout.get('width')}px`,
      height: `${layout.get('height')}px`
    });

    return element;
  }

  function relativize(element) {
    element = $(element);
    if (Element.getStyle(element, 'position') === 'relative') {
      return element;
    }

    const originalStyles = element.retrieve(
      'prototype_absolutize_original_styles'
    );

    if (originalStyles) element.setStyle(originalStyles);
    return element;
  }

  function scrollTo(element) {
    element = $(element);
    const pos = Element.cumulativeOffset(element);
    window.scrollTo(pos.left, pos.top);
    return element;
  }

  function makePositioned(element) {
    element = $(element);
    const position = Element.getStyle(element, 'position'),
      styles = {};
    if (position === 'static' || !position) {
      styles.position = 'relative';
      if (Prototype.Browser.Opera) {
        styles.top = 0;
        styles.left = 0;
      }
      Element.setStyle(element, styles);
      Element.store(element, 'prototype_made_positioned', true);
    }
    return element;
  }

  function undoPositioned(element) {
    element = $(element);
    const storage = Element.getStorage(element),
      madePositioned = storage.get('prototype_made_positioned');

    if (madePositioned) {
      storage.unset('prototype_made_positioned');
      Element.setStyle(element, {
        position: '',
        top: '',
        bottom: '',
        left: '',
        right: ''
      });
    }
    return element;
  }

  function makeClipping(element) {
    element = $(element);

    const storage = Element.getStorage(element),
      madeClipping = storage.get('prototype_made_clipping');

    if (Object.isUndefined(madeClipping)) {
      var overflow = Element.getStyle(element, 'overflow');
      storage.set('prototype_made_clipping', overflow);
      if (overflow !== 'hidden') element.style.overflow = 'hidden';
    }

    return element;
  }

  function undoClipping(element) {
    element = $(element);
    const storage = Element.getStorage(element),
      overflow = storage.get('prototype_made_clipping');

    if (!Object.isUndefined(overflow)) {
      storage.unset('prototype_made_clipping');
      element.style.overflow = overflow || '';
    }

    return element;
  }

  function clonePosition(element, source, options) {
    options = Object.extend(
      {
        setLeft: true,
        setTop: true,
        setWidth: true,
        setHeight: true,
        offsetTop: 0,
        offsetLeft: 0
      },
      options || {}
    );

    const docEl = document.documentElement;

    source = $(source);
    element = $(element);
    let p;
    let delta;
    let layout;
    const styles = {};

    if (options.setLeft || options.setTop) {
      p = Element.viewportOffset(source);
      delta = [0, 0];
      if (Element.getStyle(element, 'position') === 'absolute') {
        var parent = Element.getOffsetParent(element);
        if (parent !== document.body) delta = Element.viewportOffset(parent);
      }
    }

    function pageScrollXY() {
      let x = 0,
        y = 0;
      if (Object.isNumber(window.pageXOffset)) {
        x = window.pageXOffset;
        y = window.pageYOffset;
      } else if (
        document.body &&
        (document.body.scrollLeft || document.body.scrollTop)
      ) {
        x = document.body.scrollLeft;
        y = document.body.scrollTop;
      } else if (docEl && (docEl.scrollLeft || docEl.scrollTop)) {
        x = docEl.scrollLeft;
        y = docEl.scrollTop;
      }
      return { x: x, y: y };
    }

    const pageXY = pageScrollXY();

    if (options.setWidth || options.setHeight) {
      layout = Element.getLayout(source);
    }

    if (options.setLeft)
      styles.left = `${p[0] + pageXY.x - delta[0]}${options.offsetLeft}px`;
    if (options.setTop)
      styles.top = `${p[1] + pageXY.y - delta[1]}${options.offsetTop}px`;

    const currentLayout = element.getLayout();

    if (options.setWidth) {
      styles.width = `${layout.get('width')}px`;
    }
    if (options.setHeight) {
      styles.height = `${layout.get('height')}px`;
    }

    return Element.setStyle(element, styles);
  }

  if (Prototype.Browser.IE) {
    getOffsetParent = getOffsetParent.wrap((proceed, element) => {
      element = $(element);

      if (
        isDocument(element) ||
        isDetached(element) ||
        isBody(element) ||
        isHtml(element)
      )
        return $(document.body);

      const position = element.getStyle('position');
      if (position !== 'static') return proceed(element);

      element.setStyle({ position: 'relative' });
      const value = proceed(element);
      element.setStyle({ position: position });
      return value;
    });

    positionedOffset = positionedOffset.wrap((proceed, element) => {
      element = $(element);
      if (!element.parentNode) return new Element.Offset(0, 0);
      const position = element.getStyle('position');
      if (position !== 'static') return proceed(element);

      const offsetParent = element.getOffsetParent();
      if (offsetParent && offsetParent.getStyle('position') === 'fixed')
        hasLayout(offsetParent);

      element.setStyle({ position: 'relative' });
      const value = proceed(element);
      element.setStyle({ position: position });
      return value;
    });
  } else if (Prototype.Browser.Webkit) {
    cumulativeOffset = element => {
      element = $(element);
      let valueT = 0,
        valueL = 0;
      do {
        valueT += element.offsetTop || 0;
        valueL += element.offsetLeft || 0;
        if (element.offsetParent == document.body) {
          if (Element.getStyle(element, 'position') == 'absolute') break;
        }

        element = element.offsetParent;
      } while (element);

      return new Element.Offset(valueL, valueT);
    };
  }

  Element.addMethods({
    getLayout: getLayout,
    measure: measure,
    getWidth: getWidth,
    getHeight: getHeight,
    getDimensions: getDimensions,
    getOffsetParent: getOffsetParent,
    cumulativeOffset: cumulativeOffset,
    positionedOffset: positionedOffset,
    cumulativeScrollOffset: cumulativeScrollOffset,
    viewportOffset: viewportOffset,
    absolutize: absolutize,
    relativize: relativize,
    scrollTo: scrollTo,
    makePositioned: makePositioned,
    undoPositioned: undoPositioned,
    makeClipping: makeClipping,
    undoClipping: undoClipping,
    clonePosition: clonePosition
  });

  function isBody(element) {
    return element.nodeName.toUpperCase() === 'BODY';
  }

  function isHtml(element) {
    return element.nodeName.toUpperCase() === 'HTML';
  }

  function isDocument(element) {
    return element.nodeType === Node.DOCUMENT_NODE;
  }

  function isDetached(element) {
    return (
      element !== document.body && !Element.descendantOf(element, document.body)
    );
  }

  if ('getBoundingClientRect' in document.documentElement) {
    Element.addMethods({
      viewportOffset: element => {
        element = $(element);
        if (isDetached(element)) return new Element.Offset(0, 0);

        const rect = element.getBoundingClientRect(),
          docEl = document.documentElement;
        return new Element.Offset(
          rect.left - docEl.clientLeft,
          rect.top - docEl.clientTop
        );
      }
    });
  }
})();

(() => {
  const IS_OLD_OPERA =
    Prototype.Browser.Opera && window.parseFloat(window.opera.version()) < 9.5;
  let ROOT = null;
  function getRootElement() {
    if (ROOT) return ROOT;
    ROOT = IS_OLD_OPERA ? document.body : document.documentElement;
    return ROOT;
  }

  function getDimensions() {
    return { width: this.getWidth(), height: this.getHeight() };
  }

  function getWidth() {
    return getRootElement().clientWidth;
  }

  function getHeight() {
    return getRootElement().clientHeight;
  }

  function getScrollOffsets() {
    const x =
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft;
    const y =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    return new Element.Offset(x, y);
  }

  document.viewport = {
    getDimensions: getDimensions,
    getWidth: getWidth,
    getHeight: getHeight,
    getScrollOffsets: getScrollOffsets
  };
})();
window.$$ = function () {
  const expression = $A(arguments).join(', ');
  return Prototype.Selector.select(expression, document);
};

Prototype.Selector = (() => {
  function select() {
    throw new Error('Method "Prototype.Selector.select" must be defined.');
  }

  function match() {
    throw new Error('Method "Prototype.Selector.match" must be defined.');
  }

  function find(elements, expression, index) {
    index = index || 0;
    const match = Prototype.Selector.match;
    const length = elements.length;
    let matchIndex = 0;
    let i;

    for (i = 0; i < length; i++) {
      if (match(elements[i], expression) && index == matchIndex++) {
        return Element.extend(elements[i]);
      }
    }
  }

  function extendElements(elements) {
    for (var i = 0, length = elements.length; i < length; i++) {
      Element.extend(elements[i]);
    }
    return elements;
  }

  const K = Prototype.K;

  return {
    select: select,
    match: match,
    find: find,
    extendElements: Element.extend === K ? K : extendElements,
    extendElement: Element.extend
  };
})();
Prototype._original_property = window.Sizzle;

(() => {
  function fakeDefine(fn) {
    Prototype._actual_sizzle = fn();
  }
  fakeDefine.amd = true;

  if (typeof define !== 'undefined' && define.amd) {
    Prototype._original_define = define;
    Prototype._actual_sizzle = null;
    window.define = fakeDefine;
  }
})();

/*!
 * Sizzle CSS Selector Engine v1.10.18
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-02-05
 */
(window => {
  let i;
  let support;
  let Expr;
  let getText;
  let isXML;
  let compile;
  let select;
  let outermostContext;
  let sortInput;
  let hasDuplicate;
  let setDocument;
  let document;
  let docElem;
  let documentIsHTML;
  let rbuggyQSA;
  let rbuggyMatches;
  let matches;
  let contains;
  const expando = `sizzle${-new Date()}`;
  const preferredDoc = window.document;
  let dirruns = 0;
  let done = 0;
  const classCache = createCache();
  const tokenCache = createCache();
  const compilerCache = createCache();

  let sortOrder = (a, b) => {
    if (a === b) {
      hasDuplicate = true;
    }
    return 0;
  };

  const strundefined = typeof undefined;
  const MAX_NEGATIVE = 1 << 31;
  const hasOwn = {}.hasOwnProperty;
  let arr = [];
  const pop = arr.pop;
  const push_native = arr.push;
  let push = arr.push;
  const slice = arr.slice;

  const indexOf =
    arr.indexOf ||
    function (elem) {
      let i = 0;
      const len = this.length;
      for (; i < len; i++) {
        if (this[i] === elem) {
          return i;
        }
      }
      return -1;
    };

  const booleans =
    'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped';

  const whitespace = '[\\x20\\t\\r\\n\\f]';
  const characterEncoding = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+';
  const identifier = characterEncoding.replace('w', 'w#');

  const attributes = `\\[${whitespace}*(${characterEncoding})${whitespace}*(?:([*^$|!~]?=)${whitespace}*(?:(['"])((?:\\\\.|[^\\\\])*?)\\3|(${identifier})|)|)${whitespace}*\\]`;

  const pseudos = `:(${characterEncoding})(?:\\(((['"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|${attributes.replace(3, 8)})*)|.*)\\)|)`;

  const rtrim = new RegExp(
    `^${whitespace}+|((?:^|[^\\\\])(?:\\\\.)*)${whitespace}+$`,
    'g'
  );

  const rcomma = new RegExp(`^${whitespace}*,${whitespace}*`);

  const rcombinators = new RegExp(
    `^${whitespace}*([>+~]|${whitespace})${whitespace}*`
  );

  const rattributeQuotes = new RegExp(
    `=${whitespace}*([^\\]'"]*?)${whitespace}*\\]`,
    'g'
  );

  const rpseudo = new RegExp(pseudos);
  const ridentifier = new RegExp(`^${identifier}$`);

  const matchExpr = {
    ID: new RegExp(`^#(${characterEncoding})`),
    CLASS: new RegExp(`^\\.(${characterEncoding})`),
    TAG: new RegExp(`^(${characterEncoding.replace('w', 'w*')})`),
    ATTR: new RegExp(`^${attributes}`),
    PSEUDO: new RegExp(`^${pseudos}`),
    CHILD: new RegExp(
      `^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(${whitespace}*(even|odd|(([+-]|)(\\d*)n|)${whitespace}*(?:([+-]|)${whitespace}*(\\d+)|))${whitespace}*\\)|)`,
      'i'
    ),
    bool: new RegExp(`^(?:${booleans})$`, 'i'),
    needsContext: new RegExp(
      `^${whitespace}*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(${whitespace}*((?:-\\d)?\\d*)${whitespace}*\\)|)(?=[^-]|$)`,
      'i'
    )
  };

  const rinputs = /^(?:input|select|textarea|button)$/i;
  const rheader = /^h\d$/i;
  const rnative = /^[^{]+\{\s*\[native \w/;
  const rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
  const rsibling = /[+~]/;
  const rescape = /'|\\/g;

  const runescape = new RegExp(
    `\\\\([\\da-f]{1,6}${whitespace}?|(${whitespace})|.)`,
    'ig'
  );

  const funescape = (_, escaped, escapedWhitespace) => {
    const high = `0x${escaped}` - 0x10000;
    return high !== high || escapedWhitespace
      ? escaped
      : high < 0
        ? String.fromCharCode(high + 0x10000)
        : String.fromCharCode((high >> 10) | 0xd800, (high & 0x3ff) | 0xdc00);
  };

  try {
    push.apply(
      (arr = slice.call(preferredDoc.childNodes)),
      preferredDoc.childNodes
    );
    arr[preferredDoc.childNodes.length].nodeType;
  } catch (e) {
    push = {
      apply: arr.length
        ? (target, els) => {
            push_native.apply(target, slice.call(els));
          }
        : (target, els) => {
            let j = target.length,
              i = 0;
            while ((target[j++] = els[i++])) {}
            target.length = j - 1;
          }
    };
  }

  function Sizzle(selector, context, results, seed) {
    let match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;

    if (
      (context ? context.ownerDocument || context : preferredDoc) !== document
    ) {
      setDocument(context);
    }

    context = context || document;
    results = results || [];

    if (!selector || typeof selector !== 'string') {
      return results;
    }

    if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
      return [];
    }

    if (documentIsHTML && !seed) {
      if ((match = rquickExpr.exec(selector))) {
        if ((m = match[1])) {
          if (nodeType === 9) {
            elem = context.getElementById(m);
            if (elem && elem.parentNode) {
              if (elem.id === m) {
                results.push(elem);
                return results;
              }
            } else {
              return results;
            }
          } else {
            if (
              context.ownerDocument &&
              (elem = context.ownerDocument.getElementById(m)) &&
              contains(context, elem) &&
              elem.id === m
            ) {
              results.push(elem);
              return results;
            }
          }
        } else if (match[2]) {
          push.apply(results, context.getElementsByTagName(selector));
          return results;
        } else if (
          (m = match[3]) &&
          support.getElementsByClassName &&
          context.getElementsByClassName
        ) {
          push.apply(results, context.getElementsByClassName(m));
          return results;
        }
      }

      if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
        nid = old = expando;
        newContext = context;
        newSelector = nodeType === 9 && selector;

        if (nodeType === 1 && context.nodeName.toLowerCase() !== 'object') {
          groups = tokenize(selector);

          if ((old = context.getAttribute('id'))) {
            nid = old.replace(rescape, '\\$&');
          } else {
            context.setAttribute('id', nid);
          }
          nid = `[id='${nid}'] `;

          i = groups.length;
          while (i--) {
            groups[i] = nid + toSelector(groups[i]);
          }
          newContext =
            (rsibling.test(selector) && testContext(context.parentNode)) ||
            context;
          newSelector = groups.join(',');
        }

        if (newSelector) {
          try {
            push.apply(results, newContext.querySelectorAll(newSelector));
            return results;
          } catch (qsaError) {
          } finally {
            if (!old) {
              context.removeAttribute('id');
            }
          }
        }
      }
    }

    return select(selector.replace(rtrim, '$1'), context, results, seed);
  }

  /**
   * Create key-value caches of limited size
   * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
   *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *  deleting the oldest entry
   */
  function createCache() {
    const keys = [];

    function cache(key, value) {
      if (keys.push(`${key} `) > Expr.cacheLength) {
        delete cache[keys.shift()];
      }
      return (cache[`${key} `] = value);
    }
    return cache;
  }

  /**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
  function markFunction(fn) {
    fn[expando] = true;
    return fn;
  }

  /**
   * Support testing using an element
   * @param {Function} fn Passed the created div and expects a boolean result
   */
  function assert(fn) {
    let div = document.createElement('div');

    try {
      return !!fn(div);
    } catch (e) {
      return false;
    } finally {
      if (div.parentNode) {
        div.parentNode.removeChild(div);
      }
      div = null;
    }
  }

  /**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
  function addHandle(attrs, handler) {
    const arr = attrs.split('|');
    let i = attrs.length;

    while (i--) {
      Expr.attrHandle[arr[i]] = handler;
    }
  }

  /**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
  function siblingCheck(a, b) {
    let cur = b && a;

    const diff =
      cur &&
      a.nodeType === 1 &&
      b.nodeType === 1 &&
      (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);

    if (diff) {
      return diff;
    }

    if (cur) {
      while ((cur = cur.nextSibling)) {
        if (cur === b) {
          return -1;
        }
      }
    }

    return a ? 1 : -1;
  }

  /**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
  function createInputPseudo(type) {
    return elem => {
      const name = elem.nodeName.toLowerCase();
      return name === 'input' && elem.type === type;
    };
  }

  /**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
  function createButtonPseudo(type) {
    return elem => {
      const name = elem.nodeName.toLowerCase();
      return (name === 'input' || name === 'button') && elem.type === type;
    };
  }

  /**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
  function createPositionalPseudo(fn) {
    return markFunction(argument => {
      argument = +argument;
      return markFunction((seed, matches) => {
        let j;
        const matchIndexes = fn([], seed.length, argument);
        let i = matchIndexes.length;

        while (i--) {
          if (seed[(j = matchIndexes[i])]) {
            seed[j] = !(matches[j] = seed[j]);
          }
        }
      });
    });
  }

  /**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
  function testContext(context) {
    return (
      context && typeof context.getElementsByTagName !== strundefined && context
    );
  }

  support = Sizzle.support = {};

  /**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
  isXML = Sizzle.isXML = elem => {
    const documentElement =
      elem && (elem.ownerDocument || elem).documentElement;
    return documentElement ? documentElement.nodeName !== 'HTML' : false;
  };

  /**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
  setDocument = Sizzle.setDocument = node => {
    let hasCompare;
    const doc = node ? node.ownerDocument || node : preferredDoc;
    const parent = doc.defaultView;

    if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
      return document;
    }

    document = doc;
    docElem = doc.documentElement;

    documentIsHTML = !isXML(doc);

    if (parent && parent !== parent.top) {
      if (parent.addEventListener) {
        parent.addEventListener(
          'unload',
          () => {
            setDocument();
          },
          false
        );
      } else if (parent.attachEvent) {
        parent.attachEvent('onunload', () => {
          setDocument();
        });
      }
    }

    /* Attributes
  ---------------------------------------------------------------------- */

    support.attributes = assert(div => {
      div.className = 'i';
      return !div.getAttribute('className');
    });

    /* getElement(s)By*
  ---------------------------------------------------------------------- */

    support.getElementsByTagName = assert(div => {
      div.appendChild(doc.createComment(''));
      return !div.getElementsByTagName('*').length;
    });

    support.getElementsByClassName =
      rnative.test(doc.getElementsByClassName) &&
      assert(div => {
        div.innerHTML = "<div class='a'></div><div class='a i'></div>";

        div.firstChild.className = 'i';
        return div.getElementsByClassName('i').length === 2;
      });

    support.getById = assert(div => {
      docElem.appendChild(div).id = expando;
      return !doc.getElementsByName || !doc.getElementsByName(expando).length;
    });

    if (support.getById) {
      Expr.find['ID'] = (id, context) => {
        if (typeof context.getElementById !== strundefined && documentIsHTML) {
          var m = context.getElementById(id);
          return m && m.parentNode ? [m] : [];
        }
      };
      Expr.filter['ID'] = id => {
        const attrId = id.replace(runescape, funescape);
        return elem => {
          return elem.getAttribute('id') === attrId;
        };
      };
    } else {
      delete Expr.find['ID'];

      Expr.filter['ID'] = id => {
        const attrId = id.replace(runescape, funescape);
        return elem => {
          const node =
            typeof elem.getAttributeNode !== strundefined &&
            elem.getAttributeNode('id');
          return node && node.value === attrId;
        };
      };
    }

    Expr.find['TAG'] = support.getElementsByTagName
      ? (tag, context) => {
          if (typeof context.getElementsByTagName !== strundefined) {
            return context.getElementsByTagName(tag);
          }
        }
      : (tag, context) => {
          let elem;
          const tmp = [];
          let i = 0;
          const results = context.getElementsByTagName(tag);

          if (tag === '*') {
            while ((elem = results[i++])) {
              if (elem.nodeType === 1) {
                tmp.push(elem);
              }
            }

            return tmp;
          }
          return results;
        };

    Expr.find['CLASS'] =
      support.getElementsByClassName &&
      ((className, context) => {
        if (
          typeof context.getElementsByClassName !== strundefined &&
          documentIsHTML
        ) {
          return context.getElementsByClassName(className);
        }
      });

    /* QSA/matchesSelector
  ---------------------------------------------------------------------- */

    rbuggyMatches = [];

    rbuggyQSA = [];

    if ((support.qsa = rnative.test(doc.querySelectorAll))) {
      assert(div => {
        div.innerHTML = "<select t=''><option selected=''></option></select>";

        if (div.querySelectorAll("[t^='']").length) {
          rbuggyQSA.push(`[*^$]=${whitespace}*(?:''|"")`);
        }

        if (!div.querySelectorAll('[selected]').length) {
          rbuggyQSA.push(`\\[${whitespace}*(?:value|${booleans})`);
        }

        if (!div.querySelectorAll(':checked').length) {
          rbuggyQSA.push(':checked');
        }
      });

      assert(div => {
        const input = doc.createElement('input');
        input.setAttribute('type', 'hidden');
        div.appendChild(input).setAttribute('name', 'D');

        if (div.querySelectorAll('[name=d]').length) {
          rbuggyQSA.push(`name${whitespace}*[*^$|!~]?=`);
        }

        if (!div.querySelectorAll(':enabled').length) {
          rbuggyQSA.push(':enabled', ':disabled');
        }

        div.querySelectorAll('*,:x');
        rbuggyQSA.push(',.*:');
      });
    }

    if (
      (support.matchesSelector = rnative.test(
        (matches =
          docElem.webkitMatchesSelector ||
          docElem.mozMatchesSelector ||
          docElem.oMatchesSelector ||
          docElem.msMatchesSelector)
      ))
    ) {
      assert(div => {
        support.disconnectedMatch = matches.call(div, 'div');

        matches.call(div, "[s!='']:x");
        rbuggyMatches.push('!=', pseudos);
      });
    }

    rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));
    rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'));

    /* Contains
  ---------------------------------------------------------------------- */
    hasCompare = rnative.test(docElem.compareDocumentPosition);

    contains =
      hasCompare || rnative.test(docElem.contains)
        ? (a, b) => {
            const adown = a.nodeType === 9 ? a.documentElement : a,
              bup = b && b.parentNode;
            return (
              a === bup ||
              !!(
                bup &&
                bup.nodeType === 1 &&
                (adown.contains
                  ? adown.contains(bup)
                  : a.compareDocumentPosition &&
                    a.compareDocumentPosition(bup) & 16)
              )
            );
          }
        : (a, b) => {
            if (b) {
              while ((b = b.parentNode)) {
                if (b === a) {
                  return true;
                }
              }
            }
            return false;
          };

    /* Sorting
  ---------------------------------------------------------------------- */

    sortOrder = hasCompare
      ? (a, b) => {
          if (a === b) {
            hasDuplicate = true;
            return 0;
          }

          let compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
          if (compare) {
            return compare;
          }

          compare =
            (a.ownerDocument || a) === (b.ownerDocument || b)
              ? a.compareDocumentPosition(b)
              : 1;

          if (
            compare & 1 ||
            (!support.sortDetached && b.compareDocumentPosition(a) === compare)
          ) {
            if (
              a === doc ||
              (a.ownerDocument === preferredDoc && contains(preferredDoc, a))
            ) {
              return -1;
            }
            if (
              b === doc ||
              (b.ownerDocument === preferredDoc && contains(preferredDoc, b))
            ) {
              return 1;
            }

            return sortInput
              ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b)
              : 0;
          }

          return compare & 4 ? -1 : 1;
        }
      : (a, b) => {
          if (a === b) {
            hasDuplicate = true;
            return 0;
          }

          let cur;
          let i = 0;
          const aup = a.parentNode;
          const bup = b.parentNode;
          const ap = [a];
          const bp = [b];

          if (!aup || !bup) {
            return a === doc
              ? -1
              : b === doc
                ? 1
                : aup
                  ? -1
                  : bup
                    ? 1
                    : sortInput
                      ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b)
                      : 0;
          } else if (aup === bup) {
            return siblingCheck(a, b);
          }

          cur = a;
          while ((cur = cur.parentNode)) {
            ap.unshift(cur);
          }
          cur = b;
          while ((cur = cur.parentNode)) {
            bp.unshift(cur);
          }

          while (ap[i] === bp[i]) {
            i++;
          }

          return i
            ? siblingCheck(ap[i], bp[i])
            : ap[i] === preferredDoc
              ? -1
              : bp[i] === preferredDoc
                ? 1
                : 0;
        };

    return doc;
  };

  Sizzle.matches = (expr, elements) => {
    return Sizzle(expr, null, null, elements);
  };

  Sizzle.matchesSelector = (elem, expr) => {
    if ((elem.ownerDocument || elem) !== document) {
      setDocument(elem);
    }

    expr = expr.replace(rattributeQuotes, "='$1']");

    if (
      support.matchesSelector &&
      documentIsHTML &&
      (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
      (!rbuggyQSA || !rbuggyQSA.test(expr))
    ) {
      try {
        var ret = matches.call(elem, expr);

        if (
          ret ||
          support.disconnectedMatch ||
          (elem.document && elem.document.nodeType !== 11)
        ) {
          return ret;
        }
      } catch (e) {}
    }

    return Sizzle(expr, document, null, [elem]).length > 0;
  };

  Sizzle.contains = (context, elem) => {
    if ((context.ownerDocument || context) !== document) {
      setDocument(context);
    }
    return contains(context, elem);
  };

  Sizzle.attr = (elem, name) => {
    if ((elem.ownerDocument || elem) !== document) {
      setDocument(elem);
    }

    const fn = Expr.attrHandle[name.toLowerCase()];

    let val =
      fn && hasOwn.call(Expr.attrHandle, name.toLowerCase())
        ? fn(elem, name, !documentIsHTML)
        : undefined;

    return val !== undefined
      ? val
      : support.attributes || !documentIsHTML
        ? elem.getAttribute(name)
        : (val = elem.getAttributeNode(name)) && val.specified
          ? val.value
          : null;
  };

  Sizzle.error = msg => {
    throw new Error(`Syntax error, unrecognized expression: ${msg}`);
  };

  /**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
  Sizzle.uniqueSort = results => {
    let elem;
    const duplicates = [];
    let j = 0;
    let i = 0;

    hasDuplicate = !support.detectDuplicates;
    sortInput = !support.sortStable && results.slice(0);
    results.sort(sortOrder);

    if (hasDuplicate) {
      while ((elem = results[i++])) {
        if (elem === results[i]) {
          j = duplicates.push(i);
        }
      }
      while (j--) {
        results.splice(duplicates[j], 1);
      }
    }

    sortInput = null;

    return results;
  };

  /**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
  getText = Sizzle.getText = elem => {
    let node;
    let ret = '';
    let i = 0;
    const nodeType = elem.nodeType;

    if (!nodeType) {
      while ((node = elem[i++])) {
        ret += getText(node);
      }
    } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
      if (typeof elem.textContent === 'string') {
        return elem.textContent;
      } else {
        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
          ret += getText(elem);
        }
      }
    } else if (nodeType === 3 || nodeType === 4) {
      return elem.nodeValue;
    }

    return ret;
  };

  Expr = Sizzle.selectors = {
    cacheLength: 50,

    createPseudo: markFunction,

    match: matchExpr,

    attrHandle: {},

    find: {},

    relative: {
      '>': { dir: 'parentNode', first: true },
      ' ': { dir: 'parentNode' },
      '+': { dir: 'previousSibling', first: true },
      '~': { dir: 'previousSibling' }
    },

    preFilter: {
      ATTR: match => {
        match[1] = match[1].replace(runescape, funescape);

        match[3] = (match[4] || match[5] || '').replace(runescape, funescape);

        if (match[2] === '~=') {
          match[3] = ` ${match[3]} `;
        }

        return match.slice(0, 4);
      },

      CHILD: match => {
        /* matches from matchExpr["CHILD"]
        1 type (only|nth|...)
        2 what (child|of-type)
        3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
        4 xn-component of xn+y argument ([+-]?\d*n|)
        5 sign of xn-component
        6 x of xn-component
        7 sign of y-component
        8 y of y-component
      */
        match[1] = match[1].toLowerCase();

        if (match[1].slice(0, 3) === 'nth') {
          if (!match[3]) {
            Sizzle.error(match[0]);
          }

          match[4] = +(match[4]
            ? match[5] + (match[6] || 1)
            : 2 * (match[3] === 'even' || match[3] === 'odd'));
          match[5] = +(match[7] + match[8] || match[3] === 'odd');
        } else if (match[3]) {
          Sizzle.error(match[0]);
        }

        return match;
      },

      PSEUDO: match => {
        let excess;
        const unquoted = !match[5] && match[2];

        if (matchExpr['CHILD'].test(match[0])) {
          return null;
        }

        if (match[3] && match[4] !== undefined) {
          match[2] = match[4];
        } else if (
          unquoted &&
          rpseudo.test(unquoted) &&
          (excess = tokenize(unquoted, true)) &&
          (excess =
            unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)
        ) {
          match[0] = match[0].slice(0, excess);
          match[2] = unquoted.slice(0, excess);
        }

        return match.slice(0, 3);
      }
    },

    filter: {
      TAG: nodeNameSelector => {
        const nodeName = nodeNameSelector
          .replace(runescape, funescape)
          .toLowerCase();
        return nodeNameSelector === '*'
          ? () => {
              return true;
            }
          : elem => {
              return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
            };
      },

      CLASS: className => {
        let pattern = classCache[`${className} `];

        return (
          pattern ||
          ((pattern = new RegExp(
            `(^|${whitespace})${className}(${whitespace}|$)`
          )) &&
            classCache(className, elem => {
              return pattern.test(
                (typeof elem.className === 'string' && elem.className) ||
                  (typeof elem.getAttribute !== strundefined &&
                    elem.getAttribute('class')) ||
                  ''
              );
            }))
        );
      },

      ATTR: (name, operator, check) => {
        return elem => {
          let result = Sizzle.attr(elem, name);

          if (result == null) {
            return operator === '!=';
          }
          if (!operator) {
            return true;
          }

          result += '';

          return operator === '='
            ? result === check
            : operator === '!='
              ? result !== check
              : operator === '^='
                ? check && result.indexOf(check) === 0
                : operator === '*='
                  ? check && result.indexOf(check) > -1
                  : operator === '$='
                    ? check && result.slice(-check.length) === check
                    : operator === '~='
                      ? ` ${result} `.indexOf(check) > -1
                      : operator === '|='
                        ? result === check ||
                          result.slice(0, check.length + 1) === `${check}-`
                        : false;
        };
      },

      CHILD: (type, what, argument, first, last) => {
        const simple = type.slice(0, 3) !== 'nth',
          forward = type.slice(-4) !== 'last',
          ofType = what === 'of-type';

        return first === 1 && last === 0
          ? elem => {
              return !!elem.parentNode;
            }
          : (elem, context, xml) => {
              let cache;
              let outerCache;
              let node;
              let diff;
              let nodeIndex;
              let start;
              let dir = simple !== forward ? 'nextSibling' : 'previousSibling';
              const parent = elem.parentNode;
              const name = ofType && elem.nodeName.toLowerCase();
              const useCache = !xml && !ofType;

              if (parent) {
                if (simple) {
                  while (dir) {
                    node = elem;
                    while ((node = node[dir])) {
                      if (
                        ofType
                          ? node.nodeName.toLowerCase() === name
                          : node.nodeType === 1
                      ) {
                        return false;
                      }
                    }
                    start = dir = type === 'only' && !start && 'nextSibling';
                  }
                  return true;
                }

                start = [forward ? parent.firstChild : parent.lastChild];

                if (forward && useCache) {
                  outerCache = parent[expando] || (parent[expando] = {});
                  cache = outerCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = cache[0] === dirruns && cache[2];
                  node = nodeIndex && parent.childNodes[nodeIndex];

                  while (
                    (node =
                      (++nodeIndex && node && node[dir]) ||
                      (diff = nodeIndex = 0) ||
                      start.pop())
                  ) {
                    if (node.nodeType === 1 && ++diff && node === elem) {
                      outerCache[type] = [dirruns, nodeIndex, diff];
                      break;
                    }
                  }
                } else if (
                  useCache &&
                  (cache = (elem[expando] || (elem[expando] = {}))[type]) &&
                  cache[0] === dirruns
                ) {
                  diff = cache[1];
                } else {
                  while (
                    (node =
                      (++nodeIndex && node && node[dir]) ||
                      (diff = nodeIndex = 0) ||
                      start.pop())
                  ) {
                    if (
                      (ofType
                        ? node.nodeName.toLowerCase() === name
                        : node.nodeType === 1) &&
                      ++diff
                    ) {
                      if (useCache) {
                        (node[expando] || (node[expando] = {}))[type] = [
                          dirruns,
                          diff
                        ];
                      }

                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }

                diff -= last;
                return (
                  diff === first || (diff % first === 0 && diff / first >= 0)
                );
              }
            };
      },

      PSEUDO: (pseudo, argument) => {
        let args;

        const fn =
          Expr.pseudos[pseudo] ||
          Expr.setFilters[pseudo.toLowerCase()] ||
          Sizzle.error(`unsupported pseudo: ${pseudo}`);

        if (fn[expando]) {
          return fn(argument);
        }

        if (fn.length > 1) {
          args = [pseudo, pseudo, '', argument];
          return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())
            ? markFunction((seed, matches) => {
                let idx;
                const matched = fn(seed, argument);
                let i = matched.length;
                while (i--) {
                  idx = indexOf.call(seed, matched[i]);
                  seed[idx] = !(matches[idx] = matched[i]);
                }
              })
            : elem => {
                return fn(elem, 0, args);
              };
        }

        return fn;
      }
    },

    pseudos: {
      not: markFunction(selector => {
        const input = [],
          results = [],
          matcher = compile(selector.replace(rtrim, '$1'));

        return matcher[expando]
          ? markFunction((seed, matches, context, xml) => {
              let elem;
              const unmatched = matcher(seed, null, xml, []);
              let i = seed.length;

              while (i--) {
                if ((elem = unmatched[i])) {
                  seed[i] = !(matches[i] = elem);
                }
              }
            })
          : (elem, context, xml) => {
              input[0] = elem;
              matcher(input, null, xml, results);
              return !results.pop();
            };
      }),

      has: markFunction(selector => {
        return elem => {
          return Sizzle(selector, elem).length > 0;
        };
      }),

      contains: markFunction(text => {
        return elem => {
          return (
            (elem.textContent || elem.innerText || getText(elem)).indexOf(
              text
            ) > -1
          );
        };
      }),

      lang: markFunction(lang => {
        if (!ridentifier.test(lang || '')) {
          Sizzle.error(`unsupported lang: ${lang}`);
        }
        lang = lang.replace(runescape, funescape).toLowerCase();
        return elem => {
          let elemLang;
          do {
            if (
              (elemLang = documentIsHTML
                ? elem.lang
                : elem.getAttribute('xml:lang') || elem.getAttribute('lang'))
            ) {
              elemLang = elemLang.toLowerCase();
              return elemLang === lang || elemLang.indexOf(`${lang}-`) === 0;
            }
          } while ((elem = elem.parentNode) && elem.nodeType === 1);
          return false;
        };
      }),

      target: elem => {
        const hash = window.location && window.location.hash;
        return hash && hash.slice(1) === elem.id;
      },

      root: elem => {
        return elem === docElem;
      },

      focus: elem => {
        return (
          elem === document.activeElement &&
          (!document.hasFocus || document.hasFocus()) &&
          !!(elem.type || elem.href || ~elem.tabIndex)
        );
      },

      enabled: elem => {
        return elem.disabled === false;
      },

      disabled: elem => {
        return elem.disabled === true;
      },

      checked: elem => {
        const nodeName = elem.nodeName.toLowerCase();
        return (
          (nodeName === 'input' && !!elem.checked) ||
          (nodeName === 'option' && !!elem.selected)
        );
      },

      selected: elem => {
        if (elem.parentNode) {
          elem.parentNode.selectedIndex;
        }

        return elem.selected === true;
      },

      empty: elem => {
        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
          if (elem.nodeType < 6) {
            return false;
          }
        }
        return true;
      },

      parent: elem => {
        return !Expr.pseudos['empty'](elem);
      },

      header: elem => {
        return rheader.test(elem.nodeName);
      },

      input: elem => {
        return rinputs.test(elem.nodeName);
      },

      button: elem => {
        const name = elem.nodeName.toLowerCase();
        return (
          (name === 'input' && elem.type === 'button') || name === 'button'
        );
      },

      text: elem => {
        let attr;
        return (
          elem.nodeName.toLowerCase() === 'input' &&
          elem.type === 'text' &&
          ((attr = elem.getAttribute('type')) == null ||
            attr.toLowerCase() === 'text')
        );
      },

      first: createPositionalPseudo(() => {
        return [0];
      }),

      last: createPositionalPseudo((matchIndexes, length) => {
        return [length - 1];
      }),

      eq: createPositionalPseudo((matchIndexes, length, argument) => {
        return [argument < 0 ? argument + length : argument];
      }),

      even: createPositionalPseudo((matchIndexes, length) => {
        let i = 0;
        for (; i < length; i += 2) {
          matchIndexes.push(i);
        }
        return matchIndexes;
      }),

      odd: createPositionalPseudo((matchIndexes, length) => {
        let i = 1;
        for (; i < length; i += 2) {
          matchIndexes.push(i);
        }
        return matchIndexes;
      }),

      lt: createPositionalPseudo((matchIndexes, length, argument) => {
        let i = argument < 0 ? argument + length : argument;
        for (; --i >= 0; ) {
          matchIndexes.push(i);
        }
        return matchIndexes;
      }),

      gt: createPositionalPseudo((matchIndexes, length, argument) => {
        let i = argument < 0 ? argument + length : argument;
        for (; ++i < length; ) {
          matchIndexes.push(i);
        }
        return matchIndexes;
      })
    }
  };

  Expr.pseudos['nth'] = Expr.pseudos['eq'];

  for (i in {
    radio: true,
    checkbox: true,
    file: true,
    password: true,
    image: true
  }) {
    Expr.pseudos[i] = createInputPseudo(i);
  }
  for (i in { submit: true, reset: true }) {
    Expr.pseudos[i] = createButtonPseudo(i);
  }

  function setFilters() {}
  setFilters.prototype = Expr.filters = Expr.pseudos;
  Expr.setFilters = new setFilters();

  function tokenize(selector, parseOnly) {
    let matched;
    let match;
    let tokens;
    let type;
    let soFar;
    let groups;
    let preFilters;
    const cached = tokenCache[`${selector} `];

    if (cached) {
      return parseOnly ? 0 : cached.slice(0);
    }

    soFar = selector;
    groups = [];
    preFilters = Expr.preFilter;

    while (soFar) {
      if (!matched || (match = rcomma.exec(soFar))) {
        if (match) {
          soFar = soFar.slice(match[0].length) || soFar;
        }
        groups.push((tokens = []));
      }

      matched = false;

      if ((match = rcombinators.exec(soFar))) {
        matched = match.shift();
        tokens.push({
          value: matched,
          type: match[0].replace(rtrim, ' ')
        });
        soFar = soFar.slice(matched.length);
      }

      for (type in Expr.filter) {
        if (
          (match = matchExpr[type].exec(soFar)) &&
          (!preFilters[type] || (match = preFilters[type](match)))
        ) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: type,
            matches: match
          });
          soFar = soFar.slice(matched.length);
        }
      }

      if (!matched) {
        break;
      }
    }

    return parseOnly
      ? soFar.length
      : soFar
        ? Sizzle.error(selector)
        : tokenCache(selector, groups).slice(0);
  }

  function toSelector(tokens) {
    let i = 0;
    const len = tokens.length;
    let selector = '';
    for (; i < len; i++) {
      selector += tokens[i].value;
    }
    return selector;
  }

  function addCombinator(matcher, combinator, base) {
    const dir = combinator.dir,
      checkNonElements = base && dir === 'parentNode',
      doneName = done++;

    return combinator.first
      ? (elem, context, xml) => {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              return matcher(elem, context, xml);
            }
          }
        }
      : (elem, context, xml) => {
          let oldCache;
          let outerCache;
          const newCache = [dirruns, doneName];

          if (xml) {
            while ((elem = elem[dir])) {
              if (elem.nodeType === 1 || checkNonElements) {
                if (matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          } else {
            while ((elem = elem[dir])) {
              if (elem.nodeType === 1 || checkNonElements) {
                outerCache = elem[expando] || (elem[expando] = {});
                if (
                  (oldCache = outerCache[dir]) &&
                  oldCache[0] === dirruns &&
                  oldCache[1] === doneName
                ) {
                  return (newCache[2] = oldCache[2]);
                } else {
                  outerCache[dir] = newCache;

                  if ((newCache[2] = matcher(elem, context, xml))) {
                    return true;
                  }
                }
              }
            }
          }
        };
  }

  function elementMatcher(matchers) {
    return matchers.length > 1
      ? (elem, context, xml) => {
          let i = matchers.length;
          while (i--) {
            if (!matchers[i](elem, context, xml)) {
              return false;
            }
          }
          return true;
        }
      : matchers[0];
  }

  function multipleContexts(selector, contexts, results) {
    let i = 0;
    const len = contexts.length;
    for (; i < len; i++) {
      Sizzle(selector, contexts[i], results);
    }
    return results;
  }

  function condense(unmatched, map, filter, context, xml) {
    let elem;
    const newUnmatched = [];
    let i = 0;
    const len = unmatched.length;
    const mapped = map != null;

    for (; i < len; i++) {
      if ((elem = unmatched[i])) {
        if (!filter || filter(elem, context, xml)) {
          newUnmatched.push(elem);
          if (mapped) {
            map.push(i);
          }
        }
      }
    }

    return newUnmatched;
  }

  function setMatcher(
    preFilter,
    selector,
    matcher,
    postFilter,
    postFinder,
    postSelector
  ) {
    if (postFilter && !postFilter[expando]) {
      postFilter = setMatcher(postFilter);
    }
    if (postFinder && !postFinder[expando]) {
      postFinder = setMatcher(postFinder, postSelector);
    }
    return markFunction((seed, results, context, xml) => {
      let temp;
      let i;
      let elem;
      const preMap = [];
      const postMap = [];
      const preexisting = results.length;

      const elems =
        seed ||
        multipleContexts(
          selector || '*',
          context.nodeType ? [context] : context,
          []
        );

      const matcherIn =
        preFilter && (seed || !selector)
          ? condense(elems, preMap, preFilter, context, xml)
          : elems;

      let matcherOut = matcher
        ? postFinder || (seed ? preFilter : preexisting || postFilter)
          ? []
          : results
        : matcherIn;

      if (matcher) {
        matcher(matcherIn, matcherOut, context, xml);
      }

      if (postFilter) {
        temp = condense(matcherOut, postMap);
        postFilter(temp, [], context, xml);

        i = temp.length;
        while (i--) {
          if ((elem = temp[i])) {
            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
          }
        }
      }

      if (seed) {
        if (postFinder || preFilter) {
          if (postFinder) {
            temp = [];
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i])) {
                temp.push((matcherIn[i] = elem));
              }
            }
            postFinder(null, (matcherOut = []), temp, xml);
          }

          i = matcherOut.length;
          while (i--) {
            if (
              (elem = matcherOut[i]) &&
              (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1
            ) {
              seed[temp] = !(results[temp] = elem);
            }
          }
        }
      } else {
        matcherOut = condense(
          matcherOut === results
            ? matcherOut.splice(preexisting, matcherOut.length)
            : matcherOut
        );
        if (postFinder) {
          postFinder(null, results, matcherOut, xml);
        } else {
          push.apply(results, matcherOut);
        }
      }
    });
  }

  function matcherFromTokens(tokens) {
    let checkContext;
    let matcher;
    let j;
    const len = tokens.length;
    const leadingRelative = Expr.relative[tokens[0].type];
    const implicitRelative = leadingRelative || Expr.relative[' '];
    let i = leadingRelative ? 1 : 0;

    const matchContext = addCombinator(
      elem => {
        return elem === checkContext;
      },
      implicitRelative,
      true
    );

    const matchAnyContext = addCombinator(
      elem => {
        return indexOf.call(checkContext, elem) > -1;
      },
      implicitRelative,
      true
    );

    let matchers = [
      (elem, context, xml) => {
        return (
          (!leadingRelative && (xml || context !== outermostContext)) ||
          ((checkContext = context).nodeType
            ? matchContext(elem, context, xml)
            : matchAnyContext(elem, context, xml))
        );
      }
    ];

    for (; i < len; i++) {
      if ((matcher = Expr.relative[tokens[i].type])) {
        matchers = [addCombinator(elementMatcher(matchers), matcher)];
      } else {
        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

        if (matcher[expando]) {
          j = ++i;
          for (; j < len; j++) {
            if (Expr.relative[tokens[j].type]) {
              break;
            }
          }
          return setMatcher(
            i > 1 && elementMatcher(matchers),
            i > 1 &&
              toSelector(
                tokens
                  .slice(0, i - 1)
                  .concat({ value: tokens[i - 2].type === ' ' ? '*' : '' })
              ).replace(rtrim, '$1'),
            matcher,
            i < j && matcherFromTokens(tokens.slice(i, j)),
            j < len && matcherFromTokens((tokens = tokens.slice(j))),
            j < len && toSelector(tokens)
          );
        }
        matchers.push(matcher);
      }
    }

    return elementMatcher(matchers);
  }

  function matcherFromGroupMatchers(elementMatchers, setMatchers) {
    const bySet = setMatchers.length > 0,
      byElement = elementMatchers.length > 0,
      superMatcher = (seed, context, xml, results, outermost) => {
        let elem;
        let j;
        let matcher;
        let matchedCount = 0;
        let i = '0';
        const unmatched = seed && [];
        let setMatched = [];
        const contextBackup = outermostContext;
        const elems = seed || (byElement && Expr.find['TAG']('*', outermost));

        const dirrunsUnique = (dirruns +=
          contextBackup == null ? 1 : Math.random() || 0.1);

        const len = elems.length;

        if (outermost) {
          outermostContext = context !== document && context;
        }

        for (; i !== len && (elem = elems[i]) != null; i++) {
          if (byElement && elem) {
            j = 0;
            while ((matcher = elementMatchers[j++])) {
              if (matcher(elem, context, xml)) {
                results.push(elem);
                break;
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
            }
          }

          if (bySet) {
            if ((elem = !matcher && elem)) {
              matchedCount--;
            }

            if (seed) {
              unmatched.push(elem);
            }
          }
        }

        matchedCount += i;
        if (bySet && i !== matchedCount) {
          j = 0;
          while ((matcher = setMatchers[j++])) {
            matcher(unmatched, setMatched, context, xml);
          }

          if (seed) {
            if (matchedCount > 0) {
              while (i--) {
                if (!(unmatched[i] || setMatched[i])) {
                  setMatched[i] = pop.call(results);
                }
              }
            }

            setMatched = condense(setMatched);
          }

          push.apply(results, setMatched);

          if (
            outermost &&
            !seed &&
            setMatched.length > 0 &&
            matchedCount + setMatchers.length > 1
          ) {
            Sizzle.uniqueSort(results);
          }
        }

        if (outermost) {
          dirruns = dirrunsUnique;
          outermostContext = contextBackup;
        }

        return unmatched;
      };

    return bySet ? markFunction(superMatcher) : superMatcher;
  }

  compile = Sizzle.compile = (selector, match /* Internal Use Only */) => {
    let i;
    const setMatchers = [];
    const elementMatchers = [];
    let cached = compilerCache[`${selector} `];

    if (!cached) {
      if (!match) {
        match = tokenize(selector);
      }
      i = match.length;
      while (i--) {
        cached = matcherFromTokens(match[i]);
        if (cached[expando]) {
          setMatchers.push(cached);
        } else {
          elementMatchers.push(cached);
        }
      }

      cached = compilerCache(
        selector,
        matcherFromGroupMatchers(elementMatchers, setMatchers)
      );

      cached.selector = selector;
    }
    return cached;
  };

  /**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
  select = Sizzle.select = (selector, context, results, seed) => {
    let i;
    let tokens;
    let token;
    let type;
    let find;
    const compiled = typeof selector === 'function' && selector;
    const match = !seed && tokenize((selector = compiled.selector || selector));

    results = results || [];

    if (match.length === 1) {
      tokens = match[0] = match[0].slice(0);
      if (
        tokens.length > 2 &&
        (token = tokens[0]).type === 'ID' &&
        support.getById &&
        context.nodeType === 9 &&
        documentIsHTML &&
        Expr.relative[tokens[1].type]
      ) {
        context = (Expr.find['ID'](
          token.matches[0].replace(runescape, funescape),
          context
        ) || [])[0];
        if (!context) {
          return results;
        } else if (compiled) {
          context = context.parentNode;
        }

        selector = selector.slice(tokens.shift().value.length);
      }

      i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length;
      while (i--) {
        token = tokens[i];

        if (Expr.relative[(type = token.type)]) {
          break;
        }
        if ((find = Expr.find[type])) {
          if (
            (seed = find(
              token.matches[0].replace(runescape, funescape),
              (rsibling.test(tokens[0].type) &&
                testContext(context.parentNode)) ||
                context
            ))
          ) {
            tokens.splice(i, 1);
            selector = seed.length && toSelector(tokens);
            if (!selector) {
              push.apply(results, seed);
              return results;
            }

            break;
          }
        }
      }
    }

    (compiled || compile(selector, match))(
      seed,
      context,
      !documentIsHTML,
      results,
      (rsibling.test(selector) && testContext(context.parentNode)) || context
    );
    return results;
  };

  support.sortStable = expando.split('').sort(sortOrder).join('') === expando;

  support.detectDuplicates = !!hasDuplicate;

  setDocument();

  support.sortDetached = assert(div1 => {
    return div1.compareDocumentPosition(document.createElement('div')) & 1;
  });

  if (
    !assert(div => {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute('href') === '#';
    })
  ) {
    addHandle('type|href|height|width', (elem, name, isXML) => {
      if (!isXML) {
        return elem.getAttribute(name, name.toLowerCase() === 'type' ? 1 : 2);
      }
    });
  }

  if (
    !support.attributes ||
    !assert(div => {
      div.innerHTML = '<input/>';
      div.firstChild.setAttribute('value', '');
      return div.firstChild.getAttribute('value') === '';
    })
  ) {
    addHandle('value', (elem, name, isXML) => {
      if (!isXML && elem.nodeName.toLowerCase() === 'input') {
        return elem.defaultValue;
      }
    });
  }

  if (
    !assert(div => {
      return div.getAttribute('disabled') == null;
    })
  ) {
    addHandle(booleans, (elem, name, isXML) => {
      let val;
      if (!isXML) {
        return elem[name] === true
          ? name.toLowerCase()
          : (val = elem.getAttributeNode(name)) && val.specified
            ? val.value
            : null;
      }
    });
  }

  if (typeof define === 'function' && define.amd) {
    define(() => {
      return Sizzle;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sizzle;
  } else {
    window.Sizzle = Sizzle;
  }
})(window);

(() => {
  if (typeof Sizzle !== 'undefined') {
    return;
  }

  if (typeof define !== 'undefined' && define.amd) {
    window.Sizzle = Prototype._actual_sizzle;
    window.define = Prototype._original_define;
    delete Prototype._actual_sizzle;
    delete Prototype._original_define;
  } else if (typeof module !== 'undefined' && module.exports) {
    window.Sizzle = module.exports;
    module.exports = {};
  }
})();

(engine => {
  const extendElements = Prototype.Selector.extendElements;

  function select(selector, scope) {
    return extendElements(engine(selector, scope || document));
  }

  function match(element, selector) {
    return engine.matches(selector, [element]).length == 1;
  }

  Prototype.Selector.engine = engine;
  Prototype.Selector.select = select;
  Prototype.Selector.match = match;
})(Sizzle);

window.Sizzle = Prototype._original_property;
delete Prototype._original_property;

var Form = {
  reset: form => {
    form = $(form);
    form.reset();
    return form;
  },

  serializeElements: (elements, options) => {
    if (typeof options != 'object') options = { hash: !!options };
    else if (Object.isUndefined(options.hash)) options.hash = true;
    let key;
    let value;
    let submitted = false;
    const submit = options.submit;
    let accumulator;
    let initial;

    if (options.hash) {
      initial = {};
      accumulator = (result, key, value) => {
        if (key in result) {
          if (!Object.isArray(result[key])) result[key] = [result[key]];
          result[key] = result[key].concat(value);
        } else result[key] = value;
        return result;
      };
    } else {
      initial = '';
      accumulator = (result, key, values) => {
        if (!Object.isArray(values)) {
          values = [values];
        }
        if (!values.length) {
          return result;
        }
        const encodedKey = encodeURIComponent(key).gsub(/%20/, '+');
        return (
          result +
          (result ? '&' : '') +
          values
            .map(value => {
              value = value.gsub(/(\r)?\n/, '\r\n');
              value = encodeURIComponent(value);
              value = value.gsub(/%20/, '+');
              return `${encodedKey}=${value}`;
            })
            .join('&')
        );
      };
    }

    return elements.inject(initial, (result, element) => {
      if (!element.disabled && element.name) {
        key = element.name;
        value = $(element).getValue();
        if (
          value != null &&
          element.type != 'file' &&
          (element.type != 'submit' ||
            (!submitted &&
              submit !== false &&
              (!submit || key == submit) &&
              (submitted = true)))
        ) {
          result = accumulator(result, key, value);
        }
      }
      return result;
    });
  }
};

Form.Methods = {
  serialize: (form, options) => {
    return Form.serializeElements(Form.getElements(form), options);
  },

  getElements: form => {
    const elements = $(form).getElementsByTagName('*');
    let element;
    const results = [];
    const serializers = Form.Element.Serializers;

    for (var i = 0; (element = elements[i]); i++) {
      if (serializers[element.tagName.toLowerCase()])
        results.push(Element.extend(element));
    }
    return results;
  },

  getInputs: (form, typeName, name) => {
    form = $(form);
    const inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (
      var i = 0, matchingInputs = [], length = inputs.length;
      i < length;
      i++
    ) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: form => {
    form = $(form);
    Form.getElements(form).invoke('disable');
    return form;
  },

  enable: form => {
    form = $(form);
    Form.getElements(form).invoke('enable');
    return form;
  },

  findFirstElement: form => {
    const elements = $(form)
      .getElements()
      .findAll(element => {
        return 'hidden' != element.type && !element.disabled;
      });
    const firstByIndex = elements
      .findAll(element => {
        return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
      })
      .sortBy(element => {
        return element.tabIndex;
      })
      .first();

    return firstByIndex
      ? firstByIndex
      : elements.find(element => {
          return /^(?:input|select|textarea)$/i.test(element.tagName);
        });
  },

  focusFirstElement: form => {
    form = $(form);
    const element = form.findFirstElement();
    if (element) element.activate();
    return form;
  },

  request: (form, options) => {
    ((form = $(form)), (options = Object.clone(options || {})));

    let params = options.parameters,
      action = form.readAttribute('action') || '';
    if (action.blank()) action = window.location.href;
    options.parameters = form.serialize(true);

    if (params) {
      if (Object.isString(params)) params = params.toQueryParams();
      Object.extend(options.parameters, params);
    }

    if (form.hasAttribute('method') && !options.method)
      options.method = form.method;

    return new Ajax.Request(action, options);
  }
};

/*--------------------------------------------------------------------------*/

Form.Element = {
  focus: element => {
    $(element).focus();
    return element;
  },

  select: element => {
    $(element).select();
    return element;
  }
};

Form.Element.Methods = {
  serialize: element => {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = {};
        pair[element.name] = value;
        return Object.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: element => {
    element = $(element);
    const method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  setValue: (element, value) => {
    element = $(element);
    const method = element.tagName.toLowerCase();
    Form.Element.Serializers[method](element, value);
    return element;
  },

  clear: element => {
    $(element).value = '';
    return element;
  },

  present: element => {
    return $(element).value != '';
  },

  activate: element => {
    element = $(element);
    try {
      element.focus();
      if (
        element.select &&
        (element.tagName.toLowerCase() != 'input' ||
          !/^(?:button|reset|submit)$/i.test(element.type))
      )
        element.select();
    } catch (e) {}
    return element;
  },

  disable: element => {
    element = $(element);
    element.disabled = true;
    return element;
  },

  enable: element => {
    element = $(element);
    element.disabled = false;
    return element;
  }
};

/*--------------------------------------------------------------------------*/

var Field = Form.Element;

var $F = Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = (() => {
  function input(element, value) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return inputSelector(element, value);
      default:
        return valueSelector(element, value);
    }
  }

  function inputSelector(element, value) {
    if (Object.isUndefined(value))
      return element.checked ? element.value : null;
    else element.checked = !!value;
  }

  function valueSelector(element, value) {
    if (Object.isUndefined(value)) return element.value;
    else element.value = value;
  }

  function select(element, value) {
    if (Object.isUndefined(value))
      return (element.type === 'select-one' ? selectOne : selectMany)(element);

    let opt;
    let currentValue;
    const single = !Object.isArray(value);
    for (var i = 0, length = element.length; i < length; i++) {
      opt = element.options[i];
      currentValue = this.optionValue(opt);
      if (single) {
        if (currentValue == value) {
          opt.selected = true;
          return;
        }
      } else opt.selected = value.include(currentValue);
    }
  }

  function selectOne(element) {
    const index = element.selectedIndex;
    return index >= 0 ? optionValue(element.options[index]) : null;
  }

  function selectMany(element) {
    const length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(optionValue(opt));
    }
    return values;
  }

  function optionValue(opt) {
    return Element.hasAttribute(opt, 'value') ? opt.value : opt.text;
  }

  return {
    input: input,
    inputSelector: inputSelector,
    textarea: valueSelector,
    select: select,
    selectOne: selectOne,
    selectMany: selectMany,
    optionValue: optionValue,
    button: valueSelector
  };
})();

/*--------------------------------------------------------------------------*/

Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
  initialize: function ($super, element, frequency, callback) {
    $super(callback, frequency);
    this.element = $(element);
    this.lastValue = this.getValue();
  },

  execute: function () {
    const value = this.getValue();
    if (
      Object.isString(this.lastValue) && Object.isString(value)
        ? this.lastValue != value
        : String(this.lastValue) != String(value)
    ) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
});

Form.Element.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function () {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function () {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = Class.create({
  initialize: function (element, callback) {
    this.element = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else this.registerCallback(this.element);
  },

  onElementEvent: function () {
    const value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function () {
    Form.getElements(this.element).each(this.registerCallback, this);
  },

  registerCallback: function (element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
});

Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function () {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function () {
    return Form.serialize(this.element);
  }
});
(GLOBAL => {
  let DIV = document.createElement('div');
  let docEl = document.documentElement;
  const MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED =
    'onmouseenter' in docEl && 'onmouseleave' in docEl;

  const Event = {
    KEY_BACKSPACE: 8,
    KEY_TAB: 9,
    KEY_RETURN: 13,
    KEY_ESC: 27,
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_DELETE: 46,
    KEY_HOME: 36,
    KEY_END: 35,
    KEY_PAGEUP: 33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT: 45
  };

  let isIELegacyEvent = event => {
    return false;
  };

  if (window.attachEvent) {
    if (window.addEventListener) {
      isIELegacyEvent = event => {
        return !(event instanceof window.Event);
      };
    } else {
      isIELegacyEvent = event => {
        return true;
      };
    }
  }

  let _isButton;

  function _isButtonForDOMEvents(event, code) {
    return event.which ? event.which === code + 1 : event.button === code;
  }

  const legacyButtonMap = { 0: 1, 1: 4, 2: 2 };
  function _isButtonForLegacyEvents(event, code) {
    return event.button === legacyButtonMap[code];
  }

  function _isButtonForWebKit(event, code) {
    switch (code) {
      case 0:
        return event.which == 1 && !event.metaKey;
      case 1:
        return event.which == 2 || (event.which == 1 && event.metaKey);
      case 2:
        return event.which == 3;
      default:
        return false;
    }
  }

  if (window.attachEvent) {
    if (!window.addEventListener) {
      _isButton = _isButtonForLegacyEvents;
    } else {
      _isButton = (event, code) => {
        return isIELegacyEvent(event)
          ? _isButtonForLegacyEvents(event, code)
          : _isButtonForDOMEvents(event, code);
      };
    }
  } else if (Prototype.Browser.WebKit) {
    _isButton = _isButtonForWebKit;
  } else {
    _isButton = _isButtonForDOMEvents;
  }

  function isLeftClick(event) {
    return _isButton(event, 0);
  }

  function isMiddleClick(event) {
    return _isButton(event, 1);
  }

  function isRightClick(event) {
    return _isButton(event, 2);
  }

  function element(event) {
    return Element.extend(_element(event));
  }

  function _element(event) {
    event = Event.extend(event);

    let node = event.target;
    const type = event.type;
    const currentTarget = event.currentTarget;

    if (currentTarget && currentTarget.tagName) {
      if (
        type === 'load' ||
        type === 'error' ||
        (type === 'click' &&
          currentTarget.tagName.toLowerCase() === 'input' &&
          currentTarget.type === 'radio')
      )
        node = currentTarget;
    }

    return node.nodeType == Node.TEXT_NODE ? node.parentNode : node;
  }

  function findElement(event, expression) {
    let element = _element(event);
    const selector = Prototype.Selector;
    if (!expression) return Element.extend(element);
    while (element) {
      if (Object.isElement(element) && selector.match(element, expression))
        return Element.extend(element);
      element = element.parentNode;
    }
  }

  function pointer(event) {
    return { x: pointerX(event), y: pointerY(event) };
  }

  function pointerX(event) {
    const docElement = document.documentElement,
      body = document.body || { scrollLeft: 0 };

    return (
      event.pageX ||
      event.clientX +
        (docElement.scrollLeft || body.scrollLeft) -
        (docElement.clientLeft || 0)
    );
  }

  function pointerY(event) {
    const docElement = document.documentElement,
      body = document.body || { scrollTop: 0 };

    return (
      event.pageY ||
      event.clientY +
        (docElement.scrollTop || body.scrollTop) -
        (docElement.clientTop || 0)
    );
  }

  function stop(event) {
    Event.extend(event);
    event.preventDefault();
    event.stopPropagation();

    event.stopped = true;
  }

  Event.Methods = {
    isLeftClick: isLeftClick,
    isMiddleClick: isMiddleClick,
    isRightClick: isRightClick,

    element: element,
    findElement: findElement,

    pointer: pointer,
    pointerX: pointerX,
    pointerY: pointerY,

    stop: stop
  };

  const methods = Object.keys(Event.Methods).inject({}, (m, name) => {
    m[name] = Event.Methods[name].methodize();
    return m;
  });

  if (window.attachEvent) {
    function _relatedTarget(event) {
      let element;
      switch (event.type) {
        case 'mouseover':
        case 'mouseenter':
          element = event.fromElement;
          break;
        case 'mouseout':
        case 'mouseleave':
          element = event.toElement;
          break;
        default:
          return null;
      }
      return Element.extend(element);
    }

    var additionalMethods = {
      stopPropagation: function () {
        this.cancelBubble = true;
      },
      preventDefault: function () {
        this.returnValue = false;
      },
      inspect: () => {
        return '[object Event]';
      }
    };

    Event.extend = (event, element) => {
      if (!event) return false;

      if (!isIELegacyEvent(event)) return event;

      if (event._extendedByPrototype) return event;
      event._extendedByPrototype = Prototype.emptyFunction;

      const pointer = Event.pointer(event);

      Object.extend(event, {
        target: event.srcElement || element,
        relatedTarget: _relatedTarget(event),
        pageX: pointer.x,
        pageY: pointer.y
      });

      Object.extend(event, methods);
      Object.extend(event, additionalMethods);

      return event;
    };
  } else {
    Event.extend = Prototype.K;
  }

  if (window.addEventListener) {
    Event.prototype =
      window.Event.prototype || document.createEvent('HTMLEvents').__proto__;
    Object.extend(Event.prototype, methods);
  }

  const EVENT_TRANSLATIONS = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };

  function getDOMEventName(eventName) {
    return EVENT_TRANSLATIONS[eventName] || eventName;
  }

  if (MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED) getDOMEventName = Prototype.K;

  function getUniqueElementID(element) {
    if (element === window) return 0;

    if (typeof element._prototypeUID === 'undefined')
      element._prototypeUID = Element.Storage.UID++;
    return element._prototypeUID;
  }

  function getUniqueElementID_IE(element) {
    if (element === window) return 0;
    if (element == document) return 1;
    return element.uniqueID;
  }

  if ('uniqueID' in DIV) getUniqueElementID = getUniqueElementID_IE;

  function isCustomEvent(eventName) {
    return eventName.include(':');
  }

  Event._isCustomEvent = isCustomEvent;

  function getOrCreateRegistryFor(element, uid) {
    const CACHE = GLOBAL.Event.cache;
    if (Object.isUndefined(uid)) uid = getUniqueElementID(element);
    if (!CACHE[uid]) CACHE[uid] = { element: element };
    return CACHE[uid];
  }

  function destroyRegistryForElement(element, uid) {
    if (Object.isUndefined(uid)) uid = getUniqueElementID(element);
    delete GLOBAL.Event.cache[uid];
  }

  function register(element, eventName, handler) {
    const registry = getOrCreateRegistryFor(element);
    if (!registry[eventName]) registry[eventName] = [];
    const entries = registry[eventName];

    let i = entries.length;
    while (i--) if (entries[i].handler === handler) return null;

    const uid = getUniqueElementID(element);
    const responder = GLOBAL.Event._createResponder(uid, eventName, handler);
    const entry = {
      responder: responder,
      handler: handler
    };

    entries.push(entry);
    return entry;
  }

  function unregister(element, eventName, handler) {
    const registry = getOrCreateRegistryFor(element);
    const entries = registry[eventName] || [];

    let i = entries.length,
      entry;
    while (i--) {
      if (entries[i].handler === handler) {
        entry = entries[i];
        break;
      }
    }

    if (entry) {
      var index = entries.indexOf(entry);
      entries.splice(index, 1);
    }

    if (entries.length === 0) {
      delete registry[eventName];
      if (Object.keys(registry).length === 1 && 'element' in registry)
        destroyRegistryForElement(element);
    }

    return entry;
  }

  function observe(element, eventName, handler) {
    element = $(element);
    const entry = register(element, eventName, handler);

    if (entry === null) return element;

    const responder = entry.responder;
    if (isCustomEvent(eventName))
      observeCustomEvent(element, eventName, responder);
    else observeStandardEvent(element, eventName, responder);

    return element;
  }

  function observeStandardEvent(element, eventName, responder) {
    const actualEventName = getDOMEventName(eventName);
    if (element.addEventListener) {
      element.addEventListener(actualEventName, responder, false);
    } else {
      element.attachEvent(`on${actualEventName}`, responder);
    }
  }

  function observeCustomEvent(element, eventName, responder) {
    if (element.addEventListener) {
      element.addEventListener('dataavailable', responder, false);
    } else {
      element.attachEvent('ondataavailable', responder);
      element.attachEvent('onlosecapture', responder);
    }
  }

  function stopObserving(element, eventName, handler) {
    element = $(element);
    const handlerGiven = !Object.isUndefined(handler),
      eventNameGiven = !Object.isUndefined(eventName);

    if (!eventNameGiven && !handlerGiven) {
      stopObservingElement(element);
      return element;
    }

    if (!handlerGiven) {
      stopObservingEventName(element, eventName);
      return element;
    }

    const entry = unregister(element, eventName, handler);

    if (!entry) return element;
    removeEvent(element, eventName, entry.responder);
    return element;
  }

  function stopObservingStandardEvent(element, eventName, responder) {
    const actualEventName = getDOMEventName(eventName);
    if (element.removeEventListener) {
      element.removeEventListener(actualEventName, responder, false);
    } else {
      element.detachEvent(`on${actualEventName}`, responder);
    }
  }

  function stopObservingCustomEvent(element, eventName, responder) {
    if (element.removeEventListener) {
      element.removeEventListener('dataavailable', responder, false);
    } else {
      element.detachEvent('ondataavailable', responder);
      element.detachEvent('onlosecapture', responder);
    }
  }

  function stopObservingElement(element) {
    const uid = getUniqueElementID(element),
      registry = GLOBAL.Event.cache[uid];
    if (!registry) return;

    destroyRegistryForElement(element, uid);

    let entries, i;
    for (var eventName in registry) {
      if (eventName === 'element') continue;

      entries = registry[eventName];
      i = entries.length;
      while (i--) removeEvent(element, eventName, entries[i].responder);
    }
  }

  function stopObservingEventName(element, eventName) {
    const registry = getOrCreateRegistryFor(element);
    let entries = registry[eventName];
    if (entries) {
      delete registry[eventName];
    }

    entries = entries || [];

    let i = entries.length;
    while (i--) removeEvent(element, eventName, entries[i].responder);

    for (var name in registry) {
      if (name === 'element') continue;
      return; // There is another registered event
    }

    destroyRegistryForElement(element);
  }

  function removeEvent(element, eventName, handler) {
    if (isCustomEvent(eventName))
      stopObservingCustomEvent(element, eventName, handler);
    else stopObservingStandardEvent(element, eventName, handler);
  }

  function getFireTarget(element) {
    if (element !== document) return element;
    if (document.createEvent && !element.dispatchEvent)
      return document.documentElement;
    return element;
  }

  function fire(element, eventName, memo, bubble) {
    element = getFireTarget($(element));
    if (Object.isUndefined(bubble)) bubble = true;
    memo = memo || {};

    const event = fireEvent(element, eventName, memo, bubble);
    return Event.extend(event);
  }

  function fireEvent_DOM(element, eventName, memo, bubble) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('dataavailable', bubble, true);

    event.eventName = eventName;
    event.memo = memo;

    element.dispatchEvent(event);
    return event;
  }

  function fireEvent_IE(element, eventName, memo, bubble) {
    const event = document.createEventObject();
    event.eventType = bubble ? 'ondataavailable' : 'onlosecapture';

    event.eventName = eventName;
    event.memo = memo;

    element.fireEvent(event.eventType, event);
    return event;
  }

  const fireEvent = document.createEvent ? fireEvent_DOM : fireEvent_IE;

  Event.Handler = Class.create({
    initialize: function (element, eventName, selector, callback) {
      this.element = $(element);
      this.eventName = eventName;
      this.selector = selector;
      this.callback = callback;
      this.handler = this.handleEvent.bind(this);
    },

    start: function () {
      Event.observe(this.element, this.eventName, this.handler);
      return this;
    },

    stop: function () {
      Event.stopObserving(this.element, this.eventName, this.handler);
      return this;
    },

    handleEvent: function (event) {
      const element = Event.findElement(event, this.selector);
      if (element) this.callback.call(this.element, event, element);
    }
  });

  function on(element, eventName, selector, callback) {
    element = $(element);
    if (Object.isFunction(selector) && Object.isUndefined(callback)) {
      ((callback = selector), (selector = null));
    }

    return new Event.Handler(element, eventName, selector, callback).start();
  }

  Object.extend(Event, Event.Methods);

  Object.extend(Event, {
    fire: fire,
    observe: observe,
    stopObserving: stopObserving,
    on: on
  });

  Element.addMethods({
    fire: fire,

    observe: observe,

    stopObserving: stopObserving,

    on: on
  });

  Object.extend(document, {
    fire: fire.methodize(),

    observe: observe.methodize(),

    stopObserving: stopObserving.methodize(),

    on: on.methodize(),

    loaded: false
  });

  if (GLOBAL.Event) Object.extend(window.Event, Event);
  else GLOBAL.Event = Event;

  GLOBAL.Event.cache = {};

  function destroyCache_IE() {
    GLOBAL.Event.cache = null;
  }

  if (window.attachEvent) window.attachEvent('onunload', destroyCache_IE);

  DIV = null;
  docEl = null;
})(this);

(GLOBAL => {
  /* Code for creating leak-free event responders is based on work by
   John-David Dalton. */

  let docEl = document.documentElement;
  const MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED =
    'onmouseenter' in docEl && 'onmouseleave' in docEl;

  function isSimulatedMouseEnterLeaveEvent(eventName) {
    return (
      !MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED &&
      (eventName === 'mouseenter' || eventName === 'mouseleave')
    );
  }

  function createResponder(uid, eventName, handler) {
    if (Event._isCustomEvent(eventName))
      return createResponderForCustomEvent(uid, eventName, handler);
    if (isSimulatedMouseEnterLeaveEvent(eventName))
      return createMouseEnterLeaveResponder(uid, eventName, handler);

    return event => {
      if (!Event.cache) return;

      const element = Event.cache[uid].element;
      Event.extend(event, element);
      handler.call(element, event);
    };
  }

  function createResponderForCustomEvent(uid, eventName, handler) {
    return event => {
      const cache = Event.cache[uid];
      const element = cache && cache.element;

      if (Object.isUndefined(event.eventName)) return false;

      if (event.eventName !== eventName) return false;

      Event.extend(event, element);
      handler.call(element, event);
    };
  }

  function createMouseEnterLeaveResponder(uid, eventName, handler) {
    return event => {
      const element = Event.cache[uid].element;

      Event.extend(event, element);
      let parent = event.relatedTarget;

      while (parent && parent !== element) {
        try {
          parent = parent.parentNode;
        } catch (e) {
          parent = element;
        }
      }

      if (parent === element) return;
      handler.call(element, event);
    };
  }

  GLOBAL.Event._createResponder = createResponder;
  docEl = null;
})(this);

(GLOBAL => {
  /* Support for the DOMContentLoaded event is based on work by Dan Webb,
     Matthias Miller, Dean Edwards, John Resig, and Diego Perini. */

  let TIMER;

  function fireContentLoadedEvent() {
    if (document.loaded) return;
    if (TIMER) window.clearTimeout(TIMER);
    document.loaded = true;
    document.fire('dom:loaded');
  }

  function checkReadyState() {
    if (document.readyState === 'complete') {
      document.detachEvent('onreadystatechange', checkReadyState);
      fireContentLoadedEvent();
    }
  }

  function pollDoScroll() {
    try {
      document.documentElement.doScroll('left');
    } catch (e) {
      TIMER = pollDoScroll.defer();
      return;
    }

    fireContentLoadedEvent();
  }

  if (document.readyState === 'complete') {
    fireContentLoadedEvent();
    return;
  }

  if (document.addEventListener) {
    document.addEventListener(
      'DOMContentLoaded',
      fireContentLoadedEvent,
      false
    );
  } else {
    document.attachEvent('onreadystatechange', checkReadyState);
    if (window == top) TIMER = pollDoScroll.defer();
  }

  Event.observe(window, 'load', fireContentLoadedEvent);
})(this);

Element.addMethods();
/*------------------------------- DEPRECATED -------------------------------*/

Hash.toQueryString = Object.toQueryString;

var Toggle = { display: Element.toggle };

Element.addMethods({
  childOf: Element.Methods.descendantOf
});

var Insertion = {
  Before: (element, content) => {
    return Element.insert(element, { before: content });
  },

  Top: (element, content) => {
    return Element.insert(element, { top: content });
  },

  Bottom: (element, content) => {
    return Element.insert(element, { bottom: content });
  },

  After: (element, content) => {
    return Element.insert(element, { after: content });
  }
};

var $continue = new Error(
  '"throw $continue" is deprecated, use "return" instead'
);

var Position = {
  includeScrollOffsets: false,

  prepare: function () {
    this.deltaX =
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft ||
      0;
    this.deltaY =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
  },

  within: function (element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = Element.cumulativeOffset(element);

    return (
      y >= this.offset[1] &&
      y < this.offset[1] + element.offsetHeight &&
      x >= this.offset[0] &&
      x < this.offset[0] + element.offsetWidth
    );
  },

  withinIncludingScrolloffsets: function (element, x, y) {
    const offsetcache = Element.cumulativeScrollOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = Element.cumulativeOffset(element);

    return (
      this.ycomp >= this.offset[1] &&
      this.ycomp < this.offset[1] + element.offsetHeight &&
      this.xcomp >= this.offset[0] &&
      this.xcomp < this.offset[0] + element.offsetWidth
    );
  },

  overlap: function (mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return (
        (this.offset[1] + element.offsetHeight - this.ycomp) /
        element.offsetHeight
      );
    if (mode == 'horizontal')
      return (
        (this.offset[0] + element.offsetWidth - this.xcomp) /
        element.offsetWidth
      );
  },

  cumulativeOffset: Element.Methods.cumulativeOffset,

  positionedOffset: Element.Methods.positionedOffset,

  absolutize: element => {
    Position.prepare();
    return Element.absolutize(element);
  },

  relativize: element => {
    Position.prepare();
    return Element.relativize(element);
  },

  realOffset: Element.Methods.cumulativeScrollOffset,

  offsetParent: Element.Methods.getOffsetParent,

  page: Element.Methods.viewportOffset,

  clone: (source, target, options) => {
    options = options || {};
    return Element.clonePosition(target, source, options);
  }
};

/*--------------------------------------------------------------------------*/

if (!document.getElementsByClassName)
  document.getElementsByClassName = (instanceMethods => {
    function iter(name) {
      return name.blank()
        ? null
        : `[contains(concat(' ', @class, ' '), ' ${name} ')]`;
    }

    instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath
      ? (element, className) => {
          className = className.toString().strip();
          const cond = /\s/.test(className)
            ? $w(className).map(iter).join('')
            : iter(className);
          return cond
            ? document._getElementsByXPath(`.//*${cond}`, element)
            : [];
        }
      : (element, className) => {
          className = className.toString().strip();
          const elements = [],
            classNames = /\s/.test(className) ? $w(className) : null;
          if (!classNames && !className) return elements;

          const nodes = $(element).getElementsByTagName('*');
          className = ` ${className} `;

          for (var i = 0, child, cn; (child = nodes[i]); i++) {
            if (
              child.className &&
              (cn = ` ${child.className} `) &&
              (cn.include(className) ||
                (classNames &&
                  classNames.all(name => {
                    return !name.toString().blank() && cn.include(` ${name} `);
                  })))
            )
              elements.push(Element.extend(child));
          }
          return elements;
        };

    return (className, parentElement) => {
      return $(parentElement || document.body).getElementsByClassName(
        className
      );
    };
  })(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function (element) {
    this.element = $(element);
  },

  _each: function (iterator, context) {
    this.element.className
      .split(/\s+/)
      .select(name => {
        return name.length > 0;
      })
      ._each(iterator, context);
  },

  set: function (className) {
    this.element.className = className;
  },

  add: function (classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function (classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function () {
    return $A(this).join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);

/*--------------------------------------------------------------------------*/

(() => {
  window.Selector = Class.create({
    initialize: function (expression) {
      this.expression = expression.strip();
    },

    findElements: function (rootElement) {
      return Prototype.Selector.select(this.expression, rootElement);
    },

    match: function (element) {
      return Prototype.Selector.match(element, this.expression);
    },

    toString: function () {
      return this.expression;
    },

    inspect: function () {
      return `#<Selector: ${this.expression}>`;
    }
  });

  Object.extend(Selector, {
    matchElements: (elements, expression) => {
      const match = Prototype.Selector.match,
        results = [];

      for (var i = 0, length = elements.length; i < length; i++) {
        var element = elements[i];
        if (match(element, expression)) {
          results.push(Element.extend(element));
        }
      }
      return results;
    },

    findElement: (elements, expression, index) => {
      index = index || 0;
      let matchIndex = 0,
        element;
      for (var i = 0, length = elements.length; i < length; i++) {
        element = elements[i];
        if (
          Prototype.Selector.match(element, expression) &&
          index === matchIndex++
        ) {
          return Element.extend(element);
        }
      }
    },

    findChildElements: (element, expressions) => {
      const selector = expressions.toArray().join(', ');
      return Prototype.Selector.select(selector, element || document);
    }
  });
})();
