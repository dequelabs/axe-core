import querySelectorAllFilter from './query-selector-all-filter';

/**
 * Given a rootNode
 * -> get all HTMLMediaElement's and ensure their metadata is loaded
 *
 * @method preloadMedia
 * @memberof axe.utils
 * @property {Object} options.treeRoot (optional) the DOM tree to be inspected
 */
// TODO: es-modules_tree
function preloadMedia({ treeRoot = axe._tree[0] }) {
  const mediaVirtualNodes = querySelectorAllFilter(
    treeRoot,
    /**
     * Only concern ourselves with media that autoplays as the no-autoplay-audio rule
     * is the only rule that uses this information
     */
    'video[autoplay], audio[autoplay]',
    ({ actualNode }) => {
      /**
       * Ignore media that won't load no matter how long we wait (i.e. preload=none).
       *
       * Although the spec says that the autoplay attribute can override the preload
       * attribute, it depends on the browser settings (if autoplay is allowed) and
       * operating system (e.g. Android does not preload autoplay media even when
       * autoplay is allowed).
       *
       * We can identify preload=none media that won't load if the networkState is
       * idle and the readyState is 0. If the browser is currently loading the media
       * (networkState) or if the media is already loaded (readyState) that means the
       * preload attribute was ignored.
       *
       * @see https://github.com/dequelabs/axe-core/issues/4665
       * @see https://html.spec.whatwg.org/multipage/media.html#attr-media-preload
       */
      if (
        actualNode.preload === 'none' &&
        actualNode.readyState === 0 &&
        actualNode.networkState !== actualNode.NETWORK_LOADING
      ) {
        return false;
      }

      /**
       * Ignore media nodes which are `paused` or `muted` as the no-autoplay-audio
       * rule matcher ignores them
       */
      if (
        actualNode.hasAttribute('paused') ||
        actualNode.hasAttribute('muted')
      ) {
        return false;
      }

      /**
       * This is to safe-gaurd against empty `src` values which can get resolved `window.location`, thus never preloading as the URL is not a media asset
       */
      if (actualNode.hasAttribute('src')) {
        return !!actualNode.getAttribute('src');
      }

      /**
       * The `src` on <source> element is essential for `audio` and `video` elements
       */
      const sourceWithSrc = Array.from(
        actualNode.getElementsByTagName('source')
      ).filter(source => !!source.getAttribute('src'));
      if (sourceWithSrc.length <= 0) {
        return false;
      }

      return true;
    }
  );

  return Promise.all(
    mediaVirtualNodes.map(({ actualNode }) => isMediaElementReady(actualNode))
  );
}

export default preloadMedia;

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
