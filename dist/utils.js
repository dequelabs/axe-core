var utils = (function(exports) {
	'use strict';

	/**
	 * From a list of values, find the one with the greatest weight according to
	 * the supplied map
	 * @param  {object} params Contains 3 properties:
	 * - map: a map indicating the order of values to run in
	 *        example: ['small', 'medium', 'large']
	 * - values: Array of values to take the highest from
	 * - initial: optional starting value
	 */
	function aggregate(map, values, initial) {
		values = values.slice();
		if (initial) {
			values.push(initial);
		}

		var sorting = values.map(val => map.indexOf(val)).sort(); // Stupid NodeJS array.sort functor doesn't work!!

		return map[sorting.pop()];
	}

	var definitions = [
		{
			name: 'NA',
			value: 'inapplicable',
			priority: 0,
			group: 'inapplicable'
		},
		{
			name: 'PASS',
			value: 'passed',
			priority: 1,
			group: 'passes'
		},
		{
			name: 'CANTTELL',
			value: 'cantTell',
			priority: 2,
			group: 'incomplete'
		},
		{
			name: 'FAIL',
			value: 'failed',
			priority: 3,
			group: 'violations'
		}
	];

	var constants = {
		helpUrlBase: 'https://dequeuniversity.com/rules/',
		results: [],
		resultGroups: [],
		resultGroupMap: {},
		impact: Object.freeze(['minor', 'moderate', 'serious', 'critical']),
		preload: Object.freeze({
			/**
			 * array of supported & preload(able) asset types.
			 */
			assets: ['cssom'],
			/**
			 * timeout value when resolving preload(able) assets
			 */
			timeout: 10000
		})
	};

	definitions.forEach(function(definition) {
		var name = definition.name;
		var value = definition.value;
		var priority = definition.priority;
		var group = definition.group;

		constants[name] = value;
		constants[name + '_PRIO'] = priority;
		constants[name + '_GROUP'] = group;

		constants.results[priority] = value;
		constants.resultGroups[priority] = group;

		constants.resultGroupMap[value] = group;
	});

	// Freeze everything
	Object.freeze(constants.results);
	Object.freeze(constants.resultGroups);
	Object.freeze(constants.resultGroupMap);
	Object.freeze(constants);

	const { CANTTELL_PRIO, FAIL_PRIO } = constants;
	let checkMap = [];
	checkMap[constants.PASS_PRIO] = true;
	checkMap[constants.CANTTELL_PRIO] = null;
	checkMap[constants.FAIL_PRIO] = false;

	/**
	 * Map over the any / all / none properties
	 */
	let checkTypes = ['any', 'all', 'none'];
	function anyAllNone(obj, functor) {
		return checkTypes.reduce(function(out, type) {
			out[type] = (obj[type] || []).map(val => functor(val, type));
			return out;
		}, {});
	}

	function aggregateChecks(nodeResOriginal) {
		// Create a copy
		let nodeResult = Object.assign({}, nodeResOriginal);

		// map each result value to a priority
		anyAllNone(nodeResult, function(check, type) {
			let i =
				typeof check.result === 'undefined'
					? -1
					: checkMap.indexOf(check.result);
			// default to cantTell
			check.priority = i !== -1 ? i : constants.CANTTELL_PRIO;

			if (type === 'none') {
				// For none, swap pass and fail outcomes.
				// none-type checks should pass when result is false rather than true.
				if (check.priority === constants.PASS_PRIO) {
					check.priority = constants.FAIL_PRIO;
				} else if (check.priority === constants.FAIL_PRIO) {
					check.priority = constants.PASS_PRIO;
				}
			}
		});

		// Find the result with the highest priority
		const priorities = {
			all: nodeResult.all.reduce((a, b) => Math.max(a, b.priority), 0),
			none: nodeResult.none.reduce((a, b) => Math.max(a, b.priority), 0),
			// get the lowest passing of 'any' defaulting
			// to 0 by wrapping around 4 to 0 (inapplicable)
			any: nodeResult.any.reduce((a, b) => Math.min(a, b.priority), 4) % 4
		};

		nodeResult.priority = Math.max(
			priorities.all,
			priorities.none,
			priorities.any
		);

		// Of each type, filter out all results not matching the final priority
		let impacts = [];
		checkTypes.forEach(type => {
			nodeResult[type] = nodeResult[type].filter(check => {
				return (
					check.priority === nodeResult.priority &&
					check.priority === priorities[type]
				);
			});
			nodeResult[type].forEach(check => impacts.push(check.impact));
		});

		// for failed nodes, define the impact
		if ([CANTTELL_PRIO, FAIL_PRIO].includes(nodeResult.priority)) {
			nodeResult.impact = aggregate(constants.impact, impacts);
		} else {
			nodeResult.impact = null;
		}

		// Delete the old result and priority properties
		anyAllNone(nodeResult, c => {
			delete c.result;
			delete c.priority;
		});

		// Convert the index to a result string value
		nodeResult.result = constants.results[nodeResult.priority];
		delete nodeResult.priority;

		return nodeResult;
	}

	/**
	 * Process rule results, grouping them by outcome
	 * @param ruleResult {object}
	 * @return {object}
	 */
	function finalizeResult(ruleResult) {
		Object.assign(ruleResult, aggregateNodeResults(ruleResult.nodes));
		delete ruleResult.nodes;

		return ruleResult;
	}

	/**
	 * Calculates the result of a Rule based on its types and the result of its child Checks
	 * @param	{Array} nodeResults The array of nodes tested by the Rule
	 */
	function aggregateNodeResults(nodeResults) {
		let ruleResult = {};

		// For each node, retrieve the result and impact
		nodeResults = nodeResults.map(function(nodeResult) {
			// Known result
			if (nodeResult.any && nodeResult.all && nodeResult.none) {
				return aggregateChecks(nodeResult);
			} else if (Array.isArray(nodeResult.node)) {
				return finalizeResult(nodeResult);
			} else {
				throw new TypeError('Invalid Result type');
			}
		});

		// Aggregate the result
		// If there were no nodes passed in, mark the test as inapplicable
		if (nodeResults && nodeResults.length) {
			let resultList = nodeResults.map(node => node.result);
			ruleResult.result = aggregate(
				constants.results,
				resultList,
				ruleResult.result
			);
		} else {
			ruleResult.result = 'inapplicable';
		}

		// Create an array for each type
		constants.resultGroups.forEach(group => (ruleResult[group] = []));

		// Fill the array with nodes
		nodeResults.forEach(function(nodeResult) {
			var groupName = constants.resultGroupMap[nodeResult.result];
			ruleResult[groupName].push(nodeResult);
		});

		// Take the highest impact of failed or canttell rules
		var impactGroup = constants.FAIL_GROUP;
		if (ruleResult[impactGroup].length === 0) {
			impactGroup = constants.CANTTELL_GROUP;
		}

		if (ruleResult[impactGroup].length > 0) {
			// Get the impact of all issues
			let impactList = ruleResult[impactGroup].map(failure => failure.impact);

			ruleResult.impact = aggregate(constants.impact, impactList) || null;
		} else {
			ruleResult.impact = null;
		}

		return ruleResult;
	}

	function copyToGroup(resultObject, subResult, group) {
		var resultCopy = Object.assign({}, subResult);
		resultCopy.nodes = (resultCopy[group] || []).concat();
		constants.resultGroups.forEach(group => {
			delete resultCopy[group];
		});
		resultObject[group].push(resultCopy);
	}

	/**
	 * Calculates the result of a Rule based on its types and the result of its child Checks
	 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
	 */
	function aggregateResult(results) {
		let resultObject = {};

		// Create an array for each type
		constants.resultGroups.forEach(groupName => (resultObject[groupName] = []));

		// Fill the array with nodes
		results.forEach(function(subResult) {
			if (subResult.error) {
				copyToGroup(resultObject, subResult, constants.CANTTELL_GROUP);
			} else if (subResult.result === constants.NA) {
				copyToGroup(resultObject, subResult, constants.NA_GROUP);
			} else {
				constants.resultGroups.forEach(function(group) {
					if (Array.isArray(subResult[group]) && subResult[group].length > 0) {
						copyToGroup(resultObject, subResult, group);
					}
				});
			}
		});
		return resultObject;
	}

	function areStylesSet(el, styles, stopAt) {
		var styl = window.getComputedStyle(el, null);
		if (!styl) {
			return false;
		}
		for (var i = 0; i < styles.length; ++i) {
			var att = styles[i];
			if (styl.getPropertyValue(att.property) === att.value) {
				return true;
			}
		}
		if (!el.parentNode || el.nodeName.toUpperCase() === stopAt.toUpperCase()) {
			return false;
		}
		return areStylesSet(el.parentNode, styles, stopAt);
	}

	/**
	 * If the first argument is falsey, throw an error using the second argument as a message.
	 * @param {boolean} bool
	 * @param {string} message
	 */
	function assert(bool, message) {
		if (!bool) {
			throw new Error(message);
		}
	}

	/**
	 * Converts array-like (numerical indicies and `length` property) structures to actual, real arrays
	 * @param	{Mixed} thing Array-like thing to convert
	 * @return {Array}
	 */
	function toArray(thing) {
		return Array.prototype.slice.call(thing);
	}

	/**
	 * Determines if a document node is XHTML
	 * @method isXHTML
	 * @memberof axe.utils
	 * @param {Node} doc a document node
	 * @return {Boolean}
	 */
	function isXHTML(doc) {
		if (!doc.createElement) {
			return false;
		}
		return doc.createElement('A').localName === 'A';
	}

	/**
	 * Escapes a property value of a CSS selector
	 * @see https://github.com/mathiasbynens/CSS.escape/
	 * @see http://dev.w3.org/csswg/cssom/#serialize-an-identifier
	 * @param  {String} value The piece of the selector to escape
	 * @return {String}        The escaped selector
	 */
	function escapeSelector(value) {
		/*eslint no-bitwise: 0, eqeqeq: 0, one-var: 0 */
		var string = String(value);
		var length = string.length;
		var index = -1;
		var codeUnit;
		var result = '';
		var firstCodeUnit = string.charCodeAt(0);
		while (++index < length) {
			codeUnit = string.charCodeAt(index);
			// Note: there’s no need to special-case astral symbols, surrogate
			// pairs, or lone surrogates.

			// If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
			// (U+FFFD).
			if (codeUnit == 0x0000) {
				result += '\uFFFD';
				continue;
			}

			if (
				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, […]
				(codeUnit >= 0x0001 && codeUnit <= 0x001f) ||
				codeUnit == 0x007f ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), […]
				(index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
				(index == 1 &&
					codeUnit >= 0x0030 &&
					codeUnit <= 0x0039 &&
					firstCodeUnit == 0x002d)
			) {
				// https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
				result += '\\' + codeUnit.toString(16) + ' ';
				continue;
			}

			// If the character is the first character and is a `-` (U+002D), and
			// there is no second character, […]
			if (index == 0 && length == 1 && codeUnit == 0x002d) {
				result += '\\' + string.charAt(index);
				continue;
			}

			// If the character is not handled by one of the above rules and is
			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
			// U+005A), or [a-z] (U+0061 to U+007A), […]
			if (
				codeUnit >= 0x0080 ||
				codeUnit == 0x002d ||
				codeUnit == 0x005f ||
				(codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				(codeUnit >= 0x0041 && codeUnit <= 0x005a) ||
				(codeUnit >= 0x0061 && codeUnit <= 0x007a)
			) {
				// the character itself
				result += string.charAt(index);
				continue;
			}

			// Otherwise, the escaped character.
			// https://drafts.csswg.org/cssom/#escape-a-character
			result += '\\' + string.charAt(index);
		}
		return result;
	}

	/* eslint no-script-url:0 */
	/**
	 * Check if a string contains mostly numbers
	 */
	function isMostlyNumbers(str = '') {
		return (
			str.length !== 0 && (str.match(/[0-9]/g) || '').length >= str.length / 2
		);
	}

	/**
	 * Spit a string into an array with two pieces, at a given index
	 * @param String	string to split
	 * @param Number	index at which to split
	 * @return Array
	 */
	function splitString(str, splitIndex) {
		return [str.substring(0, splitIndex), str.substring(splitIndex)];
	}

	function trimRight(str) {
		return str.replace(/\s+$/, '');
	}

	/**
	 * Take a relative or absolute URL and pull it into it's indivisual pieces
	 *
	 * @param url (string)
	 * @return urlPieces
	 *	 .protocol	The protocol used, e.g. 'https://'
	 *	 .domain		Domain name including sub domains and TLD, e.g. 'docs.deque.com'
	 *	 .port			The port number, e.g. ':8080'
	 *	 .path			Path after the domain, e.g. '/home.html'
	 *	 .query		 Query string, e.g. '?user=admin&password=pass'
	 *	 .hash			Hash / internal reference, e.g. '#footer'
	 */
	function uriParser(url) {
		let original = url;
		let protocol = '',
			domain = '',
			port = '',
			path = '',
			query = '',
			hash = '';
		if (url.includes('#')) {
			[url, hash] = splitString(url, url.indexOf('#'));
		}

		if (url.includes('?')) {
			[url, query] = splitString(url, url.indexOf('?'));
		}

		if (url.includes('://')) {
			[protocol, url] = url.split('://');
			[domain, url] = splitString(url, url.indexOf('/'));
		} else if (url.substr(0, 2) === '//') {
			url = url.substr(2);
			[domain, url] = splitString(url, url.indexOf('/'));
		}

		if (domain.substr(0, 4) === 'www.') {
			domain = domain.substr(4);
		}

		if (domain && domain.includes(':')) {
			[domain, port] = splitString(domain, domain.indexOf(':'));
		}

		path = url; // Whatever is left, must be the path
		return { original, protocol, domain, port, path, query, hash };
	}

	/**
	 * Try to, at the end of the URI, find a string that a user can identify the URI by
	 *
	 * @param uri			 The URI to use
	 * @param options
	 *	 .currentDomain	The current domain name (optional)
	 *	 .maxLength			Max length of the returned string (default: 25)
	 * @return string	 A portion at the end of the uri, no longer than maxLength
	 */
	function getFriendlyUriEnd(uri = '', options = {}) {
		if (
			// Skip certain URIs:
			uri.length <= 1 || // very short
			uri.substr(0, 5) === 'data:' || // data URIs are unreadable
			uri.substr(0, 11) === 'javascript:' || // JS isn't a URL
			uri.includes('?') // query strings aren't very readable either
		) {
			return;
		}

		const { currentDomain, maxLength = 25 } = options;
		const { path, domain, hash } = uriParser(uri);
		// Split the path at the last / that has text after it
		const pathEnd = path.substr(
			path.substr(0, path.length - 2).lastIndexOf('/') + 1
		);

		if (hash) {
			if (pathEnd && (pathEnd + hash).length <= maxLength) {
				return trimRight(pathEnd + hash);
			} else if (
				pathEnd.length < 2 &&
				hash.length > 2 &&
				hash.length <= maxLength
			) {
				return trimRight(hash);
			} else {
				return;
			}
		} else if (domain && domain.length < maxLength && path.length <= 1) {
			// '' or '/'
			return trimRight(domain + path);
		}

		// See if the domain should be returned
		if (
			path === '/' + pathEnd &&
			domain &&
			currentDomain &&
			domain !== currentDomain &&
			(domain + path).length <= maxLength
		) {
			return trimRight(domain + path);
		}

		const lastDotIndex = pathEnd.lastIndexOf('.');
		if (
			// Exclude very short or very long string
			(lastDotIndex === -1 || lastDotIndex > 1) &&
			(lastDotIndex !== -1 || pathEnd.length > 2) &&
			pathEnd.length <= maxLength &&
			// Exclude index files
			!pathEnd.match(/index(\.[a-zA-Z]{2-4})?/) &&
			// Exclude files that are likely to be database IDs
			!isMostlyNumbers(pathEnd)
		) {
			return trimRight(pathEnd);
		}
	}

	var method;

	function getMethod(node) {
		var index,
			candidate,
			candidates = [
				'matches',
				'matchesSelector',
				'mozMatchesSelector',
				'webkitMatchesSelector',
				'msMatchesSelector'
			],
			length = candidates.length;

		for (index = 0; index < length; index++) {
			candidate = candidates[index];
			if (node[candidate]) {
				return candidate;
			}
		}
	}

	/**
	 * Polyfill for Element#matches
	 * @param {HTMLElement} node The element to test
	 * @param {String} selector The selector to test element against
	 * @return {Boolean}
	 */
	function matchesSelector(node, selector) {
		if (!method || !node[method]) {
			method = getMethod(node);
		}

		if (node[method]) {
			return node[method](selector);
		}

		return false;
	}

	/**
	 * Return the list of attributes of a node.
	 * @method getNodeAttributes
	 * @memberof axe.utils
	 * @param {Element} node
	 * @returns {NamedNodeMap}
	 */
	function getNodeAttributes(node) {
		// eslint-disable-next-line no-restricted-syntax
		if (node.attributes instanceof window.NamedNodeMap) {
			// eslint-disable-next-line no-restricted-syntax
			return node.attributes;
		}

		// if the attributes property is not of type NamedNodeMap then the DOM
		// has been clobbered. E.g. <form><input name="attributes"></form>.
		// We can clone the node to isolate it and then return the attributes
		return node.cloneNode(false).attributes;
	}

	// TODO: axe._selectCache

	let documentIsXHTML;
	const ignoredAttributes = [
		'class',
		'style',
		'id',
		'selected',
		'checked',
		'disabled',
		'tabindex',
		'aria-checked',
		'aria-selected',
		'aria-invalid',
		'aria-activedescendant',
		'aria-busy',
		'aria-disabled',
		'aria-expanded',
		'aria-grabbed',
		'aria-pressed',
		'aria-valuenow'
	];
	const MAXATTRIBUTELENGTH = 31;

	/**
	 * get the attribute name and value as a string
	 * @param {Element} node		The element that has the attribute
	 * @param {Attribute} at		The attribute
	 * @return {String}
	 */
	function getAttributeNameValue(node, at) {
		const name = at.name;
		let atnv;

		if (name.indexOf('href') !== -1 || name.indexOf('src') !== -1) {
			let friendly = getFriendlyUriEnd(node.getAttribute(name));
			if (friendly) {
				let value = encodeURI(friendly);
				if (value) {
					atnv = escapeSelector(at.name) + '$="' + escapeSelector(value) + '"';
				} else {
					return;
				}
			} else {
				atnv =
					escapeSelector(at.name) +
					'="' +
					escapeSelector(node.getAttribute(name)) +
					'"';
			}
		} else {
			atnv = escapeSelector(name) + '="' + escapeSelector(at.value) + '"';
		}
		return atnv;
	}

	function countSort(a, b) {
		return a.count < b.count ? -1 : a.count === b.count ? 0 : 1;
	}

	/**
	 * Filter the attributes
	 * @param {Attribute}		The potential attribute
	 * @return {Boolean}		 Whether to include or exclude
	 */
	function filterAttributes(at) {
		return (
			!ignoredAttributes.includes(at.name) &&
			at.name.indexOf(':') === -1 &&
			(!at.value || at.value.length < MAXATTRIBUTELENGTH)
		);
	}

	/**
	 * Calculate the statistics for the classes, attributes and tags on the page, using
	 * the virtual DOM tree
	 * @param {Object} domTree		The root node of the virtual DOM tree
	 * @returns {Object}					The statistics consisting of three maps, one for classes,
	 *														one for tags and one for attributes. The map values are
	 *														the counts for how many elements with that feature exist
	 */
	function getSelectorData(domTree) {
		/* eslint no-loop-func:0*/

		// Initialize the return structure with the three maps
		let data = {
			classes: {},
			tags: {},
			attributes: {}
		};

		domTree = Array.isArray(domTree) ? domTree : [domTree];
		let currentLevel = domTree.slice();
		let stack = [];
		while (currentLevel.length) {
			let current = currentLevel.pop();
			let node = current.actualNode;

			if (!!node.querySelectorAll) {
				// ignore #text nodes

				// count the tag
				let tag = node.nodeName;
				if (data.tags[tag]) {
					data.tags[tag]++;
				} else {
					data.tags[tag] = 1;
				}

				// count all the classes
				if (node.classList) {
					Array.from(node.classList).forEach(cl => {
						const ind = escapeSelector(cl);
						if (data.classes[ind]) {
							data.classes[ind]++;
						} else {
							data.classes[ind] = 1;
						}
					});
				}

				// count all the filtered attributes
				if (node.hasAttributes()) {
					Array.from(getNodeAttributes(node))
						.filter(filterAttributes)
						.forEach(at => {
							let atnv = getAttributeNameValue(node, at);
							if (atnv) {
								if (data.attributes[atnv]) {
									data.attributes[atnv]++;
								} else {
									data.attributes[atnv] = 1;
								}
							}
						});
				}
			}
			if (current.children.length) {
				// "recurse"
				stack.push(currentLevel);
				currentLevel = current.children.slice();
			}
			while (!currentLevel.length && stack.length) {
				currentLevel = stack.pop();
			}
		}
		return data;
	}

	/**
	 * Given a node and the statistics on class frequency on the page,
	 * return all its uncommon class data sorted in order of decreasing uniqueness
	 * @param {Element} node			The node
	 * @param {Object} classData	The map of classes to counts
	 * @return {Array}						The sorted array of uncommon class data
	 */
	function uncommonClasses(node, selectorData) {
		// eslint no-loop-func:false
		let retVal = [];
		let classData = selectorData.classes;
		let tagData = selectorData.tags;

		if (node.classList) {
			Array.from(node.classList).forEach(cl => {
				let ind = escapeSelector(cl);
				if (classData[ind] < tagData[node.nodeName]) {
					retVal.push({
						name: ind,
						count: classData[ind],
						species: 'class'
					});
				}
			});
		}
		return retVal.sort(countSort);
	}

	/**
	 * Given an element and a selector that finds that element (but possibly other sibling elements)
	 * return the :nth-child(n) pseudo selector that uniquely finds the node within its siblings
	 * @param {Element} elm			 The Element
	 * @param {String} selector	 The selector
	 * @return {String}					 The nth-child selector
	 */
	function getNthChildString(elm, selector) {
		const siblings =
			(elm.parentNode && Array.from(elm.parentNode.children || '')) || [];
		const hasMatchingSiblings = siblings.find(
			sibling => sibling !== elm && matchesSelector(sibling, selector)
		);
		if (hasMatchingSiblings) {
			const nthChild = 1 + siblings.indexOf(elm);
			return ':nth-child(' + nthChild + ')';
		} else {
			return '';
		}
	}

	/**
	 * Get ID selector
	 */
	function getElmId(elm) {
		if (!elm.getAttribute('id')) {
			return;
		}
		let doc = (elm.getRootNode && elm.getRootNode()) || document;
		const id = '#' + escapeSelector(elm.getAttribute('id') || '');
		if (
			// Don't include youtube's uid values, they change	on reload
			!id.match(/player_uid_/) &&
			// Don't include IDs that occur more then once on the page
			doc.querySelectorAll(id).length === 1
		) {
			return id;
		}
	}

	/**
	 * Return the base CSS selector for a given element
	 * @param	{HTMLElement} elm				 The element to get the selector for
	 * @return {String|Array<String>}	Base CSS selector for the node
	 */
	function getBaseSelector(elm) {
		if (typeof documentIsXHTML === 'undefined') {
			documentIsXHTML = isXHTML(document);
		}
		return escapeSelector(
			documentIsXHTML ? elm.localName : elm.nodeName.toLowerCase()
		);
	}

	/**
	 * Given a node and the statistics on attribute frequency on the page,
	 * return all its uncommon attribute data sorted in order of decreasing uniqueness
	 * @param {Element} node			The node
	 * @param {Object} attData		The map of attributes to counts
	 * @return {Array}						The sorted array of uncommon attribute data
	 */
	function uncommonAttributes(node, selectorData) {
		let retVal = [];
		let attData = selectorData.attributes;
		let tagData = selectorData.tags;

		if (node.hasAttributes()) {
			Array.from(getNodeAttributes(node))
				.filter(filterAttributes)
				.forEach(at => {
					const atnv = getAttributeNameValue(node, at);

					if (atnv && attData[atnv] < tagData[node.nodeName]) {
						retVal.push({
							name: atnv,
							count: attData[atnv],
							species: 'attribute'
						});
					}
				});
		}
		return retVal.sort(countSort);
	}

	/**
	 * generates a selector fragment for an element based on the statistics of the page in
	 * which the element exists. This function takes into account the fact that selectors that
	 * use classes and tags are much faster than universal selectors. It also tries to use a
	 * unique class selector before a unique attribute selector (with the tag), followed by
	 * a selector made up of the three least common features statistically. A feature will
	 * also only be used if it is less common than the tag of the element itself.
	 *
	 * @param {Element} elm			The element for which to generate a selector
	 * @param {Object} options	 Options for how to generate the selector
	 * @param {RootNode} doc		 The root node of the document or document fragment
	 * @returns {String}				 The selector
	 */

	function getThreeLeastCommonFeatures(elm, selectorData) {
		let selector = '';
		let features;
		let clss = uncommonClasses(elm, selectorData);
		let atts = uncommonAttributes(elm, selectorData);

		if (clss.length && clss[0].count === 1) {
			// only use the unique class
			features = [clss[0]];
		} else if (atts.length && atts[0].count === 1) {
			// only use the unique attribute value
			features = [atts[0]];
			// if no class, add the tag
			selector = getBaseSelector(elm);
		} else {
			features = clss.concat(atts);
			// sort by least common
			features.sort(countSort);

			// select three least common features
			features = features.slice(0, 3);

			// if no class, add the tag
			if (
				!features.some(feat => {
					return feat.species === 'class';
				})
			) {
				// has no class
				selector = getBaseSelector(elm);
			} else {
				// put the classes at the front of the selector
				features.sort((a, b) => {
					return a.species !== b.species && a.species === 'class'
						? -1
						: a.species === b.species
						? 0
						: 1;
				});
			}
		}

		// construct the return value
		return (selector += features.reduce((val, feat) => {
			/*eslint indent: 0*/
			switch (feat.species) {
				case 'class':
					return val + '.' + feat.name;
				case 'attribute':
					return val + '[' + feat.name + ']';
			}
			return val; // should never happen
		}, ''));
	}

	/**
	 * generates a single selector for an element
	 * @param {Element} elm			The element for which to generate a selector
	 * @param {Object} options	 Options for how to generate the selector
	 * @param {RootNode} doc		 The root node of the document or document fragment
	 * @returns {String}				 The selector
	 */

	function generateSelector(elm, options, doc) {
		/*eslint no-loop-func:0*/
		if (!axe._selectorData) {
			throw new Error('Expect axe._selectorData to be set up');
		}
		const { toRoot = false } = options;
		let selector;
		let similar;

		/**
		 * Try to find a unique selector by filtering out all the clashing
		 * nodes by adding ancestor selectors iteratively.
		 * This loop is much faster than recursing and using querySelectorAll
		 */
		do {
			let features = getElmId(elm);
			if (!features) {
				features = getThreeLeastCommonFeatures(elm, axe._selectorData);
				features += getNthChildString(elm, features);
			}
			if (selector) {
				selector = features + ' > ' + selector;
			} else {
				selector = features;
			}
			if (!similar) {
				similar = Array.from(doc.querySelectorAll(selector));
			} else {
				similar = similar.filter(item => {
					return matchesSelector(item, selector);
				});
			}
			elm = elm.parentElement;
		} while ((similar.length > 1 || toRoot) && elm && elm.nodeType !== 11);

		if (similar.length === 1) {
			return selector;
		} else if (selector.indexOf(' > ') !== -1) {
			// For the odd case that document doesn't have a unique selector
			return ':root' + selector.substring(selector.indexOf(' > '));
		}
		return ':root';
	}

	/**
	 * Gets a unique CSS selector
	 * @param {HTMLElement} node The element to get the selector for
	 * @param {Object} optional options
	 * @returns {String|Array<String>} Unique CSS selector for the node
	 */
	function getSelector(elm, options = {}) {
		if (!elm) {
			return '';
		}
		let doc = (elm.getRootNode && elm.getRootNode()) || document;
		if (doc.nodeType === 11) {
			// DOCUMENT_FRAGMENT
			let stack = [];
			while (doc.nodeType === 11) {
				if (!doc.host) {
					return '';
				}
				stack.push({ elm: elm, doc: doc });
				elm = doc.host;
				doc = elm.getRootNode();
			}
			stack.push({ elm: elm, doc: doc });
			return stack.reverse().map(comp => {
				return generateSelector(comp.elm, options, comp.doc);
			});
		} else {
			return generateSelector(elm, options, doc);
		}
	}

	function getXPathArray(node, path) {
		var sibling, count;
		// Gets an XPath for an element which describes its hierarchical location.
		if (!node) {
			return [];
		}
		if (!path && node.nodeType === 9) {
			// special case for when we are called and give the document itself as the starting node
			path = [
				{
					str: 'html'
				}
			];
			return path;
		}
		path = path || [];
		if (node.parentNode && node.parentNode !== node) {
			path = getXPathArray(node.parentNode, path);
		}

		if (node.previousSibling) {
			count = 1;
			sibling = node.previousSibling;
			do {
				if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
					count++;
				}
				sibling = sibling.previousSibling;
			} while (sibling);
			if (count === 1) {
				count = null;
			}
		} else if (node.nextSibling) {
			sibling = node.nextSibling;
			do {
				if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
					count = 1;
					sibling = null;
				} else {
					count = null;
					sibling = sibling.previousSibling;
				}
			} while (sibling);
		}

		if (node.nodeType === 1) {
			var element = {};
			element.str = node.nodeName.toLowerCase();
			// add the id and the count so we can construct robust versions of the xpath
			var id = node.getAttribute && escapeSelector(node.getAttribute('id'));
			if (id && node.ownerDocument.querySelectorAll('#' + id).length === 1) {
				element.id = node.getAttribute('id');
			}
			if (count > 1) {
				element.count = count;
			}
			path.push(element);
		}
		return path;
	}

	// Robust is intended to allow xpaths to be robust to changes in the HTML structure of the page
	// This means always use the id when present
	// Non robust means always use the count (i.e. the exact position of the element)
	// Ironically this is a bit of a misnomer because in very, very dynamic pages (e.g. where ids are generated on the fly)
	// the non-ribust Xpaths will work whereas the robust ones will not work
	function xpathToString(xpathArray) {
		return xpathArray.reduce((str, elm) => {
			if (elm.id) {
				return `/${elm.str}[@id='${elm.id}']`;
			} else {
				return str + `/${elm.str}` + (elm.count > 0 ? `[${elm.count}]` : '');
			}
		}, '');
	}

	function getXpath(node) {
		var xpathArray = getXPathArray(node);
		return xpathToString(xpathArray);
	}

	function truncate(str, maxLength) {
		maxLength = maxLength || 300;

		if (str.length > maxLength) {
			var index = str.indexOf('>');
			str = str.substring(0, index + 1);
		}

		return str;
	}

	function getSource(element) {
		var source = element.outerHTML;
		if (!source && typeof XMLSerializer === 'function') {
			source = new XMLSerializer().serializeToString(element);
		}
		return truncate(source || '');
	}

	/**
	 * "Serialized" `HTMLElement`. It will calculate the CSS selector,
	 * grab the source (outerHTML) and offer an array for storing frame paths
	 * @param {HTMLElement} element The element to serialize
	 * @param {Object} spec Properties to use in place of the element when instantiated on Elements from other frames
	 */
	function DqElement(element, options, spec) {
		this._fromFrame = !!spec;

		this.spec = spec || {};
		if (options && options.absolutePaths) {
			this._options = { toRoot: true };
		}

		/**
		 * The generated HTML source code of the element
		 * @type {String}
		 */
		this.source =
			this.spec.source !== undefined ? this.spec.source : getSource(element);

		/**
		 * The element which this object is based off or the containing frame, used for sorting.
		 * Excluded in toJSON method.
		 * @type {HTMLElement}
		 */
		this._element = element;
	}

	DqElement.prototype = {
		/**
		 * A unique CSS selector for the element
		 * @return {String}
		 */
		get selector() {
			return this.spec.selector || [getSelector(this.element, this._options)];
		},

		/**
		 * Xpath to the element
		 * @return {String}
		 */
		get xpath() {
			return this.spec.xpath || [getXpath(this.element)];
		},

		/**
		 * Direct reference to the `HTMLElement` wrapped by this `DQElement`.
		 */
		get element() {
			return this._element;
		},

		get fromFrame() {
			return this._fromFrame;
		},

		toJSON: function() {
			return {
				selector: this.selector,
				source: this.source,
				xpath: this.xpath
			};
		}
	};

	DqElement.fromFrame = function(node, options, frame) {
		node.selector.unshift(frame.selector);
		node.xpath.unshift(frame.xpath);
		return new DqElement(frame.element, options, node);
	};

	/**
	 * Helper to denote which checks are asyncronous and provide callbacks and pass data back to the CheckResult
	 * @param  {CheckResult}   checkResult The target object
	 * @param  {Function} callback    The callback to expose when `this.async()` is called
	 * @return {Object}               Bound to `this` for a check's fn
	 */
	function checkHelper(checkResult, options, resolve, reject) {
		return {
			isAsync: false,
			async: function() {
				this.isAsync = true;
				return function(result) {
					if (result instanceof Error === false) {
						checkResult.result = result;
						resolve(checkResult);
					} else {
						reject(result);
					}
				};
			},
			data: function(data) {
				checkResult.data = data;
			},
			relatedNodes: function(nodes) {
				nodes = nodes instanceof Node ? [nodes] : toArray(nodes);
				checkResult.relatedNodes = nodes.map(function(element) {
					return new DqElement(element, options);
				});
			}
		};
	}

	/**
	 * Deeply clones an object or array
	 * @param  {Mixed} obj The object/array to clone
	 * @return {Mixed}     A clone of the initial object or array
	 */
	function clone(obj) {
		var index,
			length,
			out = obj;

		if (obj !== null && typeof obj === 'object') {
			if (Array.isArray(obj)) {
				out = [];
				for (index = 0, length = obj.length; index < length; index++) {
					out[index] = clone(obj[index]);
				}
			} else {
				out = {};
				for (index in obj) {
					out[index] = clone(obj[index]);
				}
			}
		}
		return out;
	}

	/*eslint no-bitwise: 0, eqeqeq: 0, curly: 0, strict: 0, no-eq-null: 0, no-shadow: 0, no-undef: 0 */
	//		 uuid.js
	//
	//		 Copyright (c) 2010-2012 Robert Kieffer
	//		 MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.	We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng;

	// Allow for MSIE11 msCrypto
	var _crypto = window.crypto || window.msCrypto;

	if (!_rng && _crypto && _crypto.getRandomValues) {
		// WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
		//
		// Moderately fast, high quality
		var _rnds8 = new Uint8Array(16);
		_rng = function whatwgRNG() {
			_crypto.getRandomValues(_rnds8);
			return _rnds8;
		};
	}

	if (!_rng) {
		// Math.random()-based (RNG)
		//
		// If all else fails, use Math.random().	It's fast, but is of unspecified
		// quality.
		var _rnds = new Array(16);
		_rng = function() {
			for (var i = 0, r; i < 16; i++) {
				if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
				_rnds[i] = (r >>> ((i & 0x03) << 3)) & 0xff;
			}

			return _rnds;
		};
	}

	// Buffer class to use
	var BufferClass = typeof window.Buffer == 'function' ? window.Buffer : Array;

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
		_byteToHex[i] = (i + 0x100).toString(16).substr(1);
		_hexToByte[_byteToHex[i]] = i;
	}

	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
		var i = (buf && offset) || 0,
			ii = 0;

		buf = buf || [];
		s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
			if (ii < 16) {
				// Don't overflow!
				buf[i + ii++] = _hexToByte[oct];
			}
		});

		// Zero out remaining bytes if string was short
		while (ii < 16) {
			buf[i + ii++] = 0;
		}

		return buf;
	}

	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
		var i = offset || 0,
			bth = _byteToHex;
		return (
			bth[buf[i++]] +
			bth[buf[i++]] +
			bth[buf[i++]] +
			bth[buf[i++]] +
			'-' +
			bth[buf[i++]] +
			bth[buf[i++]] +
			'-' +
			bth[buf[i++]] +
			bth[buf[i++]] +
			'-' +
			bth[buf[i++]] +
			bth[buf[i++]] +
			'-' +
			bth[buf[i++]] +
			bth[buf[i++]] +
			bth[buf[i++]] +
			bth[buf[i++]] +
			bth[buf[i++]] +
			bth[buf[i++]]
		);
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
		_seedBytes[0] | 0x01,
		_seedBytes[1],
		_seedBytes[2],
		_seedBytes[3],
		_seedBytes[4],
		_seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = ((_seedBytes[6] << 8) | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0,
		_lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
		var i = (buf && offset) || 0;
		var b = buf || [];

		options = options || {};

		var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

		// UUID timestamps are 100 nano-second units since the Gregorian epoch,
		// (1582-10-15 00:00).	JSNumbers aren't precise enough for this, so
		// time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
		// (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
		var msecs = options.msecs != null ? options.msecs : new Date().getTime();

		// Per 4.2.1.2, use count of uuid's generated during the current clock
		// cycle to simulate higher resolution clock
		var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

		// Time since last uuid creation (in msecs)
		var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

		// Per 4.2.1.2, Bump clockseq on clock regression
		if (dt < 0 && options.clockseq == null) {
			clockseq = (clockseq + 1) & 0x3fff;
		}

		// Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
		// time interval
		if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
			nsecs = 0;
		}

		// Per 4.2.1.2 Throw error if too many uuids are requested
		if (nsecs >= 10000) {
			throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
		}

		_lastMSecs = msecs;
		_lastNSecs = nsecs;
		_clockseq = clockseq;

		// Per 4.1.4 - Convert from unix epoch to Gregorian epoch
		msecs += 12219292800000;

		// `time_low`
		var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
		b[i++] = (tl >>> 24) & 0xff;
		b[i++] = (tl >>> 16) & 0xff;
		b[i++] = (tl >>> 8) & 0xff;
		b[i++] = tl & 0xff;

		// `time_mid`
		var tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
		b[i++] = (tmh >>> 8) & 0xff;
		b[i++] = tmh & 0xff;

		// `time_high_and_version`
		b[i++] = ((tmh >>> 24) & 0xf) | 0x10; // include version
		b[i++] = (tmh >>> 16) & 0xff;

		// `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
		b[i++] = (clockseq >>> 8) | 0x80;

		// `clock_seq_low`
		b[i++] = clockseq & 0xff;

		// `node`
		var node = options.node || _nodeId;
		for (var n = 0; n < 6; n++) {
			b[i + n] = node[n];
		}

		return buf ? buf : unparse(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
		// Deprecated - 'format' argument, as supported in v1.2
		var i = (buf && offset) || 0;

		if (typeof options == 'string') {
			buf = options == 'binary' ? new BufferClass(16) : null;
			options = null;
		}
		options = options || {};

		var rnds = options.random || (options.rng || _rng)();

		// Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
		rnds[6] = (rnds[6] & 0x0f) | 0x40;
		rnds[8] = (rnds[8] & 0x3f) | 0x80;

		// Copy bytes to buffer, if provided
		if (buf) {
			for (var ii = 0; ii < 16; ii++) {
				buf[i + ii] = rnds[ii];
			}
		}

		return buf || unparse(rnds);
	}

	// Export public API
	let uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;
	uuid.BufferClass = BufferClass;

	// TODO: axe._audit, axe.version

	/*global uuid, utils, axe */
	var messages = {},
		subscribers = {},
		errorTypes = Object.freeze([
			'EvalError',
			'RangeError',
			'ReferenceError',
			'SyntaxError',
			'TypeError',
			'URIError'
		]);

	/**
	 * get the unique string to be used to identify our instance of axe
	 * @private
	 */
	function _getSource() {
		var application = 'axeAPI',
			version = '',
			src;
		if (typeof axe !== 'undefined' && axe._audit && axe._audit.application) {
			application = axe._audit.application;
		}
		if (typeof axe !== 'undefined') {
			version = axe.version;
		}
		src = application + '.' + version;
		return src;
	}
	/**
	 * Verify the received message is from the "respondable" module
	 * @private
	 * @param  {Object} postedMessage The message received via postMessage
	 * @return {Boolean}              `true` if the message is verified from respondable
	 */
	function verify(postedMessage) {
		if (
			// Check incoming message is valid
			typeof postedMessage === 'object' &&
			typeof postedMessage.uuid === 'string' &&
			postedMessage._respondable === true
		) {
			var messageSource = _getSource();
			return (
				// Check the version matches
				postedMessage._source === messageSource ||
				// Allow free communication with axe test
				postedMessage._source === 'axeAPI.x.y.z' ||
				messageSource === 'axeAPI.x.y.z'
			);
		}
		return false;
	}

	/**
	 * Posts the message to correct frame.
	 * This abstraction necessary because IE9 & 10 do not support posting Objects; only strings
	 * @private
	 * @param  {Window}   win      The `window` to post the message to
	 * @param  {String}   topic    The topic of the message
	 * @param  {Object}   message  The message content
	 * @param  {String}   uuid     The UUID, or pseudo-unique ID of the message
	 * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
	 * @param  {Function} callback The function to invoke when/if the message is responded to
	 */
	function post(win, topic, message, uuid, keepalive, callback) {
		var error;
		if (message instanceof Error) {
			error = {
				name: message.name,
				message: message.message,
				stack: message.stack
			};
			message = undefined;
		}

		var data = {
			uuid: uuid,
			topic: topic,
			message: message,
			error: error,
			_respondable: true,
			_source: _getSource(),
			_keepalive: keepalive
		};

		if (typeof callback === 'function') {
			messages[uuid] = callback;
		}

		win.postMessage(JSON.stringify(data), '*');
	}

	/**
	 * Post a message to a window who may or may not respond to it.
	 * @param  {Window}   win      The window to post the message to
	 * @param  {String}   topic    The topic of the message
	 * @param  {Object}   message  The message content
	 * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
	 * @param  {Function} callback The function to invoke when/if the message is responded to
	 */
	function respondable$1(win, topic, message, keepalive, callback) {
		var id = uuid.v1();
		post(win, topic, message, id, keepalive, callback);
	}

	/**
	 * Subscribe to messages sent via the `respondable` module.
	 *
	 * Axe._load uses this to listen for messages from other frames
	 *
	 * @param  {String}   topic    The topic to listen to
	 * @param  {Function} callback The function to invoke when a message is received
	 */
	respondable$1.subscribe = function(topic, callback) {
		subscribers[topic] = callback;
	};

	/**
	 * checks if the current context is inside a frame
	 * @return {Boolean}
	 */
	respondable$1.isInFrame = function(win) {
		win = win || window;
		return !!win.frameElement;
	};

	/**
	 * Helper closure to create a function that may be used to respond to a message
	 * @private
	 * @param  {Window} source The window from which the message originated
	 * @param  {String} topic  The topic of the message
	 * @param  {String} uuid   The "unique" ID of the original message
	 * @return {Function}      A function that may be invoked to respond to the message
	 */
	function createResponder(source, topic, uuid) {
		return function(message, keepalive, callback) {
			post(source, topic, message, uuid, keepalive, callback);
		};
	}

	/**
	 * Publishes the "respondable" message to the appropriate subscriber
	 * @private
	 * @param  {Window}  source    The window from which the message originated
	 * @param  {Object}  data      The data sent with the message
	 * @param  {Boolean} keepalive Whether to allow multiple responses - default is false
	 */
	function publish(source, data, keepalive) {
		var topic = data.topic;
		var subscriber = subscribers[topic];

		if (subscriber) {
			var responder = createResponder(source, null, data.uuid);
			subscriber(data.message, keepalive, responder);
		}
	}

	/**
	 * Convert a javascript Error into something that can be stringified
	 * @param  {Error} error  Any type of error
	 * @return {Object}       Processable object
	 */
	function buildErrorObject(error) {
		var msg = error.message || 'Unknown error occurred';
		var errorName = errorTypes.includes(error.name) ? error.name : 'Error';
		var ErrConstructor = window[errorName] || Error;

		if (error.stack) {
			msg += '\n' + error.stack.replace(error.message, '');
		}
		return new ErrConstructor(msg);
	}

	/**
	 * Parse the received message for processing
	 * @param  {string} dataString Message received
	 * @return {object}            Object to be used for pub/sub
	 */
	function parseMessage(dataString) {
		/*eslint no-empty: 0*/
		var data;
		if (typeof dataString !== 'string') {
			return;
		}

		try {
			data = JSON.parse(dataString);
		} catch (ex) {}

		if (!verify(data)) {
			return;
		}

		if (typeof data.error === 'object') {
			data.error = buildErrorObject(data.error);
		} else {
			data.error = undefined;
		}
		return data;
	}

	if (typeof window.addEventListener === 'function') {
		window.addEventListener(
			'message',
			function(e) {
				var data = parseMessage(e.data);
				if (!data) {
					return;
				}

				var uuid = data.uuid;

				var keepalive = data._keepalive;
				var callback = messages[uuid];

				if (callback) {
					var result = data.error || data.message;
					var responder = createResponder(e.source, data.topic, uuid);
					callback(result, keepalive, responder);

					if (!keepalive) {
						delete messages[uuid];
					}
				}

				if (!data.error) {
					try {
						publish(e.source, data, keepalive);
					} catch (err) {
						post(e.source, data.topic, err, uuid, false);
					}
				}
			},
			false
		);
	}

	/**
	 * Gets all Checks (or CheckResults) for a given Rule or RuleResult
	 * @param {RuleResult|Rule} rule
	 */
	function getAllChecks(object) {
		var result = [];
		return result
			.concat(object.any || [])
			.concat(object.all || [])
			.concat(object.none || []);
	}

	/**
	 * Array#sort callback to sort nodes by DOM order
	 * @private
	 * @param  {Node} nodeA
	 * @param  {Node} nodeB
	 * @return {Integer}   @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Sort
	 */
	function nodeSorter(nodeA, nodeB) {
		/*eslint no-bitwise: 0 */
		nodeA = nodeA.actualNode || nodeA;
		nodeB = nodeB.actualNode || nodeB;
		if (nodeA === nodeB) {
			return 0;
		}

		if (nodeA.compareDocumentPosition(nodeB) & 4) {
			return -1; // a before b
		} else {
			return 1; // b before a
		}
	}

	/**
	 * Iterates an array of objects looking for a property with a specific value
	 * @method findBy
	 * @memberof axe.utils
	 * @param  {Array} array  The array of objects to iterate
	 * @param  {String} key   The property name to test against
	 * @param  {Mixed} value  The value to find
	 * @return {Object}       The first matching object or `undefined` if no match
	 */
	function findBy(array, key, value) {
		if (Array.isArray(array)) {
			return array.find(obj => typeof obj === 'object' && obj[key] === value);
		}
	}

	/**
	 * Adds the owning frame's CSS selector onto each instance of DqElement
	 * @private
	 * @param	{Array} resultSet `nodes` array on a `RuleResult`
	 * @param	{HTMLElement} frameElement	The frame element
	 * @param	{String} frameSelector		 Unique CSS selector for the frame
	 */
	function pushFrame(resultSet, options, frameElement, frameSelector) {
		var frameXpath = getXpath(frameElement);
		var frameSpec = {
			element: frameElement,
			selector: frameSelector,
			xpath: frameXpath
		};

		resultSet.forEach(function(res) {
			res.node = DqElement.fromFrame(res.node, options, frameSpec);

			var checks = getAllChecks(res);
			if (checks.length) {
				checks.forEach(function(check) {
					check.relatedNodes = check.relatedNodes.map(node =>
						DqElement.fromFrame(node, options, frameSpec)
					);
				});
			}
		});
	}

	/**
	 * Adds `to` to `from` and then re-sorts by DOM order
	 * @private
	 * @param	{Array} target	`nodes` array on a `RuleResult`
	 * @param	{Array} to	 `nodes` array on a `RuleResult`
	 * @return {Array}			The merged and sorted result
	 */
	function spliceNodes(target, to) {
		var firstFromFrame = to[0].node,
			sorterResult,
			t;
		for (var i = 0, l = target.length; i < l; i++) {
			t = target[i].node;
			sorterResult = nodeSorter(
				{ actualNode: t.element },
				{ actualNode: firstFromFrame.element }
			);
			if (
				sorterResult > 0 ||
				(sorterResult === 0 &&
					firstFromFrame.selector.length < t.selector.length)
			) {
				target.splice.apply(target, [i, 0].concat(to));
				return;
			}
		}

		target.push.apply(target, to);
	}

	function normalizeResult(result) {
		if (!result || !result.results) {
			return null;
		}

		if (!Array.isArray(result.results)) {
			return [result.results];
		}

		if (!result.results.length) {
			return null;
		}

		return result.results;
	}

	/**
	 * Merges one or more RuleResults (possibly from different frames) into one RuleResult
	 * @private
	 * @param	{Array} frameResults	Array of objects including the RuleResults as `results` and frame as `frame`
	 * @return {Array}							The merged RuleResults; should only have one result per rule
	 */
	function mergeResults(frameResults, options) {
		var result = [];
		frameResults.forEach(function(frameResult) {
			var results = normalizeResult(frameResult);
			if (!results || !results.length) {
				return;
			}

			results.forEach(function(ruleResult) {
				if (ruleResult.nodes && frameResult.frame) {
					pushFrame(
						ruleResult.nodes,
						options,
						frameResult.frameElement,
						frameResult.frame
					);
				}

				var res = findBy(result, 'id', ruleResult.id);
				if (!res) {
					result.push(ruleResult);
				} else {
					if (ruleResult.nodes.length) {
						spliceNodes(res.nodes, ruleResult.nodes);
					}
				}
			});
		});
		return result;
	}

	/*eslint no-console: 0 */

	/**
	 * Logs a message to the developer console (if it exists and is active).
	 */
	function log() {
		if (typeof console === 'object' && console.log) {
			// IE does not support console.log.apply
			Function.prototype.apply.call(console.log, console, arguments);
		}
	}

	function noop() {}
	function funcGuard(f) {
		if (typeof f !== 'function') {
			throw new TypeError('Queue methods require functions as arguments');
		}
	}

	/**
	 * Create an asynchronous "queue", list of functions to be invoked in parallel, but not necessarily returned in order
	 * @return {Queue} The newly generated "queue"
	 */
	function queue() {
		var tasks = [];
		var started = 0;
		var remaining = 0; // number of tasks not yet finished
		var completeQueue = noop;
		var complete = false;
		var err;

		// By default, wait until the next tick,
		// if no catch was set, throw to console.
		var defaultFail = function(e) {
			err = e;
			setTimeout(function() {
				if (err !== undefined && err !== null) {
					log('Uncaught error (of queue)', err);
				}
			}, 1);
		};
		var failed = defaultFail;

		function createResolve(i) {
			return function(r) {
				tasks[i] = r;
				remaining -= 1;
				if (!remaining && completeQueue !== noop) {
					complete = true;
					completeQueue(tasks);
				}
			};
		}

		function abort(msg) {
			// reset tasks
			completeQueue = noop;

			// notify catch
			failed(msg);
			// return unfinished work
			return tasks;
		}

		function pop() {
			var length = tasks.length;
			for (; started < length; started++) {
				var task = tasks[started];

				try {
					task.call(null, createResolve(started), abort);
				} catch (e) {
					abort(e);
				}
			}
		}

		var q = {
			/**
			 * Defer a function that may or may not run asynchronously.
			 *
			 * First parameter should be the function to execute with subsequent
			 * parameters being passed as arguments to that function
			 */
			defer: function(fn) {
				if (typeof fn === 'object' && fn.then && fn.catch) {
					var defer = fn;
					fn = function(resolve, reject) {
						defer.then(resolve).catch(reject);
					};
				}
				funcGuard(fn);
				if (err !== undefined) {
					return;
				} else if (complete) {
					throw new Error('Queue already completed');
				}

				tasks.push(fn);
				++remaining;
				pop();
				return q;
			},

			/**
			 * The callback to execute once all "deferred" functions have completed.  Will only be invoked once.
			 * @param  {Function} f The callback, receives an array of the return/callbacked
			 * values of each of the "deferred" functions
			 */
			then: function(fn) {
				funcGuard(fn);
				if (completeQueue !== noop) {
					throw new Error('queue `then` already set');
				}
				if (!err) {
					completeQueue = fn;
					if (!remaining) {
						complete = true;
						completeQueue(tasks);
					}
				}
				return q;
			},

			catch: function(fn) {
				funcGuard(fn);
				if (failed !== defaultFail) {
					throw new Error('queue `catch` already set');
				}
				if (!err) {
					failed = fn;
				} else {
					fn(err);
					err = null;
				}
				return q;
			},
			/**
			 * Abort the "queue" and prevent `then` function from firing
			 * @param  {Function} fn The callback to execute; receives an array of the results which have completed
			 */
			abort: abort
		};
		return q;
	}

	// TODO: axe._tree

	/**
	 * Sends a message to axe running in frames to start analysis and collate results (via `mergeResults`)
	 * @private
	 * @param  {Context}  context   The resolved Context object
	 * @param  {Object}   options   Options object (as passed to `runRules`)
	 * @param  {string}   command   Command sent to all frames
	 * @param  {Array}    parameter Array of values to be passed along side the command
	 * @param  {Function} callback  Function to call when results from all frames have returned
	 */
	function collectResultsFromFrames(
		context,
		options,
		command,
		parameter,
		resolve,
		reject
	) {
		var q = queue();
		var frames = context.frames;

		// Tell each axe running in each frame to collect results
		frames.forEach(function(frame) {
			var params = {
				options: options,
				command: command,
				parameter: parameter,
				context: {
					initiator: false,
					page: context.page,
					include: frame.include || [],
					exclude: frame.exclude || []
				}
			};

			q.defer(function(res, rej) {
				var node = frame.node;
				sendCommandToFrame(
					node,
					params,
					function(data) {
						if (data) {
							return res({
								results: data,
								frameElement: node,
								frame: getSelector(node)
							});
						}
						res(null);
					},
					rej
				);
			});
		});

		// Combine results from all frames and give it back
		q.then(function(data) {
			resolve(mergeResults(data, options));
		}).catch(reject);
	}

	/**
	 * Wrapper for Node#contains; PhantomJS does not support Node#contains and erroneously reports that it does
	 * @method contains
	 * @memberof axe.utils
	 * @param  {VirtualNode} vNode     The candidate container VirtualNode
	 * @param  {VirtualNode} otherVNode The vNode to test is contained by `vNode`
	 * @return {Boolean}           Whether `vNode` contains `otherVNode`
	 */
	function contains(vNode, otherVNode) {
		function containsShadowChild(vNode, otherVNode) {
			if (vNode.shadowId === otherVNode.shadowId) {
				return true;
			}
			return !!vNode.children.find(child => {
				return containsShadowChild(child, otherVNode);
			});
		}

		if (vNode.shadowId || otherVNode.shadowId) {
			return containsShadowChild(vNode, otherVNode);
		}

		if (vNode.actualNode) {
			if (typeof vNode.actualNode.contains === 'function') {
				return vNode.actualNode.contains(otherVNode.actualNode);
			}

			return !!(
				vNode.actualNode.compareDocumentPosition(otherVNode.actualNode) & 16
			);
		} else {
			// fallback for virtualNode only contexts (e.g. linting)
			// @see https://github.com/Financial-Times/polyfill-service/pull/183/files
			do {
				if (otherVNode === vNode) {
					return true;
				}
			} while ((otherVNode = otherVNode && otherVNode.parent));
		}

		return false;
	}

	// TODO: axe.imports

	var parser = new axe.imports.CssSelectorParser();
	parser.registerSelectorPseudos('not');
	parser.registerNestingOperators('>');
	parser.registerAttrEqualityMods('^', '$', '*');

	/*eslint no-empty: 0*/
	/**
	 * Extends metadata onto result object and executes any functions
	 * @param  {Object} to   The target of the extend
	 * @param  {Object} from Metadata to extend
	 */
	function extendMetaData(to, from) {
		Object.assign(to, from);
		Object.keys(from)
			.filter(prop => typeof from[prop] === 'function')
			.forEach(prop => {
				to[prop] = null;
				try {
					to[prop] = from[prop](to);
				} catch (e) {}
			});
	}

	const possibleShadowRoots = [
		'article',
		'aside',
		'blockquote',
		'body',
		'div',
		'footer',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'header',
		'main',
		'nav',
		'p',
		'section',
		'span'
	];
	/**
	 * Test a node to see if it has a spec-conforming shadow root
	 *
	 * @param {Node}   node  The HTML DOM node
	 * @return {Boolean}
	 */
	function isShadowRoot(node) {
		if (node.shadowRoot) {
			const nodeName = node.nodeName.toLowerCase();
			if (
				possibleShadowRoots.includes(nodeName) ||
				/^[a-z][a-z0-9_.-]*-[a-z0-9_.-]*$/.test(nodeName)
			) {
				return true;
			}
		}
		return false;
	}

	const whitespaceRegex = /[\t\r\n\f]/g;

	class AbstractVirtualNode {
		constructor() {
			this.children = [];
			this.parent = null;
		}

		get props() {
			throw new Error(
				'VirtualNode class must have a "props" object consisting ' +
					'of "nodeType" and "nodeName" properties'
			);
		}

		attr() {
			throw new Error('VirtualNode class must have a "attr" function');
		}

		hasAttr() {
			throw new Error('VirtualNode class must have a "hasAttr" function');
		}

		hasClass(className) {
			// get the value of the class attribute as svgs return a SVGAnimatedString
			// if you access the className property
			let classAttr = this.attr('class');
			if (!classAttr) {
				return false;
			}

			let selector = ' ' + className + ' ';
			return (
				(' ' + classAttr + ' ')
					.replace(whitespaceRegex, ' ')
					.indexOf(selector) >= 0
			);
		}
	}

	let _cache = {};

	const cache = {
		/**
		 * Set an item in the cache.
		 * @param {String} key - Name of the key.
		 * @param {*} value - Value to store.
		 */
		set(key, value) {
			_cache[key] = value;
		},

		/**
		 * Retrieve an item from the cache.
		 * @param {String} key - Name of the key the value was stored as.
		 * @returns {*} The item stored
		 */
		get(key) {
			return _cache[key];
		},

		/**
		 * Clear the cache.
		 */
		clear() {
			_cache = {};
		}
	};

	class VirtualNode extends AbstractVirtualNode {
		/**
		 * Wrap the real node and provide list of the flattened children
		 * @param {Node} node the node in question
		 * @param {VirtualNode} parent The parent VirtualNode
		 * @param {String} shadowId the ID of the shadow DOM to which this node belongs
		 */
		constructor(node, parent, shadowId) {
			super();
			this.shadowId = shadowId;
			this.children = [];
			this.actualNode = node;
			this.parent = parent;

			this._isHidden = null; // will be populated by axe.utils.isHidden
			this._cache = {};

			if (cache.get('nodeMap')) {
				cache.get('nodeMap').set(node, this);
			}
		}

		// abstract Node properties so we can run axe in DOM-less environments.
		// add to the prototype so memory is shared across all virtual nodes
		get props() {
			const { nodeType, nodeName, id, type } = this.actualNode;

			return {
				nodeType,
				nodeName: nodeName.toLowerCase(),
				id,
				type
			};
		}

		/**
		 * Get the value of the given attribute name.
		 * @param {String} attrName The name of the attribute.
		 * @return {String|null} The value of the attribute or null if the attribute does not exist
		 */
		attr(attrName) {
			if (typeof this.actualNode.getAttribute !== 'function') {
				return null;
			}

			return this.actualNode.getAttribute(attrName);
		}

		/**
		 * Determine if the element has the given attribute.
		 * @param {String} attrName The name of the attribute
		 * @return {Boolean} True if the element has the attribute, false otherwise.
		 */
		hasAttr(attrName) {
			if (typeof this.actualNode.hasAttribute !== 'function') {
				return false;
			}

			return this.actualNode.hasAttribute(attrName);
		}

		/**
		 * Determine if the element is focusable and cache the result.
		 * @return {Boolean} True if the element is focusable, false otherwise.
		 */
		get isFocusable() {
			if (!this._cache.hasOwnProperty('isFocusable')) {
				this._cache.isFocusable = axe.commons.dom.isFocusable(this.actualNode);
			}
			return this._cache.isFocusable;
		}

		/**
		 * Return the list of tabbable elements for this element and cache the result.
		 * @return {VirtualNode[]}
		 */
		get tabbableElements() {
			if (!this._cache.hasOwnProperty('tabbableElements')) {
				this._cache.tabbableElements = axe.commons.dom.getTabbableElements(
					this
				);
			}
			return this._cache.tabbableElements;
		}
	}

	/**
	 * This implemnts the flatten-tree algorithm specified:
	 * Originally here https://drafts.csswg.org/css-scoping/#flat-tree
	 * Hopefully soon published here: https://www.w3.org/TR/css-scoping-1/#flat-tree
	 *
	 * Some notable information:
	 ******* NOTE: as of Chrome 59, this is broken in Chrome so that tests fail completely
	 ******* removed functionality for now
	 * 1. <slot> elements do not have boxes by default (i.e. they do not get rendered and
	 *    their CSS properties are ignored)
	 * 2. <slot> elements can be made to have a box by overriding the display property
	 *    which is 'contents' by default
	 * 3. Even boxed <slot> elements do not show up in the accessibility tree until
	 *    they have a tabindex applied to them OR they have a role applied to them AND
	 *    they have a box (this is observed behavior in Safari on OS X, I cannot find
	 *    the spec for this)
	 */

	/**
	 * find all the fallback content for a <slot> and return these as an array
	 * this array will also include any #text nodes
	 *
	 * @param node {Node} - the slot Node
	 * @return Array{Nodes}
	 */
	function getSlotChildren(node) {
		var retVal = [];

		node = node.firstChild;
		while (node) {
			retVal.push(node);
			node = node.nextSibling;
		}
		return retVal;
	}

	/**
	 * Recursvely returns an array of the virtual DOM nodes at this level
	 * excluding comment nodes and the shadow DOM nodes <content> and <slot>
	 *
	 * @param {Node} node the current node
	 * @param {String} shadowId, optional ID of the shadow DOM that is the closest shadow
	 *                           ancestor of the node
	 * @param {VirtualNode} parent the parent VirtualNode
	 */
	function flattenTree(node, shadowId, parent) {
		// using a closure here and therefore cannot easily refactor toreduce the statements
		var retVal, realArray, nodeName;
		function reduceShadowDOM(res, child, parent) {
			var replacements = flattenTree(child, shadowId, parent);
			if (replacements) {
				res = res.concat(replacements);
			}
			return res;
		}

		if (node.documentElement) {
			// document
			node = node.documentElement;
		}
		nodeName = node.nodeName.toLowerCase();

		if (isShadowRoot(node)) {
			// generate an ID for this shadow root and overwrite the current
			// closure shadowId with this value so that it cascades down the tree
			retVal = new VirtualNode(node, parent, shadowId);
			shadowId =
				'a' +
				Math.random()
					.toString()
					.substring(2);
			realArray = Array.from(node.shadowRoot.childNodes);
			retVal.children = realArray.reduce((res, child) => {
				return reduceShadowDOM(res, child, retVal);
			}, []);

			return [retVal];
		} else {
			if (
				nodeName === 'content' &&
				typeof node.getDistributedNodes === 'function'
			) {
				realArray = Array.from(node.getDistributedNodes());
				return realArray.reduce((res, child) => {
					return reduceShadowDOM(res, child, parent);
				}, []);
			} else if (
				nodeName === 'slot' &&
				typeof node.assignedNodes === 'function'
			) {
				realArray = Array.from(node.assignedNodes());
				if (!realArray.length) {
					// fallback content
					realArray = getSlotChildren(node);
				}
				var styl = window.getComputedStyle(node);
				// check the display property
				{
					return realArray.reduce((res, child) => {
						return reduceShadowDOM(res, child, parent);
					}, []);
				}
			} else {
				if (node.nodeType === 1) {
					retVal = new VirtualNode(node, parent, shadowId);
					realArray = Array.from(node.childNodes);
					retVal.children = realArray.reduce((res, child) => {
						return reduceShadowDOM(res, child, retVal);
					}, []);

					return [retVal];
				} else if (node.nodeType === 3) {
					// text
					return [new VirtualNode(node, parent)];
				}
				return undefined;
			}
		}
	}

	/**
	 * Recursvely returns an array of the virtual DOM nodes at this level
	 * excluding comment nodes and the shadow DOM nodes <content> and <slot>
	 *
	 * @param {Node} node the current node
	 * @param {String} shadowId, optional ID of the shadow DOM that is the closest shadow
	 *                           ancestor of the node
	 */
	function getFlattenedTree(node, shadowId) {
		cache.set('nodeMap', new WeakMap());
		return flattenTree(node, shadowId);
	}

	/**
	 * Convenience function to extract primary language subtag from a given value
	 * @method getBaseLang
	 * @memberof axe.utils
	 * @param {String} value value specified as lang or xml:lang attribute
	 * @return {String}
	 */
	function getBaseLang(lang) {
		if (!lang) {
			return '';
		}
		return lang
			.trim()
			.split('-')[0]
			.toLowerCase();
	}

	/**
	 * Determines which CheckOption to use, either defined on the rule options, global check options or the check itself
	 * @param  {Check} check    The Check object
	 * @param  {String} ruleID  The ID of the rule
	 * @param  {Object} options Options object as passed to main API
	 * @return {Object}         The resolved object with `options` and `enabled` keys
	 */
	function getCheckOption(check, ruleID, options) {
		var ruleCheckOption = (((options.rules && options.rules[ruleID]) || {})
			.checks || {})[check.id];
		var checkOption = (options.checks || {})[check.id];

		var enabled = check.enabled;
		var opts = check.options;

		if (checkOption) {
			if (checkOption.hasOwnProperty('enabled')) {
				enabled = checkOption.enabled;
			}
			if (checkOption.hasOwnProperty('options')) {
				opts = checkOption.options;
			}
		}

		if (ruleCheckOption) {
			if (ruleCheckOption.hasOwnProperty('enabled')) {
				enabled = ruleCheckOption.enabled;
			}
			if (ruleCheckOption.hasOwnProperty('options')) {
				opts = ruleCheckOption.options;
			}
		}

		return {
			enabled: enabled,
			options: opts,
			absolutePaths: options.absolutePaths
		};
	}

	/**
	 * Return a single node from the virtual dom tree
	 *
	 * @param {Object} vNode The flattened, virtual DOM tree
	 * @param {Node}   node  The HTML DOM node
	 */
	function getNodeFromTree(vNode, node) {
		const el = node || vNode;
		return cache.get('nodeMap') ? cache.get('nodeMap').get(el) : null;
	}

	/**
	 * Creates an array without duplicate values from 2 array inputs
	 * @param {Array} arr1 First array
	 * @param {Array} arr2 Second array
	 * @return {Array}
	 */
	function uniqueArray(arr1, arr2) {
		return arr1.concat(arr2).filter((elem, pos, arr) => {
			return arr.indexOf(elem) === pos;
		});
	}

	/**
	 * Constructs a configuration object representing the preload requested assets & timeout
	 * @param {Object} options run configuration options (or defaults) passed via axe.run
	 * @return {Object} configuration
	 */
	function getPreloadConfig(options) {
		const { assets, timeout } = constants.preload;
		const config = {
			assets,
			timeout
		};

		// if no `preload` is configured via `options` - return default config
		if (!options.preload) {
			return config;
		}

		// if type is boolean
		if (typeof options.preload === 'boolean') {
			return config;
		}

		// check if requested assets to preload are valid items
		const areRequestedAssetsValid = options.preload.assets.every(a =>
			assets.includes(a.toLowerCase())
		);

		if (!areRequestedAssetsValid) {
			throw new Error(
				`Requested assets, not supported. ` +
					`Supported assets are: ${assets.join(', ')}.`
			);
		}

		// unique assets to load, in case user had requested same asset type many times.
		config.assets = uniqueArray(
			options.preload.assets.map(a => a.toLowerCase()),
			[]
		);

		if (
			options.preload.timeout &&
			typeof options.preload.timeout === 'number' &&
			!Number.isNaN(options.preload.timeout)
		) {
			config.timeout = options.preload.timeout;
		}
		return config;
	}

	/**
	 * Return the document or document fragment (shadow DOM)
	 * @method getRootNode
	 * @memberof axe.utils
	 * @param {Element} node
	 * @returns {DocumentFragment|Document}
	 */
	function getRootNode(node) {
		var doc = (node.getRootNode && node.getRootNode()) || document; // this is for backwards compatibility
		if (doc === node) {
			// disconnected node
			doc = document;
		}
		return doc;
	}

	/**
	 * Get the scroll position of given element
	 * @method getScroll
	 * @memberof axe.utils
	 * @param {Element} node
	 * @param {buffer} (Optional) allowed negligence in overflow
	 * @returns {Object | undefined}
	 */
	function getScroll(elm, buffer = 0) {
		const overflowX = elm.scrollWidth > elm.clientWidth + buffer;
		const overflowY = elm.scrollHeight > elm.clientHeight + buffer;

		/**
		 * if there is neither `overflow-x` or `overflow-y`
		 * -> return
		 */
		if (!(overflowX || overflowY)) {
			return;
		}

		const style = window.getComputedStyle(elm);
		const overflowXStyle = style.getPropertyValue('overflow-x');
		const overflowYStyle = style.getPropertyValue('overflow-y');
		const scrollableX =
			overflowXStyle !== 'visible' && overflowXStyle !== 'hidden';
		const scrollableY =
			overflowYStyle !== 'visible' && overflowYStyle !== 'hidden';

		/**
		 * check direction of `overflow` and `scrollable`
		 */
		if ((overflowX && scrollableX) || (overflowY && scrollableY)) {
			return {
				elm,
				top: elm.scrollTop,
				left: elm.scrollLeft
			};
		}
	}

	/**
	 * Function which converts given text to `CSSStyleSheet`
	 * - used in `CSSOM` computation.
	 * - factory (closure) function, initialized with `document.implementation.createHTMLDocument()`, which uses DOM API for creating `style` elements.
	 *
	 * @method axe.utils.getStyleSheetFactory
	 * @memberof axe.utils
	 * @param {Object} dynamicDoc `document.implementation.createHTMLDocument()
	 * @param {Object} options an object with properties to construct stylesheet
	 * @property {String} options.data text content of the stylesheet
	 * @property {Boolean} options.isCrossOrigin flag to notify if the resource was fetched from the network
	 * @property {String} options.shadowId (Optional) shadowId if shadowDOM
	 * @property {Object} options.root implementation document to create style elements
	 * @property {String} options.priority a number indicating the loaded priority of CSS, to denote specificity of styles contained in the sheet.
	 * @returns {Function}
	 */
	function getStyleSheetFactory(dynamicDoc) {
		if (!dynamicDoc) {
			throw new Error(
				'axe.utils.getStyleSheetFactory should be invoked with an argument'
			);
		}

		return options => {
			const {
				data,
				isCrossOrigin = false,
				shadowId,
				root,
				priority,
				isLink = false
			} = options;
			const style = dynamicDoc.createElement('style');
			if (isLink) {
				// as creating a stylesheet as link will need to be awaited
				// till `onload`, it is wise to convert link href to @import statement
				const text = dynamicDoc.createTextNode(`@import "${data.href}"`);
				style.appendChild(text);
			} else {
				style.appendChild(dynamicDoc.createTextNode(data));
			}
			dynamicDoc.head.appendChild(style);
			return {
				sheet: style.sheet,
				isCrossOrigin,
				shadowId,
				root,
				priority
			};
		};
	}

	var styleSheet;
	function injectStyle(style) {
		if (styleSheet && styleSheet.parentNode) {
			// append the style to the existing sheet
			if (styleSheet.styleSheet === undefined) {
				// Not old IE
				styleSheet.appendChild(document.createTextNode(style));
			} else {
				styleSheet.styleSheet.cssText += style;
			}
			return styleSheet;
		}
		if (!style) {
			return;
		}

		var head = document.head || document.getElementsByTagName('head')[0];
		styleSheet = document.createElement('style');
		styleSheet.type = 'text/css';

		if (styleSheet.styleSheet === undefined) {
			// Not old IE
			styleSheet.appendChild(document.createTextNode(style));
		} else {
			styleSheet.styleSheet.cssText = style;
		}

		head.appendChild(styleSheet);

		return styleSheet;
	}

	/**
	 * Determine whether an element is visible
	 * @method isHidden
	 * @memberof axe.utils
	 * @param {HTMLElement} el The HTMLElement
	 * @param {Boolean} recursed
	 * @return {Boolean} The element's visibilty status
	 */
	function isHidden(el, recursed) {
		const node = getNodeFromTree(el);

		// 9 === Node.DOCUMENT
		if (el.nodeType === 9) {
			return false;
		}

		// 11 === Node.DOCUMENT_FRAGMENT_NODE
		if (el.nodeType === 11) {
			el = el.host; // grab the host Node
		}

		if (node && node._isHidden !== null) {
			return node._isHidden;
		}

		const style = window.getComputedStyle(el, null);

		if (
			!style ||
			(!el.parentNode ||
				(style.getPropertyValue('display') === 'none' ||
					(!recursed &&
						// visibility is only accurate on the first element
						style.getPropertyValue('visibility') === 'hidden') ||
					el.getAttribute('aria-hidden') === 'true'))
		) {
			return true;
		}

		const parent = el.assignedSlot ? el.assignedSlot : el.parentNode;
		const hidden = isHidden(parent, true);

		// cache the results of the isHidden check on the parent tree
		// so we don't have to look at the parent tree again for all its
		// descendants
		if (node) {
			node._isHidden = hidden;
		}

		return hidden;
	}

	const htmlTags = [
		'a',
		'abbr',
		'address',
		'area',
		'article',
		'aside',
		'audio',
		'b',
		'base',
		'bdi',
		'bdo',
		'blockquote',
		'body',
		'br',
		'button',
		'canvas',
		'caption',
		'cite',
		'code',
		'col',
		'colgroup',
		'data',
		'datalist',
		'dd',
		'del',
		'details',
		'dfn',
		'dialog',
		'div',
		'dl',
		'dt',
		'em',
		'embed',
		'fieldset',
		'figcaption',
		'figure',
		'footer',
		'form',
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
		'img',
		'input',
		'ins',
		'kbd',
		'keygen',
		'label',
		'legend',
		'li',
		'link',
		'main',
		'map',
		'mark',
		'math',
		'menu',
		'menuitem',
		'meta',
		'meter',
		'nav',
		'noscript',
		'object',
		'ol',
		'optgroup',
		'option',
		'output',
		'p',
		'param',
		'picture',
		'pre',
		'progress',
		'q',
		'rb',
		'rp',
		'rt',
		'rtc',
		'ruby',
		's',
		'samp',
		'script',
		'section',
		'select',
		'slot',
		'small',
		'source',
		'span',
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
		'u',
		'ul',
		'var',
		'video',
		'wbr'
	];

	/**
	 * Verifies that if a given html tag is valid
	 * @method isHtmlElement
	 * @memberof axe.utils
	 * @param htmlTag htmlTag to check if valid
	 * @return {Boolean} true/ false
	 */
	function isHtmlElement(node) {
		if (node.namespaceURI === 'http://www.w3.org/2000/svg') {
			return false;
		}

		return htmlTags.includes(node.nodeName.toLowerCase());
	}

	/**
	 * Parse non cross-origin stylesheets
	 *
	 * @method parseSameOriginStylesheet
	 * @memberof axe.utils
	 * @param {Object} sheet CSSStylesheet object
	 * @param {Object} options options object from `axe.utils.parseStylesheet`
	 * @param {Array<Number>} priority sheet priority
	 * @param {Array<String>} importedUrls urls of already imported stylesheets
	 * @param {Boolean} isCrossOrigin boolean denoting if a stylesheet is `cross-origin`
	 * @returns {Promise}
	 */
	function parseSameOriginStylesheet(
		sheet,
		options,
		priority,
		importedUrls,
		isCrossOrigin = false
	) {
		const rules = Array.from(sheet.cssRules);

		if (!rules) {
			return Promise.resolve();
		}

		/**
		 * reference -> https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
		 */
		const cssImportRules = rules.filter(r => r.type === 3); // type === 3 -> CSSRule.IMPORT_RULE

		/**
		 * when no `@import` rules in given sheet -> resolve the current `sheet` & exit
		 */
		if (!cssImportRules.length) {
			// exit
			return Promise.resolve({
				isCrossOrigin,
				priority,
				root: options.rootNode,
				shadowId: options.shadowId,
				sheet
			});
		}

		/**
		 * filter rules that are not already fetched
		 */
		const cssImportUrlsNotAlreadyImported = cssImportRules
			// ensure rule has a href
			.filter(rule => rule.href)
			// extract href from object
			.map(rule => rule.href)
			// only href that are not already imported
			.filter(url => !importedUrls.includes(url));

		/**
		 * iterate `@import` rules and fetch styles
		 */
		const promises = cssImportUrlsNotAlreadyImported.map(
			(importUrl, cssRuleIndex) => {
				const newPriority = [...priority, cssRuleIndex];
				const isCrossOriginRequest = /^https?:\/\/|^\/\//i.test(importUrl);

				return parseSameOriginStylesheet(
					importUrl,
					options,
					newPriority,
					importedUrls,
					isCrossOriginRequest
				);
			}
		);

		const nonImportCSSRules = rules.filter(r => r.type !== 3);

		// no further rules to process in this sheet
		if (!nonImportCSSRules.length) {
			return Promise.all(promises);
		}

		// convert all `nonImportCSSRules` style rules into `text` and chain

		promises.push(
			Promise.resolve(
				options.convertDataToStylesheet({
					data: nonImportCSSRules.map(rule => rule.cssText).join(),
					isCrossOrigin,
					priority,
					root: options.rootNode,
					shadowId: options.shadowId
				})
			)
		);

		return Promise.all(promises);
	}

	/**
	 * Parse a given stylesheet
	 *
	 * @method parseStylesheet
	 * @memberof axe.utils
	 * @param {Object} sheet stylesheet to parse
	 * @param {Object} options configuration options object from `axe.utils.parseStylesheets`
	 * @param {Array<Number>} priority priority of stylesheet
	 * @param {Array<String>} importedUrls list of resolved `@import` urls
	 * @param {Boolean} isCrossOrigin boolean denoting if a stylesheet is `cross-origin`, passed for re-parsing `cross-origin` sheets
	 * @returns {Promise}
	 */
	function parseStylesheet(
		sheet,
		options,
		priority,
		importedUrls,
		isCrossOrigin = false
	) {
		const isSameOrigin = isSameOriginStylesheet(sheet);
		if (isSameOrigin) {
			/**
			 * resolve `same-origin` stylesheet
			 */
			return parseSameOriginStylesheet(
				sheet,
				options,
				priority,
				importedUrls,
				isCrossOrigin
			);
		}

		/**
		 * resolve `cross-origin` stylesheet
		 */
		return parseCrossOriginStylesheet(
			sheet.href,
			options,
			priority,
			importedUrls,
			true // -> isCrossOrigin
		);
	}

	/**
	 * Check if a given stylesheet is from the `same-origin`
	 * Note:
	 * `sheet.cssRules` throws an error on `cross-origin` stylesheets
	 *
	 * @param {Object} sheet CSS stylesheet
	 * @returns {Boolean}
	 */
	function isSameOriginStylesheet(sheet) {
		try {
			/*eslint no-unused-vars: 0*/
			const rules = sheet.cssRules;

			/**
			 * Safari, does not throw an error when accessing cssRules property,
			 */
			if (!rules && sheet.href) {
				return false;
			}

			return true;
		} catch (e) {
			return false;
		}
	}

	// TODO: axe.imports

	/**
	 * Parse cross-origin stylesheets
	 *
	 * @method parseCrossOriginStylesheet
	 * @memberof axe.utils
	 * @param {String} url url from which to fetch stylesheet
	 * @param {Object} options options object from `axe.utils.parseStylesheet`
	 * @param {Array<Number>} priority sheet priority
	 * @param {Array<String>} importedUrls urls of already imported stylesheets
	 * @param {Boolean} isCrossOrigin boolean denoting if a stylesheet is `cross-origin`
	 * @returns {Promise}
	 */
	function parseCrossOriginStylesheet(
		url,
		options,
		priority,
		importedUrls,
		isCrossOrigin
	) {
		const axiosOptions = {
			method: 'get',
			url
		};

		/**
		 * Add `url` to `importedUrls`
		 */
		importedUrls.push(url);

		/**
		 * Fetch `cross-origin stylesheet` via axios
		 */
		return axe.imports.axios(axiosOptions).then(({ data }) => {
			const result = options.convertDataToStylesheet({
				data,
				isCrossOrigin,
				priority,
				root: options.rootNode,
				shadowId: options.shadowId
			});

			/**
			 * Parse resolved stylesheet further for any `@import` styles
			 */
			return parseStylesheet(
				result.sheet,
				options,
				priority,
				importedUrls,
				result.isCrossOrigin
			);
		});
	}

	/**
	 * Performance measuring utility shimming the User Timing API
	 *
	 * https://www.html5rocks.com/en/tutorials/webperformance/usertiming/
	 * http://caniuse.com/#search=User%20Timing
	 *
	 */

	/**
	 * Get a time/date object using performance.now() if supported
	 * @return {DOMTimeStamp}
	 */
	function now() {
		if (window.performance && window.performance) {
			return window.performance.now();
		}
	}
	var originalTime = null;
	var lastRecordedTime = now();

	/**
	 * @typedef {utils.performanceTimer} Public API Methods
	 */
	let performanceTimer = {
		/**
		 * @member {Function} start Kicks off performance timing for overall axe audit
		 */
		start: function() {
			this.mark('mark_axe_start');
		},
		/**
		 * @member {Function} end Concludes performance timing, compares start/end marks
		 */
		end: function() {
			this.mark('mark_axe_end');
			this.measure('axe', 'mark_axe_start', 'mark_axe_end');

			this.logMeasures('axe');
		},
		/**
		 * @member {Function} auditStart Starts an audit for a page or frame
		 */
		auditStart: function() {
			this.mark('mark_audit_start');
		},
		/**
		 * @member {Function} auditEnd Ends an audit for a page or frame, logs measurement of start/end marks
		 */
		auditEnd: function() {
			this.mark('mark_audit_end');
			this.measure('audit_start_to_end', 'mark_audit_start', 'mark_audit_end');
			// log audit/rule measures
			this.logMeasures();
		},
		/**
		 * @member {Function} mark Shims creating a new named time stamp, called a mark
		 * @param {String} markName String name to record how long it took to get there.
		 * A mark that already exists will be overwritten.
		 *
		 */
		mark: function(markName) {
			if (window.performance && window.performance.mark !== undefined) {
				window.performance.mark(markName);
			}
		},
		/**
		 * @member {Function} measure Shims creating a measure to compare two marks, which can be logged
		 * @param {String} measureName String name to log what is being compared.
		 * Measures that already exist will be overwritten with a new time stamp.
		 * @param {String} startMark String name of mark to start measuring
		 * @param {String} endMark String name of mark to end measuring
		 */
		measure: function(measureName, startMark, endMark) {
			if (window.performance && window.performance.measure !== undefined) {
				window.performance.measure(measureName, startMark, endMark);
			}
		},
		/**
		 * @member {Function} logMeasures Iterates through measures and logs any that exist
		 */
		logMeasures: function(measureName) {
			function log(req) {
				log('Measure ' + req.name + ' took ' + req.duration + 'ms');
			}
			if (
				window.performance &&
				window.performance.getEntriesByType !== undefined
			) {
				// only output measures that were started after axe started, otherwise
				// we get measures made by the page before axe ran (which is confusing)
				var axeStart = window.performance.getEntriesByName('mark_axe_start')[0];
				var measures = window.performance
					.getEntriesByType('measure')
					.filter(measure => measure.startTime >= axeStart.startTime);
				for (var i = 0; i < measures.length; ++i) {
					var req = measures[i];
					if (req.name === measureName) {
						log(req);
						return;
					}
					log(req);
				}
			}
		},
		/**
		 * @member {Function} timeElapsed Records time since last audit
		 * @return {DOMTimeStamp}
		 */
		timeElapsed: function() {
			return now() - lastRecordedTime;
		},
		/**
		 * @member {Function} reset Resets the time for a new audit
		 */
		reset: function() {
			if (!originalTime) {
				originalTime = now();
			}
			lastRecordedTime = now();
		}
	};

	/* eslint-disable */
	/*
	 These pollyfills came directly from the ES Specification it's self
	 Contained within:
		- Object.assign
		- Array.prototype.find
	*/
	if (typeof Object.assign !== 'function') {
		(function() {
			Object.assign = function(target) {
				if (target === undefined || target === null) {
					throw new TypeError('Cannot convert undefined or null to object');
				}

				var output = Object(target);
				for (var index = 1; index < arguments.length; index++) {
					var source = arguments[index];
					if (source !== undefined && source !== null) {
						for (var nextKey in source) {
							if (source.hasOwnProperty(nextKey)) {
								output[nextKey] = source[nextKey];
							}
						}
					}
				}
				return output;
			};
		})();
	}

	if (!Array.prototype.find) {
		Object.defineProperty(Array.prototype, 'find', {
			value: function(predicate) {
				if (this === null) {
					throw new TypeError(
						'Array.prototype.find called on null or undefined'
					);
				}
				if (typeof predicate !== 'function') {
					throw new TypeError('predicate must be a function');
				}
				var list = Object(this);
				var length = list.length >>> 0;
				var thisArg = arguments[1];
				var value;

				for (var i = 0; i < length; i++) {
					value = list[i];
					if (predicate.call(thisArg, value, i, list)) {
						return value;
					}
				}
				return undefined;
			}
		});
	}

	function pollyfillElementsFromPoint() {
		if (document.elementsFromPoint) return document.elementsFromPoint;
		if (document.msElementsFromPoint) return document.msElementsFromPoint;

		var usePointer = (function() {
			var element = document.createElement('x');
			element.style.cssText = 'pointer-events:auto';
			return element.style.pointerEvents === 'auto';
		})();

		var cssProp = usePointer ? 'pointer-events' : 'visibility';
		var cssDisableVal = usePointer ? 'none' : 'hidden';

		var style = document.createElement('style');
		style.innerHTML = usePointer
			? '* { pointer-events: all }'
			: '* { visibility: visible }';

		return function(x, y) {
			var current, i, d;
			var elements = [];
			var previousPointerEvents = [];

			// startup
			document.head.appendChild(style);

			while (
				(current = document.elementFromPoint(x, y)) &&
				elements.indexOf(current) === -1
			) {
				// push the element and its current style
				elements.push(current);

				previousPointerEvents.push({
					value: current.style.getPropertyValue(cssProp),
					priority: current.style.getPropertyPriority(cssProp)
				});

				// add "pointer-events: none", to get to the underlying element
				current.style.setProperty(cssProp, cssDisableVal, 'important');
			}

			// Due to negative index, documentElement could actually not be the last,
			// so we'll simply move it to the end
			if (elements.indexOf(document.documentElement) < elements.length - 1) {
				elements.splice(elements.indexOf(document.documentElement), 1);
				elements.push(document.documentElement);
			}

			// restore the previous pointer-events values
			for (
				i = previousPointerEvents.length;
				!!(d = previousPointerEvents[--i]);

			) {
				elements[i].style.setProperty(
					cssProp,
					d.value ? d.value : '',
					d.priority
				);
			}

			// teardown;
			document.head.removeChild(style);

			return elements;
		};
	}

	if (typeof window.addEventListener === 'function') {
		document.elementsFromPoint = pollyfillElementsFromPoint();
	}

	if (!Array.prototype.includes) {
		Object.defineProperty(Array.prototype, 'includes', {
			value: function(searchElement) {
				var O = Object(this);
				var len = parseInt(O.length, 10) || 0;
				if (len === 0) {
					return false;
				}
				var n = parseInt(arguments[1], 10) || 0;
				var k;
				if (n >= 0) {
					k = n;
				} else {
					k = len + n;
					if (k < 0) {
						k = 0;
					}
				}
				var currentElement;
				while (k < len) {
					currentElement = O[k];
					if (
						searchElement === currentElement ||
						(searchElement !== searchElement &&
							currentElement !== currentElement)
					) {
						// NaN !== NaN
						return true;
					}
					k++;
				}
				return false;
			}
		});
	}

	// Production steps of ECMA-262, Edition 5, 15.4.4.17
	// Reference: http://es5.github.io/#x15.4.4.17
	if (!Array.prototype.some) {
		Object.defineProperty(Array.prototype, 'some', {
			value: function(fun) {
				if (this == null) {
					throw new TypeError(
						'Array.prototype.some called on null or undefined'
					);
				}

				if (typeof fun !== 'function') {
					throw new TypeError();
				}

				var t = Object(this);
				var len = t.length >>> 0;

				var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
				for (var i = 0; i < len; i++) {
					if (i in t && fun.call(thisArg, t[i], i, t)) {
						return true;
					}
				}

				return false;
			}
		});
	}

	if (!Array.from) {
		Object.defineProperty(Array, 'from', {
			value: (function() {
				var toStr = Object.prototype.toString;
				var isCallable = function(fn) {
					return (
						typeof fn === 'function' || toStr.call(fn) === '[object Function]'
					);
				};
				var toInteger = function(value) {
					var number = Number(value);
					if (isNaN(number)) {
						return 0;
					}
					if (number === 0 || !isFinite(number)) {
						return number;
					}
					return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
				};
				var maxSafeInteger = Math.pow(2, 53) - 1;
				var toLength = function(value) {
					var len = toInteger(value);
					return Math.min(Math.max(len, 0), maxSafeInteger);
				};

				// The length property of the from method is 1.
				return function from(arrayLike /*, mapFn, thisArg */) {
					// 1. Let C be the this value.
					var C = this;

					// 2. Let items be ToObject(arrayLike).
					var items = Object(arrayLike);

					// 3. ReturnIfAbrupt(items).
					if (arrayLike == null) {
						throw new TypeError(
							'Array.from requires an array-like object - not null or undefined'
						);
					}

					// 4. If mapfn is undefined, then let mapping be false.
					var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
					var T;
					if (typeof mapFn !== 'undefined') {
						// 5. else
						// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
						if (!isCallable(mapFn)) {
							throw new TypeError(
								'Array.from: when provided, the second argument must be a function'
							);
						}

						// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
						if (arguments.length > 2) {
							T = arguments[2];
						}
					}

					// 10. Let lenValue be Get(items, "length").
					// 11. Let len be ToLength(lenValue).
					var len = toLength(items.length);

					// 13. If IsConstructor(C) is true, then
					// 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
					// 14. a. Else, Let A be ArrayCreate(len).
					var A = isCallable(C) ? Object(new C(len)) : new Array(len);

					// 16. Let k be 0.
					var k = 0;
					// 17. Repeat, while k < len… (also steps a - h)
					var kValue;
					while (k < len) {
						kValue = items[k];
						if (mapFn) {
							A[k] =
								typeof T === 'undefined'
									? mapFn(kValue, k)
									: mapFn.call(T, kValue, k);
						} else {
							A[k] = kValue;
						}
						k += 1;
					}
					// 18. Let putStatus be Put(A, "length", len, true).
					A.length = len;
					// 20. Return A.
					return A;
				};
			})()
		});
	}

	if (!String.prototype.includes) {
		String.prototype.includes = function(search, start) {
			if (typeof start !== 'number') {
				start = 0;
			}
			if (start + search.length > this.length) {
				return false;
			} else {
				return this.indexOf(search, start) !== -1;
			}
		};
	}

	// The lines below is because the latedef option does not work
	var convertExpressions = function() {};
	var matchExpressions = function() {};

	// todo: implement an option to follow aria-owns

	function matchesTag(vNode, exp) {
		return (
			vNode.props.nodeType === 1 &&
			(exp.tag === '*' || vNode.props.nodeName === exp.tag)
		);
	}

	function matchesClasses(vNode, exp) {
		return !exp.classes || exp.classes.every(cl => vNode.hasClass(cl.value));
	}

	function matchesAttributes(vNode, exp) {
		return (
			!exp.attributes ||
			exp.attributes.every(att => {
				var nodeAtt = vNode.attr(att.key);
				return nodeAtt !== null && (!att.value || att.test(nodeAtt));
			})
		);
	}

	function matchesId(vNode, exp) {
		return !exp.id || vNode.props.id === exp.id;
	}

	function matchesPseudos(target, exp) {
		if (
			!exp.pseudos ||
			exp.pseudos.every(pseudo => {
				if (pseudo.name === 'not') {
					return !matchExpressions([target], pseudo.expressions, false).length;
				}
				throw new Error(
					'the pseudo selector ' + pseudo.name + ' has not yet been implemented'
				);
			})
		) {
			return true;
		}
		return false;
	}

	var escapeRegExp = (function() {
		/*! Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License */
		var from = /(?=[\-\[\]{}()*+?.\\\^$|,#\s])/g;
		var to = '\\';
		return function(string) {
			return string.replace(from, to);
		};
	})();

	var reUnescape = /\\/g;

	function convertAttributes(atts) {
		/*! Credit Mootools Copyright Mootools, MIT License */
		if (!atts) {
			return;
		}
		return atts.map(att => {
			var attributeKey = att.name.replace(reUnescape, '');
			var attributeValue = (att.value || '').replace(reUnescape, '');
			var test, regexp;

			switch (att.operator) {
				case '^=':
					regexp = new RegExp('^' + escapeRegExp(attributeValue));
					break;
				case '$=':
					regexp = new RegExp(escapeRegExp(attributeValue) + '$');
					break;
				case '~=':
					regexp = new RegExp(
						'(^|\\s)' + escapeRegExp(attributeValue) + '(\\s|$)'
					);
					break;
				case '|=':
					regexp = new RegExp('^' + escapeRegExp(attributeValue) + '(-|$)');
					break;
				case '=':
					test = function(value) {
						return attributeValue === value;
					};
					break;
				case '*=':
					test = function(value) {
						return value && value.includes(attributeValue);
					};
					break;
				case '!=':
					test = function(value) {
						return attributeValue !== value;
					};
					break;
				default:
					test = function(value) {
						return !!value;
					};
			}

			if (attributeValue === '' && /^[*$^]=$/.test(att.operator)) {
				test = function() {
					return false;
				};
			}

			if (!test) {
				test = function(value) {
					return value && regexp.test(value);
				};
			}
			return {
				key: attributeKey,
				value: attributeValue,
				test: test
			};
		});
	}

	function convertClasses(classes) {
		if (!classes) {
			return;
		}
		return classes.map(className => {
			className = className.replace(reUnescape, '');

			return {
				value: className,
				regexp: new RegExp('(^|\\s)' + escapeRegExp(className) + '(\\s|$)')
			};
		});
	}

	function convertPseudos(pseudos) {
		if (!pseudos) {
			return;
		}
		return pseudos.map(p => {
			var expressions;

			if (p.name === 'not') {
				expressions = p.value;
				expressions = expressions.selectors
					? expressions.selectors
					: [expressions];
				expressions = convertExpressions(expressions);
			}
			return {
				name: p.name,
				expressions: expressions,
				value: p.value
			};
		});
	}

	/**
	 * convert the css-selector-parser format into the Slick format
	 * @private
	 * @param Array {Object} expressions
	 * @return Array {Object}
	 *
	 */
	convertExpressions = function(expressions) {
		return expressions.map(exp => {
			var newExp = [];
			var rule = exp.rule;
			while (rule) {
				/* eslint no-restricted-syntax: 0 */
				// `.tagName` is a property coming from the `CSSSelectorParser` library
				newExp.push({
					tag: rule.tagName ? rule.tagName.toLowerCase() : '*',
					combinator: rule.nestingOperator ? rule.nestingOperator : ' ',
					id: rule.id,
					attributes: convertAttributes(rule.attrs),
					classes: convertClasses(rule.classNames),
					pseudos: convertPseudos(rule.pseudos)
				});
				rule = rule.rule;
			}
			return newExp;
		});
	};

	function createLocalVariables(vNodes, anyLevel, thisLevel, parentShadowId) {
		let retVal = {
			vNodes: vNodes.slice(),
			anyLevel: anyLevel,
			thisLevel: thisLevel,
			parentShadowId: parentShadowId
		};
		retVal.vNodes.reverse();
		return retVal;
	}

	function matchesSelector$1(vNode, exp) {
		return (
			matchesTag(vNode, exp[0]) &&
			matchesClasses(vNode, exp[0]) &&
			matchesAttributes(vNode, exp[0]) &&
			matchesId(vNode, exp[0]) &&
			matchesPseudos(vNode, exp[0])
		);
	}

	matchExpressions = function(domTree, expressions, recurse, filter) {
		let stack = [];
		let vNodes = Array.isArray(domTree) ? domTree : [domTree];
		let currentLevel = createLocalVariables(
			vNodes,
			expressions,
			[],
			domTree[0].shadowId
		);
		let result = [];

		while (currentLevel.vNodes.length) {
			let vNode = currentLevel.vNodes.pop();
			let childOnly = []; // we will add hierarchical '>' selectors here
			let childAny = [];
			let combined = currentLevel.anyLevel
				.slice()
				.concat(currentLevel.thisLevel);
			let added = false;
			// see if node matches
			for (let i = 0; i < combined.length; i++) {
				let exp = combined[i];
				if (
					(!exp[0].id || vNode.shadowId === currentLevel.parentShadowId) &&
					matchesSelector$1(vNode, exp)
				) {
					if (exp.length === 1) {
						if (!added && (!filter || filter(vNode))) {
							result.push(vNode);
							added = true;
						}
					} else {
						let rest = exp.slice(1);
						if ([' ', '>'].includes(rest[0].combinator) === false) {
							throw new Error(
								'axe.utils.querySelectorAll does not support the combinator: ' +
									exp[1].combinator
							);
						}
						if (rest[0].combinator === '>') {
							// add the rest to the childOnly array
							childOnly.push(rest);
						} else {
							// add the rest to the childAny array
							childAny.push(rest);
						}
					}
				}
				if (
					(!exp[0].id || vNode.shadowId === currentLevel.parentShadowId) &&
					currentLevel.anyLevel.includes(exp)
				) {
					childAny.push(exp);
				}
			}
			// "recurse"
			if (vNode.children && vNode.children.length && recurse) {
				stack.push(currentLevel);
				currentLevel = createLocalVariables(
					vNode.children,
					childAny,
					childOnly,
					vNode.shadowId
				);
			}
			// check for "return"
			while (!currentLevel.vNodes.length && stack.length) {
				currentLevel = stack.pop();
			}
		}
		return result;
	};

	/**
	 * querySelectorAll implementation that operates on the flattened tree (supports shadow DOM)
	 * @method querySelectorAll
	 * @memberof axe.utils
	 * @param	{NodeList} domTree flattened tree collection to search
	 * @param	{String} selector String containing one or more CSS selectors separated by commas
	 * @return {NodeList} Elements matched by any of the selectors
	 */
	function querySelectorAll(domTree, selector) {
		return querySelectorAllFilter(domTree, selector);
	}

	/**
	 * querySelectorAllFilter implements querySelectorAll on the virtual DOM with
	 * ability to filter the returned nodes using an optional supplied filter function
	 *
	 * @method querySelectorAllFilter
	 * @memberof axe.utils
	 * @param	{NodeList} domTree flattened tree collection to search
	 * @param	{String} selector String containing one or more CSS selectors separated by commas
	 * @param	{Function} filter function (optional)
	 * @return {Array} Elements matched by any of the selectors and filtered by the filter function
	 */

	function querySelectorAllFilter(domTree, selector, filter) {
		domTree = Array.isArray(domTree) ? domTree : [domTree];
		var expressions = parser.parse(selector);
		expressions = expressions.selectors ? expressions.selectors : [expressions];
		expressions = convertExpressions(expressions);
		return matchExpressions(domTree, expressions, true, filter);
	}

	// TODO: axe._tree

	/**
	 * NOTE:
	 * this `eslint` rule is disabled because of calling `getStyleSheetFactory` before it is defined (further below).
	 */
	/* eslint no-use-before-define: 0 */

	/**
	 * Given a rootNode - construct CSSOM
	 * -> get all source nodes (document & document fragments) within given root node
	 * -> recursively call `axe.utils.parseStylesheets` to resolve styles for each node
	 *
	 * @method preloadCssom
	 * @memberof `axe.utils`
	 * @param {Object} options composite options object
	 * @property {Array<String>} options.assets array of preloaded assets requested, eg: [`cssom`]
	 * @property {Number} options.timeout timeout
	 * @property {Object} options.treeRoot (optional) the DOM tree to be inspected
	 * @returns {Promise}
	 */
	function preloadCssom({ treeRoot = axe._tree[0] }) {
		/**
		 * get all `document` and `documentFragment` with in given `tree`
		 */
		const rootNodes = getAllRootNodesInTree(treeRoot);

		if (!rootNodes.length) {
			return Promise.resolve();
		}

		const dynamicDoc = document.implementation.createHTMLDocument(
			'Dynamic document for loading cssom'
		);

		const convertDataToStylesheet = getStyleSheetFactory(dynamicDoc);

		return getCssomForAllRootNodes(rootNodes, convertDataToStylesheet).then(
			assets => flattenAssets(assets)
		);
	}

	/**
	 * Returns am array of source nodes containing `document` and `documentFragment` in a given `tree`.
	 *
	 * @param {Object} treeRoot tree
	 * @returns {Array<Object>} array of objects, which each object containing a root and an optional `shadowId`
	 */
	function getAllRootNodesInTree(tree) {
		let ids = [];

		const rootNodes = querySelectorAllFilter(tree, '*', node => {
			if (ids.includes(node.shadowId)) {
				return false;
			}
			ids.push(node.shadowId);
			return true;
		}).map(node => {
			return {
				shadowId: node.shadowId,
				rootNode: getRootNode(node.actualNode)
			};
		});

		return uniqueArray(rootNodes, []);
	}

	/**
	 * Process CSSOM on all root nodes
	 *
	 * @param {Array<Object>} rootNodes array of root nodes, where node  is an enhanced `document` or `documentFragment` object returned from `getAllRootNodesInTree`
	 * @param {Function} convertDataToStylesheet fn to convert given data to Stylesheet object
	 * @returns {Promise}
	 */
	function getCssomForAllRootNodes(rootNodes, convertDataToStylesheet) {
		const promises = [];

		rootNodes.forEach(({ rootNode, shadowId }, index) => {
			const sheets = getStylesheetsOfRootNode(
				rootNode,
				shadowId,
				convertDataToStylesheet
			);
			if (!sheets) {
				return Promise.all(promises);
			}

			const rootIndex = index + 1;
			const parseOptions = {
				rootNode,
				shadowId,
				convertDataToStylesheet,
				rootIndex
			};
			/**
			 * Note:
			 * `importedUrls` - keeps urls of already imported stylesheets, to prevent re-fetching
			 * eg: nested, cyclic or cross referenced `@import` urls
			 */
			const importedUrls = [];

			const p = Promise.all(
				sheets.map((sheet, sheetIndex) => {
					const priority = [rootIndex, sheetIndex];

					return parseStylesheet(sheet, parseOptions, priority, importedUrls);
				})
			);

			promises.push(p);
		});

		return Promise.all(promises);
	}

	/**
	 * Flatten CSSOM assets
	 *
	 * @param {[Array<Array<...>]} assets nested assets (varying depth)
	 * @returns {Array<Object>} Array of CSSOM object
	 */
	function flattenAssets(assets) {
		return assets.reduce(
			(acc, val) =>
				Array.isArray(val) ? acc.concat(flattenAssets(val)) : acc.concat(val),
			[]
		);
	}

	/**
	 * Get stylesheet(s) for root
	 *
	 * @param {Object} options.rootNode `document` or `documentFragment`
	 * @param {String} options.shadowId an id if undefined denotes that given root is a document fragment/ shadowDOM
	 * @param {Function} options.convertDataToStylesheet a utility function to generate a style sheet from given data (text)
	 * @returns {Array<Object>} an array of stylesheets
	 */
	function getStylesheetsOfRootNode(
		rootNode,
		shadowId,
		convertDataToStylesheet
	) {
		let sheets;

		// nodeType === 11  -> DOCUMENT_FRAGMENT
		if (rootNode.nodeType === 11 && shadowId) {
			sheets = getStylesheetsFromDocumentFragment(
				rootNode,
				convertDataToStylesheet
			);
		} else {
			sheets = getStylesheetsFromDocument(rootNode);
		}

		return filterStylesheetsWithSameHref(sheets);
	}

	/**
	 * Get stylesheets from `documentFragment`
	 *
	 * @property {Object} options.rootNode `documentFragment`
	 * @property {Function} options.convertDataToStylesheet a utility function to generate a stylesheet from given data
	 * @returns {Array<Object>}
	 */
	function getStylesheetsFromDocumentFragment(
		rootNode,
		convertDataToStylesheet
	) {
		return (
			Array.from(rootNode.children)
				.filter(filerStyleAndLinkAttributesInDocumentFragment)
				// Reducer to convert `<style></style>` and `<link>` references to `CSSStyleSheet` object
				.reduce((out, node) => {
					const nodeName = node.nodeName.toUpperCase();
					const data = nodeName === 'STYLE' ? node.textContent : node;
					const isLink = nodeName === 'LINK';
					const stylesheet = convertDataToStylesheet({
						data,
						isLink,
						root: rootNode
					});
					out.push(stylesheet.sheet);
					return out;
				}, [])
		);
	}

	/**
	 * Get stylesheets from `document`
	 * -> filter out stylesheet that are `media=print`
	 *
	 * @param {Object} rootNode `document`
	 * @returns {Array<Object>}
	 */
	function getStylesheetsFromDocument(rootNode) {
		return Array.from(rootNode.styleSheets).filter(sheet =>
			filterMediaIsPrint(sheet.media.mediaText)
		);
	}

	/**
	 * Get all `<style></style>` and `<link>` attributes
	 * -> limit to only `style` or `link` attributes with `rel=stylesheet` and `media != print`
	 *
	 * @param {Object} node HTMLElement
	 * @returns {Boolean}
	 */
	function filerStyleAndLinkAttributesInDocumentFragment(node) {
		const nodeName = node.nodeName.toUpperCase();
		const linkHref = node.getAttribute('href');
		const linkRel = node.getAttribute('rel');
		const isLink =
			nodeName === 'LINK' &&
			linkHref &&
			linkRel &&
			node.rel.toUpperCase().includes('STYLESHEET');
		const isStyle = nodeName === 'STYLE';
		return isStyle || (isLink && filterMediaIsPrint(node.media));
	}

	/**
	 * Exclude `link[rel='stylesheet]` attributes where `media=print`
	 *
	 * @param {String} media media value eg: 'print'
	 * @returns {Boolean}
	 */
	function filterMediaIsPrint(media) {
		if (!media) {
			return true;
		}
		return !media.toUpperCase().includes('PRINT');
	}

	/**
	 * Exclude any duplicate `stylesheets`, that share the same `href`
	 *
	 * @param {Array<Object>} sheets stylesheets
	 * @returns {Array<Object>}
	 */
	function filterStylesheetsWithSameHref(sheets) {
		let hrefs = [];
		return sheets.filter(sheet => {
			if (!sheet.href) {
				// include sheets without `href`
				return true;
			}
			// if `href` is present, ensure they are not duplicates
			if (hrefs.includes(sheet.href)) {
				return false;
			}
			hrefs.push(sheet.href);
			return true;
		});
	}

	/**
	 * Validated the preload object
	 * @param {Object | boolean} preload configuration object or boolean passed via the options parameter to axe.run
	 * @return {boolean}
	 * @private
	 */
	function isValidPreloadObject(preload) {
		return typeof preload === 'object' && Array.isArray(preload.assets);
	}

	/**
	 * Returns a boolean which decides if preload is configured
	 * @param {Object} options run configuration options (or defaults) passed via axe.run
	 * @return {boolean} defaults to true
	 */
	function shouldPreload(options) {
		if (!options || options.preload === undefined || options.preload === null) {
			return true; // by default `preload` requested assets eg: ['cssom']
		}
		if (typeof options.preload === 'boolean') {
			return options.preload;
		}
		return isValidPreloadObject(options.preload);
	}

	/**
	 * Returns a Promise with results of all requested preload(able) assets. eg: ['cssom'].
	 *
	 * @param {Object} options run configuration options (or defaults) passed via axe.run
	 * @return {Object} Promise
	 */
	function preload(options) {
		const preloadFunctionsMap = {
			cssom: preloadCssom
		};

		const shouldPreload = shouldPreload(options);
		if (!shouldPreload) {
			return Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			const { assets, timeout } = getPreloadConfig(options);

			/**
			 * Start `timeout` timer for preloading assets
			 * -> reject if allowed time expires.
			 */
			setTimeout(() => reject(`Preload assets timed out.`), timeout);

			/**
			 * Fetch requested `assets`
			 */

			Promise.all(
				assets.map(asset =>
					preloadFunctionsMap[asset](options).then(results => {
						return {
							[asset]: results
						};
					})
				)
			).then(results => {
				/**
				 * Combine array of results into an object map
				 *
				 * From ->
				 * 	[{cssom: [...], aom: [...]}]
				 * To ->
				 * 	{
				 * 		cssom: [...]
				 * 	 	aom: [...]
				 * 	}
				 */
				const preloadAssets = results.reduce((out, result) => {
					return {
						...out,
						...result
					};
				}, {});

				resolve(preloadAssets);
			});
		});
	}

	// TODO: axe._audit

	/*global helpers */
	/**
	 * Construct incomplete message from check.data
	 * @param  {Object} checkData Check result with reason specified
	 * @param  {Object} messages Source data object with message options
	 * @return  {String}
	 * @private
	 */
	function getIncompleteReason(checkData, messages) {
		function getDefaultMsg(messages) {
			if (messages.incomplete && messages.incomplete.default) {
				// fall back to the default message if no reason specified
				return messages.incomplete.default;
			} else {
				return helpers.incompleteFallbackMessage();
			}
		}
		if (checkData && checkData.missingData) {
			try {
				var msg = messages.incomplete[checkData.missingData[0].reason];
				if (!msg) {
					throw new Error();
				}
				return msg;
			} catch (e) {
				if (typeof checkData.missingData === 'string') {
					// return a string with the appropriate reason
					return messages.incomplete[checkData.missingData];
				} else {
					return getDefaultMsg(messages);
				}
			}
		} else {
			return getDefaultMsg(messages);
		}
	}
	/**
	 * Extend checksData with the correct result message
	 * @param  {Object} checksData The check result data
	 * @param  {Boolean} shouldBeTrue Result of pass/fail check run
	 * @return {Function}
	 * @private
	 */
	function extender(checksData, shouldBeTrue) {
		return function(check) {
			var sourceData = checksData[check.id] || {};
			var messages = sourceData.messages || {};
			var data = Object.assign({}, sourceData);
			delete data.messages;
			if (check.result === undefined) {
				if (typeof messages.incomplete === 'object') {
					data.message = function() {
						return getIncompleteReason(check.data, messages);
					};
				} else {
					// fall back to string function
					data.message = messages.incomplete;
				}
			} else {
				data.message =
					check.result === shouldBeTrue ? messages.pass : messages.fail;
			}
			extendMetaData(check, data);
		};
	}

	/**
	 * Publish metadata from axe._audit.data
	 * @param  {RuleResult} result Result to publish to
	 * @private
	 */
	function publishMetaData(ruleResult) {
		var checksData = axe._audit.data.checks || {};
		var rulesData = axe._audit.data.rules || {};
		var rule = findBy(axe._audit.rules, 'id', ruleResult.id) || {};

		ruleResult.tags = clone(rule.tags || []);

		var shouldBeTrue = extender(checksData, true);
		var shouldBeFalse = extender(checksData, false);
		ruleResult.nodes.forEach(function(detail) {
			detail.any.forEach(shouldBeTrue);
			detail.all.forEach(shouldBeTrue);
			detail.none.forEach(shouldBeFalse);
		});
		extendMetaData(ruleResult, clone(rulesData[ruleResult.id] || {}));
	}

	// TODO: axe._aduit

	/**
	 * Check if a rule matches the value of runOnly type=tag
	 * @private
	 * @param  {object} rule
	 * @param  {object}	runOnly Value of runOnly with type=tags
	 * @return {bool}
	 */
	function matchTags(rule, runOnly) {
		var include, exclude, matching;
		var defaultExclude =
			axe._audit && axe._audit.tagExclude ? axe._audit.tagExclude : [];

		// normalize include/exclude
		if (
			runOnly.hasOwnProperty('include') ||
			runOnly.hasOwnProperty('exclude')
		) {
			// Wrap include and exclude if it's not already an array
			include = runOnly.include || [];
			include = Array.isArray(include) ? include : [include];

			exclude = runOnly.exclude || [];
			exclude = Array.isArray(exclude) ? exclude : [exclude];
			// add defaults, unless mentioned in include
			exclude = exclude.concat(
				defaultExclude.filter(function(tag) {
					return include.indexOf(tag) === -1;
				})
			);

			// Otherwise, only use the include value, ignore exclude
		} else {
			include = Array.isArray(runOnly) ? runOnly : [runOnly];
			// exclude the defaults not included
			exclude = defaultExclude.filter(function(tag) {
				return include.indexOf(tag) === -1;
			});
		}

		matching = include.some(function(tag) {
			return rule.tags.indexOf(tag) !== -1;
		});
		if (matching || (include.length === 0 && rule.enabled !== false)) {
			return exclude.every(function(tag) {
				return rule.tags.indexOf(tag) === -1;
			});
		} else {
			return false;
		}
	}

	/**
	 * Determines whether a rule should run
	 * @param  {Rule}    rule     The rule to test
	 * @param  {Context} context  The context of the Audit
	 * @param  {Object}  options  Options object
	 * @return {Boolean}
	 */
	function ruleShouldRun(rule, context, options) {
		var runOnly = options.runOnly || {};
		var ruleOptions = (options.rules || {})[rule.id];

		// Never run page level rules if the context is not on the page
		if (rule.pageLevel && !context.page) {
			return false;

			// First, runOnly type rule overrides anything else
		} else if (runOnly.type === 'rule') {
			return runOnly.values.indexOf(rule.id) !== -1;

			// Second, if options.rules[rule].enabled is set, it overrides all
		} else if (ruleOptions && typeof ruleOptions.enabled === 'boolean') {
			return ruleOptions.enabled;

			// Third, if tags are set, look at those
		} else if (runOnly.type === 'tag' && runOnly.values) {
			return matchTags(rule, runOnly.values);

			// If nothing is set, only check for default excludes
		} else {
			return matchTags(rule, []);
		}
	}

	/**
	 * Create an array scroll positions from descending elements
	 */
	function getElmScrollRecursive(root) {
		// Need to also get .childNodes since SVGs in IE don't have .children.
		return Array.from(root.children || root.childNodes || []).reduce(
			(scrolls, elm) => {
				const scroll = axe.utils.getScroll(elm);
				if (scroll) {
					scrolls.push(scroll);
				}
				return scrolls.concat(getElmScrollRecursive(elm));
			},
			[]
		);
	}

	/**
	 * Get the scroll position of all scrollable elements in a page
	 */
	function getScrollState(win = window) {
		const root = win.document.documentElement;
		const windowScroll = [
			win.pageXOffset !== undefined
				? {
						elm: win,
						top: win.pageYOffset,
						left: win.pageXOffset
				  }
				: {
						elm: root,
						top: root.scrollTop,
						left: root.scrollLeft
				  }
		];

		return windowScroll.concat(getElmScrollRecursive(document.body));
	}

	// TODO: axe._selectCache

	/**
	 * Get the deepest node in a given collection
	 * @private
	 * @param  {Array} collection Array of nodes to test
	 * @return {Node}             The deepest node
	 */
	function getDeepest(collection) {
		return collection.sort(function(a, b) {
			if (contains(a, b)) {
				return 1;
			}
			return -1;
		})[0];
	}

	/**
	 * Determines if a node is included or excluded in a given context
	 * @private
	 * @param  {Node}  node     The node to test
	 * @param  {Object}  context "Resolved" context object, @see resolveContext
	 * @return {Boolean}         [description]
	 */
	function isNodeInContext(node, context) {
		const include =
			context.include &&
			getDeepest(
				context.include.filter(function(candidate) {
					return contains(candidate, node);
				})
			);
		const exclude =
			context.exclude &&
			getDeepest(
				context.exclude.filter(function(candidate) {
					return contains(candidate, node);
				})
			);
		if ((!exclude && include) || (exclude && contains(exclude, include))) {
			return true;
		}
		return false;
	}

	/**
	 * Pushes unique nodes that are in context to an array
	 * @private
	 * @param  {Array} result  The array to push to
	 * @param  {Array} nodes   The list of nodes to push
	 * @param  {Object} context The "resolved" context object, @see resolveContext
	 */
	function pushNode(result, nodes) {
		let temp;

		if (result.length === 0) {
			return nodes;
		}
		if (result.length < nodes.length) {
			// switch so the comparison is shortest
			temp = result;
			result = nodes;
			nodes = temp;
		}
		for (let i = 0, l = nodes.length; i < l; i++) {
			if (!result.includes(nodes[i])) {
				result.push(nodes[i]);
			}
		}
		return result;
	}

	/**
	 * reduces the includes list to only the outermost includes
	 * @param {Array} the array of include nodes
	 * @return {Array} the modified array of nodes
	 */
	function reduceIncludes(includes) {
		return includes.reduce((res, el) => {
			if (!res.length || !contains(res[res.length - 1], el)) {
				res.push(el);
			}
			return res;
		}, []);
	}

	/**
	 * Selects elements which match `selector` that are included and excluded via the `Context` object
	 * @param  {String} selector  CSS selector of the HTMLElements to select
	 * @param  {Context} context  The "resolved" context object, @see Context
	 * @return {Array}            Matching virtual DOM nodes sorted by DOM order
	 */
	function select(selector, context) {
		let result = [];
		let candidate;
		if (axe._selectCache) {
			// if used outside of run, it will still work
			for (let j = 0, l = axe._selectCache.length; j < l; j++) {
				// First see whether the item exists in the cache
				const item = axe._selectCache[j];
				if (item.selector === selector) {
					return item.result;
				}
			}
		}
		const curried = (function(context) {
			return function(node) {
				return isNodeInContext(node, context);
			};
		})(context);
		const reducedIncludes = reduceIncludes(context.include);
		for (let i = 0; i < reducedIncludes.length; i++) {
			candidate = reducedIncludes[i];
			result = pushNode(
				result,
				querySelectorAllFilter(candidate, selector, curried)
			);
		}
		if (axe._selectCache) {
			axe._selectCache.push({
				selector: selector,
				result: result
			});
		}
		return result;
	}

	/**
	 * Sends a command to an instance of axe in the specified frame
	 * @param  {Element}  node       The frame element to send the message to
	 * @param  {Object}   parameters Parameters to pass to the frame
	 * @param  {Function} callback   Function to call when results from the frame has returned
	 */
	function sendCommandToFrame$1(node, parameters, resolve, reject) {
		var win = node.contentWindow;
		if (!win) {
			log('Frame does not have a content window', node);
			resolve(null);
			return;
		}

		// give the frame .5s to respond to 'axe.ping', else log failed response
		var timeout = setTimeout(function() {
			// This double timeout is important for allowing iframes to respond
			// DO NOT REMOVE
			timeout = setTimeout(function() {
				if (!parameters.debug) {
					resolve(null);
				} else {
					reject(err('No response from frame', node));
				}
			}, 0);
		}, 500);

		// send 'axe.ping' to the frame
		respondable(win, 'axe.ping', null, undefined, function() {
			clearTimeout(timeout);

			// Give axe 60s (or user-supplied value) to respond to 'axe.start'
			var frameWaitTime =
				(parameters.options && parameters.options.frameWaitTime) || 60000;

			timeout = setTimeout(function() {
				reject(err('Axe in frame timed out', node));
			}, frameWaitTime);

			// send 'axe.start' and send the callback if it responded
			respondable(win, 'axe.start', parameters, undefined, function(data) {
				clearTimeout(timeout);
				if (data instanceof Error === false) {
					resolve(data);
				} else {
					reject(data);
				}
			});
		});
	}

	/**
	 * set the scroll position of an element
	 */
	function setScroll(elm, top, left) {
		if (elm === window) {
			return elm.scroll(left, top);
		} else {
			elm.scrollTop = top;
			elm.scrollLeft = left;
		}
	}

	/**
	 * set the scroll position of all items in the scrollState array
	 */
	function setScrollState(scrollState) {
		scrollState.forEach(({ elm, top, left }) => setScroll(elm, top, left));
	}

	/**
	 * Converts space delimited token list to an Array
	 * @method tokenList
	 * @memberof axe.utils
	 * @param  {String} str
	 * @return {Array}
	 */
	function tokenList(str) {
		return str
			.trim()
			.replace(/\s{2,}/g, ' ')
			.split(' ');
	}

	/**
	 * Returns array of valid input type values
	 * @method validInputTypes
	 * @memberof axe.utils
	 * @return {Array<Sting>}
	 */
	function validInputTypes() {
		// Reference - https://html.spec.whatwg.org/multipage/input.html#the-input-element
		return [
			'hidden',
			'text',
			'search',
			'tel',
			'url',
			'email',
			'password',
			'date',
			'month',
			'week',
			'time',
			'datetime-local',
			'number',
			'range',
			'color',
			'checkbox',
			'radio',
			'file',
			'submit',
			'image',
			'reset',
			'button'
		];
	}

	/*eslint quotes: 0*/
	const langs = [
		'aa',
		'ab',
		'ae',
		'af',
		'ak',
		'am',
		'an',
		'ar',
		'as',
		'av',
		'ay',
		'az',
		'ba',
		'be',
		'bg',
		'bh',
		'bi',
		'bm',
		'bn',
		'bo',
		'br',
		'bs',
		'ca',
		'ce',
		'ch',
		'co',
		'cr',
		'cs',
		'cu',
		'cv',
		'cy',
		'da',
		'de',
		'dv',
		'dz',
		'ee',
		'el',
		'en',
		'eo',
		'es',
		'et',
		'eu',
		'fa',
		'ff',
		'fi',
		'fj',
		'fo',
		'fr',
		'fy',
		'ga',
		'gd',
		'gl',
		'gn',
		'gu',
		'gv',
		'ha',
		'he',
		'hi',
		'ho',
		'hr',
		'ht',
		'hu',
		'hy',
		'hz',
		'ia',
		'id',
		'ie',
		'ig',
		'ii',
		'ik',
		'in',
		'io',
		'is',
		'it',
		'iu',
		'iw',
		'ja',
		'ji',
		'jv',
		'jw',
		'ka',
		'kg',
		'ki',
		'kj',
		'kk',
		'kl',
		'km',
		'kn',
		'ko',
		'kr',
		'ks',
		'ku',
		'kv',
		'kw',
		'ky',
		'la',
		'lb',
		'lg',
		'li',
		'ln',
		'lo',
		'lt',
		'lu',
		'lv',
		'mg',
		'mh',
		'mi',
		'mk',
		'ml',
		'mn',
		'mo',
		'mr',
		'ms',
		'mt',
		'my',
		'na',
		'nb',
		'nd',
		'ne',
		'ng',
		'nl',
		'nn',
		'no',
		'nr',
		'nv',
		'ny',
		'oc',
		'oj',
		'om',
		'or',
		'os',
		'pa',
		'pi',
		'pl',
		'ps',
		'pt',
		'qu',
		'rm',
		'rn',
		'ro',
		'ru',
		'rw',
		'sa',
		'sc',
		'sd',
		'se',
		'sg',
		'sh',
		'si',
		'sk',
		'sl',
		'sm',
		'sn',
		'so',
		'sq',
		'sr',
		'ss',
		'st',
		'su',
		'sv',
		'sw',
		'ta',
		'te',
		'tg',
		'th',
		'ti',
		'tk',
		'tl',
		'tn',
		'to',
		'tr',
		'ts',
		'tt',
		'tw',
		'ty',
		'ug',
		'uk',
		'ur',
		'uz',
		've',
		'vi',
		'vo',
		'wa',
		'wo',
		'xh',
		'yi',
		'yo',
		'za',
		'zh',
		'zu',
		'aaa',
		'aab',
		'aac',
		'aad',
		'aae',
		'aaf',
		'aag',
		'aah',
		'aai',
		'aak',
		'aal',
		'aam',
		'aan',
		'aao',
		'aap',
		'aaq',
		'aas',
		'aat',
		'aau',
		'aav',
		'aaw',
		'aax',
		'aaz',
		'aba',
		'abb',
		'abc',
		'abd',
		'abe',
		'abf',
		'abg',
		'abh',
		'abi',
		'abj',
		'abl',
		'abm',
		'abn',
		'abo',
		'abp',
		'abq',
		'abr',
		'abs',
		'abt',
		'abu',
		'abv',
		'abw',
		'abx',
		'aby',
		'abz',
		'aca',
		'acb',
		'acd',
		'ace',
		'acf',
		'ach',
		'aci',
		'ack',
		'acl',
		'acm',
		'acn',
		'acp',
		'acq',
		'acr',
		'acs',
		'act',
		'acu',
		'acv',
		'acw',
		'acx',
		'acy',
		'acz',
		'ada',
		'adb',
		'add',
		'ade',
		'adf',
		'adg',
		'adh',
		'adi',
		'adj',
		'adl',
		'adn',
		'ado',
		'adp',
		'adq',
		'adr',
		'ads',
		'adt',
		'adu',
		'adw',
		'adx',
		'ady',
		'adz',
		'aea',
		'aeb',
		'aec',
		'aed',
		'aee',
		'aek',
		'ael',
		'aem',
		'aen',
		'aeq',
		'aer',
		'aes',
		'aeu',
		'aew',
		'aey',
		'aez',
		'afa',
		'afb',
		'afd',
		'afe',
		'afg',
		'afh',
		'afi',
		'afk',
		'afn',
		'afo',
		'afp',
		'afs',
		'aft',
		'afu',
		'afz',
		'aga',
		'agb',
		'agc',
		'agd',
		'age',
		'agf',
		'agg',
		'agh',
		'agi',
		'agj',
		'agk',
		'agl',
		'agm',
		'agn',
		'ago',
		'agp',
		'agq',
		'agr',
		'ags',
		'agt',
		'agu',
		'agv',
		'agw',
		'agx',
		'agy',
		'agz',
		'aha',
		'ahb',
		'ahg',
		'ahh',
		'ahi',
		'ahk',
		'ahl',
		'ahm',
		'ahn',
		'aho',
		'ahp',
		'ahr',
		'ahs',
		'aht',
		'aia',
		'aib',
		'aic',
		'aid',
		'aie',
		'aif',
		'aig',
		'aih',
		'aii',
		'aij',
		'aik',
		'ail',
		'aim',
		'ain',
		'aio',
		'aip',
		'aiq',
		'air',
		'ais',
		'ait',
		'aiw',
		'aix',
		'aiy',
		'aja',
		'ajg',
		'aji',
		'ajn',
		'ajp',
		'ajt',
		'aju',
		'ajw',
		'ajz',
		'akb',
		'akc',
		'akd',
		'ake',
		'akf',
		'akg',
		'akh',
		'aki',
		'akj',
		'akk',
		'akl',
		'akm',
		'ako',
		'akp',
		'akq',
		'akr',
		'aks',
		'akt',
		'aku',
		'akv',
		'akw',
		'akx',
		'aky',
		'akz',
		'ala',
		'alc',
		'ald',
		'ale',
		'alf',
		'alg',
		'alh',
		'ali',
		'alj',
		'alk',
		'all',
		'alm',
		'aln',
		'alo',
		'alp',
		'alq',
		'alr',
		'als',
		'alt',
		'alu',
		'alv',
		'alw',
		'alx',
		'aly',
		'alz',
		'ama',
		'amb',
		'amc',
		'ame',
		'amf',
		'amg',
		'ami',
		'amj',
		'amk',
		'aml',
		'amm',
		'amn',
		'amo',
		'amp',
		'amq',
		'amr',
		'ams',
		'amt',
		'amu',
		'amv',
		'amw',
		'amx',
		'amy',
		'amz',
		'ana',
		'anb',
		'anc',
		'and',
		'ane',
		'anf',
		'ang',
		'anh',
		'ani',
		'anj',
		'ank',
		'anl',
		'anm',
		'ann',
		'ano',
		'anp',
		'anq',
		'anr',
		'ans',
		'ant',
		'anu',
		'anv',
		'anw',
		'anx',
		'any',
		'anz',
		'aoa',
		'aob',
		'aoc',
		'aod',
		'aoe',
		'aof',
		'aog',
		'aoh',
		'aoi',
		'aoj',
		'aok',
		'aol',
		'aom',
		'aon',
		'aor',
		'aos',
		'aot',
		'aou',
		'aox',
		'aoz',
		'apa',
		'apb',
		'apc',
		'apd',
		'ape',
		'apf',
		'apg',
		'aph',
		'api',
		'apj',
		'apk',
		'apl',
		'apm',
		'apn',
		'apo',
		'app',
		'apq',
		'apr',
		'aps',
		'apt',
		'apu',
		'apv',
		'apw',
		'apx',
		'apy',
		'apz',
		'aqa',
		'aqc',
		'aqd',
		'aqg',
		'aql',
		'aqm',
		'aqn',
		'aqp',
		'aqr',
		'aqt',
		'aqz',
		'arb',
		'arc',
		'ard',
		'are',
		'arh',
		'ari',
		'arj',
		'ark',
		'arl',
		'arn',
		'aro',
		'arp',
		'arq',
		'arr',
		'ars',
		'art',
		'aru',
		'arv',
		'arw',
		'arx',
		'ary',
		'arz',
		'asa',
		'asb',
		'asc',
		'asd',
		'ase',
		'asf',
		'asg',
		'ash',
		'asi',
		'asj',
		'ask',
		'asl',
		'asn',
		'aso',
		'asp',
		'asq',
		'asr',
		'ass',
		'ast',
		'asu',
		'asv',
		'asw',
		'asx',
		'asy',
		'asz',
		'ata',
		'atb',
		'atc',
		'atd',
		'ate',
		'atg',
		'ath',
		'ati',
		'atj',
		'atk',
		'atl',
		'atm',
		'atn',
		'ato',
		'atp',
		'atq',
		'atr',
		'ats',
		'att',
		'atu',
		'atv',
		'atw',
		'atx',
		'aty',
		'atz',
		'aua',
		'aub',
		'auc',
		'aud',
		'aue',
		'auf',
		'aug',
		'auh',
		'aui',
		'auj',
		'auk',
		'aul',
		'aum',
		'aun',
		'auo',
		'aup',
		'auq',
		'aur',
		'aus',
		'aut',
		'auu',
		'auw',
		'aux',
		'auy',
		'auz',
		'avb',
		'avd',
		'avi',
		'avk',
		'avl',
		'avm',
		'avn',
		'avo',
		'avs',
		'avt',
		'avu',
		'avv',
		'awa',
		'awb',
		'awc',
		'awd',
		'awe',
		'awg',
		'awh',
		'awi',
		'awk',
		'awm',
		'awn',
		'awo',
		'awr',
		'aws',
		'awt',
		'awu',
		'awv',
		'aww',
		'awx',
		'awy',
		'axb',
		'axe',
		'axg',
		'axk',
		'axl',
		'axm',
		'axx',
		'aya',
		'ayb',
		'ayc',
		'ayd',
		'aye',
		'ayg',
		'ayh',
		'ayi',
		'ayk',
		'ayl',
		'ayn',
		'ayo',
		'ayp',
		'ayq',
		'ayr',
		'ays',
		'ayt',
		'ayu',
		'ayx',
		'ayy',
		'ayz',
		'aza',
		'azb',
		'azc',
		'azd',
		'azg',
		'azj',
		'azm',
		'azn',
		'azo',
		'azt',
		'azz',
		'baa',
		'bab',
		'bac',
		'bad',
		'bae',
		'baf',
		'bag',
		'bah',
		'bai',
		'baj',
		'bal',
		'ban',
		'bao',
		'bap',
		'bar',
		'bas',
		'bat',
		'bau',
		'bav',
		'baw',
		'bax',
		'bay',
		'baz',
		'bba',
		'bbb',
		'bbc',
		'bbd',
		'bbe',
		'bbf',
		'bbg',
		'bbh',
		'bbi',
		'bbj',
		'bbk',
		'bbl',
		'bbm',
		'bbn',
		'bbo',
		'bbp',
		'bbq',
		'bbr',
		'bbs',
		'bbt',
		'bbu',
		'bbv',
		'bbw',
		'bbx',
		'bby',
		'bbz',
		'bca',
		'bcb',
		'bcc',
		'bcd',
		'bce',
		'bcf',
		'bcg',
		'bch',
		'bci',
		'bcj',
		'bck',
		'bcl',
		'bcm',
		'bcn',
		'bco',
		'bcp',
		'bcq',
		'bcr',
		'bcs',
		'bct',
		'bcu',
		'bcv',
		'bcw',
		'bcy',
		'bcz',
		'bda',
		'bdb',
		'bdc',
		'bdd',
		'bde',
		'bdf',
		'bdg',
		'bdh',
		'bdi',
		'bdj',
		'bdk',
		'bdl',
		'bdm',
		'bdn',
		'bdo',
		'bdp',
		'bdq',
		'bdr',
		'bds',
		'bdt',
		'bdu',
		'bdv',
		'bdw',
		'bdx',
		'bdy',
		'bdz',
		'bea',
		'beb',
		'bec',
		'bed',
		'bee',
		'bef',
		'beg',
		'beh',
		'bei',
		'bej',
		'bek',
		'bem',
		'beo',
		'bep',
		'beq',
		'ber',
		'bes',
		'bet',
		'beu',
		'bev',
		'bew',
		'bex',
		'bey',
		'bez',
		'bfa',
		'bfb',
		'bfc',
		'bfd',
		'bfe',
		'bff',
		'bfg',
		'bfh',
		'bfi',
		'bfj',
		'bfk',
		'bfl',
		'bfm',
		'bfn',
		'bfo',
		'bfp',
		'bfq',
		'bfr',
		'bfs',
		'bft',
		'bfu',
		'bfw',
		'bfx',
		'bfy',
		'bfz',
		'bga',
		'bgb',
		'bgc',
		'bgd',
		'bge',
		'bgf',
		'bgg',
		'bgi',
		'bgj',
		'bgk',
		'bgl',
		'bgm',
		'bgn',
		'bgo',
		'bgp',
		'bgq',
		'bgr',
		'bgs',
		'bgt',
		'bgu',
		'bgv',
		'bgw',
		'bgx',
		'bgy',
		'bgz',
		'bha',
		'bhb',
		'bhc',
		'bhd',
		'bhe',
		'bhf',
		'bhg',
		'bhh',
		'bhi',
		'bhj',
		'bhk',
		'bhl',
		'bhm',
		'bhn',
		'bho',
		'bhp',
		'bhq',
		'bhr',
		'bhs',
		'bht',
		'bhu',
		'bhv',
		'bhw',
		'bhx',
		'bhy',
		'bhz',
		'bia',
		'bib',
		'bic',
		'bid',
		'bie',
		'bif',
		'big',
		'bij',
		'bik',
		'bil',
		'bim',
		'bin',
		'bio',
		'bip',
		'biq',
		'bir',
		'bit',
		'biu',
		'biv',
		'biw',
		'bix',
		'biy',
		'biz',
		'bja',
		'bjb',
		'bjc',
		'bjd',
		'bje',
		'bjf',
		'bjg',
		'bjh',
		'bji',
		'bjj',
		'bjk',
		'bjl',
		'bjm',
		'bjn',
		'bjo',
		'bjp',
		'bjq',
		'bjr',
		'bjs',
		'bjt',
		'bju',
		'bjv',
		'bjw',
		'bjx',
		'bjy',
		'bjz',
		'bka',
		'bkb',
		'bkc',
		'bkd',
		'bkf',
		'bkg',
		'bkh',
		'bki',
		'bkj',
		'bkk',
		'bkl',
		'bkm',
		'bkn',
		'bko',
		'bkp',
		'bkq',
		'bkr',
		'bks',
		'bkt',
		'bku',
		'bkv',
		'bkw',
		'bkx',
		'bky',
		'bkz',
		'bla',
		'blb',
		'blc',
		'bld',
		'ble',
		'blf',
		'blg',
		'blh',
		'bli',
		'blj',
		'blk',
		'bll',
		'blm',
		'bln',
		'blo',
		'blp',
		'blq',
		'blr',
		'bls',
		'blt',
		'blv',
		'blw',
		'blx',
		'bly',
		'blz',
		'bma',
		'bmb',
		'bmc',
		'bmd',
		'bme',
		'bmf',
		'bmg',
		'bmh',
		'bmi',
		'bmj',
		'bmk',
		'bml',
		'bmm',
		'bmn',
		'bmo',
		'bmp',
		'bmq',
		'bmr',
		'bms',
		'bmt',
		'bmu',
		'bmv',
		'bmw',
		'bmx',
		'bmy',
		'bmz',
		'bna',
		'bnb',
		'bnc',
		'bnd',
		'bne',
		'bnf',
		'bng',
		'bni',
		'bnj',
		'bnk',
		'bnl',
		'bnm',
		'bnn',
		'bno',
		'bnp',
		'bnq',
		'bnr',
		'bns',
		'bnt',
		'bnu',
		'bnv',
		'bnw',
		'bnx',
		'bny',
		'bnz',
		'boa',
		'bob',
		'boe',
		'bof',
		'bog',
		'boh',
		'boi',
		'boj',
		'bok',
		'bol',
		'bom',
		'bon',
		'boo',
		'bop',
		'boq',
		'bor',
		'bot',
		'bou',
		'bov',
		'bow',
		'box',
		'boy',
		'boz',
		'bpa',
		'bpb',
		'bpd',
		'bpg',
		'bph',
		'bpi',
		'bpj',
		'bpk',
		'bpl',
		'bpm',
		'bpn',
		'bpo',
		'bpp',
		'bpq',
		'bpr',
		'bps',
		'bpt',
		'bpu',
		'bpv',
		'bpw',
		'bpx',
		'bpy',
		'bpz',
		'bqa',
		'bqb',
		'bqc',
		'bqd',
		'bqf',
		'bqg',
		'bqh',
		'bqi',
		'bqj',
		'bqk',
		'bql',
		'bqm',
		'bqn',
		'bqo',
		'bqp',
		'bqq',
		'bqr',
		'bqs',
		'bqt',
		'bqu',
		'bqv',
		'bqw',
		'bqx',
		'bqy',
		'bqz',
		'bra',
		'brb',
		'brc',
		'brd',
		'brf',
		'brg',
		'brh',
		'bri',
		'brj',
		'brk',
		'brl',
		'brm',
		'brn',
		'bro',
		'brp',
		'brq',
		'brr',
		'brs',
		'brt',
		'bru',
		'brv',
		'brw',
		'brx',
		'bry',
		'brz',
		'bsa',
		'bsb',
		'bsc',
		'bse',
		'bsf',
		'bsg',
		'bsh',
		'bsi',
		'bsj',
		'bsk',
		'bsl',
		'bsm',
		'bsn',
		'bso',
		'bsp',
		'bsq',
		'bsr',
		'bss',
		'bst',
		'bsu',
		'bsv',
		'bsw',
		'bsx',
		'bsy',
		'bta',
		'btb',
		'btc',
		'btd',
		'bte',
		'btf',
		'btg',
		'bth',
		'bti',
		'btj',
		'btk',
		'btl',
		'btm',
		'btn',
		'bto',
		'btp',
		'btq',
		'btr',
		'bts',
		'btt',
		'btu',
		'btv',
		'btw',
		'btx',
		'bty',
		'btz',
		'bua',
		'bub',
		'buc',
		'bud',
		'bue',
		'buf',
		'bug',
		'buh',
		'bui',
		'buj',
		'buk',
		'bum',
		'bun',
		'buo',
		'bup',
		'buq',
		'bus',
		'but',
		'buu',
		'buv',
		'buw',
		'bux',
		'buy',
		'buz',
		'bva',
		'bvb',
		'bvc',
		'bvd',
		'bve',
		'bvf',
		'bvg',
		'bvh',
		'bvi',
		'bvj',
		'bvk',
		'bvl',
		'bvm',
		'bvn',
		'bvo',
		'bvp',
		'bvq',
		'bvr',
		'bvt',
		'bvu',
		'bvv',
		'bvw',
		'bvx',
		'bvy',
		'bvz',
		'bwa',
		'bwb',
		'bwc',
		'bwd',
		'bwe',
		'bwf',
		'bwg',
		'bwh',
		'bwi',
		'bwj',
		'bwk',
		'bwl',
		'bwm',
		'bwn',
		'bwo',
		'bwp',
		'bwq',
		'bwr',
		'bws',
		'bwt',
		'bwu',
		'bww',
		'bwx',
		'bwy',
		'bwz',
		'bxa',
		'bxb',
		'bxc',
		'bxd',
		'bxe',
		'bxf',
		'bxg',
		'bxh',
		'bxi',
		'bxj',
		'bxk',
		'bxl',
		'bxm',
		'bxn',
		'bxo',
		'bxp',
		'bxq',
		'bxr',
		'bxs',
		'bxu',
		'bxv',
		'bxw',
		'bxx',
		'bxz',
		'bya',
		'byb',
		'byc',
		'byd',
		'bye',
		'byf',
		'byg',
		'byh',
		'byi',
		'byj',
		'byk',
		'byl',
		'bym',
		'byn',
		'byo',
		'byp',
		'byq',
		'byr',
		'bys',
		'byt',
		'byv',
		'byw',
		'byx',
		'byy',
		'byz',
		'bza',
		'bzb',
		'bzc',
		'bzd',
		'bze',
		'bzf',
		'bzg',
		'bzh',
		'bzi',
		'bzj',
		'bzk',
		'bzl',
		'bzm',
		'bzn',
		'bzo',
		'bzp',
		'bzq',
		'bzr',
		'bzs',
		'bzt',
		'bzu',
		'bzv',
		'bzw',
		'bzx',
		'bzy',
		'bzz',
		'caa',
		'cab',
		'cac',
		'cad',
		'cae',
		'caf',
		'cag',
		'cah',
		'cai',
		'caj',
		'cak',
		'cal',
		'cam',
		'can',
		'cao',
		'cap',
		'caq',
		'car',
		'cas',
		'cau',
		'cav',
		'caw',
		'cax',
		'cay',
		'caz',
		'cba',
		'cbb',
		'cbc',
		'cbd',
		'cbe',
		'cbg',
		'cbh',
		'cbi',
		'cbj',
		'cbk',
		'cbl',
		'cbn',
		'cbo',
		'cbq',
		'cbr',
		'cbs',
		'cbt',
		'cbu',
		'cbv',
		'cbw',
		'cby',
		'cca',
		'ccc',
		'ccd',
		'cce',
		'ccg',
		'cch',
		'ccj',
		'ccl',
		'ccm',
		'ccn',
		'cco',
		'ccp',
		'ccq',
		'ccr',
		'ccs',
		'cda',
		'cdc',
		'cdd',
		'cde',
		'cdf',
		'cdg',
		'cdh',
		'cdi',
		'cdj',
		'cdm',
		'cdn',
		'cdo',
		'cdr',
		'cds',
		'cdy',
		'cdz',
		'cea',
		'ceb',
		'ceg',
		'cek',
		'cel',
		'cen',
		'cet',
		'cfa',
		'cfd',
		'cfg',
		'cfm',
		'cga',
		'cgc',
		'cgg',
		'cgk',
		'chb',
		'chc',
		'chd',
		'chf',
		'chg',
		'chh',
		'chj',
		'chk',
		'chl',
		'chm',
		'chn',
		'cho',
		'chp',
		'chq',
		'chr',
		'cht',
		'chw',
		'chx',
		'chy',
		'chz',
		'cia',
		'cib',
		'cic',
		'cid',
		'cie',
		'cih',
		'cik',
		'cim',
		'cin',
		'cip',
		'cir',
		'ciw',
		'ciy',
		'cja',
		'cje',
		'cjh',
		'cji',
		'cjk',
		'cjm',
		'cjn',
		'cjo',
		'cjp',
		'cjr',
		'cjs',
		'cjv',
		'cjy',
		'cka',
		'ckb',
		'ckh',
		'ckl',
		'ckn',
		'cko',
		'ckq',
		'ckr',
		'cks',
		'ckt',
		'cku',
		'ckv',
		'ckx',
		'cky',
		'ckz',
		'cla',
		'clc',
		'cld',
		'cle',
		'clh',
		'cli',
		'clj',
		'clk',
		'cll',
		'clm',
		'clo',
		'clt',
		'clu',
		'clw',
		'cly',
		'cma',
		'cmc',
		'cme',
		'cmg',
		'cmi',
		'cmk',
		'cml',
		'cmm',
		'cmn',
		'cmo',
		'cmr',
		'cms',
		'cmt',
		'cna',
		'cnb',
		'cnc',
		'cng',
		'cnh',
		'cni',
		'cnk',
		'cnl',
		'cno',
		'cnr',
		'cns',
		'cnt',
		'cnu',
		'cnw',
		'cnx',
		'coa',
		'cob',
		'coc',
		'cod',
		'coe',
		'cof',
		'cog',
		'coh',
		'coj',
		'cok',
		'col',
		'com',
		'con',
		'coo',
		'cop',
		'coq',
		'cot',
		'cou',
		'cov',
		'cow',
		'cox',
		'coy',
		'coz',
		'cpa',
		'cpb',
		'cpc',
		'cpe',
		'cpf',
		'cpg',
		'cpi',
		'cpn',
		'cpo',
		'cpp',
		'cps',
		'cpu',
		'cpx',
		'cpy',
		'cqd',
		'cqu',
		'cra',
		'crb',
		'crc',
		'crd',
		'crf',
		'crg',
		'crh',
		'cri',
		'crj',
		'crk',
		'crl',
		'crm',
		'crn',
		'cro',
		'crp',
		'crq',
		'crr',
		'crs',
		'crt',
		'crv',
		'crw',
		'crx',
		'cry',
		'crz',
		'csa',
		'csb',
		'csc',
		'csd',
		'cse',
		'csf',
		'csg',
		'csh',
		'csi',
		'csj',
		'csk',
		'csl',
		'csm',
		'csn',
		'cso',
		'csq',
		'csr',
		'css',
		'cst',
		'csu',
		'csv',
		'csw',
		'csy',
		'csz',
		'cta',
		'ctc',
		'ctd',
		'cte',
		'ctg',
		'cth',
		'ctl',
		'ctm',
		'ctn',
		'cto',
		'ctp',
		'cts',
		'ctt',
		'ctu',
		'ctz',
		'cua',
		'cub',
		'cuc',
		'cug',
		'cuh',
		'cui',
		'cuj',
		'cuk',
		'cul',
		'cum',
		'cuo',
		'cup',
		'cuq',
		'cur',
		'cus',
		'cut',
		'cuu',
		'cuv',
		'cuw',
		'cux',
		'cuy',
		'cvg',
		'cvn',
		'cwa',
		'cwb',
		'cwd',
		'cwe',
		'cwg',
		'cwt',
		'cya',
		'cyb',
		'cyo',
		'czh',
		'czk',
		'czn',
		'czo',
		'czt',
		'daa',
		'dac',
		'dad',
		'dae',
		'daf',
		'dag',
		'dah',
		'dai',
		'daj',
		'dak',
		'dal',
		'dam',
		'dao',
		'dap',
		'daq',
		'dar',
		'das',
		'dau',
		'dav',
		'daw',
		'dax',
		'day',
		'daz',
		'dba',
		'dbb',
		'dbd',
		'dbe',
		'dbf',
		'dbg',
		'dbi',
		'dbj',
		'dbl',
		'dbm',
		'dbn',
		'dbo',
		'dbp',
		'dbq',
		'dbr',
		'dbt',
		'dbu',
		'dbv',
		'dbw',
		'dby',
		'dcc',
		'dcr',
		'dda',
		'ddd',
		'dde',
		'ddg',
		'ddi',
		'ddj',
		'ddn',
		'ddo',
		'ddr',
		'dds',
		'ddw',
		'dec',
		'ded',
		'dee',
		'def',
		'deg',
		'deh',
		'dei',
		'dek',
		'del',
		'dem',
		'den',
		'dep',
		'deq',
		'der',
		'des',
		'dev',
		'dez',
		'dga',
		'dgb',
		'dgc',
		'dgd',
		'dge',
		'dgg',
		'dgh',
		'dgi',
		'dgk',
		'dgl',
		'dgn',
		'dgo',
		'dgr',
		'dgs',
		'dgt',
		'dgu',
		'dgw',
		'dgx',
		'dgz',
		'dha',
		'dhd',
		'dhg',
		'dhi',
		'dhl',
		'dhm',
		'dhn',
		'dho',
		'dhr',
		'dhs',
		'dhu',
		'dhv',
		'dhw',
		'dhx',
		'dia',
		'dib',
		'dic',
		'did',
		'dif',
		'dig',
		'dih',
		'dii',
		'dij',
		'dik',
		'dil',
		'dim',
		'din',
		'dio',
		'dip',
		'diq',
		'dir',
		'dis',
		'dit',
		'diu',
		'diw',
		'dix',
		'diy',
		'diz',
		'dja',
		'djb',
		'djc',
		'djd',
		'dje',
		'djf',
		'dji',
		'djj',
		'djk',
		'djl',
		'djm',
		'djn',
		'djo',
		'djr',
		'dju',
		'djw',
		'dka',
		'dkk',
		'dkl',
		'dkr',
		'dks',
		'dkx',
		'dlg',
		'dlk',
		'dlm',
		'dln',
		'dma',
		'dmb',
		'dmc',
		'dmd',
		'dme',
		'dmg',
		'dmk',
		'dml',
		'dmm',
		'dmn',
		'dmo',
		'dmr',
		'dms',
		'dmu',
		'dmv',
		'dmw',
		'dmx',
		'dmy',
		'dna',
		'dnd',
		'dne',
		'dng',
		'dni',
		'dnj',
		'dnk',
		'dnn',
		'dnr',
		'dnt',
		'dnu',
		'dnv',
		'dnw',
		'dny',
		'doa',
		'dob',
		'doc',
		'doe',
		'dof',
		'doh',
		'doi',
		'dok',
		'dol',
		'don',
		'doo',
		'dop',
		'doq',
		'dor',
		'dos',
		'dot',
		'dov',
		'dow',
		'dox',
		'doy',
		'doz',
		'dpp',
		'dra',
		'drb',
		'drc',
		'drd',
		'dre',
		'drg',
		'drh',
		'dri',
		'drl',
		'drn',
		'dro',
		'drq',
		'drr',
		'drs',
		'drt',
		'dru',
		'drw',
		'dry',
		'dsb',
		'dse',
		'dsh',
		'dsi',
		'dsl',
		'dsn',
		'dso',
		'dsq',
		'dta',
		'dtb',
		'dtd',
		'dth',
		'dti',
		'dtk',
		'dtm',
		'dtn',
		'dto',
		'dtp',
		'dtr',
		'dts',
		'dtt',
		'dtu',
		'dty',
		'dua',
		'dub',
		'duc',
		'dud',
		'due',
		'duf',
		'dug',
		'duh',
		'dui',
		'duj',
		'duk',
		'dul',
		'dum',
		'dun',
		'duo',
		'dup',
		'duq',
		'dur',
		'dus',
		'duu',
		'duv',
		'duw',
		'dux',
		'duy',
		'duz',
		'dva',
		'dwa',
		'dwl',
		'dwr',
		'dws',
		'dwu',
		'dww',
		'dwy',
		'dya',
		'dyb',
		'dyd',
		'dyg',
		'dyi',
		'dym',
		'dyn',
		'dyo',
		'dyu',
		'dyy',
		'dza',
		'dzd',
		'dze',
		'dzg',
		'dzl',
		'dzn',
		'eaa',
		'ebg',
		'ebk',
		'ebo',
		'ebr',
		'ebu',
		'ecr',
		'ecs',
		'ecy',
		'eee',
		'efa',
		'efe',
		'efi',
		'ega',
		'egl',
		'ego',
		'egx',
		'egy',
		'ehu',
		'eip',
		'eit',
		'eiv',
		'eja',
		'eka',
		'ekc',
		'eke',
		'ekg',
		'eki',
		'ekk',
		'ekl',
		'ekm',
		'eko',
		'ekp',
		'ekr',
		'eky',
		'ele',
		'elh',
		'eli',
		'elk',
		'elm',
		'elo',
		'elp',
		'elu',
		'elx',
		'ema',
		'emb',
		'eme',
		'emg',
		'emi',
		'emk',
		'emm',
		'emn',
		'emo',
		'emp',
		'ems',
		'emu',
		'emw',
		'emx',
		'emy',
		'ena',
		'enb',
		'enc',
		'end',
		'enf',
		'enh',
		'enl',
		'enm',
		'enn',
		'eno',
		'enq',
		'enr',
		'enu',
		'env',
		'enw',
		'enx',
		'eot',
		'epi',
		'era',
		'erg',
		'erh',
		'eri',
		'erk',
		'ero',
		'err',
		'ers',
		'ert',
		'erw',
		'ese',
		'esg',
		'esh',
		'esi',
		'esk',
		'esl',
		'esm',
		'esn',
		'eso',
		'esq',
		'ess',
		'esu',
		'esx',
		'esy',
		'etb',
		'etc',
		'eth',
		'etn',
		'eto',
		'etr',
		'ets',
		'ett',
		'etu',
		'etx',
		'etz',
		'euq',
		'eve',
		'evh',
		'evn',
		'ewo',
		'ext',
		'eya',
		'eyo',
		'eza',
		'eze',
		'faa',
		'fab',
		'fad',
		'faf',
		'fag',
		'fah',
		'fai',
		'faj',
		'fak',
		'fal',
		'fam',
		'fan',
		'fap',
		'far',
		'fat',
		'fau',
		'fax',
		'fay',
		'faz',
		'fbl',
		'fcs',
		'fer',
		'ffi',
		'ffm',
		'fgr',
		'fia',
		'fie',
		'fil',
		'fip',
		'fir',
		'fit',
		'fiu',
		'fiw',
		'fkk',
		'fkv',
		'fla',
		'flh',
		'fli',
		'fll',
		'fln',
		'flr',
		'fly',
		'fmp',
		'fmu',
		'fnb',
		'fng',
		'fni',
		'fod',
		'foi',
		'fom',
		'fon',
		'for',
		'fos',
		'fox',
		'fpe',
		'fqs',
		'frc',
		'frd',
		'frk',
		'frm',
		'fro',
		'frp',
		'frq',
		'frr',
		'frs',
		'frt',
		'fse',
		'fsl',
		'fss',
		'fub',
		'fuc',
		'fud',
		'fue',
		'fuf',
		'fuh',
		'fui',
		'fuj',
		'fum',
		'fun',
		'fuq',
		'fur',
		'fut',
		'fuu',
		'fuv',
		'fuy',
		'fvr',
		'fwa',
		'fwe',
		'gaa',
		'gab',
		'gac',
		'gad',
		'gae',
		'gaf',
		'gag',
		'gah',
		'gai',
		'gaj',
		'gak',
		'gal',
		'gam',
		'gan',
		'gao',
		'gap',
		'gaq',
		'gar',
		'gas',
		'gat',
		'gau',
		'gav',
		'gaw',
		'gax',
		'gay',
		'gaz',
		'gba',
		'gbb',
		'gbc',
		'gbd',
		'gbe',
		'gbf',
		'gbg',
		'gbh',
		'gbi',
		'gbj',
		'gbk',
		'gbl',
		'gbm',
		'gbn',
		'gbo',
		'gbp',
		'gbq',
		'gbr',
		'gbs',
		'gbu',
		'gbv',
		'gbw',
		'gbx',
		'gby',
		'gbz',
		'gcc',
		'gcd',
		'gce',
		'gcf',
		'gcl',
		'gcn',
		'gcr',
		'gct',
		'gda',
		'gdb',
		'gdc',
		'gdd',
		'gde',
		'gdf',
		'gdg',
		'gdh',
		'gdi',
		'gdj',
		'gdk',
		'gdl',
		'gdm',
		'gdn',
		'gdo',
		'gdq',
		'gdr',
		'gds',
		'gdt',
		'gdu',
		'gdx',
		'gea',
		'geb',
		'gec',
		'ged',
		'geg',
		'geh',
		'gei',
		'gej',
		'gek',
		'gel',
		'gem',
		'geq',
		'ges',
		'gev',
		'gew',
		'gex',
		'gey',
		'gez',
		'gfk',
		'gft',
		'gfx',
		'gga',
		'ggb',
		'ggd',
		'gge',
		'ggg',
		'ggk',
		'ggl',
		'ggn',
		'ggo',
		'ggr',
		'ggt',
		'ggu',
		'ggw',
		'gha',
		'ghc',
		'ghe',
		'ghh',
		'ghk',
		'ghl',
		'ghn',
		'gho',
		'ghr',
		'ghs',
		'ght',
		'gia',
		'gib',
		'gic',
		'gid',
		'gie',
		'gig',
		'gih',
		'gil',
		'gim',
		'gin',
		'gio',
		'gip',
		'giq',
		'gir',
		'gis',
		'git',
		'giu',
		'giw',
		'gix',
		'giy',
		'giz',
		'gji',
		'gjk',
		'gjm',
		'gjn',
		'gjr',
		'gju',
		'gka',
		'gkd',
		'gke',
		'gkn',
		'gko',
		'gkp',
		'gku',
		'glc',
		'gld',
		'glh',
		'gli',
		'glj',
		'glk',
		'gll',
		'glo',
		'glr',
		'glu',
		'glw',
		'gly',
		'gma',
		'gmb',
		'gmd',
		'gme',
		'gmg',
		'gmh',
		'gml',
		'gmm',
		'gmn',
		'gmq',
		'gmu',
		'gmv',
		'gmw',
		'gmx',
		'gmy',
		'gmz',
		'gna',
		'gnb',
		'gnc',
		'gnd',
		'gne',
		'gng',
		'gnh',
		'gni',
		'gnj',
		'gnk',
		'gnl',
		'gnm',
		'gnn',
		'gno',
		'gnq',
		'gnr',
		'gnt',
		'gnu',
		'gnw',
		'gnz',
		'goa',
		'gob',
		'goc',
		'god',
		'goe',
		'gof',
		'gog',
		'goh',
		'goi',
		'goj',
		'gok',
		'gol',
		'gom',
		'gon',
		'goo',
		'gop',
		'goq',
		'gor',
		'gos',
		'got',
		'gou',
		'gow',
		'gox',
		'goy',
		'goz',
		'gpa',
		'gpe',
		'gpn',
		'gqa',
		'gqi',
		'gqn',
		'gqr',
		'gqu',
		'gra',
		'grb',
		'grc',
		'grd',
		'grg',
		'grh',
		'gri',
		'grj',
		'grk',
		'grm',
		'gro',
		'grq',
		'grr',
		'grs',
		'grt',
		'gru',
		'grv',
		'grw',
		'grx',
		'gry',
		'grz',
		'gse',
		'gsg',
		'gsl',
		'gsm',
		'gsn',
		'gso',
		'gsp',
		'gss',
		'gsw',
		'gta',
		'gti',
		'gtu',
		'gua',
		'gub',
		'guc',
		'gud',
		'gue',
		'guf',
		'gug',
		'guh',
		'gui',
		'guk',
		'gul',
		'gum',
		'gun',
		'guo',
		'gup',
		'guq',
		'gur',
		'gus',
		'gut',
		'guu',
		'guv',
		'guw',
		'gux',
		'guz',
		'gva',
		'gvc',
		'gve',
		'gvf',
		'gvj',
		'gvl',
		'gvm',
		'gvn',
		'gvo',
		'gvp',
		'gvr',
		'gvs',
		'gvy',
		'gwa',
		'gwb',
		'gwc',
		'gwd',
		'gwe',
		'gwf',
		'gwg',
		'gwi',
		'gwj',
		'gwm',
		'gwn',
		'gwr',
		'gwt',
		'gwu',
		'gww',
		'gwx',
		'gxx',
		'gya',
		'gyb',
		'gyd',
		'gye',
		'gyf',
		'gyg',
		'gyi',
		'gyl',
		'gym',
		'gyn',
		'gyo',
		'gyr',
		'gyy',
		'gza',
		'gzi',
		'gzn',
		'haa',
		'hab',
		'hac',
		'had',
		'hae',
		'haf',
		'hag',
		'hah',
		'hai',
		'haj',
		'hak',
		'hal',
		'ham',
		'han',
		'hao',
		'hap',
		'haq',
		'har',
		'has',
		'hav',
		'haw',
		'hax',
		'hay',
		'haz',
		'hba',
		'hbb',
		'hbn',
		'hbo',
		'hbu',
		'hca',
		'hch',
		'hdn',
		'hds',
		'hdy',
		'hea',
		'hed',
		'heg',
		'heh',
		'hei',
		'hem',
		'hgm',
		'hgw',
		'hhi',
		'hhr',
		'hhy',
		'hia',
		'hib',
		'hid',
		'hif',
		'hig',
		'hih',
		'hii',
		'hij',
		'hik',
		'hil',
		'him',
		'hio',
		'hir',
		'hit',
		'hiw',
		'hix',
		'hji',
		'hka',
		'hke',
		'hkk',
		'hkn',
		'hks',
		'hla',
		'hlb',
		'hld',
		'hle',
		'hlt',
		'hlu',
		'hma',
		'hmb',
		'hmc',
		'hmd',
		'hme',
		'hmf',
		'hmg',
		'hmh',
		'hmi',
		'hmj',
		'hmk',
		'hml',
		'hmm',
		'hmn',
		'hmp',
		'hmq',
		'hmr',
		'hms',
		'hmt',
		'hmu',
		'hmv',
		'hmw',
		'hmx',
		'hmy',
		'hmz',
		'hna',
		'hnd',
		'hne',
		'hnh',
		'hni',
		'hnj',
		'hnn',
		'hno',
		'hns',
		'hnu',
		'hoa',
		'hob',
		'hoc',
		'hod',
		'hoe',
		'hoh',
		'hoi',
		'hoj',
		'hok',
		'hol',
		'hom',
		'hoo',
		'hop',
		'hor',
		'hos',
		'hot',
		'hov',
		'how',
		'hoy',
		'hoz',
		'hpo',
		'hps',
		'hra',
		'hrc',
		'hre',
		'hrk',
		'hrm',
		'hro',
		'hrp',
		'hrr',
		'hrt',
		'hru',
		'hrw',
		'hrx',
		'hrz',
		'hsb',
		'hsh',
		'hsl',
		'hsn',
		'hss',
		'hti',
		'hto',
		'hts',
		'htu',
		'htx',
		'hub',
		'huc',
		'hud',
		'hue',
		'huf',
		'hug',
		'huh',
		'hui',
		'huj',
		'huk',
		'hul',
		'hum',
		'huo',
		'hup',
		'huq',
		'hur',
		'hus',
		'hut',
		'huu',
		'huv',
		'huw',
		'hux',
		'huy',
		'huz',
		'hvc',
		'hve',
		'hvk',
		'hvn',
		'hvv',
		'hwa',
		'hwc',
		'hwo',
		'hya',
		'hyw',
		'hyx',
		'iai',
		'ian',
		'iap',
		'iar',
		'iba',
		'ibb',
		'ibd',
		'ibe',
		'ibg',
		'ibh',
		'ibi',
		'ibl',
		'ibm',
		'ibn',
		'ibr',
		'ibu',
		'iby',
		'ica',
		'ich',
		'icl',
		'icr',
		'ida',
		'idb',
		'idc',
		'idd',
		'ide',
		'idi',
		'idr',
		'ids',
		'idt',
		'idu',
		'ifa',
		'ifb',
		'ife',
		'iff',
		'ifk',
		'ifm',
		'ifu',
		'ify',
		'igb',
		'ige',
		'igg',
		'igl',
		'igm',
		'ign',
		'igo',
		'igs',
		'igw',
		'ihb',
		'ihi',
		'ihp',
		'ihw',
		'iin',
		'iir',
		'ijc',
		'ije',
		'ijj',
		'ijn',
		'ijo',
		'ijs',
		'ike',
		'iki',
		'ikk',
		'ikl',
		'iko',
		'ikp',
		'ikr',
		'iks',
		'ikt',
		'ikv',
		'ikw',
		'ikx',
		'ikz',
		'ila',
		'ilb',
		'ilg',
		'ili',
		'ilk',
		'ill',
		'ilm',
		'ilo',
		'ilp',
		'ils',
		'ilu',
		'ilv',
		'ilw',
		'ima',
		'ime',
		'imi',
		'iml',
		'imn',
		'imo',
		'imr',
		'ims',
		'imy',
		'inb',
		'inc',
		'ine',
		'ing',
		'inh',
		'inj',
		'inl',
		'inm',
		'inn',
		'ino',
		'inp',
		'ins',
		'int',
		'inz',
		'ior',
		'iou',
		'iow',
		'ipi',
		'ipo',
		'iqu',
		'iqw',
		'ira',
		'ire',
		'irh',
		'iri',
		'irk',
		'irn',
		'iro',
		'irr',
		'iru',
		'irx',
		'iry',
		'isa',
		'isc',
		'isd',
		'ise',
		'isg',
		'ish',
		'isi',
		'isk',
		'ism',
		'isn',
		'iso',
		'isr',
		'ist',
		'isu',
		'itb',
		'itc',
		'itd',
		'ite',
		'iti',
		'itk',
		'itl',
		'itm',
		'ito',
		'itr',
		'its',
		'itt',
		'itv',
		'itw',
		'itx',
		'ity',
		'itz',
		'ium',
		'ivb',
		'ivv',
		'iwk',
		'iwm',
		'iwo',
		'iws',
		'ixc',
		'ixl',
		'iya',
		'iyo',
		'iyx',
		'izh',
		'izi',
		'izr',
		'izz',
		'jaa',
		'jab',
		'jac',
		'jad',
		'jae',
		'jaf',
		'jah',
		'jaj',
		'jak',
		'jal',
		'jam',
		'jan',
		'jao',
		'jaq',
		'jar',
		'jas',
		'jat',
		'jau',
		'jax',
		'jay',
		'jaz',
		'jbe',
		'jbi',
		'jbj',
		'jbk',
		'jbn',
		'jbo',
		'jbr',
		'jbt',
		'jbu',
		'jbw',
		'jcs',
		'jct',
		'jda',
		'jdg',
		'jdt',
		'jeb',
		'jee',
		'jeg',
		'jeh',
		'jei',
		'jek',
		'jel',
		'jen',
		'jer',
		'jet',
		'jeu',
		'jgb',
		'jge',
		'jgk',
		'jgo',
		'jhi',
		'jhs',
		'jia',
		'jib',
		'jic',
		'jid',
		'jie',
		'jig',
		'jih',
		'jii',
		'jil',
		'jim',
		'jio',
		'jiq',
		'jit',
		'jiu',
		'jiv',
		'jiy',
		'jje',
		'jjr',
		'jka',
		'jkm',
		'jko',
		'jkp',
		'jkr',
		'jku',
		'jle',
		'jls',
		'jma',
		'jmb',
		'jmc',
		'jmd',
		'jmi',
		'jml',
		'jmn',
		'jmr',
		'jms',
		'jmw',
		'jmx',
		'jna',
		'jnd',
		'jng',
		'jni',
		'jnj',
		'jnl',
		'jns',
		'job',
		'jod',
		'jog',
		'jor',
		'jos',
		'jow',
		'jpa',
		'jpr',
		'jpx',
		'jqr',
		'jra',
		'jrb',
		'jrr',
		'jrt',
		'jru',
		'jsl',
		'jua',
		'jub',
		'juc',
		'jud',
		'juh',
		'jui',
		'juk',
		'jul',
		'jum',
		'jun',
		'juo',
		'jup',
		'jur',
		'jus',
		'jut',
		'juu',
		'juw',
		'juy',
		'jvd',
		'jvn',
		'jwi',
		'jya',
		'jye',
		'jyy',
		'kaa',
		'kab',
		'kac',
		'kad',
		'kae',
		'kaf',
		'kag',
		'kah',
		'kai',
		'kaj',
		'kak',
		'kam',
		'kao',
		'kap',
		'kaq',
		'kar',
		'kav',
		'kaw',
		'kax',
		'kay',
		'kba',
		'kbb',
		'kbc',
		'kbd',
		'kbe',
		'kbf',
		'kbg',
		'kbh',
		'kbi',
		'kbj',
		'kbk',
		'kbl',
		'kbm',
		'kbn',
		'kbo',
		'kbp',
		'kbq',
		'kbr',
		'kbs',
		'kbt',
		'kbu',
		'kbv',
		'kbw',
		'kbx',
		'kby',
		'kbz',
		'kca',
		'kcb',
		'kcc',
		'kcd',
		'kce',
		'kcf',
		'kcg',
		'kch',
		'kci',
		'kcj',
		'kck',
		'kcl',
		'kcm',
		'kcn',
		'kco',
		'kcp',
		'kcq',
		'kcr',
		'kcs',
		'kct',
		'kcu',
		'kcv',
		'kcw',
		'kcx',
		'kcy',
		'kcz',
		'kda',
		'kdc',
		'kdd',
		'kde',
		'kdf',
		'kdg',
		'kdh',
		'kdi',
		'kdj',
		'kdk',
		'kdl',
		'kdm',
		'kdn',
		'kdo',
		'kdp',
		'kdq',
		'kdr',
		'kdt',
		'kdu',
		'kdv',
		'kdw',
		'kdx',
		'kdy',
		'kdz',
		'kea',
		'keb',
		'kec',
		'ked',
		'kee',
		'kef',
		'keg',
		'keh',
		'kei',
		'kej',
		'kek',
		'kel',
		'kem',
		'ken',
		'keo',
		'kep',
		'keq',
		'ker',
		'kes',
		'ket',
		'keu',
		'kev',
		'kew',
		'kex',
		'key',
		'kez',
		'kfa',
		'kfb',
		'kfc',
		'kfd',
		'kfe',
		'kff',
		'kfg',
		'kfh',
		'kfi',
		'kfj',
		'kfk',
		'kfl',
		'kfm',
		'kfn',
		'kfo',
		'kfp',
		'kfq',
		'kfr',
		'kfs',
		'kft',
		'kfu',
		'kfv',
		'kfw',
		'kfx',
		'kfy',
		'kfz',
		'kga',
		'kgb',
		'kgc',
		'kgd',
		'kge',
		'kgf',
		'kgg',
		'kgh',
		'kgi',
		'kgj',
		'kgk',
		'kgl',
		'kgm',
		'kgn',
		'kgo',
		'kgp',
		'kgq',
		'kgr',
		'kgs',
		'kgt',
		'kgu',
		'kgv',
		'kgw',
		'kgx',
		'kgy',
		'kha',
		'khb',
		'khc',
		'khd',
		'khe',
		'khf',
		'khg',
		'khh',
		'khi',
		'khj',
		'khk',
		'khl',
		'khn',
		'kho',
		'khp',
		'khq',
		'khr',
		'khs',
		'kht',
		'khu',
		'khv',
		'khw',
		'khx',
		'khy',
		'khz',
		'kia',
		'kib',
		'kic',
		'kid',
		'kie',
		'kif',
		'kig',
		'kih',
		'kii',
		'kij',
		'kil',
		'kim',
		'kio',
		'kip',
		'kiq',
		'kis',
		'kit',
		'kiu',
		'kiv',
		'kiw',
		'kix',
		'kiy',
		'kiz',
		'kja',
		'kjb',
		'kjc',
		'kjd',
		'kje',
		'kjf',
		'kjg',
		'kjh',
		'kji',
		'kjj',
		'kjk',
		'kjl',
		'kjm',
		'kjn',
		'kjo',
		'kjp',
		'kjq',
		'kjr',
		'kjs',
		'kjt',
		'kju',
		'kjv',
		'kjx',
		'kjy',
		'kjz',
		'kka',
		'kkb',
		'kkc',
		'kkd',
		'kke',
		'kkf',
		'kkg',
		'kkh',
		'kki',
		'kkj',
		'kkk',
		'kkl',
		'kkm',
		'kkn',
		'kko',
		'kkp',
		'kkq',
		'kkr',
		'kks',
		'kkt',
		'kku',
		'kkv',
		'kkw',
		'kkx',
		'kky',
		'kkz',
		'kla',
		'klb',
		'klc',
		'kld',
		'kle',
		'klf',
		'klg',
		'klh',
		'kli',
		'klj',
		'klk',
		'kll',
		'klm',
		'kln',
		'klo',
		'klp',
		'klq',
		'klr',
		'kls',
		'klt',
		'klu',
		'klv',
		'klw',
		'klx',
		'kly',
		'klz',
		'kma',
		'kmb',
		'kmc',
		'kmd',
		'kme',
		'kmf',
		'kmg',
		'kmh',
		'kmi',
		'kmj',
		'kmk',
		'kml',
		'kmm',
		'kmn',
		'kmo',
		'kmp',
		'kmq',
		'kmr',
		'kms',
		'kmt',
		'kmu',
		'kmv',
		'kmw',
		'kmx',
		'kmy',
		'kmz',
		'kna',
		'knb',
		'knc',
		'knd',
		'kne',
		'knf',
		'kng',
		'kni',
		'knj',
		'knk',
		'knl',
		'knm',
		'knn',
		'kno',
		'knp',
		'knq',
		'knr',
		'kns',
		'knt',
		'knu',
		'knv',
		'knw',
		'knx',
		'kny',
		'knz',
		'koa',
		'koc',
		'kod',
		'koe',
		'kof',
		'kog',
		'koh',
		'koi',
		'koj',
		'kok',
		'kol',
		'koo',
		'kop',
		'koq',
		'kos',
		'kot',
		'kou',
		'kov',
		'kow',
		'kox',
		'koy',
		'koz',
		'kpa',
		'kpb',
		'kpc',
		'kpd',
		'kpe',
		'kpf',
		'kpg',
		'kph',
		'kpi',
		'kpj',
		'kpk',
		'kpl',
		'kpm',
		'kpn',
		'kpo',
		'kpp',
		'kpq',
		'kpr',
		'kps',
		'kpt',
		'kpu',
		'kpv',
		'kpw',
		'kpx',
		'kpy',
		'kpz',
		'kqa',
		'kqb',
		'kqc',
		'kqd',
		'kqe',
		'kqf',
		'kqg',
		'kqh',
		'kqi',
		'kqj',
		'kqk',
		'kql',
		'kqm',
		'kqn',
		'kqo',
		'kqp',
		'kqq',
		'kqr',
		'kqs',
		'kqt',
		'kqu',
		'kqv',
		'kqw',
		'kqx',
		'kqy',
		'kqz',
		'kra',
		'krb',
		'krc',
		'krd',
		'kre',
		'krf',
		'krh',
		'kri',
		'krj',
		'krk',
		'krl',
		'krm',
		'krn',
		'kro',
		'krp',
		'krr',
		'krs',
		'krt',
		'kru',
		'krv',
		'krw',
		'krx',
		'kry',
		'krz',
		'ksa',
		'ksb',
		'ksc',
		'ksd',
		'kse',
		'ksf',
		'ksg',
		'ksh',
		'ksi',
		'ksj',
		'ksk',
		'ksl',
		'ksm',
		'ksn',
		'kso',
		'ksp',
		'ksq',
		'ksr',
		'kss',
		'kst',
		'ksu',
		'ksv',
		'ksw',
		'ksx',
		'ksy',
		'ksz',
		'kta',
		'ktb',
		'ktc',
		'ktd',
		'kte',
		'ktf',
		'ktg',
		'kth',
		'kti',
		'ktj',
		'ktk',
		'ktl',
		'ktm',
		'ktn',
		'kto',
		'ktp',
		'ktq',
		'ktr',
		'kts',
		'ktt',
		'ktu',
		'ktv',
		'ktw',
		'ktx',
		'kty',
		'ktz',
		'kub',
		'kuc',
		'kud',
		'kue',
		'kuf',
		'kug',
		'kuh',
		'kui',
		'kuj',
		'kuk',
		'kul',
		'kum',
		'kun',
		'kuo',
		'kup',
		'kuq',
		'kus',
		'kut',
		'kuu',
		'kuv',
		'kuw',
		'kux',
		'kuy',
		'kuz',
		'kva',
		'kvb',
		'kvc',
		'kvd',
		'kve',
		'kvf',
		'kvg',
		'kvh',
		'kvi',
		'kvj',
		'kvk',
		'kvl',
		'kvm',
		'kvn',
		'kvo',
		'kvp',
		'kvq',
		'kvr',
		'kvs',
		'kvt',
		'kvu',
		'kvv',
		'kvw',
		'kvx',
		'kvy',
		'kvz',
		'kwa',
		'kwb',
		'kwc',
		'kwd',
		'kwe',
		'kwf',
		'kwg',
		'kwh',
		'kwi',
		'kwj',
		'kwk',
		'kwl',
		'kwm',
		'kwn',
		'kwo',
		'kwp',
		'kwq',
		'kwr',
		'kws',
		'kwt',
		'kwu',
		'kwv',
		'kww',
		'kwx',
		'kwy',
		'kwz',
		'kxa',
		'kxb',
		'kxc',
		'kxd',
		'kxe',
		'kxf',
		'kxh',
		'kxi',
		'kxj',
		'kxk',
		'kxl',
		'kxm',
		'kxn',
		'kxo',
		'kxp',
		'kxq',
		'kxr',
		'kxs',
		'kxt',
		'kxu',
		'kxv',
		'kxw',
		'kxx',
		'kxy',
		'kxz',
		'kya',
		'kyb',
		'kyc',
		'kyd',
		'kye',
		'kyf',
		'kyg',
		'kyh',
		'kyi',
		'kyj',
		'kyk',
		'kyl',
		'kym',
		'kyn',
		'kyo',
		'kyp',
		'kyq',
		'kyr',
		'kys',
		'kyt',
		'kyu',
		'kyv',
		'kyw',
		'kyx',
		'kyy',
		'kyz',
		'kza',
		'kzb',
		'kzc',
		'kzd',
		'kze',
		'kzf',
		'kzg',
		'kzh',
		'kzi',
		'kzj',
		'kzk',
		'kzl',
		'kzm',
		'kzn',
		'kzo',
		'kzp',
		'kzq',
		'kzr',
		'kzs',
		'kzt',
		'kzu',
		'kzv',
		'kzw',
		'kzx',
		'kzy',
		'kzz',
		'laa',
		'lab',
		'lac',
		'lad',
		'lae',
		'laf',
		'lag',
		'lah',
		'lai',
		'laj',
		'lak',
		'lal',
		'lam',
		'lan',
		'lap',
		'laq',
		'lar',
		'las',
		'lau',
		'law',
		'lax',
		'lay',
		'laz',
		'lba',
		'lbb',
		'lbc',
		'lbe',
		'lbf',
		'lbg',
		'lbi',
		'lbj',
		'lbk',
		'lbl',
		'lbm',
		'lbn',
		'lbo',
		'lbq',
		'lbr',
		'lbs',
		'lbt',
		'lbu',
		'lbv',
		'lbw',
		'lbx',
		'lby',
		'lbz',
		'lcc',
		'lcd',
		'lce',
		'lcf',
		'lch',
		'lcl',
		'lcm',
		'lcp',
		'lcq',
		'lcs',
		'lda',
		'ldb',
		'ldd',
		'ldg',
		'ldh',
		'ldi',
		'ldj',
		'ldk',
		'ldl',
		'ldm',
		'ldn',
		'ldo',
		'ldp',
		'ldq',
		'lea',
		'leb',
		'lec',
		'led',
		'lee',
		'lef',
		'leg',
		'leh',
		'lei',
		'lej',
		'lek',
		'lel',
		'lem',
		'len',
		'leo',
		'lep',
		'leq',
		'ler',
		'les',
		'let',
		'leu',
		'lev',
		'lew',
		'lex',
		'ley',
		'lez',
		'lfa',
		'lfn',
		'lga',
		'lgb',
		'lgg',
		'lgh',
		'lgi',
		'lgk',
		'lgl',
		'lgm',
		'lgn',
		'lgq',
		'lgr',
		'lgt',
		'lgu',
		'lgz',
		'lha',
		'lhh',
		'lhi',
		'lhl',
		'lhm',
		'lhn',
		'lhp',
		'lhs',
		'lht',
		'lhu',
		'lia',
		'lib',
		'lic',
		'lid',
		'lie',
		'lif',
		'lig',
		'lih',
		'lii',
		'lij',
		'lik',
		'lil',
		'lio',
		'lip',
		'liq',
		'lir',
		'lis',
		'liu',
		'liv',
		'liw',
		'lix',
		'liy',
		'liz',
		'lja',
		'lje',
		'lji',
		'ljl',
		'ljp',
		'ljw',
		'ljx',
		'lka',
		'lkb',
		'lkc',
		'lkd',
		'lke',
		'lkh',
		'lki',
		'lkj',
		'lkl',
		'lkm',
		'lkn',
		'lko',
		'lkr',
		'lks',
		'lkt',
		'lku',
		'lky',
		'lla',
		'llb',
		'llc',
		'lld',
		'lle',
		'llf',
		'llg',
		'llh',
		'lli',
		'llj',
		'llk',
		'lll',
		'llm',
		'lln',
		'llo',
		'llp',
		'llq',
		'lls',
		'llu',
		'llx',
		'lma',
		'lmb',
		'lmc',
		'lmd',
		'lme',
		'lmf',
		'lmg',
		'lmh',
		'lmi',
		'lmj',
		'lmk',
		'lml',
		'lmm',
		'lmn',
		'lmo',
		'lmp',
		'lmq',
		'lmr',
		'lmu',
		'lmv',
		'lmw',
		'lmx',
		'lmy',
		'lmz',
		'lna',
		'lnb',
		'lnd',
		'lng',
		'lnh',
		'lni',
		'lnj',
		'lnl',
		'lnm',
		'lnn',
		'lno',
		'lns',
		'lnu',
		'lnw',
		'lnz',
		'loa',
		'lob',
		'loc',
		'loe',
		'lof',
		'log',
		'loh',
		'loi',
		'loj',
		'lok',
		'lol',
		'lom',
		'lon',
		'loo',
		'lop',
		'loq',
		'lor',
		'los',
		'lot',
		'lou',
		'lov',
		'low',
		'lox',
		'loy',
		'loz',
		'lpa',
		'lpe',
		'lpn',
		'lpo',
		'lpx',
		'lra',
		'lrc',
		'lre',
		'lrg',
		'lri',
		'lrk',
		'lrl',
		'lrm',
		'lrn',
		'lro',
		'lrr',
		'lrt',
		'lrv',
		'lrz',
		'lsa',
		'lsd',
		'lse',
		'lsg',
		'lsh',
		'lsi',
		'lsl',
		'lsm',
		'lso',
		'lsp',
		'lsr',
		'lss',
		'lst',
		'lsy',
		'ltc',
		'ltg',
		'lth',
		'lti',
		'ltn',
		'lto',
		'lts',
		'ltu',
		'lua',
		'luc',
		'lud',
		'lue',
		'luf',
		'lui',
		'luj',
		'luk',
		'lul',
		'lum',
		'lun',
		'luo',
		'lup',
		'luq',
		'lur',
		'lus',
		'lut',
		'luu',
		'luv',
		'luw',
		'luy',
		'luz',
		'lva',
		'lvk',
		'lvs',
		'lvu',
		'lwa',
		'lwe',
		'lwg',
		'lwh',
		'lwl',
		'lwm',
		'lwo',
		'lws',
		'lwt',
		'lwu',
		'lww',
		'lya',
		'lyg',
		'lyn',
		'lzh',
		'lzl',
		'lzn',
		'lzz',
		'maa',
		'mab',
		'mad',
		'mae',
		'maf',
		'mag',
		'mai',
		'maj',
		'mak',
		'mam',
		'man',
		'map',
		'maq',
		'mas',
		'mat',
		'mau',
		'mav',
		'maw',
		'max',
		'maz',
		'mba',
		'mbb',
		'mbc',
		'mbd',
		'mbe',
		'mbf',
		'mbh',
		'mbi',
		'mbj',
		'mbk',
		'mbl',
		'mbm',
		'mbn',
		'mbo',
		'mbp',
		'mbq',
		'mbr',
		'mbs',
		'mbt',
		'mbu',
		'mbv',
		'mbw',
		'mbx',
		'mby',
		'mbz',
		'mca',
		'mcb',
		'mcc',
		'mcd',
		'mce',
		'mcf',
		'mcg',
		'mch',
		'mci',
		'mcj',
		'mck',
		'mcl',
		'mcm',
		'mcn',
		'mco',
		'mcp',
		'mcq',
		'mcr',
		'mcs',
		'mct',
		'mcu',
		'mcv',
		'mcw',
		'mcx',
		'mcy',
		'mcz',
		'mda',
		'mdb',
		'mdc',
		'mdd',
		'mde',
		'mdf',
		'mdg',
		'mdh',
		'mdi',
		'mdj',
		'mdk',
		'mdl',
		'mdm',
		'mdn',
		'mdp',
		'mdq',
		'mdr',
		'mds',
		'mdt',
		'mdu',
		'mdv',
		'mdw',
		'mdx',
		'mdy',
		'mdz',
		'mea',
		'meb',
		'mec',
		'med',
		'mee',
		'mef',
		'meg',
		'meh',
		'mei',
		'mej',
		'mek',
		'mel',
		'mem',
		'men',
		'meo',
		'mep',
		'meq',
		'mer',
		'mes',
		'met',
		'meu',
		'mev',
		'mew',
		'mey',
		'mez',
		'mfa',
		'mfb',
		'mfc',
		'mfd',
		'mfe',
		'mff',
		'mfg',
		'mfh',
		'mfi',
		'mfj',
		'mfk',
		'mfl',
		'mfm',
		'mfn',
		'mfo',
		'mfp',
		'mfq',
		'mfr',
		'mfs',
		'mft',
		'mfu',
		'mfv',
		'mfw',
		'mfx',
		'mfy',
		'mfz',
		'mga',
		'mgb',
		'mgc',
		'mgd',
		'mge',
		'mgf',
		'mgg',
		'mgh',
		'mgi',
		'mgj',
		'mgk',
		'mgl',
		'mgm',
		'mgn',
		'mgo',
		'mgp',
		'mgq',
		'mgr',
		'mgs',
		'mgt',
		'mgu',
		'mgv',
		'mgw',
		'mgx',
		'mgy',
		'mgz',
		'mha',
		'mhb',
		'mhc',
		'mhd',
		'mhe',
		'mhf',
		'mhg',
		'mhh',
		'mhi',
		'mhj',
		'mhk',
		'mhl',
		'mhm',
		'mhn',
		'mho',
		'mhp',
		'mhq',
		'mhr',
		'mhs',
		'mht',
		'mhu',
		'mhw',
		'mhx',
		'mhy',
		'mhz',
		'mia',
		'mib',
		'mic',
		'mid',
		'mie',
		'mif',
		'mig',
		'mih',
		'mii',
		'mij',
		'mik',
		'mil',
		'mim',
		'min',
		'mio',
		'mip',
		'miq',
		'mir',
		'mis',
		'mit',
		'miu',
		'miw',
		'mix',
		'miy',
		'miz',
		'mja',
		'mjb',
		'mjc',
		'mjd',
		'mje',
		'mjg',
		'mjh',
		'mji',
		'mjj',
		'mjk',
		'mjl',
		'mjm',
		'mjn',
		'mjo',
		'mjp',
		'mjq',
		'mjr',
		'mjs',
		'mjt',
		'mju',
		'mjv',
		'mjw',
		'mjx',
		'mjy',
		'mjz',
		'mka',
		'mkb',
		'mkc',
		'mke',
		'mkf',
		'mkg',
		'mkh',
		'mki',
		'mkj',
		'mkk',
		'mkl',
		'mkm',
		'mkn',
		'mko',
		'mkp',
		'mkq',
		'mkr',
		'mks',
		'mkt',
		'mku',
		'mkv',
		'mkw',
		'mkx',
		'mky',
		'mkz',
		'mla',
		'mlb',
		'mlc',
		'mld',
		'mle',
		'mlf',
		'mlh',
		'mli',
		'mlj',
		'mlk',
		'mll',
		'mlm',
		'mln',
		'mlo',
		'mlp',
		'mlq',
		'mlr',
		'mls',
		'mlu',
		'mlv',
		'mlw',
		'mlx',
		'mlz',
		'mma',
		'mmb',
		'mmc',
		'mmd',
		'mme',
		'mmf',
		'mmg',
		'mmh',
		'mmi',
		'mmj',
		'mmk',
		'mml',
		'mmm',
		'mmn',
		'mmo',
		'mmp',
		'mmq',
		'mmr',
		'mmt',
		'mmu',
		'mmv',
		'mmw',
		'mmx',
		'mmy',
		'mmz',
		'mna',
		'mnb',
		'mnc',
		'mnd',
		'mne',
		'mnf',
		'mng',
		'mnh',
		'mni',
		'mnj',
		'mnk',
		'mnl',
		'mnm',
		'mnn',
		'mno',
		'mnp',
		'mnq',
		'mnr',
		'mns',
		'mnt',
		'mnu',
		'mnv',
		'mnw',
		'mnx',
		'mny',
		'mnz',
		'moa',
		'moc',
		'mod',
		'moe',
		'mof',
		'mog',
		'moh',
		'moi',
		'moj',
		'mok',
		'mom',
		'moo',
		'mop',
		'moq',
		'mor',
		'mos',
		'mot',
		'mou',
		'mov',
		'mow',
		'mox',
		'moy',
		'moz',
		'mpa',
		'mpb',
		'mpc',
		'mpd',
		'mpe',
		'mpg',
		'mph',
		'mpi',
		'mpj',
		'mpk',
		'mpl',
		'mpm',
		'mpn',
		'mpo',
		'mpp',
		'mpq',
		'mpr',
		'mps',
		'mpt',
		'mpu',
		'mpv',
		'mpw',
		'mpx',
		'mpy',
		'mpz',
		'mqa',
		'mqb',
		'mqc',
		'mqe',
		'mqf',
		'mqg',
		'mqh',
		'mqi',
		'mqj',
		'mqk',
		'mql',
		'mqm',
		'mqn',
		'mqo',
		'mqp',
		'mqq',
		'mqr',
		'mqs',
		'mqt',
		'mqu',
		'mqv',
		'mqw',
		'mqx',
		'mqy',
		'mqz',
		'mra',
		'mrb',
		'mrc',
		'mrd',
		'mre',
		'mrf',
		'mrg',
		'mrh',
		'mrj',
		'mrk',
		'mrl',
		'mrm',
		'mrn',
		'mro',
		'mrp',
		'mrq',
		'mrr',
		'mrs',
		'mrt',
		'mru',
		'mrv',
		'mrw',
		'mrx',
		'mry',
		'mrz',
		'msb',
		'msc',
		'msd',
		'mse',
		'msf',
		'msg',
		'msh',
		'msi',
		'msj',
		'msk',
		'msl',
		'msm',
		'msn',
		'mso',
		'msp',
		'msq',
		'msr',
		'mss',
		'mst',
		'msu',
		'msv',
		'msw',
		'msx',
		'msy',
		'msz',
		'mta',
		'mtb',
		'mtc',
		'mtd',
		'mte',
		'mtf',
		'mtg',
		'mth',
		'mti',
		'mtj',
		'mtk',
		'mtl',
		'mtm',
		'mtn',
		'mto',
		'mtp',
		'mtq',
		'mtr',
		'mts',
		'mtt',
		'mtu',
		'mtv',
		'mtw',
		'mtx',
		'mty',
		'mua',
		'mub',
		'muc',
		'mud',
		'mue',
		'mug',
		'muh',
		'mui',
		'muj',
		'muk',
		'mul',
		'mum',
		'mun',
		'muo',
		'mup',
		'muq',
		'mur',
		'mus',
		'mut',
		'muu',
		'muv',
		'mux',
		'muy',
		'muz',
		'mva',
		'mvb',
		'mvd',
		'mve',
		'mvf',
		'mvg',
		'mvh',
		'mvi',
		'mvk',
		'mvl',
		'mvm',
		'mvn',
		'mvo',
		'mvp',
		'mvq',
		'mvr',
		'mvs',
		'mvt',
		'mvu',
		'mvv',
		'mvw',
		'mvx',
		'mvy',
		'mvz',
		'mwa',
		'mwb',
		'mwc',
		'mwd',
		'mwe',
		'mwf',
		'mwg',
		'mwh',
		'mwi',
		'mwj',
		'mwk',
		'mwl',
		'mwm',
		'mwn',
		'mwo',
		'mwp',
		'mwq',
		'mwr',
		'mws',
		'mwt',
		'mwu',
		'mwv',
		'mww',
		'mwx',
		'mwy',
		'mwz',
		'mxa',
		'mxb',
		'mxc',
		'mxd',
		'mxe',
		'mxf',
		'mxg',
		'mxh',
		'mxi',
		'mxj',
		'mxk',
		'mxl',
		'mxm',
		'mxn',
		'mxo',
		'mxp',
		'mxq',
		'mxr',
		'mxs',
		'mxt',
		'mxu',
		'mxv',
		'mxw',
		'mxx',
		'mxy',
		'mxz',
		'myb',
		'myc',
		'myd',
		'mye',
		'myf',
		'myg',
		'myh',
		'myi',
		'myj',
		'myk',
		'myl',
		'mym',
		'myn',
		'myo',
		'myp',
		'myq',
		'myr',
		'mys',
		'myt',
		'myu',
		'myv',
		'myw',
		'myx',
		'myy',
		'myz',
		'mza',
		'mzb',
		'mzc',
		'mzd',
		'mze',
		'mzg',
		'mzh',
		'mzi',
		'mzj',
		'mzk',
		'mzl',
		'mzm',
		'mzn',
		'mzo',
		'mzp',
		'mzq',
		'mzr',
		'mzs',
		'mzt',
		'mzu',
		'mzv',
		'mzw',
		'mzx',
		'mzy',
		'mzz',
		'naa',
		'nab',
		'nac',
		'nad',
		'nae',
		'naf',
		'nag',
		'nah',
		'nai',
		'naj',
		'nak',
		'nal',
		'nam',
		'nan',
		'nao',
		'nap',
		'naq',
		'nar',
		'nas',
		'nat',
		'naw',
		'nax',
		'nay',
		'naz',
		'nba',
		'nbb',
		'nbc',
		'nbd',
		'nbe',
		'nbf',
		'nbg',
		'nbh',
		'nbi',
		'nbj',
		'nbk',
		'nbm',
		'nbn',
		'nbo',
		'nbp',
		'nbq',
		'nbr',
		'nbs',
		'nbt',
		'nbu',
		'nbv',
		'nbw',
		'nbx',
		'nby',
		'nca',
		'ncb',
		'ncc',
		'ncd',
		'nce',
		'ncf',
		'ncg',
		'nch',
		'nci',
		'ncj',
		'nck',
		'ncl',
		'ncm',
		'ncn',
		'nco',
		'ncp',
		'ncq',
		'ncr',
		'ncs',
		'nct',
		'ncu',
		'ncx',
		'ncz',
		'nda',
		'ndb',
		'ndc',
		'ndd',
		'ndf',
		'ndg',
		'ndh',
		'ndi',
		'ndj',
		'ndk',
		'ndl',
		'ndm',
		'ndn',
		'ndp',
		'ndq',
		'ndr',
		'nds',
		'ndt',
		'ndu',
		'ndv',
		'ndw',
		'ndx',
		'ndy',
		'ndz',
		'nea',
		'neb',
		'nec',
		'ned',
		'nee',
		'nef',
		'neg',
		'neh',
		'nei',
		'nej',
		'nek',
		'nem',
		'nen',
		'neo',
		'neq',
		'ner',
		'nes',
		'net',
		'neu',
		'nev',
		'new',
		'nex',
		'ney',
		'nez',
		'nfa',
		'nfd',
		'nfl',
		'nfr',
		'nfu',
		'nga',
		'ngb',
		'ngc',
		'ngd',
		'nge',
		'ngf',
		'ngg',
		'ngh',
		'ngi',
		'ngj',
		'ngk',
		'ngl',
		'ngm',
		'ngn',
		'ngo',
		'ngp',
		'ngq',
		'ngr',
		'ngs',
		'ngt',
		'ngu',
		'ngv',
		'ngw',
		'ngx',
		'ngy',
		'ngz',
		'nha',
		'nhb',
		'nhc',
		'nhd',
		'nhe',
		'nhf',
		'nhg',
		'nhh',
		'nhi',
		'nhk',
		'nhm',
		'nhn',
		'nho',
		'nhp',
		'nhq',
		'nhr',
		'nht',
		'nhu',
		'nhv',
		'nhw',
		'nhx',
		'nhy',
		'nhz',
		'nia',
		'nib',
		'nic',
		'nid',
		'nie',
		'nif',
		'nig',
		'nih',
		'nii',
		'nij',
		'nik',
		'nil',
		'nim',
		'nin',
		'nio',
		'niq',
		'nir',
		'nis',
		'nit',
		'niu',
		'niv',
		'niw',
		'nix',
		'niy',
		'niz',
		'nja',
		'njb',
		'njd',
		'njh',
		'nji',
		'njj',
		'njl',
		'njm',
		'njn',
		'njo',
		'njr',
		'njs',
		'njt',
		'nju',
		'njx',
		'njy',
		'njz',
		'nka',
		'nkb',
		'nkc',
		'nkd',
		'nke',
		'nkf',
		'nkg',
		'nkh',
		'nki',
		'nkj',
		'nkk',
		'nkm',
		'nkn',
		'nko',
		'nkp',
		'nkq',
		'nkr',
		'nks',
		'nkt',
		'nku',
		'nkv',
		'nkw',
		'nkx',
		'nkz',
		'nla',
		'nlc',
		'nle',
		'nlg',
		'nli',
		'nlj',
		'nlk',
		'nll',
		'nlm',
		'nln',
		'nlo',
		'nlq',
		'nlr',
		'nlu',
		'nlv',
		'nlw',
		'nlx',
		'nly',
		'nlz',
		'nma',
		'nmb',
		'nmc',
		'nmd',
		'nme',
		'nmf',
		'nmg',
		'nmh',
		'nmi',
		'nmj',
		'nmk',
		'nml',
		'nmm',
		'nmn',
		'nmo',
		'nmp',
		'nmq',
		'nmr',
		'nms',
		'nmt',
		'nmu',
		'nmv',
		'nmw',
		'nmx',
		'nmy',
		'nmz',
		'nna',
		'nnb',
		'nnc',
		'nnd',
		'nne',
		'nnf',
		'nng',
		'nnh',
		'nni',
		'nnj',
		'nnk',
		'nnl',
		'nnm',
		'nnn',
		'nnp',
		'nnq',
		'nnr',
		'nns',
		'nnt',
		'nnu',
		'nnv',
		'nnw',
		'nnx',
		'nny',
		'nnz',
		'noa',
		'noc',
		'nod',
		'noe',
		'nof',
		'nog',
		'noh',
		'noi',
		'noj',
		'nok',
		'nol',
		'nom',
		'non',
		'noo',
		'nop',
		'noq',
		'nos',
		'not',
		'nou',
		'nov',
		'now',
		'noy',
		'noz',
		'npa',
		'npb',
		'npg',
		'nph',
		'npi',
		'npl',
		'npn',
		'npo',
		'nps',
		'npu',
		'npx',
		'npy',
		'nqg',
		'nqk',
		'nql',
		'nqm',
		'nqn',
		'nqo',
		'nqq',
		'nqy',
		'nra',
		'nrb',
		'nrc',
		'nre',
		'nrf',
		'nrg',
		'nri',
		'nrk',
		'nrl',
		'nrm',
		'nrn',
		'nrp',
		'nrr',
		'nrt',
		'nru',
		'nrx',
		'nrz',
		'nsa',
		'nsc',
		'nsd',
		'nse',
		'nsf',
		'nsg',
		'nsh',
		'nsi',
		'nsk',
		'nsl',
		'nsm',
		'nsn',
		'nso',
		'nsp',
		'nsq',
		'nsr',
		'nss',
		'nst',
		'nsu',
		'nsv',
		'nsw',
		'nsx',
		'nsy',
		'nsz',
		'ntd',
		'nte',
		'ntg',
		'nti',
		'ntj',
		'ntk',
		'ntm',
		'nto',
		'ntp',
		'ntr',
		'nts',
		'ntu',
		'ntw',
		'ntx',
		'nty',
		'ntz',
		'nua',
		'nub',
		'nuc',
		'nud',
		'nue',
		'nuf',
		'nug',
		'nuh',
		'nui',
		'nuj',
		'nuk',
		'nul',
		'num',
		'nun',
		'nuo',
		'nup',
		'nuq',
		'nur',
		'nus',
		'nut',
		'nuu',
		'nuv',
		'nuw',
		'nux',
		'nuy',
		'nuz',
		'nvh',
		'nvm',
		'nvo',
		'nwa',
		'nwb',
		'nwc',
		'nwe',
		'nwg',
		'nwi',
		'nwm',
		'nwo',
		'nwr',
		'nwx',
		'nwy',
		'nxa',
		'nxd',
		'nxe',
		'nxg',
		'nxi',
		'nxk',
		'nxl',
		'nxm',
		'nxn',
		'nxo',
		'nxq',
		'nxr',
		'nxu',
		'nxx',
		'nyb',
		'nyc',
		'nyd',
		'nye',
		'nyf',
		'nyg',
		'nyh',
		'nyi',
		'nyj',
		'nyk',
		'nyl',
		'nym',
		'nyn',
		'nyo',
		'nyp',
		'nyq',
		'nyr',
		'nys',
		'nyt',
		'nyu',
		'nyv',
		'nyw',
		'nyx',
		'nyy',
		'nza',
		'nzb',
		'nzd',
		'nzi',
		'nzk',
		'nzm',
		'nzs',
		'nzu',
		'nzy',
		'nzz',
		'oaa',
		'oac',
		'oar',
		'oav',
		'obi',
		'obk',
		'obl',
		'obm',
		'obo',
		'obr',
		'obt',
		'obu',
		'oca',
		'och',
		'oco',
		'ocu',
		'oda',
		'odk',
		'odt',
		'odu',
		'ofo',
		'ofs',
		'ofu',
		'ogb',
		'ogc',
		'oge',
		'ogg',
		'ogo',
		'ogu',
		'oht',
		'ohu',
		'oia',
		'oin',
		'ojb',
		'ojc',
		'ojg',
		'ojp',
		'ojs',
		'ojv',
		'ojw',
		'oka',
		'okb',
		'okd',
		'oke',
		'okg',
		'okh',
		'oki',
		'okj',
		'okk',
		'okl',
		'okm',
		'okn',
		'oko',
		'okr',
		'oks',
		'oku',
		'okv',
		'okx',
		'ola',
		'old',
		'ole',
		'olk',
		'olm',
		'olo',
		'olr',
		'olt',
		'olu',
		'oma',
		'omb',
		'omc',
		'ome',
		'omg',
		'omi',
		'omk',
		'oml',
		'omn',
		'omo',
		'omp',
		'omq',
		'omr',
		'omt',
		'omu',
		'omv',
		'omw',
		'omx',
		'ona',
		'onb',
		'one',
		'ong',
		'oni',
		'onj',
		'onk',
		'onn',
		'ono',
		'onp',
		'onr',
		'ons',
		'ont',
		'onu',
		'onw',
		'onx',
		'ood',
		'oog',
		'oon',
		'oor',
		'oos',
		'opa',
		'opk',
		'opm',
		'opo',
		'opt',
		'opy',
		'ora',
		'orc',
		'ore',
		'org',
		'orh',
		'orn',
		'oro',
		'orr',
		'ors',
		'ort',
		'oru',
		'orv',
		'orw',
		'orx',
		'ory',
		'orz',
		'osa',
		'osc',
		'osi',
		'oso',
		'osp',
		'ost',
		'osu',
		'osx',
		'ota',
		'otb',
		'otd',
		'ote',
		'oti',
		'otk',
		'otl',
		'otm',
		'otn',
		'oto',
		'otq',
		'otr',
		'ots',
		'ott',
		'otu',
		'otw',
		'otx',
		'oty',
		'otz',
		'oua',
		'oub',
		'oue',
		'oui',
		'oum',
		'oun',
		'ovd',
		'owi',
		'owl',
		'oyb',
		'oyd',
		'oym',
		'oyy',
		'ozm',
		'paa',
		'pab',
		'pac',
		'pad',
		'pae',
		'paf',
		'pag',
		'pah',
		'pai',
		'pak',
		'pal',
		'pam',
		'pao',
		'pap',
		'paq',
		'par',
		'pas',
		'pat',
		'pau',
		'pav',
		'paw',
		'pax',
		'pay',
		'paz',
		'pbb',
		'pbc',
		'pbe',
		'pbf',
		'pbg',
		'pbh',
		'pbi',
		'pbl',
		'pbm',
		'pbn',
		'pbo',
		'pbp',
		'pbr',
		'pbs',
		'pbt',
		'pbu',
		'pbv',
		'pby',
		'pbz',
		'pca',
		'pcb',
		'pcc',
		'pcd',
		'pce',
		'pcf',
		'pcg',
		'pch',
		'pci',
		'pcj',
		'pck',
		'pcl',
		'pcm',
		'pcn',
		'pcp',
		'pcr',
		'pcw',
		'pda',
		'pdc',
		'pdi',
		'pdn',
		'pdo',
		'pdt',
		'pdu',
		'pea',
		'peb',
		'ped',
		'pee',
		'pef',
		'peg',
		'peh',
		'pei',
		'pej',
		'pek',
		'pel',
		'pem',
		'peo',
		'pep',
		'peq',
		'pes',
		'pev',
		'pex',
		'pey',
		'pez',
		'pfa',
		'pfe',
		'pfl',
		'pga',
		'pgd',
		'pgg',
		'pgi',
		'pgk',
		'pgl',
		'pgn',
		'pgs',
		'pgu',
		'pgy',
		'pgz',
		'pha',
		'phd',
		'phg',
		'phh',
		'phi',
		'phk',
		'phl',
		'phm',
		'phn',
		'pho',
		'phq',
		'phr',
		'pht',
		'phu',
		'phv',
		'phw',
		'pia',
		'pib',
		'pic',
		'pid',
		'pie',
		'pif',
		'pig',
		'pih',
		'pii',
		'pij',
		'pil',
		'pim',
		'pin',
		'pio',
		'pip',
		'pir',
		'pis',
		'pit',
		'piu',
		'piv',
		'piw',
		'pix',
		'piy',
		'piz',
		'pjt',
		'pka',
		'pkb',
		'pkc',
		'pkg',
		'pkh',
		'pkn',
		'pko',
		'pkp',
		'pkr',
		'pks',
		'pkt',
		'pku',
		'pla',
		'plb',
		'plc',
		'pld',
		'ple',
		'plf',
		'plg',
		'plh',
		'plj',
		'plk',
		'pll',
		'pln',
		'plo',
		'plp',
		'plq',
		'plr',
		'pls',
		'plt',
		'plu',
		'plv',
		'plw',
		'ply',
		'plz',
		'pma',
		'pmb',
		'pmc',
		'pmd',
		'pme',
		'pmf',
		'pmh',
		'pmi',
		'pmj',
		'pmk',
		'pml',
		'pmm',
		'pmn',
		'pmo',
		'pmq',
		'pmr',
		'pms',
		'pmt',
		'pmu',
		'pmw',
		'pmx',
		'pmy',
		'pmz',
		'pna',
		'pnb',
		'pnc',
		'pne',
		'png',
		'pnh',
		'pni',
		'pnj',
		'pnk',
		'pnl',
		'pnm',
		'pnn',
		'pno',
		'pnp',
		'pnq',
		'pnr',
		'pns',
		'pnt',
		'pnu',
		'pnv',
		'pnw',
		'pnx',
		'pny',
		'pnz',
		'poc',
		'pod',
		'poe',
		'pof',
		'pog',
		'poh',
		'poi',
		'pok',
		'pom',
		'pon',
		'poo',
		'pop',
		'poq',
		'pos',
		'pot',
		'pov',
		'pow',
		'pox',
		'poy',
		'poz',
		'ppa',
		'ppe',
		'ppi',
		'ppk',
		'ppl',
		'ppm',
		'ppn',
		'ppo',
		'ppp',
		'ppq',
		'ppr',
		'pps',
		'ppt',
		'ppu',
		'pqa',
		'pqe',
		'pqm',
		'pqw',
		'pra',
		'prb',
		'prc',
		'prd',
		'pre',
		'prf',
		'prg',
		'prh',
		'pri',
		'prk',
		'prl',
		'prm',
		'prn',
		'pro',
		'prp',
		'prq',
		'prr',
		'prs',
		'prt',
		'pru',
		'prw',
		'prx',
		'pry',
		'prz',
		'psa',
		'psc',
		'psd',
		'pse',
		'psg',
		'psh',
		'psi',
		'psl',
		'psm',
		'psn',
		'pso',
		'psp',
		'psq',
		'psr',
		'pss',
		'pst',
		'psu',
		'psw',
		'psy',
		'pta',
		'pth',
		'pti',
		'ptn',
		'pto',
		'ptp',
		'ptq',
		'ptr',
		'ptt',
		'ptu',
		'ptv',
		'ptw',
		'pty',
		'pua',
		'pub',
		'puc',
		'pud',
		'pue',
		'puf',
		'pug',
		'pui',
		'puj',
		'puk',
		'pum',
		'puo',
		'pup',
		'puq',
		'pur',
		'put',
		'puu',
		'puw',
		'pux',
		'puy',
		'puz',
		'pwa',
		'pwb',
		'pwg',
		'pwi',
		'pwm',
		'pwn',
		'pwo',
		'pwr',
		'pww',
		'pxm',
		'pye',
		'pym',
		'pyn',
		'pys',
		'pyu',
		'pyx',
		'pyy',
		'pzn',
		'qaa..qtz',
		'qua',
		'qub',
		'quc',
		'qud',
		'quf',
		'qug',
		'quh',
		'qui',
		'quk',
		'qul',
		'qum',
		'qun',
		'qup',
		'quq',
		'qur',
		'qus',
		'quv',
		'quw',
		'qux',
		'quy',
		'quz',
		'qva',
		'qvc',
		'qve',
		'qvh',
		'qvi',
		'qvj',
		'qvl',
		'qvm',
		'qvn',
		'qvo',
		'qvp',
		'qvs',
		'qvw',
		'qvy',
		'qvz',
		'qwa',
		'qwc',
		'qwe',
		'qwh',
		'qwm',
		'qws',
		'qwt',
		'qxa',
		'qxc',
		'qxh',
		'qxl',
		'qxn',
		'qxo',
		'qxp',
		'qxq',
		'qxr',
		'qxs',
		'qxt',
		'qxu',
		'qxw',
		'qya',
		'qyp',
		'raa',
		'rab',
		'rac',
		'rad',
		'raf',
		'rag',
		'rah',
		'rai',
		'raj',
		'rak',
		'ral',
		'ram',
		'ran',
		'rao',
		'rap',
		'raq',
		'rar',
		'ras',
		'rat',
		'rau',
		'rav',
		'raw',
		'rax',
		'ray',
		'raz',
		'rbb',
		'rbk',
		'rbl',
		'rbp',
		'rcf',
		'rdb',
		'rea',
		'reb',
		'ree',
		'reg',
		'rei',
		'rej',
		'rel',
		'rem',
		'ren',
		'rer',
		'res',
		'ret',
		'rey',
		'rga',
		'rge',
		'rgk',
		'rgn',
		'rgr',
		'rgs',
		'rgu',
		'rhg',
		'rhp',
		'ria',
		'rie',
		'rif',
		'ril',
		'rim',
		'rin',
		'rir',
		'rit',
		'riu',
		'rjg',
		'rji',
		'rjs',
		'rka',
		'rkb',
		'rkh',
		'rki',
		'rkm',
		'rkt',
		'rkw',
		'rma',
		'rmb',
		'rmc',
		'rmd',
		'rme',
		'rmf',
		'rmg',
		'rmh',
		'rmi',
		'rmk',
		'rml',
		'rmm',
		'rmn',
		'rmo',
		'rmp',
		'rmq',
		'rmr',
		'rms',
		'rmt',
		'rmu',
		'rmv',
		'rmw',
		'rmx',
		'rmy',
		'rmz',
		'rna',
		'rnd',
		'rng',
		'rnl',
		'rnn',
		'rnp',
		'rnr',
		'rnw',
		'roa',
		'rob',
		'roc',
		'rod',
		'roe',
		'rof',
		'rog',
		'rol',
		'rom',
		'roo',
		'rop',
		'ror',
		'rou',
		'row',
		'rpn',
		'rpt',
		'rri',
		'rro',
		'rrt',
		'rsb',
		'rsi',
		'rsl',
		'rsm',
		'rtc',
		'rth',
		'rtm',
		'rts',
		'rtw',
		'rub',
		'ruc',
		'rue',
		'ruf',
		'rug',
		'ruh',
		'rui',
		'ruk',
		'ruo',
		'rup',
		'ruq',
		'rut',
		'ruu',
		'ruy',
		'ruz',
		'rwa',
		'rwk',
		'rwm',
		'rwo',
		'rwr',
		'rxd',
		'rxw',
		'ryn',
		'rys',
		'ryu',
		'rzh',
		'saa',
		'sab',
		'sac',
		'sad',
		'sae',
		'saf',
		'sah',
		'sai',
		'saj',
		'sak',
		'sal',
		'sam',
		'sao',
		'sap',
		'saq',
		'sar',
		'sas',
		'sat',
		'sau',
		'sav',
		'saw',
		'sax',
		'say',
		'saz',
		'sba',
		'sbb',
		'sbc',
		'sbd',
		'sbe',
		'sbf',
		'sbg',
		'sbh',
		'sbi',
		'sbj',
		'sbk',
		'sbl',
		'sbm',
		'sbn',
		'sbo',
		'sbp',
		'sbq',
		'sbr',
		'sbs',
		'sbt',
		'sbu',
		'sbv',
		'sbw',
		'sbx',
		'sby',
		'sbz',
		'sca',
		'scb',
		'sce',
		'scf',
		'scg',
		'sch',
		'sci',
		'sck',
		'scl',
		'scn',
		'sco',
		'scp',
		'scq',
		'scs',
		'sct',
		'scu',
		'scv',
		'scw',
		'scx',
		'sda',
		'sdb',
		'sdc',
		'sde',
		'sdf',
		'sdg',
		'sdh',
		'sdj',
		'sdk',
		'sdl',
		'sdm',
		'sdn',
		'sdo',
		'sdp',
		'sdr',
		'sds',
		'sdt',
		'sdu',
		'sdv',
		'sdx',
		'sdz',
		'sea',
		'seb',
		'sec',
		'sed',
		'see',
		'sef',
		'seg',
		'seh',
		'sei',
		'sej',
		'sek',
		'sel',
		'sem',
		'sen',
		'seo',
		'sep',
		'seq',
		'ser',
		'ses',
		'set',
		'seu',
		'sev',
		'sew',
		'sey',
		'sez',
		'sfb',
		'sfe',
		'sfm',
		'sfs',
		'sfw',
		'sga',
		'sgb',
		'sgc',
		'sgd',
		'sge',
		'sgg',
		'sgh',
		'sgi',
		'sgj',
		'sgk',
		'sgl',
		'sgm',
		'sgn',
		'sgo',
		'sgp',
		'sgr',
		'sgs',
		'sgt',
		'sgu',
		'sgw',
		'sgx',
		'sgy',
		'sgz',
		'sha',
		'shb',
		'shc',
		'shd',
		'she',
		'shg',
		'shh',
		'shi',
		'shj',
		'shk',
		'shl',
		'shm',
		'shn',
		'sho',
		'shp',
		'shq',
		'shr',
		'shs',
		'sht',
		'shu',
		'shv',
		'shw',
		'shx',
		'shy',
		'shz',
		'sia',
		'sib',
		'sid',
		'sie',
		'sif',
		'sig',
		'sih',
		'sii',
		'sij',
		'sik',
		'sil',
		'sim',
		'sio',
		'sip',
		'siq',
		'sir',
		'sis',
		'sit',
		'siu',
		'siv',
		'siw',
		'six',
		'siy',
		'siz',
		'sja',
		'sjb',
		'sjd',
		'sje',
		'sjg',
		'sjk',
		'sjl',
		'sjm',
		'sjn',
		'sjo',
		'sjp',
		'sjr',
		'sjs',
		'sjt',
		'sju',
		'sjw',
		'ska',
		'skb',
		'skc',
		'skd',
		'ske',
		'skf',
		'skg',
		'skh',
		'ski',
		'skj',
		'skk',
		'skm',
		'skn',
		'sko',
		'skp',
		'skq',
		'skr',
		'sks',
		'skt',
		'sku',
		'skv',
		'skw',
		'skx',
		'sky',
		'skz',
		'sla',
		'slc',
		'sld',
		'sle',
		'slf',
		'slg',
		'slh',
		'sli',
		'slj',
		'sll',
		'slm',
		'sln',
		'slp',
		'slq',
		'slr',
		'sls',
		'slt',
		'slu',
		'slw',
		'slx',
		'sly',
		'slz',
		'sma',
		'smb',
		'smc',
		'smd',
		'smf',
		'smg',
		'smh',
		'smi',
		'smj',
		'smk',
		'sml',
		'smm',
		'smn',
		'smp',
		'smq',
		'smr',
		'sms',
		'smt',
		'smu',
		'smv',
		'smw',
		'smx',
		'smy',
		'smz',
		'snb',
		'snc',
		'sne',
		'snf',
		'sng',
		'snh',
		'sni',
		'snj',
		'snk',
		'snl',
		'snm',
		'snn',
		'sno',
		'snp',
		'snq',
		'snr',
		'sns',
		'snu',
		'snv',
		'snw',
		'snx',
		'sny',
		'snz',
		'soa',
		'sob',
		'soc',
		'sod',
		'soe',
		'sog',
		'soh',
		'soi',
		'soj',
		'sok',
		'sol',
		'son',
		'soo',
		'sop',
		'soq',
		'sor',
		'sos',
		'sou',
		'sov',
		'sow',
		'sox',
		'soy',
		'soz',
		'spb',
		'spc',
		'spd',
		'spe',
		'spg',
		'spi',
		'spk',
		'spl',
		'spm',
		'spn',
		'spo',
		'spp',
		'spq',
		'spr',
		'sps',
		'spt',
		'spu',
		'spv',
		'spx',
		'spy',
		'sqa',
		'sqh',
		'sqj',
		'sqk',
		'sqm',
		'sqn',
		'sqo',
		'sqq',
		'sqr',
		'sqs',
		'sqt',
		'squ',
		'sra',
		'srb',
		'src',
		'sre',
		'srf',
		'srg',
		'srh',
		'sri',
		'srk',
		'srl',
		'srm',
		'srn',
		'sro',
		'srq',
		'srr',
		'srs',
		'srt',
		'sru',
		'srv',
		'srw',
		'srx',
		'sry',
		'srz',
		'ssa',
		'ssb',
		'ssc',
		'ssd',
		'sse',
		'ssf',
		'ssg',
		'ssh',
		'ssi',
		'ssj',
		'ssk',
		'ssl',
		'ssm',
		'ssn',
		'sso',
		'ssp',
		'ssq',
		'ssr',
		'sss',
		'sst',
		'ssu',
		'ssv',
		'ssx',
		'ssy',
		'ssz',
		'sta',
		'stb',
		'std',
		'ste',
		'stf',
		'stg',
		'sth',
		'sti',
		'stj',
		'stk',
		'stl',
		'stm',
		'stn',
		'sto',
		'stp',
		'stq',
		'str',
		'sts',
		'stt',
		'stu',
		'stv',
		'stw',
		'sty',
		'sua',
		'sub',
		'suc',
		'sue',
		'sug',
		'sui',
		'suj',
		'suk',
		'sul',
		'sum',
		'suq',
		'sur',
		'sus',
		'sut',
		'suv',
		'suw',
		'sux',
		'suy',
		'suz',
		'sva',
		'svb',
		'svc',
		'sve',
		'svk',
		'svm',
		'svr',
		'svs',
		'svx',
		'swb',
		'swc',
		'swf',
		'swg',
		'swh',
		'swi',
		'swj',
		'swk',
		'swl',
		'swm',
		'swn',
		'swo',
		'swp',
		'swq',
		'swr',
		'sws',
		'swt',
		'swu',
		'swv',
		'sww',
		'swx',
		'swy',
		'sxb',
		'sxc',
		'sxe',
		'sxg',
		'sxk',
		'sxl',
		'sxm',
		'sxn',
		'sxo',
		'sxr',
		'sxs',
		'sxu',
		'sxw',
		'sya',
		'syb',
		'syc',
		'syd',
		'syi',
		'syk',
		'syl',
		'sym',
		'syn',
		'syo',
		'syr',
		'sys',
		'syw',
		'syx',
		'syy',
		'sza',
		'szb',
		'szc',
		'szd',
		'sze',
		'szg',
		'szl',
		'szn',
		'szp',
		'szs',
		'szv',
		'szw',
		'taa',
		'tab',
		'tac',
		'tad',
		'tae',
		'taf',
		'tag',
		'tai',
		'taj',
		'tak',
		'tal',
		'tan',
		'tao',
		'tap',
		'taq',
		'tar',
		'tas',
		'tau',
		'tav',
		'taw',
		'tax',
		'tay',
		'taz',
		'tba',
		'tbb',
		'tbc',
		'tbd',
		'tbe',
		'tbf',
		'tbg',
		'tbh',
		'tbi',
		'tbj',
		'tbk',
		'tbl',
		'tbm',
		'tbn',
		'tbo',
		'tbp',
		'tbq',
		'tbr',
		'tbs',
		'tbt',
		'tbu',
		'tbv',
		'tbw',
		'tbx',
		'tby',
		'tbz',
		'tca',
		'tcb',
		'tcc',
		'tcd',
		'tce',
		'tcf',
		'tcg',
		'tch',
		'tci',
		'tck',
		'tcl',
		'tcm',
		'tcn',
		'tco',
		'tcp',
		'tcq',
		'tcs',
		'tct',
		'tcu',
		'tcw',
		'tcx',
		'tcy',
		'tcz',
		'tda',
		'tdb',
		'tdc',
		'tdd',
		'tde',
		'tdf',
		'tdg',
		'tdh',
		'tdi',
		'tdj',
		'tdk',
		'tdl',
		'tdm',
		'tdn',
		'tdo',
		'tdq',
		'tdr',
		'tds',
		'tdt',
		'tdu',
		'tdv',
		'tdx',
		'tdy',
		'tea',
		'teb',
		'tec',
		'ted',
		'tee',
		'tef',
		'teg',
		'teh',
		'tei',
		'tek',
		'tem',
		'ten',
		'teo',
		'tep',
		'teq',
		'ter',
		'tes',
		'tet',
		'teu',
		'tev',
		'tew',
		'tex',
		'tey',
		'tez',
		'tfi',
		'tfn',
		'tfo',
		'tfr',
		'tft',
		'tga',
		'tgb',
		'tgc',
		'tgd',
		'tge',
		'tgf',
		'tgg',
		'tgh',
		'tgi',
		'tgj',
		'tgn',
		'tgo',
		'tgp',
		'tgq',
		'tgr',
		'tgs',
		'tgt',
		'tgu',
		'tgv',
		'tgw',
		'tgx',
		'tgy',
		'tgz',
		'thc',
		'thd',
		'the',
		'thf',
		'thh',
		'thi',
		'thk',
		'thl',
		'thm',
		'thn',
		'thp',
		'thq',
		'thr',
		'ths',
		'tht',
		'thu',
		'thv',
		'thw',
		'thx',
		'thy',
		'thz',
		'tia',
		'tic',
		'tid',
		'tie',
		'tif',
		'tig',
		'tih',
		'tii',
		'tij',
		'tik',
		'til',
		'tim',
		'tin',
		'tio',
		'tip',
		'tiq',
		'tis',
		'tit',
		'tiu',
		'tiv',
		'tiw',
		'tix',
		'tiy',
		'tiz',
		'tja',
		'tjg',
		'tji',
		'tjl',
		'tjm',
		'tjn',
		'tjo',
		'tjs',
		'tju',
		'tjw',
		'tka',
		'tkb',
		'tkd',
		'tke',
		'tkf',
		'tkg',
		'tkk',
		'tkl',
		'tkm',
		'tkn',
		'tkp',
		'tkq',
		'tkr',
		'tks',
		'tkt',
		'tku',
		'tkv',
		'tkw',
		'tkx',
		'tkz',
		'tla',
		'tlb',
		'tlc',
		'tld',
		'tlf',
		'tlg',
		'tlh',
		'tli',
		'tlj',
		'tlk',
		'tll',
		'tlm',
		'tln',
		'tlo',
		'tlp',
		'tlq',
		'tlr',
		'tls',
		'tlt',
		'tlu',
		'tlv',
		'tlw',
		'tlx',
		'tly',
		'tma',
		'tmb',
		'tmc',
		'tmd',
		'tme',
		'tmf',
		'tmg',
		'tmh',
		'tmi',
		'tmj',
		'tmk',
		'tml',
		'tmm',
		'tmn',
		'tmo',
		'tmp',
		'tmq',
		'tmr',
		'tms',
		'tmt',
		'tmu',
		'tmv',
		'tmw',
		'tmy',
		'tmz',
		'tna',
		'tnb',
		'tnc',
		'tnd',
		'tne',
		'tnf',
		'tng',
		'tnh',
		'tni',
		'tnk',
		'tnl',
		'tnm',
		'tnn',
		'tno',
		'tnp',
		'tnq',
		'tnr',
		'tns',
		'tnt',
		'tnu',
		'tnv',
		'tnw',
		'tnx',
		'tny',
		'tnz',
		'tob',
		'toc',
		'tod',
		'toe',
		'tof',
		'tog',
		'toh',
		'toi',
		'toj',
		'tol',
		'tom',
		'too',
		'top',
		'toq',
		'tor',
		'tos',
		'tou',
		'tov',
		'tow',
		'tox',
		'toy',
		'toz',
		'tpa',
		'tpc',
		'tpe',
		'tpf',
		'tpg',
		'tpi',
		'tpj',
		'tpk',
		'tpl',
		'tpm',
		'tpn',
		'tpo',
		'tpp',
		'tpq',
		'tpr',
		'tpt',
		'tpu',
		'tpv',
		'tpw',
		'tpx',
		'tpy',
		'tpz',
		'tqb',
		'tql',
		'tqm',
		'tqn',
		'tqo',
		'tqp',
		'tqq',
		'tqr',
		'tqt',
		'tqu',
		'tqw',
		'tra',
		'trb',
		'trc',
		'trd',
		'tre',
		'trf',
		'trg',
		'trh',
		'tri',
		'trj',
		'trk',
		'trl',
		'trm',
		'trn',
		'tro',
		'trp',
		'trq',
		'trr',
		'trs',
		'trt',
		'tru',
		'trv',
		'trw',
		'trx',
		'try',
		'trz',
		'tsa',
		'tsb',
		'tsc',
		'tsd',
		'tse',
		'tsf',
		'tsg',
		'tsh',
		'tsi',
		'tsj',
		'tsk',
		'tsl',
		'tsm',
		'tsp',
		'tsq',
		'tsr',
		'tss',
		'tst',
		'tsu',
		'tsv',
		'tsw',
		'tsx',
		'tsy',
		'tsz',
		'tta',
		'ttb',
		'ttc',
		'ttd',
		'tte',
		'ttf',
		'ttg',
		'tth',
		'tti',
		'ttj',
		'ttk',
		'ttl',
		'ttm',
		'ttn',
		'tto',
		'ttp',
		'ttq',
		'ttr',
		'tts',
		'ttt',
		'ttu',
		'ttv',
		'ttw',
		'tty',
		'ttz',
		'tua',
		'tub',
		'tuc',
		'tud',
		'tue',
		'tuf',
		'tug',
		'tuh',
		'tui',
		'tuj',
		'tul',
		'tum',
		'tun',
		'tuo',
		'tup',
		'tuq',
		'tus',
		'tut',
		'tuu',
		'tuv',
		'tuw',
		'tux',
		'tuy',
		'tuz',
		'tva',
		'tvd',
		'tve',
		'tvk',
		'tvl',
		'tvm',
		'tvn',
		'tvo',
		'tvs',
		'tvt',
		'tvu',
		'tvw',
		'tvy',
		'twa',
		'twb',
		'twc',
		'twd',
		'twe',
		'twf',
		'twg',
		'twh',
		'twl',
		'twm',
		'twn',
		'two',
		'twp',
		'twq',
		'twr',
		'twt',
		'twu',
		'tww',
		'twx',
		'twy',
		'txa',
		'txb',
		'txc',
		'txe',
		'txg',
		'txh',
		'txi',
		'txj',
		'txm',
		'txn',
		'txo',
		'txq',
		'txr',
		'txs',
		'txt',
		'txu',
		'txx',
		'txy',
		'tya',
		'tye',
		'tyh',
		'tyi',
		'tyj',
		'tyl',
		'tyn',
		'typ',
		'tyr',
		'tys',
		'tyt',
		'tyu',
		'tyv',
		'tyx',
		'tyz',
		'tza',
		'tzh',
		'tzj',
		'tzl',
		'tzm',
		'tzn',
		'tzo',
		'tzx',
		'uam',
		'uan',
		'uar',
		'uba',
		'ubi',
		'ubl',
		'ubr',
		'ubu',
		'uby',
		'uda',
		'ude',
		'udg',
		'udi',
		'udj',
		'udl',
		'udm',
		'udu',
		'ues',
		'ufi',
		'uga',
		'ugb',
		'uge',
		'ugn',
		'ugo',
		'ugy',
		'uha',
		'uhn',
		'uis',
		'uiv',
		'uji',
		'uka',
		'ukg',
		'ukh',
		'ukk',
		'ukl',
		'ukp',
		'ukq',
		'uks',
		'uku',
		'ukw',
		'uky',
		'ula',
		'ulb',
		'ulc',
		'ule',
		'ulf',
		'uli',
		'ulk',
		'ull',
		'ulm',
		'uln',
		'ulu',
		'ulw',
		'uma',
		'umb',
		'umc',
		'umd',
		'umg',
		'umi',
		'umm',
		'umn',
		'umo',
		'ump',
		'umr',
		'ums',
		'umu',
		'una',
		'und',
		'une',
		'ung',
		'unk',
		'unm',
		'unn',
		'unp',
		'unr',
		'unu',
		'unx',
		'unz',
		'uok',
		'upi',
		'upv',
		'ura',
		'urb',
		'urc',
		'ure',
		'urf',
		'urg',
		'urh',
		'uri',
		'urj',
		'urk',
		'url',
		'urm',
		'urn',
		'uro',
		'urp',
		'urr',
		'urt',
		'uru',
		'urv',
		'urw',
		'urx',
		'ury',
		'urz',
		'usa',
		'ush',
		'usi',
		'usk',
		'usp',
		'usu',
		'uta',
		'ute',
		'utp',
		'utr',
		'utu',
		'uum',
		'uun',
		'uur',
		'uuu',
		'uve',
		'uvh',
		'uvl',
		'uwa',
		'uya',
		'uzn',
		'uzs',
		'vaa',
		'vae',
		'vaf',
		'vag',
		'vah',
		'vai',
		'vaj',
		'val',
		'vam',
		'van',
		'vao',
		'vap',
		'var',
		'vas',
		'vau',
		'vav',
		'vay',
		'vbb',
		'vbk',
		'vec',
		'ved',
		'vel',
		'vem',
		'veo',
		'vep',
		'ver',
		'vgr',
		'vgt',
		'vic',
		'vid',
		'vif',
		'vig',
		'vil',
		'vin',
		'vis',
		'vit',
		'viv',
		'vka',
		'vki',
		'vkj',
		'vkk',
		'vkl',
		'vkm',
		'vko',
		'vkp',
		'vkt',
		'vku',
		'vlp',
		'vls',
		'vma',
		'vmb',
		'vmc',
		'vmd',
		'vme',
		'vmf',
		'vmg',
		'vmh',
		'vmi',
		'vmj',
		'vmk',
		'vml',
		'vmm',
		'vmp',
		'vmq',
		'vmr',
		'vms',
		'vmu',
		'vmv',
		'vmw',
		'vmx',
		'vmy',
		'vmz',
		'vnk',
		'vnm',
		'vnp',
		'vor',
		'vot',
		'vra',
		'vro',
		'vrs',
		'vrt',
		'vsi',
		'vsl',
		'vsv',
		'vto',
		'vum',
		'vun',
		'vut',
		'vwa',
		'waa',
		'wab',
		'wac',
		'wad',
		'wae',
		'waf',
		'wag',
		'wah',
		'wai',
		'waj',
		'wak',
		'wal',
		'wam',
		'wan',
		'wao',
		'wap',
		'waq',
		'war',
		'was',
		'wat',
		'wau',
		'wav',
		'waw',
		'wax',
		'way',
		'waz',
		'wba',
		'wbb',
		'wbe',
		'wbf',
		'wbh',
		'wbi',
		'wbj',
		'wbk',
		'wbl',
		'wbm',
		'wbp',
		'wbq',
		'wbr',
		'wbs',
		'wbt',
		'wbv',
		'wbw',
		'wca',
		'wci',
		'wdd',
		'wdg',
		'wdj',
		'wdk',
		'wdu',
		'wdy',
		'wea',
		'wec',
		'wed',
		'weg',
		'weh',
		'wei',
		'wem',
		'wen',
		'weo',
		'wep',
		'wer',
		'wes',
		'wet',
		'weu',
		'wew',
		'wfg',
		'wga',
		'wgb',
		'wgg',
		'wgi',
		'wgo',
		'wgu',
		'wgw',
		'wgy',
		'wha',
		'whg',
		'whk',
		'whu',
		'wib',
		'wic',
		'wie',
		'wif',
		'wig',
		'wih',
		'wii',
		'wij',
		'wik',
		'wil',
		'wim',
		'win',
		'wir',
		'wit',
		'wiu',
		'wiv',
		'wiw',
		'wiy',
		'wja',
		'wji',
		'wka',
		'wkb',
		'wkd',
		'wkl',
		'wku',
		'wkw',
		'wky',
		'wla',
		'wlc',
		'wle',
		'wlg',
		'wli',
		'wlk',
		'wll',
		'wlm',
		'wlo',
		'wlr',
		'wls',
		'wlu',
		'wlv',
		'wlw',
		'wlx',
		'wly',
		'wma',
		'wmb',
		'wmc',
		'wmd',
		'wme',
		'wmh',
		'wmi',
		'wmm',
		'wmn',
		'wmo',
		'wms',
		'wmt',
		'wmw',
		'wmx',
		'wnb',
		'wnc',
		'wnd',
		'wne',
		'wng',
		'wni',
		'wnk',
		'wnm',
		'wnn',
		'wno',
		'wnp',
		'wnu',
		'wnw',
		'wny',
		'woa',
		'wob',
		'woc',
		'wod',
		'woe',
		'wof',
		'wog',
		'woi',
		'wok',
		'wom',
		'won',
		'woo',
		'wor',
		'wos',
		'wow',
		'woy',
		'wpc',
		'wra',
		'wrb',
		'wrd',
		'wrg',
		'wrh',
		'wri',
		'wrk',
		'wrl',
		'wrm',
		'wrn',
		'wro',
		'wrp',
		'wrr',
		'wrs',
		'wru',
		'wrv',
		'wrw',
		'wrx',
		'wry',
		'wrz',
		'wsa',
		'wsg',
		'wsi',
		'wsk',
		'wsr',
		'wss',
		'wsu',
		'wsv',
		'wtf',
		'wth',
		'wti',
		'wtk',
		'wtm',
		'wtw',
		'wua',
		'wub',
		'wud',
		'wuh',
		'wul',
		'wum',
		'wun',
		'wur',
		'wut',
		'wuu',
		'wuv',
		'wux',
		'wuy',
		'wwa',
		'wwb',
		'wwo',
		'wwr',
		'www',
		'wxa',
		'wxw',
		'wya',
		'wyb',
		'wyi',
		'wym',
		'wyr',
		'wyy',
		'xaa',
		'xab',
		'xac',
		'xad',
		'xae',
		'xag',
		'xai',
		'xaj',
		'xak',
		'xal',
		'xam',
		'xan',
		'xao',
		'xap',
		'xaq',
		'xar',
		'xas',
		'xat',
		'xau',
		'xav',
		'xaw',
		'xay',
		'xba',
		'xbb',
		'xbc',
		'xbd',
		'xbe',
		'xbg',
		'xbi',
		'xbj',
		'xbm',
		'xbn',
		'xbo',
		'xbp',
		'xbr',
		'xbw',
		'xbx',
		'xby',
		'xcb',
		'xcc',
		'xce',
		'xcg',
		'xch',
		'xcl',
		'xcm',
		'xcn',
		'xco',
		'xcr',
		'xct',
		'xcu',
		'xcv',
		'xcw',
		'xcy',
		'xda',
		'xdc',
		'xdk',
		'xdm',
		'xdo',
		'xdy',
		'xeb',
		'xed',
		'xeg',
		'xel',
		'xem',
		'xep',
		'xer',
		'xes',
		'xet',
		'xeu',
		'xfa',
		'xga',
		'xgb',
		'xgd',
		'xgf',
		'xgg',
		'xgi',
		'xgl',
		'xgm',
		'xgn',
		'xgr',
		'xgu',
		'xgw',
		'xha',
		'xhc',
		'xhd',
		'xhe',
		'xhr',
		'xht',
		'xhu',
		'xhv',
		'xia',
		'xib',
		'xii',
		'xil',
		'xin',
		'xip',
		'xir',
		'xis',
		'xiv',
		'xiy',
		'xjb',
		'xjt',
		'xka',
		'xkb',
		'xkc',
		'xkd',
		'xke',
		'xkf',
		'xkg',
		'xkh',
		'xki',
		'xkj',
		'xkk',
		'xkl',
		'xkn',
		'xko',
		'xkp',
		'xkq',
		'xkr',
		'xks',
		'xkt',
		'xku',
		'xkv',
		'xkw',
		'xkx',
		'xky',
		'xkz',
		'xla',
		'xlb',
		'xlc',
		'xld',
		'xle',
		'xlg',
		'xli',
		'xln',
		'xlo',
		'xlp',
		'xls',
		'xlu',
		'xly',
		'xma',
		'xmb',
		'xmc',
		'xmd',
		'xme',
		'xmf',
		'xmg',
		'xmh',
		'xmj',
		'xmk',
		'xml',
		'xmm',
		'xmn',
		'xmo',
		'xmp',
		'xmq',
		'xmr',
		'xms',
		'xmt',
		'xmu',
		'xmv',
		'xmw',
		'xmx',
		'xmy',
		'xmz',
		'xna',
		'xnb',
		'xnd',
		'xng',
		'xnh',
		'xni',
		'xnk',
		'xnn',
		'xno',
		'xnr',
		'xns',
		'xnt',
		'xnu',
		'xny',
		'xnz',
		'xoc',
		'xod',
		'xog',
		'xoi',
		'xok',
		'xom',
		'xon',
		'xoo',
		'xop',
		'xor',
		'xow',
		'xpa',
		'xpc',
		'xpe',
		'xpg',
		'xpi',
		'xpj',
		'xpk',
		'xpm',
		'xpn',
		'xpo',
		'xpp',
		'xpq',
		'xpr',
		'xps',
		'xpt',
		'xpu',
		'xpy',
		'xqa',
		'xqt',
		'xra',
		'xrb',
		'xrd',
		'xre',
		'xrg',
		'xri',
		'xrm',
		'xrn',
		'xrq',
		'xrr',
		'xrt',
		'xru',
		'xrw',
		'xsa',
		'xsb',
		'xsc',
		'xsd',
		'xse',
		'xsh',
		'xsi',
		'xsj',
		'xsl',
		'xsm',
		'xsn',
		'xso',
		'xsp',
		'xsq',
		'xsr',
		'xss',
		'xsu',
		'xsv',
		'xsy',
		'xta',
		'xtb',
		'xtc',
		'xtd',
		'xte',
		'xtg',
		'xth',
		'xti',
		'xtj',
		'xtl',
		'xtm',
		'xtn',
		'xto',
		'xtp',
		'xtq',
		'xtr',
		'xts',
		'xtt',
		'xtu',
		'xtv',
		'xtw',
		'xty',
		'xtz',
		'xua',
		'xub',
		'xud',
		'xug',
		'xuj',
		'xul',
		'xum',
		'xun',
		'xuo',
		'xup',
		'xur',
		'xut',
		'xuu',
		'xve',
		'xvi',
		'xvn',
		'xvo',
		'xvs',
		'xwa',
		'xwc',
		'xwd',
		'xwe',
		'xwg',
		'xwj',
		'xwk',
		'xwl',
		'xwo',
		'xwr',
		'xwt',
		'xww',
		'xxb',
		'xxk',
		'xxm',
		'xxr',
		'xxt',
		'xya',
		'xyb',
		'xyj',
		'xyk',
		'xyl',
		'xyt',
		'xyy',
		'xzh',
		'xzm',
		'xzp',
		'yaa',
		'yab',
		'yac',
		'yad',
		'yae',
		'yaf',
		'yag',
		'yah',
		'yai',
		'yaj',
		'yak',
		'yal',
		'yam',
		'yan',
		'yao',
		'yap',
		'yaq',
		'yar',
		'yas',
		'yat',
		'yau',
		'yav',
		'yaw',
		'yax',
		'yay',
		'yaz',
		'yba',
		'ybb',
		'ybd',
		'ybe',
		'ybh',
		'ybi',
		'ybj',
		'ybk',
		'ybl',
		'ybm',
		'ybn',
		'ybo',
		'ybx',
		'yby',
		'ych',
		'ycl',
		'ycn',
		'ycp',
		'yda',
		'ydd',
		'yde',
		'ydg',
		'ydk',
		'yds',
		'yea',
		'yec',
		'yee',
		'yei',
		'yej',
		'yel',
		'yen',
		'yer',
		'yes',
		'yet',
		'yeu',
		'yev',
		'yey',
		'yga',
		'ygi',
		'ygl',
		'ygm',
		'ygp',
		'ygr',
		'ygs',
		'ygu',
		'ygw',
		'yha',
		'yhd',
		'yhl',
		'yhs',
		'yia',
		'yif',
		'yig',
		'yih',
		'yii',
		'yij',
		'yik',
		'yil',
		'yim',
		'yin',
		'yip',
		'yiq',
		'yir',
		'yis',
		'yit',
		'yiu',
		'yiv',
		'yix',
		'yiy',
		'yiz',
		'yka',
		'ykg',
		'yki',
		'ykk',
		'ykl',
		'ykm',
		'ykn',
		'yko',
		'ykr',
		'ykt',
		'yku',
		'yky',
		'yla',
		'ylb',
		'yle',
		'ylg',
		'yli',
		'yll',
		'ylm',
		'yln',
		'ylo',
		'ylr',
		'ylu',
		'yly',
		'yma',
		'ymb',
		'ymc',
		'ymd',
		'yme',
		'ymg',
		'ymh',
		'ymi',
		'ymk',
		'yml',
		'ymm',
		'ymn',
		'ymo',
		'ymp',
		'ymq',
		'ymr',
		'yms',
		'ymt',
		'ymx',
		'ymz',
		'yna',
		'ynd',
		'yne',
		'yng',
		'ynh',
		'ynk',
		'ynl',
		'ynn',
		'yno',
		'ynq',
		'yns',
		'ynu',
		'yob',
		'yog',
		'yoi',
		'yok',
		'yol',
		'yom',
		'yon',
		'yos',
		'yot',
		'yox',
		'yoy',
		'ypa',
		'ypb',
		'ypg',
		'yph',
		'ypk',
		'ypm',
		'ypn',
		'ypo',
		'ypp',
		'ypz',
		'yra',
		'yrb',
		'yre',
		'yri',
		'yrk',
		'yrl',
		'yrm',
		'yrn',
		'yro',
		'yrs',
		'yrw',
		'yry',
		'ysc',
		'ysd',
		'ysg',
		'ysl',
		'ysn',
		'yso',
		'ysp',
		'ysr',
		'yss',
		'ysy',
		'yta',
		'ytl',
		'ytp',
		'ytw',
		'yty',
		'yua',
		'yub',
		'yuc',
		'yud',
		'yue',
		'yuf',
		'yug',
		'yui',
		'yuj',
		'yuk',
		'yul',
		'yum',
		'yun',
		'yup',
		'yuq',
		'yur',
		'yut',
		'yuu',
		'yuw',
		'yux',
		'yuy',
		'yuz',
		'yva',
		'yvt',
		'ywa',
		'ywg',
		'ywl',
		'ywn',
		'ywq',
		'ywr',
		'ywt',
		'ywu',
		'yww',
		'yxa',
		'yxg',
		'yxl',
		'yxm',
		'yxu',
		'yxy',
		'yyr',
		'yyu',
		'yyz',
		'yzg',
		'yzk',
		'zaa',
		'zab',
		'zac',
		'zad',
		'zae',
		'zaf',
		'zag',
		'zah',
		'zai',
		'zaj',
		'zak',
		'zal',
		'zam',
		'zao',
		'zap',
		'zaq',
		'zar',
		'zas',
		'zat',
		'zau',
		'zav',
		'zaw',
		'zax',
		'zay',
		'zaz',
		'zbc',
		'zbe',
		'zbl',
		'zbt',
		'zbw',
		'zca',
		'zch',
		'zdj',
		'zea',
		'zeg',
		'zeh',
		'zen',
		'zga',
		'zgb',
		'zgh',
		'zgm',
		'zgn',
		'zgr',
		'zhb',
		'zhd',
		'zhi',
		'zhn',
		'zhw',
		'zhx',
		'zia',
		'zib',
		'zik',
		'zil',
		'zim',
		'zin',
		'zir',
		'ziw',
		'ziz',
		'zka',
		'zkb',
		'zkd',
		'zkg',
		'zkh',
		'zkk',
		'zkn',
		'zko',
		'zkp',
		'zkr',
		'zkt',
		'zku',
		'zkv',
		'zkz',
		'zle',
		'zlj',
		'zlm',
		'zln',
		'zlq',
		'zls',
		'zlw',
		'zma',
		'zmb',
		'zmc',
		'zmd',
		'zme',
		'zmf',
		'zmg',
		'zmh',
		'zmi',
		'zmj',
		'zmk',
		'zml',
		'zmm',
		'zmn',
		'zmo',
		'zmp',
		'zmq',
		'zmr',
		'zms',
		'zmt',
		'zmu',
		'zmv',
		'zmw',
		'zmx',
		'zmy',
		'zmz',
		'zna',
		'znd',
		'zne',
		'zng',
		'znk',
		'zns',
		'zoc',
		'zoh',
		'zom',
		'zoo',
		'zoq',
		'zor',
		'zos',
		'zpa',
		'zpb',
		'zpc',
		'zpd',
		'zpe',
		'zpf',
		'zpg',
		'zph',
		'zpi',
		'zpj',
		'zpk',
		'zpl',
		'zpm',
		'zpn',
		'zpo',
		'zpp',
		'zpq',
		'zpr',
		'zps',
		'zpt',
		'zpu',
		'zpv',
		'zpw',
		'zpx',
		'zpy',
		'zpz',
		'zqe',
		'zra',
		'zrg',
		'zrn',
		'zro',
		'zrp',
		'zrs',
		'zsa',
		'zsk',
		'zsl',
		'zsm',
		'zsr',
		'zsu',
		'zte',
		'ztg',
		'ztl',
		'ztm',
		'ztn',
		'ztp',
		'ztq',
		'zts',
		'ztt',
		'ztu',
		'ztx',
		'zty',
		'zua',
		'zuh',
		'zum',
		'zun',
		'zuy',
		'zwa',
		'zxx',
		'zyb',
		'zyg',
		'zyj',
		'zyn',
		'zyp',
		'zza',
		'zzj'
	];

	/**
	 * Returns array of valid language codes
	 * @method validLangs
	 * @memberof axe.utils
	 * @return {Array<Sting>} Valid language codes
	 */
	function validLangs() {
		return langs;
	}

	exports.DqElement = DqElement;
	exports.aggregate = aggregate;
	exports.aggregateChecks = aggregateChecks;
	exports.aggregateNodeResults = aggregateNodeResults;
	exports.aggregateResult = aggregateResult;
	exports.areStylesSet = areStylesSet;
	exports.assert = assert;
	exports.checkHelper = checkHelper;
	exports.clone = clone;
	exports.collectResultsFromFrames = collectResultsFromFrames;
	exports.contains = contains;
	exports.cssParser = parser;
	exports.escapeSelector = escapeSelector;
	exports.extendMetaData = extendMetaData;
	exports.finalizeRuleResult = finalizeResult;
	exports.findBy = findBy;
	exports.getAllChecks = getAllChecks;
	exports.getBaseLang = getBaseLang;
	exports.getCheckOption = getCheckOption;
	exports.getFlattenedTree = getFlattenedTree;
	exports.getFriendlyUriEnd = getFriendlyUriEnd;
	exports.getNodeAttributes = getNodeAttributes;
	exports.getNodeFromTree = getNodeFromTree;
	exports.getPreloadConfig = getPreloadConfig;
	exports.getRootNode = getRootNode;
	exports.getScroll = getScroll;
	exports.getScrollState = getScrollState;
	exports.getSelector = getSelector;
	exports.getSelectorData = getSelectorData;
	exports.getStyleSheetFactory = getStyleSheetFactory;
	exports.getXpath = getXpath;
	exports.injectStyle = injectStyle;
	exports.isHidden = isHidden;
	exports.isHtmlElement = isHtmlElement;
	exports.isShadowRoot = isShadowRoot;
	exports.isXHTML = isXHTML;
	exports.matchesSelector = matchesSelector;
	exports.mergeResults = mergeResults;
	exports.nodeSorter = nodeSorter;
	exports.parseCrossOriginStylesheet = parseCrossOriginStylesheet;
	exports.parseSameOriginStylesheet = parseSameOriginStylesheet;
	exports.parseStylesheet = parseStylesheet;
	exports.performanceTimer = performanceTimer;
	exports.pollyfillElementsFromPoint = pollyfillElementsFromPoint;
	exports.preload = preload;
	exports.preloadCssom = preloadCssom;
	exports.publishMetaData = publishMetaData;
	exports.querySelectorAll = querySelectorAll;
	exports.querySelectorAllFilter = querySelectorAllFilter;
	exports.queue = queue;
	exports.respondable = respondable$1;
	exports.ruleShouldRun = ruleShouldRun;
	exports.select = select;
	exports.sendCommandToFrame = sendCommandToFrame$1;
	exports.setScrollState = setScrollState;
	exports.shouldPreload = shouldPreload;
	exports.toArray = toArray;
	exports.tokenList = tokenList;
	exports.uniqueArray = uniqueArray;
	exports.uuid = uuid;
	exports.validInputTypes = validInputTypes;
	exports.validLangs = validLangs;

	return exports;
})({});
