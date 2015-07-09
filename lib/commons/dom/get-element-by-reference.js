/*global dom */

dom.getElementByReference = function (node, attr) {
	'use strict';

	var candidate,
		fragment = node.getAttribute(attr),
		doc = document;

	if (fragment && fragment.charAt(0) === '#') {
		fragment = fragment.substring(1);

		candidate = doc.getElementById(fragment);
		if (candidate) {
			return candidate;
		}

		candidate = doc.getElementsByName(fragment);
		if (candidate.length) {
			return candidate[0];
		}

	}

	return null;
};