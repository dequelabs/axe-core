/**
 * Given a rootNode
 * -> get all HTMLMediaElement's and ensure their metadata is loaded
 *
 * @method preloadMedia
 * @memberof axe.utils
 * @property {Object} options.treeRoot (optional) the DOM tree to be inspected
 */
axe.utils.preloadMedia = function preloadMedia({ treeRoot = axe._tree[0] }) {
	const mediaVirtualNodes = axe.utils.querySelectorAll(
		treeRoot,
		'video, audio'
	);

	return Promise.all(
		mediaVirtualNodes.map(({ actualNode }) => isMediaElementReady(actualNode))
	);
};

/**
 * Ensures a media element's metadata is loaded
 * @param {HTMLMediaElement} elm elm
 * @returns {Promise}
 */
function isMediaElementReady(elm) {
	return new Promise(resolve => {
		/**
		 * See - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
		 */
		if (elm.readyState > 0) {
			resolve(elm);
		}

		function onMediaReady() {
			elm.removeEventListener('loadedmetadata', onMediaReady);
			resolve(elm);
		}

		/**
		 * Given media is not ready, wire up listener for `loadedmetadata`
		 * See - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event
		 */
		elm.addEventListener('loadedmetadata', onMediaReady);
	});
}
