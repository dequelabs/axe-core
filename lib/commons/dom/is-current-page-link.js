// angular skip links start with /#
const angularSkipLinkRegex = /^\/\#/;

// angular router link uses #! or #/
const angularRouterLinkRegex = /^#[!/]/;

/**
 * Determine if an anchor elements href attribute references the current page.
 * @method isCurrentPageLink
 * @memberof axe.commons.dom
 * @param {HTMLAnchorElement} anchor
 * @return {Boolean|null}
 */
export default function isCurrentPageLink(anchor) {
  // jsdom can have window.location.origin set to null
  if (!window?.location.origin) {
    return null;
  }

  // ie11 does not have support window.origin
  const currentPageUrl = window.location.origin + window.location.pathname;

  const href = anchor.getAttribute('href');
  if (!href || href === '#') {
    return false;
  }

  if (angularSkipLinkRegex.test(href)) {
    return true;
  }

  const { hash, protocol, hostname, port, pathname } = anchor;
  if (angularRouterLinkRegex.test(hash)) {
    return false;
  }

  // ie11 does not have .origin so we need to construct it ourselves
  const url = `${protocol}//${hostname}${port ? `:${port}` : ''}${pathname}`;

  return url === currentPageUrl;
}
