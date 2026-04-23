const possibleShadowRoots = [
  'article',
  'aside',
  'blockquote',
  'body',
  'div',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'main',
  'nav',
  'p',
  'section',
  'span'
];

// Reserved names that match the custom element regex but are not valid custom elements.
// https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
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

// Spec-compliant PCEN (Potential Custom Element Name) regex.
// Extends the ASCII-only regex to include Unicode characters permitted by the spec.
// https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
const customElementRegex =
  /^[a-z](?:[a-z0-9._-]|[\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD])*-(?:[a-z0-9._-]|[\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD])*$/;

/**
 * Test a node to see if it has a spec-conforming shadow root
 *
 * @param {Node}   node  The HTML DOM node
 * @return {Boolean}
 */
function isShadowRoot(node) {
  if (node.shadowRoot) {
    const nodeName = node.nodeName.toLowerCase();
    if (
      possibleShadowRoots.includes(nodeName) ||
      (!reservedNames.includes(nodeName) && customElementRegex.test(nodeName))
    ) {
      return true;
    }
  }
  return false;
}

export default isShadowRoot;
