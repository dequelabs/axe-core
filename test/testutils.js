/* global axe, checks */

// Let the user know they need to disable their axe/attest extension before running the tests.
if (window.__AXE_EXTENSION__) {
  throw new Error(
    'You must disable your axe/attest browser extension in order to run the test suite.'
  );
}

/*eslint indent: 0*/
var testUtils = {};

/*eslint no-unused-vars: 0*/
var checks, commons;
var originalChecks = (checks = axe._audit.checks);
var originalAudit = axe._audit;
var originalRules = axe._audit.rules;
var originalCommons = (commons = axe.commons);

// add fixture to the body if it's not already
var fixture = document.getElementById('fixture');
if (!fixture) {
  fixture = document.createElement('div');
  fixture.setAttribute('id', 'fixture');
  document.body.insertBefore(fixture, document.body.firstChild);
}

// determine which checks are used only in the `none` array of rules
var noneChecks = [];

function verifyIsNoneCheck(check) {
  var index = noneChecks.indexOf(check);
  if (index !== -1) {
    noneChecks.splice(index, 1);
  }
}

axe._audit.rules.forEach(function (rule) {
  rule.none.forEach(function (check) {
    check = check.id || check;
    if (noneChecks.indexOf(check) === -1) {
      noneChecks.push(check);
    }
  });
});

axe._audit.rules.forEach(function (rule) {
  rule.any.forEach(verifyIsNoneCheck);
  rule.all.forEach(verifyIsNoneCheck);
});

/**
 * Create a check context for mocking/resetting data and relatedNodes in tests
 *
 * @return Object
 */
testUtils.MockCheckContext = function () {
  'use strict';
  return {
    _relatedNodes: [],
    _data: null,
    // When using this.async() in a check, assign a function to _onAsync
    // to catch the response.
    _onAsync: null,
    async: function () {
      var self = this;
      return function (result) {
        // throws if _onAsync isn't set
        self._onAsync(result, self);
      };
    },
    data: function (d) {
      this._data = d;
    },
    relatedNodes: function (nodes) {
      this._relatedNodes = Array.isArray(nodes) ? nodes : [nodes];
    },
    reset: function () {
      this._data = null;
      this._relatedNodes = [];
      this._onAsync = null;
    }
  };
};

/**
 * Provide an API for determining Shadow DOM v0 and v1 support in tests.
 *
 * @param HTMLDocumentElement		The document of the current context
 * @return Object
 */
testUtils.shadowSupport = (function (document) {
  'use strict';
  var v0 =
      document.body && typeof document.body.createShadowRoot === 'function',
    v1 = document.body && typeof document.body.attachShadow === 'function';

  return {
    v0: v0 === true,
    v1: v1 === true,
    undefined:
      document.body &&
      typeof document.body.attachShadow === 'undefined' &&
      typeof document.body.createShadowRoot === 'undefined'
  };
})(document);

/**
 * Return the fixture element
 * @return HTMLElement
 */
testUtils.getFixture = function () {
  'use strict';
  return fixture;
};

/**
 * Method for injecting content into a fixture
 * @param {String|Node} content Stuff to go into the fixture (html or DOM node)
 * @return HTMLElement
 */
testUtils.injectIntoFixture = function (content) {
  'use strict';
  if (typeof content !== 'undefined') {
    fixture.innerHTML = '';
  }

  if (typeof content === 'string') {
    fixture.innerHTML = content;
  } else if (content instanceof Node) {
    fixture.appendChild(content);
  } else if (Array.isArray(content)) {
    content.forEach(function (node) {
      fixture.appendChild(node);
    });
  }

  return fixture;
};

/**
 * Method for injecting content into a fixture and caching
 * the flattened DOM tree (light and Shadow DOM together)
 *
 * @param {String|Node} content Stuff to go into the fixture (html or DOM node)
 * @return HTMLElement
 */
testUtils.fixtureSetup = function (content) {
  'use strict';
  testUtils.injectIntoFixture(content);
  axe.teardown();
  return axe.setup(fixture);
};

/**
 * Create check arguments
 *
 * @param Node|String 	Stuff to go into the fixture (html or node)
 * @param Object				Options argument for the check (optional, default: {})
 * @param String				Target for the check, CSS selector (default: '#target')
 * @return Array
 */
