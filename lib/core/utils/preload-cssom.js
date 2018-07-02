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
			// attempt to resolve if sheet is relative/ same domain
			sheet.cssRules && q.defer(resolve => resolve(sheet));
		} catch (e) {
			const deferredSheet = (resolve, reject) => {
				axe.utils
					.xhrQ({
						url: sheet.href,
						timeout
					})
					.then(xhrResponse => {
						if (
							xhrResponse &&
							Array.isArray(xhrResponse) &&
							xhrResponse.length
						) {
							xhrResponse.forEach(r => {
								const text = r.responseText ? r.responseText : r.response;
								const href = r.responseURL;
								const sheet = getSheetFromTextFn(text, href);
								resolve(sheet);
							});
						}
					})
					.catch(reject);
			};
			// external sheet -> make an xhr and q the response
			q.defer(deferredSheet);
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
function preloadCssom({ asset, timeout, treeRoot = axe._tree[0] }) {
	const documents = getDocumentsFromTreeRoot(treeRoot);
	const q = axe.utils.queue();

	if (!documents.length) {
		return q;
	}

	const getSheetFromTextFn = (function() {
		let htmlHead = document.implementation.createHTMLDocument().head;
		return (cssText, href) => {
			// create style node with css text
			let style = document.createElement('style');
			style.type = 'text/css';
			style.href = href;
			style.appendChild(document.createTextNode(cssText));
			// added style to temporary document
			htmlHead.appendChild(style);
			return style.sheet;
		};
	})(); // invoke immediately

	documents.forEach(doc => {
		q.defer((resolve, reject) => {
			loadCssom(doc, timeout, getSheetFromTextFn)
				.then(sheets =>
					resolve({
						[asset]: sheets
					})
				)
				.catch(reject);
		});
	});

	return q;
}
axe.utils.preloadCssom = preloadCssom;
