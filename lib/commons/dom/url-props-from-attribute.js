/* global dom */

/**
 * Parse resource object for a given node from a specified attribute
 * @method urlPropsFromAttribute
 * @param {HTMLElement} node given node
 * @param {String} attribute attribute of the node from which resource should be parsed
 * @returns {Object}
 */
dom.urlPropsFromAttribute = function urlPropsFromAttribute(node, attribute) {
	const value = node[attribute];
	if (!value) {
		return undefined;
	}

	const nodeName = node.nodeName.toUpperCase();
	let parser = node;

	/**
	 * Note:
	 * The need to create a parser, is to keep this function generic, to be able to parse resource from element like `iframe` with `src` attribute
	 */
	if (!['A', 'AREA'].includes(nodeName)) {
		parser = document.createElement('a');
		parser.href = value;
	}

	const { pathname = '', filename = '' } = getPathnameOrFilename(
		parser.pathname
	);
	return {
		protocol: parser.protocol,
		hostname: parser.hostname,
		port: parser.port,
		pathname: pathname.replace(/\/$/, ''), // remove trialing slashes
		search: getSearchPairs(parser.search),
		hash: getHashRoute(parser.hash),
		filename
	};
};

/**
 * Resolve if a given pathname has filename & resolve the same as parts
 * @method getPathnameOrFilename
 * @param {String} pathname pathname part of a given uri
 * @returns {Array<String>}
 */
function getPathnameOrFilename(pathname) {
	if (!pathname) {
		return;
	}

	const filename = pathname.split('/').pop();
	if (!filename || filename.indexOf('.') === -1) {
		return {
			pathname
		};
	}

	return {
		// remove `filename` from `pathname`
		pathname: pathname.replace(filename, ''),

		// ignore filename when index.*
		filename: /index./.test(filename)
			? undefined
			: filename
	};
}

/**
 * Parse a given query string to key/value pairs sorted alphabetically
 * @param {String} searchStr search string
 * @returns {Object}
 */
function getSearchPairs(searchStr) {
	const query = {};

	if (!searchStr || !searchStr.length) {
		return query
	}

	const curatedSearchStr = searchStr[0] === `?` ? searchStr.substring(1) : searchStr
	const pairs = curatedSearchStr.split(`&`);
	if (!pairs || !pairs.length) {
		return query
	}


	for (let index = 0; index < pairs.length; index++) {
		const pair = pairs[index];
		const [key, value = ''] = pair.split(`=`)
		query[decodeURIComponent(key)] = decodeURIComponent(value);
	}

	/**
	 * Sort query `keys` alphabetically
	 */
	return Object.keys(query)
		.sort()
		.reduce((out, key) => {
			out[key] = query[key]
			return out
		}, {});
}

/**
 * Interpret a given hash
 * if `hash`
 * -> is `hashbang` -or- `hash` is followed by `slash`
 * -> it resolves to a different resource
 * @method getHashRoute
 * @param {String} hash hash component of a parsed uri
 * @returns {String|undefined}
 */
function getHashRoute(hash) {
	if (!hash) {
		return undefined;
	}

	/**
	 * Check for any conventionally-formatted hashbang may be present
	 * eg: `#, #/, #!, #!/`
	 */
	const hashRegex = /#!?\/?/g;
	const hasMatch = hash.match(hashRegex);
	if (!hasMatch) {
		return undefined;
	}

	// do not resolve inline link as hash
	const [matchedStr] = hasMatch;
	if (matchedStr === '#') {
		return undefined;
	}

	return hash;
}
