/*global aria, utils, lookupTables */


aria.requiredAttr = function (role) {
	'use strict';
	var roles = lookupTables.role[role],
		attr = roles && roles.attributes && roles.attributes.required;
	return attr || [];
};

aria.allowedAttr = function (role) {
	'use strict';
	var roles = lookupTables.role[role],
		attr = (roles && roles.attributes && roles.attributes.allowed) || [];
	return attr.concat(lookupTables.globalAttributes);
};

aria.validateAttr = function (att) {
	'use strict';
	return !!lookupTables.attributes[att];
};

aria.validateAttrValue = function (node, attr) {
	'use strict';
	var ids, index, length, matches,
		doc = node.ownerDocument,
		value = node.getAttribute(attr),
		attrInfo = lookupTables.attributes[attr];

	if (!attrInfo) {
		return true;

	} else if (attrInfo.values) {
		if (attrInfo.values.indexOf(value) !== -1) {
			return true;
		}
		return false;
	}

	switch (attrInfo.type) {
	case 'http://www.w3.org/2001/XMLSchema#idref':
		return !!(value && doc.getElementById(value));

	case 'http://www.w3.org/2001/XMLSchema#idrefs':
		ids = utils.tokenList(value);
		for (index = 0, length = ids.length; index < length; index++) {
			if (ids[index] && !doc.getElementById(ids[index])) {
				return false;
			}
		}
		// not valid if there are no elements
		return !!ids.length;

	case 'http://www.w3.org/2001/XMLSchema#string':
		// anything goes
		return true;

	case 'http://www.w3.org/2001/XMLSchema#decimal':
		matches = value.match(/^[-+]?([0-9]*)\.?([0-9]*)$/);
		return !!(matches && (matches[1] || matches[2]));

	case 'http://www.w3.org/2001/XMLSchema#int':
		return (/^[-+]?[0-9]+$/).test(value);
	}
};
