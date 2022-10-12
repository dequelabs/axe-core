import standards from '../../standards';
import { idrefs } from '../../commons/dom';
import { tokenList } from '../../core/utils';
import { isVisibleToScreenReaders } from '../../commons/dom';
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
function ariaErrormessageEvaluate(node, options, virtualNode) {
  options = Array.isArray(options) ? options : [];

  const attr = virtualNode.attr('aria-errormessage');
  const hasAttr = virtualNode.hasAttr('aria-errormessage');
  const invaid = virtualNode.attr('aria-invalid');
  const hasInvallid = virtualNode.hasAttr('aria-invalid');

  // pass if aria-invalid is not set or set to false as we don't
  // need to check the referenced node since it is not applicable
  if (!hasInvallid || invaid === 'false') {
    return true;
  }

  function validateAttrValue(attr) {
    if (attr.trim() === '') {
      return standards.ariaAttrs['aria-errormessage'].allowEmpty;
    }
    let idref;

    try {
      idref = attr && idrefs(virtualNode, 'aria-errormessage')[0];
    } catch (e) {
      this.data({
        messageKey: 'idrefs',
        values: tokenList(attr)
      });
      return undefined;
    }

    if (idref) {
      if (!isVisibleToScreenReaders(idref)) {
        this.data({
          messageKey: 'hidden',
          values: tokenList(attr)
        });
        return false;
      }
      return (
        idref.getAttribute('role') === 'alert' ||
        idref.getAttribute('aria-live') === 'assertive' ||
        idref.getAttribute('aria-live') === 'polite' ||
        tokenList(virtualNode.attr('aria-describedby')).indexOf(attr) > -1
      );
    }

    return;
  }

  // limit results to elements that actually have this attribute
  if (options.indexOf(attr) === -1 && hasAttr) {
    this.data(tokenList(attr));
    return validateAttrValue.call(this, attr);
  }

  return true;
}

export default ariaErrormessageEvaluate;
