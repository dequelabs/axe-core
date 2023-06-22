import getRootNode from '../dom/get-root-node';
import cache from '../../core/base/cache';
import { tokenList } from '../../core/utils';
import standards from '../../standards';
import { sanitize } from '../text/';

const idRefsRegex = /^idrefs?$/;

/**
 * Cache all ID references of a node and its children
 */
function cacheIdRefs(node, idRefs, refAttrs) {
  if (node.hasAttribute) {
    if (node.nodeName.toUpperCase() === 'LABEL' && node.hasAttribute('for')) {
      const id = node.getAttribute('for');
      if (!idRefs.has(id)) {
        idRefs.set(id, [node]);
      } else {
        idRefs.get(id).push(node);
      }
    }

    for (let i = 0; i < refAttrs.length; ++i) {
      const attr = refAttrs[i];
      const attrValue = sanitize(node.getAttribute(attr) || '');
      if (!attrValue) {
        continue;
      }

      for (const token of tokenList(attrValue)) {
        if (!idRefs.has(token)) {
          idRefs.set(token, [node]);
        } else {
          idRefs.get(token).push(node);
        }
      }
    }
  }

  for (let i = 0; i < node.childNodes.length; i++) {
    if (node.childNodes[i].nodeType === 1) {
      cacheIdRefs(node.childNodes[i], idRefs, refAttrs);
    }
  }
}

/**
 * Return all DOM nodes that use the nodes ID in the accessibility tree.
 * @param {Element} node
 * @returns {Element[]}
 */
function getAccessibleRefs(node) {
  node = node.actualNode || node;
  let root = getRootNode(node);
  root = root.documentElement || root; // account for shadow roots

  const idRefsByRoot = cache.get('idRefsByRoot', () => new Map());

  let idRefs = idRefsByRoot.get(root);
  if (!idRefs) {
    idRefs = new Map();
    idRefsByRoot.set(root, idRefs);

    const refAttrs = Object.keys(standards.ariaAttrs).filter(attr => {
      const { type } = standards.ariaAttrs[attr];
      return idRefsRegex.test(type);
    });
    cacheIdRefs(root, idRefs, refAttrs);
  }

  return idRefs.get(node.id) ?? [];
}

export default getAccessibleRefs;
