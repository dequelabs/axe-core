import matches from '../matches/matches';
import getRole from '../aria/get-role';
import { nodeLookup } from '../../core/utils';

const alwaysTitleElements = ['iframe'];

/**
 * Get title text
 * @param {HTMLElement|VirtualNode}node the node to verify
 * @return {String}
 */
function titleText(node) {
  const { vNode } = nodeLookup(node);

  if (vNode.props.nodeType !== 1 || !node.hasAttr('title')) {
    return '';
  }

  // Some elements return the title even with role=presentation
  // This does appear in any spec, but its remarkably consistent
  if (
    !matches(vNode, alwaysTitleElements) &&
    ['none', 'presentation'].includes(getRole(vNode))
  ) {
    return '';
  }

  return vNode.attr('title');
}

export default titleText;
