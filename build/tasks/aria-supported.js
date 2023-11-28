/*eslint-env node */
'use strict';

const { roles, aria: props } = require('aria-query');
const format = require('../shared/format');

module.exports = function (grunt) {
  grunt.registerMultiTask(
    'aria-supported',
    'Task for generating a diff of supported aria roles and properties.',
    function () {
      /**
       * NOTE:
       * `axe` has to be dynamically required at this stage,
       * as `axe` does not exist until grunt task `build:uglify` is complete,
       * hence cannot be required at the top of the file.
       */
      const done = this.async();
      const { langs } = this.options();
      const fileNameSuffix = langs && langs.length > 0 ? `${langs[0]}` : '';
      const axe = require(`../../axe${fileNameSuffix}`);
      const listType = this.data.listType.toLowerCase();
      const headings = {
        main:
          `# ARIA Roles and Attributes ${
            listType === 'all' ? 'available' : listType
          } in axe-core.\n\n` +
          'It can be difficult to know which features of web technologies are accessible across ' +
          'different platforms, and with different screen readers and other assistive technologies. ' +
          'Axe-core does some of this work for you, by raising issues when accessibility features are ' +
          'used that are known to cause problems.\n\n' +
          'This page contains a list of ARIA 1.1 features that axe-core raises as unsupported. ' +
          'For more information, read [We’ve got your back with “Accessibility Supported” in axe]' +
          '(https://www.deque.com/blog/weve-got-your-back-with-accessibility-supported-in-axe/).\n\n' +
          'For a detailed description about how accessibility support is decided, see [How we make ' +
          'decisions on rules](accessibility-supported.md).',
        attributesMdTableHeader: ['aria-attribute', 'axe-core support']
      };

      const { ariaRoles, ariaAttrs } = axe.utils.getStandards();
      const { diff: rolesTable, notes: rolesFootnotes } = getDiff(
        roles,
        ariaRoles,
        listType
      );

      const ariaQueryAriaAttributes = getAriaQueryAttributes();
      const { diff: attributesTable, notes: attributesFootnotes } = getDiff(
        ariaQueryAriaAttributes,
        ariaAttrs,
        listType
      );
      const formatMarkdownTableRow = columnValues =>
        `| ${columnValues.join(' | ')} |`;
      const attributesTableWithHeader = [
        headings.attributesMdTableHeader,
        ['---', '---'],
        ...attributesTable
      ];
      const attributesTableMarkdown = attributesTableWithHeader
        .map(formatMarkdownTableRow)
        .join('\n');

      const footnotes = [...rolesFootnotes, ...attributesFootnotes].map(
        (footnote, index) => `[^${index + 1}]: ${footnote}`
      );

      const content = `${headings.main}\n\n## Attributes\n\n${attributesTableMarkdown}\n\n${footnotes}`;

      const destFile = this.data.destFile;
      // Format the content so Prettier doesn't create a diff after running.
      // See https://github.com/dequelabs/axe-core/issues/1310.
      format(content, destFile)
        .then(formattedContent => {
          // write `aria supported` file contents
          grunt.file.write(destFile, formattedContent);
          done();
        })
        .catch(err => {
          console.error(err.message);
          done(false);
        });

      /**
       * Get list of aria attributes, from `aria-query`
       * @returns {Set|Object} collection of aria attributes from `aria-query` module
       */
      function getAriaQueryAttributes() {
        const ariaKeys = Array.from(props).map(([key]) => key);
        const roleAriaKeys = Array.from(roles).reduce((out, [name, rule]) => {
          return [...out, ...Object.keys(rule.props)];
        }, []);
        return new Set(axe.utils.uniqueArray(roleAriaKeys, ariaKeys));
      }

      /**
       * Given a `base` Map and `subject` Map object,
       * The function converts the `base` Map entries to an array which is sorted then enumerated to compare each entry against the `subject` Map
       * The function constructs a `string` to represent a `markdown table`, as well as returns notes to append to footnote
       * @param {Map} base Base Map Object
       * @param {Map} subject Subject Map Object
       * @param {String} type type to compare
       * @returns {Array<Object>[]}
       * @example Example Output: [ [ 'alert', 'No' ], [ 'figure', 'Yes' ] ]
       */
      function getDiff(base, subject, type) {
        const diff = [];
        const notes = [];

        const sortedBase = Array.from(base.entries()).sort();

        sortedBase.forEach(([key] = item) => {
          switch (type) {
            case 'supported':
              if (
                subject.hasOwnProperty(key) &&
                subject[key].unsupported === false
              ) {
                diff.push([`${key}`, 'Yes']);
              }
              break;
            case 'unsupported':
              if (
                (subject[key] && subject[key].unsupported === true) ||
                !subject.hasOwnProperty(key)
              ) {
                diff.push([`${key}`, 'No']);
              } else if (
                subject[key] &&
                subject[key].unsupported &&
                subject[key].unsupported.exceptions
              ) {
                diff.push([`${key}`, `Mixed[^${notes.length + 1}]`]);
                notes.push(
                  getSupportedElementsAsFootnote(
                    subject[key].unsupported.exceptions
                  )
                );
              }
              break;
            case 'all':
            default:
              diff.push([
                `${key}`,
                subject.hasOwnProperty(key) &&
                subject[key].unsupported === false
                  ? 'Yes'
                  : 'No'
              ]);
              break;
          }
        });

        return {
          diff,
          notes
        };
      }

      /**
       * Parse a list of unsupported exception elements and add a footnote
       * detailing which HTML elements are supported.
       *
       * @param {Array<String|Object>} elements List of supported elements
       * @returns {Array<String|Object>} notes
       */
      function getSupportedElementsAsFootnote(elements) {
        const notes = [];

        const supportedElements = elements.map(element => {
          if (typeof element === 'string') {
            return `\`<${element}>\``;
          }

          /**
					 * if element is not a string it will be an object with structure:
							{
								nodeName: string,
								properties: {
									type: {string|string[]}
								}
							}
					*/
          return Object.keys(element.properties).map(prop => {
            const value = element.properties[prop];

            // the 'type' property can be a string or an array
            if (typeof value === 'string') {
              return `\`<${element.nodeName} ${prop}="${value}">\``;
            }

            // output format for an array of types:
            // <input type="button" | "checkbox">
            const values = value.map(v => `"${v}"`).join(' | ');
            return `\`<${element.nodeName} ${prop}=${values}>\``;
          });
        });

        notes.push('Supported on elements: ' + supportedElements.join(', '));

        return notes;
      }
    }
  );
};
