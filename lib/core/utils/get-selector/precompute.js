import escapeSelector from '../escape-selector';
import getNodeAttributes from '../get-node-attributes';
import { getAttributeNameValue, filterAttributes } from './attr-format';
import { getBaseSelector } from './features';
import { listToBits } from './bit-index';

/*
 * One pass over the DOM at `axe.setup()` time, producing every lookup
 * table that `generate.js` and `bit-index.js` read later.
 *
 * The point: shift work OUT of the per-element hot path
 * (`generateSelector` runs thousands of times per `axe.run`) and INTO
 * this one-time walk. Anything a selector query might need to know
 * about an element should be a memory lookup after this file runs,
 * not a DOM traversal.
 *
 * INPUT: `domTree` — axe's virtual DOM tree (built earlier by
 * `getFlattenedTree`). Each entry is a `VirtualNode` wrapping a real
 * DOM Element; `current.actualNode` is the Element, `current.children`
 * is the virtual children.
 *
 * The walks are iterative (not recursive) because deeply-nested pages
 * would blow the call stack — `currentLevel` holds the frontier we're
 * popping from, `stack` holds the parent frontiers we'll return to
 * after diving into a subtree. Parents are recorded before children
 * so `parentIdxOf` can resolve the parent from `_elmToIdx`.
 *
 * DROPPED DOM. Flatten-tree drops several classes of element:
 * unslotted light-DOM children of a shadow host, the `<slot>`
 * elements themselves, slot fallback content when a slot has assigned
 * nodes, and whatever gets added to that list next. All of them are
 * invisible to axe's rule pipeline (`select(...)` never returns them,
 * no rule ever reports them) so they never get a selector generated
 * FOR them — but they still exist for `querySelectorAll`, so a
 * fragment that looks unique against the flat tree ("1 img matches
 * `img[src="x.png"]`") could still match two elements in the live DOM
 * and the returned selector would resolve to the wrong one.
 *
 * Rather than enumerate the drop-sites and revisit this file every
 * time flatten-tree changes, the second pass is exhaustive by
 * construction: for each root in `_rootMap`, iterate
 * `root.querySelectorAll('*')` and record any element the flat-tree
 * walk missed. `querySelectorAll` returns document order, so an
 * element's parent is always already recorded — real, or phantom from
 * earlier in the same pass — and parent lookup works uniformly.
 *
 * Phantoms get a full `_nodeRecords` entry (same shape as flat-tree
 * nodes, so downstream code treats them uniformly) and go into
 * `_elmToIdx` too, so chain-walking resolves through unslotted
 * subtrees and slot fallback markup alike. The one table they stay
 * OUT of is `_idToIdx`, which is what `getElmId` reads — that gate is
 * what stops a selector query from routing to an element axe never
 * reasoned about.
 *
 * PIPELINE. `getSelectorData` is five named steps:
 *   1. `createIndexState`       — empty `selectorData` + accumulators
 *   2. `walkFlatTree`           — record every flattened-tree element
 *   3. `seedPhantomsFromRoots`  — record what flatten-tree dropped
 *   4. `repairMissingParents`   — re-resolve `parentIdx: -1` records
 *   5. `buildIndexes`           — lists → bitmaps, flatten `_parentOf`,
 *                                 drop non-unique ids from `_idToIdx`
 *
 * Flat-tree and phantom nodes share `indexElement` (counts, lists,
 * NodeRecord). They differ only in routing: flat-tree nodes populate
 * `_idToIdx`, phantoms don't.
 *
 * OUTPUT: a `SelectorData` object — see the typedef below.
 *
 * A "bitmap" here is a `Uint32Array` with one bit per node; see the top
 * of `bit-index.js` for what they are and how they're queried.
 *
 * @typedef {Object} SelectorData
 *
 * Public counts (feature selection in `features.js` reads these):
 * @property {Object<String, Number>} classes      per-page count by class name
 * @property {Object<String, Number>} tags         per-page count by nodeName
 * @property {Object<String, Number>} attributes   per-page count by atnv
 *
 * Per-element records:
 * @property {NodeRecord[]}            _nodeRecords   keyed by nodeIdx
 * @property {WeakMap<Element, Number>} _elmToIdx     Element → nodeIdx
 *
 * Bitmap indexes:
 * @property {Object<String, Uint32Array>} _tagBits     which nodes have this tag
 * @property {Object<String, Uint32Array>} _classBits   ... this class
 * @property {Object<String, Uint32Array>} _attrBits    ... this exact-form atnv
 * @property {Uint32Array[]}               _rootBits    which nodes live in
 *                                         root N, so selector queries don't
 *                                         leak across shadow boundaries
 * @property {Map<Node, Number>}           _rootMap     root node → rootId
 * @property {Number}                      _wordCount   Uint32 words per bitmap
 *
 * Id lookup (avoids `querySelectorAll('#foo')` at query time):
 * @property {Array<Object<String, Number>>} _idCounts  [rootId][idSel] → how
 *                                         many times this id appears in this
 *                                         root (a non-1 count means the id
 *                                         isn't usable as a selector)
 * @property {Array<Object<String, Number>>} _idToIdx   [rootId][idSel] → the
 *                                         nodeIdx of the sole matching element
 *                                         (only present when count === 1)
 *
 * Ancestor walk helpers:
 * @property {Int32Array} _parentOf    `nodeRecord.parentIdx` per nodeIdx, for
 *                                     the chain walk in `generate.js`
 * @property {Map<String, {rawName: String, suffix: String}>} _suffixInfo
 *                                     keyed by atnv, for suffix-form atnvs
 *                                     only, so `computeFragment` can classify
 *                                     without sniffing for `$="`
 */

