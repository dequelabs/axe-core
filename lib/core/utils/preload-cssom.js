/**
 * Filter to remove any duplicate `stylesheets`, that share the same `href`
 *
 * @method filterStylesheetsWithSameHref
 * @private
 * @param {Array<Object>} sheets stylesheets
 * @returns {Array<Object>}
 */
function filterStylesheetsWithSameHref(sheets) {
	let hrefs = [];
	return sheets.filter(sheet => {
		let exists = false;
		if (sheet.href) {
			if (!hrefs.includes(sheet.href)) {
				hrefs.push(sheet.href);
			} else {
				exists = true;
			}
		}
		return !exists;
	});
}

/**
 * Filter `media=print`
 *
 * @method filterMediaIsPrint
 * @private
 * @param {String} media media value eg: 'print'
 * @returns {Boolean}
 */
function filterMediaIsPrint(media) {
	if (media) {
		return !media.toUpperCase().includes('PRINT');
	}
	return true;
}

/**
 * Get stylesheet(s) for root
 *
 * @method getStylesheetsOfRootNode
 * @private
 * @param {Object} options configuration options
 * @property {Object} options.rootNode document or document fragment
 * @property {Function} options.convertTextToStylesheet a utility function to generate a style sheet from given data (text)
 * @returns an array of stylesheet objects
 */
function getStylesheetsOfRootNode({
	rootNode,
	convertTextToStylesheet,
	shadowId
}) {
	const sheets =
		rootNode.nodeType === 11 && shadowId // nodeType === 11  -> DOCUMENT_FRAGMENT
			? Array.from(rootNode.children)
					.filter(node => {
						/**
						 * limit to only `style` or `link` attributes with `rel=stylesheet` and `media != print`
						 */
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
					})
					.reduce((out, node) => {
						const nodeName = node.nodeName.toUpperCase();
						const data = nodeName === 'STYLE' ? node.textContent : node;
						const isLink = nodeName === 'LINK';
						const stylesheet = convertTextToStylesheet({
							data,
							isLink,
							root: rootNode
						});
						out.push(stylesheet.sheet);
						return out;
					}, [])
			: Array.from(rootNode.styleSheets).filter(sheet =>
					filterMediaIsPrint(sheet.media.mediaText)
			  );

	return filterStylesheetsWithSameHref(sheets);
}

/**
 * Make an `axios` get request to fetch a given `resource`
 *
 * @method getStylesheetFromUrl
 * @private
 * @param {Object} options an object with properties to configure the external request
 * @property {String} options.url url of the resource to load
 * @property {Number} options.timeout timeout
 * @property {Function} options.convertTextToStylesheet a utility function to generate a style sheet from given data (text)
 * @property {String} options.shadowId an `id` if `undefined` denotes that given root is a `shadowRoot`
 * @property {Number} options.priority css applied priority
 * @property {Object} options.rootNode document or document fragment
 * @property {Object} options.queue `axe.utils.queue` to defer resolving stylesheets
 * @property {Object} options.resolve resolve of the `axe.utils.queue` from which this method was involved
 * @property {Object} options.reject reject of the `axe.utils.queue` from which this method was involved
 * @returns resolve with stylesheet
 */
function getStylesheetFromUrl(options) {
	const {
		url,
		timeout,
		convertTextToStylesheet,
		shadowId,
		priority,
		rootNode,
		queue,
		resolve: resolvePreviousQueue,
		reject: rejectPreviousQueue,
		analyzeNested = false
	} = options;
	axe.imports
		.axios({ method: 'get', url, timeout })
		.then(({ data }) => {
			const isExternal = true;
			const stylesheet = convertTextToStylesheet({
				data,
				shadowId,
				priority,
				isExternal,
				root: rootNode
			});
			if (!analyzeNested) {
				resolvePreviousQueue(stylesheet);
			}
			/**
			 * recursively check`cssRules` for any further `@import` rules
			 */
			parseRules({
				...options,
				queue,
				sheet: stylesheet.sheet,
				priority,
				rootNode,
				isExternal
			});
			resolvePreviousQueue(undefined);
		})
		.catch(rejectPreviousQueue);
}

