describe('bypass iframe test fail', function () {
  'use strict';
  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      // Stop messing with my tests Mocha!
      var heading = document.querySelector('#mocha h1');
      if (heading) {
        heading.outerHTML = '<div><b>bypass iframe test fail</b></div>';
      }

      axe.run(
        { runOnly: { type: 'rule', values: ['bypass'] } },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('incomplete', function () {
    it('should find 1', function () {
      assert.lengthOf(results.incomplete[0].nodes, 1);
    });

    it('should find #frame1', function () {
      assert.deepEqual(results.incomplete[0].nodes[0].target, ['#fail1']);
    });
  });

  describe('passes', function () {
    it('should find none', function () {
      assert.lengthOf(results.passes, 0);
    });
  });
});
