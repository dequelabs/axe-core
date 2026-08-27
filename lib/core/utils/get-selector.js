/* eslint-disable no-bitwise -- bitset intersection and bit-testing are
   inherent to the fast uniqueness check; disabling scoped to this file
   keeps the algorithm readable without per-line pragmas. */
import escapeSelector from './escape-selector';
import getFriendlyUriEnd from './get-friendly-uri-end';
import getNodeAttributes from './get-node-attributes';
import isXHTML from './is-xhtml';
import getShadowSelector from './get-shadow-selector';
import memoize from './memoize';

const ignoredAttributes = [
  'class',
  'style',
  'id',
  'selected',
  'checked',
  'disabled',
  'tabindex',
  'aria-checked',
  'aria-selected',
  'aria-invalid',
  'aria-activedescendant',
  'aria-busy',
  'aria-disabled',
  'aria-expanded',
  'aria-grabbed',
  'aria-pressed',
  'aria-valuenow',
  'xmlns'
];

const MAXATTRIBUTELENGTH = 31;
const attrCharsRegex = /([\\"])/g;
// C0 control characters (U+0000–U+001F) and DEL (U+007F) cannot appear raw
// inside a CSS string. In particular the CSS newlines U+000A, U+000C (form
// feed) and U+000D terminate the string, producing an invalid selector that
// throws in `Element.matches`. Escape each as a CSS numeric escape (`\<hex> `).
const controlCharsRegex = /[\u0000-\u001f\u007f]/g;

/**
 * Escape an attribute selector string.
 * @param {String} str
 * @return {String}
 */
function escapeAttribute(str) {
  return (
    str
      // @see https://www.py4u.net/discuss/286669
      .replace(attrCharsRegex, '\\$1')
      // @see https://stackoverflow.com/a/20354013/2124254
      .replace(
        controlCharsRegex,
        char => '\\' + char.charCodeAt(0).toString(16) + ' '
      )
  );
}

/**
 * get the attribute name and value as a string
 * @param {Element} node		The element that has the attribute
 * @param {Attribute} at		The attribute
 * @return {String}
 */
function getAttributeNameValue(node, at) {
  const name = at.name;
  let atnv;

  if (name.indexOf('href') !== -1 || name.indexOf('src') !== -1) {
    const friendly = getFriendlyUriEnd(node.getAttribute(name));
    if (friendly) {
      atnv = escapeSelector(at.name) + '$="' + escapeAttribute(friendly) + '"';
    } else {
      atnv =
        escapeSelector(at.name) +
        '="' +
        escapeAttribute(node.getAttribute(name)) +
        '"';
    }
  } else {
    atnv = escapeSelector(name) + '="' + escapeAttribute(at.value) + '"';
  }
  return atnv;
}

function countSort(a, b) {
  return a.count < b.count ? -1 : a.count === b.count ? 0 : 1;
}

/**
 * Filter the attributes
 * @param {Attribute}		The potential attribute
 * @return {Boolean}		 Whether to include or exclude
 */
function filterAttributes(at) {
  return (
    !ignoredAttributes.includes(at.name) &&
    at.name.indexOf(':') === -1 &&
    (!at.value || at.value.length < MAXATTRIBUTELENGTH)
  );
}

/**
 * Read every attribute on the node and record it in several places so later
 * lookups don't have to touch the DOM again:
 *
 *   - `data.attributes` — running counts across the whole page, one per
 *     `name="value"` string. Used later to pick "uncommon" features.
 *   - `attrsForNode` / `matchAttrsForNode` — per-element lists of the
 *     `name="value"` strings this element has.
 *   - `attrLists` — for each `name="value"` string, which nodes have it.
 *     This is what we later flip into the fast lookup tables.
 *
 * Returns `urlAttrs`, a map of raw href/src values keyed by attribute name,
 * or null if this element has none. Href/src attributes match by "does the
 * URL end with this string?" — not by exact equality — so we keep the raw
 * value around to check that at query time.
 *
 * @param {Element} node
 * @param {Number}  nodeIdx             this element's node index
 * @param {Object}  data                the object being built by `getSelectorData`
 * @param {Map}     attrLists           atnv string -> Array<nodeIdx>, populated here
 * @param {Array}   attrsForNode        filter-passing atnvs on this element, populated here
 * @param {Array}   matchAttrsForNode   exact-form atnvs on this element, populated here
 * @returns {Object|null}               `{ [attrName]: rawValue }` for href/src attrs
 */
function collectNodeAttrs(
  node,
  nodeIdx,
  data,
  attrLists,
  attrsForNode,
  matchAttrsForNode
) {
  let urlAttrs = null;
  if (!node.hasAttributes()) {
    return urlAttrs;
  }
  const rawAttrs = getNodeAttributes(node);
  for (let i = 0; i < rawAttrs.length; i++) {
    const at = rawAttrs[i];
    const atnv = getAttributeNameValue(node, at);
    if (!atnv) {
      continue;
    }
    if (atnv.indexOf('$="') !== -1) {
      // Href/src attributes are selected in CSS by URL suffix (`[href$="X"]`
      // means "any element whose href ends with X"). We can't precompute
      // that as a lookup table — every possible suffix would need its own
      // entry. Instead, stash the raw value here and check `endsWith` when
      // the query actually happens.
      if (!urlAttrs) {
        urlAttrs = {};
      }
      urlAttrs[at.name] = at.value;
    } else {
      // Everything else is exact-match: `name="value"` in a selector matches
      // if and only if the element's attribute is byte-for-byte the same. We
      // record which nodes have this exact string so we can look them up
      // directly later.
      matchAttrsForNode.push(atnv);
      let list = attrLists.get(atnv);
      if (!list) {
        list = [];
        attrLists.set(atnv, list);
      }
      list.push(nodeIdx);
    }
    // Only "interesting" attributes (short values, not on the ignored list)
    // count toward the per-page attribute frequency. Those counts drive
    // which features get picked for the selector, so the filter has to
    // match what feature selection expects.
    if (filterAttributes(at)) {
      if (data.attributes[atnv]) {
        data.attributes[atnv]++;
      } else {
        data.attributes[atnv] = 1;
      }
      attrsForNode.push(atnv);
    }
  }
  return urlAttrs;
}

/**
 * Walk the whole page once and record everything the selector generator will
 * ever need to know about it. The point is to move as much work as possible
 * out of the per-element hot path (`generateSelector`, which runs thousands
 * of times per axe.run) and into this one-time setup.
 *
 * @param {Object} domTree		The root node of the virtual DOM tree
 * @returns {Object}					Frequency counts + fast-lookup tables
 */
export function getSelectorData(domTree) {
  const data = {
    // Per-page frequency counts. `getThreeLeastCommonFeatures` reads these
    // to decide which features to build a selector out of.
    classes: {},
    tags: {},
    attributes: {},

    // One record per element in walk order, keyed by a small integer
    // "nodeIdx" that we use everywhere else. Holds enough per-element info
    // that later code never has to touch the DOM: tag, id, classes,
    // attribute strings, position among element siblings, parent's nodeIdx,
    // and which root (main document vs. a specific shadow root) it lives in.
    _perNode: [],
    // Look up an element's nodeIdx from the DOM Element itself.
    _elmToIdx: new WeakMap(),
    // For each tag / class / attribute-value string, a compact bitmap of
    // which nodeIdx values have it. See `bitsForFragment` for how these
    // get used — treating them as bitmaps means "which nodes match all of
    // <tag>, <class>, <attr>?" becomes a fast bit-AND.
    _tagBits: {},
    _classBits: {},
    _attrBits: {},
    // Each shadow root gets its own numeric id, starting at 0 for the main
    // document. `_rootBits[rootId]` is the bitmap of nodes that live in
    // that root. Selectors are always evaluated within a single root
    // (`getShadowSelector` handles crossing shadow boundaries), so we AND
    // this into every match to make sure we don't pull in nodes from other
    // trees that happen to share the same tag/class.
    _rootMap: new Map(),
    _rootBits: [],
    // Id uniqueness is also per-root: `#foo` in the main document is a
    // different id from `#foo` inside some shadow tree. These maps let
    // `getElmId` check "is this id used exactly once in this root?"
    // without a `querySelectorAll('#foo')`.
    _idCounts: [],
    _idToIdx: [],
    // Number of Uint32 words each bitmap needs (ceil(nodeCount / 32)).
    _wordCount: 0
  };

  domTree = Array.isArray(domTree) ? domTree : [domTree];
  let currentLevel = domTree.slice();
  const stack = [];

  // During the walk we don't know the final node count yet, so we can't
  // size the bitmaps. Instead, collect the members as plain arrays and
  // convert them all in one pass at the end.
  const tagLists = new Map();
  const classLists = new Map();
  const attrLists = new Map();
  const rootLists = [];

  const perNode = data._perNode;

  while (currentLevel.length) {
    const current = currentLevel.pop();
    const node = current.actualNode;

    if (!!node.querySelectorAll) {
      // ignore #text nodes

      const root =
        typeof node.getRootNode === 'function' ? node.getRootNode() : document;
      let rootId = data._rootMap.get(root);
      if (rootId === undefined) {
        rootId = data._rootMap.size;
        data._rootMap.set(root, rootId);
        rootLists[rootId] = [];
        data._idCounts[rootId] = {};
        data._idToIdx[rootId] = {};
      }

      // Tally per-page frequency counts. These feed feature selection.
      const nodeName = node.nodeName;
      if (data.tags[nodeName]) {
        data.tags[nodeName]++;
      } else {
        data.tags[nodeName] = 1;
      }
      // `nodeName` is uppercase in HTML but selector strings are lowercase
      // (`button`, not `BUTTON`). Store both forms — one to key the
      // frequency map so `uncommonClasses` etc. can look up counts, and
      // one to key the tag bitmap so match-time comparisons don't need
      // any case conversion.
      const tagSel = getBaseSelector(node);

      const nodeIdx = perNode.length;
      data._elmToIdx.set(node, nodeIdx);

      const classesForNode = [];
      if (node.classList) {
        for (const cl of node.classList) {
          const ind = escapeSelector(cl);
          if (data.classes[ind]) {
            data.classes[ind]++;
          } else {
            data.classes[ind] = 1;
          }
          classesForNode.push(ind);
          let list = classLists.get(ind);
          if (!list) {
            list = [];
            classLists.set(ind, list);
          }
          list.push(nodeIdx);
        }
      }

      const attrsForNode = []; // filter-passing atnvs — used by uncommonAttributes
      const matchAttrsForNode = []; // every exact atnv — used by fragment matching
      const urlAttrs = collectNodeAttrs(
        node,
        nodeIdx,
        data,
        attrLists,
        attrsForNode,
        matchAttrsForNode
      );

      let tagList = tagLists.get(tagSel);
      if (!tagList) {
        tagList = [];
        tagLists.set(tagSel, tagList);
      }
      tagList.push(nodeIdx);

      // Build the id in the same escaped `#id` form that `getElmId`
      // returns, and count it separately for each shadow root (an id can
      // legitimately be reused across shadow trees).
      let idSelector = null;
      const rawId = node.getAttribute && node.getAttribute('id');
      if (rawId) {
        idSelector = '#' + escapeSelector(rawId);
        const rootIds = data._idCounts[rootId];
        rootIds[idSelector] = (rootIds[idSelector] || 0) + 1;
        data._idToIdx[rootId][idSelector] = nodeIdx;
      }

      rootLists[rootId].push(nodeIdx);

      // Precompute two things `generateSelector` uses in its hot loop:
      // the parent's nodeIdx (so we can walk up without touching the DOM),
      // and the element's 1-indexed position among its element siblings
      // (what `:nth-child(N)` uses). Disconnected nodes get 0/-1.
      const domParent = node.parentNode;
      let parentIdx = -1;
      let nthChild = 0;
      if (domParent) {
        const pIdx = data._elmToIdx.get(domParent);
        if (pIdx !== undefined) {
          parentIdx = pIdx;
        }
        if (domParent.children) {
          nthChild = 1 + Array.prototype.indexOf.call(domParent.children, node);
        }
      }

      perNode.push({
        elm: node,
        // Two tag fields for two purposes: `nodeName` (uppercase HTML)
        // keys the `data.tags` frequency map that feature selection reads,
        // and `tag` (lowercase HTML / preserved XHTML) is what selectors
        // actually look like, so match-time comparisons don't need
        // toLowerCase.
        nodeName,
        tag: tagSel,
        id: idSelector,
        classes: classesForNode,
        attrs: attrsForNode,
        matchAttrs: matchAttrsForNode,
        urlAttrs, // { attrName: rawValue } for href/src-family attrs, or null
        nthChild,
        parentIdx,
        rootId
      });
    }
    if (current.children.length) {
      // "recurse"
      stack.push(currentLevel);
      currentLevel = current.children.slice();
    }
    while (!currentLevel.length && stack.length) {
      currentLevel = stack.pop();
    }
  }

  const nodeCount = perNode.length;
  // Each bitmap needs one bit per node, packed 32 to a Uint32.
  const wordCount = Math.max(1, Math.ceil(nodeCount / 32));
  data._wordCount = wordCount;

  // Turn a list of nodeIdx values into a Uint32Array where bit N is set if
  // node N is in the list. `j >>> 5` picks the Uint32 word, `j & 31` picks
  // the bit within that word.
  const listToBits = list => {
    const bits = new Uint32Array(wordCount);
    for (let i = 0; i < list.length; i++) {
      const j = list[i];
      bits[j >>> 5] |= 1 << (j & 31);
    }
    return bits;
  };

  for (const [k, v] of tagLists) {
    data._tagBits[k] = listToBits(v);
  }
  for (const [k, v] of classLists) {
    data._classBits[k] = listToBits(v);
  }
  for (const [k, v] of attrLists) {
    data._attrBits[k] = listToBits(v);
  }
  for (let r = 0; r < rootLists.length; r++) {
    data._rootBits[r] = listToBits(rootLists[r] || []);
  }

  // Copy the per-node parentIdx values into a flat typed array. Typed-array
  // reads are meaningfully cheaper than `perNode[i].parentIdx` in the
  // per-candidate loop that walks up the tree — every microsecond saved
  // there shows up in the perf numbers on large pages.
  const parentOf = new Int32Array(nodeCount);
  for (let i = 0; i < nodeCount; i++) {
    parentOf[i] = perNode[i].parentIdx;
  }
  data._parentOf = parentOf;

  // Ids that turned out to appear more than once in their root aren't
  // usable as unique selectors, so drop them from the "id -> node" map.
  // We still keep the counts around because `getElmId` reads them.
  for (let r = 0; r < data._idToIdx.length; r++) {
    const counts = data._idCounts[r];
    const map = data._idToIdx[r];
    for (const key in map) {
      if (counts[key] !== 1) {
        delete map[key];
      }
    }
  }

  return data;
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
function getElmId(elm) {
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
 * Return the base CSS selector for a given element
 * @param	{HTMLElement} elm				 The element to get the selector for
 * @return {String|Array<String>}	Base CSS selector for the node
 */
function getBaseSelector(elm) {
  const xhtml = isXHTML(document);
  return escapeSelector(xhtml ? elm.localName : elm.nodeName.toLowerCase());
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
function getThreeLeastCommonFeatures(elm, selectorData) {
  let features;
  let hasTag = false;
  const clss = uncommonClasses(elm, selectorData);
  const atts = uncommonAttributes(elm, selectorData);

  if (clss.length && clss[0].count === 1) {
    // only use the unique class
    features = [clss[0]];
  } else if (atts.length && atts[0].count === 1) {
    // only use the unique attribute value
    features = [atts[0]];
    // if no class, add the tag
    hasTag = true;
  } else {
    features = clss.concat(atts);
    // sort by least common
    features.sort(countSort);

    // select three least common features
    features = features.slice(0, 3);

    // if no class, add the tag
    if (
      !features.some(feat => {
        return feat.species === 'class';
      })
    ) {
      // has no class
      hasTag = true;
    } else {
      // put the classes at the front of the selector
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

/**
 * Given a "fragment" — a single link of a selector, like `button.foo[href$="X"]`
 * broken up into its pieces — check whether the node at `nodeIdx` matches
 * all of it. No combinators (` `, `>`) — one fragment is one element's
 * worth of constraints.
 *
 * This is what powers the sibling check inside `computeFragment` (for
 * :nth-child) and any per-candidate check the caller wants to do. When we
 * need to find *all* matching nodes at once, `bitsForFragment` is faster
 * because it works on bitmaps.
 *
 * @param {Object} fragment  { id?, tag?, classes?, exactAttrs?, suffixAttrs?, nthChild? }
 * @param {Number} nodeIdx
 * @param {Array}  perNode   per-node records from `getSelectorData`
 * @returns {Boolean}
 */
function fragmentMatchesIdx(fragment, nodeIdx, perNode) {
  const rec = perNode[nodeIdx];
  if (fragment.id) {
    return rec.id === fragment.id;
  }
  // Both sides store the tag in the same lowercased form, so we can just
  // string-compare.
  if (fragment.tag && rec.tag !== fragment.tag) {
    return false;
  }
  if (fragment.classes) {
    for (let i = 0; i < fragment.classes.length; i++) {
      if (rec.classes.indexOf(fragment.classes[i]) === -1) {
        return false;
      }
    }
  }
  if (fragment.exactAttrs) {
    const recAttrs = rec.matchAttrs;
    for (let i = 0; i < fragment.exactAttrs.length; i++) {
      if (recAttrs.indexOf(fragment.exactAttrs[i]) === -1) {
        return false;
      }
    }
  }
  if (fragment.suffixAttrs && !matchesSuffixAttrs(rec, fragment.suffixAttrs)) {
    return false;
  }
  if (
    typeof fragment.nthChild === 'number' &&
    rec.nthChild !== fragment.nthChild
  ) {
    return false;
  }
  return true;
}

/**
 * `[href$="X"]` (and `[src$="X"]`) don't work as exact-string lookups —
 * two different URLs can both end with the same suffix. So we can't
 * precompute a bitmap for these; we have to compare the raw stored URL
 * against the wanted suffix at query time. This does that check for one
 * node.
 *
 * @param {Object} rec           per-node record
 * @param {Array}  suffixAttrs   [{name, suffix}, ...]
 * @returns {Boolean}
 */
function matchesSuffixAttrs(rec, suffixAttrs) {
  const urls = rec.urlAttrs;
  if (!urls) {
    return false;
  }
  for (let s = 0; s < suffixAttrs.length; s++) {
    const raw = urls[suffixAttrs[s].name];
    if (typeof raw !== 'string' || !raw.endsWith(suffixAttrs[s].suffix)) {
      return false;
    }
  }
  return true;
}

/**
 * `bitsForFragment` and `indicesForFragment` are two views of the same
 * question ("which nodes match this fragment?"): one returns a bitmap,
 * the other returns an array of nodeIdx. Both are expensive enough that
 * we cache them, and both want the same cache key: `(rootId, fragment
 * string)`. So they share one entry with two lazy fields.
 *
 * @param {Object} selectorData
 * @param {Number} rootId
 * @param {String} key             fragment.selectorString
 * @returns {Object}               entry object with lazy `bits` and `indices` fields
 */
function getMatchCacheEntry(selectorData, rootId, key) {
  let cache = selectorData._matchCache;
  if (!cache) {
    cache = selectorData._matchCache = [];
  }
  let rootCache = cache[rootId];
  if (!rootCache) {
    rootCache = cache[rootId] = {};
  }
  let entry = rootCache[key];
  if (!entry) {
    entry = rootCache[key] = {};
  }
  return entry;
}

/**
 * Return a bitmap where bit N is set if node N matches this fragment.
 * `null` means no matches at all.
 *
 * The reason we do this at all: `generateSelector` needs to walk up
 * ancestors and ask "does this parent match the parent fragment?" over and
 * over. If we have both the "candidate" set and the "matches parent
 * fragment" set as bitmaps, "keep candidates whose parent matches" is one
 * bit-test per candidate — much faster than running the CSS engine.
 *
 * @param {Object}      fragment
 * @param {String}      key          fragment.selectorString, cache key
 * @param {Object}      selectorData
 * @param {Number}      rootId       restrict matches to this root
 * @returns {Uint32Array|null}
 */
function bitsForFragment(fragment, key, selectorData, rootId) {
  const entry = getMatchCacheEntry(selectorData, rootId, key);
  if ('bits' in entry) {
    return entry.bits;
  }

  const perNode = selectorData._perNode;
  const wordCount = selectorData._wordCount;

  // An id, if it made it into the fragment, is already known to be unique
  // in its root — so exactly one bit is ever set. Skip the full intersect.
  if (fragment.id) {
    const idx = selectorData._idToIdx[rootId][fragment.id];
    if (idx === undefined) {
      entry.bits = null;
      return null;
    }
    const bits = new Uint32Array(wordCount);
    bits[idx >>> 5] |= 1 << (idx & 31);
    entry.bits = bits;
    return bits;
  }

  // "Which nodes have this tag AND this class AND this attribute?" is
  // a bit-AND across the individual bitmaps. Start empty, copy in the
  // first source, AND every subsequent one. If any feature has no bitmap
  // at all (e.g. no node on the page has this class), the result is
  // definitely empty — bail early.
  const bits = new Uint32Array(wordCount);
  let seeded = false;

  const applyBits = src => {
    if (!seeded) {
      bits.set(src);
      seeded = true;
    } else {
      for (let w = 0; w < wordCount; w++) {
        bits[w] &= src[w];
      }
    }
  };

  if (fragment.tag) {
    const src = selectorData._tagBits[fragment.tag];
    if (!src) {
      entry.bits = null;
      return null;
    }
    applyBits(src);
  }

  if (fragment.classes) {
    for (let i = 0; i < fragment.classes.length; i++) {
      const src = selectorData._classBits[fragment.classes[i]];
      if (!src) {
        entry.bits = null;
        return null;
      }
      applyBits(src);
    }
  }

  if (fragment.exactAttrs) {
    for (let i = 0; i < fragment.exactAttrs.length; i++) {
      const src = selectorData._attrBits[fragment.exactAttrs[i]];
      if (!src) {
        entry.bits = null;
        return null;
      }
      applyBits(src);
    }
  }

  // A selector generated against `document` shouldn't match elements
  // inside some shadow root (and vice versa) — the browser wouldn't. AND
  // in the "which nodes live in the target's root" bitmap so cross-root
  // matches drop out.
  const rootBits = selectorData._rootBits[rootId];
  if (rootBits) {
    if (!seeded) {
      bits.set(rootBits);
      seeded = true;
    } else {
      for (let w = 0; w < wordCount; w++) {
        bits[w] &= rootBits[w];
      }
    }
  }

  if (!seeded) {
    entry.bits = null;
    return null;
  }

  // `:nth-child(N)` and `[href$="X"]` can't be answered by bitmap intersect
  // — they'd need a bitmap per nth-child position and per URL suffix. So
  // walk the currently-set bits and drop any that don't match. Only runs
  // when the fragment actually has one of these — most don't.
  //
  // The inner-loop bit tricks: `word & -word` isolates the lowest set bit
  // (as a value with just that bit); `31 - Math.clz32(lsb)` turns that
  // back into a bit index; `word ^= lsb` clears the bit so the next
  // iteration finds the next one up.
  const nth = typeof fragment.nthChild === 'number' ? fragment.nthChild : -1;
  const suffixAttrs = fragment.suffixAttrs;
  if (nth !== -1 || suffixAttrs) {
    for (let w = 0; w < wordCount; w++) {
      let word = bits[w];
      let keep = 0;
      while (word !== 0) {
        const lsb = word & -word;
        const bitIdx = 31 - Math.clz32(lsb);
        const nodeIdx = (w << 5) + bitIdx;
        const rec = perNode[nodeIdx];
        const nthOk = nth === -1 || rec.nthChild === nth;
        const suffixOk = !suffixAttrs || matchesSuffixAttrs(rec, suffixAttrs);
        if (nthOk && suffixOk) {
          keep |= lsb;
        }
        word ^= lsb;
      }
      bits[w] = keep;
    }
  }

  entry.bits = bits;
  return bits;
}

/**
 * Walk a bitmap and return the list of nodeIdx values it contains.
 *
 * @param {Uint32Array|null} bits
 * @param {Number}           wordCount   how many Uint32 words `bits` has
 * @returns {Number[]}
 */
function enumerateBits(bits, wordCount) {
  const out = [];
  if (!bits) {
    return out;
  }
  for (let w = 0; w < wordCount; w++) {
    let word = bits[w];
    while (word !== 0) {
      const lsb = word & -word;
      const bitIdx = 31 - Math.clz32(lsb);
      out.push((w << 5) + bitIdx);
      word ^= lsb;
    }
  }
  return out;
}

/**
 * Same "which nodes match this fragment?" question as `bitsForFragment`,
 * but returns the answer as a plain list of nodeIdx. `generateSelector`
 * uses this at the start of a chain walk when it wants to iterate the
 * initial candidate set. We compute the list once and cache it — on
 * pages with lots of repeated structure many targets share the same
 * first fragment.
 *
 * @param {Object} fragment      structured self-fragment from `computeFragment`
 * @param {String} key           fragment.selectorString
 * @param {Object} selectorData
 * @param {Number} rootId
 * @returns {Number[]}           nodeIdx values that match
 */
function indicesForFragment(fragment, key, selectorData, rootId) {
  const entry = getMatchCacheEntry(selectorData, rootId, key);
  if ('indices' in entry) {
    return entry.indices;
  }
  const bits = bitsForFragment(fragment, key, selectorData, rootId);
  entry.indices = enumerateBits(bits, selectorData._wordCount);
  return entry.indices;
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
  // doesn't have to keep scanning for `$="` on every check.
  const classes = [];
  let exactAttrs = null;
  let suffixAttrs = null;
  for (const f of features) {
    if (f.species === 'class') {
      classes.push(f.name);
      continue;
    }
    const sep = f.name.indexOf('$="');
    if (sep === -1) {
      if (!exactAttrs) {
        exactAttrs = [];
      }
      exactAttrs.push(f.name);
    } else {
      if (!suffixAttrs) {
        suffixAttrs = [];
      }
      suffixAttrs.push({
        name: f.name.substring(0, sep),
        suffix: f.name.substring(sep + 3, f.name.length - 1)
      });
    }
  }

  // If any of this element's siblings also match the fragment we just
  // built, the fragment isn't specific enough by itself — we need
  // `:nth-child(N)` to disambiguate. Answered from precomputed data so
  // there's no per-sibling `matchesSelector` call.
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
      if (sibIdx === undefined) {
        continue;
      }
      if (fragmentMatchesIdx(fragmentNoNth, sibIdx, perNode)) {
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
 * One step of the ancestor walk in `generateSelector`. Given a list of
 * candidate nodes and a bitmap of "nodes that match the parent fragment",
 * for each candidate: look at its parent (via `parentOf`) and keep the
 * candidate only if that parent is in the bitmap. Writes the survivors
 * into `anc` (which may be the same array as `source` — in-place is safe
 * because we always write behind the read cursor).
 *
 * @param {Int32Array}         anc       destination buffer
 * @param {Int32Array|Number[]} source   candidates from the previous step
 * @param {Number}             count     number of valid entries in `source`
 * @param {Int32Array}         parentOf  flat table of parent indices
 * @param {Uint32Array|null}   ancBits   parent-fragment match bitmap
 * @returns {Number}                     new candidate count
 */
function advanceAndFilter(anc, source, count, parentOf, ancBits) {
  if (!ancBits) {
    return 0;
  }
  let write = 0;
  for (let i = 0; i < count; i++) {
    const parent = parentOf[source[i]];
    if (parent < 0) {
      continue;
    }
    if (ancBits[parent >>> 5] & (1 << (parent & 31))) {
      anc[write++] = parent;
    }
  }
  return write;
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
function generateSelector(elm, options) {
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
  } while ((candCount > 1 || toRoot) && curElm && curElm.nodeType !== 11);

  if (candCount === 1) {
    return selector;
  } else if (selector.indexOf(' > ') !== -1) {
    return ':root' + selector.substring(selector.indexOf(' > '));
  }
  return ':root';
}

/**
 * Gets a unique CSS selector
 * @param {HTMLElement} node The element to get the selector for
 * @param {Object} optional options
 * @returns {String|Array<String>} Unique CSS selector for the node
 */
function getSelector(elm, options) {
  return getShadowSelector(generateSelector, elm, options);
}

// Axe can call getSelector more than once for the same element because
// the same element can end up on multiple DqElements.
export default memoize(getSelector);