testUtils.checkSetup = function (content, options, target) {
  'use strict';
  // Normalize the params
  if (typeof options !== 'object') {
    target = options;
    options = {};
  }
  // Normalize target, allow it to be the inserted node or '#target'
  target = target || (content instanceof Node ? content : '#target');
  var rootNode = testUtils.fixtureSetup(content);

  var node;
  if (typeof target === 'string') {
    node = axe.utils.querySelectorAll(rootNode, target)[0];
  } else if (target instanceof Node) {
    node = axe.utils.getNodeFromTree(target);
  } else {
    node = target;
  }
  return [node.actualNode, options, node];
};

/**
 * Create a shadow DOM tree on #shadow and setup axe for it, returning #target
 *
 * @param Node|String 	Stuff to go into the fixture (html string or DOM Node)
 * @param Node|String 	Stuff to go into the shadow boundary (html or node)
 * @param String				Target selector for the check, can be inside or outside of Shadow DOM (optional, default: '#target')
 * @return VirtualNode
 */
testUtils.queryShadowFixture = function (
  content,
  shadowContent,
  targetSelector
) {
  'use strict';

  // Normalize target, allow it to be the provided string or use '#target' to query composed tree
  if (typeof targetSelector !== 'string') {
    targetSelector = '#target';
  }

  var fixture = testUtils.injectIntoFixture(content);
  var targetCandidate = fixture.querySelector(targetSelector);
  var container = targetCandidate;
  if (!targetCandidate) {
    // check if content specifies a shadow container
    container = fixture.querySelector('#shadow');
    if (!container) {
      container = fixture.firstChild;
    }
  }
  // attach a shadowRoot with the content provided
  var shadowRoot = container.attachShadow({ mode: 'open' });
  if (typeof shadowContent === 'string') {
    shadowRoot.innerHTML = shadowContent;
  } else if (content instanceof Node) {
    shadowRoot.appendChild(shadowContent);
  }

  if (!targetCandidate) {
    targetCandidate = shadowRoot.querySelector(targetSelector);
  }
  if (!targetSelector && !targetCandidate) {
    throw 'shadowCheckSetup requires at least one fragment to have #target, or a provided targetSelector';
  }

  // query the composed tree AFTER shadowDOM has been attached
  axe.setup(fixture);
  return axe.utils.getNodeFromTree(targetCandidate);
};

/**
 * Create check arguments with Shadow DOM. Target can be inside or outside of Shadow DOM, queried by
 * adding `id="target"` to a fragment. Or specify a custom selector as the `targetSelector` argument.
 *
 * @param Node|String 	Stuff to go into the fixture (html string or DOM Node)
 * @param Node|String 	Stuff to go into the shadow boundary (html or node)
 * @param Object				Options argument for the check (optional, default: {})
 * @param String				Target selector for the check, can be inside or outside of Shadow DOM (optional, default: '#target')
 * @return Array
 */
testUtils.shadowCheckSetup = function (
  content,
  shadowContent,
  options,
  targetSelector
) {
  // Normalize the object params
  if (typeof options !== 'object') {
    options = {};
  }
  var node = testUtils.queryShadowFixture(
    content,
    shadowContent,
    targetSelector
  );
  return [node.actualNode, options, node];
};

/**
 * Setup axe._tree flat tree
 * @param Node   Stuff to go in the flat tree
 * @returns vNode[]
 */
testUtils.flatTreeSetup = function (content) {
  axe._tree = axe.utils.getFlattenedTree(content);
  return axe._tree;
};

/**
 * Wait for all nested frames to be loaded
 *
 * @param Object				Window to wait for (optional)
 * @param function			Callback, called once resolved
 * @param function      Callback, called once rejected
 */
testUtils.awaitNestedLoad = function awaitNestedLoad(win, cb, errCb) {
  'use strict';
  if (typeof win === 'function') {
    errCb = cb;
    cb = win;
    win = window;
  }
  var document = win.document;
  var q = axe.utils.queue();

  // Wait for page load
  q.defer(function (resolve) {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      win.addEventListener('load', resolve);
    }
  });

  // Wait for all frames to be loaded
  Array.from(document.querySelectorAll('iframe')).forEach(function (frame) {
    q.defer(function (resolve) {
      return awaitNestedLoad(frame.contentWindow, resolve);
    });
  });

  // Complete (don't pass the args on to the callback)
  q.then(function () {
    cb();
  });

  if (errCb) {
    q.catch(errCb);
  }
};

