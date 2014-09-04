var seen = {};

return results.filter(function (result) {
	var data = result.data;
	if (data) {
		seen[data.type] = seen[data.type] || {};
		if (!seen[data.type][data.name]) {
			seen[data.type][data.name] = true;
			return true;
		}
	}
	return false;
});