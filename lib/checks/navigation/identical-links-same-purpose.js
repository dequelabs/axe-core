/**
 * Note:
 * `identical-links-same-purpose-after` fn, helps reconcile the results & alter the CheckResult accordingly
 */
const { text } = axe.commons;

const accName = text.accessibleTextVirtual(virtualNode, {
	includeHidden: true
});
const accNameNoUnicode = text.removeUnicode(accName, {
	emoji: true,
	nonBmp: true,
	punctuations: true
});
const accNameSanitized = text.sanitize(accNameNoUnicode).toLowerCase();

if (!accNameSanitized) {
	return undefined;
}

/**
 * Set `data` for use in `after` fn
 */
const afterData = {
	name: accNameSanitized,
	resource: node.href
};
this.data(afterData);

return true;
