import { createFrameContext } from './create-frame-context';
import { getNodeFromTree, shadowSelectAll } from '../../utils';

/**
 * Finds frames in context, converts selectors to Element references and pushes unique frames
 * @private
 * @param  {Context} context The instance of Context to operate on
 * @param  {String} type     The "type" of thing to parse, "include" or "exclude"
 * @return {Array}           Parsed array of matching elements
 */
export function parseSelectorArray(context, type) {
  // TODO: instead of modifying context, this should return things context can used to modify itself
  const result = [];
  for (let i = 0, l = context[type].length; i < l; i++) {
    const item = context[type][i];
    // selector
    // TODO: This is unnecessary if we properly normalize
    if (typeof item === 'string') {
      const nodeList = shadowSelectAll(item);
      result.push(...nodeList.map(node => getNodeFromTree(node)));
      break;
    }

    // Handle nodes
    if (item instanceof window.Node) {
      if (item.documentElement instanceof window.Node) {
        result.push(context.flatTree[0]);
      } else {
        result.push(getNodeFromTree(item));
      }
      continue;
    }

    // Handle Iframe selection
    if (item && item.length) {
      if (item.length > 1) {
        pushUniqueFrameSelector(context, type, item);
      } else {
        const nodeList = shadowSelectAll(item[0]);
        result.push(...nodeList.map(node => getNodeFromTree(node)));
      }
    }
  }

  // filter nulls
  return result.filter(r => r);
}

/**
 * Unshift selectors of matching iframes
 * @private
 * @param  {Context} context 	  The context object to operate on and assign to
 * @param  {String} type          The "type" of context, 'include' or 'exclude'
 * @param  {Array} selectorArray  Array of CSS selectors, each element represents a frame;
 * where the last element is the actual node
 */
function pushUniqueFrameSelector(context, type, selectorArray) {
  context.frames = context.frames || [];

  const frameSelector = selectorArray.shift();
  const frames = shadowSelectAll(frameSelector);
  frames.forEach(frame => {
    // TODO: This does not need to loop twice. This can work with just the .find
    context.frames.forEach(contextFrame => {
      if (contextFrame.node === frame) {
        contextFrame[type].push(selectorArray);
      }
    });

    if (!context.frames.find(result => result.node === frame)) {
      const result = createFrameContext(frame, context);
      if (selectorArray) {
        result[type].push(selectorArray);
      }

      context.frames.push(result);
    }
  });
}
