const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const { dirname: getDirName } = require('path');
const makeDir = require('make-dir');

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

/**
 * Create file with contents at specified location
 * @method createFile
 * @param {String} path file path, inclusive of file name
 * @param {String} content contents of the file
 * @returns {Promise}
 */
function createFile(path, content) {
	return new Promise((resolve, reject) => {
		makeDir(getDirName(path))
			.then(() => {
				fs.writeFile(path, content, err => {
					if (err) {
						reject(err);
					}
					resolve(path);
				});
			})
			.catch(err => reject(err));
	});
}
