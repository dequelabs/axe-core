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

	it('should return no regionless nodes when all content is inside the region', function() {
		var checkArgs = checkSetup(
			'<div id="target"><div role="main"><a href="a.html#mainheader">Click Here</a><div><h1 id="mainheader" tabindex="0">Introduction</h1></div></div></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('should return regionless node when img content is outside the region', function() {
		var checkArgs = checkSetup(
			'<div id="target"><img id="regionless" src="data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture.querySelector('#regionless'));
	});

	it('should return no regionless nodes when textless text content is outside the region', function() {
		var checkArgs = checkSetup(
			'<div id="target"><p></p><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('should return no regionless nodes when wrapper content is outside the region', function() {
		var checkArgs = checkSetup(
			'<div id="target"><div><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('should return no regionless nodes when invisible content is outside the region', function() {
		var checkArgs = checkSetup(
			'<div id="target"><p style="display: none">Click Here</p><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('should return no regionless nodes when there is a skiplink', function() {
		var checkArgs = checkSetup(
			'<div id="target"><a href="#mainheader">Click Here</a><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('should return no regionless nodes when there is an Angular skiplink', function() {
		var checkArgs = checkSetup(
			'<div id="target"><a href="/#mainheader">Click Here</a><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('should return regionless nodes when there is a non-region element', function() {
		var checkArgs = checkSetup(
			'<div id="target"><div id="regionless">This is random content.</div><div role="main"><h1 id="mainheader">Introduction</h1></div></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture.querySelector('#regionless'));
	});

	it('should return regionless nodes when there is a non-skiplink', function() {
		var checkArgs = checkSetup(
			'<div id="target"><a id="regionless" href="something.html#mainheader">Click Here</a><div role="main"><h1 id="mainheader">Introduction</h1></div></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture.querySelector('#regionless'));
	});

	it('should return no regionless nodes if the non-region element is a script', function() {
		var checkArgs = checkSetup(
			'<div id="target"><script>axe.run()</script><div role="main">Content</div></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('should consider aria labelled elements as content', function() {
		var checkArgs = checkSetup(
			'<div id="target"><div id="regionless" aria-label="axe-core logo" role="img"></div><div role="main">Content</div></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture.querySelector('#regionless'));
	});

	it('should allow native landmark elements', function() {
		var checkArgs = checkSetup(
			'<div id="target"><header>branding</header><main>Content </main><aside>stuff</aside><footer>copyright</footer></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('ignores native landmark elements with an overwriting role', function() {
		var checkArgs = checkSetup(
			'<div id="target"><header role="heading" level="1"></header><main id="regionless" role="none">Content</main></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture);
	});

	it('returns regionless nodes for content outside of form tags with accessible names', function() {
		var checkArgs = checkSetup(
			'<div id="target"><p id="regionless">Text</p><form aria-label="form"></form></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture.querySelector('#regionless'));
	});

	it('returns the outermost regionless element', function() {
		var checkArgs = checkSetup(
			'<div id="target" id="regionless"><p>Text</p><p>Text</p><p>Text</p></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture);
	});

	it('returns the outermost element without a region descendant', function() {
		var checkArgs = checkSetup(
			'<div id="target"><p>Text</p><p>Text</p><p>Text</p><main></main></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 3);
	});

	it('ignores unlabeled forms as they are not landmarks', function() {
		var checkArgs = checkSetup(
			'<div id="target"><p>Text</p><form><fieldset>foo</fieldset></form></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture);
	});

	it('treats <forms> with aria label as landmarks', function() {
		var checkArgs = checkSetup(
			'<form id="target" aria-label="foo"><p>This is random content.</p></form>'
		);
		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('treats role=forms with aria label as landmarks', function() {
		var checkArgs = checkSetup(
			'<div role="form" id="target" aria-label="foo"><p>This is random content.</p></div>'
		);
		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('treats forms without aria label as not a landmarks', function() {
		var checkArgs = checkSetup(
			'<form id="target"><p>This is random content.</p></form>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture);
	});

	it('treats forms with an empty aria label as not a landmarks', function() {
		var checkArgs = checkSetup(
			'<form id="target" aria-label=" "><p>This is random content.</p></form>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture);
	});

	it('treats forms with non empty titles as landmarks', function() {
		var checkArgs = checkSetup(
			'<form id="target" title="Thing"><p>This is random content.</p></form>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('treats forms with empty titles not as landmarks', function() {
		var checkArgs = checkSetup(
			'<form id="target" title=""><p>This is random content.</p></form>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture);
	});

	it('treats ARIA forms with no label or title as landmarks', function() {
		var checkArgs = checkSetup(
			'<div role="form" id="target"><p>This is random content.</p></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('allows content in aria-live=assertive', function() {
		var checkArgs = checkSetup(
			'<div aria-live="assertive" id="target"><p>This is random content.</p></div>'
		);
		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('allows content in aria-live=polite', function() {
		var checkArgs = checkSetup(
			'<div aria-live="polite" id="target"><p>This is random content.</p></div>'
		);
		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	it('does not allow content in aria-live=off', function() {
		var checkArgs = checkSetup(
			'<div aria-live="off" id="target"><p>This is random content.</p></div>'
		);
		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture);
	});

	it('treats role=dialog elements as regions', function() {
		var checkArgs = checkSetup(
			'<div role="dialog" id="target"><p>This is random content.</p></div>'
		);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	(shadowSupport.v1 ? it : xit)('should test Shadow tree content', function() {
		var div = document.createElement('div');
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = 'Some text';
		var checkArgs = checkSetup(div);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.lengthOf(checkContext._data, 1);
		assert.equal(checkContext._data[0], fixture);
	});

	(shadowSupport.v1 ? it : xit)('should test slotted content', function() {
		var div = document.createElement('div');
		div.innerHTML = 'Some content';
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<div role="main"><slot></slot></div>';
		var checkArgs = checkSetup(div);

		checks.region.evaluate.apply(checkContext, checkArgs);
		assert.isEmpty(checkContext._data);
	});

	(shadowSupport.v1 ? it : xit)(
		'should ignore skiplink targets inside shadow trees',
		function() {
			var div = document.createElement('div');
			div.innerHTML =
				'<a href="#foo" id="regionless">skiplink</a><div>Content</div>';

			var shadow = div.querySelector('div').attachShadow({ mode: 'open' });
			shadow.innerHTML = '<div role="main" id=#foo"><slot></slot></div>';
			var checkArgs = checkSetup(div);

			checks.region.evaluate.apply(checkContext, checkArgs);
			assert.lengthOf(checkContext._data, 1);
			assert.equal(checkContext._data[0], fixture.querySelector('#regionless'));
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

			checks.region.evaluate.apply(checkContext, checkArgs);
			assert.isEmpty(checkContext._data);
		}
	);
});
