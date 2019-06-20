/**
 * Note:
 * `identical-links-same-purpose-after` fn, helps reconcile the results & alter the CheckResult accordingly
 */
const { text } = axe.commons;
const accessibleText = text.accessibleText(node).toLowerCase();
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
	if (!el.hasAttributes()) {
		return null;
	}
	if (el.hasAttribute('href')) {
		return el.getAttribute('href').toLowerCase();
	}

	const resourceAttr = Array.from(el.attributes).find(({ value }) =>
		/location/.test(value)
	);
	if (resourceAttr) {
		return resourceAttr.value.toLowerCase();
	}

	return null;
}
