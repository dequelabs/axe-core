describe('submit-button', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true as form has img with submit', function() {
		var node = document.createElement('form');

		var node2 = document.createElement('img');
		node2.setAttribute('type', 'submit');

		var node3 = document.createElement('input');

		node.appendChild(node2);
		node.appendChild(node3);
		fixture.appendChild(node);

		assert.isTrue(checks['submit-button'].evaluate(node));
	});

	it('should return true as form has button with submit', function() {
		var node = document.createElement('form');

		var node2 = document.createElement('button');
		node2.setAttribute('type', 'submit');

		var node3 = document.createElement('input');

		node.appendChild(node2);
		node.appendChild(node3);
		fixture.appendChild(node);

		assert.isTrue(checks['submit-button'].evaluate(node));
	});

	it('should return true as form has input with submit', function() {
		var node = document.createElement('form');

		var node2 = document.createElement('input');
		node2.setAttribute('type', 'submit');

		var node3 = document.createElement('input');

		node.appendChild(node2);
		node.appendChild(node3);
		fixture.appendChild(node);

		assert.isTrue(checks['submit-button'].evaluate(node));
	});

	it('should return false as form only contains textareas', function() {
		var node = document.createElement('form');

		var node2 = document.createElement('textarea');

		var node3 = document.createElement('textarea');

		node.appendChild(node2);
		node.appendChild(node3);
		fixture.appendChild(node);

		assert.isFalse(checks['submit-button'].evaluate(node));
	});

	it('should return undefiend as no button. img or input with submit was found', function() {
		var node = document.createElement('form');

		var node2 = document.createElement('textarea');

		var node3 = document.createElement('input');

		node.appendChild(node2);
		node.appendChild(node3);
		fixture.appendChild(node);

		assert.isUndefined(checks['submit-button'].evaluate(node));
	});

	it('should return undefiend as form has img with submit and disabled', function() {
		var node = document.createElement('form');

		var node2 = document.createElement('img');
		node2.setAttribute('type', 'submit');
		node2.setAttribute('disabled', null);

		var node3 = document.createElement('input');

		node.appendChild(node2);
		node.appendChild(node3);
		fixture.appendChild(node);

		assert.isUndefined(checks['submit-button'].evaluate(node));
	});

	it('should return undefiend as form has button with submit and disabled', function() {
		var node = document.createElement('form');

		var node2 = document.createElement('button');
		node2.setAttribute('type', 'submit');
		node2.setAttribute('disabled', null);

		var node3 = document.createElement('input');

		node.appendChild(node2);
		node.appendChild(node3);
		fixture.appendChild(node);

		assert.isUndefined(checks['submit-button'].evaluate(node));
	});

	it('should return undefiend as form has input with submit and disabled', function() {
		var node = document.createElement('form');

		var node2 = document.createElement('input');
		node2.setAttribute('type', 'submit');
		node2.setAttribute('disabled', null);

		var node3 = document.createElement('input');

		node.appendChild(node2);
		node.appendChild(node3);
		fixture.appendChild(node);

		assert.isUndefined(checks['submit-button'].evaluate(node));
	});
});
