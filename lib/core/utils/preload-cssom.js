/**
 * Make an axios get request to fetch a given resource and resolve
 * @method getExternalStylesheet
 * @param {Object} arg an object with properties to configure the external XHR
 * @property {Object} arg.resolve resolve callback on queue
 * @property {Object} arg.reject reject callback on queue
 * @property {String} arg.url string representing the url of the resource to load
 * @property {Object} arg.rootNode document or shadowDOM root document for which to process CSSOM
 * @property {Number} arg.timeout timeout to about network call
 * @property {Function} arg.getStyleSheet a utility function to generate a style sheet for a given text content
 * @property {String} arg.shadowId an id if undefined denotes that given root is a shadowRoot
 * @property {Number} arg.priority css applied priority
 * @private
 */
function getExternalStylesheet({
	resolve,
	reject,
	url,
	rootNode,
	timeout,
	getStyleSheet,
	shadowId,
	priority
}) {
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
 * Returns a then(able) queue of CSSStyleSheet(s)
 * @method loadCssom
 * @private
 * @param {Object} arg an object with projects essential to load CSSOM
 * @property {Object} arg.rootNode document or shadowDOM root document for which to process CSSOM
 * @property {Number} arg.rootIndex a number representing the index of the document or shadowDOM, used for priority
 * @property {String} arg.shadowId an id if undefined denotes that given root is a shadowRoot
 * @property {Number} timeout abort duration for network request
 * @param {Function} getStyleSheet a utility function to generate a style sheet for a given text content
 * @return {Object} queue

 */
function loadCssom({ rootNode, rootIndex, shadowId, timeout, getStyleSheet }) {
	const q = axe.utils.queue();

	let styleSheets = null;

	/**
	 * For shadowDOM #document-fragment node, fragment.styleSheets is not reliable in most browsers (mostly Safari)
	 * (Issue: https://github.com/dequelabs/axe-core/issues/1082)
	 *
	 * For stable results of CSSOM inside document fragment of shadowRoot, it is best to parse the children of the root
	 * and extaract tags <style> and <link> to construct dynamic styleSheets
	 */
	if (rootNode.nodeName.toUpperCase() === '#DOCUMENT-FRAGMENT' && shadowId) {
		// retrieve shadowRoot style sheets as []
		styleSheets = Array.from(rootNode.children).reduce((out, node) => {
			const nodeName = node.nodeName.toUpperCase();

			// ignore if node is not of type style or link
			if (nodeName !== 'STYLE' && nodeName !== 'LINK') {
				return out;
			}

			// if style tag
			// the contents are written as cssText into a dynamically created stylesheet
			// these may be @import and or inline styles.
			if (nodeName === 'STYLE') {
				const dynamicSheet = getStyleSheet({
					// no need to pass other arguments
					data: node.textContent
				});
				out.push(dynamicSheet.sheet);
			}

			// if link tag
			// href is parsed and written as @import 'href'
			// this helps keep concurrency, rather than awaiting onload on link
			if (nodeName === 'LINK' && !node.media.includes('print')) {
				const dynamicSheet = getStyleSheet({
					data: node,
					isLink: true
				});
				out.push(dynamicSheet.sheet);
			}

			// return
			return out;
		}, []);
	} else {
		// retrieve stylesheets as an []
		styleSheets = Array.from(rootNode.styleSheets);
	}

	// if no root styleSheets then return
	if (!styleSheets || !styleSheets.length) {
		return q;
	}

	// convenience array fot help unique sheets if duplicated by same `href`
	// both external and internal sheets
	let sheetHrefs = [];

	// filter out sheets, that should not be accounted for...
	const sheets = styleSheets.filter(sheet => {
		// FILTER > sheets with the same href (if exists)
		let sheetAlreadyExists = false;
		if (sheet.href) {
			if (!sheetHrefs.includes(sheet.href)) {
				sheetHrefs.push(sheet.href);
			} else {
				sheetAlreadyExists = true;
			}
		}
		// FILTER > media='print'
		// Note:
		// Chrome does this automagically, Firefox returns every sheet
		// hence the need to filter
		const isPrintMedia = Array.from(sheet.media).includes('print');
		// FILTER > disabled
		// Firefox does not respect `disabled` attribute on stylesheet
		// Hence decided not to filter out disabled for the time being

		// return
		return !isPrintMedia && !sheetAlreadyExists;
	});

	// iterate to decipher multi-level nested sheets if any (this is essential to retrieve styles from shadowDOM)
	sheets.forEach((sheet, sheetIndex) => {
		/* eslint max-statements: ["error", 20] */

		// priority of loading of stylesheet [documentIndex, sheetIndex]
		const priority = [rootIndex, sheetIndex];

		// attempt to retrieve cssRules, or for external sheets make a XMLHttpRequest
		try {
			// accessing .cssRules throws for external (cross-domain) sheets, which is handled in the catch
			const cssRules = sheet.cssRules;
			// read all css rules in the sheet
			const rules = Array.from(cssRules);

			// if no cssRules - return
			if (!rules.length) {
				return;
			}

			// filter rules that are included by way of @import or nested link
			const importRules = rules.filter(r => r.href);

			// if no import or nested link rules, with in these cssRules
			// return current sheet
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

			// if any import rules exists, fetch via `href`
			// which eventually constructs a sheet with results from resource
			importRules.forEach(rule => {
				q.defer((resolve, reject) => {
					getExternalStylesheet({
						resolve,
						reject,
						url: rule.href,
						rootNode,
						timeout,
						getStyleSheet,
						shadowId,
						priority
					});
				});
			});

			// in the same sheet -  get inline rules in <style> tag or in a CSSStyleSheet excluding @import or nested link
			const inlineRules = rules.filter(rule => !rule.href);

			if (!inlineRules.length) {
				return;
			}

			// concat all cssText into a string for inline rules
			const inlineRulesCssText = inlineRules
				.reduce((out, rule) => {
					out.push(rule.cssText);
					return out;
				}, [])
				.join();

			// create and return a sheet with inline rules
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
					rootNode,
					timeout,
					getStyleSheet,
					shadowId,
					priority
				});
			});
		}
	}, []);

	// return
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
		// as there can be multiple documents (root document, shadow document fragments, and frame documents)
		// reduce these into a queue
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
