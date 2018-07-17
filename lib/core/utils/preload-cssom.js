/**
 * Returns a then(able) queue of CSSStyleSheet(s)
 * @param {Object} ownerDocument document object to be inspected for stylesheets
 * @param {number} timeout on network request for stylesheet that need to be externally fetched
 * @param {Function} getSheetFromTextFn a utility function to generate a style sheet from text
 * @return {Object} queue
 * @private
 */
function loadCssom(ownerDocument, timeout, getSheetFromTextFn) {
	const q = axe.utils.queue();

	Array.from(ownerDocument.styleSheets).forEach(sheet => {
		if (sheet.disabled) {
			return;
		}

		try {
			if (sheet.cssRules) {
				// accessing .cssRules throws for external (cross-domain) sheets, which is handled in the catch
				sheet.isExternal = false; // isExternal is a flag to ascertain if a network request is necessary for cssom building
				q.defer(resolve => resolve(sheet));
			}
		} catch (e) {
			// external sheet -> make an xhr and q the response
			q.defer((resolve, reject) => {
				axe.imports
					.axios({
						method: 'get',
						url: sheet.href,
						timeout
					})
					.then(({ data }) => {
						const sheet = getSheetFromTextFn(data, true); //second argument acts as > isExternal - true
						resolve(sheet);
					})
					.catch(reject);
			});
		}
	});

	return q;
}

/**
 * Returns an array of documents with a given root node/ tree
 * @param {Object} treeRoot - the DOM tree to be inspected
 * @return {Array} documents
 * @private
 */
function getDocumentsFromTreeRoot(treeRoot) {
	let ids = [];
	const documents = axe.utils
		.querySelectorAllFilter(treeRoot, '*', node => {
			if (ids.includes(node.shadowId)) {
				return false;
			}
			ids.push(node.shadowId);
			return true;
		})
		.map(node => {
			return node.actualNode.ownerDocument;
		});
	return documents;
}

/**
 * @method preloadCssom
 * @memberof axe.utils
 * @instance
 * @param {Object} object argument which is a composite object, with attributes asset, timeout, treeRoot(optional), resolve & reject
 * asset - type of asset being loaded, in this case cssom
 * timeout - timeout for any network calls made
 * treeRoot - the DOM tree to be inspected
 * resolve/ reject - promise chainable methods
 * @return {Object}
 */
function preloadCssom({ timeout, treeRoot = axe._tree[0] }) {
	const documents = getDocumentsFromTreeRoot(treeRoot);
	const q = axe.utils.queue();

	if (!documents.length) {
		return q;
	}

	const dynamicDoc = document.implementation.createHTMLDocument();
	function getSheetFromTextFn(cssText, isExternal) {
		// create style node with css text
		const style = dynamicDoc.createElement('style');
		style.type = 'text/css';
		style.appendChild(dynamicDoc.createTextNode(cssText));
		// added style to temporary document
		dynamicDoc.head.appendChild(style);
		// add attribute to differentiate if it is a fetched sheet
		style.sheet.isExternal = isExternal;
		return style.sheet;
	}

	documents.forEach(doc => {
		q.defer((resolve, reject) => {
			loadCssom(doc, timeout, getSheetFromTextFn)
				.then(resolve)
				.catch(reject);
		});
	});

	return q;
}
axe.utils.preloadCssom = preloadCssom;
