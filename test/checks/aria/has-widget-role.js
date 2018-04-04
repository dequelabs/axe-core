describe('has-widget-role', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var node;
	var checkContext = axe.testUtils.MockCheckContext();


	afterEach(function () {
		node.innerHTML = '';
		checkContext._data = null;
	});

	it('should return false for elements with no role', function() {
		node = document.createElement('div');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return false for elements with nonsensical roles', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'buttonbuttonbutton');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	// Widget roles
	it('should return true for role=button', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'button');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=checkbox', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'checkbox');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=gridcell', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'gridcell');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=link', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'link');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=menuitem', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'menuitem');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=menuitemcheckbox', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'menuitemcheckbox');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=menuitemradio', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'menuitemradio');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=option', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'option');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=progressbar', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'progressbar');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=radio', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'radio');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=scrollbar', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'scrollbar');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=searchbox', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'searchbox');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=slider', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'slider');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=spinbutton', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'spinbutton');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=switch', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'switch');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=tab', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'tab');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=tabpanel', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'tabpanel');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=textbox', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'textbox');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=treeitem', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'treeitem');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	// Composite widget roles
	it('should return true for role=combobox', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'combobox');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=grid', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'grid');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=listbox', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'listbox');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=menu', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'menu');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=menubar', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'menubar');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=radiogroup', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'radiogroup');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=tablist', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'tablist');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=tree', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'tree');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it('should return true for role=treegrid', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'treegrid');
		fixture.appendChild(node);
		assert.isTrue(checks['has-widget-role'].evaluate.call(checkContext, node));
	});




	it ('should return false for role=application', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'application');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=article', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'article');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=cell', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'cell');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=columnheader', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'columnheader');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=definition', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'definition');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=directory', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'directory');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=document', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'document');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=feed', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'feed');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=figure', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'figure');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=group', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'group');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=heading', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'heading');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=img', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'img');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=list', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'list');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=listitem', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'listitem');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=math', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'math');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=none', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'none');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=note', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'note');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=presentation', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'presentation');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=row', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'row');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=rowgroup', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'rowgroup');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=rowheader', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'rowheader');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=table', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'table');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=term', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'term');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=toolbar', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'toolbar');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	// Landmark Roles
	it ('should return false for role=banner', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'banner');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=complementary', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'complementary');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=contentinfo', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'contentinfo');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=form', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'form');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=main', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'main');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=navigation', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'navigation');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=region', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'region');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});

	it ('should return false for role=search', function() {
		node = document.createElement('div');
		node.setAttribute('role', 'search');
		fixture.appendChild(node);
		assert.isFalse(checks['has-widget-role'].evaluate.call(checkContext, node));
	});
});
