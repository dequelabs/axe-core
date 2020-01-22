/* global dom, axe */

/**
 * Determines if there is a modal currently open.
 * @method isModalOpen
 * @memberof axe.commons.dom
 * @instance
 * @return {Boolean|undefined} True if we know (or our best guess) that a modal is open, undefined if we can't tell (doesn't mean there isn't one open)
 */
dom.isModalOpen = function isModalOpen(options) {
	options = options || {};
	let modalPercent = options.modalPercent || 0.75;

	// there is no "definitive" way to code a modal so detecting when one is open
	// is a bit of a guess. a modal won't always be accessible, so we can't rely
	// on the `role` attribute, and relying on a class name as a convention is
	// unreliable. we also cannot rely on the body/html not scrolling.
	//
	// because of this, we will look for two different types of modals:
	// "definitely a modal" and "could be a modal."
	//
	// "definitely a modal" is any visible element that is coded to be a modal
	// by using one of the following criteria:
	//
	// - has the attribute `role=dialog`
	// - has the attribute `aria-modal=true`
	// - is the dialog element
	//
	// "could be a modal" is a visible element that takes up more than 75% of
	// the screen (though typically full width/height) and is the top-most element
	// in the viewport. since we aren't sure if it is or is not a modal this is
	// just our best guess of being one based on convention.

	if (axe._cache.get('isModalOpen')) {
		return axe._cache.get('isModalOpen');
	}

	const definiteModals = axe.utils.querySelectorAll(
		axe._tree[0],
		'dialog, [role=dialog], [aria-modal=true]'
	);
	const modalVisible = definiteModals.find(vNode => {
		return dom.isVisible(vNode.actualNode);
	});

	if (modalVisible) {
		axe._cache.set('isModalOpen', true);
		return true;
	}

	// to find a "could be a modal" we will take the element stack from each of
	// four corners and one from the middle of the viewport (total of 5). if each
	// stack contains an element whose width/height is >= 75% of the screen as
	// the top most element, we found a "could be a modal"
	const viewport = dom.getViewportSize(window);
	const percentWidth = viewport.width * modalPercent;
	const percentHeight = viewport.height * modalPercent;
	const x = (viewport.width - percentWidth) / 2;
	const y = (viewport.height - percentHeight) / 2;

	const points = [
		// top-left corner
		{ x, y },
		// top-right corner
		{ x: viewport.width - x, y },
		// center
		{ x: viewport.width / 2, y: viewport.height / 2 },
		// bottom-left corner
		{ x, y: viewport.height - y },
		// bottom-right corner
		{ x: viewport.width - x, y: viewport.height - y }
	];

	const stacks = points.map(point => {
		return document.elementsFromPoint(point.x, point.y);
	});

	let fullWidthElement;
	stacks.forEach(stack => {
		// the modal element may not be the top-most element of the stack due to
		// how it's written, so we'll look for it in the first half
		for (let i = 0; i < stack.length / 2; i++) {
			const style = window.getComputedStyle(stack[i]);
			const modal =
				parseInt(style.width, 10) >= percentWidth &&
				parseInt(style.height, 10) >= percentHeight &&
				(style.position === 'absolute' || style.position === 'fixed');

			if (modal) {
				fullWidthElement = stack[i];
			}
		}
	});

	// one of the points has a high probability to have the modal content be the
	// top-most element, so we'll just need to make sure the element is present
	// in every stack
	if (
		fullWidthElement &&
		stacks.every(stack => stack.includes(fullWidthElement))
	) {
		axe._cache.set('isModalOpen', true);
		return true;
	}

	axe._cache.set('isModalOpen', undefined);
	return undefined;
};
