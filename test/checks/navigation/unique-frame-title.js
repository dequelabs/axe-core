describe('unique-frame-title', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
	var queryFixture = axe.testUtils.queryFixture;
	var check = checks['unique-frame-title'];
	var checkContext = axe.testUtils.MockCheckContext();
	var options = {};

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
		axe._tree = undefined;
	});

	function getFrameFixture(title, src, isShadow, callback) {
		var vNode;

		if (isShadow) {
			vNode = shadowCheckSetup(
				'<div id="shadow"></div>',
				'<iframe id="target" title="' + title + '"> </iframe>'
			)[2];
		} else {
			vNode = queryFixture(
				'<iframe id="target" title="' + title + '"> </iframe>'
			);
		}

		vNode.actualNode.addEventListener('load', function() {
			callback(vNode);
		});
		vNode.actualNode.src = src;
	}

	it('returns undefined for `iframe` with no accessible name (no name after unicode and space characters are removed)', function(done) {
		var title = ' ☀️ ';
		var src = '../integration/rules/frame-title-unique/frames/page-one.html';
		getFrameFixture(title, src, false, function(vNode) {
			var actual = check.evaluate.call(
				checkContext,
				vNode.actualNode,
				options,
				vNode
			);
			assert.isUndefined(actual);
			assert.isNull(checkContext._data);
			done();
		});
	});

	it('returns true and sets `after` data when `iframe` has accessible name', function(done) {
		var title = 'I am unique';
		var src = '../integration/rules/frame-title-unique/frames/page-one.html';

		getFrameFixture(title, src, false, function(vNode) {
			var actual = check.evaluate.call(
				checkContext,
				vNode.actualNode,
				options,
				vNode
			);
			assert.isTrue(actual);
			assert.hasAllKeys(checkContext._data, [
				'name',
				'urlProps',
				'resourceTitle'
			]);
			assert.equal(checkContext._data.name, 'i am unique'.toLowerCase());
			assert.equal(
				checkContext._data.urlProps.pathname,
				'/test/integration/rules/frame-title-unique/frames/'
			);
			assert.equal(checkContext._data.urlProps.filename, 'page-one.html');
			done();
		});
	});

	(shadowSupported ? it : xit)(
		'returns true and sets `after` data when `iframe` has accessible name (in shadowDOM)',
		function(done) {
			var title = 'I am inside shadowDOM';
			var src = '../integration/rules/frame-title-unique/frames/page-one.html';
			getFrameFixture(title, src, true, function(vNode) {
				var actual = check.evaluate.call(
					checkContext,
					vNode.actualNode,
					options,
					vNode
				);
				assert.isTrue(actual);
				assert.hasAllKeys(checkContext._data, [
					'name',
					'urlProps',
					'resourceTitle'
				]);
				assert.equal(
					checkContext._data.name,
					'i am inside shadowdom'.toLowerCase()
				);
				assert.equal(
					checkContext._data.urlProps.pathname,
					'/test/integration/rules/frame-title-unique/frames/'
				);
				assert.equal(checkContext._data.urlProps.filename, 'page-one.html');
				done();
			});
		}
	);
});
