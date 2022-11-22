describe('css-orientation-lock incomplete test', function () {
  'use strict';

  it('returns INCOMPLETE if preload is set to FALSE', function (done) {
    axe.run(
      {
        runOnly: {
          type: 'rule',
          values: ['css-orientation-lock']
        },
        preload: false
      },
      function (err, res) {
        assert.isNull(err);
        assert.isDefined(res);

        assert.hasAnyKeys(res, ['incomplete', 'passes']);
        assert.lengthOf(res.incomplete, 1);
        done();
      }
    );
  });

  it('returns INCOMPLETE as page has no styles (not even mocha styles)', function (done) {
    axe.run(
      {
        runOnly: {
          type: 'rule',
          values: ['css-orientation-lock']
        }
      },
      function (err, res) {
        assert.isNull(err);
        assert.isDefined(res);

        assert.property(res, 'incomplete');
        assert.lengthOf(res.incomplete, 1);
        done();
      }
    );
  });
});
