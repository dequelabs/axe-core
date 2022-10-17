describe('bypass fail test', function () {
  'use strict';
  var results;
  before(function (done) {
    var mocha = document.getElementById('mocha'),
      html = mocha.innerHTML;
    mocha.innerHTML = '';
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        { runOnly: { type: 'rule', values: ['bypass'] } },
        function (err, r) {
          assert.isNull(err);

          results = r;
          mocha.innerHTML = html;
          done();
        }
      );
    });
  });

  describe('incomplete', function () {
    it('should find 1', function () {
      assert.lengthOf(results.incomplete, 1);
    });

    it('should find html', function () {
      assert.deepEqual(results.incomplete[0].nodes[0].target, ['html']);
    });
  });

  describe('passes', function () {
    it('should find none', function () {
      assert.lengthOf(results.passes, 0);
    });
  });
});
