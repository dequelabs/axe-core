
describe('utils.extend', function () {
	'use strict';

	it('should merge properties', function () {
		var obj = utils.extend({}, {
			cats: 'meow',
			dogs: 'woof'
		});
		assert.equal(Object.keys(obj).length, 2);
		assert.equal(obj.cats, 'meow');
		assert.equal(obj.dogs, 'woof');
	});

	it('should merge nested objects ', function () {
		var obj = utils.extend({
			fish: 1
		},
		{
			cats: 'meow',
			dogs: 'woof'
		});
		assert.equal(Object.keys(obj).length, 3);
		assert.equal(obj.fish, 1);
		assert.equal(obj.cats, 'meow');
		assert.equal(obj.dogs, 'woof');
	});

	it('should deep extend nested objects', function () {
		var obj = utils.extend({
			fish: 1,
			cats: {
				fred: 1
			}
		},
		{
			fish: 2,
			cats: {
				billy: 'bob'
			},
			dogs: 'woof'
		});
		assert.deepEqual(obj, {
			fish: 2,
			dogs: 'woof',
			cats: {
				billy: 'bob'
			}
		});
	});

	it('should override same properties', function () {
		var obj = utils.extend({
			cats: 'bob'
		},
		{
			cats: 'billy'
		});
		assert.equal(obj.cats, 'billy');
	});

	it('should clone arrays', function () {
		var obj1 = {
			arr: [ 0, 1, 2 ]
		};
		var obj2 = {
			arr: [ 3, 4, 5 ]
		};
		var combined = utils.extend(obj1, obj2);
		assert.deepEqual(obj1, combined);
		obj2.arr.push(6);
		assert.notEqual(obj2.arr, combined.arr);
	});

	it('should clone null values', function () {
		var obj = utils.extend({
			foo: 4
		},
		{
			foo: null
		});
		assert.equal(obj.foo, null);
	});

	it('should deep extend nested objects (still?)', function () {
		var obj = utils.extend({
			foo: {
				bar: 1
			}
		},
		{
			foo: {
				baz: 2
			}
		}, true);
		assert.deepEqual(obj, { foo: { bar: 1, baz: 2 }});
	});

});
