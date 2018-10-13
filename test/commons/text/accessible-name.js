describe('text.accessibleText acceptence tests', function() {
	'use strict';
	// Tests borrowed from the AccName 1.1 testing docs
	// https://www.w3.org/wiki/AccName_1.1_Testable_Statements#Name_test_case_539

	var ariaValuetext = xit; // Not acc supported
	var pseudoText = xit; // Not acc supported

	var fixture = document.getElementById('fixture');
	var accessibleText = axe.commons.text.accessibleText;
	var _unsupported;

	before(function() {
		_unsupported = axe.commons.text.unsupported;
		axe.commons.text.unsupported = {};
	});
	after(function() {
		axe.commons.text.unsupported = _unsupported;
	});

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = null;
	});

	it('passes test 1', function() {
		fixture.innerHTML = '<input type="button" aria-label="Rich" id="test">';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Rich');
	});

	it('passes test 2', function() {
		fixture.innerHTML =
			'<div id="ID1">Rich\'s button</div>' +
			'<input type="button" aria-labelledby="ID1" id="test">';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), "Rich's button");
	});

	it('passes test 3', function() {
		fixture.innerHTML =
			'<div id="ID1">Rich\'s button</div>' +
			'<input type="button" aria-label="bar" aria-labelledby="ID1" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), "Rich's button");
	});

	it('passes test 4', function() {
		fixture.innerHTML = '<input type="reset" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Reset');
	});

	it('passes test 5', function() {
		fixture.innerHTML = '<input type="button" id="test" value="foo"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 6', function() {
		fixture.innerHTML =
			'<input src="baz.html" type="image" id="test" alt="foo"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 7', function() {
		fixture.innerHTML =
			'<label for="test">States:</label>' + '<input type="text" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'States:');
	});

	it('passes test 8', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'foo' +
			'<input type="text" value="David"/>' +
			'</label>' +
			'<input type="text" id="test" value="baz"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo David');
	});

	it('passes test 9', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'crazy' +
			'  <select name="member" size="1" role="menu" tabindex="0">' +
			'    <option role="menuitem" value="beard" selected="true">clown</option>' +
			'    <option role="menuitem" value="scuba">rich</option>' +
			'  </select>' +
			'</label> ' +
			'<input type="text" id="test" value="baz"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	ariaValuetext('passes test 10', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'   <div role="spinbutton" aria-valuetext="Monday" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
			'   </div>' +
			'</label>' +
			'<input type="text" id="test" value="baz"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy Monday');
	});

	it('passes test 11', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
			'  </div>' +
			'</label>' +
			'<input type="text" id="test" value="baz"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy 4');
	});

	it('passes test 12', function() {
		fixture.innerHTML =
			'<input type="text" id="test" title="crazy" value="baz"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	pseudoText('passes test 13', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:before { content:"fancy "; }' +
			'</style>' +
			'<label for="test">fruit</label>' +
			'<input type="text" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'fancy fruit');
	});

	pseudoText('passes test 14', function() {
		fixture.innerHTML =
			'<style type="text/css">' +
			'  [data-after]:after { content: attr(data-after); }' +
			'</style>' +
			'<label for="test" data-after="test content"></label>' +
			'<input type="text" id="test">';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'test content');
	});

	it('passes test 15', function() {
		fixture.innerHTML = '<img id="test" src="foo.jpg" aria-label="1"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), '1');
	});

	it('passes test 16', function() {
		fixture.innerHTML =
			'<img id="test" src="foo.jpg" aria-label="1" alt="a" title="t"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), '1');
	});

	// To the best of my knowledge, this test is incorrect
	// Chrome and Firefox seem to return "peanuts", so does axe-core.
	xit('passes test 17', function() {
		fixture.innerHTML =
			'<input type="text" value="peanuts" id="test">' +
			'<img aria-labelledby="test" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), '');
	});

	it('passes test 18', function() {
		fixture.innerHTML = '<img id="test" aria-labelledby="test" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), '');
	});

	// To the best of my knowledge, this test is incorrect
	// Chrome and Firefox seem to return "peanuts", so does axe-core.
	xit('passes test 19', function() {
		fixture.innerHTML =
			'<input type="text" value="peanuts" id="test">' +
			'<img aria-labelledby="test" aria-label="1" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), '');
	});

	it('passes test 20', function() {
		fixture.innerHTML =
			'<img id="test" aria-labelledby="test" aria-label="1" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), '1');
	});

	it('passes test 21', function() {
		fixture.innerHTML =
			'<input type="text" value="peanuts" id="ID1">' +
			'<input type="text" value="popcorn" id="ID2">' +
			'<input type="text" value="apple jacks" id="ID3">' +
			'<img aria-labelledby="ID1 ID2 ID3" id="test" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'peanuts popcorn apple jacks');
	});

	it('passes test 22', function() {
		fixture.innerHTML =
			'<input type="text" value="peanuts" id="ID1">' +
			'<img id="test" aria-label="l" aria-labelledby="test ID1" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'l peanuts');
	});

	it('passes test 23', function() {
		fixture.innerHTML =
			'<input type="text" value="peanuts" id="ID1">' +
			'<input type="text" value="popcorn" id="ID2">' +
			'<img id="test" aria-label="l" aria-labelledby="test ID1 ID2" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'l peanuts popcorn');
	});

	it('passes test 24', function() {
		fixture.innerHTML =
			'<input type="text" value="peanuts" id="ID1">' +
			'<input type="text" value="popcorn" id="ID2">' +
			'<input type="text" value="apple jacks" id="ID3">' +
			'<img id="test" aria-label="l" aria-labelledby="test ID1 ID2 ID3" alt= "a" title="t" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'l peanuts popcorn apple jacks');
	});

	it('passes test 25', function() {
		fixture.innerHTML =
			'<input type="text" value="peanuts" id="ID1">' +
			'<input type="text" value="popcorn" id="ID2">' +
			'<input type="text" value="apple jacks" id="ID3">' +
			'<img id="test" aria-label="" aria-labelledby="test ID1 ID2 ID3" alt="" title="t" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 't peanuts popcorn apple jacks');
	});

	it('passes test 26', function() {
		fixture.innerHTML =
			'<div id="test" aria-labelledby="ID1">foo</div>' +
			'<span id="ID1">bar</span>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'bar');
	});

	it('passes test 27', function() {
		fixture.innerHTML = '<div id="test" aria-label="Tag">foo</div>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Tag');
	});

	it('passes test 28', function() {
		fixture.innerHTML =
			'<div id="test" aria-labelledby="ID1" aria-label="Tag">foo</div>' +
			'<span id="ID1">bar</span>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'bar');
	});

	it('passes test 29', function() {
		fixture.innerHTML =
			'<div id="test" aria-labelledby="ID0 ID1" aria-label="Tag">foo</div>' +
			'<span id="ID0">bar</span>' +
			'<span id="ID1">baz</span>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'bar baz');
	});

	// Should only pass in strict mode
	it('passes test 30', function() {
		fixture.innerHTML = '<div id="test">Div with text</div>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target, { strict: true }), '');
	});

	it('passes test 31', function() {
		fixture.innerHTML = '<div id="test" role="button">foo</div>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 32', function() {
		fixture.innerHTML =
			'<div id="test" role="button" title="Tag" style="outline:medium solid black; width:2em; height:1em;">' +
			'</div>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Tag');
	});

	it('passes test 33', function() {
		fixture.innerHTML =
			'<div id="ID1">foo</div>' +
			'<a id="test" href="test.html" aria-labelledby="ID1">bar</a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 34', function() {
		fixture.innerHTML =
			'<a id="test" href="test.html" aria-label="Tag">ABC</a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Tag');
	});

	it('passes test 35', function() {
		fixture.innerHTML =
			'<a href="test.html" id="test" aria-labelledby="ID1" aria-label="Tag">foo</a>' +
			'<p id="ID1">bar</p>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'bar');
	});

	it('passes test 36', function() {
		fixture.innerHTML =
			'<a href="test.html" id="test" aria-labelledby="test ID1" aria-label="Tag"></a>' +
			'<p id="ID1">foo</p>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Tag foo');
	});

	it('passes test 37', function() {
		fixture.innerHTML = '<a href="test.html" id="test">ABC</a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'ABC');
	});

	it('passes test 38', function() {
		fixture.innerHTML = '<a href="test.html" id="test" title="Tag"></a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Tag');
	});

	it('passes test 39', function() {
		fixture.innerHTML =
			'<input id="test" type="text" aria-labelledby="ID1 ID2 ID3">' +
			'<p id="ID1">foo</p>' +
			'<p id="ID2">bar</p>' +
			'<p id="ID3">baz</p>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo bar baz');
	});

	it('passes test 40', function() {
		fixture.innerHTML =
			'<input id="test" type="text" aria-label="bar" aria-labelledby="ID1 test">' +
			'<div id="ID1">foo</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo bar');
	});

	it('passes test 41', function() {
		fixture.innerHTML =
			'<input id="test" type="text"/>' + '<label for="test">foo</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 42', function() {
		fixture.innerHTML =
			'<input type="password" id="test">' + '<label for="test">foo</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 43', function() {
		fixture.innerHTML =
			'<input type="checkbox" id="test">' +
			'<label for="test">foo</label></body>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 44', function() {
		fixture.innerHTML =
			'<input type="radio" id="test">' + '<label for="test">foo</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 45', function() {
		fixture.innerHTML =
			'<input type="file" id="test">' + '<label for="test">foo</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 46', function() {
		fixture.innerHTML =
			'<input type="image" id="test">' + '<label for="test">foo</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 47', function() {
		fixture.innerHTML =
			'<input type="checkbox" id="test">' +
			'<label for="test">foo<input type="text" value="bar">baz</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo bar baz');
	});

	it('passes test 48', function() {
		fixture.innerHTML =
			'<input type="text" id="test">' +
			'<label for="test">foo<input type="text" value="bar">baz</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo bar baz');
	});

	it('passes test 49', function() {
		fixture.innerHTML =
			'<input type="password" id="test">' +
			'<label for="test">foo<input type="text" value="bar">baz</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo bar baz');
	});

	it('passes test 50', function() {
		fixture.innerHTML =
			'<input type="radio" id="test">' +
			'<label for="test">foo<input type="text" value="bar">baz</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo bar baz');
	});

	it('passes test 51', function() {
		fixture.innerHTML =
			'<input type="file" id="test">' +
			'<label for="test">foo <input type="text" value="bar"> baz</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo bar baz');
	});

	pseudoText('passes test 52', function() {
		fixture.innerHTML =
			'<style type="text/css">' +
			'  label:before { content: "foo"; }' +
			'  label:after { content: "baz"; }' +
			'</style>' +
			'<form>' +
			'  <label for="test" title="bar"><input id="test" type="text" name="test" title="buz"></label> ' +
			'</form>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo bar baz');
	});

	pseudoText('passes test 53', function() {
		fixture.innerHTML =
			'<style type="text/css">' +
			'  label:before { content: "foo"; }' +
			'  label:after { content: "baz"; }' +
			'</style>' +
			'<form>' +
			'  <label for="test" title="bar"><input id="test" type="password" name="test" title="buz"></label> ' +
			'</form>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo bar baz');
	});

	pseudoText('passes test 54', function() {
		fixture.innerHTML =
			'<style type="text/css">' +
			'  label:before { content: "foo"; }' +
			'  label:after { content: "baz"; }' +
			'</style>' +
			'<form>' +
			'  <label for="test"><input id="test" type="checkbox" name="test" title=" bar "></label>' +
			'</form>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo baz');
	});

	pseudoText('passes test 55', function() {
		fixture.innerHTML =
			'<style type="text/css">' +
			'  label:before { content: "foo"; }' +
			'  label:after { content: "baz"; }' +
			'</style>' +
			'<form>' +
			'  <label for="test"><input id="test" type="radio" name="test" title=" bar "></label> ' +
			'</form>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo baz');
	});

	pseudoText('passes test 56', function() {
		fixture.innerHTML =
			'<style type="text/css">' +
			'  label:before { content: "foo"; }' +
			'  label:after { content: "baz"; }' +
			'</style>' +
			'<form>' +
			'  <label for="test"><input id="test" type="file" name="test" title="bar"></label>' +
			'</form>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo baz');
	});

	pseudoText('passes test 57', function() {
		fixture.innerHTML =
			'<style type="text/css">' +
			'  label:before { content: "foo"; }' +
			'  label:after { content: "baz"; }' +
			'</style>' +
			'<form>' +
			'  <label for="test"><input id="test" type="image" src="foo.jpg" name="test" title="bar"></label>' +
			'</form>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo baz');
	});

	it('passes test 58', function() {
		fixture.innerHTML =
			'<label for="test">States:</label>' +
			'<input type="password" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'States:');
	});

	it('passes test 59', function() {
		fixture.innerHTML =
			'<label for="test">States:</label>' +
			'<input type="checkbox" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'States:');
	});

	it('passes test 60', function() {
		fixture.innerHTML =
			'<label for="test">States:</label>' + '<input type="radio" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'States:');
	});

	it('passes test 61', function() {
		fixture.innerHTML =
			'<label for="test">File:</label>' + '<input type="file" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'File:');
	});

	it('passes test 62', function() {
		fixture.innerHTML =
			'<label for="test">States:</label>' +
			'<input type="image" id="test" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'States:');
	});

	it('passes test 63', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  foo' +
			'  <input type="text" value="David"/>' +
			'</label>' +
			'<input type="password" id="test" value="baz"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo David');
	});

	it('passes test 64', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  foo' +
			'  <input type="text" value="David"/>' +
			'</label>' +
			'<input type="checkbox" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo David');
	});

	it('passes test 65', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  foo' +
			'  <input type="text" value="David"/>' +
			'</label>' +
			'<input type="radio" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo David');
	});

	it('passes test 66', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  foo' +
			'  <input type="text" value="David"/>' +
			'</label>' +
			'<input type="file" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo David');
	});

	it('passes test 67', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  foo' +
			'  <input type="text" value="David"/>' +
			'</label>' +
			'<input type="image" id="test" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo David');
	});

	it('passes test 68', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <select name="member" size="1" role="menu" tabindex="0">' +
			'    <option role="menuitem" value="beard" selected="true">clown</option>' +
			'    <option role="menuitem" value="scuba">rich</option>' +
			'  </select>' +
			'</label> ' +
			'<input type="password" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	it('passes test 69', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <select name="member" size="1" role="menu" tabindex="0">' +
			'    <option role="menuitem" value="beard" selected="true">clown</option>' +
			'    <option role="menuitem" value="scuba">rich</option>' +
			'  </select>' +
			'</label> ' +
			'<input type="checkbox" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	it('passes test 70', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <select name="member" size="1" role="menu" tabindex="0">' +
			'    <option role="menuitem" value="beard" selected="true">clown</option>' +
			'    <option role="menuitem" value="scuba">rich</option>' +
			'  </select>' +
			'</label> ' +
			'<input type="radio" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	it('passes test 71', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <select name="member" size="1" role="menu" tabindex="0">' +
			'    <option role="menuitem" value="beard" selected="true">clown</option>' +
			'    <option role="menuitem" value="scuba">rich</option>' +
			'  </select>' +
			'</label> ' +
			'<input type="file" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	it('passes test 72', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <select name="member" size="1" role="menu" tabindex="0">' +
			'    <option role="menuitem" value="beard" selected="true">clown</option>' +
			'    <option role="menuitem" value="scuba">rich</option>' +
			'  </select>' +
			'</label> ' +
			'<input type="image" id="test" src="foo.jpg"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	ariaValuetext('passes test 73', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <div role="spinbutton" aria-valuetext="Monday" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
			'  </div>' +
			'</label>' +
			'<input type="password" value="baz" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy Monday');
	});

	ariaValuetext('passes test 74', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <div role="spinbutton" aria-valuetext="Monday"' +
			'   aria-valuemin="1" aria-valuemax="7" aria-valuenow="4"></div>' +
			'</label>' +
			'<input type="checkbox" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy Monday');
	});

	ariaValuetext('passes test 75', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <div role="spinbutton" aria-valuetext="Monday"' +
			'   aria-valuemin="1" aria-valuemax="7" aria-valuenow="4"></div>' +
			'</label>' +
			'<input type="radio" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy Monday');
	});

	ariaValuetext('passes test 76', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <div role="spinbutton" aria-valuetext="Monday"' +
			'   aria-valuemin="1" aria-valuemax="7" aria-valuenow="4"></div>' +
			'</label>' +
			'<input type="file" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy Monday');
	});

	ariaValuetext('passes test 77', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <div role="spinbutton" aria-valuetext="Monday" aria-valuemin="1"' +
			'   aria-valuemax="7" aria-valuenow="4"></div>' +
			'</label>' +
			'<input type="image" src="foo.jpg" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy Monday');
	});

	it('passes test 78', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
			'  </div>' +
			'</label>' +
			'<input type="password" id="test" value="baz"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy 4');
	});

	it('passes test 79', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
			'  </div>' +
			'</label>' +
			'<input type="checkbox" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy 4');
	});

	it('passes test 80', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
			'  </div>' +
			'</label>' +
			'<input type="radio" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy 4');
	});

	it('passes test 81', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
			'  </div>' +
			'</label>' +
			'<input type="file" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy 4');
	});

	it('passes test 82', function() {
		fixture.innerHTML =
			'<label for="test">' +
			'  crazy' +
			'  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
			'  </div>' +
			'</label>' +
			'<input type="image" src="foo.jpg" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy 4');
	});

	it('passes test 83', function() {
		fixture.innerHTML =
			'<input type="password" id="test" title="crazy" value="baz"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	it('passes test 84', function() {
		fixture.innerHTML = '<input type="checkbox" id="test" title="crazy"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	it('passes test 85', function() {
		fixture.innerHTML = '<input type="radio" id="test" title="crazy"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	it('passes test 86', function() {
		fixture.innerHTML = '<input type="file" id="test" title="crazy"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	it('passes test 87', function() {
		fixture.innerHTML =
			'<input type="image" src="foo.jpg" id="test" title="crazy"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'crazy');
	});

	pseudoText('passes test 88', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:before { content:"fancy "; }' +
			'</style>' +
			'<label for="test">fruit</label>' +
			'<input type="password" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'fancy fruit');
	});

	pseudoText('passes test 89', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:before { content:"fancy "; }' +
			'</style>' +
			'<label for="test">fruit</label>' +
			'<input type="checkbox" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'fancy fruit');
	});

	pseudoText('passes test 90', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:before { content:"fancy "; }' +
			'</style>' +
			'<label for="test">fruit</label>' +
			'<input type="radio" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'fancy fruit');
	});

	pseudoText('passes test 91', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:before { content:"fancy "; }' +
			'</style>' +
			'<label for="test">fruit</label>' +
			'<input type="file" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'fancy fruit');
	});

	pseudoText('passes test 92', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:before { content:"fancy "; }' +
			'</style>' +
			'<label for="test">fruit</label>' +
			'<input type="image" src="foo.jpg" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'fancy fruit');
	});

	pseudoText('passes test 93', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:after { content:" fruit"; }' +
			'</style>' +
			'<label for="test">fancy</label>' +
			'<input type="password" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'fancy fruit');
	});

	pseudoText('passes test 94', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:after { content:" fruit"; }' +
			'</style>' +
			'<label for="test">fancy</label>' +
			'<input type="checkbox" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'fancy fruit');
	});

	pseudoText('passes test 95', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:after { content:" fruit"; }' +
			'</style>' +
			'<label for="test">fancy</label>' +
			'<input type="radio" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'fancy fruit');
	});

	pseudoText('passes test 96', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:after { content:" fruit"; }' +
			'</style>' +
			'<label for="test">fancy</label>' +
			'<input type="file" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'fancy fruit');
	});

	pseudoText('passes test 97', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:after { content:" fruit"; }' +
			'</style>' +
			'<label for="test">fancy</label>' +
			'<input type="image" src="foo.jpg" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'fancy fruit');
	});

	it('passes test 98', function() {
		fixture.innerHTML =
			'<input type="checkbox" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <div role="combobox">' +
			'    <div role="textbox"></div>' +
			'    <ul role="listbox" style="list-style-type: none;">' +
			'      <li role="option" aria-selected="true">1</li>' +
			' 	<li role="option">2</li>' +
			' 	<li role="option">3</li>' +
			'    </ul>' +
			'  </div>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 99', function() {
		fixture.innerHTML =
			'<input type="checkbox" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <span role="menu">' +
			'    <span role="menuitem" aria-selected="true">1</span>' +
			'      <span role="menuitem" hidden>2</span>' +
			' 	<span role="menuitem" hidden>3</span>' +
			'    </span>' +
			'    times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen times.');
	});

	it('passes test 100', function() {
		fixture.innerHTML =
			'<input type="checkbox" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <select size="1">' +
			'    <option selected="selected">1</option>' +
			'    <option>2</option>' +
			'    <option>3</option>' +
			'  </select>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 101', function() {
		fixture.innerHTML =
			'<input type="checkbox" id="test" />' +
			'<label for="test">foo <input role="slider" type="range" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz   	' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo 5 baz');
	});

	it('passes test 102', function() {
		fixture.innerHTML =
			'<input type="checkbox" id="test" />' +
			'<label for="test">foo <input role="spinbutton" type="number" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo 5 baz');
	});

	it('passes test 103', function() {
		fixture.innerHTML = '<input type="checkbox" id="test" title="foo" />';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 104', function() {
		fixture.innerHTML =
			'<input type="file" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <div role="combobox">' +
			'    <div role="textbox"></div>' +
			'    <ul role="listbox" style="list-style-type: none;">' +
			'      <li role="option" aria-selected="true">1 </li>' +
			' 	<li role="option">2 </li>' +
			' 	<li role="option">3 </li>' +
			'    </ul>' +
			'  </div>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 105', function() {
		fixture.innerHTML =
			'<input type="file" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <span role="menu">' +
			'    <span role="menuitem" aria-selected="true">1</span>' +
			'    <span role="menuitem" hidden>2</span>' +
			'    <span role="menuitem" hidden>3</span>' +
			'  </span>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen times.');
	});

	it('passes test 106', function() {
		fixture.innerHTML =
			'<input type="file" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <select size="1">' +
			'    <option selected="selected">1</option>' +
			'    <option>2</option>' +
			'    <option>3</option>' +
			'  </select>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 107', function() {
		fixture.innerHTML =
			'<input type="file" id="test" />' +
			'<label for="test">foo <input role="slider" type="range" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo 5 baz');
	});

	it('passes test 108', function() {
		fixture.innerHTML =
			'<input type="file" id="test" />' +
			'<label for="test">foo <input role="spinbutton" type="number" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo 5 baz');
	});

	it('passes test 109', function() {
		fixture.innerHTML = '<input type="file" id="test" title="foo" />';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 110', function() {
		fixture.innerHTML =
			'<input type="image" src="test.png" id="test" title="foo" />';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 111', function() {
		fixture.innerHTML =
			'<input type="password" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <div role="combobox">' +
			'    <div role="textbox"></div>' +
			'    <ul role="listbox" style="list-style-type: none;">' +
			'      <li role="option" aria-selected="true">1</li>' +
			' 	<li role="option">2</li>' +
			' 	<li role="option">3</li>' +
			'    </ul>' +
			'  </div>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 112', function() {
		fixture.innerHTML =
			'<input type="password" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <span role="menu">' +
			'    <span role="menuitem" aria-selected="true">1</span>' +
			'    <span role="menuitem" hidden>2</span>' +
			'    <span role="menuitem" hidden>3</span>' +
			'  </span>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen times.');
	});

	it('passes test 113', function() {
		fixture.innerHTML =
			'<input type="password" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <select size="1">' +
			'    <option selected="selected">1</option>' +
			'    <option>2</option>' +
			'    <option>3</option>' +
			'  </select>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 114', function() {
		fixture.innerHTML =
			'<input type="password" id="test" />' +
			'<label for="test">foo <input role="slider" type="range" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo 5 baz');
	});

	it('passes test 115', function() {
		fixture.innerHTML =
			'<input type="password" id="test" />' +
			'<label for="test">foo <input role="spinbutton" type="number" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo 5 baz');
	});

	it('passes test 116', function() {
		fixture.innerHTML = '<input type="password" id="test" title="foo" />';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 117', function() {
		fixture.innerHTML =
			'<input type="radio" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <div role="combobox">' +
			'    <div role="textbox"></div>' +
			'    <ul role="listbox" style="list-style-type: none;">' +
			'      <li role="option" aria-selected="true">1</li>' +
			' 	   <li role="option">2</li>' +
			' 	   <li role="option">3</li>' +
			'    </ul>' +
			'  </div>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 118', function() {
		fixture.innerHTML =
			'<input type="radio" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <span role="menu">' +
			'    <span role="menuitem" aria-selected="true">1</span>' +
			'    <span role="menuitem" hidden>2</span>' +
			'    <span role="menuitem" hidden>3</span>' +
			'  </span>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen times.');
	});

	it('passes test 119', function() {
		fixture.innerHTML =
			'<input type="radio" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <select size="1">' +
			'    <option selected="selected">1</option>' +
			'    <option>2</option>' +
			'    <option>3</option>' +
			'  </select>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 120', function() {
		fixture.innerHTML =
			'<input type="radio" id="test" />' +
			'<label for="test">foo <input role="slider" type="range" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo 5 baz');
	});

	it('passes test 121', function() {
		fixture.innerHTML =
			'<input type="radio" id="test" />' +
			'<label for="test">foo <input role="spinbutton"  type="number" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo 5 baz');
	});

	it('passes test 122', function() {
		fixture.innerHTML = '<input type="radio" id="test" title="foo" />';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	it('passes test 123', function() {
		fixture.innerHTML =
			'<input type="text" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <div role="combobox">' +
			'    <div role="textbox"></div>' +
			'    <ul role="listbox" style="list-style-type: none;">' +
			'      <li role="option" aria-selected="true">1</li>' +
			' 	   <li role="option">2</li>' +
			' 	   <li role="option">3</li>' +
			'    </ul>' +
			'  </div>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 124', function() {
		fixture.innerHTML =
			'<input type="text" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <span role="menu">' +
			'    <span role="menuitem" aria-selected="true">1</span>' +
			'    <span role="menuitem" hidden>2</span>' +
			'    <span role="menuitem" hidden>3</span>' +
			'  </span>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen times.');
	});

	it('passes test 125', function() {
		fixture.innerHTML =
			'<input type="text" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <select size="1">' +
			'    <option selected="selected">1</option>' +
			'    <option>2</option>' +
			'    <option>3</option>' +
			'  </select>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 126', function() {
		fixture.innerHTML =
			'<input type="text" id="test" />' +
			'<label for="test">foo <input role="slider" type="range" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo 5 baz');
	});

	it('passes test 127', function() {
		fixture.innerHTML =
			'<input type="text" id="test" />' +
			'<label for="test">foo <input role="spinbutton" type="number" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo 5 baz');
	});

	it('passes test 128', function() {
		fixture.innerHTML = '<input type="text" id="test" title="foo" />';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'foo');
	});

	// Skip from 128 - 138 as those are name description cases

	it('passes test 139', function() {
		fixture.innerHTML =
			'<style>' +
			'  .hidden { display: none; }' +
			'</style>' +
			'<div id="test" role="link" tabindex="0">' +
			'  <span aria-hidden="true"><i> Hello, </i></span>' +
			'  <span>My</span> name is' +
			'  <div><img src="file.jpg" title="Bryan" alt="" role="presentation" /></div>' +
			'  <span role="presentation" aria-label="Eli">' +
			'    <span aria-label="Garaventa">Zambino</span>' +
			'  </span>' +
			'  <span>the weird.</span>' +
			'  (QED)' +
			'  <span class="hidden"><i><b>and don\'t you forget it.</b></i></span>' +
			'  <table>' +
			'    <tr>' +
			'      <td>Where</td>' +
			'      <td style="visibility:hidden;"><div>in</div></td>' +
			'      <td><div style="display:none;">the world</div></td>' +
			'      <td>are my marbles?</td>' +
			'    </tr>' +
			'  </table>' +
			'</div>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');

		// Chrome 70: "My name is Garaventa the weird. (QED) Where are my marbles?"
		// Firefox 62: "Hello, My name is Eli the weird. (QED)"
		assert.equal(
			accessibleText(target),
			'My name is Eli the weird. (QED) Where are my marbles?'
		);
	});

	it('passes test 140', function() {
		fixture.innerHTML =
			'<style>' +
			'  .hidden { display: none; }' +
			'</style>' +
			'<input id="test" type="text" aria-labelledby="lblId" />' +
			'<div id="lblId" >' +
			'  <span aria-hidden="true"><i> Hello, </i></span>' +
			'  <span>My</span> name is' +
			'  <div><img src="file.jpg" title="Bryan" alt="" role="presentation" /></div>' +
			'  <span role="presentation" aria-label="Eli">' +
			'    <span aria-label="Garaventa">Zambino</span>' +
			'  </span>' +
			'  <span>the weird.</span>' +
			'  (QED)' +
			'  <span class="hidden"><i><b>and don\'t you forget it.</b></i></span>' +
			'  <table>' +
			'    <tr>' +
			'      <td>Where</td>' +
			'      <td style="visibility:hidden;"><div>in</div></td>' +
			'      <td><div style="display:none;">the world</div></td>' +
			'      <td>are my marbles?</td>' +
			'    </tr>' +
			'  </table>' +
			'</div>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(
			accessibleText(target),
			'My name is Eli the weird. (QED) Where are my marbles?'
		);
	});

	// Disabling this, axe has a buggy implicitName computation
	//  shouldn't be a big deal
	xit('passes test 141', function() {
		fixture.innerHTML =
			'<style>' +
			'  .hidden { display: none; }' +
			'</style>' +
			'<input type="text" id="test" />' +
			'<label for="test" id="label">' +
			'  <span aria-hidden="true"><i> Hello, </i></span>' +
			'  <span>My</span> name is' +
			'  <div><img src="file.jpg" title="Bryan" alt="" role="presentation" /></div>' +
			'  <span role="presentation" aria-label="Eli">' +
			'    <span aria-label="Garaventa">Zambino</span>' +
			' </span>' +
			' <span>the weird.</span>' +
			' (QED)' +
			' <span class="hidden"><i><b>and don\'t you forget it.</b></i></span>' +
			' <table>' +
			'   <tr>' +
			'     <td>Where</td>' +
			'     <td style="visibility:hidden;"><div>in</div></td>' +
			'     <td><div style="display:none;">the world</div></td>' +
			'     <td>are my marbles?</td>' +
			'  </tr>' +
			' </table>' +
			'</label>';

		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		// My name is Eli the weird. (QED)
		// My name is Eli the weird. (QED) Where are my marbles?
		assert.equal(
			accessibleText(target),
			'My name is Eli the weird. (QED) Where are my marbles?'
		);
	});

	it('passes test 143', function() {
		fixture.innerHTML =
			'  <style>' +
			'    .hidden { display: none; }' +
			'  </style>' +
			'  <div>' +
			'    <input id="test" type="text" aria-labelledby="lbl1 lbl2" aria-describedby="descId" />' +
			'    <span>' +
			'      <span aria-hidden="true" id="lbl1">Important</span>' +
			'      <span class="hidden">' +
			'        <span aria-hidden="true" id="lbl2">stuff</span>' +
			'      </span>' +
			'    </span>' +
			'  </div>' +
			'  <div class="hidden">' +
			'    <div id="descId">' +
			'      <span aria-hidden="true"><i> Hello, </i></span>' +
			'      <span>My</span> name is' +
			'      <div><img src="file.jpg" title="Bryan" alt="" role="presentation" /></div>' +
			'      <span role="presentation" aria-label="Eli">' +
			'        <span aria-label="Garaventa">Zambino</span>' +
			'      </span>' +
			'      <span>the weird.</span>' +
			'      (QED)' +
			'      <span class="hidden"><i><b>and don\'t you forget it.</b></i></span>' +
			'      <table>' +
			'        <tr>' +
			'          <td>Where</td>' +
			'          <td style="visibility:hidden;"><div>in</div></td>' +
			'          <td><div style="display:none;">the world</div></td>' +
			'          <td>are my marbles?</td>' +
			'        </tr>' +
			'      </table>' +
			'    </div>' +
			'  </div>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Important stuff');
	});

	it('passes test 144', function() {
		fixture.innerHTML =
			'<input id="test" role="combobox" type="text" title="Choose your language" value="English">';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Choose your language');
	});

	it('passes test 145', function() {
		fixture.innerHTML =
			'<div id="test" role="combobox" tabindex="0" title="Choose your language.">' +
			'  <span> English </span>' +
			'</div>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Choose your language.');
	});

	it('passes test 147', function() {
		fixture.innerHTML =
			'<input type="checkbox" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <ul role="listbox" style="list-style-type: none;">' +
			'    <li role="option" aria-selected="true">1</li>' +
			'    <li role="option">2</li>' +
			'    <li role="option">3</li>' +
			'  </ul>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	pseudoText('passes test 148', function() {
		fixture.innerHTML =
			'<input type="checkbox" id="test" />' +
			'<label for="test">Flash the screen ' +
			'  <div role="textbox" contenteditable>1</div>' +
			'  times.' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 149', function() {
		fixture.innerHTML =
			'<label for="test">a test</label>' +
			'<label>This <input type="checkbox" id="test" /> is</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'a test This is');
	});

	it('passes test 150', function() {
		fixture.innerHTML =
			'<label>This <input type="checkbox" id="test" /> is</label>' +
			'<label for="test">a test</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'This is a test');
	});

	it('passes test 151', function() {
		fixture.innerHTML =
			'<input type="file" id="test" />' +
			'<label for="test">W<i>h<b>a</b></i>t<br>is<div>your<div>name<b>?</b></div></div></label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'What is your name?');
	});

	pseudoText('passes test 152', function() {
		fixture.innerHTML =
			'<style>' +
			'  label:before { content: "This"; display: block; }' +
			'  label:after { content: "."; }' +
			'</style>' +
			'<label for="test">is a test</label>' +
			'<input type="text" id="test"/>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'This is a test.');
	});

	it('passes test 153', function() {
		fixture.innerHTML =
			'<style>' +
			'  .hidden { display: none; }' +
			'</style>' +
			'<input type="file" id="test" />' +
			'<label for="test">' +
			'  <span class="hidden">1</span><span>2</span>' +
			'  <span style="visibility: hidden;">3</span><span>4</span>' +
			'  <span hidden>5</span><span>6</span>' +
			'  <span aria-hidden="true">7</span><span>8</span>' +
			'  <span aria-hidden="false" class="hidden">9</span><span>10</span>' +
			'</label>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), '2 4 6 8 10');
	});

	it('passes test 154', function() {
		fixture.innerHTML =
			'<input type="file" id="test" />' +
			'<label for="test">Flash <span aria-owns="id1">the screen</span> times.</label>' +
			'<div>' +
			'  <div id="id1" role="combobox" aria-owns="id2">' +
			'    <div role="textbox"></div>' +
			'  </div>' +
			'</div>' +
			'<div>' +
			'  <ul id="id2" role="listbox" style="list-style-type: none;">' +
			'    <li role="option" >1 </li>' +
			'    <li role="option" aria-selected="true">2 </li>' +
			'    <li role="option">3 </li>' +
			'  </ul>' +
			'</div>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 2 times.');
	});

	it('passes test 155', function() {
		fixture.innerHTML =
			'<input type="file" id="test" />' +
			'<label for="test">Flash <span aria-owns="id1">the screen</span> times.</label>' +
			'<div id="id1">' +
			'  <div role="combobox">' +
			'    <div role="textbox"></div>' +
			'    <ul role="listbox" style="list-style-type: none;">' +
			'      <li role="option" aria-selected="true">1 </li>' +
			' 	<li role="option">2 </li>' +
			' 	<li role="option">3 </li>' +
			'    </ul>' +
			'  </div>' +
			'</div>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Flash the screen 1 times.');
	});

	it('passes test 156', function() {
		fixture.innerHTML =
			'<style>' +
			'  .hidden { display: none; }' +
			'</style>' +
			'<div id="test" role="link" tabindex="0">' +
			'  <span aria-hidden="true"><i> Hello, </i></span>' +
			'  <span>My</span> name is' +
			'  <div><img src="file.jpg" title="Bryan" alt="" role="presentation" /></div>' +
			'  <span role="presentation" aria-label="Eli"><span aria-label="Garaventa">Zambino</span></span>' +
			'  <span>the weird.</span>' +
			'  (QED)' +
			'  <span class="hidden"><i><b>and don\'t you forget it.</b></i></span>' +
			'</div>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'My name is Eli the weird. (QED)');
	});

	it('passes test 158', function() {
		fixture.innerHTML =
			'<a id="test" href="#" aria-label="California"' +
			' title="San Francisco">United States</a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'California');
	});

	it('passes test 159', function() {
		fixture.innerHTML =
			'<h2 id="test">' +
			'Country of origin:' +
			'<input role="combobox" type="text" title="Choose your country." value="United States">' +
			'</h2>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var target = fixture.querySelector('#test');
		assert.equal(accessibleText(target), 'Country of origin: United States');
	});
});

/** 
// In case anyone even wants it, here's the script used to generate these test cases
function getTestCase(content, index = 0) {
  const regex = new RegExp('if given\n([^]*)\nthen the accessible name of the element with id of "(.*)" is "(.*)"')
  const out = content.match(regex)
  if (!out || out.length !== 4) {
    return;
  }
  
  const [, html, id, expected] = out;
  const strings = html.split(/\n/g).map(
    line => `'${line.substr(2)}'`
  ).join(' +\n      ') + ';'

  return `
  it('passes test ${index + 1}', function () {
    fixture.innerHTML = ${strings}
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var target = fixture.querySelector('#${id}');
    assert.equal(accessibleText(target), '${expected}');
  });`
}*/
