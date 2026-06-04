describe('axe.utils.preload', () => {
  const fixture = document.getElementById('fixture');

  beforeEach(() => {
    axe.setup(fixture);
  });

  it('returns `undefined` when `preload` option is set to false.', done => {
    const options = {
      preload: false
    };
    const actual = axe.utils.preload(options);
    actual
      .then(results => {
        assert.isUndefined(results);
        done();
      })
      .catch(error => {
        done(error);
      });
  });

  it('returns assets with `cssom`, verify result is same output from `preloadCssom` fn', done => {
    const options = {
      preload: {
        assets: ['cssom']
      }
    };
    const actual = axe.utils.preload(options);
    actual
      .then(results => {
        assert.isDefined(results);
        assert.property(results, 'cssom');

        axe.utils.preloadCssom(options).then(resultFromPreloadCssom => {
          assert.deepEqual(results.cssom, resultFromPreloadCssom);
          done();
        });
      })
      .catch(done);
  });

  describe('axe.utils.shouldPreload', () => {
    it('should return true if preload configuration is valid', () => {
      const actual = axe.utils.shouldPreload({
        preload: {
          assets: ['cssom']
        }
      });
      assert.isTrue(actual);
    });

    it('should return true if preload is undefined', () => {
      const actual = axe.utils.shouldPreload({
        preload: undefined
      });
      assert.isTrue(actual);
    });

    it('should return true if preload is null', () => {
      const actual = axe.utils.shouldPreload({
        preload: null
      });
      assert.isTrue(actual);
    });

    it('should return true if preload is not set', () => {
      const actual = axe.utils.shouldPreload({});
      assert.isTrue(actual);
    });

    it('should return false if preload configuration is invalid', () => {
      const options = {
        preload: {
          errorProperty: ['cssom']
        }
      };
      const actual = axe.utils.shouldPreload(options);
      assert.isFalse(actual);
    });
  });

  describe('axe.utils.getPreloadConfig', () => {
    it('should return default assets if preload configuration is not set', () => {
      const actual = axe.utils.getPreloadConfig({}).assets;
      const expected = ['cssom', 'media'];
      assert.deepEqual(actual, expected);
    });

    it('should return default assets if preload options is set to true', () => {
      const actual = axe.utils.getPreloadConfig({}).assets;
      const expected = ['cssom', 'media'];
      assert.deepEqual(actual, expected);
    });

    it('should return default timeout value if not configured', () => {
      const actual = axe.utils.getPreloadConfig({}).timeout;
      const expected = 10000;
      assert.equal(actual, expected);
    });

    it('should throw error if requested asset type is not supported', () => {
      const options = {
        preload: {
          assets: ['some-unsupported-asset']
        }
      };
      const actual = () => {
        axe.utils.getPreloadConfig(options);
      };
      const expected = Error;
      assert.throws(actual, expected);
    });

    it('should remove any duplicate assets passed via preload configuration', () => {
      const options = {
        preload: {
          assets: ['cssom', 'cssom']
        }
      };
      const actual = axe.utils.getPreloadConfig(options);
      assert.property(actual, 'assets');
      assert.containsAllKeys(actual, ['assets', 'timeout']);
      assert.lengthOf(actual.assets, 1);
    });
  });
});
