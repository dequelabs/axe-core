import { post } from './post';
import { createMessageId } from './message-id';

/**
 * Log, or post an error to the parent window
 * @param {window} win
 * @param {object} messageData
 */
export function processError(win, error, channelId, sendToParent) {
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
