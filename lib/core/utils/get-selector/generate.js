import {
  getBaseSelector,
  getElmId,
  getThreeLeastCommonFeatures
} from './features';
import {
  fragmentMatchesIdx,
  indicesForFragment,
  matchingParents
} from './bit-index';

/*
 * Turns the precomputed page model (`precompute.js`) into a unique CSS
 * selector for one target element.
 *
 * VOCABULARY
 *
 *   FRAGMENT — one link of a selector: the constraints for a single
 *   element. No combinators inside. `computeFragment` produces one per
 *   element. The rendered form is a string like `button.cta:nth-child(3)`;
 *   the same info is also kept as a structured shape that `bit-index.js`
 *   can query — see the `Fragment` typedef below.
 *
 *   CHAIN — fragments joined by ` > ` while walking up the ancestry.
 *   E.g. `main > div.wrap > button.cta` is a 3-link chain describing
 *   "a button.cta inside a div.wrap inside a main."
 *
 *   CANDIDATE — an element that still matches the chain-so-far. Kept
 *   as a list of nodeIdx values (`Number[]` from `indicesForFragment`,
 *   or an `Int32Array` view from `matchingParents`). Starts as "every
 *   element that matches the target's own fragment" and is replaced
 *   with matching parents at every ancestor step. When the list hits
 *   length 1, we're done.
 *
 * ALGORITHM (`generateSelector`)
 *
 *   1. Build the target's own fragment (`computeFragment`).
 *   2. Ask `bit-index.js` "which elements match this fragment?" — the
 *      initial candidate list.
 *   3. If exactly one candidate, return the fragment string.
 *   4. Otherwise walk up: build the parent's fragment, replace the
 *      candidate list with parents that match (`matchingParents`),
 *      prepend the parent fragment to the chain. Repeat.
 *   5. If we walk all the way to the document and still have >1
 *      candidates, return `:root > <rest>` — the outermost link becomes
 *      the document itself, which is guaranteed to be unique.
 *
 * The `_chainCache` (owned by `candidatesForChain`) makes this fast on
 * repetitive pages: when two different targets pass through the same
 * chain suffix (e.g. `body > main > table > tr.row`), the second reuses
 * the first's filtered candidate list instead of redoing the walk.
 *
 * When a fragment carries `id`, the id alone already identifies the
 * element uniquely inside its root — so `tag` / `classes` / the attr
 * fields are all omitted (they'd be redundant).
 *
 * @typedef {Object} Fragment
 * @property {String}      selectorString  the rendered form, e.g.
 *                                         `button.cta:nth-child(3)`
 * @property {String}      [id]            `#id`; when set, no other field
 *                                         except `selectorString` is present
 * @property {String|null} [tag]           lowercase tag selector form
 * @property {String[]}    [classes]       escaped class names
 * @property {String[]|null} [exactAttrs]  exact-form atnvs, matched against
 *                                         `nodeRecord.exactAttrs`
 * @property {Array<{rawName: String, suffix: String}>|null} [suffixAttrs]
 *                                         `[href$="…"]`-style attrs, matched
 *                                         against `nodeRecord.urlAttrs`
 * @property {Number}      [nthChild]      1-indexed sibling position; only
 *                                         set when a sibling would otherwise
 *                                         match this same fragment
 */

/**
 * Build a unique CSS selector for `elm`.
 *
 * Strategy: start with the element's own fragment (tag/classes/attrs +
 * `:nth-child` if needed). If more than one node on the page matches it,
 * prepend the parent's fragment; if that's still not unique, keep walking
 * up until it is (or until we hit the root).
 *
 * Uniqueness is answered by keeping a list of candidate nodes as we walk
 * up — every ancestor step shrinks the list to those whose ancestor at
 * that level also matches. When the list gets to one, we're done. No
 * DOM query per level.
 *
 * `getShadowSelector` calls us with `(elm, options, doc)`; the `doc`
 * argument is unused here but kept for the callback contract.
 *
 * @param {Element} elm
 * @param {Object}  options
 * @param {Boolean} [options.toRoot=false]  keep walking up even after uniqueness
 * @returns {String}                        CSS selector
 */
