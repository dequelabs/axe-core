function filterHtmlAttrs(htmlString, denylist = {}) {
  const tagRegex = /<([^>]+?)>/g;

  return htmlString.replace(tagRegex, (value, tagStr) => {
    const [tagName, ...attributes] = tagStr.split(' ');
    const name = tagName.toLowerCase();

    if (!denylist[name]) {
      return value;
    }

    const filteredAttrs = attributes.filter(attr => {
      const attrName = attr.split('=')[0];
      return !denylist[name].includes(attrName);
    });

    return value.replace(attributes.join(' '), filteredAttrs.join(' '));
  });
}

export default filterHtmlAttrs;
