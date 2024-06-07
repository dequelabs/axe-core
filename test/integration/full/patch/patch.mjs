// Solves for situations where global code is mocked, like old Jest docs
// recommending to `null` out `window.CSS` for JSDOM's benefit
// https://github.com/thymikee/jest-preset-angular/commit/ac30648347ab41e0cbce741f66ae2a06b766fe13#diff-f2981abe444e6cc2b341b0d7cadb3932d2f1fbb6601aebeaf70f8bb387439d35

const originalWindowCSS = window.CSS;

function resetWindowCSSMock() {
  Object.defineProperty(window, 'CSS', { value: originalWindowCSS });
}

function mockWindowCSS() {
  Object.defineProperty(window, 'CSS', { value: null });
}

describe('patch', function () {
  'use strict';

  beforeEach(mockWindowCSS);
  afterEach(resetWindowCSSMock);

  it('can mock window.CSS to `null` on its own', function () {
    assert.isNull(window.CSS);
  });

  it('resets css window mock', function () {
    resetWindowCSSMock();
    assert.equal(window.CSS, originalWindowCSS);
  });

  it('imports axe.js and works while patched and mocked', async function () {
    assert.isNull(window.CSS);
    try {
      await import('/axe.js');
    } catch (error) {
      // Should not hit this assertion
      assert.notOk(error);
    }
  });

  it('imports axe.min.js and works while patched and mocked', async function () {
    assert.isNull(window.CSS);
    try {
      await import('/axe.min.js');
    } catch (error) {
      // Should not hit this assertion
      assert.notOk(error);
    }
  });
});
