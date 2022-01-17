import cache from '../../core/base/cache';
import { querySelectorAll } from '../../core/utils';
import isCurrentPageLink from './is-current-page-link';

/**
 * Determines if element is a skip link.
 *
 * Define a skip link as any anchor element whose resolved href
 * resolves to the current page and uses a fragment identifier (#)
 * and which precedes the first anchor element whose resolved href
 * does not resolve to the current page or that doesn't use a
 * fragment identifier.
 * @method isSkipLink
 * @memberof axe.commons.dom
 * @instance
 * @param  {Element} element
 * @return {Boolean}
 */
export default function isSkipLink(element) {
  if (!element.href) {
    return false;
  }

  let firstPageLink;
  if (typeof cache.get('firstPageLink') !== 'undefined') {
    firstPageLink = cache.get('firstPageLink');
  } else {
    // jsdom can have window.location.origin set to null
    if (!window.location.origin) {
      firstPageLink = querySelectorAll(
        // TODO: es-module-_tree
        axe._tree,
        'a:not([href^="#"]):not([href^="/#"]):not([href^="javascript:"])'
      )[0];
    } else {
      firstPageLink = querySelectorAll(
        axe._tree,
        'a[href]:not([href^="javascript:"])'
      ).find(link => !isCurrentPageLink(link.actualNode));
    }

    // null will signify no first page link
    cache.set('firstPageLink', firstPageLink || null);
  }

  // if there are no page links then all all links will need to be
  // considered as skip links
  if (!firstPageLink) {
    return true;
  }

  return (
    element.compareDocumentPosition(firstPageLink.actualNode) ===
    element.DOCUMENT_POSITION_FOLLOWING
  );
}
