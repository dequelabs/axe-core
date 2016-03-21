
describe('axe.utils.select', function () {
	'use strict';

	function $id(id) {
		return document.getElementById(id);
	}

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});


	it('should be a function', function () {
		assert.isFunction(axe.utils.select);
	});

	it('should return an array', function () {
		assert.isArray(axe.utils.select('div', { include: [] }));
	});

	describe('selector', function () {

		it('should accept a selector', function () {
			var div = document.createElement('div');
			div.id = 'monkeys';
			fixture.appendChild(div);

			var result = axe.utils.select('#monkeys', { include: [document] });

			assert.equal(result[0], div);

		});

	});

	describe('context', function () {
		it('should include', function () {
			fixture.innerHTML = '<div id="monkeys"><div id="bananas" class="bananas"></div></div>';

			var result = axe.utils.select('.bananas', {
				include: [$id('monkeys')]
			});

			assert.deepEqual(result, [$id('bananas')]);

		});

		it('should exclude', function () {
			fixture.innerHTML = '<div id="monkeys"><div id="bananas" class="bananas"></div></div>';

			var result = axe.utils.select('.bananas', {
				include: [$id('fixture')],
				exclude: [$id('monkeys')]
			});

			assert.deepEqual(result, []);

		});

		it('should pick the deepest exclude/include - exclude winning', function () {
			fixture.innerHTML = '<div id="include1">' +
				'	<div id="exclude1">' +
				'		<div id="include2">' +
				'			<div id="exclude2">' +
				'				<div class="bananas"></div>' +
				'			</div>' +
				'		</div>' +
				'	</div>' +
				'</div>';


			var result = axe.utils.select('.bananas', {
				include: [$id('include1'), $id('include2')],
				exclude: [$id('exclude1'), $id('exclude2')]
			});

			assert.deepEqual(result, []);

		});

		it('should pick the deepest exclude/include - include winning', function () {
			fixture.innerHTML = '<div id="include1">' +
				'	<div id="exclude1">' +
				'		<div id="include2">' +
				'			<div id="exclude2">' +
				'				<div id="include3">' +
				'					<div id="bananas" class="bananas"></div>' +
				'				</div>' +
				'			</div>' +
				'		</div>' +
				'	</div>' +
				'</div>';


			var result = axe.utils.select('.bananas', {
				include: [$id('include3'), $id('include2'), $id('include1')],
				exclude: [$id('exclude1'), $id('exclude2')]
			});

			assert.deepEqual(result, [$id('bananas')]);

		});

	});

	it('should only contain unique elements', function () {
		fixture.innerHTML = '<div id="monkeys"><div id="bananas" class="bananas"></div></div>';

		var result = axe.utils.select('.bananas', { include: [$id('fixture'), $id('monkeys')] });

		assert.lengthOf(result, 1);
		assert.equal(result[0], $id('bananas'));

	});

	it('should sort by DOM order', function () {
		fixture.innerHTML = '<div id="one"><div id="target1" class="bananas"></div></div>' +
			'<div id="two"><div id="target2" class="bananas"></div></div>';

		var result = axe.utils.select('.bananas', { include: [$id('two'), $id('one')] });

		assert.deepEqual(result, [$id('target1'), $id('target2')]);


	});



});