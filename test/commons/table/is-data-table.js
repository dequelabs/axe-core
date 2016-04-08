describe('table.isDataTable', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be false if the table has role=presentation', function () {
		fixture.innerHTML = '<table role="presentation">' +
			'<thead><tr><th>1</th><th>2</th></tr></thead>' +
			'<tbody><tr><td>One</td><td>Two</td></tr></tbody>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));
	});

	it('should be false if the table has role=none', function () {
		fixture.innerHTML = '<table role="none">' +
			'<thead><tr><th>1</th><th>2</th></tr></thead>' +
			'<tbody><tr><td>One</td><td>Two</td></tr></tbody>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table is inside an editable area', function () {

		fixture.innerHTML = '<div contenteditable="true">' +
			'<table>' +
			'<thead><tr><th>1</th><th>2</th></tr></thead>' +
			'<tbody><tr><td>One</td><td>Two</td></tr></tbody>' +
			'</table>' +
			'</div>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a role of grid', function () {
		fixture.innerHTML = '<table role="grid"></table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a role of treegrid', function () {
		fixture.innerHTML = '<table role="treegrid"></table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the element has a role of table', function () {
		fixture.innerHTML = '<div role="table"></div>';

		var node = fixture.querySelector('[role="table"]');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	describe('should be true if the table has a landmark role', function () {
		it('application', function () {
			fixture.innerHTML = '<table role="application"></table>';

			var node = fixture.querySelector('table');
			assert.isTrue(axe.commons.table.isDataTable(node));
		});
		it('banner', function () {
			fixture.innerHTML = '<table role="banner"></table>';

			var node = fixture.querySelector('table');
			assert.isTrue(axe.commons.table.isDataTable(node));
		});
		it('complementary', function () {
			fixture.innerHTML = '<table role="complementary"></table>';

			var node = fixture.querySelector('table');
			assert.isTrue(axe.commons.table.isDataTable(node));
		});
		it('contentinfo', function () {
			fixture.innerHTML = '<table role="contentinfo"></table>';

			var node = fixture.querySelector('table');
			assert.isTrue(axe.commons.table.isDataTable(node));
		});
		it('form', function () {
			fixture.innerHTML = '<table role="form"></table>';

			var node = fixture.querySelector('table');
			assert.isTrue(axe.commons.table.isDataTable(node));
		});
		it('main', function () {
			fixture.innerHTML = '<table role="main"></table>';

			var node = fixture.querySelector('table');
			assert.isTrue(axe.commons.table.isDataTable(node));
		});
		it('navigation', function () {
			fixture.innerHTML = '<table role="navigation"></table>';

			var node = fixture.querySelector('table');
			assert.isTrue(axe.commons.table.isDataTable(node));
		});
		it('search', function () {
			fixture.innerHTML = '<table role="search"></table>';

			var node = fixture.querySelector('table');
			assert.isTrue(axe.commons.table.isDataTable(node));
		});

	});

	it('should be false if the table has datatable=0', function () {
		fixture.innerHTML = '<table datatable="0">' +
			'<thead><tr><th>1</th><th>2</th></tr></thead>' +
			'<tbody><tr><td>One</td><td>Two</td></tr></tbody>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a summary attribute', function () {
		fixture.innerHTML = '<table summary="Hello">' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a caption element', function () {
		fixture.innerHTML = '<table>' +
			'<caption>Hello</caption>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a col element', function () {
		fixture.innerHTML = '<table>' +
			'<col>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a colgroup element', function () {
		fixture.innerHTML = '<table>' +
			'<colgroup></colgroup>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a thead element', function () {
		fixture.innerHTML = '<table>' +
			'<thead></thead>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});


	it('should be true if the table has a tfoot element', function () {
		fixture.innerHTML = '<table>' +
			'<tfoot></tfoot>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a th element', function () {
		fixture.innerHTML = '<table>' +
			'<tr><th></th></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a rowheader', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td role="rowheader"></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a columnheader', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td role="columnheader"></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a cell with headers attribute', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td headers="yes"></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a cell with scope attribute', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td scope="col"></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a cell with abbr attribute', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td abbr="yes"></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be true if the table has a cell with an abbr element as a single child', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td><div><abbr>ok</abbr></div></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));

		fixture.innerHTML = '<table>' +
			'<tr><td><abbr>ok</abbr><div></div></td></tr>' +
			'</table>';

		node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));

		fixture.innerHTML = '<table>' +
			'<tr><td><abbr>ok</abbr></td></tr>' +
			'</table>';

		node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));
	});

	it('should be false if it has a nested table', function () {
		fixture.innerHTML = '<table id="out"><tr><td>' +
			'<table><tr><td></td></tr></table>' +
			'</td></tr></table>';


		var node = fixture.querySelector('#out');
		assert.isFalse(axe.commons.table.isDataTable(node));
	});


	it('should be false if it has only one column', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td></tr>' +
			'<tr><td></td></tr>' +
			'</table>';


		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));

	});

	it('should be false if it has only one row', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><td></td></tr>' +
			'</table>';


		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));

	});

	it('should be true if it has 5 or more columns', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><td></td><td></td><td></td><td></td></tr>' +
			'<tr><td></td><td></td><td></td><td></td><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));

	});

	it('should be true if it has borders around cells', function () {
		fixture.innerHTML = '<table border="1">' +
			'<tr><td></td><td></td></tr>' +
			'<tr><td></td><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));

	});

	it('should be true if it has zebra rows', function () {
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
			return;
		}
		fixture.innerHTML = '<table>' +
			'<tr><td></td><td></td></tr>' +
			'<tr style="background: #fc0"><td></td><td></td></tr>' +
			'<tr><td></td><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));

	});

	it('should be true if it has zebra rows - background image', function () {
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
			return;
		}
		fixture.innerHTML = '<table>' +
			'<tr><td></td><td></td></tr>' +
			'<tr style="background-image: url(data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOy' +
			'DZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQ' +
			'KGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7)"><td></td><td></td></tr>' +
			'<tr><td></td><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));

	});
	it('should be true if it has 20 or more rows', function () {
		fixture.innerHTML = '<table>' +
			(new Array(21).join('<tr><td></td><td></td><td></td></tr>')) +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));

	});
	it('should be false if its width is 95% of the document width', function () {
		fixture.innerHTML = '<table style="width: 95.5%">' +
			(new Array(3).join('<tr><td></td><td></td><td></td></tr>')) +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));

	});

	it('should be false if it has less than 10 cells', function () {
		fixture.innerHTML = '<table>' +
			(new Array(4).join('<tr><td></td><td></td><td></td></tr>')) +
			'</table>';


		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));

	});

	it('should be false if has an iframe element descendent', function () {
		fixture.innerHTML = '<table>' +
			(new Array(4).join('<tr><td></td><td></td><td></td></tr>')) +
			'<tr><td><iframe src="javascript: void 0;"></iframe></td><td></td><td></td></tr>' +
			'</table>';


		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));

	});

	it('should be false if has an object element descendent', function () {
		fixture.innerHTML = '<table>' +
			(new Array(4).join('<tr><td></td><td></td><td></td></tr>')) +
			'<tr><td><object></object></td><td></td><td></td></tr>' +
			'</table>';


		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));

	});

	it('should be false if has an embed element descendent', function () {
		fixture.innerHTML = '<table>' +
			(new Array(4).join('<tr><td></td><td></td><td></td></tr>')) +
			'<tr><td><embed></td><td></td><td></td></tr>' +
			'</table>';


		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));

	});

	// Causing sauce labs tests to fail & don't really care about applets
	it.skip('should be false if has an applet element descendent', function () {
		fixture.innerHTML = '<table>' +
			(new Array(4).join('<tr><td></td><td></td><td></td></tr>')) +
			'<tr><td><applet></applet></td><td></td><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isFalse(axe.commons.table.isDataTable(node));
	});

	it('should otherwise be true', function () {
		fixture.innerHTML = '<table>' +
			(new Array(4).join('<tr><td></td><td></td><td></td><td></td></tr>')) +
			'</table>';


		var node = fixture.querySelector('table');
		assert.isTrue(axe.commons.table.isDataTable(node));

	});


});
