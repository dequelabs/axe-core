import { getRoleType } from '../../commons/aria';

const metadata = {
  id: 'abstractrole',
  evaluate: abstractRoleEvaluate,
  metadata: {
    impact: 'serious',
    messages: {
      pass: 'Abstract roles are not used',
      fail: 'Abstract roles cannot be directly used'
    }
  }
}

function abstractRoleEvaluate(node, options, virtualNode, context) {
  return getRoleType(node.getAttribute('role')) === 'abstract';
}

export default metadata;