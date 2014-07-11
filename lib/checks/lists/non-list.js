if (!(options && Array.isArray(options) && options.length)) { return true; }

var containsTextList = false;
var text = kslib.text.visible(node);

(options || []).forEach(function (listElements) {
	if (!Array.isArray(listElements)) { return; }
	var fromIndex = 0;
	for (var i = 0; i < listElements.length; i++) {
		fromIndex = text.indexOf(listElements[i], fromIndex);
		if (fromIndex === -1) { return; }
	}
	containsTextList = true;
	return;
});
	
return !containsTextList;
