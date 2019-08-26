/**
 * Note: `identical-links-same-purpose-after` fn, helps reconcile the results
 */
const { text } = axe.commons;

/**
 * Note:
 * Firefox does not respect map > area as visible,
 * even when used by a img[usemap], hence the usage of `includeHidden` flag,
 * in the accessible name computation
 */
const accText = text.accessibleTextVirtual(virtualNode, {
	includeHidden: true
});
const name = curateText(accText, {
	emoji: true,
	nonBmp: true,
	punctuations: true,
	sanitize: true,
	lowercase: true
});
if (!name) {
	return undefined;
}

/**
 * Set `data` and `relatedNodes` for use in `after` fn
 */
const afterData = {
	name,
	parsedResource: getParsedResource(node, 'href')
};
this.data(afterData);
this.relatedNodes([node]);

return true;

/**
 * Curate a given string
 * @method curateText
 * @param {String} str given string to curate
 * @param {Object} options options to curate
 * @property {Boolean} options.emoji remove emoji characters?
 * @property {Boolean} options.nonBmp remove nonBmp characters?
 * @property {Boolean} options.punctuations remove punctuation characters?
 * @property {Boolean} options.sanitize santize given string?
 * @property {Boolean} options.lowercase convert given string to lowercase?
 * @returns {String}
 */
function curateText(str, options) {
	const {
		emoji = false,
		nonBmp = false,
		punctuations = false,
		sanitize = false,
		lowercase = false
	} = options;

	let curatedText = text.removeUnicode(str, { emoji, nonBmp, punctuations });

	if (sanitize) {
		curatedText = text.sanitize(curatedText);
	}

	if (lowercase) {
		curatedText = curatedText.toLowerCase();
	}

	return curatedText;
}

/**
 * Construct a resource object for a given node fromt he attribute provided
 * @method getParsedResource
 * @param {HTMLElement} currentNode node
 * @returns {Object}
 */
function getParsedResource(currentNode, attribute) {
	const value = currentNode[attribute];
	if (!value) {
		return undefined;
	}

	const nodeName = currentNode.nodeName.toUpperCase();
	let parser = currentNode;

	if (!['A', 'AREA'].includes(nodeName)) {
		parser = document.createElement('a');
		parser.href = value;
	}

	const [pathname, filename] = getPathnameAndFilename(parser.pathname);
	return {
		protocol: parser.prootocol,
		hostname: parser.hostname,
		port: parser.port,
		pathname: pathname.replace(/^\/|\/$/g, ''), // revmove lead/trial(ing) slashes
		search: parser.search,
		hash: getHash(parser.hash),
		filename
	};
}

/**
 * Resolve if a given pathname has filename & resolve the same as parts
 * @method getPathnameAndFilename
 * @param {String} pathname pathname part of a given uri
 * @returns {Array<String>}
 */
function getPathnameAndFilename(pathname) {
	if (!pathname) {
		return;
	}
	const filename = pathname.split('/').pop();
	if (!filename) {
		return [pathname];
	}

	if (filename.indexOf('.') === -1) {
		return [pathname];
	}

	const hasIndexInFilename = /index./.test(filename);
	if (hasIndexInFilename) {
		return [pathname.replace(filename, '')];
	}

	return [filename];
}

/**
 * Interpret a given hash
 * if `hash`
 * -> is `hashbang` -or- `hash` is followed by `slash`
 * -> it resolves to a different resource
 * @method getHash
 * @param {String} hash hash component of a parsed uri
 * @returns {String|undefined}
 */
function getHash(hash) {
	if (!hash) {
		return undefined;
	}

	if (!(hash.includes('#!/') || hash.includes('#/'))) {
		return undefined;
	}

	return hash;
}
