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

		if (kslib.dom.supportsElementsFromPoint(target.ownerDocument)) {
			var visualParents = kslib.dom.elementsFromPoint(target.ownerDocument,
															Math.ceil(rect.left + 1),
															Math.ceil(rect.top + 1));
			assert.deepEqual(visualParents.slice(0, 3), [target, pos, container]);
		}
	});

	it('should work for this weird thing', function () {
		fixture.innerHTML = '<div id="whitediv" style="background:#fff">' +
	'<div id="bg" style="background: transparent url(data:image/gif;base64,R0lGODlhKAAyAKIHAElGRsxmZmZmZplmMzMzM//MmcyZZv///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1Y2NjNDZmNC0wZmIxLTc5NDgtODQyMy1hOWRjZTM5NTFmMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTI5NUJGREExNzJFMTFFNEI2RUJEQzJEMjBCMTBCRDEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTI5NUJGRDkxNzJFMTFFNEI2RUJEQzJEMjBCMTBCRDEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmRkOTk3NTE3LTUxYWQtN2E0Ni04MTY4LTM5NGVlY2RjYmVlNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1Y2NjNDZmNC0wZmIxLTc5NDgtODQyMy1hOWRjZTM5NTFmMjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94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)">' + 
		'<a id="linky" href="#">' +
			'<span id="target" style="color: #fff; display: block">Im not visible</span>' +
		'</a></div></div>';
		var target = fixture.querySelector('#target');
		var linky = fixture.querySelector('#linky');
		var bg = fixture.querySelector('#bg');
		var whitediv = fixture.querySelector('#whitediv');
		target.scrollIntoView();
		var rect = target.getBoundingClientRect();

		if (kslib.dom.supportsElementsFromPoint(target.ownerDocument)) {
			var visualParents = kslib.dom.elementsFromPoint(target.ownerDocument,
															Math.ceil(rect.left + 1),
															Math.ceil(rect.top + 1));
			assert.deepEqual(visualParents.slice(0, 4), [target, linky, bg, whitediv]);
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

		if (kslib.dom.supportsElementsFromPoint(target.ownerDocument)) {
			var visualParents = kslib.dom.elementsFromPoint(target.ownerDocument,
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

		if (kslib.dom.supportsElementsFromPoint(target.ownerDocument)) {
			var visualParents = kslib.dom.elementsFromPoint(target.ownerDocument, Math.ceil(rect.left), Math.ceil(rect.top));
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

		if (kslib.dom.supportsElementsFromPoint(target.ownerDocument)) {
			if (!target.ownerDocument.msElementsFromPoint) {
				target.ownerDocument.msElementsFromPoint = function () {
					return ['a', 'b', 'c'];
				};
				visualParents = kslib.dom.elementsFromPoint(target.ownerDocument, Math.ceil(rect.left), Math.ceil(rect.top));
				delete target.ownerDocument.msElementsFromPoint;
				assert.deepEqual(visualParents.slice(0, 3), ['a', 'b', 'c']);
			}
		}
	});

});
