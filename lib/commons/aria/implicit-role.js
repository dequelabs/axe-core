<<<<<<< Updated upstream
import implicitHtmlRoles from '../standards/implicit-html-roles';
import { getNodeFromTree } from '../../core/utils';
import getElementSpec from '../standards/get-element-spec';
import AbstractVirtuaNode from '../../core/base/virtual-node/abstract-virtual-node';
=======
import allowedAttr from './allowed-attr';
import lookupTable from './lookup-table';
import { matchesSelector, getNodeAttributes } from '../../core/utils';
>>>>>>> Stashed changes

/**
 * Get the implicit role for a given node
 * @method implicitRole
 * @memberof axe.commons.aria
 * @instance
 * @param {HTMLElement} node The node to test
 * @return {Mixed} Either the role or `null` if there is none
 */
<<<<<<< HEAD
<<<<<<< Updated upstream
function implicitRole(node) {
=======
function implicitRole(node, { chromium } = {}) {
>>>>>>> develop
  const vNode =
    node instanceof AbstractVirtuaNode ? node : getNodeFromTree(node);
  node = vNode.actualNode;

  // this error is only thrown if the virtual tree is not a
  // complete tree, which only happens in linting and if a
  // user used `getFlattenedTree` manually on a subset of the
  // DOM tree
  if (!vNode) {
    throw new ReferenceError(
      'Cannot get implicit role of a node outside the current scope.'
    );
  }

  const nodeName = vNode.props.nodeName;
  const role = implicitHtmlRoles[nodeName];

  if (!role && chromium) {
    const { chromiumRole } = getElementSpec(vNode);
    return chromiumRole || null;
  }

  if (typeof role === 'function') {
    return role(vNode);
  }

<<<<<<< HEAD
  return role;
=======
// TODO: axe 4.0 - rename to `getImplicitRole` so we can use
// a variable named `implicitRole` when assigning the output of
// the function
function implicitRole(node) {
	'use strict';

	/*
	 * Filter function to reduce a list of roles to a valid list of roles for a nodetype
	 */
	const isValidImplicitRole = function(set, role) {
		const validForNodeType = function(implicitNodeTypeSelector) {
			return matchesSelector(node, implicitNodeTypeSelector);
		};

		if (role.implicit && role.implicit.some(validForNodeType)) {
			set.push(role.name);
		}

		return set;
	};

	/*
	 * Score a set of roles and aria-attributes by its optimal score
	 * E.g. [{score: 2, name: button}, {score: 1, name: main}]
	 */
	const sortRolesByOptimalAriaContext = function(roles, ariaAttributes) {
		const getScore = function(role) {
			const allowedAriaAttributes = allowedAttr(role);
			return allowedAriaAttributes.reduce(function(score, attribute) {
				return score + (ariaAttributes.indexOf(attribute) > -1 ? 1 : 0);
			}, 0);
		};

		const scored = roles.map(function(role) {
			return { score: getScore(role), name: role };
		});

		const sorted = scored.sort(function(scoredRoleA, scoredRoleB) {
			return scoredRoleB.score - scoredRoleA.score;
		});

		return sorted.map(function(sortedRole) {
			return sortedRole.name;
		});
	};

	/*
	 * Create a list of { name / implicit } role mappings to filter on
	 */
	const roles = Object.keys(lookupTable.role).map(function(role) {
		const lookup = lookupTable.role[role];
		return { name: role, implicit: lookup && lookup.implicit };
	});

	/* Build a list of valid implicit roles for this node */
	const availableImplicitRoles = roles.reduce(isValidImplicitRole, []);

	if (!availableImplicitRoles.length) {
		return null;
	}

	const nodeAttributes = getNodeAttributes(node);
	const ariaAttributes = [];

	/* Get all aria-attributes defined for this node */
	/* Should be a helper function somewhere */
	for (let i = 0, j = nodeAttributes.length; i < j; i++) {
		const attr = nodeAttributes[i];
		if (attr.name.match(/^aria-/)) {
			ariaAttributes.push(attr.name);
		}
	}

	/* Sort roles by highest score, return the first */
	return sortRolesByOptimalAriaContext(
		availableImplicitRoles,
		ariaAttributes
	).shift();
>>>>>>> Stashed changes
=======
  return role || null;
>>>>>>> develop
}

export default implicitRole;
