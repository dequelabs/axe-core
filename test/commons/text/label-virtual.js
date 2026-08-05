describe('text.labelVirtual', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('is called from text.label', () => {
    fixture.innerHTML = html`
      <div id="monkeys">monkeys</div>
      <div id="bananas">bananas</div>
      <input id="target" aria-labelledby="monkeys bananas" />
    `;

    axe.testUtils.flatTreeSetup(document.body);
    const target = fixture.querySelector('#target');
    assert.equal(axe.commons.text.label(target), 'monkeys bananas');
  });

  describe('aria-labelledby', () => {
    it('should join text with a single space', () => {
      fixture.innerHTML = html`
        <div id="monkeys">monkeys</div>
        <div id="bananas">bananas</div>
        <input id="target" aria-labelledby="monkeys bananas" />
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.equal(axe.commons.text.labelVirtual(target), 'monkeys bananas');
    });

    it('should filter invisible elements', () => {
      fixture.innerHTML = html`
        <div id="monkeys">monkeys</div>
        <div id="bananas" style="display: none">bananas</div>
        <input id="target" aria-labelledby="monkeys bananas" />
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.equal(axe.commons.text.labelVirtual(target), 'monkeys');
    });

    it('should take precedence over aria-label', () => {
      fixture.innerHTML = html`
        <div id="monkeys">monkeys</div>
        <div id="bananas">bananas</div>
        <input
          id="target"
          aria-labelledby="monkeys bananas"
          aria-label="nope"
        />
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.equal(axe.commons.text.labelVirtual(target), 'monkeys bananas');
    });

    it('should take precedence over explicit labels', () => {
      fixture.innerHTML = html`
        <div id="monkeys">monkeys</div>
        <div id="bananas">bananas</div>
        <label for="target">nope</label>
        <input id="target" aria-labelledby="monkeys bananas" />
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.equal(axe.commons.text.labelVirtual(target), 'monkeys bananas');
    });

    it('should take precedence over implicit labels', () => {
      fixture.innerHTML = html`
        <div id="monkeys">monkeys</div>
        <div id="bananas">bananas</div>
        <label
          >nope <input id="target" aria-labelledby="monkeys bananas"
        /></label>
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.equal(axe.commons.text.labelVirtual(target), 'monkeys bananas');
    });

    it('should ignore whitespace only labels', () => {
      fixture.innerHTML = html`
        <div id="monkeys"></div>
        <div id="bananas"></div>
        <input id="target" aria-labelledby="monkeys bananas" />
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.isNull(axe.commons.text.labelVirtual(target));
    });
  });

  describe('aria-label', () => {
    it('should detect it', () => {
      fixture.innerHTML = '<input id="target" aria-label="monkeys">';

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.equal(axe.commons.text.labelVirtual(target), 'monkeys');
    });

    it('should ignore whitespace only labels', () => {
      fixture.innerHTML = '<input id="target" aria-label="   \n	">';

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.isNull(axe.commons.text.labelVirtual(target));
    });

    it('should take precedence over explicit labels', () => {
      fixture.innerHTML = html`
        <label for="target">nope</label>
        <input id="target" aria-label="monkeys" />
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.equal(axe.commons.text.labelVirtual(target), 'monkeys');
    });

    it('should take precedence over implicit labels', () => {
      fixture.innerHTML = html`
        <label>nope <input id="target" aria-label="monkeys" /></label>
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.equal(axe.commons.text.labelVirtual(target), 'monkeys');
    });
  });

  describe('explicit label', () => {
    it('should detect it', () => {
      fixture.innerHTML = html`
        <label for="target">monkeys</label>
        <input id="target" />
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.equal(axe.commons.text.labelVirtual(target), 'monkeys');
    });

    it('should ignore whitespace only or empty labels', () => {
      fixture.innerHTML = html`
        <label for="target"> </label>
        <input id="target" />
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.isNull(axe.commons.text.labelVirtual(target));
    });

    it('should take precedence over implicit labels', () => {
      fixture.innerHTML = html`
        <label for="target">monkeys</label>
        <label>nope <input id="target" /></label>
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.equal(axe.commons.text.labelVirtual(target), 'monkeys');
    });
  });

  describe('implicit label', () => {
    it('should detect it', () => {
      fixture.innerHTML = html`
        <label>monkeys <input id="target" /><label> </label></label>
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.equal(axe.commons.text.labelVirtual(target), 'monkeys');
    });

    it('should ignore whitespace only or empty labels', () => {
      fixture.innerHTML = html`
        <label> <input id="target" /><label> </label></label>
      `;

      const tree = axe.testUtils.flatTreeSetup(document.body);
      const target = axe.utils.querySelectorAll(tree, '#target')[0];
      assert.isNull(axe.commons.text.labelVirtual(target));
    });
  });
});
