describe('frame-tested', () => {
  const checkEvaluate = axe.testUtils.getCheckEvaluate('frame-tested');
  const frameTestedAfter = checks['frame-tested'].after;

  describe('evaluate', () => {
    it('returns undefined', () => {
      assert.isUndefined(checkEvaluate());
    });

    it('returns false if passed isViolation:true', () => {
      assert.isFalse(checkEvaluate(null, { isViolation: true }));
    });
  });

  describe('after', () => {
    it('changes result to true if frame has been tested', () => {
      const results = [
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

      const afterResults = frameTestedAfter(results);
      assert.lengthOf(afterResults, 2);

      assert.isTrue(afterResults[0].result);
      assert.deepEqual(afterResults[0].node.ancestry, [
        'html > body > iframe#1'
      ]);

      assert.isTrue(afterResults[1].result);
      assert.deepEqual(afterResults[1].node.ancestry, [
        'html > body > iframe#2'
      ]);
    });

    it('does not change result when iframe has not been tested', () => {
      const results = [
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
          result: false,
          node: {
            ancestry: ['html > body > iframe#3']
          }
        },
        {
          result: undefined,
          node: {
            ancestry: ['html > body > iframe#1', 'html']
          }
        }
      ];

      const afterResults = frameTestedAfter(results);
      assert.lengthOf(afterResults, 3);

      assert.isTrue(afterResults[0].result);
      assert.deepEqual(afterResults[0].node.ancestry, [
        'html > body > iframe#1'
      ]);

      assert.isUndefined(afterResults[1].result);
      assert.deepEqual(afterResults[1].node.ancestry, [
        'html > body > iframe#2'
      ]);

      assert.isFalse(afterResults[2].result);
      assert.deepEqual(afterResults[2].node.ancestry, [
        'html > body > iframe#3'
      ]);
    });

    it('works with shadow DOM', () => {
      const results = [
        {
          result: undefined,
          node: {
            ancestry: ['html']
          }
        },
        {
          result: undefined,
          node: {
            ancestry: [['html > body > custom-elm1', 'iframe#1']]
          }
        },
        {
          result: undefined,
          node: {
            ancestry: [['html > body > custom-elm1', 'iframe#2']]
          }
        },
        {
          result: undefined,
          node: {
            ancestry: [['html > body > custom-elm1', 'iframe#1'], 'html']
          }
        }
      ];

      const afterResults = frameTestedAfter(results);
      assert.lengthOf(afterResults, 2);

      assert.isTrue(afterResults[0].result);
      assert.deepEqual(afterResults[0].node.ancestry, [
        ['html > body > custom-elm1', 'iframe#1']
      ]);

      assert.isUndefined(afterResults[1].result);
      assert.deepEqual(afterResults[1].node.ancestry, [
        ['html > body > custom-elm1', 'iframe#2']
      ]);
    });

    it('works with nested shadow DOM and iframes', () => {
      const results = [
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
            ancestry: [['html > body > custom-elm1', 'iframe#2']]
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
            ancestry: [['html > body > custom-elm1', 'iframe#2'], 'html']
          }
        },
        {
          result: undefined,
          node: {
            ancestry: [
              ['html > body > custom-elm1', 'iframe#2'],
              ['html > body > other-element', 'iframe#3']
            ]
          }
        },
        {
          result: undefined,
          node: {
            ancestry: [
              ['html > body > custom-elm1', 'iframe#2'],
              ['html > body > other-element', 'iframe#4']
            ]
          }
        },
        {
          result: undefined,
          node: {
            ancestry: [
              ['html > body > custom-elm1', 'iframe#2'],
              ['html > body > other-element', 'iframe#3'],
              'html'
            ]
          }
        }
      ];

      const afterResults = frameTestedAfter(results);
      assert.lengthOf(afterResults, 4);

      assert.isTrue(afterResults[0].result);
      assert.deepEqual(afterResults[0].node.ancestry, [
        'html > body > iframe#1'
      ]);

      assert.isTrue(afterResults[1].result);
      assert.deepEqual(afterResults[1].node.ancestry, [
        ['html > body > custom-elm1', 'iframe#2']
      ]);

      assert.isTrue(afterResults[2].result);
      assert.deepEqual(afterResults[2].node.ancestry, [
        ['html > body > custom-elm1', 'iframe#2'],
        ['html > body > other-element', 'iframe#3']
      ]);

      assert.isUndefined(afterResults[3].result);
      assert.deepEqual(afterResults[3].node.ancestry, [
        ['html > body > custom-elm1', 'iframe#2'],
        ['html > body > other-element', 'iframe#4']
      ]);
    });
  });
});
