function setShadowId(vNode, shadowId) {
	vNode.shadowId = shadowId;
	for (var i = 0; i < vNode.children.length; i++) {
		setShadowId(vNode.children[i], shadowId);
	}
}

function getTestDom() {
	'use strict';
	var html = document.createElement('html');
	html.innerHTML =
		'' +
		'<body>' +
		'<div class="first" data-a11yhero="faulkner">' +
		'<ul>' +
		'<li class="breaking"></li>' +
		'<li class="breaking"></li>' +
		'</ul>' +
		'</div>' +
		'<div id="one"></div>' +
		'<div class="second third">' +
		'<ul>' +
		'<li role="tab" id="one"></li>' +
		'<li role="button" id="one"></li>' +
		'</ul>' +
		'</div>' +
		'</body>';

	// remove the head node
	var head = html.querySelector('head');
	if (head) {
		head.parentNode.removeChild(head);
	}

	var tree = axe.utils.getFlattenedTree(html);

	// setup shadowIds for testing
	var first = axe.utils.getNodeFromTree(html.querySelector('.first'));
	var second = axe.utils.getNodeFromTree(html.querySelector('.second'));
	setShadowId(first, 'a');
	setShadowId(second, 'b');
	axe.utils.getNodeFromTree(html.querySelector('[role="button"]')).shadowId =
		'c';

	return tree;
}

