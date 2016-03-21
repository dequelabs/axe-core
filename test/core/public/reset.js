/*global Rule, resetConfiguration*/
describe('axe.reset', function () {
	'use strict';

	function createFrames(callback) {
		var frame;
		frame = document.createElement('iframe');
		frame.src = '../mock/frames/nested1.html';
		frame.addEventListener('load', function () {
			setTimeout(callback, 500);
		});
		fixture.appendChild(frame);
	}

	var fixture = document.getElementById('fixture');
	var assertNotCalled = function () {
		assert.ok(false, 'Should not be called');
	};


	afterEach(function () {
		fixture.innerHTML = '';
	});

	beforeEach(function () {
		axe._audit = null;
	});

	it('should throw if no audit is configured', function () {
		assert.throws(function () {
			axe.reset(function () {}, function () {});
		}, Error, /^No audit configured/);
	});

	it('should restore the default configuration', function (done) {
		axe._load({
			data: {
				rules: [{
					bob: 'not-joe'
				}]
			},
			rules: [{
				id: 'bob',
				selector: 'fail'
			}]
		});
		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.equal(axe._audit.rules[0].selector, 'fail');
		axe.configure({
			rules: [{
				id: 'bob',
				selector: 'pass',
			}]
		});
		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.equal(axe._audit.rules[0].selector, 'pass');
		axe.reset(function () {
			assert.lengthOf(axe._audit.rules, 1);
			assert.instanceOf(axe._audit.rules[0], Rule);
			assert.equal(axe._audit.rules[0].id, 'bob');
			assert.equal(axe._audit.rules[0].selector, 'fail');
			done();
		}, function () {});
	});

	it('should send command to frames to reset', function (done) {
		createFrames(function () {
			axe._load({});
			var orig = axe.utils.sendCommandToFrame;
			var frame = document.querySelector('iframe');
			axe.utils.sendCommandToFrame = function (node, opts) {
				assert.equal(node, frame);
				assert.deepEqual(opts, {
					command: 'reset'
				});
				axe.utils.sendCommandToFrame = orig;
				done();
			};
			resetConfiguration(function () {}, assertNotCalled);
		});
	});

});
