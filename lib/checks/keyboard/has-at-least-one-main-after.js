var hasMain = false;

//iterate through results from each document
//stops if any document contains a main landmark
for (var i = 0; i < results.length && !hasMain; i++) {
	hasMain = results[i].data;
}

//if any document contains a main landmark, set all documents to pass the check
//otherwise, fail all documents
//since this is a page level rule, all documents either pass or fail the requirement
for (var i = 0; i < results.length; i++) {
	results[i].result = hasMain;
}

return results;
