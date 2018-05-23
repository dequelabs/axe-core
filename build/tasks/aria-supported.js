/*eslint-env node */
'use strict';

const { roles, aria: props } = require('aria-query');

module.exports = function (grunt) {
	grunt.registerMultiTask(
		'aria-supported',
		'Task for generating a diff of supported aria roles and properties.',
		function () {
			const entry = this.data.entry;
			const destFile = this.data.destFile;
			const listType = this.data.listType.toLowerCase();

			/**
			 * `axe` has to be dynamically required at this stage, as `axe` does not exist until grunt task `build:uglify` is complete, and hence cannot be required at the top of the file.
			 */
			const axe = require('../../axe');

			const ariaKeys = Array.from(props).map(([key]) => key)
			const roleAriaKeys = Array.from(roles)
				.reduce((out, [name, rule]) => {
					return [...out, ...Object.keys(rule.props)]
				}, []);
			const aQaria = new Set(axe.utils.uniqueArray(roleAriaKeys, ariaKeys));

			const getDiff = (base, subject) => {
				return Array.from(base.entries()).sort().reduce((out, [key] = item) => {
					switch (listType) {
						case 'supported':
							return subject.includes(key)
								? `${out} | ${key} | Yes |\n`
								: `${out}`
						case 'unsupported':
							return !subject.includes(key)
								? `${out} | ${key} | No |\n`
								: `${out}`
						case 'all':
						default:
							return `${out} | ${key} | ${subject.includes(key) ? 'Yes' : 'No'} |\n`;
					}
				}, ``);
			}

			const getMdContent = (roles, attributes) => {
				return `# ARIA Roles and Attributes ${listType === 'all' ? 'available' : listType} in axe-core \n \n## Roles\n \n| aria-role | axe-core support | \n| :------- | :------- | \n${roles} \n## Attributes \n \n| aria-attribute | axe-core support| \n| :------- | :------- | \n${attributes}`;
			}

			const generateDoc = () => {
				const content = getMdContent(
					getDiff(roles, Object.keys(axe.commons.aria.lookupTable.role)),
					getDiff(aQaria, Object.keys(axe.commons.aria.lookupTable.attributes))
				);
				grunt.file.write(destFile, content)
			}

			generateDoc();
		}
	);
};
