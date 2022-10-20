describe('dom.isMultiline', function () {
  var isMultiline = axe.commons.dom.isMultiline;
  var fixture = document.querySelector('#fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns false if there is a single line', function () {
    fixture.innerHTML = '<p>hello</p>';
    assert.isFalse(isMultiline(fixture.firstChild));
  });

  it('returns true if there are two lines', function () {
    fixture.innerHTML = '<p>hello <br> world</p>';
    assert.isTrue(isMultiline(fixture.firstChild));
  });

  it('handles single-line texts with varying font-sizes', function () {
    fixture.innerHTML =
      '<p>' +
      '  <span style="font-size: 12px">small</span> ' +
      '  <span style="font-size: 20px">large</span>' +
      '  <span style="font-size: 16px">medium</span>' +
      '</p>';
    assert.isFalse(isMultiline(fixture.firstChild));
  });

  describe('with non-text elements', function () {
    it('is true when on a multiple lines', function () {
      fixture.innerHTML =
        '<p>' +
        '  <input /><br>' +
        '  <textarea rows="5"></textarea><br>' +
        '  <button style="font-size: 20px">I like big buttons</button>' +
        '</p>';
      assert.isTrue(isMultiline(fixture.firstChild));
    });

    it('is false when on a single line', function () {
      fixture.innerHTML =
        '<p>' +
        '  <span style="font-size: 12px">Hello</span> ' +
        '  <input />' +
        '  <textarea rows="5"></textarea>' +
        '  <button style="font-size: 20px">I like big buttons</button>' +
        '</p>';
      assert.isFalse(isMultiline(fixture.firstChild));
    });
  });
});
