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
					shadowId,
					root
				});
				resolve(sheet);
			})
			.catch(reject);
	}

	const q = axe.utils.queue();

	// handle .styleSheets non existent on certain shadowDOM root
	const rootStyleSheets = root.styleSheets
		? Array.from(root.styleSheets)
		: null;
	if (!rootStyleSheets) {
		return q;
	}

	// convenience array fot help unique sheets if duplicated by same `href`
	// both external and internal sheets
	let sheetHrefs = [];

	// filter out sheets, that should not be accounted for...
	const sheets = rootStyleSheets.filter(sheet => {
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
	sheets.forEach(sheet => {
		// attempt to retrieve cssRules, or for external sheets make a XMLHttpRequest
		try {
			// accessing .cssRules throws for external (cross-domain) sheets, which is handled in the catch
			const cssRules = sheet.cssRules;
			// read all css rules in the sheet
			const rules = Array.from(cssRules);

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
						root
					})
				);
				return;
			}

			// if any import rules exists, fetch via `href` which eventually constructs a sheet with results from resource
			importRules.forEach(rule => {
				q.defer((resolve, reject) => {
					getExternalStylesheet({ resolve, reject, url: rule.href });
				});
			});

			// in the same sheet -  get inline rules in <style> tag or in a CSSStyleSheet excluding @import or nested link
			const inlineRules = rules.filter(rule => !rule.href);

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
					convertTextToStylesheetFn({
						data: inlineRulesCssText,
						shadowId,
						root,
						isExternal: false
					})
				)
			);
		} catch (e) {
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
				root: axe.utils.getRootNode(node.actualNode)
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
	function convertTextToStylesheet({ data, isExternal, shadowId, root }) {
		const style = dynamicDoc.createElement('style');
		style.type = 'text/css';
		style.appendChild(dynamicDoc.createTextNode(data));
		dynamicDoc.head.appendChild(style);
		return {
			sheet: style.sheet,
			isExternal,
			shadowId,
			root
		};
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
						return out.concat(cssomSheets);
					}, [])
				);
			})
			.catch(reject);
	});

	return q;
};
