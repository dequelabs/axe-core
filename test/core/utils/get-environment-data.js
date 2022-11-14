describe('utils.getEnvironmentData', function () {
  'use strict';
  var __audit;
  var getEnvironmentData = axe.utils.getEnvironmentData;
  before(function () {
    __audit = axe._audit;
    axe._audit = { brand: 'Deque' };
  });

  after(function () {
    axe._audit = __audit;
  });

  it('returns the first argument, if it is truthy', function () {
    var input = {
      testEngine: {
        name: 'axe-core',
        version: axe.version
      }
    };
    var output = getEnvironmentData(input);
    assert.equal(input, output);
  });

  it('should return a `testEngine` property', function () {
    var data = getEnvironmentData();
    assert.isObject(data.testEngine);
    assert.equal(data.testEngine.name, 'axe-core');
    assert.equal(data.testEngine.version, axe.version);
  });

  it('should return a `testRunner` property', function () {
    var data = getEnvironmentData();
    assert.isObject(data.testRunner);
    assert.equal(data.testRunner.name, axe._audit.brand);
  });

  it('should return a `testEnvironment` property', function () {
    var data = getEnvironmentData();
    assert.isObject(data.testEnvironment);
    assert.ok(data.testEnvironment.userAgent);
    assert.ok(data.testEnvironment.windowWidth);
    assert.ok(data.testEnvironment.windowHeight);
    assert.isNotNull(data.testEnvironment.orientationAngle);
    assert.isNotNull(data.testEnvironment.orientationType);
  });

  it('should return a `timestamp` property`', function () {
    var data = getEnvironmentData();
    assert.isDefined(data.timestamp);
  });

  it('should return a `url` property', function () {
    var data = getEnvironmentData();
    assert.isDefined(data.url);
  });

  // TODO: remove or update test once we are testing axe-core in jsdom and
  // other supported environments as what this is testing should be done in
  // those environment tests
  it('gets data from the `win` parameter when passed', function () {
    var data = getEnvironmentData(null, {
      screen: {
        orientation: {
          type: 'fictional',
          angle: 'slanted'
        }
      },
      navigator: {
        userAgent: 'foo'
      },
      location: {
        href: 'foo://'
      },
      innerWidth: 321,
      innerHeight: 123
    });

    delete data.timestamp;
    assert.deepEqual(data, {
      testEngine: {
        name: 'axe-core',
        version: axe.version
      },
      testRunner: {
        name: axe._audit.brand
      },
      testEnvironment: {
        userAgent: 'foo',
        windowWidth: 321,
        windowHeight: 123,
        orientationAngle: 'slanted',
        orientationType: 'fictional'
      },
      url: 'foo://'
    });
  });
});
