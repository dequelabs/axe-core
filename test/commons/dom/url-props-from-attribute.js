describe('dom.urlPropsFromAttribute', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns undefined when given node does not have specified attribute', function () {
    var vNode = queryFixture(
      '<button id="target" role="link">Schedule appointment</button>'
    );
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.isUndefined(actual);
  });

  it('returns undefined when `A` has no `HREF` attribute', function () {
    var vNode = queryFixture('<a id="target">Follow us on Instagram</a>');
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.isUndefined(actual);
  });

  it('returns URL properties when `A` with `HREF` (has port)', function () {
    var vNode = queryFixture(
      '<a id="target" href="http://localhost:9876/test/playground.html">Follow us on Instagram</a>'
    );
    var expected = {
      filename: 'playground.html',
      hash: '',
      hostname: 'localhost',
      pathname: '/test/',
      port: '9876',
      protocol: 'http:',
      search: {}
    };
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties when `A` with empty `HREF`', function () {
    var vNode = queryFixture('<a id="target" href="">See commons tests</a>');
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.equal(actual.protocol, location.protocol);
    assert.equal(actual.hostname, location.hostname);
    assert.equal(actual.port, location.port);
  });

  it('returns URL properties for `A` with `HREF` (having HTTPS protocol)', function () {
    var vNode = queryFixture(
      '<a id="target" href="https://facebook.com">follow us on Facebook</a>'
    );
    var expected = {
      filename: '',
      hash: '',
      hostname: 'facebook.com',
      pathname: '/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` (having FTP protocol)', function () {
    var vNode = queryFixture(
      '<a id="target" href="ftp://mywebsite.org">Navigate to My Website</a>'
    );
    var expected = {
      filename: '',
      hash: '',
      hostname: 'mywebsite.org',
      pathname: '/',
      port: '',
      protocol: 'ftp:',
      search: {}
    };
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has subdirectory and inline link', function () {
    var vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/#anchor">Go to Issues</a>'
    );
    var expected = {
      filename: '',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has subdirectory and hashbang', function () {
    var vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/#!foo">See our services</a>'
    );
    var expected = {
      filename: '',
      hash: '#!foo',
      hostname: 'mysite.com',
      pathname: '/directory/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has search query', function () {
    var vNode = queryFixture(
      '<a id="target" href="http://mysite.com/search/?q=foo#bar">Get list of foo bars</a>'
    );
    var expected = {
      filename: '',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/search/',
      port: '',
      protocol: 'http:',
      search: {
        q: 'foo'
      }
    };
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has multiple search query parameters', function () {
    var vNode = queryFixture(
      '<a id="target" href="http://mysite.com/search/?a=123&z=XYZ&name=Axe&branch=&version=1.2.3&values=[1,2,3]">Get list of foo bars</a>'
    );
    var expected = {
      filename: '',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/search/',
      port: '',
      protocol: 'http:',
      search: {
        a: '123',
        z: 'XYZ',
        name: 'Axe',
        branch: '',
        values: '[1,2,3]',
        version: '1.2.3'
      }
    };
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has filename', function () {
    var vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/widgets/calendar.html">Book tour</a>'
    );
    var expected = {
      filename: 'calendar.html',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/widgets/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has filename as `index` (ignores index.*)', function () {
    var vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/index.html">Book tour</a>'
    );
    var expected = {
      filename: '',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` that is contained in SVG document', function () {
    var vNode = queryFixture(
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
        '<a id="target" href="http://mysite.com/directory/widgets/calendar.html" aria-label="Book tour"><circle cx="50" cy="40" r="35" /></a>' +
        '</svg>'
    );
    var expected = {
      filename: 'calendar.html',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/widgets/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    var actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });
});
