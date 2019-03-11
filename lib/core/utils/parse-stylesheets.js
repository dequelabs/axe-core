/**
 * Returns all CSS stylesheets for a given root node
 *
 * @param {Object} options configuration options
 * @property {Object} options.rootNode document or document fragment
 * @property {Number} options.rootIndex a number representing the index of the document or document fragment, used for priority computation
 * @property {String} options.shadowId an id if undefined denotes that given root is a document fragment/ shadowDOM
 * @property {Number} options.timeout abort duration for network request
 * @property {Function} options.convertDataToStylesheet a utility function to generate a style sheet from given data (text)
 * @returns {Promise}
 */
axe.utils.parseStylesheets = function parseStylesheets(
	sheets,
	options,
	importedUrls = []
) {
	/**
	 * Note:
	 * `importedUrls` - keeps urls of already imported stylesheets, to prevent re-fetching
	 * eg: nested, cyclic or cross referenced `@import` urls
	 */
	const { rootIndex } = options;
	return Promise.all(
		sheets.map((sheet, sheetIndex) => {
			const priority = [rootIndex, sheetIndex];
			return axe.utils.parseStylesheet(sheet, options, priority, importedUrls);
		})
	);
};

/**
 * Parses a given stylesheet
 *
 * @param {Object} sheet stylesheet to parse
 * @param {Object} options configuration options object from `axe.utils.parseStylesheets`
 * @param {Array<Number>} priority priority of stylesheet
 * @param {Array<String>} importedUrls list of resolved `@import` urls
 * @param {Boolean} isCrossOrigin boolean denoting if a stylesheet is `cross-origin`, passed for re-parsing `cross-origin` sheets
 * @returns {Promise}
 */
axe.utils.parseStylesheet = function parseStylesheet(
	sheet,
	options,
	priority,
	importedUrls,
	isCrossOrigin = false
) {
	const isSameOrigin = isSameOriginStylesheet(sheet);
	if (isSameOrigin) {
		/**
		 * resolve `same-origin` stylesheet
		 */
		return axe.utils.parseSameOriginStylesheets(
			sheet,
			options,
			priority,
			importedUrls,
			isCrossOrigin
		);
	}

	/**
	 * resolve `cross-origin` stylesheet
	 */
	return axe.utils.parseCrossOriginStylesheets(
		sheet.href,
		options,
		priority,
		importedUrls,
		true // -> isCrossOrigin
	);
};

/**
 * Check if a given stylesheet is from the `same-origin`
 * Note:
 * `sheet.cssRules` throws an error on `cross-origin` stylesheets
 *
 * @param {Object} sheet CSS stylesheet
 * @returns {Boolean}
 */
function isSameOriginStylesheet(sheet) {
	try {
		/*eslint no-unused-vars: 0*/
		const rules = sheet.cssRules;
		return true;
	} catch (e) {
		return false;
	}
}
