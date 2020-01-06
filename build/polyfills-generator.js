const path = require('path');
const browserify = require('browserify');
const derequire = require('derequire');
const createFile = require('./shared/create-file');

const inputFile = path.join(
	__dirname,
	'..',
	'lib',
	'core',
	'polyfills',
	'index.js'
);
const outputFile = path.join(
	__dirname,
	'..',
	'tmp',
	'core',
	'polyfills',
	'index.js'
);

async function run() {
	browserify(inputFile).bundle(async (err, result) => {
		if (err) {
			throw new Error('Cannot browserify polyfills', err);
		}
		try {
			// Replace `require` calls with `_dereq_` in order not to confuse Cypress.js
			result = derequire(result);
			await createFile(outputFile, result);
		} catch (error) {
			throw new Error('Cannot write browserify generated polyfills', error);
		}
	});
}

// exec
run();
