const { utils, dom, text } = axe.commons;

this.data({
	name: node.getAttribute('name'),
	type: node.getAttribute('type')
});

const doc = dom.getRootNode(node);
const matchingNodes = Array.from(
	doc.querySelectorAll(
		'input[type="' +
			utils.escapeSelector(node.type) +
			'"][name="' +
			utils.escapeSelector(node.name) +
			'"]'
	)
);
if (matchingNodes.length <= 1) {
	return true;
}

// Check to see if there's an aria-labelledby value that all nodes have in common
const sharedIds = matchingNodes
	.map(m => {
		return utils.tokenList(m.getAttribute('aria-labelledby') || '');
	})
	.reduce((prev, curr) => {
		return prev.filter(n => curr.includes(n));
	})
	.filter(n => {
		const labelNode = doc.getElementById(n);
		if (!labelNode) {
			return false;
		}
		const accessibleText = text.accessibleText(labelNode, {
			// Prevent following further aria-labelledby refs:
			inLabelledByContext: true,
			// Allow hidden content if the elm is hidden
			includeHidden: !dom.isVisible(labelNode, true)
		});

		return !!text.sanitize(accessibleText);
	});

return sharedIds.length !== 0;
