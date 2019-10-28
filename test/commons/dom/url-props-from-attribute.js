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
		var actual = axe.commons.dom.urlPropsFromAttribute(vNode.actualNode, 'href');
		assert.isUndefined(actual);
	});

	it('returns undefined when `A` has no `HREF` attribute', function () {
		var vNode = queryFixture('<a id="target">Follow us on Instagram</a>');
		var actual = axe.commons.dom.urlPropsFromAttribute(vNode.actualNode, 'href');
		assert.isUndefined(actual);
	});

	it('returns parsed resource when `A` has empty `HREF`', function () {
		var vNode = queryFixture(
			'<a id="target" href="">Follow us on Instagram</a>'
		);
		var expected = {
			filename: undefined,
			hash: undefined,
			hostname: "localhost",
			pathname: "/test/commons",
			port: "9876",
			protocol: "http:",
			search: {}
		}
		var actual = axe.commons.dom.urlPropsFromAttribute(vNode.actualNode, 'href');
		assert.deepEqual(actual, expected)
	});

	it('returns parsed resource for `A` with `HREF`', function () {
		var vNode = queryFixture(
			'<a id="target" href="https://facebook.com">follow us on Facebook</a>'
		);
		var expected = {
			filename: undefined,
			hash: undefined,
			hostname: "facebook.com",
			pathname: "",
			port: "",
			protocol: "https:",
			search: {}
		}
		var actual = axe.commons.dom.urlPropsFromAttribute(vNode.actualNode, 'href');
		assert.deepEqual(actual, expected)
	});

	it('returns parsed resource for `A` with `HREF` which has subdirectory and inline link', function () {
		var vNode = queryFixture(
			'<a id="target" href="http://mysite.com/directory/#anchor">Go to Issues</a>'
		);
		var expected = {
			filename: undefined,
			hash: undefined,
			hostname: "mysite.com",
			pathname: "/directory",
			port: "",
			protocol: "http:",
			search: {}
		}
		var actual = axe.commons.dom.urlPropsFromAttribute(vNode.actualNode, 'href');
		assert.deepEqual(actual, expected)
	});

	it('returns parsed resource for `A` with `HREF` which has subdirectory and hashbang', function () {
		var vNode = queryFixture(
			'<a id="target" href="http://mysite.com/directory/#!foo">See our services</a>'
		);
		var expected = {
			filename: undefined,
			hash: "#!foo",
			hostname: "mysite.com",
			pathname: "/directory",
			port: "",
			protocol: "http:",
			search: {}
		}
		var actual = axe.commons.dom.urlPropsFromAttribute(vNode.actualNode, 'href');
		assert.deepEqual(actual, expected)
	});

	it('returns parsed resource for `A` with `HREF` which has search query', function () {
		var vNode = queryFixture(
			'<a id="target" href="http://mysite.com/search/?q=foo#bar">Get list of foo bars</a>'
		);
		var expected = {
			filename: undefined,
			hash: undefined,
			hostname: "mysite.com",
			pathname: "/search",
			port: "",
			protocol: "http:",
			search: {
				q: "foo"
			}
		}
		var actual = axe.commons.dom.urlPropsFromAttribute(vNode.actualNode, 'href');
		assert.deepEqual(actual, expected)
	});

	it('returns parsed resource for `A` with `HREF` which has multiple search query parameters', function () {
		var vNode = queryFixture(
			'<a id="target" href="http://mysite.com/search/?a=123&z=XYZ&name=Axe&version=1.2.3&values=[1,2,3]">Get list of foo bars</a>'
		);
		var expected = {
			filename: undefined,
			hash: undefined,
			hostname: "mysite.com",
			pathname: "/search",
			port: "",
			protocol: "http:",
			search: {
				a: "123",
				z: "XYZ",
				name: "Axe",
				values: "[1,2,3]",
				version: "1.2.3"
			}
		}
		var actual = axe.commons.dom.urlPropsFromAttribute(vNode.actualNode, 'href');
		assert.deepEqual(actual, expected)
	});

	it('returns parsed resource for `A` with `HREF` which has filename', function () {
		var vNode = queryFixture(
			'<a id="target" href="directory/widgets/calendar.html">Book tour</a>'
		);
		var expected = {
			filename: "calendar.html",
			hash: undefined,
			hostname: "localhost",
			pathname: "",
			port: "9876",
			protocol: "http:",
			search: {}
		}
		var actual = axe.commons.dom.urlPropsFromAttribute(vNode.actualNode, 'href');
		assert.deepEqual(actual, expected)
	});

	it('returns parsed resource for `A` with `HREF` which has filename as `index` (ignores index.*)', function () {
		var vNode = queryFixture(
			'<a id="target" href="http://mysite.com/directory/index.html">Book tour</a>'
		);
		var expected = {
			filename: undefined,
			hash: undefined,
			hostname: "mysite.com",
			pathname: "/directory",
			port: "",
			protocol: "http:",
			search: {}
		}
		var actual = axe.commons.dom.urlPropsFromAttribute(vNode.actualNode, 'href');
		assert.deepEqual(actual, expected)
	});
});
