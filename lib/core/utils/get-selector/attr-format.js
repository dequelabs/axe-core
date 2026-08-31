import escapeSelector from '../escape-selector';
import getFriendlyUriEnd from '../get-friendly-uri-end';

/*
 * Formats an element's attribute into the piece that goes inside `[...]`
 * in a CSS selector, and decides which attributes are eligible to appear
 * in a selector at all.
 *
 * ATNV. Short for "attribute-name-value" — the string that goes inside
 * `[...]`. Two forms this file produces:
 *
 *   - Exact:  attribute `class="cta"`  →  atnv `class="cta"`
 *             rendered as `[class="cta"]`
 *   - Suffix: attribute `href="https://example.com/report.pdf"` gets its
 *             URL shortened to a stable tail, e.g. `report.pdf`  →
 *             atnv `href$="report.pdf"`, rendered as `[href$="report.pdf"]`.
 *             Suffix form is used for href/src-family attributes because
 *             full URLs are long and often regenerate per page load, so
 *             an exact match would give a fragile selector.
 *
 * `getAttributeNameValue` returns the atnv PLUS the raw name and (if
 * suffix) suffix string. Downstream code needs both — the atnv is used
 * as a lookup key, and the raw pieces are what `[href$="…"]` matching
 * has to compare against at query time. Sniffing `$="` inside the atnv
 * doesn't work: an attribute name that itself ends in `$` (e.g. Polymer
 * binding syntax) escapes to `\$="…"` and trips the same check.
 *
 * `filterAttributes` gates which attributes get counted as "features"
 * (things the selector might use). Ignored-list attributes (`id`, `class`,
 * `style`, transient a11y state), namespaced ones (containing `:`), and
 * values ≥ 31 chars are skipped — id/class/style are surfaced through
 * their own dedicated fields, transient state can flip between axe runs,
 * namespaced attrs need special escaping, and long values would bloat
 * the precomputed indexes without adding uniqueness that a URL suffix
 * couldn't have.
 */

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
 * Build the `[name="value"]` (or `[name$="suffix"]`) portion of a selector
 * for an attribute, and report which form was built.
 *
 * Downstream code has to know suffix-vs-exact form and the RAW attribute
 * name (before CSS-escaping), and sniffing the returned string for `$="`
 * is unreliable when the attribute name itself contains `$` — the escape
 * introduces a `\$="` that trips the same check. Reporting the form
 * explicitly avoids the guesswork.
 *
 * @param {Element} node		The element that has the attribute
 * @param {Attribute} at		The attribute
 * @returns {{atnv: String, isSuffix: Boolean, rawName: String, suffix: String}}
 *   `rawName` is the original attribute name (not CSS-escaped).
 *   `suffix` is set only when `isSuffix` is true.
 */
export function getAttributeNameValue(node, at) {
  const name = at.name;
  const escName = escapeSelector(name);

  // Substring match (not equality) catches related URL-carrying
  // attributes like `xlink:href`, `data-src`, `srcset`, etc. — they
  // all deserve suffix-form treatment for the same reason `href` does.
  if (name.indexOf('href') !== -1 || name.indexOf('src') !== -1) {
    const friendly = getFriendlyUriEnd(node.getAttribute(name));
    if (friendly) {
      return {
        atnv: escName + '$="' + escapeAttribute(friendly) + '"',
        isSuffix: true,
        rawName: name,
        suffix: friendly
      };
    }
    return {
      atnv: escName + '="' + escapeAttribute(node.getAttribute(name)) + '"',
      isSuffix: false,
      rawName: name
    };
  }
  return {
    atnv: escName + '="' + escapeAttribute(at.value) + '"',
    isSuffix: false,
    rawName: name
  };
}

/**
 * Filter the attributes
 * @param {Attribute}		The potential attribute
 * @return {Boolean}		 Whether to include or exclude
 */
export function filterAttributes(at) {
  return (
    !ignoredAttributes.includes(at.name) &&
    at.name.indexOf(':') === -1 &&
    (!at.value || at.value.length < MAXATTRIBUTELENGTH)
  );
}
