import { isValidRole, implicitRole } from '../commons/aria';

// Get all valid roles
function headingMatches(node, virtualNode, context) {
  let explicitRoles;
  if (node.hasAttribute('role')) {
  	explicitRoles = node
  		.getAttribute('role')
  		.split(/\s+/i)
  		.filter(isValidRole);
  }

  // Check valid roles if there are any, otherwise fall back to the inherited role
  if (explicitRoles && explicitRoles.length > 0) {
  	return explicitRoles.includes('heading');
  } else {
  	return implicitRole(node) === 'heading';
  }
}

export default headingMatches;