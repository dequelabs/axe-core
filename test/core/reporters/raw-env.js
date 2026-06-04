describe('reporters - raw-env', () => {
  const fixture = document.getElementById('fixture');

  function createDqElement() {
    const node = document.createElement('div');
    fixture.appendChild(node);
    return new axe.utils.DqElement(node);
  }

  let runResults;

  beforeEach(() => {
    runResults = [
      {
        id: 'gimmeLabel',
        helpUrl: 'things',
        description: 'something nifty',
        tags: ['tag1'],
        result: 'passed',
        violations: [],
        passes: [
          {
            result: 'passed',
            any: [
              {
                result: true,
                data: 'minkey',
                relatedNodes: []
              }
            ],
            all: [],
            none: [],
            node: createDqElement()
          }
        ]
      },
      {
        id: 'idkStuff',
        description: 'something more nifty',
        pageLevel: true,
        result: 'failed',
        impact: 'cats',
        tags: ['tag2'],
        passes: [],
        violations: [
          {
            result: 'failed',
            all: [
              {
                result: false,
                data: 'pillock',
                impact: 'cats',
                relatedNodes: []
              }
            ],
            any: [],
            none: [],
            node: createDqElement(),
            impact: 'cats'
          }
        ]
      },
      {
        id: 'bypass',
        description: 'something even more nifty',
        tags: ['tag3'],
        impact: 'monkeys',
        result: 'failed',
        passes: [],
        violations: [
          {
            result: 'failed',
            impact: 'monkeys',
            none: [
              {
                data: 'foon',
                impact: 'monkeys',
                result: true,
                relatedNodes: []
              }
            ],
            any: [],
            all: [],
            node: createDqElement()
          }
        ]
      },
      {
        id: 'blinky',
        description: 'something awesome',
        tags: ['tag4'],
        violations: [],
        result: 'passed',
        passes: [
          {
            result: 'passed',
            any: [],
            all: [],
            none: [
              {
                data: 'clueso',
                result: true,
                relatedNodes: []
              }
            ],
            node: createDqElement()
          }
        ]
      }
    ];

    axe.testUtils.fixtureSetup();

    axe._load({});
    axe._cache.set('selectorData', {});
  });

  afterEach(() => {
    fixture.innerHTML = '';
    sinon.restore();
  });

  it('should serialize DqElements (#1195)', () => {
    axe.getReporter('rawEnv')(runResults, {}, results => {
      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        for (var j = 0; j < result.passes.length; j++) {
          var p = result.passes[j];
          assert.notInstanceOf(p.node, axe.utils.DqElement);
        }
      }
    });
  });

  it('should pass env object', () => {
    axe.getReporter('rawEnv')(runResults, {}, results => {
      assert.isDefined(results.env);
      assert.isDefined(results.env.url);
      assert.isDefined(results.env.timestamp);
      assert.isDefined(results.env.testEnvironment);
      assert.isDefined(results.env.testRunner);
    });
  });

  it('uses the environmentData option instead of environment data if specified', () => {
    const environmentData = {
      myReporter: 'hello world'
    };
    axe.getReporter('rawEnv')(
      runResults,
      { environmentData: environmentData },
      results => {
        assert.deepEqual(results.env, environmentData);
      }
    );
  });

  it('uses nodeSerializer', done => {
    const rawReporter = axe.getReporter('rawEnv');
    const spy = sinon.spy(axe.utils.nodeSerializer, 'mapRawNodeResults');
    rawReporter(
      runResults,
      {},
      () => {
        assert.isTrue(spy.called);
        done();
      },
      done
    );
  });
});
