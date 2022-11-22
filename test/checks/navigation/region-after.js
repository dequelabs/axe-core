describe('region-after', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    checkContext.reset();
  });

  it('should always pass iframes', function () {
    var results = checks.region.after([
      {
        data: { isIframe: true },
        node: {
          ancestry: ['html > body > iframe']
        },
        result: false
      },
      {
        data: { isIframe: false },
        node: {
          ancestry: ['html > body > iframe', 'html > body > p']
        },
        result: false
      }
    ]);
    assert.equal(results[0].result, true);
    assert.equal(results[1].result, false);
  });

  it('should pass children of iframes if the iframe contained in it is in a region', function () {
    var results = checks.region.after([
      {
        data: { isIframe: true },
        node: {
          ancestry: ['html > body > iframe']
        },
        result: true
      },
      {
        data: { isIframe: false },
        node: {
          ancestry: ['html > body > iframe', 'html > body > p']
        },
        result: false
      }
    ]);

    assert.equal(results[0].result, true);
    assert.equal(results[1].result, true);
  });

  it('should pass nested iframes', function () {
    var results = checks.region.after([
      {
        data: { isIframe: true },
        node: {
          ancestry: ['html > body > iframe']
        },
        result: false
      },
      {
        data: { isIframe: true },
        node: {
          ancestry: ['html > body > iframe', 'html > body > iframe']
        },
        result: false
      },
      {
        data: { isIframe: false },
        node: {
          ancestry: [
            'html > body > iframe',
            'html > body > iframe',
            'html > body > p'
          ]
        },
        result: false
      }
    ]);

    assert.equal(results[0].result, true);
    assert.equal(results[1].result, true);
    assert.equal(results[2].result, false);
  });

  it('should pass children of nested iframes if the nested iframe is in a region', function () {
    var results = checks.region.after([
      {
        data: { isIframe: true },
        node: {
          ancestry: ['html > body > iframe']
        },
        result: false
      },
      {
        data: { isIframe: true },
        node: {
          ancestry: ['html > body > iframe', 'html > body > iframe']
        },
        result: true
      },
      {
        data: { isIframe: false },
        node: {
          ancestry: [
            'html > body > iframe',
            'html > body > iframe',
            'html > body > p'
          ]
        },
        result: false
      }
    ]);

    assert.equal(results[0].result, true);
    assert.equal(results[1].result, true);
    assert.equal(results[2].result, true);
  });

  it('should pass content if a grandparent frame passes', function () {
    var results = checks.region.after([
      {
        data: { isIframe: true },
        node: {
          ancestry: ['html > body > iframe']
        },
        result: true
      },
      {
        data: { isIframe: true },
        node: {
          ancestry: ['html > body > iframe', 'html > body > iframe']
        },
        result: false
      },
      {
        data: { isIframe: false },
        node: {
          ancestry: [
            'html > body > iframe',
            'html > body > iframe',
            'html > body > p'
          ]
        },
        result: false
      }
    ]);
    assert.equal(results[0].result, true);
    assert.equal(results[1].result, true);
    assert.equal(results[2].result, true);
  });
});
