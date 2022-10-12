import { querySelectorAllFilter } from '../../core/utils';
import { isVisibleToScreenReaders, isModalOpen } from '../../commons/dom';

function hasDescendant(node, options, virtualNode) {
  if (!options || !options.selector || typeof options.selector !== 'string') {
    throw new TypeError(
      'has-descendant requires options.selector to be a string'
    );
  }

  if (options.passForModal && isModalOpen()) {
    return true;
  }

  const matchingElms = querySelectorAllFilter(
    virtualNode,
    options.selector,
    vNode => isVisibleToScreenReaders(vNode)
  );
  this.relatedNodes(matchingElms.map(vNode => vNode.actualNode));
  return matchingElms.length > 0;
}

export default hasDescendant;
