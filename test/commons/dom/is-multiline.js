describe('dom.isMultiline', () => {
  const html = axe.testUtils.html;
  const isMultiline = axe.commons.dom.isMultiline;
  const fixture = document.querySelector('#fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns false if there is a single line', () => {
    fixture.innerHTML = '<p>hello</p>';
    assert.isFalse(isMultiline(fixture.firstChild));
  });

  it('returns true if there are two lines', () => {
    fixture.innerHTML = '<p>hello <br> world</p>';
    assert.isTrue(isMultiline(fixture.firstChild));
  });

  it('handles single-line texts with varying font-sizes', () => {
    fixture.innerHTML = html`
      <p>
        <span style="font-size: 12px">small</span>
        <span style="font-size: 20px">large</span>
        <span style="font-size: 16px">medium</span>
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstChild));
  });

  describe('with non-text elements', () => {
    it('is true when on a multiple lines', () => {
      fixture.innerHTML = html`
        <p>
          <input /><br />
          <textarea rows="5"></textarea><br />
          <button style="font-size: 20px">I like big buttons</button>
        </p>
      `;
      assert.isTrue(isMultiline(fixture.firstChild));
    });

    it('is false when on a single line', () => {
      fixture.innerHTML = html`
        <p>
          <span style="font-size: 12px">Hello</span>
          <input />
          <textarea rows="5"></textarea>
          <button style="font-size: 20px">I like big buttons</button>
        </p>
      `;
      assert.isFalse(isMultiline(fixture.firstChild));
    });
  });
});
