const {
	text: {
		accessibleText,
		visible // get visible text
	}
} = axe.commons;

/**
 * Note:
 * `label-content-name-mismatch-matches` ignore `node`
 * if there is no `accessibleText` or `textContent`
 */
const accText = accessibleText(node).toLowerCase();
const visibleTextContent = visible(node).toLowerCase();

/**
 * if `textContent` is not part of `accessibleText` -> fail
 */

if (!accText.includes(visibleTextContent)) {
	return false;
}

// -> pass
return true;
