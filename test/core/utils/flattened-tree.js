var fixture = document.getElementById('fixture');

function createStyle () {
	'use strict';

	var style = document.createElement('style');
	style.textContent = 'div.breaking { color: Red;font-size: 20px; border: 1px dashed Purple; }' +
		'div.other { padding: 2px 0 0 0; border: 1px solid Cyan; }';
	return style;
}

function flattenedTreeAssertions () {
	'use strict';

	var virtualDOM = axe.utils.getFlattenedTree(fixture.firstChild);
	assert.equal(virtualDOM.length, 3);
	assert.equal(virtualDOM[0].actualNode.nodeName, 'STYLE');

	// breaking news stories
	assert.equal(virtualDOM[1].actualNode.nodeName, 'DIV');
	assert.equal(virtualDOM[1].actualNode.className, 'breaking');

	// other news stories
	assert.equal(virtualDOM[2].actualNode.nodeName, 'DIV');
	assert.equal(virtualDOM[2].actualNode.className, 'other');

	// breaking
	assert.equal(virtualDOM[1].children.length, 1);
	assert.equal(virtualDOM[1].children[0].actualNode.nodeName, 'UL');
	virtualDOM[1].children[0].children.forEach(function (child, index) {
		assert.equal(child.actualNode.nodeName, 'LI');
		assert.isTrue(child.actualNode.textContent === 3*(index + 1) + '');
	});
	assert.equal(virtualDOM[1].children[0].children.length, 2);

	// other
	assert.equal(virtualDOM[2].children.length, 1);
	assert.equal(virtualDOM[2].children[0].actualNode.nodeName, 'UL');
	assert.equal(virtualDOM[2].children[0].children.length, 4);
}

function shadowIdAssertions () {
	'use strict';

	var virtualDOM = axe.utils.getFlattenedTree(fixture);
	assert.isUndefined(virtualDOM[0].shadowId);
	assert.isDefined(virtualDOM[0].children[0].shadowId);
	assert.isDefined(virtualDOM[0].children[1].shadowId);
	assert.isDefined(virtualDOM[0].children[4].shadowId);
	// shadow IDs in the same shadowRoot must be the same
	assert.equal(virtualDOM[0].children[0].shadowId,
		virtualDOM[0].children[1].shadowId);
	// should cascade
	assert.equal(virtualDOM[0].children[1].shadowId,
		virtualDOM[0].children[1].children[0].shadowId);
	// shadow IDs in different shadowRoots must be different
	assert.notEqual(virtualDOM[0].children[0].shadowId,
		virtualDOM[0].children[4].shadowId);

}

if (document.body && typeof document.body.createShadowRoot === 'function') {
	describe('flattened-tree shadow DOM v0', function () {
		'use strict';
		afterEach(function () {
			fixture.innerHTML = '';
		});
		beforeEach(function () {
			function createStoryGroup (className, contentSelector) {
				var group = document.createElement('div');
				group.className = className;
				group.innerHTML = '<ul><content select="' + contentSelector + '"></content></ul>';
				return group;
			}

			function makeShadowTree (storyList) {
				var root = storyList.createShadowRoot();
				root.appendChild(createStyle());
				root.appendChild(createStoryGroup('breaking', '.breaking'));
				root.appendChild(createStoryGroup('other', ''));
			}
			var str = '<div class="stories"><li>1</li>' +
			'<li>2</li><li class="breaking" slot="breaking">3</li>' +
			'<li>4</li><li>5</li><li class="breaking">6</li></div>';
			str += '<div class="stories"><li>1</li>' +
			'<li>2</li><li class="breaking" slot="breaking">3</li>' +
			'<li>4</li><li>5</li><li class="breaking">6</li></div>';
			fixture.innerHTML = str;

			fixture.querySelectorAll('.stories').forEach(makeShadowTree);
		});
		it('it should support shadow DOM v0', function () {
			assert.isDefined(fixture.firstChild.shadowRoot);
		});
		it('getFlattenedTree should return an array of stuff', function () {
			assert.isTrue(Array.isArray(axe.utils.getFlattenedTree(fixture.firstChild)));
		});
		it('getFlattenedTree\'s virtual DOM should represent the flattened tree', flattenedTreeAssertions);
		it('getFlattenedTree\'s virtual DOM should give an ID to the shadow DOM', shadowIdAssertions);
	});
}

if (document.body && typeof document.body.attachShadow === 'function') {
	describe('flattened-tree shadow DOM v1', function () {
		'use strict';
		afterEach(function () {
			fixture.innerHTML = '';
		});
		beforeEach(function () {
			function createStoryGroup (className, slotName) {
				var group = document.createElement('div');
				group.className = className;
				// Empty string in slot name attribute or absence thereof work the same, so no need for special handling.
				group.innerHTML = '<ul><slot name="' + slotName + '">fallback content<li>one</li></slot></ul>';
				return group;
			}

			function makeShadowTree (storyList) {
				var root = storyList.attachShadow({mode: 'open'});
				root.appendChild(createStyle());
				root.appendChild(createStoryGroup('breaking', 'breaking'));
				root.appendChild(createStoryGroup('other', ''));
			}
			var str = '<div class="stories"><li>1</li>' +
			'<li>2</li><li class="breaking" slot="breaking">3</li>' +
			'<li>4</li><li>5</li><li class="breaking" slot="breaking">6</li></div>';
			str += '<div class="stories"><li>1</li>' +
			'<li>2</li><li class="breaking" slot="breaking">3</li>' +
			'<li>4</li><li>5</li><li class="breaking" slot="breaking">6</li></div>';
			str += '<div class="stories"></div>';
			fixture.innerHTML = str;

			fixture.querySelectorAll('.stories').forEach(makeShadowTree);
		});
		it('should support shadow DOM v1', function () {
			assert.isDefined(fixture.firstChild.shadowRoot);
		});
		it('getFlattenedTree should return an array of stuff', function () {
			assert.isTrue(Array.isArray(axe.utils.getFlattenedTree(fixture.firstChild)));
		});
		it('getFlattenedTree\'s virtual DOM should represent the flattened tree', flattenedTreeAssertions);
		it('getFlattenedTree\'s virtual DOM should give an ID to the shadow DOM', shadowIdAssertions);
		it('getFlattenedTree\'s virtual DOM should have the fallback content', function () {
			var virtualDOM = axe.utils.getFlattenedTree(fixture);
			assert.isTrue(virtualDOM[0].children[7].children[0].children.length === 2);
			assert.isTrue(virtualDOM[0].children[7].children[0].children[0].actualNode.nodeType === 3);
			assert.isTrue(virtualDOM[0].children[7].children[0].children[0].actualNode.textContent === 'fallback content');
			assert.isTrue(virtualDOM[0].children[7].children[0].children[1].actualNode.nodeName === 'LI');
		});
	});
}

if (document.body && typeof document.body.attachShadow === 'undefined' &&
	typeof document.body.createShadowRoot === 'undefined') {
	describe('flattened-tree', function () {
		'use strict';
		it('SHADOW DOM TESTS DEFERRED, NO SUPPORT');
	});
}
