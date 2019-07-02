/**
 * Note:
 * `identical-links-same-purpose-after` fn, helps reconcile the results & alter the CheckResult accordingly
 */
const { text } = axe.commons;
const accessibleText = text.accessibleTextVirtual(virtualNode);
const linkResource = getLinkResource(node);

if (!linkResource) {
	return undefined;
}

/**
 * Set `data` for use in `after` fn
 */
this.data({
	accessibleText,
	linkResource
});

return true;

/**
 * Get resource that a element points to (eg: href or location redirects)
 * @param {HTMLElement} el Element
 * @returns {String|null}
 */
function getLinkResource(el) {
	if (el.hasAttribute('href')) {
		return el.getAttribute('href');
	}

	const resourceAttr = Array.from(axe.utils.getNodeAttributes(node)).find(
		({ value }) => {
			/**
			 * get any attribute which has `location.` or `location=` in its value
			 */
			const attrValue = value.replace(/\s/g, '');
			return /^location[\.\=]/.test(attrValue);
		}
	);

	if (resourceAttr) {
		return resourceAttr.value;
	}

	return null;
}
