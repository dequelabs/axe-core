import { getRoleType } from '../commons/aria';
import { isFocusable, isInTabOrder, isInTextBlock } from '../commons/dom';
import svgNamespaceMatches from './svg-namespace-matches';
import { memoize } from '../core/utils';

export default function widgetNotInline(node, vNode) {
  return matchesFns.every(fn => fn(node, vNode));
}

const matchesFns = [
  (node, vNode) => isWidgetType(vNode),
  (node, vNode) => isNotAreaElement(vNode),
  (node, vNode) => !svgNamespaceMatches(node, vNode),
  (node, vNode) => isFocusable(vNode),
  // Skip nested widgets with tabindex=-1
  (node, vNode) => isInTabOrder(vNode) || !hasWidgetAncestorInTabOrder(vNode),
  node => !isInTextBlock(node, { noLengthCompare: true })
];

function isWidgetType(vNode) {
  return getRoleType(vNode) === 'widget';
}

function isNotAreaElement(vNode) {
  return vNode.props.nodeName !== 'area';
}

const hasWidgetAncestorInTabOrder = memoize(
  function hasWidgetAncestorInTabOrderMemoized(vNode) {
    if (!vNode?.parent) {
      return false;
    }
    if (isWidgetType(vNode.parent) && isInTabOrder(vNode.parent)) {
      return true;
    }
    return hasWidgetAncestorInTabOrderMemoized(vNode.parent);
  }
);
