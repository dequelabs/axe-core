import { querySelectorAll } from '../../core/utils';

function internalLinkPresentEvaluate(node, options, virtualNode) {
  const links = querySelectorAll(virtualNode, 'a[href]');
  return links.some(vLink => {
    return /^#[^/!]/.test(vLink.attr('href'));
  });
}

export default internalLinkPresentEvaluate;
