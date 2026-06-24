describe('reporters - earl', () => {
  let runResults;

  // Raw rule results as handed to a reporter: each rule carries its `result`
  // plus the passes/violations/incomplete/inapplicable group arrays. EARL only
  // counts the node entries, so the nodes themselves are minimal.
  const _results = [
    {
      id: 'image-alt',
      description: 'Ensures img elements have alternate text',
      tags: ['cat.text-alternatives', 'wcag2a', 'wcag111'],
      result: 'passed',
      impact: null,
      passes: [{ result: 'passed' }, { result: 'passed' }],
      violations: [],
      incomplete: [],
      inapplicable: []
    },
    {
      id: 'color-contrast',
      description: 'Ensures contrast between text and background',
      tags: ['cat.color', 'wcag2aa', 'wcag143'],
      result: 'failed',
      impact: 'serious',
      passes: [],
      violations: [
        { result: 'failed' },
        { result: 'failed' },
        { result: 'failed' }
      ],
      incomplete: [],
      inapplicable: []
    },
    {
      id: 'aria-valid-attr-value',
      description: 'Ensures ARIA attributes have valid values',
      tags: ['cat.aria', 'wcag2a', 'wcag412'],
      result: 'cantTell',
      impact: 'serious',
      passes: [],
      violations: [],
      incomplete: [{ result: 'cantTell' }],
      inapplicable: []
    },
    {
      id: 'marquee',
      description: 'Ensures marquee elements are not used',
      tags: ['cat.parsing', 'wcag2a', 'wcag222'],
      result: 'inapplicable',
      impact: null,
      passes: [],
      violations: [],
      incomplete: [],
      inapplicable: []
    },
    {
      id: 'region',
      description: 'Ensures content is contained by landmarks',
      tags: ['cat.keyboard', 'best-practice'],
      result: 'passed',
      impact: null,
      passes: [{ result: 'passed' }],
      violations: [],
      incomplete: [],
      inapplicable: []
    },
    {
      id: 'target-size',
      description: 'Ensures touch targets are large enough',
      tags: ['cat.sensory-and-visual-cues', 'wcag22aa', 'wcag258'],
      result: 'failed',
      impact: 'serious',
      passes: [],
      violations: [{ result: 'failed' }],
      incomplete: [],
      inapplicable: []
    }
  ];

  const url = 'https://example.com/page';

  // EARL reporter is synchronous; capture the report so a never-called callback
  // can't make a test pass silently.
  function getEarlReport(results, options = { environmentData: { url } }) {
    let report;
    axe.getReporter('earl')(results, options, result => {
      report = result;
    });
    return report;
  }

  function assertionsFor(report, ruleId) {
    return report['@graph'].filter(
      assertion => assertion.test && assertion.test.title === ruleId
    );
  }

  beforeEach(() => {
    runResults = JSON.parse(JSON.stringify(_results));
    axe._load({
      messages: {},
      rules: [],
      data: {}
    });
  });

  afterEach(() => {
    axe._audit = null;
  });

  it('is registered as an opt-in reporter named "earl"', () => {
    assert.isFunction(axe.getReporter('earl'));
  });

  it('returns a pure EARL JSON-LD document with only @context and @graph', () => {
    const report = getEarlReport(runResults);
    assert.hasAllKeys(report, ['@context', '@graph']);
    assert.isUndefined(report.testEngine);
    assert.isUndefined(report.timestamp);
    assert.isUndefined(report.testEnvironment);
    assert.isUndefined(report.testRunner);
    assert.isUndefined(report.toolOptions);
    assert.isUndefined(report.url);
  });

  it('uses the canonical EARL @context vocabulary', () => {
    const report = getEarlReport(runResults);
    assert.deepEqual(report['@context'], {
      '@vocab': 'http://www.w3.org/ns/earl#',
      earl: 'http://www.w3.org/ns/earl#',
      WCAG2: 'http://www.w3.org/TR/WCAG21/#',
      dct: 'http://purl.org/dc/terms/',
      sch: 'https://schema.org/',
      source: 'dct:source',
      title: 'dct:title',
      assertedBy: { '@type': '@id' },
      outcome: { '@type': '@id' },
      mode: { '@type': '@id' },
      isPartOf: {
        '@id': 'http://purl.org/dc/terms/isPartOf',
        '@type': '@id'
      }
    });
  });

  it('emits one assertion per tested node and one per inapplicable rule', () => {
    const report = getEarlReport(runResults);
    // 2 passes + 3 violations + 1 incomplete + 1 inapplicable + 1 pass + 1 violation
    assert.isArray(report['@graph']);
    assert.lengthOf(report['@graph'], 9);
  });

  it('maps axe result groups to EARL outcomes', () => {
    const report = getEarlReport(runResults);
    const outcomeFor = ruleId =>
      assertionsFor(report, ruleId).map(a => a.result.outcome);

    assert.deepEqual(outcomeFor('image-alt'), ['earl:passed', 'earl:passed']);
    assert.deepEqual(outcomeFor('color-contrast'), [
      'earl:failed',
      'earl:failed',
      'earl:failed'
    ]);
    assert.deepEqual(outcomeFor('aria-valid-attr-value'), ['earl:cantTell']);
    assert.deepEqual(outcomeFor('marquee'), ['earl:inapplicable']);
  });

  it('emits exactly one assertion for an inapplicable rule', () => {
    const report = getEarlReport(runResults);
    assert.lengthOf(assertionsFor(report, 'marquee'), 1);
  });

  it('maps nodes in an inapplicable group to earl:inapplicable', () => {
    // A rule whose overall result is not inapplicable can still carry entries in
    // its inapplicable group; those nodes flow through the group loop, not the
    // early return, and must map to earl:inapplicable.
    const results = [
      {
        id: 'mixed',
        tags: ['cat.x'],
        result: 'passed',
        impact: null,
        passes: [{ result: 'passed' }],
        violations: [],
        incomplete: [],
        inapplicable: [{ result: 'inapplicable' }]
      }
    ];
    const outcomes = getEarlReport(results)['@graph'].map(
      assertion => assertion.result.outcome
    );
    assert.sameMembers(outcomes, ['earl:passed', 'earl:inapplicable']);
  });

  it('builds a well-formed EARL Assertion for each result', () => {
    const report = getEarlReport(runResults);
    const assertion = assertionsFor(report, 'color-contrast')[0];

    assert.equal(assertion['@type'], 'Assertion');
    assert.equal(assertion.mode, 'earl:automatic');
    assert.deepEqual(assertion.subject['@type'], [
      'earl:TestSubject',
      'sch:WebPage'
    ]);
    assert.equal(assertion.subject.source, url);
    assert.equal(assertion.result['@type'], 'TestResult');
    assert.match(
      assertion.assertedBy,
      /^https:\/\/github\.com\/dequelabs\/axe-core\/releases\/tag\/v[0-9]/
    );
  });

  it('links each assertion to its rule via a Deque University TestCase', () => {
    const report = getEarlReport(runResults);
    const assertion = assertionsFor(report, 'image-alt')[0];

    assert.equal(assertion.test['@type'], 'TestCase');
    assert.equal(assertion.test.title, 'image-alt');
    assert.include(assertion.test['@id'], '/rules/axe/');
    assert.include(assertion.test['@id'], 'image-alt?application=axeAPI');
  });

  it('adds isPartOf WCAG SC links for WCAG-tagged rules', () => {
    const report = getEarlReport(runResults);
    assert.deepEqual(assertionsFor(report, 'image-alt')[0].test.isPartOf, [
      'WCAG2:non-text-content'
    ]);
    assert.deepEqual(assertionsFor(report, 'color-contrast')[0].test.isPartOf, [
      'WCAG2:contrast-minimum'
    ]);
  });

  it('reconstructs and maps 4-digit WCAG success-criterion tags', () => {
    // wcag1410 -> SC 1.4.10 -> WCAG2:reflow exercises the two-digit slice path,
    // which a three-digit-only fixture would never reach.
    const results = [
      {
        id: 'reflow',
        tags: ['cat.structure', 'wcag2aa', 'wcag1410'],
        result: 'failed',
        impact: 'serious',
        passes: [],
        violations: [{ result: 'failed' }],
        incomplete: [],
        inapplicable: []
      }
    ];
    const assertion = getEarlReport(results)['@graph'][0];
    assert.deepEqual(assertion.test.isPartOf, ['WCAG2:reflow']);
  });

  it('omits isPartOf when a rule has no WCAG success-criterion tag', () => {
    const report = getEarlReport(runResults);
    assert.isUndefined(assertionsFor(report, 'region')[0].test.isPartOf);
  });

  it('omits isPartOf for WCAG 2.2 criteria not in the WCAG 2.1 mapping', () => {
    const report = getEarlReport(runResults);
    // wcag258 (2.5.8) is a WCAG 2.2 criterion absent from the bundled mapping
    assert.isUndefined(assertionsFor(report, 'target-size')[0].test.isPartOf);
  });

  it('derives the version and Deque University minor from axe.version', () => {
    const realVersion = axe.version;
    try {
      axe.version = '9.8.7';
      const assertion = getEarlReport(runResults)['@graph'][0];
      assert.equal(
        assertion.assertedBy,
        'https://github.com/dequelabs/axe-core/releases/tag/v9.8.7'
      );
      assert.equal(
        assertion.test['@id'],
        'https://dequeuniversity.com/rules/axe/9.8/image-alt?application=axeAPI'
      );
    } finally {
      axe.version = realVersion;
    }
  });

  it('uses the environmentData url as the assertion subject source', () => {
    const report = getEarlReport(runResults, {
      environmentData: { url: 'https://deque.com/' }
    });
    report['@graph'].forEach(assertion => {
      assert.equal(assertion.subject.source, 'https://deque.com/');
    });
  });

  it('supports the options-as-callback shorthand', () => {
    let report;
    axe.getReporter('earl')(runResults, result => {
      report = result;
    });
    assert.hasAllKeys(report, ['@context', '@graph']);
  });

  it('returns an empty graph for empty results', () => {
    const report = getEarlReport([]);
    assert.deepEqual(report['@graph'], []);
  });

  it('passes non-array results straight through to the callback', () => {
    let report;
    axe.getReporter('earl')(undefined, {}, result => {
      report = result;
    });
    assert.isUndefined(report);

    // A truthy non-array is also forwarded unchanged (exercises !Array.isArray).
    const notArray = { not: 'an array' };
    let passthrough;
    axe.getReporter('earl')(notArray, {}, result => {
      passthrough = result;
    });
    assert.strictEqual(passthrough, notArray);
  });
});
