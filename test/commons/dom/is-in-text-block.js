describe('dom.isInTextBlock', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupport = axe.testUtils.shadowSupport;
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('returns true if the element is a node in a block of text', function () {
		fixtureSetup(
			'<p>Some paragraph with text ' +
			'  <a href="" id="link">link</a>' +
			'</p>');
		var link = document.getElementById('link');
		assert.isTrue(axe.commons.dom.isInTextBlock(link));
	});

	it('returns false if the element is a block', function () {
		fixtureSetup(
			'<p>Some paragraph with text ' +
			'  <a href="" id="link" style="display:block">link</a>' +
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('returns false if the element has the only text in the block', function () {
		fixtureSetup(
			'<p>' +
			'  <a href="" id="link">link</a>'+
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('returns false if there is more text in link(s) than in the rest of the block', function () {
		fixtureSetup(
			'<p> short text:' +
			'  <a href="" id="link">on a link with a very long text</a>' +
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('return false if there are links along side other links', function () {
		fixtureSetup(
			'<p>' +
			'  <a href="" id="link">link</a>' +
			'  <a href="">other link</a>' +
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignores hidden content', function () {
		fixtureSetup(
			'<p>' +
			'  <a href="" id="link">link</a>' +
			'  <span style="display:none">some hidden text</span>' +
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignores floated content', function () {
		fixtureSetup(
			'<p>' +
			'  <span style="float: left">A floating text in the area</span>' +
			'  <a href="" id="link">link</a>' +
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignores positioned content', function () {
		fixtureSetup(
			'<p>' +
			'  <span style="position:absolute;">Some absolute potitioned text</span>' +
			'  <a href="" id="link">link</a>' +
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignores none-text content', function () {
		fixtureSetup(
			'<p>' +
			'  <img alt="Some graphical component" src="img.png" />' +
			'  <a href="" id="link">link</a>' +
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignore text in the block coming before a br', function () {
		fixtureSetup(
			'<p>Some paragraph with text <br>' +
			'  <a href="" id="link">link</a>' +
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignore text in the block coming after a br', function () {
		fixtureSetup(
			'<p>' +
			'  <a href="" id="link">link</a> <br>' +
			'  Some paragraph with text ' +
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignore text in the block coming before and after a br', function () {
		fixtureSetup(
			'<p>Some paragraph with text <br>' +
			'  <a href="" id="link">link</a> <br>' +
			'  Some paragraph with text ' +
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('treats hr elements the same as br elements', function () {
		fixtureSetup(
			'<div>Some paragraph with text <hr>' +
			'  <a href="" id="link">link</a> <hr>' +
			'  Some paragraph with text ' +
			'</div>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	it('ignore comments', function () {
		fixtureSetup(
			'<p><!-- Some paragraph with text -->' +
			'  <a href="" id="link">link</a>' +
			'</p>');
		var link = document.getElementById('link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

	(shadowSupport.v1 ? it : xit)('can reach outside a shadow tree', function () {
		var div = document.createElement('div');
		div.innerHTML = 'Some paragraph with text <span></span> ';
		var shadow = div.querySelector('span').attachShadow({ mode: 'open' });
		shadow.innerHTML = '<a href="" id="link">link</a>';
		fixtureSetup(div);

		var link = shadow.querySelector('#link');
		assert.isTrue(axe.commons.dom.isInTextBlock(link));
	});

	(shadowSupport.v1 ? it : xit)('can reach into a shadow tree', function () {
		var div = document.createElement('div');
		div.innerHTML = '<a href="" id="link">link</a>';
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<p>Some paragraph with text <slot></slot> </p>';
		fixtureSetup(div);

		var link = fixture.querySelector('#link');
		assert.isTrue(axe.commons.dom.isInTextBlock(link));
	});

	(shadowSupport.v1 ? it : xit)('treats shadow DOM slots as siblings', function () {
		var div = document.createElement('div');
		div.innerHTML = '<br>';
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<p>Some paragraph with text ' +
			'<slot></slot> <a href="" id="link">link</a></p>';
		fixtureSetup(div);

		var link = shadow.querySelector('#link');
		assert.isFalse(axe.commons.dom.isInTextBlock(link));
	});

});