// construct array of language sub values specified for either lang and xml:lang attributes
let langSubTagsToValidate = [];

// get value of lang attribute
const langValue = node.getAttribute('lang');
// if no lang is specified, can't compute mismatch - return false
if (!langValue) {
	return false;
}
langSubTagsToValidate.push(axe.utils.getBaseLang(langValue));

// get value of xml:lang attribute
const xmlLangValue = node.getAttribute('xml:lang');
// if no xml:lang is specified, can't compute mismatch - return false
if (!xmlLangValue) {
	return false;
}
langSubTagsToValidate.push(axe.utils.getBaseLang(langValue));

// unique the produced array, if identical primary subtag values were supplied, this would result in an array of length 1.
// eg: if lang='en-GB' and xml:lang='en-US', the below will produce langSubTagsToValidate = ['en']
langSubTagsToValidate = axe.utils.uniqueArray(langSubTagsToValidate, []);

// if the length of this array > 1 - the specified values for lang and xml:lang were different
// eg: lang='en-GB' and xml:lang='fr-FR' will yeild langSubTagsToValidate = ['en', 'fr']
if (langSubTagsToValidate.length > 1) {
	return false;
}

// ensure that the lang subtag value is valid
const isValid = axe.utils.validLangs().includes(langSubTagsToValidate[0]);

// return
return isValid;
