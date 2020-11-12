describe('aria.getAccessibleRefs', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var getAccessibleRefs = axe.commons.aria.getAccessibleRefs;
	var shadowSupport = axe.testUtils.shadowSupport.v1;

	function setLookup(attrs) {
		axe.configure({
			standards: {
				ariaAttrs: attrs
			}
		});
	}

	before(function() {
		axe._load({});
	});

	afterEach(function() {
		fixture.innerHTML = '';
		axe.reset();
	});

	it('returns empty array by default', function() {
		fixture.innerHTML = '<div id="foo"><div>';
		var node = document.getElementById('foo');
		assert.lengthOf(getAccessibleRefs(node), 0);
	});

	it('returns array of nodes for IDs used in aria IDREF attributes', function() {
		setLookup({ 'aria-foo': { type: 'idref' } });
		fixture.innerHTML = '<div aria-foo="foo"></div><i id="foo"></i>';
		var node = document.getElementById('foo');
		assert.lengthOf(getAccessibleRefs(node), 1);
	});

	it('returns array of nodes for IDs used in aria IDREFS attributes', function() {
		setLookup({ 'aria-bar': { type: 'idrefs' } });
		fixture.innerHTML =
			'<div aria-bar="foo bar"></div><i id="foo"></i><b id="bar"></b>';

		var node1 = document.getElementById('foo');
		var node2 = document.getElementById('bar');
		assert.lengthOf(getAccessibleRefs(node1), 1);
		assert.lengthOf(getAccessibleRefs(node2), 1);
	});

	it('returns array of nodes for IDs used in label[for] attributes', function() {
		setLookup({ 'aria-foo': { type: 'idref' } });
		fixture.innerHTML = '<label for="baz">baz</label><input id="baz">';
		var node = document.getElementById('baz');
		assert.lengthOf(getAccessibleRefs(node), 1);
	});

	it('returns all nodes used in aria IDREF attributes', function() {
		setLookup({ 'aria-bar': { type: 'idrefs' } });
		fixture.innerHTML =
			'<div aria-bar="foo bar"><div aria-bar="foo bar"></div><i id="foo"></i><b id="bar"></b>';

		var node1 = document.getElementById('foo');
		var node2 = document.getElementById('bar');
		assert.lengthOf(getAccessibleRefs(node1), 2);
		assert.lengthOf(getAccessibleRefs(node2), 2);
	});

	(shadowSupport ? it : xit)('works inside shadow DOM', function() {
		setLookup({ 'aria-bar': { type: 'idref' } });
		fixture.innerHTML = '<div id="foo"></div>';

		var shadow = document.getElementById('foo').attachShadow({ mode: 'open' });
		shadow.innerHTML = '<div aria-bar="bar"></div><b id="bar"></b>';

		var node = shadow.getElementById('bar');
		assert.lengthOf(getAccessibleRefs(node), 1);
	});

	(shadowSupport ? it : xit)(
		'returns empty array for IDREFs inside shadow DOM',
		function() {
			setLookup({ 'aria-foo': { type: 'idrefs' } });
			fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
			var node1 = document.getElementById('foo');
			var node2 = document.getElementById('bar');

			var shadow = node1.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<div aria-foo="foo bar"><slot></slot></div>';

			assert.lengthOf(getAccessibleRefs(node1), 0);
			assert.lengthOf(getAccessibleRefs(node2), 0);
		}
	);

	(shadowSupport ? it : xit)(
		'returns empty array for IDREFs outside shadow DOM',
		function() {
			setLookup({ 'aria-bar': { type: 'idref' } });
			fixture.innerHTML =
				'<div id="foo" aria-bar="bar"><div aria-bar="bar"></div></div>';

			var shadow = document
				.getElementById('foo')
				.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<div id="bar"><slot></slot></div>';

			var node = shadow.getElementById('bar');
			assert.lengthOf(getAccessibleRefs(node), 0);
		}
	);
});
