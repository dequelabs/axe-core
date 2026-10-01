/**
 * Determine whether two nodes are links that navigate to the same destination.
 *
 * Only `a` and `area` elements whose resolved URLs match exactly count, so
 * `/x#a` and `/x#b` differ while the `target` attribute is ignored. In-page
 * fragments, `javascript:` URLs, empty fragments and `download` links never
 * match. Stricter than urlPropsFromAttribute, which treats "#" as the current page.
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

  // SVG links expose an SVGAnimatedString, and an empty fragment ("/#") marks a placeholder link
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
