import { storeReplyHandler, getReplyHandler } from '../../../lib/core/utils/frame-messenger/channel-store';
import { expect } from 'chai';

describe('channel-store', () => {
  it('should prevent prototype pollution via channelId', () => {
    const handler = () => {};
    expect(() => {
      storeReplyHandler('__proto__', handler);
    }).to.throw('Invalid channelId: __proto__');

    expect(() => {
      storeReplyHandler('constructor', handler);
    }).to.throw('Invalid channelId: constructor');

    expect(() => {
      storeReplyHandler('prototype', handler);
    }).to.throw('Invalid channelId: prototype');
  });

  it('should store and retrieve valid channel handlers', () => {
    const handler = () => {};
    const channelId = 'valid-id';
    storeReplyHandler(channelId, handler);
    const stored = getReplyHandler(channelId);
    expect(stored.replyHandler).to.equal(handler);
  });
});
