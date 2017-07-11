var testUtils = {};

testUtils.shadowSupport = (function(document) {
	'use strict';
	var v0 = document.body && typeof document.body.createShadowRoot === 'function',
			v1 = document.body && typeof document.body.attachShadow === 'function';

	return {
		v0: (v0 === true),
		v1: (v1 === true),
		undefined: (
			document.body && typeof document.body.attachShadow === 'undefined' &&
			typeof document.body.createShadowRoot === 'undefined'
		)
	};

})(document);

testUtils.fixtureSetup = function (content) {
	'use strict';
	var fixture = document.querySelector('#fixture');
	if (typeof content === 'string') {
		fixture.innerHTML = content;
	} else if (content instanceof Node) {
		fixture.appendChild(content);
	}
	axe._tree = axe.utils.getFlattenedTree(fixture);
	return fixture;
};

testUtils.checkSetup = function (content, options, target) {
	'use strict';
	var fixture = testUtils.fixtureSetup(content, target);
	var node = fixture.querySelector(target || '#target');
	var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
	return [virtualNode.actualNode, options, virtualNode];
};

axe.testUtils = testUtils;