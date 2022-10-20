describe('matches.fromDefinition', function () {
  var fromDefinition = axe.commons.matches.fromDefinition;
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('applies a css selector when the matcher is a string', function () {
    var virtualNode = queryFixture('<div id="target">foo</div>');
    assert.isTrue(fromDefinition(virtualNode, '#fixture > div'));
    assert.isFalse(fromDefinition(virtualNode, '#fixture > span'));
  });

  it('matches a definition with a `nodeName` property', function () {
    var virtualNode = queryFixture('<div id="target">foo</div>');
    var matchers = [
      'div',
      ['div', 'span'],
      /div/,
      function (nodeName) {
        return nodeName === 'div';
      }
    ];
    matchers.forEach(function (matcher) {
      assert.isTrue(
        fromDefinition(virtualNode, {
          nodeName: matcher
        })
      );
    });
    assert.isFalse(
      fromDefinition(virtualNode, {
        nodeName: 'span'
      })
    );
  });

  it('matches a definition with an `attributes` property', function () {
    var virtualNode = queryFixture('<div id="target" foo="bar">foo</div>');
    var matchers = [
      'bar',
      ['bar', 'baz'],
      /bar/,
      function (attributeName) {
        return attributeName === 'bar';
      }
    ];
    matchers.forEach(function (matcher) {
      assert.isTrue(
        fromDefinition(virtualNode, {
          attributes: {
            foo: matcher
          }
        })
      );
    });
    assert.isFalse(
      fromDefinition(virtualNode, {
        attributes: {
          foo: 'baz'
        }
      })
    );
  });

  it('matches a definition with a `properties` property', function () {
    var virtualNode = queryFixture('<input id="target" />');
    var matchers = [
      'text',
      ['text', 'password'],
      /text/,
      function (type) {
        return type === 'text';
      }
    ];
    matchers.forEach(function (matcher) {
      assert.isTrue(
        fromDefinition(virtualNode, {
          properties: {
            type: matcher
          }
        })
      );
    });
    assert.isFalse(
      fromDefinition(virtualNode, {
        properties: {
          type: 'password'
        }
      })
    );
  });

  it('matches a definition with an `explicitRole` property', function () {
    var virtualNode = queryFixture('<span id="target" role="textbox"></span>');
    var matchers = [
      'textbox',
      ['textbox', 'combobox'],
      /textbox/,
      function (attributeName) {
        return attributeName === 'textbox';
      }
    ];
    matchers.forEach(function (matcher) {
      assert.isTrue(
        fromDefinition(virtualNode, {
          explicitRole: matcher
        })
      );
    });
    assert.isFalse(
      fromDefinition(virtualNode, {
        explicitRole: 'main'
      })
    );
  });

  it('matches a definition with an `implicitRole` property', function () {
    var virtualNode = queryFixture('<input id="target">');
    var matchers = [
      'textbox',
      ['textbox', 'combobox'],
      /textbox/,
      function (attributeName) {
        return attributeName === 'textbox';
      }
    ];
    matchers.forEach(function (matcher) {
      assert.isTrue(
        fromDefinition(virtualNode, {
          implicitRole: matcher
        })
      );
    });
    assert.isFalse(
      fromDefinition(virtualNode, {
        implicitRole: 'main'
      })
    );
  });

  it('matches a definition with an `semanticRole` property', function () {
    var virtualNode = queryFixture('<input id="target">');
    var matchers = [
      'textbox',
      ['textbox', 'combobox'],
      /textbox/,
      function (attributeName) {
        return attributeName === 'textbox';
      }
    ];
    matchers.forEach(function (matcher) {
      assert.isTrue(
        fromDefinition(virtualNode, {
          semanticRole: matcher
        })
      );
    });
    assert.isFalse(
      fromDefinition(virtualNode, {
        semanticRole: 'main'
      })
    );
  });

  it('matches a definition with an `accessibleName` property', function () {
    var virtualNode = queryFixture('<input id="target" aria-label="foo">');
    assert.isTrue(
      fromDefinition(virtualNode, {
        hasAccessibleName: true
      })
    );
    assert.isFalse(
      fromDefinition(virtualNode, {
        hasAccessibleName: false
      })
    );
  });

  it('returns true when all matching properties return true', function () {
    var virtualNode = queryFixture(
      '<input id="target" value="bar" aria-disabled="true" />'
    );
    assert.isTrue(
      fromDefinition(virtualNode, {
        nodeName: 'input',
        properties: {
          type: 'text',
          id: 'target'
        },
        attributes: {
          'aria-disabled': 'true'
        }
      })
    );
  });

  it('returns false when some matching properties return false', function () {
    var virtualNode = queryFixture(
      '<input id="target" value="bar" aria-disabled="true" />'
    );
    assert.isFalse(
      fromDefinition(virtualNode, {
        nodeName: 'input',
        attributes: {
          'aria-disabled': 'false'
        }
      })
    );
  });

  describe('with actual nodes', function () {
    it('matches using a string', function () {
      var virtualNode = queryFixture('<div id="target">foo</div>');
      assert.isTrue(fromDefinition(virtualNode.actualNode, 'div'));
      assert.isFalse(fromDefinition(virtualNode.actualNode, 'span'));
    });

    it('matches nodeName', function () {
      var virtualNode = queryFixture('<div id="target">foo</div>');
      assert.isTrue(
        fromDefinition(virtualNode.actualNode, {
          nodeName: 'div'
        })
      );
      assert.isFalse(
        fromDefinition(virtualNode.actualNode, {
          nodeName: 'span'
        })
      );
    });

    it('matches attributes', function () {
      var virtualNode = queryFixture('<div id="target" foo="bar">foo</div>');
      assert.isTrue(
        fromDefinition(virtualNode.actualNode, {
          attributes: {
            foo: 'bar'
          }
        })
      );
      assert.isFalse(
        fromDefinition(virtualNode.actualNode, {
          attributes: {
            foo: 'baz'
          }
        })
      );
    });

    it('matches properties', function () {
      var virtualNode = queryFixture('<input id="target" value="foo" />');
      assert.isTrue(
        fromDefinition(virtualNode.actualNode, {
          properties: {
            id: 'target'
          }
        })
      );
      assert.isFalse(
        fromDefinition(virtualNode.actualNode, {
          properties: {
            id: 'bar'
          }
        })
      );
    });
  });

  describe('with SerialVirtualNode', function () {
    it('matches using a string', function () {
      var serialNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          id: 'target'
        }
      });
      assert.isTrue(fromDefinition(serialNode, 'div'));
      assert.isFalse(fromDefinition(serialNode, 'span'));
    });

    it('matches nodeName', function () {
      var serialNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          id: 'target'
        }
      });
      assert.isTrue(
        fromDefinition(serialNode, {
          nodeName: 'div'
        })
      );
      assert.isFalse(
        fromDefinition(serialNode, {
          nodeName: 'span'
        })
      );
    });

    it('matches attributes', function () {
      var serialNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          id: 'target',
          foo: 'bar'
        }
      });
      assert.isTrue(
        fromDefinition(serialNode, {
          attributes: {
            foo: 'bar'
          }
        })
      );
      assert.isFalse(
        fromDefinition(serialNode, {
          attributes: {
            foo: 'baz'
          }
        })
      );
    });

    it('matches properties', function () {
      var serialNode = new axe.SerialVirtualNode({
        nodeName: 'input',
        id: 'target'
      });
      assert.isTrue(
        fromDefinition(serialNode, {
          properties: {
            id: 'target'
          }
        })
      );
      assert.isFalse(
        fromDefinition(serialNode, {
          properties: {
            id: 'bar'
          }
        })
      );
    });
  });

  describe('with a `condition` property', function () {
    it('calls condition and uses its return value as a matcher', function () {
      var virtualNode = queryFixture('<div id="target">foo</div>');
      var called = false;
      assert.isTrue(
        fromDefinition(virtualNode, {
          condition: function (node) {
            assert.deepEqual(node, virtualNode);
            called = true;
            return true;
          }
        })
      );
      assert.isFalse(
        fromDefinition(virtualNode, {
          condition: function () {
            return false;
          }
        })
      );
      assert.isTrue(called);
    });

    it('uses the return value as a matcher', function () {
      var returnVal = 'true';
      function condition() {
        return returnVal;
      }
      assert.isTrue(
        fromDefinition(fixture, {
          condition: condition // Truthy test
        })
      );

      returnVal = 0; // Falsey test
      assert.isFalse(
        fromDefinition(fixture, {
          condition: condition
        })
      );
    });
  });

  describe('with an `array` of definitions', function () {
    it('returns true if any definition in the array matches', function () {
      var virtualNode = queryFixture('<div id="target">foo</div>');
      assert.isTrue(
        fromDefinition(virtualNode, [
          { nodeName: 'span' },
          { nodeName: 'div' },
          { nodeName: 'h1' }
        ])
      );
    });

    it('returns false if none definition in the array matches', function () {
      var virtualNode = queryFixture('<input id="target" />');
      assert.isFalse(
        fromDefinition(virtualNode, [
          { nodeName: 'span' },
          { nodeName: 'div' },
          { nodeName: 'h1' }
        ])
      );
    });
  });
});
