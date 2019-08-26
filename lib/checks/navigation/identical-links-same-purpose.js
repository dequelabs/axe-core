/**
 * Note: `identical-links-same-purpose-after` fn, helps reconcile the results
 */
const { text } = axe.commons;

const name = getCuratedAccessibleName(virtualNode);
if (!name) {
	return undefined;
}

/**
 * Set `data` and `relatedNodes` for use in `after` fn
 */

const afterData = {
	name,
	parsedResource: getParsedResource(node)
};
this.data(afterData);
this.relatedNodes([node]);

return true;

/**
 * Get accessible name of a given virtual node
 * -> excluding unicode
 * -> trim whitespace
 * -> transformed to lowercase
 * @param {Object} vNode virtual node
 * @returns {String}
 */
function getCuratedAccessibleName(vNode) {
	/**
	 * Note:
	 * Firefox does not respect map > area as visible,
	 * even when used by a img[usemap], hence the usage of `includeHidden` flag,
	 * in the accessible name computation
	 */
	const accText = text.accessibleTextVirtual(vNode, { includeHidden: true });
	const accTextNoUnicode = text.removeUnicode(accText, {
		emoji: true,
		nonBmp: true,
		punctuations: true
	});
	return text.sanitize(accTextNoUnicode).toLowerCase();
}

/**
 * Construct a resource object for a given node based uri/href of the node
 * @param {HTMLElement} currentNode node
 * @returns {Object}
 */
function getParsedResource(currentNode) {
	if (!currentNode.href) {
		return undefined;
	}

	const nodeName = currentNode.nodeName.toUpperCase();
	let parser = currentNode;

	if (!['A', 'AREA'].includes(nodeName)) {
		parser = document.createElement('a');
		parser.href = currentNode.href;
	}

	const [pathname, filename] = getPathnameAndFilename(parser.pathname);

	return {
		protocol: parser.prootocol,
		hostname: parser.hostname,
		port: parser.port,
		pathname: removeLeadingAndTrialingSlash(pathname),
		search: parser.search,
		hash: getHash(parser.hash),
		filename
	};
}

/**
 * Remove leading and trailing slashes of a given text (if any)
 * @method removeLeadingAndTrialingSlash
 * @param {String} str string
 * @returns {String}
 */
function removeLeadingAndTrialingSlash(str) {
	return str.replace(/^\/|\/$/g, '');
}

/**
 * Interpret a given hash
 * if `hash`
 * -> is `hashbang` -or- `hash` is followed by `slash`
 * -> it resolves to a different resource
 *
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

/**
 * Resolve if a given pathname has filename & resolve the same as parts
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
