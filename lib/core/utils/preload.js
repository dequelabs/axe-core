/**
 * Returns a then(able) queue with results of all requested preload(able) assets. Eg: ['cssom'].
 * If preload is set to false, returns an empty queue.
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {Object}
 */
axe.utils.preload = (options) => {

	const preloadFunctionsMap = {
		'cssom': axe.utils.preloadCssom
	};

	const q = axe.utils.queue();

	const preloadConfig = axe.utils.preloadConfig(options);

	if (preloadConfig.preload) {
		preloadConfig.assets.forEach((asset) => {
			q.defer((res, rej) => {
				preloadFunctionsMap[asset]({ asset, timeout: preloadConfig.timeout })
					.then((result) => {
						res(
							result.reduce((out, asset) => {
								return {
									...out,
									...asset
								};
							}, {})
						);
					})
					.catch(rej)
			});
		});
	}

	return q;
}