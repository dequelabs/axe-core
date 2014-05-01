(function (global) {
	'use strict';

	var checks = {};
	checks['aria-label'] = {
		fn: function (node) {
			var label = node.getAttribute('aria-label');
			return !!label;
		}
	};

	checks['aria-labelledby'] = {
		fn: function (node) {
			var result = felib.dom.idrefs(node, 'aria-labelledby');
			return result.indexOf(null) === -1 && !!result.length;
		}
	};

	checks['implicit-label'] = {
		fn: function (node) {
			var label = felib.dom.findUp(node, 'label');
			return label !== null;
		}
	};

	checks['explicit-label'] = {
		selector: '[id]',
		fn: function (node) {
			var label = document.querySelector('label[for="' + node.id + '"]');
			return label !== null;
		}
	};

	checks['aria-hidden'] = {
		fn: function (node) {
			var result = false;
			if (node.getAttribute('aria-hidden') === 'true') {
				result = true;
			} else {
				result = felib.dom.findUp(node, '[aria-hidden="true"]') !== null;
			}

			return result;
		}
	};

	checks['hidden'] = {
		fn: function (node) {
			return felib.dom.isVisible(node, true);
		}
	};

	checks['title-only'] = {
		result: 'WARN',
		fn: function (node) {
			var labelText = felib.getLabelText(node);
			return !labelText && (node.getAttribute('title') || node.getAttribute('aria-describedby'));
		}
	};

	checks['help-same-as-label'] = {
		result: 'WARN',
		fn: function (node) {
			var labelText = felib.getLabelText(node),
				check = node.getAttribute('title');
			if (!labelText)
				return false;

			if (!check) {

				if (node.getAttribute('aria-describedby')) {
					var ref = felib.dom.idrefs(node, 'aria-describedby');
					check = ref.map(function (thing) {
						return thing ? felib.text.visible(thing, true) : '';
					}).join('');
				}
			}

			return felib.text.sanitize(check) === felib.text.sanitize(labelText);
		}
	};

	checks['type-hidden'] = {
		selector: 'input',
		fn: function (node) {
			return node.getAttribute('type') === 'hidden';
		}
	};

	checks['img-has-alt'] = {
		selector: 'img',
		fn: function (node) {
			return node.hasAttribute('alt');
		}
	};

	checks['input-img-has-alt'] = {
		selector: 'input[type="image"]',
		fn: function (node) {
			return !!node.getAttribute('alt');
		}
	};

	checks['img-role-presentation'] = {
		selector: 'img',
		fn: function (node) {
			return node.getAttribute('role') === 'presentation';
		}
	};

	checks['has-lang'] = {
		selector: 'html',
		fn: function (node) {
			return !!node.lang;
		}
	};

	checks['lang-not-en'] = {
		selector: '[lang]',
		fn: function (node) {
			return node.lang !== 'en';
		}
	};

	checks['has-title'] = {
		selector: 'html',
		fn: function (node) {
			return !!node.ownerDocument.title;
		}
	};

	checks['deprecated'] = {
		result: 'FAIL',
		fn: function () {
			return true;
		}
	};

	checks['input-button-value'] = {
		selector: 'input[type="button"]',
		fn: function (node) {
			return node.getAttribute('value');
		}
	};

	checks['button-text'] = {
		selector: 'button, [role="button"]',
		fn: function (node) {
			var txt = felib.text.visible(node, true);
			return txt.length > 0;
		}
	};
	var rules = [{
			id: 'gimmeLabel',
			selector: 'input:not([type="hidden"]):not([type="image"]):not([type="button"]):not([type="submit"]):not([type="reset"]), select, textarea',
			checks: ['aria-label', 'aria-labelledby', 'implicit-label', 'explicit-label', 'aria-hidden',
				'title-only', 'help-same-as-label']
		}, {
			id: 'ariaLabels',
			selector: '[role="textbox"]',
			checks: ['aria-label', 'aria-labelledby', 'implicit-label', 'explicit-label', 'aria-hidden',
				'title-only', 'help-same-as-label']
		}, {
			id: 'altAttribute',
			selector: 'img, input[type="image"]',
			checks: ['img-has-alt', 'input-img-has-alt', 'img-role-presentation']
		}, {
			id: 'docLanguage',
			selector: 'html',
			checks: ['has-lang', 'lang-not-en']
		}, {
			id: 'docTitle',
			selector: 'html',
			checks: ['has-title']
		}, {
			id: 'idkStuff',
			selector: 'input[type="button"], button, [role="button"]',
			checks: ['input-button-value', 'button-text', 'aria-label', 'aria-labelledby']
		}, {
			id: 'blinky',
			selector: 'blink',
			checks: ['deprecated']
		}];

	var mockRules = rules.map(function (rule) {
		rule.checks = rule.checks.map(function (check) {
			if (!checks[check]) throw new Error('check ' + check + ' not found');
			checks[check].id = check;
			return checks[check];
		});

		return rule;
	});

	global.mockAudit = {
		id: 'wcag2aa',
		rules: mockRules
	};

}(this));