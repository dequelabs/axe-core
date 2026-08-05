import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { roles, aria as props } from 'aria-query';
import format from './shared/format.mjs';

/**
 * Regenerate `doc/aria-supported.md` using a freshly built `axe*.js` bundle.
 * @param {string} root Absolute repo root
 * @param {string[]} langSuffixes Same as build langs (`''` or `'.nl'`, …); uses first for `require`
 * @param {string} listType supported | unsupported | all
 */
export async function runAriaSupported(
  root,
  langSuffixes,
  listType = 'unsupported'
) {
  const require = createRequire(import.meta.url);
  const suffix = langSuffixes && langSuffixes.length ? langSuffixes[0] : '';
  const axePath = path.join(root, `axe${suffix}.js`);
  delete require.cache[require.resolve(axePath)];
  const axe = require(axePath);
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
  const { notes: rolesFootnotes } = getDiff(roles, ariaRoles, listType);

  const ariaQueryAriaAttributes = getAriaQueryAttributes(axe, roles, props);
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

  const destFile = path.join(root, 'doc/aria-supported.md');
  const formattedContent = await format(content, destFile);
  fs.writeFileSync(destFile, formattedContent, 'utf8');

  function getAriaQueryAttributes(axeApi, rolesMap, propsMap) {
    const ariaKeys = Array.from(propsMap).map(([key]) => key);
    const roleAriaKeys = Array.from(rolesMap).reduce((out, [, rule]) => {
      return [...out, ...Object.keys(rule.props)];
    }, []);
    return new Set(axeApi.utils.uniqueArray(roleAriaKeys, ariaKeys));
  }

  function getDiff(base, subject, type) {
    const diff = [];
    const notes = [];

    const sortedBase = Array.from(base.entries()).sort();

    sortedBase.forEach(([key]) => {
      switch (type) {
        case 'supported':
          if (
            Object.hasOwn(subject, key) &&
            subject[key].unsupported === false
          ) {
            diff.push([`${key}`, 'Yes']);
          }
          break;
        case 'unsupported':
          if (
            (subject[key] && subject[key].unsupported === true) ||
            !Object.hasOwn(subject, key)
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
            Object.hasOwn(subject, key) && subject[key].unsupported === false
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

  function getSupportedElementsAsFootnote(elements) {
    const notes = [];

    const supportedElements = elements.map(element => {
      if (typeof element === 'string') {
        return `\`<${element}>\``;
      }

      return Object.keys(element.properties).map(prop => {
        const value = element.properties[prop];

        if (typeof value === 'string') {
          return `\`<${element.nodeName} ${prop}="${value}">\``;
        }

        const values = value.map(v => `"${v}"`).join(' | ');
        return `\`<${element.nodeName} ${prop}=${values}>\``;
      });
    });

    notes.push('Supported on elements: ' + supportedElements.join(', '));

    return notes;
  }
}
