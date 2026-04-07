describe('text.labelText', function () {
  var labelText = axe.commons.text.labelText;
  var queryFixture = axe.testUtils.queryFixture;

  it('returns the text of an implicit label', function () {
    var target = queryFixture(
      '<label>' + 'My implicit label<input id="target" />' + '</label>'
    );
    assert.equal(labelText(target), 'My implicit label');
  });

  it('returns the text of an explicit label', function () {
    var target = queryFixture(
      '<label for="target">My explicit label</label>' + '<input id="target" />'
    );
    assert.equal(labelText(target), 'My explicit label');
  });

  it('ignores the text of nested implicit labels', function () {
    var target = queryFixture(
      '<label>My outer label' +
        '<label>My inner label' +
        '<input id="target" />' +
        '</label>' +
        '</label>'
    );
    assert.equal(labelText(target), 'My inner label');
  });

  it('concatinates multiple explicit labels', function () {
    var target = queryFixture(
      '<label for="target">My label 1</label>' +
        '<label for="target">My label 2</label>' +
        '<input id="target" />'
    );
    assert.equal(labelText(target), 'My label 1 My label 2');
  });

  it('concatinates explicit and implicit labels', function () {
    var target = queryFixture(
      '<label for="target">My explicit label</label>' +
        '<label for="target">My implicit label' +
        '<input id="target" />' +
        '</label>'
    );
    assert.equal(labelText(target), 'My explicit label My implicit label');
  });

  it('returns label text in the DOM order', function () {
    var target = queryFixture(
      '<label for="target">Label 1</label>' +
        '<label for="target">My implicit ' +
        '<label for="target">Label 2</label>' +
        '<input id="target" />' +
        '</label>' +
        '<label for="target">Label 3</label>'
    );
    assert.equal(labelText(target), 'Label 1 My implicit Label 2 Label 3');
  });

  it('does not return the same label twice', function () {
    var target = queryFixture(
      '<label for="target">' +
        'My implicit and explicit label' +
        '<input id="target" />' +
        '</label>'
    );
    assert.equal(labelText(target), 'My implicit and explicit label');
  });

  it('ignores the value of a textbox', function () {
    var target = queryFixture(
      '<label>My label' +
        '<input value="without text" id="target" />' +
        '</label>'
    );
    assert.equal(labelText(target), 'My label');
  });

  it('ignores the content of a textarea', function () {
    var target = queryFixture(
      '<label>My label' +
        '<textarea id="target">Without text</textarea' +
        '</label>'
    );
    assert.equal(labelText(target), 'My label');
  });

  it('ignores the options of a select element', function () {
    var target = queryFixture(
      '<label>My label' +
        '<select id="target">' +
        '<option selected>Without</option>' +
        '<option>text</option>' +
        '</select>' +
        '</label>'
    );
    assert.equal(labelText(target), 'My label');
  });

  describe('with context = { inControlContext: true }', function () {
    it('returns `` ', function () {
      var target = queryFixture(
        '<label for="target">My explicit label</label>' +
          '<input id="target" />'
      );
      assert.equal(labelText(target, { inControlContext: true }), '');
    });
  });

  describe('with context = { inLabelledByContext: true }', function () {
    it('returns `` ', function () {
      var target = queryFixture(
        '<label for="target">My explicit label</label>' +
          '<input id="target" />'
      );
      assert.equal(labelText(target, { inLabelledByContext: true }), '');
    });
  });

  describe('form-associated custom elements', function () {
    var uniqueId = 0;

    function defineFormAssociatedElement() {
      var name = 'x-label-text-' + uniqueId++;
      if (!customElements.get(name)) {
        customElements.define(
          name,
          class extends HTMLElement {
            static formAssociated = true;
            constructor() {
              super();
              this.internals_ = this.attachInternals();
            }
          }
        );
      }
      return name;
    }

    it('returns label text from an explicit label via for attribute', function () {
      var tagName = defineFormAssociatedElement();
      var target = queryFixture(
        '<label for="target">Custom label</label>' +
          '<' +
          tagName +
          ' id="target"></' +
          tagName +
          '>'
      );
      assert.equal(labelText(target), 'Custom label');
    });

    it('returns label text from multiple explicit labels', function () {
      var tagName = defineFormAssociatedElement();
      var target = queryFixture(
        '<label for="target">Label 1</label>' +
          '<label for="target">Label 2</label>' +
          '<' +
          tagName +
          ' id="target"></' +
          tagName +
          '>'
      );
      assert.equal(labelText(target), 'Label 1 Label 2');
    });

    it('returns label text from an implicit label', function () {
      var tagName = defineFormAssociatedElement();
      var target = queryFixture(
        '<label>Implicit label' +
          '<' +
          tagName +
          ' id="target"></' +
          tagName +
          '>' +
          '</label>'
      );
      assert.equal(labelText(target), 'Implicit label');
    });

    it('does not duplicate the implicit label when it is also in actualNode.labels', function () {
      var tagName = defineFormAssociatedElement();
      var target = queryFixture(
        '<label for="target">Wrapping label' +
          '<' +
          tagName +
          ' id="target"></' +
          tagName +
          '>' +
          '</label>'
      );
      assert.equal(labelText(target), 'Wrapping label');
    });

    it('returns empty string when no labels are associated', function () {
      var tagName = defineFormAssociatedElement();
      var target = queryFixture(
        '<' + tagName + ' id="target"></' + tagName + '>'
      );
      assert.equal(labelText(target), '');
    });
  });
});
