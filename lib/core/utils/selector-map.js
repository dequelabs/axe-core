import cache from '../base/cache';
import getNodeAttributes from './get-node-attributes';

function cacheSelector(key, vNode) {
  const selectorMap = cache.get('selectorMap');

  if (selectorMap) {
    selectorMap[key] = selectorMap[key] || [];
    selectorMap[key].push(vNode);
  }
}

/**
 * Cache selector information about a VirtalNode
 * @param {VirtualNode} vNode
 */
export function cacheNodeSelectors(vNode) {
  // node index is used for sorting nodes by their DOM order in
  // `axe.utils.querySelectorAllFtiler` since multiple expressions
  // need to sort the nodes by DOM order
  const nodeIndex = cache.get('nodeIndex') || 0;
  vNode._nodeIndex = nodeIndex;
  cache.set('nodeIndex', nodeIndex + 1);

  cacheSelector(vNode.props.nodeName, vNode);
  cacheSelector('*', vNode);

  // tests can pass non-node elements that don't have cloneNode
  let attributes;
  try {
    attributes = getNodeAttributes(vNode.actualNode);
  } catch (e) {
    attributes = [];
  }

  for (var i = 0; i < attributes.length; i++) {
    const attr = attributes[i];
    cacheSelector(`[${attr.name}]`, vNode);
  }
}

/**
 * Return the selector map
 * @return {Mixed} Object with selector keys and an array of matching VirtualNodes for the value. Returns null if the selector map has not been set up
 */
export function getNodeSelectorMap() {
  return cache.get('selectorMap');
}
