import abstractRoleEvaluate from './abstractrole-evaluate';

const abstractroleMetata = {
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

export default abstractroleMetata;