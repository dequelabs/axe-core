describe('color-contrast-matches', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var rule;

	beforeEach(function () {
		rule = axe._audit.rules.find(function (rule) {
			return rule.id === 'color-contrast';
		});
	});

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('is a function', function () {
		assert.isFunction(rule.matches);
	});

	it('should not match when there is no text', function () {
		fixture.innerHTML = '<div style="color: yellow; background-color: white;" id="target">' +
			' </div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(rule.matches(target));
	});

	it('should match when there is text', function () {
		fixture.innerHTML = '<div style="color: yellow; background-color: white;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(rule.matches(target));
	});

	it('should not match when there is text that is out of the container', function () {
		fixture.innerHTML = '<div style="color: yellow; text-indent: -9999px; background-color: white;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(rule.matches(target));
	});

	it('should not match when there is text that is out of the container with overflow hidden', function () {
		fixture.innerHTML = '<div style="color: yellow; width: 100px; overflow: hidden; text-indent: 200px; background-color: white;" id="target">' +
			'text</div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(rule.matches(target));
	});

	it('should match when there is text that is in the scroll reach of container', function () {
		fixture.innerHTML = '<div style="color: yellow; width: 100px; overflow: scroll; text-indent: 200px; background-color: white;" id="target">' +
			'text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(rule.matches(target));
	});

	it('should match when there is text that is only partially out of the container', function () {
		fixture.innerHTML = '<div style="color: yellow; text-indent: -20px; background-color: white;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(rule.matches(target));
	});

	it('should match <input type="text">', function () {
		fixture.innerHTML = '<input type="text">';
		var target = fixture.querySelector('input');
		assert.isTrue(rule.matches(target));
	});

	it('should not match <input type="hidden">', function () {
		fixture.innerHTML = '<input type="hidden">';
		var target = fixture.querySelector('input');
		assert.isFalse(rule.matches(target));
	});

	it('should not match <input type="checkbox">', function () {
		fixture.innerHTML = '<input type="checkbox">';
		var target = fixture.querySelector('input');
		assert.isFalse(rule.matches(target));
	});

	it('should not match <input type="radio">', function () {
		fixture.innerHTML = '<input type="radio">';
		var target = fixture.querySelector('input');
		assert.isFalse(rule.matches(target));
	});

	it('should not match <input type="color">', function () {
		fixture.innerHTML = '<input type="color">';
		var target = fixture.querySelector('input');
		// Some browsers will fallback to type=text for unknown input types (looking at you IE)
		if (target.type === 'color') {
			assert.isFalse(rule.matches(target));
		}
	});

	it('should not match <input type="range">', function () {
		fixture.innerHTML = '<input type="range">';
		var target = fixture.querySelector('input');
		// Some browsers will fallback to type=text for unknown input types (looking at you IE)
		if (target.type === 'range') {
			assert.isFalse(rule.matches(target));
		}
	});

	it('should match <select> with options', function () {
		fixture.innerHTML = '<select><option>Hello</option></select>';
		var target = fixture.querySelector('select');
		assert.isTrue(rule.matches(target));
	});

	it('should not match <select> with no options', function () {
		fixture.innerHTML = '<select></select>';
		var target = fixture.querySelector('select');
		assert.isFalse(rule.matches(target));
	});

	it('should match <textarea>', function () {
		fixture.innerHTML = '<textarea></textarea>';
		var target = fixture.querySelector('textarea');
		assert.isTrue(rule.matches(target));
	});

	it('should not match <option>', function () {
		fixture.innerHTML = '<select><option>hi</option></select>';
		var target = fixture.querySelector('option');
		assert.isFalse(rule.matches(target));
	});

	it('should not match inputs that are disabled', function () {
		fixture.innerHTML = '<input type="text" disabled>';
		var target = fixture.querySelector('input');
		assert.isFalse(rule.matches(target));

	});

	it('should not match <textarea disabled>', function () {
		fixture.innerHTML = '<textarea disabled></textarea>';
		var target = fixture.querySelector('textarea');
		assert.isFalse(rule.matches(target));
	});

	it('should not match <select> with options', function () {
		fixture.innerHTML = '<select disabled><option>Hello</option></select>';
		var target = fixture.querySelector('select');
		assert.isFalse(rule.matches(target));
	});

	it('should match <button>', function () {
		fixture.innerHTML = '<button>hi</button>';
		var target = fixture.querySelector('button');
		assert.isTrue(rule.matches(target));
	});

	it('should not match <button disabled>', function () {
		fixture.innerHTML = '<button disabled>hi</button>';
		var target = fixture.querySelector('button');
		assert.isFalse(rule.matches(target));
	});

	it('should not match <button disabled><span></span></button>', function () {
		fixture.innerHTML = '<button disabled><span>Hi</span></button>';
		var target = fixture.querySelector('button');
		assert.isFalse(rule.matches(target.querySelector('span')));
	});

	it('should not match <button disabled><span><i></i></span></button>', function () {
		fixture.innerHTML = '<button disabled><span><i>Hi</i></span></button>';
		var target = fixture.querySelector('button');
		assert.isFalse(rule.matches(target.querySelector('i')));
	});

	it('should not match <input type=image>', function () {
		fixture.innerHTML = '<input type="image">';
		var target = fixture.querySelector('input');
		assert.isFalse(rule.matches(target));
	});

	it('should not match a disabled input\'s label - explicit label', function () {
		fixture.innerHTML = '<label for="t1">Test</label><input type="text" id="t1" disabled>';
		var target = fixture.querySelector('label');
		assert.isFalse(rule.matches(target));
	});

	it('should not match a disabled input\'s label - implicit label (input)', function () {
		fixture.innerHTML = '<label>Test<input type="text" disabled></label>';
		var target = fixture.querySelector('label');
		assert.isFalse(rule.matches(target));
	});

	it('should not match a disabled input\'s label - implicit label (textarea)', function () {
		fixture.innerHTML = '<label>Test<textarea disabled>Hi</textarea></label>';
		var target = fixture.querySelector('label');
		assert.isFalse(rule.matches(target));
	});

	it('should not match a disabled input\'s label - implicit label (select)', function () {
		fixture.innerHTML = '<label>Test<select disabled><option>Test</option></select></label>';
		var target = fixture.querySelector('label');
		assert.isFalse(rule.matches(target));
	});

	it('should not match a disabled input\'s label - aria-labelledby', function () {
		fixture.innerHTML = '<div id="t1">Test</div><input type="text" aria-labelledby="bob t1 fred" disabled>';
		var target = fixture.querySelector('div');
		assert.isFalse(rule.matches(target));
	});

	it('should not match aria-disabled=true', function () {
		fixture.innerHTML = '<div aria-disabled="true">hi</div>';
		var target = fixture.querySelector('div');
		assert.isFalse(rule.matches(target));
	});

	it('should not match a descendant of aria-disabled=true', function () {
		fixture.innerHTML = '<div aria-disabled="true"><span>hi</span></div>';
		var target = fixture.querySelector('span');
		assert.isFalse(rule.matches(target));
	});

	it('should not match a descendant of a disabled fieldset', function () {
		fixture.innerHTML = '<fieldset disabled><label>hi <input type="checkbox"></label></fieldset>';
		var target = fixture.querySelector('label');
		assert.isFalse(rule.matches(target));
	});

	it('should not match a descendant of an explicit label for a disabled input', function () {
		fixture.innerHTML = '<input id="input" type="checkbox" disabled><label for="input"><span>hi</span></label>';
		var target = fixture.querySelector('span');
		assert.isFalse(rule.matches(target));
	});

	it('should not match a descendant of an implicit label for a disabled input', function () {
		fixture.innerHTML = '<label for="input"><span>hi</span><input id="input" type="checkbox" disabled></label>';
		var target = fixture.querySelector('span');
		assert.isFalse(rule.matches(target));
	});
});