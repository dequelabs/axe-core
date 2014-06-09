options = (options || []).map(function (a) {
	return a.toLowerCase();
});

var result = false;

var lang = (node.getAttribute('lang') || '').trim().toLowerCase();
var xmlLang = (node.getAttribute('xml:lang') || '').trim().toLowerCase();
if (lang) {
	result = options.indexOf(lang) !== -1;
}
if (xmlLang) {
	result = options.indexOf(xmlLang) !== -1;
}
return result;