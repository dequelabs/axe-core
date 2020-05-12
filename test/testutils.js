/* global axe, checks */

// Let the user know they need to disable their axe/attest extension before running the tests.
if (window.__AXE_EXTENSION__) {
	throw new Error(
		'You must disable your axe/attest browser extension in order to run the test suite.'
	);
}

/*eslint indent: 0*/
var testUtils = {};

/**
 * Create a check context for mocking/resetting data and relatedNodes in tests
 *
 * @return Object
 */
testUtils.MockCheckContext = function() {
	'use strict';
	return {
		_relatedNodes: [],
		_data: null,
		// When using this.async() in a check, assign a function to _onAsync
		// to catch the response.
		_onAsync: null,
		async: function() {
			var self = this;
			return function(result) {
				// throws if _onAsync isn't set
				self._onAsync(result, self);
			};
		},
		data: function(d) {
			this._data = d;
		},
		relatedNodes: function(nodes) {
			this._relatedNodes = Array.isArray(nodes) ? nodes : [nodes];
		},
		reset: function() {
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
testUtils.shadowSupport = (function(document) {
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
 * Method for injecting content into a fixture and caching
 * the flattened DOM tree (light and Shadow DOM together)
 *
 * @param {String|Node} content Stuff to go into the fixture (html or DOM node)
 * @return HTMLElement
 */
testUtils.fixtureSetup = function(content) {
	'use strict';
	var fixture = document.querySelector('#fixture');
	if (typeof content !== 'undefined') {
		fixture.innerHTML = '';
	}

	if (typeof content === 'string') {
		fixture.innerHTML = content;
	} else if (content instanceof Node) {
		fixture.appendChild(content);
	} else if (Array.isArray(content)) {
		content.forEach(function(node) {
			fixture.appendChild(node);
		});
	}
	axe._tree = axe.utils.getFlattenedTree(fixture);
	axe._selectorData = axe.utils.getSelectorData(axe._tree);

	return fixture;
};

/**
 * Create check arguments
 *
 * @param Node|String 	Stuff to go into the fixture (html or node)
 * @param Object				Options argument for the check (optional, default: {})
 * @param String				Target for the check, CSS selector (default: '#target')
 * @return Array
 */
testUtils.checkSetup = function(content, options, target) {
	'use strict';
	// Normalize the params
	if (typeof options !== 'object') {
		target = options;
		options = {};
	}
	// Normalize target, allow it to be the inserted node or '#target'
	target = target || (content instanceof Node ? content : '#target');
	testUtils.fixtureSetup(content);

	var node;
	if (typeof target === 'string') {
		node = axe.utils.querySelectorAll(axe._tree[0], target)[0];
	} else if (target instanceof Node) {
		node = axe.utils.getNodeFromTree(target);
	} else {
		node = target;
	}
	return [node.actualNode, options, node];
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
testUtils.shadowCheckSetup = function(
	content,
	shadowContent,
	options,
	targetSelector
) {
	'use strict';

	// Normalize target, allow it to be the provided string or use '#target' to query composed tree
	if (typeof targetSelector !== 'string') {
		targetSelector = '#target';
	}

	// Normalize the object params
	if (typeof options !== 'object') {
		options = {};
	}

	var fixture = testUtils.fixtureSetup(content);
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
	axe._tree = axe.utils.getFlattenedTree(fixture);
	var node = axe.utils.getNodeFromTree(targetCandidate);
	return [node.actualNode, options, node];
};

/**
 * Setup axe._tree flat tree
 * @param Node   Stuff to go in the flat tree
 * @returns vNode[]
 */
testUtils.flatTreeSetup = function(content) {
	axe._tree = axe.utils.getFlattenedTree(content);
	return axe._tree;
};

/**
 * Wait for all nested frames to be loaded
 *
 * @param Object				Window to wait for (optional)
 * @param function			Callback, called once resolved
 */
testUtils.awaitNestedLoad = function awaitNestedLoad(win, cb) {
	'use strict';
	if (typeof win === 'function') {
		cb = win;
		win = window;
	}
	var document = win.document;
	var q = axe.utils.queue();

	// Wait for page load
	q.defer(function(resolve) {
		if (document.readyState === 'complete') {
			resolve();
		} else {
			win.addEventListener('load', resolve);
		}
	});

	// Wait for all frames to be loaded
	Array.from(document.querySelectorAll('iframe')).forEach(function(frame) {
		q.defer(function(resolve) {
			return awaitNestedLoad(frame.contentWindow, resolve);
		});
	});

	// Complete (don't pass the args on to the callback)
	q.then(function() {
		cb();
	});
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
		q.defer(function(resolve, reject) {
			var link = doc.createElement('link');
			link.rel = 'stylesheet';
			link.href = data.href;
			if (data.id) {
				link.id = data.id;
			}
			if (data.mediaPrint) {
				link.media = 'print';
			}
			link.onload = function() {
				setTimeout(function() {
					resolve();
				});
			};
			link.onerror = function() {
				reject();
			};
			doc.head.appendChild(link);
		});
	} else {
		q.defer(function(resolve) {
			var style = doc.createElement('style');
			if (data.id) {
				style.id = data.id;
			}
			style.type = 'text/css';
			style.appendChild(doc.createTextNode(data.text));
			doc.head.appendChild(style);
			setTimeout(function() {
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
	sheets.forEach(function(data) {
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
	sheets.forEach(function(data) {
		q.defer(function(resolve, reject) {
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

/*
 * Injecting content into a fixture and return queried element within fixture
 *
 * @param {String|Node} content to go into the fixture (html or DOM node)
 * @return HTMLElement
 */
testUtils.queryFixture = function queryFixture(html, query) {
	testUtils.fixtureSetup(html);
	return axe.utils.querySelectorAll(axe._tree, query || '#target')[0];
};

/**
 * Return the checks evaluate method and apply default options
 * @param {String} checkId - ID of the check
 * @return Function
 */
testUtils.getCheckEvaluate = function getCheckEvaluate(checkId) {
	var check = checks[checkId];
	return function evaluateWrapper(node, options, virtualNode, context) {
		var opts = check.getOptions(options);
		return check.evaluate.call(this, node, opts, virtualNode, context);
	};
};

/**
 * Test function for detecting IE11 user agent string
 *
 * @param {Object} navigator The navigator object of the current browser
 * @return {boolean}
 */
testUtils.isIE11 = (function isIE11(navigator) {
	return navigator.userAgent.indexOf('Trident/7') !== -1;
})(navigator);

axe.testUtils = testUtils;

afterEach(function() {
	axe._cache.clear();
});
