describe('implicit-label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var checkSetup = axe.testUtils.checkSetup;
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('should return false if an empty label is present', function () {
		fixtureSetup('<label><input type="text" id="target"></label>');
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(checks['implicit-label'].evaluate(node, {}, virtualNode));
	});

	it('should return false if an invisible non-empty label is present', function () {
		fixtureSetup('<label><span style="display: none">Text</span> <input type="text" id="target"></label>');
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(checks['implicit-label'].evaluate(node, {}, virtualNode));
	});

	it('should return true if a non-empty label is present', function () {
		fixtureSetup('<label>Text <input type="text" id="target"></label>');
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isTrue(checks['implicit-label'].evaluate(node, {}, virtualNode));
	});

	it('should return false if a label is not present', function () {
		var node = document.createElement('input');
		node.type = 'text';
		fixtureSetup(node);

		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(checks['implicit-label'].evaluate(node, {}, virtualNode));
	});

	it('should return false if label is empty for select', function () {
		var params = checkSetup('<label>' +
	    '<span class="label"></span>' +
	    '<select id="target">' +
	        '<option value="1" selected="selected">Please choose a region</option>' +
	        '<option value="2">Coastal</option>' +
	        '<option value="3">Forest</option>' +
	        '<option value="4">Grasslands</option>' +
	        '<option value="5">Mountains</option>' +
	    '</select>' +
		'</label>');
		assert.isFalse(checks['implicit-label'].evaluate.apply(checkContext, params));
	});
	
	it('should return false if input is labeled only by select options', function () {
		var params = checkSetup('<label for="target">' +
			'<select id="select">' +
			'	<option selected="selected">Chosen</option>' +
			'	<option>Not Selected</option>' +
			'</select>' +
		'</label>' +
		'<input id="target" type="text" />');
		assert.isFalse(checks['implicit-label'].evaluate.apply(checkContext, params));
	});

	it('should return false if input is aria-labelled only by select options', function () {
		var params = checkSetup('<label for="target">' +
			'<select id="select">' +
			'	<option selected="selected">Chosen</option>' +
			'	<option>Not Selected</option>' +
			'</select>' +
		'</label>' +
		'<input aria-labelledby="select" type="text" id="target" />');
		assert.isFalse(checks['implicit-label'].evaluate.apply(checkContext, params));
	});
});
