/*eslint */

axe.utils.ruleShouldPreload = (options) => {
	if (typeof options.preload !== 'undefined' &&
		options.preload.hasOwnProperty('assets') &&
		Array.isArray(options.preload.assets) &&
		options.preload.assets.length) {
		return true;
	}
	return false;
}


axe.utils.preload = (options) => {
	const preloadFunctionsMap = {
		'cssom': axe.utils.preloadCssom,
		'aom': axe.utils.preloadCssom
	};

	const q = axe.utils.queue();

	if (axe.utils.ruleShouldPreload(options)) {
		options.preload.assets
			// unique assets to load, incase user had requested same asset type many times.
			.reduce((out, asset) => {
				let a = asset.toLowerCase();
				if (!out.includes(a)) {
					out.push(a);
				}
				return out;
			}, [])
			.forEach((asset) => {
				if (axe.constants.preload.includes(asset)) {
					q.defer((response, reject) => {
						preloadFunctionsMap[asset]({
							response,
							reject,
							asset: asset,
							timeout: options.preload.timeout || axe.constants.preloadTimeout
						});
					});
				}
			});
	}

	return new Promise((resolve, reject) => {
		q.then((results) => {
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

}

// TODO:JEY test