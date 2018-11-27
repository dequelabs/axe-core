/* global Promise */

const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const { dirname: getDirName } = require('path');
const makeDir = require('make-dir');

const importsFile = path.join(
	__dirname,
	'..',
	'lib',
	'core',
	'imports',
	'index.js'
);

// Mapping of external dependencies to be imported
// Global Namespace : Library name
const moduleMap = {
	axios: 'axios',
	doT: 'dot',
	CssSelectorParser: 'css-selector-parser'
};

async function run() {
	// generate `axe.imports` content
	const fileContent = `
	/**
	* Namespace for imports which holds globals of external module.
	* @namespace imports
	* @memberof axe
	*/
	axe.imports = {
		${Object.keys(moduleMap)
			.reduce((out, key) => {
				out.push(`'${key}': require('${moduleMap[key]}')`);
				return out;
			}, [])
			.join(', ')}
	};`;

	// write file content to `lib/core/imports/index.js`
	try {
		await createFile(importsFile, fileContent);
	} catch (error) {
		throw new Error(
			`Cannot create file axe.imports with require modules`,
			error
		);
	}

	// browserify `lib/core/imports/index.js`
	browserify(importsFile).bundle(async (err, result) => {
		if (err) {
			throw new Error('Cannot browserify axe.imports', err);
		}
		try {
			await createFile(importsFile, result);
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
