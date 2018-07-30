describe('page-no-duplicate', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = new axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	var check = checks['page-no-duplicate-main'];

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	describe('options.selector', function() {
		it('throws if there is no selector', function() {
			assert.throws(function() {
				var params = checkSetup('<div id="target"></div>', undefined);
				assert.isFalse(check.evaluate.apply(checkContext, params));
			});
		});

		it('should return false if there is more than one element matching the selector', function() {
			var options = { selector: 'main' };
			var params = checkSetup(
				'<div id="target"><main></main><main></main></div>',
				options
			);

			assert.isFalse(check.evaluate.apply(checkContext, params));
			assert.deepEqual(
				checkContext._relatedNodes,
				Array.from(fixture.querySelectorAll('main'))
			);
		});

		it('should return true if there is only one element matching the selector', function() {
			var options = { selector: 'main' };
			var params = checkSetup('<div role="main" id="target"></div>', options);
			assert.isTrue(check.evaluate.apply(checkContext, params));
		});

		it('should return true if there are no element matching the selector', function() {
			var options = { selector: 'footer' };
			var params = checkSetup(
				'<div id="target"><main></main><main></main></div>',
				options
			);
			assert.isTrue(check.evaluate.apply(checkContext, params));
		});

		(shadowSupported ? it : xit)(
			'should return false if there is a second matching element inside the shadow dom',
			function() {
				var options = { selector: 'main' };
				var div = document.createElement('div');
				div.innerHTML = '<div id="shadow"></div><main></main>';

				var shadow = div
					.querySelector('#shadow')
					.attachShadow({ mode: 'open' });
				shadow.innerHTML = '<main></main>';
				axe.testUtils.fixtureSetup(div);

				assert.isFalse(
					check.evaluate.call(checkContext, fixture, options, axe._tree[0])
				);
				assert.deepEqual(checkContext._relatedNodes, [
					shadow.querySelector('main'),
					div.querySelector('main')
				]);
			}
		);
	});

	describe('option.nativeScopeFilter', function() {
		it('should ignore element contained in a nativeScopeFilter match', function() {
			var options = {
				selector: 'footer',
				nativeScopeFilter: 'main'
			};
			var params = checkSetup(
				'<div id="target"><footer></footer>' +
					'<main><footer></footer></main>' +
					'</div>',
				options
			);
			assert.isTrue(check.evaluate.apply(checkContext, params));
		});

		it('should not ignore element contained in a nativeScopeFilter match with their roles redefined', function() {
			var options = {
				selector: 'footer, [role="contentinfo"]',
				nativeScopeFilter: 'main'
			};
			var params = checkSetup(
				'<div id="target"><footer></footer>' +
					'<main><div role="contentinfo"></div></main>' +
					'</div>',
				options
			);
			assert.isFalse(check.evaluate.apply(checkContext, params));
		});

		(shadowSupported ? it : xit)(
			'elements if its ancestor is outside the shadow DOM tree',
			function() {
				var options = {
					selector: 'footer',
					nativeScopeFilter: 'main'
				};

				var div = document.createElement('div');
				div.innerHTML = '<main id="shadow"></main><footer></footer>';
				div.querySelector('#shadow').attachShadow({ mode: 'open' }).innerHTML =
					'<footer></footer>';
				axe.testUtils.fixtureSetup(div);

				assert.isTrue(
					check.evaluate.call(checkContext, fixture, options, axe._tree[0])
				);
			}
		);
	});
});
