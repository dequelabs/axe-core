var hasMain = false;
for (var i = 0; i < results.length && !hasMain; i++) {
	hasMain = results[i].data;
}
for (var i = 0; i < results.length; i++) {
	results[i].result = hasMain;
}
return results;