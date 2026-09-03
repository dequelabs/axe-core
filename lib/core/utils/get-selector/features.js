import escapeSelector from '../escape-selector';
import isXHTML from '../is-xhtml';

/*
 * Picks which classes / attributes go into a selector fragment for a
 * given element, and answers "does this element have a usable id?".
 * Read-only against the precomputed data in `precompute.js`.
 *
 * FEATURE. A candidate piece of a selector: a class or an attribute
 * that's rare enough on this page to be worth including. Shape:
 *
 *     { name: String, count: Number, species: 'class' | 'attribute' }
 *
 * `name` is the rendered form (`cta` or `data-x="1"`), `count` is how
 * many elements on the page have it, `species` is the kind — which
 * drives how it gets emitted (`.name` vs `[name]`).
 *
 * UNCOMMON = appears on FEWER elements than this element's tag does.
 * The heuristic: if a class shows up more often than the tag itself,
 * putting it in the selector doesn't narrow the candidate set — the
 * tag alone would do at least as well. So we skip it. `uncommonClasses`
 * and `uncommonAttributes` produce the sorted (rarest-first) lists of
 * survivors; `getThreeLeastCommonFeatures` picks up to three from them.
 *
 * `selectorData` is the object `precompute.js` returned from
 * `getSelectorData`; every function here reads its fields but writes
 * nothing.
 */

function countSort(a, b) {
  return a.count < b.count ? -1 : a.count === b.count ? 0 : 1;
}

/**
 * Return the base CSS selector for a given element
 * @param  {HTMLElement} elm      The element to get the selector for
 * @return {String}               Base CSS selector for the node
 */
export function getBaseSelector(elm) {
  const xhtml = isXHTML(document);
  return escapeSelector(xhtml ? elm.localName : elm.nodeName.toLowerCase());
}

/**
 * Return the element's classes that appear less often on the page than its
 * own tag does — i.e. the ones that would actually narrow a selector down.
 * Sorted rarest-first so the caller can pick the most distinctive ones.
 *
 * @param {Element} node
 * @param {Object}  selectorData
 * @returns {Array<{name: String, count: Number, species: 'class'}>}
 */
function uncommonClasses(node, selectorData) {
  const retVal = [];
  const idx = selectorData._elmToIdx.get(node);
  if (idx === undefined) {
    return retVal;
  }
  const rec = selectorData._perNode[idx];
  const classData = selectorData.classes;
  const tagCount = selectorData.tags[rec.nodeName];
  for (let i = 0; i < rec.classes.length; i++) {
    const name = rec.classes[i];
    const count = classData[name];
    if (count < tagCount) {
      retVal.push({ name, count, species: 'class' });
    }
  }
  return retVal.sort(countSort);
}

/**
 * Same idea as `uncommonClasses`, but for `name="value"` attributes: the
 * ones that appear less often than this element's tag, so they're worth
 * putting in a selector.
 *
 * @param {Element} node
 * @param {Object}  selectorData
 * @returns {Array<{name: String, count: Number, species: 'attribute'}>}
 */
function uncommonAttributes(node, selectorData) {
  const retVal = [];
  const idx = selectorData._elmToIdx.get(node);
  if (idx === undefined) {
    return retVal;
  }
  const rec = selectorData._perNode[idx];
  const attrData = selectorData.attributes;
  const tagCount = selectorData.tags[rec.nodeName];
  for (let i = 0; i < rec.attrs.length; i++) {
    const name = rec.attrs[i];
    const count = attrData[name];
    if (count < tagCount) {
      retVal.push({ name, count, species: 'attribute' });
    }
  }
  return retVal.sort(countSort);
}

/**
 * If this element's `id` uniquely identifies it in its root, return the
 * `#id` selector string. Otherwise return `undefined` so the caller falls
 * back to tag/class/attribute features.
 *
 * We answer the "is it unique?" question from the precomputed count table
 * built in `getSelectorData` rather than a `querySelectorAll('#id')` at
 * this point — same answer, no DOM round-trip.
 *
 * @param {Element} elm
 * @returns {String|undefined}  `#id` if usable, otherwise undefined
 */
export function getElmId(elm) {
  if (!elm.getAttribute('id')) {
    return;
  }
  const id = '#' + escapeSelector(elm.getAttribute('id') || '');
  // YouTube regenerates these on every page load, so an id-based selector
  // wouldn't work the next time the page is checked. Skip them.
  if (id.match(/player_uid_/)) {
    return;
  }
  const selectorData = axe._selectorData;
  const root = (elm.getRootNode && elm.getRootNode()) || document;
  const rootId = selectorData._rootMap.get(root);
  if (rootId === undefined) {
    return;
  }
  return selectorData._idCounts[rootId][id] === 1 ? id : undefined;
}

/**
 * Pick up to three of the page-rarest features (classes, attributes) on
 * the element and assemble a selector string that describes them, adding
 * the tag when there's no class among the picks. Returns the string
 * alongside the structured pieces (tag flag + list of features) so
 * match-time code can use them without re-parsing.
 *
 * @param {Element} elm
 * @param {Object}  selectorData  from `getSelectorData`
 * @returns {{selector: String, tag: (String|null), features: Array}}
 */
export function getThreeLeastCommonFeatures(elm, selectorData) {
  let features;
  let hasTag = false;
  const clss = uncommonClasses(elm, selectorData);
  const atts = uncommonAttributes(elm, selectorData);

  if (clss.length && clss[0].count === 1) {
    // A class unique on the whole page IS the selector — no need for
    // a tag or anything else. Same for attributes below.
    features = [clss[0]];
  } else if (atts.length && atts[0].count === 1) {
    features = [atts[0]];
    // Attribute-only fragments read poorly (`[data-x="1"]` vs
    // `button[data-x="1"]`), so put the tag back in front.
    hasTag = true;
  } else {
    features = clss.concat(atts).sort(countSort).slice(0, 3);

    if (!features.some(feat => feat.species === 'class')) {
      hasTag = true;
    } else {
      // Classes first, attributes after — `button.foo[data-x="1"]`
      // rather than `button[data-x="1"].foo`. Matches how humans
      // typically write CSS and what browser devtools display.
      features.sort((a, b) => {
        return a.species !== b.species && a.species === 'class'
          ? -1
          : a.species === b.species
            ? 0
            : 1;
      });
    }
  }

  // construct the return value
  const tag = hasTag ? getBaseSelector(elm) : null;
  let selector = tag || '';
  for (const feat of features) {
    selector +=
      feat.species === 'class' ? '.' + feat.name : '[' + feat.name + ']';
  }
  return { selector, tag, features };
}
