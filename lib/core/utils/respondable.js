import { v4 as createUuid } from './uuid';
import assert from './assert';
import {
	storeCallback,
	getCallback,
	deleteCallback
} from './respondable/callback-store';
import { parseMessage } from './respondable/message-parser';
import {
	assertIsFrameWindow,
	assertIsParentWindow
} from './respondable/assert-window';
import { post } from './respondable/post';
import { createMessageId, isNewMessage } from './respondable/message-id';

/**
 * Post a message to a window who may or may not respond to it.
 * @param  {Window}   win      The window to post the message to
 * @param  {String}   topic    The topic of the message
 * @param  {Object}   message  The message content
 * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
 * @param  {Function} callback The function to invoke when/if the message is responded to
 */
export default function respondable(win, topic, message, keepalive, callback) {
	const channelId = `${createUuid()}:${createUuid()}`;
	if (typeof callback === 'function') {
		storeCallback({ channelId }, callback, false);
	}
	post(win, {
		topic,
		channelId,
		message,
		messageId: createMessageId(),
		keepalive: !!keepalive,
		sendToParent: false
	});
}

// Set up the global listener
if (typeof window.addEventListener === 'function') {
	window.addEventListener('message', messageListener, false);
}

/**
 * Handle incoming window messages
 * @param  {MessageEvent}
 */
function messageListener({ data: dataString, source: win }) {
	const { channelId, topic, message, messageId, keepalive } =
		parseMessage(dataString) || {};
	const { callback, sendToParent } = getCallback({ channelId, topic }) || {};
	if (!shouldRunCallback({ message, messageId, callback, sendToParent })) {
		return;
	}

	if (!keepalive && channelId) {
		deleteCallback({ channelId });
	}
	runCallback(win, { channelId, message, keepalive, sendToParent, callback });
}

/**
 * Subscribe to messages sent via the `respondable` module.
 *
 * Axe._load uses this to listen for messages from other frames
 *
 * @param  {String}   topic    The topic to listen to
 * @param  {Function} callback The function to invoke when a message is received
 */
respondable.subscribe = function subscribe(topic, callback) {
	assert(
		typeof callback === 'function',
		'Subscriber callback must be a function'
	);
	storeCallback({ topic }, callback);
};

/**
 * checks if the current context is inside a frame
 * @return {Boolean}
 */
respondable.isInFrame = function isInFrame(win = window) {
	return !!win.frameElement;
};

/**
 * Test if the callback should be invoked with this message
 * @param {object} messageData
 */
function shouldRunCallback({ message, messageId, callback, sendToParent }) {
	// An error should never come from a parent. Log it and exit.
	if (message instanceof Error && sendToParent) {
		axe.log(message);
		return false;
	}

	return !!callback && isNewMessage(messageId);
}

/**
 * Run the callback, including handling any errors that might come doing so
 * @param {window} win
 * @param {object} messageData
 */
function runCallback(
	win,
	{ channelId, message, keepalive, sendToParent, callback }
) {
	try {
		// Only accept messages from parent or child frames
		sendToParent ? assertIsParentWindow(win) : assertIsFrameWindow(win);
		const responder = createResponder(win, channelId, sendToParent);
		callback(message, keepalive, responder);
	} catch (error) {
		processError(win, error, channelId, sendToParent);
	}
}

/**
 * Log, or post an error to the parent window
 * @param {window} win
 * @param {object} messageData
 */
function processError(win, error, channelId, sendToParent) {
	if (!sendToParent) {
		return axe.log(error);
	}

	try {
		post(win, {
			topic: null,
			channelId,
			message: error,
			messageId: createMessageId(),
			keepalive: true,
			sendToParent
		});
	} catch (err) {
		// Last resort, logging
		return axe.log(err);
	}
}

/**
 * Helper closure to create a function that may be used to respond to a message
 * @private
 * @param  {Window} win    The window from which the message originated
 * @param  {String} channelId   The "unique" ID of the original message
 * @return {Function}      A function that may be invoked to respond to the message
 */
function createResponder(win, channelId, sendToParent) {
	return function respond(message, keepalive, callback) {
		if (typeof callback === 'function') {
			storeCallback({ channelId }, callback, sendToParent);
		}
		post(win, {
			topic: null,
			channelId,
			message,
			messageId: createMessageId(),
			keepalive: !!keepalive,
			sendToParent
		});
	};
}
