// reserved names that match the custom element regex but are not valid custom elements
// @see https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
const reservedNames = [
  'annotation-xml',
  'color-profile',
  'font-face',
  'font-face-src',
  'font-face-uri',
  'font-face-format',
  'font-face-name',
  'missing-glyph'
];

// valid localname regex
// @see https://dom.spec.whatwg.org/#valid-element-local-name
const validLocalNameRegex =
  /^(?:[A-Za-z][^\0\t\n\f\r\u0020/>]*|[:_\u0080-\u{10FFFF}][A-Za-z0-9-.:_\u0080-\u{10FFFF}]*)$/u;

/**
 * Verifies that a given node could be a custom-element (without testing the CustomElement registry there's no way to know for sure)
 * @method isValidCustomElementName
 * @memberof axe.utils
 * @param {string} nodeName nodeName to validate
 * @return {Boolean} true/ false
 */
export default function isValidCustomElementName(nodeName) {
  nodeName = nodeName.toLowerCase();

  // @see https://html.spec.whatwg.org/#valid-custom-element-name
  return (
    !reservedNames.includes(nodeName) &&
    validLocalNameRegex.test(nodeName) &&
    // browser will automatically lowercase node names
    // when they are in the DOM so we don't need to
    // test for lower or upper case letters
    nodeName.includes('-')
  );
}
