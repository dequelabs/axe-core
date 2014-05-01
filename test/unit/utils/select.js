
describe('utils.select', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});


	it('should be a function', function () {
		assert.isFunction(utils.select);
	});

	it('should return an array', function () {
		assert.isArray(utils.select('div'));
	});

	describe('selector', function () {

		it('should accept a selector', function () {
			var div = document.createElement('div');
			div.id = 'monkeys';
			fixture.appendChild(div);

			var result = utils.select('#monkeys');

			assert.equal(result[0], div);

		});

		it('should accept a NodeList', function () {
			var divs = [];
			divs.push(document.createElement('div'));
			divs.push(document.createElement('div'));
			divs.push(document.createElement('div'));

			for (var i = 0, l = divs.length; i < l; i++) {
				fixture.appendChild(divs[i]);
			}

			var result = utils.select(divs);

			assert.deepEqual(result, divs);

		});

		it('should accept a single node', function () {
			var div = document.createElement('div');
			div.id = 'monkeys';
			fixture.appendChild(div);

			var result = utils.select(div);

			assert.deepEqual(result, [div]);

		});

	});

	describe('context', function () {

		it('should accept a Node', function () {
			var div = document.createElement('div');
			div.id = 'monkeys';
			document.body.appendChild(div);

			var result = utils.select('#monkeys', fixture);

			assert.deepEqual(result, []);

			fixture.appendChild(div);

			result = utils.select('#monkeys', fixture);

			assert.deepEqual(result, [div]);

		});

		it('should accept a selector', function () {
			var div = document.createElement('div');
			div.id = 'monkeys';
			fixture.appendChild(div);

			var result = utils.select('#monkeys', '#fixture');

			assert.deepEqual(result, [div]);

		});

		it('should accept a list', function () {
			var monkeys = document.createElement('div');
			monkeys.id = 'monkeys';
			fixture.appendChild(monkeys);

			var bananas = document.createElement('div');
			bananas.id = 'bananas';
			fixture.appendChild(bananas);

			var div,
				expected = [];
			for (var i = 0; i < 10; i++) {
				div = document.createElement('div');
				div.innerHTML = i;
				(i % 2 === 0 ? monkeys : bananas).appendChild(div);
				expected.push(div);
			}

			fixture.appendChild(document.createElement('div'));

			var result = utils.select('div', [monkeys, bananas]);

			assert.sameMembers(result, expected);

		});

		it('should sort by document order', function () {
			fixture.innerHTML = '<div id="monkeys"><div class="foo one"></div></div>' +
				'<div id="cats"><div class="foo three"></div></div>' +
				'<div id="bananas"><div class="foo two"></div></div>';

			var slice = [].slice,
				result = utils.select('div', '#bananas, #monkeys, #cats');

			assert.deepEqual(result, slice.call(fixture.getElementsByClassName('foo')));

		});

		it('should sort by document order - list', function () {
			fixture.innerHTML = '<div id="monkeys"><div class="foo one"></div></div>' +
				'<div id="bananas"><div class="foo two"></div></div>';

			var slice = [].slice,
				result = utils.select('div', [fixture.children[1], fixture.children[0]]);

			assert.deepEqual(result, slice.call(fixture.getElementsByClassName('foo')));

		});

		it('should filter out elements not contained by context', function () {
			var monkeys = document.createElement('div');
			monkeys.id = 'monkeys';
			fixture.appendChild(monkeys);

			var div = document.createElement('div');
			fixture.appendChild(div);

			var result = utils.select(div, monkeys);
			assert.deepEqual(result, []);

		});
	});

	it('should only contain unique elements', function () {
		fixture.innerHTML = '<div id="monkeys"><div id="bananas" class="bananas"></div></div>';

		var result = utils.select('.bananas', '#fixture, #monkeys');

		assert.lengthOf(result, 1);
		assert.equal(result[0], document.getElementById('bananas'));

	});



});