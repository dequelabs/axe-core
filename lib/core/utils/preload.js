/*eslint */

//TODO:JEY doc
const getPreloadConfig = (options) => {
	/**
	 * Possible values for `preload`
	 * true | false (default) | { assets: ['cssom'], timeout: 30000 (optional) }
	 */
	const p = options.preload;

	// default fallback config
	let out = {
		preload: false,
		assets: axe.constants.preloadAssets,
		timeout: p && p.timeout
			? Number(p.timeout)
			: axe.constants.preloadAssetsTimeout
	};

	// by type is boolean
	if (typeof (p) == typeof (true)) {
		out.preload = p;
	} else {
		// if type is object - ensure an array of assets to load is specified
		if (p.hasOwnProperty('assets') &&
			Array.isArray(p.assets) &&
			p.assets.length) {
			out.preload = true;
			out.assets = p.assets
				.map((a) => {
					if (axe.constants.preloadAssets.includes(a)) {
						return a;
					} else {
						const e = `Requested asset: ${a}, not supported by aXe.` +
							`Supported assets are: ${axe.constants.preloadAssets.map(_ => _).join(', ')}.`;
						console.error(e);
						throw new Error(e);
					}
				})
				.reduce((out, asset) => {
					const a = asset.toLowerCase();
					if (!out.includes(a)) { // unique assets to load, incase user had requested same asset type many times.
						out.push(a);
					}
					return out;
				}, []);
		} else {
			const e = 'No assets configured for preload in aXe run configuration';
			console.error(e);
			throw new Error(e);
		}
	}

	return out;
}

//TODO:JEY doc
axe.utils.preload = (options) => {

	const preloadFunctionsMap = {
		'cssom': axe.utils.preloadCssom
	};

	const loadQ = axe.utils.queue();

	const preloadConfig = getPreloadConfig(options);

	if (preloadConfig.preload) {
		preloadConfig.assets.forEach((asset) => {
			loadQ.defer((response, reject) => {
				preloadFunctionsMap[asset]({
					response,
					reject,
					asset,
					timeout: preloadConfig.timeout
				});
			});
		});
	}

	let outQ = axe.utils.queue();

	outQ.defer((resolve, reject) => {
		loadQ.then((results) => {
			const out = results.reduce((out, asset) => {
				return {
					...out,
					...asset
				};
			}, {});
			resolve(out);
		}).catch((err) => {
			reject(err);
		})
	});

	return outQ;
}

// TODO:JEY test