describe('axe.utils.querySelectorAllFilter', function() {
	'use strict';
	var dom;
	afterEach(function() {});
	beforeEach(function() {
		dom = getTestDom();
	});
	it('should find nodes using just the tag', function() {
		var result = axe.utils.querySelectorAllFilter(dom, 'li');
		assert.equal(result.length, 4);
	});
	it('should find nodes using parent selector', function() {
		var result = axe.utils.querySelectorAllFilter(dom, 'ul > li');
		assert.equal(result.length, 4);
	});
	it('should NOT find nodes using parent selector', function() {
		var result = axe.utils.querySelectorAllFilter(dom, 'div > li');
		assert.equal(result.length, 0);
	});
	it('should find nodes using hierarchical selector', function() {
		var result = axe.utils.querySelectorAllFilter(dom, 'div li');
		assert.equal(result.length, 4);
	});
	it('should find nodes using class selector', function() {
		var result = axe.utils.querySelectorAllFilter(dom, '.breaking');
		assert.equal(result.length, 2);
	});
	it('should find nodes using hierarchical class selector', function() {
		var result = axe.utils.querySelectorAllFilter(dom, '.first .breaking');
		assert.equal(result.length, 2);
	});
	it('should NOT find nodes using hierarchical class selector', function() {
		var result = axe.utils.querySelectorAllFilter(dom, '.second .breaking');
		assert.equal(result.length, 0);
	});
	it('should find nodes using multiple class selector', function() {
		var result = axe.utils.querySelectorAllFilter(dom, '.second.third');
		assert.equal(result.length, 1);
	});
	it('should find nodes using id', function() {
		var result = axe.utils.querySelectorAllFilter(dom, '#one');
		assert.equal(result.length, 1);
	});
	it('should find nodes using id, but not in shadow DOM', function() {
		var result = axe.utils.querySelectorAllFilter(dom[0].children[0], '#one');
		assert.equal(result.length, 1);
	});
	it('should find nodes using id, within a shadow DOM', function() {
		var result = axe.utils.querySelectorAllFilter(
			dom[0].children[0].children[2],
			'#one'
		);
		assert.equal(result.length, 1);
	});
	it('should find nodes using attribute', function() {
		var result = axe.utils.querySelectorAllFilter(dom, '[role]');
		assert.equal(result.length, 2);
	});
	it('should find nodes using attribute with value', function() {
		var result = axe.utils.querySelectorAllFilter(dom, '[role=tab]');
		assert.equal(result.length, 1);
	});
	it('should find nodes using attribute with value', function() {
		var result = axe.utils.querySelectorAllFilter(dom, '[role="button"]');
		assert.equal(result.length, 1);
	});
	it('should find nodes using parent attribute with value', function() {
		var result = axe.utils.querySelectorAllFilter(
			dom,
			'[data-a11yhero="faulkner"] > ul'
		);
		assert.equal(result.length, 1);
	});
	it('should find nodes using hierarchical attribute with value', function() {
		var result = axe.utils.querySelectorAllFilter(
			dom,
			'[data-a11yhero="faulkner"] li'
		);
		assert.equal(result.length, 2);
	});
	it('should find nodes using :not selector with class', function() {
		var result = axe.utils.querySelectorAllFilter(dom, 'div:not(.first)');
		assert.equal(result.length, 2);
	});
	it('should find nodes using :not selector with matching id', function() {
		var result = axe.utils.querySelectorAllFilter(dom, 'div:not(#one)');
		assert.equal(result.length, 2);
	});
	it('should find nodes using :not selector with matching attribute selector', function() {
		var result = axe.utils.querySelectorAllFilter(
			dom,
			'div:not([data-a11yhero])'
		);
		assert.equal(result.length, 2);
	});
	it('should find nodes using :not selector with matching attribute selector with value', function() {
		var result = axe.utils.querySelectorAllFilter(
			dom,
			'div:not([data-a11yhero=faulkner])'
		);
		assert.equal(result.length, 2);
	});
	it('should find nodes using :not selector with bogus attribute selector with value', function() {
		var result = axe.utils.querySelectorAllFilter(
			dom,
			'div:not([data-a11yhero=wilco])'
		);
		assert.equal(result.length, 3);
	});
	it('should find nodes using :not selector with bogus id', function() {
		var result = axe.utils.querySelectorAllFilter(dom, 'div:not(#thangy)');
		assert.equal(result.length, 3);
	});
	it('should find nodes using :not selector with attribute', function() {
		var result = axe.utils.querySelectorAllFilter(dom, 'div:not([id])');
		assert.equal(result.length, 2);
	});
	it('should find nodes hierarchically using :not selector', function() {
		var result = axe.utils.querySelectorAllFilter(dom, 'div:not(.first) li');
		assert.equal(result.length, 2);
	});
	it('should find same nodes hierarchically using more :not selector', function() {
		var result = axe.utils.querySelectorAllFilter(
			dom,
			'div:not(.first) li:not(.breaking)'
		);
		assert.equal(result.length, 2);
	});
	it('should NOT find nodes hierarchically using :not selector', function() {
		var result = axe.utils.querySelectorAllFilter(
			dom,
			'div:not(.second) li:not(.breaking)'
		);
		assert.equal(result.length, 0);
	});
	it('should find nodes using ^= attribute selector', function() {
		var result = axe.utils.querySelectorAllFilter(dom, '[class^="sec"]');
		assert.equal(result.length, 1);
	});
	it('should find nodes using $= attribute selector', function() {
		var result = axe.utils.querySelectorAllFilter(dom, '[id$="ne"]');
		assert.equal(result.length, 3);
	});
	it('should find nodes using *= attribute selector', function() {
		var result = axe.utils.querySelectorAllFilter(dom, '[role*="t"]');
		assert.equal(result.length, 2);
	});
	it('should put it all together', function() {
		var result = axe.utils.querySelectorAllFilter(
			dom,
			'.first[data-a11yhero="faulkner"] > ul li.breaking'
		);
		assert.equal(result.length, 2);
	});
	it('should find an element only once', function() {
		var divs = axe.utils.querySelectorAllFilter(dom, 'div');
		var ones = axe.utils.querySelectorAllFilter(dom, '#one');
		var divOnes = axe.utils.querySelectorAllFilter(dom, 'div, #one');

		assert.isBelow(
			divOnes.length,
			divs.length + ones.length,
			'Elements matching both parts of a selector should not be included twice'
		);
	});
	it('should return nodes sorted by document position', function() {
		var result = axe.utils.querySelectorAllFilter(dom, 'ul, #one');
		assert.equal(result[0].actualNode.nodeName, 'UL');
		assert.equal(result[1].actualNode.nodeName, 'DIV');
		assert.equal(result[2].actualNode.nodeName, 'UL');
	});
	it('should filter the returned nodes when passed a filter function', function() {
		var result = axe.utils.querySelectorAllFilter(dom, 'ul, #one', function(
			node
		) {
			return node.actualNode.nodeName !== 'UL';
		});
		assert.equal(result[0].actualNode.nodeName, 'DIV');
		assert.equal(result.length, 1);
	});
});
describe('axe.utils.querySelectorAll', function() {
	'use strict';
	it('should call axe.utils.querySelectorAllFilter', function() {
		var saved = axe.utils.querySelectorAllFilter;
		var called = false;
		axe.utils.querySelectorAllFilter = function() {
			called = true;
		};
		axe.utils.querySelectorAll();
		assert.isTrue(called);
		axe.utils.querySelectorAllFilter = saved;
	});
});
