describe('dom.isVisualContent', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var isVisualContent = axe.commons.dom.isVisualContent;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  describe('isVisualContent', function () {
    it('should return true for img', function () {
      var virtualNode = queryFixture('<img src="" id="target">');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for iframe', function () {
      var virtualNode = queryFixture('<iframe src="" id="target"></iframe>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for object', function () {
      var virtualNode = queryFixture('<object data="" id="target"></object>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for video', function () {
      var virtualNode = queryFixture('<video src="" id="target"></video>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for audio', function () {
      var virtualNode = queryFixture('<audio src="" id="target"></audio>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for canvas', function () {
      var virtualNode = queryFixture('<canvas id="target"></canvas>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for svg', function () {
      var virtualNode = queryFixture('<svg id="target"></svg>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for math', function () {
      var virtualNode = queryFixture('<math id="target"></math>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for button', function () {
      var virtualNode = queryFixture('<button id="target"></button>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for select', function () {
      var virtualNode = queryFixture('<select id="target"></select>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for textarea', function () {
      var virtualNode = queryFixture('<textarea id="target"></textarea>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for keygen', function () {
      var virtualNode = queryFixture('<keygen id="target"></keygen');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for progress', function () {
      var virtualNode = queryFixture('<progress id="target"></progress>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for meter', function () {
      var virtualNode = queryFixture('<meter id="target"></meter>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for non-hidden input', function () {
      var virtualNode = queryFixture('<input type="text" id="target">');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for elements with a visual aria role', function () {
      var virtualNode = queryFixture(
        '<div id="target">' +
          '<span role="img"></span>' +
          '<span role="checkbox"></span>' +
          '<span role="radio"></span>' +
          '<span role="meter"></span>' +
          '<span role="progressbar"></span>' +
          '<span role="scrollbar"></span>' +
          '<span role="slider"></span>' +
          '<span role="spinbutton"></span>' +
          '<span role="textbox"></span>' +
          '</div>'
      );

      for (var i = 0; i < virtualNode.children.length; i++) {
        assert.isTrue(
          isVisualContent(virtualNode.children[i]),
          'for role ' + virtualNode.children[i].attr('role')
        );
      }
    });

    it('should return false for hidden input', function () {
      var virtualNode = queryFixture('<input type="hidden" id="target">');
      assert.isFalse(isVisualContent(virtualNode));
    });

    it('should return false for p', function () {
      var virtualNode = queryFixture('<p id="target">Paragraph!</p>');
      assert.isFalse(isVisualContent(virtualNode));
    });
  });
});
