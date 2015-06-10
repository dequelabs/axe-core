/*global Context */
describe('Context', function () {
	'use strict';

	function iframeReady(src, context, id, cb) {
		var i = document.createElement('iframe');
		i.addEventListener('load', function () {
			cb();
		});
		i.src = src;
		i.id = id;
		context.appendChild(i);
	}

	function $id(id) {
		return document.getElementById(id);
	}

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	describe('include', function () {

		it('should accept a single selector', function () {
			fixture.innerHTML = '<div id="foo"></div>';
			var result = new Context('#foo');

			assert.deepEqual(result.include, [$id('foo')]);
		});

		it('should accept multiple selectors', function () {
			fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
			var result = new Context([['#foo'], ['#bar']]);

			assert.deepEqual(result.include, [$id('foo'), $id('bar')]);
		});

		it('should accept a node reference', function () {
			var div = document.createElement('div');
			fixture.appendChild(div);

			var result = new Context(div);

			assert.deepEqual(result.include, [div]);

		});

		it('should accept an array of node reference', function () {
			fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

			var result = new Context([$id('foo'), $id('bar')]);

			assert.deepEqual(result.include, [$id('foo'), $id('bar')]);

		});

		it('should remove any non-matched reference', function () {
			fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

			var result = new Context([['#foo'],  ['#baz'], ['#bar']]);

			assert.deepEqual(result.include, [$id('foo'), $id('bar')]);

		});

		it('should remove any null reference', function () {
			fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

			var result = new Context([$id('foo'), $id('bar'), null]);

			assert.deepEqual(result.include, [$id('foo'), $id('bar')]);

		});

		it('should accept mixed', function () {
			fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
			var div = document.createElement('div');
			div.id = 'baz';
			fixture.appendChild(div);

			var result = new Context([['#foo'], ['#bar'], div]);

			assert.deepEqual(result.include, [$id('foo'), $id('bar'), $id('baz')]);

		});

		it('should add frame references to frames - implicit', function (done) {
			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function () {

				var result = new Context('#outer');

				assert.deepEqual(result.frames, [{
					node: $id('target'),
					include: [],
					exclude: []
				}]);
				done();

			});

		});

		it('should add frame references to frames - explicit', function (done) {
			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function () {

				var result = new Context('#target');

				assert.deepEqual(result.frames, [{
					node: $id('target'),
					include: [],
					exclude: []
				}]);
				done();
			});

		});

		it('should add frame references to frames - frame selector', function (done) {
			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function () {

				var result = new Context([['#target', '#foo']]);

				assert.deepEqual(result.frames, [{
					node: $id('target'),
					include: [['#foo']],
					exclude: []
				}]);
				done();
			});

		});

		it('should only push unique frame references - frame selector', function (done) {
			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function () {
				var result = new Context([['#target', '#foo'], ['#target', '#bar']]);

				assert.deepEqual(result.frames, [{
					node: $id('target'),
					include: [['#foo'], ['#bar']],
					exclude: []
				}]);
				done();
			});

		});

		it('should only push unique frame references - node reference', function (done) {
			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function () {
				var result = new Context([$id('target'), $id('target')]);

				assert.deepEqual(result.frames, [{
					node: $id('target'),
					include: [],
					exclude: []
				}]);
				done();
			});

		});

		it('should filter out invisible frames', function (done) {

			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function () {
				var frame = $id('target');
				var orig = utils.isHidden;
				var success = false;

				utils.isHidden = function (actual) {
					assert.equal(actual, frame);
					success = true;

					return true;
				};

				var result = new Context([$id('target')]);

				assert.deepEqual(result.frames, []);
				utils.isHidden = orig;
				assert.isTrue(success, 'utils.isHidden was called');
				done();
			});

		});

		it('should not filter out visible frames', function (done) {

			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function () {
				var frame = $id('target');
				var orig = utils.isHidden;
				var success = false;

				utils.isHidden = function (actual) {
					assert.equal(actual, frame);
					success = true;

					return false;
				};

				var result = new Context([$id('target')]);

				assert.deepEqual(result.frames, [{
					include: [],
					exclude: [],
					node: $id('target')
				}]);

				utils.isHidden = orig;
				assert.isTrue(success, 'utils.isHidden was called');
				done();
			});

		});

	});

	describe('object definition', function () {
		it('should assign include/exclude', function () {

			assert.deepEqual(new Context({
					include: ['#fixture'],
					exclude: ['#mocha']
				}),
				{
					include: [document.getElementById('fixture')],
					exclude: [document.getElementById('mocha')],
					initiator: true,
					page: false,
					frames: []
				});

		});
		it('should disregard bad input, non-matching selectors', function () {

			assert.deepEqual(new Context({
					include: ['#monkeys'],
					exclude: ['#bananas']
				}),
				{
					include: [],
					exclude: [],
					initiator: true,
					page: false,
					frames: []
				});
		});
		it('should disregard bad input (null)', function () {

			assert.deepEqual(new Context(),
				{
					include: [],
					exclude: [],
					initiator: true,
					page: true,
					frames: []
				});
		});

	});

	describe('initiator', function () {
		it('should not be clobbered', function () {
			assert.deepEqual(new Context({ initiator: false }),
				{
					include: [],
					exclude: [],
					initiator: false,
					page: false,
					frames: []
				});

		});

		// document.hasOwnProperty is undefined in Firefox content scripts
		it('should not throw given really weird circumstances when hasOwnProperty is deleted from a document node?', function () {
			//jshint -W001
			var spec = document.implementation.createHTMLDocument('ie is dumb');
			spec.hasOwnProperty = undefined;
			assert.deepEqual(new Context(spec), {
				initiator: true,
				page: true,
				include: [spec],
				exclude: [],
				frames: []
			});
		});
	});

	describe('page', function () {
		it('should be true if given an entire document', function () {
			assert.isTrue(new Context(document).page);
		});
		it('should be true if given falsey parameter', function () {
			assert.isTrue(new Context(null).page);
			assert.isTrue(new Context().page);
			assert.isTrue(new Context(false).page);
		});

	});
});
