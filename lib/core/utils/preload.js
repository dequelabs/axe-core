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
		Array.isArray(preload.assets) &&
		preload.assets.length
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

	if (typeof options.preload === typeof true) {
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
	const out = {
		assets: axe.constants.preloadAssets,
		timeout: axe.constants.preloadAssetsTimeout
	};

	// if type is boolean
	if (typeof options.preload === 'boolean') {
		return out;
	}

	// if type is object - ensure an array of assets to load is specified
	if (!isPreloadValidObject(options.preload)) {
		throw new Error(
			'No assets configured for preload in aXe run configuration'
		);
	}

	// check if assets are valid items
	const areRequestedAssetsValid = options.preload.assets.reduce(
		(out, asset) => {
			const a = asset.toLowerCase();
			if (!axe.constants.preloadAssets.includes(a)) {
				out = false;
			}
			return out;
		},
		true
	);

	if (!areRequestedAssetsValid) {
		throw new Error(
			`Requested assets, not supported by aXe.` +
				`Supported assets are: ${axe.constants.preloadAssets.join(', ')}.`
		);
	}

	out.assets = options.preload.assets.reduce((out, asset) => {
		const a = asset.toLowerCase();
		// unique assets to load, in case user had requested same asset type many times.
		if (!out.includes(a)) {
			out.push(a);
		}
		return out;
	}, []);

	if (
		options.preload.timeout &&
		typeof options.preload.timeout === 'number' &&
		!Number.isNaN(options.preload.timeout)
	) {
		out.timeout = options.preload.timeout;
	}
	return out;
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
					resolve(results[0]);
				})
				.catch(reject);
		});
	});

	return q;
}
axe.utils.preload = preload;
