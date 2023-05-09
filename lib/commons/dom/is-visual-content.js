import { nodeLookup } from '../../core/utils';

const visualRoles = [
  'checkbox',
  'img',
  'meter',
  'progressbar',
  'scrollbar',
  'radio',
  'slider',
  'spinbutton',
  'textbox'
];

/**
 * Check if an element is an inherently visual element
 * @method isVisualContent
 * @memberof axe.commons.dom
 * @instance
 * @param  {Element|VirtualNode} element The element to check
 * @return {Boolean}
 */
function isVisualContent(el) {
  const { vNode } = nodeLookup(el);
  const role = axe.commons.aria.getExplicitRole(vNode);
  if (role) {
    return visualRoles.indexOf(role) !== -1;
  }

  switch (vNode.props.nodeName) {
    case 'img':
    case 'iframe':
    case 'object':
    case 'video':
    case 'audio':
    case 'canvas':
    case 'svg':
    case 'math':
    case 'button':
    case 'select':
    case 'textarea':
    case 'keygen':
    case 'progress':
    case 'meter':
      return true;
    case 'input':
      return vNode.props.type !== 'hidden';
    default:
      return false;
  }
}

export default isVisualContent;
