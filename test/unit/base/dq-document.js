/*global DqDocument */
describe('DqDocument', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be a function', function () {
		assert.isFunction(DqDocument);
	});

	it('should take a node as a parameter and return an object', function () {
		var result = new DqDocument(document);
		assert.isObject(result);
	});

	it('should return location as `location`', function () {
		var result = new DqDocument(document);
		assert.equal(result.location, window.location.href);
	});

	it('should return location as `location`', function () {
		var doc = {
			location: {
				href: 'bananas'
			},
			documentElement: {
				outerHTML: '<html></html>'
			},
			querySelectorAll: function () { return []; }
		};
		var result = new DqDocument(doc);
		assert.equal(result.location, doc.location.href);
	});

	it('should return documentElements outerHTML as `source`', function () {
		var doc = {
			location: {
				href: 'bananas'
			},
			documentElement: {
				outerHTML: '<html></html>'
			},
			querySelectorAll: function () { return []; }
		};
		var result = new DqDocument(doc);
		assert.equal(result.source, doc.documentElement.outerHTML);
	});

	it('should find frames in the document', function () {
		var doc = document.implementation.createHTMLDocument('IE is stupid');
		var frameset = doc.createElement('frameset');
		var frame1 = doc.createElement('frame');
		frame1.src = 'frames/frame1.html';
		frameset.appendChild(frame1);

		var frame2 = doc.createElement('frame');
		frame2.src = 'about:blank';
		frameset.appendChild(frame2);

		doc.body.appendChild(frameset);

		var result = new DqDocument(doc);
		assert.lengthOf(result.frames, 2);
		assert.sameMembers(result.frames, [frame1, frame2]);
	});

	it('should find iframes in the document', function () {
		var doc = document.implementation.createHTMLDocument('IE is stupid');
		var frame1 = doc.createElement('iframe');
		frame1.src = 'frames/frame1.html';
		doc.body.appendChild(frame1);

		var frame2 = doc.createElement('iframe');
		frame2.src = 'about:blank';
		doc.body.appendChild(frame2);

		var result = new DqDocument(doc);
		assert.lengthOf(result.frames, 2);
		assert.sameMembers(result.frames, [frame1, frame2]);
	});

	it('should find frames and iframes in the document', function () {
		var doc = document.implementation.createHTMLDocument('IE is stupid');
		var frameset = doc.createElement('frameset');
		var frame1 = doc.createElement('frame');
		frame1.src = 'frames/frame1.html';
		frameset.appendChild(frame1);

		var frame2 = doc.createElement('frame');
		frame2.src = 'about:blank';
		frameset.appendChild(frame2);

		var frame3 = doc.createElement('iframe');
		frame3.src = 'about:blank';
		doc.body.appendChild(frame3);

		doc.body.appendChild(frameset);

		var result = new DqDocument(doc);
		assert.lengthOf(result.frames, 3);
		assert.sameMembers(result.frames, [frame3, frame1, frame2]);
	});
});