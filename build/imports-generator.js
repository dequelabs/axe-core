const path = require('path');
const browserify = require('browserify');
const derequire = require('derequire');
const createFile = require('./shared/create-file');

const filePath = ['core/imports/index.js', 'core/polyfills/index.js'];

filePath.forEach(filePath => {
	const inputFile = path.join(__dirname, '../lib', filePath);
	const outputFile = path.join(__dirname, '../tmp', filePath);

	async function run() {
		browserify(inputFile).bundle(async (err, result) => {
			if (err) {
				throw new Error(`Cannot browserify ${filePath}`, err);
			}
			try {
				// Replace `require` calls with `_dereq_` in order not to confuse Cypress.js
				result = derequire(result);
				await createFile(outputFile, result);
			} catch (error) {
				throw new Error(`Cannot write browserify generated ${filePath}`, error);
			}
		});
	}

	// exec
	run();
});
