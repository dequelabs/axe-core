/*eslint-env node */
'use strict';

const { roles, aria: props } = require('aria-query');
const mdTable = require('markdown-table');

module.exports = function(grunt) {
	grunt.registerMultiTask(
		'aria-supported',
		'Task for generating a diff of supported aria roles and properties.',
		function() {
			const entry = this.data.entry;
			const destFile = this.data.destFile;
			const listType = this.data.listType.toLowerCase();

			/**
			 * `axe` has to be dynamically required at this stage, as `axe` does not exist until grunt task `build:uglify` is complete, and hence cannot be required at the top of the file.
			 */
			const axe = require('../../axe');

			/**
			 * As `aria-query` roles map, does not list all aria attributes in its props,
			 * the below reduce function aims to concatanate and unique the below two,
			 * - list from props with in roles map
			 * - list from aria map
			 *
			 * @return {Map} `aQaria` - This gives a composite list of aria attributes, which is later used to diff against axe-core supported attributes.
			 */
			const ariaKeys = Array.from(props).map(([key]) => key);
			const roleAriaKeys = Array.from(roles).reduce((out, [name, rule]) => {
				return [...out, ...Object.keys(rule.props)];
			}, []);
			const aQaria = new Set(axe.utils.uniqueArray(roleAriaKeys, ariaKeys));

			/**
			 * Given a `base` Map and `subject` Map object,
			 * The function converts the `base` Map entries to an array which is sorted then enumerated to compare each entry against the `subject` Map
			 * The function constructs a `string` to represent a `markdown table` to
			 * @param {Map} base Base Map Object
			 * @param {Map} subject Subject Map Object
			 * @return {Array[]} Example Output: [ [ 'alert', 'No' ], [ 'figure', 'Yes' ] ]
			 */
			const getDiff = (base, subject) => {
				return Array.from(base.entries())
					.sort()
					.reduce((out, [key] = item) => {
						switch (listType) {
							case 'supported':
								if (
									subject.hasOwnProperty(key) &&
									subject[key].unsupported === false
								) {
									out.push([`${key}`, 'Yes']);
								}
								break;
							case 'unsupported':
								if (
									(subject[key] && subject[key].unsupported === true) ||
									!subject.hasOwnProperty(key)
								) {
									out.push([`${key}`, 'No']);
								}
								break;
							case 'all':
							default:
								out.push([
									`${key}`,
									subject.hasOwnProperty(key) &&
									subject[key].unsupported === false
										? 'Yes'
										: 'No'
								]);
								break;
						}
						return out;
					}, []);
			};

			const getMdContent = (heading, rolesTable, attributesTable) => {
				return `${heading}\n\n## Roles\n\n${rolesTable}\n\n## Attributes\n\n${attributesTable}`;
			};

			const generateDoc = () => {
				const content = getMdContent(
					`# ARIA Roles and Attributes ${
						listType === 'all' ? 'available' : listType
					} in axe-core.`,
					mdTable([
						['aria-role', 'axe-core support'],
						...getDiff(roles, axe.commons.aria.lookupTable.role)
					]),
					mdTable([
						['aria-attribute', 'axe-core support'],
						...getDiff(aQaria, axe.commons.aria.lookupTable.attributes)
					])
				);
				grunt.file.write(destFile, content);
			};

			generateDoc();
		}
	);
};
