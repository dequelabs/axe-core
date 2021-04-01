import { storeReplyHandler } from './channel-store';
import { post } from './post';
import { createMessageId } from './message-id';

/**
 * Helper closure to create a function that may be used to respond to a message
 * @private
 * @param  {Window} win    The window from which the message originated
 * @param  {String} channelId   The "unique" ID of the original message
 * @return {Function}      A function that may be invoked to respond to the message
 */
export function createResponder(win, channelId, sendToParent = true) {
  return function respond(message, keepalive, replyHandler) {
    if (typeof replyHandler === 'function') {
      storeReplyHandler(channelId, replyHandler, sendToParent);
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