/**
 * Add a given stylesheet dynamically to the document
 *
 * @param {Object} data composite object containing properties to create stylesheet
 * @property {String} data.href relative or absolute url for stylesheet to be loaded
 * @property {Boolean} data.mediaPrint boolean to represent if the constructed sheet is for print media
 * @property {String} data.text text contents to be written to the stylesheet
 * @property {String} data.id id reference to link or style to be added to document
 * @param {Object} rootNode document/fragment to which to append style
 * @returns {Object} axe.utils.queue
 */
testUtils.addStyleSheet = function addStyleSheet(data, rootNode) {
  var doc = rootNode ? rootNode : document;
  var q = axe.utils.queue();
  if (data.href) {
    q.defer(function (resolve, reject) {
      var link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = data.href;
      if (data.id) {
        link.id = data.id;
      }
      if (data.mediaPrint) {
        link.media = 'print';
      }
      link.onload = function () {
        setTimeout(function () {
          resolve();
        });
      };
      link.onerror = function () {
        reject();
      };
      doc.head.appendChild(link);
    });
  } else {
    q.defer(function (resolve) {
      var style = doc.createElement('style');
      if (data.id) {
        style.id = data.id;
      }
      style.type = 'text/css';
      style.appendChild(doc.createTextNode(data.text));
      doc.head.appendChild(style);
      setTimeout(function () {
        resolve();
      }, 100); // -> note: gives firefox to load (document.stylesheets), other browsers are fine.
    });
  }
  return q;
};

/**
 * Add a list of stylesheets
 *
 * @param {Object} sheets array of sheets data object
 * @returns {Object} axe.utils.queue
 */
testUtils.addStyleSheets = function addStyleSheets(sheets, rootNode) {
  var q = axe.utils.queue();
  sheets.forEach(function (data) {
    q.defer(axe.testUtils.addStyleSheet(data, rootNode));
  });
  return q;
};

/**
 * Remove a list of stylesheets from the document
 * @param {Array<Object>} sheets array of sheets data object
 * @returns {Object} axe.utils.queue
 */
testUtils.removeStyleSheets = function removeStyleSheets(sheets) {
  var q = axe.utils.queue();
  sheets.forEach(function (data) {
    q.defer(function (resolve, reject) {
      var node = document.getElementById(data.id);
      if (!node || !node.parentNode) {
        reject();
      }
      node.parentNode.removeChild(node);
      resolve();
    });
  });
  return q;
};

/**
 * Assert a given stylesheet against selectorText and cssText
 *
 * @param {Object} sheet CSS Stylesheet
 * @param {String} selectorText CSS Selector
 * @param {String} cssText CSS Values
 * @param {Boolean} includes (Optional) flag to check if existence of selectorText within cssText
 */
testUtils.assertStylesheet = function assertStylesheet(
  sheet,
  selectorText,
  cssText,
  includes
) {
  assert.isDefined(sheet);
  assert.property(sheet, 'cssRules');
  if (includes) {
    assert.isTrue(cssText.includes(selectorText));
  } else {
    assert.equal(sheet.cssRules[0].selectorText, selectorText);

    // compare the selector properties
    var styleEl = document.createElement('style');
    styleEl.type = 'text/css';
    styleEl.innerHTML = cssText;
    document.body.appendChild(styleEl);

    var testSheet = document.styleSheets[document.styleSheets.length - 1];
    var sheetRule = sheet.cssRules[0];
    var testRule = testSheet.cssRules[0];

    try {
      for (var i = 0; i < testRule.style.length; i++) {
        var property = testRule.style[i];
        assert.equal(sheetRule.style[property], testRule.style[property]);
      }
    } finally {
      styleEl.parentNode.removeChild(styleEl);
    }
  }
};

/**
 * Injecting content into a fixture and return queried element within fixture
 *
 * @param {String|Node} html - content to go into the fixture (html or DOM node)
 * @param {String} [query=#target] - the CSS selector query to find target DOM node
 * @return {VirtualNode}
 */
testUtils.queryFixture = function queryFixture(html, query) {
  query = query || '#target';
  var rootNode = testUtils.fixtureSetup(html);
  var vNode = axe.utils.querySelectorAll(rootNode, query)[0];
  assert.exists(
    vNode,
    'Node does not exist in query `' +
      query +
      '`. This is usually fixed by adding the default target (`id="target"`) to your html parameter. If you do not intend on querying the fixture for #target, consider using `axe.testUtils.fixtureSetup()` instead.'
  );
  return vNode;
};

/**
 * Return the checks evaluate method and apply default options
 * @param {string} checkId - ID of the check
 * @param {} testOptions - Options for the test
 * @returns {evaluateWrapper} evaluateWrapper - Check evaluation wrapper
 */
