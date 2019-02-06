/*global helpers */

axe.addReporter(
	'v2',
	function(results, options, callback) {
		'use strict';
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}
		var out = helpers.processAggregate(results, options);
		var orientation =
			screen.msOrientation ||
			(screen.orientation || screen.mozOrientation || {});

		callback({
			toolOptions: options,
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
			violations: out.violations,
			passes: out.passes,
			incomplete: out.incomplete,
			inapplicable: out.inapplicable,
			timestamp: out.timestamp,
			url: out.url
		});
	},
	true
);
