import isShadowRoot from './is-shadow-root';
import VirtualNode from '../base/virtual-node/virtual-node';
import cache from '../base/cache';
import { cacheNodeSelectors } from './selector-cache';

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

let hasShadowRoot;

/**
 * Recursvely returns an array of the virtual DOM nodes at this level
 * excluding comment nodes and the shadow DOM nodes <content> and <slot>
 *
 * @param {Node} [node=document.documentElement] optional node. NOTE: passing in anything other than body or the documentElement may result in incomplete results.
 * @param {String} [shadowId] optional ID of the shadow DOM that is the closest shadow
 *                           ancestor of the node
 */
export default function getFlattenedTree(
  node = document.documentElement,
  shadowId
) {
  hasShadowRoot = false;
  const selectorMap = {};
  cache.set('nodeMap', new WeakMap());
  cache.set('selectorMap', selectorMap);

  // specifically pass `null` to the parent to designate the top
  // node of the tree. if parent === undefined then we know
  // we are in a disconnected tree
  const tree = flattenTree(node, shadowId, null);
  tree[0]._selectorMap = selectorMap;

  // allow rules and checks to know if there is a shadow root attached
  // to the current tree
  tree[0]._hasShadowRoot = hasShadowRoot;

  return tree;
}

/**
 * find all the fallback content for a <slot> and return these as an array
 * this array will also include any #text nodes
 *
 * @param node {Node} - the slot Node
 * @return Array{Nodes}
 */
function getSlotChildren(node) {
  var retVal = [];

  node = node.firstChild;
  while (node) {
    retVal.push(node);
    node = node.nextSibling;
  }
  return retVal;
}

/**
 * Create a virtual node
 * @param {Node} node the current node
 * @param {VirtualNode} parent the parent VirtualNode
 * @param {String} shadowId, optional ID of the shadow DOM that is the closest shadow ancestor of the node
 * @return {VirtualNode}
 */
function createNode(node, parent, shadowId) {
  const vNode = new VirtualNode(node, parent, shadowId);
  cacheNodeSelectors(vNode, cache.get('selectorMap'));

  return vNode;
}

/**
 * Recursvely returns an array of the virtual DOM nodes at this level
 * excluding comment nodes and the shadow DOM nodes <content> and <slot>
 *
 * @param {Node} node the current node
 * @param {String} shadowId, optional ID of the shadow DOM that is the closest shadow
 *                           ancestor of the node
 * @param {VirtualNode} parent the parent VirtualNode
 */
function flattenTree(node, shadowId, parent) {
  // using a closure here and therefore cannot easily refactor toreduce the statements
  var retVal, realArray, nodeName;
  function reduceShadowDOM(res, child, parentVNode) {
    const replacements = flattenTree(child, shadowId, parentVNode);
    if (replacements) {
      res = res.concat(replacements);
    }
    return res;
  }

  if (node.documentElement) {
    // document
    node = node.documentElement;
  }
  nodeName = node.nodeName.toLowerCase();

  if (isShadowRoot(node)) {
    hasShadowRoot = true;

    // generate an ID for this shadow root and overwrite the current
    // closure shadowId with this value so that it cascades down the tree
    retVal = createNode(node, parent, shadowId);
    shadowId = 'a' + Math.random().toString().substring(2);
    realArray = Array.from(node.shadowRoot.childNodes);
    retVal.children = realArray.reduce((res, child) => {
      return reduceShadowDOM(res, child, retVal);
    }, []);

    return [retVal];
  } else {
    if (
      nodeName === 'content' &&
      typeof node.getDistributedNodes === 'function'
    ) {
      realArray = Array.from(node.getDistributedNodes());
      return realArray.reduce((res, child) => {
        return reduceShadowDOM(res, child, parent);
      }, []);
    } else if (
      nodeName === 'slot' &&
      typeof node.assignedNodes === 'function'
    ) {
      realArray = Array.from(node.assignedNodes());
      if (!realArray.length) {
        // fallback content
        realArray = getSlotChildren(node);
      }
      var styl = window.getComputedStyle(node);
      // check the display property
      if (false && styl.display !== 'contents') {
        // intentionally commented out
        // has a box
        retVal = createNode(node, parent, shadowId);
        retVal.children = realArray.reduce((res, child) => {
          return reduceShadowDOM(res, child, retVal);
        }, []);

        return [retVal];
      } else {
        return realArray.reduce((res, child) => {
          return reduceShadowDOM(res, child, parent);
        }, []);
      }
    } else {
      if (node.nodeType === 1) {
        retVal = createNode(node, parent, shadowId);
        realArray = Array.from(node.childNodes);
        retVal.children = realArray.reduce((res, child) => {
          return reduceShadowDOM(res, child, retVal);
        }, []);

        return [retVal];
      } else if (node.nodeType === 3) {
        // text
        return [createNode(node, parent)];
      }
      return undefined;
    }
  }
}
