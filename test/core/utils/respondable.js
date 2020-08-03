describe('axe.utils.respondable', function() {
	'use strict';

	it('should be a function', function() {
		assert.isFunction(axe.utils.respondable);
	});

	it('should accept 5 parameters', function() {
		assert.lengthOf(axe.utils.respondable, 5);
	});

	it('should call `postMessage` on first parameter', function() {
		var success = false;
		var win = {
			postMessage: function() {
				success = true;
			}
		};

		axe.utils.respondable(win, 'batman', 'nananana');
		assert.isTrue(success);
	});

	it('should stringify message', function(done) {
		var win = {
			postMessage: function(msg) {
				assert.isString(msg);
				done();
			}
		};

		axe.utils.respondable(win, 'batman', { derp: true });
	});

	it('should add the `topic` and `message` the message', function(done) {
		var win = {
			postMessage: function(msg) {
				msg = JSON.parse(msg);

				assert.equal(msg.topic, 'batman');
				assert.isTrue(msg._respondable);
				done();
			}
		};

		axe.utils.respondable(win, 'batman', 'nananana');
	});

	it('should add the `keepalive`', function(done) {
		var win = {
			postMessage: function(msg) {
				msg = JSON.parse(msg);

				assert.equal(msg._keepalive, 'batman');
				done();
			}
		};

		axe.utils.respondable(win, 'superman', 'spidey', 'batman');
	});

	it('should add `_respondable` to the message', function(done) {
		var win = {
			postMessage: function(msg) {
				msg = JSON.parse(msg);

				assert.equal(msg._respondable, true);
				done();
			}
		};

		axe.utils.respondable(win, 'batman', 'nananana');
	});

	describe('messageHandler', function() {
		var event = document.createEvent('Event');
		// Define that the event name is 'build'.
		event.initEvent('message', true, true);
		event.source = window;

		var eventData;
		var win;
		var axeVersion;

		beforeEach(function() {
			axeVersion = axe.version;
			win = {
				postMessage: function(message) {
					var data = JSON.parse(message);
					eventData.uuid = data.uuid;
					event.data = JSON.stringify(eventData);
					document.dispatchEvent(event);
				}
			};
		});

		afterEach(function() {
			axe.version = axeVersion;
		});

		it('should pass messages that have all required properties', function(done) {
			eventData = {
				_respondable: true,
				_source: 'axeAPI.2.0.0',
				message: 'Help us Obi-Wan',
				_axeuuid: 'otherAxe'
			};

			axe.utils.respondable(win, 'Death star', null, true, function(data) {
				assert.equal(data, 'Help us Obi-Wan');
				done();
			});
		});

		it('should allow messages with _source axeAPI.x.y.z', function(done) {
			eventData = {
				_respondable: true,
				_source: 'axeAPI.x.y.z',
				message: 'Help us Obi-Wan',
				_axeuuid: 'otherAxe'
			};

			axe.utils.respondable(win, 'Death star', null, true, function(data) {
				assert.equal(data, 'Help us Obi-Wan');
				done();
			});
		});

		it('should allow messages if the axe version is x.y.z', function(done) {
			axe.version = 'x.y.z';
			eventData = {
				_respondable: true,
				_source: 'axeAPI.2.0.0',
				message: 'Help us Obi-Wan',
				_axeuuid: 'otherAxe'
			};

			axe.utils.respondable(win, 'Death star', null, true, function(data) {
				assert.equal(data, 'Help us Obi-Wan');
				done();
			});
		});

		it('should reject messages if the axe version is different', function(done) {
			axe.version = '1.0.0';
			eventData = {
				_respondable: true,
				_source: 'axeAPI.2.0.0',
				message: 'Help us Obi-Wan',
				_axeuuid: 'otherAxe'
			};

			axe.utils.respondable(win, 'Death star', null, true, function() {
				done(new Error('should not call callback'));
			});

			setTimeout(function() {
				done();
			}, 100);
		});

		it('should reject messages that are that are not strings', function(done) {
			eventData = {
				_respondable: true,
				_source: 'axeAPI.2.0.0',
				message: 'Help us Obi-Wan',
				_axeuuid: 'otherAxe'
			};

			win = {
				postMessage: function(message) {
					var data = JSON.parse(message);
					eventData.uuid = data.uuid;
					event.data = eventData;
					document.dispatchEvent(event);
				}
			};

			axe.utils.respondable(win, 'Death star', null, true, function() {
				done(new Error('should not call callback'));
			});

			setTimeout(function() {
				done();
			}, 100);
		});

		it('should reject messages that are invalid stringified objects', function(done) {
			eventData = {
				_respondable: true,
				_source: 'axeAPI.2.0.0',
				message: 'Help us Obi-Wan',
				_axeuuid: 'otherAxe'
			};

			win = {
				postMessage: function(message) {
					var data = JSON.parse(message);
					eventData.uuid = data.uuid;
					event.data = JSON.stringify(eventData) + 'joker tricks!';
					document.dispatchEvent(event);
				}
			};

			axe.utils.respondable(win, 'Death star', null, true, function() {
				done(new Error('should not call callback'));
			});

			setTimeout(function() {
				done();
			}, 100);
		});

		it('should reject messages that do not have a uuid', function(done) {
			eventData = {
				_respondable: true,
				_source: 'axeAPI.2.0.0',
				message: 'Help us Obi-Wan',
				_axeuuid: 'otherAxe'
			};

			win = {
				postMessage: function() {
					event.data = JSON.stringify(eventData);
					document.dispatchEvent(event);
				}
			};

			axe.utils.respondable(win, 'Death star', null, true, function() {
				done(new Error('should not call callback'));
			});

			setTimeout(function() {
				done();
			}, 100);
		});

		it('should reject messages that do not have a matching uuid', function(done) {
			eventData = {
				_respondable: true,
				_source: 'axeAPI.2.0.0',
				message: 'Help us Obi-Wan',
				_axeuuid: 'otherAxe'
			};

			win = {
				postMessage: function(message) {
					var data = JSON.parse(message);
					eventData.uuid = data.uuid + 'joker tricks!';
					event.data = JSON.stringify(eventData);
					document.dispatchEvent(event);
				}
			};

			axe.utils.respondable(win, 'Death star', null, true, function() {
				done(new Error('should not call callback'));
			});

			setTimeout(function() {
				done();
			}, 100);
		});

		it('should reject messages that do not have `_respondable: true`', function(done) {
			eventData = {
				_source: 'axeAPI.2.0.0',
				message: 'Help us Obi-Wan',
				_axeuuid: 'otherAxe'
			};

			axe.utils.respondable(win, 'Death star', null, true, function() {
				done(new Error('should not call callback'));
			});

			setTimeout(function() {
				done();
			}, 100);
		});

		it('should reject messages that do not have `_axeuuid`', function(done) {
			eventData = {
				_respondable: true,
				_source: 'axeAPI.2.0.0',
				message: 'Help us Obi-Wan'
			};

			axe.utils.respondable(win, 'Death star', null, true, function() {
				done(new Error('should not call callback'));
			});

			setTimeout(function() {
				done();
			}, 100);
		});

		it('should reject messages from the same axe instance (`_axeuuid`)', function(done) {
			eventData = {
				_respondable: true,
				_source: 'axeAPI.2.0.0',
				message: 'Help us Obi-Wan'
			};

			win = {
				postMessage: function(message) {
					var data = JSON.parse(message);
					eventData.uuid = data.uuid;
					eventData._axeuuid = data._axeuuid;
					event.data = JSON.stringify(eventData);
					document.dispatchEvent(event);
				}
			};

			axe.utils.respondable(win, 'Death star', null, true, function() {
				done(new Error('should not call callback'));
			});

			setTimeout(function() {
				done();
			}, 100);
		});

		it('should throw if an error message was send', function(done) {
			eventData = {
				_respondable: true,
				_source: 'axeAPI.2.0.0',
				error: {
					name: 'ReferenceError',
					message: 'The exhaust port is open!',
					trail: '... boom'
				},
				_axeuuid: 'otherAxe'
			};

			axe.utils.respondable(win, 'Death star', null, true, function(data) {
				assert.instanceOf(data, ReferenceError);
				assert.equal(data.message, 'The exhaust port is open!');
				done();
			});
		});

		it('should create an Error if an invalid error type is passed', function(done) {
			window.evil = function() {};

			eventData = {
				_respondable: true,
				_source: 'axeAPI.2.0.0',
				error: {
					name: 'evil',
					message: 'The exhaust port is open!',
					trail: '... boom'
				},
				_axeuuid: 'otherAxe'
			};

			axe.utils.respondable(win, 'Death star', null, true, function(data) {
				assert.instanceOf(data, Error);
				assert.equal(data.message, 'The exhaust port is open!');
				window.evil = undefined;
				done();
			});
		});
	});

	it('uses respondable.isInFrame() to check if the page is in a frame or not', function() {
		assert.equal(axe.utils.respondable.isInFrame(), !!window.frameElement);

		assert.isFalse(
			axe.utils.respondable.isInFrame({
				frameElement: null
			})
		);
		assert.isTrue(
			axe.utils.respondable.isInFrame({
				frameElement: document.createElement('iframe')
			})
		);
	});

	describe('subscribe', function() {
		var origAxeUUID = axe._uuid;
		var counter = 0;

		before(function() {
			// assign axe a new uuid every time it's requested to trick
			// the code that each respondable was called from a different
			// context
			Object.defineProperty(axe, '_uuid', {
				get: function() {
					return ++counter;
				}
			});
		});

		after(function() {
			Object.defineProperty(axe, '_uuid', {
				value: origAxeUUID
			});
		});

		it('should be a function', function() {
			assert.isFunction(axe.utils.respondable.subscribe);
		});

		it('should receive messages', function(done) {
			var expected = null;
			axe.utils.respondable.subscribe('catman', function(data) {
				assert.equal(data, expected);
				if (data === 'yay') {
					done();
				}
			});
			axe.utils.respondable(window, 'catman', null, undefined, function(
				data,
				keepalive,
				respond
			) {
				assert.isNull(data);
				setTimeout(function() {
					respond('yay');
					expected = 'yay';
				}, 0);
			});
		});

		it('should propagate the keepalive setting', function(done) {
			var expected = null;
			axe.utils.respondable.subscribe('catman', function(data, keepalive) {
				assert.equal(keepalive, expected);
				if (data === 'yayyay') {
					done();
				}
			});
			axe.utils.respondable(window, 'catman', null, undefined, function(
				data,
				keepalive,
				respond
			) {
				assert.isNull(data);
				setTimeout(function() {
					expected = 'keepy';
					respond('yayyay', expected);
				}, 0);
			});
		});

		it('should allow multiple responses when keepalive', function(done) {
			var expected = 2;
			var called = 0;
			axe.utils.respondable.subscribe('catman', function(data) {
				if (data === 'yayyayyay') {
					called += 1;
					if (called === expected) {
						done();
					}
				}
			});
			axe.utils.respondable(window, 'catman', null, undefined, function(
				data,
				keepalive,
				respond
			) {
				assert.isNull(data);
				setTimeout(function() {
					respond('yayyayyay', true);
				}, 0);
				setTimeout(function() {
					respond('yayyayyay', true);
				}, 100);
			});
		});

		it('does not trigger for error messages', function(done) {
			var published = false;
			axe.utils.respondable.subscribe('catman', function() {
				published = true;
			});

			var err = new ReferenceError('whoopsy');
			axe.utils.respondable(window, 'catman', err);
			setTimeout(function() {
				assert.ok(!published, 'Error events should not trigger');
				done();
			}, 10);
		});

		it('returns an error if the subscribe method responds with an error', function(done) {
			var expected = 'Expected owlman to be batman';
			var wait = true;
			axe.utils.respondable.subscribe('owlman', function(
				data,
				keepalive,
				respond
			) {
				wait = false;
				respond(new TypeError(expected));
			});

			axe.utils.respondable(window, 'owlman', 'help!', true, function(data) {
				if (!wait) {
					assert.instanceOf(data, TypeError);
					assert.equal(data.message.split(/\n/)[0], expected);
					done();
				}
			});
		});

		it('returns an error if the subscribe method throws', function(done) {
			var wait = true;
			var expected = 'Expected owlman to be batman';
			axe.utils.respondable.subscribe('owlman', function() {
				wait = false;
				throw new TypeError(expected);
			});

			// use keepalive, because we're running on the same window,
			// otherwise it would delete the response before subscribe
			// gets to react
			axe.utils.respondable(window, 'owlman', null, true, function(data) {
				if (!wait) {
					assert.instanceOf(data, TypeError);
					assert.equal(data.message.split(/\n/)[0], expected);
					done();
				}
			});
		});
	});
});
