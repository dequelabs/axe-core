describe('target-offset tests', function() {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  var shadowSupport = axe.testUtils.shadowSupport;
  var check = checks['target-offset'];

  afterEach(function () {
    checkContext.reset();
  })

  it('returns false for targets smaller than minSpacing');


});