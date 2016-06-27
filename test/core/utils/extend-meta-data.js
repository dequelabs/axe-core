
describe('axe.utils.extend', function () {
	'use strict';

	it('should merge properties', function () {
		var src = {
			cats: 'fail',
			dogs: 'fail'
		};

		axe.utils.extendMetaData(src, {
			cats: 'meow',
			dogs: 'woof'
		});
		assert.equal(Object.keys(src).length, 2);
		assert.equal(src.cats, 'meow');
		assert.equal(src.dogs, 'woof');
	});

	it('should execute any found functions', function () {
		var src = {
			cats: 'fail',
			dogs: 'fail'
		};
		axe.utils.extendMetaData(src, {
			cats: function (ctxt) {
				assert.equal(ctxt, src);
				return 'meow';
			},
			dogs: 'woof'
		});
		assert.equal(Object.keys(src).length, 2);
		assert.equal(src.cats, 'meow');
		assert.equal(src.dogs, 'woof');
	});
	it('should catch exceptions in functions and default to `null`', function () {
		var src = {
			cats: 'fail',
			dogs: 'fail'
		};
		axe.utils.extendMetaData(src, {
			cats: function () {
				throw new Error('hehe');
			},
			dogs: 'woof'
		});
		assert.equal(Object.keys(src).length, 2);
		assert.isNull(src.cats);
		assert.equal(src.dogs, 'woof');
	});

});
