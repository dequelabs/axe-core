function getAriaText(elm) {
	if (elm.getAttribute('aria-label')) {
		return elm
			.getAttribute('aria-label')
			.toLowerCase()
			.trim();
	}
	if (elm.getAttribute('aria-labelledby')) {
		return elm
			.getAttribute('aria-labelledby')
			.toLowerCase()
			.trim();
	}
	return null;
}

const accessibleText = getAriaText(node);
// if no accessible text - fail
if (!accessibleText || !accessibleText.length) {
	return false;
}

const contentText = node.textContent.toLowerCase().trim();
// if no text content - fail
if (!contentText || !contentText.length) {
	return false;
}

// if text content is not part of accessible text - fail
if (!accessibleText.includes(contentText)) {
	return false;
}

return true;
