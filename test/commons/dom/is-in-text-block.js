describe('dom.isInTextBlock', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('returns true if the element is a node in a block of text', function () {
		fixture.innerHTML = 
			'<p>Some paragraph with text ' +
			'  <a href="" id="link">link</a>' +
			'</p>';
		var link = document.getElementById('link');
		assert.isTrue(axe.commons.dom.isInTextBlock(link));
	});

	it('returns false if the element is a block', function () {
		fixture.innerHTML = 
			'<p>Some paragraph with text ' +
			'  <a href="" id="link" style="display:block">link</a>' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('returns false if the element has the only text in the block', function () {
		fixture.innerHTML = 
			'<p>' +
			'  <a href="" id="link">link</a>'+
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('returns false if there is more text in link(s) than in the rest of the block', function () {
		fixture.innerHTML = 
			'<p> short text:' +
			'  <a href="" id="link">on a link with a very long text</a>' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('return false if there are links along side other links', function () {
		fixture.innerHTML = 
			'<p>' +
			'  <a href="" id="link">link</a>' +
			'  <a href="">other link</a>' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignores hidden content', function () {
		fixture.innerHTML = 
			'<p>' +
			'  <a href="" id="link">link</a>' +
			'  <span style="display:none">some hidden text</span>' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignores floated content', function () {
		fixture.innerHTML = 
			'<p>' +
			'  <span style="float: left">A floating text in the area</span>' +
			'  <a href="" id="link">link</a>' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignores positioned content', function () {
		fixture.innerHTML = 
			'<p>' +
			'  <span style="position:absolute;">Some absolute potitioned text</span>' +
			'  <a href="" id="link">link</a>' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignores none-text content', function () {
		fixture.innerHTML = 
			'<p>' +
			'  <img alt="Some graphical component" src="img.png" />' +
			'  <a href="" id="link">link</a>' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignore text in the block coming before a br', function () {
		fixture.innerHTML = 
			'<p>Some paragraph with text <br>' +
			'  <a href="" id="link">link</a>' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignore text in the block coming after a br', function () {
		fixture.innerHTML = 
			'<p>' +
			'  <a href="" id="link">link</a> <br>' +
			'  Some paragraph with text ' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignore text in the block coming before and after a br', function () {
		fixture.innerHTML = 
			'<p>Some paragraph with text <br>' +
			'  <a href="" id="link">link</a> <br>' +
			'  Some paragraph with text ' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('treats hr elements the same as br elements', function () {
		fixture.innerHTML = 
			'<p>Some paragraph with text <hr>' +
			'  <a href="" id="link">link</a> <hr>' +
			'  Some paragraph with text ' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignore comments', function () {
		fixture.innerHTML = 
			'<p><!-- Some paragraph with text -->' +
			'  <a href="" id="link">link</a>' +
			'</p>';
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

});