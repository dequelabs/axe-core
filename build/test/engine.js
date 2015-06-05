var checks, commons;
var attest = {
	_load: function (r) {
		commons = r.commons;
		checks = r.checks.reduce(function (acc, check) {
			acc[check.id] = check;
			return acc;
		}, {});
	}
};
