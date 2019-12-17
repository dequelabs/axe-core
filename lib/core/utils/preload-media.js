/**
 * Given a rootNode
 * -> get all HTMLMediaElement's and ensure their metadata is loaded
 *
 * @method preloadMedia
 * @memberof axe.utils
 * @property {Object} options.treeRoot (optional) the DOM tree to be inspected
 */
axe.utils.preloadMedia = function preloadMedia({ treeRoot = axe._tree[0] }) {
	const rootNodes = axe.utils.getAllRootNodesInTree(treeRoot);
	if (!rootNodes || !rootNodes.length) {
		return Promise.resolve();
	}

	const mediaNodes = rootNodes.reduce((out, { rootNode }) => {
		out.push(...rootNode.querySelectorAll('audio, video'));
		return out;
	}, []);

	return Promise.all(
		mediaNodes.map(node => {
			return isMediaElementReady(node);
		})
	);
};

/**
 * Ensures a media element's metadata is loaded
 * @param {HTMLMediaElement} elm elm
 * @returns {Promise}
 */
function isMediaElementReady(elm) {
	return new Promise((resolve, reject) => {
		/**
		 * See - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
		 */
		if (elm.readyState > 0) {
			resolve();
		}

		function onMediaReady() {
			elm.removeEventListener('loadedmetadata', onMediaReady);
			if (elm.readyState <= 0) {
				reject(
					`Preload media element has wrong readyState of HAVE_NOTHING (0)`
				);
			}
			resolve();
		}

		/**
		 * Given media is not ready, wire up listener for `loadedmetadata`
		 * See - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event
		 */
		elm.addEventListener('loadedmetadata', onMediaReady);
	});
}

/**
 * todo:jey
 * - add tests for this preloadFn, perhaps extract this to be its own PR
 */
