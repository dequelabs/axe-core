describe('utils.matchesSelector', function () {
	'use strict';
	var matchesSelector = axe.utils.matchesSelector;

	function mockMethod(method, returnValue) {
		var result = {};
		result[method] = function () {
			return returnValue;
		};
		result.ownerDocument = {
			defaultView: {
				Element: {
					prototype: {}
				}
			}
		};
		result.ownerDocument.defaultView.Element.prototype[method] = function () {};

		return result;
	}


	it('should check the prototype of the Element object for matching methods', function () {

		assert.equal(matchesSelector(mockMethod('matches', 'test1')), 'test1');
		assert.equal(matchesSelector(mockMethod('matchesSelector', 'test2')), 'test2');
		assert.equal(matchesSelector(mockMethod('mozMatchesSelector', 'test3')), 'test3');
		assert.equal(matchesSelector(mockMethod('webkitMatchesSelector', 'test4')), 'test4');
		assert.equal(matchesSelector(mockMethod('msMatchesSelector', 'test5')), 'test5');

	});

	it('should actually work', function () {
		var target,
			fixture = document.getElementById('fixture');

		fixture.innerHTML = '<div id="test">Hi</div>';
		target = document.getElementById('test');
		assert.ok(matchesSelector(target, '#test'));

		fixture.innerHTML = '';
	});


});
