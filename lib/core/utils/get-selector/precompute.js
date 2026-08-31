import escapeSelector from '../escape-selector';
import getNodeAttributes from '../get-node-attributes';
import { getAttributeNameValue, filterAttributes } from './attr-format';
import { getBaseSelector } from './features';
import { listToBits } from './bit-index';

/**
 * Look up (or build on first use) the `child element -> 1-indexed position`
 * map for `domParent`. Building it once per parent keeps the sibling walk
 * linear across a parent with many children; `indexOf` per element would
 * be O(N^2).
 *
 * @param {Element} domParent
 * @param {Map}     cache        WeakMap<Element, Map<Element, Number>>
 * @returns {Map<Element, Number>}
 */
function nthChildMap(domParent, cache) {
  let nthMap = cache.get(domParent);
  if (!nthMap) {
    nthMap = new Map();
    const kids = domParent.children;
    for (let k = 0; k < kids.length; k++) {
      nthMap.set(kids[k], k + 1);
    }
    cache.set(domParent, nthMap);
  }
  return nthMap;
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
    const info = getAttributeNameValue(node, at);
    if (!info) {
      continue;
    }
    const { atnv, isSuffix, rawName, suffix } = info;

    if (isSuffix) {
      // Href/src attributes are selected in CSS by URL suffix (`[href$="X"]`
      // means "any element whose href ends with X"). We can't precompute
      // that as a lookup table — every possible suffix would need its own
      // entry. Instead, stash the raw value here and check `endsWith` when
      // the query actually happens.
      //
      // urlAttrs must be populated unconditionally (not gated on the filter
      // below): suffix matching is many-to-one, so a value too long to be
      // a feature on THIS element can still match some other node's
      // `[href$="…"]` fragment.
      if (!urlAttrs) {
        urlAttrs = {};
      }
      urlAttrs[rawName] = at.value;
      if (!data._suffixInfo.has(atnv)) {
        data._suffixInfo.set(atnv, { rawName, suffix });
      }
    }
    // Only "interesting" attributes (short values, not on the ignored list)
    // count toward the per-page attribute frequency. Those counts drive
    // which features get picked for the selector, so the filter has to
    // match what feature selection expects.
    //
    // The exact-atnv reverse index is gated behind the same filter: an
    // attribute that can never be picked as a feature can never be
    // queried through `_attrBits`, so indexing it would only bloat memory.
    // Same atnv implies same name+value, so the filter verdict is the
    // same for every occurrence.
    if (filterAttributes(at)) {
      if (data.attributes[atnv]) {
        data.attributes[atnv]++;
      } else {
        data.attributes[atnv] = 1;
      }
      attrsForNode.push(atnv);
      if (!isSuffix) {
        matchAttrsForNode.push(atnv);
        let list = attrLists.get(atnv);
        if (!list) {
          list = [];
          attrLists.set(atnv, list);
        }
        list.push(nodeIdx);
      }
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
    // For every suffix-form atnv we've seen (e.g. `href$="foo"`), the raw
    // attribute name and suffix string that would need to be checked
    // against `urlAttrs` at match time. Populated in `collectNodeAttrs`.
    // Read in `computeFragment` to split fragment features into exact vs
    // suffix without sniffing `$="` inside the atnv (which misfires when
    // the attribute name itself ends in `$`).
    _suffixInfo: new Map(),
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
  // Per-parent map of "which position among element siblings is each
  // child?". Built once per parent that has at least one indexed child —
  // avoids a linear `indexOf` per element, which is O(N^2) across a
  // parent with many children.
  const nthIndexCache = new Map();

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
          nthChild = nthChildMap(domParent, nthIndexCache).get(node) || 0;
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

  for (const [k, v] of tagLists) {
    data._tagBits[k] = listToBits(v, wordCount);
  }
  for (const [k, v] of classLists) {
    data._classBits[k] = listToBits(v, wordCount);
  }
  for (const [k, v] of attrLists) {
    data._attrBits[k] = listToBits(v, wordCount);
  }
  for (let r = 0; r < rootLists.length; r++) {
    data._rootBits[r] = listToBits(rootLists[r] || [], wordCount);
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
