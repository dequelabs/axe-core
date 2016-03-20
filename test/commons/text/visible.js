describe('text.visible', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});

	describe('non-screen-reader', function () {
		it('should not return elements with visibility: hidden', function () {
			fixture.innerHTML = 'Hello<span style="visibility: hidden;">Hi</span>';

			assert.equal(axe.commons.text.visible(fixture), 'Hello');
		});

		it('should handle implicitly recursive calls', function () {
			fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
			assert.equal(axe.commons.text.visible(fixture), 'HelloHi');
		});

		it('should handle explicitly recursive calls', function () {
			fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
			assert.equal(axe.commons.text.visible(fixture, null, false), 'HelloHi');
		});

		it('should handle non-recursive calls', function () {
			fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
			assert.equal(axe.commons.text.visible(fixture, null, true), 'Hello');
		});

		it('should know how visibility works', function () {
			fixture.innerHTML = 'Hello <span style="visibility: hidden;">' +
					'<span style="visibility: visible;">Hi</span>' +
				'</span>';

			assert.equal(axe.commons.text.visible(fixture), 'Hello Hi');
		});

		it('should not return elements with display: none', function () {
			fixture.innerHTML = 'Hello<span style="display: none;"><span>Hi</span></span>';

			assert.equal(axe.commons.text.visible(fixture), 'Hello');
		});

		it('should trim the result', function () {
			fixture.innerHTML = '   &nbsp;\u00A0    Hello  &nbsp;\r\n   Hi     \n \n &nbsp; \n   ';
			assert.equal(axe.commons.text.visible(fixture), 'Hello Hi');
		});

		it('should ignore script and style tags', function () {
			fixture.innerHTML = '<script> // hello </script><style> /*hello */</style>' +
				'Hello';

			assert.equal(axe.commons.text.visible(fixture), 'Hello');
		});


		it('should not take into account position of parents', function () {
			fixture.innerHTML = '<div style="position: absolute; top: -9999px;">' +
					'<div style="position: absolute; top: 10000px;">Hello</div>' +
				'</div>';

			assert.equal(axe.commons.text.visible(fixture), 'Hello');

		});

	});

	describe('screen reader', function () {
		it('should not return elements with visibility: hidden', function () {
			fixture.innerHTML = 'Hello<span style="visibility: hidden;">Hi</span>';

			assert.equal(axe.commons.text.visible(fixture, true), 'Hello');
		});

		it('should know how visibility works', function () {
			fixture.innerHTML = 'Hello <span style="visibility: hidden;">' +
					'<span style="visibility: visible;">Hi</span>' +
				'</span>';

			assert.equal(axe.commons.text.visible(fixture, true), 'Hello Hi');
		});


		it('should not return elements with display: none', function () {
			fixture.innerHTML = 'Hello<span style="display: none;"><span>Hi</span></span>';

			assert.equal(axe.commons.text.visible(fixture, true), 'Hello');
		});

		it('should trim the result', function () {
			fixture.innerHTML = '   &nbsp;\u00A0    Hello  &nbsp;\r\n   Hi     \n \n &nbsp; \n   ';
			assert.equal(axe.commons.text.visible(fixture, true), 'Hello Hi');
		});

		it('should ignore script and style tags', function () {
			fixture.innerHTML = '<script> // hello </script><style> /*hello */</style>' +
				'Hello';

			assert.equal(axe.commons.text.visible(fixture, true), 'Hello');
		});


		it('should not consider offscreen text as hidden (position)', function () {
			fixture.innerHTML = '<div style="position: absolute; top: -9999px;">' +
					'<div>Hello</div>' +
				'</div>';

			assert.equal(axe.commons.text.visible(fixture, true), 'Hello');

		});


		it('should not consider offscreen text as hidden (text-indent)', function () {
			fixture.innerHTML = '<div style="text-indent: -9999px;">' +
					'Hello</div>';

			assert.equal(axe.commons.text.visible(fixture, true), 'Hello');

		});
	});


});
