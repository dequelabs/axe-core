// TODO:JEY - doc
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

// TODO:JEY - doc
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
 * 
 * @method preloadCssom
 * @memberof axe.utils
 * @instance
 * @param  {Array} treeRoot  
 * @param 
 * TODO:JEY - doc
 */
axe.utils.preloadCssom = ({
	response,
	reject,
	asset,
	timeout,
	treeRoot = axe._tree[0],
}) => {
	const ids = [];

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

	return documents
		.reduce((out, ownerDocument) => {
			out.defer((resolve, reject) => {
				loadCssom(ownerDocument, timeout)
					.then((sheets) => {
						resolve(
							response({
								[asset]: sheets
							})
						);
					})
					.catch(reject)
			});
			return out;
		}, axe.utils.queue());
};

// TODO:JEY - test
