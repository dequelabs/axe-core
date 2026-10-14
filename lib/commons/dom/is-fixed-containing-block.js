/**
 * Determine if an element is the containing block of its fixed descendants,
 * which escape every other ancestor to the viewport.
 * @method isFixedContainingBlock
 * @memberof axe.commons.dom
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export default function isFixedContainingBlock(vNode) {
  // display: contents generates no box, so it can't contain anything
  if (vNode.getComputedStylePropertyValue('display') === 'contents') {
    return false;
  }
  const hasValue = prop => {
    const value = vNode.getComputedStylePropertyValue(prop);
    return !!value && value !== 'none';
  };
  return (
    [
      'transform',
      'translate',
      'rotate',
      'scale',
      'filter',
      'backdrop-filter',
      'perspective'
    ].some(hasValue) ||
    vNode.getComputedStylePropertyValue('content-visibility') === 'auto' ||
    /\b(layout|paint|strict|content)\b/.test(
      vNode.getComputedStylePropertyValue('contain')
    ) ||
    /\b(transform|translate|rotate|scale|perspective|filter|backdrop-filter)\b/.test(
      vNode.getComputedStylePropertyValue('will-change')
    )
  );
}
