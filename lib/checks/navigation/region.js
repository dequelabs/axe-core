//jshint latedef: false

var landmarkRoles = axe.commons.aria.getRolesByType('landmark'),
	firstLink = node.querySelector('a[href]');

function isSkipLink(n) {
	return firstLink &&
		axe.commons.dom.isFocusable(axe.commons.dom.getElementByReference(firstLink, 'href')) &&
		firstLink === n;
}

function isLandmark(n) {
	var role = n.getAttribute('role');
	return role && (landmarkRoles.indexOf(role) !== -1);
}

function checkRegion(n) {
	if (isLandmark(n)) { return null; }
	if (isSkipLink(n)) { return getViolatingChildren(n); }
	if (axe.commons.dom.isVisible(n, true) &&
		(axe.commons.text.visible(n, true, true) || axe.commons.dom.isVisualContent(n))) { return n; }
	return getViolatingChildren(n);
}
function getViolatingChildren(n) {
	var children =  axe.commons.utils.toArray(n.children);
	if (children.length === 0) { return []; }
	return children.map(checkRegion)
		.filter(function (c) { return c !== null; })
		.reduce(function (a, b) { return a.concat(b); }, []);
}

var v = getViolatingChildren(node);
this.relatedNodes(v);
return !v.length;
