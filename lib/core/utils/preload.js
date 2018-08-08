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
 * @return {boolean}
 */
axe.utils.shouldPreload = function shouldPreload(options) {
	if (!options || !options.preload) {
		return false;
	}
	if (typeof options.preload === 'boolean') {
		return options.preload;
	}
	return isValidPreloadObject(options.preload);
};

/**
 * Constructs a configuration object representing the preload requested assets & timeout
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {Object}
 */
axe.utils.getPreloadConfig = function getPreloadConfig(options) {
	// default fallback configuration
	const config = {
		assets: axe.constants.preloadAssets,
		timeout: axe.constants.preloadAssetsTimeout
	};

	// if type is boolean
	if (typeof options.preload === 'boolean') {
		return config;
	}

	// check if requested assets to preload are valid items
	const areRequestedAssetsValid = options.preload.assets.every(a =>
		axe.constants.preloadAssets.includes(a.toLowerCase())
	);

	if (!areRequestedAssetsValid) {
		throw new Error(
			`Requested assets, not supported. ` +
				`Supported assets are: ${axe.constants.preloadAssets.join(', ')}.`
		);
	}

	// unique assets to load, in case user had requested same asset type many times.
	config.assets = axe.utils.uniqueArray(
		options.preload.assets.map(a => a.toLowerCase()),
		[]
	);

	if (
		options.preload.timeout &&
		typeof options.preload.timeout === 'number' &&
		!Number.isNaN(options.preload.timeout)
	) {
		config.timeout = options.preload.timeout;
	}
	return config;
};

/**
 * Returns a then(able) queue with results of all requested preload(able) assets. Eg: ['cssom'].
 * If preload is set to false, returns an empty queue.
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {Object} queue
 */
axe.utils.preload = function preload(options) {
	const preloadFunctionsMap = {
		cssom: axe.utils.preloadCssom
	};

	const q = axe.utils.queue();

	const shouldPreload = axe.utils.shouldPreload(options);
	if (!shouldPreload) {
		return q;
	}

	const preloadConfig = axe.utils.getPreloadConfig(options);

	preloadConfig.assets.forEach(asset => {
		q.defer((resolve, reject) => {
			preloadFunctionsMap[asset](preloadConfig)
				.then(results => {
					resolve({
						[asset]: results[0]
					});
				})
				.catch(reject);
		});
	});

	return q;
};
