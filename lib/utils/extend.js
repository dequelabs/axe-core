utils.extend = function extend(to, from, deep) {
	'use strict';
	var prop, value;

	deep = deep || false;

	for (prop in from) {
		if (from.hasOwnProperty(prop)) {
			value = from[prop];
			// deep extend an object's objects, but not arrays (when deep is truthy)
			if (typeof value === 'object' && value !== null && deep && !Array.isArray(value)) {
				to[prop] = utils.extend(to[prop] ? to[prop] : {}, from[prop], deep);
			} else {
				to[prop] = utils.clone(from[prop]);
			}
		}
	}

	return to;
};
