/* global Promise */

describe('axe.utils.preloadMedia', function() {
	'use strict';

	var treeRoot;
	var origFn = axe.utils.preloadMedia;
	var fixture = document.getElementById('fixture');

	var audioSrc =
		'https://act-rules.github.io/test-assets/moon-audio/moon-speech.mp3';
	var videoSrc =
		'https://act-rules.github.io/test-assets/rabbit-video/video.mp4';

	beforeEach(function() {
		rebuildTree();
	});

	afterEach(function() {
		axe.utils.preloadMedia = origFn;
		fixture.innerHTML = '';
	});

	function rebuildTree() {
		treeRoot = axe._tree = axe.utils.getFlattenedTree(document);
	}

	function addMediaNode(type, src) {
		var node = document.createElement(type);
		node.setAttribute('src', src);
		fixture.appendChild(node);
	}

	it('passes the treeRoot property to utils.preloadMedia', function(done) {
		var isCalled = false;
		axe.utils.preloadMedia = function(options) {
			assert.equal(options.tree, treeRoot);
			isCalled = true;
			return Promise.resolve();
		};

		axe.utils.preloadMedia({ treeRoot: treeRoot }).then(function() {
			assert.ok(isCalled);
			done();
		});
	});

	it('returns empty array when there are no media nodes to be preloaded', function(done) {
		axe.utils.preloadMedia({ treeRoot: treeRoot }).then(function(result) {
			assert.equal(result.length, 0);
			done();
		});
	});

	it('returns media node (audio) after their metadata has been preloaded', function(done) {
		addMediaNode('audio', audioSrc);

		rebuildTree();

		axe.utils.preloadMedia({ treeRoot: treeRoot }).then(function(result) {
			assert.equal(result.length, 1);
			assert.isTrue(result[0].readyState > 0);

			done();
		});
	});

	it('returns media nodes (audio, video) after their metadata has been preloaded', function(done) {
		addMediaNode('audio', audioSrc);
		addMediaNode('video', videoSrc);

		rebuildTree();

		axe.utils.preloadMedia({ treeRoot: treeRoot }).then(function(result) {
			assert.equal(result.length, 2);
			assert.isTrue(result[0].readyState > 0);
			assert.notEqual(result[1].duration, NaN);

			done();
		});
	});
});
