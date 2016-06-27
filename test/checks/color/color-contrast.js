describe('color-contrast', function () {
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

	it('should return store the proper values in data', function () {
		fixture.innerHTML = '<div id="parent" style="color: black; background-color: white; font-size: 14pt"><b id="target">' +
			'My text</b></div>';
		var target = fixture.querySelector('#target');

		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		var white = new axe.commons.color.Color(255, 255, 255, 1);
		var black = new axe.commons.color.Color(0, 0, 0, 1);
		assert.equal(checkContext._data.bgColor, white.toHexString());
		assert.equal(checkContext._data.fgColor, black.toHexString());
		assert.equal(checkContext._data.contrastRatio, '21.00');
		assert.equal(checkContext._data.fontWeight, 'bold');
		assert.closeTo(parseFloat(checkContext._data.fontSize), 14, 0.5);
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast because of bold tag', function () {
		fixture.innerHTML = '<div id="parent" style="color: gray; background-color: white; font-size: 14pt"><b id="target">' +
			'My text</b></div>';
		var target = fixture.querySelector('#target');

		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast because of font weight', function () {
		fixture.innerHTML = '<div style="color: gray; background-color: white; font-size: 14pt; font-weight: bold" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast because of font size', function () {
		fixture.innerHTML = '<div style="color: gray; background-color: white; font-size: 18pt;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return false when there is not sufficient contrast because of font size', function () {
		fixture.innerHTML = '<div style="color: gray; background-color: white; font-size: 8pt;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [target]);
	});

	it('should return true when there is sufficient contrast with explicit transparency', function () {
		fixture.innerHTML = '<div id="parent" style="color: white; background-color: white;">' +
			'<span style="color: black; background-color: rgba(0,0,0,0)" id="target">My text</span></div>';
		var target = fixture.querySelector('#target');

		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast with implicit transparency', function () {
		fixture.innerHTML = '<div id="parent" style="color: white; background-color: white;">' +
			'<span style="color: black;" id="target">My text</span></div>';
		var target = fixture.querySelector('#target');

		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return true when there is sufficient contrast', function () {
		fixture.innerHTML = '<div style="color: black; background-color: white;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return false when there is not sufficient contrast', function () {
		fixture.innerHTML = '<div style="color: yellow; background-color: white;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(checks['color-contrast'].evaluate.call(checkContext, target));
		assert.deepEqual(checkContext._relatedNodes, [target]);
	});

	describe('matches', function () {

		it('should not match when there is no text', function () {
			fixture.innerHTML = '<div style="color: yellow; background-color: white;" id="target">' +
				' </div>';
			var target = fixture.querySelector('#target');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should match when there is text', function () {
			fixture.innerHTML = '<div style="color: yellow; background-color: white;" id="target">' +
				'My text</div>';
			var target = fixture.querySelector('#target');
			assert.isTrue(checks['color-contrast'].matches(target));
		});

		it('should not match when there is text that is out of the container', function () {
			fixture.innerHTML = '<div style="color: yellow; text-indent: -9999px; background-color: white;" id="target">' +
				'My text</div>';
			var target = fixture.querySelector('#target');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match when there is text that is out of the container with overflow hidden', function () {
			fixture.innerHTML = '<div style="color: yellow; width: 100px; overflow: hidden; text-indent: 200px; background-color: white;" id="target">' +
				'text</div>';
			var target = fixture.querySelector('#target');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should match when there is text that is in the scroll reach of container', function () {
			fixture.innerHTML = '<div style="color: yellow; width: 100px; overflow: scroll; text-indent: 200px; background-color: white;" id="target">' +
				'text</div>';
			var target = fixture.querySelector('#target');
			assert.isTrue(checks['color-contrast'].matches(target));
		});

		it('should match when there is text that is only partially out of the container', function () {
			fixture.innerHTML = '<div style="color: yellow; text-indent: -20px; background-color: white;" id="target">' +
				'My text</div>';
			var target = fixture.querySelector('#target');
			assert.isTrue(checks['color-contrast'].matches(target));
		});

		it('should match <input type="text">', function () {
			fixture.innerHTML = '<input type="text">';
			var target = fixture.querySelector('input');
			assert.isTrue(checks['color-contrast'].matches(target));
		});

		it('should not match <input type="hidden">', function () {
			fixture.innerHTML = '<input type="hidden">';
			var target = fixture.querySelector('input');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match <input type="checkbox">', function () {
			fixture.innerHTML = '<input type="checkbox">';
			var target = fixture.querySelector('input');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match <input type="radio">', function () {
			fixture.innerHTML = '<input type="radio">';
			var target = fixture.querySelector('input');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match <input type="color">', function () {
			fixture.innerHTML = '<input type="color">';
			var target = fixture.querySelector('input');
			// Some browsers will fallback to type=text for unknown input types (looking at you IE)
			if (target.type === 'color') {
				assert.isFalse(checks['color-contrast'].matches(target));
			}
		});

		it('should not match <input type="range">', function () {
			fixture.innerHTML = '<input type="range">';
			var target = fixture.querySelector('input');
			// Some browsers will fallback to type=text for unknown input types (looking at you IE)
			if (target.type === 'range') {
				assert.isFalse(checks['color-contrast'].matches(target));
			}
		});

		it('should match <select> with options', function () {
			fixture.innerHTML = '<select><option>Hello</option></select>';
			var target = fixture.querySelector('select');
			assert.isTrue(checks['color-contrast'].matches(target));
		});

		it('should not match <select> with no options', function () {
			fixture.innerHTML = '<select></select>';
			var target = fixture.querySelector('select');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should match <textarea>', function () {
			fixture.innerHTML = '<textarea></textarea>';
			var target = fixture.querySelector('textarea');
			assert.isTrue(checks['color-contrast'].matches(target));
		});

		it('should not match <option>', function () {
			fixture.innerHTML = '<select><option>hi</option></select>';
			var target = fixture.querySelector('option');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match inputs that are disabled', function () {
			fixture.innerHTML = '<input type="text" disabled>';
			var target = fixture.querySelector('input');
			assert.isFalse(checks['color-contrast'].matches(target));

		});

		it('should not match <textarea disabled>', function () {
			fixture.innerHTML = '<textarea disabled></textarea>';
			var target = fixture.querySelector('textarea');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match <select> with options', function () {
			fixture.innerHTML = '<select disabled><option>Hello</option></select>';
			var target = fixture.querySelector('select');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should match <button>', function () {
			fixture.innerHTML = '<button>hi</button>';
			var target = fixture.querySelector('button');
			assert.isTrue(checks['color-contrast'].matches(target));
		});

		it('should not match <button disabled>', function () {
			fixture.innerHTML = '<button disabled>hi</button>';
			var target = fixture.querySelector('button');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match <input type=image>', function () {
			fixture.innerHTML = '<input type="image">';
			var target = fixture.querySelector('input');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match a disabled input\'s label - explicit label', function () {
			fixture.innerHTML = '<label for="t1">Test</label><input type="text" id="t1" disabled>';
			var target = fixture.querySelector('label');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match a disabled input\'s label - implicit label (input)', function () {
			fixture.innerHTML = '<label>Test<input type="text" disabled></label>';
			var target = fixture.querySelector('label');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match a disabled input\'s label - implicit label (textarea)', function () {
			fixture.innerHTML = '<label>Test<textarea disabled>Hi</textarea></label>';
			var target = fixture.querySelector('label');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match a disabled input\'s label - implicit label (select)', function () {
			fixture.innerHTML = '<label>Test<select disabled><option>Test</option></select></label>';
			var target = fixture.querySelector('label');
			assert.isFalse(checks['color-contrast'].matches(target));
		});

		it('should not match a disabled input\'s label - aria-labelledby', function () {
			fixture.innerHTML = '<div id="t1">Test</div><input type="text" aria-labelledby="bob t1 fred" disabled>';
			var target = fixture.querySelector('div');
			assert.isFalse(checks['color-contrast'].matches(target));
		});
	});

});
