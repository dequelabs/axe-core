import cache from '../../core/base/cache';
import { querySelectorAll } from '../../core/utils';

// angular skip links start with /#
const angularSkipLinkRegex = /^\/\#/;

// angular router link uses #! or #/
const angularRouterLinkRegex = /^#[!/]/;

/**
 * Determines if element is a skip link
 * @method isSkipLink
 * @memberof axe.commons.dom
 * @instance
 * @param  {Element} element
 * @return {Boolean}
 */
function isSkipLink(element) {
  let firstPageLink;
  if (typeof cache.get('firstPageLink') !== 'undefined') {
    firstPageLink = cache.get('firstPageLink');
  } else {
    // define a skip link as any anchor element whose resolved href
    // resolves to the current page and uses a fragment identifier (#)
    // and which precedes the first anchor element whose resolved href
    // does not resolve to the current page or that doesn't use a
    // fragment identifier
    const currentPage = window.location.origin + window.location.pathname;
    firstPageLink = querySelectorAll(
      axe._tree,
      'a[href]:not([href^="javascript"])'
    ).find(({ actualNode }) => {
      if (angularSkipLinkRegex.test(actualNode.getAttribute('href'))) {
        return false;
      }

      if (!actualNode.hash || angularRouterLinkRegex.test(actualNode.hash)) {
        return true;
      }

      const linkPage = actualNode.origin + actualNode.pathname;
      return linkPage !== currentPage;
    });

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

export default isSkipLink;
