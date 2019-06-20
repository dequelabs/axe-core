/**
 * Matches the below:
 * - `HTMLInputElement` with `type=image`
 * - Element with `role=img`
 * - is not `aria-hidden`
 * - has `accessible name`
 */

const { utils, commons } = axe;
const { aria, text } = commons;

const isHidden = utils.isHidden(node);
if (isHidden) {
	return false;
}

const accText = text.accessibleText(node);
if (!accText) {
	return false;
}

const srcValue = node.getAttribute('src');
if (!srcValue) {
	return false;
}

const nodeName = node.nodeName.toUpperCase();
const nodeType = node.getAttribute('type');
if (nodeName === `INPUT` && (nodeType && nodeType === `image`)) {
	return true;
}

const role = aria.getRole(node);
if (role !== `img`) {
	return false;
}

return true;
