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
});
