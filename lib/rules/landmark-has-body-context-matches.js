import { findUpVirtual } from '../commons/dom';

function landmarkHasBodyContextMatches(node, virtualNode) {
  const nativeScopeFilter = 'article, aside, main, nav, section';

  // Filter elements that, within certain contexts, don't map their role.
  // e.g. a <header> inside a <main> is not a banner, but in the <body> context it is
  return (
    virtualNode.hasAttr('role') ||
    !findUpVirtual(virtualNode, nativeScopeFilter)
  );
}

export default landmarkHasBodyContextMatches;
