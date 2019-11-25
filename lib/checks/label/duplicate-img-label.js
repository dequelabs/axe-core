import duplicateImgLabelEvaluate from './duplicate-img-label-evaluate';

const duplicateImgLabelMetadata = {
	id: 'duplicate-img-label',
	evaluate: duplicateImgLabelEvaluate,
	metadata: {
		impact: 'minor',
		message: {
			pass: 'Element does not duplicate existing text in <img> alt text',
			fail: 'Element contains <img> element with alt text that duplicates existing text'
		}
	}
};

export default duplicateImgLabelMetadata;