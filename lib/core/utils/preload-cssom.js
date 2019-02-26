/**
 * NOTE: 
 * this `eslint` rule is disabled because of calling `getStyleSheetFactory` before it is defined (further below).
 */
/* eslint no-use-before-define: 0 */


/**
 * Given a rootNode - construct CSSOM
 * -> get all source nodes (document & document fragments) within given root node
 * -> recursively call `loadCssom` to resolve styles
 *
 * @method preloadCssom
 * @memberof `axe.utils`
 *
 * @param {Object} object argument which is a composite object, with attributes timeout, treeRoot(optional), resolve & reject
 * @property {Number} timeout timeout for any network calls made
 * @property {Object} treeRoot the DOM tree to be inspected
 * @returns {Object} `axe.utils.queue` with CSSOM assets
 */
axe.utils.preloadCssom = function preloadCssom({
	timeout,
	treeRoot = axe._tree[0]
}) {
	/**
	 * get all `document` and `documentFragment` with in given `tree`
	 */
	const rootNodes = getAllRootNodesInTree(treeRoot);

	const q = axe.utils.queue();

	if (!rootNodes.length) {
		return q;
	}

	const dynamicDoc = document.implementation.createHTMLDocument();
	const convertDataToStylesheet = getStyleSheetFactory(dynamicDoc);

	q.defer((resolve, reject) => {
		getCssomForAllRootNodes(rootNodes, convertDataToStylesheet, timeout)
			.then(assets => {
				const cssom = processCssomAssets(assets);
				resolve(cssom);
			})
			.catch(reject);
	});

	return q;
};

/**
 * Returns am array of source nodes containing `document` and `documentFragment` in a given `tree`.
 *
 * @param {Object} treeRoot tree
 * @returns {Array<Object>} array of objects, which each object containing a root and an optional `shadowId`
 */
function getAllRootNodesInTree(tree) {
	let ids = [];

	const rootNodes = axe.utils
		.querySelectorAllFilter(tree, '*', node => {
			if (ids.includes(node.shadowId)) {
				return false;
			}
			ids.push(node.shadowId);
			return true;
		})
		.map(node => {
			return {
				shadowId: node.shadowId,
				rootNode: axe.utils.getRootNode(node.actualNode)
			};
		});

	return axe.utils.uniqueArray(rootNodes, []);
}

/**
 * Convert text to CSSStyleSheet
 * Is a factory (closure) function, initialized with `document.implementation.createHTMLDocument()` which surfaces DOM API for creating `style` elements.
 *
 * @param {Object} param `document.implementation.createHTMLDocument()
 * @param {Object} arg an object with properties to construct stylesheet
 * @property {String} arg.data text content of the stylesheet
 * @property {Boolean} arg.isExternal flag to notify if the resource was fetched from the network
 * @property {String} arg.shadowId (Optional) shadowId if shadowDOM
 * @property {Object} arg.root implementation document to create style elements
 * @property {String} arg.priority a number indicating the loaded priority of CSS, to denote specificity of styles contained in the sheet.
 */
const getStyleSheetFactory = dynamicDoc => ({
	data,
	isExternal,
	shadowId,
	root,
	priority,
	isLink = false
}) => {
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
		isExternal,
		shadowId,
		root,
		priority
	};
};

/**
 * Deferred function for CSSOM queue processing on all root nodes
 *
 * @param {Array<Object>} rootNodes array of root nodes, where node  is an enhanced `document` or `documentFragment` object returned from `getAllRootNodesInTree`
 * @param {Function} convertDataToStylesheet fn to convert given data to Stylesheet object
 * @returns {Object} `axe.utils.queue`
 */
function getCssomForAllRootNodes(rootNodes, convertDataToStylesheet, timeout) {
	const q = axe.utils.queue();

	rootNodes.forEach(({ rootNode, shadowId }, index) =>
		q.defer((resolve, reject) =>
			loadCssom({
				rootNode,
				shadowId,
				timeout,
				convertDataToStylesheet,
				rootIndex: index + 1
			})
				.then(resolve)
				.catch(reject)
		)
	);

	return q;
}

/**
 * Process results from `loadCssom` queues of all root nodes
 * NOTE:
 * using `axe.utils.queue` from various `loadCssom` paths, returns a nested array of arrays at various depths,
 * hence the need to flatten arrays
 *
 * @param {Array<Object>} assets CSSOM assets for each root
 * @returns {Object} CSSOM object
 */
function processCssomAssets(nestedAssets) {
	const result = [];

	nestedAssets.forEach(item => {
		if (Array.isArray(item)) {
			result.push(...processCssomAssets(item));
		} else {
			result.push(item);
		}
	});

	return result;
}

