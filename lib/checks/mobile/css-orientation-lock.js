/* global context */

// extract asset of type `cssom` from context
const { cssom = undefined } = context || {};

// if there is no cssom <- return incomplete
if (!cssom || !cssom.length) {
	return undefined;
}

// combine all rules from each sheet into one array
const rulesGroupByDocumentFragment = cssom.reduce(
	(out, { sheet, root, shadowId }) => {
		// construct key based on shadowId or top level document
		const key = shadowId ? shadowId : 'topDocument';
		// init property if does not exist
		if (!out[key]) {
			out[key] = {
				root,
				rules: []
			};
		}
		// check if sheet and rules exist
		if (!sheet || !sheet.cssRules) {
			//return
			return out;
		}
		const rules = Array.from(sheet.cssRules);
		// add rules into same document fragment
		out[key].rules = out[key].rules.concat(rules);

		//return
		return out;
	},
	{}
);

// Note:
// Some of these functions can be extracted to utils, but best to do it when other cssom rules are authored.

// extract styles for each orientation rule to verify transform is applied
let isLocked = false;
let relatedElements = [];

Object.keys(rulesGroupByDocumentFragment).forEach(key => {
	const { root, rules } = rulesGroupByDocumentFragment[key];

	// filter media rules from all rules
	const mediaRules = rules.filter(r => {
		// doc: https://developer.mozilla.org/en-US/docs/Web/API/CSSMediaRule
		// type value of 4 (CSSRule.MEDIA_RULE) pertains to media rules
		return r.type === 4;
	});
	if (!mediaRules || !mediaRules.length) {
		return;
	}

	// narrow down to media rules with `orientation` as a keyword
	const orientationRules = mediaRules.filter(r => {
		// conditionText exists on media rules, which contains only the @media condition
		// eg: screen and (max-width: 767px) and (min-width: 320px) and (orientation: landscape)
		const cssText = r.cssText;
		return (
			/orientation:\s*landscape/i.test(cssText) ||
			/orientation:\s*portrait/i.test(cssText)
		);
	});
	if (!orientationRules || !orientationRules.length) {
		return;
	}

	orientationRules.forEach(r => {
		// r.cssRules is a RULEList and not an array
		if (!r.cssRules.length) {
			return;
		}
		// cssRules ia a list of rules
		// a media query has framents of css styles applied to various selectors
		// iteration through cssRules and see if orientation lock has been applied
		Array.from(r.cssRules).forEach(cssRule => {
			// ensure selectorText exists
			if (!cssRule.selectorText) {
				return;
			}
			// ensure the given selector has styles declared (non empty selector)
			if (cssRule.style.length <= 0) {
				return;
			}

			// check if transform style exists (don't forget vendor prefixes)
			const transformStyleValue =
				cssRule.style.transform ||
				cssRule.style.webkitTransform ||
				cssRule.style.msTransform ||
				false;
			// transformStyleValue -> is the value applied to property
			// eg: "rotate(-90deg)"
			if (!transformStyleValue) {
				return;
			}

			const rotate = transformStyleValue.match(/rotate\(([^)]+)deg\)/);
			const deg = parseInt((rotate && rotate[1]) || 0);
			const locked = deg % 90 === 0 && deg % 180 !== 0;

			// if locked
			// and not root HTML
			// preserve as relatedNodes
			if (locked && cssRule.selectorText.toUpperCase() !== 'HTML') {
				const selector = cssRule.selectorText;
				const elms = Array.from(root.querySelectorAll(selector));
				if (elms && elms.length) {
					relatedElements = relatedElements.concat(elms);
				}
			}

			// set locked boolean
			isLocked = locked;
		});
	});
});

if (!isLocked) {
	// return
	return true;
}

// set relatedNodes
if (relatedElements.length) {
	this.relatedNodes(relatedElements);
}

// return fail
return false;
