// get lang and xml:lang values
const langValue = node.getAttribute('lang');
const xmlLangValue = node.getAttribute('xml:lang');

// compute array with lang/ xml:lang primary sub tag values
let langsToValidate = [];
if(langValue){
 	langsToValidate.push(langValue.trim().split('-')[0].toLowerCase());
}
if(xmlLangValue) {
	langsToValidate.push(xmlLangValue.trim().split('-')[0].toLowerCase());
}

// if lang subtag values were undefined, resulting in an empty array - return false
if(langsToValidate.length <= 0){
	return false
}

// unique the produced array, if identical primary subtag values were supplied, this would result in an array of length 1.
langsToValidate = axe.utils.uniqueArray(langsToValidate, []);

if(langsToValidate.length > 1) { // mismatch between lang & xml:lang values
	return false;
}

// only one item should exist in the array - ensure it is valid lang
const isValid = axe.utils.validLangs().includes(langsToValidate[0]);

return isValid;