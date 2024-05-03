describe('dom.urlPropsFromAttribute', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns undefined when given node does not have specified attribute', function () {
    let vNode = queryFixture(
      '<button id="target" role="link">Schedule appointment</button>'
    );
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.isUndefined(actual);
  });

  it('returns undefined when `A` has no `HREF` attribute', function () {
    let vNode = queryFixture('<a id="target">Follow us on Instagram</a>');
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.isUndefined(actual);
  });

  it('returns URL properties when `A` with `HREF` (has port)', function () {
    let vNode = queryFixture(
      '<a id="target" href="http://localhost:9876/test/playground.html">Follow us on Instagram</a>'
    );
    let expected = {
      filename: 'playground.html',
      hash: '',
      hostname: 'localhost',
      pathname: '/test/',
      port: '9876',
      protocol: 'http:',
      search: {}
    };
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties when `A` with empty `HREF`', function () {
    let vNode = queryFixture('<a id="target" href="">See commons tests</a>');
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.equal(actual.protocol, location.protocol);
    assert.equal(actual.hostname, location.hostname);
    assert.equal(actual.port, location.port);
  });

  it('returns URL properties for `A` with `HREF` (having HTTPS protocol)', function () {
    let vNode = queryFixture(
      '<a id="target" href="https://facebook.com">follow us on Facebook</a>'
    );
    let expected = {
      filename: '',
      hash: '',
      hostname: 'facebook.com',
      pathname: '/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` (having FTP protocol)', function () {
    let vNode = queryFixture(
      '<a id="target" href="ftp://mywebsite.org">Navigate to My Website</a>'
    );
    let expected = {
      filename: '',
      hash: '',
      hostname: 'mywebsite.org',
      pathname: '/',
      port: '',
      protocol: 'ftp:',
      search: {}
    };
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has subdirectory and inline link', function () {
    let vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/#anchor">Go to Issues</a>'
    );
    let expected = {
      filename: '',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has subdirectory and hashbang', function () {
    let vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/#!foo">See our services</a>'
    );
    let expected = {
      filename: '',
      hash: '#!foo',
      hostname: 'mysite.com',
      pathname: '/directory/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has search query', function () {
    let vNode = queryFixture(
      '<a id="target" href="http://mysite.com/search/?q=foo#bar">Get list of foo bars</a>'
    );
    let expected = {
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
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has multiple search query parameters', function () {
    let vNode = queryFixture(
      '<a id="target" href="http://mysite.com/search/?a=123&z=XYZ&name=Axe&branch=&version=1.2.3&values=[1,2,3]">Get list of foo bars</a>'
    );
    let expected = {
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
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has filename', function () {
    let vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/widgets/calendar.html">Book tour</a>'
    );
    let expected = {
      filename: 'calendar.html',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/widgets/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has filename as `index` (ignores index.*)', function () {
    let vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/index.html">Book tour</a>'
    );
    let expected = {
      filename: '',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` that is contained in SVG document', function () {
    let vNode = queryFixture(
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
        '<a id="target" href="http://mysite.com/directory/widgets/calendar.html" aria-label="Book tour"><circle cx="50" cy="40" r="35" /></a>' +
        '</svg>'
    );
    let expected = {
      filename: 'calendar.html',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/widgets/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    let actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });
});
