/**
 * Construct an extended object of cssom stylesheet with added attribtues for isExternal and shadowId
 * @method getCssomSheet
 * @private
 * @param {CSSStyleSheet} sheet stylesheet
 * @param {Boolean} isExternal flag to specify if the stylesheet was fetched via xhr
 * @param {String} shadowId (optional) string representing shadowId if style/ sheet was constructed from shadowDOM assets
 */
function getCssomSheet(sheet, isExternal, shadowId) {
	const out = { isExternal, sheet };
	if (shadowId) {
		out.shadowId = shadowId;
	}
	return out;
}

/**
 * Returns a then(able) queue of CSSStyleSheet(s)
 * @param {Object} ownerDocument document object to be inspected for stylesheets
 * @param {number} timeout on network request for stylesheet that need to be externally fetched
 * @param {Function} convertTextToStylesheetFn a utility function to generate a style sheet from text
 * @return {Object} queue
 * @private
 */
function loadCssom({ root, shadowId }, timeout, convertTextToStylesheetFn) {
	/**
	 * Make an axios get request to fetch a given resource and resolve
	 * @method getExternalStylesheet
	 * @private
	 * @param {Object} param an object with properties to configure the external XHR
	 * @property {Object} param.resolve resolve callback on queue
	 * @property {Object} param.reject reject callback on queue
	 * @property {String} param.url string representing the url of the resource to load
	 * @property {Number} param.timeout timeout to about network call
	 */
	function getExternalStylesheet({ resolve, reject, url }) {
		axe.imports
			.axios({
				method: 'get',
				url,
				timeout
			})
			.then(({ data }) => {
				const sheet = convertTextToStylesheetFn({
					data,
					isExternal: true,
					shadowId
				});
				resolve(sheet);
			})
			.catch(reject);
	}

	const q = axe.utils.queue();
	// iterate to decipher multi-level nested sheets if any (this is essential to retrieve styles from shadowDOM)
	Array.from(root.styleSheets).forEach(sheet => {
		// ignore disabled sheets
		if (sheet.disabled) {
			return;
		}
		// attempt to retrieve cssRules, or for external sheets make a XMLHttpRequest
		try {
			// accessing .cssRules throws for external (cross-domain) sheets, which is handled in the catch
			const cssRules = sheet.cssRules;
			// read all css rules in the sheet
			const rules = Array.from(cssRules);
			// filter rules to assess if any external rules by way of @import or link exists on a nested level
			const externalRules = rules.filter(r => r.href);
			// if no external rules then return an expanded version of
			if (!externalRules.length) {
				q.defer(resolve => resolve(getCssomSheet(sheet, false, shadowId)));
				return;
			}

			// there are external rules, best to filter non-external rules and create a new stylesheet to avoid duplication
			const nonExternalRules = rules.filter(rule => !rule.href);
			// concat all cssText into a string for non external rules
			const nonExternalRulesText = nonExternalRules
				.reduce((out, rule) => {
					out.push(rule.cssText);
					return out;
				}, [])
				.join();

			// create a dynamic sheet for non external rules
			q.defer(resolve =>
				resolve(
					convertTextToStylesheetFn({
						data: nonExternalRulesText,
						shadowId,
						isExternal: false
					})
				)
			);

			// for any external rule -> make an xhr and q the response
			externalRules.forEach(rule => {
				q.defer((resolve, reject) => {
					getExternalStylesheet({ resolve, reject, url: rule.href });
				});
			});
		} catch (e) {
			// if no href, do not attempt to make an XHR
			if (!sheet.href) {
				return;
			}
			// external sheet -> make an xhr and q the response
			q.defer((resolve, reject) => {
				getExternalStylesheet({ resolve, reject, url: sheet.href });
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
	/**
	 * Clone of axe.commons.dom.getRootNode
	 * Note:
	 * unable to call - axe.commons.dom.getRootNode(node.actualNode) while running tests, in any part of the code in lib/core,
	 * as commons is not loaded when running core tests and vice versa, in test suite due to grunt concat linearity and seperation of files
	 * so taking a copy of the function here for now
	 * TODO:
	 * cleanup later, once build is re-engineered
	 * @method getRootNode
	 * @param {Element} node
	 * @returns {DocumentFragment|Document}
	 * @private
	 */
	function getRootNode(node) {
		var doc = (node.getRootNode && node.getRootNode()) || document; // this is for backwards compatibility
		if (doc === node) {
			// disconnected node
			doc = document;
		}
		return doc;
	}

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
				root: getRootNode(node.actualNode)
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
	 * @method convertTextToStylesheet
	 * @private
	 * @param {Object} param an object with properties to construct stylesheet
	 * @property {String} param.data text content of the stylesheet
	 * @property {Boolean} param.isExternal flag to notify if the resource was fetched from the network
	 * @property {Object} param.doc implementation document to create style elements
	 * @property {String} param.shadowId (Optional) shadowId if shadowDOM
	 */
	function convertTextToStylesheet({ data, isExternal, shadowId }) {
		const style = dynamicDoc.createElement('style');
		style.type = 'text/css';
		style.appendChild(dynamicDoc.createTextNode(data));
		dynamicDoc.head.appendChild(style);
		return getCssomSheet(style.sheet, isExternal, shadowId);
	}

	q.defer((resolve, reject) => {
		// as there can be multiple documents (root document, shadow document fragments, and frame documents)
		// reduce these into a queue
		roots
			.reduce((out, root) => {
				out.defer((resolve, reject) => {
					loadCssom(root, timeout, convertTextToStylesheet)
						.then(resolve)
						.catch(reject);
				});
				return out;
			}, axe.utils.queue())
			// await loading all such documents assets, and concat results into one object
			.then(assets => {
				resolve(
					assets.reduce((out, cssomSheets) => {
						cssomSheets.forEach(s => {
							out.push(s);
						});
						return out;
					}, [])
				);
			})
			.catch(reject);
	});

	return q;
};
