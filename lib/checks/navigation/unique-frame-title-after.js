var titles = {};
results.forEach(function (r) {
	titles[r.data] = titles[r.data] !== undefined ? ++titles[r.data] : 0;
});

return results.filter(function (r) {
	return !!titles[r.data];
});