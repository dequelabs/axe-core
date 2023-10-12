import axe from '../../axe';

// constructors
const vNode = new axe.VirtualNode(document.body);
const vNodeWithParent = new axe.VirtualNode(
  document.body,
  document.documentElement
);
const vNodeWithNullParent = new axe.VirtualNode(document.body, null);
const vNodeWithShadowId = new axe.VirtualNode(
  document.body,
  document.documentElement,
  'a12309a09123'
);

// functions
vNode.attr('foo');
vNode.hasAttr('foo');
vNode.getComputedStylePropertyValue('color');

// properties
const {
  nodeType,
  nodeName,
  id,
  type,
  multiple,
  nodeValue,
  value,
  selected,
  checked,
  indeterminate
} = vNode.props;
const {
  attrNames,
  nodeIndex,
  actualNode,
  shadowId,
  isFocusable,
  tabbableElements,
  clientRects,
  boundingClientRect,
  getComputedStylePropertyValue
} = vNode;
