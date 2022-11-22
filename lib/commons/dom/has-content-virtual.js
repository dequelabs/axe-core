import isVisualContent from './is-visual-content';
import labelVirtual from '../aria/label-virtual';

const hiddenTextElms = [
  'head',
  'title',
  'template',
  'script',
  'style',
  'iframe',
  'object',
  'video',
  'audio',
  'noscript'
];

/**
 * Test if the element has child nodes that are non-empty text nodes
 * @param {VirtualNode} elm
 * @returns boolean
 */
export function hasChildTextNodes(elm) {
  if (hiddenTextElms.includes(elm.props.nodeName)) {
    return false;
  }
  return elm.children.some(({ props }) => {
    return props.nodeType === 3 && props.nodeValue.trim();
  });
}

/**
 * Check that the element has visible content in the form of either text,
 * an aria-label or visual content such as image
 * @method hasContentVirtual
 * @memberof axe.commons.dom
 * @instance
 * @param	{VirtualNode} elm Virtual Node to search
 * @param	{Boolean} noRecursion If true, only the element is checked, otherwise it will search all child nodes
 * @param {Boolean} ignoreAria if true, ignores `aria label` computation for content deduction
 * @return {Boolean}
 */
function hasContentVirtual(elm, noRecursion, ignoreAria) {
  return (
    // It has text
    hasChildTextNodes(elm) ||
    // It is a graphical element
    isVisualContent(elm.actualNode) ||
    // It has an ARIA label
    (!ignoreAria && !!labelVirtual(elm)) ||
    // or one of it's descendants does
    (!noRecursion &&
      elm.children.some(
        child => child.actualNode.nodeType === 1 && hasContentVirtual(child)
      ))
  );
}

export default hasContentVirtual;
