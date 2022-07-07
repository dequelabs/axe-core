describe('epub-type-has-matching-role test fail', function() {
  // Checks that `epub:type` have matching ARIA roles
  // Ensure the element has an ARIA role matching its epub:type
  // ARIA role should be used in addition to epub:type

  'use strict';
  var results;
  before(function(done) {
    axe.testUtils.awaitNestedLoad(function() {
      // axe.configure({}); // DAISY ACE BREAKPOINT AXE CONFIGURE

      axe.run(
        { runOnly: { type: 'rule', values: ['epub-type-has-matching-role'] } },
        function(err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', function() {
    it('should find 1', function() {
      // console.log(JSON.stringify(results.violations, null, 4));
      assert.lengthOf(results.violations, 1);
    });

    it('should find #fail1 #fail2 #fail3', function() {
      assert.deepEqual(results.violations[0].nodes[0].target, ['#fail1']);
      assert.deepEqual(results.violations[0].nodes[1].target, ['#fail2']);
      assert.deepEqual(results.violations[0].nodes[2].target, ['#fail3']);
    });
  });

  describe('passes', function() {
    it('should find 1', function() {
      // console.log(JSON.stringify(results.passes, null, 4));
      assert.lengthOf(results.passes, 1);
    });

    it('should find section #pass1-6', function() {
      assert.deepEqual(results.passes[0].nodes[0].target, ['#sec']);
      assert.deepEqual(results.passes[0].nodes[1].target, ['#pass2']);
      assert.deepEqual(results.passes[0].nodes[2].target, ['#pass3']);
      assert.deepEqual(results.passes[0].nodes[3].target, ['#pass4']);
      assert.deepEqual(results.passes[0].nodes[4].target, ['#pass6']);
      assert.deepEqual(results.passes[0].nodes[5].target, ['#pass5']);
      assert.deepEqual(results.passes[0].nodes[6].target, ['#id-landmarks']);
      assert.deepEqual(results.passes[0].nodes[7].target, ['#pass0']);
      assert.deepEqual(results.passes[0].nodes[8].target, ['#ok1']);
      assert.deepEqual(results.passes[0].nodes[9].target, ['#deprecated1_']);
      assert.deepEqual(results.passes[0].nodes[10].target, ['#ok2']);
      assert.deepEqual(results.passes[0].nodes[11].target, ['#deprecated2_']);
      assert.deepEqual(results.passes[0].nodes[12].target, ['#ok3']);
      assert.deepEqual(results.passes[0].nodes[13].target, ['#deprecated3_']);
      assert.deepEqual(results.passes[0].nodes[14].target, ['#ok4']);
      assert.deepEqual(results.passes[0].nodes[15].target, ['#deprecated4_']);
    });
  });

  it('should find 0 inapplicable', function() {
    assert.lengthOf(results.inapplicable, 0);
    // assert.lengthOf(results.inapplicable[0].nodes, 0);
  });

  it('should find 0 incomplete', function() {
    assert.lengthOf(results.incomplete, 0);
  });
});
