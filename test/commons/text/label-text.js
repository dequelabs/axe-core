describe('text.labelText', () => {
  const html = axe.testUtils.html;
  const labelText = axe.commons.text.labelText;
  const queryFixture = axe.testUtils.queryFixture;
  const queryShadowFixture = axe.testUtils.queryShadowFixture;

  it('returns the text of an implicit label', () => {
    const target = queryFixture(html`
      <label> My implicit label<input id="target" /> </label>
    `);
    assert.equal(labelText(target), ' My implicit label ');
  });

  it('returns the text of an explicit label', () => {
    const target = queryFixture(html`
      <label for="target">My explicit label</label><input id="target" />
    `);
    assert.equal(labelText(target), 'My explicit label');
  });

  it('ignores the text of nested implicit labels', () => {
    const target = queryFixture(
      html`<label
        >My outer label<label>My inner label<input id="target" /></label
      ></label>`
    );
    assert.equal(labelText(target), 'My inner label');
  });

  it('concatinates multiple explicit labels', () => {
    const target = queryFixture(
      html`<label for="target">My label 1</label
        ><label for="target">My label 2</label><input id="target" />`
    );
    assert.equal(labelText(target), 'My label 1 My label 2');
  });

  it('concatinates explicit and implicit labels', () => {
    const target = queryFixture(
      html`<label for="target">My explicit label</label
        ><label for="target">My implicit label<input id="target" /></label>`
    );
    assert.equal(labelText(target), 'My explicit label My implicit label');
  });

  it('returns label text in the DOM order', () => {
    const target = queryFixture(
      html`<label for="target">Label 1</label
        ><label for="target"
          >My implicit <label for="target">Label 2</label
          ><input id="target" /></label
        ><label for="target">Label 3</label>`
    );
    assert.equal(labelText(target), 'Label 1 My implicit Label 2 Label 3');
  });

  it('does not return the same label twice', () => {
    const target = queryFixture(
      html`<label for="target"
        >My implicit and explicit label<input id="target"
      /></label>`
    );
    assert.equal(labelText(target), 'My implicit and explicit label');
  });

  it('ignores the value of a textbox', () => {
    const target = queryFixture(
      html`<label>My label<input value="without text" id="target" /></label>`
    );
    assert.equal(labelText(target), 'My label');
  });

  it('ignores the content of a textarea', () => {
    const target = queryFixture(
      html`<label>My label<textarea id="target">Without text</textarea></label>`
    );
    assert.equal(labelText(target), 'My label');
  });

  it('ignores the options of a select element', () => {
    const target = queryFixture(
      html`<label
        >My label<select id="target">
          <option selected>Without</option>
          <option>text</option>
        </select></label
      >`
    );
    assert.equal(labelText(target), 'My label');
  });

  describe('with context = { inControlContext: true }', () => {
    it('returns `` ', () => {
      const target = queryFixture(
        html`<label for="target">My explicit label</label><input id="target" />`
      );
      assert.equal(labelText(target, { inControlContext: true }), '');
    });
  });

  describe('with context = { inLabelledByContext: true }', () => {
    it('returns `` ', () => {
      const target = queryFixture(
        html`<label for="target">My explicit label</label><input id="target" />`
      );
      assert.equal(labelText(target, { inLabelledByContext: true }), '');
    });
  });

  describe('form-associated custom elements', () => {
    it('returns the text of an explicit label from element internals', () => {
      const target = queryFixture(html`
        <label for="target">My explicit label</label>
        <testutils-form-element id="target"></testutils-form-element>
      `);
      assert.equal(labelText(target), 'My explicit label');
    });

    it('returns the text of an implicit label from element internals', () => {
      const target = queryFixture(
        html`<label
          >My implicit label<testutils-form-element
            id="target"
          ></testutils-form-element
        ></label>`
      );
      assert.equal(labelText(target), 'My implicit label');
    });

    it('concatenates multiple labels from element internals', () => {
      const target = queryFixture(html`
        <label for="target">My label 1</label>
        <label for="target">My label 2</label>
        <testutils-form-element id="target"></testutils-form-element>
      `);
      assert.equal(labelText(target), 'My label 1 My label 2');
    });

    it('does not return an implicit + explicit label twice', () => {
      const target = queryFixture(
        html`<label for="target"
          >My implicit and explicit label<testutils-form-element
            id="target"
          ></testutils-form-element
        ></label>`
      );
      assert.equal(labelText(target), 'My implicit and explicit label');
    });

    it('resolves labels when internals come from the global map', () => {
      const target = queryFixture(html`
        <label for="target">My explicit label</label>
        <testutils-form-element id="target"></testutils-form-element>
      `);
      const { actualNode } = target;
      const internals = actualNode._internals;
      // remove the property protocol so the global map is the only source.
      // elementInternals is read lazily, so the first read happens below
      delete actualNode._internals;
      globalThis._elementInternals = new WeakMap();
      globalThis._elementInternals.set(actualNode, internals);

      try {
        assert.equal(labelText(target), 'My explicit label');
      } finally {
        delete globalThis._elementInternals;
      }
    });

    it('falls back to DOM resolution for non-form-associated custom elements', () => {
      const target = queryFixture(html`
        <label for="target">My explicit label</label>
        <testutils-element id="target" no-role></testutils-element>
      `);
      // testutils-element is not form-associated, so reading internals.labels
      // throws and we fall through to resolving label[for] from the DOM
      assert.equal(labelText(target), 'My explicit label');
    });

    it('resolves labels inside a shadow tree', () => {
      const target = queryShadowFixture(
        '<div id="shadow"></div>',
        `<label for="target">My explicit label</label>
         <testutils-form-element id="target"></testutils-form-element>`
      );
      assert.equal(labelText(target), 'My explicit label');
    });
  });
});
