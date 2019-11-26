import docHasTitleEvaluate from './doc-has-title-evaluate';

const docHasTitleMetadata = {
	id: 'doc-has-title',
	evaluate: docHasTitleEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Document has a non-empty <title> element',
			fail: 'Document does not have a non-empty <title> element'
		}
	}
};

export default docHasTitleMetadata;