/**
 * Everything the selector generator needs to know about one element,
 * flattened so match-time code never has to touch the DOM.
 *
 * @typedef {Object} NodeRecord
 * @property {Element}      elm           the real DOM Element
 * @property {String}       nodeName      uppercase HTML name (e.g. "BUTTON") —
 *                                        keys `selectorData.tags` counts
 * @property {String}       tag           lowercase tag selector form
 *                                        (e.g. "button") — keys `_tagBits`
 *                                        and appears in emitted selectors
 * @property {String|null}  id            `#id` selector string, or null
 * @property {String[]}     classes       escaped class names on this element
 * @property {String[]}     featureAttrs  filter-passing atnvs, both forms;
 *                                        feeds feature selection
 * @property {String[]}     exactAttrs    exact-form atnvs only; compared
 *                                        against `fragment.exactAttrs`
 * @property {Object|null}  urlAttrs      raw URL values keyed by raw attribute
 *                                        name (`{ href: '…', src: '…' }`) for
 *                                        suffix-form attrs, or null
 * @property {Number}       nthChild      1-indexed position among element
 *                                        siblings; 0 if disconnected
 * @property {Number}       parentIdx     nodeIdx of the parent, or -1
 * @property {Number}       rootId        which root this element lives in
 *                                        (0 = main document, 1+ = shadow roots)
 */

/**
 * The mutable state of one `getSelectorData` run: the `SelectorData`
 * under construction plus the accumulators that only exist during the
 * walk. Bitmaps can't be sized until the node count is final, so each
 * `*Lists` map collects member nodeIdx values as plain arrays and
 * `buildIndexes` converts them at the end.
 *
 * @typedef {Object} IndexState
 * @property {SelectorData}            selectorData
 * @property {Map<String, Number[]>}   tagLists      nodeIdxs by tag
 * @property {Map<String, Number[]>}   classLists    nodeIdxs by class name
 * @property {Map<String, Number[]>}   attrLists     nodeIdxs by exact atnv
 * @property {Array<Number[]>}         rootLists     nodeIdxs by rootId
 * @property {Map<Element, Map<Element, Number>>} nthIndexCache
 */

/**
 * Walk the whole page once and record everything the selector generator will
 * ever need to know about it. The point is to move as much work as possible
 * out of the per-element hot path (`generateSelector`, which runs thousands
 * of times per axe.run) and into this one-time setup.
 *
 * @param {Object} domTree     The root node of the virtual DOM tree
 * @returns {SelectorData}     Frequency counts + fast-lookup tables
 */
export function getSelectorData(domTree) {
  const state = createIndexState();
  walkFlatTree(domTree, state);
  seedPhantomsFromRoots(state);
  repairMissingParents(state);
  buildIndexes(state);
  return state.selectorData;
}

