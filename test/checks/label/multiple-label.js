describe('multiple-label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkContext = {
		_relatedNodes: [],
		_data: null,
		data: function (d) {
			this._data = d;
		},
		relatedNodes: function (rn) {
			this._relatedNodes = rn;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._relatedNodes = [];
		checkContext._data = null;
	});

	it('should return true if there are multiple implicit labels', function () {
		fixture.innerHTML = '<label id="l2"><label id="l1"><input type="text" id="target"></label></label>';
		var target = fixture.querySelector('#target');
		var l1 = fixture.querySelector('#l1');
		var l2 = fixture.querySelector('#l2');
		assert.isTrue(checks['multiple-label'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [l1, l2]);
	});

	it('should return false if there is only one implicit label', function () {
		fixture.innerHTML = '<label id="l1"><input type="text" id="target"></label>';
		var target = fixture.querySelector('#target');
		var l1 = fixture.querySelector('#l1');
		assert.isFalse(checks['multiple-label'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [l1]);
	});

	it('should return true if there are multiple explicit labels', function () {
		fixture.innerHTML = '<label id="l1" for="target">Foo</label>'+
			'<label id="l2" for="target">Bar</label>'+
			'<label id="l3" for="target">Bat</label>'+
			'<input type="text" id="target">';
		var target = fixture.querySelector('#target');
		var l1 = fixture.querySelector('#l1');
		var l2 = fixture.querySelector('#l2');
		var l3 = fixture.querySelector('#l3');
		assert.isTrue(checks['multiple-label'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [l1, l2, l3]);
	});

	it('should return false if there is only one explicit label', function () {
		fixture.innerHTML = '<label id="l1" for="target">Foo</label><input type="text" id="target">';
		var target = fixture.querySelector('#target');
		var l1 = fixture.querySelector('#l1');
		assert.isFalse(checks['multiple-label'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [l1]);
	});

	it('should return false if there are multiple explicit labels but one is hidden', function () {
		fixture.innerHTML = '<label for="test-input2" id="l1">label one</label>' +
			'<label for="test-input2" style="display:none" id="lnone">label two</label>' +
			'<input id="test-input2" type="text">';
		var target = fixture.querySelector('#test-input2');
		var l1 = fixture.querySelector('#l1');
		assert.isFalse(checks['multiple-label'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [l1]);
	});

	it('should return true if there are multiple explicit labels but the first one is hidden', function () {
		fixture.innerHTML = '<label style="display:none" for="test-input2" id="l1">label one</label>' +
			'<label for="test-input2" id="l2">label two</label>' +
			'<input id="test-input2" type="text">';
		var target = fixture.querySelector('#test-input2');
		var l1 = fixture.querySelector('#l1');
		var l2 = fixture.querySelector('#l2');
		assert.isTrue(checks['multiple-label'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [l1, l2]);
	});

	it('should return true if there are multiple explicit labels but the first one is hidden', function () {
		fixture.innerHTML = '<label for="me" id="l1">visible</label>'+
				'<label for="me" style="display:none;" id="l2">hidden</label>'+
				'<label for="me" id="l3">visible</label>'+
				'<input id="me" type="text">';
		var target = fixture.querySelector('#me');
		var l1 = fixture.querySelector('#l1');
		var l3 = fixture.querySelector('#l3');
		assert.isTrue(checks['multiple-label'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [l1, l3]);
	});

	it('should return true if there are implicit and explicit labels', function () {
		fixture.innerHTML = '<label id="l1" for="target">Foo</label><label id="l2"><input type="text" id="target"></label>';
		var target = fixture.querySelector('#target');
		var l1 = fixture.querySelector('#l1');
		var l2 = fixture.querySelector('#l2');
		assert.isTrue(checks['multiple-label'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [l1, l2]);
	});

	it('should return false if there an implicit label uses for attribute', function () {
		fixture.innerHTML = '<label for="target">Foo<input type="text" id="target"></label>';
		var target = fixture.querySelector('#target');
		assert.isFalse(checks['multiple-label'].evaluate.call(checkContext, target));
	});

});
