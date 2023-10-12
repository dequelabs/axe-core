const { promises: fs } = require('fs');
const { dirname } = require('path');

/**
 * Create file with given contents at specified location
 * @method createFile
 * @param {String} path file path, inclusive of file name
 * @param {String} content contents of the file
 * @returns {Promise}
 */
const createFile = (path, content) =>
  fs
    .mkdir(dirname(path), { recursive: true })
    .then(() => fs.writeFile(path, content));

module.exports = createFile;
