/**
 * Validated the preload object
 * @param {Object | boolean} preload configuration object or boolean passed via the options parameter to axe.run
 * @return {boolean}
 * @private
 */
function isValidPreloadObject(preload) {
	return typeof preload === 'object' && Array.isArray(preload.assets);
}

/**
 * Returns a boolean which decides if preload is configured
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {boolean} defaults to true
 */
function shouldPreload(options) {
	if (!options || options.preload === undefined || options.preload === null) {
		return true; // by default `preload` requested assets eg: ['cssom']
	}
	if (typeof options.preload === 'boolean') {
		return options.preload;
	}
	return isValidPreloadObject(options.preload);
}

export default shouldPreload;
