import tagsToWcagUrls from './tags-to-wcag-urls';

/**
 * Build a single EARL Assertion describing one rule result.
 *
 * @private
 * @param {Object} args
 * @param {String} args.source URL of the page under test
 * @param {String} args.version axe-core version (without the `v` prefix)
 * @param {String} [args.ruleId] axe-core rule id the assertion is about
 * @param {String[]} [args.tags] rule tags, used to derive WCAG SC links
 * @param {String} [args.mode] EARL test mode
 * @param {String} [args.outcome] EARL outcome
 * @returns {Object} an EARL Assertion
 * @throws {TypeError} when `source` is not a string
 */
export default function earlAssertion({
  source,
  version,
  ruleId,
  tags = [],
  mode = 'automatic',
  outcome = 'untested'
}) {
  if (typeof source !== 'string') {
    throw new TypeError('EARL assertion source must be a string');
  }

  const assertion = {
    '@type': 'Assertion',
    mode: `earl:${mode}`,
    subject: {
      '@type': ['earl:TestSubject', 'sch:WebPage'],
      source
    },
    assertedBy: `https://github.com/dequelabs/axe-core/releases/tag/v${version}`,
    result: {
      '@type': 'TestResult',
      outcome: `earl:${outcome}`
    }
  };

  if (!ruleId) {
    return assertion;
  }

  const minor = version?.match(/[0-9]+\.[0-9]+/)?.[0] || '4.4';
  assertion.test = {
    '@type': 'TestCase',
    title: ruleId,
    '@id': `https://dequeuniversity.com/rules/axe/${minor}/${ruleId}?application=axeAPI`
  };

  const wcagUrls = tagsToWcagUrls(tags);
  if (wcagUrls.length) {
    assertion.test.isPartOf = wcagUrls;
  }

  return assertion;
}
