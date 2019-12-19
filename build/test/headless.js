/**
 * Note:
 * For this to be run via `npm run test:headless` ensure server is running
 */
const { execSync } = require('child_process');
const getTestUrls = require('./get-test-urls');

/**
 * Run headless tests
 */
getTestUrls()
	.then(urls => {
		for (const url of urls) {
			const command = `mocha-headless-chrome --file ${url}`;
			execSync(command, { stdio: 'inherit' });
		}
	})
	.then(() => console.log(`Complete: Headless tests.`))
	.catch(err => {
		console.error(err);
		process.exit(1);
	});
