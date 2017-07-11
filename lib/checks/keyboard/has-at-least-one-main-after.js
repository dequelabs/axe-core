var ifMain = false;
for (var i = 0; i < results.length && !ifMain; i++) {
	ifMain = results[i].data;
}
for (var i = 0; i < results.length; i++) {
	results[i].result = ifMain;
}
return results;