/**
 * Make an axios get request to fetch a given resource and resolve
 * @method getExternalStylesheet
 * @param {Object} options an object with properties to configure the external XHR
 * @property {Object} options.resolve resolve callback on queue
 * @property {Object} options.reject reject callback on queue
 * @property {String} options.url string representing the url of the resource to load
 * @property {Object} options.rootNode document or shadowDOM root document for which to process CSSOM
 * @property {Number} options.timeout timeout to about network call
 * @property {Function} options.getStyleSheet a utility function to generate a style sheet for a given text content
 * @property {String} options.shadowId an id if undefined denotes that given root is a shadowRoot
 * @property {Number} options.priority css applied priority
 * @returns resolve with stylesheet object
 * @private
 */
function getExternalStylesheet(options) {
	const {
		resolve,
		reject,
		url,
		rootNode,
		timeout,
		getStyleSheet,
		shadowId,
		priority
	} = options;
	axe.imports
		.axios({
			method: 'get',
			url,
			timeout
		})
		.then(({ data }) => {
			const sheet = getStyleSheet({
				data,
				isExternal: true,
				shadowId,
				root: rootNode,
				priority
			});
			resolve(sheet);
		})
		.catch(reject);
}

/**
 * Get stylesheet(s) from shadowDOM
 * @param {Object} documentFragment document fragment node
 * @param {Function} getStyleSheet helper function to get stylesheet object
 * @returns an array of stylesheet objects
 */
function getSheetsFromShadowDom(documentFragment, getStyleSheet) {
	return Array.from(documentFragment.children).reduce((out, node) => {
		const nodeName = node.nodeName.toUpperCase();
		if (nodeName !== 'STYLE' && nodeName !== 'LINK') {
			return out;
		}
		if (nodeName === 'STYLE') {
			const dynamicSheet = getStyleSheet({ data: node.textContent });
			out.push(dynamicSheet.sheet);
		}
		if (nodeName === 'LINK' && !node.media.includes('print')) {
			const dynamicSheet = getStyleSheet({ data: node, isLink: true });
			out.push(dynamicSheet.sheet);
		}
		return out;
	}, []);
}

/**
 * Filter a given array of stylesheet objects
 * @param {Array<Object>} styleSheets array of stylesheets
 * @returns an filtered array of stylesheets
 */
function filterStyleSheets(styleSheets) {
	let sheetHrefs = [];

	return styleSheets.filter(sheet => {
		// 1) FILTER > sheets with the same href
		let sheetAlreadyExists = false;
		if (sheet.href) {
			if (!sheetHrefs.includes(sheet.href)) {
				sheetHrefs.push(sheet.href);
			} else {
				sheetAlreadyExists = true;
			}
		}
		// 2) FILTER > media='print'
		const isPrintMedia = Array.from(sheet.media).includes('print');

		return !isPrintMedia && !sheetAlreadyExists;
	});
}

/**
 * Returns a then(able) queue of CSSStyleSheet(s)
 * @method loadCssom
 * @private
 * @param {Object} options an object with attributes essential to load CSSOM
 * @property {Object} options.rootNode document or shadowDOM root document for which to process CSSOM
 * @property {Number} options.rootIndex a number representing the index of the document or shadowDOM, used for priority
 * @property {String} options.shadowId an id if undefined denotes that given root is a shadowRoot
 * @property {Number} options.timeout abort duration for network request
 * @param {Function} options.getStyleSheet a utility function to generate a style sheet for a given text content
 * @return {Object} queue
 */
