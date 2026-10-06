import { getPageUrl } from '../commons/dom';

/**
 * Match links marked aria-current="page" (case-insensitive) that lead to a
 * page, excluding fragment-only links that are not hash routes.
 */
function ariaCurrentPageMatches(node, virtualNode) {
  return (
    virtualNode.attr('aria-current').trim().toLowerCase() === 'page' &&
    getPageUrl(virtualNode.attr('href')) !== null
  );
}

export default ariaCurrentPageMatches;
