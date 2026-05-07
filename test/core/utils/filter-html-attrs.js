describe('axe.utils.filterHtmlAttrs', () => {
  const fixture = document.querySelector('#fixture');

  const filterHtmlAttrs = axe.utils.filterHtmlAttrs;
  let html, expected;

  beforeEach(() => {
    fixture.innerHTML =
      '<label> My Label <input type="text" value="my value" /></label>';
    html = fixture.firstChild;
    expected = '<label> My Label <input value="my value"></label>';
  });

  it('should return string if no attributes are passed', () => {
    assert.equal(filterHtmlAttrs(html), html);
  });

  it('should filter attribute if exists', () => {
    assert.equal(filterHtmlAttrs(html, { type: true }).outerHTML, expected);
  });

  it('should filter attribute if matches CSS selector', () => {
    assert.equal(filterHtmlAttrs(html, { type: 'input' }).outerHTML, expected);
  });

  it('should not filter attribute if does not match value', () => {
    assert.equal(
      filterHtmlAttrs(html, { type: 'div' }).outerHTML,
      html.outerHTML
    );
  });

  it('should not change the original element', () => {
    const outerHTML = html.outerHTML;
    assert.isTrue(filterHtmlAttrs(html, { type: true }) !== html);
    assert.equal(html.outerHTML, outerHTML);
  });

  it('should filter multiple attributes', () => {
    assert.equal(
      filterHtmlAttrs(html, {
        type: true,
        value: '[value="my value"]'
      }).outerHTML,
      '<label> My Label <input></label>'
    );
  });
});
