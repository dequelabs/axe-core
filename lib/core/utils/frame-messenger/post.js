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
 */
export function post(win, data, replyHandler) {
  // TODO: Remove keepalive here, don't think I need it;
  const { topic, message, channelId, keepalive, sendToParent } = data;
  if (typeof replyHandler === 'function') {
    storeReplyHandler(channelId, replyHandler, false);
  }

  // Prevent messaging to an inappropriate window
  sendToParent ? assertIsParentWindow(win) : assertIsFrameWindow(win);
  if (message instanceof Error && !sendToParent) {
    return axe.log(message);
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
  if (axe._audit.allowedOrigins) {
    if (axe._audit.allowedOrigins.includes(constants.allOrigins)) {
      return win.postMessage(dataString, '*');
    }

    axe._audit.allowedOrigins.forEach(origin => {
      origin = origin === constants.sameOrigin ? window.origin : origin;
      win.postMessage(dataString, origin);
    });
  }
}
