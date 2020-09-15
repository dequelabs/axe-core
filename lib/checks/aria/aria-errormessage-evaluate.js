import standards from '../../standards';
import { getRootNode } from '../../commons/dom';
import { tokenList } from '../../core/utils';

/**
 * Check if an element with `aria-errormessage` also uses a technique to announce the message (aria-live, aria-describedby, etc.).
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
 *       <td><code>Boolean</code></td>
 *       <td>The value of the `aria-errormessage` attribute</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if the element uses a supported technique. False otherwise.
 */
function ariaErrormessageEvaluate(node, options) {
	options = Array.isArray(options) ? options : [];

	const attr = node.getAttribute('aria-errormessage');
	const hasAttr = node.hasAttribute('aria-errormessage');

	const doc = getRootNode(node);

	function validateAttrValue(attr) {
		if (attr.trim() === '') {
			return standards.ariaAttrs['aria-errormessage'].allowEmpty;
		}
		const idref = attr && doc.getElementById(attr);
		if (idref) {
			return (
				idref.getAttribute('role') === 'alert' ||
				idref.getAttribute('aria-live') === 'assertive' ||
				tokenList(node.getAttribute('aria-describedby') || '').indexOf(attr) >
					-1
			);
		}
	}

	// limit results to elements that actually have this attribute
	if (options.indexOf(attr) === -1 && hasAttr) {
		if (!validateAttrValue(attr)) {
			this.data(tokenList(attr));
			return false;
		}
	}

	return true;
}

export default ariaErrormessageEvaluate;
