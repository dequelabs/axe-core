/**
 * Matches the below:
 * - `HTMLInputElement` with `type=image`
 * - any element with a semantic role of `img`
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
if (nodeName === `INPUT` && node.type === `image`) {
	return true;
}

const role = aria.getRole(node);
if (role !== `img`) {
	return false;
}

return true;
