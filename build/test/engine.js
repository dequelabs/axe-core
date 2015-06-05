var checks;
var attest = {
	_load: function (c) {
		checks = c.reduce(function (acc, check) {
			acc[check.id] = check;
			return acc;
		}, {});
	}
};
