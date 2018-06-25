/**
 * Returns a CSSStyleSheet object for a given style sheet content/ text
 * @param {string} cssText content for the stylesheet
 * @return {CSSStyleSheet}
 * @private
 */
const getCssSheet = (cssText) => {
	let htmlHead = document.implementation.createHTMLDocument().head;

	// create style node with css text
	let style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(cssText));

	// added style to temporary document
	htmlHead.appendChild(style);

	// cleanup style and temporary document after return
	setTimeout(() => {
		htmlHead.removeChild(style);
		htmlHead = undefined;
	});

	return style.sheet;
}

/**
 * Returns a then(able) queue of CSSStyleSheet(s)
 * @param {Object} ownerDocument document object to be inspected for all stylesheets
 * @param {number} timeout for stylesheet that are external and needs to be fetched, a timeout on the network call
 * @return {Object}
 * @private
 */
const loadCssom = (ownerDocument, timeout) => {
	return [...ownerDocument.styleSheets]
		.reduce((out, sheet) => {
			if (!sheet.disabled) {
				try {
					// attempt to resolve if sheet is relative/ same domain
					sheet.cssRules && out.defer((res) => res(sheet));
				}
				catch (e) {
					// external sheet -> make an xhr and q the response
					out.defer((res, rej) => {
						axe.utils
							.xhrQ({
								url: sheet.href,
								timeout
							})
							.then((xhrResponse) => {
								if (xhrResponse && Array.isArray(xhrResponse) && xhrResponse.length) {
									xhrResponse.forEach((r) => {
										const sheet = getCssSheet(r.responseText ? r.responseText : r.response);
										res(sheet)
									})
								}
							})
							.catch(rej);
					})
				}
			}
			return out;
		}, axe.utils.queue());
}

/**
 * @method preloadCssom
 * @memberof axe.utils
 * @instance
 * @param {Object} object with attributes asset, timeout, treeRoot(optional)
 * asset - type of asset being loaded, in this case cssom
 * timeout - timeout for any network calls made
 * treeRoot - the DOM tree to be inspected
 * @return {Object}
 */
axe.utils.preloadCssom = ({
	asset,
	timeout,
	treeRoot = axe._tree[0],
}) => {
	let ids = [];
	const documents = axe.utils
		.querySelectorAllFilter(treeRoot, '*', (node) => {
			if (ids.includes(node.shadowId)) {
				return false;
			}
			ids.push(node.shadowId)
			return true;
		})
		.map((node) => {
			return node.actualNode.ownerDocument;
		});
	ids = undefined;

	return documents
		.reduce((out, ownerDocument) => {
			out.defer((res, rej) => {
				loadCssom(ownerDocument, timeout)
					.then((sheets) => res({ [asset]: sheets }))
					.catch(rej)
			});
			return out;
		}, axe.utils.queue());
};