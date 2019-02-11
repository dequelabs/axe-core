/*global helpers */

/**
 * Add information about the environment axe was run in.
 * @return {Object}
 */
helpers.getEnvironmentData = function getEnvironmentData() {
	'use strict';
	var orientation = window.screen
		? screen.msOrientation ||
		  (screen.orientation || screen.mozOrientation || {})
		: {};

	return {
		testEngine: {
			name: 'axe-core',
			version: axe.version
		},
		testRunner: {
			name: axe._audit.brand
		},
		testEnvironment: {
			userAgent: navigator.userAgent,
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
			orientationAngle: orientation.angle,
			orientationType: orientation.type
		},
		timestamp: new Date().toISOString(),
		url: window.location.href
	};
};
