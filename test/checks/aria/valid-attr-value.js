describe('aria-valid-attr-value', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should not check the validity of attribute names', function() {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-cats', 'true');
		node.setAttribute('aria-selected', 'true');
		fixture.appendChild(node);

		assert.isTrue(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, node)
		);
		assert.isNull(checkContext._data);
	});

	it('should return true if all values are valid', function() {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-selected', 'true');
		node.setAttribute('aria-checked', 'true');
		node.setAttribute('aria-relevant', 'additions removals');
		fixture.appendChild(node);

		assert.isTrue(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, node)
		);
		assert.isNull(checkContext._data);
	});

	it('should return true if idref(s) values are valid', function() {
		var node = document.createElement('div');
		var testTgt1 = document.createElement('div');
		var testTgt2 = document.createElement('div');

		node.id = 'test';
		testTgt1.id = 'test_tgt1';
		testTgt2.id = 'test_tgt2';
		node.setAttribute('aria-owns', 'test_tgt1 test_tgt2');
		node.setAttribute('aria-activedescendant', 'test_tgt1');

		node.tabIndex = 1;
		fixture.appendChild(node);
		fixture.appendChild(testTgt1);
		fixture.appendChild(testTgt2);

		assert.isTrue(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, node)
		);
		assert.isNull(checkContext._data);
	});

	it('should return false if any values are invalid', function() {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-live', 'polite');
		node.setAttribute('aria-selected', '0');
		fixture.appendChild(node);

		assert.isFalse(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, node)
		);
		assert.deepEqual(checkContext._data, ['aria-selected="0"']);
	});

	it('should allow empty strings rather than idref', function() {
		fixtureSetup(
			'<button aria-controls="">Button</button>' +
				'<div aria-activedescendant=""></div>'
		);
		var passing1 = fixture.querySelector('button');
		var passing2 = fixture.querySelector('div');
		assert.isTrue(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, passing1)
		);
		assert.isTrue(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, passing2)
		);
	});

	it('should allow empty strings rather than idrefs', function() {
		fixtureSetup(
			'<button aria-labelledby="">Button</button>' + '<div aria-owns=""></div>'
		);
		var passing1 = fixture.querySelector('button');
		var passing2 = fixture.querySelector('div');
		assert.isTrue(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, passing1)
		);
		assert.isTrue(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, passing2)
		);
	});

	it('should pass on aria-controls and aria-expanded=false when the element is not in the DOM', function() {
		fixtureSetup(
			'<button aria-controls="test" aria-expanded="false">Button</button>'
		);
		var passing1 = fixture.querySelector('button');
		assert.isTrue(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, passing1)
		);
	});

	it('should pass on aria-controls and aria-selected=false when the element is not in the DOM', function() {
		fixtureSetup(
			'<button aria-controls="test" aria-selected="false">Button</button>'
		);
		var passing1 = fixture.querySelector('button');
		assert.isTrue(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, passing1)
		);
	});

	it('should fail on aria-controls and aria-expanded=true when the element is not in the DOM', function() {
		fixtureSetup(
			'<button aria-controls="test" aria-expanded="true">Button</button>'
		);
		var failing1 = fixture.querySelector('button');
		assert.isFalse(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, failing1)
		);
	});

	it('should fail on aria-controls and aria-selected=true when the element is not in the DOM', function() {
		fixtureSetup(
			'<button aria-controls="test" aria-selected="true">Button</button>'
		);
		var failing1 = fixture.querySelector('button');
		assert.isFalse(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, failing1)
		);
	});

	it('should fail on aria-controls when the element is not in the DOM', function() {
		fixtureSetup('<button aria-controls="test">Button</button>');
		var failing1 = fixture.querySelector('button');
		assert.isFalse(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, failing1)
		);
	});

	it('should pass on aria-owns and aria-expanded=false when the element is not in the DOM', function() {
		fixtureSetup(
			'<button aria-owns="test" aria-expanded="false">Button</button>'
		);
		var passing1 = fixture.querySelector('button');
		assert.isTrue(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, passing1)
		);
	});

	it('should fail on aria-owns and aria-expanded=true when the element is not in the DOM', function() {
		fixtureSetup(
			'<button aria-owns="test" aria-expanded="true">Button</button>'
		);
		var failing1 = fixture.querySelector('button');
		assert.isFalse(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, failing1)
		);
	});

	it('should fail on aria-owns when the element is not in the DOM', function() {
		fixtureSetup('<button aria-owns="test">Button</button>');
		var failing1 = fixture.querySelector('button');
		assert.isFalse(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, failing1)
		);
	});

	it('should return undefined on aria-describedby when the element is not in the DOM', function() {
		fixtureSetup('<button aria-describedby="test">Button</button>');
		var undefined1 = fixture.querySelector('button');
		assert.isUndefined(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, undefined1)
		);
	});

	it('should return undefined on aria-current with invalid value', function() {
		fixtureSetup('<button aria-current="test">Button</button>');
		var undefined1 = fixture.querySelector('button');
		assert.isUndefined(
			checks['aria-valid-attr-value'].evaluate.call(checkContext, undefined1)
		);
	});

	describe('options', function() {
		it('should exclude supplied attributes', function() {
			fixture.innerHTML =
				'<div id="target" aria-live="nope" aria-describedby="no exist k thx"></div>';
			var target = fixture.querySelector('#target');
			assert.isTrue(
				checks['aria-valid-attr-value'].evaluate.call(checkContext, target, [
					'aria-live',
					'aria-describedby'
				])
			);
		});
	});
});
