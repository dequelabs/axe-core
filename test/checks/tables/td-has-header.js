describe('td-has-header', function () {
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

	it('should not be fooled by rowspan and colspan', function () {
 		fixture.innerHTML = '<table>' +
  			'<thead>' +
			'    <tr>' +
			'      <td rowspan="2">Species</td>' +
			'      <td colspan="2">Info</td>' +
			'    </tr>' +
			'    <tr>' +
			'      <th>Name</th>' +
			'      <th>Age</th>' +
			'    </tr>' +
			'  </thead>' +
			'  <tbody>' +
			'    <tr>' +
			'      <td>Gorilla</td>' +
			'      <td>Koko</td>' +
			'      <td>44</td>' +
			'    </tr>' +
			'    <tr>' +
			'      <td>Human</td>' +
			'      <td>Matt</td>' +
			'      <td>33</td>' +
			'    </tr>' +
			'  </tbody>' +
			'</table>';
		var node = fixture.querySelector('table');
		var result = checks['td-has-header'].evaluate.call(checkContext, node);

		assert.isFalse(result);
		assert.equal(checkContext._relatedNodes.length, 4);
	});

	it('should return true each non-empty cell has a row header', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th>hi</th> <td>hello</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-has-header'].evaluate.call(checkContext, node));
	});

	it('should return true each non-empty cell has a column header', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th>hi</th> <th>hello</th> </tr>' +
			'  <tr> <td>hi</td> <td>hello</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-has-header'].evaluate.call(checkContext, node));
	});

	it('should return true each non-empty cell has aria-label', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <td aria-label="one">hi</td> <td aria-label="two">hello</td> </tr>' +
			'  <tr> <td aria-label="one">hi</td> <td aria-label="two">hello</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-has-header'].evaluate.call(checkContext, node));
	});

	it('should return true each non-empty cell has aria-labelledby', function () {
		fixture.innerHTML = '<div id="one">one</div><div id="two">two</div>' +
			'<table>' +
			'  <tr> <td aria-labelledby="one">hi</td> <td aria-labelledby="two">hello</td> </tr>' +
			'  <tr> <td aria-labelledby="one">hi</td> <td aria-labelledby="two">hello</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-has-header'].evaluate.call(checkContext, node));
	});

	it('should return true each non-empty cell has a headers attribute', function () {
		// This will fail under td-headers-attr because the headers must be inside the table
		fixture.innerHTML = '<div id="one">one</div><div id="two">two</div>' +
			'<table>' +
			'  <tr> <td headers="one">hi</td> <td headers="two">hello</td> </tr>' +
			'  <tr> <td headers="one">hi</td> <td headers="two">hello</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-has-header'].evaluate.call(checkContext, node));
	});

	it('should return true there is at least one non-empty header', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th>hi</th> <th>hello</th> </tr>' +
			'  <tr> <th></th> <td>hello</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-has-header'].evaluate.call(checkContext, node));
	});

	it('should return true if the only data cells are empty', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <td></td> <td></td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(checks['td-has-header'].evaluate.call(checkContext, node));
	});

	it('should return false if a cell has no headers', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <td>hi</td> <td>hello</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['td-has-header'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.rows[0].cells[0], node.rows[0].cells[1]
		]);
	});

	it('should return false if a cell has no headers - complex table', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <td colspan="3">Psuedo-Caption</td> </tr>' +
			'  <tr> <td>hi</td> <td>hello</td> <td>Ok</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['td-has-header'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.rows[0].cells[0], node.rows[1].cells[0], node.rows[1].cells[1], node.rows[1].cells[2]
		]);
	});

	it('should return false if the headers element is empty', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th>Hello</th> <td headers="">goodbye</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['td-has-header'].evaluate.call(checkContext, node));
	});


	it('should return false if the headers element refers to non-existing elements', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th>Hello</th> <td headers="beatles">goodbye</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['td-has-header'].evaluate.call(checkContext, node));
	});

	it('should return false if all headers are empty', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th></th> <th></th> </tr>' +
			'  <tr> <td>hi</td> <td>hello</td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isFalse(checks['td-has-header'].evaluate.call(checkContext, node));
	});
});
