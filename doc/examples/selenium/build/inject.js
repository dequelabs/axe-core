/**
 * Recursively find frames and inject a script into them
 * @private
 * @param  {Array}  parent Array of parent frames; or falsey if top level frame
 * @param  {String} script The script to inject
 * @param  {WebDriver} driver The driver to inject into
 */
function findFramesAndInject(parent, script, driver) {
	driver
		.findElements({tagName: 'iframe'})
		.then(function (results) {
			results.forEach(function (frame) {
				driver.switchTo().defaultContent();
				if (parent) {
					parent.forEach(function (p) {
						driver.switchTo().frame(p);
					});
				}
				driver.switchTo().frame(frame)
					.then(function () {
						driver
							.executeScript(script)
							.then(function () {
								findFramesAndInject((parent || []).concat(frame), script, driver);
							});
					});
			});
		});
}

/**
 * Recursively inject Kensington into all iframes and top level document, then execute a callback when complete
 * @param  {String}   filepath    The path to axe.min.js distribution file
 * @param  {WebDriver}   driver   Instance of WebDriver to inject into
 * @param  {Function} callback    Callback to execute when Kensington has been injected
 */
module.exports = function (ksSource, driver, callback) {

	var script = '(function () {' +
		'var s = document.createElement("script");' +
		's.innerHTML = ' + JSON.stringify(ksSource) + ';' +
		'document.body.appendChild(s);' +
		'}());';

	driver
		.switchTo().defaultContent();

	driver
		.executeScript(script)
		.then(function () {
			findFramesAndInject(null, script, driver);
		})
		.then(function () {
			driver.switchTo().defaultContent();
			callback();
		});
};
