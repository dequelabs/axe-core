/* global commons*/

var parentBlock = node;

// TODO: What about display flex / table-* stuff?
while (parentBlock.nodeType === 1 &&
window.getComputedStyle(parentBlock).display !== 'block') {
	parentBlock = parentBlock.parentNode;
}

var elementIsDistinct = commons.color.elementIsDistinct;

if (elementIsDistinct(node, parentBlock)) {
	// TODO: look at :visited
	return true;
}

// Look at focus & hover

return false;



/* Pseudo rule code (WIP)---

pseudoRules = Array.from(document.styleSheets)
.reduce(function (rules, newStyles) {
	if (!newStyles.disabled && newStyles.rules) {
		return rules.concat(Array.from(newStyles.rules));
	} else {
		return rules;
	}
}, [])
.filter(function (rule) {
	return (
		rule.selectorText.indexOf(':hover') !== -1 ||
		rule.selectorText.indexOf(':focus') !== -1
	);
});

#axe_pseudo_styles

#axe-pseudo-hover
#axe-pseudo-focus
#axe-pseudo-active
#axe-pseudo-visited
#axe-pseudo-before
#axe-pseudo-after


*/