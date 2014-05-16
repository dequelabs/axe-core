describe('utils.clone', function () {
	'use strict';

	it('should clone an object', function () {
		var obj = {
			cats: true,
			dogs: 2,
			fish: [ 0, 1, 2 ]
		};
		var clone = utils.clone(obj);

		obj.cats = false;
		obj.dogs = 1;
		obj.fish[0] = 'stuff';

		assert.strictEqual(clone.cats, true);
		assert.strictEqual(clone.dogs, 2);
		assert.deepEqual(clone.fish, [0, 1, 2]);
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
		var clone = utils.clone(obj);

		obj.cats.fred = 47;
		obj.dogs = 47;
		obj.fish[0] = 'stuff';

		assert.deepEqual(clone.cats, {
			fred: 1,
			billy: 2,
			meow: true
		});

		assert.deepEqual(clone.dogs, {
			spot: 1,
			max: 2,
			woof: [ 0, 1, 2 ]
		});

		assert.deepEqual(clone.fish, [ 0, 1, 2]);
	});

	it('should clone objects with methods', function () {
		var obj = {
			cats: function () { return 'meow'; },
			dogs: function () { return 'woof'; }
		};
		var clone = utils.clone(obj);

		assert.strictEqual(obj.cats, clone.cats);
		assert.strictEqual(obj.dogs, clone.dogs);

		obj.cats = function () {};
		obj.dogs = function () {};

		assert.notStrictEqual(obj.cats, clone.cats);
		assert.notStrictEqual(obj.dogs, clone.dogs);
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
			clone = utils.clone(cat);

		assert.deepEqual(cat.name, clone.name);
		assert.deepEqual(Cat.prototype.bark, clone.bark);
		assert.deepEqual(Cat.prototype.meow, clone.meow);
	});
});
