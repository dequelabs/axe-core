/**
 * SRI Update will update the sri-history.json file
 * In the project root. The sri-history.json file contains
 * SRI hashes of each released version. This can be used
 * to validate that something is a known axe-core source
 * file.
 *
 * When running `npm run release`, this script will execute and
 * update sri-history.json with the SRIs of axe{.*}.js.
 */
var path = require('path');
var fs = require('fs');
var sriToolbox = require("sri-toolbox");

// Check if we should be validating or updating 
var validate = process.argv.some(function (arg) {
	return arg === '--validate';
});
 
var root = path.join(__dirname, '..')
var axeVersion = require('../package.json').version;
var axeHistory = require('../sri-history.json');

if (typeof axeHistory[axeVersion] !== 'object') {
	axeHistory[axeVersion] = {}
}
var versionSRIs = axeHistory[axeVersion];

// List all axe files (including minified and localized axe files)
var axeFiles = fs.readdirSync(root).filter(function (file) {
	return file.match(/^axe(\.[a-z.-]+)?\.js$/);
});

axeFiles.forEach(function (axeFile) {
	var axeSource = fs.readFileSync(path.join(root, axeFile), 'utf-8');
	var axeIntegrity = sriToolbox.generate({ algorithms: ["sha256"] }, axeSource);

	if (!validate) {
		// Update SRI
		versionSRIs[axeFile] = axeIntegrity;

	// Test if the SRI shouldn't be changed
	} else if (versionSRIs[axeFile] && versionSRIs[axeFile] !== axeIntegrity) {
		console.log(axeFile, 'did not match the SRI in sri-history.json')
		process.exitCode = 1;
	}
});

if (!validate) {
	fs.writeFileSync(path.join(root, './sri-history.json'),
		JSON.stringify(axeHistory, null, '\t'), 'utf-8');
	console.log("Updated sri-history.json ")

} else if (process.exitCode === 1) {
	console.log('\nMake sure the package version and sri-history.json is updated ' +
		'before publishing to NPM.\n');
}
