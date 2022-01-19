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

  if (href.charAt(0) === '#') {
    return true;
  }

  // jsdom can have window.location.origin set to "null" (the string)
  // if the url option is not set when parsing the dom string
  if (
    typeof window.location?.origin !== 'string' ||
    window.location.origin.indexOf('://') === -1
  ) {
    return null;
  }

  // ie11 does not support window.origin
  const currentPageUrl = window.location.origin + window.location.pathname;

  // ie11 does not have anchor.origin so we need to construct
  // it ourselves
  // also ie11 has empty protocol, hostname, and port when the
  // link is relative, so use window.location.origin in these cases
  let url;
  if (!hostname) {
    url = window.location.origin;
  } else {
    url = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  }

  // ie11 has empty pathname if link is just a hash, so use
  // window.location.pathname in these cases
  if (!pathname) {
    url += window.location.pathname;
  } else {
    // ie11 pathname does not start with / but chrome and firefox do
    url += (pathname[0] !== '/' ? '/' : '') + pathname;
  }

  return url === currentPageUrl;
}
