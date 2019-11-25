import { querySelectorAll } from '../../core/utils';

function pageHasElmEvaluate(node, options, virtualNode, context) {
  if (!options || !options.selector || typeof options.selector !== 'string') {
  	throw new TypeError(
  		'visible-in-page requires options.selector to be a string'
  	);
  }

  const matchingElms = querySelectorAll(virtualNode, options.selector);
  this.relatedNodes(matchingElms.map(vNode => vNode.actualNode));
  return matchingElms.length > 0;
}

export default pageHasElmEvaluate;