import assert from '../assert';
import cache from '../../base/cache';

// Kept in the cache so reply handlers are released at the end of an audit
const getChannels = () => cache.get('frameMessengerChannels', () => ({}));

export function storeReplyHandler(
  channelId,
  replyHandler,
  sendToParent = true
) {
  const channels = getChannels();
  assert(
    !Object.prototype.hasOwnProperty.call(channels, channelId),
    `A replyHandler already exists for this message channel.`
  );
  channels[channelId] = { replyHandler, sendToParent };
}

export function getReplyHandler(channelId) {
  const channels = getChannels();
  return Object.prototype.hasOwnProperty.call(channels, channelId)
    ? channels[channelId]
    : undefined;
}

export function deleteReplyHandler(channelId) {
  delete getChannels()[channelId];
}
