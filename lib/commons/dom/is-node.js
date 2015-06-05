/*global dom */
dom.isNode = function (candidate) {
	'use strict';
	var doc = (candidate && candidate.ownerDocument) || candidate,
		win = doc && doc.defaultView;

	return !!win && candidate instanceof win.Node;
};