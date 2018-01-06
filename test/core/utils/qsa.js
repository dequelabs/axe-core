function Vnode (nodeName, className, attributes, id) {
	'use strict';
	this.nodeName = nodeName.toUpperCase();
	this.id = id;
	this.attributes = attributes || [];
	this.className = className;
	this.nodeType = 1;
}

Vnode.prototype.getAttribute = function (att) {
	'use strict';
	var attribute = this.attributes.find(function (item) {
		return item.key === att;
	});
	return attribute ? attribute.value : null;
};

describe('axe.utils.querySelectorAll', function () {
	'use strict';
	var dom;
	afterEach(function () {
	});
	beforeEach(function () {
		dom = [{
			actualNode: new Vnode('html'),
			children: [{
				actualNode: new Vnode('body'),
				children: [{
					actualNode: new Vnode('div', 'first',[{
						key: 'data-a11yhero',
						value: 'faulkner'
					}]),
					shadowId: 'a',
					children: [{
						actualNode: new Vnode('ul'),
						shadowId: 'a',
						children: [{
							actualNode: new Vnode('li', 'breaking'),
							shadowId: 'a',
							children: []
						},{
							actualNode: new Vnode('li', 'breaking'),
							shadowId: 'a',
							children: []
						}]
					}]
				}, {
					actualNode: new Vnode('div', '', [], 'one'),
					children: []
				}, {
					actualNode: new Vnode('div', 'second third'),
					shadowId: 'b',
					children: [{
						actualNode: new Vnode('ul'),
						shadowId: 'b',
						children: [{
							actualNode: new Vnode('li', undefined, [{
								key: 'role',
								value: 'tab'
							}], 'one'),
							shadowId: 'b',
							children: []
						},{
							actualNode: new Vnode('li', undefined, [{
								key: 'role',
								value: 'button'
							}], 'one'),
							shadowId: 'c',
							children: []
						}]
					}]
				}]
			}]
		}];
	});
	it('should find nodes using just the tag', function () {
		var result = axe.utils.querySelectorAll(dom, 'li');
		assert.equal(result.length, 4);
	});
	it('should find nodes using parent selector', function () {
		var result = axe.utils.querySelectorAll(dom, 'ul > li');
		assert.equal(result.length, 4);
	});
	it('should NOT find nodes using parent selector', function () {
		var result = axe.utils.querySelectorAll(dom, 'div > li');
		assert.equal(result.length, 0);
	});
	it('should find nodes using hierarchical selector', function () {
		var result = axe.utils.querySelectorAll(dom, 'div li');
		assert.equal(result.length, 4);
	});
	it('should find nodes using class selector', function () {
		var result = axe.utils.querySelectorAll(dom, '.breaking');
		assert.equal(result.length, 2);
	});
	it('should find nodes using hierarchical class selector', function () {
		var result = axe.utils.querySelectorAll(dom, '.first .breaking');
		assert.equal(result.length, 2);
	});
	it('should NOT find nodes using hierarchical class selector', function () {
		var result = axe.utils.querySelectorAll(dom, '.second .breaking');
		assert.equal(result.length, 0);
	});
	it('should find nodes using multiple class selector', function () {
		var result = axe.utils.querySelectorAll(dom, '.second.third');
		assert.equal(result.length, 1);
	});
	it('should find nodes using id', function () {
		var result = axe.utils.querySelectorAll(dom, '#one');
		assert.equal(result.length, 1);
	});
	it('should find nodes using id, within a shadow DOM', function () {
		var result = axe.utils.querySelectorAll(dom[0].children[0].children[2], '#one');
		assert.equal(result.length, 1);
	});
	it('should find nodes using attribute', function () {
		var result = axe.utils.querySelectorAll(dom, '[role]');
		assert.equal(result.length, 2);
	});
	it('should find nodes using attribute with value', function () {
		var result = axe.utils.querySelectorAll(dom, '[role=tab]');
		assert.equal(result.length, 1);
	});
	it('should find nodes using attribute with value', function () {
		var result = axe.utils.querySelectorAll(dom, '[role="button"]');
		assert.equal(result.length, 1);
	});
	it('should find nodes using parent attribute with value', function () {
		var result = axe.utils.querySelectorAll(dom, '[data-a11yhero="faulkner"] > ul');
		assert.equal(result.length, 1);
	});
	it('should find nodes using hierarchical attribute with value', function () {
		var result = axe.utils.querySelectorAll(dom, '[data-a11yhero="faulkner"] li');
		assert.equal(result.length, 2);
	});
	it('should find nodes using :not selector with class', function () {
		var result = axe.utils.querySelectorAll(dom, 'div:not(.first)');
		assert.equal(result.length, 2);
	});
	it('should find nodes using :not selector with matching id', function () {
		var result = axe.utils.querySelectorAll(dom, 'div:not(#one)');
		assert.equal(result.length, 2);
	});
	it('should find nodes using :not selector with matching attribute selector', function () {
		var result = axe.utils.querySelectorAll(dom, 'div:not([data-a11yhero])');
		assert.equal(result.length, 2);
	});
	it('should find nodes using :not selector with matching attribute selector with value', function () {
		var result = axe.utils.querySelectorAll(dom, 'div:not([data-a11yhero=faulkner])');
		assert.equal(result.length, 2);
	});
	it('should find nodes using :not selector with bogus attribute selector with value', function () {
		var result = axe.utils.querySelectorAll(dom, 'div:not([data-a11yhero=wilco])');
		assert.equal(result.length, 3);
	});
	it('should find nodes using :not selector with bogus id', function () {
		var result = axe.utils.querySelectorAll(dom, 'div:not(#thangy)');
		assert.equal(result.length, 3);
	});
	it('should find nodes hierarchically using :not selector', function () {
		var result = axe.utils.querySelectorAll(dom, 'div:not(.first) li');
		assert.equal(result.length, 2);
	});
	it('should find same nodes hierarchically using more :not selector', function () {
		var result = axe.utils.querySelectorAll(dom, 'div:not(.first) li:not(.breaking)');
		assert.equal(result.length, 2);
	});
	it('should NOT find nodes hierarchically using :not selector', function () {
		var result = axe.utils.querySelectorAll(dom, 'div:not(.second) li:not(.breaking)');
		assert.equal(result.length, 0);
	});
	it('should put it all together', function () {
		var result = axe.utils.querySelectorAll(dom,
			'.first[data-a11yhero="faulkner"] > ul li.breaking');
		assert.equal(result.length, 2);
	});
	it('should find an element only once', function () {
		var divs = axe.utils.querySelectorAll(dom, 'div');
		var ones = axe.utils.querySelectorAll(dom, '#one');
		var divOnes = axe.utils.querySelectorAll(dom, 'div, #one');

		assert.isBelow(divOnes.length, divs.length + ones.length,
			'Elements matching both parts of a selector should not be included twice');
	});
});
