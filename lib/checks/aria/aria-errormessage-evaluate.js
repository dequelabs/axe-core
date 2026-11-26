import standards from '../../standards';
import { isVisibleToScreenReaders, getResolvedRefs } from '../../commons/dom';
import { visibleVirtual } from '../../commons/text';
import { tokenList, querySelectorAll } from '../../core/utils';
import cache from '../../core/base/cache';
import {
  getExplicitRole,
  getRole,
  getAriaValue,
  hasAriaValue
} from '../../commons/aria';

const implicitAriaLiveRoles = ['alert', 'log', 'status'];
/**
 * Check if `aria-errormessage` references an element that also uses a technique to announce the message (aria-live, aria-describedby, etc.),
 * or if the message can be announced by a live region elsewhere on the page.
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
 * @return {Mixed} True if aria-errormessage references an existing element that uses a supported technique, or if the page has a live region with content. Undefined if it does not reference an existing element, or if the page only has empty live regions. False otherwise.
 */
export default function ariaErrormessageEvaluate(node, options, virtualNode) {
  options = Array.isArray(options) ? options : [];

  const errorMessageAttr = getAriaValue(virtualNode, 'aria-errormessage').value;
  const hasAttr = hasAriaValue(virtualNode, 'aria-errormessage');
  const invaid = getAriaValue(virtualNode, 'aria-invalid').value;
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
        getAriaValue(virtualNode, 'aria-describedby').value ?? ''
      );
      if (
        getExplicitRole(idref) === 'alert' ||
        getAriaValue(idref, 'aria-live').value === 'assertive' ||
        getAriaValue(idref, 'aria-live').value === 'polite' ||
        errormessageTokens.some(token => describedbyTokens.includes(token))
      ) {
        return true;
      }

      // The message may still be announced through another live region on
      // the page, such as an error summary
      const liveRegions = getPageLiveRegions();
      if (!liveRegions.length) {
        return false;
      }
      if (liveRegions.some(liveRegion => visibleVirtual(liveRegion, true))) {
        return true;
      }

      // An empty live region may have been cleared after announcing the message
      this.data({
        messageKey: 'emptyLiveRegion',
        values: errormessageTokens
      });
      return undefined;
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

/**
 * Get the live regions on the page that are visible to screen readers
 * @return {VirtualNode[]}
 */
function getPageLiveRegions() {
  return cache.get('ariaErrormessageLiveRegions', () =>
    querySelectorAll(axe._tree[0], '*').filter(
      vNode => isLiveRegion(vNode) && isVisibleToScreenReaders(vNode)
    )
  );
}

/**
 * Check if an element is a live region, through aria-live or an implicit live region role
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function isLiveRegion(vNode) {
  if (hasAriaValue(vNode, 'aria-live')) {
    return ['assertive', 'polite'].includes(
      getAriaValue(vNode, 'aria-live').value
    );
  }
  return implicitAriaLiveRoles.includes(getRole(vNode));
}
