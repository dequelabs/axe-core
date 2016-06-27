
function getBaseLang (lang) {
	return lang.trim().split('-')[0].toLowerCase();
}
var langs, invalid;

langs = (options || []).map(getBaseLang);

invalid = ['lang', 'xml:lang'].reduce(function (invalid, langAttr) {
	var langVal = node.getAttribute(langAttr);
	if (typeof langVal !== 'string') {
		return invalid;
	}

	var baselangVal = getBaseLang(langVal);

	// Edge sets lang to an empty string when xml:lang is set
	// so we need to ignore empty strings here
	if (baselangVal !== '' && langs.indexOf(baselangVal) === -1) {
		invalid.push(langAttr + '="' + node.getAttribute(langAttr) + '"');
	}
	return invalid;

}, []);

if (invalid.length) {
	this.data(invalid);
	return true;
}

return false;