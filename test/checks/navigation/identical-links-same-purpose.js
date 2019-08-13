describe('identical-links-same-purpose tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var check = checks['identical-links-same-purpose'];
	var checkContext = axe.testUtils.MockCheckContext();
	var options = {};

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
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
		assert.hasAllKeys(checkContext._data, ['name', 'resource']);
	});

	it('returns true for ARIA links has accessible name', function() {
		var vNode = queryFixture(
			'<map><area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/></map>'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isTrue(actual);
		assert.hasAllKeys(checkContext._data, ['name', 'resource']);
	});

	it('returns true for native links with `href` and accessible name (that also has emoji, nonBmp and punctuation characters)', function() {
		var vNode = queryFixture(
			'<a id="target" href="/home/#/foo">The ☀️ is orange, the ◓ is white.</a>'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isTrue(actual);
		assert.hasAllKeys(checkContext._data, ['name', 'resource']);
	});
});
