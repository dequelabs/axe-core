describe('forms.isNativeTextbox', function() {
	'use strict';
	var isNativeTextbox = axe.commons.forms.isNativeTextbox;

	it('returns true for a text inputs', function() {
		var textInputs = [
			'date',
			'datetime',
			'datetime-local',
			'email',
			'month',
			'number',
			'range',
			'search',
			'tel',
			'text',
			'time',
			'url',
			'week'
		];
		textInputs.forEach(function(type) {
			var node = document.createElement('input');
			node.setAttribute('type', type);
			assert.isTrue(
				isNativeTextbox(node),
				'<input type="' + type + '"> is a native text input'
			);
		});
	});

	it('returns true for a textarea element', function() {
		var node = document.createElement('textarea');
		assert.isTrue(isNativeTextbox(node));
	});

	it('returns false for non-text inputs', function() {
		var nonTextInputs = [
			'button',
			'checkbox',
			'file',
			'hidden',
			'image',
			'password',
			'radio',
			'reset',
			'submit',
			'color'
		];
		nonTextInputs.forEach(function(type) {
			var node = document.createElement('input');
			node.setAttribute('type', type);

			// IE doesn't support color inputs
			if (node.type !== 'text') {
				assert.isFalse(
					isNativeTextbox(node),
					'<input type="' + type + '"> is not a native text input'
				);
			}
		});
	});

	it('return false for aria textbox elements', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'textbox');
		assert.isFalse(isNativeTextbox(node));
	});
});
