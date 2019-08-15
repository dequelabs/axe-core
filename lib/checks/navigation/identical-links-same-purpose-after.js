/**
 * Skip unless there are more than a single result
 */
if (results.length < 2) {
	return results;
}

/**
 * for each result
 * - get other results with matching accessible name
 * - check if same purpose is served
 *  - if not change `result` to `undefined`
 */
for (let index = 0; index < results.length; index++) {
	const { data: nodeData } = results[index];
	const { name, resource } = nodeData;
	const identicalNodes = getNodesWithIdenticalAccessibleName(name, index);
	if (!identicalNodes.length) {
		continue;
	}
	if (!resource) {
		results[index].result = undefined;
		continue;
	}
	if (!servesSamePurpose(resource, identicalNodes)) {
		results[index].result = undefined;
		continue;
	}
}

return results;

/**
 * Get list of nodes from results which match a given accessible name
 * @method getNodesWithIdenticalAccessibleName
 * @param {String} expectedName accessible name to be matched
 * @param {Number} excludeIndex exclude `index` of result, that should not be taken into consideration
 * @returns {Array<Object>}
 */
function getNodesWithIdenticalAccessibleName(expectedName, excludeIndex) {
	return results.filter((result, index) => {
		const {
			data: { name }
		} = result;
		return index !== excludeIndex && name === expectedName;
	});
}

/**
 * Check if a given set of nodes have same resource
 * @method servesSamePurpose
 * @param {String} expectedResource expected resource
 * @param {Array<Object>} identicalNodes results where `data.accessibleText` were identical
 * @returns {Boolean}
 */
function servesSamePurpose(expectedResource, identicalNodes) {
	const { parts: expected } = parseUri(expectedResource);
	return identicalNodes.every(({ data }) => {
		const { resource = undefined } = data;
		if (!resource) {
			return false;
		}
		const { isFile, parts: actual } = parseUri(resource);
		return actual[isFile ? 'some' : 'every'](part => expected.includes(part));
	});
}

/**
 * Parse a given URI and return to parts
 * @method parseUri
 * @param {String} uri uri resource
 * @returns {Object}
 */
function parseUri(uri = '') {
	const parser = document.createElement('a');
	parser.href = uri;

	const curatedPathname = stripLeadingAndTrailingSlash(parser.pathname);
	const defaults = [
		parser.protocol,
		parser.hostname,
		parser.port,
		parser.search
	];
	const pathname = parseUriPathnameAndHash(curatedPathname, parser.hash);
	const file = parseUriPathnameAndFile(curatedPathname);

	let uriParts = [...defaults, ...pathname];
	if (file) {
		uriParts = [...defaults, ...file];
	}
	return {
		isFile: !!file,
		parts: uriParts.filter(item => !!item)
	};
}

/**
 * Parse a given pathname for filename & return an array containing parts of pathname and filename (exlcuding index if any)
 * @method parseUriPathnameAndFile
 * @param {String} pathname pathname of the given resource
 * @returns {Array<String>}
 */
function parseUriPathnameAndFile(pathname) {
	const fileName = pathname.split('/').pop();
	if (fileName.indexOf('.') === -1) {
		return undefined;
	}

	const hasIndexInFilename = name => name.toLowerCase().includes('index.');
	const fileNameParts = pathname
		.split('/')
		.filter(part => !!part)
		.filter(part => !hasIndexInFilename(part));

	return fileNameParts;
}

/**
 * Parse a given URI hash and pathname
 * @method parseUriPathnameAndHash
 * @param {String} pathname pathname part of a given `uri`
 * @param {String} hash hash part of a given `uri`
 * @returns {Array<String>}
 */
function parseUriPathnameAndHash(pathname, hash) {
	/**
	 * if `hash` -> `hashbang` -or- `hash` is followed by `slash`
	 * - uri may resolve to different resource, return combination of pathname and hash
	 */
	if (hash && (hash.includes('#!/') || hash.includes('#/'))) {
		return [pathname, hash];
	}

	/**
	 * `hash` is an `inline` anchor -> ignore
	 */
	return [pathname];
}

/**
 * Remove trailing slashes (if any) from a given string
 * @method stripLeadingAndTrailingSlash
 * @param {String} str given string
 * @returns {String}
 */
function stripLeadingAndTrailingSlash(str) {
	return str
		.replace(/^\/+/g, '') // remove leading slash
		.replace(/\/+$/, ''); // remove trailing slash
}
