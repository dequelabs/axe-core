import getExplicitRole from './get-explicit-role';
import getImplicitRole from './implicit-role';
import getGlobalAriaAttrs from '../standards/get-global-aria-attrs';
import isFocusable from '../dom/is-focusable';
import { nodeLookup, isValidCustomElementName } from '../../core/utils';
import memoize from '../../core/utils/memoize';

// when an element inherits the presentational role from a parent
// is not defined in the spec, but through testing it seems to be
// when a specific HTML parent relationship is required and that
// parent has `role=presentation`, then the child inherits the
// role (i.e. table, ul, dl). Further testing has shown that
// intermediate elements (such as divs) break this chain only in
// Chrome.
//
// Also, any nested structure chains reset the role (so two nested
// lists with the topmost list role=none will not cause the nested
// list to inherit the role=none).
//
// from Scott O'Hara:
//
// "the expectation for me, in standard html is that element
// structures that require specific parent/child relationships,
// if the parent is set to presentational that should set the
// children to presentational.  ala, tables and lists."
// "but outside of those specific constructs, i would not expect
// role=presentation to do anything to child element roles"
const inheritsPresentationChain = {
  // valid parent elements, any other element will prevent any
  // children from inheriting a presentational role from a valid
  // ancestor
  td: ['tr'],
  th: ['tr'],
  tr: ['thead', 'tbody', 'tfoot', 'table'],
  thead: ['table'],
  tbody: ['table'],
  tfoot: ['table'],
  li: ['ol', 'ul'],
  // dts and dds can be wrapped in divs and the div will pass through
  // the presentation role
  dt: ['dl', 'div'],
  dd: ['dl', 'div'],
  div: ['dl']
};

// role presentation inheritance.
// Source: https://www.w3.org/TR/wai-aria-1.1/#conflict_resolution_presentation_none
function getInheritedRole(vNode, explicitRoleOptions) {
  const parentNodeNames = inheritsPresentationChain[vNode.props.nodeName];
  if (!parentNodeNames) {
    return null;
  }

  // if we can't look at the parent then we can't know if the node
  // inherits the presentational role or not
  if (!vNode.parent) {
    if (!vNode.actualNode) {
      return null;
    }

    throw new ReferenceError(
      'Cannot determine role presentational inheritance of a required parent outside the current scope.'
    );
  }

  // parent is not a valid ancestor that can inherit presentation
  if (!parentNodeNames.includes(vNode.parent.props.nodeName)) {
    return null;
  }

  const parentRole = getExplicitRole(vNode.parent, explicitRoleOptions);
  if (
    ['none', 'presentation'].includes(parentRole) &&
    !hasConflictResolution(vNode.parent)
  ) {
    return parentRole;
  }

  // an explicit role of anything other than presentational will
  // prevent any children from inheriting a presentational role
  // from a valid ancestor
  if (parentRole) {
    return null;
  }

  return getInheritedRole(vNode.parent, explicitRoleOptions);
}

function resolveImplicitRole(vNode, { chromium, ...explicitRoleOptions }) {
  const implicitRole = getImplicitRole(vNode, {
    chromium
  });

  if (!implicitRole) {
    return null;
  }

  const presentationalRole = getInheritedRole(vNode, explicitRoleOptions);
  if (presentationalRole) {
    return presentationalRole;
  }

  return implicitRole;
}

// role conflict resolution
// note: Chrome returns a list with resolved role as "generic"
// instead of as a list
// (e.g. <ul role="none" aria-label><li>hello</li></ul>)
// we will return it as a list as that is the best option.
// Source: https://www.w3.org/TR/wai-aria-1.1/#conflict_resolution_presentation_none
// See also: https://github.com/w3c/aria/issues/1270
export function hasConflictResolution(vNode) {
  const hasGlobalAria = getGlobalAriaAttrs().some(attr => vNode.hasAttr(attr));
  return hasGlobalAria || isFocusable(vNode);
}