/**
 * Allocate the output `SelectorData` plus the walk-only accumulators.
 *
 * @returns {IndexState}
 */
function createIndexState() {
  return {
    selectorData: {
      classes: {},
      tags: {},
      attributes: {},
      _nodeRecords: [],
      _elmToIdx: new WeakMap(),
      _tagBits: {},
      _classBits: {},
      _attrBits: {},
      _rootMap: new Map(),
      _rootBits: [],
      _idCounts: [],
      _idToIdx: [],
      _suffixInfo: new Map(),
      _wordCount: 0
    },
    tagLists: new Map(),
    classLists: new Map(),
    attrLists: new Map(),
    rootLists: [],
    nthIndexCache: new Map()
  };
}

/**
 * Iterative DFS of the flattened virtual tree. Skip non-elements
 * (`#text` nodes have no `querySelectorAll`).
 *
 * @param {Object}       domTree
 * @param {IndexState} state
 */
function walkFlatTree(domTree, state) {
  const roots = Array.isArray(domTree) ? domTree : [domTree];
  let currentLevel = roots.slice();
  const stack = [];

  while (currentLevel.length) {
    const current = currentLevel.pop();
    const node = current.actualNode;

    if (node.querySelectorAll) {
      recordFlatTreeElement(node, state);
    }
    if (current.children.length) {
      stack.push(currentLevel);
      currentLevel = current.children.slice();
    }
    while (!currentLevel.length && stack.length) {
      currentLevel = stack.pop();
    }
  }
}

/**
 * Record a flattened-tree element: index it and route it through
 * `_elmToIdx` / `_idToIdx`.
 *
 * @param {Element}      node
 * @param {IndexState} state
 */
function recordFlatTreeElement(node, state) {
  const { selectorData } = state;
  const nodeIdx = selectorData._nodeRecords.length;
  const parentIdx = parentIdxOf(node, state);
  const rootId = ensureRoot(node, state);

  selectorData._elmToIdx.set(node, nodeIdx);
  selectorData._nodeRecords.push(
    indexElement(node, nodeIdx, { parentIdx, rootId, shouldMapId: true }, state)
  );
  // Register an open shadow root as its own `_rootMap` entry so the
  // phantom pass walks it. Done here rather than relying on the
  // rootIds of shadow-scoped elements: a shadow root whose contents
  // flatten-tree dropped entirely (say it holds only a
  // `<slot name="none">`) has no element to derive a rootId from.
  if (node.shadowRoot) {
    rootIdFor(node.shadowRoot, state);
  }
}

/**
 * DOM parent's nodeIdx, or -1 if the parent was not walked (document,
 * ShadowRoot, disconnected). Relies on parent-before-child walk order.
 *
 * @param {Element}      node
 * @param {IndexState} state
 * @returns {Number}
 */
function parentIdxOf(node, state) {
  const domParent = node.parentNode;
  if (!domParent) {
    return -1;
  }
  const parentIdx = state.selectorData._elmToIdx.get(domParent);
  return parentIdx !== undefined ? parentIdx : -1;
}

/**
 * Numeric id for the node's root (0 = main document, 1+ = shadow
 * roots), creating the per-root tables on first sight.
 *
 * @param {Element}      node
 * @param {IndexState} state
 * @returns {Number}
 */
function ensureRoot(node, state) {
  const root =
    typeof node.getRootNode === 'function' ? node.getRootNode() : document;
  return rootIdFor(root, state);
}

/**
 * Numeric id for a root node itself, allocating its per-root tables on
 * first sight. Split out from `ensureRoot` so a shadow root can be
 * registered directly, without an element to resolve it from.
 *
 * @param {Document|ShadowRoot} root
 * @param {IndexState}          state
 * @returns {Number}
 */
function rootIdFor(root, state) {
  const { selectorData, rootLists } = state;
  let rootId = selectorData._rootMap.get(root);
  if (rootId !== undefined) {
    return rootId;
  }
  rootId = selectorData._rootMap.size;
  selectorData._rootMap.set(root, rootId);
  rootLists[rootId] = [];
  selectorData._idCounts[rootId] = {};
  selectorData._idToIdx[rootId] = {};
  return rootId;
}

