import isShadowRoot from './is-shadow-root';
import VirtualNode from '../base/virtual-node/virtual-node';
import cache from '../base/cache';

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
  if (domNode.nodeType === 1) {
    return [new VirtualNode(domNode, null, virtualParent)];
  }
  if (isSlottedContent(domNode)) {
    return flattenSlottedContent(domNode, virtualParent, shadowId);
  }
  if (domNode.nodeType === 3) {
    return flattenElement(domNode, virtualParent, shadowId);
  }
  return [];
}

/**
 * Create a VirtualNode array from an Element, including shadowTree roots. Do not use for slotted elements
 * @param {Node} domNode
 * @param {VirtualNode|null} virtualParent
 * @param {string|undefined} shadowId
 * @return {VirtualNode[]} VirtualNode tree structure
 */
function flattenElement(domNode, virtualParent, shadowId) {
  const virtualNode = new VirtualNode(domNode, virtualParent, shadowId);

  // Create a new ID for shadow trees
  const childShadowId = isShadowRoot(domNode) ? randString() : shadowId;
  virtualNode.children = [];
  for (const childNode of domNode.childNodes) {
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
  if (nodeName === 'slot') {
    return true;
  }
  // <content> is deprecated, but still supported in some browsers
  if (
    nodeName === 'content' &&
    typeof domNode.getDistributedNodes === 'function'
  ) {
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
  if (typeof domNode.assignedNodes === 'function') {
    return Array.from(domNode.assignedNodes());
  }
  if (typeof domNode.getDistributedNodes === 'function') {
    return Array.from(domNode.getDistributedNodes());
  }

  const children = [];
  if (domNode.nodeName.toLowerCase() === 'slot') {
    // Fallback for assignedNodes()
    let child = domNode.firstChild;
    while (child) {
      children.push(child);
      child = child.nextSibling;
    }
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
