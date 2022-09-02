import { getRole, getRoleType } from '../commons/aria';
import { isFocusable, isInTextBlock } from '../commons/dom';
import svgNamespaceMatches from './svg-namespace-matches';

export default function widgetNotInline(node, vNode) {
  return matchesFns.every(fn => fn(node, vNode));
}

const matchesFns = [
  (node, vNode) => isWidgetType(vNode),
  (node, vNode) => isNotAreaElement(vNode),
  (node, vNode) => !svgNamespaceMatches(node, vNode),
  (node, vNode) => isFocusable(vNode),
  node => !isInTextBlock(node, { noLengthCompare: true })
];

function isWidgetType(vNode) {
  const role = getRole(vNode);
  // TODO: These needs tests
  if ('option' === role) {
    return false;
  } else if (['combobox', 'listbox'].includes(role)) {
    return true;
  }

  const roleType = getRoleType(role);
  return roleType === 'widget';
}

function isNotAreaElement(vNode) {
  return vNode.props.nodeName !== 'area';
}
