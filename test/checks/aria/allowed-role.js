describe('aria-allowed-role', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

  var checkContext = new axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return false when a role is set on a element that does not allow any role', function () {
		var node = document.createElement('dd');
		node.setAttribute('role', 'link');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should return true when a element that can have any role', function () {
		var node = document.createElement('div');
		node.setAttribute('role', 'link');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should not allow roles outside a subset', function () {
		var node = document.createElement('article');
		node.setAttribute('role', 'fake-role');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should allow roles inside a subset', function () {
		var node = document.createElement('article');
		node.setAttribute('role', 'feed');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should allow an <a> without a href to have any role', function () {
		var node = document.createElement('a');
		node.setAttribute('role', 'fake-role');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should not allow an <a> with a empty href to have any role', function () {
		var node = document.createElement('a');
		node.setAttribute('role', 'fake-role');
		node.href = '';
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should allow an <a> with a href to have a role of its subset', function () {
		var node = document.createElement('a');
		node.setAttribute('role', 'button');
		node.href = '\\example.com';
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should allow an <area> without a href to have any role', function () {
		var node = document.createElement('area');
		node.setAttribute('role', 'fake-role');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should not allow an <area> with a href to have any role', function () {
		var node = document.createElement('area');
		node.setAttribute('role', 'fake-role');
		node.href = '\\example.com';
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should allow an <button> without a specific type to have a role of the button subset', function() {
		var node = document.createElement('button');
		node.setAttribute('role', 'checkbox');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should allow an <button type="menu"> to have role of menuitem', function() {
		var node = document.createElement('button');
		node.setAttribute('role', 'menuitem');
    // could be false when there is no support inside the environment
    // of this specific type
		node.type = 'menu';
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should not allow an <button type="menu"> to have role of the default button subset', function() {
		var node = document.createElement('button');
		node.setAttribute('role', 'checkbox');
    // could be false when there is no support inside the environment
    // of this specific type
		node.type = 'menu';
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should not allow an <img> with an empty alt to have a role outside its subset', function(){
		var node = document.createElement('img');
		node.setAttribute('role', 'fake-role');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should allow an <img> with an alt to have any role except `none` or `presentation`', function(){
		var node = document.createElement('img');
		node.setAttribute('role', 'fake-role');
		node.alt = 'some text';
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
		node.setAttribute('role', 'none');
		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
		node.setAttribute('role', 'presentation');
		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should allow <li> to have any role', function() {
		var node = document.createElement('li');
		node.setAttribute('role', 'fake-role');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should not allow <li> with a parent of <ul> to have any role', function() {
		var node = document.createElement('li');
		node.setAttribute('role', 'fake-role');
		var parent = document.createElement('ul');
		parent.appendChild(node);
		fixture.appendChild(parent);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should allow an <link> without a href to have any role', function () {
		var node = document.createElement('link');
		node.setAttribute('role', 'fake-role');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should not allow an <link> with a href to have any role', function () {
		var node = document.createElement('link');
		node.setAttribute('role', 'fake-role');
		node.href = '\\example.com';
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should allow an <menu> without a type to have any role', function () {
		var node = document.createElement('menu');
		node.setAttribute('role', 'fake-role');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should not allow an <menu type="context"> to have any role', function () {
		var node = document.createElement('menu');
		node.type = 'context';
		node.setAttribute('role', 'fake-role');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should allow <option> to have any role', function() {
		var node = document.createElement('option');
		node.setAttribute('role', 'fake-role');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should not allow <option> with a parent of <datalist> to have any role', function() {
		var node = document.createElement('option');
		node.setAttribute('role', 'fake-role');
		var parent = document.createElement('datalist');
		parent.appendChild(node);
		fixture.appendChild(parent);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});

	it('should allow <select> without a multiple and size attribute to have a menu role', function() {
		var node = document.createElement('select');
		node.setAttribute('role', 'menu');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should allow <select size="1"> without a multiple attribute to have a menu role', function() {
		var node = document.createElement('select');
		node.size = 1;
		node.setAttribute('role', 'menu');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should not allow <select multiple> to have any role', function() {
		var node = document.createElement('select');
		node.multiple = true;
		node.setAttribute('role', 'fake-role');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should not allow <select size="2"> to have any role', function() {
		var node = document.createElement('select');
		node.size = 2;
		node.setAttribute('role', 'fake-role');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});
	it('should not allow <select multiple size="9999"> to have any role', function() {
		var node = document.createElement('select');
		node.multiple = true;
		node.size = 9999;
		node.setAttribute('role', 'fake-crole');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-role'].evaluate.call(checkContext, node));
	});


});
