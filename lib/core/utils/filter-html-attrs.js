// grab everything between an opening and closing bracket
const tagStringRegex = /<([^>]+?)\/?>/g;

/*
  match attributes. html does not allow escaping quotes inside attributes so we don't have to worry about that (e.g. aria-label="\"label\"").
  @see https://regexr.com/5mbqb
*/
const attributeRegex = new RegExp(
  `(?:([^\\s=]+)=` + // group 1: valued attribute name; look for non-whitespace, non-equal sign characters followed by the "=" sign
  `(?:"([^"]*)"` + // group 2: double quoted attribute value; look for everything surrounded by double quotes
  `|'([^']*)'` + // group 3: single quoted attribute value; look for everything surrounded by single quotes
  `|([^'"\\s]*)))` + // group 4: non-quoted attribute value; look for any non-whitespace and quote characters
    `|\\b(\\S+)(?:\\B|\\b)`, // group 5: non-valued attribute name; look for any remaining non-matched strings surrounded by word boundaries
  'g'
);

const attrMap = {
  for: 'htmlFor',
  class: 'className'
};

/**
 * Match an attribute to a matcher object.
 * @param {String} nodeName - Name of the current node
 * @param {Object[]} attributes - Array of node attributes and values
 * @param {String} value - Value of the current attribute
 * @param {any} matcher - How to match the value
 */
function matches(nodeName, attributes, value, matcher) {
  switch (typeof matcher) {
    case 'boolean':
      return true;
    case 'string':
      return matcher === value;
    case 'object':
      if (Array.isArray(matcher)) {
        return matcher.includes(value);
      }

      // matcher-like object, match all parts
      let filter = true;

      // match each property
      if (matcher.nodeName) {
        filter = filter && matcher.nodeName === nodeName;
      }

      if (matcher.attributes) {
        Object.keys(matcher.attributes).forEach(attrName => {
          const attr = attributes.find(attr => attr.name === attrName);
          if (!attr) {
            return false;
          }

          filter =
            filter &&
            matches(
              nodeName,
              attributes,
              attr.value,
              matcher.attributes[attrName]
            );
        });
      }

      return filter;
  }
}

/**
 * Filter attributes from an html string. This is not to prevent XSS attacks but instead is used to remove attributes which shouldn't appear in the output. As such, we can assume mostly normal attribute output and not attributes purposefully trying to break a parser
 *
 * Example:
 * ```js
 * // Remove attribute if present regardless of value
 * axe.utils.filterHtmlAttrs('<div data-attr="foo">my div</div>', { 'data-attr': true });
 *
 * // Remove attribute if value matches
 * axe.utils.filterHtmlAttrs('<div data-attr="foo">my div</div>', { 'data-attr': 'foo' });
 *
 * // Remove attribute if value matches list of values
 * axe.utils.filterHtmlAttrs('<div data-attr="foo">my div</div>', { 'data-attr': ['foo', 'bar'] });
 *
 * // Remove attribute if tag matches matcher-like object
 * axe.utils.filterHtmlAttrs('<div class="foo"><input type="text" class="foo"/></div>', { class: { nodeName: input } });
 * ```
 *
 * @method getRootNode
 * @memberof axe.utils
 * @param {String} htmlString - HTML string to remove attributes from.
 * @param {Object} filterAttrs - Attributes to remove and the qualifier of when to remove them.
 * @returns {String}
 */
function filterHtmlAttrs(htmlString, filterAttrs) {
  if (!filterAttrs) {
    return htmlString;
  }

  return htmlString.replace(tagStringRegex, (match, tagStr) => {
    // no need to filter end tags
    if (tagStr.charAt(0) === '/') {
      return match;
    }

    const nodeName = tagStr.substring(0, tagStr.indexOf(' ')).toLowerCase();
    const attributeStr = tagStr.substring(tagStr.indexOf(' ') + 1).trim();

    let groups;
    const attributes = [];
    while ((groups = attributeRegex.exec(attributeStr))) {
      attributes.push({
        // can be either a valued and non-valued attribute
        name: (groups[1] || groups[5]).toLowerCase(),
        // double, single, or non-quoted value
        value: groups[2] || groups[3] || groups[4] || '',
        string: groups[0]
      });
    }

    const filteredAttrs = attributes.filter(attribute => {
      const { name, value } = attribute;
      const matcher = filterAttrs[attrMap[name] ? attrMap[name] : name];

      if (!matcher) {
        return true;
      }

      return !matches(nodeName, attributes, value, matcher);
    });

    return match.replace(
      attributeStr,
      filteredAttrs.map(attr => attr.string).join(' ')
    );
  });
}

export default filterHtmlAttrs;
