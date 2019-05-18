const puppeteer = require('puppeteer');
const getTestPaths = require('./get-test-paths');

(async () => {
	console.time(`Headless tests duration`);

	const testPaths = await getTestPaths();

	if (!testPaths || !testPaths.length) {
		console.error(`No test paths are specified to run in headless mode.`);
	}

	/**
	 * Launch puppeteer
	 */
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--no-sandbox', '-–disable-setuid-sandbox'],
		ignoreHTTPSErrors: true,
		devtools: true
	});

	/**
	 * Iterate through each test path & execute tests
	 */
	for (const path of testPaths) {
		const result = await executeTest({ browser, path });
		console.log(result);
	}

	/**
	 * Exit
	 */
	process.exit();

	console.timeEnd(`Headless tests duration`);
})();

async function executeTest({ browser, path }) {
	return new Promise(async (resolve, reject) => {
		const page = await browser.newPage();
		await page.goto(path, { waitUntil: `load` });

		page.on('pageerror', err => reject(err));

		await page.close();
		resolve();
	});
}
