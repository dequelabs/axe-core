/* eslint-disable no-bitwise -- bitset intersection and bit-testing are
   inherent to the fast uniqueness check; disabling scoped to this file
   keeps the algorithm readable without per-line pragmas. */

/*
 * All the bit math for the fast selector-uniqueness check.
 *
 * `generateSelector` builds a CSS selector for a target by assembling a
 * fragment like `button.cta[data-x="1"]` and then asking "how many
 * elements on the page match this fragment?" — if exactly one matches,
 * the fragment IS a selector; if more than one matches, it isn't
 * specific enough yet and we need to narrow further (with `:nth-child(N)`
 * or by walking up to a parent fragment).
 *
 * That "how many match?" question gets asked thousands of times per
 * `axe.run` — once per candidate feature per target, on every level of
 * every chain walk. Doing it with `querySelectorAll('button.cta')` per
 * ask is too slow: the CSS engine re-parses the selector and walks the
 * DOM every call.
 *
 * The fast alternative: precompute the answer at setup time as a
 * BITMAP.
 *
 * Take this page as a running example:
 *
 *   nodeIdx  0  <body>
 *   nodeIdx  1    <button class="cta">A</button>
 *   nodeIdx  2    <button class="cta">B</button>
 *   nodeIdx  3    <p      class="cta">C</p>
 *   nodeIdx  4    <p>D</p>
 *              </body>
 *
 * The walk in `precompute.js` numbers every element with a small integer
 * "nodeIdx" (0, 1, 2, … above). Then for every feature that appears on
 * the page — every tag, every class, every attribute value — it builds
 * a bitmap: a row of bits, one bit per element, where bit N is 1 if
 * element N has that feature and 0 otherwise. For our page:
 *
 *   nodeIdx :          0   1   2   3   4
 *
 *   _tagBits.body   :  1   0   0   0   0   ← which nodes are <body>?
 *   _tagBits.button :  0   1   1   0   0   ← which nodes are <button>?
 *   _tagBits.p      :  0   0   0   1   1   ← which nodes are <p>?
 *   _classBits.cta  :  0   1   1   1   0   ← which nodes have class="cta"?
 *
 * With the data in that shape, "which elements match `button.cta`?" is
 * a BITWISE AND. JavaScript's `a & b` operator returns a value whose
 * bit N is 1 iff bit N is 1 in both `a` and `b`. Applied across two
 * bitmaps, that's a page-wide intersection in one step:
 *
 *   _tagBits.button :  0   1   1   0   0
 *   _classBits.cta  :  0   1   1   1   0
 *                      ─────────────────   AND (column by column)
 *   match           :  0   1   1   0   0   ← nodeIdx 1 and 2 (buttonA, buttonB)
 *
 * Two set bits → two matches → `button.cta` isn't unique, so
 * `generateSelector` walks up to `<body>` and tries `body > button.cta`
 * next.
 *
 * A few implementation details the code assumes:
 *
 * 1. WORDS. A "bitmap" is really a `Uint32Array`. We can't store one
 *    JS variable per element because 10,000 booleans would be ~40 kB
 *    and we'd lose the "AND lots of bits at once" trick. Instead we
 *    pack 32 nodeIdx worth of bits into each 32-bit unsigned integer,
 *    and call each integer a WORD. A bitmap for N elements is
 *    ⌈N / 32⌉ words:
 *
 *        nodeIdx :  0   1   2   3   ...  30  31 │ 32  33  ...  62  63
 *        bit     :  0   1   0   1   ...   1   0 │  0   1   ...   0   1
 *                   └──── word 0 (Uint32) ─────┘ └──── word 1 (Uint32) ────┘
 *
 *      Which word holds nodeIdx N?  N >>> 5   (integer divide by 32)
 *      Which bit inside that word?  N & 31    (remainder mod 32)
 *
 *    Packed this way, one `a & b` compares 32 elements at once, and a
 *    whole-page AND is just a loop of N/32 word operations. Every
 *    bitmap-touching loop below iterates word-by-word.
 *
 * 2. NON-BITMAP FEATURES. Two selector features can't be answered by
 *    AND alone. We AND first (down to a small candidate set) and then
 *    filter survivors:
 *
 *    - `:nth-child(N)` — one bitmap per sibling position would blow
 *      up memory. After the AND we drop candidates whose `nthChild`
 *      isn't N.
 *    - `[href$="X"]` — URL-suffix matching is many-to-one, so no
 *      precomputable table. After the AND we compare the raw stored
 *      URL per candidate.
 *
 * 3. SHADOW ROOTS. Each root has its own bitmap of "which nodes live
 *    in me" (`_rootBits[rootId]`). Every match ANDs with the target's
 *    root bitmap so a selector for the main document doesn't leak into
 *    a shadow tree, and vice versa.
 */