function parseRules(options) {
	const {
		shadowId,
		rootNode,
		priority,
		isExternal = false,
		sheet,
		queue,
		convertTextToStylesheet
	} = options;
	/**
	 * `sheet.cssRules` throws an error on `cross-origin` stylesheets
	 */
	const cssRules = sheet.cssRules;

	const rules = Array.from(cssRules);
	if (!rules || !rules.length) {
		return;
	}

	/**
	 * reference -> https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
	 */
	const cssImportRules = rules.filter(r => r.type === 3); // type === 3 -> CSSRule.IMPORT_RULE

	/**
	 * when no `@import` rules
	 * -> resolve the current `sheet`
	 */
	if (!cssImportRules.length) {
		queue.defer(resolve => {
			resolve({ sheet, shadowId, priority, isExternal, root: rootNode });
		});
		return;
	}

	/**
	 * iterate `@import` rules and fetch styles
	 */
	cssImportRules.forEach((rule, cssRuleIndex) =>
		queue.defer((resolve, reject) => {
			/**
			 * invoked with `analyzeNested`
			 */
			const newPriority = [...priority, cssRuleIndex];
			getStylesheetFromUrl({
				...options,
				url: rule.href,
				resolve,
				reject,
				priority: newPriority,
				queue,
				analyzeNested: true
			});
		})
	);

	const nonImportCSSRules = rules.filter(r => r.type !== 3);
	// no further rules to process in this sheet
	if (!nonImportCSSRules.length) {
		return;
	}

	queue.defer(resolve =>
		resolve(
			convertTextToStylesheet({
				// convert all `nonImportCSSRules` of the styles into `text` which will be converted to a new stylesheet
				data: nonImportCSSRules
					.reduce((out, rule) => {
						out.push(rule.cssText);
						return out;
					}, [])
					.join(),
				shadowId,
				root: rootNode,
				isExternal,
				priority
			})
		)
	);
}

/**
 * Returns a then(able) queue of CSSStyleSheet(s)
 * @method loadCssom
 * @private
 * @param {Object} options configuration options
 * @property {Object} options.rootNode document or document fragment
 * @property {Number} options.rootIndex a number representing the index of the document or document fragment, used for priority computation
 * @property {String} options.shadowId an id if undefined denotes that given root is a document fragment/ shadowDOM
 * @property {Number} options.timeout abort duration for network request
 * @property {Function} options.convertTextToStylesheet a utility function to generate a style sheet from given data (text)
 * @return {Object} queue
 */
function loadCssom(options) {
	const { rootIndex } = options;
	const q = axe.utils.queue();
	const sheets = getStylesheetsOfRootNode(options);

	sheets.forEach((sheet, sheetIndex) => {
		const priority = [rootIndex, sheetIndex];
		try {
			parseRules({
				...options,
				sheet,
				queue: q,
				priority
			});
		} catch (e) {
			// cross-origin stylesheet -> make an XHR and q the response
			q.defer((resolve, reject) => {
				getStylesheetFromUrl({
					...options,
					resolve,
					reject,
					priority,
					url: sheet.href,
					queue: q,
					analyzeNested: true
				});
			});
		}
	});

	return q;
}

/**
 * Returns am array of source nodes containing document (fragment) in a given tree.
 *
 * @method getAllRootNodesInTree
 * @private
 * @param {Object} treeRoot tree
 * @return {Array<Object>} array of objects, which each object containing a root (document) and an optional shadowId
 * @private
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
 * Given a rootNode - construct CSSOM
 * -> get all source nodes (document & document fragments) within given root node
 * -> recursively call `loadCssom` to resolve styles
 *
 * @method preloadCssom
 * @memberof axe.utils
 * @instance
 * @param {Object} object argument which is a composite object, with attributes timeout, treeRoot(optional), resolve & reject
 * @property {Number} timeout timeout for any network calls made
 * @property {Object} treeRoot the DOM tree to be inspected
 * @return {Object} a queue with results of cssom assets
 */
axe.utils.preloadCssom = function preloadCssom({
	timeout,
	treeRoot = axe._tree[0]
}) {
	const rootNodes = getAllRootNodesInTree(treeRoot);
	const q = axe.utils.queue();

	if (!rootNodes.length) {
		return q;
	}

	const dynamicDoc = document.implementation.createHTMLDocument();

	/**
	 * Convert text content to CSSStyleSheet
	 *
	 * @method convertTextToStylesheet
	 * @private
	 * @param {Object} arg an object with properties to construct stylesheet
	 * @property {String} arg.data text content of the stylesheet
	 * @property {Boolean} arg.isExternal flag to notify if the resource was fetched from the network
	 * @property {String} arg.shadowId (Optional) shadowId if shadowDOM
	 * @property {Object} arg.root implementation document to create style elements
	 * @property {String} arg.priority a number indicating the loaded priority of CSS, to denote specificity of styles contained in the sheet.
	 */
	function convertTextToStylesheet({
		data,
		isExternal,
		shadowId,
		root,
		priority,
		isLink = false
	}) {
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
	}

	q.defer((resolve, reject) => {
		rootNodes
			.reduce((out, { rootNode, shadowId }, index) => {
				out.defer((resolve, reject) => {
					loadCssom({
						rootNode,
						shadowId,
						timeout,
						convertTextToStylesheet,
						rootIndex: index + 1
					})
						.then(resolve)
						.catch(reject);
				});
				return out;
			}, axe.utils.queue())
			.then(assets => {
				/**
				 * using a `axe.utils.queue` returns an array of results
				 * -> flatten array
				 * -> filter `undefined` results from `queue` resolution
				 */
				// await loading all such documents assets, and concat results into a single object
				const cssom = assets
					.reduce((out, cssomSheets) => {
						return out.concat(cssomSheets);
					}, [])
					.filter(asset => asset !== undefined);
				resolve(cssom);
			})
			.catch(reject);
	});

	return q;
};
