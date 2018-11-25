describe('aria.arialabelledbyText', function() {
	'use strict';
	var aria = axe.commons.aria;
	var fixtureSetup = axe.testUtils.fixtureSetup;

	it('returns the accessible name of the aria-labelledby references', function() {
		var fixture = fixtureSetup(
			'<div role="heading" aria-labelledby="foo"></div>' +
				'<div id="foo">Foo text</div>'
		);
		var accName = aria.arialabelledbyText(fixture.firstChild);
		assert.equal(accName, 'Foo text');
	});

	it('works with virtual nodes', function() {
		fixtureSetup(
			'<div role="heading" id="hdr" aria-labelledby="foo"></div>' +
				'<div id="foo">Foo text</div>'
		);
		var target = axe.utils.querySelectorAll(axe._tree[0], '#hdr')[0];
		var accName = aria.arialabelledbyText(target);
		assert.equal(accName, 'Foo text');
	});

	it('returns references in order', function() {
		var fixture = fixtureSetup(
			'<div role="heading" aria-labelledby="bar baz foo"></div>' +
				'<div id="foo">Foo</div>' +
				'<div id="bar">Bar</div>' +
				'<div id="baz">Baz</div>'
		);
		var accName = aria.arialabelledbyText(fixture.firstChild);
		assert.equal(accName, 'Bar Baz Foo');
	});

	it('returns "" if the node is not an element', function() {
		var fixture = fixtureSetup('foo');
		var accName = aria.arialabelledbyText(fixture.firstChild);
		assert.equal(accName, '');
	});

	it('returns "" with context.inLabelledByContext: true', function() {
		fixtureSetup(
			'<div role="heading" id="hdr" aria-labelledby="foo"></div>' +
				'<div id="foo">Foo text</div>'
		);
		var target = axe.utils.querySelectorAll(axe._tree[0], '#hdr')[0];
		var accName = aria.arialabelledbyText(target, {
			inLabelledByContext: true
		});
		assert.equal(accName, '');
	});

	it('returns "" with context.inControlContext: true', function() {
		fixtureSetup(
			'<div role="heading" id="hdr" aria-labelledby="foo"></div>' +
				'<div id="foo">Foo text</div>'
		);
		var target = axe.utils.querySelectorAll(axe._tree[0], '#hdr')[0];
		var accName = aria.arialabelledbyText(target, {
			inControlContext: true
		});
		assert.equal(accName, '');
	});

	it('returns content of a aria-hidden reference', function() {
		fixtureSetup(
			'<div role="heading" id="hdr" aria-labelledby="foo"></div>' +
				'<div id="foo" aria-hidden="true">Foo text</div>'
		);
		var target = axe.utils.querySelectorAll(axe._tree[0], '#hdr')[0];
		var accName = aria.arialabelledbyText(target);
		assert.equal(accName, 'Foo text');
	});

	it('returns content of a `display:none` reference', function() {
		fixtureSetup(
			'<div role="heading" id="hdr" aria-labelledby="foo"></div>' +
				'<div id="foo" style="display:none">Foo text</div>'
		);
		var target = axe.utils.querySelectorAll(axe._tree[0], '#hdr')[0];
		var accName = aria.arialabelledbyText(target);
		assert.equal(accName, 'Foo text');
	});

	it('returns does not return hidden content of a visible reference', function() {
		fixtureSetup(
			'<div role="heading" id="hdr" aria-labelledby="foo"></div>' +
				'<div id="foo"><div style="display:none">Foo text</div></div>'
		);
		var target = axe.utils.querySelectorAll(axe._tree[0], '#hdr')[0];
		var accName = aria.arialabelledbyText(target);
		assert.equal(accName, '');
	});

	it('does not follow more than one aria-labelledy reference', function() {
		fixtureSetup(
			'<div role="heading" id="hdr" aria-labelledby="foo"></div>' +
				'<div id="foo"><div aria-labelledby="bar" role="heading"></div></div>' +
				'<div id="bar">Foo text</div>'
		);
		var target = axe.utils.querySelectorAll(axe._tree[0], '#hdr')[0];
		var accName = aria.arialabelledbyText(target, {
			inControlContext: true
		});
		assert.equal(accName, '');
	});

	it('preserves spacing', function() {
		var fixture = fixtureSetup(
			'<div role="heading" aria-labelledby="foo"></div>' +
				'<div id="foo"> \t Foo \n text \t </div>'
		);
		var accName = aria.arialabelledbyText(fixture.firstChild);
		assert.equal(accName, ' \t Foo \n text \t ');
	});
});