/**
 * Count this element's tag / classes / attrs / id, add it to the
 * reverse-index lists, and return its `NodeRecord`. Shared by
 * flat-tree and phantom nodes — frequency counts include everything
 * flatten-tree dropped, so feature selection sees the live DOM's true
 * distribution rather than just the flat tree's.
 *
 * @param {Element}      node
 * @param {Number}       nodeIdx
 * @param {Object}       placement
 * @param {Number}       placement.parentIdx
 * @param {Number}       placement.rootId
 * @param {Boolean}      placement.shouldMapId  write `_idToIdx`
 *                                              (false for phantoms)
 * @param {IndexState} state
 * @returns {NodeRecord}
 */
function indexElement(
  node,
  nodeIdx,
  { parentIdx, rootId, shouldMapId },
  state
) {
  const { selectorData, tagLists, rootLists, nthIndexCache } = state;
  const nodeName = node.nodeName;
  selectorData.tags[nodeName] = (selectorData.tags[nodeName] || 0) + 1;

  // `nodeName` is uppercase in HTML but selector strings are lowercase
  // (`button`, not `BUTTON`). Store both: `nodeName` keys the frequency
  // map, `tag` keys the bitmap so match-time comparisons need no
  // case conversion.
  const tag = getBaseSelector(node);
  pushToList(tagLists, tag, nodeIdx);

  const classes = collectNodeClasses(node, nodeIdx, state);
  const { urlAttrs, featureAttrs, exactAttrs } = collectNodeAttrs(
    node,
    nodeIdx,
    state
  );

  let id = null;
  const rawId = node.getAttribute && node.getAttribute('id');
  if (rawId) {
    id = '#' + escapeSelector(rawId);
    const rootIds = selectorData._idCounts[rootId];
    rootIds[id] = (rootIds[id] || 0) + 1;
    // Phantoms bump the count (so a flat-tree node with the same id
    // sees the collision) but stay out of `_idToIdx`.
    if (shouldMapId) {
      selectorData._idToIdx[rootId][id] = nodeIdx;
    }
  }

  rootLists[rootId].push(nodeIdx);

  let nthChild = 0;
  const domParent = node.parentNode;
  if (domParent && domParent.children) {
    nthChild = nthChildMap(domParent, nthIndexCache).get(node) || 0;
  }

  return {
    elm: node,
    nodeName,
    tag,
    id,
    classes,
    featureAttrs,
    exactAttrs,
    urlAttrs,
    nthChild,
    parentIdx,
    rootId
  };
}

/**
 * Escaped class names on this element, with per-page counts and the
 * class → nodeIdx reverse index updated.
 *
 * @param {Element}      node
 * @param {Number}       nodeIdx
 * @param {IndexState} state
 * @returns {String[]}
 */
function collectNodeClasses(node, nodeIdx, state) {
  const classesForNode = [];
  if (!node.classList) {
    return classesForNode;
  }
  const { selectorData, classLists } = state;
  for (const rawClass of node.classList) {
    const className = escapeSelector(rawClass);
    selectorData.classes[className] =
      (selectorData.classes[className] || 0) + 1;
    classesForNode.push(className);
    pushToList(classLists, className, nodeIdx);
  }
  return classesForNode;
}

/**
 * Read every attribute on the node and record it so later lookups
 * don't have to touch the DOM again:
 *
 *   - `selectorData.attributes` — running counts, one per `name="value"`
 *   - `featureAttrs` / `exactAttrs` — this element's filter-passing
 *     atnvs (feature selection) and exact-form atnvs (fragment matching)
 *   - `attrLists` — for each exact atnv, which nodes have it
 *
 * Href/src attributes match by "does the URL end with this string?"
 * rather than exact equality, so we also return `urlAttrs` (raw
 * values keyed by raw attribute name) to check at query time.
 *
 * @param {Element}      node
 * @param {Number}       nodeIdx
 * @param {IndexState} state
 * @returns {{ urlAttrs: Object|null, featureAttrs: String[], exactAttrs: String[] }}
 */
