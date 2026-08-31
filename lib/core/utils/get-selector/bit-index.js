/* eslint-disable no-bitwise -- bitset intersection and bit-testing are
   inherent to the fast uniqueness check; disabling scoped to this file
   keeps the algorithm readable without per-line pragmas. */

/**
 * Turn a list of nodeIdx values into a Uint32Array where bit N is set if
 * node N is in the list. `j >>> 5` picks the Uint32 word, `j & 31` picks
 * the bit within that word. Used at end-of-walk to flip every accumulated
 * `Map<key, Number[]>` source list into its bitmap form.
 *
 * @param {Number[]} list
 * @param {Number}   wordCount   how many Uint32 words the result needs
 * @returns {Uint32Array}
 */
export function listToBits(list, wordCount) {
  const bits = new Uint32Array(wordCount);
  for (let i = 0; i < list.length; i++) {
    const j = list[i];
    bits[j >>> 5] |= 1 << (j & 31);
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
export function fragmentMatchesIdx(fragment, nodeIdx, perNode) {
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
export function bitsForFragment(fragment, key, selectorData, rootId) {
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
export function indicesForFragment(fragment, key, selectorData, rootId) {
  const entry = getMatchCacheEntry(selectorData, rootId, key);
  if ('indices' in entry) {
    return entry.indices;
  }
  const bits = bitsForFragment(fragment, key, selectorData, rootId);
  entry.indices = enumerateBits(bits, selectorData._wordCount);
  return entry.indices;
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
export function advanceAndFilter(anc, source, count, parentOf, ancBits) {
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
