const path = require('path');
const browserify = require('browserify');
const createFile = require('./shared/create-file');

const inputFile = path.join(
	__dirname,
	'..',
	'lib',
	'core',
	'imports',
	'index.js'
);
const outputFile = path.join(
	__dirname,
	'..',
	'tmp',
	'core',
	'imports',
	'index.js'
);

async function run() {
	browserify(inputFile).bundle(async (err, result) => {
		if (err) {
			throw new Error('Cannot browserify axe.imports', err);
		}
		try {
			await createFile(outputFile, result);
		} catch (error) {
			throw new Error('Cannot write browserify generated axe.imports', error);
		}
	});
}

// exec
run();
