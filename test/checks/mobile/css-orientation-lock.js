describe('css-orientation-lock tests', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var check = checks['css-orientation-lock'];
  var dynamicDoc = document.implementation.createHTMLDocument(
    'Dynamic document for CSS Orientation Lock tests'
  );

  afterEach(function () {
    checkContext.reset();
  });

  function getSheet(data) {
    var style = dynamicDoc.createElement('style');
    style.type = 'text/css';
    style.appendChild(dynamicDoc.createTextNode(data));
    dynamicDoc.head.appendChild(style);
    return style.sheet;
  }

  it('returns undefined when CSSOM is undefined', function () {
    var actual = check.evaluate.call(checkContext, document);
    assert.isUndefined(actual);
  });

  it('returns undefined when CSSOM is empty', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [] // pass context with cssom as empty
    });
    assert.isUndefined(actual);
  });

  it('returns true when CSSOM has no rules', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: 'a',
          sheet: {} // empty sheet, no css rules
        }
      ]
    });
    assert.isTrue(actual);
  });

  it('returns true when CSSOM has no CSS media features', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: 'a',
          sheet: getSheet('body { color: inherit; }')
        }
      ]
    });
    assert.isTrue(actual);
  });

  it('returns true when CSSOM has no CSS media features targeting orientation', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: undefined,
          sheet: getSheet('body { color: inherit; }')
        },
        {
          shadowId: 'a',
          sheet: getSheet(
            '@media (min-width: 400px) { background-color: red; }'
          )
        }
      ]
    });
    assert.isTrue(actual);
  });

  it('returns true when CSSOM has empty Orientation CSS media features', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: undefined,
          sheet: getSheet('body { color: inherit; }')
        },
        {
          shadowId: 'a',
          sheet: getSheet(
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) {  }'
          )
        }
      ]
    });
    assert.isTrue(actual);
  });

  it('returns true when CSSOM has Orientation CSS media features that does not target transform property', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: 'a',
          sheet: getSheet(
            '@media screen and (min-width: 1px) and (max-width: 2000px) and (orientation: portrait) { #mocha { color: red; } }'
          )
        }
      ]
    });
    assert.isTrue(actual);
  });

  it('returns true when CSSOM has Orientation CSS media features with transform property and transformation function of translateX, which does not affect rotation', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: undefined,
          sheet: getSheet(
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { #mocha { transform: translateX(10px); -webkit-transform: translateX(10px); } }'
          )
        }
      ]
    });
    assert.isTrue(actual);
  });

  it('returns true when CSSOM has Orientation CSS media features with transform property and tranformation function of rotate, which affects rotation but does not lock orientation (rotate(180deg))', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: 'a',
          root: document,
          sheet: getSheet(
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { body { transform: rotate(180deg); -webkit-transform: rotate(180deg); } }'
          )
        }
      ]
    });
    assert.isTrue(actual);
  });

  it('returns true when CSSOM has Orientation CSS media features with transform property and tranformation function of rotate, which affects rotation but does not lock orientation (rotate(-178deg))', function () {
    var actual = check.evaluate.call(
      checkContext,
      document,
      { degreeThreshold: 3 },
      undefined,
      {
        cssom: [
          {
            shadowId: 'a',
            root: document,
            sheet: getSheet(
              '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { body { transform: rotate(-178deg); -webkit-transform: rotate(-178deg); } }'
            )
          }
        ]
      }
    );
    assert.isTrue(actual);
  });

  it('returns true when CSSOM has Orientation CSS media features with transform property and tranformation function of rotateZ, which affects rotation but does not lock orientation (rotateZ(1turn))', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: 'a',
          root: document,
          sheet: getSheet(
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { body { transform: rotateZ(1turn); } }'
          )
        }
      ]
    });
    assert.isTrue(actual);
  });

  it('returns true when CSSOM has Orientation CSS media features with transform property and tranformation function of rotate3d, which affects rotation but does not lock orientation (rotate3d(0,0,0,400grad))', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: 'a',
          root: document,
          sheet: getSheet(
            // Note: values set on rotate3d cascasdes over rotate
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { body { transform: rotate(90deg) rotate3d(0,0,1, 400grad); } }'
          )
        }
      ]
    });
    assert.isTrue(actual);
  });

  it('returns true when CSSOM has Orientation CSS media features with transform property and tranformation function of matrix3d, which affects rotation but does not lock orientation (matrix3d(-1,0,0.00,0,0.00,-1,0.00,0,0,0,1,0,0,0,0,1))', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: 'a',
          root: document,
          sheet: getSheet(
            // Here the target is rotated by 180deg
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { body { transform: matrix3d(-1,0,0.00,0,0.00,-1,0.00,0,0,0,1,0,0,0,0,1);  } }'
          )
        }
      ]
    });
    assert.isTrue(actual);
  });

  it('returns false when CSSOM has Orientation CSS media features with transform property and transformation function of rotate, which affects rotation and locks orientation (rotate(270deg))', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: undefined,
          root: document,
          sheet: getSheet(
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { #mocha { transform: rotate(270deg); -webkit-transform: rotate(270deg); } }'
          )
        }
      ]
    });
    assert.isFalse(actual);
  });

  it('returns false when CSSOM has Orientation CSS media features with transform property and transformation function of rotate3d, which affects rotation and locks orientation (rotate3d(0,0,1,90deg))', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: undefined,
          root: document,
          sheet: getSheet(
            // apply 0 on the z-axis (3rd parameter) does not apply given rotation on z-axis
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { #mocha { transform: rotate3d(0,0,1,90deg); -webkit-transform: rotate3d(0,0,1,90deg) } }'
          )
        }
      ]
    });
    assert.isFalse(actual);
  });

  it('returns false when CSSOM has Orientation CSS media features with transform property and transformation function of rotate3d, which affects rotation and locks orientation (rotate3d(0,0,1,93deg))', function () {
    var actual = check.evaluate.call(
      checkContext,
      document,
      { degreeThreshold: 3 },
      undefined,
      {
        cssom: [
          {
            shadowId: undefined,
            root: document,
            sheet: getSheet(
              // apply 0 on the z-axis (3rd parameter) does not apply given rotation on z-axis
              '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { #mocha { transform: rotate3d(0,0,1,93deg); -webkit-transform: rotate3d(0,0,1,93deg) } }'
            )
          }
        ]
      }
    );
    assert.isFalse(actual);
  });

  it('returns false when CSSOM has Orientation CSS media features with transform property and transformation function of rotate3d, which affects rotation and locks orientation (rotate3d(0,0,1,1.5708rad))', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: undefined,
          root: document,
          sheet: getSheet(
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { #mocha { transform: rotate3d(0,0,1,1.5708rad); -webkit-transform: rotate3d(0,0,1,1.5708rad) } }'
          )
        }
      ]
    });
    assert.isFalse(actual);
  });

  it('returns false when CSSOM has Orientation CSS media features with transform property and transformation function of matrix, which affects rotation and locks orientation (matrix(0.00,1.00,-1.00,0.00,0,0))', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: undefined,
          root: document,
          sheet: getSheet(
            // this rotates by 90deg
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { #mocha { transform:matrix(0.00,1.00,-1.00,0.00,0,0); -webkit-transform:matrix(0.00,1.00,-1.00,0.00,0,0); } }'
          )
        }
      ]
    });
    assert.isFalse(actual);
  });

  it('returns false when CSSOM has Orientation CSS media features with transform property and transformation function of matrix3d, which affects rotation and locks orientation (matrix3d(0,-1,0.00,0,1.00,0,0.00,0,0,0,1,0,0,0,0,1);)', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: undefined,
          root: document,
          sheet: getSheet(
            // this rotates by 90deg
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { #mocha { transform: matrix3d(0,-1,0.00,0,1.00,0,0.00,0,0,0,1,0,0,0,0,1); -webkit-transform: matrix3d(0,-1,0.00,0,1.00,0,0.00,0,0,0,1,0,0,0,0,1); } }'
          )
        }
      ]
    });
    assert.isFalse(actual);
  });

  it('returns false when CSSOM has Orientation CSS media features with rotate property', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: 'a',
          root: document,
          sheet: getSheet(
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { body { rotate: 90deg; } }'
          )
        }
      ]
    });
    assert.isFalse(actual);
  });

  it('returns false when CSSOM has Orientation CSS media features with rotate property matrix', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: 'a',
          root: document,
          sheet: getSheet(
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { body { rotate: 0 0 1 1.5708rad; } }'
          )
        }
      ]
    });
    assert.isFalse(actual);
  });

  it('returns false when CSSOM has Orientation CSS media features with transform: rotate and rotate property', function () {
    var actual = check.evaluate.call(checkContext, document, {}, undefined, {
      cssom: [
        {
          shadowId: 'a',
          root: document,
          sheet: getSheet(
            '@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { body { rotate: 45deg; transform: rotate(45deg); -webkit-transform: rotate(45deg); } }'
          )
        }
      ]
    });
    assert.isFalse(actual);
  });

  // Note:
  // external stylesheets is tested in integration tests
  // shadow DOM is tested in integration tests
});
