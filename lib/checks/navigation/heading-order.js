const ariaHeadingLevel = node.getAttribute('aria-level');

if (ariaHeadingLevel !== null) {
	this.data(parseInt(ariaHeadingLevel, 10));
	return true;
}

const headingLevel = node.tagName.match(/H(\d)/);

if (headingLevel) {
	this.data(parseInt(headingLevel[1], 10));
	return true;
}

return true;
