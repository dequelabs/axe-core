describe('duplicate-id', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupport = axe.testUtils.shadowSupport;

	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return true if there is only one element with an ID', function () {
		fixture.innerHTML = '<div id="target"></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['duplicate-id'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, node.id);
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return false if there are multiple elements with an ID', function () {
		fixture.innerHTML = '<div id="target"></div><div id="target"></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['duplicate-id'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, node.id);
		assert.deepEqual(checkContext._relatedNodes, [node.nextSibling]);
	});

	it('should return remove duplicates', function () {
		assert.deepEqual(checks['duplicate-id'].after([
			{data: 'a'}, {data: 'b'}, {data: 'b'}]), [{data: 'a'}, {data: 'b'}]);
	});

	it('should ignore empty ids', function () {
		fixture.innerHTML = '<div data-testelm="1" id=""></div><div data-testelm="2"  id=""></div>';
		var node = fixture.querySelector('[data-testelm="1"]');

		assert.isTrue(checks['duplicate-id'].evaluate.call(checkContext, node));
	});

	it('should allow overwrote ids', function () {
		fixture.innerHTML = '<form data-testelm="1" id="target"><label>mylabel' + 
			'<input name="id">' +
		'</label></form>';
		var node = fixture.querySelector('[data-testelm="1"]');

		assert.isTrue(checks['duplicate-id'].evaluate.call(checkContext, node));
	});

	(shadowSupport.v1 ? it : xit)('should find duplicate IDs in the same shadow DOM', function () {
		var div = document.createElement('div');
		div.id = 'target';
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<span id="target"></span><p id="target">text</p>';
		var node = shadow.querySelector('span');
		fixture.appendChild(div);

		assert.isFalse(checks['duplicate-id'].evaluate.call(checkContext, node));
		assert.lengthOf(checkContext._relatedNodes, 1);
		assert.deepEqual(checkContext._relatedNodes, [shadow.querySelector('p')]);
	});

	(shadowSupport.v1 ? it : xit)('should ignore duplicate IDs if they are in different document roots', function () {
		var node = document.createElement('div');
		node.id = 'target';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<span id="target"></span>';
		fixture.appendChild(node);

		assert.isTrue(checks['duplicate-id'].evaluate.call(checkContext, node));
		assert.lengthOf(checkContext._relatedNodes, 0);
	});

	(shadowSupport.v1 ? it : xit)('should ignore same IDs outside shadow trees', function () {
		var div = document.createElement('div');
		div.id = 'target';
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<span id="target"></span>';
		var node = shadow.querySelector('#target');
		fixture.appendChild(div);

		assert.isTrue(checks['duplicate-id'].evaluate.call(checkContext, node));
		assert.lengthOf(checkContext._relatedNodes, 0);
	});

	(shadowSupport.v1 ? it : xit)('should compare slotted content with the light DOM', function () {
		var node = document.createElement('div');
		node.id = 'target';
		node.innerHTML = '<p id="target">text</p>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<span id="target"><slot></slot></span>';
		fixture.appendChild(node);

		assert.isFalse(checks['duplicate-id'].evaluate.call(checkContext, node));
		assert.lengthOf(checkContext._relatedNodes, 1);
		assert.deepEqual(checkContext._relatedNodes, [node.querySelector('p')]);
	});
});
