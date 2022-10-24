describe('axe.utils.filterHtmlAttrs', function () {
  'use strict';
  var fixture = document.querySelector('#fixture');

  var filterHtmlAttrs = axe.utils.filterHtmlAttrs;
  var html, expected;

  beforeEach(function () {
    fixture.innerHTML =
      '<label> My Label <input type="text" value="my value" /></label>';
    html = fixture.firstChild;
    expected = '<label> My Label <input value="my value"></label>';
  });

  it('should return string if no attributes are passed', function () {
    assert.equal(filterHtmlAttrs(html), html);
  });

  it('should filter attribute if exists', function () {
    assert.equal(filterHtmlAttrs(html, { type: true }).outerHTML, expected);
  });

  it('should filter attribute if matches CSS selector', function () {
    assert.equal(filterHtmlAttrs(html, { type: 'input' }).outerHTML, expected);
  });

  it('should not filter attribute if does not match value', function () {
    assert.equal(
      filterHtmlAttrs(html, { type: 'div' }).outerHTML,
      html.outerHTML
    );
  });

  it('should not change the original element', function () {
    var outerHTML = html.outerHTML;
    assert.isTrue(filterHtmlAttrs(html, { type: true }) !== html);
    assert.equal(html.outerHTML, outerHTML);
  });

  it('should filter multiple attributes', function () {
    assert.equal(
      filterHtmlAttrs(html, {
        type: true,
        value: '[value="my value"]'
      }).outerHTML,
      '<label> My Label <input></label>'
    );
  });
});
