// hash routers (e.g. angular, vue-router hash mode) use #/ or #!/
const hashRouteRegex = /^#!?\//;

/**
 * Resolve the page an href leads to, normalized so that two hrefs for the
 * same page can be compared. The href is resolved against the document base
 * URL, query parameters are sorted, and a trailing slash or final
 * `index.html` is removed. The fragment is dropped, unless it is a hash route
 * (`#/` or `#!/`), in which case it is normalized the same way and returned
 * as the `route`.
 * @method getPageUrl
 * @memberof axe.commons.dom
 * @param {String} href
 * @return {Object|null} `{ page, route }`, or null if the href does not lead to a page (a fragment-only href that is not a hash route, a `javascript:` URL, or an invalid URL)
 */
export default function getPageUrl(href) {
  href = href.trim();
  if (href.charAt(0) === '#' && !hashRouteRegex.test(href)) {
    return null;
  }

  let url;
  try {
    url = new window.URL(href, document.baseURI);
  } catch {
    return null;
  }

  if (url.protocol === 'javascript:') {
    return null;
  }

  let route = null;
  if (hashRouteRegex.test(url.hash)) {
    const routeUrl = new window.URL(
      url.hash.replace(/^#!?/, ''),
      'http://route.invalid'
    );
    route = normalizePath(routeUrl) + normalizeSearch(routeUrl);
  }

  return {
    page: `${url.protocol}//${url.host}${normalizePath(url)}${normalizeSearch(url)}`,
    route
  };
}

/**
 * Remove a final `index.html` and a trailing slash from the pathname
 * @param {URL} url
 * @return {String}
 */
function normalizePath(url) {
  return url.pathname.replace(/\/index\.html$/i, '/').replace(/\/$/, '');
}

/**
 * Sort the query parameters by name
 * @param {URL} url
 * @return {String}
 */
function normalizeSearch(url) {
  url.searchParams.sort();
  const search = url.searchParams.toString();
  return search ? `?${search}` : '';
}
