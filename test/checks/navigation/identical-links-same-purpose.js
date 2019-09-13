describe('identical-links-same-purpose tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
	var queryFixture = axe.testUtils.queryFixture;
	var check = checks['identical-links-same-purpose'];
	var checkContext = axe.testUtils.MockCheckContext();
	var options = {};

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
		axe._tree = undefined;
	});

	it('returns undefined for native link with `href` but no accessible name', function() {
		var vNode = queryFixture('<a id="target" href="/home/#/foo"></a>');
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isUndefined(actual);
		assert.isNull(checkContext._data);
	});

	it('returns undefined when ARIA link that has no accessible name', function() {
		var vNode = queryFixture('<span role="link" id="target"></span>');
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isUndefined(actual);
		assert.isNull(checkContext._data);
	});

	it('returns undefined when native link has only emoji as accessible name', function() {
		var vNode = queryFixture(
			'<a id="target" href="/some-directory/contact/rock.html">🤘</a>'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isUndefined(actual);
		assert.isNull(checkContext._data);
	});

	it('returns undefined when native link has only nonBmp characters (diacritical marks supplement) as accessible name', function() {
		var vNode = queryFixture(
			'<a id="target" href="/some-directory/contact/rock.html">ᴁ</a>'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isUndefined(actual);
		assert.isNull(checkContext._data);
	});

	it('returns undefined when native link has only nonBmp characters (currency symbol) as accessible name', function() {
		var vNode = queryFixture(
			'<a id="target" href="/some-directory/currency.html">₨ </a>'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isUndefined(actual);
		assert.isNull(checkContext._data);
	});

	it('returns undefined when ARIA link has only punctuations as accessible name', function() {
		var vNode = queryFixture('<button id="target" role="link">!!!!</button>');
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isUndefined(actual);
		assert.isNull(checkContext._data);
	});

	it('returns undefined when ARIA link has only combination of emoji, punctuations, nonBmp characters as accessible name', function() {
		var vNode = queryFixture(
			'<button id="target" role="link">☀️!₨   </button>'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isUndefined(actual);
		assert.isNull(checkContext._data);
	});

	it('returns true for native links with `href` and accessible name', function() {
		var vNode = queryFixture('<a id="target" href="/home/#/foo">Pass 1</a>');
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isTrue(actual);
		assert.hasAllKeys(checkContext._data, ['name', 'parsedResource']);
		assert.equal(checkContext._data.name, 'Pass 1'.toLowerCase());
		assert.equal(checkContext._data.parsedResource.hash, '#/foo');
		assert.equal(checkContext._data.parsedResource.pathname, '/home');
	});

	it('returns undefined for `AREA` without closest `MAP` element', function() {
		var vNode = queryFixture(
			'<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isUndefined(actual);
	});

	it('returns undefined for `AREA with closest `MAP` with no name attribute', function() {
		var vNode = queryFixture(
			'<map>' +
				'<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
				'</map>'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isUndefined(actual);
	});

	it('returns undefined for `AREA with closest `MAP` with name but not referred by an `IMG` usemap attribute', function() {
		var vNode = queryFixture(
			'<map name="infographic">' +
				'<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
				'</map>' +
				'<img usemap="#infographic-wrong-name" alt="MDN infographic" />'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isUndefined(actual);
	});

	it('returns true for ARIA links has accessible name (AREA with `MAP` which is used in `IMG`)', function() {
		var vNode = queryFixture(
			'<map name="infographic">' +
				'<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
				'</map>' +
				'<img usemap="#infographic" alt="MDN infographic" />'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isTrue(actual);
		assert.hasAllKeys(checkContext._data, ['name', 'parsedResource']);
		assert.equal(checkContext._data.name, 'MDN'.toLowerCase());
		assert.isFalse(!!checkContext._data.resource);
	});

	it('returns true for native links with `href` and accessible name (that also has emoji, nonBmp and punctuation characters)', function() {
		var vNode = queryFixture(
			'<a id="target" href="/contact/foo.html">The ☀️ is orange, the ◓ is white.</a>'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isTrue(actual);
		assert.hasAllKeys(checkContext._data, ['name', 'parsedResource']);
		assert.equal(
			checkContext._data.name,
			'The is orange the is white'.toLowerCase()
		);
		assert.equal(checkContext._data.parsedResource.filename, 'foo.html');
	});

	(shadowSupported ? it : xit)(
		'returns undefined for native link (in shadowDOM) with `href` but no accessible name',
		function() {
			var params = shadowCheckSetup(
				'<div id="shadow"></div>',
				'<a id="target" href="/home/#/foo"></a>'
			);
			var actual = check.evaluate.apply(checkContext, params);
			assert.isUndefined(actual);
			assert.isNull(checkContext._data);
		}
	);

	(shadowSupported ? it : xit)(
		'returns true for native links (in shadowDOM) with `href` and accessible name',
		function() {
			var params = shadowCheckSetup(
				'<div id="shadow"></div>',
				'<a id="target" href="/home/#/foo">Pass 1</a>'
			);
			var actual = check.evaluate.apply(checkContext, params);
			assert.isTrue(actual);
			assert.hasAllKeys(checkContext._data, ['name', 'parsedResource']);
			assert.equal(checkContext._data.name, 'Pass 1'.toLowerCase());
			assert.equal(checkContext._data.parsedResource.hash, '#/foo');
			assert.equal(checkContext._data.parsedResource.pathname, '/home');
		}
	);

	(shadowSupported ? it : xit)(
		'returns undefined when ARIA link (in shadowDOM) has only punctuations as accessible name',
		function() {
			var params = shadowCheckSetup(
				'<div id="shadow"></div>',
				'<button id="target" role="link">!!!!</button>'
			);
			var actual = check.evaluate.apply(checkContext, params);
			assert.isUndefined(actual);
			assert.isNull(checkContext._data);
		}
	);

	(shadowSupported ? it : xit)(
		'returns true for ARIA links (in shadowDOM) has accessible name (AREA with `MAP` which is used in `IMG`)',
		function() {
			var params = shadowCheckSetup(
				'<div id="shadow"></div>',
				'<map name="infographic">' +
					'<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
					'</map>' +
					'<img usemap="#infographic" alt="MDN infographic" />'
			);
			var actual = check.evaluate.apply(checkContext, params);
			assert.isTrue(actual);
			assert.hasAllKeys(checkContext._data, ['name', 'parsedResource']);
			assert.equal(checkContext._data.name, 'MDN'.toLowerCase());
			assert.isFalse(!!checkContext._data.resource);
		}
	);
});
