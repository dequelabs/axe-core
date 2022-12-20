describe('axe.utils.preload', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

  beforeEach(function () {
    axe.setup(fixture);
  });

  it('returns `undefined` when `preload` option is set to false.', function (done) {
    var options = {
      preload: false
    };
    var actual = axe.utils.preload(options);
    actual
      .then(function (results) {
        assert.isUndefined(results);
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });

  it('returns assets with `cssom`, verify result is same output from `preloadCssom` fn', function (done) {
    var options = {
      preload: {
        assets: ['cssom']
      }
    };
    var actual = axe.utils.preload(options);
    actual
      .then(function (results) {
        assert.isDefined(results);
        assert.property(results, 'cssom');

        axe.utils.preloadCssom(options).then(function (resultFromPreloadCssom) {
          assert.deepEqual(results.cssom, resultFromPreloadCssom);
          done();
        });
      })
      .catch(done);
  });

  describe('axe.utils.shouldPreload', function () {
    it('should return true if preload configuration is valid', function () {
      var actual = axe.utils.shouldPreload({
        preload: {
          assets: ['cssom']
        }
      });
      assert.isTrue(actual);
    });

    it('should return true if preload is undefined', function () {
      var actual = axe.utils.shouldPreload({
        preload: undefined
      });
      assert.isTrue(actual);
    });

    it('should return true if preload is null', function () {
      var actual = axe.utils.shouldPreload({
        preload: null
      });
      assert.isTrue(actual);
    });

    it('should return true if preload is not set', function () {
      var actual = axe.utils.shouldPreload({});
      assert.isTrue(actual);
    });

    it('should return false if preload configuration is invalid', function () {
      var options = {
        preload: {
          errorProperty: ['cssom']
        }
      };
      var actual = axe.utils.shouldPreload(options);
      assert.isFalse(actual);
    });
  });

  describe('axe.utils.getPreloadConfig', function () {
    it('should return default assets if preload configuration is not set', function () {
      var actual = axe.utils.getPreloadConfig({}).assets;
      var expected = ['cssom', 'media'];
      assert.deepEqual(actual, expected);
    });

    it('should return default assets if preload options is set to true', function () {
      var actual = axe.utils.getPreloadConfig({}).assets;
      var expected = ['cssom', 'media'];
      assert.deepEqual(actual, expected);
    });

    it('should return default timeout value if not configured', function () {
      var actual = axe.utils.getPreloadConfig({}).timeout;
      var expected = 10000;
      assert.equal(actual, expected);
    });

    it('should throw error if requested asset type is not supported', function () {
      var options = {
        preload: {
          assets: ['some-unsupported-asset']
        }
      };
      var actual = function () {
        axe.utils.getPreloadConfig(options);
      };
      var expected = Error;
      assert.throws(actual, expected);
    });

    it('should remove any duplicate assets passed via preload configuration', function () {
      var options = {
        preload: {
          assets: ['cssom', 'cssom']
        }
      };
      var actual = axe.utils.getPreloadConfig(options);
      assert.property(actual, 'assets');
      assert.containsAllKeys(actual, ['assets', 'timeout']);
      assert.lengthOf(actual.assets, 1);
    });
  });
});