export default function generateSelector(elm, { toRoot = false } = {}) {
  if (!axe._selectorData) {
    throw new Error('Expect axe._selectorData to be set up');
  }
  const selectorData = axe._selectorData;
  const elmToIdx = selectorData._elmToIdx;
  const targetIdx = elmToIdx.get(elm);
  if (targetIdx === undefined) {
    // Element wasn't found while walking the DOM tree.
    return getElmId(elm) || getBaseSelector(elm);
  }

  const rootId = selectorData._nodeRecords[targetIdx].rootId;
  let candidates = null;
  let selector = '';
  let curElm = elm;
  do {
    const fragment = computeFragment(curElm, selectorData);
    selector = fragment.selectorString + (selector ? ' > ' + selector : '');
    candidates = candidatesForChain(
      selector,
      fragment,
      candidates,
      selectorData,
      rootId
    );
    curElm = curElm.parentElement;
  } while ((candidates.length > 1 || toRoot) && curElm);

  if (candidates.length !== 1) {
    return getRootSelector(selector);
  }
  return selector;
}

/**
 * Build the selector fragment for one element — the one link of the chain
 * that describes just this element, like `button.foo:nth-child(3)`.
 *
 * The output is both the string form (what ends up in the final selector)
 * and the parts broken out (tag / classes / exact attrs / suffix attrs /
 * nth-child) because match-time code needs them separately and would
 * otherwise have to re-parse.
 *
 * The result is cached per element because `generateSelector` walks up the
 * tree and asks about the same ancestors over and over — once per target
 * that shares those ancestors. Cache by nodeIdx; elements that were never
 * walked (not in `_elmToIdx`) are not cached.
 *
 * @param {Element}      elm
 * @param {SelectorData} selectorData
 * @returns {Fragment}
 */
function computeFragment(elm, selectorData) {
  let cache = selectorData._computeFragmentCache;
  if (!cache) {
    cache = selectorData._computeFragmentCache = [];
  }
  const nodeIdx = selectorData._elmToIdx.get(elm);
  if (nodeIdx !== undefined) {
    const cached = cache[nodeIdx];
    if (cached) {
      return cached;
    }
  }

  const fragment = buildFragment(elm, selectorData);
  if (nodeIdx !== undefined) {
    cache[nodeIdx] = fragment;
  }
  return fragment;
}

/**
 * Build the uncached selector fragment for one element.
 *
 * @param {Element}      elm
 * @param {SelectorData} selectorData
 * @returns {Fragment}
 */
function buildFragment(elm, selectorData) {
  const id = getElmId(elm);
  if (id) {
    return { id, selectorString: id };
  }

  const { selectorString, tag, features } = getThreeLeastCommonFeatures(
    elm,
    selectorData
  );
  const { classes, exactAttrs, suffixAttrs } = classifyFeatures(
    features,
    selectorData._suffixInfo
  );
  return withNthChildIfNeeded(
    elm,
    { selectorString, tag, classes, exactAttrs, suffixAttrs },
    selectorData
  );
}

/**
 * Split picked features into the match-time shape: classes, exact
 * attribute selectors, and suffix (`$=`) attribute selectors.
 *
 * Two flavors of attribute selector need different treatment at match
 * time: `name="value"` (exact match, answered from the precomputed
 * bitmap) and `name$="value"` (suffix match, answered by comparing
 * the raw URL). Splitting them here once means the match-time code
 * doesn't have to reclassify on every check.
 *
 * We can't sniff for `$="` inside the atnv — an attribute name that
 * ends in `$` (e.g. Polymer's `attr$="…"` binding syntax left in
 * serialized markup) escapes to `\$="…"`, which trips the same
 * check. `_suffixInfo` is the authoritative record of which atnvs
 * are suffix-form; we populated it in `collectNodeAttrs`, where the
 * form was known unambiguously.
 *
 * @param {Feature[]} features
 * @param {Map<String, {rawName: String, suffix: String}>} suffixInfo
 * @returns {{classes: String[], exactAttrs: String[]|null, suffixAttrs: Array<{rawName: String, suffix: String}>|null}}
 */
function classifyFeatures(features, suffixInfo) {
  const classes = [];
  let exactAttrs = null;
  let suffixAttrs = null;
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    if (feature.kind === 'class') {
      classes.push(feature.name);
      continue;
    }
    const suffixAttr = suffixInfo.get(feature.name);
    if (suffixAttr) {
      if (!suffixAttrs) {
        suffixAttrs = [];
      }
      suffixAttrs.push(suffixAttr);
    } else {
      if (!exactAttrs) {
        exactAttrs = [];
      }
      exactAttrs.push(feature.name);
    }
  }
  return { classes, exactAttrs, suffixAttrs };
}

