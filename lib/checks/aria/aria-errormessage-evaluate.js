import standards from '../../standards';
import { isVisibleToScreenReaders, getResolvedRefs } from '../../commons/dom';
import { tokenList } from '../../core/utils';
import {
  getExplicitRole,
  getAriaValue,
  hasAriaValue
} from '../../commons/aria';
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

  const errorMessageAttr = getAriaValue(
    virtualNode,
    'aria-errormessage'
  )?.value;
  const hasAttr = hasAriaValue(virtualNode, 'aria-errormessage');
  const invaid = getAriaValue(virtualNode, 'aria-invalid', {
    lowercase: true
  })?.value;
  const hasInvallid = hasAriaValue(virtualNode, 'aria-invalid');

  // pass if aria-invalid is not set or set to false as we don't
  // need to check the referenced node since it is not applicable
  if (!hasInvallid || invaid === 'false') {
    return true;
  }

  function validateAttrValue(attr) {
    if (attr.trim() === '') {
      return standards.ariaAttrs['aria-errormessage'].allowEmpty;
    }

    const errormessageTokens = tokenList(attr);
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
        values: errormessageTokens
      });
      return undefined;
    }

    if (idref) {
      if (!isVisibleToScreenReaders(idref)) {
        this.data({
          messageKey: 'hidden',
          values: errormessageTokens
        });
        return false;
      }
      const describedbyTokens = tokenList(
        getAriaValue(virtualNode, 'aria-describedby')?.value ?? ''
      );
      return (
        getExplicitRole(idref) === 'alert' ||
        getAriaValue(idref, 'aria-live')?.value === 'assertive' ||
        getAriaValue(idref, 'aria-live')?.value === 'polite' ||
        errormessageTokens.some(token => describedbyTokens.includes(token))
      );
    }

    return;
  }

  // limit results to elements that actually have this attribute
  if (options.indexOf(errorMessageAttr) === -1 && hasAttr) {
    this.data(tokenList(errorMessageAttr));
    return validateAttrValue.call(this, errorMessageAttr);
  }

  return true;
}
