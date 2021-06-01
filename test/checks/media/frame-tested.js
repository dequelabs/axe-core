describe('frame-tested', function() {
  'use strict';

  var checkEvaluate = axe.testUtils.getCheckEvaluate('frame-tested');
  var frameTestedAfter = checks['frame-tested'].after;

  describe('evaluate', function() {
    it('returns undefined', function() {
      assert.isUndefined(checkEvaluate());
    });

    it('returns false if passed isViolation:true', function() {
      assert.isFalse(checkEvaluate(null, { isViolation: true }));
    });
  });

  describe('after', function() {
    it('changes result to true if frame has been tested', function() {
      var results = [
        {
          result: undefined,
          node: {
            ancestry: ['html']
          }
        },
        {
          result: undefined,
          node: {
            ancestry: ['html > body > iframe#1']
          }
        },
        {
          result: undefined,
          node: {
            ancestry: ['html > body > iframe#2']
          }
        },
        {
          result: undefined,
          node: {
            ancestry: ['html > body > iframe#1', 'html']
          }
        },
        {
          result: undefined,
          node: {
            ancestry: ['html > body > iframe#2', 'html']
          }
        }
      ];

      var afterResults = frameTestedAfter(results);
      assert.lengthOf(afterResults, 2);
      assert.isTrue(afterResults[0].result);
      assert.isTrue(afterResults[1].result);
    });

    it('does not change result when iframe has not been tested', function() {
      var results = [
        {
          result: undefined,
          node: {
            ancestry: ['html']
          }
        },
        {
          result: undefined,
          node: {
            ancestry: ['html > body > iframe#1']
          }
        },
        {
          result: undefined,
          node: {
            ancestry: ['html > body > iframe#2']
          }
        },
        {
          result: undefined,
          node: {
            ancestry: ['html > body > iframe#1', 'html']
          }
        }
      ];

      var afterResults = frameTestedAfter(results);
      assert.lengthOf(afterResults, 2);
      assert.isTrue(afterResults[0].result);
      assert.isUndefined(afterResults[1].result);
    });
  });
});
