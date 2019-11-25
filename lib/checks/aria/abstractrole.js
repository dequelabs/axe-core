import abstractroleEvaluate from './abstractrole-evaluate';

const abstractroleMetadata =  {
  id: 'abstractrole',
  evaluate: abstractroleEvaluate,
  metadata: {
    impact: 'serious',
    messages: {
      pass: 'Abstract roles are not used',
      fail: 'Abstract roles cannot be directly used'
    }
  }
};

export default abstractroleMetadata;