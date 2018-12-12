/* global Promise */

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const directories = {
	axePath: path.join(__dirname, '..', '..', 'axe.js'),
	rules: path.join(__dirname, '..', '..', 'lib', 'rules'),
	checks: path.join(__dirname, '..', '..', 'lib', 'checks'),
	testRuleMatches: path.join(__dirname, '..', '..', 'test', 'rule-matches'),
	testChecksUnit: path.join(__dirname, '..', '..', 'test', 'checks'),
	testChecksIntegration: path.join(
		__dirname,
		'..',
		'..',
		'test',
		'integration',
		'rules'
	)
};

const getDirName = require('path').dirname;

/**
 * Utility method to create a file.
 * @method createFile
 * @param {Object} fileMeta meta data such as file name, contents and location to create the file
 * @returns {Promise}
 */
const createFile = fileMeta => {
	const filePath = `${fileMeta.dir}/${fileMeta.name}`;
	return new Promise((resolve, reject) => {
		mkdirp(getDirName(filePath), err => {
			if (err) {
				reject(err);
			}
			fs.writeFile(filePath, fileMeta.content, err => {
				if (err) {
					reject(err);
				}
				resolve(filePath);
			});
		});
	});
};

module.exports = {
	directories,
	createFile
};
