import Context from '../base/context';
import getAncestry from './get-ancestry';

export default function getFrameContexts(context, options = {}) {
  if (options.iframes === false) {
    return [];
  }

  const { frames } = new Context(context);
  return frames.map(({ node, ...frameContext }) => {
    frameContext.initiator = false;
    const frameSelector = getAncestry(node);
    return { frameSelector, frameContext };
  });
}
