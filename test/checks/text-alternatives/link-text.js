describe('link-text', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if title text is different then other "a" tag and link text is same', function() {
		var node = document.createElement('a');
		node.setAttribute('title', 'woohoo');
		node.setAttribute('href', '#1');
		node.textContent = 'some text';
		fixture.appendChild(node);
		var node2 = document.createElement('a');
		node2.setAttribute('title', 'woohoo2');
		node2.setAttribute('href', '#2');
		node2.textContent = 'some text';
		fixture.appendChild(node2);

		assert.isTrue(checks['link-text'].evaluate(node));
	});

	it('should return true if both links have the same href', function() {
		var node = document.createElement('a');
		node.setAttribute('title', 'woohoo');
		node.setAttribute('href', '#1');
		node.textContent = 'some text';
		fixture.appendChild(node);
		var node2 = document.createElement('a');
		node2.setAttribute('title', 'woohoo');
		node2.setAttribute('href', '#1');
		node2.textContent = 'some text';
		fixture.appendChild(node2);

		assert.isTrue(checks['link-text'].evaluate(node));
	});

	it('should return true if title text is different then other "role=link" tag and link text is same', function() {
		var node = document.createElement('span');
		node.setAttribute('title', 'woohoo');
		node.setAttribute('role', 'link');
		node.setAttribute('href', '#1');
		node.textContent = 'some text';
		fixture.appendChild(node);
		var node2 = document.createElement('a');
		node2.setAttribute('title', 'woohoo2');
		node2.setAttribute('href', '#2');
		node2.textContent = 'some text';
		fixture.appendChild(node2);

		assert.isTrue(checks['link-text'].evaluate(node));
	});

	it('should return true if link text different then other "a" tag and title text is same', function() {
		var node = document.createElement('a');
		node.setAttribute('title', 'woohoo');
		node.setAttribute('href', '#1');
		node.textContent = 'some text';
		fixture.appendChild(node);
		var node2 = document.createElement('a');
		node2.setAttribute('title', 'woohoo');
		node2.setAttribute('href', '#2');
		node2.textContent = 'some text1';
		fixture.appendChild(node2);

		assert.isTrue(checks['link-text'].evaluate(node));
	});

	it('should return false if both link and title text is the same as other "a" tag', function() {
		var node = document.createElement('a');
		node.setAttribute('title', 'woohoo');
		node.setAttribute('href', '#1');
		node.textContent = 'some text';
		fixture.appendChild(node);
		var node2 = document.createElement('a');
		node2.setAttribute('title', 'woohoo');
		node2.setAttribute('href', '#2');
		node2.textContent = 'some text';
		fixture.appendChild(node2);

		assert.isFalse(checks['link-text'].evaluate(node));
	});
});
