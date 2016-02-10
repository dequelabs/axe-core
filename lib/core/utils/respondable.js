/*global uuid */
(function (exports) {
	'use strict';
	var messages = {},
		subscribers = {};

	/**
	 * Verify the received message is from the "respondable" module
	 * @private
	 * @param  {Object} postedMessage The message received via postMessage
	 * @return {Boolean}              `true` if the message is verified from respondable
	 */
	function verify(postedMessage) {
		return typeof postedMessage === 'object' && typeof postedMessage.uuid === 'string' &&
			postedMessage._respondable === true;
	}

	/**
	 * Posts the message to correct frame.
	 * This abstraction necessary because IE9 & 10 do not support posting Objects; only strings
	 * @private
	 * @param  {Window}   win      The `window` to post the message to
	 * @param  {String}   topic    The topic of the message
	 * @param  {Object}   message  The message content
	 * @param  {String}   uuid     The UUID, or pseudo-unique ID of the message
	 * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
	 * @param  {Function} callback The function to invoke when/if the message is responded to
	 */
	function post(win, topic, message, uuid, keepalive, callback) {
		var error;
		if (message instanceof Error) {
			error = {
				name: message.name,
				message: message.message,
				stack: message.stack
			};
			message = undefined;
		}

		var data = {
			uuid: uuid,
			topic: topic,
			message: message,
			error: error,
			_respondable: true,
			_keepalive: keepalive
		};

		if (typeof callback === 'function') {
			messages[uuid] = callback;
		}

		win.postMessage(JSON.stringify(data), '*');
	}

	/**
	 * Post a message to a window who may or may not respond to it.
	 * @param  {Window}   win      The window to post the message to
	 * @param  {String}   topic    The topic of the message
	 * @param  {Object}   message  The message content
	 * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
	 * @param  {Function} callback The function to invoke when/if the message is responded to
	 */
	function respondable(win, topic, message, keepalive, callback) {
		var id = uuid.v1();
		post(win, topic, message, id, keepalive, callback);
	}

	/**
	 * Subscribe to messages sent via the `respondable` module.
	 * @param  {String}   topic    The topic to listen to
	 * @param  {Function} callback The function to invoke when a message is received
	 */
	respondable.subscribe = function (topic, callback) {
		subscribers[topic] = callback;
	};

	/**
	 * Publishes the "respondable" message to the appropriate subscriber
	 * @private
	 * @param  {Event} event The event object of the postMessage
	 * @param  {Object} data  The data sent with the message
	 * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
	 */
	function publish(target, data, keepalive) {
		var topic = data.topic;
		var subscriber = subscribers[topic];

		if (subscriber) {
			var responder = createResponder(target, null, data.uuid);
			subscriber(data.message, keepalive, responder);
		}
	}

	/**
	 * Helper closure to create a function that may be used to respond to a message
	 * @private
	 * @param  {Window} source The window from which the message originated
	 * @param  {String} topic  The topic of the message
	 * @param  {String} uuid   The "unique" ID of the original message
	 * @return {Function}      A function that may be invoked to respond to the message
	 */
	function createResponder(source, topic, uuid) {
		return function (message, keepalive, callback) {
			post(source, topic, message, uuid, keepalive, callback);
		};
	}

	/**
	 * Parse the received message for processing
	 * @param  {string} dataString Message received
	 * @return {object}            Object to be used for pub/sub
	 */
	function parseMessage(dataString) {
		var data;
		if (typeof dataString !== 'string') {
			return;
		}

		try {
			data = JSON.parse(dataString);
		} catch(ex) {}

		if (!verify(data)) {
			return;
		}

		if (typeof data.error === 'object') {
			data.error = buildErrorObject(data.error);
		} else {
			data.error = undefined;
		}
		return data;
	}

	/**
	 * Convert a javascript Error into something that can be stringified
	 * @param  {Error} error  Any type of error
	 * @return {Object}       Processable object
	 */
	function buildErrorObject(error) {
		var msg;
		var ErrConstructor = window[error.name] || Error;
		if (!error.stack) {
			msg = error.message || 'Unknown error occurred';
		} else {
			msg = error.stack.split(/: /)[1];
		}
		return new ErrConstructor(msg);
	}

	window.addEventListener('message', function (e) {
		var data = parseMessage(e.data);
		if (!data) {
			return;
		}

		var uuid = data.uuid;
		var keepalive = data._keepalive;
		var callback = messages[uuid];
		if (callback) {
			var result = data.error || data.message;
			var responder = createResponder(e.source, data.topic, uuid);
			callback(result, keepalive, responder);

			if (!keepalive) {
				messages[uuid] = null;
			}
		}
		if (!data.error) {
			try {
				publish(e.source, data, keepalive);
			} catch (err) {
				callback(err);
			}
		}
	}, false);

	exports.respondable = respondable;

}(utils));
