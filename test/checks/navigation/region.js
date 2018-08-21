describe('region', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupport = axe.testUtils.shadowSupport;
	var checkSetup = axe.testUtils.checkSetup;

	var checkContext = new axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return true when all content is inside the region', function() {
		var checkArgs = checkSetup(
			'<div id="target"><div role="main"><a href="a.html#mainheader">Click Here</a><div><h1 id="mainheader" tabindex="0">Introduction</h1></div></div></div>'
		);

		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.equal(checkContext._relatedNodes.length, 0);
	});

	it('should return false when img content is outside the region', function() {
		var checkArgs = checkSetup(
			'<div id="target"><img src="data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>'
		);

		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.equal(checkContext._relatedNodes.length, 1);
	});

	it('should return true when textless text content is outside the region', function() {
		var checkArgs = checkSetup(
			'<div id="target"><p></p><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>'
		);

		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.equal(checkContext._relatedNodes.length, 0);
	});

	it('should return true when wrapper content is outside the region', function() {
		var checkArgs = checkSetup(
			'<div id="target"><div><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div></div>'
		);

		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.equal(checkContext._relatedNodes.length, 0);
	});

	it('should return true when invisible content is outside the region', function() {
		var checkArgs = checkSetup(
			'<div id="target"><p style="display: none">Click Here</p><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>'
		);

		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.equal(checkContext._relatedNodes.length, 0);
	});

	it('should return true when there is a skiplink', function() {
		var checkArgs = checkSetup(
			'<div id="target"><a href="#mainheader">Click Here</a><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>'
		);

		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.equal(checkContext._relatedNodes.length, 0);
	});

	it('should return false when there is a non-region element', function() {
		var checkArgs = checkSetup(
			'<div id="target"><div>This is random content.</div><div role="main"><h1 id="mainheader">Introduction</h1></div></div>'
		);

		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.equal(checkContext._relatedNodes.length, 1);
	});

	it('should return the first item when after is called', function() {
		assert.equal(checks.region.after([2, 3, 1]), 2);
	});

	it('should return false when there is a non-skiplink', function() {
		var checkArgs = checkSetup(
			'<div id="target"><a href="something.html#mainheader">Click Here</a><div role="main"><h1 id="mainheader">Introduction</h1></div></div>'
		);

		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.equal(checkContext._relatedNodes.length, 1);
	});

	it('should return true if the non-region element is a script', function() {
		var checkArgs = checkSetup(
			'<div id="target"><script>axe.run()</script><div role="main">Content</div></div>'
		);

		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
	});

	it('should considered aria labelled elements as content', function() {
		var checkArgs = checkSetup(
			'<div id="target"><div aria-label="axe-core logo" role="img"></div><div role="main">Content</div></div>'
		);

		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.deepEqual(checkContext._relatedNodes, [
			fixture.querySelector('div[aria-label]')
		]);
	});

	it('should allow native landmark elements', function() {
		var checkArgs = checkSetup(
			'<div id="target"><header>branding</header><main>Content </main><aside>stuff</aside><footer>copyright</footer></div>'
		);

		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.lengthOf(checkContext._relatedNodes, 0);
	});

	it('ignores native landmark elements with an overwriting role', function() {
		var checkArgs = checkSetup(
			'<div id="target"><header role="heading" level="1"></header><main role="none">Content</main></div>'
		);

		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.lengthOf(checkContext._relatedNodes, 1);
		assert.deepEqual(checkContext._relatedNodes, [
			fixture.querySelector('main')
		]);
	});

	it('returns false for content outside of form tags with accessible names', function() {
		var checkArgs = checkSetup(
			'<div id="target"><p>Text</p><form aria-label="form"></form></div>'
		);

		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.lengthOf(checkContext._relatedNodes, 1);
		assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
	});

	it('ignores unlabeled forms as they are not landmarks', function() {
		var checkArgs = checkSetup(
			'<div id="target"><p>Text</p><form><fieldset>foo</fieldset></form></div>'
		);

		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.lengthOf(checkContext._relatedNodes, 2);
		assert.deepEqual(checkContext._relatedNodes, [
			fixture.querySelector('p'),
			fixture.querySelector('fieldset')
		]);
	});

	it('treats <forms> with aria label as landmarks', function() {
		var checkArgs = checkSetup(
			'<form id="target" aria-label="foo"><p>This is random content.</p></form>'
		);
		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
	});

	it('treats role=forms with aria label as landmarks', function() {
		var checkArgs = checkSetup(
			'<div role="form" id="target" aria-label="foo"><p>This is random content.</p></div>'
		);
		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
	});

	it('treats forms without aria label as not a landmarks', function() {
		var checkArgs = checkSetup(
			'<form id="target"><p>This is random content.</p></form>'
		);

		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.lengthOf(checkContext._relatedNodes, 1);
		assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
	});

	it('treats forms with an empty aria label as not a landmarks', function() {
		var checkArgs = checkSetup(
			'<form id="target" aria-label=" "><p>This is random content.</p></form>'
		);

		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.lengthOf(checkContext._relatedNodes, 1);
		assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
	});

	it('treats forms with non empty titles as landmarks', function() {
		var checkArgs = checkSetup(
			'<form id="target" title="Thing"><p>This is random content.</p></form>'
		);

		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
	});

	it('treats forms with empty titles not as landmarks', function() {
		var checkArgs = checkSetup(
			'<form id="target" title=""><p>This is random content.</p></form>'
		);

		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.lengthOf(checkContext._relatedNodes, 1);
		assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
	});

	it('treats ARIA forms with no label or title as landmarks', function() {
		var checkArgs = checkSetup(
			'<div role="form" id="target"><p>This is random content.</p></div>'
		);

		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
	});

	it('allows content in aria-live=assertive', function() {
		var checkArgs = checkSetup(
			'<div aria-live="assertive" id="target"><p>This is random content.</p></div>'
		);
		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
	});

	it('allows content in aria-live=polite', function() {
		var checkArgs = checkSetup(
			'<div aria-live="polite" id="target"><p>This is random content.</p></div>'
		);
		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
	});

	it('does not allow content in aria-live=off', function() {
		var checkArgs = checkSetup(
			'<div aria-live="off" id="target"><p>This is random content.</p></div>'
		);
		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
	});

	it('treats role=dialog elements as regions', function() {
		var checkArgs = checkSetup(
			'<div role="dialog" id="target"><p>This is random content.</p></div>'
		);

		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should test Shadow tree content', function() {
		var div = document.createElement('div');
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = 'Some text';
		var checkArgs = checkSetup(div);

		assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.deepEqual(checkContext._relatedNodes, [div]);
	});

	(shadowSupport.v1 ? it : xit)('should test slotted content', function() {
		var div = document.createElement('div');
		div.innerHTML = 'Some content';
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<div role="main"><slot></slot></div>';
		var checkArgs = checkSetup(div);

		assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
		assert.lengthOf(checkContext._relatedNodes, 0);
	});

	(shadowSupport.v1 ? it : xit)(
		'should ignore skiplink targets inside shadow trees',
		function() {
			var div = document.createElement('div');
			div.innerHTML = '<a href="#foo">skiplink</a><div>Content</div>';

			var shadow = div.querySelector('div').attachShadow({ mode: 'open' });
			shadow.innerHTML = '<div role="main" id=#foo"><slot></slot></div>';
			var checkArgs = checkSetup(div);

			assert.isFalse(checks.region.evaluate.apply(checkContext, checkArgs));
			assert.deepEqual(checkContext._relatedNodes, [div.querySelector('a')]);
		}
	);

	(shadowSupport.v1 ? it : xit)(
		'should find the skiplink in shadow DOM',
		function() {
			var div = document.createElement('div');
			div.innerHTML = '<span id="foo">Content!</span>';
			var shadow = div.attachShadow({ mode: 'open' });
			shadow.innerHTML =
				'<a href="#foo">skiplink</a><div role="main"><slot></slot></div>';
			var checkArgs = checkSetup(div);

			assert.isTrue(checks.region.evaluate.apply(checkContext, checkArgs));
			assert.lengthOf(checkContext._relatedNodes, 0);
		}
	);
});
