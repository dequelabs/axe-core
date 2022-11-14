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

  const firstPageLink = cache.get('firstPageLink', generateFirstPageLink);

  if (!firstPageLink) {
    return true;
  }

  return (
    element.compareDocumentPosition(firstPageLink.actualNode) ===
    element.DOCUMENT_POSITION_FOLLOWING
  );
}

function generateFirstPageLink() {
  let firstPageLink;
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
  return firstPageLink || null;
}
