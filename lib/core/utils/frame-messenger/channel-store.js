import assert from '../assert';

const channels = {};

export function storeReplyHandler(
  channelId,
  replyHandler,
  sendToParent = true
) {
  assert(
    !Object.prototype.hasOwnProperty.call(channels, channelId),
    `A replyHandler already exists for this message channel.`
  );
  channels[channelId] = { replyHandler, sendToParent };
}

export function getReplyHandler(channelId) {
  return Object.prototype.hasOwnProperty.call(channels, channelId)
    ? channels[channelId]
    : undefined;
}

export function deleteReplyHandler(channelId) {
  delete channels[channelId];
}
