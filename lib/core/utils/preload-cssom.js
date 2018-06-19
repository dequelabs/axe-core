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


const loadCssom = (ownerDocument, timeout) => {
	const sheets = Array.from(ownerDocument.styleSheets);

	const fetchingSheets = sheets
		.filter((sheet) => {
			return !sheet.disabled;
		})
		.map((sheet) => {
			try {
				// relative or same domain styles
				return sheet.cssRules && sheet;
			}
			catch (e) {
				// external styles
				// TODO:JEY cache results of external sheets?
				return axe.utils
					.xhrPromise({
						url: sheet.href,
						timeout
					})
					.then((response) => {
						return getCssSheet(response.responseText);
					});
			}
		});

	return Promise.all(fetchingSheets);
}


/**
 * 
 * @method preloadCssom
 * @memberof axe.utils
 * @instance
 * @param  {Array} treeRoot  
 * @param 
 * TODO:JEY
 */
const preloadCssom = ({
	response,
	reject,
	asset,
	timeout,
	treeRoot = axe._tree[0],
}) => {
	const ids = [];
	// TODO:JEY This looks for all unique ownerDocument props on the page.
	// There is probably a better way to do this though since getFlattenedTree
	// has all of them. Maybe we can index all the roots?
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

	const asyncDocuments = documents
		.map((ownerDocument) => {
			return loadCssom(ownerDocument, timeout)
				.then((sheets) => {
					response({
						[asset]: sheets
					});
				})
				.catch(reject)
		});

	return Promise.all(asyncDocuments);
};


axe.utils.preloadCssom = preloadCssom;

// TODO:JEY - test
