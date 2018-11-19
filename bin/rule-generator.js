const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const axeFile = path.join(__dirname, '..', 'axe.js');
const globby = require('globby');
const execa = require('execa');
const mkdirp = require('mkdirp');

const directories = {
	RULES: path.join(__dirname, '..', 'lib', 'rules'),
	TEST_RULES_MATCHES: path.join(__dirname, '..', 'test', 'rule-matches'),
	CHECKS: path.join(__dirname, '..', 'lib', 'checks'),
	TEST_CHECKS_UNIT: path.join(__dirname, '..', 'test', 'checks'),
	TEST_CHECKS_INTEGRATION: path.join(
		__dirname,
		'..',
		'test',
		'integration',
		'rules'
	)
};

const showBanner = () => {
	console.log(chalk.hex('#0077c8')(figlet.textSync('Axe Rule Generator')));
};

const questions = {
	getRuleName: {
		/**
		 * What is the name of the RULE? (Eg: aria-valid):
		 * 	- check if there is conflict in rule (file name)
		 * 	- also if there is conflict in rule id itself
		 */
		name: 'getRuleName',
		type: 'input',
		message: 'What is the name of the RULE? (Eg: aria-valid):',
		validate: input => {
			const ruleName = input.toLowerCase();
			// 1) check if valid rule name
			if (
				!(
					ruleName &&
					ruleName.length > 0 &&
					ruleName.search(/^[a-zA-Z-]+$/) !== -1
				)
			) {
				throw new Error(
					'RULE name should not be empty and can only contain alphabets and dashes.'
				);
			}
			// 2) ensure no rule filename overlaps
			if (axeRulesFileNames.includes(ruleName)) {
				throw new Error('RULE name conflicts with an existing filename.');
			}
			// 3) ensure no rule id overlaps
			if (axeRulesIds.includes(ruleName)) {
				throw new Error('Rule ID already exists.');
			}
			return true;
		}
	},
	getIsRuleMatches: {
		/**
		 * Does the rule need a matches file to be created? (Yes/ No):
		 */
		name: 'getIsRuleMatches',
		type: 'confirm',
		message: 'Does the RULE need a MATCHES file to be created?:'
	},
	getIsCheck: {
		/**
		 *  Would you like to create a CHECK for the rule? (Yes/ No):
		 */
		name: 'getIsCheck',
		type: 'confirm',
		message: 'Would you like to create a CHECK for the RULE?:'
	},
	getIsAnotherCheck: {
		/**
		 *  Would you like to create a CHECK for the rule? (Yes/ No):
		 */
		name: 'getIsAnotherCheck',
		type: 'confirm',
		message: 'Would you like to create another CHECK for the RULE?:'
	},
	getCheckName: {
		/**
		 * Enter name of CHECK for the RULE?
		 * 	(Eg: aria-label)
		 * 	- check if there is conflict in rule (file name)
		 * 	- also if there is conflict in rule id itself
		 */
		name: 'getCheckName',
		type: 'input',
		message: 'Enter name of CHECK for the RULE? (Eg: aria-label): ',
		validate: input => {
			const checkName = input.toLowerCase();
			// 1) check if valid rule name
			if (
				!(
					checkName &&
					checkName.length > 0 &&
					checkName.search(/^[a-zA-Z-]+$/) !== -1
				)
			) {
				throw new Error(
					'CHECK name should not be empty and can contain alphabets and dashes.'
				);
			}
			// 2) ensure no rule filename overlaps
			if (axeChecksFileNames.includes(checkName)) {
				throw new Error('CHECK name conflicts with an existing filename.');
			}
			// 3) ensure no rule id overlaps
			if (axeChecksIds.includes(checkName)) {
				throw new Error('CHECK ID already exists.');
			}
			return true;
		}
	},
	getCheckCategory: {
		/**
		 * Choose category for the CHECK? :
		 * 	(Eg: aria, color, forms, label, language, media...)
		 */
		name: 'getCheckCategory',
		type: 'list',
		message: 'Choose category for the CHECK?: ',
		choices: [
			'aria',
			'color',
			'forms',
			'keyboard',
			'label',
			'language',
			'lists',
			'media',
			'mobile',
			'navigation',
			'parsing',
			'shared',
			'tables',
			'visibility'
		]
	},
	getCheckType: {
		/**
		 * Choose type of CHECK? :
		 * 	(Eg: all, any, none)
		 */
		name: 'getCheckType',
		type: 'list',
		message: 'Choose type for the CHECK?: ',
		choices: ['all', 'any', 'none']
	},
	getIsUnitTestAssets: {
		/**
		 * Create UNIT test files? (Yes/ No)
		 */
		name: 'getIsUnitTestAssets',
		type: 'confirm',
		message: 'Would you like to create UNIT test files?'
	},
	getIsIntegrationTestAssets: {
		/**
		 * Create INTEGRATION test files? (Yes/ No)
		 */
		name: 'getIsIntegrationTestAssets',
		type: 'confirm',
		message: 'Would you like to create INTEGRATION test files?'
	}
};

