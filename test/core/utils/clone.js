describe('utils.clone', function () {
	'use strict';
	var clone = axe.utils.clone;

	it('should clone an object', function () {
		var obj = {
			cats: true,
			dogs: 2,
			fish: [ 0, 1, 2 ]
		};
		var c = clone(obj);

		obj.cats = false;
		obj.dogs = 1;
		obj.fish[0] = 'stuff';

		assert.strictEqual(c.cats, true);
		assert.strictEqual(c.dogs, 2);
		assert.deepEqual(c.fish, [0, 1, 2]);
	});

	it('should clone nested objects', function () {
		var obj = {
			cats: {
				fred: 1,
				billy: 2,
				meow: true
			},
			dogs: {
				spot: 1,
				max: 2,
				woof: [ 0, 1, 2 ]
			},
			fish: [ 0, 1, 2 ]
		};
		var c = clone(obj);

		obj.cats.fred = 47;
		obj.dogs = 47;
		obj.fish[0] = 'stuff';

		assert.deepEqual(c.cats, {
			fred: 1,
			billy: 2,
			meow: true
		});

		assert.deepEqual(c.dogs, {
			spot: 1,
			max: 2,
			woof: [ 0, 1, 2 ]
		});

		assert.deepEqual(c.fish, [ 0, 1, 2]);
	});

	it('should clone objects with methods', function () {
		var obj = {
			cats: function () { return 'meow'; },
			dogs: function () { return 'woof'; }
		};
		var c = clone(obj);

		assert.strictEqual(obj.cats, c.cats);
		assert.strictEqual(obj.dogs, c.dogs);

		obj.cats = function () {};
		obj.dogs = function () {};

		assert.notStrictEqual(obj.cats, c.cats);
		assert.notStrictEqual(obj.dogs, c.dogs);
	});

	it('should clone prototypes', function () {
		function Cat(name) {
			this.name = name;
		}

		Cat.prototype.meow = function () {
			return 'meow';
		};

		Cat.prototype.bark = function () {
			return 'cats dont bark';
		};

		var cat = new Cat('Fred'),
			c = clone(cat);

		assert.deepEqual(cat.name, c.name);
		assert.deepEqual(Cat.prototype.bark, c.bark);
		assert.deepEqual(Cat.prototype.meow, c.meow);
	});
});
