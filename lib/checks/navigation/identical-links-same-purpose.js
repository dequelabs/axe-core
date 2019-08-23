/**
 * Note: `identical-links-same-purpose-after` fn, helps reconcile the results
 */
const { text } = axe.commons;

const name = getCuratedAccessibleName(virtualNode);
if (!name) {
	return undefined;
}

/**
 * Set `data` and `relatedNodes` for use in `after` fn
 */
const afterData = {
	name,
	resource: node.href
};
this.data(afterData);
this.relatedNodes([node]);

return true;

// todo:jey
function getCuratedAccessibleName(vNode) {
	const accText = text.accessibleTextVirtual(vNode);
	const accTextNoUnicode = text.removeUnicode(accText, {
		emoji: true,
		nonBmp: true,
		punctuations: true
	});
	return text.sanitize(accTextNoUnicode).toLowerCase();
}
