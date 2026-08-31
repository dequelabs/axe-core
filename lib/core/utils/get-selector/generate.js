import escapeSelector from '../escape-selector';
import matchesSelector from '../element-matches';
import {
  getBaseSelector,
  getElmId,
  getThreeLeastCommonFeatures
} from './features';
import {
  advanceAndFilter,
  bitsForFragment,
  fragmentMatchesIdx,
  indicesForFragment
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
 *   can query:
 *
 *       { selectorString, id?, tag?, classes?,
 *         exactAttrs?, suffixAttrs?, nthChild? }
 *
 *   When a fragment carries `id`, the id alone already identifies the
 *   element uniquely inside its root — so tag / classes / attrs are all
 *   omitted (they'd be redundant).
 *
 *   CHAIN — fragments joined by ` > ` while walking up the ancestry.
 *   E.g. `main > div.wrap > button.cta` is a 3-link chain describing
 *   "a button.cta inside a div.wrap inside a main."
 *
 *   CANDIDATE — an element that still matches the chain-so-far. Kept
 *   as a list of nodeIdx values (an Int32Array once we start filtering).
 *   Starts as "every element that matches the target's own fragment"
 *   and shrinks with every ancestor step. When it hits 1, we're done.
 *
 * ALGORITHM (`generateSelector`)
 *
 *   1. Build the target's own fragment (`computeFragment`).
 *   2. Ask `bit-index.js` "which elements match this fragment?" — the
 *      initial candidate list.
 *   3. If exactly one candidate, return the fragment string.
 *   4. Otherwise walk up: build the parent's fragment, keep only
 *      candidates whose parent matches (`advanceAndFilter`), prepend
 *      the parent fragment to the chain. Repeat.
 *   5. If we walk all the way to the document and still have >1
 *      candidates, return `:root > <rest>` — the outermost link becomes
 *      the document itself, which is guaranteed to be unique.
 *
 * The `_chainCache` in `generateSelector` makes this fast on repetitive
 * pages: when two different targets pass through the same chain suffix
 * (e.g. `body > main > table > tr.row`), the second reuses the first's
 * filtered candidate list instead of redoing the walk.
 */

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
 * that shares those ancestors.
 *
 * @param {Element} elm
 * @param {Number}  idx           the nodeIdx of `elm`, or `-1` if unknown
 * @param {Object}  selectorData
 * @returns {Object}              { selectorString, tag, classes, exactAttrs,
 *                                  suffixAttrs, nthChild }  (or { id, selectorString })
 */
function computeFragment(elm, idx, selectorData) {
  // Cache by nodeIdx into a plain integer-keyed array. This runs in the
  // per-iteration hot loop of `generateSelector`, and a typed-array
  // lookup is measurably cheaper than a WeakMap lookup at that call
  // volume. `idx` comes from the caller (or `-1` for elements that
  // weren't in the tree — those don't cache).
  let cache = selectorData._computeFragmentCache;
  if (!cache) {
    cache = selectorData._computeFragmentCache = [];
  }
  if (idx >= 0) {
    const cached = cache[idx];
    if (cached) {
      return cached;
    }
  }

  const id = getElmId(elm);
  if (id) {
    const out = { id, selectorString: id };
    if (idx >= 0) {
      cache[idx] = out;
    }
    return out;
  }

  const { selector, tag, features } = getThreeLeastCommonFeatures(
    elm,
    selectorData
  );
  // Two flavors of attribute selector need different treatment at match
  // time: `name="value"` (exact match, answered from the precomputed
  // bitmap) and `name$="value"` (suffix match, answered by comparing
  // the raw URL). Splitting them here once means the match-time code
  // doesn't have to reclassify on every check.
  //
  // We can't sniff for `$="` inside the atnv — an attribute name that
  // ends in `$` (e.g. Polymer's `attr$="…"` binding syntax left in
  // serialized markup) escapes to `\$="…"`, which trips the same
  // check. `_suffixInfo` is the authoritative record of which atnvs
  // are suffix-form; we populated it in `collectNodeAttrs`, where the
  // form was known unambiguously.
  const classes = [];
  let exactAttrs = null;
  let suffixAttrs = null;
  const suffixInfo = selectorData._suffixInfo;
  for (const f of features) {
    if (f.species === 'class') {
      classes.push(f.name);
      continue;
    }
    const info = suffixInfo.get(f.name);
    if (info) {
      if (!suffixAttrs) {
        suffixAttrs = [];
      }
      suffixAttrs.push({ name: info.rawName, suffix: info.suffix });
    } else {
      if (!exactAttrs) {
        exactAttrs = [];
      }
      exactAttrs.push(f.name);
    }
  }

  // If any of this element's siblings also match the fragment we just
  // built, the fragment isn't specific enough by itself — we need
  // `:nth-child(N)` to disambiguate. Normally we answer this from
  // precomputed data with no per-sibling CSS-engine call.
  //
  // Fallback: a sibling that wasn't walked by `getSelectorData` isn't in
  // `_elmToIdx` (e.g. an unslotted light-DOM child of a shadow host is
  // dropped from the flat tree, but is still a real DOM sibling for
  // `:nth-child` purposes). For those we call `matchesSelector` — the
  // same way the pre-index algorithm did it.
  const fragmentNoNth = { tag, classes, exactAttrs, suffixAttrs };
  const siblings = (elm.parentNode && elm.parentNode.children) || null;
  let selectorString = selector;
  let nthChild = null;
  if (siblings) {
    const perNode = selectorData._perNode;
    const elmToIdx = selectorData._elmToIdx;
    let ownNth = 0;
    for (let i = 0; i < siblings.length; i++) {
      const sib = siblings[i];
      if (sib === elm) {
        ownNth = i + 1;
        continue;
      }
      const sibIdx = elmToIdx.get(sib);
      let sibMatches;
      if (sibIdx !== undefined) {
        sibMatches = fragmentMatchesIdx(fragmentNoNth, sibIdx, perNode);
      } else {
        sibMatches = matchesSelector(sib, selector);
      }
      if (sibMatches) {
        nthChild = -1;
      }
      if (nthChild !== null && ownNth) {
        break;
      }
    }
    if (nthChild === -1) {
      if (!ownNth) {
        ownNth = 1 + Array.prototype.indexOf.call(siblings, elm);
      }
      nthChild = ownNth;
      selectorString = selector + ':nth-child(' + ownNth + ')';
    }
  }

  const out = {
    selectorString,
    tag,
    classes,
    exactAttrs,
    suffixAttrs,
    nthChild
  };
  if (idx >= 0) {
    cache[idx] = out;
  }
  return out;
}

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
export default function generateSelector(elm, options) {
  if (!axe._selectorData) {
    throw new Error('Expect axe._selectorData to be set up');
  }
  const selectorData = axe._selectorData;
  const { toRoot = false } = options;

  const perNode = selectorData._perNode;
  const elmToIdx = selectorData._elmToIdx;
  const targetIdx = elmToIdx.get(elm);
  if (targetIdx === undefined) {
    // A normal `axe.run` never gets here — every element that ends up in
    // results was walked at `getSelectorData` time, and the DOM doesn't
    // change during a run. This branch exists for the "someone called
    // `getSelector` on a node the tree never saw" case (there's a unit
    // test that hands us a detached DocumentFragment, for instance).
    //
    // We can't trust the id counts we precomputed because they don't
    // include *this* element — a shared id might look unique in the
    // snapshot even when it isn't. So verify against the live DOM here.
    const rawId = elm.getAttribute && elm.getAttribute('id');
    if (rawId) {
      const idSel = '#' + escapeSelector(rawId);
      const root = elm.getRootNode ? elm.getRootNode() : document;
      if (
        !idSel.match(/player_uid_/) &&
        root.querySelectorAll(idSel).length === 1
      ) {
        return idSel;
      }
    }
    return getBaseSelector(elm);
  }

  const targetRec = perNode[targetIdx];
  const rootId = targetRec.rootId;
  const parentOf = selectorData._parentOf;
  // Many targets on a repetitive page walk up through the *same* chain of
  // ancestor fragments for the first several steps. The first target to
  // reach any given chain string does the filter work; every later target
  // that reaches the same string just reuses its candidate list.
  //
  // Nested per rootId so the inner Map key is just the selector string —
  // otherwise every lookup would allocate a `rootId + '|' + selector`
  // string, and this runs a lot.
  let chainCache = selectorData._chainCache;
  if (!chainCache) {
    chainCache = selectorData._chainCache = [];
  }
  let rootChain = chainCache[rootId];
  if (!rootChain) {
    rootChain = chainCache[rootId] = new Map();
  }
  let selector = '';
  let indices = null; // read-only source; may point at cached data
  let anc = null; // mutable working buffer for in-place filtering
  let candCount = 0;
  let curIdx = targetIdx;
  let curElm = elm;

  do {
    const frag = computeFragment(curElm, curIdx, selectorData);
    selector = selector
      ? frag.selectorString + ' > ' + selector
      : frag.selectorString;

    const cached = rootChain.get(selector);
    if (cached !== undefined) {
      // Another target has already reached this exact chain string —
      // reuse its filtered candidate list. Treat it as if we just did
      // level 0: `anc` gets rebuilt from `indices` on the next filter.
      indices = cached;
      anc = null;
      candCount = cached.length;
    } else if (indices === null) {
      indices = indicesForFragment(
        frag,
        frag.selectorString,
        selectorData,
        rootId
      );
      candCount = indices.length;
      rootChain.set(selector, indices);
    } else {
      const ancBits = bitsForFragment(
        frag,
        frag.selectorString,
        selectorData,
        rootId
      );
      // On the first ancestor step (or right after a cache hit) `anc`
      // doesn't exist yet — read from the read-only `indices` array and
      // write survivors into a fresh `anc`. From then on `anc` is our own
      // mutable buffer and we filter it in place.
      const source = anc === null ? indices : anc;
      if (anc === null) {
        anc = new Int32Array(candCount);
      }
      candCount = advanceAndFilter(anc, source, candCount, parentOf, ancBits);
      // Save a snapshot so the next target that reaches this same chain
      // string can jump straight here instead of redoing the walk.
      rootChain.set(selector, anc.slice(0, candCount));
    }

    // Move up to the parent for the next iteration. `curElm` uses the DOM
    // (`parentElement`) because measuring showed that's actually faster
    // than looking up `parentOf[curIdx]` and then converting back to an
    // Element via `perNode[idx].elm`. `curIdx` is kept in sync so
    // `computeFragment`'s per-nodeIdx cache stays hot.
    curElm = curElm.parentElement;
    curIdx = curElm ? elmToIdx.get(curElm) : -1;
    if (curIdx === undefined) {
      curIdx = -1;
    }
    // Node type 11 is DocumentFragment (the parent of `<html>` in a
    // main document, or a shadow root's virtual parent). Reaching it
    // means we've walked past the outermost element and there's
    // nowhere further up to add specificity from.
  } while ((candCount > 1 || toRoot) && curElm && curElm.nodeType !== 11);

  if (candCount === 1) {
    return selector;
  } else if (selector.indexOf(' > ') !== -1) {
    return ':root' + selector.substring(selector.indexOf(' > '));
  }
  return ':root';
}
