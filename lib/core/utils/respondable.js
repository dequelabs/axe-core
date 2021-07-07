<<<<<<< HEAD
import { v4 as createUuid } from './uuid';
import assert from './assert';
<<<<<<< HEAD
<<<<<<< Updated upstream
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
=======
import { setDefaultFrameMessenger } from './frame-messenger';
=======
import { v1 as uuid, axeUuid } from './uuid';
import cache from '../base/cache';
import { getAudit } from '../globals';
import constants from '../constants';
>>>>>>> origin/allIn
=======
import { setDefaultFrameMessenger } from './frame-messenger';
>>>>>>> develop

let closeHandler;
let postMessage;

<<<<<<< HEAD
<<<<<<< HEAD
const topicHandlers = {};
=======
/**
 * get the unique string to be used to identify our instance of axe
 * @private
 */
function _getSource() {
	var application = 'axeAPI',
		version = '',
		src;

	const audit = getAudit();
	if (typeof axe !== 'undefined' && audit && audit.application) {
		application = audit.application;
	}
	if (typeof axe !== 'undefined') {
		version = constants.version;
	}
	src = application + '.' + version;
	return src;
}
/**
 * Verify the received message is from the "respondable" module
 * @private
 * @param  {Object} postedMessage The message received via postMessage
 * @return {Boolean}              `true` if the message is verified from respondable
 */
function verify(postedMessage) {
	if (
		// Check incoming message is valid
		typeof postedMessage === 'object' &&
		typeof postedMessage.uuid === 'string' &&
		postedMessage._respondable === true
	) {
		var messageSource = _getSource();
		return (
			// Check the version matches
			postedMessage._source === messageSource ||
			// Allow free communication with axe test
			postedMessage._source === 'axeAPI.x.y.z' ||
			messageSource === 'axeAPI.x.y.z'
		);
	}
	return false;
}
>>>>>>> origin/allIn
>>>>>>> Stashed changes
=======
const topicHandlers = {};
>>>>>>> develop

/**
 * Post a message to a window who may or may not respond to it.
 * @param  {Window}   win      The window to post the message to
 * @param  {String}   topic    The topic of the message
 * @param  {Object}   message  The message content
 * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
 * @param  {Function} replyHandler The function to invoke when/if the message is responded to
 */
