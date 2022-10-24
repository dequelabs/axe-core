describe('meta-refresh-no-exceptions pass', function () {
  'use strict';

  it('should pass', function (done) {
    axe.run({ runOnly: 'meta-refresh-no-exceptions' }, function (err, results) {
      console.log(results);
      try {
        assert.isNull(err);
        assert.lengthOf(results.violations, 0, 'violations');
        assert.lengthOf(results.passes, 1, 'passes');
        assert.lengthOf(results.incomplete, 0, 'passes');
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
