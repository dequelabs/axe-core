import cache from '../../core/base/cache';
import { querySelectorAllFilter } from '../../core/utils';
import { isVisibleToScreenReaders, findUpVirtual } from '../../commons/dom';
import { getRole, getExplicitRole } from '../../commons/aria';

// A nested document or application can have its own landmarks, like an iframe.
// @see https://github.com/dequelabs/axe-core/issues/5485
function getDocumentScope(vNode) {
  for (let parent = vNode.parent; parent; parent = parent.parent) {
    if (['document', 'application'].includes(getExplicitRole(parent))) {
      return parent;
    }
  }
  return null;
}

function pageNoDuplicateEvaluate(node, options, virtualNode) {
  if (!options || !options.selector || typeof options.selector !== 'string') {
    throw new TypeError(
      'page-no-duplicate requires options.selector to be a string'
    );
  }

  // only look at the first node of each document scope and its related nodes
  const key = 'page-no-duplicate;' + options.selector;
  const checkedScopes = cache.get(key, () => new Set());
  const scope = getDocumentScope(virtualNode);
  if (checkedScopes.has(scope)) {
    this.data('ignored');
    return;
  }
  checkedScopes.add(scope);

  let elms = querySelectorAllFilter(
    axe._tree[0],
    options.selector,
    elm => isVisibleToScreenReaders(elm) && getDocumentScope(elm) === scope
  );

  // @deprecated options.nativeScopeFilter
  // Filter elements that, within certain contexts, don't map their role.
  // e.g. a <footer> inside a <main> is not a banner, but in the <body> context it is
  if (typeof options.nativeScopeFilter === 'string') {
    elms = elms.filter(elm => {
      return (
        elm.hasAttr('role') || !findUpVirtual(elm, options.nativeScopeFilter)
      );
    });
  }

  if (typeof options.role === 'string') {
    elms = elms.filter(elm => getRole(elm) === options.role);
  }

  this.relatedNodes(
    elms.filter(elm => elm !== virtualNode).map(elm => elm.actualNode)
  );

  return elms.length <= 1;
}

export default pageNoDuplicateEvaluate;