function loadCssom(options) {
	const { rootNode, rootIndex, shadowId, getStyleSheet } = options;
	const q = axe.utils.queue();
	const styleSheets =
		rootNode.nodeType === 11 && shadowId
			? getSheetsFromShadowDom(rootNode, getStyleSheet)
			: Array.from(rootNode.styleSheets);
	const sheets = filterStyleSheets(styleSheets);

	sheets.forEach((sheet, sheetIndex) => {
		/* eslint max-statements: ["error", 20] */
		const priority = [rootIndex, sheetIndex];

		try {
			// The following line throws an error on cross-origin style sheets:
			const cssRules = sheet.cssRules;
			const rules = Array.from(cssRules);
			if (!rules.length) {
				return;
			}

			// filter rules that are included by way of @import or nested link
			const importRules = rules.filter(r => r.href);
			if (!importRules.length) {
				q.defer(resolve =>
					resolve({
						sheet,
						isExternal: false,
						shadowId,
						root: rootNode,
						priority
					})
				);
				return;
			}

			// for import rules, fetch via `href`
			importRules.forEach(rule => {
				q.defer((resolve, reject) => {
					getExternalStylesheet({
						resolve,
						reject,
						url: rule.href,
						priority,
						...options
					});
				});
			});

			// in the same sheet -  get inline rules in <style> tag or in a CSSStyleSheet excluding @import or nested link
			const inlineRules = rules.filter(rule => !rule.href);
			if (!inlineRules.length) {
				return;
			}

			// concat all cssText into a string for inline rules & create sheet
			const inlineRulesCssText = inlineRules
				.reduce((out, rule) => {
					out.push(rule.cssText);
					return out;
				}, [])
				.join();
			q.defer(resolve =>
				resolve(
					getStyleSheet({
						data: inlineRulesCssText,
						shadowId,
						root: rootNode,
						isExternal: false,
						priority
					})
				)
			);
		} catch (e) {
			// external sheet -> make an xhr and q the response
			q.defer((resolve, reject) => {
				getExternalStylesheet({
					resolve,
					reject,
					url: sheet.href,
					priority,
					...options
				});
			});
		}
	});

	return q;
}

/**
 * Returns an array of objects with root(document)
 * @param {Object} treeRoot the DOM tree to be inspected
 * @return {Array<Object>} array of objects, which each object containing a root (document) and an optional shadowId
 * @private
 */
function getAllRootsInTree(tree) {
	let ids = [];
	const documents = axe.utils
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
	return documents;
}

/**
 * @method preloadCssom
 * @memberof axe.utils
 * @param {Object} object argument which is a composite object, with attributes timeout, treeRoot(optional), resolve & reject
 * @property {Number} timeout timeout for any network calls made
 * @property {Object} treeRoot the DOM tree to be inspected
 * @return {Object} a queue with results of cssom assets
 */
axe.utils.preloadCssom = function preloadCssom({
	timeout,
	treeRoot = axe._tree[0]
}) {
	const roots = axe.utils.uniqueArray(getAllRootsInTree(treeRoot), []);
	const q = axe.utils.queue();

	if (!roots.length) {
		return q;
	}

	const dynamicDoc = document.implementation.createHTMLDocument();

	/**
	 * Convert text content to CSSStyleSheet
	 * @method getStyleSheet
	 * @private
	 * @param {Object} arg an object with properties to construct stylesheet
	 * @property {String} arg.data text content of the stylesheet
	 * @property {Boolean} arg.isExternal flag to notify if the resource was fetched from the network
	 * @property {String} arg.shadowId (Optional) shadowId if shadowDOM
	 * @property {Object} arg.root implementation document to create style elements
	 * @property {String} arg.priority a number indicating the loaded priority of CSS, to denote specificity of styles contained in the sheet.
	 */
	function getStyleSheet({
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
		roots
			.reduce((out, root, index) => {
				out.defer((resolve, reject) => {
					loadCssom({
						rootNode: root.rootNode,
						rootIndex: index + 1, // we want index to start with 1 for priority calculation
						shadowId: root.shadowId,
						timeout,
						getStyleSheet
					})
						.then(resolve)
						.catch(reject);
				});
				return out;
			}, axe.utils.queue())
			// await loading all such documents assets, and concat results into one object
			.then(assets => {
				resolve(
					assets.reduce((out, cssomSheets) => {
						return out.concat(cssomSheets);
					}, [])
				);
			})
			.catch(reject);
	});

	return q;
};
