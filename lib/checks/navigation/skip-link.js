var linkTarget = kslib.dom.getElementByReference(node, 'href');
if (!linkTarget) { return false; }

linkTarget.focus();
if (linkTarget === document.activeElement) {
	return true;
}
return false;
