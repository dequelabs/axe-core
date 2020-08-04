describe('Configure Options', function() {
	'use strict';

	afterEach(function() {
		axe.reset();
	});

	describe('Check', function() {
		var target = document.querySelector('#target');
		describe('aria-allowed-attr', function() {
			it('should allow an attribute supplied in options', function(done) {
				target.setAttribute('role', 'separator');
				target.setAttribute('aria-valuenow', '0');

				axe.configure({
					checks: [
						{
							id: 'aria-allowed-attr',
							options: { separator: ['aria-valuenow'] }
						}
					]
				});
				axe.run(
					target,
					{
						runOnly: {
							type: 'rule',
							values: ['aria-allowed-attr']
						}
					},
					function(error, results) {
						assert.lengthOf(results.violations, 0, 'violations');
						done();
					}
				);
			});

			it('should not normalize external check options', function(done) {
				target.setAttribute('lang', 'en');

				axe.configure({
					checks: [
						{
							id: 'dylang',
							options: ['dylan'],
							evaluate:
								'function (node, options) {\n        var lang = (node.getAttribute("lang") || "").trim().toLowerCase();\n        var xmlLang = (node.getAttribute("xml:lang") || "").trim().toLowerCase();\n        var invalid = [];\n        (options || []).forEach(function(cc) {\n          cc = cc.toLowerCase();\n          if (lang && (lang === cc || lang.indexOf(cc.toLowerCase() + "-") === 0)) {\n            lang = null;\n          }\n          if (xmlLang && (xmlLang === cc || xmlLang.indexOf(cc.toLowerCase() + "-") === 0)) {\n            xmlLang = null;\n          }\n        });\n        if (xmlLang) {\n          invalid.push(\'xml:lang="\' + xmlLang + \'"\');\n        }\n        if (lang) {\n          invalid.push(\'lang="\' + lang + \'"\');\n        }\n        if (invalid.length) {\n          this.data(invalid);\n          return true;\n        }\n        return false;\n      }',
							messages: {
								pass: 'Good language',
								fail: 'You mst use the DYLAN language'
							}
						}
					],
					rules: [
						{
							id: 'dylang',
							metadata: {
								description:
									"Ensures lang attributes have the value of 'dylan'",
								help: "lang attribute must have the value of 'dylan'"
							},
							selector: '#target',
							any: [],
							all: [],
							none: ['dylang'],
							tags: ['wcag2aa']
						}
					],
					data: {
						rules: {
							dylang: {
								description:
									"Ensures lang attributes have the value of 'dylan'",
								help: "lang attribute must have the value of 'dylan'"
							}
						}
					}
				});

				axe.run(
					'#target',
					{
						runOnly: {
							type: 'rule',
							values: ['dylang']
						}
					},
					function(err, results) {
						try {
							assert.isNull(err);
							assert.lengthOf(results.violations, 1, 'violations');
							done();
						} catch (e) {
							done(e);
						}
					}
				);
			});
		});

		describe('aria-required-attr', function() {
			it('should report unique attributes when supplied from options', function(done) {
				target.setAttribute('role', 'slider');
				axe.configure({
					checks: [
						{
							id: 'aria-required-attr',
							options: { slider: ['aria-snuggles'] }
						}
					]
				});
				axe.run(
					'#target',
					{
						runOnly: {
							type: 'rule',
							values: ['aria-required-attr']
						}
					},
					function(error, results) {
						assert.lengthOf(results.violations, 1, 'violations');
						assert.sameMembers(results.violations[0].nodes[0].any[0].data, [
							'aria-snuggles'
						]);
						done();
					}
				);
			});
		});
	});

	describe('disableOtherRules', function() {
		it('disables rules that are not in the `rules` array', function(done) {
			axe.configure({
				disableOtherRules: true,
				rules: [
					{
						id: 'html-has-lang',
						enabled: true
					},
					{
						id: 'html-lang-valid',
						enabled: false
					}
				]
			});

			axe.run(function(error, results) {
				assert.isNull(error);
				assert.lengthOf(results.passes, 1, 'passes');
				assert.equal(results.passes[0].id, 'html-has-lang');

				assert.lengthOf(results.violations, 0, 'violations');
				assert.lengthOf(results.incomplete, 0, 'incomplete');
				assert.lengthOf(results.inapplicable, 0, 'inapplicable');
				done();
			});
		});
	});
});
