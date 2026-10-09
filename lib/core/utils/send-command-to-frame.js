import getSelector from './get-selector';
import respondable from './respondable';
import log from '../log';

/**
 * Sends a command to an instance of axe in the specified frame
 * @param  {Element}  node       The frame element to send the message to
 * @param  {Object}   parameters Parameters to pass to the frame
 * @param  {Function} callback   Function to call when results from the frame has returned
 */
export default function sendCommandToFrame(node, parameters, resolve, reject) {
  const win = node.contentWindow;
  const pingWaitTime = parameters.options?.pingWaitTime ?? 500;
  if (!win) {
    log('Frame does not have a content window', node);
    resolve(null);
    return;
  }

  // Skip ping
  if (pingWaitTime === 0) {
    callAxeStart(node, parameters, resolve, reject);
    return;
  }

  // Everything the 'axe.ping' reply handler needs is kept on `pending`, so
  // that the stored handler never has the frame's `node` in scope. Reply
  // handlers are held by the frame messenger until a response arrives or the
  // audit ends, so anything they can reach is retained until then.
  let pending = { node, parameters, resolve, reject };

  // give the frame .5s to respond to 'axe.ping', else log failed response
  let timeout = setTimeout(() => {
    // This double timeout is important for allowing iframes to respond
    // DO NOT REMOVE
    timeout = setTimeout(() => {
      // Release everything the stored reply handler could reach, so an
      // unresponsive frame does not retain `node` (and with it the flattened
      // tree), and late replies are ignored
      const request = pending;
      pending = null;
      if (!request.parameters.debug) {
        request.resolve(null);
      } else {
        request.reject(err('No response from frame', request.node));
      }
    }, 0);
  }, pingWaitTime);

  // send 'axe.ping' to the frame
  respondable(win, 'axe.ping', null, undefined, () => {
    clearTimeout(timeout);
    // The ping timed out already; ignore the late reply
    if (!pending) {
      return;
    }
    callAxeStart(
      pending.node,
      pending.parameters,
      pending.resolve,
      pending.reject
    );
    pending = null;
  });
}

function callAxeStart(node, parameters, resolve, reject) {
  // Give axe 60s (or user-supplied value) to respond to 'axe.start'
  const frameWaitTime = parameters.options?.frameWaitTime ?? 60000;
  const win = node.contentWindow;
  let pending = { node, parameters, resolve, reject };

  const timeout = setTimeout(function collectResultFramesTimeout() {
    // Release everything the stored reply handler could reach, so an
    // unresponsive frame does not retain `node` (and with it the flattened
    // tree), and late replies are ignored
    const request = pending;
    pending = null;
    request.reject(err('Axe in frame timed out', request.node));
  }, frameWaitTime);

  // send 'axe.start' and send the callback if it responded
  respondable(win, 'axe.start', parameters, undefined, data => {
    clearTimeout(timeout);
    // The command timed out already; ignore the late reply
    if (!pending) {
      return;
    }
    if (data instanceof Error === false) {
      pending.resolve(data);
    } else {
      pending.reject(data);
    }
    pending = null;
  });
}

function err(message, node) {
  let selector;
  // TODO: es-modules_tree
  if (axe._tree) {
    selector = getSelector(node);
  }
  return new Error(message + ': ' + (selector || node));
}
