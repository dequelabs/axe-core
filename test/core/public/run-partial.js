describe('axe.runPartial', () => {
  const html = axe.testUtils.html;
  const fixture = document.getElementById('fixture');
  const DqElement = axe.utils.DqElement;
  const dqElementKeys = Object.keys(new DqElement(null).toJSON());

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('Uses axe._tree if it already exists', done => {
    axe._tree = [axe.setup(fixture)];
    fixture.innerHTML = '<img>';
    axe
      .runPartial(document, { runOnly: 'image-alt' })
      .then(partialResult => {
        const result = partialResult.results[0];
        // 0, because <img> was added after the tree was constructed
        assert.lengthOf(result.nodes, 0);
        done();
      })
      .catch(done);
  });

  it('cleans up after resolving', done => {
    axe
      .runPartial(document, { runOnly: 'image-alt' })
      .then(() => {
        assert.isUndefined(axe._tree);
        assert.isUndefined(axe._selectorData);
        assert.isFalse(axe._running);
        done();
      })
      .catch(done);
  });

  it('normalizes the options argument', done => {
    axe
      .runPartial(/* no context */ { runOnly: 'image-alt' })
      .then(partialResult => {
        assert.lengthOf(partialResult.results, 1);
        assert.equal(partialResult.results[0].id, 'image-alt');
        done();
      })
      .catch(done);
  });

  it('does not mutate the options object', done => {
    const options = {};
    axe
      .runPartial(options)
      .then(() => {
        assert.deepEqual(options, {});
        done();
      })
      .catch(done);
  });

  it('ignores { elementRef: true } option', async () => {
    const options = { elementRef: true };
    const result = await axe.runPartial(options);
    for (const nodeResult of result.results[0].nodes) {
      assert.isUndefined(nodeResult.node.element);
    }
  });

  describe('result', () => {
    let partialResult;
    before(done => {
      fixture.innerHTML = '<img>';
      axe.runPartial(document, { runOnly: 'image-alt' }).then(out => {
        partialResult = out;
        done();
      });
    });

    it('returns a result with all the valid properties', () => {
      const result = partialResult.results[0];
      assert.lengthOf(partialResult.results, 1);
      assert.hasAllKeys(result, [
        'id',
        'result',
        'pageLevel',
        'impact',
        'nodes'
      ]);
      assert.equal(result.id, 'image-alt');

      const checkResult = result.nodes[0];
      assert.lengthOf(result.nodes, 1);
      assert.hasAllKeys(checkResult, ['any', 'all', 'none', 'node']);
      assert.deepEqual(checkResult.node.selector, ['img']);
    });

    it('returns check results with a serialized node', () => {
      const checkResult = partialResult.results[0].nodes[0];
      assert.lengthOf(partialResult.results[0].nodes, 1);
      assert.hasAllKeys(checkResult, ['any', 'all', 'none', 'node']);
      assert.notInstanceOf(checkResult.node, DqElement);
      assert.hasAllKeys(checkResult.node, dqElementKeys);
    });

    it('does not return DqElement objects', () => {
      for (const result of partialResult.results) {
        for (const nodeResult of result.nodes) {
          assert.notInstanceOf(nodeResult.node, DqElement);
          const checks = [
            ...nodeResult.any,
            ...nodeResult.all,
            ...nodeResult.none
          ];
          for (const check of checks) {
            for (const relatedNode of check.relatedNodes) {
              assert.notInstanceOf(relatedNode, DqElement);
            }
          }
        }
      }
    });

    it('can be serialized using JSON.stringify', () => {
      assert.doesNotThrow(() => {
        JSON.stringify(partialResult);
      });
    });
  });

  describe('frames', () => {
    let partialResult;
    before(done => {
      fixture.innerHTML = html`
        <main>
          <iframe id="foo"></iframe>
          <iframe id="bar"></iframe>
        </main>
        <iframe id="baz"></iframe>
      `;

      axe.runPartial('#fixture > main', { runOnly: 'image-alt' }).then(out => {
        partialResult = out;
        done();
      });
    });

    it('only has frames in context', () => {
      assert.lengthOf(partialResult.frames, 2);
      assert.deepEqual(partialResult.frames[0].selector, ['#foo']);
      assert.deepEqual(partialResult.frames[1].selector, ['#bar']);
    });

    it('provides serialized frame info', () => {
      partialResult.frames.forEach(frame => {
        assert.hasAllKeys(frame, dqElementKeys);
      });
    });
  });

  describe('environmentData', () => {
    it('includes environment data for the initiator', done => {
      const context = {
        include: [['#fixture']]
      };
      axe
        .runPartial(context, { runOnly: 'image-alt' })
        .then(out => {
          const keys = Object.keys(axe.utils.getEnvironmentData());
          assert.hasAllKeys(out.environmentData, keys);
          done();
        })
        .catch(done);
    });

    it('is undefined for frames', done => {
      const context = {
        include: [['#fixture']],
        initiator: false
      };
      axe
        .runPartial(context, { runOnly: 'image-alt' })
        .then(out => {
          assert.isUndefined(out.environmentData);
          done();
        })
        .catch(done);
    });
  });

  describe('guards', () => {
    const audit = axe._audit;
    afterEach(() => {
      axe._audit = audit;
      axe._running = false;
    });

    it('throws when axe._audit is undefined', () => {
      axe._audit = null;
      assert.throws(() => {
        axe.runPartial();
      });
    });

    it('throws if axe is already running', done => {
      axe.runPartial().then(() => {
        done();
      });
      assert.throws(() => {
        axe.runPartial();
      });
    });
  });
});
