import standards from '../../standards';

/**
 * Check that an element does not use any not recommended ARIA attributes.
 *
 * Not recommended attributes are taken from the `ariaAttrs` standards object
 * from the attribute's `notRecommended` property.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all not recommended attributes</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean|undefined} True if no not recommended ARIA attributes are
 * used, undefined (needs review) if any are.
 */
export default function notRecommendedAttrEvaluate(node, options, virtualNode) {
  const notRecommendedAttrs = virtualNode.attrNames.filter(
    attrName => standards.ariaAttrs[attrName]?.notRecommended
  );

  if (!notRecommendedAttrs.length) {
    return true;
  }

  this.data(notRecommendedAttrs);
  // Not recommended attributes are still valid, so this is a needs-review
  // rather than a violation.
  return undefined;
}
