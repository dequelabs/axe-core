var ariaHeadingLevel = node.getAttribute('aria-level');

if (ariaHeadingLevel !== null) {
	this.data(ariaHeadingLevel);
	return true;
}

var headingLevel = node.tagName.match(/H(\d)/);

if (headingLevel) {
	this.data(headingLevel[1]);
	return true;
}

return true;
