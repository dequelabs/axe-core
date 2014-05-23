/*global Context */

/*

in:

	{
		include: [Node, ['#path', '#to', '.node'], '.hehe', Node, '.balls'],
		exclude: [Node, ['#path', '#to', '#exclude']]
	}

	[Node, ['#path', '#to', '.node'], '.hehe', Node, '.balls']

	Node

	'#selector'


out:
	{
		include: [Node, Node, Node, Node],
		exclude: [Node],
		frames: [{
			node: Node,
			include: [['#to', '.node']],
			exclude: [['#to', '#exclude']]
		}]

	}
 */
describe('Context', function () {
	'use strict';

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

		it('should add frame references to frames - implicit', function () {
			fixture.innerHTML = '<div id="outer"><iframe id="target" src="../mock/frames/context.html"></iframe></div>';

			var result = new Context('#outer');

			assert.deepEqual(result.frames, [{
				node: $id('target'),
				include: [],
				exclude: []
			}]);

		});

		it('should add frame references to frames - explicit', function () {
			fixture.innerHTML = '<div id="outer"><iframe id="target" src="../mock/frames/context.html"></iframe></div>';

			var result = new Context('#target');

			assert.deepEqual(result.frames, [{
				node: $id('target'),
				include: [],
				exclude: []
			}]);

		});

		it('should add frame references to frames - frame selector', function () {
			fixture.innerHTML = '<div id="outer"><iframe id="target" src="../mock/frames/context.html"></iframe></div>';

			var result = new Context([['#target', '#foo']]);

			assert.deepEqual(result.frames, [{
				node: $id('target'),
				include: [['#foo']],
				exclude: []
			}]);

		});

		it('should only push unique frame references', function () {
			fixture.innerHTML = '<div id="outer"><iframe id="target" src="../mock/frames/context.html"></iframe></div>';

			var result = new Context([['#target', '#foo'], ['#target', '#bar']]);

			assert.deepEqual(result.frames, [{
				node: $id('target'),
				include: [['#foo'], ['#bar']],
				exclude: []
			}]);

		});

		it('should default to `document`', function () {
			var result = new Context();
			assert.deepEqual(result.include, [document]);
		});

	});

	describe('object definition', function () {
		it('should accept include array of selectors');

	});
});