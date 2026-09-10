import parseCrossOriginStylesheet from './parse-crossorigin-stylesheet';

/**
 * Parse non cross-origin stylesheets
 *
 * @method parseSameOriginStylesheet
 * @memberof axe.utils
 * @param {Object} sheet CSSStylesheet object
 * @param {Object} options options object from `axe.utils.parseStylesheet`
 * @param {Array<Number>} priority sheet priority
 * @param {Array<String>} importedUrls urls of already imported stylesheets
 * @param {Boolean} isCrossOrigin boolean denoting if a stylesheet is `cross-origin`
 * @returns {Promise}
 */
function parseSameOriginStylesheet(
  sheet,
  options,
  priority,
  importedUrls,
  isCrossOrigin = false
) {
  const rules = Array.from(sheet.cssRules);

  if (!rules) {
    return Promise.resolve();
  }

  /**
   * reference -> https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
   */
  const cssImportRules = rules.filter(r => r.type === 3); // type === 3 -> CSSRule.IMPORT_RULE

  /**
   * when no `@import` rules in given sheet -> resolve the current `sheet` & exit
   */
  if (!cssImportRules.length) {
    // exit
    return Promise.resolve({
      isCrossOrigin,
      priority,
      root: options.rootNode,
      shadowId: options.shadowId,
      sheet
    });
  }

  /**
   * filter rules that are not already fetched
   */
  const cssImportUrlsNotAlreadyImported = cssImportRules
    // ensure rule has a href
    .filter(rule => rule.href)
    // extract href from object and resolve it
    .map(rule => resolveImportUrl(rule.href, sheet))
    // only href that are not already imported
    .filter(url => !importedUrls.includes(url));

  /**
   * iterate `@import` rules and fetch styles
   */
  const promises = cssImportUrlsNotAlreadyImported.map(
    (importUrl, cssRuleIndex) => {
      const newPriority = [...priority, cssRuleIndex];
      const isCrossOriginRequest = isCrossOriginUrl(importUrl);

      return parseCrossOriginStylesheet(
        importUrl,
        options,
        newPriority,
        importedUrls,
        isCrossOriginRequest
      );
    }
  );

  const nonImportCSSRules = rules.filter(r => r.type !== 3);

  // no further rules to process in this sheet
  if (!nonImportCSSRules.length) {
    return Promise.all(promises);
  }

  // convert all `nonImportCSSRules` style rules into `text` and chain

  promises.push(
    Promise.resolve(
      options.convertDataToStylesheet({
        data: nonImportCSSRules.map(rule => rule.cssText).join(),
        isCrossOrigin,
        priority,
        root: options.rootNode,
        shadowId: options.shadowId
      })
    )
  );

  return Promise.all(promises);
}

/**
 * Resolve the url of an `@import` against the stylesheet that contains it
 *
 * `CSSImportRule.href` returns the url as it is written in the stylesheet, so it
 * is usually relative. CSS resolves such a url against the url of the stylesheet
 * that contains the `@import`, while `XMLHttpRequest` resolves it against the
 * url of the document. Those two are not the same when the stylesheet does not
 * sit next to the document.
 *
 * @param {String} url url of the `@import`, as it is written in the stylesheet
 * @param {Object} sheet CSSStylesheet object that contains the `@import`
 * @returns {String}
 */
function resolveImportUrl(url, sheet) {
  // `sheet.href` is null for an inline `<style>` element, where the url of the
  // document is the correct base
  const base = sheet.href || document.baseURI;

  try {
    return new window.URL(url, base).href;
  } catch {
    // IE11 has no URL constructor, so the url is left as it was written
    return url;
  }
}

/**
 * Check if a given url points to another origin
 *
 * @param {String} url url of the `@import`
 * @returns {Boolean}
 */
function isCrossOriginUrl(url) {
  try {
    return (
      new window.URL(url, window.location.href).origin !==
      window.location.origin
    );
  } catch {
    // IE11 has no URL constructor, so the url is matched as a string
    return /^https?:\/\/|^\/\//i.test(url);
  }
}

export default parseSameOriginStylesheet;
