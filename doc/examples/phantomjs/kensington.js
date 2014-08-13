/*global phantom */


var args = require('system').args;
var fs = require('fs');
var page = require('webpage').create();

if (args.length < 2) {
	console.log('kensington.js accepts 1 argument, the URL to test');
	phantom.exit(1);
}

page.open(args[1], function (status) {
	// Check for page load success
	if (status !== 'success') {
		console.log('Unable to access network');
		return;
	}

	page.injectJs('../../../kensington.js');
	page.framesName.forEach(function (name) {
		page.switchToFrame(name);
		page.injectJs('../../../kensington.js');
	});
	page.switchToMainFrame();
	page.evaluateAsync(function () {
		/*global window, dqre */
		dqre.a11yCheck(window.document, null, function (results) {
			window.callPhantom(results);
		});
	});

	page.onCallback = function (msg) {
		if (args[2]) {
			fs.write(args[2], JSON.stringify(msg, null, '  '), 'w');
		} else {
			console.log(JSON.stringify(msg, null, '  '));
		}

		phantom.exit();
	};
});
