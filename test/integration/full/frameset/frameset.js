describe('frameset test', () => {
  function run(context, rules, done) {
    axe.run(context, { runOnly: { type: 'rule', values: rules } }, done);
  }

  function getTargets(results, type, ruleId) {
    const rule = results[type].find(result => result.id === ruleId);
    return rule ? rule.nodes.map(node => node.target) : [];
  }

  // testutils.js (and awaitNestedLoad) needs a body, which a frameset document
  // doesn't have. The load event of the frameset also waits for its frames.
  before(done => {
    if (document.readyState === 'complete') {
      done();
    } else {
      window.addEventListener('load', () => done());
    }
  });

  describe('the whole page', () => {
    let results;
    before(done => {
      run(document, ['frame-tested', 'frame-title', 'image-alt'], (err, r) => {
        assert.isNull(err);
        results = r;
        done();
      });
    });

    it('tests every frame, including nested ones', () => {
      assert.sameDeepMembers(getTargets(results, 'passes', 'frame-tested'), [
        ['#frame1'],
        ['#frame1', '#nested'],
        ['#frame2']
      ]);
      assert.lengthOf(getTargets(results, 'incomplete', 'frame-tested'), 0);
    });

    it('checks the title of frame elements', () => {
      assert.sameDeepMembers(getTargets(results, 'passes', 'frame-title'), [
        ['#frame1'],
        ['#frame1', '#nested']
      ]);
      assert.sameDeepMembers(getTargets(results, 'violations', 'frame-title'), [
        ['#frame2']
      ]);
    });

    it('reports the content of frames', () => {
      assert.sameDeepMembers(getTargets(results, 'passes', 'image-alt'), [
        ['#frame1', '#nested', '#pass2'],
        ['#frame2', '#pass1']
      ]);
      assert.sameDeepMembers(getTargets(results, 'violations', 'image-alt'), [
        ['#frame1', '#nested', '#fail2'],
        ['#frame2', '#fail1']
      ]);
    });
  });

  describe('a context that selects inside a nested frame', () => {
    let results;
    before(done => {
      run(
        { include: [['#frame1', '#nested', '#fail2']] },
        ['image-alt'],
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });

    it('only tests the selected element', () => {
      assert.lengthOf(getTargets(results, 'passes', 'image-alt'), 0);
      assert.sameDeepMembers(getTargets(results, 'violations', 'image-alt'), [
        ['#frame1', '#nested', '#fail2']
      ]);
    });
  });

  describe('a context that excludes a frame', () => {
    let results;
    before(done => {
      run({ exclude: [['#frame1']] }, ['image-alt'], (err, r) => {
        assert.isNull(err);
        results = r;
        done();
      });
    });

    it('does not test the excluded frame', () => {
      assert.sameDeepMembers(getTargets(results, 'passes', 'image-alt'), [
        ['#frame2', '#pass1']
      ]);
      assert.sameDeepMembers(getTargets(results, 'violations', 'image-alt'), [
        ['#frame2', '#fail1']
      ]);
    });
  });
});
