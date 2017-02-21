/*global Context, axe */
describe('Context', function() {
	'use strict';

	function iframeReady(src, context, id, cb) {
		var i = document.createElement('iframe');
		i.addEventListener('load', function() {
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

	afterEach(function() {
		fixture.innerHTML = '';
	});

	describe('include', function() {

		it('should accept a single selector', function() {
			fixture.innerHTML = '<div id="foo"></div>';
			var result = new Context('#foo');

			assert.deepEqual(result.include, [$id('foo')]);
		});

		it('should accept multiple selectors', function() {
			fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
			var result = new Context([
				['#foo'],
				['#bar']
			]);

			assert.deepEqual(result.include, [$id('foo'), $id('bar')]);
		});

		it('should accept a node reference', function() {
			var div = document.createElement('div');
			fixture.appendChild(div);

			var result = new Context(div);

			assert.deepEqual(result.include, [div]);

		});

              it('should accept a node reference consisting of nested divs', function() {
                     var div1 = document.createElement('div');
                     var div2 = document.createElement('div');

                     div1.appendChild(div2);
                     fixture.appendChild(div1);

                     var result = new Context(div1);

                     assert.deepEqual(result.include, [div1]);

              });

              it('should accept a node reference consisting of a form with nested controls', function() {
                     var form = document.createElement('form');
                     var input = document.createElement('input');

                     form.appendChild(input);
                     fixture.appendChild(form);

                     var result = new Context(form);

                     assert.deepEqual(result.include, [form]);

              });

		it('should accept an array of node references', function() {
			fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

			var result = new Context([$id('foo'), $id('bar')]);

			assert.deepEqual(result.include, [$id('foo'), $id('bar')]);

		});

		it('should remove any non-matched reference', function() {
			fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

			var result = new Context([
				['#foo'],
				['#baz'],
				['#bar']
			]);

			assert.deepEqual(result.include, [$id('foo'), $id('bar')]);

		});

		it('should remove any null reference', function() {
			fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

			var result = new Context([$id('foo'), $id('bar'), null]);

			assert.deepEqual(result.include, [$id('foo'), $id('bar')]);

		});

		it('should accept mixed', function() {
			fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
			var div = document.createElement('div');
			div.id = 'baz';
			fixture.appendChild(div);

			var result = new Context([
				['#foo'],
				['#bar'], div
			]);

			assert.deepEqual(result.include, [$id('foo'), $id('bar'), $id('baz')]);

		});

		it('should support jQuery-like objects', function() {
			fixture.innerHTML = '<div id="foo"></div><div id="bar"></div><div id="baz"></div>';
			var $test = {
				0: $id('foo'),
				1: $id('bar'),
				2: $id('baz'),
				length: 3
			};

			var result = new Context($test);

			assert.deepEqual(result.include, [$id('foo'), $id('bar'), $id('baz')]);

		});

		it('should add frame references to frames - implicit', function(done) {
			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function() {

				var result = new Context('#outer');

				assert.deepEqual(result.frames, [{
					node: $id('target'),
					include: [],
					exclude: []
				}]);
				done();

			});

		});

		it('should add frame references to frames - explicit', function(done) {
			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function() {

				var result = new Context('#target');

				assert.deepEqual(result.frames, [{
					node: $id('target'),
					include: [],
					exclude: []
				}]);
				done();
			});

		});

		it('should add frame references to frames - frame selector', function(done) {
			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function() {

				var result = new Context([
					['#target', '#foo']
				]);

				assert.deepEqual(result.frames, [{
					node: $id('target'),
					include: [
						['#foo']
					],
					exclude: []
				}]);
				done();
			});

		});

		it('should only push unique frame references - frame selector', function(done) {
			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function() {
				var result = new Context([
					['#target', '#foo'],
					['#target', '#bar']
				]);

				assert.deepEqual(result.frames, [{
					node: $id('target'),
					include: [
						['#foo'],
						['#bar']
					],
					exclude: []
				}]);
				done();
			});

		});

		it('should only push unique frame references - node reference', function(done) {
			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function() {
				var result = new Context([$id('target'), $id('target')]);

				assert.deepEqual(result.frames, [{
					node: $id('target'),
					include: [],
					exclude: []
				}]);
				done();
			});

		});

		it('should filter out invisible frames', function(done) {

			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function() {
				var frame = $id('target');
				var orig = axe.utils.isHidden;
				var success = false;

				axe.utils.isHidden = function(actual) {
					assert.equal(actual, frame);
					success = true;

					return true;
				};

				var result = new Context([$id('target')]);

				assert.deepEqual(result.frames, []);
				axe.utils.isHidden = orig;
				assert.isTrue(success, 'axe.utils.isHidden was called');
				done();
			});

		});

		it('should not filter out visible frames', function(done) {

			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function() {
				var frame = $id('target');
				var orig = axe.utils.isHidden;
				var success = false;

				axe.utils.isHidden = function(actual) {
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

				axe.utils.isHidden = orig;
				assert.isTrue(success, 'axe.utils.isHidden was called');
				done();
			});

		});

		describe('throwing errors', function () {
			// jshint unused:false
			var isInFrame;

			beforeEach(function () {
				isInFrame = axe.utils.respondable.isInFrame;
			});
			afterEach(function () {
				axe.utils.respondable.isInFrame = isInFrame;
			});

			it('should throw when no elements match the context', function () {
				fixture.innerHTML = '<div id="foo"></div>';
				assert.throws(function () {
					var ctxt = new Context('#notAnElement');
				}, Error, 'No elements found for include in page Context');
			});

			it('should throw when no elements match the context inside a frame', function () {
				axe.utils.respondable.isInFrame = function () {
					return true;
				};

				fixture.innerHTML = '<div id="foo"></div>';
				assert.throws(function () {
					var ctxt = new Context('#notAnElement');
				}, Error, 'No elements found for include in frame Context');
			});
		});

		it('should throw when frame could not be found', function (done) {
			fixture.innerHTML = '<div id="outer"></div>';
			iframeReady('../mock/frames/context.html', $id('outer'), 'target', function() {
				assert.throws(function () {
					var ctxt;
					ctxt = new Context(['#notAFrame', '#foo']);
				});
				done();
			});

		});

	});

	describe('object definition', function() {
		it('should assign include/exclude', function() {

			assert.deepEqual(new Context({
				include: ['#fixture'],
				exclude: ['#mocha']
			}), {
				include: [document.getElementById('fixture')],
				exclude: [document.getElementById('mocha')],
				initiator: true,
				page: false,
				frames: []
			});

		});
		it('should disregard bad input, non-matching selectors', function() {

			assert.deepEqual(new Context({
				include: ['#fixture', '#monkeys'],
				exclude: ['#bananas']
			}), {
				include: [document.getElementById('fixture')],
				exclude: [],
				initiator: true,
				page: false,
				frames: []
			});
		});
		it('should disregard bad input (null)', function() {

			var result = new Context();

			assert.lengthOf(result.include, 1);
			assert.equal(result.include[0], document);

			assert.lengthOf(result.exclude, 0);

			assert.isTrue(result.initiator);
			assert.isTrue(result.page);

			assert.lengthOf(result.frames, 0);
		});

		it('should default include to document', function () {
			var result = new Context({ exclude: ['#fixture'] });
			assert.lengthOf(result.include, 1);
			assert.equal(result.include[0], document);

			assert.lengthOf(result.exclude, 1);
			assert.equal(result.exclude[0], $id('fixture'));

			assert.isTrue(result.initiator);
			assert.isTrue(result.page);

			assert.lengthOf(result.frames, 0);

		});

		it('should default empty include to document', function () {
			var result = new Context({ include: [], exclude: [] });
			assert.lengthOf(result.include, 1);
			assert.equal(result.include[0], document);
		});

	});

	describe('initiator', function() {
		it('should not be clobbered', function() {

			var result = new Context({
				initiator: false
			});
			assert.lengthOf(result.include, 1);
			assert.equal(result.include[0], document);

			assert.lengthOf(result.exclude, 0);

			assert.isFalse(result.initiator);
			assert.isTrue(result.page);

			assert.lengthOf(result.frames, 0);

		});

		// document.hasOwnProperty is undefined in Firefox content scripts
		it('should not throw given really weird circumstances when hasOwnProperty is deleted from a document node?', function() {
			//jshint -W001
			var spec = document.implementation.createHTMLDocument('ie is dumb');
			spec.hasOwnProperty = undefined;
			var result = new Context(spec);

			assert.lengthOf(result.include, 1);
			assert.equal(result.include[0], spec);

			assert.lengthOf(result.exclude, 0);

			assert.isTrue(result.initiator);
			assert.isFalse(result.page);

			assert.lengthOf(result.frames, 0);
		});
	});

	describe('page', function() {
		it('should be true if given an entire document', function() {
			assert.isTrue(new Context(document).page);
		});
		it('should be true if given falsey parameter', function() {
			assert.isTrue(new Context(null).page);
			assert.isTrue(new Context().page);
			assert.isTrue(new Context(false).page);
		});

	});
});
