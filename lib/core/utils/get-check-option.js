/*eslint complexity: ["error", 12]*/
/**
 * Determines which CheckOption to use, either defined on the rule options, global check options or the check itself
 * @param  {Check} check    The Check object
 * @param  {String} ruleID  The ID of the rule
 * @param  {Object} options Options object as passed to main API
 * @return {Object}         The resolved object with `options` and `enabled` keys
 */
axe.utils.getCheckOption = function (check, ruleID, options) {

	const ruleCheckOption = ((options.rules && options.rules[ruleID] || {}).checks || {})[check.id];
	const checkOption = (options.checks || {})[check.id];
	const preloadConfig = axe.utils.getPreloadConfig(options);

	let enabled = check.enabled;
	let opts = check.options || {};

	if (checkOption) {
		if (checkOption.hasOwnProperty('enabled')) {
			enabled = checkOption.enabled;
		}
		if (checkOption.hasOwnProperty('options')) {
			opts = checkOption.options;
		}
	}

	if (ruleCheckOption) {
		if (ruleCheckOption.hasOwnProperty('enabled')) {
			enabled = ruleCheckOption.enabled;
		}
		if (ruleCheckOption.hasOwnProperty('options')) {
			opts = ruleCheckOption.options;
		}
	}

	if (preloadConfig.preload) {
		opts = {
			...opts,
			preloadedAssets: options.preloadedAssets
		}
	}

	return {
		enabled: enabled,
		options: opts,
		absolutePaths: options.absolutePaths
	};
};
