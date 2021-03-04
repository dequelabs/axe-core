import assert from '../assert';
const subscribers = {};
const channels = {};

export function storeCallback(
	{ topic, channelId },
	callback,
	sendToParent = true
) {
	if (topic) {
		assert(!subscribers[topic], `Topic ${topic} is already registered to.`);
		subscribers[topic] = { callback, sendToParent };
	} else if (channelId) {
		assert(
			!channels[channelId],
			`A callback already exists for this message channel.`
		);
		channels[channelId] = { callback, sendToParent };
	}
}

export function getCallback({ topic, channelId }) {
	if (topic) {
		return subscribers[topic];
	} else if (channelId) {
		return channels[channelId];
	}
}

export function deleteCallback({ topic, channelId }) {
	if (topic) {
		delete subscribers[topic];
	} else if (channelId) {
		delete channels[channelId];
	}
}
