import { postMessage } from './frame-messenger/post-message';
import { messageHandler } from './frame-messenger/message-handler';

/**
 * Setup default axe frame messenger (make a function so we can
 * call it during tests to reset respondable to default state).
 * @param {Object} respondable
 */
export const frameMessenger = {
  open(topicHandler) {
    const handler = function(messageEvent) {
      messageHandler(messageEvent, topicHandler);
    };

    if (typeof window.addEventListener === 'function') {
      window.addEventListener('message', handler, false);
    }

    return () => {
      window.removeEventListener('message', handler, false);
    };
  },

  post(win, data, replyHandler) {
    return postMessage(win, data, false, replyHandler);
  }
};

/**
 * Setup default axe frame messenger (make a function so we can
 * call it during tests to reset respondable to default state).
 * @param {Object} respondable
 */
export function setDefaultFrameMessenger(respondable) {
  respondable.updateMessenger(frameMessenger);
}
