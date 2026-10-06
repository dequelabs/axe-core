import getPageUrl from './get-page-url';

/**
 * Determine whether two hrefs lead to the same page, as normalized by
 * `getPageUrl`. Hash routes are only compared when both hrefs have one.
 * @method isSamePage
 * @memberof axe.commons.dom
 * @param {String} hrefA
 * @param {String} hrefB
 * @return {Boolean}
 */
export default function isSamePage(hrefA, hrefB) {
  const urlA = getPageUrl(hrefA);
  const urlB = getPageUrl(hrefB);
  if (!urlA || !urlB || urlA.page !== urlB.page) {
    return false;
  }

  return (
    urlA.route === null || urlB.route === null || urlA.route === urlB.route
  );
}
