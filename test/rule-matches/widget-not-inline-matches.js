describe('widget-not-inline-matches', function () {
  'use strict';
  var rule;
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    rule = axe.utils.getRule('target-size');
  });

  it('returns true for native widgets', function () {
    var vNode = queryFixture('<button id="target"></button>');
    var node = vNode.actualNode;
    assert.isTrue(rule.matches(node, vNode));
  });

  it('returns false for non-widget elements', function () {
    var vNode = queryFixture('<div role="banner" id="target"></div>');
    var node = vNode.actualNode;
    assert.isFalse(rule.matches(node, vNode));
  });

  it('returns false for non-focusable native widgets', function () {
    var vNode = queryFixture('<button disabled id="target"></button>');
    var node = vNode.actualNode;
    assert.isFalse(rule.matches(node, vNode));
  });

  it('returns false for non-focusable custom widgets', function () {
    var vNode = queryFixture('<div role="button" id="target"></div>');
    var node = vNode.actualNode;
    assert.isFalse(rule.matches(node, vNode));
  });

  describe('non-native components', function () {
    it('returns true for a tabbable button', function () {
      var vNode = queryFixture(
        '<div role="button" tabindex="0" id="target"></div>'
      );
      var node = vNode.actualNode;
      assert.isTrue(rule.matches(node, vNode));
    });

    it('returns false for button with tabindex="-1"', function () {
      var vNode = queryFixture(
        '<div role="button" tabindex="-1" id="target"></div>'
      );
      var node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });

    it('returns false for a non-tabbable button (widgets)', function () {
      var vNode = queryFixture('<div role="button" id="target"></div>');
      var node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });

    it('returns true for a listbox (component)', function () {
      var vNode = queryFixture(
        '<div role="listbox" tabindex="0" id="target"></div>'
      );
      var node = vNode.actualNode;
      assert.isTrue(rule.matches(node, vNode));
    });

    it('returns true for a combobox (component)', function () {
      var vNode = queryFixture(
        '<div role="combobox" tabindex="0" id="target"></div>'
      );
      var node = vNode.actualNode;
      assert.isTrue(rule.matches(node, vNode));
    });
  });

  describe('inline components', function () {
    it('returns false for elements inline with text', function () {
      var vNode = queryFixture(
        '<p>Some ' + ' <a href="#" id="target">link</a>' + '</p>'
      );
      var node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });

    it('returns false for multiple inline links', function () {
      var vNode = queryFixture(
        '<p>' +
          ' <a href="#" id="target">link 1</a>, ' +
          ' <a href="#">link 2</a>, ' +
          ' <a href="#">link 3</a>' +
          '</p>'
      );
      var node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });

    it('returns true if the widget is the only element in its block parent', function () {
      var vNode = queryFixture('<p><a href="#" id="target">link</a></p>');
      var node = vNode.actualNode;
      assert.isTrue(rule.matches(node, vNode));
    });
  });

  describe('graphics (for which size may be essential)', function () {
    it('returns false for area elements', function () {
      var vNode = queryFixture(
        '<img usemap="#imgmap" src="#" alt="img"/>' +
          '<map name="imgmap">' +
          '  <area id="target" shape="circle" coords="10,10,10" href="#" alt="map" />' +
          '</map>'
      );
      var node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });

    it('returns false SVG elements', function () {
      var vNode = queryFixture(
        '<svg role="button" tabindex="0" id="target"></svg>'
      );
      var node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });

    it('returns false descendants of SVG elements', function () {
      var vNode = queryFixture(
        '<svg><a href="#" id="target">' +
          '  <text y="15">link</text></a>' +
          '</svg>'
      );
      var node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });
  });
});
