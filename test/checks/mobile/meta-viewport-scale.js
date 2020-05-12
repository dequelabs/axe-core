describe('meta-viewport', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});
	describe('; separator', function() {
		it('should return false on user-scalable=no', function() {
			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, cats=dogs, user-scalable=no">';
			var node = fixture.querySelector('meta');

			assert.isFalse(
				axe.testUtils.getCheckEvaluate('meta-viewport').call(checkContext, node)
			);
			assert.deepEqual(checkContext._data, 'user-scalable=no');
		});

		it('should return false on user-scalable=no', function() {
			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, cats=dogs, user-scalable=no, more-stuff=ok">';
			var node = fixture.querySelector('meta');

			assert.isFalse(
				axe.testUtils.getCheckEvaluate('meta-viewport').call(checkContext, node)
			);
		});

		it('should return true on user-scalable=yes', function() {
			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, cats=dogs, user-scalable=yes, more-stuff=ok">';
			var node = fixture.querySelector('meta');

			assert.isTrue(axe.testUtils.getCheckEvaluate('meta-viewport')(node));
		});

		it('should return false on maximum-scale=yes (translates to 1)', function() {
			fixture.innerHTML = '<meta name="viewport" content="maximum-scale=yes">';
			var node = fixture.querySelector('meta');
			assert.isFalse(
				axe.testUtils.getCheckEvaluate('meta-viewport').call(checkContext, node)
			);
		});

		it('should return true on negative maximum scale (should be ignored)', function() {
			fixture.innerHTML = '<meta name="viewport" content="maximum-scale=-1">';
			var node = fixture.querySelector('meta');
			assert.isTrue(
				axe.testUtils.getCheckEvaluate('meta-viewport').call(checkContext, node)
			);
		});

		it('should return true if maximum-scale >= options.scaleMinimum', function() {
			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, maximum-scale=5, cats=dogs">';
			var node = fixture.querySelector('meta');

			assert.isTrue(
				axe.testUtils
					.getCheckEvaluate('meta-viewport')
					.call(checkContext, node, {
						scaleMinimum: 2
					})
			);

			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, maximum-scale=3, cats=dogs">';
			node = fixture.querySelector('meta');

			assert.isTrue(
				axe.testUtils.getCheckEvaluate('meta-viewport').call(checkContext, node)
			);
		});

		it('should return false on maximum-scale < options.scaleMinimum', function() {
			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, cats=dogs, user-scalable=yes, maximum-scale=1.5">';
			var node = fixture.querySelector('meta');

			assert.isFalse(
				axe.testUtils
					.getCheckEvaluate('meta-viewport')
					.call(checkContext, node, {
						scaleMinimum: 2
					})
			);
			assert.deepEqual(checkContext._data, 'maximum-scale');
		});

		it('should return true if neither user-scalable or maximum-scale are set', function() {
			fixture.innerHTML = '<meta name="viewport" content="foo=bar, cats=dogs">';
			var node = fixture.querySelector('meta');

			assert.isTrue(
				axe.testUtils.getCheckEvaluate('meta-viewport').call(checkContext, node)
			);
		});
	});

	describe(', separator', function() {
		it('should return false on user-scalable=no', function() {
			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, cats=dogs, user-scalable=no">';
			var node = fixture.querySelector('meta');

			assert.isFalse(
				axe.testUtils.getCheckEvaluate('meta-viewport').call(checkContext, node)
			);
			assert.deepEqual(checkContext._data, 'user-scalable=no');
		});

		it('should return false on user-scalable=no', function() {
			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, cats=dogs, user-scalable=no, more-stuff=ok">';
			var node = fixture.querySelector('meta');

			assert.isFalse(
				axe.testUtils.getCheckEvaluate('meta-viewport').call(checkContext, node)
			);
			assert.deepEqual(checkContext._data, 'user-scalable=no');
		});

		it('should return true on user-scalable=yes', function() {
			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, cats=dogs, user-scalable=yes, more-stuff=ok">';
			var node = fixture.querySelector('meta');

			assert.isTrue(
				axe.testUtils.getCheckEvaluate('meta-viewport').call(checkContext, node)
			);
		});

		it('should return true if maximum-scale >= options.scaleMinimum', function() {
			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, maximum-scale=5, cats=dogs">';
			var node = fixture.querySelector('meta');

			assert.isTrue(
				axe.testUtils.getCheckEvaluate('meta-viewport').call(checkContext, node)
			);

			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, maximum-scale=2, cats=dogs">';
			node = fixture.querySelector('meta');

			assert.isTrue(
				axe.testUtils
					.getCheckEvaluate('meta-viewport')
					.call(checkContext, node, {
						scaleMinimum: 2
					})
			);
		});

		it('should return false on maximum-scale < options.scaleMinimum', function() {
			fixture.innerHTML =
				'<meta name="viewport" content="foo=bar, cats=dogs, user-scalable=yes, maximum-scale=1.5">';
			var node = fixture.querySelector('meta');

			assert.isFalse(
				axe.testUtils
					.getCheckEvaluate('meta-viewport')
					.call(checkContext, node, {
						scaleMinimum: 2
					})
			);
		});

		it('should return true if neither user-scalable or maximum-scale are set', function() {
			fixture.innerHTML = '<meta name="viewport" content="foo=bar, cats=dogs">';
			var node = fixture.querySelector('meta');

			assert.isTrue(
				axe.testUtils.getCheckEvaluate('meta-viewport').call(checkContext, node)
			);
		});
	});
});
