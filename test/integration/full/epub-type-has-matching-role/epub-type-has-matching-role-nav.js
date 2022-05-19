describe('epub-type-has-matching-role-nav test pass', function() {
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
    it('should find 0', function() {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', function() {
    it('should find 1', function() {
      assert.lengthOf(results.passes, 1);
    });

    it('should find #id-toc', function() {
      assert.deepEqual(results.passes[0].nodes[0].target, ['#id-toc']);
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
