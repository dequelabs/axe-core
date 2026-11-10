import { query } from '../../commons/dom';

function internalLinkPresentEvaluate(node, options, virtualNode) {
  const links = query(virtualNode, 'a[href]');
  return links.some(vLink => {
    return /^#[^/!]/.test(vLink.attr('href'));
  });
}

export default internalLinkPresentEvaluate;
