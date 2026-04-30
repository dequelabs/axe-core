describe('dom.isVisualContent', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const isVisualContent = axe.commons.dom.isVisualContent;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  describe('isVisualContent', () => {
    it('should return true for img', () => {
      const virtualNode = queryFixture('<img src="" id="target">');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for iframe', () => {
      const virtualNode = queryFixture('<iframe src="" id="target"></iframe>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for object', () => {
      const virtualNode = queryFixture('<object data="" id="target"></object>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for video', () => {
      const virtualNode = queryFixture('<video src="" id="target"></video>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for audio', () => {
      const virtualNode = queryFixture('<audio src="" id="target"></audio>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for canvas', () => {
      const virtualNode = queryFixture('<canvas id="target"></canvas>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for svg', () => {
      const virtualNode = queryFixture('<svg id="target"></svg>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for math', () => {
      const virtualNode = queryFixture('<math id="target"></math>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for button', () => {
      const virtualNode = queryFixture('<button id="target"></button>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for select', () => {
      const virtualNode = queryFixture('<select id="target"></select>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for textarea', () => {
      const virtualNode = queryFixture('<textarea id="target"></textarea>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for keygen', () => {
      const virtualNode = queryFixture('<keygen id="target"></keygen');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for progress', () => {
      const virtualNode = queryFixture('<progress id="target"></progress>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for meter', () => {
      const virtualNode = queryFixture('<meter id="target"></meter>');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for non-hidden input', () => {
      const virtualNode = queryFixture('<input type="text" id="target">');
      assert.isTrue(isVisualContent(virtualNode));
    });

    it('should return true for elements with a visual aria role', () => {
      const virtualNode = queryFixture(html`
        <div id="target">
          <span role="img"></span>
          <span role="checkbox"></span>
          <span role="radio"></span>
          <span role="meter"></span>
          <span role="progressbar"></span>
          <span role="scrollbar"></span>
          <span role="slider"></span>
          <span role="spinbutton"></span>
          <span role="textbox"></span>
        </div>
      `);

      for (var i = 0; i < virtualNode.children.length; i++) {
        assert.isTrue(
          isVisualContent(virtualNode.children[i]),
          `for role ${virtualNode.children[i].attr('role')}`
        );
      }
    });

    it('should return false for hidden input', () => {
      const virtualNode = queryFixture('<input type="hidden" id="target">');
      assert.isFalse(isVisualContent(virtualNode));
    });

    it('should return false for p', () => {
      const virtualNode = queryFixture('<p id="target">Paragraph!</p>');
      assert.isFalse(isVisualContent(virtualNode));
    });
  });
});
