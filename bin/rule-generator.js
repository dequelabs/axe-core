#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const cmd = require('node-command-line');
const axeFile = path.join(__dirname, '..', 'axe.js');
const filehound = require('filehound');

const DIRECTORIES = {
	RULES: path.join(__dirname, '..', '/lib/rules'),
	TEST_RULES_MATCHES: path.join(__dirname, '..', '/test/rule-matches'),
	CHECKS: path.join(__dirname, '..', '/lib/checks'),
	TEST_CHECKS_UNIT: path.join(__dirname, '..', '/test/checks'),
	TEST_CHECKS_INTEGRATION: path.join(__dirname, '..', '/test/integration/rules')
};

const showBanner = () => {
	const COLOR_DQ_HEX = '#0077c8';
	console.log(chalk.hex(COLOR_DQ_HEX)(figlet.textSync('Axe Rule Generator')));
};

const QUESTIONS = {
	GET_RULE_NAME: {
		/**
		 * What is the name of the RULE? (Eg: aria-valid):
		 * 	- check if there is conflict in rule (file name)
		 * 	- also if there is conflict in rule id itself
		 */
		name: 'GET_RULE_NAME',
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
					'RULE name should not be empty and can contain alphabets and dashes.'
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
	GET_IS_RULE_MATCHES: {
		/**
		 * Does the rule need a matches file to be created? (Yes/ No):
		 */
		name: 'GET_IS_RULE_MATCHES',
		type: 'confirm',
		message: 'Does the RULE need a MATCHES file to be created?:'
	},
	GET_IS_CHECK: {
		/**
		 *  Would you like to create a CHECK for the rule? (Yes/ No):
		 */
		name: 'GET_IS_CHECK',
		type: 'confirm',
		message: 'Would you like to create a CHECK for the RULE?:'
	},
	GET_IS_ANOTHER_CHECK: {
		/**
		 *  Would you like to create a CHECK for the rule? (Yes/ No):
		 */
		name: 'GET_IS_ANOTHER_CHECK',
		type: 'confirm',
		message: 'Would you like to create another CHECK for the RULE?:'
	},
	GET_CHECK_NAME: {
		/**
		 * Enter name of CHECK for the RULE?
		 * 	(Eg: aria-label)
		 * 	- check if there is conflict in rule (file name)
		 * 	- also if there is conflict in rule id itself
		 */
		name: 'GET_CHECK_NAME',
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
	GET_CHECK_CATEGORY: {
		/**
		 * Choose category for the CHECK? :
		 * 	(Eg: aria, color, forms, label, language, media...)
		 */
		name: 'GET_CHECK_CATEGORY',
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
	GET_CHECK_TYPE: {
		/**
		 * Choose type of CHECK? :
		 * 	(Eg: all, any, none)
		 */
		name: 'GET_CHECK_TYPE',
		type: 'list',
		message: 'Choose type for the CHECK?: ',
		choices: ['all', 'any', 'none']
	},
	GET_IS_UNIT_TEST_ASSETS: {
		/**
		 * Create UNIT test files? (Yes/ No)
		 */
		name: 'GET_IS_UNIT_TEST_ASSETS',
		type: 'confirm',
		message: 'Would you like to create UNIT test files?'
	},
	GET_IS_INTEGRATION_TEST_ASSETS: {
		/**
		 * Create INTEGRATION test files? (Yes/ No)
		 */
		name: 'GET_IS_INTEGRATION_TEST_ASSETS',
		type: 'confirm',
		message: 'Would you like to create INTEGRATION test files?'
	}
};

const questionAndGetFilesToCreate = async () => {
	const getCheck = async (checks = []) => {
		const checkDetails = await inquirer.prompt([
			QUESTIONS.GET_CHECK_NAME,
			QUESTIONS.GET_CHECK_CATEGORY,
			QUESTIONS.GET_CHECK_TYPE,
			QUESTIONS.GET_IS_ANOTHER_CHECK
		]);
		checks.push(checkDetails);
		if (checkDetails.GET_IS_ANOTHER_CHECK) {
			await getCheck(checks);
		}
		return checks;
	};

	// get rule meta
	const { GET_RULE_NAME, GET_IS_RULE_MATCHES } = await inquirer.prompt([
		QUESTIONS.GET_RULE_NAME,
		QUESTIONS.GET_IS_RULE_MATCHES
	]);
	// get checks meta
	let ruleChecks = [];
	const { GET_IS_CHECK } = await inquirer.prompt([QUESTIONS.GET_IS_CHECK]);
	if (GET_IS_CHECK) {
		ruleChecks = await getCheck();
	}
	// get if test files should be created
	const {
		GET_IS_UNIT_TEST_ASSETS,
		GET_IS_INTEGRATION_TEST_ASSETS
	} = await inquirer.prompt([
		QUESTIONS.GET_IS_UNIT_TEST_ASSETS,
		QUESTIONS.GET_IS_INTEGRATION_TEST_ASSETS
	]);

	let filesToGenerate = [];

	const ruleName = `${GET_RULE_NAME.toLowerCase()}`;

	const ruleJson = {
		name: `${ruleName}.json`,
		content: JSON.stringify(
			{
				id: `${ruleName}`,
				selector: '',
				...(GET_IS_RULE_MATCHES && {
					matches: `${ruleName}-matches.js`
				}),
				tags: [],
				metadata: {
					description: '',
					help: ''
				},
				preload: false,
				all: ruleChecks
					.filter(c => c.GET_CHECK_TYPE === 'all')
					.map(c => c.GET_CHECK_NAME.toLowerCase()),
				any: ruleChecks
					.filter(c => c.GET_CHECK_TYPE === 'any')
					.map(c => c.GET_CHECK_NAME.toLowerCase()),
				none: ruleChecks
					.filter(c => c.GET_CHECK_TYPE === 'none')
					.map(c => c.GET_CHECK_NAME.toLowerCase())
			},
			undefined,
			2
		),
		dir: DIRECTORIES.RULES
	};
	filesToGenerate = filesToGenerate.concat(ruleJson);

	if (GET_IS_INTEGRATION_TEST_ASSETS) {
		const files = [
			{
				name: `${ruleName}.html`,
				content: `<!-- HTML Snippets-->`,
				dir: DIRECTORIES.TEST_CHECKS_INTEGRATION
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
				dir: DIRECTORIES.TEST_CHECKS_INTEGRATION
			}
		];
		filesToGenerate = filesToGenerate.concat(files);
	}

	if (GET_IS_RULE_MATCHES) {
		const ruleMatchesJs = {
			name: `${ruleName}-matches.js`,
			content: `
			// TODO: Filter node(s)
			return node;
			`,
			dir: DIRECTORIES.RULES
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
			dir: DIRECTORIES.TEST_RULES_MATCHES
		};
		filesToGenerate = filesToGenerate.concat(ruleMatchesTestJs);
	}

	const checkFiles = ruleChecks
		.map(c => {
			const cName = c.GET_CHECK_NAME.toLowerCase();
			const outDir = `${DIRECTORIES.CHECKS}/${c.GET_CHECK_CATEGORY}/`;
			const outTestDir = `${DIRECTORIES.CHECKS}/${c.GET_CHECK_CATEGORY}/`;
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
			if (GET_IS_UNIT_TEST_ASSETS) {
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

const createFile = fileMeta => {
	const filePath = `${fileMeta.dir}/${fileMeta.name}`;
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, fileMeta.content, err => {
			if (err) {
				reject(err);
			}
			resolve(filePath);
		});
	});
};

let axeRulesFileNames;
let axeRulesIds;
let axeChecksFileNames;
let axeChecksIds;

const run = async () => {
	// ensure axe exists, if not build axe, then start the generator
	const axeExists = fs.existsSync(axeFile);
	if (!axeExists) {
		console.log(
			chalk.black.bgRed.bold(
				`Axe does not exist.Triggering build using - 'npm run build'.Rule Generator will continue after build.`
			)
		);
		await cmd.run('npm run build');
	}

	// compute essentials
	// 1. Get rule SPEC json file names
	const ruleJsonSpecFiles = await filehound
		.create()
		.paths(DIRECTORIES.RULES)
		.depth(0)
		.ext('json')
		.find();
	axeRulesFileNames = ruleJsonSpecFiles.map(
		f =>
			f
				.replace('.json', '')
				.split('/')
				.reverse()[0]
	);
	// 2. Get rule ID's
	axeRulesIds = ruleJsonSpecFiles.reduce((out, ruleJsonPath) => {
		const spec = require(ruleJsonPath);
		out.push(spec.id);
		return out;
	}, []);
	// 3. Get check SPEC json file names
	const checkJsonSpecFiles = await filehound
		.create()
		.paths(DIRECTORIES.CHECKS)
		.depth(1)
		.ext('json')
		.find();
	axeChecksFileNames = checkJsonSpecFiles.map(
		f =>
			f
				.replace('.json', '')
				.split('/')
				.reverse()[0]
	);
	// 4. Get all check ID's
	const axe = require(axeFile);
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

	// create the files
	if (!files || !files.length) {
		console.log(chalk.white.bgRed.bold(`No files to generate.`));
	}

	try {
		const result = await Promise.all(files.map(createFile));
		console.log(
			chalk.black.bgGreen.bold(
				'Successfully generated RULE and respective files: '
			)
		);
		console.log(chalk.black.bgGreen.bold(''));
		console.log(chalk.black.bgGreen.bold(result.join('\r\n')));
	} catch (err) {
		console.log(chalk.black.bgRed.bold(`Error generating RULE files`, err));
	}
};

run();
