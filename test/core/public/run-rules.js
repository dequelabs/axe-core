describe('runRules', () => {
  let ver = axe.version.substring(0, axe.version.lastIndexOf('.'));
  const { captureError } = axe.testUtils;

  function iframeReady(src, context, id, cb) {
    let i = document.createElement('iframe');
    i.addEventListener('load', () => {
      cb();
    });
    i.src = src;
    i.id = id;
    context.appendChild(i);
  }

  function createFrames(url, callback) {
    let frame,
      num = 2;
    let loaded = 0;

    if (typeof url === 'function') {
      callback = url;
      url = '../mock/frames/frame-frame.html';
    }

    function onLoad() {
      loaded++;
      if (loaded >= num) {
        callback();
      }
    }

    frame = document.createElement('iframe');
    frame.src = url;

    frame.addEventListener('load', onLoad);
    fixture.appendChild(frame);

    frame = document.createElement('iframe');
    frame.src = '../mock/frames/nocode.html';
    frame.addEventListener('load', onLoad);
    fixture.appendChild(frame);
    return frame;
  }

  let fixture = document.getElementById('fixture');

  let isNotCalled;
  beforeEach(() => {
    isNotCalled = err => {
      throw err || new Error('Reject should not be called');
    };
  });

  afterEach(() => {
    fixture.innerHTML = '';
    axe._audit = null;
    axe.teardown();
  });

  it('should work', done => {
    axe._load({
      rules: [
        {
          id: 'html',
          selector: 'html',
          any: ['html']
        }
      ],
      checks: [{ id: 'html', evaluate: () => true }],
      messages: {}
    });

    let frame = document.createElement('iframe');
    frame.src = '../mock/frames/frame-frame.html';

    frame.addEventListener('load', () => {
      setTimeout(() => {
        axe._runRules(
          document,
          {},
          captureError(r => {
            assert.lengthOf(r[0].passes, 3);
            done();
          }, done),
          err => done(err)
        );
      }, 500);
    });
    fixture.appendChild(frame);
  });

  it('should properly order iframes', done => {
    axe._load({
      rules: [
        {
          id: 'iframe',
          selector: 'iframe',
          any: ['iframe']
        }
      ],
      checks: [{ id: 'iframe', evaluate: () => true }],
      messages: {}
    });

    let frame = document.createElement('iframe');
    frame.addEventListener('load', () => {
      setTimeout(() => {
        axe._runRules(
          document,
          {},
          captureError(r => {
            let nodes = r[0].passes.map(detail => {
              return detail.node.selector;
            });
            assert.deepEqual(nodes, [
              ['#level0'],
              ['#level0', '#level1'],
              ['#level0', '#level1', '#level2a'],
              ['#level0', '#level1', '#level2b']
            ]);
            done();
          }, done),
          isNotCalled
        );
      }, 500);
    });
    frame.id = 'level0';
    frame.src = '../mock/frames/nested0.html';
    fixture.appendChild(frame);
  });

  it('should properly calculate context and return results from matching frames', done => {
    axe._load({
      rules: [
        {
          id: 'div#target',
          selector: '#target',
          any: ['has-target']
        },
        {
          id: 'first-div',
          selector: 'div:not(#fixture)',
          any: ['first-div']
        }
      ],
      checks: [
        { id: 'has-target', evaluate: () => true },
        {
          id: 'first-div',
          evaluate(node) {
            this.relatedNodes([node]);
            return false;
          },
          after(results) {
            if (results.length) {
              results[0].result = true;
            }
            return [results[0]];
          }
        }
      ],
      messages: {}
    });

    iframeReady('../mock/frames/context.html', fixture, 'context-test', () => {
      let div = document.createElement('div');
      fixture.appendChild(div);

      axe._runRules(
        '#fixture',
        {},
        captureError(results => {
          assert.deepEqual(JSON.parse(JSON.stringify(results)), [
            {
              id: 'div#target',
              helpUrl:
                'https://dequeuniversity.com/rules/axe/' +
                ver +
                '/div#target?application=axeAPI',
              pageLevel: false,
              impact: null,
              inapplicable: [],
              incomplete: [],
              violations: [],
              passes: [
                {
                  result: 'passed',
                  impact: null,
                  node: {
                    selector: ['#context-test', '#target'],
                    ancestry: [
                      'html > body > div:nth-child(1) > iframe:nth-child(1)',
                      'html > body > div:nth-child(2)'
                    ],
                    xpath: [
                      "//iframe[@id='context-test']",
                      "//div[@id='target']"
                    ],
                    source: '<div id="target"></div>',
                    nodeIndexes: [12, 14],
                    fromFrame: true
                  },
                  any: [
                    {
                      id: 'has-target',
                      data: null,
                      relatedNodes: []
                    }
                  ],
                  all: [],
                  none: []
                }
              ],
              result: 'passed',
              tags: []
            },
            {
              id: 'first-div',
              helpUrl:
                'https://dequeuniversity.com/rules/axe/' +
                ver +
                '/first-div?application=axeAPI',
              pageLevel: false,
              impact: null,
              inapplicable: [],
              incomplete: [],
              violations: [],
              passes: [
                {
                  result: 'passed',
                  impact: null,
                  node: {
                    selector: ['#context-test', '#foo'],
                    ancestry: [
                      'html > body > div:nth-child(1) > iframe:nth-child(1)',
                      'html > body > div:nth-child(1)'
                    ],
                    xpath: ["//iframe[@id='context-test']", "//div[@id='foo']"],
                    source:
                      '<div id="foo">\n      <div id="bar"></div>\n    </div>',
                    nodeIndexes: [12, 9],
                    fromFrame: true
                  },
                  any: [
                    {
                      id: 'first-div',
                      data: null,
                      relatedNodes: [
                        {
                          selector: ['#context-test', '#foo'],
                          ancestry: [
                            'html > body > div:nth-child(1) > iframe:nth-child(1)',
                            'html > body > div:nth-child(1)'
                          ],
                          xpath: [
                            "//iframe[@id='context-test']",
                            "//div[@id='foo']"
                          ],
                          source:
                            '<div id="foo">\n      <div id="bar"></div>\n    </div>',
                          nodeIndexes: [12, 9],
                          fromFrame: true
                        }
                      ]
                    }
                  ],
                  all: [],
                  none: []
                }
              ],
              result: 'passed',
              tags: []
            }
          ]);
          done();
        }, done),
        isNotCalled
      );
    });
  });

  it('should reject if the context is invalid', done => {
    axe._load({
      rules: [
        {
          id: 'div#target',
          selector: '#target',
          any: ['has-target']
        }
      ],
      messages: {}
    });

    iframeReady('../mock/frames/context.html', fixture, 'context-test', () => {
      axe._runRules(
        '#not-happening',
        {},
        () => {
          assert.fail('This selector should not exist.');
        },
        captureError(error => {
          assert.isOk(error);
          assert.equal(
            error.message,
            'No elements found for include in page Context'
          );
          done();
        }, done)
      );
    });
  });

  it('should accept a jQuery-like object', done => {
    axe._load({
      rules: [
        {
          id: 'test',
          selector: '*',
          none: ['bob']
        }
      ],
      checks: [{ id: 'bob', evaluate: () => true }]
    });

    fixture.innerHTML =
      '<div id="t1"><span></span></div><div id="t2"><em></em></div>';

    let $test = {
      0: fixture.querySelector('#t1'),
      1: fixture.querySelector('#t2'),
      length: 2
    };

    axe.run(
      $test,
      captureError((err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 1);
        assert.lengthOf(results.violations[0].nodes, 4);
        assert.deepEqual(results.violations[0].nodes[0].target, ['#t1']);
        // assert.deepEqual(results.violations[0].nodes[1].target, ['span']);
        assert.deepEqual(results.violations[0].nodes[2].target, ['#t2']);
        // assert.deepEqual(results.violations[0].nodes[3].target, ['em']);
        done();
      }, done)
    );
  });

  it('should accept a NodeList', done => {
    axe._load({
      rules: [
        {
          id: 'test',
          selector: '*',
          none: ['fred']
        }
      ],
      checks: [{ id: 'fred', evaluate: () => true }]
    });

    fixture.innerHTML =
      '<div class="foo" id="t1"><span></span></div><div class="foo" id="t2"><em></em></div>';

    let test = fixture.querySelectorAll('.foo');
    axe.run(
      test,
      captureError((err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 1);
        assert.lengthOf(results.violations[0].nodes, 4);
        assert.deepEqual(results.violations[0].nodes[0].target, ['#t1']);
        // assert.deepEqual(results.violations[0].nodes[1].target, ['span']);
        assert.deepEqual(results.violations[0].nodes[2].target, ['#t2']);
        // assert.deepEqual(results.violations[0].nodes[3].target, ['em']);
        done();
      }, done)
    );
  });

  it('should pull metadata from configuration', done => {
    axe._load({
      rules: [
        {
          id: 'div#target',
          selector: '#target',
          any: ['has-target']
        },
        {
          id: 'first-div',
          selector: 'div#fixture div',
          any: ['first-div']
        }
      ],
      checks: [
        { id: 'has-target', evaluate: () => false },
        {
          id: 'first-div',
          evaluate(node) {
            this.relatedNodes([node]);
            return false;
          },
          after(results) {
            if (results.length) {
              results[0].result = true;
            }
            return [results[0]];
          }
        }
      ],
      data: {
        rules: {
          'div#target': {
            foo: 'bar',
            stuff: 'blah'
          },
          'first-div': {
            bar: 'foo',
            stuff: 'no'
          }
        },
        checks: {
          'first-div': {
            thingy: true,
            impact: 'serious',
            messages: {
              fail(checkResult) {
                return checkResult.id === 'first-div'
                  ? 'failing is not good'
                  : 'y u wrong rule?';
              },
              pass(checkResult) {
                return checkResult.id === 'first-div'
                  ? 'passing is good'
                  : 'y u wrong rule?';
              }
            }
          },
          'has-target': {
            otherThingy: true,
            impact: 'moderate',
            messages: {
              fail(checkResult) {
                return checkResult.id === 'has-target'
                  ? 'failing is not good'
                  : 'y u wrong rule?';
              },
              pass(checkResult) {
                return checkResult.id === 'has-target'
                  ? 'passing is good'
                  : 'y u wrong rule?';
              }
            }
          }
        }
      }
    });
    fixture.innerHTML = '<div id="target">Target!</div><div>ok</div>';
    axe._runRules(
      '#fixture',
      {},
      captureError(results => {
        assert.deepEqual(JSON.parse(JSON.stringify(results)), [
          {
            id: 'div#target',
            helpUrl:
              'https://dequeuniversity.com/rules/axe/' +
              ver +
              '/div#target?application=axeAPI',
            pageLevel: false,
            foo: 'bar',
            stuff: 'blah',
            impact: 'moderate',
            passes: [],
            inapplicable: [],
            incomplete: [],
            violations: [
              {
                result: 'failed',
                node: {
                  selector: ['#target'],
                  ancestry: [
                    'html > body > div:nth-child(1) > div:nth-child(1)'
                  ],
                  xpath: ["//div[@id='target']"],
                  source: '<div id="target">Target!</div>',
                  nodeIndexes: [12],
                  fromFrame: false
                },
                impact: 'moderate',
                any: [
                  {
                    impact: 'moderate',
                    otherThingy: true,
                    message: 'failing is not good',
                    id: 'has-target',
                    data: null,
                    relatedNodes: []
                  }
                ],
                all: [],
                none: []
              }
            ],
            result: 'failed',
            tags: []
          },
          {
            id: 'first-div',
            helpUrl:
              'https://dequeuniversity.com/rules/axe/' +
              ver +
              '/first-div?application=axeAPI',
            pageLevel: false,
            bar: 'foo',
            stuff: 'no',
            impact: null,
            inapplicable: [],
            incomplete: [],
            violations: [],
            passes: [
              {
                result: 'passed',
                impact: null,
                node: {
                  selector: ['#target'],
                  xpath: ["//div[@id='target']"],
                  ancestry: [
                    'html > body > div:nth-child(1) > div:nth-child(1)'
                  ],
                  source: '<div id="target">Target!</div>',
                  nodeIndexes: [12],
                  fromFrame: false
                },
                any: [
                  {
                    impact: 'serious',
                    id: 'first-div',
                    thingy: true,
                    message: 'passing is good',
                    data: null,
                    relatedNodes: [
                      {
                        selector: ['#target'],
                        ancestry: [
                          'html > body > div:nth-child(1) > div:nth-child(1)'
                        ],
                        xpath: ["//div[@id='target']"],
                        source: '<div id="target">Target!</div>',
                        nodeIndexes: [12],
                        fromFrame: false
                      }
                    ]
                  }
                ],
                all: [],
                none: []
              }
            ],
            result: 'passed',
            tags: []
          }
        ]);
        done();
      }, done),
      isNotCalled
    );
  });

  it('should call the reject argument if an error occurs', done => {
    axe._load({
      rules: [
        {
          id: 'invalidRule'
        }
      ],
      checks: [],
      messages: {}
    });

    createFrames(() => {
      setTimeout(() => {
        axe._runRules(
          document,
          {},
          () => {
            done(new Error('You shall not pass!'));
          },
          captureError(err => {
            assert.instanceOf(err, Error);
            done();
          }, done)
        );
      }, 100);
    });
  });

  it('should resolve to cantTell when a rule fails', done => {
    axe._load({
      rules: [
        {
          id: 'incomplete-1',
          selector: '*',
          none: ['undeffed']
        },
        {
          id: 'incomplete-2',
          selector: '*',
          none: ['thrower']
        }
      ],
      checks: [
        { id: 'undeffed', evaluate: () => undefined },
        {
          id: 'thrower',
          evaluate: () => {
            throw new Error('Check failed to complete');
          }
        }
      ]
    });

    fixture.innerHTML = '<div></div>';

    axe.run(
      '#fixture',
      captureError((err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.incomplete, 2);
        assert.equal(results.incomplete[0].id, 'incomplete-1');
        assert.equal(results.incomplete[1].id, 'incomplete-2');
        assert.isNotNull(results.incomplete[1].error);
        done();
      }, done)
    );
  });

  it('should resolve to cantTell if an error occurs inside frame rules', done => {
    axe._load({
      rules: [
        {
          id: 'incomplete-1',
          selector: '.nogo',
          none: ['undeffed']
        },
        {
          id: 'incomplete-2',
          selector: '.nogo',
          none: ['thrower']
        }
      ],
      checks: [
        { id: 'undeffed', evaluate: () => false },
        { id: 'thrower', evaluate: () => false }
      ]
    });

    iframeReady(
      '../mock/frames/rule-error.html',
      fixture,
      'context-test',
      () => {
        axe.run(
          '#fixture',
          captureError((err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.incomplete, 2);
            assert.equal(results.incomplete[0].id, 'incomplete-1');
            assert.equal(results.incomplete[1].id, 'incomplete-2');
            assert.isNotNull(results.incomplete[1].error);
            done();
          }, done)
        );
      }
    );
  });

  it('should cascade `no elements found` errors in frames to reject run_rules', done => {
    axe._load({
      rules: [
        {
          id: 'invalidRule'
        }
      ],
      checks: [],
      messages: {}
    });
    fixture.innerHTML = '<div id="outer"></div>';
    let outer = document.getElementById('outer');

    iframeReady('../mock/frames/context.html', outer, 'target', () => {
      axe._runRules(
        [['#target', '#elementNotFound']],
        {},
        function resolve() {
          done(new Error('frame should have thrown an error'));
        },
        captureError(function reject(err) {
          assert.instanceOf(err, Error);
          assert.include(
            err.message,
            'No elements found for include in frame Context'
          );
          done();
        }, done)
      );
    });
  });

  it('should not call reject when the resolve throws', done => {
    let rejectCalled = false;
    axe._load({
      rules: [
        {
          id: 'html',
          selector: 'html',
          any: ['html']
        }
      ],
      checks: [{ id: 'html', evaluate: () => true }],
      messages: {}
    });

    function resolve() {
      setTimeout(() => {
        assert.isFalse(rejectCalled);
        axe.log = log;
        done();
      }, 20);
      throw new Error('err');
    }
    function reject() {
      rejectCalled = true;
    }

    let log = axe.log;
    axe.log = e => {
      assert.equal(e.message, 'err');
      axe.log = log;
    };
    axe._runRules(document, {}, resolve, reject);
  });

  it('should ignore iframes if `iframes` === false', done => {
    axe._load({
      rules: [
        {
          id: 'html',
          selector: 'html',
          any: ['html']
        }
      ],
      checks: [{ id: 'html', evaluate: () => true }],
      messages: {}
    });

    let frame = document.createElement('iframe');
    frame.src = '../mock/frames/frame-frame.html';

    frame.addEventListener('load', () => {
      setTimeout(() => {
        axe._runRules(
          document,
          { iframes: false, elementRef: true },
          captureError(r => {
            assert.lengthOf(r[0].passes, 1);
            assert.equal(
              r[0].passes[0].node.element.ownerDocument,
              document,
              'Result should not be in an iframe'
            );
            done();
          }, done),
          isNotCalled
        );
      }, 500);
    });
    fixture.appendChild(frame);
  });

  it('should not fail if `include` / `exclude` is overwritten', done => {
    function invalid() {
      throw new Error('nope!');
    }
    Array.prototype.include = invalid;
    Array.prototype.exclude = invalid;

    axe._load({
      rules: [
        {
          id: 'html',
          selector: 'html',
          any: ['html']
        }
      ],
      checks: [{ id: 'html', evaluate: () => true }],
      messages: {}
    });

    axe._runRules(
      [document],
      {},
      captureError(r => {
        assert.lengthOf(r[0].passes, 1);

        delete Array.prototype.include;
        delete Array.prototype.exclude;
        done();
      }, done),
      isNotCalled
    );
  });

  it('should return a cleanup method', done => {
    axe._load({
      rules: [
        {
          id: 'html',
          selector: 'html',
          any: ['html']
        }
      ],
      checks: [{ id: 'html', evaluate: () => true }],
      messages: {}
    });

    axe._runRules(
      document,
      {},
      captureError(function resolve(out, cleanup) {
        assert.isDefined(axe._tree);
        assert.isDefined(axe._selectorData);

        cleanup();
        assert.isUndefined(axe._tree);
        assert.isUndefined(axe._selectorData);
        done();
      }, done),
      isNotCalled
    );
  });

  it('should clear up axe._tree / axe._selectorData after an error', done => {
    axe._load({
      rules: [
        {
          id: 'invalidRule'
        }
      ],
      checks: [],
      messages: {}
    });

    createFrames(() => {
      setTimeout(() => {
        axe._runRules(
          document,
          {},
          isNotCalled,
          captureError(() => {
            assert.isUndefined(axe._tree);
            assert.isUndefined(axe._selectorData);
            done();
          }, done)
        );
      }, 100);
    });
  });

  // todo: see issue - https://github.com/dequelabs/axe-core/issues/2168
  it.skip('should clear the memoized cache for each function', done => {
    axe._load({
      rules: [
        {
          id: 'html',
          selector: 'html',
          any: ['html']
        }
      ],
      checks: [{ id: 'html', evaluate: () => true }],
      messages: {}
    });

    axe._runRules(
      document,
      {},
      captureError(function resolve(out, cleanup) {
        let called = false;
        axe._memoizedFns = [
          {
            clear: () => {
              called = true;
            }
          }
        ];

        cleanup();
        assert.isTrue(called);
        done();
      }, done),
      isNotCalled
    );
  });
});
