// TODO:JEY - doc
// TODO:JEY - test
axe.utils.getOwnerDocumentCssRules = function (node, sheets) {
	const { rules } = sheets
		.find(({ owner }) => {
			return owner === node.ownerDocument;
		});
	return rules;
}

// TODO:JEY - doc
// TODO:JEY - test
axe.utils.getMediaQueryOrienationIfAny = function (rules) {
	const out = rules
		.filter(rule => {
			return !!rule.media && Array.from(rule.media)
				.some(mediaquery => {
					return (
						/orientation:\s+landscape/i.test(mediaquery) ||
						/orientation:\s+portrait/i.test(mediaquery)
					);
				});
		});
	return out;
}

// TODO:JEY - doc
// TODO:JEY - test
axe.utils.checkIfCSSRuleHasGivenStyleProperty = function (rules, styleProperty) {
	const out = rules
		.reduce((out, { cssRules, rules }) => {
			return out
				.concat(Array.from(cssRules || rules)
					.filter((rule) => {
						return (!!rule.style[styleProperty]);
					}));
		}, []);
	return out;
}
