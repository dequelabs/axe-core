/**
 * Stable rule/check id ordering aligned with historical Grunt/glob output:
 * when one id equals `otherId + '-' + suffix`, the longer id sorts first
 * (e.g. `color-contrast-enhanced` before `color-contrast`).
 *
 * Unrelated ids use `localeCompare`.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function compareRuleIds(a, b) {
  if (a === b) {
    return 0;
  }
  if (a.startsWith(b + '-')) {
    return -1;
  }
  if (b.startsWith(a + '-')) {
    return 1;
  }
  return a.localeCompare(b);
}

/**
 * @param {Record<string, unknown>} record
 * @returns {Record<string, unknown>}
 */
export function sortRecordKeysByRuleId(record) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    return record;
  }
  return Object.fromEntries(
    Object.entries(record).sort(([keyA], [keyB]) => compareRuleIds(keyA, keyB))
  );
}
