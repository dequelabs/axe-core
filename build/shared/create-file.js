const fs = require('fs');
const { promisify } = require('util');
const { dirname: getDirName } = require('path');
const makeDir = require('make-dir');
const writeFile = promisify(fs.writeFile);

/**
 * Create file with given contents at specified location
 * @method createFile
 * @param {String} path file path, inclusive of file name
 * @param {String} content contents of the file
 * @returns {Promise}
 */
const createFile = (path, content) =>
	makeDir(getDirName(path)).then(() => writeFile(path, content));

module.exports = createFile;