<<<<<<< HEAD
<<<<<<< Updated upstream
export default function respondable(win, topic, message, keepalive, callback) {
  const channelId = `${createUuid()}:${createUuid()}`;
  if (typeof callback === 'function') {
    storeCallback({ channelId }, callback, false);
  }
  post(win, {
=======
<<<<<<< HEAD
=======
>>>>>>> develop
export default function respondable(
  win,
  topic,
  message,
  keepalive,
  replyHandler
) {
  const data = {
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> develop
    topic,
    message,
    channelId: `${createUuid()}:${createUuid()}`,
    keepalive
  };

<<<<<<< HEAD
<<<<<<< Updated upstream
// Set up the global listener
if (typeof window.addEventListener === 'function') {
  window.addEventListener('message', messageListener, false);
=======
  return postMessage(win, data, replyHandler);
=======
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
		_source: _getSource(),
		_axeuuid: axeUuid,
		_keepalive: keepalive
	};

	var axeRespondables = cache.get('axeRespondables');
	if (!axeRespondables) {
		axeRespondables = {};
		cache.set('axeRespondables', axeRespondables);
	}
	axeRespondables[uuid] = true;
	if (typeof callback === 'function') {
		messages[uuid] = callback;
	}

	win.postMessage(JSON.stringify(data), '*');
>>>>>>> origin/allIn
>>>>>>> Stashed changes
=======
  return postMessage(win, data, replyHandler);
>>>>>>> develop
}

/**
 * Handle incoming window messages
 * @param  {Object} data
 * @param {Function} responder
 */
function messageListener(data, responder) {
  const { topic, message, keepalive } = data;
  const topicHandler = topicHandlers[topic];
  if (!topicHandler) {
    return;
  }

  try {
    topicHandler(message, keepalive, responder);
  } catch (error) {
    axe.log(error);
    responder(error, keepalive);
  }
}

/**
 * Update how respondable communicates with iframes.
 * @param {Function} frameHandler  Object with open, post, and close functions
 */
respondable.updateMessenger = function updateMessenger({ open, post }) {
  assert(typeof open === 'function', 'open callback must be a function');
  assert(typeof post === 'function', 'post callback must be a function');

  if (closeHandler) {
    closeHandler();
  }

  var close = open(messageListener);

  if (close) {
    assert(
      typeof close === 'function',
      'open callback must return a cleanup function'
    );
    closeHandler = close;
  } else {
    closeHandler = null;
  }

  postMessage = post;
};

/**
 * Subscribe to messages sent via the `respondable` module.
 *
 * Axe._load uses this to listen for messages from other frames
 *
 * @param  {String}   topic    The topic to listen to
 * @param  {Function} topicHandler The function to invoke when a message is received
 */
respondable.subscribe = function subscribe(topic, topicHandler) {
  assert(
    typeof topicHandler === 'function',
    'Subscriber callback must be a function'
  );
  assert(!topicHandlers[topic], `Topic ${topic} is already registered to.`);

  topicHandlers[topic] = topicHandler;
};

/**
 * checks if the current context is inside a frame
 * @return {Boolean}
 */
respondable.isInFrame = function isInFrame(win = window) {
  return !!win.frameElement;
};

<<<<<<< HEAD
<<<<<<< Updated upstream
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
=======
<<<<<<< HEAD
setDefaultFrameMessenger(respondable);
=======
/**
 * Helper closure to create a function that may be used to respond to a message
 * @private
 * @param  {Window} source The window from which the message originated
 * @param  {String} topic  The topic of the message
 * @param  {String} uuid   The "unique" ID of the original message
 * @return {Function}      A function that may be invoked to respond to the message
 */
function createResponder(source, topic, uuid) {
	return function(message, keepalive, callback) {
		post(source, topic, message, uuid, keepalive, callback);
	};
}

/**
 * Publishes the "respondable" message to the appropriate subscriber
 * @private
 * @param  {Window}  source    The window from which the message originated
 * @param  {Object}  data      The data sent with the message
 * @param  {Boolean} keepalive Whether to allow multiple responses - default is false
 */
function publish(source, data, keepalive) {
	var topic = data.topic;
	var subscriber = subscribers[topic];

	if (subscriber) {
		var responder = createResponder(source, null, data.uuid);
		subscriber(data.message, keepalive, responder);
	}
}

// added for testing so we can fire subscriber events without having
// to mock the universe going through `respondable()`
respondable._publish = publish;

/**
 * Convert a javascript Error into something that can be stringified
 * @param  {Error} error  Any type of error
 * @return {Object}       Processable object
 */
function buildErrorObject(error) {
	var msg = error.message || 'Unknown error occurred';
	var errorName = errorTypes.includes(error.name) ? error.name : 'Error';
	var ErrConstructor = window[errorName] || Error;

	if (error.stack) {
		msg += '\n' + error.stack.replace(error.message, '');
	}
	return new ErrConstructor(msg);
}

/**
 * Parse the received message for processing
 * @param  {string} dataString Message received
 * @return {object}            Object to be used for pub/sub
 */
function parseMessage(dataString) {
	/*eslint no-empty: 0*/
	var data;
	if (typeof dataString !== 'string') {
		return;
	}

	try {
		data = JSON.parse(dataString);
	} catch (ex) {}

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

if (typeof window.addEventListener === 'function') {
	window.addEventListener(
		'message',
		function(e) {
			var data = parseMessage(e.data);
			if (!data || !data._axeuuid) {
				return;
			}

			var uuid = data.uuid;

			/**
			 * NOTE: messages from other contexts (frames) in response
			 * to a message should not contain the same axeUuid. We
			 * ignore these messages to prevent rogue postMessage
			 * handlers reflecting our messages.
			 * @see https://github.com/dequelabs/axe-core/issues/1754
			 */
			var axeRespondables = cache.get('axeRespondables') || {};
			if (axeRespondables[uuid] && data._axeuuid === axeUuid) {
				return;
			}

			var keepalive = data._keepalive;
			var callback = messages[uuid];

			if (callback) {
				var result = data.error || data.message;
				var responder = createResponder(e.source, data.topic, uuid);
				callback(result, keepalive, responder);

				if (!keepalive) {
					delete messages[uuid];
				}
			}

			if (!data.error) {
				try {
					publish(e.source, data, keepalive);
				} catch (err) {
					post(e.source, null, err, uuid, false);
				}
			}
		},
		false
	);
}

export default respondable;
>>>>>>> origin/allIn
>>>>>>> Stashed changes
=======
setDefaultFrameMessenger(respondable);
>>>>>>> develop