function collectNodeAttrs(node, nodeIdx, state) {
  const featureAttrs = [];
  const exactAttrs = [];
  let urlAttrs = null;
  if (!node.hasAttributes()) {
    return { urlAttrs, featureAttrs, exactAttrs };
  }

  const { selectorData, attrLists } = state;
  const rawAttrs = getNodeAttributes(node);
  for (let i = 0; i < rawAttrs.length; i++) {
    const attr = rawAttrs[i];
    const attrSelector = getAttributeNameValue(node, attr);
    if (!attrSelector) {
      continue;
    }
    const { atnv, isSuffix, rawName, suffix } = attrSelector;

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
      urlAttrs[rawName] = attr.value;
      if (!selectorData._suffixInfo.has(atnv)) {
        selectorData._suffixInfo.set(atnv, { rawName, suffix });
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
    if (filterAttributes(attr)) {
      selectorData.attributes[atnv] = (selectorData.attributes[atnv] || 0) + 1;
      featureAttrs.push(atnv);
      if (!isSuffix) {
        exactAttrs.push(atnv);
        pushToList(attrLists, atnv, nodeIdx);
      }
    }
  }
  return { urlAttrs, featureAttrs, exactAttrs };
}

/**
 * Append `nodeIdx` to the array stored at `map.get(key)`, creating
 * the array on first use.
 *
 * @param {Map}    map
 * @param {String} key
 * @param {Number} nodeIdx
 */
function pushToList(map, key, nodeIdx) {
  let list = map.get(key);
  if (!list) {
    list = [];
    map.set(key, list);
  }
  list.push(nodeIdx);
}

/**
 * Look up (or build on first use) the `child element -> 1-indexed position`
 * map for `domParent`. Building it once per parent keeps the sibling walk
 * linear across a parent with many children; `indexOf` per element would
 * be O(N^2).
 *
 * @param {Element} domParent
 * @param {Map}     cache        Map<Element, Map<Element, Number>>
 * @returns {Map<Element, Number>}
 */
function nthChildMap(domParent, cache) {
  let nthMap = cache.get(domParent);
  if (!nthMap) {
    nthMap = new Map();
    const children = domParent.children;
    for (let i = 0; i < children.length; i++) {
      nthMap.set(children[i], i + 1);
    }
    cache.set(domParent, nthMap);
  }
  return nthMap;
}

/**
 * Copy `nodeRecord.parentIdx` into a typed array. Typed-array reads are
 * meaningfully cheaper than `nodeRecords[i].parentIdx` in the
 * per-candidate loop that walks up the tree.
 *
 * @param {NodeRecord[]} nodeRecords
 * @returns {Int32Array}
 */
function parentIdxArray(nodeRecords) {
  const parentOf = new Int32Array(nodeRecords.length);
  for (let i = 0; i < nodeRecords.length; i++) {
    parentOf[i] = nodeRecords[i].parentIdx;
  }
  return parentOf;
}

/**
 * Ids that appear more than once in their root aren't usable as
 * unique selectors, so drop them from the "id → node" map. Counts
 * stay — `getElmId` reads those.
 *
 * @param {SelectorData} selectorData
 */
function pruneDuplicateIds(selectorData) {
  for (let rootId = 0; rootId < selectorData._idToIdx.length; rootId++) {
    const counts = selectorData._idCounts[rootId];
    const idToIdx = selectorData._idToIdx[rootId];
    for (const idSel in idToIdx) {
      if (counts[idSel] !== 1) {
        delete idToIdx[idSel];
      }
    }
  }
}

/**
 * Record every element the CSS engine can see that the flat-tree walk
 * didn't. One `querySelectorAll('*')` per known root, which is
 * exhaustive by construction — see DROPPED DOM in the top-of-file
 * block for why that beats enumerating the drop-sites.
 *
 * Phantoms go into `_elmToIdx` (unlike flat-tree-only nodes, they stay
 * out of `_idToIdx`) so that parent lookup succeeds on
 * phantom-to-phantom chains and the ancestor filter works through
 * unslotted subtrees and slot fallback markup alike.
 *
 * @param {IndexState} state
 */
function seedPhantomsFromRoots(state) {
  const { selectorData } = state;
  for (const [rootNode, rootId] of selectorData._rootMap) {
    if (!rootNode.querySelectorAll) {
      continue;
    }
    const elms = rootNode.querySelectorAll('*');
    for (let i = 0; i < elms.length; i++) {
      const elm = elms[i];
      if (selectorData._elmToIdx.has(elm)) {
        continue;
      }
      const nodeIdx = selectorData._nodeRecords.length;
      const parentIdx = phantomParentIdx(elm, rootNode, state);
      selectorData._nodeRecords.push(
        indexElement(
          elm,
          nodeIdx,
          { parentIdx, rootId, shouldMapId: false },
          state
        )
      );
      selectorData._elmToIdx.set(elm, nodeIdx);
    }
  }
}

/**
 * A phantom's parent nodeIdx. Document order means the DOM parent is
 * already recorded — real, or phantom from earlier in the same pass.
 * The exception is the top of a shadow tree, where the DOM parent is
 * the `ShadowRoot` itself and so has no record; graft onto the host
 * instead, matching how the flat-tree walk splices shadow content in.
 *
 * @param {Element}             elm
 * @param {Document|ShadowRoot} rootNode
 * @param {IndexState}          state
 * @returns {Number}
 */
function phantomParentIdx(elm, rootNode, state) {
  const { selectorData } = state;
  const domParent = elm.parentNode;
  if (!domParent) {
    return -1;
  }
  const parentIdx = selectorData._elmToIdx.get(domParent);
  if (parentIdx !== undefined) {
    return parentIdx;
  }
  if (domParent === rootNode && rootNode.host) {
    const hostIdx = selectorData._elmToIdx.get(rootNode.host);
    if (hostIdx !== undefined) {
      return hostIdx;
    }
  }
  return -1;
}

/**
 * Re-resolve records left with `parentIdx: -1` by the flat-tree walk.
 * Their DOM parent — a `<slot>`, typically — wasn't in `_elmToIdx` at
 * the time; the phantom pass has since added it, so the lookup can
 * now succeed and repair the chain.
 *
 * Must run before `buildIndexes`, which snapshots `parentIdx` into the
 * flat `_parentOf` array.
 *
 * @param {IndexState} state
 */
function repairMissingParents(state) {
  const { selectorData } = state;
  const nodeRecords = selectorData._nodeRecords;
  for (let i = 0; i < nodeRecords.length; i++) {
    const record = nodeRecords[i];
    if (record.parentIdx !== -1) {
      continue;
    }
    const domParent = record.elm.parentNode;
    if (!domParent) {
      continue;
    }
    const parentIdx = selectorData._elmToIdx.get(domParent);
    if (parentIdx !== undefined) {
      record.parentIdx = parentIdx;
    }
  }
}

/**
 * Convert the walk's list accumulators into the tables `generate.js`
 * and `bit-index.js` actually read. Safe to call only once the
 * flat-tree walk and the phantom pass have both finished — bitmap
 * width depends on the final node count.
 *
 * @param {IndexState} state
 */
function buildIndexes(state) {
  const { selectorData, tagLists, classLists, attrLists, rootLists } = state;
  const nodeCount = selectorData._nodeRecords.length;
  const wordCount = Math.max(1, Math.ceil(nodeCount / 32));
  selectorData._wordCount = wordCount;
  selectorData._tagBits = bitmapsByKey(tagLists, wordCount);
  selectorData._classBits = bitmapsByKey(classLists, wordCount);
  selectorData._attrBits = bitmapsByKey(attrLists, wordCount);

  selectorData._rootBits = [];
  for (let rootId = 0; rootId < rootLists.length; rootId++) {
    selectorData._rootBits[rootId] = listToBits(
      rootLists[rootId] || [],
      wordCount
    );
  }

  selectorData._parentOf = parentIdxArray(selectorData._nodeRecords);
  pruneDuplicateIds(selectorData);
}

/**
 * Turn a `key -> nodeIdx[]` map into a `key -> bitmap` lookup table.
 *
 * @param {Map<String, Number[]>} nodeIdxsByKey
 * @param {Number}                wordCount
 * @returns {Object<String, Uint32Array>}
 */
function bitmapsByKey(nodeIdxsByKey, wordCount) {
  const bitmaps = {};
  for (const [key, nodeIdxs] of nodeIdxsByKey) {
    bitmaps[key] = listToBits(nodeIdxs, wordCount);
  }
  return bitmaps;
}