/**
 *
 * @method resolveRole
 * @param {VirtualNode} vNode
 * @param {Object} options
 * @see getRole for option details
 * @returns {string|null} Role or null
 * @deprecated noImplicit option is deprecated. Use aria.getExplicitRole instead.
 */
function resolveRole(vNode, { noImplicit, ...roleOptions } = {}) {
  if (vNode.props.nodeType !== 1) {
    return null;
  }

  const explicitRole = getExplicitRole(vNode, roleOptions);

  if (!explicitRole) {
    return noImplicit ? null : resolveImplicitRole(vNode, roleOptions);
  }

  if (!['presentation', 'none'].includes(explicitRole)) {
    return explicitRole;
  }

  if (hasConflictResolution(vNode)) {
    // all browsers currently do not treat custom elements with internal roles as the
    // implicit role for conflict resolution so for now we need to not access the implicit
    // role function for them and instead treat them as having no role
    // @see https://github.com/dequelabs/axe-core/issues/5162
    if (isValidCustomElementName(vNode.props.nodeName)) {
      return null;
    }

    // return null if there is a conflict resolution but no implicit
    // has been set as the explicit role is not the true role
    return noImplicit ? null : resolveImplicitRole(vNode, roleOptions);
  }

  // role presentation or none and no conflict resolution
  return explicitRole;
}

/**
 * Return the semantic role of an element.
 *
 * @method getRole
 * @memberof axe.commons.aria
 * @instance
 * @param {Element|VirtualNode} node
 * @param {Object} options
 * @param {boolean} options.noImplicit  Do not return the implicit role // @deprecated
 * @param {boolean} options.fallback  Allow fallback roles
 * @param {boolean} options.abstracts  Allow role to be abstract
 * @param {boolean} options.dpub  Allow role to be any (valid) doc-* roles
 * @param {boolean} options.noPresentational return null if role is presentation or none
 * @param {boolean} options.chromium Include implicit roles from chromium-based browsers in role result
 * @returns {string|null} Role or null
 *
 * @deprecated noImplicit option is deprecated. Use aria.getExplicitRole instead.
 */
function getRole(node, options = {}) {
  const { vNode } = nodeLookup(node);

  // The role of a node is resolved many times over during a run, so memoize
  // it on the virtual node. A node outside the tree has no virtual node to
  // key on, so it skips the cache rather than keying every such node onto the
  // same `undefined`. Resolving one throws, as it does without the cache.
  if (!vNode) {
    return resolveRoleWithOptions(vNode, options);
  }

  return getRoleVirtual(vNode, roleOptionsKey(options));
}

// Every option below changes the answer, so all of them belong in the cache
// key. memoizee's primitive mode builds that key from `String(argument)`,
// which collapses every options object onto the same `[object Object]` and
// would merge six distinct answers into one — so the options are flattened
// into a primitive first. A virtual node needs no such treatment: its
// `toString()` is a unique `_uid`.
const roleOptionNames = [
  'noImplicit',
  'fallback',
  'abstracts',
  'dpub',
  'noPresentational',
  'chromium'
];

// Built by concatenation rather than `map().join()`: this runs on every one of
// the tens of thousands of getRole calls in a run, including the many that
// never repeat, so it must not allocate.
function roleOptionsKey(options) {
  return (
    (options.noImplicit ? '1' : '0') +
    (options.fallback ? '1' : '0') +
    (options.abstracts ? '1' : '0') +
    (options.dpub ? '1' : '0') +
    (options.noPresentational ? '1' : '0') +
    (options.chromium ? '1' : '0')
  );
}

function roleOptionsFromKey(key) {
  const options = {};
  roleOptionNames.forEach((name, index) => {
    options[name] = key[index] === '1';
  });
  return options;
}

const getRoleVirtual = memoize(
  function getRoleMemoized(vNode, key) {
    return resolveRoleWithOptions(vNode, roleOptionsFromKey(key));
  },
  { primitive: true }
);

function resolveRoleWithOptions(vNode, { noPresentational, ...options }) {
  const role = resolveRole(vNode, options);

  if (noPresentational && ['presentation', 'none'].includes(role)) {
    return null;
  }

  return role;
}

export default getRole;
