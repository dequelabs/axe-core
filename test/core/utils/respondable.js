describe('axe.utils.respondable', function () {
	'use strict';

	var mockUUID;
	var originalUUID;
	var getMockUUID = function () {
		return mockUUID;
	};

	beforeEach(function () {
		originalUUID = window.uuid.v1;
		window.uuid.v1 = getMockUUID;
		mockUUID = originalUUID();
	});

	afterEach(function () {
		window.uuid.v1 = originalUUID;
	});

	it('should be a function', function () {
		assert.isFunction(axe.utils.respondable);
	});

	it('should accept 5 parameters', function () {
		assert.lengthOf(axe.utils.respondable, 5);
	});

	it('should call `postMessage` on first parameter', function () {
		var success = false;
		var win = {
			postMessage: function () {
				success = true;
			}
		};

		axe.utils.respondable(win, 'batman', 'nananana');
		assert.isTrue(success);
	});

	it('should stringify message', function (done) {
		var win = {
			postMessage: function (msg) {
				assert.isString(msg);
				done();
			}
		};

		axe.utils.respondable(win, 'batman', { derp: true });

	});

	it('should add the `topic` and `message` the message', function (done) {
		var win = {
			postMessage: function (msg) {
				msg = JSON.parse(msg);

				assert.equal(msg.topic, 'batman');
				assert.isTrue(msg._respondable);
				done();
			}
		};

		axe.utils.respondable(win, 'batman', 'nananana');
	});

	it('should add the `keepalive`', function (done) {
		var win = {
			postMessage: function (msg) {
				msg = JSON.parse(msg);

				assert.equal(msg._keepalive, 'batman');
				done();
			}
		};

		axe.utils.respondable(win, 'superman', 'spidey', 'batman');
	});

	it('should add `_respondable` to the message', function (done) {
		var win = {
			postMessage: function (msg) {
				msg = JSON.parse(msg);

				assert.equal(msg._respondable, true);
				done();
			}
		};

		axe.utils.respondable(win, 'batman', 'nananana');
	});

	it('should create a uuid.v1 (time-based uuid)', function () {
		var UUID = 'heheeh im a uuid';
		var win = {
			postMessage: function (msg) {
				msg = JSON.parse(msg);

				assert.equal(msg.uuid, UUID);
			}
		};
		var orig = window.uuid.v1;
		var success = false;
		window.uuid.v1 = function () {
			success = true;
			return UUID;
		};

		axe.utils.respondable(win, 'batman', 'nananana');
		assert.isTrue(success);

		window.uuid.v1 = orig;
	});

	it('should pass messages that have all required properties', function () {
		var success = false;
		var event = document.createEvent('Event');
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.data = JSON.stringify({
			_respondable: true,
			_source: 'axe.2.0.0',
			topic: 'Death star',
			message: 'Help us Obi-Wan',
			uuid: mockUUID
		});
		event.source = window;

		axe.utils.respondable(window, 'Death star', null, true, function (data) {
			success = true;
			assert.equal(data, 'Help us Obi-Wan');
		});
		document.dispatchEvent(event);
		assert.isTrue(success);
	});

	it('should allow messages with _source axe.x.y.z', function () {
		var success = false;
		var event = document.createEvent('Event');
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.data = JSON.stringify({
			_respondable: true,
			_source: 'axe.x.y.z',
			topic: 'Death star',
			message: 'Help us Obi-Wan',
			uuid: mockUUID
		});
		event.source = window;

		axe.utils.respondable(window, 'Death star', null, true, function (data) {
			success = true;
			assert.equal(data, 'Help us Obi-Wan');
		});
		document.dispatchEvent(event);
		assert.isTrue(success);
	});

	it('should allow messages if the axe version is x.y.z', function () {
		var success = false;
		var event = document.createEvent('Event');
		var v = axe.version;
		axe.version = 'x.y.z';
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.data = JSON.stringify({
			_respondable: true,
			_source: 'axe.2.0.0',
			topic: 'Death star',
			message: 'Help us Obi-Wan',
			uuid: mockUUID
		});
		event.source = window;

		axe.utils.respondable(window, 'Death star', null, true, function (data) {
			success = true;
			assert.equal(data, 'Help us Obi-Wan');
		});
		document.dispatchEvent(event);
		assert.isTrue(success);
		axe.version = v;
	});

	it('should reject messages if the axe version is different', function () {
		var success = true;
		var event = document.createEvent('Event');
		var v = axe.version;
		axe.version = '1.0.0';
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.data = JSON.stringify({
			_respondable: true,
			_source: 'axe.2.0.0',
			topic: 'Death star',
			message: 'Help us Obi-Wan',
			uuid: mockUUID
		});
		event.source = window;

		axe.utils.respondable(window, 'Death star', null, true, function () {
			success = false;
		});
		document.dispatchEvent(event);
		assert.isTrue(success);
		axe.version = v;
	});

	it('should reject messages that are that are not strings', function () {
		var success = true;
		var event = document.createEvent('Event');
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.data = {
			_respondable: true,
			topic: 'batman',
			uuid: mockUUID
		};
		event.source = window;

		axe.utils.respondable(window, 'batman', 'nananana', true, function () {
			success = false;
		});
		document.dispatchEvent(event);
		assert.isTrue(success);

	});

	it('should reject messages that are invalid stringified objects', function () {
		var success = true;
		var event = document.createEvent('Event');
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.data = JSON.stringify({
			_respondable: true,
			topic: 'batman',
			uuid: mockUUID
		}) + 'joker tricks!';
		event.source = window;

		axe.utils.respondable(window, 'batman', 'nananana', true, function () {
			success = false;
		});
		document.dispatchEvent(event);
		assert.isTrue(success);

	});

	it('should reject messages that do not have a uuid', function () {
		var success = true;
		var event = document.createEvent('Event');
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.data = '{ "_respondable": true, "topic": "batman" }';
		event.data = JSON.stringify({
			_respondable: true,
			topic: 'batman'
		});
		event.source = window;

		axe.utils.respondable(window, 'batman', 'nananana', true, function () {
			success = false;
		});
		document.dispatchEvent(event);
		assert.isTrue(success);

	});

	it('should reject messages that do not have a matching uuid', function () {
		var success = true;
		var event = document.createEvent('Event');
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.data = '{ "_respondable": true, "topic": "batman", "uuid": "12" }';
		event.data = JSON.stringify({
			_respondable: true,
			topic: 'batman',
			uuid: 'not-' + mockUUID
		});
		event.source = window;

		axe.utils.respondable(window, 'batman', 'nananana', true, function () {
			success = false;
		});
		document.dispatchEvent(event);
		assert.isTrue(success);

	});

	it('should reject messages that do not have `_respondable: true`', function () {
		var success = true;
		var event = document.createEvent('Event');
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.data = '{ "uuid": "48", "topic": "batman" }';
		event.data = JSON.stringify({
			topic: 'batman',
			uuid: mockUUID
		});
		event.source = window;

		axe.utils.respondable(window, 'batman', 'nananana', true, function () {
			success = false;
		});
		document.dispatchEvent(event);
		assert.isTrue(success);
	});

	it('should throw if an error message was send', function () {
		var success = false;
		var event = document.createEvent('Event');
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.data = JSON.stringify({
			_respondable: true,
			_source: 'axe.2.0.0',
			topic: 'Death star',
			error: {
				name: 'ReferenceError',
				message: 'The exhaust port is open!',
				trail: '... boom'
			},
			uuid: mockUUID
		});
		event.source = window;

		axe.utils.respondable(window, 'Death star', null, true, function (data) {
			success = true;
			assert.instanceOf(data, ReferenceError);
			assert.equal(data.message, 'The exhaust port is open!');
		});

		document.dispatchEvent(event);
		assert.isTrue(success);
	});

	it('uses respondable.isInFrame() to check if the page is in a frame or not', function() {
		assert.equal(axe.utils.respondable.isInFrame(), !!window.frameElement);

		assert.isFalse(axe.utils.respondable.isInFrame({
			frameElement: null
		}));
		assert.isTrue(axe.utils.respondable.isInFrame({
			frameElement: document.createElement('iframe')
		}));
	});

	describe('subscribe', function () {
		it('should be a function', function () {
			assert.isFunction(axe.utils.respondable.subscribe);
		});

		it('should receive messages', function (done) {
			var expected = null;
			axe.utils.respondable.subscribe('catman', function (data) {
				assert.equal(data, expected);
				if (data === 'yay') {
					done();
				}
			});
			axe.utils.respondable(window, 'catman', null, undefined, function (data, keepalive, respond) {
				assert.isNull(data);
				setTimeout(function () {
					respond('yay');
					expected = 'yay';

				}, 0);
			});
		});

		it('should propagate the keepalive setting', function (done) {
			var expected = null;
			axe.utils.respondable.subscribe('catman', function (data, keepalive) {
				assert.equal(keepalive, expected);
				if (data === 'yayyay') {
					done();
				}
			});
			axe.utils.respondable(window, 'catman', null, undefined, function (data, keepalive, respond) {
				assert.isNull(data);
				setTimeout(function () {
					expected = 'keepy';
					respond('yayyay', expected);
				}, 0);
			});
		});

		it('should allow multiple responses when keepalive', function (done) {
			var expected = 2;
			var called = 0;
			axe.utils.respondable.subscribe('catman', function (data) {
				if (data === 'yayyayyay') {
					called += 1;
					if (called === expected) {
						done();
					}
				}
			});
			axe.utils.respondable(window, 'catman', null, undefined, function (data, keepalive, respond) {
				assert.isNull(data);
				setTimeout(function () {
					respond('yayyayyay', true);
				}, 0);
				setTimeout(function () {
					respond('yayyayyay', true);
				}, 100);
			});
		});

		it('does not trigger for error messages', function (done) {
			var published = false;
			axe.utils.respondable.subscribe('catman', function () {
				published = true;
			});

			var err = new ReferenceError('whoopsy');
			axe.utils.respondable(window, 'catman', err);
			setTimeout(function () {
				assert.ok(!published, 'Error events should not trigger');
				done();
			}, 10);
		});

		it('returns an error if the subscribe method responds with an error', function (done) {
			var expected = 'Expected owlman to be batman';
			var wait = true;
			axe.utils.respondable.subscribe('owlman', function (data, keepalive, respond) {
				wait = false;
				respond(new TypeError(expected));
			});

			axe.utils.respondable(window, 'owlman', 'help!', true,
			function (data) {
				if (!wait) {
					assert.instanceOf(data, TypeError);
					assert.equal(data.message.split(/\n/)[0], expected);
					done();
				}
			});
		});

		it('returns an error if the subscribe method throws', function (done) {
			var wait = true;
			var expected = 'Expected owlman to be batman';
			axe.utils.respondable.subscribe('owlman', function () {
				wait = false;
				throw new TypeError(expected);
			});

			// use keepalive, because we're running on the same window,
			// otherwise it would delete the response before subscribe
			// gets to react
			axe.utils.respondable(window, 'owlman', null, true,
			function (data) {
				if (!wait) {
					assert.instanceOf(data, TypeError);
					assert.equal(data.message.split(/\n/)[0], expected);
					done();
				}
			});
		});

	});

});
