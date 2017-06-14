describe('axe.utils.getFriendlyUriEnd', function () {
  'use strict';
  var getFriendlyUriEnd = axe.utils.getFriendlyUriEnd;

  it('returns a domain name', function () {
    assert.equal('deque.com', getFriendlyUriEnd('http://deque.com'));
    assert.equal('deque.com/', getFriendlyUriEnd('https://www.deque.com/'));
    assert.equal('docs.deque.com/', getFriendlyUriEnd('//docs.deque.com/'));
  });

  it('returns a filename', function () {
    assert.equal('contact/', getFriendlyUriEnd('../../contact/'));
    assert.equal('contact/', getFriendlyUriEnd('http://deque.com/contact/'));
    assert.equal('contact', getFriendlyUriEnd('/contact'));
    assert.equal('contact.html', getFriendlyUriEnd('/contact.html'));
  });

  it('returns a hash URI', function () {
    assert.equal('#footer', getFriendlyUriEnd('#footer'));
    assert.equal('contact.html#footer', getFriendlyUriEnd('/contact.html#footer'));
  });

  it('returns undef when there is a query', function () {
    assert.isUndefined(getFriendlyUriEnd('/contact?'));
    assert.isUndefined(getFriendlyUriEnd('/contact?foo=bar'));
  });

  it('returns undef for index files', function () {
    assert.isUndefined(getFriendlyUriEnd('/index.cfs'));
    assert.isUndefined(getFriendlyUriEnd('/index'));
  });

  it('returns undef when the result is too short', function () {
    assert.isUndefined(getFriendlyUriEnd('/i.html'));
    assert.isUndefined(getFriendlyUriEnd('/dq'));
  });

  it('returns undef when the result is too long', function () {
    assert.isDefined(getFriendlyUriEnd('/abcd.html', { maxLength: 50 }));
    assert.isDefined(getFriendlyUriEnd('#foo-bar-baz', { maxLength: 50 }));
    assert.isDefined(getFriendlyUriEnd('//deque.com', { maxLength: 50 }));

    assert.isUndefined(getFriendlyUriEnd('/abcd.html', { maxLength: 5 }));
    assert.isUndefined(getFriendlyUriEnd('#foo-bar-baz', { maxLength: 5 }));
    assert.isUndefined(getFriendlyUriEnd('//deque.com', { maxLength: 5 }));
  });

  it('returns undef when the result has too many numbers', function () {
    assert.isUndefined(getFriendlyUriEnd('123456.html'));
  });

});
