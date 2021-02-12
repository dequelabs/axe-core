// grab everything between an opening and closing bracket
const tagStringRegex = /<([^>]+?)\/?>/g;

/* split a tag string by attributes:
   (\S+)=       group 1: valued attribute name; look for non-whitespace characters followed by the "="" sign
   ((["'])      start group 2: quoted attribute value; look for an opening quote (single or double)
   (.*?)        start group 4: non-quoted attribute value; non-greedy match everything (.*?) (the 3rd group is ignored and only used for the back reference \3)
   \3(?:\s|$)   end group 4: stop when we find a matching end quote and either a whitespace or the end of the string (allowing us to matching escaped quotes that match the opening quote)
   |[^\s]+))    end of group 2; if no quote then match everything that is not a whitespace
   |\b(\S+)\b   group 5: non-valued attribute name; look for any remaining non-matched strings and see if they are an attribute name without a value

   tested with string: type="text" value="my value again" othervalue=foo ha='bar' ha='\"foo\"' again="\'thing\'" data-thing="foo" thing=bar bar=baz checked thing=bar thing="\"foo\"" thing='\'hello\''
*/
const attributeRegex = /(\S+)=((["'])(.*?)\3(?:\s|$)|[^\s]+)|\b(\S+)\b/g;

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
        // use the non-quoted attribute value
        value: groups[4] || groups[2] || '',
        // remove the whitespace caused by matching the end quote + whitespace
        string: groups[0].trim()
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
