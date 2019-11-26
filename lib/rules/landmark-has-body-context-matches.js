import { findUpVirtual } from '../commons/dom';

const nativeScopeFilter = 'article, aside, main, nav, section';

function landmarkHasBodyContextMatches(node, virtualNode, context) {
  // Filter elements that, within certain contexts, don't map their role.
  // e.g. a <header> inside a <main> is not a banner, but in the <body> context it is
  return (
  	node.hasAttribute('role') ||
  	!findUpVirtual(virtualNode, nativeScopeFilter)
  );
}

export default landmarkHasBodyContextMatches;