const questionAndGetFilesToCreate = async () => {
	const getChecks = async (checks = []) => {
		const checkDetails = await inquirer.prompt([
			questions.getCheckName,
			questions.getCheckCategory,
			questions.getCheckType,
			questions.getIsAnotherCheck
		]);
		checks.push(checkDetails);
		if (checkDetails.getIsAnotherCheck) {
			await getChecks(checks);
		}
		return checks;
	};

	// get rule meta
	const { getRuleName, getIsRuleMatches } = await inquirer.prompt([
		questions.getRuleName,
		questions.getIsRuleMatches
	]);
	// get checks meta
	let ruleChecks = [];
	const { getIsCheck } = await inquirer.prompt([questions.getIsCheck]);
	if (getIsCheck) {
		ruleChecks = await getChecks();
	}
	// get if test files should be created
	const {
		getIsUnitTestAssets,
		getIsIntegrationTestAssets
	} = await inquirer.prompt([
		questions.getIsUnitTestAssets,
		questions.getIsIntegrationTestAssets
	]);

	let filesToGenerate = [];

	const ruleName = `${getRuleName.toLowerCase()}`;

	const ruleJson = {
		name: `${ruleName}.json`,
		content: JSON.stringify(
			{
				id: `${ruleName}`,
				selector: '',
				...(getIsRuleMatches && {
					matches: `${ruleName}-matches.js`
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
		dir: directories.RULES
	};
	filesToGenerate = filesToGenerate.concat(ruleJson);

	if (getIsIntegrationTestAssets) {
		const files = [
			{
				name: `${ruleName}.html`,
				content: `<!-- HTML Snippets-->`,
				dir: `${directories.TEST_CHECKS_INTEGRATION}/${ruleName}`
			},
			{
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
				dir: `${directories.TEST_CHECKS_INTEGRATION}/${ruleName}`
			}
		];
		filesToGenerate = filesToGenerate.concat(files);
	}

	if (getIsRuleMatches) {
		const ruleMatchesJs = {
			name: `${ruleName}-matches.js`,
			content: `
			// TODO: Filter node(s)
			return node;
			`,
			dir: directories.RULES
		};
		filesToGenerate = filesToGenerate.concat(ruleMatchesJs);
		const ruleMatchesTestJs = {
			name: `${ruleName}-matches.js`,
			content: `
			describe('${ruleName}-matches', function() {
				'use strict';
				// TODO: Write tests
			})
			`,
			dir: directories.TEST_RULES_MATCHES
		};
		filesToGenerate = filesToGenerate.concat(ruleMatchesTestJs);
	}

	const checkFiles = ruleChecks
		.map(c => {
			const cName = c.getCheckName.toLowerCase();
			const outDir = `${directories.CHECKS}/${c.getCheckCategory}/`;
			const outTestDir = `${directories.CHECKS}/${c.getCheckCategory}/`;
			const checkJson = {
				name: `${cName}.json`,
				content: JSON.stringify(
					{
						id: `${cName}`,
						evaluate: `${cName}.js`,
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
				dir: outDir
			};
			const checkJs = {
				name: `${cName}.js`,
				content: `
				// TODO: Logic for check
				return true;
				`,
				dir: outDir
			};
			const checkTestJs = {
				name: `${cName}.js`,
				content: `
				describe('${cName} tests', function() {
					'use strict';
					// TODO: Write tests
				})
				`,
				dir: outTestDir
			};
			const files = [checkJson, checkJs];
			if (getIsUnitTestAssets) {
				files.concat(checkTestJs);
			}
			return files;
		})
		.reduce((out, item) => {
			out = out.concat(item);
			return out;
		}, []);
	filesToGenerate = filesToGenerate.concat(checkFiles);
	return filesToGenerate;
};

const getDirName = require('path').dirname;

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

// Variables computed within the `run` function used for `validation` of replies given for questions.
let axeRulesFileNames;
let axeRulesIds;
let axeChecksFileNames;
let axeChecksIds;

const run = async () => {
	// ensure axe exists, if not build axe, then start the generator
	const axeExists = fs.existsSync(axeFile);
	if (!axeExists) {
		console.log(
			chalk.red.bold(
				`Axe does not exist. Triggering build using - 'npm run build'.Rule Generator will continue after build.`
			)
		);
		await execa.shell('npm run build');
	}

	// the below computed values are used for `validation` of replies provided for answers
	// ==================
	// get all json spec files of rules
	const ruleJsonSpecFiles = await globby(directories.RULES, {
		expandDirectories: { extensions: ['json'] }
	});
	// `axeRulesFileNames` is used for `validation` of user input for `rule name` in the question `getRuleName`, to avoid conflicts with existing files.
	axeRulesFileNames = ruleJsonSpecFiles.map(
		f =>
			f
				.replace('.json', '')
				.split('/')
				.reverse()[0]
	);
	// `axeRulesIds` is used for `validation` of user input for `rule name` in the question `getRuleName`, to avoid conflicts with existing rule ids.
	axeRulesIds = ruleJsonSpecFiles.reduce((out, ruleJsonPath) => {
		const spec = require(ruleJsonPath);
		out.push(spec.id);
		return out;
	}, []);
	// get all json spec files of checks
	const checkJsonSpecFiles = await globby(directories.CHECKS, {
		expandDirectories: { extensions: ['json'] }
	});
	// `axeChecksFileNames` is used for `validation` of user input for `rule name` in the question `getCheckName`, to avoid conflicts with existing files.
	axeChecksFileNames = checkJsonSpecFiles.map(
		f =>
			f
				.replace('.json', '')
				.split('/')
				.reverse()[0]
	);
	const axe = require(axeFile);
	// `axeChecksIds` is used for `validation` of user input for `rule name` in the question `getCheckName`, to avoid conflicts with existing check ids.
	axeChecksIds = ruleJsonSpecFiles.reduce((out, ruleJsonPath) => {
		const spec = require(ruleJsonPath);
		const checkIds = []
			.concat(spec.any || [])
			.concat(spec.all || [])
			.concat(spec.none || []);
		return axe.utils.uniqueArray(out, checkIds);
	}, []);

	// rule-generator banner
	showBanner();

	// questions
	const files = await questionAndGetFilesToCreate();

	// // create the files
	if (!files || !files.length) {
		console.log(chalk.red.bold(`No files to generate.`));
	}

	try {
		const result = await Promise.all(files.map(createFile));
		console.log(
			chalk.green.bold('Successfully generated RULE and respective files: ')
		);
		console.log(chalk.green.bold(''));
		console.log(chalk.green.bold(result.join('\r\n')));
	} catch (err) {
		console.log(chalk.green.bold(`Error generating RULE files`, err));
	}
};

run();
