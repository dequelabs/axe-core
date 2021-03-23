import { isNewMessage } from './message-id';

/**
 * Test if the callback should be invoked with this message
 * @param {object} messageData
 */
export function shouldRunCallback({
  message,
  messageId,
  callback,
  sendToParent
}) {
  // An error should never come from a parent. Log it and exit.
  if (message instanceof Error && sendToParent) {
    axe.log(message);
    return false;
  }

  return !!callback && isNewMessage(messageId);
}
