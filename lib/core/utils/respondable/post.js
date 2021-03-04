import { stringifyMessage } from './message-parser';
import { assertIsParentWindow, assertIsFrameWindow } from './assert-window';

/**
 * Posts the message to correct frame.
 * This abstraction necessary because IE9 & 10 do not support posting Objects; only strings
 * @private
 * @param  {Window}   win      The `window` to post the message to
 * @param  {String}   topic    The topic of the message
 * @param  {Object}   message  The message content
 * @param  {String}   uuid     The UUID, or pseudo-unique ID of the message
 * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
 */
export function post(
	win,
	{ topic, message, messageId, channelId, keepalive, sendToParent }
) {
	// Prevent messaging to an inappropriate window
	sendToParent ? assertIsParentWindow(win) : assertIsFrameWindow(win);
	if (message instanceof Error && !sendToParent) {
		return axe.log(message);
	}
	// console.log({ topic, message, messageId, channelId, keepalive })
	const dataString = stringifyMessage({
		topic,
		message,
		messageId,
		channelId,
		keepalive
	});
	win.postMessage(dataString, '*');
}
