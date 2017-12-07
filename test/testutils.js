var testUtils = {};

/**
 * Create a check context for mocking/resetting data and relatedNodes in tests
 *
 * @return Object
 */
testUtils.MockCheckContext = function () {
	'use strict';
	return {
		_relatedNodes: [],
		_data: null,
		data: function (d) {
			this._data = d;
		},
		relatedNodes: function (rn) {
			this._relatedNodes = rn;
		},
		reset: function () {
			this._data = null;
			this._relatedNodes = [];
		}
	};
};

/**
 * Method for injecting content into a fixture
 *
 * @param Node|String 	Stuff to go into the fixture (html or DOM node)
 * @return HTMLElement
 */
testUtils.fixtureSetup = function (content) {
	'use strict';
	var fixture = document.querySelector('#fixture');
	if (typeof content === 'string') {
		fixture.innerHTML = content;
	} else if (content instanceof Node) {
		fixture.appendChild(content);
	}
	return fixture;
};

axe.testUtils = testUtils;
