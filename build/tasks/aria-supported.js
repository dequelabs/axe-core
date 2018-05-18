/*eslint-env node */
'use strict';

const aQ = require('aria-query');

module.exports = function (grunt) {
	grunt.registerMultiTask(
		'aria-supported',
		'Task for generating a diff of supported aria-roles.',
		function () {
			const entry = this.data.entry;
			const destFile = this.data.destFile;
			const axe = require('../../axe');

			const getDiff = (base, subject) => {
				return [...[...new Map([...base.entries()].sort())]]
					.reduce((out, [key] = item) => {
						return `${out} | ${key} | ${subject.includes(key) ? 'Yes' : 'No'} |\n`
					}, ``);
			}

			const getMdContent = (roles, attributes) => {
				return `# ARIA Roles and Attributes supported by axe-core \n \n## Roles\n \n| aria-role | axe-core support | \n| :------- | :------- | \n${roles} \n## Attributes \n \n| aria-attribute | axe-core support| \n| :------- | :------- | \n${attributes}`;
			}

			const generateDoc = () => {
				const content = getMdContent(
					getDiff(aQ.roles, Object.keys(axe.commons.aria.lookupTable.role)),
					getDiff(aQ.aria, Object.keys(axe.commons.aria.lookupTable.attributes))
				);
				grunt.file.write(destFile, content)
			}

			generateDoc();
		}
	);
};
