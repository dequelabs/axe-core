/**
 * Check that an element does not have aria-level values exceeding 6
 * VO and NVDA allow any positive value
 * JAWS and TalkBack will give the default value if level > 6
 * See browser/screenreader support research https://codepen.io/straker/pen/jOBjNNe
 * @memberof checks
 * @return {Boolean} Undefined if the element uses aria-level > 6. True otherwise.
 */
function ariaLevelEvaluate(node, options, virtualNode) {
  const ariaHeadingLevel = virtualNode.attr('aria-level');
  const ariaLevel = parseInt(ariaHeadingLevel, 10);
  if (ariaLevel > 6) {
    return undefined;
  }
  return true;
}

export default ariaLevelEvaluate;
