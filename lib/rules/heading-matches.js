function headingMatches(node, virtualNode) {
  // Get all valid roles
  let explicitRoles;
  if (virtualNode.hasAttr('role')) {
    explicitRoles = virtualNode
      .getAttribute('role')
      .split(/\s+/i)
      .filter(axe.commons.aria.isValidRole);
  }

  // Check valid roles if there are any, otherwise fall back to the inherited role
  if (explicitRoles && explicitRoles.length > 0) {
    return explicitRoles.includes('heading');
  } else {
    return axe.commons.aria.implicitRole(virtualNode) === 'heading';
  }
}

export default headingMatches;
