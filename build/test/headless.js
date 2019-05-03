const getTestFiles = require('./headless/get-test-files');
const runner = require('./headless/runner');

const init = async () => {
	console.time(`Headless tests duration`);

	process.setMaxListeners(Infinity);

	const urls = await getTestFiles();
	try {
		const { result } = await Promise.all(
			urls.map(async url => await runner({ url }))
		);
		const { stats } = result;

		// Print failures, if any
		if (stats.failures > 0) {
			console.log(`Failures: ${stats.failures}\n`);
			result.failures.forEach(test => {
				console.log(JSON.stringify(test, undefined, 2));
			});
		}
	} catch (error) {
		console.error(error);
	}

	console.timeEnd(`Headless tests duration`);
};

init();
