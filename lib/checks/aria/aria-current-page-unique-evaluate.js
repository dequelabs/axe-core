import { querySelectorAllFilter } from '../../core/utils';
import {
  getPageUrl,
  isSamePage,
  isVisibleToScreenReaders
} from '../../commons/dom';

/**
 * Check if another link in the page is marked aria-current="page" and leads
 * to a different page. Links to the same page (e.g. in both a header and a
 * footer navigation) are allowed.
 *
 * @memberof checks
 * @return {Boolean} True if a link marked aria-current="page" leads to a different page. False otherwise
 */
export default function ariaCurrentPageUniqueEvaluate(
  node,
  options,
  virtualNode
) {
  const href = virtualNode.attr('href');
  const otherPages = querySelectorAllFilter(
    axe._tree[0],
    'a[href][aria-current], area[href][aria-current]',
    vNode =>
      vNode !== virtualNode &&
      vNode.attr('aria-current').trim().toLowerCase() === 'page' &&
      getPageUrl(vNode.attr('href')) !== null &&
      !isSamePage(href, vNode.attr('href')) &&
      isVisibleToScreenReaders(vNode)
  );

  this.relatedNodes(otherPages.map(vNode => vNode.actualNode));
  return otherPages.length > 0;
}
