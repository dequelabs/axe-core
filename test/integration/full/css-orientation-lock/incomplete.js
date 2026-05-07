describe('css-orientation-lock incomplete test', () => {
  it('returns INCOMPLETE if preload is set to FALSE', done => {
    axe.run(
      {
        runOnly: {
          type: 'rule',
          values: ['css-orientation-lock']
        },
        preload: false
      },
      (err, res) => {
        assert.isNull(err);
        assert.isDefined(res);

        assert.hasAnyKeys(res, ['incomplete', 'passes']);
        assert.lengthOf(res.incomplete, 1);
        done();
      }
    );
  });

  it('returns INCOMPLETE as page has no styles (not even mocha styles)', done => {
    axe.run(
      {
        runOnly: {
          type: 'rule',
          values: ['css-orientation-lock']
        }
      },
      (err, res) => {
        assert.isNull(err);
        assert.isDefined(res);

        assert.property(res, 'incomplete');
        assert.lengthOf(res.incomplete, 1);
        done();
      }
    );
  });
});
