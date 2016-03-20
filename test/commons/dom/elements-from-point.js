describe('dom.elementsFromPoint', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
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

		if (axe.commons.dom.supportsElementsFromPoint(document)) {
			var visualParents = axe.commons.dom.elementsFromPoint(document,
															Math.ceil(rect.left + 1),
															Math.ceil(rect.top + 1));
			assert.deepEqual(visualParents.slice(0, 3), [target, pos, container]);
		}
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

		if (axe.commons.dom.supportsElementsFromPoint(document)) {
			var visualParents = axe.commons.dom.elementsFromPoint(document,
															Math.ceil(rect.left + 1),
															Math.ceil(rect.top + 1));
			assert.deepEqual(visualParents.slice(0, 3), [target, pos, container]);
		}
	});

	it('should return normal flow elements properly', function () {
		fixture.innerHTML = '<div id="parent" style="background-color: rgba(0, 128, 0, 0.5); height: 40px; width: 30px;">' +
			'<div id="target" style="background-color: rgba(0, 128, 0, 0.5); height: 20px; width: 15px;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		var parent = fixture.querySelector('#parent');

		target.scrollIntoView();
		var rect = target.getBoundingClientRect();

		if (axe.commons.dom.supportsElementsFromPoint(document)) {
			var visualParents = axe.commons.dom.elementsFromPoint(document, Math.ceil(rect.left), Math.ceil(rect.top));
			assert.deepEqual(visualParents.slice(0, 3), [target, parent, fixture]);
		}
	});

	it('should use msElementsFromPoint if defined', function () {
		fixture.innerHTML = '<div id="parent" style="height: 40px; width: 30px;">' +
			'<div id="target" style="height: 20px; width: 15px;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');

		target.scrollIntoView();
		var rect = target.getBoundingClientRect();
		var visualParents = null;

		if (axe.commons.dom.supportsElementsFromPoint(document)) {
			if (!document.msElementsFromPoint) {
				document.msElementsFromPoint = function () {
					return ['a', 'b', 'c'];
				};
				visualParents = axe.commons.dom.elementsFromPoint(document, Math.ceil(rect.left), Math.ceil(rect.top));
				delete document.msElementsFromPoint;
				assert.deepEqual(visualParents.slice(0, 3), ['a', 'b', 'c']);
			}
		}
	});

});
