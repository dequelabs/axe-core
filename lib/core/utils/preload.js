import shouldPreload from './should-preload';
import getPreloadConfig from './get-preload-config';
import preloadCssom from './preload-cssom';

/**
 * Returns a Promise with results of all requested preload(able) assets. eg: ['cssom'].
 *
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {Object} Promise
 */
function preload(options) {
	const preloadFunctionsMap = {
		cssom: preloadCssom
	};

	const shouldPreload = shouldPreload(options);
	if (!shouldPreload) {
		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {
		const { assets, timeout } = getPreloadConfig(options);

		/**
		 * Start `timeout` timer for preloading assets
		 * -> reject if allowed time expires.
		 */
		setTimeout(() => reject(`Preload assets timed out.`), timeout);

		/**
		 * Fetch requested `assets`
		 */

		Promise.all(
			assets.map(asset =>
				preloadFunctionsMap[asset](options).then(results => {
					return {
						[asset]: results
					};
				})
			)
		).then(results => {
			/**
			 * Combine array of results into an object map
			 *
			 * From ->
			 * 	[{cssom: [...], aom: [...]}]
			 * To ->
			 * 	{
			 * 		cssom: [...]
			 * 	 	aom: [...]
			 * 	}
			 */
			const preloadAssets = results.reduce((out, result) => {
				return {
					...out,
					...result
				};
			}, {});

			resolve(preloadAssets);
		});
	});
}

export default preload;
