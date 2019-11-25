import unsupportedroleEvaluate from './unsupportedrole-evaluate';

const unsupportedroleMetadata =  {
	id: 'unsupportedrole',
	evaluate: unsupportedroleEvaluate,
	metadata: {
		impact: 'critical',
		messages: {
			pass: 'ARIA role is supported',
			fail: 'The role used is not widely supported in screen readers and assistive technologies: {{~it.data:value}} {{=value}}{{~}}'
		}
	}
};

export default unsupportedroleMetadata;