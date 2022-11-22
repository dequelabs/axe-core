import { validateAttrValue } from '../../commons/aria';
import standards from '../../standards';

/**
 * Check that each ARIA attribute on an element has a valid value.
 *
 * Valid ARIA attribute values are taken from the `ariaAttrs` standards object from an attributes `type` property.
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
 *       <td><code>Mixed</code></td>
 *       <td>Object with Strings `messageKey` and `needsReview` if `aria-current` or `aria-describedby` are invalid. Otherwise a list of all invalid ARIA attributes and their value</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Mixed} True if all ARIA attributes have a valid value. Undefined for invalid `aria-current` or `aria-describedby` values. False otherwise.
 */
export default function ariaValidAttrValueEvaluate(node, options, virtualNode) {
  options = Array.isArray(options.value) ? options.value : [];

  let needsReview = '';
  let messageKey = '';
  const invalid = [];
  const aria = /^aria-/;
  const skipAttrs = ['aria-errormessage'];

  const preChecks = {
    // aria-controls should only check if element exists if the element
    // doesn't have aria-expanded=false or aria-selected=false (tabs)
    // @see https://github.com/dequelabs/axe-core/issues/1463
    'aria-controls': () => {
      return (
        virtualNode.attr('aria-expanded') !== 'false' &&
        virtualNode.attr('aria-selected') !== 'false'
      );
    },
    // aria-current should mark as needs review if any value is used that is
    // not one of the valid values (since any value is treated as "true")
    'aria-current': validValue => {
      if (!validValue) {
        needsReview = `aria-current="${virtualNode.attr('aria-current')}"`;
        messageKey = 'ariaCurrent';
      }

      return;
    },
    // aria-owns should only check if element exists if the element
    // doesn't have aria-expanded=false (combobox)
    // @see https://github.com/dequelabs/axe-core/issues/1524
    'aria-owns': () => {
      return virtualNode.attr('aria-expanded') !== 'false';
    },
    // aria-describedby should not mark missing element as violation but
    // instead as needs review
    // @see https://github.com/dequelabs/axe-core/issues/1151
    'aria-describedby': validValue => {
      if (!validValue) {
        needsReview = `aria-describedby="${virtualNode.attr(
          'aria-describedby'
        )}"`;
        // TODO: es-modules_tree
        messageKey =
          axe._tree && axe._tree[0]._hasShadowRoot ? 'noIdShadow' : 'noId';
      }

      return;
    },
    // aria-labelledby should not mark missing element as violation but
    // instead as needs review
    // @see https://github.com/dequelabs/axe-core/issues/2621
    'aria-labelledby': validValue => {
      if (!validValue) {
        needsReview = `aria-labelledby="${virtualNode.attr(
          'aria-labelledby'
        )}"`;
        // TODO: es-modules_tree
        messageKey =
          axe._tree && axe._tree[0]._hasShadowRoot ? 'noIdShadow' : 'noId';
      }
    }
  };

  virtualNode.attrNames.forEach(attrName => {
    if (
      skipAttrs.includes(attrName) ||
      options.includes(attrName) ||
      !aria.test(attrName)
    ) {
      return;
    }

    let validValue;
    const attrValue = virtualNode.attr(attrName);

    try {
      validValue = validateAttrValue(virtualNode, attrName);
    } catch (e) {
      needsReview = `${attrName}="${attrValue}"`;
      messageKey = 'idrefs';
      return;
    }

    if (
      (preChecks[attrName] ? preChecks[attrName](validValue) : true) &&
      !validValue
    ) {
      if (attrValue === '' && !isStringType(attrName)) {
        needsReview = attrName;
        messageKey = 'empty';
      } else {
        invalid.push(`${attrName}="${attrValue}"`);
      }
    }
  });

  if (invalid.length) {
    this.data(invalid);
    return false;
  }

  if (needsReview) {
    this.data({ messageKey, needsReview });
    return undefined;
  }

  return true;
}

function isStringType(attrName) {
  return standards.ariaAttrs[attrName]?.type === 'string';
}
