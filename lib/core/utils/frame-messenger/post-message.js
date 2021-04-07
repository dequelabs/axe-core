import { stringifyMessage } from './message-parser';
import { assertIsParentWindow, assertIsFrameWindow } from './assert-window';
import { storeReplyHandler } from './channel-store';
import { createMessageId } from './message-id';
import constants from '../../constants';

/**
 * Posts the message to correct frame.
 * This abstraction necessary because IE9 & 10 do not support posting Objects; only strings
 * @private
 * @param  {Window}   win      The `window` to post the message to
 * @param  {String}   topic    The topic of the message
 * @param  {Object}   message  The message content
 * @param  {String}   uuid     The UUID, or pseudo-unique ID of the message
 * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
 *
 * @return {Boolean} true if the message was sent
 */
export function postMessage(win, data, sendToParent, replyHandler) {
  const { topic, message, channelId, keepalive } = data;
  if (typeof replyHandler === 'function') {
    storeReplyHandler(channelId, replyHandler, false);
  }

  // Prevent messaging to an inappropriate window
  sendToParent ? assertIsParentWindow(win) : assertIsFrameWindow(win);
  if (message instanceof Error && !sendToParent) {
    axe.log(message);
    return false;
  }

  const messageId = createMessageId();
  const dataString = stringifyMessage({
    topic,
    message,
    channelId,
    keepalive,
    messageId
  });

  // TODO: es_modules_audit
  const { allowedOrigins } = axe._audit;
  if (
    !allowedOrigins ||
    !allowedOrigins.length ||
    (allowedOrigins.length === 1 &&
      allowedOrigins[0] === constants.sameOrigin &&
      !window.location)
  ) {
    return false;
  }

  if (allowedOrigins.includes(constants.allOrigins)) {
    win.postMessage(dataString, '*');
    return true;
  }

  allowedOrigins.forEach(origin => {
    if (origin === constants.sameOrigin) {
      if (!window.location) {
        return;
      }

      origin = window.location.origin;
    }

    try {
      win.postMessage(dataString, origin);
    } catch (err) {
      if (err instanceof win.DOMException) {
        throw new Error(
          `allowedOrigins value "${origin}" is not a valid origin`
        );
      }

      throw err;
    }
  });

  return true;
}
