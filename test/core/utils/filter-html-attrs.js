describe('axe.utils.filterHtmlAttrs', function() {
  'use strict';
  var filterHtmlAttrs = axe.utils.filterHtmlAttrs;
  var html = '<label> My Label <input type="text" value="my value" /></label>';
  var expected = '<label> My Label <input value="my value" /></label>';

  it('should return string if no attributes are passed', function() {
    assert.equal(filterHtmlAttrs(html), html);
  });

  it('should filter attribute if exists', function() {
    assert.equal(filterHtmlAttrs(html, { type: true }), expected);
  });

  it('should filter attribute if matches value', function() {
    assert.equal(filterHtmlAttrs(html, { type: 'text' }), expected);
  });

  it('should not filter attribute if does not match value', function() {
    assert.equal(filterHtmlAttrs(html, { type: 'submit' }), html);
  });

  it('should filter attribute if matches list of values', function() {
    assert.equal(filterHtmlAttrs(html, { type: ['submit', 'text'] }), expected);
  });

  it('should not filter attribute if does not match list of values', function() {
    assert.equal(filterHtmlAttrs(html, { type: ['submit', 'password'] }), html);
  });

  it('should filter attribute if node matches nodeName matcher', function() {
    assert.equal(
      filterHtmlAttrs(html, {
        type: {
          nodeName: 'input'
        }
      }),
      expected
    );
  });

  it('should filter attribute if node matches attributes matcher (boolean)', function() {
    assert.equal(
      filterHtmlAttrs(html, {
        type: {
          attributes: {
            value: true
          }
        }
      }),
      expected
    );
  });

  it('should filter attribute if node matches attributes matcher (string)', function() {
    assert.equal(
      filterHtmlAttrs(html, {
        type: {
          attributes: {
            value: 'my value'
          }
        }
      }),
      expected
    );
  });

  it('should filter attribute if node matches attributes matcher (array)', function() {
    assert.equal(
      filterHtmlAttrs(html, {
        type: {
          attributes: {
            value: ['foo', 'my value']
          }
        }
      }),
      expected
    );
  });

  it('should filter attribute if node matches all matcher', function() {
    assert.equal(
      filterHtmlAttrs(html, {
        type: {
          attributes: {
            nodeName: 'input',
            value: 'my value'
          }
        }
      }),
      expected
    );
  });

  it('should not filter attribute if node does not match nodeName  matcher', function() {
    assert.equal(
      filterHtmlAttrs(html, {
        type: {
          nodeName: 'div'
        }
      }),
      html
    );
  });

  it('should not filter attribute if node does not match attribute  matcher (string)', function() {
    assert.equal(
      filterHtmlAttrs(html, {
        type: {
          attributes: {
            value: 'div'
          }
        }
      }),
      html
    );
  });

  it('should not filter attribute if node does not match attribute  matcher (array)', function() {
    assert.equal(
      filterHtmlAttrs(html, {
        type: {
          attributes: {
            value: ['div', 'bar']
          }
        }
      }),
      html
    );
  });

  it('should filter multiple attributes', function() {
    assert.equal(
      filterHtmlAttrs(html, { type: true, value: 'my value' }),
      '<label> My Label <input  /></label>'
    );
  });

  describe('attributes', function() {
    it('should handle attribute with double quotes', function() {
      assert.equal(
        filterHtmlAttrs('<div class="hello">', { className: 'hello' }),
        '<div >'
      );
    });

    it('should handle attribute with single quotes', function() {
      assert.equal(
        filterHtmlAttrs("<div class='hello'>", { className: 'hello' }),
        '<div >'
      );
    });

    it('should handle attribute with mixed quotes', function() {
      assert.equal(
        filterHtmlAttrs('<div class="\'hello\'">', { className: "'hello'" }),
        '<div >'
      );
    });

    it('should handle attribute without quotes', function() {
      assert.equal(
        filterHtmlAttrs('<div class=hello>', { className: 'hello' }),
        '<div >'
      );
    });

    it('should handle attributes with no values', function() {
      assert.equal(
        filterHtmlAttrs('<div class>', { className: true }),
        '<div >'
      );
    });

    it('should handle whitespace in attribute', function() {
      assert.equal(
        filterHtmlAttrs('<div class="foo bar baz">', {
          className: 'foo bar baz'
        }),
        '<div >'
      );
    });

    it('should handle dash-separated attribute names', function() {
      assert.equal(
        filterHtmlAttrs('<div aria-label="foo">', { 'aria-label': 'foo' }),
        '<div >'
      );
    });

    it('should handle end of tag terminator after unquoted value', function() {
      assert.equal(
        filterHtmlAttrs('<div class=foo/>', { className: 'foo' }),
        '<div />'
      );
    });

    it('should handle end of tag terminator after quoted value', function() {
      assert.equal(
        filterHtmlAttrs('<div class="foo"/>', { className: 'foo' }),
        '<div />'
      );
    });

    it('should be case insensitive for attribute name', function() {
      assert.equal(
        filterHtmlAttrs('<div CLASS="foo"/>', { className: 'foo' }),
        '<div />'
      );
    });

    it('should be case sensitive for attribute value', function() {
      assert.equal(
        filterHtmlAttrs('<div class="foo"/>', { className: 'FOO' }),
        '<div class="foo"/>'
      );
    });
  });
});
