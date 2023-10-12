const fs = require('fs');
const { glob } = require('glob');
const directories = require('./directories');

/**
 * Check validity of a given string to be non-empty alphabets or dashes.
 * @method isValidName
 * @param {String} input string value
 * @returns {Boolean}
 */
const isValidName = input => {
  return input && input.length > 0 && input.search(/^[a-zA-Z-]+$/) !== -1;
};

/**
 * Validate if a given string is valid RULE name
 * - Checks for alphabets, dashes and undefined
 * - Checks for overlap with existing RULE files and RULE Ids.
 * @method validateGetRuleName
 * @param {String} input string value
 * @returns {Boolean | Error}
 */
const validateGetRuleName = async input => {
  const ruleName = input.toLowerCase();
  // 1) check if valid name
  if (!isValidName(ruleName)) {
    throw new Error(
      'RULE name should not be empty and can only contain alphabets and dashes.'
    );
  }
  // 2) ensure no rule filename overlaps
  if (fs.existsSync(`${directories.rules}/${ruleName}.json`)) {
    throw new Error(`RULE name conflicts with an existing rule's filename.`);
  }
  // 3) ensure no rule id overlaps
  const ruleSpecs = await glob(`${directories.rules}/**/*.json`);
  const axeRulesIds = ruleSpecs.reduce((out, specPath) => {
    const spec = require(specPath);
    out.push(spec.id);
    return out;
  }, []);
  if (axeRulesIds.includes(ruleName)) {
    throw new Error('Rule ID already exists.');
  }
  return true;
};

/**
 * Validate if a given string is valid CHECK name
 * - Checks for alphabets, dashes and undefined
 * - Checks for overlap with existing CHECK files and CHECK Ids.
 * @method validateGetCheckName
 * @param {String} input string value
 * @returns {Boolean | Error}
 */
const validateGetCheckName = async input => {
  const checkName = input.toLowerCase();
  // 1) check if valid name
  if (!isValidName(checkName)) {
    throw new Error(
      'CHECK name should not be empty and can contain alphabets and dashes.'
    );
  }
  // 2) ensure no check filename overlaps
  const checkSpecs = await glob(`${directories.checks}/**/*.json`);
  // cannot use `fs.existsSync` here, as we do not know which category of checks to look under
  const axeChecksFileNames = checkSpecs.map(
    f => f.replace('.json', '').split('/').reverse()[0]
  );
  if (axeChecksFileNames.includes(checkName)) {
    throw new Error('CHECK name conflicts with an existing filename.');
  }
  // 3) ensure no check id overlaps
  const ruleSpecs = await glob(`${directories.rules}/**/*.json`);
  const axe = require(directories.axePath);
  const axeChecksIds = ruleSpecs.reduce((out, specPath) => {
    const spec = require(specPath);
    const checkIds = []
      .concat(spec.any || [])
      .concat(spec.all || [])
      .concat(spec.none || []);
    return axe.utils.uniqueArray(out, checkIds);
  }, []);
  if (axeChecksIds.includes(checkName)) {
    throw new Error('CHECK ID already exists.');
  }
  return true;
};

// list of questions to be prompted to the user
const questions = {
  getRuleName: {
    name: 'getRuleName',
    type: 'input',
    message: 'What is the name of the RULE? (Eg: aria-valid):',
    validate: validateGetRuleName
  },
  getIsRuleMatches: {
    name: 'getIsRuleMatches',
    type: 'confirm',
    message: 'Does the RULE need a MATCHES file to be created?:'
  },
  getIsCheck: {
    name: 'getIsCheck',
    type: 'confirm',
    message: 'Would you like to create a CHECK for the RULE?:'
  },
  getIsAnotherCheck: {
    name: 'getIsAnotherCheck',
    type: 'confirm',
    message: 'Would you like to create another CHECK for the RULE?:'
  },
  getCheckName: {
    name: 'getCheckName',
    type: 'input',
    message: 'Enter name of CHECK for the RULE? (Eg: aria-label):',
    validate: validateGetCheckName
  },
  getCheckCategory: {
    name: 'getCheckCategory',
    type: 'list',
    message: 'Choose category for the CHECK?:',
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
    name: 'getCheckType',
    type: 'list',
    message: 'Choose type for the CHECK?:',
    choices: ['all', 'any', 'none']
  },
  getIsUnitTestAssets: {
    name: 'getIsUnitTestAssets',
    type: 'confirm',
    message: 'Would you like to create UNIT test files?'
  },
  getIsIntegrationTestAssets: {
    name: 'getIsIntegrationTestAssets',
    type: 'confirm',
    message: 'Would you like to create INTEGRATION test files?'
  }
};

module.exports = questions;
