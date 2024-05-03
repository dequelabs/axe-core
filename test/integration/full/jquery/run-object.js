/*global $ */

describe('jQuery object as axe.run context', function () {
  'use strict';
  let config = { runOnly: { type: 'rule', values: ['aria-roles'] } };
  it('should find no violations', function (done) {
    let fixture = $('#fixture');
    axe.run(fixture, config, function (err, results) {
      assert.isNull(err);
      assert.lengthOf(results.violations, 0, 'violations');
      assert.lengthOf(results.passes, 1, 'passes');
      done();
    });
  });
});
