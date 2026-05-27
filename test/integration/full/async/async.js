describe('async rule test', () => {
  let results;

  function AsyncCheck(node) {
    /*eslint indent: 0*/
    const check = this;
    const done = check.async();
    setTimeout(() => {
      const dataOut = node.getAttribute('data-out');
      check.data(dataOut);
      switch (dataOut) {
        case 'true':
          return done(true);

        case 'false':
          return done(false);

        default:
          return done(undefined);
      }
    }, 10);
  }

  before(done => {
    axe.configure({
      rules: [
        {
          id: 'my-async',
          metadata: {
            description: '',
            help: '',
            helpUrl: 'https://example.com/dylang'
          },
          selector: '.async',
          any: ['my-async'],
          all: [],
          none: [],
          tags: ['wcag2aa']
        }
      ],
      checks: [
        {
          id: 'my-async',
          options: [],
          evaluate: AsyncCheck.toString(),
          metadata: {
            impact: 'critical',
            messages: {
              pass: 'function (out) { return "passed with " + out.data }',
              fail: 'function (out) { return "failed with " + out.data }',
              incomplete:
                'function (out) { return "incomplete with " + out.data }'
            }
          }
        }
      ]
    });

    axe.run({ runOnly: { type: 'rule', values: ['my-async'] } }, (err, r) => {
      assert.isNull(err);
      results = r;
      done();
    });
  });

  describe('violations', () => {
    it('should find 1', () => {
      assert.lengthOf(results.violations, 1);
      assert.lengthOf(results.violations[0].nodes, 1);
    });

    it('should find #violation', () => {
      assert.equal(
        results.violations[0].nodes[0].any[0].message,
        'failed with false'
      );
      assert.deepEqual(results.violations[0].nodes[0].target, ['#violation']);
    });
  });

  describe('passes', () => {
    it('should find 1', () => {
      assert.lengthOf(results.passes, 1);
      assert.lengthOf(results.passes[0].nodes, 1);
    });

    it('should find #pass', () => {
      assert.equal(
        results.passes[0].nodes[0].any[0].message,
        'passed with true'
      );
      assert.deepEqual(results.passes[0].nodes[0].target, ['#pass']);
    });
  });

  describe('incomplete', () => {
    it('should find 1', () => {
      assert.lengthOf(results.incomplete, 1);
      assert.lengthOf(results.incomplete[0].nodes, 1);
    });

    it('should find #incomplete', () => {
      assert.equal(
        results.incomplete[0].nodes[0].any[0].message,
        'incomplete with undefined'
      );
      assert.deepEqual(results.incomplete[0].nodes[0].target, ['#incomplete']);
    });
  });
});
