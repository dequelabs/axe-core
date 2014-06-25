var lang = (node.getAttribute('lang') || '').trim().toLowerCase();
var xmlLang = (node.getAttribute('xml:lang') || '').trim().toLowerCase();
var invalid = [];

(options || []).forEach(function (cc) {
	cc = cc.toLowerCase();
	if (lang && (lang === cc || lang.indexOf(cc.toLowerCase() + '-') === 0)) {
		lang = null;
	}
	if (xmlLang && (xmlLang === cc || xmlLang.indexOf(cc.toLowerCase() + '-') === 0)) {
		xmlLang = null;
	}
});

if (xmlLang) {
	invalid.push('xml:lang="' + xmlLang + '"');
}
if (lang) {
	invalid.push('lang="' + lang + '"');
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;