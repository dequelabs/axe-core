import uniqueArray from './unique-array';
import constants from '../constants';

/**
 * Constructs a configuration object representing the preload requested assets & timeout
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {Object} configuration
 */
function getPreloadConfig(options) {
	const { assets, timeout } = constants.preload;
	const config = {
		assets,
		timeout
	};

	// if no `preload` is configured via `options` - return default config
	if (!options.preload) {
		return config;
	}

	// if type is boolean
	if (typeof options.preload === 'boolean') {
		return config;
	}

	// check if requested assets to preload are valid items
	const areRequestedAssetsValid = options.preload.assets.every(a =>
		assets.includes(a.toLowerCase())
	);

	if (!areRequestedAssetsValid) {
		throw new Error(
			`Requested assets, not supported. ` +
				`Supported assets are: ${assets.join(', ')}.`
		);
	}

	// unique assets to load, in case user had requested same asset type many times.
	config.assets = uniqueArray(
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

export default getPreloadConfig;
