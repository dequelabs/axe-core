const cssomSheets = options && (!Array.isArray(options)) && options.hasOwnProperty('preloadedAssets')
	? options.preloadedAssets.cssom
	: undefined;

if (!cssomSheets) {
	// TODO:JEY - ask @wilco - should we throw an error here or fail silently as assets are not available?
	return false;
}

const done = this.async();

// TODO:JEY This check should be made to work on page container elements too
// not just body / html, including containers that have its rotation
// set inside a shadow DOM tree. 

// get rules from owner document of node
const rules = axe.utils.getOwnerDocumentCssRules(node, cssomSheets);

if (!rules || (Array.isArray(rules) && rules.length <= 0)) {
	return false;
}

// find media queries with orientation keyword
const orientationRules = axe.utils.getMediaQueryOrienationIfAny(rules);

// Find any rule in the landscape media with a transform property
const transformRules = axe.utils.checkIfCSSRuleHasGivenStyleProperty(orientationRules, 'transform');

// Filter transforms that only have a 90% or 270% angle
const lockRules = transformRules
	.filter(rule => {
		const rotate = rule.style.transform.match(/rotate\(([^)]+)deg\)/);
		const deg = parseInt(rotate && rotate[1] || 0);
		return (deg % 90 === 0 && deg % 180 !== 0);
	});

// TODO:JEY This CSSOM filtering shouldn't happen for each element
// instead, it would be much better if this could run only once.

// Figure out how many of these orientation lock rules match the node
const matchingLockRules = lockRules
	.filter(({ selectorText }) => {
		return node.matches(selectorText);
	});

// TODO:JEY Sort by priority and take the highest, instead of checking if
// any of them applies
done(matchingLockRules.length !== 0);

// TODO:JEY - test
