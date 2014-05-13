/*global dom */
/**
 * Gets the width and height of the viewport; used to calculate the right and bottom boundaries of the viewable area.
 *
 * @api private
 * @param  {Object}  window The `window` object that should be measured
 * @return {Object}  Object with the `width` and `height` of the viewport
 */
dom.getViewportSize = function (window) {
	'use strict';

	var body,
		doc = window.document,
		docElement = doc.documentElement;

	if (window.innerWidth) {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		};
	}

	if (docElement) {
		return {
			width: docElement.clientWidth,
			height: docElement.clientHeight
		};

	}

	body = doc.body;

	return {
		width: body.clientWidth,
		height: body.clientHeight
	};
};