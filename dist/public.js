var myExport = (function(exports) {
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
	function isNodeInContext$1(node, context) {
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
				return isNodeInContext$1(node, context);
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

	// TODO: axe._audit

	const plugins = {};

	function Plugin(spec) {
		this._run = spec.run;
		this._collect = spec.collect;
		this._registry = {};
		spec.commands.forEach(function(command) {
			axe._audit.registerCommand(command);
		});
	}

	Plugin.prototype.run = function() {
		return this._run.apply(this, arguments);
	};

	Plugin.prototype.collect = function() {
		return this._collect.apply(this, arguments);
	};

	Plugin.prototype.cleanup = function(done) {
		var q = queue();
		var that = this;
		Object.keys(this._registry).forEach(function(key) {
			q.defer(function(done) {
				that._registry[key].cleanup(done);
			});
		});
		q.then(function() {
			done();
		});
	};

	Plugin.prototype.add = function(impl) {
		this._registry[impl.id] = impl;
	};

	function registerPlugin(plugin) {
		plugins[plugin.id] = new Plugin(plugin);
	}

	// TODO: axe._audit

	function cleanup(resolve, reject) {
		resolve = resolve || function() {};
		reject = reject || log;

		if (!axe._audit) {
			throw new Error('No audit configured');
		}

		var q = queue();
		// If a plugin fails it's cleanup, we still want the others to run
		var cleanupErrors = [];

		Object.keys(plugins).forEach(function(key) {
			q.defer(function(res) {
				var rej = function(err) {
					cleanupErrors.push(err);
					res();
				};
				try {
					plugins[key].cleanup(res, rej);
				} catch (err) {
					rej(err);
				}
			});
		});

		var flattenedTree = getFlattenedTree(document.body);

		querySelectorAll(flattenedTree, 'iframe, frame').forEach(function(node) {
			q.defer(function(res, rej) {
				return sendCommandToFrame$1(
					node.actualNode,
					{
						command: 'cleanup-plugin'
					},
					res,
					rej
				);
			});
		});

		q.then(function(results) {
			if (cleanupErrors.length === 0) {
				resolve(results);
			} else {
				reject(cleanupErrors);
			}
		}).catch(reject);
	}

	var reporters = {};
	var defaultReporter;

	function getReporter(reporter) {
		if (typeof reporter === 'string' && reporters[reporter]) {
			return reporters[reporter];
		}

		if (typeof reporter === 'function') {
			return reporter;
		}

		return defaultReporter;
	}

	function addReporter(name, cb, isDefault) {
		reporters[name] = cb;
		if (isDefault) {
			defaultReporter = cb;
		}
	}

	// TODO: axe._audit, axe.version

	function configure(spec) {
		var audit;

		audit = axe._audit;
		if (!audit) {
			throw new Error('No audit configured');
		}

		if (spec.axeVersion || spec.ver) {
			let specVersion = spec.axeVersion || spec.ver;
			if (!/^\d+\.\d+\.\d+(-canary)?/.test(specVersion)) {
				throw new Error(`Invalid configured version ${specVersion}`);
			}

			let [version, canary] = specVersion.split('-');
			let [major, minor, patch] = version.split('.').map(Number);

			let [axeVersion, axeCanary] = axe.version.split('-');
			let [axeMajor, axeMinor, axePatch] = axeVersion.split('.').map(Number);

			if (
				major !== axeMajor ||
				axeMinor < minor ||
				(axeMinor === minor && axePatch < patch) ||
				(major === axeMajor &&
					minor === axeMinor &&
					patch === axePatch &&
					canary &&
					canary !== axeCanary)
			) {
				throw new Error(
					`Configured version ${specVersion} is not compatible with current axe version ${axe.version}`
				);
			}
		}

		if (
			spec.reporter &&
			(typeof spec.reporter === 'function' || getReporter(spec.reporter))
		) {
			audit.reporter = spec.reporter;
		}

		if (spec.checks) {
			spec.checks.forEach(function(check) {
				audit.addCheck(check);
			});
		}

		const modifiedRules = [];
		if (spec.rules) {
			spec.rules.forEach(function(rule) {
				modifiedRules.push(rule.id);
				audit.addRule(rule);
			});
		}

		if (spec.disableOtherRules) {
			audit.rules.forEach(rule => {
				if (modifiedRules.includes(rule.id) === false) {
					rule.enabled = false;
				}
			});
		}

		if (typeof spec.branding !== 'undefined') {
			audit.setBranding(spec.branding);
		} else {
			audit._constructHelpUrls();
		}

		if (spec.tagExclude) {
			audit.tagExclude = spec.tagExclude;
		}

		// Support runtime localization
		if (spec.locale) {
			audit.applyLocale(spec.locale);
		}
	}

	// TODO: axe._audit

	/**
	 * Searches and returns rules that contain a tag in the list of tags.
	 * @param  {Array}   tags  Optional array of tags
	 * @return {Array}  Array of rules
	 */
	function getRules(tags) {
		tags = tags || [];
		var matchingRules = !tags.length
			? axe._audit.rules
			: axe._audit.rules.filter(function(item) {
					return !!tags.filter(function(tag) {
						return item.tags.indexOf(tag) !== -1;
					}).length;
			  });

		var ruleData = axe._audit.data.rules || {};
		return matchingRules.map(function(matchingRule) {
			var rd = ruleData[matchingRule.id] || {};
			return {
				ruleId: matchingRule.id,
				description: rd.description,
				help: rd.help,
				helpUrl: rd.helpUrl,
				tags: matchingRule.tags
			};
		});
	}

	// TODO: axe.imports, axe.version, axe._selectCache

	function getDefaultConfiguration(audit) {
		var config;
		if (audit) {
			config = clone(audit);
			// Commons are configured into axe like everything else,
			// however because things go funky if we have multiple commons objects
			// we're not using the copy of that.
			config.commons = audit.commons;
		} else {
			config = {};
		}

		config.reporter = config.reporter || null;
		config.rules = config.rules || [];
		config.checks = config.checks || [];
		config.data = { checks: {}, rules: {}, ...config.data };
		return config;
	}

	function unpackToObject(collection, audit, method) {
		var i, l;
		for (i = 0, l = collection.length; i < l; i++) {
			audit[method](collection[i]);
		}
	}

	/**
	 * Constructor which holds configured rules and information about the document under test
	 */
	function Audit(audit) {
		// defaults
		this.brand = 'axe';
		this.application = 'axeAPI';
		this.tagExclude = ['experimental'];
		this.lang = 'en';

		this.defaultConfig = audit;
		this._init();

		// A copy of the "default" locale. This will be set if the user
		// provides a new locale to `axe.configure()` and used to undo
		// changes in `axe.reset()`.
		this._defaultLocale = null;
	}

	/**
	 * Build and set the previous locale. Will noop if a previous
	 * locale was already set, as we want the ability to "reset"
	 * to the default ("first") configuration.
	 */

	Audit.prototype._setDefaultLocale = function() {
		if (this._defaultLocale) {
			return;
		}

		const locale = {
			checks: {},
			rules: {},
			failureSummaries: {},
			incompleteFallbackMessage: '',
			lang: this.lang
		};

		// XXX: unable to use `for-of` here, as doing so would
		// require us to polyfill `Symbol`.
		const checkIDs = Object.keys(this.data.checks);
		for (let i = 0; i < checkIDs.length; i++) {
			const id = checkIDs[i];
			const check = this.data.checks[id];
			const { pass, fail, incomplete } = check.messages;
			locale.checks[id] = {
				pass,
				fail,
				incomplete
			};
		}

		const ruleIDs = Object.keys(this.data.rules);
		for (let i = 0; i < ruleIDs.length; i++) {
			const id = ruleIDs[i];
			const rule = this.data.rules[id];
			const { description, help } = rule;
			locale.rules[id] = { description, help };
		}

		const failureSummaries = Object.keys(this.data.failureSummaries);
		for (let i = 0; i < failureSummaries.length; i++) {
			const type = failureSummaries[i];
			const failureSummary = this.data.failureSummaries[type];
			const { failureMessage } = failureSummary;
			locale.failureSummaries[type] = { failureMessage };
		}

		locale.incompleteFallbackMessage = this.data.incompleteFallbackMessage;

		this._defaultLocale = locale;
	};

	/**
	 * Reset the locale to the "default".
	 */

	Audit.prototype._resetLocale = function() {
		// If the default locale has not already been set, we can exit early.
		const defaultLocale = this._defaultLocale;
		if (!defaultLocale) {
			return;
		}

		// Apply the default locale
		this.applyLocale(defaultLocale);
	};

	/**
	 * Merge two check locales (a, b), favoring `b`.
	 *
	 * Both locale `a` and the returned shape resemble:
	 *
	 *    {
	 *      impact: string,
	 *      messages: {
	 *        pass: string | function,
	 *        fail: string | function,
	 *        incomplete: string | {
	 *          [key: string]: string | function
	 *        }
	 *      }
	 *    }
	 *
	 * Locale `b` follows the `axe.CheckLocale` shape and resembles:
	 *
	 *    {
	 *      pass: string,
	 *      fail: string,
	 *      incomplete: string | { [key: string]: string }
	 *    }
	 */

	const mergeCheckLocale = (a, b) => {
		let { pass, fail } = b;
		// If the message(s) are Strings, they have not yet been run
		// thru doT (which will return a Function).
		if (typeof pass === 'string') {
			pass = axe.imports.doT.compile(pass);
		}
		if (typeof fail === 'string') {
			fail = axe.imports.doT.compile(fail);
		}
		return {
			...a,
			messages: {
				pass: pass || a.messages.pass,
				fail: fail || a.messages.fail,
				incomplete:
					typeof a.messages.incomplete === 'object'
						? // TODO: for compleness-sake, we should be running
						  // incomplete messages thru doT as well. This was
						  // out-of-scope for runtime localization, but should
						  // eventually be addressed.
						  { ...a.messages.incomplete, ...b.incomplete }
						: b.incomplete
			}
		};
	};

	/**
	 * Merge two rule locales (a, b), favoring `b`.
	 */

	const mergeRuleLocale = (a, b) => {
		let { help, description } = b;
		// If the message(s) are Strings, they have not yet been run
		// thru doT (which will return a Function).
		if (typeof help === 'string') {
			help = axe.imports.doT.compile(help);
		}
		if (typeof description === 'string') {
			description = axe.imports.doT.compile(description);
		}
		return {
			...a,
			help: help || a.help,
			description: description || a.description
		};
	};

	/**
	 * Merge two failure messages (a, b), favoring `b`.
	 */

	const mergeFailureMessage = (a, b) => {
		let { failureMessage } = b;
		// If the message(s) are Strings, they have not yet been run
		// thru doT (which will return a Function).
		if (typeof failureMessage === 'string') {
			failureMessage = axe.imports.doT.compile(failureMessage);
		}
		return {
			...a,
			failureMessage: failureMessage || a.failureMessage
		};
	};

	/**
	 * Merge two incomplete fallback messages (a, b), favoring `b`.
	 */

	const mergeFallbackMessage = (a, b) => {
		if (typeof b === 'string') {
			b = axe.imports.doT.compile(b);
		}
		return b || a;
	};

	/**
	 * Apply locale for the given `checks`.
	 */

	Audit.prototype._applyCheckLocale = function(checks) {
		const keys = Object.keys(checks);
		for (let i = 0; i < keys.length; i++) {
			const id = keys[i];
			if (!this.data.checks[id]) {
				throw new Error(`Locale provided for unknown check: "${id}"`);
			}

			this.data.checks[id] = mergeCheckLocale(this.data.checks[id], checks[id]);
		}
	};

	/**
	 * Apply locale for the given `rules`.
	 */

	Audit.prototype._applyRuleLocale = function(rules) {
		const keys = Object.keys(rules);
		for (let i = 0; i < keys.length; i++) {
			const id = keys[i];
			if (!this.data.rules[id]) {
				throw new Error(`Locale provided for unknown rule: "${id}"`);
			}
			this.data.rules[id] = mergeRuleLocale(this.data.rules[id], rules[id]);
		}
	};

	/**
	 * Apply locale for the given failureMessage
	 */

	Audit.prototype._applyFailureSummaries = function(messages) {
		const keys = Object.keys(messages);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (!this.data.failureSummaries[key]) {
				throw new Error(`Locale provided for unknown failureMessage: "${key}"`);
			}
			this.data.failureSummaries[key] = mergeFailureMessage(
				this.data.failureSummaries[key],
				messages[key]
			);
		}
	};

	/**
	 * Apply the given `locale`.
	 *
	 * @param {axe.Locale}
	 */

	Audit.prototype.applyLocale = function(locale) {
		this._setDefaultLocale();

		if (locale.checks) {
			this._applyCheckLocale(locale.checks);
		}

		if (locale.rules) {
			this._applyRuleLocale(locale.rules);
		}

		if (locale.failureSummaries) {
			this._applyFailureSummaries(locale.failureSummaries, 'failureSummaries');
		}

		if (locale.incompleteFallbackMessage) {
			this.data.incompleteFallbackMessage = mergeFallbackMessage(
				this.data.incompleteFallbackMessage,
				locale.incompleteFallbackMessage
			);
		}

		if (locale.lang) {
			this.lang = locale.lang;
		}
	};

	/**
	 * Initializes the rules and checks
	 */
	Audit.prototype._init = function() {
		var audit = getDefaultConfiguration(this.defaultConfig);

		axe.commons = commons = audit.commons;

		this.reporter = audit.reporter;
		this.commands = {};
		this.rules = [];
		this.checks = {};

		unpackToObject(audit.rules, this, 'addRule');
		unpackToObject(audit.checks, this, 'addCheck');

		this.data = {};
		this.data.checks = (audit.data && audit.data.checks) || {};
		this.data.rules = (audit.data && audit.data.rules) || {};
		this.data.failureSummaries =
			(audit.data && audit.data.failureSummaries) || {};
		this.data.incompleteFallbackMessage =
			(audit.data && audit.data.incompleteFallbackMessage) || '';

		this._constructHelpUrls(); // create default helpUrls
	};

	/**
	 * Adds a new command to the audit
	 */

	Audit.prototype.registerCommand = function(command) {
		this.commands[command.id] = command.callback;
	};

	/**
	 * Adds a new rule to the Audit.  If a rule with specified ID already exists, it will be overridden
	 * @param {Object} spec Rule specification object
	 */
	Audit.prototype.addRule = function(spec) {
		if (spec.metadata) {
			this.data.rules[spec.id] = spec.metadata;
		}

		let rule = this.getRule(spec.id);
		if (rule) {
			rule.configure(spec);
		} else {
			this.rules.push(new Rule(spec, this));
		}
	};

	/**
	 * Adds a new check to the Audit.  If a Check with specified ID already exists, it will be
	 * reconfigured
	 *
	 * @param {Object} spec Check specification object
	 */
	Audit.prototype.addCheck = function(spec) {
		let metadata = spec.metadata;

		if (typeof metadata === 'object') {
			this.data.checks[spec.id] = metadata;
			// Transform messages into functions:
			if (typeof metadata.messages === 'object') {
				Object.keys(metadata.messages)
					.filter(
						prop =>
							metadata.messages.hasOwnProperty(prop) &&
							typeof metadata.messages[prop] === 'string'
					)
					.forEach(prop => {
						if (metadata.messages[prop].indexOf('function') === 0) {
							metadata.messages[prop] = new Function(
								'return ' + metadata.messages[prop] + ';'
							)();
						}
					});
			}
		}

		if (this.checks[spec.id]) {
			this.checks[spec.id].configure(spec);
		} else {
			this.checks[spec.id] = new Check(spec);
		}
	};

	/**
	 * Splits a given array of rules to two, with rules that can be run immediately and one's that are dependent on preloadedAssets
	 * @method getRulesToRun
	 * @param {Array<Object>} rules complete list of rules
	 * @param {Object} context
	 * @param {Object} options
	 * @return {Object} out, an object containing two arrays, one being list of rules to run now and list of rules to run later
	 * @private
	 */
	function getRulesToRun(rules, context, options) {
		// entry object for reduce function below
		const base = {
			now: [],
			later: []
		};

		// iterate through rules and separate out rules that need to be run now vs later
		const splitRules = rules.reduce((out, rule) => {
			// ensure rule can run
			if (!ruleShouldRun(rule, context, options)) {
				return out;
			}

			// does rule require preload assets - push to later array
			if (rule.preload) {
				out.later.push(rule);
				return out;
			}

			// default to now array
			out.now.push(rule);

			// return
			return out;
		}, base);

		// return
		return splitRules;
	}

	/**
	 * Convenience method, that consturcts a rule `run` function that can be deferred
	 * @param {Object} rule rule to be deferred
	 * @param {Object} context context object essential to be passed into rule `run`
	 * @param {Object} options normalised options to be passed into rule `run`
	 * @param {Object} assets (optional) preloaded assets to be passed into rule and checks (if the rule is preload dependent)
	 * @return {Function} a deferrable function for rule
	 */
	function getDefferedRule(rule, context, options) {
		// init performance timer of requested via options
		if (options.performanceTimer) {
			performanceTimer.mark('mark_rule_start_' + rule.id);
		}

		return (resolve, reject) => {
			// invoke `rule.run`
			rule.run(
				context,
				options,
				// resolve callback for rule `run`
				ruleResult => {
					// resolve
					resolve(ruleResult);
				},
				// reject callback for rule `run`
				err => {
					// if debug - construct error details
					if (!options.debug) {
						const errResult = Object.assign(new RuleResult(rule), {
							result: constants.CANTTELL,
							description: 'An error occured while running this rule',
							message: err.message,
							stack: err.stack,
							error: err,
							// Add a serialized reference to the node the rule failed on for easier debugging.
							// See https://github.com/dequelabs/axe-core/issues/1317.
							errorNode: err.errorNode
						});
						// resolve
						resolve(errResult);
					} else {
						// reject
						reject(err);
					}
				}
			);
		};
	}

	/**
	 * Runs the Audit; which in turn should call `run` on each rule.
	 * @async
	 * @param  {Context}   context The scope definition/context for analysis (include/exclude)
	 * @param  {Object}    options Options object to pass into rules and/or disable rules or checks
	 * @param  {Function} fn       Callback function to fire when audit is complete
	 */
	Audit.prototype.run = function(context, options, resolve, reject) {
		this.normalizeOptions(options);
		axe._selectCache = [];

		// get a list of rules to run NOW vs. LATER (later are preload assets dependent rules)
		const allRulesToRun = getRulesToRun(this.rules, context, options);
		const runNowRules = allRulesToRun.now;
		const runLaterRules = allRulesToRun.later;

		// init a NOW queue for rules to run immediately
		const nowRulesQueue = queue();
		// construct can run NOW rules into NOW queue
		runNowRules.forEach(rule => {
			nowRulesQueue.defer(getDefferedRule(rule, context, options));
		});

		// init a PRELOADER queue to start preloading assets
		const preloaderQueue = queue();
		// defer preload if preload dependent rules exist
		if (runLaterRules.length) {
			preloaderQueue.defer(resolve => {
				// handle both success and fail of preload
				// and resolve, to allow to run all checks
				preload(options)
					.then(assets => resolve(assets))
					.catch(err => {
						/**
						 * Note:
						 * we do not reject, to allow other (non-preload) rules to `run`
						 * -> instead we resolve as `undefined`
						 */
						console.warn(`Couldn't load preload assets: `, err);
						resolve(undefined);
					});
			});
		}

		// defer now and preload queue to run immediately
		const queueForNowRulesAndPreloader = queue();
		queueForNowRulesAndPreloader.defer(nowRulesQueue);
		queueForNowRulesAndPreloader.defer(preloaderQueue);

		// invoke the now queue
		queueForNowRulesAndPreloader
			.then(nowRulesAndPreloaderResults => {
				// interpolate results into separate variables
				const assetsFromQueue = nowRulesAndPreloaderResults.pop();
				if (assetsFromQueue && assetsFromQueue.length) {
					// result is a queue (again), hence the index resolution
					// assets is either an object of key value pairs of asset type and values
					// eg: cssom: [stylesheets]
					// or undefined if preload failed
					const assets = assetsFromQueue[0];
					// extend context with preloaded assets
					if (assets) {
						context = {
							...context,
							...assets
						};
					}
				}

				// the reminder of the results are RuleResults
				const nowRulesResults = nowRulesAndPreloaderResults[0];

				// if there are no rules to run LATER - resolve with rule results
				if (!runLaterRules.length) {
					// remove the cache
					axe._selectCache = undefined;
					// resolve
					resolve(nowRulesResults.filter(result => !!result));
					return;
				}

				// init a LATER queue for rules that are dependant on preloaded assets
				const laterRulesQueue = queue();
				runLaterRules.forEach(rule => {
					const deferredRule = getDefferedRule(rule, context, options);
					laterRulesQueue.defer(deferredRule);
				});
				// invoke the later queue
				laterRulesQueue
					.then(laterRuleResults => {
						// remove the cache
						axe._selectCache = undefined;
						// resolve
						resolve(
							nowRulesResults
								.concat(laterRuleResults)
								.filter(result => !!result)
						);
					})
					.catch(reject);
			})
			.catch(reject);
	};

	/**
	 * Runs Rule `after` post processing functions
	 * @param  {Array} results  Array of RuleResults to postprocess
	 * @param  {Mixed} options  Options object to pass into rules and/or disable rules or checks
	 */
	Audit.prototype.after = function(results, options) {
		var rules = this.rules;

		return results.map(function(ruleResult) {
			var rule = findBy(rules, 'id', ruleResult.id);
			if (!rule) {
				// If you see this, you're probably running the Mocha tests with the axe extension installed
				throw new Error(
					'Result for unknown rule. You may be running mismatch axe-core versions'
				);
			}

			return rule.after(ruleResult, options);
		});
	};

	/**
	 * Get the rule with a given ID
	 * @param  {string}
	 * @return {Rule}
	 */
	Audit.prototype.getRule = function(ruleId) {
		return this.rules.find(rule => rule.id === ruleId);
	};

	/**
	 * Ensure all rules that are expected to run exist
	 * @throws {Error} If any tag or rule specified in options is unknown
	 * @param  {Object} options  Options object
	 * @return {Object}          Validated options object
	 */
	Audit.prototype.normalizeOptions = function(options) {
		var audit = this;

		// Validate runOnly
		if (typeof options.runOnly === 'object') {
			if (Array.isArray(options.runOnly)) {
				options.runOnly = {
					type: 'tag',
					values: options.runOnly
				};
			}
			const only = options.runOnly;
			if (only.value && !only.values) {
				only.values = only.value;
				delete only.value;
			}

			if (!Array.isArray(only.values) || only.values.length === 0) {
				throw new Error('runOnly.values must be a non-empty array');
			}

			// Check if every value in options.runOnly is a known rule ID
			if (['rule', 'rules'].includes(only.type)) {
				only.type = 'rule';
				only.values.forEach(function(ruleId) {
					if (!audit.getRule(ruleId)) {
						throw new Error('unknown rule `' + ruleId + '` in options.runOnly');
					}
				});

				// Validate 'tags' (e.g. anything not 'rule')
			} else if (['tag', 'tags', undefined].includes(only.type)) {
				only.type = 'tag';
				const unmatchedTags = audit.rules.reduce((unmatchedTags, rule) => {
					return unmatchedTags.length
						? unmatchedTags.filter(tag => !rule.tags.includes(tag))
						: unmatchedTags;
				}, only.values);

				if (unmatchedTags.length !== 0) {
					log('Could not find tags `' + unmatchedTags.join('`, `') + '`');
				}
			} else {
				throw new Error(`Unknown runOnly type '${only.type}'`);
			}
		}

		if (typeof options.rules === 'object') {
			Object.keys(options.rules).forEach(function(ruleId) {
				if (!audit.getRule(ruleId)) {
					throw new Error('unknown rule `' + ruleId + '` in options.rules');
				}
			});
		}

		return options;
	};

	/*
	 * Updates the default options and then applies them
	 * @param  {Mixed} options  Options object
	 */

	Audit.prototype.setBranding = function(branding) {
		let previous = {
			brand: this.brand,
			application: this.application
		};
		if (
			branding &&
			branding.hasOwnProperty('brand') &&
			branding.brand &&
			typeof branding.brand === 'string'
		) {
			this.brand = branding.brand;
		}
		if (
			branding &&
			branding.hasOwnProperty('application') &&
			branding.application &&
			typeof branding.application === 'string'
		) {
			this.application = branding.application;
		}
		this._constructHelpUrls(previous);
	};

	/**
	 * For all the rules, create the helpUrl and add it to the data for that rule
	 */
	function getHelpUrl({ brand, application, lang }, ruleId, version) {
		return (
			constants.helpUrlBase +
			brand +
			'/' +
			(version || axe.version.substring(0, axe.version.lastIndexOf('.'))) +
			'/' +
			ruleId +
			'?application=' +
			encodeURIComponent(application) +
			(lang && lang !== 'en' ? '&lang=' + encodeURIComponent(lang) : '')
		);
	}

	Audit.prototype._constructHelpUrls = function(previous = null) {
		var version = (axe.version.match(/^[1-9][0-9]*\.[0-9]+/) || ['x.y'])[0];
		this.rules.forEach(rule => {
			if (!this.data.rules[rule.id]) {
				this.data.rules[rule.id] = {};
			}
			let metaData = this.data.rules[rule.id];
			if (
				typeof metaData.helpUrl !== 'string' ||
				(previous &&
					metaData.helpUrl === getHelpUrl(previous, rule.id, version))
			) {
				metaData.helpUrl = getHelpUrl(this, rule.id, version);
			}
		});
	};

	/**
	 * Reset the default rules, checks and meta data
	 */

	Audit.prototype.resetRulesAndChecks = function() {
		this._init();
		this._resetLocale();
	};

	// TODO: isNodeInContext

	/**
	 * Pushes a unique frame onto `frames` array, filtering any hidden iframes
	 * @private
	 * @param  {Array} collection The array of unique frames that is being operated on
	 * @param  {HTMLElement} frame   The frame to push onto Context
	 */
	function pushUniqueFrame(collection, frame) {
		if (isHidden(frame)) {
			return;
		}

		var fr = findBy(collection, 'node', frame);

		if (!fr) {
			collection.push({
				node: frame,
				include: [],
				exclude: []
			});
		}
	}

	/**
	 * Unshift selectors of matching iframes
	 * @private
	 * @param  {Context} context 	  The context object to operate on and assign to
	 * @param  {String} type          The "type" of context, 'include' or 'exclude'
	 * @param  {Array} selectorArray  Array of CSS selectors, each element represents a frame;
	 * where the last element is the actual node
	 */
	function pushUniqueFrameSelector(context, type, selectorArray) {
		context.frames = context.frames || [];

		var result, frame;
		var frames = document.querySelectorAll(selectorArray.shift());

		frameloop: for (var i = 0, l = frames.length; i < l; i++) {
			frame = frames[i];
			for (var j = 0, l2 = context.frames.length; j < l2; j++) {
				if (context.frames[j].node === frame) {
					context.frames[j][type].push(selectorArray);
					break frameloop;
				}
			}
			result = {
				node: frame,
				include: [],
				exclude: []
			};

			if (selectorArray) {
				result[type].push(selectorArray);
			}

			context.frames.push(result);
		}
	}

	/**
	 * Normalize the input of "context" so that many different methods of input are accepted
	 * @private
	 * @param  {Mixed} context  The configuration object passed to `Context`
	 * @return {Object}         Normalized context spec to include both `include` and `exclude` arrays
	 */
	function normalizeContext(context) {
		// typeof NodeList.length in PhantomJS === function
		if (
			(context && typeof context === 'object') ||
			context instanceof NodeList
		) {
			if (context instanceof Node) {
				return {
					include: [context],
					exclude: []
				};
			}

			if (
				context.hasOwnProperty('include') ||
				context.hasOwnProperty('exclude')
			) {
				return {
					include:
						context.include && +context.include.length
							? context.include
							: [document],
					exclude: context.exclude || []
				};
			}

			if (context.length === +context.length) {
				return {
					include: context,
					exclude: []
				};
			}
		}

		if (typeof context === 'string') {
			return {
				include: [context],
				exclude: []
			};
		}

		return {
			include: [document],
			exclude: []
		};
	}

	/**
	 * Finds frames in context, converts selectors to Element references and pushes unique frames
	 * @private
	 * @param  {Context} context The instance of Context to operate on
	 * @param  {String} type     The "type" of thing to parse, "include" or "exclude"
	 * @return {Array}           Parsed array of matching elements
	 */
	function parseSelectorArray(context, type) {
		var item,
			result = [],
			nodeList;
		for (var i = 0, l = context[type].length; i < l; i++) {
			item = context[type][i];
			// selector
			if (typeof item === 'string') {
				nodeList = Array.from(document.querySelectorAll(item));
				//eslint no-loop-func:0
				result = result.concat(
					nodeList.map(node => {
						return getNodeFromTree(node);
					})
				);
				break;
			} else if (item && item.length && !(item instanceof Node)) {
				if (item.length > 1) {
					pushUniqueFrameSelector(context, type, item);
				} else {
					nodeList = Array.from(document.querySelectorAll(item[0]));
					//eslint no-loop-func:0
					result = result.concat(
						nodeList.map(node => {
							return getNodeFromTree(node);
						})
					);
				}
			} else if (item instanceof Node) {
				if (item.documentElement instanceof Node) {
					result.push(context.flatTree[0]);
				} else {
					result.push(getNodeFromTree(item));
				}
			}
		}

		// filter nulls
		return result.filter(function(r) {
			return r;
		});
	}

	/**
	 * Check that the context, as well as each frame includes at least 1 element
	 * @private
	 * @param  {context} context
	 * @return {Error}
	 */
	function validateContext(context) {
		if (context.include.length === 0) {
			if (context.frames.length === 0) {
				var env = respondable$1.isInFrame() ? 'frame' : 'page';
				return new Error(
					'No elements found for include in ' + env + ' Context'
				);
			}
			context.frames.forEach(function(frame, i) {
				if (frame.include.length === 0) {
					return new Error(
						'No elements found for include in Context of frame ' + i
					);
				}
			});
		}
	}

	/**
	 * For a context-like object, find its shared root node
	 */
	function getRootNode$1({ include, exclude }) {
		const selectors = Array.from(include).concat(Array.from(exclude));
		// Find the first Element.ownerDocument or Document
		for (var i = 0; i < selectors.length; ++i) {
			var item = selectors[i];

			if (item instanceof Element) {
				return item.ownerDocument.documentElement;
			}

			if (item instanceof Document) {
				return item.documentElement;
			}
		}

		return document.documentElement;
	}

	/**
	 * Holds context of includes, excludes and frames for analysis.
	 *
	 * @todo  clarify and sync changes to design doc
	 * Context : {IncludeStrings} || {
	 *   // defaults to document/all
	 *   include: {IncludeStrings},
	 *   exclude : {ExcludeStrings}
	 * }
	 *
	 * IncludeStrings : [{CSSSelectorArray}] || Node
	 * ExcludeStrings : [{CSSSelectorArray}]
	 * `CSSSelectorArray` an Array of selector strings that addresses a Node in a multi-frame document. All addresses
	 * are in this form regardless of whether the document contains any frames.To evaluate the selectors to
	 * find the node referenced by the array, evaluate the selectors in-order, starting in window.top. If N
	 * is the length of the array, then the first N-1 selectors should result in an iframe and the last
	 * selector should result in the specific node.
	 *
	 * @param {Object} spec Configuration or "specification" object
	 */
	function Context(spec) {
		this.frames = [];
		this.initiator =
			spec && typeof spec.initiator === 'boolean' ? spec.initiator : true;
		this.page = false;

		spec = normalizeContext(spec);

		//cache the flattened tree
		this.flatTree = getFlattenedTree(getRootNode$1(spec));
		this.exclude = spec.exclude;
		this.include = spec.include;

		this.include = parseSelectorArray(this, 'include');
		this.exclude = parseSelectorArray(this, 'exclude');

		select('frame, iframe', this).forEach(frame => {
			if (isNodeInContext(frame, this)) {
				pushUniqueFrame(this.frames, frame.actualNode);
			}
		});

		if (
			this.include.length === 1 &&
			this.include[0].actualNode === document.documentElement
		) {
			this.page = true;
		}

		// Validate outside of a frame
		var err = validateContext(this);
		if (err instanceof Error) {
			throw err;
		}
		if (!Array.isArray(this.include)) {
			this.include = Array.from(this.include);
		}
		this.include.sort(nodeSorter); // ensure that the order of the include nodes is document order
	}

	class SerialVirtualNode extends AbstractVirtualNode {
		/**
		 * Convert a serialised node into a VirtualNode object
		 * @param {Object} node Serialised node
		 */
		constructor(serialNode) {
			super();
			this._props = normaliseProps(serialNode);
			this._attrs = normaliseAttrs(serialNode);
		}

		// Accessof for DOM node properties
		get props() {
			return this._props;
		}

		/**
		 * Get the value of the given attribute name.
		 * @param {String} attrName The name of the attribute.
		 * @return {String|null} The value of the attribute or null if the attribute does not exist
		 */
		attr(attrName) {
			return this._attrs[attrName] || null;
		}

		/**
		 * Determine if the element has the given attribute.
		 * @param {String} attrName The name of the attribute
		 * @return {Boolean} True if the element has the attribute, false otherwise.
		 */
		hasAttr(attrName) {
			return this._attrs[attrName] !== undefined;
		}
	}

	/**
	 * Convert between serialised props and DOM-like properties
	 * @param {Object} serialNode
	 * @return {Object} normalProperties
	 */
	function normaliseProps(serialNode) {
		let { nodeName, nodeType = 1 } = serialNode;
		axe.utils.assert(
			nodeType === 1,
			`nodeType has to be undefined or 1, got '${nodeType}'`
		);
		axe.utils.assert(
			typeof nodeName === 'string',
			`nodeName has to be a string, got '${nodeName}'`
		);

		const props = {
			...serialNode,
			nodeType,
			nodeName: nodeName.toLowerCase()
		};
		delete props.attributes;
		return Object.freeze(props);
	}

	/**
	 * Convert between serialised attributes and DOM-like attributes
	 * @param {Object} serialNode
	 * @return {Object} normalAttributes
	 */
	function normaliseAttrs({ attributes = {} }) {
		const attrMap = {
			htmlFor: 'for',
			className: 'class'
		};

		return Object.keys(attributes).reduce((attrs, attrName) => {
			const value = attributes[attrName];
			axe.utils.assert(
				typeof value !== 'object' || value === null,
				`expects attributes not to be an object, '${attrName}' was`
			);

			if (value !== undefined) {
				const mappedName = attrMap[attrName] || attrName;
				attrs[mappedName] = value !== null ? String(value) : null;
			}
			return attrs;
		}, {});
	}

	// TODO: axe._tree, axe._selectorData, axe._audit

	// Clean up after resolve / reject
	function cleanup$1() {
		cache.clear();
		axe._tree = undefined;
		axe._selectorData = undefined;
	}

	/**
	 * Starts analysis on the current document and its subframes
	 * @private
	 * @param  {Object}   context  The `Context` specification object @see Context
	 * @param  {Array}    options  Optional RuleOptions
	 * @param  {Function} resolve  Called when done running rules, receives ([results : Object], cleanup : Function)
	 * @param  {Function} reject   Called when execution failed, receives (err : Error)
	 */
	function runRules(context, options, resolve, reject) {
		try {
			context = new Context(context);
			axe._tree = context.flatTree;
			axe._selectorData = getSelectorData(context.flatTree);
		} catch (e) {
			cleanup$1();
			return reject(e);
		}

		var q = queue();
		var audit = axe._audit;

		if (options.performanceTimer) {
			performanceTimer.auditStart();
		}

		if (context.frames.length && options.iframes !== false) {
			q.defer(function(res, rej) {
				collectResultsFromFrames(context, options, 'rules', null, res, rej);
			});
		}
		let scrollState;
		q.defer(function(res, rej) {
			if (options.restoreScroll) {
				scrollState = getScrollState();
			}
			audit.run(context, options, res, rej);
		});
		q.then(function(data) {
			try {
				if (scrollState) {
					setScrollState(scrollState);
				}
				if (options.performanceTimer) {
					performanceTimer.auditEnd();
				}

				// Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
				var results = mergeResults(
					data.map(function(results) {
						return { results };
					})
				);

				// after should only run once, so ensure we are in the top level window
				if (context.initiator) {
					results = audit.after(results, options);

					results.forEach(publishMetaData);
					results = results.map(finalizeResult);
				}
				try {
					resolve(results, cleanup$1);
				} catch (e) {
					cleanup$1();
					log(e);
				}
			} catch (e) {
				cleanup$1();
				reject(e);
			}
		}).catch(e => {
			cleanup$1();
			reject(e);
		});
	}

	// TODO: axe._audit

	/*eslint indent: 0*/
	function runCommand(data, keepalive, callback) {
		var resolve = callback;
		var reject = function(err) {
			if (err instanceof Error === false) {
				err = new Error(err);
			}
			callback(err);
		};

		var context = (data && data.context) || {};
		if (context.hasOwnProperty('include') && !context.include.length) {
			context.include = [document];
		}
		var options = (data && data.options) || {};

		switch (data.command) {
			case 'rules':
				return runRules(
					context,
					options,
					function(results, cleanupFn) {
						resolve(results);
						// Cleanup AFTER resolve so that selectors can be generated
						cleanupFn();
					},
					reject
				);
			case 'cleanup-plugin':
				return cleanup(resolve, reject);
			default:
				// go through the registered commands
				if (
					axe._audit &&
					axe._audit.commands &&
					axe._audit.commands[data.command]
				) {
					return axe._audit.commands[data.command](data, callback);
				}
		}
	}

	/**
	 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
	 * @param  {Object} audit The "audit specification" object
	 * @private
	 */
	function load(audit) {
		respondable$1.subscribe('axe.ping', function(data, keepalive, respond) {
			respond({
				axe: true
			});
		});

		respondable$1.subscribe('axe.start', runCommand);

		axe._audit = new Audit(audit);
	}

	// TODO: axe._audit

	function reset() {
		var audit = axe._audit;

		if (!audit) {
			throw new Error('No audit configured');
		}
		audit.resetRulesAndChecks();
	}

	// TODO: axe._audit

	/**
	 * Finds failing Checks and combines each help message into an array
	 * @param  {Object} nodeData Individual "detail" object to generate help messages for
	 * @return {String}          failure messages
	 */
	function failureSummary(nodeData) {
		var failingChecks = {};
		// combine "all" and "none" as messaging is the same
		failingChecks.none = nodeData.none.concat(nodeData.all);
		failingChecks.any = nodeData.any;

		return Object.keys(failingChecks)
			.map(function(key) {
				if (!failingChecks[key].length) {
					return;
				}

				var sum = axe._audit.data.failureSummaries[key];
				if (sum && typeof sum.failureMessage === 'function') {
					return sum.failureMessage(
						failingChecks[key].map(function(check) {
							return check.message || '';
						})
					);
				}
			})
			.filter(function(i) {
				return i !== undefined;
			})
			.join('\n\n');
	}

	// TODO: axe.version, axe._audit

	/**
	 * Add information about the environment axe was run in.
	 * @return {Object}
	 */
	function getEnvironmentData(win = window) {
		// TODO: remove parameter once we are testing axe-core in jsdom and other
		// supported environments
		const {
			screen = {},
			navigator = {},
			location = {},
			innerHeight,
			innerWidth
		} = win;

		const orientation =
			screen.msOrientation || screen.orientation || screen.mozOrientation || {};

		return {
			testEngine: {
				name: 'axe-core',
				version: axe.version
			},
			testRunner: {
				name: axe._audit.brand
			},
			testEnvironment: {
				userAgent: navigator.userAgent,
				windowWidth: innerWidth,
				windowHeight: innerHeight,
				orientationAngle: orientation.angle,
				orientationType: orientation.type
			},
			timestamp: new Date().toISOString(),
			url: location.href
		};
	}

	// TODO: axe._audit, axe._selectorData

	/**
	 * Run a rule in a non-browser environment
	 * @param {String} ruleId  Id of the rule
	 * @param {VirtualNode} vNode  The virtual node to run the rule against
	 * @param {Object} options  (optional) Set of options passed into rules or checks
	 * @return {Object} axe results for the rule run
	 */
	function runVirtualRule(ruleId, vNode, options = {}) {
		options.reporter = options.reporter || axe._audit.reporter || 'v1';
		axe._selectorData = {};

		if (vNode instanceof AbstractVirtualNode === false) {
			vNode = new SerialVirtualNode(vNode);
		}

		let rule = axe._audit.rules.find(rule => rule.id === ruleId);

		if (!rule) {
			throw new Error('unknown rule `' + ruleId + '`');
		}

		// rule.prototype.gather calls axe.utils.isHidden which in turn calls
		// window.getComputedStyle if the rule excludes hidden elements. we
		// can avoid this call by forcing the rule to not exclude hidden
		// elements
		rule = Object.create(rule, { excludeHidden: { value: false } });

		const context = {
			include: [vNode]
		};

		const rawResults = rule.runSync(context, options);
		publishMetaData(rawResults);
		finalizeResult(rawResults);
		const results = aggregateResult([rawResults]);

		results.violations.forEach(result =>
			result.nodes.forEach(nodeResult => {
				nodeResult.failureSummary = failureSummary(nodeResult);
			})
		);

		return {
			...getEnvironmentData(),
			...results,
			toolOptions: options
		};
	}

	// TODO: axe._audit

	function isContext(potential) {
		switch (true) {
			case typeof potential === 'string':
			case Array.isArray(potential):
			case Node && potential instanceof Node:
			case NodeList && potential instanceof NodeList:
				return true;

			case typeof potential !== 'object':
				return false;

			case potential.include !== undefined:
			case potential.exclude !== undefined:
			case typeof potential.length === 'number':
				return true;

			default:
				return false;
		}
	}

	var noop$1 = function() {};

	/**
	 * Normalize the optional params of axe.run()
	 * @param  {object}   context
	 * @param  {object}   options
	 * @param  {Function} callback
	 * @return {object}            With 3 keys: context, options, callback
	 */
	function normalizeRunParams(context, options, callback) {
		let typeErr = new TypeError('axe.run arguments are invalid');

		// Determine the context
		if (!isContext(context)) {
			if (callback !== undefined) {
				// Either context is invalid or there are too many params
				throw typeErr;
			}
			// Set default and shift one over
			callback = options;
			options = context;
			context = document;
		}

		// Determine the options
		if (typeof options !== 'object') {
			if (callback !== undefined) {
				// Either options is invalid or there are too many params
				throw typeErr;
			}
			// Set default and shift one over
			callback = options;
			options = {};
		}

		// Set the callback or noop;
		if (typeof callback !== 'function' && callback !== undefined) {
			throw typeErr;
		}

		return {
			context: context,
			options: options,
			callback: callback || noop$1
		};
	}

	/**
	 * Runs a number of rules against the provided HTML page and returns the
	 * resulting issue list
	 *
	 * @param  {Object}   context  (optional) Defines the scope of the analysis
	 * @param  {Object}   options  (optional) Set of options passed into rules or checks
	 * @param  {Function} callback (optional) The callback when axe is done, given 2 params:
	 *                             - Error    If any errors occured, otherwise null
	 *                             - Results  The results object / array, or undefined on error
	 * @return {Promise}           Resolves with the axe results. Only available when natively supported
	 */
	function run(context, options, callback) {
		if (!axe._audit) {
			throw new Error('No audit configured');
		}

		let args = normalizeRunParams(context, options, callback);
		context = args.context;
		options = args.options;
		callback = args.callback;

		// set defaults:
		options.reporter = options.reporter || axe._audit.reporter || 'v1';

		if (options.performanceTimer) {
			performanceTimer.start();
		}
		let p;
		let reject = noop$1;
		let resolve = noop$1;

		if (typeof Promise === 'function' && callback === noop$1) {
			p = new Promise(function(_resolve, _reject) {
				reject = _reject;
				resolve = _resolve;
			});
		}

		_runRules(
			context,
			options,
			function(rawResults, cleanup) {
				let respond = function(results) {
					cleanup();
					try {
						callback(null, results);
					} catch (e) {
						log(e);
					}
					resolve(results);
				};
				if (options.performanceTimer) {
					performanceTimer.end();
				}

				try {
					let reporter = getReporter(options.reporter);
					let results = reporter(rawResults, options, respond);
					if (results !== undefined) {
						respond(results);
					}
				} catch (err) {
					cleanup();
					callback(err);
					reject(err);
				}
			},
			function(err) {
				callback(err);
				reject(err);
			}
		);

		return p;
	}

	exports.addReporter = addReporter;
	exports.cleanup = cleanup;
	exports.configure = configure;
	exports.getReporter = getReporter;
	exports.getRules = getRules;
	exports.load = load;
	exports.plugins = plugins;
	exports.registerPlugin = registerPlugin;
	exports.reset = reset;
	exports.run = run;
	exports.runRules = runRules;
	exports.runVirtualRule = runVirtualRule;

	return exports;
})({});
