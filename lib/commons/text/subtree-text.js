import accessibleTextVirtual from './accessible-text-virtual';
import namedFromContents from '../aria/named-from-contents';
import getOwnedVirtual from '../aria/get-owned-virtual';
import getRole from '../aria/get-role';
import getElementsByContentType from '../standards/get-elements-by-content-type';
import getElementSpec from '../standards/get-element-spec';
import { controlValueRoles } from './form-control-value';

/**
 * Get the accessible text for an element that can get its name from content
 *
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {Bool} strict Should the name computation strictly follow AccName 1.1
 * @return {String} Accessible text
 */
function subtreeText(virtualNode, context = {}) {
  const { alreadyProcessed } = accessibleTextVirtual;
  context.startNode = context.startNode || virtualNode;
  const { strict, inControlContext, inLabelledByContext } = context;
  const role = getRole(virtualNode);
  const { contentTypes } = getElementSpec(virtualNode, {
    noMatchAccessibleName: true
  });
  if (
    alreadyProcessed(virtualNode, context) ||
    virtualNode.props.nodeType !== 1 ||
    contentTypes?.includes('embedded') || // canvas, video, etc
    controlValueRoles.includes(role)
  ) {
    return '';
  }

  if (
    !context.subtreeDescendant &&
    !context.inLabelledByContext &&
    !namedFromContents(virtualNode, { strict })
  ) {
    return '';
  }

  /**
   * Note: Strictly speaking if a child isn't named from content and it has no accessible name
   * accName says to ignore it. Browsers do this fairly consistently, but screen readers have
   * chosen to ignore this, but only for direct content, not for labels / aria-labelledby.
   * That way in `a[href] > article > #text` the text is used for the accessible name,
   * See: https://github.com/dequelabs/axe-core/issues/1461
   * See: https://github.com/w3c/accname/issues/120
   */
  if (!strict) {
    const subtreeDescendant = !inControlContext && !inLabelledByContext;
    context = { subtreeDescendant, ...context };
  }

  return getOwnedVirtual(virtualNode).reduce((contentText, child) => {
    return appendAccessibleText(contentText, child, context);
  }, '');
}

const phrasingElements = getElementsByContentType('phrasing').concat(['#text']);

function appendAccessibleText(contentText, virtualNode, context) {
  const nodeName = virtualNode.props.nodeName;
  let contentTextAdd = accessibleTextVirtual(virtualNode, context);
  if (!contentTextAdd) {
    return contentText;
  }

  if (!phrasingElements.includes(nodeName)) {
    // Append space, if necessary
    if (contentTextAdd[0] !== ' ') {
      contentTextAdd += ' ';
    }
    // Prepend space, if necessary
    if (contentText && contentText[contentText.length - 1] !== ' ') {
      contentTextAdd = ' ' + contentTextAdd;
    }
  }
  return contentText + contentTextAdd;
}

export default subtreeText;
