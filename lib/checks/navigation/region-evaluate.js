import * as dom from '../../commons/dom';
import { getRole } from '../../commons/aria';
import * as standards from '../../commons/standards';
import matches from '../../commons/matches';
import cache from '../../core/base/cache';

const landmarkRoles = standards.getAriaRolesByType('landmark');
const implicitAriaLiveRoles = ['alert', 'log', 'status'];

export default function regionEvaluate(node, options, virtualNode) {
  this.data({
    isIframe: ['iframe', 'frame'].includes(virtualNode.props.nodeName)
  });

  const regionlessNodes = cache.get('regionlessNodes', () =>
    getRegionlessNodes(options)
  );

  return !regionlessNodes.includes(virtualNode);
}

function getRegionlessNodes(options) {
  const regionlessNodes = findRegionlessElms(axe._tree[0], options)
    // Find first parent marked as having region descendant (or body) and
    // return the node right before it as the "outer" element
    .map(vNode => {
      while (
        vNode.parent &&
        !vNode.parent._hasRegionDescendant &&
        vNode.parent.actualNode !== document.body
      ) {
        vNode = vNode.parent;
      }

      return vNode;
    })
    // Remove duplicate containers
    .filter((vNode, index, array) => {
      return array.indexOf(vNode) === index;
    });
  return regionlessNodes;
}

/**
 * Find all visible elements not wrapped inside a landmark or skiplink
 */
function findRegionlessElms(virtualNode, options) {
  const node = virtualNode.actualNode;
  // End recursion if the element is a landmark, skiplink, or hidden content
  if (
    getRole(virtualNode) === 'button' ||
    isRegion(virtualNode, options) ||
    ['iframe', 'frame'].includes(virtualNode.props.nodeName) ||
    (dom.isSkipLink(virtualNode.actualNode) &&
      dom.getElementByReference(virtualNode.actualNode, 'href')) ||
    !dom.isVisibleToScreenReaders(node)
  ) {
    // Mark each parent node as having region descendant
    let vNode = virtualNode;
    while (vNode) {
      vNode._hasRegionDescendant = true;
      vNode = vNode.parent;
    }
    // iframes are counted as regionless here, but parent tree should treat them as having content
    // after method makes iframes count as regions
    // this means siblings to iframes will fail, not the parent that contains an iframe and other children
    if (['iframe', 'frame'].includes(virtualNode.props.nodeName)) {
      return [virtualNode];
    }
    return [];

    // Return the node is a content element. Ignore any direct text children
    // of body so we don't report body as being outside of a landmark.
    // @see https://github.com/dequelabs/axe-core/issues/2049
  } else if (
    node !== document.body &&
    dom.hasContent(node, /* noRecursion: */ true)
  ) {
    return [virtualNode];

    // Recursively look at all child elements
  } else {
    return virtualNode.children
      .filter(({ actualNode }) => actualNode.nodeType === 1)
      .map(vNode => findRegionlessElms(vNode, options))
      .reduce((a, b) => a.concat(b), []); // flatten the results
  }
}

// Check if the current element is a landmark
function isRegion(virtualNode, options) {
  const node = virtualNode.actualNode;
  const role = getRole(virtualNode);
  const ariaLive = (node.getAttribute('aria-live') || '').toLowerCase().trim();

  // Ignore content inside of aria-live
  if (
    ['assertive', 'polite'].includes(ariaLive) ||
    implicitAriaLiveRoles.includes(role)
  ) {
    return true;
  }

  // Check if the node matches a landmark role
  if (landmarkRoles.includes(role)) {
    return true;
  }

  // Check if node matches an option
  if (options.regionMatcher && matches(virtualNode, options.regionMatcher)) {
    return true;
  }

  return false;
}
