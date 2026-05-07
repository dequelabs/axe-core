describe('dom.urlPropsFromAttribute', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns undefined when given node does not have specified attribute', () => {
    const vNode = queryFixture(
      '<button id="target" role="link">Schedule appointment</button>'
    );
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.isUndefined(actual);
  });

  it('returns undefined when `A` has no `HREF` attribute', () => {
    const vNode = queryFixture('<a id="target">Follow us on Instagram</a>');
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.isUndefined(actual);
  });

  it('returns URL properties when `A` with `HREF` (has port)', () => {
    const vNode = queryFixture(
      '<a id="target" href="http://localhost:9876/test/playground.html">Follow us on Instagram</a>'
    );
    const expected = {
      filename: 'playground.html',
      hash: '',
      hostname: 'localhost',
      pathname: '/test/',
      port: '9876',
      protocol: 'http:',
      search: {}
    };
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties when `A` with empty `HREF`', () => {
    const vNode = queryFixture('<a id="target" href="">See commons tests</a>');
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.equal(actual.protocol, location.protocol);
    assert.equal(actual.hostname, location.hostname);
    assert.equal(actual.port, location.port);
  });

  it('returns URL properties for `A` with `HREF` (having HTTPS protocol)', () => {
    const vNode = queryFixture(
      '<a id="target" href="https://facebook.com">follow us on Facebook</a>'
    );
    const expected = {
      filename: '',
      hash: '',
      hostname: 'facebook.com',
      pathname: '/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` (having FTP protocol)', () => {
    const vNode = queryFixture(
      '<a id="target" href="ftp://mywebsite.org">Navigate to My Website</a>'
    );
    const expected = {
      filename: '',
      hash: '',
      hostname: 'mywebsite.org',
      pathname: '/',
      port: '',
      protocol: 'ftp:',
      search: {}
    };
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has subdirectory and inline link', () => {
    const vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/#anchor">Go to Issues</a>'
    );
    const expected = {
      filename: '',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has subdirectory and hashbang', () => {
    const vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/#!foo">See our services</a>'
    );
    const expected = {
      filename: '',
      hash: '#!foo',
      hostname: 'mysite.com',
      pathname: '/directory/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has search query', () => {
    const vNode = queryFixture(
      '<a id="target" href="http://mysite.com/search/?q=foo#bar">Get list of foo bars</a>'
    );
    const expected = {
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
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has multiple search query parameters', () => {
    const vNode = queryFixture(
      '<a id="target" href="http://mysite.com/search/?a=123&z=XYZ&name=Axe&branch=&version=1.2.3&values=[1,2,3]">Get list of foo bars</a>'
    );
    const expected = {
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
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has filename', () => {
    const vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/widgets/calendar.html">Book tour</a>'
    );
    const expected = {
      filename: 'calendar.html',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/widgets/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` which has filename as `index` (ignores index.*)', () => {
    const vNode = queryFixture(
      '<a id="target" href="http://mysite.com/directory/index.html">Book tour</a>'
    );
    const expected = {
      filename: '',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });

  it('returns URL properties for `A` with `HREF` that is contained in SVG document', () => {
    const vNode = queryFixture(html`
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <a
          id="target"
          href="http://mysite.com/directory/widgets/calendar.html"
          aria-label="Book tour"
        >
          <circle cx="50" cy="40" r="35" />
        </a>
      </svg>
    `);
    const expected = {
      filename: 'calendar.html',
      hash: '',
      hostname: 'mysite.com',
      pathname: '/directory/widgets/',
      port: '',
      protocol: 'http:',
      search: {}
    };
    const actual = axe.commons.dom.urlPropsFromAttribute(
      vNode.actualNode,
      'href'
    );
    assert.deepEqual(actual, expected);
  });
});
