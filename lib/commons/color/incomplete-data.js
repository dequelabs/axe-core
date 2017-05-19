/* global color */

/**
 * API for handling incomplete color data
 */
color.incompleteData = (function() {
	var data = {};
	return {
		/**
		 * Store incomplete data by key with a data object value
		 * @param {String} key 						Identifier for missing data point (fgColor, bgColor, etc.)
		 * @param {Object} dataObj 				Missing data information
		 * @param {String} dataObj.reason Key for reason we couldn't tell
		 */
		set: function(key, dataObj) {
			if (typeof key !== 'string') {
				throw new Error('Incomplete data: key must be a string');
			}
			if (dataObj){
				data[key] = dataObj;
			}
		},
		/**
		 * Get incomplete data by key
		 * @param {String} key 	Identifier for missing data point (fgColor, bgColor, etc.)
		 * @return {Object} Data object for string key
		 */
		 // TODO: do we need to lookup by node to ensure we have the right value?
		get: function(key) {
			return data[key];
		},
		/**
		 * Clear incomplete data on demand
		 */
		clear: function() {
			data = {};
		}
	};
})();
