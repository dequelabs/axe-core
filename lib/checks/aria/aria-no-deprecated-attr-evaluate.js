import standards from '../../standards';

/**
 * Check that an element does not use any deprecated ARIA attributes.
 *
 * Deprecated attributes are taken from the `ariaAttrs` standards object from
 * the attribute's `deprecated` property.
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
 *       <td>List of the deprecated ARIA attributes used on the element</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean|undefined} True if no deprecated ARIA attributes are used,
 * undefined (needs review) if any are.
 */
export default function ariaNoDeprecatedAttrEvaluate(
  node,
  options,
  virtualNode
) {
  const deprecatedAttrs = virtualNode.attrNames.filter(
    attrName => standards.ariaAttrs[attrName]?.deprecated
  );

  if (!deprecatedAttrs.length) {
    return true;
  }

  this.data(deprecatedAttrs);
  // Deprecated attributes are still valid, so this is a needs-review rather
  // than a violation unless the element also uses unsupported/unallowed ARIA.
  return undefined;
}
