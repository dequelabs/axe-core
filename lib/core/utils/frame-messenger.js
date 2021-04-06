import { post } from './frame-messenger/post';
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

    return handler;
  },

  post,

  close(handler) {
    window.removeEventListener('message', handler, false);
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
