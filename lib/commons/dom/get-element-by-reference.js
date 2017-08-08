/*global dom */

dom.getElementByReference = function (node, attr) {
	let fragment = node.getAttribute(attr);

	if (fragment && fragment.charAt(0) === '#') {
		fragment = fragment.substring(1);

		let candidate = document.getElementById(fragment);
		if (candidate) {
			return candidate;
		}

		candidate = document.getElementsByName(fragment);
		if (candidate.length) {
			return candidate[0];
		}
	}
	return null;
};