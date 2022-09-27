import { getRoleType } from '../commons/aria';
import { isInTabOrder, isInTextBlock } from '../commons/dom';
import svgNamespaceMatches from './svg-namespace-matches';

export default function widgetNotInline(node, vNode) {
  return matchesFns.every(fn => fn(node, vNode));
}

const matchesFns = [
  (node, vNode) => isWidgetType(vNode),
  (node, vNode) => isNotAreaElement(vNode),
  (node, vNode) => !svgNamespaceMatches(node, vNode),
  (node, vNode) => isInTabOrder(vNode),
  node => !isInTextBlock(node, { noLengthCompare: true })
];

function isWidgetType(vNode) {
  return getRoleType(vNode) === 'widget';
}

function isNotAreaElement(vNode) {
  return vNode.props.nodeName !== 'area';
}
