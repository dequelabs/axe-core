/**
 * Note:
 * For this to be run via `npm run test:headless` ensure server is running
 */
const getTestUrls = require('./get-test-urls');
const { runner } = require('mocha-headless-chrome');

/**
 * Run headless tests
 */
(async function runTests() {
	const testUrls = await getTestUrls();
	for (const url of testUrls) {
		const options = {
			file: url
		};
		const { result } = await runner(options);

		/**
		 * Stop test execution on failure, for early feedback
		 */
		if (result.stats.failures > 0) {
			process.exit(1);
		}
	}
})();
