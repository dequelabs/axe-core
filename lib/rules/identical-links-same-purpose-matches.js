const { aria, text, dom } = axe.commons;
const { escapeSelector } = axe.utils;

const hasAccName = !!text.accessibleTextVirtual(virtualNode);
if (!hasAccName) {
	return false;
}

const role = aria.getRole(node);
if (role && role !== 'link') {
	return false;
}

const nodeName = node.nodeName.toUpperCase();
if (['A', 'AREA'].includes(nodeName) && !node.hasAttribute('href')) {
	return false;
}

if (nodeName === 'AREA') {
	const rootEl = dom.getRootNode(node);
	/**
	 * Ensure map is used by `img` witin the document tree
	 */
	const mapEl = getMapForAreaElement(node, rootEl);
	if (!mapEl) {
		return false;
	}

	const mapElName = mapEl.getAttribute('name');
	if (!mapElName) {
		return false;
	}

	return isMapReferredByAnyImgNode(rootEl, mapElName);
}

return true;

/**
 * Check if a given name is referred by <img> node within the `usemap` attribute
 * @param {HTMLElement} rootEl root node (document or shadowRoot)
 * @param {String} mapElName element name
 * @reurns {Boolean}
 */
function isMapReferredByAnyImgNode(rootEl, mapElName) {
	const mapName = escapeSelector(mapElName);
	const refs = rootEl.querySelectorAll(`[usemap="#${mapName}"]`);
	return refs.length > 0;
}

/**
 * Get <map> element for a given <area> element
 * @method getMapForAreaElement
 * @param {HTMLElement} areaEl <area> element
 * @param {HTMLElement} rootEl root node (document or shadowRoot)
 * @returns {HTMLElement|undefined}
 */
function getMapForAreaElement(areaEl, rootEl) {
	const parent = areaEl.assignedSlot ? areaEl.assignedSlot : areaEl.parentNode;

	if (!parent || parent === rootEl) {
		return undefined;
	}

	const parentNodeName = parent.nodeName.toUpperCase();
	if (parentNodeName !== 'MAP') {
		getMapForAreaElement(parent);
	}

	return parent;
}
