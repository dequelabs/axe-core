//jshint latedef: false

var landmarkRoles = axe.commons.aria.getRolesByType('landmark'),
	firstLink = node.querySelector('a[href]');

// Create a list of nodeNames that have a landmark as an implicit role
const implicitLandmarks = landmarkRoles
	.reduce((arr, role) => arr.concat(axe.commons.aria.implicitNodes(role)), [])
	.filter(r => r !== null);

function isSkipLink(n) {
	return firstLink &&
		axe.commons.dom.getElementByReference(firstLink, 'href') &&
		firstLink === n;
}

function isLandmark(node) {
	if (node.hasAttribute('role')) {
		return landmarkRoles.includes(node.getAttribute('role').toLowerCase());
	} else {
		// Check if the node matches any of the CSS selectors of implicit landmarks
		return implicitLandmarks.some((implicitSelector) => {
			return axe.utils.matchesSelector(node, implicitSelector);
		});
	}
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
