/*global helpers */
axe.addReporter('no-passes', function(results, options, callback) {
	'use strict';
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	// limit result processing to types we want to include in the output
	options.resultTypes = ['violations'];

	var out = helpers.processAggregate(results, options);
	var orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {});

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
		timestamp: out.timestamp,
		url: out.url
	});
});
