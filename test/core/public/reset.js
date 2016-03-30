/*global Rule, resetConfiguration*/
describe('axe.reset', function () {
	'use strict';

	function createFrames(callback, styleString) {
		var frame;
		frame = document.createElement('iframe');
		frame.src = '../mock/frames/nested1.html';
		frame.style = styleString || '';
		frame.addEventListener('load', function () {
			setTimeout(callback, 500);
		});
		fixture.appendChild(frame);
	}

	function createContainedFrames(callback, styleString) {
		var frame, div;
		div = document.createElement('div');
		div.style = 'display:none;';
		frame = document.createElement('iframe');
		frame.src = '../mock/frames/nested1.html';
		frame.style = styleString;
		frame.addEventListener('load', function () {
			setTimeout(callback, 500);
		});
		div.appendChild(frame);
		fixture.appendChild(div);
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

	it('should send call sendCommandToFrame', function (done) {
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
			done();
			return;
		}
		createFrames(function () {
			axe._load({});
			var orig = axe.utils.sendCommandToFrame;
			var frame = document.querySelector('iframe');
			axe.utils.sendCommandToFrame = function (node, opts, resolve) {
				assert.equal(node, frame);
				assert.deepEqual(opts, {
					command: 'reset'
				});
				axe.utils.sendCommandToFrame = orig;
				resolve();
				done();
			};
			resetConfiguration(function () {}, assertNotCalled);
		});
	});

	it('should throw if visible frames and no resolve', function (done) {
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
			done();
			return;
		}
		createFrames(function () {
			axe._load({});
			try {
				resetConfiguration();
			} catch (err) {
				assert.equal(err.toString().match(/there are visble frames on the page, please pass in a resolve function/).length, 1);
				done();
			}
		});
	});

	it('should call resolve', function (done) {
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
			done();
			return;
		}
		createFrames(function () {
			axe._load({});
			resetConfiguration(function () {
				done();
			}, assertNotCalled);
		});
	});

	it('should not call command on display:none frame', function (done) {
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
			done();
			return;
		}
		createFrames(function () {
			axe._load({});
			var orig = axe.utils.sendCommandToFrame;
			axe.utils.sendCommandToFrame = function (node, opts, resolve) {
				resolve();
				assert.ok(false);
			};
			resetConfiguration(function () {
				axe.utils.sendCommandToFrame = orig;
				done();
			}, assertNotCalled);
		}, 'display:none;');
	});

	it('should not call command on display:none parent of frame', function (done) {
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
			done();
			return;
		}
		createContainedFrames(function () {
			axe._load({});
			var orig = axe.utils.sendCommandToFrame;
			axe.utils.sendCommandToFrame = function (node, opts, resolve) {
				resolve();
				assert.ok(false);
			};
			resetConfiguration(function () {
				axe.utils.sendCommandToFrame = orig;
				done();
			}, assertNotCalled);
		}, 'display:none;');
	});

	it('should not call command on visibility:hidden frame', function (done) {
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
			done();
			return;
		}
		createFrames(function () {
			axe._load({});
			var orig = axe.utils.sendCommandToFrame;
			axe.utils.sendCommandToFrame = function (node, opts, resolve) {
				resolve();
				assert.ok(false);
			};
			resetConfiguration(function () {
				axe.utils.sendCommandToFrame = orig;
				done();
			}, assertNotCalled);
		}, 'visibility:hidden;');
	});

	it('should not call command on visibility:hidden parent of frame', function (done) {
		if (window.PHANTOMJS) {
			assert.ok('PhantomJS is a liar');
			done();
			return;
		}
		createContainedFrames(function () {
			axe._load({});
			var orig = axe.utils.sendCommandToFrame;
			axe.utils.sendCommandToFrame = function (node, opts, resolve) {
				resolve();
				assert.ok(false);
			};
			resetConfiguration(function () {
				axe.utils.sendCommandToFrame = orig;
				done();
			}, assertNotCalled);
		}, 'visibility:hidden;');
	});

});
