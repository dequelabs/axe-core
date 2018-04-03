var labels = {};
if (results.length > 1) {
	results.forEach(function (r) {
		labels[r.data] = labels[r.data] !== undefined ? ++labels[r.data] : 0;
	});
	results.forEach(function (r) {
		r.result = labels[r.data] === 0;
	});
}
return results;
