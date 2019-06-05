/*global window*/

const chalk = require('chalk');
const puppeteer = require('puppeteer');
const getTestPaths = require('./get-test-paths');

(async () => {
	const testPaths = await getTestPaths();

	if (!testPaths || !testPaths.length) {
		console.error(`No test paths are specified to run in headless mode.`);
	}

	/**
	 * Launch puppeteer
	 */
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '-–disable-setuid-sandbox'],
		ignoreHTTPSErrors: true,
		devtools: true
	});

	let allFailedTests = [];
	let totalTests = 0;
	let totalDuration = 0;

	/**
	 * Iterate through each test path & execute tests
	 */
	for (const path of testPaths) {
		try {
			const pathResult = await executeTest({ browser, path });
			const { stats, failedTests = 0 } = pathResult;

			if (failedTests.length) {
				allFailedTests = allFailedTests.concat(failedTests);
			}

			totalTests += stats.tests;
			totalDuration += stats.duration;

			console.log(
				chalk.black.bgYellow('Stats: ') +
					'\n' +
					'Test Path: ' +
					path +
					'\n' +
					'Total Tests: ' +
					stats.tests +
					'\n' +
					'Total Duration: ' +
					stats.duration +
					' ms \n' +
					'Passed: ' +
					stats.passes +
					'\n' +
					'Failed: ' +
					stats.failures +
					'\n' +
					'Pending: ' +
					stats.pending +
					'\n'
			);
		} catch (error) {
			console.log(error);
		}
	}

	console.log(
		chalk.green(
			`Tests Execution Completed (Total: ${totalTests}, Duration: ${totalDuration} ms)\n`
		)
	);

	/**
	 *
	 * Enumerate and list all failed tests
	 */
	if (allFailedTests.length) {
		console.log(chalk.red(`Failed Tests (${allFailedTests.length}):\n`));

		allFailedTests.forEach((test, index) => {
			console.log(chalk.red(`${index + 1}. ${test.fullTitle}`));
			console.log(test.err);
		});
		// exit, as failure
		process.exit(1);
	}

	/**
	 * Exit, successfully
	 */
	process.exit();
})();

async function executeTest({ browser, path }) {
	return new Promise(async (resolve, reject) => {
		const page = await browser.newPage();

		page.on('pageerror', err => reject(err));
		page.on('console', msg => {
			if (!msg) {
				return;
			}
			if (!msg.args()) {
				return;
			}
			msg.args().forEach(async arg => {
				const output = await arg.jsonValue();
				const message = getConsoleMessage(output);
				console.log(message);
			});
		});

		await page.evaluateOnNewDocument(setGlobals);
		await page.goto(path, { waitUntil: `load` });
		await page.waitForFunction(() => window.__mochaResult__, {
			timeout: 300000
		});
		const response = await page.evaluate(() => window.__mochaResult__);
		await page.close();

		resolve(response);
	});
}

function getConsoleMessage(output) {
	if (!output || typeof output.includes === 'undefined') {
		return output;
	}
	if (output.includes('Suite: ')) {
		return output.replace('Suite:', chalk.black.bgMagenta.bold(' Suite '));
	}
	if (output.includes('Pass: ')) {
		return output.replace('Pass:', chalk.black.bgGreen(' Pass '));
	}
	if (output.includes('Fail: ')) {
		return output.replace('Fail:', chalk.black.bgRed(' Fail '));
	}
	if (output.includes('Pending: ')) {
		return output.replace('Pending:', chalk.black.bgCyan(' Pending '));
	}
	return output;
}

function setGlobals() {
	Object.defineProperty(window, 'isAxeHeadlessMode', {
		value: true,
		writable: false,
		configurable: false
	});
}
