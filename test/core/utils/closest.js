describe('utils.closest', function() {
	var closest = axe.utils.closest;
	var fixture = document.querySelector('#fixture');
	var queryFixture = axe.testUtils.queryFixture;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should find the current node', function() {
		var virtualNode = queryFixture(
			'<div id="parent"><div id="target">foo</div></div>'
		);
		var closestNode = closest(virtualNode, 'div');
		assert.equal(closestNode, virtualNode);
	});

	it('should find a parent node', function() {
		var virtualNode = queryFixture(
			'<div id="parent"><span id="target">foo</span></div>'
		);
		var closestNode = closest(virtualNode, 'div');
		var parent = fixture.querySelector('#parent');
		assert.equal(closestNode, axe.utils.getNodeFromTree(parent));
	});

	it('should find an ancestor node', function() {
		var virtualNode = queryFixture(
			'<div id="parent"><span><span><span><span id="target">foo</span></span></span></div>'
		);
		var closestNode = closest(virtualNode, 'div');
		var parent = fixture.querySelector('#parent');
		assert.equal(closestNode, axe.utils.getNodeFromTree(parent));
	});

	it('should return null if no ancestor is found', function() {
		var virtualNode = queryFixture(
			'<div id="parent"><div id="target">foo</div></div>'
		);
		var closestNode = closest(virtualNode, 'h1');
		assert.isNull(closestNode);
	});
});
