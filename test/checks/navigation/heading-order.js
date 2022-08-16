describe('heading-order', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    checkContext.reset();
  });

  it('should store the heading order path and level for [role=heading] elements and return true', function () {
    var vNode = queryFixture(
      '<div role="heading" aria-level="1" id="target">One</div><div role="heading" aria-level="3">Three</div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('heading-order')
        .call(checkContext, null, {}, vNode, {})
    );
    assert.deepEqual(checkContext._data, {
      headingOrder: [
        {
          ancestry: ['html > body > div:nth-child(1) > div:nth-child(1)'],
          level: 1
        },
        {
          ancestry: ['html > body > div:nth-child(1) > div:nth-child(2)'],
          level: 3
        }
      ]
    });
  });

  it('should handle incorrect aria-level values', function () {
    var vNode = queryFixture(
      '<div role="heading" aria-level="-1" id="target">One</div><div role="heading">Two</div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('heading-order')
        .call(checkContext, null, {}, vNode, {})
    );
    assert.deepEqual(checkContext._data, {
      headingOrder: [
        {
          ancestry: ['html > body > div:nth-child(1) > div:nth-child(1)'],
          level: 2
        },
        {
          ancestry: ['html > body > div:nth-child(1) > div:nth-child(2)'],
          level: 2
        }
      ]
    });
  });

  it('should allow high aria-level values', function () {
    var vNode = queryFixture(
      '<div role="heading" aria-level="12" id="target">One</div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('heading-order')
        .call(checkContext, null, {}, vNode, {})
    );
    assert.deepEqual(checkContext._data, {
      headingOrder: [
        {
          ancestry: ['html > body > div:nth-child(1) > div'],
          level: 12
        }
      ]
    });
  });

  it('should store the correct header level for hn tags and return true', function () {
    var vNode = queryFixture('<h1 id="target">One</h1><h3>Three</h3>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('heading-order')
        .call(checkContext, null, {}, vNode, {})
    );
    assert.deepEqual(checkContext._data, {
      headingOrder: [
        {
          ancestry: ['html > body > div:nth-child(1) > h1:nth-child(1)'],
          level: 1
        },
        {
          ancestry: ['html > body > div:nth-child(1) > h3:nth-child(2)'],
          level: 3
        }
      ]
    });
  });

  it('should allow aria-level to override semantic level for hn tags and return true', function () {
    var vNode = queryFixture(
      '<h1 aria-level="2" id="target">Two</h1><h3 aria-level="4">Four</h3>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('heading-order')
        .call(checkContext, null, {}, vNode, {})
    );
    assert.deepEqual(checkContext._data, {
      headingOrder: [
        {
          ancestry: ['html > body > div:nth-child(1) > h1:nth-child(1)'],
          level: 2
        },
        {
          ancestry: ['html > body > div:nth-child(1) > h3:nth-child(2)'],
          level: 4
        }
      ]
    });
  });

  it('should ignore aria-level on iframe when not used with role=heading', function () {
    var vNode = queryFixture('<iframe aria-level="2" id="target"></iframe>');
    axe.testUtils
      .getCheckEvaluate('heading-order')
      .call(checkContext, null, {}, vNode, { initiator: true });
    assert.deepEqual(checkContext._data, {
      headingOrder: [
        {
          ancestry: ['html > body > div:nth-child(1) > iframe'],
          level: -1
        }
      ]
    });
  });

  it('should correctly give level on hn tag with role=heading', function () {
    var vNode = queryFixture(
      '<h1 role="heading" id="target">One</h1><h3 role="heading">Three</h3>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('heading-order')
        .call(checkContext, null, {}, vNode, {})
    );
    assert.deepEqual(checkContext._data, {
      headingOrder: [
        {
          ancestry: ['html > body > div:nth-child(1) > h1:nth-child(1)'],
          level: 1
        },
        {
          ancestry: ['html > body > div:nth-child(1) > h3:nth-child(2)'],
          level: 3
        }
      ]
    });
  });

  it('should return the heading level when an hn tag has an invalid aria-level', function () {
    var vNode = queryFixture('<h1 aria-level="-1" id="target">One</h1>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('heading-order')
        .call(checkContext, null, {}, vNode, {})
    );
    assert.deepEqual(checkContext._data, {
      headingOrder: [
        {
          ancestry: ['html > body > div:nth-child(1) > h1'],
          level: 1
        }
      ]
    });
  });

  it('should store the location of iframes', function () {
    var vNode = queryFixture(
      '<h1 id="target">One</h1><iframe></iframe><h3>Three</h3>'
    );
    axe.testUtils
      .getCheckEvaluate('heading-order')
      .call(checkContext, null, {}, vNode, { initiator: true });
    assert.deepEqual(checkContext._data, {
      headingOrder: [
        {
          ancestry: ['html > body > div:nth-child(1) > h1:nth-child(1)'],
          level: 1
        },
        {
          ancestry: ['html > body > div:nth-child(1) > iframe:nth-child(2)'],
          level: -1
        },
        {
          ancestry: ['html > body > div:nth-child(1) > h3:nth-child(3)'],
          level: 3
        }
      ]
    });
  });

  describe('after', function () {
    it('should return false when header level increases by 2', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              },
              {
                ancestry: ['path2'],
                level: 3
              }
            ]
          },
          node: { ancestry: ['path1'] },
          result: true
        },
        {
          node: { ancestry: ['path2'] },
          result: true
        }
      ];
      assert.isFalse(checks['heading-order'].after(results)[1].result);
    });

    it('should return true when header level decreases by 1', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 2
              },
              {
                ancestry: ['path2'],
                level: 1
              }
            ]
          },
          node: { ancestry: ['path1'] },
          result: true
        },
        {
          node: { ancestry: ['path2'] },
          result: true
        }
      ];
      assert.isTrue(checks['heading-order'].after(results)[1].result);
    });

    it('should return true when header level decreases by 2', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 3
              },
              {
                ancestry: ['path2'],
                level: 1
              }
            ]
          },
          node: { ancestry: ['path1'] },
          result: true
        },
        {
          node: { ancestry: ['path2'] },
          result: true
        }
      ];
      assert.isTrue(checks['heading-order'].after(results)[1].result);
    });

    it('should return true when there is only one header', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              }
            ]
          },
          node: { ancestry: ['path1'] },
          result: true
        }
      ];
      assert.isTrue(checks['heading-order'].after(results)[0].result);
    });

    it('should return true when header level increases by 1', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              },
              {
                ancestry: ['path2'],
                level: 2
              }
            ]
          },
          node: {
            ancestry: ['path1']
          },
          result: true
        },
        {
          node: {
            ancestry: ['path2']
          },
          result: true
        }
      ];
      assert.isTrue(checks['heading-order'].after(results)[1].result);
    });

    it('should return true if heading levels are correct across iframes', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              },
              {
                ancestry: ['iframe'],
                level: -1
              },
              {
                ancestry: ['path3'],
                level: 3
              }
            ]
          },
          node: {
            ancestry: ['path1']
          },
          result: true
        },
        {
          data: {
            headingOrder: [
              {
                ancestry: 'path2',
                level: 2
              }
            ]
          },
          node: {
            ancestry: ['iframe', 'path2']
          },
          result: true
        },
        {
          node: {
            ancestry: ['path3']
          },
          result: true
        }
      ];
      var afterResults = checks['heading-order'].after(results);
      assert.isTrue(afterResults[1].result);
      assert.isTrue(afterResults[2].result);
    });

    it('should return false if heading levels are incorrect across iframes', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              },
              {
                ancestry: ['iframe'],
                level: -1
              },
              {
                ancestry: ['path3'],
                level: 3
              }
            ]
          },
          node: {
            ancestry: ['path1']
          },
          result: true
        },
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path2'],
                level: 4
              }
            ]
          },
          node: {
            ancestry: ['iframe', 'path2']
          },
          result: true
        },
        {
          node: {
            ancestry: ['path3']
          },
          result: true
        }
      ];
      var afterResults = checks['heading-order'].after(results);
      assert.isFalse(afterResults[1].result);
      assert.isTrue(afterResults[2].result);
    });

    it('should handle nested iframes', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              },
              {
                ancestry: ['iframe'],
                level: -1
              },
              {
                ancestry: ['path4'],
                level: 3
              }
            ]
          },
          node: {
            ancestry: ['path1']
          },
          result: true
        },
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path2'],
                level: 2
              }
            ]
          },
          node: {
            ancestry: ['iframe', 'iframe2', 'path2']
          },
          result: true
        },
        {
          data: {
            headingOrder: [
              {
                ancestry: 'iframe2',
                level: -1
              },
              {
                ancestry: 'path3',
                level: 3
              }
            ]
          },
          node: {
            ancestry: ['iframe', 'path3']
          },
          result: true
        },
        {
          node: {
            ancestry: ['path4']
          },
          result: true
        }
      ];
      var afterResults = checks['heading-order'].after(results);
      assert.isTrue(afterResults[1].result);
      assert.isTrue(afterResults[2].result);
      assert.isTrue(afterResults[3].result);
    });

    it('sets the result to undefined when the heading is not in the map', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              }
            ]
          },
          node: {
            ancestry: ['path1']
          },
          result: true
        },
        {
          node: {
            ancestry: ['unknown']
          },
          result: true
        }
      ];

      var afterResults = checks['heading-order'].after(results);
      assert.isTrue(afterResults[0].result);
      assert.isUndefined(afterResults[1].result);
    });

    it('ignores frames for which there are no results', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              },
              {
                ancestry: ['iframe1'],
                level: -1
              },
              {
                ancestry: ['path2'],
                level: 2
              },
              {
                ancestry: ['iframe2'],
                level: -1
              },
              {
                ancestry: ['path3'],
                level: 4
              }
            ]
          },
          node: {
            ancestry: ['path1']
          },
          result: true
        },
        {
          node: {
            ancestry: ['path2']
          },
          result: true
        },
        {
          node: {
            ancestry: ['path3']
          },
          result: true
        }
      ];

      var afterResults = checks['heading-order'].after(results);
      assert.isTrue(afterResults[0].result);
      assert.isTrue(afterResults[1].result);
      assert.isFalse(afterResults[2].result);
    });

    it('should not error if iframe is first result', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path2'],
                level: 1
              }
            ]
          },
          node: {
            ancestry: ['iframe', 'path2']
          },
          result: true
        },
        {
          data: {
            headingOrder: [
              {
                ancestry: ['iframe'],
                level: -1
              },
              {
                ancestry: ['path1'],
                level: 2
              },
              {
                ancestry: ['path3'],
                level: 3
              }
            ]
          },
          node: {
            ancestry: ['path1']
          },
          result: true
        },
        {
          node: {
            ancestry: ['path3']
          },
          result: true
        }
      ];
      var afterResults = checks['heading-order'].after(results);
      assert.isTrue(afterResults[1].result);
      assert.isTrue(afterResults[2].result);
    });

    it('runs when the top frame has no heading', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              },
              {
                ancestry: ['path2'],
                level: 3
              }
            ]
          },
          node: {
            ancestry: ['iframe', 'path1']
          },
          result: true
        },
        {
          node: {
            ancestry: ['iframe', 'path2']
          },
          result: true
        }
      ];

      var afterResults = checks['heading-order'].after(results);
      assert.isTrue(afterResults[0].result);
      assert.isFalse(afterResults[1].result);
    });

    it('understand shadow DOM in ancestries', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              },
              {
                ancestry: [['custom-elm1', 'iframe1']],
                level: -1
              },
              {
                ancestry: [['custom-elm2', 'iframe2']],
                level: -1
              },
              {
                ancestry: [['custom-elm3', 'path4']],
                level: 4
              }
            ]
          },
          node: { ancestry: ['path1'] },
          result: true
        },
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path2'],
                level: 2
              }
            ]
          },
          node: { ancestry: [['custom-elm1', 'iframe1'], 'path2'] },
          result: true
        },
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path3'],
                level: 3
              }
            ]
          },
          node: { ancestry: [['custom-elm2', 'iframe2'], 'path3'] },
          result: true
        },
        {
          node: { ancestry: [['custom-elm3', 'path4']] },
          result: true
        }
      ];

      var afterResults = checks['heading-order'].after(results);
      assert.isTrue(afterResults[0].result);
      assert.isTrue(afterResults[1].result);
      assert.isTrue(afterResults[2].result);
      assert.isTrue(afterResults[3].result);
    });

    it('run when an in-between frame has no heading', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              },
              {
                ancestry: ['iframe1'],
                level: -1
              },
              {
                ancestry: ['path4'],
                level: 4
              }
            ]
          },
          node: { ancestry: ['path1'] },
          result: true
        },
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path2'],
                level: 2
              }
            ]
          },
          node: { ancestry: ['iframe1', 'iframe2', 'path2'] },
          result: true
        },
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path3'],
                level: 3
              }
            ]
          },
          node: { ancestry: ['iframe1', 'iframe3', 'path3'] },
          result: true
        },
        {
          node: { ancestry: ['path4'] },
          result: true
        }
      ];

      var afterResults = checks['heading-order'].after(results);
      assert.isTrue(afterResults[0].result);
      assert.isTrue(afterResults[1].result);
      assert.isTrue(afterResults[2].result);
      assert.isTrue(afterResults[3].result);
    });

    it('can fail the second heading, if the first is excluded', function () {
      var results = [
        {
          data: {
            headingOrder: [
              {
                ancestry: ['path1'],
                level: 1
              },
              {
                ancestry: ['path2'],
                level: 3
              }
            ]
          },
          node: {
            ancestry: ['path2']
          },
          result: true
        }
      ];
      var afterResults = checks['heading-order'].after(results);
      assert.isFalse(afterResults[0].result);
    });
  });
});
