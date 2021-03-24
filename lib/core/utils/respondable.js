import { v4 as createUuid } from './uuid';
import assert from './assert';
import {
  storeCallback,
  getCallback,
  deleteCallback
} from './respondable/callback-store';
import { createMessageId } from './respondable/message-id';
import { setDefaultFrameMessenger } from './respondable/set-default-frame-messenger';

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

setDefaultFrameMessenger(respondable);
