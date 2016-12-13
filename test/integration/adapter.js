/*global mocha, phantomjs, console */
var failedTests = [];
(function () {
	'use strict';
	if (navigator.userAgent.indexOf('PhantomJS') < 0) {
		var runner = mocha.run();
		runner.on('end', function() {
			window.mochaResults = runner.stats;
			window.mochaResults.reports = failedTests;
		});
		runner.on('fail', function logFailure(test, err) {
			var flattenTitles = function(test) {
				var titles = [];
				while (test.parent.title) {
					titles.push(test.parent.title);
					test = test.parent;
				}
				return titles.reverse();
			};
			failedTests.push({
				name: test.title,
				result: false,
				message: err.message,
				stack: err.stack,
				titles: flattenTitles(test)
			});
		});
	} else {
		phantomjs.on('error.*', function(error, stack) {
			var formattedStack = stack.map(function(frame) {
			return '    at ' + (frame.function ? frame.function : 'undefined') + ' (' + frame.file + ':' + frame.line + ')';
		}).join('\n');
			console.log(error + '\n' + formattedStack, 3);
		});
	}
}());
