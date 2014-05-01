/*global uuid */
(function (exports) {
	'use strict';
	var messages = {},
		subscribers = {};

	function verify(postedMessage) {
		return typeof postedMessage.uuid === 'string' && postedMessage._respondable === true;
	}

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

	function respondable(win, topic, message, callback) {
		var id = uuid.v1();
		post(win, topic, message, id, callback);
	}

	//@todo rename
	respondable.subscribe = function (topic, callback) {
		subscribers[topic] = callback;
	};

	function publish(event, data) {
		var topic = data.topic,
			message = data.message,
			subscriber = subscribers[topic];
		if (subscriber) {
			subscriber(message, createResponder(event.source, null, data.uuid));
		}
	}
	function createResponder(source, topic, uuid) {
		return function (message, callback) {
			post(source, topic, message, uuid, callback);
		};
	}

	window.addEventListener('message', function (e) {

		var data = JSON.parse(e.data);

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

	exports.respondable = respondable;

}(utils));