/**
 * Returns `axe.utils.queue` of CSSStyleSheet(s) for a given root node
 *
 * @param {Object} options configuration options
 * @property {Object} options.rootNode document or document fragment
 * @property {Number} options.rootIndex a number representing the index of the document or document fragment, used for priority computation
 * @property {String} options.shadowId an id if undefined denotes that given root is a document fragment/ shadowDOM
 * @property {Number} options.timeout abort duration for network request
 * @property {Function} options.convertDataToStylesheet a utility function to generate a style sheet from given data (text)
 * @return {Object} queue
 */
function loadCssom(options) {
	const { rootIndex } = options;

	const q = axe.utils.queue();

	const sheets = getStylesheetsOfRootNode(options);
	if (!sheets) {
		return q;
	}

	sheets.forEach((sheet, sheetIndex) => {
		const priority = [rootIndex, sheetIndex];
		try {
			const deferredQ = parseNonCrossOriginStylesheet(sheet, options, priority);
			q.defer(deferredQ);
		} catch (e) {
			// cross-origin stylesheet -> make an XHR and q the response
			const deferredQ = parseCrossOriginStylesheet(
				sheet.href,
				options,
				priority
			);
			q.defer(deferredQ);
		}
	});

	return q;
}

/**
 * Parse non cross-origin stylesheets
 *
 * @param {Object} sheet CSSStylesheet object
 * @param {Object} options `loadCssom` options
 * @param {Array<Number>} priority sheet priority
 */
function parseNonCrossOriginStylesheet(sheet, options, priority) {
	const q = axe.utils.queue();

	/**
	 * `sheet.cssRules` throws an error on `cross-origin` stylesheets
	 */
	const cssRules = sheet.cssRules;

	const rules = Array.from(cssRules);
	if (!rules) {
		return q;
	}

	/**
	 * reference -> https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
	 */
	const cssImportRules = rules.filter(r => r.type === 3); // type === 3 -> CSSRule.IMPORT_RULE

	/**
	 * when no `@import` rules in given sheet
	 * -> resolve the current `sheet` & exit
	 */
	if (!cssImportRules.length) {
		q.defer(resolve =>
			resolve({
				isExternal: false,
				priority,
				root: options.rootNode,
				shadowId: options.shadowId,
				sheet
			})
		);

		// exit
		return q;
	}

	/**
	 * iterate `@import` rules and fetch styles
	 */
	cssImportRules.forEach((importRule, cssRuleIndex) =>
		q.defer((resolve, reject) => {
			const importUrl = importRule.href;
			const newPriority = [...priority, cssRuleIndex];
			const axiosOptions = {
				method: 'get',
				url: importUrl,
				timeout: options.timeout
			};
			axe.imports
				.axios(axiosOptions)
				.then(({ data }) =>
					resolve(
						options.convertDataToStylesheet({
							data,
							isExternal: true,
							priority: newPriority,
							root: options.rootNode,
							shadowId: options.shadowId
						})
					)
				)
				.catch(reject);
		})
	);

	const nonImportCSSRules = rules.filter(r => r.type !== 3);

	// no further rules to process in this sheet
	if (!nonImportCSSRules.length) {
		return q;
	}

	// convert all `nonImportCSSRules` style rules into `text` and defer into queue
	q.defer(resolve =>
		resolve(
			options.convertDataToStylesheet({
				data: nonImportCSSRules.map(rule => rule.cssText).join(),
				isExternal: false,
				priority,
				root: options.rootNode,
				shadowId: options.shadowId
			})
		)
	);

	return q;
}

/**
 * Parse cross-origin stylesheets
 *
 * @param {String} url url from which to fetch stylesheet
 * @param {Object} options `loadCssom` options
 * @param {Array<Number>} priority sheet priority
 */
function parseCrossOriginStylesheet(url, options, priority) {
	const q = axe.utils.queue();

	if (!url) {
		return q;
	}

	const axiosOptions = {
		method: 'get',
		url,
		timeout: options.timeout
	};

	q.defer((resolve, reject) => {
		axe.imports
			.axios(axiosOptions)
			.then(({ data }) =>
				resolve(
					options.convertDataToStylesheet({
						data,
						isExternal: true,
						priority,
						root: options.rootNode,
						shadowId: options.shadowId
					})
				)
			)
			.catch(reject);
	});

	return q;
}

/**
 * Get stylesheet(s) for root
 *
 * @param {Object} options configuration options of `loadCssom`
 * @returns an array of stylesheets
 */
function getStylesheetsOfRootNode(options) {
	const { rootNode, shadowId } = options;
	let sheets;

	// nodeType === 11  -> DOCUMENT_FRAGMENT
	if (rootNode.nodeType === 11 && shadowId) {
		sheets = getStylesheetsFromDocumentFragment(options);
	} else {
		sheets = getStylesheetsFromDocument(rootNode);
	}

	return filterStylesheetsWithSameHref(sheets);
}

/**
 * Get stylesheets from `documentFragment`
 *
 * @param {Object} options configuration options of `loadCssom`
 * @returns {Array<Object>}
 */
function getStylesheetsFromDocumentFragment(options) {
	const { rootNode, convertDataToStylesheet } = options;
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
