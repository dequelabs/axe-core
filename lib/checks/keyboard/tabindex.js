import tabindexEvaluate from './tabindex-evaluate';

const tabindexMetadata = {
	id: 'tabindex',
	evaluate: tabindexEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Element does not have a tabindex greater than 0',
			fail: 'Element has a tabindex greater than 0'
		}
	}
};

export default tabindexMetadata;