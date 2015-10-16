describe('utils.respondable', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(utils.respondable);
	});

	it('should accept 5 parameters', function () {
		assert.lengthOf(utils.respondable, 5);
	});

	it('should call `postMessage` on first parameter', function () {
		var success = false;
		var win = {
			postMessage: function () {
				success = true;
			}
		};

		utils.respondable(win, 'batman', 'nananana');
		assert.isTrue(success);
	});

	it('should stringify message', function (done) {
		var win = {
			postMessage: function (msg) {
				assert.isString(msg);
				done();
			}
		};

		utils.respondable(win, 'batman', { derp: true });

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

		utils.respondable(win, 'batman', 'nananana');
	});

	it('should add the `keepalive`', function (done) {
		var win = {
			postMessage: function (msg) {
				msg = JSON.parse(msg);

				assert.equal(msg._keepalive, 'batman');
				done();
			}
		};

		utils.respondable(win, 'superman', 'spidey', 'batman');
	});

	it('should add `_respondable` to the message', function (done) {
		var win = {
			postMessage: function (msg) {
				msg = JSON.parse(msg);

				assert.equal(msg._respondable, true);
				done();
			}
		};

		utils.respondable(win, 'batman', 'nananana');
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

		utils.respondable(win, 'batman', 'nananana');
		assert.isTrue(success);

		window.uuid.v1 = orig;
	});

	it('should reject messages that are that are not strings', function () {
		var success = true;
		var event = document.createEvent('Event');
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.data = { uuid: 1, _respondable: true};
		event.source = window;

		utils.respondable(window, 'batman', 'nananana', function () {
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
		event.data = '{ invalid object }';
		event.source = window;

		utils.respondable(window, 'batman', 'nananana', function () {
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
		event.source = window;

		utils.respondable(window, 'batman', 'nananana', function () {
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
		event.source = window;

		utils.respondable(window, 'batman', 'nananana', function () {
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
		event.source = window;

		utils.respondable(window, 'batman', 'nananana', function () {
			success = false;
		});
		document.dispatchEvent(event);
		assert.isTrue(success);

	});

	describe('subscribe', function () {
		it('should be a function', function () {
			assert.isFunction(utils.respondable.subscribe);
		});

		it('should receive messages', function (done) {
			var expected = null;
			utils.respondable.subscribe('catman', function (data) {
				assert.equal(data, expected);
				if (data === 'yay') {
					done();
				}
			});
			utils.respondable(window, 'catman', null, undefined, function (data, keepalive, respond) {
				assert.isNull(data);
				setTimeout(function () {
					respond('yay');
					expected = 'yay';

				}, 0);
			});
		});

		it('should propagate the keepalive setting', function (done) {
			var expected = null;
			utils.respondable.subscribe('catman', function (data, keepalive) {
				assert.equal(keepalive, expected);
				if (data === 'yayyay') {
					done();
				}
			});
			utils.respondable(window, 'catman', null, undefined, function (data, keepalive, respond) {
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
			utils.respondable.subscribe('catman', function (data) {
				if (data === 'yayyayyay') {
					called += 1;
					if (called === expected) {
						done();
					}
				}
			});
			utils.respondable(window, 'catman', null, undefined, function (data, keepalive, respond) {
				assert.isNull(data);
				setTimeout(function () {
					respond('yayyayyay', true);
				}, 0);
				setTimeout(function () {
					respond('yayyayyay', true);
				}, 100);
			});
		});

	});

});
