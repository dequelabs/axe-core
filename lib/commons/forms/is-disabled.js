/* global forms */

const disabledNodeNames = ['fieldset', 'button', 'select', 'input', 'textarea'];

/**
 * Determines if an element disabled, or part of a disabled element
 *
 * IMPORANT: This method is fairly loose. There are significant differences in browsers of when
 * they'll announce a thing disabled. This tells us if any accessibility supported browser
 * identifies an element as disabled, but not if all of them do.
 *
 * @method isDisabled
 * @memberof axe.commons.forms
 * @param {VirtualNode} virtualNode
 * @return {boolean} whether or not the element is disabled in some way
 */
forms.isDisabled = function(virtualNode) {
	const { nodeName } = virtualNode.props;
	if (virtualNode.hasAttr('disabled') && disabledNodeNames.includes(nodeName)) {
		return true;
	}
	if (
		axe.commons.dom.findUpVirtual(
			virtualNode,
			'button[disabled], fieldset[disabled]'
		)
	) {
		return true;
	}

	// Check if it's disabled using ARIA:
	if ((virtualNode.attr('aria-disabled') || '').toLowerCase() === 'true') {
		return true;
	}

	const closestAriaDisabled = axe.commons.dom.findUpVirtual(
		virtualNode,
		'[aria-disabled]'
	);
	if (
		closestAriaDisabled &&
		closestAriaDisabled.getAttribute('aria-disabled').toLowerCase() === 'true'
	) {
		return true;
	}
	return false;
};