/**
 * If a sibling also matches this fragment, append `:nth-child(N)` so the
 * fragment is unique among its DOM siblings.
 *
 * Always answered from precomputed data, never a per-sibling CSS-engine
 * call: the phantom pass in `precompute.js` seeds `_elmToIdx` from
 * `querySelectorAll('*')`, so every real DOM sibling has a record —
 * whether or not flatten-tree kept it.
 *
 * @param {Element}      elm
 * @param {Fragment}     fragment
 * @param {SelectorData} selectorData
 * @returns {Fragment}   `fragment` unchanged, or a new one with `:nth-child`
 */
function withNthChildIfNeeded(elm, fragment, selectorData) {
  const elmIdx = selectorData._elmToIdx.get(elm);
  const siblings = (elm.parentNode && elm.parentNode.children) || null;
  if (!siblings || siblings.length < 2) {
    return fragment;
  }

  const { selectorString } = fragment;
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === elm) {
      continue;
    }
    const siblingIdx = selectorData._elmToIdx.get(sibling);
    if (
      siblingIdx !== undefined &&
      fragmentMatchesIdx(fragment, siblingIdx, selectorData._nodeRecords)
    ) {
      const ownNth = selectorData._nodeRecords[elmIdx].nthChild;
      return {
        ...fragment,
        selectorString: selectorString + ':nth-child(' + ownNth + ')',
        nthChild: ownNth
      };
    }
  }

  return fragment;
}

/**
 * Candidate list for one chain string: cache hit, first fragment, or
 * matching parents of the previous list.
 *
 * `prevCandidates` is `null` on the first step (no chain yet). After
 * that it is the list from the previous, more-specific chain. The
 * returned array is stored in `_chainCache` so later targets that reach
 * the same string skip the work.
 *
 * `matchingParents` returns a view of a reused buffer, so the cache
 * stores a copy. The view itself is returned to the walk so the next
 * ancestor step can filter it in place.
 *
 * @param {String}        selector
 * @param {Fragment}      fragment
 * @param {ArrayLike<Number>|null} prevCandidates
 * @param {SelectorData}  selectorData
 * @param {Number}        rootId
 * @returns {ArrayLike<Number>}
 */
function candidatesForChain(
  selector,
  fragment,
  prevCandidates,
  selectorData,
  rootId
) {
  const rootChain = getRootChainCache(selectorData, rootId);
  const cached = rootChain.get(selector);
  if (cached !== undefined) {
    return cached;
  }

  if (!prevCandidates) {
    const nextCandidates = indicesForFragment(fragment, selectorData, rootId);
    rootChain.set(selector, nextCandidates);
    return nextCandidates;
  }

  const nextCandidates = matchingParents(
    prevCandidates,
    fragment,
    selectorData,
    rootId
  );
  // View of a reused buffer — copy for the cache, return the view so
  // the next ancestor step can filter it in place.
  rootChain.set(selector, nextCandidates.slice());
  return nextCandidates;
}

/**
 * Per-rootId cache of "chain string → candidate list". Nested so the
 * inner Map key is just the selector string — otherwise every lookup
 * would allocate a `rootId + '|' + selector` string, and this runs a lot.
 *
 * @param {SelectorData} selectorData
 * @param {Number}       rootId
 * @returns {Map<String, ArrayLike<Number>>}
 */
function getRootChainCache(selectorData, rootId) {
  let chainCache = selectorData._chainCache;
  if (!chainCache) {
    chainCache = selectorData._chainCache = [];
  }
  let rootChain = chainCache[rootId];
  if (!rootChain) {
    rootChain = chainCache[rootId] = new Map();
  }
  return rootChain;
}

/**
 * Replace the outermost fragment with `:root`. Used when the chain is
 * still not unique after walking to the document — the document itself
 * is always unique.
 *
 * @param {String} selector
 * @returns {String}
 */
function getRootSelector(selector) {
  const childPos = selector.indexOf(' > ');
  if (childPos !== -1) {
    return ':root' + selector.substring(childPos);
  }
  return ':root';
}
