import standards from '../../standards';
import { getResolvedRefs, isVisibleToScreenReaders } from '../../commons/dom';
import {
  getAriaValue,
  hasAriaValue,
  getExplicitRole
} from '../../commons/aria';
import { tokenList } from '../../core/utils';
/**
 * Check if `aria-errormessage` references an element that also uses a technique to announce the message (aria-live, aria-describedby, etc.).
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
 *       <td>The value of the `aria-errormessage` attribute</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Mixed} True if aria-errormessage references an existing element that uses a supported technique. Undefined if it does not reference an existing element. False otherwise.
 */
export default function ariaErrormessageEvaluate(node, options, virtualNode) {
  options = Array.isArray(options) ? options : [];

  // read from the attribute, AOM property, or element internals so a value
  // supplied via internals is honored the same as the HTML attribute
  const errorMessage = getAriaValue(virtualNode, 'aria-errormessage');
  const errorMessageValue = errorMessage ? errorMessage.value : null;
  const hasErrorMessage = hasAriaValue(virtualNode, 'aria-errormessage');
  const invalid = getAriaValue(virtualNode, 'aria-invalid');
  const hasInvalid = hasAriaValue(virtualNode, 'aria-invalid');

  // when the value comes from somewhere other than the HTML attribute, note the
  // source so messages don't reference an aria-errormessage attribute that isn't
  // present in the element's markup (see the element internals proposal)
  const source = getSourceMessage(errorMessage);

  // pass if aria-invalid is not set or set to false as we don't
  // need to check the referenced node since it is not applicable
  if (!hasInvalid || invalid?.value === 'false') {
    return true;
  }

  function validateValue(value) {
    if (value.trim() === '') {
      return standards.ariaAttrs['aria-errormessage'].allowEmpty;
    }

    const errormessageTokens = tokenList(value);
    if (errormessageTokens.length > 1) {
      this.data({ messageKey: 'unsupported', values: errormessageTokens });
      return false;
    }

    let idref;
    try {
      idref = getResolvedRefs(virtualNode, 'aria-errormessage')[0];
    } catch {
      this.data({
        messageKey: 'idrefs',
        values: errormessageTokens,
        source
      });
      return undefined;
    }

    if (idref) {
      if (!isVisibleToScreenReaders(idref)) {
        this.data({
          messageKey: 'hidden',
          values: errormessageTokens,
          source
        });
        return false;
      }

      const live = getAriaValue(idref, 'aria-live');
      const describedby = getResolvedRefs(virtualNode, 'aria-describedby');
      return (
        getExplicitRole(idref) === 'alert' ||
        live?.value === 'assertive' ||
        live?.value === 'polite' ||
        describedby.includes(idref)
      );
    }

    return;
  }

  // limit results to elements that actually have this attribute
  if (options.indexOf(errorMessageValue) === -1 && hasErrorMessage) {
    const data = tokenList(errorMessageValue);
    data.source = source;
    this.data(data);
    return validateValue.call(this, errorMessageValue);
  }

  return true;
}

/**
 * Build a sentence noting where an ARIA value was defined, used to keep check
 * messages from referencing an HTML attribute that isn't on the element.
 * @param {{source: String}|null} ariaValue result of `getAriaValue`
 * @return {String} a trailing clause, or an empty string for HTML attributes
 */
function getSourceMessage(ariaValue) {
  if (!ariaValue || ariaValue.source === 'attribute') {
    return '';
  }

  const label =
    ariaValue.source === 'internals' ? 'element internals' : 'an ARIA property';
  return ` The aria-errormessage value is set via ${label}, not an HTML attribute.`;
}
