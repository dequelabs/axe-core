import { shouldRunCallback } from './should-run-callback';
import { processError } from './process-error';
import { createResponder } from './create-responder';
import { parseMessage } from './message-parser';
import { assertIsFrameWindow, assertIsParentWindow } from './assert-window';
import { getCallback } from './callback-store';
import { post } from './post';

/**
 * Setup default axe frame messenger (make a function so we can
 * call it during tests to reset respondable to default state).
 * @param {Function/Object} respondable
 */
export function setDefaultFrameMessenger(respondable) {
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
