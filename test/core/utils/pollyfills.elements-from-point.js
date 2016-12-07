describe('document.elementsFromPoint pollyfills', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});

	it('ensures document.elementsFromPoint is always there', function () {
		assert.isFunction(document.elementsFromPoint);
	});

	it('returns document.elementsFromPoint if it is set', function () {
		var orig = document.elementsFromPoint;
		document.elementsFromPoint = function () {
			return 123;
		};

		var elmFromPt = axe.utils.pollyfillElementsFromPoint();
		assert.equal(elmFromPt(), 123);
		document.elementsFromPoint = orig;
	});

	it('returns document.msElementsFromPoint if elementsFromPoint is undefined', function () {
		var orig = document.elementsFromPoint;
		var msOrig = document.msElementsFromPoint;

		document.elementsFromPoint = undefined;
		document.msElementsFromPoint = function () {
			return 123;
		};

		var elmFromPt = axe.utils.pollyfillElementsFromPoint();
		assert.equal(elmFromPt(), 123);

		document.elementsFromPoint = orig;
		document.msElementsFromPoint = msOrig;
	});

	it('returns the pollyfill no native function is available', function () {
		var orig = document.elementsFromPoint;
		var msOrig = document.msElementsFromPoint;

		document.elementsFromPoint = undefined;
		document.msElementsFromPoint = undefined;

		var elmFromPt = axe.utils.pollyfillElementsFromPoint();
		assert.isFunction(elmFromPt);

		document.elementsFromPoint = orig;
		document.msElementsFromPoint = msOrig;
	});

	describe('pollyfill function', function () {
		var orig, msOrig;
		before(function () {
			orig = document.elementsFromPoint;
			msOrig = document.msElementsFromPoint;

			document.elementsFromPoint = undefined;
			document.msElementsFromPoint = undefined;

			document.elementsFromPoint = axe.utils.pollyfillElementsFromPoint();
		});
		
		after(function () {
			document.elementsFromPoint = orig;
			document.msElementsFromPoint = msOrig;
		});

		it('should return positioned elements properly', function () {
			fixture.innerHTML = '<div id="container" style="position: absolute; top: 0px; left: 0px; height: 100px; ' +
				'width: 90px; background-color: rgba(0, 128, 0, 0.5);">' +
				'<div id="pos" style="position: absolute; top: 50px; left: 40px; height: 40px; ' +
				'width: 30px; background-color: rgba(0, 128, 0, 0.5);"></div>' +
				'<div id="parent" style="position: absolute; top: 0px; left: 0px; height: 40px; ' +
				'width: 30px; background-color: rgba(0, 128, 0, 0.5);">' +
				'<div id="target" style="position: absolute; top: 60px; left: 45px; height: 20px; ' +
				'width: 15px; background-color: rgba(0, 128, 0, 0.5);">' +
				'</div></div></div>';
			var target = fixture.querySelector('#target');
			var pos = fixture.querySelector('#pos');
			var container = fixture.querySelector('#container');

			target.scrollIntoView();
			var rect = target.getBoundingClientRect();

			var visualParents = document.elementsFromPoint(
				Math.ceil(rect.left + 1),
				Math.ceil(rect.top + 1)
			);
			assert.deepEqual(visualParents.slice(0, 3), [target, pos, container]);
		});

		it('should return inline elements properly', function () {
			fixture.innerHTML = '<div id="container" style="position: absolute; top: 0px; left: 0px; height: 100px; ' +
				'width: 90px; background-color: rgba(0, 128, 0, 0.5);">' +
				'<span id="pos" style="position: absolute; top: 60px; left: 45px;' +
				'background-color: rgba(0, 128, 0, 0.5);">Text goes here</span>' +
				'<span id="parent" style="position: absolute; top: 0px; left: 0px;' +
				'background-color: rgba(0, 128, 0, 0.5);">' +
				'<span id="target" style="position: absolute; top: 60px; left: 45px;' +
				'background-color: rgba(0, 128, 0, 0.5);">Text goes here' +
				'</span></span></div>';
			var target = fixture.querySelector('#target');
			var pos = fixture.querySelector('#pos');
			var container = fixture.querySelector('#container');

			target.scrollIntoView();
			var rect = target.getBoundingClientRect();

			var visualParents = document.elementsFromPoint(
				Math.ceil(rect.left + 1),
				Math.ceil(rect.top + 1)
			);
			assert.deepEqual(visualParents.slice(0, 3), [target, pos, container]);
		});

		it('should return normal flow elements properly', function () {
			fixture.innerHTML = '<div id="parent" style="background-color: rgba(0, 128, 0, 0.5); height: 40px; width: 30px;">' +
				'<div id="target" style="background-color: rgba(0, 128, 0, 0.5); height: 20px; width: 15px;">' +
				'</div></div>';
			var target = fixture.querySelector('#target');
			var parent = fixture.querySelector('#parent');

			target.scrollIntoView();
			var rect = target.getBoundingClientRect();

			var visualParents = document.elementsFromPoint(Math.ceil(rect.left), Math.ceil(rect.top));
			assert.deepEqual(visualParents.slice(0, 3), [target, parent, fixture]);
		});

		it('returns elements with negative z-index after the body', function () {
			fixture.innerHTML = '<div id="target" style="z-index:-1; position:absolute;">Target!</div>' +
				'<div id="sibling">Some text</div>';
			var target = fixture.querySelector('#target');

			target.scrollIntoView();
			var rect = target.getBoundingClientRect();

			var visualParents = document.elementsFromPoint(Math.ceil(rect.left), Math.ceil(rect.top));

			// Last two element should be: body, target (due to z-index:-1), html
			assert.deepEqual(visualParents.slice(-3), [document.body, target, document.documentElement]);
		});

	});

});
