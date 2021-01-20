import isShadowRoot from './is-shadow-root';
import VirtualNode from '../base/virtual-node/virtual-node';
import cache from '../base/cache';

const isFunction = fn => typeof fn === 'function';

/**
 * This implemnts the flatten-tree algorithm specified:
 * Originally here https://drafts.csswg.org/css-scoping/#flat-tree
 * Hopefully soon published here: https://www.w3.org/TR/css-scoping-1/#flat-tree
 *
 * Some notable information:
 ******* NOTE: as of Chrome 59, this is broken in Chrome so that tests fail completely
 ******* removed functionality for now
 * 1. <slot> elements do not have boxes by default (i.e. they do not get rendered and
 *    their CSS properties are ignored)
 * 2. <slot> elements can be made to have a box by overriding the display property
 *    which is 'contents' by default
 * 3. Even boxed <slot> elements do not show up in the accessibility tree until
 *    they have a tabindex applied to them OR they have a role applied to them AND
 *    they have a box (this is observed behavior in Safari on OS X, I cannot find
 *    the spec for this)
 */

/**
 * Recursvely returns an array of the virtual DOM nodes at this level
 * excluding comment nodes and the shadow DOM nodes <content> and <slot>
 *
 * @param {Node} [node=document.documentElement] optional node. NOTE: passing in anything other than body or the documentElement may result in incomplete results.
 * @param {String} [shadowId] (DEPRECATED) optional ID of the shadow DOM that is the closest shadow
 *                           ancestor of the node
 * @return {VirtualNode[]} VirtualNode tree structure
 */
export default function getFlattenedTree(
  domRoot = document.documentElement,
  shadowId
) {
  cache.set('nodeMap', new WeakMap());
  if (domRoot.documentElement) {
    domRoot = domRoot.documentElement;
  }
  return flattenTree(domRoot, null, shadowId);
}

/**
 * Create a VirtualNode array from any DOM Node
 * @param {Node} domNode
 * @param {VirtualNode|null} virtualParent * @param {string|undefined} shadowId
 * @return {VirtualNode[]} VirtualNode tree structure
 */
function flattenTree(domNode, virtualParent, shadowId) {
  if (domNode.nodeType !== 1 && domNode.nodeType !== 3) {
    return [];
  }
  if (isShadowRoot(domNode)) {
    return flattenShadowRoot(domNode, virtualParent, shadowId);
  }
  if (isSlottedContent(domNode)) {
    return flattenSlottedContent(domNode, virtualParent, shadowId);
  }
  return flattenNode(domNode, virtualParent, shadowId);
}

/**
 * Create a VirtualNode array from an Element, including shadowTree roots. Do not use for slotted elements
 * @param {Node} domNode
 * @param {VirtualNode|null} virtualParent
 * @param {string|undefined} shadowId
 * @return {VirtualNode[]} VirtualNode tree structure
 */
function flattenNode(domNode, virtualParent, shadowId) {
  const virtualNode = new VirtualNode(domNode, virtualParent, shadowId);

  virtualNode.children = [];
  for (const childNode of domNode.childNodes) {
    const vChildren = flattenTree(childNode, virtualNode, shadowId);
    virtualNode.children.push(...vChildren);
  }
  return [virtualNode];
}

/**
 * Create a VirtualNode array from an Element, including shadowTree roots. Do not use for slotted elements
 * @param {Node} domNode
 * @param {VirtualNode|null} virtualParent
 * @param {string|undefined} shadowId
 * @return {VirtualNode[]} VirtualNode tree structure
 */
function flattenShadowRoot(domNode, virtualParent, shadowId) {
  const childShadowId = randString();
  const virtualNode = new VirtualNode(domNode, virtualParent, shadowId);

  virtualNode.children = [];
  for (const childNode of domNode.shadowRoot.childNodes) {
    const vChildren = flattenTree(childNode, virtualNode, childShadowId);
    virtualNode.children.push(...vChildren);
  }
  return [virtualNode];
}

/**
 * Check if the Node is a shadow tree slotted element; <slot> or, if supported <content>
 * @param {Node} domNode
 * @return {boolean}
 */
function isSlottedContent(domNode) {
  const nodeName = domNode.nodeName.toLowerCase();
  if (nodeName === 'slot' && isFunction(domNode.assignedNodes)) {
    return true;
  }
  if (nodeName === 'content' && isFunction(domNode.getDistributedNodes)) {
    return true;
  }
  return false;
}

/**
 * Create a VirtualNode array from an slotted element; <slot> or, if supported <content>
 * @param {Node} domNode
 * @param {VirtualNode|null} virtualParent
 * @param {string|undefined} shadowId
 * @return {VirtualNode[]} VirtualNode tree structure
 */
function flattenSlottedContent(domNode, virtualParent, shadowId) {
  const treeNodes = [];
  for (const childNode of getSlotChildren(domNode)) {
    const vChildren = flattenTree(childNode, virtualParent, shadowId);
    treeNodes.push(...vChildren);
  }
  return treeNodes;
}

/**
 * Get all slotted children of a <slot> or, if supported <content> element
 * @param {Node} domNode
 * @return {Node[]} DOM Node children
 */
function getSlotChildren(domNode) {
  if (isFunction(domNode.getDistributedNodes)) {
    return domNode.getDistributedNodes();
  }

  let children;
  if (isFunction(domNode.assignedNodes)) {
    children = domNode.assignedNodes();
  }
  if (!children || children.length === 0) {
    children = domNode.childNodes; // fallback
  }

  return children;
}

/**
 * @return {string}
 */
function randString() {
  return (
    'a' +
    Math.random()
      .toString()
      .substring(2)
  );
}
