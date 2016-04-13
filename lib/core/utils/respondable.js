/* jshint latedef: false */
/* global uuid */
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
	 * @param  {Function} callback The function to invoke when/if the message is responded to
	 */
	function post(win, topic, message, uuid, callback) {

		var data = {
			uuid: uuid,
			topic: topic,
			message: message,
			_respondable: true
		};

		messages[uuid] = callback;
		win.postMessage(JSON.stringify(data), '*');
	}

	/**
	 * Post a message to a window who may or may not respond to it.
	 * @param  {Window}   win      The window to post the message to
	 * @param  {String}   topic    The topic of the message
	 * @param  {Object}   message  The message content
	 * @param  {Function} callback The function to invoke when/if the message is responded to
	 */
	function respondable(win, topic, message, callback) {
		var id = uuid.v1();
		post(win, topic, message, id, callback);
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
	 */
	function publish(event, data) {
		var topic = data.topic,
			message = data.message,
			subscriber = subscribers[topic];
		if (subscriber) {
			subscriber(message, createResponder(event.source, null, data.uuid));
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
		return function (message, callback) {
			post(source, topic, message, uuid, callback);
		};
	}

	if (typeof window.addEventListener === 'function') {
		window.addEventListener('message', function (e) {

			if (typeof e.data !== 'string') {
				return;
			}

			var data;
			try {
				data = JSON.parse(e.data);
			} catch(ex) {}

			if (!verify(data)) {
				return;
			}

			var uuid = data.uuid;
			if (messages[uuid]) {
				messages[uuid](data.message, createResponder(e.source, data.topic, uuid));
				messages[uuid] = null;
			}

			publish(e, data);
		}, false);
	}

	exports.respondable = respondable;

}(utils));
