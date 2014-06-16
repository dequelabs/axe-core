/*global aria, lookupTables, utils */

aria.isValidRole = function (role) {
	'use strict';
	if (lookupTables.role[role]) {
		return true;
	}

	return false;
};

aria.getRoleType = function (role) {
	var r = lookupTables.role[role];

	return (r && r.type) || null;
};

aria.requiredOwned = function (role) {
	'use strict';
	var owned = null,
		roles = lookupTables.role[role];

	if (roles) {
		owned = utils.clone(roles.owned);
	}
	return owned;
};


aria.requiredContext = function (role) {
	'use strict';
	var context = null,
		roles = lookupTables.role[role];

	if (roles) {
		context = utils.clone(roles.context);
	}
	return context;
};

aria.implicitNodes = function (role) {
	'use strict';

	var implicit = null,
		roles = lookupTables.role[role];

	if (roles && roles.implicit) {
		implicit = utils.clone(roles.implicit);
	}
	return implicit;
};