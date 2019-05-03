const getTestFiles = require('./headless/get-test-files');
const runner = require('./headless/runner');

const init = async () => {
	console.time(`Headless tests duration`);

	process.setMaxListeners(Infinity);

	const urls = await getTestFiles();
	const promises = urls.map(async url => {
		await runner({ url });
	});
	await Promise.all(promises);

	console.timeEnd(`Headless tests duration`);
};

init();
