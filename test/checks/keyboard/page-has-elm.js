describe('page-has-*', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkContext = new axe.testUtils.MockCheckContext();
  let checkSetup = axe.testUtils.checkSetup;
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let shadowCheckSetup = axe.testUtils.shadowCheckSetup;

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
    axe._tree = undefined;
  });

  describe('evaluate', function () {
    let evaluate = axe.testUtils.getCheckEvaluate('page-has-main');

    it('throws if there is no selector', function () {
      assert.throws(function () {
        let params = checkSetup('<div id="target">No role</div>', undefined);
        checks['page-has-main'].evaluate.apply(checkContext, params);
      });

      assert.throws(function () {
        let params = checkSetup('<div id="target">No role</div>', {});
        checks['page-has-main'].evaluate.apply(checkContext, params);
      });

      assert.throws(function () {
        let badOptions = { selector: [] };
        let params = checkSetup('<div id="target">No role</div>', badOptions);
        checks['page-has-main'].evaluate.apply(checkContext, params);
      });
    });

    it('returns true if there are any matching elements', function () {
      let options = { selector: 'b' };
      let params = checkSetup('<div id="target"><b>No role</b></div>', options);
      assert.isTrue(evaluate.apply(checkContext, params));
    });

    it('returns false if there are no matching elements', function () {
      let options = { selector: 'i' };
      let params = checkSetup('<div id="target"><b>No role</b></div>', options);
      assert.isFalse(evaluate.apply(checkContext, params));
    });

    it('does not find hidden elements', function () {
      let options = { selector: 'b' };
      let params = checkSetup(
        '<div id="target"><b style="display: none;">No role</b></div>',
        options
      );
      assert.isFalse(evaluate.apply(checkContext, params));
    });

    it('does find screen-reader only elements', function () {
      let options = { selector: 'b' };
      let params = checkSetup(
        '<style type="text/css">' +
          '.sr-only {' +
          'border: 0;' +
          'clip: rect(0 0 0 0);' +
          'clip-path: polygon(0px 0px, 0px 0px, 0px 0px);' +
          '-webkit-clip-path: polygon(0px 0px, 0px 0px, 0px 0px);' +
          'height: 1px;' +
          'margin: -1px;' +
          'overflow: hidden;' +
          'padding: 0;' +
          'position: absolute;' +
          'width: 1px;' +
          'white-space: nowrap;' +
          '}' +
          '</style>' +
          '<div id="target"><b class="sr-only">No role</b></div>',
        options
      );
      assert.isTrue(evaluate.apply(checkContext, params));
    });
  });

  describe('after', function () {
    let after = checks['page-has-main'].after;

    it('sets all results to true if any are true', function () {
      let results = [
        { result: true },
        { result: false },
        { result: undefined }
      ];
      assert.deepEqual(after(results), [
        { result: true },
        { result: true },
        { result: true }
      ]);
    });

    it('Leave the results as is if none of them were true', function () {
      let results = [
        { result: false },
        { result: false },
        { result: undefined }
      ];
      assert.equal(after(results), results);
    });
  });

  describe('page-has-main', function () {
    let check = checks['page-has-main'];

    it('should return false if no div has role property', function () {
      let params = checkSetup('<div id="target">No role</div>', check.options);
      let mainIsFound = check.evaluate.apply(checkContext, params);
      assert.isFalse(mainIsFound);
    });

    it('should return false if div has role not equal to main', function () {
      let params = checkSetup(
        '<div id="target" role="bananas">Wrong role</div>',
        check.options
      );
      let mainIsFound = check.evaluate.apply(checkContext, params);
      assert.isFalse(mainIsFound);
    });

    it('should return true if main landmark exists', function () {
      let params = checkSetup(
        '<main id="target">main landmark</main>',
        check.options
      );
      let mainIsFound = check.evaluate.apply(checkContext, params);
      assert.isTrue(mainIsFound);
    });

    it('should return true if one div has role equal to main', function () {
      let params = checkSetup(
        '<div id="target" role="main">Div with role main</div>',
        check.options
      );
      let mainIsFound = check.evaluate.apply(checkContext, params);
      assert.isTrue(mainIsFound);
    });

    (shadowSupported ? it : xit)(
      'should return true if main is inside of shadow dom',
      function () {
        let params = shadowCheckSetup(
          '<div id="target"></div>',
          '<main>main landmark</main>',
          check.options
        );
        let mainIsFound = check.evaluate.apply(checkContext, params);
        assert.isTrue(mainIsFound);
      }
    );
  });

  describe('page-has-heading-one', function () {
    let check = checks['page-has-heading-one'];

    it('should return false if div has role not equal to heading', function () {
      let params = checkSetup(
        '<div id="target" role="bananas">Wrong role</div>',
        check.options
      );
      let h1IsFound = check.evaluate.apply(checkContext, params);
      assert.isFalse(h1IsFound);
    });

    it('should return false if div has role heading but not aria-level=1', function () {
      let params = checkSetup(
        '<div id="target" role="heading" aria-level="one">Wrong role</div>',
        check.options
      );
      let h1IsFound = check.evaluate.apply(checkContext, params);
      assert.isFalse(h1IsFound);
    });

    it('should return true if h1 exists', function () {
      let params = checkSetup('<h1 id="target">My heading</h1>', check.options);
      let h1IsFound = check.evaluate.apply(checkContext, params);
      assert.isTrue(h1IsFound);
    });

    it('should return true if a div has role=heading and aria-level=1', function () {
      let params = checkSetup(
        '<div id="target" role="heading" aria-level="1">Diversity heading</div>',
        check.options
      );
      let h1IsFound = check.evaluate.apply(checkContext, params);
      assert.isTrue(h1IsFound);
    });

    (shadowSupported ? it : xit)(
      'should return true if h1 is inside of shadow dom',
      function () {
        let params = shadowCheckSetup(
          '<div id="target"></div>',
          '<h1>Shady Heading</h1>',
          check.options
        );
        let h1IsFound = check.evaluate.apply(checkContext, params);
        assert.isTrue(h1IsFound);
      }
    );
  });
});
