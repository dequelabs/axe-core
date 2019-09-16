describe('dom.getParsedResource', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns undefined when given node does not have specified attribute', function() {
		var vNode = queryFixture(
			'<button id="target" role="link">Schedule appointment</button>'
		);
		var actual = axe.commons.dom.getParsedResource(vNode.actualNode, 'href');
		assert.isUndefined(actual);
	});

	it('returns undefined when `A` has no `HREF` attribute', function() {
		var vNode = queryFixture('<a id="target">Follow us on Instagram</a>');
		var actual = axe.commons.dom.getParsedResource(vNode.actualNode, 'href');
		assert.isUndefined(actual);
	});

	it('returns parsed resource when `A` has empty `HREF`', function() {
		var vNode = queryFixture(
			'<a id="target" href="">Follow us on Instagram</a>'
		);
		var actual = axe.commons.dom.getParsedResource(vNode.actualNode, 'href');
		assert.isDefined(actual);
		assert.isUndefined(actual.hash);
		assert.isUndefined(actual.filename);
		assert.equal(actual.hostname, 'localhost');
		assert.equal(actual.pathname, '/test/commons');
	});

	it('returns parsed resource for `A` with `HREF`', function() {
		var vNode = queryFixture(
			'<a id="target" href="https://facebook.com">follow us on Facebook</a>'
		);
		var actual = axe.commons.dom.getParsedResource(vNode.actualNode, 'href');
		assert.isDefined(actual);
		assert.equal(actual.protocol, 'https:');
		assert.equal(actual.hostname, 'facebook.com');
	});

	it('returns parsed resource for `A` with `HREF` which has subdirectory and inline link', function() {
		var vNode = queryFixture(
			'<a id="target" href="http://mysite.com/directory/#anchor">Go to Issues</a>'
		);
		var actual = axe.commons.dom.getParsedResource(vNode.actualNode, 'href');
		assert.isDefined(actual);
		assert.equal(actual.protocol, 'http:');
		assert.equal(actual.hostname, 'mysite.com');
		assert.equal(actual.pathname, '/directory');
		// inline anchor is not interpreted as hash
		assert.isUndefined(actual.hash);
	});

	it('returns parsed resource for `A` with `HREF` which has subdirectory and hashbang', function() {
		var vNode = queryFixture(
			'<a id="target" href="http://mysite.com/directory/#!foo">See our services</a>'
		);
		var actual = axe.commons.dom.getParsedResource(vNode.actualNode, 'href');
		assert.isDefined(actual);
		assert.equal(actual.protocol, 'http:');
		assert.equal(actual.hostname, 'mysite.com');
		assert.equal(actual.pathname, '/directory');
		// hashbang is not interpreted as hash
		assert.equal(actual.hash, '#!foo');
	});

	it('returns parsed resource for `A` with `HREF` which has search query', function() {
		var vNode = queryFixture(
			'<a id="target" href="http://mysite.com/search/?q=foo#bar">Get list of foo bars</a>'
		);
		var actual = axe.commons.dom.getParsedResource(vNode.actualNode, 'href');
		assert.isDefined(actual);
		assert.equal(actual.protocol, 'http:');
		assert.equal(actual.hostname, 'mysite.com');
		assert.equal(actual.pathname, '/search');
		assert.equal(actual.search, '?q=foo');
	});

	it('returns parsed resource for `A` with `HREF` which has filename', function() {
		var vNode = queryFixture(
			'<a id="target" href="directory/widgets/calendar.html">Book tour</a>'
		);
		var actual = axe.commons.dom.getParsedResource(vNode.actualNode, 'href');
		assert.isDefined(actual);
		assert.equal(actual.filename, 'calendar.html');
	});

	it('returns parsed resource for `A` with `HREF` which has filename as `index` (ignores index.*)', function() {
		var vNode = queryFixture(
			'<a id="target" href="http://mysite.com/directory/index.html">Book tour</a>'
		);
		var actual = axe.commons.dom.getParsedResource(vNode.actualNode, 'href');
		assert.isDefined(actual);
		assert.equal(actual.protocol, 'http:');
		assert.equal(actual.hostname, 'mysite.com');
		assert.equal(actual.pathname, '/directory');
		assert.isUndefined(actual.filename);
	});
});
