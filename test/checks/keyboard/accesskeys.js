describe('accesskeys', function () {
	'use strict';

	var fixture = document.getElementById('fixture');


	var checkContext = {
		_relatedNodes: [],
		_data: null,
		data: function (d) {
			this._data = d;
		},
		relatedNodes: function (rn) {
			this._relatedNodes = rn;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._relatedNodes = [];
		checkContext._data = null;
	});

	it('should return true and record accesskey', function () {
		fixture.innerHTML = '<div id="target" accesskey="A"></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.accesskeys.evaluate.call(checkContext, node));

		assert.equal(checkContext._data, node.getAttribute('accesskey'));
		assert.lengthOf(checkContext._relatedNodes, 1);
		assert.equal(checkContext._relatedNodes[0], node);
	});

	describe('after', function () {
		it('should push duplicates onto relatedNodes', function () {
			var results = [
				{ data: 'A', relatedNodes: ['bob'] },
				{ data: 'A', relatedNodes: ['fred'] }
			];

			var result = checks.accesskeys.after(results);

			assert.lengthOf(result, 1);
			assert.equal(result[0].data, 'A');
			assert.lengthOf(result[0].relatedNodes, 1);
			assert.equal(result[0].relatedNodes[0], 'fred');
		});

		it('should remove non-unique accesskeys and toggle result', function () {
			var results = [
				{ data: 'A', relatedNodes: ['bob'] },
				{ data: 'A', relatedNodes: ['joe'] },
				{ data: 'B', relatedNodes: ['fred'] }
			];

			var result = checks.accesskeys.after(results);

			assert.lengthOf(result, 2);
			assert.isTrue(result[0].result);
			assert.isFalse(result[1].result);
		});

		it('should consider accesskeys with different cases as the same result', function () {
			var result = checks.accesskeys.after([
				{ data: 'A', relatedNodes: ['bob'] },
				{ data: 'a', relatedNodes: ['fred'] }
			]);

			assert.lengthOf(result, 1);
			assert.equal(result[0].data, 'A');
			assert.lengthOf(result[0].relatedNodes, 1);
			assert.equal(result[0].relatedNodes[0], 'fred');
		});
	});

});
