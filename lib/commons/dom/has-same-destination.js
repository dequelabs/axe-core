/**
 * Determine whether two nodes are links that navigate to the same destination.
 *
 * Only HTML `a` and `area` elements count, and their resolved URLs must match
 * exactly, so `/x#a` and `/x#b` are different destinations. The `target`
 * attribute is ignored. Hrefs beginning with `#`, `javascript:` URLs, URLs
 * ending in an empty fragment, `download` links and SVG links never match.
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
  if (
    !vNode.actualNode ||
    !['a', 'area'].includes(vNode.props.nodeName) ||
    !vNode.hasAttr('href') ||
    vNode.hasAttr('download')
  ) {
    return null;
  }

  const href = vNode.attr('href').trim();
  if (href === '' || href.startsWith('#')) {
    return null;
  }

  // SVG links expose an SVGAnimatedString instead of a string.
  // Script URLs and an empty fragment ("/#") mark placeholder links.
  const resolvedHref = vNode.actualNode.href;
  if (
    typeof resolvedHref !== 'string' ||
    /^javascript:/i.test(resolvedHref) ||
    resolvedHref.endsWith('#')
  ) {
    return null;
  }
  return resolvedHref;
}
