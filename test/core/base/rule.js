describe('Rule', () => {
  const Rule = axe._thisWillBeDeletedDoNotUse.base.Rule;
  const Check = axe._thisWillBeDeletedDoNotUse.base.Check;
  const metadataFunctionMap =
    axe._thisWillBeDeletedDoNotUse.base.metadataFunctionMap;
  const fixture = document.getElementById('fixture');
  const { fixtureSetup, captureError } = axe.testUtils;
  const noop = () => {};
  const isNotCalled = function (err) {
    throw err || new Error('Reject should not be called');
  };

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should be a function', () => {
    assert.isFunction(Rule);
  });

  it('should accept two parameters', () => {
    assert.lengthOf(Rule, 2);
  });

  describe('prototype', () => {
    describe('gather', () => {
      it('should gather nodes which match the selector', () => {
        const node = document.createElement('div');
        node.id = 'monkeys';
        fixture.appendChild(node);

        const rule = new Rule({
          selector: '#monkeys'
        });
        let nodes = rule.gather({
          include: [axe.utils.getFlattenedTree(fixture)[0]],
          exclude: [],
          frames: []
        });

        assert.lengthOf(nodes, 1);
        assert.equal(nodes[0].actualNode, node);

        node.id = 'bananas';
        nodes = rule.gather({
          include: [axe.utils.getFlattenedTree(fixture)[0]],
          exclude: [],
          frames: []
        });

        assert.lengthOf(nodes, 0);
      });

      it('should return a real array', () => {
        const rule = new Rule({
          selector: 'div'
        });
        const result = rule.gather({
          include: [axe.utils.getFlattenedTree(fixture)[0]],
          exclude: [],
          frames: []
        });

        assert.isArray(result);
      });

      it('should take a context parameter', () => {
        const node = document.createElement('div');
        fixture.appendChild(node);

        const rule = new Rule({
          selector: 'div'
        });
        const nodes = rule.gather({
          include: [
            axe.utils.getFlattenedTree(
              document.getElementById('fixture').firstChild
            )[0]
          ]
        });

        assert.deepEqual(
          nodes.map(function (n) {
            return n.actualNode;
          }),
          [node]
        );
      });

      it('should default to all nodes if selector is not specified', () => {
        const nodes = [fixture];
        let node = document.createElement('div');

        fixture.appendChild(node);
        nodes.push(node);

        node = document.createElement('div');

        fixture.appendChild(node);
        nodes.push(node);

        const rule = new Rule({}),
          result = rule.gather({
            include: [
              axe.utils.getFlattenedTree(document.getElementById('fixture'))[0]
            ]
          });

        assert.lengthOf(result, 3);
        assert.sameMembers(
          result.map(function (n) {
            return n.actualNode;
          }),
          nodes
        );
      });
      it('should exclude hidden elements', () => {
        fixtureSetup('<div style="display: none"><span>HEHEHE</span></div>');

        const rule = new Rule({}),
          result = rule.gather({
            include: [
              axe.utils.getFlattenedTree(
                document.getElementById('fixture').firstChild
              )[0]
            ]
          });

        assert.lengthOf(result, 0);
      });
      it('should include hidden elements if excludeHidden is false', () => {
        fixtureSetup('<div style="display: none"></div>');

        const rule = new Rule({
          excludeHidden: false
        });
        const result = rule.gather({
          include: [
            axe.utils.getFlattenedTree(
              document.getElementById('fixture').firstChild
            )[0]
          ]
        });

        assert.deepEqual(
          result.map(function (n) {
            return n.actualNode;
          }),
          [fixture.firstChild]
        );
      });
    });

    describe('run', () => {
      it('should be a function', () => {
        assert.isFunction(Rule.prototype.run);
      });

      it('should run #matches', done => {
        const div = document.createElement('div');
        fixture.appendChild(div);
        let success = false;
        const rule = new Rule({
          matches: function (node) {
            assert.equal(node, div);
            success = true;
            return [];
          }
        });

        rule.run(
          {
            include: [axe.utils.getFlattenedTree(div)[0]]
          },
          {},
          () => {
            assert.isTrue(success);
            done();
          },
          isNotCalled
        );
      });

      it('should pass a virtualNode to #matches', done => {
        const div = document.createElement('div');
        fixture.appendChild(div);
        let success = false,
          rule = new Rule({
            matches: function (node, virtualNode) {
              assert.equal(virtualNode.actualNode, div);
              success = true;
              return [];
            }
          });

        rule.run(
          {
            include: [axe.utils.getFlattenedTree(div)[0]]
          },
          {},
          () => {
            assert.isTrue(success);
            done();
          },
          isNotCalled
        );
      });

      it('should pass a context to #matches', done => {
        const div = document.createElement('div');
        fixture.appendChild(div);
        let success = false,
          rule = new Rule({
            matches: function (node, virtualNode, context) {
              assert.isDefined(context);
              assert.hasAnyKeys(context, ['cssom', 'include', 'exclude']);
              assert.lengthOf(context.include, 1);
              success = true;
              return [];
            }
          });

        rule.run(
          {
            include: [axe.utils.getFlattenedTree(div)[0]]
          },
          {},
          () => {
            assert.isTrue(success);
            done();
          },
          isNotCalled
        );
      });

      it('should execute Check#run on its child checks - any', done => {
        fixtureSetup('<blink>Hi</blink>');
        let success = false;
        const rule = new Rule(
          {
            any: ['cats']
          },
          {
            checks: {
              cats: {
                run: function (node, options, context, resolve) {
                  success = true;
                  resolve(true);
                }
              }
            }
          }
        );

        rule.run(
          {
            include: [axe.utils.getFlattenedTree(fixture)[0]]
          },
          {},
          () => {
            assert.isTrue(success);
            done();
          },
          isNotCalled
        );
      });

      it('should execute Check#run on its child checks - all', done => {
        fixtureSetup('<blink>Hi</blink>');
        let success = false;
        const rule = new Rule(
          {
            all: ['cats']
          },
          {
            checks: {
              cats: {
                run: function (node, options, context, resolve) {
                  success = true;
                  resolve(true);
                }
              }
            }
          }
        );

        rule.run(
          {
            include: [axe.utils.getFlattenedTree(fixture)[0]]
          },
          {},
          () => {
            assert.isTrue(success);
            done();
          },
          isNotCalled
        );
      });

      it('should execute Check#run on its child checks - none', done => {
        fixtureSetup('<blink>Hi</blink>');
        let success = false;
        const rule = new Rule(
          {
            none: ['cats']
          },
          {
            checks: {
              cats: {
                run: function (node, options, context, resolve) {
                  success = true;
                  resolve(true);
                }
              }
            }
          },
          isNotCalled
        );

        rule.run(
          {
            include: [axe.utils.getFlattenedTree(fixture)[0]]
          },
          {},
          () => {
            assert.isTrue(success);
            done();
          },
          isNotCalled
        );
      });

      it('should pass the matching option to check.run', done => {
        fixtureSetup('<blink>Hi</blink>');
        const options = {
          checks: {
            cats: {
              enabled: 'bananas',
              options: 'minkeys'
            }
          }
        };
        const rule = new Rule(
          {
            none: ['cats']
          },
          {
            checks: {
              cats: {
                id: 'cats',
                run: function (node, opts, context, resolve) {
                  assert.equal(opts.enabled, 'bananas');
                  assert.equal(opts.options, 'minkeys');
                  resolve(true);
                }
              }
            }
          }
        );
        rule.run(
          {
            include: [axe.utils.getFlattenedTree(document)[0]]
          },
          options,
          () => {
            done();
          },
          isNotCalled
        );
      });

      it('should pass the matching option to check.run defined on the rule over global', done => {
        fixtureSetup('<blink>Hi</blink>');
        const options = {
          rules: {
            cats: {
              checks: {
                cats: {
                  enabled: 'apples',
                  options: 'apes'
                }
              }
            }
          },
          checks: {
            cats: {
              enabled: 'bananas',
              options: 'minkeys'
            }
          }
        };

        const rule = new Rule(
          {
            id: 'cats',
            any: [
              {
                id: 'cats'
              }
            ]
          },
          {
            checks: {
              cats: {
                id: 'cats',
                run: function (node, opts, context, resolve) {
                  assert.equal(opts.enabled, 'apples');
                  assert.equal(opts.options, 'apes');
                  resolve(true);
                }
              }
            }
          }
        );
        rule.run(
          {
            include: [axe.utils.getFlattenedTree(document)[0]]
          },
          options,
          () => {
            done();
          },
          isNotCalled
        );
      });

      it('should filter out null results', () => {
        const rule = new Rule(
          {
            selector: '#fixture',
            any: ['cats']
          },
          {
            checks: {
              cats: {
                id: 'cats',
                run: () => {}
              }
            }
          }
        );
        rule.run(
          {
            include: [axe.utils.getFlattenedTree(document)[0]]
          },
          {},
          function (r) {
            assert.lengthOf(r.nodes, 0);
          },
          isNotCalled
        );
      });

      describe.skip('DqElement', () => {
        let origDqElement;
        let isDqElementCalled;

        beforeEach(() => {
          isDqElementCalled = false;
          origDqElement = axe.utils.DqElement;
          axe.utils.DqElement = () => {
            isDqElementCalled = true;
          };
          fixtureSetup('<blink>Hi</blink>');
        });

        afterEach(() => {
          axe.utils.DqElement = origDqElement;
        });

        it('is created for matching nodes', done => {
          const rule = new Rule(
            {
              all: ['cats']
            },
            {
              checks: {
                cats: new Check({
                  id: 'cats',
                  enabled: true,
                  evaluate: () => {
                    return true;
                  },
                  matches: () => {
                    return true;
                  }
                })
              }
            }
          );
          rule.run(
            {
              include: [axe.utils.getFlattenedTree(fixture)[0]]
            },
            {},
            () => {
              assert.isTrue(isDqElementCalled);
              done();
            },
            isNotCalled
          );
        });

        it('is not created for disabled checks', done => {
          const rule = new Rule(
            {
              all: ['cats']
            },
            {
              checks: {
                cats: new Check({
                  id: 'cats',
                  enabled: false,
                  evaluate: () => {},
                  matches: () => {
                    return true;
                  }
                })
              }
            }
          );
          rule.run(
            {
              include: [axe.utils.getFlattenedTree(fixture)[0]]
            },
            {},
            () => {
              assert.isFalse(isDqElementCalled);
              done();
            },
            isNotCalled
          );
        });

        it('is created for matching nodes', done => {
          const rule = new Rule(
            {
              all: ['cats']
            },
            {
              checks: {
                cats: new Check({
                  id: 'cats',
                  enabled: true,
                  evaluate: () => {
                    return true;
                  }
                })
              }
            }
          );
          rule.run(
            {
              include: [axe.utils.getFlattenedTree(fixture)[0]]
            },
            {},
            () => {
              assert.isTrue(isDqElementCalled);
              done();
            },
            isNotCalled
          );
        });

        it('is not created for disabled checks', done => {
          const rule = new Rule(
            {
              all: ['cats']
            },
            {
              checks: {
                cats: new Check({
                  id: 'cats',
                  enabled: false,
                  evaluate: () => {}
                })
              }
            }
          );
          rule.run(
            {
              include: [axe.utils.getFlattenedTree(fixture)[0]]
            },
            {},
            () => {
              assert.isFalse(isDqElementCalled);
              done();
            },
            isNotCalled
          );
        });
      });

      it('should pass thrown errors to the reject param', done => {
        fixtureSetup('<blink>Hi</blink>');
        const rule = new Rule(
          { none: ['cats'] },
          {
            checks: {
              cats: {
                run: () => {
                  throw new Error('Holy hand grenade');
                }
              }
            }
          }
        );

        rule.run(
          {
            include: [axe.utils.getFlattenedTree(fixture)[0]]
          },
          {},
          noop,
          function (err) {
            assert.equal(err.message, 'Holy hand grenade');
            done();
          },
          isNotCalled
        );
      });

      it('should pass reject calls to the reject param', done => {
        fixtureSetup('<blink>Hi</blink>');
        const rule = new Rule(
          {
            none: ['cats']
          },
          {
            checks: {
              cats: {
                run: function (nope, options, context, resolve, reject) {
                  reject(new Error('your reality'));
                }
              }
            }
          }
        );

        rule.run(
          {
            include: [axe.utils.getFlattenedTree(fixture)[0]]
          },
          {},
          noop,
          function (err) {
            assert.equal(err.message, 'your reality');
            done();
          },
          isNotCalled
        );
      });

      it('should mark checks as incomplete if reviewOnFail is set to true', done => {
        axe.setup();
        const rule = new Rule(
          {
            reviewOnFail: true,
            all: ['cats'],
            any: ['cats'],
            none: ['dogs']
          },
          {
            checks: {
              cats: new Check({
                id: 'cats',
                evaluate: () => {
                  return false;
                }
              }),
              dogs: new Check({
                id: 'dogs',
                evaluate: () => {
                  return true;
                }
              })
            }
          }
        );

        rule.run(
          {
            include: [axe.utils.getFlattenedTree(fixture)[0]]
          },
          {},
          function (results) {
            assert.isUndefined(results.nodes[0].all[0].result);
            assert.isUndefined(results.nodes[0].any[0].result);
            assert.isUndefined(results.nodes[0].none[0].result);
            done();
          },
          isNotCalled
        );
      });

      describe('error handling', () => {
        it('should return a RuleError if #matches throws', done => {
          const rule = new Rule({
            id: 'fizz',
            matches: () => {
              throw new Error('this is an error');
            }
          });
          axe.setup();
          rule.run(
            { include: [axe.utils.getFlattenedTree(fixture)[0]] },
            {},
            isNotCalled,
            captureError(err => {
              assert.instanceOf(err, axe.utils.RuleError);
              assert.include(err.message, 'this is an error');
              assert.equal(err.ruleId, 'fizz');
              assert.equal(err.method, '#matches');
              assert.deepEqual(err.errorNode.selector, ['#fixture']);
              done();
            }, done)
          );
        });

        it('should return a RuleError if check.evaluate throws', done => {
          const rule = new Rule(
            { id: 'garden', any: ['plants'] },
            {
              checks: {
                plants: new Check({
                  id: 'plants',
                  enabled: true,
                  evaluate: () => {
                    throw new Error('zombies ate my pants');
                  }
                })
              }
            }
          );
          axe.setup();
          rule.run(
            { include: axe.utils.getFlattenedTree(fixture) },
            {},
            isNotCalled,
            captureError(err => {
              assert.instanceOf(err, axe.utils.RuleError);
              assert.include(err.message, 'zombies ate my pants');
              assert.equal(err.ruleId, 'garden');
              assert.equal(err.method, 'plants#evaluate');
              assert.deepEqual(err.errorNode.selector, ['#fixture']);
              done();
            }, done)
          );
        });
      });

      describe('NODE rule', () => {
        it('should create a RuleResult', () => {
          axe.setup();
          const orig = window.RuleResult;
          let success = false;
          window.RuleResult = function (r) {
            this.nodes = [];
            assert.equal(rule, r);
            success = true;
          };

          const rule = new Rule(
            {
              any: [
                {
                  evaluate: () => {},
                  id: 'cats'
                }
              ]
            },
            {
              checks: {
                cats: {
                  run: function (node, options, context, resolve) {
                    success = true;
                    resolve(true);
                  }
                }
              }
            }
          );
          rule.run(
            {
              include: [axe.utils.getFlattenedTree(document)[0]]
            },
            {},
            noop,
            isNotCalled
          );
          assert.isTrue(success);

          window.RuleResult = orig;
        });

        it('should execute rule callback', () => {
          axe.setup();
          let success = false;

          const rule = new Rule(
            {
              any: [
                {
                  evaluate: () => {},
                  id: 'cats'
                }
              ]
            },
            {
              checks: {
                cats: {
                  run: function (node, options, context, resolve) {
                    success = true;
                    resolve(true);
                  }
                }
              }
            }
          );
          rule.run(
            {
              include: [axe.utils.getFlattenedTree(document)[0]]
            },
            {},
            () => {
              success = true;
            },
            isNotCalled
          );
          assert.isTrue(success);
        });
      });
    });

    describe('runSync', () => {
      it('should be a function', () => {
        assert.isFunction(Rule.prototype.runSync);
      });

      it('should run #matches', () => {
        const div = document.createElement('div');
        fixture.appendChild(div);
        let success = false;
        const rule = new Rule({
          matches: function (node) {
            assert.equal(node, div);
            success = true;
            return [];
          }
        });

        try {
          rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(div)[0]]
            },
            {}
          );
          assert.isTrue(success);
        } catch (err) {
          isNotCalled(err);
        }
      });

      it('should pass a virtualNode to #matches', () => {
        const div = document.createElement('div');
        fixture.appendChild(div);
        let success = false;
        const rule = new Rule({
          matches: function (node, virtualNode) {
            assert.equal(virtualNode.actualNode, div);
            success = true;
            return [];
          }
        });

        try {
          rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(div)[0]]
            },
            {}
          );
          assert.isTrue(success);
        } catch (err) {
          isNotCalled(err);
        }
      });

      it('should pass a context to #matches', () => {
        const div = document.createElement('div');
        fixture.appendChild(div);
        let success = false;
        const rule = new Rule({
          matches: function (node, virtualNode, context) {
            assert.isDefined(context);
            assert.hasAnyKeys(context, ['cssom', 'include', 'exclude']);
            assert.lengthOf(context.include, 1);
            success = true;
            return [];
          }
        });

        try {
          rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(div)[0]]
            },
            {}
          );
          assert.isTrue(success);
        } catch (err) {
          isNotCalled(err);
        }
      });

      it('should handle an error in #matches', () => {
        const div = document.createElement('div');
        div.setAttribute('style', '#fff');
        fixture.appendChild(div);
        let success = false;
        const rule = new Rule({
          matches: () => {
            throw new Error('this is an error');
          }
        });

        try {
          rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(div)[0]]
            },
            {}
          );
          isNotCalled();
        } catch {
          assert.isFalse(success);
        }
      });

      it('should execute Check#runSync on its child checks - any', () => {
        fixtureSetup('<blink>Hi</blink>');
        let success = false;
        const rule = new Rule(
          {
            any: ['cats']
          },
          {
            checks: {
              cats: {
                runSync: () => {
                  success = true;
                }
              }
            }
          }
        );

        try {
          rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(fixture)[0]]
            },
            {}
          );
          assert.isTrue(success);
        } catch (err) {
          isNotCalled(err);
        }
      });

      it('should execute Check#runSync on its child checks - all', () => {
        fixtureSetup('<blink>Hi</blink>');
        let success = false;
        const rule = new Rule(
          {
            all: ['cats']
          },
          {
            checks: {
              cats: {
                runSync: () => {
                  success = true;
                }
              }
            }
          }
        );

        try {
          rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(fixture)[0]]
            },
            {}
          );
          assert.isTrue(success);
        } catch (err) {
          isNotCalled(err);
        }
      });

      it('should execute Check#run on its child checks - none', () => {
        fixtureSetup('<blink>Hi</blink>');
        let success = false;
        const rule = new Rule(
          {
            none: ['cats']
          },
          {
            checks: {
              cats: {
                runSync: () => {
                  success = true;
                }
              }
            }
          },
          isNotCalled
        );

        try {
          rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(fixture)[0]]
            },
            {}
          );
          assert.isTrue(success);
        } catch (err) {
          isNotCalled(err);
        }
      });

      it('should pass the matching option to check.runSync', () => {
        fixtureSetup('<blink>Hi</blink>');
        const options = {
          checks: {
            cats: {
              enabled: 'bananas',
              options: 'minkeys'
            }
          }
        };
        const rule = new Rule(
          {
            none: ['cats']
          },
          {
            checks: {
              cats: {
                id: 'cats',
                runSync: function (node, opts) {
                  assert.equal(opts.enabled, 'bananas');
                  assert.equal(opts.options, 'minkeys');
                }
              }
            }
          }
        );

        try {
          rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(document)[0]]
            },
            options
          );
        } catch (err) {
          isNotCalled(err);
        }
      });

      it('should pass the matching option to check.runSync defined on the rule over global', () => {
        fixtureSetup('<blink>Hi</blink>');
        const options = {
          rules: {
            cats: {
              checks: {
                cats: {
                  enabled: 'apples',
                  options: 'apes'
                }
              }
            }
          },
          checks: {
            cats: {
              enabled: 'bananas',
              options: 'minkeys'
            }
          }
        };

        const rule = new Rule(
          {
            id: 'cats',
            any: [
              {
                id: 'cats'
              }
            ]
          },
          {
            checks: {
              cats: {
                id: 'cats',
                runSync: function (node, opts) {
                  assert.equal(opts.enabled, 'apples');
                  assert.equal(opts.options, 'apes');
                }
              }
            }
          }
        );

        try {
          rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(document)[0]]
            },
            options
          );
        } catch (err) {
          isNotCalled(err);
        }
      });

      it('should filter out null results', () => {
        const rule = new Rule(
          {
            selector: '#fixture',
            any: ['cats']
          },
          {
            checks: {
              cats: {
                id: 'cats',
                runSync: () => {}
              }
            }
          }
        );

        try {
          const r = rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(document)[0]]
            },
            {}
          );
          assert.lengthOf(r.nodes, 0);
        } catch (err) {
          isNotCalled(err);
        }
      });

      describe.skip('DqElement', () => {
        let origDqElement;
        let isDqElementCalled;

        beforeEach(() => {
          isDqElementCalled = false;
          origDqElement = axe.utils.DqElement;
          axe.utils.DqElement = () => {
            isDqElementCalled = true;
          };
          fixtureSetup('<blink>Hi</blink>');
        });

        afterEach(() => {
          axe.utils.DqElement = origDqElement;
        });

        it('is created for matching nodes', () => {
          const rule = new Rule(
            {
              all: ['cats']
            },
            {
              checks: {
                cats: new Check({
                  id: 'cats',
                  enabled: true,
                  evaluate: () => {
                    return true;
                  },
                  matches: () => {
                    return true;
                  }
                })
              }
            }
          );

          try {
            rule.runSync(
              {
                include: [axe.utils.getFlattenedTree(fixture)[0]]
              },
              {}
            );
            assert.isTrue(isDqElementCalled);
          } catch (err) {
            isNotCalled(err);
          }
        });

        it('is not created for disabled checks', () => {
          const rule = new Rule(
            {
              all: ['cats']
            },
            {
              checks: {
                cats: new Check({
                  id: 'cats',
                  enabled: false,
                  evaluate: () => {},
                  matches: () => {
                    return true;
                  }
                })
              }
            }
          );

          try {
            rule.runSync(
              {
                include: [axe.utils.getFlattenedTree(fixture)[0]]
              },
              {}
            );
            assert.isFalse(isDqElementCalled);
          } catch (err) {
            isNotCalled(err);
          }
        });

        it('is created for matching nodes', () => {
          const rule = new Rule(
            {
              all: ['cats']
            },
            {
              checks: {
                cats: new Check({
                  id: 'cats',
                  enabled: true,
                  evaluate: () => {
                    return true;
                  }
                })
              }
            }
          );

          try {
            rule.runSync(
              {
                include: [axe.utils.getFlattenedTree(fixture)[0]]
              },
              {}
            );
            assert.isTrue(isDqElementCalled);
          } catch (err) {
            isNotCalled(err);
          }
        });

        it('is not created for disabled checks', () => {
          const rule = new Rule(
            {
              all: ['cats']
            },
            {
              checks: {
                cats: new Check({
                  id: 'cats',
                  enabled: false,
                  evaluate: () => {}
                })
              }
            }
          );
          rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(fixture)[0]]
            },
            {},
            () => {
              assert.isFalse(isDqElementCalled);
            },
            isNotCalled
          );
        });

        it('should not be called when there is no actualNode', () => {
          const rule = new Rule(
            {
              all: ['cats']
            },
            {
              checks: {
                cats: new Check({
                  id: 'cats',
                  evaluate: () => {}
                })
              }
            }
          );
          rule.excludeHidden = false; // so we don't call utils.isHidden
          const vNode = {
            shadowId: undefined,
            children: [],
            parent: undefined,
            _cache: {},
            _isHidden: null,
            _attrs: {
              type: 'text',
              autocomplete: 'not-on-my-watch'
            },
            props: {
              nodeType: 1,
              nodeName: 'input',
              id: null,
              type: 'text'
            },
            hasClass: () => {
              return false;
            },
            attr: function (attrName) {
              return this._attrs[attrName];
            },
            hasAttr: function (attrName) {
              return !!this._attrs[attrName];
            }
          };
          rule.runSync(
            {
              include: [vNode]
            },
            {},
            () => {
              assert.isFalse(isDqElementCalled);
            },
            isNotCalled
          );
        });
      });

      it('should pass thrown errors to the reject param', () => {
        fixtureSetup('<blink>Hi</blink>');
        const rule = new Rule(
          {
            none: ['cats']
          },
          {
            checks: {
              cats: {
                runSync: () => {
                  throw new Error('Holy hand grenade');
                }
              }
            }
          }
        );

        try {
          rule.runSync(
            {
              include: [axe.utils.getFlattenedTree(fixture)[0]]
            },
            {}
          );
          isNotCalled();
        } catch (err) {
          assert.equal(err.message, 'Holy hand grenade');
        }
      });

      it('should mark checks as incomplete if reviewOnFail is set to true', () => {
        axe.setup();
        const rule = new Rule(
          {
            reviewOnFail: true,
            all: ['cats'],
            any: ['cats'],
            none: ['dogs']
          },
          {
            checks: {
              cats: new Check({
                id: 'cats',
                evaluate: () => {
                  return false;
                }
              }),
              dogs: new Check({
                id: 'dogs',
                evaluate: () => {
                  return true;
                }
              })
            }
          }
        );

        const results = rule.runSync(
          {
            include: [axe.utils.getFlattenedTree(fixture)[0]]
          },
          {}
        );

        assert.isUndefined(results.nodes[0].all[0].result);
        assert.isUndefined(results.nodes[0].any[0].result);
        assert.isUndefined(results.nodes[0].none[0].result);
      });

      describe.skip('NODE rule', () => {
        it('should create a RuleResult', () => {
          const orig = window.RuleResult;
          let success = false;
          window.RuleResult = function (r) {
            this.nodes = [];
            assert.equal(rule, r);
            success = true;
          };

          const rule = new Rule(
            {
              any: [
                {
                  evaluate: () => {},
                  id: 'cats'
                }
              ]
            },
            {
              checks: {
                cats: {
                  runSync: () => {}
                }
              }
            }
          );

          try {
            rule.runSync(
              {
                include: [axe.utils.getFlattenedTree(document)[0]]
              },
              {}
            );
            assert.isTrue(success);
          } catch (err) {
            isNotCalled(err);
          }

          window.RuleResult = orig;
        });

        it('should execute rule callback', () => {
          let success = false;

          const rule = new Rule(
            {
              any: [
                {
                  evaluate: () => {},
                  id: 'cats'
                }
              ]
            },
            {
              checks: {
                cats: {
                  runSync: () => {
                    success = true;
                  }
                }
              }
            }
          );

          try {
            rule.runSync(
              {
                include: [axe.utils.getFlattenedTree(document)[0]]
              },
              {}
            );
          } catch (err) {
            isNotCalled(err);
          }

          assert.isTrue(success);
        });
      });
    });

    describe('after', () => {
      it('should execute Check#after with options', () => {
        let success = false;

        const rule = new Rule(
          {
            id: 'cats',
            any: ['cats']
          },
          {
            checks: {
              cats: {
                id: 'cats',
                enabled: true,
                after: function (results, options) {
                  assert.deepEqual(options, { dogs: true });
                  success = true;
                  return results;
                }
              }
            }
          }
        );

        rule.after(
          {
            id: 'cats',
            nodes: [
              {
                all: [],
                none: [],
                any: [
                  {
                    id: 'cats',
                    result: true
                  }
                ]
              }
            ]
          },
          { checks: { cats: { options: { dogs: true } } } }
        );

        assert.isTrue(success);
      });

      it('should add the check node to the check result', () => {
        let success = false;

        const rule = new Rule(
          {
            id: 'cats',
            any: ['cats']
          },
          {
            checks: {
              cats: {
                id: 'cats',
                enabled: true,
                after: function (results) {
                  assert.equal(results[0].node, 'customNode');
                  success = true;
                  return results;
                }
              }
            }
          }
        );

        rule.after(
          {
            id: 'cats',
            nodes: [
              {
                all: [],
                none: [],
                any: [
                  {
                    id: 'cats',
                    result: true
                  }
                ],
                node: 'customNode'
              }
            ]
          },
          { checks: { cats: { options: { dogs: true } } } }
        );

        assert.isTrue(success);
      });

      it('should filter removed checks', () => {
        const rule = new Rule(
          {
            id: 'cats',
            any: ['cats']
          },
          {
            checks: {
              cats: {
                id: 'cats',
                after: function (results) {
                  return [results[0]];
                }
              }
            }
          }
        );

        const result = rule.after(
          {
            id: 'cats',
            nodes: [
              {
                any: [],
                none: [],
                all: [
                  {
                    id: 'cats',
                    result: true
                  }
                ]
              },
              {
                any: [],
                none: [],
                all: [
                  {
                    id: 'cats',
                    result: false
                  }
                ]
              }
            ]
          },
          { checks: { cats: { options: { dogs: true } } } }
        );

        assert.lengthOf(result.nodes, 1);
        assert.equal(result.nodes[0].all[0].id, 'cats');
        assert.isTrue(result.nodes[0].all[0].result);
      });

      it('should combine all checks for pageLevel rules', () => {
        const rule = new Rule({});

        const result = rule.after(
          {
            id: 'cats',
            pageLevel: true,
            nodes: [
              {
                any: [],
                none: [],
                all: [
                  {
                    id: 'cats',
                    result: false
                  }
                ]
              },
              {
                any: [],
                none: [
                  {
                    id: 'dogs',
                    result: false
                  }
                ],
                all: []
              },
              {
                any: [
                  {
                    id: 'monkeys',
                    result: false
                  }
                ],
                none: [],
                all: []
              }
            ]
          },
          { checks: { cats: { options: { dogs: true } } } }
        );

        assert.lengthOf(result.nodes, 1);
      });

      it('should throw a RuleError if check.after throws', () => {
        const rule = new Rule(
          { id: 'dogs', any: ['cats'] },
          {
            checks: {
              cats: {
                id: 'cats',
                enabled: true,
                after: () => {
                  throw new Error('this is an error');
                }
              }
            }
          }
        );
        axe.setup();
        try {
          rule.after(
            {
              id: 'cats',
              nodes: [
                {
                  all: [],
                  none: [],
                  any: [{ id: 'cats', result: true }],
                  node: new axe.utils.DqElement(fixture)
                }
              ]
            },
            {}
          );
          assert.fail('Should have thrown');
        } catch (err) {
          assert.instanceOf(err, axe.utils.RuleError);
          assert.include(err.message, 'this is an error');
          assert.equal(err.ruleId, 'dogs');
          assert.equal(err.method, 'cats#after');
          assert.deepEqual(err.errorNode.selector, ['#fixture']);
        }
      });
    });

    describe('reviewOnFail', () => {
      it('should mark checks as incomplete if reviewOnFail is set to true for all', () => {
        axe.setup();
        const rule = new Rule(
          {
            id: 'cats',
            reviewOnFail: true,
            all: ['cats'],
            any: [],
            none: []
          },
          {
            checks: {
              cats: new Check({
                id: 'cats',
                enabled: true,
                after: function (results) {
                  results[0].result = false;
                  return results;
                }
              })
            }
          }
        );

        const result = rule.after(
          {
            id: 'cats',
            nodes: [
              {
                any: [],
                none: [],
                all: [
                  {
                    id: 'cats',
                    result: true
                  }
                ]
              }
            ]
          },
          { checks: { cats: { options: {} } } }
        );

        assert.isEmpty(result.nodes[0].any);
        assert.isEmpty(result.nodes[0].none);
        assert.isUndefined(result.nodes[0].all[0].result);
      });

      it('should mark checks as incomplete if reviewOnFail is set to true for any', () => {
        const rule = new Rule(
          {
            id: 'cats',
            reviewOnFail: true,
            all: [],
            any: ['cats'],
            none: []
          },
          {
            checks: {
              cats: new Check({
                id: 'cats',
                enabled: true,
                after: function (results) {
                  results[0].result = false;
                  return results;
                }
              })
            }
          }
        );

        const result = rule.after(
          {
            id: 'cats',
            nodes: [
              {
                any: [
                  {
                    id: 'cats',
                    result: true
                  }
                ],
                none: [],
                all: []
              }
            ]
          },
          { checks: { cats: { options: {} } } }
        );

        assert.isUndefined(result.nodes[0].any[0].result);
        assert.isEmpty(result.nodes[0].none);
        assert.isEmpty(result.nodes[0].all);
      });

      it('should mark checks as incomplete if reviewOnFail is set to true for none', () => {
        const rule = new Rule(
          {
            id: 'cats',
            reviewOnFail: true,
            all: [],
            any: [],
            none: ['cats']
          },
          {
            checks: {
              cats: new Check({
                id: 'cats',
                enabled: true,
                after: function (results) {
                  results[0].result = true;
                  return results;
                }
              })
            }
          }
        );

        const result = rule.after(
          {
            id: 'cats',
            nodes: [
              {
                any: [],
                none: [
                  {
                    id: 'cats',
                    result: false
                  }
                ],
                all: []
              }
            ]
          },
          { checks: { cats: { options: {} } } }
        );

        assert.isEmpty(result.nodes[0].any);
        assert.isUndefined(result.nodes[0].none[0].result);
        assert.isEmpty(result.nodes[0].all);
      });
    });
  });

  describe('spec object', () => {
    describe('.selector', () => {
      it('should be set', () => {
        const spec = {
          selector: '#monkeys'
        };
        assert.equal(new Rule(spec).selector, spec.selector);
      });

      it('should default to *', () => {
        const spec = {};
        assert.equal(new Rule(spec).selector, '*');
      });
    });

    describe('.enabled', () => {
      it('should be set', () => {
        const spec = {
          enabled: false
        };
        assert.equal(new Rule(spec).enabled, spec.enabled);
      });

      it('should default to true', () => {
        const spec = {};
        assert.isTrue(new Rule(spec).enabled);
      });

      it('should default to true if given a bad value', () => {
        const spec = {
          enabled: 'monkeys'
        };
        assert.isTrue(new Rule(spec).enabled);
      });
    });

    describe('.excludeHidden', () => {
      it('should be set', () => {
        const spec = {
          excludeHidden: false
        };
        assert.equal(new Rule(spec).excludeHidden, spec.excludeHidden);
      });

      it('should default to true', () => {
        const spec = {};
        assert.isTrue(new Rule(spec).excludeHidden);
      });

      it('should default to true if given a bad value', () => {
        const spec = {
          excludeHidden: 'monkeys'
        };
        assert.isTrue(new Rule(spec).excludeHidden);
      });
    });

    describe('.pageLevel', () => {
      it('should be set', () => {
        const spec = {
          pageLevel: false
        };
        assert.equal(new Rule(spec).pageLevel, spec.pageLevel);
      });

      it('should default to false', () => {
        const spec = {};
        assert.isFalse(new Rule(spec).pageLevel);
      });

      it('should default to false if given a bad value', () => {
        const spec = {
          pageLevel: 'monkeys'
        };
        assert.isFalse(new Rule(spec).pageLevel);
      });
    });

    describe('.reviewOnFail', () => {
      it('should be set', () => {
        const spec = {
          reviewOnFail: true
        };
        assert.equal(new Rule(spec).reviewOnFail, spec.reviewOnFail);
      });

      it('should default to false', () => {
        const spec = {};
        assert.isFalse(new Rule(spec).reviewOnFail);
      });

      it('should default to false if given a bad value', () => {
        const spec = {
          reviewOnFail: 'monkeys'
        };
        assert.isFalse(new Rule(spec).reviewOnFail);
      });
    });

    describe('.id', () => {
      it('should be set', () => {
        const spec = {
          id: 'monkeys'
        };
        assert.equal(new Rule(spec).id, spec.id);
      });

      it('should have no default', () => {
        const spec = {};
        assert.equal(new Rule(spec).id, spec.id);
      });
    });

    describe('.impact', () => {
      it('should be set', () => {
        const spec = {
          impact: 'critical'
        };
        assert.equal(new Rule(spec).impact, spec.impact);
      });

      it('should have no default', () => {
        const spec = {};
        assert.isUndefined(new Rule(spec).impact);
      });

      it('throws if impact is invalid', () => {
        assert.throws(() => {
          // eslint-disable-next-line no-new
          new Rule({ impact: 'hello' });
        });
      });
    });

    describe('.any', () => {
      it('should be set', () => {
        const spec = {
          any: [
            {
              name: 'monkeys'
            },
            {
              name: 'bananas'
            },
            {
              name: 'pajamas'
            }
          ]
        };
        assert.property(new Rule(spec), 'any');
      });
    });

    describe('.all', () => {
      it('should be set', () => {
        const spec = {
          all: [
            {
              name: 'monkeys'
            },
            {
              name: 'bananas'
            },
            {
              name: 'pajamas'
            }
          ]
        };
        assert.property(new Rule(spec), 'all');
      });
    });

    describe('.none', () => {
      it('should be set', () => {
        const spec = {
          none: [
            {
              name: 'monkeys'
            },
            {
              name: 'bananas'
            },
            {
              name: 'pajamas'
            }
          ]
        };
        assert.property(new Rule(spec), 'none');
      });
    });

    describe('.matches', () => {
      it('should be set', () => {
        const spec = {
          matches: () => {}
        };
        assert.equal(new Rule(spec).matches, spec.matches);
      });

      it('should default to prototype', () => {
        const spec = {};
        assert.equal(new Rule(spec).matches, Rule.prototype.matches);
      });

      it('should turn a string into a function', () => {
        const spec = {
          matches: 'function() {return "blah";}'
        };
        assert.equal(new Rule(spec).matches(), 'blah');
      });
    });

    describe('.tags', () => {
      it('should be set', () => {
        const spec = {
          tags: ['foo', 'bar']
        };
        assert.deepEqual(new Rule(spec).tags, spec.tags);
      });

      it('should default to empty array', () => {
        const spec = {};
        assert.deepEqual(new Rule(spec).tags, []);
      });
    });

    describe('.actIds', () => {
      it('should be set', () => {
        const spec = {
          actIds: ['abc123', 'xyz789']
        };
        assert.deepEqual(new Rule(spec).actIds, spec.actIds);
      });

      it('should default to undefined', () => {
        const spec = {};
        assert.isUndefined(new Rule(spec).actIds);
      });
    });
  });

  describe('configure', () => {
    beforeEach(() => {
      Rule.prototype._get = function (attr) {
        return this[attr];
      };
    });
    afterEach(() => {
      delete Rule.prototype._get;
    });
    it('should be a function that takes one argument', () => {
      assert.isFunction(Rule.prototype.configure);
      assert.lengthOf(new Rule({}).configure, 1);
    });
    it('should NOT override the id', () => {
      const rule = new Rule({ id: 'foo' });

      assert.equal(rule._get('id'), 'foo');
      rule.configure({ id: 'fong' });
      assert.equal(rule._get('id'), 'foo');
    });
    it('should NOT override a random property', () => {
      const rule = new Rule({ id: 'foo' });

      rule.configure({ fong: 'fong' });
      assert.equal(rule._get('fong'), undefined);
    });
    it('should override the selector', () => {
      const rule = new Rule({ selector: 'foo' });

      assert.equal(rule._get('selector'), 'foo');
      rule.configure({ selector: 'fong' });
      assert.equal(rule._get('selector'), 'fong');
    });
    it('should override excludeHidden', () => {
      const rule = new Rule({ excludeHidden: false });

      assert.equal(rule._get('excludeHidden'), false);
      rule.configure({ excludeHidden: true });
      assert.equal(rule._get('excludeHidden'), true);
    });
    it('should override enabled', () => {
      const rule = new Rule({ enabled: false });

      assert.equal(rule._get('enabled'), false);
      rule.configure({ enabled: true });
      assert.equal(rule._get('enabled'), true);
    });
    it('should override pageLevel', () => {
      const rule = new Rule({ pageLevel: false });

      assert.equal(rule._get('pageLevel'), false);
      rule.configure({ pageLevel: true });
      assert.equal(rule._get('pageLevel'), true);
    });
    it('should override reviewOnFail', () => {
      const rule = new Rule({ reviewOnFail: false });

      assert.equal(rule._get('reviewOnFail'), false);
      rule.configure({ reviewOnFail: true });
      assert.equal(rule._get('reviewOnFail'), true);
    });
    it('should override any', () => {
      const rule = new Rule({ any: ['one', 'two'] });

      assert.deepEqual(rule._get('any'), ['one', 'two']);
      rule.configure({ any: [] });
      assert.deepEqual(rule._get('any'), []);
    });
    it('should override all', () => {
      const rule = new Rule({ all: ['one', 'two'] });

      assert.deepEqual(rule._get('all'), ['one', 'two']);
      rule.configure({ all: [] });
      assert.deepEqual(rule._get('all'), []);
    });
    it('should override none', () => {
      const rule = new Rule({ none: ['none', 'two'] });

      assert.deepEqual(rule._get('none'), ['none', 'two']);
      rule.configure({ none: [] });
      assert.deepEqual(rule._get('none'), []);
    });
    it('should override tags', () => {
      const rule = new Rule({ tags: ['tags', 'two'] });

      assert.deepEqual(rule._get('tags'), ['tags', 'two']);
      rule.configure({ tags: [] });
      assert.deepEqual(rule._get('tags'), []);
    });
    it('should override matches (doT.js function)', () => {
      const rule = new Rule({ matches: 'function () {return "matches";}' });

      assert.equal(rule._get('matches')(), 'matches');
      rule.configure({ matches: 'function () {return "does not match";}' });
      assert.equal(rule._get('matches')(), 'does not match');
    });
    it('should override matches (metadata function name)', () => {
      axe._load({});
      metadataFunctionMap['custom-matches'] = () => {
        return 'custom-matches';
      };
      metadataFunctionMap['other-matches'] = () => {
        return 'other-matches';
      };

      const rule = new Rule({ matches: 'custom-matches' });

      assert.equal(rule._get('matches')(), 'custom-matches');
      rule.configure({ matches: 'other-matches' });
      assert.equal(rule._get('matches')(), 'other-matches');

      delete metadataFunctionMap['custom-matches'];
      delete metadataFunctionMap['other-matches'];
    });
    it('should error if matches does not match an ID', () => {
      function fn() {
        const rule = new Rule({});
        rule.configure({ matches: 'does-not-exist' });
      }

      assert.throws(
        fn,
        'Function ID does not exist in the metadata-function-map: does-not-exist'
      );
    });
    it('should override impact', () => {
      const rule = new Rule({ impact: 'minor' });

      assert.equal(rule._get('impact'), 'minor');
      rule.configure({ impact: 'serious' });
      assert.equal(rule._get('impact'), 'serious');
    });
    it('should throw if impact impact', () => {
      const rule = new Rule({ impact: 'minor' });

      assert.throws(() => {
        rule.configure({ impact: 'hello' });
      });
    });
  });
});
