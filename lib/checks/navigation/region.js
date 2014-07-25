//jshint latedef: false

var landmarkRoles = kslib.aria.getRolesByType('landmark'),
	firstLink = node.querySelector('a[href]');

function isSkipLink(n) {
	return firstLink &&
		kslib.dom.isFocusable(kslib.dom.getElementByReference(firstLink, 'href')) &&
		firstLink === n;
}

function isLandmark(n) {
	var role = n.getAttribute('role');
	return role && (landmarkRoles.indexOf(role) !== -1);
}

function checkRegion(n) {
	if (isLandmark(n)) { return null; }
	if (isSkipLink(n)) { return getViolatingChildren(n); }
	if (kslib.dom.isVisible(n, true) &&
		(kslib.text.visible(n, true, true) || kslib.dom.isVisualContent(n))) { return n; }
	return getViolatingChildren(n);
}
function getViolatingChildren(n) {
	var children =  kslib.utils.toArray(n.children);
	if (children.length === 0) { return []; }
	return children.map(checkRegion)
		.filter(function (c) { return c !== null; })
		.reduce(function (a, b) { return a.concat(b); }, []);
}

var v = getViolatingChildren(node);
this.relatedNodes(v);
return !v.length;
