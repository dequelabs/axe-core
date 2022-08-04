import memoize from '../../core/utils/memoize';
import getOwnBackgroundColor from '../color/get-own-background-color';

/**
 * Find the pseudo element of node that meets the minimum size threshold.
 * @method findPseudoElement
 * @memberof axe.commons.dom
 * @instance
 * @param {VirtualNode} vNode The VirtualNode to find pseudo elements for
 * @param {Object} options
 * @returns {VirtualNode|undefined} The VirtualNode which has matching pseudo elements.
 */
export default function findPseudoElement(
  vNode,
  { pseudoSizeThreshold = 0.25, ignorePseudo = false, recurse = true } = {}
) {
  if (ignorePseudo) {
    return;
  }
  const rect = vNode.boundingClientRect;
  const minimumSize = rect.width * rect.height * pseudoSizeThreshold;
  do {
    const beforeSize = getPseudoElementArea(vNode.actualNode, ':before');
    const afterSize = getPseudoElementArea(vNode.actualNode, ':after');
    if (beforeSize + afterSize > minimumSize) {
      return vNode; // Combined area of before and after exceeds the minimum size
    }
  } while (recurse && (vNode = vNode.parent));
}

const getPseudoElementArea = memoize(function getPseudoElementArea(
  node,
  pseudo
) {
  const style = window.getComputedStyle(node, pseudo);
  const matchPseudoStyle = (prop, value) =>
    style.getPropertyValue(prop) === value;
  if (
    matchPseudoStyle('content', 'none') ||
    matchPseudoStyle('display', 'none') ||
    matchPseudoStyle('visibility', 'hidden') ||
    matchPseudoStyle('position', 'absolute') === false
  ) {
    return 0; // The pseudo element isn't visible
  }

  if (
    getOwnBackgroundColor(style).alpha === 0 &&
    matchPseudoStyle('background-image', 'none')
  ) {
    return 0; // There is no background
  }

  // Find the size of the pseudo element;
  const pseudoWidth = parseUnit(style.getPropertyValue('width'));
  const pseudoHeight = parseUnit(style.getPropertyValue('height'));
  if (pseudoWidth.unit !== 'px' || pseudoHeight.unit !== 'px') {
    // IE doesn't normalize to px. Infinity gets everything to undefined
    return pseudoWidth.value === 0 || pseudoHeight.value === 0 ? 0 : Infinity;
  }
  return pseudoWidth.value * pseudoHeight.value;
});

function parseUnit(str) {
  const unitRegex = /^([0-9.]+)([a-z]+)$/i;
  const [, value = '', unit = ''] = str.match(unitRegex) || [];
  return {
    value: parseFloat(value),
    unit: unit.toLowerCase()
  };
}
