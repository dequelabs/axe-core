import { uniqueArray, isHtmlElement } from '../../core/utils';
import { getRole, allowedAttr, validateAttr } from '../../commons/aria';
import { isFocusable } from '../../commons/dom';
import standards from '../../standards';

/**
 * Check if each ARIA attribute on an element is allowed for its semantic role.
 *
 * Allowed ARIA attributes are taken from the `ariaRoles` standards object combining the roles `requiredAttrs` and `allowedAttrs` properties, as well as any global ARIA attributes from the `ariaAttrs` standards object.
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
 *       <td><code>Object</code></td>
 *       <td>Contains a <code>values</code> array of unallowed attributes and an optional <code>messageKey</code> selecting a specific message.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if each aria attribute is allowed. False otherwise.
 */
export default function ariaAllowedAttrEvaluate(node, options, virtualNode) {
  const invalid = [];
  const role = getRole(virtualNode);
  let allowed = allowedAttr(role);

  // @deprecated: allowed attr options to pass more attrs.
  // configure the standards spec instead
  if (Array.isArray(options[role])) {
    allowed = uniqueArray(options[role].concat(allowed));
  }

  // Unknown ARIA attributes are tested in aria-valid-attr
  for (const attrName of virtualNode.attrNames) {
    if (
      validateAttr(attrName) &&
      !allowed.includes(attrName) &&
      !ignoredAttrs(attrName, virtualNode.attr(attrName), virtualNode)
    ) {
      invalid.push(attrName);
    }
  }

  // Check for case-sensitive attributes with non-lowercase values
  if (!invalid.length) {
    const caseSensitiveFailures = [];
    const caseSensitiveIncompletes = [];
    for (const attrName of virtualNode.attrNames) {
      if (!validateAttr(attrName)) {
        continue;
      }
      const attribute = standards.ariaAttrs[attrName];
      if (attribute && attribute.caseInsensitive === false) {
        const attrValue = virtualNode.attr(attrName);
        if (attrValue && attrValue !== attrValue.toLowerCase()) {
          const values = attrName + '="' + attrValue + '"';
          const defaultValues = {
            [attrName]: attribute.defaultValue,
            ...(options.ariaFallbackValues || {})
          };
          const resultValues =
            attrValue.toLowerCase() === defaultValues[attrName]
              ? caseSensitiveIncompletes
              : caseSensitiveFailures;
          resultValues.push(values);
        }
      }
    }

    if (caseSensitiveFailures.length) {
      this.data({
        messageKey: 'caseSensitive',
        values: caseSensitiveFailures
      });
      return false;
    }

    if (caseSensitiveIncompletes.length) {
      this.data({
        messageKey: 'caseSensitive',
        values: caseSensitiveIncompletes
      });
      return undefined;
    }

    return true;
  }

  const invalidValues = invalid.map(
    attrName => attrName + '="' + virtualNode.attr(attrName) + '"'
  );
  const isIncomplete =
    !role && !isHtmlElement(virtualNode) && !isFocusable(virtualNode);
  this.data({
    ...(!isIncomplete && {
      messageKey: invalidValues.length === 1 ? 'singular' : 'plural'
    }),
    values: invalidValues
  });

  if (isIncomplete) {
    return undefined;
  }
  return false;
}

function ignoredAttrs(attrName, attrValue, vNode) {
  // allow aria-required=false as screen readers consistently ignore it
  // @see https://github.com/dequelabs/axe-core/issues/3756
  if (attrName === 'aria-required' && attrValue === 'false') {
    return true;
  }

  // allow aria-multiline=false when contenteditable is set
  // @see https://github.com/dequelabs/axe-core/issues/4463
  if (
    attrName === 'aria-multiline' &&
    attrValue === 'false' &&
    vNode.hasAttr('contenteditable')
  ) {
    return true;
  }

  return false;
}
