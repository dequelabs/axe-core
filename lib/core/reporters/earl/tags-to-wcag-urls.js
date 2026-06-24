import wcagData from './wcag';

/**
 * Map axe-core rule tags to WCAG 2.x Success Criterion identifiers.
 *
 * Tags matching `wcag` followed by 3 or 4 digits (e.g. `wcag111` → `1.1.1`,
 * `wcag1413` → `1.4.13`) are treated as Success Criterion numbers. Conformance
 * level tags (`wcag2a`, `wcag21aa`, …) and any other tags are ignored, as are
 * SC numbers without a known entry in the WCAG mapping.
 *
 * @private
 * @param {String[]} tags rule tags to convert
 * @returns {String[]} WCAG SC identifiers (e.g. `"WCAG2:non-text-content"`)
 */
export default function tagsToWcagUrls(tags) {
  const scTags = tags.filter(tag => /^wcag[0-9]{3,4}$/.test(tag));
  const scNums = scTags.map(tag => `${tag[4]}.${tag[5]}.${tag.slice(6)}`);
  return scNums.map(scNum => wcagData[scNum]).filter(Boolean);
}
