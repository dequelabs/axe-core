var checks;
var dqre = {
	_load: function (c) {
		checks = c.reduce(function (acc, check) {
			acc[check.id] = check;
			return acc;
		}, {});
	}
};
