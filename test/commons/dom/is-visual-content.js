describe('dom.isVisualContent', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let isVisualContent = axe.commons.dom.isVisualContent;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  describe('isVisualContent', function () {
    it('should return true for img', function () {
      let virtualNode = queryFixture('<img src="" id="target">');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for iframe', function () {
      let virtualNode = queryFixture('<iframe src="" id="target"></iframe>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for object', function () {
      let virtualNode = queryFixture('<object data="" id="target"></object>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for video', function () {
      let virtualNode = queryFixture('<video src="" id="target"></video>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for audio', function () {
      let virtualNode = queryFixture('<audio src="" id="target"></audio>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for canvas', function () {
      let virtualNode = queryFixture('<canvas id="target"></canvas>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for svg', function () {
      let virtualNode = queryFixture('<svg id="target"></svg>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for math', function () {
      let virtualNode = queryFixture('<math id="target"></math>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for button', function () {
      let virtualNode = queryFixture('<button id="target"></button>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for select', function () {
      let virtualNode = queryFixture('<select id="target"></select>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for textarea', function () {
      let virtualNode = queryFixture('<textarea id="target"></textarea>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for keygen', function () {
      let virtualNode = queryFixture('<keygen id="target"></keygen');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for progress', function () {
      let virtualNode = queryFixture('<progress id="target"></progress>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for meter', function () {
      let virtualNode = queryFixture('<meter id="target"></meter>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for non-hidden input', function () {
      let virtualNode = queryFixture('<input type="text" id="target">');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for elements with a visual aria role', function () {
      let virtualNode = queryFixture(
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

      for (let i = 0; i < virtualNode.children.length; i++) {
        assert.isTrue(
          isVisualContent(virtualNode.children[i]),
          'for role ' + virtualNode.children[i].attr('role')
        );
      }
    });

    it('should return false for hidden input', function () {
      let virtualNode = queryFixture('<input type="hidden" id="target">');
      assert.isFalse(isVisualContent(virtualNode));
    });

    it('should return false for p', function () {
      let virtualNode = queryFixture('<p id="target">Paragraph!</p>');
      assert.isFalse(isVisualContent(virtualNode));
    });
  });
});