/**
 * Turn a list of nodeIdx values into a Uint32Array where bit N is set if
 * node N is in the list. `j >>> 5` picks the Uint32 word, `j & 31` picks
 * the bit within that word. Used at end-of-walk to flip every accumulated
 * `Map<key, Number[]>` source list into its bitmap form.
 *
 * @param {Number[]} nodeIdxs
 * @param {Number}   wordCount   how many Uint32 words the result needs
 * @returns {Uint32Array}
 */
export function listToBits(nodeIdxs, wordCount) {
  const bits = new Uint32Array(wordCount);
  for (let i = 0; i < nodeIdxs.length; i++) {
    const nodeIdx = nodeIdxs[i];
    bits[nodeIdx >>> 5] |= 1 << (nodeIdx & 31);
  }
  return bits;
}

/**
 * `[href$="X"]` (and `[src$="X"]`) don't work as exact-string lookups —
 * two different URLs can both end with the same suffix. So we can't
 * precompute a bitmap for these; we have to compare the raw stored URL
 * against the wanted suffix at query time. This does that check for one
 * node.
 *
 * @param {NodeRecord} nodeRecord
 * @param {Array<{rawName: String, suffix: String}>} suffixAttrs
 * @returns {Boolean}
 */
function matchesSuffixAttrs(nodeRecord, suffixAttrs) {
  const urlAttrs = nodeRecord.urlAttrs;
  if (!urlAttrs) {
    return false;
  }
  for (let i = 0; i < suffixAttrs.length; i++) {
    const rawUrl = urlAttrs[suffixAttrs[i].rawName];
    if (typeof rawUrl !== 'string' || !rawUrl.endsWith(suffixAttrs[i].suffix)) {
      return false;
    }
  }
  return true;
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
 * @param {Fragment}     fragment
 * @param {Number}       nodeIdx
 * @param {NodeRecord[]} nodeRecords   from `getSelectorData`
 * @returns {Boolean}
 */
export function fragmentMatchesIdx(fragment, nodeIdx, nodeRecords) {
  const nodeRecord = nodeRecords[nodeIdx];
  if (fragment.id) {
    return nodeRecord.id === fragment.id;
  }
  // Both sides store the tag in the same lowercased form, so we can just
  // string-compare.
  if (fragment.tag && nodeRecord.tag !== fragment.tag) {
    return false;
  }
  if (fragment.classes) {
    for (let i = 0; i < fragment.classes.length; i++) {
      if (nodeRecord.classes.indexOf(fragment.classes[i]) === -1) {
        return false;
      }
    }
  }
  if (fragment.exactAttrs) {
    for (let i = 0; i < fragment.exactAttrs.length; i++) {
      if (nodeRecord.exactAttrs.indexOf(fragment.exactAttrs[i]) === -1) {
        return false;
      }
    }
  }
  if (
    fragment.suffixAttrs &&
    !matchesSuffixAttrs(nodeRecord, fragment.suffixAttrs)
  ) {
    return false;
  }
  if (
    fragment.nthChild !== undefined &&
    nodeRecord.nthChild !== fragment.nthChild
  ) {
    return false;
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
 * @typedef {Object} CachedMatch
 * @property {Uint32Array|null} [bits]      absent until first computed
 * @property {Number[]}         [indices]   absent until first computed
 */

/**
 * @param {SelectorData} selectorData
 * @param {Number}       rootId
 * @param {Fragment}     fragment   keyed by its `selectorString`
 * @returns {CachedMatch}           with `bits` / `indices` possibly absent
 */
function getCachedMatch(selectorData, rootId, fragment) {
  selectorData._matchCache ??= [];
  const cache = selectorData._matchCache;
  // Fragment strings are untrusted keys: a bare unknown tag name
  // like `<constructor>` parses fine and produces the fragment
  // `constructor`. If the root cache inherited from Object.prototype,
  // `rootCache['constructor']` would return the Object constructor
  // (truthy), the entry-init below would never fire, and the
  // assignments in bitsForFragment / indicesForFragment would end up
  // on the global Object — one root's bitmap leaking into another,
  // then stranded on Object for the life of the page. Null-prototype
  // objects have no such inheritance.
  cache[rootId] ??= Object.create(null);
  const rootCache = cache[rootId];
  const key = fragment.selectorString;
  rootCache[key] ??= {};
  return rootCache[key];
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
 * @param {Fragment}     fragment
 * @param {SelectorData} selectorData
 * @param {Number}       rootId       restrict matches to this root
 * @returns {Uint32Array|null}
 */
export function bitsForFragment(fragment, selectorData, rootId) {
  const cachedMatch = getCachedMatch(selectorData, rootId, fragment);
  if ('bits' in cachedMatch) {
    return cachedMatch.bits;
  }

  const nodeRecords = selectorData._nodeRecords;
  const wordCount = selectorData._wordCount;

  // An id, if it made it into the fragment, is already known to be unique
  // in its root — so exactly one bit is ever set. Skip the full intersect.
  if (fragment.id) {
    const nodeIdx = selectorData._idToIdx[rootId][fragment.id];
    if (nodeIdx === undefined) {
      cachedMatch.bits = null;
      return null;
    }
    const bits = new Uint32Array(wordCount);
    bits[nodeIdx >>> 5] |= 1 << (nodeIdx & 31);
    cachedMatch.bits = bits;
    return bits;
  }

  // "Which nodes have this tag AND this class AND this attribute?" is
  // a bit-AND across the individual bitmaps. Start empty, copy in the
  // first source, AND every subsequent one. If any feature has no bitmap
  // at all (e.g. no node on the page has this class), the result is
  // definitely empty — bail early.
  const bits = new Uint32Array(wordCount);
  let isSeeded = false;

  const applyBits = featureBits => {
    if (!isSeeded) {
      bits.set(featureBits);
      isSeeded = true;
    } else {
      for (let w = 0; w < wordCount; w++) {
        bits[w] &= featureBits[w];
      }
    }
  };

  if (fragment.tag) {
    const tagBits = selectorData._tagBits[fragment.tag];
    if (!tagBits) {
      cachedMatch.bits = null;
      return null;
    }
    applyBits(tagBits);
  }

  if (fragment.classes) {
    for (let i = 0; i < fragment.classes.length; i++) {
      const classBits = selectorData._classBits[fragment.classes[i]];
      if (!classBits) {
        cachedMatch.bits = null;
        return null;
      }
      applyBits(classBits);
    }
  }

  if (fragment.exactAttrs) {
    for (let i = 0; i < fragment.exactAttrs.length; i++) {
      const attrBits = selectorData._attrBits[fragment.exactAttrs[i]];
      if (!attrBits) {
        cachedMatch.bits = null;
        return null;
      }
      applyBits(attrBits);
    }
  }

  // A selector generated against `document` shouldn't match elements
  // inside some shadow root (and vice versa) — the browser wouldn't. AND
  // in the "which nodes live in the target's root" bitmap so cross-root
  // matches drop out.
  const rootBits = selectorData._rootBits[rootId];
  if (rootBits) {
    applyBits(rootBits);
  }

  if (!isSeeded) {
    cachedMatch.bits = null;
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
  const { nthChild, suffixAttrs } = fragment;
  if (nthChild !== undefined || suffixAttrs) {
    for (let w = 0; w < wordCount; w++) {
      let word = bits[w];
      let keep = 0;
      while (word !== 0) {
        const lsb = word & -word;
        const bitIdx = 31 - Math.clz32(lsb);
        const nodeIdx = (w << 5) + bitIdx;
        const nodeRecord = nodeRecords[nodeIdx];
        const matchesNth =
          nthChild === undefined || nodeRecord.nthChild === nthChild;
        const matchesSuffix =
          !suffixAttrs || matchesSuffixAttrs(nodeRecord, suffixAttrs);
        if (matchesNth && matchesSuffix) {
          keep |= lsb;
        }
        word ^= lsb;
      }
      bits[w] = keep;
    }
  }

  cachedMatch.bits = bits;
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
  const nodeIdxs = [];
  if (!bits) {
    return nodeIdxs;
  }
  for (let w = 0; w < wordCount; w++) {
    let word = bits[w];
    while (word !== 0) {
      const lsb = word & -word;
      const bitIdx = 31 - Math.clz32(lsb);
      nodeIdxs.push((w << 5) + bitIdx);
      word ^= lsb;
    }
  }
  return nodeIdxs;
}

/**
 * Same "which nodes match this fragment?" question as `bitsForFragment`,
 * but returns the answer as a plain list of nodeIdx. `generateSelector`
 * uses this at the start of a chain walk when it wants to iterate the
 * initial candidate set. We compute the list once and cache it — on
 * pages with lots of repeated structure many targets share the same
 * first fragment.
 *
 * @param {Fragment}     fragment
 * @param {SelectorData} selectorData
 * @param {Number}       rootId
 * @returns {Number[]}   nodeIdx values that match
 */
export function indicesForFragment(fragment, selectorData, rootId) {
  const cachedMatch = getCachedMatch(selectorData, rootId, fragment);
  if ('indices' in cachedMatch) {
    return cachedMatch.indices;
  }
  const bits = bitsForFragment(fragment, selectorData, rootId);
  cachedMatch.indices = enumerateBits(bits, selectorData._wordCount);
  return cachedMatch.indices;
}

/**
 * One step of the ancestor walk in `generateSelector`. Given candidates
 * matching the chain-so-far, return the parents that match `fragment`.
 *
 * For each candidate: look up its parent (via `_parentOf`) and keep that
 * parent if it is in the fragment's match bitmap.
 *
 * Writes into a reused `Int32Array` (`selectorData._candidateBuf`) and
 * returns a view of the filled prefix. Filtering writes behind the read
 * cursor, so the same buffer can be the source and the destination.
 * Callers that stash the result (the chain cache) must copy it — the
 * next call overwrites the buffer.
 *
 * @param {ArrayLike<Number>} candidateIdxs   candidates from the previous step
 * @param {Fragment}          parentFragment
 * @param {SelectorData}      selectorData
 * @param {Number}            rootId
 * @returns {ArrayLike<Number>} parent nodeIdx values that match
 */
export function matchingParents(
  candidateIdxs,
  parentFragment,
  selectorData,
  rootId
) {
  const parentBits = bitsForFragment(parentFragment, selectorData, rootId);
  if (!parentBits) {
    return [];
  }

  const parentOf = selectorData._parentOf;
  const count = candidateIdxs.length;
  let dest = selectorData._candidateBuf;
  if (!dest || dest.length < count) {
    dest = selectorData._candidateBuf = new Int32Array(count);
  }

  let write = 0;
  for (let i = 0; i < count; i++) {
    const parent = parentOf[candidateIdxs[i]];
    if (parent < 0) {
      continue;
    }
    if (parentBits[parent >>> 5] & (1 << (parent & 31))) {
      dest[write++] = parent;
    }
  }
  return dest.subarray(0, write);
}
