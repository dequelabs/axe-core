/**
 * Validated the preload object
 * @param {Object | boolean} preload configuration object or boolean passed via the options parameter to axe.run
 * @return {boolean}
 * @private
 */
function isPreloadValidObject(preload) {
	return (
		typeof preload === 'object' &&
		preload.hasOwnProperty('assets') &&
		Array.isArray(preload.assets)
	);
}

/**
 * Returns a boolean which decides if preload is configured
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {boolean}
 */
function shouldPreload(options) {
	if (!options) {
		return false;
	}

	if (!options.preload) {
		return false;
	}

	if (typeof options.preload === 'boolean') {
		return options.preload;
	}

	if (isPreloadValidObject(options.preload)) {
		return true;
	}

	return false;
}
axe.utils.shouldPreload = shouldPreload;

/**
 * Constructs a configuration object representing the preload requested assets & timeout
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {Object}
 */
function getPreloadConfig(options) {
	// default fallback configuration
	const config = {
		assets: axe.constants.preloadAssets,
		timeout: axe.constants.preloadAssetsTimeout
	};

	// if type is boolean
	if (typeof options.preload === 'boolean') {
		return config;
	}

	// if type is object - ensure an array of assets to load is specified
	if (!isPreloadValidObject(options.preload)) {
		throw new Error(
			'No assets configured for preload in aXe run configuration'
		);
	}

	// check if requested assets to preload are valid items
	const areRequestedAssetsValid = options.preload.assets.every(a =>
		axe.constants.preloadAssets.includes(a.toLowerCase())
	);

	if (!areRequestedAssetsValid) {
		throw new Error(
			`Requested assets, not supported by aXe.` +
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
}
axe.utils.getPreloadConfig = getPreloadConfig;

/**
 * Returns a then(able) queue with results of all requested preload(able) assets. Eg: ['cssom'].
 * If preload is set to false, returns an empty queue.
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {Object} queue
 */
function preload(options) {
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
			preloadFunctionsMap[asset]({
				asset,
				timeout: preloadConfig.timeout
			})
				.then(results => {
					const sheets = results[0];
					resolve({
						[asset]: sheets
					});
				})
				.catch(reject);
		});
	});

	return q;
}
axe.utils.preload = preload;
