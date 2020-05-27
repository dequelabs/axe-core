describe('multiple-label', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return undefined if there are multiple implicit labels', function() {
		fixture.innerHTML =
			'<label id="l2"><label id="l1"><input type="text" id="target"></label></label>';
		var target = fixture.querySelector('#target');
		var l1 = fixture.querySelector('#l1');
		var l2 = fixture.querySelector('#l2');
		assert.isUndefined(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
		assert.deepEqual(checkContext._relatedNodes, [l1, l2]);
	});

	it('should return false if there is only one implicit label', function() {
		fixture.innerHTML =
			'<label id="l1"><input type="text" id="target"></label>';
		var target = fixture.querySelector('#target');
		var l1 = fixture.querySelector('#l1');
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
		assert.deepEqual(checkContext._relatedNodes, [l1]);
	});

	it('should return undefined if there are multiple explicit labels', function() {
		fixture.innerHTML =
			'<label id="l1" for="target">Foo</label>' +
			'<label id="l2" for="target">Bar</label>' +
			'<label id="l3" for="target">Bat</label>' +
			'<input type="text" id="target">';
		var target = fixture.querySelector('#target');
		var l1 = fixture.querySelector('#l1');
		var l2 = fixture.querySelector('#l2');
		var l3 = fixture.querySelector('#l3');
		assert.isUndefined(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
		assert.deepEqual(checkContext._relatedNodes, [l1, l2, l3]);
	});

	it('should return false if there is only one explicit label', function() {
		fixture.innerHTML =
			'<label id="l1" for="target">Foo</label><input type="text" id="target">';
		var target = fixture.querySelector('#target');
		var l1 = fixture.querySelector('#l1');
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
		assert.deepEqual(checkContext._relatedNodes, [l1]);
	});

	it('should return false if there are multiple explicit labels but one is hidden', function() {
		fixture.innerHTML =
			'<label for="test-input2" id="l1">label one</label>' +
			'<label for="test-input2" style="display:none" id="lnone">label two</label>' +
			'<input id="test-input2" type="text">';
		var target = fixture.querySelector('#test-input2');
		var l1 = fixture.querySelector('#l1');
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
		assert.deepEqual(checkContext._relatedNodes, [l1]);
	});

	it('should return undefined if there are multiple explicit labels but some are hidden', function() {
		fixture.innerHTML =
			'<label for="me" id="l1">visible</label>' +
			'<label for="me" style="display:none;" id="l2">hidden</label>' +
			'<label for="me" id="l3">visible</label>' +
			'<input id="me" type="text">';
		var target = fixture.querySelector('#me');
		var l1 = fixture.querySelector('#l1');
		var l3 = fixture.querySelector('#l3');
		assert.isUndefined(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
		assert.deepEqual(checkContext._relatedNodes, [l1, l3]);
	});

	it('should return undefined if there are implicit and explicit labels', function() {
		fixture.innerHTML =
			'<label id="l1" for="target">Foo</label><label id="l2"><input type="text" id="target"></label>';
		var target = fixture.querySelector('#target');
		var l1 = fixture.querySelector('#l1');
		var l2 = fixture.querySelector('#l2');
		assert.isUndefined(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
		assert.deepEqual(checkContext._relatedNodes, [l1, l2]);
	});

	it('should return false if there an implicit label uses for attribute', function() {
		fixture.innerHTML =
			'<label for="target">Foo<input type="text" id="target"></label>';
		var target = fixture.querySelector('#target');
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
	});

	it('should return undefined given multiple labels and no aria-labelledby', function() {
		fixture.innerHTML = '<input type="checkbox" id="A">';
		fixture.innerHTML += '<label for="A">Please</label>';
		fixture.innerHTML += '<label for="A">Excuse</label>';
		fixture.innerHTML += '<label for="A">My</label>';
		fixture.innerHTML += '<label for="A">Dear</label>';
		fixture.innerHTML += '<label for="A">Aunt</label>';
		fixture.innerHTML += '<label for="A">Sally</label>';
		var target = fixture.querySelector('#A');
		assert.isUndefined(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
	});

	it('should return undefined given multiple labels, one label AT visible, and no aria-labelledby', function() {
		fixture.innerHTML = '<input type="checkbox" id="B">';
		fixture.innerHTML += '<label for="B">Please</label>';
		fixture.innerHTML += '<label for="B" aria-hidden="true">Excuse</label>';
		fixture.innerHTML += '<label for="B" aria-hidden="true">My</label>';
		fixture.innerHTML += '<label for="B" aria-hidden="true">Dear</label>';
		fixture.innerHTML += '<label for="B" aria-hidden="true">Aunt</label>';
		fixture.innerHTML += '<label for="B" aria-hidden="true">Sally</label>';
		var target = fixture.querySelector('#B');
		assert.isUndefined(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
	});

	it('should return false given multiple labels, one label AT visible, and aria-labelledby for AT visible', function() {
		fixture.innerHTML = '<input type="checkbox" id="D" aria-labelledby="E"/>';
		fixture.innerHTML += '<label for="D" aria-hidden="true">Please</label>';
		fixture.innerHTML += '<label for="D" id="E">Excuse</label>';
		var target = fixture.querySelector('#D');
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
	});

	it('should return false given multiple labels, one label AT visible, and aria-labelledby for all', function() {
		fixture.innerHTML = '<input type="checkbox" id="F" aria-labelledby="G H"/>';
		fixture.innerHTML +=
			'<label for="F" id="G" aria-hidden="true">Please</label>';
		fixture.innerHTML += '<label for="F" id="H">Excuse</label>';
		var target = fixture.querySelector('#F');
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
	});

	it('should return false given multiple labels, one label visible, and no aria-labelledby', function() {
		fixture.innerHTML = '<input type="checkbox" id="I"/>';
		fixture.innerHTML += '<label for="I" style="display:none">Please</label>';
		fixture.innerHTML += '<label for="I" >Excuse</label>';
		var target = fixture.querySelector('#I');
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
	});

	it('should return undefined given multiple labels, all visible, aria-labelledby for all', function() {
		fixture.innerHTML =
			'<input type="checkbox" id="J" aria-labelledby="K L M N O P">';
		fixture.innerHTML += '<label for="J" id="K">Please</label>';
		fixture.innerHTML += '<label for="J" id="L">Excuse</label>';
		fixture.innerHTML += '<label for="J" id="M">My</label>';
		fixture.innerHTML += '<label for="J" id="N">Dear</label>';
		fixture.innerHTML += '<label for="J" id="O">Aunt</label>';
		fixture.innerHTML += '<label for="J" id="P">Sally</label>';
		var target = fixture.querySelector('#J');
		assert.isUndefined(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
	});

	it('should return undefined given multiple labels, one AT visible, no aria-labelledby', function() {
		fixture.innerHTML = '<input type="checkbox" id="Q"/>';
		fixture.innerHTML += '<label for="Q" aria-hidden="true"></label>';
		fixture.innerHTML += '<label for="Q" >Excuse</label>';
		var target = fixture.querySelector('#Q');
		assert.isUndefined(
			axe.testUtils
				.getCheckEvaluate('multiple-label')
				.call(checkContext, target)
		);
	});

	(shadowSupported ? it : xit)(
		'should consider labels in the same document/shadow tree',
		function() {
			fixture.innerHTML = '<div id="target"></div>';
			var target = document.querySelector('#target');
			var shadowRoot = target.attachShadow({ mode: 'open' });
			shadowRoot.innerHTML =
				'<input id="myinput" /><label for="myinput">normal</label>';
			var shadowTarget = target.shadowRoot;
			assert.isFalse(
				axe.testUtils
					.getCheckEvaluate('multiple-label')
					.call(checkContext, shadowTarget.firstElementChild)
			);
		}
	);

	(shadowSupported ? it : xit)(
		'should return false for valid multiple labels in the same document/shadow tree',
		function() {
			fixture.innerHTML = '<div id="target"></div>';
			var target = document.querySelector('#target');
			var shadowRoot = target.attachShadow({ mode: 'open' });
			var innerHTML = '<input type="checkbox" id="D" aria-labelledby="E"/>';
			innerHTML += '<label for="D" aria-hidden="true">Please</label>';
			innerHTML += '<label for="D" id="E">Excuse</label>';
			shadowRoot.innerHTML = innerHTML;
			var shadowTarget = target.shadowRoot;
			assert.isFalse(
				axe.testUtils
					.getCheckEvaluate('multiple-label')
					.call(checkContext, shadowTarget.firstElementChild)
			);
		}
	);

	(shadowSupported ? it : xit)(
		'should return undefined for invalid multiple labels in the same document/shadow tree',
		function() {
			fixture.innerHTML = '<div id="target"></div>';
			var target = document.querySelector('#target');
			var shadowRoot = target.attachShadow({ mode: 'open' });
			var innerHTML = '<input type="checkbox" id="Q"/>';
			innerHTML += '<label for="Q" aria-hidden="true"></label>';
			innerHTML += '<label for="Q" >Excuse</label>';
			shadowRoot.innerHTML = innerHTML;
			var shadowTarget = target.shadowRoot;
			assert.isUndefined(
				axe.testUtils
					.getCheckEvaluate('multiple-label')
					.call(checkContext, shadowTarget.firstElementChild)
			);
		}
	);
});
