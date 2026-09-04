import escapeSelector from '../escape-selector';
import isXHTML from '../is-xhtml';

/*
 * Picks which classes / attributes go into a selector fragment for a
 * given element, and answers "does this element have a usable id?".
 * Read-only against the precomputed data in `precompute.js`.
 *
 * FEATURE. A candidate piece of a selector: a class or an attribute
 * that's rare enough on this page to be worth including. See the
 * `Feature` typedef below.
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
 *
 * @typedef {Object} Feature
 * @property {String} name    the rendered form: `cta` for a class,
 *                            `data-x="1"` (an atnv) for an attribute
 * @property {Number} count   how many elements on the page have it
 * @property {'class'|'attribute'} kind   drives how it gets emitted:
 *                            `.name` for a class, `[name]` for an attribute
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
 * @param {Element}      node
 * @param {SelectorData} selectorData
 * @returns {Feature[]}  `kind: 'class'` features, rarest first
 */
function uncommonClasses(node, selectorData) {
  const features = [];
  const nodeIdx = selectorData._elmToIdx.get(node);
  if (nodeIdx === undefined) {
    return features;
  }
  const nodeRecord = selectorData._nodeRecords[nodeIdx];
  const tagCount = selectorData.tags[nodeRecord.nodeName];
  for (let i = 0; i < nodeRecord.classes.length; i++) {
    const name = nodeRecord.classes[i];
    const count = selectorData.classes[name];
    if (count < tagCount) {
      features.push({ name, count, kind: 'class' });
    }
  }
  return features.sort(countSort);
}

/**
 * Same idea as `uncommonClasses`, but for `name="value"` attributes: the
 * ones that appear less often than this element's tag, so they're worth
 * putting in a selector.
 *
 * @param {Element}      node
 * @param {SelectorData} selectorData
 * @returns {Feature[]}  `kind: 'attribute'` features, rarest first
 */
function uncommonAttributes(node, selectorData) {
  const features = [];
  const nodeIdx = selectorData._elmToIdx.get(node);
  if (nodeIdx === undefined) {
    return features;
  }
  const nodeRecord = selectorData._nodeRecords[nodeIdx];
  const attrCounts = selectorData.attributes;
  const tagCount = selectorData.tags[nodeRecord.nodeName];
  for (let i = 0; i < nodeRecord.featureAttrs.length; i++) {
    const name = nodeRecord.featureAttrs[i];
    const count = attrCounts[name];
    if (count < tagCount) {
      features.push({ name, count, kind: 'attribute' });
    }
  }
  return features.sort(countSort);
}

/**
 * If this element's `id` uniquely identifies it in its root, return the
 * `#id` selector string. Otherwise return `undefined` so the caller falls
 * back to tag/class/attribute features.
 *
 * For nodes `getSelectorData` recorded, `_idToIdx` answers this: it only
 * holds ids that resolve to exactly one node in their root, so "does this
 * id map back to *this* element?" is the same question as
 * `querySelectorAll('#id')` returning just us, with no DOM round-trip.
 * It has to be `_idToIdx` and not the `_idCounts` tally, because
 * `bitsForFragment` resolves an `#id` fragment through `_idToIdx` — an id
 * we vend that it can't resolve would collapse the candidate list to
 * nothing.
 *
 * For nodes never recorded, the precomputed tables don't include this
 * element at all, so we verify against the live DOM instead.
 *
 * @param {Element} elm
 * @returns {String|undefined}  `#id` if usable, otherwise undefined
 */
export function getElmId(elm) {
  const id = idSelector(elm);
  if (!id) {
    return;
  }

  const selectorData = axe._selectorData;
  const root = (elm.getRootNode && elm.getRootNode()) || document;
  const rootId = selectorData._rootMap.get(root);
  const nodeIdx = selectorData._elmToIdx.get(elm);
  if (rootId === undefined || nodeIdx === undefined) {
    return root.querySelectorAll(id).length === 1 ? id : undefined;
  }

  return selectorData._idToIdx[rootId][id] === nodeIdx ? id : undefined;
}

/**
 * Escaped `#id` if the element has an id we're willing to use.
 * YouTube regenerates `player_uid_` ids on every page load, so an
 * id-based selector wouldn't work the next time the page is checked.
 *
 * @param {Element} elm
 * @returns {String|undefined}
 */
function idSelector(elm) {
  const rawId = elm.getAttribute && elm.getAttribute('id');
  if (!rawId) {
    return;
  }
  const id = '#' + escapeSelector(rawId);
  if (id.match(/player_uid_/)) {
    return;
  }
  return id;
}

/**
 * Pick up to three of the page-rarest features (classes, attributes) on
 * the element and assemble a selector string that describes them, adding
 * the tag when there's no class among the picks. Returns the string
 * alongside the structured pieces (tag flag + list of features) so
 * match-time code can use them without re-parsing.
 *
 * @param {Element}      elm
 * @param {SelectorData} selectorData  from `getSelectorData`
 * @returns {{selectorString: String, tag: (String|null), features: Feature[]}}
 */
export function getThreeLeastCommonFeatures(elm, selectorData) {
  let features;
  let hasTag = false;
  const classFeatures = uncommonClasses(elm, selectorData);
  const attrFeatures = uncommonAttributes(elm, selectorData);

  if (classFeatures.length && classFeatures[0].count === 1) {
    // A class unique on the whole page IS the selector — no need for
    // a tag or anything else. Same for attributes below.
    features = [classFeatures[0]];
  } else if (attrFeatures.length && attrFeatures[0].count === 1) {
    features = [attrFeatures[0]];
    // Attribute-only fragments read poorly (`[data-x="1"]` vs
    // `button[data-x="1"]`), so put the tag back in front.
    hasTag = true;
  } else {
    features = classFeatures.concat(attrFeatures).sort(countSort).slice(0, 3);

    if (!features.some(feature => feature.kind === 'class')) {
      hasTag = true;
    } else {
      // Classes first, attributes after — `button.foo[data-x="1"]`
      // rather than `button[data-x="1"].foo`. Matches how humans
      // typically write CSS and what browser devtools display.
      features.sort((a, b) => {
        return a.kind !== b.kind && a.kind === 'class'
          ? -1
          : a.kind === b.kind
            ? 0
            : 1;
      });
    }
  }

  // construct the return value
  const tag = hasTag ? getBaseSelector(elm) : null;
  let selectorString = tag || '';
  for (const feature of features) {
    selectorString +=
      feature.kind === 'class' ? '.' + feature.name : '[' + feature.name + ']';
  }
  return { selectorString, tag, features };
}
