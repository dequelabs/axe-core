/**
 * Parse cross-origin stylesheets
 *
 * @param {String} url url from which to fetch stylesheet
 * @param {Object} options options object from `axe.utils.parseStylesheets`
 * @param {Array<Number>} priority sheet priority
 * @param {Array<String>} importedUrls urls of already imported stylesheets
 * @param {Boolean} isCrossOrigin boolean denoting if a stylesheet is `cross-origin`
 * @returns {Promise}
 */
axe.utils.parseCrossOriginStylesheets = function parseCrossOriginStylesheets(
	url,
	options,
	priority,
	importedUrls,
	isCrossOrigin
) {
	const axiosOptions = {
		method: 'get',
		url
	};

	importedUrls.push(url);
	return axe.imports.axios(axiosOptions).then(({ data }) => {
		const result = options.convertDataToStylesheet({
			data,
			isCrossOrigin,
			priority,
			root: options.rootNode,
			shadowId: options.shadowId
		});

		/**
		 * Parse resolved stylesheet further for any `@import` styles
		 */
		return axe.utils.parseStylesheet(
			result.sheet,
			options,
			priority,
			importedUrls,
			result.isCrossOrigin
		);
	});
};
