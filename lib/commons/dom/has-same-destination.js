/**
 * Determine whether two nodes are links that navigate to the same destination.
 *
 * Only `a` and `area` elements count, and their resolved URLs must match
 * exactly, so `/x#a` and `/x#b` are different destinations while `#a` and
 * `/x#a` on page `/x` are the same. The `target` attribute is ignored. Empty
 * hrefs, `javascript:` URLs and URLs ending in an empty fragment never match.
 * @method hasSameDestination
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNodeA
 * @param {VirtualNode} vNodeB
 * @return {Boolean}
 */
export default function hasSameDestination(vNodeA, vNodeB) {
  const destination = getDestination(vNodeA);
  return !!destination && destination === getDestination(vNodeB);
}

function getDestination(vNode) {
  if (!['a', 'area'].includes(vNode.props.nodeName) || !vNode.hasAttr('href')) {
    return null;
  }

  const href = vNode.attr('href').trim();
  let url;
  try {
    url = new window.URL(href, document.baseURI);
  } catch {
    return null;
  }

  // Empty hrefs, script URLs and an empty fragment ("#", "/#") mark placeholder links
  if (href === '' || url.protocol === 'javascript:' || url.href.endsWith('#')) {
    return null;
  }
  return url.href;
}
