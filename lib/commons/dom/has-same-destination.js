/**
 * Determine whether two nodes are links that navigate to the same destination.
 *
 * This is deliberately narrower than urlPropsFromAttribute (used by
 * identical-links-same-purpose), which resolves "#" and "#section" to the
 * current page and treats http and https alike. Links that differ only in
 * their `target` attribute open the same page, so they count as the same
 * destination.
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
  if (href === '' || href.startsWith('#') || /^javascript:/i.test(href)) {
    return null;
  }

  // SVG links expose an SVGAnimatedString, and "/#" is a placeholder
  const resolvedHref = vNode.actualNode.href;
  if (typeof resolvedHref !== 'string' || resolvedHref.endsWith('#')) {
    return null;
  }
  return resolvedHref;
}