testUtils.getCheckEvaluate = function getCheckEvaluate(checkId, testOptions) {
  var check = checks[checkId];
  testOptions = testOptions || {};

  /**
   * Wraps a check for evaluation using .call()
   * @param {HTMLElement} node
   * @param {*} options
   * @param {VirtualNode} virtualNode
   * @param {Context} context
   */
  var evaluateWrapper = function (node, options, virtualNode, context) {
    var opts = check.getOptions(options);

    var result = check.evaluate.call(this, node, opts, virtualNode, context);

    // ensure that every result has a corresponding message
    if (testOptions.verifyMessage !== false) {
      var messages = axe._audit.data.checks[checkId].messages;
      var messageKey = this._data && this._data.messageKey;

      // see how the check is used to know where to find the message
      // e.g. a check used only in the `none` array of a rule will look at
      // the messageKey of a passing result in the `fail` messages
      var keyResult = result;
      var isNoneCheck = noneChecks.indexOf(checkId) !== -1;
      if (isNoneCheck) {
        keyResult = result === true ? false : result === false ? true : result;
      }

      var key =
        keyResult === true
          ? 'pass'
          : keyResult === false
          ? 'fail'
          : 'incomplete';
      var noneCheckMessage = isNoneCheck
        ? '. Note that since this check is only used in the "none" array of all rules, the messages use the inverse of the result (e.g. a result of false uses the "pass" messages)'
        : '';

      assert.exists(
        messages[key],
        'Missing "' +
          key +
          '" message for check result of ' +
          result +
          noneCheckMessage
      );
      if (messageKey) {
        assert.exists(
          messages[key][messageKey],
          'Missing ' +
            key +
            ' message key "' +
            messageKey +
            '" for check result of ' +
            result +
            noneCheckMessage
        );

        var message = axe.utils.processMessage(
          messages[key][messageKey],
          this._data
        );
        assert.isTrue(
          message.indexOf('${') === -1,
          'Data object missing properties for ' +
            key +
            ' message key "' +
            messageKey +
            '": "' +
            message +
            '"'
        );
      } else {
        var message = axe.utils.processMessage(messages[key], this._data);
        assert.isTrue(
          message.indexOf('${') === -1,
          'Data object missing properties for ' +
            key +
            ' message: "' +
            message +
            '"'
        );
      }
    }

    return result;
  };
  return evaluateWrapper;
};

axe.testUtils = testUtils;

if (typeof beforeEach !== 'undefined' && typeof afterEach !== 'undefined') {
  beforeEach(function () {
    // reset from axe._load overriding
    checks = originalChecks;
    axe._audit = originalAudit;
    axe._audit.rules = originalRules;
    commons = axe.commons = originalCommons;
  });

  afterEach(function () {
    axe.teardown();
    fixture.innerHTML = '';

    // remove all attributes from fixture (otherwise a leftover
    // style attribute would cause avoid-inline-spacing integration
    // test to fail with [#fixture] being included in the results)
    var attrs = fixture.attributes;
    for (var i = 0; i < attrs.length; i++) {
      var attrName = attrs[i].name;
      if (attrName !== 'id') {
        fixture.removeAttribute(attrs[i].name);
      }
    }

    // reset body styles
    document.body.removeAttribute('style');
  });
}

testUtils.captureError = function captureError(cb, errorHandler) {
  return function () {
    try {
      cb.apply(null, arguments);
    } catch (e) {
      errorHandler(e);
    }
  };
};

testUtils.runPartialRecursive = function runPartialRecursive(
  context,
  options,
  win
) {
  options = options || {};
  win = win || window;
  var axe = win.axe;
  var frameContexts = axe.utils.getFrameContexts(context);
  var promiseResults = [axe.runPartial(context, options)];

  frameContexts.forEach(function (c) {
    var frame = testUtils.shadowQuerySelector(c.frameSelector, win.document);
    var frameWin = frame.contentWindow;
    var frameResults = testUtils.runPartialRecursive(
      c.frameContext,
      options,
      frameWin
    );
    promiseResults = promiseResults.concat(frameResults);
  });
  return promiseResults;
};

testUtils.shadowQuerySelector = function shadowQuerySelector(axeSelector, doc) {
  var elm;
  doc = doc || document;
  axeSelector = Array.isArray(axeSelector) ? axeSelector : [axeSelector];
  axeSelector.forEach(function (selectorStr) {
    elm = doc && doc.querySelector(selectorStr);
    doc = elm && elm.shadowRoot;
  });
  return elm;
};
