const directories = require('./directories');

/**
 * Get meta data for the file to be created as RULE Specification
 * @method getRuleSpecFileMeta
 * @param {String} ruleName given name for the RULE
 * @param {Boolean} ruleHasMatches does the RULE need a matches file
 * @param {Array} ruleChecks list of checks encompassing the RULE
 * @returns {Object} meta data of file
 */
const getRuleSpecFileMeta = (ruleName, ruleHasMatches, ruleChecks) => {
	return {
		name: `${ruleName}.json`,
		content: JSON.stringify(
			{
				id: `${ruleName}`,
				selector: '',
				...(ruleHasMatches && {
					matches: `${ruleName}-matches`
				}),
				tags: [],
				metadata: {
					description: '',
					help: ''
				},
				preload: false,
				all: ruleChecks
					.filter(c => c.getCheckType === 'all')
					.map(c => c.getCheckName.toLowerCase()),
				any: ruleChecks
					.filter(c => c.getCheckType === 'any')
					.map(c => c.getCheckName.toLowerCase()),
				none: ruleChecks
					.filter(c => c.getCheckType === 'none')
					.map(c => c.getCheckName.toLowerCase())
			},
			undefined,
			2
		),
		dir: directories.rules
	};
};

/**
 * Get meta data of files to be created as RULE matches
 * @method getRuleMatchesFileMeta
 * @param {String} ruleName given name for the RULE
 * @param {Boolean} ruleHasMatches does the rule need a matches file
 * @param {Boolean} ruleHasUnitTestAssets does the rule need unit test assets
 * @returns {Array<Object>} meta data of files
 */
const getRuleMatchesFileMeta = (
	ruleName,
	ruleHasMatches,
	ruleHasUnitTestAssets
) => {
	let files = [];

	if (ruleHasMatches) {
		const ruleMatchesJs = {
			name: `${ruleName}-matches.js`,
			content: `
			// todo: use the matches function to filter out nodes that are to be checked by the rule
			
			function getMatchingNodes(node) {
				return node
			}

			export default getMatchingNodes
			`,
			dir: directories.rules
		};
		files.push(ruleMatchesJs);
	}

	if (ruleHasUnitTestAssets) {
		const ruleMatchesTestJs = {
			name: `${ruleName}-matches.js`,
			content: `
			describe('${ruleName}-matches', function() {
				'use strict';

				// todo: Write tests

			})
			`,
			dir: directories.testRuleMatches
		};
		files.push(ruleMatchesTestJs);
	}

	return files;
};

/**
 * Get meta data for CHECK Spec
 * @method getCheckSpecFileMeta
 * @param {String} name given name for the CHECK
 * @param {String} dir path for the file to be created
 * @returns {Object} meta data of file
 */
const getCheckSpecFileMeta = (name, dir) => {
	return {
		name: `${name}.json`,
		content: JSON.stringify(
			{
				id: `${name}`,
				evaluate: `${name}`,
				metadata: {
					impact: '',
					messages: {
						pass: '',
						fail: '',
						incomplete: ''
					}
				}
			},
			undefined,
			2
		),
		dir
	};
};

/**
 * Get meta data for CHECK JS
 * @method getCheckJsFileMeta
 * @param {String} name given name for the CHECK
 * @param {String} dir path for the file to be created
 * @returns {Object} meta data of file
 */
const getCheckJsFileMeta = (name, dir) => {
	return {
		name: `${name}.js`,
		content: `
		// todo: evaluate fn logic for check

		function evaluate(node) {
			return true
		}

		export default evaluate;
		`,
		dir
	};
};

/**
 * Get meta data for CHECK test assets
 * @method getCheckTestJsFileMeta
 * @param {String} name given name for the CHECK
 * @param {String} dir path for the file to be created
 * @returns {Object} meta data of file
 */
const getCheckTestJsFileMeta = (name, dir) => {
	return {
		name: `${name}.js`,
		content: `
		describe('${name} tests', function() {
			'use strict';

			// todo: Write tests
			
		})
		`,
		dir
	};
};

/**
 * Get meta data for CHECK files
 * @method getChecksFileMeta
 * @param {Array} ruleChecks list of CHECK's for the RULE
 * @param {Boolean} ruleHasUnitTestAssets does the rule need unit test assets
 * @returns {Array<Object>} meta data of files
 */
const getChecksFileMeta = (ruleChecks, ruleHasUnitTestAssets) => {
	const checkFiles = ruleChecks
		.map(c => {
			const cName = c.getCheckName.toLowerCase();
			const outDir = `${directories.checks}/${c.getCheckCategory}`;
			const outTestDir = `${directories.testChecksUnit}/${c.getCheckCategory}`;
			const checkJson = getCheckSpecFileMeta(cName, outDir);
			const checkJs = getCheckJsFileMeta(cName, outDir);
			const checkTestJs = getCheckTestJsFileMeta(cName, outTestDir);
			let files = [checkJson, checkJs];
			if (ruleHasUnitTestAssets) {
				files = files.concat(checkTestJs);
			}
			return files;
		})
		.reduce((out, item) => {
			// flatten array of array's
			out = out.concat(item);
			return out;
		}, []);

	return checkFiles;
};

/**
 * Get meta data for integration file assets
 * @method getIntegrationTestAssets
 * @param {String} ruleName given name for the RULE
 * @param {*} ruleHasIntegrationTestAssets does the rule have integration test assets
 * @returns {Array<Object>} meta data of files
 */
const getIntegrationTestAssets = (ruleName, ruleHasIntegrationTestAssets) => {
	let files = [];

	if (ruleHasIntegrationTestAssets) {
		const htmlFile = {
			name: `${ruleName}.html`,
			content: `<!-- HTML Snippets-->`,
			dir: `${directories.testChecksIntegration}/${ruleName}`
		};
		files.push(htmlFile);

		const jsonFile = {
			name: `${ruleName}.json`,
			content: JSON.stringify(
				{
					description: `${ruleName} tests`,
					rule: `${ruleName}`,
					violations: [],
					passes: []
				},
				undefined,
				2
			),
			dir: `${directories.testChecksIntegration}/${ruleName}`
		};
		files.push(jsonFile);
	}
	return files;
};

/**
 * Get list of files to be created as metadata
 * @method getFilesMetaData
 * @param {Object} answers user entered answers for questions prompted by the generator
 * @returns {Array<Object>} meta data of files
 */
const getFilesMetaData = answers => {
	const {
		ruleName,
		ruleHasMatches,
		ruleChecks,
		ruleHasUnitTestAssets,
		ruleHasIntegrationTestAssets
	} = answers;

	// get rule spec file
	const ruleSpecFile = getRuleSpecFileMeta(
		ruleName,
		ruleHasMatches,
		ruleChecks
	);
	// get rule matches and test assets
	const ruleMatchesFiles = getRuleMatchesFileMeta(
		ruleName,
		ruleHasMatches,
		ruleHasUnitTestAssets
	);
	// get checks and test assets
	const checkFiles = getChecksFileMeta(ruleChecks, ruleHasUnitTestAssets);
	// integration test assets
	const integrationFiles = getIntegrationTestAssets(
		ruleName,
		ruleHasIntegrationTestAssets
	);

	return [
		ruleSpecFile,
		...ruleMatchesFiles,
		...checkFiles,
		...integrationFiles
	];
};

module.exports = getFilesMetaData;
