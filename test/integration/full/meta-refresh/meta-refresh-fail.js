describe('meta-refresh fail', function () {
  'use strict';

  it('should be a violation', function (done) {
    axe.run({ runOnly: 'meta-refresh' }, function (err, results) {
      try {
        assert.isNull(err);
        assert.lengthOf(results.violations, 1, 'violations');
        assert.lengthOf(results.passes, 0, 'passes');
        assert.lengthOf(results.incomplete, 0, 'passes');
        assert.lengthOf(results.inapplicable, 0, 'inapplicable');
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
