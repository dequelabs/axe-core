/* global Promise */

const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const importsFile = path.join(
	__dirname,
	'..',
	'lib',
	'core',
	'imports',
	'index.js'
);

async function run() {
	// get an object map of modules to be imported as key value pairs based on args
	const moduleMap = parseArgsAsRequireMap(process.argv.slice(2));
	if (!moduleMap) {
		throw new Error('Ensure supplied arguments are correct.');
	}

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
 * Convert arguments to object map of require statement
 * @param {Array<String>} args key value pair of arguments
 * @returns {Object} Eg: { axios: require('axios'), doT: require('dot') }
 */
function parseArgsAsRequireMap(args) {
	const argMap = {};

	if (args.length % 2) {
		throw new Error('Invalid number of arguments');
	}

	for (let i = 0; i < args.length; i += 2) {
		let key = args[i];

		key = key.replace(/^--/, '').replace(/-([a-z])/g, g => g[1].toUpperCase());

		argMap[key] = args[i + 1];
	}
	return argMap;
}

/**
 * Create file with contents at specified location
 * @method createFile
 * @param {String} path file path, inclusive of file name
 * @param {String} content contents of the file
 * @returns {Promise}
 */
function createFile(path, content) {
	return new Promise((resolve, reject) => {
		mkdirp(getDirName(path), err => {
			if (err) {
				reject(err);
			}
			fs.writeFile(path, content, err => {
				if (err) {
					reject(err);
				}
				resolve(path);
			});
		});
	});
}
