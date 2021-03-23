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
import { createMessageId } from './respondable/message-id';
import { shouldRunCallback } from './respondable/should-run-callback';

let closeListener;
let postMessage;
let messageHandler;

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
  postMessage(win, {
    topic,
    channelId,
    message,
    messageId: createMessageId(),
    keepalive: !!keepalive,
    sendToParent: false
  });
}

/**
 * Handle incoming window messages
 * @param  {Object} data
 * @param {Function} responder
 */
function messageListener(data, responder) {
  const { channelId, topic, message, keepalive } = data;
  const { callback } = getCallback({ channelId, topic }) || {};

  if (!keepalive && channelId) {
    deleteCallback({ channelId });
  }

  try {
    callback(message, keepalive, responder);
  } catch (error) {
    axe.log(error);
    responder(error, keepalive);
  }
}

/**
 * Update how respondable communicates with iframes.
 * @param {Function} frameHandler  Object with open, post, and close functions
 */
respondable.updateMessenger = function updateMessenger(frameHandler) {
  const { open, post, close } = frameHandler;

  if (closeListener) {
    closeListener(messageHandler);
  }

  assert(typeof open === 'function', 'open callback must be a function');
  assert(typeof post === 'function', 'post callback must be a function');
  assert(typeof close === 'function', 'close callback must be a function');

  messageHandler = open(messageListener);
  postMessage = post;
  closeListener = close;
};

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
    postMessage(win, {
      topic: null,
      channelId,
      message,
      messageId: createMessageId(),
      keepalive: !!keepalive,
      sendToParent
    });
  };
}

// setup default axe frame messenger (make a function so we can
// call it during tests to reset respondable to default state)
export function defaultFrameMessenger() {
  respondable.updateMessenger({
    open(listener) {
      /**
       * Handle incoming window messages
       * @param  {MessageEvent}
       */
      function messageHandler({ data: dataString, source: win }) {
        const data = parseMessage(dataString) || {};
        const { channelId, message, messageId } = data;
        const { callback, sendToParent } = getCallback(data) || {};

        if (
          !shouldRunCallback({ message, messageId, callback, sendToParent })
        ) {
          return;
        }

        const responder = createResponder(win, channelId, sendToParent);

        try {
          // Only accept messages from parent or child frames
          sendToParent ? assertIsParentWindow(win) : assertIsFrameWindow(win);
          listener(data, responder);
        } catch (error) {
          processError(win, error, channelId, sendToParent);
        }
      }

      if (typeof window.addEventListener === 'function') {
        window.addEventListener('message', messageHandler, false);
      }

      return messageHandler;
    },

    post,

    close(messageHandler) {
      window.removeEventListener('message', messageHandler, false);
    }
  });
}
defaultFrameMessenger();
