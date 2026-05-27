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
const alphaLowerRegex = /[a-z]/;
const alphaUpperRegex = /[A-Z]/;

/**
 * Verifies that the passed in string is a valid custom element name
 * @method isValidCustomElementName
 * @memberof axe.utils
 * @param {string} nodeName nodeName to validate
 * @return {Boolean} true / false
 */
export default function isValidCustomElementName(nodeName) {
  // @see https://html.spec.whatwg.org/#valid-custom-element-name
  return (
    !reservedNames.includes(nodeName) &&
    validLocalNameRegex.test(nodeName) &&
    alphaLowerRegex.test(nodeName[0]) &&
    !alphaUpperRegex.test(nodeName) &&
    nodeName.includes('-')
  );
}
