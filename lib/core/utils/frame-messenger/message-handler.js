import { processError } from './process-error';
import { createResponder } from './create-responder';
import { parseMessage } from './message-parser';
import { assertIsFrameWindow, assertIsParentWindow } from './assert-window';
import { getReplyHandler, deleteReplyHandler } from './channel-store';
import { isNewMessage } from './message-id';
import constants from '../../constants';

/**
 * Handle incoming window messages
 * @param  {MessageEvent}
 * @param  {Function} topicHandler
 */
export function messageHandler(
  { origin, data: dataString, source: win },
  topicHandler
) {
  const data = parseMessage(dataString) || {};
  const { channelId, message, messageId } = data;

  if (!axe._audit.allowedOrigins) {
    return;
  }

  // TODO: es_modules_audit
  const allowedOrigins = axe._audit.allowedOrigins.map(targetOrigin => {
    if (targetOrigin === constants.sameOrigin && window.location) {
      return window.location.origin;
    }

    return targetOrigin;
  });

  if (
    !allowedOrigins.includes(constants.allOrigins) &&
    !allowedOrigins.includes(origin)
  ) {
    return;
  }

  if (!isNewMessage(messageId)) {
    return;
  }

  // An error should never come from a parent. Log it and exit.
  if (message instanceof Error && win.parent !== window) {
    axe.log(message);
    return false;
  }

  try {
    if (data.topic) {
      const responder = createResponder(win, channelId);
      assertIsParentWindow(win);
      topicHandler(data, responder);
    } else {
      callReplyHandler(win, data);
    }
  } catch (error) {
    processError(win, error, channelId);
  }
}

function callReplyHandler(win, data) {
  const { channelId, message, keepalive } = data;
  const { replyHandler, sendToParent } = getReplyHandler(channelId) || {};

  if (!replyHandler) {
    return;
  }
  sendToParent ? assertIsParentWindow(win) : assertIsFrameWindow(win);
  const responder = createResponder(win, channelId, sendToParent);

  if (!keepalive && channelId) {
    deleteReplyHandler(channelId);
  }

  try {
    replyHandler(message, keepalive, responder);
  } catch (error) {
    axe.log(error);
    responder(error, keepalive);
  }
}
