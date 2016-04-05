describe('td-headers-attr', function () {
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

	it('returns true no headers attribute is present', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th>hi</th> <td>hello</td> </tr>' +
			'  <tr> <th>hi</th> <td>hello</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-headers-attr'].evaluate.call(checkContext, node));
	});

	it('returns true if a valid header is present', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th id="hi">hello</th> </tr>' +
			'  <tr> <td headers="hi">goodbye</th> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-headers-attr'].evaluate.call(checkContext, node));
	});

	it('returns true if multiple valid headers are present', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th id="hi1">hello</th> <th id="hi2">hello</th> </tr>' +
			'  <tr> <td headers="hi1 \t\n hi2">goodbye</th> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-headers-attr'].evaluate.call(checkContext, node));
	});

	it('returns true with an empty header', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th id="hi1"></th> </tr>' +
			'  <tr> <td headers="hi1">goodbye</th> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-headers-attr'].evaluate.call(checkContext, node));
	});

	it('returns true if no headers are present', function () {
		// this is a failure for td-has-header
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th id="hi"> </th> </tr>' +
			'  <tr> <td headers="">goodbye</th> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-headers-attr'].evaluate.call(checkContext, node));
	});

	it('returns false if the header is a table cell', function () {
		var node;

		fixture.innerHTML =
			'<table>' +
			'  <tr> <th> <span id="hi">hello</span> </th> </tr>' +
			'  <tr> <td headers="h1">goodbye</th> </tr>' +
			'</table>';
		node = fixture.querySelector('table');
		assert.isFalse(checks['td-headers-attr'].evaluate.call(checkContext, node));

		fixture.innerHTML =
			'<span id="hi">hello</span>' +
			'<table>' +
			'  <tr> <th></th> </tr>' +
			'  <tr> <td headers="h1">goodbye</th> </tr>' +
			'</table>';
		node = fixture.querySelector('table');
		assert.isFalse(checks['td-headers-attr'].evaluate.call(checkContext, node));


		fixture.innerHTML =
			'<table id="hi">' +
			'  <tr> <th>hello</th> </tr>' +
			'  <tr> <td headers="h1">goodbye</th> </tr>' +
			'</table>';
		node = fixture.querySelector('table');
		assert.isFalse(checks['td-headers-attr'].evaluate.call(checkContext, node));
	});

	it('returns false if the header refers to the same cell', function () {
		fixture.innerHTML =
			'<table id="hi">' +
			'  <tr> <th>hello</th> </tr>' +
			'  <tr> <td id="bye" headers="bye">goodbye</th> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isFalse(checks['td-headers-attr'].evaluate.call(checkContext, node));
	});

});
