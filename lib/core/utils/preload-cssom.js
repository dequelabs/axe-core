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
 *
 * @param {Object} object argument which is a composite object, with attributes timeout, treeRoot(optional), resolve & reject
 * @property {Number} timeout timeout for any network calls made
 * @property {Object} treeRoot the DOM tree to be inspected
 * @returns {Promise}
 */
axe.utils.preloadCssom = function preloadCssom({
	timeout,
	treeRoot = axe._tree[0]
}) {
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

	return getCssomForAllRootNodes(
		rootNodes,
		convertDataToStylesheet,
		timeout
	).then(assets => {
		const cssom = flattenAssets(assets);
		return cssom;
	});
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
 * @property {Boolean} arg.isCrossOrigin flag to notify if the resource was fetched from the network
 * @property {String} arg.shadowId (Optional) shadowId if shadowDOM
 * @property {Object} arg.root implementation document to create style elements
 * @property {String} arg.priority a number indicating the loaded priority of CSS, to denote specificity of styles contained in the sheet.
 * @returns {Function}
 */
const getStyleSheetFactory = dynamicDoc => ({
	data,
	isCrossOrigin,
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
		isCrossOrigin,
		shadowId,
		root,
		priority
	};
};

/**
 * Process CSSOM on all root nodes
 *
 * @param {Array<Object>} rootNodes array of root nodes, where node  is an enhanced `document` or `documentFragment` object returned from `getAllRootNodesInTree`
 * @param {Function} convertDataToStylesheet fn to convert given data to Stylesheet object
 * @returns {Promise}
 */
function getCssomForAllRootNodes(rootNodes, convertDataToStylesheet, timeout) {
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

		const parseOptions = {
			rootNode,
			shadowId,
			timeout,
			convertDataToStylesheet,
			rootIndex: index + 1
		};
		const p = axe.utils.parseStylesheets(sheets, parseOptions);
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
function getStylesheetsOfRootNode(rootNode, shadowId, convertDataToStylesheet) {
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
function getStylesheetsFromDocumentFragment(rootNode, convertDataToStylesheet) {
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
