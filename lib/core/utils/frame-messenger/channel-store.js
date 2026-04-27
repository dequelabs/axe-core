import assert from '../assert';

const channels = Object.create(null);
const restrictedKeys = ['__proto__', 'constructor', 'prototype'];

export function storeReplyHandler(
  channelId,
  replyHandler,
  sendToParent = true
) {
  if (restrictedKeys.includes(channelId)) {
    throw new Error(`Invalid channelId: ${channelId}`);
  }
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
